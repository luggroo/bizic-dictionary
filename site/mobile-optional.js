// Installed reader only. Native code accepts a catalogue ID after a reader taps a link.
'use strict';
window.MobileOptional = (() => {
  const ready = fetch('/optional-resources.json').then(response => {
    if (!response.ok) throw new Error('Optional resource catalogue unavailable');
    return response.json();
  }).then(catalogue => {
    const links = new Map();
    for (const [id, item] of Object.entries(catalogue.resources)) {
      for (const href of item.links) links.set(key(href), '/_app/resource/' + id);
    }
    return links;
  }).catch(() => new Map());
  const controls = new WeakMap();
  function key(href) {
    const url = new URL(href, location.origin + '/');
    if (url.origin === location.origin || url.origin === 'https://tujia.biz') return url.pathname;
    url.hash = '';
    return url.href;
  }
  function fix(link, links) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('/_app/')) return;
    let path;
    try {
      const url = new URL(href, document.baseURI);
      // Page-specific citations keep their original PDF page destination.
      if (url.origin !== location.origin && url.hash) return;
      path = links.get(key(href));
    } catch { return; }
    if (path) {
      link.setAttribute('href', path);
      link.removeAttribute('target');
      link.removeAttribute('download');
    }
  }
  function discover(root, links) {
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches('a[href]')) fix(root, links);
    root.querySelectorAll('a[href]').forEach(link => fix(link, links));
  }
  ready.then(links => {
    discover(document.documentElement, links);
    new MutationObserver(changes => {
      for (const change of changes) {
        if (change.type === 'attributes') fix(change.target, links);
        else change.addedNodes.forEach(node => discover(node, links));
      }
    }).observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['href']});
  });
  async function media(element, enabled) {
    const links = await ready;
    const path = links.get(key(element.dataset.mediaSrc || ''));
    let button = controls.get(element);
    if (!path || !element.isConnected) return;
    if (!button) {
      button = element.tagName === 'A' ? element : document.createElement('a');
      button.setAttribute('href', path);
      button.removeAttribute('target');
      button.classList.add('optional-resource');
      if (button !== element) {
        const image = element.tagName === 'IMG';
        const en = document.documentElement.lang.startsWith('en');
        button.textContent = image ? (en ? 'Open image' : '查看原图') : (en ? 'Open recording' : '打开录音');
        (element.closest('a') || element).insertAdjacentElement('afterend', button);
      }
      controls.set(element, button);
    }
    button.hidden = !enabled;
    for (const parent of [element.closest('figure'), element.closest('[data-media-group] .card')]) {
      if (parent) parent.hidden = !enabled;
    }
    if (typeof mediaContainers === 'function') mediaContainers();
  }
  return {media};
})();
