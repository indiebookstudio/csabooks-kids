// Museum of Impossible Discoveries — English Edition
'use strict';
const A = name => `assets/${name}.webp`;
const ROOMS = [
  {
    id: 1, slug: 'animali', label: 'Extraordinary Animals', title: 'The Ocean Hides Clues',
    teaser: 'Can sea kelp become a tool? And air bubbles a hunting net?',
    art: 'animali', sideArt: 'orche', otto: 'otto-curioso', icon: '✦', seal: 'Marine Lens',
    kicker: 'GALLERY 01 · EXTRAORDINARY ANIMALS',
    intro: 'Some animals astonish scientists not with magic, but because they do things no one ever expected.',
    question: 'A video can show us what happens. But can it tell us why right away?',
    mainTitle: 'The Case of the Mystery Kelp',
    main: 'In the Salish Sea, researchers filmed killer whales snapping off bull kelp and rolling it between their bodies. Seeing the behavior is one thing; figuring out its exact purpose is another.',
    challenge: 'prove',
    source: { code: 'SC-04', title: 'Orca Behavior Study (Current Biology)', url: 'https://doi.org/10.1016/j.cub.2025.04.021' },
    side: {
      title: "The Whale's Bubble Net", label: 'Another Exhibit',
      desc: 'Some humpback whales blow circular bubble nets to corral schooling fish. Bubbles are not solid walls: they alter prey behavior. The exact shapes and techniques vary among whales.',
      source: { code: 'SC-05', title: 'Humpback Whale Bubble Netting Research', url: 'https://doi.org/10.1098/rsos.240328' }
    },
    questionHint: 'Look closely at the kelp, but especially observe what the animals do with it.'
  },
  {
    id: 2, slug: 'piante', label: 'Plants and Tiny Worlds', title: 'A Garden That Shouldn\'t Exist',
    teaser: 'Sprouts in lunar regolith and ferns with colossal genomes.',
    art: 'piante', sideArt: 'felce-dna', otto: 'otto-pensieroso', icon: '✦', seal: 'Lunar Sprout',
    kicker: 'GALLERY 02 · PLANTS AND TINY WORLDS',
    intro: 'Plants seem motionless, yet they are organisms packed with unexpected responses. Even Moon dust became part of a breakthrough study.',
    question: 'To test if a plant truly grows in lunar soil, what must scientists compare it against?',
    mainTitle: 'Seeds and Moon Dust',
    main: 'In a lab, seeds sprouted in small samples of lunar regolith collected during Apollo missions. However, the seedlings exhibited clear signs of biological stress. Sprouting does not mean growing healthily like in rich soil.',
    challenge: 'terreno',
    source: { code: 'SC-12', title: 'Plants Grown in Apollo Lunar Regolith (Communications Biology)', url: 'https://doi.org/10.1038/s42003-022-03334-8' },
    side: {
      title: 'The Fern That Stunned Genetics', label: 'Another Exhibit',
      desc: 'A tiny fork fern in the genus Tmesipteris carries a monumental genome. The sheer amount of DNA does not determine intelligence or superiority: it is a biological curiosity to understand in context.',
      source: { code: 'SC-13', title: 'Genome Analysis of Tmesipteris', url: 'https://doi.org/10.1016/j.isci.2024.109889' }
    },
    questionHint: 'In a scientific experiment, always change only one variable at a time.'
  },
  {
    id: 3, slug: 'esperimenti', label: 'Surprising Experiments', title: 'The Fish on Four Wheels',
    teaser: 'Who is really steering a moving water tank?',
    art: 'esperimenti', sideArt: 'pesce', otto: 'otto-curioso', icon: '✦', seal: 'Curious Inventor',
    kicker: 'GALLERY 03 · SURPRISING EXPERIMENTS',
    intro: 'A great scientific experiment isn\'t magic: it is a chain of steps that we can reconstruct, control, and explain.',
    question: 'How can a fish drive a vehicle across a room without touching the wheels?',
    mainTitle: 'Rebuild the Lab Setup',
    main: 'In a unique study, researchers placed a fish tank atop a motorized robotic platform. A tracking system monitored the fish\'s position and translated swimming movements into steering commands. The fish had no steering wheel.',
    challenge: 'sequenza',
    source: { code: 'SC-15', title: 'Fish-Operated Vehicle: Behavioral Study', url: 'https://doi.org/10.1016/j.bbr.2021.113711' },
    side: {
      title: 'Bumblebees and Wooden Balls', label: 'Another Exhibit',
      desc: 'In lab experiments, bumblebees rolled small colored balls without receiving any food reward. Scientists studied whether the behavior qualified as genuine animal play.',
      source: { code: 'SC-16', title: 'Object Play in Bumblebees Research', url: 'https://doi.org/10.1016/j.anbehav.2022.08.013' }
    },
    questionHint: 'Which step translates the fish\'s movement into the rotation of the wheels?'
  },
  {
    id: 4, slug: 'dinosauri', label: 'Dinosaurs, Extinctions & DNA', title: 'Not All Dinosaurs Disappeared',
    teaser: 'In the avian family tree, chickens and T. rex share a surprising branch.',
    art: 'dinosauri', sideArt: 'dino-gallina', otto: 'otto-mondo', icon: '✦', seal: 'Fossil Hunter',
    kicker: 'GALLERY 04 · DINOSAURS, EXTINCTIONS & DNA',
    intro: 'Paleontology has rewritten history: modern birds are surviving theropod dinosaurs, not just distant observers.',
    question: 'Is a backyard chicken the direct grand-daughter of a giant T. rex?',
    mainTitle: 'Explore the Evolutionary Tree',
    main: 'Birds belong to the theropod branch of dinosaurs. But sharing common ancestors is different from being a direct child. A T. rex is an extinct cousin of the bird lineage, not grandpa chicken.',
    challenge: 'dino',
    source: { code: 'SC-38', title: 'How Dinosaurs Evolved into Birds (Natural History Museum)', url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html' },
    side: {
      title: 'Could We Ever Clone a Dinosaur?', label: 'Another Exhibit',
      desc: 'DNA degrades completely over millions of years. Scientists have recovered ancient DNA from mammoths and ice age mammals, but finding intact dinosaur DNA remains impossible.',
      source: { code: 'SC-39', title: 'Could Scientists Bring Dinosaurs Back? (NHM)', url: 'https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html' }
    },
    questionHint: 'Look at the branching points on the family tree: cousins versus grandparents.'
  },
  {
    id: 5, slug: 'laboratorio', label: 'The Future Lab', title: 'Machines Inspired by Nature',
    teaser: 'Soft elephant-trunk grippers and bio-hybrid fungal robots.',
    art: 'laboratorio', sideArt: 'pinza-robot', otto: 'otto-curioso', icon: '✦', seal: 'Bio-Engineer',
    kicker: 'GALLERY 05 · THE FUTURE LAB',
    intro: 'Nature solved difficult problems over millions of years. Engineers study biology to build flexible, gentle robots.',
    question: 'How do you grip a fragile, delicate object without crushing it?',
    mainTitle: 'Design the Gentle Grip',
    main: 'Researchers designed soft robotic grippers inspired by the musculature of an elephant\'s trunk. Wrapping softly around an object distributes pressure evenly. Try adjusting the grip strength in our simulation.',
    challenge: 'pinza',
    source: { code: 'SC-23', title: 'Elephant Trunk-Inspired Robotic Gripper (Nature)', url: 'https://doi.org/10.1038/s44182-025-00038-z' },
    side: {
      title: 'Mycelium Meets Robotics', label: 'Another Exhibit',
      desc: 'In a bio-hybrid prototype, natural electrical signals recorded from fungal mycelium were translated into movement commands for a rover. The fungus isn\'t conscious: human engineers designed the circuit.',
      source: { code: 'SC-25', title: 'Mycelium Bio-Hybrid Robot Research (Science Robotics)', url: 'https://doi.org/10.1126/scirobotics.adk8019' }
    },
    questionHint: 'Gripping harder isn\'t always better: balance is key.'
  },
  {
    id: 6, slug: 'corpo', label: 'Body and Supertechnologies', title: 'The Body Sends Signals',
    teaser: 'When muscles and smart engineering communicate.',
    art: 'corpo', sideArt: 'voce', otto: 'otto-pensieroso', icon: '✦', seal: 'Signal Explorer',
    kicker: 'GALLERY 06 · BODY AND SUPERTECHNOLOGIES',
    intro: 'Our bodies continuously produce bio-electrical pulses. Scientists develop interfaces that interpret these signals to help patients.',
    question: 'How can a bionic prosthesis anticipate a person\'s intended movement?',
    mainTitle: 'Follow the Signal Chain',
    main: 'At MIT, researchers created a bionic knee prosthesis surgically connected to muscular and nervous tissue to restore intuitive gait. Clinical results show how neural signals can directly guide artificial joints.',
    challenge: 'segnali',
    source: { code: 'SC-50', title: 'MIT News · A Bionic Knee Integrated into Living Tissue', url: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710' },
    side: {
      title: 'Restoring a Voice Through AI', label: 'Another Exhibit',
      desc: 'Brain-computer interfaces decode neural speech attempts into synthetic spoken words. These are research prototypes, not tools that read random thoughts.',
      source: { code: 'SC-53', title: 'Speech Neuroprosthesis Research (Nature Neuroscience)', url: 'https://doi.org/10.1038/s41593-025-01905-6' }
    },
    questionHint: 'A command doesn\'t happen by magic: there is a chain of signals.'
  },
  {
    id: 7, slug: 'spazio', label: 'Space: The Next Frontier', title: 'The Photo No Camera Ever Took',
    teaser: 'How astronomers reconstructed the first image of a black hole.',
    art: 'spazio', sideArt: 'galassia', otto: 'otto-mondo', icon: '✦', seal: 'Cosmic Pioneer',
    kicker: 'GALLERY 07 · SPACE: THE NEXT FRONTIER',
    intro: 'In deep space, single cameras cannot resolve distant objects. Scientists combine data gathered by observatories worldwide.',
    question: 'Did the first image of black hole M87* come from a single giant space camera?',
    mainTitle: 'Connect the Global Telescope Array',
    main: 'The Event Horizon Telescope synchronized radio observatories across four continents to simulate an Earth-sized telescope. Supercomputers then synthesized the radio data into the iconic glowing ring around M87*.',
    challenge: 'telescopi',
    source: { code: 'SC-48', title: 'ESO / EHT Collaboration · First Image of Black Hole M87*', url: 'https://www.eso.org/public/images/eso1907a/' },
    side: {
      title: 'A Visitor from Another Star System', label: 'Another Exhibit',
      desc: 'Comet 3I/ATLAS zipped through our Solar System on a hyperbolic open trajectory. Unlike periodic comets bound to the Sun, it visited once and heads back into deep interstellar space.',
      source: { code: 'SC-36', title: 'NASA · 3I/ATLAS Interstellar Comet Facts', url: 'https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/' }
    },
    questionHint: 'The image was built by combining multiple instruments and mathematical analysis, not a single photo.'
  }
];

const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-en-progress-v1';
let completed = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 7) : []);
  } catch { return new Set(); }
})();
let game = {}; let currentId = 0; let feedback = ''; let feedbackKind = ''; let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open source ${esc(s.code)} in a new tab">${esc(s.code)} · Original Source ↗</a>`;

function persist() {
  try { localStorage.setItem(storeKey, JSON.stringify([...completed])); } catch {}
  if (headerProgress) headerProgress.textContent = `${completed.size}/7`;
}
function navigateHome() { location.hash = 'atrio'; }
function roomForHash() { const match = (location.hash || '').match(/^#sala-([1-7])$/); return match ? Number(match[1]) : 0; }
function img(src, alt = '', cl = '') { return `<img src="${A(src)}" alt="${esc(alt)}" ${cl ? `class="${cl}"` : ''} loading="lazy">`; }

function syncLanguageLinks() {
  const h = location.hash || '#atrio';
  document.querySelectorAll('.locale-flag-item').forEach(el => {
    const href = el.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('javascript:')) {
      el.setAttribute('href', href.split('#')[0] + h);
    }
  });
}

function updateView(scroll = true) {
  const next = roomForHash();
  if (next !== currentId) { game = {}; feedback = ''; feedbackKind = ''; currentId = next; }
  persist();
  main.innerHTML = next ? renderRoom(ROOMS[next - 1]) : renderAtrium();
  syncLanguageLinks();
  if (scroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderAtrium() {
  const next = ROOMS.find(r => !completed.has(r.id)) || ROOMS[0];
  return `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="eyebrow">EXCLUSIVE BOOK COMPANION</div>
          <h1 class="display">THE MUSEUM OF<br><em>IMPOSSIBLE</em><br>DISCOVERIES</h1>
          <p class="lead">Seven galleries. Seven scientific mysteries. One curious little octopus waiting for you. Step in, observe the evidence, solve the puzzles, and collect Otto's seals.</p>
          <div class="hero-buttons">
            <a class="primary-button" href="#sala-${next.id}">${completed.size ? 'Continue Exploring' : 'Start Exploring'} →</a>
            <button class="quiet-button" data-act="passport">Open Explorer Passport</button>
          </div>
          <p class="hint">For explorers aged 7–12 · Free with the book · No account needed</p>
        </div>
        ${img('otto-mondo', 'Otto the explorer octopus embracing Earth', 'hero-otto')}
      </div>
    </section>

    <section class="wrap intro-section" id="sale">
      <div class="intro-row">
        <div>
          <div class="eyebrow">YOUR JOURNEY</div>
          <h2 class="section-heading">Choose a Gallery Door.</h2>
        </div>
        <p>You can visit the galleries in any order you like. Each time you solve a mystery, Otto adds an official seal to your passport.</p>
      </div>
      <div class="progress-rail" aria-label="${completed.size} galleries visited out of 7">
        <div style="width:${completed.size / 7 * 100}%"></div>
      </div>
      <div class="hint">${completed.size} of 7 galleries completed ${completed.size === 7 ? '· Your Explorer Diploma is ready!' : ''}</div>
    </section>

    <section class="wrap museum-map" aria-label="The seven museum galleries">
      ${ROOMS.map(r => `
        <a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}">
          <img src="${A(r.art)}" alt="" loading="lazy">
          ${completed.has(r.id) ? '<span class="badge-done">✦ Seal Earned</span>' : ''}
          <div class="card-inner">
            <span class="room-n">GALLERY ${String(r.id).padStart(2, '0')} · ${esc(r.icon)}</span>
            <h3>${esc(r.label)}</h3>
            <p>${esc(r.teaser)}</p>
            <span class="open-label">Explore gallery <span aria-hidden="true">→</span></span>
          </div>
        </a>
      `).join('')}
    </section>

    <section class="wrap value-strip">
      <div class="value-item">
        <b>Observe, don't guess blindly.</b>
        <p>Every activity starts with real observations and clues. Where science is still investigating, we say so clearly.</p>
      </div>
      <div class="value-item">
        <b>Every room tells a unique story.</b>
        <p>You won't find the same quiz seven times: each mystery challenges you with an interactive mechanic.</p>
      </div>
      <div class="value-item">
        <b>Real sources behind every discovery.</b>
        <p>You can view the authentic scientific publications. The SC codes match the reference section in your book.</p>
      </div>
    </section>
  `;
}

function renderRoom(r) {
  return `
    <section class="room-banner">
      <img class="room-backdrop" src="${A(r.art)}" alt="" role="presentation">
      <div class="room-banner-inner">
        <div class="crumb">
          <a href="#atrio">← Museum Lobby</a>
          <span>/</span>
          <span>Gallery ${r.id} of 7</span>
        </div>
        <div style="margin-top:27px">
          <span class="room-stamp">${r.icon} ${esc(r.kicker)}</span>
        </div>
        <h1 class="room-name">${esc(r.title)}</h1>
        <p class="room-intro">${esc(r.intro)}</p>
      </div>
    </section>

    <section class="wrap hall-grid">
      <article class="exhibit">
        <span class="label-muted">MAIN EXHIBIT</span>
        <h2>${esc(r.mainTitle)}</h2>
        <div class="exhibit-question">
          <span>THE QUESTION</span>
          <strong>${esc(r.question)}</strong>
        </div>
        <p>${esc(r.main)}</p>
        <div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div>
        <div class="source-row">
          <b>Scientific Publication</b>
          ${sourceHtml(r.source)}
        </div>
        <div class="art-notice">Museum illustrations are educational artistic reconstructions; the links lead to the original scientific studies.</div>
      </article>

      <aside class="side-exhibit">
        ${img(r.sideArt, r.side.title)}
        <div class="side-body">
          <div class="label-muted">${esc(r.side.label)}</div>
          <h3>${esc(r.side.title)}</h3>
          <p>${esc(r.side.desc)}</p>
          ${sourceHtml(r.side.source)}
          <div style="margin-top:18px">
            <button class="quiet-button" data-act="zoom" data-val="${r.id}">Enlarge Plate 🔍</button>
          </div>
        </div>
      </aside>
    </section>

    <section class="wrap" style="padding-bottom:60px">
      <div class="next-controls">
        <a class="quiet-button" href="#atrio">← Return to Lobby</a>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${r.id > 1 ? `<a class="quiet-button" href="#sala-${r.id - 1}">← Previous Gallery</a>` : ''}
          ${r.id < 7 ? `<a class="primary-button" href="#sala-${r.id + 1}">Next Gallery →</a>` : ''}
        </div>
      </div>
    </section>
  `;
}

function renderChallenge(r) {
  if (completed.has(r.id)) {
    return `
      <div class="win-card">
        <div class="seal-glow">${r.icon}</div>
        <h3>Seal Earned!</h3>
        <p>You solved the mystery of this gallery. Otto has stamped the <strong>${esc(r.seal)}</strong> seal in your explorer passport.</p>
        <button class="primary-button" data-act="passport">View Explorer Passport ✧</button>
      </div>
    `;
  }

  let body = '';
  if (r.challenge === 'prove') {
    const items = [
      'Orcas grasp kelp with their mouth and roll pieces across their bodies.',
      'Some orcas pass kelp strands back and forth to one another.',
      'Rolling in kelp definitely serves to dislodge pesky skin parasites.',
      'Orcas use kelp as underwater camouflage to sneak up on prey.'
    ];
    const idx = game.index || 0;
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 1 · Fact vs. Hypothesis</span>
        <p class="challenge-title">Read the statement below. Is it an <strong>observed fact</strong> recorded on camera, or an <strong>unproven hypothesis</strong>?</p>
        <div class="statement-card">
          <span class="statement-n">Clue ${idx + 1} of 4</span>
          <p class="statement-text">"${items[idx]}"</p>
        </div>
        <div class="choice-grid">
          <button class="choice-button" data-act="judge" data-val="osservato">👀 Observed Fact</button>
          <button class="choice-button" data-act="judge" data-val="ipotesi">💭 Hypothesis</button>
        </div>
      </div>
    `;
  } else if (r.challenge === 'terreno') {
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 2 · Fair Comparison</span>
        <p class="challenge-title">To prove whether Moon dust impairs plant growth, what is the best scientific control comparison?</p>
        <div class="choice-grid vertical">
          <button class="choice-button" data-act="soil" data-val="a">Grow a cactus on the Moon in freezing dark and compare it to a tomato in a warm Earth greenhouse.</button>
          <button class="choice-button" data-act="soil" data-val="b">Grow identical seeds under identical light, water, and temperature, changing only the soil: lunar regolith vs. terrestrial volcanic ash.</button>
        </div>
      </div>
    `;
  } else if (r.challenge === 'sequenza') {
    const steps = [
      { id: 1, name: '1. Fish swims toward a target', mark: '🐟' },
      { id: 2, name: '2. Overhead camera tracks fish position', mark: '📷' },
      { id: 3, name: '3. Onboard computer computes steering angle', mark: '💻' },
      { id: 4, name: '4. Electric motors rotate the wheels', mark: '⚙️' }
    ];
    const n = game.seq || 0;
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 3 · The Mechanical Chain</span>
        <p class="challenge-title">Assemble the 4 steps that allow a goldfish to drive a land vehicle:</p>
        <div class="seq-list">
          ${steps.map(s => `
            <button class="seq-button ${s.id <= n ? 'done' : s.id === n + 1 ? 'next' : ''}" data-act="step" data-val="${s.id}">
              <span>${s.mark}</span>
              <strong>${esc(s.name)}</strong>
              ${s.id <= n ? '<span class="check">✓</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  } else if (r.challenge === 'dino') {
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 4 · Reading the Evolutionary Tree</span>
        <p class="challenge-title">Which statement correctly explains the relation between modern birds and dinosaurs?</p>
        <div class="choice-grid vertical">
          <button class="choice-button" data-act="dino" data-val="1">Birds are surviving living theropods that share a common ancestor with T. rex; T. rex is not the chicken's direct parent.</button>
          <button class="choice-button" data-act="dino" data-val="2">T. rex layed eggs that gradually hatched smaller chickens until they became birds.</button>
        </div>
      </div>
    `;
  } else if (r.challenge === 'pinza') {
    const grip = game.grip === undefined ? 15 : game.grip;
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 5 · Soft Robotics Simulator</span>
        <p class="challenge-title">Adjust the slider to find the optimal gripper pressure to hold a fragile egg:</p>
        <div class="gripper-scene" data-level="${grip < 35 ? 'soft' : grip > 65 ? 'hard' : 'good'}">
          <input type="range" id="gripSlider" min="0" max="100" value="${grip}" aria-label="Grip pressure">
          <div class="range-labels"><span>Gentle</span><span>Firm</span></div>
          <div id="gripFeedback" class="grip-feedback">
            <strong>${grip < 35 ? 'The grip is too weak (egg will slip).' : grip > 65 ? 'Too tight (egg will crack)!' : 'Balanced and delicate: secure hold!'}</strong>
          </div>
          <button class="primary-button" data-act="grip-check" style="margin-top:14px">Test Grip Pressure</button>
        </div>
      </div>
    `;
  } else if (r.challenge === 'segnali') {
    const pts = [
      { id: 1, label: '1. Brain sends nerve impulses to thigh muscles' },
      { id: 2, label: '2. Sensors detect neuromuscular contraction' },
      { id: 3, label: '3. Processor interprets intended movement' },
      { id: 4, label: '4. Bionic knee motor flexes smoothly' }
    ];
    game.seen = game.seen || [];
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 6 · Neural Pathways</span>
        <p class="challenge-title">Click all 4 checkpoints in the neural signal transmission chain:</p>
        <div class="sensor-grid">
          ${pts.map(p => `
            <button class="sensor-node ${game.seen.includes(p.id) ? 'active' : ''}" data-act="sense" data-val="${p.id}">
              <span>${game.seen.includes(p.id) ? '⚡' : '○'}</span>
              <strong>${esc(p.label)}</strong>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  } else if (r.challenge === 'telescopi') {
    const observatories = [
      { id: 1, name: 'ALMA / APEX', loc: 'Atacama, Chile' },
      { id: 2, name: 'IRAM 30m', loc: 'Sierra Nevada, Spain' },
      { id: 3, name: 'SMA / JCMT', loc: 'Mauna Kea, Hawaii' },
      { id: 4, name: 'South Pole Telescope', loc: 'Antarctica' }
    ];
    game.tel = game.tel || [];
    body = `
      <div class="challenge-box">
        <span class="badge-mini">Challenge 7 · Event Horizon Array</span>
        <p class="challenge-title">Synchronize the radio observatories across Earth to reconstruct M87*:</p>
        <div class="eht-lab">
          ${observatories.map(o => `
            <button class="tel-dish ${game.tel.includes(o.id) ? 'connected' : ''}" data-act="dish" data-val="${o.id}">
              <span class="dish-icon">📡</span>
              <strong>${esc(o.name)}</strong>
              <small>${esc(o.loc)}</small>
            </button>
          `).join('')}
        </div>
        ${game.tel.length === 4 ? `
          <button class="primary-button" data-act="assemble" style="margin-top:16px">Reconstruct Black Hole Image ✦</button>
        ` : `<p class="hint" style="margin-top:12px">${game.tel.length}/4 observatories synchronized.</p>`}
      </div>
    `;
  }

  return `
    ${body}
    ${feedback ? `<div class="toast-feedback ${feedbackKind}">${esc(feedback)}</div>` : ''}
    <div class="hint-bar">
      <span>💡 Otto's Clue:</span> ${esc(r.questionHint)}
    </div>
  `;
}

function redrawChallenge() {
  const panel = document.getElementById('challengePanel');
  if (panel && currentId) panel.innerHTML = renderChallenge(ROOMS[currentId - 1]);
}

function win() {
  completed.add(currentId);
  persist();
  showToast('✦ Wonderful! You earned an explorer seal!');
  redrawChallenge();
}

function choiceRight(ok, wrongMsg, rightMsg) {
  if (ok) {
    win();
  } else {
    feedback = wrongMsg;
    feedbackKind = 'wrong';
    redrawChallenge();
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => { t.hidden = true; }, 3600);
}

function openPassport() {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h2>Explorer Passport ✧</h2>
        <button class="icon-button" data-act="close" aria-label="Close">✕</button>
      </div>
      <p style="color:var(--muted);font-size:14px;margin-top:6px">Collect all 7 seals to receive your official Explorer Diploma from Otto.</p>
      <div class="passport-list">
        ${ROOMS.map(r => `
          <div class="passport-seal ${completed.has(r.id) ? 'stamped' : ''}" title="${completed.has(r.id) ? esc(r.seal) : 'Undiscovered seal'}">
            ${completed.has(r.id) ? r.icon : '○'}
          </div>
        `).join('')}
      </div>
      <div class="hint" style="text-align:center">${completed.size} of 7 seals collected.</div>
      ${completed.size === 7 ? `
        <div class="diploma">
          <h3>✦ CERTIFICATE OF EXPLORATION ✦</h3>
          <p>This certifies that</p>
          <div class="large" id="diplomaChild">${esc(diplomaName || 'Curious Explorer')}</div>
          <p>has completed all seven galleries of the Museum of Impossible Discoveries and mastered scientific observation.</p>
          <label style="display:block;margin-top:16px;font-size:13px;font-weight:700">Type your name for printing:</label>
          <input type="text" id="childName" class="name-input" placeholder="Your name here..." value="${esc(diplomaName)}" maxlength="30">
          <div class="diploma-actions">
            <button class="primary-button" data-act="print">Print Diploma 🖨</button>
          </div>
        </div>
      ` : ''}
      <div style="margin-top:20px;text-align:right">
        <button class="quiet-button" data-act="reset-confirm" style="font-size:11px">Reset Passport Progress</button>
      </div>
    </div>
  `;
}

function openZoom(id) {
  const r = ROOMS[id - 1];
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.innerHTML = `
    <div class="modal-card" style="max-width:900px">
      <div class="modal-header">
        <h2>${esc(r.side.title)}</h2>
        <button class="icon-button" data-act="close" aria-label="Close">✕</button>
      </div>
      <img src="${A(r.sideArt)}" alt="${esc(r.side.title)}" style="width:100%;border-radius:14px;margin-top:16px">
      <p style="color:var(--muted);margin-top:14px">${esc(r.side.desc)}</p>
    </div>
  `;
}

function closeModal() {
  modal.hidden = true;
  modal.innerHTML = '';
  document.body.style.overflow = '';
}

function printDiploma() {
  const name = diplomaName.trim() || 'Curious Explorer';
  let p = document.getElementById('printSheet');
  if (!p) {
    p = document.createElement('div');
    p.id = 'printSheet';
    document.body.appendChild(p);
  }
  p.innerHTML = `
    <section class="print-certificate">
      <div>✦ ✦ ✦</div>
      <p>THE MUSEUM OF IMPOSSIBLE DISCOVERIES</p>
      <h1>EXPLORER DIPLOMA</h1>
      <p>Awarded to</p>
      <p class="named">${esc(name)}</p>
      <p>for completing all seven galleries, collecting every official seal,<br>and learning to distinguish scientific observations from hypotheses.</p>
      <p class="brand-print">✦ Otto, The Little Explorer ✦</p>
      <p>From: EINSTEIN, YOU MISSED THIS!</p>
    </section>
  `;
  window.print();
}

function clickHandler(e) {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const act = btn.dataset.act;
  const val = btn.dataset.val;

  if (act === 'passport') { openPassport(); return; }
  if (act === 'zoom') { openZoom(Number(val)); return; }
  if (act === 'close') { closeModal(); return; }
  if (act === 'print') {
    diplomaName = modal.querySelector('#childName')?.value.trim() || '';
    printDiploma();
    return;
  }
  if (act === 'reset-confirm') {
    if (window.confirm('Do you want to reset all seven seals saved on this device?')) {
      completed.clear(); game = {}; feedback = ''; persist(); closeModal(); updateView(false);
      showToast('Passport reset. Ready for a fresh exploration!');
    }
    return;
  }
  if (!currentId || completed.has(currentId)) return;

  feedback = ''; feedbackKind = '';
  if (act === 'judge') {
    const answers = ['osservato', 'osservato', 'ipotesi', 'ipotesi'];
    const idx = game.index || 0;
    if (val === answers[idx]) {
      game.index = idx + 1;
      if (game.index === 4) { win(); return; }
      feedback = 'Correct reasoning! Now check the next clue.';
    } else {
      feedback = answers[idx] === 'osservato'
        ? 'This behavior was visibly recorded on video: it is an observed fact.'
        : 'This is an unproven potential function: it is a hypothesis.';
      feedbackKind = 'wrong';
    }
    redrawChallenge(); return;
  }
  if (act === 'soil') {
    choiceRight(val === 'b', 'Changing multiple factors at once prevents knowing what caused the difference.', 'Great choice! Keeping all other variables identical is the hallmark of controlled science.');
    return;
  }
  if (act === 'step') {
    const expect = (game.seq || 0) + 1;
    if (Number(val) === expect) {
      game.seq = expect;
      if (expect === 4) { win(); return; }
      feedback = 'Correct! Next, choose the following step.';
    } else {
      feedback = 'That step happens later. Start from what the fish does first.';
      feedbackKind = 'wrong';
    }
    redrawChallenge(); return;
  }
  if (act === 'dino') {
    choiceRight(val === '1', 'Look at where the branch divides. T. rex is not a direct grandparent.', 'Spot on: birds are living theropod dinosaurs that share common ancestors with extinct branches.');
    return;
  }
  if (act === 'grip-check') {
    const x = game.grip === undefined ? 15 : game.grip;
    choiceRight(x >= 35 && x <= 65, x < 35 ? 'The grip slips: try slightly more pressure.' : 'Too strong! A rigid clamp could crush a fragile object.', 'You found the sweet spot! Real robots use advanced force sensors to achieve this balance.');
    return;
  }
  if (act === 'sense') {
    const i = Number(val);
    game.seen = game.seen || [];
    if (!game.seen.includes(i)) game.seen.push(i);
    if (game.seen.length === 4) { win(); return; }
    feedback = 'Signal checkpoint recorded. Follow the rest of the pathway.';
    redrawChallenge(); return;
  }
  if (act === 'dish') {
    const i = Number(val);
    game.tel = game.tel || [];
    if (!game.tel.includes(i)) game.tel.push(i);
    feedback = game.tel.length === 4 ? 'All telescopes synchronized! You can now synthesize the image.' : 'Observatory synchronized into the array.';
    redrawChallenge(); return;
  }
  if (act === 'assemble') {
    if ((game.tel || []).length === 4) win();
    return;
  }
}

main.addEventListener('click', clickHandler);
modal.addEventListener('click', clickHandler);
const passportBtn = document.getElementById('passportButton');
if (passportBtn) passportBtn.addEventListener('click', openPassport);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
modal.addEventListener('input', e => {
  if (e.target.id === 'childName') {
    diplomaName = e.target.value;
    const el = modal.querySelector('#diplomaChild');
    if (el) el.textContent = diplomaName || 'Curious Explorer';
  }
});
main.addEventListener('input', e => {
  if (e.target.id === 'gripSlider') {
    game.grip = Number(e.target.value);
    const p = main.querySelector('#gripFeedback');
    const v = game.grip;
    if (p) p.innerHTML = `<strong>${v < 35 ? 'The grip is too weak.' : v > 65 ? 'Too tight!' : 'Balanced and delicate hold.'}</strong>`;
    main.querySelector('.gripper-scene')?.setAttribute('data-level', v < 35 ? 'soft' : v > 65 ? 'hard' : 'good');
  }
});
document.addEventListener('click', e => {
  const flagLink = e.target.closest('.locale-flag-item');
  if (flagLink && flagLink.getAttribute('href') && flagLink.getAttribute('href') !== '#') {
    const isEn = flagLink.getAttribute('href').includes('/en/');
    try { localStorage.setItem('otto_lang', isEn ? 'en' : 'it'); } catch(_) {}
  }
});
window.addEventListener('hashchange', () => updateView());
if (!location.hash) location.hash = 'atrio';
updateView(false);
