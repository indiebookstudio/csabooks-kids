const fs = require('fs');
const path = require('path');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function renderFlagBar(currentLang) {
  const langs = [
    { code: 'en', title: 'English', flag: UK_FLAG },
    { code: 'it', title: 'Italiano', flag: IT_FLAG },
    { code: 'fr', title: 'Français', flag: FR_FLAG },
    { code: 'es', title: 'Español', flag: ES_FLAG }
  ];
  return `<div class="locale-pill-bar" role="group" aria-label="Language selection">
${langs.map(l => {
  if (l.code === currentLang) {
    return `        <a class="locale-flag-item active" href="#" aria-current="true" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  } else {
    return `        <a class="locale-flag-item " href="../../${l.code}/carte/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  }
}).join('\n')}
      </div>`;
}

// 1. Generate FR index.html
const frCards = JSON.parse(fs.readFileSync('assets/einstein/bonus/fr/carte/carte_fr.json', 'utf8'));

const frHtml = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#081528">
  <meta name="description" content="36 cartes illustrées avec Otto : sais-tu distinguer le vrai, le faux et ce que la science ignore encore ?">
  <title>Vrai, faux ou on ne sait pas encore ? · Les cartes d'Otto</title>
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Nunito:wght@500;700;800;900&display=swap');
    :root{color-scheme:dark;--navy:#071429;--panel:#132840;--panel2:#18334b;--gold:#ffd46f;--white:#f7f4e9;--muted:#b6c9d9;--aqua:#46ddc5;--rose:#ff8b87;--ring:#ffdc81}
    *{box-sizing:border-box}
    body{margin:0;font-family:'DM Sans',system-ui,sans-serif;background:radial-gradient(ellipse at 80% 0,#143555 0%,transparent 60%),radial-gradient(ellipse at 20% 100%,#0e2a44 0%,transparent 50%),var(--navy);color:var(--white);min-height:100vh;display:flex;flex-direction:column}
    header{padding:18px 24px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,20,41,.85);backdrop-filter:blur(10px);position:sticky;top:0;z-index:20}
    .head-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
    .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--white)}
    .brand img{width:36px;height:36px;border-radius:50%}
    .brand-title{font-family:'Nunito',sans-serif;font-weight:900;font-size:16px;letter-spacing:.5px;line-height:1}
    .brand-sub{font-size:11px;color:var(--gold);letter-spacing:1px;font-weight:700}
    nav{display:flex;gap:12px;align-items:center}
    .nav-item{color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;border-radius:20px;transition:.2s}
    .nav-item:hover,.nav-item.active{color:var(--white);background:rgba(255,255,255,.08)}
    .locale-pill-bar{display:inline-flex;align-items:center;gap:3px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:2px 4px}
    .locale-flag-item{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:14px;text-decoration:none;color:#b6c9d9;font-size:11px;font-weight:700;transition:all 0.15s ease}
    .locale-flag-item:hover{color:#fff;background:rgba(255,255,255,0.1)}
    .locale-flag-item.active{color:#ffd46f;background:rgba(255,212,111,0.18)}
    .flag-svg{display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4)}
    .hero{max-width:1100px;margin:0 auto;padding:32px 24px 20px;display:flex;align-items:center;justify-content:space-between;gap:24px}
    .hero h1{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(24px,4vw,34px);line-height:1.1;margin:0 0 8px;letter-spacing:.3px}
    .hero h1 span{color:var(--gold)}
    .hero p{margin:0;color:var(--muted);font-size:15px;max-width:540px}
    .hero .eyebrow{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
    .hero img.otto{width:110px;height:auto;filter:drop-shadow(0 10px 20px rgba(0,0,0,.4))}
    main{max-width:1100px;margin:0 auto;padding:0 24px 40px;width:100%;flex:1}
    .shell{background:linear-gradient(180deg,rgba(19,40,64,.85),rgba(15,31,51,.95));border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:24px;box-shadow:0 20px 40px rgba(0,0,0,.4)}
    .topline{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:18px}
    .chips{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
    .chip{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:6px 12px;border-radius:20px;font-size:12px;font-weight:700;color:var(--muted)}
    .topright{display:flex;align-items:center;gap:12px}
    .bar{width:120px;height:8px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden}
    .bar span{display:block;height:100%;background:linear-gradient(90deg,var(--aqua),var(--gold));width:0%;transition:width .3s}
    button.reset{background:none;border:none;color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;text-decoration:underline;padding:4px}
    button.reset:hover{color:var(--rose)}
    .filters{display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:20px}
    .filters button{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:var(--muted);padding:6px 12px;border-radius:16px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.15s}
    .filters button:hover,.filters button.on{background:var(--gold);color:var(--navy);border-color:var(--gold)}
    .playing{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
    @media(max-width:768px){.playing{grid-template-columns:1fr}.hero{flex-direction:column-reverse;text-align:center}.hero p{margin:0 auto}}
    .gamecard{background:linear-gradient(135deg,#1c3d61,#132840);border:2px solid var(--gold);border-radius:20px;padding:24px;aspect-ratio:3/4;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 15px 30px rgba(0,0,0,.5);position:relative;overflow:hidden}
    .gamecard::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at top right,rgba(255,212,111,.15),transparent 60%);pointer-events:none}
    .cardtop{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:800;letter-spacing:1px;color:var(--gold)}
    .cardnum{background:rgba(0,0,0,.3);padding:4px 8px;border-radius:8px}
    .theme{text-transform:uppercase}
    .question{font-family:'Nunito',sans-serif;font-weight:800;font-size:clamp(18px,2.4vw,22px);line-height:1.3;color:var(--white);margin:auto 0;text-align:center}
    .cardfoot{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);font-weight:700;border-top:1px solid rgba(255,255,255,.1);padding-top:12px}
    .side{display:flex;flex-direction:column;gap:16px}
    .side h2{font-family:'Nunito',sans-serif;font-weight:900;font-size:20px;margin:0;color:var(--gold)}
    .side p{margin:0;font-size:14px;color:var(--muted);line-height:1.4}
    .options{display:grid;grid-template-columns:1fr;gap:10px}
    .answer{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.12);color:var(--white);padding:14px 18px;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:12px;text-align:left;transition:.2s}
    .answer:hover:not(:disabled){background:rgba(255,255,255,.12);border-color:var(--gold);transform:translateX(4px)}
    .answer .dot{width:12px;height:12px;border-radius:50%;border:2px solid currentColor;display:inline-block}
    .answer.good{background:rgba(70,221,197,.15);border-color:var(--aqua);color:var(--aqua)}
    .answer.good .dot{background:var(--aqua)}
    .answer.bad{background:rgba(255,139,135,.15);border-color:var(--rose);color:var(--rose);opacity:.6}
    .answer.bad .dot{background:var(--rose)}
    .answer:disabled{cursor:default}
    .feedback{display:none;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.1);padding:16px;border-radius:14px;font-size:14px;line-height:1.45;color:var(--white)}
    .feedback.visible{display:block;animation:pop .2s ease-out}
    .feedback strong{display:block;margin-bottom:6px;color:var(--gold);font-family:'Nunito',sans-serif;font-size:15px}
    .feedback a{color:var(--aqua);font-weight:700;text-decoration:underline;font-size:12px;display:inline-block;margin-top:8px}
    .feedback .src{font-size:11px;color:var(--muted);display:block;margin-top:6px}
    @keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .navrow{display:flex;gap:12px;margin-top:8px}
    .btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:var(--white);padding:10px 18px;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;flex:1;text-align:center;transition:.2s}
    .btn:hover:not(:disabled){background:rgba(255,255,255,.15)}
    .btn.primary{background:var(--gold);color:var(--navy);border-color:var(--gold)}
    .btn.primary:hover:not(:disabled){background:#ffe294}
    .btn:disabled{opacity:.4;cursor:default}
    .extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:24px}
    .mini{background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px}
    .mini h3{margin:0 0 6px;font-size:14px;color:var(--gold);font-family:'Nunito',sans-serif}
    .mini p{margin:0 0 12px;font-size:12px;color:var(--muted);line-height:1.4}
    .mini a{display:inline-block;background:rgba(255,255,255,.08);color:var(--white);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;transition:.2s}
    .mini a:hover{background:var(--gold);color:var(--navy)}
    .notice{margin-top:16px;font-size:11px;color:var(--muted);text-align:center}
    .footer{margin-top:auto;padding:24px;text-align:center;font-size:12px;color:var(--muted);border-top:1px solid rgba(255,255,255,.06)}
  </style>
</head>
<body>
  <header>
    <div class="head-in">
      <a class="brand" href="../../../?lang=fr&pagina=inizio">
        <img src="assets/otto.webp" alt="Otto">
        <div>
          <div class="brand-title">OTTO ✦ DÉCOUVERTES</div>
          <div class="brand-sub">CLUB EXCLUSIF</div>
        </div>
      </a>
      <nav>
        <a class="nav-item" href="../../../?lang=fr&pagina=inizio">Accueil</a>
        <a class="nav-item active" href="../../../?lang=fr&pagina=bonus">Les bonus</a>
        <a class="nav-item" href="../../../?lang=fr&pagina=fonti">Bibliothèque des sources</a>
      </nav>
      ${renderFlagBar('fr')}
    </div>
  </header>

  <section class="hero">
    <div>
      <div class="eyebrow">Le bonus exclusif d'Einstein, tu as manqué ça !</div>
      <h1>VRAI, FAUX <span>OU ON NE SAIT PAS ENCORE ?</span></h1>
      <p>36 découvertes incroyables. Otto te met au défi de distinguer ce que la science a découvert, ce qu'elle a réfuté et ce qui reste un grand mystère.</p>
    </div>
    <img class="otto" src="assets/otto.webp" alt="Otto, la pieuvre exploratrice avec une loupe">
  </section>

  <main id="gioca">
    <section class="shell">
      <div class="topline">
        <div class="chips">
          <span class="chip" id="counter">Carte 1 sur 36</span>
          <span class="chip" id="points">0 point</span>
        </div>
        <div class="topright">
          <div class="bar" aria-label="Progression"><span id="progress"></span></div>
          <button class="reset" id="restart">Recommencer</button>
        </div>
      </div>
      <div class="filters" id="filters"></div>
      <div class="playing">
        <article class="gamecard" aria-live="polite">
          <div class="cardtop">
            <span class="cardnum" id="number">#01</span>
            <span class="theme" id="theme">ANIMAUX</span>
          </div>
          <div class="question" id="question"></div>
          <div class="cardfoot">
            <span>OBSERVE · RÉFLÉCHIS · CHOISIS</span>
            <span id="code">SC-01</span>
          </div>
        </article>
        <section class="side">
          <h2>Quelle est ta réponse ?</h2>
          <p>Pas besoin de deviner : l'important est de comprendre pourquoi. En science, dire « on ne sait pas encore » est souvent la réponse la plus intelligente.</p>
          <div class="options">
            <button class="answer" data-choice="VRAI"><span class="dot"></span>Vrai</button>
            <button class="answer" data-choice="FAUX"><span class="dot"></span>Faux</button>
            <button class="answer" data-choice="ON NE SAIT PAS ENCORE"><span class="dot"></span>On ne sait pas encore</button>
          </div>
          <div class="feedback" id="feedback" aria-live="polite"></div>
          <div class="navrow">
            <button class="btn" id="prev">← Précédente</button>
            <button class="btn primary" id="next">Carte suivante →</button>
          </div>
        </section>
      </div>
      <div class="notice">Ta progression est enregistrée uniquement dans le navigateur de ton appareil. Certaines cartes décrivent des recherches préliminaires : l'explication en précise les détails.</div>
    </section>

    <section class="extras" id="stampa">
      <div class="mini">
        <h3>🃏 Impression Recto-Verso</h3>
        <p>Les 36 cartes. <strong>Guide d'impression :</strong> choisis « Recto-verso » avec « Retourner sur les bords longs » pour aligner parfaitement questions et explications. Papier 160–250 g/m² conseillé.</p>
        <a href="OTTO_CARTE_36_FRONTE_RETRO_A4.pdf" download="OTTO_CARTE_36_RECTO_VERSO_A4.pdf">PDF Recto-verso ↗</a>
        <a href="OTTO_CARTE_36_SOLO_FRONTE_A4.pdf" download="OTTO_CARTE_36_RECTO_SEUL_A4.pdf" style="margin-left:8px">Recto seul ↗</a>
      </div>
      <div class="mini">
        <h3>📚 Règles & Jeu en Famille</h3>
        <p>1 à 6 joueurs. Tire une carte, lis la question à voix haute et choisis : Vrai, Faux ou On ne sait pas encore. 1 point par bonne réponse !</p>
        <a href="OTTO_GUIDA_PREMIUM.pdf" download="OTTO_GUIDE_REGLES.pdf">Télécharger le guide ↗</a>
      </div>
      <div class="mini" id="fonti">
        <h3>🔬 Derrière Chaque Découverte</h3>
        <p>Chaque carte renvoie aux recherches scientifiques originales validées par les pairs.</p>
        <a href="CARTE_36_DATI.csv" download="CARTE_36_DONNEES.csv">Catalogue des sources ↗</a>
      </div>
    </section>
  </main>

  <div class="footer">
    © 2026 · Bonus exclusif du livre <i>Einstein, tu as manqué ça !</i> · Reconstitutions illustrées à but pédagogique.
  </div>

  <script id="DATA" type="application/json">
  ${JSON.stringify(frCards)}
  </script>

  <script>
    'use strict';
    fetch('carte_fr.json')
      .then(r => r.json())
      .then(initGame)
      .catch(() => {
        const fallback = JSON.parse(document.getElementById('DATA').textContent);
        initGame(fallback);
      });

    function initGame(cards) {
      const letters = ['Toutes','Animaux','Plantes','Expériences','Dinosaures','Inventions','Corps','Espace'];
      const groups = ['ALL','A','B','C','D','E','F','G'];
      let filter = 'ALL', sequence = [], ix = 0, answers = {};
      const el = id => document.getElementById(id);
      const storage = 'otto_true_false_v1_fr';

      try {
        let saved = JSON.parse(localStorage.getItem(storage) || '{}');
        if (saved.answers && typeof saved.answers === 'object') answers = saved.answers;
      } catch(e) {}

      const save = () => { try { localStorage.setItem(storage, JSON.stringify({answers})); } catch(e) {} };

      function updateSequence() {
        sequence = cards.filter(c => filter === 'ALL' || c.group === filter);
        ix = Math.max(0, Math.min(ix, sequence.length - 1));
        render();
      }

      function setFilter(f) {
        filter = f; ix = 0;
        document.querySelectorAll('.filters button').forEach(b => {
          let on = b.dataset.filter === f;
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', String(on));
        });
        updateSequence();
      }

      const nav = () => {
        el('prev').disabled = ix === 0;
        el('next').disabled = ix === sequence.length - 1;
        el('next').textContent = ix === sequence.length - 1 ? 'Tu as fini tout le paquet !' : 'Carte suivante →';
      };

      function render() {
        let c = sequence[ix];
        if (!c) return;
        const a = answers[c.id];
        const did = Boolean(a);
        el('number').textContent = '#' + String(c.id).padStart(2, '0');
        el('theme').textContent = c.theme;
        el('question').textContent = c.question;
        el('code').textContent = c.code;

        const done = cards.filter(k => Boolean(answers[k.id]));
        let correct = done.filter(k => answers[k.id] === k.answer);
        el('counter').textContent = 'Carte ' + (ix + 1) + ' sur ' + sequence.length + ' · ' + done.length + '/36 explorées';
        el('points').textContent = correct.length === 1 ? '1 point' : correct.length + ' points';
        el('progress').style.width = (done.length / 36 * 100) + '%';

        for (const b of document.querySelectorAll('button.answer')) {
          b.disabled = did;
          b.classList.remove('good', 'bad', 'active');
          let choice = b.dataset.choice;
          if (did) {
            if (choice === c.answer) b.classList.add('good');
            else if (choice === a) b.classList.add('bad');
          }
        }

        let box = el('feedback');
        box.replaceChildren();
        box.classList.toggle('visible', did);
        if (did) {
          let head = document.createElement('strong');
          let ansText = c.answer === 'VRAI' ? 'vrai' : c.answer === 'FAUX' ? 'faux' : "on ne sait pas encore";
          head.textContent = (a === c.answer ? "Bravo, c'est exact ! " : "Bien essayé ! ") + 'Réponse : ' + ansText + '.';
          box.appendChild(head);
          let text = document.createElement('span');
          text.textContent = c.explanation;
          box.appendChild(text);
          if (c.source) {
            let l = document.createElement('a');
            l.href = c.source;
            l.target = '_blank';
            l.rel = 'noopener noreferrer';
            l.textContent = 'Consulter la publication scientifique ↗';
            box.appendChild(document.createElement('br'));
            box.appendChild(l);
          } else {
            let s = document.createElement('span');
            s.className = 'src';
            s.textContent = 'Référence du chapitre · ' + c.code;
            box.appendChild(s);
          }
        }
        nav();
      }

      const filtersBox = el('filters');
      filtersBox.replaceChildren();
      for (let n = 0; n < letters.length; n++) {
        let b = document.createElement('button');
        b.type = 'button';
        b.textContent = letters[n];
        b.dataset.filter = groups[n];
        b.onclick = () => setFilter(groups[n]);
        filtersBox.append(b);
      }

      for (const b of document.querySelectorAll('button.answer')) {
        b.onclick = () => {
          let c = sequence[ix];
          if (answers[c.id]) return;
          answers[c.id] = b.dataset.choice;
          save();
          render();
        };
      }

      el('prev').onclick = () => { ix = Math.max(0, ix - 1); render(); };
      el('next').onclick = () => { if (ix >= sequence.length - 1) return; ix++; render(); };
      el('restart').onclick = () => {
        if (window.confirm('Veux-tu vraiment réinitialiser ta partie et recommencer ?')) {
          answers = {}; ix = 0; save(); render();
        }
      };

      setFilter('ALL');
    }
  </script>
</body>
</html>
`;

// 2. Generate ES index.html
const esCards = JSON.parse(fs.readFileSync('assets/einstein/bonus/es/carte/carte_es.json', 'utf8'));

const esHtml = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#081528">
  <meta name="description" content="36 cartas ilustradas con Otto: ¿sabes distinguir verdadero, falso y lo que la ciencia aún no sabe?">
  <title>¿Verdadero, falso o no lo sabemos? · Las cartas de Otto</title>
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Nunito:wght@500;700;800;900&display=swap');
    :root{color-scheme:dark;--navy:#071429;--panel:#132840;--panel2:#18334b;--gold:#ffd46f;--white:#f7f4e9;--muted:#b6c9d9;--aqua:#46ddc5;--rose:#ff8b87;--ring:#ffdc81}
    *{box-sizing:border-box}
    body{margin:0;font-family:'DM Sans',system-ui,sans-serif;background:radial-gradient(ellipse at 80% 0,#143555 0%,transparent 60%),radial-gradient(ellipse at 20% 100%,#0e2a44 0%,transparent 50%),var(--navy);color:var(--white);min-height:100vh;display:flex;flex-direction:column}
    header{padding:18px 24px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,20,41,.85);backdrop-filter:blur(10px);position:sticky;top:0;z-index:20}
    .head-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
    .brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--white)}
    .brand img{width:36px;height:36px;border-radius:50%}
    .brand-title{font-family:'Nunito',sans-serif;font-weight:900;font-size:16px;letter-spacing:.5px;line-height:1}
    .brand-sub{font-size:11px;color:var(--gold);letter-spacing:1px;font-weight:700}
    nav{display:flex;gap:12px;align-items:center}
    .nav-item{color:var(--muted);text-decoration:none;font-size:13px;font-weight:600;padding:6px 12px;border-radius:20px;transition:.2s}
    .nav-item:hover,.nav-item.active{color:var(--white);background:rgba(255,255,255,.08)}
    .locale-pill-bar{display:inline-flex;align-items:center;gap:3px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:2px 4px}
    .locale-flag-item{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:14px;text-decoration:none;color:#b6c9d9;font-size:11px;font-weight:700;transition:all 0.15s ease}
    .locale-flag-item:hover{color:#fff;background:rgba(255,255,255,0.1)}
    .locale-flag-item.active{color:#ffd46f;background:rgba(255,212,111,0.18)}
    .flag-svg{display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4)}
    .hero{max-width:1100px;margin:0 auto;padding:32px 24px 20px;display:flex;align-items:center;justify-content:space-between;gap:24px}
    .hero h1{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(24px,4vw,34px);line-height:1.1;margin:0 0 8px;letter-spacing:.3px}
    .hero h1 span{color:var(--gold)}
    .hero p{margin:0;color:var(--muted);font-size:15px;max-width:540px}
    .hero .eyebrow{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
    .hero img.otto{width:110px;height:auto;filter:drop-shadow(0 10px 20px rgba(0,0,0,.4))}
    main{max-width:1100px;margin:0 auto;padding:0 24px 40px;width:100%;flex:1}
    .shell{background:linear-gradient(180deg,rgba(19,40,64,.85),rgba(15,31,51,.95));border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:24px;box-shadow:0 20px 40px rgba(0,0,0,.4)}
    .topline{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:18px}
    .chips{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
    .chip{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:6px 12px;border-radius:20px;font-size:12px;font-weight:700;color:var(--muted)}
    .topright{display:flex;align-items:center;gap:12px}
    .bar{width:120px;height:8px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden}
    .bar span{display:block;height:100%;background:linear-gradient(90deg,var(--aqua),var(--gold));width:0%;transition:width .3s}
    button.reset{background:none;border:none;color:var(--muted);font-size:12px;font-weight:600;cursor:pointer;text-decoration:underline;padding:4px}
    button.reset:hover{color:var(--rose)}
    .filters{display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:20px}
    .filters button{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:var(--muted);padding:6px 12px;border-radius:16px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.15s}
    .filters button:hover,.filters button.on{background:var(--gold);color:var(--navy);border-color:var(--gold)}
    .playing{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
    @media(max-width:768px){.playing{grid-template-columns:1fr}.hero{flex-direction:column-reverse;text-align:center}.hero p{margin:0 auto}}
    .gamecard{background:linear-gradient(135deg,#1c3d61,#132840);border:2px solid var(--gold);border-radius:20px;padding:24px;aspect-ratio:3/4;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 15px 30px rgba(0,0,0,.5);position:relative;overflow:hidden}
    .gamecard::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at top right,rgba(255,212,111,.15),transparent 60%);pointer-events:none}
    .cardtop{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:800;letter-spacing:1px;color:var(--gold)}
    .cardnum{background:rgba(0,0,0,.3);padding:4px 8px;border-radius:8px}
    .theme{text-transform:uppercase}
    .question{font-family:'Nunito',sans-serif;font-weight:800;font-size:clamp(18px,2.4vw,22px);line-height:1.3;color:var(--white);margin:auto 0;text-align:center}
    .cardfoot{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted);font-weight:700;border-top:1px solid rgba(255,255,255,.1);padding-top:12px}
    .side{display:flex;flex-direction:column;gap:16px}
    .side h2{font-family:'Nunito',sans-serif;font-weight:900;font-size:20px;margin:0;color:var(--gold)}
    .side p{margin:0;font-size:14px;color:var(--muted);line-height:1.4}
    .options{display:grid;grid-template-columns:1fr;gap:10px}
    .answer{background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.12);color:var(--white);padding:14px 18px;border-radius:14px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:12px;text-align:left;transition:.2s}
    .answer:hover:not(:disabled){background:rgba(255,255,255,.12);border-color:var(--gold);transform:translateX(4px)}
    .answer .dot{width:12px;height:12px;border-radius:50%;border:2px solid currentColor;display:inline-block}
    .answer.good{background:rgba(70,221,197,.15);border-color:var(--aqua);color:var(--aqua)}
    .answer.good .dot{background:var(--aqua)}
    .answer.bad{background:rgba(255,139,135,.15);border-color:var(--rose);color:var(--rose);opacity:.6}
    .answer.bad .dot{background:var(--rose)}
    .answer:disabled{cursor:default}
    .feedback{display:none;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.1);padding:16px;border-radius:14px;font-size:14px;line-height:1.45;color:var(--white)}
    .feedback.visible{display:block;animation:pop .2s ease-out}
    .feedback strong{display:block;margin-bottom:6px;color:var(--gold);font-family:'Nunito',sans-serif;font-size:15px}
    .feedback a{color:var(--aqua);font-weight:700;text-decoration:underline;font-size:12px;display:inline-block;margin-top:8px}
    .feedback .src{font-size:11px;color:var(--muted);display:block;margin-top:6px}
    @keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .navrow{display:flex;gap:12px;margin-top:8px}
    .btn{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:var(--white);padding:10px 18px;border-radius:12px;font-weight:700;font-size:13px;cursor:pointer;flex:1;text-align:center;transition:.2s}
    .btn:hover:not(:disabled){background:rgba(255,255,255,.15)}
    .btn.primary{background:var(--gold);color:var(--navy);border-color:var(--gold)}
    .btn.primary:hover:not(:disabled){background:#ffe294}
    .btn:disabled{opacity:.4;cursor:default}
    .extras{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:24px}
    .mini{background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:16px}
    .mini h3{margin:0 0 6px;font-size:14px;color:var(--gold);font-family:'Nunito',sans-serif}
    .mini p{margin:0 0 12px;font-size:12px;color:var(--muted);line-height:1.4}
    .mini a{display:inline-block;background:rgba(255,255,255,.08);color:var(--white);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;transition:.2s}
    .mini a:hover{background:var(--gold);color:var(--navy)}
    .notice{margin-top:16px;font-size:11px;color:var(--muted);text-align:center}
    .footer{margin-top:auto;padding:24px;text-align:center;font-size:12px;color:var(--muted);border-top:1px solid rgba(255,255,255,.06)}
  </style>
</head>
<body>
  <header>
    <div class="head-in">
      <a class="brand" href="../../../?lang=es&pagina=inizio">
        <img src="assets/otto.webp" alt="Otto">
        <div>
          <div class="brand-title">OTTO ✦ DESCUBRIMIENTOS</div>
          <div class="brand-sub">CLUB EXCLUSIVO</div>
        </div>
      </a>
      <nav>
        <a class="nav-item" href="../../../?lang=es&pagina=inizio">Inicio</a>
        <a class="nav-item active" href="../../../?lang=es&pagina=bonus">Los bonus</a>
        <a class="nav-item" href="../../../?lang=es&pagina=fonti">Biblioteca de fuentes</a>
      </nav>
      ${renderFlagBar('es')}
    </div>
  </header>

  <section class="hero">
    <div>
      <div class="eyebrow">El bonus exclusivo de ¡Einstein, esta te la perdiste!</div>
      <h1>¿VERDADERO, FALSO <span>O NO LO SABEMOS?</span></h1>
      <p>36 afirmaciones increíbles. Otto te reta a distinguir lo que los científicos han descubierto, lo que han desmentido y lo que aún es un misterio.</p>
    </div>
    <img class="otto" src="assets/otto.webp" alt="Otto, el pulpo explorador con una lupa">
  </section>

  <main id="gioca">
    <section class="shell">
      <div class="topline">
        <div class="chips">
          <span class="chip" id="counter">Carta 1 de 36</span>
          <span class="chip" id="points">0 puntos</span>
        </div>
        <div class="topright">
          <div class="bar" aria-label="Progreso"><span id="progress"></span></div>
          <button class="reset" id="restart">Reiniciar</button>
        </div>
      </div>
      <div class="filters" id="filters"></div>
      <div class="playing">
        <article class="gamecard" aria-live="polite">
          <div class="cardtop">
            <span class="cardnum" id="number">#01</span>
            <span class="theme" id="theme">ANIMALES</span>
          </div>
          <div class="question" id="question"></div>
          <div class="cardfoot">
            <span>OBSERVA · RAZONA · ELIGE</span>
            <span id="code">SC-01</span>
          </div>
        </article>
        <section class="side">
          <h2>¿Cuál es tu respuesta?</h2>
          <p>No hace falta adivinar: lo importante es entender por qué. En ciencia, decir «no lo sabemos» es muchas veces la respuesta más sabia.</p>
          <div class="options">
            <button class="answer" data-choice="VERDADERO"><span class="dot"></span>Verdadero</button>
            <button class="answer" data-choice="FALSO"><span class="dot"></span>Falso</button>
            <button class="answer" data-choice="NO LO SABEMOS TODAVÍA"><span class="dot"></span>No lo sabemos</button>
          </div>
          <div class="feedback" id="feedback" aria-live="polite"></div>
          <div class="navrow">
            <button class="btn" id="prev">← Anterior</button>
            <button class="btn primary" id="next">Siguiente carta →</button>
          </div>
        </section>
      </div>
      <div class="notice">Tu progreso se guarda únicamente en el navegador de tu dispositivo. Algunas cartas describen investigaciones preliminares: la explicación aclara la evidencia actual.</div>
    </section>

    <section class="extras" id="stampa">
      <div class="mini">
        <h3>🃏 Impresión a Doble Cara</h3>
        <p>Las 36 cartas completas. <strong>Instrucciones:</strong> selecciona «Impresión a doble cara» con «Voltear por el borde largo» para alinear anversos y reversos. Cartulina recomendada 160–250 g/m².</p>
        <a href="OTTO_CARTE_36_FRONTE_RETRO_A4.pdf" download="OTTO_CARTAS_36_DOBLE_CARA_A4.pdf">PDF Doble cara ↗</a>
        <a href="OTTO_CARTE_36_SOLO_FRONTE_A4.pdf" download="OTTO_CARTAS_36_SOLO_ANVERSO_A4.pdf" style="margin-left:8px">Solo anverso ↗</a>
      </div>
      <div class="mini">
        <h3>📚 Reglas y Juego en Familia</h3>
        <p>De 1 a 6 jugadores. Roba una carta, lee la pregunta en voz alta y elige: Verdadero, Falso o No lo sabemos. ¡1 punto por acierto!</p>
        <a href="OTTO_GUIDA_PREMIUM.pdf" download="OTTO_GUIA_REGLAS.pdf">Descargar guía ↗</a>
      </div>
      <div class="mini" id="fonti">
        <h3>🔬 Detrás de Cada Descubrimiento</h3>
        <p>Cada carta se vincula directamente a publicaciones científicas originales evaluadas por pares.</p>
        <a href="CARTE_36_DATI.csv" download="CARTE_36_DATOS.csv">Catálogo de fuentes ↗</a>
      </div>
    </section>
  </main>

  <div class="footer">
    © 2026 · Bonus exclusivo del libro <i>¡Einstein, esta te la perdiste!</i> · Reconstrucciones ilustradas con fines educativos.
  </div>

  <script id="DATA" type="application/json">
  ${JSON.stringify(esCards)}
  </script>

  <script>
    'use strict';
    fetch('carte_es.json')
      .then(r => r.json())
      .then(initGame)
      .catch(() => {
        const fallback = JSON.parse(document.getElementById('DATA').textContent);
        initGame(fallback);
      });

    function initGame(cards) {
      const letters = ['Todas','Animales','Plantas','Experimentos','Dinosaurios','Inventos','Cuerpo','Espacio'];
      const groups = ['ALL','A','B','C','D','E','F','G'];
      let filter = 'ALL', sequence = [], ix = 0, answers = {};
      const el = id => document.getElementById(id);
      const storage = 'otto_true_false_v1_es';

      try {
        let saved = JSON.parse(localStorage.getItem(storage) || '{}');
        if (saved.answers && typeof saved.answers === 'object') answers = saved.answers;
      } catch(e) {}

      const save = () => { try { localStorage.setItem(storage, JSON.stringify({answers})); } catch(e) {} };

      function updateSequence() {
        sequence = cards.filter(c => filter === 'ALL' || c.group === filter);
        ix = Math.max(0, Math.min(ix, sequence.length - 1));
        render();
      }

      function setFilter(f) {
        filter = f; ix = 0;
        document.querySelectorAll('.filters button').forEach(b => {
          let on = b.dataset.filter === f;
          b.classList.toggle('on', on);
          b.setAttribute('aria-pressed', String(on));
        });
        updateSequence();
      }

      const nav = () => {
        el('prev').disabled = ix === 0;
        el('next').disabled = ix === sequence.length - 1;
        el('next').textContent = ix === sequence.length - 1 ? '¡Has completado toda la baraja!' : 'Siguiente carta →';
      };

      function render() {
        let c = sequence[ix];
        if (!c) return;
        const a = answers[c.id];
        const did = Boolean(a);
        el('number').textContent = '#' + String(c.id).padStart(2, '0');
        el('theme').textContent = c.theme;
        el('question').textContent = c.question;
        el('code').textContent = c.code;

        const done = cards.filter(k => Boolean(answers[k.id]));
        let correct = done.filter(k => answers[k.id] === k.answer);
        el('counter').textContent = 'Carta ' + (ix + 1) + ' de ' + sequence.length + ' · ' + done.length + '/36 exploradas';
        el('points').textContent = correct.length === 1 ? '1 punto' : correct.length + ' puntos';
        el('progress').style.width = (done.length / 36 * 100) + '%';

        for (const b of document.querySelectorAll('button.answer')) {
          b.disabled = did;
          b.classList.remove('good', 'bad', 'active');
          let choice = b.dataset.choice;
          if (did) {
            if (choice === c.answer) b.classList.add('good');
            else if (choice === a) b.classList.add('bad');
          }
        }

        let box = el('feedback');
        box.replaceChildren();
        box.classList.toggle('visible', did);
        if (did) {
          let head = document.createElement('strong');
          let ansText = c.answer === 'VERDADERO' ? 'verdadero' : c.answer === 'FALSO' ? 'falso' : 'no lo sabemos todavía';
          head.textContent = (a === c.answer ? '¡Correcto! ' : '¡Buen intento! ') + 'Respuesta: ' + ansText + '.';
          box.appendChild(head);
          let text = document.createElement('span');
          text.textContent = c.explanation;
          box.appendChild(text);
          if (c.source) {
            let l = document.createElement('a');
            l.href = c.source;
            l.target = '_blank';
            l.rel = 'noopener noreferrer';
            l.textContent = 'Ver publicación científica ↗';
            box.appendChild(document.createElement('br'));
            box.appendChild(l);
          } else {
            let s = document.createElement('span');
            s.className = 'src';
            s.textContent = 'Referencia del capítulo · ' + c.code;
            box.appendChild(s);
          }
        }
        nav();
      }

      const filtersBox = el('filters');
      filtersBox.replaceChildren();
      for (let n = 0; n < letters.length; n++) {
        let b = document.createElement('button');
        b.type = 'button';
        b.textContent = letters[n];
        b.dataset.filter = groups[n];
        b.onclick = () => setFilter(groups[n]);
        filtersBox.append(b);
      }

      for (const b of document.querySelectorAll('button.answer')) {
        b.onclick = () => {
          let c = sequence[ix];
          if (answers[c.id]) return;
          answers[c.id] = b.dataset.choice;
          save();
          render();
        };
      }

      el('prev').onclick = () => { ix = Math.max(0, ix - 1); render(); };
      el('next').onclick = () => { if (ix >= sequence.length - 1) return; ix++; render(); };
      el('restart').onclick = () => {
        if (window.confirm('¿Seguro que quieres borrar tu progreso y volver a empezar?')) {
          answers = {}; ix = 0; save(); render();
        }
      };

      setFilter('ALL');
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('assets/einstein/bonus/fr/carte/index.html', frHtml, 'utf8');
fs.writeFileSync('assets/einstein/bonus/es/carte/index.html', esHtml, 'utf8');

// 3. Update IT and EN index.html with all 4 flags
function updateFlagsInFile(filePath, currentLang) {
  let content = fs.readFileSync(filePath, 'utf8');
  const barRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;
  const newBar = renderFlagBar(currentLang);
  content = content.replace(barRegex, newBar);
  fs.writeFileSync(filePath, content, 'utf8');
}

updateFlagsInFile('assets/einstein/bonus/it/carte/index.html', 'it');
updateFlagsInFile('assets/einstein/bonus/en/carte/index.html', 'en');

console.log('✅ Generated FR and ES card HTML, and updated flag bars across all 4 card languages!');
