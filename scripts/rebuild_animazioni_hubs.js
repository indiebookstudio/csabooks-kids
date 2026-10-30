const fs = require('fs');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function buildFlagBar(currentLang) {
  const list = [
    { code: 'en', title: 'English', flag: UK_FLAG },
    { code: 'it', title: 'Italiano', flag: IT_FLAG },
    { code: 'fr', title: 'Français', flag: FR_FLAG },
    { code: 'es', title: 'Español', flag: ES_FLAG }
  ];
  return `<div class="locale-pill-bar" role="group" aria-label="Language selection">
${list.map(l => {
  if (l.code === currentLang) {
    return `        <a class="locale-flag-item active" href="#" aria-current="true" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  } else {
    return `        <a class="locale-flag-item " href="../../${l.code}/animazioni/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
          ${l.flag}
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </a>`;
  }
}).join('\n')}
      </div>`;
}

function buildHub(lang) {
  const isFR = lang === 'fr';

  const meta = {
    lang: isFR ? 'fr' : 'es',
    title: isFR ? 'Simulations 3D Interactives · Le Laboratoire d\'Otto' : 'Simulaciones 3D Interactivas · El Laboratorio de Otto',
    desc: isFR 
      ? 'Laboratoire 3D interactif d\'Otto : découvre 7 simulations scientifiques exclusives du livre Einstein, tu as manqué ça !'
      : 'Laboratorio 3D interactivo de Otto: descubre 7 simulaciones científicas exclusivas del libro ¡Einstein, esta te la perdiste!',
    ogTitle: isFR ? 'Animations 3D et Simulations Scientifiques · Le Laboratoire d\'Otto' : 'Animaciones 3D y Simulaciones Científicas · El Laboratorio de Otto',
    ogDesc: isFR 
      ? 'Explore en 3D les grandes découvertes de la science avec Otto : baleines à bosse, ADN géant, robots fongiques et trous noirs.'
      : 'Explora en 3D los grandes descubrimientos de la ciencia con Otto: ballenas jorobadas, ADN gigante, robots fúngicos y agujeros negros.',
    homeAria: isFR ? 'Aller à la page d\'accueil' : 'Ir a la página de inicio',
    navHome: isFR ? 'Accueil' : 'Inicio',
    navBonus: isFR ? 'Les bonus' : 'Los bonus',
    navSources: isFR ? 'Bibliothèque des sources' : 'Biblioteca de fuentes',
    topbarLab: isFR ? 'LABORATOIRE 3D' : 'LABORATORIO 3D',
    topbarBack: isFR ? '← Retour aux bonus' : '← Volver a los bonus',
    topbarSources: isFR ? '📚 Bibliothèque des sources' : '📚 Biblioteca de fuentes',
    heroEyebrow: isFR ? 'BONUS EXCLUSIF · EINSTEIN, TU AS MANQUÉ ÇA !' : 'BONUS EXCLUSIVO · ¡EINSTEIN, ESTA TE LA PERDISTE!',
    heroH1: isFR ? 'LA SCIENCE<br><em>EN MOUVEMENT 3D</em>' : 'LA CIENCIA<br><em>EN MOVIMIENTO 3D</em>',
    heroSubtitle: isFR
      ? 'Otto a ouvert le laboratoire interactif. Regarde ce qui se passe quand les merveilles sortent du livre : pivote dans l\'espace 3D, active les mécanismes, observe les trajectoires et expérimente avec la physique et la biologie réelle.'
      : 'Otto ha abierto el laboratorio interactivo. Mira lo que sucede cuando las maravillas salen del libro: gira en el espacio 3D, activa los mecanismos, observa las trayectorias y experimenta con la física y la biología real.',
    tags: isFR ? [
      '7 SIMULATIONS 3D INTERACTIVES',
      'AUCUNE INSTALLATION · FONCTIONNE SUR PC, TABLETTE ET SMARTPHONE',
      '7–12 ANS',
      'SOURCES SCIENTIFIQUES OFFICIELLES'
    ] : [
      '7 SIMULACIONES 3D INTERACTIVAS',
      'SIN INSTALACIÓN · FUNCIONA EN PC, TABLET Y SMARTPHONE',
      '7–12 AÑOS',
      'FUENTES CIENTÍFICAS OFICIALES'
    ],
    ottoAlt: isFR ? 'Otto la pieuvre scientifique' : 'Otto el pulpo científico',
    secEyebrow: isFR ? 'LES SIMULATIONS INTERACTIVES' : 'LAS SIMULACIONES INTERACTIVAS',
    secH2: isFR ? 'Explore les merveilles de la science en 3D' : 'Explora las maravillas de la ciencia en 3D',
    secSub: isFR ? 'Touche ou clique pour entrer dans chaque simulation tridimensionnelle' : 'Toca o haz clic para entrar en cada simulación tridimensional',
    badge3D: isFR ? '✨ 3D INTERACTIF' : '✨ 3D INTERACTIVO',
    btnPlay: isFR ? '✦ Ouvrir la simulation 3D' : '✦ Abrir simulación 3D',
    sourceLabel: isFR ? 'Source' : 'Fuente',
    infoTitle: isFR ? 'Comment lire ces simulations scientifiques' : 'Cómo interpretar estas simulaciones científicas',
    infoP: isFR
      ? 'Toutes les simulations 3D sont des reconstitutions scientifiques interactives, conçues spécialement pour expliquer aux jeunes les principes et les mécanismes décrits dans les publications scientifiques originales. Les informations sont rigoureusement vérifiées et documentées avec des liens directs et des DOI officiels.'
      : 'Todas las simulaciones 3D son reconstrucciones interactivas científicas, creadas específicamente para explicar a los jóvenes los principios y mecanismos descritos en los artículos científicos originales. Las informaciones están rigurosamente verificadas con enlaces directos y DOI oficiales.',
    footerBonus: isFR
      ? 'UN BONUS DE <strong>EINSTEIN, TU AS MANQUÉ ÇA !</strong> · Clara Musicco · 2026'
      : 'UN BONUS DE <strong>¡EINSTEIN, ESTA TE LA PERDISTE!</strong> · Clara Musicco · 2026',
    footerQuote: isFR
      ? 'Les merveilles sont réelles. La technologie permet de les explorer.'
      : 'Las maravillas son reales. La tecnología nos permite explorarlas.'
  };

  const cards = isFR ? [
    {
      code: 'SC-05', dir: '01.Megattere/la_rete_invisibile_delle_megattere.html',
      imgAlt: 'Filet de bulles des baleines à bosse',
      cat: 'ANIMAUX EXTRAORDINAIRES',
      title: 'Le filet invisible des baleines à bosse',
      lead: 'Comment des bulles d’air peuvent-elles devenir un véritable filet ?',
      desc: 'Simulation tridimensionnelle sous-marine : observe le banc de poissons, change de perspective du dessus ou de côté et active la spirale de bulles concentriques créée par la baleine à bosse.',
      doiText: 'Source DOI ↗', doiUrl: 'https://doi.org/10.1098/rsos.240328'
    },
    {
      code: 'SC-13', dir: '02.Felce.DNA/la_felce_con_un_dna_gigantesco.html',
      imgAlt: 'La fougère au génome géant',
      cat: 'PLANTES ET MONDES MINIATURES',
      title: 'La fougère au génome géant',
      lead: 'Une minuscule fougère peut-elle abriter plus d’ADN que nous ?',
      desc: 'Voyage à l’intérieur de la cellule végétale de <em>Tmesipteris oblanceolata</em> : explore en 3D la double hélice avec plus de 160 milliards de paires de bases, soit plus de 50 fois le génome humain.',
      doiText: 'Source DOI ↗', doiUrl: 'https://doi.org/10.1016/j.isci.2024.109889'
    },
    {
      code: 'SC-15', dir: '03.Pesce.Veicolo/il_pesce_che_muove_un_veicolo.html',
      imgAlt: 'Poisson qui conduit un véhicule',
      cat: 'EXPÉRIENCES SURPRENANTES',
      title: 'Un poisson peut-il conduire un véhicule ?',
      lead: 'Comment un aquarium motorisé parvient-il à suivre la nage d’un poisson ?',
      desc: 'Découvre le dispositif expérimental doté d’une caméra zénithale et de vision par ordinateur : l’ordinateur calcule la position du poisson rouge et pilote les roues robotisées dans la pièce.',
      doiText: 'Source DOI ↗', doiUrl: 'https://doi.org/10.1016/j.bbr.2021.113711'
    },
    {
      code: 'SC-22', dir: '04.Uccelli.Dinosauri/gli_uccelli_sono_dinosauri_vivi.html',
      imgAlt: 'Dinosaures théropodes et oiseaux vivants',
      cat: 'DINOSAURES ET ADN',
      title: 'Les oiseaux sont des dinosaures vivants',
      lead: 'Le T. rex est-il vraiment l’ancêtre de la poule ?',
      desc: 'Explore l’évolution des dinosaures théropodes : fais pivoter squelettes et plumes fossiles, et découvre la parenté profonde qui relie les grands prédateurs du Crétacé aux oiseaux du quotidien.',
      doiText: 'Musée NHM ↗', doiUrl: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html'
    },
    {
      code: 'SC-36', dir: '05.Fungo.Robot/il_fungo_collegato_a_un_robot.html',
      imgAlt: 'Champignon connecté à un robot',
      cat: 'LABORATOIRE DU FUTUR',
      title: 'Le champignon connecté à un robot',
      lead: 'Un champignon peut-il vraiment aider à piloter une machine ?',
      desc: 'Simule l’interface biohybride entre mycélium fongique et circuit électronique : les impulsions électriques naturelles guident les réponses motrices du petit robot expérimental.',
      doiText: 'Source Science ↗', doiUrl: 'https://doi.org/10.1126/scirobotics.adk8019'
    },
    {
      code: 'SC-43', dir: '06.Ginocchio.Bionico/il_ginocchio_bionico.html',
      imgAlt: 'Genou bionique',
      cat: 'CORPS ET SUPER-TECHNOLOGIES',
      title: 'Le genou bionique',
      lead: 'Comment une prothèse peut-elle répondre aux signaux du corps ?',
      desc: 'Observe en 3D l’articulation bionique intégrée aux tissus développée au MIT : les signaux neuromusculaires sont décodés pour restaurer une démarche fluide et naturelle.',
      doiText: 'Article MIT ↗', doiUrl: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710'
    },
    {
      code: 'SC-55', dir: '07.Buco.Nero/come_nasce_l_immagine_di_un_buco_nero.html',
      imgAlt: 'Image du trou noir M87',
      cat: 'ESPACE ET UNIVERS',
      title: 'Comment naît l’image d’un trou noir',
      lead: 'Combien de télescopes ont été nécessaires pour photographier M87* ?',
      desc: 'Explore le réseau à l’échelle terrestre de l’Event Horizon Telescope : découvre comment les radiotélescopes de toute la planète ont synchronisé leurs données pour reconstituer l’anneau de lumière autour de l’horizon des événements.',
      doiText: 'Communiqué ESO ↗', doiUrl: 'https://www.eso.org/public/images/eso1907a/'
    }
  ] : [
    {
      code: 'SC-05', dir: '01.Megattere/la_rete_invisibile_delle_megattere.html',
      imgAlt: 'Red de burbujas de las ballenas jorobadas',
      cat: 'ANIMALES EXTRAORDINARIOS',
      title: 'La red invisible de las ballenas jorobadas',
      lead: '¿Cómo pueden unas burbujas de aire convertirse en una red de pesca?',
      desc: 'Simulación tridimensional submarina: observa el banco de peces, cambia de perspectiva desde arriba o de lado y activa la espiral de burbujas concéntricas creada por la ballena jorobada.',
      doiText: 'Fuente DOI ↗', doiUrl: 'https://doi.org/10.1098/rsos.240328'
    },
    {
      code: 'SC-13', dir: '02.Felce.DNA/la_felce_con_un_dna_gigantesco.html',
      imgAlt: 'El helecho con ADN gigantesco',
      cat: 'PLANTAS Y PEQUEÑOS MUNDOS',
      title: 'El helecho con un ADN gigantesco',
      lead: '¿Puede un helecho diminuto albergar más ADN que nosotros?',
      desc: 'Viaja al interior de la célula vegetal de <em>Tmesipteris oblanceolata</em>: explora en 3D la doble hélice con más de 160 mil millones de pares de bases, más de 50 veces el genoma humano.',
      doiText: 'Fuente DOI ↗', doiUrl: 'https://doi.org/10.1016/j.isci.2024.109889'
    },
    {
      code: 'SC-15', dir: '03.Pesce.Veicolo/il_pesce_che_muove_un_veicolo.html',
      imgAlt: 'Pez que mueve un vehículo',
      cat: 'EXPERIMENTOS SORPRENDENTES',
      title: '¿Puede un pez mover un vehículo?',
      lead: '¿Cómo consigue un tanque sobre ruedas seguir el nado de un pez?',
      desc: 'Descubre el aparato experimental con cámara cenital y visión por ordenador: el ordenador calcula la posición del pez de colores y guía las ruedas robóticas por la habitación.',
      doiText: 'Fuente DOI ↗', doiUrl: 'https://doi.org/10.1016/j.bbr.2021.113711'
    },
    {
      code: 'SC-22', dir: '04.Uccelli.Dinosauri/gli_uccelli_sono_dinosauri_vivi.html',
      imgAlt: 'Dinosaurios terópodos y aves vivas',
      cat: 'DINOSAURIOS Y ADN',
      title: 'Las aves son dinosaurios vivos',
      lead: '¿Es el T. rex realmente el abuelo de la gallina?',
      desc: 'Explora la evolución de los dinosaurios terópodos: gira esqueletos y plumas fósiles, y descubre el parentesco profundo que une a los grandes depredadores del Cretácico con las aves que vemos a diario.',
      doiText: 'Museo NHM ↗', doiUrl: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html'
    },
    {
      code: 'SC-36', dir: '05.Fungo.Robot/il_fungo_collegato_a_un_robot.html',
      imgAlt: 'Hongo conectado a un robot',
      cat: 'LABORATORIO DEL FUTURO',
      title: 'El hongo conectado a un robot',
      lead: '¿Puede un hongo ayudar realmente a controlar una máquina?',
      desc: 'Simula la interfaz biohíbrida entre micelio fúngico y circuito electrónico: los impulsos eléctricos naturales guían las respuestas motoras del pequeño robot experimental.',
      doiText: 'Fuente Science ↗', doiUrl: 'https://doi.org/10.1126/scirobotics.adk8019'
    },
    {
      code: 'SC-43', dir: '06.Ginocchio.Bionico/il_ginocchio_bionico.html',
      imgAlt: 'Rodilla biónica',
      cat: 'CUERPO Y SUPERTECNOLOGÍAS',
      title: 'La rodilla biónica',
      lead: '¿Cómo puede una prótesis responder a las señales del cuerpo?',
      desc: 'Observa en 3D la articulación biónica integrada en los tejidos desarrollada en el MIT: las señales neuromusculares se decodifican para devolver un caminar fluido y natural.',
      doiText: 'Artículo MIT ↗', doiUrl: 'https://news.mit.edu/2025/bionic-knee-integrated-into-tissue-can-restore-natural-movement-0710'
    },
    {
      code: 'SC-55', dir: '07.Buco.Nero/come_nasce_l_immagine_di_un_buco_nero.html',
      imgAlt: 'Imagen del agujero negro M87',
      cat: 'ESPACIO Y UNIVERSO',
      title: 'Cómo nace la imagen de un agujero negro',
      lead: '¿Cuántos telescopios hicieron falta para fotografiar M87*?',
      desc: 'Explora la red a escala planetaria del Event Horizon Telescope: descubre cómo los radiotelescopios de todo el planeta sincronizaron sus datos para reconstruir el anillo de luz alrededor del horizonte de sucesos.',
      doiText: 'Comunicado ESO ↗', doiUrl: 'https://www.eso.org/public/images/eso1907a/'
    }
  ];

  return `<!doctype html>
<html lang="${meta.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#071726">
  <meta name="description" content="${meta.desc}">
  <meta name="robots" content="noindex,nofollow">
  <meta property="og:title" content="${meta.ogTitle}">
  <meta property="og:description" content="${meta.ogDesc}">
  <meta property="og:image" content="../../media/bonus/film.webp">
  <title>${meta.title}</title>
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --navy: #071726;
      --navy2: #0e2739;
      --glass: #102d3d;
      --glass-hover: #153a4f;
      --line: rgba(181, 216, 232, 0.18);
      --gold: #f0c578;
      --gold-hover: #ffd78a;
      --ivory: #fff4dd;
      --mist: #a8c3cc;
      --sky: #38bdf8;
      --sky-light: #7dd3fc;
      --teal: #42d3d0;
      --sans: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      color: var(--ivory);
      font-family: var(--sans);
      background: radial-gradient(ellipse at 77% -9%, #183b58 0%, transparent 40%),
                  radial-gradient(ellipse at 15% 17%, #15344b 0%, transparent 30%),
                  var(--navy);
      min-height: 100vh;
      font-size: 16px;
      line-height: 1.5;
    }
    body::after {
      content: "";
      pointer-events: none;
      position: fixed;
      inset: 0;
      opacity: 0.25;
      background-image: radial-gradient(circle at 12% 15%, #fff 0 1px, transparent 1.8px),
                        radial-gradient(circle at 85% 35%, #fff 0 1px, transparent 1.8px),
                        radial-gradient(circle at 32% 79%, #fff 0 1px, transparent 1.8px);
      background-size: 410px 470px, 680px 430px, 590px 520px;
      z-index: -1;
    }
    .wrap {
      max-width: 1360px;
      width: calc(100% - 48px);
      margin: 0 auto;
    }
    a { color: inherit; text-decoration: none; }

    /* PERSISTENT TOP NAVIGATION */
    .site-nav-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(7, 23, 38, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(247, 209, 132, 0.22);
      padding: 10px 24px;
    }
    .site-nav-inner {
      max-width: 1360px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .brand-link {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      text-decoration: none;
      color: inherit;
    }
    .brand-mark-otto {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: 1px solid rgba(247, 209, 132, 0.4);
      background: linear-gradient(150deg, #2b4360, #122b42);
      display: grid;
      place-items: center;
      overflow: hidden;
      flex-shrink: 0;
    }
    .brand-mark-otto img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
    .brand-lines {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
    }
    .brand-lines strong {
      font-size: 15px;
      letter-spacing: 0.08em;
      color: #fff;
    }
    .brand-lines strong span {
      color: #f7d184;
      margin-left: 3px;
    }
    .brand-lines small {
      font-size: 9.5px;
      letter-spacing: 0.16em;
      color: #8faec8;
      text-transform: uppercase;
      font-weight: 700;
    }
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-item {
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      color: #b0c9db;
      transition: all 0.2s ease;
      background: transparent;
    }
    .nav-item:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
    .nav-item.active {
      color: #071726;
      background: #f7d184;
      font-weight: 700;
    }
    .locale-pill-bar {
      display: inline-flex;
      align-items: center;
      background: rgba(14, 39, 57, 0.85);
      border: 1px solid rgba(181, 216, 232, 0.22);
      border-radius: 999px;
      padding: 3px 5px;
      gap: 4px;
    }
    .locale-flag-item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 9px;
      border-radius: 999px;
      border: 1px solid transparent;
      background: transparent;
      color: #a8c3cc;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .locale-flag-item:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
    .locale-flag-item.active {
      background: #f0c578;
      color: #071726;
      border-color: #f0c578;
      font-weight: 700;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding: 22px 0 10px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      letter-spacing: 0.06em;
      font-size: 18px;
    }
    .logostar {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, #1c4b70, #0a1b2a);
      border: 1px solid var(--line);
      color: var(--gold);
      font-size: 20px;
      flex-shrink: 0;
    }
    .logo small {
      display: block;
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--mist);
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .top-nav {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--line);
      color: var(--ivory);
      transition: all 0.2s ease;
    }
    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--gold);
      color: var(--gold);
    }
    .hero {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      align-items: center;
      gap: 40px;
      padding: 50px 0 45px;
      border-bottom: 1px solid var(--line);
    }
    .hero-copy h1 {
      font-size: clamp(34px, 5.2vw, 64px);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin: 14px 0 18px;
    }
    .hero-copy h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--gold), #ffdfa1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .eyebrow {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.22em;
      color: var(--gold);
      text-transform: uppercase;
    }
    .hero p {
      font-size: 17px;
      line-height: 1.6;
      color: var(--mist);
      max-width: 620px;
      margin: 0 0 24px;
    }
    .hero-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .meta-tag, .hero-meta span {
      padding: 6px 14px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--line);
      font-size: 12px;
      font-weight: 700;
      color: var(--sky-light);
      letter-spacing: 0.04em;
    }
    .hero-art {
      display: grid;
      place-items: center;
      position: relative;
    }
    .hero-art img {
      max-width: 290px;
      width: 100%;
      height: auto;
      filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
    }
    .section-title-wrap {
      padding: 45px 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 20px;
      flex-wrap: wrap;
    }
    .section-title-wrap h2 {
      font-size: clamp(26px, 3.2vw, 36px);
      margin: 6px 0 0;
      font-weight: 800;
    }
    .section-sub {
      color: var(--mist);
      font-size: 14px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      padding-bottom: 50px;
    }
    .anim-card {
      background: var(--glass);
      border: 1px solid var(--line);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }
    .anim-card:hover {
      transform: translateY(-4px);
      background: var(--glass-hover);
      border-color: rgba(240, 197, 120, 0.45);
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
    }
    .thumb-wrap {
      position: relative;
      height: 190px;
      overflow: hidden;
      background: #0a1b2a;
    }
    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .anim-card:hover .thumb-wrap img {
      transform: scale(1.04);
    }
    .badge-3d {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 10px;
      border-radius: 8px;
      background: rgba(7, 23, 38, 0.85);
      border: 1px solid var(--line);
      color: var(--gold);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.05em;
      backdrop-filter: blur(8px);
    }
    .card-code {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 4px 9px;
      border-radius: 8px;
      background: rgba(7, 23, 38, 0.88);
      border: 1px solid var(--line);
      color: var(--mist);
      font-size: 11px;
      font-weight: 800;
      backdrop-filter: blur(8px);
    }
    .card-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .card-cat {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .card-body h3 {
      margin: 0 0 10px;
      font-size: 20px;
      font-weight: 800;
      line-height: 1.25;
      color: #fff;
    }
    .card-lead {
      color: var(--sky-light);
      font-size: 13.5px;
      font-weight: 600;
      margin: 0 0 10px;
      line-height: 1.45;
    }
    .card-desc {
      color: var(--mist);
      font-size: 13.5px;
      line-height: 1.55;
      margin: 0 0 20px;
      flex-grow: 1;
    }
    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: auto;
    }
    .btn-play {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px 18px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 0.02em;
      background: linear-gradient(135deg, var(--gold), #d89e43);
      color: #071726;
      border: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-play:hover {
      background: linear-gradient(135deg, var(--gold-hover), #e6ae55);
      transform: translateY(-2px);
    }
    .card-minor-links {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 11.5px;
      color: var(--mist);
      padding-top: 4px;
    }
    .minor-link {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: var(--mist);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .minor-link:hover {
      color: var(--ivory);
    }
    .info-box {
      margin: 20px 0 50px;
      padding: 22px 26px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--line);
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .info-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid var(--sky);
      color: var(--sky);
      display: grid;
      place-items: center;
      font-weight: 900;
      flex-shrink: 0;
    }
    .info-content strong {
      display: block;
      color: var(--ivory);
      margin-bottom: 4px;
      font-size: 15px;
    }
    .info-content p {
      margin: 0;
      font-size: 13.5px;
      color: var(--mist);
      line-height: 1.55;
    }
    .footer {
      border-top: 1px solid var(--line);
      padding: 30px 0 45px;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      color: var(--mist);
      font-size: 13px;
    }
    .footer strong { color: var(--ivory); }

    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; gap: 20px; padding: 30px 0; }
      .hero-art { order: -1; }
      .hero-art img { max-width: 170px; }
      .grid { grid-template-columns: 1fr; }
      .site-nav-inner { gap: 8px; }
    }
    .flag-svg { display: inline-block; vertical-align: middle; flex-shrink: 0; }
    .flag-code { font-size: 11.5px; font-weight: 800; letter-spacing: .02em; }
  </style>
</head>
<body>

  <!-- PERSISTENT TOP NAVIGATION -->
  <header class="site-nav-bar">
    <div class="site-nav-inner">
      <a class="brand-link" href="../../../?lang=${meta.lang}&pagina=inizio" aria-label="${meta.homeAria}">
        <span class="brand-mark-otto"><img src="assets/otto.webp" alt="Otto" onerror="this.onerror=null;this.src='../../../media/otto.webp';"></span>
        <span class="brand-lines"><strong>OTTO<span>✦</span></strong><small>DISCOVERY CLUB</small></span>
      </a>
      <nav class="nav-menu" aria-label="Main Navigation">
        <a class="nav-item" href="../../../?lang=${meta.lang}&pagina=inizio">${meta.navHome}</a>
        <a class="nav-item active" href="../../../?lang=${meta.lang}&pagina=bonus">${meta.navBonus}</a>
        <a class="nav-item" href="../../../?lang=${meta.lang}&pagina=fonti">${meta.navSources}</a>
      </nav>
      <!-- FLAG SELECTOR -->
      ${buildFlagBar(meta.lang)}
    </div>
  </header>

<header class="topbar wrap">
  <div class="logo">
    <div class="logostar">✦</div>
    <div>
      <div>OTTO <small>${meta.topbarLab}</small></div>
    </div>
  </div>
  <nav class="top-nav" aria-label="Quick Navigation">
    <a class="nav-btn" href="../../../?lang=${meta.lang}&pagina=bonus">${meta.topbarBack}</a>
    <a class="nav-btn" href="../../../?lang=${meta.lang}&pagina=fonti">${meta.topbarSources}</a>
  </nav>
</header>

<main class="wrap">
  <section class="hero">
    <div class="hero-copy">
      <span class="eyebrow">${meta.heroEyebrow}</span>
      <h1>${meta.heroH1}</h1>
      <p>${meta.heroSubtitle}</p>
      <div class="hero-meta">
        ${meta.tags.map(t => `<span>${t}</span>`).join('\n        ')}
      </div>
    </div>
    <div class="hero-art">
      <img src="assets/otto.webp" alt="${meta.ottoAlt}">
    </div>
  </section>

  <section id="animazioni">
    <div class="section-title-wrap">
      <div>
        <span class="eyebrow">${meta.secEyebrow}</span>
        <h2>${meta.secH2}</h2>
      </div>
      <div class="section-sub">${meta.secSub}</div>
    </div>

    <div class="grid">
${cards.map(c => `      <!-- ${c.code} -->
      <article class="anim-card">
        <div class="thumb-wrap">
          <img src="assets/${c.code}.webp" alt="${c.imgAlt}" loading="lazy">
          <span class="badge-3d">${meta.badge3D}</span>
          <span class="card-code">${c.code}</span>
        </div>
        <div class="card-body">
          <div class="card-cat">${c.cat}</div>
          <h3>${c.title}</h3>
          <p class="card-lead">${c.lead}</p>
          <p class="card-desc">${c.desc}</p>
          <div class="card-actions">
            <a class="btn-play" href="${c.dir}">${meta.btnPlay}</a>
            <div class="card-minor-links">
              <a class="minor-link" href="${c.doiUrl}" target="_blank" rel="noopener noreferrer">${c.doiText}</a>
            </div>
          </div>
        </div>
      </article>`).join('\n\n')}
    </div>

    <div class="info-box">
      <div class="info-icon">i</div>
      <div class="info-content">
        <strong>${meta.infoTitle}</strong>
        <p>${meta.infoP}</p>
      </div>
    </div>
  </section>
</main>

<footer class="wrap footer">
  <div>${meta.footerBonus}</div>
  <div>${meta.footerQuote}</div>
</footer>

</body>
</html>`;
}

// Write FR Hub
fs.writeFileSync('assets/einstein/bonus/fr/animazioni/index.html', buildHub('fr'), 'utf8');
console.log('Successfully generated assets/einstein/bonus/fr/animazioni/index.html');

// Write ES Hub
fs.writeFileSync('assets/einstein/bonus/es/animazioni/index.html', buildHub('es'), 'utf8');
console.log('Successfully generated assets/einstein/bonus/es/animazioni/index.html');
