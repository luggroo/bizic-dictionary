/* Localize interface text without rewriting source records or event values. */
'use strict';
(() => {
  let language = 'zh';
  try { if (localStorage.getItem('tujia-ui-language') === 'en') language = 'en'; } catch {}
  function urlLanguage() {
    const value = new URLSearchParams(location.search).get('lang');
    return value === 'en' || value === 'zh' ? value : null;
  }
  language = urlLanguage() || language;
  const script = document.currentScript || document.querySelector('script[src*="ui-language.js"]');
  const siteRoot = new URL('.', script?.src || location.href);
  function syncLanguageURL() {
    const url = new URL(location.href);
    if (url.searchParams.get('lang') === language) return;
    url.searchParams.set('lang', language);
    history.replaceState(history.state, '', url);
  }
  function localizeLinks() {
    for (const link of document.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || link.hasAttribute('download')) continue;
      const url = new URL(href, location.href);
      if (url.origin !== siteRoot.origin || !url.pathname.startsWith(siteRoot.pathname) || !/(?:\/|\.html)$/.test(url.pathname)) continue;
      url.searchParams.set('lang', language);
      const localized = url.pathname + url.search + url.hash;
      if (href !== localized) link.setAttribute('href', localized);
    }
  }
  const labels = Object.freeze({
    brand: 'bifzixsar afhxix', home: 'ger laix xief', words: 'cixcix nix', grammar: 'sar qifmox lir',
    notation: 'sar qifmox af', corpus: 'lafzef lafzef lir', sources: 'cixpux jierxif',
    // Search action wording approved for this interface; not a source quotation.
    searchEn: 'yinxyiv niv-xivsour', searchZh: 'pavsar niv-xivsour', searchTujia: 'bifsar niv-xivsour',
    history: 'nierzuxbarzux niex sar', search: 'nix'
  });
  const homeAccents={"brand":"bízīsǎ áhxī","home":"gě lāi xié","words":"cīcī nī","grammar":"sǎ qímō lǐ","notation":"sǎ qímō á","corpus":"lázé lázé lǐ","sources":"cīpū jiěxí","searchEn":"yīnyì nì-xìsǒu","searchZh":"pàsǎ nì-xìsǒu","searchTujia":"bísǎ nì-xìsǒu","history":"niězūbǎzū niē sǎ","search":"nī"};
  let initialSpelling="accent";try{if(localStorage.getItem("tujia-north-spelling-v2")==="ye")initialSpelling="ye"}catch{}
  const textMemory = new WeakMap(), attributeMemory = new WeakMap(), grammarMemory = new WeakMap();
  const protectedContent = 'script,style,textarea,code,pre,[data-ui-content],[data-ui-tujia],.word,.word-ipa,.notation-form,.source-word-record p,.text-view,.lyric-tujia,.lyric-translation,.lyric-chinese,.external-ipa,.external-glosses,.external-text-block>p,.example,.grammar-example';
  const escapeRE = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let templateCount=-1,templates=[];
  function updateTemplates(){if(templateCount===Object.keys(UI_TRANSLATIONS).length)return;templateCount=Object.keys(UI_TRANSLATIONS).length;
  templates = Object.entries(UI_TRANSLATIONS).filter(([s]) => /\{\w+\}/.test(s)).map(([source, target]) => {
    const names = [], pieces = source.split(/(\{\w+\})/g);
    const pattern = pieces.map(p => /^\{\w+\}$/.test(p) ? (names.push(p.slice(1,-1)), '(.+?)') : escapeRE(p)).join('');
    return {re: new RegExp('^' + pattern + '$'), names, target};
  });
  }
  updateTemplates();
  function translate(source) {
    if (language !== 'en') return source;
    const trim = source.trim();
    if (!trim) return source;
    let translated = UI_TRANSLATIONS[trim];
    if (!translated) for (const {re,names,target} of templates) {
      const match = trim.match(re);
      if (!match) continue;
      translated = target.replace(/\{(\w+)\}/g, (_,key) => {
        const value = match[names.indexOf(key) + 1];
        return UI_TRANSLATIONS[value] || value;
      });
      break;
    }
    // Chapter numbers and link arrows are presentation, not part of the title.
    if (!translated) {
      const separated = trim.match(/^(·\s*)(.+)$/);
      if (separated) translated = separated[1] + translate(separated[2]);
      const numbered = trim.match(/^(\d+(?:\.\d+)*(?:\.)?\s+)(.+?)(\s+●)?$/);
      if (numbered && UI_TRANSLATIONS[numbered[2]]) translated = numbered[1] + UI_TRANSLATIONS[numbered[2]] + (numbered[3] || '');
      const decorated = trim.match(/^(.+?)(\s*(?:→|↗|\/ CONTENTS|\/ §\d+|· PDF ↗))$/);
      if (!translated && decorated) {
        const value = translate(decorated[1]);
        if (value !== decorated[1]) translated = value + decorated[2];
      }
    }
    if (!translated) return source;
    return source.slice(0,source.indexOf(trim)) + translated + source.slice(source.indexOf(trim)+trim.length);
  }
  function spelling(key) {
    const ye = labels[key] || '';
    const mode=typeof spellingDisplay==='undefined'?initialSpelling:spellingDisplay;
    return mode==='ye'?ye:typeof yeToAccent==='function'?yeToAccent(ye):homeAccents[key]||ye;
  }
  // Move existing nodes, rather than copying labels, so translation memory and
  // event handlers survive language/spelling changes. DOM and visual order agree.
  function tujiaFirst(label) {
    const host = label.parentElement;
    if (!host || host.closest('.eyebrow')) return;
    if (!host.matches('.brand>span,aside>nav button>span,.hero h1,.search-language-label,#search-form button')) return;
    host.classList.add('bilingual-label');
    for (const node of [...host.childNodes]) {
      if (node === label) continue;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const secondary = document.createElement('span');
        secondary.className = 'ui-secondary';
        node.before(secondary); secondary.append(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches('svg,[data-ui-tujia]')) {
        node.classList.add('ui-secondary');
      }
    }
    if (host.firstChild !== label) host.prepend(label);
  }
  function decorate() {
    for (const key of ['home','words','grammar','notation','history','corpus','sources']) {
      const target = document.querySelector('nav [data-view="'+key+'"] > span');
      if (target && !target.querySelector('[data-ui-tujia]')) {
        const small = document.createElement('small');
        small.className = 'tujia-ui'; small.dataset.uiTujia = key; small.lang = 'tji';
        target.append(small);
      }
    }
    const hero = document.querySelector('.hero h1');
    if (hero && !hero.querySelector('[data-ui-tujia]')) {
      const small = document.createElement('small');
      small.className = 'tujia-ui hero-tujia';
      small.dataset.uiTujia = 'home';
      small.lang = 'tji';
      hero.append(small);
    }
    document.querySelectorAll('#search-form button[type="submit"]').forEach(button => {
      if (button.querySelector('[data-ui-tujia]')) return;
      const small = document.createElement('small');
      small.className = 'tujia-ui'; small.dataset.uiTujia = 'search'; small.lang = 'tji';
      button.append(small);
    });
    document.querySelectorAll('[data-ui-tujia]').forEach(el => {
      const value = spelling(el.dataset.uiTujia);
      if (el.textContent !== value) el.textContent = value;
      tujiaFirst(el);
    });
  }
  function translateText(node) {
    if (node.parentElement?.closest(protectedContent)) return;
    const previous = textMemory.get(node), current = node.nodeValue;
    const source = previous && current === previous.output ? previous.source : current;
    const output = translate(source);
    textMemory.set(node, {source,output});
    if (current !== output) node.nodeValue = output;
  }
  function translateAttributes(element) {
    const cache = attributeMemory.get(element) || {};
    for (const attr of ['aria-label','title','placeholder','alt']) {
      if (!element.hasAttribute(attr)) continue;
      const current = element.getAttribute(attr), previous = cache[attr];
      const source = previous && current === previous.output ? previous.source : current;
      let output = translate(source);
      cache[attr] = {source,output};
      if (current !== output) element.setAttribute(attr,output);
    }
    attributeMemory.set(element,cache);
  }
  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) { translateText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(protectedContent)) return;
    translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: node => node.nodeType === Node.ELEMENT_NODE && node.matches(protectedContent) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateText(node); else translateAttributes(node);
    }
  }
  function translateGrammar() {
    // Keep complete prose runs together across IPA font decoration. Switching
    // languages restores the run before typography marks its phonetic spans.
    for (const root of document.querySelectorAll('.grammar-article,[data-reference-grammar],.editorial-notes')) {
      for (const span of root.querySelectorAll('[data-grammar-localized]')) {
        const memory = grammarMemory.get(span);
        if (!memory || memory.language === language) continue;
        span.textContent = translate(memory.source);
        memory.language = language;
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node => node.parentElement.closest('script,style,code,pre,[data-ui-content],.form,.example-transcription,.source-row') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
      });
      const nodes = []; let node;
      while ((node = walker.nextNode())) if (/\p{Script=Han}/u.test(node.nodeValue)) nodes.push(node);
      for (const node of nodes) {
        const span = document.createElement('span'), source = node.nodeValue;
        span.dataset.grammarLocalized = ''; span.dataset.uiContent = '';
        grammarMemory.set(span, {source,language});
        span.textContent = translate(source); node.replaceWith(span);
      }
    }
  }
  let observer, queued = false;
  const pending = new Set();
  function observe() { observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']}); }
  function refresh(roots = [document.body]) {
    updateTemplates();
    observer?.disconnect();
    decorate();
    localizeLinks();
    window.ReviewedGrammar?.refresh();
    translateGrammar();
    window.TujiaTypography?.refresh(node => textMemory.get(node)?.source || node.nodeValue);
    roots.forEach(root => { if (root.isConnected) translateTree(root); });
    window.refreshWordClassLabels?.();
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    const select = document.getElementById('ui-language');
    if (select) select.value = language;
    const title = typeof state === 'undefined' ? '知识总览' : titles[state.view] || '知识总览';
    document.title = document.body.dataset.documentTitle ? translate(document.body.dataset.documentTitle) : ((typeof state === 'undefined' || state.view === 'home') ? '' : translate(title) + ' · ') + '毕兹学堂 Bizic Academy - A library and dictionary of Tujia languages';
    if (observer) observe();
  }
  let languageRequest=0;
  function refreshGrammarResults(){
    if(typeof state==='undefined'||state.view!=='grammar'||!state.q.trim()||typeof render!=='function'||window.SitePages?.pending)return;
    const input=document.querySelector('#main #query'),draft=input?.value,focused=document.activeElement===input,start=input?.selectionStart,end=input?.selectionEnd;
    const top=window.scrollY,dialog=document.getElementById('detail'),dialogTop=dialog?.scrollTop;
    render();
    const next=document.querySelector('#main #query');
    if(next&&draft!==undefined){next.value=draft;if(focused)next.focus({preventScroll:true});if(start!==null&&start!==undefined)next.setSelectionRange(start,end);}
    window.scrollTo({top,behavior:'instant'});if(dialog?.open)dialog.scrollTop=dialogTop;
  }
  async function setLanguage(value) {
    const serial=++languageRequest,previous=language;
    const requested=value === 'en' ? 'en' : 'zh';language=requested;
    if(language==='en'&&window.SitePages&&window.fastReady){
      try{await SitePages.prepareLanguage(language);}catch{
        if(serial!==languageRequest)return;
        language=previous;if(previous!==requested)SitePages.resumePending();refresh();if(typeof toast==='function')toast('语言资料未能载入，请重试。');return;
      }
    }
    if(serial!==languageRequest)return;
    try { localStorage.setItem('tujia-ui-language',language); } catch {}
    syncLanguageURL();
    const resumed=window.SitePages&&window.fastReady&&SitePages.resumePending();
    if(!resumed)refreshGrammarResults();
    refresh();
  }
  window.TujiaUI = {refresh,translate,spelling,setLanguage,setHeadingSpelling(value){initialSpelling=value==='ye'?'ye':'accent';refresh();},get language(){return language;}};
  document.getElementById('ui-language')?.addEventListener('change', e => setLanguage(e.target.value));
  window.addEventListener('popstate', () => setLanguage(urlLanguage() || language));
  // Run after app.js initializes its shared lexical bindings.
  document.addEventListener('DOMContentLoaded', () => {
    observer = new MutationObserver(records => {
      for (const record of records) pending.add(record.target.nodeType === Node.TEXT_NODE ? record.target.parentElement : record.target);
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        const roots = [...pending]; pending.clear(); refresh(roots);
      });
    });
    setLanguage(language);
  });
})();
