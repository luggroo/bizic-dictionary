'use strict';
// Only reveal media whose URL responds with the expected content type.
const mediaChecks = new Map();
let mediaEnabled = true;
try { mediaEnabled = localStorage.getItem('tujia-media') !== 'off'; } catch {}
async function mediaAvailable(path, kind) {
  if (!path || path === 'undefined') return false;
  const key = kind + ':' + path;
  if (!mediaChecks.has(key)) mediaChecks.set(key, (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(path, { method: 'HEAD', signal: controller.signal });
      const type = (response.headers.get('content-type') || '').toLowerCase();
      return response.ok && (kind === 'img' ? type.startsWith('image/') : type.startsWith('audio/') || type.startsWith('video/') || type.startsWith('application/octet-stream'));
    } catch { return false; } finally { clearTimeout(timer); }
  })());
  return mediaChecks.get(key);
}
function mediaContainers() {
  document.querySelectorAll('[data-media-group]').forEach(group => {
    group.hidden = ![...group.querySelectorAll('[data-media-src]')].some(el => !el.hidden);
  });
}
function hideMedia(el) {
  el.hidden = true;
  if (el.tagName === 'AUDIO') { el.pause(); el.removeAttribute('src'); el.load(); }
  const wrapper = el.closest('figure') || (el.tagName === 'IMG' && el.closest('a'));
  if (wrapper) wrapper.hidden = true;
  const card = el.closest('[data-media-group] .card');
  if (card) card.hidden = true;
  el.closest('.lyric-player')?.classList.add('text-only');
}
async function hydrateMedia(el) {
  hideMedia(el);
  if (!mediaEnabled) return;
  const available = await mediaAvailable(el.dataset.mediaSrc, el.dataset.mediaKind || el.tagName.toLowerCase());
  if (!available || !mediaEnabled || !el.isConnected) return;
  el.onerror = () => { hideMedia(el); mediaContainers(); };
  if (el.tagName !== 'A') el.src = el.dataset.mediaSrc;
  el.hidden = false;
  const wrapper = el.closest('figure') || (el.tagName === 'IMG' && el.closest('a'));
  if (wrapper) wrapper.hidden = false;
  const card = el.closest('[data-media-group] .card');
  if (card) card.hidden = false;
  el.closest('.lyric-player')?.classList.remove('text-only');
  mediaContainers();
}
const seenMedia = new WeakSet();
function discoverMedia() {
  document.querySelectorAll('[data-media-src]').forEach(el => {
    if (!seenMedia.has(el)) { seenMedia.add(el); hydrateMedia(el); }
  });
  mediaContainers();
}
const mediaSwitch = document.getElementById('media-switch');
mediaSwitch.checked = mediaEnabled;
mediaSwitch.onchange = () => {
  mediaEnabled = mediaSwitch.checked;
  try { localStorage.setItem('tujia-media', mediaEnabled ? 'on' : 'off'); } catch {}
  document.querySelectorAll('[data-media-src]').forEach(hydrateMedia);
  mediaContainers();
};
new MutationObserver(discoverMedia).observe(document.body, {childList: true, subtree: true});
discoverMedia();
