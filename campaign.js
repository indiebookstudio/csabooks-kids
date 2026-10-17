/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - PROMOTIONAL CAMPAIGN SYSTEM
 * Nuova Uscita: Le Avventure del Cantiere — Raccolta Vol. 1
 * ============================================================================
 */

const CSA_CAMPAIGN = {
  id: "raccolte-vol1-vol2-2026",
  enabled: true,
  delayMs: 3500, // Attivazione a tempo (3.5 secondi)
  sessionStorageKey: "csa_campaign_raccolte_dismissed",
  bgImage: "assets/banner/banner-csa-books-4-kids.jpg",
  vol1: {
    bookId: "raccolta-vol1-it",
    volume: 1,
    title: "Le Avventure del Cantiere — Raccolta Vol. 1",
    coverImage: "assets/construction-site-adventures/Bundle.Volume.1/IT/Front.Cover.png",
    amazonUrl: "https://www.amazon.it/dp/B0HN4QMLV1",
    stories: [
      "Benny l'escavatore e la collina che cambiava forma",
      "Rudy la ruspa e la spiaggia che scompariva",
      "Leo la gru e le gemme della montagna",
      "Bruno il camion e lo stagno delle papere"
    ]
  },
  vol2: {
    bookId: "raccolta-vol2-it",
    volume: 2,
    title: "Le Avventure del Cantiere — Raccolta Vol. 2",
    coverImage: "assets/construction-site-adventures/Bundle.Volume.2/IT/Front.Cover.png?v=20261017",
    amazonUrl: null,
    stories: [
      "Benny l'escavatore e le monete dell'antica Roma",
      "Nina la betoniera e il ponte dei coniglietti",
      "Rino il rullo e i ladri del cantiere",
      "Leo la gru e il nido della cinciallegra"
    ]
  }
};

let campaignTimer = null;

/**
 * Verifica se la lingua attiva sul sito è l'italiano.
 * Il popup deve comparire SOLO ed ESCLUSIVAMENTE se il sito è in italiano.
 */
function isSiteInItalian() {
  if (typeof currentLanguage !== 'undefined' && currentLanguage) {
    return currentLanguage === 'it';
  }
  const htmlLang = (document.documentElement.lang || '').toLowerCase();
  if (htmlLang.startsWith('it')) return true;
  try {
    const saved = localStorage.getItem('csabooks_lang');
    if (saved) return saved === 'it';
  } catch (e) {}
  return true;
}

/**
 * Inizializza il sistema di popup promozionale.
 */
function initCampaignPopup() {
  if (!CSA_CAMPAIGN || !CSA_CAMPAIGN.enabled) return;

  // Monta la struttura modale nel DOM
  mountCampaignPopup();

  // Pianifica l'apertura a tempo se in italiano
  if (isSiteInItalian()) {
    scheduleCampaignPopup();
  }

  // Chiusura da tastiera con tasto ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const backdrop = document.getElementById('campaign-modal-backdrop');
      if (backdrop && backdrop.classList.contains('is-open')) {
        closeCampaignPopup(true);
      }
    }
  });

  // Hook per intercettare i cambi lingua del sito
  hookLanguageSwitch();
}

/**
 * Monta il markup HTML del popup modale split (Vol. 1 sinistra + Vol. 2 destra).
 */
function mountCampaignPopup() {
  let root = document.getElementById('campaign-popup-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'campaign-popup-root';
    document.body.appendChild(root);
  }

  const c = CSA_CAMPAIGN;

  root.innerHTML = `
    <div 
      class="campaign-modal-backdrop" 
      id="campaign-modal-backdrop" 
      onclick="handleCampaignBackdropClick(event)"
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="campaign-modal-title"
    >
      <div 
        class="campaign-modal-dialog campaign-modal-split-dialog" 
        id="campaign-modal-dialog"
      >
        <!-- Pulsante Chiudi -->
        <button 
          type="button" 
          class="campaign-modal-close" 
          id="campaign-modal-close"
          onclick="closeCampaignPopup(true)" 
          aria-label="Chiudi promozione grandi raccolte"
        >
          ✕
        </button>

        <div class="campaign-split-panel">
          <!-- Header Unificato del Popup -->
          <div class="campaign-split-header">
            <h2 class="campaign-title" id="campaign-modal-title">
              Le Grandi Raccolte del Cantiere
            </h2>
            <p class="campaign-split-subtitle">
              Due grandi volumi da 4 storie ciascuno in formato speciale per piccoli lettori
            </p>
          </div>

          <!-- Griglia Split: Vol. 1 a Sinistra | Vol. 2 a Destra -->
          <div class="campaign-split-grid">
            <!-- Colonna Sinistra: Volume 1 -->
            <div class="campaign-split-card is-vol1">
              <div class="campaign-split-card-body">
                <div 
                  class="campaign-cover-frame" 
                  onclick="openSampleModalFromCampaign('${c.vol1.bookId}')" 
                  role="button" 
                  tabindex="0" 
                  title="Clicca per sfogliare l'anteprima della Raccolta Vol. 1"
                  onkeydown="if(event.key==='Enter'||event.key===' ')openSampleModalFromCampaign('${c.vol1.bookId}')"
                >
                  <img 
                    src="${c.vol1.coverImage}" 
                    alt="Copertina ${c.vol1.title}" 
                    class="campaign-cover-img"
                    loading="eager"
                  />
                  <span class="campaign-cover-zoom-hint">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <span>Sfoglia</span>
                  </span>
                </div>

                <div class="campaign-split-details">
                  <h3 class="campaign-split-card-title">${c.vol1.title}</h3>
                  <p class="campaign-split-card-meta">Grande formato 21,5 × 28 cm • 4 storie complete</p>
                  <ul class="campaign-split-stories-list">
                    ${c.vol1.stories.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="campaign-split-actions">
                <a 
                  href="${c.vol1.amazonUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="campaign-btn-buy"
                  id="campaign-buy-button-vol1"
                  aria-label="Acquista la Raccolta Volume 1 su Amazon.it"
                >
                  <img src="https://flagcdn.com/20x15/it.png" alt="IT" width="16" height="12" class="campaign-flag-img">
                  <span>ACQUISTA SU AMAZON.IT</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>

                <button 
                  type="button" 
                  class="campaign-btn-sample"
                  onclick="openSampleModalFromCampaign('${c.vol1.bookId}')"
                  aria-label="Sfoglia l'anteprima gratuita della Raccolta Volume 1"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>Estratto</span>
                </button>
              </div>
            </div>

            <!-- Colonna Destra: Volume 2 -->
            <div class="campaign-split-card is-vol2">
              <div class="campaign-split-card-body">
                <div 
                  class="campaign-cover-frame" 
                  onclick="openSampleModalFromCampaign('${c.vol2.bookId}')" 
                  role="button" 
                  tabindex="0" 
                  title="Clicca per sfogliare l'anteprima della Raccolta Vol. 2"
                  onkeydown="if(event.key==='Enter'||event.key===' ')openSampleModalFromCampaign('${c.vol2.bookId}')"
                >
                  <img 
                    src="${c.vol2.coverImage}" 
                    alt="Copertina ${c.vol2.title}" 
                    class="campaign-cover-img"
                    loading="eager"
                  />
                  <span class="campaign-cover-zoom-hint">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <span>Sfoglia</span>
                  </span>
                </div>

                <div class="campaign-split-details">
                  <h3 class="campaign-split-card-title">${c.vol2.title}</h3>
                  <p class="campaign-split-card-meta">Grande formato 21,5 × 28 cm • 4 storie complete</p>
                  <ul class="campaign-split-stories-list">
                    ${c.vol2.stories.map(s => `<li>${s}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="campaign-split-actions">
                <button 
                  type="button" 
                  class="campaign-btn-buy is-disabled" 
                  disabled
                  aria-disabled="true"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>IN ARRIVO PROSSIMAMENTE</span>
                </button>

                <button 
                  type="button" 
                  class="campaign-btn-sample"
                  onclick="openSampleModalFromCampaign('${c.vol2.bookId}')"
                  aria-label="Sfoglia l'anteprima della Raccolta Volume 2"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>Estratto</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Pianifica l'apertura a tempo del popup.
 * In locale (localhost / 127.0.0.1) resetta la dismissione di sessione
 * per consentire sempre l'anteprima immediata ad ogni refresh.
 */
function scheduleCampaignPopup() {
  if (!isSiteInItalian()) return;

  const c = CSA_CAMPAIGN;
  const isLocal = (typeof window !== 'undefined') &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isLocal) {
    try {
      const isDismissed = sessionStorage.getItem(c.sessionStorageKey);
      if (isDismissed) return;
    } catch (e) {}
  } else {
    try {
      sessionStorage.removeItem(c.sessionStorageKey);
    } catch (e) {}
  }

  if (campaignTimer) {
    clearTimeout(campaignTimer);
  }

  campaignTimer = setTimeout(() => {
    // Ricontrolla che la lingua sia ancora italiano prima di mostrare
    if (isSiteInItalian()) {
      openCampaignPopup();
    }
  }, c.delayMs || 3500);
}

/**
 * Apre il popup promozionale.
 */
function openCampaignPopup() {
  if (!isSiteInItalian()) return;

  if (campaignTimer) {
    clearTimeout(campaignTimer);
    campaignTimer = null;
  }

  let backdrop = document.getElementById('campaign-modal-backdrop');
  if (!backdrop) {
    mountCampaignPopup();
    backdrop = document.getElementById('campaign-modal-backdrop');
  }

  if (backdrop) {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Chiude il popup promozionale.
 * @param {boolean} persistDismiss - Se true, memorizza la chiusura nella sessione corrente.
 */
function closeCampaignPopup(persistDismiss = true) {
  const backdrop = document.getElementById('campaign-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (persistDismiss && CSA_CAMPAIGN) {
    try {
      sessionStorage.setItem(CSA_CAMPAIGN.sessionStorageKey, '1');
    } catch (e) {}
  }
}

/**
 * Chiude la modale se si clicca sul backdrop scuro esterno al dialogo.
 */
function handleCampaignBackdropClick(event) {
  if (event.target && event.target.id === 'campaign-modal-backdrop') {
    closeCampaignPopup(true);
  }
}

/**
 * Apre il lettore sfogliabile dell'anteprima (Sample Reader) dal popup.
 */
function openSampleModalFromCampaign(bookId) {
  closeCampaignPopup(false);
  if (typeof window.openSampleModal === 'function') {
    window.openSampleModal(bookId);
  }
}

/**
 * Intercetta il cambio di lingua dell'interfaccia:
 * se l'utente seleziona una lingua diversa dall'italiano, il popup
 * viene chiuso immediatamente e nessun timer viene attivato.
 */
function hookLanguageSwitch() {
  if (typeof window.setLanguage === 'function') {
    const originalSetLang = window.setLanguage;
    window.setLanguage = function(langCode) {
      originalSetLang(langCode);
      if (langCode !== 'it') {
        if (campaignTimer) {
          clearTimeout(campaignTimer);
          campaignTimer = null;
        }
        closeCampaignPopup(false);
      } else {
        scheduleCampaignPopup();
      }
    };
  }
}

// Inizializza al caricamento del DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCampaignPopup);
} else {
  initCampaignPopup();
}
