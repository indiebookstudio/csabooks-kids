/**
 * config/campaign-christmas-2026.js
 * 
 * Configurazione Centralizzata Campagna Commerciale — Natale 2026 (CSA Books 4 Kids)
 * 
 * - Gestione stato attivo/disattivo della campagna (enabled: true/false)
 * - Data di conclusione configurabile (endDate: "YYYY-MM-DD")
 * - Regole rigorose di selezione slide per le 9 lingue (IT: 4 slide, altre: 2 slide)
 * - Singolo pulsante "Scopri" integrato perfettamente nel layout senza overflow
 */

(function (root) {
  'use strict';

  var CSA_CHRISTMAS_CAMPAIGN = {
  "id": "natale-2026",
  "name": "Natale 2026",
  "enabled": true,
  "startDate": "2026-11-01",
  "endDate": "2027-01-06",
  "autoplayIntervalMs": 8500,
  "assetsBase": "assets/campaigns/christmas-2026/",
  "productLanguageMap": {
    "it": "it",
    "fr": "fr",
    "en": "en",
    "de": "en",
    "es": "en",
    "nl": "en",
    "pl": "en",
    "se": "en",
    "sv": "en",
    "jp": "en",
    "ja": "en"
  },
  "englishLabels": {
    "single": {
      "it": "Libro in inglese",
      "en": "English Edition",
      "de": "Buch auf Englisch",
      "es": "Libro en inglés",
      "nl": "Boek in het Engels",
      "pl": "Książka po angielsku",
      "se": "Bok på engelska",
      "jp": "英語版の書籍"
    },
    "multiple": {
      "it": "Libri in inglese",
      "en": "English Editions",
      "de": "Bücher auf Englisch",
      "es": "Libros en inglés",
      "nl": "Boeken in het Engels",
      "pl": "Książki po angielsku",
      "se": "Böcker på engelska",
      "jp": "英語版の絵本シリーズ"
    }
  },
  "controlsI18n": {
    "prevSlide": {
      "it": "Slide precedente",
      "en": "Previous slide",
      "de": "Vorherige Folie",
      "fr": "Diapositive précédente",
      "es": "Diapositiva anterior",
      "nl": "Vorige dia",
      "pl": "Poprzedni slajd",
      "se": "Föregående bild",
      "jp": "前のスライド"
    },
    "nextSlide": {
      "it": "Slide successiva",
      "en": "Next slide",
      "de": "Nächste Folie",
      "fr": "Diapositive suivante",
      "es": "Siguiente diapositiva",
      "nl": "Volgende dia",
      "pl": "Następny slajd",
      "se": "Nästa bild",
      "jp": "次のスライド"
    },
    "pauseAutoplay": {
      "it": "Pausa rotazione automatica",
      "en": "Pause autoplay",
      "de": "Automatische Wiedergabe anhalten",
      "fr": "Mettre en pause le défilement",
      "es": "Pausar reproducción automática",
      "nl": "Automatisch afspelen pauzeren",
      "pl": "Wstrzymaj automatyczne przewijanie",
      "se": "Pausa automatisk uppspelning",
      "jp": "自動再生を一時停止"
    },
    "resumeAutoplay": {
      "it": "Riprendi rotazione automatica",
      "en": "Resume autoplay",
      "de": "Automatische Wiedergabe fortsetzen",
      "fr": "Reprendre le défilement",
      "es": "Reanudar reproducción automática",
      "nl": "Automatisch afspelen hervatten",
      "pl": "Wznów automatyczne przewijanie",
      "se": "Återuppta automatisk uppspelning",
      "jp": "自動再生を再開"
    },
    "slideIndicator": {
      "it": "Vai alla slide",
      "en": "Go to slide",
      "de": "Zu Folie gehen",
      "fr": "Aller à la diapositive",
      "es": "Ir a la diapositiva",
      "nl": "Ga naar dia",
      "pl": "Przejdź do slajdu",
      "se": "Gå till bild",
      "jp": "スライドへ移動"
    }
  },
  "slidesData": {
    "it": [
      {
        "id": "01-raccolte",
        "type": "raccolte",
        "eyebrow": "Natale 2026",
        "badge": "Edizione Speciale",
        "title": "Due volumi. Un Natale pieno di avventure.",
        "body": "Regala le grandi raccolte delle Avventure del Cantiere: scegli il Volume 1, il Volume 2 o entrambi.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/01-raccolte-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/01-raccolte-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-volume-1-it.png",
            "alt": "Raccolta Volume 1",
            "label": "Vol. 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-volume-2-it.png",
            "alt": "Raccolta Volume 2",
            "label": "Vol. 2"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Scopri",
            "href": "cantiere.html#cantiere-raccolte",
            "primary": true
          }
        ]
      },
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Natale 2026",
        "badge": "Scienza per curiosi",
        "title": "Regala la meraviglia di scoprire.",
        "body": "Dinosauri, spazio e scoperte sorprendenti: Einstein, questa te la sei persa! è il regalo per chi fa mille domande.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-it.png",
            "alt": "Einstein, questa te la sei persa!",
            "label": "Copertina"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Scopri",
            "href": "scienza.html",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Natale 2026",
        "badge": "Le Avventure del Cantiere",
        "title": "Sotto l’albero, una nuova avventura.",
        "body": "9 episodi in italiano con gli amici del Cantiere. Scegli la storia da regalare.",
        "totalCount": 9,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-it-01.png",
            "alt": "Benny l'escavatore",
            "label": "Tomo 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-it-02.png",
            "alt": "Rudy la ruspa",
            "label": "Tomo 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-it-03.png",
            "alt": "Leo la gru",
            "label": "Tomo 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Scopri",
            "href": "cantiere.html#cantiere-episodes-grid",
            "primary": true
          }
        ]
      },
      {
        "id": "04-fano",
        "type": "single",
        "eyebrow": "Natale 2026",
        "badge": "Colora e Gioca",
        "title": "Un Natale tutto da colorare.",
        "body": "Con Fano col naso all’insù, la scoperta della città diventa un regalo di creatività.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/04-fano-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/04-fano-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/fano-it.png",
            "alt": "Fano col naso all'insù",
            "label": "Copertina"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Scopri",
            "href": "colorare.html",
            "primary": true
          }
        ]
      }
    ],
    "en": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Christmas 2026",
        "badge": "Curious Minds",
        "title": "Give the wonder of discovery.",
        "body": "Dinosaurs, space and surprising discoveries. Einstein, You Missed This! is a gift for curious minds.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Discover",
            "href": "scienza.html?lang=en",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Christmas 2026",
        "badge": "Construction Site Adventures",
        "title": "A new adventure under the tree.",
        "body": "8 stories in English with the construction crew. Find the next adventure to give.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Discover",
            "href": "cantiere.html?lang=en#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "fr": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Noël 2026",
        "badge": "Science & Curiosité",
        "title": "Offrez le plaisir de découvrir.",
        "body": "Dinosaures, espace et découvertes étonnantes : un livre à offrir aux enfants qui posent mille questions.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-fr.png",
            "alt": "Einstein, tu as raté ça !",
            "label": "Édition française"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Découvrir",
            "href": "scienza.html?lang=fr",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Noël 2026",
        "badge": "Les Aventures du Chantier",
        "title": "Une nouvelle aventure sous le sapin.",
        "body": "3 histoires en français avec les amis du chantier. Choisissez l’aventure à offrir.",
        "totalCount": 3,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-fr-01.png",
            "alt": "Benny l'excavateur",
            "label": "Tome 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-fr-02.png",
            "alt": "Rudy le bulldozer",
            "label": "Tome 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-fr-03.png",
            "alt": "Leo la grue",
            "label": "Tome 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Découvrir",
            "href": "cantiere.html?lang=fr#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "de": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Weihnachten 2026",
        "badge": "Buch auf Englisch",
        "isEnglishProduct": true,
        "title": "Schenken Sie die Freude am Entdecken.",
        "body": "Dinosaurier, Weltall und erstaunliche Erfindungen: Einstein, You Missed This! ist das perfekte Geschenk für neugierige Kinder.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Entdecken",
            "href": "scienza.html?lang=de",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Weihnachten 2026",
        "badge": "Bücher auf Englisch",
        "isEnglishProduct": true,
        "title": "Ein neues Abenteuer unter dem Weihnachtsbaum.",
        "body": "8 Geschichten auf Englisch mit den Freunden von der Baustelle. Entdecken Sie das passende Geschenk.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Entdecken",
            "href": "cantiere.html?lang=de#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "es": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Navidad 2026",
        "badge": "Libro en inglés",
        "isEnglishProduct": true,
        "title": "Regala la maravilla de descubrir.",
        "body": "Dinosaurios, espacio y descubrimientos sorprendentes: Einstein, You Missed This! es el regalo ideal para mentes curiosas.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Descubrir",
            "href": "scienza.html?lang=es",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Navidad 2026",
        "badge": "Libros en inglés",
        "isEnglishProduct": true,
        "title": "Una nueva aventura bajo el árbol.",
        "body": "8 historias en inglés con la pandilla de la construcción. Elige la aventura perfecta.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Descubrir",
            "href": "cantiere.html?lang=es#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "nl": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Kerst 2026",
        "badge": "Boek in het Engels",
        "isEnglishProduct": true,
        "title": "Geef het plezier van ontdekken cadeau.",
        "body": "Dinosaurussen, ruimte en verrassende ontdekkingen: Einstein, You Missed This! is hét cadeau voor nieuwsgierige kinderen.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Ontdekken",
            "href": "scienza.html?lang=nl",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Kerst 2026",
        "badge": "Boeken in het Engels",
        "isEnglishProduct": true,
        "title": "Een nieuw avontuur onder de kerstboom.",
        "body": "8 verhalen in het Engels met de bouwplaatsvrienden. Kies het perfecte kerstcadeau.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Ontdekken",
            "href": "cantiere.html?lang=nl#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "pl": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Boże Narodzenie 2026",
        "badge": "Książka po angielsku",
        "isEnglishProduct": true,
        "title": "Podaruj radość odkrywania.",
        "body": "Dinozaury, kosmos i niezwykłe odkrycia: Einstein, You Missed This! to wspaniały prezent dla ciekawskich dzieci.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Odkryj",
            "href": "scienza.html?lang=pl",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Boże Narodzenie 2026",
        "badge": "Książki po angielsku",
        "isEnglishProduct": true,
        "title": "Nowa przygoda pod choinką.",
        "body": "8 opowiadań w języku angielskim z przyjaciółmi z placu budowy. Wybierz prezent.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Odkryj",
            "href": "cantiere.html?lang=pl#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "se": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "Jul 2026",
        "badge": "Bok på engelska",
        "isEnglishProduct": true,
        "title": "Ge bort glädjen i att upptäcka.",
        "body": "Dinosaurier, rymden och fantastiska uppfinningar: Einstein, You Missed This! är den perfekta julklappen.",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Upptäck",
            "href": "scienza.html?lang=se",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "Jul 2026",
        "badge": "Böcker på engelska",
        "isEnglishProduct": true,
        "title": "Ett nytt äventyr under granen.",
        "body": "8 berättelser på engelska med byggarbetsplatsens vänner. Välj ett äventyr.",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "Upptäck",
            "href": "cantiere.html?lang=se#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ],
    "jp": [
      {
        "id": "02-einstein",
        "type": "single",
        "eyebrow": "2026 クリスマス",
        "badge": "英語版の書籍",
        "isEnglishProduct": true,
        "title": "発見の感動をプレゼントしよう。",
        "body": "恐竜、宇宙、大発見：『Einstein, You Missed This!』は好奇心いっぱいのお子様にぴったりのクリスマスギフト。",
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/02-einstein-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/02-einstein-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/einstein-en.jpg",
            "alt": "Einstein, You Missed This!",
            "label": "English Edition"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "詳しく見る",
            "href": "scienza.html?lang=jp",
            "primary": true
          }
        ]
      },
      {
        "id": "03-collana",
        "type": "collection",
        "eyebrow": "2026 クリスマス",
        "badge": "英語版の絵本シリーズ",
        "isEnglishProduct": true,
        "title": "ツリーの下に、新しい大冒険を。",
        "body": "工事現場の仲間たちと楽しむ英語の8つのストーリー。特別な一冊をプレゼント。",
        "totalCount": 8,
        "backgrounds": {
          "desktop": "assets/campaigns/christmas-2026/backgrounds/03-collana-desktop.png",
          "mobile": "assets/campaigns/christmas-2026/backgrounds/03-collana-mobile.png"
        },
        "covers": [
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-01.jpg",
            "alt": "Benny the Excavator",
            "label": "Book 1"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-02.jpg",
            "alt": "Rudy the Bulldozer",
            "label": "Book 2"
          },
          {
            "src": "assets/campaigns/christmas-2026/covers/csa-en-03.jpg",
            "alt": "Leo the Crane",
            "label": "Book 3"
          }
        ],
        "actions": [
          {
            "type": "link",
            "text": "詳しく見る",
            "href": "cantiere.html?lang=jp#cantiere-episodes-grid",
            "primary": true
          }
        ]
      }
    ]
  },

  isCampaignActive: function () {
    if (!CSA_CHRISTMAS_CAMPAIGN.enabled) return false;
    if (CSA_CHRISTMAS_CAMPAIGN.endDate) {
      var now = new Date();
      var end = new Date(CSA_CHRISTMAS_CAMPAIGN.endDate + 'T23:59:59');
      if (now > end) return false;
    }
    return true;
  },

  getSlidesForLanguage: function (lang) {
    var norm = (lang || 'it').toLowerCase();
    if (norm === 'se' || norm === 'sv') norm = 'se';
    if (norm === 'jp' || norm === 'ja') norm = 'jp';

    if (CSA_CHRISTMAS_CAMPAIGN.slidesData[norm]) {
      return CSA_CHRISTMAS_CAMPAIGN.slidesData[norm];
    }
    return CSA_CHRISTMAS_CAMPAIGN.slidesData.en || CSA_CHRISTMAS_CAMPAIGN.slidesData.it;
  }
};

  root.CSA_CHRISTMAS_CAMPAIGN = CSA_CHRISTMAS_CAMPAIGN;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
