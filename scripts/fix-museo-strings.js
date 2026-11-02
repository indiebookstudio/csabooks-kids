const fs = require('fs');
const path = require('path');

const baseDirs = [
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc',
  'assets/einstein'
];

baseDirs.forEach(base => {
  // IT
  const itFile = path.join(base, 'bonus/it/museo/app.js');
  let it = fs.readFileSync(itFile, 'utf8');
  it = it.replace('<span>Sala  di 7${r.id} / 7</span>', '<span>Sala ${r.id} di 7</span>');
  it = it.replace('Passaporto: /7 sigilli${completed.size}/7 sigilli', 'Passaporto: ${completed.size}/7 sigilli');
  it = it.replace('Vai alla sala →${next.id} →', 'Vai alla sala ${next.id} →');
  it = it.replace(
    '<p><strong>${completed.size} / 7 sale completate.</strong> Complimenti! Hai completato tutte le sette sale.</p>',
    '<p><strong>${completed.size} / 7 sale completate.</strong>${completed.size===7?\' Complimenti! Hai completato tutte le sette sale.\':\'\'}</p>'
  );
  it = it.replace('title="Gallery ${r.id}: ${esc(r.seal)}"', 'title="Sala ${r.id}: ${esc(r.seal)}"');
  it = it.replace('<button data-act="close" class="icon-button" aria-label="Close">×</button>', '<button data-act="close" class="icon-button" aria-label="Chiudi">×</button>');
  it = it.replace('<section class="wrap museum-map" aria-label="Museum Galleries">', '<section class="wrap museum-map" aria-label="Sale del museo">');
  it = it.replace('<nav class="next-controls" aria-label="Move between galleries">', '<nav class="next-controls" aria-label="Naviga tra le sale">');
  fs.writeFileSync(itFile, it, 'utf8');

  // EN
  const enFile = path.join(base, 'bonus/en/museo/app.js');
  let en = fs.readFileSync(enFile, 'utf8');
  en = en.replace('<span>Gallery  of 7${r.id} / 7</span>', '<span>Gallery ${r.id} of 7</span>');
  en = en.replace('Passport: /7 seals${completed.size}/7 seals', 'Passport: ${completed.size}/7 seals');
  en = en.replace('Go to gallery →${next.id} →', 'Go to gallery ${next.id} →');
  en = en.replace(
    '<p><strong>${completed.size} / 7 galleries completed.</strong> Congratulations! You completed all seven galleries.</p>',
    '<p><strong>${completed.size} / 7 galleries completed.</strong>${completed.size===7?\' Congratulations! You completed all seven galleries.\':\'\'}</p>'
  );
  fs.writeFileSync(enFile, en, 'utf8');

  // FR
  const frFile = path.join(base, 'bonus/fr/museo/app.js');
  let fr = fs.readFileSync(frFile, 'utf8');
  fr = fr.replace('<span>Salle  sur 7${r.id} / 7</span>', '<span>Salle ${r.id} sur 7</span>');
  fr = fr.replace('Passeport : /7 sceaux${completed.size}/7 sceaux', 'Passeport : ${completed.size}/7 sceaux');
  fr = fr.replace('Aller à la salle →${next.id} →', 'Aller à la salle ${next.id} →');
  fr = fr.replace(
    '<p><strong>${completed.size} / 7 salles complétées.</strong> Félicitations ! Tu as complété l’ensemble des sept salles.</p>',
    '<p><strong>${completed.size} / 7 salles complétées.</strong>${completed.size===7?\' Félicitations ! Tu as complété l’ensemble des sept salles.\':\'\'}</p>'
  );
  fr = fr.replace('title="Gallery ${r.id}: ${esc(r.seal)}"', 'title="Salle ${r.id} : ${esc(r.seal)}"');
  fr = fr.replace('<button data-act="close" class="icon-button" aria-label="Close">×</button>', '<button data-act="close" class="icon-button" aria-label="Fermer">×</button>');
  fr = fr.replace('<section class="wrap museum-map" aria-label="Museum Galleries">', '<section class="wrap museum-map" aria-label="Salles du musée">');
  fr = fr.replace('<nav class="next-controls" aria-label="Move between galleries">', '<nav class="next-controls" aria-label="Naviguer entre les salles">');
  fs.writeFileSync(frFile, fr, 'utf8');

  // ES
  const esFile = path.join(base, 'bonus/es/museo/app.js');
  let es = fs.readFileSync(esFile, 'utf8');
  es = es.replace('<span>Sala  de 7${r.id} / 7</span>', '<span>Sala ${r.id} de 7</span>');
  es = es.replace('Pasaporte: /7 sellos${completed.size}/7 sellos', 'Pasaporte: ${completed.size}/7 sellos');
  es = es.replace('Ir a la sala →${next.id} →', 'Ir a la sala ${next.id} →');
  es = es.replace(
    '<p><strong>${completed.size} / 7 salas completadas.</strong> ¡Enhorabuena! Has completado las siete salas.</p>',
    '<p><strong>${completed.size} / 7 salas completadas.</strong>${completed.size===7?\' ¡Enhorabuena! Has completado las siete salas.\':\'\'}</p>'
  );
  es = es.replace('title="Gallery ${r.id}: ${esc(r.seal)}"', 'title="Sala ${r.id}: ${esc(r.seal)}"');
  es = es.replace('<button data-act="close" class="icon-button" aria-label="Close">×</button>', '<button data-act="close" class="icon-button" aria-label="Cerrar">×</button>');
  es = es.replace('<section class="wrap museum-map" aria-label="Museum Galleries">', '<section class="wrap museum-map" aria-label="Salas del museo">');
  es = es.replace('<nav class="next-controls" aria-label="Move between galleries">', '<nav class="next-controls" aria-label="Navegar entre las salas">');
  fs.writeFileSync(esFile, es, 'utf8');

  console.log(`Updated museo apps in ${base}`);
});
