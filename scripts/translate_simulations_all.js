const fs = require('fs');
const path = require('path');

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

// Common nav replacements for FR & ES
function getCommonReplacements(lang) {
  if (lang === 'fr') {
    return [
      ['<html lang="it">', '<html lang="fr">'],
      ['aria-label="Torna all’inizio"', 'aria-label="Retour à l\'accueil"'],
      ['aria-label="Navigazione principale"', 'aria-label="Navigation principale"'],
      ['>Inizio</a>', '>Accueil</a>'],
      ['>I bonus</a>', '>Les bonus</a>'],
      ['>Laboratorio 3D</a>', '>Laboratoire 3D</a>'],
      ['>Biblioteca fonti</a>', '>Sources</a>'],
      ['title="Torna alla galleria 3D"', 'title="Retour au laboratoire 3D"'],
      ['>Laboratorio 3D</span>', '>Laboratoire 3D</span>'],
      ['title="Torna alla Home"', 'title="Retour à l\'accueil"'],
      ['title="Torna all’inizio"', 'title="Retour à l\'accueil"'],
      ['>Home ✦</span>', '>Accueil ✦</span>'],
      ['aria-label="Pause"', 'aria-label="Mettre en pause"'],
      ['aria-label="Metti in pausa"', 'aria-label="Mettre en pause"'],
      ['aria-label="Riprendi"', 'aria-label="Reprendre"'],
      ['aria-label="Attiva i suoni"', 'aria-label="Activer les sons"'],
      ['aria-label="Disattiva i suoni"', 'aria-label="Couper les sons"'],
      ['In viaggio', 'En cours de voyage'],
      ['Il viaggio', 'Le Voyage'],
      ['Torna alla scoperta', 'Retour à la découverte'],
      ['Fonti della scoperta', 'Sources de la découverte'],
      ['Dal libro', 'Notes du livre'],
      ['aria-label="Apri approfondimenti e fonti del libro"', 'aria-label="Ouvrir les notes scientifiques et les sources du livre"'],
      ['In pausa · Premi ▶ per riprendere', 'En pause · Clique sur ▶ pour reprendre']
    ];
  } else {
    return [
      ['<html lang="it">', '<html lang="es">'],
      ['aria-label="Torna all’inizio"', 'aria-label="Volver al inicio"'],
      ['aria-label="Navigazione principale"', 'aria-label="Navegación principal"'],
      ['>Inizio</a>', '>Inicio</a>'],
      ['>I bonus</a>', '>Los bonus</a>'],
      ['>Laboratorio 3D</a>', '>Laboratorio 3D</a>'],
      ['>Biblioteca fonti</a>', '>Fuentes</a>'],
      ['title="Torna alla galleria 3D"', 'title="Volver al laboratorio 3D"'],
      ['>Laboratorio 3D</span>', '>Laboratorio 3D</span>'],
      ['title="Torna alla Home"', 'title="Volver al inicio"'],
      ['title="Torna all’inizio"', 'title="Volver al inicio"'],
      ['>Home ✦</span>', '>Inicio ✦</span>'],
      ['aria-label="Pause"', 'aria-label="Pausar"'],
      ['aria-label="Metti in pausa"', 'aria-label="Pausar"'],
      ['aria-label="Riprendi"', 'aria-label="Reanudar"'],
      ['aria-label="Attiva i suoni"', 'aria-label="Activar sonido"'],
      ['aria-label="Disattiva i suoni"', 'aria-label="Silenciar sonido"'],
      ['In viaggio', 'En viaje'],
      ['Il viaggio', 'El Viaje'],
      ['Torna alla scoperta', 'Volver al descubrimiento'],
      ['Fonti della scoperta', 'Fuentes del descubrimiento'],
      ['Dal libro', 'Notas del libro'],
      ['aria-label="Apri approfondimenti e fonti del libro"', 'aria-label="Abrir notas científicas y fuentes del libro"'],
      ['In pausa · Premi ▶ per riprendere', 'En pausa · Pulsa ▶ para reanudar']
    ];
  }
}

const simConfigs = [
  {
    dir: '01.Megattere',
    file: 'la_rete_invisibile_delle_megattere.html',
    titleFR: 'Le Filet de Bulles Invisible des Baleines à Bosse — Simulation Scientifique 3D',
    titleES: 'La Red Invisible de Burbujas de las Ballenas Jorobadas — Simulación Científica 3D',
    fr: [
      ['<title>La Rete Invisibile delle Megattere — Simulazione Scientifica Interattiva</title>', '<title>Le Filet de Bulles Invisible des Baleines à Bosse — Simulation Scientifique 3D</title>'],
      ['aria-label="Simulazione 3D dell\'oceano con megattere e banco di pesci"', 'aria-label="Simulation 3D de l\'océan avec baleines à bosse et banc de poissons"'],
      ['title="Scopri il banco di pesci"', 'title="Découvre le banc de poissons"'],
      ['<span>Tocca il banco di pesci!</span>', '<span>Touche le banc de poissons !</span>'],
      ['>Scoperta 05</span>', '>Découverte 05</span>'],
      ['>La balena e le bolle</span>', '>La baleine et les bulles</span>'],
      ['>La Rete Invisibile delle Megattere</h1>', '>Le Filet de Bulles Invisible des Baleines à Bosse</h1>'],
      ['aria-label="Controlli della simulazione"', 'aria-label="Commandes de la simulation"'],
      ['title="Esplora l\'oceano e trova i pesci"', 'title="Explore l\'océan et trouve les poissons"'],
      ['<span>Esplora</span>', '<span>Explorer</span>'],
      ['title="Crea una rete di bolle con tre tocchi"', 'title="Crée un filet de bulles en trois touches"'],
      ['<span>Prova tu</span>', '<span>Essaie toi-même</span>'],
      ['title="Guarda dall\'alto la forma della rete e il banco di pesci"', 'title="Regarde d\'en haut la forme du filet et le banc de poissons"'],
      ['<span>Dall\'alto</span>', '<span>Vue du dessus</span>'],
      ['title="Punto di vista subacqueo con la megattera"', 'title="Vue sous-marine avec la baleine"'],
      ['<span>Subacquea</span>', '<span>Sous l\'eau</span>'],
      ['title="Ruota attorno alla spirale di bolle"', 'title="Tourne autour de la spirale de bulles"'],
      ['<span>360°</span>', '<span>360°</span>'],
      ['title="Ascolta i suoni del mare e il canto delle megattere"', 'title="Écoute les sons de l\'océan et le chant des baleines"'],
      ['<span>Audio</span>', '<span>Son</span>'],
      ['title="Ripristina la vista iniziale della telecamera"', 'title="Réinitialise la vue originale de la caméra"'],
      ['<span>Reset</span>', '<span>Réinitialiser</span>'],
      ['<span>Inizia da capo</span>', '<span>Recommencer</span>'],
      ['Tre tocchi per creare la rete di bolle', 'Trois touches pour former le filet de bulles'],
      ['1 · Inizia la spirale', '1 · Commencer la spirale'],
      ['2 · Aggiungi bolle', '2 · Ajouter des bulles'],
      ['3 · Chiudi il cerchio', '3 · Fermer le cercle'],
      ['Fase 1 • Esplora l\'oceano', 'Phase 1 • Explore l\'océan'],
      ['Fase 2 • Costruisci la rete di bolle', 'Phase 2 • Construis le filet de bulles'],
      ['Fase 3 • Una barriera di bolle', 'Phase 3 • Une barrière de bulles'],
      ['Fase 4 • L\'attacco della megattera', 'Phase 4 • L\'attaque de la baleine'],
      ['Guarda il mare e tocca il banco di pesci', 'Regarde la mer et touche le banc de poissons'],
      ['Le megattere soffiano una colonna di bolle', 'Les baleines soufflent une spirale de bulles'],
      ['I pesci restano intrappolati all\'interno', 'Les poissons restent piégés à l\'intérieur'],
      ['La megattera risale a bocca aperta', 'La baleine remonte la gueule grande ouverte'],
      ['Riprova!', 'Recommencer !'],
      ['Guarda dall\'alto', 'Vue du dessus'],
      ['Vista laterale', 'Vue de côté'],
      ['Una rete d\'aria su misura!', 'Un filet d\'air sur mesure !'],
      ['Non una parete solida!', 'Pas un mur solide !'],
      ['Da sole o in gruppo?', 'Seule ou en groupe ?'],
      ['Che cosa mangiano e quanto?', 'Que mangent-elles et en quelle quantité ?'],
      ['Entra nella simulazione!', 'Plonge dans la simulation !']
    ],
    es: [
      ['<title>La Rete Invisibile delle Megattere — Simulazione Scientifica Interattiva</title>', '<title>La Red Invisible de Burbujas de las Ballenas Jorobadas — Simulación Científica 3D</title>'],
      ['aria-label="Simulazione 3D dell\'oceano con megattere e banco di pesci"', 'aria-label="Simulación 3D del océano con ballenas jorobadas y un banco de peces"'],
      ['title="Scopri il banco di pesci"', 'title="Descubre el banco de peces"'],
      ['<span>Tocca il banco di pesci!</span>', '<span>¡Toca el banco de peces!</span>'],
      ['>Scoperta 05</span>', '>Descubrimiento 05</span>'],
      ['>La balena e le bolle</span>', '>La ballena y las burbujas</span>'],
      ['>La Rete Invisibile delle Megattere</h1>', '>La Red Invisible de Burbujas de las Ballenas Jorobadas</h1>'],
      ['aria-label="Controlli della simulazione"', 'aria-label="Controles de la simulación"'],
      ['title="Esplora l\'oceano e trova i pesci"', 'title="Explora el océano y encuentra los peces"'],
      ['<span>Esplora</span>', '<span>Explorar</span>'],
      ['title="Crea una rete di bolle con tre tocchi"', 'title="Crea una red de burbujas en tres toques"'],
      ['<span>Prova tu</span>', '<span>Pruébalo tú</span>'],
      ['title="Guarda dall\'alto la forma della rete e il banco di pesci"', 'title="Mira desde arriba la forma de la red y el banco de peces"'],
      ['<span>Dall\'alto</span>', '<span>Vista superior</span>'],
      ['title="Punto di vista subacqueo con la megattera"', 'title="Vista submarina con la ballena"'],
      ['<span>Subacquea</span>', '<span>Bajo el agua</span>'],
      ['title="Ruota attorno alla spirale di bolle"', 'title="Gira alrededor de la espiral de burbujas"'],
      ['<span>360°</span>', '<span>360°</span>'],
      ['title="Ascolta i suoni del mare e il canto delle megattere"', 'title="Escucha los sonidos del océano y el canto de las ballenas"'],
      ['<span>Audio</span>', '<span>Sonido</span>'],
      ['title="Ripristina la vista iniziale della telecamera"', 'title="Restablece la vista de la cámara"'],
      ['<span>Reset</span>', '<span>Reiniciar</span>'],
      ['<span>Inizia da capo</span>', '<span>Empezar de nuevo</span>'],
      ['Tre tocchi per creare la rete di bolle', 'Tres toques para crear la red de burbujas'],
      ['1 · Inizia la spirale', '1 · Iniciar espiral'],
      ['2 · Aggiungi bolle', '2 · Añadir burbujas'],
      ['3 · Chiudi il cerchio', '3 · Cerrar círculo'],
      ['Fase 1 • Esplora l\'oceano', 'Fase 1 • Explora el océano'],
      ['Fase 2 • Costruisci la rete di bolle', 'Fase 2 • Construye la red de burbujas'],
      ['Fase 3 • Una barriera di bolle', 'Fase 3 • Una barrera de burbujas'],
      ['Fase 4 • L\'attacco della megattera', 'Fase 4 • El ataque de la ballena'],
      ['Guarda il mare e tocca il banco di pesci', 'Mira el océano y toca el banco de peces'],
      ['Le megattere soffiano una colonna di bolle', 'Las ballenas soplan una espiral de burbujas'],
      ['I pesci restano intrappolati all\'interno', 'Los peces quedan atrapados en el interior'],
      ['La megattera risale a bocca aperta', 'La ballena asciende con la boca abierta'],
      ['Riprova!', '¡Reintentar!'],
      ['Guarda dall\'alto', 'Vista superior'],
      ['Vista laterale', 'Vista lateral'],
      ['Una rete d\'aria su misura!', '¡Una red de aire a medida!'],
      ['Non una parete solida!', '¡No es una pared sólida!'],
      ['Da sole o in gruppo?', '¿Solas o en grupo?'],
      ['Che cosa mangiano e quanto?', '¿Qué comen y en qué cantidad?'],
      ['Entra nella simulazione!', '¡Entra en la simulación!']
    ]
  },
  {
    dir: '02.Felce.DNA',
    file: 'la_felce_con_un_dna_gigantesco.html',
    titleFR: 'La Fougère au Génome Géant — Simulation Scientifique 3D',
    titleES: 'El Helecho con un Genoma Gigante — Simulación Científica 3D',
    fr: [
      ['<title>La Felce con un DNA Gigantesco — Esperienza 3D Interattiva</title>', '<title>La Fougère au Génome Géant — Simulation Scientifique 3D</title>'],
      ['>Scoperta 13</span>', '>Découverte 13</span>'],
      ['>Piante & Piccoli Mondi</span>', '>Plantes et Mondes Invisibles</span>'],
      ['>La felce con un DNA gigantesco</h1>', '>La Fougère au Génome Géant</h1>'],
      ['aria-label="Controlli dell’esperienza"', 'aria-label="Commandes de l\'expérience"'],
      ['<span>Il Viaggio</span>', '<span>Le Voyage</span>'],
      ['<span>Dall\'alto</span>', '<span>Vue du dessus</span>'],
      ['<span>Frontale</span>', '<span>Vue de face</span>'],
      ['aria-label="Esplorazione tridimensionale della felce e del suo DNA"', 'aria-label="Exploration 3D de la fougère et de son ADN"'],
      ['NUOVA CALEDONIA · SOTTOBOSCO UMIDO', 'NOUVELLE-CALÉDONIE · SOUS-BOIS HUMIDE'],
      ['<span>Una felce minuscola</span>', '<span>Une minuscule fougère</span>'],
      ['<span>Scopri il suo segreto</span>', '<span>Découvre son secret</span>'],
      ['DNA di un solo nucleo srotolato', 'ADN d\'un seul noyau déroulé'],
      ['<span>Uomo</span>', '<span>Humain</span>'],
      ['<span>Questa felce</span>', '<span>Cette fougère</span>'],
      ['Quanto sarà lungo il DNA della felce?', 'Quelle sera la longueur de l\'ADN de la fougère ?'],
      ['Ricostruzione botanica 3D', 'Reconstitution botanique 3D'],
      ['<p>Entriamo nel mondo microscopico della felce…</p>', '<p>Entrons dans le monde microscopique de la fougère…</p>'],
      ['LA FELCE', 'LA FOUGÈRE'],
      ['LA CELLULA', 'LA CELLULE'],
      ['IL DNA', 'L\'ADN'],
      ['IL CONFRONTO', 'LA COMPARAISON'],
      ['LA SCOPERTA', 'LA DÉCOUVERTE'],
      ['Piccola fuori. Gigantesca dentro.', 'Petite à l\'extérieur. Gigantesque à l\'intérieur.'],
      ['Questa felce nasconde un segreto sbalorditivo dentro le sue cellule.', 'Cette fougère cache un secret stupéfiant à l\'intérieur de ses cellules.'],
      ['<span>Esplora la felce</span>', '<span>Explorer la fougère</span>'],
      ['Che cosa significa davvero avere più DNA?', 'Que signifie vraiment avoir plus d\'ADN ?'],
      ['È più intelligente', 'Elle est plus intelligente'],
      ['È più grande', 'Elle est plus grande'],
      ['Ha un record nella quantità di DNA', 'Elle détient un record de quantité d\'ADN'],
      ['160,45 miliardi di coppie di basi', '160,45 milliards de paires de bases'],
      ['Una scoperta del 2024', 'Une découverte de 2024'],
      ['Come hanno fatto a misurarlo?', 'Comment l\'ont-ils mesuré ?'],
      ['Da una cellula a oltre 100 metri', 'D\'une seule cellule à plus de 100 mètres'],
      ['Più DNA ≠ più intelligenza', 'Plus d\'ADN ≠ plus d\'intelligence']
    ],
    es: [
      ['<title>La Felce con un DNA Gigantesco — Esperienza 3D Interattiva</title>', '<title>El Helecho con un Genoma Gigante — Simulación Científica 3D</title>'],
      ['>Scoperta 13</span>', '>Descubrimiento 13</span>'],
      ['>Piante & Piccoli Mondi</span>', '>Plantas y Pequeños Mundos</span>'],
      ['>La felce con un DNA gigantesco</h1>', '>El Helecho con un Genoma Gigante</h1>'],
      ['aria-label="Controlli dell’esperienza"', 'aria-label="Controles de la experiencia"'],
      ['<span>Il Viaggio</span>', '<span>El Viaje</span>'],
      ['<span>Dall\'alto</span>', '<span>Vista superior</span>'],
      ['<span>Frontale</span>', '<span>Vista frontal</span>'],
      ['aria-label="Esplorazione tridimensionale della felce e del suo DNA"', 'aria-label="Exploración 3D del helecho y su ADN"'],
      ['NUOVA CALEDONIA · SOTTOBOSCO UMIDO', 'NUEVA CALEDONIA · SOTOBOSQUE HÚMEDO'],
      ['<span>Una felce minuscola</span>', '<span>Un helecho diminuto</span>'],
      ['<span>Scopri il suo segreto</span>', '<span>Descubre su secreto</span>'],
      ['DNA di un solo nucleo srotolato', 'ADN de un solo núcleo desenrollado'],
      ['<span>Uomo</span>', '<span>Humano</span>'],
      ['<span>Questa felce</span>', '<span>Este helecho</span>'],
      ['Quanto sarà lungo il DNA della felce?', '¿Cuánto medirá el ADN del helecho?'],
      ['Ricostruzione botanica 3D', 'Reconstrucción botánica 3D'],
      ['<p>Entriamo nel mondo microscopico della felce…</p>', '<p>Entrando en el mundo microscópico del helecho…</p>'],
      ['LA FELCE', 'EL HELECHO'],
      ['LA CELLULA', 'LA CÉLULA'],
      ['IL DNA', 'EL ADN'],
      ['IL CONFRONTO', 'LA COMPARACIÓN'],
      ['LA SCOPERTA', 'EL DESCUBRIMIENTO'],
      ['Piccola fuori. Gigantesca dentro.', 'Pequeño por fuera. Gigantesco por dentro.'],
      ['Questa felce nasconde un segreto sbalorditivo dentro le sue cellule.', 'Este helecho esconde un secreto asombroso en sus células.'],
      ['<span>Esplora la felce</span>', '<span>Explorar el helecho</span>'],
      ['Che cosa significa davvero avere più DNA?', '¿Qué significa realmente tener más ADN?'],
      ['È più intelligente', 'Es más inteligente'],
      ['È più grande', 'Es más grande'],
      ['Ha un record nella quantità di DNA', 'Tiene un récord en cantidad de ADN'],
      ['160,45 miliardi di coppie di basi', '160,45 mil millones de pares de bases'],
      ['Una scoperta del 2024', 'Un descubrimiento de 2024'],
      ['Come hanno fatto a misurarlo?', '¿Cómo lo midieron?'],
      ['Da una cellula a oltre 100 metri', 'De una sola célula a más de 100 metros'],
      ['Più DNA ≠ più intelligenza', 'Más ADN ≠ más inteligencia']
    ]
  },
  {
    dir: '03.Pesce.Veicolo',
    file: 'il_pesce_che_muove_un_veicolo.html',
    titleFR: 'Un poisson peut-il conduire un véhicule ? · Découverte 15',
    titleES: '¿Puede un pez mover un vehículo? · Descubrimiento 15',
    fr: [
      ['<title>Un pesce può muovere un veicolo? · Scoperta 15</title>', '<title>Un poisson peut-il conduire un véhicule ? · Découverte 15</title>'],
      ['>Scoperta 15</span>', '>Découverte 15</span>'],
      ['>Esperimenti Sorprendenti</span>', '>Expériences Surprenantes</span>'],
      ['>Un pesce può muovere un veicolo?</h1>', '>Un poisson peut-il conduire un véhicule ?</h1>'],
      ['<span>Il Viaggio</span>', '<span>Le Parcours</span>'],
      ['<span>Guida tu</span>', '<span>Pilote toi-même</span>'],
      ['<span>Guida robotica</span>', '<span>Pilotage robotique</span>'],
      ['IL PESCE', 'LE POISSON'],
      ['LA VASCA', 'L\'AQUARIUM'],
      ['LA TELECAMERA', 'LA CAMÉRA'],
      ['IL COMPUTER', 'L\'ORDINATEUR'],
      ['LE RUOTE', 'LES ROUES'],
      ['Chi guida davvero?', 'Qui pilote vraiment ?'],
      ['Come fa un pesce rosso a muoversi sulla terraferma?', 'Comment un poisson rouge parvient-il à se déplacer sur la terre ferme ?'],
      ['L\'apparato sperimentale', 'Le dispositif expérimental'],
      ['La telecamera dall\'alto', 'La caméra zénithale'],
      ['L\'algoritmo di movimento', 'L\'algorithme de mouvement'],
      ['La meta raggiunta!', 'La cible atteinte !']
    ],
    es: [
      ['<title>Un pesce può muovere un veicolo? · Scoperta 15</title>', '<title>¿Puede un pez mover un vehículo? · Descubrimiento 15</title>'],
      ['>Scoperta 15</span>', '>Descubrimiento 15</span>'],
      ['>Esperimenti Sorprendenti</span>', '>Experimentos Sorprendentes</span>'],
      ['>Un pesce può muovere un veicolo?</h1>', '>¿Puede un pez mover un vehículo?</h1>'],
      ['<span>Il Viaggio</span>', '<span>El Recorrido</span>'],
      ['<span>Guida tu</span>', '<span>Conduce tú</span>'],
      ['<span>Guida robotica</span>', '<span>Conducción robótica</span>'],
      ['IL PESCE', 'EL PEZ'],
      ['LA VASCA', 'EL TANQUE'],
      ['LA TELECAMERA', 'LA CÁMARA'],
      ['IL COMPUTER', 'EL ORDENADOR'],
      ['LE RUOTE', 'LAS RUEDAS'],
      ['Chi guida davvero?', '¿Quién conduce realmente?'],
      ['Come fa un pesce rosso a muoversi sulla terraferma?', '¿Cómo consigue un pez de colores moverse en tierra firme?'],
      ['L\'apparato sperimentale', 'El dispositivo experimental'],
      ['La telecamera dall\'alto', 'La cámara cenital'],
      ['L\'algoritmo di movimento', 'El algoritmo de movimiento'],
      ['La meta raggiunta!', '¡Objetivo alcanzado!']
    ]
  },
  {
    dir: '04.Uccelli.Dinosauri',
    file: 'gli_uccelli_sono_dinosauri_vivi.html',
    titleFR: 'Les oiseaux sont des dinosaures vivants · Découverte 22',
    titleES: 'Las aves son dinosaurios vivos · Descubrimiento 22',
    fr: [
      ['<title>Gli uccelli sono dinosauri vivi · Scoperta 22</title>', '<title>Les oiseaux sont des dinosaures vivants · Découverte 22</title>'],
      ['>Scoperta 22</span>', '>Découverte 22</span>'],
      ['>Dinosauri e DNA</span>', '>Dinosaures et ADN</span>'],
      ['>Un dinosauro nel pollaio</h1>', '>Un dinosaure dans le poulailler</h1>'],
      ['L\'UCCELLO', 'L\'OISEAU'],
      ['LO SCHELETRO', 'LE SQUELETTE'],
      ['LE PIUME', 'LES PLUMES'],
      ['L\'ALBERO', 'L\'ARBRE ÉVOLUTIF'],
      ['LA PARENTELA', 'LA PARENTÉ']
    ],
    es: [
      ['<title>Gli uccelli sono dinosauri vivi · Scoperta 22</title>', '<title>Las aves son dinosaurios vivos · Descubrimiento 22</title>'],
      ['>Scoperta 22</span>', '>Descubrimiento 22</span>'],
      ['>Dinosauri e DNA</span>', '>Dinosaurios y ADN</span>'],
      ['>Un dinosauro nel pollaio</h1>', '>Un dinosaurio en el gallinero</h1>'],
      ['L\'UCCELLO', 'EL AVE'],
      ['LO SCHELETRO', 'EL ESQUELETO'],
      ['LE PIUME', 'LAS PLUMAS'],
      ['L\'ALBERO', 'EL ÁRBOL EVOLUTIVO'],
      ['LA PARENTELA', 'EL PARENTESCO']
    ]
  },
  {
    dir: '05.Fungo.Robot',
    file: 'il_fungo_collegato_a_un_robot.html',
    titleFR: 'Le champignon connecté à un robot · Découverte 36',
    titleES: 'El hongo conectado a un robot · Descubrimiento 36',
    fr: [
      ['<title>Il fungo collegato a un robot · Scoperta 36</title>', '<title>Le champignon connecté à un robot · Découverte 36</title>'],
      ['>Scoperta 36</span>', '>Découverte 36</span>'],
      ['>Laboratorio del Futuro</span>', '>Laboratoire du Futur</span>'],
      ['>Il fungo collegato a un robot</h1>', '>Le champignon connecté à un robot</h1>'],
      ['IL FUNGO', 'LE CHAMPIGNON'],
      ['IL MICELIO', 'LE MYCÉLIUM'],
      ['GLI ELETTRODI', 'LES ÉLECTRODES'],
      ['I SEGNALI', 'LES SIGNAUX'],
      ['IL ROBOT', 'LE ROBOT']
    ],
    es: [
      ['<title>Il fungo collegato a un robot · Scoperta 36</title>', '<title>El hongo conectado a un robot · Descubrimiento 36</title>'],
      ['>Scoperta 36</span>', '>Descubrimiento 36</span>'],
      ['>Laboratorio del Futuro</span>', '>Laboratorio del Futuro</span>'],
      ['>Il fungo collegato a un robot</h1>', '>El hongo conectado a un robot</h1>'],
      ['IL FUNGO', 'EL HONGO'],
      ['IL MICELIO', 'EL MICELIO'],
      ['GLI ELETTRODI', 'LOS ELECTRODOS'],
      ['I SEGNALI', 'LAS SEÑALES'],
      ['IL ROBOT', 'EL ROBOT']
    ]
  },
  {
    dir: '06.Ginocchio.Bionico',
    file: 'il_ginocchio_bionico.html',
    titleFR: 'Le genou bionique · Découverte 43',
    titleES: 'La rodilla biónica · Descubrimiento 43',
    fr: [
      ['<title>Il ginocchio bionico · Scoperta 43</title>', '<title>Le genou bionique · Découverte 43</title>'],
      ['>Scoperta 43</span>', '>Découverte 43</span>'],
      ['>Corpo & Supertecnologie</span>', '>Corps et Super-Technologies</span>'],
      ['>Il ginocchio bionico</h1>', '>Le genou bionique</h1>'],
      ['LA PROTESI', 'LA PROTHÈSE'],
      ['I SENSORI', 'LES CAPTEURS'],
      ['I MUSCOLI', 'LES MUSCLES'],
      ['IL CONTROLLO', 'LE CONTRÔLE'],
      ['IL MOVIMENTO', 'LE MOUVEMENT']
    ],
    es: [
      ['<title>Il ginocchio bionico · Scoperta 43</title>', '<title>La rodilla biónica · Descubrimiento 43</title>'],
      ['>Scoperta 43</span>', '>Descubrimiento 43</span>'],
      ['>Corpo & Supertecnologie</span>', '>Cuerpo y Supertecnologías</span>'],
      ['>Il ginocchio bionico</h1>', '>La rodilla biónica</h1>'],
      ['LA PROTESI', 'LA PRÓTESIS'],
      ['I SENSORI', 'LOS SENSORES'],
      ['I MUSCOLI', 'LOS MÚSCULOS'],
      ['IL CONTROLLO', 'EL CONTROL'],
      ['IL MOVIMENTO', 'EL MOVIMIENTO']
    ]
  },
  {
    dir: '07.Buco.Nero',
    file: 'come_nasce_l_immagine_di_un_buco_nero.html',
    titleFR: 'Comment naît l’image d’un trou noir · Découverte 55',
    titleES: 'Cómo nace la imagen de un agujero negro · Descubrimiento 55',
    fr: [
      ['<title>Come nasce l’immagine di un buco nero · Scoperta 55</title>', '<title>Comment naît l’image d’un trou noir · Découverte 55</title>'],
      ['>Scoperta 55</span>', '>Découverte 55</span>'],
      ['>Spazio e Universo</span>', '>Espace et Univers</span>'],
      ['>Come nasce l’immagine di un buco nero</h1>', '>Comment naît l’image d’un trou noir</h1>'],
      ['LA DOMANDA', 'LA QUESTION'],
      ['LA RETE', 'LE RÉSEAU'],
      ['I DATI', 'LES DONNÉES'],
      ['L’IMMAGINE', 'L\'IMAGE'],
      ['LA SCOPERTA', 'LA DÉCOUVERTE']
    ],
    es: [
      ['<title>Come nasce l’immagine di un buco nero · Scoperta 55</title>', '<title>Cómo nace la imagen de un agujero negro · Descubrimiento 55</title>'],
      ['>Scoperta 55</span>', '>Descubrimiento 55</span>'],
      ['>Spazio e Universo</span>', '>Espacio y Universo</span>'],
      ['>Come nasce l’immagine di un buco nero</h1>', '>Cómo nace la imagen de un agujero negro</h1>'],
      ['LA DOMANDA', 'LA PREGUNTA'],
      ['LA RETE', 'LA RED'],
      ['I DATI', 'LOS DATOS'],
      ['L’IMMAGINE', 'LA IMAGEN'],
      ['LA SCOPERTA', 'EL DESCUBRIMIENTO']
    ]
  }
];

// Execute processing for each simulation
simConfigs.forEach(sim => {
  const itSourcePath = path.join('assets/einstein/bonus/it/animazioni', sim.dir, sim.file);
  if (!fs.existsSync(itSourcePath)) {
    console.error('Source missing:', itSourcePath);
    return;
  }
  const itContent = fs.readFileSync(itSourcePath, 'utf8');

  // FRENCH
  let frContent = itContent;
  getCommonReplacements('fr').forEach(([k, v]) => { frContent = frContent.split(k).join(v); });
  sim.fr.forEach(([k, v]) => { frContent = frContent.split(k).join(v); });
  frContent = frContent.replace(/lang=it/g, 'lang=fr');
  const flagBarRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;
  frContent = frContent.replace(flagBarRegex, buildSimFlagBar(sim.dir, 'fr'));

  const frDir = path.join('assets/einstein/bonus/fr/animazioni', sim.dir);
  fs.mkdirSync(frDir, { recursive: true });
  fs.writeFileSync(path.join(frDir, sim.file), frContent, 'utf8');
  fs.writeFileSync(path.join(frDir, 'index.html'), frContent, 'utf8');

  // SPANISH
  let esContent = itContent;
  getCommonReplacements('es').forEach(([k, v]) => { esContent = esContent.split(k).join(v); });
  sim.es.forEach(([k, v]) => { esContent = esContent.split(k).join(v); });
  esContent = esContent.replace(/lang=it/g, 'lang=es');
  esContent = esContent.replace(flagBarRegex, buildSimFlagBar(sim.dir, 'es'));

  const esDir = path.join('assets/einstein/bonus/es/animazioni', sim.dir);
  fs.mkdirSync(esDir, { recursive: true });
  fs.writeFileSync(path.join(esDir, sim.file), esContent, 'utf8');
  fs.writeFileSync(path.join(esDir, 'index.html'), esContent, 'utf8');

  console.log(`Successfully built 3D simulation ${sim.dir} for FR & ES.`);
});
