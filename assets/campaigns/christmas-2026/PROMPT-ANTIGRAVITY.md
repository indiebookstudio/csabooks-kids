# CSA Books Kids — Hero Natale 2026

Lavora sul progetto esistente, soltanto in locale. Nessun push, deploy o modifica al sito pubblicato. Realizza una campagna natalizia orientata alle vendite con queste grafiche definitive e le copertine originali fornite.

## Materiali

Cartella sorgente completa:
`C:\Users\Marco\Documents\Codex\2026-11-02\referenced-chatgpt-conversation-this-is-an\outputs\natale-2026`

Leggi `manifest.json`: contiene le associazioni di lingua, i prodotti ammessi, i percorsi delle copertine e le provenienze originali. `backgrounds/` contiene quattro scene, ciascuna nelle versioni desktop e mobile. `covers/` contiene 26 copertine originali. `copy.json` contiene i testi commerciali di base in italiano, inglese e francese. `PROMPT-IMMAGINI.txt` documenta i riferimenti e i prompt imagegen usati.

Copia gli asset nel progetto, ad esempio sotto `assets/campaigns/christmas-2026/`, preservando nomi e organizzazione. Il sito non deve dipendere dal percorso esterno. Non rigenerare le immagini e non alterare le copertine. Mantieni semplice la sostituzione futura dei file. Eventuali versioni ottimizzate devono conservare i master PNG.

## Home e pagina Cantiere

Prima inventaria tutte le slide dell'attuale hero della home, immagini, testi, link e traduzioni. Trasferisci quel carosello e tutti i suoi contenuti nell'hero della pagina dedicata al Cantiere. Non cancellarli, non perdere collegamenti o traduzioni e non duplicare due hero nella stessa pagina. Se la pagina ha già un hero, integrali ordinatamente nel suo carosello.

Nella home sostituisci il vecchio carosello con il nuovo hero Natale 2026. Lo stile deve essere editoriale, luminoso e curato, con personaggi e libri ben riconoscibili: l'obiettivo è accompagnare all'acquisto, senza sovraccaricare la scena.

## Selezione delle slide e lingue: regola vincolante

ITALIANO: ordine raccolte volumi 1 e 2, Einstein, collana Cantiere (9 episodi), Fano.
INGLESE: Einstein inglese, collana Cantiere inglese (8 episodi).
FRANCESE: Einstein francese, collana Cantiere francese (3 episodi).
TEDESCO, SPAGNOLO, OLANDESE, POLACCO, SVEDESE, GIAPPONESE: stessa selezione di prodotti INGLESI, ma interfaccia e testi promozionali nella lingua scelta dal visitatore. Aggiungi un'etichetta tradotta e ben visibile equivalente a “Libro in inglese” o “Libri in inglese”.

Normalizza i codici usati dal progetto: SE/sv, JP/ja, ENG/en, ITA/it, ecc. Mantieni distinti lingua dell'interfaccia, lingua del libro e marketplace Amazon. I titoli delle copertine originali non si traducono artificialmente. Volumi 1 e 2 e Fano sono promossi solo in italiano finché il proprietario non conferma nuove edizioni pubblicate. Non presumere disponibilità dall'esistenza di file locali.

La collana mostra esclusivamente episodi 1–9 in IT, 1–8 in EN e 1–3 in FR. NON promuovere l'episodio 10 natalizio, trovato fra i materiali ma non dichiarato pubblicato. NON aggiungere la collana scolastica a questa campagna.

Quando cambia la lingua, ricostruisci subito l'elenco delle slide, resetta un indice non più valido e aggiorna copertine, conteggi, CTA, etichette e destinazioni. Nessuna slide italiana deve lampeggiare prima della selezione definitiva. Genera navigazione e indicatori dal numero effettivo di slide.

## Composizione: tre livelli separati

1. Scena natalizia: scegli `*-desktop.png` o `*-mobile.png` tramite picture/media query. Desktop ultra panoramico 3:1, mobile verticale 4:5. Conserva i personaggi e non stirare le immagini. Scegli dimensioni dell'hero adatte ai file, senza ritagli aggressivi.
2. Copertine reali come elementi immagine HTML separati e proporzionati, senza deformare o ritagliare titoli. Devono essere leggibili e non coprire i volti. Desktop: testo nella zona sinistra, scena a destra; copertine sotto il testo oppure in una fascia dedicata nel basso dell'hero. Mobile: testo nella zona alta libera e copertine in una fascia separata sotto la scena, se sovrapporle coprirebbe i personaggi. Non sacrificare la leggibilità per mantenere un'altezza fissa.
3. Tutti i testi, badge e pulsanti in HTML accessibile, mai impressi sulle immagini. Usa `copy.json` come base, adatta gli a capo e traduci completamente ogni campo per tutte le lingue del sito.

Raccolte: mostra entrambe le copertine, con due CTA reali “Volume 1 su Amazon” e “Volume 2 su Amazon”, oltre all'eventuale link informativo alle raccolte. Non inventare un prodotto unico o un cofanetto acquistabile.
Einstein: una copertina della lingua corretta e una CTA diretta ad Amazon.
Collana: una selezione ordinata delle prime tre copertine della lingua corretta (tutte e tre in francese); il testo comunica il totale 9/8/3. CTA alla sezione dei libri acquistabili già filtrata per collana e lingua, da cui ogni titolo porta ad Amazon. Evita di stipare nove miniature nell'hero.
Fano: copertina italiana e CTA diretta ad Amazon.

Non aggiungere selettori di formato, prezzi, sconti, recensioni o promesse di consegna non verificati. I link di acquisto devono puntare all'edizione paperback già registrata nel progetto, sul marketplace pertinente quando disponibile. Per mercati senza collegamento affidabile usa la destinazione esistente verificata: non costruire ASIN o URL fittizi. Segnala gli eventuali link mancanti prima di considerare completata una slide.

## Carosello e accessibilità

Usa controlli precedenti/successivi, indicatori cliccabili e pausa accessibili e tradotti. Se attivi la rotazione automatica, lascia almeno 8 secondi, interrompila su hover/focus e interazione e rispetta prefers-reduced-motion. Nessun cambio automatico mentre si usa la tastiera. Le slide nascoste non devono avere CTA raggiungibili con Tab. Supporta swipe senza impedire lo scorrimento verticale. Mantieni altezza stabile per evitare salti; contrasto del testo sufficiente, anche con un velo CSS leggero limitato alla sua area. Evita effetti rumorosi, neve animata e countdown inventati.

Carica prioritariamente soltanto la prima immagine effettivamente visibile nella lingua scelta; evita di scaricare tutti i file desktop e mobile. Dichiara dimensioni e usa caricamento differito per le slide successive. Conserva le immagini dei personaggi originali e non introdurre altre librerie se il progetto ha già un carosello adatto.

## Gestione campagna

Centralizza asset, testi, disponibilità, ordine, collegamenti e attivazione in una configurazione modificabile. Identifica esplicitamente la campagna come Natale 2026. Prevedi un interruttore di disattivazione e un hero ordinario di ripristino: la campagna non deve restare natalizia per sempre. Non inventare una data finale pubblica: rendila configurabile. Il vecchio hero trasferito al Cantiere deve rimanere disponibile indipendentemente dall'attivazione della campagna.

## Protezione e verifiche obbligatorie

Preserva barra superiore, selettore lingua, navigazione, modifiche locali dell'utente e tutti gli URL permanenti dei QR code, pagine bonus e microsito Otto. Prima di terminare avvia il sito e prova realmente:

- Tutte le 9 lingue disponibili, inclusi DE/ES/NL/PL/SE/JP con libri inglesi e messaggi tradotti.
- Sequenze di 4 slide in IT e 2 nelle altre lingue; cambio di lingua mentre è aperta l'ultima slide italiana.
- Conteggi 9/8/3, copertine corrette e assenza dei titoli non pubblicati.
- Ogni CTA, freccia, indicatore, pausa, swipe, focus e selettore lingua.
- Desktop 1440 e 1920 px, tablet, telefoni 390 e 320 px; testi lunghi in tedesco e giapponese.
- Nessun volto o titolo tagliato, nessuna sovrapposizione, nessun overflow o salto durante il caricamento.
- Hero Cantiere con tutte le immagini precedenti, relativi testi e link.
- Build e controlli già presenti, console e risorse mancanti.

Consegna link locale, screenshot desktop/mobile di IT/EN/FR e una lingua con libri inglesi, elenco dei file modificati, posizione della configurazione e resoconto delle prove realmente eseguite. Non dichiarare verificato ciò che non hai provato. Lascia tutto in locale per la revisione del proprietario.
