const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🧪 VERIFICA SISTEMATICA CATALOGO, LINGUE E LINK AMAZON...');

// Load data files
const booksData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));
const manifestData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books-manifest.json'), 'utf8'));
const i18nData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'i18n.json'), 'utf8'));
const appJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'app-2.0.js'), 'utf8');

const languages = ['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp'];
let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`  ✓ ${message}`);
  }
}

// 1. Check all books in books.json have valid paperback ASINs
console.log('\n--- 1. Verifica Integrità ASIN Paperback in books.json ---');
const expectedAsins = {
  'einstein': { it: 'B0HP6YD1CM', en: 'B0HPG9WFSR', fr: 'B0HQ1F1HX8', es: 'B0HQZJB7V4' },
  'csa-vol1': { it: 'B0HN4QMLV1', en: 'B0HR9DZ64D' },
  'csa-vol2': { it: 'B0HPB2L59F' }, // Correct Paperback!
  'fano': { it: 'B0HD2X6HVJ' },
  'csa-01-benny-collina': { it: 'B0H6MN4LW7', en: 'B0H6SBPNM5', fr: 'B0HJM5R74L' },
  'csa-02-rudy-spiaggia': { it: 'B0H6Q5TX7M', en: 'B0H6XV8LN6', fr: 'B0HJX2H3MF' },
  'csa-03-leo-montagna': { it: 'B0H6MY4W6X', en: 'B0H6ZDZ2N8', fr: 'B0HJWY3YZ4' },
  'csa-04-bruno-papere': { it: 'B0H6QFZBDS', en: 'B0H6SDVJDZ' },
  'csa-05-benny-roma': { it: 'B0H6VBNX5D', en: 'B0H6XMYR8Q' },
  'csa-06-nina-conigli': { it: 'B0H717X9ZL', en: 'B0H723KGZ5' },
  'csa-07-rino-ladri': { it: 'B0H75DDGLQ', en: 'B0H75N8JT9' },
  'csa-08-leo-cinciallegra': { it: 'B0H7JK9R46', en: 'B0H7LPQ8KX' },
  'csa-09-leo-rudy-savana': { it: 'B0HJRRRDMX' },
  'csa-10-leo-bruno-natale': { it: 'B0HQ72DLC7' }
};

let verifiedButtonsCount = 0;

for (const [bookId, eds] of Object.entries(expectedAsins)) {
  const book = booksData.books.find(b => b.id === bookId);
  assert(Boolean(book), `Libro ${bookId} presente in data/books.json`);
  for (const [lang, expectedAsin] of Object.entries(eds)) {
    const ed = book.editions[lang];
    assert(Boolean(ed && ed.available), `Edizione ${lang.toUpperCase()} di ${bookId} disponibile`);
    assert(ed.asin === expectedAsin, `ASIN ${bookId} [${lang}] corretto (${ed.asin} === ${expectedAsin})`);
    assert(ed.asin !== 'B0HN9G1V81', `ASIN ${bookId} [${lang}] NON è il Kindle B0HN9G1V81`);
  }
}

// 2. Test sandbox simulation across all 9 languages
console.log('\n--- 2. Verifica Generazione Catalog e Link per tutte le 9 Lingue ---');

languages.forEach(lang => {
  console.log(`\nTesting lingua: [${lang.toUpperCase()}]`);

  // DOM Mock for Catalog
  let catalogInner = '';
  const domElements = {
    'csa-catalog-grid': { set innerHTML(val) { catalogInner = val; }, get innerHTML() { return catalogInner; } },
    'csa-catalog-count': { textContent: '' },
    'in-primo-piano': { style: {} },
    'csa-featured-grid': { style: {}, set innerHTML(val) {}, get innerHTML() { return ''; } },
    'raccolte': { style: {} },
    'cantiere-episodes-grid': { set innerHTML(val) {}, get innerHTML() { return ''; } }
  };

  const sandbox = {
    window: {}, CustomEvent: class CustomEvent { constructor(type, opt) { this.type = type; this.detail = opt?.detail; } },
    document: {
      documentElement: { lang },
      querySelectorAll: () => [], querySelector: () => null,
      getElementById: (id) => domElements[id] || null,
      createElement: (tag) => ({
        id: '', className: '', setAttribute: () => {}, appendChild: () => {}, addEventListener: () => {}
      }),
      body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {} } },
      addEventListener: () => {}
    },
    localStorage: { getItem: () => null, setItem: () => {} },
    navigator: { language: lang, languages: [lang] },
    location: { search: '', pathname: '/catalogo.html' },
    CSA_BOOKS_DATA: booksData,
    BOOKS_MANIFEST: manifestData,
    SITE_I18N: i18nData,
    console: { log: () => {}, warn: console.warn, error: console.error }
  };
  sandbox.window = sandbox; sandbox.dispatchEvent = () => {};

  vm.createContext(sandbox);
  vm.runInContext(appJs, sandbox);

  // Set language
  sandbox.setLanguage(lang, false);

  // Check catalog items rendered
  const articles = catalogInner.match(/<article\b[^>]*>/g) || [];
  assert(articles.length === 14, `[${lang.toUpperCase()}] Catalogo mostra esattamente 14 libri pubblicati (trovati: ${articles.length})`);

  // Verify all 13 books have Amazon URL and correct Paperback ASIN
  booksData.books.forEach(b => {
    if (!expectedAsins[b.id]) return; // ignore unpublished books like bussola
    const url = sandbox.getAmazonPaperbackUrl(b, lang);
    assert(Boolean(url), `[${lang.toUpperCase()}] Link Amazon generato per ${b.id}: ${url}`);
    assert(url.includes('/dp/'), `[${lang.toUpperCase()}] Link Amazon contiene /dp/`);
    assert(!url.includes('B0HN9G1V81'), `[${lang.toUpperCase()}] Link Amazon per ${b.id} NON è il Kindle errato B0HN9G1V81`);

    if (b.id === 'csa-vol1') {
      if (lang === 'it') {
        assert(url.includes('B0HN4QMLV1'), `[${lang.toUpperCase()}] CSA Vol 1 punta al Paperback IT B0HN4QMLV1: ${url}`);
      } else {
        assert(url.includes('B0HR9DZ64D'), `[${lang.toUpperCase()}] CSA Vol 1 punta al Paperback EN B0HR9DZ64D: ${url}`);
      }
    }

    if (b.id === 'csa-vol2') {
      assert(url.includes('B0HPB2L59F'), `[${lang.toUpperCase()}] CSA Vol 2 punta ESCLUSIVAMENTE al Paperback B0HPB2L59F: ${url}`);
    }

    verifiedButtonsCount++;
  });
});

console.log('\n--- 3. Verifica Pulsanti Statici nei file HTML ---');
const htmlFiles = [
  'index.html', 'catalogo.html', 'cantiere.html', 'scienza.html', 'colorare.html', 'scuola.html', 'about.html'
];

htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  assert(!content.includes('B0HN9G1V81'), `${f} NON contiene il vecchio ASIN Kindle B0HN9G1V81`);
  if (content.includes('csa-cantiere-vol2-buy')) {
    assert(content.includes('B0HPB2L59F'), `${f} contiene il corretto ASIN Paperback B0HPB2L59F per csa-cantiere-vol2-buy`);
    verifiedButtonsCount++;
  }
});

console.log('\n--- 4. Verifica Anteprime e Storie CSA Vol 1 e Vol 2 ---');
['csa-vol1', 'csa-vol2'].forEach(id => {
  const book = booksData.books.find(b => b.id === id);
  assert(Array.isArray(book.storiesIncluded) && book.storiesIncluded.length === 4, `${id} contiene esattamente 4 storie`);
  book.storiesIncluded.forEach((s, idx) => {
    assert(typeof s === 'string' && s.length > 5, `${id} storia ${idx + 1}: "${s}"`);
  });
});

console.log(`\nTotale controlli pulsanti ed edizioni Amazon eseguiti: ${verifiedButtonsCount}`);
console.log('----------------------------------------------------');
if (errors > 0) {
  console.error(`❌ TEST FALLITO CON ${errors} ERRORI`);
  process.exit(1);
} else {
  console.log('🎉 TUTTI I CONTROLLI CATALOGO, MULTILINGUA E AMAZON SONO STATI SUPERATI CON SUCCESSO!');
  process.exit(0);
}
