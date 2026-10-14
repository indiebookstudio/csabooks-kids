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

## 📋 ELENCO FILE MODIFICATI E CREATI PER L'INTEGRAZIONE

### Nuovi File di Configurazione e Script:
1. `config/permanent-einstein-route.json`: Configurazione centralizzata con token crittografico, URL pubblico e percorsi.
2. `scripts/sync-einstein-route.js`: Script Node.js di sincronizzazione automatica e controllo integrità file critici.
3. `accesso/4dcbbaee2e69a278e4e59eab50430ccc/`: Directory pubblica permanente sincronizzata con tutti i file del microsito.
4. `accesso/4dcbbaee2e69a278e4e59eab50430ccc.html`: Fallback di reindirizzamento immediato per richieste senza trailing slash.
5. `accesso/index.html`: Pagina di protezione per richieste generiche a `/accesso/`.
6. `PERMANENT_QR_URL_DO_NOT_CHANGE.md`: Documento di salvaguardia e registro ufficiale della rotta permanente.
7. `COME_GESTIRE_MICROSITO_EINSTEIN.md`: Questa guida completa alla manutenzione in italiano.

### File Esistenti Aggiornati:
1. `package.json`: Aggiunto script `"build": "node scripts/generate-banners.js && node scripts/sync-einstein-route.js"`.
2. `.github/workflows/deploy.yml`: Aggiunti passaggi di sincronizzazione e test automatici prima del deployment su GitHub Pages.
3. `vercel.json`: Aggiunte in cima all'elenco delle rewrites le regole per `/accesso/4dcbbaee2e69a278e4e59eab50430ccc*`.
4. `404.html`: Aggiunto il token `4dcbbaee2e69a278e4e59eab50430ccc` nel dispatcher immutabile `QR_REGISTRY`.
5. `serve.js`: Aggiunto supporto MIME per file `.csv` usati dalla biblioteca delle fonti.
6. `test-qr-routes.js`: Aggiunto il controllo permanente per tutti i file e percorsi del microsito Einstein.
7. `PERMANENT_QR_ROUTES.md`: Aggiunta la scheda del libro *Einstein, questa te la sei persa!* nel registro ufficiale rotte QR.
8. `assets/einstein/config/site.json`: Rimosso `contactUrl` per garantire l'isolamento grafico e strutturale assoluto da CSA.
