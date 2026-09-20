/**
 * test-qr-routes.js
 * Test automatico di salvaguardia per verificare che le rotte e i file collegati ai
 * QR code stampati nei libri cartacei esistano sempre e non vengano mai accidentalmente
 * eliminati o rinominati.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Avvio verifica integrità rotte immutabili QR Code...\n');

const ROOT_DIR = __dirname;

const REQUIRED_QR_ROUTES = [
  {
    id: 'Bonus Raccolta Vol. 1',
    htmlFile: 'csa-vol1-bonus-8f2e91b7d4a6.html',
    slug: 'csa-vol1-bonus-8f2e91b7d4a6',
    dirFallback: path.join('csa-vol1-bonus-8f2e91b7d4a6', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', 'Bonus.CSA.Vol.1.pdf')
    ]
  },
  {
    id: 'Episodio 1 Audio/Video ITA',
    htmlFile: 'csa-vol1-ep1-ita-7b3f91a8d2c4.html',
    slug: 'csa-vol1-ep1-ita-7b3f91a8d2c4',
    dirFallback: path.join('csa-vol1-ep1-ita-7b3f91a8d2c4', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Video.mp4')
    ]
  }
];

let errors = [];

// 1. Verifica esistenza file radice HTML e fallback directory
for (const route of REQUIRED_QR_ROUTES) {
  const fullHtmlPath = path.join(ROOT_DIR, route.htmlFile);
  if (!fs.existsSync(fullHtmlPath)) {
    errors.push(`[ERRORE CRITICO] Il file principale per "${route.id}" (${route.htmlFile}) NON ESISTE!`);
  } else {
    console.log(`✅ File HTML principale presente: ${route.htmlFile}`);
  }

  const fullDirPath = path.join(ROOT_DIR, route.dirFallback);
  if (!fs.existsSync(fullDirPath)) {
    errors.push(`[ERRORE] Il fallback con trailing slash "${route.dirFallback}" NON ESISTE!`);
  } else {
    console.log(`✅ Fallback directory presente: ${route.dirFallback}`);
  }

  for (const asset of route.assetFiles) {
    const fullAssetPath = path.join(ROOT_DIR, asset);
    if (!fs.existsSync(fullAssetPath)) {
      errors.push(`[AVVISO ASSET] L'asset "${asset}" associato a "${route.id}" non esiste localmente.`);
    } else {
      console.log(`✅ Asset verificato: ${asset}`);
    }
  }
}

// 2. Verifica 404.html
const fofPath = path.join(ROOT_DIR, '404.html');
if (!fs.existsSync(fofPath)) {
  errors.push(`[ERRORE CRITICO] Il file 404.html non esiste alla radice del repository!`);
} else {
  const fofContent = fs.readFileSync(fofPath, 'utf-8');
  for (const route of REQUIRED_QR_ROUTES) {
    if (!fofContent.includes(route.slug)) {
      errors.push(`[ERRORE] 404.html non contiene il dispatcher per lo slug immutabile "${route.slug}"!`);
    }
  }
  console.log('✅ Dispatcher 404.html configurato correttamente per tutti gli slug immutabili.');
}

// 3. Verifica vercel.json
const vercelPath = path.join(ROOT_DIR, 'vercel.json');
if (!fs.existsSync(vercelPath)) {
  errors.push(`[ERRORE] vercel.json non trovato!`);
} else {
  const vercelContent = fs.readFileSync(vercelPath, 'utf-8');
  for (const route of REQUIRED_QR_ROUTES) {
    if (!vercelContent.includes(route.slug)) {
      errors.push(`[ERRORE] vercel.json non contiene le regole di rewrite per lo slug "${route.slug}"!`);
    }
  }
  console.log('✅ Regole di rewrite in vercel.json verificate.');
}

console.log('\n----------------------------------------');
if (errors.length > 0) {
  console.error('❌ RILEVATI ERRORI DI INTEGRITÀ NELLE ROTTE QR CODE:');
  errors.forEach(e => console.error('   ' + e));
  process.exit(1);
} else {
  console.log('🎉 TUTTE LE ROTTE E GLI ASSET DEI QR CODE SONO INTATTI E PROTETTI!');
  process.exit(0);
}
