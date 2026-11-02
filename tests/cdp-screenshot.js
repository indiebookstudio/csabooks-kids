const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Users\\Marco\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
const brainArtifactsDir = 'C:\\Users\\Marco\\.gemini\\antigravity\\brain\\7c116be5-0427-4e2c-bc59-bc1d30ccd70a';

const mobileUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';

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

async function captureViaCDP(item) {
  const port = 9333;
  const uDir = path.join(process.env.TEMP, `chrome_cdp_${Date.now()}_${Math.floor(Math.random()*10000)}`);
  
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--window-size=${item.w},${item.h}`,
    `--user-data-dir=${uDir}`
  ];
  if (item.isMobile) {
    args.push(`--user-agent=${mobileUa}`);
    args.push('--hide-scrollbars');
  }

  const proc = spawn(chromePath, args);
  
  try {
    // Wait for CDP to be ready
    let targets = null;
    for (let i = 0; i < 30; i++) {
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
    if (item.isMobile) {
      await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
        width: item.w,
        height: item.h,
        deviceScaleFactor: 2,
        mobile: true
      });
    }

    // Navigate
    await sendCommand(ws, 'Page.navigate', { url: item.url });

    // Wait for load and images
    await new Promise(r => setTimeout(r, 600));

    // Wait for active slide image decoding
    await sendCommand(ws, 'Runtime.evaluate', {
      expression: `
        new Promise(async (resolve) => {
          const imgs = Array.from(document.querySelectorAll('.csa-christmas-slide.active img, .csa-christmas-bg-img'));
          await Promise.all(imgs.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(res => {
              img.onload = res;
              img.onerror = res;
            });
          }));
          setTimeout(resolve, 300);
        })
      `,
      awaitPromise: true
    });

    // Capture screenshot
    const shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png' });
    const outPath = path.join(brainArtifactsDir, item.name);
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log(`✅ Saved ${item.name} (${fs.statSync(outPath).size} bytes)`);

    ws.close();
  } finally {
    proc.kill();
    try {
      if (fs.existsSync(uDir)) fs.rmSync(uDir, { recursive: true, force: true });
    } catch(e) {}
  }
}

async function main() {
  const screenshots = [
    { name: 'christmas-it-desktop.png', url: 'http://localhost:8080/index.html?lang=it', w: 1440, h: 900, isMobile: false },
    { name: 'christmas-it-mobile.png', url: 'http://localhost:8080/index.html?lang=it', w: 390, h: 844, isMobile: true },
    { name: 'christmas-en-desktop.png', url: 'http://localhost:8080/index.html?lang=en', w: 1440, h: 900, isMobile: false },
    { name: 'christmas-en-mobile.png', url: 'http://localhost:8080/index.html?lang=en', w: 390, h: 844, isMobile: true },
    { name: 'christmas-fr-desktop.png', url: 'http://localhost:8080/index.html?lang=fr', w: 1440, h: 900, isMobile: false },
    { name: 'christmas-fr-mobile.png', url: 'http://localhost:8080/index.html?lang=fr', w: 390, h: 844, isMobile: true },
    { name: 'christmas-de-desktop.png', url: 'http://localhost:8080/index.html?lang=de', w: 1440, h: 900, isMobile: false },
    { name: 'christmas-de-mobile.png', url: 'http://localhost:8080/index.html?lang=de', w: 390, h: 844, isMobile: true },
    { name: 'cantiere-hero-desktop.png', url: 'http://localhost:8080/cantiere.html?lang=it', w: 1440, h: 900, isMobile: false }
  ];

  console.log('Capturing campaign screenshots via Chrome DevTools Protocol...');
  for (const item of screenshots) {
    try {
      await captureViaCDP(item);
    } catch (e) {
      console.error(`Failed ${item.name}: ${e.message}`);
    }
  }
  console.log('All screenshots captured successfully.');
}

main();
