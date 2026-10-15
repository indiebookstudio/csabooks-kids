/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - VERCEL EDGE SERVERLESS HANDLER
 * ============================================================================
 * 
 * Endpoint: POST /api/send-otto-key
 * Sends Otto's Universal Secret Key ("OTTO") for the book
 * "EINSTEIN, QUESTA TE LA SEI PERSA!" via Brevo (Sendinblue) REST API v3.
 * 
 * Security & Reliability:
 * - Vercel Edge runtime (zero cold start)
 * - Brevo REST API v3 (/v3/smtp/email & /v3/contacts)
 * - Server-side email format and domain validation
 * - In-memory rate limiting per client IP
 * - Anti-spam honeypot detection
 * - Configurable sender alias (otto@csabookskids.com) with automatic fallback
 * - Distinct, GDPR-compliant marketing consent recording
 * - Universal, permanent key ("OTTO") across all languages
 */

export const config = {
  runtime: 'edge'
};

const CONFIG = {
  brandName: process.env.OTTO_SENDER_NAME || "Otto | Il mondo delle scoperte",
  senderEmail: process.env.OTTO_SENDER_EMAIL || "otto@csabookskids.com",
  fallbackSenderEmail: process.env.BREVO_FALLBACK_SENDER || "csabooks.kids@gmail.com",
  replyToEmail: process.env.OTTO_REPLY_TO || "csabooks.kids@gmail.com",
  adminCcEmail: process.env.OTTO_ADMIN_CC || "csabooks.kids@gmail.com",
  qrPublicUrl: "https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/",
  ottoKeyImgUrl: "https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/media/polpo_esploratore_con_chiave_dorata.png",
  universalKey: "OTTO"
};

// Rate limiter: Map<ip, Array<timestamp>>
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.length === 0 || now - val[val.length - 1] > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

const EMAIL_I18N = {
  it: {
    langHtml: "it",
    subject: "La chiave segreta di Otto è arrivata! 🔑",
    greeting: "Ciao, esploratore!",
    intro: "Otto ti dà il benvenuto nel suo mondo delle scoperte impossibili.",
    keyLabel: "La tua chiave segreta è:",
    key: "OTTO",
    instruction: "Torna alla pagina del libro, inserisci la chiave e preparati a esplorare missioni, esperimenti, giochi, animazioni e tante meraviglie scientifiche.",
    ctaBtn: "ENTRA NEL MONDO DI OTTO",
    signoff: "Buona esplorazione!",
    author: "Otto",
    authorTitle: "Il piccolo esploratore delle grandi scoperte",
    footerDisclaimer: "Ricevi questa email perché hai richiesto la chiave segreta di Otto per il libro «EINSTEIN, QUESTA TE LA SEI PERSA!».",
    copyright: "Tutti i diritti riservati.",
    helpTitle: "Hai bisogno di assistenza o non riesci a entrare?",
    helpText: "Se hai difficoltà con la chiave o ad accedere al portale, puoi scriverci in qualsiasi momento:",
    helpEmailSubject: "Richiesta assistenza accesso portale Otto",
    marketingActiveTitle: "✓ Iscrizione novità editoriali: CONFERMATA",
    marketingActiveText: "Hai scelto di ricevere novità sui libri, nuove attività gratuite e iniziative editoriali. Puoi revocare il consenso in qualsiasi momento scrivendo a csabooks.kids@gmail.com.",
    marketingInactiveText: "Iscrizione novità editoriali: Non attiva per questa richiesta."
  },
  en: {
    langHtml: "en",
    subject: "Otto's secret key has arrived! 🔑",
    greeting: "Hello, explorer!",
    intro: "Otto welcomes you to his world of impossible discoveries.",
    keyLabel: "Your secret key is:",
    key: "OTTO",
    instruction: "Return to the book's page, enter the key and get ready to explore missions, experiments, games, animations, and scientific wonders.",
    ctaBtn: "ENTER OTTO'S WORLD",
    signoff: "Happy exploring!",
    author: "Otto",
    authorTitle: "The little explorer of big discoveries",
    footerDisclaimer: "You are receiving this email because you requested Otto's secret key for the book 'EINSTEIN, YOU MISSED THIS ONE!'.",
    copyright: "All rights reserved.",
    helpTitle: "Need help or trouble accessing?",
    helpText: "If you have any difficulty with the secret key or accessing the portal, email us anytime:",
    helpEmailSubject: "Assistance request for Otto portal access",
    marketingActiveTitle: "✓ Newsletter subscription: CONFIRMED",
    marketingActiveText: "You chose to receive book updates and free activities. You can unsubscribe anytime by emailing csabooks.kids@gmail.com.",
    marketingInactiveText: "Newsletter subscription: Not active for this request."
  },
  fr: {
    langHtml: "fr",
    subject: "La clé secrète d'Otto est arrivée ! 🔑",
    greeting: "Bonjour, explorateur !",
    intro: "Otto vous souhaite la bienvenue dans son monde des découvertes impossibles.",
    keyLabel: "Votre clé secrète est :",
    key: "OTTO",
    instruction: "Retournez sur la page du livre, entrez la clé et préparez-vous à explorer missions, expériences, jeux, animations et merveilles scientifiques.",
    ctaBtn: "ENTRER DANS LE MONDE D'OTTO",
    signoff: "Bonne exploration !",
    author: "Otto",
    authorTitle: "Le petit explorateur des grandes découvertes",
    footerDisclaimer: "Vous recevez cet e-mail car vous avez demandé la clé secrète d'Otto pour le livre « EINSTEIN, TU AS MANQUÉ CELLE-LÀ ! ».",
    copyright: "Tous droits réservés.",
    helpTitle: "Besoin d'aide ou problème d'accès ?",
    helpText: "Si vous rencontrez des difficultés avec la clé secrète ou l'accès au portail, écrivez-nous à :",
    helpEmailSubject: "Demande d'assistance accès portail Otto",
    marketingActiveTitle: "✓ Inscription aux nouveautés : CONFIRMÉE",
    marketingActiveText: "Vous avez choisi de recevoir les actualités des livres et les activités gratuites. Révocation possible à tout moment.",
    marketingInactiveText: "Inscription aux nouveautés : Non active pour cette demande."
  },
  es: {
    langHtml: "es",
    subject: "¡La llave secreta de Otto ha llegado! 🔑",
    greeting: "¡Hola, explorador!",
    intro: "Otto te da la bienvenida a su mundo de descubrimientos imposibles.",
    keyLabel: "Tu llave secreta es:",
    key: "OTTO",
    instruction: "Vuelve a la página del libro, introduce la llave y prepárate para explorar misiones, experimentos, juegos, animaciones y maravillas científicas.",
    ctaBtn: "ENTRA EN EL MUNDO DE OTTO",
    signoff: "¡Buena exploración!",
    author: "Otto",
    authorTitle: "El pequeño explorador de los grandes descubrimientos",
    footerDisclaimer: "Recibes este correo porque solicitaste la llave secreta de Otto para el libro «¡EINSTEIN, ESTA TE LA PERDISTE!».",
    copyright: "Todos los derechos reservados.",
    helpTitle: "¿Necesitas ayuda o problemas para entrar?",
    helpText: "Si tienes alguna dificultad con la llave secreta o para acceder al portal, escríbenos:",
    helpEmailSubject: "Solicitud de asistencia acceso portal Otto",
    marketingActiveTitle: "✓ Suscripción a novedades: CONFIRMADA",
    marketingActiveText: "Has elegido recibir novedades sobre libros y actividades gratuitas. Puedes revocar el consentimiento cuando quieras.",
    marketingInactiveText: "Suscripción a novedades: No activa para esta solicitud."
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailHtml({ lang, marketingConsent = false }) {
  const langKey = (lang && EMAIL_I18N[lang.toLowerCase()]) ? lang.toLowerCase() : 'it';
  const t = EMAIL_I18N[langKey] || EMAIL_I18N.it;
  const currentYear = new Date().getFullYear();
  const isMarketingActive = Boolean(marketingConsent);

  return `
<!DOCTYPE html>
<html lang="${t.langHtml}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(t.subject)}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #071325; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; -webkit-font-smoothing: antialiased;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background: linear-gradient(165deg, #0d2238 0%, #071526 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); border: 1px solid rgba(245, 208, 138, 0.28);">
    <!-- Header Decorativo con Otto e la Chiave -->
    <tr>
      <td align="center" style="background: radial-gradient(circle at 50% 30%, #1c3c63 0%, #0a1b2f 100%); padding: 38px 20px 24px 20px; border-bottom: 1px solid rgba(247, 209, 132, 0.2);">
        <table align="center" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${CONFIG.qrPublicUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                <img src="${CONFIG.ottoKeyImgUrl}" alt="Otto con la chiave dorata" width="170" height="212" style="display: block; width: 170px; max-width: 100%; height: auto; border: 0; filter: drop-shadow(0 12px 24px rgba(0,0,0,0.45));" />
              </a>
            </td>
          </tr>
        </table>
        <div style="margin-top: 18px;">
          <span style="display: inline-block; background: rgba(245, 208, 138, 0.12); border: 1px solid #f5d08a; color: #f5d08a; font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; padding: 6px 14px; border-radius: 50px;">
            ✦ DISCOVERY CLUB ✦
          </span>
        </div>
      </td>
    </tr>

    <!-- Contenuto Principale -->
    <tr>
      <td style="padding: 38px 32px 30px 32px; text-align: center;">
        <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; color: #FFF3D6; margin: 0 0 16px 0; letter-spacing: 0.02em;">
          ${escapeHtml(t.greeting)}
        </h1>

        <p style="font-size: 16px; line-height: 1.65; color: #C5D5E4; margin: 0 0 28px 0;">
          ${escapeHtml(t.intro)}
        </p>

        <!-- Box Chiave Segreta in Oro -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: radial-gradient(circle at 50% 50%, #153353 0%, #0c2035 100%); border: 2px dashed #f59e0b; border-radius: 18px; margin: 0 0 28px 0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);">
          <tr>
            <td style="padding: 24px 20px; text-align: center;">
              <p style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.22em; color: #F8E4BF; margin: 0 0 10px 0;">
                ${escapeHtml(t.keyLabel)}
              </p>
              <div style="font-family: 'Courier New', Courier, monospace, Georgia, serif; font-size: 42px; font-weight: 900; letter-spacing: 0.28em; color: #FBBF24; text-shadow: 0 2px 14px rgba(251, 191, 36, 0.45); padding: 4px 0 6px 12px;">
                ${escapeHtml(t.key)}
              </div>
            </td>
          </tr>
        </table>

        <p style="font-size: 15px; line-height: 1.7; color: #B2C5D6; margin: 0 0 32px 0;">
          ${escapeHtml(t.instruction)}
        </p>

        <!-- Pulsante Entra nel Mondo di Otto -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 34px auto;">
          <tr>
            <td align="center" style="border-radius: 50px; background: linear-gradient(135deg, #FBE1A7 0%, #E3A758 100%); box-shadow: 0 8px 28px rgba(227, 167, 88, 0.42);">
              <a href="${CONFIG.qrPublicUrl}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 800; color: #151D2A !important; text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 50px;">
                ${escapeHtml(t.ctaBtn)} &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- Firma di Otto -->
        <div style="padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="font-size: 15px; font-style: italic; color: #E5EFF9; margin: 0 0 4px 0;">
            ${escapeHtml(t.signoff)}
          </p>
          <p style="font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #F5D08A; margin: 0 0 2px 0;">
            ${escapeHtml(t.author)}
          </p>
          <p style="font-size: 12px; color: #8BA4B8; margin: 0;">
            ${escapeHtml(t.authorTitle)}
          </p>
        </div>

        <!-- Box Assistenza con link email cliccabile -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: rgba(245, 208, 138, 0.08); border: 1px solid rgba(245, 208, 138, 0.28); border-radius: 14px; margin: 28px 0 0 0;">
          <tr>
            <td style="padding: 18px 20px; text-align: center;">
              <p style="font-size: 13.5px; font-weight: 700; color: #FFE4AC; margin: 0 0 6px 0;">
                💡 ${escapeHtml(t.helpTitle)}
              </p>
              <p style="font-size: 12.5px; line-height: 1.55; color: #B2C5D6; margin: 0 0 12px 0;">
                ${escapeHtml(t.helpText)}
              </p>
              <a href="mailto:${CONFIG.replyToEmail}?subject=${encodeURIComponent(t.helpEmailSubject)}" style="display: inline-block; padding: 10px 22px; background: rgba(245, 208, 138, 0.16); border: 1px solid #f5d08a; border-radius: 50px; font-size: 12.5px; font-weight: 700; color: #F5D08A !important; text-decoration: none;">
                ✉ ${escapeHtml(CONFIG.replyToEmail)}
              </a>
            </td>
          </tr>
        </table>

        <!-- Box Consenso Marketing (Spunta Opzionale) -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 18px 0 0 0; border-radius: 12px; ${isMarketingActive ? 'background: rgba(16, 185, 129, 0.12); border: 1px solid #10B981;' : 'background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12);'}">
          <tr>
            <td style="padding: 12px 16px; text-align: left;">
              ${isMarketingActive ? `
                <p style="font-size: 12px; color: #A7F3D0; margin: 0; line-height: 1.55;">
                  <strong style="color: #FFFFFF;">${escapeHtml(t.marketingActiveTitle)}</strong><br>
                  ${escapeHtml(t.marketingActiveText)}
                </p>
              ` : `
                <p style="font-size: 11.5px; color: #8BA4B8; margin: 0; line-height: 1.5;">
                  ${escapeHtml(t.marketingInactiveText)}
                </p>
              `}
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer Istituzionale & Privacy -->
    <tr>
      <td style="background-color: #050E1A; padding: 24px 28px; text-align: center; border-top: 1px solid rgba(247, 209, 132, 0.14);">
        <p style="font-size: 12px; color: #7E93A6; line-height: 1.6; margin: 0 0 8px 0;">
          ${escapeHtml(t.footerDisclaimer)}
        </p>
        <p style="font-size: 11px; color: #586B7C; margin: 0;">
          &copy; ${currentYear} CSA Books Kids &bull; ${escapeHtml(t.copyright)}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With'
    }
  });
}

export default async function handler(req) {
  // 1. CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // 2. Health check
  if (req.method === 'GET') {
    return jsonResponse({
      status: 'ok',
      service: 'Otto Secret Key Dispatcher',
      brand: CONFIG.brandName,
      sender: CONFIG.senderEmail,
      version: '1.0.0'
    }, 200);
  }

  // 3. Only POST allowed
  if (req.method !== 'POST') {
    return jsonResponse({ success: false, error: 'Method not allowed' }, 405);
  }

  try {
    // 4. Rate limiting per IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    if (isRateLimited(clientIp)) {
      return jsonResponse({ 
        success: false, 
        error: "Troppe richieste. Riprova tra qualche minuto." 
      }, 429);
    }

    // 5. Parse JSON Body
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ success: false, error: "Formato richiesta non valido." }, 400);
    }

    const { email: rawEmail, website: honeypot, lang: rawLang, marketingConsent } = body || {};

    // 6. Anti-Spam Honeypot (silent success for bots)
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Otto Anti-Spam] Honeypot attivato da IP: ${clientIp}`);
      return jsonResponse({ success: true, message: "La chiave è in viaggio!" }, 200);
    }

    // 7. Email Validation & Sanitization
    const email = String(rawEmail || '').trim().toLowerCase();
    const lang = String(rawLang || 'it').trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email || !emailRegex.test(email) || email.length > 120) {
      return jsonResponse({ success: false, error: "Inserisci un indirizzo email valido." }, 400);
    }

    // 8. Brevo API Key
    const brevoApiKey = (process.env.BREVO_API_KEY || '').trim();
    if (!brevoApiKey) {
      console.error("[Brevo Error] Variabile d'ambiente BREVO_API_KEY non configurata.");
      return jsonResponse({ 
        success: false, 
        error: "Il servizio di invio email è temporaneamente non disponibile. Riprova più tardi." 
      }, 500);
    }

    // 9. Gestione Consenso Marketing Separato (se accettato)
    if (marketingConsent === true || marketingConsent === 'true') {
      try {
        const contactPayload = {
          email: email,
          attributes: {
            MARKETING_CONSENT: true,
            CONSENT_DATE: new Date().toISOString(),
            CONSENT_LANG: lang,
            CONSENT_VERSION: "v1.0-otto-keys",
            ORIGIN: "microsito_einstein_chiave_otto"
          },
          updateEnabled: true
        };

        if (process.env.BREVO_MARKETING_LIST_ID) {
          const listIdNum = Number(process.env.BREVO_MARKETING_LIST_ID);
          if (!isNaN(listIdNum)) {
            contactPayload.listIds = [listIdNum];
          }
        }

        // Chiamata non bloccante alla gestione contatti di Brevo
        fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify(contactPayload)
        }).then(res => {
          if (res.ok || res.status === 201 || res.status === 204) {
            console.log(`[Brevo Contacts] Registrato consenso marketing per ${email}`);
          } else {
            console.warn(`[Brevo Contacts Warning] Status ${res.status} per ${email}`);
          }
        }).catch(err => {
          console.warn('[Brevo Contacts Error]:', err.message);
        });
      } catch (cErr) {
        console.warn('[Marketing Consent Error]:', cErr);
      }
    }

    // 10. Costruzione Template Email
    const emailHtml = buildEmailHtml({ lang, marketingConsent: Boolean(marketingConsent) });
    const t = EMAIL_I18N[lang] || EMAIL_I18N.it;
    const emailSubject = t.subject;

    // 11. Costruzione Payload Brevo v3
    function makePayload(senderEmail) {
      const payload = {
        sender: {
          name: CONFIG.brandName,
          email: senderEmail
        },
        to: [
          { email: email, name: "Genitore Esploratore" }
        ],
        replyTo: {
          email: CONFIG.replyToEmail,
          name: CONFIG.brandName
        },
        subject: emailSubject,
        htmlContent: emailHtml
      };

      if (CONFIG.adminCcEmail && email.toLowerCase() !== CONFIG.adminCcEmail.toLowerCase()) {
        payload.cc = [
          { email: CONFIG.adminCcEmail, name: "CSA Books Kids Team" }
        ];
      }
      return payload;
    }

    // 12. Invio Transazionale tramite Brevo SMTP API
    let activeSender = CONFIG.senderEmail;
    let brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(makePayload(activeSender))
    });

    // Se il mittente personalizzato otto@csabookskids.com non è ancora autorizzato in Brevo,
    // esegui un fallback trasparente su csabooks.kids@gmail.com
    if (!brevoResponse.ok && activeSender !== CONFIG.fallbackSenderEmail) {
      const errClone = await brevoResponse.clone().json().catch(() => ({}));
      const isSenderErr = brevoResponse.status === 400 && 
        (String(errClone.message || '').toLowerCase().includes('sender') || 
         String(errClone.code || '').toLowerCase().includes('sender') ||
         String(errClone.message || '').toLowerCase().includes('unauthorized'));

      if (isSenderErr) {
        console.warn(`[Brevo Fallback] Mittente ${activeSender} non autorizzato nel pannello Brevo. Tento con il mittente verificato ${CONFIG.fallbackSenderEmail}...`);
        activeSender = CONFIG.fallbackSenderEmail;
        brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey,
            'content-type': 'application/json'
          },
          body: JSON.stringify(makePayload(activeSender))
        });
      }
    }

    if (brevoResponse.ok || brevoResponse.status === 201) {
      const resData = await brevoResponse.json().catch(() => ({}));
      console.log(`[Brevo Otto] Chiave segreta inviata a ${email} (MessageId: ${resData.messageId || 'N/A'}) tramite ${activeSender}`);
      return jsonResponse({ 
        success: true, 
        message: "La chiave è in viaggio! Controlla la posta elettronica, anche nella cartella spam." 
      }, 200);
    } else {
      const errData = await brevoResponse.json().catch(() => ({}));
      console.error('[Brevo API Error Otto]:', brevoResponse.status, errData);
      return jsonResponse({ 
        success: false, 
        error: "Impossibile inviare la chiave in questo momento. Riprova più tardi." 
      }, 502);
    }
  } catch (err) {
    console.error('[Server Error Otto]:', err);
    return jsonResponse({
      success: false,
      error: "Errore interno del server durante l'invio della chiave."
    }, 500);
  }
}
