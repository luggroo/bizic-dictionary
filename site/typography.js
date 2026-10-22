/* Semantic typography only: never rewrite spellings, IPA, source records or glosses.
 * Called inside the UI's existing disconnected MutationObserver refresh. */
'use strict';
(() => {
  const set = (el, kind) => { if (el && kind && el.dataset.script !== kind) el.dataset.script = kind; };
  const headKind = w => completeSpellings(w).length ? 'transliteration' : wordIPA(w).length ? 'ipa' : sourceKind(w.source);
  const sourceKind = id => {
    if (typeof NOTATION_CONFIG === 'undefined') return 'ipa';
    const profiles = NOTATION_CONFIG.profiles.filter(p => p.id === id || p.source === id);
    return profiles.length && profiles.every(p => ['ye','brassett'].includes(p.kind)) ? 'transliteration' : 'ipa';
  };
  function wrapHead(button, word) {
    if (button.querySelector('[data-script]')) return;
    const node = button.firstChild;
    if (node?.nodeType !== Node.TEXT_NODE) return;
    const form = notationHead(word);
    if (!node.nodeValue.startsWith(form)) return;
    const label = document.createElement('span');
    set(label, headKind(word));
    node.splitText(form.length);
    button.insertBefore(label, node); label.append(node);
  }
  function markInlineIPA(root) {
    // Only explicitly slash-delimited phonetic spans, within linguistic content.
    // URLs, code, controls and already tagged runs are excluded.
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: node => node.parentElement.closest('a,button,input,textarea,script,style,code,pre,[data-script],.tujia-ui') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = []; let node;
    while ((node = walker.nextNode())) if (node.nodeValue.includes('/')) nodes.push(node);
    for (const text of nodes) {
      const regex = /\/([\p{L}\p{M}\p{N}\sˈˌːˑ˥˦˧˨˩*?=+()\[\].,;:'’~\-]+)\//gu;
      const matches = [...text.nodeValue.matchAll(regex)].filter(m => /[a-zɐ-ʯ]/i.test(m[1]) && !/\p{Script=Han}/u.test(m[1]));
      if (!matches.length) continue;
      const fragment = document.createDocumentFragment(); let end = 0;
      for (const match of matches) {
        fragment.append(document.createTextNode(text.nodeValue.slice(end, match.index)));
        const span = document.createElement('span'); set(span, 'ipa'); span.textContent = match[0]; fragment.append(span);
        end = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(text.nodeValue.slice(end))); text.replaceWith(fragment);
    }
  }
  function refresh(sourceText = n => n.nodeValue) {
    if (typeof D === 'undefined' || !D) return;
    document.querySelectorAll('.word-card-content[data-open]').forEach(button => {
      const w = W?.[button.dataset.open];
      if (w) set(button.querySelector('.word-card-title'), headKind(w));
    });
    const word = typeof currentDetail !== 'undefined' ? W?.[currentDetail] : null;
    if (word) set(document.querySelector('#detail-body h1.word'), headKind(word));
    document.querySelectorAll('.source-word-record .word').forEach(el => {
      const id = el.closest('article')?.querySelector('[data-open]')?.dataset.open;
      set(el, sourceKind(id));
    });
    document.querySelectorAll('.word[data-open]').forEach(el => {
      const id = el.dataset.open;
      if (R?.[id]) set(el, 'ipa'); else if (W?.[id]) set(el, headKind(W[id]));
    });
    if (typeof currentDetail !== 'undefined' && R?.[currentDetail]) {
      set(document.querySelector('#detail-body h1'), 'ipa');
      document.querySelectorAll('#detail-body tbody td:nth-child(2)').forEach(el => set(el, 'ipa'));
    }
    document.querySelectorAll('.stack button[data-open]').forEach(el => {
      const w = W?.[el.dataset.open]; if (w) wrapHead(el, w);
    });
    document.querySelectorAll('.example-transcription').forEach(el => {
      set(el, /^\s*\*?\//.test(el.textContent) ? 'ipa' : 'transliteration');
    });
    document.querySelectorAll('.np-matrix tbody th').forEach(el => set(el, 'transliteration'));
    // Classify columns before/after UI translation using the original header text.
    for (const table of document.querySelectorAll('main table,#detail-body table')) {
      const headers = [...table.querySelectorAll('thead tr:first-child th')].map(el => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let out = '', n;
        while ((n = walker.nextNode())) out += sourceText(n); return out.trim();
      });
      const kinds = headers.map(h => /IPA|音值|国际音标|原始重建形式|对应形式与注释/i.test(h) ? 'ipa' : /拼音|拼写|叶式|白话字/.test(h) ? 'transliteration' : /^(原记音|原形|原记号)$/.test(h) ? (typeof notationState !== 'undefined' ? sourceKind(notationState.source) : 'ipa') : '');
      for (const row of table.querySelectorAll('tbody tr')) [...row.children].forEach((cell, i) => {
        if (!kinds[i]) return;
        for (const node of [...cell.childNodes]) {
          if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim() || /\p{Script=Han}/u.test(node.nodeValue)) continue;
          const span = document.createElement('span'); set(span, kinds[i]); node.before(span); span.append(node);
        }
      });
    }
    const input = document.getElementById('notation-input');
    if (input && typeof notationState !== 'undefined') set(input, sourceKind(notationState.source));
    document.querySelectorAll('.grammar-article,#detail-body').forEach(markInlineIPA);
  }
  window.TujiaTypography = {refresh};
})();
