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

  // Default marketplace for each interface language
  const LANG_MARKET_MAP = {
    it: 'it',
    en: 'com',
    de: 'de',
    fr: 'fr',
    es: 'es',
    nl: 'nl',
    pl: 'pl',
    se: 'se',
    jp: 'jp'
  };

  // State
  let currentLang = DEFAULT_LANG;
  let activeModalState = null;

  // Initialize language from localStorage or browser
  function initLanguage() {
    let saved = null;
    try {
      saved = localStorage.getItem('csa_language') || localStorage.getItem('csa_lang');
    } catch(e) {}

    if (saved && SUPPORTED_LANGS.includes(saved.toLowerCase())) {
      currentLang = saved.toLowerCase();
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
      if (SUPPORTED_LANGS.includes(browserLang)) {
        currentLang = browserLang;
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
    } catch(e) {}
    applyLanguage(norm, true);
  }
  window.setLanguage = setLanguage;

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
    updateHeroCarouselTranslations(lang);

    // If modal is open, re-render modal with new language
    if (activeModalState) {
      updateModalContent();
    }

    if (triggerEvents) {
      window.dispatchEvent(new CustomEvent('csa-language-changed', { detail: { lang } }));
    }
  }

  // Central Amazon Link Helper
  function getAmazonPaperbackUrl(book, lang = currentLang) {
    if (!book || !book.editions) return null;
    
    // Check if book has edition in current language, or fallback to first available edition
    let edKey = lang;
    if (!book.editions[edKey] || !book.editions[edKey].available) {
      // Find first available edition
      const availKeys = Object.keys(book.editions).filter(k => book.editions[k].available);
      if (availKeys.length === 0) return null;
      edKey = availKeys[0];
    }

    const edition = book.editions[edKey];
    if (!edition.available) return null;

    // Prefer market matching site language
    const preferredMarket = LANG_MARKET_MAP[lang] || 'it';
    if (edition.amazon && edition.amazon[preferredMarket]) {
      const val = edition.amazon[preferredMarket];
      return val.startsWith('http') ? val : `https://www.amazon.${preferredMarket === 'com' ? 'com' : (preferredMarket === 'uk' ? 'co.uk' : preferredMarket)}/dp/${val}`;
    }

    // Otherwise first market configured
    if (edition.amazon) {
      const markets = Object.keys(edition.amazon);
      if (markets.length > 0) {
        const m = markets[0];
        const val = edition.amazon[m];
        return val.startsWith('http') ? val : `https://www.amazon.${m === 'com' ? 'com' : (m === 'uk' ? 'co.uk' : m)}/dp/${val}`;
      }
    }

    return null;
  }
  window.getAmazonPaperbackUrl = getAmazonPaperbackUrl;

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

  // Look Inside / Read Sample Modal
  function openBookModal(bookId, requestedLang = currentLang) {
    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return;
    const book = data.books.find(b => b.id === bookId);
    if (!book) return;

    // Determine available edition
    let editionKey = requestedLang;
    if (!book.editions || !book.editions[editionKey]) {
      editionKey = Object.keys(book.editions || {})[0] || 'it';
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

    const bookTitle = (book.title && (book.title[editionKey] || book.title[currentLang] || book.title.it)) || '';
    const bookPitch = (book.pitch && (book.pitch[currentLang] || book.pitch.it)) || '';
    const benefits = (book.benefits && (book.benefits[currentLang] || book.benefits.it)) || [];
    const amazonUrl = getAmazonPaperbackUrl(book, editionKey);
    const hasEditions = book.editions && Object.keys(book.editions).length > 1;

    let editionsHtml = '';
    if (hasEditions) {
      editionsHtml = `
        <div class="csa-modal-edition-selector">
          <span class="csa-modal-edition-label">${t('modal.editionSelect')}</span>
          <div class="csa-modal-edition-pills">
            ${Object.keys(book.editions).map(k => {
              const ed = book.editions[k];
              const isSelected = (k === editionKey);
              return `
                <button type="button" class="csa-edition-pill ${isSelected ? 'active' : ''}" onclick="window.switchModalEdition('${k}')">
                  ${ed.languageName || k.toUpperCase()}
                  ${ed.available ? '' : ' <span class="csa-pill-badge">(' + t('featured.comingSoon') + ')</span>'}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    let storiesHtml = '';
    if (book.storiesIncluded && Array.isArray(book.storiesIncluded)) {
      storiesHtml = `
        <div class="csa-modal-stories-box">
          <h4 class="csa-modal-subheading">${t('modal.storiesTitle')}</h4>
          <ul class="csa-modal-stories-list">
            ${book.storiesIncluded.map(s => `<li><span class="csa-story-check">✓</span> ${s}</li>`).join('')}
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
          <div class="csa-viewer-frame">
            <img 
              src="${currentImgUrl}" 
              alt="${bookTitle} - ${t('modal.page')} ${currentPage + 1}" 
              class="csa-viewer-img" 
              id="csa-viewer-current-img" 
              onerror="this.onerror=null; this.src='books/${bookId}/${editionKey}/cover.png';"
            />
            <div class="csa-viewer-nav">
              <button type="button" class="csa-viewer-arrow prev" onclick="window.modalPrevPage()" aria-label="${t('modal.prevPage')}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <div class="csa-viewer-counter">
                ${t('modal.page')} <span class="current">${currentPage + 1}</span> ${t('modal.of')} <span class="total">${pages.length}</span>
              </div>
              <button type="button" class="csa-viewer-arrow next" onclick="window.modalNextPage()" aria-label="${t('modal.nextPage')}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
          <div class="csa-viewer-thumbnails">
            ${pages.map((p, idx) => `
              <button type="button" class="csa-thumb-btn ${idx === currentPage ? 'active' : ''}" onclick="window.modalGoToPage(${idx})" aria-label="${t('modal.page')} ${idx + 1}">
                <img src="${p}" alt="" loading="lazy" onerror="this.style.display='none'" />
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Colonna Destra: Scheda Editoriale & Acquisto Amazon -->
        <div class="csa-modal-info-col">
          <div class="csa-modal-badges">
            <span class="csa-badge csa-badge-age">${book.age} ${t('ages.age2to5').split(' ')[1] || 'anni'}</span>
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
                <svg class="csa-amazon-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.9 12.8c-1.3-.2-2.8-.4-4.2-.4-3.6 0-5.7 1.7-5.7 4.2 0 2.4 1.8 3.8 4.6 3.8 2.2 0 3.9-.9 4.8-2.3v2.1h3.3v-9c0-3.1-2.4-4.8-6.4-4.8-3.4 0-5.8 1.4-6.3 3.6l3 .5c.3-1.1 1.6-1.7 3.3-1.7 2.1 0 3.1.9 3.1 2.5v1.5zm-3.8 5.6c-1.5 0-2.4-.8-2.4-2 0-1.3 1.1-2.1 2.8-2.1 1.2 0 2.4.2 3.4.4v1.2c-.8 1.5-2.2 2.5-3.8 2.5zM22.5 19.8c-.3.4-.8.5-1.2.3-4.2-2.5-10.4-3.1-15.5-1.7-.5.1-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 5.8-1.5 12.6-.9 17.3 1.8.4.3.5.9.2 1.4h-.2z"/></svg>
                <span>${t('modal.buyAmazonPaperback')}</span>
                <span class="csa-btn-sublabel">(${t('modal.paperback')})</span>
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
    updateModalContent();
  };

  window.modalNextPage = function() {
    if (!activeModalState || !activeModalState.pages) return;
    if (activeModalState.currentPage < activeModalState.pages.length - 1) {
      activeModalState.currentPage++;
    } else {
      activeModalState.currentPage = 0;
    }
    updateModalContent();
  };

  window.modalGoToPage = function(index) {
    if (!activeModalState || !activeModalState.pages) return;
    if (index >= 0 && index < activeModalState.pages.length) {
      activeModalState.currentPage = index;
      updateModalContent();
    }
  };

  // Render Featured Books in Homepage
  function renderFeaturedSection() {
    const container = document.getElementById('csa-featured-books-grid');
    if (!container) return;

    const data = window.CSA_BOOKS_DATA;
    if (!data || !data.books) return;

    const featuredIds = data.featuredBookIds || ['einstein', 'csa-vol1', 'csa-vol2'];
    const books = featuredIds.map(id => data.books.find(b => b.id === id)).filter(Boolean);

    container.innerHTML = books.map(book => {
      const title = (book.title && (book.title[currentLang] || book.title.it)) || '';
      const subtitle = (book.subtitle && (book.subtitle[currentLang] || book.subtitle.it)) || '';
      const pitch = (book.pitch && (book.pitch[currentLang] || book.pitch.it)) || '';
      const amazonUrl = getAmazonPaperbackUrl(book, currentLang);
      const coverUrl = `books/${book.id}/${(book.editions && book.editions[currentLang] && book.editions[currentLang].available) ? currentLang : 'it'}/cover.png`;
      const isEinstein = book.id === 'einstein';

      return `
        <article class="csa-book-card csa-featured-card" data-book-id="${book.id}">
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
            <span class="csa-card-age-tag">${book.age} ${t('ages.age2to5').split(' ')[1] || 'anni'}</span>
          </div>

          <div class="csa-card-content">
            <span class="csa-card-author">${book.author}</span>
            <h3 class="csa-card-title" onclick="window.openBookModal('${book.id}')">${title}</h3>
            <p class="csa-card-subtitle">${subtitle}</p>
            <p class="csa-card-pitch">${pitch}</p>

            ${book.storiesIncluded ? `
              <div class="csa-card-highlights">
                <span class="csa-highlight-label">✓ ${book.storiesIncluded.length} ${t('modal.storiesTitle')}</span>
              </div>
            ` : ''}

            ${isEinstein ? `
              <div class="csa-card-highlights">
                <span class="csa-highlight-label">🔬 57 scoperte scientifiche & QR interattivo</span>
              </div>
            ` : ''}

            <div class="csa-card-actions">
              ${amazonUrl ? `
                <a 
                  href="${amazonUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="csa-btn csa-btn-amazon csa-btn-block"
                  onclick="window.trackAmazonClick('${book.id}', '${amazonUrl}')"
                >
                  <svg class="csa-amazon-icon" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M13.9 12.8c-1.3-.2-2.8-.4-4.2-.4-3.6 0-5.7 1.7-5.7 4.2 0 2.4 1.8 3.8 4.6 3.8 2.2 0 3.9-.9 4.8-2.3v2.1h3.3v-9c0-3.1-2.4-4.8-6.4-4.8-3.4 0-5.8 1.4-6.3 3.6l3 .5c.3-1.1 1.6-1.7 3.3-1.7 2.1 0 3.1.9 3.1 2.5v1.5zm-3.8 5.6c-1.5 0-2.4-.8-2.4-2 0-1.3 1.1-2.1 2.8-2.1 1.2 0 2.4.2 3.4.4v1.2c-.8 1.5-2.2 2.5-3.8 2.5zM22.5 19.8c-.3.4-.8.5-1.2.3-4.2-2.5-10.4-3.1-15.5-1.7-.5.1-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 5.8-1.5 12.6-.9 17.3 1.8.4.3.5.9.2 1.4h-.2z"/></svg>
                  <span>${t('featured.buyAmazon')}</span>
                  <span class="csa-badge-edition">(${t('featured.paperbackBadge')})</span>
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
      if (currentCatFilter !== 'all' && book.category !== currentCatFilter) return false;
      if (currentAgeFilter !== 'all') {
        if (currentAgeFilter === '2-5' && book.age !== '2–5') return false;
        if (currentAgeFilter === '5-10' && book.age !== '5–10') return false;
        if (currentAgeFilter === '7-12' && (book.age !== '7–12' && book.age !== '7–8')) return false;
      }
      if (currentSearchQuery.trim() !== '') {
        const q = currentSearchQuery.toLowerCase();
        const tIt = (book.title.it || '').toLowerCase();
        const tCur = (book.title[currentLang] || '').toLowerCase();
        const aut = (book.author || '').toLowerCase();
        const pit = (book.pitch[currentLang] || book.pitch.it || '').toLowerCase();
        if (!tIt.includes(q) && !tCur.includes(q) && !aut.includes(q) && !pit.includes(q)) return false;
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
      const title = (book.title && (book.title[currentLang] || book.title.it)) || '';
      const pitch = (book.pitch && (book.pitch[currentLang] || book.pitch.it)) || '';
      const amazonUrl = getAmazonPaperbackUrl(book, currentLang);
      const coverUrl = `books/${book.id}/${(book.editions && book.editions[currentLang] && book.editions[currentLang].available) ? currentLang : 'it'}/cover.png`;

      return `
        <article class="csa-book-card" data-book-id="${book.id}">
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
            <span class="csa-card-age-tag">${book.age} ${t('ages.age2to5').split(' ')[1] || 'anni'}</span>
          </div>

          <div class="csa-card-content">
            <span class="csa-card-author">${book.author}</span>
            <h3 class="csa-card-title" onclick="window.openBookModal('${book.id}')">${title}</h3>
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
                  <svg class="csa-amazon-icon" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M13.9 12.8c-1.3-.2-2.8-.4-4.2-.4-3.6 0-5.7 1.7-5.7 4.2 0 2.4 1.8 3.8 4.6 3.8 2.2 0 3.9-.9 4.8-2.3v2.1h3.3v-9c0-3.1-2.4-4.8-6.4-4.8-3.4 0-5.8 1.4-6.3 3.6l3 .5c.3-1.1 1.6-1.7 3.3-1.7 2.1 0 3.1.9 3.1 2.5v1.5zm-3.8 5.6c-1.5 0-2.4-.8-2.4-2 0-1.3 1.1-2.1 2.8-2.1 1.2 0 2.4.2 3.4.4v1.2c-.8 1.5-2.2 2.5-3.8 2.5zM22.5 19.8c-.3.4-.8.5-1.2.3-4.2-2.5-10.4-3.1-15.5-1.7-.5.1-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 5.8-1.5 12.6-.9 17.3 1.8.4.3.5.9.2 1.4h-.2z"/></svg>
                  <span>${t('featured.buyAmazon')}</span>
                  <span class="csa-badge-edition">(${t('featured.paperbackBadge')})</span>
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

  // Specific renderers for universe pages if present
  function renderCantiereSection() {
    const vol1Btn = document.getElementById('csa-cantiere-vol1-buy');
    if (vol1Btn && window.CSA_BOOKS_DATA) {
      const b1 = window.CSA_BOOKS_DATA.books.find(b => b.id === 'csa-vol1');
      const url = getAmazonPaperbackUrl(b1, currentLang);
      if (url) vol1Btn.href = url;
    }
    const vol2Btn = document.getElementById('csa-cantiere-vol2-buy');
    if (vol2Btn && window.CSA_BOOKS_DATA) {
      const b2 = window.CSA_BOOKS_DATA.books.find(b => b.id === 'csa-vol2');
      const url = getAmazonPaperbackUrl(b2, currentLang);
      if (url) vol2Btn.href = url;
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
      } else {
        buyBtn.removeAttribute('href');
        buyBtn.classList.add('csa-btn-disabled');
      }
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
    if (titleEl) {
      titleEl.innerHTML = 'CSA Books <span class="highlight">Kids</span>';
    }
    if (subtitleEl && HERO_SUBTITLES[lang]) {
      subtitleEl.textContent = HERO_SUBTITLES[lang];
    }
    if (heroImg) {
      heroImg.alt = `CSA Books Kids - ${HERO_SUBTITLES[lang] || HERO_SUBTITLES.it}`;
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
      const alt = `CSA Books Kids - ${item.title || 'Storie per bambini'}`;
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
    handleHashDeepLinks();
  });

})();
