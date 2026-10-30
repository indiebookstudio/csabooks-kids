const fs = require('fs');
const path = require('path');

// 1. EXECUTE HUB GENERATION
console.log('--- 1. Rebuilding 3D Animation Hubs (FR & ES) ---');
require('./rebuild_animazioni_hubs.js');

// 2. HELPER FUNCTIONS FOR SIMULATION BUILD
const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function buildSimFlagBar(dir, currentLang) {
  const langs = [
    { code: 'en', title: 'English', flag: UK_FLAG },
    { code: 'it', title: 'Italiano', flag: IT_FLAG },
    { code: 'fr', title: 'Français', flag: FR_FLAG },
    { code: 'es', title: 'Español', flag: ES_FLAG }
  ];
  return `<div class="locale-pill-bar" role="group" aria-label="Language selection">
${langs.map(l => {
  if (l.code === currentLang) {
    return `      <a class="locale-flag-item active" href="#" aria-current="true" title="${l.title}">
        ${l.flag}
        <span class="flag-code">${l.code.toUpperCase()}</span>
      </a>`;
  } else {
    return `      <a class="locale-flag-item " href="../../../${l.code}/animazioni/${dir}/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
        ${l.flag}
        <span class="flag-code">${l.code.toUpperCase()}</span>
      </a>`;
  }
}).join('\n')}
    </div>`;
}

// 3. TRANSLATE AND GENERATE ALL 7 SIMULATIONS
console.log('--- 2. Rebuilding 7 Simulations (FR & ES) ---');

const SIMS = [
  {
    dir: '01.Megattere',
    file: 'la_rete_invisibile_delle_megattere.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>La Rete Invisibile delle Megattere — Simulazione Scientifica Interattiva</title>':
        '<title>Le Filet de Bulles Invisible des Baleines à Bosse — Simulation Scientifique 3D</title>',
      'aria-label="Torna all’inizio"': 'aria-label="Retour à l\'accueil"',
      'aria-label="Navigazione principale"': 'aria-label="Navigation principale"',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      'aria-label="Simulazione 3D dell\'oceano con megattere e banco di pesci"':
        'aria-label="Simulation 3D de l\'océan avec baleines à bosse et banc de poissons"',
      'title="Scopri il banco di pesci"': 'title="Découvre le banc de poissons"',
      '<span>Tocca il banco di pesci!</span>': '<span>Touche le banc de poissons !</span>',
      '>Scoperta 05</span>': '>Découverte 05</span>',
      '>La balena e le bolle</span>': '>La baleine et les bulles</span>',
      '>La Rete Invisibile delle Megattere</h1>': '>Le Filet de Bulles Invisible des Baleines à Bosse</h1>',
      'aria-label="Controlli della simulazione"': 'aria-label="Commandes de la simulation"',
      'title="Torna alla galleria 3D"': 'title="Retour au laboratoire 3D"',
      '>Laboratorio 3D</span>': '>Laboratoire 3D</span>',
      'title="Torna alla Home"': 'title="Retour à l\'accueil"',
      'title="Esplora l\'oceano e trova i pesci"': 'title="Explore l\'océan et trouve les poissons"',
      '<span>Esplora</span>': '<span>Explorer</span>',
      'title="Crea una rete di bolle con tre tocchi"': 'title="Crée un filet de bulles en trois touches"',
      '<span>Prova tu</span>': '<span>Essaie toi-même</span>',
      'title="Guarda dall\'alto la forma della rete e il banco di pesci"': 'title="Regarde d\'en haut la forme du filet et le banc de poissons"',
      '<span>Dall\'alto</span>': '<span>Vue du dessus</span>',
      'title="Punto di vista subacqueo con la megattera"': 'title="Vue sous-marine avec la baleine"',
      '<span>Subacquea</span>': '<span>Sous l\'eau</span>',
      'title="Ruota attorno alla spirale di bolle"': 'title="Tourne autour de la spirale de bulles"',
      '<span>360°</span>': '<span>360°</span>',
      'title="Ascolta i suoni del mare e il canto delle megattere"': 'title="Écoute les sons de l\'océan et le chant des baleines"',
      '<span>Audio</span>': '<span>Son</span>',
      'title="Ripristina la vista iniziale della telecamera"': 'title="Réinitialise la vue de la caméra"',
      '<span>Reset</span>': '<span>Réinitialiser</span>',
      '<span>Inizia da capo</span>': '<span>Recommencer</span>',
      'Tre tocchi per creare la rete di bolle': 'Trois touches pour former le filet de bulles',
      '1 · Inizia la spirale': '1 · Commencer la spirale',
      '2 · Aggiungi bolle': '2 · Ajouter des bulles',
      '3 · Chiudi il cerchio': '3 · Fermer le cercle',
      'Fase 1 • Esplora l\'oceano': 'Phase 1 • Explore l\'océan',
      'Fase 2 • Costruisci la rete di bolle': 'Phase 2 • Construis le filet de bulles',
      'Fase 3 • Una barriera di bolle': 'Phase 3 • Une barrière de bulles',
      'Fase 4 • L\'attacco della megattera': 'Phase 4 • L\'attaque de la baleine',
      'Guarda il mare e tocca il banco di pesci': 'Regarde l\'océan et touche le banc de poissons',
      'Le megattere soffiano una colonna di bolle': 'Les baleines soufflent une spirale de bulles',
      'I pesci restano intrappolati all\'interno': 'Les poissons restent piégés à l\'intérieur',
      'La megattera risale a bocca aperta': 'La baleine remonte la gueule grande ouverte',
      'Riprova!': 'Recommencer !',
      'Guarda dall\'alto': 'Vue du dessus',
      'Vista laterale': 'Vue de côté',
      'Una rete d\'aria su misura!': 'Un filet d\'air sur mesure !',
      'Come fanno le balene a radunare centinaia di pesci in un solo boccone?':
        'Comment les baleines rassemblent-elles des centaines de poissons en une seule bouchée ? Certaines baleines à bosse soufflent des bulles en cercles ou en spirales autour de leurs proies. Observées en Alaska, elles ajustent même le diamètre des anneaux pour créer un piège parfait !',
      'Non una parete solida!': 'Pas un mur solide !',
      'I video con <strong>droni</strong> e sensori non invasivi mostrano che la rete di bolle non è una barriera fisica solida:':
        'Les vidéos capturées par <strong>drones</strong> et capteurs temporaires montrent que le filet de bulles n\'est pas un mur solide : le mouvement montant et le grondement sonore désorientent les poissons, les incitant à se regrouper au centre.',
      'Da sole o in gruppo?': 'Seule ou en groupe ?',
      'Non tutte le megattere usano questa tecnica e non sempre allo stesso modo.':
        'Toutes les baleines à bosse n\'utilisent pas cette technique de la même manière. Certaines chassent en solitaire en créant une spirale, tandis qu\'ailleurs plusieurs baleines se coordonnent ensemble !',
      'Che cosa mangiano e quanto?': 'Que mangent-elles et en quelle quantité ?',
      'Piccoli pesci di banco:': 'Petits poissons de banc :',
      'Fino a 1.000–1.500 kg al giorno': 'Jusqu\'à 1 000–1 500 kg de nourriture par jour',
      'Entra nella simulazione!': 'Plonge dans la simulation !'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>La Rete Invisibile delle Megattere — Simulazione Scientifica Interattiva</title>':
        '<title>La Red Invisible de Burbujas de las Ballenas Jorobadas — Simulación Científica 3D</title>',
      'aria-label="Torna all’inizio"': 'aria-label="Volver al inicio"',
      'aria-label="Navigazione principale"': 'aria-label="Navegación principal"',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      'aria-label="Simulazione 3D dell\'oceano con megattere e banco di pesci"':
        'aria-label="Simulación 3D del océano con ballenas jorobadas y un banco de peces"',
      'title="Scopri il banco di pesci"': 'title="Descubre el banco de peces"',
      '<span>Tocca il banco di pesci!</span>': '<span>¡Toca el banco de peces!</span>',
      '>Scoperta 05</span>': '>Descubrimiento 05</span>',
      '>La balena e le bolle</span>': '>La ballena y las burbujas</span>',
      '>La Rete Invisibile delle Megattere</h1>': '>La Red Invisible de Burbujas de las Ballenas Jorobadas</h1>',
      'aria-label="Controlli della simulazione"': 'aria-label="Controles de la simulación"',
      'title="Torna alla galleria 3D"': 'title="Volver al laboratorio 3D"',
      '>Laboratorio 3D</span>': '>Laboratorio 3D</span>',
      'title="Torna alla Home"': 'title="Volver al inicio"',
      'title="Esplora l\'oceano e trova i pesci"': 'title="Explora el océano y encuentra los peces"',
      '<span>Esplora</span>': '<span>Explorar</span>',
      'title="Crea una rete di bolle con tre tocchi"': 'title="Crea una red de burbujas en tres toques"',
      '<span>Prova tu</span>': '<span>Pruébalo tú</span>',
      'title="Guarda dall\'alto la forma della rete e il banco di pesci"': 'title="Mira desde arriba la forma de la red y el banco de peces"',
      '<span>Dall\'alto</span>': '<span>Vista superior</span>',
      'title="Punto di vista subacqueo con la megattera"': 'title="Vista submarina con la ballena"',
      '<span>Subacquea</span>': '<span>Bajo el agua</span>',
      'title="Ruota attorno alla spirale di bolle"': 'title="Gira alrededor de la espiral de burbujas"',
      '<span>360°</span>': '<span>360°</span>',
      'title="Ascolta i suoni del mare e il canto delle megattere"': 'title="Escucha los sonidos del océano y el canto de las ballenas"',
      '<span>Audio</span>': '<span>Sonido</span>',
      'title="Ripristina la vista iniziale della telecamera"': 'title="Restablece la vista de la cámara"',
      '<span>Reset</span>': '<span>Reiniciar</span>',
      '<span>Inizia da capo</span>': '<span>Empezar de nuevo</span>',
      'Tre tocchi per creare la rete di bolle': 'Tres toques para crear la red de burbujas',
      '1 · Inizia la spirale': '1 · Iniciar espiral',
      '2 · Aggiungi bolle': '2 · Añadir burbujas',
      '3 · Chiudi il cerchio': '3 · Cerrar círculo',
      'Fase 1 • Esplora l\'oceano': 'Fase 1 • Explora el océano',
      'Fase 2 • Costruisci la rete di bolle': 'Fase 2 • Construye la red de burbujas',
      'Fase 3 • Una barriera di bolle': 'Fase 3 • Una barrera de burbujas',
      'Fase 4 • L\'attacco della megattera': 'Fase 4 • El ataque de la ballena',
      'Guarda il mare e tocca il banco di pesci': 'Mira el océano y toca el banco de peces',
      'Le megattere soffiano una colonna di bolle': 'Las ballenas soplan una espiral de burbujas',
      'I pesci restano intrappolati all\'interno': 'Los peces quedan atrapados en el interior',
      'La megattera risale a bocca aperta': 'La ballena asciende con la boca abierta',
      'Riprova!': '¡Reintentar!',
      'Guarda dall\'alto': 'Vista superior',
      'Vista laterale': 'Vista lateral',
      'Una rete d\'aria su misura!': '¡Una red de aire a medida!',
      'Come fanno le balene a radunare centinaia di pesci in un solo boccone?':
        '¿Cómo reúnen las ballenas a cientos de peces de un solo bocado? Algunas ballenas jorobadas soplan burbujas en círculos o espirales alrededor de sus presas. ¡Observadas en Alaska, incluso ajustan el diámetro para crear una trampa perfecta!',
      'Non una parete solida!': '¡No es una pared sólida!',
      'I video con <strong>droni</strong> e sensori non invasivi mostrano che la rete di bolle non è una barriera fisica solida:':
        'Los vídeos de <strong>drones</strong> y sensores muestran que la red de burbujas no es una pared sólida: el movimiento ascendente y el sonido desorientan a los peces, empujándolos a agruparse en el centro.',
      'Da sole o in gruppo?': '¿Solas o en grupo?',
      'Non tutte le megattere usano questa tecnica e non sempre allo stesso modo.':
        'No todas las ballenas jorobadas usan esta técnica de la misma manera. Algunas cazan en solitario creando una espiral, mientras que en otros lugares varias ballenas se coordinan en equipo.',
      'Che cosa mangiano e quanto?': '¿Qué comen y en qué cantidad?',
      'Piccoli pesci di banco:': 'Pequeños peces de banco:',
      'Fino a 1.000–1.500 kg al giorno': 'Hasta 1.000–1.500 kg de comida al día',
      'Entra nella simulazione!': '¡Entra en la simulación!'
    }
  },
  {
    dir: '02.Felce.DNA',
    file: 'la_felce_con_un_dna_gigantesco.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>La Felce con un DNA Gigantesco — Esperienza 3D Interattiva</title>':
        '<title>La Fougère au Génome Géant — Simulation Scientifique 3D</title>',
      'aria-label="Torna all’inizio"': 'aria-label="Retour à l\'accueil"',
      'aria-label="Navigazione principale"': 'aria-label="Navigation principale"',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 13</span>': '>Découverte 13</span>',
      '>Piante & Piccoli Mondi</span>': '>Plantes et Mondes Invisibles</span>',
      '>La felce con un DNA gigantesco</h1>': '>La Fougère au Génome Géant</h1>',
      'aria-label="Controlli dell’esperienza"': 'aria-label="Commandes de l\'expérience"',
      '<span>Il Viaggio</span>': '<span>Le Voyage</span>',
      '<span>Dall\'alto</span>': '<span>Vue du dessus</span>',
      '<span>Frontale</span>': '<span>Vue de face</span>',
      'aria-label="Esplorazione tridimensionale della felce e del suo DNA"': 'aria-label="Exploration 3D de la fougère et de son ADN"',
      'NUOVA CALEDONIA · SOTTOBOSCO UMIDO': 'NOUVELLE-CALÉDONIE · SOUS-BOIS HUMIDE',
      '<span>Una felce minuscola</span>': '<span>Une minuscule fougère</span>',
      '<span>Scopri il suo segreto</span>': '<span>Découvre son secret</span>',
      'DNA di un solo nucleo srotolato': 'ADN d\'un seul noyau déroulé',
      '<span>Uomo</span>': '<span>Humain</span>',
      '<span>Questa felce</span>': '<span>Cette fougère</span>',
      'Quanto sarà lungo il DNA della felce?': 'Quelle sera la longueur de l\'ADN de la fougère ?',
      'Ricostruzione botanica 3D': 'Reconstitution botanique 3D',
      'In pausa · Premi ▶ per riprendere': 'En pause · Clique sur ▶ pour reprendre',
      '<p>Entriamo nel mondo microscopico della felce…</p>': '<p>Entrons dans le monde microscopique de la fougère…</p>',
      'LA FELCE': 'LA FOUGÈRE',
      'LA CELLULA': 'LA CELLULE',
      'IL DNA': 'L\'ADN',
      'IL CONFRONTO': 'LA COMPARAISON',
      'LA SCOPERTA': 'LA DÉCOUVERTE',
      'Piccola fuori. Gigantesca dentro.': 'Petite à l\'extérieur. Gigantesque à l\'intérieur.',
      'Questa felce nasconde un segreto sbalorditivo dentro le sue cellule.': 'Cette fougère cache un secret stupéfiant à l\'intérieur de ses cellules.',
      '<span>Esplora la felce</span>': '<span>Explorer la fougère</span>',
      '<span>Dal libro</span>': '<span>Notes du livre</span>',
      'Che cosa significa davvero avere più DNA?': 'Que signifie vraiment avoir plus d\'ADN ?',
      'È più intelligente': 'Elle est plus intelligente',
      'È più grande': 'Elle est plus grande',
      'Ha un record nella quantità di DNA': 'Elle détient un record de quantité d\'ADN',
      '160,45 miliardi di coppie di basi': '160,45 milliards de paires de bases',
      'Una scoperta del 2024': 'Une découverte de 2024',
      'Come hanno fatto a misurarlo?': 'Comment l\'ont-ils mesuré ?',
      'Da una cellula a oltre 100 metri': 'D\'une seule cellule à plus de 100 mètres',
      'Più DNA ≠ più intelligenza': 'Plus d\'ADN ≠ plus d\'intelligence',
      'Fonti della scoperta': 'Sources de la découverte',
      'Torna alla scoperta': 'Retour à la découverte'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>La Felce con un DNA Gigantesco — Esperienza 3D Interattiva</title>':
        '<title>El Helecho con un Genoma Gigante — Simulación Científica 3D</title>',
      'aria-label="Torna all’inizio"': 'aria-label="Volver al inicio"',
      'aria-label="Navigazione principale"': 'aria-label="Navegación principal"',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 13</span>': '>Descubrimiento 13</span>',
      '>Piante & Piccoli Mondi</span>': '>Plantas y Pequeños Mundos</span>',
      '>La felce con un DNA gigantesco</h1>': '>El Helecho con un Genoma Gigante</h1>',
      'aria-label="Controlli dell’esperienza"': 'aria-label="Controles de la experiencia"',
      '<span>Il Viaggio</span>': '<span>El Viaje</span>',
      '<span>Dall\'alto</span>': '<span>Vista superior</span>',
      '<span>Frontale</span>': '<span>Vista frontal</span>',
      'aria-label="Esplorazione tridimensionale della felce e del suo DNA"': 'aria-label="Exploración 3D del helecho y su ADN"',
      'NUOVA CALEDONIA · SOTTOBOSCO UMIDO': 'NUEVA CALEDONIA · SOTOBOSQUE HÚMEDO',
      '<span>Una felce minuscola</span>': '<span>Un helecho diminuto</span>',
      '<span>Scopri il suo segreto</span>': '<span>Descubre su secreto</span>',
      'DNA di un solo nucleo srotolato': 'ADN de un solo núcleo desenrollado',
      '<span>Uomo</span>': '<span>Humano</span>',
      '<span>Questa felce</span>': '<span>Este helecho</span>',
      'Quanto sarà lungo il DNA della felce?': '¿Cuánto medirá el ADN del helecho?',
      'Ricostruzione botanica 3D': 'Reconstrucción botánica 3D',
      'In pausa · Premi ▶ per riprendere': 'En pausa · Pulsa ▶ para reanudar',
      '<p>Entriamo nel mondo microscopico della felce…</p>': '<p>Entrando en el mundo microscópico del helecho…</p>',
      'LA FELCE': 'EL HELECHO',
      'LA CELLULA': 'LA CÉLULA',
      'IL DNA': 'EL ADN',
      'IL CONFRONTO': 'LA COMPARACIÓN',
      'LA SCOPERTA': 'EL DESCUBRIMIENTO',
      'Piccola fuori. Gigantesca dentro.': 'Pequeño por fuera. Gigantesco por dentro.',
      'Questa felce nasconde un segreto sbalorditivo dentro le sue cellule.': 'Este helecho esconde un secreto asombroso en sus células.',
      '<span>Esplora la felce</span>': '<span>Explorar el helecho</span>',
      '<span>Dal libro</span>': '<span>Notas del libro</span>',
      'Che cosa significa davvero avere più DNA?': '¿Qué significa realmente tener más ADN?',
      'È più intelligente': 'Es más inteligente',
      'È più grande': 'Es más grande',
      'Ha un record nella quantità di DNA': 'Tiene un récord en cantidad de ADN',
      '160,45 miliardi di coppie di basi': '160,45 mil millones de pares de bases',
      'Una scoperta del 2024': 'Un descubrimiento de 2024',
      'Come hanno fatto a misurarlo?': '¿Cómo lo midieron?',
      'Da una cellula a oltre 100 metri': 'De una sola célula a más de 100 metros',
      'Più DNA ≠ più intelligenza': 'Más ADN ≠ más inteligencia',
      'Fonti della scoperta': 'Fuentes del descubrimiento',
      'Torna alla scoperta': 'Volver al descubrimiento'
    }
  },
  {
    dir: '03.Pesce.Veicolo',
    file: 'il_pesce_che_muove_un_veicolo.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>Un pesce può muovere un veicolo? · Scoperta 15</title>':
        '<title>Un poisson peut-il conduire un véhicule ? · Découverte 15</title>',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 15</span>': '>Découverte 15</span>',
      '>Esperimenti Sorprendenti</span>': '>Expériences Surprenantes</span>',
      '>Un pesce può muovere un veicolo?</h1>': '>Un poisson peut-il conduire un véhicule ?</h1>',
      '<span>Il Viaggio</span>': '<span>Le Parcours</span>',
      '<span>Guida tu</span>': '<span>Pilote toi-même</span>',
      '<span>Guida robotica</span>': '<span>Pilotage robotique</span>',
      'IL PESCE': 'LE POISSON',
      'LA VASCA': 'L\'AQUARIUM',
      'LA TELECAMERA': 'LA CAMÉRA',
      'IL COMPUTER': 'L\'ORDINATEUR',
      'LE RUOTE': 'LES ROUES',
      'Chi guida davvero?': 'Qui pilote vraiment ?',
      'Come fa un pesce rosso a muoversi sulla terraferma?': 'Comment un poisson rouge parvient-il à se déplacer sur la terre ferme ?',
      'L\'apparato sperimentale': 'Le dispositif expérimental',
      'La telecamera dall\'alto': 'La caméra zénithale',
      'L\'algoritmo di movimento': 'L\'algorithme de mouvement',
      'La meta raggiunta!': 'La cible atteinte !'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>Un pesce può muovere un veicolo? · Scoperta 15</title>':
        '<title>¿Puede un pez mover un vehículo? · Descubrimiento 15</title>',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 15</span>': '>Descubrimiento 15</span>',
      '>Esperimenti Sorprendenti</span>': '>Experimentos Sorprendentes</span>',
      '>Un pesce può muovere un veicolo?</h1>': '>¿Puede un pez mover un vehículo?</h1>',
      '<span>Il Viaggio</span>': '<span>El Recorrido</span>',
      '<span>Guida tu</span>': '<span>Conduce tú</span>',
      '<span>Guida robotica</span>': '<span>Conducción robótica</span>',
      'IL PESCE': 'EL PEZ',
      'LA VASCA': 'EL TANQUE',
      'LA TELECAMERA': 'LA CÁMARA',
      'IL COMPUTER': 'EL ORDENADOR',
      'LE RUOTE': 'LAS RUEDAS',
      'Chi guida davvero?': '¿Quién conduce realmente?',
      'Come fa un pesce rosso a muoversi sulla terraferma?': '¿Cómo consigue un pez de colores moverse en tierra firme?',
      'L\'apparato sperimentale': 'El dispositivo experimental',
      'La telecamera dall\'alto': 'La cámara cenital',
      'L\'algoritmo di movimento': 'El algoritmo de movimiento',
      'La meta raggiunta!': '¡Objetivo alcanzado!'
    }
  },
  {
    dir: '04.Uccelli.Dinosauri',
    file: 'gli_uccelli_sono_dinosauri_vivi.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>Gli uccelli sono dinosauri vivi · Scoperta 22</title>':
        '<title>Les oiseaux sont des dinosaures vivants · Découverte 22</title>',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 22</span>': '>Découverte 22</span>',
      '>Dinosauri e DNA</span>': '>Dinosaures et ADN</span>',
      '>Un dinosauro nel pollaio</h1>': '>Un dinosaure dans le poulailler</h1>',
      'L\'UCCELLO': 'L\'OISEAU',
      'LO SCHELETRO': 'LE SQUELETTE',
      'LE PIUME': 'LES PLUMES',
      'L\'ALBERO': 'L\'ARBRE ÉVOLUTIF',
      'LA PARENTELA': 'LA PARENTÉ'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>Gli uccelli sono dinosauri vivi · Scoperta 22</title>':
        '<title>Las aves son dinosaurios vivos · Descubrimiento 22</title>',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 22</span>': '>Descubrimiento 22</span>',
      '>Dinosauri e DNA</span>': '>Dinosaurios y ADN</span>',
      '>Un dinosauro nel pollaio</h1>': '>Un dinosaurio en el gallinero</h1>',
      'L\'UCCELLO': 'EL AVE',
      'LO SCHELETRO': 'EL ESQUELETO',
      'LE PIUME': 'LAS PLUMAS',
      'L\'ALBERO': 'EL ÁRBOL EVOLUTIVO',
      'LA PARENTELA': 'EL PARENTESCO'
    }
  },
  {
    dir: '05.Fungo.Robot',
    file: 'il_fungo_collegato_a_un_robot.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>Il fungo collegato a un robot · Scoperta 36</title>':
        '<title>Le champignon connecté à un robot · Découverte 36</title>',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 36</span>': '>Découverte 36</span>',
      '>Laboratorio del Futuro</span>': '>Laboratoire du Futur</span>',
      '>Il fungo collegato a un robot</h1>': '>Le champignon connecté à un robot</h1>',
      'IL FUNGO': 'LE CHAMPIGNON',
      'IL MICELIO': 'LE MYCÉLIUM',
      'GLI ELETTRODI': 'LES ÉLECTRODES',
      'I SEGNALI': 'LES SIGNAUX',
      'IL ROBOT': 'LE ROBOT'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>Il fungo collegato a un robot · Scoperta 36</title>':
        '<title>El hongo conectado a un robot · Descubrimiento 36</title>',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 36</span>': '>Descubrimiento 36</span>',
      '>Laboratorio del Futuro</span>': '>Laboratorio del Futuro</span>',
      '>Il fungo collegato a un robot</h1>': '>El hongo conectado a un robot</h1>',
      'IL FUNGO': 'EL HONGO',
      'IL MICELIO': 'EL MICELIO',
      'GLI ELETTRODI': 'LOS ELECTRODOS',
      'I SEGNALI': 'LAS SEÑALES',
      'IL ROBOT': 'EL ROBOT'
    }
  },
  {
    dir: '06.Ginocchio.Bionico',
    file: 'il_ginocchio_bionico.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>Il ginocchio bionico · Scoperta 43</title>':
        '<title>Le genou bionique · Découverte 43</title>',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 43</span>': '>Découverte 43</span>',
      '>Corpo & Supertecnologie</span>': '>Corps et Super-Technologies</span>',
      '>Il ginocchio bionico</h1>': '>Le genou bionique</h1>',
      'LA PROTESI': 'LA PROTHÈSE',
      'I SENSORI': 'LES CAPTEURS',
      'I MUSCOLI': 'LES MUSCLES',
      'IL CONTROLLO': 'LE CONTRÔLE',
      'IL MOVIMENTO': 'LE MOUVEMENT'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>Il ginocchio bionico · Scoperta 43</title>':
        '<title>La rodilla biónica · Descubrimiento 43</title>',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 43</span>': '>Descubrimiento 43</span>',
      '>Corpo & Supertecnologie</span>': '>Cuerpo y Supertecnologías</span>',
      '>Il ginocchio bionico</h1>': '>La rodilla biónica</h1>',
      'LA PROTESI': 'LA PRÓTESIS',
      'I SENSORI': 'LOS SENSORES',
      'I MUSCOLI': 'LOS MÚSCULOS',
      'IL CONTROLLO': 'EL CONTROL',
      'IL MOVIMENTO': 'EL MOVIMIENTO'
    }
  },
  {
    dir: '07.Buco.Nero',
    file: 'come_nasce_l_immagine_di_un_buco_nero.html',
    transFR: {
      '<html lang="it">': '<html lang="fr">',
      '<title>Come nasce l’immagine di un buco nero · Scoperta 55</title>':
        '<title>Comment naît l’image d’un trou noir · Découverte 55</title>',
      '>Inizio</a>': '>Accueil</a>',
      '>I bonus</a>': '>Les bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratoire 3D</a>',
      '>Biblioteca fonti</a>': '>Sources</a>',
      '>Scoperta 55</span>': '>Découverte 55</span>',
      '>Spazio e Universo</span>': '>Espace et Univers</span>',
      '>Come nasce l’immagine di un buco nero</h1>': '>Comment naît l’image d’un trou noir</h1>',
      'LA DOMANDA': 'LA QUESTION',
      'LA RETE': 'LE RÉSEAU',
      'I DATI': 'LES DONNÉES',
      'L’IMMAGINE': 'L\'IMAGE',
      'LA SCOPERTA': 'LA DÉCOUVERTE'
    },
    transES: {
      '<html lang="it">': '<html lang="es">',
      '<title>Come nasce l’immagine di un buco nero · Scoperta 55</title>':
        '<title>Cómo nace la imagen de un agujero negro · Descubrimiento 55</title>',
      '>Inizio</a>': '>Inicio</a>',
      '>I bonus</a>': '>Los bonus</a>',
      '>Laboratorio 3D</a>': '>Laboratorio 3D</a>',
      '>Biblioteca fonti</a>': '>Fuentes</a>',
      '>Scoperta 55</span>': '>Descubrimiento 55</span>',
      '>Spazio e Universo</span>': '>Espacio y Universo</span>',
      '>Come nasce l’immagine di un buco nero</h1>': '>Cómo nace la imagen de un agujero negro</h1>',
      'LA DOMANDA': 'LA PREGUNTA',
      'LA RETE': 'LA RED',
      'I DATI': 'LOS DATOS',
      'L’IMMAGINE': 'LA IMAGEN',
      'LA SCOPERTA': 'EL DESCUBRIMIENTO'
    }
  }
];

// Helper to replace text based on a dictionary
function applyReplacements(content, dict) {
  let res = content;
  for (const [k, v] of Object.entries(dict)) {
    res = res.split(k).join(v);
  }
  return res;
}

// Process each simulation
SIMS.forEach(sim => {
  const itSourcePath = path.join('assets/einstein/bonus/it/animazioni', sim.dir, sim.file);
  if (!fs.existsSync(itSourcePath)) {
    console.error('Missing source:', itSourcePath);
    return;
  }
  const itContent = fs.readFileSync(itSourcePath, 'utf8');

  // French build
  let frContent = applyReplacements(itContent, sim.transFR);
  // Replace links from ?lang=it to ?lang=fr
  frContent = frContent.replace(/lang=it/g, 'lang=fr');
  // Flag bar
  const flagBarRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;
  frContent = frContent.replace(flagBarRegex, buildSimFlagBar(sim.dir, 'fr'));

  const frDir = path.join('assets/einstein/bonus/fr/animazioni', sim.dir);
  fs.mkdirSync(frDir, { recursive: true });
  fs.writeFileSync(path.join(frDir, sim.file), frContent, 'utf8');
  fs.writeFileSync(path.join(frDir, 'index.html'), frContent, 'utf8');
  console.log(`Generated FR simulation: ${sim.dir}`);

  // Spanish build
  let esContent = applyReplacements(itContent, sim.transES);
  // Replace links from ?lang=it to ?lang=es
  esContent = esContent.replace(/lang=it/g, 'lang=es');
  // Flag bar
  esContent = esContent.replace(flagBarRegex, buildSimFlagBar(sim.dir, 'es'));

  const esDir = path.join('assets/einstein/bonus/es/animazioni', sim.dir);
  fs.mkdirSync(esDir, { recursive: true });
  fs.writeFileSync(path.join(esDir, sim.file), esContent, 'utf8');
  fs.writeFileSync(path.join(esDir, 'index.html'), esContent, 'utf8');
  console.log(`Generated ES simulation: ${sim.dir}`);
});

// 4. FIX MUSEUM APP.JS (CHALLENGES & FEEDBACK)
console.log('--- 3. Fixing Museum Apps (FR & ES) ---');
require('./build_museo_apps.js');

// Post-process FR museum app.js to eliminate any remaining English challenge strings
let frMuseoApp = fs.readFileSync('assets/einstein/bonus/fr/museo/app.js', 'utf8');
frMuseoApp = frMuseoApp
  .replace(/Challenge 1 · Fact vs\. Hypothesis/g, 'Défi 1 · Fait contre hypothèse')
  .replace(/Challenge 2 · Fair Comparison/g, 'Défi 2 · Comparaison rigoureuse')
  .replace(/Challenge 3 · The Mechanical Chain/g, 'Défi 3 · La chaîne mécanique')
  .replace(/Challenge 4 · Reading the Evolutionary Tree/g, 'Défi 4 · Lire l’arbre évolutif')
  .replace(/Challenge 5 · Soft Robotics Simulator/g, 'Défi 5 · Simulateur de robotique biohybride')
  .replace(/Challenge 6 · Neural Pathways/g, 'Défi 6 · Voies neuromusculaires')
  .replace(/Challenge 7 · Event Horizon Array/g, 'Défi 7 · Réseau Event Horizon')
  .replace(/Correct reasoning! Now check the next clue\./g, 'Raisonnement exact ! Vérifie maintenant l’indice suivant.')
  .replace(/Correct! Next, choose the following step\./g, 'Exact ! Choisis ensuite l’étape suivante.')
  .replace(/Step complete!/g, 'Étape validée !')
  .replace(/Challenge completed!/g, 'Défi réussi !');
fs.writeFileSync('assets/einstein/bonus/fr/museo/app.js', frMuseoApp, 'utf8');

// Post-process ES museum app.js
let esMuseoApp = fs.readFileSync('assets/einstein/bonus/es/museo/app.js', 'utf8');
esMuseoApp = esMuseoApp
  .replace(/Challenge 1 · Fact vs\. Hypothesis/g, 'Desafío 1 · Hecho vs. hipótesis')
  .replace(/Challenge 2 · Fair Comparison/g, 'Desafío 2 · Comparación justa')
  .replace(/Challenge 3 · The Mechanical Chain/g, 'Desafío 3 · La cadena mecánica')
  .replace(/Challenge 4 · Reading the Evolutionary Tree/g, 'Desafío 4 · Leer el árbol evolutivo')
  .replace(/Challenge 5 · Soft Robotics Simulator/g, 'Desafío 5 · Simulador de robótica blanda')
  .replace(/Challenge 6 · Neural Pathways/g, 'Desafío 6 · Vías neuronales')
  .replace(/Challenge 7 · Event Horizon Array/g, 'Desafío 7 · Red Event Horizon')
  .replace(/Correct reasoning! Now check the next clue\./g, '¡Razonamiento correcto! Ahora comprueba la siguiente pista.')
  .replace(/Correct! Next, choose the following step\./g, '¡Correcto! A continuación, elige el siguiente paso.')
  .replace(/Step complete!/g, '¡Paso completado!')
  .replace(/Challenge completed!/g, '¡Desafío superado!');
fs.writeFileSync('assets/einstein/bonus/es/museo/app.js', esMuseoApp, 'utf8');
console.log('Museum apps post-processed.');

console.log('--- ALL MULTILINGUAL ASSETS REBUILT SUCCESSFULLY ---');
