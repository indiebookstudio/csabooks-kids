/* EINSTEIN QR PORTAL — static, data-driven, no frameworks, no build step.
   To update files: replace media/copertina.webp, bonus/{lang}/..., downloads/fonti/SC-XX.pdf.
   To edit text: i18n/{lang}.json and content/fonti_{lang}.csv. */
'use strict';
(() => {
  const q = sel => document.querySelector(sel);
  const app = q('#app');
  const UK_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><path d="M0 0h60v30H0z" fill="#012169" stroke="none"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>`;
  const IT_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#009246" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ce2b37" stroke="none"/></svg>`;
  const FR_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="20" height="30" fill="#002395" stroke="none"/><rect width="20" height="30" x="20" fill="#ffffff" stroke="none"/><rect width="20" height="30" x="40" fill="#ed2939" stroke="none"/></svg>`;
  const ES_FLAG_SVG = `<svg class="flag-svg" viewBox="0 0 60 30" width="18" height="12" aria-hidden="true" style="border-radius:2px;display:inline-block;vertical-align:middle;box-shadow:0 0 1px rgba(0,0,0,0.4);"><rect width="60" height="30" fill="#aa151b" stroke="none"/><rect width="60" height="15" y="7.5" fill="#f1bf00" stroke="none"/></svg>`;
  const allLanguages = [
    { code: 'en', flag: UK_FLAG_SVG, label: 'English', available: true },
    { code: 'it', flag: IT_FLAG_SVG, label: 'Italiano', available: true },
    { code: 'fr', flag: FR_FLAG_SVG, label: 'Français', available: true },
    { code: 'es', flag: ES_FLAG_SVG, label: 'Español', available: true }
  ];
  const localeLabels = {it:'IT · Italiano',en:'EN · English',fr:'FR · Français',es:'ES · Español'};
  const categories = ['all','animali','piante','esperimenti','dinosauri','tecnologia','corpo','spazio','introduzione'];
  const cards = ['museo','film','colora','carte'];
  let config, t, sources = [], integrativeSources = [], language = 'it';
  const state = {query:'',filter:'all',limit:12};
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const linkOK = s => /^https:\/\//i.test(String(s??'')) || /^http:\/\//i.test(String(s??''));
  const E = s => encodeURIComponent(s);
  const text = (o,path) => path.split('.').reduce((v,k)=>v?.[k],o) ?? '';
  const L = path => text(t,path) || path;
  const page = () => new URL(location.href).searchParams.get('pagina') || 'inizio';
  const pageId = key => new URL(location.href).searchParams.get(key) || '';
  const url = (pageName, args={}) => {
    const p = new URLSearchParams({lang:language,pagina:pageName});
    for (const [k,v] of Object.entries(args)) if(v) p.set(k,v);
    return '?'+p.toString();
  };
  const stamp = name => `<span class="eyebrow">${esc(name)}</span>`;
  const btn = (label,href,kind='primary',other='') => `<a class="btn btn-${kind}" href="${esc(href)}" ${other}>${esc(label)} <span aria-hidden="true">↗</span></a>`;
  async function loadJSON(path){const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);return r.json();}
  async function loadCSV(path){const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);return parseCSV(await r.text());}
  function parseCSV(csv){
    csv=csv.replace(/^\uFEFF/,'');let out=[],row=[],field='',quoted=false;
    for(let i=0;i<csv.length;i++){
      const c=csv[i];
      if(c==='"'){if(quoted&&csv[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
      else if(c===','&&!quoted){row.push(field);field='';}
      else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&csv[i+1]==='\n')i++;row.push(field);out.push(row);row=[];field='';}
      else field+=c;
    }
    if(field||row.length){row.push(field);out.push(row);}
    if(!out.length)return [];
    const keys=out.shift().map(s=>s.trim());
    return out.filter(x=>x.some(c=>c.trim())).map(x=>Object.fromEntries(keys.map((k,i)=>[k,x[i]??''])));
  }
  function currentBonusURL(id,locale=language){
    const base=`bonus/${locale}/`;
    return ({museo:base+'museo/index.html',film:base+'animazioni/index.html',colora:base+'colora/colora.pdf',carte:base+'carte/index.html'})[id];
  }
  function currentBookCover(locale=language){
    if(config?.bookCovers && config.bookCovers[locale]) return config.bookCovers[locale];
    return config?.bookCover || 'media/copertina.webp';
  }
  const currentSiteTitle = () => config?.siteTitles?.[language] || config?.siteTitle || 'Il mondo segreto di Otto';
  const currentBookTitle = () => config?.bookTitles?.[language] || config?.bookTitle || 'EINSTEIN, QUESTA TE LA SEI PERSA!';
  function showToast(msg){
    let tEl = q('#site-toast');
    if(!tEl){
      tEl = document.createElement('div');
      tEl.id = 'site-toast';
      tEl.className = 'site-toast';
      tEl.setAttribute('role', 'alert');
      tEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(tEl);
    }
    tEl.textContent = msg;
    tEl.classList.add('show');
    clearTimeout(tEl._timer);
    tEl._timer = setTimeout(() => tEl.classList.remove('show'), 3200);
  }
  function bonusButtons(id){
    const loc = language;
    const avail = ['it', 'en', 'fr', 'es'].includes(loc);
    if(!avail) return `<p class="source-pdf-status">${esc(L('actions.comingSoon'))}</p>`;
    const extras = [];
    if(id === 'museo') extras.push(btn(L('actions.openMuseum'), currentBonusURL(id), 'primary'));
    if(id === 'film'){
      extras.push(btn(L('actions.openAnimations') || (loc === 'en' ? 'Explore 3D Animations' : 'Esplora le Animazioni 3D'), currentBonusURL(id), 'primary'));
    }
    if(id === 'colora') extras.push(btn(L('actions.downloadColor'), currentBonusURL(id), 'primary', 'download="Disegni.Da.Colorare.pdf"'));
    if(id === 'carte'){
      extras.push(btn(L('actions.playOnline'), currentBonusURL(id), 'primary'));
      extras.push(btn(L('actions.downloadCards'), `bonus/${loc}/carte/OTTO_CARTE_36_FRONTE_RETRO_A4.pdf`, 'outline', 'download="OTTO_CARTE_36_FRONTE_RETRO_A4.pdf"'));
      extras.push(btn(L('actions.downloadRules'), `bonus/${loc}/carte/OTTO_GUIDA_PREMIUM.pdf`, 'outline', 'download="OTTO_GUIDA_PREMIUM.pdf"'));
    }
    return extras.join('');
  }
  function route(name, data={}){
    history.pushState({},'',url(name,data));draw();window.scrollTo({top:0,behavior:'instant'});
    const menu=q('#nav-links');if(menu) menu.classList.remove('open');
    const toggle=q('#menu-toggle');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',L('nav.openMenu'));}
  }
  function isUnlocked(){try{return localStorage.getItem('otto_unlocked')==='true';}catch(_){return false;}}
  function setUnlocked(v){try{if(v)localStorage.setItem('otto_unlocked','true');else localStorage.removeItem('otto_unlocked');}catch(_){}}
  function setNav(){
    const skip = q('.skip-link'); if(skip) skip.textContent = L('nav.skipToContent');
    const brand = q('.brand-link'); if(brand) brand.setAttribute('aria-label', L('nav.goHome'));
    const toggle = q('#menu-toggle'); if(toggle) toggle.setAttribute('aria-label', toggle.getAttribute('aria-expanded') === 'true' ? L('nav.closeMenu') : L('nav.openMenu'));
    const navEl = q('#nav-links'); if(navEl) navEl.setAttribute('aria-label', L('nav.mainNav'));

    const current = page();
    const items = [['inizio', L('nav.home')], ['bonus', L('nav.bonus')], ['fonti', L('nav.sources')]];
    let links = items.map(([p, label]) => `<a class="nav-link ${current === p || (current === 'bonus-dettaglio' && p === 'bonus') || (current === 'fonte' && p === 'fonti') ? 'active' : ''}" href="${url(p)}" data-internal="${p}" ${current === p ? 'aria-current="page"' : ''}>${esc(label)}</a>`).join('');
    q('#nav-links').innerHTML = links;

    const bar = `<div class="locale-pill-bar" role="group" aria-label="${esc(L('footer.lang'))}">
      ${allLanguages.filter(l => (config?.enabledLocales || ['it', 'en', 'fr', 'es']).includes(l.code)).map(l => `
        <button type="button" class="locale-flag-item ${language === l.code ? 'active' : ''}" data-switch-lang="${l.code}" aria-pressed="${language === l.code ? 'true' : 'false'}" title="${esc(l.label)}">
          <span class="flag-icon" aria-hidden="true">${l.flag}</span>
          <span class="flag-code">${l.code.toUpperCase()}</span>
        </button>
      `).join('')}
    </div>`;
    q('#language-select').innerHTML = bar;
  }
  function footer(){
    q('#site-footer').innerHTML=`<div class="wrap"><div class="footer-grid"><div><div class="footer-tag">${esc(L('footer.tag'))}</div><p>${esc(L('footer.text'))}</p><p>${esc(L('footer.privacy'))}</p></div><div class="footer-links"><a href="${url('inizio')}" data-internal="inizio">${esc(L('nav.home'))}</a><a href="${url('fonti')}" data-internal="fonti">${esc(L('nav.sources'))}</a>${linkOK(config.contactUrl)?`<a href="${esc(config.contactUrl)}" target="_blank" rel="noopener noreferrer">${esc(L('footer.official'))} ↗</a>`:''}</div></div><div class="footer-bottom">${esc(L('footer.legal'))}</div></div>`;
  }
  function card(id,i){
    const b=t.bonus[id];
    if(id === 'film'){
      return `<article class="bonus-card"><a href="${currentBonusURL(id)}" aria-label="${esc(b.title)}"><div class="bonus-art"><img src="media/bonus/${id}.webp" loading="lazy" alt="" width="1536" height="1024"><span class="bonus-number">0${i+1}</span></div><div class="bonus-body"><div class="bonus-tag">${esc(b.tag)}</div><h3>${esc(b.title)}</h3><p class="bonus-desc">${esc(b.description)}</p><div class="bonus-foot"><span>${esc(L('sections.enter'))}</span><span class="icon-arrow" aria-hidden="true">↗</span></div></div></a></article>`;
    }
    return `<article class="bonus-card"><a href="${url('bonus-dettaglio',{id})}" data-bonus="${id}" aria-label="${esc(b.title)}"><div class="bonus-art"><img src="media/bonus/${id}.webp" loading="lazy" alt="" width="1536" height="1024"><span class="bonus-number">0${i+1}</span></div><div class="bonus-body"><div class="bonus-tag">${esc(b.tag)}</div><h3>${esc(b.title)}</h3><p class="bonus-desc">${esc(b.description)}</p><div class="bonus-foot"><span>${esc(L('sections.enter'))}</span><span class="icon-arrow" aria-hidden="true">↗</span></div></div></a></article>`;
  }
  function renderHome(){
    return `<section class="hero"><div class="wrap hero-inner"><div class="hero-copy">${stamp(L('brand.eyebrow'))}<h1><span>${esc(L('brand.title'))}</span><span class="gold-text">${esc(L('brand.titleEm'))}</span></h1><p class="hero-intro">${esc(L('brand.intro'))}</p><p class="hero-description">${esc(L('brand.subtitle'))}</p><div class="hero-actions">${btn(L('brand.ctaExplore'),url('bonus'))}${btn(L('brand.ctaSources'),url('fonti'),'outline')}</div><p class="hero-beneath"><span class="dot"></span>${esc(L('brand.age'))}</p></div><div class="hero-visual" aria-hidden="true"><div class="hero-halo"></div><img class="book-cover" src="${esc(currentBookCover())}" alt="${esc(currentBookTitle())}" onerror="this.onerror=null;this.src='media/copertina.webp'"><img class="hero-otto" src="${esc(config.mascot)}" alt=""><span class="hero-stamp">OTTO · DISCOVERY CLUB</span></div></div></section>
      <section class="section ornate-rule" id="bonus"><div class="wrap"><div class="section-top"><div class="section-heading">${stamp(L('sections.bonusEyebrow'))}<h2>${esc(L('sections.bonusTitle'))}</h2><p class="section-subtitle">${esc(L('sections.bonusSubtitle'))}</p></div></div><div class="cards">${cards.map(card).join('')}</div></div></section>
      <section class="section section-quiet" id="biblioteca"><div class="wrap"><div class="sources-teaser"><div>${stamp(L('sections.sourceEyebrow'))}<h2>${esc(L('sections.sourceWhyTitle'))}</h2><p>${esc(L('sections.sourceWhyText'))}</p><p>${esc(L('sections.sourcesCount'))}</p>${btn(L('sections.viewAllSources'),url('fonti'))}</div><img loading="lazy" src="media/bonus/fonti.webp" alt="" width="1536" height="1024"></div></div></section>
      <section class="section"><div class="wrap"><div class="mission-preview"><img src="media/otto-mondo.webp" loading="lazy" alt="" width="140" height="140"><div>${stamp(L('brand.welcome'))}<h3>${esc(L('sections.bundleTitle'))}</h3><p>${esc(L('sections.bundleText'))}</p></div></div></div></section>`;
  }
  function renderBonusGrid(){return `<section class="page-top"><div class="wrap page-header">${breadcrumb([L('nav.home'),L('nav.bonus')])}${stamp(L('sections.bonusEyebrow'))}<h1>${esc(L('sections.bonusTitle'))}</h1><p class="page-description">${esc(L('sections.bonusSubtitle'))}</p></div></section><section class="section"><div class="wrap"><div class="cards">${cards.map(card).join('')}</div></div></section>`;}
  function breadcrumb(parts){return `<div class="breadcrumb"><a href="${url('inizio')}" data-internal="inizio">${esc(parts[0]||L('nav.home'))}</a> <span aria-hidden="true">/</span> <span>${esc(parts.slice(1).join(' / '))}</span></div>`;}
  function renderBonus(id){
    if(id === 'film'){
      location.replace(currentBonusURL('film'));
      return `<div class="initial-loader"><div class="spinner"></div><p>${esc(L('nav.loading') || L('sections.enter'))}…</p></div>`;
    }
    const b=t.bonus[id];if(!b)return notFound();
    const img=`media/bonus/${id}.webp`;

    let extraSection = '';
    if(id === 'colora'){
      const sheets = Array.from({length: 10}, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        const sheetLabel = esc(L('bonus.colora.sheet') || 'Tavola');
        return `
          <div class="colora-card">
            <img src="media/colora/tavola_${num}.webp" alt="${sheetLabel} ${num}" loading="lazy" width="400" height="566">
            <div class="colora-card-footer">
              <span>${sheetLabel} ${num}</span>
            </div>
          </div>
        `;
      }).join('');

      extraSection = `
        <div class="bonus-info-grid">
          <div class="bonus-info-card">
            <h3>🖨️ ${esc(L('bonus.colora.printTitle') || 'Indicazioni di stampa')}</h3>
            <ul>
              <li><strong>${esc(L('bonus.colora.printFormat') || 'Formato: A4 · Scala: Adatta alla pagina')}</strong></li>
              <li>${esc(L('bonus.colora.printColor') || 'Modalità: Bianco e nero / Scala di grigi')}</li>
              <li>${esc(L('bonus.colora.printPaper') || 'Carta consigliata: 100–120 g/m²')}</li>
            </ul>
          </div>
        </div>
        <div class="colora-gallery-section">
          <div class="colora-gallery-header">
            <h3>🎨 ${esc(L('bonus.colora.previewTitle') || 'Anteprima delle 10 tavole')}</h3>
            <p>${esc(b.description)}</p>
          </div>
          <div class="colora-grid">
            ${sheets}
          </div>
        </div>
      `;
    } else if(id === 'carte'){
      extraSection = `
        <div class="bonus-info-grid">
          <div class="bonus-info-card">
            <h3>📖 ${esc(L('bonus.carte.rulesTitle') || 'Regole rapide')}</h3>
            <p>${esc(L('bonus.carte.rulesText') || '')}</p>
          </div>
          <div class="bonus-info-card">
            <h3>🖨️ ${esc(L('bonus.carte.printTitle') || 'Istruzioni stampa')}</h3>
            <p>${esc(L('bonus.carte.printText') || '')}</p>
          </div>
        </div>
      `;
    }

    return `
      <section class="page-top"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.bonus'),b.title])}</div></section>
      <section class="wrap detail-hero">
        <div class="detail-art"><img src="${img}" alt="" width="1536" height="1024"></div>
        <div class="detail-content">
          ${stamp(b.tag)}
          <h1>${esc(b.title)}</h1>
          <p class="detail-subtitle">${esc(b.subtitle)}</p>
          <p class="detail-text">${esc(b.detail)}</p>
          <div class="detail-actions">${bonusButtons(id)}</div>
          <div class="minor-links">${btn(L('actions.goBack'),url('bonus'),'outline')}</div>
        </div>
      </section>
      ${extraSection ? `<section class="wrap" style="padding-bottom:50px">${extraSection}</section>` : ''}
    `;
  }
  function sourceCard(s){
    const code=esc(s.codice),title=esc(s.titolo);
    const integLabelMap = {
      it: n => `+${n} ${n === 1 ? 'correlata' : 'correlate'}`,
      en: n => `+${n} related`,
      fr: n => `+${n} ${n === 1 ? 'associée' : 'associées'}`,
      es: n => `+${n} ${n === 1 ? 'relacionada' : 'relacionadas'}`
    };
    const integBadge = integCount > 0 ? `<span class="source-card-integ">${(integLabelMap[language] || integLabelMap.it)(integCount)}</span>` : '';
    return `<article class="source-card"><a href="${url('fonte',{sc:s.codice})}" data-source="${code}" aria-label="${code}: ${title}"><div class="source-card-art"><img src="media/fonti/${code}.webp" alt="${title}" width="660" height="440" loading="lazy" onerror="this.onerror=null;this.src='media/temi/${esc(s.categoria)}.webp'"></div><div class="source-card-body"><div class="source-card-topbar"><span class="source-code">${code}</span><span class="source-card-category">${esc(L('categories.'+s.categoria))}</span></div><h3>${title}</h3><p>${esc(s.citazione)}</p><div class="source-card-footer">${integBadge}<span class="source-card-more">${esc(L('actions.learnMore'))} ↗</span></div></div></a></article>`;
  }
  function filteredSources(){let q0=state.query.trim().toLocaleLowerCase(language);return sources.filter(s=>(state.filter==='all'||s.categoria===state.filter)&&(!q0||[s.codice,s.titolo,s.citazione,s.categoria,s.url].join(' ').toLocaleLowerCase(language).includes(q0)));}
  function drawSourceCards(){
    let items=filteredSources(), visible=items.slice(0,state.limit);
    const el=q('#source-results');if(!el)return;
    q('#source-count').textContent = `${items.length} ${items.length === 1 ? L('sourceUi.result') : L('sourceUi.results')}`;
    el.innerHTML=visible.length?visible.map(sourceCard).join(''):`<div class="empty-state">${esc(L('sourceUi.none'))}</div>`;
    const more=q('#more-sources');if(more){more.hidden=items.length<=state.limit;more.disabled=items.length<=state.limit;}
  }
  function renderSources(){
    return `<section class="sources-intro"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.sources')])}${stamp(L('sections.sourceEyebrow'))}<h1>${esc(L('sections.sourceTitle'))}</h1><p class="page-description">${esc(L('sections.sourceSubtitle'))}</p><div class="source-toolbar"><label class="search-wrap" for="search-sources"><span class="search-icon" aria-hidden="true">⌕</span><input class="search-input" id="search-sources" type="search" autocomplete="off" placeholder="${esc(L('sourceUi.searchPlaceholder'))}" aria-label="${esc(L('sourceUi.searchLabel'))}" value="${esc(state.query)}"></label><div class="filter-row" aria-label="${esc(L('sourceUi.category'))}">${categories.map(k=>`<button class="chip" type="button" data-filter="${k}" aria-pressed="${state.filter===k?'true':'false'}">${esc(L('categories.'+k))}</button>`).join('')}</div></div><p class="results-line" id="source-count" aria-live="polite"></p><div class="sources-grid" id="source-results"></div><div class="show-more"><button id="more-sources" class="btn btn-outline" type="button">${esc(L('sourceUi.showMore'))} ↓</button></div><div class="wide-info"><h3>${esc(L('sections.sourceWhyTitle'))}</h3><p>${esc(L('sections.sourceWhyText'))}</p></div></div></section>`;
  }
  function formatCitation(text){
    if(!text) return '';
    const links = [];
    // 1. Extract DOIs into safe placeholders
    let str = String(text).replace(/doi:\s*(10\.\d{4,9}\/[^\s",;()]+)/gi, (m, rawDoi) => {
      const cleanDoi = rawDoi.replace(/[.,;]+$/, '');
      const trailing = rawDoi.slice(cleanDoi.length);
      const id = links.length;
      links.push(`doi: <a href="https://doi.org/${cleanDoi}" target="_blank" rel="noopener noreferrer">${cleanDoi}</a>${trailing}`);
      return `___CITE_LINK_${id}___`;
    });
    // 2. Extract standalone URLs into safe placeholders
    str = str.replace(/(https?:\/\/[^\s",;()]+)/gi, (m, rawUrl) => {
      const cleanUrl = rawUrl.replace(/[.,;]+$/, '');
      const trailing = rawUrl.slice(cleanUrl.length);
      const id = links.length;
      links.push(`<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${trailing}`);
      return `___CITE_LINK_${id}___`;
    });
    // 3. Escape surrounding text
    let res = esc(str);
    // 4. Restore safe HTML links
    for (let i = 0; i < links.length; i++) {
      res = res.replace(`___CITE_LINK_${i}___`, links[i]);
    }
    return res;
  }
  function linkedCorrections(s){
    const raw=String(s.correzioni||'');if(!raw)return '';
    // Render human-authored CSV note safely, and link verified protocol URLs only.
    const parts=raw.split(/(https?:\/\/[^\s]+)/g);
    const result=parts.map(x=>linkOK(x)?`<a href="${esc(x)}" rel="noopener noreferrer" target="_blank">${esc(x)}</a>`:esc(x)).join('');
    return `<div class="citation-card"><h3>${esc(L('actions.correction'))}</h3><p>${result}</p></div>`;
  }
  function localizeIntegrativeItem(it, lang){
    const types = {
      'PDF originale': {
        it: 'PDF originale',
        en: 'Original PDF',
        fr: 'PDF original',
        es: 'PDF original'
      },
      'Stampa pagina web': {
        it: 'Stampa pagina web',
        en: 'Web page printout',
        fr: 'Impression de page web',
        es: 'Impresión de página web'
      },
      'Stampa pagina web - estratto introduttivo': {
        it: 'Stampa pagina web - estratto introduttivo',
        en: 'Web page printout - introductory excerpt',
        fr: 'Impression de page web - extrait introductif',
        es: 'Impresión de página web - extracto introductorio'
      },
      'Preprint - versione precedente alla pubblicazione': {
        it: 'Preprint - versione precedente alla pubblicazione',
        en: 'Preprint - version prior to publication',
        fr: 'Prépublication - version antérieure à la publication',
        es: 'Preprint - versión previa a la publicación'
      },
      'PDF ISSCR - Guidelines August 2025, versione 1.2': {
        it: 'PDF ISSCR - Linee guida agosto 2025, versione 1.2',
        en: 'PDF ISSCR - Guidelines August 2025, version 1.2',
        fr: 'PDF ISSCR - Lignes directrices août 2025, version 1.2',
        es: 'PDF ISSCR - Directrices agosto de 2025, versión 1.2'
      }
    };
    const authors = {
      'Fonte del calcolo': {
        it: 'Fonte del calcolo',
        en: 'Calculation source',
        fr: 'Source du calcul',
        es: 'Fuente del cálculo'
      },
      'Shu, Herr e colleghi · 2025': {
        it: 'Shu, Herr e colleghi · 2025',
        en: 'Shu, Herr and colleagues · 2025',
        fr: 'Shu, Herr et collègues · 2025',
        es: 'Shu, Herr y colegas · 2025'
      },
      'Colossal · annuncio aziendale 2026': {
        it: 'Colossal · annuncio aziendale 2026',
        en: 'Colossal · company announcement 2026',
        fr: 'Colossal · annonce d’entreprise 2026',
        es: 'Colossal · anuncio de la empresa 2026'
      },
      'NHGRI / ISSCR · 2026 · Anche: ISSCR Guidelines (2025).': {
        it: 'NHGRI / ISSCR · 2026 · Anche: ISSCR Guidelines (2025).',
        en: 'NHGRI / ISSCR · 2026 · Also: ISSCR Guidelines (2025).',
        fr: 'NHGRI / ISSCR · 2026 · Également : Lignes directrices ISSCR (2025).',
        es: 'NHGRI / ISSCR · 2026 · También: Directrices ISSCR (2025).'
      },
      'Shimada et al. · 2025 e 2026': {
        it: 'Shimada et al. · 2025 e 2026',
        en: 'Shimada et al. · 2025 and 2026',
        fr: 'Shimada et al. · 2025 et 2026',
        es: 'Shimada et al. · 2025 y 2026'
      }
    };
    const notes = {
      'SC-00-integrativa-01': {
        it: 'Estratto introduttivo della pagina Smithsonian attuale sui forni a microonde. Il precedente URL del registro non è acquisibile.',
        en: 'Introductory excerpt from the current Smithsonian microwave page. The previous registry URL is unavailable.',
        fr: 'Extrait introductif de la page actuelle du Smithsonian sur les micro-ondes. L’ancienne URL du registre n’est plus accessible.',
        es: 'Extracto introductorio de la página actual del Smithsonian sobre hornos microondas. La URL anterior del registro no es recuperable.'
      },
      'SC-00-integrativa-02': {
        it: 'Estratto editoriale di The Expanded Quotable Einstein, utile per la provenienza della citazione Einstein/Seelig; non è la scansione della lettera originale del 1952.',
        en: 'Editorial excerpt from The Expanded Quotable Einstein, useful for the source of the Einstein/Seelig quote; not a scan of the original 1952 letter.',
        fr: 'Extrait éditorial de The Expanded Quotable Einstein, utile pour la source de la citation Einstein/Seelig ; il ne s’agit pas du scan de la lettre originale de 1952.',
        es: 'Extracto editorial de The Expanded Quotable Einstein, útil para la procedencia de la cita de Einstein/Seelig; no es un escaneo de la carta original de 1952.'
      },
      'SC-25-integrativa-03': {
        it: 'Stessa pubblicazione di SC-25.pdf, raggiunta anche tramite il collegamento alla pagina dell’editore.',
        en: 'Same publication as SC-25.pdf, also reached via the publisher page link.',
        fr: 'Même publication que SC-25.pdf, également accessible via le lien vers la page de l’éditeur.',
        es: 'Misma publicación que SC-25.pdf, accesible también mediante el enlace a la página de la editorial.'
      },
      'SC-51-integrativa-02': {
        it: 'Stesso manoscritto di SC-51.pdf, citato anche tramite il collegamento diretto ESO.',
        en: 'Same manuscript as SC-51.pdf, also cited via the direct ESO link.',
        fr: 'Même manuscrit que SC-51.pdf, également cité via le lien direct de l’ESO.',
        es: 'Mismo manuscrito que SC-51.pdf, citado también mediante el enlace directo del ESO.'
      }
    };
    return {
      ...it,
      tipo: types[it.tipo]?.[lang] || it.tipo || it.scheda,
      autore: authors[it.autore]?.[lang] || it.autore,
      nota: notes[it.code]?.[lang] || it.nota
    };
  }

  function renderIntegrativeSection(code){
    const rawItems = integrativeSources.filter(x => x.parent === code);
    if(!rawItems.length) return '';
    const items = rawItems.map(it => localizeIntegrativeItem(it, language));
    const dir = config?.sourcePdfDirectory || 'downloads/fonti/';
    const headerTitleMap = {
      it: n => `📚 Fonti integrative e materiali correlati (${n})`,
      en: n => `📚 Supplementary sources and related materials (${n})`,
      fr: n => `📚 Sources complémentaires et documents associés (${n})`,
      es: n => `📚 Fuentes complementarias y materiales relacionados (${n})`
    };
    const headerIntroMap = {
      it: 'Approfondimenti, studi scientifici collegati, preprints o note degli autori archiviati:',
      en: 'In-depth analyses, connected scientific studies, preprints, or archived author notes:',
      fr: 'Analyses approfondies, études scientifiques associées, prépublications ou notes d’auteurs archivées :',
      es: 'Análisis en profundidad, estudios científicos relacionados, preprints o notas de autores archivadas:'
    };
    const authLabelMap = {
      it: 'Autori/Origine:',
      en: 'Authors/Source:',
      fr: 'Auteurs/Origine :',
      es: 'Autores/Origen:'
    };
    const dlTextMap = {
      it: p => `Scarica PDF (${esc(p)} pag.) ↓`,
      en: p => `Download PDF (${esc(p)} p.) ↓`,
      fr: p => `Télécharger le PDF (${esc(p)} p.) ↓`,
      es: p => `Descargar PDF (${esc(p)} pág.) ↓`
    };
    const readOnlineMap = {
      it: 'Consulta online ↗',
      en: 'Read online ↗',
      fr: 'Consulter en ligne ↗',
      es: 'Consultar en línea ↗'
    };
    const pageSuffixMap = {
      it: ' pag.',
      en: ' p.',
      fr: ' p.',
      es: ' pág.'
    };

    const headerTitle = (headerTitleMap[language] || headerTitleMap.it)(items.length);
    const headerIntro = headerIntroMap[language] || headerIntroMap.it;
    const authLabel = authLabelMap[language] || authLabelMap.it;
    const dlText = dlTextMap[language] || dlTextMap.it;
    const readOnline = readOnlineMap[language] || readOnlineMap.it;
    const pageSuffix = pageSuffixMap[language] || pageSuffixMap.it;

    return `
      <div class="citation-card integrative-card">
        <div class="integrative-header">
          <h3>${headerTitle}</h3>
          <p class="integrative-intro">${headerIntro}</p>
        </div>
        <div class="integrative-list">
          ${items.map(it => `
            <div class="integrative-item">
              <div class="integrative-meta">
                <span class="integrative-code">${esc(it.code)}</span>
                <span class="integrative-title">${esc(it.tipo || it.scheda)}</span>
                <span class="integrative-pages">${it.pagine ? esc(it.pagine) + pageSuffix : ''}</span>
              </div>
              ${it.autore ? `<p class="integrative-author"><strong>${authLabel}</strong> ${esc(it.autore)}</p>` : ''}
              ${it.doi ? `<p class="integrative-doi"><strong>DOI:</strong> <a href="https://doi.org/${esc(it.doi)}" target="_blank" rel="noopener noreferrer">${esc(it.doi)}</a></p>` : ''}
              ${it.nota ? `<p class="integrative-note">${esc(it.nota)}</p>` : ''}
              <div class="integrative-actions">
                <a href="${esc(dir + it.file)}" download="${esc(it.file.split('/').pop())}" class="btn btn-primary btn-sm">${dlText(it.pagine)}</a>
                ${linkOK(it.url) ? `<a href="${esc(it.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${readOnline}</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  function renderSource(s){
    const dir = config?.sourcePdfDirectory || 'downloads/fonti/';
    const official = linkOK(s.url) ? btn(L('actions.openOfficial'), s.url, 'outline', 'target="_blank" rel="noopener noreferrer"') : '';
    const imageCreditMap = {
      it: 'Credito immagine: EHT Collaboration / ESO (2019), CC BY 4.0',
      en: 'Image credit: EHT Collaboration / ESO (2019), CC BY 4.0',
      fr: 'Crédit image : EHT Collaboration / ESO (2019), CC BY 4.0',
      es: 'Crédito de la imagen: EHT Collaboration / ESO (2019), CC BY 4.0'
    };
    const imageCredit = s.codice === 'SC-55' ? (imageCreditMap[language] || imageCreditMap.it) : esc(L('actions.sourceIllustration'));
    return `<section class="page-top"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.sources'),s.codice])}</div></section><section class="wrap source-detail"><div class="source-image"><img src="media/fonti/${esc(s.codice)}.webp" alt="${esc(s.titolo)}" width="660" height="440" onerror="this.onerror=null;this.src='media/temi/${esc(s.categoria)}.webp'"><div class="source-caption">${imageCredit}</div></div><div class="source-detail-info"><span class="source-badge">${esc(s.codice)}</span><h1>${esc(s.titolo)}</h1><p class="detail-meta">${esc(L('categories.'+s.categoria))}</p><div class="citation-card"><h3>${esc(L('sourceUi.citation'))}</h3><p>${formatCitation(s.citazione)}</p></div>${linkedCorrections(s)}<div class="source-buttons">${official}<a id="source-pdf-link" class="btn btn-primary" href="${esc(dir + s.codice)}.pdf" download="${esc(s.codice)}.pdf">${esc(L('actions.downloadSource'))} ↓</a></div>${renderIntegrativeSection(s.codice)}<div class="minor-links">${btn(L('actions.backSources'),url('fonti'),'outline')}</div></div></section>`;
  }
  async function checkSourcePDF(code){
    const el = q('#source-pdf-link');
    if (!el) return;
    const file = (config.sourcePdfDirectory || 'downloads/fonti/') + code + '.pdf';
    try {
      const res = await fetch(file, { method: 'HEAD', cache: 'no-store' });
      const mime = (res.headers.get('content-type') || '').toLowerCase();
      const valid = res.ok && (mime.includes('pdf') || mime.includes('octet-stream'));
      if (page() !== 'fonte' || pageId('sc') !== code) return;
      if (!valid) {
        el.removeAttribute('href');
        el.className = 'btn btn-plain';
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('tabindex', '-1');
      }
    } catch (_) {}
  }
  function renderAccess(alreadyUnlocked){
    const ottoWebp = 'media/polpo_esploratore_con_chiave_dorata.webp';
    const ottoPng = 'media/polpo_esploratore_con_chiave_dorata.png';
    const unlockedBox = alreadyUnlocked ? `
      <div class="access-unlocked-box">
        <p>✦ ${esc(L('access.unlockedNotice'))}</p>
        <div class="access-unlocked-actions">
          <a class="btn btn-primary" href="${url('inizio')}" data-internal="inizio">${esc(L('access.enterPortal'))} →</a>
          <button type="button" class="btn btn-outline" id="btn-relock">${esc(L('access.relockBtn'))}</button>
        </div>
      </div>
    ` : '';

    const privacyBodies = {
      en: `
        <p><strong>Information for adults / parents under EU Regulation 2016/679 (GDPR)</strong></p>
        <h3>1. Purpose of the Service (Secret Key Delivery)</h3>
        <p>The email address entered is used solely to deliver the requested universal key («OTTO») to access educational resources for the book <em>Einstein, You Missed This!</em>. Legal basis: performance of a requested measure (art. 6, para. 1, letter b, GDPR).</p>
        <h3>2. Optional Newsletter Subscription</h3>
        <p>The promotional consent box is optional and non-binding. If checked, it allows updates about new books, free educational activities, and editorial news (art. 6, para. 1, letter a, GDPR). Consent can be withdrawn at any time by writing to <a href="mailto:csabooks.kids@gmail.com" class="privacy-link">csabooks.kids@gmail.com</a>.</p>
        <h3>3. Protection of Minors</h3>
        <p>The key request is strictly intended for parents and adults. No minors' personal data is collected, stored, or profiled for commercial purposes.</p>
        <h3>4. Technical Provider & Data Processing</h3>
        <p>Emails are delivered via the secure Brevo platform (Sendinblue SAS, with EU-based GDPR-compliant servers). No data is transferred to third parties.</p>
        <h3>5. Data Subject Rights</h3>
        <p>You can request access, rectification, or deletion of your data at any time by emailing <strong>csabooks.kids@gmail.com</strong>.</p>
      `,
      fr: `
        <p><strong>Informations destinées aux adultes / parents conformément au Règlement UE 2016/679 (RGPD)</strong></p>
        <h3>1. Finalité du Service (Envoi de la Clé Secrète)</h3>
        <p>L'adresse e-mail saisie est utilisée uniquement pour envoyer la clé universelle demandée (« OTTO ») afin d'accéder aux ressources éducatives du livre <em>Einstein, tu as manqué ça !</em>. La base juridique est l'exécution d'une mesure demandée par la personne concernée (art. 6, par. 1, point b, RGPD).</p>
        <h3>2. Inscription Facultative aux Nouveautés Éditoriales</h3>
        <p>La case de consentement promotionnel est entièrement facultative et non contraignante. Si elle est cochée, elle permet l'envoi d'actualités sur les nouveaux livres, les activités éducatives gratuites et les initiatives éditoriales (art. 6, par. 1, point a, RGPD). Le consentement peut être retiré à tout moment en écrivant à <a href="mailto:csabooks.kids@gmail.com" class="privacy-link">csabooks.kids@gmail.com</a>.</p>
        <h3>3. Protection des Mineurs</h3>
        <p>La demande de clé est strictement réservée aux parents et aux adultes. Aucune donnée personnelle de mineur n'est collectée, conservée ou profilée à des fins commerciales.</p>
        <h3>4. Prestataire Technique et Traitement des Données</h3>
        <p>Les messages électroniques sont acheminés via la plateforme sécurisée Brevo (Sendinblue SAS, avec des serveurs situés dans l'Union Européenne conformes au RGPD). Aucune donnée n'est cédée à des tiers.</p>
        <h3>5. Droits de la Personne Concernée</h3>
        <p>Il est possible à tout moment de demander l'accès, la rectification, la suppression ou l'opposition au traitement de ses données en envoyant une communication à <strong>csabooks.kids@gmail.com</strong>.</p>
      `,
      es: `
        <p><strong>Información para adultos / padres conforme al Reglamento UE 2016/679 (RGPD)</strong></p>
        <h3>1. Finalidad del Servicio (Envío de la Llave Secreta)</h3>
        <p>La dirección de correo electrónico introducida se utiliza únicamente para enviar la llave universal solicitada (« OTTO ») para acceder a los recursos educativos del libro <em>¡Einstein, esta te la perdiste!</em>. La base jurídica es la ejecución de una medida solicitada por el interesado (art. 6, apdo. 1, letra b, RGPD).</p>
        <h3>2. Suscripción Opcional a las Novedades Editoriales</h3>
        <p>La casilla de consentimiento promocional es completamente voluntaria y no vinculante. Si se marca, permite el envío de actualizaciones sobre nuevos libros, actividades educativas gratuitas e iniciativas editoriales (art. 6, apdo. 1, letra a, RGPD). El consentimiento puede revocarse en cualquier momento escribiendo a <a href="mailto:csabooks.kids@gmail.com" class="privacy-link">csabooks.kids@gmail.com</a>.</p>
        <h3>3. Protección de Menores</h3>
        <p>La solicitud de la llave está dirigida exclusivamente a padres y adultos. No se recopilan, conservan ni elaboran perfiles con datos de menores para fines comerciales.</p>
        <h3>4. Proveedor Técnico y Tratamiento de Datos</h3>
        <p>Los correos electrónicos se envían a través de la plataforma segura Brevo (Sendinblue SAS, con servidores situados en la Unión Europea conformes al RGPD). No se ceden datos a terceros.</p>
        <h3>5. Derechos del Interesado</h3>
        <p>Es posible solicitar en todo momento el acceso, la rectificación, la supresión o la oposición al tratamiento de sus datos enviando una comunicación a <strong>csabooks.kids@gmail.com</strong>.</p>
      `,
      it: `
        <p><strong>Informativa per gli adulti / genitori ex Regolamento UE 2016/679 (GDPR)</strong></p>
        <h3>1. Finalità del Servizio (Invio Chiave Segreta)</h3>
        <p>L'indirizzo email inserito viene utilizzato unicamente per inviare la chiave universale richiesta («OTTO») per accedere alle risorse didattiche del libro <em>Einstein, questa te la sei persa!</em>. La base giuridica è l'esecuzione di una misura richiesta dall'interessato (art. 6, par. 1, lett. b, GDPR).</p>
        <h3>2. Iscrizione Facoltativa alle Novità Editoriali</h3>
        <p>La casella di consenso promozionale è completamente facoltativa e non vincolante. Se selezionata, consente l'invio di aggiornamenti su nuovi libri, attività didattiche e iniziative editoriali gratuite (art. 6, par. 1, lett. a, GDPR). Il consenso può essere revocato in ogni momento scrivendo a <a href="mailto:csabooks.kids@gmail.com" class="privacy-link">csabooks.kids@gmail.com</a>.</p>
        <h3>3. Protezione dei Minori</h3>
        <p>La richiesta della chiave è rivolta esclusivamente a genitori e adulti. Nessun dato di minori viene raccolto, conservato o profilato per scopi commerciali.</p>
        <h3>4. Fornitore Tecnico e Trattamento Dati</h3>
        <p>I messaggi email sono recapitati tramite la piattaforma sicura Brevo (Sendinblue SAS, con server situati nell'Unione Europea conformi al GDPR). Nessun dato viene ceduto a terzi.</p>
        <h3>5. Diritti dell'Interessato</h3>
        <p>È sempre possibile richiedere l'accesso, la rettifica, la cancellazione o l'opposizione al trattamento dei propri dati inviando una comunicazione a <strong>csabooks.kids@gmail.com</strong>.</p>
      `
    };
    const privacyBody = privacyBodies[language] || privacyBodies.it;

    return `
      <section class="access-section">
        <div class="wrap">
          <div class="access-hero">
            <div class="access-otto-wrap">
              <div class="access-otto-glow"></div>
              <picture>
                <source srcset="${ottoWebp}" type="image/webp">
                <img src="${ottoPng}" alt="Otto con la chiave dorata" class="access-otto-img" width="260" height="325" loading="eager">
              </picture>
            </div>
            <span class="access-badge">${esc(L('access.badge'))}</span>
            <h1 class="access-title">${esc(L('access.title'))}</h1>
            <p class="access-subtitle">${esc(L('access.subtitle'))}</p>
          </div>

          ${unlockedBox}

          <div class="access-grid">
            <!-- Percorso 1: Hai già la chiave? -->
            <article class="access-card access-card-primary">
              <span class="access-card-tag">🔑 ${esc(L('access.path1Title'))}</span>
              <h2>${esc(L('access.path1Title'))}</h2>
              <p class="access-card-text">${esc(L('access.path1Text'))}</p>
              <form class="access-form" id="form-enter-key" novalidate>
                <div class="access-field">
                  <label class="access-label" for="input-secret-key">${esc(L('access.path1Label'))}</label>
                  <div class="access-input-wrap">
                    <input type="text" id="input-secret-key" class="access-input access-input-key" placeholder="${esc(L('access.path1Placeholder'))}" autocomplete="off" spellcheck="false" required maxlength="12">
                  </div>
                </div>
                <div id="key-feedback" class="access-feedback" role="alert"></div>
                <button type="submit" class="btn btn-primary access-btn" id="btn-submit-key">
                  <span>${esc(L('access.path1Btn'))}</span> <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            </article>

            <!-- Percorso 2: Non conosci ancora la chiave? -->
            <article class="access-card">
              <span class="access-card-tag">✉ ${esc(L('access.path2Title'))}</span>
              <h2>${esc(L('access.path2Title'))}</h2>
              <p class="access-card-text">${esc(L('access.path2Text'))}</p>
              <form class="access-form" id="form-request-key" novalidate>
                <div class="access-field">
                  <label class="access-label" for="input-parent-email">${esc(L('access.path2Label'))}</label>
                  <div class="access-input-wrap">
                    <input type="email" id="input-parent-email" class="access-input" placeholder="${esc(L('access.path2Placeholder'))}" autocomplete="email" required>
                  </div>
                </div>
                <input type="text" name="website" id="honeypot-otto" style="position:absolute;left:-9999px;opacity:0" tabindex="-1" autocomplete="off" aria-hidden="true">
                <label class="access-consent" for="chk-marketing">
                  <input type="checkbox" id="chk-marketing">
                  <span>${esc(L('access.marketingConsent'))} <a href="#privacy-modal" class="privacy-link" id="trigger-privacy-modal">${esc(L('access.privacyLink'))}</a></span>
                </label>
                <div id="email-feedback" class="access-feedback" role="alert"></div>
                <button type="submit" class="btn btn-outline access-btn" id="btn-request-key">
                  <span id="btn-request-key-text">${esc(L('access.path2Btn'))}</span>
                </button>
              </form>
            </article>
          </div>

          <!-- Riquadro Assistenza e Supporto Accesso -->
          <div class="access-help-card">
            <div class="access-help-icon" aria-hidden="true">💡</div>
            <div class="access-help-content">
              <h3>${esc(L('access.helpTitle'))}</h3>
              <p>${esc(L('access.helpText'))} <a href="mailto:csabooks.kids@gmail.com?subject=Richiesta%20assistenza%20accesso%20chiave%20Otto" class="access-help-mail"><strong>csabooks.kids@gmail.com</strong></a>. ${esc(L('access.helpImmediate'))}</p>
            </div>
          </div>

          <!-- Modale Informativa Privacy -->
          <div class="privacy-modal-overlay" id="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title">
            <div class="privacy-modal-card">
              <div class="privacy-modal-header">
                <h2 id="privacy-modal-title">${esc(L('access.privacyModalTitle'))}</h2>
                <button type="button" class="privacy-modal-close" id="btn-close-privacy" aria-label="${esc(L('access.privacyModalClose'))}">&times;</button>
              </div>
              <div class="privacy-modal-body">
                ${privacyBody}
              </div>
              <div class="privacy-modal-footer">
                <button type="button" class="btn btn-outline" id="btn-close-privacy-footer">${esc(L('access.privacyModalClose'))}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function attachAccessEvents(){
    const formKey = q('#form-enter-key');
    const inputKey = q('#input-secret-key');
    const keyFeedback = q('#key-feedback');

    if(formKey && inputKey){
      formKey.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = (inputKey.value || '').trim().toUpperCase();
        if(entered === 'OTTO'){
          keyFeedback.className = 'access-feedback show success';
          keyFeedback.innerHTML = `✦ <strong>${esc(L('access.path1Success'))}</strong>`;
          setUnlocked(true);
          setTimeout(() => {
            route('inizio');
          }, 400);
        } else {
          inputKey.classList.add('shake');
          keyFeedback.className = 'access-feedback show error';
          keyFeedback.innerHTML = `✗ ${esc(L('access.path1Error'))}`;
          setTimeout(() => inputKey.classList.remove('shake'), 450);
        }
      });
    }

    const formReq = q('#form-request-key');
    const inputEmail = q('#input-parent-email');
    const chkMarketing = q('#chk-marketing');
    const honeypot = q('#honeypot-otto');
    const emailFeedback = q('#email-feedback');
    const btnReq = q('#btn-request-key');
    const btnReqText = q('#btn-request-key-text');

    if(formReq && inputEmail){
      formReq.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (inputEmail.value || '').trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!email || !emailRegex.test(email)){
          emailFeedback.className = 'access-feedback show error';
          emailFeedback.textContent = L('access.invalidEmail') || 'Inserisci un indirizzo email valido.';
          inputEmail.focus();
          return;
        }

        btnReq.disabled = true;
        const originalText = btnReqText ? btnReqText.textContent : 'RICEVI LA CHIAVE SEGRETA';
        if(btnReqText) btnReqText.textContent = L('access.path2Sending');
        emailFeedback.className = 'access-feedback show loading';
        emailFeedback.innerHTML = `<span class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></span> ${esc(L('access.path2Sending'))}`;

        const candidateUrls = window.CSA_BACKEND_URL
          ? [window.CSA_BACKEND_URL]
          : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? ['/api/send-otto-key', 'https://csabooks-kids.vercel.app/api/send-otto-key', '/api/send-bonus']
            : [
                'https://csabooks-kids.vercel.app/api/send-otto-key',
                'https://csabooks-kids-saluccimarco-3318s-projects.vercel.app/api/send-otto-key',
                '/api/send-otto-key',
                '/api/send-bonus'
              ];

        let sent = false;
        let lastErr = null;

        for(const ep of candidateUrls){
          try{
            const isSendBonus = ep.endsWith('/api/send-bonus');
            const payload = {
              email: email,
              marketingConsent: chkMarketing ? chkMarketing.checked : false,
              website: honeypot ? honeypot.value : '',
              lang: language
            };
            if(isSendBonus){
              payload.action = 'otto-key';
            }

            const res = await fetch(ep, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            });

            if(res.ok){
              const data = await res.json().catch(() => ({}));
              if(data.success !== false){
                sent = true;
                break;
              }
            } else {
              const errData = await res.json().catch(() => ({}));
              lastErr = errData.error || `HTTP ${res.status}`;
            }
          } catch(err){
            lastErr = err.message;
          }
        }

        btnReq.disabled = false;
        if(btnReqText) btnReqText.textContent = originalText;

        if(sent){
          emailFeedback.className = 'access-feedback show success';
          emailFeedback.innerHTML = `✉ <strong>${esc(L('access.path2Sent'))}</strong>`;
        } else {
          emailFeedback.className = 'access-feedback show error';
          emailFeedback.innerHTML = `${esc(L('access.sendFail'))} <a href="mailto:csabooks.kids@gmail.com?subject=Assistenza%20invio%20chiave%20Otto" style="color:#ffe4ac;text-decoration:underline">csabooks.kids@gmail.com</a>. ${esc(L('access.helpImmediate'))}`;
        }
      });
    }

    const btnRelock = q('#btn-relock');
    if(btnRelock){
      btnRelock.addEventListener('click', () => {
        setUnlocked(false);
        draw();
      });
    }

    const modal = q('#privacy-modal');
    const triggerModal = q('#trigger-privacy-modal');
    const btnClose1 = q('#btn-close-privacy');
    const btnClose2 = q('#btn-close-privacy-footer');

    const openModal = (e) => {
      if(e) e.preventDefault();
      if(modal) modal.classList.add('open');
    };
    const closeModal = () => {
      if(modal) modal.classList.remove('open');
    };

    if(triggerModal) triggerModal.addEventListener('click', openModal);
    if(btnClose1) btnClose1.addEventListener('click', closeModal);
    if(btnClose2) btnClose2.addEventListener('click', closeModal);
    if(modal){
      modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
      });
    }
  }

  function notFound(){return `<div class="wrap error-card"><h2>${esc(L('errors.notFound'))}</h2>${btn(L('actions.returnHome'),url('inizio'))}</div>`;}
  function draw(){
    setNav(); footer();
    const p=page();const sc=pageId('sc');const id=pageId('id');
    const unlocked = isUnlocked();

    if(!unlocked || p==='accesso'){
      app.innerHTML = renderAccess(unlocked);
      attachAccessEvents();
      document.title = esc(L('access.title')) + ' | ' + currentBookTitle();
      document.documentElement.lang = language;
      return;
    }

    if(p==='inizio')app.innerHTML=renderHome();
    else if(p==='bonus')app.innerHTML=renderBonusGrid();
    else if(p==='bonus-dettaglio')app.innerHTML=renderBonus(id);
    else if(p==='fonti'){app.innerHTML=renderSources();drawSourceCards();}
    else if(p==='fonte'){const source=sources.find(x=>x.codice===sc);app.innerHTML=source?renderSource(source):notFound();if(source)checkSourcePDF(source.codice);}
    else app.innerHTML=notFound();
    document.title=(p==='fonte'?sc+' — ':p==='bonus-dettaglio'&&t.bonus[id]?t.bonus[id].title+' — ':'')+currentSiteTitle()+' | '+currentBookTitle();
    document.documentElement.lang=language;
  }
  async function loadLocale(l){
    const [pack,rows,integ]=await Promise.all([
      loadJSON('i18n/'+l+'.json'),
      loadCSV('content/fonti_'+l+'.csv'),
      loadJSON('content/fonti_integrative.json').catch(()=>[])
    ]);
    t=pack;
    integrativeSources=Array.isArray(integ)?integ:[];
    sources=rows.map(x=>({codice:x.codice?.trim(),titolo:x.titolo?.trim(),categoria:x.categoria?.trim()||'introduzione',citazione:x.citazione?.trim(),url:x.url?.trim(),correzioni:x.correzioni?.trim()})).filter(x=>/^(SC-\d{2}|EX-\d{2})$/.test(x.codice));
    language=l;
  }
  function detectLocale(enabled){
    const urlLang = new URL(location.href).searchParams.get('lang');
    if(urlLang && enabled.includes(urlLang)) return urlLang;
    try {
      const stored = localStorage.getItem('otto_lang');
      if(stored && enabled.includes(stored)) return stored;
    } catch(_) {}
    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if(navLang.startsWith('en') && enabled.includes('en')) return 'en';
    if(navLang.startsWith('it') && enabled.includes('it')) return 'it';
    if(navLang.startsWith('fr') && enabled.includes('fr')) return 'fr';
    if(navLang.startsWith('es') && enabled.includes('es')) return 'es';
    return config?.defaultLocale || 'it';
  }
  async function init(){
    try{
      config=await loadJSON('config/site.json');
      const enabled = config.enabledLocales || ['it', 'en'];
      const locale = detectLocale(enabled);
      await loadLocale(locale);
      try { localStorage.setItem('otto_lang', locale); } catch(_) {}
      const urlLang = new URL(location.href).searchParams.get('lang');
      if(!urlLang || urlLang !== locale){
        history.replaceState({}, '', url(page(), { id: pageId('id'), sc: pageId('sc') }));
      }
      draw();
    }catch(err){console.error(err);app.innerHTML=`<section class="error-card"><h2>Impossibile caricare il portale</h2><p>Controlla che il sito sia aperto tramite un server web e che siano presenti config/site.json, i18n/it.json e content/fonti_it.csv. Aprire index.html direttamente dal disco (file://) non funziona.</p><p style="font-size:11px;color:#ffdc93">${esc(err.message)}</p><button class="btn btn-primary" type="button" onclick="location.reload()">Riprova</button></section>`;}
  }
  document.addEventListener('click', async e=>{
    const flagBtn = e.target.closest('[data-switch-lang]');
    if(flagBtn){
      const targetCode = flagBtn.dataset.switchLang;
      if(targetCode === language) return;
      const enabled = config?.enabledLocales || ['it', 'en'];
      if(enabled.includes(targetCode)){
        try { localStorage.setItem('otto_lang', targetCode); } catch(_) {}
        await loadLocale(targetCode);
        state.filter = 'all'; state.limit = 12; state.query = '';
        history.pushState({}, '', url(page(), { id: pageId('id'), sc: pageId('sc') }));
        draw();
      } else {
        showToast(L('notices.langInPrep') || (language === 'en' ? 'The book edition in this language is in preparation!' : 'L’edizione in questa lingua è in preparazione!'));
      }
      return;
    }
    const menu=e.target.closest('#menu-toggle');if(menu){let nav=q('#nav-links');const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?L('nav.closeMenu'):L('nav.openMenu'));return;}
    const filter=e.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;state.limit=12;q('.filter-row').querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===filter)));drawSourceCards();return;}
    const more=e.target.closest('#more-sources');if(more){state.limit+=12;drawSourceCards();return;}
    const b=e.target.closest('a[data-bonus]');if(b){e.preventDefault();if(b.dataset.bonus==='film'){location.href=currentBonusURL('film');return;}route('bonus-dettaglio',{id:b.dataset.bonus});return;}
    const s=e.target.closest('a[data-source]');if(s){e.preventDefault();route('fonte',{sc:s.dataset.source});return;}
    const n=e.target.closest('a[data-internal]');if(n){e.preventDefault();route(n.dataset.internal);return;}
    const a=e.target.closest('a[href^="?pagina="]');if(a){e.preventDefault();const u=new URL(a.href);const p=u.searchParams.get('pagina')||'inizio';route(p,{id:u.searchParams.get('id'),sc:u.searchParams.get('sc')});}
  });
  document.addEventListener('input',e=>{if(e.target.id==='search-sources'){state.query=e.target.value;state.limit=12;drawSourceCards();}});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const m=q('#privacy-modal');
      if(m&&m.classList.contains('open'))m.classList.remove('open');
    }
  });
  document.addEventListener('change',async e=>{
    if(e.target.id!=='language')return;
    const next=e.target.value;if(!(config.enabledLocales||[]).includes(next))return;
    try{await loadLocale(next);state.filter='all';state.limit=12;state.query='';history.pushState({},'',url(page(),{id:pageId('id'),sc:pageId('sc')}));draw();}
    catch(err){console.error('Language not yet published:',err);alert('Lingua non ancora pronta: aggiungi content/fonti_'+next+'.csv prima di abilitarla.');}
  });
  window.addEventListener('popstate',()=>{if(config)draw();});
  init();
})();
