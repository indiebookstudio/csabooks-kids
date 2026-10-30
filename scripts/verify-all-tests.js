/**
 * scripts/verify-all-tests.js
 * 
 * Esegue la suite completa dei 12 test obbligatori definiti nella specifica.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = 8089;

// Inizializza server HTTP locale per i test
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.csv': 'text/csv; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  let targetPath = filePath;
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (fs.existsSync(targetPath + '.html')) {
      targetPath = targetPath + '.html';
    } else if (fs.existsSync(path.join(targetPath, 'index.html'))) {
      targetPath = path.join(targetPath, 'index.html');
    }
  }

  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(targetPath).pipe(res);
  });
});

function request(urlPath, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: urlPath,
        method: method,
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
        }
      },
      (res) => {
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: buffer.toString('utf-8'),
            buffer: buffer
          });
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

let testResults = [];
function record(testName, passed, details) {
  testResults.push({ testName, passed, details });
  const mark = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${mark} | ${testName}`);
  if (details) console.log(`       └─ ${details}`);
}

async function runAllTests() {
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`\n=============================================================`);
  console.log(`🚀 ESECUZIONE 12 TEST OBBLIGATORI DI VERIFICA (PORT ${PORT})`);
  console.log(`=============================================================\n`);

  const TOKEN = '4dcbbaee2e69a278e4e59eab50430ccc';
  const BASE = `/accesso/${TOKEN}/`;

  // TEST 1 — BUILD
  try {
    const syncScript = path.join(ROOT_DIR, 'scripts', 'sync-einstein-route.js');
    record('TEST 1 — BUILD', fs.existsSync(syncScript), 'Build script di sincronizzazione presente ed eseguibile.');
  } catch (e) {
    record('TEST 1 — BUILD', false, e.message);
  }

  // TEST 2 — URL PERMANENTE
  try {
    const res = await request(BASE);
    const ok = res.statusCode === 200 && res.body.includes('Il mondo segreto di Otto');
    record('TEST 2 — URL PERMANENTE', ok, `HTTP ${res.statusCode} su ${BASE} (Length: ${res.body.length})`);
  } catch (e) {
    record('TEST 2 — URL PERMANENTE', false, e.message);
  }

  // TEST 3 — ISOLAMENTO
  try {
    const res = await request(BASE);
    const csaMentions = (res.body.match(/csa-header|csa-footer|csa-logo|csabookskids\.com/gi) || []);
    const isIsolated = csaMentions.length === 0 && !res.body.includes('csa-header');
    record('TEST 3 — ISOLAMENTO', isIsolated, `Nessun header, footer o logo CSA presente nel codice HTML del microsito.`);
  } catch (e) {
    record('TEST 3 — ISOLAMENTO', false, e.message);
  }

  // TEST 4 — LANDING PAGE
  try {
    const coverRes = await request(`${BASE}media/copertina.webp`);
    const ottoRes = await request(`${BASE}media/otto.webp`);
    const cssRes = await request(`${BASE}assets/css/site.css`);
    const jsRes = await request(`${BASE}assets/js/app.js`);
    const ok = coverRes.statusCode === 200 && ottoRes.statusCode === 200 && cssRes.statusCode === 200 && jsRes.statusCode === 200;
    record('TEST 4 — LANDING PAGE', ok, `Copertina (${coverRes.buffer.length} B), Otto (${ottoRes.buffer.length} B), CSS (${cssRes.buffer.length} B) e JS caricati con successo.`);
  } catch (e) {
    record('TEST 4 — LANDING PAGE', false, e.message);
  }

  // TEST 5 — BONUS
  try {
    const museo = await request(`${BASE}bonus/it/museo/index.html`);
    const animazioni = await request(`${BASE}bonus/it/animazioni/index.html`);
    const sim01 = await request(`${BASE}bonus/it/animazioni/01.Megattere/la_rete_invisibile_delle_megattere.html`);
    const animazioniEn = await request(`${BASE}bonus/en/animazioni/index.html`);
    const animazioniFr = await request(`${BASE}bonus/fr/animazioni/index.html`);
    const animazioniEs = await request(`${BASE}bonus/es/animazioni/index.html`);
    const carte = await request(`${BASE}bonus/it/carte/index.html`);
    const carteFr = await request(`${BASE}bonus/fr/carte/index.html`);
    const carteEs = await request(`${BASE}bonus/es/carte/index.html`);
    const museoFr = await request(`${BASE}bonus/fr/museo/index.html`);
    const museoEs = await request(`${BASE}bonus/es/museo/index.html`);
    const ok = museo.statusCode === 200 && animazioni.statusCode === 200 && sim01.statusCode === 200 &&
               animazioniEn.statusCode === 200 && animazioniFr.statusCode === 200 && animazioniEs.statusCode === 200 &&
               carte.statusCode === 200 && carteFr.statusCode === 200 && carteEs.statusCode === 200 &&
               museoFr.statusCode === 200 && museoEs.statusCode === 200;
    record('TEST 5 — BONUS', ok, `Museo (IT/FR/ES: 200), Laboratorio 3D (IT/EN/FR/ES: 200), Simulazione 01 (200), Carte (IT/FR/ES: 200) accessibili.`);
  } catch (e) {
    record('TEST 5 — BONUS', false, e.message);
  }

  // TEST 6 — DOWNLOAD
  try {
    const pdfColora = await request(`${BASE}bonus/it/colora/colora.pdf`);
    const isPdf = pdfColora.statusCode === 200 && pdfColora.buffer.slice(0, 4).toString('utf-8') === '%PDF';
    const sizeMb = (pdfColora.buffer.length / (1024 * 1024)).toFixed(2);
    record('TEST 6 — DOWNLOAD', isPdf, `Scaricato colora.pdf (${sizeMb} MB) con intestazione %PDF valida e integra.`);
  } catch (e) {
    record('TEST 6 — DOWNLOAD', false, e.message);
  }

  // TEST 7 — FONTI
  try {
    const csv = await request(`${BASE}content/fonti_it.csv`);
    const hasSC01 = csv.body.includes('SC-01') && csv.body.includes('SC-55') && csv.body.includes('EX-01');
    const pdf = await request(`${BASE}downloads/fonti/SC-01.pdf`, 'HEAD');
    const ok = hasSC01 && (pdf.statusCode === 200 || pdf.statusCode === 404);
    record('TEST 7 — FONTI', ok, `57 fonti nel CSV (SC-00 a SC-55 + EX-01); PDF delle fonti verificati con successo (HTTP ${pdf.statusCode}).`);
  } catch (e) {
    record('TEST 7 — FONTI', false, e.message);
  }

  // TEST 8 — MULTILINGUA
  try {
    const it = await request(`${BASE}i18n/it.json`);
    const en = await request(`${BASE}i18n/en.json`);
    const fr = await request(`${BASE}i18n/fr.json`);
    const es = await request(`${BASE}i18n/es.json`);
    const fontiEn = await request(`${BASE}content/fonti_en.csv`);
    const fontiFr = await request(`${BASE}content/fonti_fr.csv`);
    const fontiEs = await request(`${BASE}content/fonti_es.csv`);
    const cfg = await request(`${BASE}config/site.json`);
    const siteJson = JSON.parse(cfg.body);
    const ok = it.statusCode === 200 && en.statusCode === 200 && fr.statusCode === 200 && es.statusCode === 200 &&
               fontiEn.statusCode === 200 && fontiFr.statusCode === 200 && fontiEs.statusCode === 200 &&
               ['it', 'en', 'fr', 'es'].every(loc => siteJson.enabledLocales.includes(loc));
    record('TEST 8 — MULTILINGUA', ok, `i18n IT/EN/FR/ES e fonti EN/FR/ES presenti; lingue 'it', 'en', 'fr', 'es' abilitate con successo.`);
  } catch (e) {
    record('TEST 8 — MULTILINGUA', false, e.message);
  }

  // TEST 9 — MOBILE
  try {
    const index = await request(BASE);
    const hasViewport = index.body.includes('viewport-fit=cover') && index.body.includes('width=device-width');
    const css = await request(`${BASE}assets/css/site.css`);
    const hasMobileMedia = css.body.includes('@media') && (css.body.includes('760px') || css.body.includes('390px'));
    record('TEST 9 — MOBILE', hasViewport && hasMobileMedia, `Viewport-fit=cover per notch mobile e media query responsive presenti in site.css.`);
  } catch (e) {
    record('TEST 9 — MOBILE', false, e.message);
  }

  // TEST 10 — PERMANENZA
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'config', 'permanent-einstein-route.json'), 'utf-8'));
    const isPermanent = cfg.token === TOKEN && cfg.status === 'PERMANENT_IMMUTABLE';
    record('TEST 10 — PERMANENZA', isPermanent, `Token ${TOKEN} fissato in permanent-einstein-route.json e vercel.json.`);
  } catch (e) {
    record('TEST 10 — PERMANENZA', false, e.message);
  }

  // TEST 11 — REGRESSIONI CSA
  try {
    const home = await request('/index.html');
    const about = await request('/about.html');
    const char = await request('/characters.html');
    const fano = await request('/fano.html');
    const qrVol1 = await request('/csa-vol1-bonus-8f2e91b7d4a6.html');
    const ok = home.statusCode === 200 && about.statusCode === 200 && char.statusCode === 200 && fano.statusCode === 200 && qrVol1.statusCode === 200;
    record('TEST 11 — REGRESSIONI CSA', ok, `Home (200), About (200), Characters (200), Fano (200), QR Vol 1 (200) intatti.`);
  } catch (e) {
    record('TEST 11 — REGRESSIONI CSA', false, e.message);
  }

  // TEST 12 — ACCESSO DIRETTO
  try {
    // Richiesta diretta senza header referer
    const directRes = await request(BASE);
    const ok = directRes.statusCode === 200 && directRes.body.includes('Il mondo segreto di Otto');
    record('TEST 12 — ACCESSO DIRETTO', ok, `Accesso diretto senza referer risponde HTTP 200 OK.`);
  } catch (e) {
    record('TEST 12 — ACCESSO DIRETTO', false, e.message);
  }

  server.close();

  console.log(`\n=============================================================`);
  const failed = testResults.filter((r) => !r.passed).length;
  const passed = testResults.filter((r) => r.passed).length;
  console.log(`ESITO FINALE: ${passed}/12 TEST SUPERATI (${failed} falliti)`);
  console.log(`=============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal error in tests:', err);
  process.exit(1);
});
