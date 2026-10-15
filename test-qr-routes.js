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
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '01.Video.mp4')
    ]
  },
  {
    id: 'Episodio 2 Audio/Video ITA',
    htmlFile: 'csa-vol1-ep2-ita-4d9e16a2c8f1.html',
    slug: 'csa-vol1-ep2-ita-4d9e16a2c8f1',
    dirFallback: path.join('csa-vol1-ep2-ita-4d9e16a2c8f1', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '02.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '02.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '02.Video.mp4')
    ]
  },
  {
    id: 'Episodio 3 Audio/Video ITA',
    htmlFile: 'csa-vol1-ep3-ita-9a5c83e1f7d2.html',
    slug: 'csa-vol1-ep3-ita-9a5c83e1f7d2',
    dirFallback: path.join('csa-vol1-ep3-ita-9a5c83e1f7d2', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '03.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '03.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '03.Video.mp4')
    ]
  },
  {
    id: 'Episodio 4 Audio/Video ITA',
    htmlFile: 'csa-vol1-ep4-ita-6e2b94f0a3c5.html',
    slug: 'csa-vol1-ep4-ita-6e2b94f0a3c5',
    dirFallback: path.join('csa-vol1-ep4-ita-6e2b94f0a3c5', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '04.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '04.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.1', 'IT', 'Bonus', '04.Video.mp4')
    ]
  },
  {
    id: 'Bonus Raccolta Vol. 2',
    htmlFile: 'csa-vol2-bonus-46c694dc3ec4.html',
    slug: 'csa-vol2-bonus-46c694dc3ec4',
    dirFallback: path.join('csa-vol2-bonus-46c694dc3ec4', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', 'Bonus.CSA.Vol.2.pdf')
    ]
  },
  {
    id: 'Vol. 2 - Episodio 1 Audio/Video ITA',
    htmlFile: 'csa-vol2-ep1-ita-1c683f8acb67.html',
    slug: 'csa-vol2-ep1-ita-1c683f8acb67',
    dirFallback: path.join('csa-vol2-ep1-ita-1c683f8acb67', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '01.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '01.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '01.Video.mp4')
    ]
  },
  {
    id: 'Vol. 2 - Episodio 2 Audio/Video ITA',
    htmlFile: 'csa-vol2-ep2-ita-ed3dabb448ca.html',
    slug: 'csa-vol2-ep2-ita-ed3dabb448ca',
    dirFallback: path.join('csa-vol2-ep2-ita-ed3dabb448ca', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '02.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '02.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '02.Video.mp4')
    ]
  },
  {
    id: 'Vol. 2 - Episodio 3 Audio/Video ITA',
    htmlFile: 'csa-vol2-ep3-ita-2779f3736b81.html',
    slug: 'csa-vol2-ep3-ita-2779f3736b81',
    dirFallback: path.join('csa-vol2-ep3-ita-2779f3736b81', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '03.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '03.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '03.Video.mp4')
    ]
  },
  {
    id: 'Vol. 2 - Episodio 4 Audio/Video ITA',
    htmlFile: 'csa-vol2-ep4-ita-605c1bd7e4ce.html',
    slug: 'csa-vol2-ep4-ita-605c1bd7e4ce',
    dirFallback: path.join('csa-vol2-ep4-ita-605c1bd7e4ce', 'index.html'),
    assetFiles: [
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Front.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '04.Cover.png'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '04.Audio.wav'),
      path.join('assets', 'construction-site-adventures', 'Bundle.Volume.2', 'IT', 'Bonus', '04.Video.mp4')
    ]
  },
  {
    id: 'Einstein, questa te la sei persa! - QR Portal',
    htmlFile: path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc.html'),
    slug: '4dcbbaee2e69a278e4e59eab50430ccc',
    dirFallback: path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'index.html'),
    assetFiles: [
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'assets', 'css', 'site.css'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'assets', 'js', 'app.js'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'config', 'site.json'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'i18n', 'it.json'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'content', 'fonti_it.csv'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'copertina.webp'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'otto.webp'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'polpo_esploratore_con_chiave_dorata.png'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'media', 'polpo_esploratore_con_chiave_dorata.webp'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'missioni', 'missioni.pdf'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'museo', 'index.html'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'film', 'index.html'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'colora', 'colora.pdf'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'carte', 'index.html'),
      path.join('accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', 'it', 'carte', 'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf')
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
