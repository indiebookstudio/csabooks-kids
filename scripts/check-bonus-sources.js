const fs = require('fs');

const itaWords = [
  'versione precedente', 'principale', 'conservato', 'Stesso manoscritto',
  'Stessa pubblicazione', 'raggiunta anche', 'citato anche', 'Fonte del calcolo',
  'Lettera di', 'Anche:', 'e colleghi'
];

['en', 'fr', 'es'].forEach(lang => {
  const file = 'accesso/4dcbbaee2e69a278e4e59eab50430ccc/content/fonti_' + lang + '.csv';
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== ' + lang + ' ===');
  itaWords.forEach(w => {
    let pos = 0;
    while ((pos = content.indexOf(w, pos)) !== -1) {
      const lineStart = content.lastIndexOf('\n', pos) + 1;
      const lineEnd = content.indexOf('\n', pos);
      console.log('Found "' + w + '": ' + content.slice(lineStart, lineEnd));
      pos += w.length;
    }
  });
});
