const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function compile() {
  const booksJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'books.json'), 'utf8'));
  const manifestJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'books-manifest.json'), 'utf8'));
  const i18nJson = JSON.parse(fs.readFileSync(path.join(dataDir, 'i18n.json'), 'utf8'));

  // Build combined payload
  const runtimeCode = `// CSA Books Kids 2.0 - Core Runtime Data
(function() {
  window.CSA_BOOKS_DATA = ${JSON.stringify(booksJson, null, 2)};
  window.BOOKS_MANIFEST = ${JSON.stringify(manifestJson, null, 2)};
  window.SITE_I18N = ${JSON.stringify(i18nJson, null, 2)};
})();
`;

  fs.writeFileSync(path.join(dataDir, 'runtime-data.js'), runtimeCode, 'utf8');
  console.log('✅ data/runtime-data.js compilato con successo!');
}

if (require.main === module) {
  compile();
}

module.exports = { compile };
