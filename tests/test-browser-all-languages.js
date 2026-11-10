const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Users\\Marco\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
if (!fs.existsSync(CHROME_PATH)) {
  console.error('❌ Chrome non trovato a:', CHROME_PATH);
  process.exit(1);
}

const languages = ['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp'];
const pages = [
  'index.html',
  'catalogo.html',
  'cantiere.html',
  'scienza.html',
  'scuola.html',
  'colorare.html',
  'about.html'
];

console.log('🌐 AVVIO TEST REALE IN BROWSER (HEADLESS CHROME) SULLE 9 LINGUE...');

let totalTests = 0;
let totalPassed = 0;
let errors = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ❌ FAILED: ${message}`);
    errors++;
  } else {
    totalPassed++;
    console.log(`  ✓ ${message}`);
  }
}

function dumpDom(url) {
  try {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--virtual-time-budget=2000',
      '--dump-dom',
      url
    ];
    return execFileSync(CHROME_PATH, args, { encoding: 'utf8', maxBuffer: 15 * 1024 * 1024 });
  } catch (err) {
    console.error(`Errore nel dump DOM per ${url}:`, err.message);
    return '';
  }
}

// 1. Test Catalogo per tutte le 9 lingue
console.log('\n======================================================');
console.log('📚 1. VERIFICA CATALOGO REALE NEL BROWSER (9 LINGUE)');
console.log('======================================================');

languages.forEach(lang => {
  const url = `http://localhost:8080/catalogo.html?lang=${lang}`;
  console.log(`\nNavigazione in [${lang.toUpperCase()}]: ${url}`);
  const html = dumpDom(url);
  assert(html.length > 5000, `[${lang.toUpperCase()}] Pagina catalogo caricata (${html.length} byte)`);

  // Conta le card dei libri
  const cardMatches = html.match(/class=["'][^"']*csa-book-card[^"']*["']/g) || [];
  assert(cardMatches.length === 13, `[${lang.toUpperCase()}] Visualizzati ESATTAMENTE 13 libri nel catalogo (trovati: ${cardMatches.length})`);

  // Verifica che non sia presente il vecchio ASIN Kindle B0HN9G1V81
  assert(!html.includes('B0HN9G1V81'), `[${lang.toUpperCase()}] Zero riferimenti al vecchio ASIN Kindle B0HN9G1V81`);

  // Verifica che per csa-vol2 sia presente il corretto ASIN Paperback B0HPB2L59F
  assert(html.includes('B0HPB2L59F'), `[${lang.toUpperCase()}] Presente il corretto ASIN Paperback B0HPB2L59F per CSA Vol 2`);

  // Verifica presenza badge linguistici
  assert(html.includes('csa-card-languages'), `[${lang.toUpperCase()}] Badge delle lingue disponibili presenti nelle card`);

  // Verifica che non ci siano placeholder rotti o undefined visibili
  assert(!html.includes('undefined') && !html.includes('[object Object]'), `[${lang.toUpperCase()}] Nessun testo undefined o [object Object]`);
});

// 2. Test Pagina Cantiere per tutte le 9 lingue
console.log('\n======================================================');
console.log('🚜 2. VERIFICA PAGINA CANTIERE NEL BROWSER (9 LINGUE)');
console.log('======================================================');

languages.forEach(lang => {
  const url = `http://localhost:8080/cantiere.html?lang=${lang}`;
  console.log(`\nNavigazione Cantiere in [${lang.toUpperCase()}]: ${url}`);
  const html = dumpDom(url);
  assert(html.length > 5000, `[${lang.toUpperCase()}] Pagina cantiere caricata (${html.length} byte)`);

  // Verifica che la sezione Raccolte sia presente e non nascosta
  assert(html.includes('id="raccolte"'), `[${lang.toUpperCase()}] Sezione raccolte presente nel DOM`);
  assert(html.includes('csa-cantiere-vol1-buy') && html.includes('csa-cantiere-vol2-buy'), `[${lang.toUpperCase()}] Pulsanti acquisto Vol 1 e Vol 2 presenti`);

  // Verifica che Vol 2 punti al paperback corretto
  assert(html.includes('B0HPB2L59F'), `[${lang.toUpperCase()}] Pulsante acquisto Vol 2 punta al Paperback B0HPB2L59F`);
  assert(!html.includes('B0HN9G1V81'), `[${lang.toUpperCase()}] Vol 2 NON punta al Kindle B0HN9G1V81`);

  // Conta gli episodi nella griglia
  const episodeGrid = html.match(/id=["']cantiere-episodes-grid["'][\s\S]*?<\/section>/);
  if (episodeGrid) {
    const epCards = episodeGrid[0].match(/class=["'][^"']*csa-book-card[^"']*["']/g) || [];
    assert(epCards.length === 9, `[${lang.toUpperCase()}] Griglia episodi contiene tutte le 9 storie (trovate: ${epCards.length})`);
  } else {
    assert(false, `[${lang.toUpperCase()}] Griglia episodi trovata`);
  }
});

// 3. Test Pagina Home (index.html) per tutte le 9 lingue
console.log('\n======================================================');
console.log('🏠 3. VERIFICA HOMEPAGE NEL BROWSER (9 LINGUE)');
console.log('======================================================');

languages.forEach(lang => {
  const url = `http://localhost:8080/index.html?lang=${lang}`;
  console.log(`\nNavigazione Homepage in [${lang.toUpperCase()}]: ${url}`);
  const html = dumpDom(url);
  assert(html.length > 5000, `[${lang.toUpperCase()}] Homepage caricata (${html.length} byte)`);

  // Verifica sezione in primo piano
  const featuredMatches = html.match(/csa-featured-card/g) || [];
  assert(featuredMatches.length === 3, `[${lang.toUpperCase()}] In primo piano mostra 3 libri (trovati: ${featuredMatches.length})`);

  // Verifica assenza Kindle B0HN9G1V81
  assert(!html.includes('B0HN9G1V81'), `[${lang.toUpperCase()}] Nessun link al Kindle B0HN9G1V81 in Homepage`);
});

// 4. Test Pagina Scienza (Einstein) per tutte le 9 lingue
console.log('\n======================================================');
console.log('🔬 4. VERIFICA SCIENZA / EINSTEIN NEL BROWSER (9 LINGUE)');
console.log('======================================================');

languages.forEach(lang => {
  const url = `http://localhost:8080/scienza.html?lang=${lang}`;
  const html = dumpDom(url);
  assert(html.includes('csa-einstein-buy-btn'), `[${lang.toUpperCase()}] Pulsante acquisto Einstein presente`);
  
  if (lang === 'it') {
    assert(html.includes('B0HP6YD1CM'), `[IT] Einstein punta al paperback italiano B0HP6YD1CM`);
  } else if (lang === 'fr') {
    assert(html.includes('B0HQ1F1HX8'), `[FR] Einstein punta al paperback francese B0HQ1F1HX8`);
  } else if (lang === 'es') {
    assert(html.includes('B0HQZJB7V4'), `[ES] Einstein punta al paperback spagnolo B0HQZJB7V4`);
  } else {
    assert(html.includes('B0HPG9WFSR'), `[${lang.toUpperCase()}] Einstein punta al paperback inglese B0HPG9WFSR`);
  }
});

// 5. Verifica Integrità Rotte Protette QR Code
console.log('\n======================================================');
console.log('🔒 5. VERIFICA ROTTE E RISORSE PROTETTE QR CODE');
console.log('======================================================');

const qrUrls = [
  'http://localhost:8080/csa-vol1-bonus-8f2e91b7d4a6.html',
  'http://localhost:8080/csa-vol1-ep1-ita-7b3f91a8d2c4.html',
  'http://localhost:8080/csa-vol2-bonus-46c694dc3ec4.html',
  'http://localhost:8080/csa-vol2-ep1-ita-1c683f8acb67.html',
  'http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/',
  'http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/animazioni/01.Megattere/',
  'http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/en/animazioni/06.Ginocchio.Bionico/',
  'http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/fr/animazioni/06.Ginocchio.Bionico/'
];

qrUrls.forEach(u => {
  const html = dumpDom(u);
  assert(html.length > 500, `Rotta QR accessibile e valida: ${u} (${html.length} byte)`);
});

console.log('\n======================================================');
console.log(`📊 RISULTATI BROWSER E2E: ${totalPassed}/${totalTests} controlli superati!`);
if (errors > 0) {
  console.error(`❌ ${errors} CONTROLLI FALLITI!`);
  process.exit(1);
} else {
  console.log('🎉 TUTTI I TEST NEL BROWSER REALE SU TUTTE LE 9 LINGUE SONO STATI SUPERATI AL 100%!');
  process.exit(0);
}
