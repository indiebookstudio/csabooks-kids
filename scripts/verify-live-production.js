const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, data: d }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('🌍 VERIFICA SITO DI PRODUZIONE (https://csabookskids.com)...');
  
  // 1. App.js live
  const r1 = await fetch('https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/assets/js/app.js');
  console.log('App.js Status:', r1.status);
  console.log('  chk-marketing UNCHECKED?:', !r1.data.includes('<input type="checkbox" id="chk-marketing" checked>'));
  console.log('  privacyBodies present?:', r1.data.includes('privacyBodies'));
  console.log('  localizeIntegrativeItem present?:', r1.data.includes('localizeIntegrativeItem'));

  // 2. French animation 06 live
  const r2 = await fetch('https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/fr/animazioni/06.Ginocchio.Bionico/index.html');
  console.log('06 FR Animation Status:', r2.status);
  console.log('  French caption present?:', r2.data.includes('CORPS ET TECHNOLOGIE'));
  console.log('  No Italian loading text?:', !r2.data.includes('Entriamo nel laboratorio del movimento…'));

  // 3. French Museo app.js live
  const r3 = await fetch('https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/fr/museo/app.js');
  console.log('FR Museo app.js Status:', r3.status);
  console.log('  No malformed crumb?:', !r3.data.includes('Salle  sur 7'));
  console.log('  Correct breadcrumb interpolation?:', r3.data.includes('Salle ${r.id} sur 7'));

  console.log('🎉 VERIFICA LIVE PRODUZIONE COMPLETATA!');
}

run().catch(console.error);
