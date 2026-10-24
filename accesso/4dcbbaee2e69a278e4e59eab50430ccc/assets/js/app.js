/* EINSTEIN QR PORTAL — static, data-driven, no frameworks, no build step.
   To update files: replace media/copertina.webp, bonus/{lang}/..., downloads/fonti/SC-XX.pdf.
   To edit text: i18n/{lang}.json and content/fonti_{lang}.csv. */
'use strict';
(() => {
  const q = sel => document.querySelector(sel);
  const app = q('#app');
  const localeLabels = {it:'IT · Italiano',en:'EN · English',fr:'FR · Français',es:'ES · Español'};
  const categories = ['all','animali','piante','esperimenti','dinosauri','tecnologia','corpo','spazio','introduzione'];
  const cards = ['missioni','museo','film','colora','carte'];
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
    return ({missioni:base+'missioni/missioni.pdf',museo:base+'museo/index.html',film:base+'film/index.html',colora:base+'colora/colora.pdf',carte:base+'carte/index.html'})[id];
  }
  function currentBookCover(locale=language){
    if(config?.bookCovers && config.bookCovers[locale]) return config.bookCovers[locale];
    return config?.bookCover || 'media/copertina.webp';
  }
  function bonusButtons(id){
    const loc = language;
    // Bonus in other languages should be added under bonus/{locale}/ before enabling that locale.
    const avail = loc==='it';
    if(!avail)return `<p class="source-pdf-status">${esc(L('actions.comingSoon'))}</p>`;
    const extras=[];
    if(id==='missioni')extras.push(btn(L('actions.downloadMissions'),currentBonusURL(id),'primary','download'));
    if(id==='museo')extras.push(btn(L('actions.openMuseum'),currentBonusURL(id),'primary'));
    if(id==='film')extras.push(btn(L('actions.watchFilms'),currentBonusURL(id),'primary'));
    if(id==='colora')extras.push(btn(L('actions.downloadColor'),currentBonusURL(id),'primary','download="Disegni.Da.Colorare.pdf"'));
    if(id==='carte'){
      extras.push(btn(L('actions.playOnline'),currentBonusURL(id),'primary'));
      extras.push(btn(L('actions.downloadCards'),`bonus/${loc}/carte/OTTO_CARTE_36_FRONTE_RETRO_A4.pdf`,'outline','download'));
      extras.push(btn(L('actions.downloadRules'),`bonus/${loc}/carte/OTTO_GUIDA_REGOLE_E_SOLUZIONI.pdf`,'outline','download'));
    }
    return extras.join('');
  }
  function route(name, data={}){
    history.pushState({},'',url(name,data));draw();window.scrollTo({top:0,behavior:'instant'});
    const menu=q('#nav-links');if(menu) menu.classList.remove('open');
    const toggle=q('#menu-toggle');if(toggle)toggle.setAttribute('aria-expanded','false');
  }
  function isUnlocked(){try{return localStorage.getItem('otto_unlocked')==='true';}catch(_){return false;}}
  function setUnlocked(v){try{if(v)localStorage.setItem('otto_unlocked','true');else localStorage.removeItem('otto_unlocked');}catch(_){}}
  function setNav(){
    const current=page();
    const items=[['inizio',L('nav.home')],['bonus',L('nav.bonus')],['fonti',L('nav.sources')]];
    let links=items.map(([p,label])=>`<a class="nav-link ${current===p||(current==='bonus-dettaglio'&&p==='bonus')||(current==='fonte'&&p==='fonti')?'active':''}" href="${url(p)}" data-internal="${p}" ${current===p?'aria-current="page"':''}>${esc(label)}</a>`).join('');
    q('#nav-links').innerHTML=links;
    const allowed=config.enabledLocales||['it'];
    q('#language-select').innerHTML=allowed.length>1?`<label for="language" class="visually-hidden">${esc(L('footer.lang'))}</label><select class="locale-select" id="language" aria-label="${esc(L('footer.lang'))}">${allowed.map(l=>`<option value="${esc(l)}" ${language===l?'selected':''}>${esc(localeLabels[l]||l.toUpperCase())}</option>`).join('')}</select>`:`<span class="locale-select" aria-label="${esc(L('footer.lang'))}">${esc(localeLabels[language]||language.toUpperCase())}</span>`;
  }
  function footer(){
    q('#site-footer').innerHTML=`<div class="wrap"><div class="footer-grid"><div><div class="footer-tag">${esc(L('footer.tag'))}</div><p>${esc(L('footer.text'))}</p><p>${esc(L('footer.privacy'))}</p></div><div class="footer-links"><a href="${url('inizio')}" data-internal="inizio">${esc(L('nav.home'))}</a><a href="${url('fonti')}" data-internal="fonti">${esc(L('nav.sources'))}</a>${linkOK(config.contactUrl)?`<a href="${esc(config.contactUrl)}" target="_blank" rel="noopener noreferrer">${esc(L('footer.official'))} ↗</a>`:''}</div></div><div class="footer-bottom">${esc(L('footer.legal'))}</div></div>`;
  }
  function card(id,i){
    const b=t.bonus[id];return `<article class="bonus-card ${i===0?'feature':''}"><a href="${url('bonus-dettaglio',{id})}" data-bonus="${id}" aria-label="${esc(b.title)}"><div class="bonus-art"><img src="media/bonus/${id}.webp" loading="lazy" alt="" width="1100" height="700"><span class="bonus-number">0${i+1}</span></div><div class="bonus-body"><div class="bonus-tag">${esc(b.tag)}</div><h3>${esc(b.title)}</h3><p class="bonus-desc">${esc(b.description)}</p><div class="bonus-foot"><span>${esc(L('sections.enter'))}</span><span class="icon-arrow" aria-hidden="true">↗</span></div></div></a></article>`;
  }
  function renderHome(){
    return `<section class="hero"><div class="wrap hero-inner"><div class="hero-copy">${stamp(L('brand.eyebrow'))}<h1><span>${esc(L('brand.title'))}</span><span class="gold-text">${esc(L('brand.titleEm'))}</span></h1><p class="hero-intro">${esc(L('brand.intro'))}</p><p class="hero-description">${esc(L('brand.subtitle'))}</p><div class="hero-actions">${btn(L('brand.ctaExplore'),url('bonus'))}${btn(L('brand.ctaSources'),url('fonti'),'outline')}</div><p class="hero-beneath"><span class="dot"></span>${esc(L('brand.age'))}</p></div><div class="hero-visual" aria-hidden="true"><div class="hero-halo"></div><img class="book-cover" src="${esc(currentBookCover())}" alt="${esc(config.bookTitle)}" onerror="this.onerror=null;this.src='media/copertina.webp'"><img class="hero-otto" src="${esc(config.mascot)}" alt=""><span class="hero-stamp">OTTO · DISCOVERY CLUB</span></div></div></section>
      <section class="section ornate-rule" id="bonus"><div class="wrap"><div class="section-top"><div class="section-heading">${stamp(L('sections.bonusEyebrow'))}<h2>${esc(L('sections.bonusTitle'))}</h2><p class="section-subtitle">${esc(L('sections.bonusSubtitle'))}</p></div></div><div class="cards">${cards.map(card).join('')}</div></div></section>
      <section class="section section-quiet" id="biblioteca"><div class="wrap"><div class="sources-teaser"><div>${stamp(L('sections.sourceEyebrow'))}<h2>${esc(L('sections.sourceWhyTitle'))}</h2><p>${esc(L('sections.sourceWhyText'))}</p><p>${esc(L('sections.sourcesCount'))}</p>${btn(L('sections.viewAllSources'),url('fonti'))}</div><img loading="lazy" src="media/bonus/fonti.webp" alt="" width="660" height="440"></div></div></section>
      <section class="section"><div class="wrap"><div class="mission-preview"><img src="media/otto-mondo.webp" loading="lazy" alt="" width="140" height="140"><div>${stamp(L('brand.welcome'))}<h3>${esc(L('sections.bundleTitle'))}</h3><p>${esc(L('sections.bundleText'))}</p></div></div></div></section>`;
  }
  function renderBonusGrid(){return `<section class="page-top"><div class="wrap page-header">${breadcrumb([L('nav.home'),L('nav.bonus')])}${stamp(L('sections.bonusEyebrow'))}<h1>${esc(L('sections.bonusTitle'))}</h1><p class="page-description">${esc(L('sections.bonusSubtitle'))}</p></div></section><section class="section"><div class="wrap"><div class="cards">${cards.map(card).join('')}</div></div></section>`;}
  function breadcrumb(parts){return `<div class="breadcrumb"><a href="${url('inizio')}" data-internal="inizio">${esc(parts[0]||L('nav.home'))}</a> <span aria-hidden="true">/</span> <span>${esc(parts.slice(1).join(' / '))}</span></div>`;}
  function renderBonus(id){
    const b=t.bonus[id];if(!b)return notFound();
    const img=`media/bonus/${id}.webp`;
    return `<section class="page-top"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.bonus'),b.title])}</div></section><section class="wrap detail-hero"><div class="detail-art"><img src="${img}" alt="" width="1100" height="700"></div><div class="detail-content">${stamp(b.tag)}<h1>${esc(b.title)}</h1><p class="detail-subtitle">${esc(b.subtitle)}</p><p class="detail-text">${esc(b.detail)}</p><div class="detail-actions">${bonusButtons(id)}</div><div class="minor-links">${btn(L('actions.goBack'),url('bonus'),'outline')}</div></div></section>`;
  }
  function sourceCard(s){
    const code=esc(s.codice),title=esc(s.titolo);
    const integCount = integrativeSources.filter(x => x.parent === s.codice).length;
    const integBadge = integCount > 0 ? `<span class="source-card-integ">+${integCount} ${integCount===1?'correlata':'correlate'}</span>` : '';
    return `<article class="source-card"><a href="${url('fonte',{sc:s.codice})}" data-source="${code}" aria-label="${code}: ${title}"><div class="source-card-art"><img src="media/fonti/${code}.webp" alt="${title}" width="660" height="440" loading="lazy" onerror="this.onerror=null;this.src='media/temi/${esc(s.categoria)}.webp'"></div><div class="source-card-body"><div class="source-card-topbar"><span class="source-code">${code}</span><span class="source-card-category">${esc(L('categories.'+s.categoria))}</span></div><h3>${title}</h3><p>${esc(s.citazione)}</p><div class="source-card-footer">${integBadge}<span class="source-card-more">${esc(L('actions.learnMore'))} ↗</span></div></div></a></article>`;
  }
  function filteredSources(){let q0=state.query.trim().toLocaleLowerCase(language);return sources.filter(s=>(state.filter==='all'||s.categoria===state.filter)&&(!q0||[s.codice,s.titolo,s.citazione,s.categoria,s.url].join(' ').toLocaleLowerCase(language).includes(q0)));}
  function drawSourceCards(){
    let items=filteredSources(), visible=items.slice(0,state.limit);
    const el=q('#source-results');if(!el)return;
    q('#source-count').textContent=`${items.length} ${L('sourceUi.results')}`;
    el.innerHTML=visible.length?visible.map(sourceCard).join(''):`<div class="empty-state">${esc(L('sourceUi.none'))}</div>`;
    const more=q('#more-sources');if(more){more.hidden=items.length<=state.limit;more.disabled=items.length<=state.limit;}
  }
  function renderSources(){
    const dir = config?.sourcePdfDirectory || 'downloads/fonti/';
    const registryBanner = `
      <div class="sources-registry-banner">
        <div class="sources-registry-copy">
          <strong>📋 Archivio Completo delle Fonti (57 schede e 80 documenti)</strong>
          <p>Tutti i PDF originali e le stampe sono archiviati per la consultazione e il download.</p>
        </div>
        <div class="sources-registry-actions">
          <a href="${esc(dir)}INDICE.html" target="_blank" class="btn btn-outline btn-sm">Indice generale PDF ↗</a>
          <a href="${esc(dir)}REGISTRO_FONTI.csv" download class="btn btn-plain btn-sm">Registro CSV ↓</a>
        </div>
      </div>
    `;
    return `<section class="sources-intro"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.sources')])}${stamp(L('sections.sourceEyebrow'))}<h1>${esc(L('sections.sourceTitle'))}</h1><p class="page-description">${esc(L('sections.sourceSubtitle'))}</p>${registryBanner}<div class="source-toolbar"><label class="search-wrap" for="search-sources"><span class="search-icon" aria-hidden="true">⌕</span><input class="search-input" id="search-sources" type="search" autocomplete="off" placeholder="${esc(L('sourceUi.searchPlaceholder'))}" aria-label="${esc(L('sourceUi.searchLabel'))}" value="${esc(state.query)}"></label><div class="filter-row" aria-label="${esc(L('sourceUi.category'))}">${categories.map(k=>`<button class="chip" type="button" data-filter="${k}" aria-pressed="${state.filter===k?'true':'false'}">${esc(L('categories.'+k))}</button>`).join('')}</div></div><p class="results-line" id="source-count" aria-live="polite"></p><div class="sources-grid" id="source-results"></div><div class="show-more"><button id="more-sources" class="btn btn-outline" type="button">${esc(L('sourceUi.showMore'))} ↓</button></div><div class="wide-info"><h3>${esc(L('sections.sourceWhyTitle'))}</h3><p>${esc(L('sections.sourceWhyText'))}</p></div></div></section>`;
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
  function renderIntegrativeSection(code){
    const items = integrativeSources.filter(x => x.parent === code);
    if(!items.length) return '';
    const dir = config?.sourcePdfDirectory || 'downloads/fonti/';
    return `
      <div class="citation-card integrative-card">
        <div class="integrative-header">
          <h3>📚 Fonti integrative e materiali correlati (${items.length})</h3>
          <p class="integrative-intro">Approfondimenti, studi scientifici collegati, preprints o note degli autori archiviati:</p>
        </div>
        <div class="integrative-list">
          ${items.map(it => `
            <div class="integrative-item">
              <div class="integrative-meta">
                <span class="integrative-code">${esc(it.code)}</span>
                <span class="integrative-title">${esc(it.tipo || it.scheda)}</span>
                <span class="integrative-pages">${it.pagine ? esc(it.pagine) + ' pag.' : ''}</span>
              </div>
              ${it.autore ? `<p class="integrative-author"><strong>Autori/Origine:</strong> ${esc(it.autore)}</p>` : ''}
              ${it.doi ? `<p class="integrative-doi"><strong>DOI:</strong> <a href="https://doi.org/${esc(it.doi)}" target="_blank" rel="noopener noreferrer">${esc(it.doi)}</a></p>` : ''}
              ${it.nota ? `<p class="integrative-note">${esc(it.nota)}</p>` : ''}
              <div class="integrative-actions">
                <a href="${esc(dir + it.file)}" download="${esc(it.file.split('/').pop())}" class="btn btn-primary btn-sm">Scarica PDF (${esc(it.pagine)} pag.) ↓</a>
                ${linkOK(it.url) ? `<a href="${esc(it.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">Consulta online ↗</a>` : ''}
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
    const imageCredit = s.codice === 'SC-55' ? 'Credito immagine: EHT Collaboration / ESO (2019), CC BY 4.0' : esc(L('actions.sourceIllustration'));
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
              <p class="access-card-text">Inserisci la parola segreta per sbloccare immediatamente l'accesso a tutti i bonus del libro.</p>
              <form class="access-form" id="form-enter-key" novalidate>
                <div class="access-field">
                  <label class="access-label" for="input-secret-key">${esc(L('access.path1Label'))}</label>
                  <div class="access-input-wrap">
                    <input type="text" id="input-secret-key" class="access-input access-input-key" placeholder="${esc(L('access.path1Placeholder'))}" autocomplete="off" autocapitalize="characters" spellcheck="false" required maxlength="12">
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
                  <input type="checkbox" id="chk-marketing" checked>
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
              <p>${esc(L('access.helpText'))} <a href="mailto:csabooks.kids@gmail.com?subject=Richiesta%20assistenza%20accesso%20chiave%20Otto" class="access-help-mail"><strong>csabooks.kids@gmail.com</strong></a>. Ti aiuteremo subito!</p>
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
          emailFeedback.textContent = 'Inserisci un indirizzo email valido.';
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
          emailFeedback.innerHTML = `Non è stato possibile inviare la chiave. Scrivici direttamente a <a href="mailto:csabooks.kids@gmail.com?subject=Assistenza%20invio%20chiave%20Otto" style="color:#ffe4ac;text-decoration:underline">csabooks.kids@gmail.com</a> e te la invieremo subito!`;
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
      document.title = esc(L('access.title')) + ' | ' + config.bookTitle;
      document.documentElement.lang = language;
      return;
    }

    if(p==='inizio')app.innerHTML=renderHome();
    else if(p==='bonus')app.innerHTML=renderBonusGrid();
    else if(p==='bonus-dettaglio')app.innerHTML=renderBonus(id);
    else if(p==='fonti'){app.innerHTML=renderSources();drawSourceCards();}
    else if(p==='fonte'){const source=sources.find(x=>x.codice===sc);app.innerHTML=source?renderSource(source):notFound();if(source)checkSourcePDF(source.codice);}
    else app.innerHTML=notFound();
    document.title=(p==='fonte'?sc+' — ':p==='bonus-dettaglio'&&t.bonus[id]?t.bonus[id].title+' — ':'')+config.siteTitle+' | '+config.bookTitle;
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
  async function init(){
    try{
      config=await loadJSON('config/site.json');
      const requested=pageId('lang')||new URL(location.href).searchParams.get('lang')||config.defaultLocale||'it';
      const locale=(config.enabledLocales||['it']).includes(requested)?requested:(config.defaultLocale||'it');
      await loadLocale(locale);
      if(!(config.enabledLocales||[]).includes(requested)&&requested!==locale){history.replaceState({},'',url(page(),{id:pageId('id'),sc:pageId('sc')}));}
      draw();
    }catch(err){console.error(err);app.innerHTML=`<section class="error-card"><h2>Impossibile caricare il portale</h2><p>Controlla che il sito sia aperto tramite un server web e che siano presenti config/site.json, i18n/it.json e content/fonti_it.csv. Aprire index.html direttamente dal disco (file://) non funziona.</p><p style="font-size:11px;color:#ffdc93">${esc(err.message)}</p><button class="btn btn-primary" type="button" onclick="location.reload()">Riprova</button></section>`;}
  }
  document.addEventListener('click',e=>{
    const menu=e.target.closest('#menu-toggle');if(menu){let nav=q('#nav-links');const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));return;}
    const filter=e.target.closest('[data-filter]');if(filter){state.filter=filter.dataset.filter;state.limit=12;q('.filter-row').querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el===filter)));drawSourceCards();return;}
    const more=e.target.closest('#more-sources');if(more){state.limit+=12;drawSourceCards();return;}
    const b=e.target.closest('a[data-bonus]');if(b){e.preventDefault();route('bonus-dettaglio',{id:b.dataset.bonus});return;}
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
