const fs = require('fs');
const path = require('path');

const dirs = [
  '01.Megattere', '02.Felce.DNA', '03.Pesce.Veicolo',
  '04.Uccelli.Dinosauri', '05.Fungo.Robot', '06.Ginocchio.Bionico', '07.Buco.Nero'
];

// Common Italian words that should never appear in EN, FR, ES
const italianLexicon = [
  'scoperta', 'scoperte', 'viaggio', 'avanti', 'indietro', 'chiudi',
  'mostra', 'nascondi', 'inizio', 'continua', 'osserva', 'ruota',
  'trascina', 'tocca', 'clicca', 'pulsante', 'prossimo', 'precedente',
  'risposta', 'esatto', 'sbagliato', 'indizio', 'aiuto', 'fonte',
  'originale', 'libro', 'foglio', 'timbro', 'sigillo', 'salva',
  'riprova', 'ricomincia', 'pausa', 'riprendi', 'suoni', 'audio',
  'modello', 'illustrativo', 'non riproduce', 'laboratorio', 'atrio'
];

dirs.forEach(d => {
  ['en', 'fr', 'es'].forEach(lang => {
    const file = path.join('accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus', lang, 'animazioni', d, 'index.html');
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    // Extract text inside tags or attributes or JS strings (exclude CSS and large base64)
    const cleaned = content.replace(/<style[\s\S]*?<\/style>/g, '').replace(/data:[^"']+/g, '');

    italianLexicon.forEach(term => {
      // search for word boundary
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let m;
      let count = 0;
      const snippets = [];
      while ((m = regex.exec(cleaned)) !== null && count < 5) {
        // filter out false positives: e.g. English words like 'audio', 'pause', etc.
        const matchStr = m[0];
        const snippet = cleaned.slice(Math.max(0, m.index - 35), Math.min(cleaned.length, m.index + 45)).replace(/\s+/g, ' ');
        // If lang is en and word is audio/pause/original/model, ignore
        if (lang === 'en' && ['audio', 'pause', 'original', 'model', 'data'].includes(term)) continue;
        if (lang === 'fr' && ['audio', 'pause', 'original', 'guide'].includes(term)) continue;
        if (lang === 'es' && ['audio', 'original', 'continua', 'observa'].includes(term)) continue;
        snippets.push(snippet);
        count++;
      }
      if (snippets.length > 0) {
        console.log(`[${lang}] ${d} -> Term: "${term}" (${count}):`);
        snippets.forEach(s => console.log('    ...', s, '...'));
      }
    });
  });
});
