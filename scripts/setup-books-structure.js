const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFileSafe(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

console.log('🚀 Inizializzazione struttura ordinata `books/`...');

// 1. CSA Raccolta Vol 1
const vol1Dir = path.join('books', 'csa-vol1', 'it');
ensureDir(path.join(vol1Dir, 'interiors'));
copyFileSafe('assets/construction-site-adventures/Bundle.Volume.1/IT/Front.Cover.png', path.join(vol1Dir, 'cover.png'));
copyFileSafe('assets/construction-site-adventures/Bundle.Volume.1/IT/Back.Cover.png', path.join(vol1Dir, 'back.png'));
['2', '3', '4', '6', '7', '8', '9', '10', '11', '12'].forEach((num, idx) => {
  const padded = String(idx + 1).padStart(2, '0');
  copyFileSafe(`assets/construction-site-adventures/Bundle.Volume.1/IT/${num}.png`, path.join(vol1Dir, 'interiors', `${padded}.png`));
});

// 2. CSA Raccolta Vol 2
const vol2Dir = path.join('books', 'csa-vol2', 'it');
ensureDir(path.join(vol2Dir, 'interiors'));
copyFileSafe('assets/construction-site-adventures/Bundle.Volume.2/IT/Front.Cover.png', path.join(vol2Dir, 'cover.png'));
copyFileSafe('assets/construction-site-adventures/Bundle.Volume.2/IT/Back.Cover.png', path.join(vol2Dir, 'back.png'));
['2', '3', '4', '6', '7', '8', '9', '10', '11', '12'].forEach((num, idx) => {
  const padded = String(idx + 1).padStart(2, '0');
  copyFileSafe(`assets/construction-site-adventures/Bundle.Volume.2/IT/${num}.png`, path.join(vol2Dir, 'interiors', `${padded}.png`));
});

// 3. Einstein, questa te la sei persa!
const einsteinLangs = [
  { code: 'it', src: 'it' },
  { code: 'en', src: 'en' },
  { code: 'fr', src: 'fr' },
  { code: 'es', src: 'es' }
];

einsteinLangs.forEach(item => {
  const edDir = path.join('books', 'einstein', item.code);
  ensureDir(path.join(edDir, 'interiors'));
  
  // Cover
  const coverSrcPng = `assets/einstein/media/copertine/${item.src}/Front.Cover.png`;
  const coverSrcWebp = `assets/einstein/media/copertine/${item.src}/copertina.webp`;
  if (fs.existsSync(coverSrcPng)) {
    copyFileSafe(coverSrcPng, path.join(edDir, 'cover.png'));
  } else if (fs.existsSync(coverSrcWebp)) {
    copyFileSafe(coverSrcWebp, path.join(edDir, 'cover.png'));
  } else if (fs.existsSync('assets/einstein/media/copertina.webp')) {
    copyFileSafe('assets/einstein/media/copertina.webp', path.join(edDir, 'cover.png'));
  }

  // Back cover
  const backSrcPng = `assets/einstein/media/copertine/${item.src}/Back.Cover.png`;
  if (fs.existsSync(backSrcPng)) {
    copyFileSafe(backSrcPng, path.join(edDir, 'back.png'));
  }

  // Sample interior pages (from tavole / preview)
  for (let i = 1; i <= 10; i++) {
    const pad = String(i).padStart(2, '0');
    const tavola = `assets/einstein/media/tavola_${pad}.webp`;
    if (fs.existsSync(tavola)) {
      copyFileSafe(tavola, path.join(edDir, 'interiors', `${pad}.png`));
    }
  }
});

// 4. Fano col naso all'insù
const fanoDir = path.join('books', 'fano', 'it');
ensureDir(path.join(fanoDir, 'interiors'));
copyFileSafe('assets/fano/Front.Cover.ITA.png', path.join(fanoDir, 'cover.png'));
copyFileSafe('assets/fano/Back.Cover.ITA.png', path.join(fanoDir, 'back.png'));
['2', '4', '6', '8', '16', '22', '30', '32', '42'].forEach((num, idx) => {
  const padded = String(idx + 1).padStart(2, '0');
  copyFileSafe(`assets/fano/${num}.png`, path.join(fanoDir, 'interiors', `${padded}.png`));
});

// 5. Singole storie CSA (1 to 8)
const csaStories = [
  { id: 'csa-01-benny-collina', folder: '01.Benny.Collina' },
  { id: 'csa-02-rudy-spiaggia', folder: '02.Rudy.Spiaggia' },
  { id: 'csa-03-leo-montagna', folder: '03.Leo.Montagna' },
  { id: 'csa-04-bruno-papere', folder: '04.Bruno.Papere' },
  { id: 'csa-05-benny-roma', folder: '05.Benny.Roma' },
  { id: 'csa-06-nina-conigli', folder: '06.Nina.Conigli' },
  { id: 'csa-07-rino-ladri', folder: '07.Rino.Ladri' },
  { id: 'csa-08-leo-cinciallegra', folder: '08.Leo.Cinciallegra' }
];

const langMap = [
  { code: 'it', sub: 'IT' },
  { code: 'en', sub: 'US' },
  { code: 'fr', sub: 'FR' }
];

csaStories.forEach(st => {
  langMap.forEach(l => {
    const sDir = path.join('assets', 'construction-site-adventures', st.folder, l.sub);
    if (!fs.existsSync(sDir)) return;
    const destDir = path.join('books', st.id, l.code);
    ensureDir(path.join(destDir, 'interiors'));
    
    copyFileSafe(path.join(sDir, 'Front.Cover.png'), path.join(destDir, 'cover.png'));
    copyFileSafe(path.join(sDir, 'Back.Cover.png'), path.join(destDir, 'back.png'));

    // Interiors
    let idx = 1;
    for (let p = 2; p <= 12; p++) {
      const pSrc = path.join(sDir, `${p}.png`);
      if (fs.existsSync(pSrc)) {
        const padded = String(idx++).padStart(2, '0');
        copyFileSafe(pSrc, path.join(destDir, 'interiors', `${padded}.png`));
      }
    }
  });
});

// 6. Struttura predisposta per Per la scuola: La Bussola Misteriosa
const scuolaDir = path.join('books', 'la-bussola-misteriosa-matematica-2', 'it');
ensureDir(path.join(scuolaDir, 'interiors'));

console.log('✅ Struttura `books/` creata e popolata con successo!');
