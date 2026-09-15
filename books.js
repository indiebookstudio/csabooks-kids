// ==========================================================================
// CSA BOOKS 4 KIDS - ARCHIVIO CATALOGO LIBRI
// ==========================================================================

const AMAZON_MARKETPLACES = {
  it: { name: "Amazon.it", flag: "🇮🇹", urlPrefix: "https://www.amazon.it/dp/" },
  com: { name: "Amazon.com", flag: "🇺🇸", urlPrefix: "https://www.amazon.com/dp/" },
  co_uk: { name: "Amazon.co.uk", flag: "🇬🇧", urlPrefix: "https://www.amazon.co.uk/dp/" },
  de: { name: "Amazon.de", flag: "🇩🇪", urlPrefix: "https://www.amazon.de/dp/" },
  fr: { name: "Amazon.fr", flag: "🇫🇷", urlPrefix: "https://www.amazon.fr/dp/" },
  es: { name: "Amazon.es", flag: "🇪🇸", urlPrefix: "https://www.amazon.es/dp/" }
};

const LANGUAGE_META = {
  it: { name: "Italiano", flag: "🇮🇹", label: "Edizione Italiana" },
  en: { name: "English", flag: "🇬🇧", label: "English Edition" },
  fr: { name: "Français", flag: "🇫🇷", label: "Édition Française" },
  es: { name: "Español", flag: "🇪🇸", label: "Edición Española" },
  de: { name: "Deutsch", flag: "🇩🇪", label: "Deutsche Ausgabe" }
};

// ==========================================================================
// CONFIGURAZIONE STORYTIME (YOUTUBE READ-ALOUD STORIES)
// Inserisci qui l'URL YouTube del video nel campo 'youtubeUrl' appena disponibile.
// ==========================================================================
const STORYTIME_ITEMS = [
  // --- ITALIANO ---
  {
    id: "leo-montagna-it",
    bookId: "leo-montagna-it",
    language: "it",
    eyebrow: "STORYTIME",
    title: "Leo la gru e le gemme della montagna",
    description: "Ascolta l'avventura di Leo mentre la storia prende vita su YouTube e Spotify.",
    ctaText: "Guarda la storia su YouTube",
    catalogCtaText: "Guarda la storia",
    cover: "assets/construction-site-adventures/03.Leo.Montagna/IT/Front.Cover.png",
    youtubeUrl: "https://youtu.be/7VBlotwS230",
    spotifyUrl: "https://open.spotify.com/episode/1Ri2dxfymPcWnlwrVGnx6h?si=tOTipQZ0Q_up9VRmrjQI3Q",
    isNew: true
  },
  {
    id: "benny-collina-it",
    bookId: "benny-collina-it",
    language: "it",
    eyebrow: "STORYTIME",
    title: "Benny l'escavatore e la collina che cambiava forma",
    description: "Ascolta l'avventura di Benny mentre la storia prende vita su YouTube e Spotify.",
    ctaText: "Guarda la storia su YouTube",
    catalogCtaText: "Guarda la storia",
    cover: "assets/construction-site-adventures/01.Benny.Collina/IT/Front.Cover.png",
    youtubeUrl: "https://youtu.be/Q5BzuefwUuA",
    spotifyUrl: "https://open.spotify.com/episode/7wCHeAATwC0cMo3cLz09GT?si=_KomHQZ3QOurT1-MfCcu1Q"
  },
  // --- INGLESE ---
  {
    id: "benny-hill-en",
    bookId: "benny-hill-en",
    language: "en",
    eyebrow: "STORYTIME",
    title: "Benny the Excavator and the Shape-Shifting Hill",
    description: "Listen to Benny's adventure as the story comes to life on YouTube and Spotify.",
    ctaText: "Watch the story on YouTube",
    catalogCtaText: "Watch the story",
    cover: "assets/construction-site-adventures/01.Benny.Collina/US/Front.Cover.png",
    youtubeUrl: "https://youtu.be/K04YwfVBCpE",
    spotifyUrl: "https://open.spotify.com/episode/1MozkoCFeSIlzyyLK12ZdO?si=fYTl5BGnSCqdoI0e8l37CQ"
  },
  // --- FRANCESE ---
  {
    id: "leo-gemmes-fr",
    bookId: "leo-gemmes-fr",
    language: "fr",
    eyebrow: "STORYTIME",
    title: "Leo la grue et les gemmes de la montagne",
    description: "Écoutez l'aventure de Leo alors que l'histoire prend vie sur YouTube et Spotify.",
    ctaText: "Regarder l'histoire sur YouTube",
    catalogCtaText: "Regarder l'histoire",
    cover: "assets/construction-site-adventures/03.Leo.Montagna/FR/Front.Cover.png",
    youtubeUrl: "https://youtu.be/pLCu8kXU_Co",
    spotifyUrl: "https://open.spotify.com/episode/5KDjTi8icy4K2o2t4AWoFm?si=FZMydvQnSqOob-mSWE9WFg",
    isNew: true
  },
  {
    id: "benny-colline-fr",
    bookId: "benny-colline-fr",
    language: "fr",
    eyebrow: "STORYTIME",
    title: "Benny l'excavateur et la colline qui changeait de forme",
    description: "Écoutez l'aventure de Benny alors que l'histoire prend vie sur YouTube et Spotify.",
    ctaText: "Regarder l'histoire sur YouTube",
    catalogCtaText: "Regarder l'histoire",
    cover: "assets/construction-site-adventures/01.Benny.Collina/FR/Front.Cover.png",
    youtubeUrl: "https://youtu.be/ZA1w4TEGJrU",
    spotifyUrl: "https://open.spotify.com/episode/7GqRkvmZx10YyRr3RFzNXH?si=y6rF_IdoTYKjtwezeriO2w"
  }
];

function getStorytimeItems(lang) {
  if (typeof STORYTIME_ITEMS === 'undefined' || !Array.isArray(STORYTIME_ITEMS)) return [];
  // Restituisce tutti i video attivi per la lingua corrente (con youtubeUrl configurato)
  let items = STORYTIME_ITEMS.filter(item => item.language === lang && item.youtubeUrl);
  if (items.length === 0) {
    // Fallback sulla lingua inglese per le lingue che non hanno video specifici
    items = STORYTIME_ITEMS.filter(item => item.language === 'en' && item.youtubeUrl);
  }
  if (items.length === 0) {
    items = STORYTIME_ITEMS.filter(item => !!item.youtubeUrl);
  }
  return items;
}

function getStorytimeYoutubeUrl(item) {
  if (!item) return null;
  return item.youtubeUrl || null;
}

function getStorytimeSpotifyUrl(item) {
  if (!item) return null;
  return item.spotifyUrl || null;
}

function getStorytimeItemForBook(bookId, lang) {
  if (typeof STORYTIME_ITEMS === 'undefined' || !Array.isArray(STORYTIME_ITEMS)) return null;
  if (lang) {
    const matchWithLang = STORYTIME_ITEMS.find(item => (item.bookId === bookId || item.id === bookId) && item.language === lang && item.youtubeUrl);
    if (matchWithLang) return matchWithLang;
  }
  return STORYTIME_ITEMS.find(item => (item.bookId === bookId || item.id === bookId) && item.youtubeUrl) || null;
}

function getFeaturedStorytimeItem(lang) {
  const items = getStorytimeItems(lang);
  return items[0] || (typeof STORYTIME_ITEMS !== 'undefined' ? STORYTIME_ITEMS[0] : null);
}

// ==========================================================================
// CONFIGURAZIONE SPOTIFY DELLA COLLANA (PODCAST SHOW)
// ==========================================================================
const SPOTIFY_SERIES_URLS = {
  // Collana in lingua italiana (mostrata sul sito in italiano)
  it: "https://open.spotify.com/show/4lrP422K6AJpbuWLb6GX97?si=G-YpP0vdQdunglxDTTN7Qg",
  // Collana in lingua francese (mostrata sul sito in francese)
  fr: "https://open.spotify.com/show/10Vzvqat68PHkhzLEE8Jar?si=_0ORy3KTS0aNLn-QtlFx2Q",
  // Collana in lingua inglese (utilizzata per tutte le altre lingue: en, de, es, nl, pl, sv, ja)
  en: "https://open.spotify.com/show/4lLJo6ZXfVhITTnPFCCMIS?si=j3SzwenwRxq6BgIUBhl4cg"
};

function getSpotifySeriesUrl(lang) {
  if (typeof SPOTIFY_SERIES_URLS === 'undefined') return null;
  if (lang && SPOTIFY_SERIES_URLS[lang]) {
    return SPOTIFY_SERIES_URLS[lang];
  }
  return SPOTIFY_SERIES_URLS.en || null;
}

// ==========================================================================
// DATABASE LIBRI COLLANA (17 edizioni con anteprime complete sfogliabili)
// ==========================================================================
const BOOKS = [
  {
    "id": "leo-rudy-savana-it",
    "volume": 9,
    "collection": "construction-site",
    "isNew": true,
    "title": "Leo la gru & Rudy la ruspa in Missione Savana",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 9",
    "cover": "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/Front.Cover.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/2.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/3.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/4.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/5.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/6.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/7.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/8.png",
      "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0HJRRRDMX",
      "com": "B0HJRRRDMX"
    }
  },
  {
    "id": "benny-collina-it",
    "volume": 1,
    "collection": "construction-site",
    "title": "Benny l'escavatore e la collina che cambiava forma",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 1",
    "cover": "assets/construction-site-adventures/01.Benny.Collina/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/01.Benny.Collina/IT/Front.Cover.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/2.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/3.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/4.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/5.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/6.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/7.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/8.png",
      "assets/construction-site-adventures/01.Benny.Collina/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H6MN4LW7",
      "com": "B0H6MN4LW7"
    }
  },
  {
    "id": "benny-hill-en",
    "volume": 1,
    "collection": "construction-site",
    "title": "Benny the Excavator and the Shape-Shifting Hill",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 1",
    "cover": "assets/construction-site-adventures/01.Benny.Collina/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/01.Benny.Collina/US/Front.Cover.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/2.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/3.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/4.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/5.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/6.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/7.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/8.png",
      "assets/construction-site-adventures/01.Benny.Collina/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H6SBPNM5",
      "co_uk": "B0H6SBPNM5",
      "it": "B0H6SBPNM5"
    }
  },
  {
    "id": "benny-colline-fr",
    "volume": 1,
    "collection": "construction-site",
    "isNew": true,
    "title": "Benny l'excavateur et la colline qui changeait de forme",
    "subtitle": "Les Aventures du Chantier - Livre illustré pour enfants de 2 à 5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 1",
    "cover": "assets/construction-site-adventures/01.Benny.Collina/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/01.Benny.Collina/FR/Front.Cover.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/2.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/3.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/4.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/5.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/6.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/7.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/8.png",
      "assets/construction-site-adventures/01.Benny.Collina/FR/Back.Cover.png"
    ],
    "asin": "B0HJM5R74L",
    "amazon": {
      "fr": "B0HJM5R74L",
      "com": "B0HJM5R74L",
      "it": "B0HJM5R74L",
      "de": "B0HJM5R74L",
      "es": "B0HJM5R74L",
      "co_uk": "B0HJM5R74L",
      "ca": "B0HJM5R74L",
      "nl": "B0HJM5R74L",
      "pl": "B0HJM5R74L",
      "se": "B0HJM5R74L",
      "jp": "B0HJM5R74L",
      "au": "B0HJM5R74L",
      "be": "B0HJM5R74L",
      "ie": "B0HJM5R74L"
    }
  },
  {
    "id": "rudy-spiaggia-it",
    "volume": 2,
    "collection": "construction-site",
    "title": "Rudy la ruspa e la spiaggia che scompariva",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 2",
    "cover": "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/Front.Cover.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/2.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/3.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/4.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/5.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/6.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/7.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/8.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H6Q5TX7M",
      "com": "B0H6Q5TX7M"
    }
  },
  {
    "id": "rudy-beach-en",
    "volume": 2,
    "collection": "construction-site",
    "title": "Rudy the Bulldozer and the Vanishing Beach",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 2",
    "cover": "assets/construction-site-adventures/02.Rudy.Spiaggia/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/Front.Cover.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/2.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/3.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/4.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/5.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/6.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/7.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/8.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H6XV8LN6",
      "co_uk": "B0H6XV8LN6",
      "it": "B0H6XV8LN6"
    }
  },
  {
    "id": "rudy-plage-fr",
    "volume": 2,
    "collection": "construction-site",
    "isNew": true,
    "title": "Rudy le bulldozer et la plage qui disparaissait",
    "subtitle": "Les Aventures du Chantier - Livre illustré pour enfants de 2 à 5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 2",
    "cover": "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/Front.Cover.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/2.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/3.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/4.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/5.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/6.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/7.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/8.png",
      "assets/construction-site-adventures/02.Rudy.Spiaggia/FR/Back.Cover.png"
    ],
    "asin": "B0HJX2H3MF",
    "amazon": {
      "fr": "B0HJX2H3MF",
      "com": "B0HJX2H3MF",
      "it": "B0HJX2H3MF",
      "de": "B0HJX2H3MF",
      "es": "B0HJX2H3MF",
      "co_uk": "B0HJX2H3MF",
      "ca": "B0HJX2H3MF",
      "nl": "B0HJX2H3MF",
      "pl": "B0HJX2H3MF",
      "se": "B0HJX2H3MF",
      "jp": "B0HJX2H3MF",
      "au": "B0HJX2H3MF",
      "be": "B0HJX2H3MF",
      "ie": "B0HJX2H3MF"
    }
  },
  {
    "id": "leo-montagna-it",
    "volume": 3,
    "collection": "construction-site",
    "title": "Leo la gru e le gemme della montagna",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 3",
    "cover": "assets/construction-site-adventures/03.Leo.Montagna/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/03.Leo.Montagna/IT/Front.Cover.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/2.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/3.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/4.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/5.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/6.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/7.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/8.png",
      "assets/construction-site-adventures/03.Leo.Montagna/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H6MY4W6X",
      "com": "B0H6MY4W6X"
    }
  },
  {
    "id": "leo-mountain-en",
    "volume": 3,
    "collection": "construction-site",
    "title": "Leo the Crane and the Mountain Gems",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 3",
    "cover": "assets/construction-site-adventures/03.Leo.Montagna/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/03.Leo.Montagna/US/Front.Cover.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/2.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/3.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/4.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/5.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/6.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/7.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/8.png",
      "assets/construction-site-adventures/03.Leo.Montagna/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H6ZDZ2N8",
      "co_uk": "B0H6ZDZ2N8",
      "it": "B0H6ZDZ2N8"
    }
  },
  {
    "id": "leo-gemmes-fr",
    "volume": 3,
    "collection": "construction-site",
    "isNew": true,
    "title": "Leo la grue et les gemmes de la montagne",
    "subtitle": "Les Aventures du Chantier - Livre illustré pour enfants de 2 à 5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 3",
    "cover": "assets/construction-site-adventures/03.Leo.Montagna/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/03.Leo.Montagna/FR/Front.Cover.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/2.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/3.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/4.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/5.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/6.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/7.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/8.png",
      "assets/construction-site-adventures/03.Leo.Montagna/FR/Back.Cover.png"
    ],
    "asin": "B0HJWY3YZ4",
    "amazon": {
      "fr": "B0HJWY3YZ4",
      "com": "B0HJWY3YZ4",
      "it": "B0HJWY3YZ4",
      "de": "B0HJWY3YZ4",
      "es": "B0HJWY3YZ4",
      "co_uk": "B0HJWY3YZ4",
      "ca": "B0HJWY3YZ4",
      "nl": "B0HJWY3YZ4",
      "pl": "B0HJWY3YZ4",
      "se": "B0HJWY3YZ4",
      "jp": "B0HJWY3YZ4",
      "au": "B0HJWY3YZ4",
      "be": "B0HJWY3YZ4",
      "ie": "B0HJWY3YZ4"
    }
  },
  {
    "id": "bruno-papere-it",
    "volume": 4,
    "collection": "construction-site",
    "title": "Bruno il camion e lo stagno delle papere",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 4",
    "cover": "assets/construction-site-adventures/04.Bruno.Papere/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/04.Bruno.Papere/IT/Front.Cover.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/2.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/3.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/4.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/5.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/6.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/7.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/8.png",
      "assets/construction-site-adventures/04.Bruno.Papere/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H6QFZBDS",
      "com": "B0H6QFZBDS"
    }
  },
  {
    "id": "bruno-pond-en",
    "volume": 4,
    "collection": "construction-site",
    "title": "Bruno the Truck and the Duck Pond",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 4",
    "cover": "assets/construction-site-adventures/04.Bruno.Papere/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/04.Bruno.Papere/US/Front.Cover.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/2.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/3.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/4.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/5.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/6.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/7.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/8.png",
      "assets/construction-site-adventures/04.Bruno.Papere/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H6SDVJDZ",
      "co_uk": "B0H6SDVJDZ",
      "it": "B0H6SDVJDZ"
    }
  },
  {
    "id": "bruno-canards-fr",
    "volume": 4,
    "collection": "construction-site",
    "title": "Bruno le camion et la mare aux canards",
    "subtitle": "Livre illustré pour enfants 2-5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 4",
    "comingSoon": true,
    "cover": "assets/construction-site-adventures/04.Bruno.Papere/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/04.Bruno.Papere/FR/Front.Cover.png"
    ],
    "amazon": {}
  },
  {
    "id": "benny-roma-it",
    "volume": 5,
    "collection": "construction-site",
    "title": "Benny l'escavatore e le monete dell'antica Roma",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 5",
    "cover": "assets/construction-site-adventures/05.Benny.Roma/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/05.Benny.Roma/IT/Front.Cover.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/2.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/3.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/4.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/5.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/6.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/7.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/8.png",
      "assets/construction-site-adventures/05.Benny.Roma/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H6VBNX5D",
      "com": "B0H6VBNX5D"
    }
  },
  {
    "id": "benny-rome-en",
    "volume": 5,
    "collection": "construction-site",
    "title": "Benny the Excavator and the Coins of Ancient Rome",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 5",
    "cover": "assets/construction-site-adventures/05.Benny.Roma/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/05.Benny.Roma/US/Front.Cover.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/2.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/3.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/4.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/5.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/6.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/7.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/8.png",
      "assets/construction-site-adventures/05.Benny.Roma/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H6XMYR8Q",
      "co_uk": "B0H6XMYR8Q",
      "it": "B0H6XMYR8Q"
    }
  },
  {
    "id": "benny-antiquite-fr",
    "volume": 5,
    "collection": "construction-site",
    "title": "Benny l'excavateur et les pièces de l'antiquité romaine",
    "subtitle": "Livre illustré pour enfants 2-5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 5",
    "comingSoon": true,
    "cover": "assets/construction-site-adventures/05.Benny.Roma/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/05.Benny.Roma/FR/Front.Cover.png"
    ],
    "amazon": {}
  },
  {
    "id": "nina-conigli-it",
    "volume": 6,
    "collection": "construction-site",
    "title": "Nina la betoniera e il ponte dei coniglietti",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 6",
    "cover": "assets/construction-site-adventures/06.Nina.Conigli/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/06.Nina.Conigli/IT/Front.Cover.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/2.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/3.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/4.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/5.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/6.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/7.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/8.png",
      "assets/construction-site-adventures/06.Nina.Conigli/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H717X9ZL",
      "com": "B0H717X9ZL"
    }
  },
  {
    "id": "nina-bridge-en",
    "volume": 6,
    "collection": "construction-site",
    "title": "Nina the Cement Truck and the Bunny Bridge",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 6",
    "cover": "assets/construction-site-adventures/06.Nina.Conigli/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/06.Nina.Conigli/US/Front.Cover.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/2.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/3.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/4.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/5.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/6.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/7.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/8.png",
      "assets/construction-site-adventures/06.Nina.Conigli/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H723KGZ5",
      "co_uk": "B0H723KGZ5",
      "it": "B0H723KGZ5"
    }
  },
  {
    "id": "nina-lapins-fr",
    "volume": 6,
    "collection": "construction-site",
    "title": "Nina la bétonnière et le pont des petits lapins",
    "subtitle": "Livre illustré pour enfants 2-5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 6",
    "comingSoon": true,
    "cover": "assets/construction-site-adventures/06.Nina.Conigli/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/06.Nina.Conigli/FR/Front.Cover.png"
    ],
    "amazon": {}
  },
  {
    "id": "rino-ladri-it",
    "volume": 7,
    "collection": "construction-site",
    "title": "Rino il rullo e i ladri del cantiere",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 7",
    "cover": "assets/construction-site-adventures/07.Rino.Ladri/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/07.Rino.Ladri/IT/Front.Cover.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/2.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/3.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/4.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/5.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/6.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/7.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/8.png",
      "assets/construction-site-adventures/07.Rino.Ladri/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H75DDGLQ",
      "com": "B0H75DDGLQ"
    }
  },
  {
    "id": "rino-thieves-en",
    "volume": 7,
    "collection": "construction-site",
    "title": "Rino the Roller and the Construction Site Thieves",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 7",
    "cover": "assets/construction-site-adventures/07.Rino.Ladri/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/07.Rino.Ladri/US/Front.Cover.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/2.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/3.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/4.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/5.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/6.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/7.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/8.png",
      "assets/construction-site-adventures/07.Rino.Ladri/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H75N8JT9",
      "co_uk": "B0H75N8JT9",
      "it": "B0H75N8JT9"
    }
  },
  {
    "id": "rino-voleurs-fr",
    "volume": 7,
    "collection": "construction-site",
    "title": "Rino le rouleau compresseur et les voleurs du chantier",
    "subtitle": "Livre illustré pour enfants 2-5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 7",
    "comingSoon": true,
    "cover": "assets/construction-site-adventures/07.Rino.Ladri/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/07.Rino.Ladri/FR/Front.Cover.png"
    ],
    "amazon": {}
  },
  {
    "id": "leo-cinciallegra-it",
    "volume": 8,
    "collection": "construction-site",
    "title": "Leo la gru e il nido della cinciallegra",
    "subtitle": "Libro illustrato per bambini 2-5 anni",
    "author": "Marco Salucci",
    "language": "Italiano",
    "languageCode": "it",
    "age": "2–5 anni",
    "badge": "Volume 8",
    "cover": "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/Front.Cover.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/2.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/3.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/4.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/5.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/6.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/7.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/8.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/IT/Back.Cover.png"
    ],
    "amazon": {
      "it": "B0H7JK9R46",
      "com": "B0H7JK9R46"
    }
  },
  {
    "id": "leo-nest-en",
    "volume": 8,
    "collection": "construction-site",
    "title": "Leo the Crane and the Little Bird's Nest",
    "subtitle": "Illustrated Book for Children Ages 2-5",
    "author": "Marco Salucci",
    "language": "English",
    "languageCode": "en",
    "age": "2–5 years",
    "badge": "Volume 8",
    "cover": "assets/construction-site-adventures/08.Leo.Cinciallegra/US/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/Front.Cover.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/2.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/3.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/4.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/5.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/6.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/7.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/8.png",
      "assets/construction-site-adventures/08.Leo.Cinciallegra/US/Back.Cover.png"
    ],
    "amazon": {
      "com": "B0H7LPQ8KX",
      "co_uk": "B0H7LPQ8KX",
      "it": "B0H7LPQ8KX"
    }
  },
  {
    "id": "leo-mesange-fr",
    "volume": 8,
    "collection": "construction-site",
    "title": "Leo la grue et le nid de la mésange",
    "subtitle": "Livre illustré pour enfants 2-5 ans",
    "author": "Marco Salucci",
    "language": "Français",
    "languageCode": "fr",
    "age": "2–5 ans",
    "badge": "Tome 8",
    "comingSoon": true,
    "cover": "assets/construction-site-adventures/08.Leo.Cinciallegra/FR/Front.Cover.png",
    "preview": [
      "assets/construction-site-adventures/08.Leo.Cinciallegra/FR/Front.Cover.png"
    ],
    "amazon": {}
  }
];
