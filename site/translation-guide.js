(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const source = $('translation-source'), dialect = $('translation-dialect');
  const output = $('translation-prompt'), status = $('prompt-status');
  const params = new URLSearchParams(location.search);
  const requested = params.get('lang');
  let saved = null;
  try { saved = localStorage.getItem('tujia-ui-language'); } catch {}
  let language = ['zh','en'].includes(requested) ? requested : document.body.dataset.homeLanguage || saved || 'zh';
  let outputEdited = false;
  function promptText() {
    const south = dialect.selectedIndex === 1;
    const target = language === 'en' ? (south ? 'Southern Tujia (Luxi)' : 'Northern Tujia (Longshan)') : (south ? '南部泸溪土家语' : '北部龙山土家语');
    const instruction = language === 'en' ? `Follow this translation skill and translate the complete text below into ${target}:` : `请按这个翻译技能，将以下原文完整译成${target}：`;
    const text = source.value || (language === 'en' ? '(Paste your text here)' : '（在这里粘贴原文）');
    return instruction + '\nhttps://github.com/luggroo/bizic-translator/blob/main/skills/translate-tujia/SKILL.md\n\n' + text;
  }
  function refreshPrompt() { const text = promptText(); output.textContent = text; output.value = text; outputEdited = false; status.textContent = ''; }
  source.addEventListener('input',refreshPrompt);
  source.addEventListener('change',refreshPrompt);
  source.addEventListener('compositionend',refreshPrompt);
  dialect.addEventListener('change',refreshPrompt);
  output.addEventListener('input',() => { outputEdited = true; });
  $('copy-prompt').addEventListener('click',async () => {
    let copied = false;
    try { await navigator.clipboard.writeText(output.value); copied = true; } catch { output.focus(); output.select(); try { copied = document.execCommand('copy'); } catch {} }
    status.textContent = copied ? (language === 'en' ? 'Copied. Paste the prompt into your AI chat window and send it.' : '已复制。请粘贴到 AI 聊天窗口中并发送。') : (language === 'en' ? 'Select and copy the prompt, then paste it into your AI chat window and send it.' : '请选中并复制整段指令，粘贴到 AI 聊天窗口中发送。');
  });
  function titleAndRoute(scroll = false) {
    const id = location.hash.slice(1);
    const detail = id.startsWith('example-') && $(id)?.classList.contains('record');
    $('guide-content').hidden = Boolean(detail);
    document.querySelectorAll('.record').forEach(record => { record.hidden = !detail || record.id !== id; record.style.display = detail && record.id === id ? 'block' : 'none'; });
    const label = detail ? $(id).querySelector('h1').textContent : (language === 'en' ? 'Translation skill' : '翻译技能');
    document.title = label + (language === 'en' ? ' · Bizic Academy' : ' · 毕兹学堂');
    $('crumb').textContent = detail ? (language === 'en' ? 'Translation skill · Examples' : '翻译技能 · 翻译例子') : (language === 'en' ? 'Translation skill · How to use' : '翻译技能 · 使用方法');
    if (scroll) { if (detail) window.scrollTo(0,0); else $(id)?.scrollIntoView(); }
  }
  function setLanguage(next, sync = true) {
    language = next;
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => { el.textContent = el.dataset[language]; });
    document.querySelectorAll('.gloss td[data-gloss-original]').forEach(cell => { cell.lang = language; });
    $('ui-language').value = language;
    $('language-label').textContent = language === 'en' ? 'Interface language' : '界面语言';
    document.querySelector('aside').setAttribute('aria-label',language === 'en' ? 'Site navigation' : '网站导航');
    $('site-nav').setAttribute('aria-label',language === 'en' ? 'Main navigation' : '主导航');
    document.querySelector('.guide-tabs').setAttribute('aria-label',language === 'en' ? 'On this page' : '页面目录');
    source.placeholder = language === 'en' ? 'Paste your text here' : '在这里粘贴原文';
    document.querySelectorAll('.availability').forEach(el => { el.setAttribute('aria-label',language === 'en' ? (el.classList.contains('yes') ? 'Available' : 'Unavailable') : (el.classList.contains('yes') ? '可以用' : '不能用')); });
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'Translate Northern and Southern Tujia with AI: tool requirements, translation prompts, common questions and actual examples.' : '使用 AI 翻译北部与南部土家语：工具要求、翻译指令、常见问题和实际例子。';
    document.querySelectorAll('a[href^="https://tujia.biz/"]').forEach(el => { const url = new URL(el.href); url.searchParams.set('lang',language); el.href = url.href; });
    document.querySelectorAll('[data-ui-language-link]').forEach(el => {
      const url = new URL(location.href); url.searchParams.set('lang',el.dataset.uiLanguageLink); el.href = url.href;
      if (el.dataset.uiLanguageLink === language) el.setAttribute('aria-current','true'); else el.removeAttribute('aria-current');
    });
    document.querySelectorAll('a[href*="translation-runs"]').forEach(link => {
      const target = new URL(link.href, location.href);
      if (!/\/translation-runs(?:-en)?\.html$/.test(target.pathname)) return;
      target.pathname = language === 'en' ? '/translation-runs-en.html' : '/translation-runs.html';
      target.searchParams.set('lang', language);
      link.href = target.pathname + target.search + target.hash;
    });
    refreshPrompt();
    titleAndRoute();
    if (sync) { try { const url = new URL(location.href); url.searchParams.set('lang',language); history.replaceState(history.state,'',url); } catch {} }
    try { localStorage.setItem('tujia-ui-language',language); } catch {}
  }
  $('ui-language').addEventListener('change',e => setLanguage(e.target.value));
  document.querySelectorAll('[data-ui-language-link]').forEach(el => el.addEventListener('click',e => { e.preventDefault(); setLanguage(el.dataset.uiLanguageLink); }));
  $('menu-toggle').addEventListener('click',() => { const open = $('menu-toggle').getAttribute('aria-expanded') !== 'true'; $('menu-toggle').setAttribute('aria-expanded',String(open)); $('site-nav').classList.toggle('is-open',open); });
  $('site-nav').addEventListener('click',e => { if(e.target.closest('a')) { $('site-nav').classList.remove('is-open'); $('menu-toggle').setAttribute('aria-expanded','false'); } });
  document.addEventListener('keydown',e => { if(e.key==='Escape') { $('site-nav').classList.remove('is-open'); $('menu-toggle').setAttribute('aria-expanded','false'); } });
  addEventListener('hashchange',() => titleAndRoute(true));
  setLanguage(language,false);
  if (location.hash) requestAnimationFrame(() => titleAndRoute(true));
})();
