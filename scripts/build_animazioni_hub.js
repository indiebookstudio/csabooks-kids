const fs = require('fs');
const path = require('path');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function renderFlagBar(currentLang) {
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
    return `        <a class="locale-flag-item " href="../../${l.code}/animazioni/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  }
}).join('\n')}
      </div>`;
}

// Ensure target directories exist
fs.mkdirSync('assets/einstein/bonus/fr/animazioni', { recursive: true });
fs.mkdirSync('assets/einstein/bonus/es/animazioni', { recursive: true });

// Copy shared assets (images, favicon)
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyDirSync('assets/einstein/bonus/en/animazioni/assets', 'assets/einstein/bonus/fr/animazioni/assets');
copyDirSync('assets/einstein/bonus/en/animazioni/assets', 'assets/einstein/bonus/es/animazioni/assets');

if (fs.existsSync('assets/einstein/bonus/en/animazioni/favicon.svg')) {
  fs.copyFileSync('assets/einstein/bonus/en/animazioni/favicon.svg', 'assets/einstein/bonus/fr/animazioni/favicon.svg');
  fs.copyFileSync('assets/einstein/bonus/en/animazioni/favicon.svg', 'assets/einstein/bonus/es/animazioni/favicon.svg');
}

// Read base template from EN
const enHub = fs.readFileSync('assets/einstein/bonus/en/animazioni/index.html', 'utf8');

// Build FR Hub
let frHub = enHub;
// Update HTML lang and meta
frHub = frHub.replace(/<html lang="en">/, '<html lang="fr">');
frHub = frHub.replace(/<title>.*?<\/title>/, '<title>Simulations 3D Interactives · Otto</title>');
frHub = frHub.replace(/content="Otto's 3D interactive scientific simulations for the book Einstein, You Missed This!"/, 'content="Simulations scientifiques 3D interactives d\'Otto pour le livre Einstein, tu as manqué ça !"');
frHub = frHub.replace(/content="3D Animations & Science Simulations · Otto's Laboratory"/, 'content="Animations 3D et simulations scientifiques · Le laboratoire d\'Otto"');
frHub = frHub.replace(/content="Explore science in 3D with Otto: humpback whales, giant DNA, bio-hybrid fungal robotics, and black holes."/, 'content="Explore la science en 3D avec Otto : baleines à bosse, ADN géant, robotique biohybride fongique et trous noirs."');

// Navigation links
frHub = frHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio">Home<\/a>/, 'href="../../../?lang=fr&pagina=inizio">Accueil</a>');
frHub = frHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus">Bonuses<\/a>/, 'href="../../../?lang=fr&pagina=bonus">Les bonus</a>');
frHub = frHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti">Source Library<\/a>/, 'href="../../../?lang=fr&pagina=fonti">Bibliothèque des sources</a>');
frHub = frHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio" class="brand"/, 'href="../../../?lang=fr&pagina=inizio" class="brand"');

// Flag bar replacement
const flagRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;
frHub = frHub.replace(flagRegex, renderFlagBar('fr'));

// Hero & text content
frHub = frHub.replace(/<span>3D LAB<\/span> · DISCOVERY PORTAL/, '<span>LABORATOIRE 3D</span> · PORTAIL DES DÉCOUVERTES');
frHub = frHub.replace(/<h1>THE 7 DISCOVERIES IN 3D<\/h1>/, '<h1>LES 7 DÉCOUVERTES EN 3D</h1>');
frHub = frHub.replace(/Step inside the science from the book\. Rotate, zoom, and interact with the 7 interactive scientific simulations created with Otto\./,
  'Plonge au cœur de la science du livre. Fais pivoter, zoome et interagis avec les 7 simulations scientifiques 3D conçues avec Otto.');

frHub = frHub.replace(/✦ 7 Interactive 3D Simulations/, '✦ 7 simulations 3D interactives');
frHub = frHub.replace(/✦ Fully Mobile-Ready/, '✦ 100 % adapté sur mobile');
frHub = frHub.replace(/✦ Open Source Scientific Models/, '✦ Modèles scientifiques ouverts');

// Cards replacement in FR
frHub = frHub.replace(/alt="Humpback whale bubble net"/, 'alt="Filet de bulles des baleines à bosse"');
frHub = frHub.replace(/<h3>The Invisible Bubble Net<\/h3>/, '<h3>Le filet de bulles invisible</h3>');
frHub = frHub.replace(/<p>Humpback whales craft circular nets of air bubbles to corral schools of fish\. Explore the hunting spiral in 3D\.<\/p>/,
  '<p>Les baleines à bosse créent des spirales de bulles d’air pour piéger les bancs de poissons. Explore la spirale de chasse en 3D.</p>');
frHub = frHub.replace(/>Launch 3D simulation →<\/a>/g, '>Lancer la simulation 3D →</a>');

frHub = frHub.replace(/alt="Fern with giant DNA"/, 'alt="Fougère au super ADN"');
frHub = frHub.replace(/<h3>The Fern with Giant DNA<\/h3>/, '<h3>La fougère au super-ADN</h3>');
frHub = frHub.replace(/<p>A tiny fork fern holds the largest genome on Earth — fifty times more DNA than humans\. Unfold the giant double helix\.<\/p>/,
  '<p>Une minuscule fougère possède le plus grand génome sur Terre : 50 fois plus d’ADN qu’un être humain. Déplie la double hélice géante.</p>');

frHub = frHub.replace(/alt="Fish driving a motorized vehicle"/, 'alt="Poisson conduisant un véhicule"');
frHub = frHub.replace(/<h3>The Fish That Drives a Vehicle<\/h3>/, '<h3>Le poisson qui conduit un véhicule</h3>');
frHub = frHub.replace(/<p>Researchers put a goldfish inside a robotic tank and let it steer across dry land\. Drive the experimental rover!<\/p>/,
  '<p>Des chercheurs ont placé un poisson rouge dans un réservoir robotisé et l’ont laissé rouler sur la terre ferme. Pilote le rover expérimental !</p>');

frHub = frHub.replace(/alt="Living dinosaur birds"/, 'alt="Oiseaux dinosaures vivants"');
frHub = frHub.replace(/<h3>Birds Are Living Dinosaurs<\/h3>/, '<h3>Les oiseaux sont des dinosaures vivants</h3>');
frHub = frHub.replace(/<p>Every pigeon and sparrow is an authentic theropod dinosaur\. Trace sixty-six million years of anatomical evolution in 3D\.<\/p>/,
  '<p>Chaque pigeon et chaque moineau est un véritable dinosaure théropode. Retrace 66 millions d’années d’évolution anatomique en 3D.</p>');

frHub = frHub.replace(/alt="Bio-hybrid fungal mycelium robot"/, 'alt="Robot biohybride à mycélium de champignon"');
frHub = frHub.replace(/<h3>The Fungus Wired to a Robot<\/h3>/, '<h3>Le champignon relié à un robot</h3>');
frHub = frHub.replace(/<p>Bio-hybrid robotics in action: living fungal mycelium electrical impulses steer a walking star-shaped robot\.<\/p>/,
  '<p>La robotique biohybride en action : les impulsions électriques d’un mycélium de champignon vivant dirigent un robot marcheur.</p>');

frHub = frHub.replace(/alt="Bionic knee with neural control"/, 'alt="Genou bionique à contrôle neural"');
frHub = frHub.replace(/<h3>The Bionic Knee<\/h3>/, '<h3>Le genou bionique</h3>');
frHub = frHub.replace(/<p>A breakthrough neural prosthetic: muscle reinnervation allows amputees to walk with natural reflex control\.<\/p>/,
  '<p>Une prothèse neurale révolutionnaire : la réinnervation musculaire permet aux personnes amputées de marcher avec un contrôle réflexe naturel.</p>');

frHub = frHub.replace(/alt="First photograph of a supermassive black hole"/, 'alt="Première image d\'un trou noir supermassif"');
frHub = frHub.replace(/<h3>How a Black Hole Image Was Born<\/h3>/, '<h3>Comment est née l’image d’un trou noir</h3>');
frHub = frHub.replace(/<p>Eight radio observatories synchronized across planet Earth created the historic portrait of supermassive black hole M87\*\.<\/p>/,
  '<p>Huit radiotélescopes synchronisés à travers toute la Terre ont créé le portrait historique du trou noir supermassif M87*.</p>');

// How to explore section
frHub = frHub.replace(/<h3>How to explore the simulations<\/h3>/, '<h3>Comment explorer les simulations</h3>');
frHub = frHub.replace(/Rotate the scene/, 'Fais pivoter la scène');
frHub = frHub.replace(/Click and drag with your mouse, or swipe on touchscreen devices to spin 360° around every subject\./,
  'Clique et glisse avec ta souris, ou glisse avec le doigt sur écran tactile pour tourner à 360° autour de chaque sujet.');
frHub = frHub.replace(/Zoom into details/, 'Zoome sur les détails');
frHub = frHub.replace(/Use your mouse scroll wheel or pinch-to-zoom on mobile to observe microscopic and cosmic scales\./,
  'Utilise la molette de la souris ou pince l’écran sur mobile pour observer les détails microscopiques ou cosmiques.');
frHub = frHub.replace(/Interactive controls/, 'Commandes interactives');
frHub = frHub.replace(/Click buttons, toggle visibility layers, trigger animations, and read Otto's scientific annotations\./,
  'Clique sur les boutons, active ou désactive les couches, lance des animations et lis les explications scientifiques d’Otto.');

// Footer
frHub = frHub.replace(/Exclusive interactive bonus companion to the book/, 'Bonus interactif exclusif accompagnant le livre');
frHub = frHub.replace(/Illustrative 3D reconstructions for educational exploration · Peer-reviewed science records preserved in the source library\./,
  'Reconstitutions 3D pédagogiques pour l’exploration · Références scientifiques validées par les pairs disponibles dans la bibliothèque.');

fs.writeFileSync('assets/einstein/bonus/fr/animazioni/index.html', frHub, 'utf8');

// Build ES Hub
let esHub = enHub;
esHub = esHub.replace(/<html lang="en">/, '<html lang="es">');
esHub = esHub.replace(/<title>.*?<\/title>/, '<title>Simulaciones 3D Interactivas · Otto</title>');
esHub = esHub.replace(/content="Otto's 3D interactive scientific simulations for the book Einstein, You Missed This!"/, 'content="Simulaciones científicas 3D interactivas de Otto para el libro ¡Einstein, esta te la perdiste!"');
esHub = esHub.replace(/content="3D Animations & Science Simulations · Otto's Laboratory"/, 'content="Animaciones 3D y simulaciones científicas · El laboratorio de Otto"');
esHub = esHub.replace(/content="Explore science in 3D with Otto: humpback whales, giant DNA, bio-hybrid fungal robotics, and black holes."/, 'content="Explora la ciencia en 3D con Otto: ballenas jorobadas, ADN gigante, robótica biohíbrida con hongos y agujeros negros."');

// Navigation links
esHub = esHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio">Home<\/a>/, 'href="../../../?lang=es&pagina=inizio">Inicio</a>');
esHub = esHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus">Bonuses<\/a>/, 'href="../../../?lang=es&pagina=bonus">Los bonus</a>');
esHub = esHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti">Source Library<\/a>/, 'href="../../../?lang=es&pagina=fonti">Biblioteca de fuentes</a>');
esHub = esHub.replace(/href="\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio" class="brand"/, 'href="../../../?lang=es&pagina=inizio" class="brand"');

// Flag bar replacement
esHub = esHub.replace(flagRegex, renderFlagBar('es'));

// Hero & text content
esHub = esHub.replace(/<span>3D LAB<\/span> · DISCOVERY PORTAL/, '<span>LABORATORIO 3D</span> · PORTAL DE DESCUBRIMIENTOS');
esHub = esHub.replace(/<h1>THE 7 DISCOVERIES IN 3D<\/h1>/, '<h1>LOS 7 DESCUBRIMIENTOS EN 3D</h1>');
esHub = esHub.replace(/Step inside the science from the book\. Rotate, zoom, and interact with the 7 interactive scientific simulations created with Otto\./,
  'Entra de lleno en la ciencia del libro. Rota, haz zoom e interactúa con las 7 simulaciones científicas 3D creadas con Otto.');

esHub = esHub.replace(/✦ 7 Interactive 3D Simulations/, '✦ 7 simulaciones 3D interactivas');
esHub = esHub.replace(/✦ Fully Mobile-Ready/, '✦ 100 % adaptado a móviles');
esHub = esHub.replace(/✦ Open Source Scientific Models/, '✦ Modelos científicos abiertos');

// Cards replacement in ES
esHub = esHub.replace(/alt="Humpback whale bubble net"/, 'alt="Red de burbujas de las ballenas jorobadas"');
esHub = esHub.replace(/<h3>The Invisible Bubble Net<\/h3>/, '<h3>La red invisible de burbujas</h3>');
esHub = esHub.replace(/<p>Humpback whales craft circular nets of air bubbles to corral schools of fish\. Explore the hunting spiral in 3D\.<\/p>/,
  '<p>Las ballenas jorobadas crean redes circulares de burbujas para acorralar bancos de peces. Explora la espiral de caza en 3D.</p>');
esHub = esHub.replace(/>Launch 3D simulation →<\/a>/g, '>Lanzar simulación 3D →</a>');

esHub = esHub.replace(/alt="Fern with giant DNA"/, 'alt="Helecho con ADN gigante"');
esHub = esHub.replace(/<h3>The Fern with Giant DNA<\/h3>/, '<h3>El helecho con ADN gigante</h3>');
esHub = esHub.replace(/<p>A tiny fork fern holds the largest genome on Earth — fifty times more DNA than humans\. Unfold the giant double helix\.<\/p>/,
  '<p>Un diminuto helecho posee el genoma más grande de la Tierra: cincuenta veces más ADN que un ser humano. Despliega la doble hélice gigante.</p>');

esHub = esHub.replace(/alt="Fish driving a motorized vehicle"/, 'alt="Pez conduciendo un vehículo motorizado"');
esHub = esHub.replace(/<h3>The Fish That Drives a Vehicle<\/h3>/, '<h3>El pez que conduce un vehículo</h3>');
esHub = esHub.replace(/<p>Researchers put a goldfish inside a robotic tank and let it steer across dry land\. Drive the experimental rover!<\/p>/,
  '<p>Científicos pusieron un pez dentro de un tanque robótico y lo dejaron circular por tierra firme. ¡Maneja el rover experimental!</p>');

esHub = esHub.replace(/alt="Living dinosaur birds"/, 'alt="Aves dinosaurios vivos"');
esHub = esHub.replace(/<h3>Birds Are Living Dinosaurs<\/h3>/, '<h3>Las aves son dinosaurios vivos</h3>');
esHub = esHub.replace(/<p>Every pigeon and sparrow is an authentic theropod dinosaur\. Trace sixty-six million years of anatomical evolution in 3D\.<\/p>/,
  '<p>Cada paloma y cada gorrión es un auténtico dinosaurio terópodo. Recorre 66 millones de años de evolución anatómica en 3D.</p>');

esHub = esHub.replace(/alt="Bio-hybrid fungal mycelium robot"/, 'alt="Robot biohíbrido con micelio de hongo"');
esHub = esHub.replace(/<h3>The Fungus Wired to a Robot<\/h3>/, '<h3>El hongo conectado a un robot</h3>');
esHub = esHub.replace(/<p>Bio-hybrid robotics in action: living fungal mycelium electrical impulses steer a walking star-shaped robot\.<\/p>/,
  '<p>Robótica biohíbrida en acción: los impulsos eléctricos de un micelio vivo guían un robot andador con forma de estrella.</p>');

esHub = esHub.replace(/alt="Bionic knee with neural control"/, 'alt="Rodilla biónica con control neural"');
esHub = esHub.replace(/<h3>The Bionic Knee<\/h3>/, '<h3>La rodilla biónica</h3>');
esHub = esHub.replace(/<p>A breakthrough neural prosthetic: muscle reinnervation allows amputees to walk with natural reflex control\.<\/p>/,
  '<p>Una prótesis neural revolucionaria: la reinervación muscular permite caminar a personas amputadas con control reflejo natural.</p>');

esHub = esHub.replace(/alt="First photograph of a supermassive black hole"/, 'alt="Primera fotografía de un agujero negro supermasivo"');
esHub = esHub.replace(/<h3>How a Black Hole Image Was Born<\/h3>/, '<h3>Cómo nació la imagen de un agujero negro</h3>');
esHub = esHub.replace(/<p>Eight radio observatories synchronized across planet Earth created the historic portrait of supermassive black hole M87\*\.<\/p>/,
  '<p>Ocho observatorios de radio sincronizados por todo el planeta Tierra crearon el histórico retrato del agujero negro supermasivo M87*.</p>');

// How to explore section
esHub = esHub.replace(/<h3>How to explore the simulations<\/h3>/, '<h3>Cómo explorar las simulaciones</h3>');
esHub = esHub.replace(/Rotate the scene/, 'Gira la escena');
esHub = esHub.replace(/Click and drag with your mouse, or swipe on touchscreen devices to spin 360° around every subject\./,
  'Haz clic y arrastra con el ratón o desliza el dedo en pantallas táctiles para girar 360° alrededor de cada elemento.');
esHub = esHub.replace(/Zoom into details/, 'Haz zoom en los detalles');
esHub = esHub.replace(/Use your mouse scroll wheel or pinch-to-zoom on mobile to observe microscopic and cosmic scales\./,
  'Usa la rueda del ratón o pellizca la pantalla en móviles para observar a escala microscópica y cósmica.');
esHub = esHub.replace(/Interactive controls/, 'Controles interactivos');
esHub = esHub.replace(/Click buttons, toggle visibility layers, trigger animations, and read Otto's scientific annotations\./,
  'Haz clic en los botones, activa o desactiva capas, lanza animaciones y lee las explicaciones científicas de Otto.');

// Footer
esHub = esHub.replace(/Exclusive interactive bonus companion to the book/, 'Bonus interactivo exclusivo que acompaña al libro');
esHub = esHub.replace(/Illustrative 3D reconstructions for educational exploration · Peer-reviewed science records preserved in the source library\./,
  'Reconstrucciones 3D con fines educativos · Registros científicos evaluados por expertos disponibles en la biblioteca de fuentes.');

fs.writeFileSync('assets/einstein/bonus/es/animazioni/index.html', esHub, 'utf8');

// Update IT and EN hub flag bars
function updateFlagBarInFile(file, lang) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(flagRegex, renderFlagBar(lang));
  fs.writeFileSync(file, content, 'utf8');
}
updateFlagBarInFile('assets/einstein/bonus/it/animazioni/index.html', 'it');
updateFlagBarInFile('assets/einstein/bonus/en/animazioni/index.html', 'en');

console.log('✅ Generated FR and ES animazioni index.html and updated IT/EN flag bars!');
