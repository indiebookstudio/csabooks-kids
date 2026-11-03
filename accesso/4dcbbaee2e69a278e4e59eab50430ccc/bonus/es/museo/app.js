'use strict';
/* Museo delle Scoperte Impossibili — standalone, offline-capable, no analytics. */
const A = name => `assets/${name}.webp?v=20261103`;
const ROOMS = [
  {
    "id": 1,
    "slug": "animali",
    "label": "Animales extraordinarios",
    "title": "El océano esconde pistas",
    "teaser": "¿Puede un alga convertirse en herramienta? ¿Y unas burbujas en red?",
    "art": "animali",
    "sideArt": "orche",
    "otto": "otto-curioso",
    "icon": "◉",
    "seal": "La lente marina",
    "kicker": "SALA 01 · ANIMALES EXTRAORDINARIOS",
    "intro": "Algunos animales sorprenden a la ciencia no por magia, sino porque hacen cosas que nadie esperaba.",
    "question": "Un vídeo puede mostrarnos qué ocurre. Pero, ¿puede decirnos enseguida por qué?",
    "mainTitle": "El caso del alga misteriosa",
    "main": "En el mar de Salish, los investigadores filmaron orcas arrancando un tramo de alga y haciéndolo rodar entre sus cuerpos. Observar el movimiento es una cosa; entender su función exacta es otra.",
    "challenge": "prove",
    "source": {
      "code": "SC-04",
      "title": "Estudio sobre el comportamiento de las orcas (Current Biology)",
      "url": "https://doi.org/10.1016/j.cub.2025.04.021"
    },
    "side": {
      "title": "La ballena que pesca con burbujas",
      "label": "Otra pieza expuesta",
      "desc": "Algunas ballenas jorobadas producen redes de burbujas para concentrar a los peces. Las burbujas no son una pared sólida: modifican la conducta de las presas. Su forma y su uso pueden variar.",
      "source": {
        "code": "SC-05",
        "title": "Investigación sobre las redes de burbujas de las ballenas",
        "url": "https://doi.org/10.1098/rsos.240328"
      },
      "figureAlt": "Orcas interactuando con un fragmento de alga en el mar de Salish",
      "figureTitle": "La ballena que pesca con burbujas"
    },
    "questionHint": "Mira el alga, pero sobre todo observa qué hacen los animales con ella."
  },
  {
    "id": 2,
    "slug": "piante",
    "label": "Plantas y pequeños mundos",
    "title": "Un jardín inesperado",
    "teaser": "Brotes en polvo lunar y helechos con un ADN gigantesco.",
    "art": "piante",
    "sideArt": "felce-dna",
    "otto": "otto-pensieroso",
    "icon": "✿",
    "seal": "El brote lunar",
    "kicker": "SALA 02 · PLANTAS Y PEQUEÑOS MUNDOS",
    "intro": "Las plantas parecen quietas, pero son organismos llenos de respuestas asombrosas. Hasta el polvo de la Luna formó parte de una investigación.",
    "question": "Para saber si una planta crece en el regolito lunar, ¿qué debemos comparar?",
    "mainTitle": "La semilla y el polvo de la Luna",
    "main": "En el laboratorio, varias semillas brotaron en pequeñas muestras de regolito lunar traídas por las misiones Apolo. Sin embargo, las plantas mostraron signos de estrés. Brotar no significa crecer tan bien como en tierra fértil.",
    "challenge": "terreno",
    "source": {
      "code": "SC-12",
      "title": "Plantas cultivadas en regolito lunar (Communications Biology)",
      "url": "https://doi.org/10.1038/s42003-022-03334-8"
    },
    "side": {
      "title": "El helecho que asombró a la genética",
      "label": "Otra pieza expuesta",
      "desc": "Un diminuto helecho del género Tmesipteris posee un genoma colosal. La cantidad de ADN no mide la inteligencia o la complejidad de un organismo: es un rasgo biológico para entender en su contexto.",
      "source": {
        "code": "SC-13",
        "title": "Estudio del genoma de Tmesipteris (iScience)",
        "url": "https://doi.org/10.1016/j.isci.2024.109889"
      },
      "figureTitle": "El helecho con el ADN gigantesco",
      "figureAlt": "Comparación visual esquemática entre el genoma humano y el ADN de Tmesipteris oblanceolata",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Comparación del genoma (valores 1C)</h4><div class=\"data-compare\"><div class=\"data-row\"><span class=\"data-label\">Ser humano:</span><strong class=\"data-val\">aprox. 3,10 mil millones de pares de bases</strong></div><div class=\"data-row\"><span class=\"data-label\"><em>Tmesipteris oblanceolata</em>:</span><strong class=\"data-val\">aprox. 160,45 mil millones de pares de bases</strong></div></div><p class=\"data-note\">La comparación se refiere al genoma haploide (valor 1C). Tener más de 50 veces más ADN no implica mayor inteligencia, complejidad biológica ni superioridad evolutiva: el tamaño del genoma no mide la complejidad de un organismo vivo.</p><p class=\"data-disclaimer\"><em>Nota metodológica:</em> la ilustración tiene una finalidad meramente esquemática y divulgativa; las proporciones visuales no están a escala molecular real.</p></div>",
      "artNotice": "Ilustración esquemática con fines educativos, no fotografía científica. Para los datos oficiales, consulta el estudio SC-13."
    },
    "questionHint": "En una comparación científica, intenta cambiar un solo elemento cada vez."
  },
  {
    "id": 3,
    "slug": "esperimenti",
    "label": "Experimentos sorprendentes",
    "title": "El pez sobre cuatro ruedas",
    "teaser": "¿Quién conduce de verdad un acuario móvil?",
    "art": "esperimenti",
    "sideArt": "pesce",
    "otto": "otto-curioso",
    "icon": "⌁",
    "seal": "El inventor curioso",
    "kicker": "SALA 03 · EXPERIMENTOS SORPRENDENTES",
    "intro": "Un gran invento no es magia: es una cadena de pasos que podemos reconstruir, controlar y explicar.",
    "question": "¿Cómo puede un pez mover un vehículo terrestre sin tocar las ruedas?",
    "mainTitle": "Pon en orden el laboratorio",
    "main": "En un experimento, los investigadores montaron una pecera sobre una plataforma con motor. Un sistema detectaba la posición del pez y la traducía en órdenes para las ruedas. El pez no conducía con un volante.",
    "challenge": "sequenza",
    "source": {
      "code": "SC-15",
      "title": "Vehículo accionado por un pez (BBR)",
      "url": "https://doi.org/10.1016/j.bbr.2021.113711"
    },
    "side": {
      "title": "Los abejorros y las pelotas",
      "label": "Otra pieza expuesta",
      "desc": "En varios ensayos, algunos abejorros hicieron rodar bolitas de madera sin premio a cambio. Los científicos analizan si es conducta de juego, sin atribuirles pensamientos humanos.",
      "source": {
        "code": "SC-16",
        "title": "Investigación sobre el juego en abejorros",
        "url": "https://doi.org/10.1016/j.anbehav.2022.08.013"
      },
      "figureTitle": "El pez y el vehículo",
      "figureAlt": "Esquema de la cadena tecnológica del vehículo accionado por el pez dorado",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Cómo funciona el vehículo (cadena de control)</h4><ol class=\"step-list\"><li><strong>1. El pez nada:</strong> el pez dorado se desplaza libremente dentro del tanque de agua transparente.</li><li><strong>2. Una cámara detecta la posición:</strong> una cámara cenital graba el tanque y rastrea continuamente la posición y orientación del pez.</li><li><strong>3. Una computadora convierte los datos en órdenes:</strong> un ordenador de a bordo traduce el movimiento en órdenes de dirección y velocidad.</li><li><strong>4. El sistema motorizado mueve las ruedas:</strong> los motores accionan las ruedas haciendo avanzar el vehículo en la dirección señalada.</li></ol><p class=\"data-note\"><strong>Aclaración científica:</strong> el pez no maneja un volante ni conduce de forma deliberada; el desplazamiento depende del sistema tecnológico diseñado por los investigadores para transformar el nado en traslación terrestre.</p></div>",
      "artNotice": "Esquema ilustrativo del sistema robótico. Para el vídeo y el artículo original, consulta el estudio SC-15.",
      "figureSource": {
        "code": "SC-15",
        "title": "Fish-operated vehicle: estudio del comportamiento",
        "url": "https://doi.org/10.1016/j.bbr.2021.113711"
      }
    },
    "questionHint": "¿Qué paso convierte un movimiento observado en movimiento de las ruedas?"
  },
  {
    "id": 4,
    "slug": "dinosauri",
    "label": "Dinosaurios, extintos y ADN",
    "title": "No todos los dinosaurios desaparecieron",
    "teaser": "En la historia de las aves hay una rama asombrosa.",
    "art": "dinosauri",
    "sideArt": "uccelli",
    "otto": "otto-pensieroso",
    "icon": "❖",
    "seal": "El detective del pasado",
    "kicker": "SALA 04 · DINOSAURIOS, EXTINTOS Y ADN",
    "intro": "Los fósiles son pistas. A partir de un fragmento, una pluma o una forma ósea, los científicos reconstruyen historias milenarias.",
    "question": "¿Desciende la gallina directamente del T. rex?",
    "mainTitle": "El árbol genealógico oculto",
    "main": "Las aves son dinosaurios terópodos vivientes. El T. rex era un pariente lejano, no el abuelo de la gallina. La clave es el antepasado común.",
    "challenge": "parentela",
    "source": {
      "code": "SC-38",
      "title": "Natural History Museum — Cómo los dinosaurios evolucionaron en aves",
      "url": "https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html"
    },
    "side": {
      "title": "¿Por qué un fósil no basta para clonar un dinosaurio?",
      "label": "Otra pieza expuesta",
      "desc": "Un fósil nos enseña mucho sobre la forma de un animal extinto. Pero clonarlo requeriría material biológico adecuado, no una roca mineralizada. La magia del cine no es un método de laboratorio.",
      "source": {
        "code": "SC-39",
        "title": "Natural History Museum — ¿Podrían los científicos revivir a los dinosaurios?",
        "url": "https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html"
      },
      "figureAlt": "Vínculo evolutivo entre dinosaurios terópodos y aves modernas",
      "figureTitle": "¿Por qué un fósil no basta para clonar un dinosaurio?"
    },
    "questionHint": "En un árbol evolutivo cuenta el punto donde se bifurcan las ramas."
  },
  {
    "id": 5,
    "slug": "laboratorio",
    "label": "El laboratorio del futuro",
    "title": "Máquinas que aprenden de la naturaleza",
    "teaser": "¿Puede una trompa inspirar una pinza robótica?",
    "art": "laboratorio",
    "sideArt": "micelio",
    "otto": "otto-curioso",
    "icon": "⚙",
    "seal": "El ingeniero de la naturaleza",
    "kicker": "SALA 05 · EL LABORATORIO DEL FUTURO",
    "intro": "Muchas tecnologías nacen de observar: ¿cómo resuelve un ser vivo un reto complejo?",
    "question": "¿Cómo agarrarías un objeto frágil sin romperlo?",
    "mainTitle": "Diseña el agarre perfecto",
    "main": "Los investigadores diseñan pinzas flexibles inspiradas en la trompa de los elefantes. Envolver un objeto delicado evita romperlo con piezas rígidas. Aquí puedes probar un modelo interactivo y divertido.",
    "challenge": "pinza",
    "source": {
      "code": "SC-23",
      "title": "Estudio sobre pinzas robóticas inspiradas en la trompa",
      "url": "https://doi.org/10.1038/s44182-025-00038-z"
    },
    "side": {
      "title": "El micelio conoce a un robot",
      "label": "Otra pieza expuesta",
      "desc": "En un prototipo de prueba, señales eléctricas de micelio fúngico fueron traducidas por circuitos para mover un robot. No significa que el hongo decida adónde ir.",
      "source": {
        "code": "SC-25",
        "title": "Investigación sobre robots controlados por micelio",
        "url": "https://doi.org/10.1126/scirobotics.adk8019"
      },
      "figureTitle": "El micelio y el robot",
      "figureAlt": "Esquema del robot biohíbrido accionado por las señales eléctricas del micelio fúngico",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Del micelio al movimiento (cadena biohíbrida)</h4><ol class=\"step-list\"><li><strong>1. El micelio presenta actividad eléctrica:</strong> la red subterránea del hongo genera impulsos bioeléctricos medibles.</li><li><strong>2. Los electrodos captan las señales:</strong> diminutos sensores registran las variaciones de potencial biológico.</li><li><strong>3. Un circuito electrónico las interpreta:</strong> una placa especializada traduce los impulsos biológicos en órdenes digitales.</li><li><strong>4. El sistema controla el robot:</strong> los actuadores mecánicos mueven las patas o ruedas del robot biohíbrido.</li></ol><p class=\"data-note\"><strong>Aclaración científica:</strong> esto no significa que el hongo posea intenciones conscientes ni conduzca de manera autónoma como un ser humano; el robot reacciona ante señales biológicas procesadas por un circuito artificial.</p></div>",
      "artNotice": "Interpretación gráfica del sistema biohíbrido. Para el artículo científico original, consulta SC-25."
    },
    "questionHint": "Apretar con más fuerza no siempre es la mejor solución."
  },
  {
    "id": 6,
    "slug": "corpo",
    "label": "Cuerpo y supertecnologías",
    "title": "El cuerpo envía mensajes",
    "teaser": "Cuando los músculos y la ingeniería trabajan juntos.",
    "art": "corpo",
    "sideArt": "voce",
    "otto": "otto-pensieroso",
    "icon": "✧",
    "seal": "El explorador de señales",
    "kicker": "SALA 06 · CUERPO Y SUPERTECNOLOGÍAS",
    "intro": "Nuestro cuerpo envía señales continuamente. Los científicos estudian cómo conectarlas con dispositivos que ayuden a las personas.",
    "question": "¿Cómo puede una prótesis recibir indicaciones de un movimiento?",
    "mainTitle": "Sigue la señal",
    "main": "En el MIT se estudió una rodilla biónica integrada en los tejidos para recuperar una marcha más natural. Son resultados de ensayos clínicos específicos.",
    "challenge": "segnali",
    "source": {
      "code": "SC-50",
      "title": "MIT News — Una rodilla biónica integrada en tejidos",
      "url": "https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710"
    },
    "side": {
      "title": "Cuando la tecnología ayuda a la voz",
      "label": "Otra pieza expuesta",
      "desc": "Equipos de investigación prueban interfaces neuronales para traducir la actividad cerebral en palabras habladas. Son herramientas de laboratorio, no aparatos que lean pensamientos.",
      "source": {
        "code": "SC-53",
        "title": "Investigación sobre neuroprótesis para la comunicación",
        "url": "https://doi.org/10.1038/s41593-025-01905-6"
      },
      "figureAlt": "Interfaz tecnológica de asistencia vocal y transmisión de señales",
      "figureTitle": "Cuando la tecnología ayuda a la voz"
    },
    "questionHint": "Una orden motora no es magia: es una cadena conectada de impulsos."
  },
  {
    "id": 7,
    "slug": "spazio",
    "label": "Espacio: la próxima frontera",
    "title": "La foto que ninguna cámara tomó",
    "teaser": "¿Cómo se reconstruye la imagen de un agujero negro?",
    "art": "spazio",
    "sideArt": "galassia",
    "otto": "otto-mondo",
    "icon": "✦",
    "seal": "El explorador cósmico",
    "kicker": "SALA 07 · ESPACIO: LA PRÓXIMA FRONTIERA",
    "intro": "En el espacio no se puede mirar como en la Tierra. Los científicos combinan datos captados en lugares muy distantes del planeta.",
    "question": "¿La primera imagen de M87* se tomó con una sola cámara?",
    "mainTitle": "Enciende la red de radiotelescopios",
    "main": "El Event Horizon Telescope unió observaciones de radiotelescopios de todo el mundo y procesó los datos para reconstruir la imagen del agujero negro M87*. Nuestro juego usa cuatro observatorios simbólicos.",
    "challenge": "telescopi",
    "source": {
      "code": "SC-48",
      "title": "ESO / Colaboración EHT — Primera imagen del agujero negro M87*",
      "url": "https://www.eso.org/public/images/eso1907a/"
    },
    "side": {
      "title": "Un cometa que viene de otro sistema",
      "label": "Otra pieza expuesta",
      "desc": "El cometa interestelar 3I/ATLAS cruzó el Sistema Solar en una trayectoria abierta hiperbólica. No tiene una órbita cerrada alrededor del Sol y no volverá jamás.",
      "source": {
        "code": "SC-36",
        "title": "NASA — 3I/ATLAS: preguntas y respuestas",
        "url": "https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/"
      },
      "figureTitle": "La reconstrucción de M87*",
      "figureAlt": "Esquema artístico de la red Event Horizon Telescope y de la reconstrucción de la imagen de M87*",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">De la Tierra a M87*: capturar lo invisible</h4><ol class=\"step-list\"><li><strong>1. Varios radiotelescopios recogen observaciones:</strong> instrumentos sincronizados en distintos puntos de la Tierra observan simultáneamente la misma región cósmica.</li><li><strong>2. Los datos se sincronizan y combinan:</strong> relojes atómicos y supercomputadoras alinean las grabaciones mediante interferometría (VLBI).</li><li><strong>3. El procesamiento reconstruye la imagen:</strong> potentes algoritmos procesan las medidas permitiendo reconstruir la imagen de la región del agujero negro M87*.</li></ol><p class=\"data-note\"><strong>Nota metodológica:</strong> la imagen mostrada es un esquema artístico y educativo para comprender el método, NO la fotografía científica original del Event Horizon Telescope (EHT).</p></div>",
      "artNotice": "Esquema artístico educativo: no es la fotografía oficial de la EHT. La imagen científica original puede consultarse en la fuente SC-48.",
      "figureSource": {
        "code": "SC-48",
        "title": "ESO / EHT Collaboration — primera imagen del agujero negro M87*",
        "url": "https://www.eso.org/public/images/eso1907a/"
      }
    },
    "questionHint": "El resultado nace de sincronizar muchos telescopios, no de una sola foto."
  }
];
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-es-progress-v1';
let completed = (() => { try {const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); return new Set(Array.isArray(saved)?saved.filter(n => Number.isInteger(n)&&n>=1&&n<=7):[]);}catch{return new Set();}})();
let game = {}; let currentId = 0;let feedback = '';let feedbackKind='';let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Abrir la fuente  en una pestaña nueva')} ${esc(s.code)}">${esc(s.code)} · Fuente original ↗</a>`;
function persist(){try{localStorage.setItem(storeKey,JSON.stringify([...completed]));}catch{}headerProgress.textContent=`${completed.size}/7`;}
function navigateHome(){location.hash='atrio';}
function roomForHash(){const match=(location.hash||'').match(/^#sala-([1-7])$/);return match?Number(match[1]):0;}
function img(src,alt='',cl=''){return `<img src="${A(src)}" alt="${esc(alt)}" ${cl?`class="${cl}"`:''} loading="lazy">`;}
function syncLanguageLinks(){const h=location.hash||'#atrio';document.querySelectorAll('.locale-flag-item').forEach(el=>{const href=el.getAttribute('href');if(href&&href!=='#'&&!href.startsWith('javascript:')){el.setAttribute('href',href.split('#')[0]+h);}});}
function updateView(scroll=true){ const next = roomForHash(); if(next!==currentId){game={};feedback='';feedbackKind='';currentId=next;} persist();main.innerHTML = next?renderRoom(ROOMS[next-1]):renderAtrium();syncLanguageLinks();if(scroll)window.scrollTo({top:0,behavior:'instant'});}
function renderAtrium(){
 const next=ROOMS.find(r=>!completed.has(r.id))||ROOMS[0];
 return `<section class="hero"><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">EL BONUS INTERACTIVO DEL LIBRO</div><h1 class="display">EL MUSEO DE LOS<br><em>DESCUBRIMIENTOS</em><br>IMPOSIBLES</h1><p class="lead">Siete salas. Siete misterios de la ciencia. Un pequeño pulpo explorador que te espera. Entra, observa, descubre las pistas y reúne los sellos de Otto.</p><div class="hero-buttons"><a class="primary-button" href="#sala-${next.id}">${completed.size?'Continuar la exploración':'Iniciar la exploración'} →</a><button class="quiet-button" data-act="passport">Abrir el pasaporte</button></div><p class="hint">Para mentes curiosas de 7 a 12 años · Gratis con el libro · No requiere cuenta</p></div>${img('otto-mondo','Otto, el pequeño pulpo explorador, abrazando el planeta Tierra','hero-otto')}</div></section>
 <section class="wrap intro-section" id="sale"><div class="intro-row"><div><div class="eyebrow">TU RECORRIDO</div><h2 class="section-heading">Elige una puerta.</h2></div><p>Puedes visitar las salas en el orden que prefieras. Cada vez que resuelvas un misterio, Otto añadirá un sello a tu pasaporte.</p></div><div class="progress-rail" aria-label="${completed.size} salas visitadas de 7"><div style="width:${completed.size/7*100}%"></div></div><div class="hint">${completed.size} salas completadas de 7  ${completed.size===7?'· ¡Tu diploma está listo!':''}</div></section>
 <section class="wrap museum-map" aria-label="Salas del museo">${ROOMS.map(r=>`<a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}"><img src="${A(r.art)}" alt="" loading="lazy">${completed.has(r.id)?'<span class="badge-done">✓ Sello obtenido</span>':''}<div class="card-inner"><span class="room-n">SALA ${String(r.id).padStart(2,'0')} · ${esc(r.icon)}</span><h3>${esc(r.label)}</h3><p>${esc(r.teaser)}</p><span class="open-label">Explorar la sala <span aria-hidden="true">→</span></span></div></a>`).join('')}</section>
 <section class="wrap value-strip"><div class="value-item">Observa, no adivines al azar.<p>Cada actividad parte de hechos reales. Donde la ciencia aún duda, te lo decimos con total claridad.</p></div><div class="value-item">Cada sala cuenta otra historia.<p>No encontrarás el mismo test siete veces: cada enigma usa una mecánica distinta.</p></div><div class="value-item">Una fuente para cada descubrimiento.<p>Puedes abrir los artículos científicos originales. El código SC coincide con el de tu libro.</p></div></section>`;
}
function renderRoom(r){
return `<section class="room-banner"><img class="room-backdrop" src="${A(r.art)}" alt="" role="presentation"><div class="room-banner-inner"><div class="crumb"><a href="#atrio">← Vestíbulo del museo</a><span>/</span><span>Sala ${r.id} de 7</span></div><div style="margin-top:27px"><span class="room-stamp">${r.icon} ${esc(r.kicker)}</span></div><h1 class="room-name">${esc(r.title)}</h1><p class="room-intro">${esc(r.intro)}</p></div></section>
<section class="wrap hall-grid"><article class="exhibit"><span class="label-muted">PIEZA PRINCIPAL</span><h2>${esc(r.mainTitle)}</h2><div class="exhibit-question"><span>LA PREGUNTA</span><strong>${esc(r.question)}</strong></div><p>${esc(r.main)}</p><div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div><div class="source-row"><b>Documento científico</b>${sourceHtml(r.source)}</div><div class="art-notice">Las ilustraciones del museo son interpretaciones artísticas; los enlaces conducen a las fuentes originales.</div></article><aside class="side-exhibit"><div class="side-figure-wrap">${img(r.sideArt, r.side.figureAlt || r.side.figureTitle || r.side.title)}${r.side.figureCaptionHtml ? `<div class="figure-explanation">${r.side.figureCaptionHtml}</div>` : ""}</div><div class="side-body"><div class="label-muted">${esc(r.side.label)}</div><h3>${esc(r.side.title)}</h3><p>${esc(r.side.desc)}</p>${sourceHtml(r.side.source)}<div style="margin-top:18px"><button class="quiet-button" data-act="zoom" data-val="${r.id}">Examinar la lámina ↗</button></div><div class="mini-detail"><span>✦</span><div>Dos piezas para explorar en cada sala: el hallazgo principal y un segundo misterio.</div></div><div class="otto-box">${img(r.otto,'Otto el pequeño pulpo explorador')}<p><strong>Otto sugiere:</strong> ${esc(r.questionHint)}</p></div></div></aside></section>
<div class="wrap"><div class="hall-note">Esta experiencia complementa el libro <em>¡Einstein, esta te la perdiste!</em> y no sustituye la lectura de los estudios originales. Las hipótesis se distinguen claramente de los hechos observados.</div><nav class="next-controls" aria-label="Navegar entre las salas"><a class="quiet-button" href="#${r.id>1?'sala-'+(r.id-1):'atrio'}">${r.id>1?'← Sala anterior':'← Volver al vestíbulo'}</a><button class="quiet-button" data-act="passport">Pasaporte: ${completed.size}/7 sellos</button><a class="primary-button" href="#${r.id<7?'sala-'+(r.id+1):'atrio'}">${r.id<7?'Sala siguiente →':'Volver a las salas →'}</a></nav></div>`;
}
function progressDots(n,total){return `<div class="step-counter" aria-label="${n} ${total}"><span style="display:none">${n}/${total}</span>${Array.from({length:total},(_,i)=>`<i class="${i<n?'done':''}"></i>`).join('')}</div>`;}
function feedbackHtml(){return feedback?`<div class="feedback" data-kind="${feedbackKind||'info'}">${esc(feedback)}</div>`:'';}
function finishBox(r){const next = ROOMS[r.id]||null;return `<div class="success-state"><div class="progress-title">¡SELLO DESBLOQUEADO! ✦</div><h3>${esc(r.seal)}</h3><p>¡Enhorabuena! Resolviste el misterio sin confundir las pistas con la fantasía. Otto actualizó tu pasaporte.</p><div class="hero-buttons"><button class="primary-button" data-act="passport">Ver pasaporte</button>${next?`<a class="quiet-button" href="#sala-${next.id}">Ir a la sala ${next.id} →</a>`:'<a class="quiet-button" href="#atrio">Volver a las siete salas</a>'}</div></div>`;}
function renderChallenge(r){if(completed.has(r.id))return finishBox(r);
switch(r.challenge){
 case 'prove':{
  const statements=[{"s":"Las orcas arrancan un trozo de alga.","correct":"osservato"},{"s":"Las orcas hacen rodar el trozo de alga entre sus cuerpos.","correct":"osservato"},{"s":"El alga elimina las células muertas de la piel.","correct":"ipotesi"},{"s":"Usar el alga refuerza los lazos sociales del grupo.","correct":"ipotesi"}];
  const n=game.index||0;const s=statements[n];return `<div class="question-label">TU OFICIO: INVESTIGADOR</div><h3>¿Observado de verdad o aún por demostrar?</h3><p class="subtext">Una frase cada vez. ¿Qué datos proceden directamente de los vídeos y cuáles son posibles explicaciones?</p>${progressDots(n,4)}<p><strong>${esc(s.s)}</strong></p><div class="choice-grid"><button class="choice-button" data-act="judge" data-val="osservato">✓ Observado en los vídeos</button><button class="choice-button" data-act="judge" data-val="ipotesi">? Hipótesis para estudiar</button></div>${feedbackHtml()}`;
 }
 case 'terreno':return `<div class="question-label">TU OFICIO: BOTÁNICO</div><h3>¿Qué comparación es más útil?</h3><p class="subtext">Quieres comprobar cómo influye el regolito lunar. ¿Qué pareja de ensayos elegirías, manteniendo iguales agua, luz y tipo de planta?</p><div class="choice-grid cols-1"><button class="choice-button" data-act="soil" data-val="a">A · Planta en regolito lunar / misma planta en suelo de control, en condiciones similares</button><button class="choice-button" data-act="soil" data-val="b">B · Planta en regolito sin agua / planta en tierra con agua</button><button class="choice-button" data-act="soil" data-val="c">C · Un helecho a oscuras / un tomate a la luz del sol</button></div>${feedbackHtml()}`;
 case 'sequenza':{
  const steps=[{"id":1,"name":"El pez nada","mark":"🐟"},{"id":2,"name":"La cámara detecta su posición","mark":"◉"},{"id":3,"name":"El ordenador procesa la orden","mark":"⌘"},{"id":4,"name":"Los motores mueven las ruedas","mark":"⚙"}];const shuffled=[steps[3],steps[1],steps[0],steps[2]];let n=game.seq||0;
  return `<div class="question-label">TU OFICIO: INGENIERO</div><h3>Reconstruye la cadena de mando.</h3><p class="subtext">Toca los cuatro pasos en orden: ¿quién empieza, quién detecta el movimiento, quién lo interpreta y quién mueve el vehículo?</p>${progressDots(n,4)}<div class="tech-trail">${steps.slice(0,n).map(t=>`<div class="tech-node filled">${esc(t.name)}</div>`).join('')}${Array.from({length:4-n},()=>'<div class="tech-node">?</div>').join('')}</div><div class="choice-grid">${shuffled.filter(x=>x.id>n).map(x=>`<button class="choice-button" data-act="step" data-val="${x.id}">${x.mark} ${esc(x.name)}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'parentela':return `<div class="question-label">TU OFICIO: PALEONTÓLOGO</div><h3>Elige la rama correcta.</h3><p class="subtext">Observa este pequeño árbol: de los antiguos terópodos surgieron varias ramas. ¿Qué podemos afirmar con certeza?</p><svg viewBox="0 0 600 160" role="img" aria-label="De un antepasado común de los terópodos parten dos ramas: una hacia el T. rex y otra hacia las aves" style="width:100%;max-height:170px"><path d="M35 84H290 M290 84V28H395 M290 84V138H395" stroke="#eac27c" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="290" cy="84" r="9" fill="#ffe0a0"/><text x="12" y="62" fill="#e5ecef" font-size="15">Antepasados terópodos</text><text x="408" y="34" fill="#e5ecef" font-size="18">🦖 rama T. rex</text><text x="408" y="143" fill="#e5ecef" font-size="18">🐦 rama de las aves</text></svg><div class="choice-grid cols-1"><button class="choice-button" data-act="dino" data-val="0">La gallina desciende directamente del T. rex.</button><button class="choice-button" data-act="dino" data-val="1">Las aves y el T. rex pertenecen a ramas distintas que comparten antepasados comunes.</button><button class="choice-button" data-act="dino" data-val="2">El parecido es casualidad: las aves no son dinosaurios.</button></div>${feedbackHtml()}`;
 case 'pinza':{
   const val=game.grip===undefined?15:game.grip;const level=val<35?'soft':val>65?'hard':'good';const label=val<35?'El agarre es demasiado débil.':val>65?'Estás apretando más de la cuenta.':'El agarre es controlado y delicado.';
   return `<div class="question-label">TU OFICIO: DISEÑADOR ROBÓTICO</div><h3>¿Cuánta fuerza de agarre usarías?</h3><p class="subtext">Tienes que sujetar un objeto frágil. Mueve el control para encontrar un agarre ni muy débil ni muy fuerte.</p><div class="gripper-scene" data-level="${level}"><div class="gripper-prong"></div><div class="gripper-object" role="img" aria-label="Objeto frágil de vidrio">🏺</div><div class="gripper-prong"></div></div><label for="gripSlider" class="hint">Intensidad del agarre (escala del juego)</label><input class="range-control" aria-label="Intensidad del agarre (escala del juego)" id="gripSlider" type="range" min="0" max="100" step="1" value="${val}"><p id="gripFeedback"><strong>${label}</strong></p><button class="primary-button" data-act="grip-check">Comprobar el agarre</button><p class="hint">Esta escala es simplificada para el juego: no representa medidas de un robot real.</p>${feedbackHtml()}`;
 }
 case 'segnali':{
   const seen=game.seen||[];const tiles=[["El músculo se activa","El cuerpo genera señales fisiológicas ligadas al movimiento."],["La interfaz detecta","Los sensores captan los impulsos neuromusculares útiles."],["El procesador interpreta","Las señales se decodifican en órdenes de movimiento."],["La prótesis se mueve","El sistema biónico acompaña de forma natural el movimiento de la persona."]];return `<div class="question-label">TU OFICIO: EXPLORADOR DEL CUERPO</div><h3>Cuatro etapas de una señal.</h3><p class="subtext">Abre cada casilla para descubrir el recorrido del cuerpo a la tecnología. Puedes tocarlas en cualquier orden.</p>${progressDots(seen.length,4)}<div class="sensor-grid">${tiles.map((t,i)=>`<button class="sensor-tile" data-act="sense" data-val="${i}" aria-pressed="${seen.includes(i)}"><span class="ordinal">0${i+1}</span><strong>${esc(t[0])}</strong>${seen.includes(i)?`<small>${esc(t[1])}</small>`:'<small>Toca para explorar</small>'}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'telescopi':{
  const seen=game.tel||[];const desc=["Observatorio A","Observatorio B","Observatorio C","Observatorio D"];return `<div class="question-label">TU OFICIO: ASTROFÍSICO</div><h3>Reúne señales desde distintos lugares.</h3><p class="subtext">Activa las cuatro antenas simbólicas. Cuando todas hayan observado, podrás ver la reconstrucción artística. La red EHT real cuenta con más instrumentos.</p>${progressDots(seen.length,4)}<div class="eht-lab">${desc.map((v,i)=>`<button class="dish-tile" data-act="dish" data-val="${i}" aria-pressed="${seen.includes(i)}"><span aria-hidden="true">${seen.includes(i)?'✦':'◉'}</span><small>${esc(v)}</small>${seen.includes(i)?'<b>Señal recibida</b>':''}</button>`).join('')}</div>${seen.length===4?'<button class="primary-button" data-act="assemble">Procesar las observaciones →</button>':''}<div class="hole-visual ${seen.length===4?'visible':''}" role="img" aria-label="Visualización artística de la región que rodea un agujero negro"></div><p class="hint">Esta figura es una ilustración artística, NO la fotografía oficial. Puedes abrir la imagen auténtica mediante el enlace a ESO de abajo.</p>${feedbackHtml()}`;
 }
 default:return '';
 }
}
function redrawChallenge(){const r=ROOMS[currentId-1];const panel=document.getElementById('challengePanel');if(panel&&r)panel.innerHTML=renderChallenge(r);persist();}
function win(){if(!currentId)return;completed.add(currentId);persist();feedback='';feedbackKind='';redrawChallenge();if(completed.size===7)showToast('¡Completaste las siete salas! Abre tu pasaporte para obtener tu diploma.');else showToast('✦ ¡Sello conseguido! Otto está muy contento.');}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.hidden=true},3300);}
function choiceRight(ok,wrong,right){if(ok){feedback=right;feedbackKind='good';win();}else{feedback=wrong;feedbackKind='wrong';redrawChallenge();}}
function passportMarkup(){return `<div class="modal-card" role="dialog" aria-modal="true" aria-label="Tu pasaporte de explorador"><div class="modal-header"><h2>Tu pasaporte de explorador</h2><button data-act="close" class="icon-button" aria-label="Cerrar">×</button></div><p>Cada sala resuelta añade un sello. Tu pasaporte se guarda únicamente en tu dispositivo.</p><div class="passport-list">${ROOMS.map(r=>`<span class="passport-seal ${completed.has(r.id)?'stamped':''}" title="Sala ${r.id}: ${esc(r.seal)}">${completed.has(r.id)?r.icon:r.id}</span>`).join('')}</div><div class="progress-rail"><div style="width:${completed.size/7*100}%"></div></div><p><strong>${completed.size} / 7 salas completadas.</strong>${completed.size===7?' ¡Enhorabuena! Has completado las siete salas.':''}</p>${completed.size===7?`<hr style="border:none;border-top:1px solid rgba(255,215,156,.2);margin:28px 0"><div class="eyebrow">PREMIO FINAL</div><h3 style="font:700 28px Georgia,serif;margin:10px 0">El diploma de explorador</h3><label for="childName">Nombre del explorador o exploradora</label><input id="childName" class="name-input" placeholder="Escribe un nombre para imprimir" maxlength="50" value="${esc(diplomaName)}"><div class="diploma-actions"><button class="primary-button" data-act="print">Imprimir diploma</button></div><div id="diplomaPreview" class="diploma"><div>✧ ✦ ✧</div><h3>EXPLORADOR DE LOS<br>DESCUBRIMIENTOS IMPOSIBLES</h3><p>Se certifica que</p><div class="large" id="diplomaChild">${esc(diplomaName||'________________')}</div><p>ha completado las siete salas del museo,<br>ha observado con curiosidad y ha seguido las evidencias.</p><p>Otto · El Museo de los Descubrimientos Imposibles</p></div>`:`<button class="quiet-button" data-act="close">Volver al museo</button>`}<p class="hint" style="margin-top:18px">Para empezar de nuevo desde el principio: <button data-act="reset-confirm" class="quiet-button" style="padding:7px 12px">Reiniciar los sellos</button></p></div>`;}
function openZoom(id){const r=ROOMS[id-1];if(!r)return;const zoomTitle=r.side.figureTitle||r.side.title;const zoomAlt=r.side.figureAlt||zoomTitle;modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="Ampliación: ${esc(zoomTitle)}"><div class="modal-header"><h2>${esc(zoomTitle)}</h2><button data-act="close" class="icon-button" aria-label="Cerrar">×</button></div><div style="margin:17px 0"><img src="${A(r.sideArt)}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="${esc(zoomAlt)}"></div>${r.side.figureCaptionHtml ? `<div class="figure-modal-caption">${r.side.figureCaptionHtml}</div>` : `<p>${esc(r.side.desc)}</p>`}<p class="art-notice">${esc(r.side.artNotice||"Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.")}</p>${sourceHtml(r.side.figureSource||r.side.source)}</div>`;modal.hidden=false;document.body.style.overflow="hidden";modal.querySelector(".icon-button")?.focus();}
function openPassport(){modal.innerHTML=passportMarkup();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function closeModal(){modal.hidden=true;modal.innerHTML='';document.body.style.overflow='';document.getElementById('passportButton')?.focus();}
function printDiploma(){const name=diplomaName.trim()||'____________________';let p=document.getElementById('printSheet');if(!p){p=document.createElement('div');p.id='printSheet';document.body.appendChild(p);}p.innerHTML=`<section class="print-certificate"><div>✦ ✦ ✦</div><p>EL MUSEO DE LOS DESCUBRIMIENTOS IMPOSIBLES</p><h1>DIPLOMA DE EXPLORADOR</h1><p>Otorgado a</p><p class="named">${esc(name)}</p><p>por haber completado las siete salas,<br>reunido los sellos y aprendido a distinguir<br>las observaciones de las hipótesis.</p><p class="brand-print">✦ Otto, el pequeño pulpo explorador ✦</p><p>De: ¡EINSTEIN, ESTA TE LA PERDISTE!</p></section>`;window.print();}
function clickHandler(event){const btn=event.target.closest('[data-act]');if(!btn)return;const act=btn.dataset.act;const val=btn.dataset.val;
 if(act==='passport'){openPassport();return;}
 if(act==='zoom'){openZoom(Number(val));return;}
 if(act==='close'){closeModal();return;}
 if(act==='print'){diplomaName=modal.querySelector('#childName')?.value.trim()||'';printDiploma();return;}
 if(act==='reset-confirm'){if(window.confirm('¿Deseas borrar los siete sellos guardados en este dispositivo?')){completed.clear();game={};feedback='';persist();closeModal();updateView(false);showToast('¡Pasaporte listo para una nueva exploración!');}return;}
 if(!currentId||completed.has(currentId))return;
 feedback='';feedbackKind='';
 if(act==='judge'){
  const answers=['osservato','osservato','ipotesi','ipotesi'];const idx=game.index||0;
  if(val===answers[idx]){game.index=idx+1;if(game.index===4){win();return;} feedback='¡Pista correcta! Pasa a la siguiente frase.';}else{feedback=answers[idx]==='osservato'?'Esta acción se ve directamente en los vídeos: es una observación.':'Es una posible función del alga, aún no demostrada: es una hipótesis.';feedbackKind='wrong';}redrawChallenge();return;
 }
 if(act==='soil'){choiceRight(val==='a','Cambias demasiadas variables a la vez: no sabrías a cuál atribuir la diferencia.','¡Gran elección! Comparas plantas iguales manteniendo idénticas todas las demás variables.');return;}
 if(act==='step'){const expect=(game.seq||0)+1;if(Number(val)===expect){game.seq=expect;if(expect===4){win();return;}feedback='¡Exacto! Ahora elige el siguiente paso.';}else{feedback='Este paso viene después. Empieza por lo que hace el pez.';feedbackKind='wrong';}redrawChallenge();return;}
 if(act==='dino'){choiceRight(val==='1','Mira bien dónde se divide el árbol. El T. rex no es el antepasado directo de la gallina.','¡Exacto! Las aves son dinosaurios terópodos vivientes y comparten antepasados con ramas extintas.');return;}
 if(act==='grip-check'){const x=game.grip===undefined?15:game.grip;choiceRight(x>=35&&x<=65,x<35?'El objeto resbala: prueba a aumentar un poco la fuerza.':'¡Demasiado! Un agarre rígido podría romper un objeto delicado.','¡Encontraste el punto de equilibrio! Los robots reales necesitan sensores sensibles, geometrías flexibles y controles avanzados.');return;}
 if(act==='sense'){const i=Number(val);game.seen=game.seen||[];if(!game.seen.includes(i))game.seen.push(i);if(game.seen.length===4){win();return;}feedback='¡Descubriste otra etapa! Sigue completando el recorrido.';redrawChallenge();return;}
 if(act==='dish'){const i=Number(val);game.tel=game.tel||[];if(!game.tel.includes(i))game.tel.push(i);feedback=game.tel.length===4?'¡Datos reunidos! Ahora puedes iniciar la reconstrucción.':'Has activado un observatorio simbólico.';redrawChallenge();return;}
 if(act==='assemble'){if((game.tel||[]).length===4)win();return;}
}
main.addEventListener('click',clickHandler);
modal.addEventListener('click',clickHandler);
document.getElementById('passportButton').addEventListener('click',openPassport);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
modal.addEventListener('input',e=>{if(e.target.id==='childName'){diplomaName=e.target.value;const el=modal.querySelector('#diplomaChild');if(el)el.textContent=diplomaName||'________________';}});
main.addEventListener('input',e=>{if(e.target.id==='gripSlider'){game.grip=Number(e.target.value);const p=main.querySelector('#gripFeedback');const v=game.grip;p.innerHTML=`<strong>${v<35?'El agarre es demasiado débil.':v>65?'Estás apretando más de la cuenta.':'El agarre es controlado y delicado.'}</strong>`;main.querySelector('.gripper-scene')?.setAttribute('data-level',v<35?'soft':v>65?'hard':'good');}});
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
