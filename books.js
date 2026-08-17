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
// DATABASE LIBRI COLLANA (16 edizioni con anteprime complete sfogliabili)
// ==========================================================================
const BOOKS = [
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
  }
];
