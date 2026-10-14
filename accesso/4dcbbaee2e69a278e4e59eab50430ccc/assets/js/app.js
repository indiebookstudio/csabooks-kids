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
  let config, t, sources = [], language = 'it';
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
  function bonusButtons(id){
    const loc = language;
    // Bonus in other languages should be added under bonus/{locale}/ before enabling that locale.
    const avail = loc==='it';
    if(!avail)return `<p class="source-pdf-status">${esc(L('actions.comingSoon'))}</p>`;
    const extras=[];
    if(id==='missioni')extras.push(btn(L('actions.downloadMissions'),currentBonusURL(id),'primary','download'));
    if(id==='museo')extras.push(btn(L('actions.openMuseum'),currentBonusURL(id),'primary'));
    if(id==='film')extras.push(btn(L('actions.watchFilms'),currentBonusURL(id),'primary'));
    if(id==='colora')extras.push(btn(L('actions.downloadColor'),currentBonusURL(id),'primary','download'));
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
  function setNav(){
    const current=page();
    const items=[['inizio',L('nav.home')],['bonus',L('nav.bonus')],['fonti',L('nav.sources')]];
    q('#nav-links').innerHTML=items.map(([p,label])=>`<a class="nav-link ${current===p||(current==='bonus-dettaglio'&&p==='bonus')||(current==='fonte'&&p==='fonti')?'active':''}" href="${url(p)}" data-internal="${p}" ${current===p?'aria-current="page"':''}>${esc(label)}</a>`).join('');
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
    return `<section class="hero"><div class="wrap hero-inner"><div class="hero-copy">${stamp(L('brand.eyebrow'))}<h1><span>${esc(L('brand.title'))}</span><span class="gold-text">${esc(L('brand.titleEm'))}</span></h1><p class="hero-intro">${esc(L('brand.intro'))}</p><p class="hero-description">${esc(L('brand.subtitle'))}</p><div class="hero-actions">${btn(L('brand.ctaExplore'),url('bonus'))}${btn(L('brand.ctaSources'),url('fonti'),'outline')}</div><p class="hero-beneath"><span class="dot"></span>${esc(L('brand.age'))}</p></div><div class="hero-visual" aria-hidden="true"><div class="hero-halo"></div><img class="book-cover" src="${esc(config.bookCover)}" alt=""><img class="hero-otto" src="${esc(config.mascot)}" alt=""><span class="hero-stamp">OTTO · DISCOVERY CLUB</span></div></div></section>
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
    return `<article class="source-card"><a href="${url('fonte',{sc:s.codice})}" data-source="${code}" aria-label="${code}: ${title}"><div class="source-card-art"><img src="media/fonti/${code}.webp" alt="" width="660" height="440" loading="lazy" onerror="this.onerror=null;this.src='media/temi/${esc(s.categoria)}.webp'"><span class="source-code">${code}</span></div><div class="source-card-body"><h3>${title}</h3><p>${esc(s.citazione)}</p><div class="source-card-footer"><span class="source-card-category">${esc(L('categories.'+s.categoria))}</span><span>${esc(L('actions.learnMore'))} ↗</span></div></div></a></article>`;
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
    return `<section class="sources-intro"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.sources')])}${stamp(L('sections.sourceEyebrow'))}<h1>${esc(L('sections.sourceTitle'))}</h1><p class="page-description">${esc(L('sections.sourceSubtitle'))}</p><div class="source-toolbar"><label class="search-wrap" for="search-sources"><span class="search-icon" aria-hidden="true">⌕</span><input class="search-input" id="search-sources" type="search" autocomplete="off" placeholder="${esc(L('sourceUi.searchPlaceholder'))}" aria-label="${esc(L('sourceUi.searchLabel'))}" value="${esc(state.query)}"></label><div class="filter-row" aria-label="${esc(L('sourceUi.category'))}">${categories.map(k=>`<button class="chip" type="button" data-filter="${k}" aria-pressed="${state.filter===k?'true':'false'}">${esc(L('categories.'+k))}</button>`).join('')}</div></div><p class="results-line" id="source-count" aria-live="polite"></p><div class="sources-grid" id="source-results"></div><div class="show-more"><button id="more-sources" class="btn btn-outline" type="button">${esc(L('sourceUi.showMore'))} ↓</button></div><div class="wide-info"><h3>${esc(L('sections.sourceWhyTitle'))}</h3><p>${esc(L('sections.sourceWhyText'))}</p></div></div></section>`;
  }
  function linkedCorrections(s){
    const raw=String(s.correzioni||'');if(!raw)return '';
    // Render human-authored CSV note safely, and link verified protocol URLs only.
    const parts=raw.split(/(https?:\/\/[^\s]+)/g);
    const result=parts.map(x=>linkOK(x)?`<a href="${esc(x)}" rel="noopener noreferrer" target="_blank">${esc(x)}</a>`:esc(x)).join('');
    return `<div class="citation-card"><h3>${esc(L('actions.correction'))}</h3><p>${result}</p></div>`;
  }
  function renderSource(s){
    const official=linkOK(s.url)?btn(L('actions.openOfficial'),s.url,'outline','target="_blank" rel="noopener noreferrer"'):`<span class="source-pdf-status">${esc(L('actions.linkUnavailable'))}</span>`;
    return `<section class="page-top"><div class="wrap">${breadcrumb([L('nav.home'),L('nav.sources'),s.codice])}</div></section><section class="wrap source-detail"><div class="source-image"><img src="media/fonti/${esc(s.codice)}.webp" alt="${esc(L('actions.sourceIllustration'))}" width="660" height="440" onerror="this.onerror=null;this.src='media/temi/${esc(s.categoria)}.webp'"><div class="source-caption">${esc(L('actions.sourceIllustration'))}</div></div><div class="source-detail-info"><span class="source-badge">${esc(s.codice)}</span><h1>${esc(s.titolo)}</h1><p class="detail-meta">${esc(L('categories.'+s.categoria))}</p><div class="citation-card"><h3>${esc(L('sourceUi.citation'))}</h3><p>${esc(s.citazione)}</p></div>${linkedCorrections(s)}<div class="source-buttons">${official}<a id="source-pdf-link" class="btn btn-plain" role="button" aria-disabled="true" tabindex="-1">${esc(L('actions.downloadSource'))} ↓</a></div><p class="source-pdf-status" id="source-pdf-status" role="status">${esc(L('actions.sourceChecking'))}</p><p class="source-pdf-help">${esc(L('actions.sourcePdfHelp'))} <code>${esc(s.codice)}.pdf</code></p><div class="minor-links">${btn(L('actions.backSources'),url('fonti'),'outline')}</div></div></section>`;
  }
  async function checkSourcePDF(code){
    const el=q('#source-pdf-link'),status=q('#source-pdf-status');if(!el||!status)return;
    const file=(config.sourcePdfDirectory||'downloads/fonti/')+code+'.pdf';
    try{
      const res=await fetch(file,{method:'HEAD',cache:'no-store'});
      const mime=(res.headers.get('content-type')||'').toLowerCase();
      // Some static hosts serve PDFs as octet-stream. HTML or 404 is not a source PDF.
      const valid=res.ok&&(mime.includes('pdf')||mime.includes('octet-stream'));
      if(page()!=='fonte'||pageId('sc')!==code)return;
      if(valid){el.href=file;el.setAttribute('download',code+'.pdf');el.className='btn btn-primary';el.removeAttribute('aria-disabled');el.removeAttribute('tabindex');status.textContent=L('actions.sourceAvailable');}
      else{el.removeAttribute('href');el.className='btn btn-plain';el.setAttribute('aria-disabled','true');el.setAttribute('tabindex','-1');status.textContent=L('actions.sourceUnavailable');}
    }catch(_){if(status&&page()==='fonte'&&pageId('sc')===code)status.textContent=L('actions.sourceUnavailable');}
  }
  function notFound(){return `<div class="wrap error-card"><h2>${esc(L('errors.notFound'))}</h2>${btn(L('actions.returnHome'),url('inizio'))}</div>`;}
  function draw(){
    setNav(); footer();
    const p=page();const sc=pageId('sc');const id=pageId('id');
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
    const [pack,rows]=await Promise.all([loadJSON('i18n/'+l+'.json'),loadCSV('content/fonti_'+l+'.csv')]);
    t=pack;sources=rows.map(x=>({codice:x.codice?.trim(),titolo:x.titolo?.trim(),categoria:x.categoria?.trim()||'introduzione',citazione:x.citazione?.trim(),url:x.url?.trim(),correzioni:x.correzioni?.trim()})).filter(x=>/^SC-\d{2}$/.test(x.codice));language=l;
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
  document.addEventListener('change',async e=>{
    if(e.target.id!=='language')return;
    const next=e.target.value;if(!(config.enabledLocales||[]).includes(next))return;
    try{await loadLocale(next);state.filter='all';state.limit=12;state.query='';history.pushState({},'',url(page(),{id:pageId('id'),sc:pageId('sc')}));draw();}
    catch(err){console.error('Language not yet published:',err);alert('Lingua non ancora pronta: aggiungi content/fonti_'+next+'.csv prima di abilitarla.');}
  });
  window.addEventListener('popstate',()=>{if(config)draw();});
  init();
})();
