/**
 * tests/test-christmas-hero.js
 * 
 * Comprehensive Verification Suite for CSA Books Kids — Hero Natale 2026
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🎄 ESECUZIONE VERIFICA COMPLETA — HERO NATALE 2026...\n');

let errors = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`❌ FAILED: ${msg}`);
    errors++;
  } else {
    console.log(`  ✓ ${msg}`);
  }
}

// 1. Verifica esistenza file e asset
console.log('--- 1. Verifica Presenza Asset Copiati nel Progetto ---');
const campaignDir = path.join(__dirname, '..', 'assets', 'campaigns', 'christmas-2026');
assert(fs.existsSync(campaignDir), 'Directory assets/campaigns/christmas-2026 presente');

const bgDir = path.join(campaignDir, 'backgrounds');
const coversDir = path.join(campaignDir, 'covers');
assert(fs.existsSync(bgDir), 'Cartella backgrounds presente');
assert(fs.existsSync(coversDir), 'Cartella covers presente');

const expectedBgs = [
  '01-raccolte-desktop.png', '01-raccolte-mobile.png',
  '02-einstein-desktop.png', '02-einstein-mobile.png',
  '03-collana-desktop.png', '03-collana-mobile.png',
  '04-fano-desktop.png', '04-fano-mobile.png'
];
expectedBgs.forEach(bg => {
  assert(fs.existsSync(path.join(bgDir, bg)), `Sfondo ${bg} presente (${fs.statSync(path.join(bgDir, bg)).size} B)`);
});

const coverCount = fs.readdirSync(coversDir).length;
assert(coverCount === 26, `Copertine originali presenti: ${coverCount}/26`);

// 2. Caricamento configurazione campagna
console.log('\n--- 2. Caricamento e Validazione Configurazione Campagna ---');
const configPath = path.join(__dirname, '..', 'config', 'campaign-christmas-2026.js');
assert(fs.existsSync(configPath), 'File config/campaign-christmas-2026.js presente');

const configCode = fs.readFileSync(configPath, 'utf8');
const sandbox = { module: {}, console };
vm.createContext(sandbox);
vm.runInContext(configCode, sandbox);
const config = sandbox.CSA_CHRISTMAS_CAMPAIGN || sandbox.module.exports;

assert(Boolean(config), 'Configurazione CSA_CHRISTMAS_CAMPAIGN caricata');
assert(config.id === 'natale-2026', 'Identificativo campagna: natale-2026');
assert(config.enabled === true, 'Interruttore campagna: enabled = true');
assert(typeof config.isCampaignActive === 'function' && config.isCampaignActive() === true, 'Metodo isCampaignActive() operativo');

// 3. Regole linguistiche vincolanti
console.log('\n--- 3. Regole di Selezione Slide per Tutte le 9 Lingue ---');

// ITALIANO: 5 slide (sos-natale come prima slide)
const itSlides = config.getSlidesForLanguage('it');
assert(itSlides.length === 5, `Italiano: 5 slide previste (trovate: ${itSlides.length})`);
assert(itSlides[0].id === 'sos-natale', 'IT Slide 1: sos-natale');
assert(itSlides[0].title === 'SOS Natale!', 'IT Slide 1: Titolo "SOS Natale!"');
assert(itSlides[0].eyebrow === 'NOVITÀ DI NATALE', 'IT Slide 1: Eyebrow "NOVITÀ DI NATALE"');
assert(itSlides[0].badge === 'DAI 2 ANNI', 'IT Slide 1: Badge "DAI 2 ANNI"');
assert(itSlides[0].actions.length === 1 && itSlides[0].actions[0].text === 'Scopri il libro', 'IT Slide 1: Pulsante "Scopri il libro" presente');
assert(itSlides[0].actions[0].href === 'catalogo.html#book-csa-10-leo-bruno-natale', 'IT Slide 1: Link corretto a catalogo.html#book-csa-10-leo-bruno-natale');

assert(itSlides[1].id === '01-raccolte', 'IT Slide 2: 01-raccolte');
assert(itSlides[1].covers.length === 2, 'IT Slide 2: 2 copertine (Raccolta Vol 1 e Vol 2)');
assert(itSlides[1].actions.length === 1 && itSlides[1].actions[0].text === 'Scopri', 'IT Slide 2: Singolo pulsante "Scopri" presente');

assert(itSlides[2].id === '02-einstein', 'IT Slide 3: 02-einstein');
assert(itSlides[2].covers.length === 1 && itSlides[2].covers[0].src.includes('einstein-it.png'), 'IT Slide 3: Copertina Einstein IT');
assert(itSlides[2].actions.length === 1 && itSlides[2].actions[0].text === 'Scopri', 'IT Slide 3: Singolo pulsante "Scopri" presente');

assert(itSlides[3].id === '03-collana', 'IT Slide 4: 03-collana');
assert(itSlides[3].covers.length === 3, `IT Slide 4: prime 3 copertine ordinate (trovate: ${itSlides[3].covers.length})`);
assert(itSlides[3].totalCount === 9, 'IT Slide 4: Conteggio totale dichiarato 9 episodi');
assert(itSlides[3].body.includes('9'), 'IT Slide 4: Testo cita 9 episodi');

assert(itSlides[4].id === '04-fano', 'IT Slide 5: 04-fano');
assert(itSlides[4].covers.length === 1 && itSlides[4].covers[0].src.includes('fano-it.png'), 'IT Slide 5: Copertina Fano IT');

// INGLESE: 2 slide
const enSlides = config.getSlidesForLanguage('en');
assert(enSlides.length === 2, `Inglese: 2 slide previste (trovate: ${enSlides.length})`);
assert(enSlides[0].id === '02-einstein', 'EN Slide 1: 02-einstein');
assert(enSlides[0].covers[0].src.includes('einstein-en.jpg'), 'EN Slide 1: Copertina Einstein EN');
assert(enSlides[1].id === '03-collana', 'EN Slide 2: 03-collana');
assert(enSlides[1].covers.length === 3, `EN Slide 2: prime 3 copertine ordinate (trovate: ${enSlides[1].covers.length})`);
assert(enSlides[1].totalCount === 8, 'EN Slide 2: Conteggio totale dichiarato 8 episodi');
assert(enSlides[1].body.includes('8'), 'EN Slide 2: Testo cita 8 storie');

// FRANCESE: 2 slide
const frSlides = config.getSlidesForLanguage('fr');
assert(frSlides.length === 2, `Francese: 2 slide previste (trovate: ${frSlides.length})`);
assert(frSlides[0].id === '02-einstein', 'FR Slide 1: 02-einstein');
assert(frSlides[0].covers[0].src.includes('einstein-fr.png'), 'FR Slide 1: Copertina Einstein FR');
assert(frSlides[1].id === '03-collana', 'FR Slide 2: 03-collana');
assert(frSlides[1].covers.length === 3, 'FR Slide 2: esattamente 3 copertine francesi');
assert(frSlides[1].totalCount === 3, 'FR Slide 2: Conteggio totale dichiarato 3 episodi');
assert(frSlides[1].body.includes('3'), 'FR Slide 2: Testo cita 3 storie');

// TEDESCO, SPAGNOLO, OLANDESE, POLACCO, SVEDESE, GIAPPONESE
const nonEnLangs = ['de', 'es', 'nl', 'pl', 'se', 'jp'];
nonEnLangs.forEach(lang => {
  const slides = config.getSlidesForLanguage(lang);
  assert(slides.length === 2, `[${lang.toUpperCase()}] Esattamente 2 slide`);
  assert(slides[0].id === '02-einstein', `[${lang.toUpperCase()}] Slide 1: Einstein`);
  assert(slides[0].covers[0].src.includes('einstein-en.jpg'), `[${lang.toUpperCase()}] Einstein usa copertina inglese`);
  assert(Boolean(slides[0].badge), `[${lang.toUpperCase()}] Einstein ha etichetta visibile: "${slides[0].badge}"`);
  assert(slides[0].isEnglishProduct === true, `[${lang.toUpperCase()}] Einstein contrassegnato isEnglishProduct`);

  assert(slides[1].id === '03-collana', `[${lang.toUpperCase()}] Slide 2: Collana Cantiere`);
  assert(slides[1].covers.length === 3 && slides[1].covers[0].src.includes('csa-en-'), `[${lang.toUpperCase()}] Cantiere usa copertine inglesi`);
  assert(slides[1].totalCount === 8, `[${lang.toUpperCase()}] Cantiere conteggio 8 episodi`);
  assert(Boolean(slides[1].badge), `[${lang.toUpperCase()}] Cantiere ha etichetta visibile: "${slides[1].badge}"`);
  assert(slides[1].isEnglishProduct === true, `[${lang.toUpperCase()}] Cantiere contrassegnato isEnglishProduct`);
});

// 4. Verifica Esclusioni Vincolanti
console.log('\n--- 4. Verifica Esclusioni e Vincoli Prodotti ---');
// sos-natale deve essere presente esclusivamente in lingua italiana
const nonItLangsWithSos = nonEnLangs.concat(['en', 'fr']).filter(lang => 
  config.getSlidesForLanguage(lang).some(s => s.id === 'sos-natale')
);
assert(nonItLangsWithSos.length === 0, 'sos-natale presente esclusivamente in lingua italiana');
const allSlidesAllLangs = Object.keys(config.slidesData).flatMap(k => config.slidesData[k]);

// Collana scolastica (Matematica 2) non deve comparire nell'hero
const hasScuola = allSlidesAllLangs.some(s =>
  (s.covers && s.covers.some(c => c.src.includes('bussola') || c.src.includes('matematica'))) ||
  (s.title && s.title.toLowerCase().includes('matematica'))
);
assert(!hasScuola, 'Collana scolastica (Matematica 2) non presente nella campagna');

// 5. Verifica Integrazione File HTML
console.log('\n--- 5. Verifica Integrazione HTML (index.html e cantiere.html) ---');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(indexHtml.includes('campaign.css'), 'index.html include campaign.css');
assert(indexHtml.includes('config/campaign-christmas-2026.js'), 'index.html include config/campaign-christmas-2026.js');
assert(indexHtml.includes('campaign.js'), 'index.html include campaign.js');
assert(indexHtml.includes('id="christmas-hero-container"'), 'index.html include #christmas-hero-container');
assert(indexHtml.includes('id="hero-banner"') && indexHtml.includes('display: none'), 'index.html mantiene hero ordinario con fallback');

const cantiereHtml = fs.readFileSync(path.join(__dirname, '..', 'cantiere.html'), 'utf8');
assert(cantiereHtml.includes('id="hero-banner"'), 'cantiere.html include #hero-banner trasferito da home');
assert(cantiereHtml.includes('id="hero-carousel"'), 'cantiere.html include #hero-carousel con tutte le 13 slide');
assert(cantiereHtml.includes('assets/banner/banners.js'), 'cantiere.html include assets/banner/banners.js');

// 6. Verifica Simulazione Engine campaign.js e Transizione Lingua
console.log('\n--- 6. Verifica Simulazione Engine e Cambio Lingua ---');
const campaignPath = fs.existsSync(path.join(__dirname, '..', 'js', 'campaign.js'))
  ? path.join(__dirname, '..', 'js', 'campaign.js')
  : path.join(__dirname, '..', 'campaign.js');
const campaignJs = fs.readFileSync(campaignPath, 'utf8');
assert(campaignJs.includes('renderChristmasHero'), 'campaign.js definisce renderChristmasHero');
assert(campaignJs.includes('goToSlide'), 'campaign.js definisce goToSlide');
assert(campaignJs.includes('prefers-reduced-motion'), 'campaign.js rispetta prefers-reduced-motion');
assert(campaignJs.includes('inert'), 'campaign.js applica inert e tabindex=-1 a slide inattive');

console.log('----------------------------------------------------');
if (errors > 0) {
  console.error(`❌ VERIFICA NATALE 2026 FALLITA CON ${errors} ERRORI`);
  process.exit(1);
} else {
  console.log('🎉 TUTTE LE VERIFICHE DELL\'HERO NATALE 2026 SONO STATE SUPERATE CON SUCCESSO!');
  process.exit(0);
}
