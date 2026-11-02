/**
 * Multi-Language Builder for Einstein 3D Interactive Animations
 * Reads from centralized assets/einstein/i18n/animations-data.js
 * Generates IT, EN, FR, ES files in assets/einstein/bonus/{lang}/animazioni/{dir}/
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
    } else if (dirKey === '03.Pesce.Veicolo') {
      const vTop = { it: 'Dall’alto', en: 'Top view', fr: 'Vue du dessus', es: 'Vista cenital' }[lang];
      const vFront = { it: 'Frontale', en: 'Front view', fr: 'Vue de face', es: 'Vista frontal' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=top\?'Frontale':'Dall’alto';/g,
        `$('view-name').textContent=top?'${vFront}':'${vTop}';`
      );
    } else if (dirKey === '04.Uccelli.Dinosauri') {
      const vSide = { it: 'Altro lato', en: 'Other side', fr: 'Autre vue', es: 'Otro lado' }[lang];
      const vFront = { it: 'Prima vista', en: 'Front view', fr: 'Vue de face', es: 'Vista frontal' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Prima vista':'Altro lato';/g,
        `$('view-name').textContent=v?'${vFront}':'${vSide}';`
      );
    } else if (dirKey === '05.Fungo.Robot') {
      const vTop = { it: 'Dall’alto', en: 'Top view', fr: 'Vue du dessus', es: 'Vista cenital' }[lang];
      const vPersp = { it: 'Tre quarti', en: 'Perspective', fr: 'Perspective', es: 'Perspectiva' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=value\?'Tre quarti':'Dall’alto';/g,
        `$('view-name').textContent=value?'${vPersp}':'${vTop}';`
      );
    } else if (dirKey === '06.Ginocchio.Bionico') {
      const vSide = { it: 'Di lato', en: 'Side view', fr: 'Vue de profil', es: 'Vista lateral' }[lang];
      const vPersp = { it: 'Tre quarti', en: 'Perspective', fr: 'Perspective', es: 'Perspectiva' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Tre quarti':'Di lato';/g,
        `$('view-name').textContent=v?'${vPersp}':'${vSide}';`
      );
    } else if (dirKey === '07.Buco.Nero') {
      const vOther = { it: 'Altra vista', en: 'Other view', fr: 'Autre vue', es: 'Otra vista' }[lang];
      const vFirst = { it: 'Prima vista', en: 'First view', fr: 'Première vue', es: 'Primera vista' }[lang];
      content = content.replace(
        /\$\('view-name'\)\.textContent=v\?'Prima vista':'Altra vista';/g,
        `$('view-name').textContent=v?'${vFirst}':'${vOther}';`
      );
    }

    // SPECIFIC ANIMATION LOGIC
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
      content = content.replace(/>Tuffati nell'esperimento!<\/button>/g, `>${anim.stepsButtons.dive[lang]}</button>`);

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

      // Script DOM strings
      content = content.replace(/'Pranzo individuato!'/g, `'${anim.scriptTexts.lunchFound[lang]}'`);
      content = content.replace(/'2 • Costruisci la rete di bolle'/g, `'2 • ${anim.scriptTexts.buildNet[lang]}'`);
      content = content.replace(/'3 • Una rete d’aria!'/g, `'3 • ${anim.scriptTexts.airNet[lang]}'`);
      content = content.replace(/'3 • Una rete ancora aperta'/g, `'3 • ${anim.scriptTexts.openNet[lang]}'`);
      content = content.replace(/'Interazione 4 • La risalita della megattera'/g, `'4 • ${anim.scriptTexts.whaleAscent[lang]}'`);
      content = content.replace(/'Esperimento completato!'/g, `'${anim.scriptTexts.expCompleted[lang]}'`);
      content = content.replace(/'Guarda la risalita'/g, `'${anim.stepsButtons.ascent[lang]}'`);
      content = content.replace(/'Riprova la rete'/g, `'${anim.stepsButtons.retry[lang]}'`);
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
          const finalSurprise = { it: 'La sorpresa finale', en: 'The final surprise', fr: 'La surprise finale', es: 'La sorpresa final' }[lang];
          const unrollFern = { it: 'Srotola quello della felce', en: 'Unroll the fern’s DNA', fr: 'Déroule celui de la fougère', es: 'Desenrolla el del helecho' }[lang];
          content = content.replace(/'Il DNA si srotola…'/g, `'${unrollTxt}'`);
          content = content.replace(/'La sorpresa finale'/g, `'${finalSurprise}'`);
          content = content.replace(/'Srotola quello della felce'/g, `'${unrollFern}'`);

          const over100m = { it: 'Oltre 100 metri in una cellula!', en: 'Over 100 meters in a single cell!', fr: 'Plus de 100 mètres dans une seule cellule !', es: '¡Más de 100 metros en una sola célula!' }[lang];
          const howFar = { it: 'Guarda quanto continua…', en: 'See how far it goes…', fr: 'Regarde comme il s’étire…', es: 'Mira cuánto se extiende…' }[lang];
          const startHuman = { it: 'Partiamo dal nostro DNA.', en: 'Let’s start with human DNA.', fr: 'Partons de notre propre ADN.', es: 'Empecemos con nuestro ADN.' }[lang];
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

    // Save index.html and {namedFile}.html in target directory
    const targetDir = path.join('assets/einstein/bonus', lang, 'animazioni', anim.dir);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), content, 'utf8');
    fs.writeFileSync(path.join(targetDir, anim.namedFile), content, 'utf8');
  }

  console.log(`✅ Fully compiled and localized 3D animation [${anim.dir}] across IT, EN, FR, ES!`);
}

// Build all 7 animations
for (const dirKey of Object.keys(data.animations)) {
  buildAnimation(dirKey);
}

console.log('\n🎉 All 7 interactive 3D animations have been compiled into IT, EN, FR, and ES!');
