// Museum of Impossible Discoveries — English Edition
'use strict';
const A = name => `assets/${name}.webp`;
const ROOMS = [
  {
    "id": 1,
    "slug": "animali",
    "label": "Animaux Extraordinaires",
    "title": "L’Océan Cache des Indices",
    "teaser": "Une algue peut-elle devenir un outil ? Et des bulles d’air un filet de pêche ?",
    "art": "animali",
    "sideArt": "orche",
    "otto": "otto-curioso",
    "icon": "🌊",
    "seal": "Lentille Marine",
    "kicker": "SALLE 01 · ANIMAUX EXTRAORDINAIRES",
    "intro": "Certains animaux surprennent la science non pas par magie, mais parce qu’ils font des choses que personne n’attendait.",
    "question": "Une vidéo peut nous montrer ce qui se passe. Mais peut-elle nous en donner immédiatement la raison ?",
    "mainTitle": "Le Cas du Varech Mystérieux",
    "main": "Dans la mer des Salish, des chercheurs ont filmé des orques arrachant du varech et le faisant rouler entre leurs corps. Observer un comportement est une chose ; prouver sa fonction exacte en est une autre.",
    "challenge": "prove",
    "source": {
      "code": "SC-04",
      "title": "Étude comportementale sur les orques (Current Biology)",
      "url": "https://doi.org/10.1016/j.cub.2025.04.021"
    },
    "side": {
      "title": "Le Filet de Bulles de la Baleine",
      "label": "Autre Objet Exposé",
      "desc": "Certaines baleines à bosse soufflent des rideaux circulaires de bulles d’air pour piéger les poissons. Les bulles ne sont pas des murs solides, mais elles modifient le comportement des proies.",
      "source": {
        "code": "SC-05",
        "title": "Recherche sur le filet de bulles (Royal Society)",
        "url": "https://doi.org/10.1098/rsos.240328"
      }
    },
    "questionHint": "Observe attentivement l’algue, mais regarde surtout ce que les animaux en font."
  },
  {
    "id": 2,
    "slug": "piante",
    "label": "Plantes et Mondes Invisibles",
    "title": "Un Jardin Inattendu",
    "teaser": "Des pousses dans la poussière lunaire et des fougères au génome colossal.",
    "art": "piante",
    "sideArt": "felce-dna",
    "otto": "otto-pensieroso",
    "icon": "🌿",
    "seal": "Pousse Lunaire",
    "kicker": "SALLE 02 · PLANTES ET MONDES INVISIBLES",
    "intro": "Les plantes semblent immobiles, mais elles sont pleines de réactions surprenantes. Même la poussière de Lune a fait l’objet d’une étude fascinante.",
    "question": "Pour tester si une plante pousse vraiment dans le sol lunaire, à quoi les scientifiques doivent-ils la comparer ?",
    "mainTitle": "Graines et Poussière Lunaire",
    "main": "En laboratoire, des graines ont germé dans de petites quantités de régolithe lunaire rapportées par les missions Apollo. Cependant, les plantules ont montré des signes nets de stress biologique.",
    "challenge": "terreno",
    "source": {
      "code": "SC-12",
      "title": "Plantes dans le régolithe lunaire (Communications Biology)",
      "url": "https://doi.org/10.1038/s42003-022-03334-8"
    },
    "side": {
      "title": "La Fougère qui a Étonné la Génétique",
      "label": "Autre Objet Exposé",
      "desc": "Une minuscule fougère du genre Tmesipteris possède un génome monumental. La quantité totale d’ADN ne dicte pas l’intelligence : c’est une curiosité biologique à comprendre dans son contexte.",
      "source": {
        "code": "SC-13",
        "title": "Analyse génomique de Tmesipteris (iScience)",
        "url": "https://doi.org/10.1016/j.isci.2024.109889"
      }
    },
    "questionHint": "Dans une expérience scientifique, ne change jamais qu’une seule variable à la fois."
  },
  {
    "id": 3,
    "slug": "esperimenti",
    "label": "Expériences Surprenantes",
    "title": "Le Poisson à Quatre Roues",
    "teaser": "Qui conduit vraiment un aquarium motorisé ?",
    "art": "esperimenti",
    "sideArt": "pesce",
    "otto": "otto-curioso",
    "icon": "🔬",
    "seal": "Inventeur Curieux",
    "kicker": "SALLE 03 · EXPÉRIENCES SURPRENANTES",
    "intro": "Une expérience scientifique n’est pas un tour de magie : c’est une chaîne d’étapes que l’on peut reconstituer, contrôler et expliquer.",
    "question": "Comment un poisson peut-il déplacer un véhicule sans toucher les roues ?",
    "mainTitle": "Reconstruire le Dispositif de Laboratoire",
    "main": "Dans une étude insolite, des chercheurs ont placé un bocal sur une plateforme robotisée. Une caméra suivait les déplacements du poisson rouge et traduisait ses mouvements de nage en commandes de direction pour les roues.",
    "challenge": "sequenza",
    "source": {
      "code": "SC-15",
      "title": "Navigation d’un poisson rouge sur terre (Behavioural Brain Research)",
      "url": "https://doi.org/10.1016/j.bbr.2021.113711"
    },
    "side": {
      "title": "Des Bourdons qui Jouent au Ballon",
      "label": "Autre Objet Exposé",
      "desc": "Des bourdons ont fait rouler de petites billes de bois sans obtenir de récompense en nourriture. Les scientifiques se demandent si cela s’apparente au jeu.",
      "source": {
        "code": "SC-16",
        "title": "Activité de jeu chez les bourdons (Animal Behaviour)",
        "url": "https://doi.org/10.1016/j.anbehav.2022.08.013"
      }
    },
    "questionHint": "Suis le cheminement de l’information : de l’œil au signal, puis du moteur au mouvement."
  },
  {
    "id": 4,
    "slug": "dinosauri",
    "label": "Dinosaures, Extinctions et ADN",
    "title": "Tous les Dinosaures n’ont pas Disparu",
    "teaser": "Oiseaux à plumes et le grand requin mégalodon.",
    "art": "dinosauri",
    "sideArt": "uccelli",
    "otto": "otto-curioso",
    "icon": "🦖",
    "seal": "Fossile Vivant",
    "kicker": "SALLE 04 · DINOSAURES, EXTINCTIONS ET ADN",
    "intro": "Regarder dans le passé nous aide à mieux comprendre le présent : ce que nous pensions disparu est parfois encore sous nos yeux.",
    "question": "Pourquoi un oiseau moderne est-il scientifiquement considéré comme un dinosaure ?",
    "mainTitle": "Un Dinosaure dans le Poulailler",
    "main": "Les oiseaux ne descendent pas seulement des dinosaures : ils en sont les représentants vivants. Ils partagent des caractères anatomiques uniques hérités de théropodes à plumes.",
    "challenge": "dino",
    "source": {
      "code": "SC-22",
      "title": "Évolution des dinosaures vers les oiseaux (Natural History Museum)",
      "url": "https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html"
    },
    "side": {
      "title": "La Vraie Silhouette du Mégalodon",
      "label": "Autre Objet Exposé",
      "desc": "Le grand mégalodon est souvent imaginé comme un gigantesque grand requin blanc. Les récentes réévaluations fossiles suggèrent une silhouette plus allongée et élancée.",
      "source": {
        "code": "SC-25",
        "title": "Réévaluation morphologique d’Otodus megalodon (Historical Biology)",
        "url": "https://doi.org/10.1080/08912963.2024.2380590"
      }
    },
    "questionHint": "Ne te fie pas uniquement aux apparences : observe les os et les parentés évolutives."
  },
  {
    "id": 5,
    "slug": "tecnologia",
    "label": "Laboratoire du Futur",
    "title": "Des Machines Inspirées par la Nature",
    "teaser": "Robotique biohybride fongique et matériaux intelligents.",
    "art": "laboratorio",
    "sideArt": "micelio",
    "otto": "otto-pensieroso",
    "icon": "🤖",
    "seal": "Robot Biohybride",
    "kicker": "SALLE 05 · LE LABORATOIRE DU FUTUR",
    "intro": "L’ingénierie moderne s’inspire de plus en plus de la biologie : elle utilise des signaux vivants pour actionner des circuits.",
    "question": "Comment un champignon peut-il contrôler les mouvements d’un robot sans avoir de cerveau ?",
    "mainTitle": "Le Mycélium aux Commandes",
    "main": "Des ingénieurs ont connecté du mycélium fongique vivant à des électrodes. Quand le champignon réagit à la lumière, ses impulsions électriques naturelles sont converties en ordres mécaniques pour faire marcher le robot.",
    "challenge": "bio",
    "source": {
      "code": "SC-36",
      "title": "Biohybride à base de mycélium fongique (Science Robotics)",
      "url": "https://doi.org/10.1126/scirobotics.adk8019"
    },
    "side": {
      "title": "Des Robots d’Origami qui se Déplient",
      "label": "Autre Objet Exposé",
      "desc": "Inspirés par l’art du pliage, certains robots se déploient d’eux-mêmes à partir d’une feuille plate dès qu’ils reçoivent de la chaleur ou un champ magnétique.",
      "source": {
        "code": "SC-35",
        "title": "Robotique origami autonome",
        "url": "https://doi.org/10.1038/s41586-023-06484-9"
      }
    },
    "questionHint": "Un signal électrique n’est pas une pensée : c’est une impulsion que des circuits peuvent mesurer."
  },
  {
    "id": 6,
    "slug": "corpo",
    "label": "Corps et Super-Technologies",
    "title": "Le Corps Émet des Signaux",
    "teaser": "Prothèses bioniques et nouvelles voies pour retrouver la parole.",
    "art": "corpo",
    "sideArt": "bionico",
    "otto": "otto-curioso",
    "icon": "⚡",
    "seal": "Impulsion Bionique",
    "kicker": "SALLE 06 · CORPS ET SUPER-TECHNOLOGIES",
    "intro": "La médecine expérimentale cherche de nouvelles façons de relier les signaux de notre corps à des technologies d’assistance avancées.",
    "question": "Qu’est-ce qui rend une prothèse bionique plus naturelle qu’une jambe artificielle ordinaire ?",
    "mainTitle": "La Prothèse Connectée aux Muscles",
    "main": "Un nouveau protocole chirurgical permet de réorganiser les muscles résiduels. Quand la personne pense à marcher, la prothèse détecte les signaux neuromusculaires et ajuste son mouvement en temps réel.",
    "challenge": "corpo",
    "source": {
      "code": "SC-43",
      "title": "Genou bionique à intégration tissulaire (Nature Medicine)",
      "url": "https://news.mit.edu/2024/bionic-knee-tissue-integration-0710"
    },
    "side": {
      "title": "Retrouver une Voix Grâce à l’IA",
      "label": "Autre Objet Exposé",
      "desc": "Des implants cérébraux couplés à des modèles d’apprentissage automatique traduisent l’activité du cortex en paroles audibles pour des personnes paralysées.",
      "source": {
        "code": "SC-46",
        "title": "Interface cerveau-machine pour la parole (Nature)",
        "url": "https://doi.org/10.1038/s41586-023-06443-4"
      }
    },
    "questionHint": "L’important n’est pas seulement le moteur, mais la communication entre le corps et la machine."
  },
  {
    "id": 7,
    "slug": "spazio",
    "label": "Espace : La Nouvelle Frontière",
    "title": "La Photo qu’Aucun Appareil n’a Prise",
    "teaser": "Le télescope géant virtuel et les secrets des trous noirs.",
    "art": "spazio",
    "sideArt": "galassia",
    "otto": "otto-pensieroso",
    "icon": "🌌",
    "seal": "Horizon Cosmique",
    "kicker": "SALLE 07 · ESPACE : LA NOUVELLE FRONTIÈRE",
    "intro": "Pour observer des objets invisibles situés à des millions d’années-lumière, il a fallu transformer notre planète entière en observatoire.",
    "question": "Comment les scientifiques ont-ils photographié un trou noir sans appareil photo géant dans l’espace ?",
    "mainTitle": "Un Télescope de la Taille de la Terre",
    "main": "Le projet Event Horizon Telescope a synchronisé des radiotélescopes répartis aux quatre coins du globe. En combinant leurs données par interférométrie, ils ont révélé l’ombre du trou noir M87*.",
    "challenge": "buco",
    "source": {
      "code": "SC-55",
      "title": "Premiers résultats du télescope Event Horizon (ApJL)",
      "url": "https://doi.org/10.3847/2041-8213/ab0ec7"
    },
    "side": {
      "title": "3I/ATLAS : Visiteuse Interstellaire",
      "label": "Autre Objet Exposé",
      "desc": "Une comète venue d’un autre système planétaire a traversé notre Système solaire. Sa trajectoire ouverte prouve qu’elle ne reviendra jamais.",
      "source": {
        "code": "SC-52",
        "title": "Observations de comètes interstellaires (NASA/JPL)",
        "url": "https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/"
      }
    },
    "questionHint": "Aucun télescope seul ne suffisait : la force réside dans la combinaison des données."
  }
];

const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-fr-progress-v1';
let completed = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 7) : []);
  } catch { return new Set(); }
})();
let game = {}; let currentId = 0; let feedback = ''; let feedbackKind = ''; let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open source ${esc(s.code)} in a new tab">${esc(s.code)} · Source originale ↗</a>`;

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
          <div class="eyebrow">COMPAGNON EXCLUSIF DU LIVRE</div>
          <h1 class="display">LE MUSÉE DES<br><em>DÉCOUVERTES</em><br>IMPOSSIBLES</h1>
          <p class="lead">Sept salles. Sept mystères scientifiques. Une petite pieuvre curieuse qui t’attend. Entre, observe les preuves, résous les énigmes et collectionne les sceaux d’Otto.</p>
          <div class="hero-buttons">
            <a class="primary-button" href="#sala-${next.id}">${completed.size ? 'Continuer l'exploration' : 'Commencer l'exploration'} →</a>
            <button class="quiet-button" data-act="passport">Ouvrir le Passeport d'Explorateur</button>
          </div>
          <p class="hint">Pour explorateurs de 7 à 12 ans · Gratuit avec le livre · Sans compte</p>
        </div>
        ${img('otto-mondo', 'Otto the explorer octopus embracing Earth', 'hero-otto')}
      </div>
    </section>

    <section class="wrap intro-section" id="sale">
      <div class="intro-row">
        <div>
          <div class="eyebrow">TON PARCOURS</div>
          <h2 class="section-heading">Choisis la porte d'une salle.</h2>
        </div>
        <p>Tu peux visiter les salles dans l’ordre de ton choix. Chaque fois que tu résous un mystère, Otto appose un sceau officiel dans ton passeport.</p>
      </div>
      <div class="progress-rail" aria-label="${completed.size} galleries visited out of 7">
        <div style="width:${completed.size / 7 * 100}%"></div>
      </div>
      <div class="hint">${completed.size} of 7 salles complétées ${completed.size === 7 ? '· Ton diplôme d'explorateur est prêt !' : ''}</div>
    </section>

    <section class="wrap museum-map" aria-label="The seven museum galleries">
      ${ROOMS.map(r => `
        <a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}">
          <img src="${A(r.art)}" alt="" loading="lazy">
          ${completed.has(r.id) ? '<span class="badge-done">✦ Sceau Obtenu</span>' : ''}
          <div class="card-inner">
            <span class="room-n">SALLE ${String(r.id).padStart(2, '0')} · ${esc(r.icon)}</span>
            <h3>${esc(r.label)}</h3>
            <p>${esc(r.teaser)}</p>
            <span class="open-label">Explorer la salle <span aria-hidden="true">→</span></span>
          </div>
        </a>
      `).join('')}
    </section>

    <section class="wrap value-strip">
      <div class="value-item">
        <b>Observe, ne devine pas au hasard.</b>
        <p>Chaque activité repose sur de vraies observations. Là où la science cherche encore, nous le disons clairement.</p>
      </div>
      <div class="value-item">
        <b>Chaque salle a sa propre histoire.</b>
        <p>Pas de quiz répétitif : chaque mystère te met au défi avec un jeu interactif original.</p>
      </div>
      <div class="value-item">
        <b>De vraies sources derrière chaque merveille.</b>
        <p>Tu peux consulter les publications scientifiques authentiques. Les codes SC correspondent à ceux de ton livre.</p>
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
          <a href="#atrio">← Hall du musée</a>
          <span>/</span>
          <span>Gallery ${r.id} sur 7</span>
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
        <span class="label-muted">PIÈCE PRINCIPALE</span>
        <h2>${esc(r.mainTitle)}</h2>
        <div class="exhibit-question">
          <span>LA QUESTION</span>
          <strong>${esc(r.question)}</strong>
        </div>
        <p>${esc(r.main)}</p>
        <div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div>
        <div class="source-row">
          <b>Publication Scientifique</b>
          ${sourceHtml(r.source)}
        </div>
        <div class="art-notice">Les illustrations du musée sont des reconstitutions pédagogiques ; les liens mènent aux études scientifiques d’origine.</div>
      </article>

      <aside class="side-exhibit">
        ${img(r.sideArt, r.side.title)}
        <div class="side-body">
          <div class="label-muted">${esc(r.side.label)}</div>
          <h3>${esc(r.side.title)}</h3>
          <p>${esc(r.side.desc)}</p>
          ${sourceHtml(r.side.source)}
          <div style="margin-top:18px">
            <button class="quiet-button" data-act="zoom" data-val="${r.id}">Agrandir la planche 🔍</button>
          </div>
        </div>
      </aside>
    </section>

    <section class="wrap" style="padding-bottom:60px">
      <div class="next-controls">
        <a class="quiet-button" href="#atrio">← Retour au hall</a>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${r.id > 1 ? `<a class="quiet-button" href="#sala-${r.id - 1}">← Salle précédente</a>` : ''}
          ${r.id < 7 ? `<a class="primary-button" href="#sala-${r.id + 1}">Salle suivante →</a>` : ''}
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
        <h3>Sceau Obtenu !</h3>
        <p>Tu as résolu le mystère de cette salle. Otto a apposé le sceau <strong>${esc(r.seal)}</strong> dans ton passeport d'explorateur.</p>
        <button class="primary-button" data-act="passport">Voir le Passeport d'Explorateur ✧</button>
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
        <span class="badge-mini">Défi 1 · Fait contre hypothèse</span>
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
        <span class="badge-mini">Défi 2 · Comparaison rigoureuse</span>
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
        <span class="badge-mini">Défi 3 · La chaîne mécanique</span>
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
        <span class="badge-mini">Défi 4 · Lire l’arbre évolutif</span>
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
        <span class="badge-mini">Défi 5 · Simulateur de robotique biohybride</span>
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
        <span class="badge-mini">Défi 6 · Voies neuromusculaires</span>
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
        <span class="badge-mini">Défi 7 · Réseau Event Horizon</span>
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
      feedback = 'Raisonnement exact ! Vérifie maintenant l’indice suivant.';
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
      feedback = 'Exact ! Choisis ensuite l’étape suivante.';
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
