/**
 * scripts/sync-einstein-route.js
 * 
 * Script di sincronizzazione e salvaguardia della rotta permanente del microsito
 * "Einstein, questa te la sei persa!".
 * 
 * Legge la configurazione centralizzata da config/permanent-einstein-route.json,
 * verifica la sorgente interna (es. assets/einstein) e sincronizza la directory
 * pubblica permanente (es. accesso/4dcbbaee2e69a278e4e59eab50430ccc/).
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'config', 'permanent-einstein-route.json');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error(`❌ [ERRORE CRITICO] File di configurazione non trovato: ${CONFIG_PATH}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const sourceDir = path.join(ROOT_DIR, config.internalSource);
const targetDir = path.join(ROOT_DIR, config.targetDirectory);

console.log('🔄 Sincronizzazione rotta permanente microsito Einstein...');
console.log(`   Sorgente interna : ${config.internalSource}`);
console.log(`   Destinazione     : ${config.targetDirectory}`);
console.log(`   URL Pubblico     : ${config.publicUrl}`);

if (!fs.existsSync(sourceDir)) {
  console.error(`❌ [ERRORE CRITICO] La cartella sorgente "${sourceDir}" non esiste!`);
  process.exit(1);
}

// Funzione ricorsiva di copia con sovrascrittura
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      // Ignora file di anteprima desktop o note interne se presenti
      if (childItemName === 'ANTEPRIMA_DESKTOP.png') return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(sourceDir, targetDir);

// Crea anche accesso/index.html di sicurezza se richiesto (per chi naviga /accesso/)
const accessoParentDir = path.join(ROOT_DIR, 'accesso');
if (!fs.existsSync(accessoParentDir)) {
  fs.mkdirSync(accessoParentDir, { recursive: true });
}
const accessoIndex = path.join(accessoParentDir, 'index.html');
if (!fs.existsSync(accessoIndex)) {
  fs.writeFileSync(
    accessoIndex,
    `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0; url=/"><script>window.location.replace('/');</script></head><body></body></html>`
  );
}

// File di fallback senza trailing slash: accesso/4dcbbaee2e69a278e4e59eab50430ccc.html
const noSlashFallbackHtml = path.join(ROOT_DIR, 'accesso', `${config.token}.html`);
fs.writeFileSync(
  noSlashFallbackHtml,
  `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex,nofollow">
  <meta http-equiv="refresh" content="0; url=${config.publicPath}">
  <title>Reindirizzamento...</title>
  <script>
    window.location.replace('${config.publicPath}' + window.location.search + window.location.hash);
  </script>
</head>
<body>
  <p>Reindirizzamento in corso... <a href="${config.publicPath}">Clicca qui</a> se non vieni reindirizzato automaticamente.</p>
</body>
</html>
`
);

// Controllo integrità file critici
const CRITICAL_FILES = [
  'index.html',
  path.join('assets', 'css', 'site.css'),
  path.join('assets', 'js', 'app.js'),
  path.join('config', 'site.json'),
  path.join('i18n', 'it.json'),
  path.join('i18n', 'en.json'),
  path.join('content', 'fonti_it.csv'),
  path.join('content', 'fonti_en.csv'),
  path.join('content', 'fonti_integrative.json'),
  path.join('media', 'copertina.webp'),
  path.join('media', 'copertine', 'en', 'copertina.webp'),
  path.join('media', 'otto.webp'),
  path.join('media', 'polpo_esploratore_con_chiave_dorata.png'),
  path.join('media', 'polpo_esploratore_con_chiave_dorata.webp'),
  path.join('bonus', 'it', 'museo', 'index.html'),
  path.join('bonus', 'it', 'animazioni', 'index.html'),
  path.join('bonus', 'it', 'animazioni', '01.Megattere', 'la_rete_invisibile_delle_megattere.html'),
  path.join('bonus', 'it', 'colora', 'colora.pdf'),
  path.join('bonus', 'it', 'carte', 'index.html'),
  path.join('bonus', 'it', 'carte', 'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf'),
  path.join('bonus', 'en', 'museo', 'index.html'),
  path.join('bonus', 'en', 'animazioni', 'index.html'),
  path.join('bonus', 'en', 'animazioni', '01.Megattere', 'la_rete_invisibile_delle_megattere.html'),
  path.join('bonus', 'en', 'colora', 'colora.pdf'),
  path.join('bonus', 'en', 'carte', 'index.html'),
  path.join('bonus', 'en', 'carte', 'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf')
];

let errors = [];
for (const file of CRITICAL_FILES) {
  const filePath = path.join(targetDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`File critico mancante nella directory di destinazione: ${file}`);
  } else {
    const size = fs.statSync(filePath).size;
    if (size === 0) {
      errors.push(`File critico vuoto (0 byte): ${file}`);
    }
  }
}

if (errors.length > 0) {
  console.error('❌ Errori durante la sincronizzazione della rotta:');
  errors.forEach(e => console.error('   ' + e));
  process.exit(1);
}

console.log('✅ Sincronizzazione completata con successo! Tutti i file critici sono presenti e integri.\n');
