const assert = require('assert');
const fs = require('fs');

console.log('🧪 VERIFICA INTERNAZIONALIZZAZIONE TITOLI EPISODI CSA...');

const script = fs.readFileSync('js/script.js', 'utf8');

// Check that EPISODES_DATA is present
assert(script.includes('const EPISODES_DATA = {'), 'EPISODES_DATA must be defined in js/script.js');
assert(script.includes('window.EPISODES_DATA = EPISODES_DATA;'), 'EPISODES_DATA must be exported to window');

// Extract EPISODES_DATA object using regex or eval
const match = script.match(/const EPISODES_DATA = (\{[\s\S]*?\n\};)/);
assert(match, 'Must find EPISODES_DATA definition in script');

const episodesData = eval('(' + match[1].replace(/;$/, '') + ')');

const expected = {
  1: {
    it: "Benny l'escavatore e la collina che cambiava forma",
    en: "Benny the Excavator and the Shape-Shifting Hill"
  },
  2: {
    it: "Rudy la ruspa e la spiaggia che scompariva",
    en: "Rudy the Bulldozer and the Vanishing Beach"
  },
  3: {
    it: "Leo la gru e le gemme della montagna",
    en: "Leo the Crane and the Mountain Gems"
  },
  4: {
    it: "Bruno il camion e il laghetto delle papere",
    en: "Bruno the Dump Truck and the Duck Pond"
  }
};

for (const [epNum, titles] of Object.entries(expected)) {
  const ep = episodesData[epNum];
  assert(ep, `Episode ${epNum} must exist in EPISODES_DATA`);
  assert.strictEqual(ep.it.title, titles.it, `Episode ${epNum} IT title mismatch`);
  assert.strictEqual(ep.en.title, titles.en, `Episode ${epNum} EN title mismatch`);
  assert(ep.en.metaDesc.includes(titles.en), `Episode ${epNum} EN metaDesc should include title`);
  console.log(`  ✓ Episodio ${epNum}: IT="${ep.it.title}" | EN="${ep.en.title}"`);
}

console.log('🎉 TUTTI I TEST CSA EPISODI I18N COMPLETATI CON SUCCESSO!');
