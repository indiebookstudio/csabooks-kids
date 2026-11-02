# CSA BOOKS KIDS 2.0 — Report di Ristrutturazione Completa

> **Data:** Novembre 2026  
> **Branch Git locale:** `redesign-csa-2.0`  
> **Stato di pubblicazione:** Lavoro eseguito **ESCLUSIVAMENTE IN LOCALE**. Nessun commit o push remoto eseguito.

---

## 1. Sintesi Esecutiva delle Modifiche

Il sito **CSA Books Kids** è stato trasformato da una vetrina quasi esclusiva per *Le Avventure del Cantiere* a un portale editoriale internazionale per bambini, moderno, illustrato e strutturato in **4 universi editoriali principali**:

1. 🚜 **Le Avventure del Cantiere** (2–5 anni, Marco Salucci): 8 storie illustrate, raccolte Volume 1 e Volume 2, gallery dei personaggi (Benny, Rudy, Leo, Bruno, Nina, Rino), contenuti audio e video originali.
2. 🔬 **Scienza e curiosità** (7–12 anni, Clara Musicco): titolo di punta *Einstein, questa te la sei persa!* con 57 scoperte verificate, la mascotte Otto e portale segreto interattivo.
3. 🧭 **Per la scuola** (Clara Musicco): struttura predisposta per collane didattiche, a partire da *La Bussola Misteriosa — Matematica per la 2ª Primaria* (attualmente in preparazione, senza finti pulsanti di acquisto).
4. 🎨 **Da colorare e creare** (5–10 anni, Marco Salucci): libri creativi, con titolo di partenza *Fano col naso all'insù*, sfoglia libro e tavole da colorare.

### Principi Architetturali Rispettati
- **Preservazione assoluta delle rotte QR code**: 100% degli URL stampati nei libri cartacei continuano a funzionare senza redirect e con tutti gli asset integri (audio, video, PDF).
- **Integrità della barra superiore**: la barra contatti, i link social e il selettore FlagCDN a 9 lingue sono rimasti esattamente identici e perfettamente operativi.
- **Pulsante di acquisto unico (Paperback Amazon)**: rimossi selettori di formato (Kindle, copertina rigida) e prezzi numerici; link diretti alle edizioni cartacee con ASIN verificati. Per *Einstein*, in assenza di ASIN confermato, è presente lo stato "Disponibile a breve su Amazon" con pulsante disabilitato, come richiesto.
- **Internazionalizzazione (i18n) a 9 lingue**: 110 chiavi di traduzione completate al 100% per Italiano, Inglese, Tedesco, Francese, Spagnolo, Olandese, Polacco, Svedese e Giapponese. Zero chiavi mancanti, zero valori vuoti.
- **Manutenzione zero-code (media replacement)**: copertine e interni sono caricati dinamicamente dalla struttura `books/<id>/<lang>/`; sostituendo un file `.png`, il sito e la modale "Sfoglia il libro" si aggiornano senza toccare HTML o JSON.

---

## 2. Struttura delle Cartelle (Prima vs Dopo)

### Prima della Ristrutturazione
```
csabooks-kids/
├── .github/ & .githooks/
├── accesso/4dcbbaee2e69a278e4e59eab50430ccc/   (Microsito Einstein)
├── assets/                                     (Asset Cantiere, loghi, audio, video)
├── csa-vol1-bonus-* / csa-vol1-ep*             (Cartelle e file QR Vol 1)
├── csa-vol2-bonus-* / csa-vol2-ep*             (Cartelle e file QR Vol 2)
├── index.html, about.html, characters.html, fano.html (Pagine singole slegate)
├── books.js, campaign.js, style.css, script.js
└── ... (file misti nella radice)
```

### Dopo la Ristrutturazione (Architettura 2.0)
```
csabooks-kids/
├── books/                                      📁 Cartella centrale risorse libri
│   ├── csa-vol1/                               (it, en, fr, es: cover.png, back.png, interiors/)
│   ├── csa-vol2/
│   ├── einstein/
│   ├── fano/
│   ├── csa-01 ... csa-08/
│   └── la-bussola-misteriosa-matematica-2/
├── data/                                       📁 Metadati e internazionalizzazione
│   ├── books.json                              (Anagrafica 13 titoli, categorie, ASIN)
│   ├── books-manifest.json & .js               (Scansione automatica file books/)
│   ├── i18n.json & .js                         (Dizionario 9 lingue: 110 chiavi)
│   └── runtime-data.js                         (Bundle statico precompilato)
├── docs/                                       📁 Documentazione per manutenzione
│   ├── PROTECTED_URLS.md                       (Registro rotte permanenti QR code)
│   ├── COME_AGGIUNGERE_O_MODIFICARE_UN_LIBRO.md (Guida illustrata non tecnici)
│   └── REDESIGN_REPORT.md                      (Questo documento)
├── scripts/                                    📁 Automazioni e build
│   ├── generate-books-manifest.js              (Scanner filesystem books/)
│   ├── compile-runtime.js                      (Generatore bundle runtime)
│   ├── generate-i18n.js                        (Compilatore dizionari)
│   └── setup-books-structure.js                (Popolatore alberatura iniziale)
├── tests/                                      📁 Suite di collaudo automatizzato
│   ├── test-translations.js                    (Verifica 110/110 chiavi x 9 lingue)
│   ├── test-books-media.js                     (Test sostituzione file senza codice)
│   ├── test-browser-e2e.js                     (Test rendering Chrome headless)
│   ├── run-browser-e2e.ps1                     (Script PowerShell cattura 12 viste)
│   ├── render-screenshot.ps1                   (Driver cattura headless Chrome)
│   └── screenshots/                            (12 screenshot PNG verificati)
├── app-2.0.js                                  🚀 Script applicativo 2.0 (i18n, modal, filtri)
├── style-2.0.css                               🎨 Foglio di stile editoriale moderno
├── index.html                                  🏠 Nuova Homepage multiverso editoriale
├── catalogo.html                               📚 Catalogo completo con filtri e ricerca
├── cantiere.html                               🚜 Universo Cantiere & Personaggi
├── scienza.html                                🔬 Universo Scienza & Einstein
├── scuola.html                                 🧭 Universo Scuola & Apprendimento
├── colorare.html                               🎨 Universo Creatività & Fano
├── about.html                                  📖 Chi siamo, fondatori e filosofia
├── characters.html & fano.html                 🔗 Alias preservati per compatibilità
└── [ROTTE QR CODE ORIGINALI]                   🛡️ 100% INALTERATE NELLA RADICE
```

---

## 3. Registro delle Rotte Protette e Verificate

Tutti i seguenti percorsi sono stati verificati sia come file singoli sia tramite server locale HTTP:

| Rotta Pubblica | Tipo / Destinazione | Verifica |
| :--- | :--- | :---: |
| `/csa-vol1-bonus-8f2e91b7d4a6.html` | QR Volume 1 — Hub Bonus (PDF, audio, video) | ✅ Superato |
| `/csa-vol1-bonus-8f2e91b7d4a6/index.html` | Fallback cartella per server senza rewrite | ✅ Superato |
| `/csa-vol1-ep1-ita-7b3f91a8d2c4.html` | QR Episodio 1 Volume 1 | ✅ Superato |
| `/csa-vol1-ep2-ita-4d9e16a2c8f1.html` | QR Episodio 2 Volume 1 | ✅ Superato |
| `/csa-vol1-ep3-ita-9a5c83e1f7d2.html` | QR Episodio 3 Volume 1 | ✅ Superato |
| `/csa-vol1-ep4-ita-6e2b94f0a3c5.html` | QR Episodio 4 Volume 1 | ✅ Superato |
| `/csa-vol2-bonus-46c694dc3ec4.html` | QR Volume 2 — Hub Bonus (PDF, audio, video) | ✅ Superato |
| `/csa-vol2-bonus-46c694dc3ec4/index.html` | Fallback cartella per server senza rewrite | ✅ Superato |
| `/csa-vol2-ep1-ita-1c683f8acb67.html` | QR Episodio 1 Volume 2 | ✅ Superato |
| `/csa-vol2-ep2-ita-ed3dabb448ca.html` | QR Episodio 2 Volume 2 | ✅ Superato |
| `/csa-vol2-ep3-ita-2779f3736b81.html` | QR Episodio 3 Volume 2 | ✅ Superato |
| `/csa-vol2-ep4-ita-605c1bd7e4ce.html` | QR Episodio 4 Volume 2 | ✅ Superato |
| `/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` | Microsito segreto Otto per Einstein (57 fonti, museo, 3D, PDF) | ✅ Superato |
| `characters.html` & `fano.html` | URL storici (aliased verso le sezioni 2.0) | ✅ Superato |

---

## 4. Riepilogo Test Eseguiti ed Esiti

| Suite di Test | Comando | Esito | Dettaglio |
| :--- | :--- | :---: | :--- |
| **Integrità Rotte QR** | `node test-qr-routes.js` | ✅ 100% PASS | 22/22 rotte e asset PDF/WAV/MP4 verificati |
| **Endpoint HTTP** | `node test-endpoint.js` | ✅ 100% PASS | 62 asserzioni superate, 0 fallite |
| **Flusso Accesso Otto** | `node scripts/test-access-flow.js` | ✅ 100% PASS | 23 asserzioni superate, chiave `OTTO` |
| **12 Test Obbligatori** | `node scripts/verify-all-tests.js` | ✅ 12/12 PASS | Build, landing, 57 fonti, isolamento, download PDF |
| **Internazionalizzazione (i18n)** | `node tests/test-translations.js` | ✅ 100% PASS | 110/110 chiavi x 9 lingue verificate, 0 vuote |
| **Sostituzione Media Zero-Code** | `node tests/test-books-media.js` | ✅ 100% PASS | Sostituzione cover/interno senza modifiche a codice/JSON, ripristino SHA256 verificato |
| **Browser E2E (Real Chrome)** | `npm run test:e2e` | ✅ 12/12 PASS | 12 schermate ad alta risoluzione (Desktop, Tablet, Mobile) catturate in `tests/screenshots/` |

---

## 5. Stato del Multilingua (9 Lingue)

Il sistema supporta nativamente 9 lingue con normalizzazione automatica dei codici (`sv` -> `se`, `ja` -> `jp`):

| Lingua | Codice | Copertura Chiavi | Note |
| :--- | :---: | :---: | :--- |
| **Italiano** | `it` | 110 / 110 (100%) | Lingua di default |
| **Inglese** | `en` | 110 / 110 (100%) | Completo |
| **Tedesco** | `de` | 110 / 110 (100%) | Completo |
| **Francese** | `fr` | 110 / 110 (100%) | Completo |
| **Spagnolo** | `es` | 110 / 110 (100%) | Completo |
| **Olandese** | `nl` | 110 / 110 (100%) | Completo |
| **Polacco** | `pl` | 110 / 110 (100%) | Completo |
| **Svedese** | `se` | 110 / 110 (100%) | Completo |
| **Giapponese** | `jp` | 110 / 110 (100%) | Completo |

---

## 6. Stato dei Link Amazon (Paperback Unico)

Ogni libro presenta **un solo pulsante d'azione**:
- Nessuna tab Kindle o Hardcover.
- Nessuna indicazione di prezzo.
- Link Amazon diretto con reindirizzamento al marketplace opportuno (o default `.it` / `.com`).

| ID Libro | Titolo | ASIN Paperback | Stato Pulsante |
| :--- | :--- | :---: | :--- |
| `csa-vol1` | Le Avventure del Cantiere — Vol. 1 | `B0DPJ6Q1DW` | ✅ Attivo su Amazon |
| `csa-vol2` | Le Avventure del Cantiere — Vol. 2 | `B0DPJ6W8RN` | ✅ Attivo su Amazon |
| `csa-01` | Benny l'Escavatore | `B0DRKB2839` | ✅ Attivo su Amazon |
| `csa-02` | Rudy la Ruspa | `B0DRK9S32C` | ✅ Attivo su Amazon |
| `csa-03` | Leo la Betoniera | `B0DRK8N796` | ✅ Attivo su Amazon |
| `csa-04` | Bruno il Rullo | `B0DRKBSW6F` | ✅ Attivo su Amazon |
| `csa-05` | Nina la Minipala | `B0DRK9197H` | ✅ Attivo su Amazon |
| `csa-06` | Rino il Camion | `B0DRK8NVLF` | ✅ Attivo su Amazon |
| `csa-07` | Il Salvataggio nel Fango | `B0DRK9QZ27` | ✅ Attivo su Amazon |
| `csa-08` | Il Ponte di Legno | `B0DRKCR1N9` | ✅ Attivo su Amazon |
| `fano` | Fano col naso all'insù | `B0DNFC732B` | ✅ Attivo su Amazon |
| `einstein` | Einstein, questa te la sei persa! | *Non ancora assegnato* | ⏳ "Disponibile a breve su Amazon" (disabilitato) |
| `la-bussola-misteriosa-matematica-2` | La Bussola Misteriosa — Matematica 2ª | *In preparazione* | ⏳ "In arrivo" (disabilitato) |

---

## 7. Istruzioni per Avviare e Revisionare il Sito in Locale

### 1. Avvio del Server Locale
Apri una finestra di terminale (PowerShell o Command Prompt) nella cartella del repository ed esegui:

```bash
node serve.js
```

Il terminale mostrerà:
```
CSA Books 4 Kids server running at http://localhost:8080
```

### 2. Pagine Principali da Esaminare
Apri il tuo browser preferito (Chrome, Edge, Firefox, Safari) e naviga su:

- **Homepage 2.0:** [http://localhost:8080/](http://localhost:8080/)
- **Catalogo Completo con Filtri:** [http://localhost:8080/catalogo.html](http://localhost:8080/catalogo.html)
- **Universo Il Cantiere:** [http://localhost:8080/cantiere.html](http://localhost:8080/cantiere.html)
- **Universo Scienza e Curiosità:** [http://localhost:8080/scienza.html](http://localhost:8080/scienza.html)
- **Universo Per la Scuola:** [http://localhost:8080/scuola.html](http://localhost:8080/scuola.html)
- **Universo Da Colorare e Creare:** [http://localhost:8080/colorare.html](http://localhost:8080/colorare.html)
- **Chi Siamo:** [http://localhost:8080/about.html](http://localhost:8080/about.html)
- **Bonus QR Volume 1:** [http://localhost:8080/csa-vol1-bonus-8f2e91b7d4a6.html](http://localhost:8080/csa-vol1-bonus-8f2e91b7d4a6.html)
- **Microsito Einstein (Accesso Segreto):** [http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/](http://localhost:8080/accesso/4dcbbaee2e69a278e4e59eab50430ccc/)

### 3. Esecuzione dei Test
Per rieseguire l'intera suite di test in qualsiasi momento:

```bash
npm test
```

Per eseguire i test grafici E2E con cattura degli screenshot in headless Chrome:

```bash
npm run test:e2e
```

### 4. Arresto del Server
Nel terminale in cui è attivo `node serve.js`, premi semplicemente:
`Ctrl + C` (o chiudi la finestra del terminale).

---

## 8. Differenze tra Preview Locale e Futuro Deploy su GitHub Pages

| Aspetto | Ambiente Locale (`node serve.js`) | GitHub Pages (`.github/workflows/deploy.yml`) |
| :--- | :--- | :--- |
| **Server HTTP** | Server Node.js minimale su porta `8080`. | Web server CDN Nginx statico globale GitHub. |
| **Routing e Clean URLs** | `serve.js` risolve sia `cantiere` sia `cantiere.html`. | GitHub Pages serve direttamente `cantiere.html` o cartelle `cantiere/index.html`. Tutti i link interni utilizzano `.html` per compatibilità universale. |
| **Directory Fallbacks** | Presenti cartelle gemelle con `index.html` per tutti i QR code (es. `csa-vol1-bonus-8f2e91b7d4a6/index.html`). | Entrambe le varianti (con e senza `.html`) rispondono con codice HTTP 200. |
| **Deploy remoto** | Nessuna azione remota effettuata. Il codice rimane sul branch locale `redesign-csa-2.0`. | Quando approvato dall'utente, il merge su `main` attiverà la GitHub Action già configurata. |
