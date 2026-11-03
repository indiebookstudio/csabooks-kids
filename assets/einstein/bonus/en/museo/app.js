'use strict';
/* Museo delle Scoperte Impossibili — standalone, offline-capable, no analytics. */
const A = name => `assets/${name}.webp?v=20261103`;
const ROOMS = [
  {
    "id": 1,
    "slug": "animali",
    "label": "Extraordinary Animals",
    "title": "The Sea That Hides Clues",
    "teaser": "Can kelp become a tool? And can bubbles form a net?",
    "art": "animali",
    "sideArt": "orche",
    "otto": "otto-curioso",
    "icon": "◉",
    "seal": "The Marine Lens",
    "kicker": "GALLERY 01 · EXTRAORDINARY ANIMALS",
    "intro": "Some animals surprise scientists not through magic, but because they do things no one ever expected.",
    "question": "A video can show us what happens. But can it immediately tell us why?",
    "mainTitle": "The Case of the Mysterious Kelp",
    "main": "In the Salish Sea, researchers filmed orcas plucking strands of kelp and rolling them between their bodies. Observing the movement is one thing; proving its exact purpose is another.",
    "challenge": "prove",
    "source": {
      "code": "SC-04",
      "title": "Study on orca kelp behavior (Current Biology)",
      "url": "https://doi.org/10.1016/j.cub.2025.04.021"
    },
    "side": {
      "title": "The Whale That Hunts with Bubbles",
      "label": "Another Exhibit",
      "desc": "Some humpback whales blow circular bubble nets to corral fish. The bubbles are not a solid wall: they manipulate prey behavior. Their shape and use can vary greatly.",
      "source": {
        "code": "SC-05",
        "title": "Research on humpback whale bubble nets",
        "url": "https://doi.org/10.1098/rsos.240328"
      },
      "figureAlt": "Orcas interacting with kelp in the Salish Sea",
      "figureTitle": "The Whale That Hunts with Bubbles"
    },
    "questionHint": "Look closely at the kelp, but pay special attention to what the animals do with it."
  },
  {
    "id": 2,
    "slug": "piante",
    "label": "Plants and Tiny Worlds",
    "title": "A Garden That Shouldn’t Exist",
    "teaser": "Sprouts in lunar dust and ferns with gigantic DNA.",
    "art": "piante",
    "sideArt": "felce-dna",
    "otto": "otto-pensieroso",
    "icon": "✿",
    "seal": "The Lunar Sprout",
    "kicker": "GALLERY 02 · PLANTS AND TINY WORLDS",
    "intro": "Plants seem motionless, but they are full of surprising responses. Even lunar dust became part of a breakthrough investigation.",
    "question": "To find out if a plant truly grows in lunar regolith, what must we compare?",
    "mainTitle": "The Seed and the Moon Dust",
    "main": "In the lab, seeds sprouted in small samples of lunar regolith brought back by Apollo missions. However, the seedlings displayed severe stress. Sprouting does not mean growing as well as in fertile soil.",
    "challenge": "terreno",
    "source": {
      "code": "SC-12",
      "title": "Plants grown in Apollo lunar regolith (Communications Biology)",
      "url": "https://doi.org/10.1038/s42003-022-03334-8"
    },
    "side": {
      "title": "The Fern That Surprised Genetics",
      "label": "Another Exhibit",
      "desc": "A tiny fern of the genus Tmesipteris holds a colossal genome. The sheer amount of DNA does not determine complexity or intelligence: it is a biological trait to be understood in its context.",
      "source": {
        "code": "SC-13",
        "title": "Genomic study of Tmesipteris (iScience)",
        "url": "https://doi.org/10.1016/j.isci.2024.109889"
      },
      "figureTitle": "The Fern with the Giant DNA",
      "figureAlt": "Schematic visual comparison between the human genome and the DNA of Tmesipteris oblanceolata",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Genome Comparison (1C values)</h4><div class=\"data-compare\"><div class=\"data-row\"><span class=\"data-label\">Human being:</span><strong class=\"data-val\">approx. 3.10 billion base pairs</strong></div><div class=\"data-row\"><span class=\"data-label\"><em>Tmesipteris oblanceolata</em>:</span><strong class=\"data-val\">approx. 160.45 billion base pairs</strong></div></div><p class=\"data-note\">This comparison refers to the haploid genome (1C value). Having over 50 times more DNA does not imply greater intelligence, biological complexity, or evolutionary superiority: genome size does not measure an organism’s complexity.</p><p class=\"data-disclaimer\"><em>Methodological note:</em> this illustration is purely schematic and educational; visual proportions are not to actual molecular scale.</p></div>",
      "artNotice": "Schematic illustration for educational purposes, not a scientific photograph. For official data, see study SC-13."
    },
    "questionHint": "In any fair comparison, always change just one factor at a time."
  },
  {
    "id": 3,
    "slug": "esperimenti",
    "label": "Surprising Experiments",
    "title": "The Fish on Four Wheels",
    "teaser": "Who truly drives a moving tank?",
    "art": "esperimenti",
    "sideArt": "pesce",
    "otto": "otto-curioso",
    "icon": "⌁",
    "seal": "The Curious Inventor",
    "kicker": "GALLERY 03 · SURPRISING EXPERIMENTS",
    "intro": "A great experiment isn’t magic: it is a chain of steps that we can rebuild, test, and explain.",
    "question": "How can a fish steer a land vehicle without touching wheels?",
    "mainTitle": "Rebuild the Lab Setup",
    "main": "In one experiment, scientists mounted a water tank onto a motorized platform. A computer tracked the position of the fish and translated its swimming into steering commands for the wheels.",
    "challenge": "sequenza",
    "source": {
      "code": "SC-15",
      "title": "Fish-operated vehicle: behavioral study (BBR)",
      "url": "https://doi.org/10.1016/j.bbr.2021.113711"
    },
    "side": {
      "title": "Bumblebees Playing with Balls",
      "label": "Another Exhibit",
      "desc": "Bumblebees rolled small wooden balls with no food reward offered. Researchers investigated whether this was genuine play behavior, without projecting human intentions.",
      "source": {
        "code": "SC-16",
        "title": "Research on ball rolling in bumblebees",
        "url": "https://doi.org/10.1016/j.anbehav.2022.08.013"
      },
      "figureTitle": "The Fish and the Vehicle",
      "figureAlt": "Diagram of the robotic technology chain of the fish-operated vehicle",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">How the vehicle works (command chain)</h4><ol class=\"step-list\"><li><strong>1. The fish swims:</strong> the goldfish moves freely inside the transparent water tank.</li><li><strong>2. A camera detects position:</strong> an overhead camera tracks the fish’s position and orientation in real time.</li><li><strong>3. A computer converts data into commands:</strong> an onboard computer translates movement vectors into steering instructions.</li><li><strong>4. The motorized system drives the wheels:</strong> electric motors turn the wheels, propelling the vehicle in the intended direction.</li></ol><p class=\"data-note\"><strong>Scientific clarification:</strong> the fish does not directly steer the wheels with a steering wheel; its movement is mediated and translated by the robotic interface engineered by researchers.</p></div>",
      "artNotice": "Illustrative diagram of the robotic system. For the original paper and video, see study SC-15.",
      "figureSource": {
        "code": "SC-15",
        "title": "Fish-operated vehicle: behavioural study",
        "url": "https://doi.org/10.1016/j.bbr.2021.113711"
      }
    },
    "questionHint": "Which step turns an observed movement into wheel motion?"
  },
  {
    "id": 4,
    "slug": "dinosauri",
    "label": "Dinosaurs, Extinctions & DNA",
    "title": "Not All Dinosaurs Disappeared",
    "teaser": "In the history of birds lies an astonishing branch.",
    "art": "dinosauri",
    "sideArt": "uccelli",
    "otto": "otto-pensieroso",
    "icon": "❖",
    "seal": "The Detective of the Past",
    "kicker": "GALLERY 04 · DINOSAURS, EXTINCTIONS & DNA",
    "intro": "Fossil bones are clues. From a fragment, a feather, or skeletal similarities, scientists reconstruct epic sagas.",
    "question": "Does the chicken descend directly from the T. rex?",
    "mainTitle": "The Hidden Family Tree",
    "main": "Birds are living dinosaurs belonging to the theropod group. The T. rex was a distant cousin, not a chicken’s grandfather. The key concept is common ancestor.",
    "challenge": "parentela",
    "source": {
      "code": "SC-38",
      "title": "Natural History Museum — How dinosaurs evolved into birds",
      "url": "https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html"
    },
    "side": {
      "title": "Why a Fossil Isn’t Enough to Clone a Dinosaur",
      "label": "Another Exhibit",
      "desc": "A fossil reveals incredible facts about ancient anatomy. But cloning would require intact genetic material, not mineralized stone. Movie magic is not a scientific protocol.",
      "source": {
        "code": "SC-39",
        "title": "Natural History Museum — Could scientists bring dinosaurs back?",
        "url": "https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html"
      },
      "figureAlt": "Evolutionary link between theropod dinosaurs and modern birds",
      "figureTitle": "Why a Fossil Isn’t Enough to Clone a Dinosaur"
    },
    "questionHint": "In an evolutionary tree, what matters is the fork where branches split."
  },
  {
    "id": 5,
    "slug": "laboratorio",
    "label": "The Lab of the Future",
    "title": "Machines Learning from Nature",
    "teaser": "Can an elephant trunk inspire a robotic gripper?",
    "art": "laboratorio",
    "sideArt": "micelio",
    "otto": "otto-curioso",
    "icon": "⚙",
    "seal": "The Nature Engineer",
    "kicker": "GALLERY 05 · THE LAB OF THE FUTURE",
    "intro": "Many technologies stem from an observation: how does a living organism solve a tricky problem?",
    "question": "How would you pick up a fragile object without crushing it?",
    "mainTitle": "Design the Perfect Grip",
    "main": "Researchers design soft grippers inspired by elephant trunks. Wrapping around an object works better than stiff fingers when fragility matters. Here you can try a playful game model.",
    "challenge": "pinza",
    "source": {
      "code": "SC-23",
      "title": "Study on bio-inspired trunk grippers",
      "url": "https://doi.org/10.1038/s44182-025-00038-z"
    },
    "side": {
      "title": "Mycelium Meets a Robot",
      "label": "Another Exhibit",
      "desc": "In an experimental prototype, electrical signals from fungal mycelium were interpreted by circuits to guide a robot. It does not mean the fungus thought about where to go.",
      "source": {
        "code": "SC-25",
        "title": "Research on mycelium-controlled biohybrid robots",
        "url": "https://doi.org/10.1126/scirobotics.adk8019"
      },
      "figureTitle": "Mycelium and the Robot",
      "figureAlt": "Diagram of the biohybrid robot powered by fungal mycelium electrical signals",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">From mycelium to movement (biohybrid chain)</h4><ol class=\"step-list\"><li><strong>1. Mycelium exhibits electrical activity:</strong> the fungal underground network generates measurable bioelectrical spikes.</li><li><strong>2. Electrodes detect signals:</strong> tiny sensors record changes in biological voltage.</li><li><strong>3. An electronic circuit interprets them:</strong> dedicated hardware converts biological pulses into digital control signals.</li><li><strong>4. The system drives the robot:</strong> actuators respond by moving the robot’s legs or wheels.</li></ol><p class=\"data-note\"><strong>Scientific clarification:</strong> this does not mean the fungus possesses conscious intentions or drives autonomously like a human; the robot moves in response to biological signals processed by an artificial circuit.</p></div>",
      "artNotice": "Graphic interpretation of the biohybrid prototype. For the original study, see SC-25."
    },
    "questionHint": "The strongest squeeze doesn’t always win."
  },
  {
    "id": 6,
    "slug": "corpo",
    "label": "Body and Super-Tech",
    "title": "The Body Sends Messages",
    "teaser": "When muscles and engineering join forces.",
    "art": "corpo",
    "sideArt": "voce",
    "otto": "otto-pensieroso",
    "icon": "✧",
    "seal": "The Signal Explorer",
    "kicker": "GALLERY 06 · BODY AND SUPER-TECH",
    "intro": "Our bodies transmit signals continuously. Scientists investigate how to interface them with assistive devices.",
    "question": "How can a prosthesis receive cues from body movement?",
    "mainTitle": "Follow the Signal",
    "main": "At MIT, engineers studied a bionic knee integrated with residual muscle tissue for more natural motion. These results refer to specific clinical trials.",
    "challenge": "segnali",
    "source": {
      "code": "SC-50",
      "title": "MIT News — A bionic knee integrated into tissue",
      "url": "https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710"
    },
    "side": {
      "title": "When Technology Restores Voice",
      "label": "Another Exhibit",
      "desc": "Research teams use neural interfaces to turn brain signals into speech for paralyzed individuals. These are experimental tools, not mind-reading machines.",
      "source": {
        "code": "SC-53",
        "title": "Research on neuroprosthetic communication",
        "url": "https://doi.org/10.1038/s41593-025-01905-6"
      },
      "figureAlt": "Technological vocal assistance and signal transmission interface",
      "figureTitle": "When Technology Restores Voice"
    },
    "questionHint": "A motor command isn’t magic: it’s a connected chain of electrical signals."
  },
  {
    "id": 7,
    "slug": "spazio",
    "label": "Space: The Next Frontier",
    "title": "The Picture No Single Camera Took",
    "teaser": "How do you reconstruct the image of a black hole?",
    "art": "spazio",
    "sideArt": "galassia",
    "otto": "otto-mondo",
    "icon": "✦",
    "seal": "The Cosmic Explorer",
    "kicker": "GALLERY 07 · SPACE: THE NEXT FRONTIER",
    "intro": "In deep space, we cannot just point a camera. Scientists combine data gathered across distant corners of our planet.",
    "question": "Did the first image of M87* come from a single telescope?",
    "mainTitle": "Power Up the Radio Telescope Array",
    "main": "The Event Horizon Telescope combined radio observations from observatories across the globe and used advanced data processing to reconstruct the shadow of black hole M87*.",
    "challenge": "telescopi",
    "source": {
      "code": "SC-48",
      "title": "ESO / EHT Collaboration — First image of black hole M87*",
      "url": "https://www.eso.org/public/images/eso1907a/"
    },
    "side": {
      "title": "A Comet from Another Star System",
      "label": "Another Exhibit",
      "desc": "Interstellar comet 3I/ATLAS crossed our solar system on an open hyperbolic path. It will never return to orbit our Sun like periodic comets.",
      "source": {
        "code": "SC-36",
        "title": "NASA — 3I/ATLAS: facts and FAQs",
        "url": "https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/"
      },
      "figureTitle": "The Reconstruction of M87*",
      "figureAlt": "Artistic diagram of the Event Horizon Telescope network and the reconstruction of M87*",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">From Earth to M87*: Imaging the Invisible</h4><ol class=\"step-list\"><li><strong>1. Multiple radio telescopes collect observations:</strong> synchronized instruments worldwide observe the same celestial region simultaneously.</li><li><strong>2. Data is synchronized and combined:</strong> atomic clocks and supercomputers align recordings through interferometry (VLBI).</li><li><strong>3. Computational processing reconstructs the image:</strong> algorithms process the measurements to reconstruct the image of the region around black hole M87*.</li></ol><p class=\"data-note\"><strong>Methodological note:</strong> the illustration provided is an artistic educational diagram to explain the method, NOT the official scientific photograph from the Event Horizon Telescope (EHT).</p></div>",
      "artNotice": "Artistic educational diagram: this is not the official EHT photograph. The genuine scientific image is available via source SC-48.",
      "figureSource": {
        "code": "SC-48",
        "title": "ESO / EHT Collaboration — first image of black hole M87*",
        "url": "https://www.eso.org/public/images/eso1907a/"
      }
    },
    "questionHint": "The result comes from synchronizing many instruments, not from a single snapshot."
  }
];
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-en-progress-v1';
let completed = (() => { try {const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); return new Set(Array.isArray(saved)?saved.filter(n => Number.isInteger(n)&&n>=1&&n<=7):[]);}catch{return new Set();}})();
let game = {}; let currentId = 0;let feedback = '';let feedbackKind='';let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Open source  in a new tab')} ${esc(s.code)}">${esc(s.code)} · Original source ↗</a>`;
function persist(){try{localStorage.setItem(storeKey,JSON.stringify([...completed]));}catch{}headerProgress.textContent=`${completed.size}/7`;}
function navigateHome(){location.hash='atrio';}
function roomForHash(){const match=(location.hash||'').match(/^#sala-([1-7])$/);return match?Number(match[1]):0;}
function img(src,alt='',cl=''){return `<img src="${A(src)}" alt="${esc(alt)}" ${cl?`class="${cl}"`:''} loading="lazy">`;}
function syncLanguageLinks(){const h=location.hash||'#atrio';document.querySelectorAll('.locale-flag-item').forEach(el=>{const href=el.getAttribute('href');if(href&&href!=='#'&&!href.startsWith('javascript:')){el.setAttribute('href',href.split('#')[0]+h);}});}
function updateView(scroll=true){ const next = roomForHash(); if(next!==currentId){game={};feedback='';feedbackKind='';currentId=next;} persist();main.innerHTML = next?renderRoom(ROOMS[next-1]):renderAtrium();syncLanguageLinks();if(scroll)window.scrollTo({top:0,behavior:'instant'});}
function renderAtrium(){
 const next=ROOMS.find(r=>!completed.has(r.id))||ROOMS[0];
 return `<section class="hero"><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">THE EXCLUSIVE BOOK COMPANION</div><h1 class="display">THE MUSEUM OF<br><em>IMPOSSIBLE</em><br>DISCOVERIES</h1><p class="lead">Seven galleries. Seven scientific mysteries. One curious little octopus waiting for you. Step in, observe, follow the clues, and collect Otto’s seals.</p><div class="hero-buttons"><a class="primary-button" href="#sala-${next.id}">${completed.size?'Continue exploring':'Start exploring'} →</a><button class="quiet-button" data-act="passport">Open passport</button></div><p class="hint">For curious minds aged 7–12 · Free with the book · No account needed</p></div>${img('otto-mondo','Otto, the little explorer octopus, hugging planet Earth','hero-otto')}</div></section>
 <section class="wrap intro-section" id="sale"><div class="intro-row"><div><div class="eyebrow">YOUR JOURNEY</div><h2 class="section-heading">Choose a gallery door.</h2></div><p>You can visit the galleries in any order you like. Each time you solve a mystery, Otto stamps a seal in your passport.</p></div><div class="progress-rail" aria-label="${completed.size} galleries visited out of 7"><div style="width:${completed.size/7*100}%"></div></div><div class="hint">${completed.size} galleries completed out of 7  ${completed.size===7?'· Your diploma is ready!':''}</div></section>
 <section class="wrap museum-map" aria-label="Museum Galleries">${ROOMS.map(r=>`<a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}"><img src="${A(r.art)}" alt="" loading="lazy">${completed.has(r.id)?'<span class="badge-done">✓ Seal earned</span>':''}<div class="card-inner"><span class="room-n">GALLERY ${String(r.id).padStart(2,'0')} · ${esc(r.icon)}</span><h3>${esc(r.label)}</h3><p>${esc(r.teaser)}</p><span class="open-label">Explore gallery <span aria-hidden="true">→</span></span></div></a>`).join('')}</section>
 <section class="wrap value-strip"><div class="value-item">Observe, do not guess blindly.<p>Every activity starts with verified facts. Where science is still debating, we clearly say so.</p></div><div class="value-item">Every room tells a unique story.<p>No repetitive quizzes: each mystery challenges you with a distinct interactive mechanic.</p></div><div class="value-item">A real source for every discovery.<p>Explore authentic scientific publications. The SC codes match the reference section in your book.</p></div></section>`;
}
function renderRoom(r){
return `<section class="room-banner"><img class="room-backdrop" src="${A(r.art)}" alt="" role="presentation"><div class="room-banner-inner"><div class="crumb"><a href="#atrio">← Museum Lobby</a><span>/</span><span>Gallery ${r.id} of 7</span></div><div style="margin-top:27px"><span class="room-stamp">${r.icon} ${esc(r.kicker)}</span></div><h1 class="room-name">${esc(r.title)}</h1><p class="room-intro">${esc(r.intro)}</p></div></section>
<section class="wrap hall-grid"><article class="exhibit"><span class="label-muted">MAIN EXHIBIT</span><h2>${esc(r.mainTitle)}</h2><div class="exhibit-question"><span>THE QUESTION</span><strong>${esc(r.question)}</strong></div><p>${esc(r.main)}</p><div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div><div class="source-row"><b>Scientific publication</b>${sourceHtml(r.source)}</div><div class="art-notice">Museum illustrations are artistic interpretations; links direct you to authentic scientific publications.</div></article><aside class="side-exhibit"><div class="side-figure-wrap">${img(r.sideArt, r.side.figureAlt || r.side.figureTitle || r.side.title)}${r.side.figureCaptionHtml ? `<div class="figure-explanation">${r.side.figureCaptionHtml}</div>` : ""}</div><div class="side-body"><div class="label-muted">${esc(r.side.label)}</div><h3>${esc(r.side.title)}</h3><p>${esc(r.side.desc)}</p>${sourceHtml(r.side.source)}<div style="margin-top:18px"><button class="quiet-button" data-act="zoom" data-val="${r.id}">Examine plate ↗</button></div><div class="mini-detail"><span>✦</span><div>Two exhibits in each gallery: the main breakthrough and a second mystery.</div></div><div class="otto-box">${img(r.otto,'Otto the explorer octopus')}<p><strong>Otto suggests:</strong> ${esc(r.questionHint)}</p></div></div></aside></section>
<div class="wrap"><div class="hall-note">This companion complements the book <em>Einstein, You Missed This One!</em> and does not replace reading the original studies. Unproven functions are clearly treated as hypotheses.</div><nav class="next-controls" aria-label="Move between galleries"><a class="quiet-button" href="#${r.id>1?'sala-'+(r.id-1):'atrio'}">${r.id>1?'← Previous gallery':'← Back to lobby'}</a><button class="quiet-button" data-act="passport">Passport: ${completed.size}/7 seals</button><a class="primary-button" href="#${r.id<7?'sala-'+(r.id+1):'atrio'}">${r.id<7?'Next gallery →':'Back to galleries →'}</a></nav></div>`;
}
function progressDots(n,total){return `<div class="step-counter" aria-label="${n} ${total}"><span style="display:none">${n}/${total}</span>${Array.from({length:total},(_,i)=>`<i class="${i<n?'done':''}"></i>`).join('')}</div>`;}
function feedbackHtml(){return feedback?`<div class="feedback" data-kind="${feedbackKind||'info'}">${esc(feedback)}</div>`:'';}
function finishBox(r){const next = ROOMS[r.id]||null;return `<div class="success-state"><div class="progress-title">SEAL UNLOCKED ✦</div><h3>${esc(r.seal)}</h3><p>Congratulations! You solved the mystery without mistaking clues for assumptions. Otto stamped your passport.</p><div class="hero-buttons"><button class="primary-button" data-act="passport">View passport</button>${next?`<a class="quiet-button" href="#sala-${next.id}">Go to gallery ${next.id} →</a>`:'<a class="quiet-button" href="#atrio">Back to the 7 galleries</a>'}</div></div>`;}
function renderChallenge(r){if(completed.has(r.id))return finishBox(r);
switch(r.challenge){
 case 'prove':{
  const statements=[{"s":"Orcas tear off a piece of kelp.","correct":"osservato"},{"s":"Orcas roll the piece of kelp between their bodies.","correct":"osservato"},{"s":"The kelp scrubs away dead skin cells.","correct":"ipotesi"},{"s":"Using kelp strengthens social bonds in the pod.","correct":"ipotesi"}];
  const n=game.index||0;const s=statements[n];return `<div class="question-label">YOUR ROLE: INVESTIGATOR</div><h3>Observed on camera or yet to be proven?</h3><p class="subtext">One statement at a time. Which facts come directly from the video footage, and which are possible explanations?</p>${progressDots(n,4)}<p><strong>${esc(s.s)}</strong></p><div class="choice-grid"><button class="choice-button" data-act="judge" data-val="osservato">✓ Observed on camera</button><button class="choice-button" data-act="judge" data-val="ipotesi">? Hypothesis to study</button></div>${feedbackHtml()}`;
 }
 case 'terreno':return `<div class="question-label">YOUR ROLE: BOTANIST</div><h3>Which comparison is most useful?</h3><p class="subtext">You want to test how lunar regolith affects growth. Which pair of trials would you pick, keeping water, light, and plant species identical?</p><div class="choice-grid cols-1"><button class="choice-button" data-act="soil" data-val="a">A · Plant in lunar regolith / identical plant in control soil, under similar conditions</button><button class="choice-button" data-act="soil" data-val="b">B · Plant in regolith with no water / plant in Earth soil with water</button><button class="choice-button" data-act="soil" data-val="c">C · A fern in the dark / a tomato in full sunlight</button></div>${feedbackHtml()}`;
 case 'sequenza':{
  const steps=[{"id":1,"name":"The fish swims","mark":"🐟"},{"id":2,"name":"The camera detects its position","mark":"◉"},{"id":3,"name":"The computer calculates the command","mark":"⌘"},{"id":4,"name":"The motors drive the wheels","mark":"⚙"}];const shuffled=[steps[3],steps[1],steps[0],steps[2]];let n=game.seq||0;
  return `<div class="question-label">YOUR ROLE: ENGINEER</div><h3>Reconstruct the command chain.</h3><p class="subtext">Tap the four steps in order: who starts, who tracks motion, who translates it, and who drives the vehicle?</p>${progressDots(n,4)}<div class="tech-trail">${steps.slice(0,n).map(t=>`<div class="tech-node filled">${esc(t.name)}</div>`).join('')}${Array.from({length:4-n},()=>'<div class="tech-node">?</div>').join('')}</div><div class="choice-grid">${shuffled.filter(x=>x.id>n).map(x=>`<button class="choice-button" data-act="step" data-val="${x.id}">${x.mark} ${esc(x.name)}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'parentela':return `<div class="question-label">YOUR ROLE: PALEONTOLOGIST</div><h3>Choose the correct branch.</h3><p class="subtext">Look at this evolutionary tree: several branches split from ancient theropods. What can we state with certainty?</p><svg viewBox="0 0 600 160" role="img" aria-label="From a common ancestor of theropod dinosaurs, two branches split: one toward T. rex and one toward avian dinosaurs, namely birds" style="width:100%;max-height:170px"><path d="M35 84H290 M290 84V28H395 M290 84V138H395" stroke="#eac27c" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="290" cy="84" r="9" fill="#ffe0a0"/><text x="12" y="62" fill="#e5ecef" font-size="15">Theropod ancestors</text><text x="408" y="34" fill="#e5ecef" font-size="18">🦖 T. rex branch</text><text x="408" y="143" fill="#e5ecef" font-size="18">🐦 bird branch</text></svg><div class="choice-grid cols-1"><button class="choice-button" data-act="dino" data-val="0">The chicken directly descends from the T. rex.</button><button class="choice-button" data-act="dino" data-val="1">Birds and T. rex belong to different branches sharing common ancestors.</button><button class="choice-button" data-act="dino" data-val="2">The resemblance is coincidence: birds are not dinosaurs.</button></div>${feedbackHtml()}`;
 case 'pinza':{
   const val=game.grip===undefined?15:game.grip;const level=val<35?'soft':val>65?'hard':'good';const label=val<35?'The grip is too weak.':val>65?'You are squeezing too hard.':'The grip is controlled and gentle.';
   return `<div class="question-label">YOUR ROLE: ROBOTICS DESIGNER</div><h3>How much grip force would you use?</h3><p class="subtext">You need to pick up a fragile object. Adjust the slider to find a grip that is neither too weak nor too strong.</p><div class="gripper-scene" data-level="${level}"><div class="gripper-prong"></div><div class="gripper-object" role="img" aria-label="Delicate glass vase">🏺</div><div class="gripper-prong"></div></div><label for="gripSlider" class="hint">Grip intensity (game scale)</label><input class="range-control" aria-label="Grip intensity (game scale)" id="gripSlider" type="range" min="0" max="100" step="1" value="${val}"><p id="gripFeedback"><strong>${label}</strong></p><button class="primary-button" data-act="grip-check">Test the grip</button><p class="hint">This scale is simplified for the game: it does not reflect actual robotic measurements.</p>${feedbackHtml()}`;
 }
 case 'segnali':{
   const seen=game.seen||[];const tiles=[["Muscle activates","The body generates physiological signals tied to motion."],["Interface detects","Engineered sensors capture useful neuromuscular impulses."],["Control interprets","Processors decode the signals into mechanical instructions."],["Prosthesis moves","The bionic system smoothly assists the person’s movement."]];return `<div class="question-label">YOUR ROLE: BODY EXPLORER</div><h3>Four stages of a signal.</h3><p class="subtext">Open each tile to discover the simplified journey from body to technology. Tap them in any order.</p>${progressDots(seen.length,4)}<div class="sensor-grid">${tiles.map((t,i)=>`<button class="sensor-tile" data-act="sense" data-val="${i}" aria-pressed="${seen.includes(i)}"><span class="ordinal">0${i+1}</span><strong>${esc(t[0])}</strong>${seen.includes(i)?`<small>${esc(t[1])}</small>`:'<small>Tap to explore</small>'}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'telescopi':{
  const seen=game.tel||[];const desc=["Observatory A","Observatory B","Observatory C","Observatory D"];return `<div class="question-label">YOUR ROLE: ASTROPHYSICIST</div><h3>Gather signals across distant locations.</h3><p class="subtext">Activate the four symbolic radio dishes. When all four have observed, you will unlock the artistic reconstruction. The real EHT array spans more instruments.</p>${progressDots(seen.length,4)}<div class="eht-lab">${desc.map((v,i)=>`<button class="dish-tile" data-act="dish" data-val="${i}" aria-pressed="${seen.includes(i)}"><span aria-hidden="true">${seen.includes(i)?'✦':'◉'}</span><small>${esc(v)}</small>${seen.includes(i)?'<b>Signal received</b>':''}</button>`).join('')}</div>${seen.length===4?'<button class="primary-button" data-act="assemble">Process observations →</button>':''}<div class="hole-visual ${seen.length===4?'visible':''}" role="img" aria-label="Artistic visualization of the space around a black hole"></div><p class="hint">This image is an artistic rendering, NOT the official photo. You can inspect the real image via the ESO source link below.</p>${feedbackHtml()}`;
 }
 default:return '';
 }
}
function redrawChallenge(){const r=ROOMS[currentId-1];const panel=document.getElementById('challengePanel');if(panel&&r)panel.innerHTML=renderChallenge(r);persist();}
function win(){if(!currentId)return;completed.add(currentId);persist();feedback='';feedbackKind='';redrawChallenge();if(completed.size===7)showToast('You completed all seven galleries! Open your passport to get your diploma.');else showToast('✦ Seal earned! Otto is thrilled.');}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.hidden=true},3300);}
function choiceRight(ok,wrong,right){if(ok){feedback=right;feedbackKind='good';win();}else{feedback=wrong;feedbackKind='wrong';redrawChallenge();}}
function passportMarkup(){return `<div class="modal-card" role="dialog" aria-modal="true" aria-label="Your Explorer Passport"><div class="modal-header"><h2>Your Explorer Passport</h2><button data-act="close" class="icon-button" aria-label="Close">×</button></div><p>Every solved gallery earns a seal. Your passport is saved locally on your device only.</p><div class="passport-list">${ROOMS.map(r=>`<span class="passport-seal ${completed.has(r.id)?'stamped':''}" title="Gallery ${r.id}: ${esc(r.seal)}">${completed.has(r.id)?r.icon:r.id}</span>`).join('')}</div><div class="progress-rail"><div style="width:${completed.size/7*100}%"></div></div><p><strong>${completed.size} / 7 galleries completed.</strong>${completed.size===7?' Congratulations! You completed all seven galleries.':''}</p>${completed.size===7?`<hr style="border:none;border-top:1px solid rgba(255,215,156,.2);margin:28px 0"><div class="eyebrow">FINAL REWARD</div><h3 style="font:700 28px Georgia,serif;margin:10px 0">The Explorer Diploma</h3><label for="childName">Explorer’s full name</label><input id="childName" class="name-input" placeholder="Type a name to print" maxlength="50" value="${esc(diplomaName)}"><div class="diploma-actions"><button class="primary-button" data-act="print">Print diploma</button></div><div id="diplomaPreview" class="diploma"><div>✧ ✦ ✧</div><h3>EXPLORER OF<br>IMPOSSIBLE DISCOVERIES</h3><p>This certifies that</p><div class="large" id="diplomaChild">${esc(diplomaName||'________________')}</div><p>has completed all seven galleries of the museum,<br>observed with curiosity, and followed scientific evidence.</p><p>Otto · The Museum of Impossible Discoveries</p></div>`:`<button class="quiet-button" data-act="close">Back to museum</button>`}<p class="hint" style="margin-top:18px">To start fresh from the beginning: <button data-act="reset-confirm" class="quiet-button" style="padding:7px 12px">Reset seals</button></p></div>`;}
function openZoom(id){const r=ROOMS[id-1];if(!r)return;const zoomTitle=r.side.figureTitle||r.side.title;const zoomAlt=r.side.figureAlt||zoomTitle;modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="Enlargement: ${esc(zoomTitle)}"><div class="modal-header"><h2>${esc(zoomTitle)}</h2><button data-act="close" class="icon-button" aria-label="Close">×</button></div><div style="margin:17px 0"><img src="${A(r.sideArt)}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="${esc(zoomAlt)}"></div>${r.side.figureCaptionHtml ? `<div class="figure-modal-caption">${r.side.figureCaptionHtml}</div>` : `<p>${esc(r.side.desc)}</p>`}<p class="art-notice">${esc(r.side.artNotice||"Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.")}</p>${sourceHtml(r.side.figureSource||r.side.source)}</div>`;modal.hidden=false;document.body.style.overflow="hidden";modal.querySelector(".icon-button")?.focus();}
function openPassport(){modal.innerHTML=passportMarkup();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function closeModal(){modal.hidden=true;modal.innerHTML='';document.body.style.overflow='';document.getElementById('passportButton')?.focus();}
function printDiploma(){const name=diplomaName.trim()||'____________________';let p=document.getElementById('printSheet');if(!p){p=document.createElement('div');p.id='printSheet';document.body.appendChild(p);}p.innerHTML=`<section class="print-certificate"><div>✦ ✦ ✦</div><p>THE MUSEUM OF IMPOSSIBLE DISCOVERIES</p><h1>EXPLORER DIPLOMA</h1><p>Awarded to</p><p class="named">${esc(name)}</p><p>for completing all seven galleries,<br>collecting all seals, and learning to distinguish<br>scientific observations from hypotheses.</p><p class="brand-print">✦ Otto, the Little Explorer ✦</p><p>From: EINSTEIN, YOU MISSED THIS ONE!</p></section>`;window.print();}
function clickHandler(event){const btn=event.target.closest('[data-act]');if(!btn)return;const act=btn.dataset.act;const val=btn.dataset.val;
 if(act==='passport'){openPassport();return;}
 if(act==='zoom'){openZoom(Number(val));return;}
 if(act==='close'){closeModal();return;}
 if(act==='print'){diplomaName=modal.querySelector('#childName')?.value.trim()||'';printDiploma();return;}
 if(act==='reset-confirm'){if(window.confirm('Do you want to clear all seven seals saved on this device?')){completed.clear();game={};feedback='';persist();closeModal();updateView(false);showToast('Passport ready for a brand new exploration!');}return;}
 if(!currentId||completed.has(currentId))return;
 feedback='';feedbackKind='';
 if(act==='judge'){
  const answers=['osservato','osservato','ipotesi','ipotesi'];const idx=game.index||0;
  if(val===answers[idx]){game.index=idx+1;if(game.index===4){win();return;} feedback='Correct clue! Move on to the next statement.';}else{feedback=answers[idx]==='osservato'?'This behavior is directly visible on video: it is an observation.':'This is a possible purpose of the kelp, not yet proven: it is a hypothesis.';feedbackKind='wrong';}redrawChallenge();return;
 }
 if(act==='soil'){choiceRight(val==='a','You are changing too many variables at once: you wouldn’t know which caused the difference.','Great choice! You compare similar seedlings while keeping all other variables identical.');return;}
 if(act==='step'){const expect=(game.seq||0)+1;if(Number(val)===expect){game.seq=expect;if(expect===4){win();return;}feedback='Correct! Now choose the next step.';}else{feedback='This step comes later. Start with what the fish does first.';feedbackKind='wrong';}redrawChallenge();return;}
 if(act==='dino'){choiceRight(val==='1','Look closely at where the tree forks. The T. rex is not the direct ancestor of the chicken.','Exactly! Birds are living theropod dinosaurs, sharing ancestors with other extinct branches.');return;}
 if(act==='grip-check'){const x=game.grip===undefined?15:game.grip;choiceRight(x>=35&&x<=65,x<35?'The object slips: try increasing the force slightly.':'Too much! A stiff pinch could crack a delicate object.','You found a balanced grip! Real robots require delicate sensors, flexible geometry, and advanced controls.');return;}
 if(act==='sense'){const i=Number(val);game.seen=game.seen||[];if(!game.seen.includes(i))game.seen.push(i);if(game.seen.length===4){win();return;}feedback='You revealed another stage. Keep following the pathway!';redrawChallenge();return;}
 if(act==='dish'){const i=Number(val);game.tel=game.tel||[];if(!game.tel.includes(i))game.tel.push(i);feedback=game.tel.length===4?'All data gathered! You can now start the reconstruction.':'You activated a symbolic observatory.';redrawChallenge();return;}
 if(act==='assemble'){if((game.tel||[]).length===4)win();return;}
}
main.addEventListener('click',clickHandler);
modal.addEventListener('click',clickHandler);
document.getElementById('passportButton').addEventListener('click',openPassport);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
modal.addEventListener('input',e=>{if(e.target.id==='childName'){diplomaName=e.target.value;const el=modal.querySelector('#diplomaChild');if(el)el.textContent=diplomaName||'________________';}});
main.addEventListener('input',e=>{if(e.target.id==='gripSlider'){game.grip=Number(e.target.value);const p=main.querySelector('#gripFeedback');const v=game.grip;p.innerHTML=`<strong>${v<35?'The grip is too weak.':v>65?'You are squeezing too hard.':'The grip is controlled and gentle.'}</strong>`;main.querySelector('.gripper-scene')?.setAttribute('data-level',v<35?'soft':v>65?'hard':'good');}});
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
if(!location.hash)location.hash='atrio';
updateView(false);
