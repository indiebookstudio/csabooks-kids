/**
 * CSA Books 4 Kids — Hero Natale 2026 Engine
 * Gestisce rendering a 3 livelli, carosello accessibile, cambio lingua reattivo e fallback
 */

(function(global) {
  'use strict';

  let currentSlideIndex = 0;
  let autoplayTimer = null;
  let isPausedByUser = false;
  let isHoveredOrFocused = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let initialized = false;

  function getConfig() {
    return global.CSA_CHRISTMAS_CAMPAIGN || null;
  }

  function getLang() {
    return global.currentLang || (document.documentElement.lang === 'ja' ? 'jp' : (document.documentElement.lang === 'sv' ? 'se' : document.documentElement.lang)) || 'it';
  }

  function getActiveSlides(lang) {
    const config = getConfig();
    if (!config || typeof config.getSlidesForLanguage !== 'function') return [];
    return config.getSlidesForLanguage(lang);
  }

  function getAmazonUrl(bookId, lang) {
    if (typeof global.getAmazonPaperbackUrl === 'function' && global.CSA_BOOKS_DATA) {
      const book = global.CSA_BOOKS_DATA.books.find(b => b.id === bookId);
      if (book) {
        const url = global.getAmazonPaperbackUrl(book, lang);
        if (url) return url;
      }
    }
    // Fallback ad ASIN noti verificati
    const fallbackMap = {
      'csa-vol1': lang === 'en' ? 'https://www.amazon.com/dp/B0HR9DZ64D' : 'https://www.amazon.it/dp/B0HN4QMLV1',
      'csa-vol2': 'https://www.amazon.it/dp/B0HPB2L59F',
      'einstein': lang === 'en' ? 'https://www.amazon.com/dp/B0HPG9WFSR' : (lang === 'fr' ? 'https://www.amazon.fr/dp/B0HQ1F1HX8' : (lang === 'es' ? 'https://www.amazon.es/dp/B0HQZJB7V4' : 'https://www.amazon.it/dp/B0HP6YD1CM')),
      'fano': 'https://www.amazon.it/dp/B0HD2X6HVJ',
      'csa-10-leo-bruno-natale': 'https://www.amazon.it/dp/B0HQ72DLC7'
    };
    return fallbackMap[bookId] || '#';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateSlideA11y(carousel, activeIdx) {
    const slides = carousel.querySelectorAll('.csa-christmas-slide');
    slides.forEach((slide, idx) => {
      const isActive = idx === activeIdx;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if (isActive) {
        slide.removeAttribute('inert');
      } else {
        slide.setAttribute('inert', '');
      }

      // Imposta tabindex dei controlli interattivi all'interno della slide
      const focusable = slide.querySelectorAll('a, button');
      focusable.forEach(el => {
        if (isActive) {
          el.removeAttribute('tabindex');
        } else {
          el.setAttribute('tabindex', '-1');
        }
      });
    });

    const dots = carousel.querySelectorAll('.csa-christmas-dot');
    dots.forEach((dot, idx) => {
      const isActive = idx === activeIdx;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(targetIdx) {
    const carousel = document.getElementById('christmas-hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.csa-christmas-slide');
    const total = slides.length;
    if (total <= 1) return;

    currentSlideIndex = (targetIdx + total) % total;
    updateSlideA11y(carousel, currentSlideIndex);
    resetAutoplay();
  }

  function startAutoplay() {
    clearTimeout(autoplayTimer);
    const config = getConfig();
    if (!config || !config.isCampaignActive()) return;

    const carousel = document.getElementById('christmas-hero-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.csa-christmas-slide');
    if (slides.length <= 1) return;

    // Rispetta prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (isPausedByUser || isHoveredOrFocused) {
      return;
    }

    const interval = config.autoplayIntervalMs || 8500;
    autoplayTimer = setTimeout(() => {
      goToSlide(currentSlideIndex + 1);
      startAutoplay();
    }, interval);
  }

  function resetAutoplay() {
    clearTimeout(autoplayTimer);
    startAutoplay();
  }

  function togglePause() {
    isPausedByUser = !isPausedByUser;
    const pauseBtn = document.getElementById('csa-christmas-pause-btn');
    const config = getConfig();
    const lang = getLang();
    const ctrlI18n = (config && config.controlsI18n) || {};

    if (pauseBtn) {
      const label = isPausedByUser 
        ? ((ctrlI18n.resumeAutoplay && ctrlI18n.resumeAutoplay[lang]) || 'Riprendi rotazione automatica')
        : ((ctrlI18n.pauseAutoplay && ctrlI18n.pauseAutoplay[lang]) || 'Pausa rotazione automatica');
      pauseBtn.setAttribute('aria-label', label);
      pauseBtn.title = label;

      if (isPausedByUser) {
        pauseBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
      } else {
        pauseBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
      }
    }

    if (isPausedByUser) {
      clearTimeout(autoplayTimer);
    } else {
      startAutoplay();
    }
  }

  function renderChristmasHero(lang = getLang()) {
    const config = getConfig();
    const container = document.getElementById('christmas-hero-container');
    if (!container) return;

    // Se la campagna non è attiva, ripristina l'hero standard
    if (!config || !config.isCampaignActive()) {
      container.style.display = 'none';
      const defaultHero = document.getElementById('hero-banner');
      if (defaultHero) defaultHero.style.display = '';
      return;
    }

    // Assicura che l'hero default sia nascosto
    const defaultHero = document.getElementById('hero-banner');
    if (defaultHero) defaultHero.style.display = 'none';
    container.style.display = '';

    const slides = getActiveSlides(lang);
    if (!slides || slides.length === 0) return;

    // Reset indice se la nuova lingua ha meno slide (es. da 4 in IT a 2 in EN)
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0;
    }

    const ctrlI18n = config.controlsI18n || {};
    const prevText = (ctrlI18n.prevSlide && ctrlI18n.prevSlide[lang]) || 'Slide precedente';
    const nextText = (ctrlI18n.nextSlide && ctrlI18n.nextSlide[lang]) || 'Slide successiva';
    const pauseText = isPausedByUser 
      ? ((ctrlI18n.resumeAutoplay && ctrlI18n.resumeAutoplay[lang]) || 'Riprendi rotazione automatica')
      : ((ctrlI18n.pauseAutoplay && ctrlI18n.pauseAutoplay[lang]) || 'Pausa rotazione automatica');

    const totalSlides = slides.length;

    const slidesHtml = slides.map((slide, idx) => {
      const isActive = idx === currentSlideIndex;
      const isPriority = idx === 0;

      // Livello 1: Sfondo responsive con picture tag
      const bgDesktop = slide.backgrounds ? slide.backgrounds.desktop : '';
      const bgMobile = slide.backgrounds ? slide.backgrounds.mobile : '';

      // Livello 2: Copertine reali
      const coversHtml = (slide.covers || []).map(cover => `
        <div class="csa-christmas-cover-wrapper">
          <img 
            src="${cover.src}" 
            alt="${escapeHtml(cover.alt || '')}" 
            class="csa-christmas-cover-img"
            loading="${isPriority ? 'eager' : 'lazy'}"
            ${isPriority ? 'fetchpriority="high"' : ''}
          />
        </div>
      `).join('');

      // Livello 3: Testo e Singolo Bottone Azione "Scopri"
      const actionsHtml = (slide.actions || []).map(action => {
        let href = action.href || '#';
        if (action.type === 'amazon' && action.bookId) {
          href = getAmazonUrl(action.bookId, lang);
        }

        const isPrimary = action.primary !== false;
        const btnClass = isPrimary ? 'csa-btn-christmas-amazon' : 'csa-btn-christmas-secondary';
        const targetAttr = action.type === 'amazon' ? 'target="_blank" rel="noopener noreferrer"' : '';
        const clickTracking = (action.type === 'amazon' && action.bookId)
          ? `onclick="window.trackAmazonClick && window.trackAmazonClick('${action.bookId}', '${href}')"`
          : '';

        const iconHtml = `
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        `;

        return `
          <a href="${href}" class="${btnClass}" ${targetAttr} ${clickTracking} ${isActive ? '' : 'tabindex="-1"'}>
            <span>${escapeHtml(action.text)}</span>
            ${iconHtml}
          </a>
        `;
      }).join('');

      const badgeHtml = slide.badge 
        ? `<span class="csa-christmas-badge ${slide.isEnglishProduct ? 'lang-notice' : ''}">${escapeHtml(slide.badge)}</span>` 
        : '';

      return `
        <div class="csa-christmas-slide ${isActive ? 'active' : ''}" 
             data-slide-id="${slide.id}" 
             role="group" 
             aria-roledescription="slide" 
             aria-label="${idx + 1} di ${totalSlides}"
             ${isActive ? 'aria-hidden="false"' : 'aria-hidden="true" inert'}>
          
          <!-- Sezione Scena Natalizia (Desktop 3:1 / Mobile 4:5) -->
          <div class="csa-christmas-scene-area">
            <picture class="csa-christmas-picture">
              <source media="(min-width: 901px)" srcset="${bgDesktop}">
              <img 
                src="${bgMobile || bgDesktop}" 
                alt="${escapeHtml(slide.title)}" 
                class="csa-christmas-bg-img"
                ${isPriority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'}
              />
            </picture>
            <div class="csa-christmas-scrim"></div>

            <!-- Testo e Badge nella zona libera -->
            <div class="csa-christmas-content">
              <div class="csa-christmas-text-col">
                <div class="csa-christmas-meta-row">
                  <span class="csa-christmas-eyebrow">${escapeHtml(slide.eyebrow || 'Natale 2026')}</span>
                  ${badgeHtml}
                </div>
                <h2 class="csa-christmas-title">${escapeHtml(slide.title)}</h2>
                <p class="csa-christmas-body">${escapeHtml(slide.body)}</p>

                <!-- Copertine e Azioni: posizionate sopra l'immagine sia su desktop che su smartphone -->
                <div class="csa-christmas-dock csa-christmas-desktop-dock">
                  <div class="csa-christmas-covers-row" aria-label="Copertine disponibili">
                    ${coversHtml}
                  </div>
                  <div class="csa-christmas-actions">
                    ${actionsHtml}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const dotsHtml = slides.map((s, idx) => {
      const isActive = idx === currentSlideIndex;
      const indicatorText = (ctrlI18n.slideIndicator && ctrlI18n.slideIndicator[lang]) || 'Vai alla slide';
      return `
        <button type="button" 
                class="csa-christmas-dot ${isActive ? 'active' : ''}" 
                data-slide-to="${idx}" 
                role="tab" 
                aria-selected="${isActive ? 'true' : 'false'}" 
                aria-label="${indicatorText} ${idx + 1} di ${totalSlides}">
        </button>
      `;
    }).join('');

    container.innerHTML = `
      <section class="csa-christmas-hero-section" aria-label="Campagna Natale 2026">
        <div class="csa-christmas-hero-wrapper">
          <div class="csa-christmas-carousel" 
               id="christmas-hero-carousel" 
               role="region" 
               aria-roledescription="carousel" 
               aria-label="Carosello Natale 2026" 
               tabindex="0">
            
            <!-- Traccia Slide -->
            <div class="csa-christmas-slides-track" aria-live="polite">
              ${slidesHtml}
            </div>

            <!-- Frecce Navigazione -->
            <button type="button" class="csa-christmas-arrow prev" id="csa-christmas-prev" aria-label="${escapeHtml(prevText)}" title="${escapeHtml(prevText)}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button type="button" class="csa-christmas-arrow next" id="csa-christmas-next" aria-label="${escapeHtml(nextText)}" title="${escapeHtml(nextText)}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <!-- Barra Controlli & Indicatori -->
            <div class="csa-christmas-controls-bar">
              <div class="csa-christmas-dots" role="tablist" aria-label="Seleziona slide">
                ${dotsHtml}
              </div>
            </div>

            <!-- Tasto Pausa Accessibile -->
            <button type="button" class="csa-christmas-pause-btn" id="csa-christmas-pause-btn" aria-label="${escapeHtml(pauseText)}" title="${escapeHtml(pauseText)}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </button>
          </div>
        </div>
      </section>
    `;

    bindEvents();
    startAutoplay();
  }

  function bindEvents() {
    const carousel = document.getElementById('christmas-hero-carousel');
    if (!carousel) return;

    const prevBtn = document.getElementById('csa-christmas-prev');
    const nextBtn = document.getElementById('csa-christmas-next');
    const pauseBtn = document.getElementById('csa-christmas-pause-btn');

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        goToSlide(currentSlideIndex - 1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        goToSlide(currentSlideIndex + 1);
      };
    }

    if (pauseBtn) {
      pauseBtn.onclick = (e) => {
        e.preventDefault();
        togglePause();
      };
    }

    // Dot click
    const dots = carousel.querySelectorAll('.csa-christmas-dot');
    dots.forEach(dot => {
      dot.onclick = (e) => {
        e.preventDefault();
        const target = parseInt(dot.getAttribute('data-slide-to'), 10);
        if (!isNaN(target)) {
          goToSlide(target);
        }
      };
    });

    // Tastiera ArrowLeft / ArrowRight
    carousel.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
      }
    };

    // Pause on hover
    carousel.onmouseenter = () => {
      isHoveredOrFocused = true;
      clearTimeout(autoplayTimer);
    };
    carousel.onmouseleave = () => {
      isHoveredOrFocused = false;
      startAutoplay();
    };

    // Pause on focus
    carousel.onfocusin = () => {
      isHoveredOrFocused = true;
      clearTimeout(autoplayTimer);
    };
    carousel.onfocusout = (e) => {
      if (!carousel.contains(e.relatedTarget)) {
        isHoveredOrFocused = false;
        startAutoplay();
      }
    };

    // Touch swipe con prioritizzazione dello scroll verticale nativo dello smartphone
    carousel.ontouchstart = (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    carousel.ontouchend = (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        // Non intercettare lo scroll verticale nativo: attiva swipe solo se chiaramente orizzontale
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
          if (diffX > 0) {
            goToSlide(currentSlideIndex + 1);
          } else {
            goToSlide(currentSlideIndex - 1);
          }
        }
      }
    };
  }

  function initChristmasHero() {
    const config = getConfig();
    if (!config || !config.isCampaignActive()) {
      return;
    }

    renderChristmasHero(getLang());

    if (!initialized) {
      initialized = true;
      // Ascolta il cambio lingua globale
      window.addEventListener('csa-language-changed', (e) => {
        const newLang = (e && e.detail && e.detail.lang) || getLang();
        renderChristmasHero(newLang);
      });
    }
  }

  // Esporta globalmente
  global.initChristmasHero = initChristmasHero;
  global.renderChristmasHero = renderChristmasHero;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChristmasHero);
  } else {
    initChristmasHero();
  }

})(typeof window !== 'undefined' ? window : this);
