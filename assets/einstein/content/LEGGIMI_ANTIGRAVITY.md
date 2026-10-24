# Immagini corrette per Antigravity — 24 ottobre 2026

57 immagini: SC-00.png–SC-55.png e EX-01.png, con le corrispondenti versioni .webp.
Un'immagine principale per ciascuna scheda della pagina web.

## File da utilizzare

- 01_WEB: immagini WebP leggere, lato massimo 1600 px, pronte per il sito.
- 02_PNG: immagini selezionate alla risoluzione disponibile, senza ulteriori ritagli; trasparenza conservata. Il soggetto SC-37 proviene dall'asset editoriale approvato, separato dalle altre vignette.
- ABBINAMENTI_SC-XX.csv e .json: corrispondenza esplicita codice/titolo/file, dimensioni, provenienza e verifica dei PNG.
- INDICE_VISIVO.html: aprirlo in un browser per controllare tutte le immagini complete.
- 03_ANTEPRIME: cinque tavole riepilogative.

## Aggiornamento del sito

1. Associare ciascuna scheda al file con lo stesso codice usando il registro allegato. Per esempio: SC-00 = Einstein; SC-01 = polpo; SC-02 = cacatua; SC-04 = orche; SC-15 = pesce sul veicolo; SC-55 = buco nero. Evitare abbinamenti basati sulla posizione o sull'ordine alfabetico dei vecchi file.
2. La numerazione è quella finale V6, coerente con FONTI_PDF/SC-XX.pdf. Dal vecchio SC-21 in poi diversi codici sono cambiati: consultare vecchio_codice_v5 nel registro. I grandi numeri sono EX-01, senza rinominarli SC-55 o SC-56.
3. Conservare l'immagine intera anche nelle schede e sui dispositivi mobili. Con riquadri ad altezza fissa usare object-fit: contain, object-position: center e uno sfondo bianco per le immagini trasparenti. Con altezza libera usare width: 100%; height: auto. Evitare object-fit: cover, background-size: cover e ritagli automatici del servizio immagini.
4. Lasciare il badge SC-XX fuori dalla superficie dell'immagine, per non coprire dettagli.
5. Per SC-55 mostrare il credito: EHT Collaboration / ESO (2019), CC BY 4.0. È l'immagine ufficiale del buco nero; le altre immagini sono illustrazioni ricostruttive del libro.

Esempio per riquadri uniformi:

```css
.card-image { height: 240px; padding: 10px; background: #fff; }
.card-image img { display: block; width: 100%; height: 100%; object-fit: contain; object-position: center; }
```

Il pacchetto ANTIGRAVITY_IMMAGINI_WEB.zip contiene WebP, registri, istruzioni e anteprime.
ORIGINALI_SC-XX_PNG.zip contiene i PNG, gli stessi registri e queste istruzioni.
Nessuna modifica al sito è stata eseguita in questa consegna.
