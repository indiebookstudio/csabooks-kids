'use strict';
const films = [
  { n: 1, code: 'SC-05', cat: 'EXTRAORDINARY ANIMALS', title: "The Whale's Bubble Net", lead: "How can rings of air bubbles become a hunting net?", about: "Humpback whales blow circular bubble nets that concentrate fish and krill before lunging upward.", video: 'OTTO_FILM_01_balena.mp4', source: 'https://doi.org/10.1098/rsos.240328', anim: '../animazioni/01.Megattere/la_rete_invisibile_delle_megattere.html' },
  { n: 2, code: 'SC-13', cat: 'PLANTS AND TINY WORLDS', title: 'The Fern with Giant DNA', lead: 'Can a tiny fork fern carry more DNA than a human?', about: 'Tmesipteris oblanceolata holds around 160 billion base pairs: over 50 times the human haploid genome. More DNA does not equal higher intelligence.', video: 'OTTO_FILM_02_felce.mp4', source: 'https://doi.org/10.1016/j.isci.2024.109889', anim: '../animazioni/02.Felce.DNA/la_felce_con_un_dna_gigantesco.html' },
  { n: 3, code: 'SC-15', cat: 'SURPRISING EXPERIMENTS', title: 'A Fish Takes the Wheel', lead: 'How can a motorized water tank follow where a fish swims?', about: "An overhead camera tracks the fish's position and an onboard computer translates swimming motion into steering commands. The fish has no steering wheel.", video: 'OTTO_FILM_03_pesce.mp4', source: 'https://doi.org/10.1016/j.bbr.2021.113711', anim: '../animazioni/03.Pesce.Veicolo/il_pesce_che_muove_un_veicolo.html' },
  { n: 4, code: 'SC-38', cat: 'DINOSAURS AND DNA', title: 'A Dinosaur in the Henhouse', lead: 'Is T. rex really the direct grandfather of a modern chicken?', about: 'No. Birds are surviving theropod dinosaurs, but T. rex is an extinct cousin rather than a direct ancestor.', video: 'OTTO_FILM_04_dinosauri.mp4', source: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html', anim: '../animazioni/04.Uccelli.Dinosauri/gli_uccelli_sono_dinosauri_vivi.html' },
  { n: 5, code: 'SC-25', cat: 'THE FUTURE LAB', title: 'A Fungus Wired to a Robot', lead: 'Can fungal mycelium really help steer a robot rover?', about: "Sensors record bioelectrical signals from fungal threads, and engineered circuits translate them into motion commands. The fungus isn't conscious.", video: 'OTTO_FILM_05_micelio.mp4', source: 'https://doi.org/10.1126/scirobotics.adk8019', anim: '../animazioni/05.Fungo.Robot/il_fungo_collegato_a_un_robot.html' },
  { n: 6, code: 'SC-50', cat: 'BODY AND SUPERTECHNOLOGIES', title: 'The Bionic Knee', lead: 'How can an artificial prosthesis respond to natural muscle intent?', about: 'Experimental surgery integrates nerves and muscles directly with prosthetic sensors, restoring intuitive gait control.', video: 'OTTO_FILM_06_ginocchio.mp4', source: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710', anim: '../animazioni/06.Ginocchio.Bionico/il_ginocchio_bionico.html' },
  { n: 7, code: 'SC-48', cat: 'SPACE AND THE UNIVERSE', title: 'The First Image of a Black Hole', lead: 'How many cameras did it take to capture supermassive black hole M87*?', about: 'The Event Horizon Telescope combined synchronized radio observatories worldwide, synthesizing data into the famous glowing ring.', video: 'OTTO_FILM_07_buco_nero.mp4', source: 'https://www.eso.org/public/images/eso1907a/', anim: '../animazioni/07.Buco.Nero/come_nasce_l_immagine_di_un_buco_nero.html' },
  { n: 8, code: 'SC-36', cat: 'SPACE AND THE UNIVERSE', title: 'An Interstellar Comet', lead: "Why won't comet 3I/ATLAS ever return to our Sun?", about: '3I/ATLAS originates from interstellar space. Its hyperbolic orbit means it swung through once and will never return.', video: 'OTTO_FILM_08_3I_ATLAS.mp4', source: 'https://science.nasa.gov/solar-system/comets/3i-atlas/', anim: null }
];

let active = 0; let seen;
try {
  seen = JSON.parse(localStorage.getItem('otto-scienza-animata-en-v1') || '[]');
  if (!Array.isArray(seen)) seen = [];
} catch { seen = []; }
seen = seen.filter(n => Number.isInteger(n) && n >= 1 && n <= 8);

const $ = sel => document.querySelector(sel);

function updateProgress() {
  const n = seen.length;
  $('#seenCount').textContent = n;
  $('#progressMarks').innerHTML = films.map(f => `<span class="mark ${seen.includes(f.n) ? 'done' : ''}" title="Film ${f.n}: ${seen.includes(f.n) ? 'completed' : 'unwatched'}">${f.n}</span>`).join('');
  $('#completion').textContent = n === 8
    ? 'Congratulations! You explored all eight scientific phenomena. Otto is proud of your curiosity!'
    : `${n} of 8 phenomena explored. Each film holds a new surprise.`;
  document.querySelectorAll('.film-card').forEach(b => {
    const id = Number(b.dataset.id);
    b.querySelector('.view-flag').textContent = seen.includes(id) ? 'WATCHED' : '10 s';
    b.querySelector('.view-flag').classList.toggle('viewed', seen.includes(id));
  });
}

function renderCards() {
  const grid = $('#filmGrid');
  grid.innerHTML = films.map(f => `
    <button type="button" class="film-card" role="listitem" aria-label="Play film ${f.n}: ${f.title}" aria-current="${f.n === 1 ? 'true' : 'false'}" data-id="${f.n}">
      <div class="film-thumb">
        <img src="assets/film_${String(f.n).padStart(2, '0')}.jpg" alt="" loading="lazy">
        <span class="play-circle" aria-hidden="true">▶</span>
      </div>
      <div class="card-body">
        <div class="card-kicker">FILM ${String(f.n).padStart(2, '0')} · ${f.code}</div>
        <h4>${f.title}</h4>
        <div class="card-foot">
          <span>${f.cat}</span>
          <span class="view-flag">10 s</span>
        </div>
      </div>
    </button>
  `).join('');
  grid.querySelectorAll('button').forEach(button => button.addEventListener('click', () => pick(Number(button.dataset.id) - 1, true)));
}

function pick(index, scroll = false) {
  active = (index + films.length) % films.length;
  const f = films[active], player = $('#player');
  player.pause();
  player.src = 'video/' + f.video;
  player.poster = `assets/film_${String(f.n).padStart(2, '0')}.jpg`;
  player.load();
  $('#videoTag').textContent = `FILM ${String(f.n).padStart(2, '0')} / 08`;
  $('#room').textContent = f.cat;
  $('#filmTitle').textContent = f.title;
  $('#filmLead').textContent = f.lead;
  $('#filmExplain').textContent = f.about;
  $('#filmCode').textContent = f.code;
  $('#getFilm').href = 'video/' + f.video;
  $('#sourceLink').href = f.source;
  const simBtn = $('#simLink');
  if (simBtn) {
    if (f.anim) {
      simBtn.style.display = 'inline-flex';
      simBtn.href = f.anim;
    } else {
      simBtn.style.display = 'none';
    }
  }
  document.querySelectorAll('.film-card').forEach(b => b.setAttribute('aria-current', String(Number(b.dataset.id) === f.n)));
  if (scroll) {
    document.querySelector('.theater').scrollIntoView({ block: 'start', behavior: 'smooth' });
    player.play().catch(() => {});
  }
}

renderCards();
updateProgress();
pick(0);

$('#previous').addEventListener('click', () => pick(active - 1));
$('#next').addEventListener('click', () => pick(active + 1));
$('#player').addEventListener('ended', () => {
  const n = films[active].n;
  if (!seen.includes(n)) {
    seen.push(n);
    try { localStorage.setItem('otto-scienza-animata-en-v1', JSON.stringify(seen)); } catch {}
    updateProgress();
  }
});
