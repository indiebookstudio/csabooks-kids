const { execFileSync } = require('child_process');
const fs = require('fs');
const assert = require('assert');

const CHROME_PATH = 'C:\\Users\\Marco\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';
if (!fs.existsSync(CHROME_PATH)) {
  console.error('❌ Chrome non trovato a:', CHROME_PATH);
  process.exit(1);
}

function dumpDom(url) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--virtual-time-budget=4000',
    '--dump-dom',
    url
  ];
  return execFileSync(CHROME_PATH, args, { encoding: 'utf8', timeout: 30000, maxBuffer: 50 * 1024 * 1024 });
}

console.log('🌐 VERIFICA BROWSER REALE (HEADLESS CHROME) MICROSITO EINSTEIN...\n');

let passed = 0;
let total = 0;

function test(desc, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

const langs = ['it', 'en', 'fr', 'es'];

// 1. Access portal across 4 languages
langs.forEach(lang => {
  const url = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/?lang=${lang}`;
  const html = dumpDom(url);

  test(`[${lang.toUpperCase()}] Access portal loads successfully`, () => {
    assert(html.includes('id="app"'), 'App container missing');
  });

  test(`[${lang.toUpperCase()}] Marketing checkbox is NOT checked`, () => {
    assert(html.includes('id="chk-marketing"'), 'chk-marketing missing');
    assert(!html.includes('id="chk-marketing" checked'), 'chk-marketing has checked attribute');
  });

  test(`[${lang.toUpperCase()}] Form titles and buttons rendered correctly`, () => {
    if (lang === 'it') assert(html.includes('LA CHIAVE SEGRETA DI OTTO'), 'Title mismatch');
    if (lang === 'en') assert(html.includes('OTTO’S SECRET KEY') || html.includes("OTTO'S SECRET KEY"), 'Title mismatch');
    if (lang === 'fr') assert(html.includes('LA CLÉ SECRÈTE D’OTTO') || html.includes("LA CLÉ SECRÈTE D'OTTO"), 'Title mismatch');
    if (lang === 'es') assert(html.includes('LA LLAVE SECRETA DE OTTO'), 'Title mismatch');
  });
});

// 2. Museo across 4 languages
langs.forEach(lang => {
  const url = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/museo/index.html`;
  const html = dumpDom(url);

  test(`[${lang.toUpperCase()}] Museo loads successfully`, () => {
    assert(html.includes('id="main"'), 'Museo main container missing');
  });

  test(`[${lang.toUpperCase()}] Museo does not have malformed counters in DOM`, () => {
    assert(!html.includes('Sala  di 7'), 'Malformed crumb');
    assert(!html.includes('Gallery  of 7'), 'Malformed crumb');
    assert(!html.includes('Salle  sur 7'), 'Malformed crumb');
    assert(!html.includes('Sala  de 7'), 'Malformed crumb');
    assert(!html.includes(': /7 sigilli'), 'Malformed passport button');
  });
});

// 3. 3D Animations across 4 languages
langs.forEach(lang => {
  const url06 = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/animazioni/06.Ginocchio.Bionico/index.html`;
  const html06 = dumpDom(url06);

  test(`[${lang.toUpperCase()}] Animazione 06.Ginocchio loads correctly in browser`, () => {
    assert(html06.includes('id="canvas-wrap"'), 'Canvas wrap missing');
    assert(html06.includes('id="info-dialog"'), 'Info dialog missing');
    if (lang === 'fr') {
      assert(html06.includes('CORPS ET TECHNOLOGIE'), 'French caption missing');
      assert(html06.includes('Un genou qui écoute'), 'French title missing');
      assert(!html06.includes('Entriamo nel laboratorio del movimento…'), 'Italian loading text present');
    }
    if (lang === 'en') {
      assert(html06.includes('BODY & TECHNOLOGY') || html06.includes('BODY AND TECHNOLOGY'), 'English caption missing');
      assert(html06.includes('A knee that listens'), 'English title missing');
    }
  });

  const url07 = `http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/animazioni/07.Buco.Nero/index.html`;
  const html07 = dumpDom(url07);

  test(`[${lang.toUpperCase()}] Animazione 07.Buco.Nero loads correctly in browser`, () => {
    assert(html07.includes('id="canvas-wrap"'), 'Canvas wrap missing');
    assert(html07.includes('id="info-dialog"'), 'Info dialog missing');
    if (lang === 'fr') {
      assert(html07.includes('M87*') && html07.includes('COLLABORATION MONDIALE'), 'French caption missing');
      assert(!html07.includes('Entriamo nella rete di radiotelescopi…'), 'Italian loading text present');
    }
  });
});

console.log('\n========================================');
console.log(`Results: ${passed} passed, ${total - passed} failed`);
console.log('========================================\n');

if (passed === total) {
  console.log('🎉 TUTTI I TEST IN BROWSER REALE SONO STATI SUPERATI CON SUCCESSO!');
}
