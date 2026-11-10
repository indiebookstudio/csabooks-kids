const fs = require('fs');
const path = require('path');

console.log('🧪 VERIFICA REGOLE MULTILINGUA CATALOGO & EDIZIONI...');

// Load data files
const booksData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf8'));
const i18nData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'i18n.json'), 'utf8'));

// Load app-2.0.js logic into sandbox
const appPath = fs.existsSync(path.join(__dirname, '..', 'js', 'app-2.0.js')) 
  ? path.join(__dirname, '..', 'js', 'app-2.0.js') 
  : path.join(__dirname, '..', 'app-2.0.js');
const appJs = fs.readFileSync(appPath, 'utf8');

const vm = require('vm');
const sandbox = {
  window: {},
  document: {
    documentElement: { lang: 'it' },
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {}
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  navigator: { language: 'it' },
  location: { search: '' },
  CSA_BOOKS_DATA: booksData,
  SITE_I18N: i18nData,
  console: console
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(appJs, sandbox);

const { getEffectiveBookLang, isBookAvailableInLang, getAmazonPaperbackUrl, getBookCover } = sandbox;

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    errors++;
  } else {
    console.log(`  ✓ ${message}`);
  }
}

console.log('\n--- 1. Verifica Mappatura Lingue (NL, PL, SE, JP -> EN) ---');
assert(getEffectiveBookLang('it') === 'it', "IT maps to 'it'");
assert(getEffectiveBookLang('en') === 'en', "EN maps to 'en'");
assert(getEffectiveBookLang('fr') === 'fr', "FR maps to 'fr'");
assert(getEffectiveBookLang('de') === 'de', "DE maps to 'de'");
assert(getEffectiveBookLang('es') === 'es', "ES maps to 'es'");
assert(getEffectiveBookLang('nl') === 'en', "NL maps to 'en'");
assert(getEffectiveBookLang('pl') === 'en', "PL maps to 'en'");
assert(getEffectiveBookLang('se') === 'en', "SE maps to 'en'");
assert(getEffectiveBookLang('jp') === 'en', "JP maps to 'en'");

console.log('\n--- 2. Verifica Missione Savana e SOS Natale (csa-09 & csa-10) ---');
const csa10 = booksData.books.find(b => b.id === 'csa-10-leo-bruno-natale');
assert(Boolean(csa10), "Libro csa-10 trovato in catalogo");
assert(isBookAvailableInLang(csa10, 'it') === true, "SOS Natale DISPONIBILE in IT");
assert(isBookAvailableInLang(csa10, 'en') === false, "SOS Natale NON disponibile in EN");
assert(isBookAvailableInLang(csa10, 'fr') === false, "SOS Natale NON disponibile in FR");
console.log('\n--- 2. Verifica Missione Savana (csa-09-leo-rudy-savana) ---');
const savana = booksData.books.find(b => b.id === 'csa-09-leo-rudy-savana');
assert(Boolean(savana), "Libro csa-09 trovato in catalogo");
assert(isBookAvailableInLang(savana, 'it') === true, "Savana DISPONIBILE in IT");
assert(isBookAvailableInLang(savana, 'en') === false, "Savana NON disponibile in EN");
assert(isBookAvailableInLang(savana, 'fr') === false, "Savana NON disponibile in FR");
assert(isBookAvailableInLang(savana, 'de') === false, "Savana NON disponibile in DE");
assert(isBookAvailableInLang(savana, 'es') === false, "Savana NON disponibile in ES");
assert(isBookAvailableInLang(savana, 'nl') === false, "Savana NON disponibile in NL");
assert(isBookAvailableInLang(savana, 'pl') === false, "Savana NON disponibile in PL");
assert(isBookAvailableInLang(savana, 'se') === false, "Savana NON disponibile in SE");
assert(isBookAvailableInLang(savana, 'jp') === false, "Savana NON disponibile in JP");

console.log('\n--- 3. Verifica Edizioni Francesi (3 Libri Cantiere + Einstein) ---');
const frBooks = booksData.books.filter(b => isBookAvailableInLang(b, 'fr'));
console.log(`Libri disponibili in FR (${frBooks.length}):`, frBooks.map(b => b.id).join(', '));
assert(frBooks.length === 4, "In francese ci sono ESATTAMENTE 4 libri disponibili (3 Cantiere + Einstein)");
assert(frBooks.some(b => b.id === 'csa-01-benny-collina'), "Benny disponibile in FR");
assert(frBooks.some(b => b.id === 'csa-02-rudy-spiaggia'), "Rudy disponibile in FR");
assert(frBooks.some(b => b.id === 'csa-03-leo-montagna'), "Leo disponibile in FR");
assert(!frBooks.some(b => b.id === 'csa-04-bruno-papere'), "Bruno NON disponibile in FR");
assert(!frBooks.some(b => b.id === 'csa-09-leo-rudy-savana'), "Savana NON disponibile in FR");
assert(frBooks.some(b => b.id === 'einstein'), "Einstein DISPONIBILE in FR");

console.log('\n--- 3b. Verifica Anteprime/Interiors Einstein (IT, EN, FR) ---');
const manifestData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books-manifest.json'), 'utf8'));
assert(manifestData.einstein && manifestData.einstein.it && manifestData.einstein.it.interiors.length === 26, `Einstein IT ha 26 pagine interne (${manifestData.einstein?.it?.interiors?.length})`);
assert(manifestData.einstein && manifestData.einstein.en && manifestData.einstein.en.interiors.length === 25, `Einstein EN ha 25 pagine interne (${manifestData.einstein?.en?.interiors?.length})`);
assert(manifestData.einstein && manifestData.einstein.fr && manifestData.einstein.fr.interiors.length === 25, `Einstein FR ha 25 pagine interne (${manifestData.einstein?.fr?.interiors?.length})`);


console.log('\n--- 4. Verifica Disponibilità NL, PL, SE, JP (Trattati come EN) ---');
['nl', 'pl', 'se', 'jp'].forEach(lang => {
  const booksInLang = booksData.books.filter(b => isBookAvailableInLang(b, lang));
  assert(booksInLang.length === 10, `In [${lang.toUpperCase()}] ci sono 10 libri disponibili in inglese (incluso Raccolta Vol 1 EN)`);
  assert(!booksInLang.some(b => b.id === 'csa-09-leo-rudy-savana'), `In [${lang.toUpperCase()}] Savana non compare`);
  assert(booksInLang.some(b => b.id === 'csa-vol1'), `In [${lang.toUpperCase()}] Raccolta Vol 1 (EN) compare`);
  assert(!booksInLang.some(b => b.id === 'csa-vol2'), `In [${lang.toUpperCase()}] Raccolta Vol 2 (IT) non compare`);

  // Verify book cover resolves to English cover
  const bennyCover = getBookCover('csa-01-benny-collina', lang);
  assert(bennyCover.includes('/en/cover.png'), `In [${lang.toUpperCase()}] la copertina di Benny punta a /en/cover.png`);
  const vol1Cover = getBookCover('csa-vol1', lang);
  assert(vol1Cover.includes('/en/cover.png'), `In [${lang.toUpperCase()}] la copertina di Raccolta Vol 1 punta a /en/cover.png`);
});

console.log('\n--- 5. Verifica Sottotitoli cantierePage.episodesSubtitle ---');
const langs = ['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp'];
langs.forEach(lang => {
  const sub = i18nData[lang].cantierePage.episodesSubtitle;
  if (lang === 'it') {
    assert(sub.includes('Savana'), `[IT] Sottotitolo cita Savana: "${sub}"`);
  } else {
    assert(!sub.toLowerCase().includes('savana') && !sub.toLowerCase().includes('savannah'), `[${lang.toUpperCase()}] Sottotitolo NON cita Savana: "${sub}"`);
  }
});

console.log('----------------------------------------------------');
if (errors > 0) {
  console.error(`❌ TEST FALLITO CON ${errors} ERRORI`);
  process.exit(1);
} else {
  console.log('🎉 TUTTE LE REGOLE MULTILINGUA SONO STATE VERIFICATE CON SUCCESSO!');
  process.exit(0);
}
