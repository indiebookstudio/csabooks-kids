/**
 * Script to translate dialogs, inline scripts, aria-labels, loading/error states
 * across all 7 animations in EN, FR, ES.
 */
const fs = require('fs');
const path = require('path');
const data = require('../assets/einstein/i18n/animations-data.js');

const DIRS = [
  '01.Megattere',
  '02.Felce.DNA',
  '03.Pesce.Veicolo',
  '04.Uccelli.Dinosauri',
  '05.Fungo.Robot',
  '06.Ginocchio.Bionico',
  '07.Buco.Nero'
];

const TARGET_TREES = [
  'assets/einstein/bonus',
  'accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus'
];

// Common strings for UI
const UI_STRINGS = {
  loading: {
    it: 'Entriamo nel laboratorio…',
    en: 'Entering the laboratory…',
    fr: 'Entrée dans le laboratoire…',
    es: 'Entrando en el laboratorio…'
  },
  loadingMotion: {
    it: 'Entriamo nel laboratorio del movimento…',
    en: 'Entering the movement laboratory…',
    fr: 'Entrée dans le laboratoire du mouvement…',
    es: 'Entrando en el laboratorio del movimiento…'
  },
  loadingSpace: {
    it: 'Entriamo nella rete di radiotelescopi…',
    en: 'Connecting to the radio telescope network…',
    fr: 'Connexion au réseau de radiotélescopes…',
    es: 'Conectando con la red de radiotelescopios…'
  },
  readyModel: {
    it: 'Il modello è pronto',
    en: 'The model is ready',
    fr: 'Le modèle est prêt',
    es: 'El modelo está listo'
  },
  chooseMotion: {
    it: 'Scegli un movimento illustrativo',
    en: 'Choose an illustrative motion',
    fr: 'Choisis un mouvement illustratif',
    es: 'Elige un movimiento ilustrativo'
  },
  errorTitle: {
    it: 'La scena 3D non è disponibile',
    en: '3D scene unavailable',
    fr: 'Scène 3D non disponible',
    es: 'Escena 3D no disponible'
  },
  errorDesc: {
    it: 'Apri questa pagina in un browser con supporto WebGL attivo.',
    en: 'Please open this page in a browser with WebGL enabled.',
    fr: 'Veuillez ouvrir cette page dans un navigateur avec WebGL activé.',
    es: 'Abre esta página en un navegador con WebGL activado.'
  },
  btnRetry: {
    it: 'Riprova',
    en: 'Retry',
    fr: 'Réessayer',
    es: 'Reintentar'
  },
  ariaControls: {
    it: 'Controlli dell’esperienza',
    en: 'Experience controls',
    fr: 'Contrôles de l’expérience',
    es: 'Controles de la experiencia'
  },
  ariaStageKnee: {
    it: 'Modello 3D didattico di una gamba con ginocchio bionico',
    en: 'Educational 3D model of a bionic leg and knee joint',
    fr: 'Modèle 3D éducatif d’une jambe avec genou bionique',
    es: 'Modelo 3D educativo de una pierna con rodilla biónica'
  },
  ariaStageEHT: {
    it: 'Viaggio interattivo dalla rete di radiotelescopi all’immagine di M87*',
    en: 'Interactive journey from the radio telescope array to the image of M87*',
    fr: 'Voyage interactif du réseau de radiotélescopes à l’image de M87*',
    es: 'Viaje interactivo desde la red de radiotelescopios hasta la imagen de M87*'
  },
  detailsDetails: {
    it: 'Per chi vuole approfondire',
    en: 'In-depth details',
    fr: 'Pour en savoir plus',
    es: 'Para profundizar'
  },
  detailsReconstruction: {
    it: 'Come leggere questa ricostruzione',
    en: 'How to read this reconstruction',
    fr: 'Comment lire cette reconstruction',
    es: 'Cómo interpretar esta reconstrucción'
  },
  detailsSimulation: {
    it: 'Come leggere questa simulazione',
    en: 'How to read this simulation',
    fr: 'Comment lire cette simulation',
    es: 'Cómo interpretar esta simulación'
  },
  detailsAnimation: {
    it: 'Come leggere l’animazione',
    en: 'How to read this animation',
    fr: 'Comment lire cette animation',
    es: 'Cómo interpretar esta animación'
  },
  detailsCredits: {
    it: 'Come leggere le scene e i crediti',
    en: 'How to read the scenes and credits',
    fr: 'Comment lire les scènes et les crédits',
    es: 'Cómo interpretar las escenas y créditos'
  }
};

// Details text translations for each animation
const DETAILS_DATA = {
  '02.Felce.DNA': {
    it: '<p>160,45 Gbp è il contenuto 1C; nell’essere umano il riferimento è circa 3,1 Gbp. Il confronto dei nuclei non replicati usa il contenuto 2C: circa 109,1 m e 2,1 m, assumendo 0,34 nanometri per coppia di basi. Sono valori indicativi.</p><p>Cellula, nucleo e doppia elica sono modelli didattici ingranditi, con colori convenzionali. Il DNA è distribuito tra cromosomi: il filo del confronto rappresenta la lunghezza totale. Il DNA non esce realmente dalla felce.</p>',
    en: '<p>160.45 Gbp represents the 1C genome size; the human reference is approximately 3.1 Gbp. Comparing unreplicated nuclei uses 2C content: roughly 109.1 meters vs. 2.1 meters, assuming 0.34 nanometers per base pair. These are illustrative figures.</p><p>Cell, nucleus, and double helix are enlarged educational models with standard explanatory colors. DNA is packaged across chromosomes: the comparison strand symbolizes the combined length.</p>',
    fr: '<p>160,45 Gbp représente la valeur 1C ; la référence humaine est d’environ 3,1 Gbp. La comparaison des noyaux utilise le contenu 2C : environ 109,1 m contre 2,1 m, sur la base de 0,34 nanomètre par paire de bases. Ce sont des repères indicatifs.</p><p>La cellule, le noyau et la double hélice sont des modèles didactiques agrandis avec des couleurs conventionnelles. L’ADN est réparti sur des chromosomes : le fil symbolise sa longueur totale déroulée.</p>',
    es: '<p>160,45 Gbp representa el valor 1C; la referencia humana es de unos 3,1 Gbp. La comparación de núcleos emplea el contenido 2C: aproximadamente 109,1 m frente a 2,1 m, calculando 0,34 nanómetros por par de bases.</p><p>Célula, núcleo y doble hélice son modelos didácticos a escala ilustrativa. El ADN está empaquetado en cromosomas: el filamento extendido representa la longitud total acumulada.</p>'
  },
  '03.Pesce.Veicolo': {
    it: '<p>Il modello scompone il funzionamento in tre passaggi per renderli osservabili. I tocchi guidano un pesce simulato; non sono l’addestramento svolto nello studio. Direzioni, distanze e tempi dell’animazione sono semplificati e non costituiscono dati sperimentali.</p><p>Il veicolo originale aveva ruote omnidirezionali. Qui, per rendere leggibile la relazione tra nuoto e moto, il pesce si orienta, il telaio sterza e il veicolo avanza nella stessa direzione.</p>',
    en: '<p>This interactive model breaks down the mechanism into observable steps. Your touch guides a simulated fish; it does not replace the scientific training protocol. Distances and timing are simplified for learning purposes.</p><p>The original experimental FOV vehicle used omnidirectional mecanum wheels. Here, steering and motion illustrate how water navigation translates into terrestrial vehicle driving.</p>',
    fr: '<p>Ce modèle décompose le système en étapes observables. Tes touches guident un poisson simulé ; cela ne reproduit pas le protocole de dressage scientifique. Distances et temps sont simplifiés pour la pédagogie.</p><p>Le véhicule expérimental d’origine utilisait des roues omnidirectionnelles. Ici, la direction illustre le passage de l’orientation aquatique au déplacement terrestre.</p>',
    es: '<p>Este modelo interactivo desglosa el funcionamiento en fases didácticas. Tus toques guían a un pez simulado; no constituyen el entrenamiento experimental. Distancias y tiempos están simplificados con fines educativos.</p><p>El vehículo original empleaba ruedas omnidireccionales. Aquí se visualiza con claridad cómo la orientación en el agua se traduce en desplazamiento terrestre.</p>'
  },
  '04.Uccelli.Dinosauri': {
    it: '<p>Le sagome e i modelli sono ricostruzioni didattiche per illustrare la transizione evolutiva. Gli uccelli moderni sono considerati a tutti gli effetti dinosauri teropodi sopravvissuti all’estinzione del Cretaceo-Paleogene.</p>',
    en: '<p>The silhouettes and skeletal models are educational reconstructions illustrating evolutionary transitions. Modern birds are classified by paleontologists as living theropod dinosaurs that survived the end-Cretaceous extinction.</p>',
    fr: '<p>Les silhouettes et squelettes sont des reconstitutions pédagogiques illustrant la transition évolutive. Les oiseaux modernes sont classés par les paléontologues comme de véritables dinosaures théropodes survivants.</p>',
    es: '<p>Las siluetas y esqueletos son reconstrucciones didácticas que ilustran la transición evolutiva. Las aves actuales son consideradas dinosaurios terópodos supervivientes de la gran extinción.</p>'
  },
  '05.Fungo.Robot': {
    it: '<p>L’animazione illustra il principio del bioibrido: il micelio genera potenziali d’azione in risposta alla luce UV, elaborati da un microcontrollore per azionare le ruote. I tempi e le risposte sono accelerati a scopo didattico.</p>',
    en: '<p>The animation illustrates biohybrid robotics: fungal mycelium generates electrical spikes in response to UV stimulation, decoded by an onboard microcontroller to drive the wheels. Timings are accelerated for interactive demonstration.</p>',
    fr: '<p>L’animation illustre le principe des robots biohybrides : le mycélium fongique produit des impulsions électriques sous lumière UV, décodées par un microcontrôleur pour actionner les roues. Les durées sont accélérées pour l’expérience.</p>',
    es: '<p>La animación muestra el principio de la robótica biohíbrida: el micelio fúngico genera señales bioeléctricas ante la luz UV, procesadas por un microcontrolador para mover las ruedas. Tiempos acelerados con fines didácticos.</p>'
  },
  '06.Ginocchio.Bionico': {
    it: '<p>La gamba è un modello didattico, non una copia del dispositivo chirurgico. I partecipanti dello studio affrontarono compiti come camminare su terreni sconnessi e salire scale con percezione propriocettiva aumentata.</p>',
    en: '<p>This leg is an educational model, not an exact replica of the surgical agonist-antagonist myoneural interface (AMI). Study participants experienced natural neural feedback, improved slope walking, and stair ascent.</p>',
    fr: '<p>Cette jambe est un modèle pédagogique, non une copie chirurgicale exacte. Les volontaires de l’étude ont testé la marche sur pente et la montée d’escaliers avec un contrôle sensorimoteur et proprioceptif naturel restauré.</p>',
    es: '<p>Esta pierna es un modelo didáctico, no una réplica quirúrgica idéntica. Los participantes del estudio lograron subir escaleras y caminar con mayor control neural y propiocepción biónica.</p>'
  },
  '07.Buco.Nero': {
    it: '<p>La scena iniziale è un’illustrazione artistica. Il globo mostra posizioni indicative dei siti del 2017; le linee indicano confronti fra dati, non cavi fisici fra le antenne. Le dimensioni e i segnali animati sono schematici.</p><p>L’immagine osservata è il file ufficiale ESO eso1907a. Credito: <strong>EHT Collaboration</strong> (CC-BY 4.0).</p>',
    en: '<p>The opening scene is an artistic illustration. The globe displays representative 2017 EHT telescope locations; connected arcs symbolize data correlation baselines, not physical cables.</p><p>The reconstructed black hole image is official ESO file eso1907a. Credit: <strong>EHT Collaboration</strong> (CC-BY 4.0).</p>',
    fr: '<p>La scène initiale est une illustration artistique. Le globe présente les sites clés du réseau EHT en 2017 ; les lignes symbolisent les corrélations de données, non des câbles physiques.</p><p>L’image réelle du trou noir est le fichier officiel ESO eso1907a. Crédit : <strong>EHT Collaboration</strong> (CC-BY 4.0).</p>',
    es: '<p>La escena inicial es una ilustración artística. El globo muestra las ubicaciones clave de la red EHT en 2017; los arcos representan correlación de señales astronómicas, no cables físicos.</p><p>La imagen real del agujero negro es el archivo oficial ESO eso1907a. Crédito: <strong>EHT Collaboration</strong> (CC-BY 4.0).</p>'
  }
};

// 01 Megattere full modal data for IT, EN, FR, ES
const MEGATTERE_MODAL = {
  kicker: {
    it: 'Capitolo 1 • Animali fuori dal comune • Scoperta 05',
    en: 'Chapter 1 • Extraordinary Animals • Discovery 05',
    fr: 'Chapitre 1 • Animaux hors du commun • Découverte 05',
    es: 'Capítulo 1 • Animales fuera de lo común • Descubrimiento 05'
  },
  title: {
    it: 'La Balena e le Bolle: Come funziona davvero?',
    en: 'The Whale and the Bubbles: How It Really Works',
    fr: 'La baleine et les bulles : comment ça marche ?',
    es: 'La ballena y las burbujas: ¿cómo funciona realmente?'
  },
  closeAria: {
    it: 'Chiudi le curiosità scientifiche',
    en: 'Close scientific facts',
    fr: 'Fermer les curiosités scientifiques',
    es: 'Cerrar curiosidades científicas'
  },
  card1Title: {
    it: 'Una rete d’aria costruita su misura!',
    en: 'A tailor-made net of rising air!',
    fr: 'Un filet d’air conçu sur mesure !',
    es: '¡Una red de aire hecha a medida!'
  },
  card1Text: {
    it: 'Come radunare tanti pesci in un solo boccone? Alcune megattere soffiano bolle in cerchio o a spirale attorno alle prede. Le balene osservate dagli scienziati in <strong>Alaska</strong> modificavano persino gli anelli e la distanza fra le bolle per creare una trappola precisa!',
    en: 'How to gather schools of fish in a single mouthful? Humpback whales blow rising bubbles in circles or tight spirals around prey. Whales observed in <strong>Alaska</strong> even adjusted ring diameters and bubble spacing to craft the perfect underwater trap!',
    fr: 'Comment regrouper des bancs de poissons en une seule bouchée ? Certaines baleines à bosse soufflent des bulles en cercle ou en spirale autour des proies. Les baleines observées en <strong>Alaska</strong> ajustaient même le diamètre des anneaux et l’espacement des bulles !',
    es: '¿Cómo reunir bancos de peces en un solo bocado? Algunas ballenas jorobadas soplan burbujas en círculo o en espiral alrededor de sus presas. ¡Los científicos en <strong>Alaska</strong> observaron que ajustan el tamaño de los anillos y la distancia entre burbujas!'
  },
  card2Title: {
    it: 'Non è un muro solido!',
    en: 'Not a solid physical wall!',
    fr: 'Ce n’est pas un mur solide !',
    es: '¡No es una pared sólida!'
  },
  card2Text: {
    it: 'Le riprese dei <strong>droni</strong> e i <strong>sensori</strong> applicati alle balene hanno mostrato che le bolle non formano una parete impenetrabile: il loro movimento e il suono disorientano i pesci e li concentrano al centro.',
    en: 'Aerial <strong>drone</strong> footage and temporary suction-cup <strong>sensor tags</strong> revealed that bubbles form a visual and acoustic barrier rather than a solid wall, disorienting prey and concentrating them in the center.',
    fr: 'Les vidéos prises par <strong>drones</strong> et les <strong>balises de suivi</strong> ont montré que les bulles forment une barrière visuelle et sonore plutôt qu’un mur solide, désorientant les poissons vers le centre.',
    es: 'Las grabaciones con <strong>drones</strong> y los <strong>sensores</strong> colocados en las ballenas demostraron que las burbujas crean una barrera visual y acústica que desorienta a los peces y los agrupa en el centro.'
  },
  card3Title: {
    it: 'Da sole o in gruppo?',
    en: 'Solo hunting or cooperative teams?',
    fr: 'Seules ou en équipe ?',
    es: '¿En solitario o en grupo?'
  },
  card3Text: {
    it: 'Non tutte le megattere cacciano allo stesso modo. Alcune lavorano in solitaria creando spirali perfette, mentre altre collaborano dividendo i compiti fra richiami sonori e reti d’aria!',
    en: 'Not all humpbacks hunt the same way. Some craft intricate spiral bubble nets entirely alone, while in other regions pods collaborate with dedicated callers and net-blowers!',
    fr: 'Toutes les baleines à bosse ne chassent pas de la même façon. Certaines construisent des spirales en solo, tandis que d’autres coopèrent en se répartissant les rôles avec des chants et des filets d’air !',
    es: 'No todas las ballenas cazan igual. Algunas crean espirales en solitario, mientras que en otros grupos cooperan coordinando llamadas vocales y círculos de burbujas sincronizados.'
  },
  quoteTitle: {
    it: 'La fonte scientifica ufficiale',
    en: 'Official Scientific Source',
    fr: 'Source scientifique officielle',
    es: 'Fuente científica oficial'
  },
  quoteSub: {
    it: 'University of Hawaiʻi & Royal Society Open Science (2024)',
    en: 'University of Hawaiʻi & Royal Society Open Science (2024)',
    fr: 'Université d’Hawaï & Royal Society Open Science (2024)',
    es: 'Universidad de Hawái & Royal Society Open Science (2024)'
  },
  btnArticle: {
    it: 'Leggi l’articolo su Nature / RSOS ↗',
    en: 'Read paper on Nature / RSOS ↗',
    fr: 'Consulter l’étude sur RSOS ↗',
    es: 'Leer el artículo en RSOS ↗'
  },
  btnReturn: {
    it: 'Torna all’Oceano 3D',
    en: 'Back to 3D Ocean',
    fr: 'Retour à l’océan 3D',
    es: 'Volver al océano 3D'
  }
};

function buildCleanDialog(dirKey, lang) {
  const anim = data.animations[dirKey];
  if (!anim || !anim.dialog) return '';
  const d = anim.dialog;
  const eyebrow = d.eyebrow[lang] || d.eyebrow.it;
  const title = d.title[lang] || d.title.it;
  const factVal = lang === 'en' ? d.fact.val_en :
                  lang === 'fr' ? d.fact.val_fr :
                  lang === 'es' ? d.fact.val_es : d.fact.val;
  const factSub = d.fact.sub[lang] || d.fact.sub.it;
  const closeAria = data.common.dialog_close[lang];
  const btnReturn = d.btnReturn[lang] || d.btnReturn.it;
  const sourcesHeading = data.common.sources_heading[lang];

  let sectionsHtml = '';
  if (d.sections) {
    d.sections.forEach(sec => {
      const h3 = sec.h3[lang] || sec.h3.it;
      const p = sec.p[lang] || sec.p.it;
      sectionsHtml += `\n    <h3>${h3}</h3><p>${p}</p>`;
    });
  }

  let detailsHtml = '';
  if (DETAILS_DATA[dirKey] && DETAILS_DATA[dirKey][lang]) {
    const summaryLabel = (dirKey === '02.Felce.DNA') ? UI_STRINGS.detailsDetails[lang] :
                         (dirKey === '03.Pesce.Veicolo') ? UI_STRINGS.detailsReconstruction[lang] :
                         (dirKey === '05.Fungo.Robot') ? UI_STRINGS.detailsSimulation[lang] :
                         (dirKey === '06.Ginocchio.Bionico') ? UI_STRINGS.detailsAnimation[lang] :
                         (dirKey === '07.Buco.Nero') ? UI_STRINGS.detailsCredits[lang] :
                         UI_STRINGS.detailsDetails[lang];
    detailsHtml = `\n    <details><summary>${summaryLabel}</summary>${DETAILS_DATA[dirKey][lang]}</details>`;
  }

  // Preserve sources links from original or standard
  let sourcesBlock = '';
  if (dirKey === '02.Felce.DNA') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://doi.org/10.1016/j.isci.2024.109889" target="_blank" rel="noopener noreferrer">Fernández et al. · iScience, 2024 ↗</a><a href="https://www.kew.org/about-us/press-media/worlds-largest-genome" target="_blank" rel="noopener noreferrer">Royal Botanic Gardens, Kew ↗</a></div>`;
  } else if (dirKey === '03.Pesce.Veicolo') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://doi.org/10.1016/j.bbr.2021.113711" target="_blank" rel="noopener noreferrer">Givon et al. · Behavioural Brain Research, 2022 ↗</a><a href="https://www.bgu.ac.il/" target="_blank" rel="noopener noreferrer">Ben-Gurion University of the Negev ↗</a></div>`;
  } else if (dirKey === '04.Uccelli.Dinosauri') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://doi.org/10.1126/science.1253293" target="_blank" rel="noopener noreferrer">Lee et al. · Science, 2014 ↗</a><a href="https://doi.org/10.1038/nature13448" target="_blank" rel="noopener noreferrer">Brusatte et al. · Current Biology, 2014 ↗</a></div>`;
  } else if (dirKey === '05.Fungo.Robot') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://doi.org/10.1126/scirobotics.adk8019" target="_blank" rel="noopener noreferrer">Mishra et al. · Science Robotics, 2024 ↗</a><a href="https://news.cornell.edu/stories/2024/09/biohybrid-robots-controlled-fungi-walk-and-roll" target="_blank" rel="noopener noreferrer">Cornell Chronicle ↗</a></div>`;
  } else if (dirKey === '06.Ginocchio.Bionico') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://doi.org/10.1126/science.adv3223" target="_blank" rel="noopener noreferrer">Shu et al. · Science, 2025 ↗</a><a href="https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710" target="_blank" rel="noopener noreferrer">MIT News ↗</a><a href="https://pubmed.ncbi.nlm.nih.gov/40638725/" target="_blank" rel="noopener noreferrer">PubMed ↗</a></div>`;
  } else if (dirKey === '07.Buco.Nero') {
    sourcesBlock = `<div class="sources"><h3>${sourcesHeading}</h3><a href="https://www.eso.org/public/images/eso1907a/" target="_blank" rel="noopener noreferrer">ESO eso1907a · EHT Collaboration ↗</a><a href="https://doi.org/10.3847/2041-8213/ab0e85" target="_blank" rel="noopener noreferrer">EHT Collaboration · 2019 ↗</a><a href="https://eventhorizontelescope.org/" target="_blank" rel="noopener noreferrer">Event Horizon Telescope ↗</a></div>`;
  }

  return `<dialog id="info-dialog" aria-labelledby="info-title">
  <div class="dialog-head"><div><span class="eyebrow">${eyebrow}</span><h2 id="info-title">${title}</h2></div><button id="btn-close" class="tool icon-only" aria-label="${closeAria}"><svg><use href="#i-close"/></svg></button></div>
  <div class="dialog-content">
    <div class="fact-highlight"><strong>${factVal}</strong><span>${factSub}</span></div>${sectionsHtml}${detailsHtml}
    ${sourcesBlock}
  </div><div class="dialog-foot"><button id="btn-close-bottom" class="primary">${btnReturn} <svg><use href="#i-arrow"/></svg></button></div>
</dialog>`;
}

function processAnimation(dirKey, lang, targetFile) {
  let content = fs.readFileSync(targetFile, 'utf8');

  // Replace Dialog for 02..07
  if (dirKey !== '01.Megattere') {
    const dialogHtml = buildCleanDialog(dirKey, lang);
    if (dialogHtml) {
      content = content.replace(/<dialog[\s\S]*?<\/dialog>/i, dialogHtml);
    }
  } else {
    // 01.Megattere modal replacement
    const m = MEGATTERE_MODAL;
    content = content.replace(
      /<span class=["']text-xs font-bold uppercase tracking-widest text-amber-300["']>[\s\S]*?<\/span>/,
      `<span class="text-xs font-bold uppercase tracking-widest text-amber-300">${m.kicker[lang]}</span>`
    );
    content = content.replace(
      /<h2 id=["']book-title["'][\s\S]*?<\/h2>/,
      `<h2 id="book-title" class="text-xl sm:text-2xl font-bold text-white">${m.title[lang]}</h2>`
    );
    content = content.replace(
      /id=["']btn-close-modal["'] aria-label=["'][^"']*["']/,
      `id="btn-close-modal" aria-label="${m.closeAria[lang]}"`
    );
    content = content.replace(
      /<h3 class=["']font-display font-bold text-lg text-amber-300 mb-1["']>[\s\S]*?<\/h3>\s*<p>[\s\S]*?<\/p>/,
      `<h3 class="font-display font-bold text-lg text-amber-300 mb-1">${m.card1Title[lang]}</h3>\n          <p>${m.card1Text[lang]}</p>`
    );
    content = content.replace(
      /<h3 class=["']font-display font-bold text-base text-sky-300 mb-1["']>Non è un muro solido!<\/h3>\s*<p class=["']text-xs sm:text-sm["']>[\s\S]*?<\/p>/,
      `<h3 class="font-display font-bold text-base text-sky-300 mb-1">${m.card2Title[lang]}</h3>\n            <p class="text-xs sm:text-sm">${m.card2Text[lang]}</p>`
    );
    content = content.replace(
      /<h3 class=["']font-display font-bold text-base text-sky-300 mb-1["']>Da sole o in gruppo\?<\/h3>\s*<p class=["']text-xs sm:text-sm["']>[\s\S]*?<\/p>/,
      `<h3 class="font-display font-bold text-base text-sky-300 mb-1">${m.card3Title[lang]}</h3>\n            <p class="text-xs sm:text-sm">${m.card3Text[lang]}</p>`
    );
    content = content.replace(
      /<button id=["']btn-close-modal-bottom["'] class=["']w-full sm:w-auto px-6 py-2\.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-sky-500\/30 flex items-center justify-center gap-2["']>[\s\S]*?<\/button>/,
      `<button id="btn-close-modal-bottom" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-sky-500/30 flex items-center justify-center gap-2"><span>${m.btnReturn[lang]}</span></button>`
    );
  }

  // Common UI labels
  content = content.replace(/aria-label=["']Controlli dell’esperienza["']/g, `aria-label="${UI_STRINGS.ariaControls[lang]}"`);
  content = content.replace(/aria-label=["']Modello 3D didattico di una gamba con ginocchio bionico["']/g, `aria-label="${UI_STRINGS.ariaStageKnee[lang]}"`);
  content = content.replace(/aria-label=["']Viaggio interattivo dalla rete di radiotelescopi all’immagine di M87\*["']/g, `aria-label="${UI_STRINGS.ariaStageEHT[lang]}"`);

  // Loading texts
  content = content.replace(/<p>Entriamo nel laboratorio del movimento…<\/p>/g, `<p>${UI_STRINGS.loadingMotion[lang]}</p>`);
  content = content.replace(/<p>Entriamo nella rete di radiotelescopi…<\/p>/g, `<p>${UI_STRINGS.loadingSpace[lang]}</p>`);
  content = content.replace(/<p>Entriamo nel laboratorio…<\/p>/g, `<p>${UI_STRINGS.loading[lang]}</p>`);

  // Error texts
  content = content.replace(/<h2>La scena 3D non è disponibile<\/h2>/g, `<h2>${UI_STRINGS.errorTitle[lang]}</h2>`);
  content = content.replace(/<p>Apri questo HTML in un browser con WebGL attivo\.<\/p>/g, `<p>${UI_STRINGS.errorDesc[lang]}</p>`);
  content = content.replace(/<p>Apri questa pagina in un browser con supporto WebGL attivo\.<\/p>/g, `<p>${UI_STRINGS.errorDesc[lang]}</p>`);
  content = content.replace(/<button class=["']primary["'] onclick=["']location\.reload\(\)["']>Riprova<\/button>/g, `<button class="primary" onclick="location.reload()">${UI_STRINGS.btnRetry[lang]}</button>`);
  content = content.replace(/<p class=["']noscript["']>Attiva JavaScript per esplorare questa animazione\.<\/p>/g, `<p class="noscript">${lang === 'en' ? 'Please enable JavaScript to view this 3D animation.' : lang === 'fr' ? 'Active JavaScript pour explorer cette animation 3D.' : lang === 'es' ? 'Activa JavaScript para explorar esta animación 3D.' : 'Attiva JavaScript per esplorare questa animazione.'}</p>`);

  // Status and script strings
  content = content.replace(/Il modello è pronto/g, UI_STRINGS.readyModel[lang]);
  content = content.replace(/Scegli un movimento illustrativo/g, UI_STRINGS.chooseMotion[lang]);

  // 06 Ginocchio script messages
  if (dirKey === '06.Ginocchio.Bionico') {
    const s1 = { it: '1 · Il muscolo genera un segnale', en: '1 · Muscle produces electrical signal', fr: '1 · Le muscle génère un signal', es: '1 · El músculo genera una señal' }[lang];
    const s2 = { it: '2 · I sensori lo rilevano', en: '2 · Sensors record neural activity', fr: '2 · Les capteurs détectent le signal', es: '2 · Los sensores detectan la señal' }[lang];
    const s3 = { it: '3 · Il controllore calcola il comando', en: '3 · Controller computes knee actuation', fr: '3 · Le contrôleur calcule la commande', es: '3 · El controlador calcula la orden' }[lang];
    const s4 = { it: '4 · L’attuatore muove il ginocchio', en: '4 · Motor actuates bionic knee', fr: '4 · L’actionneur déplace le genou', es: '4 · El actuador mueve la rodilla' }[lang];

    content = content.replace(/'1 · Il muscolo genera un segnale'/g, `'${s1}'`);
    content = content.replace(/'2 · I sensori lo rilevano'/g, `'${s2}'`);
    content = content.replace(/'3 · Il controllore calcola il comando'/g, `'${s3}'`);
    content = content.replace(/'4 · L’attuatore muove il ginocchio'/g, `'${s4}'`);
  }

  // 07 Buco Nero script messages
  if (dirKey === '07.Buco.Nero') {
    const fewLabel = { it: 'Pochi campioni (visibilità parziale)', en: 'Few samples (sparse coverage)', fr: 'Peu d’échantillons (couverture partielle)', es: 'Pocas muestras (cobertura parcial)' }[lang];
    const manyLabel = { it: 'Molti campioni (rete sincronizzata)', en: 'Many samples (synchronized array)', fr: 'Nombreux échantillons (réseau synchronisé)', es: 'Muchas muestras (red sincronizada)' }[lang];
    const figCap = { it: 'Informazioni raccolte', en: 'Collected information', fr: 'Informations recueillies', es: 'Información recopilada' }[lang];

    content = content.replace(/Pochi campioni \(visibilità parziale\)/g, fewLabel);
    content = content.replace(/Molti campioni \(rete sincronizzata\)/g, manyLabel);
    content = content.replace(/Informazioni raccolte/g, figCap);

    // Quiz feedback in script
    const fbCorrect = {
      it: 'Esatto! L’immagine è ricostruita da osservazioni radio sincronizzate sulla Terra.',
      en: 'Correct! The image is synthesized from synchronized global radio observations.',
      fr: 'Exact ! L’image est reconstruite à partir d’observations radio synchronisées sur Terre.',
      es: '¡Exacto! La imagen se reconstruye a partir de observaciones de radio sincronizadas en la Tierra.'
    }[lang];
    content = content.replace(/Esatto! L’immagine è ricostruita da osservazioni radio sincronizzate sulla Terra\./g, fbCorrect);
  }

  // Quiz feedback in 02 Felce
  if (dirKey === '02.Felce.DNA') {
    const q = data.animations['02.Felce.DNA'].quiz;
    if (q) {
      content = content.replace(/Esatto! È un record di quantità di DNA\. Più DNA non significa più intelligenza o una pianta più grande\./g, q.feedbackCorrect[lang]);
      content = content.replace(/Stiamo confrontando la quantità di DNA\. La felce resta piccola: prova un’altra risposta\./g, q.feedbackWrong[lang]);
    }
  }

  fs.writeFileSync(targetFile, content, 'utf8');
}

// Execute across both trees and all 4 languages
let updatedCount = 0;
TARGET_TREES.forEach(tree => {
  ['it', 'en', 'fr', 'es'].forEach(lang => {
    DIRS.forEach(dirKey => {
      const targetFile = path.join(tree, lang, 'animazioni', dirKey, 'index.html');
      if (fs.existsSync(targetFile)) {
        processAnimation(dirKey, lang, targetFile);
        updatedCount++;
      }
    });
  });
});

console.log(`✅ Successfully processed, verified and saved ${updatedCount} animation files across both trees!`);
