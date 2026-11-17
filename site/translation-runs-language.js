/* UI meanings use the chosen interface language; PDF links retain their source gloss. */
(() => {
  const supported = lang => lang === 'zh' || lang === 'en';
  const current = document.body.dataset.uiGlossLanguage;
  const url = new URL(location.href);
  const requested = url.searchParams.get('lang');
  const reader = /\/translation-runs(?:-en)?\.html$/.test(url.pathname);
  let saved;
  try { saved = localStorage.getItem('tujia-ui-language'); } catch {}
  const language = supported(requested) ? requested : (reader ? current : (supported(saved) ? saved : current));
  if (reader && language !== current) {
    url.pathname = language === 'en' ? '/translation-runs-en.html' : '/translation-runs.html';
    location.replace(url.href);
    return;
  }
  document.querySelectorAll('.gloss td[data-gloss-original]').forEach(cell => {
    cell.textContent = cell.dataset[language];
    cell.lang = language;
  });
  document.querySelectorAll('[data-gloss-ui-link]').forEach(link => {
    const update = () => {
      const destination = new URL(link.href, location.href);
      destination.hash = location.hash;
      destination.searchParams.set('lang', link.dataset.glossUiLink);
      link.href = destination.href;
    };
    update();
    addEventListener('hashchange', update);
    link.addEventListener('click', () => {
      try { localStorage.setItem('tujia-ui-language', link.dataset.glossUiLink); } catch {}
    });
  });
  try { localStorage.setItem('tujia-ui-language', language); } catch {}
})();
