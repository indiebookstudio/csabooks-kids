/**
 * CSA Books Kids 2.0 - Core Application Script
 * Robust multi-language UI (9 languages), centralized paperback Amazon links,
 * Look Inside interior page flip-through viewer, and accessible responsive interactions.
 */

(function() {
  'use strict';

  // Supported languages & aliases
  const SUPPORTED_LANGS = ['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp', 'sv', 'ja'];
  const DEFAULT_LANG = 'it';

  function normalizeLang(lang) {
    if (!lang) return DEFAULT_LANG;
    const l = lang.toLowerCase();
    if (l === 'sv') return 'se';
    if (l === 'ja') return 'jp';
    return l;
  }

  // Supported Amazon Marketplaces (US, UK, DE, FR, ES, IT, NL, PL, SE, BE, IE, JP, CA, AU)
  const MARKET_DOMAINS = {
    us: 'com',
    com: 'com',
    uk: 'co.uk',
    ca: 'ca',
    au: 'com.au',
    de: 'de',
    fr: 'fr',
    es: 'es',
    it: 'it',
    nl: 'nl',
    pl: 'pl',
    se: 'se',
    be: 'com.be',
    ie: 'ie',
    jp: 'co.jp'
  };

  const LANG_MARKET_MAP = {
    it: 'it',
    fr: 'fr',
    de: 'de',
    es: 'es',
    nl: 'nl',
    pl: 'pl',
    se: 'se',
    jp: 'jp',
    en: 'com'
  };

  // Client-side detection of Amazon marketplace based on active navigation language and location
  function detectUserMarketplace(contextLang = currentLang) {
    const lang = normalizeLang(contextLang || currentLang || DEFAULT_LANG);

    // If navigation is in a language with its own primary Amazon store,
    // the marketplace of navigation MUST correspond to that country/store!
    if (lang === 'it') return 'it';
    if (lang === 'fr') {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (tz.includes('Montreal') || tz.includes('Canada')) return 'ca';
        if (tz.includes('Brussels')) return 'be';
      } catch(e) {}
      return 'fr';
    }
    if (lang === 'de') return 'de';
    if (lang === 'es') {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (tz.includes('Mexico') || tz.includes('America/Mexico_City')) return 'mx';
      } catch(e) {}
      return 'es';
    }
    if (lang === 'nl') return 'nl';
    if (lang === 'pl') return 'pl';
    if (lang === 'se') return 'se';
    if (lang === 'jp') return 'jp';

    // English / international: check if visitor is from UK, Canada, Australia or US
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const navLangs = (navigator.languages && navigator.languages.length) ? Array.from(navigator.languages) : [navigator.language || ''];
      const langsLower = navLangs.map(l => (l || '').toLowerCase());

      if (tz.includes('London') || langsLower.some(l => /-gb\b/.test(l))) return 'uk';
      if (tz.includes('Dublin') || langsLower.some(l => /-ie\b/.test(l))) return 'ie';
      if (tz.includes('Australia') || tz.includes('Sydney') || tz.includes('Melbourne') || langsLower.some(l => /-au\b/.test(l))) return 'au';
      if (tz.includes('Canada') || tz.includes('Toronto') || tz.includes('Vancouver') || langsLower.some(l => /-ca\b/.test(l))) return 'ca';
    } catch(e) {}

    return 'com';
  }
  window.detectUserMarketplace = detectUserMarketplace;

  // State
  let currentLang = DEFAULT_LANG;
  let activeModalState = null;

  // Initialize language from URL, localStorage or browser
  function initLanguage() {
    let paramLang = null;
    try {
      const params = new URLSearchParams(window.location.search);
      paramLang = params.get('lang');
    } catch(e) {}

    let saved = null;
    try {
      saved = localStorage.getItem('csa_language') || localStorage.getItem('csa_lang');
    } catch(e) {}

    if (paramLang && SUPPORTED_LANGS.includes(paramLang.toLowerCase())) {
      currentLang = normalizeLang(paramLang);
    } else if (saved && SUPPORTED_LANGS.includes(saved.toLowerCase())) {
      currentLang = normalizeLang(saved);
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
      if (SUPPORTED_LANGS.includes(browserLang)) {
        currentLang = normalizeLang(browserLang);
      } else {
        currentLang = DEFAULT_LANG;
      }
    }
    applyLanguage(currentLang, false);
  }

  // Set language globally
  function setLanguage(lang) {
    const norm = normalizeLang(lang);
    if (!['it', 'en', 'de', 'fr', 'es', 'nl', 'pl', 'se', 'jp'].includes(norm)) return;
    currentLang = norm;
    try {
      localStorage.setItem('csa_language', norm);
      localStorage.setItem('csa_lang', norm);
      const m = LANG_MARKET_MAP[norm] || 'com';
      localStorage.setItem('csa_marketplace', m);
    } catch(e) {}
    applyLanguage(norm, true);

    // Chiudi dropdown lingua mobile dopo la selezione
    const dropdown = document.getElementById("lang-mobile-dropdown");
    const select = document.getElementById("lang-mobile-select");
    const trigger = document.getElementById("lang-mobile-trigger");
    if (dropdown) dropdown.classList.remove("show");
    if (select) select.classList.remove("open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }
  window.setLanguage = setLanguage;
  // Mobile Language Dropdown Toggle
  window.toggleMobileLangDropdown = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const dropdown = document.getElementById('lang-mobile-dropdown');
    const select = document.getElementById('lang-mobile-select');
    if (dropdown && select) {
      const isOpen = dropdown.classList.contains('show');
      dropdown.classList.toggle('show', !isOpen);
      select.classList.toggle('open', !isOpen);
      const trigger = document.getElementById('lang-mobile-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', String(!isOpen));
    }
  };

  document.addEventListener('click', function(e) {
    const select = document.getElementById('lang-mobile-select');
    const dropdown = document.getElementById('lang-mobile-dropdown');
    if (dropdown && select && !select.contains(e.target)) {
      dropdown.classList.remove('show');
      select.classList.remove('open');
      const trigger = document.getElementById('lang-mobile-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      const select = document.getElementById("lang-mobile-select");
      const dropdown = document.getElementById("lang-mobile-dropdown");
      if (dropdown) dropdown.classList.remove("show");
      if (select) select.classList.remove("open");
      const trigger = document.getElementById("lang-mobile-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    }
  });

  // Retrieve translation key
  function t(keyPath, lang = currentLang) {
    const dict = (window.SITE_I18N && window.SITE_I18N[lang]) || (window.SITE_I18N && window.SITE_I18N[DEFAULT_LANG]);
    if (!dict) return keyPath;
    const parts = keyPath.split('.');
    let cur = dict;
    for (const p of parts) {
      if (!cur || typeof cur !== 'object') return keyPath;
      cur = cur[p];
    }
    return (cur !== undefined && cur !== null) ? cur : keyPath;
  }
  window.csaT = t;

  // Apply language across DOM
  function applyLanguage(lang, triggerEvents = true) {
    document.documentElement.lang = (lang === 'se' ? 'sv' : (lang === 'jp' ? 'ja' : lang));

    // Update Topbar buttons state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const bLang = normalizeLang(btn.getAttribute('data-lang'));
      const isSelected = (bLang === lang);
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    // Update mobile select
    const mobileSelect = document.getElementById('mobile-lang-select');
    if (mobileSelect && mobileSelect.value !== lang) {
      mobileSelect.value = lang;
    }

    // Update custom mobile trigger flag and code
    const flagMap = {
      it: 'https://flagcdn.com/24x18/it.png',
      en: 'https://flagcdn.com/24x18/gb.png',
      de: 'https://flagcdn.com/24x18/de.png',
      fr: 'https://flagcdn.com/24x18/fr.png',
      es: 'https://flagcdn.com/24x18/es.png',
      nl: 'https://flagcdn.com/24x18/nl.png',
      pl: 'https://flagcdn.com/24x18/pl.png',
      se: 'https://flagcdn.com/24x18/se.png',
      jp: 'https://flagcdn.com/24x18/jp.png'
    };
    const mobileFlag = document.getElementById('lang-mobile-flag');
    const mobileCode = document.getElementById('lang-mobile-code');
    if (mobileFlag && flagMap[lang]) mobileFlag.src = flagMap[lang];
    if (mobileCode) mobileCode.textContent = lang.toUpperCase();

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key, lang);
      if (text && text !== key) {
        if (el.getAttribute('data-i18n-attr')) {
          const attr = el.getAttribute('data-i18n-attr');
          el.setAttribute(attr, text);
        } else if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search')) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update dynamic sections if present
    renderFeaturedSection();
    renderCatalogSection();
    renderCantiereSection();
    renderScienzaSection();
    renderColorareSection();
    renderReviewCards();
    updateHeroCarouselTranslations(lang);
    if (typeof window.renderChristmasHero === 'function') {
      window.renderChristmasHero(lang);
    }

    // If modal is open, re-render modal with new language
    if (activeModalState) {
      updateModalContent();
    }

    if (triggerEvents) {
      window.dispatchEvent(new CustomEvent('csa-language-changed', { detail: { lang } }));
    }
  }

  // For book editions/content, treat NL, PL, SE, JP as English ('en')
  function getEffectiveBookLang(lang = currentLang) {
    if (['nl', 'pl', 'se', 'jp'].includes(lang)) {
      return 'en';
    }
    return lang;
  }
  window.getEffectiveBookLang = getEffectiveBookLang;

  // Central Amazon Link Helper (Auto Geo-Targeted to User Country / Marketplace)
  function getAmazonPaperbackUrl(book, lang = currentLang) {
    if (!book || !book.editions) return null;
    const reqLang = normalizeLang(lang || currentLang || DEFAULT_LANG);

    // 1. Choose appropriate edition for the requested language
    let edKey = reqLang;
    if (!book.editions[edKey] || !book.editions[edKey].available) {
      if (['nl', 'pl', 'se', 'jp', 'de'].includes(reqLang) && book.editions.en?.available) {
        edKey = 'en';
      } else if (book.editions.en && book.editions.en.available) {
        edKey = 'en';
      } else if (book.editions.it && book.editions.it.available) {
        edKey = 'it';
      } else {
        const availKeys = Object.keys(book.editions).filter(k => book.editions[k]?.available);
        if (availKeys.length === 0) return null;
        edKey = availKeys[0];
      }
    }

    const edition = book.editions[edKey];
    if (!edition || !edition.available) return null;

    // 2. Marketplace del paese di navigazione
    // Se la lingua richiesta corrisponde a un'edizione specifica (es. nella modale o nella vista libro),
    // usiamo la lingua di destinazione per identificare il marketplace target.
    const navMarket = detectUserMarketplace(reqLang);
    const editionMarket = LANG_MARKET_MAP[edKey] || 'com';

    // Determina il marketplace preferito:
    // Se l'edizione è specifica per una lingua (es. fr, es, it, de):
    // Deve puntare al marketplace proprio di quella lingua/edizione (es. fr -> amazon.fr, it -> amazon.it, es -> amazon.es)
    // a meno che la navigazione non sia già in un marketplace supportato direttamente nei link dell'edizione.
    let targetMarket = navMarket;
    if (['fr', 'es', 'it', 'de'].includes(edKey)) {
      if (reqLang === edKey || currentLang === edKey) {
        targetMarket = editionMarket;
      } else if (edition.amazon && !edition.amazon[navMarket]) {
        targetMarket = editionMarket;
      }
    }

    // 3. Match diretto in edition.amazon
    if (edition.amazon) {
      if (edition.amazon[targetMarket]) {
        const val = edition.amazon[targetMarket];
        const domain = MARKET_DOMAINS[targetMarket] || 'com';
        return val.startsWith('http') ? val : `https://www.amazon.${domain}/dp/${val}`;
      }
      if (edition.amazon[editionMarket]) {
        const val = edition.amazon[editionMarket];
        const domain = MARKET_DOMAINS[editionMarket] || 'com';
        return val.startsWith('http') ? val : `https://www.amazon.${domain}/dp/${val}`;
      }
      if (edition.amazon.com) {
        const val = edition.amazon.com;
        return val.startsWith('http') ? val : `https://www.amazon.com/dp/${val}`;
      }
    }

    // 4. Se abbiamo l'ASIN, genera il link sullo store corretto
    let asin = edition.asin || null;
    if (!asin && edition.amazon) {
      for (const k of Object.keys(edition.amazon)) {
        const val = edition.amazon[k];
        if (typeof val === 'string') {
          const match = val.match(/\/dp\/([A-Z0-9]{10})/i);
          if (match) { asin = match[1]; break; }
          if (/^[A-Z0-9]{10}$/i.test(val)) { asin = val; break; }
        }
      }
    }

    if (asin) {
      const finalMarket = (edition.amazon && edition.amazon[targetMarket]) ? targetMarket : editionMarket;
      const domain = MARKET_DOMAINS[finalMarket] || 'com';
      return `https://www.amazon.${domain}/dp/${asin}`;
    }

    // 5. Fallback a primo link valido
    if (edition.amazon) {
      const firstKey = Object.keys(edition.amazon)[0];
      const val = edition.amazon[firstKey];
      if (val && val.startsWith('http')) return val;
    }

    return null;
  }
  window.getAmazonPaperbackUrl = getAmazonPaperbackUrl;

  // Language Badges Renderer for Cards
  function renderCardLanguageBadges(book, targetLang = currentLang) {
    if (!book || !book.editions) return '';
    const avail = Object.keys(book.editions).filter(k => book.editions[k] && book.editions[k].available);
    if (avail.length === 0) return '';

    const flagCodeMap = { it: 'it', en: 'gb', fr: 'fr', de: 'de', es: 'es', nl: 'nl', pl: 'pl', se: 'se', jp: 'jp' };
    const nameMap = { it: 'IT', en: 'EN', fr: 'FR', de: 'DE', es: 'ES', nl: 'NL', pl: 'PL', se: 'SE', jp: 'JP' };

    const labelText = t('catalog.availableEditions') || 'Disponibile in:';
    const pillsHtml = avail.map(k => {
      const isCur = (k === targetLang) || (k === 'en' && ['nl', 'pl', 'se', 'jp', 'de', 'es'].includes(targetLang) && !avail.includes(targetLang));
      const flagCode = flagCodeMap[k] || k;
      const codeLabel = nameMap[k] || k.toUpperCase();
      return `
        <span class="csa-lang-pill ${isCur ? 'active' : ''}">
          <img src="https://flagcdn.com/24x18/${flagCode}.png" srcset="https://flagcdn.com/48x36/${flagCode}.png 2x" width="15" height="11" alt="${codeLabel}" class="csa-pill-flag">
          <span>${codeLabel}</span>
        </span>
      `;
    }).join('');

    return `
      <div class="csa-card-languages">
        <span class="csa-lang-label">${labelText}</span>
        ${pillsHtml}
      </div>
    `;
  }
  window.renderCardLanguageBadges = renderCardLanguageBadges;

  // Outbound tracking helper
  function trackAmazonClick(bookId, url) {
    try {
      if (window.gtag) {
        window.gtag('event', 'amazon_paperback_click', {
          event_category: 'ecommerce',
          event_label: bookId,
          outbound_url: url
        });
      }
    } catch(e) {}
  }
  window.trackAmazonClick = trackAmazonClick;

  // Book Language Availability Checker
  function isBookAvailableInLang(book, lang = currentLang) {
    if (!book || !book.editions) return false;
    const effLang = getEffectiveBookLang(lang);
    const ed = book.editions[effLang];
    return Boolean(ed && ed.available);
  }
  window.isBookAvailableInLang = isBookAvailableInLang;

  // Robust Age Badge Formatter across all 9 languages
  function formatAgeBadge(ageStr, lang = currentLang) {
    if (!ageStr) return '';
    const clean = String(ageStr).replace(/–/g, '-').trim();
    if (clean === '2-5' || clean === '2+') return t('ages.age2to5', lang);
    if (clean === '5-10' || clean === '5+') return t('ages.age5to10', lang);
    if (clean === '7-12' || clean === '7+' || clean === '7-8') return t('ages.age7to12', lang);

    const yearsUnitMap = {
      it: 'anni',
      en: 'years',
      de: 'Jahre',
      fr: 'ans',
      es: 'años',
      nl: 'jaar',
      pl: 'lat',
      se: 'år',
      jp: '歳'
    };
    const unit = yearsUnitMap[lang] || yearsUnitMap.it;
    if (lang === 'en') return `Ages ${clean}`;
    return `${clean} ${unit}`;
  }
  window.formatAgeBadge = formatAgeBadge;

  // Look Inside / Read Sample Modal
  function openBookModal(bookId, requestedLang = currentLang) {
    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return;
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;

    // Determine available edition
    const availKeys = Object.keys(book.editions || {}).filter(k => book.editions[k]?.available);
    let editionKey = requestedLang;
    if (!book.editions || !book.editions[editionKey] || !book.editions[editionKey].available) {
      if (['nl', 'pl', 'se', 'jp'].includes(requestedLang) && book.editions?.en?.available) {
        editionKey = 'en';
      } else if (book.editions?.en?.available) {
        editionKey = 'en';
      } else if (book.editions?.it?.available) {
        editionKey = 'it';
      } else {
        editionKey = availKeys[0] || 'it';
      }
    }

    activeModalState = {
      bookId,
      editionKey,
      currentPage: 0,
      pages: []
    };

    updateModalPagesList();

    let modal = document.getElementById('csa-book-modal');
    if (!modal) {
      modal = createModalDOM();
      document.body.appendChild(modal);
    }

    updateModalContent();
    modal.classList.add('active');
    document.body.classList.add('csa-modal-open');
    modal.focus();
  }
  window.openBookModal = openBookModal;

  function closeBookModal() {
    const modal = document.getElementById('csa-book-modal');
    if (modal) {
      modal.classList.remove('active');
    }
    document.body.classList.remove('csa-modal-open');
    activeModalState = null;
  }
  window.closeBookModal = closeBookModal;

  function updateModalPagesList() {
    if (!activeModalState) return;
    const { bookId, editionKey } = activeModalState;
    const manifest = window.BOOKS_MANIFEST;
    const pages = [];

    if (manifest && manifest[bookId] && manifest[bookId][editionKey]) {
      const info = manifest[bookId][editionKey];
      if (info.cover) pages.push(info.cover);
      if (Array.isArray(info.interiors)) {
        info.interiors.forEach(p => pages.push(p));
      }
      if (info.back) pages.push(info.back);
    } else {
      // Conventional fallback
      pages.push(`books/${bookId}/${editionKey}/cover.png`);
      for (let i = 1; i <= 10; i++) {
        pages.push(`books/${bookId}/${editionKey}/interiors/${String(i).padStart(2, '0')}.png`);
      }
    }

    activeModalState.pages = pages;
    if (activeModalState.currentPage >= pages.length) {
      activeModalState.currentPage = 0;
    }
  }

  function createModalDOM() {
    const modal = document.createElement('div');
    modal.id = 'csa-book-modal';
    modal.className = 'csa-modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');

    modal.innerHTML = `
      <div class="csa-modal-container">
        <button type="button" class="csa-modal-close-btn" aria-label="${t('modal.close')}" onclick="closeBookModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div class="csa-modal-body" id="csa-modal-body">
          <!-- Dynamic content inserted by updateModalContent() -->
        </div>
      </div>
    `;

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBookModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!activeModalState) return;
      if (e.key === 'Escape') closeBookModal();
      if (e.key === 'ArrowLeft') modalPrevPage();
      if (e.key === 'ArrowRight') modalNextPage();
    });

    return modal;
  }

  function updateModalContent() {
    if (!activeModalState) return;
    const { bookId, editionKey, currentPage, pages } = activeModalState;
    const data = window.CSA_BOOKS_DATA;
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;

    const body = document.getElementById('csa-modal-body');
    if (!body) return;

    const effLang = getEffectiveBookLang(currentLang);
    const bookTitle = (book.title && (book.title[editionKey] || book.title[effLang] || book.title[currentLang] || book.title.it)) || '';
    const bookPitch = (book.pitch && (book.pitch[effLang] || book.pitch[currentLang] || book.pitch.it)) || '';
    const benefits = (book.benefits && (book.benefits[effLang] || book.benefits[currentLang] || book.benefits.it)) || [];
    const amazonUrl = getAmazonPaperbackUrl(book, editionKey);
    const availableEditions = Object.keys(book.editions || {}).filter(k => book.editions[k].available);
    const hasEditions = availableEditions.length > 1;

    let editionsHtml = '';
    const flagCodeMap = { it: 'it', en: 'gb', fr: 'fr', de: 'de', es: 'es', nl: 'nl', pl: 'pl', se: 'se', jp: 'jp' };
    if (hasEditions) {
      editionsHtml = `
        <div class="csa-modal-edition-selector">
          <span class="csa-modal-edition-label">${t('modal.editionSelect')}</span>
          <div class="csa-modal-edition-pills">
            ${availableEditions.map(k => {
              const ed = book.editions[k];
              const isSelected = (k === editionKey);
              const flagCode = flagCodeMap[k] || k;
              return `
                <button type="button" class="csa-edition-pill ${isSelected ? 'active' : ''}" onclick="window.switchModalEdition('${k}')">
                  <img src="https://flagcdn.com/24x18/${flagCode}.png" srcset="https://flagcdn.com/48x36/${flagCode}.png 2x" width="16" height="12" alt="" class="csa-pill-flag">
                  <span>${ed.languageName || k.toUpperCase()}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else if (availableEditions.length === 1) {
      const ed = book.editions[availableEditions[0]];
      const edName = ed.languageName || (availableEditions[0] === 'it' ? 'Italiano' : availableEditions[0].toUpperCase());
      const singleLang = availableEditions[0];
      const flagCode = flagCodeMap[singleLang] || singleLang;
      editionsHtml = `
        <div class="csa-modal-edition-selector single-edition">
          <span class="csa-modal-edition-label">${t('modal.editionSelect')}</span>
          <span class="csa-edition-badge single">
            <img src="https://flagcdn.com/24x18/${flagCode}.png" srcset="https://flagcdn.com/48x36/${flagCode}.png 2x" width="16" height="12" alt="" class="csa-pill-flag">
            <span>${edName} (${t('modal.paperback')})</span>
          </span>
        </div>
      `;
    }

    let storiesHtml = '';
    if (book.storiesIncluded && Array.isArray(book.storiesIncluded)) {
      storiesHtml = `
        <div class="csa-modal-stories-box">
          <h4 class="csa-modal-subheading">${t('modal.storiesTitle')}</h4>
          <ul class="csa-modal-stories-list">
            ${book.storiesIncluded.map((s, idx) => {
              let extraTitle = '';
              if (currentLang !== 'it') {
                const storyBookId = (book.id === 'csa-vol1')
                  ? ['csa-01-benny-collina', 'csa-02-rudy-spiaggia', 'csa-03-leo-montagna', 'csa-04-bruno-papere'][idx]
                  : ['csa-05-benny-roma', 'csa-06-nina-conigli', 'csa-07-rino-ladri', 'csa-08-leo-cinciallegra'][idx];
                if (storyBookId) {
                  const sb = data.books.find(b => b.id === storyBookId);
                  const offTitle = sb?.title?.[currentLang] || sb?.title?.en;
                  if (offTitle && offTitle !== s) {
                    extraTitle = ` <span class="csa-story-translated">(${offTitle})</span>`;
                  }
                }
              }
              return `<li><span class="csa-story-check">✓</span> <strong>${s}</strong>${extraTitle}</li>`;
            }).join('')}
          </ul>
        </div>
      `;
    }

    let benefitsHtml = '';
    if (benefits && benefits.length > 0) {
      benefitsHtml = `
        <div class="csa-modal-benefits-box">
          <h4 class="csa-modal-subheading">${t('modal.benefitsTitle')}</h4>
          <ul class="csa-modal-benefits-list">
            ${benefits.map(b => `<li><span class="csa-benefit-star">★</span> ${b}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    let micrositeHtml = '';

    const currentImgUrl = (pages && pages[currentPage]) ? pages[currentPage] : `books/${bookId}/${editionKey}/cover.png`;

    body.innerHTML = `
      <div class="csa-modal-grid">
        <!-- Colonna Sinistra: Visualizzatore Pagine Sfogliabili -->
        <div class="csa-modal-viewer-col">
          <div class="csa-viewer-frame" id="csa-viewer-frame" tabindex="0">
            <button type="button" class="csa-viewer-side-arrow prev" onclick="window.modalPrevPage()" aria-label="${t('modal.prevPage')}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <img 
              src="${currentImgUrl}" 
              alt="${bookTitle} - ${t('modal.page')} ${currentPage + 1}" 
              class="csa-viewer-img" 
              id="csa-viewer-current-img" 
              onerror="this.onerror=null; this.src='books/${bookId}/${editionKey}/cover.png';"
            />
            <button type="button" class="csa-viewer-side-arrow next" onclick="window.modalNextPage()" aria-label="${t('modal.nextPage')}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <div class="csa-viewer-nav">
              <button type="button" class="csa-viewer-arrow prev" onclick="window.modalPrevPage()" aria-label="${t('modal.prevPage')}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div class="csa-viewer-counter">
                ${t('modal.page')} <span class="current" id="csa-modal-page-current">${currentPage + 1}</span> ${t('modal.of')} <span class="total">${pages.length}</span>
              </div>
              <button type="button" class="csa-viewer-arrow next" onclick="window.modalNextPage()" aria-label="${t('modal.nextPage')}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
          <div class="csa-viewer-thumbnails" id="csa-viewer-thumbnails" role="tablist" aria-label="Pagine disponibili">
            ${pages.map((p, idx) => `
              <button type="button" class="csa-thumb-btn ${idx === currentPage ? 'active' : ''}" data-idx="${idx}" onclick="window.modalGoToPage(${idx})" aria-label="${t('modal.page')} ${idx + 1}" role="tab" aria-selected="${idx === currentPage ? 'true' : 'false'}">
                <img src="${p}" alt="" loading="lazy" onerror="this.style.display='none'" />
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Colonna Destra: Scheda Editoriale & Acquisto Amazon -->
        <div class="csa-modal-info-col">
          <div class="csa-modal-badges">
            <span class="csa-badge csa-badge-age">${formatAgeBadge(book.age, currentLang)}</span>
            <span class="csa-badge csa-badge-paperback">${t('modal.paperback')}</span>
          </div>
          
          <h2 class="csa-modal-title">${bookTitle}</h2>
          <p class="csa-modal-author">${t('modal.authorLabel')} <strong>${book.author}</strong></p>

          ${editionsHtml}

          <div class="csa-modal-pitch">
            <p>${bookPitch}</p>
          </div>

          ${storiesHtml}
          ${benefitsHtml}
          ${micrositeHtml}

          <!-- Pulsante Principale Amazon Paperback -->
          <div class="csa-modal-buy-box">
            ${amazonUrl ? `
              <a 
                href="${amazonUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="csa-btn csa-btn-amazon csa-btn-lg"
                onclick="window.trackAmazonClick('${bookId}', '${amazonUrl}')"
              >
                <span>${t('modal.buyAmazonPaperback')}${availableEditions.length === 1 && availableEditions[0] === 'it' && currentLang !== 'it' ? ' (IT)' : ''}</span>
              </a>
            ` : `
              <button type="button" class="csa-btn csa-btn-disabled csa-btn-lg" disabled>
                <span>${t('modal.buyAmazonDisabled')}</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    // Attach touch gestures for mobile swiping
    const frame = document.getElementById('csa-viewer-frame');
    if (frame) {
      let touchStartX = 0;
      frame.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      frame.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (diff > 45) {
          window.modalNextPage();
        } else if (diff < -45) {
          window.modalPrevPage();
        }
      }, { passive: true });
    }
  }

  function updateModalPageOnly() {
    if (!activeModalState || !activeModalState.pages) return;
    const { bookId, editionKey, currentPage, pages } = activeModalState;
    const imgEl = document.getElementById('csa-viewer-current-img');
    const counterEl = document.getElementById('csa-modal-page-current');
    if (!imgEl || !counterEl) {
      updateModalContent();
      return;
    }

    const currentImgUrl = (pages && pages[currentPage]) ? pages[currentPage] : `books/${bookId}/${editionKey}/cover.png`;
    imgEl.style.opacity = '0.35';
    imgEl.src = currentImgUrl;
    imgEl.onload = () => { imgEl.style.opacity = '1'; };
    setTimeout(() => { imgEl.style.opacity = '1'; }, 200);

    counterEl.textContent = String(currentPage + 1);

    const thumbs = document.querySelectorAll('.csa-thumb-btn');
    thumbs.forEach(t => {
      const idx = parseInt(t.getAttribute('data-idx'), 10);
      const isActive = idx === currentPage;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive && typeof t.scrollIntoView === 'function') {
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }

  window.switchModalEdition = function(newLang) {
    if (!activeModalState) return;
    activeModalState.editionKey = newLang;
    activeModalState.currentPage = 0;
    updateModalPagesList();
    updateModalContent();
  };

  window.modalPrevPage = function() {
    if (!activeModalState || !activeModalState.pages) return;
    if (activeModalState.currentPage > 0) {
      activeModalState.currentPage--;
    } else {
      activeModalState.currentPage = activeModalState.pages.length - 1;
    }
    updateModalPageOnly();
  };

  window.modalNextPage = function() {
    if (!activeModalState || !activeModalState.pages) return;
    if (activeModalState.currentPage < activeModalState.pages.length - 1) {
      activeModalState.currentPage++;
    } else {
      activeModalState.currentPage = 0;
    }
    updateModalPageOnly();
  };

  window.modalGoToPage = function(index) {
    if (!activeModalState || !activeModalState.pages) return;
    if (index >= 0 && index < activeModalState.pages.length) {
      activeModalState.currentPage = index;
      updateModalPageOnly();
    }
  };

  // Render Featured Books in Homepage
  function renderFeaturedSection() {
    const container = document.getElementById('csa-featured-books-grid') || document.getElementById('csa-featured-grid');
    if (!container) return;

    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return;

    const featuredIds = data.featuredBookIds || ['csa-vol1', 'csa-vol2', 'einstein'];
    const books = featuredIds
      .map(id => data.books.find(b => b.id === id))
      .filter(Boolean)
      .filter(b => Object.values(b.editions || {}).some(ed => ed && ed.available));

    const sectionEl = document.getElementById('in-primo-piano');
    if (sectionEl) {
      sectionEl.style.display = books.length > 0 ? '' : 'none';
    }

    if (books.length === 1) {
      container.style.gridTemplateColumns = 'minmax(280px, 420px)';
      container.style.justifyContent = 'center';
    } else if (books.length === 2) {
      container.style.gridTemplateColumns = 'repeat(2, minmax(280px, 420px))';
      container.style.justifyContent = 'center';
    } else {
      container.style.gridTemplateColumns = '';
      container.style.justifyContent = '';
    }

    container.innerHTML = books.map(book => {
      const effLang = getEffectiveBookLang(currentLang);
      const title = (book.title && (book.title[currentLang] || book.title[effLang] || book.title.it)) || '';
      const subtitle = (book.subtitle && (book.subtitle[currentLang] || book.subtitle[effLang] || book.subtitle.it)) || '';
      const amazonUrl = getAmazonPaperbackUrl(book, currentLang);
      const coverUrl = getBookCover(book.id, currentLang);
      const langBadgesHtml = renderCardLanguageBadges(book, currentLang);

      const availLangs = Object.keys(book.editions || {}).filter(k => book.editions[k]?.available);
      const edKey = availLangs.includes(currentLang) ? currentLang : (availLangs.includes('en') ? 'en' : availLangs[0]);
      const buyLabel = (edKey && edKey !== currentLang) 
        ? `${t('featured.buyAmazon')} (${edKey.toUpperCase()})` 
        : t('featured.buyAmazon');

      return `
        <article class="csa-book-card csa-featured-card" id="book-${book.id}" data-book-id="${book.id}">
          <div class="csa-card-media" onclick="window.openBookModal('${book.id}')">
            <img 
              src="${coverUrl}" 
              alt="${title}" 
              class="csa-card-cover-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='books/${book.id}/it/cover.png';"
            />
            <button type="button" class="csa-card-preview-btn" aria-label="${t('featured.readSample')} - ${title}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>${t('featured.readSample')}</span>
            </button>
          </div>

          <div class="csa-card-content">
            <span class="csa-card-author">${book.author}</span>
            <h3 class="csa-card-title" onclick="window.openBookModal('${book.id}')">${title}</h3>
            <p class="csa-card-subtitle">${subtitle}</p>
            ${langBadgesHtml}

            <div class="csa-card-actions">
              ${amazonUrl ? `
                <a 
                  href="${amazonUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="csa-btn csa-btn-amazon csa-btn-block"
                  onclick="window.trackAmazonClick('${book.id}', '${amazonUrl}')"
                >
                  <span>${buyLabel}</span>
                </a>
              ` : `
                <button type="button" class="csa-btn csa-btn-disabled csa-btn-block" disabled>
                  <span>${t('featured.comingSoon')}</span>
                </button>
              `}
              <button type="button" class="csa-btn csa-btn-secondary csa-btn-block" onclick="window.openBookModal('${book.id}')">
                ${t('featured.viewDetails')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Full Catalog Section
  let currentCatFilter = 'all';
  let currentAgeFilter = 'all';
  let currentSearchQuery = '';

  function renderCatalogSection() {
    const container = document.getElementById('csa-catalog-grid');
    if (!container) return;

    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return;

    let filtered = data.books.filter(book => {
      // Must have at least one published edition
      const availLangs = Object.keys(book.editions || {}).filter(k => book.editions[k]?.available);
      if (availLangs.length === 0) return false;

      if (currentCatFilter !== 'all' && book.category !== currentCatFilter) return false;
      if (currentAgeFilter !== 'all') {
        const cleanAge = String(book.age || '').replace(/–/g, '-');
        if (currentAgeFilter === '2-5' && cleanAge !== '2-5') return false;
        if (currentAgeFilter === '5-10' && cleanAge !== '5-10') return false;
        if (currentAgeFilter === '7-12' && (cleanAge !== '7-12' && cleanAge !== '7-8')) return false;
      }
      if (currentSearchQuery.trim() !== '') {
        const q = currentSearchQuery.toLowerCase();
        const effLang = getEffectiveBookLang(currentLang);
        const tIt = (book.title.it || '').toLowerCase();
        const tCur = (book.title[currentLang] || '').toLowerCase();
        const tEff = (book.title[effLang] || '').toLowerCase();
        const aut = (book.author || '').toLowerCase();
        const pit = (book.pitch[currentLang] || book.pitch[effLang] || book.pitch.it || '').toLowerCase();
        if (!tIt.includes(q) && !tCur.includes(q) && !tEff.includes(q) && !aut.includes(q) && !pit.includes(q)) return false;
      }
      return true;
    });

    const countEl = document.getElementById('csa-catalog-count');
    if (countEl) {
      countEl.textContent = `${filtered.length} ${t('catalog.resultsCount')}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="csa-catalog-empty">
          <p class="csa-empty-text">${t('catalog.noResults')}</p>
          <button type="button" class="csa-btn csa-btn-secondary" onclick="window.resetCatalogFilters()">
            ${t('catalog.resetFilters')}
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(book => {
      const effLang = getEffectiveBookLang(currentLang);
      const title = (book.title && (book.title[currentLang] || book.title[effLang] || book.title.it)) || '';
      const pitch = (book.pitch && (book.pitch[currentLang] || book.pitch[effLang] || book.pitch.it)) || '';
      const amazonUrl = getAmazonPaperbackUrl(book, currentLang);
      const coverUrl = getBookCover(book.id, currentLang);
      const langBadgesHtml = renderCardLanguageBadges(book, currentLang);

      const availLangs = Object.keys(book.editions || {}).filter(k => book.editions[k]?.available);
      const edKey = availLangs.includes(currentLang) ? currentLang : (availLangs.includes('en') ? 'en' : availLangs[0]);
      const buyLabel = (edKey && edKey !== currentLang) 
        ? `${t('featured.buyAmazon')} (${edKey.toUpperCase()})` 
        : t('featured.buyAmazon');

      return `
        <article class="csa-book-card" id="book-${book.id}" data-book-id="${book.id}">
          <div class="csa-card-media" onclick="window.openBookModal('${book.id}')">
            <img 
              src="${coverUrl}" 
              alt="${title}" 
              class="csa-card-cover-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.src='books/${book.id}/it/cover.png';"
            />
            <button type="button" class="csa-card-preview-btn" aria-label="${t('featured.readSample')} - ${title}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>${t('featured.readSample')}</span>
            </button>
          </div>

          <div class="csa-card-content">
            <span class="csa-card-author">${book.author}</span>
            <h3 class="csa-card-title" onclick="window.openBookModal('${book.id}')">${title}</h3>
            ${langBadgesHtml}
            <p class="csa-card-pitch">${pitch}</p>

            <div class="csa-card-actions">
              ${amazonUrl ? `
                <a 
                  href="${amazonUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="csa-btn csa-btn-amazon csa-btn-block"
                  onclick="window.trackAmazonClick('${book.id}', '${amazonUrl}')"
                >
                  <span>${buyLabel}</span>
                </a>
              ` : `
                <button type="button" class="csa-btn csa-btn-disabled csa-btn-block" disabled>
                  <span>${t('featured.comingSoon')}</span>
                </button>
              `}
              <button type="button" class="csa-btn csa-btn-secondary csa-btn-block" onclick="window.openBookModal('${book.id}')">
                ${t('featured.viewDetails')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  window.setCatalogCatFilter = function(cat) {
    currentCatFilter = cat;
    document.querySelectorAll('.csa-cat-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });
    renderCatalogSection();
  };

  window.setCatalogAgeFilter = function(age) {
    currentAgeFilter = age;
    document.querySelectorAll('.csa-age-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-age') === age);
    });
    renderCatalogSection();
  };

  window.resetCatalogFilters = function() {
    currentCatFilter = 'all';
    currentAgeFilter = 'all';
    currentSearchQuery = '';
    const searchInput = document.getElementById('csa-catalog-search-input');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.csa-cat-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
    });
    document.querySelectorAll('.csa-age-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-age') === 'all');
    });
    renderCatalogSection();
  };

  // Helper: resolve book cover URL by language
  function getBookCover(bookId, lang = currentLang) {
    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return `books/${bookId}/it/cover.png`;
    const book = data.books.find(b => b.id === bookId);
    if (!book) return `books/${bookId}/it/cover.png`;
    const effLang = getEffectiveBookLang(lang);
    const hasLang = (book.editions && book.editions[effLang] && book.editions[effLang].available);
    return `books/${bookId}/${hasLang ? effLang : 'it'}/cover.png`;
  }
  window.getBookCover = getBookCover;

  // Specific renderers for universe pages if present
  function renderCantiereSection() {
    const data = window.CSA_BOOKS_DATA;
    if (!data) return;

    const b1 = data.books.find(b => b.id === 'csa-vol1');
    const b2 = data.books.find(b => b.id === 'csa-vol2');

    const vol1Btn = document.getElementById('csa-cantiere-vol1-buy');
    if (vol1Btn && b1) {
      const url = getAmazonPaperbackUrl(b1, currentLang);
      if (url) vol1Btn.href = url;
    }
    const vol2Btn = document.getElementById('csa-cantiere-vol2-buy');
    if (vol2Btn && b2) {
      const url = getAmazonPaperbackUrl(b2, currentLang);
      if (url) vol2Btn.href = url;
    }

    // Raccolte section (Vol. 1 and Vol. 2) is ALWAYS visible
    const raccolteSection = document.getElementById('raccolte');
    const heroCta = document.getElementById('csa-cantiere-hero-cta');
    const heroImg1 = document.getElementById('csa-cantiere-hero-img1');
    const heroImg2 = document.getElementById('csa-cantiere-hero-img2');

    if (raccolteSection) {
      raccolteSection.style.display = '';
    }
    if (heroCta) {
      heroCta.href = '#raccolte';
      heroCta.textContent = t('cantierePage.ctaRaccolte');
    }
    if (heroImg1 && heroImg2) {
      heroImg1.src = getBookCover('csa-vol1', currentLang);
      heroImg2.src = getBookCover('csa-vol2', currentLang);
    }
    const vol1CardImg = document.getElementById('csa-cantiere-vol1-card-img');
    if (vol1CardImg) {
      vol1CardImg.src = getBookCover('csa-vol1', currentLang);
    }
    const vol2CardImg = document.getElementById('csa-cantiere-vol2-card-img');
    if (vol2CardImg) {
      vol2CardImg.src = getBookCover('csa-vol2', currentLang);
    }
    const vol1Langs = document.getElementById('csa-cantiere-vol1-langs');
    if (vol1Langs && b1) {
      vol1Langs.innerHTML = renderCardLanguageBadges(b1, currentLang);
    }
    const vol2Langs = document.getElementById('csa-cantiere-vol2-langs');
    if (vol2Langs && b2) {
      vol2Langs.innerHTML = renderCardLanguageBadges(b2, currentLang);
    }

    const grid = document.getElementById('cantiere-episodes-grid');
    if (grid) {
      const episodes = data.books.filter(b => b.category === 'cantiere' && b.id !== 'csa-vol1' && b.id !== 'csa-vol2');
      grid.innerHTML = episodes.map((book, idx) => {
        const effLang = getEffectiveBookLang(currentLang);
        const title = (book.title && (book.title[currentLang] || book.title[effLang] || book.title.it)) || '';
        const subtitle = (book.subtitle && (book.subtitle[currentLang] || book.subtitle[effLang] || book.subtitle.it)) || `Episodio ${idx + 1}`;
        const pitch = (book.pitch && (book.pitch[currentLang] || book.pitch[effLang] || book.pitch.it)) || '';
        const coverUrl = getBookCover(book.id, currentLang);
        const amazonUrl = getAmazonPaperbackUrl(book, currentLang);
        const langBadgesHtml = renderCardLanguageBadges(book, currentLang);

        const availLangs = Object.keys(book.editions || {}).filter(k => book.editions[k]?.available);
        const edKey = availLangs.includes(currentLang) ? currentLang : (availLangs.includes('en') ? 'en' : availLangs[0]);
        const buyLabel = (edKey && edKey !== currentLang) 
          ? `${t('featured.buyAmazon')} (${edKey.toUpperCase()})` 
          : t('featured.buyAmazon');

        return `
          <article class="csa-book-card" id="book-${book.id}" data-book-id="${book.id}">
            <div class="csa-card-media" onclick="window.openBookModal('${book.id}')">
              <img 
                src="${coverUrl}" 
                alt="${title}" 
                class="csa-card-cover-img" 
                loading="lazy" 
                onerror="this.onerror=null; this.src='books/${book.id}/it/cover.png';"
              />
              <button type="button" class="csa-card-preview-btn" aria-label="${t('featured.readSample')} - ${title}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                <span>${t('featured.readSample')}</span>
              </button>
            </div>

            <div class="csa-card-content">
              <span class="csa-card-author">${book.author || 'Marco Salucci'}</span>
              <h3 class="csa-card-title" onclick="window.openBookModal('${book.id}')">${title}</h3>
              <p class="csa-card-subtitle">${subtitle}</p>
              ${langBadgesHtml}
              <p class="csa-card-pitch">${pitch}</p>

              <div class="csa-card-actions">
                ${amazonUrl ? `
                  <a 
                    href="${amazonUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="csa-btn csa-btn-amazon csa-btn-block"
                    onclick="window.trackAmazonClick('${book.id}', '${amazonUrl}')"
                  >
                    <span>${buyLabel}</span>
                  </a>
                ` : `
                  <button type="button" class="csa-btn csa-btn-disabled csa-btn-block" disabled>
                    <span>${t('featured.comingSoon')}</span>
                  </button>
                `}
                <button type="button" class="csa-btn csa-btn-secondary csa-btn-block" onclick="window.openBookModal('${book.id}')">
                  ${t('featured.viewDetails')}
                </button>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  function renderScienzaSection() {
    const buyBtn = document.getElementById('csa-einstein-buy-btn');
    if (buyBtn && window.CSA_BOOKS_DATA) {
      const einstein = window.CSA_BOOKS_DATA.books.find(b => b.id === 'einstein');
      const url = getAmazonPaperbackUrl(einstein, currentLang);
      if (url) {
        buyBtn.href = url;
        buyBtn.classList.remove('csa-btn-disabled');
        const avail = Object.keys(einstein.editions || {}).filter(k => einstein.editions[k]?.available);
        const edKey = avail.includes(currentLang) ? currentLang : 'en';
        const label = (edKey !== currentLang) ? `${t('featured.buyAmazon')} (${edKey.toUpperCase()})` : t('featured.buyAmazon');
        const span = buyBtn.querySelector('span');
        if (span) span.textContent = label;
      } else {
        buyBtn.removeAttribute('href');
        buyBtn.classList.add('csa-btn-disabled');
      }
    }
    const coverImg = document.getElementById('csa-einstein-cover-img');
    if (coverImg) {
      coverImg.src = getBookCover('einstein', currentLang);
    }
  }

  function renderColorareSection() {
    const buyBtns = document.querySelectorAll('a[onclick*="window.trackAmazonClick(\'fano\'"]');
    if (buyBtns.length > 0 && window.CSA_BOOKS_DATA) {
      const fano = window.CSA_BOOKS_DATA.books.find(b => b.id === 'fano');
      if (fano) {
        const url = getAmazonPaperbackUrl(fano, currentLang);
        buyBtns.forEach(btn => {
          if (url) {
            btn.href = url;
            btn.classList.remove('csa-btn-disabled');
          }
        });
      }
    }
    const coverImg = document.querySelector('img[src*="books/fano/"]');
    if (coverImg) {
      coverImg.src = getBookCover('fano', currentLang);
    }
  }

  // ======================================================================
  // HERO BANNER CAROUSEL 16:9 (AUTO-SCROLLING, SWIPE & KEYBOARD)
  // ======================================================================
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

  const HERO_SUBTITLES = {
    it: "Storie per bambini, nate da un papà e una mamma.",
    en: "Children's stories, made by a dad and a mom.",
    de: "Kindergeschichten, von einem Papa und einer Mama.",
    fr: "Histoires pour enfants, créées par un papa et une maman.",
    es: "Cuentos infantiles, creados por un papá y una mamá.",
    nl: "Kinderverhalen, gemaakt door een papa en een mama.",
    pl: "Opowieści dla dzieci, stworzone przez tatę i mamę.",
    se: "Barnberättelser, skapade av en pappa och en mamma.",
    jp: "パパとママが作った、子どもたちのための物語。"
  };

  function updateHeroCarouselTranslations(lang) {
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const heroImg = document.getElementById('hero-banner-img');
    const isCantiere = window.location.pathname.includes('cantiere');

    if (titleEl) {
      if (isCantiere) {
        titleEl.innerHTML = (t('cantierePage.heroTitle', lang) || 'Le Avventure del Cantiere');
      } else {
        titleEl.innerHTML = 'CSA Books <span class="highlight">4 Kids</span>';
      }
    }
    if (subtitleEl && HERO_SUBTITLES[lang]) {
      subtitleEl.textContent = HERO_SUBTITLES[lang];
    }
    if (heroImg) {
      heroImg.alt = `CSA Books 4 Kids - ${HERO_SUBTITLES[lang] || HERO_SUBTITLES.it}`;
    }
  }

  function shuffleBanners(items) {
    if (!Array.isArray(items) || items.length <= 1) return items;
    const mainBannerIndex = items.findIndex(item => 
      item.characterKey === 'banner' || 
      (item.file && item.file.toLowerCase().includes('banner-csa-books-4-kids'))
    );
    let mainBanner = null;
    let remaining = [...items];
    if (mainBannerIndex !== -1) {
      mainBanner = remaining.splice(mainBannerIndex, 1)[0];
    }
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    return mainBanner ? [mainBanner, ...remaining] : remaining;
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

  function setupHeroCarousel(items) {
    const container = document.getElementById('hero-carousel');
    const slidesTrack = document.getElementById('hero-carousel-slides');
    const indicatorsContainer = document.getElementById('hero-carousel-indicators');
    const prevBtn = document.getElementById('hero-carousel-prev');
    const nextBtn = document.getElementById('hero-carousel-next');

    if (!container || !slidesTrack) return;

    const shuffled = shuffleBanners(items);
    heroCarouselState.manifest = shuffled;
    heroCarouselState.currentIndex = 0;
    const total = shuffled.length;

    slidesTrack.innerHTML = shuffled.map((item, idx) => {
      const isActive = idx === 0;
      const isPriority = idx === 0;
      const alt = `CSA Books 4 Kids - ${item.title || 'Storie per bambini'}`;
      return `
        <div class="hero-carousel-slide ${isActive ? 'active' : ''}" 
             data-index="${idx}" 
             role="group" 
             aria-roledescription="slide" 
             aria-label="${idx + 1} di ${total}"
             ${isActive ? '' : 'aria-hidden="true"'}>
          <img 
            src="${item.src}" 
            alt="${alt}" 
            class="hero-banner-img" 
            ${isPriority ? 'id="hero-banner-img" fetchpriority="high" loading="eager"' : 'loading="lazy"'}
          />
        </div>
      `;
    }).join('');

    if (indicatorsContainer) {
      if (total <= 1) {
        indicatorsContainer.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
      } else {
        indicatorsContainer.style.display = 'flex';
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';

        indicatorsContainer.innerHTML = shuffled.map((item, idx) => {
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

      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          goToHeroSlide(heroCarouselState.currentIndex - 1);
          resetHeroAutoplay();
        } else if (e.key === 'ArrowRight') {
          goToHeroSlide(heroCarouselState.currentIndex + 1);
          resetHeroAutoplay();
        }
      });

      container.addEventListener('mouseenter', () => {
        heroCarouselState.isPaused = true;
        clearTimeout(heroCarouselState.timer);
      });
      container.addEventListener('mouseleave', () => {
        heroCarouselState.isPaused = false;
        startHeroAutoplay();
      });

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

    startHeroAutoplay();
    updateHeroCarouselTranslations(currentLang);
  }

  function initHeroCarousel() {
    const container = document.getElementById('hero-carousel');
    if (!container) return;

    if (Array.isArray(window.BANNER_MANIFEST) && window.BANNER_MANIFEST.length > 0) {
      setupHeroCarousel(window.BANNER_MANIFEST);
      return;
    }

    fetch('assets/banner/banners.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setupHeroCarousel(data);
        }
      })
      .catch(err => {
        console.warn('[Carousel] Fallback static hero active');
      });
  }

  // =========================================================================
  // SEZIONE RECENSIONI AMAZON (Social Proof)
  // =========================================================================
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
    const reviews = window.CSA_AMAZON_REVIEWS || [];
    const visible = getVisibleReviewCardsCount();
    return Math.max(0, reviews.length - visible);
  }

  function renderReviewCards() {
    const track = document.getElementById('reviews-slider-track');
    if (!track) return;

    const reviews = window.CSA_AMAZON_REVIEWS || [];
    if (!reviews || reviews.length === 0) return;

    const ratingLabel = t('reviews.ratingLabel') || 'Valutazione: ';
    const amazonSource = t('reviews.amazonSource') || 'Recensione Amazon';

    track.innerHTML = reviews.map((review, idx) => {
      const initial = review.reviewer ? review.reviewer.charAt(0).toUpperCase() : '★';
      const textObj = review.text || {};
      const reviewText = textObj[currentLang] || textObj.it || textObj.en || (typeof review.text === 'string' ? review.text : '');

      return `
        <article class="review-card" data-review-index="${idx}">
          <div class="review-card-header">
            <div class="review-stars" aria-label="${ratingLabel} 5/5">
              <span class="review-rating-label">${ratingLabel}</span>
              <span class="review-stars-icons" aria-hidden="true">★★★★★</span>
            </div>
            <span class="review-quote-mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </span>
          </div>
          <div class="review-body">
            <p class="review-text">"${reviewText}"</p>
          </div>
          <div class="review-card-footer">
            <div class="reviewer-meta">
              <div class="reviewer-avatar" aria-hidden="true">${initial}</div>
              <h3 class="reviewer-name">${review.reviewer}</h3>
            </div>
            <div class="review-amazon-badge" title="Recensione autentica da Amazon">
              <img src="assets/amazon-logo.jpg" alt="Amazon" class="review-amazon-img" width="18" height="18" onerror="this.style.display='none'" />
              <span class="amazon-label-text">${amazonSource}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    updateReviewsSliderPosition();
    renderReviewIndicators();
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
  window.slideReviews = slideReviews;

  function goToReviewSlide(index) {
    const maxIndex = getMaxReviewIndex();
    reviewsSliderState.currentIndex = Math.min(Math.max(0, index), maxIndex);
    updateReviewsSliderPosition();
    updateReviewIndicators();
  }
  window.goToReviewSlide = goToReviewSlide;

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
                aria-label="${i + 1} / ${totalDots}"
                onclick="window.goToReviewSlide(${i})">
        </button>
      `;
    }
    indicators.innerHTML = dotsHtml;
  }

  function updateReviewIndicators() {
    const dots = document.querySelectorAll('.reviews-dot');
    dots.forEach((dot, idx) => {
      const isActive = idx === reviewsSliderState.currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function initReviewsSlider() {
    const track = document.getElementById('reviews-slider-track');
    const carousel = document.getElementById('reviews-carousel');
    const prevBtn = document.getElementById('reviews-prev-btn');
    const nextBtn = document.getElementById('reviews-next-btn');

    if (!track || !carousel) return;

    renderReviewCards();

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

      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          slideReviews(-1);
        } else if (e.key === 'ArrowRight') {
          slideReviews(1);
        }
      });

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
            if (diff > 0) slideReviews(1);
            else slideReviews(-1);
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
  }

  // Mobile navigation drawer toggle
  function initNavigation() {
    const toggle = document.getElementById('csa-menu-toggle');
    const drawer = document.getElementById('csa-mobile-drawer');
    const closeBtn = document.getElementById('csa-drawer-close');

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          drawer.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      }
    }

    // Catalog search input listener
    const searchInput = document.getElementById('csa-catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        renderCatalogSection();
      });
    }

    // Mobile language select listener
    const mobileSelect = document.getElementById('mobile-lang-select');
    if (mobileSelect) {
      mobileSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  }

  // Handle URL hash direct deep links (e.g. #book-einstein)
  function handleHashDeepLinks() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#book-')) {
      const bookId = hash.replace('#book-', '');
      setTimeout(() => {
        openBookModal(bookId);
      }, 200);
    }
  }

  // DOM ready bootstrap
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initNavigation();
    initHeroCarousel();
    initReviewsSlider();
    handleHashDeepLinks();
  });

})();
