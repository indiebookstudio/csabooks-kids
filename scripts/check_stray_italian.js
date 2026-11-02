const fs = require('fs');
const path = require('path');

const dirs = [
  '01.Megattere',
  '02.Felce.DNA',
  '03.Pesce.Veicolo',
  '04.Uccelli.Dinosauri',
  '05.Fungo.Robot',
  '06.Ginocchio.Bionico',
  '07.Buco.Nero'
];

const italianPhrases = [
  'Il viaggio',
  'Di lato',
  'Dall’alto',
  'Altro lato',
  'Altra vista',
  'Un ginocchio che ascolta',
  'Muscoli e protesi',
  'Scopri il dialogo',
  'Dal libro',
  'Torna al Laboratorio',
  'La felce con un DNA',
  'C’è un dinosauro',
  'Un pesce può muovere',
  'Il fungo collegato',
  'Come nasce l’immagine',
  'La Rete Invisibile delle Megattere',
  'Tocca il banco di pesci',
  'In pausa · tocca ▶ per riprendere',
  'Fonti della scoperta'
];

let issues = 0;

for (const d of dirs) {
  for (const lang of ['en', 'fr', 'es']) {
    const p = path.join('assets/einstein/bonus', lang, 'animazioni', d, 'index.html');
    const c = fs.readFileSync(p, 'utf8');

    for (const phrase of italianPhrases) {
      if (c.includes(phrase)) {
        console.warn(`[ISSUE] ${lang}/${d} still contains Italian phrase: "${phrase}"`);
        issues++;
      }
    }
  }
}

if (issues === 0) {
  console.log('✅ ZERO leftover Italian phrases found in EN, FR, and ES animation files!');
} else {
  console.log(`❌ Found ${issues} issues.`);
}
