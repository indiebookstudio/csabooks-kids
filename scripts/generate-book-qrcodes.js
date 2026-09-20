/**
 * generate-book-qrcodes.js
 * Genera tutti i 5 QR code del libro in altissima risoluzione:
 * 1. Formato SVG vettoriale (risoluzione infinita, perfetto per InDesign/Canva/Illustrator/Word)
 * 2. Formato PNG Ultra-HD (2400x2400 pixel, pronto per stampa offset/digitale a 300+ DPI)
 */

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const OUTPUT_DIR = path.join(__dirname, '..', 'assets', 'qrcodes');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const QR_ITEMS = [
  {
    fileName: '00_QR_Bonus_Disegni_Colorare',
    title: 'Bonus Disegni da Colorare',
    url: 'https://csabookskids.com/csa-vol1-bonus-8f2e91b7d4a6'
  },
  {
    fileName: '01_QR_Storia_1_Benny_Collina',
    title: 'Storia 1 - Benny l\'escavatore e la collina',
    url: 'https://csabookskids.com/csa-vol1-ep1-ita-7b3f91a8d2c4'
  },
  {
    fileName: '02_QR_Storia_2_Rudy_Spiaggia',
    title: 'Storia 2 - Rudy la ruspa e la spiaggia',
    url: 'https://csabookskids.com/csa-vol1-ep2-ita-4d9e16a2c8f1'
  },
  {
    fileName: '03_QR_Storia_3_Leo_Montagna',
    title: 'Storia 3 - Leo la gru e la montagna',
    url: 'https://csabookskids.com/csa-vol1-ep3-ita-9a5c83e1f7d2'
  },
  {
    fileName: '04_QR_Storia_4_Bruno_Papere',
    title: 'Storia 4 - Bruno il camion e lo stagno',
    url: 'https://csabookskids.com/csa-vol1-ep4-ita-6e2b94f0a3c5'
  }
];

async function generateAll() {
  console.log('🚀 Generazione QR Code Ultra-HD e Vettoriali in corso...\n');

  for (const item of QR_ITEMS) {
    const svgPath = path.join(OUTPUT_DIR, `${item.fileName}.svg`);
    const pngPath = path.join(OUTPUT_DIR, `${item.fileName}.png`);

    // 1. Genera SVG Vettoriale (Risoluzione Infinita)
    await QRCode.toFile(svgPath, item.url, {
      type: 'svg',
      errorCorrectionLevel: 'Q', // 25% ridondanza
      margin: 4,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    // 2. Genera PNG Ultra-HD (2400 x 2400 pixel)
    await QRCode.toFile(pngPath, item.url, {
      type: 'png',
      width: 2400,
      margin: 4,
      errorCorrectionLevel: 'Q',
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    console.log(`✅ ${item.title}`);
    console.log(`   -> SVG: ${svgPath}`);
    console.log(`   -> PNG (2400x2400 px): ${pngPath}\n`);
  }

  console.log(`🎉 Tutti i 5 QR code sono stati salvati nella cartella: assets/qrcodes/`);
}

generateAll().catch(err => {
  console.error('Errore durante la generazione:', err);
  process.exit(1);
});
