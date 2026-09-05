/**
 * CSA Books 4 Kids - Main Application Script
 * 14 Amazon Marketplaces with automatic country detection,
 * Multi-Language UI (flagcdn.com flags), secondary book language filter,
 * uncropped full hero banner & Read Sample Viewer
 */

// ============================================================================
// AMAZON MARKETPLACE DEFINITIONS (14 Official Stores)
// ============================================================================
const AMAZON_MARKETS = {
  us: { name: "Amazon.com (US)", code: "US", flagCode: "us", domain: "amazon.com", buttonLabel: "Amazon.com (US)" },
  uk: { name: "Amazon.co.uk (UK)", code: "UK", flagCode: "gb", domain: "amazon.co.uk", buttonLabel: "Amazon.co.uk (UK)" },
  de: { name: "Amazon.de (DE)", code: "DE", flagCode: "de", domain: "amazon.de", buttonLabel: "Amazon.de (DE)" },
  fr: { name: "Amazon.fr (FR)", code: "FR", flagCode: "fr", domain: "amazon.fr", buttonLabel: "Amazon.fr (FR)" },
  es: { name: "Amazon.es (ES)", code: "ES", flagCode: "es", domain: "amazon.es", buttonLabel: "Amazon.es (ES)" },
  it: { name: "Amazon.it (IT)", code: "IT", flagCode: "it", domain: "amazon.it", buttonLabel: "Amazon.it (IT)" },
  nl: { name: "Amazon.nl (NL)", code: "NL", flagCode: "nl", domain: "amazon.nl", buttonLabel: "Amazon.nl (NL)" },
  pl: { name: "Amazon.pl (PL)", code: "PL", flagCode: "pl", domain: "amazon.pl", buttonLabel: "Amazon.pl (PL)" },
  se: { name: "Amazon.se (SE)", code: "SE", flagCode: "se", domain: "amazon.se", buttonLabel: "Amazon.se (SE)" },
  be: { name: "Amazon.com.be (BE)", code: "BE", flagCode: "be", domain: "amazon.com.be", buttonLabel: "Amazon.com.be (BE)" },
  ie: { name: "Amazon.ie (IE)", code: "IE", flagCode: "ie", domain: "amazon.ie", buttonLabel: "Amazon.ie (IE)" },
  jp: { name: "Amazon.co.jp (JP)", code: "JP", flagCode: "jp", domain: "amazon.co.jp", buttonLabel: "Amazon.co.jp (JP)" },
  ca: { name: "Amazon.ca (CA)", code: "CA", flagCode: "ca", domain: "amazon.ca", buttonLabel: "Amazon.ca (CA)" },
  au: { name: "Amazon.com.au (AU)", code: "AU", flagCode: "au", domain: "amazon.com.au", buttonLabel: "Amazon.com.au (AU)" }
};

// ============================================================================
// DIZIONARIO TESTI UI MULTILINGUA (Interfaccia Sito)
// ============================================================================
const I18N = {
  it: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Storie per bambini, nate da un papà e una mamma.",
    heroBannerAlt: "CSA Books 4 Kids - Storie per bambini, nate da un papà e una mamma.",
    authorBy: "Di",
    readSampleBtn: "Leggi Estratto",
    sampleBadge: "Anteprima",
    frontCoverLabel: "Copertina",
    backCoverLabel: "Retro Copertina",
    pageLabel: "Pagina",
    selectStore: "Seleziona Store Amazon",
    viewOn: (market) => `ACQUISTA SU ${market.toUpperCase()}`,
    filterAll: "Tutte le edizioni",
    filterIt: "Edizione Italiana",
    filterEn: "Edizione Inglese",
    footerAbout: "Storie per bambini, nate da un papà e una mamma.",
    copyright: "© 2026 CSA Books 4 Kids. Tutti i diritti riservati."
    ,
    navBooks: "Storie",
    navColoring: "Libri da colorare",
    navCharacters: "Personaggi",
    navAbout: "La nostra storia",
    aboutPageTitle: "La storia dietro CSA Books 4 Kids",
    aboutMetaTitle: "La nostra storia | CSA Books 4 Kids",
    aboutMetaDesc: "La storia dietro CSA Books 4 Kids: libri illustrati per bambini nati da un papà e una mamma, ispirati dalla passione per camion, ruspe e cantieri.",
    aboutBadge: "L'Autore",
    aboutAuthorRole: "Autore e creatore di CSA Books 4 Kids",
    aboutStoryTitle: "L'ispirazione: un'avventura di famiglia",
    aboutBioP1: "Sono nato a Fano, nelle Marche, e oggi vivo in Trentino-Alto Adige, immerso tra montagne e natura che spesso alimentano la mia immaginazione.",
    aboutBioP2: "Amo insegnare e trasmettere conoscenze, e penso che ogni storia possa diventare un piccolo ponte tra crescita, curiosità e divertimento.",
    aboutBioP3: "La mia più grande ispirazione è mio figlio. È stata proprio la sua passione irrefrenabile per camion, ruspe, gru e cantieri a dare vita a Le Avventure del Cantiere, una collana pensata per tutti i bambini curiosi e per chi ama le grandi macchine protagoniste di storie semplici, divertenti e ricche di valori.",
    aboutBioFamily: "I libri sono scritti da me, ma ogni storia nasce e prende forma insieme alla mamma di nostro figlio: un lavoro a quattro mani per trovare le parole giuste, il ritmo perfetto e quel calore che rende speciale la lettura prima della nanna.",
    aboutInspirationText: "Una passione per camion, ruspe e cantieri ha fatto nascere un intero mondo di storie.",
    aboutBioP4: "Attraverso i miei libri cerco di creare qualcosa che vada oltre la semplice lettura: momenti da condividere tra genitori e figli, fatti di gioco, emozione e scoperta.",
    aboutBioP5: "Vorrei contribuire a riportare la lettura al centro del tempo trascorso insieme, offrendo ai bambini storie capaci di farli sorridere, immaginare e imparare, lontano per qualche momento dai piccoli schermi.",
    aboutClosingText: "Perché le storie più belle non sono solo quelle che i bambini leggono, ma quelle che genitori e figli vivono insieme.",
    aboutCtaBtn: "Scopri i miei libri"
  },
  en: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Children's stories, made by a dad and a mom.",
    heroBannerAlt: "CSA Books 4 Kids - Children's stories, made by a dad and a mom.",
    authorBy: "By",
    readSampleBtn: "Read Sample",
    sampleBadge: "Sample Preview",
    frontCoverLabel: "Front Cover",
    backCoverLabel: "Back Cover",
    pageLabel: "Page",
    selectStore: "Select Amazon Store",
    viewOn: (market) => `BUY ON ${market.toUpperCase()}`,
    filterAll: "All Editions",
    filterIt: "Italian Edition",
    filterEn: "English Edition",
    footerAbout: "Children's stories, made by a dad and a mom.",
    copyright: "© 2026 CSA Books 4 Kids. All rights reserved."
    ,
    navBooks: "Stories",
    navColoring: "Coloring Books",
    navAbout: "Our Story",
    aboutPageTitle: "The Story Behind CSA Books 4 Kids",
    aboutMetaTitle: "Our Story | CSA Books 4 Kids",
    aboutMetaDesc: "The story behind CSA Books 4 Kids: children's picture books created by a dad and a mom, inspired by their child's passion for trucks and construction.",
    aboutBadge: "About the Creator",
    aboutAuthorRole: "Author & Creator of CSA Books 4 Kids",
    aboutStoryTitle: "The Inspiration: A Family Adventure",
    aboutBioP1: "I was born in Fano, in the Marche region of Italy, and today I live in Trentino-Alto Adige, surrounded by mountains and nature that constantly spark my imagination.",
    aboutBioP2: "I love teaching and sharing knowledge, and I believe every story can become a gentle bridge between growth, curiosity, and fun.",
    aboutBioP3: "My greatest inspiration is my son. It was his unstoppable passion for trucks, excavators, cranes, and construction sites that brought Le Avventure del Cantiere (Construction Site Adventures) to life — a book series created for all curious children and anyone who loves big machines starring in simple, engaging stories filled with positive values.",
    aboutBioFamily: "The books are written by me, but every story takes shape together with our child's mom: a joint effort to find the right words, the perfect rhythm, and that warmth that makes bedtime reading special.",
    aboutInspirationText: "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    aboutBioP4: "Through my books, I strive to create something that goes beyond reading: meaningful moments to share between parents and children, filled with play, emotion, and discovery.",
    aboutBioP5: "I want to help bring shared reading back to the heart of family time, offering children stories that make them smile, wonder, and learn — away from screens, even just for a little while.",
    aboutClosingText: "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    aboutCtaBtn: "Discover my books"
  },
  de: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Kindergeschichten, von einem Papa und einer Mama.",
    heroBannerAlt: "CSA Books 4 Kids - Kindergeschichten, von einem Papa und einer Mama.",
    authorBy: "Von",
    readSampleBtn: "Leseprobe",
    sampleBadge: "Vorschau",
    frontCoverLabel: "Vorderseite",
    backCoverLabel: "Rückseite",
    pageLabel: "Seite",
    selectStore: "Amazon Store wählen",
    viewOn: (market) => `AUF ${market.toUpperCase()} KAUFEN`,
    filterAll: "Alle Ausgaben",
    filterIt: "Italienische Ausgabe",
    filterEn: "Englische Ausgabe",
    footerAbout: "Kindergeschichten, von einem Papa und einer Mama.",
    copyright: "© 2026 CSA Books 4 Kids. Alle Rechte vorbehalten."
    ,
    navBooks: "Geschichten",
    navColoring: "Malbücher",
    navAbout: "Unsere Geschichte",
    aboutPageTitle: "Die Geschichte hinter CSA Books 4 Kids",
    aboutMetaTitle: "Unsere Geschichte | CSA Books 4 Kids",
    aboutMetaDesc: "Die Geschichte hinter CSA Books 4 Kids: Bilderbücher für Kinder von einem Papa und einer Mama, inspiriert von der Baustellenbegeisterung ihres Sohnes.",
    aboutBadge: "Der Autor",
    aboutAuthorRole: "Autor und Gründer von CSA Books 4 Kids",
    aboutStoryTitle: "Die Inspiration: Ein Familienabenteuer",
    aboutBioP1: "Ich bin in Fano in den Marken geboren und lebe heute in Trentino-Südtirol, umgeben von Bergen und Natur, die meine Fantasie immer wieder beflügeln.",
    aboutBioP2: "Ich liebe es zu unterrichten und Wissen weiterzugeben, und ich glaube daran, dass jede Geschichte zu einer kleinen Brücke zwischen Entwicklung, Neugier und Spaß werden kann.",
    aboutBioP3: "Meine größte Inspiration ist mein Sohn. Seine unbändige Begeisterung für Lastwagen, Bagger, Kräne und Baustellen hat Le Avventure del Cantiere (Baustellenabenteuer) ins Leben gerufen – eine Buchreihe für neugierige Kinder und alle, die große Maschinen in einfachen, fröhlichen und werteorientierten Geschichten lieben.",
    aboutBioFamily: "Die Bücher werden von mir geschrieben, doch jede Geschichte entsteht gemeinsam mit der Mutter unseres Sohnes: eine liebevolle Zusammenarbeit, um die richtigen Worte, den perfekten Rhythmus und jene Wärme zu finden, die das Vorlesen vor dem Einschlafen so besonders macht.",
    aboutInspirationText: "Aus der Begeisterung für Lastwagen, Bagger und Baustellen entstand eine ganze Welt voller Geschichten.",
    aboutBioP4: "In meinen Büchern möchte ich Momente schaffen, die über das Vorlesen hinausgehen: gemeinsame Zeit für Eltern und Kinder voller Emotionen, Spiel und Entdeckungen.",
    aboutBioP5: "Mein Ziel ist es, das gemeinsame Lesen wieder in den Mittelpunkt der Familie zu rücken und Geschichten anzubieten, die Kinder zum Lächeln, Träumen und Lernen anregen – fernab von Bildschirmen.",
    aboutClosingText: "Denn die schönsten Geschichten sind nicht nur die, die Kinder lesen, sondern die, die Eltern und Kinder gemeinsam erleben.",
    aboutCtaBtn: "Entdecke meine Bücher"
  },
  fr: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Histoires pour enfants, créées par un papa et une maman.",
    heroBannerAlt: "CSA Books 4 Kids - Histoires pour enfants, créées par un papa et une maman.",
    authorBy: "Par",
    readSampleBtn: "Lire un extrait",
    sampleBadge: "Aperçu",
    frontCoverLabel: "Couverture",
    backCoverLabel: "Quatrième de couverture",
    pageLabel: "Page",
    selectStore: "Choisir le store Amazon",
    viewOn: (market) => `ACHETER SUR ${market.toUpperCase()}`,
    filterAll: "Toutes les éditions",
    filterIt: "Édition Italienne",
    filterEn: "Édition Anglaise",
    footerAbout: "Histoires pour enfants, créées par un papa et une maman.",
    copyright: "© 2026 CSA Books 4 Kids. Tous droits réservés."
    ,
    navBooks: "Histoires",
    navColoring: "Livres de coloriage",
    navAbout: "Notre histoire",
    aboutPageTitle: "L'histoire derrière CSA Books 4 Kids",
    aboutMetaTitle: "Notre histoire | CSA Books 4 Kids",
    aboutMetaDesc: "L'histoire derrière CSA Books 4 Kids : albums illustrés pour enfants créés par un papa et une maman, inspirés par la passion d'un enfant pour les chantiers.",
    aboutBadge: "L'Auteur",
    aboutAuthorRole: "Auteur et créateur de CSA Books 4 Kids",
    aboutStoryTitle: "L'inspiration : une aventure de famille",
    aboutBioP1: "Je suis né à Fano, dans les Marches, et je vis aujourd'hui dans le Trentin-Haut-Adige, entouré par la nature et les montagnes, sources de mon inspiration.",
    aboutBioP2: "J'ai toujours aimé transmettre le savoir, convaincu qu'une histoire peut devenir un pont précieux entre éveil, curiosité et amusement.",
    aboutBioP3: "Ma plus grande inspiration est mon fils. C'est sa passion débordante pour les camions, pelleteuses et chantiers qui a donné vie à la collection 'Le Avventure del Cantiere' pour les petits curieux.",
    aboutBioFamily: "Les livres sont écrits par moi, mais chaque histoire prend vie aux côtés de la maman de notre enfant : un travail à quatre mains pour trouver les mots justes, le rythme parfait et cette chaleur qui rend la lecture du soir si précieuse.",
    aboutInspirationText: "Une passion pour les camions, pelleteuses et chantiers a donné naissance à tout un univers d'histoires.",
    aboutBioP4: "À travers mes livres, je cherche à offrir des moments de partage complice entre parents et enfants, faits d'émotion, de jeu et de découverte.",
    aboutBioP5: "Mon objectif est de replacer la lecture au cœur des moments en famille, avec des récits qui font sourire et grandir, loin des écrans.",
    aboutClosingText: "Parce que les plus belles histoires ne sont pas seulement celles que les enfants lisent, mais celles que parents et enfants partagent ensemble.",
    aboutCtaBtn: "Découvrir mes livres"
  },
  es: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Cuentos infantiles, creados por un papá y una mamá.",
    heroBannerAlt: "CSA Books 4 Kids - Cuentos infantiles, creados por un papá y una mamá.",
    authorBy: "Por",
    readSampleBtn: "Leer muestra",
    sampleBadge: "Vista previa",
    frontCoverLabel: "Portada",
    backCoverLabel: "Contraportada",
    pageLabel: "Página",
    selectStore: "Seleccionar tienda Amazon",
    viewOn: (market) => `COMPRAR EN ${market.toUpperCase()}`,
    filterAll: "Todas las ediciones",
    filterIt: "Edición Italiana",
    filterEn: "Edición Inglesa",
    footerAbout: "Cuentos infantiles, creados por un papá y una mamá.",
    copyright: "© 2026 CSA Books 4 Kids. Todos los derechos reservados."
    ,
    navBooks: "Cuentos",
    navColoring: "Libros para colorear",
    navAbout: "Nuestra historia",
    aboutPageTitle: "La historia detrás de CSA Books 4 Kids",
    aboutMetaTitle: "Nuestra historia | CSA Books 4 Kids",
    aboutMetaDesc: "La historia detrás de CSA Books 4 Kids: libros ilustrados infantiles creados por un papá y una mamá, inspirados por la pasión por las obras y camiones.",
    aboutBadge: "El Autor",
    aboutAuthorRole: "Autor y creador de CSA Books 4 Kids",
    aboutStoryTitle: "La inspiración: una aventura familiar",
    aboutBioP1: "Nací en Fano, en las Marcas (Italia), y hoy vivo en Trentino-Alto Adigio, rodeado de montañas y naturaleza que alimentan mi imaginación.",
    aboutBioP2: "Siempre me ha apasionado enseñar y transmitir conocimientos, convencido de que un cuento es un puente entre el crecimiento, la curiosidad y la diversión.",
    aboutBioP3: "Mi mayor inspiración es mi hijo. Su fascinación por los camiones, excavadoras y grúas inspiró 'Le Avventure del Cantiere' para pequeños lectores curiosos.",
    aboutBioFamily: "Los libros están escritos por mí, pero cada historia cobra vida junto con la madre de nuestro hijo: un trabajo conjunto para encontrar las palabras adecuadas, el ritmo perfecto y esa calidez que hace tan especial la lectura antes de dormir.",
    aboutInspirationText: "Una pasión por camiones, excavadoras y obras dio origen a todo un mundo de historias.",
    aboutBioP4: "En mis libros, busco crear momentos entrañables para compartir en familia a través de relatos sencillos, emoción, juego y descubrimiento.",
    aboutBioP5: "Mi objetivo es situar la lectura en el centro del tiempo en familia, ofreciendo historias que despierten sonrisas e imaginación, lejos de las pantallas.",
    aboutClosingText: "Porque las mejores historias no son solo las que leen los niños, sino las que padres e hijos viven juntos.",
    aboutCtaBtn: "Descubre mis libros"
  },
  nl: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Kinderverhalen, gemaakt door een papa en een mama.",
    heroBannerAlt: "CSA Books 4 Kids - Kinderverhalen, gemaakt door een papa en een mama.",
    authorBy: "Door",
    readSampleBtn: "Inkijkexemplaar",
    sampleBadge: "Voorbeeld",
    frontCoverLabel: "Voorkant",
    backCoverLabel: "Achterkant",
    pageLabel: "Pagina",
    selectStore: "Selecteer Amazon-winkel",
    viewOn: (market) => `KOOP OP ${market.toUpperCase()}`,
    filterAll: "Alle edities",
    filterIt: "Italiaanse editie",
    filterEn: "Engelse editie",
    footerAbout: "Kinderverhalen, gemaakt door een papa en een mama.",
    copyright: "© 2026 CSA Books 4 Kids. Alle rechten voorbehouden."
    ,
    navBooks: "Verhalen",
    navColoring: "Kleurboeken",
    navAbout: "Ons verhaal",
    aboutPageTitle: "Het verhaal achter CSA Books 4 Kids",
    aboutMetaTitle: "Ons verhaal | CSA Books 4 Kids",
    aboutMetaDesc: "Het verhaal achter CSA Books 4 Kids: prentenboeken voor kinderen gemaakt door een papa en mama, geïnspireerd door de bouwplaatsliefde van hun zoon.",
    aboutBadge: "De Auteur",
    aboutAuthorRole: "Auteur en bedenker van CSA Books 4 Kids",
    aboutStoryTitle: "De inspiratie: een familie-avontuur",
    aboutBioP1: "Ik ben geboren in Fano, in de regio Marche, en woon tegenwoordig in Trentino-Zuid-Tirol, omgeven door bergen en natuur die mijn fantasie voortdurend voeden.",
    aboutBioP2: "Ik hou van lesgeven en het delen van kennis, en ik geloof dat elk verhaal een waardevolle brug kan slaan tussen groei, nieuwsgierigheid en plezier.",
    aboutBioP3: "Mijn grootste inspiratie is mijn zoon. Zijn grenzeloze passie voor vrachtwagens, graafmachines, kranen en bouwplaatsen bracht Le Avventure del Cantiere (Bouwplaatsavonturen) tot leven – een boekenreeks gemaakt voor nieuwsgierige kinderen en iedereen die houdt van grote machines in eenvoudige, vrolijke verhalen vol mooie waarden.",
    aboutBioFamily: "De boeken zijn door mij geschreven, maar elk verhaal krijgt vorm samen met de moeder van ons kind: een gezamenlijke zoektocht naar de juiste woorden, het perfecte ritme en die warmte die voorlezen voor het slapengaan zo bijzonder maakt.",
    aboutInspirationText: "Een passie voor vrachtwagens, graafmachines en bouwplaatsen bracht een hele wereld vol verhalen tot leven.",
    aboutBioP4: "Met mijn boeken wil ik iets creëren dat verder gaat dan alleen lezen: dierbare momenten om samen te delen tussen ouders en kinderen, vol spel, emotie en ontdekking.",
    aboutBioP5: "Ik wil graag helpen om samen lezen weer centraal te stellen in de tijd die we als gezin doorbrengen, met verhalen die kinderen laten glimlachen, dromen en leren – even helemaal weg van beeldschermen.",
    aboutClosingText: "Omdat de mooiste verhalen niet alleen de verhalen zijn die kinderen lezen, maar de verhalen die ouders en kinderen samen beleven.",
    aboutCtaBtn: "Ontdek mijn boeken"
  },
  pl: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Opowieści dla dzieci, stworzone przez tatę i mamę.",
    heroBannerAlt: "CSA Books 4 Kids - Opowieści dla dzieci, stworzone przez tatę i mamę.",
    authorBy: "Autor",
    readSampleBtn: "Darmowy fragment",
    sampleBadge: "Podgląd",
    frontCoverLabel: "Okładka",
    backCoverLabel: "Tylna okładka",
    pageLabel: "Strona",
    selectStore: "Wybierz sklep Amazon",
    viewOn: (market) => `KUP NA ${market.toUpperCase()}`,
    filterAll: "Wszystkie wydania",
    filterIt: "Wydanie włoskie",
    filterEn: "Wydanie angielskie",
    footerAbout: "Opowieści dla dzieci, stworzone przez tatę i mamę.",
    copyright: "© 2026 CSA Books 4 Kids. Wszelkie prawa zastrzeżone."
    ,
    navBooks: "Opowieści",
    navColoring: "Kolorowanki",
    navAbout: "Nasza historia",
    aboutPageTitle: "Historia stojąca za CSA Books 4 Kids",
    aboutMetaTitle: "Nasza historia | CSA Books 4 Kids",
    aboutMetaDesc: "Historia stojąca za CSA Books 4 Kids: książki z obrazkami dla dzieci stworzone przez tatę i mamę, zainspirowane fascynacją maszynami budowlanymi.",
    aboutBadge: "Autor",
    aboutAuthorRole: "Autor i twórca CSA Books 4 Kids",
    aboutStoryTitle: "Inspiracja: rodzinna przygoda",
    aboutBioP1: "Urodziłem się w Fano w regionie Marche, a dziś mieszkam w Trydencie-Górnej Adydze, w otoczeniu gór i przyrody, które nieustannie rozbudzają moją wyobraźnię.",
    aboutBioP2: "Uwielbiam uczyć i dzielić się wiedzą, a także wierzę, że każda opowieść może stać się pomostem łączącym rozwój, ciekawość i dobrą zabawę.",
    aboutBioP3: "Moją największą inspiracją jest mój syn. To właśnie jego niespożyta fascynacja ciężarówkami, koparkami, dźwigami i placami budowy dała początek serii Le Avventure del Cantiere (Przygody na placu budowy) – stworzonej dla wszystkich ciekawych świata dzieci oraz miłośników wielkich maszyn, pełnej prostych, wesołych i wartościowych historii.",
    aboutBioFamily: "Książki piszę ja, ale każda historia rodzi się i nabiera kształtu razem z mamą naszego synka: to wspólna praca, by znaleźć właściwe słowa, idealny rytm i ciepło, które czyni wieczorne czytanie tak wyjątkowym.",
    aboutInspirationText: "Pasja do ciężarówek, koparek i placów budowy dała początek całemu światu opowieści.",
    aboutBioP4: "Poprzez moje książki staram się tworzyć coś więcej niż samą lekturę: wyjątkowe chwile bliskości dla rodziców i dzieci, wypełnione wspólną zabawą, emocjami i odkrywaniem świata.",
    aboutBioP5: "Pragnę przywrócić wspólne czytanie do centrum rodzinnego czasu, oferując dzieciom historie, które wywołują uśmiech, rozwijają wyobraźnię i uczą – z dala od małych ekranów choć na chwilę.",
    aboutClosingText: "Bo najpiękniejsze historie to nie tylko te, które dzieci czytają, ale te, które rodzice i dzieci przeżywają wspólnie.",
    aboutCtaBtn: "Odkryj moje książki"
  },
  sv: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Barnberättelser, skapade av en pappa och en mamma.",
    heroBannerAlt: "CSA Books 4 Kids - Barnberättelser, skapade av en pappa och en mamma.",
    authorBy: "Av",
    readSampleBtn: "Läs ett smakprov",
    sampleBadge: "Förhandsvisning",
    frontCoverLabel: "Omslag",
    backCoverLabel: "Baksida",
    pageLabel: "Sida",
    selectStore: "Välj Amazon-butik",
    viewOn: (market) => `KÖP PÅ ${market.toUpperCase()}`,
    filterAll: "Alla utgåvor",
    filterIt: "Italiensk utgåva",
    filterEn: "Engelsk utgåva",
    footerAbout: "Barnberättelser, skapade av en pappa och en mamma.",
    copyright: "© 2026 CSA Books 4 Kids. Alla rättigheter förbehållna."
    ,
    navBooks: "Berättelser",
    navColoring: "Målarböcker",
    navAbout: "Vår historia",
    aboutPageTitle: "Historien bakom CSA Books 4 Kids",
    aboutMetaTitle: "Vår historia | CSA Books 4 Kids",
    aboutMetaDesc: "Historien bakom CSA Books 4 Kids: bilderböcker för barn skapade av en pappa och en mamma, inspirerade av sonens kärlek till byggarbetsplatser.",
    aboutBadge: "Författaren",
    aboutAuthorRole: "Författare och skapare av CSA Books 4 Kids",
    aboutStoryTitle: "Inspirationen: ett familjeäventyr",
    aboutBioP1: "Jag är född i Fano i Marche och bor idag i Trentino-Sydtyrolen, omgiven av berg och natur som ständigt ger näring åt min fantasi.",
    aboutBioP2: "Jag har alltid älskat att undervisa och dela med mig av kunskap, och jag är övertygad om att varje berättelse kan bli en bro mellan utveckling, nyfikenhet och glädje.",
    aboutBioP3: "Min största inspiration är min son. Det var hans outtröttliga intresse för lastbilar, grävmaskiner, lyftkranar och byggarbetsplatser som gav liv åt Le Avventure del Cantiere (Byggarbetsplatsens äventyr) – en bokserie skapad för alla nyfikna barn och alla som älskar stora maskiner i enkla, roliga och värdegrundade berättelser.",
    aboutBioFamily: "Böckerna är skrivna av mig, men varje berättelse växer fram tillsammans med vårt barns mamma: ett gemensamt arbete för att hitta de rätta orden, den perfekta rytmen och den värme som gör godnattsagan så speciell.",
    aboutInspirationText: "En passion för lastbilar, grävmaskiner och byggarbetsplatser födde en hel värld av berättelser.",
    aboutBioP4: "Genom mina böcker vill jag skapa något som sträcker sig bortom själva läsningen: meningsfulla stunder att dela mellan föräldrar och barn, fyllda av lek, känslor och upptäckarglädje.",
    aboutBioP5: "Jag vill bidra till att sätta gemensam läsning i centrum för familjetiden, och erbjuda barn berättelser som får dem att le, fantisera och lära – en stund bortom alla små skärmar.",
    aboutClosingText: "För de finaste berättelserna är inte bara de som barnen läser, utan de som föräldrar och barn upplever tillsammans.",
    aboutCtaBtn: "Upptäck mina böcker"
  },
  ja: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "パパとママが作った、子どもたちのための物語。",
    heroBannerAlt: "CSA Books 4 Kids - パパとママが作った、子どもたちのための物語。",
    authorBy: "作",
    readSampleBtn: "無料サンプル",
    sampleBadge: "プレビュー",
    frontCoverLabel: "表紙",
    backCoverLabel: "裏表紙",
    pageLabel: "ページ",
    selectStore: "Amazonストアを選択",
    viewOn: (market) => `${market.toUpperCase()} で購入`,
    filterAll: "すべての版",
    filterIt: "イタリア語版",
    filterEn: "英語版",
    footerAbout: "パパとママが作った、子どもたちのための物語。",
    copyright: "© 2026 CSA Books 4 Kids. 無断転載を禁じます。"
    ,
    navBooks: "お話",
    navColoring: "ぬりえ絵本",
    navAbout: "私たちの物語",
    aboutPageTitle: "CSA Books 4 Kids の誕生秘話",
    aboutMetaTitle: "私たちの物語 | CSA Books 4 Kids",
    aboutMetaDesc: "CSA Books 4 Kids の誕生秘話：働く車が大好きな息子の情熱から、パパとママが力を合わせて生み出した子ども向け絵本シリーズ。",
    aboutBadge: "著者紹介",
    aboutAuthorRole: "CSA Books 4 Kids 著者・クリエイター",
    aboutStoryTitle: "インスピレーション：家族の冒険",
    aboutBioP1: "私はイタリア・マルケ州のファーノで生まれ、現在は山々と豊かな自然に囲まれたトレンティーノ＝アルト・アディジェ州に暮らしています。この自然が、私の想像力の大きな源となっています。",
    aboutBioP2: "私は人に教え、知識を分かち合うことが大好きです。一つひとつの物語が、成長と好奇心、そして楽しさを結ぶ小さな架け橋になると信じています。",
    aboutBioP3: "私の何よりのインスピレーションは息子です。トラックやショベルカー、クレーン車、工事現場への息子のあふれる情熱から、『Le Avventure del Cantiere』（工事現場の冒険）シリーズが誕生しました。好奇心旺盛な子どもたちや、大きな働く車が大好きなすべての読者のために、シンプルで楽しく、大切な価値観が詰まった物語を届けています。",
    aboutBioFamily: "本は私が執筆していますが、すべての物語は息子の母親と一緒に形作られています。ぴったりの言葉、心地よいリズム、そしておやすみ前の読み聞かせを特別にする温もりを見つけるための、二人三脚の創作です。",
    aboutInspirationText: "トラックやショベルカー、工事現場への情熱から、物語の世界が誕生しました。",
    aboutBioP4: "私の絵本を通じて、単なる読書にとどまらない、親子で共有できる特別なひととき――遊びや感動、新しい発見に満ちた時間――をお届けしたいと考えています。",
    aboutBioP5: "小さな画面から少し離れて、子どもたちが笑顔になり、想像を膨らませ、学べる物語を届けることで、親子が寄り添う時間の中に読書のぬくもりを取り戻すお手伝いができれば幸いです。",
    aboutClosingText: "最高の物語とは、子どもがひとりで読むものだけでなく、親と子が心を通わせて共に体験するものだからです。",
    aboutCtaBtn: "私の本を見る"
  }
};

// ============================================================================
// TRADUZIONI PAGINA PERSONAGGI & COLLANA (characters.html)
// ============================================================================
const CHARACTERS_I18N = {
  "it": {
    "navCharacters": "Personaggi",
    "charactersPageTitle": "Un mondo di scoperte, amicizia e grandi macchine",
    "charactersMetaTitle": "I personaggi | Le Avventure del Cantiere - CSA Books 4 Kids",
    "charactersMetaDesc": "Scopri i protagonisti della collana Le Avventure del Cantiere: Benny l'escavatore, Bruno il camion, Leo la gru, Nina la betoniera, Rino il rullo e Rudy la ruspa.",
    "charactersBadge": "La Collana Ufficiale",
    "charactersHeroDesc": "\"Le Avventure del Cantiere\" è una collana di storie illustrate per bambini che ha come protagonisti un gruppo di simpatici veicoli da costruzione. Ogni libro trasforma una sfida quotidiana di cantiere in una piccola grande avventura ricca di amicizia, curiosità, lavoro di squadra e scoperta, offrendo a genitori e figli storie semplici e coinvolgenti da condividere insieme.",
    "charactersValuesTitle": "Cosa Rende Speciale Questa Collana",
    "charactersValuesSubtitle": "Valori importanti raccontati attraverso storie semplici, divertenti e ricche di cuore",
    "value1Title": "Amicizia e Squadra",
    "value1Desc": "Nessun lavoro è troppo grande quando ci si aiuta: le storie mostrano la bellezza della cooperazione e del rispetto reciproco.",
    "value2Title": "Curiosità e Scoperta",
    "value2Desc": "La curiosità è il motore della crescita: ogni pagina stimola le domande dei piccoli e accende la loro immaginazione.",
    "value3Title": "Risolvere i Problemi",
    "value3Desc": "I protagonisti affrontano piccoli imprevisti con calma e ingegno, insegnando che a ogni problema c'è una soluzione.",
    "value4Title": "Tempo Insieme",
    "value4Desc": "Un'occasione speciale per genitori e figli di ritrovarsi ogni sera, lontano da schermi e distrazioni tecnologiche.",
    "charactersSectionTitle": "Incontra i Protagonisti",
    "charactersSectionSubtitle": "Sei amici speciali sempre pronti a lavorare insieme e a vivere grandi avventure!",
    "charBennyName": "Benny",
    "charBennyRole": "L'Escavatore",
    "charBennyDesc": "Curioso, entusiasta e dal cuore grande. Con la sua benna scava buche, scopre segreti nascosti e non si tira mai indietro quando c'è da aiutare un amico in difficoltà.",
    "charBennyAlt": "Benny l'escavatore",
    "charBrunoName": "Bruno",
    "charBrunoRole": "Il Camion",
    "charBrunoDesc": "Forte, generoso e sempre allegro. Con il suo capiente cassone trasporta sabbia e pietre pesanti, regalando sempre un sorriso e una mano alla squadra.",
    "charBrunoAlt": "Bruno il camion",
    "charLeoName": "Leo",
    "charLeoRole": "La Gru",
    "charLeoDesc": "Paziente, attento e protettivo. Dall'alto del cantiere vede tutto con chiarezza e, con il suo lungo braccio meccanico, solleva carichi e risolve i problemi più complicati.",
    "charLeoAlt": "Leo la gru",
    "charNinaName": "Nina",
    "charNinaRole": "La Betoniera",
    "charNinaDesc": "Vivace, precisa e piena di energia positiva. Il suo tamburo gira senza sosta per preparare la miscela perfetta, portando buonumore ovunque ci sia da costruire.",
    "charNinaAlt": "Nina la betoniera",
    "charRinoName": "Rino",
    "charRinoRole": "Il Rullo",
    "charRinoDesc": "Calmo, determinato e rassicurante. Con il suo pesante rullo d'acciaio spiana ogni sentiero difficile, dimostrando che con la pazienza si supera qualsiasi ostacolo.",
    "charRinoAlt": "Rino il rullo",
    "charRudyName": "Rudy",
    "charRudyRole": "La Ruspa",
    "charRudyDesc": "Energico, forte e coraggioso. Con la sua grande lama spiana la strada e affronta ogni sfida con grinta e un grande sorriso.",
    "charRudyAlt": "Rudy la ruspa",
    "charactersCtaTitle": "Vivi le Avventure del Cantiere",
    "charactersCtaDesc": "I sei amici ti aspettano in tutte le loro avventure illustrate, piene di illustrazioni a colori, dialoghi divertenti e valori positivi da leggere insieme.",
    "charactersCtaBtn": "Scopri i libri della collana"
  },
  "en": {
    "navCharacters": "Characters",
    "charactersPageTitle": "A World of Discovery, Friendship, and Big Machines",
    "charactersMetaTitle": "Meet the Characters | Construction Site Adventures - CSA Books 4 Kids",
    "charactersMetaDesc": "Meet the friendly heroes of Construction Site Adventures: Benny the Excavator, Bruno the Dump Truck, Leo the Crane, Nina the Cement Mixer, Rino the Roller, and Rudy the Bulldozer.",
    "charactersBadge": "The Official Series",
    "charactersHeroDesc": "\"Construction Site Adventures\" is an illustrated children's book series starring a friendly crew of construction vehicles. Each book turns an everyday construction challenge into a heartwarming adventure filled with friendship, curiosity, teamwork, and discovery — giving parents and little readers meaningful stories to share together.",
    "charactersValuesTitle": "What Makes This Series Special",
    "charactersValuesSubtitle": "Meaningful values brought to life through cheerful, engaging, and heartwarming storytelling",
    "value1Title": "Friendship & Teamwork",
    "value1Desc": "No job is too big when friends work together: every story celebrates collaboration, kindness, and mutual support.",
    "value2Title": "Curiosity & Discovery",
    "value2Desc": "Curiosity fuels imagination: every page invites children to ask questions and explore the wondrous world around them.",
    "value3Title": "Problem Solving",
    "value3Desc": "The friendly machines meet unexpected challenges with creativity and calm, showing that every problem has a solution.",
    "value4Title": "Family Shared Reading",
    "value4Desc": "A wonderful reason for parents and toddlers to pause, connect, and enjoy special bonding time away from screens.",
    "charactersSectionTitle": "Meet the Characters",
    "charactersSectionSubtitle": "Six wonderful friends always ready to build, solve problems, and share big adventures!",
    "charBennyName": "Benny",
    "charBennyRole": "The Excavator",
    "charBennyDesc": "Curious, enthusiastic, and kind-hearted. With his trusty scoop, he loves digging deep, uncovering hidden treasures, and lending a helping hand whenever a friend needs it.",
    "charBennyAlt": "Benny the Excavator",
    "charBrunoName": "Bruno",
    "charBrunoRole": "The Dump Truck",
    "charBrunoDesc": "Strong, cheerful, and always reliable. With his sturdy tilting bed, Bruno hauls heavy loads of sand and stones, bringing high spirits and helpful muscle to every project.",
    "charBrunoAlt": "Bruno the Dump Truck",
    "charLeoName": "Leo",
    "charLeoRole": "The Crane",
    "charLeoDesc": "Patient, watchful, and protective. From high above the site, Leo has a clear view of everything, gently lifting heavy beams and solving tricky puzzles with care.",
    "charLeoAlt": "Leo the Crane",
    "charNinaName": "Nina",
    "charNinaRole": "The Cement Mixer",
    "charNinaDesc": "Lively, clever, and full of positive energy. Her spinning drum mixes the smoothest concrete, bringing cheerful rhythm and bright enthusiasm wherever building begins.",
    "charNinaAlt": "Nina the Cement Mixer",
    "charRinoName": "Rino",
    "charRinoRole": "The Roller",
    "charRinoDesc": "Calm, steady, and determined. With his heavy steel drum, Rino smooths out the roughest paths, showing that patience and persistence can overcome any bump in the road.",
    "charRinoAlt": "Rino the Roller",
    "charRudyName": "Rudy",
    "charRudyRole": "The Bulldozer",
    "charRudyDesc": "Energetic, powerful, and brave. With his strong blade, Rudy clears the way and pushes through any challenge with grit and a great big smile.",
    "charRudyAlt": "Rudy the Bulldozer",
    "charactersCtaTitle": "Experience the Adventures",
    "charactersCtaDesc": "The six friends are ready for storytime! Explore the illustrated books in the collection, packed with vibrant artwork and uplifting values to read together.",
    "charactersCtaBtn": "Explore the Books"
  },
  "de": {
    "navCharacters": "Figuren",
    "charactersPageTitle": "Eine Welt voller Entdeckungen, Freundschaft und großer Maschinen",
    "charactersMetaTitle": "Die Figuren | Baustellen-Abenteuer - CSA Books 4 Kids",
    "charactersMetaDesc": "Lerne die sympathischen Helden der Baustellen-Abenteuer kennen: Benny den Bagger, Bruno den Kipper, Leo den Kran, Nina die Betonmischerin, Rino die Walze und Rudy die Planierraupe.",
    "charactersBadge": "Die Offizielle Buchreihe",
    "charactersHeroDesc": "„Le Avventure del Cantiere“ (Baustellen-Abenteuer) ist eine illustrierte Kinderbuchreihe mit einer liebenswerten Gruppe von Baustellenfahrzeugen. Jedes Buch verwandelt eine alltägliche Bauaufgabe in ein herzerwärmendes Abenteuer voller Freundschaft, Neugier, Teamgeist und Entdeckerfreude.",
    "charactersValuesTitle": "Was Diese Reihe Besonders Macht",
    "charactersValuesSubtitle": "Wichtige Werte, verpackt in einfache, spannende und herzerwärmende Geschichten",
    "value1Title": "Freundschaft & Teamwork",
    "value1Desc": "Keine Aufgabe ist zu schwer, wenn man zusammenhält: Die Geschichten zeigen die Kraft der Zusammenarbeit und gegenseitigen Hilfe.",
    "value2Title": "Neugier & Entdeckung",
    "value2Desc": "Neugier ist der Schlüssel zum Lernen: Jede Seite regt die Fantasie an und lädt zum aufmerksamen Erkunden der Welt ein.",
    "value3Title": "Probleme Lösen",
    "value3Desc": "Mit Ruhe, Klugheit und Humor bewältigen die Fahrzeuge jedes Hindernis und zeigen: Für jedes Problem gibt es einen Weg.",
    "value4Title": "Gemeinsame Lesezeit",
    "value4Desc": "Kostbare Momente der Nähe zwischen Eltern und Kindern vor dem Einschlafen – ganz ohne Bildschirme.",
    "charactersSectionTitle": "Die Figuren Kennenlernen",
    "charactersSectionSubtitle": "Sechs besondere Freunde, die immer bereit sind, gemeinsam Großes zu schaffen!",
    "charBennyName": "Benny",
    "charBennyRole": "Der Bagger",
    "charBennyDesc": "Neugierig, begeistert und mit einem großen Herzen. Mit seiner Schaufel gräbt er fleißig, lüftet kleine Geheimnisse und hilft jedem Freund sofort zur Hand.",
    "charBennyAlt": "Benny der Bagger",
    "charBrunoName": "Bruno",
    "charBrunoRole": "Der Kipper",
    "charBrunoDesc": "Stark, hilfsbereit und immer gut gelaunt. Mit seiner großen Ladefläche transportiert Bruno schwere Lasten und zaubert jedem ein Lächeln ins Gesicht.",
    "charBrunoAlt": "Bruno der Kipper",
    "charLeoName": "Leo",
    "charLeoRole": "Der Kran",
    "charLeoDesc": "Geduldig, aufmerksam und besonnen. Von hoch oben behält Leo den Überblick, hebt schwere Träger millimetergenau und findet für alles eine Lösung.",
    "charLeoAlt": "Leo der Kran",
    "charNinaName": "Nina",
    "charNinaRole": "Die Betonmischerin",
    "charNinaDesc": "Fröhlich, präzise und voller Energie. Ihre Drehtrommel mischt den besten Beton und bringt Schwung und Lebensfreude auf die Baustelle.",
    "charNinaAlt": "Nina die Betonmischerin",
    "charRinoName": "Rino",
    "charRinoRole": "Die Walze",
    "charRinoDesc": "Ruhig, unermüdlich und verlässlich. Mit seiner schweren Stahlwalze ebnet er jeden holprigen Weg und beweist, dass Ausdauer jedes Hindernis überwindet.",
    "charRinoAlt": "Rino die Walze",
    "charRudyName": "Rudy",
    "charRudyRole": "Die Planierraupe",
    "charRudyDesc": "Tatkräftig, stark und mutig. Mit seinem robusten Schild ebnet Rudy jeden Weg und meistert jedes Hindernis mit Schwung und einem strahlenden Lächeln.",
    "charRudyAlt": "Rudy die Planierraupe",
    "charactersCtaTitle": "Erlebe die Baustellen-Abenteuer",
    "charactersCtaDesc": "Die sechs Freunde freuen sich auf dich! Entdecke alle liebevoll gestalteten Bände der Reihe und tauche gemeinsam mit deinen Kindern in spannende Geschichten ein.",
    "charactersCtaBtn": "Bücher der Reihe entdecken"
  },
  "fr": {
    "navCharacters": "Personnages",
    "charactersPageTitle": "Un monde de découvertes, d'amitié et de grands engins",
    "charactersMetaTitle": "Les Personnages | Les Aventures du Chantier - CSA Books 4 Kids",
    "charactersMetaDesc": "Découvrez les héros des Aventures du Chantier : Benny la pelleteuse, Bruno le camion, Léo la grue, Nina la bétonnière, Rino le rouleau et Rudy le bulldozer.",
    "charactersBadge": "La Collection Officielle",
    "charactersHeroDesc": "« Le Avventure del Cantiere » (Les Aventures du Chantier) est une collection d'histoires illustrées pour enfants mettant en scène de sympathiques engins de construction. Chaque livre transforme un défi du quotidien en une formidable aventure d'amitié, de curiosité, d'entraide et de découverte.",
    "charactersValuesTitle": "Ce Qui Rend Cette Collection Unique",
    "charactersValuesSubtitle": "Des valeurs essentielles transmises à travers des récits simples, chaleureux et captivants",
    "value1Title": "Amitié & Esprit d'Équipe",
    "value1Desc": "Aucun défi n'est insurmontable à plusieurs : nos récits célèbrent la beauté du partage et de l'aide mutuelle.",
    "value2Title": "Curiosité & Émerveillement",
    "value2Desc": "La curiosité est le moteur de l'apprentissage : chaque page stimule l'imagination et l'envie d'explorer le monde.",
    "value3Title": "Résolution de Problèmes",
    "value3Desc": "Face aux imprévus, nos héros gardent leur calme et trouvent des solutions ingénieuses avec gentillesse.",
    "value4Title": "Partage en Famille",
    "value4Desc": "Un précieux rendez-vous quotidien pour parents et tout-petits, loin des écrans et riche en émotions partagées.",
    "charactersSectionTitle": "Rencontrez les Personnages",
    "charactersSectionSubtitle": "Six amis formidables toujours prêts à bâtir ensemble et à vivre de belles aventures !",
    "charBennyName": "Benny",
    "charBennyRole": "La Pelleteuse",
    "charBennyDesc": "Curieux, dynamique et très généreux. Avec son godet, il adore creuser, découvrir des surprises cachées et voler au secours de ses amis.",
    "charBennyAlt": "Benny la pelleteuse",
    "charBrunoName": "Bruno",
    "charBrunoRole": "Le Camion-Benne",
    "charBrunoDesc": "Robuste, joyeux et infatigable. Grâce à sa grande benne, il transporte sable et cailloux en distribuant bonne humeur et coups de main.",
    "charBrunoAlt": "Bruno le camion-benne",
    "charLeoName": "Léo",
    "charLeoRole": "La Grue",
    "charLeoDesc": "Patient, attentif et rassurant. Du haut de son mât, il veille sur tout le chantier et soulève avec délicatesse les charges les plus lourdes.",
    "charLeoAlt": "Léo la grue",
    "charNinaName": "Nina",
    "charNinaRole": "La Bétonnière",
    "charNinaDesc": "Pétillante, appliquée et pleine d'entrain. Sa cuve bicolore tourne sans cesse pour préparer le mortier idéal dans la bonne humeur.",
    "charNinaAlt": "Nina la bétonnière orange et blanche",
    "charRinoName": "Rino",
    "charRinoRole": "Le Rouleau",
    "charRinoDesc": "Calme, persévérant et bienveillant. Avec son lourd tambour d'acier, il aplanit les routes difficiles et prouve que la sérénité vient à bout de tout.",
    "charRinoAlt": "Rino le rouleau compresseur vert",
    "charactersCtaTitle": "Vivez les Aventures du Chantier",
    "charactersCtaDesc": "Les six amis vous attendent dans leurs albums illustrés pour de doux moments de lecture complice en famille.",
    "charactersCtaBtn": "Découvrir les livres de la collection",
    "charRudyName": "Rudy",
    "charRudyRole": "Le Bulldozer",
    "charRudyDesc": "Énergique, fort et intrépide. Avec sa grande lame puissante, Rudy trace la route et surmonte tous les obstacles avec enthousiasme et un grand sourire.",
    "charRudyAlt": "Rudy le bulldozer"
  },
  "es": {
    "navCharacters": "Personajes",
    "charactersPageTitle": "Un mundo de descubrimientos, amistad y grandes máquinas",
    "charactersMetaTitle": "Los Personajes | Las Aventuras de la Construcción - CSA Books 4 Kids",
    "charactersMetaDesc": "Descubre a los entrañables protagonistas de Las Aventuras de la Construcción: Benny la excavadora, Bruno el camión, Leo la grúa, Nina la hormigonera, Rino el rodillo y Rudy el buldócer.",
    "charactersBadge": "La Colección Oficial",
    "charactersHeroDesc": "«Le Avventure del Cantiere» (Las Aventuras de la Construcción) es una serie de libros infantiles ilustrados protagonizada por un entrañable equipo de vehículos de construcción. Cada cuento transforma los retos del día a día en una aventura repleta de amistad, curiosidad, trabajo en equipo y descubrimientos.",
    "charactersValuesTitle": "Por Qué Esta Colección Es Especial",
    "charactersValuesSubtitle": "Valores formativos transmitidos a través de historias tiernas, entretenidas y llenas de ilusión",
    "value1Title": "Amistad y Cooperación",
    "value1Desc": "Ninguna tarea es imposible cuando nos ayudamos: cada libro resalta el valor de la unión y el apoyo mutuo.",
    "value2Title": "Curiosidad y Descubrimiento",
    "value2Desc": "La curiosidad despierta la imaginación: cada página invita a explorar y hacerse preguntas sobre el entorno.",
    "value3Title": "Resolución Creativa",
    "value3Desc": "Con ingenio, calma y optimismo, los protagonistas demuestran que siempre hay una solución a los problemas.",
    "value4Title": "Lectura Compartida",
    "value4Desc": "Un momento de complicidad inigualable entre padres e hijos para reconectar lejos de las pantallas.",
    "charactersSectionTitle": "Conoce a los Protagonistas",
    "charactersSectionSubtitle": "¡Seis amigos inseparables listos para colaborar y vivir inolvidables historias!",
    "charBennyName": "Benny",
    "charBennyRole": "La Excavadora",
    "charBennyDesc": "Curioso, alegre y con un gran corazón. Con su pala excava zanjas, descubre tesoros escondidos y nunca duda en ayudar a un compañero.",
    "charBennyAlt": "Benny la excavadora",
    "charBrunoName": "Bruno",
    "charBrunoRole": "El Camión Volquete",
    "charBrunoDesc": "Fuerte, generoso y entusiasta. Con su gran caja basculante traslada arena y rocas pesadas regalando sonrisas a toda la cuadrilla.",
    "charBrunoAlt": "Bruno el camión volquete",
    "charLeoName": "Leo",
    "charLeoRole": "La Grúa",
    "charLeoDesc": "Paciente, reflexivo y protector. Desde lo alto observa cada rincón con claridad y, con su brazo extensible, alza cargas difíciles con seguridad.",
    "charLeoAlt": "Leo el camión grúa naranja",
    "charNinaName": "Nina",
    "charNinaRole": "La Hormigonera",
    "charNinaDesc": "Divertida, eficiente y llena de energía. Su tambor gira sin descanso preparando la mezcla justa y llenando de alegría cada obra.",
    "charNinaAlt": "Nina la hormigonera naranja y blanca",
    "charRinoName": "Rino",
    "charRinoRole": "El Rodillo Compactador",
    "charRinoDesc": "Tranquilo, tenaz y bondadoso. Con su resistente rodillo alisa cualquier camino abrupto, enseñando que con paciencia todo obstáculo se allana.",
    "charRinoAlt": "Rino el rodillo compactador verde",
    "charactersCtaTitle": "Disfruta de las Aventuras",
    "charactersCtaDesc": "¡Los seis amigos te esperan! Descubre los coloridos álbumes ilustrados de la serie y comparte lecturas inolvidables junto a los más pequeños.",
    "charactersCtaBtn": "Descubre los libros de la colección",
    "charRudyName": "Rudy",
    "charRudyRole": "El Buldócer",
    "charRudyDesc": "Enérgico, fuerte y valiente. Con su gran pala frontal, Rudy despeja el camino y supera cualquier desafío con entusiasmo y una gran sonrisa.",
    "charRudyAlt": "Rudy el buldócer"
  },
  "nl": {
    "navCharacters": "Personages",
    "charactersPageTitle": "Een wereld vol ontdekkingen, vriendschap en grote machines",
    "charactersMetaTitle": "De Personages | Bouwplaats Avonturen - CSA Books 4 Kids",
    "charactersMetaDesc": "Maak kennis met de helden van Bouwplaats Avonturen: Benny de graafmachine, Bruno de kiepauto, Leo de kraan, Nina de betonmolen, Rino de wals en Rudy de bulldozer.",
    "charactersBadge": "De Officiële Boekenreeks",
    "charactersHeroDesc": "„Le Avventure del Cantiere“ (Bouwplaats Avonturen) is een serie geïllustreerde kinderboeken met een vrolijk team van bouwvoertuigen in de hoofdrol. Elk boek maakt van een alledaagse bouwuitdaging een warm avontuur vol vriendschap, nieuwsgierigheid, samenwerking en ontdekking.",
    "charactersValuesTitle": "Wat Deze Reeks Zo Bijzonder Maakt",
    "charactersValuesSubtitle": "Mooie waarden tot leven gebracht in eenvoudige, speelse en hartverwarmende verhalen",
    "value1Title": "Vriendschap & Samenwerken",
    "value1Desc": "Geen klus is te zwaar als vrienden de handen ineenslaan: elk verhaal laat de kracht van samenwerking zien.",
    "value2Title": "Nieuwsgierigheid & Ontdekken",
    "value2Desc": "Nieuwsgierigheid prikkelt de fantasie: elke bladzijde moedigt kleintjes aan om de wereld te ontdekken.",
    "value3Title": "Problemen Oplossen",
    "value3Desc": "Met rust, vindingrijkheid en een glimlach bewijzen de voertuigen dat er voor elke uitdaging een oplossing is.",
    "value4Title": "Samen Lezen",
    "value4Desc": "Kostbare momenten van rust en verbinding tussen ouders en kinderen, ver weg van beeldschermen.",
    "charactersSectionTitle": "Ontmoet de Personages",
    "charactersSectionSubtitle": "Zes bijzondere vrienden die altijd klaarstaan om samen te bouwen en op avontuur te gaan!",
    "charBennyName": "Benny",
    "charBennyRole": "De Graafmachine",
    "charBennyDesc": "Nieuwsgierig, enthousiast en met een groot hart. Met zijn graafbak graaft hij diepe kuilen, vindt hij geheimen en helpt hij iedereen.",
    "charBennyAlt": "Benny de graafmachine",
    "charBrunoName": "Bruno",
    "charBrunoRole": "De Kiepwagen",
    "charBrunoDesc": "Sterk, goedaardig en altijd vrolijk. In zijn ruime laadbak vervoert Bruno zwaar zand en grind met een gulle glimlach voor het hele team.",
    "charBrunoAlt": "Bruno de rode kiepwagen",
    "charLeoName": "Leo",
    "charLeoRole": "De Kraanwagen",
    "charLeoDesc": "Geduldig, bedachtzaam en zorgzaam. Vanaf grote hoogte overziet Leo alles en tilt hij zware balken met uiterste precisie op zijn plek.",
    "charLeoAlt": "Leo de kraan",
    "charNinaName": "Nina",
    "charNinaRole": "De Betonmolen",
    "charNinaDesc": "Vrolijk, nauwkeurig en vol pit. Haar trommel draait onafgebroken om het perfecte beton te mixen en overal feeststemming te brengen.",
    "charNinaAlt": "Nina de betonmolenwagen",
    "charRinoName": "Rino",
    "charRinoRole": "De Wals",
    "charRinoDesc": "Rustig, volhardend en betrouwbaar. Met zijn zware stalen wals effent hij elk oneffen pad en laat hij zien dat geduld alles overwint.",
    "charRinoAlt": "Rino de groene wals",
    "charactersCtaTitle": "Beleef de Bouwplaats Avonturen",
    "charactersCtaDesc": "De zes vrienden wachten op je! Ontdek alle rijk geïllustreerde delen uit de reeks en geniet samen van fijne voorleesmomenten.",
    "charactersCtaBtn": "Ontdek de boeken uit de serie",
    "charRudyName": "Rudy",
    "charRudyRole": "De Bulldozer",
    "charRudyDesc": "Energiek, sterk en dapper. Met zijn stevige blad maakt Rudy de weg vrij en overwint hij elke uitdaging met enthousiasme en een grote glimlach.",
    "charRudyAlt": "Rudy de bulldozer"
  },
  "pl": {
    "navCharacters": "Bohaterowie",
    "charactersPageTitle": "Świat odkryć, przyjaźni i wielkich maszyn",
    "charactersMetaTitle": "Bohaterowie | Przygody na Placu Budowy - CSA Books 4 Kids",
    "charactersMetaDesc": "Poznaj sympatycznych bohaterów Przygód na Placu Budowy: Benny'ego koparkę, Bruno wywrotkę, Leo dźwig, Ninę betoniarkę, Rino walec i Rudy'ego spychacz.",
    "charactersBadge": "Oficjalna Seria Książek",
    "charactersHeroDesc": "„Le Avventure del Cantiere” (Przygody na Placu Budowy) to ilustrowana seria książek dla dzieci z sympatycznymi pojazdami budowlanymi w roli głównej. Każda opowieść zmienia codzienne zadanie w ciepłą przygodę pełną przyjaźni, ciekawości, współpracy i radosnych odkryć.",
    "charactersValuesTitle": "Dlaczego Ta Seria Jest Wyjątkowa",
    "charactersValuesSubtitle": "Ważne wartości opowiedziane prosto, z humorem i z sercem",
    "value1Title": "Przyjaźń i Współpraca",
    "value1Desc": "Żadne zadanie nie jest za trudne, gdy działamy razem: opowieści pokazują piękno wzajemnej pomocy i szacunku.",
    "value2Title": "Ciekawość i Odkrycia",
    "value2Desc": "Ciekawość to iskra rozwoju: każda strona pobudza dziecięcą wyobraźnię i zachęca do zadawania pytań.",
    "value3Title": "Rozwiązywanie Problemów",
    "value3Desc": "Bohaterowie stawiają czoła trudnościom ze spokojem i pomysłowością, ucząc, że na wszystko znajdzie się sposób.",
    "value4Title": "Wspólne Czytanie",
    "value4Desc": "Cenny czas bliskości rodziców i dzieci każdego wieczoru – z dala od ekranów i cyfrowych rozpraszaczy.",
    "charactersSectionTitle": "Poznaj Bohaterów",
    "charactersSectionSubtitle": "Szóstka wyjątkowych przyjaciół zawsze gotowych do wspólnej pracy i wspaniałych przygód!",
    "charBennyName": "Benny",
    "charBennyRole": "Koparka",
    "charBennyDesc": "Ciekawski, pełen entuzjazmu i o wielkim sercu. Swoją łyżką kopie doły, odkrywa sekrety i natychmiast rusza z pomocą przyjaciołom.",
    "charBennyAlt": "Benny koparka",
    "charBrunoName": "Bruno",
    "charBrunoRole": "Wywrotka",
    "charBrunoDesc": "Silny, życzliwy i zawsze uśmiechnięty. W swojej pojemnej skrzyni wozi piasek i kamienie, dodając otuchy całej ekipie.",
    "charBrunoAlt": "Bruno wywrotka",
    "charLeoName": "Leo",
    "charLeoRole": "Dźwig",
    "charLeoDesc": "Cierpliwy, uważny i opiekuńczy. Z góry widzi wszystko i swoim długim wysięgnikiem precyzyjnie układa najcięższe belki.",
    "charLeoAlt": "Leo pomarańczowy dźwig samochodowy",
    "charNinaName": "Nina",
    "charNinaRole": "Betoniarka",
    "charNinaDesc": "Wesoła, dokładna i tryskająca energią. Jej kolorowy bęben kręci się bez przerwy, przygotowując idealny beton i wnosząc radość na budowę.",
    "charNinaAlt": "Nina pomarańczowo-biała betoniarka",
    "charRinoName": "Rino",
    "charRinoRole": "Walec",
    "charRinoDesc": "Spokojny, wytrwały i niezawodny. Ciężkim stalowym walcem wyrównuje każdą wyboistą drogę, pokazując, że cierpliwość pokona każdą przeszkodę.",
    "charRinoAlt": "Rino walec",
    "charRudyName": "Rudy",
    "charRudyRole": "Spychacz",
    "charRudyDesc": "Energiczny, silny i odważny. Ze swoim potężnym lemieszem Rudy toruje drogę i pokonuje każdą przeszkodę z uśmiechem na twarzy.",
    "charRudyAlt": "Rudy spychacz",
    "charactersCtaTitle": "Przeżyj Przygody na Placu Budowy",
    "charactersCtaDesc": "Szóstka przyjaciół czeka na Ciebie! Odkryj barwne książki z serii i ciesz się wspaniałymi chwilami wspólnego czytania w rodzinnym gronie.",
    "charactersCtaBtn": "Odkryj książki z serii"
  },
  "sv": {
    "navCharacters": "Karaktärer",
    "charactersPageTitle": "En värld av upptäckter, vänskap och stora maskiner",
    "charactersMetaTitle": "Karaktärerna | Byggarbetsplatsens Äventyr - CSA Books 4 Kids",
    "charactersMetaDesc": "Möt de charmiga hjältarna i Byggarbetsplatsens Äventyr: grävmaskinen Benny, tippbilen Bruno, kranbilen Leo, betongbilen Nina, välten Rino och schaktmaskinen Rudy.",
    "charactersBadge": "Den Officiella Bokserien",
    "charactersHeroDesc": "„Le Avventure del Cantiere“ (Byggarbetsplatsens Äventyr) är en serie illustrerade barnböcker med ett gäng godhjärtade arbetsfordon i huvudrollerna. Varje bok förvandlar en vardaglig byggutmaning till ett varmt äventyr fyllt av vänskap, nyfikenhet, samarbete och upptäckarglädje.",
    "charactersValuesTitle": "Vad Som Gör Bokserien Speciell",
    "charactersValuesSubtitle": "Viktiga värderingar förmedlade genom enkla, roliga och hjärtevärmande berättelser",
    "value1Title": "Vänskap & Samarbete",
    "value1Desc": "Ingen utmaning är för stor när vi hjälps åt: berättelserna hyllar styrkan i sammanhållning och omtanke.",
    "value2Title": "Nyfikenhet & Upptäckarglädje",
    "value2Desc": "Nyfikenhet väcker fantasin till liv: varje sida bjuder in barnen att utforska omvärlden med öppna ögon.",
    "value3Title": "Problemlösning",
    "value3Desc": "Med lugn, påhittighet och gott humör visar vännerna att det alltid finns en lösning på knepiga problem.",
    "value4Title": "Gemensam Läsning",
    "value4Desc": "En trygg och nära lässtund för föräldrar och barn varje dag – en fin paus från alla skärmar.",
    "charactersSectionTitle": "Möt Karaktärerna",
    "charactersSectionSubtitle": "Sex unika vänner som alltid är redo att bygga tillsammans och ge sig ut på nya äventyr!",
    "charBennyName": "Benny",
    "charBennyRole": "Grävmaskinen",
    "charBennyDesc": "Nyfiken, entusiastisk och med ett stort hjärta. Med sin skopa gräver han djupt, hittar hemligheter och ställer alltid upp för en vän i nöd.",
    "charBennyAlt": "Benny grävmaskinen",
    "charBrunoName": "Bruno",
    "charBrunoRole": "Dumpern",
    "charBrunoDesc": "Stark, hjälpsam och ständigt glad. På sitt rymliga flak fraktar han tunga lass med sand och sten med ett leende till hela gänget.",
    "charBrunoAlt": "Bruno tippbilen",
    "charLeoName": "Leo",
    "charLeoRole": "Kranbilen",
    "charLeoDesc": "Tålmodig, uppmärksam och omtänksam. Från hög höjd ser han allt klart och lyfter tunga balkar tryggt och varsamt på plats.",
    "charLeoAlt": "Leo kranbilen",
    "charNinaName": "Nina",
    "charNinaRole": "Betongbilen",
    "charNinaDesc": "Sprudlande, noggrann och full av energi. Hennes trumma snurrar oavbrutet för att blanda finaste betong och sprida glädje.",
    "charNinaAlt": "Nina den orange-vita betongbilen",
    "charRinoName": "Rino",
    "charRinoRole": "Välten",
    "charRinoDesc": "Lugn, uthållig och pålitlig. Med sin tunga stålvals plattar han till varje gropig väg och visar att tålamod vinner i längden.",
    "charRinoAlt": "Rino välten",
    "charRudyName": "Rudy",
    "charRudyRole": "Schaktmaskinen",
    "charRudyDesc": "Energisk, stark och modig. Med sitt kraftiga schaktblad banar Rudy väg och tar sig an alla utmaningar med gott humör och ett brett leende.",
    "charRudyAlt": "Rudy schaktmaskinen",
    "charactersCtaTitle": "Upplev Äventyren på Bygget",
    "charactersCtaDesc": "De sex vännerna väntar på dig! Upptäck alla underbart illustrerade böcker i serien och njut av härliga lässtunder tillsammans.",
    "charactersCtaBtn": "Upptäck böckerna i serien"
  },
  "ja": {
    "navCharacters": "キャラクター",
    "charactersPageTitle": "発見と友情、そして働く車たちのワクワクする世界",
    "charactersMetaTitle": "キャラクター紹介 | 工事現場の冒険 - CSA Books 4 Kids",
    "charactersMetaDesc": "『工事現場の冒険』のゆかいな仲間たちをご紹介：ショベルカーのベニー、ダンプカーのブルーノ、クレーン車のレオ、ミキサー車のニーナ、ロードローラーのリノ、そしてブルドーザーのルディ。",
    "charactersBadge": "公式絵本シリーズ",
    "charactersHeroDesc": "『Le Avventure del Cantiere』（工事現場の冒険）は、親しみやすい働く車たちが大活躍する子ども向け絵本シリーズです。日々の工事現場の小さな課題が、友情や好奇心、チームワーク、発見にあふれた心温まる大冒険へと変わります。親子で笑顔になれる素敵な読書の時間をお届けします。",
    "charactersValuesTitle": "この絵本シリーズが大切にしていること",
    "charactersValuesSubtitle": "シンプルで楽しく、心にあたたかい価値観を育む物語",
    "value1Title": "友情とチームワーク",
    "value1Desc": "力を合わせれば、どんな困難も乗り越えられます。互いを思いやり協力し合う喜びを伝えます。",
    "value2Title": "好奇心と新しい発見",
    "value2Desc": "好奇心は成長の大きな原動力。ページをめくるたびに子どもの探究心と豊かな想像力を刺激します。",
    "value3Title": "問題解決のひらめき",
    "value3Desc": "思わぬハプニングも落ち着いて工夫すれば大丈夫。諦めずに解決策を見つける前向きな心を育みます。",
    "value4Title": "親子のふれあい読書",
    "value4Desc": "画面から少し離れて、パパやママと寄り添いながら物語を語り合うかけがえのない時間を作ります。",
    "charactersSectionTitle": "キャラクター紹介",
    "charactersSectionSubtitle": "いつも助け合い、元気に大冒険を繰り広げる6台の特別な仲間たち！",
    "charBennyName": "ベニー (Benny)",
    "charBennyRole": "黄色いショベルカー",
    "charBennyDesc": "好奇心旺盛で情熱的、そして誰よりも優しい心の持ち主。自慢のバケットで土を掘り、隠れた発見を楽しみながら、困っている仲間がいればすぐに駆けつけます。",
    "charBennyAlt": "黄色いショベルカーのベニー",
    "charBrunoName": "ブルーノ (Bruno)",
    "charBrunoRole": "力持ちのダンプカー",
    "charBrunoDesc": "力持ちで大らか、いつも明るいムードメーカー。大きな荷台で砂や重い石を運びながら、頼もしい笑顔で現場の仲間を元気づけます。",
    "charBrunoAlt": "赤いダンプカーのブルーノ",
    "charLeoName": "レオ (Leo)",
    "charLeoRole": "見守り上手なクレーン車",
    "charLeoDesc": "穏やかで観察力に優れ、みんなを守る頼れる存在。高い場所から現場を冷静に見守り、長いアームで重い資材を丁寧に吊り上げて難問を解決します。",
    "charLeoAlt": "オレンジ色のクレーン車のレオ",
    "charNinaName": "ニーナ (Nina)",
    "charNinaRole": "元気なミキサー車",
    "charNinaDesc": "活発で几帳面、いつもポジティブなエネルギーにあふれています。くるくるとドラムを回して完璧な生コンを作り、現場に笑顔を届けます。",
    "charNinaAlt": "オレンジと白のミキサー車のニーナ",
    "charRinoName": "リノ (Rino)",
    "charRinoRole": "マイペースなロードローラー",
    "charRinoDesc": "落ち着いていて粘り強く、とても頼りになります。重いスチールドラムでデコボコ道を平らに整え、焦らず一歩ずつ進むことの大切さを教えてくれます。",
    "charRinoAlt": "緑色のロードローラーのリノ",
    "charactersCtaTitle": "工事現場の冒険の世界へ！",
    "charactersCtaDesc": "6台の仲間たちが待っています！色鮮やかなイラストと心温まるお話が詰まった絵本シリーズを、ぜひお子様と一緒にお楽しみください。",
    "charactersCtaBtn": "シリーズの絵本を見る",
    "charRudyName": "Rudy",
    "charRudyRole": "ブルドーザーのルディ",
    "charRudyDesc": "力持ちで元気いっぱい、頼もしい仲間。大きなブレードで道を切り拓き、どんな困難も笑顔とガッツで乗り越えます。",
    "charRudyAlt": "ブルドーザーのルディ"
  }
};

Object.keys(CHARACTERS_I18N).forEach(lang => {
  if (I18N[lang]) {
    Object.assign(I18N[lang], CHARACTERS_I18N[lang]);
  }
});

const REVIEWS_I18N = {
  it: {
    navReviews: "Recensioni",
    reviewsTitle: "Cosa Dicono i Genitori",
    reviewsRatingLabel: "Valutazione: ",
    reviewsRatingSr: "Valutazione: 5 su 5 stelle",
    reviewsAmazonSource: "Recensione Amazon",
    reviewsPrevAria: "Recensioni precedenti",
    reviewsNextAria: "Recensioni successive"
  },
  en: {
    navReviews: "Reviews",
    reviewsTitle: "What Parents Are Saying",
    reviewsRatingLabel: "Rating: ",
    reviewsRatingSr: "Rating: 5 out of 5 stars",
    reviewsAmazonSource: "Amazon Review",
    reviewsPrevAria: "Previous reviews",
    reviewsNextAria: "Next reviews"
  },
  de: {
    navReviews: "Bewertungen",
    reviewsTitle: "Was Eltern sagen",
    reviewsRatingLabel: "Bewertung: ",
    reviewsRatingSr: "Bewertung: 5 von 5 Sternen",
    reviewsAmazonSource: "Amazon-Rezension",
    reviewsPrevAria: "Vorherige Bewertungen",
    reviewsNextAria: "Nächste Bewertungen"
  },
  fr: {
    navReviews: "Avis",
    reviewsTitle: "Ce que disent les parents",
    reviewsRatingLabel: "Évaluation : ",
    reviewsRatingSr: "Note : 5 sur 5 étoiles",
    reviewsAmazonSource: "Avis Amazon",
    reviewsPrevAria: "Avis précédents",
    reviewsNextAria: "Avis suivants"
  },
  es: {
    navReviews: "Opiniones",
    reviewsTitle: "Lo que dicen los padres",
    reviewsRatingLabel: "Valoración: ",
    reviewsRatingSr: "Calificación: 5 de 5 estrellas",
    reviewsAmazonSource: "Opinión en Amazon",
    reviewsPrevAria: "Opiniones anteriores",
    reviewsNextAria: "Opiniones siguientes"
  },
  nl: {
    navReviews: "Recensies",
    reviewsTitle: "Wat ouders zeggen",
    reviewsRatingLabel: "Beoordeling: ",
    reviewsRatingSr: "Beoordeling: 5 van de 5 sterren",
    reviewsAmazonSource: "Amazon-recensie",
    reviewsPrevAria: "Vorige recensies",
    reviewsNextAria: "Volgende recensies"
  },
  pl: {
    navReviews: "Opinie",
    reviewsTitle: "Co mówią rodzice",
    reviewsRatingLabel: "Ocena: ",
    reviewsRatingSr: "Ocena: 5 na 5 gwiazdek",
    reviewsAmazonSource: "Opinia z Amazon",
    reviewsPrevAria: "Poprzednie opinie",
    reviewsNextAria: "Następne opinie"
  },
  sv: {
    navReviews: "Recensioner",
    reviewsTitle: "Vad föräldrar säger",
    reviewsRatingLabel: "Betyg: ",
    reviewsRatingSr: "Betyg: 5 av 5 stjärnor",
    reviewsAmazonSource: "Amazon-recension",
    reviewsPrevAria: "Föregående recensioner",
    reviewsNextAria: "Nästa recensioner"
  },
  ja: {
    navReviews: "レビュー",
    reviewsTitle: "保護者の方々の声",
    reviewsRatingLabel: "評価: ",
    reviewsRatingSr: "評価：5つ星のうち5",
    reviewsAmazonSource: "Amazonカスタマーレビュー",
    reviewsPrevAria: "前のレビュー",
    reviewsNextAria: "次のレビュー"
  }
};

Object.keys(REVIEWS_I18N).forEach(lang => {
  if (I18N[lang]) {
    Object.assign(I18N[lang], REVIEWS_I18N[lang]);
  }
});

// ============================================================================
// TRADUZIONI IN PRIMA PERSONA PAGINA CHI SIAMO (about.html)
// ============================================================================
const ABOUT_I18N = {
  "it": {
    "navAbout": "La nostra storia",
    "aboutPageTitle": "La storia dietro CSA Books 4 Kids",
    "aboutMetaTitle": "La nostra storia | CSA Books 4 Kids",
    "aboutMetaDesc": "La storia dietro CSA Books 4 Kids: libri illustrati per bambini nati da un papà e una mamma, ispirati dalla passione per camion, ruspe e cantieri.",
    "aboutBadge": "L'Autore",
    "aboutAuthorRole": "Autore e creatore di CSA Books 4 Kids",
    "aboutStoryTitle": "L'ispirazione: un'avventura di famiglia",
    "aboutBioP1": "Sono nato a Fano, nelle Marche, e oggi vivo in Trentino-Alto Adige, immerso tra montagne e natura che spesso alimentano la mia immaginazione.",
    "aboutBioP2": "Amo insegnare e trasmettere conoscenze, e penso che ogni storia possa diventare un piccolo ponte tra crescita, curiosità e divertimento.",
    "aboutBioP3": "La mia più grande ispirazione è mio figlio. È stata proprio la sua passione irrefrenabile per camion, ruspe, gru e cantieri a dare vita a Le Avventure del Cantiere, una collana pensata per tutti i bambini curiosi e per chi ama le grandi macchine protagoniste di storie semplici, divertenti e ricche di valori.",
    "aboutBioFamily": "I libri sono scritti da me, ma ogni storia nasce e prende forma insieme alla mamma di nostro figlio: un lavoro a quattro mani per trovare le parole giuste, il ritmo perfetto e quel calore che rende speciale la lettura prima della nanna.",
    "aboutOriginTitle": "Tutto è cominciato da qui",
    "aboutOriginSubtitle": "Prima dei libri c'era una passione: camion, ruspe, gru e cantieri osservati con gli occhi pieni di curiosità.",
    "aboutInspirationText": "Una passione per camion, ruspe e cantieri ha fatto nascere un intero mondo di storie.",
    "aboutBioP4": "Attraverso i miei libri cerco di creare qualcosa che vada oltre la semplice lettura: momenti da condividere tra genitori e figli, fatti di gioco, emozione e scoperta.",
    "aboutReadingTitle": "Dalle macchine ai libri",
    "aboutReadingSubtitle": "Quelle passioni che hanno dato vita alle storie oggi possono diventare momenti da leggere e condividere insieme.",
    "aboutBioP5": "Vorrei contribuire a riportare la lettura al centro del tempo trascorso insieme, offrendo ai bambini storie capaci di farli sorridere, immaginare e imparare, lontano per qualche momento dai piccoli schermi.",
    "aboutClosingText": "Perché le storie più belle non sono solo quelle che i bambini leggono, ma quelle che genitori e figli vivono insieme.",
    "aboutCtaBtn": "Scopri i miei libri"
  },
  "en": {
    "navAbout": "Our Story",
    "aboutPageTitle": "The Story Behind CSA Books 4 Kids",
    "aboutMetaTitle": "Our Story | CSA Books 4 Kids",
    "aboutMetaDesc": "The story behind CSA Books 4 Kids: children's picture books created by a dad and a mom, inspired by their child's passion for trucks and construction.",
    "aboutBadge": "About the Creator",
    "aboutAuthorRole": "Author & Creator of CSA Books 4 Kids",
    "aboutStoryTitle": "The Inspiration: A Family Adventure",
    "aboutBioP1": "I was born in Fano, in the Marche region of Italy, and today I live in Trentino-Alto Adige, surrounded by mountains and nature that constantly spark my imagination.",
    "aboutBioP2": "I love teaching and sharing knowledge, and I believe every story can become a gentle bridge between growth, curiosity, and fun.",
    "aboutBioP3": "My greatest inspiration is my son. It was his unstoppable passion for trucks, excavators, cranes, and construction sites that brought Le Avventure del Cantiere (Construction Site Adventures) to life — a book series created for all curious children and anyone who loves big machines starring in simple, engaging stories filled with positive values.",
    "aboutBioFamily": "The books are written by me, but every story takes shape together with our child's mom: a joint effort to find the right words, the perfect rhythm, and that warmth that makes bedtime reading special.",
    "aboutOriginTitle": "It all started here",
    "aboutOriginSubtitle": "Before the books, there was a passion: trucks, excavators, cranes and construction sites watched with eyes full of curiosity.",
    "aboutInspirationText": "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    "aboutBioP4": "Through my books, I strive to create something that goes beyond reading: meaningful moments to share between parents and children, filled with play, emotion, and discovery.",
    "aboutReadingTitle": "From machines to books",
    "aboutReadingSubtitle": "Those passions that brought the stories to life can now become moments to read and share together.",
    "aboutBioP5": "I want to help bring shared reading back to the heart of family time, offering children stories that make them smile, wonder, and learn — away from screens, even just for a little while.",
    "aboutClosingText": "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    "aboutCtaBtn": "Discover my books"
  },
  "de": {
    "navAbout": "Unsere Geschichte",
    "aboutPageTitle": "Die Geschichte hinter CSA Books 4 Kids",
    "aboutMetaTitle": "Unsere Geschichte | CSA Books 4 Kids",
    "aboutMetaDesc": "Die Geschichte hinter CSA Books 4 Kids: Bilderbücher für Kinder von einem Papa und einer Mama, inspiriert von der Baustellenbegeisterung ihres Sohnes.",
    "aboutBadge": "Über den Autor",
    "aboutAuthorRole": "Autor & Gründer von CSA Books 4 Kids",
    "aboutStoryTitle": "Die Inspiration: Ein Familienabenteuer",
    "aboutBioP1": "Ich bin in Fano in den Marken geboren und lebe heute in Trentino-Südtirol, umgeben von Bergen und Natur, die meine Fantasie immer wieder beflügeln.",
    "aboutBioP2": "Ich liebe es zu unterrichten und Wissen weiterzugeben, und ich glaube daran, dass jede Geschichte zu einer kleinen Brücke zwischen Entwicklung, Neugier und Spaß werden kann.",
    "aboutBioP3": "Meine größte Inspiration ist mein Sohn. Seine unbändige Begeisterung für Lastwagen, Bagger, Kräne und Baustellen hat Le Avventure del Cantiere (Baustellenabenteuer) ins Leben gerufen – eine Buchreihe für neugierige Kinder und alle, die große Maschinen in einfachen, fröhlichen und werteorientierten Geschichten lieben.",
    "aboutBioFamily": "Die Bücher werden von mir geschrieben, doch jede Geschichte entsteht gemeinsam mit der Mutter unseres Sohnes: eine liebevolle Zusammenarbeit, um die richtigen Worte, den perfekten Rhythmus und jene Wärme zu finden, die das Vorlesen vor dem Einschlafen so besonders macht.",
    "aboutOriginTitle": "Hier hat alles begonnen",
    "aboutOriginSubtitle": "Vor den Büchern gab es eine Leidenschaft: Lastwagen, Bagger, Kräne und Baustellen, betrachtet mit neugierigen Augen.",
    "aboutInspirationText": "Aus der Leidenschaft für Lastwagen, Bagger und Baustellen entstand eine ganze Welt voller Geschichten.",
    "aboutBioP4": "Mit meinen Büchern möchte ich etwas schaffen, das über das bloße Lesen hinausgeht: Momente der Nähe zwischen Eltern und Kindern, geprägt von Spiel, Emotionen und Entdeckerfreude.",
    "aboutReadingTitle": "Von Maschinen zu Büchern",
    "aboutReadingSubtitle": "Die Leidenschaften, die diese Geschichten zum Leben erweckt haben, können heute zu Momenten des gemeinsamen Lesens werden.",
    "aboutBioP5": "Ich möchte dazu beitragen, das gemeinsame Lesen wieder in den Mittelpunkt der Familienzeit zu rücken – mit Geschichten, die Kinder zum Lächeln, Träumen und Lernen anregen, für einen Moment fernab von kleinen Bildschirmen.",
    "aboutClosingText": "Denn die schönsten Geschichten sind nicht nur jene, die Kinder lesen, sondern die, die Eltern und Kinder gemeinsam erleben.",
    "aboutCtaBtn": "Entdecke meine Bücher"
  },
  "fr": {
    "navAbout": "Notre histoire",
    "aboutPageTitle": "L'histoire derrière CSA Books 4 Kids",
    "aboutMetaTitle": "Notre histoire | CSA Books 4 Kids",
    "aboutMetaDesc": "L'histoire derrière CSA Books 4 Kids : albums illustrés pour enfants créés par un papa et une maman, inspirés par la passion d'un enfant pour les chantiers.",
    "aboutBadge": "L'Auteur",
    "aboutAuthorRole": "Auteur & créateur de CSA Books 4 Kids",
    "aboutStoryTitle": "L'inspiration : une aventure de famille",
    "aboutBioP1": "Je suis né à Fano, dans les Marches, et je vis aujourd'hui dans le Trentin-Haut-Adige, au cœur de montagnes et d'une nature qui nourrissent souvent mon imagination.",
    "aboutBioP2": "J'aime enseigner et transmettre le savoir, et je crois que chaque histoire peut devenir une passerelle complice entre éveil, curiosité et amusement.",
    "aboutBioP3": "Ma plus grande inspiration est mon fils. C'est sa passion débordante pour les camions, les pelleteuses, les grues et les chantiers qui a donné naissance à Le Avventure del Cantiere (Les Aventures du Chantier), une collection conçue pour tous les petits curieux et les passionnés de grands engins à travers des récits simples, amusants et riches en valeurs.",
    "aboutBioFamily": "Les livres sont écrits par moi, mais chaque histoire prend vie aux côtés de la maman de notre enfant : un travail à quatre mains pour trouver les mots justes, le rythme parfait et cette chaleur qui rend la lecture du soir si précieuse.",
    "aboutOriginTitle": "Tout a commencé ici",
    "aboutOriginSubtitle": "Avant les livres, il y avait une passion : camions, pelleteuses, grues et chantiers observés avec des yeux pleins de curiosité.",
    "aboutInspirationText": "Une passion pour les camions, pelleteuses et chantiers a donné naissance à tout un univers d'histoires.",
    "aboutBioP4": "À travers mes livres, je cherche à créer quelque chose qui dépasse la simple lecture : des moments privilégiés à partager entre parents et enfants, faits de jeu, d'émotion et de découverte.",
    "aboutReadingTitle": "Des machines aux livres",
    "aboutReadingSubtitle": "Ces passions qui ont donné naissance aux histoires peuvent aujourd'hui devenir des moments à lire et à partager ensemble.",
    "aboutBioP5": "J'aimerais contribuer à replacer la lecture au cœur des moments passés ensemble, en offrant aux enfants des histoires qui les font sourire, imaginer et apprendre, loin des petits écrans le temps d'un instant.",
    "aboutClosingText": "Parce que les plus belles histoires ne sont pas seulement celles que les enfants lisent, mais celles que parents et enfants partagent ensemble.",
    "aboutCtaBtn": "Découvrir mes livres"
  },
  "es": {
    "navAbout": "Nuestra historia",
    "aboutPageTitle": "La historia detrás de CSA Books 4 Kids",
    "aboutMetaTitle": "Nuestra historia | CSA Books 4 Kids",
    "aboutMetaDesc": "La historia detrás de CSA Books 4 Kids: libros ilustrados infantiles creados por un papá y una mamá, inspirados por la pasión por las obras y camiones.",
    "aboutBadge": "El Autor",
    "aboutAuthorRole": "Autor y creador de CSA Books 4 Kids",
    "aboutStoryTitle": "La inspiración: una aventura familiar",
    "aboutBioP1": "Nací en Fano, en las Marcas (Italia), y hoy vivo en Trentino-Alto Adigio, rodeado de montañas y naturaleza que a menudo despiertan mi imaginación.",
    "aboutBioP2": "Me encanta enseñar y compartir conocimientos, y creo firmemente que cada historia puede convertirse en un puente entre el crecimiento, la curiosidad y la diversión.",
    "aboutBioP3": "Mi mayor inspiración es mi hijo. Fue precisamente su pasión incontenible por los camiones, excavadoras, grúas y obras lo que dio vida a Le Avventure del Cantiere (Las Aventuras de la Construcción), una colección pensada para todos los niños curiosos y para quienes aman las grandes máquinas protagonistas de historias sencillas, divertidas y llenas de valores.",
    "aboutBioFamily": "Los libros están escritos por mí, pero cada historia cobra vida junto con la madre de nuestro hijo: un trabajo conjunto para encontrar las palabras adecuadas, el ritmo perfecto y esa calidez que hace tan especial la lectura antes de dormir.",
    "aboutOriginTitle": "Todo comenzó aquí",
    "aboutOriginSubtitle": "Antes de los libros había una pasión: camiones, excavadoras, grúas y obras de construcción observados con ojos llenos de curiosidad.",
    "aboutInspirationText": "Una pasión por camiones, excavadoras y obras dio origen a todo un mundo de historias.",
    "aboutBioP4": "A través de mis libros intento crear algo que vaya más allá de la lectura: momentos entrañables para compartir entre padres e hijos, llenos de juego, emoción y descubrimiento.",
    "aboutReadingTitle": "De las máquinas a los libros",
    "aboutReadingSubtitle": "Aquellas pasiones que dieron vida a las historias hoy pueden convertirse en momentos para leer y compartir juntos.",
    "aboutBioP5": "Quiero contribuir a devolver la lectura al centro del tempo en familia, ofreciendo a los pequeños historias capaces de hacerlos sonreír, imaginar y aprender, lejos de las pantallas al menos por un rato.",
    "aboutClosingText": "Porque las mejores historias no son solo las que los niños leen, sino las que padres e hijos viven juntos.",
    "aboutCtaBtn": "Descubre mis libros"
  },
  "nl": {
    "navAbout": "Ons verhaal",
    "aboutPageTitle": "Het verhaal achter CSA Books 4 Kids",
    "aboutMetaTitle": "Ons verhaal | CSA Books 4 Kids",
    "aboutMetaDesc": "Het verhaal achter CSA Books 4 Kids: prentenboeken voor kinderen gemaakt door een papa en mama, geïnspireerd door de bouwplaatsliefde van hun zoon.",
    "aboutBadge": "Over de auteur",
    "aboutAuthorRole": "Auteur en bedenker van CSA Books 4 Kids",
    "aboutStoryTitle": "De inspiratie: een familie-avontuur",
    "aboutBioP1": "Ik ben geboren in Fano, in de regio Marche, en woon tegenwoordig in Trentino-Zuid-Tirol, omgeven door bergen en natuur die mijn fantasie voortdurend voeden.",
    "aboutBioP2": "Ik hou van lesgeven en het delen van kennis, en ik geloof dat elk verhaal een waardevolle brug kan slaan tussen groei, nieuwsgierigheid en plezier.",
    "aboutBioP3": "Mijn grootste inspiratie is mijn zoon. Zijn grenzeloze passie voor vrachtwagens, graafmachines, kranen en bouwplaatsen bracht Le Avventure del Cantiere (Bouwplaatsavonturen) tot leven – een boekenreeks gemaakt voor nieuwsgierige kinderen en iedereen die houdt van grote machines in eenvoudige, vrolijke verhalen vol mooie waarden.",
    "aboutBioFamily": "De boeken zijn door mij geschreven, maar elk verhaal krijgt vorm samen met de moeder van ons kind: een gezamenlijke zoektocht naar de juiste woorden, het perfecte ritme en die warmte die voorlezen voor het slapengaan zo bijzonder maakt.",
    "aboutOriginTitle": "Het begon allemaal hier",
    "aboutOriginSubtitle": "Vóór de boeken was er een passie: vrachtwagens, graafmachines, kranen en bouwplaatsen bekeken met ogen vol nieuwsgierigheid.",
    "aboutInspirationText": "Een passie voor vrachtwagens, graafmachines en bouwplaatsen bracht een hele wereld vol verhalen tot leven.",
    "aboutBioP4": "Met mijn boeken wil ik iets creëren dat verder gaat dan alleen lezen: dierbare momenten om samen te delen tussen ouders en kinderen, vol spel, emotie en ontdekking.",
    "aboutReadingTitle": "Van machines naar boeken",
    "aboutReadingSubtitle": "Die passies die de verhalen tot leven brachten, kunnen nu momenten worden om samen te lezen en te delen.",
    "aboutBioP5": "Ik wil graag helpen om samen lezen weer centraal te stellen in de tijd die we als gezin doorbrengen, met verhalen die kinderen laten glimlachen, dromen en leren – even helemaal weg van beeldschermen.",
    "aboutClosingText": "Omdat de mooiste verhalen niet alleen de verhalen zijn die kinderen lezen, maar de verhalen die ouders en kinderen samen beleven.",
    "aboutCtaBtn": "Ontdek mijn boeken"
  },
  "pl": {
    "navAbout": "Nasza historia",
    "aboutPageTitle": "Historia stojąca za CSA Books 4 Kids",
    "aboutMetaTitle": "Nasza historia | CSA Books 4 Kids",
    "aboutMetaDesc": "Historia stojąca za CSA Books 4 Kids: książki z obrazkami dla dzieci stworzone przez tatę i mamę, zainspirowane fascynacją maszynami budowlanymi.",
    "aboutBadge": "O autorze",
    "aboutAuthorRole": "Autor i twórca CSA Books 4 Kids",
    "aboutStoryTitle": "Inspiracja: rodzinna przygoda",
    "aboutBioP1": "Urodziłem się w Fano w regionie Marche, a dziś mieszkam w Trydencie-Górnej Adydze, w otoczeniu gór i przyrody, które nieustannie rozbudzają moją wyobraźnię.",
    "aboutBioP2": "Uwielbiam uczyć i dzielić się wiedzą, a także wierzę, że każda opowieść może stać się pomostem łączącym rozwój, ciekawość i dobrą zabawę.",
    "aboutBioP3": "Moją największą inspiracją jest mój syn. To właśnie jego niespożyta fascynacja ciężarówkami, koparkami, dźwigami i placami budowy dała początek serii Le Avventure del Cantiere (Przygody na placu budowy) – stworzonej dla wszystkich ciekawych świata dzieci oraz miłośników wielkich maszyn, pełnej prostych, wesołych i wartościowych historii.",
    "aboutBioFamily": "Książki piszę ja, ale każda historia rodzi się i nabiera kształtu razem z mamą naszego synka: to wspólna praca, by znaleźć właściwe słowa, idealny rytm i ciepło, które czyni wieczorne czytanie tak wyjątkowym.",
    "aboutOriginTitle": "Wszystko zaczęło się tutaj",
    "aboutOriginSubtitle": "Przed książkami była pasja: ciężarówki, koparki, dźwigi i place budowy obserwowane z ciekawością w oczach.",
    "aboutInspirationText": "Pasja do ciężarówek, koparek i placów budowy dała początek całemu światu opowieści.",
    "aboutBioP4": "Poprzez moje książki staram się tworzyć coś więcej niż samą lekturę: wyjątkowe chwile bliskości dla rodziców i dzieci, wypełnione wspólną zabawą, emocjami i odkrywaniem świata.",
    "aboutReadingTitle": "Od maszyn do książek",
    "aboutReadingSubtitle": "Te same pasje, które dały początek opowieściom, dziś stają się chwilami do wspólnego czytania i dzielenia się nimi.",
    "aboutBioP5": "Pragnę przywrócić wspólne czytanie do centrum rodzinnego czasu, oferując dzieciom historie, które wywołują uśmiech, rozwijają wyobraźnię i uczą – z dala od małych ekranów choć na chwilę.",
    "aboutClosingText": "Bo najpiękniejsze historie to nie tylko te, które dzieci czytają, ale te, które rodzice i dzieci przeżywają wspólnie.",
    "aboutCtaBtn": "Odkryj moje książki"
  },
  "sv": {
    "navAbout": "Vår historia",
    "aboutPageTitle": "Historien bakom CSA Books 4 Kids",
    "aboutMetaTitle": "Vår historia | CSA Books 4 Kids",
    "aboutMetaDesc": "Historien bakom CSA Books 4 Kids: bilderböcker för barn skapade av en pappa och en mamma, inspirerade av sonens kärlek till byggarbetsplatser.",
    "aboutBadge": "Om skaparen",
    "aboutAuthorRole": "Författare och skapare av CSA Books 4 Kids",
    "aboutStoryTitle": "Inspirationen: ett familjeäventyr",
    "aboutBioP1": "Jag är född i Fano i Marche och bor idag i Trentino-Sydtyrolen, omgiven av berg och natur som ständigt ger näring åt min fantasi.",
    "aboutBioP2": "Jag har alltid älskat att undervisa och dela med mig av kunskap, och jag är övertygad om att varje berättelse kan bli en bro mellan utveckling, nyfikenhet och glädje.",
    "aboutBioP3": "Min största inspiration är min son. Det var hans outtröttliga intresse för lastbilar, grävmaskiner, lyftkranar och byggarbetsplatser som gav liv åt Le Avventure del Cantiere (Byggarbetsplatsens äventyr) – en bokserie skapad för alla nyfikna barn och alla som älskar stora maskiner i enkla, roliga och värdegrundade berättelser.",
    "aboutBioFamily": "Böckerna är skrivna av mig, men varje berättelse växer fram tillsammans med vårt barns mamma: ett gemensamt arbete för att hitta de rätta orden, den perfekta rytmen och den värme som gör godnattsagan så speciell.",
    "aboutOriginTitle": "Allt började här",
    "aboutOriginSubtitle": "Före böckerna fanns en passion: lastbilar, grävmaskiner, lyftkranar och byggarbetsplatser betraktade med nyfikna ögon.",
    "aboutInspirationText": "En passion för lastbilar, grävmaskiner och byggarbetsplatser födde en hel värld av berättelser.",
    "aboutBioP4": "Genom mina böcker vill jag skapa något som sträcker sig bortom själva läsningen: meningsfulla stunder att dela mellan föräldrar och barn, fyllda av lek, känslor och upptäckarglädje.",
    "aboutReadingTitle": "Från maskiner till böcker",
    "aboutReadingSubtitle": "De passioner som väckte berättelserna till liv kan nu bli stunder att läsa och dela tillsammans.",
    "aboutBioP5": "Jag vill bidra till att sätta gemensam läsning i centrum för familjetiden, och erbjuda barn berättelser som får dem att le, fantisera och lära – en stund bortom alla små skärmar.",
    "aboutClosingText": "För de finaste berättelserna är inte bara de som barnen läser, utan de som föräldrar och barn upplever tillsammans.",
    "aboutCtaBtn": "Upptäck mina böcker"
  },
  "ja": {
    "navAbout": "私たちの物語",
    "aboutPageTitle": "CSA Books 4 Kids の誕生秘話",
    "aboutMetaTitle": "私たちの物語 | CSA Books 4 Kids",
    "aboutMetaDesc": "CSA Books 4 Kids の誕生秘話：働く車が大好きな息子の情熱から、パパとママが力を合わせて生み出した子ども向け絵本シリーズ。",
    "aboutBadge": "著者紹介",
    "aboutAuthorRole": "CSA Books 4 Kids 著者・クリエイター",
    "aboutStoryTitle": "インスピレーション：家族の冒険",
    "aboutBioP1": "私はイタリア・マルケ州のファーノで生まれ、現在は山々と豊かな自然に囲まれたトレンティーノ＝アルト・アディジェ州に暮らしています。この自然が、私の想像力の大きな源となっています。",
    "aboutBioP2": "私は人に教え、知識を分かち合うことが大好きです。一つひとつの物語が、成長と好奇心、そして楽しさを結ぶ小さな架け橋になると信じています。",
    "aboutBioP3": "私の何よりのインスピレーションは息子です。トラックやショベルカー、クレーン車、工事現場への息子のあふれる情熱から、『Le Avventure del Cantiere』（工事現場の冒険）シリーズが誕生しました。好奇心旺盛な子どもたちや、大きな働く車が大好きなすべての読者のために、シンプルで楽しく、大切な価値観が詰まった物語を届けています。",
    "aboutBioFamily": "本は私が執筆していますが、すべての物語は息子の母親と一緒に形作られています。ぴったりの言葉、心地よいリズム、そしておやすみ前の読み聞かせを特別にする温もりを見つけるための、二人三脚の創作です。",
    "aboutOriginTitle": "すべてはここから始まりました",
    "aboutOriginSubtitle": "本ができる前、そこには情熱がありました。トラック、ショベルカー、クレーン車、工事現場を好奇心いっぱいの目で見つめていました。",
    "aboutInspirationText": "トラックやショベルカー、工事現場への情熱から、物語の世界が誕生しました。",
    "aboutBioP4": "私の絵本を通じて、単なる読書にとどまらない、親子で共有できる特別なひととき――遊びや感動、新しい発見に満ちた時間――をお届けしたいと考えています。",
    "aboutReadingTitle": "働く車から絵本へ",
    "aboutReadingSubtitle": "物語を生み出したその情熱が、今では親子で一緒に読み、共有する温かい時間になっています。",
    "aboutBioP5": "小さな画面から少し離れて、子どもたちが笑顔になり、想像を膨らませ、学べる物語を届けることで、親子が寄り添う時間の中に読書のぬくもりを取り戻すお手伝いができれば幸いです。",
    "aboutClosingText": "最高の物語とは、子どもがひとりで読むものだけでなく、親と子が心を通わせて共に体験するものだからです。",
    "aboutCtaBtn": "私の本を見る"
  }
};

Object.keys(ABOUT_I18N).forEach(lang => {
  if (I18N[lang]) {
    Object.assign(I18N[lang], ABOUT_I18N[lang]);
  }
});

// ============================================================================
// TRADUZIONI PAGINA FANO COL NASO ALL'INSÙ (fano.html)
// ============================================================================
const FANO_I18N = {
  "it": {
    "navColoring": "Libri da colorare",
    "navBooks": "Storie",
    "navCharacters": "Personaggi",
    "fanoMetaTitle": "Fano col naso all'insù | Libro da colorare per bambini",
    "fanoMetaDesc": "Scopri Fano col naso all'insù, il libro da colorare di Marco Salucci con oltre 40 disegni, giochi e attività per bambini dai 5 ai 10 anni alla scoperta della storia e delle tradizioni di Fano.",
    "fanoAuthorBadge": "Di Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "La città di Vitruvio da scoprire e colorare",
    "fanoBadgeFeature": "40+ disegni, giochi e attività creative",
    "fanoAgeHint": "Perfetto per bambini dai 5 ai 10 anni",
    "fanoHeroCta": "Scopri il libro su Amazon",
    "fanoStoryHeading": "Un viaggio speciale alla scoperta di Fano… tra storia, colori e curiosità!",
    "fanoStoryP1": "Con \"Fano col naso all'insù\", i bambini esplorano la città di Vitruvio attraverso 40+ disegni da colorare, giochi e attività creative pensati per imparare divertendosi.",
    "fanoStoryP2": "Dalle antiche origini di Fanum Fortunae, la città fondata dai Romani, fino alle sue tradizioni più amate, i bambini scopriranno una Fano piena di storie: la Basilica di Vitruvio, l'Arco d'Augusto, la Fontana della Fortuna, il Teatro della Fortuna, il porto, il famoso Carnevale, la Moretta fanese e le tradizioni del mare come il gustoso brodetto.",
    "fanoStoryP3": "Tra le pagine prenderanno vita monumenti, personaggi e curiosità che renderanno ogni disegno una piccola avventura da colorare e scoprire.",
    "fanoStoryP4": "Ma questo non è solo un libro da colorare: è un viaggio fatto di curiosità, osservazione e fantasia. I bambini potranno esprimere la propria creatività, allenare concentrazione e manualità e avvicinarsi alla storia e alla cultura di una città unica attraverso il gioco.",
    "fanoInsideTitle": "Dentro il libro",
    "fanoInsideSubtitle": "Più di 40 disegni, giochi e attività per scoprire Fano divertendosi.",
    "fanoColoredTitle": "E tu, come la coloreresti?",
    "fanoColoredSubtitle": "Le stesse illustrazioni possono trasformarsi completamente con la fantasia e i colori di ogni bambino.",
    "fanoKidsTitle": "Perché i bambini lo ameranno",
    "fanoKidsPoint1": "Oltre 40 tra disegni, giochi e attività creative e interattive",
    "fanoKidsPoint2": "Monumenti e simboli di Fano da colorare e personalizzare",
    "fanoKidsPoint3": "Curiosità sorprendenti per imparare divertendosi",
    "fanoParentsTitle": "Perché piace ai genitori",
    "fanoParentsPoint1": "Un'attività creativa senza schermi",
    "fanoParentsPoint2": "Un modo originale per avvicinare i bambini alla storia e al territorio",
    "fanoParentsPoint3": "Un regalo educativo per piccoli esploratori e famiglie in viaggio",
    "fanoOccasionNote": "Per casa, scuola, vacanze o come ricordo speciale di Fano e delle Marche.",
    "fanoReviewsSectionTitle": "Cosa dicono i lettori su Amazon",
    "fanoReviewsSectionSubtitle": "Recensioni reali e verificate da chi ha già scoperto il libro",
    "fanoFinalTitle": "Scopri Fano, colora la sua storia e crea la tua avventura!",
    "fanoFinalCta": "Scopri il libro su Amazon"
  },
  "en": {
    "navColoring": "Coloring Books",
    "navBooks": "Stories",
    "navCharacters": "Characters",
    "fanoMetaTitle": "Fano with Your Head in the Clouds | Kids Coloring Book",
    "fanoMetaDesc": "Discover Fano with Your Head in the Clouds by Marco Salucci: a coloring and activity book with 40+ drawings and games for children aged 5-10 exploring the history and traditions of Fano.",
    "fanoAuthorBadge": "By Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "Vitruvius' city to discover and color",
    "fanoBadgeFeature": "40+ drawings, games & creative activities",
    "fanoAgeHint": "Perfect for children aged 5 to 10",
    "fanoHeroCta": "Discover the book on Amazon",
    "fanoStoryHeading": "A special journey to discover Fano… through history, colors, and curiosity!",
    "fanoStoryP1": "With \"Fano col naso all'insù\", children explore Vitruvius' city through 40+ coloring pages, games, and creative activities designed to learn while having fun.",
    "fanoStoryP2": "From the ancient roots of Fanum Fortunae, the city founded by the Romans, to its most beloved traditions, kids will discover a Fano full of stories: the Basilica of Vitruvius, the Arch of Augustus, the Fountain of Fortune, the Teatro della Fortuna, the harbor, the famous Carnival, the Moretta fanese, and seafaring traditions like the flavorful brodetto.",
    "fanoStoryP3": "Monuments, characters, and surprising curiosities come to life across the pages, turning every drawing into a little adventure to color and uncover.",
    "fanoStoryP4": "More than just a coloring book, this is an inspiring journey of curiosity, observation, and imagination. Children can express their creativity, train concentration and fine motor skills, and connect with the history and culture of a unique Italian city through play.",
    "fanoInsideTitle": "Inside the Book",
    "fanoInsideSubtitle": "Over 40 drawings, puzzles, and activities to discover Fano while having fun.",
    "fanoColoredTitle": "And how would you color it?",
    "fanoColoredSubtitle": "The very same illustrations can transform completely through every child's imagination and choice of colors.",
    "fanoKidsTitle": "Why Kids Will Love It",
    "fanoKidsPoint1": "Over 40 drawings, interactive games, and creative activities",
    "fanoKidsPoint2": "Fano's iconic monuments and symbols to color and personalize",
    "fanoKidsPoint3": "Surprising facts to learn and explore while playing",
    "fanoParentsTitle": "Why Parents Love It",
    "fanoParentsPoint1": "A screen-free creative activity",
    "fanoParentsPoint2": "An inspiring way to introduce children to history and local culture",
    "fanoParentsPoint3": "An educational gift for little explorers and traveling families",
    "fanoOccasionNote": "For home, school, vacations, or as a special keepsake of Fano and the Marche region.",
    "fanoReviewsSectionTitle": "What Readers Say on Amazon",
    "fanoReviewsSectionSubtitle": "Authentic, verified reviews from families who already explored the book",
    "fanoFinalTitle": "Discover Fano, color its history, and start your adventure!",
    "fanoFinalCta": "Discover the book on Amazon"
  },
  "de": {
    "navColoring": "Malbücher",
    "navBooks": "Geschichten",
    "navCharacters": "Figuren",
    "fanoMetaTitle": "Fano mit erhobenem Kopf | Malbuch für Kinder",
    "fanoMetaDesc": "Entdecke Fano mit erhobenem Kopf von Marco Salucci: ein Mal- und Mitmachbuch mit über 40 Zeichnungen, Spielen und Aktivitäten für Kinder von 5 bis 10 Jahren.",
    "fanoAuthorBadge": "Von Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "Die Stadt von Vitruv zum Entdecken und Ausmalen",
    "fanoBadgeFeature": "40+ Zeichnungen, Rätsel und kreative Aktivitäten",
    "fanoAgeHint": "Ideal für Kinder von 5 bis 10 Jahren",
    "fanoHeroCta": "Das Buch auf Amazon entdecken",
    "fanoStoryHeading": "Eine besondere Reise nach Fano… voller Geschichte, Farben und Entdeckungen!",
    "fanoStoryP1": "Mit \"Fano col naso all'insù\" erkunden Kinder die Stadt von Vitruv durch mehr als 40 Malvorlagen, Spiele und kreative Aufgaben, die spielerisches Lernen fördern.",
    "fanoStoryP2": "Von den antiken Ursprüngen von Fanum Fortunae bis zu den lebendigen Traditionen entdecken Kinder ein faszinierendes Fano: die Basilika von Vitruv, den Augustusbogen, den Glücksbrunnen, das Teatro della Fortuna, den Hafen, den berühmten Karneval, die Moretta fanese und Meeresköstlichkeiten wie den Brodetto.",
    "fanoStoryP3": "Bauwerke, Persönlichkeiten und spannende Besonderheiten erwachen auf den Seiten zum Leben und verwandeln jede Zeichnung in ein kleines Abenteuer.",
    "fanoStoryP4": "Dieses Buch ist weit mehr als ein Malbuch: Es ist eine Reise voller Neugier und Fantasie. Kinder entfalten ihre Kreativität, stärken Konzentration und Feinmotorik und lernen die Kultur einer geschichtsträchtigen Stadt spielerisch kennen.",
    "fanoInsideTitle": "Blick ins Buch",
    "fanoInsideSubtitle": "Über 40 Zeichnungen, Spiele und Aktivitäten, um Fano mit Freude zu entdecken.",
    "fanoColoredTitle": "Und wie würdest du es ausmalen?",
    "fanoColoredSubtitle": "Die gleichen Zeichnungen verwandeln sich durch die Fantasie jedes Kindes in einzigartige Kunstwerke.",
    "fanoKidsTitle": "Warum Kinder es lieben werden",
    "fanoKidsPoint1": "Über 40 Zeichnungen, interaktive Spiele und kreative Aufgaben",
    "fanoKidsPoint2": "Wahrzeichen und Symbole von Fano zum Ausmalen und Gestalten",
    "fanoKidsPoint3": "Spannende Anekdoten und Wissenswertes zum spielerischen Lernen",
    "fanoParentsTitle": "Warum Eltern begeistert sind",
    "fanoParentsPoint1": "Kreative Beschäftigung ganz ohne Bildschirme",
    "fanoParentsPoint2": "Eine wunderbare Möglichkeit, Kinder für Geschichte und Kultur zu begeistern",
    "fanoParentsPoint3": "Ein lehrreiches Geschenk für kleine Entdecker und reisende Familien",
    "fanoOccasionNote": "Für Zuhause, die Schule, den Urlaub oder als besondere Erinnerung an Fano und die Marken.",
    "fanoReviewsSectionTitle": "Was Leser auf Amazon sagen",
    "fanoReviewsSectionSubtitle": "Echte und verifizierte Bewertungen von Familien, die das Buch bereits entdeckt haben",
    "fanoFinalTitle": "Entdecke Fano, male seine Geschichte aus und erlebe dein Abenteuer!",
    "fanoFinalCta": "Das Buch auf Amazon entdecken"
  },
  "fr": {
    "navColoring": "Livres de coloriage",
    "navBooks": "Histoires",
    "navCharacters": "Personnages",
    "fanoMetaTitle": "Fano le nez en l'air | Livre de coloriage pour enfants",
    "fanoMetaDesc": "Découvrez Fano le nez en l'air par Marco Salucci : un livre de coloriage et d'activités avec plus de 40 dessins et jeux pour enfants de 5 à 10 ans.",
    "fanoAuthorBadge": "Par Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "La cité de Vitruve à découvrir et à colorier",
    "fanoBadgeFeature": "40+ dessins, jeux et activités créatives",
    "fanoAgeHint": "Parfait pour les enfants de 5 à 10 ans",
    "fanoHeroCta": "Découvrir le livre sur Amazon",
    "fanoStoryHeading": "Un voyage exceptionnel à Fano… entre histoire, couleurs et curiosités !",
    "fanoStoryP1": "Avec \"Fano col naso all'insù\", les enfants explorent la cité de Vitruve à travers plus de 40 coloriages, jeux et activités créatives conçus pour apprendre en s'amusant.",
    "fanoStoryP2": "Des origines antiques de Fanum Fortunae, fondée par les Romains, à ses traditions emblématiques, les enfants découvrent un Fano riche en histoires : la Basilique de Vitruve, l'Arc d'Auguste, la Fontaine de la Fortune, le Teatro della Fortuna, le port, le célèbre Carnaval, la Moretta fanese et la tradition du brodetto.",
    "fanoStoryP3": "Au fil des pages, monuments, personnages et anecdotes prennent vie, transformant chaque dessin en une belle aventure à colorier.",
    "fanoStoryP4": "Bien plus qu'un simple livre de coloriage, c'est une invitation à la curiosité, à l'observation et à l'imagination. Les enfants développent leur créativité, exercent leur concentration et découvrent la culture d'une ville unique par le jeu.",
    "fanoInsideTitle": "Dans le livre",
    "fanoInsideSubtitle": "Plus de 40 dessins, énigmes et activités pour explorer Fano dans la joie.",
    "fanoColoredTitle": "Et toi, comment le colorierais-tu ?",
    "fanoColoredSubtitle": "Les mêmes illustrations se métamorphosent au gré de l'imagination et des couleurs de chaque enfant.",
    "fanoKidsTitle": "Pourquoi les enfants vont l'adorer",
    "fanoKidsPoint1": "Plus de 40 dessins, jeux interactifs et activités créatives",
    "fanoKidsPoint2": "Monuments et symboles de Fano à colorier et personnaliser",
    "fanoKidsPoint3": "Curiosités captivantes pour apprendre en s'amusant",
    "fanoParentsTitle": "Pourquoi les parents l'apprécient",
    "fanoParentsPoint1": "Une activité créative et bienfaisante loin des écrans",
    "fanoParentsPoint2": "Une façon originale de sensibiliser les enfants à l'histoire et au patrimoine",
    "fanoParentsPoint3": "Un cadeau éducatif idéal pour les petits explorateurs et les voyages en famille",
    "fanoOccasionNote": "Pour la maison, l'école, les vacances ou comme précieux souvenir de Fano et des Marches.",
    "fanoReviewsSectionTitle": "Les avis des lecteurs sur Amazon",
    "fanoReviewsSectionSubtitle": "Commentaires réels et vérifiés de parents qui ont partagé le livre",
    "fanoFinalTitle": "Explore Fano, colorie son histoire et crée ta propre aventure !",
    "fanoFinalCta": "Découvrir le livre sur Amazon"
  },
  "es": {
    "navColoring": "Libros para colorear",
    "navBooks": "Cuentos",
    "navCharacters": "Personajes",
    "fanoMetaTitle": "Fano con la nariz hacia arriba | Libro para colorear infantil",
    "fanoMetaDesc": "Descubre Fano con la nariz hacia arriba de Marco Salucci: más de 40 dibujos, juegos y actividades para niños de 5 a 10 años para descubrir la historia de Fano.",
    "fanoAuthorBadge": "Por Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "La ciudad de Vitruvio para descubrir y colorear",
    "fanoBadgeFeature": "40+ dibujos, juegos y actividades creativas",
    "fanoAgeHint": "Ideal para niños de 5 a 10 años",
    "fanoHeroCta": "Descubrir el libro en Amazon",
    "fanoStoryHeading": "¡Un viaje especial para descubrir Fano… entre historia, colores y curiosidades!",
    "fanoStoryP1": "Con \"Fano col naso all'insù\", los niños exploran la ciudad de Vitruvio a través de más de 40 dibujos para colorear, juegos y actividades creativas diseñadas para aprender jugando.",
    "fanoStoryP2": "Desde los antiguos orígenes de Fanum Fortunae, fundada por los romanos, hasta sus tradiciones más queridas, los niños descubrirán una Fano llena de encanto: la Basílica de Vitruvio, el Arco de Augusto, la Fuente de la Fortuna, el Teatro de la Fortuna, el puerto, el famoso Carnaval, la Moretta fanese y las tradiciones marineras como el delicioso brodetto.",
    "fanoStoryP3": "Monumentos, personajes y curiosidades cobran vida en cada página, haciendo de cada ilustración una pequeña aventura para colorear y explorar.",
    "fanoStoryP4": "No es solo un libro para colorear: es una experiencia de curiosidad, observación y creatividad. Los niños podrán ejercitar su motricidad fina, concentración y acercarse al patrimonio cultural de una forma lúdica y cercana.",
    "fanoInsideTitle": "Dentro del libro",
    "fanoInsideSubtitle": "Más de 40 dibujos, acertijos y actividades para descubrir Fano divirtiéndose.",
    "fanoColoredTitle": "¿Y tú, cómo lo colorearías?",
    "fanoColoredSubtitle": "Las mismas ilustraciones se transforman por completo con la imaginación y los colores de cada niño.",
    "fanoKidsTitle": "Por qué les encantará a los niños",
    "fanoKidsPoint1": "Más de 40 dibujos, juegos interactivos y actividades creativas",
    "fanoKidsPoint2": "Monumentos y símbolos de Fano para colorear y personalizar",
    "fanoKidsPoint3": "Curiosidades fascinantes para aprender mientras se divierten",
    "fanoParentsTitle": "Por qué convence a los padres",
    "fanoParentsPoint1": "Una actividad creativa y tranquila sin pantallas",
    "fanoParentsPoint2": "Una forma enriquecedora de acercar a los pequeños a la historia y el territorio",
    "fanoParentsPoint3": "Un regalo educativo para pequeños viajeros y familias curiosas",
    "fanoOccasionNote": "Para casa, el colegio, vacaciones o como recuerdo especial de Fano y las Marcas.",
    "fanoReviewsSectionTitle": "Lo que opinan los lectores en Amazon",
    "fanoReviewsSectionSubtitle": "Reseñas reales y verificadas de familias que ya disfrutan del libro",
    "fanoFinalTitle": "¡Descubre Fano, colorea su historia y vive tu propia aventura!",
    "fanoFinalCta": "Descubrir el libro en Amazon"
  },
  "nl": {
    "navColoring": "Kleurboeken",
    "navBooks": "Verhalen",
    "navCharacters": "Personages",
    "fanoMetaTitle": "Fano met je neus in de lucht | Kleurboek voor kinderen",
    "fanoMetaDesc": "Ontdek Fano met je neus in de lucht van Marco Salucci: een kleur- en doeboek met meer dan 40 tekeningen en spelletjes voor kinderen van 5 tot 10 jaar.",
    "fanoAuthorBadge": "Door Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "De stad van Vitruvius om te ontdekken en in te kleuren",
    "fanoBadgeFeature": "40+ tekeningen, spelletjes & creatieve activiteiten",
    "fanoAgeHint": "Perfect voor kinderen van 5 tot 10 jaar",
    "fanoHeroCta": "Ontdek het boek op Amazon",
    "fanoStoryHeading": "Een bijzondere reis naar Fano… vol geschiedenis, kleuren en ontdekkingen!",
    "fanoStoryP1": "Met \"Fano col naso all'insù\" verkennen kinderen de stad van Vitruvius via meer dan 40 kleurplaten, puzzels en creatieve opdrachten om spelenderwijs te leren.",
    "fanoStoryP2": "Van de Romeinse oorsprong van Fanum Fortunae tot de levendige tradities ontdekken kinderen een stad vol verhalen: de Basiliek van Vitruvius, de Boog van Augustus, de Fontein van Fortuna, het Teatro della Fortuna, de haven, het beroemde Carnaval, de Moretta fanese en lokale zeetradities zoals brodetto.",
    "fanoStoryP3": "Monumenten, historische figuren en leuke weetjes komen tot leven, waardoor elke plaat een nieuw avontuur wordt om in te kleuren.",
    "fanoStoryP4": "Dit is niet zomaar een kleurboek: het is een ontdekkingsreis voor de verbeelding. Kinderen ontwikkelen hun creativiteit en concentratie en maken op een speelse manier kennis met cultuur en geschiedenis.",
    "fanoInsideTitle": "In het boek",
    "fanoInsideSubtitle": "Ruim 40 tekeningen, raadsels en doevoorbeelden om Fano met plezier te ontdekken.",
    "fanoColoredTitle": "En hoe zou jij het inkleuren?",
    "fanoColoredSubtitle": "Dezelfde illustraties komen geheel tot leven dankzij de fantasie en kleuren van ieder kind.",
    "fanoKidsTitle": "Waarom kinderen er dol op zijn",
    "fanoKidsPoint1": "Meer dan 40 tekeningen, interactieve spelletjes en creatieve opdrachten",
    "fanoKidsPoint2": "Bekende monumenten en symbolen van Fano om zelf in te kleuren",
    "fanoKidsPoint3": "Verrassende weetjes om al spelend meer te leren",
    "fanoParentsTitle": "Waarom ouders het waarderen",
    "fanoParentsPoint1": "Een creatieve activiteit zonder beeldschermen",
    "fanoParentsPoint2": "Een inspirerende manier om kinderen te betrekken bij geschiedenis en erfgoed",
    "fanoParentsPoint3": "Een leerzaam cadeau voor jonge ontdekkers en reizende gezinnen",
    "fanoOccasionNote": "Voor thuis, op school, op vakantie of als bijzondere herinnering aan Fano en de Marken.",
    "fanoReviewsSectionTitle": "Wat lezers zeggen op Amazon",
    "fanoReviewsSectionSubtitle": "Echte en geverifieerde recensies van ouders die het boek al ontdekten",
    "fanoFinalTitle": "Ontdek Fano, kleur haar geschiedenis in en beleef je eigen avontuur!",
    "fanoFinalCta": "Ontdek het boek op Amazon"
  },
  "pl": {
    "navColoring": "Kolorowanki",
    "navBooks": "Opowieści",
    "navCharacters": "Bohaterowie",
    "fanoMetaTitle": "Fano z zadartym nosem | Książka do kolorowania dla dzieci",
    "fanoMetaDesc": "Odkryj Fano z zadartym nosem autorstwa Marco Salucciego: kolorowanka z ponad 40 rysunkami, grami i zadaniami dla dzieci w wieku 5-10 lat.",
    "fanoAuthorBadge": "Autor: Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "Miasto Witruwiusza do odkrywania i kolorowania",
    "fanoBadgeFeature": "40+ rysunków, gier i kreatywnych zadań",
    "fanoAgeHint": "Idealne dla dzieci w wieku 5–10 lat",
    "fanoHeroCta": "Odkryj książkę na Amazonie",
    "fanoStoryHeading": "Niezwykła podróż po Fano… pełna historii, kolorów i ciekawostek!",
    "fanoStoryP1": "Dzięki książce \"Fano col naso all'insù\" dzieci poznają miasto Witruwiusza przez ponad 40 kolorowanek, zagadek i zabaw edukacyjnych łączących naukę z frajdą.",
    "fanoStoryP2": "Od starożytnych początków rzymskiego Fanum Fortunae po barwne tradycje, mali czytelnicy odkrywają urokliwe Fano: Bazylikę Witruwiusza, Łuk Augusta, Fontannę Fortuny, Teatro della Fortuna, port, słynny Karnawał, Morettę fanese i morskie przysmaki takie jak brodetto.",
    "fanoStoryP3": "Zabytki, postacie i fascynujące ciekawostki ożywają na stronach, zamieniając każdy rysunek w małą przygodę do pokolorowania.",
    "fanoStoryP4": "To coś więcej niż zwykła kolorowanka: to podróż rozwijająca spostrzegawczość, kreatywność i zdolności manualne, przybliżająca dzieciom kulturę w lekki, zabawowy sposób.",
    "fanoInsideTitle": "W środku książki",
    "fanoInsideSubtitle": "Ponad 40 rysunków, łamigłówek i zabaw do wesołego odkrywania Fano.",
    "fanoColoredTitle": "A Ty jak byś to pokolorował?",
    "fanoColoredSubtitle": "Te same ilustracje nabierają zupełnie nowego wyrazu dzięki wyobraźni i kolorom każdego dziecka.",
    "fanoKidsTitle": "Dlaczego dzieci ją pokochają",
    "fanoKidsPoint1": "Ponad 40 rysunków, gier i angażujących zadań twórczych",
    "fanoKidsPoint2": "Zabytki i symbole Fano do samodzielnego pokolorowania",
    "fanoKidsPoint3": "Ciekawe fakty pozwalające uczyć się przez zabawę",
    "fanoParentsTitle": "Dlaczego rodzice ją docenią",
    "fanoParentsPoint1": "Wartościowa i kreatywna zabawa z dala od ekranów",
    "fanoParentsPoint2": "Oryginalny sposób na zainteresowanie dzieci historią i podróżami",
    "fanoParentsPoint3": "Mądry prezent dla małych odkrywców i rodzin w podróży",
    "fanoOccasionNote": "Do domu, szkoły, na wakacje lub jako piękna pamiątka z Fano i regionu Marche.",
    "fanoReviewsSectionTitle": "Co mówią czytelnicy na Amazonie",
    "fanoReviewsSectionSubtitle": "Autentyczne, zweryfikowane opinie rodzin, które poznały tę książkę",
    "fanoFinalTitle": "Odkryj Fano, pokoloruj jego historię i twórz własne przygody!",
    "fanoFinalCta": "Odkryj książkę na Amazonie"
  },
  "sv": {
    "navColoring": "Målarböcker",
    "navBooks": "Berättelser",
    "navCharacters": "Karaktärer",
    "fanoMetaTitle": "Fano med näsan i vädret | Målarbok för barn",
    "fanoMetaDesc": "Upptäck Fano med näsan i vädret av Marco Salucci: en målar- och aktivitetsbok med över 40 teckningar och lekar för barn i åldern 5–10 år.",
    "fanoAuthorBadge": "Av Marco Salucci",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "Vitruvius stad att upptäcka och färglägga",
    "fanoBadgeFeature": "40+ teckningar, lekar och kreativa pyssel",
    "fanoAgeHint": "Perfekt för barn mellan 5 och 10 år",
    "fanoHeroCta": "Upptäck boken på Amazon",
    "fanoStoryHeading": "En spännande resa till Fano… genom historia, färger och nyfikenhet!",
    "fanoStoryP1": "Med \"Fano col naso all'insù\" utforskar barn Vitruvius stad genom över 40 målarbilder, gåtor och kreativa uppgifter utformade för att lära genom lek.",
    "fanoStoryP2": "Från de romerska rötterna i Fanum Fortunae till stadens mest älskade traditioner upptäcker barnen ett Fano rikt på berättelser: Vitruvius basilika, Augustusbågen, Fortunafontänen, Teatro della Fortuna, hamnen, den berömda karnevalen, Moretta fanese och havets läckerheter som brodetto.",
    "fanoStoryP3": "Monument, figurer och spännande fakta vaknar till liv på sidorna och förvandlar varje teckning till ett litet äventyr att färglägga.",
    "fanoStoryP4": "Det här är mer än bara en målarbok: det är en resa fylld av upptäckarglädje och fantasi. Barnen får uttrycka sin kreativitet, öva koncentration och bekanta sig med italiensk historia på ett roligt sätt.",
    "fanoInsideTitle": "I boken",
    "fanoInsideSubtitle": "Över 40 teckningar, pyssel och aktiviteter för att upptäcka Fano med glädje.",
    "fanoColoredTitle": "Och hur skulle du färglägga den?",
    "fanoColoredSubtitle": "Samma illustrationer kan förvandlas helt genom varje barns unika fantasi och färgval.",
    "fanoKidsTitle": "Varför barnen älskar den",
    "fanoKidsPoint1": "Över 40 målarbilder, interaktiva lekar och kreativa övningar",
    "fanoKidsPoint2": "Fanos kända monument och symboler att färglägga och göra personliga",
    "fanoKidsPoint3": "Roliga fakta att upptäcka och lära sig under tiden",
    "fanoParentsTitle": "Varför föräldrar uppskattar den",
    "fanoParentsPoint1": "Ett skärmfritt och kreativt nöje",
    "fanoParentsPoint2": "Ett inspirerande sätt att väcka intresse för historia och kultur",
    "fanoParentsPoint3": "En pedagogisk present till små upptäckare och resande familjer",
    "fanoOccasionNote": "För hemmet, skolan, semestern eller som ett fint minne från Fano och Marche.",
    "fanoReviewsSectionTitle": "Vad läsarna säger på Amazon",
    "fanoReviewsSectionSubtitle": "Äkta och verifierade recensioner från familjer som redan läst och färglagt boken",
    "fanoFinalTitle": "Upptäck Fano, färglägg dess historia och skapa ditt äventyr!",
    "fanoFinalCta": "Upptäck boken på Amazon"
  },
  "ja": {
    "navColoring": "ぬりえ絵本",
    "navBooks": "お話",
    "navCharacters": "キャラクター",
    "fanoMetaTitle": "見上げてごらんファーノの街 | 子ども向けぬりえ＆アクティビティブック",
    "fanoMetaDesc": "マルコ・サルッチによる『見上げてごらんファーノの街』：5〜10歳のお子様向けの40以上のぬりえ、クイズ、アクティビティが詰まった絵本。",
    "fanoAuthorBadge": "作：マルコ・サルッチ",
    "fanoTitle": "Fano col naso all'insù",
    "fanoSubtitle": "ウィトルウィウスの街を発見して彩ろう",
    "fanoBadgeFeature": "40以上のぬりえ・クイズ・創作アクティビティ",
    "fanoAgeHint": "5歳から10歳のお子様にぴったり",
    "fanoHeroCta": "Amazonで本を見る",
    "fanoStoryHeading": "歴史と色彩、知的好奇心あふれるファーノへの特別な旅！",
    "fanoStoryP1": "『Fano col naso all'insù』は、40以上のぬりえやクイズ、楽しいアクティビティを通じて、子どもたちがウィトルウィウスゆかりの街を楽しく学べる一冊です。",
    "fanoStoryP2": "古代ローマ人が築いた「ファヌム・フォルトゥナエ」から受け継がれる伝統まで、ウィトルウィウスのバシリカ、アウグストゥスの門、フォルトゥナの噴水、劇場、港、有名なカーニバルや郷土の味など、ファーノの豊かな物語に出会えます。",
    "fanoStoryP3": "歴史的建造物や街のシンボルがページの中で生き生きとよみがえり、1ページごとに新しい発見と冒険が広がります。",
    "fanoStoryP4": "ただ塗るだけでなく、観察力や想像力、集中力を育む知育ブックです。画面から離れて、遊びながら豊かな歴史と文化に親しむことができます。",
    "fanoInsideTitle": "本の中をのぞいてみよう",
    "fanoInsideSubtitle": "40以上のぬりえやクイズで、ファーノの街を楽しく発見。",
    "fanoColoredTitle": "きみならどんな色でぬってみる？",
    "fanoColoredSubtitle": "同じ線画でも、子どもたち一人ひとりの自由な感性と色彩でまったく新しい世界に生まれ変わります。",
    "fanoKidsTitle": "子どもたちに喜ばれる理由",
    "fanoKidsPoint1": "40以上のぬりえ、知育パズル、創作アクティビティ",
    "fanoKidsPoint2": "ファーノの有名な名所やシンボルを自分だけの色で彩れる",
    "fanoKidsPoint3": "遊びながら楽しく学べる驚きの豆知識が満載",
    "fanoParentsTitle": "保護者の方におすすめする理由",
    "fanoParentsPoint1": "スクリーンから離れてじっくり取り組める創造的な時間",
    "fanoParentsPoint2": "歴史や地域文化への興味を自然に育む教育的アプローチ",
    "fanoParentsPoint3": "小さな冒険家や旅好きなご家族への素敵なプレゼント",
    "fanoOccasionNote": "ご家庭や学校、旅の思い出、ファーノやマルケ州の記念に。",
    "fanoReviewsSectionTitle": "Amazonカスタマーレビュー",
    "fanoReviewsSectionSubtitle": "実際に本を楽しんでいただいたご家族からの本物の声",
    "fanoFinalTitle": "ファーノの街に出会い、歴史を彩り、きみだけの冒険を始めよう！",
    "fanoFinalCta": "Amazonで本を見る"
  }
};

Object.keys(FANO_I18N).forEach(lang => {
  if (I18N[lang]) {
    Object.assign(I18N[lang], FANO_I18N[lang]);
  }
});

function getFanoAmazonUrl(lang) {
  const marketMap = {
    it: 'https://www.amazon.it/dp/B0HD2X6HVJ',
    en: 'https://www.amazon.com/dp/B0HD2X6HVJ',
    de: 'https://www.amazon.de/dp/B0HD2X6HVJ',
    fr: 'https://www.amazon.fr/dp/B0HD2X6HVJ',
    es: 'https://www.amazon.es/dp/B0HD2X6HVJ',
    nl: 'https://www.amazon.nl/dp/B0HD2X6HVJ',
    pl: 'https://www.amazon.pl/dp/B0HD2X6HVJ',
    sv: 'https://www.amazon.se/dp/B0HD2X6HVJ',
    ja: 'https://www.amazon.co.jp/dp/B0HD2X6HVJ'
  };
  return marketMap[lang] || marketMap.it;
}


// ============================================================================
// STATO DELL'APPLICAZIONE
// ============================================================================
let currentLanguage = 'it';           // Lingua interfaccia del sito
let currentBookLanguage = 'it';       // Filtro secondario lingua libri ('it', 'en', 'all')
let userDetectedMarket = 'it';        // Marketplace predefinito per il visitatore
const selectedMarketState = {};       // Stato mercato per ciascun libro { [bookId]: 'us' }
let activePreviewBook = null;
let currentPreviewIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  currentLanguage = detectInitialLanguage();
  
  const savedMarket = localStorage.getItem('csabooks_user_market');
  if (savedMarket && AMAZON_MARKETS[savedMarket]) {
    userDetectedMarket = savedMarket;
  } else {
    userDetectedMarket = getDefaultMarketForLanguage(currentLanguage) || detectUserMarket();
  }

  if (Array.isArray(BOOKS)) {
    BOOKS.forEach(b => {
      selectedMarketState[b.id] = userDetectedMarket;
    });
  }
  selectedMarketState['fano'] = userDetectedMarket;

  // Allinea il filtro lingua libri iniziale (se l'utente è su sito italiano -> IT, altrimenti EN)
  const savedBookLang = localStorage.getItem('csabooks_book_lang');
  if (savedBookLang && (savedBookLang === 'it' || savedBookLang === 'en' || savedBookLang === 'all')) {
    currentBookLanguage = savedBookLang;
  } else {
    currentBookLanguage = (currentLanguage === 'it') ? 'it' : 'en';
  }

  applyLanguage(currentLanguage);
  initMobileLanguageDropdown();
  initHeroCarousel();
  initReviewsSlider();
  initAuthorCarousel();
  initFanoSliders();
  handleDirectBookDeepLink();
  initGlobalDropdownCloser();
  initSampleModalEvents();
});

/* ==========================================================================
   1. RILEVAMENTO LINGUA & MARKETPLACE GEOGRAFICO AUTOMATICO
   ========================================================================== */

function getDefaultMarketForLanguage(lang) {
  const marketMap = {
    it: 'it',
    en: 'us',
    de: 'de',
    fr: 'fr',
    es: 'es',
    nl: 'nl',
    pl: 'pl',
    sv: 'se',
    se: 'se',
    ja: 'jp',
    jp: 'jp'
  };
  return marketMap[lang] || 'us';
}

function detectInitialLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = (urlParams.get('lang') || '').toLowerCase();
  if (paramLang && I18N[paramLang]) {
    return paramLang;
  }

  try {
    const savedLang = localStorage.getItem('csabooks_lang');
    if (savedLang && I18N[savedLang]) {
      return savedLang;
    }
  } catch (e) {}

  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const raw of browserLangs) {
    if (typeof raw !== 'string') continue;
    const lower = raw.toLowerCase().trim();

    if (lower.startsWith('it')) return 'it';
    if (lower.startsWith('de')) return 'de';
    if (lower.startsWith('fr')) return 'fr';
    if (lower.startsWith('es')) return 'es';
    if (lower.startsWith('nl')) return 'nl';
    if (lower.startsWith('pl')) return 'pl';
    if (lower.startsWith('sv') || lower.startsWith('se')) return 'sv';
    if (lower.startsWith('ja') || lower.startsWith('jp')) return 'ja';
    if (lower.startsWith('en')) return 'en';
  }

  return 'en';
}

function detectUserMarket() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramMarket = (urlParams.get('market') || urlParams.get('store') || '').toLowerCase();
  if (paramMarket && AMAZON_MARKETS[paramMarket]) return paramMarket;

  try {
    const saved = localStorage.getItem('csabooks_user_market');
    if (saved && AMAZON_MARKETS[saved]) return saved;
  } catch (e) {}

  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const raw of browserLangs) {
    if (!raw || typeof raw !== 'string') continue;
    const l = raw.toLowerCase().trim();

    if (l === 'it' || l.startsWith('it-')) return 'it';
    if (l === 'en-gb') return 'uk';
    if (l === 'en-ie') return 'ie';
    if (l === 'en-ca' || l.startsWith('fr-ca')) return 'ca';
    if (l === 'en-au') return 'au';
    if (l === 'de' || l.startsWith('de-')) return 'de';
    if (l.startsWith('fr-be') || l.startsWith('nl-be')) return 'be';
    if (l === 'fr' || l.startsWith('fr-')) return 'fr';
    if (l === 'es-es' || l.startsWith('ca-es') || l.startsWith('gl-es') || l.startsWith('eu-es')) return 'es';
    if (l === 'nl' || l.startsWith('nl-')) return 'nl';
    if (l === 'pl' || l.startsWith('pl-')) return 'pl';
    if (l === 'sv' || l.startsWith('sv-') || l.startsWith('se-')) return 'se';
    if (l === 'ja' || l.startsWith('ja-')) return 'jp';
    if (l === 'en-us' || l === 'en') return 'us';
  }

  // Timezone check
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Europe/Rome')) return 'it';
    if (tz.startsWith('Europe/London')) return 'uk';
    if (tz.startsWith('Europe/Berlin')) return 'de';
    if (tz.startsWith('Europe/Paris')) return 'fr';
    if (tz.startsWith('Europe/Madrid')) return 'es';
    if (tz.startsWith('Europe/Amsterdam')) return 'nl';
    if (tz.startsWith('Europe/Warsaw')) return 'pl';
    if (tz.startsWith('Europe/Stockholm')) return 'se';
    if (tz.startsWith('Europe/Brussels')) return 'be';
    if (tz.startsWith('Europe/Dublin')) return 'ie';
    if (tz.startsWith('Asia/Tokyo')) return 'jp';
    if (tz.startsWith('Australia/')) return 'au';
    if (tz.startsWith('America/Toronto') || tz.startsWith('America/Vancouver')) return 'ca';
    if (tz.startsWith('America/')) return 'us';
  } catch (e) {}

  return 'us';
}

window.setLanguage = function(langCode) {
  if (!I18N[langCode]) return;
  currentLanguage = langCode;
  try {
    localStorage.setItem('csabooks_lang', langCode);
  } catch (e) {}

  // Sincronizza automaticamente il marketplace di default con la lingua selezionata
  const marketForLang = getDefaultMarketForLanguage(langCode);
  userDetectedMarket = marketForLang;
  try {
    localStorage.setItem('csabooks_user_market', marketForLang);
  } catch (e) {}

  // Aggiorna lo store preselezionato per tutti i libri
  if (Array.isArray(BOOKS)) {
    BOOKS.forEach(b => {
      selectedMarketState[b.id] = marketForLang;
    });
  }
  selectedMarketState['fano'] = marketForLang;

  const url = new URL(window.location);
  url.searchParams.set('lang', langCode);
  window.history.replaceState({}, '', url);

  applyLanguage(langCode);
};

window.setBookLanguageFilter = function(filterCode) {
  if (filterCode !== 'it' && filterCode !== 'en' && filterCode !== 'all') return;
  currentBookLanguage = filterCode;
  try {
    localStorage.setItem('csabooks_book_lang', filterCode);
  } catch (e) {}

  updateBookFilterButtons();
  renderBookCatalog(currentLanguage);
};

/* ==========================================================================
   2. APPLICAZIONE TESTI E LOGO IN BASE ALLA LINGUA DEL SITO
   ========================================================================== */

function applyLanguage(lang) {
  const strings = I18N[lang] || I18N.it;

  // Aggiorna bottoni lingua interfaccia (sia barra desktop che dropdown mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = (btn.dataset.lang === lang);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    if (btn.getAttribute('role') === 'option') {
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    }
  });

  // Aggiorna trigger selettore lingua mobile
  const mobileFlag = document.getElementById('lang-mobile-selected-flag');
  const mobileCode = document.getElementById('lang-mobile-selected-code');
  const LANG_FLAGS = {
    it: 'https://flagcdn.com/24x18/it.png',
    en: 'https://flagcdn.com/24x18/gb.png',
    de: 'https://flagcdn.com/24x18/de.png',
    fr: 'https://flagcdn.com/24x18/fr.png',
    es: 'https://flagcdn.com/24x18/es.png',
    nl: 'https://flagcdn.com/24x18/nl.png',
    pl: 'https://flagcdn.com/24x18/pl.png',
    sv: 'https://flagcdn.com/24x18/se.png',
    ja: 'https://flagcdn.com/24x18/jp.png'
  };
  const LANG_CODES = {
    it: 'IT', en: 'EN', de: 'DE', fr: 'FR', es: 'ES', nl: 'NL', pl: 'PL', sv: 'SE', ja: 'JP'
  };
  if (mobileFlag && LANG_FLAGS[lang]) {
    mobileFlag.src = LANG_FLAGS[lang];
    mobileFlag.alt = (LANG_CODES[lang] || lang).toUpperCase();
  }
  if (mobileCode && LANG_CODES[lang]) {
    mobileCode.textContent = LANG_CODES[lang];
  }

  // Chiudi dropdown mobile se aperto
  const langMobileDropdown = document.getElementById('lang-mobile-dropdown');
  const langMobileSelect = document.getElementById('lang-mobile-select');
  const langMobileTrigger = document.getElementById('lang-mobile-trigger');
  if (langMobileDropdown) langMobileDropdown.classList.remove('show');
  if (langMobileSelect) langMobileSelect.classList.remove('open');
  if (langMobileTrigger) langMobileTrigger.setAttribute('aria-expanded', 'false');

  // Aggiorna logo collana in base alla lingua (Italiano vs Inglese/Internazionale)
  const logoImg = document.getElementById('series-logo-img');
  if (logoImg) {
    if (lang === 'it') {
      logoImg.src = 'assets/construction-site-adventures/Logo.ITA.v2.png';
      logoImg.alt = 'Le Avventure del Cantiere - Logo Collana';
    } else {
      logoImg.src = 'assets/construction-site-adventures/Logo.ENG.v2.png';
      logoImg.alt = 'Construction Site Adventures - Series Logo';
    }
  }

  // Hero Banner Localizzato
  setText('hero-title', strings.heroTitle);
  setText('hero-subtitle', strings.heroSubtitle);
  const heroBannerImg = document.getElementById('hero-banner-img');
  if (heroBannerImg && strings.heroBannerAlt) {
    heroBannerImg.alt = strings.heroBannerAlt;
  }
  updateHeroCarouselTranslations(lang);
  updateReviewsTranslations(lang);

  // Testi Filtri Libri Secondari
  setText('filter-text-all', strings.filterAll);
  setText('filter-text-it', strings.filterIt);
  setText('filter-text-en', strings.filterEn);
  updateBookFilterButtons();

  // Footer
  setText('footer-about-text', strings.footerAbout);
  setText('footer-copyright-text', strings.copyright);

  // Navigation Links
  setText('nav-link-books', strings.navBooks || 'Storie');
  setText('nav-link-characters', strings.navCharacters || 'Personaggi');
  setText('nav-link-reviews', strings.navReviews || 'Recensioni');
  setText('nav-link-coloring', strings.navColoring || 'Libri da colorare');
  setText('nav-link-about', strings.navAbout || 'La nostra storia');
  setText('footer-nav-books', strings.navBooks || 'Storie');
  setText('footer-nav-characters', strings.navCharacters || 'Personaggi');
  setText('footer-nav-reviews', strings.navReviews || 'Recensioni');
  setText('footer-nav-coloring', strings.navColoring || 'Libri da colorare');
  setText('footer-nav-about', strings.navAbout || 'La nostra storia');

  // Characters Page (se presente su characters.html)
  if (document.getElementById('characters-hero-title')) {
    const charLogoImg = document.getElementById('collection-hero-logo');
    if (charLogoImg) {
      if (lang === 'it') {
        charLogoImg.src = 'assets/construction-site-adventures/Logo.ITA.v2.png';
        charLogoImg.alt = 'Le Avventure del Cantiere - Logo Collana';
      } else {
        charLogoImg.src = 'assets/construction-site-adventures/Logo.ENG.v2.png';
        charLogoImg.alt = 'Construction Site Adventures - Series Logo';
      }
    }

    setText('characters-hero-title', strings.charactersPageTitle);
    setText('characters-hero-desc', strings.charactersHeroDesc);

    setText('characters-values-title', strings.charactersValuesTitle);
    setText('characters-values-subtitle', strings.charactersValuesSubtitle);
    setText('value-1-title', strings.value1Title);
    setText('value-1-desc', strings.value1Desc);
    setText('value-2-title', strings.value2Title);
    setText('value-2-desc', strings.value2Desc);
    setText('value-3-title', strings.value3Title);
    setText('value-3-desc', strings.value3Desc);
    setText('value-4-title', strings.value4Title);
    setText('value-4-desc', strings.value4Desc);

    setText('characters-section-title', strings.charactersSectionTitle);
    setText('characters-section-subtitle', strings.charactersSectionSubtitle);

    // Benny
    setText('character-name-benny', strings.charBennyName);
    setText('character-role-benny', strings.charBennyRole);
    setText('character-desc-benny', strings.charBennyDesc);
    const imgBenny = document.getElementById('character-img-benny');
    if (imgBenny && strings.charBennyAlt) imgBenny.alt = strings.charBennyAlt;

    // Bruno
    setText('character-name-bruno', strings.charBrunoName);
    setText('character-role-bruno', strings.charBrunoRole);
    setText('character-desc-bruno', strings.charBrunoDesc);
    const imgBruno = document.getElementById('character-img-bruno');
    if (imgBruno && strings.charBrunoAlt) imgBruno.alt = strings.charBrunoAlt;

    // Leo
    setText('character-name-leo', strings.charLeoName);
    setText('character-role-leo', strings.charLeoRole);
    setText('character-desc-leo', strings.charLeoDesc);
    const imgLeo = document.getElementById('character-img-leo');
    if (imgLeo && strings.charLeoAlt) imgLeo.alt = strings.charLeoAlt;

    // Nina
    setText('character-name-nina', strings.charNinaName);
    setText('character-role-nina', strings.charNinaRole);
    setText('character-desc-nina', strings.charNinaDesc);
    const imgNina = document.getElementById('character-img-nina');
    if (imgNina && strings.charNinaAlt) imgNina.alt = strings.charNinaAlt;

    // Rino
    setText('character-name-rino', strings.charRinoName);
    setText('character-role-rino', strings.charRinoRole);
    setText('character-desc-rino', strings.charRinoDesc);
    const imgRino = document.getElementById('character-img-rino');
    if (imgRino && strings.charRinoAlt) imgRino.alt = strings.charRinoAlt;

    // Rudy (se presente)
    setText('character-name-rudy', strings.charRudyName);
    setText('character-role-rudy', strings.charRudyRole);
    setText('character-desc-rudy', strings.charRudyDesc);
    const imgRudy = document.getElementById('character-img-rudy');
    if (imgRudy && strings.charRudyAlt) imgRudy.alt = strings.charRudyAlt;

    setText('characters-cta-title', strings.charactersCtaTitle);
    setText('characters-cta-desc', strings.charactersCtaDesc);
    setText('characters-cta-btn-text', strings.charactersCtaBtn);

    if (strings.charactersMetaTitle) {
      document.title = strings.charactersMetaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && strings.charactersMetaDesc) {
      metaDesc.setAttribute('content', strings.charactersMetaDesc);
    }
  }


  // Fano Page (se presente su fano.html)
  if (document.getElementById('fano-page-main')) {
    setText('fano-author-badge', strings.fanoAuthorBadge || 'Di Marco Salucci');
    setText('fano-title', strings.fanoTitle || "Fano col naso all'insù");
    setText('fano-subtitle', strings.fanoSubtitle || 'La città di Vitruvio da scoprire e colorare');
    setText('fano-badge-feature', strings.fanoBadgeFeature || '40+ disegni, giochi e attività creative');
    setText('fano-age-hint', strings.fanoAgeHint || 'Perfetto per bambini dai 5 ai 10 anni');
    setText('fano-hero-cta-text', strings.fanoHeroCta || 'Scopri il libro su Amazon');
    setText('fano-story-heading', strings.fanoStoryHeading || 'Un viaggio speciale alla scoperta di Fano… tra storia, colori e curiosità!');
    setText('fano-story-p1', strings.fanoStoryP1);
    setText('fano-story-p2', strings.fanoStoryP2);
    setText('fano-story-p3', strings.fanoStoryP3);
    setText('fano-story-p4', strings.fanoStoryP4);
    setText('fano-inside-title', strings.fanoInsideTitle || 'Dentro il libro');
    setText('fano-inside-subtitle', strings.fanoInsideSubtitle || 'Più di 40 disegni, giochi e attività per scoprire Fano divertendosi.');
    setText('fano-colored-title', strings.fanoColoredTitle || 'E tu, come la coloreresti?');
    setText('fano-colored-subtitle', strings.fanoColoredSubtitle || 'Le stesse illustrazioni possono trasformarsi completamente con la fantasia e i colori di ogni bambino.');
    setText('fano-kids-title', strings.fanoKidsTitle || 'Perché i bambini lo ameranno');
    setText('fano-kids-point-1', strings.fanoKidsPoint1);
    setText('fano-kids-point-2', strings.fanoKidsPoint2);
    setText('fano-kids-point-3', strings.fanoKidsPoint3);
    setText('fano-parents-title', strings.fanoParentsTitle || 'Perché piace ai genitori');
    setText('fano-parents-point-1', strings.fanoParentsPoint1);
    setText('fano-parents-point-2', strings.fanoParentsPoint2);
    setText('fano-parents-point-3', strings.fanoParentsPoint3);
    setText('fano-occasion-note', strings.fanoOccasionNote || 'Per casa, scuola, vacanze o come ricordo speciale di Fano e delle Marche.');
    setText('fano-reviews-section-title', strings.fanoReviewsSectionTitle || 'Cosa dicono i lettori su Amazon');
    setText('fano-reviews-section-subtitle', strings.fanoReviewsSectionSubtitle || 'Recensioni autentiche e verificate da chi ha già scoperto il libro');
    setText('fano-final-title', strings.fanoFinalTitle || 'Scopri Fano, colora la sua storia e crea la tua avventura!');
    setText('fano-final-cta-text', strings.fanoFinalCta || 'Scopri il libro su Amazon');

    // Update Amazon marketplace and links for Fano
    renderFanoMarketSelector(lang);

    if (strings.fanoMetaTitle) {
      document.title = strings.fanoMetaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && strings.fanoMetaDesc) {
      metaDesc.setAttribute('content', strings.fanoMetaDesc);
    }
  }

  // About Page (se presente su about.html)
  if (document.getElementById('about-page-title')) {
    setText('about-page-title', strings.aboutPageTitle);
    setText('about-author-role', strings.aboutAuthorRole);
    setText('about-bio-p1', strings.aboutBioP1);
    setText('about-bio-p2', strings.aboutBioP2);
    setText('about-story-title', strings.aboutStoryTitle);
    setText('about-bio-p3', strings.aboutBioP3);
    setText('about-bio-family', strings.aboutBioFamily);
    setText('about-origin-title', strings.aboutOriginTitle);
    setText('about-origin-subtitle', strings.aboutOriginSubtitle);
    setText('about-inspiration-text', strings.aboutInspirationText);
    setText('about-bio-p4', strings.aboutBioP4);
    setText('about-reading-title', strings.aboutReadingTitle);
    setText('about-reading-subtitle', strings.aboutReadingSubtitle);
    setText('about-bio-p5', strings.aboutBioP5);
    setText('about-closing-text', strings.aboutClosingText);
    setText('about-cta-btn-text', strings.aboutCtaBtn);

    const portraitImg = document.getElementById('about-portrait-img');
    if (portraitImg && strings.aboutAuthorRole) {
      portraitImg.alt = `Marco Salucci - ${strings.aboutAuthorRole}`;
    }

    if (strings.aboutMetaTitle) {
      document.title = strings.aboutMetaTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && strings.aboutMetaDesc) {
      metaDesc.setAttribute('content', strings.aboutMetaDesc);
    }
  }

  renderBookCatalog(lang);
}

function updateBookFilterButtons() {
  document.querySelectorAll('.book-filters .filter-btn').forEach(btn => {
    const isAct = (btn.dataset.bookLang === currentBookLanguage);
    btn.classList.toggle('active', isAct);
    btn.setAttribute('aria-selected', isAct ? 'true' : 'false');
  });
}

function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = text;
}

/* ==========================================================================
   3. ASIN & RISOLUZIONE URL AMAZON
   ========================================================================== */

function getBookAsin(book) {
  if (book.asin) return book.asin.trim();
  if (book.amazon && typeof book.amazon === 'object') {
    return book.amazon.com || book.amazon.it || book.amazon.co_uk || Object.values(book.amazon)[0];
  }
  return '';
}

function getBookUrlForMarket(book, marketKey) {
  const asin = getBookAsin(book);
  const key = (marketKey === 'com') ? 'us' : marketKey;
  const market = AMAZON_MARKETS[key] || AMAZON_MARKETS.us;
  if (asin) {
    return `https://www.${market.domain}/dp/${asin}`;
  }
  return '#';
}

function getBookInitialMarket(bookId) {
  if (selectedMarketState[bookId] && AMAZON_MARKETS[selectedMarketState[bookId]]) {
    return selectedMarketState[bookId];
  }
  return userDetectedMarket || 'us';
}

/* ==========================================================================
   4. RENDERING CATALOGO LIBRI CON SELETTORE MARKETPLACE FLUIDO
   ========================================================================== */

function renderBookCatalog(lang) {
  const grid = document.getElementById('books-catalog-grid');
  if (!grid) return;

  const strings = I18N[lang] || I18N.it;

  // Filtra libri in base al selettore secondario lingua libri
  let currentBooks = BOOKS.filter(b => b.collection === 'construction-site');
  if (currentBookLanguage !== 'all') {
    currentBooks = currentBooks.filter(b => b.languageCode === currentBookLanguage);
  }

  if (currentBooks.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nessun libro trovato.</p>`;
    return;
  }

  const cardsHtml = currentBooks.map((book, index) => {
    const marketKey = getBookInitialMarket(book.id);
    selectedMarketState[book.id] = marketKey;
    const marketInfo = AMAZON_MARKETS[marketKey] || AMAZON_MARKETS.us;
    const initialUrl = getBookUrlForMarket(book, marketKey);

    const hasPreview = Array.isArray(book.preview) && book.preview.length > 0;
    const sampleChipHtml = hasPreview ? `
      <button type="button" class="card-meta-chip chip-sample-btn" onclick="openSampleModal('${escapeJs(book.id)}')" aria-label="${escapeHtml(strings.readSampleBtn)} - ${escapeHtml(book.title)}">
        <svg class="chip-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        <span>${escapeHtml(strings.readSampleBtn)}</span>
      </button>
    ` : '';

    const buyButtonText = (typeof strings.viewOn === 'function') 
      ? strings.viewOn(marketInfo.buttonLabel) 
      : `BUY ON ${marketInfo.buttonLabel.toUpperCase()}`;

    // Genera lista opzioni per tutti i 14 marketplace
    const marketOptionsHtml = Object.entries(AMAZON_MARKETS).map(([key, info]) => {
      const isSelected = (key === marketKey);
      return `
        <div class="market-option ${isSelected ? 'selected' : ''}" data-market-key="${key}" role="option" aria-selected="${isSelected ? 'true' : 'false'}" onclick="selectBookMarket('${escapeJs(book.id)}', '${key}')">
          <img src="https://flagcdn.com/24x18/${info.flagCode}.png" srcset="https://flagcdn.com/48x36/${info.flagCode}.png 2x" alt="" width="20" height="15" class="market-flag-img" loading="eager">
          <span class="market-option-name">${escapeHtml(info.name)}</span>
          ${isSelected ? '<span class="market-option-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}
        </div>
      `;
    }).join('');

    return `
      <article class="book-card" id="card-${escapeHtml(book.id)}">
        <div class="book-cover-wrap" onclick="openSampleModal('${escapeJs(book.id)}')" role="button" tabindex="0" title="${escapeHtml(strings.readSampleBtn)} - ${escapeHtml(book.title)}">
          <img 
            src="${escapeHtml(book.cover)}" 
            alt="${escapeHtml(book.title)}" 
            loading="lazy"
            onerror="handleCoverError(this, '${escapeJs(book.title)}')"
          />
        </div>

        <div class="book-card-meta">
          ${sampleChipHtml}
        </div>

        <h2 class="book-card-title">${escapeHtml(book.title)}</h2>
        <div class="book-card-author"><span class="muted">${escapeHtml(strings.authorBy)}</span> ${escapeHtml(book.author || 'Marco Salucci')}</div>

        <div class="book-action-area">
          <div class="market-selector-wrapper">
            <label class="market-label">
              <span>${escapeHtml(strings.selectStore)}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="opacity: 0.6;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </label>
            <div class="custom-market-select" id="custom-market-select-${escapeHtml(book.id)}">
              <button 
                type="button" 
                class="market-trigger" 
                onclick="toggleMarketDropdown('${escapeJs(book.id)}', event)"
                aria-haspopup="listbox" 
                aria-expanded="false" 
                aria-label="${escapeHtml(strings.selectStore)} - ${escapeHtml(book.title)}"
              >
                <span class="market-trigger-content">
                  <img src="https://flagcdn.com/24x18/${marketInfo.flagCode}.png" srcset="https://flagcdn.com/48x36/${marketInfo.flagCode}.png 2x" alt="" width="20" height="15" class="market-flag-img" loading="eager">
                  <span class="market-selected-name">${escapeHtml(marketInfo.name)}</span>
                </span>
                <svg class="market-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div class="market-dropdown-menu" id="market-dropdown-${escapeHtml(book.id)}" role="listbox" style="display: none;">
                ${marketOptionsHtml}
              </div>
            </div>
          </div>

          <a 
            href="${initialUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-buy"
            id="buy-btn-${escapeHtml(book.id)}"
            aria-label="${buyButtonText} - ${escapeHtml(book.title)}"
          >
            <span class="btn-buy-text">${buyButtonText}</span>
            <svg class="btn-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }).join('');

  grid.innerHTML = cardsHtml;
}

/* ==========================================================================
   5. CONTROLLO DROPDOWN MARKETPLACE SULLE CARD E NEL MODAL
   ========================================================================== */

window.toggleMarketDropdown = function(bookId, event) {
  if (event) event.stopPropagation();
  const selectEl = document.getElementById(`custom-market-select-${bookId}`);
  const menuEl = document.getElementById(`market-dropdown-${bookId}`);
  const triggerBtn = selectEl ? selectEl.querySelector('.market-trigger') : null;
  if (!selectEl || !menuEl) return;

  const isOpen = (menuEl.style.display === 'block');

  // Chiudi tutti gli altri dropdown
  document.querySelectorAll('.market-dropdown-menu').forEach(m => m.style.display = 'none');
  document.querySelectorAll('.custom-market-select').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.market-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));

  if (!isOpen) {
    menuEl.style.display = 'block';
    selectEl.classList.add('open');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
  }
};

window.selectBookMarket = function(bookId, marketKey) {
  if (!AMAZON_MARKETS[marketKey]) return;
  selectedMarketState[bookId] = marketKey;
  userDetectedMarket = marketKey;

  try {
    localStorage.setItem('csabooks_user_market', marketKey);
  } catch (e) {}

  const marketInfo = AMAZON_MARKETS[marketKey];
  const strings = I18N[currentLanguage] || I18N.it;
  const buyButtonText = (typeof strings.viewOn === 'function') 
    ? strings.viewOn(marketInfo.buttonLabel) 
    : `ACQUISTA SU ${marketInfo.buttonLabel.toUpperCase()}`;

  // Se il libro selezionato è Fano col naso all'insù
  if (bookId === 'fano') {
    const asin = 'B0HD2X6HVJ';
    const targetUrl = `https://www.${marketInfo.domain}/dp/${asin}`;

    // Aggiorna il trigger Fano
    const selectEl = document.getElementById('custom-market-select-fano');
    if (selectEl) {
      const flagImg = selectEl.querySelector('.market-flag-img');
      const nameSpan = selectEl.querySelector('.market-selected-name');
      if (flagImg) {
        flagImg.src = `https://flagcdn.com/24x18/${marketInfo.flagCode}.png`;
        flagImg.srcset = `https://flagcdn.com/48x36/${marketInfo.flagCode}.png 2x`;
        flagImg.alt = marketInfo.name;
      }
      if (nameSpan) {
        nameSpan.textContent = marketInfo.name;
      }

      selectEl.querySelectorAll('.market-option').forEach(opt => {
        const isSel = (opt.getAttribute('data-market-key') === marketKey);
        opt.classList.toggle('selected', isSel);
        opt.setAttribute('aria-selected', isSel ? 'true' : 'false');
        const checkSpan = opt.querySelector('.market-option-check');
        if (isSel && !checkSpan) {
          opt.insertAdjacentHTML('beforeend', '<span class="market-option-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></span>');
        } else if (!isSel && checkSpan) {
          checkSpan.remove();
        }
      });
    }

    // Aggiorna pulsante Hero Fano
    const heroBtn = document.getElementById('buy-btn-fano') || document.getElementById('fano-hero-cta');
    if (heroBtn) {
      heroBtn.href = targetUrl;
      const textSpan = heroBtn.querySelector('#fano-hero-cta-text') || heroBtn.querySelector('.btn-buy-text');
      if (textSpan) textSpan.textContent = buyButtonText;
      heroBtn.setAttribute('aria-label', `${buyButtonText} - Fano col naso all'insù`);
    }

    // Aggiorna pulsante Bottom Fano
    const finalBtn = document.getElementById('buy-btn-fano-bottom') || document.getElementById('fano-final-cta');
    if (finalBtn) {
      finalBtn.href = targetUrl;
      const textSpan = finalBtn.querySelector('#fano-final-cta-text') || finalBtn.querySelector('.btn-buy-text');
      if (textSpan) textSpan.textContent = buyButtonText;
      finalBtn.setAttribute('aria-label', `${buyButtonText} - Fano col naso all'insù`);
    }

    // Chiudi menu a tendina
    document.querySelectorAll('.market-dropdown-menu').forEach(m => m.style.display = 'none');
    document.querySelectorAll('.custom-market-select').forEach(s => s.classList.remove('open'));
    return;
  }

  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const targetUrl = getBookUrlForMarket(book, marketKey);

  // Aggiorna il trigger del libro
  const selectEl = document.getElementById(`custom-market-select-${bookId}`);
  if (selectEl) {
    const flagImg = selectEl.querySelector('.market-flag-img');
    const nameSpan = selectEl.querySelector('.market-selected-name');
    if (flagImg) {
      flagImg.src = `https://flagcdn.com/24x18/${marketInfo.flagCode}.png`;
      flagImg.srcset = `https://flagcdn.com/48x36/${marketInfo.flagCode}.png 2x`;
      flagImg.alt = marketInfo.name;
    }
    if (nameSpan) {
      nameSpan.textContent = marketInfo.name;
    }
  }

  // Aggiorna il pulsante Acquista del libro
  const buyBtn = document.getElementById(`buy-btn-${bookId}`);
  if (buyBtn) {
    buyBtn.href = targetUrl;
    const textSpan = buyBtn.querySelector('.btn-buy-text');
    if (textSpan) textSpan.textContent = buyButtonText;
    buyBtn.setAttribute('aria-label', `${buyButtonText} - ${book.title}`);
  }

  // Se il modal è aperto per questo libro, aggiorna anche il modal footer
  if (activePreviewBook && activePreviewBook.id === bookId) {
    const modalFooter = document.getElementById('sample-modal-footer');
    if (modalFooter) {
      modalFooter.innerHTML = buildModalAmazonAction(book, marketKey, currentLanguage);
    }
  }

  // Chiudi menu a tendina
  document.querySelectorAll('.market-dropdown-menu').forEach(m => m.style.display = 'none');
  document.querySelectorAll('.custom-market-select').forEach(s => s.classList.remove('open'));
};

function renderFanoMarketSelector(lang) {
  const selectWrapper = document.getElementById('custom-market-select-fano');
  if (!selectWrapper) return;

  const currentMarketKey = selectedMarketState['fano'] || userDetectedMarket || 'it';
  selectedMarketState['fano'] = currentMarketKey;
  const marketInfo = AMAZON_MARKETS[currentMarketKey] || AMAZON_MARKETS.it;
  const strings = I18N[lang] || I18N.it;

  const labelEl = document.getElementById('fano-market-label');
  if (labelEl && strings.selectStore) {
    labelEl.textContent = strings.selectStore;
  }

  const triggerBtn = selectWrapper.querySelector('.market-trigger');
  if (triggerBtn) {
    triggerBtn.innerHTML = `
      <span class="market-trigger-content">
        <img src="https://flagcdn.com/24x18/${marketInfo.flagCode}.png" srcset="https://flagcdn.com/48x36/${marketInfo.flagCode}.png 2x" alt="${escapeHtml(marketInfo.name)}" width="20" height="15" class="market-flag-img" loading="eager">
        <span class="market-selected-name">${escapeHtml(marketInfo.name)}</span>
      </span>
      <svg class="market-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
    triggerBtn.setAttribute('aria-label', `${strings.selectStore || 'Seleziona Store Amazon'} - Fano col naso all'insù`);
  }

  const menuEl = document.getElementById('market-dropdown-fano');
  if (menuEl) {
    const marketOptionsHtml = Object.entries(AMAZON_MARKETS).map(([key, info]) => {
      const isSelected = (key === currentMarketKey);
      return `
        <div 
          class="market-option ${isSelected ? 'selected' : ''}" 
          data-market-key="${key}"
          role="option" 
          aria-selected="${isSelected ? 'true' : 'false'}"
          onclick="selectBookMarket('fano', '${key}')"
        >
          <img src="https://flagcdn.com/24x18/${info.flagCode}.png" srcset="https://flagcdn.com/48x36/${info.flagCode}.png 2x" alt="" width="20" height="15" class="market-flag-img">
          <span class="market-option-name">${escapeHtml(info.name)}</span>
          ${isSelected ? '<span class="market-option-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}
        </div>
      `;
    }).join('');
    menuEl.innerHTML = marketOptionsHtml;
  }

  const asin = 'B0HD2X6HVJ';
  const targetUrl = `https://www.${marketInfo.domain}/dp/${asin}`;
  const buyButtonText = (typeof strings.viewOn === 'function') 
    ? strings.viewOn(marketInfo.buttonLabel) 
    : `ACQUISTA SU ${marketInfo.buttonLabel.toUpperCase()}`;

  const heroBtn = document.getElementById('buy-btn-fano') || document.getElementById('fano-hero-cta');
  if (heroBtn) {
    heroBtn.href = targetUrl;
    const textSpan = heroBtn.querySelector('#fano-hero-cta-text') || heroBtn.querySelector('.btn-buy-text');
    if (textSpan) textSpan.textContent = buyButtonText;
    heroBtn.setAttribute('aria-label', `${buyButtonText} - Fano col naso all'insù`);
  }

  const finalBtn = document.getElementById('buy-btn-fano-bottom') || document.getElementById('fano-final-cta');
  if (finalBtn) {
    finalBtn.href = targetUrl;
    const textSpan = finalBtn.querySelector('#fano-final-cta-text') || finalBtn.querySelector('.btn-buy-text');
    if (textSpan) textSpan.textContent = buyButtonText;
    finalBtn.setAttribute('aria-label', `${buyButtonText} - Fano col naso all'insù`);
  }
}

function initGlobalDropdownCloser() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-market-select')) {
      document.querySelectorAll('.market-dropdown-menu').forEach(m => m.style.display = 'none');
      document.querySelectorAll('.custom-market-select').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.market-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
    if (!e.target.closest('#lang-mobile-select')) {
      const dropdown = document.getElementById('lang-mobile-dropdown');
      const select = document.getElementById('lang-mobile-select');
      const trigger = document.getElementById('lang-mobile-trigger');
      if (dropdown) dropdown.classList.remove('show');
      if (select) select.classList.remove('open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initMobileLanguageDropdown() {
  const trigger = document.getElementById('lang-mobile-trigger');
  const select = document.getElementById('lang-mobile-select');
  const dropdown = document.getElementById('lang-mobile-dropdown');

  if (trigger && dropdown) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('show');
      dropdown.classList.toggle('show', !isOpen);
      if (select) select.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dropdown) dropdown.classList.remove('show');
      if (select) select.classList.remove('open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   6. MODAL ANTEPRIMA (READ SAMPLE VIEWER)
   ========================================================================== */

function buildModalAmazonAction(book, marketKey, lang) {
  const marketInfo = AMAZON_MARKETS[marketKey] || AMAZON_MARKETS.us;
  const targetUrl = getBookUrlForMarket(book, marketKey);
  const strings = I18N[lang] || I18N.it;
  const buyButtonText = (typeof strings.viewOn === 'function') 
    ? strings.viewOn(marketInfo.buttonLabel) 
    : `BUY ON ${marketInfo.buttonLabel.toUpperCase()}`;

  const marketOptionsHtml = Object.entries(AMAZON_MARKETS).map(([key, info]) => {
    const isSelected = (key === marketKey);
    return `
      <div class="market-option ${isSelected ? 'selected' : ''}" data-market-key="${key}" role="option" aria-selected="${isSelected ? 'true' : 'false'}" onclick="selectBookMarket('${escapeJs(book.id)}', '${key}')">
        <img src="https://flagcdn.com/24x18/${info.flagCode}.png" srcset="https://flagcdn.com/48x36/${info.flagCode}.png 2x" alt="" width="20" height="15" class="market-flag-img" loading="eager">
        <span class="market-option-name">${escapeHtml(info.name)}</span>
        ${isSelected ? '<span class="market-option-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg></span>' : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="modal-action-row">
      <div class="custom-market-select" id="custom-market-select-modal-${escapeHtml(book.id)}">
        <button 
          type="button" 
          class="market-trigger" 
          onclick="toggleMarketDropdown('modal-${escapeJs(book.id)}', event)"
          aria-haspopup="listbox" 
          aria-expanded="false" 
        >
          <span class="market-trigger-content">
            <img src="https://flagcdn.com/24x18/${marketInfo.flagCode}.png" srcset="https://flagcdn.com/48x36/${marketInfo.flagCode}.png 2x" alt="" width="20" height="15" class="market-flag-img" loading="eager">
            <span class="market-selected-name">${escapeHtml(marketInfo.name)}</span>
          </span>
          <svg class="market-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="market-dropdown-menu" id="market-dropdown-modal-${escapeHtml(book.id)}" role="listbox" style="display: none;">
          ${marketOptionsHtml}
        </div>
      </div>

      <a 
        href="${targetUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-buy"
        id="buy-btn-modal-${escapeHtml(book.id)}"
        aria-label="${buyButtonText} - ${escapeHtml(book.title)}"
      >
        <span class="btn-buy-text">${buyButtonText}</span>
        <svg class="btn-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </div>
  `;
}

window.openSampleModal = function(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const pages = (Array.isArray(book.preview) && book.preview.length > 0)
    ? book.preview
    : [book.cover];

  activePreviewBook = { ...book, preview: pages };
  currentPreviewIndex = 0;

  const modal = document.getElementById('sample-modal');
  const titleEl = document.getElementById('sample-modal-title');
  const badgeEl = document.getElementById('sample-modal-badge');
  const footerEl = document.getElementById('sample-modal-footer');
  const strings = I18N[currentLanguage] || I18N.it;

  if (titleEl) titleEl.textContent = book.title;
  if (badgeEl) {
    badgeEl.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
      <span>${escapeHtml(strings.sampleBadge)}</span>
    `;
  }

  const marketKey = getBookInitialMarket(book.id);
  if (footerEl) {
    footerEl.innerHTML = buildModalAmazonAction(book, marketKey, currentLanguage);
  }

  updateSampleViewer();

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

window.closeSampleModal = function() {
  const modal = document.getElementById('sample-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  activePreviewBook = null;
};

window.changeSamplePage = function(delta) {
  if (!activePreviewBook || !activePreviewBook.preview) return;
  const newIndex = currentPreviewIndex + delta;
  if (newIndex >= 0 && newIndex < activePreviewBook.preview.length) {
    currentPreviewIndex = newIndex;
    updateSampleViewer();
  }
};

function updateSampleViewer() {
  if (!activePreviewBook || !activePreviewBook.preview) return;

  const pages = activePreviewBook.preview;
  const total = pages.length;
  const imgEl = document.getElementById('sample-page-img');
  const labelEl = document.getElementById('sample-page-label');
  const counterEl = document.getElementById('sample-page-counter');
  const prevBtn = document.getElementById('sample-prev-btn');
  const nextBtn = document.getElementById('sample-next-btn');
  const strings = I18N[currentLanguage] || I18N.it;

  const currentSrc = pages[currentPreviewIndex];

  if (imgEl) {
    imgEl.src = currentSrc;
    imgEl.alt = `${activePreviewBook.title} - Pagina ${currentPreviewIndex + 1}`;
  }

  if (labelEl) {
    if (currentPreviewIndex === 0) {
      labelEl.textContent = strings.frontCoverLabel;
    } else if (currentPreviewIndex === total - 1) {
      labelEl.textContent = strings.backCoverLabel;
    } else {
      labelEl.textContent = `${strings.pageLabel} ${currentPreviewIndex + 1}`;
    }
  }

  if (counterEl) {
    counterEl.textContent = `${currentPreviewIndex + 1} / ${total}`;
  }

  if (prevBtn) prevBtn.disabled = currentPreviewIndex === 0;
  if (nextBtn) nextBtn.disabled = currentPreviewIndex === total - 1;

  // Preload pagina successiva
  if (currentPreviewIndex + 1 < total) {
    const preloadImg = new Image();
    preloadImg.src = pages[currentPreviewIndex + 1];
  }
}

function initSampleModalEvents() {
  const modal = document.getElementById('sample-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSampleModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const m = document.getElementById('sample-modal');
    if (!m || !m.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeSampleModal();
    } else if (e.key === 'ArrowLeft') {
      changeSamplePage(-1);
    } else if (e.key === 'ArrowRight') {
      changeSamplePage(1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const viewer = document.getElementById('sample-viewer');
  if (viewer) {
    viewer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        changeSamplePage(1);
      } else if (touchEndX - touchStartX > 45) {
        changeSamplePage(-1);
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   7. DEEP LINKING DA POST INSTAGRAM / TIKTOK
   ========================================================================== */

function handleDirectBookDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('book') || window.location.hash.replace('#', '');
  
  if (bookId) {
    setTimeout(() => {
      const card = document.getElementById(`card-${bookId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transform = 'scale(1.02)';
        card.style.borderColor = 'var(--c-primary)';
        setTimeout(() => {
          card.style.transform = '';
        }, 2000);
      }
    }, 300);
  }
}

/* ==========================================================================
   8. UTILITIES
   ========================================================================== */

window.handleCoverError = function(img, title) {
  const parent = img.parentElement;
  if (!parent) return;
  parent.innerHTML = `
    <div class="book-cover-fallback">
      <svg class="fallback-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
        <path d="M6 6h10"></path>
        <path d="M6 10h10"></path>
      </svg>
      <div class="fallback-title">${escapeHtml(title)}</div>
    </div>
  `;
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJs(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
}

/* ==========================================================================
   HERO BANNER DYNAMIC IMAGE CAROUSEL
   ========================================================================== */
const heroCarouselState = {
  manifest: [],
  currentIndex: 0,
  timer: null,
  intervalMs: 5000,
  isPaused: false,
  touchStartX: 0,
  touchEndX: 0,
  initialized: false
};

function getBannerAlt(item, lang) {
  const strings = I18N[lang] || I18N.it;
  const key = (item && item.characterKey) ? item.characterKey : '';
  if (key === 'banner') {
    return strings.heroBannerAlt || 'CSA Books 4 Kids - Storie per bambini, nate da un papà e una mamma.';
  }
  if (key === 'benny') {
    return strings.charBennyAlt ? `${strings.charBennyAlt} - CSA Books 4 Kids` : 'Benny - CSA Books 4 Kids';
  }
  if (key === 'bruno') {
    return strings.charBrunoAlt ? `${strings.charBrunoAlt} - CSA Books 4 Kids` : 'Bruno - CSA Books 4 Kids';
  }
  if (key === 'leo') {
    return strings.charLeoAlt ? `${strings.charLeoAlt} - CSA Books 4 Kids` : 'Leo - CSA Books 4 Kids';
  }
  if (key === 'nina') {
    return strings.charNinaAlt ? `${strings.charNinaAlt} - CSA Books 4 Kids` : 'Nina - CSA Books 4 Kids';
  }
  if (key === 'rino') {
    return strings.charRinoAlt ? `${strings.charRinoAlt} - CSA Books 4 Kids` : 'Rino - CSA Books 4 Kids';
  }
  if (key === 'rudy') {
    return strings.charRudyAlt ? `${strings.charRudyAlt} - CSA Books 4 Kids` : 'Rudy - CSA Books 4 Kids';
  }
  return `CSA Books 4 Kids - ${item.title || 'Banner'}`;
}

function initHeroCarousel() {
  const container = document.getElementById('hero-carousel');
  const slidesTrack = document.getElementById('hero-carousel-slides');
  if (!container || !slidesTrack) return;

  // 1. Prefer synchronously available window.BANNER_MANIFEST
  if (Array.isArray(window.BANNER_MANIFEST) && window.BANNER_MANIFEST.length > 0) {
    setupHeroCarousel(window.BANNER_MANIFEST);
    return;
  }

  // 2. Fallback to fetch banners.json
  fetch('assets/banner/banners.json?t=' + Date.now())
    .then(res => {
      if (!res.ok) throw new Error('Status ' + res.status);
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setupHeroCarousel(data);
      }
    })
    .catch(err => {
      console.warn('[Carousel] Using fallback static hero banner:', err);
    });
}

function shuffleBanners(items) {
  if (!Array.isArray(items) || items.length <= 1) return items;

  // Trova l'immagine principale (banner ufficiale della collana)
  const mainBannerIndex = items.findIndex(item => 
    item.characterKey === 'banner' || 
    (item.file && item.file.toLowerCase().includes('banner-csa-books-4-kids'))
  );

  let mainBanner = null;
  let remaining = [...items];
  if (mainBannerIndex !== -1) {
    mainBanner = remaining.splice(mainBannerIndex, 1)[0];
  }

  // Fisher-Yates Shuffle sul resto delle immagini
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }

  // Pass per evitare che due immagini consecutive appartengano allo stesso personaggio
  for (let i = 1; i < remaining.length; i++) {
    if (remaining[i].characterKey && remaining[i].characterKey === remaining[i - 1].characterKey) {
      let swapIdx = -1;
      for (let j = i + 1; j < remaining.length; j++) {
        if (remaining[j].characterKey !== remaining[i].characterKey) {
          swapIdx = j;
          break;
        }
      }
      if (swapIdx === -1) {
        for (let j = 0; j < i - 1; j++) {
          if (remaining[j].characterKey !== remaining[i].characterKey && (j === 0 || remaining[j - 1].characterKey !== remaining[i].characterKey)) {
            swapIdx = j;
            break;
          }
        }
      }
      if (swapIdx !== -1) {
        [remaining[i], remaining[swapIdx]] = [remaining[swapIdx], remaining[i]];
      }
    }
  }

  // L'immagine principale della collana deve essere sempre la prima slide
  return mainBanner ? [mainBanner, ...remaining] : remaining;
}

function setupHeroCarousel(items) {
  const container = document.getElementById('hero-carousel');
  const slidesTrack = document.getElementById('hero-carousel-slides');
  const indicatorsContainer = document.getElementById('hero-carousel-indicators');
  const prevBtn = document.getElementById('hero-carousel-prev');
  const nextBtn = document.getElementById('hero-carousel-next');

  if (!container || !slidesTrack) return;

  const shuffledItems = shuffleBanners(items);
  heroCarouselState.manifest = shuffledItems;
  heroCarouselState.currentIndex = 0;
  const total = shuffledItems.length;

  // Render slides preserving the first element for zero CLS
  slidesTrack.innerHTML = shuffledItems.map((item, idx) => {
    const isActive = idx === 0;
    const altText = escapeHtml(getBannerAlt(item, currentLanguage));
    const isPriority = idx === 0;
    return `
      <div class="hero-carousel-slide ${isActive ? 'active' : ''}" 
           data-index="${idx}" 
           role="group" 
           aria-roledescription="slide" 
           aria-label="${idx + 1} di ${total}"
           ${isActive ? '' : 'aria-hidden="true"'}>
        <img 
          src="${escapeHtml(item.src)}" 
          alt="${altText}" 
          class="hero-banner-img" 
          ${isPriority ? 'id="hero-banner-img" fetchpriority="high" loading="eager"' : 'loading="lazy"'}
        />
      </div>
    `;
  }).join('');

  // Render indicator dots
  if (indicatorsContainer) {
    if (total <= 1) {
      indicatorsContainer.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      indicatorsContainer.style.display = 'flex';
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';

      indicatorsContainer.innerHTML = shuffledItems.map((item, idx) => {
        const isActive = idx === 0;
        return `
          <button type="button" 
                  class="hero-carousel-dot ${isActive ? 'active' : ''}" 
                  data-slide-to="${idx}" 
                  role="tab" 
                  aria-selected="${isActive ? 'true' : 'false'}" 
                  aria-label="Slide ${idx + 1} di ${total}">
          </button>
        `;
      }).join('');

      // Indicators click handler
      indicatorsContainer.querySelectorAll('.hero-carousel-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const slideIdx = parseInt(dot.getAttribute('data-slide-to'), 10);
          if (!isNaN(slideIdx)) {
            goToHeroSlide(slideIdx);
            resetHeroAutoplay();
          }
        });
      });
    }
  }

  // Prev / Next button click handlers
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      goToHeroSlide(heroCarouselState.currentIndex - 1);
      resetHeroAutoplay();
    };
  }
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      goToHeroSlide(heroCarouselState.currentIndex + 1);
      resetHeroAutoplay();
    };
  }

  if (!heroCarouselState.initialized) {
    heroCarouselState.initialized = true;

    // Keyboard navigation when carousel container has focus
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToHeroSlide(heroCarouselState.currentIndex - 1);
        resetHeroAutoplay();
      } else if (e.key === 'ArrowRight') {
        goToHeroSlide(heroCarouselState.currentIndex + 1);
        resetHeroAutoplay();
      }
    });

    // Pause autoplay on mouse hover / resume on mouse leave
    container.addEventListener('mouseenter', () => {
      heroCarouselState.isPaused = true;
      clearTimeout(heroCarouselState.timer);
    });
    container.addEventListener('mouseleave', () => {
      heroCarouselState.isPaused = false;
      startHeroAutoplay();
    });

    // Pause autoplay on focus / resume on blur
    container.addEventListener('focusin', () => {
      heroCarouselState.isPaused = true;
      clearTimeout(heroCarouselState.timer);
    });
    container.addEventListener('focusout', (e) => {
      if (!container.contains(e.relatedTarget)) {
        heroCarouselState.isPaused = false;
        startHeroAutoplay();
      }
    });

    // Touch swipe support on mobile devices
    container.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        heroCarouselState.touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        heroCarouselState.touchEndX = e.changedTouches[0].clientX;
        const diff = heroCarouselState.touchStartX - heroCarouselState.touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            goToHeroSlide(heroCarouselState.currentIndex + 1);
          } else {
            goToHeroSlide(heroCarouselState.currentIndex - 1);
          }
          resetHeroAutoplay();
        }
      }
    }, { passive: true });
  }

  updateHeroCarouselTranslations(currentLanguage);
  startHeroAutoplay();
}

function goToHeroSlide(index) {
  const total = heroCarouselState.manifest.length;
  if (total <= 1) return;

  const newIndex = (index + total) % total;
  heroCarouselState.currentIndex = newIndex;

  const slides = document.querySelectorAll('.hero-carousel-slide');
  slides.forEach((slide, idx) => {
    const isActive = idx === newIndex;
    slide.classList.toggle('active', isActive);
    if (isActive) {
      slide.removeAttribute('aria-hidden');
    } else {
      slide.setAttribute('aria-hidden', 'true');
    }
  });

  const dots = document.querySelectorAll('.hero-carousel-dot');
  dots.forEach((dot, idx) => {
    const isActive = idx === newIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function startHeroAutoplay() {
  clearTimeout(heroCarouselState.timer);
  if (heroCarouselState.manifest.length <= 1) return;
  if (heroCarouselState.isPaused) return;

  // Respect prefers-reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  heroCarouselState.timer = setTimeout(() => {
    goToHeroSlide(heroCarouselState.currentIndex + 1);
    startHeroAutoplay();
  }, heroCarouselState.intervalMs);
}

function resetHeroAutoplay() {
  clearTimeout(heroCarouselState.timer);
  startHeroAutoplay();
}

function updateHeroCarouselTranslations(lang) {
  if (!heroCarouselState.manifest || heroCarouselState.manifest.length === 0) return;
  const total = heroCarouselState.manifest.length;

  const slides = document.querySelectorAll('.hero-carousel-slide');
  slides.forEach((slide, idx) => {
    const item = heroCarouselState.manifest[idx];
    if (!item) return;
    const altText = getBannerAlt(item, lang);
    const img = slide.querySelector('.hero-banner-img');
    if (img) img.alt = altText;
    slide.setAttribute('aria-label', `${idx + 1} di ${total}: ${altText}`);
  });

  // Localize navigation buttons
  const prevBtn = document.getElementById('hero-carousel-prev');
  const nextBtn = document.getElementById('hero-carousel-next');
  const navLabels = {
    it: { prev: 'Slide precedente', next: 'Slide successiva' },
    en: { prev: 'Previous slide', next: 'Next slide' },
    de: { prev: 'Vorherige Folie', next: 'Nächste Folie' },
    fr: { prev: 'Diapositive précédente', next: 'Diapositive suivante' },
    es: { prev: 'Diapositiva anterior', next: 'Diapositiva siguiente' },
    nl: { prev: 'Vorige dia', next: 'Volgende dia' },
    pl: { prev: 'Poprzedni slajd', next: 'Następny slajd' },
    sv: { prev: 'Föregående bild', next: 'Nästa bild' },
    ja: { prev: '前のスライド', next: '次のスライド' }
  };
  const labels = navLabels[lang] || navLabels.it;
  if (prevBtn) {
    prevBtn.setAttribute('aria-label', labels.prev);
    prevBtn.title = labels.prev;
  }
  if (nextBtn) {
    nextBtn.setAttribute('aria-label', labels.next);
    nextBtn.title = labels.next;
  }
}

/* ==========================================================================
   SEZIONE RECENSIONI CLIENTI AMAZON (SOCIAL PROOF AUTENTICO)
   ========================================================================== */
const AMAZON_REVIEWS = [
  {
    reviewer: "Stefania Omiccioli",
    rating: 5,
    text: {
      it: "Momenti di sano divertimento e riflessioni condivise coi più piccoli. La lettura ideale per cementare il legame d'affetto tra genitori e figli, all'insegna della leggerezza, ma anche dei primi intelligenti approcci ai grandi temi della vita. Consigliatissimo!!",
      en: "Moments of wholesome fun and shared reflections with the little ones. The ideal read to strengthen the bond of affection between parents and children, filled with lightness, but also the first smart approaches to the great themes of life. Highly recommended!!",
      de: "Momente des gesunden Vergnügens und gemeinsame Gedanken mit den Kleinen. Die ideale Lektüre, um das Band der Zuneigung zwischen Eltern und Kindern zu stärken – geprägt von Leichtigkeit, aber auch ersten klugen Annäherungen an die großen Themen des Lebens. Wärmstens empfohlen!!",
      fr: "Des moments de pur plaisir et de réflexions partagées avec les plus petits. La lecture idéale pour cimenter le lien d'affection entre parents et enfants, placée sous le signe de la légèreté, mais aussi des premières approches intelligentes des grands thèmes de la vie. Vivement recommandé !!",
      es: "Momentos de sana diversión y reflexiones compartidas con los más pequeños. La lectura ideal para fortalecer el vínculo de afecto entre padres e hijos, marcada por la ligereza, pero también por los primeros acercamientos inteligentes a los grandes temas de la vida. ¡¡Muy recomendado!!",
      nl: "Momenten van gezond plezier en gedeelde reflecties met de kleintjes. De ideale lectuur om de band van genegenheid tussen ouders en kinderen te versterken, in het teken van luchtigheid, maar ook van de eerste slimme benaderingen van de grote levensthema's. Zeer aanbevolen!!",
      pl: "Chwile zdrowej zabawy i wspólnych refleksji z najmłodszymi. Idealna lektura, by zacieśnić więź miłości między rodzicami a dziećmi, pełna lekkości, ale też pierwszego mądrego podejścia do wielkich tematów życia. Gorąco polecam!!",
      sv: "Stunder av sund glädje och gemensam eftertanke med de små. Den perfekta läsningen för att stärka bandet av kärlek mellan föräldrar och barn, präglad av lätthet, men också de första kloka närmandena till livets stora frågor. Rekommenderas varmt!!",
      ja: "子どもたちと一緒に楽しむ健全な時間と、心を通わせる語らいのひととき。親子の絆を深めるのにぴったりの絵本で、軽やかな楽しさの中に、人生の大切なテーマへの知的な第一歩が詰まっています。心からおすすめします！！"
    }
  },
  {
    reviewer: "Michele L.",
    rating: 5,
    text: {
      it: "Per stimolare la curiosità. Bellissimo libro, un po' diverso dal solito perché fa approcciare alla storia in maniera divertente e che incuriosisce i piccoli. La mia bimba di 4 anni dopo averlo finito ha chiesto se la portavamo a vedere gli scavi a Roma!! Consigliatissimo, lettura bella e non pesante, adatto dai 2 anni, illustrazioni molto belle!!",
      en: "To stimulate curiosity. Beautiful book, a little different from usual because it approaches history in a fun way that intrigues the little ones. My 4-year-old girl, after finishing it, asked if we could take her to see the excavations in Rome!! Highly recommended, lovely and light reading, suitable from 2 years old, very beautiful illustrations!!",
      de: "Um die Neugier zu wecken. Wunderschönes Buch, ein wenig anders als gewohnt, weil es auf unterhaltsame Weise an die Geschichte heranführt und die Kleinen neugierig macht. Meine 4-jährige Tochter fragte nach dem Lesen, ob wir sie zu den Ausgrabungen nach Rom mitnehmen könnten!! Wärmstens empfohlen, schöne und leichte Lektüre, geeignet ab 2 Jahren, sehr schöne Illustrationen!!",
      fr: "Pour stimuler la curiosité. Magnifique livre, un peu différent de l'ordinaire car il aborde l'histoire de manière amusante et pique la curiosité des petits. Ma petite fille de 4 ans, après l'avoir terminé, a demandé si on pouvait l'emmener voir les fouilles à Rome !! Vivement recommandé, lecture belle et légère, adapté dès 2 ans, très belles illustrations !!",
      es: "Para estimular la curiosidad. Hermoso libro, un poco diferente a lo habitual porque acerca a la historia de una forma divertida que despierta la curiosidad de los más pequeños. ¡¡Mi niña de 4 años, después de terminarlo, preguntó si la llevábamos a ver las excavaciones a Roma!! Muy recomendado, lectura amena y no pesada, apto a partir de los 2 años, ¡¡ilustraciones preciosas!!",
      nl: "Om de nieuwsgierigheid te prikkelen. Prachtig boek, net even anders dan gewoonlijk omdat het op een leuke manier naar de geschiedenis toeleidt en de kleintjes nieuwsgierig maakt. Mijn 4-jarige dochter vroeg na het uitlezen of we haar mee konden nemen naar de opgravingen in Rome!! Zeer aanbevolen, fijn en niet te zwaar om te lezen, geschikt vanaf 2 jaar, hele mooie illustraties!!",
      pl: "Żeby rozbudzić ciekawość. Przepiękna książka, nieco inna niż zwykle, bo przybliża historię w zabawny sposób, który ciekawi maluchy. Moja 4-letnia córeczka po jej skończeniu zapytała, czy zabierzemy ją zobaczyć wykopaliska w Rzymie!! Gorąco polecam, wspaniała i lekka lektura, odpowiednia od 2 lat, bardzo piękne ilustracje!!",
      sv: "För att väcka nyfikenheten. Jättefin bok, lite annorlunda än vanligt eftersom den närmar sig historien på ett roligt sätt som fångar barnens intresse. Min 4-åriga flicka frågade efter att ha läst ut den om vi kunde ta med henne för att titta på utgrävningarna i Rom!! Rekommenderas varmt, fin och lättläst, passar från 2 år, jättefina illustrationer!!",
      ja: "好奇心を刺激するために。普段とはひと味違う素晴らしい本で、楽しく子どもたちの興味を惹きつけながら歴史に触れさせてくれます。4歳の娘は読み終えた後、「ローマの発掘現場を見に連れて行って！」と聞いてきました！！ 心からおすすめ、美しく読みやすい内容で、2歳から楽しめ、イラストもとても綺麗です！！"
    }
  },
  {
    reviewer: "Edoardo Gattei",
    rating: 5,
    text: {
      it: "Super!! Consigliata da un amico, questa collana si è rivelata una piacevolissima sorpresa. Mio figlio adora tutti i personaggi e la lettura di questi libri è entrata a far parte del nostro rituale della nanna! Un must have per tutti i bimbi amanti dei libri e appassionati di ruspe/ trattori ...",
      en: "Super!! Recommended by a friend, this series turned out to be a delightful surprise. My son loves all the characters and reading these books has become part of our bedtime routine! A must-have for all little ones who love books and are passionate about bulldozers/tractors...",
      de: "Super!! Von einem Freund empfohlen, hat sich diese Reihe als eine äußerst erfreuliche Überraschung erwiesen. Mein Sohn liebt alle Charaktere und das Lesen dieser Bücher ist Teil unseres Einschlafrituals geworden! Ein Must-have für alle Kinder, die Bücher lieben und von Baggern/Traktoren begeistert sind ...",
      fr: "Super !! Conseillée par un ami, cette collection s'est avérée être une très agréable surprise. Mon fils adore tous les personnages et la lecture de ces livres fait désormais partie de notre rituel du coucher ! Un must-have pour tous les petits amateurs de livres et passionnés de pelleteuses/tracteurs...",
      es: "¡¡Súper!! Recomendada por un amigo, esta colección resultó ser una sorpresa muy agradable. ¡A mi hijo le encantan todos los personajes y la lectura de estos libros se ha convertido en parte de nuestro ritual para ir a dormir! Un imprescindible para todos los niños amantes de los libros y apasionados de las excavadoras/tractores...",
      nl: "Super!! Aanbevolen door een vriend, bleek deze reeks een buitengewoon aangename verrassing. Mijn zoon is dol op alle personages en het lezen van deze boeken is vast onderdeel van ons bedtijdritueel geworden! Een must-have voor alle kindjes die van boeken houden en dol zijn op graafmachines/tractoren...",
      pl: "Super!! Polecona przez znajomego, ta seria okazała się przemiłą niespodzianką. Mój syn uwielbia wszystkich bohaterów, a czytanie tych książeczek stało się częścią naszego rytuału zasypiania! Obowiązkowa pozycja dla wszystkich dzieci kochających książki i zafascynowanych koparkami/traktorami...",
      sv: "Super!! Rekommenderad av en vän, den här serien visade sig vara en mycket trevlig överraskning. Min son älskar alla karaktärer och läsningen av dessa böcker har blivit en del av vår godnattsrutin! Ett måste för alla barn som älskar böcker och är förtjusta i grävskopor/traktorer...",
      ja: "最高です！！ 友人に勧められて購入しましたが、このシリーズは嬉しい驚きでした。息子はすべてのキャラクターが大好きで、この本を読むことが寝かしつけの習慣になりました！ 絵本が好きなお子さんや、ショベルカーやトラクターが大好きな子どもたちには必携の一冊です……"
    }
  },
  {
    reviewer: "chiara",
    rating: 5,
    text: {
      it: "Papere da salvare. Libro molto carino per imparare a rispettare gli animali che ci circondano e che i bambini vedono nella loro quotidianità, da educatrice apprezzo libri del genere. Facile e comprensibile, con immagini utili alla comprensione dei più piccoli, e scrittura in stampato maiuscolo per i più grandi.",
      en: "Ducks to rescue. Very sweet book for learning to respect the animals around us that children see in their daily lives; as an educator, I truly appreciate books of this kind. Easy and understandable, with images that help little ones comprehend, and uppercase print text for older children.",
      de: "Enten zu retten. Sehr schönes Buch, um den Respekt vor den Tieren zu lernen, die uns umgeben und die Kinder in ihrem Alltag sehen; als Erzieherin schätze ich solche Bücher sehr. Leicht und verständlich, mit Bildern, die den Kleinsten beim Verstehen helfen, und Druckschrift in Großbuchstaben für die Größeren.",
      fr: "Des canards à sauver. Très joli livre pour apprendre à respecter les animaux qui nous entourent et que les enfants voient dans leur quotidien ; en tant qu'éducatrice, j'apprécie beaucoup ce genre de livres. Facile et compréhensible, avec des images utiles à la compréhension des plus petits, et une écriture en majuscules d'imprimerie pour les plus grands.",
      es: "Patos para salvar. Libro muy bonito para aprender a respetar a los animales que nos rodean y que los niños ven en su vida cotidiana; como educadora, aprecio mucho libros de este tipo. Fácil y comprensible, con imágenes útiles para la comprensión de los más pequeños, y letra mayúscula de imprenta para los más grandes.",
      nl: "Eendjes om te redden. Heel lief boekje om respect te leren voor de dieren om ons heen die kinderen in hun dagelijks leven zien; als opvoedster waardeer ik dit soort boeken enorm. Eenvoudig en begrijpelijk, met illustraties die kleintjes helpen het verhaal te begrijpen, en hoofdletters in blokschrift voor de grotere kinderen.",
      pl: "Kaczuszki do uratowania. Bardzo ładna książeczka do nauki szacunku dla zwierząt, które nas otaczają i które dzieci widzą na co dzień; jako pedagożka bardzo cenię tego typu książki. Prosta i zrozumiała, z ilustracjami pomagającymi w zrozumieniu najmłodszym i drukowanymi dużymi literami dla starszaków.",
      sv: "Änder att rädda. Mycket fin bok för att lära sig respektera djuren runt omkring oss som barnen möter i sin vardag; som pedagog uppskattar jag verkligen sådana här böcker. Lätt och begriplig, med bilder som underlättar förståelsen för de minsta, och text i versaler för de lite äldre.",
      ja: "助けを待つアヒルたち。子どもたちが日常で目にする身近な動物たちを大切にする心を育てる、とても素敵な絵本です。教育関係者として、こうした絵本を高く評価しています。わかりやすく読みやすい内容で、小さな子の理解を助ける絵と、少し大きくなった子のための読みやすい文字が使われています。"
    }
  },
  {
    reviewer: "Martina",
    rating: 5,
    text: {
      it: "CONSIGLIATISSIMO. Primo che abbiamo preso della collana, li prenderemo tutti! Semplice e intuitivo, mio figlio lo adora!",
      en: "HIGHLY RECOMMENDED. First one we got from the series, we will get them all! Simple and intuitive, my son loves it!",
      de: "WÄRMSTENS EMPFOHLEN. Das erste, das wir aus der Reihe gekauft haben, wir werden sie alle holen! Einfach und intuitiv, mein Sohn liebt es!",
      fr: "VIVEMENT RECOMMANDÉ. Le premier que nous achetons dans la collection, nous allons tous les prendre ! Simple et intuitif, mon fils l'adore !",
      es: "MUY RECOMENDADO. El primero que compramos de la colección, ¡nos haremos con todos! Sencillo e intuitivo, ¡a mi hijo le encanta!",
      nl: "ZEER AANBEVOLEN. De eerste die we van de reeks hebben gekocht, we gaan ze allemaal halen! Eenvoudig en intuïtief, mijn zoon is er dol op!",
      pl: "GORĄCO POLECAM. Pierwsza, którą kupiliśmy z tej serii, kupimy wszystkie! Prosta i intuicyjna, mój syn ją uwielbia!",
      sv: "REKOMMENDERAS VARMT. Den första vi köpte ur serien, vi kommer att köpa alla! Enkel och intuitiv, min son älskar den!",
      ja: "心からおすすめ。シリーズで最初に手にした1冊ですが、全部揃えるつもりです！ シンプルで直感的にわかりやすく、息子も夢中になっています！"
    }
  },
  {
    reviewer: "Mattia B.",
    rating: 5,
    text: {
      it: "Colorato e divertente. La mia bimba di 20 mesi ha gradito il regalo, disegni curati e storia divertente per i bambini.",
      en: "Colorful and fun. My 20-month-old girl enjoyed the gift, well-crafted drawings and a fun story for children.",
      de: "Farbenfroh und unterhaltsam. Meiner 20 Monate alten Tochter hat das Geschenk gefallen, liebevolle Zeichnungen und eine lustige Geschichte für Kinder.",
      fr: "Coloré et amusant. Ma petite fille de 20 mois a beaucoup apprécié le cadeau, des dessins soignés et une histoire amusante pour les enfants.",
      es: "Colorido y divertido. A mi niña de 20 meses le gustó el regalo, dibujos cuidados y una historia divertida para los niños.",
      nl: "Kleurrijk en leuk. Mijn 20 maanden oude dochter vond het een geweldig cadeau, verzorgde tekeningen en een leuk verhaal voor kinderen.",
      pl: "Kolorowa i zabawna. Mojej 20-miesięcznej córeczce prezent bardzo się spodobał, staranne rysunki i ciekawa historia dla dzieci.",
      sv: "Färgglad och rolig. Min 20 månader gamla flicka uppskattade presenten, fina teckningar och en rolig berättelse för barnen.",
      ja: "カラフルで楽しい。20か月の娘はこのプレゼントをとても喜びました。丁寧なイラストと子ども向けの楽しいお話です。"
    }
  },
  {
    reviewer: "Eleonora",
    rating: 5,
    text: {
      it: "Bruno il camion e lo stagno delle papere. Attraverso questa storia emergono diversi temi importanti per la crescita dei bambini, come l'empatia, la solidarietà e il desiderio di aiutare il prossimo. Il racconto trasmette valori positivi e invita il lettore a riflettere sull'importanza della gentilezza e della collaborazione. Inoltre, le immagini sono curate e coinvolgenti: accompagnano il testo, rendono la lettura più piacevole e aiutano a comprendere meglio la storia e le emozioni dei personaggi.",
      en: "Bruno the dump truck and the duck pond. Through this story, several important themes for children's growth emerge, such as empathy, solidarity, and the desire to help others. The tale conveys positive values and invites the reader to reflect on the importance of kindness and collaboration. In addition, the illustrations are refined and engaging: they accompany the text, make reading more enjoyable, and help to better understand the story and the emotions of the characters.",
      de: "Bruno der Lastwagen und der Ententeich. Durch diese Geschichte kommen verschiedene wichtige Themen für das Heranwachsen von Kindern zum Vorschein, wie Empathie, Solidarität und der Wunsch, anderen zu helfen. Die Erzählung vermittelt positive Werte und lädt dazu ein, über die Bedeutung von Freundlichkeit und Zusammenarbeit nachzudenken. Zudem sind die Bilder liebevoll und fesselnd: Sie begleiten den Text, machen das Lesen angenehmer und helfen, die Geschichte und die Gefühle der Figuren besser zu verstehen.",
      fr: "Bruno le camion et la mare aux canards. À travers cette histoire émergent plusieurs thèmes importants pour le développement des enfants, tels que l'empathie, la solidarité et le désir d'aider son prochain. Le récit transmet des valeurs positives et invite le lecteur à réfléchir sur l'importance de la gentillesse et de la collaboration. De plus, les illustrations sont soignées et captivantes : elles accompagnent le texte, rendent la lecture plus agréable et aident à mieux comprendre l'histoire et les émotions des personnages.",
      es: "Bruno el camión y el estanque de los patos. A través de este cuento surgen varios temas importantes para el crecimiento de los niños, como la empatía, la solidaridad y el deseo de ayudar al prójimo. El relato transmite valores positivos e invita al lector a reflexionar sobre la importancia de la amabilidad y la colaboración. Además, las ilustraciones son cuidadas y envolventes: acompañan al texto, hacen la lectura más agradable y ayudan a comprender mejor la historia y las emociones de los personajes.",
      nl: "Bruno de kiepauto en de eendenvijver. Door dit verhaal komen verschillende belangrijke thema's voor de ontwikkeling van kinderen naar voren, zoals empathie, solidariteit en de wens om anderen te helpen. Het verhaal brengt positieve waarden over en nodigt de lezer uit om na te denken over het belang van vriendelijkheid en samenwerking. Bovendien zijn de illustraties verzorgd en meeslepend: ze vergezellen de tekst, maken het lezen aangenamer en helpen het verhaal en de emoties van de personages beter te begrijpen.",
      pl: "Bruno wywrotka i staw z kaczuszkami. Poprzez tę historię wyłania się kilka ważnych tematów dla rozwoju dzieci, takich jak empatia, solidarność i chęć pomocy innym. Opowieść przekazuje pozytywne wartości i zachęca czytelnika do refleksji nad znaczeniem życzliwości i współpracy. Ponadto ilustracje są staranne i wciągające: towarzyszą tekstowi, czynią czytanie przyjemniejszym i pomagają lepiej zrozumieć historię oraz emocje bohaterów.",
      sv: "Lastbilen Bruno och ankdammen. Genom den här sagan lyfts flera viktiga teman för barns utveckling fram, såsom empati, solidaritet och viljan att hjälpa andra. Berättelsen förmedlar positiva värderingar och bjuder in läsaren att reflektera över vikten av vänlighet och samarbete. Dessutom är bilderna välgjorda och fängslande: de ackompanjerar texten, gör läsningen mer njutbar och hjälper till att bättre förstå historien och karaktärernas känslor.",
      ja: "ダンプカーのブルーノとアヒルの池。この物語を通じて、思いやりや助け合い、他者を助けたいという気持ちなど、子どもの成長に欠かせない数々の大切なテーマが描かれています。前向きな価値観を伝え、優しさと協力の大切さについて考えさせてくれるお話です。さらに、丁寧で魅力的なイラストが文章に寄り添い、読書をより楽しいものにしながら、物語や登場人物の感情への理解を深めてくれます。"
    }
  },
  {
    reviewer: "Erdunga",
    rating: 5,
    text: {
      it: "Mio figlio li adora! È incredibile quanto questi libri abbiano aiutato mio figlio a rilassarsi prima di andare a dormire. Leggerli insieme la sera è diventato un momento speciale della nostra routine e lo accompagnano dolcemente verso il sonno. Li adora letteralmente e ogni sera non vede l'ora di sceglierne uno. Li consiglio davvero a chi cerca letture piacevoli e rilassanti per i più piccoli.",
      en: "My son loves them! It is incredible how much these books have helped my son relax before going to sleep. Reading them together in the evening has become a special moment of our routine and gently eases him into sleep. He literally adores them and every evening can't wait to pick one. I truly recommend them to anyone looking for pleasant and relaxing reads for the little ones.",
      de: "Mein Sohn liebt sie! Es ist unglaublich, wie sehr diese Bücher meinem Sohn geholfen haben, sich vor dem Schlafengehen zu entspannen. Sie abends gemeinsam zu lesen, ist zu einem besonderen Moment unserer Routine geworden und begleitet ihn sanft in den Schlaf. Er liebt sie buchstäblich und kann es jeden Abend kaum erwarten, sich eines auszusuchen. Ich empfehle sie wirklich jedem, der angenehme und entspannende Lektüre für die Kleinen sucht.",
      fr: "Mon fils les adore ! C'est incroyable à quel point ces livres ont aidé mon fils à se détendre avant d'aller dormir. Les lire ensemble le soir est devenu un moment privilégié de notre routine et l'accompagne doucement vers le sommeil. Il les adore littéralement et chaque soir, il a hâte d'en choisir un. Je les recommande vivement à tous ceux qui recherchent des lectures agréables et apaisantes pour les plus petits.",
      es: "¡Mi hijo los adora! Es increíble cuánto han ayudado estos libros a mi hijo a relajarse antes de ir a dormir. Leerlos juntos por la noche se ha convertido en un momento especial de nuestra rutina y lo acompañan dulcemente hacia el sueño. Literalmente los adora y cada noche está deseando elegir uno. Los recomiendo de verdad a cualquiera que busque lecturas agradables y relajantes para los más pequeños.",
      nl: "Mijn zoon is er dol op! Het is ongelooflijk hoeveel deze boeken mijn zoon hebben geholpen om te ontspannen voor het slapengaan. Ze 's avonds samen lezen is een bijzonder moment in onze routine geworden en begeleidt hem zachtjes naar de slaap. Hij is er letterlijk dol op en kan elke avond niet wachten om er eentje te kiezen. Ik raad ze echt aan voor wie op zoek is naar prettige en ontspannende verhalen voor de kleintjes.",
      pl: "Mój syn je uwielbia! To niesamowite, jak bardzo te książki pomogły mojemu synowi wyciszyć się przed snem. Wspólne czytanie wieczorem stało się wyjątkową częścią naszej rutyny i łagodnie prowadzi go w stronę snu. Dosłownie je uwielbia i każdego wieczoru nie może się doczekać, aż wybierze jedną z nich. Z całego serca polecam je każdemu, kto szuka przyjemnych i wyciszających lektur dla najmłodszych.",
      sv: "Min son älskar dem! Det är otroligt hur mycket de här böckerna har hjälpt min son att varva ner innan han ska sova. Att läsa dem tillsammans på kvällen har blivit en speciell stund i vår rutin och vaggar honom mjukt till sömns. Han fullkomligt älskar dem och ser varje kväll fram emot att välja en. Jag rekommenderar dem verkligen till alla som söker trevlig och lugnande läsning för de små.",
      ja: "息子が大のお気に入りです！ この本が寝る前の息子のリラックスにどれほど役立ったか、驚くほどです。夜に一緒に読むことが日課の特別な時間になり、心地よい眠りへと優しく導いてくれます。息子は文字通り夢中になっていて、毎晩どれを読もうか選ぶのが待ちきれない様子です。小さな子のための心地よくリラックスできる本を探している方に、心からおすすめします。"
    }
  }
];

const reviewsSliderState = {
  currentIndex: 0,
  touchStartX: 0,
  touchEndX: 0,
  initialized: false
};

function getVisibleReviewCardsCount() {
  const width = window.innerWidth;
  if (width > 1024) return 3;
  if (width > 640) return 2;
  return 1;
}

function getMaxReviewIndex() {
  const visible = getVisibleReviewCardsCount();
  return Math.max(0, AMAZON_REVIEWS.length - visible);
}

function initReviewsSlider() {
  const track = document.getElementById('reviews-slider-track');
  const carousel = document.getElementById('reviews-carousel');
  const prevBtn = document.getElementById('reviews-prev-btn');
  const nextBtn = document.getElementById('reviews-next-btn');

  if (!track || !carousel) return;

  renderReviewCards();
  updateReviewsSliderPosition();
  renderReviewIndicators();

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      slideReviews(-1);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      slideReviews(1);
    };
  }

  if (!reviewsSliderState.initialized) {
    reviewsSliderState.initialized = true;

    // Keyboard navigation on carousel
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        slideReviews(-1);
      } else if (e.key === 'ArrowRight') {
        slideReviews(1);
      }
    });

    // Touch swipe support
    carousel.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        reviewsSliderState.touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        reviewsSliderState.touchEndX = e.changedTouches[0].clientX;
        const diff = reviewsSliderState.touchStartX - reviewsSliderState.touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            slideReviews(1);
          } else {
            slideReviews(-1);
          }
        }
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      const maxIdx = getMaxReviewIndex();
      if (reviewsSliderState.currentIndex > maxIdx) {
        reviewsSliderState.currentIndex = maxIdx;
      }
      updateReviewsSliderPosition();
      renderReviewIndicators();
    });
  }

  updateReviewsTranslations(currentLanguage);
}

function renderReviewCards() {
  const track = document.getElementById('reviews-slider-track');
  if (!track) return;

  const strings = I18N[currentLanguage] || I18N.it;
  const ratingLabel = strings.reviewsRatingLabel || 'Valutazione: ';
  const amazonSource = strings.reviewsAmazonSource || 'Recensione Amazon';

  track.innerHTML = AMAZON_REVIEWS.map((review, idx) => {
    const initial = review.reviewer.charAt(0).toUpperCase();
    const reviewText = (typeof review.text === 'object' && review.text[currentLanguage])
      ? review.text[currentLanguage]
      : (review.text.it || review.text);
    return `
      <article class="review-card" data-review-index="${idx}">
        <div class="review-card-header">
          <div class="review-stars" aria-label="${escapeHtml(ratingLabel)} 5/5">
            <span class="review-rating-label">${escapeHtml(ratingLabel)}</span>
            <span class="review-stars-icons" aria-hidden="true">★★★★★</span>
          </div>
          <span class="review-quote-mark" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </span>
        </div>
        <div class="review-body">
          <p class="review-text">"${escapeHtml(reviewText)}"</p>
        </div>
        <div class="review-card-footer">
          <div class="reviewer-meta">
            <div class="reviewer-avatar" aria-hidden="true">${escapeHtml(initial)}</div>
            <h3 class="reviewer-name">${escapeHtml(review.reviewer)}</h3>
          </div>
          <div class="review-amazon-badge" title="Recensione autentica da Amazon">
            <img src="assets/amazon-logo.jpg" alt="Amazon" class="review-amazon-img" width="18" height="18" />
            <span class="amazon-label-text">${escapeHtml(amazonSource)}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function slideReviews(direction) {
  const maxIndex = getMaxReviewIndex();
  let nextIndex = reviewsSliderState.currentIndex + direction;
  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex > maxIndex) nextIndex = maxIndex;

  reviewsSliderState.currentIndex = nextIndex;
  updateReviewsSliderPosition();
  updateReviewIndicators();
}

function goToReviewSlide(index) {
  const maxIndex = getMaxReviewIndex();
  reviewsSliderState.currentIndex = Math.min(Math.max(0, index), maxIndex);
  updateReviewsSliderPosition();
  updateReviewIndicators();
}

function updateReviewsSliderPosition() {
  const track = document.getElementById('reviews-slider-track');
  const prevBtn = document.getElementById('reviews-prev-btn');
  const nextBtn = document.getElementById('reviews-next-btn');
  if (!track) return;

  const firstCard = track.querySelector('.review-card');
  if (!firstCard) return;

  const cardWidth = firstCard.offsetWidth;
  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap) || 24;

  const offset = reviewsSliderState.currentIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;

  const maxIndex = getMaxReviewIndex();
  if (prevBtn) {
    prevBtn.disabled = (reviewsSliderState.currentIndex === 0);
  }
  if (nextBtn) {
    nextBtn.disabled = (reviewsSliderState.currentIndex >= maxIndex);
  }
}

function renderReviewIndicators() {
  const indicators = document.getElementById('reviews-indicators');
  if (!indicators) return;

  const maxIndex = getMaxReviewIndex();
  const totalDots = maxIndex + 1;

  if (totalDots <= 1) {
    indicators.style.display = 'none';
    return;
  }

  indicators.style.display = 'flex';
  let dotsHtml = '';
  for (let i = 0; i < totalDots; i++) {
    const isActive = i === reviewsSliderState.currentIndex;
    dotsHtml += `
      <button type="button" 
              class="reviews-dot ${isActive ? 'active' : ''}" 
              data-dot-index="${i}" 
              role="tab" 
              aria-selected="${isActive ? 'true' : 'false'}" 
              aria-label="Gruppo recensioni ${i + 1} di ${totalDots}">
      </button>
    `;
  }
  indicators.innerHTML = dotsHtml;

  indicators.querySelectorAll('.reviews-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const dotIdx = parseInt(dot.getAttribute('data-dot-index'), 10);
      if (!isNaN(dotIdx)) {
        goToReviewSlide(dotIdx);
      }
    });
  });
}

function updateReviewIndicators() {
  const dots = document.querySelectorAll('.reviews-dot');
  dots.forEach((dot, idx) => {
    const isActive = idx === reviewsSliderState.currentIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function updateReviewsTranslations(lang) {
  const strings = I18N[lang] || I18N.it;
  setText('reviews-section-title', strings.reviewsTitle || 'Cosa Dicono i Genitori');

  const prevBtn = document.getElementById('reviews-prev-btn');
  const nextBtn = document.getElementById('reviews-next-btn');
  if (prevBtn && strings.reviewsPrevAria) {
    prevBtn.setAttribute('aria-label', strings.reviewsPrevAria);
    prevBtn.title = strings.reviewsPrevAria;
  }
  if (nextBtn && strings.reviewsNextAria) {
    nextBtn.setAttribute('aria-label', strings.reviewsNextAria);
    nextBtn.title = strings.reviewsNextAria;
  }

  const track = document.getElementById('reviews-slider-track');
  if (track) {
    const ratingLabel = strings.reviewsRatingLabel || 'Valutazione: ';
    const amazonSource = strings.reviewsAmazonSource || 'Recensione Amazon';

    track.querySelectorAll('.review-rating-label').forEach(el => {
      el.textContent = ratingLabel;
    });
    track.querySelectorAll('.review-stars').forEach(el => {
      el.setAttribute('aria-label', ratingLabel + '5/5');
    });
    track.querySelectorAll('.amazon-label-text').forEach(el => {
      el.textContent = amazonSource;
    });

    track.querySelectorAll('.review-card').forEach(card => {
      const idx = parseInt(card.getAttribute('data-review-index'), 10);
      const review = AMAZON_REVIEWS[idx];
      if (review) {
        const textEl = card.querySelector('.review-text');
        const reviewText = (typeof review.text === 'object' && review.text[lang])
          ? review.text[lang]
          : (review.text.it || review.text);
        if (textEl) {
          textEl.textContent = `"${reviewText}"`;
        }
      }
    });
  }
}

/* ==========================================================================
   AUTHOR PAGE: ORIGINS CAROUSEL CONTROLLER
   ========================================================================== */

const authorCarouselState = {
  currentIndex: 0,
  totalSlides: 10,
  timer: null,
  resumeTimer: null,
  intervalMs: 5000,
  isPaused: false,
  touchStartX: 0,
  touchEndX: 0,
  initialized: false
};

function initAuthorCarousel() {
  const container = document.getElementById('author-carousel');
  if (!container) return;

  const slides = container.querySelectorAll('.author-carousel-slide');
  const dots = container.querySelectorAll('.author-dot');
  const prevBtn = document.getElementById('author-carousel-prev');
  const nextBtn = document.getElementById('author-carousel-next');

  if (!slides || slides.length === 0) return;
  authorCarouselState.totalSlides = slides.length;

  function showAuthorSlide(index) {
    const total = authorCarouselState.totalSlides;
    index = ((index % total) + total) % total;
    authorCarouselState.currentIndex = index;

    slides.forEach((slide, idx) => {
      const isActive = (idx === index);
      if (isActive) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    dots.forEach((dot, idx) => {
      const isActive = (idx === index);
      if (isActive) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    scheduleNextSlide();
  }

  function scheduleNextSlide() {
    clearTimeout(authorCarouselState.timer);
    if (authorCarouselState.isPaused || authorCarouselState.totalSlides <= 1) return;
    authorCarouselState.timer = setTimeout(() => {
      showAuthorSlide(authorCarouselState.currentIndex + 1);
    }, authorCarouselState.intervalMs);
  }

  function pauseAndScheduleResume(delayMs = 6000) {
    authorCarouselState.isPaused = true;
    clearTimeout(authorCarouselState.timer);
    clearTimeout(authorCarouselState.resumeTimer);
    authorCarouselState.resumeTimer = setTimeout(() => {
      authorCarouselState.isPaused = false;
      scheduleNextSlide();
    }, delayMs);
  }

  if (!authorCarouselState.initialized) {
    authorCarouselState.initialized = true;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        pauseAndScheduleResume();
        showAuthorSlide(authorCarouselState.currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        pauseAndScheduleResume();
        showAuthorSlide(authorCarouselState.currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        pauseAndScheduleResume();
        showAuthorSlide(idx);
      });
    });

    // Pause on hover
    container.addEventListener('mouseenter', () => {
      authorCarouselState.isPaused = true;
      clearTimeout(authorCarouselState.timer);
    });

    container.addEventListener('mouseleave', () => {
      authorCarouselState.isPaused = false;
      scheduleNextSlide();
    });

    // Accessible keyboard navigation
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        pauseAndScheduleResume();
        showAuthorSlide(authorCarouselState.currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        pauseAndScheduleResume();
        showAuthorSlide(authorCarouselState.currentIndex + 1);
      }
    });

    // Touch swipe support for smartphone
    container.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        authorCarouselState.touchStartX = e.touches[0].clientX;
      }
      authorCarouselState.isPaused = true;
      clearTimeout(authorCarouselState.timer);
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        authorCarouselState.touchEndX = e.changedTouches[0].clientX;
        const diff = authorCarouselState.touchStartX - authorCarouselState.touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            showAuthorSlide(authorCarouselState.currentIndex + 1);
          } else {
            showAuthorSlide(authorCarouselState.currentIndex - 1);
          }
        }
      }
      pauseAndScheduleResume(5000);
    }, { passive: true });
  }

  showAuthorSlide(0);
}





/* ==========================================================================
   FANO CAROUSELS (PAGINE ORIGINALI & ILLUSTRAZIONI COLORATE)
   ========================================================================== */
function initFanoSliders() {
  if (document.getElementById('fano-slider-pages')) {
    initSingleFanoSlider({
      sliderId: 'fano-slider-pages',
      trackId: 'fano-pages-track',
      prevBtnId: 'fano-pages-prev',
      nextBtnId: 'fano-pages-next',
      dotsId: 'fano-pages-dots'
    });
  }
  if (document.getElementById('fano-slider-colored')) {
    initSingleFanoSlider({
      sliderId: 'fano-slider-colored',
      trackId: 'fano-colored-track',
      prevBtnId: 'fano-colored-prev',
      nextBtnId: 'fano-colored-next',
      dotsId: 'fano-colored-dots'
    });
  }
}

function initSingleFanoSlider(opts) {
  const slider = document.getElementById(opts.sliderId);
  const track = document.getElementById(opts.trackId);
  const prevBtn = document.getElementById(opts.prevBtnId);
  const nextBtn = document.getElementById(opts.nextBtnId);
  const dotsContainer = document.getElementById(opts.dotsId);

  if (!slider || !track) return;

  const cards = track.children;
  const totalCards = cards.length;
  if (totalCards === 0) return;

  let currentIndex = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  function getMaxIndex() {
    const visible = getVisibleCount();
    return Math.max(0, totalCards - visible);
  }

  function updateDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxIndex();
    const count = maxIdx + 1;
    if (count <= 1) {
      dotsContainer.style.display = 'none';
      return;
    }
    dotsContainer.style.display = 'flex';
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'fano-slider-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.onclick = () => {
        currentIndex = i;
        updatePosition();
      };
      dotsContainer.appendChild(dot);
    }
  }

  function updatePosition() {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    if (currentIndex < 0) currentIndex = 0;

    const firstCard = cards[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = 'translateX(-' + offset + 'px)';

    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex >= maxIdx);

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.fano-slider-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updatePosition();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      updatePosition();
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      } else {
        currentIndex = Math.max(0, currentIndex - 1);
      }
      updatePosition();
    }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateDots();
      updatePosition();
    }, 100);
  });

  updateDots();
  updatePosition();
}
