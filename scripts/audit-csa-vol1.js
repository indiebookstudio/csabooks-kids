const fs = require('fs');
const path = require('path');

console.log('=== CSA VOLUME 1 ENGLISH & MULTILINGUAL AUDIT ===\n');

// 1. Verify Assets on Disk
console.log('--- 1. Asset Files Verification ---');
const expectedFiles = [
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Front.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Back.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/Bonus.CSA.Vol.1.pdf',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/01.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/01.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/01.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/02.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/02.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/02.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/03.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/03.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/03.Video.mp4',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/04.Cover.png',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/04.Audio.wav',
  'assets/construction-site-adventures/Bundle.Volume.1/EN/Bonus/04.Video.mp4',
  'books/csa-vol1/en/cover.png',
  'books/csa-vol1/en/back.png',
  'books/csa-vol1/en/interiors/01.png',
  'books/csa-vol1/en/interiors/10.png'
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
  console.log('✅ All 19 key asset files exist on disk.\n');
}

// 2. Verify HTML files structure
console.log('--- 2. HTML Files Structure & QR Integrity ---');
const pages = [
  { file: 'csa-vol1-bonus-8f2e91b7d4a6.html', type: 'bonus', vol: 1 },
  { file: 'csa-vol1-ep1-ita-7b3f91a8d2c4.html', type: 'episode', vol: 1, ep: 1 },
  { file: 'csa-vol1-ep2-ita-4d9e16a2c8f1.html', type: 'episode', vol: 1, ep: 2 },
  { file: 'csa-vol1-ep3-ita-9a5c83e1f7d2.html', type: 'episode', vol: 1, ep: 3 },
  { file: 'csa-vol1-ep4-ita-6e2b94f0a3c5.html', type: 'episode', vol: 1, ep: 4 }
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
    if (!html.includes('id="bonus-page-main"') || !html.includes('data-volume="1"')) {
      console.error(`❌ ${p.file} missing bonus-page-main or data-volume=1`);
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
  '/csa-vol1-bonus-8f2e91b7d4a6',
  '/csa-vol1-ep1-ita-7b3f91a8d2c4',
  '/csa-vol1-ep2-ita-4d9e16a2c8f1',
  '/csa-vol1-ep3-ita-9a5c83e1f7d2',
  '/csa-vol1-ep4-ita-6e2b94f0a3c5'
];
expectedSources.forEach(src => {
  const found = rewrites.some(r => r.source === src);
  if (!found) {
    console.warn(`⚠️ Rewrite for ${src} not found in vercel.json rewrites array!`);
  }
});
console.log('✅ Vercel clean URL rewrites inspected.\n');

// 4. Verify Geo Endpoint
console.log('--- 4. Geo Endpoint Verification ---');
const geoCode = fs.readFileSync('api/geo.js', 'utf8');
if (geoCode.includes("runtime: 'edge'") && geoCode.includes('x-vercel-ip-country')) {
  console.log('✅ api/geo.js Edge runtime and country header logic verified.');
} else {
  console.error('❌ api/geo.js is missing edge runtime or header parsing.');
}

// 5. Verify Send Bonus Endpoint
console.log('\n--- 5. Bonus Dispatcher Localization Verification ---');
const sendBonusCode = fs.readFileSync('api/send-bonus.js', 'utf8');
const checks = [
  { name: 'Multilingual EMAIL_I18N object', check: sendBonusCode.includes('const EMAIL_I18N = {') },
  { name: 'EN subject localized', check: sendBonusCode.includes('Your Coloring Pages from Construction Site Adventures') },
  { name: 'EN intro localized', check: sendBonusCode.includes('Thank you for choosing our story collection') },
  { name: 'EN badge localized', check: sendBonusCode.includes('PDF file attached to this email (Ready to print)') },
  { name: 'EN ctaTitle localized', check: sendBonusCode.includes('Loving the construction adventures?') },
  { name: 'EN headerTagline localized', check: sendBonusCode.includes("Children's stories born in the family") },
  { name: 'EN question localized', check: sendBonusCode.includes("Have questions or want to share your children's colored drawings?") },
  { name: 'EN default recipient name', check: sendBonusCode.includes('Young Artist') },
  { name: 'EN volume asset mapping', check: sendBonusCode.includes('Bundle.Volume.1/EN/Front.Cover.png') && sendBonusCode.includes('Bonus-CSA-Volume1-Coloring-Pages.pdf') }
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
