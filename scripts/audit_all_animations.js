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

console.log('================ AUDIT ACROSS ALL 7 ANIMATIONS ================');

for (const d of dirs) {
  console.log(`\n--- ${d} ---`);
  for (const lang of ['it', 'en', 'fr', 'es']) {
    const p = path.join('assets/einstein/bonus', lang, 'animazioni', d, 'index.html');
    if (!fs.existsSync(p)) {
      console.error(`MISSING: ${p}`);
      continue;
    }
    const c = fs.readFileSync(p, 'utf8');
    const title = (c.match(/<title>([^<]+)<\/title>/) || [])[1];
    const h1 = (c.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    const storyTitle = (c.match(/<h2[^>]*id=["']story-title["'][^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '';
    const storyText = (c.match(/<p[^>]*id=["']story-text["'][^>]*>([\s\S]*?)<\/p>/) || [])[1] || '';
    const nextBtn = (c.match(/<span[^>]*id=["']next-text["'][^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const sceneCap = (c.match(/<span[^>]*id=["']scene-caption["'][^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const sceneLbl = (c.match(/<div[^>]*id=["']scene-label["'][^>]*>([\s\S]*?)<\/div>/) || [])[1] || '';
    const olSteps = (c.match(/<ol id=["']steps["'][^>]*>([\s\S]*?)<\/ol>/) || [])[1] || '';
    const dialogTitle = (c.match(/<h2 id=["']info-title["']>([\s\S]*?)<\/h2>/) || [])[1] || '';
    
    console.log(`  [${lang}] H1: "${h1.replace(/<[^>]+>/g, '').trim()}" | Title: "${title}"`);
    if (storyTitle) console.log(`       storyTitle: "${storyTitle.trim()}"`);
    if (sceneCap) console.log(`       sceneCap: "${sceneCap.trim()}" | sceneLbl: "${sceneLbl.trim()}"`);
    if (nextBtn) console.log(`       nextBtn: "${nextBtn.trim()}"`);
    if (dialogTitle) console.log(`       dialogTitle: "${dialogTitle.trim()}"`);
    if (olSteps) console.log(`       olSteps: "${olSteps.replace(/<[^>]+>/g, ' · ').trim()}"`);
  }
}
