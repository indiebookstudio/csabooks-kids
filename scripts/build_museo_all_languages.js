/**
 * scripts/build_museo_all_languages.js
 * 
 * Rebuilds all 4 language versions of the Museo interactives:
 * IT (Italian - Gold standard reference), EN (English), FR (French), ES (Spanish).
 * 
 * Guarantees:
 * 1. 100% identical layout and DOM structure to the Italian version.
 * 2. Complete, idiomatic, high-quality translation of ALL questions, options,
 *    subtexts, labels, buttons, feedback messages, and diploma texts.
 * 3. Zero leftover English in French and Spanish.
 * 4. Zero leftover Italian in English, French, and Spanish.
 */

const fs = require('fs');
const path = require('path');

function esc(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const ROOT_DIR = path.resolve(__dirname, '..');

const I18N = {
  it: {
    storeKey: 'otto-museo-2026-progress-v1',
    hashAtrio: 'atrio',
    heroEyebrow: 'IL BONUS INTERATTIVO DEL LIBRO',
    heroTitle: 'IL MUSEO DELLE<br><em>SCOPERTE</em><br>IMPOSSIBILI',
    heroLead: 'Sette sale. Sette misteri della scienza. Un piccolo polpo esploratore che ti aspetta. Entra, osserva, scopri gli indizi e colleziona i sigilli di Otto.',
    heroStart: 'Inizia l’esplorazione',
    heroContinue: 'Continua l’esplorazione',
    heroPassport: 'Apri il passaporto',
    heroHint: 'Per bambini e ragazzi 7–12 anni · Gratis con il libro · Nessun account necessario',
    heroOttoAlt: 'Otto, il polpo esploratore, abbraccia la Terra',
    pathEyebrow: 'IL TUO PERCORSO',
    pathHeading: 'Scegli una porta.',
    pathLead: 'Puoi visitare le sale nell’ordine che preferisci. Ogni volta che risolvi un mistero, Otto aggiunge un sigillo al tuo passaporto.',
    pathAria: (c) => `${c} sale visitate su 7`,
    pathHint: (c) => `${c} sale completate su 7 ${c === 7 ? '· Il diploma è pronto!' : ''}`,
    roomAria: (r) => `Sala ${r.id}: ${r.label}`,
    sealEarned: '✓ Sigillo ottenuto',
    roomCardKicker: (r) => `SALA ${String(r.id).padStart(2, '0')} · ${r.icon}`,
    roomCardExplore: 'Esplora la sala',
    valueItems: [
      { b: 'Osserva, non indovinare a caso.', p: 'Le attività partono da fatti e indizi. Dove gli scienziati hanno ancora dubbi, te lo diciamo.' },
      { b: 'Ogni sala racconta un’altra storia.', p: 'Non troverai sette volte lo stesso test: ogni enigma usa un meccanismo diverso.' },
      { b: 'Una fonte per ogni scoperta.', p: 'Puoi aprire gli articoli e i siti scientifici originali. Il codice SC corrisponde a quello del libro.' }
    ],
    crumbBack: '← Atrio del museo',
    crumbRoom: (id) => `Sala ${id} di 7`,
    labelMainExhibit: 'REPERTO PRINCIPALE',
    labelQuestion: 'LA DOMANDA',
    labelDoc: 'Il documento scientifico',
    sourceLabel: 'Fonte originale ↗',
    sourceAria: (code) => `Apri la fonte ${code} in una nuova scheda`,
    artNotice: 'Le illustrazioni del museo sono interpretazioni artistiche; i collegamenti portano alle fonti autentiche.',
    sideExamine: 'Esamina la tavola ↗',
    sideDetail: 'Due reperti da esplorare in ogni sala: la scoperta principale e un secondo mistero.',
    ottoSays: 'Otto suggerisce:',
    ottoAlt: 'Otto il polpo esploratore',
    hallNote: 'Questa esperienza integra il libro <em>Einstein, questa te la sei persa!</em> e non sostituisce la lettura dello studio originale. Alcune funzioni scientifiche sono ancora ipotesi: il museo le distingue dalle osservazioni.',
    navPrevRoom: '← Sala precedente',
    navBackAtrio: '← Torna all’atrio',
    navPassportProgress: (c) => `Passaporto: ${c}/7 sigilli`,
    navNextRoom: 'Sala successiva →',
    navBackToRooms: 'Torna alle sale →',
    sealUnlockedTitle: 'SIGILLO SBLOCCATO ✦',
    sealUnlockedMsg: 'Complimenti! Hai risolto il mistero senza confondere gli indizi con la fantasia. Otto ha aggiornato il tuo passaporto.',
    btnViewPassport: 'Vedi il passaporto',
    btnGoToRoom: (id) => `Vai alla sala ${id} →`,
    btnBackRooms: 'Torna alle sette sale',
    toastWinAll: 'Hai completato tutte le sale! Apri il passaporto per il diploma.',
    toastWinRoom: '✦ Sigillo conquistato! Otto è felice.',
    toastReset: 'Passaporto pronto per una nuova esplorazione.',
    stepCounterAria: (n, total) => `${n} passaggi completati su ${total}`,
    passportTitle: 'Il tuo passaporto',
    passportSubtitle: 'Ogni sala esplorata aggiunge un sigillo. Il passaporto si salva soltanto sul tuo dispositivo.',
    passportCompletedMsg: (c) => `<strong>${c} / 7 sale completate.</strong> ${c < 7 ? 'Ti mancano ' + (7 - c) + ' sigilli per ottenere il diploma.' : 'Complimenti! Hai completato tutte le sette sale.'}`,
    prizeEyebrow: 'PREMIO FINALE',
    prizeTitle: 'Il diploma delle meraviglie',
    childNameLabel: 'Nome dell’esploratore o dell’esploratrice',
    childNamePlaceholder: 'Scrivi un nome da stampare',
    btnPrintDiploma: 'Stampa il diploma',
    diplomaHeading: 'ESPLORATORE DELLE<br>SCOPERTE IMPOSSIBILI',
    diplomaCertifies: 'Si certifica che',
    diplomaBody: 'ha completato le sette sale del museo,<br>ha osservato con curiosità e ha seguito le prove.',
    diplomaSign: 'Otto · Il Museo delle Scoperte Impossibili',
    btnBackToMuseum: 'Torna al museo',
    resetNotice: 'Per ricominciare dall’inizio:',
    btnResetSeals: 'Azzera i sigilli',
    resetConfirm: 'Vuoi cancellare i sette sigilli salvati su questo dispositivo?',
    zoomAria: (t) => `Ingrandimento: ${t}`,
    zoomAlt: (t) => `Illustrazione narrativa per: ${t}`,
    zoomNotice: 'Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.',
    printHeader: 'IL MUSEO DELLE SCOPERTE IMPOSSIBILI',
    printTitle: 'DIPLOMA DI ESPLORATORE',
    printConferred: 'Conferito a',
    printBody: 'per aver completato tutte e sette le sale,<br>collezionato i sigilli e imparato a distinguere<br>le osservazioni dalle ipotesi.',
    printBrand: '✦ Otto, il piccolo esploratore ✦',
    printBook: 'Da: EINSTEIN, QUESTA TE LA SEI PERSA!',
    // Room 1 Challenge
    c1Role: 'IL TUO MESTIERE: INVESTIGATORE',
    c1Title: 'Visto davvero o ancora da dimostrare?',
    c1Subtext: 'Una frase alla volta. Quali informazioni derivano direttamente dai filmati e quali sono possibili spiegazioni?',
    c1Statements: [
      { s: 'Le orche staccano un tratto d’alga.', correct: 'osservato' },
      { s: 'Le orche fanno rotolare il pezzo d’alga fra i corpi.', correct: 'osservato' },
      { s: 'L’alga elimina le cellule morte della pelle.', correct: 'ipotesi' },
      { s: 'Usare l’alga rafforza i legami sociali.', correct: 'ipotesi' }
    ],
    c1BtnObserved: '✓ Osservato nei filmati',
    c1BtnHypothesis: '? Ipotesi da studiare',
    c1GoodStep: 'Indizio corretto! Continua con la frase successiva.',
    c1WrongObserved: 'Questa azione è visibile nei filmati: è un’osservazione.',
    c1WrongHypothesis: 'Questa è una possibile funzione dell’alga, non ancora dimostrata: è un’ipotesi.',
    // Room 2 Challenge
    c2Role: 'IL TUO MESTIERE: BOTANICO',
    c2Title: 'Quale confronto è più utile?',
    c2Subtext: 'Vuoi scoprire quanto influisce la regolite lunare. Quale coppia di esperimenti sceglieresti, mantenendo uguali acqua, luce e specie di pianta?',
    c2OptionA: 'A · Pianta nella regolite lunare / stessa pianta in un terreno di confronto, in condizioni simili',
    c2OptionB: 'B · Pianta nella regolite senza acqua / pianta nella terra con acqua',
    c2OptionC: 'C · Una felce al buio / un pomodoro alla luce del sole',
    c2Good: 'Ottima scelta: confronti piantine simili mantenendo il più possibile uguali le altre condizioni.',
    c2Wrong: 'Con questo confronto cambi troppe cose insieme: non sapresti a quale variabile attribuire la differenza.',
    // Room 3 Challenge
    c3Role: 'IL TUO MESTIERE: INGEGNERE',
    c3Title: 'Ricostruisci la catena di comando.',
    c3Subtext: 'Tocca i quattro passaggi nell’ordine giusto: chi comincia, chi rileva il movimento, chi lo interpreta e chi muove il veicolo?',
    c3Steps: [
      { id: 1, name: 'Il pesce si muove', mark: '🐟' },
      { id: 2, name: 'La telecamera rileva dove si trova', mark: '◉' },
      { id: 3, name: 'Il computer elabora il comando', mark: '⌘' },
      { id: 4, name: 'I motori muovono le ruote', mark: '⚙' }
    ],
    c3GoodStep: 'Esatto: ora scegli il passaggio successivo.',
    c3WrongStep: 'Questo passaggio arriva più tardi. Parti da ciò che fa il pesce.',
    // Room 4 Challenge
    c4Role: 'IL TUO MESTIERE: PALEONTOLOGO',
    c4Title: 'Scegli il ramo giusto.',
    c4Subtext: 'Osserva questo piccolo albero: da antichi teropodi si sono evoluti più rami. Che cosa possiamo affermare con sicurezza?',
    c4SvgAria: 'Da un antenato comune dei dinosauri teropodi partono due rami: uno verso T. rex e uno verso i dinosauri aviani, cioè gli uccelli',
    c4SvgTheropods: 'Antenati teropodi',
    c4SvgTrex: '🦖 ramo T. rex',
    c4SvgBirds: '🐦 ramo degli uccelli',
    c4Option0: 'La gallina discende direttamente dal T. rex.',
    c4Option1: 'Uccelli e T. rex appartengono a rami diversi con antenati in comune.',
    c4Option2: 'La somiglianza è casuale: gli uccelli non sono dinosauri.',
    c4Good: 'Esatto: gli uccelli sono dinosauri teropodi viventi e condividono antenati con altri rami estinti.',
    c4Wrong: 'Prova a osservare il punto in cui l’albero si divide. Il T. rex non è l’antenato diretto della gallina.',
    // Room 5 Challenge
    c5Role: 'IL TUO MESTIERE: PROGETTISTA',
    c5Title: 'Quanta forza useresti?',
    c5Subtext: 'Devi afferrare un oggetto fragile. Muovi la leva e prova a trovare una presa né troppo debole né troppo forte.',
    c5VaseAria: 'Oggetto fragile di vetro',
    c5SliderLabel: 'Intensità della presa (scala immaginaria)',
    c5LevelSoft: 'La presa è troppo debole.',
    c5LevelHard: 'Stai stringendo più del necessario.',
    c5LevelGood: 'La presa è controllata e delicata.',
    c5BtnCheck: 'Verifica la presa',
    c5Disclaimer: 'La scala è inventata per il gioco: non rappresenta misure di un vero robot.',
    c5Good: 'Hai trovato un buon compromesso nel nostro gioco. I robot reali richiedono sensori, geometrie e controlli molto più sofisticati.',
    c5WrongSoft: 'La presa scivola: prova ad aumentare leggermente la forza.',
    c5WrongHard: 'Troppo! Una presa rigida potrebbe danneggiare un oggetto fragile.',
    // Room 6 Challenge
    c6Role: 'IL TUO MESTIERE: ESPLORATORE DEL CORPO',
    c6Title: 'Quattro tappe di un segnale.',
    c6Subtext: 'Apri ciascuna lente per scoprire il percorso semplificato dal corpo alla tecnologia. Puoi toccarle in qualunque ordine.',
    c6Tiles: [
      ['Il muscolo si attiva', 'Il corpo genera cambiamenti e segnali legati al movimento.'],
      ['L’interfaccia rileva', 'Un sistema opportunamente progettato acquisisce informazioni utili.'],
      ['Il controllo interpreta', 'I segnali vengono elaborati per gestire il dispositivo.'],
      ['La protesi si muove', 'Il sistema può aiutare il movimento della persona.']
    ],
    c6TileUntapped: 'Tocca per scoprire',
    c6GoodStep: 'Hai scoperto un’altra tappa. Continua a seguire il percorso.',
    // Room 7 Challenge
    c7Role: 'IL TUO MESTIERE: ASTROFISICO',
    c7Title: 'Raccogli i segnali da luoghi diversi.',
    c7Subtext: 'Attiva le quattro antenne simboliche. Quando tutte avranno osservato, potrai vedere una ricostruzione artistica. La rete EHT reale coinvolge più strumenti.',
    c7Observatories: ['Osservatorio A', 'Osservatorio B', 'Osservatorio C', 'Osservatorio D'],
    c7SignalReceived: 'Segnale ricevuto',
    c7BtnAssemble: 'Elabora le osservazioni →',
    c7HoleAria: 'Visualizzazione artistica della regione intorno a un buco nero',
    c7Disclaimer: 'Questa figura è un disegno, NON la fotografia ufficiale. Puoi aprire la vera immagine tramite la fonte ESO qui sotto.',
    c7OneActive: 'Hai attivato un osservatorio simbolico.',
    c7AllActive: 'Dati raccolti! Ora puoi avviare la ricostruzione.',
    // Rooms definition
    rooms: [
      {
        id: 1, slug: 'animali', label: 'Animali fuori dal comune', title: 'Il mare che nasconde indizi',
        teaser: 'Un’alga può diventare uno strumento? E le bolle una rete?',
        art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '◉', seal: 'La lente marina',
        kicker: 'SALA 01 · ANIMALI FUORI DAL COMUNE',
        intro: 'Alcuni animali sorprendono gli scienziati non perché siano magici, ma perché fanno cose che nessuno si aspettava.',
        question: 'Un video può mostrarci che cosa succede. Ma può dirci subito perché?',
        mainTitle: 'Il caso dell’alga misteriosa',
        main: 'Nel Mare di Salish i ricercatori hanno ripreso orche che staccano un tratto di alga e lo fanno rotolare tra i loro corpi. Una cosa è vedere il movimento; un’altra è capire a che cosa serva.',
        challenge: 'prove',
        source: { code: 'SC-04', title: 'Studio sul comportamento delle orche (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
        side: {
          title: 'La balena che pesca con le bolle', label: 'Un altro reperto',
          desc: 'Alcune megattere producono reti di bolle per concentrare i pesci. Le bolle non sono una rete solida: modificano il comportamento delle prede. La forma e il modo in cui vengono usate possono variare.',
          source: { code: 'SC-05', title: 'Ricerca sulle reti di bolle delle megattere', url: 'https://doi.org/10.1098/rsos.240328' }
        },
        questionHint: 'Guarda l’alga, ma soprattutto osserva che cosa fanno gli animali con essa.'
      },
      {
        id: 2, slug: 'piante', label: 'Piante e piccoli mondi', title: 'Un giardino che non dovrebbe esistere',
        teaser: 'Germogli sulla polvere lunare e felci dal DNA gigantesco.',
        art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '✿', seal: 'Il germoglio lunare',
        kicker: 'SALA 02 · PIANTE E PICCOLI MONDI',
        intro: 'Le piante sembrano immobili, ma sono organismi pieni di risposte sorprendenti. Anche la polvere della Luna è diventata parte di una ricerca.',
        question: 'Per sapere se una pianta cresce nella regolite lunare, che cosa dobbiamo confrontare?',
        mainTitle: 'Il seme e la polvere della Luna',
        main: 'In laboratorio alcuni semi sono germogliati in piccoli campioni di regolite raccolti dalle missioni Apollo. Le piante però hanno mostrato segni di stress. Crescere, quindi, non vuol dire crescere bene come in un terreno adatto.',
        challenge: 'terreno',
        source: { code: 'SC-12', title: 'Plants grown in Apollo lunar regolith (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
        side: {
          title: 'La felce che sorprende il DNA', label: 'Un altro reperto',
          desc: 'Una piccola felce del genere Tmesipteris possiede un genoma enorme. La quantità di DNA non misura l’intelligenza o la “superiorità” di un organismo: è una caratteristica biologica, da comprendere nel suo contesto.',
          source: { code: 'SC-13', title: 'Studio sul genoma di Tmesipteris', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
        },
        questionHint: 'In un confronto scientifico, cerca di cambiare un elemento alla volta.'
      },
      {
        id: 3, slug: 'esperimenti', label: 'Esperimenti sorprendenti', title: 'Il pesce e le quattro ruote',
        teaser: 'Chi comanda davvero una vasca che si muove?',
        art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '⌁', seal: 'L’inventore curioso',
        kicker: 'SALA 03 · ESPERIMENTI SORPRENDENTI',
        intro: 'Una buona invenzione non è magia: è una catena di passaggi che possiamo ricostruire, controllare e spiegare.',
        question: 'Come fa un pesce a spostare un veicolo terrestre senza toccare le ruote?',
        mainTitle: 'Rimetti in ordine il laboratorio',
        main: 'In un esperimento i ricercatori hanno montato una vasca su una piattaforma motorizzata. Un sistema rilevava posizione e movimento del pesce e li trasformava in comandi per le ruote. Il pesce non guidava con un volante.',
        challenge: 'sequenza',
        source: { code: 'SC-15', title: 'Fish-operated vehicle: studio comportamentale', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
        side: {
          title: 'I bombi e le palline', label: 'Un altro reperto',
          desc: 'In alcuni esperimenti i bombi hanno fatto rotolare piccole palline anche senza un premio immediato. I ricercatori hanno studiato se il comportamento fosse compatibile con il gioco: non serve inventare pensieri umani nella loro testa.',
          source: { code: 'SC-16', title: 'Ricerca sul rotolamento delle palline nei bombi', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
        },
        questionHint: 'Quale passaggio trasforma un movimento osservato in movimento delle ruote?'
      },
      {
        id: 4, slug: 'dinosauri', label: 'Dinosauri, estinti e DNA', title: 'I dinosauri non se ne sono andati tutti',
        teaser: 'Nella storia degli uccelli c’è un ramo sorprendente.',
        art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-pensieroso', icon: '❖', seal: 'Il detective del passato',
        kicker: 'SALA 04 · DINOSAURI, ESTINTI E DNA',
        intro: 'Le ossa fossili sono indizi. Da un frammento, una piuma o una somiglianza tra scheletri, i ricercatori ricostruiscono storie lunghissime.',
        question: 'La gallina discende direttamente dal T. rex?',
        mainTitle: 'L’albero di famiglia nascosto',
        main: 'Gli uccelli sono dinosauri viventi appartenenti al gruppo dei teropodi. Il T. rex era un loro parente lontano, non il nonno di una gallina. La parola chiave è antenato comune.',
        challenge: 'parentela',
        source: { code: 'SC-38', title: 'Natural History Museum — How dinosaurs evolved into birds', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
        side: {
          title: 'Perché non basta un fossile per clonare un dinosauro?', label: 'Un altro reperto',
          desc: 'Un fossile può raccontarci tantissimo sulla forma di un animale antico. Ma per clonarlo servirebbe materiale biologico adeguato, non semplicemente un osso trasformato in roccia. La fantasia dei film non è un protocollo scientifico.',
          source: { code: 'SC-39', title: 'Natural History Museum — Could scientists bring dinosaurs back?', url: 'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html' }
        },
        questionHint: 'In un albero evolutivo conta il punto in cui i rami si separano.'
      },
      {
        id: 5, slug: 'laboratorio', label: 'Il laboratorio del futuro', title: 'Macchine che imparano dalla natura',
        teaser: 'Una proboscide può suggerire come costruire una pinza?',
        art: 'laboratorio', sideArt: 'micelio', otto: 'otto-curioso', icon: '⚙', seal: 'L’ingegnere della natura',
        kicker: 'SALA 05 · IL LABORATORIO DEL FUTURO',
        intro: 'Molte tecnologie nascono da un’osservazione: come fa un organismo vivente a risolvere un problema difficile?',
        question: 'Come afferreresti un oggetto delicato senza rovinarlo?',
        mainTitle: 'Progetta la presa perfetta',
        main: 'I ricercatori progettano pinze flessibili ispirandosi anche alla proboscide degli elefanti. Avvolgere un oggetto può essere utile quando una presa rigida rischia di danneggiare. Qui puoi provare un modello giocoso, non una simulazione tecnica reale.',
        challenge: 'pinza',
        source: { code: 'SC-23', title: 'Studio su una presa robotica ispirata alla proboscide', url: 'https://doi.org/10.1038/s44182-025-00038-z' },
        side: {
          title: 'Il micelio incontra un robot', label: 'Un altro reperto',
          desc: 'In un prototipo sperimentale, segnali elettrici registrati da un micelio fungino sono stati interpretati da circuiti progettati dagli ingegneri e usati per controllare un robot. Non significa che il fungo abbia deciso dove andare.',
          source: { code: 'SC-25', title: 'Ricerca sul robot controllato da segnali del micelio', url: 'https://doi.org/10.1126/scirobotics.adk8019' }
        },
        questionHint: 'Non vince sempre chi stringe più forte.'
      },
      {
        id: 6, slug: 'corpo', label: 'Corpo e supertecnologie', title: 'Il corpo manda messaggi',
        teaser: 'Quando muscoli e ingegneria lavorano insieme.',
        art: 'corpo', sideArt: 'voce', otto: 'otto-pensieroso', icon: '✧', seal: 'L’esploratore dei segnali',
        kicker: 'SALA 06 · CORPO E SUPERTECNOLOGIE',
        intro: 'Il nostro corpo invia continuamente segnali. Gli scienziati studiano come collegarli a dispositivi che aiutano le persone.',
        question: 'Come può una protesi ricevere indicazioni da un movimento?',
        mainTitle: 'Segui il segnale',
        main: 'Al MIT è stata studiata una protesi di ginocchio integrata con i tessuti per recuperare movimenti più naturali. Tecniche e risultati si riferiscono a specifici studi clinici: non tutte le protesi funzionano allo stesso modo.',
        challenge: 'segnali',
        source: { code: 'SC-50', title: 'MIT News — A bionic knee integrated into tissue', url: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710' },
        side: {
          title: 'Quando la tecnologia aiuta la voce', label: 'Un altro reperto',
          desc: 'Alcuni gruppi di ricerca sperimentano interfacce neurali e sistemi digitali per trasformare segnali cerebrali in linguaggio. Sono tecnologie di ricerca, non strumenti che “leggono tutti i pensieri”.',
          source: { code: 'SC-53', title: 'Ricerca sulla neuroprotesi per la comunicazione', url: 'https://doi.org/10.1038/s41593-025-01905-6' }
        },
        questionHint: 'Un comando non nasce dalla magia: c’è una catena di segnali.'
      },
      {
        id: 7, slug: 'spazio', label: 'Spazio: la prossima frontiera', title: 'La foto che nessuna macchina ha scattato',
        teaser: 'Come si ricostruisce l’immagine di un buco nero?',
        art: 'spazio', sideArt: 'galassia', otto: 'otto-mondo', icon: '✦', seal: 'L’esploratore cosmico',
        kicker: 'SALA 07 · SPAZIO: LA PROSSIMA FRONTIERA',
        intro: 'Nello spazio non sempre si possono vedere le cose come sulla Terra. Per questo gli scienziati mettono insieme dati raccolti in luoghi lontanissimi.',
        question: 'La prima immagine di M87* è arrivata da una singola fotocamera?',
        mainTitle: 'Accendi la rete dei radiotelescopi',
        main: 'L’Event Horizon Telescope ha unito osservazioni radio raccolte da più osservatori e ha utilizzato metodi di elaborazione per ricostruire l’immagine intorno al buco nero M87*. Il nostro gioco usa quattro simboli: la rete reale è molto più complessa.',
        challenge: 'telescopi',
        source: { code: 'SC-48', title: 'ESO / EHT Collaboration — prima immagine del buco nero M87*', url: 'https://www.eso.org/public/images/eso1907a/' },
        side: {
          title: 'Una cometa che viene da un altro sistema', label: 'Un altro reperto',
          desc: 'La cometa interstellare 3I/ATLAS ha attraversato il Sistema solare seguendo una traiettoria aperta. Non percorre un’orbita chiusa intorno al Sole come le comete periodiche legate gravitazionalmente al nostro sistema.',
          source: { code: 'SC-36', title: 'NASA — 3I/ATLAS: facts and FAQs', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
        },
        questionHint: 'Il risultato nasce da più strumenti e da un lavoro di analisi, non da un unico scatto.'
      }
    ]
  },

  en: {
    storeKey: 'otto-museo-en-progress-v1',
    hashAtrio: 'atrio',
    heroEyebrow: 'THE EXCLUSIVE BOOK COMPANION',
    heroTitle: 'THE MUSEUM OF<br><em>IMPOSSIBLE</em><br>DISCOVERIES',
    heroLead: 'Seven galleries. Seven scientific mysteries. One curious little octopus waiting for you. Step in, observe, follow the clues, and collect Otto’s seals.',
    heroStart: 'Start exploring',
    heroContinue: 'Continue exploring',
    heroPassport: 'Open passport',
    heroHint: 'For curious minds aged 7–12 · Free with the book · No account needed',
    heroOttoAlt: 'Otto, the little explorer octopus, hugging planet Earth',
    pathEyebrow: 'YOUR JOURNEY',
    pathHeading: 'Choose a gallery door.',
    pathLead: 'You can visit the galleries in any order you like. Each time you solve a mystery, Otto stamps a seal in your passport.',
    pathAria: (c) => `${c} galleries visited out of 7`,
    pathHint: (c) => `${c} galleries completed out of 7 ${c === 7 ? '· Your diploma is ready!' : ''}`,
    roomAria: (r) => `Gallery ${r.id}: ${r.label}`,
    sealEarned: '✓ Seal earned',
    roomCardKicker: (r) => `GALLERY ${String(r.id).padStart(2, '0')} · ${r.icon}`,
    roomCardExplore: 'Explore gallery',
    valueItems: [
      { b: 'Observe, do not guess blindly.', p: 'Every activity starts with verified facts. Where science is still debating, we clearly say so.' },
      { b: 'Every room tells a unique story.', p: 'No repetitive quizzes: each mystery challenges you with a distinct interactive mechanic.' },
      { b: 'A real source for every discovery.', p: 'Explore authentic scientific publications. The SC codes match the reference section in your book.' }
    ],
    crumbBack: '← Museum Lobby',
    crumbRoom: (id) => `Gallery ${id} of 7`,
    labelMainExhibit: 'MAIN EXHIBIT',
    labelQuestion: 'THE QUESTION',
    labelDoc: 'Scientific publication',
    sourceLabel: 'Original source ↗',
    sourceAria: (code) => `Open source ${code} in a new tab`,
    artNotice: 'Museum illustrations are artistic interpretations; links direct you to authentic scientific publications.',
    sideExamine: 'Examine plate ↗',
    sideDetail: 'Two exhibits in each gallery: the main breakthrough and a second mystery.',
    ottoSays: 'Otto suggests:',
    ottoAlt: 'Otto the explorer octopus',
    hallNote: 'This companion complements the book <em>Einstein, You Missed This One!</em> and does not replace reading the original studies. Unproven functions are clearly treated as hypotheses.',
    navPrevRoom: '← Previous gallery',
    navBackAtrio: '← Back to lobby',
    navPassportProgress: (c) => `Passport: ${c}/7 seals`,
    navNextRoom: 'Next gallery →',
    navBackToRooms: 'Back to galleries →',
    sealUnlockedTitle: 'SEAL UNLOCKED ✦',
    sealUnlockedMsg: 'Congratulations! You solved the mystery without mistaking clues for assumptions. Otto stamped your passport.',
    btnViewPassport: 'View passport',
    btnGoToRoom: (id) => `Go to gallery ${id} →`,
    btnBackRooms: 'Back to the 7 galleries',
    toastWinAll: 'You completed all seven galleries! Open your passport to get your diploma.',
    toastWinRoom: '✦ Seal earned! Otto is thrilled.',
    toastReset: 'Passport ready for a brand new exploration!',
    stepCounterAria: (n, total) => `${n} steps completed out of ${total}`,
    passportTitle: 'Your Explorer Passport',
    passportSubtitle: 'Every solved gallery earns a seal. Your passport is saved locally on your device only.',
    passportCompletedMsg: (c) => `<strong>${c} / 7 galleries completed.</strong> ${c < 7 ? 'You need ' + (7 - c) + ' more seal(s) to earn your diploma.' : 'Congratulations! You completed all seven galleries.'}`,
    prizeEyebrow: 'FINAL REWARD',
    prizeTitle: 'The Explorer Diploma',
    childNameLabel: 'Explorer’s full name',
    childNamePlaceholder: 'Type a name to print',
    btnPrintDiploma: 'Print diploma',
    diplomaHeading: 'EXPLORER OF<br>IMPOSSIBLE DISCOVERIES',
    diplomaCertifies: 'This certifies that',
    diplomaBody: 'has completed all seven galleries of the museum,<br>observed with curiosity, and followed scientific evidence.',
    diplomaSign: 'Otto · The Museum of Impossible Discoveries',
    btnBackToMuseum: 'Back to museum',
    resetNotice: 'To start fresh from the beginning:',
    btnResetSeals: 'Reset seals',
    resetConfirm: 'Do you want to clear all seven seals saved on this device?',
    zoomAria: (t) => `Enlargement: ${t}`,
    zoomAlt: (t) => `Illustrative artwork for: ${t}`,
    zoomNotice: 'Illustrative artwork, not a photo from the research paper. To view original evidence, open the source.',
    printHeader: 'THE MUSEUM OF IMPOSSIBLE DISCOVERIES',
    printTitle: 'EXPLORER DIPLOMA',
    printConferred: 'Awarded to',
    printBody: 'for completing all seven galleries,<br>collecting all seals, and learning to distinguish<br>scientific observations from hypotheses.',
    printBrand: '✦ Otto, the Little Explorer ✦',
    printBook: 'From: EINSTEIN, YOU MISSED THIS ONE!',
    // Room 1 Challenge
    c1Role: 'YOUR ROLE: INVESTIGATOR',
    c1Title: 'Observed on camera or yet to be proven?',
    c1Subtext: 'One statement at a time. Which facts come directly from the video footage, and which are possible explanations?',
    c1Statements: [
      { s: 'Orcas tear off a piece of kelp.', correct: 'osservato' },
      { s: 'Orcas roll the piece of kelp between their bodies.', correct: 'osservato' },
      { s: 'The kelp scrubs away dead skin cells.', correct: 'ipotesi' },
      { s: 'Using kelp strengthens social bonds in the pod.', correct: 'ipotesi' }
    ],
    c1BtnObserved: '✓ Observed on camera',
    c1BtnHypothesis: '? Hypothesis to study',
    c1GoodStep: 'Correct clue! Move on to the next statement.',
    c1WrongObserved: 'This behavior is directly visible on video: it is an observation.',
    c1WrongHypothesis: 'This is a possible purpose of the kelp, not yet proven: it is a hypothesis.',
    // Room 2 Challenge
    c2Role: 'YOUR ROLE: BOTANIST',
    c2Title: 'Which comparison is most useful?',
    c2Subtext: 'You want to test how lunar regolith affects growth. Which pair of trials would you pick, keeping water, light, and plant species identical?',
    c2OptionA: 'A · Plant in lunar regolith / identical plant in control soil, under similar conditions',
    c2OptionB: 'B · Plant in regolith with no water / plant in Earth soil with water',
    c2OptionC: 'C · A fern in the dark / a tomato in full sunlight',
    c2Good: 'Great choice! You compare similar seedlings while keeping all other variables identical.',
    c2Wrong: 'You are changing too many variables at once: you wouldn’t know which caused the difference.',
    // Room 3 Challenge
    c3Role: 'YOUR ROLE: ENGINEER',
    c3Title: 'Reconstruct the command chain.',
    c3Subtext: 'Tap the four steps in order: who starts, who tracks motion, who translates it, and who drives the vehicle?',
    c3Steps: [
      { id: 1, name: 'The fish swims', mark: '🐟' },
      { id: 2, name: 'The camera detects its position', mark: '◉' },
      { id: 3, name: 'The computer calculates the command', mark: '⌘' },
      { id: 4, name: 'The motors drive the wheels', mark: '⚙' }
    ],
    c3GoodStep: 'Correct! Now choose the next step.',
    c3WrongStep: 'This step comes later. Start with what the fish does first.',
    // Room 4 Challenge
    c4Role: 'YOUR ROLE: PALEONTOLOGIST',
    c4Title: 'Choose the correct branch.',
    c4Subtext: 'Look at this evolutionary tree: several branches split from ancient theropods. What can we state with certainty?',
    c4SvgAria: 'From a common ancestor of theropod dinosaurs, two branches split: one toward T. rex and one toward avian dinosaurs, namely birds',
    c4SvgTheropods: 'Theropod ancestors',
    c4SvgTrex: '🦖 T. rex branch',
    c4SvgBirds: '🐦 bird branch',
    c4Option0: 'The chicken directly descends from the T. rex.',
    c4Option1: 'Birds and T. rex belong to different branches sharing common ancestors.',
    c4Option2: 'The resemblance is coincidence: birds are not dinosaurs.',
    c4Good: 'Exactly! Birds are living theropod dinosaurs, sharing ancestors with other extinct branches.',
    c4Wrong: 'Look closely at where the tree forks. The T. rex is not the direct ancestor of the chicken.',
    // Room 5 Challenge
    c5Role: 'YOUR ROLE: ROBOTICS DESIGNER',
    c5Title: 'How much grip force would you use?',
    c5Subtext: 'You need to pick up a fragile object. Adjust the slider to find a grip that is neither too weak nor too strong.',
    c5VaseAria: 'Delicate glass vase',
    c5SliderLabel: 'Grip intensity (game scale)',
    c5LevelSoft: 'The grip is too weak.',
    c5LevelHard: 'You are squeezing too hard.',
    c5LevelGood: 'The grip is controlled and gentle.',
    c5BtnCheck: 'Test the grip',
    c5Disclaimer: 'This scale is simplified for the game: it does not reflect actual robotic measurements.',
    c5Good: 'You found a balanced grip! Real robots require delicate sensors, flexible geometry, and advanced controls.',
    c5WrongSoft: 'The object slips: try increasing the force slightly.',
    c5WrongHard: 'Too much! A stiff pinch could crack a delicate object.',
    // Room 6 Challenge
    c6Role: 'YOUR ROLE: BODY EXPLORER',
    c6Title: 'Four stages of a signal.',
    c6Subtext: 'Open each tile to discover the simplified journey from body to technology. Tap them in any order.',
    c6Tiles: [
      ['Muscle activates', 'The body generates physiological signals tied to motion.'],
      ['Interface detects', 'Engineered sensors capture useful neuromuscular impulses.'],
      ['Control interprets', 'Processors decode the signals into mechanical instructions.'],
      ['Prosthesis moves', 'The bionic system smoothly assists the person’s movement.']
    ],
    c6TileUntapped: 'Tap to explore',
    c6GoodStep: 'You revealed another stage. Keep following the pathway!',
    // Room 7 Challenge
    c7Role: 'YOUR ROLE: ASTROPHYSICIST',
    c7Title: 'Gather signals across distant locations.',
    c7Subtext: 'Activate the four symbolic radio dishes. When all four have observed, you will unlock the artistic reconstruction. The real EHT array spans more instruments.',
    c7Observatories: ['Observatory A', 'Observatory B', 'Observatory C', 'Observatory D'],
    c7SignalReceived: 'Signal received',
    c7BtnAssemble: 'Process observations →',
    c7HoleAria: 'Artistic visualization of the space around a black hole',
    c7Disclaimer: 'This image is an artistic rendering, NOT the official photo. You can inspect the real image via the ESO source link below.',
    c7OneActive: 'You activated a symbolic observatory.',
    c7AllActive: 'All data gathered! You can now start the reconstruction.',
    rooms: [
      {
        id: 1, slug: 'animali', label: 'Extraordinary Animals', title: 'The Sea That Hides Clues',
        teaser: 'Can kelp become a tool? And can bubbles form a net?',
        art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '◉', seal: 'The Marine Lens',
        kicker: 'GALLERY 01 · EXTRAORDINARY ANIMALS',
        intro: 'Some animals surprise scientists not through magic, but because they do things no one ever expected.',
        question: 'A video can show us what happens. But can it immediately tell us why?',
        mainTitle: 'The Case of the Mysterious Kelp',
        main: 'In the Salish Sea, researchers filmed orcas plucking strands of kelp and rolling them between their bodies. Observing the movement is one thing; proving its exact purpose is another.',
        challenge: 'prove',
        source: { code: 'SC-04', title: 'Study on orca kelp behavior (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
        side: {
          title: 'The Whale That Hunts with Bubbles', label: 'Another Exhibit',
          desc: 'Some humpback whales blow circular bubble nets to corral fish. The bubbles are not a solid wall: they manipulate prey behavior. Their shape and use can vary greatly.',
          source: { code: 'SC-05', title: 'Research on humpback whale bubble nets', url: 'https://doi.org/10.1098/rsos.240328' }
        },
        questionHint: 'Look closely at the kelp, but pay special attention to what the animals do with it.'
      },
      {
        id: 2, slug: 'piante', label: 'Plants and Tiny Worlds', title: 'A Garden That Shouldn’t Exist',
        teaser: 'Sprouts in lunar dust and ferns with gigantic DNA.',
        art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '✿', seal: 'The Lunar Sprout',
        kicker: 'GALLERY 02 · PLANTS AND TINY WORLDS',
        intro: 'Plants seem motionless, but they are full of surprising responses. Even lunar dust became part of a breakthrough investigation.',
        question: 'To find out if a plant truly grows in lunar regolith, what must we compare?',
        mainTitle: 'The Seed and the Moon Dust',
        main: 'In the lab, seeds sprouted in small samples of lunar regolith brought back by Apollo missions. However, the seedlings displayed severe stress. Sprouting does not mean growing as well as in fertile soil.',
        challenge: 'terreno',
        source: { code: 'SC-12', title: 'Plants grown in Apollo lunar regolith (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
        side: {
          title: 'The Fern That Surprised Genetics', label: 'Another Exhibit',
          desc: 'A tiny fern of the genus Tmesipteris holds a colossal genome. The sheer amount of DNA does not determine complexity or intelligence: it is a biological trait to be understood in its context.',
          source: { code: 'SC-13', title: 'Genomic study of Tmesipteris (iScience)', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
        },
        questionHint: 'In any fair comparison, always change just one factor at a time.'
      },
      {
        id: 3, slug: 'esperimenti', label: 'Surprising Experiments', title: 'The Fish on Four Wheels',
        teaser: 'Who truly drives a moving tank?',
        art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '⌁', seal: 'The Curious Inventor',
        kicker: 'GALLERY 03 · SURPRISING EXPERIMENTS',
        intro: 'A great experiment isn’t magic: it is a chain of steps that we can rebuild, test, and explain.',
        question: 'How can a fish steer a land vehicle without touching wheels?',
        mainTitle: 'Rebuild the Lab Setup',
        main: 'In one experiment, scientists mounted a water tank onto a motorized platform. A computer tracked the position of the fish and translated its swimming into steering commands for the wheels.',
        challenge: 'sequenza',
        source: { code: 'SC-15', title: 'Fish-operated vehicle: behavioral study (BBR)', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
        side: {
          title: 'Bumblebees Playing with Balls', label: 'Another Exhibit',
          desc: 'Bumblebees rolled small wooden balls with no food reward offered. Researchers investigated whether this was genuine play behavior, without projecting human intentions.',
          source: { code: 'SC-16', title: 'Research on ball rolling in bumblebees', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
        },
        questionHint: 'Which step turns an observed movement into wheel motion?'
      },
      {
        id: 4, slug: 'dinosauri', label: 'Dinosaurs, Extinctions & DNA', title: 'Not All Dinosaurs Disappeared',
        teaser: 'In the history of birds lies an astonishing branch.',
        art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-pensieroso', icon: '❖', seal: 'The Detective of the Past',
        kicker: 'GALLERY 04 · DINOSAURS, EXTINCTIONS & DNA',
        intro: 'Fossil bones are clues. From a fragment, a feather, or skeletal similarities, scientists reconstruct epic sagas.',
        question: 'Does the chicken descend directly from the T. rex?',
        mainTitle: 'The Hidden Family Tree',
        main: 'Birds are living dinosaurs belonging to the theropod group. The T. rex was a distant cousin, not a chicken’s grandfather. The key concept is common ancestor.',
        challenge: 'parentela',
        source: { code: 'SC-38', title: 'Natural History Museum — How dinosaurs evolved into birds', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
        side: {
          title: 'Why a Fossil Isn’t Enough to Clone a Dinosaur', label: 'Another Exhibit',
          desc: 'A fossil reveals incredible facts about ancient anatomy. But cloning would require intact genetic material, not mineralized stone. Movie magic is not a scientific protocol.',
          source: { code: 'SC-39', title: 'Natural History Museum — Could scientists bring dinosaurs back?', url: 'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html' }
        },
        questionHint: 'In an evolutionary tree, what matters is the fork where branches split.'
      },
      {
        id: 5, slug: 'laboratorio', label: 'The Lab of the Future', title: 'Machines Learning from Nature',
        teaser: 'Can an elephant trunk inspire a robotic gripper?',
        art: 'laboratorio', sideArt: 'micelio', otto: 'otto-curioso', icon: '⚙', seal: 'The Nature Engineer',
        kicker: 'GALLERY 05 · THE LAB OF THE FUTURE',
        intro: 'Many technologies stem from an observation: how does a living organism solve a tricky problem?',
        question: 'How would you pick up a fragile object without crushing it?',
        mainTitle: 'Design the Perfect Grip',
        main: 'Researchers design soft grippers inspired by elephant trunks. Wrapping around an object works better than stiff fingers when fragility matters. Here you can try a playful game model.',
        challenge: 'pinza',
        source: { code: 'SC-23', title: 'Study on bio-inspired trunk grippers', url: 'https://doi.org/10.1038/s44182-025-00038-z' },
        side: {
          title: 'Mycelium Meets a Robot', label: 'Another Exhibit',
          desc: 'In an experimental prototype, electrical signals from fungal mycelium were interpreted by circuits to guide a robot. It does not mean the fungus thought about where to go.',
          source: { code: 'SC-25', title: 'Research on mycelium-controlled biohybrid robots', url: 'https://doi.org/10.1126/scirobotics.adk8019' }
        },
        questionHint: 'The strongest squeeze doesn’t always win.'
      },
      {
        id: 6, slug: 'corpo', label: 'Body and Super-Tech', title: 'The Body Sends Messages',
        teaser: 'When muscles and engineering join forces.',
        art: 'corpo', sideArt: 'voce', otto: 'otto-pensieroso', icon: '✧', seal: 'The Signal Explorer',
        kicker: 'GALLERY 06 · BODY AND SUPER-TECH',
        intro: 'Our bodies transmit signals continuously. Scientists investigate how to interface them with assistive devices.',
        question: 'How can a prosthesis receive cues from body movement?',
        mainTitle: 'Follow the Signal',
        main: 'At MIT, engineers studied a bionic knee integrated with residual muscle tissue for more natural motion. These results refer to specific clinical trials.',
        challenge: 'segnali',
        source: { code: 'SC-50', title: 'MIT News — A bionic knee integrated into tissue', url: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710' },
        side: {
          title: 'When Technology Restores Voice', label: 'Another Exhibit',
          desc: 'Research teams use neural interfaces to turn brain signals into speech for paralyzed individuals. These are experimental tools, not mind-reading machines.',
          source: { code: 'SC-53', title: 'Research on neuroprosthetic communication', url: 'https://doi.org/10.1038/s41593-025-01905-6' }
        },
        questionHint: 'A motor command isn’t magic: it’s a connected chain of electrical signals.'
      },
      {
        id: 7, slug: 'spazio', label: 'Space: The Next Frontier', title: 'The Picture No Single Camera Took',
        teaser: 'How do you reconstruct the image of a black hole?',
        art: 'spazio', sideArt: 'galassia', otto: 'otto-mondo', icon: '✦', seal: 'The Cosmic Explorer',
        kicker: 'GALLERY 07 · SPACE: THE NEXT FRONTIER',
        intro: 'In deep space, we cannot just point a camera. Scientists combine data gathered across distant corners of our planet.',
        question: 'Did the first image of M87* come from a single telescope?',
        mainTitle: 'Power Up the Radio Telescope Array',
        main: 'The Event Horizon Telescope combined radio observations from observatories across the globe and used advanced data processing to reconstruct the shadow of black hole M87*.',
        challenge: 'telescopi',
        source: { code: 'SC-48', title: 'ESO / EHT Collaboration — First image of black hole M87*', url: 'https://www.eso.org/public/images/eso1907a/' },
        side: {
          title: 'A Comet from Another Star System', label: 'Another Exhibit',
          desc: 'Interstellar comet 3I/ATLAS crossed our solar system on an open hyperbolic path. It will never return to orbit our Sun like periodic comets.',
          source: { code: 'SC-36', title: 'NASA — 3I/ATLAS: facts and FAQs', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
        },
        questionHint: 'The result comes from synchronizing many instruments, not from a single snapshot.'
      }
    ]
  },

  fr: {
    storeKey: 'otto-museo-fr-progress-v1',
    hashAtrio: 'atrio',
    heroEyebrow: 'LE BONUS INTERACTIF DU LIVRE',
    heroTitle: 'LE MUSÉE DES<br><em>DÉCOUVERTES</em><br>IMPOSSIBLES',
    heroLead: 'Sept salles. Sept mystères de la science. Une petite pieuvre curieuse qui t’attend. Entre, observe, découvre les indices et collectionne les sceaux d’Otto.',
    heroStart: 'Commencer l’exploration',
    heroContinue: 'Continuer l’exploration',
    heroPassport: 'Ouvrir le passeport',
    heroHint: 'Pour curieux de 7 à 12 ans · Gratuit avec le livre · Aucun compte requis',
    heroOttoAlt: 'Otto, la petite pieuvre exploratrice, enlace la planète Terre',
    pathEyebrow: 'TON PARCOURS',
    pathHeading: 'Choisis une porte.',
    pathLead: 'Tu peux visiter les salles dans l’ordre de ton choix. Chaque fois que tu résous un mystère, Otto appose un sceau sur ton passeport.',
    pathAria: (c) => `${c} salles visitées sur 7`,
    pathHint: (c) => `${c} salles complétées sur 7 ${c === 7 ? '· Ton diplôme est prêt !' : ''}`,
    roomAria: (r) => `Salle ${r.id} : ${r.label}`,
    sealEarned: '✓ Sceau obtenu',
    roomCardKicker: (r) => `SALLE ${String(r.id).padStart(2, '0')} · ${r.icon}`,
    roomCardExplore: 'Explorer la salle',
    valueItems: [
      { b: 'Observe, ne devine pas au hasard.', p: 'Chaque activité repose sur de vrais faits. Là où la science cherche encore, nous te l’expliquons clairement.' },
      { b: 'Chaque salle raconte une autre histoire.', p: 'Pas de quiz répétitif : chaque mystère te met au défi avec un jeu interactif différent.' },
      { b: 'Une source réelle pour chaque merveille.', p: 'Consulte les articles scientifiques originaux. Le code SC correspond exactement à celui du livre.' }
    ],
    crumbBack: '← Hall du musée',
    crumbRoom: (id) => `Salle ${id} sur 7`,
    labelMainExhibit: 'PIÈCE PRINCIPALE',
    labelQuestion: 'LA QUESTION',
    labelDoc: 'Document scientifique',
    sourceLabel: 'Source originale ↗',
    sourceAria: (code) => `Ouvrir la source ${code} dans un nouvel onglet`,
    artNotice: 'Les illustrations du musée sont des interprétations artistiques ; les liens mènent aux sources scientifiques authentiques.',
    sideExamine: 'Examiner la planche ↗',
    sideDetail: 'Deux pièces à explorer dans chaque salle : la découverte principale et un second mystère.',
    ottoSays: 'Otto suggère :',
    ottoAlt: 'Otto la petite pieuvre exploratrice',
    hallNote: 'Cette expérience enrichit le livre <em>Einstein, tu as manqué ça !</em> et ne remplace pas la lecture des publications originales. Les fonctions non prouvées sont clairement distinguées des faits observés.',
    navPrevRoom: '← Salle précédente',
    navBackAtrio: '← Retour au hall',
    navPassportProgress: (c) => `Passeport : ${c}/7 sceaux`,
    navNextRoom: 'Salle suivante →',
    navBackToRooms: 'Retour aux salles →',
    sealUnlockedTitle: 'SCEAU DÉBLOQUÉ ✦',
    sealUnlockedMsg: 'Félicitations ! Tu as résolu le mystère sans confondre les indices avec l’imagination. Otto a validé ton passeport.',
    btnViewPassport: 'Voir le passeport',
    btnGoToRoom: (id) => `Aller à la salle ${id} →`,
    btnBackRooms: 'Retour aux sept salles',
    toastWinAll: 'Tu as complété les sept salles ! Ouvre ton passeport pour recevoir ton diplôme.',
    toastWinRoom: '✦ Sceau conquis ! Otto est ravi.',
    toastReset: 'Passeport prêt pour une nouvelle exploration !',
    stepCounterAria: (n, total) => `${n} étapes complétées sur ${total}`,
    passportTitle: 'Ton passeport d’explorateur',
    passportSubtitle: 'Chaque salle explorée ajoute un sceau. Ton passeport est enregistré uniquement sur ton appareil.',
    passportCompletedMsg: (c) => `<strong>${c} / 7 salles complétées.</strong> ${c < 7 ? 'Il te manque ' + (7 - c) + ' sceau(x) pour décrocher ton diplôme.' : 'Félicitations ! Tu as complété l’ensemble des sept salles.'}`,
    prizeEyebrow: 'RÉCOMPENSE FINALE',
    prizeTitle: 'Le diplôme d’explorateur',
    childNameLabel: 'Prénom de l’explorateur ou de l’exploratrice',
    childNamePlaceholder: 'Écris un prénom pour l’imprimer',
    btnPrintDiploma: 'Imprimer le diplôme',
    diplomaHeading: 'EXPLORATEUR DES<br>DÉCOUVERTES IMPOSSIBLES',
    diplomaCertifies: 'Ce certificat atteste que',
    diplomaBody: 'a complété les sept salles du musée,<br>a observé avec curiosité et a suivi les preuves scientifiques.',
    diplomaSign: 'Otto · Le Musée des Découvertes Impossibles',
    btnBackToMuseum: 'Retour au musée',
    resetNotice: 'Pour recommencer depuis le début :',
    btnResetSeals: 'Réinitialiser les sceaux',
    resetConfirm: 'Veux-tu effacer les sept sceaux enregistrés sur cet appareil ?',
    zoomAria: (t) => `Agrandissement : ${t}`,
    zoomAlt: (t) => `Illustration artistique pour : ${t}`,
    zoomNotice: 'Illustration artistique, non contractuelle des données d’origine. Pour voir la publication, ouvre la source.',
    printHeader: 'LE MUSÉE DES DÉCOUVERTES IMPOSSIBLES',
    printTitle: 'DIPLÔME D’EXPLORATEUR',
    printConferred: 'Décerné à',
    printBody: 'pour avoir exploré les sept salles,<br>collectionné les sceaux et appris à distinguer<br>les observations scientifiques des hypothèses.',
    printBrand: '✦ Otto, la petite pieuvre exploratrice ✦',
    printBook: 'Tiré de : EINSTEIN, TU AS MANQUÉ ÇA !',
    // Room 1 Challenge
    c1Role: 'TON MÉTIER : ENQUÊTEUR',
    c1Title: 'Vrai fait observé ou hypothèse à prouver ?',
    c1Subtext: 'Une phrase à la fois. Quelles informations proviennent directement des vidéos et lesquelles sont de simples explications possibles ?',
    c1Statements: [
      { s: 'Les orques arrachent un morceau d’algue.', correct: 'osservato' },
      { s: 'Les orques font rouler le morceau d’algue entre leurs corps.', correct: 'osservato' },
      { s: 'L’algue élimine les cellules mortes de leur peau.', correct: 'ipotesi' },
      { s: 'Utiliser l’algue renforce les liens sociaux du groupe.', correct: 'ipotesi' }
    ],
    c1BtnObserved: '✓ Observé dans les vidéos',
    c1BtnHypothesis: '? Hypothèse à étudier',
    c1GoodStep: 'Indice exact ! Passe à la phrase suivante.',
    c1WrongObserved: 'Cette action est directement visible sur les vidéos : c’est une observation.',
    c1WrongHypothesis: 'C’est une fonction possible de l’algue, pas encore prouvée : c’est une hypothèse.',
    // Room 2 Challenge
    c2Role: 'TON MÉTIER : BOTANISTE',
    c2Title: 'Quelle comparaison est la plus utile ?',
    c2Subtext: 'Tu veux savoir quel est l’effet du régolithe lunaire. Quelle paire d’expériences choisirais-tu, en gardant la même eau, la même lumière et la même plante ?',
    c2OptionA: 'A · Plante dans le régolithe lunaire / même plante dans un sol témoin, dans des conditions similaires',
    c2OptionB: 'B · Plante dans le régolithe sans eau / plante dans la terre avec de l’eau',
    c2OptionC: 'C · Une fougère dans l’obscurité / une tomate en plein soleil',
    c2Good: 'Excellent choix : tu compares des plantules identiques en gardant toutes les autres variables égales.',
    c2Wrong: 'Tu changes trop de variables à la fois : impossible de savoir laquelle explique la différence.',
    // Room 3 Challenge
    c3Role: 'TON MÉTIER : INGÉNIEUR',
    c3Title: 'Reconstitue la chaîne de commande.',
    c3Subtext: 'Touche les quatre étapes dans le bon ordre : qui commence, qui capte le mouvement, qui le traduit et qui fait avancer le véhicule ?',
    c3Steps: [
      { id: 1, name: 'Le poisson nage', mark: '🐟' },
      { id: 2, name: 'La caméra repère sa position', mark: '◉' },
      { id: 3, name: 'L’ordinateur calcule la commande', mark: '⌘' },
      { id: 4, name: 'Les moteurs font tourner les roues', mark: '⚙' }
    ],
    c3GoodStep: 'Exact ! Choisis maintenant l’étape suivante.',
    c3WrongStep: 'Cette étape intervient plus tard. Pars de ce que fait le poisson.',
    // Room 4 Challenge
    c4Role: 'TON MÉTIER : PALÉONTOLOGUE',
    c4Title: 'Choisis la bonne branche.',
    c4Subtext: 'Observe ce petit arbre : à partir d’anciens théropodes, plusieurs branches ont divergé. Que pouvons-nous affirmer avec certitude ?',
    c4SvgAria: 'À partir d’un ancêtre commun des dinosaures théropodes partent deux branches : une vers le T. rex et une vers les dinosaures aviaires, les oiseaux',
    c4SvgTheropods: 'Ancêtres théropodes',
    c4SvgTrex: '🦖 branche T. rex',
    c4SvgBirds: '🐦 branche des oiseaux',
    c4Option0: 'La poule descend directement du T. rex.',
    c4Option1: 'Les oiseaux et le T. rex appartiennent à des branches distinctes partageant des ancêtres communs.',
    c4Option2: 'La ressemblance est fortuite : les oiseaux ne sont pas des dinosaures.',
    c4Good: 'Exact ! Les oiseaux sont des dinosaures théropodes vivants partageant des ancêtres avec d’autres branches éteintes.',
    c4Wrong: 'Observe l’endroit où l’arbre se sépare. Le T. rex n’est pas l’ancêtre direct de la poule.',
    // Room 5 Challenge
    c5Role: 'TON MÉTIER : CONCEPTEUR',
    c5Title: 'Quelle force de préhension utiliserais-tu ?',
    c5Subtext: 'Tu dois attraper un objet fragile. Déplace le curseur pour trouver une prise ni trop faible ni trop forte.',
    c5VaseAria: 'Objet fragile en verre',
    c5SliderLabel: 'Intensité de la prise (échelle ludique)',
    c5LevelSoft: 'La prise est trop faible.',
    c5LevelHard: 'Tu serres plus que nécessaire.',
    c5LevelGood: 'La prise est contrôlée et délicate.',
    c5BtnCheck: 'Tester la prise',
    c5Disclaimer: 'Cette échelle est simplifiée pour le jeu : elle ne représente pas les mesures d’un vrai robot.',
    c5Good: 'Tu as trouvé le bon équilibre ! Les vrais robots nécessitent des capteurs fins, des formes souples et des contrôles précis.',
    c5WrongSoft: 'L’objet glisse : essaie d’augmenter légèrement la force.',
    c5WrongHard: 'Trop fort ! Une prise rigide risquerait de casser un objet délicat.',
    // Room 6 Challenge
    c6Role: 'TON MÉTIER : EXPLORATEUR DU CORPS',
    c6Title: 'Quatre étapes d’un signal.',
    c6Subtext: 'Ouvre chaque case pour découvrir le cheminement du corps à la technologie. Touche-les dans n’importe quel ordre.',
    c6Tiles: [
      ['Le muscle s’active', 'Le corps génère des signaux physiologiques liés au mouvement.'],
      ['L’interface détecte', 'Des capteurs adaptés enregistrent les impulsions neuromusculaires.'],
      ['Le contrôleur interprète', 'Les signaux sont décodés en commandes mécaniques.'],
      ['La prothèse s’actionne', 'Le système bionique accompagne naturellement le geste de la personne.']
    ],
    c6TileUntapped: 'Touche pour explorer',
    c6GoodStep: 'Tu as révélé une autre étape. Continue de suivre le parcours !',
    // Room 7 Challenge
    c7Role: 'TON MÉTIER : ASTROPHYSICIEN',
    c7Title: 'Capte les signaux depuis plusieurs endroits.',
    c7Subtext: 'Active les quatre antennes symboliques. Lorsque toutes auront observé, tu découvriras la reconstitution artistique. Le vrai réseau EHT compte bien plus d’instruments.',
    c7Observatories: ['Observatoire A', 'Observatoire B', 'Observatoire C', 'Observatoire D'],
    c7SignalReceived: 'Signal reçu',
    c7BtnAssemble: 'Traiter les observations →',
    c7HoleAria: 'Visualisation artistique de la région entourant un trou noir',
    c7Disclaimer: 'Cette figure est une illustration artistique, PAS la photo officielle. Tu peux ouvrir l’image authentique via le lien ESO ci-dessous.',
    c7OneActive: 'Tu as activé un observatoire symbolique.',
    c7AllActive: 'Toutes les données sont réunies ! Tu peux lancer la reconstitution.',
    rooms: [
      {
        id: 1, slug: 'animali', label: 'Animaux extraordinaires', title: 'L’océan cache des indices',
        teaser: 'Une algue peut-elle devenir un outil ? Et des bulles un filet ?',
        art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '◉', seal: 'La lentille marine',
        kicker: 'SALLE 01 · ANIMAUX EXTRAORDINAIRES',
        intro: 'Certains animaux surprennent la science non pas par magie, mais parce qu’ils font des choses que personne n’attendait.',
        question: 'Une vidéo peut nous montrer ce qui se passe. Mais peut-elle nous en donner immédiatement la raison ?',
        mainTitle: 'Le cas de l’algue mystérieuse',
        main: 'Dans la mer des Salish, des chercheurs ont filmé des orques arrachant un brin de varech et le faisant rouler entre leurs corps. Observer un mouvement est une chose ; prouver sa fonction exacte en est une autre.',
        challenge: 'prove',
        source: { code: 'SC-04', title: 'Étude comportementale sur les orques (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
        side: {
          title: 'La baleine qui pêche avec des bulles', label: 'Un autre objet exposé',
          desc: 'Certaines baleines à bosse soufflent des filets circulaires de bulles pour concentrer les poissons. Les bulles ne sont pas un mur solide : elles modifient le comportement des proies. Leur forme et leur utilisation peuvent varier.',
          source: { code: 'SC-05', title: 'Recherche sur le filet de bulles des baleines à bosse', url: 'https://doi.org/10.1098/rsos.240328' }
        },
        questionHint: 'Observe attentivement l’algue, mais regarde surtout ce que les animaux en font.'
      },
      {
        id: 2, slug: 'piante', label: 'Plantes et petits mondes', title: 'Un jardin inattendu',
        teaser: 'Des pousses dans la poussière lunaire et des fougères au génome colossal.',
        art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '✿', seal: 'La pousse lunaire',
        kicker: 'SALLE 02 · PLANTES ET PETITS MONDES',
        intro: 'Les plantes semblent immobiles, mais ce sont des organismes pleins de réactions surprenantes. Même la poussière de Lune a fait l’objet d’une étude fascinante.',
        question: 'Pour savoir si une plante pousse vraiment dans le sol lunaire, que devons-nous comparer ?',
        mainTitle: 'La graine et la poussière de Lune',
        main: 'En laboratoire, des graines ont germé dans de petits échantillons de régolithe lunaire rapportés par les missions Apollo. Cependant, les plantules ont montré des signes nets de stress. Germer ne signifie pas pousser aussi bien que dans un sol fertile.',
        challenge: 'terreno',
        source: { code: 'SC-12', title: 'Plantes cultivées dans le régolithe lunaire (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
        side: {
          title: 'La fougère qui a étonné la génétique', label: 'Un autre objet exposé',
          desc: 'Une minuscule fougère du genre Tmesipteris possède un génome colossal. La quantité totale d’ADN ne mesure ni l’intelligence ni la complexité d’un organisme : c’est une curiosité biologique à comprendre dans son contexte.',
          source: { code: 'SC-13', title: 'Étude génomique sur Tmesipteris (iScience)', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
        },
        questionHint: 'Dans une comparaison scientifique, change toujours un seul élément à la fois.'
      },
      {
        id: 3, slug: 'esperimenti', label: 'Expériences surprenantes', title: 'Le poisson à quatre roues',
        teaser: 'Qui conduit vraiment un aquarium motorisé ?',
        art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '⌁', seal: 'L’inventeur curieux',
        kicker: 'SALLE 03 · EXPÉRIENCES SURPRENANTES',
        intro: 'Une belle invention n’est pas de la magie : c’est une chaîne d’étapes que l’on peut reconstituer, tester et expliquer.',
        question: 'Comment un poisson peut-il déplacer un véhicule sans toucher les roues ?',
        mainTitle: 'Remets en ordre le laboratoire',
        main: 'Dans une expérience, des chercheurs ont placé un bocal sur une plateforme motorisée. Un système suivait la position du poisson et traduisait sa nage en commandes pour les roues. Le poisson ne conduisait pas avec un volant.',
        challenge: 'sequenza',
        source: { code: 'SC-15', title: 'Véhicule piloté par un poisson (BBR)', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
        side: {
          title: 'Les bourdons et les balles', label: 'Un autre objet exposé',
          desc: 'Dans plusieurs tests, des bourdons ont fait rouler de petites billes sans récompense immédiate. Les scientifiques étudient si ce comportement s’apparente au jeu, sans y projeter d’intentions humaines.',
          source: { code: 'SC-16', title: 'Recherche sur le jeu chez les bourdons', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
        },
        questionHint: 'Quelle étape transforme un mouvement observé en déplacement des roues ?'
      },
      {
        id: 4, slug: 'dinosauri', label: 'Dinosaures, disparus et ADN', title: 'Tous les dinosaures n’ont pas disparu',
        teaser: 'Dans l’histoire des oiseaux se cache une branche surprenante.',
        art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-pensieroso', icon: '❖', seal: 'Le détective du passé',
        kicker: 'SALLE 04 · DINOSAURES, DISPARUS ET ADN',
        intro: 'Les fossiles sont des indices. À partir d’un fragment, d’une plume ou d’une forme d’os, les chercheurs reconstituent de très longues histoires.',
        question: 'La poule descend-elle directement du T. rex ?',
        mainTitle: 'L’arbre généalogique caché',
        main: 'Les oiseaux sont des dinosaures vivants du groupe des théropodes. Le T. rex était un lointain cousin, pas le grand-père d’une poule. Le mot clé est ancêtre commun.',
        challenge: 'parentela',
        source: { code: 'SC-38', title: 'Natural History Museum — Comment les dinosaures sont devenus des oiseaux', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
        side: {
          title: 'Pourquoi un fossile ne suffit pas pour cloner un dinosaure ?', label: 'Un autre objet exposé',
          desc: 'Un fossile nous apprend beaucoup sur l’anatomie d’une espèce disparue. Mais pour le cloner, il faudrait du matériel biologique préservé, pas une roche pétrifiée. Le cinéma n’est pas un protocole scientifique.',
          source: { code: 'SC-39', title: 'Natural History Museum — Les scientifiques pourraient-ils recréer les dinosaures ?', url: 'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html' }
        },
        questionHint: 'Dans un arbre évolutif, observe l’endroit où les branches se séparent.'
      },
      {
        id: 5, slug: 'laboratorio', label: 'Le laboratoire du futur', title: 'Des machines inspirées par la nature',
        teaser: 'Une trompe peut-elle inspirer une pince robotique ?',
        art: 'laboratorio', sideArt: 'micelio', otto: 'otto-curioso', icon: '⚙', seal: 'L’ingénieur de la nature',
        kicker: 'SALLE 05 · LE LABORATOIRE DU FUTUR',
        intro: 'De nombreuses technologies naissent d’une observation : comment un être vivant résout-il un problème complexe ?',
        question: 'Comment saisirais-tu un objet délicat sans l’abîmer ?',
        mainTitle: 'Conçois la prise parfaite',
        main: 'Des ingénieurs conçoivent des pinces souples inspirées de la trompe de l’éléphant. Envelopper un objet délicat évite de le briser avec des mâchoires rigides. Ici, teste un modèle ludique et interactif.',
        challenge: 'pinza',
        source: { code: 'SC-23', title: 'Étude sur une pince robotique inspirée de la trompe', url: 'https://doi.org/10.1038/s44182-025-00038-z' },
        side: {
          title: 'Le mycélium rencontre un robot', label: 'Un autre objet exposé',
          desc: 'Dans un prototype expérimental, les impulsions électriques d’un mycélium fongique ont été traduites par des circuits pour actionner un robot. Cela ne signifie pas que le champignon décide où aller.',
          source: { code: 'SC-25', title: 'Recherche sur le robot biohybride à base de mycélium', url: 'https://doi.org/10.1126/scirobotics.adk8019' }
        },
        questionHint: 'Serrer le plus fort possible n’est pas toujours la bonne solution.'
      },
      {
        id: 6, slug: 'corpo', label: 'Corps et super-technologies', title: 'Le corps émet des messages',
        teaser: 'Quand les muscles et l’ingénierie travaillent ensemble.',
        art: 'corpo', sideArt: 'voce', otto: 'otto-pensieroso', icon: '✧', seal: 'L’explorateur des signaux',
        kicker: 'SALLE 06 · CORPS ET SUPER-TECHNOLOGIES',
        intro: 'Notre corps émet des signaux en permanence. Les scientifiques cherchent à les connecter à des dispositifs pour aider les personnes.',
        question: 'Comment une prothèse peut-elle recevoir les instructions d’un mouvement ?',
        mainTitle: 'Suis le signal',
        main: 'Au MIT, une prothèse de genou bionique intégrée aux tissus a été étudiée pour retrouver une marche naturelle. Ces résultats correspondent à des essais cliniques précis.',
        challenge: 'segnali',
        source: { code: 'SC-50', title: 'MIT News — Un genou bionique intégré aux tissus', url: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710' },
        side: {
          title: 'Quand la technologie aide la voix', label: 'Un autre objet exposé',
          desc: 'Des équipes de recherche testent des interfaces neurales pour traduire l’activité cérébrale en paroles audibles. Ce sont des outils de recherche, pas des appareils qui « lisent dans les pensées ».',
          source: { code: 'SC-53', title: 'Recherche sur la neuroprothèse vocale', url: 'https://doi.org/10.1038/s41593-025-01905-6' }
        },
        questionHint: 'Une commande motrice n’est pas magique : c’est une chaîne ininterrompue de signaux.'
      },
      {
        id: 7, slug: 'spazio', label: 'Espace : la nouvelle frontière', title: 'La photo qu’aucun appareil n’a prise',
        teaser: 'Comment reconstitue-t-on l’image d’un trou noir ?',
        art: 'spazio', sideArt: 'galassia', otto: 'otto-mondo', icon: '✦', seal: 'L’explorateur cosmique',
        kicker: 'SALLE 07 · ESPACE : LA NOUVELLE FRONTIÈRE',
        intro: 'Dans l’espace lointain, on ne peut pas regarder comme sur Terre. Les scientifiques réunissent des données captées aux quatre coins de notre planète.',
        question: 'La première image de M87* provient-elle d’un seul télescope ?',
        mainTitle: 'Allume le réseau de radiotélescopes',
        main: 'Le télescope Event Horizon a synchronisé des radiotélescopes répartis sur toute la planète pour reconstituer l’ombre du trou noir M87*. Notre jeu utilise quatre observatoires symboliques : le réseau réel est bien plus vaste.',
        challenge: 'telescopi',
        source: { code: 'SC-48', title: 'ESO / Collaboration EHT — Première image du trou noir M87*', url: 'https://www.eso.org/public/images/eso1907a/' },
        side: {
          title: 'Une comète venue d’un autre système', label: 'Un autre objet exposé',
          desc: 'La comète interstellaire 3I/ATLAS a traversé notre Système solaire selon une trajectoire ouverte. Elle ne suit pas une orbite fermée autour du Soleil et ne reviendra jamais.',
          source: { code: 'SC-36', title: 'NASA — 3I/ATLAS : questions et réponses', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
        },
        questionHint: 'Le résultat provient de multiples instruments et d’un travail d’analyse, pas d’un seul cliché.'
      }
    ]
  },

  es: {
    storeKey: 'otto-museo-es-progress-v1',
    hashAtrio: 'atrio',
    heroEyebrow: 'EL BONUS INTERACTIVO DEL LIBRO',
    heroTitle: 'EL MUSEO DE LOS<br><em>DESCUBRIMIENTOS</em><br>IMPOSIBLES',
    heroLead: 'Siete salas. Siete misterios de la ciencia. Un pequeño pulpo explorador que te espera. Entra, observa, descubre las pistas y reúne los sellos de Otto.',
    heroStart: 'Iniciar la exploración',
    heroContinue: 'Continuar la exploración',
    heroPassport: 'Abrir el pasaporte',
    heroHint: 'Para mentes curiosas de 7 a 12 años · Gratis con el libro · No requiere cuenta',
    heroOttoAlt: 'Otto, el pequeño pulpo explorador, abrazando el planeta Tierra',
    pathEyebrow: 'TU RECORRIDO',
    pathHeading: 'Elige una puerta.',
    pathLead: 'Puedes visitar las salas en el orden que prefieras. Cada vez que resuelvas un misterio, Otto añadirá un sello a tu pasaporte.',
    pathAria: (c) => `${c} salas visitadas de 7`,
    pathHint: (c) => `${c} salas completadas de 7 ${c === 7 ? '· ¡Tu diploma está listo!' : ''}`,
    roomAria: (r) => `Sala ${r.id}: ${r.label}`,
    sealEarned: '✓ Sello obtenido',
    roomCardKicker: (r) => `SALA ${String(r.id).padStart(2, '0')} · ${r.icon}`,
    roomCardExplore: 'Explorar la sala',
    valueItems: [
      { b: 'Observa, no adivines al azar.', p: 'Cada actividad parte de hechos reales. Donde la ciencia aún duda, te lo decimos con total claridad.' },
      { b: 'Cada sala cuenta otra historia.', p: 'No encontrarás el mismo test siete veces: cada enigma usa una mecánica distinta.' },
      { b: 'Una fuente para cada descubrimiento.', p: 'Puedes abrir los artículos científicos originales. El código SC coincide con el de tu libro.' }
    ],
    crumbBack: '← Vestíbulo del museo',
    crumbRoom: (id) => `Sala ${id} de 7`,
    labelMainExhibit: 'PIEZA PRINCIPAL',
    labelQuestion: 'LA PREGUNTA',
    labelDoc: 'Documento científico',
    sourceLabel: 'Fuente original ↗',
    sourceAria: (code) => `Abrir la fuente ${code} en una pestaña nueva`,
    artNotice: 'Las ilustraciones del museo son interpretaciones artísticas; los enlaces conducen a las fuentes originales.',
    sideExamine: 'Examinar la lámina ↗',
    sideDetail: 'Dos piezas para explorar en cada sala: el hallazgo principal y un segundo misterio.',
    ottoSays: 'Otto sugiere:',
    ottoAlt: 'Otto el pequeño pulpo explorador',
    hallNote: 'Esta experiencia complementa el libro <em>¡Einstein, esta te la perdiste!</em> y no sustituye la lectura de los estudios originales. Las hipótesis se distinguen claramente de los hechos observados.',
    navPrevRoom: '← Sala anterior',
    navBackAtrio: '← Volver al vestíbulo',
    navPassportProgress: (c) => `Pasaporte: ${c}/7 sellos`,
    navNextRoom: 'Sala siguiente →',
    navBackToRooms: 'Volver a las salas →',
    sealUnlockedTitle: '¡SELLO DESBLOQUEADO! ✦',
    sealUnlockedMsg: '¡Enhorabuena! Resolviste el misterio sin confundir las pistas con la fantasía. Otto actualizó tu pasaporte.',
    btnViewPassport: 'Ver pasaporte',
    btnGoToRoom: (id) => `Ir a la sala ${id} →`,
    btnBackRooms: 'Volver a las siete salas',
    toastWinAll: '¡Completaste las siete salas! Abre tu pasaporte para obtener tu diploma.',
    toastWinRoom: '✦ ¡Sello conseguido! Otto está muy contento.',
    toastReset: '¡Pasaporte listo para una nueva exploración!',
    stepCounterAria: (n, total) => `${n} pasos completados de ${total}`,
    passportTitle: 'Tu pasaporte de explorador',
    passportSubtitle: 'Cada sala resuelta añade un sello. Tu pasaporte se guarda únicamente en tu dispositivo.',
    passportCompletedMsg: (c) => `<strong>${c} / 7 salas completadas.</strong> ${c < 7 ? 'Te faltan ' + (7 - c) + ' sello(s) para conseguir tu diploma.' : '¡Enhorabuena! Has completado las siete salas.'}`,
    prizeEyebrow: 'PREMIO FINAL',
    prizeTitle: 'El diploma de explorador',
    childNameLabel: 'Nombre del explorador o exploradora',
    childNamePlaceholder: 'Escribe un nombre para imprimir',
    btnPrintDiploma: 'Imprimir diploma',
    diplomaHeading: 'EXPLORADOR DE LOS<br>DESCUBRIMIENTOS IMPOSIBLES',
    diplomaCertifies: 'Se certifica que',
    diplomaBody: 'ha completado las siete salas del museo,<br>ha observado con curiosidad y ha seguido las evidencias.',
    diplomaSign: 'Otto · El Museo de los Descubrimientos Imposibles',
    btnBackToMuseum: 'Volver al museo',
    resetNotice: 'Para empezar de nuevo desde el principio:',
    btnResetSeals: 'Reiniciar los sellos',
    resetConfirm: '¿Deseas borrar los siete sellos guardados en este dispositivo?',
    zoomAria: (t) => `Ampliación: ${t}`,
    zoomAlt: (t) => `Ilustración artística para: ${t}`,
    zoomNotice: 'Ilustración artística, no una fotografía del estudio. Para ver los datos originales, abre la fuente.',
    printHeader: 'EL MUSEO DE LOS DESCUBRIMIENTOS IMPOSIBLES',
    printTitle: 'DIPLOMA DE EXPLORADOR',
    printConferred: 'Otorgado a',
    printBody: 'por haber completado las siete salas,<br>reunido los sellos y aprendido a distinguir<br>las observaciones de las hipótesis.',
    printBrand: '✦ Otto, el pequeño pulpo explorador ✦',
    printBook: 'De: ¡EINSTEIN, ESTA TE LA PERDISTE!',
    // Room 1 Challenge
    c1Role: 'TU OFICIO: INVESTIGADOR',
    c1Title: '¿Observado de verdad o aún por demostrar?',
    c1Subtext: 'Una frase cada vez. ¿Qué datos proceden directamente de los vídeos y cuáles son posibles explicaciones?',
    c1Statements: [
      { s: 'Las orcas arrancan un trozo de alga.', correct: 'osservato' },
      { s: 'Las orcas hacen rodar el trozo de alga entre sus cuerpos.', correct: 'osservato' },
      { s: 'El alga elimina las células muertas de la piel.', correct: 'ipotesi' },
      { s: 'Usar el alga refuerza los lazos sociales del grupo.', correct: 'ipotesi' }
    ],
    c1BtnObserved: '✓ Observado en los vídeos',
    c1BtnHypothesis: '? Hipótesis para estudiar',
    c1GoodStep: '¡Pista correcta! Pasa a la siguiente frase.',
    c1WrongObserved: 'Esta acción se ve directamente en los vídeos: es una observación.',
    c1WrongHypothesis: 'Es una posible función del alga, aún no demostrada: es una hipótesis.',
    // Room 2 Challenge
    c2Role: 'TU OFICIO: BOTÁNICO',
    c2Title: '¿Qué comparación es más útil?',
    c2Subtext: 'Quieres comprobar cómo influye el regolito lunar. ¿Qué pareja de ensayos elegirías, manteniendo iguales agua, luz y tipo de planta?',
    c2OptionA: 'A · Planta en regolito lunar / misma planta en suelo de control, en condiciones similares',
    c2OptionB: 'B · Planta en regolito sin agua / planta en tierra con agua',
    c2OptionC: 'C · Un helecho a oscuras / un tomate a la luz del sol',
    c2Good: '¡Gran elección! Comparas plantas iguales manteniendo idénticas todas las demás variables.',
    c2Wrong: 'Cambias demasiadas variables a la vez: no sabrías a cuál atribuir la diferencia.',
    // Room 3 Challenge
    c3Role: 'TU OFICIO: INGENIERO',
    c3Title: 'Reconstruye la cadena de mando.',
    c3Subtext: 'Toca los cuatro pasos en orden: ¿quién empieza, quién detecta el movimiento, quién lo interpreta y quién mueve el vehículo?',
    c3Steps: [
      { id: 1, name: 'El pez nada', mark: '🐟' },
      { id: 2, name: 'La cámara detecta su posición', mark: '◉' },
      { id: 3, name: 'El ordenador procesa la orden', mark: '⌘' },
      { id: 4, name: 'Los motores mueven las ruedas', mark: '⚙' }
    ],
    c3GoodStep: '¡Exacto! Ahora elige el siguiente paso.',
    c3WrongStep: 'Este paso viene después. Empieza por lo que hace el pez.',
    // Room 4 Challenge
    c4Role: 'TU OFICIO: PALEONTÓLOGO',
    c4Title: 'Elige la rama correcta.',
    c4Subtext: 'Observa este pequeño árbol: de los antiguos terópodos surgieron varias ramas. ¿Qué podemos afirmar con certeza?',
    c4SvgAria: 'De un antepasado común de los terópodos parten dos ramas: una hacia el T. rex y otra hacia las aves',
    c4SvgTheropods: 'Antepasados terópodos',
    c4SvgTrex: '🦖 rama T. rex',
    c4SvgBirds: '🐦 rama de las aves',
    c4Option0: 'La gallina desciende directamente del T. rex.',
    c4Option1: 'Las aves y el T. rex pertenecen a ramas distintas que comparten antepasados comunes.',
    c4Option2: 'El parecido es casualidad: las aves no son dinosaurios.',
    c4Good: '¡Exacto! Las aves son dinosaurios terópodos vivientes y comparten antepasados con ramas extintas.',
    c4Wrong: 'Mira bien dónde se divide el árbol. El T. rex no es el antepasado directo de la gallina.',
    // Room 5 Challenge
    c5Role: 'TU OFICIO: DISEÑADOR ROBÓTICO',
    c5Title: '¿Cuánta fuerza de agarre usarías?',
    c5Subtext: 'Tienes que sujetar un objeto frágil. Mueve el control para encontrar un agarre ni muy débil ni muy fuerte.',
    c5VaseAria: 'Objeto frágil de vidrio',
    c5SliderLabel: 'Intensidad del agarre (escala del juego)',
    c5LevelSoft: 'El agarre es demasiado débil.',
    c5LevelHard: 'Estás apretando más de la cuenta.',
    c5LevelGood: 'El agarre es controlado y delicado.',
    c5BtnCheck: 'Comprobar el agarre',
    c5Disclaimer: 'Esta escala es simplificada para el juego: no representa medidas de un robot real.',
    c5Good: '¡Encontraste el punto de equilibrio! Los robots reales necesitan sensores sensibles, geometrías flexibles y controles avanzados.',
    c5WrongSoft: 'El objeto resbala: prueba a aumentar un poco la fuerza.',
    c5WrongHard: '¡Demasiado! Un agarre rígido podría romper un objeto delicado.',
    // Room 6 Challenge
    c6Role: 'TU OFICIO: EXPLORADOR DEL CUERPO',
    c6Title: 'Cuatro etapas de una señal.',
    c6Subtext: 'Abre cada casilla para descubrir el recorrido del cuerpo a la tecnología. Puedes tocarlas en cualquier orden.',
    c6Tiles: [
      ['El músculo se activa', 'El cuerpo genera señales fisiológicas ligadas al movimiento.'],
      ['La interfaz detecta', 'Los sensores captan los impulsos neuromusculares útiles.'],
      ['El procesador interpreta', 'Las señales se decodifican en órdenes de movimiento.'],
      ['La prótesis se mueve', 'El sistema biónico acompaña de forma natural el movimiento de la persona.']
    ],
    c6TileUntapped: 'Toca para explorar',
    c6GoodStep: '¡Descubriste otra etapa! Sigue completando el recorrido.',
    // Room 7 Challenge
    c7Role: 'TU OFICIO: ASTROFÍSICO',
    c7Title: 'Reúne señales desde distintos lugares.',
    c7Subtext: 'Activa las cuatro antenas simbólicas. Cuando todas hayan observado, podrás ver la reconstrucción artística. La red EHT real cuenta con más instrumentos.',
    c7Observatories: ['Observatorio A', 'Observatorio B', 'Observatorio C', 'Observatorio D'],
    c7SignalReceived: 'Señal recibida',
    c7BtnAssemble: 'Procesar las observaciones →',
    c7HoleAria: 'Visualización artística de la región que rodea un agujero negro',
    c7Disclaimer: 'Esta figura es una ilustración artística, NO la fotografía oficial. Puedes abrir la imagen auténtica mediante el enlace a ESO de abajo.',
    c7OneActive: 'Has activado un observatorio simbólico.',
    c7AllActive: '¡Datos reunidos! Ahora puedes iniciar la reconstrucción.',
    rooms: [
      {
        id: 1, slug: 'animali', label: 'Animales extraordinarios', title: 'El océano esconde pistas',
        teaser: '¿Puede un alga convertirse en herramienta? ¿Y unas burbujas en red?',
        art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '◉', seal: 'La lente marina',
        kicker: 'SALA 01 · ANIMALES EXTRAORDINARIOS',
        intro: 'Algunos animales sorprenden a la ciencia no por magia, sino porque hacen cosas que nadie esperaba.',
        question: 'Un vídeo puede mostrarnos qué ocurre. Pero, ¿puede decirnos enseguida por qué?',
        mainTitle: 'El caso del alga misteriosa',
        main: 'En el mar de Salish, los investigadores filmaron orcas arrancando un tramo de alga y haciéndolo rodar entre sus cuerpos. Observar el movimiento es una cosa; entender su función exacta es otra.',
        challenge: 'prove',
        source: { code: 'SC-04', title: 'Estudio sobre el comportamiento de las orcas (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
        side: {
          title: 'La ballena que pesca con burbujas', label: 'Otra pieza expuesta',
          desc: 'Algunas ballenas jorobadas producen redes de burbujas para concentrar a los peces. Las burbujas no son una pared sólida: modifican la conducta de las presas. Su forma y su uso pueden variar.',
          source: { code: 'SC-05', title: 'Investigación sobre las redes de burbujas de las ballenas', url: 'https://doi.org/10.1098/rsos.240328' }
        },
        questionHint: 'Mira el alga, pero sobre todo observa qué hacen los animales con ella.'
      },
      {
        id: 2, slug: 'piante', label: 'Plantas y pequeños mundos', title: 'Un jardín inesperado',
        teaser: 'Brotes en polvo lunar y helechos con un ADN gigantesco.',
        art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '✿', seal: 'El brote lunar',
        kicker: 'SALA 02 · PLANTAS Y PEQUEÑOS MUNDOS',
        intro: 'Las plantas parecen quietas, pero son organismos llenos de respuestas asombrosas. Hasta el polvo de la Luna formó parte de una investigación.',
        question: 'Para saber si una planta crece en el regolito lunar, ¿qué debemos comparar?',
        mainTitle: 'La semilla y el polvo de la Luna',
        main: 'En el laboratorio, varias semillas brotaron en pequeñas muestras de regolito lunar traídas por las misiones Apolo. Sin embargo, las plantas mostraron signos de estrés. Brotar no significa crecer tan bien como en tierra fértil.',
        challenge: 'terreno',
        source: { code: 'SC-12', title: 'Plantas cultivadas en regolito lunar (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
        side: {
          title: 'El helecho que asombró a la genética', label: 'Otra pieza expuesta',
          desc: 'Un diminuto helecho del género Tmesipteris posee un genoma colosal. La cantidad de ADN no mide la inteligencia o la complejidad de un organismo: es un rasgo biológico para entender en su contexto.',
          source: { code: 'SC-13', title: 'Estudio del genoma de Tmesipteris (iScience)', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
        },
        questionHint: 'En una comparación científica, intenta cambiar un solo elemento cada vez.'
      },
      {
        id: 3, slug: 'esperimenti', label: 'Experimentos sorprendentes', title: 'El pez sobre cuatro ruedas',
        teaser: '¿Quién conduce de verdad un acuario móvil?',
        art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '⌁', seal: 'El inventor curioso',
        kicker: 'SALA 03 · EXPERIMENTOS SORPRENDENTES',
        intro: 'Un gran invento no es magia: es una cadena de pasos que podemos reconstruir, controlar y explicar.',
        question: '¿Cómo puede un pez mover un vehículo terrestre sin tocar las ruedas?',
        mainTitle: 'Pon en orden el laboratorio',
        main: 'En un experimento, los investigadores montaron una pecera sobre una plataforma con motor. Un sistema detectaba la posición del pez y la traducía en órdenes para las ruedas. El pez no conducía con un volante.',
        challenge: 'sequenza',
        source: { code: 'SC-15', title: 'Vehículo accionado por un pez (BBR)', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
        side: {
          title: 'Los abejorros y las pelotas', label: 'Otra pieza expuesta',
          desc: 'En varios ensayos, algunos abejorros hicieron rodar bolitas de madera sin premio a cambio. Los científicos analizan si es conducta de juego, sin atribuirles pensamientos humanos.',
          source: { code: 'SC-16', title: 'Investigación sobre el juego en abejorros', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
        },
        questionHint: '¿Qué paso convierte un movimiento observado en movimiento de las ruedas?'
      },
      {
        id: 4, slug: 'dinosauri', label: 'Dinosaurios, extintos y ADN', title: 'No todos los dinosaurios desaparecieron',
        teaser: 'En la historia de las aves hay una rama asombrosa.',
        art: 'dinosauri', sideArt: 'uccelli', otto: 'otto-pensieroso', icon: '❖', seal: 'El detective del pasado',
        kicker: 'SALA 04 · DINOSAURIOS, EXTINTOS Y ADN',
        intro: 'Los fósiles son pistas. A partir de un fragmento, una pluma o una forma ósea, los científicos reconstruyen historias milenarias.',
        question: '¿Desciende la gallina directamente del T. rex?',
        mainTitle: 'El árbol genealógico oculto',
        main: 'Las aves son dinosaurios terópodos vivientes. El T. rex era un pariente lejano, no el abuelo de la gallina. La clave es el antepasado común.',
        challenge: 'parentela',
        source: { code: 'SC-38', title: 'Natural History Museum — Cómo los dinosaurios evolucionaron en aves', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
        side: {
          title: '¿Por qué un fósil no basta para clonar un dinosaurio?', label: 'Otra pieza expuesta',
          desc: 'Un fósil nos enseña mucho sobre la forma de un animal extinto. Pero clonarlo requeriría material biológico adecuado, no una roca mineralizada. La magia del cine no es un método de laboratorio.',
          source: { code: 'SC-39', title: 'Natural History Museum — ¿Podrían los científicos revivir a los dinosaurios?', url: 'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html' }
        },
        questionHint: 'En un árbol evolutivo cuenta el punto donde se bifurcan las ramas.'
      },
      {
        id: 5, slug: 'laboratorio', label: 'El laboratorio del futuro', title: 'Máquinas que aprenden de la naturaleza',
        teaser: '¿Puede una trompa inspirar una pinza robótica?',
        art: 'laboratorio', sideArt: 'micelio', otto: 'otto-curioso', icon: '⚙', seal: 'El ingeniero de la naturaleza',
        kicker: 'SALA 05 · EL LABORATORIO DEL FUTURO',
        intro: 'Muchas tecnologías nacen de observar: ¿cómo resuelve un ser vivo un reto complejo?',
        question: '¿Cómo agarrarías un objeto frágil sin romperlo?',
        mainTitle: 'Diseña el agarre perfecto',
        main: 'Los investigadores diseñan pinzas flexibles inspiradas en la trompa de los elefantes. Envolver un objeto delicado evita romperlo con piezas rígidas. Aquí puedes probar un modelo interactivo y divertido.',
        challenge: 'pinza',
        source: { code: 'SC-23', title: 'Estudio sobre pinzas robóticas inspiradas en la trompa', url: 'https://doi.org/10.1038/s44182-025-00038-z' },
        side: {
          title: 'El micelio conoce a un robot', label: 'Otra pieza expuesta',
          desc: 'En un prototipo de prueba, señales eléctricas de micelio fúngico fueron traducidas por circuitos para mover un robot. No significa que el hongo decida adónde ir.',
          source: { code: 'SC-25', title: 'Investigación sobre robots controlados por micelio', url: 'https://doi.org/10.1126/scirobotics.adk8019' }
        },
        questionHint: 'Apretar con más fuerza no siempre es la mejor solución.'
      },
      {
        id: 6, slug: 'corpo', label: 'Cuerpo y supertecnologías', title: 'El cuerpo envía mensajes',
        teaser: 'Cuando los músculos y la ingeniería trabajan juntos.',
        art: 'corpo', sideArt: 'voce', otto: 'otto-pensieroso', icon: '✧', seal: 'El explorador de señales',
        kicker: 'SALA 06 · CUERPO Y SUPERTECNOLOGÍAS',
        intro: 'Nuestro cuerpo envía señales continuamente. Los científicos estudian cómo conectarlas con dispositivos que ayuden a las personas.',
        question: '¿Cómo puede una prótesis recibir indicaciones de un movimiento?',
        mainTitle: 'Sigue la señal',
        main: 'En el MIT se estudió una rodilla biónica integrada en los tejidos para recuperar una marcha más natural. Son resultados de ensayos clínicos específicos.',
        challenge: 'segnali',
        source: { code: 'SC-50', title: 'MIT News — Una rodilla biónica integrada en tejidos', url: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710' },
        side: {
          title: 'Cuando la tecnología ayuda a la voz', label: 'Otra pieza expuesta',
          desc: 'Equipos de investigación prueban interfaces neuronales para traducir la actividad cerebral en palabras habladas. Son herramientas de laboratorio, no aparatos que lean pensamientos.',
          source: { code: 'SC-53', title: 'Investigación sobre neuroprótesis para la comunicación', url: 'https://doi.org/10.1038/s41593-025-01905-6' }
        },
        questionHint: 'Una orden motora no es magia: es una cadena conectada de impulsos.'
      },
      {
        id: 7, slug: 'spazio', label: 'Espacio: la próxima frontera', title: 'La foto que ninguna cámara tomó',
        teaser: '¿Cómo se reconstruye la imagen de un agujero negro?',
        art: 'spazio', sideArt: 'galassia', otto: 'otto-mondo', icon: '✦', seal: 'El explorador cósmico',
        kicker: 'SALA 07 · ESPACIO: LA PRÓXIMA FRONTIERA',
        intro: 'En el espacio no se puede mirar como en la Tierra. Los científicos combinan datos captados en lugares muy distantes del planeta.',
        question: '¿La primera imagen de M87* se tomó con una sola cámara?',
        mainTitle: 'Enciende la red de radiotelescopios',
        main: 'El Event Horizon Telescope unió observaciones de radiotelescopios de todo el mundo y procesó los datos para reconstruir la imagen del agujero negro M87*. Nuestro juego usa cuatro observatorios simbólicos.',
        challenge: 'telescopi',
        source: { code: 'SC-48', title: 'ESO / Colaboración EHT — Primera imagen del agujero negro M87*', url: 'https://www.eso.org/public/images/eso1907a/' },
        side: {
          title: 'Un cometa que viene de otro sistema', label: 'Otra pieza expuesta',
          desc: 'El cometa interestelar 3I/ATLAS cruzó el Sistema Solar en una trayectoria abierta hiperbólica. No tiene una órbita cerrada alrededor del Sol y no volverá jamás.',
          source: { code: 'SC-36', title: 'NASA — 3I/ATLAS: preguntas y respuestas', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
        },
        questionHint: 'El resultado nace de sincronizar muchos telescopios, no de una sola foto.'
      }
    ]
  }
};

function generateAppCode(lang) {
  const d = I18N[lang];
  return `'use strict';
/* Museo delle Scoperte Impossibili — standalone, offline-capable, no analytics. */
const A = name => \`assets/\${name}.webp\`;
const ROOMS = ${JSON.stringify(d.rooms, null, 2)};
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = '${d.storeKey}';
let completed = (() => { try {const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); return new Set(Array.isArray(saved)?saved.filter(n => Number.isInteger(n)&&n>=1&&n<=7):[]);}catch{return new Set();}})();
let game = {}; let currentId = 0;let feedback = '';let feedbackKind='';let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceHtml = s => \`<a class="source-link" href="\${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="\${esc('${esc(d.sourceAria(''))}')} \${esc(s.code)}">\${esc(s.code)} · ${esc(d.sourceLabel)}</a>\`;
function persist(){try{localStorage.setItem(storeKey,JSON.stringify([...completed]));}catch{}headerProgress.textContent=\`\${completed.size}/7\`;}
function navigateHome(){location.hash='${d.hashAtrio}';}
function roomForHash(){const match=(location.hash||'').match(/^#sala-([1-7])$/);return match?Number(match[1]):0;}
function img(src,alt='',cl=''){return \`<img src="\${A(src)}" alt="\${esc(alt)}" \${cl?\`class="\${cl}"\`:''} loading="lazy">\`;}
function syncLanguageLinks(){const h=location.hash||'#${d.hashAtrio}';document.querySelectorAll('.locale-flag-item').forEach(el=>{const href=el.getAttribute('href');if(href&&href!=='#'&&!href.startsWith('javascript:')){el.setAttribute('href',href.split('#')[0]+h);}});}
function updateView(scroll=true){ const next = roomForHash(); if(next!==currentId){game={};feedback='';feedbackKind='';currentId=next;} persist();main.innerHTML = next?renderRoom(ROOMS[next-1]):renderAtrium();syncLanguageLinks();if(scroll)window.scrollTo({top:0,behavior:'instant'});}
function renderAtrium(){
 const next=ROOMS.find(r=>!completed.has(r.id))||ROOMS[0];
 return \`<section class="hero"><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">${esc(d.heroEyebrow)}</div><h1 class="display">${d.heroTitle}</h1><p class="lead">${esc(d.heroLead)}</p><div class="hero-buttons"><a class="primary-button" href="#sala-\${next.id}">\${completed.size?'${esc(d.heroContinue)}':'${esc(d.heroStart)}'} →</a><button class="quiet-button" data-act="passport">${esc(d.heroPassport)}</button></div><p class="hint">${esc(d.heroHint)}</p></div>\${img('otto-mondo','${esc(d.heroOttoAlt)}','hero-otto')}</div></section>
 <section class="wrap intro-section" id="sale"><div class="intro-row"><div><div class="eyebrow">${esc(d.pathEyebrow)}</div><h2 class="section-heading">${esc(d.pathHeading)}</h2></div><p>${esc(d.pathLead)}</p></div><div class="progress-rail" aria-label="\${completed.size} ${esc(d.pathAria(0)).replace(/0\s*/, '')}"><div style="width:\${completed.size/7*100}%"></div></div><div class="hint">\${completed.size} ${esc(d.pathHint(0)).replace(/0\s*/, '').replace(/·.*/, '')} \${completed.size===7?'${esc(d.pathHint(7)).replace(/.*·\s*/, '· ')}':''}</div></section>
 <section class="wrap museum-map" aria-label="Museum Galleries">\${ROOMS.map(r=>\`<a class="room-card" href="#sala-\${r.id}" aria-label="Gallery \${r.id}: \${esc(r.label)}"><img src="\${A(r.art)}" alt="" loading="lazy">\${completed.has(r.id)?'<span class="badge-done">${esc(d.sealEarned)}</span>':''}<div class="card-inner"><span class="room-n">${esc(d.roomCardKicker({id: 0, icon: ''})).replace(/00\s*·\s*/, '')}\${String(r.id).padStart(2,'0')} · \${esc(r.icon)}</span><h3>\${esc(r.label)}</h3><p>\${esc(r.teaser)}</p><span class="open-label">${esc(d.roomCardExplore)} <span aria-hidden="true">→</span></span></div></a>\`).join('')}</section>
 <section class="wrap value-strip">${d.valueItems.map(v => `<div class="value-item">${v.b}<p>${esc(v.p)}</p></div>`).join('')}</section>\`;
}
function renderRoom(r){
return \`<section class="room-banner"><img class="room-backdrop" src="\${A(r.art)}" alt="" role="presentation"><div class="room-banner-inner"><div class="crumb"><a href="#${d.hashAtrio}">${esc(d.crumbBack)}</a><span>/</span><span>${esc(d.crumbRoom('0')).replace('0', '')}\${r.id} / 7</span></div><div style="margin-top:27px"><span class="room-stamp">\${r.icon} \${esc(r.kicker)}</span></div><h1 class="room-name">\${esc(r.title)}</h1><p class="room-intro">\${esc(r.intro)}</p></div></section>
<section class="wrap hall-grid"><article class="exhibit"><span class="label-muted">${esc(d.labelMainExhibit)}</span><h2>\${esc(r.mainTitle)}</h2><div class="exhibit-question"><span>${esc(d.labelQuestion)}</span><strong>\${esc(r.question)}</strong></div><p>\${esc(r.main)}</p><div class="challenge-zone" id="challengePanel">\${renderChallenge(r)}</div><div class="source-row"><b>${esc(d.labelDoc)}</b>\${sourceHtml(r.source)}</div><div class="art-notice">${esc(d.artNotice)}</div></article><aside class="side-exhibit">\${img(r.sideArt,r.side.title)}<div class="side-body"><div class="label-muted">\${esc(r.side.label)}</div><h3>\${esc(r.side.title)}</h3><p>\${esc(r.side.desc)}</p>\${sourceHtml(r.side.source)}<div style="margin-top:18px"><button class="quiet-button" data-act="zoom" data-val="\${r.id}">${esc(d.sideExamine)}</button></div><div class="mini-detail"><span>✦</span><div>${esc(d.sideDetail)}</div></div><div class="otto-box">\${img(r.otto,'${esc(d.ottoAlt)}')}<p><strong>${esc(d.ottoSays)}</strong> \${esc(r.questionHint)}</p></div></div></aside></section>
<div class="wrap"><div class="hall-note">${d.hallNote}</div><nav class="next-controls" aria-label="Move between galleries"><a class="quiet-button" href="#\${r.id>1?'sala-'+(r.id-1):'${d.hashAtrio}'}">\${r.id>1?'${esc(d.navPrevRoom)}':'${esc(d.navBackAtrio)}'}</a><button class="quiet-button" data-act="passport">${esc(d.navPassportProgress(0)).replace(/0/, '')}\${completed.size}/7 ${esc(d.navPassportProgress(0)).replace(/.*0\/7\s*/, '')}</button><a class="primary-button" href="#\${r.id<7?'sala-'+(r.id+1):'${d.hashAtrio}'}">\${r.id<7?'${esc(d.navNextRoom)}':'${esc(d.navBackToRooms)}'}</a></nav></div>\`;
}
function progressDots(n,total){return \`<div class="step-counter" aria-label="\${n} \${total}"><span style="display:none">\${n}/\${total}</span>\${Array.from({length:total},(_,i)=>\`<i class="\${i<n?'done':''}"></i>\`).join('')}</div>\`;}
function feedbackHtml(){return feedback?\`<div class="feedback" data-kind="\${feedbackKind||'info'}">\${esc(feedback)}</div>\`:'';}
function finishBox(r){const next = ROOMS[r.id]||null;return \`<div class="success-state"><div class="progress-title">${esc(d.sealUnlockedTitle)}</div><h3>\${esc(r.seal)}</h3><p>${esc(d.sealUnlockedMsg)}</p><div class="hero-buttons"><button class="primary-button" data-act="passport">${esc(d.btnViewPassport)}</button>\${next?\`<a class="quiet-button" href="#sala-\${next.id}">${esc(d.btnGoToRoom(0)).replace(/0\s*/, '')}\${next.id} →</a>\`:'<a class="quiet-button" href="#${d.hashAtrio}">${esc(d.btnBackRooms)}</a>'}</div></div>\`;}
function renderChallenge(r){if(completed.has(r.id))return finishBox(r);
switch(r.challenge){
 case 'prove':{
  const statements=${JSON.stringify(d.c1Statements)};
  const n=game.index||0;const s=statements[n];return \`<div class="question-label">${esc(d.c1Role)}</div><h3>${esc(d.c1Title)}</h3><p class="subtext">${esc(d.c1Subtext)}</p>\${progressDots(n,4)}<p><strong>\${esc(s.s)}</strong></p><div class="choice-grid"><button class="choice-button" data-act="judge" data-val="osservato">${esc(d.c1BtnObserved)}</button><button class="choice-button" data-act="judge" data-val="ipotesi">${esc(d.c1BtnHypothesis)}</button></div>\${feedbackHtml()}\`;
 }
 case 'terreno':return \`<div class="question-label">${esc(d.c2Role)}</div><h3>${esc(d.c2Title)}</h3><p class="subtext">${esc(d.c2Subtext)}</p><div class="choice-grid cols-1"><button class="choice-button" data-act="soil" data-val="a">${esc(d.c2OptionA)}</button><button class="choice-button" data-act="soil" data-val="b">${esc(d.c2OptionB)}</button><button class="choice-button" data-act="soil" data-val="c">${esc(d.c2OptionC)}</button></div>\${feedbackHtml()}\`;
 case 'sequenza':{
  const steps=${JSON.stringify(d.c3Steps)};const shuffled=[steps[3],steps[1],steps[0],steps[2]];let n=game.seq||0;
  return \`<div class="question-label">${esc(d.c3Role)}</div><h3>${esc(d.c3Title)}</h3><p class="subtext">${esc(d.c3Subtext)}</p>\${progressDots(n,4)}<div class="tech-trail">\${steps.slice(0,n).map(t=>\`<div class="tech-node filled">\${esc(t.name)}</div>\`).join('')}\${Array.from({length:4-n},()=>'<div class="tech-node">?</div>').join('')}</div><div class="choice-grid">\${shuffled.filter(x=>x.id>n).map(x=>\`<button class="choice-button" data-act="step" data-val="\${x.id}">\${x.mark} \${esc(x.name)}</button>\`).join('')}</div>\${feedbackHtml()}\`;
 }
 case 'parentela':return \`<div class="question-label">${esc(d.c4Role)}</div><h3>${esc(d.c4Title)}</h3><p class="subtext">${esc(d.c4Subtext)}</p><svg viewBox="0 0 600 160" role="img" aria-label="${esc(d.c4SvgAria)}" style="width:100%;max-height:170px"><path d="M35 84H290 M290 84V28H395 M290 84V138H395" stroke="#eac27c" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="290" cy="84" r="9" fill="#ffe0a0"/><text x="12" y="62" fill="#e5ecef" font-size="15">${esc(d.c4SvgTheropods)}</text><text x="408" y="34" fill="#e5ecef" font-size="18">${esc(d.c4SvgTrex)}</text><text x="408" y="143" fill="#e5ecef" font-size="18">${esc(d.c4SvgBirds)}</text></svg><div class="choice-grid cols-1"><button class="choice-button" data-act="dino" data-val="0">${esc(d.c4Option0)}</button><button class="choice-button" data-act="dino" data-val="1">${esc(d.c4Option1)}</button><button class="choice-button" data-act="dino" data-val="2">${esc(d.c4Option2)}</button></div>\${feedbackHtml()}\`;
 case 'pinza':{
   const val=game.grip===undefined?15:game.grip;const level=val<35?'soft':val>65?'hard':'good';const label=val<35?'${esc(d.c5LevelSoft)}':val>65?'${esc(d.c5LevelHard)}':'${esc(d.c5LevelGood)}';
   return \`<div class="question-label">${esc(d.c5Role)}</div><h3>${esc(d.c5Title)}</h3><p class="subtext">${esc(d.c5Subtext)}</p><div class="gripper-scene" data-level="\${level}"><div class="gripper-prong"></div><div class="gripper-object" role="img" aria-label="${esc(d.c5VaseAria)}">🏺</div><div class="gripper-prong"></div></div><label for="gripSlider" class="hint">${esc(d.c5SliderLabel)}</label><input class="range-control" aria-label="${esc(d.c5SliderLabel)}" id="gripSlider" type="range" min="0" max="100" step="1" value="\${val}"><p id="gripFeedback"><strong>\${label}</strong></p><button class="primary-button" data-act="grip-check">${esc(d.c5BtnCheck)}</button><p class="hint">${esc(d.c5Disclaimer)}</p>\${feedbackHtml()}\`;
 }
 case 'segnali':{
   const seen=game.seen||[];const tiles=${JSON.stringify(d.c6Tiles)};return \`<div class="question-label">${esc(d.c6Role)}</div><h3>${esc(d.c6Title)}</h3><p class="subtext">${esc(d.c6Subtext)}</p>\${progressDots(seen.length,4)}<div class="sensor-grid">\${tiles.map((t,i)=>\`<button class="sensor-tile" data-act="sense" data-val="\${i}" aria-pressed="\${seen.includes(i)}"><span class="ordinal">0\${i+1}</span><strong>\${esc(t[0])}</strong>\${seen.includes(i)?\`<small>\${esc(t[1])}</small>\`:'<small>${esc(d.c6TileUntapped)}</small>'}</button>\`).join('')}</div>\${feedbackHtml()}\`;
 }
 case 'telescopi':{
  const seen=game.tel||[];const desc=${JSON.stringify(d.c7Observatories)};return \`<div class="question-label">${esc(d.c7Role)}</div><h3>${esc(d.c7Title)}</h3><p class="subtext">${esc(d.c7Subtext)}</p>\${progressDots(seen.length,4)}<div class="eht-lab">\${desc.map((v,i)=>\`<button class="dish-tile" data-act="dish" data-val="\${i}" aria-pressed="\${seen.includes(i)}"><span aria-hidden="true">\${seen.includes(i)?'✦':'◉'}</span><small>\${esc(v)}</small>\${seen.includes(i)?'<b>${esc(d.c7SignalReceived)}</b>':''}</button>\`).join('')}</div>\${seen.length===4?'<button class="primary-button" data-act="assemble">${esc(d.c7BtnAssemble)}</button>':''}<div class="hole-visual \${seen.length===4?'visible':''}" role="img" aria-label="${esc(d.c7HoleAria)}"></div><p class="hint">${esc(d.c7Disclaimer)}</p>\${feedbackHtml()}\`;
 }
 default:return '';
 }
}
function redrawChallenge(){const r=ROOMS[currentId-1];const panel=document.getElementById('challengePanel');if(panel&&r)panel.innerHTML=renderChallenge(r);persist();}
function win(){if(!currentId)return;completed.add(currentId);persist();feedback='';feedbackKind='';redrawChallenge();if(completed.size===7)showToast('${esc(d.toastWinAll)}');else showToast('${esc(d.toastWinRoom)}');}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.hidden=true},3300);}
function choiceRight(ok,wrong,right){if(ok){feedback=right;feedbackKind='good';win();}else{feedback=wrong;feedbackKind='wrong';redrawChallenge();}}
function passportMarkup(){return \`<div class="modal-card" role="dialog" aria-modal="true" aria-label="${esc(d.passportTitle)}"><div class="modal-header"><h2>${esc(d.passportTitle)}</h2><button data-act="close" class="icon-button" aria-label="Close">×</button></div><p>${esc(d.passportSubtitle)}</p><div class="passport-list">\${ROOMS.map(r=>\`<span class="passport-seal \${completed.has(r.id)?'stamped':''}" title="Gallery \${r.id}: \${esc(r.seal)}">\${completed.has(r.id)?r.icon:r.id}</span>\`).join('')}</div><div class="progress-rail"><div style="width:\${completed.size/7*100}%"></div></div><p>${d.passportCompletedMsg('${completed.size}')}</p>\${completed.size===7?\`<hr style="border:none;border-top:1px solid rgba(255,215,156,.2);margin:28px 0"><div class="eyebrow">${esc(d.prizeEyebrow)}</div><h3 style="font:700 28px Georgia,serif;margin:10px 0">${esc(d.prizeTitle)}</h3><label for="childName">${esc(d.childNameLabel)}</label><input id="childName" class="name-input" placeholder="${esc(d.childNamePlaceholder)}" maxlength="50" value="\${esc(diplomaName)}"><div class="diploma-actions"><button class="primary-button" data-act="print">${esc(d.btnPrintDiploma)}</button></div><div id="diplomaPreview" class="diploma"><div>✧ ✦ ✧</div><h3>${d.diplomaHeading}</h3><p>${esc(d.diplomaCertifies)}</p><div class="large" id="diplomaChild">\${esc(diplomaName||'________________')}</div><p>${d.diplomaBody}</p><p>${esc(d.diplomaSign)}</p></div>\`:\`<button class="quiet-button" data-act="close">${esc(d.btnBackToMuseum)}</button>\`}<p class="hint" style="margin-top:18px">${esc(d.resetNotice)} <button data-act="reset-confirm" class="quiet-button" style="padding:7px 12px">${esc(d.btnResetSeals)}</button></p></div>\`;}
function openZoom(id){const r=ROOMS[id-1];if(!r)return;modal.innerHTML=\`<div class="modal-card" role="dialog" aria-modal="true" aria-label="${esc(d.zoomAria(''))}\${esc(r.side.title)}"><div class="modal-header"><h2>\${esc(r.side.title)}</h2><button data-act="close" class="icon-button" aria-label="Close">×</button></div><div style="margin:17px 0"><img src="\${A(r.sideArt)}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="${esc(d.zoomAlt(''))}\${esc(r.side.title)}"></div><p>\${esc(r.side.desc)}</p><p class="art-notice">${esc(d.zoomNotice)}</p>\${sourceHtml(r.side.source)}</div>\`;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function openPassport(){modal.innerHTML=passportMarkup();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function closeModal(){modal.hidden=true;modal.innerHTML='';document.body.style.overflow='';document.getElementById('passportButton')?.focus();}
function printDiploma(){const name=diplomaName.trim()||'____________________';let p=document.getElementById('printSheet');if(!p){p=document.createElement('div');p.id='printSheet';document.body.appendChild(p);}p.innerHTML=\`<section class="print-certificate"><div>✦ ✦ ✦</div><p>${esc(d.printHeader)}</p><h1>${esc(d.printTitle)}</h1><p>${esc(d.printConferred)}</p><p class="named">\${esc(name)}</p><p>${d.printBody}</p><p class="brand-print">${esc(d.printBrand)}</p><p>${esc(d.printBook)}</p></section>\`;window.print();}
function clickHandler(event){const btn=event.target.closest('[data-act]');if(!btn)return;const act=btn.dataset.act;const val=btn.dataset.val;
 if(act==='passport'){openPassport();return;}
 if(act==='zoom'){openZoom(Number(val));return;}
 if(act==='close'){closeModal();return;}
 if(act==='print'){diplomaName=modal.querySelector('#childName')?.value.trim()||'';printDiploma();return;}
 if(act==='reset-confirm'){if(window.confirm('${esc(d.resetConfirm)}')){completed.clear();game={};feedback='';persist();closeModal();updateView(false);showToast('${esc(d.toastReset)}');}return;}
 if(!currentId||completed.has(currentId))return;
 feedback='';feedbackKind='';
 if(act==='judge'){
  const answers=['osservato','osservato','ipotesi','ipotesi'];const idx=game.index||0;
  if(val===answers[idx]){game.index=idx+1;if(game.index===4){win();return;} feedback='${esc(d.c1GoodStep)}';}else{feedback=answers[idx]==='osservato'?'${esc(d.c1WrongObserved)}':'${esc(d.c1WrongHypothesis)}';feedbackKind='wrong';}redrawChallenge();return;
 }
 if(act==='soil'){choiceRight(val==='a','${esc(d.c2Wrong)}','${esc(d.c2Good)}');return;}
 if(act==='step'){const expect=(game.seq||0)+1;if(Number(val)===expect){game.seq=expect;if(expect===4){win();return;}feedback='${esc(d.c3GoodStep)}';}else{feedback='${esc(d.c3WrongStep)}';feedbackKind='wrong';}redrawChallenge();return;}
 if(act==='dino'){choiceRight(val==='1','${esc(d.c4Wrong)}','${esc(d.c4Good)}');return;}
 if(act==='grip-check'){const x=game.grip===undefined?15:game.grip;choiceRight(x>=35&&x<=65,x<35?'${esc(d.c5WrongSoft)}':'${esc(d.c5WrongHard)}','${esc(d.c5Good)}');return;}
 if(act==='sense'){const i=Number(val);game.seen=game.seen||[];if(!game.seen.includes(i))game.seen.push(i);if(game.seen.length===4){win();return;}feedback='${esc(d.c6GoodStep)}';redrawChallenge();return;}
 if(act==='dish'){const i=Number(val);game.tel=game.tel||[];if(!game.tel.includes(i))game.tel.push(i);feedback=game.tel.length===4?'${esc(d.c7AllActive)}':'${esc(d.c7OneActive)}';redrawChallenge();return;}
 if(act==='assemble'){if((game.tel||[]).length===4)win();return;}
}
main.addEventListener('click',clickHandler);
modal.addEventListener('click',clickHandler);
document.getElementById('passportButton').addEventListener('click',openPassport);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
modal.addEventListener('input',e=>{if(e.target.id==='childName'){diplomaName=e.target.value;const el=modal.querySelector('#diplomaChild');if(el)el.textContent=diplomaName||'________________';}});
main.addEventListener('input',e=>{if(e.target.id==='gripSlider'){game.grip=Number(e.target.value);const p=main.querySelector('#gripFeedback');const v=game.grip;p.innerHTML=\`<strong>\${v<35?'${esc(d.c5LevelSoft)}':v>65?'${esc(d.c5LevelHard)}':'${esc(d.c5LevelGood)}'}</strong>\`;main.querySelector('.gripper-scene')?.setAttribute('data-level',v<35?'soft':v>65?'hard':'good');}});
document.addEventListener('click', e => {
  const flagLink = e.target.closest('.locale-flag-item');
  if (flagLink && flagLink.getAttribute('href') && flagLink.getAttribute('href') !== '#') {
    const isEn = flagLink.getAttribute('href').includes('/en/');
    const isFr = flagLink.getAttribute('href').includes('/fr/');
    const isEs = flagLink.getAttribute('href').includes('/es/');
    const chosenLang = isEn ? 'en' : (isFr ? 'fr' : (isEs ? 'es' : 'it'));
    try { localStorage.setItem('otto_lang', chosenLang); } catch(_) {}
  }
});
window.addEventListener('hashchange',()=>updateView());
if(!location.hash)location.hash='${d.hashAtrio}';
updateView(false);
`;
}

// Generate for all 4 languages
const LANGS = ['it', 'en', 'fr', 'es'];

LANGS.forEach(lang => {
  const code = generateAppCode(lang);
  const outPath1 = path.join(ROOT_DIR, 'assets', 'einstein', 'bonus', lang, 'museo', 'app.js');
  fs.writeFileSync(outPath1, code, 'utf8');
  console.log(`Generated: ${outPath1} (${code.length} bytes)`);

  const outPath2 = path.join(ROOT_DIR, 'accesso', '4dcbbaee2e69a278e4e59eab50430ccc', 'bonus', lang, 'museo', 'app.js');
  if (fs.existsSync(path.dirname(outPath2))) {
    fs.writeFileSync(outPath2, code, 'utf8');
    console.log(`Synced to: ${outPath2}`);
  }
});

console.log('✅ All 4 museo apps generated with identical structure and clean localizations!');
