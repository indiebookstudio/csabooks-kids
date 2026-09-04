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
    filterEn: "English Edition",
    footerAbout: "Storie e libri illustrati pensati per accendere la fantasia e la curiosità dei più piccoli.",
    copyright: "© 2026 CSA Books 4 Kids. Tutti i diritti riservati."
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
  }
};

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
