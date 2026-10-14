# ⚠️ PERMANENT PUBLIC ROUTE — DO NOT DELETE OR RENAME ⚠️

> **AVVISO CRITICO DI NON MODIFICABILITÀ:**
> Questo URL è stampato **fisicamente in formato QR Code** all'interno di migliaia di copie del libro cartaceo per bambini **«EINSTEIN, QUESTA TE LA SEI PERSA!»** distribuite a livello internazionale tramite Amazon KDP.
> Un lettore potrebbe scansionare questo QR Code nel 2026, nel 2029 o nel 2035.
> **L'INDIRIZZO NON DEVE MAI ESSERE MODIFICATO, RIGENERATO, SPOSTATO O RIMOSSO PER NESSUN MOTIVO.**

---

## 📌 Scheda Ufficiale Rotta Permanente

| Parametro | Valore Ufficiale |
| :--- | :--- |
| **Opera / Libro** | *Einstein, questa te la sei persa!* (di Clara Musicco) |
| **Indirizzo Pubblico Definitivo** | `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` |
| **Codice Univoco Immutabile (Token)** | `4dcbbaee2e69a278e4e59eab50430ccc` |
| **Entropia Crittografica** | 128 bit (`crypto.randomBytes(16)`) |
| **Data di Attivazione e Approvazione** | 14 Ottobre 2026 |
| **Regola di Routing / Rewrite** | Vercel rewrite + GitHub Pages static direct path + Fallback dispatcher in `404.html` |
| **Percorso Sorgente Interno Attuale** | `assets/einstein/` |
| **Percorso Pubblico Servito** | `accesso/4dcbbaee2e69a278e4e59eab50430ccc/` |
| **File Configurazione Centralizzata** | `config/permanent-einstein-route.json` |

---

## 🛡️ Motivazione della Permanenza Assoluta

1. **Stampa fisica permanente:** A differenza di una campagna online, un libro cartaceo stampato non può essere aggiornato retroattivamente. Una modifica all'URL renderebbe i libri fisici già venduti inservibili per i bambini acquirenti.
2. **Indipendenza dall'infrastruttura interna:** L'URL pubblico `/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` è completamente disaccoppiato da dove i file sorgente risiedono fisicamente. Se in futuro i file interni vengono spostati da `assets/einstein/` a un'altra cartella (es. `public/microsites/einstein/`), basta aggiornare il mapping interno in `config/permanent-einstein-route.json` ed eseguire la sincronizzazione: **l'URL pubblico per i lettori non cambierà mai.**

---

## ⚙️ Meccanismo Tecnico di Routing & Protezione

La rotta è protetta a più livelli per garantire che qualsiasi richiesta riceva HTTP 200 immediato su qualsiasi hosting:

1. **Percorso Statico Diretto (GitHub Pages & CDN):**
   - La cartella fisica `accesso/4dcbbaee2e69a278e4e59eab50430ccc/` contiene la copia completa e autonoma del microsito (`index.html`, `assets/`, `bonus/`, `config/`, `content/`, `downloads/`, `i18n/`, `media/`).
   - La cartella viene sincronizzata in automatico a ogni build tramite `scripts/sync-einstein-route.js`.
2. **Fallback Trailing Slash:**
   - Il file `accesso/4dcbbaee2e69a278e4e59eab50430ccc.html` intercetta scanner QR o client che omettono lo slash finale e reindirizza istantaneamente a `/accesso/4dcbbaee2e69a278e4e59eab50430ccc/`.
3. **Regole Vercel (`vercel.json`):**
   - Regole esplicite in cima all'elenco delle rewrites per servire sia `/accesso/4dcbbaee2e69a278e4e59eab50430ccc` sia tutti i sotto-percorsi `/(.*)` con priorità assoluta rispetto alle route catch-all.
4. **Dispatcher di Sicurezza 404 (`404.html`):**
   - Nel caso in cui una richiesta arrivi malformata o su un server CDN prima della propagazione, lo script immutabile in `404.html` riconosce il token `4dcbbaee2e69a278e4e59eab50430ccc` e reindirizza istantaneamente alla rotta corretta.
5. **Test di Integrità nel CI/CD (`test-qr-routes.js` & GitHub Actions):**
   - Lo script `test-qr-routes.js` verifica la presenza di tutti i file e le configurazioni. Se un futuro commit elimina o altera accidentalmente la rotta, la build e il deployment falliscono bloccando il rilascio difettoso.

---

## 🚚 Procedura per Mantenere il Link durante una Migrazione Futura

Se il dominio `csabookskids.com` o l'infrastruttura di hosting viene migrata a un'altra tecnologia (es. Next.js, Cloudflare Pages, AWS CloudFront, Nginx, Apache, Netlify):

1. **NON eliminare né cambiare l'URL:** Il nuovo hosting deve rispondere esattamente su:
   `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/`
2. **Configurare la regola di rewrite / routing sul nuovo server PRIMA di commutare i DNS:**
   - **Se Nginx:**
     ```nginx
     location /accesso/4dcbbaee2e69a278e4e59eab50430ccc/ {
         alias /var/www/csabookskids/assets/einstein/;
         try_files $uri $uri/ /accesso/4dcbbaee2e69a278e4e59eab50430ccc/index.html;
     }
     ```
   - **Se Apache (`.htaccess`):**
     ```apache
     RewriteRule ^accesso/4dcbbaee2e69a278e4e59eab50430ccc/(.*)$ /assets/einstein/$1 [L]
     ```
   - **Se Cloudflare Pages / Netlify (`_redirects`):**
     ```text
     /accesso/4dcbbaee2e69a278e4e59eab50430ccc/*  /assets/einstein/:splat  200
     ```
   - **Se Next.js (`next.config.js`):**
     ```javascript
     async rewrites() {
       return [
         {
           source: '/accesso/4dcbbaee2e69a278e4e59eab50430ccc/:path*',
           destination: '/assets/einstein/:path*'
         }
       ];
     }
     ```
3. **Verificare con test HTTP reali:** Eseguire `curl -I https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` e assicurarsi che risponda `HTTP 200 OK` prima di dismettere il vecchio hosting.

---

## 🔍 Controlli Obbligatori dopo Ogni Deployment

Dopo qualsiasi pubblicazione del sito o modifica al repository:

1. Eseguire localmente `npm test` (deve riportare `0 failed`).
2. Aprire in una finestra anonima del browser l'indirizzo pubblico:
   `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/`
3. Verificare:
   - Che la copertina e Otto appaiano correttamente.
   - Che non compaiano header/footer o elementi grafici di CSA Books Kids.
   - Che cliccando su «I bonus» si aprano le cinque sezioni.
   - Che cliccando su «Biblioteca delle fonti» siano visibili le schede da SC-00 a SC-55.
