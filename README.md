# 📚 CSA Books 4 Kids — Vetrina Editoriale Ufficiale

Sito web statico moderno, colorato e ad altissima conversione per **CSA Books 4 Kids** e la collana di libri illustrati per bambini **Le Avventure del Cantiere** (*Construction Site Adventures*) di **Marco Salucci**.

Pubblicato tramite **GitHub Pages**.

---

## 🎯 Flusso di Conversione Semplificato (Social → Amazon)

```text
Post Instagram/TikTok (@csabooks.kids)
       │
       ▼
Sito Web (Rileva la lingua del visitatore e mostra subito i libri corrispondenti)
       │
       ▼
Click su "Acquista su Amazon.it" o "Buy on Amazon" (Marketplace locale con ASIN)
```

---

## ✨ Nuove Funzionalità & Caratteristiche

1. **Accesso Immediato al Catalogo:** Rimossa la hero decorativa superflua: il catalogo dei libri è immediatamente visibile sopra la piega della pagina.
2. **Rilevamento Automatico della Lingua (Locale Detection):**
   - Riconosce automaticamente la lingua del browser (`it` per l'Italia, `en` per tutti gli utenti internazionali).
   - Supporta parametri URL diretti per campagne social (es. `https://sito/?lang=en` o `https://sito/?lang=it`).
   - Supporta il deep linking al singolo libro (es. `https://sito/?book=benny-collina-it` o `?book=benny-hill-en`).
3. **Selettore Lingua Rapido:** Posizionato nell'header fisso per passare istantaneamente tra 🇮🇹 **Italiano** e 🇬🇧 **English**.
4. **Loghi Ufficiali della Collana:**
   - Mostra automaticamente `Logo.ITA.v2.png` per l'edizione italiana e `Logo.ENG.v2.png` per l'edizione inglese.
5. **Account Social Ufficiali:**
   - Instagram: [`@csabooks.kids`](https://www.instagram.com/csabooks.kids)
   - TikTok: [`@csabooks.kids`](https://www.tiktok.com/@csabooks.kids)
6. **Marketplace Amazon Intelligenti:**
   - **Edizione Italiana:** Pulsante diretto `🇮🇹 ACQUISTA SU AMAZON.IT`.
   - **Edizione Inglese:** Menu rapido con i marketplace internazionali (Amazon.com, Amazon.co.uk, Amazon.it, ecc.).

---

## 📁 Struttura Cartelle

```text
/
├── index.html        # Struttura, SEO & OpenGraph per CSA Books 4 Kids
├── style.css         # Design system elegante, professionale e responsive
├── script.js         # Rilevamento locale, i18n dinamico, switch lingua e deep-linking
├── books.js          # Database completo degli 8 volumi (IT ed EN) con ASIN reali
├── README.md         # Documentazione del progetto
└── assets/
    └── construction-site-adventures/
        ├── Logo.ITA.v2.png
        ├── Logo.ENG.v2.png
        ├── 01.Benny.Collina/ (IT / US)
        ├── 02.Rudy.Spiaggia/ (IT / US)
        ├── 03.Leo.Montagna/ (IT / US)
        ├── 04.Bruno.Papere/ (IT / US)
        ├── 05.Benny.Roma/ (IT / US)
        ├── 06.Nina.Conigli/ (IT / US)
        ├── 07.Rino.Ladri/ (IT / US)
        └── 08.Leo.Cinciallegra/ (IT / US)
```

## 🎠 Gestione Automatica Banner Hero (Carousel)

Il banner hero è un carousel dinamico e responsive guidato direttamente dal contenuto della cartella `assets/banner/`.

* **Per aggiungere un banner:** Inserisci una nuova immagine (`.jpg`, `.jpeg`, `.png`, `.webp`) in `assets/banner/`.
* **Per rimuovere un banner:** Elimina il file corrispondente da `assets/banner/`.
* **Ordinamento:** Le slide vengono ordinate automaticamente in ordine alfabetico per nome file. Rinomina i file per stabilire l'ordine desiderato (ad esempio `01.banner.jpg`, `02.benny.jpg`).
* **Testi alternativi (Accessibilità):** Vengono tradotti automaticamente in tutte le 9 lingue supportate in base al nome del personaggio o del file, senza dover modificare il codice.

Dopo aver aggiunto o eliminato un'immagine, basta fare `git commit` e `git push`:
- Un hook pre-commit e la GitHub Action (`.github/workflows/deploy.yml`) aggiornano automaticamente i manifest `banners.json` e `banners.js`.
- In alternativa, è possibile eseguire manualmente `npm run build` o `node scripts/generate-banners.js`.

---

© 2026 **CSA Books 4 Kids** & **Marco Salucci**. Tutti i diritti riservati.
