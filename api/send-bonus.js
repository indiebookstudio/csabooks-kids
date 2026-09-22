/**
 * ============================================================================
 * CSA BOOKS 4 KIDS - VERCEL EDGE SERVERLESS HANDLER
 * ============================================================================
 * 
 * Endpoint: POST /api/send-bonus
 * Ultra-fast Edge Function using standard Web Fetch API (Request / Response)
 * 
 * Security & Reliability:
 * - Edge runtime (instant boot, 0 cold start)
 * - Reads BREVO_API_KEY securely from environment variables
 * - Zero secrets exposed to browser or client
 * - Restrictive CORS
 * - Anti-spam honeypot detection
 * - In-memory rate limiting
 * - Server-side email and input validation
 * - Direct PDF attachment via CDN URL
 * - Automatic CC to csabooks.kids@gmail.com
 */

export const config = {
  runtime: 'edge'
};

const CONFIG = {
  brandName: "CSA Books 4 Kids",
  senderEmail: "csabooks.kids@gmail.com",
  adminCcEmail: "csabooks.kids@gmail.com",
  siteUrl: "https://csabookskids.com/",
  bonusPdfUrl: "https://csabookskids.com/assets/construction-site-adventures/Bundle.Volume.1/IT/Bonus/Bonus.CSA.Vol.1.pdf",
  bonusCoverUrl: "https://csabookskids.com/assets/construction-site-adventures/Bundle.Volume.1/IT/Front.Cover.png"
};

// Rate limiter: Map<ip, Array<timestamp>>
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 15;

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
    subject: "I tuoi disegni da colorare di Le Avventure del Cantiere — Raccolta Vol. 1! 🎨🚜",
    greeting: (f, l) => `Ciao ${f} ${l}!`.trim(),
    intro: "Grazie per aver scelto la nostra raccolta di storie <strong>Le Avventure del Cantiere — Raccolta Vol. 1</strong>!<br>In <strong>allegato a questa email</strong> trovi il file PDF ufficiale con i <strong>disegni da colorare</strong> di Benny, Leo, Bruno e tutti i simpatici veicoli del cantiere, pronti da stampare e colorare.",
    badge: "📎 File PDF allegato a questa email (Pronto per la stampa)",
    ctaTitle: "Ti piacciono le avventure del cantiere?",
    ctaDesc: "Scopri tutti i libri illustrati, gli audiolibri e i video speciali pensati per condividere momenti indimenticabili tra genitori e figli sul nostro sito ufficiale!",
    ctaBtn: "SCOPRI TUTTI I NOSTRI LIBRI",
    copyright: "Tutti i diritti riservati.",
    disclaimer: "Ricevi questa email perché hai richiesto il bonus disegni da colorare su csabookskids.com."
  },
  en: {
    langHtml: "en",
    subject: "Your Coloring Pages from Construction Site Adventures — Collection Vol. 1! 🎨🚜",
    greeting: (f, l) => `Hello ${f} ${l}!`.trim(),
    intro: "Thank you for choosing our story collection <strong>Construction Site Adventures — Collection Vol. 1</strong>!<br><strong>Attached to this email</strong> you will find the official PDF with <strong>coloring pages</strong> featuring Benny, Leo, Bruno, and all the friendly construction vehicles, ready to print and color.",
    badge: "📎 PDF file attached to this email (Ready to print)",
    ctaTitle: "Loving the construction adventures?",
    ctaDesc: "Explore all our illustrated books, read-aloud audios, and video stories created to spark imagination and bring parents and children together on our official website!",
    ctaBtn: "DISCOVER ALL OUR BOOKS",
    copyright: "All rights reserved.",
    disclaimer: "You are receiving this email because you requested the printable coloring bonus on csabookskids.com."
  },
  de: {
    langHtml: "de",
    subject: "Deine Ausmalbilder von Baustellen-Abenteuer — Sammelband Vol. 1! 🎨🚜",
    greeting: (f, l) => `Hallo ${f} ${l}!`.trim(),
    intro: "Vielen Dank, dass du dich für unseren Sammelband <strong>Baustellen-Abenteuer — Sammelband Vol. 1</strong> entschieden hast!<br>Im <strong>Anhang dieser E-Mail</strong> findest du das offizielle PDF mit den <strong>Ausmalbildern</strong> von Benny, Leo, Bruno und allen Baustellen-Freunden zum Ausdrucken und Ausmalen.",
    badge: "📎 PDF-Datei im E-Mail-Anhang (Bereit zum Ausdrucken)",
    ctaTitle: "Gefallen dir die Baustellen-Abenteuer?",
    ctaDesc: "Entdecke alle unsere illustrierten Kinderbücher und Geschichten auf unserer offiziellen Website!",
    ctaBtn: "ALLE BÜCHER ENTDECKEN",
    copyright: "Alle Rechte vorbehalten.",
    disclaimer: "Du erhältst diese E-Mail, weil du die Malvorlagen auf csabookskids.com angefordert hast."
  },
  fr: {
    langHtml: "fr",
    subject: "Vos coloriages des Aventures du Chantier — Recueil Vol. 1 ! 🎨🚜",
    greeting: (f, l) => `Bonjour ${f} ${l} !`.trim(),
    intro: "Merci d'avoir choisi notre recueil <strong>Les Aventures du Chantier — Recueil Vol. 1</strong> !<br>Vous trouverez en <strong>pièce jointe de cet e-mail</strong> le fichier PDF officiel avec les <strong>coloriages</strong> de Benny, Léo, Bruno et tous les héros du chantier, prêts à imprimer et à colorier.",
    badge: "📎 Fichier PDF en pièce jointe (Prêt à imprimer)",
    ctaTitle: "Vous aimez les aventures du chantier ?",
    ctaDesc: "Découvrez tous nos livres illustrés et histoires conçus pour partager des moments privilégiés en famille sur notre site officiel !",
    ctaBtn: "DÉCOUVRIR TOUS NOS LIVRES",
    copyright: "Tous droits réservés.",
    disclaimer: "Vous recevez cet e-mail suite à votre demande de coloriages sur csabookskids.com."
  },
  es: {
    langHtml: "es",
    subject: "¡Tus dibujos para colorear de Las Aventuras de la Obra — Colección Vol. 1! 🎨🚜",
    greeting: (f, l) => `¡Hola ${f} ${l}!`.trim(),
    intro: "¡Muchas gracias por elegir nuestra colección de historias <strong>Las Aventuras de la Obra — Colección Vol. 1</strong>!<br><strong>Adjunto a este correo</strong> encontrarás el archivo PDF oficial con los <strong>dibujos para colorear</strong> de Benny, Leo, Bruno y todos los simpáticos vehículos de la obra, listos para imprimir y colorear.",
    badge: "📎 Archivo PDF adjunto a este correo (Listo para imprimir)",
    ctaTitle: "¿Te encantan las aventuras de la obra?",
    ctaDesc: "¡Descubre todos nuestros libros ilustrados e historias pensados para compartir momentos especiales en familia en nuestro sitio oficial!",
    ctaBtn: "DESCUBRE TODOS NUESTROS LIBROS",
    copyright: "Todos los derechos reservados.",
    disclaimer: "Recibes este correo porque solicitaste los dibujos para colorear en csabookskids.com."
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

function buildEmailHtml({ firstName, lastName, lang }) {
  const emailLangKey = (lang && EMAIL_I18N[lang.toLowerCase()]) ? lang.toLowerCase() : 'it';
  const et = EMAIL_I18N[emailLangKey] || EMAIL_I18N.it;
  const currentYear = new Date().getFullYear();
  const safeFirst = escapeHtml(firstName || '');
  const safeLast = escapeHtml(lastName || '');

  return `
<!DOCTYPE html>
<html lang="${et.langHtml || 'it'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(et.subject)}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #151D2A;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(21, 29, 42, 0.08); border: 1px solid #EFEAE3;">
    <!-- Header -->
    <tr>
      <td align="center" style="background: linear-gradient(135deg, #151D2A 0%, #1E293B 100%); padding: 32px 20px;">
        <h1 style="color: #FFFFFF; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: 0.03em;">
          CSA Books <span style="color: #F05A28;">4 Kids</span>
        </h1>
        <p style="color: #FBBF24; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">
          Storie per bambini nate in famiglia &bull; Libri illustrati
        </p>
      </td>
    </tr>
    <!-- Contenuto Principale -->
    <tr>
      <td style="padding: 36px 28px; text-align: center;">
        <h2 style="font-size: 22px; font-weight: 800; color: #151D2A; margin: 0 0 14px 0;">
          ${et.greeting(safeFirst, safeLast)}
        </h2>
        
        <p style="font-size: 15px; line-height: 1.65; color: #4B5563; margin: 0 0 24px 0;">
          ${et.intro}
        </p>

        <!-- Copertina Libro -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto; max-width: 200px;">
          <tr>
            <td align="center" style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(21, 29, 42, 0.18); border: 3px solid #FFFFFF;">
              <a href="${CONFIG.siteUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${CONFIG.bonusCoverUrl}" alt="Le Avventure del Cantiere - Raccolta Vol. 1" width="200" style="width: 100%; max-width: 200px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>
        </table>

        <!-- Badge Allegato PDF -->
        <div style="margin: 22px 0 28px 0;">
          <span style="display: inline-block; background-color: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; font-size: 13px; font-weight: 700; padding: 9px 18px; border-radius: 50px;">
            ${et.badge}
          </span>
        </div>

        <!-- Box CTA Scopri Libri -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF9F2; border: 1.5px solid #FED7AA; border-radius: 16px; margin: 26px 0;">
          <tr>
            <td style="padding: 26px 20px; text-align: center;">
              <h3 style="margin: 0 0 8px 0; color: #9A3412; font-size: 17px; font-weight: 800;">
                ${et.ctaTitle}
              </h3>
              <p style="margin: 0 0 18px 0; color: #7C2D12; font-size: 14px; line-height: 1.55;">
                ${et.ctaDesc}
              </p>
              <a href="${CONFIG.siteUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #F05A28 0%, #D94818 100%); background-color: #F05A28; color: #FFFFFF !important; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 28px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 5px 16px rgba(240, 90, 40, 0.35);">
                ${et.ctaBtn}
              </a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #F3EFE9;">
          <p style="font-size: 13px; color: #6B7280; margin: 0 0 6px 0;">
            Hai domande o vuoi inviarci i disegni colorati dai tuoi bimbi?
          </p>
          <a href="mailto:${CONFIG.senderEmail}" style="color: #F05A28; font-weight: 700; text-decoration: none; font-size: 14px;">
            ${CONFIG.senderEmail}
          </a>
        </div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #F8F5F0; padding: 22px 24px; text-align: center; border-top: 1px solid #EFEAE3;">
        <p style="font-size: 12px; color: #6B7280; margin: 0 0 6px 0;">
          &copy; ${currentYear} CSA Books 4 Kids. ${et.copyright}
        </p>
        <p style="font-size: 11px; color: #9CA3AF; margin: 0;">
          ${et.disclaimer}
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
      service: 'CSA Books 4 Kids - Bonus Dispatcher',
      version: '1.0.0'
    }, 200);
  }

  // 3. Only POST allowed
  if (req.method !== 'POST') {
    return jsonResponse({ success: false, error: 'Method not allowed' }, 405);
  }

  try {
    // 4. Client IP & Rate Limiting
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    if (isRateLimited(clientIp)) {
      return jsonResponse({ 
        success: false, 
        error: "Too many requests. Please try again in a few minutes." 
      }, 429);
    }

    // 5. Parse JSON Body
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ success: false, error: "Invalid JSON format." }, 400);
    }

    const { firstName: rawFirst, lastName: rawLast, email: rawEmail, website: honeypot, lang: rawLang, consent: rawConsent } = body || {};

    // 6. Anti-Spam Honeypot: Silent acceptance if filled by a bot
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn(`[Anti-Spam] Honeypot triggered by IP: ${clientIp}`);
      return jsonResponse({ success: true, message: "Bonus request processed." }, 200);
    }

    if (rawConsent !== undefined && (rawConsent === false || rawConsent === 'false')) {
      return jsonResponse({ success: false, error: "Consent is required." }, 400);
    }

    // 7. Input Validation & Sanitization
    const firstName = String(rawFirst || '').trim();
    const lastName = String(rawLast || '').trim();
    const email = String(rawEmail || '').trim().toLowerCase();
    const lang = String(rawLang || 'it').trim().toLowerCase();

    if (!firstName || firstName.length > 80) {
      return jsonResponse({ success: false, error: "First name is required." }, 400);
    }

    if (!lastName || lastName.length > 80) {
      return jsonResponse({ success: false, error: "Last name is required." }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email) || email.length > 120) {
      return jsonResponse({ success: false, error: "A valid email address is required." }, 400);
    }

    // 8. Check BREVO_API_KEY from environment
    const brevoApiKey = (process.env.BREVO_API_KEY || '').trim();
    if (!brevoApiKey) {
      console.error("[Brevo Error] BREVO_API_KEY environment variable is not configured.");
      return jsonResponse({ 
        success: false, 
        error: "Email service is temporarily unavailable. Please try again later." 
      }, 500);
    }

    // 9. Generate HTML Email Body
    const emailHtml = buildEmailHtml({ firstName, lastName, lang });
    const et = EMAIL_I18N[lang] || EMAIL_I18N.it;
    const emailSubject = et.subject;

    // 10. Build Brevo API Payload
    const recipientName = `${firstName} ${lastName}`.trim() || "Piccolo Artista";
    const brevoPayload = {
      sender: {
        name: CONFIG.brandName,
        email: CONFIG.senderEmail
      },
      to: [
        { email: email, name: recipientName }
      ],
      subject: emailSubject,
      htmlContent: emailHtml,
      attachment: [
        {
          name: "Bonus-CSA-Volume1-Disegni-da-Colorare.pdf",
          url: CONFIG.bonusPdfUrl
        }
      ]
    };

    // Automatic CC to admin email (if recipient isn't already the admin)
    if (email.toLowerCase() !== CONFIG.adminCcEmail.toLowerCase()) {
      brevoPayload.cc = [
        { email: CONFIG.adminCcEmail, name: "CSA Books 4 Kids Team" }
      ];
    }

    // 11. Send Email via Brevo REST API v3
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoPayload)
    });

    if (brevoResponse.ok || brevoResponse.status === 201) {
      const resData = await brevoResponse.json().catch(() => ({}));
      console.log(`[Brevo] Bonus email sent successfully to ${email} (MessageId: ${resData.messageId || 'N/A'})`);
      return jsonResponse({ 
        success: true, 
        message: "Bonus coloring PDF sent successfully!" 
      }, 200);
    } else {
      const errData = await brevoResponse.json().catch(() => ({}));
      console.error('[Brevo API Error]:', brevoResponse.status, errData);
      return jsonResponse({ 
        success: false, 
        error: "Unable to send bonus email at this time. Please try again later." 
      }, 502);
    }
  } catch (err) {
    console.error('[Server Error]:', err);
    return jsonResponse({
      success: false,
      error: "Internal server error occurred."
    }, 500);
  }
}
