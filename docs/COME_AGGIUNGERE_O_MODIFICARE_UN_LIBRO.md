# Come Aggiungere o Modificare un Libro — Guida Pratica

Questa guida spiega come gestire le copertine, le pagine interne, le edizioni linguistiche e i nuovi libri di **CSA Books Kids** in modo semplicissimo, **senza dover modificare codice HTML, CSS o JavaScript**.

---

## 1. Come sostituire la copertina di un libro

Ogni libro ha una cartella dedicata all'interno di `books/`, suddivisa per codice lingua (`it`, `en`, `fr`, `es`, ecc.).

### Esempio: Sostituire la copertina italiana di *Einstein, questa te la sei persa!*
1. Prepara la nuova immagine in formato `.png` (o `.webp` / `.jpg`).
2. Rinominala esattamente:
   ```
   cover.png
   ```
3. Copiala dentro la cartella:
   ```
   books/einstein/it/cover.png
   ```
4. **Fatto!** Ricarica il browser. Il sito caricherà automaticamente la nuova copertina. Non serve toccare alcuna riga di codice.

### Esempio: Sostituire la copertina di *Le Avventure del Cantiere — Raccolta Vol. 1*
- Salva il file in:
  ```
  books/csa-vol1/it/cover.png
  ```

---

## 2. Come modificare o sostituire le pagine interne dell'anteprima sfogliabile

Le pagine dell'anteprima si trovano nella cartella `interiors/` della lingua corrispondente.

### Esempio: Cambiare la 3ª pagina dell'anteprima di Einstein in italiano
1. Prepara l'immagine della pagina.
2. Rinominala:
   ```
   03.png
   ```
3. Sostituisci il file in:
   ```
   books/einstein/it/interiors/03.png
   ```
4. Ricarica la pagina nel browser: l'anteprima mostrerà subito la nuova pagina.

### Come aggiungere una nuova pagina interna
1. Assegna al file il numero d'ordine a due cifre successivo (es. `04.png`, `05.png`, `06.png`).
2. Posizionalo nella cartella `interiors/`.
3. Esegui il comando di build per aggiornare il conteggio automatico:
   ```bash
   npm run build
   ```

---

## 3. Come aggiungere una traduzione / lingua a un libro esistente

Se un libro viene pubblicato in una nuova lingua (ad esempio *Einstein* in spagnolo `es` o tedesco `de`):

1. Crea la cartella della lingua dentro il libro, ad esempio:
   ```
   books/einstein/es/
   books/einstein/es/interiors/
   ```
2. Inserisci la copertina:
   ```
   books/einstein/es/cover.png
   ```
3. Inserisci le pagine interne:
   ```
   books/einstein/es/interiors/01.png
   books/einstein/es/interiors/02.png
   ...
   ```
4. Apri il file centrale `data/books.json` e aggiungi la lingua nell'array `editions` del libro con il relativo link o ASIN Amazon paperback verificato.
5. Esegui:
   ```bash
   npm run build
   ```

---

## 4. Come aggiungere un nuovo libro al catalogo

Per aggiungere un'opera completamente nuova (es. un nuovo volume di *Scienza e curiosità* o *Per la scuola*):

### Passo 1: Crea la cartella multimediale in `books/`
Crea una cartella con l'identificativo del libro, ad esempio `books/nuovo-libro/it/`:
```
books/nuovo-libro/
  └── it/
      ├── cover.png
      └── interiors/
          ├── 01.png
          ├── 02.png
          └── 03.png
```

### Passo 2: Aggiungi la scheda dati in `data/books.json`
Apri `data/books.json` e aggiungi il blocco del nuovo libro:

```json
{
  "id": "nuovo-libro",
  "category": "scienza",
  "title": {
    "it": "Titolo del nuovo libro",
    "en": "Title of the new book"
  },
  "author": "Clara Musicco",
  "age": "7–12",
  "featured": false,
  "editions": {
    "it": {
      "title": "Titolo del nuovo libro",
      "available": true,
      "amazon": {
        "it": "https://www.amazon.it/dp/B0XXXXXXXX"
      }
    }
  },
  "pitch": {
    "it": "Una breve frase che incuriosisce genitori ed educatori."
  },
  "benefits": {
    "it": [
      "Storie vere e verificate dalla scienza",
      "Illustrazioni ricche di dettagli",
      "Attività e curiosità per approfondire"
    ]
  }
}
```

### Passo 3: Aggiorna il manifest
Esegui da terminale:
```bash
npm run build
```
Il libro apparirà immediatamente nel catalogo e nei filtri di categoria ed età!

---

## 5. Come impostare il link Amazon (solo copertina flessibile)

**Regola commerciale:** sul sito si propone **esclusivamente l'edizione paperback (copertina flessibile)**.
Non inserire prezzi e non creare opzioni per Kindle o copertina rigida.

Nel file `data/books.json`:
- Se possiedi l'ASIN o l'URL Amazon:
  ```json
  "amazon": {
    "it": "B0HN4QMLV1",
    "com": "B0HN4QMLV1",
    "de": "B0HN4QMLV1",
    "fr": "B0HN4QMLV1",
    "es": "B0HN4QMLV1"
  }
  ```
- Se per un'edizione il link non è ancora verificato:
  Imposta `"available": false` o lascia l'oggetto `"amazon": {}`.
  Il sito mostrerà automaticamente il badge **«Disponibile a breve su Amazon»**, senza mai creare link fittizi o ingannevoli.

---

## 6. Come mettere un libro in primo piano nella Homepage

In `data/books.json`, aggiungi o imposta `"featured": true` (oppure inserisci il suo `id` nell'elenco `featuredBookIds` all'inizio del file):

```json
"featuredBookIds": [
  "einstein",
  "csa-vol1",
  "csa-vol2"
]
```

La Homepage aggiornerà all'istante la vetrina dei libri in evidenza.
