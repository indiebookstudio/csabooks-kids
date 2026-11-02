/**
 * Comprehensive verification of Einstein Bonus Audit Requirements
 */
const fs = require('fs');
const assert = require('assert');

console.log('🧪 VERIFICA AUDIT FINALE E DEFINITIVO BONUS EINSTEIN...\n');

let passed = 0;
let total = 0;

function check(desc, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    Error: ${err.message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------
// 1. Problema A: Consenso Marketing Preselezionato
// -------------------------------------------------------------
console.log('--- 1. Problema A: Consenso Marketing Preselezionato ---');

const appJsPaths = [
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/assets/js/app.js',
  'assets/einstein/assets/js/app.js'
];

appJsPaths.forEach(p => {
  const code = fs.readFileSync(p, 'utf8');
  check(`Checkbox marketing in ${p} non ha l'attributo 'checked'`, () => {
    assert(!code.includes('<input type="checkbox" id="chk-marketing" checked>'), 'Found checked attribute on chk-marketing');
    assert(code.includes('<input type="checkbox" id="chk-marketing">'), 'chk-marketing input not found');
  });
});

// -------------------------------------------------------------
// 2. Problema B: Informativa Privacy Completa in 4 Lingue
// -------------------------------------------------------------
console.log('\n--- 2. Problema B: Informativa Privacy nelle 4 Lingue ---');

appJsPaths.forEach(p => {
  const code = fs.readFileSync(p, 'utf8');
  check(`Informativa privacy in ${p} ha versioni dedicate per it, en, fr, es`, () => {
    assert(code.includes('privacyBodies'), 'privacyBodies dictionary missing');
    assert(code.includes("it: `") || code.includes("it:`"), 'Italian privacy missing');
    assert(code.includes("en: `") || code.includes("en:`"), 'English privacy missing');
    assert(code.includes("fr: `") || code.includes("fr:`"), 'French privacy missing');
    assert(code.includes("es: `") || code.includes("es:`"), 'Spanish privacy missing');
  });
  check(`La privacy francese in ${p} non contiene fallback in italiano`, () => {
    const frMatch = code.match(/fr:\s*`([\s\S]*?)`/);
    assert(frMatch, 'fr privacy text not extracted');
    const frText = frMatch[1];
    assert(frText.includes('Règlement UE 2016/679 (RGPD)'), 'Missing French legal reference');
    assert(!frText.includes('Informativa sul trattamento dei dati personali'), 'Italian title found in French privacy');
  });
  check(`La privacy spagnola in ${p} non contiene fallback in italiano`, () => {
    const esMatch = code.match(/es:\s*`([\s\S]*?)`/);
    assert(esMatch, 'es privacy text not extracted');
    const esText = esMatch[1];
    assert(esText.includes('Reglamento UE 2016/679 (RGPD)'), 'Missing Spanish legal reference');
    assert(!esText.includes('Informativa sul trattamento dei dati personali'), 'Italian title found in Spanish privacy');
  });
});

// -------------------------------------------------------------
// 3. Problema C: Biblioteca Scientifica & Fonti Integrative
// -------------------------------------------------------------
console.log('\n--- 3. Problema C: Biblioteca Scientifica & Fonti Integrative ---');

['en', 'fr', 'es'].forEach(lang => {
  const p = `accesso/4dcbbaee2e69a278e4e59eab50430ccc/content/fonti_${lang}.csv`;
  const content = fs.readFileSync(p, 'utf8');
  check(`CSV fonti in ${lang} non contiene frasi descrittive in italiano`, () => {
    const itTerms = [
      'Documento originale',
      'Articolo completo',
      'Stampa pagina web',
      'Immagine e comunicato',
      'Fonte dei calcoli',
      'Traduzione di sintesi'
    ];
    itTerms.forEach(t => {
      assert(!content.includes(t), `Found untranslated term "${t}" in ${p}`);
    });
  });
});

appJsPaths.forEach(p => {
  const code = fs.readFileSync(p, 'utf8');
  check(`Logica fonti integrative in ${p} localizza tipi, autori e badge per 4 lingue`, () => {
    assert(code.includes('localizeIntegrativeItem'), 'localizeIntegrativeItem function missing');
    assert(code.includes('correlata') && code.includes('related') && code.includes('associée') && code.includes('relacionada'), 'Missing localized badge texts');
    assert(code.includes('Auteurs/Origine') && code.includes('Autores/Origen'), 'Missing localized authors label');
  });
});

// -------------------------------------------------------------
// 4. Problema D: Contatori & Stringhe Museo
// -------------------------------------------------------------
console.log('\n--- 4. Problema D: Contatori e Stringhe Museo ---');

['it', 'en', 'fr', 'es'].forEach(lang => {
  const p = `accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/museo/app.js`;
  const code = fs.readFileSync(p, 'utf8');
  check(`Museo [${lang}] non ha contatori malformati nella breadcrumb`, () => {
    assert(!code.includes('Sala  di 7'), 'Malformed breadcrumb found');
    assert(!code.includes('Gallery  of 7'), 'Malformed breadcrumb found');
    assert(!code.includes('Salle  sur 7'), 'Malformed breadcrumb found');
    assert(!code.includes('Sala  de 7'), 'Malformed breadcrumb found');
    assert(code.includes('${r.id}'), 'Missing room id interpolation in breadcrumb');
  });
  check(`Museo [${lang}] non ha contatori malformati nel pulsante passaporto`, () => {
    assert(!code.includes(': /7 sigilli'), 'Malformed passport label');
    assert(!code.includes(': /7 seals'), 'Malformed passport label');
    assert(!code.includes(': /7 sceaux'), 'Malformed passport label');
    assert(!code.includes(': /7 sellos'), 'Malformed passport label');
  });
  check(`Museo [${lang}] ha messaggi di congratulazioni condizionati a completed.size === 7`, () => {
    assert(code.includes('completed.size===7') || code.includes('completed.size === 7'), 'Passport congratulation not conditional on 7');
  });
  check(`Museo [${lang}] ha le opzioni di sfida strutturate coerentemente con IT`, () => {
    assert(code.includes('data-val="osservato"') && code.includes('data-val="ipotesi"'), 'Challenge values mismatch');
  });
});

// -------------------------------------------------------------
// 5. Animazioni 3D: Tutte e 7 tradotte integralmente in 4 lingue
// -------------------------------------------------------------
console.log('\n--- 5. Animazioni 3D: Completezza delle 7 animazioni in 4 lingue ---');

const anims = [
  '01.Megattere',
  '02.Felce.DNA',
  '03.Pesce.Veicolo',
  '04.Uccelli.Dinosauri',
  '05.Fungo.Robot',
  '06.Ginocchio.Bionico',
  '07.Buco.Nero'
];

anims.forEach(anim => {
  ['en', 'fr', 'es'].forEach(lang => {
    const file = `accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/${lang}/animazioni/${anim}/index.html`;
    check(`Animazione ${anim} [${lang}] esiste ed è popolata`, () => {
      assert(fs.existsSync(file), `File not found: ${file}`);
      const stat = fs.statSync(file);
      assert(stat.size > 20000, `File size too small: ${stat.size} bytes`);
    });
    
    check(`Animazione ${anim} [${lang}] non contiene dialoghi o indicatori in italiano non tradotto`, () => {
      const html = fs.readFileSync(file, 'utf8');
      assert(!html.includes('Entriamo nel laboratorio del movimento…'), 'Found Italian loading text in knee');
      assert(!html.includes('La scena 3D non è disponibile'), 'Found Italian error text');
      assert(!html.includes('Apri questo HTML in un browser'), 'Found Italian error instruction');
      assert(!html.includes('Il modello è pronto'), 'Found Italian status text');
      assert(!html.includes('1 · Il muscolo genera un segnale'), 'Found Italian signal text');
      assert(!html.includes('Sette strumenti. Cinque luoghi. Una squadra.'), 'Found Italian 07 title');
      assert(!html.includes('Pochi campioni · informazioni mancanti'), 'Found Italian 07 sample');
    });
  });
});

// -------------------------------------------------------------
// 6. Integrità Download PDF e Asset Bonus
// -------------------------------------------------------------
console.log('\n--- 6. Integrità Download PDF e Asset Bonus ---');

const pdfs = [
  'assets/einstein/bonus/it/carte/OTTO_CARTE_36_FRONTE_RETRO_A4.pdf',
  'assets/einstein/bonus/it/carte/OTTO_GUIDA_PREMIUM.pdf',
  'assets/einstein/bonus/it/colora/colora.pdf',
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/carte/OTTO_CARTE_36_FRONTE_RETRO_A4.pdf',
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/carte/OTTO_GUIDA_PREMIUM.pdf',
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/it/colora/colora.pdf'
];

pdfs.forEach(pdf => {
  check(`File PDF ${pdf} esiste ed è valido`, () => {
    assert(fs.existsSync(pdf), `Missing PDF: ${pdf}`);
    assert(fs.statSync(pdf).size > 1000, `PDF size too small: ${pdf}`);
  });
});

console.log('\n========================================');
console.log(`Results: ${passed} passed, ${total - passed} failed`);
console.log('========================================\n');

if (passed === total) {
  console.log('🎉 AUDIT BONUS EINSTEIN COMPLETATO CON SUCCESSO SENZA ERRORI!');
}
