const fs = require('fs');
const path = require('path');

// Read EN cards as template
const enCards = JSON.parse(fs.readFileSync('assets/einstein/bonus/en/carte/carte_en.json', 'utf8'));

const frCardsData = [
  {
    id: 1, group: 'A', theme: 'ANIMAUX', code: 'SC-01',
    question: 'Une pieuvre peut-elle chasser en équipe avec des poissons d’espèces différentes ?',
    answer: 'VRAI',
    explanation: 'Oui. Des chercheurs ont observé des groupes mixtes chasser des proies ensemble, avec une répartition des rôles entre la pieuvre et les poissons.',
    image_title: 'La pieuvre fait équipe'
  },
  {
    id: 2, group: 'A', theme: 'ANIMAUX', code: 'SC-03',
    question: 'Les éléphants utilisent-ils des prénoms exactement comme nous ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Certains signaux vocaux semblent s’adresser à des individus précis. On ignore encore s’ils fonctionnent en tout point comme les prénoms humains.',
    image_title: 'Les éléphants et leurs appels'
  },
  {
    id: 3, group: 'A', theme: 'ANIMAUX', code: 'SC-04',
    question: 'Les orques utilisent-elles des algues pour pêcher des palourdes au fond de l’eau ?',
    answer: 'FAUX',
    explanation: 'Ce n’est pas ce qui a été documenté. Certaines orques font rouler des morceaux de varech sur leur corps, comme un soin ou un jeu social.',
    image_title: 'Les orques et l’algue'
  },
  {
    id: 4, group: 'A', theme: 'ANIMAUX', code: 'SC-04',
    question: 'Sait-on avec certitude pourquoi les orques se frottent contre des algues ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Non. Soin de la peau, élimination des parasites ou lien social sont des hypothèses intéressantes, mais la fonction précise reste à élucider.',
    image_title: 'Les orques et l’algue'
  },
  {
    id: 5, group: 'A', theme: 'ANIMAUX', code: 'SC-05',
    question: 'Les baleines à bosse peuvent-elles piéger leurs proies grâce à des spirales de bulles d’air ?',
    answer: 'VRAI',
    explanation: 'Oui ! Elles soufflent un rideau de bulles circulaires sous l’eau pour rassembler les poissons et les poissons n’osent pas traverser cette barrière.',
    image_title: 'La baleine et les bulles'
  },
  {
    id: 6, group: 'A', theme: 'ANIMAUX', code: 'SC-06',
    question: 'Dans l’expérience scientifique, les corbeaux ont-ils compté jusqu’à cent ?',
    answer: 'FAUX',
    explanation: 'Non. Les corbeaux ont produit de 1 à 4 sons vocaux en réponse à des signaux, ce qui montre un contrôle numérique remarquable, mais pas jusqu’à 100.',
    image_title: 'Les corbeaux savent compter'
  },
  {
    id: 7, group: 'A', theme: 'ANIMAUX', code: 'SC-02',
    question: 'Un cacatoès à huppe jaune peut-il apprendre à ouvrir une fontaine pour boire ?',
    answer: 'VRAI',
    explanation: 'Oui. À Sydney, des cacatoès sauvages ont appris à soulever et tourner des robinets publics avec leur bec pour boire de l’eau fraîche.',
    image_title: 'Le cacatoès ouvre le robinet'
  },
  {
    id: 8, group: 'A', theme: 'ANIMAUX', code: 'SC-16',
    question: 'Les bourdons qui font rouler des billes ressentent-ils de la joie exactement comme les humains ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Les bourdons jouent avec des billes sans aucune récompense alimentaire, ce qui évoque le jeu, mais on ne peut pas affirmer qu’ils ressentent des émotions humaines.',
    image_title: 'Les bourdons qui jouent'
  },
  {
    id: 9, group: 'B', theme: 'PLANTES', code: 'SC-09',
    question: 'Les plantes stressées émettent-elles des sons inaudibles pour l’oreille humaine ?',
    answer: 'VRAI',
    explanation: 'Oui. Lorsqu’elles manquent d’eau ou sont coupées, les plantes émettent des cliquetis ultrasoniques de haute fréquence dans l’air.',
    image_title: 'La plante qu’on n’entend pas'
  },
  {
    id: 10, group: 'B', theme: 'PLANTES', code: 'SC-13',
    question: 'Une fougère possédant cinquante fois plus d’ADN qu’un humain est-elle plus intelligente ?',
    answer: 'FAUX',
    explanation: 'Pas du tout ! La quantité totale d’ADN d’un organisme n’a aucun rapport avec l’intelligence ou la complexité.',
    image_title: 'La fougère au super-ADN'
  },
  {
    id: 11, group: 'B', theme: 'PLANTES', code: 'SC-09',
    question: 'Les plantes émettent-elles des ultrasons dans le but intentionnel de bavarder entre elles ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Ce sont des bruits physiques provoqués par de minuscules bulles éclatant dans leurs tiges. Rien ne prouve qu’il s’agisse d’un langage intentionnel.',
    image_title: 'La plante qu’on n’entend pas'
  },
  {
    id: 12, group: 'B', theme: 'PLANTES', code: 'SC-12',
    question: 'Des graines ont-elles déjà germé dans de vrais échantillons de poussière lunaire ?',
    answer: 'VRAI',
    explanation: 'Oui. Des graines d’arabette des dames ont germé dans de la terre lunaire rapportée par les missions Apollo, bien que les plantes aient montré des signes de stress.',
    image_title: 'Pousses sur la Lune'
  },
  {
    id: 13, group: 'B', theme: 'PLANTES', code: 'SC-14',
    question: 'Existe-t-il des plantes carnivores dont les urnes pièges sont entièrement enterrées sous le sol ?',
    answer: 'VRAI',
    explanation: 'Oui ! Nepenthes pudica produit des pièges souterrains pour capturer des proies vivant sous terre, comme des acariens et des fourmis.',
    image_title: 'Le piège sous terre'
  },
  {
    id: 14, group: 'B', theme: 'PLANTES', code: 'SC-11',
    question: 'Toutes les spores de plantes et de mousses peuvent-elles survivre indéfiniment dans le vide spatial ?',
    answer: 'FAUX',
    explanation: 'Non. Certaines spores de mousses survivent à des conditions spatiales extrêmes lors d’expériences en orbite, mais pas toutes ni indéfiniment.',
    image_title: 'Spores spatiales'
  },
  {
    id: 15, group: 'C', theme: 'EXPÉRIENCES', code: 'SC-15',
    question: 'Un poisson rouge peut-il diriger un véhicule à roues sur la terre ferme ?',
    answer: 'VRAI',
    explanation: 'Oui ! Des scientifiques ont placé un aquarium sur un robot motorisé : une caméra suit les mouvements du poisson et dirige les roues dans la même direction.',
    image_title: 'Le poisson prend le volant'
  },
  {
    id: 16, group: 'C', theme: 'EXPÉRIENCES', code: 'SC-15',
    question: 'Le poisson rouge conduisait-il le véhicule grâce à un tout petit volant sous l’eau ?',
    answer: 'FAUX',
    explanation: 'Non. Le poisson n’avait pas de commandes physiques : c’est un ordinateur qui détectait sa position dans le bocal et traduisait ses déplacements en virages.',
    image_title: 'Le poisson prend le volant'
  },
  {
    id: 17, group: 'C', theme: 'EXPÉRIENCES', code: 'SC-16',
    question: 'Les bourdons ont-ils fait rouler des billes même sans aucune récompense sucrée ?',
    answer: 'VRAI',
    explanation: 'Oui. Les chercheurs ont constaté que les bourdons faisaient rouler les billes de bois spontanément, ce qui suggère une activité ludique sans besoin de nourriture.',
    image_title: 'Les bourdons et les billes'
  },
  {
    id: 18, group: 'C', theme: 'EXPÉRIENCES', code: 'SC-19',
    question: 'Les scientifiques savent-ils exactement ce que pense chaque chat face à une ouverture étroite ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Les expériences montrent que les chats évaluent les fentes en fonction de leur hauteur et largeur, mais leurs pensées intimes restent un mystère félin !',
    image_title: 'Le chat et la fente'
  },
  {
    id: 19, group: 'C', theme: 'EXPÉRIENCES', code: 'SC-20',
    question: 'Réussir une sauce cacio e pepe bien crémeuse sans grumeaux n’est qu’une simple question de chance ?',
    answer: 'FAUX',
    explanation: 'C’est de la physique ! Des chercheurs ont démontré que la température de l’eau et l’amidon des pâtes créent une émulsion stable parfaite.',
    image_title: 'La physique des pâtes'
  },
  {
    id: 20, group: 'D', theme: 'DINOSAURES', code: 'SC-23',
    question: 'Peut-on cloner un T. rex vivant aujourd’hui à partir de sang de moustique piégé dans l’ambre ?',
    answer: 'FAUX',
    explanation: 'C’est une fiction de cinéma. L’ADN se dégrade complètement après quelques millions d’années ; après 66 millions d’années, il n’en reste rien.',
    image_title: 'Cloner un dinosaure'
  },
  {
    id: 21, group: 'D', theme: 'DINOSAURES', code: 'SC-22',
    question: 'Les oiseaux modernes sont-ils de véritables dinosaures théropodes ayant survécu à l’extinction ?',
    answer: 'VRAI',
    explanation: 'Oui ! Pour la science, les oiseaux sont des dinosaures aviaires bien vivants, les seuls ayant survécu à la grande extinction il y a 66 millions d’années.',
    image_title: 'Dinosaures à plumes'
  },
  {
    id: 22, group: 'D', theme: 'DINOSAURES', code: 'SC-22',
    question: 'La poule domestique est-elle la petite-fille directement descendue du T. rex ?',
    answer: 'FAUX',
    explanation: 'Non. Les oiseaux descendent de petits dinosaures théropodes carnivores à plumes, pas du gigantesque Tyrannosaurus rex.',
    image_title: 'Un dinosaure dans le poulailler'
  },
  {
    id: 23, group: 'D', theme: 'DINOSAURES', code: 'SC-21',
    question: 'Les paléontologues savent-ils avec certitude absolue à quoi servaient les toutes premières plumes ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Non. Chaleur, parade nuptiale, camouflage ou défense : les plumes existaient bien avant l’apparition du vol, mais leur première utilité fait débat.',
    image_title: 'Dinosaures à plumes'
  },
  {
    id: 24, group: 'D', theme: 'DINOSAURES', code: 'SC-26',
    question: 'Verra-t-on un jour un oiseau vivant en tout point identique au dodo disparu ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'La génétique peut créer des pigeons modifiés ressemblant au dodo, mais recréer un être vivant 100 % identique à une espèce disparue reste incertain.',
    image_title: 'Le dodo peut-il revenir'
  },
  {
    id: 25, group: 'E', theme: 'INVENTIONS', code: 'SC-32',
    question: 'À l’avenir, toutes les fenêtres des maisons seront-elles obligatoirement faites en bois transparent ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Le bois transparent existe en laboratoire et isole très bien la chaleur, mais son utilisation industrielle à grande échelle dépendra des coûts et de la fabrication.',
    image_title: 'Bois transparent'
  },
  {
    id: 26, group: 'E', theme: 'INVENTIONS', code: 'SC-36',
    question: 'Le mycélium de champignon contrôle-t-il un robot parce qu’il possède un cerveau conscient ?',
    answer: 'FAUX',
    explanation: 'Non. Les chercheurs captent les minuscules signaux électriques naturels produits par le champignon pour commander les moteurs d’un robot sans aucun cerveau.',
    image_title: 'Champignon robot'
  },
  {
    id: 27, group: 'E', theme: 'INVENTIONS', code: 'SC-39',
    question: 'Certaines graines de plantes se tordent-elles pour s’enfoncer dans le sol rien qu’avec l’humidité ?',
    answer: 'VRAI',
    explanation: 'Oui ! Les graines d’Erodium s’enroulent en tire-bouchon quand l’air est sec et se détendent avec l’humidité, forant la terre sans aucun moteur.',
    image_title: 'Graine tire-bouchon'
  },
  {
    id: 28, group: 'E', theme: 'INVENTIONS', code: 'SC-34',
    question: 'La trompe d’éléphant sera-t-elle toujours le meilleur modèle pour construire n’importe quel robot ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Tout dépend de la mission du robot. S’inspirer de la nature est génial, mais chaque problème d’ingénierie réclame une solution adaptée.',
    image_title: 'Trompe de robot'
  },
  {
    id: 29, group: 'F', theme: 'CORPS', code: 'SC-43',
    question: 'Existe-t-il des prothèses expérimentales commandées directement par les signaux biologiques du corps ?',
    answer: 'VRAI',
    explanation: 'Oui. Des prothèses bioniques de genou reçoivent des signaux neuromusculaires pour reproduire une démarche fluide et naturelle.',
    image_title: 'Le genou bionique'
  },
  {
    id: 30, group: 'F', theme: 'CORPS', code: 'SC-44',
    question: 'Un implant rétinien expérimental redonne-t-il une vue parfaite de 10/10 à n’importe quelle personne aveugle ?',
    answer: 'FAUX',
    explanation: 'Non. Les implants rétiniens offrent des perceptions de contrastes et de formes lumineuses très utiles, mais pas une vision normale ou parfaite.',
    image_title: 'Aide visuelle bionique'
  },
  {
    id: 31, group: 'F', theme: 'CORPS', code: 'SC-46',
    question: 'Les implants cérébraux de parole aideront-ils bientôt toutes les personnes privées de voix ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Les résultats récents décodant la pensée en mots sont spectaculaires, mais des années de recherche et d’essais cliniques restent nécessaires.',
    image_title: 'Retrouver la voix'
  },
  {
    id: 32, group: 'G', theme: 'ESPACE', code: 'SC-55',
    question: 'L’image du trou noir M87* a-t-elle été obtenue en combinant des radiotélescopes répartis sur toute la Terre ?',
    answer: 'VRAI',
    explanation: 'Oui ! Le télescope Event Horizon a relié huit observatoires à travers le monde pour former un télescope virtuel géant de la taille de notre planète.',
    image_title: 'Image du trou noir'
  },
  {
    id: 33, group: 'G', theme: 'ESPACE', code: 'SC-55',
    question: 'La première image d’un trou noir a-t-elle été prise avec un simple appareil photo numérique dans l’espace ?',
    answer: 'FAUX',
    explanation: 'Absolument pas. L’image a été reconstituée par supercalculateur à partir de pétaoctets de signaux radioélectriques invisibles à l’œil nu.',
    image_title: 'Image du trou noir'
  },
  {
    id: 34, group: 'G', theme: 'ESPACE', code: 'SC-52',
    question: 'Les astronomes savent-ils exactement combien de comètes interstellaires visiteront notre Système solaire d’ici dix ans ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Non. Ces voyageuses venues d’autres étoiles sont imprévisibles et dépendent de la sensibilité des futurs télescopes de surveillance du ciel.',
    image_title: 'Comète interstellaire'
  },
  {
    id: 35, group: 'G', theme: 'ESPACE', code: 'SC-52',
    question: 'La comète 3I/ATLAS restera-t-elle pour toujours en orbite fermée autour de notre Soleil ?',
    answer: 'FAUX',
    explanation: 'Non. Sa trajectoire est hyperbolique : elle traverse notre Système solaire à toute vitesse puis s’en ira à jamais dans l’espace lointain.',
    image_title: 'Comète interstellaire'
  },
  {
    id: 36, group: 'G', theme: 'ESPACE', code: 'SC-54',
    question: 'Une grande ville habitée existera-t-elle avec certitude sur Mars avant l’année 2040 ?',
    answer: 'ON NE SAIT PAS ENCORE',
    explanation: 'Les agences spatiales préparent des missions habitées, mais bâtir une ville entière sur Mars exige de surmonter d’immenses défis technologiques.',
    image_title: 'Une ville sur Mars'
  }
];

const esCardsData = [
  {
    id: 1, group: 'A', theme: 'ANIMALES', code: 'SC-01',
    question: '¿Puede un pulpo cazar en equipo con peces de diferentes especies?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Los científicos han documentado grupos mixtos que buscan alimento juntos, repartiéndose diferentes funciones entre el pulpo y los peces.',
    image_title: 'El pulpo hace equipo'
  },
  {
    id: 2, group: 'A', theme: 'ANIMALES', code: 'SC-03',
    question: '¿Utilizan los elefantes nombres personales exactamente igual que nosotros?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Algunas llamadas vocales parecen dirigidas a elefantes concretos, pero aún no sabemos si funcionan en todo igual que nuestros nombres.',
    image_title: 'Los elefantes y sus llamadas'
  },
  {
    id: 3, group: 'A', theme: 'ANIMALES', code: 'SC-04',
    question: '¿Utilizan las orcas las algas marinas para pescar almejas en el fondo marino?',
    answer: 'FALSO',
    explanation: 'Eso no es lo que han observado los científicos. Algunas orcas hacen rodar trozos de algas entre sus cuerpos como aseo o juego social.',
    image_title: 'Las orcas y su herramienta de algas'
  },
  {
    id: 4, group: 'A', theme: 'ANIMALES', code: 'SC-04',
    question: '¿Sabemos con certeza absoluta por qué las orcas se frotan con algas marinas?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'No. El cuidado de la piel, aliviar parásitos y el contacto social son hipótesis muy interesantes, pero su función exacta sigue en estudio.',
    image_title: 'Las orcas y su herramienta de algas'
  },
  {
    id: 5, group: 'A', theme: 'ANIMALES', code: 'SC-05',
    question: '¿Pueden las ballenas jorobadas acorralar a sus presas creando redes de burbujas de aire?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Expulsan espirales de burbujas bajo el agua para concentrar los peces, que no se atreven a cruzar la barrera brillante.',
    image_title: 'La ballena y su red de burbujas'
  },
  {
    id: 6, group: 'A', theme: 'ANIMALES', code: 'SC-06',
    question: 'En el experimento científico, ¿contaron los cuervos números hasta el cien?',
    answer: 'FALSO',
    explanation: 'No. Los cuervos emitieron de uno a cuatro sonidos según las señales visuales, demostrando gran control numérico pero no hasta cien.',
    image_title: 'Los cuervos saben contar'
  },
  {
    id: 7, group: 'A', theme: 'ANIMALES', code: 'SC-02',
    question: '¿Puede una cacatúa aprender a abrir una fuente pública para beber agua?',
    answer: 'VERDADERO',
    explanation: '¡Sí! En Sídney, cacatúas salvajes aprendieron a sujetar y girar los grifos de fuentes públicas con el pico para conseguir agua fresca.',
    image_title: 'El truco del cacatúa para beber'
  },
  {
    id: 8, group: 'A', theme: 'ANIMALES', code: 'SC-16',
    question: '¿Sienten los abejorros que hacen rodar bolas de madera la misma alegría que los humanos?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Hacen rodar bolas de madera sin recibir comida a cambio, lo que parece puro juego, pero no podemos asegurar que sientan emociones humanas.',
    image_title: 'Abejorros jugando a la pelota'
  },
  {
    id: 9, group: 'B', theme: 'PLANTAS', code: 'SC-09',
    question: '¿Emiten las plantas estresadas sonidos que los oídos humanos no pueden escuchar?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Cuando sufren falta de agua o se les cortan tallos, emiten clics ultrasónicos de alta frecuencia a través del aire.',
    image_title: 'La planta que no puedes oír'
  },
  {
    id: 10, group: 'B', theme: 'PLANTAS', code: 'SC-13',
    question: '¿Tener cincuenta veces más ADN que un ser humano hace que un helecho sea más inteligente?',
    answer: 'FALSO',
    explanation: '¡Para nada! El tamaño del genoma no tiene ninguna relación con la inteligencia ni con la superioridad evolutiva.',
    image_title: 'El helecho con ADN gigante'
  },
  {
    id: 11, group: 'B', theme: 'PLANTAS', code: 'SC-09',
    question: '¿Emiten las plantas ultrasonidos con la intención voluntaria de charlar entre ellas?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Son ruidos físicos causados por diminutas burbujas que estallan en sus conductos internos; no hay pruebas de que sea una conversación consciente.',
    image_title: 'La planta que no puedes oír'
  },
  {
    id: 12, group: 'B', theme: 'PLANTAS', code: 'SC-12',
    question: '¿Han germinado alguna vez semillas en auténtica tierra y polvo de la Luna?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Semillas de Arabidopsis brotaron en muestras de regolito lunar traídas por las misiones Apolo, aunque crecieron con cierto estrés biológico.',
    image_title: 'Brotes en polvo lunar'
  },
  {
    id: 13, group: 'B', theme: 'PLANTAS', code: 'SC-14',
    question: '¿Existen plantas carnívoras con trampas completamente enterradas bajo el suelo?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Nepenthes pudica desarrolla sus jarros trampa bajo tierra para cazar pequeños insectos y ácaros subterráneos.',
    image_title: 'La trampa bajo tierra'
  },
  {
    id: 14, group: 'B', theme: 'PLANTAS', code: 'SC-11',
    question: '¿Pueden todas las esporas de musgos sobrevivir sin límite de tiempo en el vacío espacial?',
    answer: 'FALSO',
    explanation: 'No. Algunas esporas demostraron una resistencia asombrosa en el espacio exterior, pero no todas sobreviven ni pueden hacerlo eternamente.',
    image_title: 'Esporas en el espacio'
  },
  {
    id: 15, group: 'C', theme: 'EXPERIMENTOS', code: 'SC-15',
    question: '¿Puede un pez de colores conducir un vehículo con ruedas sobre tierra firme?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Los científicos colocaron una pecera sobre una plataforma robótica con ruedas: una cámara seguía al pez y movía el vehículo hacia donde nadaba.',
    image_title: 'El pez que conduce un vehículo'
  },
  {
    id: 16, group: 'C', theme: 'EXPERIMENTOS', code: 'SC-15',
    question: '¿Conducía el pez de colores el vehículo sujetando un volantito diminuto bajo el agua?',
    answer: 'FALSO',
    explanation: 'No. El pez no tocaba ningún mando: un ordenador detectaba su posición y convertía sus desplazamientos en órdenes de giro para las ruedas.',
    image_title: 'El pez que conduce un vehículo'
  },
  {
    id: 17, group: 'C', theme: 'EXPERIMENTOS', code: 'SC-16',
    question: '¿Hicieron rodar los abejorros bolas de madera incluso cuando no había comida de premio?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Los abejorros rodaban las bolitas de forma voluntaria sin recompensa dulce, lo que sugiere un comportamiento de juego espontáneo.',
    image_title: 'Abejorros jugando a la pelota'
  },
  {
    id: 18, group: 'C', theme: 'EXPERIMENTOS', code: 'SC-19',
    question: '¿Saben los científicos exactamente qué piensa cada gato ante una rendija estrecha?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Los estudios muestran que los gatos calculan el tamaño de las aberturas según su altura y anchura, pero sus pensamientos siguen siendo un enigma felino.',
    image_title: '¿Puede un gato pasar?'
  },
  {
    id: 19, group: 'C', theme: 'EXPERIMENTOS', code: 'SC-20',
    question: '¿Es conseguir una salsa cremosa de pasta cacio e pepe una simple cuestión de suerte?',
    answer: 'FALSO',
    explanation: '¡Es pura física! Investigadores demostraron cómo la temperatura exacta y el almidón del agua de cocción crean una emulsión perfecta y sin grumos.',
    image_title: 'La física en los espaguetis'
  },
  {
    id: 20, group: 'D', theme: 'DINOSAURIOS', code: 'SC-23',
    question: '¿Podemos clonar hoy un T. rex vivo a partir de sangre de mosquito atrapado en ámbar?',
    answer: 'FALSO',
    explanation: 'Es solo una genial película de ciencia ficción. El ADN se destruye por completo con el paso de los millones de años; tras 66 millones de años no queda nada.',
    image_title: '¿Se puede clonar un dinosaurio?'
  },
  {
    id: 21, group: 'D', theme: 'DINOSAURIOS', code: 'SC-22',
    question: '¿Son las aves actuales dinosaurios terópodos vivos que sobrevivieron a la extinción?',
    answer: 'VERDADERO',
    explanation: '¡Sí! En biología, las aves son dinosaurios aviares vivos, los únicos supervivientes de la gran extinción masiva de hace 66 millones de años.',
    image_title: 'Dinosaurios con plumas'
  },
  {
    id: 22, group: 'D', theme: 'DINOSAURIOS', code: 'SC-22',
    question: '¿Es la gallina doméstica la nieta directa descendiente del T. rex?',
    answer: 'FALSO',
    explanation: 'No. Las aves descienden de pequeños dinosaurios terópodos carnívoros con plumas, no del enorme Tyrannosaurus rex.',
    image_title: 'Un dinosaurio en el gallinero'
  },
  {
    id: 23, group: 'D', theme: 'DINOSAURIOS', code: 'SC-21',
    question: '¿Saben los paleontólogos con total certeza para qué servían las primerísimas plumas?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'No. Abrigo térmico, exhibición para cortejo o camuflaje son hipótesis abiertas; las plumas surgieron mucho antes de que ningún dinosaurio volara.',
    image_title: 'Dinosaurios con plumas'
  },
  {
    id: 24, group: 'D', theme: 'DINOSAURIOS', code: 'SC-26',
    question: '¿Llegaremos a ver algún día un ave viva idéntica en todo al desaparecido dodo?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'La edición genética puede crear palomas muy parecidas al dodo, pero recrear exactamente la especie original perdida es un debate científico abierto.',
    image_title: '¿Podría volver el dodo?'
  },
  {
    id: 25, group: 'E', theme: 'INVENTOS', code: 'SC-32',
    question: '¿Estarán todas las ventanas de las casas hechas obligatoriamente de madera transparente en el futuro?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'La madera transparente existe en laboratorios y aísla muy bien, pero su adopción masiva dependerá de costes, producción y durabilidad.',
    image_title: 'Madera transparente'
  },
  {
    id: 26, group: 'E', theme: 'INVENTOS', code: 'SC-36',
    question: '¿Controla el micelio de un hongo a un biorrobot porque tiene un cerebro consciente?',
    answer: 'FALSO',
    explanation: 'No. Los circuitos recogen las diminutas señales eléctricas naturales del hongo y las traducen en órdenes de movimiento para los motores del robot.',
    image_title: 'Un hongo conectado a un robot'
  },
  {
    id: 27, group: 'E', theme: 'INVENTOS', code: 'SC-39',
    question: '¿Se retuercen algunas semillas vegetales para enterrarse solas usando únicamente la humedad?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Las semillas de Erodium tienen forma de sacacorchos y giran cuando cambia la humedad del aire, clavándose en la tierra sin ningún motor.',
    image_title: 'Una semilla con sacacorchos'
  },
  {
    id: 28, group: 'E', theme: 'INVENTOS', code: 'SC-34',
    question: '¿Será la trompa de elefante siempre el mejor diseño posible para cualquier robot futuro?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Depende de la tarea del robot. Imitar la naturaleza es una gran fuente de inspiración, pero no todas las máquinas necesitan una trompa flexible.',
    image_title: 'Una trompa para robots'
  },
  {
    id: 29, group: 'F', theme: 'CUERPO', code: 'SC-43',
    question: '¿Existen prótesis experimentales guiadas directamente por señales biológicas del cuerpo?',
    answer: 'VERDADERO',
    explanation: '¡Sí! Hay prótesis biónicas de rodilla que captan impulsos neuromusculares para reproducir una forma de andar fluida y natural.',
    image_title: 'La rodilla biónica'
  },
  {
    id: 30, group: 'F', theme: 'CUERPO', code: 'SC-44',
    question: '¿Devuelve un implante de retina experimental una visión 20/20 perfecta a cualquier persona ciega?',
    answer: 'FALSO',
    explanation: 'No. La tecnología actual permite percibir luces, formas y contrastes que ayudan enormemente, pero no devuelve una visión nítida y completa.',
    image_title: 'Una ayuda para volver a ver'
  },
  {
    id: 31, group: 'F', theme: 'CUERPO', code: 'SC-46',
    question: '¿Podrán los implantes cerebrales de voz ayudar pronto a todas las personas que no pueden hablar?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Los dispositivos que traducen actividad cerebral en habla son prometedores, pero aún necesitan años de perfeccionamiento y ensayos clínicos.',
    image_title: 'Recuperar la voz'
  },
  {
    id: 32, group: 'G', theme: 'ESPACIO', code: 'SC-55',
    question: '¿Nació la imagen del agujero negro M87* combinando datos de radiotelescopios de todo el planeta?',
    answer: 'VERDADERO',
    explanation: '¡Sí! El Event Horizon Telescope unió observatorios por todo el mundo para crear un telescopio virtual del tamaño de la propia Tierra.',
    image_title: 'La primera imagen de un agujero negro'
  },
  {
    id: 33, group: 'G', theme: 'ESPACIO', code: 'SC-55',
    question: '¿Se fotografió el primer agujero negro con una cámara digital normal desde el espacio?',
    answer: 'FALSO',
    explanation: 'No. Los agujeros negros no dejan escapar la luz visible: la imagen se reconstruyó mediante superordenadores a partir de ondas de radio invisibles.',
    image_title: 'La primera imagen de un agujero negro'
  },
  {
    id: 34, group: 'G', theme: 'ESPACIO', code: 'SC-52',
    question: '¿Saben los astrónomos cuántos cometas interestelares cruzarán nuestro Sistema solar la próxima década?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'No. Proceden de otras estrellas y sus visitas son impredecibles; descubrirlos depende de la potencia de los telescopios de rastreo.',
    image_title: 'Un cometa interestelar'
  },
  {
    id: 35, group: 'G', theme: 'ESPACIO', code: 'SC-52',
    question: '¿Se quedará el cometa 3I/ATLAS para siempre en una órbita cerrada alrededor del Sol?',
    answer: 'FALSO',
    explanation: 'No. Su trayectoria es abierta e hiperbólica: atraviesa nuestro Sistema solar a gran velocidad y continuará su viaje por el espacio interestelar.',
    image_title: 'Un cometa interestelar'
  },
  {
    id: 36, group: 'G', theme: 'ESPACIO', code: 'SC-54',
    question: '¿Habrá con total certeza una gran ciudad habitada en Marte antes del año 2040?',
    answer: 'NO LO SABEMOS TODAVÍA',
    explanation: 'Existen planes de misiones tripuladas, pero establecer una ciudad permanente en Marte plantea retos tecnológicos inmensos aún por resolver.',
    image_title: '¿Una ciudad en Marte?'
  }
];

function buildCardsJSON(baseCards, translationList, lang) {
  return baseCards.map((b, i) => {
    const t = translationList[i];
    return {
      id: b.id,
      group: b.group,
      theme: t.theme,
      code: b.code,
      question: t.question,
      answer: t.answer,
      explanation: t.explanation,
      source: b.source,
      old_code: b.old_code,
      image: b.image,
      image_title: t.image_title,
      credit: lang === 'fr' ? 'Reconstitution illustrée basée sur les documents du livre' : 'Reconstrucción ilustrada a partir de los materiales del libro'
    };
  });
}

function buildCSV(cards) {
  const header = 'id,group,theme,code,question,answer,explanation,source';
  const rows = cards.map(c => {
    const q = `"${c.question.replace(/"/g, '""')}"`;
    const exp = `"${c.explanation.replace(/"/g, '""')}"`;
    return `${c.id},${c.group},${c.theme},${c.code},${q},${c.answer},${exp},${c.source}`;
  });
  return [header, ...rows].join('\n') + '\n';
}

const frCards = buildCardsJSON(enCards, frCardsData, 'fr');
const esCards = buildCardsJSON(enCards, esCardsData, 'es');

fs.mkdirSync('assets/einstein/bonus/fr/carte', { recursive: true });
fs.mkdirSync('assets/einstein/bonus/es/carte', { recursive: true });

fs.writeFileSync('assets/einstein/bonus/fr/carte/carte_fr.json', JSON.stringify(frCards, null, 2), 'utf8');
fs.writeFileSync('assets/einstein/bonus/es/carte/carte_es.json', JSON.stringify(esCards, null, 2), 'utf8');

fs.writeFileSync('assets/einstein/bonus/fr/carte/CARTE_36_DATI.csv', buildCSV(frCards), 'utf8');
fs.writeFileSync('assets/einstein/bonus/es/carte/CARTE_36_DATI.csv', buildCSV(esCards), 'utf8');

// Copy shared PDFs and assets
const sharedFiles = [
  'ANTEPRIMA_36_CARTE.jpg',
  'ANTEPRIMA_A4.png',
  'OTTO_CARTE_36_FRONTE_RETRO_A4.pdf',
  'OTTO_CARTE_36_SOLO_FRONTE_A4.pdf',
  'OTTO_GUIDA_PREMIUM.pdf',
  'OTTO_GUIDA_REGOLE_E_SOLUZIONI.pdf'
];

for (const f of sharedFiles) {
  const src = path.join('assets/einstein/bonus/en/carte', f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join('assets/einstein/bonus/fr/carte', f));
    fs.copyFileSync(src, path.join('assets/einstein/bonus/es/carte', f));
  }
}

// Copy assets directory (otto.webp, sala images)
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}
copyDirSync('assets/einstein/bonus/en/carte/assets', 'assets/einstein/bonus/fr/carte/assets');
copyDirSync('assets/einstein/bonus/en/carte/assets', 'assets/einstein/bonus/es/carte/assets');

console.log('✅ Generated carte_fr.json, carte_es.json, CSVs and copied assets!');
