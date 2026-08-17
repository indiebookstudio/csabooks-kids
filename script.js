/**
 * CSA Books 4 Kids - Main Application Script
 * Automatic locale detection, dynamic language switching, instant Amazon conversion & Read Sample Viewer
 */

// Dizionario testi UI Multilingua
const I18N = {
  it: {
    authorBy: "Di",
    readSampleBtn: "📖 Leggi Estratto",
    sampleBadge: "📖 Anteprima",
    frontCoverLabel: "Copertina (Front)",
    backCoverLabel: "Retro Copertina (Back)",
    pageLabel: "Pagina",
    footerAbout: "Storie e libri illustrati pensati per accendere la fantasia e la curiosità dei più piccoli.",
    copyright: "© 2026 CSA Books 4 Kids. Tutti i diritti riservati."
  },
  en: {
    authorBy: "By",
    readSampleBtn: "📖 Read Sample",
    sampleBadge: "📖 Sample Preview",
    frontCoverLabel: "Front Cover",
    backCoverLabel: "Back Cover",
    pageLabel: "Page",
    footerAbout: "Inspiring stories and picture books designed to spark young imaginations and curious minds.",
    copyright: "© 2026 CSA Books 4 Kids. All rights reserved."
  }
};

// Stato dell'applicazione
let currentLanguage = 'it';
let activePreviewBook = null;
let currentPreviewIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  currentLanguage = detectInitialLanguage();
  applyLanguage(currentLanguage);
  handleDirectBookDeepLink();
  initGlobalDropdownCloser();
  initSampleModalEvents();
});

/* ==========================================================================
   1. RILEVAMENTO LINGUA & LOCALE AUTOMATICO
   ========================================================================== */

function detectInitialLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  if (paramLang && (paramLang === 'it' || paramLang === 'en')) {
    return paramLang;
  }

  const savedLang = localStorage.getItem('csabooks_lang');
  if (savedLang && (savedLang === 'it' || savedLang === 'en')) {
    return savedLang;
  }

  const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'it').toLowerCase();
  if (browserLang.startsWith('it')) {
    return 'it';
  }
  
  return 'en';
}

window.setLanguage = function(langCode) {
  if (langCode !== 'it' && langCode !== 'en') return;
  currentLanguage = langCode;
  localStorage.setItem('csabooks_lang', langCode);

  const url = new URL(window.location);
  url.searchParams.set('lang', langCode);
  window.history.replaceState({}, '', url);

  applyLanguage(langCode);
};

/* ==========================================================================
   2. APPLICAZIONE TESTI E LOGO IN BASE ALLA LINGUA
   ========================================================================== */

function applyLanguage(lang) {
  const strings = I18N[lang] || I18N.it;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  const logoImg = document.getElementById('series-logo-img');
  if (logoImg) {
    if (lang === 'en') {
      logoImg.src = 'assets/construction-site-adventures/Logo.ENG.v2.png';
      logoImg.alt = 'Construction Site Adventures - Series Logo';
    } else {
      logoImg.src = 'assets/construction-site-adventures/Logo.ITA.v2.png';
      logoImg.alt = 'Le Avventure del Cantiere - Logo Collana';
    }
  }

  setText('footer-about-text', strings.footerAbout);
  setText('footer-copyright-text', strings.copyright);

  renderBookCatalog(lang);
}

function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = text;
}

/* ==========================================================================
   3. RENDERING CATALOGO LIBRI
   ========================================================================== */

function renderBookCatalog(lang) {
  const grid = document.getElementById('books-catalog-grid');
  if (!grid) return;

  const currentBooks = BOOKS.filter(b => b.languageCode === lang && b.collection === 'construction-site');
  const strings = I18N[lang] || I18N.it;

  if (currentBooks.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nessun libro trovato.</p>`;
    return;
  }

  const cardsHtml = currentBooks.map((book, index) => {
    const uniqueId = `book-${book.id || index}`;
    const amazonActionHtml = buildAmazonButton(book, uniqueId, lang);
    const langMeta = LANGUAGE_META[book.languageCode] || { name: 'IT', flag: '🇮🇹' };

    const hasPreview = Array.isArray(book.preview) && book.preview.length > 0;
    const sampleChipHtml = hasPreview ? `
      <button type="button" class="card-meta-chip chip-sample-btn" onclick="openSampleModal('${escapeJs(book.id)}')" aria-label="${strings.readSampleBtn} - ${escapeHtml(book.title)}">
        <span>${strings.readSampleBtn}</span>
      </button>
    ` : '';

    return `
      <article class="book-card" id="card-${book.id}">
        <div class="book-cover-wrap">
          <img 
            src="${escapeHtml(book.cover)}" 
            alt="${escapeHtml(book.title)}" 
            loading="lazy"
            onerror="handleCoverError(this, '${escapeJs(book.title)}', '🏗️')"
          />
        </div>

        <div class="book-card-meta">
          ${sampleChipHtml}
        </div>

        <h2 class="book-card-title">${escapeHtml(book.title)}</h2>
        <div class="book-card-author"><span class="muted">${strings.authorBy}</span> ${escapeHtml(book.author || 'Marco Salucci')}</div>

        <div class="book-cta-wrapper">
          ${amazonActionHtml}
        </div>
      </article>
    `;
  }).join('');

  grid.innerHTML = cardsHtml;
}

/* ==========================================================================
   4. MODAL POPUP ANTEPRIMA (READ SAMPLE VIEWER)
   ========================================================================== */

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
  if (badgeEl) badgeEl.textContent = strings.sampleBadge;

  // Renderizza il pulsante Amazon all'interno del modal
  if (footerEl) {
    footerEl.innerHTML = buildAmazonButton(book, `modal-${book.id}`, currentLanguage);
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

  // Descrizione pagina (Front Cover, Pagina 2, ... Back Cover)
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

  // Preload dell'immagine successiva per navigazione istantanea
  if (currentPreviewIndex + 1 < total) {
    const preloadImg = new Image();
    preloadImg.src = pages[currentPreviewIndex + 1];
  }
}

function initSampleModalEvents() {
  const modal = document.getElementById('sample-modal');
  if (modal) {
    // Chiudi cliccando sullo sfondo
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSampleModal();
      }
    });
  }

  // Tasti tastiera: Escape, Frecce sinistra/destra
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('sample-modal');
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeSampleModal();
    } else if (e.key === 'ArrowLeft') {
      changeSamplePage(-1);
    } else if (e.key === 'ArrowRight') {
      changeSamplePage(1);
    }
  });

  // Swipe su mobile
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
        changeSamplePage(1); // Swipe left -> Pagina successiva
      } else if (touchEndX - touchStartX > 45) {
        changeSamplePage(-1); // Swipe right -> Pagina precedente
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   5. GENERAZIONE SMART PULSANTI AMAZON
   ========================================================================== */

function isValidAsin(asin) {
  if (!asin || typeof asin !== 'string') return false;
  const clean = asin.trim().toUpperCase();
  return clean !== '' && !clean.includes('ASIN_') && !clean.includes('PLACEHOLDER');
}

function buildAmazonButton(book, uniqueId, lang) {
  if (!book.amazon || typeof book.amazon !== 'object') {
    return `<div class="btn-amazon-direct" style="opacity: 0.6; cursor: default;">Prossimamente su Amazon</div>`;
  }

  const validStores = [];
  for (const [key, asin] of Object.entries(book.amazon)) {
    if (isValidAsin(asin) && AMAZON_MARKETPLACES[key]) {
      const conf = AMAZON_MARKETPLACES[key];
      validStores.push({
        key,
        name: conf.name,
        flag: conf.flag,
        url: `${conf.urlPrefix}${asin.trim()}`
      });
    }
  }

  if (validStores.length === 0) {
    return `<div class="btn-amazon-direct" style="opacity: 0.6; cursor: default;">Prossimamente su Amazon</div>`;
  }

  if (lang === 'it' && book.amazon.it && isValidAsin(book.amazon.it)) {
    const url = `https://www.amazon.it/dp/${book.amazon.it.trim()}`;
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-amazon-direct" aria-label="Acquista ${escapeHtml(book.title)} su Amazon.it">
        <span>🇮🇹</span>
        <span>ACQUISTA SU AMAZON.IT</span>
        <span>↗</span>
      </a>
    `;
  }

  if (validStores.length === 1) {
    const store = validStores[0];
    return `
      <a href="${store.url}" target="_blank" rel="noopener noreferrer" class="btn-amazon-direct" aria-label="Buy ${escapeHtml(book.title)} on ${store.name}">
        <span>${store.flag}</span>
        <span>BUY ON ${store.name.toUpperCase()}</span>
        <span>↗</span>
      </a>
    `;
  }

  const menuItems = validStores.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="amazon-store-item">
      <span>${s.flag} ${s.name}</span>
      <span>↗</span>
    </a>
  `).join('');

  return `
    <div class="amazon-dropdown-group" id="dropdown-${uniqueId}">
      <button type="button" class="amazon-dropdown-trigger-btn" onclick="toggleStoreDropdown('${uniqueId}')" aria-haspopup="true" aria-expanded="false">
        <span>🛒 BUY ON AMAZON</span>
        <span style="font-size: 0.8rem;">▼</span>
      </button>
      <div class="amazon-dropdown-list" id="list-${uniqueId}">
        ${menuItems}
      </div>
    </div>
  `;
}

window.toggleStoreDropdown = function(uniqueId) {
  const list = document.getElementById(`list-${uniqueId}`);
  const trigger = document.querySelector(`#dropdown-${uniqueId} .amazon-dropdown-trigger-btn`);
  if (!list) return;

  const isOpen = list.classList.contains('show');

  document.querySelectorAll('.amazon-dropdown-list.show').forEach(l => {
    if (l !== list) {
      l.classList.remove('show');
      const p = l.closest('.amazon-dropdown-group');
      if (p) {
        const btn = p.querySelector('.amazon-dropdown-trigger-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (isOpen) {
    list.classList.remove('show');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  } else {
    list.classList.add('show');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  }
};

function initGlobalDropdownCloser() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.amazon-dropdown-group')) {
      document.querySelectorAll('.amazon-dropdown-list.show').forEach(list => {
        list.classList.remove('show');
        const p = list.closest('.amazon-dropdown-group');
        if (p) {
          const btn = p.querySelector('.amazon-dropdown-trigger-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/* ==========================================================================
   6. DEEP LINKING DA POST INSTAGRAM / TIKTOK
   ========================================================================== */

function handleDirectBookDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get('book') || window.location.hash.replace('#', '');
  
  if (bookId) {
    setTimeout(() => {
      const card = document.getElementById(`card-${bookId}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transform = 'scale(1.03)';
        card.style.borderColor = 'var(--c-primary)';
        setTimeout(() => {
          card.style.transform = '';
        }, 2000);
      }
    }, 300);
  }
}

/* ==========================================================================
   7. FALLBACK COPERTINA & UTILITIES
   ========================================================================== */

window.handleCoverError = function(img, title, icon = '📚') {
  const parent = img.parentElement;
  if (!parent) return;
  parent.innerHTML = `
    <div class="book-cover-fallback">
      <div class="fallback-icon">${icon}</div>
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
