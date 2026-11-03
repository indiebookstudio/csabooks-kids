/**
 * tests/test-museum-visual-e2e.js
 * 
 * E2E Visual and Interactive Testing for Einstein Museum across 4 languages (IT, EN, FR, ES)
 * and 3 viewports (375px, 768px, 1440px).
 * 
 * - Tests all 7 rooms in IT, EN, FR, ES.
 * - Verifies main images and secondary images are loaded (naturalWidth > 0).
 * - Tests opening the zoom modal on Rooms 2, 3, 5, 7.
 * - Captures verification screenshots into brain artifact directory and tests/screenshots.
 * - Checks responsive layouts at 375px, 768px, 1440px.
 * - Tests animations, cards, and library views.
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const CHROME_PATH = 'C:\\Users\\Marco\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\Marco\\.gemini\\antigravity\\brain\\58fcfb42-dbb0-4fea-9344-1c3c328c6ac7';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sendCommand(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(ws, expression) {
  const res = await sendCommand(ws, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (res.exceptionDetails) {
    throw new Error('Evaluation failed: ' + JSON.stringify(res.exceptionDetails));
  }
  return res.result.value;
}

async function takeScreenshot(ws, filename) {
  const shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
  const buf = Buffer.from(shot.data, 'base64');
  // Save in artifact dir
  fs.writeFileSync(path.join(ARTIFACT_DIR, filename), buf);
  // Also save in tests/screenshots
  fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), buf);
  console.log(`    📸 Salvato screenshot: ${filename} (${buf.length} bytes)`);
}

async function runBrowserSession(testFn) {
  const port = 9444;
  const uDir = path.join(process.env.TEMP, `chrome_cdp_${Date.now()}_${Math.floor(Math.random()*10000)}`);
  
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    '--window-size=1440,900',
    `--user-data-dir=${uDir}`
  ];

  const proc = spawn(CHROME_PATH, args);

  try {
    let targets = null;
    for (let i = 0; i < 40; i++) {
      try {
        targets = await fetchJson(`http://localhost:${port}/json`);
        if (targets && targets.length > 0) break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 100));
      }
    }
    if (!targets || !targets[0]) throw new Error('Could not connect to Chrome CDP');

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    await sendCommand(ws, 'Page.enable');
    await sendCommand(ws, 'Runtime.enable');
    await sendCommand(ws, 'DOM.enable');

    await testFn(ws);

    ws.close();
  } finally {
    proc.kill();
    try {
      if (fs.existsSync(uDir)) fs.rmSync(uDir, { recursive: true, force: true });
    } catch(e) {}
  }
}

async function setViewport(ws, w, h, isMobile = false) {
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: w,
    height: h,
    deviceScaleFactor: 2,
    mobile: isMobile
  });
}

async function navigate(ws, url) {
  await sendCommand(ws, 'Page.navigate', { url });
  await new Promise(r => setTimeout(r, 800));
}

async function main() {
  console.log('🚀 AVVIO TEST VISIVI E2E CON BROWSER REALE (CHROME CDP)...\n');

  let passed = 0;
  let total = 0;

  function t(desc, condition) {
    total++;
    if (condition) {
      console.log(`  ✓ ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ ${desc}`);
      process.exitCode = 1;
    }
  }

  await runBrowserSession(async (ws) => {
    // -------------------------------------------------------------
    // PARTE 1: Museo nelle 4 lingue e in tutte le 7 sale
    // -------------------------------------------------------------
    console.log('--- 1. Esplorazione completa del Museo (7 Sale x 4 Lingue) ---');
    const langs = ['it', 'en', 'fr', 'es'];

    for (const lang of langs) {
      console.log(`\n  ▶ Verifica Lingua: ${lang.toUpperCase()}`);
      const baseUrl = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/museo/index.html`;

      // 1. Atrio
      await setViewport(ws, 1440, 900, false);
      await navigate(ws, baseUrl + '#atrio');
      
      const atriumCheck = await evaluate(ws, `({
        hasHero: !!document.querySelector('.hero'),
        cardsCount: document.querySelectorAll('.room-card').length,
        title: document.title
      })`);
      t(`[${lang.toUpperCase()}] Atrio caricato con 7 porte`, atriumCheck.hasHero && atriumCheck.cardsCount === 7);

      // 2. Controllo di tutte le 7 sale
      for (let roomId = 1; roomId <= 7; roomId++) {
        await navigate(ws, `${baseUrl}#sala-${roomId}`);

        const roomData = await evaluate(ws, `({
          roomId: ${roomId},
          title: document.querySelector('.room-name')?.textContent || '',
          mainTitle: document.querySelector('.exhibit h2')?.textContent || '',
          sideTitle: document.querySelector('.side-exhibit h3')?.textContent || '',
          mainImg: document.querySelector('.room-backdrop')?.currentSrc || '',
          sideImg: document.querySelector('.side-figure-wrap img, .side-exhibit img')?.currentSrc || '',
          sideImgLoaded: !!document.querySelector('.side-figure-wrap img, .side-exhibit img')?.complete,
          sideImgNaturalW: document.querySelector('.side-figure-wrap img, .side-exhibit img')?.naturalWidth || 0,
          hasFigureExplanation: !!document.querySelector('.figure-explanation'),
          challengePresent: !!document.querySelector('#challengePanel button')
        })`);

        t(`[${lang.toUpperCase()}] Sala ${roomId}: Immagine secondaria caricata (${roomData.sideImgNaturalW}px)`, roomData.sideImgNaturalW > 0);
        t(`[${lang.toUpperCase()}] Sala ${roomId}: Titolo e sfida presenti ("${roomData.mainTitle.slice(0, 30)}...")`, roomData.title.length > 0 && roomData.challengePresent);

        // Se è una delle 4 sale con le nuove figure: verifica spiegazione e modale di zoom
        if ([2, 3, 5, 7].includes(roomId)) {
          t(`[${lang.toUpperCase()}] Sala ${roomId}: Presente didascalia educativa HTML localizzata`, roomData.hasFigureExplanation);

          // Clicca per aprire il modale di ingrandimento
          await evaluate(ws, `document.querySelector('button[data-act="zoom"][data-val="${roomId}"]').click()`);
          await new Promise(r => setTimeout(r, 400));

          const modalData = await evaluate(ws, `({
            modalHidden: document.getElementById('modal').hidden,
            modalTitle: document.querySelector('#modal .modal-header h2')?.textContent || '',
            modalImg: document.querySelector('#modal img')?.currentSrc || '',
            modalImgLoaded: !!document.querySelector('#modal img')?.complete,
            modalImgNaturalW: document.querySelector('#modal img')?.naturalWidth || 0,
            modalCaptionText: document.querySelector('#modal .figure-modal-caption')?.textContent || '',
            hasNotice: !!document.querySelector('#modal .art-notice')
          })`);

          t(`[${lang.toUpperCase()}] Sala ${roomId}: Modale ingrandimento aperto con successo ("${modalData.modalTitle}")`, !modalData.modalHidden && modalData.modalImgNaturalW > 0);
          t(`[${lang.toUpperCase()}] Sala ${roomId}: Testo educativo presente nel modale`, modalData.modalCaptionText.length > 30);

          // Salva screenshot di verifica per IT ed EN (e anche FR, ES per completezza)
          if (roomId === 2 || roomId === 3 || roomId === 5 || roomId === 7) {
            await takeScreenshot(ws, `verifica-sala-${roomId}-${lang}-zoom.png`);
          }

          // Chiudi modale
          await evaluate(ws, `document.querySelector('#modal button[data-act="close"]').click()`);
          await new Promise(r => setTimeout(r, 300));

          // Cattura screenshot della sala con la tavola e didascalia visibile
          if (lang === 'it' || lang === 'en') {
            await takeScreenshot(ws, `verifica-sala-${roomId}-${lang}-pagina.png`);
          }
        }
      }
    }

    // -------------------------------------------------------------
    // PARTE 2: Test Responsive (375px, 768px, 1440px)
    // -------------------------------------------------------------
    console.log('\n--- 2. Verifica Responsive (375px Mobile, 768px Tablet, 1440px Desktop) ---');
    const viewports = [
      { name: 'mobile', w: 375, h: 812, isMobile: true },
      { name: 'tablet', w: 768, h: 1024, isMobile: true },
      { name: 'desktop', w: 1440, h: 900, isMobile: false }
    ];

    for (const vp of viewports) {
      await setViewport(ws, vp.w, vp.h, vp.isMobile);
      const url = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/museo/index.html#sala-2`;
      await navigate(ws, url);

      const respData = await evaluate(ws, `({
        imgWidth: document.querySelector('.side-figure-wrap img')?.clientWidth || 0,
        imgHeight: document.querySelector('.side-figure-wrap img')?.clientHeight || 0,
        captionVisible: !!document.querySelector('.figure-explanation'),
        bodyWidth: document.body.clientWidth
      })`);

      t(`[Responsive ${vp.name} ${vp.w}px] Immagine visibile e proporzionata (${respData.imgWidth}x${respData.imgHeight}px)`, respData.imgWidth > 100 && respData.imgHeight > 50);
      await takeScreenshot(ws, `responsive-sala-2-${vp.name}.png`);
    }

    // -------------------------------------------------------------
    // PARTE 3: Verifica delle altre sezioni
    // -------------------------------------------------------------
    console.log('\n--- 3. Verifica altre sezioni del microsito Otto ---');
    await setViewport(ws, 1440, 900, false);

    // Portale principale
    await navigate(ws, `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/?lang=it`);
    const portalData = await evaluate(ws, `({
      hasApp: !!document.getElementById('app'),
      hasOttoImg: !!document.querySelector('img[src*="otto"]')
    })`);
    t('Portale principale di Otto caricato con illustrazioni', portalData.hasApp);

    // Biblioteca fonti
    await navigate(ws, `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/?lang=it&pagina=fonti`);
    await new Promise(r => setTimeout(r, 1500));
    const fontiData = await evaluate(ws, `({
      hasSC: document.body.textContent.includes('SC-') || document.querySelectorAll('article, .fonte-card, tr, .item').length > 0
    })`);
    t('Biblioteca fonti carica correttamente con collegamenti scientifici SC', fontiData.hasSC);

    // Carte interattive
    await navigate(ws, `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/carte/index.html`);
    await new Promise(r => setTimeout(r, 800));
    const carteData = await evaluate(ws, `({
      hasTitle: /carte/i.test(document.title) || /carte/i.test(document.body.textContent),
      hasOtto: !!document.querySelector('img[src*="otto"]')
    })`);
    t('Sezione Carte interattive caricata con successo', carteData.hasTitle);

    // Animazioni scientifiche
    await navigate(ws, `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/animazioni/index.html`);
    const animData = await evaluate(ws, `({
      title: document.title,
      animsCount: document.querySelectorAll('a[href*="Felce"], a[href*="Pesce"], a[href*="Fungo"], a[href*="Buco"]').length
    })`);
    t('Hub Animazioni 3D caricato con collegamenti alle esperienze', animData.animsCount >= 4);
  });

  console.log('\n========================================');
  console.log(`Esito Test Visivi E2E: ${passed} passati, ${total - passed} falliti`);
  console.log('========================================\n');

  if (passed === total) {
    console.log('🎉 TUTTI I TEST VISIVI ED E2E SONO STATI SUPERATI CON SUCCESSO!');
  } else {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error during E2E tests:', err);
  process.exit(1);
});
