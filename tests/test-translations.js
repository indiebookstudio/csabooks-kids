const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'data', 'i18n.json');
if (!fs.existsSync(i18nPath)) {
  console.error('❌ ERRORE: data/i18n.json non trovato!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
const requiredLangs = ['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp'];

console.log('🧪 VERIFICA COMPARATIVA I18N — 9 LINGUE...');

let hasErrors = false;
const baseLang = 'it';
const baseKeys = [];

function collectKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(collectKeys(val, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const allBaseKeys = collectKeys(data[baseLang]);
console.log(`📋 Chiavi totali nel dizionario base (${baseLang.toUpperCase()}): ${allBaseKeys.length}`);

function getValue(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return cur;
}

requiredLangs.forEach(lang => {
  if (!data[lang]) {
    console.error(`❌ Lingua mancante: ${lang}`);
    hasErrors = true;
    return;
  }

  let missing = 0;
  let empty = 0;
  let todos = 0;

  allBaseKeys.forEach(k => {
    const val = getValue(data[lang], k);
    if (val === undefined) {
      console.error(`  [${lang.toUpperCase()}] Chiave mancante: ${k}`);
      missing++;
    } else if (typeof val === 'string' && val.trim() === '') {
      console.error(`  [${lang.toUpperCase()}] Valore vuoto per: ${k}`);
      empty++;
    } else if (typeof val === 'string' && /\b(TODO|FIXME|PLACEHOLDER)\b/.test(val)) {
      console.error(`  [${lang.toUpperCase()}] Stringa non definitiva (TODO/PLACEHOLDER): ${k}`);
      todos++;
    }
  });

  if (missing === 0 && empty === 0 && todos === 0) {
    console.log(`  ✅ [${lang.toUpperCase()}] 100% Completo (${allBaseKeys.length}/${allBaseKeys.length} chiavi verificate)`);
  } else {
    console.error(`  ❌ [${lang.toUpperCase()}] Problemi riscontrati: ${missing} mancanti, ${empty} vuoti, ${todos} TODO`);
    hasErrors = true;
  }
});

// Verifica anche che in data/books.json tutte le categorie abbiano traduzioni per le 9 lingue
const booksPath = path.join(__dirname, '..', 'data', 'books.json');
if (fs.existsSync(booksPath)) {
  const booksData = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
  console.log('📋 Verifica traduzioni categorie in books.json...');
  booksData.categories.forEach(cat => {
    requiredLangs.forEach(lang => {
      if (!cat.title[lang] || cat.title[lang].trim() === '') {
        console.error(`  ❌ Categoria ${cat.id} priva di titolo in ${lang}`);
        hasErrors = true;
      }
      if (!cat.subtitle[lang] || cat.subtitle[lang].trim() === '') {
        console.error(`  ❌ Categoria ${cat.id} priva di sottotitolo in ${lang}`);
        hasErrors = true;
      }
    });
  });
  console.log('  ✅ Tutte le categorie contengono titoli e descrizioni per tutte le 9 lingue!');
}

console.log('----------------------------------------');
if (hasErrors) {
  console.error('❌ VERIFICA I18N FALLITA: Correggere le chiavi o i valori mancanti.');
  process.exit(1);
} else {
  console.log('🎉 VERIFICA I18N SUPERATA: 0 CHIAVI MANCANTI, 0 VALORI VUOTI!');
  process.exit(0);
}
