'use strict';
/* Museo delle Scoperte Impossibili — standalone, offline-capable, no analytics. */
const A = name => `assets/${name}.webp?v=20261103`;
const ROOMS = [
  {
    "id": 1,
    "slug": "animali",
    "label": "Animaux extraordinaires",
    "title": "L’océan cache des indices",
    "teaser": "Une algue peut-elle devenir un outil ? Et des bulles un filet ?",
    "art": "animali",
    "sideArt": "orche",
    "otto": "otto-curioso",
    "icon": "◉",
    "seal": "La lentille marine",
    "kicker": "SALLE 01 · ANIMAUX EXTRAORDINAIRES",
    "intro": "Certains animaux surprennent la science non pas par magie, mais parce qu’ils font des choses que personne n’attendait.",
    "question": "Une vidéo peut nous montrer ce qui se passe. Mais peut-elle nous en donner immédiatement la raison ?",
    "mainTitle": "Le cas de l’algue mystérieuse",
    "main": "Dans la mer des Salish, des chercheurs ont filmé des orques arrachant un brin de varech et le faisant rouler entre leurs corps. Observer un mouvement est une chose ; prouver sa fonction exacte en est une autre.",
    "challenge": "prove",
    "source": {
      "code": "SC-04",
      "title": "Étude comportementale sur les orques (Current Biology)",
      "url": "https://doi.org/10.1016/j.cub.2025.04.021"
    },
    "side": {
      "title": "La baleine qui pêche avec des bulles",
      "label": "Un autre objet exposé",
      "desc": "Certaines baleines à bosse soufflent des filets circulaires de bulles pour concentrer les poissons. Les bulles ne sont pas un mur solide : elles modifient le comportement des proies. Leur forme et leur utilisation peuvent varier.",
      "source": {
        "code": "SC-05",
        "title": "Recherche sur le filet de bulles des baleines à bosse",
        "url": "https://doi.org/10.1098/rsos.240328"
      },
      "figureAlt": "Orques manipulant une tige de kelp dans la mer des Salish",
      "figureTitle": "La baleine qui pêche avec des bulles"
    },
    "questionHint": "Observe attentivement l’algue, mais regarde surtout ce que les animaux en font."
  },
  {
    "id": 2,
    "slug": "piante",
    "label": "Plantes et petits mondes",
    "title": "Un jardin inattendu",
    "teaser": "Des pousses dans la poussière lunaire et des fougères au génome colossal.",
    "art": "piante",
    "sideArt": "felce-dna",
    "otto": "otto-pensieroso",
    "icon": "✿",
    "seal": "La pousse lunaire",
    "kicker": "SALLE 02 · PLANTES ET PETITS MONDES",
    "intro": "Les plantes semblent immobiles, mais ce sont des organismes pleins de réactions surprenantes. Même la poussière de Lune a fait l’objet d’une étude fascinante.",
    "question": "Pour savoir si une plante pousse vraiment dans le sol lunaire, que devons-nous comparer ?",
    "mainTitle": "La graine et la poussière de Lune",
    "main": "En laboratoire, des graines ont germé dans de petits échantillons de régolithe lunaire rapportés par les missions Apollo. Cependant, les plantules ont montré des signes nets de stress. Germer ne signifie pas pousser aussi bien que dans un sol fertile.",
    "challenge": "terreno",
    "source": {
      "code": "SC-12",
      "title": "Plantes cultivées dans le régolithe lunaire (Communications Biology)",
      "url": "https://doi.org/10.1038/s42003-022-03334-8"
    },
    "side": {
      "title": "La fougère qui a étonné la génétique",
      "label": "Un autre objet exposé",
      "desc": "Une minuscule fougère du genre Tmesipteris possède un génome colossal. La quantité totale d’ADN ne mesure ni l’intelligence ni la complexité d’un organisme : c’est une curiosité biologique à comprendre dans son contexte.",
      "source": {
        "code": "SC-13",
        "title": "Étude génomique sur Tmesipteris (iScience)",
        "url": "https://doi.org/10.1016/j.isci.2024.109889"
      },
      "figureTitle": "La fougère au génome gigantesque",
      "figureAlt": "Comparaison visuelle schématique entre le génome humain et l’ADN de Tmesipteris oblanceolata",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Comparaison du génome (valeurs 1C)</h4><div class=\"data-compare\"><div class=\"data-row\"><span class=\"data-label\">Être humain :</span><strong class=\"data-val\">environ 3,10 milliards de paires de bases</strong></div><div class=\"data-row\"><span class=\"data-label\"><em>Tmesipteris oblanceolata</em> :</span><strong class=\"data-val\">environ 160,45 milliards de paires de bases</strong></div></div><p class=\"data-note\">Cette comparaison porte sur le génome haploïde (valeur 1C). Une quantité d’ADN plus de 50 fois supérieure n’implique ni plus d’intelligence, ni complexité accrue, ni supériorité évolutive : la taille du génome ne mesure pas la complexité d’un organisme vivant.</p><p class=\"data-disclaimer\"><em>Note méthodologique :</em> cette illustration a une vocation purement schématique et éducative ; les proportions visuelles ne sont pas à l’échelle moléculaire réelle.</p></div>",
      "artNotice": "Illustration schématique à visée pédagogique, non une photographie scientifique. Pour consulter les données officielles, voir l’étude SC-13."
    },
    "questionHint": "Dans une comparaison scientifique, change toujours un seul élément à la fois."
  },
  {
    "id": 3,
    "slug": "esperimenti",
    "label": "Expériences surprenantes",
    "title": "Le poisson à quatre roues",
    "teaser": "Qui conduit vraiment un aquarium motorisé ?",
    "art": "esperimenti",
    "sideArt": "pesce",
    "otto": "otto-curioso",
    "icon": "⌁",
    "seal": "L’inventeur curieux",
    "kicker": "SALLE 03 · EXPÉRIENCES SURPRENANTES",
    "intro": "Une belle invention n’est pas de la magie : c’est une chaîne d’étapes que l’on peut reconstituer, tester et expliquer.",
    "question": "Comment un poisson peut-il déplacer un véhicule sans toucher les roues ?",
    "mainTitle": "Remets en ordre le laboratoire",
    "main": "Dans une expérience, des chercheurs ont placé un bocal sur une plateforme motorisée. Un système suivait la position du poisson et traduisait sa nage en commandes pour les roues. Le poisson ne conduisait pas avec un volant.",
    "challenge": "sequenza",
    "source": {
      "code": "SC-15",
      "title": "Véhicule piloté par un poisson (BBR)",
      "url": "https://doi.org/10.1016/j.bbr.2021.113711"
    },
    "side": {
      "title": "Les bourdons et les balles",
      "label": "Un autre objet exposé",
      "desc": "Dans plusieurs tests, des bourdons ont fait rouler de petites billes sans récompense immédiate. Les scientifiques étudient si ce comportement s’apparente au jeu, sans y projeter d’intentions humaines.",
      "source": {
        "code": "SC-16",
        "title": "Recherche sur le jeu chez les bourdons",
        "url": "https://doi.org/10.1016/j.anbehav.2022.08.013"
      },
      "figureTitle": "Le poisson et le véhicule",
      "figureAlt": "Schéma de la chaîne technologique du véhicule actionné par le poisson rouge",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Fonctionnement du véhicule (chaîne de commande)</h4><ol class=\"step-list\"><li><strong>1. Le poisson nage :</strong> le poisson rouge évolue librement dans son aquarium transparent.</li><li><strong>2. Une caméra détecte sa position :</strong> une caméra filme le bassin et suit en permanence l’orientation et la position de l’animal.</li><li><strong>3. Un ordinateur convertit les données en commandes :</strong> l’ordinateur de bord traduit ces trajectoires en ordres de déplacement.</li><li><strong>4. Le système motorisé actionne les roues :</strong> les moteurs font tourner les roues, déplaçant le véhicule terrestre dans la direction choisie.</li></ol><p class=\"data-note\"><strong>Précision scientifique :</strong> le poisson ne tient pas de volant et ne conduit pas consciemment le véhicule ; son déplacement dépend du dispositif technologique conçu par les chercheurs pour traduire la nage en trajectoire terrestre.</p></div>",
      "artNotice": "Schéma illustratif du système robotique. Pour consulter la vidéo et l’étude originales, voir la référence SC-15.",
      "figureSource": {
        "code": "SC-15",
        "title": "Fish-operated vehicle : étude comportementale",
        "url": "https://doi.org/10.1016/j.bbr.2021.113711"
      }
    },
    "questionHint": "Quelle étape transforme un mouvement observé en déplacement des roues ?"
  },
  {
    "id": 4,
    "slug": "dinosauri",
    "label": "Dinosaures, disparus et ADN",
    "title": "Tous les dinosaures n’ont pas disparu",
    "teaser": "Dans l’histoire des oiseaux se cache une branche surprenante.",
    "art": "dinosauri",
    "sideArt": "uccelli",
    "otto": "otto-pensieroso",
    "icon": "❖",
    "seal": "Le détective du passé",
    "kicker": "SALLE 04 · DINOSAURES, DISPARUS ET ADN",
    "intro": "Les fossiles sont des indices. À partir d’un fragment, d’une plume ou d’une forme d’os, les chercheurs reconstituent de très longues histoires.",
    "question": "La poule descend-elle directement du T. rex ?",
    "mainTitle": "L’arbre généalogique caché",
    "main": "Les oiseaux sont des dinosaures vivants du groupe des théropodes. Le T. rex était un lointain cousin, pas le grand-père d’une poule. Le mot clé est ancêtre commun.",
    "challenge": "parentela",
    "source": {
      "code": "SC-38",
      "title": "Natural History Museum — Comment les dinosaures sont devenus des oiseaux",
      "url": "https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html"
    },
    "side": {
      "title": "Pourquoi un fossile ne suffit pas pour cloner un dinosaure ?",
      "label": "Un autre objet exposé",
      "desc": "Un fossile nous apprend beaucoup sur l’anatomie d’une espèce disparue. Mais pour le cloner, il faudrait du matériel biologique préservé, pas une roche pétrifiée. Le cinéma n’est pas un protocole scientifique.",
      "source": {
        "code": "SC-39",
        "title": "Natural History Museum — Les scientifiques pourraient-ils recréer les dinosaures ?",
        "url": "https://www.nhm.ac.uk/discover/could-scientists-bring-dinosaurs-back.html"
      },
      "figureAlt": "Lien évolutif entre dinosaures théropodes et oiseaux modernes",
      "figureTitle": "Pourquoi un fossile ne suffit pas pour cloner un dinosaure ?"
    },
    "questionHint": "Dans un arbre évolutif, observe l’endroit où les branches se séparent."
  },
  {
    "id": 5,
    "slug": "laboratorio",
    "label": "Le laboratoire du futur",
    "title": "Des machines inspirées par la nature",
    "teaser": "Une trompe peut-elle inspirer une pince robotique ?",
    "art": "laboratorio",
    "sideArt": "micelio",
    "otto": "otto-curioso",
    "icon": "⚙",
    "seal": "L’ingénieur de la nature",
    "kicker": "SALLE 05 · LE LABORATOIRE DU FUTUR",
    "intro": "De nombreuses technologies naissent d’une observation : comment un être vivant résout-il un problème complexe ?",
    "question": "Comment saisirais-tu un objet délicat sans l’abîmer ?",
    "mainTitle": "Conçois la prise parfaite",
    "main": "Des ingénieurs conçoivent des pinces souples inspirées de la trompe de l’éléphant. Envelopper un objet délicat évite de le briser avec des mâchoires rigides. Ici, teste un modèle ludique et interactif.",
    "challenge": "pinza",
    "source": {
      "code": "SC-23",
      "title": "Étude sur une pince robotique inspirée de la trompe",
      "url": "https://doi.org/10.1038/s44182-025-00038-z"
    },
    "side": {
      "title": "Le mycélium rencontre un robot",
      "label": "Un autre objet exposé",
      "desc": "Dans un prototype expérimental, les impulsions électriques d’un mycélium fongique ont été traduites par des circuits pour actionner un robot. Cela ne signifie pas que le champignon décide où aller.",
      "source": {
        "code": "SC-25",
        "title": "Recherche sur le robot biohybride à base de mycélium",
        "url": "https://doi.org/10.1126/scirobotics.adk8019"
      },
      "figureTitle": "Le mycélium et le robot",
      "figureAlt": "Schéma du robot biohybride actionné par les signaux électriques du mycélium fongique",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">Du mycélium au mouvement (chaîne biohybride)</h4><ol class=\"step-list\"><li><strong>1. Le mycélium présente une activité électrique :</strong> le réseau souterrain du champignon génère des impulsions bioélectriques mesurables.</li><li><strong>2. Les électrodes captent les signaux :</strong> de minuscules capteurs enregistrent les variations de tension biologique.</li><li><strong>3. Un circuit électronique les interprète :</strong> une interface matérielle traduit ces influx biologiques en ordres numériques.</li><li><strong>4. Le système contrôle le robot :</strong> les actionneurs mécaniques font bouger les pattes ou roues du robot biohybride.</li></ol><p class=\"data-note\"><strong>Précision scientifique :</strong> cela ne signifie pas que le champignon possède une conscience ou guide le robot de manière intentionnelle ; le robot réagit aux signaux biologiques décodés par un circuit électronique artificiel.</p></div>",
      "artNotice": "Interprétation graphique du système biohybride. Pour consulter la publication originale, voir SC-25."
    },
    "questionHint": "Serrer le plus fort possible n’est pas toujours la bonne solution."
  },
  {
    "id": 6,
    "slug": "corpo",
    "label": "Corps et super-technologies",
    "title": "Le corps émet des messages",
    "teaser": "Quand les muscles et l’ingénierie travaillent ensemble.",
    "art": "corpo",
    "sideArt": "voce",
    "otto": "otto-pensieroso",
    "icon": "✧",
    "seal": "L’explorateur des signaux",
    "kicker": "SALLE 06 · CORPS ET SUPER-TECHNOLOGIES",
    "intro": "Notre corps émet des signaux en permanence. Les scientifiques cherchent à les connecter à des dispositifs pour aider les personnes.",
    "question": "Comment une prothèse peut-elle recevoir les instructions d’un mouvement ?",
    "mainTitle": "Suis le signal",
    "main": "Au MIT, une prothèse de genou bionique intégrée aux tissus a été étudiée pour retrouver une marche naturelle. Ces résultats correspondent à des essais cliniques précis.",
    "challenge": "segnali",
    "source": {
      "code": "SC-50",
      "title": "MIT News — Un genou bionique intégré aux tissus",
      "url": "https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710"
    },
    "side": {
      "title": "Quand la technologie aide la voix",
      "label": "Un autre objet exposé",
      "desc": "Des équipes de recherche testent des interfaces neurales pour traduire l’activité cérébrale en paroles audibles. Ce sont des outils de recherche, pas des appareils qui « lisent dans les pensées ».",
      "source": {
        "code": "SC-53",
        "title": "Recherche sur la neuroprothèse vocale",
        "url": "https://doi.org/10.1038/s41593-025-01905-6"
      },
      "figureAlt": "Interface technologique d'assistance vocale et transmission des signaux",
      "figureTitle": "Quand la technologie aide la voix"
    },
    "questionHint": "Une commande motrice n’est pas magique : c’est une chaîne ininterrompue de signaux."
  },
  {
    "id": 7,
    "slug": "spazio",
    "label": "Espace : la nouvelle frontière",
    "title": "La photo qu’aucun appareil n’a prise",
    "teaser": "Comment reconstitue-t-on l’image d’un trou noir ?",
    "art": "spazio",
    "sideArt": "galassia",
    "otto": "otto-mondo",
    "icon": "✦",
    "seal": "L’explorateur cosmique",
    "kicker": "SALLE 07 · ESPACE : LA NOUVELLE FRONTIÈRE",
    "intro": "Dans l’espace lointain, on ne peut pas regarder comme sur Terre. Les scientifiques réunissent des données captées aux quatre coins de notre planète.",
    "question": "La première image de M87* provient-elle d’un seul télescope ?",
    "mainTitle": "Allume le réseau de radiotélescopes",
    "main": "Le télescope Event Horizon a synchronisé des radiotélescopes répartis sur toute la planète pour reconstituer l’ombre du trou noir M87*. Notre jeu utilise quatre observatoires symboliques : le réseau réel est bien plus vaste.",
    "challenge": "telescopi",
    "source": {
      "code": "SC-48",
      "title": "ESO / Collaboration EHT — Première image du trou noir M87*",
      "url": "https://www.eso.org/public/images/eso1907a/"
    },
    "side": {
      "title": "Une comète venue d’un autre système",
      "label": "Un autre objet exposé",
      "desc": "La comète interstellaire 3I/ATLAS a traversé notre Système solaire selon une trajectoire ouverte. Elle ne suit pas une orbite fermée autour du Soleil et ne reviendra jamais.",
      "source": {
        "code": "SC-36",
        "title": "NASA — 3I/ATLAS : questions et réponses",
        "url": "https://science.nasa.gov/solar-system/comets/3i-atlas/3i-atlas-facts-and-faqs/"
      },
      "figureTitle": "La reconstruction de M87*",
      "figureAlt": "Schéma artistique du réseau Event Horizon Telescope et de la reconstruction de l’image de M87*",
      "figureCaptionHtml": "<div class=\"figure-box\"><h4 class=\"figure-box-title\">De la Terre à M87* : imager l’invisible</h4><ol class=\"step-list\"><li><strong>1. Plusieurs radiotélescopes recueillent des observations :</strong> des instruments synchronisés répartis sur Terre observent en même temps la même région de l’espace.</li><li><strong>2. Les données sont synchronisées et combinées :</strong> des horloges atomiques et de puissants ordinateurs alignent les mesures par interférométrie (VLBI).</li><li><strong>3. Le traitement numérique reconstitue l’image :</strong> des algorithmes traitent les données et permettent de reconstituer l’image de la région entourant le trou noir M87*.</li></ol><p class=\"data-note\"><strong>Note méthodologique :</strong> l’illustration fournie est un schéma artistique et éducatif pour expliquer la méthode, et NON la photographie scientifique officielle de l’Event Horizon Telescope (EHT).</p></div>",
      "artNotice": "Schéma artistique pédagogique : ce n’est pas la photographie officielle de l’EHT. L’image scientifique authentique est accessible via la source SC-48.",
      "figureSource": {
        "code": "SC-48",
        "title": "ESO / EHT Collaboration — première image du trou noir M87*",
        "url": "https://www.eso.org/public/images/eso1907a/"
      }
    },
    "questionHint": "Le résultat provient de multiples instruments et d’un travail d’analyse, pas d’un seul cliché."
  }
];
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const headerProgress = document.getElementById('headerProgress');
const storeKey = 'otto-museo-fr-progress-v1';
let completed = (() => { try {const saved = JSON.parse(localStorage.getItem(storeKey) || '[]'); return new Set(Array.isArray(saved)?saved.filter(n => Number.isInteger(n)&&n>=1&&n<=7):[]);}catch{return new Set();}})();
let game = {}; let currentId = 0;let feedback = '';let feedbackKind='';let diplomaName = '';
const esc = str => String(str).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceHtml = s => `<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('Ouvrir la source  dans un nouvel onglet')} ${esc(s.code)}">${esc(s.code)} · Source originale ↗</a>`;
function persist(){try{localStorage.setItem(storeKey,JSON.stringify([...completed]));}catch{}headerProgress.textContent=`${completed.size}/7`;}
function navigateHome(){location.hash='atrio';}
function roomForHash(){const match=(location.hash||'').match(/^#sala-([1-7])$/);return match?Number(match[1]):0;}
function img(src,alt='',cl=''){return `<img src="${A(src)}" alt="${esc(alt)}" ${cl?`class="${cl}"`:''} loading="lazy">`;}
function syncLanguageLinks(){const h=location.hash||'#atrio';document.querySelectorAll('.locale-flag-item').forEach(el=>{const href=el.getAttribute('href');if(href&&href!=='#'&&!href.startsWith('javascript:')){el.setAttribute('href',href.split('#')[0]+h);}});}
function updateView(scroll=true){ const next = roomForHash(); if(next!==currentId){game={};feedback='';feedbackKind='';currentId=next;} persist();main.innerHTML = next?renderRoom(ROOMS[next-1]):renderAtrium();syncLanguageLinks();if(scroll)window.scrollTo({top:0,behavior:'instant'});}
function renderAtrium(){
 const next=ROOMS.find(r=>!completed.has(r.id))||ROOMS[0];
 return `<section class="hero"><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">LE BONUS INTERACTIF DU LIVRE</div><h1 class="display">LE MUSÉE DES<br><em>DÉCOUVERTES</em><br>IMPOSSIBLES</h1><p class="lead">Sept salles. Sept mystères de la science. Une petite pieuvre curieuse qui t’attend. Entre, observe, découvre les indices et collectionne les sceaux d’Otto.</p><div class="hero-buttons"><a class="primary-button" href="#sala-${next.id}">${completed.size?'Continuer l’exploration':'Commencer l’exploration'} →</a><button class="quiet-button" data-act="passport">Ouvrir le passeport</button></div><p class="hint">Pour curieux de 7 à 12 ans · Gratuit avec le livre · Aucun compte requis</p></div>${img('otto-mondo','Otto, la petite pieuvre exploratrice, enlace la planète Terre','hero-otto')}</div></section>
 <section class="wrap intro-section" id="sale"><div class="intro-row"><div><div class="eyebrow">TON PARCOURS</div><h2 class="section-heading">Choisis une porte.</h2></div><p>Tu peux visiter les salles dans l’ordre de ton choix. Chaque fois que tu résous un mystère, Otto appose un sceau sur ton passeport.</p></div><div class="progress-rail" aria-label="${completed.size} salles visitées sur 7"><div style="width:${completed.size/7*100}%"></div></div><div class="hint">${completed.size} salles complétées sur 7  ${completed.size===7?'· Ton diplôme est prêt !':''}</div></section>
 <section class="wrap museum-map" aria-label="Salles du musée">${ROOMS.map(r=>`<a class="room-card" href="#sala-${r.id}" aria-label="Gallery ${r.id}: ${esc(r.label)}"><img src="${A(r.art)}" alt="" loading="lazy">${completed.has(r.id)?'<span class="badge-done">✓ Sceau obtenu</span>':''}<div class="card-inner"><span class="room-n">SALLE ${String(r.id).padStart(2,'0')} · ${esc(r.icon)}</span><h3>${esc(r.label)}</h3><p>${esc(r.teaser)}</p><span class="open-label">Explorer la salle <span aria-hidden="true">→</span></span></div></a>`).join('')}</section>
 <section class="wrap value-strip"><div class="value-item">Observe, ne devine pas au hasard.<p>Chaque activité repose sur de vrais faits. Là où la science cherche encore, nous te l’expliquons clairement.</p></div><div class="value-item">Chaque salle raconte une autre histoire.<p>Pas de quiz répétitif : chaque mystère te met au défi avec un jeu interactif différent.</p></div><div class="value-item">Une source réelle pour chaque merveille.<p>Consulte les articles scientifiques originaux. Le code SC correspond exactement à celui du livre.</p></div></section>`;
}
function renderRoom(r){
return `<section class="room-banner"><img class="room-backdrop" src="${A(r.art)}" alt="" role="presentation"><div class="room-banner-inner"><div class="crumb"><a href="#atrio">← Hall du musée</a><span>/</span><span>Salle ${r.id} sur 7</span></div><div style="margin-top:27px"><span class="room-stamp">${r.icon} ${esc(r.kicker)}</span></div><h1 class="room-name">${esc(r.title)}</h1><p class="room-intro">${esc(r.intro)}</p></div></section>
<section class="wrap hall-grid"><article class="exhibit"><span class="label-muted">PIÈCE PRINCIPALE</span><h2>${esc(r.mainTitle)}</h2><div class="exhibit-question"><span>LA QUESTION</span><strong>${esc(r.question)}</strong></div><p>${esc(r.main)}</p><div class="challenge-zone" id="challengePanel">${renderChallenge(r)}</div><div class="source-row"><b>Document scientifique</b>${sourceHtml(r.source)}</div><div class="art-notice">Les illustrations du musée sont des interprétations artistiques ; les liens mènent aux sources scientifiques authentiques.</div></article><aside class="side-exhibit"><div class="side-figure-wrap">${img(r.sideArt, r.side.figureAlt || r.side.figureTitle || r.side.title)}${r.side.figureCaptionHtml ? `<div class="figure-explanation">${r.side.figureCaptionHtml}</div>` : ""}</div><div class="side-body"><div class="label-muted">${esc(r.side.label)}</div><h3>${esc(r.side.title)}</h3><p>${esc(r.side.desc)}</p>${sourceHtml(r.side.source)}<div style="margin-top:18px"><button class="quiet-button" data-act="zoom" data-val="${r.id}">Examiner la planche ↗</button></div><div class="mini-detail"><span>✦</span><div>Deux pièces à explorer dans chaque salle : la découverte principale et un second mystère.</div></div><div class="otto-box">${img(r.otto,'Otto la petite pieuvre exploratrice')}<p><strong>Otto suggère :</strong> ${esc(r.questionHint)}</p></div></div></aside></section>
<div class="wrap"><div class="hall-note">Cette expérience enrichit le livre <em>Einstein, tu as manqué ça !</em> et ne remplace pas la lecture des publications originales. Les fonctions non prouvées sont clairement distinguées des faits observés.</div><nav class="next-controls" aria-label="Naviguer entre les salles"><a class="quiet-button" href="#${r.id>1?'sala-'+(r.id-1):'atrio'}">${r.id>1?'← Salle précédente':'← Retour au hall'}</a><button class="quiet-button" data-act="passport">Passeport : ${completed.size}/7 sceaux</button><a class="primary-button" href="#${r.id<7?'sala-'+(r.id+1):'atrio'}">${r.id<7?'Salle suivante →':'Retour aux salles →'}</a></nav></div>`;
}
function progressDots(n,total){return `<div class="step-counter" aria-label="${n} ${total}"><span style="display:none">${n}/${total}</span>${Array.from({length:total},(_,i)=>`<i class="${i<n?'done':''}"></i>`).join('')}</div>`;}
function feedbackHtml(){return feedback?`<div class="feedback" data-kind="${feedbackKind||'info'}">${esc(feedback)}</div>`:'';}
function finishBox(r){const next = ROOMS[r.id]||null;return `<div class="success-state"><div class="progress-title">SCEAU DÉBLOQUÉ ✦</div><h3>${esc(r.seal)}</h3><p>Félicitations ! Tu as résolu le mystère sans confondre les indices avec l’imagination. Otto a validé ton passeport.</p><div class="hero-buttons"><button class="primary-button" data-act="passport">Voir le passeport</button>${next?`<a class="quiet-button" href="#sala-${next.id}">Aller à la salle ${next.id} →</a>`:'<a class="quiet-button" href="#atrio">Retour aux sept salles</a>'}</div></div>`;}
function renderChallenge(r){if(completed.has(r.id))return finishBox(r);
switch(r.challenge){
 case 'prove':{
  const statements=[{"s":"Les orques arrachent un morceau d’algue.","correct":"osservato"},{"s":"Les orques font rouler le morceau d’algue entre leurs corps.","correct":"osservato"},{"s":"L’algue élimine les cellules mortes de leur peau.","correct":"ipotesi"},{"s":"Utiliser l’algue renforce les liens sociaux du groupe.","correct":"ipotesi"}];
  const n=game.index||0;const s=statements[n];return `<div class="question-label">TON MÉTIER : ENQUÊTEUR</div><h3>Vrai fait observé ou hypothèse à prouver ?</h3><p class="subtext">Une phrase à la fois. Quelles informations proviennent directement des vidéos et lesquelles sont de simples explications possibles ?</p>${progressDots(n,4)}<p><strong>${esc(s.s)}</strong></p><div class="choice-grid"><button class="choice-button" data-act="judge" data-val="osservato">✓ Observé dans les vidéos</button><button class="choice-button" data-act="judge" data-val="ipotesi">? Hypothèse à étudier</button></div>${feedbackHtml()}`;
 }
 case 'terreno':return `<div class="question-label">TON MÉTIER : BOTANISTE</div><h3>Quelle comparaison est la plus utile ?</h3><p class="subtext">Tu veux savoir quel est l’effet du régolithe lunaire. Quelle paire d’expériences choisirais-tu, en gardant la même eau, la même lumière et la même plante ?</p><div class="choice-grid cols-1"><button class="choice-button" data-act="soil" data-val="a">A · Plante dans le régolithe lunaire / même plante dans un sol témoin, dans des conditions similaires</button><button class="choice-button" data-act="soil" data-val="b">B · Plante dans le régolithe sans eau / plante dans la terre avec de l’eau</button><button class="choice-button" data-act="soil" data-val="c">C · Une fougère dans l’obscurité / une tomate en plein soleil</button></div>${feedbackHtml()}`;
 case 'sequenza':{
  const steps=[{"id":1,"name":"Le poisson nage","mark":"🐟"},{"id":2,"name":"La caméra repère sa position","mark":"◉"},{"id":3,"name":"L’ordinateur calcule la commande","mark":"⌘"},{"id":4,"name":"Les moteurs font tourner les roues","mark":"⚙"}];const shuffled=[steps[3],steps[1],steps[0],steps[2]];let n=game.seq||0;
  return `<div class="question-label">TON MÉTIER : INGÉNIEUR</div><h3>Reconstitue la chaîne de commande.</h3><p class="subtext">Touche les quatre étapes dans le bon ordre : qui commence, qui capte le mouvement, qui le traduit et qui fait avancer le véhicule ?</p>${progressDots(n,4)}<div class="tech-trail">${steps.slice(0,n).map(t=>`<div class="tech-node filled">${esc(t.name)}</div>`).join('')}${Array.from({length:4-n},()=>'<div class="tech-node">?</div>').join('')}</div><div class="choice-grid">${shuffled.filter(x=>x.id>n).map(x=>`<button class="choice-button" data-act="step" data-val="${x.id}">${x.mark} ${esc(x.name)}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'parentela':return `<div class="question-label">TON MÉTIER : PALÉONTOLOGUE</div><h3>Choisis la bonne branche.</h3><p class="subtext">Observe ce petit arbre : à partir d’anciens théropodes, plusieurs branches ont divergé. Que pouvons-nous affirmer avec certitude ?</p><svg viewBox="0 0 600 160" role="img" aria-label="À partir d’un ancêtre commun des dinosaures théropodes partent deux branches : une vers le T. rex et une vers les dinosaures aviaires, les oiseaux" style="width:100%;max-height:170px"><path d="M35 84H290 M290 84V28H395 M290 84V138H395" stroke="#eac27c" fill="none" stroke-width="5" stroke-linecap="round"/><circle cx="290" cy="84" r="9" fill="#ffe0a0"/><text x="12" y="62" fill="#e5ecef" font-size="15">Ancêtres théropodes</text><text x="408" y="34" fill="#e5ecef" font-size="18">🦖 branche T. rex</text><text x="408" y="143" fill="#e5ecef" font-size="18">🐦 branche des oiseaux</text></svg><div class="choice-grid cols-1"><button class="choice-button" data-act="dino" data-val="0">La poule descend directement du T. rex.</button><button class="choice-button" data-act="dino" data-val="1">Les oiseaux et le T. rex appartiennent à des branches distinctes partageant des ancêtres communs.</button><button class="choice-button" data-act="dino" data-val="2">La ressemblance est fortuite : les oiseaux ne sont pas des dinosaures.</button></div>${feedbackHtml()}`;
 case 'pinza':{
   const val=game.grip===undefined?15:game.grip;const level=val<35?'soft':val>65?'hard':'good';const label=val<35?'La prise est trop faible.':val>65?'Tu serres plus que nécessaire.':'La prise est contrôlée et délicate.';
   return `<div class="question-label">TON MÉTIER : CONCEPTEUR</div><h3>Quelle force de préhension utiliserais-tu ?</h3><p class="subtext">Tu dois attraper un objet fragile. Déplace le curseur pour trouver une prise ni trop faible ni trop forte.</p><div class="gripper-scene" data-level="${level}"><div class="gripper-prong"></div><div class="gripper-object" role="img" aria-label="Objet fragile en verre">🏺</div><div class="gripper-prong"></div></div><label for="gripSlider" class="hint">Intensité de la prise (échelle ludique)</label><input class="range-control" aria-label="Intensité de la prise (échelle ludique)" id="gripSlider" type="range" min="0" max="100" step="1" value="${val}"><p id="gripFeedback"><strong>${label}</strong></p><button class="primary-button" data-act="grip-check">Tester la prise</button><p class="hint">Cette échelle est simplifiée pour le jeu : elle ne représente pas les mesures d’un vrai robot.</p>${feedbackHtml()}`;
 }
 case 'segnali':{
   const seen=game.seen||[];const tiles=[["Le muscle s’active","Le corps génère des signaux physiologiques liés au mouvement."],["L’interface détecte","Des capteurs adaptés enregistrent les impulsions neuromusculaires."],["Le contrôleur interprète","Les signaux sont décodés en commandes mécaniques."],["La prothèse s’actionne","Le système bionique accompagne naturellement le geste de la personne."]];return `<div class="question-label">TON MÉTIER : EXPLORATEUR DU CORPS</div><h3>Quatre étapes d’un signal.</h3><p class="subtext">Ouvre chaque case pour découvrir le cheminement du corps à la technologie. Touche-les dans n’importe quel ordre.</p>${progressDots(seen.length,4)}<div class="sensor-grid">${tiles.map((t,i)=>`<button class="sensor-tile" data-act="sense" data-val="${i}" aria-pressed="${seen.includes(i)}"><span class="ordinal">0${i+1}</span><strong>${esc(t[0])}</strong>${seen.includes(i)?`<small>${esc(t[1])}</small>`:'<small>Touche pour explorer</small>'}</button>`).join('')}</div>${feedbackHtml()}`;
 }
 case 'telescopi':{
  const seen=game.tel||[];const desc=["Observatoire A","Observatoire B","Observatoire C","Observatoire D"];return `<div class="question-label">TON MÉTIER : ASTROPHYSICIEN</div><h3>Capte les signaux depuis plusieurs endroits.</h3><p class="subtext">Active les quatre antennes symboliques. Lorsque toutes auront observé, tu découvriras la reconstitution artistique. Le vrai réseau EHT compte bien plus d’instruments.</p>${progressDots(seen.length,4)}<div class="eht-lab">${desc.map((v,i)=>`<button class="dish-tile" data-act="dish" data-val="${i}" aria-pressed="${seen.includes(i)}"><span aria-hidden="true">${seen.includes(i)?'✦':'◉'}</span><small>${esc(v)}</small>${seen.includes(i)?'<b>Signal reçu</b>':''}</button>`).join('')}</div>${seen.length===4?'<button class="primary-button" data-act="assemble">Traiter les observations →</button>':''}<div class="hole-visual ${seen.length===4?'visible':''}" role="img" aria-label="Visualisation artistique de la région entourant un trou noir"></div><p class="hint">Cette figure est une illustration artistique, PAS la photo officielle. Tu peux ouvrir l’image authentique via le lien ESO ci-dessous.</p>${feedbackHtml()}`;
 }
 default:return '';
 }
}
function redrawChallenge(){const r=ROOMS[currentId-1];const panel=document.getElementById('challengePanel');if(panel&&r)panel.innerHTML=renderChallenge(r);persist();}
function win(){if(!currentId)return;completed.add(currentId);persist();feedback='';feedbackKind='';redrawChallenge();if(completed.size===7)showToast('Tu as complété les sept salles ! Ouvre ton passeport pour recevoir ton diplôme.');else showToast('✦ Sceau conquis ! Otto est ravi.');}
function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.hidden=true},3300);}
function choiceRight(ok,wrong,right){if(ok){feedback=right;feedbackKind='good';win();}else{feedback=wrong;feedbackKind='wrong';redrawChallenge();}}
function passportMarkup(){return `<div class="modal-card" role="dialog" aria-modal="true" aria-label="Ton passeport d’explorateur"><div class="modal-header"><h2>Ton passeport d’explorateur</h2><button data-act="close" class="icon-button" aria-label="Fermer">×</button></div><p>Chaque salle explorée ajoute un sceau. Ton passeport est enregistré uniquement sur ton appareil.</p><div class="passport-list">${ROOMS.map(r=>`<span class="passport-seal ${completed.has(r.id)?'stamped':''}" title="Salle ${r.id} : ${esc(r.seal)}">${completed.has(r.id)?r.icon:r.id}</span>`).join('')}</div><div class="progress-rail"><div style="width:${completed.size/7*100}%"></div></div><p><strong>${completed.size} / 7 salles complétées.</strong>${completed.size===7?' Félicitations ! Tu as complété l’ensemble des sept salles.':''}</p>${completed.size===7?`<hr style="border:none;border-top:1px solid rgba(255,215,156,.2);margin:28px 0"><div class="eyebrow">RÉCOMPENSE FINALE</div><h3 style="font:700 28px Georgia,serif;margin:10px 0">Le diplôme d’explorateur</h3><label for="childName">Prénom de l’explorateur ou de l’exploratrice</label><input id="childName" class="name-input" placeholder="Écris un prénom pour l’imprimer" maxlength="50" value="${esc(diplomaName)}"><div class="diploma-actions"><button class="primary-button" data-act="print">Imprimer le diplôme</button></div><div id="diplomaPreview" class="diploma"><div>✧ ✦ ✧</div><h3>EXPLORATEUR DES<br>DÉCOUVERTES IMPOSSIBLES</h3><p>Ce certificat atteste que</p><div class="large" id="diplomaChild">${esc(diplomaName||'________________')}</div><p>a complété les sept salles du musée,<br>a observé avec curiosité et a suivi les preuves scientifiques.</p><p>Otto · Le Musée des Découvertes Impossibles</p></div>`:`<button class="quiet-button" data-act="close">Retour au musée</button>`}<p class="hint" style="margin-top:18px">Pour recommencer depuis le début : <button data-act="reset-confirm" class="quiet-button" style="padding:7px 12px">Réinitialiser les sceaux</button></p></div>`;}
function openZoom(id){const r=ROOMS[id-1];if(!r)return;const zoomTitle=r.side.figureTitle||r.side.title;const zoomAlt=r.side.figureAlt||zoomTitle;modal.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="Agrandissement : ${esc(zoomTitle)}"><div class="modal-header"><h2>${esc(zoomTitle)}</h2><button data-act="close" class="icon-button" aria-label="Fermer">×</button></div><div style="margin:17px 0"><img src="${A(r.sideArt)}" style="display:block;width:100%;max-height:57vh;object-fit:contain;border-radius:16px;background:#092032" alt="${esc(zoomAlt)}"></div>${r.side.figureCaptionHtml ? `<div class="figure-modal-caption">${r.side.figureCaptionHtml}</div>` : `<p>${esc(r.side.desc)}</p>`}<p class="art-notice">${esc(r.side.artNotice||"Figura illustrativa, non fotografia dello studio. Per vedere il materiale originale apri la fonte.")}</p>${sourceHtml(r.side.figureSource||r.side.source)}</div>`;modal.hidden=false;document.body.style.overflow="hidden";modal.querySelector(".icon-button")?.focus();}
function openPassport(){modal.innerHTML=passportMarkup();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.icon-button')?.focus();}
function closeModal(){modal.hidden=true;modal.innerHTML='';document.body.style.overflow='';document.getElementById('passportButton')?.focus();}
function printDiploma(){const name=diplomaName.trim()||'____________________';let p=document.getElementById('printSheet');if(!p){p=document.createElement('div');p.id='printSheet';document.body.appendChild(p);}p.innerHTML=`<section class="print-certificate"><div>✦ ✦ ✦</div><p>LE MUSÉE DES DÉCOUVERTES IMPOSSIBLES</p><h1>DIPLÔME D’EXPLORATEUR</h1><p>Décerné à</p><p class="named">${esc(name)}</p><p>pour avoir exploré les sept salles,<br>collectionné les sceaux et appris à distinguer<br>les observations scientifiques des hypothèses.</p><p class="brand-print">✦ Otto, la petite pieuvre exploratrice ✦</p><p>Tiré de : EINSTEIN, TU AS MANQUÉ ÇA !</p></section>`;window.print();}
function clickHandler(event){const btn=event.target.closest('[data-act]');if(!btn)return;const act=btn.dataset.act;const val=btn.dataset.val;
 if(act==='passport'){openPassport();return;}
 if(act==='zoom'){openZoom(Number(val));return;}
 if(act==='close'){closeModal();return;}
 if(act==='print'){diplomaName=modal.querySelector('#childName')?.value.trim()||'';printDiploma();return;}
 if(act==='reset-confirm'){if(window.confirm('Veux-tu effacer les sept sceaux enregistrés sur cet appareil ?')){completed.clear();game={};feedback='';persist();closeModal();updateView(false);showToast('Passeport prêt pour une nouvelle exploration !');}return;}
 if(!currentId||completed.has(currentId))return;
 feedback='';feedbackKind='';
 if(act==='judge'){
  const answers=['osservato','osservato','ipotesi','ipotesi'];const idx=game.index||0;
  if(val===answers[idx]){game.index=idx+1;if(game.index===4){win();return;} feedback='Indice exact ! Passe à la phrase suivante.';}else{feedback=answers[idx]==='osservato'?'Cette action est directement visible sur les vidéos : c’est une observation.':'C’est une fonction possible de l’algue, pas encore prouvée : c’est une hypothèse.';feedbackKind='wrong';}redrawChallenge();return;
 }
 if(act==='soil'){choiceRight(val==='a','Tu changes trop de variables à la fois : impossible de savoir laquelle explique la différence.','Excellent choix : tu compares des plantules identiques en gardant toutes les autres variables égales.');return;}
 if(act==='step'){const expect=(game.seq||0)+1;if(Number(val)===expect){game.seq=expect;if(expect===4){win();return;}feedback='Exact ! Choisis maintenant l’étape suivante.';}else{feedback='Cette étape intervient plus tard. Pars de ce que fait le poisson.';feedbackKind='wrong';}redrawChallenge();return;}
 if(act==='dino'){choiceRight(val==='1','Observe l’endroit où l’arbre se sépare. Le T. rex n’est pas l’ancêtre direct de la poule.','Exact ! Les oiseaux sont des dinosaures théropodes vivants partageant des ancêtres avec d’autres branches éteintes.');return;}
 if(act==='grip-check'){const x=game.grip===undefined?15:game.grip;choiceRight(x>=35&&x<=65,x<35?'L’objet glisse : essaie d’augmenter légèrement la force.':'Trop fort ! Une prise rigide risquerait de casser un objet délicat.','Tu as trouvé le bon équilibre ! Les vrais robots nécessitent des capteurs fins, des formes souples et des contrôles précis.');return;}
 if(act==='sense'){const i=Number(val);game.seen=game.seen||[];if(!game.seen.includes(i))game.seen.push(i);if(game.seen.length===4){win();return;}feedback='Tu as révélé une autre étape. Continue de suivre le parcours !';redrawChallenge();return;}
 if(act==='dish'){const i=Number(val);game.tel=game.tel||[];if(!game.tel.includes(i))game.tel.push(i);feedback=game.tel.length===4?'Toutes les données sont réunies ! Tu peux lancer la reconstitution.':'Tu as activé un observatoire symbolique.';redrawChallenge();return;}
 if(act==='assemble'){if((game.tel||[]).length===4)win();return;}
}
main.addEventListener('click',clickHandler);
modal.addEventListener('click',clickHandler);
document.getElementById('passportButton').addEventListener('click',openPassport);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
modal.addEventListener('input',e=>{if(e.target.id==='childName'){diplomaName=e.target.value;const el=modal.querySelector('#diplomaChild');if(el)el.textContent=diplomaName||'________________';}});
main.addEventListener('input',e=>{if(e.target.id==='gripSlider'){game.grip=Number(e.target.value);const p=main.querySelector('#gripFeedback');const v=game.grip;p.innerHTML=`<strong>${v<35?'La prise est trop faible.':v>65?'Tu serres plus que nécessaire.':'La prise est contrôlée et délicate.'}</strong>`;main.querySelector('.gripper-scene')?.setAttribute('data-level',v<35?'soft':v>65?'hard':'good');}});
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
