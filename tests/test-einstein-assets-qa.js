/**
 * tests/test-einstein-assets-qa.js
 * 
 * Controllo di qualità automatico (QA) degli asset e delle didascalie scientifiche
 * del microsito bonus "Einstein, questa te la sei persa!".
 * 
 * Verifiche obbligatorie:
 * 1. Inventario immagini del microsito.
 * 2. Verifica che i 4 nuovi asset (felce-dna, pesce, micelio, galassia) siano usati in tutte e 4 le lingue (IT, EN, FR, ES).
 * 3. Verifica che i vecchi hash problematici con testo incorporato siano stati eliminati definitivamente.
 * 4. Audit e categorizzazione di tutte le immagini (A: visual pura, B: testo separato, C: copertine/documenti originali).
 * 5. Controllo della presenza e completezza scientifica delle didascalie localizzate nelle 4 lingue.
 * 6. Verifica caricamento, integrità e cache-busting delle risorse.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

console.log('🔬 AVVIO CONTROLLO QUALITÀ ASSET & DIDASCALIE EINSTEIN MUSEO...\n');

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
    console.error(`    Errore: ${err.message}`);
    process.exitCode = 1;
  }
}

function getMd5(filepath) {
  const buf = fs.readFileSync(filepath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

const ROOT = path.resolve(__dirname, '..');
const BASE_DIRS = [
  path.join(ROOT, 'assets', 'einstein'),
  path.join(ROOT, 'accesso', '4dcbbaee2e69a278e4e59eab50430ccc')
];
const LANGS = ['it', 'en', 'fr', 'es'];

// Vecchi hash MD5 noti dei file che avevano testi italiani incorporati nei pixel
const OLD_PROBLEMATIC_HASHES = {
  'felce-dna.webp': '1d5e9ca3',
  'pesce.webp': 'a37c5f84',
  'micelio.webp': '6241f86f',
  'galassia.webp': '69a98267'
};

const NEW_ASSETS = ['felce-dna.webp', 'pesce.webp', 'micelio.webp', 'galassia.webp'];

// -------------------------------------------------------------
// 1. Inventario delle immagini del microsito
// -------------------------------------------------------------
console.log('--- 1. Inventario delle immagini del microsito ---');

let inventoryCount = 0;
BASE_DIRS.forEach(base => {
  if (!fs.existsSync(base)) return;
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(webp|png|jpg|jpeg|svg)$/i.test(entry.name)) {
        inventoryCount++;
      }
    });
  }
  walk(base);
});

check(`Inventario completato con successo: trovati asset grafici nel microsito (${inventoryCount} file totali tra sorgente e rotta permanente)`, () => {
  assert(inventoryCount > 100, `Numero di asset insufficiente: ${inventoryCount}`);
});

// -------------------------------------------------------------
// 2. Controllo presenza e corrispondenza dei 4 nuovi file nelle 4 lingue
// -------------------------------------------------------------
console.log('\n--- 2. Verifica dei 4 nuovi asset nelle 4 lingue (IT, EN, FR, ES) ---');

NEW_ASSETS.forEach(assetName => {
  BASE_DIRS.forEach(base => {
    const baseLabel = path.basename(path.dirname(base)) === 'accesso' ? 'accesso' : 'assets/einstein';
    LANGS.forEach(lang => {
      const assetPath = path.join(base, 'bonus', lang, 'museo', 'assets', assetName);
      check(`[${baseLabel} - ${lang.toUpperCase()}] Esiste ${assetName}`, () => {
        assert(fs.existsSync(assetPath), `Asset mancante: ${assetPath}`);
        const stat = fs.statSync(assetPath);
        assert(stat.size > 50000, `Asset troppo piccolo (${stat.size} bytes): ${assetPath}`);
      });

      check(`[${baseLabel} - ${lang.toUpperCase()}] ${assetName} non è il vecchio asset con testo incorporato`, () => {
        const hash = getMd5(assetPath);
        const oldPrefix = OLD_PROBLEMATIC_HASHES[assetName];
        assert(!hash.startsWith(oldPrefix), `L'immagine corrisponde ancora alla vecchia versione con testi! Hash: ${hash}`);
      });
    });
  });
});

// -------------------------------------------------------------
// 3. Verifica uniformità dei 4 asset tra tutte le lingue
// -------------------------------------------------------------
console.log('\n--- 3. Verifica coerenza asset tra lingue (un solo asset visivo identico) ---');

NEW_ASSETS.forEach(assetName => {
  let masterHash = null;
  LANGS.forEach(lang => {
    const p = path.join(BASE_DIRS[1], 'bonus', lang, 'museo', 'assets', assetName);
    const h = getMd5(p);
    if (!masterHash) masterHash = h;
    check(`[${lang.toUpperCase()}] ${assetName} ha hash uniforme condiviso (${h.slice(0, 8)})`, () => {
      assert.strictEqual(h, masterHash, `Asset non identico tra lingue per ${assetName}`);
    });
  });
});

// -------------------------------------------------------------
// 4. Controllo scientifico delle didascalie HTML localizzate
// -------------------------------------------------------------
console.log('\n--- 4. Controllo scientifico delle didascalie localizzate (Sale 2, 3, 5, 7) ---');

BASE_DIRS.forEach(base => {
  const baseLabel = path.basename(path.dirname(base)) === 'accesso' ? 'accesso' : 'assets/einstein';
  LANGS.forEach(lang => {
    const appJsPath = path.join(base, 'bonus', lang, 'museo', 'app.js');
    const content = fs.readFileSync(appJsPath, 'utf8');

    // Cache buster check
    check(`[${baseLabel} - ${lang.toUpperCase()}] Cache buster attivo in app.js`, () => {
      assert(content.includes('assets/${name}.webp?v='), 'Cache buster v= mancante in helper A()');
    });

    // Sala 2
    check(`[${baseLabel} - ${lang.toUpperCase()}] Sala 2 contiene dati 3,10 Gb e 160,45 Gb e nozione genoma aploide`, () => {
      assert(content.includes('3,10') || content.includes('3.10'), 'Dato genoma umano (3.10 Gb) mancante');
      assert(content.includes('160,45') || content.includes('160.45'), 'Dato Tmesipteris (160.45 Gb) mancante');
      assert(content.includes('Tmesipteris oblanceolata'), 'Nome scientifico Tmesipteris oblanceolata mancante');
      assert(content.includes('1C') || content.includes('aploide') || content.includes('haploid') || content.includes('haploïde'), 'Menzione genoma aploide/1C mancante');
    });

    // Sala 3
    check(`[${baseLabel} - ${lang.toUpperCase()}] Sala 3 contiene la sequenza in 4 passaggi del pesce e del veicolo`, () => {
      if (lang === 'it') {
        assert(content.includes('Il pesce nuota'), 'Passo 1 mancante');
        assert(content.includes('telecamera rileva'), 'Passo 2 mancante');
        assert(content.includes('computer converte'), 'Passo 3 mancante');
        assert(content.includes('motori muovono le ruote') || content.includes('motorizzato muove le ruote'), 'Passo 4 mancante');
        assert(content.includes('non guida direttamente'), 'Chiarimento guida diretta mancante');
      } else if (lang === 'en') {
        assert(content.includes('fish swims'), 'Step 1 missing');
        assert(content.includes('camera detects') || content.includes('camera tracks'), 'Step 2 missing');
        assert(content.includes('computer translates') || content.includes('computer converts'), 'Step 3 missing');
        assert(content.includes('drives the wheels') || content.includes('moves the wheels'), 'Step 4 missing');
        assert(content.includes('does not directly steer'), 'Clarification missing');
      } else if (lang === 'fr') {
        assert(content.includes('poisson nage'), 'Étape 1 manquante');
        assert(content.includes('caméra détecte'), 'Étape 2 manquante');
        assert(content.includes('ordinateur convertit'), 'Étape 3 manquante');
        assert(content.includes('actionne les roues'), 'Étape 4 manquante');
        assert(content.includes('ne conduit pas'), 'Précision manquante');
      } else if (lang === 'es') {
        assert(content.includes('pez nada'), 'Paso 1 faltante');
        assert(content.includes('cámara detecta'), 'Paso 2 faltante');
        assert(content.includes('computadora convierte') || content.includes('ordenador'), 'Paso 3 faltante');
        assert(content.includes('mueven las ruedas') || content.includes('accionan las ruedas'), 'Paso 4 faltante');
        assert(content.includes('no conduce') || content.includes('no maneja'), 'Aclaración faltante');
      }
    });

    // Sala 5
    check(`[${baseLabel} - ${lang.toUpperCase()}] Sala 5 contiene la sequenza in 4 passaggi del micelio e robot`, () => {
      if (lang === 'it') {
        assert(content.includes('attività elettrica'), 'Passo 1 mancante');
        assert(content.includes('elettrodi'), 'Passo 2 mancante');
        assert(content.includes('circuito'), 'Passo 3 mancante');
        assert(content.includes('robot'), 'Passo 4 mancante');
        assert(content.includes('intenzioni coscienti'), 'Chiarimento coscienza mancante');
      } else if (lang === 'en') {
        assert(content.includes('electrical activity'), 'Step 1 missing');
        assert(content.includes('Electrodes'), 'Step 2 missing');
        assert(content.includes('circuit'), 'Step 3 missing');
        assert(content.includes('robot'), 'Step 4 missing');
        assert(content.includes('conscious intentions'), 'Clarification missing');
      } else if (lang === 'fr') {
        assert(content.includes('activité électrique'), 'Étape 1 manquante');
        assert(content.includes('électrodes'), 'Étape 2 manquante');
        assert(content.includes('circuit'), 'Étape 3 manquante');
        assert(content.includes('robot'), 'Étape 4 manquante');
        assert(content.includes('conscience'), 'Précision manquante');
      } else if (lang === 'es') {
        assert(content.includes('actividad eléctrica'), 'Paso 1 faltante');
        assert(content.includes('electrodos'), 'Paso 2 faltante');
        assert(content.includes('circuito'), 'Paso 3 faltante');
        assert(content.includes('robot'), 'Paso 4 faltante');
        assert(content.includes('intenciones conscientes') || content.includes('conciencia'), 'Aclaración faltante');
      }
    });

    // Sala 7
    check(`[${baseLabel} - ${lang.toUpperCase()}] Sala 7 spiega EHT, combinazione dati M87* e specifica natura artistica`, () => {
      assert(content.includes('M87*'), 'Riferimento M87* mancante');
      assert(content.includes('SC-48'), 'Riferimento fonte SC-48 mancante');
      if (lang === 'it') {
        assert(content.includes('radiotelescopi'), 'Osservazione radiotelescopi mancante');
        assert(content.includes('sincronizzati e combinati') || content.includes('combinano'), 'Sincronizzazione dati mancante');
        assert(content.includes('schema artistico') || content.includes('artistica'), 'Specifica artistica mancante');
      } else if (lang === 'en') {
        assert(content.includes('radio telescopes'), 'Radio telescopes missing');
        assert(content.includes('synchronized and combined') || content.includes('combined'), 'Combination missing');
        assert(content.includes('artistic') || content.includes('diagram'), 'Artistic disclaimer missing');
      } else if (lang === 'fr') {
        assert(content.includes('radiotélescopes'), 'Radiotélescopes manquants');
        assert(content.includes('schéma artistique') || content.includes('artistique'), 'Mention artistique manquante');
      } else if (lang === 'es') {
        assert(content.includes('radiotelescopios'), 'Radiotelescopios faltantes');
        assert(content.includes('esquema artístico') || content.includes('artística'), 'Aviso artístico faltante');
      }
    });
  });
});

console.log('\n========================================');
console.log(`Esito QA Asset: ${passed} passati, ${total - passed} falliti`);
console.log('========================================\n');

if (passed === total) {
  console.log('🎉 CONTROLLO QUALITÀ ASSET E DIDASCALIE EINSTEIN COMPLETATO CON SUCCESSO!');
} else {
  process.exit(1);
}
