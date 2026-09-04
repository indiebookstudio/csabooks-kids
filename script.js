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
    heroSubtitle: "Grandi avventure per piccoli lettori",
    heroBannerAlt: "CSA Books 4 Kids - Grandi avventure per piccoli lettori",
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
    footerAbout: "Storie e libri illustrati pensati per accendere la fantasia e la curiosità dei più piccoli.",
    copyright: "© 2026 CSA Books 4 Kids. Tutti i diritti riservati."
    ,
    navBooks: "I Libri",
    navAbout: "Chi siamo",
    aboutPageTitle: "Chi c'è dietro CSA Books 4 Kids",
    aboutMetaTitle: "Chi siamo | CSA Books 4 Kids",
    aboutMetaDesc: "Scopri Marco Salucci, autore e creatore di CSA Books 4 Kids: libri illustrati e storie per bambini nate dalla passione per camion, ruspe e cantieri.",
    aboutBadge: "L'Autore",
    aboutAuthorRole: "Autore e creatore di CSA Books 4 Kids",
    aboutStoryTitle: "La storia dietro CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci è un autore e creatore italiano di libri per bambini. Vive in Trentino-Alto Adige, circondato dalle montagne e dalla natura, che spesso alimentano la sua immaginazione e il suo modo di raccontare.",
    aboutBioP2: "Da sempre ama insegnare e trasmettere conoscenze, convinto che una storia possa essere molto più di un semplice passatempo: può diventare un piccolo ponte tra crescita, curiosità e divertimento.",
    aboutBioP3: "La sua più grande ispirazione è suo figlio. È stata proprio la sua passione per camion, ruspe, gru e cantieri a dare vita a Le Avventure del Cantiere, una collana pensata per i bambini curiosi e per tutti quelli che rimangono affascinati dalle grandi macchine protagoniste di piccole grandi avventure.",
    aboutInspirationText: "Una passione per camion, ruspe e cantieri ha fatto nascere un intero mondo di storie.",
    aboutBioP4: "Nei suoi libri Marco cerca di creare qualcosa che vada oltre la semplice lettura: momenti da condividere tra genitori e figli, attraverso storie semplici, emozioni, gioco e scoperta.",
    aboutBioP5: "Il suo obiettivo è riportare la lettura al centro del tempo trascorso insieme e offrire ai bambini storie capaci di farli sorridere, immaginare e imparare, lontano per qualche momento dai piccoli schermi.",
    aboutClosingText: "Perché le storie più belle non sono solo quelle che i bambini leggono, ma quelle che genitori e figli vivono insieme.",
    aboutCtaBtn: "Scopri i nostri libri"
  },
  en: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Big adventures for little readers",
    heroBannerAlt: "CSA Books 4 Kids - Big adventures for little readers",
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
    footerAbout: "Inspiring picture books designed to spark young imaginations and curious minds.",
    copyright: "© 2026 CSA Books 4 Kids. All rights reserved."
    ,
    navBooks: "Books",
    navAbout: "About",
    aboutPageTitle: "Meet the Creator Behind CSA Books 4 Kids",
    aboutMetaTitle: "About | CSA Books 4 Kids",
    aboutMetaDesc: "Meet Marco Salucci, author and creator of CSA Books 4 Kids: inspiring children's picture books born from a real love for trucks, excavators, and construction adventures.",
    aboutBadge: "About the Creator",
    aboutAuthorRole: "Author & Creator of CSA Books 4 Kids",
    aboutStoryTitle: "The Story Behind CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci is an Italian author and creator of children's books. He lives in Trentino-Alto Adige, surrounded by mountains and nature, which often fuel his imagination and storytelling.",
    aboutBioP2: "He has always loved teaching and sharing knowledge, believing that a story can be so much more than a pastime: it can become a gentle bridge connecting growth, curiosity, and fun.",
    aboutBioP3: "His greatest inspiration is his son. It was his passion for trucks, diggers, cranes, and construction sites that sparked Le Avventure del Cantiere (Construction Site Adventures) — a book series created for curious little readers and anyone fascinated by big machines starring in big little adventures.",
    aboutInspirationText: "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    aboutBioP4: "Through his books, Marco strives to create something that goes beyond reading: meaningful moments to share between parents and children through simple storytelling, emotion, play, and discovery.",
    aboutBioP5: "His goal is to bring shared reading back to the heart of family time, offering children stories that inspire them to smile, imagine, and learn — away from screens, even just for a while.",
    aboutClosingText: "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    aboutCtaBtn: "Discover our books"
  },
  de: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Große Abenteuer für kleine Leser",
    heroBannerAlt: "CSA Books 4 Kids - Große Abenteuer für kleine Leser",
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
    footerAbout: "Inspirierende Bilderbücher, die Fantasie und Neugier kleiner Leser wecken.",
    copyright: "© 2026 CSA Books 4 Kids. Alle Rechte vorbehalten."
    ,
    navBooks: "Bücher",
    navAbout: "Über uns",
    aboutPageTitle: "Wer hinter CSA Books 4 Kids steckt",
    aboutMetaTitle: "Über uns | CSA Books 4 Kids",
    aboutMetaDesc: "Lerne Marco Salucci kennen, Autor und Gründer von CSA Books 4 Kids: Bilderbücher und Geschichten voller Baustellen-Abenteuer für Kinder.",
    aboutBadge: "Der Autor",
    aboutAuthorRole: "Autor und Gründer von CSA Books 4 Kids",
    aboutStoryTitle: "Die Geschichte hinter CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci ist ein italienischer Autor und Schöpfer von Kinderbüchern. Er lebt in Trentino-Südtirol, umgeben von Bergen und Natur, die seine Fantasie und sein Geschichtenerzählen inspirieren.",
    aboutBioP2: "Er liebt es zu unterrichten und Wissen weiterzugeben. Er ist überzeugt, dass eine Geschichte viel mehr als ein Zeitvertreib sein kann: eine Brücke zwischen Wachstum, Neugier und Freude.",
    aboutBioP3: "Seine größte Inspiration ist sein Sohn. Aus dessen Begeisterung für Lastwagen, Bagger, Kräne und Baustellen entstand die Reihe 'Le Avventure del Cantiere' (Baustellenabenteuer) für neugierige Kinder.",
    aboutInspirationText: "Aus der Begeisterung für Lastwagen, Bagger und Baustellen entstand eine ganze Welt voller Geschichten.",
    aboutBioP4: "In seinen Büchern möchte Marco Momente schaffen, die über das Vorlesen hinausgehen: gemeinsame Zeit für Eltern und Kinder voller Emotionen, Spiel und Entdeckungen.",
    aboutBioP5: "Sein Ziel ist es, das gemeinsame Lesen wieder in den Mittelpunkt der Familie zu rücken und Geschichten anzubieten, die Kinder zum Lächeln, Träumen und Lernen anregen – fernab von Bildschirmen.",
    aboutClosingText: "Denn die schönsten Geschichten sind nicht nur die, die Kinder lesen, sondern die, die Eltern und Kinder gemeinsam erleben.",
    aboutCtaBtn: "Entdecke unsere Bücher"
  },
  fr: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "De grandes aventures pour les petits lecteurs",
    heroBannerAlt: "CSA Books 4 Kids - De grandes aventures pour les petits lecteurs",
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
    footerAbout: "Des livres d'images inspirants conçus pour éveiller l'imagination et la curiosité des petits lecteurs.",
    copyright: "© 2026 CSA Books 4 Kids. Tous droits réservés."
    ,
    navBooks: "Livres",
    navAbout: "À propos",
    aboutPageTitle: "Qui est derrière CSA Books 4 Kids",
    aboutMetaTitle: "À propos | CSA Books 4 Kids",
    aboutMetaDesc: "Découvrez Marco Salucci, auteur et créateur de CSA Books 4 Kids : albums illustrés et histoires nées d'une vraie passion pour les camions et les chantiers.",
    aboutBadge: "L'Auteur",
    aboutAuthorRole: "Auteur et créateur de CSA Books 4 Kids",
    aboutStoryTitle: "L'histoire de CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci est un auteur et créateur italien de livres pour enfants. Il vit dans le Trentin-Haut-Adige, entouré par la nature et les montagnes, sources de son inspiration.",
    aboutBioP2: "Il a toujours aimé transmettre le savoir, convaincu qu'une histoire peut devenir un pont précieux entre éveil, curiosité et amusement.",
    aboutBioP3: "Sa plus grande inspiration est son fils. C'est sa passion pour les camions, pelleteuses et chantiers qui a donné vie à la collection 'Le Avventure del Cantiere' pour les petits curieux.",
    aboutInspirationText: "Une passion pour les camions, pelleteuses et chantiers a donné naissance à tout un univers d'histoires.",
    aboutBioP4: "À travers ses livres, Marco cherche à offrir des moments de partage complice entre parents et enfants, faits d'émotion, de jeu et de découverte.",
    aboutBioP5: "Son objectif est de replacer la lecture au cœur des moments en famille, avec des récits qui font sourire et grandir, loin des écrans.",
    aboutClosingText: "Parce que les plus belles histoires ne sont pas seulement celles que les enfants lisent, mais celles que parents et enfants partagent ensemble.",
    aboutCtaBtn: "Découvrir nos livres"
  },
  es: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Grandes aventuras para pequeños lectores",
    heroBannerAlt: "CSA Books 4 Kids - Grandes aventuras para pequeños lectores",
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
    footerAbout: "Libros ilustrados pensados para encender la imaginación y la curiosidad de los más pequeños.",
    copyright: "© 2026 CSA Books 4 Kids. Todos los derechos reservados."
    ,
    navBooks: "Libros",
    navAbout: "Sobre nosotros",
    aboutPageTitle: "Quién está detrás de CSA Books 4 Kids",
    aboutMetaTitle: "Sobre nosotros | CSA Books 4 Kids",
    aboutMetaDesc: "Conoce a Marco Salucci, autor y creador de CSA Books 4 Kids: libros ilustrados y cuentos infantiles nacidos de la pasión por camiones, excavadoras y obras.",
    aboutBadge: "El Autor",
    aboutAuthorRole: "Autor y creador de CSA Books 4 Kids",
    aboutStoryTitle: "La historia detrás de CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci es un autor y creador italiano de libros infantiles. Vive en Trentino-Alto Adigio, rodeado de montañas y naturaleza que alimentan su imaginación.",
    aboutBioP2: "Siempre le ha apasionado enseñar y transmitir conocimientos, convencido de que un cuento es un puente entre el crecimiento, la curiosidad y la diversión.",
    aboutBioP3: "Su mayor inspiración es su hijo. Su fascinación por los camiones, excavadoras y grúas inspiró 'Le Avventure del Cantiere' para pequeños lectores curiosos.",
    aboutInspirationText: "Una pasión por camiones, excavadoras y obras dio origen a todo un mundo de historias.",
    aboutBioP4: "En sus libros, Marco busca crear momentos entrañables para compartir en familia a través de relatos sencillos, emoción, juego y descubrimiento.",
    aboutBioP5: "Su objetivo es situar la lectura en el centro del tiempo en familia, ofreciendo historias que despierten sonrisas e imaginación, lejos de las pantallas.",
    aboutClosingText: "Porque las mejores historias no son solo las que leen los niños, sino las que padres e hijos viven juntos.",
    aboutCtaBtn: "Descubre nuestros libros"
  },
  nl: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Grote avonturen voor kleine lezers",
    heroBannerAlt: "CSA Books 4 Kids - Grote avonturen voor kleine lezers",
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
    footerAbout: "Inspirerende prentenboeken ontworpen om de fantasie en nieuwsgierigheid van kleine lezers te prikkelen.",
    copyright: "© 2026 CSA Books 4 Kids. Alle rechten voorbehouden."
    ,
    navBooks: "Boeken",
    navAbout: "Over ons",
    aboutPageTitle: "Wie zit er achter CSA Books 4 Kids",
    aboutMetaTitle: "Over ons | CSA Books 4 Kids",
    aboutMetaDesc: "Ontmoet Marco Salucci, auteur en bedenker van CSA Books 4 Kids: prentenboeken geboren uit passie voor vrachtwagens en bouwplaatsen.",
    aboutBadge: "De Auteur",
    aboutAuthorRole: "Auteur en bedenker van CSA Books 4 Kids",
    aboutStoryTitle: "Het verhaal achter CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci is an Italian author and creator of children's books. He lives in Trentino-Alto Adige, surrounded by mountains and nature, which often fuel his imagination and storytelling.",
    aboutBioP2: "He has always loved teaching and sharing knowledge, believing that a story can be so much more than a pastime: it can become a gentle bridge connecting growth, curiosity, and fun.",
    aboutBioP3: "His greatest inspiration is his son. It was his passion for trucks, diggers, cranes, and construction sites that sparked Le Avventure del Cantiere (Construction Site Adventures).",
    aboutInspirationText: "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    aboutBioP4: "Through his books, Marco strives to create something that goes beyond reading: meaningful moments to share between parents and children through simple storytelling, emotion, play, and discovery.",
    aboutBioP5: "His goal is to bring shared reading back to the heart of family time, offering children stories that inspire them to smile, imagine, and learn — away from screens, even just for a while.",
    aboutClosingText: "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    aboutCtaBtn: "Ontdek onze boeken"
  },
  pl: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Wielkie przygody dla małych czytelników",
    heroBannerAlt: "CSA Books 4 Kids - Wielkie przygody dla małych czytelników",
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
    footerAbout: "Inspirujące książki z obrazkami pobudzające wyobraźnię i ciekawość małych czytelników.",
    copyright: "© 2026 CSA Books 4 Kids. Wszelkie prawa zastrzeżone."
    ,
    navBooks: "Książki",
    navAbout: "O nas",
    aboutPageTitle: "Poznaj twórcę CSA Books 4 Kids",
    aboutMetaTitle: "O nas | CSA Books 4 Kids",
    aboutMetaDesc: "Poznaj Marco Salucciego, autora i twórcę CSA Books 4 Kids: książki z obrazkami dla dzieci zainspirowane maszynami budowlanymi.",
    aboutBadge: "Autor",
    aboutAuthorRole: "Autor i twórca CSA Books 4 Kids",
    aboutStoryTitle: "Historia CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci is an Italian author and creator of children's books. He lives in Trentino-Alto Adige, surrounded by mountains and nature, which often fuel his imagination and storytelling.",
    aboutBioP2: "He has always loved teaching and sharing knowledge, believing that a story can be so much more than a pastime: it can become a gentle bridge connecting growth, curiosity, and fun.",
    aboutBioP3: "His greatest inspiration is his son. It was his passion for trucks, diggers, cranes, and construction sites that sparked Le Avventure del Cantiere (Construction Site Adventures).",
    aboutInspirationText: "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    aboutBioP4: "Through his books, Marco strives to create something that goes beyond reading: meaningful moments to share between parents and children through simple storytelling, emotion, play, and discovery.",
    aboutBioP5: "His goal is to bring shared reading back to the heart of family time, offering children stories that inspire them to smile, imagine, and learn — away from screens, even just for a while.",
    aboutClosingText: "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    aboutCtaBtn: "Odkryj nasze książki"
  },
  sv: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "Stora äventyr för små läsare",
    heroBannerAlt: "CSA Books 4 Kids - Stora äventyr för små läsare",
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
    footerAbout: "Inspirerande bilderböcker utformade för att väcka fantasi och nyfikenhet hos små läsare.",
    copyright: "© 2026 CSA Books 4 Kids. Alla rättigheter förbehållna."
    ,
    navBooks: "Böcker",
    navAbout: "Om oss",
    aboutPageTitle: "Möt skaparen bakom CSA Books 4 Kids",
    aboutMetaTitle: "Om oss | CSA Books 4 Kids",
    aboutMetaDesc: "Möt Marco Salucci, författare och skapare av CSA Books 4 Kids: bilderböcker för barn inspirerade av arbetsfordon och byggarbetsplatser.",
    aboutBadge: "Författaren",
    aboutAuthorRole: "Författare och skapare av CSA Books 4 Kids",
    aboutStoryTitle: "Historien bakom CSA Books 4 Kids",
    aboutBioP1: "Marco Salucci is an Italian author and creator of children's books. He lives in Trentino-Alto Adige, surrounded by mountains and nature, which often fuel his imagination and storytelling.",
    aboutBioP2: "He has always loved teaching and sharing knowledge, believing that a story can be so much more than a pastime: it can become a gentle bridge connecting growth, curiosity, and fun.",
    aboutBioP3: "His greatest inspiration is his son. It was his passion for trucks, diggers, cranes, and construction sites that sparked Le Avventure del Cantiere (Construction Site Adventures).",
    aboutInspirationText: "A passion for trucks, excavators and construction sites gave birth to an entire world of stories.",
    aboutBioP4: "Through his books, Marco strives to create something that goes beyond reading: meaningful moments to share between parents and children through simple storytelling, emotion, play, and discovery.",
    aboutBioP5: "His goal is to bring shared reading back to the heart of family time, offering children stories that inspire them to smile, imagine, and learn — away from screens, even just for a while.",
    aboutClosingText: "Because the best stories aren't just the ones children read, but the ones parents and children experience together.",
    aboutCtaBtn: "Upptäck våra böcker"
  },
  ja: {
    heroTitle: 'CSA Books <span class="highlight">4 Kids</span>',
    heroSubtitle: "小さな読者のための大冒険",
    heroBannerAlt: "CSA Books 4 Kids - 小さな読者のための大冒険",
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
    footerAbout: "小さな読者の想像力と好奇心を刺激する絵本。",
    copyright: "© 2026 CSA Books 4 Kids. 無断転載を禁じます。"
    ,
    navBooks: "本",
    navAbout: "著者について",
    aboutPageTitle: "CSA Books 4 Kids の作者紹介",
    aboutMetaTitle: "著者について | CSA Books 4 Kids",
    aboutMetaDesc: "CSA Books 4 Kids の著者マルコ・サルッチ（Marco Salucci）の紹介。乗り物や工事現場への情熱から生まれた子ども向け絵本シリーズ。",
    aboutBadge: "著者紹介",
    aboutAuthorRole: "CSA Books 4 Kids 著者・クリエイター",
    aboutStoryTitle: "CSA Books 4 Kids が生まれた物語",
    aboutBioP1: "私はイタリアで生まれ、現在は山々と豊かな自然に囲まれたトレンティーノ＝アルト・アディジェ州に暮らしています。この自然が、私の想像力の大きな源となっています。",
    aboutBioP2: "私は人に教え、知識を分かち合うことが大好きです。一つひとつの物語が、成長と好奇心、そして楽しさを結ぶ小さな架け橋になると信じています。",
    aboutBioP3: "私の何よりのインスピレーションは息子です。トラックやショベルカー、クレーン車、工事現場への息子のあふれる情熱から、『Le Avventure del Cantiere』（工事現場の冒険）シリーズが誕生しました。好奇心旺盛な子どもたちや、大きな働く車が大好きなすべての読者のために、シンプルで楽しく、大切な価値観が詰まった物語を届けています。",
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
    "navCharacters": "I Personaggi",
    "charactersPageTitle": "Un mondo di scoperte, amicizia e grandi macchine",
    "charactersMetaTitle": "I Personaggi | Le Avventure del Cantiere - CSA Books 4 Kids",
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
    "navCharacters": "Die Figuren",
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
    "navCharacters": "Les Personnages",
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
    "navCharacters": "Los Personajes",
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
    "navCharacters": "De Personages",
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
    "navCharacters": "Karaktärerna",
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

  // Allinea il filtro lingua libri iniziale (se l'utente è su sito italiano -> IT, altrimenti EN)
  const savedBookLang = localStorage.getItem('csabooks_book_lang');
  if (savedBookLang && (savedBookLang === 'it' || savedBookLang === 'en' || savedBookLang === 'all')) {
    currentBookLanguage = savedBookLang;
  } else {
    currentBookLanguage = (currentLanguage === 'it') ? 'it' : 'en';
  }

  applyLanguage(currentLanguage);
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

  // Aggiorna bottoni lingua interfaccia (bandiere FlagCDN)
  document.querySelectorAll('.lang-switcher .lang-btn').forEach(btn => {
    const isActive = (btn.dataset.lang === lang);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

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

  // Testi Filtri Libri Secondari
  setText('filter-text-all', strings.filterAll);
  setText('filter-text-it', strings.filterIt);
  setText('filter-text-en', strings.filterEn);
  updateBookFilterButtons();

  // Footer
  setText('footer-about-text', strings.footerAbout);
  setText('footer-copyright-text', strings.copyright);

  // Navigation Links
  setText('nav-link-books', strings.navBooks || 'I Libri');
  setText('nav-link-characters', strings.navCharacters || 'I Personaggi');
  setText('nav-link-about', strings.navAbout || 'Chi siamo');
  setText('footer-nav-books', strings.navBooks || 'I Libri');
  setText('footer-nav-characters', strings.navCharacters || 'I Personaggi');
  setText('footer-nav-about', strings.navAbout || 'Chi siamo');

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

  // About Page (se presente su about.html)
  if (document.getElementById('about-page-title')) {
    setText('about-page-title', strings.aboutPageTitle);
    setText('about-badge', strings.aboutBadge);
    setText('about-author-role', strings.aboutAuthorRole);
    setText('about-bio-p1', strings.aboutBioP1);
    setText('about-bio-p2', strings.aboutBioP2);
    setText('about-story-title', strings.aboutStoryTitle);
    setText('about-bio-p3', strings.aboutBioP3);
    setText('about-inspiration-text', strings.aboutInspirationText);
    setText('about-bio-p4', strings.aboutBioP4);
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

  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const marketInfo = AMAZON_MARKETS[marketKey];
  const targetUrl = getBookUrlForMarket(book, marketKey);
  const strings = I18N[currentLanguage] || I18N.it;
  const buyButtonText = (typeof strings.viewOn === 'function') 
    ? strings.viewOn(marketInfo.buttonLabel) 
    : `BUY ON ${marketInfo.buttonLabel.toUpperCase()}`;

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

function initGlobalDropdownCloser() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-market-select')) {
      document.querySelectorAll('.market-dropdown-menu').forEach(m => m.style.display = 'none');
      document.querySelectorAll('.custom-market-select').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.market-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
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
