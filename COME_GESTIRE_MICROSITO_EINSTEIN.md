# GUIDA ALLA GESTIONE DEL MICROSITO «EINSTEIN, QUESTA TE LA SEI PERSA!»

Questa guida spiega in modo pratico e dettagliato come gestire, aggiornare e manutenere il microsito web accessibile tramite QR Code stampato nel libro **«EINSTEIN, QUESTA TE LA SEI PERSA!»**.

---

## 1. DOVE SI TROVANO I FILE DEL MICROSITO

I file sorgente del microsito si trovano all'interno del repository nella cartella:

📁 `assets/einstein/`

La directory pubblica permanente a cui punta il QR Code viene sincronizzata automaticamente a partire da questa cartella in:

📁 `accesso/4dcbbaee2e69a278e4e59eab50430ccc/`

### Mappa dei file principali:
- `assets/einstein/index.html`: La landing page principale del microsito.
- `assets/einstein/assets/css/site.css`: Fogli di stile del portale.
- `assets/einstein/assets/js/app.js`: Motore logico (navigazione, caricamento fonti, multilingua, verifica PDF).
- `assets/einstein/config/site.json`: Configurazione generale (lingue attive, percorsi, opzioni).
- `assets/einstein/content/fonti_it.csv`: Database tabellare delle 56 fonti scientifiche e storiche.
- `assets/einstein/i18n/it.json`: Dizionario di tutte le stringhe di testo in lingua italiana.
- `assets/einstein/media/copertina.webp`: Immagine di copertina del libro mostrata nell'Hero.
- `assets/einstein/media/otto.webp`: Immagine ufficiale della mascotte Otto.
- `assets/einstein/media/fonti/`: Immagini di anteprima per ciascun codice (`SC-00.webp` ... `SC-55.webp`).
- `assets/einstein/downloads/fonti/`: Cartella in cui inserire i file PDF originali delle fonti (`SC-XX.pdf`).
- `assets/einstein/bonus/it/`: Le 5 esperienze interattive e i materiali scaricabili:
  - `missioni/missioni.pdf`: Le 7 missioni segrete di Otto (PDF da 24 pagine).
  - `museo/index.html`: Il Museo delle Scoperte Impossibili (web app interattiva).
  - `film/index.html`: Videoteca "La scienza prende vita!" con 8 filmati MP4.
  - `colora/colora.pdf`: 10 tavole A4 da colorare (PDF).
  - `carte/index.html`: Gioco web interattivo delle 36 carte "Vero, falso o non lo sappiamo?" + PDF stampabili fronte/retro.

---

## 2. COME CAMBIARE LA COPERTINA DEL LIBRO

1. Prepara la nuova immagine in formato `.webp` (oppure convertila in WebP).
2. Rinominala esattamente:
   `copertina.webp`
3. Sovrascrivi il file esistente in:
   `assets/einstein/media/copertina.webp`
4. Il CSS del sito usa `object-fit: cover` con proporzioni fisse: la nuova copertina manterrà il corretto rapporto d'aspetto senza deformarsi.
5. Esegui la sincronizzazione e pubblica (vedi punto 8).

---

## 3. COME CAMBIARE UN PDF BONUS

I PDF dei bonus si trovano in `assets/einstein/bonus/it/`:

- **Per cambiare il PDF delle Missioni:**
  Sostituisci `assets/einstein/bonus/it/missioni/missioni.pdf` con il nuovo file mantenendo lo stesso nome `missioni.pdf`.
- **Per cambiare il PDF dei Disegni da Colorare:**
  Sostituisci `assets/einstein/bonus/it/colora/colora.pdf` con il nuovo file mantenendo lo stesso nome `colora.pdf`.
- **Per cambiare le Carte stampabili:**
  Sostituisci `assets/einstein/bonus/it/carte/OTTO_CARTE_36_FRONTE_RETRO_A4.pdf` oppure `OTTO_GUIDA_REGOLE_E_SOLUZIONI.pdf`.

Mantenendo invariati i nomi dei file, tutti i link e pulsanti di download continueranno a funzionare immediatamente.

---

## 4. COME AGGIUNGERE IL PDF DI UNA FONTE SCIENTIFICA (SC-XX)

Il portale è predisposto per rilevare automaticamente la presenza dei PDF:

1. Assegna al file PDF il codice esatto della fonte, ad esempio:
   `SC-04.pdf`, `SC-15.pdf`, ecc. (lettere maiuscole `SC-`, due cifre, estensione `.pdf` minuscola).
2. Copia il file all'interno della cartella:
   `assets/einstein/downloads/fonti/`
3. **Non occorre modificare codice né il file CSV:** Quando un utente visita la scheda di quella fonte nel browser, lo script esegue una richiesta `HEAD` automatica:
   - Se il file `SC-XX.pdf` è presente, il pulsante **«Scarica il PDF della fonte ↓»** diventa verde e attivo.
   - Se il file non c'è, il pulsante rimane inattivo e mostra la dicitura *"Il PDF non è ancora disponibile in questo archivio"*, senza generare errori 404.

---

## 5. COME AGGIUNGERE O SOSTITUIRE L'IMMAGINE DI UNA FONTE

1. Prepara l'immagine della fonte in formato WebP a risoluzione circa 660×440 px.
2. Nominala con il codice della fonte, ad esempio:
   `SC-04.webp`
3. Posizionala in:
   `assets/einstein/media/fonti/SC-04.webp`
4. Se per una fonte l'immagine non è presente, il sistema applica in automatico come fallback l'illustrazione della categoria tematica (`media/temi/animali.webp`, `piante.webp`, ecc.).

---

## 6. COME MODIFICARE TITOLI, CITAZIONI E LINK DELLE FONTI

Le citazioni scientifiche e i link ufficiali si gestiscono dal file CSV:

`assets/einstein/content/fonti_it.csv`

1. Apri `assets/einstein/content/fonti_it.csv` con un editor di testo, Excel o Google Fogli.
2. La prima riga è l'intestazione: `codice,titolo,categoria,citazione,url,correzioni`.
3. Per ciascuna fonte puoi modificare:
   - `titolo`: Titolo descrittivo per bambini.
   - `categoria`: Una tra `introduzione`, `animali`, `piante`, `esperimenti`, `tecnologia`, `dinosauri`, `corpo`, `spazio`.
   - `citazione`: Riferimento bibliografico, autori o DOI.
   - `url`: Link ufficiale alla rivista scientifica (DOI, Nature, Science, NASA, ESO, ecc.).
   - `correzioni`: Eventuali note su errata corrige o chiarimenti successivi della comunità scientifica.
4. Salva il file come **CSV UTF-8** (con virgole come separatore).

---

## 7. COME AGGIUNGERE UNA NUOVA LINGUA (ES. INGLESE, FRANCESE, SPAGNOLO)

La struttura multilingua è già nativamente predisposta:

1. **Testi dell'interfaccia:**
   I dizionari di traduzione sono già presenti in:
   - `assets/einstein/i18n/en.json`
   - `assets/einstein/i18n/fr.json`
   - `assets/einstein/i18n/es.json`
   Se necessario, perfeziona le traduzioni senza cambiare i nomi delle chiavi JSON.
2. **Tabella delle fonti per la lingua:**
   Crea `assets/einstein/content/fonti_en.csv` partendo dal modello `assets/einstein/content/fonti_en_MODELLO_NON_PUBBLICARE.csv`.
3. **Cartella dei bonus nella nuova lingua:**
   Crea la cartella corrispondente (es. `assets/einstein/bonus/en/`) inserendo i bonus tradotti.
4. **Attivazione della lingua:**
   Apri `assets/einstein/config/site.json` e aggiungi il codice lingua all'array `"enabledLocales"`. Esempio:
   ```json
   "enabledLocales": [
     "it",
     "en"
   ]
   ```
5. **Permanenza del QR Code:**
   L'URL del QR Code non cambia: `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` continuerà ad aprire il portale. Il lettore potrà cambiare lingua tramite il selettore in alto a destra, oppure tramite parametro `?lang=en`.

---

## 8. COME PUBBLICARE GLI AGGIORNAMENTI

Ogni volta che modifichi file in `assets/einstein/`:

1. **Esegui lo script di sincronizzazione:**
   Nel terminale del progetto digita:
   ```bash
   node scripts/sync-einstein-route.js
   ```
   oppure esegui la build completa:
   ```bash
   npm.cmd run build
   ```
   Lo script copierà automaticamente i file aggiornati nella directory pubblica permanente `accesso/4dcbbaee2e69a278e4e59eab50430ccc/` e controllerà che tutti i file critici siano presenti.

2. **Esegui i test di verifica:**
   ```bash
   npm.cmd test
   ```
   Tutti i 31 test devono risultare verdi (`0 failed`).

3. **Invia le modifiche a GitHub:**
   ```bash
   git add .
   git commit -m "Aggiornamento contenuti microsito Einstein"
   git push origin main
   ```
   Il workflow automatico di GitHub Actions (`deploy.yml`) eseguirà la sincronizzazione, verificherà l'integrità delle rotte e pubblicherà la nuova versione su GitHub Pages in 1-2 minuti.

---

## 9. COME VERIFICARE CHE IL QR CODE FUNZIONI

Dopo il deployment:

1. Apri una finestra anonima del browser sul computer o sullo smartphone.
2. Incolla l'URL permanente:
   `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/`
3. Prova anche l'indirizzo senza slash finale:
   `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc`
   (deve reindirizzare immediatamente alla versione con slash finale senza errori 404).
4. Verifica che la landing page si carichi con lo sfondo blu scuro a tema astronomico, la mascotte Otto e il titolo *«Il mondo segreto di Otto»*.
5. Clicca sui bonus e sulle fonti per verificare che tutte le sezioni si aprano correttamente.

---

## 10. COME MANTENERE IL LINK DURANTE UNA FUTURA MIGRAZIONE

Nel caso in cui il sito CSA Books Kids venga riprogettato o migrato su una nuova piattaforma (es. WordPress, Next.js, Cloudflare Pages, Shopify, ecc.):

> ⚠️ **REGOLA ASSOLUTA:** L'URL `https://csabookskids.com/accesso/4dcbbaee2e69a278e4e59eab50430ccc/` non deve mai essere rimosso né reindirizzato altrove. È stampato all'interno di libri cartacei fisici.

1. **Prima di spegnere il vecchio hosting:**
   Configura sul nuovo server una regola di rewrite o reverse proxy che instradi:
   `/accesso/4dcbbaee2e69a278e4e59eab50430ccc/*`
   verso i file statici del microsito.
2. **Consulta il file di riferimento:**
   Leggi il file `PERMANENT_QR_URL_DO_NOT_CHANGE.md` alla radice del repository per gli esempi di configurazione specifici per Nginx, Apache, Cloudflare Pages, Netlify e Next.js.
3. **Esegui un test di risposta HTTP 200** sull'URL pubblico prima di cambiare i record DNS.

---

## 11. LA CHIAVE SEGRETA DI OTTO — COME FUNZIONA L'ACCESSO

Il microsito accoglie i lettori con la schermata d'accesso **«La chiave segreta di Otto»**:

1. **Chiave Universale Immutabile:**
   La chiave d'accesso è:
   ```text
   OTTO
   ```
   - È universale, permanente, non scade e non cambia tra edizioni o traduzioni future.
   - Il sistema accetta `OTTO`, `otto`, `Otto` e qualsiasi combinazione con spazi iniziali/finali rimossi in automatico.

2. **Percorsi del Visitatore:**
   - **Chi conosce già la chiave:** La digita nel primo campo ed entra istantaneamente nel portale con un'animazione celebrativa dorata.
   - **Chi non la conosce ancora:** Un adulto inserisce la propria email per riceverla gratuitamente via posta elettronica. Sotto al campo email è presente la casella facoltativa per ricevere aggiornamenti editoriali e il link all'informativa privacy.

3. **Memorizzazione sul Dispositivo:**
   - Dopo l'accesso, lo stato di sblocco viene salvato nel `localStorage` del browser (`otto_unlocked = 'true'`).
   - Nelle visite successive dallo stesso dispositivo, il visitatore entra direttamente nel portale senza dover digitare di nuovo la chiave.
   - Nella barra di navigazione e nel footer è sempre presente il pulsante **«🔑 Chiave»** che consente in qualunque momento di tornare alla schermata d'accesso per richiedere nuovamente la chiave via email o per bloccare di nuovo il dispositivo.

4. **Natura della Protezione (Distribuzione Statica):**
   - La chiave universale non costituisce autenticazione crittografica forte né DRM: il suo scopo è offrire un'esperienza d'accesso giocosa e coinvolgente pensata per bambini ed esploratori.
   - Trattandosi di un sito statico distribuito su CDN (GitHub Pages / Vercel), chi conosce l'URL diretto dei file PDF o video può comunque aprirli. Questo è il comportamento corretto e desiderato per non introdurre infrastrutture server pesanti o account a pagamento per materiale gratuito.

---

## 12. COME MODIFICARE I TESTI DELL'ACCESSO E DELL'EMAIL

Tutti i testi sono centralizzati nei file dizionario i18n e non sono hardcoded nel codice sorgente:

### Testi della Schermata d'Accesso Web:
Apri `assets/einstein/i18n/it.json` e modifica le proprietà dentro la sezione `"access"`:
- `"title"`: Titolo principale (default: *LA CHIAVE SEGRETA DI OTTO*)
- `"subtitle"`: Sottotitolo introduttivo
- `"path1Title"`, `"path1Label"`, `"path1Btn"`: Primo percorso (chi ha la chiave)
- `"path2Title"`, `"path2Text"`, `"path2Label"`, `"path2Btn"`: Secondo percorso (richiesta email)
- `"path2Sent"`: Messaggio di conferma invio email
- `"marketingConsent"`: Testo della checkbox facoltativa newsletter

### Testi dell'Email Transazionale inviata ai genitori:
Apri `assets/einstein/i18n/it.json` e modifica la sezione `"keyEmail"`:
- `"subject"`: Oggetto dell'email (default: *La chiave segreta di Otto è arrivata! 🔑*)
- `"greeting"`: Saluto iniziale (*Ciao, esploratore!*)
- `"intro"`: Introduzione di Otto
- `"instruction"`: Spiegazione su come tornare e inserire la chiave
- `"ctaBtn"`: Testo del pulsante dorato che riporta al microsito

*Nota:* I file `en.json`, `fr.json` ed `es.json` contengono le corrispondenti chiavi già tradotte per le future espansioni linguistiche del libro.

---

## 13. COME MODIFICARE L'IMMAGINE DI OTTO CON LA CHIAVE DORATA

L'illustrazione ufficiale di Otto che tiene la grande chiave dorata si trova in:

📁 `assets/einstein/media/polpo_esploratore_con_chiave_dorata.png` (PNG trasparente)
📁 `assets/einstein/media/polpo_esploratore_con_chiave_dorata.webp` (WebP compresso per il web)

### Per aggiornare o sostituire l'immagine:
1. Prepara l'immagine ritagliata con **sfondo trasparente (alpha channel)**.
2. Salva la versione ad alta qualità come `polpo_esploratore_con_chiave_dorata.png` in `assets/einstein/media/`.
3. Esporta anche la versione compressa `polpo_esploratore_con_chiave_dorata.webp`.
4. Esegui la sincronizzazione con:
   ```bash
   node scripts/sync-einstein-route.js
   ```
5. L'immagine verrà sincronizzata automaticamente nella cartella pubblica permanente e utilizzata sia sulla schermata web che come intestazione visuale delle email inviate ai genitori.

---

## 14. COME CONFIGURARE IL MITTENTE E L'ALIAS EMAIL SU BREVO

Il sistema riutilizza l'infrastruttura **Brevo (Sendinblue)** già configurata per l'invio dei bonus di *Le Avventure del Cantiere*, tramite l'endpoint serverless Edge:

📁 `api/send-otto-key.js`

### Differenza tra Invio Messaggi e Ricezione Risposte:

1. **Invio (Mittente visualizzato):**
   - Indirizzo desiderato: `otto@csabookskids.com`
   - Nome mittente: **Otto | Il mondo delle scoperte**
   - Poiché le email partono tramite le API di Brevo, **non è necessario acquistare una nuova casella di posta**.
   - **Opzione A (Consigliata — Autenticazione Dominio):** Nel pannello Brevo > **Mittenti e IP** > **Domini**, aggiungi `csabookskids.com`. Brevo fornirà i record DNS (DKIM TXT `mail._domainkey`, Brevo-code TXT, DMARC TXT). Una volta verificato il dominio, **qualsiasi indirizzo `@csabookskids.com` può inviare immediatamente** senza costi.
   - **Opzione B (Verifica singolo mittente):** Nel pannello Brevo > **Mittenti e IP** > **Mittenti**, aggiungi `otto@csabookskids.com`. Brevo invierà un'email di conferma con link di attivazione.

2. **Ricezione Risposte (Reply-To e Alias):**
   - L'endpoint configura l'header `replyTo: "csabooks.kids@gmail.com"`. Se un genitore clicca "Rispondi" nel suo client (Gmail, Outlook, Apple Mail), il messaggio arriva direttamente nella casella Gmail esistente di CSA.
   - Se desideri anche ricevere email inviate spontaneamente a `otto@csabookskids.com`, attiva un **inoltro email gratuito (Email Forwarding)** presso il gestore del tuo dominio (es. Cloudflare Email Routing o cPanel):
     - Regola: `otto@csabookskids.com` &rarr; inoltra a `csabooks.kids@gmail.com`.

3. **Variabili d'Ambiente su Vercel:**
   Se prima della verifica DNS su Brevo desideri testare l'invio o usare un indirizzo alternativo, imposta in Vercel:
   - `OTTO_SENDER_EMAIL`: Indirizzo mittente (default: `otto@csabookskids.com`)
   - `OTTO_SENDER_NAME`: Nome visualizzato (default: `Otto | Il mondo delle scoperte`)
   - `OTTO_REPLY_TO`: Indirizzo di risposta (default: `csabooks.kids@gmail.com`)
   - `BREVO_FALLBACK_SENDER`: Mittente di emergenza verificato (default: `csabooks.kids@gmail.com`)
   - Se Brevo dovesse rifiutare `otto@csabookskids.com` perché non ancora convalidato nel pannello, il sistema **esegue un fallback trasparente su `csabooks.kids@gmail.com`**, garantendo che nessun genitore rimanga senza la chiave!

---

## 15. PRIVACY POLICY & CONSENSI: ELEMENTI DA APPROVARE

In conformità al Regolamento Generale sulla Protezione dei Dati (GDPR — Regolamento UE 2016/679):

### Distinzione Netta dei Trattamenti:
1. **Invio della Chiave Segreta (Base Giuridica: Esecuzione di servizio contrattuale / richiesta, art. 6.1.b):**
   - Il genitore inserisce l'email unicamente per ricevere il codice universale `OTTO`.
   - Questa richiesta **non comporta alcuna iscrizione automatica alla newsletter**.
   - L'email non viene aggiunta a mailing list commerciali.
2. **Iscrizione Facoltativa alle Novità Editoriali (Base Giuridica: Consenso esplicito, art. 6.1.a):**
   - Checkbox **non preselezionata**.
   - Solo se spuntata dall'utente, il contatto viene registrato nella lista marketing di Brevo con data, lingua, versione del consenso e provenienza.

### ⚠️ Elementi da Approvare / Integrare prima del Lancio Pubblico:
- **Titolare del Trattamento:** Indicare la denominazione legale/societaria definitiva di CSA Books Kids o del titolare.
- **DPO / Contatto Privacy:** Verificare che l'email `csabooks.kids@gmail.com` sia la casella designata per la ricezione di richieste di cancellazione/revoca.
- **Periodo di Conservazione:** Confermare la policy di cancellazione dei log di servizio per le richieste non iscritte alla newsletter (consigliato: 30-90 giorni nei log tecnici Brevo).
- **ID Lista Marketing Brevo:** Se si desidera popolare una lista Brevo specifica per chi acconsente alla newsletter, impostare su Vercel la variabile `BREVO_MARKETING_LIST_ID` con l'ID numerico della lista.

---

## 📋 ELENCO FILE MODIFICATI E CREATI PER L'INTEGRAZIONE DELLA CHIAVE

### Nuovi File:
1. `api/send-otto-key.js`: Serverless Edge handler Brevo v3 per la consegna della chiave segreta di Otto, con rate-limiting, honeypot, gestione consensi e fallback automatico.
2. `assets/einstein/media/polpo_esploratore_con_chiave_dorata.png`: Illustrazione ad alta risoluzione con canale alpha trasparente di Otto con chiave dorata.
3. `assets/einstein/media/polpo_esploratore_con_chiave_dorata.webp`: Versione WebP compressa e ottimizzata per le massime prestazioni su mobile.
4. `scripts/test-access-flow.js`: Suite di test automatizzati per verificare validazione chiave, localStorage, template email, integrità asset e testi i18n.

### File Aggiornati:
1. `assets/einstein/assets/js/app.js`: Implementazione della schermata d'accesso, logica di sblocco con `OTTO`, persistenza `localStorage`, gestione modale privacy e badge chiave in navigazione.
2. `assets/einstein/assets/css/site.css`: Stili premium coordinati, tema blu notte e oro, animazione fluttuante di Otto, responsive design e modale privacy.
3. `assets/einstein/i18n/it.json`: Aggiunte stringhe ufficiali per l'accesso e per il template email.
4. `assets/einstein/i18n/en.json`, `fr.json`, `es.json`: Predisposizione traduzioni multilingua per future attivazioni.
5. `api/send-bonus.js`: Aggiunta delegazione trasparente per `action === 'otto-key'` senza alcuna modifica o regressione sui volumi 1 e 2.
6. `test-endpoint.js`: Espansione con 8 nuovi test per Brevo Otto, rate-limiting, validazione email, honeypot e marketing consent (60 test totali superati).
7. `test-qr-routes.js`: Inclusione degli asset della chiave dorata nei controlli di integrità permanenti.
8. `scripts/sync-einstein-route.js`: Inclusione automatica dei nuovi file grafici nella sincronizzazione permanente.
9. `.env.example`: Documentazione dettagliata di tutte le variabili d'ambiente per Brevo e per l'alias di Otto.
10. `package.json`: Aggiunto `test-access-flow.js` nella pipeline di test principale.
