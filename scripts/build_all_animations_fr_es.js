const fs = require('fs');
const path = require('path');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function renderSimFlagBar(dir, currentLang) {
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

const simConfigs = [
  {
    dir: '01.Megattere',
    namedFile: 'la_rete_invisibile_delle_megattere.html',
    titleFR: 'Le Filet de Bulles Invisible des Baleines à Bosse — Simulation Scientifique 3D',
    titleES: 'La Red Invisible de Burbujas de las Ballenas Jorobadas — Simulación Científica 3D',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/The Invisible Bubble Net of Humpback Whales — 3D Interactive Simulation/, 'Le Filet de Bulles Invisible des Baleines à Bosse — Simulation Scientifique 3D'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/aria-label="3D ocean simulation with humpback whales and a school of fish"/, 'aria-label="Simulation 3D de l\'océan avec baleines à bosse et banc de poissons"'],
      [/title="Discover the school of fish"/, 'title="Découvre le banc de poissons"'],
      [/<span>Tap the school of fish!<\/span>/, '<span>Touche le banc de poissons !</span>'],
      [/>Discovery 05<\/span>/, '>Découverte 05</span>'],
      [/>The whale and the bubbles<\/span>/, '>La baleine et les bulles</span>'],
      [/>The Invisible Bubble Net of Humpback Whales<\/h1>/, '>Le Filet de Bulles Invisible des Baleines à Bosse</h1>'],
      [/aria-label="Simulation controls"/, 'aria-label="Commandes de la simulation"'],
      [/title="Back to 3D Lab"/, 'title="Retour au laboratoire 3D"'],
      [/>3D Lab<\/span>/, '>Laboratoire 3D</span>'],
      [/title="Return to Home"/, 'title="Retour à l\'accueil"'],
      [/title="Explore the ocean and find the fish"/, 'title="Explore l\'océan et trouve les poissons"'],
      [/>Explore<\/span>/, '>Explorer</span>'],
      [/title="Create a bubble net with three taps"/, 'title="Crée un filet de bulles en trois touches"'],
      [/>Try it out<\/span>/, '>Essaie toi-même</span>'],
      [/title="Look from above at the net shape and fish school"/, 'title="Regarde d\'en haut la forme du filet et le banc de poissons"'],
      [/>Top view<\/span>/, '>Vue du dessus</span>'],
      [/title="Underwater point of view with the whale"/, 'title="Vue sous-marine avec la baleine"'],
      [/>Underwater<\/span>/, '>Sous l\'eau</span>'],
      [/title="Rotate around the bubble spiral"/, 'title="Tourne autour de la spirale de bulles"'],
      [/>360°<\/span>/, '>360°</span>'],
      [/title="Listen to sounds of the sea and whale songs"/, 'title="Écoute les sons de l\'océan et le chant des baleines"'],
      [/>Audio<\/span>/, '>Son</span>'],
      [/title="Reset original camera view"/, 'title="Réinitialise la vue originale de la caméra"'],
      [/>Reset<\/span>/, '>Réinitialiser</span>'],
      [/<span>Click and drag to rotate · Scroll to zoom<\/span>/, '<span>Clique et glisse pour faire pivoter · Molette pour zoomer</span>'],
      [/<h2 class="text-sm font-bold text-white uppercase tracking-wider">How does the net work\?<\/h2>/, '<h2 class="text-sm font-bold text-white uppercase tracking-wider">Comment fonctionne le filet ?</h2>'],
      [/Humpback whales dive deep below a school of fish, then swim upwards in a tight spiral while exhaling streams of bubbles\./,
       'Les baleines à bosse plongent sous un banc de poissons, puis remontent en spirale serrée en expirant un rideau continu de bulles d\'air.'],
      [/The shining wall of bubbles confuses the fish, which refuse to cross it\./,
       'Le mur étincelant de bulles désoriente les poissons, qui n\'osent pas traverser cette barrière visuelle et acoustique.'],
      [/Scientific research published in <em>Royal Society Open Science<\/em> \(2024\) confirmed this behaviour constitutes genuine animal tool-use\./,
       'Des recherches scientifiques publiées dans <em>Royal Society Open Science</em> (2024) ont confirmé que ce comportement constitue un véritable usage d\'outil chez l\'animal.'],
      [/Peer-reviewed Paper · DOI: 10.1098\/rsos.240328/, 'Article scientifique validé · DOI: 10.1098/rsos.240328'],
      [/Tap 3 points around the fish to create your bubble ring!/, 'Touche 3 points autour du banc de poissons pour créer ton anneau de bulles !']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/The Invisible Bubble Net of Humpback Whales — 3D Interactive Simulation/, 'La Red Invisible de Burbujas de las Ballenas Jorobadas — Simulación Científica 3D'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/aria-label="3D ocean simulation with humpback whales and a school of fish"/, 'aria-label="Simulación 3D del océano con ballenas jorobadas y un banco de peces"'],
      [/title="Discover the school of fish"/, 'title="Descubre el banco de peces"'],
      [/<span>Tap the school of fish!<\/span>/, '<span>¡Toca el banco de peces!</span>'],
      [/>Discovery 05<\/span>/, '>Descubrimiento 05</span>'],
      [/>The whale and the bubbles<\/span>/, '>La ballena y las burbujas</span>'],
      [/>The Invisible Bubble Net of Humpback Whales<\/h1>/, '>La Red Invisible de Burbujas de las Ballenas Jorobadas</h1>'],
      [/aria-label="Simulation controls"/, 'aria-label="Controles de la simulación"'],
      [/title="Back to 3D Lab"/, 'title="Volver al laboratorio 3D"'],
      [/>3D Lab<\/span>/, '>Laboratorio 3D</span>'],
      [/title="Return to Home"/, 'title="Volver al inicio"'],
      [/title="Explore the ocean and find the fish"/, 'title="Explora el océano y encuentra los peces"'],
      [/>Explore<\/span>/, '>Explorar</span>'],
      [/title="Create a bubble net with three taps"/, 'title="Crea una red de burbujas en tres toques"'],
      [/>Try it out<\/span>/, '>Prueba tú</span>'],
      [/title="Look from above at the net shape and fish school"/, 'title="Mira desde arriba la forma de la red y el banco de peces"'],
      [/>Top view<\/span>/, '>Vista cenital</span>'],
      [/title="Underwater point of view with the whale"/, 'title="Vista submarina con la ballena"'],
      [/>Underwater<\/span>/, '>Bajo el agua</span>'],
      [/title="Rotate around the bubble spiral"/, 'title="Gira alrededor de la espiral de burbujas"'],
      [/>360°<\/span>/, '>360°</span>'],
      [/title="Listen to sounds of the sea and whale songs"/, 'title="Escucha los sonidos del mar y los cantos de ballenas"'],
      [/>Audio<\/span>/, '>Sonido</span>'],
      [/title="Reset original camera view"/, 'title="Restablecer vista original de la cámara"'],
      [/>Reset<\/span>/, '>Reiniciar</span>'],
      [/<span>Click and drag to rotate · Scroll to zoom<\/span>/, '<span>Haz clic y arrastra para girar · Rueda para hacer zoom</span>'],
      [/<h2 class="text-sm font-bold text-white uppercase tracking-wider">How does the net work\?<\/h2>/, '<h2 class="text-sm font-bold text-white uppercase tracking-wider">¿Cómo funciona la red?</h2>'],
      [/Humpback whales dive deep below a school of fish, then swim upwards in a tight spiral while exhaling streams of bubbles\./,
       'Las ballenas jorobadas bucean bajo un banco de peces y ascienden en una espiral cerrada mientras expulsan chorros continuos de burbujas.'],
      [/The shining wall of bubbles confuses the fish, which refuse to cross it\./,
       'La pared brillante de burbujas desorienta a los peces, que no se atreven a cruzar esta barrera visual y acústica.'],
      [/Scientific research published in <em>Royal Society Open Science<\/em> \(2024\) confirmed this behaviour constitutes genuine animal tool-use\./,
       'La investigación científica publicada en <em>Royal Society Open Science</em> (2024) confirmó que este comportamiento constituye un auténtico uso de herramientas en animales.'],
      [/Peer-reviewed Paper · DOI: 10.1098\/rsos.240328/, 'Artículo científico evaluado por pares · DOI: 10.1098/rsos.240328'],
      [/Tap 3 points around the fish to create your bubble ring!/, '¡Toca 3 puntos alrededor del banco de peces para crear tu anillo de burbujas!']
    ]
  },
  {
    dir: '02.Felce.DNA',
    namedFile: 'la_felce_con_un_dna_gigantesco.html',
    titleFR: 'La Fougère au Super-ADN Géant — Laboratoire Génétique 3D',
    titleES: 'El Helecho con ADN Gigantesco — Laboratorio Genético 3D',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/The Fern with Giant DNA — 3D Interactive Simulation/, 'La Fougère au Super-ADN Géant — Laboratoire Génétique 3D'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 13<\/span>/, '>Découverte 13</span>'],
      [/>The fern with giant DNA<\/span>/, '>La fougère au super-ADN</span>'],
      [/>The Fern with Giant DNA<\/h1>/, '>La Fougère au Super-ADN Géant</h1>'],
      [/>Human DNA<\/button>/, '>ADN humain</button>'],
      [/>Fern DNA<\/button>/, '>ADN de la fougère</button>'],
      [/>Unroll the Helix<\/button>/, '>Dérouler l\'hélice</button>'],
      [/>Rotate Helix<\/button>/, '>Faire pivoter l\'hélice</button>'],
      [/>Scientific Notes<\/button>/, '>Notes scientifiques</button>'],
      [/>Compare Genomes<\/button>/, '>Comparer les génomes</button>'],
      [/The record-holding genome on Earth/, 'Le génome record sur Terre'],
      [/Tmesipteris oblanceolata holds the largest recorded genome of any eukaryote on Earth/,
       'Tmesipteris oblanceolata possède le plus grand génome jamais mesuré chez un être vivant sur Terre'],
      [/160 billion base pairs: over 50 times larger than the human genome/,
       '160 milliards de paires de bases : plus de 50 fois la taille du génome humain']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/The Fern with Giant DNA — 3D Interactive Simulation/, 'El Helecho con ADN Gigantesco — Laboratorio Genético 3D'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 13<\/span>/, '>Descubrimiento 13</span>'],
      [/>The fern with giant DNA<\/span>/, '>El helecho con ADN gigante</span>'],
      [/>The Fern with Giant DNA<\/h1>/, '>El Helecho con ADN Gigantesco</h1>'],
      [/>Human DNA<\/button>/, '>ADN humano</button>'],
      [/>Fern DNA<\/button>/, '>ADN del helecho</button>'],
      [/>Unroll the Helix<\/button>/, '>Desenrollar hélice</button>'],
      [/>Rotate Helix<\/button>/, '>Rotar hélice</button>'],
      [/>Scientific Notes<\/button>/, '>Notas científicas</button>'],
      [/>Compare Genomes<\/button>/, '>Comparar genomas</button>'],
      [/The record-holding genome on Earth/, 'El genoma récord en la Tierra'],
      [/Tmesipteris oblanceolata holds the largest recorded genome of any eukaryote on Earth/,
       'Tmesipteris oblanceolata posee el genoma más grande registrado en cualquier ser vivo de la Tierra'],
      [/160 billion base pairs: over 50 times larger than the human genome/,
       '160 mil millones de pares de bases: más de 50 veces mayor que el genoma humano']
    ]
  },
  {
    dir: '03.Pesce.Veicolo',
    namedFile: 'il_pesce_che_muove_un_veicolo.html',
    titleFR: 'Un Poisson Peut-il Conduire un Véhicule ? — Découverte 15',
    titleES: '¿Puede un Pez Conducir un Vehículo? — Descubrimiento 15',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/Can a fish drive a vehicle\? · Discovery 15/, 'Un poisson peut-il conduire un véhicule ? · Découverte 15'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 15<\/span>/, '>Découverte 15</span>'],
      [/>A fish takes the wheel<\/span>/, '>Le poisson prend le volant</span>'],
      [/>Can a Fish Drive a Vehicle\?<\/h1>/, '>Un Poisson Peut-il Conduire un Véhicule ?</h1>'],
      [/>Fish POV<\/button>/, '>Vue du poisson</button>'],
      [/>Top View<\/button>/, '>Vue de dessus</button>'],
      [/>Lab Camera<\/button>/, '>Caméra du labo</button>'],
      [/>Drive Rover<\/button>/, '>Piloter le rover</button>'],
      [/>Experiment Info<\/button>/, '>Infos expérience</button>'],
      [/>Reset Position<\/button>/, '>Réinitialiser</button>'],
      [/Researchers placed a fish tank on top of a robotic motorized platform/,
       'Des chercheurs ont placé un aquarium sur une plateforme robotisée motorisée'],
      [/A tracking camera detects where the goldfish swims and turns the wheels toward that direction/,
       'Une caméra détecte où nage le poisson rouge et oriente les roues dans cette direction']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/Can a fish drive a vehicle\? · Discovery 15/, '¿Puede un pez conducir un vehículo? · Descubrimiento 15'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 15<\/span>/, '>Descubrimiento 15</span>'],
      [/>A fish takes the wheel<\/span>/, '>El pez al volante</span>'],
      [/>Can a Fish Drive a Vehicle\?<\/h1>/, '>¿Puede un Pez Conducir un Vehículo?</h1>'],
      [/>Fish POV<\/button>/, '>Vista del pez</button>'],
      [/>Top View<\/button>/, '>Vista cenital</button>'],
      [/>Lab Camera<\/button>/, '>Cámara del lab</button>'],
      [/>Drive Rover<\/button>/, '>Conducir rover</button>'],
      [/>Experiment Info<\/button>/, '>Información experimento</button>'],
      [/>Reset Position<\/button>/, '>Restablecer</button>'],
      [/Researchers placed a fish tank on top of a robotic motorized platform/,
       'Los científicos colocaron una pecera sobre una plataforma robótica motorizada'],
      [/A tracking camera detects where the goldfish swims and turns the wheels toward that direction/,
       'Una cámara de seguimiento detecta hacia dónde nada el pez y gira las ruedas en esa dirección']
    ]
  },
  {
    dir: '04.Uccelli.Dinosauri',
    namedFile: 'gli_uccelli_sono_dinosauri_vivi.html',
    titleFR: 'Les Oiseaux Sont des Dinosaures Vivants — Découverte 22',
    titleES: 'Las Aves Son Dinosaurios Vivos — Descubrimiento 22',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/Birds are living dinosaurs · Discovery 22/, 'Les oiseaux sont des dinosaures vivants · Découverte 22'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 22<\/span>/, '>Découverte 22</span>'],
      [/>A dinosaur in the henhouse<\/span>/, '>Un dinosaure dans le poulailler</span>'],
      [/>Birds Are Living Dinosaurs<\/h1>/, '>Les Oiseaux Sont des Dinosaures Vivants</h1>'],
      [/>Compare Skeletons<\/button>/, '>Comparer les squelettes</button>'],
      [/>Feather Evolution<\/button>/, '>Évolution des plumes</button>'],
      [/>66 Million Years Timeline<\/button>/, '>Ligne du temps 66 millions d\'années</button>'],
      [/Modern birds are avian theropod dinosaurs/, 'Les oiseaux modernes sont des dinosaures théropodes aviaires'],
      [/The wishbone, hollow bones and feathers all originated in non-avian dinosaurs/,
       'La fourchette osseuse, les os creux et les plumes sont tous apparus chez des dinosaures']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/Birds are living dinosaurs · Discovery 22/, 'Las aves son dinosaurios vivos · Descubrimiento 22'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 22<\/span>/, '>Descubrimiento 22</span>'],
      [/>A dinosaur in the henhouse<\/span>/, '>Un dinosaurio en el gallinero</span>'],
      [/>Birds Are Living Dinosaurs<\/h1>/, '>Las Aves Son Dinosaurios Vivos</h1>'],
      [/>Compare Skeletons<\/button>/, '>Comparar esqueletos</button>'],
      [/>Feather Evolution<\/button>/, '>Evolución de plumas</button>'],
      [/>66 Million Years Timeline<\/button>/, '>Línea temporal de 66 millones de años</button>'],
      [/Modern birds are avian theropod dinosaurs/, 'Las aves modernas son dinosaurios terópodos aviares'],
      [/The wishbone, hollow bones and feathers all originated in non-avian dinosaurs/,
       'La fúrcula, los huesos huecos y las plumas surgieron todos en dinosaurios no aviares']
    ]
  },
  {
    dir: '05.Fungo.Robot',
    namedFile: 'il_fungo_collegato_a_un_robot.html',
    titleFR: 'Le Champignon Relié à un Robot — Découverte 36',
    titleES: 'El Hongo Conectado a un Robot — Descubrimiento 36',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/Fungus wired to a robot · Discovery 36/, 'Champignon relié à un robot · Découverte 36'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 36<\/span>/, '>Découverte 36</span>'],
      [/>Bio-hybrid fungal robotics<\/span>/, '>Robotique biohybride fongique</span>'],
      [/>The Fungus Wired to a Robot<\/h1>/, '>Le Champignon Relié à un Robot</h1>'],
      [/>Light Stimulus<\/button>/, '>Stimulus lumineux</button>'],
      [/>Mycelium Pulses<\/button>/, '>Impulsions du mycélium</button>'],
      [/>Robot Movement<\/button>/, '>Mouvement du robot</button>'],
      [/Electrical spikes from living mycelium translate into motor actuation/,
       'Les signaux électriques émis par le mycélium vivant sont traduits en mouvements pour les moteurs']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/Fungus wired to a robot · Discovery 36/, 'Hongo conectado a un robot · Descubrimiento 36'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 36<\/span>/, '>Descubrimiento 36</span>'],
      [/>Bio-hybrid fungal robotics<\/span>/, '>Robótica biohíbrida con hongos</span>'],
      [/>The Fungus Wired to a Robot<\/h1>/, '>El Hongo Conectado a un Robot</h1>'],
      [/>Light Stimulus<\/button>/, '>Estímulo de luz</button>'],
      [/>Mycelium Pulses<\/button>/, '>Pulsos del micelio</button>'],
      [/>Robot Movement<\/button>/, '>Movimiento del robot</button>'],
      [/Electrical spikes from living mycelium translate into motor actuation/,
       'Los impulsos eléctricos del micelio vivo se convierten en órdenes para mover los motores']
    ]
  },
  {
    dir: '06.Ginocchio.Bionico',
    namedFile: 'il_ginocchio_bionico.html',
    titleFR: 'Le Genou Bionique à Contrôle Neural — Découverte 43',
    titleES: 'La Rodilla Biónica con Control Neural — Descubrimiento 43',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/The Bionic Knee · Discovery 43/, 'Le Genou Bionique · Découverte 43'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 43<\/span>/, '>Découverte 43</span>'],
      [/>Neural prosthetic knee<\/span>/, '>Genou prothétique neural</span>'],
      [/>The Bionic Knee<\/h1>/, '>Le Genou Bionique</h1>'],
      [/>Muscle Signal<\/button>/, '>Signal musculaire</button>'],
      [/>Joint Flexion<\/button>/, '>Flexion de l\'articulation</button>'],
      [/>Walk Cycle<\/button>/, '>Cycle de marche</button>'],
      [/Agonist-antagonist myoneural interface allows intuitive proprioceptive control/,
       'L\'interface myoneurale agoniste-antagoniste permet un contrôle proprioceptif intuitif']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/The Bionic Knee · Discovery 43/, 'La Rodilla Biónica · Descubrimiento 43'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 43<\/span>/, '>Descubrimiento 43</span>'],
      [/>Neural prosthetic knee<\/span>/, '>Rodilla protésica neural</span>'],
      [/>The Bionic Knee<\/h1>/, '>La Rodilla Biónica</h1>'],
      [/>Muscle Signal<\/button>/, '>Señal muscular</button>'],
      [/>Joint Flexion<\/button>/, '>Flexión articular</button>'],
      [/>Walk Cycle<\/button>/, '>Ciclo de marcha</button>'],
      [/Agonist-antagonist myoneural interface allows intuitive proprioceptive control/,
       'La interfaz mioneural agonista-antagonista permite un control propioceptivo intuitivo']
    ]
  },
  {
    dir: '07.Buco.Nero',
    namedFile: 'come_nasce_l_immagine_di_un_buco_nero.html',
    titleFR: 'Comment Est Née l’Image d’un Trou Noir — Découverte 55',
    titleES: 'Cómo Nació la Imagen de un Agujero Negro — Descubrimiento 55',
    replacementsFR: [
      [/<html lang="en">/, '<html lang="fr">'],
      [/First Image of a Black Hole · Discovery 55/, 'Première Image d’un Trou Noir · Découverte 55'],
      [/aria-label="Return home"/, 'aria-label="Retour à l\'accueil"'],
      [/aria-label="Main navigation"/, 'aria-label="Navigation principale"'],
      [/>Home<\/a>/, '>Accueil</a>'],
      [/>Bonuses<\/a>/, '>Les bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratoire 3D</a>'],
      [/>Sources<\/a>/, '>Sources</a>'],
      [/>Discovery 55<\/span>/, '>Découverte 55</span>'],
      [/>Event Horizon Telescope<\/span>/, '>Event Horizon Telescope</span>'],
      [/>How a Black Hole Image Was Born<\/h1>/, '>Comment Est Née l’Image d’un Trou Noir</h1>'],
      [/>Sync Observatories<\/button>/, '>Synchroniser les observatoires</button>'],
      [/>Radio Wave Reconstruct<\/button>/, '>Reconstituer les ondes radio</button>'],
      [/>Shadow of M87\*<\/button>/, '>Ombre de M87*</button>'],
      [/Eight radio telescopes combined into an Earth-sized virtual aperture/,
       'Huit radiotélescopes combinés pour former une ouverture virtuelle de la taille de la Terre']
    ],
    replacementsES: [
      [/<html lang="en">/, '<html lang="es">'],
      [/First Image of a Black Hole · Discovery 55/, 'Primera Imagen de un Agujero Negro · Descubrimiento 55'],
      [/aria-label="Return home"/, 'aria-label="Volver al inicio"'],
      [/aria-label="Main navigation"/, 'aria-label="Navegación principal"'],
      [/>Home<\/a>/, '>Inicio</a>'],
      [/>Bonuses<\/a>/, '>Los bonus</a>'],
      [/>3D Lab<\/a>/, '>Laboratorio 3D</a>'],
      [/>Sources<\/a>/, '>Fuentes</a>'],
      [/>Discovery 55<\/span>/, '>Descubrimiento 55</span>'],
      [/>Event Horizon Telescope<\/span>/, '>Event Horizon Telescope</span>'],
      [/>How a Black Hole Image Was Born<\/h1>/, '>Cómo Nació la Imagen de un Agujero Negro</h1>'],
      [/>Sync Observatories<\/button>/, '>Sincronizar observatorios</button>'],
      [/>Radio Wave Reconstruct<\/button>/, '>Reconstruir ondas de radio</button>'],
      [/>Shadow of M87\*<\/button>/, '>Sombra de M87*</button>'],
      [/Eight radio telescopes combined into an Earth-sized virtual aperture/,
       'Ocho radiotelescopios combinados para crear una apertura virtual del tamaño de la Tierra']
    ]
  }
];

const flagRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;

for (const cfg of simConfigs) {
  const enPath = `assets/einstein/bonus/en/animazioni/${cfg.dir}/index.html`;
  const itPath = `assets/einstein/bonus/it/animazioni/${cfg.dir}/index.html`;
  const enContent = fs.readFileSync(enPath, 'utf8');

  // 1. Build FR
  let frContent = enContent;
  frContent = frContent.replace(flagRegex, renderSimFlagBar(cfg.dir, 'fr'));
  for (const [pattern, replacement] of cfg.replacementsFR) {
    frContent = frContent.replace(pattern, replacement);
  }
  // General text fixes in FR
  frContent = frContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio"/g, 'href="../../../../?lang=fr&pagina=inizio"');
  frContent = frContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus"/g, 'href="../../../../?lang=fr&pagina=bonus"');
  frContent = frContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti"/g, 'href="../../../../?lang=fr&pagina=fonti"');

  const frDir = `assets/einstein/bonus/fr/animazioni/${cfg.dir}`;
  fs.mkdirSync(frDir, { recursive: true });
  fs.writeFileSync(path.join(frDir, 'index.html'), frContent, 'utf8');
  fs.writeFileSync(path.join(frDir, cfg.namedFile), frContent, 'utf8');

  // 2. Build ES
  let esContent = enContent;
  esContent = esContent.replace(flagRegex, renderSimFlagBar(cfg.dir, 'es'));
  for (const [pattern, replacement] of cfg.replacementsES) {
    esContent = esContent.replace(pattern, replacement);
  }
  // General text fixes in ES
  esContent = esContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=inizio"/g, 'href="../../../../?lang=es&pagina=inizio"');
  esContent = esContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=bonus"/g, 'href="../../../../?lang=es&pagina=bonus"');
  esContent = esContent.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=en&pagina=fonti"/g, 'href="../../../../?lang=es&pagina=fonti"');

  const esDir = `assets/einstein/bonus/es/animazioni/${cfg.dir}`;
  fs.mkdirSync(esDir, { recursive: true });
  fs.writeFileSync(path.join(esDir, 'index.html'), esContent, 'utf8');
  fs.writeFileSync(path.join(esDir, cfg.namedFile), esContent, 'utf8');

  // 3. Update IT and EN flag bars
  let itContent = fs.readFileSync(itPath, 'utf8');
  itContent = itContent.replace(flagRegex, renderSimFlagBar(cfg.dir, 'it'));
  fs.writeFileSync(itPath, itContent, 'utf8');
  const itNamedPath = `assets/einstein/bonus/it/animazioni/${cfg.dir}/${cfg.namedFile}`;
  if (fs.existsSync(itNamedPath)) {
    fs.writeFileSync(itNamedPath, itContent, 'utf8');
  }

  let updatedEnContent = enContent.replace(flagRegex, renderSimFlagBar(cfg.dir, 'en'));
  fs.writeFileSync(enPath, updatedEnContent, 'utf8');
  const enNamedPath = `assets/einstein/bonus/en/animazioni/${cfg.dir}/${cfg.namedFile}`;
  if (fs.existsSync(enNamedPath)) {
    fs.writeFileSync(enNamedPath, updatedEnContent, 'utf8');
  }

  console.log(`✅ Generated 3D simulation ${cfg.dir} for FR and ES and updated IT/EN!`);
}
