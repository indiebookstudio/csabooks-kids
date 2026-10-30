const fs = require('fs');
const path = require('path');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function renderMuseoFlagBar(currentLang) {
  const langs = [
    { code: 'en', title: 'English', flag: UK_FLAG },
    { code: 'it', title: 'Italiano', flag: IT_FLAG },
    { code: 'fr', title: 'Français', flag: FR_FLAG },
    { code: 'es', title: 'Español', flag: ES_FLAG }
  ];
  return `<div class="locale-pill-bar" role="group" aria-label="Language selection">
${langs.map(l => {
  if (l.code === currentLang) {
    return `        <a class="locale-flag-item active" href="#" aria-current="true" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  } else {
    return `        <a class="locale-flag-item " href="../../${l.code}/museo/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  }
}).join('\n')}
      </div>`;
}

// 1. Ensure directories exist
fs.mkdirSync('assets/einstein/bonus/fr/museo', { recursive: true });
fs.mkdirSync('assets/einstein/bonus/es/museo', { recursive: true });

// Copy shared assets
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyDirSync('assets/einstein/bonus/en/museo/assets', 'assets/einstein/bonus/fr/museo/assets');
copyDirSync('assets/einstein/bonus/en/museo/assets', 'assets/einstein/bonus/es/museo/assets');

for (const f of ['style.css', 'favicon.svg', 'museo-anteprima.jpg']) {
  fs.copyFileSync(`assets/einstein/bonus/en/museo/${f}`, `assets/einstein/bonus/fr/museo/${f}`);
  fs.copyFileSync(`assets/einstein/bonus/en/museo/${f}`, `assets/einstein/bonus/es/museo/${f}`);
}

// 2. Build index.html for FR and ES
const enIndex = fs.readFileSync('assets/einstein/bonus/en/museo/index.html', 'utf8');

let frIndex = enIndex;
frIndex = frIndex.replace(/<html lang="en">/, '<html lang="fr">');
frIndex = frIndex.replace(/<title>.*?<\/title>/, '<title>Le Musée des Découvertes Impossibles · Otto</title>');
frIndex = frIndex.replace(/content="The Museum of Impossible Discoveries: seven interactive galleries, Otto, and real science mysteries from Einstein, You Missed This!"/,
  'content="Le Musée des Découvertes Impossibles : sept salles interactives, Otto et de vrais mystères scientifiques tirés d\'Einstein, tu as manqué ça !"');
frIndex = frIndex.replace(/content="Explore seven galleries of science with Otto: experiments, mysteries, and an explorer passport to complete."/,
  'content="Explore sept salles de science avec Otto : expériences, énigmes et un passeport d\'explorateur à compléter."');
frIndex = frIndex.replace(/Skip to main content/, 'Aller au contenu principal');
frIndex = frIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio">Home<\/a>/, 'href="../../../?lang=fr&pagina=inizio">Accueil</a>');
frIndex = frIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus">Bonuses<\/a>/, 'href="../../../?lang=fr&pagina=bonus">Les bonus</a>');
frIndex = frIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti">Source Library<\/a>/, 'href="../../../?lang=fr&pagina=fonti">Bibliothèque des sources</a>');
frIndex = frIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio" aria-label="Go to Home"/, 'href="../../../?lang=fr&pagina=inizio" aria-label="Retour à l\'accueil"');

const flagRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;
frIndex = frIndex.replace(flagRegex, renderMuseoFlagBar('fr'));

frIndex = frIndex.replace(/THE MUSEUM <small>OF IMPOSSIBLE DISCOVERIES<\/small>/, 'LE MUSÉE <small>DES DÉCOUVERTES IMPOSSIBLES</small>');
frIndex = frIndex.replace(/Seven Galleries<\/a>/, 'Sept Salles</a>');
frIndex = frIndex.replace(/Passport <strong/, 'Passeport <strong');
frIndex = frIndex.replace(/An exclusive companion to <strong>EINSTEIN, YOU MISSED THIS!<\/strong>/,
  'Compagnon exclusif du livre <strong>EINSTEIN, TU AS MANQUÉ ÇA !</strong>');
frIndex = frIndex.replace(/Illustrative narrative reconstructions; not actual laboratory photographs or data representations\./,
  'Reconstitutions narratives et artistiques à but éducatif ; non contractuelles des publications scientifiques originales.');
frIndex = frIndex.replace(/Please enable JavaScript in your browser to explore the interactive museum\./,
  'Veuillez activer JavaScript dans votre navigateur pour explorer le musée interactif.');

fs.writeFileSync('assets/einstein/bonus/fr/museo/index.html', frIndex, 'utf8');

let esIndex = enIndex;
esIndex = esIndex.replace(/<html lang="en">/, '<html lang="es">');
esIndex = esIndex.replace(/<title>.*?<\/title>/, '<title>El Museo de los Descubrimientos Imposibles · Otto</title>');
esIndex = esIndex.replace(/content="The Museum of Impossible Discoveries: seven interactive galleries, Otto, and real science mysteries from Einstein, You Missed This!"/,
  'content="El Museo de los Descubrimientos Imposibles: siete salas interactivas, Otto y auténticos misterios científicos de ¡Einstein, esta te la perdiste!"');
esIndex = esIndex.replace(/content="Explore seven galleries of science with Otto: experiments, mysteries, and an explorer passport to complete."/,
  'content="Explora siete salas de ciencia con Otto: experimentos, enigmas y un pasaporte de explorador para sellar."');
esIndex = esIndex.replace(/Skip to main content/, 'Saltar al contenido principal');
esIndex = esIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio">Home<\/a>/, 'href="../../../?lang=es&pagina=inizio">Inicio</a>');
esIndex = esIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus">Bonuses<\/a>/, 'href="../../../?lang=es&pagina=bonus">Los bonus</a>');
esIndex = esIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti">Source Library<\/a>/, 'href="../../../?lang=es&pagina=fonti">Biblioteca de fuentes</a>');
esIndex = esIndex.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio" aria-label="Go to Home"/, 'href="../../../?lang=es&pagina=inizio" aria-label="Volver al inicio"');

esIndex = esIndex.replace(flagRegex, renderMuseoFlagBar('es'));

esIndex = esIndex.replace(/THE MUSEUM <small>OF IMPOSSIBLE DISCOVERIES<\/small>/, 'EL MUSEO <small>DE LOS DESCUBRIMIENTOS IMPOSIBLES</small>');
esIndex = esIndex.replace(/Seven Galleries<\/a>/, 'Siete Salas</a>');
esIndex = esIndex.replace(/Passport <strong/, 'Pasaporte <strong');
esIndex = esIndex.replace(/An exclusive companion to <strong>EINSTEIN, YOU MISSED THIS!<\/strong>/,
  'Compromiso exclusivo del libro <strong>¡EINSTEIN, ESTA TE LA PERDISTE!</strong>');
esIndex = esIndex.replace(/Illustrative narrative reconstructions; not actual laboratory photographs or data representations\./,
  'Reconstrucciones ilustradas con fines educativos; no sustituyen a las publicaciones científicas originales.');
esIndex = esIndex.replace(/Please enable JavaScript in your browser to explore the interactive museum\./,
  'Por favor, activa JavaScript en tu navegador para explorar el museo interactivo.');

fs.writeFileSync('assets/einstein/bonus/es/museo/index.html', esIndex, 'utf8');

// Update IT and EN flag bars
function updateFlagBarInMuseo(file, lang) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(flagRegex, renderMuseoFlagBar(lang));
  fs.writeFileSync(file, content, 'utf8');
}
updateFlagBarInMuseo('assets/einstein/bonus/it/museo/index.html', 'it');
updateFlagBarInMuseo('assets/einstein/bonus/en/museo/index.html', 'en');

// 3. FONTI_DEL_MUSEO.csv
const fontiFR = `Code dans le livre,Titre de la fiche,Lien vers la source originale,DOI,Note
SC-04,Les orques et l’algue,https://www.sciencedirect.com/science/article/pii/S0960982225004506,10.1016/j.cub.2025.04.021,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-05,La baleine et les bulles,https://doi.org/10.1098/rsos.240328,10.1098/rsos.240328,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-12,Des pousses dans la poussière lunaire,https://doi.org/10.1038/s42003-022-03334-8,10.1038/s42003-022-03334-8,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-13,La fougère au super-ADN,https://www.sciencedirect.com/science/article/pii/S2589004224011118,10.1016/j.isci.2024.109889,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-15,Le poisson prend le volant,https://doi.org/10.1016/j.bbr.2021.113711,10.1016/j.bbr.2021.113711,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-22,Un dinosaure dans le poulailler,https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html,,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-25,Le puissant mégalodon,https://doi.org/10.1080/08912963.2024.2380590,10.1080/08912963.2024.2380590,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-36,Un champignon relié à un robot,https://doi.org/10.1126/scirobotics.adk8019,10.1126/scirobotics.adk8019,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-43,Le genou bionique,https://news.mit.edu/2024/bionic-knee-tissue-integration-0710,,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
SC-55,La première image d’un trou noir,https://doi.org/10.3847/2041-8213/ab0ec7,10.3847/2041-8213/ab0ec7,Le site ouvre la source originale ; n'héberge pas de PDF tiers.
`;

const fontiES = `Código en el libro,Título de la ficha,Enlace a la fuente original,DOI,Nota
SC-04,Las orcas y su herramienta de algas,https://www.sciencedirect.com/science/article/pii/S0960982225004506,10.1016/j.cub.2025.04.021,El sitio abre la publicación original; no aloja PDF de terceros.
SC-05,La ballena y su red de burbujas,https://doi.org/10.1098/rsos.240328,10.1098/rsos.240328,El sitio abre la publicación original; no aloja PDF de terceros.
SC-12,Brotes en polvo lunar,https://doi.org/10.1038/s42003-022-03334-8,10.1038/s42003-022-03334-8,El sitio abre la publicación original; no aloja PDF de terceros.
SC-13,El helecho con ADN gigante,https://www.sciencedirect.com/science/article/pii/S2589004224011118,10.1016/j.isci.2024.109889,El sitio abre la publicación original; no aloja PDF de terceros.
SC-15,El pez que conduce un vehículo,https://doi.org/10.1016/j.bbr.2021.113711,10.1016/j.bbr.2021.113711,El sitio abre la publicación original; no aloja PDF de terceros.
SC-22,Un dinosaurio en el gallinero,https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html,,El sitio abre la publicación original; no aloja PDF de terceros.
SC-25,El temible megalodón,https://doi.org/10.1080/08912963.2024.2380590,10.1080/08912963.2024.2380590,El sitio abre la publicación original; no aloja PDF de terceros.
SC-36,Un hongo conectado a un robot,https://doi.org/10.1126/scirobotics.adk8019,10.1126/scirobotics.adk8019,El sitio abre la publicación original; no aloja PDF de terceros.
SC-43,La rodilla biónica,https://news.mit.edu/2024/bionic-knee-tissue-integration-0710,,El sitio abre la publicación original; no aloja PDF de terceros.
SC-55,La primera imagen de un agujero negro,https://doi.org/10.3847/2041-8213/ab0ec7,10.3847/2041-8213/ab0ec7,El sitio abre la publicación original; no aloja PDF de terceros.
`;

fs.writeFileSync('assets/einstein/bonus/fr/museo/FONTI_DEL_MUSEO.csv', fontiFR, 'utf8');
fs.writeFileSync('assets/einstein/bonus/es/museo/FONTI_DEL_MUSEO.csv', fontiES, 'utf8');

console.log('✅ Generated museo index.html and FONTI_DEL_MUSEO.csv for FR & ES!');
