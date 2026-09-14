/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - PROMOTIONAL CAMPAIGN SYSTEM
 * Nuova Uscita: Leo la gru & Rudy la ruspa in Missione Savana (Volume 9)
 * ============================================================================
 */

const CSA_CAMPAIGN = {
  id: "leo-rudy-savana-2026",
  enabled: true,
  delayMs: 3500, // Attivazione a tempo (3.5 secondi)
  sessionStorageKey: "csa_campaign_savana_dismissed",
  bookId: "leo-rudy-savana-it",
  bgImage: "assets/campaigns/new-Leo-Rudy-Savana/Popup.Leo-Rudy.Savana.jpeg",
  coverImage: "assets/construction-site-adventures/09.Leo.Rudy.Savana/IT/Front.Cover.png",
  amazonUrl: "https://www.amazon.it/dp/B0HJRRRDMX"
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
 * Monta il markup HTML del popup modale.
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
        class="campaign-modal-dialog" 
        id="campaign-modal-dialog"
      >
        <!-- Pulsante Chiudi -->
        <button 
          type="button" 
          class="campaign-modal-close" 
          id="campaign-modal-close"
          onclick="closeCampaignPopup(true)" 
          aria-label="Chiudi promozione nuovo libro"
        >
          ✕
        </button>

        <!-- Colonna Sinistra Contenuto & Copertina (a destra sono visibili i personaggi Leo, Rudy, l'ippopotamo e la giraffa) -->
        <div class="campaign-modal-left-panel">
          <div class="campaign-eyebrow">
            <span class="campaign-badge-pill">✨ NUOVA USCITA • VOLUME 9</span>
          </div>

          <div class="campaign-title-group">
            <h2 class="campaign-title" id="campaign-modal-title">
              Leo la gru <span class="campaign-highlight">&</span> Rudy la ruspa
              <span class="campaign-title-sub">in Missione Savana</span>
            </h2>
          </div>

          <div class="campaign-body-row">
            <div 
              class="campaign-cover-frame" 
              onclick="openSampleModalFromCampaign('${c.bookId}')" 
              role="button" 
              tabindex="0" 
              title="Clicca per sfogliare l'anteprima del libro"
              onkeydown="if(event.key==='Enter'||event.key===' ')openSampleModalFromCampaign('${c.bookId}')"
            >
              <img 
                src="${c.coverImage}" 
                alt="Copertina Leo la gru & Rudy la ruspa in Missione Savana" 
                class="campaign-cover-img"
                loading="eager"
              />
              <span class="campaign-cover-zoom-hint">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>Sfoglia</span>
              </span>
            </div>

            <div class="campaign-details">
              <p class="campaign-desc">
                Leo e Rudy pensavano che sistemare una vecchia strada sarebbe stato un gioco da ragazzi. Ma nella savana c'erano una giraffa speciale e un ippopotamo davvero insistente!
              </p>
              <div class="campaign-features">
                <span class="campaign-feat-chip">🚜 Da 2 anni</span>
                <span class="campaign-feat-chip">🎨 100% a colori</span>
                <span class="campaign-feat-chip">🤝 Lavoro di squadra</span>
              </div>
            </div>
          </div>

          <div class="campaign-actions">
            <a 
              href="${c.amazonUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="campaign-btn-buy"
              id="campaign-buy-button"
              aria-label="Acquista Leo la gru & Rudy la ruspa in Missione Savana su Amazon.it"
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
              onclick="openSampleModalFromCampaign('${c.bookId}')"
              aria-label="Sfoglia l'anteprima gratuita di Leo la gru & Rudy la ruspa in Missione Savana"
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
