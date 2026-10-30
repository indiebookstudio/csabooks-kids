// Museum of Impossible Discoveries — English Edition
'use strict';
const A = name => `assets/${name}.webp`;
const ROOMS = [
  {
    "id": 1,
    "slug": "animali",
    "label": "Animales Extraordinarios",
    "title": "El Océano Esconde Pistas",
    "teaser": "¿Puede un alga convertirse en herramienta? ¿Y unas burbujas en red de pesca?",
    "art": "animali",
    "sideArt": "orche",
    "otto": "otto-curioso",
    "icon": "🌊",
    "seal": "Lente Marina",
    "kicker": "SALA 01 · ANIMALES EXTRAORDINARIOS",
    "intro": "Algunos animales sorprenden a la ciencia no por magia, sino porque hacen cosas que nadie esperaba ver.",
    "question": "Un vídeo puede mostrarnos qué ocurre. Pero, ¿puede explicarnos el motivo de inmediato?",
    "mainTitle": "El Caso del Alga Misteriosa",
    "main": "En el mar de Salish, los científicos grabaron orcas arrancando algas laminarias y haciéndolas rodar entre sus cuerpos. Ver el comportamiento es una cosa; descubrir su función exacta es otra.",
    "challenge": "prove",
    "source": {
      "code": "SC-04",
      "title": "Estudio de conducta de orcas (Current Biology)",
      "url": "https://doi.org/10.1016/j.cub.2025.04.021"
    },
    "side": {
      "title": "La Red de Burbujas de la Ballena",
      "label": "Otra Pieza Expuesta",
      "desc": "Algunas ballenas jorobadas expulsan cortinas circulares de burbujas para acorralar bancos de peces. Las burbujas no son muros sólidos, pero alteran la conducta de las presas.",
      "source": {
        "code": "SC-05",
        "title": "Investigación sobre redes de burbujas (Royal Society)",
        "url": "https://doi.org/10.1098/rsos.240328"
      }
    },
    "questionHint": "Observa bien las algas, pero fíjate sobre todo en lo que hacen los animales con ellas."
  },
  {
    "id": 2,
    "slug": "piante",
    "label": "Plantas y Mundos Diminutos",
    "title": "Un Jardín Inesperado",
    "teaser": "Brotes en polvo lunar y helechos con genomas colosales.",
    "art": "piante",
    "sideArt": "felce-dna",
    "otto": "otto-pensieroso",
    "icon": "🌿",
    "seal": "Brote Lunar",
    "kicker": "SALA 02 · PLANTAS Y MUNDOS DIMINUTOS",
    "intro": "Las plantas parecen quietas, pero están llenas de respuestas asombrosas. Hasta el polvo de la Luna formó parte de un estudio pionero.",
    "question": "Para comprobar si una planta crece de verdad en suelo lunar, ¿con qué deben compararla los científicos?",
    "mainTitle": "Semillas y Polvo Lunar",
    "main": "En el laboratorio, varias semillas brotaron en pequeñas muestras de regolito lunar traídas por las misiones Apolo. Sin embargo, las plantas mostraron claros signos de estrés biológico.",
    "challenge": "terreno",
    "source": {
      "code": "SC-12",
      "title": "Plantas en regolito lunar (Communications Biology)",
      "url": "https://doi.org/10.1038/s42003-022-03334-8"
    },
    "side": {
      "title": "El Helecho que Asombró a la Genética",
      "label": "Otra Pieza Expuesta",
      "desc": "Un diminuto helecho del género Tmesipteris alberga un genoma colosal. La cantidad total de ADN no determina la inteligencia: es una curiosidad biológica para entender en su contexto.",
      "source": {
        "code": "SC-13",
        "title": "Análisis del genoma de Tmesipteris (iScience)",
        "url": "https://doi.org/10.1016/j.isci.2024.109889"
      }
    },
    "questionHint": "En un experimento científico, cambia siempre una sola variable cada vez."
  },
  {
    "id": 3,
    "slug": "esperimenti",
    "label": "Experimentos Sorprendentes",
    "title": "El Pez sobre Cuatro Ruedas",
    "teaser": "¿Quién conduce de verdad un acuario motorizado?",
    "art": "esperimenti",
    "sideArt": "pesce",
    "otto": "otto-curioso",
    "icon": "🔬",
    "seal": "Inventor Curioso",
    "kicker": "SALA 03 · EXPERIMENTOS SORPRENDENTES",
    "intro": "Un gran experimento científico no es magia: es una cadena de pasos que podemos reconstruir, controlar y explicar.",
    "question": "¿Cómo puede un pez mover un vehículo terrestre sin tocar las ruedas?",
    "mainTitle": "Reconstruir el Montaje de Laboratorio",
    "main": "En un estudio singular, los investigadores colocaron una pecera sobre una plataforma robótica con ruedas. Una cámara seguía la posición del pez y traducía su nado en órdenes de giro para las ruedas.",
    "challenge": "sequenza",
    "source": {
      "code": "SC-15",
      "title": "Navegación de un pez en tierra (Behavioural Brain Research)",
      "url": "https://doi.org/10.1016/j.bbr.2021.113711"
    },
    "side": {
      "title": "Abejorros que Juegan a la Pelota",
      "label": "Otra Pieza Expuesta",
      "desc": "Varios abejorros hicieron rodar bolitas de madera sin recibir premio dulce a cambio. Los científicos investigan si se trata de una auténtica conducta de juego.",
      "source": {
        "code": "SC-16",
        "title": "Juego en abejorros (Animal Behaviour)",
        "url": "https://doi.org/10.1016/j.anbehav.2022.08.013"
      }
    },
    "questionHint": "Sigue el viaje de la información: del ojo a la señal, y del motor al movimiento."
  },
  {
    "id": 4,
    "slug": "dinosauri",
    "label": "Dinosaurios, Extinciones y ADN",
    "title": "No Todos los Dinosaurios Desaparecieron",
    "teaser": "Aves con plumas y el gran tiburón megalodón.",
    "art": "dinosauri",
    "sideArt": "uccelli",
    "otto": "otto-curioso",
    "icon": "🦖",
    "seal": "Fósil Viviente",
    "kicker": "SALA 04 · DINOSAURIOS, EXTINCIONES Y ADN",
    "intro": "Mirar al pasado nos ayuda a comprender el presente: lo que creíamos extinguido a veces sigue vivo ante nuestros ojos.",
    "question": "¿Por qué las aves actuales se consideran científicamente dinosaurios?",
    "mainTitle": "Un Dinosaurio en el Gallinero",
    "main": "Las aves no solo descienden de los dinosaurios: son dinosaurios vivos. Comparten rasgos anatómicos únicos heredados de terópodos carnívoros emplumados.",
    "challenge": "dino",
    "source": {
      "code": "SC-22",
      "title": "Evolución de dinosaurios a aves (Natural History Museum)",
      "url": "https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html"
    },
    "side": {
      "title": "La Verdadera Forma del Megalodón",
      "label": "Otra Pieza Expuesta",
      "desc": "El gran megalodón suele imaginarse como un tiburón blanco gigante. Las últimas revisiones fósiles sugieren una silueta más alargada y estilizada.",
      "source": {
        "code": "SC-25",
        "title": "Revisión morfológica de Otodus megalodon (Historical Biology)",
        "url": "https://doi.org/10.1080/08912963.2024.2380590"
      }
    },
    "questionHint": "No te fíes solo de las apariencias: observa los huesos y los parentescos biológicos."
  },
  {
    "id": 5,
    "slug": "tecnologia",
    "label": "El Laboratorio del Futuro",
    "title": "Máquinas Inspiradas en la Naturaleza",
    "teaser": "Robótica biohíbrida con hongos y materiales inteligentes.",
    "art": "laboratorio",
    "sideArt": "micelio",
    "otto": "otto-pensieroso",
    "icon": "🤖",
    "seal": "Robot Biohíbrido",
    "kicker": "SALA 05 · EL LABORATORIO DEL FUTURO",
    "intro": "La ingeniería moderna se inspira cada vez más en la biología: aprovecha señales vivas para accionar circuitos electrónicos.",
    "question": "¿Cómo puede un hongo guiar los movimientos de un robot sin tener cerebro?",
    "mainTitle": "El Micelio al Mando",
    "main": "Los ingenieros conectaron micelio fúngico vivo a electrodos. Cuando el hongo reacciona ante la luz, sus impulsos eléctricos naturales se traducen en órdenes de movimiento para los motores del robot.",
    "challenge": "bio",
    "source": {
      "code": "SC-36",
      "title": "Biohíbridos basados en micelio (Science Robotics)",
      "url": "https://doi.org/10.1126/scirobotics.adk8019"
    },
    "side": {
      "title": "Robots de Origami que se Despliegan",
      "label": "Otra Pieza Expuesta",
      "desc": "Inspirados en el arte del papel plegado, algunos robots se despliegan por sí solos desde una lámina plana al recibir calor o campos magnéticos.",
      "source": {
        "code": "SC-35",
        "title": "Robótica origami autónoma",
        "url": "https://doi.org/10.1038/s41586-023-06484-9"
      }
    },
    "questionHint": "Una señal eléctrica no es un pensamiento: es un pulso medible que los circuitos pueden interpretar."
  },
  {
    "id": 6,
    "slug": "corpo",
    "label": "Cuerpo y Supertecnologías",
    "title": "El Cuerpo Emite Señales",
    "teaser": "Prótesis biónicas y nuevas formas de recuperar la voz.",
    "art": "corpo",
    "sideArt": "bionico",
    "otto": "otto-curioso",
    "icon": "⚡",
    "seal": "Impulso Biónico",
    "kicker": "SALA 06 · CUERPO Y SUPERTECNOLOGÍAS",
    "intro": "La medicina experimental busca nuevas formas de conectar las señales de nuestro cuerpo con tecnologías avanzadas de asistencia.",
    "question": "¿Qué hace que una prótesis biónica se sienta más natural que una pierna artificial común?",
    "mainTitle": "La Prótesis Conectada a los Músculos",
    "main": "Un nuevo método quirúrgico reorganiza los músculos del miembro residual. Al pensar en caminar, la prótesis detecta los impulsos neuromusculares y ajusta el movimiento en tiempo real.",
    "challenge": "corpo",
    "source": {
      "code": "SC-43",
      "title": "Rodilla biónica integrada en tejidos (Nature Medicine)",
      "url": "https://news.mit.edu/2024/bionic-knee-tissue-integration-0710"
    },
    "side": {
      "title": "Recuperar la Voz con Inteligencia Artificial",
      "label": "Otra Pieza Expuesta",
      "desc": "Varios implantes cerebrales combinados con modelos de aprendizaje automático traducen la actividad neuronal en palabras audibles para personas que no pueden hablar.",
      "source": {
        "code": "SC-46",
        "title": "Interfaz cerebro-ordenador para el habla (Nature)",
        "url": "https://doi.org/10.1038/s41586-023-06443-4"
      }
    },
    "questionHint": "Lo importante no es solo el motor, sino la comunicación entre el cuerpo y la máquina."
  },
  {
    "id": 7,
    "slug": "spazio",
    "label": "Espacio: La Próxima Frontera",
    "title": "La Foto que Ninguna Cámara Tomó",
    "teaser": "El telescopio virtual gigante y los secretos de los agujeros negros.",
    "art": "spazio",
    "sideArt": "galassia",
    "otto": "otto-pensieroso",
    "icon": "🌌",
    "seal": "Horizonte Cósmico",
    "kicker": "SALA 07 · ESPACIO: LA PRÓXIMA FRONTERA",
    "intro": "Para observar objetos invisibles a millones de años luz de distancia, fue necesario convertir a nuestro planeta entero en un telescopio.",
    "question": "¿Cómo fotografiaron los científicos un agujero negro sin una cámara espacial gigante?",
    "mainTitle": "Un Telescopio del Tamaño de la Tierra",
    "main": "El proyecto Event Horizon Telescope sincronizó radiotelescopios repartidos por todo el globo terráqueo. Combinando sus datos mediante interferometría, revelaron la sombra del agujero negro M87*.",
    "challenge": "buco",
    "source": {
      "code": "SC-55",
      "title": "Primeros resultados del Event Horizon Telescope (ApJL)",
      "url": "https://doi.org/10.3847/2041-8213/ab0ec7"
    },
    "side": {
      "title": "3I/ATLAS: Visitante Interestelar",
      "label": "Otra Pieza Expuesta",
      "desc": "Un cometa procedente de otra estrella atravesó nuestro Sistema solar. Su trayectoria abierta hiperbólica confirma que jamás regresará.",
      "source": {
        "code": "SC-52",
        "title": "Observaciones de cometas interestelares (NASA/JPL)",
        "url": "https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/"
      }
    },
    "questionHint": "Ningún telescopio en solitario era suficiente: el secreto estuvo en unir los datos de todos."
  }
];

const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-es-progress-v1';
let completed = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 7) : []);
  } catch { return new Set(); }
})();
let game = {}; let currentId = 0; let feedback = ''; let feedbackKind = ''; let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open source ${esc(s.code)} in a new tab">${esc(s.code)} · Fuente original ↗</a>`;

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
          <div class="eyebrow">COMPAÑERO EXCLUSIVO DEL LIBRO</div>
          <h1 class="display">EL MUSEO DE LOS<br><em>DESCUBRIMIENTOS</em><br>IMPOSIBLES</h1>
          <p class="lead">Siete salas. Siete misterios científicos. Un pequeño pulpo curioso esperándote. Entra, observa las pruebas, resuelve los enigmas y colecciona los sellos de Otto.</p>
          <div class="hero-buttons">
            <a class="primary-button" href="#sala-${next.id}">${completed.size ? 'Continuar la exploración' : 'Comenzar la exploración'} →</a>
            <button class="quiet-button" data-act="passport">Abrir Pasaporte de Explorador</button>
          </div>
          <p class="hint">Para exploradores de 7 a 12 años · Gratis con el libro · Sin registro</p>
        </div>
        ${img('otto-mondo', 'Otto the explorer octopus embracing Earth', 'hero-otto')}
      </div>
    </section>

    <section class="wrap intro-section" id="sale">
      <div class="intro-row">
        <div>
          <div class="eyebrow">TU RECORRIDO</div>
          <h2 class="section-heading">Elige la puerta de una sala.</h2>
        </div>
        <p>Puedes visitar las salas en el orden que prefieras. Cada vez que resuelvas un misterio, Otto estampará un sello oficial en tu pasaporte.</p>
      </div>
      <div class="progress-rail" aria-label="${completed.size} galleries visited out of 7">
        <div style="width:${completed.size / 7 * 100}%"></div>
      </div>
      <div class="hint">${completed.size} of 7 salas completadas ${completed.size === 7 ? '· ¡Tu diploma de explorador está listo!' : ''}</div>
    </section>

    <section class="wrap museum-map" aria-label="The seven museum galleries">
      ${ROOMS.map(r => `
        <a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}">
          <img src="${A(r.art)}" alt="" loading="lazy">
          ${completed.has(r.id) ? '<span class="badge-done">✦ Sello Conseguido</span>' : ''}
          <div class="card-inner">
            <span class="room-n">SALA ${String(r.id).padStart(2, '0')} · ${esc(r.icon)}</span>
            <h3>${esc(r.label)}</h3>
            <p>${esc(r.teaser)}</p>
            <span class="open-label">Explorar sala <span aria-hidden="true">→</span></span>
          </div>
        </a>
      `).join('')}
    </section>

    <section class="wrap value-strip">
      <div class="value-item">
        <b>Observa, no adivines a ciegas.</b>
        <p>Cada actividad parte de observaciones reales. Cuando la ciencia aún investiga, lo decimos con total claridad.</p>
      </div>
      <div class="value-item">
        <b>Cada sala cuenta una historia única.</b>
        <p>No encontrarás el mismo cuestionario siete veces: cada misterio te propone un juego interactivo diferente.</p>
      </div>
      <div class="value-item">
        <b>Fuentes reales detrás de cada maravilla.</b>
        <p>Puedes consultar las publicaciones científicas originales. Los códigos SC coinciden con los de tu libro.</p>
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
          <a href="#atrio">← Vestíbulo del museo</a>
          <span>/</span>
          <span>Gallery ${r.id} de 7</span>
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
        <span class="label-muted">PIEZA PRINCIPAL</span>
        <h2>${esc(r.mainTitle)}</h2>
        <div class="exhibit-question">
          <span>LA PREGUNTA</span>
          <strong>${esc(r.question)}</strong>
        </div>
        <p>${esc(r.main)}</p>
        <div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div>
        <div class="source-row">
          <b>Publicación Científica</b>
          ${sourceHtml(r.source)}
        </div>
        <div class="art-notice">Las ilustraciones del museo son reconstrucciones educativas; los enlaces llevan a los artículos científicos originales.</div>
      </article>

      <aside class="side-exhibit">
        ${img(r.sideArt, r.side.title)}
        <div class="side-body">
          <div class="label-muted">${esc(r.side.label)}</div>
          <h3>${esc(r.side.title)}</h3>
          <p>${esc(r.side.desc)}</p>
          ${sourceHtml(r.side.source)}
          <div style="margin-top:18px">
            <button class="quiet-button" data-act="zoom" data-val="${r.id}">Ampliar lámina 🔍</button>
          </div>
        </div>
      </aside>
    </section>

    <section class="wrap" style="padding-bottom:60px">
      <div class="next-controls">
        <a class="quiet-button" href="#atrio">← Volver al vestíbulo</a>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${r.id > 1 ? `<a class="quiet-button" href="#sala-${r.id - 1}">← Sala anterior</a>` : ''}
          ${r.id < 7 ? `<a class="primary-button" href="#sala-${r.id + 1}">Siguiente sala →</a>` : ''}
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
        <h3>¡Sello Conseguido!</h3>
        <p>Has resuelto el enigma de esta sala. Otto ha estampado el sello <strong>${esc(r.seal)}</strong> en tu pasaporte de explorador.</p>
        <button class="primary-button" data-act="passport">Ver Pasaporte de Explorador ✧</button>
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
        <span class="badge-mini">Desafío 1 · Hecho vs. hipótesis</span>
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
        <span class="badge-mini">Desafío 2 · Comparación justa</span>
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
        <span class="badge-mini">Desafío 3 · La cadena mecánica</span>
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
        <span class="badge-mini">Desafío 4 · Leer el árbol evolutivo</span>
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
        <span class="badge-mini">Desafío 5 · Simulador de robótica blanda</span>
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
        <span class="badge-mini">Desafío 6 · Vías neuronales</span>
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
        <span class="badge-mini">Desafío 7 · Red Event Horizon</span>
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
      feedback = '¡Razonamiento correcto! Ahora comprueba la siguiente pista.';
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
      feedback = '¡Correcto! A continuación, elige el siguiente paso.';
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
