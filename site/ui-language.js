/* Localize interface text without rewriting source records or event values. */
'use strict';
(() => {
  let language = 'zh';
  try { if (localStorage.getItem('tujia-ui-language') === 'en') language = 'en'; } catch {}
  const labels = Object.freeze({
    brand: 'bifzixkar afhxix', home: 'ger laix xief', words: 'cixcix nix', grammar: 'sar qinrmox lir',
    // Zhou (2020) cover: Sufmur Bifzixsar (su²mu³); Brassett: -nie³ (genitive), sa³ (speech).
    notation: 'sar qinrmox af', corpus: 'lafzef lafzef lir', sources: 'cixpux jierxif',
    // pa¹sa³ (STEDT 454776); lie³ ‘use’ (456418); ni¹ ‘look for’ (w1598).
    // yinxyiv and bifsar: spellings and tones confirmed by the user.
    searchEn: 'yinxyiv lier nix', searchZh: 'paxsar lier nix', searchTujia: 'bifsar lier nix',
    saved: 'suxsux-civ', history: 'sufmur nier sar', search: 'nix', save: 'suxsux'
  });
  const textMemory = new WeakMap(), attributeMemory = new WeakMap();
  const protectedContent = 'script,style,textarea,code,pre,[data-ui-content],[data-ui-tujia],.word,.word-ipa,.notation-form,.source-word-record p,.text-view,.lyric-tujia,.lyric-translation,.lyric-chinese,.external-ipa,.external-glosses,.external-text-block>p,.example,.grammar-example';
  const escapeRE = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const templates = Object.entries(UI_TRANSLATIONS).filter(([s]) => /\{\w+\}/.test(s)).map(([source, target]) => {
    const names = [], pieces = source.split(/(\{\w+\})/g);
    const pattern = pieces.map(p => /^\{\w+\}$/.test(p) ? (names.push(p.slice(1,-1)), '(.+?)') : escapeRE(p)).join('');
    return {re: new RegExp('^' + pattern + '$'), names, target};
  });
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
    if (!translated) return source;
    return source.slice(0,source.indexOf(trim)) + translated + source.slice(source.indexOf(trim)+trim.length);
  }
  function spelling(key) {
    const ye = labels[key] || '';
    return typeof spellingDisplay !== 'undefined' && spellingDisplay === 'ye' ? ye : yeToAccent(ye);
  }
  function decorate() {
    for (const key of ['home','words','grammar','notation','history','corpus','sources','saved']) {
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
      if (element.matches('[data-save]') && source === '收藏' && ['title','aria-label'].includes(attr)) output += ' · ' + spelling('save');
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
  let observer, queued = false;
  const pending = new Set();
  function observe() { observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']}); }
  function refresh(roots = [document.body]) {
    observer?.disconnect();
    decorate();
    roots.forEach(root => { if (root.isConnected) translateTree(root); });
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    const select = document.getElementById('ui-language');
    if (select) select.value = language;
    const title = typeof state === 'undefined' ? '知识总览' : titles[state.view] || '知识总览';
    document.title = translate(title) + ' · ' + translate('土家语知识索引');
    if (observer) observe();
  }
  function setLanguage(value) {
    language = value === 'en' ? 'en' : 'zh';
    try { localStorage.setItem('tujia-ui-language',language); } catch {}
    refresh();
  }
  window.TujiaUI = {refresh,translate,spelling,setLanguage,get language(){return language;}};
  document.getElementById('ui-language').addEventListener('change', e => setLanguage(e.target.value));
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
    refresh();
  });
})();
