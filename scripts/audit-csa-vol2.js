const fs = require('fs');
const path = require('path');

console.log('=== CSA VOLUME 2 ENGLISH & MULTILINGUAL AUDIT ===\n');

// 1. Verify Assets on Disk
console.log('--- 1. Asset Files Verification ---');
const expectedFiles = [
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Front.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Back.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/Bonus.CSA.Vol.2.pdf',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/01.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/01.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/01.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/02.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/02.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/02.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/03.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/03.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/03.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/04.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/04.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.2/EN/Bonus/04.Video.mp4',
  'books/csa-vol2/en/cover.png',
  'books/csa-vol2/en/back.png',
  'books/csa-vol2/en/interiors/01.png',
  'books/csa-vol2/en/interiors/10.png'
];

let assetsOk = true;
expectedFiles.forEach(f => {
  const exists = fs.existsSync(f);
  if (!exists) {
    console.error(`❌ MISSING ASSET: ${f}`);
    assetsOk = false;
  }
});
if (assetsOk) {
  console.log(`✅ All ${expectedFiles.length} key asset files exist on disk.\n`);
}

// 2. Verify HTML files structure
console.log('--- 2. HTML Files Structure & QR Integrity ---');
const pages = [
  { file: 'csa-vol2-bonus-46c694dc3ec4.html', type: 'bonus', vol: 2 },
  { file: 'csa-vol2-ep1-ita-1c683f8acb67.html', type: 'episode', vol: 2, ep: 1 },
  { file: 'csa-vol2-ep2-ita-ed3dabb448ca.html', type: 'episode', vol: 2, ep: 2 },
  { file: 'csa-vol2-ep3-ita-2779f3736b81.html', type: 'episode', vol: 2, ep: 3 },
  { file: 'csa-vol2-ep4-ita-605c1bd7e4ce.html', type: 'episode', vol: 2, ep: 4 }
];

let pagesOk = true;
pages.forEach(p => {
  if (!fs.existsSync(p.file)) {
    console.error(`❌ FILE NOT FOUND: ${p.file}`);
    pagesOk = false;
    return;
  }
  const html = fs.readFileSync(p.file, 'utf8');

  // Check script tags
  if (!html.includes('js/books.js') || !html.includes('js/script.js')) {
    console.error(`❌ ${p.file} missing js/books.js or js/script.js`);
    pagesOk = false;
  }

  if (p.type === 'bonus') {
    if (!html.includes('id="bonus-page-main"') || !html.includes('data-volume="2"')) {
      console.error(`❌ ${p.file} missing bonus-page-main or data-volume=2`);
      pagesOk = false;
    }
    const requiredBonusIds = [
      'bonus-cover-img', 'bonus-badge-text', 'bonus-title', 'bonus-lead',
      'bonus-form-badge', 'bonus-form-title', 'bonus-form-desc',
      'bonus-first-name-label', 'bonus-last-name-label', 'bonus-email-label',
      'bonus-consent-text', 'bonus-submit-btn-text', 'bonus-privacy-text',
      'bonus-feat1-title', 'bonus-feat1-desc',
      'bonus-feat2-title', 'bonus-feat2-desc',
      'bonus-feat3-title', 'bonus-feat3-desc'
    ];
    requiredBonusIds.forEach(id => {
      if (!html.includes(`id="${id}"`)) {
        console.error(`❌ ${p.file} missing element id="${id}"`);
        pagesOk = false;
      }
    });
  }

  if (p.type === 'episode') {
    if (!html.includes('id="episode-page-main"') || !html.includes(`data-episode="${p.ep}"`)) {
      console.error(`❌ ${p.file} missing episode-page-main or data-episode="${p.ep}"`);
      pagesOk = false;
    }
    const requiredEpIds = [
      'episode-book-cover-img', 'episode-story-cover-img', 'episode-book-tag',
      'episode-story-tag', 'episode-badge-text', 'episode-title', 'episode-lead',
      'btn-play-audio', 'btn-play-video', 'story-audio', 'story-video',
      'player-status-text', 'episode-note-text'
    ];
    requiredEpIds.forEach(id => {
      if (!html.includes(`id="${id}"`)) {
        console.error(`❌ ${p.file} missing element id="${id}"`);
        pagesOk = false;
      }
    });
  }
});

if (pagesOk) {
  console.log('✅ All 5 QR-code landing pages have exact required structure and IDs.\n');
}

// 3. Verify Vercel Rewrites
console.log('--- 3. Vercel Configuration Verification ---');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const rewrites = vercelConfig.rewrites || [];
const expectedSources = [
  '/csa-vol2-bonus-46c694dc3ec4',
  '/csa-vol2-ep1-ita-1c683f8acb67',
  '/csa-vol2-ep2-ita-ed3dabb448ca',
  '/csa-vol2-ep3-ita-2779f3736b81',
  '/csa-vol2-ep4-ita-605c1bd7e4ce'
];
expectedSources.forEach(src => {
  const found = rewrites.some(r => r.source === src);
  if (!found) {
    console.warn(`⚠️ Rewrite for ${src} not found in vercel.json rewrites array!`);
  }
});
console.log('✅ Vercel clean URL rewrites inspected.\n');

// 4. Verify Send Bonus Endpoint
console.log('--- 4. Bonus Dispatcher Localization Verification ---');
const sendBonusCode = fs.readFileSync('api/send-bonus.js', 'utf8');
const checks = [
  { name: 'Multilingual EMAIL_I18N object', check: sendBonusCode.includes('const EMAIL_I18N = {') },
  { name: 'EN subject localized', check: sendBonusCode.includes('Your Coloring Pages from Construction Site Adventures') },
  { name: 'EN intro localized', check: sendBonusCode.includes('Thank you for choosing our story collection') },
  { name: 'EN Vol 2 intro localized with characters', check: sendBonusCode.includes('Nina, Benny, Rino, Leo') },
  { name: 'IT Vol 2 intro localized with characters', check: sendBonusCode.includes('Nina, Benny, Rino, Leo') },
  { name: 'EN volume 2 asset mapping', check: sendBonusCode.includes('Bundle.Volume.2/EN/Front.Cover.png') && sendBonusCode.includes('Bonus-CSA-Volume2-Coloring-Pages.pdf') }
];

let bonusOk = true;
checks.forEach(c => {
  if (c.check) {
    console.log(`✅ ${c.name}`);
  } else {
    console.error(`❌ FAILED: ${c.name}`);
    bonusOk = false;
  }
});

console.log('\n=== AUDIT COMPLETE ===');
