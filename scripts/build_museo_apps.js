const fs = require('fs');

function generateMuseoApp(lang) {
  const isFR = lang === 'fr';

  const storeKey = isFR ? 'otto-museo-fr-progress-v1' : 'otto-museo-es-progress-v1';

  const ROOMS = isFR ? [
    {
      id: 1, slug: 'animali', label: 'Animaux Extraordinaires', title: 'L’Océan Cache des Indices',
      teaser: 'Une algue peut-elle devenir un outil ? Et des bulles d’air un filet de pêche ?',
      art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '🌊', seal: 'Lentille Marine',
      kicker: 'SALLE 01 · ANIMAUX EXTRAORDINAIRES',
      intro: 'Certains animaux surprennent la science non pas par magie, mais parce qu’ils font des choses que personne n’attendait.',
      question: 'Une vidéo peut nous montrer ce qui se passe. Mais peut-elle nous en donner immédiatement la raison ?',
      mainTitle: 'Le Cas du Varech Mystérieux',
      main: 'Dans la mer des Salish, des chercheurs ont filmé des orques arrachant du varech et le faisant rouler entre leurs corps. Observer un comportement est une chose ; prouver sa fonction exacte en est une autre.',
      challenge: 'prove',
      source: { code: 'SC-04', title: 'Étude comportementale sur les orques (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
      side: {
        title: 'Le Filet de Bulles de la Baleine', label: 'Autre Objet Exposé',
        desc: 'Certaines baleines à bosse soufflent des rideaux circulaires de bulles d’air pour piéger les poissons. Les bulles ne sont pas des murs solides, mais elles modifient le comportement des proies.',
        source: { code: 'SC-05', title: 'Recherche sur le filet de bulles (Royal Society)', url: 'https://doi.org/10.1098/rsos.240328' }
      },
      questionHint: 'Observe attentivement l’algue, mais regarde surtout ce que les animaux en font.'
    },
    {
      id: 2, slug: 'piante', label: 'Plantes et Mondes Invisibles', title: 'Un Jardin Inattendu',
      teaser: 'Des pousses dans la poussière lunaire et des fougères au génome colossal.',
      art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '🌿', seal: 'Pousse Lunaire',
      kicker: 'SALLE 02 · PLANTES ET MONDES INVISIBLES',
      intro: 'Les plantes semblent immobiles, mais elles sont pleines de réactions surprenantes. Même la poussière de Lune a fait l’objet d’une étude fascinante.',
      question: 'Pour tester si une plante pousse vraiment dans le sol lunaire, à quoi les scientifiques doivent-ils la comparer ?',
      mainTitle: 'Graines et Poussière Lunaire',
      main: 'En laboratoire, des graines ont germé dans de petites quantités de régolithe lunaire rapportées par les missions Apollo. Cependant, les plantules ont montré des signes nets de stress biologique.',
      challenge: 'terreno',
      source: { code: 'SC-12', title: 'Plantes dans le régolithe lunaire (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
      side: {
        title: 'La Fougère qui a Étonné la Génétique', label: 'Autre Objet Exposé',
        desc: 'Une minuscule fougère du genre Tmesipteris possède un génome monumental. La quantité totale d’ADN ne dicte pas l’intelligence : c’est une curiosité biologique à comprendre dans son contexte.',
        source: { code: 'SC-13', title: 'Analyse génomique de Tmesipteris (iScience)', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
      },
      questionHint: 'Dans une expérience scientifique, ne change jamais qu’une seule variable à la fois.'
    },
    {
      id: 3, slug: 'esperimenti', label: 'Expériences Surprenantes', title: 'Le Poisson à Quatre Roues',
      teaser: 'Qui conduit vraiment un aquarium motorisé ?',
      art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '🔬', seal: 'Inventeur Curieux',
      kicker: 'SALLE 03 · EXPÉRIENCES SURPRENANTES',
      intro: 'Une expérience scientifique n’est pas un tour de magie : c’est une chaîne d’étapes que l’on peut reconstituer, contrôler et expliquer.',
      question: 'Comment un poisson peut-il déplacer un véhicule sans toucher les roues ?',
      mainTitle: 'Reconstruire le Dispositif de Laboratoire',
      main: 'Dans une étude insolite, des chercheurs ont placé un bocal sur une plateforme robotisée. Une caméra suivait les déplacements du poisson rouge et traduisait ses mouvements de nage en commandes de direction pour les roues.',
      challenge: 'sequenza',
      source: { code: 'SC-15', title: 'Navigation d’un poisson rouge sur terre (Behavioural Brain Research)', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
      side: {
        title: 'Des Bourdons qui Jouent au Ballon', label: 'Autre Objet Exposé',
        desc: 'Des bourdons ont fait rouler de petites billes de bois sans obtenir de récompense en nourriture. Les scientifiques se demandent si cela s’apparente au jeu.',
        source: { code: 'SC-16', title: 'Activité de jeu chez les bourdons (Animal Behaviour)', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
      },
      questionHint: 'Suis le cheminement de l’information : de l’œil au signal, puis du moteur au mouvement.'
    },
    {
      id: 4, slug: 'dinosauri', label: 'Dinosaures, Extinctions et ADN', title: 'Tous les Dinosaures n’ont pas Disparu',
      teaser: 'Oiseaux à plumes et le grand requin mégalodon.',
      art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-curioso', icon: '🦖', seal: 'Fossile Vivant',
      kicker: 'SALLE 04 · DINOSAURES, EXTINCTIONS ET ADN',
      intro: 'Regarder dans le passé nous aide à mieux comprendre le présent : ce que nous pensions disparu est parfois encore sous nos yeux.',
      question: 'Pourquoi un oiseau moderne est-il scientifiquement considéré comme un dinosaure ?',
      mainTitle: 'Un Dinosaure dans le Poulailler',
      main: 'Les oiseaux ne descendent pas seulement des dinosaures : ils en sont les représentants vivants. Ils partagent des caractères anatomiques uniques hérités de théropodes à plumes.',
      challenge: 'dino',
      source: { code: 'SC-22', title: 'Évolution des dinosaures vers les oiseaux (Natural History Museum)', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
      side: {
        title: 'La Vraie Silhouette du Mégalodon', label: 'Autre Objet Exposé',
        desc: 'Le grand mégalodon est souvent imaginé comme un gigantesque grand requin blanc. Les récentes réévaluations fossiles suggèrent une silhouette plus allongée et élancée.',
        source: { code: 'SC-25', title: 'Réévaluation morphologique d’Otodus megalodon (Historical Biology)', url: 'https://doi.org/10.1080/08912963.2024.2380590' }
      },
      questionHint: 'Ne te fie pas uniquement aux apparences : observe les os et les parentés évolutives.'
    },
    {
      id: 5, slug: 'tecnologia', label: 'Laboratoire du Futur', title: 'Des Machines Inspirées par la Nature',
      teaser: 'Robotique biohybride fongique et matériaux intelligents.',
      art: 'laboratorio', sideArt: 'micelio', otto: 'otto-pensieroso', icon: '🤖', seal: 'Robot Biohybride',
      kicker: 'SALLE 05 · LE LABORATOIRE DU FUTUR',
      intro: 'L’ingénierie moderne s’inspire de plus en plus de la biologie : elle utilise des signaux vivants pour actionner des circuits.',
      question: 'Comment un champignon peut-il contrôler les mouvements d’un robot sans avoir de cerveau ?',
      mainTitle: 'Le Mycélium aux Commandes',
      main: 'Des ingénieurs ont connecté du mycélium fongique vivant à des électrodes. Quand le champignon réagit à la lumière, ses impulsions électriques naturelles sont converties en ordres mécaniques pour faire marcher le robot.',
      challenge: 'bio',
      source: { code: 'SC-36', title: 'Biohybride à base de mycélium fongique (Science Robotics)', url: 'https://doi.org/10.1126/scirobotics.adk8019' },
      side: {
        title: 'Des Robots d’Origami qui se Déplient', label: 'Autre Objet Exposé',
        desc: 'Inspirés par l’art du pliage, certains robots se déploient d’eux-mêmes à partir d’une feuille plate dès qu’ils reçoivent de la chaleur ou un champ magnétique.',
        source: { code: 'SC-35', title: 'Robotique origami autonome', url: 'https://doi.org/10.1038/s41586-023-06484-9' }
      },
      questionHint: 'Un signal électrique n’est pas une pensée : c’est une impulsion que des circuits peuvent mesurer.'
    },
    {
      id: 6, slug: 'corpo', label: 'Corps et Super-Technologies', title: 'Le Corps Émet des Signaux',
      teaser: 'Prothèses bioniques et nouvelles voies pour retrouver la parole.',
      art: 'corpo', sideArt: 'bionico', otto: 'otto-curioso', icon: '⚡', seal: 'Impulsion Bionique',
      kicker: 'SALLE 06 · CORPS ET SUPER-TECHNOLOGIES',
      intro: 'La médecine expérimentale cherche de nouvelles façons de relier les signaux de notre corps à des technologies d’assistance avancées.',
      question: 'Qu’est-ce qui rend une prothèse bionique plus naturelle qu’une jambe artificielle ordinaire ?',
      mainTitle: 'La Prothèse Connectée aux Muscles',
      main: 'Un nouveau protocole chirurgical permet de réorganiser les muscles résiduels. Quand la personne pense à marcher, la prothèse détecte les signaux neuromusculaires et ajuste son mouvement en temps réel.',
      challenge: 'corpo',
      source: { code: 'SC-43', title: 'Genou bionique à intégration tissulaire (Nature Medicine)', url: 'https://news.mit.edu/2024/bionic-knee-tissue-integration-0710' },
      side: {
        title: 'Retrouver une Voix Grâce à l’IA', label: 'Autre Objet Exposé',
        desc: 'Des implants cérébraux couplés à des modèles d’apprentissage automatique traduisent l’activité du cortex en paroles audibles pour des personnes paralysées.',
        source: { code: 'SC-46', title: 'Interface cerveau-machine pour la parole (Nature)', url: 'https://doi.org/10.1038/s41586-023-06443-4' }
      },
      questionHint: 'L’important n’est pas seulement le moteur, mais la communication entre le corps et la machine.'
    },
    {
      id: 7, slug: 'spazio', label: 'Espace : La Nouvelle Frontière', title: 'La Photo qu’Aucun Appareil n’a Prise',
      teaser: 'Le télescope géant virtuel et les secrets des trous noirs.',
      art: 'spazio', sideArt: 'galassia', otto: 'otto-pensieroso', icon: '🌌', seal: 'Horizon Cosmique',
      kicker: 'SALLE 07 · ESPACE : LA NOUVELLE FRONTIÈRE',
      intro: 'Pour observer des objets invisibles situés à des millions d’années-lumière, il a fallu transformer notre planète entière en observatoire.',
      question: 'Comment les scientifiques ont-ils photographié un trou noir sans appareil photo géant dans l’espace ?',
      mainTitle: 'Un Télescope de la Taille de la Terre',
      main: 'Le projet Event Horizon Telescope a synchronisé des radiotélescopes répartis aux quatre coins du globe. En combinant leurs données par interférométrie, ils ont révélé l’ombre du trou noir M87*.',
      challenge: 'buco',
      source: { code: 'SC-55', title: 'Premiers résultats du télescope Event Horizon (ApJL)', url: 'https://doi.org/10.3847/2041-8213/ab0ec7' },
      side: {
        title: '3I/ATLAS : Visiteuse Interstellaire', label: 'Autre Objet Exposé',
        desc: 'Une comète venue d’un autre système planétaire a traversé notre Système solaire. Sa trajectoire ouverte prouve qu’elle ne reviendra jamais.',
        source: { code: 'SC-52', title: 'Observations de comètes interstellaires (NASA/JPL)', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
      },
      questionHint: 'Aucun télescope seul ne suffisait : la force réside dans la combinaison des données.'
    }
  ] : [
    {
      id: 1, slug: 'animali', label: 'Animales Extraordinarios', title: 'El Océano Esconde Pistas',
      teaser: '¿Puede un alga convertirse en herramienta? ¿Y unas burbujas en red de pesca?',
      art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '🌊', seal: 'Lente Marina',
      kicker: 'SALA 01 · ANIMALES EXTRAORDINARIOS',
      intro: 'Algunos animales sorprenden a la ciencia no por magia, sino porque hacen cosas que nadie esperaba ver.',
      question: 'Un vídeo puede mostrarnos qué ocurre. Pero, ¿puede explicarnos el motivo de inmediato?',
      mainTitle: 'El Caso del Alga Misteriosa',
      main: 'En el mar de Salish, los científicos grabaron orcas arrancando algas laminarias y haciéndolas rodar entre sus cuerpos. Ver el comportamiento es una cosa; descubrir su función exacta es otra.',
      challenge: 'prove',
      source: { code: 'SC-04', title: 'Estudio de conducta de orcas (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
      side: {
        title: 'La Red de Burbujas de la Ballena', label: 'Otra Pieza Expuesta',
        desc: 'Algunas ballenas jorobadas expulsan cortinas circulares de burbujas para acorralar bancos de peces. Las burbujas no son muros sólidos, pero alteran la conducta de las presas.',
        source: { code: 'SC-05', title: 'Investigación sobre redes de burbujas (Royal Society)', url: 'https://doi.org/10.1098/rsos.240328' }
      },
      questionHint: 'Observa bien las algas, pero fíjate sobre todo en lo que hacen los animales con ellas.'
    },
    {
      id: 2, slug: 'piante', label: 'Plantas y Mundos Diminutos', title: 'Un Jardín Inesperado',
      teaser: 'Brotes en polvo lunar y helechos con genomas colosales.',
      art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '🌿', seal: 'Brote Lunar',
      kicker: 'SALA 02 · PLANTAS Y MUNDOS DIMINUTOS',
      intro: 'Las plantas parecen quietas, pero están llenas de respuestas asombrosas. Hasta el polvo de la Luna formó parte de un estudio pionero.',
      question: 'Para comprobar si una planta crece de verdad en suelo lunar, ¿con qué deben compararla los científicos?',
      mainTitle: 'Semillas y Polvo Lunar',
      main: 'En el laboratorio, varias semillas brotaron en pequeñas muestras de regolito lunar traídas por las misiones Apolo. Sin embargo, las plantas mostraron claros signos de estrés biológico.',
      challenge: 'terreno',
      source: { code: 'SC-12', title: 'Plantas en regolito lunar (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
      side: {
        title: 'El Helecho que Asombró a la Genética', label: 'Otra Pieza Expuesta',
        desc: 'Un diminuto helecho del género Tmesipteris alberga un genoma colosal. La cantidad total de ADN no determina la inteligencia: es una curiosidad biológica para entender en su contexto.',
        source: { code: 'SC-13', title: 'Análisis del genoma de Tmesipteris (iScience)', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
      },
      questionHint: 'En un experimento científico, cambia siempre una sola variable cada vez.'
    },
    {
      id: 3, slug: 'esperimenti', label: 'Experimentos Sorprendentes', title: 'El Pez sobre Cuatro Ruedas',
      teaser: '¿Quién conduce de verdad un acuario motorizado?',
      art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '🔬', seal: 'Inventor Curioso',
      kicker: 'SALA 03 · EXPERIMENTOS SORPRENDENTES',
      intro: 'Un gran experimento científico no es magia: es una cadena de pasos que podemos reconstruir, controlar y explicar.',
      question: '¿Cómo puede un pez mover un vehículo terrestre sin tocar las ruedas?',
      mainTitle: 'Reconstruir el Montaje de Laboratorio',
      main: 'En un estudio singular, los investigadores colocaron una pecera sobre una plataforma robótica con ruedas. Una cámara seguía la posición del pez y traducía su nado en órdenes de giro para las ruedas.',
      challenge: 'sequenza',
      source: { code: 'SC-15', title: 'Navegación de un pez en tierra (Behavioural Brain Research)', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
      side: {
        title: 'Abejorros que Juegan a la Pelota', label: 'Otra Pieza Expuesta',
        desc: 'Varios abejorros hicieron rodar bolitas de madera sin recibir premio dulce a cambio. Los científicos investigan si se trata de una auténtica conducta de juego.',
        source: { code: 'SC-16', title: 'Juego en abejorros (Animal Behaviour)', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
      },
      questionHint: 'Sigue el viaje de la información: del ojo a la señal, y del motor al movimiento.'
    },
    {
      id: 4, slug: 'dinosauri', label: 'Dinosaurios, Extinciones y ADN', title: 'No Todos los Dinosaurios Desaparecieron',
      teaser: 'Aves con plumas y el gran tiburón megalodón.',
      art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-curioso', icon: '🦖', seal: 'Fósil Viviente',
      kicker: 'SALA 04 · DINOSAURIOS, EXTINCIONES Y ADN',
      intro: 'Mirar al pasado nos ayuda a comprender el presente: lo que creíamos extinguido a veces sigue vivo ante nuestros ojos.',
      question: '¿Por qué las aves actuales se consideran científicamente dinosaurios?',
      mainTitle: 'Un Dinosaurio en el Gallinero',
      main: 'Las aves no solo descienden de los dinosaurios: son dinosaurios vivos. Comparten rasgos anatómicos únicos heredados de terópodos carnívoros emplumados.',
      challenge: 'dino',
      source: { code: 'SC-22', title: 'Evolución de dinosaurios a aves (Natural History Museum)', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
      side: {
        title: 'La Verdadera Forma del Megalodón', label: 'Otra Pieza Expuesta',
        desc: 'El gran megalodón suele imaginarse como un tiburón blanco gigante. Las últimas revisiones fósiles sugieren una silueta más alargada y estilizada.',
        source: { code: 'SC-25', title: 'Revisión morfológica de Otodus megalodon (Historical Biology)', url: 'https://doi.org/10.1080/08912963.2024.2380590' }
      },
      questionHint: 'No te fíes solo de las apariencias: observa los huesos y los parentescos biológicos.'
    },
    {
      id: 5, slug: 'tecnologia', label: 'El Laboratorio del Futuro', title: 'Máquinas Inspiradas en la Naturaleza',
      teaser: 'Robótica biohíbrida con hongos y materiales inteligentes.',
      art: 'laboratorio', sideArt: 'micelio', otto: 'otto-pensieroso', icon: '🤖', seal: 'Robot Biohíbrido',
      kicker: 'SALA 05 · EL LABORATORIO DEL FUTURO',
      intro: 'La ingeniería moderna se inspira cada vez más en la biología: aprovecha señales vivas para accionar circuitos electrónicos.',
      question: '¿Cómo puede un hongo guiar los movimientos de un robot sin tener cerebro?',
      mainTitle: 'El Micelio al Mando',
      main: 'Los ingenieros conectaron micelio fúngico vivo a electrodos. Cuando el hongo reacciona ante la luz, sus impulsos eléctricos naturales se traducen en órdenes de movimiento para los motores del robot.',
      challenge: 'bio',
      source: { code: 'SC-36', title: 'Biohíbridos basados en micelio (Science Robotics)', url: 'https://doi.org/10.1126/scirobotics.adk8019' },
      side: {
        title: 'Robots de Origami que se Despliegan', label: 'Otra Pieza Expuesta',
        desc: 'Inspirados en el arte del papel plegado, algunos robots se despliegan por sí solos desde una lámina plana al recibir calor o campos magnéticos.',
        source: { code: 'SC-35', title: 'Robótica origami autónoma', url: 'https://doi.org/10.1038/s41586-023-06484-9' }
      },
      questionHint: 'Una señal eléctrica no es un pensamiento: es un pulso medible que los circuitos pueden interpretar.'
    },
    {
      id: 6, slug: 'corpo', label: 'Cuerpo y Supertecnologías', title: 'El Cuerpo Emite Señales',
      teaser: 'Prótesis biónicas y nuevas formas de recuperar la voz.',
      art: 'corpo', sideArt: 'bionico', otto: 'otto-curioso', icon: '⚡', seal: 'Impulso Biónico',
      kicker: 'SALA 06 · CUERPO Y SUPERTECNOLOGÍAS',
      intro: 'La medicina experimental busca nuevas formas de conectar las señales de nuestro cuerpo con tecnologías avanzadas de asistencia.',
      question: '¿Qué hace que una prótesis biónica se sienta más natural que una pierna artificial común?',
      mainTitle: 'La Prótesis Conectada a los Músculos',
      main: 'Un nuevo método quirúrgico reorganiza los músculos del miembro residual. Al pensar en caminar, la prótesis detecta los impulsos neuromusculares y ajusta el movimiento en tiempo real.',
      challenge: 'corpo',
      source: { code: 'SC-43', title: 'Rodilla biónica integrada en tejidos (Nature Medicine)', url: 'https://news.mit.edu/2024/bionic-knee-tissue-integration-0710' },
      side: {
        title: 'Recuperar la Voz con Inteligencia Artificial', label: 'Otra Pieza Expuesta',
        desc: 'Varios implantes cerebrales combinados con modelos de aprendizaje automático traducen la actividad neuronal en palabras audibles para personas que no pueden hablar.',
        source: { code: 'SC-46', title: 'Interfaz cerebro-ordenador para el habla (Nature)', url: 'https://doi.org/10.1038/s41586-023-06443-4' }
      },
      questionHint: 'Lo importante no es solo el motor, sino la comunicación entre el cuerpo y la máquina.'
    },
    {
      id: 7, slug: 'spazio', label: 'Espacio: La Próxima Frontera', title: 'La Foto que Ninguna Cámara Tomó',
      teaser: 'El telescopio virtual gigante y los secretos de los agujeros negros.',
      art: 'spazio', sideArt: 'galassia', otto: 'otto-pensieroso', icon: '🌌', seal: 'Horizonte Cósmico',
      kicker: 'SALA 07 · ESPACIO: LA PRÓXIMA FRONTERA',
      intro: 'Para observar objetos invisibles a millones de años luz de distancia, fue necesario convertir a nuestro planeta entero en un telescopio.',
      question: '¿Cómo fotografiaron los científicos un agujero negro sin una cámara espacial gigante?',
      mainTitle: 'Un Telescopio del Tamaño de la Tierra',
      main: 'El proyecto Event Horizon Telescope sincronizó radiotelescopios repartidos por todo el globo terráqueo. Combinando sus datos mediante interferometría, revelaron la sombra del agujero negro M87*.',
      challenge: 'buco',
      source: { code: 'SC-55', title: 'Primeros resultados del Event Horizon Telescope (ApJL)', url: 'https://doi.org/10.3847/2041-8213/ab0ec7' },
      side: {
        title: '3I/ATLAS: Visitante Interestelar', label: 'Otra Pieza Expuesta',
        desc: 'Un cometa procedente de otra estrella atravesó nuestro Sistema solar. Su trayectoria abierta hiperbólica confirma que jamás regresará.',
        source: { code: 'SC-52', title: 'Observaciones de cometas interestelares (NASA/JPL)', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
      },
      questionHint: 'Ningún telescopio en solitario era suficiente: el secreto estuvo en unir los datos de todos.'
    }
  ];

  // Load the EN app template as base for logic
  const enApp = fs.readFileSync('assets/einstein/bonus/en/museo/app.js', 'utf8');

  // Replace ROOMS declaration
  let code = enApp.replace(/const ROOMS = \[[\s\S]*?\n\];/, `const ROOMS = ${JSON.stringify(ROOMS, null, 2)};`);
  code = code.replace(/const storeKey = 'otto-museo-en-progress-v1';/, `const storeKey = '${storeKey}';`);

  // Localized UI strings
  if (isFR) {
    code = code.replace(/THE MUSEUM OF<br><em>IMPOSSIBLE<\/em><br>DISCOVERIES/, 'LE MUSÉE DES<br><em>DÉCOUVERTES<\/em><br>IMPOSSIBLES');
    code = code.replace(/EXCLUSIVE BOOK COMPANION/, 'COMPAGNON EXCLUSIF DU LIVRE');
    code = code.replace(/Seven galleries\. Seven scientific mysteries\. One curious little octopus waiting for you\. Step in, observe the evidence, solve the puzzles, and collect Otto's seals\./,
      'Sept salles. Sept mystères scientifiques. Une petite pieuvre curieuse qui t’attend. Entre, observe les preuves, résous les énigmes et collectionne les sceaux d’Otto.');
    code = code.replace(/'Continue Exploring' : 'Start Exploring'/, "'Continuer l\'exploration' : 'Commencer l\'exploration'");
    code = code.replace(/Open Explorer Passport/, 'Ouvrir le Passeport d\'Explorateur');
    code = code.replace(/For explorers aged 7–12 · Free with the book · No account needed/, 'Pour explorateurs de 7 à 12 ans · Gratuit avec le livre · Sans compte');
    code = code.replace(/YOUR JOURNEY/, 'TON PARCOURS');
    code = code.replace(/Choose a Gallery Door\./, 'Choisis la porte d\'une salle.');
    code = code.replace(/You can visit the galleries in any order you like\. Each time you solve a mystery, Otto adds an official seal to your passport\./,
      'Tu peux visiter les salles dans l’ordre de ton choix. Chaque fois que tu résous un mystère, Otto appose un sceau officiel dans ton passeport.');
    code = code.replace(/galleries completed/, 'salles complétées');
    code = code.replace(/· Your Explorer Diploma is ready!/, '· Ton diplôme d\'explorateur est prêt !');
    code = code.replace(/✦ Seal Earned/g, '✦ Sceau Obtenu');
    code = code.replace(/GALLERY /g, 'SALLE ');
    code = code.replace(/Explore gallery/g, 'Explorer la salle');
    code = code.replace(/Observe, don't guess blindly\./, 'Observe, ne devine pas au hasard.');
    code = code.replace(/Every activity starts with real observations and clues\. Where science is still investigating, we say so clearly\./,
      'Chaque activité repose sur de vraies observations. Là où la science cherche encore, nous le disons clairement.');
    code = code.replace(/Every room tells a unique story\./, 'Chaque salle a sa propre histoire.');
    code = code.replace(/You won't find the same quiz seven times: each mystery challenges you with an interactive mechanic\./,
      'Pas de quiz répétitif : chaque mystère te met au défi avec un jeu interactif original.');
    code = code.replace(/Real sources behind every discovery\./, 'De vraies sources derrière chaque merveille.');
    code = code.replace(/You can view the authentic scientific publications\. The SC codes match the reference section in your book\./,
      'Tu peux consulter les publications scientifiques authentiques. Les codes SC correspondent à ceux de ton livre.');
    code = code.replace(/← Museum Lobby/, '← Hall du musée');
    code = code.replace(/of 7<\/span>/, 'sur 7</span>');
    code = code.replace(/MAIN EXHIBIT/, 'PIÈCE PRINCIPALE');
    code = code.replace(/THE QUESTION/, 'LA QUESTION');
    code = code.replace(/Scientific Publication/, 'Publication Scientifique');
    code = code.replace(/Original Source ↗/g, 'Source originale ↗');
    code = code.replace(/Museum illustrations are educational artistic reconstructions; the links lead to the original scientific studies\./,
      'Les illustrations du musée sont des reconstitutions pédagogiques ; les liens mènent aux études scientifiques d’origine.');
    code = code.replace(/Enlarge Plate 🔍/, 'Agrandir la planche 🔍');
    code = code.replace(/← Return to Lobby/, '← Retour au hall');
    code = code.replace(/← Previous Gallery/, '← Salle précédente');
    code = code.replace(/Next Gallery →/, 'Salle suivante →');
    code = code.replace(/Seal Earned!/, 'Sceau Obtenu !');
    code = code.replace(/You solved the mystery of this gallery\. Otto has stamped the/, 'Tu as résolu le mystère de cette salle. Otto a apposé le sceau');
    code = code.replace(/seal in your explorer passport\./, 'dans ton passeport d\'explorateur.');
    code = code.replace(/View Explorer Passport ✧/, 'Voir le Passeport d\'Explorateur ✧');
    code = code.replace(/EXPLORER PASSPORT/, 'PASSEPORT D\'EXPLORATEUR');
    code = code.replace(/Earn all 7 seals to unlock your personalized Explorer Diploma!/,
      'Obtiens les 7 sceaux pour débloquer ton diplôme personnalisé d\'explorateur !');
    code = code.replace(/Close Passport/, 'Fermer le passeport');
    code = code.replace(/Generate My Diploma 🎓/, 'Générer mon Diplôme 🎓');
    code = code.replace(/Enter your name for the diploma/, 'Entre ton prénom pour le diplôme');
  } else {
    code = code.replace(/THE MUSEUM OF<br><em>IMPOSSIBLE<\/em><br>DISCOVERIES/, 'EL MUSEO DE LOS<br><em>DESCUBRIMIENTOS<\/em><br>IMPOSIBLES');
    code = code.replace(/EXCLUSIVE BOOK COMPANION/, 'COMPAÑERO EXCLUSIVO DEL LIBRO');
    code = code.replace(/Seven galleries\. Seven scientific mysteries\. One curious little octopus waiting for you\. Step in, observe the evidence, solve the puzzles, and collect Otto's seals\./,
      'Siete salas. Siete misterios científicos. Un pequeño pulpo curioso esperándote. Entra, observa las pruebas, resuelve los enigmas y colecciona los sellos de Otto.');
    code = code.replace(/'Continue Exploring' : 'Start Exploring'/, "'Continuar la exploración' : 'Comenzar la exploración'");
    code = code.replace(/Open Explorer Passport/, 'Abrir Pasaporte de Explorador');
    code = code.replace(/For explorers aged 7–12 · Free with the book · No account needed/, 'Para exploradores de 7 a 12 años · Gratis con el libro · Sin registro');
    code = code.replace(/YOUR JOURNEY/, 'TU RECORRIDO');
    code = code.replace(/Choose a Gallery Door\./, 'Elige la puerta de una sala.');
    code = code.replace(/You can visit the galleries in any order you like\. Each time you solve a mystery, Otto adds an official seal to your passport\./,
      'Puedes visitar las salas en el orden que prefieras. Cada vez que resuelvas un misterio, Otto estampará un sello oficial en tu pasaporte.');
    code = code.replace(/galleries completed/, 'salas completadas');
    code = code.replace(/· Your Explorer Diploma is ready!/, '· ¡Tu diploma de explorador está listo!');
    code = code.replace(/✦ Seal Earned/g, '✦ Sello Conseguido');
    code = code.replace(/GALLERY /g, 'SALA ');
    code = code.replace(/Explore gallery/g, 'Explorar sala');
    code = code.replace(/Observe, don't guess blindly\./, 'Observa, no adivines a ciegas.');
    code = code.replace(/Every activity starts with real observations and clues\. Where science is still investigating, we say so clearly\./,
      'Cada actividad parte de observaciones reales. Cuando la ciencia aún investiga, lo decimos con total claridad.');
    code = code.replace(/Every room tells a unique story\./, 'Cada sala cuenta una historia única.');
    code = code.replace(/You won't find the same quiz seven times: each mystery challenges you with an interactive mechanic\./,
      'No encontrarás el mismo cuestionario siete veces: cada misterio te propone un juego interactivo diferente.');
    code = code.replace(/Real sources behind every discovery\./, 'Fuentes reales detrás de cada maravilla.');
    code = code.replace(/You can view the authentic scientific publications\. The SC codes match the reference section in your book\./,
      'Puedes consultar las publicaciones científicas originales. Los códigos SC coinciden con los de tu libro.');
    code = code.replace(/← Museum Lobby/, '← Vestíbulo del museo');
    code = code.replace(/of 7<\/span>/, 'de 7</span>');
    code = code.replace(/MAIN EXHIBIT/, 'PIEZA PRINCIPAL');
    code = code.replace(/THE QUESTION/, 'LA PREGUNTA');
    code = code.replace(/Scientific Publication/, 'Publicación Científica');
    code = code.replace(/Original Source ↗/g, 'Fuente original ↗');
    code = code.replace(/Museum illustrations are educational artistic reconstructions; the links lead to the original scientific studies\./,
      'Las ilustraciones del museo son reconstrucciones educativas; los enlaces llevan a los artículos científicos originales.');
    code = code.replace(/Enlarge Plate 🔍/, 'Ampliar lámina 🔍');
    code = code.replace(/← Return to Lobby/, '← Volver al vestíbulo');
    code = code.replace(/← Previous Gallery/, '← Sala anterior');
    code = code.replace(/Next Gallery →/, 'Siguiente sala →');
    code = code.replace(/Seal Earned!/, '¡Sello Conseguido!');
    code = code.replace(/You solved the mystery of this gallery\. Otto has stamped the/, 'Has resuelto el enigma de esta sala. Otto ha estampado el sello');
    code = code.replace(/seal in your explorer passport\./, 'en tu pasaporte de explorador.');
    code = code.replace(/View Explorer Passport ✧/, 'Ver Pasaporte de Explorador ✧');
    code = code.replace(/EXPLORER PASSPORT/, 'PASAPORTE DE EXPLORADOR');
    code = code.replace(/Earn all 7 seals to unlock your personalized Explorer Diploma!/,
      '¡Consigue los 7 sellos para desbloquear tu diploma personalizado de explorador!');
    code = code.replace(/Close Passport/, 'Cerrar pasaporte');
    code = code.replace(/Generate My Diploma 🎓/, 'Generar mi Diploma 🎓');
    code = code.replace(/Enter your name for the diploma/, 'Escribe tu nombre para el diploma');
  }

  return code;
}

const frCode = generateMuseoApp('fr');
const esCode = generateMuseoApp('es');

fs.writeFileSync('assets/einstein/bonus/fr/museo/app.js', frCode, 'utf8');
fs.writeFileSync('assets/einstein/bonus/es/museo/app.js', esCode, 'utf8');

console.log('✅ Generated bonus/fr/museo/app.js and bonus/es/museo/app.js!');
