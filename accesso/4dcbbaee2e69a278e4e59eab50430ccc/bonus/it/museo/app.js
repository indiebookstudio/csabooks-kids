'use strict';
/* Museo delle Scoperte Impossibili — standalone, offline-capable, no analytics. */
const A = name => `assets/${name}.webp`;
const ROOMS = [
  {
    id:1, slug:'animali', label:'Animali fuori dal comune', title:'Il mare che nasconde indizi',
    teaser:'Un’alga può diventare uno strumento? E le bolle una rete?',
    art:'animali', sideArt:'orche', otto:'otto-curioso', icon:'◉', seal:'La lente marina',
    kicker:'SALA 01 · ANIMALI FUORI DAL COMUNE',
    intro:'Alcuni animali sorprendono gli scienziati non perché siano magici, ma perché fanno cose che nessuno si aspettava.',
    question:'Un video può mostrarci che cosa succede. Ma può dirci subito perché?',
    mainTitle:'Il caso dell’alga misteriosa',
    main:'Nel Mare di Salish i ricercatori hanno ripreso orche che staccano un tratto di alga e lo fanno rotolare tra i loro corpi. Una cosa è vedere il movimento; un’altra è capire a che cosa serva.',
    challenge:'prove',
    source:{code:'SC-04',title:'Studio sul comportamento delle orche (Current Biology)',url:'https://doi.org/10.1016/j.cub.2025.04.021'},
    side:{title:'La balena che pesca con le bolle',label:'Un altro reperto',desc:'Alcune megattere producono reti di bolle per concentrare i pesci. Le bolle non sono una rete solida: modificano il comportamento delle prede. La forma e il modo in cui vengono usate possono variare.',source:{code:'SC-05',title:'Ricerca sulle reti di bolle delle megattere',url:'https://doi.org/10.1098/rsos.240328'}},
    questionHint:'Guarda l’alga, ma soprattutto osserva che cosa fanno gli animali con essa.'
  },
  {
    id:2,slug:'piante',label:'Piante e piccoli mondi',title:'Un giardino che non dovrebbe esistere',
    teaser:'Germogli sulla polvere lunare e felci dal DNA gigantesco.',
    art:'piante',sideArt:'felce-dna',otto:'otto-pensieroso',icon:'✿',seal:'Il germoglio lunare',
    kicker:'SALA 02 · PIANTE E PICCOLI MONDI',
    intro:'Le piante sembrano immobili, ma sono organismi pieni di risposte sorprendenti. Anche la polvere della Luna è diventata parte di una ricerca.',
    question:'Per sapere se una pianta cresce nella regolite lunare, che cosa dobbiamo confrontare?',
    mainTitle:'Il seme e la polvere della Luna',
    main:'In laboratorio alcuni semi sono germogliati in piccoli campioni di regolite raccolti dalle missioni Apollo. Le piante però hanno mostrato segni di stress. Crescere, quindi, non vuol dire crescere bene come in un terreno adatto.',
    challenge:'terreno',
    source:{code:'SC-12',title:'Plants grown in Apollo lunar regolith (Communications Biology)',url:'https://doi.org/10.1038/s42003-022-03334-8'},
    side:{title:'La felce che sorprende il DNA',label:'Un altro reperto',desc:'Una piccola felce del genere Tmesipteris possiede un genoma enorme. La quantità di DNA non misura l’intelligenza o la “superiorità” di un organismo: è una caratteristica biologica, da comprendere nel suo contesto.',source:{code:'SC-13',title:'Studio sul genoma di Tmesipteris',url:'https://doi.org/10.1016/j.isci.2024.109889'}},
    questionHint:'In un confronto scientifico, cerca di cambiare un elemento alla volta.'
  },
  {
    id:3,slug:'esperimenti',label:'Esperimenti sorprendenti',title:'Il pesce e le quattro ruote',
    teaser:'Chi comanda davvero una vasca che si muove?',
    art:'esperimenti',sideArt:'pesce',otto:'otto-curioso',icon:'⌁',seal:'L’inventore curioso',
    kicker:'SALA 03 · ESPERIMENTI SORPRENDENTI',
    intro:'Una buona invenzione non è magia: è una catena di passaggi che possiamo ricostruire, controllare e spiegare.',
    question:'Come fa un pesce a spostare un veicolo terrestre senza toccare le ruote?',
    mainTitle:'Rimetti in ordine il laboratorio',
    main:'In un esperimento i ricercatori hanno montato una vasca su una piattaforma motorizzata. Un sistema rilevava posizione e movimento del pesce e li trasformava in comandi per le ruote. Il pesce non guidava con un volante.',
    challenge:'sequenza',
    source:{code:'SC-15',title:'Fish-operated vehicle: studio comportamentale',url:'https://doi.org/10.1016/j.bbr.2021.113711'},
    side:{title:'I bombi e le palline',label:'Un altro reperto',desc:'In alcuni esperimenti i bombi hanno fatto rotolare piccole palline anche senza un premio immediato. I ricercatori hanno studiato se il comportamento fosse compatibile con il gioco: non serve inventare pensieri umani nella loro testa.',source:{code:'SC-16',title:'Ricerca sul rotolamento delle palline nei bombi',url:'https://doi.org/10.1016/j.anbehav.2022.08.013'}},
    questionHint:'Quale passaggio trasforma un movimento osservato in movimento delle ruote?'
  },
  {
    id:4,slug:'dinosauri',label:'Dinosauri, estinti e DNA',title:'I dinosauri non se ne sono andati tutti',
    teaser:'Nella storia degli uccelli c’è un ramo sorprendente.',
    art:'dinosauri',sideArt:'uccelli',otto:'otto-pensieroso',icon:'❖',seal:'Il detective del passato',
    kicker:'SALA 04 · DINOSAURI, ESTINTI E DNA',
    intro:'Le ossa fossili sono indizi. Da un frammento, una piuma o una somiglianza tra scheletri, i ricercatori ricostruiscono storie lunghissime.',
    question:'La gallina discende direttamente dal T. rex?',
    mainTitle:'L’albero di famiglia nascosto',
    main:'Gli uccelli sono dinosauri viventi appartenenti al gruppo dei teropodi. Il T. rex era un loro parente lontano, non il nonno di una gallina. La parola chiave è antenato comune.',
    challenge:'parentela',
    source:{code:'SC-38',title:'Natural History Museum — How dinosaurs evolved into birds',url:'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html'},
    side:{title:'Perché non basta un fossile per clonare un dinosauro?',label:'Un altro reperto',desc:'Un fossile può raccontarci tantissimo sulla forma di un animale antico. Ma per clonarlo servirebbe materiale biologico adeguato, non semplicemente un osso trasformato in roccia. La fantasia dei film non è un protocollo scientifico.',source:{code:'SC-39',title:'Natural History Museum — Could scientists bring dinosaurs back?',url:'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html'}},
    questionHint:'In un albero evolutivo conta il punto in cui i rami si separano.'
  },
  {
    id:5,slug:'laboratorio',label:'Il laboratorio del futuro',title:'Macchine che imparano dalla natura',
    teaser:'Una proboscide può suggerire come costruire una pinza?',
    art:'laboratorio',sideArt:'micelio',otto:'otto-curioso',icon:'⚙',seal:'L’ingegnere della natura',
    kicker:'SALA 05 · IL LABORATORIO DEL FUTURO',
    intro:'Molte tecnologie nascono da un’osservazione: come fa un organismo vivente a risolvere un problema difficile?',
    question:'Come afferreresti un oggetto delicato senza rovinarlo?',
    mainTitle:'Progetta la presa perfetta',
    main:'I ricercatori progettano pinze flessibili ispirandosi anche alla proboscide degli elefanti. Avvolgere un oggetto può essere utile quando una presa rigida rischia di danneggiarlo. Qui puoi provare un modello giocoso, non una simulazione tecnica reale.',
    challenge:'pinza',
    source:{code:'SC-23',title:'Studio su una presa robotica ispirata alla proboscide',url:'https://doi.org/10.1038/s44182-025-00038-z'},
    side:{title:'Il micelio incontra un robot',label:'Un altro reperto',desc:'In un prototipo sperimentale, segnali elettrici registrati da un micelio fungino sono stati interpretati da circuiti progettati dagli ingegneri e usati per controllare un robot. Non significa che il fungo abbia deciso dove andare.',source:{code:'SC-25',title:'Ricerca sul robot controllato da segnali del micelio',url:'https://doi.org/10.1126/scirobotics.adk8019'}},
    questionHint:'Non vince sempre chi stringe più forte.'
  },
  {
    id:6,slug:'corpo',label:'Corpo e supertecnologie',title:'Il corpo manda messaggi',
    teaser:'Quando muscoli e ingegneria lavorano insieme.',
    art:'corpo',sideArt:'voce',otto:'otto-pensieroso',icon:'✧',seal:'L’esploratore dei segnali',
    kicker:'SALA 06 · CORPO E SUPERTECNOLOGIE',
    intro:'Il nostro corpo invia continuamente segnali. Gli scienziati studiano come collegarli a dispositivi che aiutano le persone.',
    question:'Come può una protesi ricevere indicazioni da un movimento?',
    mainTitle:'Segui il segnale',
    main:'Al MIT è stata studiata una protesi di ginocchio integrata con i tessuti per recuperare movimenti più naturali. Tecniche e risultati si riferiscono a specifici studi clinici: non tutte le protesi funzionano allo stesso modo.',
    challenge:'segnali',
    source:{code:'SC-50',title:'MIT News — A bionic knee integrated into tissue',url:'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710'},
    side:{title:'Quando la tecnologia aiuta la voce',label:'Un altro reperto',desc:'Alcuni gruppi di ricerca sperimentano interfacce neurali e sistemi digitali per trasformare segnali cerebrali in linguaggio. Sono tecnologie di ricerca, non strumenti che “leggono tutti i pensieri”.',source:{code:'SC-53',title:'Ricerca sulla neuroprotesi per la comunicazione',url:'https://doi.org/10.1038/s41593-025-01905-6'}},
    questionHint:'Un comando non nasce dalla magia: c’è una catena di segnali.'
  },
  {
    id:7,slug:'spazio',label:'Spazio: la prossima frontiera',title:'La foto che nessuna macchina ha scattato',
    teaser:'Come si ricostruisce l’immagine di un buco nero?',
    art:'spazio',sideArt:'galassia',otto:'otto-mondo',icon:'✦',seal:'L’esploratore cosmico',
    kicker:'SALA 07 · SPAZIO: LA PROSSIMA FRONTIERA',
    intro:'Nello spazio non sempre si possono vedere le cose come sulla Terra. Per questo gli scienziati mettono insieme dati raccolti in luoghi lontanissimi.',
    question:'La prima immagine di M87* è arrivata da una singola fotocamera?',
    mainTitle:'Accendi la rete dei radiotelescopi',
    main:'L’Event Horizon Telescope ha unito osservazioni radio raccolte da più osservatori e ha utilizzato metodi di elaborazione per ricostruire l’immagine intorno al buco nero M87*. Il nostro gioco usa quattro simboli: la rete reale è molto più complessa.',
    challenge:'telescopi',
    source:{code:'SC-48',title:'ESO / EHT Collaboration — prima immagine del buco nero M87*',url:'https://www.eso.org/public/images/eso1907a/'},
    side:{title:'Una cometa che viene da un altro sistema',label:'Un altro reperto',desc:'La cometa interstellare 3I/ATLAS ha attraversato il Sistema solare seguendo una traiettoria aperta. Non percorre un’orbita chiusa intorno al Sole come le comete periodiche legate gravitazionalmente al nostro sistema.',source:{code:'SC-36',title:'NASA — 3I/ATLAS: facts and FAQs',url:'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/'}},
    questionHint:'Il risultato nasce da più strumenti e da un lavoro di analisi, non da un unico scatto.'
  }
];
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-2026-progress-v1';
let completed = (() => { try {const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); return new Set(Array.isArray(saved)?saved.filter(n => Number.isInteger(n)&&n>=1&&n<=7):[]);}catch{return new Set();}})();
let game = {}; let currentId = 0;let feedback = '';let feedbackKind='';let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="Apri la fonte ${esc(s.code)} in una nuova scheda">${esc(s.code)} · Fonte originale ↗</a>`;
function persist(){try{localStorage.setItem(storeKey,JSON.stringify([...completed]));}catch{}headerProgress.textContent=`${completed.size}/7`;}
function navigateHome(){location.hash='atrio';}
function roomForHash(){const match=(location.hash||'').match(/^#sala-([1-7])$/);return match?Number(match[1]):0;}
function img(src,alt='',cl=''){return `<img src="${A(src)}" alt="${esc(alt)}" ${cl?`class="${cl}"`:''} loading="lazy">`;}
function updateView(scroll=true){ const next = roomForHash(); if(next!==currentId){game={};feedback='';feedbackKind='';currentId=next;} persist();main.innerHTML = next?renderRoom(ROOMS[next-1]):renderAtrium();if(scroll)window.scrollTo({top:0,behavior:'instant'});}
function renderAtrium(){
 const next=ROOMS.find(r=>!completed.has(r.id))||ROOMS[0];
 return `<section class="hero"><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">IL BONUS INTERATTIVO DEL LIBRO</div><h1 class="display">IL MUSEO DELLE<br><em>SCOPERTE</em><br>IMPOSSIBILI</h1><p class="lead">Sette sale. Sette misteri della scienza. Un piccolo polpo esploratore che ti aspetta. Entra, osserva, scopri gli indizi e colleziona i sigilli di Otto.</p><div class="hero-buttons"><a class="primary-button" href="#sala-${next.id}">${completed.size?'Continua l’esplorazione':'Inizia l’esplorazione'} →</a><button class="quiet-button" data-act="passport">Apri il passaporto</button></div><p class="hint">Per bambini e ragazzi 7–12 anni · Gratis con il libro · Nessun account necessario</p></div>${img('otto-mondo','Otto, il polpo esploratore, abbraccia la Terra','hero-otto')}</div></section>
 <section class="wrap intro-section" id="sale"><div class="intro-row"><div><div class="eyebrow">IL TUO PERCORSO</div><h2 class="section-heading">Scegli una porta.</h2></div><p>Puoi visitare le sale nell’ordine che preferisci. Ogni volta che risolvi un mistero, Otto aggiunge un sigillo al tuo passaporto.</p></div><div class="progress-rail" aria-label="${completed.size} sale visitate su 7"><div style="width:${completed.size/7*100}%"></div></div><div class="hint">${completed.size} sale completate su 7 ${completed.size===7?'· Il diploma è pronto!':''}</div></section>
 <section class="wrap museum-map" aria-label="Le sette sale del museo">${ROOMS.map(r=>`<a class="room-card" href="#sala-${r.id}" aria-label="Sala ${r.id}: ${esc(r.label)}"><img src="${A(r.art)}" alt="" loading="lazy">${completed.has(r.id)?'<span class="badge-done">✓ Sigillo ottenuto</span>':''}<div class="card-inner"><span class="room-n">SALA ${String(r.id).padStart(2,'0')} · ${esc(r.icon)}</span><h3>${esc(r.label)}</h3><p>${esc(r.teaser)}</p><span class="open-label">Esplora la sala <span aria-hidden="true">→</span></span></div></a>`).join('')}</section>
 <section class="wrap value-strip"><div class="value-item"><b>Osserva, non indovinare a caso.</b><p>Le attività partono da fatti e indizi. Dove gli scienziati hanno ancora dubbi, te lo diciamo.</p></div><div class="value-item"><b>Ogni sala racconta un’altra storia.</b><p>Non troverai sette volte lo stesso test: ogni enigma usa un meccanismo diverso.</p></div><div class="value-item"><b>Una fonte per ogni scoperta.</b><p>Puoi aprire gli articoli e i siti scientifici originali. Il codice SC corrisponde a quello del libro.</p></div></section>`;
}
function renderRoom(r){
return `<section class="room-banner"><img class="room-backdrop" src="${A(r.art)}" alt="" role="presentation"><div class="room-banner-inner"><div class="crumb"><a href="#atrio">← Atrio del museo</a><span>/</span><span>Sala ${r.id} di 7</span></div><div style="margin-top:27px"><span class="room-stamp">${r.icon} ${esc(r.kicker)}</span></div><h1 class="room-name">${esc(r.title)}</h1><p class="room-intro">${esc(r.intro)}</p></div></section>
<section class="wrap hall-grid"><article class="exhibit"><span class="label-muted">REPERTO PRINCIPALE</span><h2>${esc(r.mainTitle)}</h2><div class="exhibit-question"><span>LA DOMANDA</span><strong>${esc(r.question)}</strong></div><p>${esc(r.main)}</p><div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div><div class="source-row"><b>Il documento scientifico</b>${sourceHtml(r.source)}</div><div class="art-notice">Le illustrazioni del museo sono interpretazioni artistiche; i collegamenti portano alle fonti autentiche.</div></article><aside class="side-exhibit">${img(r.sideArt,r.side.title)}<div class="side-body"><div class="label-muted">${esc(r.side.label)}</div><h3>${esc(r.side.title)}</h3><p>${esc(r.side.desc)}</p>${sourceHtml(r.side.source)}<div style="margin-top:18px"><button class="quiet-button" data-act="zoom" data-val="${r.id}">Esamina la tavola ↗</button></div><div class="mini-detail"><span>✦</span><div>Due reperti da esplorare in ogni sala: la scoperta principale e un secondo mistero.</div></div><div class="otto-box">${img(r.otto,'Otto il polpo esploratore')}<p><strong>Otto suggerisce:</strong> ${esc(r.questionHint)}</p></div></div></aside></section>
<div class="wrap"><div class="hall-note">Questa esperienza integra il libro <em>Einstein, questa te la sei persa!</em> e non sostituisce la lettura dello studio originale. Alcune funzioni scientifiche sono ancora ipotesi: il museo le distingue dalle osservazioni.</div><nav class="next-controls" aria-label="Spostati tra le sale"><a class="quiet-button" href="#${r.id>1?'sala-'+(r.id-1):'atrio'}">← ${r.id>1?'Sala precedente':'Torna all’atrio'}</a><button class="quiet-button" data-act="passport">Passaporto: ${completed.size}/7 sigilli</button><a class="primary-button" href="#${r.id<7?'sala-'+(r.id+1):'atrio'}">${r.id<7?'Sala successiva':'Torna alle sale'} →</a></nav></div>`;
}
function progressDots(n,total){return `<div class="step-counter" aria-label="${n} passaggi completati su ${total}">${Array.from({length:total},(_,i)=>`<i class="${i<n?'done':''}"></i>`).join('')}</div>`;}
function feedbackHtml(){return feedback?`<div class="feedback" data-kind="${feedbackKind||'info'}">${esc(feedback)}</div>`:'';}
function finishBox(r){const next = ROOMS[r.id]||null;return `<div class="success-state"><div class="progress-title">SIGILLO SBLOCCATO ✦</div><h3>${esc(r.seal)}</h3><p>Complimenti! Hai risolto il mistero senza confondere gli indizi con la fantasia. Otto ha aggiornato il tuo passaporto.</p><div class="hero-buttons"><button class="primary-button" data-act="passport">Vedi il passaporto</button>${next?`<a class="quiet-button" href="#sala-${next.id}">Vai alla sala ${next.id} →</a>`:'<a class="quiet-button" href="#atrio">Torna alle sette sale</a>'}</div></div>`;}
function renderChallenge(r){if(completed.has(r.id))return finishBox(r);
switch(r.challenge){
 case 'prove':{
  const statements=[
   {s:'Le orche staccano un tratto d’alga.',correct:'osservato'},
   {s:'Le orche fanno rotolare il pezzo d’alga fra i corpi.',correct:'osservato'},
   {s:'L’alga elimina le cellule morte della pelle.',correct:'ipotesi'},
   {s:'Usare l’alga rafforza i legami sociali.',correct:'ipotesi'}];
  const n=game.index||0;const s=statements[n];return `<div class="question-label">IL TUO MESTIERE: INVESTIGATORE</div><h3>Visto davvero o ancora da dimostrare?</h3><p class="subtext">Una frase alla volta. Quali informazioni derivano direttamente dai filmati e quali sono possibili spiegazioni?</p>${progressDots(n,4)}<p><strong>${esc(s.s)}</strong></p><div class="choice-grid"><button class="choice-button" data-act="judge" data-val="osservato">✓ Osservato nei filmati</button><button class="choice-button" data-act="judge" data-val="ipotesi">? Ipotesi da studiare</button></div>${feedbackHtml()}`;
 }
 case 'terreno':return `<div class="question-label">IL TUO MESTIERE: BOTANICO</div><h3>Quale confronto è più utile?</h3><p class="subtext">Vuoi scoprire quanto influisce la regolite lunare. Quale coppia di esperimenti sceglieresti, mantenendo uguali acqua, luce e specie di pianta?</p><div class="choice-grid cols-1"><button class="choice-button" data-act="soil" data-val="a">A · Pianta nella regolite lunare / stessa pianta in un terreno di confronto, in condizioni simili</button><button class="choice-button" data-act="soil" data-val="b">B · Pianta nella regolite senza acqua / pianta nella terra con acqua</button><button class="choice-button" data-act="soil" data-val="c">C · Una felce al buio / un pomodoro alla luce del sole</button></div>${feedbackHtml()}`;
 case 'sequenza':{
  const steps=[{id:1,name:'Il pesce si muove',mark:'🐟'},{id:2,name:'La telecamera rileva dove si trova',mark:'◉'},{id:3,name:'Il computer elabora il comando',mark:'⌘'},{id:4,name:'I motori muovono le ruote',mark:'⚙'}];const shuffled=[steps[3],steps[1],steps[0],steps[2]];let n=game.seq||0;
  return `<div class="question-label">IL TUO MESTIERE: INGEGNERE</div><h3>Ricostruisci la catena di comando.</h3><p class="subtext">Tocca i quattro passaggi nell’ordine giusto: chi comincia, chi rileva il movimento, chi lo interpreta e chi muove il veicolo?</p>${progressDots(n,4)}<div class="tech-trail">${steps.slice(0,n).map(t=>`<div class="tech-node filled">${esc(t.name)}</div>`).join('')}${Array.from({length:4-n},()=>'<div class="tech-node">?</div>').join('')}</div><div class="choice-grid">${shuffled.filter(x=>x.id>n).map(x=>`<button class="choice-button" data-act="step" data-val="${x.id}">${x.mark} ${esc(x.name)}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'parentela':return `<div class="question-label">IL TUO MESTIERE: PALEONTOLOGO</div><h3>Scegli il ramo giusto.</h3><p class="subtext">Osserva questo piccolo albero: da antichi teropodi si sono evoluti più rami. Che cosa possiamo affermare con sicurezza?</p><svg viewBox="0 0 600 160" role="img" aria-label="Da un antenato comune dei dinosauri teropodi partono due rami: uno verso T. rex e uno verso i dinosauri aviani, cioè gli uccelli" style="width:100%;max-height:170px"><path d="M35 84H290 M290 84V28H395 M290 84V138H395" stroke="#eac27c" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="290" cy="84" r="9" fill="#ffe0a0"/><text x="12" y="62" fill="#e5ecef" font-size="15">Antenati teropodi</text><text x="408" y="34" fill="#e5ecef" font-size="18">🦖 ramo T. rex</text><text x="408" y="143" fill="#e5ecef" font-size="18">🐦 ramo degli uccelli</text></svg><div class="choice-grid cols-1"><button class="choice-button" data-act="dino" data-val="0">La gallina discende direttamente dal T. rex.</button><button class="choice-button" data-act="dino" data-val="1">Uccelli e T. rex appartengono a rami diversi con antenati in comune.</button><button class="choice-button" data-act="dino" data-val="2">La somiglianza è casuale: gli uccelli non sono dinosauri.</button></div>${feedbackHtml()}`;
 case 'pinza':{
   const val=game.grip===undefined?15:game.grip;const level=val<35?'soft':val>65?'hard':'good';const label=val<35?'La presa è troppo debole.':val>65?'Stai stringendo più del necessario.':'La presa è controllata e delicata.';
   return `<div class="question-label">IL TUO MESTIERE: PROGETTISTA</div><h3>Quanta forza useresti?</h3><p class="subtext">Devi afferrare un oggetto fragile. Muovi la leva e prova a trovare una presa né troppo debole né troppo forte.</p><div class="gripper-scene" data-level="${level}"><div class="gripper-prong"></div><div class="gripper-object" role="img" aria-label="Oggetto fragile di vetro">🏺</div><div class="gripper-prong"></div></div><label for="gripSlider" class="hint">Intensità della presa (scala immaginaria)</label><input class="range-control" aria-label="Intensità della presa" id="gripSlider" type="range" min="0" max="100" step="1" value="${val}"><p id="gripFeedback"><strong>${label}</strong></p><button class="primary-button" data-act="grip-check">Verifica la presa</button><p class="hint">La scala è inventata per il gioco: non rappresenta misure di un vero robot.</p>${feedbackHtml()}`;
 }
 case 'segnali':{
   const seen=game.seen||[];const tiles=[['Il muscolo si attiva','Il corpo genera cambiamenti e segnali legati al movimento.'],['L’interfaccia rileva','Un sistema opportunamente progettato acquisisce informazioni utili.'],['Il controllo interpreta','I segnali vengono elaborati per gestire il dispositivo.'],['La protesi si muove','Il sistema può aiutare il movimento della persona.']];return `<div class="question-label">IL TUO MESTIERE: ESPLORATORE DEL CORPO</div><h3>Quattro tappe di un segnale.</h3><p class="subtext">Apri ciascuna lente per scoprire il percorso semplificato dal corpo alla tecnologia. Puoi toccarle in qualunque ordine.</p>${progressDots(seen.length,4)}<div class="sensor-grid">${tiles.map((t,i)=>`<button class="sensor-tile" data-act="sense" data-val="${i}" aria-pressed="${seen.includes(i)}"><span class="ordinal">0${i+1}</span><strong>${esc(t[0])}</strong>${seen.includes(i)?`<small>${esc(t[1])}</small>`:'<small>Tocca per scoprire</small>'}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'telescopi':{
  const seen=game.tel||[];const desc=['Osservatorio A','Osservatorio B','Osservatorio C','Osservatorio D'];return `<div class="question-label">IL TUO MESTIERE: ASTROFISICO</div><h3>Raccogli i segnali da luoghi diversi.</h3><p class="subtext">Attiva le quattro antenne simboliche. Quando tutte avranno osservato, potrai vedere una ricostruzione artistica. La rete EHT reale coinvolge più strumenti.</p>${progressDots(seen.length,4)}<div class="eht-lab">${desc.map((v,i)=>`<button class="dish-tile" data-act="dish" data-val="${i}" aria-pressed="${seen.includes(i)}"><span aria-hidden="true">${seen.includes(i)?'✦':'◉'}</span><small>${esc(v)}</small>${seen.includes(i)?'<b>Segnale ricevuto</b>':''}</button>`).join('')}</div>${seen.length===4?'<button class="primary-button" data-act="assemble">Elabora le osservazioni →</button>':''}<div class="hole-visual ${seen.length===4?'visible':''}" role="img" aria-label="Visualizzazione artistica della regione intorno a un buco nero"></div><p class="hint">Questa figura è un disegno, NON la fotografia ufficiale. Puoi aprire la vera immagine tramite la fonte ESO qui sotto.</p>${feedbackHtml()}`;
 }
 default:return '';
 }
}
function redrawChallenge(){const r=ROOMS[currentId-1];const panel=document.getElementById('challengePanel');if(panel&&r)panel.innerHTML=renderChallenge(r);persist();}
function win(){if(!currentId)return;completed.add(currentId);persist();feedback='';feedbackKind='';redrawChallenge();if(completed.size===7)showToast('Hai completato tutte le sale! Apri il passaporto per il diploma.');else showToast('✦ Sigillo conquistato! Otto è felice.');}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.hidden=true},3300);}
function choiceRight(ok,wrong,right){if(ok){feedback=right;feedbackKind='good';win();}else{feedback=wrong;feedbackKind='wrong';redrawChallenge();}}
function passportMarkup(){return `<div class="modal-card" role="dialog" aria-modal="true" aria-label="Il passaporto di Otto"><div class="modal-header"><h2>Il tuo passaporto</h2><button data-act="close" class="icon-button" aria-label="Chiudi">×</button></div><p>Ogni sala esplorata aggiunge un sigillo. Il passaporto si salva soltanto sul tuo dispositivo.</p><div class="passport-list">${ROOMS.map(r=>`<span class="passport-seal ${completed.has(r.id)?'stamped':''}" title="Sala ${r.id}: ${esc(r.seal)}">${completed.has(r.id)?r.icon:r.id}</span>`).join('')}</div><div class="progress-rail"><div style="width:${completed.size/7*100}%"></div></div><p><strong>${completed.size} / 7 sale completate.</strong> ${completed.size<7?'Ti mancano '+(7-completed.size)+' sigilli per ottenere il diploma.':'Complimenti! Hai completato tutte le sette sale.'}</p>${completed.size===7?`<hr style="border:none;border-top:1px solid rgba(255,215,156,.2);margin:28px 0"><div class="eyebrow">PREMIO FINALE</div><h3 style="font:700 28px Georgia,serif;margin:10px 0">Il diploma delle meraviglie</h3><label for="childName">Nome dell’esploratore o dell’esploratrice</label><input id="childName" class="name-input" placeholder="Scrivi un nome da stampare" maxlength="50" value="${esc(diplomaName)}"><div class="diploma-actions"><button class="primary-button" data-act="print">Stampa il diploma</button></div><div id="diplomaPreview" class="diploma"><div>✧ ✦ ✧</div><h3>ESPLORATORE DELLE<br>SCOPERTE IMPOSSIBILI</h3><p>Si certifica che</p><div class="large" id="diplomaChild">${esc(diplomaName||'________________')}</div><p>ha completato le sette sale del museo,<br>ha osservato con curiosità e ha seguito le prove.</p><p>Otto · Il Museo delle Scoperte Impossibili</p></div>`:`<button class="quiet-button" data-act="close">Torna al museo</button>`}<p class="hint" style="margin-top:18px">Per ricominciare dall’inizio: <button data-act="reset-confirm" class="quiet-button" style="padding:7px 12px">Azzera i sigilli</button></p></div>`;}
function openZoom(id){const r=ROOMS[id-1];if(!r)return;modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="Ingrandimento: ${esc(r.side.title)}"><div class="modal-header"><h2>${esc(r.side.title)}</h2><button data-act="close" class="icon-button" aria-label="Chiudi">×</button></div><div style="margin:17px 0"><img src="${A(r.sideArt)}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="Illustrazione narrativa per: ${esc(r.side.title)}"></div><p>${esc(r.side.desc)}</p><p class="art-notice">Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.</p>${sourceHtml(r.side.source)}</div>`;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function openPassport(){modal.innerHTML=passportMarkup();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function closeModal(){modal.hidden=true;modal.innerHTML='';document.body.style.overflow='';document.getElementById('passportButton')?.focus();}
function printDiploma(){const name=diplomaName.trim()||'____________________';let p=document.getElementById('printSheet');if(!p){p=document.createElement('div');p.id='printSheet';document.body.appendChild(p);}p.innerHTML=`<section class="print-certificate"><div>✦ ✦ ✦</div><p>IL MUSEO DELLE SCOPERTE IMPOSSIBILI</p><h1>DIPLOMA DI ESPLORATORE</h1><p>Conferito a</p><p class="named">${esc(name)}</p><p>per aver completato tutte e sette le sale,<br>collezionato i sigilli e imparato a distinguere<br>le osservazioni dalle ipotesi.</p><p class="brand-print">✦ Otto, il piccolo esploratore ✦</p><p>Da: EINSTEIN, QUESTA TE LA SEI PERSA!</p></section>`;window.print();}
function clickHandler(event){const btn=event.target.closest('[data-act]');if(!btn)return;const act=btn.dataset.act;const val=btn.dataset.val;
 if(act==='passport'){openPassport();return;}
 if(act==='zoom'){openZoom(Number(val));return;}
 if(act==='close'){closeModal();return;}
 if(act==='print'){diplomaName=modal.querySelector('#childName')?.value.trim()||'';printDiploma();return;}
 if(act==='reset-confirm'){if(window.confirm('Vuoi cancellare i sette sigilli salvati su questo dispositivo?')){completed.clear();game={};feedback='';persist();closeModal();updateView(false);showToast('Passaporto pronto per una nuova esplorazione.');}return;}
 if(!currentId||completed.has(currentId))return;
 feedback='';feedbackKind='';
 if(act==='judge'){
  const answers=['osservato','osservato','ipotesi','ipotesi'];const idx=game.index||0;
  if(val===answers[idx]){game.index=idx+1;if(game.index===4){win();return;} feedback='Indizio corretto! Continua con la frase successiva.';}else{feedback=answers[idx]==='osservato'?'Questa azione è visibile nei filmati: è un’osservazione.':'Questa è una possibile funzione dell’alga, non ancora dimostrata: è un’ipotesi.';feedbackKind='wrong';}redrawChallenge();return;
 }
 if(act==='soil'){choiceRight(val==='a','Con questo confronto cambi troppe cose insieme: non sapresti a quale variabile attribuire la differenza.','Ottima scelta: confronti piantine simili mantenendo il più possibile uguali le altre condizioni.');return;}
 if(act==='step'){const expect=(game.seq||0)+1;if(Number(val)===expect){game.seq=expect;if(expect===4){win();return;}feedback='Esatto: ora scegli il passaggio successivo.';}else{feedback='Questo passaggio arriva più tardi. Parti da ciò che fa il pesce.';feedbackKind='wrong';}redrawChallenge();return;}
 if(act==='dino'){choiceRight(val==='1','Prova a osservare il punto in cui l’albero si divide. Il T. rex non è l’antenato diretto della gallina.','Esatto: gli uccelli sono dinosauri teropodi viventi e condividono antenati con altri rami estinti.');return;}
 if(act==='grip-check'){const x=game.grip===undefined?15:game.grip;choiceRight(x>=35&&x<=65,x<35?'La presa scivola: prova ad aumentare leggermente la forza.':'Troppo! Una presa rigida potrebbe danneggiare un oggetto fragile.','Hai trovato un buon compromesso nel nostro gioco. I robot reali richiedono sensori, geometrie e controlli molto più sofisticati.');return;}
 if(act==='sense'){const i=Number(val);game.seen=game.seen||[];if(!game.seen.includes(i))game.seen.push(i);if(game.seen.length===4){win();return;}feedback='Hai scoperto un’altra tappa. Continua a seguire il percorso.';redrawChallenge();return;}
 if(act==='dish'){const i=Number(val);game.tel=game.tel||[];if(!game.tel.includes(i))game.tel.push(i);feedback=game.tel.length===4?'Dati raccolti! Ora puoi avviare la ricostruzione.':'Hai attivato un osservatorio simbolico.';redrawChallenge();return;}
 if(act==='assemble'){if((game.tel||[]).length===4)win();return;}
}
main.addEventListener('click',clickHandler);
modal.addEventListener('click',clickHandler);
document.getElementById('passportButton').addEventListener('click',openPassport);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
modal.addEventListener('input',e=>{if(e.target.id==='childName'){diplomaName=e.target.value;const el=modal.querySelector('#diplomaChild');if(el)el.textContent=diplomaName||'________________';}});
main.addEventListener('input',e=>{if(e.target.id==='gripSlider'){game.grip=Number(e.target.value);const p=main.querySelector('#gripFeedback');const v=game.grip;p.innerHTML=`<strong>${v<35?'La presa è troppo debole.':v>65?'Stai stringendo più del necessario.':'La presa è controllata e delicata.'}</strong>`;main.querySelector('.gripper-scene')?.setAttribute('data-level',v<35?'soft':v>65?'hard':'good');}});
window.addEventListener('hashchange',()=>updateView());
if(!location.hash)location.hash='atrio';
updateView(false);
