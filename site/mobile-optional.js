// Installed reader only. Publications and media open at their published HTTPS
// location after a tap. Media elements themselves never receive a network URL.
'use strict';
window.MobileOptional = (() => {
  const publishedSite = 'https://tujia.biz';
  const controls = new WeakMap();
  const mediaPath = /^\/(?:media\/|maps\/|brassett\/pages\/|translation-(?:runs|pdfs)\/)/;
  function sourceURL(input) {
    if (!input) return '';
    let url;
    try { url = new URL(input, document.baseURI); } catch { return ''; }
    if (url.protocol !== 'https:') return '';
    if (url.origin !== location.origin) return url.href;
    if (!mediaPath.test(url.pathname) && !/\.pdf$/i.test(url.pathname)) return '';
    const relative = url.pathname.slice(1);
    // Preserve the source's public viewing page when the site uses a local
    // playback/image alias for it. Individual archive members retain their
    // published audio path instead of opening the enclosing archive.
    const records = typeof S === 'undefined' || !S ? [] : Object.values(S);
    const record = records.find(item => (item.media === relative || item.image === relative) &&
      typeof item.url === 'string' && item.url.startsWith('https://'));
    const target = record ? new URL(record.url) : new URL(url.pathname + url.search, publishedSite);
    if (record && url.search) url.searchParams.forEach((value, key) => target.searchParams.set(key, value));
    if (url.hash) target.hash = url.hash;
    return target.href;
  }
  function external(link) {
    const raw = link.getAttribute('href');
    if (!raw || raw[0] === '#') return;
    const url = sourceURL(raw);
    if (!url) return;
    if (raw !== url) link.setAttribute('href', url);
    link.removeAttribute('target');
    link.removeAttribute('download');
  }
  function discover(root) {
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches('a[href]')) external(root);
    root.querySelectorAll('a[href]').forEach(external);
  }
  discover(document.documentElement);
  new MutationObserver(changes => {
    for (const change of changes) {
      if (change.type === 'attributes') external(change.target);
      else change.addedNodes.forEach(discover);
    }
  }).observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['href']});

  function media(element, enabled) {
    const url = sourceURL(element.dataset.mediaSrc);
    if (!url || !element.isConnected) return;
    let link = controls.get(element);
    if (!link) {
      link = element.tagName === 'A' ? element : document.createElement('a');
      link.setAttribute('href', url);
      link.classList.add('optional-resource');
      if (link !== element) {
        const image = element.tagName === 'IMG';
        link.dataset.uiSource = image ? '查看原图' : '打开录音';
        link.dataset.uiEnglish = image ? 'Open image' : 'Open recording';
        link.textContent = document.documentElement.lang === 'en' ? link.dataset.uiEnglish : link.dataset.uiSource;
        (element.closest('a') || element).insertAdjacentElement('afterend', link);
      }
      controls.set(element, link);
    }
    link.hidden = !enabled;
    for (const parent of [element.closest('figure'), element.closest('[data-media-group] .card')]) {
      if (parent) parent.hidden = !enabled;
    }
    if (typeof mediaContainers === 'function') mediaContainers();
  }
  return {media};
})();
