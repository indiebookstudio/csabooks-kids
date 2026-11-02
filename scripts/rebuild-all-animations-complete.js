/**
 * Complete, definitive builder & localizer for Einstein 3D animations
 * Compiles all 7 animations into IT, EN, FR, ES in:
 * - assets/einstein/bonus/{lang}/animazioni/{dir}/
 * - accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/{lang}/animazioni/{dir}/
 */
const fs = require('fs');
const path = require('path');
const data = require('../assets/einstein/i18n/animations-data.js');

const UK_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
const IT_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
const FR_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
const ES_FLAG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;

function renderSimFlagBar(dir, currentLang) {
  const langs = [
    { code: 'en', title: 'English', flag: UK_FLAG },
    { code: 'it', title: 'Italiano', flag: IT_FLAG },
    { code: 'fr', title: 'Français', flag: FR_FLAG },
    { code: 'es', title: 'Español', flag: ES_FLAG }
  ];
  return `<div class="locale-pill-bar" role="group" aria-label="Language selection">
${langs.map(l => {
  if (l.code === currentLang) {
    return `      <a class="locale-flag-item active" href="#" aria-current="true" title="${l.title}">
        ${l.flag}
        <span class="flag-code">${l.code.toUpperCase()}</span>
      </a>`;
  } else {
    return `      <a class="locale-flag-item " href="../../../${l.code}/animazioni/${dir}/index.html" onclick="try{localStorage.setItem('otto_lang','${l.code}');}catch(_){};" title="${l.title}">
        ${l.flag}
        <span class="flag-code">${l.code.toUpperCase()}</span>
      </a>`;
  }
}).join('\n')}
    </div>`;
}

const flagRegex = /<div class="locale-pill-bar" role="group" aria-label="[^"]*">[\s\S]*?<\/div>/;

function buildAnimation(dirKey) {
  const anim = data.animations[dirKey];
  if (!anim) {
    console.error(`Animation not found in data: ${dirKey}`);
    return;
  }

  const itTemplatePath = path.join('assets/einstein/bonus/it/animazioni', anim.dir, 'index.html');
  const itSource = fs.readFileSync(itTemplatePath, 'utf8');

  for (const lang of ['it', 'en', 'fr', 'es']) {
    let content = itSource;

    // 1. HTML lang attribute
    content = content.replace(/<html\s+lang=["'][^"']*["']>/, `<html lang="${lang}">`);

    // 2. Language selector flag bar
    content = content.replace(flagRegex, renderSimFlagBar(anim.dir, lang));

    // 3. Navigation Links and Labels
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=[a-z]{2}&pagina=inizio"/g, `href="../../../../?lang=${lang}&pagina=inizio"`);
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=[a-z]{2}&pagina=bonus"/g, `href="../../../../?lang=${lang}&pagina=bonus"`);
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=[a-z]{2}&pagina=fonti"/g, `href="../../../../?lang=${lang}&pagina=fonti"`);
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?pagina=inizio"/g, `href="../../../../?lang=${lang}&pagina=inizio"`);
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?pagina=bonus"/g, `href="../../../../?lang=${lang}&pagina=bonus"`);
    content = content.replace(/href="\.\.\/\.\.\/\.\.\/\.\.\/\?pagina=fonti"/g, `href="../../../../?lang=${lang}&pagina=fonti"`);

    content = content.replace(/>Inizio<\/a>/g, `>${data.common.nav_home[lang]}</a>`);
    content = content.replace(/>Home<\/a>/g, `>${data.common.nav_home[lang]}</a>`);
    content = content.replace(/>I bonus<\/a>/g, `>${data.common.nav_bonus[lang]}</a>`);
    content = content.replace(/>Bonuses<\/a>/g, `>${data.common.nav_bonus[lang]}</a>`);
    content = content.replace(/>Laboratorio 3D<\/a>/g, `>${data.common.nav_lab3d[lang]}</a>`);
    content = content.replace(/>3D Lab<\/a>/g, `>${data.common.nav_lab3d[lang]}</a>`);
    content = content.replace(/>Biblioteca fonti<\/a>/g, `>${data.common.nav_sources[lang]}</a>`);
    content = content.replace(/>Fonti<\/a>/g, `>${data.common.nav_sources[lang]}</a>`);
    content = content.replace(/>Sources<\/a>/g, `>${data.common.nav_sources[lang]}</a>`);

    // Page Title
    content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${anim.pageTitle[lang]}</title>`);

    // TOOLBAR BRAND AREA
    const discLabel = { it: 'Scoperta', en: 'Discovery', fr: 'Découverte', es: 'Descubrimiento' }[lang];

    content = content.replace(
      /<span class=["']chapter["']>[\s\S]*?<\/span>/,
      `<span class="chapter">${discLabel} ${anim.number}</span>`
    );
    content = content.replace(
      /<span class=["']brand-kicker["']>[\s\S]*?<\/span>/,
      `<span class="brand-kicker">${anim.kicker[lang]}</span>`
    );

    // Kicker in 01.Megattere
    content = content.replace(
      /<span class=["']text-\[10px\][^"']*["']>[\s\S]*?<\/span>/,
      `<span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-300 border border-sky-300/30">${discLabel} 05</span>`
    );
    content = content.replace(
      /<span class=["']hidden md:inline-block text-xs text-sky-200\/80["']>[\s\S]*?<\/span>/,
      `<span class="hidden md:inline-block text-xs text-sky-200/80">${anim.kicker[lang]}</span>`
    );

    // Main Heading h1
    content = content.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${anim.mainTitle[lang]}</h1>`);

    // Back to Lab link in toolbar
    content = content.replace(
      /<a href="\.\.\/index\.html" class="tool"[^>]*>([\s\S]*?)<\/a>/,
      `<a href="../index.html" class="tool" style="color:#f7d184;font-weight:700" title="${data.common.back_lab3d_title[lang]}"><svg viewBox="0 0 24 24" style="width:18px;height:18px;vertical-align:middle"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${data.common.back_lab3d[lang]}</span></a>`
    );
    content = content.replace(
      /<a href="\.\.\/index\.html" class="glass-pill[^"]*"[^>]*>([\s\S]*?)<\/a>/,
      `<a href="../index.html" class="glass-pill px-3 py-2 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center gap-1.5 text-amber-200 hover:text-white" title="${data.common.back_lab3d_title[lang]}"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg><span class="hidden sm:inline">${data.common.back_lab3d[lang]}</span></a>`
    );

    // Home link in toolbar
    content = content.replace(
      /<a href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=[a-z]{2}&pagina=inizio" class="tool"[^>]*>[\s\S]*?<\/a>/,
      `<a href="../../../../?lang=${lang}&pagina=inizio" class="tool" style="color:#7dd3fc;font-weight:700" title="${data.common.btn_home_title[lang]}"><span>Home ✦</span></a>`
    );
    content = content.replace(
      /<a href="\.\.\/\.\.\/\.\.\/\.\.\/\?lang=[a-z]{2}&pagina=inizio" class="glass-pill[^"]*"[^>]*>[\s\S]*?<\/a>/,
      `<a href="../../../../?lang=${lang}&pagina=inizio" class="glass-pill px-3 py-2 rounded-xl font-display font-semibold text-xs sm:text-sm flex items-center gap-1.5 text-sky-200 hover:text-white" title="${data.common.btn_home_title[lang]}"><span>Home ✦</span></a>`
    );

    // Tour button (#btn-auto) in toolbar
    content = content.replace(
      /<button id="btn-auto" class="tool" aria-pressed="false"[^>]*>[\s\S]*?<\/button>/,
      `<button id="btn-auto" class="tool" aria-pressed="false" title="${data.common.btn_tour_title[lang]}"><svg><use href="#i-play"/></svg><span>${data.common.btn_tour[lang]}</span></button>`
    );

    // View angle button (#btn-view) in toolbar
    if (anim.viewBtn) {
      content = content.replace(
        /<button id="btn-view" class="tool"[^>]*>[\s\S]*?<\/button>/,
        `<button id="btn-view" class="tool" aria-pressed="false"><svg><use href="#i-cube"/></svg> ${anim.viewBtn[lang]}</button>`
      );
    }

    // Touch hint at bottom of canvas
    content = content.replace(
      /<span>Tocca e trascina per ruotare · Scorri per avvicinare<\/span>/g,
      `<span>${data.common.touch_hint[lang]}</span>`
    );
    content = content.replace(
      /<span>Click and drag to rotate · Scroll to zoom<\/span>/g,
      `<span>${data.common.touch_hint[lang]}</span>`
    );

    // Dialog close button aria-label
    content = content.replace(
      /aria-label="Chiudi"/g,
      `aria-label="${data.common.dialog_close[lang]}"`
    );

    // "Dal libro" button (#btn-info) in story card
    content = content.replace(
      /<button id="btn-info"[^>]*>[\s\S]*?<\/button>/,
      `<button id="btn-info" class="secondary book-button" aria-label="${data.common.btn_info_title[lang]}" title="${data.common.btn_info_title[lang]}"><svg><use href="#i-book"/></svg> ${data.common.btn_info[lang]}</button>`
    );

    // "← Indietro" button (#btn-back) in story card
    content = content.replace(
      /<button id="btn-back"[^>]*>[\s\S]*?<\/button>/,
      `<button id="btn-back" class="secondary" hidden>${data.common.btn_back[lang]}</button>`
    );

    // Pause badge
    content = content.replace(
      /<div id="pause-badge"[^>]*>[\s\S]*?<\/div>/,
      `<div id="pause-badge" class="pause-badge glass" hidden>${data.common.pause_badge[lang]}</div>`
    );

    // Stage note
    if (anim.stageNote) {
      content = content.replace(
        /<div id="stage-note"[^>]*>[\s\S]*?<\/div>/,
        `<div id="stage-note" class="stage-note">${anim.stageNote[lang]}</div>`
      );
    }

    // Step pills (<ol id="steps" ...>)
    if (anim.stepPills) {
      const pills = anim.stepPills[lang];
      const pillsHtml = `<ol id="steps" class="steps" aria-label="${data.common.progress_aria[lang]}">${pills.map((p, i) => i === 0 ? `<li class="current" aria-current="step">${p}</li>` : `<li>${p}</li>`).join('')}</ol>`;
      content = content.replace(/<ol id="steps"[^>]*>[\s\S]*?<\/ol>/, pillsHtml);
    }

    // Common toolbar controls translations
    const pauseLabels = { it: 'Metti in pausa', en: 'Pause', fr: 'Mettre en pause', es: 'Pausar' };
    const resumeLabels = { it: 'Riprendi', en: 'Resume', fr: 'Reprendre', es: 'Reanudar' };
    const audioOnLabels = { it: 'Attiva i suoni', en: 'Enable sound', fr: 'Activer le son', es: 'Activar sonido' };
    const audioOffLabels = { it: 'Disattiva i suoni', en: 'Mute sound', fr: 'Désactiver le son', es: 'Silenciar sonido' };
    const resetLabels = { it: 'Ricomincia dall’inizio', en: 'Restart from beginning', fr: 'Recommencer depuis le début', es: 'Reiniciar desde el principio' };
    const resetTitles = { it: 'Ricomincia l\'esperimento dall\'inizio', en: 'Restart experiment from beginning', fr: 'Recommencer l\'expérience depuis le début', es: 'Reiniciar el experimento desde el principio' };
    const retryLabels = { it: 'Riprova', en: 'Retry', fr: 'Réessayer', es: 'Reintentar' };
    const errTitles = { it: 'Impossibile caricare il modello 3D', en: 'Unable to load 3D model', fr: 'Impossible de charger le modèle 3D', es: 'No se pudo cargar el modelo 3D' };
    const homeLabels = { it: 'Torna all’inizio', en: 'Go to Home', fr: 'Retour à l\'accueil', es: 'Volver al inicio' };

    content = content.replace(/aria-label="Metti in pausa"/g, `aria-label="${pauseLabels[lang]}"`);
    content = content.replace(/aria-label="Torna all’inizio"/g, `aria-label="${homeLabels[lang]}"`);
    content = content.replace(/aria-label="Ricomincia dall’inizio"/g, `aria-label="${resetLabels[lang]}"`);
    content = content.replace(/title="Ricomincia l'esperimento dall'inizio"/g, `title="${resetTitles[lang]}"`);
    content = content.replace(/>Riprova<\/button>/g, `>${retryLabels[lang]}</button>`);
    content = content.replace(/>Impossibile caricare il modello 3D<\/h2>/g, `>${errTitles[lang]}</h2>`);

    content = content.replace(
      /aria-label="Attiva i suoni dell’oceano"/g,
      `aria-label="${lang === 'en' ? 'Enable ocean sound' : lang === 'fr' ? 'Activer le son de l’océan' : lang === 'es' ? 'Activar sonido del océano' : 'Attiva i suoni dell’oceano'}"`
    );
    content = content.replace(
      /aria-label="Attiva i suoni"/g,
      `aria-label="${audioOnLabels[lang]}"`
    );

    content = content.replace(
      /setAttribute\('aria-label',\s*paused\s*\?\s*'Riprendi'\s*:\s*'Metti in pausa'\)/g,
      `setAttribute('aria-label', paused ? '${resumeLabels[lang]}' : '${pauseLabels[lang]}')`
    );
    content = content.replace(
      /setAttribute\('aria-label',\s*v\s*\?\s*'Riprendi'\s*:\s*'Metti in pausa'\)/g,
      `setAttribute('aria-label', v ? '${resumeLabels[lang]}' : '${pauseLabels[lang]}')`
    );
    content = content.replace(
      /setAttribute\('aria-label',\s*on\s*\?\s*'Disattiva i suoni'\s*:\s*'Attiva i suoni'\)/g,
      `setAttribute('aria-label', on ? '${audioOffLabels[lang]}' : '${audioOnLabels[lang]}')`
    );
    content = content.replace(
      /setAttribute\('aria-label',\s*active\s*\?\s*'Disattiva i suoni dell’oceano'\s*:\s*'Attiva i suoni dell’oceano'\)/g,
      `setAttribute('aria-label', active ? '${lang === 'en' ? 'Mute ocean sound' : lang === 'fr' ? 'Désactiver le son de l’océan' : lang === 'es' ? 'Silenciar sonido del océano' : 'Disattiva i suoni dell’oceano'}' : '${lang === 'en' ? 'Enable ocean sound' : lang === 'fr' ? 'Activer le son de l’océan' : lang === 'es' ? 'Activar sonido del océano' : 'Attiva i suoni dell’oceano'}')`
    );

    // JAVASCRIPT setAuto & setView text replacements
    const inTourText = { it: 'In viaggio', en: 'Touring', fr: 'En parcours', es: 'En viaje' }[lang];
    const tourBtnText = data.common.btn_tour[lang];

    content = content.replace(
      /\.textContent=value\?'In viaggio':'Il viaggio';/g,
      `.textContent=value?'${inTourText}':'${tourBtnText}';`
    );
    content = content.replace(
      /\.textContent=v\?'In viaggio':'Il viaggio';/g,
      `.textContent=v?'${inTourText}':'${tourBtnText}';`
    );

    // View switcher in script
    if (dirKey === '02.Felce.DNA') {
      const vTop = { it: 'Dall’alto', en: 'Top view', fr: 'Vue du dessus', es: 'Vista cenital' }[lang];
      const vFront = { it: 'Frontale', en: 'Front view', fr: 'Vue de face', es: 'Vista frontal' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=S\.top\?'Frontale':'Dall’alto';/g,
        `$('view-name').textContent=S.top?'${vFront}':'${vTop}';`
      );
      content = content.replace(
        /'Il DNA della felce si srotola\. Guarda il righello\.'/g,
        `'${lang === 'en' ? 'The fern DNA unrolls. Watch the measuring scale.' : lang === 'fr' ? 'L’ADN de la fougère se déroule. Regarde la règle graduée.' : lang === 'es' ? 'El ADN del helecho se desenrolla. Observa la escala graduada.' : 'Il DNA della felce si srotola. Guarda il righello.'}'`
      );
    } else if (dirKey === '03.Pesce.Veicolo') {
      const vTop = { it: 'Dall’alto', en: 'Top view', fr: 'Vue du dessus', es: 'Vista cenital' }[lang];
      const vFront = { it: 'Frontale', en: 'Front view', fr: 'Vue de face', es: 'Vista frontal' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=top\?'Frontale':'Dall’alto';/g,
        `$('view-name').textContent=top?'${vFront}':'${vTop}';`
      );
      content = content.replace(
        /aria-label="Fai nuotare il pesce indietro"><b>↓<\/b><span>Indietro<\/span>/g,
        `aria-label="${lang === 'en' ? 'Make fish swim backward' : lang === 'fr' ? 'Faire nager le poisson vers l’arrière' : lang === 'es' ? 'Hacer nadar al pez hacia atrás' : 'Fai nuotare il pesce indietro'}"><b>↓</b><span>${lang === 'en' ? 'Backward' : lang === 'fr' ? 'Arrière' : lang === 'es' ? 'Atrás' : 'Indietro'}</span>`
      );
      content = content.replace(
        /'Nello studio, raggiungere la zona del bersaglio portava una <strong>piccola ricompensa<\/strong>\. Qui puoi provare la guida manuale!'/g,
        `'${lang === 'en' ? 'In the study, reaching the target area brought a <strong>small food reward</strong>. Here you can try manual driving!' : lang === 'fr' ? 'Dans l’étude, atteindre la zone cible donnait droit à une <strong>petite récompense</strong>. Ici, essaie le guidage manuel !' : lang === 'es' ? 'En el estudio, alcanzar la zona objetivo daba una <strong>pequeña recompensa</strong>. ¡Aquí puedes probar la conducción manual!' : 'Nello studio, raggiungere la zona del bersaglio portava una <strong>piccola ricompensa</strong>. Qui puoi provare la guida manuale!'}'`
      );
    } else if (dirKey === '04.Uccelli.Dinosauri') {
      const vSide = { it: 'Altro lato', en: 'Other side', fr: 'Autre vue', es: 'Otro lado' }[lang];
      const vFront = { it: 'Prima vista', en: 'Front view', fr: 'Vue de face', es: 'Vista frontal' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Prima vista':'Altro lato';/g,
        `$('view-name').textContent=v?'${vFront}':'${vSide}';`
      );
      content = content.replace(/aria-label="Osserva un indizio fossile"/g, `aria-label="${lang === 'en' ? 'Examine a fossil clue' : lang === 'fr' ? 'Examiner un indice fossile' : lang === 'es' ? 'Observar una pista fósil' : 'Osserva un indizio fossile'}"`);
      content = content.replace(
        /setAttribute\('aria-label',v\?'Torna alla prima vista':'Osserva da un’altra angolazione'\)/g,
        `setAttribute('aria-label',v?'${lang === 'en' ? 'Return to initial view' : lang === 'fr' ? 'Revenir à la première vue' : lang === 'es' ? 'Volver a la primera vista' : 'Torna alla prima vista'}':'${lang === 'en' ? 'Observe from another angle' : lang === 'fr' ? 'Observer sous un autre angle' : lang === 'es' ? 'Observar desde otro ángulo' : 'Osserva da un’altra angolazione'}')`
      );
    } else if (dirKey === '05.Fungo.Robot') {
      const vTop = { it: 'Dall’alto', en: 'Top view', fr: 'Vue du dessus', es: 'Vista cenital' }[lang];
      const vPersp = { it: 'Tre quarti', en: 'Perspective', fr: 'Perspective', es: 'Perspectiva' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=value\?'Tre quarti':'Dall’alto';/g,
        `$('view-name').textContent=value?'${vPersp}':'${vTop}';`
      );
      content = content.replace(/'Scegli una condizione e osserva il sistema'/g, `'${lang === 'en' ? 'Choose a condition and observe system' : lang === 'fr' ? 'Choisis une condition et observe le système' : lang === 'es' ? 'Elige una condición y observa el sistema' : 'Scegli una condizione e osserva il sistema'}'`);
      content = content.replace(/'Tocca i componenti per osservarli'/g, `'${lang === 'en' ? 'Tap components to examine them' : lang === 'fr' ? 'Touche les composants pour les observer' : lang === 'es' ? 'Toca los componentes para observarlos' : 'Tocca i componenti per osservarli'}'`);
      content = content.replace(/aria-label="Confronta le risposte del sistema"/g, `aria-label="${lang === 'en' ? 'Compare system responses' : lang === 'fr' ? 'Comparer les réponses du système' : lang === 'es' ? 'Comparar las respuestas del sistema' : 'Confronta le risposte del sistema'}"`);
      content = content.replace(/'Prova le due condizioni, poi scollega l’interfaccia e ripeti\.'/g, `'${lang === 'en' ? 'Test both conditions, then disconnect interface and repeat.' : lang === 'fr' ? 'Teste les deux conditions, puis déconnecte l’interface et recommence.' : lang === 'es' ? 'Prueba ambas condiciones, luego desconecta la interfaz y repite.' : 'Prova le due condizioni, poi scollega l’interfaccia e ripeti.'}'`);
      content = content.replace(
        /<details><summary>Come leggere questa animazione<\/summary><p>[\s\S]*?<\/p><\/details>/,
        lang === 'en' ? `<details><summary>How to read this animation</summary><p>These 3D models are illustrative and not exact technical replicas of the biohybrid prototypes. Components are stylized to explain the core scientific principle: living mycelium produces electrical impulses that can trigger robotic movement.</p></details>` :
        lang === 'fr' ? `<details><summary>Comment lire cette animation</summary><p>Ces modèles 3D sont illustratifs et ne constituent pas des répliques techniques exactes des prototypes biohybrides. Les éléments sont stylisés pour faire comprendre le principe scientifique fondamental : un tissu vivant produit des impulsions électriques exploitées par une machine.</p></details>` :
        lang === 'es' ? `<details><summary>Cómo interpretar esta animación</summary><p>Estos modelos 3D son ilustrativos y no copias exactas de los prototipos biohíbridos. Las partes se representan de forma simplificada para explicar el principio científico: un tejido vivo produce impulsos eléctricos aprovechados por una máquina.</p></details>` :
        `<details><summary>Come leggere questa animazione</summary><p>I modelli non sono copie esatte dei prototipi. Le parti vengono mostrate in modo semplificato per spiegare il principio scientifico: un tessuto vivente può generare impulsi usati da una macchina.</p></details>`
      );
    } else if (dirKey === '06.Ginocchio.Bionico') {
      const vSide = { it: 'Di lato', en: 'Side view', fr: 'Vue de profil', es: 'Vista lateral' }[lang];
      const vPersp = { it: 'Tre quarti', en: 'Perspective', fr: 'Perspective', es: 'Perspectiva' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Tre quarti':'Di lato';/g,
        `$('view-name').textContent=v?'${vPersp}':'${vSide}';`
      );
      content = content.replace(/aria-label="Osserva il lavoro della coppia muscolare"/g, `aria-label="${lang === 'en' ? 'Observe the muscle pair working' : lang === 'fr' ? 'Observer le travail du couple musculaire' : lang === 'es' ? 'Observar el trabajo del par de músculos' : 'Osserva il lavoro della coppia muscolare'}"`);
      content = content.replace(
        /setAttribute\('aria-label',v\?'Torna alla vista frontale':'Osserva di lato'\)/g,
        `setAttribute('aria-label',v?'${lang === 'en' ? 'Return to front view' : lang === 'fr' ? 'Retour à la vue frontale' : lang === 'es' ? 'Volver a vista frontal' : 'Torna alla vista frontale'}':'${lang === 'en' ? 'Observe side view' : lang === 'fr' ? 'Vue de profil' : lang === 'es' ? 'Vista lateral' : 'Osserva di lato'}')`
      );
    } else if (dirKey === '07.Buco.Nero') {
      const vOther = { it: 'Altra vista', en: 'Other view', fr: 'Autre vue', es: 'Otra vista' }[lang];
      const vFirst = { it: 'Prima vista', en: 'First view', fr: 'Première vue', es: 'Primera vista' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Prima vista':'Altra vista';/g,
        `$('view-name').textContent=v?'${vFirst}':'${vOther}';`
      );
      content = content.replace(
        /setAttribute\('aria-label',v\?'Torna alla prima vista':'Osserva da un’altra angolazione'\)/g,
        `setAttribute('aria-label',v?'${lang === 'en' ? 'Return to primary view' : lang === 'fr' ? 'Revenir à la première vue' : lang === 'es' ? 'Volver a la primera vista' : 'Torna alla prima vista'}':'${lang === 'en' ? 'Observe from another angle' : lang === 'fr' ? 'Observer sous un autre angle' : lang === 'es' ? 'Observar desde otro ángulo' : 'Osserva da un’altra angolazione'}')`
      );

      // Replace section 159 in 07.Buco.Nero
      const expHead = { it: 'UN ESPERIMENTO SU UN MODELLO', en: 'A SYNTHETIC MODEL EXPERIMENT', fr: 'UNE EXPÉRIENCE SUR UN MODÈLE', es: 'UN EXPERIMENTO CON UN MODELO' }[lang];
      const expSample = { it: 'Scegli quante misure confrontare', en: 'Choose how many measurements to compare', fr: 'Choisis combien de mesures comparer', es: 'Elige cuántas mediciones comparar' }[lang];
      const expInfo = { it: 'Informazioni raccolte', en: 'Collected information', fr: 'Informations recueillies', es: 'Información recopilada' }[lang];
      const expRecon = { it: 'Ricostruzione semplice', en: 'Simple reconstruction', fr: 'Reconstitution simple', es: 'Reconstrucción simple' }[lang];
      const expNote = { it: 'Anello fittizio e campioni illustrativi · non sono dati EHT', en: 'Synthetic ring and illustrative samples · not raw EHT data', fr: 'Anneau fictif et échantillons illustratifs · ne sont pas les données réelles de l’EHT', es: 'Anillo ficticio y muestras ilustrativas · no son datos directos del EHT' }[lang];
      const expSteps = {
        it: '<span>Registra</span><b>→</b><span>Sincronizza</span><b>→</b><span>Combina e verifica</span>',
        en: '<span>Record</span><b>→</b><span>Synchronize</span><b>→</b><span>Combine & verify</span>',
        fr: '<span>Enregistrer</span><b>→</b><span>Synchroniser</span><b>→</b><span>Combiner et vérifier</span>',
        es: '<span>Registrar</span><b>→</b><span>Sincronizar</span><b>→</b><span>Combinar y verificar</span>'
      }[lang];

      content = content.replace(/<span>UN ESPERIMENTO SU UN MODELLO<\/span>/g, `<span>${expHead}</span>`);
      content = content.replace(/<b id="sample-name">Scegli quante misure confrontare<\/b>/g, `<b id="sample-name">${expSample}</b>`);
      content = content.replace(/<figcaption>Informazioni raccolte<\/figcaption>/g, `<figcaption>${expInfo}</figcaption>`);
      content = content.replace(/<figcaption>Ricostruzione semplice<\/figcaption>/g, `<figcaption>${expRecon}</figcaption>`);
      content = content.replace(/<p>Anello fittizio e campioni illustrativi · non sono dati EHT<\/p>/g, `<p>${expNote}</p>`);
      content = content.replace(/<div class="data-steps"><span>Registra<\/span><b>→<\/b><span>Sincronizza<\/span><b>→<\/b><span>Combina e verifica<\/span><\/div>/g, `<div class="data-steps">${expSteps}</div>`);

      // Script strings in 07.Buco.Nero
      const fewName = { it: 'Pochi campioni · informazioni mancanti', en: 'Few samples · missing information', fr: 'Peu d’échantillons · informations manquantes', es: 'Pocas muestras · información incompleta' }[lang];
      const manyName = { it: 'Più campioni · più vincoli', en: 'More samples · stronger constraints', fr: 'Davantage d’échantillons · plus de contraintes', es: 'Más muestras · mayores restricciones' }[lang];
      const fewTitle = { it: 'Con poche misure manca molta informazione.', en: 'With few measurements, crucial information is missing.', fr: 'Avec peu de mesures, de nombreuses informations manquent.', es: 'Con pocas mediciones falta mucha información.' }[lang];
      const manyTitle = { it: 'Più misure aiutano a vincolare la ricostruzione.', en: 'More measurements constrain the reconstruction.', fr: 'Plus de mesures contraignent la reconstitution.', es: 'Más mediciones ayudan a delimitar la reconstrucción.' }[lang];
      const fewText = {
        it: 'Il modello conserva soltanto alcuni campioni. Le strutture spurie mostrano perché <strong>ricostruire non è semplicemente scattare</strong>.',
        en: 'The model keeps only a few samples. Spurious artifacts illustrate why <strong>reconstructing is not just taking a photo</strong>.',
        fr: 'Le modèle ne conserve que quelques échantillons. Les artefacts montrent pourquoi <strong>reconstituer n’est pas simplement photographier</strong>.',
        es: 'El modelo solo conserva algunas muestras. Los artefactos muestran por qué <strong>reconstruir no es simplemente tomar una foto</strong>.'
      }[lang];
      const manyText = {
        it: 'Nel modello l’anello risulta più riconoscibile. Per l’immagine reale servirono anche <strong>calibrazione, algoritmi e controlli indipendenti</strong>.',
        en: 'In the model, the ring becomes clearer. For the real image, <strong>calibration, algorithms, and independent checks</strong> were essential.',
        fr: 'Dans le modèle, l’anneau devient plus net. Pour l’image réelle, <strong>l’étalonnage, les algorithmes et les vérifications indépendantes</strong> ont été indispensables.',
        es: 'En el modelo, el anillo se vuelve más reconocible. Para la imagen real hicieron falta <strong>calibración, algoritmos y comprobaciones independientes</strong>.'
      }[lang];
      const autoTourMsg = {
        it: 'Viaggio automatico avviato. Puoi metterlo in pausa.',
        en: 'Automatic tour started. You can pause it anytime.',
        fr: 'Visite automatique lancée. Tu peux la mettre en pause.',
        es: 'Recorrido automático iniciado. Puedes pausarlo cuando quieras.'
      }[lang];

      content = content.replace(/'Pochi campioni · informazioni mancanti':'Più campioni · più vincoli'/g, `'${fewName}':'${manyName}'`);
      content = content.replace(/'Con poche misure manca molta informazione\.':'Più misure aiutano a vincolare la ricostruzione\.'/g, `'${fewTitle}':'${manyTitle}'`);
      content = content.replace(
        /'Il modello conserva soltanto alcuni campioni[\s\S]*?':'Nel modello l’anello risulta più riconoscibile[\s\S]*?'/,
        `'${fewText}':'${manyText}'`
      );
      content = content.replace(/'Viaggio automatico avviato\. Puoi metterlo in pausa\.'/g, `'${autoTourMsg}'`);
    }

    // SPECIFIC 01.Megattere
    if (dirKey === '01.Megattere') {
      content = content.replace(
        /11\. CONTROLLO DELLA TELECAMERA E CAMBIO DI PROSPETTIVA \(Dall'alto \/ Di lato\)/g,
        '11. CAMERA AND PERSPECTIVE CONTROLS'
      );
      content = content.replace(/>Tocca il banco di pesci!<\/span>/g, `>${anim.scriptTexts.tapFish[lang]}</span>`);
      content = content.replace(/>Esplora<\/span>/g, `>${anim.viewButtons.explore[lang]}</span>`);
      content = content.replace(/>Prova tu<\/span>/g, `>${anim.viewButtons.try[lang]}</span>`);
      content = content.replace(/>Dall’alto<\/span>/g, `>${anim.viewButtons.top[lang]}</span>`);
      content = content.replace(/>Di lato<\/span>/g, `>${anim.viewButtons.side[lang]}</span>`);
      content = content.replace(/>Sonoro<\/span>/g, `>${anim.viewButtons.audio[lang]}</span>`);
      content = content.replace(/>Ricomincia<\/span>/g, `>${anim.viewButtons.reset[lang]}</span>`);

      content = content.replace(/>1 · Inizia il giro<\/button>/g, `>${anim.stepsButtons.s1[lang]}</button>`);
      content = content.replace(/>2 · Aggiungi bolle<\/button>/g, `>${anim.stepsButtons.s2[lang]}</button>`);
      content = content.replace(/>3 · Chiudi il cerchio<\/button>/g, `>${anim.stepsButtons.s3[lang]}</button>`);
      content = content.replace(/>Prova tu!<\/button>/g, `>${anim.viewButtons.try[lang]}!</button>`);
      content = content.replace(/>Ridisegna<\/button>/g, `>${anim.stepsButtons.retry[lang]}</button>`);
      content = content.replace(/>Dal Libro<\/button>/g, `>${data.common.btn_info[lang]}</button>`);
      content = content.replace(/>Dal Libro<\/span>/g, `>${data.common.btn_info[lang]}</span>`);
      content = content.replace(/>Tuffati nell'esperimento!<\/button>/g, `>${anim.stepsButtons.dive[lang]}</button>`);

      content = content.replace(
        /title="Leggi le scoperte scientifiche del libro"/g,
        `title="${lang === 'en' ? 'Read scientific discoveries from the book' : lang === 'fr' ? 'Découvrir les observations scientifiques du livre' : lang === 'es' ? 'Leer los descubrimientos científicos del libro' : 'Leggi le scoperte scientifiche del libro'}"`
      );
      content = content.replace(
        /aria-label="Chiudi le curiosità scientifiche"/g,
        `aria-label="${lang === 'en' ? 'Close scientific insights' : lang === 'fr' ? 'Fermer les curiosités scientifiques' : lang === 'es' ? 'Cerrar las curiosidades científicas' : 'Chiudi le curiosità scientifiche'}"`
      );

      // Sidebar info
      content = content.replace(
        /<h2 class="text-sm font-bold text-white uppercase tracking-wider">[\s\S]*?<\/h2>/,
        `<h2 class="text-sm font-bold text-white uppercase tracking-wider">${anim.infoSidebar.title[lang]}</h2>`
      );
      content = content.replace(
        /<h3>Una rete d'aria costruita su misura!<\/h3>[\s\S]*?<p>[\s\S]*?<\/p>/,
        `<h3>${anim.infoSidebar.q1.h3[lang]}</h3>\n                <p>${anim.infoSidebar.q1.p[lang]}</p>`
      );
      content = content.replace(
        /<h3>Non è un muro solido!<\/h3>[\s\S]*?<p>[\s\S]*?<\/p>/,
        `<h3>${anim.infoSidebar.q2.h3[lang]}</h3>\n                <p>${anim.infoSidebar.q2.p[lang]}</p>`
      );
      content = content.replace(
        /<h3>Da sole o in gruppo\?<\/h3>[\s\S]*?<p>[\s\S]*?<\/p>/,
        `<h3>${anim.infoSidebar.q3.h3[lang]}</h3>\n                <p>${anim.infoSidebar.q3.p[lang]}</p>`
      );
      content = content.replace(
        /<h3>Cosa e quanto mangiano le megattere\?<\/h3>[\s\S]*?<p>[\s\S]*?<\/p>/,
        `<h3>${anim.infoSidebar.q4.h3[lang]}</h3>\n                <p>${anim.infoSidebar.q4.p[lang]}</p>`
      );

      // Script DOM strings in 01.Megattere
      content = content.replace(/'Pranzo individuato!'/g, `'${anim.scriptTexts.lunchFound[lang]}'`);
      content = content.replace(/'2 • Costruisci la rete di bolle'/g, `'2 • ${anim.scriptTexts.buildNet[lang]}'`);
      content = content.replace(/'3 • Una rete d’aria!'/g, `'3 • ${anim.scriptTexts.airNet[lang]}'`);
      content = content.replace(/'3 • Una rete ancora aperta'/g, `'3 • ${anim.scriptTexts.openNet[lang]}'`);
      content = content.replace(/'Interazione 4 • La risalita della megattera'/g, `'4 • ${anim.scriptTexts.whaleAscent[lang]}'`);
      content = content.replace(/'Esperimento completato!'/g, `'${anim.scriptTexts.expCompleted[lang]}'`);
      content = content.replace(/'Guarda la risalita'/g, `'${anim.stepsButtons.ascent[lang]}'`);
      content = content.replace(/'Riprova la rete'/g, `'${anim.stepsButtons.retry[lang]}'`);

      // Localize netLabels array in script
      const netLabelsArr = {
        it: `['1 · Inizia il giro', '2 · Aggiungi bolle', '3 · Chiudi il cerchio']`,
        en: `['1 · Start spiral', '2 · Add bubbles', '3 · Close circle']`,
        fr: `['1 · Commencer la spirale', '2 · Ajouter des bulles', '3 · Fermer le cercle']`,
        es: `['1 · Iniciar espiral', '2 · Añadir burbujas', '3 · Cerrar círculo']`
      }[lang];
      content = content.replace(/const\s+netLabels\s*=\s*\['1 · Inizia il giro',\s*'2 · Aggiungi bolle',\s*'3 · Chiudi il cerchio'\];/, `const netLabels = ${netLabelsArr};`);

      // Script status messages in 01
      const sPause = { it: 'In pausa. Tocca Riprendi per continuare.', en: 'Paused. Tap Resume to continue.', fr: 'En pause. Touche Reprendre pour continuer.', es: 'En pausa. Toca Reanudar para continuar.' }[lang];
      const sClosed = { it: '3 di 3 · Rete chiusa! I pesci si radunano al centro.', en: '3 of 3 · Net closed! Fish gather in the center.', fr: '3 sur 3 · Filet fermé ! Les poissons se rassemblent au centre.', es: '3 de 3 · ¡Red cerrada! Los peces se concentran en el centro.' }[lang];
      const sOpen = { it: 'Rete aperta: alcuni pesci escono dal varco.', en: 'Open net: some fish escape through the gap.', fr: 'Filet ouvert : quelques poissons s’échappent par l’ouverture.', es: 'Red abierta: algunos peces escapan por el hueco.' }[lang];
      const sDone = { it: `${i => i + 1} · Fatto ✓`, en: `${i => i + 1} · Done ✓`, fr: `${i => i + 1} · Fait ✓`, es: `${i => i + 1} · Hecho ✓` };

      content = content.replace(/'In pausa\. Tocca Riprendi per continuare\.'/g, `'${sPause}'`);
      content = content.replace(/'3 di 3 · Rete chiusa! I pesci si radunano al centro\.'/g, `'${sClosed}'`);
      content = content.replace(/'Rete aperta: alcuni pesci escono dal varco\.'/g, `'${sOpen}'`);
      content = content.replace(/`Bolle in arrivo · tratto \$\{SimState\.completedSegments \+ 1\} di 3`/g, `\`${lang === 'en' ? 'Bubbles rising · segment ${SimState.completedSegments + 1} of 3' : lang === 'fr' ? 'Bulles en route · tronçon ${SimState.completedSegments + 1} sur 3' : lang === 'es' ? 'Burbujas llegando · tramo ${SimState.completedSegments + 1} de 3' : 'Bolle in arrivo · tratto ${SimState.completedSegments + 1} di 3'}\``);
      content = content.replace(/`\$\{i \+ 1\} · Fatto ✓`/g, `\`\${i + 1} · ${lang === 'en' ? 'Done ✓' : lang === 'fr' ? 'Fait ✓' : lang === 'es' ? 'Hecho ✓' : 'Fatto ✓'}\``);
      content = content.replace(/`Tratto \$\{i \+ 1\} completato`/g, `\`${lang === 'en' ? 'Segment ${i + 1} completed' : lang === 'fr' ? 'Tronçon ${i + 1} validé' : lang === 'es' ? 'Tramo ${i + 1} completado' : 'Tratto ${i + 1} completato'}\``);

      // Script storyText messages in 01
      const st0 = {
        it: 'Le megattere hanno trovato dei pesci. <strong class="text-amber-300">Tocca il banco</strong> per scoprire come li radunano!',
        en: 'The humpback whales located fish. <strong class="text-amber-300">Tap the school</strong> to see how they gather them!',
        fr: 'Les baleines à bosse ont repéré des poissons. <strong class="text-amber-300">Touche le banc</strong> pour découvrir comment elles les rassemblent !',
        es: 'Las ballenas jorobadas localizaron peces. <strong class="text-amber-300">¡Toca el banco</strong> para descubrir cómo los reúnen!'
      }[lang];
      const st1 = {
        it: '<strong>"Le megattere hanno trovato il loro pranzo! Ma come faranno a catturare tanti pesci insieme?"</strong>',
        en: '<strong>"The humpbacks found their lunch! But how will they catch so many fish together?"</strong>',
        fr: '<strong>"Les baleines à bosse ont trouvé leur déjeuner ! Mais comment vont-elles capturer autant de poissons à la fois ?"</strong>',
        es: '<strong>"¡Las ballenas jorobadas encontraron su comida! ¿Pero cómo atraparán tantos peces juntos?"</strong>'
      }[lang];
      const st2 = {
        it: 'Tocca i <strong class="text-amber-300">tre pulsanti in ordine</strong>: la megattera crea un cerchio di bolle.',
        en: 'Tap the <strong class="text-amber-300">three buttons in sequence</strong>: the whale creates a circle of bubbles.',
        fr: 'Touche les <strong class="text-amber-300">trois boutons dans l’ordre</strong> : la baleine crée un cercle de bulles.',
        es: 'Toca los <strong class="text-amber-300">tres botones en orden</strong>: la ballena crea un círculo de burbujas.'
      }[lang];
      const st3Good = {
        it: 'Le bolle disorientano i pesci e li fanno <strong class="text-emerald-300">radunare al centro</strong>.',
        en: 'The bubbles confuse the fish and cause them to <strong class="text-emerald-300">gather in the center</strong>.',
        fr: 'Les bulles désorientent les poissons et les forcent à <strong class="text-emerald-300">se rassembler au centre</strong>.',
        es: 'Las burbujas desorientan a los peces y los hacen <strong class="text-emerald-300">reunirse en el centro</strong>.'
      }[lang];
      const st3Open = {
        it: 'La rete ha un <strong class="text-amber-300">varco</strong>: guarda come alcuni pesci escono dall’apertura!',
        en: 'The net has a <strong class="text-amber-300">gap</strong>: look how some fish escape through the opening!',
        fr: 'Le filet comporte une <strong class="text-amber-300">brèche</strong> : regarde comment certains poissons s’échappent par l’ouverture !',
        es: 'La red tiene un <strong class="text-amber-300">hueco</strong>: ¡mira cómo escapan algunos peces por la abertura!'
      }[lang];
      const st4 = {
        it: 'Guarda dalle profondità! La megattera risale attraverso la colonna di bolle <strong class="text-amber-300">spalancando la bocca e gonfiando le pieghe ventrali</strong>!',
        en: 'Look from the deep! The humpback whale rises through the bubble column <strong class="text-amber-300">opening wide its jaws and expanding its ventral pleats</strong>!',
        fr: 'Regarde depuis les profondeurs ! La baleine remonte à travers la colonne de bulles <strong class="text-amber-300">en ouvrant grand la gueule et en déployant ses sillons ventraux</strong> !',
        es: '¡Mira desde las profundidades! La ballena sube a través de la columna de burbujas <strong class="text-amber-300">abriendo su enorme boca y extendiendo sus pliegues ventrales</strong>!'
      }[lang];
      const st5 = {
        it: 'Le bolle radunano i pesci. Poi le megattere <strong class="text-amber-300">risalgono con la bocca aperta</strong> e catturano molte prede insieme!',
        en: 'Bubbles corral the fish. Then humpback whales <strong class="text-amber-300">lunge upward with open mouths</strong> and catch many prey together!',
        fr: 'Les bulles rassemblent les poissons. Puis les baleines <strong class="text-amber-300">remontent la gueule grande ouverte</strong> et capturent de nombreuses proies ensemble !',
        es: 'Las burbujas reúnen a los peces. Luego las ballenas <strong class="text-amber-300">suben con la boca abierta</strong> y capturan muchas presas juntas.'
      }[lang];

      content = content.replace(/'Le megattere hanno trovato dei pesci\. <strong class="text-amber-300">Tocca il banco<\/strong> per scoprire come li radunano!'/g, `'${st0}'`);
      content = content.replace(/'<strong>"Le megattere hanno trovato il loro pranzo! Ma come faranno a catturare tanti pesci insieme\?"<\/strong>'/g, `'${st1}'`);
      content = content.replace(/'Tocca i <strong class="text-amber-300">tre pulsanti in ordine<\/strong>: la megattera crea un cerchio di bolle\.'/g, `'${st2}'`);
      content = content.replace(/'Le bolle disorientano i pesci e li fanno <strong class="text-emerald-300">radunare al centro<\/strong>\.'/g, `'${st3Good}'`);
      content = content.replace(/'La rete ha un <strong class="text-amber-300">varco<\/strong>: guarda come alcuni pesci escono dall’apertura!'/g, `'${st3Open}'`);
      content = content.replace(/'Guarda dalle profondità! La megattera risale attraverso la colonna di bolle <strong class="text-amber-300">spalancando la bocca e gonfiando le pieghe ventrali<\/strong>!'/g, `'${st4}'`);
      content = content.replace(/'Le bolle radunano i pesci\. Poi le megattere <strong class="text-amber-300">risalgono con la bocca aperta<\/strong> e catturano molte prede insieme!'/g, `'${st5}'`);

      const bMain0 = { it: 'Scopri il banco', en: 'Inspect the school', fr: 'Observer le banc', es: 'Examinar el banco' }[lang];
      const bMain1 = { it: 'Prova tu', en: 'Try it yourself', fr: 'À toi d’essayer', es: 'Pruébalo tú' }[lang];
      const bMain2 = { it: 'Osserva la rete aperta', en: 'Observe open net', fr: 'Observer le filet ouvert', es: 'Observar la red abierta' }[lang];
      const bMain3 = { it: 'Guarda la risalita', en: 'Watch the ascent', fr: 'Regarder la remontée', es: 'Ver el ascenso' }[lang];
      const bMain5 = { it: 'Riprova!', en: 'Try again!', fr: 'Recommencer !', es: '¡Intentar de nuevo!' }[lang];

      content = content.replace(/btnMainActionText\.textContent = 'Scopri il banco';/g, `btnMainActionText.textContent = '${bMain0}';`);
      content = content.replace(/btnMainActionText\.textContent = 'Prova tu';/g, `btnMainActionText.textContent = '${bMain1}';`);
      content = content.replace(/btnMainActionText\.textContent = 'Osserva la rete aperta';/g, `btnMainActionText.textContent = '${bMain2}';`);
      content = content.replace(/btnMainActionText\.textContent = 'Guarda la risalita';/g, `btnMainActionText.textContent = '${bMain3}';`);
      content = content.replace(/btnMainActionText\.textContent = 'Riprova!';/g, `btnMainActionText.textContent = '${bMain5}';`);
    } else {
      // 02..07: DIALOG REPLACEMENT
      if (anim.dialog) {
        content = content.replace(
          /<span class=["']eyebrow["']>[\s\S]*?<\/span>/,
          `<span class="eyebrow">${anim.dialog.eyebrow[lang]}</span>`
        );
        content = content.replace(
          /<h2 id=["']info-title["']>[\s\S]*?<\/h2>/,
          `<h2 id="info-title">${anim.dialog.title[lang]}</h2>`
        );
        const factVal = lang === 'en' ? anim.dialog.fact.val_en :
                        lang === 'fr' ? anim.dialog.fact.val_fr :
                        lang === 'es' ? anim.dialog.fact.val_es : anim.dialog.fact.val;
        content = content.replace(
          /<div class=["']fact-highlight["']>[\s\S]*?<\/div>/,
          `<div class="fact-highlight"><strong>${factVal}</strong><span>${anim.dialog.fact.sub[lang]}</span></div>`
        );

        if (anim.dialog.sections) {
          anim.dialog.sections.forEach(sec => {
            const itH3 = sec.h3.it;
            const targetH3 = sec.h3[lang];
            const targetP = sec.p[lang];
            const secRegex = new RegExp(`<h3>${itH3.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/h3>[\\s\\S]*?<p>[\\s\\S]*?<\\/p>`);
            content = content.replace(secRegex, `<h3>${targetH3}</h3><p>${targetP}</p>`);
          });
        }

        content = content.replace(
          /<h3>Fonti della scoperta<\/h3>/g,
          `<h3>${data.common.sources_heading[lang]}</h3>`
        );

        content = content.replace(
          /<button id=["']btn-close-bottom["'] class=["']primary["']>[\s\S]*?<\/button>/,
          `<button id="btn-close-bottom" class="primary">${anim.dialog.btnReturn[lang]} <svg><use href="#i-arrow"/></svg></button>`
        );
      }

      // SCRIPT DATA REPLACEMENT
      if (anim.steps) {
        const localizedSteps = anim.steps.map(s => {
          const item = {
            name: s.name[lang],
            title: s.title[lang],
            text: s.text[lang],
            next: s.next[lang],
            caption: s.caption[lang],
            label: s.label[lang]
          };
          if (s.sub) item.sub = s.sub[lang];
          if (s.note) item.note = s.note[lang];
          return item;
        });

        // Initial Step 1 DOM elements
        const s1 = localizedSteps[0];
        content = content.replace(/<span[^>]*id=["']step-name["'][^>]*>[\s\S]*?<\/span>/, `<span id="step-name">${s1.name}</span>`);
        content = content.replace(/<h2[^>]*id=["']story-title["'][^>]*>[\s\S]*?<\/h2>/, `<h2 id="story-title" tabindex="-1">${s1.title}</h2>`);
        content = content.replace(/<p[^>]*id=["']story-text["'][^>]*>[\s\S]*?<\/p>/, `<p id="story-text">${s1.text}</p>`);
        content = content.replace(/<span[^>]*id=["']next-text["'][^>]*>[\s\S]*?<\/span>/, `<span id="next-text">${s1.next}</span>`);
        content = content.replace(/<span[^>]*id=["']scene-caption["'][^>]*>[\s\S]*?<\/span>/, `<span id="scene-caption">${s1.caption}</span>`);
        content = content.replace(/<div[^>]*id=["']scene-label["'][^>]*>[\s\S]*?<\/div>/, `<div id="scene-label" class="scene-label">${s1.label}</div>`);
        if (s1.sub) {
          content = content.replace(/<div[^>]*id=["']scene-sub["'][^>]*>[\s\S]*?<\/div>/, `<div id="scene-sub" class="scene-sub">${s1.sub}</div>`);
        }
        if (s1.note) {
          content = content.replace(/<div[^>]*id=["']scene-note["'][^>]*>[\s\S]*?<\/div>/, `<div id="scene-note" class="scene-note">${s1.note}</div>`);
        }

        // Specific per-animation replacements
        if (dirKey === '02.Felce.DNA') {
          const regexPhase = /const\s+phaseData\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexPhase, `const phaseData = ${JSON.stringify(localizedSteps, null, 2)};`);

          // Interim DNA text in script
          const unrollTxt = { it: 'Il DNA si srotola…', en: 'Unrolling DNA…', fr: 'Déroulement de l’ADN…', es: 'Desenrollando el ADN…' }[lang];
          const finalSurprise = { it: 'La sorpresa finale', en: 'The final surprise', fr: 'La surprise finale', es: 'La surprise final' }[lang];
          const unrollFern = { it: 'Srotola quello della felce', en: 'Unroll the fern’s DNA', fr: 'Déroule celui de la fougère', es: 'Desenrolla el del helecho' }[lang];
          content = content.replace(/'Il DNA si srotola…'/g, `'${unrollTxt}'`);
          content = content.replace(/'La sorpresa finale'/g, `'${finalSurprise}'`);
          content = content.replace(/'Srotola quello della felce'/g, `'${unrollFern}'`);

          const over100m = { it: 'Oltre 100 metri in una cellula!', en: 'Over 100 meters in a single cell!', fr: 'Plus de 100 mètres dans une seule cellule !', es: '¡Más de 100 metros en una sola célula!' }[lang];
          const howFar = { it: 'Guarda quanto continua…', en: 'See how far it goes…', fr: 'Regarde comme il s’étire…', es: 'Mira cuánto se extiende…' }[lang];
          content = content.replace(/'Oltre 100 metri in una cellula!'/g, `'${over100m}'`);
          content = content.replace(/'Guarda quanto continua…'/g, `'${howFar}'`);

          const ratioNote = {
            it: 'Oltre 50 volte più DNA · confronto alla stessa scala',
            en: 'Over 50 times more DNA · same-scale comparison',
            fr: 'Plus de 50 fois plus d’ADN · comparaison à la même échelle',
            es: 'Más de 50 veces más ADN · comparación a la misma escala'
          }[lang];
          content = content.replace(/'Oltre 50 volte più DNA · confronto alla stessa scala'/g, `'${ratioNote}'`);

          content = content.replace(/>È più intelligente<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Contiene più DNA<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);
          content = content.replace(/>È una pianta più grande<\/button>/g, `>${anim.quiz.opt3[lang]}</button>`);

          content = content.replace(
            /'Esatto! È un record di quantità di DNA[\s\S]*?'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'Stiamo confrontando la quantità di DNA[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        } else if (dirKey === '03.Pesce.Veicolo') {
          const regexDesc = /const\s+descriptions\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexDesc, `const descriptions = ${JSON.stringify(localizedSteps, null, 2)};`);

          content = content.replace(/>1 · Il pesce nuota<\/button>/g, `>${anim.interactiveButtons.step1[lang]}</button>`);
          content = content.replace(/>2 · La telecamera osserva<\/button>/g, `>${anim.interactiveButtons.step2[lang]}</button>`);
          content = content.replace(/>3 · Il sistema muove le ruote<\/button>/g, `>${anim.interactiveButtons.step3[lang]}</button>`);
          content = content.replace(/>Parti da sinistra<\/button>/g, `>${anim.interactiveButtons.startLeft[lang]}</button>`);
          content = content.replace(/>Parti da destra<\/button>/g, `>${anim.interactiveButtons.startRight[lang]}</button>`);

          content = content.replace(/>Tempo e bersagli raggiunti in più prove<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Il numero di ruote del veicolo<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);

          content = content.replace(
            /'Esatto! Più prove permettono di capire se le prestazioni migliorano nel tempo\.'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'Il numero di ruote descrive il veicolo[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        } else if (dirKey === '04.Uccelli.Dinosauri') {
          const regexPages = /const\s+pages\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexPages, `const pages = ${JSON.stringify(localizedSteps, null, 2)};`);

          content = content.replace(/>1 · Le piume<\/button>/g, `>${anim.interactiveButtons.clue1[lang]}</button>`);
          content = content.replace(/>2 · La furcula<\/button>/g, `>${anim.interactiveButtons.clue2[lang]}</button>`);
          content = content.replace(/>3 · Braccia e ali<\/button>/g, `>${anim.interactiveButtons.clue3[lang]}</button>`);
          content = content.replace(/>1 · Illumina l’osso<\/button>/g, `>${anim.interactiveButtons.fossil1[lang]}</button>`);
          content = content.replace(/>2 · Collega le piume<\/button>/g, `>${anim.interactiveButtons.fossil2[lang]}</button>`);
          content = content.replace(/>1 · Antenati comuni<\/button>/g, `>${anim.interactiveButtons.tree1[lang]}</button>`);
          content = content.replace(/>2 · Rami diversi<\/button>/g, `>${anim.interactiveButtons.tree2[lang]}</button>`);
          content = content.replace(/>3 · Il ramo degli uccelli<\/button>/g, `>${anim.interactiveButtons.tree3[lang]}</button>`);

          content = content.replace(/>Un dinosauro aviano<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Un discendente del T\. rex<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);

          content = content.replace(
            /'Esatto! Gli uccelli sono dinosauri teropodi viventi[\s\S]*?'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'Il T\. rex appartiene a un altro ramo dei teropodi[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        } else if (dirKey === '05.Fungo.Robot') {
          const regexPages = /const\s+pages\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexPages, `const pages = ${JSON.stringify(localizedSteps, null, 2)};`);

          content = content.replace(/>1 · Il micelio<\/button>/g, `>${anim.interactiveButtons.part1[lang]}</button>`);
          content = content.replace(/>2 · Gli elettrodi<\/button>/g, `>${anim.interactiveButtons.part2[lang]}</button>`);
          content = content.replace(/>3 · L’interfaccia<\/button>/g, `>${anim.interactiveButtons.part3[lang]}</button>`);
          content = content.replace(/>Segui un impulso →<\/button>/g, `>${anim.interactiveButtons.traceBtn[lang]}</button>`);
          content = content.replace(/>Attività spontanea<\/button>/g, `>${anim.interactiveButtons.btnNatural[lang]}</button>`);
          content = content.replace(/>Stimolo UV<\/button>/g, `>${anim.interactiveButtons.btnUv[lang]}</button>`);
          content = content.replace(/>Interfaccia collegata<\/button>/g, `>${anim.interactiveButtons.btnInterface[lang]}</button>`);

          content = content.replace(/>L’interfaccia elettronica<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Gli elettrodi, da soli<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);

          content = content.replace(
            /'Esatto! È l’interfaccia elettronica a trasformare i deboli segnali biologici[\s\S]*?'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'Gli elettrodi captano solo il segnale[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        } else if (dirKey === '06.Ginocchio.Bionico') {
          const regexPages = /const\s+pages\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexPages, `const pages = ${JSON.stringify(localizedSteps, null, 2)};`);

          if (anim.signalChain) {
            content = content.replace(/<span id="signal-muscle">[\s\S]*?<\/span>/, `<span id="signal-muscle">${anim.signalChain.muscle[lang]}</span>`);
            content = content.replace(/<span id="signal-read">[\s\S]*?<\/span>/, `<span id="signal-read">${anim.signalChain.sensors[lang]}</span>`);
            content = content.replace(/<span id="signal-control">[\s\S]*?<\/span>/, `<span id="signal-control">${anim.signalChain.control[lang]}</span>`);
            content = content.replace(/<span id="signal-joint">[\s\S]*?<\/span>/, `<span id="signal-joint">${anim.signalChain.joint[lang]}</span>`);
          }

          if (anim.gauge) {
            content = content.replace(/<span>FLESSIONE DEL MODELLO<\/span>/, `<span>${anim.gauge.title[lang]}</span>`);
            content = content.replace(/<em id="gauge-note">[\s\S]*?<\/em>/, `<em id="gauge-note">${anim.gauge.note[lang]}</em>`);
          }

          // Script command strings in 06
          const cmdTransit = { it: 'Il comando è in viaggio…', en: 'Transmitting command…', fr: 'Transmission de la commande…', es: 'Transmitiendo la orden…' }[lang];
          const cmdReview = { it: 'Rivedi il comando →', en: 'Review command →', fr: 'Revoir la commande →', es: 'Repetir la orden →' }[lang];
          const cmdTrace = { it: 'Segui il comando →', en: 'Trace command →', fr: 'Suivre la commande →', es: 'Seguir la orden →' }[lang];
          content = content.replace(/'Il comando è in viaggio…'/g, `'${cmdTransit}'`);
          content = content.replace(/'Rivedi il comando →'/g, `'${cmdReview}'`);
          content = content.replace(/'Segui il comando →'/g, `'${cmdTrace}'`);

          content = content.replace(/>Piega il ginocchio<\/button>/g, `>${anim.interactiveButtons.flex[lang]}</button>`);
          content = content.replace(/>Distendi il ginocchio<\/button>/g, `>${anim.interactiveButtons.extend[lang]}</button>`);
          content = content.replace(/>Segui il comando →<\/button>/g, `>${anim.interactiveButtons.traceCommand[lang]}</button>`);
          content = content.replace(/>Una flessione<\/button>/g, `>${anim.interactiveButtons.motionFlex[lang]}</button>`);
          content = content.replace(/>Un ostacolo<\/button>/g, `>${anim.interactiveButtons.motionObstacle[lang]}</button>`);
          content = content.replace(/>Un gradino<\/button>/g, `>${anim.interactiveButtons.motionStep[lang]}</button>`);

          content = content.replace(/>Risultati promettenti da verificare su più persone<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Una soluzione già adatta a tutti<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);

          content = content.replace(
            /'Esatto! È una ricerca innovativa con risultati promettenti[\s\S]*?'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'La protesi è ancora un modello sperimentale[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        } else if (dirKey === '07.Buco.Nero') {
          const regexPages = /const\s+pages\s*=\s*\[[\s\S]*?\];/;
          content = content.replace(regexPages, `const pages = ${JSON.stringify(localizedSteps, null, 2)};`);

          content = content.replace(/>Cile · 2 strumenti<\/button>/g, `>${anim.interactiveButtons.chile[lang]}</button>`);
          content = content.replace(/>Hawaii · 2 strumenti<\/button>/g, `>${anim.interactiveButtons.hawaii[lang]}</button>`);
          content = content.replace(/>Arizona e Messico · 2<\/button>/g, `>${anim.interactiveButtons.arizona[lang]}</button>`);
          content = content.replace(/>Spagna · 1 strumento<\/button>/g, `>${anim.interactiveButtons.spain[lang]}</button>`);
          content = content.replace(/>Poche misure<\/button>/g, `>${anim.interactiveButtons.fewSamples[lang]}</button>`);
          content = content.replace(/>Più misure<\/button>/g, `>${anim.interactiveButtons.moreSamples[lang]}</button>`);
          content = content.replace(/>La zona scura<\/button>/g, `>${anim.interactiveButtons.shadow[lang]}</button>`);
          content = content.replace(/>L’anello luminoso<\/button>/g, `>${anim.interactiveButtons.ring[lang]}</button>`);
          content = content.replace(/>Il colore arancione<\/button>/g, `>${anim.interactiveButtons.orange[lang]}</button>`);

          content = content.replace(/>Combinando segnali radio di strumenti lontani<\/button>/g, `>${anim.quiz.opt1[lang]}</button>`);
          content = content.replace(/>Con una fotocamera vicina al buco nero<\/button>/g, `>${anim.quiz.opt2[lang]}</button>`);

          content = content.replace(
            /'Esatto! La tecnica dell’interferometria ha unito radiotelescopi[\s\S]*?'/,
            `'${anim.quiz.feedbackCorrect[lang]}'`
          );
          content = content.replace(
            /'Nessuna sonda può avvicinarsi a un buco nero[\s\S]*?'/,
            `'${anim.quiz.feedbackWrong[lang]}'`
          );
        }
      }
    }

    // Save to BOTH directories:
    // 1. assets/einstein/bonus/{lang}/animazioni/{dir}
    // 2. accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus/{lang}/animazioni/{dir}
    const targetDirs = [
      path.join('assets/einstein/bonus', lang, 'animazioni', anim.dir),
      path.join('accesso/4dcbbaee2e69a278e4e59eab50430ccc/bonus', lang, 'animazioni', anim.dir)
    ];

    targetDirs.forEach(td => {
      fs.mkdirSync(td, { recursive: true });
      fs.writeFileSync(path.join(td, 'index.html'), content, 'utf8');
      fs.writeFileSync(path.join(td, anim.namedFile), content, 'utf8');
    });
  }

  console.log(`✅ Fully compiled and localized 3D animation [${anim.dir}] across IT, EN, FR, ES in both bonus directories!`);
}

// Build all 7 animations
for (const dirKey of Object.keys(data.animations)) {
  buildAnimation(dirKey);
}

console.log('\n🎉 All 7 interactive 3D animations have been compiled into IT, EN, FR, and ES in all locations!');
