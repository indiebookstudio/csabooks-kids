const assert = require('assert');
const fs = require('fs');

console.log('🧪 VERIFICA INTERNAZIONALIZZAZIONE TITOLI EPISODI CSA...');

const script = fs.readFileSync('js/script.js', 'utf8');

// 1. Check Volume 1 EPISODES_DATA
assert(script.includes('const EPISODES_DATA = {'), 'EPISODES_DATA must be defined in js/script.js');
assert(script.includes('window.EPISODES_DATA = EPISODES_DATA;'), 'EPISODES_DATA must be exported to window');

const match = script.match(/const EPISODES_DATA = (\{[\s\S]*?\n\};)/);
assert(match, 'Must find EPISODES_DATA definition in script');

const episodesData = eval('(' + match[1].replace(/;$/, '') + ')');

const expected = {
  1: {
    it: "Benny l'escavatore e la collina che cambiava forma",
    en: "Benny the Excavator and the Shape-Shifting Hill",
    fr: "Benny l'excavateur et la colline qui changeait de forme"
  },
  2: {
    it: "Rudy la ruspa e la spiaggia che scompariva",
    en: "Rudy the Bulldozer and the Vanishing Beach",
    fr: "Rudy le bulldozer et la plage qui disparaissait"
  },
  3: {
    it: "Leo la gru e le gemme della montagna",
    en: "Leo the Crane and the Mountain Gems",
    fr: "Leo la grue et les gemmes de la montagne"
  },
  4: {
    it: "Bruno il camion e il laghetto delle papere",
    en: "Bruno the Dump Truck and the Duck Pond",
    fr: "Bruno le camion et la mare aux canards"
  }
};

for (const [epNum, titles] of Object.entries(expected)) {
  const ep = episodesData[epNum];
  assert(ep, `Episode ${epNum} must exist in EPISODES_DATA`);
  assert.strictEqual(ep.it.title, titles.it, `Episode ${epNum} IT title mismatch`);
  assert.strictEqual(ep.en.title, titles.en, `Episode ${epNum} EN title mismatch`);
  assert.strictEqual(ep.fr.title, titles.fr, `Episode ${epNum} FR title mismatch`);
  assert(ep.en.metaDesc.includes(titles.en), `Episode ${epNum} EN metaDesc should include title`);
  assert(ep.fr.metaDesc.includes(titles.fr), `Episode ${epNum} FR metaDesc should include title`);
  console.log(`  ✓ Vol 1 Episodio ${epNum}: IT="${ep.it.title}" | EN="${ep.en.title}" | FR="${ep.fr.title}"`);
}

// 2. Check Volume 2 EPISODES_DATA_VOL2
assert(script.includes('const EPISODES_DATA_VOL2 = {'), 'EPISODES_DATA_VOL2 must be defined in js/script.js');
assert(script.includes('window.EPISODES_DATA_VOL2 = EPISODES_DATA_VOL2;'), 'EPISODES_DATA_VOL2 must be exported to window');

const matchVol2 = script.match(/const EPISODES_DATA_VOL2 = (\{[\s\S]*?\n\};)/);
assert(matchVol2, 'Must find EPISODES_DATA_VOL2 definition in script');

const episodesDataVol2 = eval('(' + matchVol2[1].replace(/;$/, '') + ')');

const expectedVol2 = {
  1: {
    it: "Benny l'escavatore e le monete dell'antica Roma",
    en: "Benny the Excavator and the Coins of Ancient Rome"
  },
  2: {
    it: "Nina la betoniera e il ponte dei coniglietti",
    en: "Nina the Cement Truck and the Bunny Bridge"
  },
  3: {
    it: "Rino il rullo e i ladri del cantiere",
    en: "Rino the Roller and the Construction Site Thieves"
  },
  4: {
    it: "Leo la gru e il nido della cinciallegra",
    en: "Leo the Crane and the Little Bird's Nest"
  }
};

for (const [epNum, titles] of Object.entries(expectedVol2)) {
  const ep = episodesDataVol2[epNum];
  assert(ep, `Volume 2 Episode ${epNum} must exist in EPISODES_DATA_VOL2`);
  assert.strictEqual(ep.it.title, titles.it, `Volume 2 Episode ${epNum} IT title mismatch`);
  assert.strictEqual(ep.en.title, titles.en, `Volume 2 Episode ${epNum} EN title mismatch`);
  assert(ep.en.metaDesc.includes(titles.en), `Volume 2 Episode ${epNum} EN metaDesc should include title`);
  console.log(`  ✓ Vol 2 Episodio ${epNum}: IT="${ep.it.title}" | EN="${ep.en.title}"`);
}

console.log('🎉 TUTTI I TEST CSA EPISODI I18N COMPLETATI CON SUCCESSO!');
