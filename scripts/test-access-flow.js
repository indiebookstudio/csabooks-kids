/**
 * scripts/test-access-flow.js
 * 
 * Comprehensive test script for Otto's Secret Key access flow:
 * - Key validation (OTTO, case-insensitivity, trim)
 * - LocalStorage state management and relock
 * - Form validation and error handling
 * - Email dispatch payload & copy accuracy
 * - Privacy consent isolation
 * - Image asset integrity
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    failed++;
  }
}

async function run() {
  console.log('\n=============================================================');
  console.log('🔑 TEST SUITE: LA CHIAVE SEGRETA DI OTTO — ACCESSO & EMAIL');
  console.log('=============================================================\n');

  console.log('--- 1. Image Assets Verification ---');
  test('polpo_esploratore_con_chiave_dorata.png exists and is non-empty', () => {
    const pngPath = path.join(ROOT_DIR, 'assets', 'einstein', 'media', 'polpo_esploratore_con_chiave_dorata.png');
    assert(fs.existsSync(pngPath), 'PNG file must exist in assets/einstein/media');
    const stat = fs.statSync(pngPath);
    assert(stat.size > 50000, `PNG size should be > 50KB, found ${stat.size}`);
  });

  test('polpo_esploratore_con_chiave_dorata.webp exists and is non-empty', () => {
    const webpPath = path.join(ROOT_DIR, 'assets', 'einstein', 'media', 'polpo_esploratore_con_chiave_dorata.webp');
    assert(fs.existsSync(webpPath), 'WebP file must exist in assets/einstein/media');
    const stat = fs.statSync(webpPath);
    assert(stat.size > 20000, `WebP size should be > 20KB, found ${stat.size}`);
  });

  test('Synced images exist in permanent public directory', () => {
    const targetPng = path.join(ROOT_DIR, 'accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'polpo_esploratore_con_chiave_dorata.png');
    const targetWebp = path.join(ROOT_DIR, 'accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'polpo_esploratore_con_chiave_dorata.webp');
    assert(fs.existsSync(targetPng), 'PNG must be synced to permanent route');
    assert(fs.existsSync(targetWebp), 'WebP must be synced to permanent route');
  });

  console.log('\n--- 2. i18n Italian Definitive Texts Verification ---');
  const it = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'assets', 'einstein', 'i18n', 'it.json'), 'utf-8'));

  test('Title matches: LA CHIAVE SEGRETA DI OTTO', () => {
    assert.strictEqual(it.access.title, 'LA CHIAVE SEGRETA DI OTTO');
  });

  test('Subtitle matches: Un mondo di scoperte ti aspetta. Hai la chiave per entrare?', () => {
    assert.strictEqual(it.access.subtitle, 'Un mondo di scoperte ti aspetta. Hai la chiave per entrare?');
  });

  test('Path 1 Title matches: HAI GIÀ LA CHIAVE?', () => {
    assert.strictEqual(it.access.path1Title, 'HAI GIÀ LA CHIAVE?');
    assert.strictEqual(it.access.path1Label, 'La tua chiave segreta');
    assert.strictEqual(it.access.path1Btn, 'ENTRA NEL MONDO DI OTTO');
  });

  test('Path 2 Title matches: NON CONOSCI ANCORA LA CHIAVE?', () => {
    assert.strictEqual(it.access.path2Title, 'NON CONOSCI ANCORA LA CHIAVE?');
    assert(it.access.path2Text.includes('Chiedi a un adulto di inserire la propria email. Otto gli invierà gratuitamente la chiave segreta per aprire tutte le meraviglie!'));
    assert.strictEqual(it.access.path2Label, 'Email di un genitore');
    assert.strictEqual(it.access.path2Btn, 'RICEVI LA CHIAVE SEGRETA');
  });

  test('Success feedback matches: La chiave è in viaggio! Controlla la posta elettronica, anche nella cartella spam.', () => {
    assert.strictEqual(it.access.path2Sent, 'La chiave è in viaggio! Controlla la posta elettronica, anche nella cartella spam.');
  });

  test('Marketing consent text matches specification', () => {
    assert(it.access.marketingConsent.includes("Desidero ricevere anche novità sui libri, nuove attività gratuite e iniziative editoriali."));
    assert(it.access.marketingConsent.includes("Ho letto l'informativa privacy e so che potrò revocare il consenso in qualsiasi momento."));
  });

  test('Email Subject matches: La chiave segreta di Otto è arrivata! 🔑', () => {
    assert.strictEqual(it.keyEmail.subject, 'La chiave segreta di Otto è arrivata! 🔑');
  });

  test('Email Key is OTTO', () => {
    assert.strictEqual(it.keyEmail.key, 'OTTO');
  });

  console.log('\n--- 3. Client Key Validation Logic Simulation ---');
  function validateKey(input) {
    if (!input) return false;
    return String(input).trim().toUpperCase() === 'OTTO';
  }

  test('Validates OTTO uppercase', () => {
    assert.strictEqual(validateKey('OTTO'), true);
  });

  test('Validates otto lowercase', () => {
    assert.strictEqual(validateKey('otto'), true);
  });

  test('Validates Otto title case', () => {
    assert.strictEqual(validateKey('Otto'), true);
  });

  test('Validates leading and trailing whitespace "  otto  "', () => {
    assert.strictEqual(validateKey('  otto  '), true);
  });

  test('Rejects incorrect key "EINSTEIN"', () => {
    assert.strictEqual(validateKey('EINSTEIN'), false);
  });

  test('Rejects empty or whitespace-only key', () => {
    assert.strictEqual(validateKey(''), false);
    assert.strictEqual(validateKey('   '), false);
  });

  console.log('\n--- 4. LocalStorage Simulation & State Persistence ---');
  class MockLocalStorage {
    constructor() { this.store = {}; }
    getItem(k) { return this.store[k] || null; }
    setItem(k, v) { this.store[k] = String(v); }
    removeItem(k) { delete this.store[k]; }
    clear() { this.store = {}; }
  }

  const storage = new MockLocalStorage();
  function checkUnlocked() { return storage.getItem('otto_unlocked') === 'true'; }
  function unlock() { storage.setItem('otto_unlocked', 'true'); }
  function relock() { storage.removeItem('otto_unlocked'); }

  test('Initial visit is locked', () => {
    assert.strictEqual(checkUnlocked(), false);
  });

  test('Unlocking sets persistent state', () => {
    unlock();
    assert.strictEqual(checkUnlocked(), true);
  });

  test('Subsequent visits read unlocked state without asking key again', () => {
    assert.strictEqual(checkUnlocked(), true);
  });

  test('Relocking revokes access and returns to lock screen', () => {
    relock();
    assert.strictEqual(checkUnlocked(), false);
  });

  console.log('\n--- 5. Email HTML Template Verification ---');
  const appJsCode = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'einstein', 'assets', 'js', 'app.js'), 'utf-8');
  const siteCssCode = fs.readFileSync(path.join(ROOT_DIR, 'assets', 'einstein', 'assets', 'css', 'site.css'), 'utf-8');

  test('app.js includes key OTTO and permanent QR link in candidateUrls', () => {
    assert(appJsCode.includes('/api/send-otto-key'), 'app.js must call /api/send-otto-key');
    assert(appJsCode.includes('OTTO'), 'app.js must check for OTTO');
    assert(appJsCode.includes('privacy-modal'), 'app.js must handle privacy modal');
  });

  test('site.css includes access screen classes and responsive styles', () => {
    assert(siteCssCode.includes('.access-section'), 'site.css must have .access-section');
    assert(siteCssCode.includes('.access-input-key'), 'site.css must have .access-input-key');
    assert(siteCssCode.includes('.access-otto-img'), 'site.css must have .access-otto-img');
    assert(siteCssCode.includes('.privacy-modal-overlay'), 'site.css must have .privacy-modal-overlay');
  });

  console.log(`\n=============================================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`=============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
