const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'data', 'i18n.json');
const currentData = JSON.parse(fs.readFileSync(i18nPath, 'utf8'));

// Dictionaries with translations for all 9 languages
const EXTENSIONS = {
  it: {
    brand: {
      authorsRole: "Gli autori di CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Acquisti ufficiali garantiti in esclusiva su Amazon in edizione paperback.",
      cantierePitch: "Le Avventure del Cantiere di Marco Salucci.",
      scienzaPitch: "Collana Scienza e curiosità di Clara Musicco.",
      colorarePitch: "Collana da colorare e creare di Marco Salucci.",
      scuolaPitch: "Area didattica e apprendimento di CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Autore & Creatore",
      roleAuthorScience: "Autrice & Divulgatrice",
      originsTitle: "La nascita delle storie",
      originsSubtitle: "Fotografie autentiche delle origini: pomeriggi trascorsi insieme a osservare i cantieri e momenti preziosi di lettura condivisa.",
      cantiereBooksBtn: "I Libri del Cantiere",
      fanoBookBtn: "Fano col naso all'insù",
      scienceBooksBtn: "I Libri di Scienza",
      schoolBooksBtn: "Per la scuola"
    },
    cantierePage: {
      badge: "Franchise Originale · 2–5 anni",
      heroTitle: "Le Avventure del Cantiere",
      heroSubtitle: "La celebre serie illustrata di Marco Salucci: storie in rima, grandi macchine e indimenticabili lezioni di amicizia, cooperazione e rispetto della natura.",
      ctaRaccolte: "Scopri le Raccolte Vol. 1 e 2",
      ctaCharacters: "I Personaggi",
      raccolteTitle: "Quattro storie complete in ogni volume",
      raccolteSubtitle: "Edizioni speciali in grande formato (21,5 × 28 cm) con testi in rima, copertina flessibile di pregio e codici QR con contenuti multimediali in regalo.",
      episodesTitle: "Tutti gli Episodi Singoli",
      episodesSubtitle: "Tutte le 9 singole storie illustrate in rima per bambini 2–5 anni. Include l'attesissima missione di Leo e Rudy nella Savana!",
      charactersTitle: "Incontra i protagonisti",
      charactersSubtitle: "Ciascun veicolo ha un carattere unico e positivo con cui i bambini si identificano subito.",
      bennyTitle: "Benny l'escavatore",
      bennyDesc: "Entusiasta, instancabile scavatore e grande amico pronto ad aiutare tutti.",
      rudyTitle: "Rudy la ruspa",
      rudyDesc: "Forte e veloce, sposta montagne di sabbia e sassi con gioia contagiosa.",
      leoTitle: "Leo la gru",
      leoDesc: "Gentile e altissimo, osserva dall'alto e protegge con cura i nidi del cantiere.",
      brunoTitle: "Bruno il camion",
      brunoDesc: "Robusto trasportatore dal cuore tenero, difensore degli anatroccoli.",
      ninaTitle: "Nina la betoniera",
      ninaDesc: "Ingegnosa e determinata, impasta il calcestruzzo perfetto per costruire ponti sicuri.",
      rinoTitle: "Rino il rullo",
      rinoDesc: "Calmo e ponderato, spiana il terreno e protegge la squadra durante la notte.",
      mediaTitle: "Ascolta e guarda le storie ovunque",
      watchYouTube: "Guarda su YouTube"
    },
    scienzaPage: {
      badge: "Divulgazione Scientifica · 7–12 anni",
      heroTitle: "Einstein, questa te la sei persa!",
      heroSubtitle: "Di Clara Musicco. 55 avventure nella scienza di oggi | 55 scoperte vere! Dinosauri piumati, buchi neri, robot, animali sorprendenti e il segreto del portale interattivo della mascotte Otto.",
      featuresTitle: "Cosa rende unico questo libro",
      featuresSubtitle: "Un'opera che unisce una narrazione vivace con l'affidabilità delle grandi riviste e università scientifiche mondiali.",
      feat1Title: "55 Scoperte Verificate",
      feat1Desc: "Dalle onde gravitazionali al telescopio James Webb, dai dinosauri piumati all'intelligenza animale: storie vere con codici di riferimento alle fonti storiche (SC-01 fino a SC-55).",
      feat2Title: "La Mascotte Otto",
      feat2Desc: "Un polpo curioso e ironico con tre cuori e nove cervelli che accompagna i lettori, ponendo domande intelligenti e spiegando concetti complessi in modo limpido e coinvolgente.",
      feat3Title: "Portale Segreto Esclusivo",
      feat3Desc: "Il QR code stampato nel libro apre un mondo multimediale con 7 simulazioni 3D, videoteca, un museo virtuale con passaporto da completare e carte stampabili da ritagliare.",
      secretOttoTitle: "Il mondo segreto di Otto",
      secretOttoDesc: "Il libro è finito. Le scoperte no! Attraverso il portale multimediale accessibile via QR code, i lettori possono esplorare il Museo delle Scoperte Impossibili, cimentarsi in simulazioni fisiche 3D e scaricare giochi da fare in famiglia.",
      qrExclusive: "🔒 Accessibile tramite QR Code esclusivo stampato nel libro",
      lookInsideSample: "Sfoglia l'anteprima interna"
    },
    colorarePage: {
      badge: "Creatività e Colore · 5–10 anni",
      heroTitle: "Fano col naso all'insù",
      heroSubtitle: "Di Marco Salucci. Il libro illustrato da colorare con oltre 40 tavole originali, giochi, labirinti e curiosità storiche alla scoperta della città antica di Vitruvio e dell'Arco d'Augusto.",
      featuresTitle: "Colorare, scoprire, imparare",
      featuresSubtitle: "Un album di grande formato pensato per unire il relax del disegno con il valore culturale della scoperta.",
      feat1Title: "Oltre 40 Tavole",
      feat1Desc: "Disegni curati a mano libera pronti per essere personalizzati con matite, pennarelli o pastelli su carta spessa e resistente.",
      feat2Title: "Storia e Monumenti",
      feat2Desc: "L'Arco d'Augusto, la Basilica di Vitruvio, il Carnevale e il porto storico raccontati con aneddoti curiosi per i bambini.",
      feat3Title: "Giochi e Attività",
      feat3Desc: "Labirinti, indovinelli, cerca le differenze e sfide visive per stimolare la concentrazione e la motricità fine."
    },
    scuolaPage: {
      badge: "Nuova Collana Didattica · In Preparazione",
      heroTitle: "Per la scuola",
      heroSubtitle: "Materiali di apprendimento, esercizi e sfide logiche per consolidare le competenze scolastiche dei bambini con entusiasmo, chiarezza e metodo.",
      compassTitle: "La Bussola Misteriosa",
      compassSubtitle: "In arrivo per il nuovo anno scolastico",
      projectDesc: "Un progetto didattico firmato da Clara Musicco per trasformare le materie scolastiche in un'avventura da vivere e comprendere.",
      subjectMath: "Materia: Matematica",
      grade2: "Classe: 2ª Primaria",
      age78: "Età: 7–8 anni",
      authorClara: "Autrice: Clara Musicco",
      bookMath2Title: "La Bussola Misteriosa — Matematica 2ª Primaria",
      bookMath2Desc: "Il volume dedicato alla seconda elementare affronta i numeri fino al centinaio, il calcolo a mente, i primi problemi illustrati e l'orientamento spaziale attraverso una trama a enigmi che stimola la motivazione dei bambini senza generare ansia da prestazione.",
      whatInside: "Cosa troveranno i bambini:",
      featExercises: "Esercizi progressivi",
      featVisual: "Approccio visuale",
      featSolutions: "Soluzioni guidate",
      statusInWork: "In lavorazione — Disponibile a breve su Amazon"
    },
    common: {
      redirecting: "Reindirizzamento in corso...",
      redirectingDesc: "Stiamo aprendo la pagina del tuo libro. Se non vieni reindirizzato automaticamente entro pochi secondi, clicca sul pulsante qui sotto."
    }
  },

  en: {
    brand: {
      authorsRole: "The authors of CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Guaranteed official purchases exclusively on Amazon in paperback edition.",
      cantierePitch: "Construction Site Adventures by Marco Salucci.",
      scienzaPitch: "Science & Wonder collection by Clara Musicco.",
      colorarePitch: "Coloring and creativity collection by Marco Salucci.",
      scuolaPitch: "Educational and learning series by CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Author & Creator",
      roleAuthorScience: "Author & Science Communicator",
      originsTitle: "The birth of the stories",
      originsSubtitle: "Authentic photographs from the beginnings: afternoons spent observing construction sites together and precious moments of shared reading.",
      cantiereBooksBtn: "Construction Site Books",
      fanoBookBtn: "Fano with Your Nose in the Air",
      scienceBooksBtn: "Science Books",
      schoolBooksBtn: "For School & Learning"
    },
    cantierePage: {
      badge: "Original Series · Ages 2–5",
      heroTitle: "Construction Site Adventures",
      heroSubtitle: "The celebrated picture book series by Marco Salucci: rhyming stories, mighty machines, and memorable lessons in friendship, teamwork, and respect for nature.",
      ctaRaccolte: "Discover Collections Vol. 1 & 2",
      ctaCharacters: "Meet the Characters",
      raccolteTitle: "Four complete stories in every volume",
      raccolteSubtitle: "Special large format editions (21.5 × 28 cm) with rhyming texts, premium paperback finish, and bonus multimedia QR codes.",
      episodesTitle: "All Single Episodes",
      episodesSubtitle: "All single rhyming picture books for children ages 2–5. Includes Leo & Rudy's exciting Savannah mission!",
      charactersTitle: "Meet the protagonists",
      charactersSubtitle: "Each vehicle has a unique, positive personality that children immediately connect with.",
      bennyTitle: "Benny the Excavator",
      bennyDesc: "Enthusiastic, tireless excavator and loyal friend ready to help everyone.",
      rudyTitle: "Rudy the Bulldozer",
      rudyDesc: "Strong and swift, moving piles of sand and rocks with cheerful energy.",
      leoTitle: "Leo the Crane",
      leoDesc: "Gentle and tall, watching from above and tenderly protecting site nests.",
      brunoTitle: "Bruno the Dump Truck",
      brunoDesc: "Sturdy hauler with a gentle heart, protector of ducklings.",
      ninaTitle: "Nina the Cement Truck",
      ninaDesc: "Clever and determined, mixing perfect concrete to build safe bridges.",
      rinoTitle: "Rino the Steamroller",
      rinoDesc: "Calm and thoughtful, leveling the ground and guarding the crew through the night.",
      mediaTitle: "Listen and watch the stories anywhere",
      watchYouTube: "Watch on YouTube"
    },
    scienzaPage: {
      badge: "Popular Science · Ages 7–12",
      heroTitle: "Einstein, You Missed This!",
      heroSubtitle: "By Clara Musicco. 55 adventures in modern science | 55 real discoveries! Feathered dinosaurs, black holes, robots, remarkable animals and the secret interactive portal of Otto the octopus.",
      featuresTitle: "What makes this book unique",
      featuresSubtitle: "A book uniting vibrant storytelling with the verified rigor of world-leading scientific journals and universities.",
      feat1Title: "55 Verified Discoveries",
      feat1Desc: "From gravitational waves to the James Webb Space Telescope, feathered dinosaurs to animal intelligence: real stories referenced to scientific sources (SC-01 through SC-55).",
      feat2Title: "Otto the Mascot",
      feat2Desc: "A curious, witty octopus with three hearts and nine brains guiding young readers through fascinating concepts with humor and clarity.",
      feat3Title: "Exclusive Secret Portal",
      feat3Desc: "The QR code printed in the book unlocks an interactive world with 7 3D simulations, video library, virtual museum with passport, and printable game cards.",
      secretOttoTitle: "Otto's Secret World",
      secretOttoDesc: "The book is finished. The discoveries are not! Through the secret portal accessible via QR code, young readers can explore the Museum of Impossible Discoveries, try interactive 3D simulations, and download family games.",
      qrExclusive: "🔒 Accessible via exclusive QR Code printed inside the book",
      lookInsideSample: "Look inside preview"
    },
    colorarePage: {
      badge: "Creativity & Colors · Ages 5–10",
      heroTitle: "Fano with Your Nose in the Air",
      heroSubtitle: "By Marco Salucci. The coloring book featuring over 40 original hand-drawn plates, mazes, and historical trivia exploring the ancient Roman city of Vitruvius and the Arch of Augustus.",
      featuresTitle: "Color, discover, learn",
      featuresSubtitle: "A large-format album designed to combine relaxing coloring with cultural discovery.",
      feat1Title: "Over 40 Original Plates",
      feat1Desc: "Detailed hand-drawn artwork ready to be personalized with pencils, markers, or crayons on thick, sturdy paper.",
      feat2Title: "History & Landmarks",
      feat2Desc: "The Arch of Augustus, Vitruvius' Basilica, Carnival, and the historic harbor narrated with curious trivia for children.",
      feat3Title: "Games & Activities",
      feat3Desc: "Mazes, riddles, spot-the-difference, and visual puzzles to sharpen focus and fine motor skills."
    },
    scuolaPage: {
      badge: "New Educational Series · Coming Soon",
      heroTitle: "For School & Learning",
      heroSubtitle: "Learning resources, exercises, and logic puzzles designed to strengthen school skills with enthusiasm, clarity, and solid method.",
      compassTitle: "The Mysterious Compass",
      compassSubtitle: "Coming soon for the new school year",
      projectDesc: "An educational project created by Clara Musicco to transform school subjects into an exciting adventure to experience and understand.",
      subjectMath: "Subject: Mathematics",
      grade2: "Grade: 2nd Grade",
      age78: "Age: Ages 7–8",
      authorClara: "Author: Clara Musicco",
      bookMath2Title: "The Mysterious Compass — 2nd Grade Math",
      bookMath2Desc: "The 2nd grade volume covers numbers up to 100, mental math, early word problems, and spatial reasoning through puzzle mysteries that motivate without test anxiety.",
      whatInside: "What children will discover:",
      featExercises: "Progressive exercises",
      featVisual: "Visual approach",
      featSolutions: "Step-by-step solutions",
      statusInWork: "In preparation — Coming soon on Amazon"
    },
    common: {
      redirecting: "Redirecting...",
      redirectingDesc: "Opening your book's page. If not automatically redirected in a few seconds, click the button below."
    }
  },

  de: {
    brand: {
      authorsRole: "Die Autoren von CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Garantierte offizielle Käufe exklusiv auf Amazon in der Taschenbuchausgabe.",
      cantierePitch: "Die Baustellen-Abenteuer von Marco Salucci.",
      scienzaPitch: "Reihe Wissenschaft und Wunder von Clara Musicco.",
      colorarePitch: "Mal- und Kreativreihe von Marco Salucci.",
      scuolaPitch: "Lern- und Bildungsreihe von CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Autor & Schöpfer",
      roleAuthorScience: "Autorin & Wissenschaftskommunikatorin",
      originsTitle: "Die Entstehung der Geschichten",
      originsSubtitle: "Authentische Fotos aus den Anfängen: Nachmittage beim gemeinsamen Beobachten von Baustellen und kostbare Lesemomente.",
      cantiereBooksBtn: "Die Baustellen-Bücher",
      fanoBookBtn: "Fano mit der Nase im Wind",
      scienceBooksBtn: "Wissenschaftsbücher",
      schoolBooksBtn: "Für die Schule"
    },
    cantierePage: {
      badge: "Original-Serie · 2–5 Jahre",
      heroTitle: "Die Baustellen-Abenteuer",
      heroSubtitle: "Die beliebte Bilderbuchreihe von Marco Salucci: Reimgeschichten, große Maschinen und unvergessliche Lektionen über Freundschaft, Teamarbeit und Respekt vor der Natur.",
      ctaRaccolte: "Entdecke die Sammelbände Band 1 & 2",
      ctaCharacters: "Die Charaktere",
      raccolteTitle: "Vier vollständige Geschichten in jedem Band",
      raccolteSubtitle: "Besondere Großformat-Ausgaben (21,5 × 28 cm) mit Reimen, edlem Taschenbucheinband und Bonus-QR-Codes.",
      episodesTitle: "Alle Einzelepisoden",
      episodesSubtitle: "Alle einzelnen Reimbilderbücher für Kinder von 2–5 Jahren. Inklusive Leo und Rudys Savannen-Mission!",
      charactersTitle: "Triff die Helden",
      charactersSubtitle: "Jedes Fahrzeug hat einen einzigartigen, positiven Charakter, mit dem sich Kinder sofort identifizieren.",
      bennyTitle: "Benny der Bagger",
      bennyDesc: "Begeisterter, unermüdlicher Bagger und treuer Freund, der allen hilft.",
      rudyTitle: "Rudy die Planierraupe",
      rudyDesc: "Stark und flink, schiebt Sand- und Steinberge mit ansteckender Freude.",
      leoTitle: "Leo der Kran",
      leoDesc: "Sanftmütig und riesengroß, wacht von oben und schützt die Nester der Baustelle.",
      brunoTitle: "Bruno der Kipper",
      brunoDesc: "Robuster Transporter mit weichem Herzen, Beschützer der Entenküken.",
      ninaTitle: "Nina der Betonmischer",
      ninaDesc: "Klug und entschlossen, mischt perfekten Beton für sichere Brücken.",
      rinoTitle: "Rino die Walze",
      rinoDesc: "Ruhig und besonnen, glättet den Boden und bewacht das Team in der Nacht.",
      mediaTitle: "Höre und schaue die Geschichten überall",
      watchYouTube: "Auf YouTube ansehen"
    },
    scienzaPage: {
      badge: "Wissenschaft für Kinder · 7–12 Jahre",
      heroTitle: "Einstein, das hast du verpasst!",
      heroSubtitle: "Von Clara Musicco. 55 Abenteuer in der modernen Wissenschaft | 55 echte Entdeckungen! Gefiederte Dinosaurier, Schwarze Löcher, Roboter und das Geheimportal von Krake Otto.",
      featuresTitle: "Was dieses Buch einzigartig macht",
      featuresSubtitle: "Ein Werk, das lebendiges Erzählen mit den geprüften Quellen weltführender Wissenschaftsmagazine und Universitäten vereint.",
      feat1Title: "55 Geprüfte Entdeckungen",
      feat1Desc: "Von Gravitationswellen über das James-Webb-Teleskop bis zur Tierintelligenz: Wahre Geschichten mit Quellenangaben (SC-01 bis SC-55).",
      feat2Title: "Das Maskottchen Otto",
      feat2Desc: "Ein neugieriger, witziger Krake mit drei Herzen und neun Gehirnen, der junge Leser mit Humor und Klarheit begeistert.",
      feat3Title: "Exklusives Geheimportal",
      feat3Desc: "Der im Buch gedruckte QR-Code öffnet eine interaktive Welt mit 7 3D-Simulationen, Videothek, Museum mit Entdeckerpass und Bastelkarten.",
      secretOttoTitle: "Ottos geheime Welt",
      secretOttoDesc: "Das Buch ist zu Ende, die Entdeckungen gehen weiter! Über das QR-Portal erkunden Kinder das Museum, 3D-Physiksimulationen und Familienspiele.",
      qrExclusive: "🔒 Zugänglich über den exklusiven QR-Code im Buch",
      lookInsideSample: "Leseprobe ansehen"
    },
    colorarePage: {
      badge: "Kreativität & Farbe · 5–10 Jahre",
      heroTitle: "Fano mit der Nase im Wind",
      heroSubtitle: "Von Marco Salucci. Das Ausmalbuch mit über 40 handgezeichneten Tafeln, Labyrinthen und historischen Anekdoten über die römische Stadt des Vitruv.",
      featuresTitle: "Malen, entdecken, lernen",
      featuresSubtitle: "Ein Großformat-Album, das entspanntes Zeichnen mit kulturellen Entdeckungen verbindet.",
      feat1Title: "Über 40 Tafeln",
      feat1Desc: "Detaillierte Handzeichnungen zum Ausmalen auf starkem, hochwertigem Papier.",
      feat2Title: "Geschichte & Denkmäler",
      feat2Desc: "Der Augustusbogen, Vitruvs Basilika, der Karneval und der Hafen, kindgerecht und spannend erzählt.",
      feat3Title: "Spiele & Rätsel",
      feat3Desc: "Labyrinthe, Suchbilder und Logikaufgaben zur Förderung von Konzentration und Feinmotorik."
    },
    scuolaPage: {
      badge: "Neue Lernreihe · In Vorbereitung",
      heroTitle: "Für die Schule",
      heroSubtitle: "Lernmaterialien, Übungen und logische Herausforderungen zur Festigung des Schulstoffs mit Begeisterung, Klarheit und Methode.",
      compassTitle: "Der geheimnisvolle Kompass",
      compassSubtitle: "Demnächst zum neuen Schuljahr",
      projectDesc: "Ein pädagogisches Projekt von Clara Musicco, um Schulfächer in ein faszinierendes Abenteuer zu verwandeln.",
      subjectMath: "Fach: Mathematik",
      grade2: "Klasse: 2. Grundschulklasse",
      age78: "Alter: 7–8 Jahre",
      authorClara: "Autorin: Clara Musicco",
      bookMath2Title: "Der geheimnisvolle Kompass — Mathematik 2. Klasse",
      bookMath2Desc: "Der Band für die 2. Klasse vermittelt Zahlen bis 100, Kopfrechnen, Textaufgaben und Raumorientierung durch motivierende Rätselkrimis.",
      whatInside: "Was Kinder erwartet:",
      featExercises: "Aufbauende Übungen",
      featVisual: "Anschaulicher Zugang",
      featSolutions: "Geführte Lösungen",
      statusInWork: "In Vorbereitung — Bald auf Amazon erhältlich"
    },
    common: {
      redirecting: "Weiterleitung läuft...",
      redirectingDesc: "Wir öffnen die Seite deines Buches. Solltest du nicht in wenigen Sekunden weitergeleitet werden, klicke auf den Button unten."
    }
  },

  fr: {
    brand: {
      authorsRole: "Les auteurs de CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Achats officiels garantis exclusivement sur Amazon en édition brochée.",
      cantierePitch: "Les Aventures du Chantier par Marco Salucci.",
      scienzaPitch: "Collection Science et curiosité par Clara Musicco.",
      colorarePitch: "Collection à colorier et créer par Marco Salucci.",
      scuolaPitch: "Espace pédagogique et apprentissage de CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Auteur & Créateur",
      roleAuthorScience: "Auteure & Vulgarisatrice",
      originsTitle: "La naissance des histoires",
      originsSubtitle: "Photographies authentiques des origines : après-midis passés ensemble à observer les chantiers et moments précieux de lecture partagée.",
      cantiereBooksBtn: "Les Livres du Chantier",
      fanoBookBtn: "Fano le nez en l'air",
      scienceBooksBtn: "Les Livres de Science",
      schoolBooksBtn: "Pour l'école"
    },
    cantierePage: {
      badge: "Série originale · 2–5 ans",
      heroTitle: "Les Aventures du Chantier",
      heroSubtitle: "La célèbre série illustrée de Marco Salucci : des histoires en rimes, de grands engins et d'inoubliables leçons d'amitié, d'entraide et de respect de la nature.",
      ctaRaccolte: "Découvrez les recueils Vol. 1 & 2",
      ctaCharacters: "Les Personnages",
      raccolteTitle: "Quatre histoires complètes dans chaque volume",
      raccolteSubtitle: "Éditions spéciales grand format (21,5 × 28 cm) avec textes rimés, couverture souple de qualité et QR codes multimédias offerts.",
      episodesTitle: "Tous les épisodes individuels",
      episodesSubtitle: "Toutes les histoires illustrées en rimes pour les enfants de 2 à 5 ans. Inclut la mission de Léo et Rudy dans la savane !",
      charactersTitle: "Rencontrez les héros",
      charactersSubtitle: "Chaque engin possède un caractère unique et positif auquel les enfants s'identifient immédiatement.",
      bennyTitle: "Benny la pelleteuse",
      bennyDesc: "Pelleteuse enthousiaste et infatigable, un ami loyal toujours prêt à aider.",
      rudyTitle: "Rudy le bulldozer",
      rudyDesc: "Fort et agile, déplaçant des montagnes de sable avec une joie communicative.",
      leoTitle: "Léo la grue",
      leoDesc: "Bienveillante et immense, observant d'en haut pour protéger les nids du chantier.",
      brunoTitle: "Bruno le camion benne",
      brunoDesc: "Robuste transporteur au grand cœur, protecteur des petits canetons.",
      ninaTitle: "Nina la toupie à béton",
      ninaDesc: "Ingénieuse et décidée, gâchant le béton parfait pour bâtir des ponts solides.",
      rinoTitle: "Rino le rouleau compresseur",
      rinoDesc: "Calme et réfléchi, aplanissant le sol et veillant sur l'équipe pendant la nuit.",
      mediaTitle: "Écoutez et regardez les histoires partout",
      watchYouTube: "Regarder sur YouTube"
    },
    scienzaPage: {
      badge: "Vulgarisation scientifique · 7–12 ans",
      heroTitle: "Einstein, tu as raté ça !",
      heroSubtitle: "De Clara Musicco. 55 aventures dans la science d'aujourd'hui | 55 vraies découvertes ! Dinosaures à plumes, trous noirs, robots et le portail secret de la mascotte Otto.",
      featuresTitle: "Ce qui rend ce livre unique",
      featuresSubtitle: "Une œuvre alliant narration vivante et rigueur des plus grandes revues et universités scientifiques mondiales.",
      feat1Title: "55 Découvertes Vérifiées",
      feat1Desc: "Des ondes gravitationnelles au télescope James Webb, des dinosaures à l'intelligence animale : de vraies histoires sourcées (SC-01 à SC-55).",
      feat2Title: "La Mascotte Otto",
      feat2Desc: "Un poulpe curieux et plein d'humour à trois cœurs et neuf cerveaux qui guide les jeunes lecteurs avec clarté.",
      feat3Title: "Portail Secret Exclusif",
      feat3Desc: "Le QR code imprimé dans le livre ouvre un univers interactif avec 7 simulations 3D, vidéos, musée virtuel et cartes à découper.",
      secretOttoTitle: "Le monde secret d'Otto",
      secretOttoDesc: "Le livre est fini, mais pas les découvertes ! Grâce au portail secret via QR code, explorez le Musée, des simulations 3D et des jeux en famille.",
      qrExclusive: "🔒 Accessible via le QR Code exclusif imprimé dans le livre",
      lookInsideSample: "Feuilleter l'extrait"
    },
    colorarePage: {
      badge: "Créativité & Couleurs · 5–10 ans",
      heroTitle: "Fano le nez en l'air",
      heroSubtitle: "De Marco Salucci. L'album illustré à colorier avec plus de 40 planches originales, labyrinthes et anecdotes historiques sur la cité romaine de Vitruve.",
      featuresTitle: "Colorier, découvrir, apprendre",
      featuresSubtitle: "Un grand format conçu pour marier le plaisir du coloriage et la richesse de la découverte culturelle.",
      feat1Title: "Plus de 40 Planches",
      feat1Desc: "Dessins soignés dessinés à la main prêts à être coloriés sur papier épais et résistant.",
      feat2Title: "Histoire & Monuments",
      feat2Desc: "L'Arc d'Auguste, la Basilique de Vitruve, le Carnaval et le port racontés aux enfants avec passion.",
      feat3Title: "Jeux & Activités",
      feat3Desc: "Labyrinthes, énigmes, jeux des différences pour stimuler concentration et motricité fine."
    },
    scuolaPage: {
      badge: "Nouvelle Collection Pédagogique · En Préparation",
      heroTitle: "Pour l'école",
      heroSubtitle: "Supports d'apprentissage, exercices et défis logiques pour consolider les compétences scolaires avec enthousiasme, clarté et méthode.",
      compassTitle: "La Boussole Mystérieuse",
      compassSubtitle: "Bientôt disponible pour la rentrée scolaire",
      projectDesc: "Un projet pédagogique signé Clara Musicco pour transformer les matières scolaires en une aventure captivante.",
      subjectMath: "Matière : Mathématiques",
      grade2: "Niveau : CE1 (2e primaire)",
      age78: "Âge : 7–8 ans",
      authorClara: "Auteure : Clara Musicco",
      bookMath2Title: "La Boussole Mystérieuse — Mathématiques CE1",
      bookMath2Desc: "Le volume de CE1 aborde les nombres jusqu'à 100, le calcul mental, les premiers problèmes illustrés et l'orientation spatiale via des énigmes palpitantes.",
      whatInside: "Ce que les enfants trouveront :",
      featExercises: "Exercices progressifs",
      featVisual: "Approche visuelle",
      featSolutions: "Solutions guidées",
      statusInWork: "En préparation — Bientôt disponible sur Amazon"
    },
    common: {
      redirecting: "Redirection en cours...",
      redirectingDesc: "Nous ouvrons la page de votre livre. Si vous n'êtes pas redirigé dans quelques secondes, cliquez sur le bouton ci-dessous."
    }
  },

  es: {
    brand: {
      authorsRole: "Los autores de CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Compras oficiales garantizadas exclusivamente en Amazon en edición de bolsillo.",
      cantierePitch: "Las Aventuras de la Construcción de Marco Salucci.",
      scienzaPitch: "Colección Ciencia y curiosidad de Clara Musicco.",
      colorarePitch: "Colección para colorear y crear de Marco Salucci.",
      scuolaPitch: "Área didáctica y de aprendizaje de CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Autor & Creador",
      roleAuthorScience: "Autora & Divulgadora científica",
      originsTitle: "El nacimiento de las historias",
      originsSubtitle: "Fotografías auténticas de los orígenes: tardes juntos observando las obras y momentos preciosos de lectura compartida.",
      cantiereBooksBtn: "Los Libros de la Construcción",
      fanoBookBtn: "Fano con la nariz hacia arriba",
      scienceBooksBtn: "Los Libros de Ciencia",
      schoolBooksBtn: "Para la escuela"
    },
    cantierePage: {
      badge: "Serie original · 2–5 años",
      heroTitle: "Las Aventuras de la Construcción",
      heroSubtitle: "La célebre serie ilustrada de Marco Salucci: historias en rima, grandes máquinas e inolvidables lecciones de amistad, cooperación y respeto por la naturaleza.",
      ctaRaccolte: "Descubre las colecciones Vol. 1 y 2",
      ctaCharacters: "Los Personajes",
      raccolteTitle: "Cuatro historias completas en cada volumen",
      raccolteSubtitle: "Ediciones especiales en gran formato (21,5 × 28 cm) con textos en rima, portada rústica de calidad y códigos QR con contenidos multimedia de regalo.",
      episodesTitle: "Todos los episodios individuales",
      episodesSubtitle: "Todas las historias ilustradas en rima para niños de 2 a 5 años. ¡Incluye la emocionante misión de Leo y Rudy en la sabana!",
      charactersTitle: "Conoce a los protagonistas",
      charactersSubtitle: "Cada vehículo tiene un carácter único y positivo con el que los niños se identifican al instante.",
      bennyTitle: "Benny la excavadora",
      bennyDesc: "Excavadora entusiasta e incansable, un fiel amigo dispuesto a ayudar a todos.",
      rudyTitle: "Rudy la excavadora",
      rudyDesc: "Fuerte y rápida, mueve montones de arena y rocas con alegre energía.",
      leoTitle: "Leo la grúa",
      leoDesc: "Amable y muy alta, observa desde arriba y cuida con cariño los nidos de la obra.",
      brunoTitle: "Bruno el camión",
      brunoDesc: "Robusto volquete de tierno corazón, defensor de los patitos.",
      ninaTitle: "Nina la hormigonera",
      ninaDesc: "Ingeniosa y decidida, amasa el hormigón perfecto para tender puentes seguros.",
      rinoTitle: "Rino la apisonadora",
      rinoDesc: "Calma y reflexiva, allana el terreno y vigila al equipo durante la noche.",
      mediaTitle: "Escucha y mira las historias en cualquier lugar",
      watchYouTube: "Ver en YouTube"
    },
    scienzaPage: {
      badge: "Divulgación científica · 7–12 años",
      heroTitle: "¡Einstein, te perdiste esto!",
      heroSubtitle: "De Clara Musicco. ¡55 aventuras en la ciencia actual | 55 descubrimientos reales! Dinosaurios con plumas, agujeros negros, robots y el portal secreto de Otto.",
      featuresTitle: "Qué hace único a este libro",
      featuresSubtitle: "Una obra que une una narración viva con el rigor verificado de revistas y universidades científicas mundiales.",
      feat1Title: "55 Descubrimientos Verificados",
      feat1Desc: "De las ondas gravitacionales al telescopio James Webb, dinosaurios e inteligencia animal: historias reales referenciadas (SC-01 a SC-55).",
      feat2Title: "La Mascota Otto",
      feat2Desc: "Un pulpo curioso e irónico con tres corazones y nueve cerebros que guía a los pequeños lectores con humor y claridad.",
      feat3Title: "Portal Secreto Exclusivo",
      feat3Desc: "El código QR del libro abre un mundo interactivo con 7 simulaciones 3D, videoteca, museo virtual y tarjetas recortables.",
      secretOttoTitle: "El mundo secreto de Otto",
      secretOttoDesc: "El libro termina, ¡los descubrimientos no! A través del portal secreto por QR, explora el Museo, simulaciones 3D y juegos familiares.",
      qrExclusive: "🔒 Accesible mediante el código QR exclusivo impreso en el libro",
      lookInsideSample: "Hojear muestra interior"
    },
    colorarePage: {
      badge: "Creatividad & Color · 5–10 años",
      heroTitle: "Fano con la nariz hacia arriba",
      heroSubtitle: "De Marco Salucci. El libro para colorear con más de 40 láminas originales, laberintos y datos históricos sobre la ciudad romana de Vitruvio.",
      featuresTitle: "Colorear, descubrir, aprender",
      featuresSubtitle: "Un álbum en gran formato diseñado para combinar la calma del dibujo con el valor cultural del descubrimiento.",
      feat1Title: "Más de 40 Láminas",
      feat1Desc: "Dibujos hechos a mano listos para colorear en papel grueso y resistente.",
      feat2Title: "Historia y Monumentos",
      feat2Desc: "El Arco de Augusto, la Basílica de Vitruvio, el Carnaval y el puerto explicados con divertidas anécdotas para niños.",
      feat3Title: "Juegos y Actividades",
      feat3Desc: "Laberintos, acertijos y busca las diferencias para ejercitar la concentración y la motricidad fina."
    },
    scuolaPage: {
      badge: "Nueva Colección Didáctica · En Preparación",
      heroTitle: "Para la escuela",
      heroSubtitle: "Materiales de aprendizaje, ejercicios y retos lógicos para afianzar competencias escolares con entusiasmo, claridad y método.",
      compassTitle: "La Brújula Misteriosa",
      compassSubtitle: "Próximamente para el nuevo curso escolar",
      projectDesc: "Un proyecto pedagógico de Clara Musicco para convertir las asignaturas en una aventura emocionante.",
      subjectMath: "Asignatura: Matemáticas",
      grade2: "Curso: 2º de Primaria",
      age78: "Edad: 7–8 años",
      authorClara: "Autora: Clara Musicco",
      bookMath2Title: "La Brújula Misteriosa — Matemáticas 2º Primaria",
      bookMath2Desc: "El tomo de 2º de primaria aborda los números hasta el 100, cálculo mental, problemas ilustrados y orientación espacial mediante divertidos enigmas.",
      whatInside: "Qué encontrarán los niños:",
      featExercises: "Ejercicios progresivos",
      featVisual: "Enfoque visual",
      featSolutions: "Soluciones guiadas",
      statusInWork: "En preparación — Muy pronto en Amazon"
    },
    common: {
      redirecting: "Redirigiendo...",
      redirectingDesc: "Abriendo la página de tu libro. Si no te redirige en unos segundos, pulsa el botón siguiente."
    }
  },

  nl: {
    brand: {
      authorsRole: "De auteurs van CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Gegarandeerde officiële aankopen exclusief op Amazon in paperbackeditie.",
      cantierePitch: "De Bouwplaats Avonturen van Marco Salucci.",
      scienzaPitch: "Wetenschap & Verwondering collectie van Clara Musicco.",
      colorarePitch: "Kleur- en knutselcollectie van Marco Salucci.",
      scuolaPitch: "Educatieve en leerserie van CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Auteur & Bedenker",
      roleAuthorScience: "Auteur & Wetenschapscommunicator",
      originsTitle: "Het ontstaan van de verhalen",
      originsSubtitle: "Authentieke foto's uit het begin: samen middagen doorbrengen met kijken naar bouwplaatsen en dierbare voorleesmomenten.",
      cantiereBooksBtn: "De Bouwplaatsboeken",
      fanoBookBtn: "Fano met de neus in de lucht",
      scienceBooksBtn: "Wetenschapsboeken",
      schoolBooksBtn: "Voor school"
    },
    cantierePage: {
      badge: "Originele serie · 2–5 jaar",
      heroTitle: "De Bouwplaats Avonturen",
      heroSubtitle: "De populaire prentenboekenreeks van Marco Salucci: rijmverhalen, grote machines en onvergetelijke lessen in vriendschap, samenwerking en respect voor de natuur.",
      ctaRaccolte: "Ontdek verzamelbundels Vol. 1 & 2",
      ctaCharacters: "De Personages",
      raccolteTitle: "Vier complete verhalen in elk deel",
      raccolteSubtitle: "Speciale grootformaat edities (21,5 × 28 cm) met rijmteksten, luxe paperback en gratis multimedia QR-codes.",
      episodesTitle: "Alle losse afleveringen",
      episodesSubtitle: "Alle geïllustreerde rijmverhalen voor kinderen van 2–5 jaar. Inclusief Leo en Rudy's savannemissie!",
      charactersTitle: "Ontmoet de personages",
      charactersSubtitle: "Elk voertuig heeft een uniek en positief karakter waarin kinderen zich meteen herkennen.",
      bennyTitle: "Benny de graafmachine",
      bennyDesc: "Enthousiaste, onvermoeibare graver en trouwe vriend die altijd voor iedereen klaarstaat.",
      rudyTitle: "Rudy de bulldozer",
      rudyDesc: "Sterk en snel, verzet bergen zand en stenen met aanstekelijke energie.",
      leoTitle: "Leo de kraanwagen",
      leoDesc: "Vriendelijk en torenhoog, waakt van bovenaf en beschermt nestjes op de bouwplaats.",
      brunoTitle: "Bruno de kiepwagen",
      brunoDesc: "Stevige vervoerder met een klein hartje, beschermer van de eendenkuikens.",
      ninaTitle: "Nina de betonmolen",
      ninaDesc: "Slim en vastberaden, mengt het beste beton voor oersterke bruggen.",
      rinoTitle: "Rino de wals",
      rinoDesc: "Rustig en bedachtzaam, egaliseert het terrein en bewaakt het team 's nachts.",
      mediaTitle: "Luister en bekijk de verhalen overal",
      watchYouTube: "Bekijk op YouTube"
    },
    scienzaPage: {
      badge: "Wetenschap voor kinderen · 7–12 jaar",
      heroTitle: "Einstein, dit heb je gemist!",
      heroSubtitle: "Van Clara Musicco. 55 avonturen in de hedendaagse wetenschap | 55 echte ontdekkingen! Gevederde dino's, zwarte gaten, robots en Otto's geheime portaal.",
      featuresTitle: "Wat dit boek uniek maakt",
      featuresSubtitle: "Een levendig verteld kinderboek gebaseerd op gecontroleerde bronnen van toonaangevende wetenschappelijke bladen en universiteiten.",
      feat1Title: "55 Geverifieerde Ontdekkingen",
      feat1Desc: "Van zwaartekrachtsgolven tot de James Webb-telescoop en dierlijke intelligentie: waargebeurde verhalen met bronverwijzingen (SC-01 t/m SC-55).",
      feat2Title: "De Mascotte Otto",
      feat2Desc: "Een nieuwsgierige inktvis met drie harten en negen breinen die jonge lezers met humor en eenvoud door moeilijke vragen loodst.",
      feat3Title: "Exclusief Geheim Portaal",
      feat3Desc: "De QR-code in het boek ontgrendelt een interactieve wereld met 7 3D-simulaties, videotheek, virtueel museum en knutselkaarten.",
      secretOttoTitle: "De geheime wereld van Otto",
      secretOttoDesc: "Het boek is uit, de ontdekkingen gaan door! Verken via de QR-code het virtuele museum, 3D-simulaties en gezelschapsspelletjes.",
      qrExclusive: "🔒 Toegankelijk via de exclusieve QR-code in het boek",
      lookInsideSample: "Inkijkexemplaar bekijken"
    },
    colorarePage: {
      badge: "Creativiteit & Kleur · 5–10 jaar",
      heroTitle: "Fano met de neus in de lucht",
      heroSubtitle: "Van Marco Salucci. Het kleurboek met meer dan 40 originele tekeningen, doolhoven en historische weetjes over de Romeinse stad van Vitruvius.",
      featuresTitle: "Kleuren, ontdekken, leren",
      featuresSubtitle: "Een grootformaat album dat rustgevend kleuren combineert met culturele ontdekkingen.",
      feat1Title: "Meer dan 40 Platen",
      feat1Desc: "Met de hand getekende illustraties op stevig, kwalitatief papier.",
      feat2Title: "Geschiedenis & Monumenten",
      feat2Desc: "De Boog van Augustus, de basiliek, het carnaval en de haven, op kindermaat verteld.",
      feat3Title: "Spelletjes & Activiteiten",
      feat3Desc: "Doolhoven, raadsels en zoekplaatjes om concentratie en fijne motoriek te oefenen."
    },
    scuolaPage: {
      badge: "Nieuwe Educatieve Reeks · In Voorbereiding",
      heroTitle: "Voor school",
      heroSubtitle: "Leermiddelen, oefeningen en logische puzzels om schoolvaardigheden met plezier, helderheid en methode te versterken.",
      compassTitle: "Het Mystieke Kompas",
      compassSubtitle: "Binnenkort beschikbaar voor het nieuwe schooljaar",
      projectDesc: "Een pedagogisch project van Clara Musicco om schoolvakken om te toveren in een boeiend avontuur.",
      subjectMath: "Vak: Rekenen & Wiskunde",
      grade2: "Klas: Groep 4 (2e leerjaar)",
      age78: "Leeftijd: 7–8 jaar",
      authorClara: "Auteur: Clara Musicco",
      bookMath2Title: "Het Mystieke Kompas — Rekenen Groep 4",
      bookMath2Desc: "Het deel voor groep 4 behandelt getallen tot 100, hoofdrekenen, verhaaltjessommen en ruimtelijk inzicht aan de hand van motiverende raadsels.",
      whatInside: "Wat kinderen ontdekken:",
      featExercises: "Opbouwende oefeningen",
      featVisual: "Visuele aanpak",
      featSolutions: "Stap-voor-stap antwoorden",
      statusInWork: "In voorbereiding — Binnenkort op Amazon"
    },
    common: {
      redirecting: "Bezig met doorsturen...",
      redirectingDesc: "We openen de pagina van je boek. Als je niet binnen enkele seconden wordt doorgestuurd, klik dan op de onderstaande knop."
    }
  },

  pl: {
    brand: {
      authorsRole: "Autorzy CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Gwarantowane oficjalne zakupy wyłącznie na Amazon w wydaniu broszurowym.",
      cantierePitch: "Przygody na Placu Budowy – Marco Salucci.",
      scienzaPitch: "Seria Nauka i ciekawostki – Clara Musicco.",
      colorarePitch: "Seria do kolorowania i tworzenia – Marco Salucci.",
      scuolaPitch: "Dział edukacji i nauki CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Autor & Twórca",
      roleAuthorScience: "Autorka & Popularyzatorka nauki",
      originsTitle: "Narodziny opowieści",
      originsSubtitle: "Autentyczne zdjęcia z początków: popołudnia spędzone na wspólnym obserwowaniu budowy i cenne chwile czytania.",
      cantiereBooksBtn: "Książki z placu budowy",
      fanoBookBtn: "Fano z zadartym nosem",
      scienceBooksBtn: "Książki o nauce",
      schoolBooksBtn: "Dla szkoły"
    },
    cantierePage: {
      badge: "Oryginalna seria · 2–5 lat",
      heroTitle: "Przygody na Placu Budowy",
      heroSubtitle: "Słynna seria ilustrowana Marco Salucciego: rymowane opowieści, wielkie maszyny i niezapomniane lekcje przyjaźni, współpracy oraz szacunku dla natury.",
      ctaRaccolte: "Odkryj tomy zbiorcze 1 i 2",
      ctaCharacters: "Bohaterowie",
      raccolteTitle: "Cztery kompletne opowieści w każdym tomie",
      raccolteSubtitle: "Wydania specjalne w dużym formacie (21,5 × 28 cm) z rymowanym tekstem, miękką oprawą wysokiej jakości i kodami QR z multimediami.",
      episodesTitle: "Wszystkie pojedyncze odcinki",
      episodesSubtitle: "Wszystkie rymowane książeczki z obrazkami dla dzieci w wieku 2–5 lat. W tym wyprawa Leo i Rudy'ego na sawannę!",
      charactersTitle: "Poznaj bohaterów",
      charactersSubtitle: "Każdy pojazd ma wyjątkowy charakter, z którym dzieci od razu się utożsamiają.",
      bennyTitle: "Benny koparka",
      bennyDesc: "Pełna entuzjazmu koparka i wierny przyjaciel gotowy pomóc każdemu.",
      rudyTitle: "Rudy spychacz",
      rudyDesc: "Silny i szybki spychacz, który z uśmiechem przenosi góry piasku.",
      leoTitle: "Leo dźwig",
      leoDesc: "Łagodny olbrzym, który czuwa z góry i troskliwie chroni gniazda ptaków.",
      brunoTitle: "Bruno wywrotka",
      brunoDesc: "Krzepka ciężarówka o wielkim sercu, obrońca małych kaczuszek.",
      ninaTitle: "Nina betoniarka",
      ninaDesc: "Pomysłowa i zdeterminowana, miesza idealny beton pod bezpieczne mosty.",
      rinoTitle: "Rino walec",
      rinoDesc: "Spokojny i rozważny walec drogowy, który nocą czuwa nad całą ekipą.",
      mediaTitle: "Słuchaj i oglądaj historie wszędzie",
      watchYouTube: "Oglądaj na YouTube"
    },
    scienzaPage: {
      badge: "Popularyzacja nauki · 7–12 lat",
      heroTitle: "Einstein, to cię ominęło!",
      heroSubtitle: "Clara Musicco. 55 przygód w dzisiejszej nauce | 55 prawdziwych odkryć! Pierzaste dinozaury, czarne dziury, roboty i sekretny portal ośmiornicy Otto.",
      featuresTitle: "Co wyróżnia tę książkę",
      featuresSubtitle: "Dzieło łączące barwną narrację z rzetelnością największych światowych czasopism i uczelni naukowych.",
      feat1Title: "55 Potwierdzonych Odkryć",
      feat1Desc: "Od fal grawitacyjnych po teleskop Webba, od dinozaurów po inteligencję zwierząt: prawdziwe historie ze źródłami (SC-01 do SC-55).",
      feat2Title: "Maskotka Otto",
      feat2Desc: "Ciekawska ośmiornica o trzech sercach i dziewięciu mózgach, która w przystępny i dowcipny sposób objaśnia trudne zjawiska.",
      feat3Title: "Sekretny Portal Multimedialny",
      feat3Desc: "Kod QR w książce otwiera dostęp do 7 symulacji 3D, filmów, wirtualnego muzeum z paszportem i kart do wycinania.",
      secretOttoTitle: "Tajemniczy świat Otto",
      secretOttoDesc: "Książka się skończyła, ale odkrycia nie! Dzięki portalowi QR dzieci mogą badać Muzeum, symulacje 3D i pobierać gry rodzinne.",
      qrExclusive: "🔒 Dostępne przez ekskluzywny kod QR wydrukowany w książce",
      lookInsideSample: "Zobacz fragment książki"
    },
    colorarePage: {
      badge: "Kreatywność i kolory · 5–10 lat",
      heroTitle: "Fano z zadartym nosem",
      heroSubtitle: "Marco Salucci. Kolorowanka z ponad 40 autorskimi planszami, labiryntami i ciekawostkami o rzymskim mieście Witruwiusza.",
      featuresTitle: "Koloruj, odkrywaj, poznawaj",
      featuresSubtitle: "Wielkoformatowy album łączący relaks z wartościową wiedzą o historii i architekturze.",
      feat1Title: "Ponad 40 Plansz",
      feat1Desc: "Ręcznie rysowane ilustracje na grubym papierze odpornym na pisaki i kredki.",
      feat2Title: "Historia i Zabytki",
      feat2Desc: "Łuk Augusta, bazylika Witruwiusza, karnawał i port w pełnych humoru opowiastkach dla dzieci.",
      feat3Title: "Gry i Łamigłówki",
      feat3Desc: "Labirynty, zagadki i rebusy wspierające koncentrację oraz sprawność manualną."
    },
    scuolaPage: {
      badge: "Nowa Seria Edukacyjna · W Przygotowaniu",
      heroTitle: "Dla szkoły",
      heroSubtitle: "Materiały dydaktyczne, ćwiczenia i zadania logiczne wspierające naukę szkolną w sposób ciekawy, jasny i metodyczny.",
      compassTitle: "Tajemniczy Kompas",
      compassSubtitle: "Wkrótce na nowy rok szkolny",
      projectDesc: "Projekt edukacyjny Clary Musicco zamieniający przedmioty szkolne w fascynującą przygodę.",
      subjectMath: "Przedmiot: Matematyka",
      grade2: "Klasa: 2. klasa szkoły podstawowej",
      age78: "Wiek: 7–8 lat",
      authorClara: "Autorka: Clara Musicco",
      bookMath2Title: "Tajemniczy Kompas — Matematyka dla 2. klasy",
      bookMath2Desc: "Tom dla 2. klasy obejmuje liczby do 100, liczenie w pamięci, zadania z treścią i orientację przestrzenną poprzez pełne zagadek łamigłówki.",
      whatInside: "Co znajdą dzieci:",
      featExercises: "Stopniowane ćwiczenia",
      featVisual: "Podejście wizualne",
      featSolutions: "Wskazówki i rozwiązania",
      statusInWork: "W przygotowaniu — Wkrótce na Amazon"
    },
    common: {
      redirecting: "Przekierowywanie...",
      redirectingDesc: "Otwieramy stronę Twojej książki. Jeśli przekierowanie nie nastąpi za chwilę, kliknij poniższy przycisk."
    }
  },

  se: {
    brand: {
      authorsRole: "Författarna till CSA Books 4 Kids"
    },
    footer: {
      amazonDisclaimer: "Garanterade officiella köp exklusivt på Amazon i pocketutgåva.",
      cantierePitch: "Byggarbetsplatsens Äventyr av Marco Salucci.",
      scienzaPitch: "Vetenskap och upptäckter av Clara Musicco.",
      colorarePitch: "Målar- och pysselserie av Marco Salucci.",
      scuolaPitch: "Pedagogisk och lärande serie av CSA Books 4 Kids."
    },
    about: {
      roleAuthorCreator: "Författare & Skapare",
      roleAuthorScience: "Författare & Vetenskapsförmedlare",
      originsTitle: "Hur berättelserna föddes",
      originsSubtitle: "Autentiska fotografier från början: eftermiddagar tillsammans vid byggarbetsplatser och värdefulla stunder av gemensam läsning.",
      cantiereBooksBtn: "Byggarbetsplatsens böcker",
      fanoBookBtn: "Fano med näsan i vädret",
      scienceBooksBtn: "Vetenskapsböcker",
      schoolBooksBtn: "För skolan"
    },
    cantierePage: {
      badge: "Originalserie · 2–5 år",
      heroTitle: "Byggarbetsplatsens Äventyr",
      heroSubtitle: "Den hyllade bilderboksserien av Marco Salucci: berättelser på rim, stora fordon och oförglömliga lärdomar om vänskap, samarbete och respekt för naturen.",
      ctaRaccolte: "Upptäck samlingsvolymerna Vol. 1 & 2",
      ctaCharacters: "Karaktärerna",
      raccolteTitle: "Fyra kompletta berättelser i varje volym",
      raccolteSubtitle: "Speciella storformatsutgåvor (21,5 × 28 cm) med rimtexter, högkvalitativt mjukband och multimedia-QR-koder som gåva.",
      episodesTitle: "Alla enskilda avsnitt",
      episodesSubtitle: "Alla illustrerade rimmade berättelser för barn 2–5 år. Inkluderar Leo och Rudys savannäventyr!",
      charactersTitle: "Träffa karaktärerna",
      charactersSubtitle: "Varje fordon har en unik personlighet som barn omedelbart känner igen sig i.",
      bennyTitle: "Grävskopan Benny",
      bennyDesc: "Entusiastisk, outtröttlig grävare och trogen vän som gärna hjälper alla.",
      rudyTitle: "Schaktmaskinen Rudy",
      rudyDesc: "Stark och snabb, flyttar sandberg och sten med smittande glädje.",
      leoTitle: "Kranbilen Leo",
      leoDesc: "Vänlig och väldig, vakar från ovan och skyddar fågelbon på arbetsplatsen.",
      brunoTitle: "Lastbilen Bruno",
      brunoDesc: "Rejäl dumper med ett varmt hjärta, beskyddare av små ankungar.",
      ninaTitle: "Betongbilen Nina",
      ninaDesc: "Klurig och målmedveten, blandar perfekt betong för att bygga trygga broar.",
      rinoTitle: "Vältbilen Rino",
      rinoDesc: "Lugn och eftertänksam vägvält som jämnar till marken och vakar över teamet på natten.",
      mediaTitle: "Lyssna och titta på berättelserna överallt",
      watchYouTube: "Se på YouTube"
    },
    scienzaPage: {
      badge: "Vetenskap för barn · 7–12 år",
      heroTitle: "Einstein, det här missade du!",
      heroSubtitle: "Av Clara Musicco. 55 äventyr i modern vetenskap | 55 sanna upptäckter! Fjäderklädda dinosaurier, svarta hål, robotar och bläckfisken Ottos hemliga portal.",
      featuresTitle: "Vad som gör boken unik",
      featuresSubtitle: "Ett verk som förenar livfullt berättande med verifierad fakta från världsledande vetenskapliga tidskrifter och universitet.",
      feat1Title: "55 Verifierade Upptäckter",
      feat1Desc: "Från gravitationsvågor till James Webb-teleskopet och djurens intelligens: sanna berättelser med källhänvisningar (SC-01 till SC-55).",
      feat2Title: "Maskoten Otto",
      feat2Desc: "En nyfiken, humoristisk bläckfisk med tre hjärtan och nio hjärnor som förklarar komplexa gåtor enkelt och lekfullt.",
      feat3Title: "Exklusiv Hemlig Portal",
      feat3Desc: "QR-koden i boken öppnar en interaktiv värld med 7 3D-simuleringar, videor, museum med upptäckarpass och pysselkort.",
      secretOttoTitle: "Ottos hemliga värld",
      secretOttoDesc: "Boken tar slut, men inte upptäckterna! Via QR-portalen kan barn utforska museet, 3D-simuleringar och familjespel.",
      qrExclusive: "🔒 Tillgänglig via exklusiv QR-kod tryckt i boken",
      lookInsideSample: "Bläddra i smakprov"
    },
    colorarePage: {
      badge: "Kreativitet & Färg · 5–10 år",
      heroTitle: "Fano med näsan i vädret",
      heroSubtitle: "Av Marco Salucci. Målarboken med över 40 handtecknade planscher, labyrinter och historiska kuriosa om den romerska staden.",
      featuresTitle: "Måla, upptäck, lär",
      featuresSubtitle: "Ett storformatsalbum skapat för att förena avkopplande skapande med kulturella upptäckter.",
      feat1Title: "Över 40 Planscher",
      feat1Desc: "Detaljerade handteckningar redo att färgläggas på tjockt kvalitetspapper.",
      feat2Title: "Historia & Monument",
      feat2Desc: "Augustusbågen, Vitruvius basilika, karnevalen och hamnen berättade med roliga anekdoter.",
      feat3Title: "Pyssel & Klurigheter",
      feat3Desc: "Labyrinter, gåtor och finn-fem-fel som tränar fokus och finmotorik."
    },
    scuolaPage: {
      badge: "Ny Pedagogisk Serie · Under Förberedelse",
      heroTitle: "För skolan",
      heroSubtitle: "Läromedel, övningar och logiska klurigheter för att stärka skolkunskaper med glädje, klarhet och metod.",
      compassTitle: "Den Mystiska Kompassen",
      compassSubtitle: "Kommer snart inför det nya läsåret",
      projectDesc: "Ett pedagogiskt projekt av Clara Musicco som gör skolämnen till ett fängslande äventyr.",
      subjectMath: "Ämne: Matematik",
      grade2: "Årskurs: Åk 2",
      age78: "Ålder: 7–8 år",
      authorClara: "Författare: Clara Musicco",
      bookMath2Title: "Den Mystiska Kompassen — Matematik Åk 2",
      bookMath2Desc: "Boken för årskurs 2 tränar tal upp till 100, huvudräkning, textuppgifter och rumsuppfattning genom roliga mysterier.",
      whatInside: "Vad barnen får uppleva:",
      featExercises: "Stegvisa övningar",
      featVisual: "Visuellt lärande",
      featSolutions: "Guidade facit",
      statusInWork: "Under förberedelse — Snart på Amazon"
    },
    common: {
      redirecting: "Omdirigerar...",
      redirectingDesc: "Vi öppnar sidan för din bok. Om du inte omdirigeras automatiskt inom några sekunder, klicka på knappen nedan."
    }
  },

  jp: {
    brand: {
      authorsRole: "CSA Books 4 Kidsの著者"
    },
    footer: {
      amazonDisclaimer: "Amazon限定ペーパーバック版の公式保証付き購入。",
      cantierePitch: "マルコ・サルッチによる工事現場のぼうけんシリーズ。",
      scienzaPitch: "クララ・ムシッコによる科学と好奇心シリーズ。",
      colorarePitch: "マルコ・サルッチによるぬりえと創作シリーズ。",
      scuolaPitch: "CSA Books 4 Kidsの教育・学習シリーズ。"
    },
    about: {
      roleAuthorCreator: "著者＆クリエイター",
      roleAuthorScience: "著者＆サイエンスコミュニケーター",
      originsTitle: "物語の誕生",
      originsSubtitle: "原点となった本物の写真：工事現場を一緒に眺めて過ごした午後と、家族で本を読んだかけがえのない時間。",
      cantiereBooksBtn: "工事現場の絵本",
      fanoBookBtn: "見上げてごらんファーノの街",
      scienceBooksBtn: "科学の絵本",
      schoolBooksBtn: "学習・学校向け"
    },
    cantierePage: {
      badge: "オリジナルシリーズ · 2〜5歳",
      heroTitle: "工事現場のぼうけん",
      heroSubtitle: "マルコ・サルッチによる人気の絵本シリーズ：リズミカルな韻を踏んだ物語、働く車たち、そして友情・協力・自然への思いやりを描いた心温まるストーリー。",
      ctaRaccolte: "コレクション第1巻・第2巻を見る",
      ctaCharacters: "キャラクター紹介",
      raccolteTitle: "各巻に4つの完全な物語を収録",
      raccolteSubtitle: "大判サイズ（21.5×28cm）、上質なペーパーバック、特典のQRコード付きマルチメディアコンテンツを収録した特別版。",
      episodesTitle: "すべての単独エピソード",
      episodesSubtitle: "2〜5歳の子どもたちのための、すべての韻を踏んだ絵本シリーズ。レオとルディのサバンナ救出劇も収録！",
      charactersTitle: "なかまたちの紹介",
      charactersSubtitle: "どの車も個性的で前向きなキャラクターで、子どもたちにすぐに親しまれます。",
      bennyTitle: "ショベルカーのベニー",
      bennyDesc: "いつも元気いっぱいで頼もしい掘削機。困っている仲間を決して見捨てません。",
      rudyTitle: "ブルドーザーのルディ",
      rudyDesc: "力持ちで素早く、山のような砂や石を楽しそうに運ぶ明るいブルドーザー。",
      leoTitle: "クレーン車のレオ",
      leoDesc: "背が高くて心優しいクレーン車。高いところから現場の小鳥の巣を温かく見守ります。",
      brunoTitle: "ダンプカーのブルーノ",
      brunoDesc: "頑丈で力持ちだけど心優しいダンプカー。小さなカモの親子を大切に守ります。",
      ninaTitle: "ミキサー車のニーナ",
      ninaDesc: "機転が利きしっかり者。安全な橋を作るための完璧なコンクリートを練り上げます。",
      rinoTitle: "ロードローラーのリノ",
      rinoDesc: "物静かで落ち着いたロードローラー。夜通し地面を平らに整え、仲間を見守ります。",
      mediaTitle: "いつでもどこでも物語を楽しもう",
      watchYouTube: "YouTubeで見る"
    },
    scienzaPage: {
      badge: "子どものための科学 · 7〜12歳",
      heroTitle: "アインシュタイン、これを見逃したね！",
      heroSubtitle: "クララ・ムシッコ著。現代科学の55の冒険｜55の驚くべき本物の発見！羽毛恐竜、ブラックホール、ロボット、そしてタコのオットーの秘密ポータル。",
      featuresTitle: "この本ならではの魅力",
      featuresSubtitle: "生き生きとした物語と、世界の主要な科学誌や大学の研究に基づいた確かな内容を両立した一冊。",
      feat1Title: "55の実証された発見",
      feat1Desc: "重力波からジェイムズ・ウェッブ宇宙望遠鏡、羽毛恐竜、動物の知能まで：科学的出典（SC-01〜SC-55）付きの真実の物語。",
      feat2Title: "マスコットのオットー",
      feat2Desc: "3つの心臓と9つの脳を持つ好奇心旺盛でユーモラスなタコ。難しい科学の疑問を楽しく分かりやすく案内します。",
      feat3Title: "限定シークレットポータル",
      feat3Desc: "本に印刷されたQRコードから、7つの3Dシミュレーション、動画、パスポート付き仮想博物館、印刷用カードが楽しめます。",
      secretOttoTitle: "オットーの秘密の世界",
      secretOttoDesc: "本を読み終えても発見は終わりません！QRコードの秘密ポータルから、不可能の科学博物館や3D物理シミュレーションを体験できます。",
      qrExclusive: "🔒 本に印刷された限定QRコードからアクセス",
      lookInsideSample: "サンプルページを見る"
    },
    colorarePage: {
      badge: "創造力と色彩 · 5〜10歳",
      heroTitle: "見上げてごらんファーノの街",
      heroSubtitle: "マルコ・サルッチ著。40枚以上のオリジナル手描きイラスト、迷路、歴史トリビアで古代ローマの街を探検するぬりえ絵本。",
      featuresTitle: "ぬりえで発見し、学ぶ",
      featuresSubtitle: "絵を描くリラックスした楽しさと、文化的な発見の喜びを組み合わせた大判アルバム。",
      feat1Title: "40枚以上の手描き原画",
      feat1Desc: "色鉛筆やマーカーで塗るのに最適な、厚手で丈夫な上質紙に描かれた精密なイラスト。",
      feat2Title: "歴史とモニュメント",
      feat2Desc: "アウグストゥスの凱旋門、ウィトルウィウスのバシリカ、カーニバルや港の物語を子ども向けに紹介。",
      feat3Title: "ゲームとアクティビティ",
      feat3Desc: "集中力と手先の器用さを育む迷路、クイズ、間違い探しパズルを多数収録。"
    },
    scuolaPage: {
      badge: "新しい学習シリーズ · 刊行準備中",
      heroTitle: "学習・学校向け",
      heroSubtitle: "確かな自信と知的好奇心を育む、わかりやすく体系的な学習教材・思考力パズルシリーズ。",
      compassTitle: "ふしぎなコンパス",
      compassSubtitle: "新学期に向けてまもなく登場",
      projectDesc: "教科の勉強をワクワクする冒険へと変える、クララ・ムシッコによる新しい教育プロジェクト。",
      subjectMath: "教科：算数・数学",
      grade2: "対象学年：小学2年生",
      age78: "対象年齢：7〜8歳",
      authorClara: "著者：クララ・ムシッコ",
      bookMath2Title: "ふしぎなコンパス — 小学2年生の算数",
      bookMath2Desc: "100までの数、暗算、文章題、図形と空間認識を、謎解きストーリーを通して楽しく無理なく学びます。",
      whatInside: "本書の特長：",
      featExercises: "ステップアップ練習問題",
      featVisual: "視覚的で直感的な解説",
      featSolutions: "丁寧なガイド付き解答",
      statusInWork: "刊行準備中 — まもなくAmazonにて発売"
    },
    common: {
      redirecting: "転送中…",
      redirectingDesc: "書籍ページを開いています。数秒後に自動転送されない場合は、下のボタンを押してください。"
    }
  }
};

// Deep merge into currentData
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

for (const lang of Object.keys(EXTENSIONS)) {
  if (!currentData[lang]) currentData[lang] = {};
  deepMerge(currentData[lang], EXTENSIONS[lang]);
}

// Write back data/i18n.json
fs.writeFileSync(i18nPath, JSON.stringify(currentData, null, 2), 'utf8');

// Write data/i18n.js
const i18nJsPath = path.join(__dirname, '..', 'data', 'i18n.js');
fs.writeFileSync(
  i18nJsPath,
  `// Auto-generated 9-language dictionary for CSA Books 4 Kids\nwindow.SITE_I18N = ${JSON.stringify(currentData, null, 2)};\nif (typeof module !== 'undefined') module.exports = window.SITE_I18N;\n`,
  'utf8'
);

console.log('✅ data/i18n.json e data/i18n.js aggiornati con successo per tutte le 9 lingue!');

// Compile runtime
const { compile } = require('./compile-runtime.js');
compile();
