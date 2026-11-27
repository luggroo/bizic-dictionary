// The app adds a home, drawer and settings to the shared website router.
(() => {
  'use strict';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const themeKey = 'bizic-reader-theme';
  let theme = 'system';
  try { theme = localStorage.getItem(themeKey) || 'system'; } catch {}
  function applyTheme() {
    root.dataset.theme = theme === 'dark' || (theme === 'system' && system.matches) ? 'dark' : 'light';
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = root.dataset.theme === 'dark' ? '#211d1d' : '#fffaf5';
  }
  applyTheme();
  if (system.addEventListener) system.addEventListener('change', applyTheme);
  else system.addListener(applyTheme);
  const guideBack = document.querySelector('.academy-guide-back');
  if (guideBack) {
    guideBack.addEventListener('click', event => {
      if (document.referrer.startsWith(location.origin + '/') && history.length > 1) {
        event.preventDefault(); history.back();
      }
    });
    return;
  }

  const body = document.body;
  const main = document.getElementById('main');
  const menu = document.getElementById('academy-drawer');
  if (!menu || !main) return;
  const title = document.getElementById('academy-title');
  const titles = {home:['全站搜索','Search all'], words:['词典查询','Dictionary lookup'], grammar:['语法','Grammar'],
    corpus:['例句语料','Example corpus'], notation:['记音','Notation'], history:['历史比较','Historical comparison'],
    knowledge:['语言知识','Language reference'], sources:['文献','Sources'], settings:['设置','Settings']};
  const settingsTitle = '<h1 id="academy-settings-title"><span data-ui-source="设置" data-ui-english="Settings">设置</span></h1>';
  window.AcademyReader = {settingsTitle, knowledgePage:document.getElementById('academy-knowledge-template').innerHTML};
  for (const node of document.querySelectorAll('[data-ui-source][data-ui-english]')) {
    UI_TRANSLATIONS[node.dataset.uiSource] = node.dataset.uiEnglish;
  }
  Object.assign(UI_TRANSLATIONS, {'未启用':'Not enabled','已启用':'Enabled','当前使用':'Current keyboard',
    '启用输入法':'Enable keyboard','切换输入法':'Switch keyboard','词形、汉语或英语':'Word, Chinese or English',
    '土家语输入法':'Tujia Keyboard','跟随系统':'System','浅色':'Light','深色':'Dark'});
  function english() { return window.TujiaUI && TujiaUI.language === 'en'; }
  function caption(node, zh, en) {
    if (!node) return;
    node.dataset.uiSource = zh;
    node.dataset.uiEnglish = en;
    const text = english() ? en : zh;
    if (node.textContent !== text) node.textContent = text;
  }

  const backdrop = document.querySelector('.academy-backdrop');
  const toggles = Array.from(document.querySelectorAll('.academy-menu-toggle'));
  let opener, pendingAction;
  function showMenu(open) {
    body.classList.toggle('academy-drawer-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    for (const toggle of toggles) toggle.setAttribute('aria-expanded', String(open));
    backdrop.hidden = !open;
    if (open) menu.querySelector('.academy-drawer-close').focus();
    else if (opener && !pendingAction) opener.focus();
  }
  function closeMenu(action) {
    if (history.state && history.state.academyDrawer) { pendingAction = action; history.back(); }
    else { showMenu(false); if (action) action(); }
  }
  toggles.forEach(toggle => toggle.addEventListener('click', () => {
    opener = toggle;
    history.pushState(Object.assign({}, history.state, {academyDrawer:true}), '', location.href);
    showMenu(true);
  }));
  menu.querySelector('.academy-drawer-close').addEventListener('click', () => closeMenu());
  backdrop.addEventListener('click', () => closeMenu());
  function homeWithoutHistory() {
    const url = new URL(location.href);
    url.searchParams.delete('id'); url.hash = 'home';
    location.replace(url.href);
  }
  window.bizicReaderBack = () => {
    if (body.classList.contains('academy-drawer-open')) {closeMenu();return true;}
    if (document.getElementById('detail').open && typeof closeDetail === 'function') {closeDetail();return true;}
    if (body.dataset.academyHome === 'no' && !(history.state && history.state.academyParent)) {
      homeWithoutHistory();return true;
    }
    return false;
  };
  menu.addEventListener('click', event => {
    const target = event.target.closest('button[data-view],a[href]');
    if (!target) return;
    if (target.matches('a[href^="/_app/"]')) {
      // Keep this activation on the original trusted pointer event for Android.
      closeMenu(); return;
    }
    event.preventDefault();
    event.stopPropagation();
    const view = target.dataset.view, href = target.getAttribute('href');
    closeMenu(() => {
      if (view && window.fastReady) setView(view);
      else if (view) location.hash = view;
      else if (href) location.assign(href);
    });
  });
  document.addEventListener('keydown', event => {
    if (!body.classList.contains('academy-drawer-open')) return;
    if (event.key === 'Escape') {event.preventDefault();closeMenu();return;}
    if (event.key !== 'Tab') return;
    const items = menu.querySelectorAll('button,a[href]');
    const first=items[0], last=items[items.length-1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  window.addEventListener('popstate', () => {
    if (history.state && history.state.academyDrawer) {showMenu(true);return;}
    if (!body.classList.contains('academy-drawer-open')) return;
    const action = pendingAction;
    showMenu(false); pendingAction = null;
    if (action) setTimeout(action, 0);
  });
  document.querySelector('.academy-back').addEventListener('click', () => {
    if (history.state && history.state.academyParent) history.back();
    else homeWithoutHistory();
  });
  const detailClose = document.getElementById('close');
  detailClose.parentElement.insertBefore(detailClose, detailClose.parentElement.firstChild);

  // Move the live website controls. Their language, spelling and media handlers
  // keep the same element identities and existing preference storage.
  const language = document.getElementById('ui-language');
  document.getElementById('academy-language-field').append(language);
  document.getElementById('academy-media-field').append(document.getElementById('media-switch'));
  document.getElementById('academy-spelling-field').append(document.getElementById('spelling-control'));
  const themeField = document.getElementById('academy-theme');
  themeField.value = theme;
  themeField.addEventListener('change', () => {
    theme = themeField.value;
    try { localStorage.setItem(themeKey, theme); } catch {}
    applyTheme();
  });
  function themeLabels() {
    const labels = english() ? ['System','Light','Dark'] : ['跟随系统','浅色','深色'];
    Array.from(themeField.options).forEach((option, i) => { if (option.textContent !== labels[i]) option.textContent = labels[i]; });
  }

  let imeState, requestNumber = 0;
  function drawIME() {
    const status = document.getElementById('academy-ime-status');
    const action = document.getElementById('academy-ime-action');
    if (!status || !action || !imeState) return;
    if (imeState.selected) caption(status, '当前使用', 'Current keyboard');
    else if (imeState.enabled) caption(status, '已启用', 'Enabled');
    else caption(status, '未启用', 'Not enabled');
    const enable = !imeState.enabled;
    action.href = enable ? '/_app/keyboard/enable' : '/_app/keyboard/switch';
    caption(action, enable ? '启用输入法' : '切换输入法', enable ? 'Enable keyboard' : 'Switch keyboard');
  }
  function readIME() {
    if (!document.getElementById('academy-home')) return;
    const request = ++requestNumber;
    fetch('/_app/ime-status.json', {cache:'no-store'}).then(response => response.ok ? response.json() : null)
      .then(value => {
        if (request !== requestNumber || !value || typeof value.enabled !== 'boolean' || typeof value.selected !== 'boolean') return;
        imeState = value; drawIME();
      }).catch(() => {});
  }
  let previousHome, homeScope = 'words';
  function syncScreen() {
    const home = document.getElementById('academy-home');
    const view = body.dataset.view || 'home';
    body.dataset.academyHome = home ? 'yes' : 'no';
    const label = titles[view] || titles.home;
    caption(title, home ? '' : label[0], home ? '' : label[1]);
    if (['grammar','notation','history'].includes(view)) {
      const knowledgeLink = menu.querySelector('[data-view="knowledge"]');
      knowledgeLink.classList.add('active');
      knowledgeLink.setAttribute('aria-current', 'location');
    }
    const guide = english() ? '/translation-en.html' : '/translation.html';
    document.querySelectorAll('[data-academy-translation]').forEach(link => {
      const href = guide + '?lang=' + (english() ? 'en' : 'zh');
      if (link.getAttribute('href') !== href) link.setAttribute('href', href);
    });
    themeLabels();
    if (home && home !== previousHome) home.querySelector('input[name="academy-scope"][value="' + homeScope + '"]').checked = true;
    if (home) drawIME();
    if (home && home !== previousHome) readIME();
    previousHome = home;
  }
  new MutationObserver(syncScreen).observe(main, {childList:true});
  new MutationObserver(syncScreen).observe(root, {attributes:true,attributeFilter:['lang']});
  window.addEventListener('bizic-ime-status-change', readIME);
  window.addEventListener('focus', readIME);
  window.addEventListener('pageshow', readIME);
  document.addEventListener('visibilitychange', () => {if (!document.hidden) readIME();});
  document.addEventListener('DOMContentLoaded', syncScreen);
  document.addEventListener('change', event => {
    if (event.target.name === 'academy-scope') homeScope = event.target.value;
  });
  function searchHome(form) {
    const query = form.querySelector('#query').value.trim();
    if (!query) {form.querySelector('#query').focus();return;}
    const view=form.querySelector('input[name="academy-scope"]:checked').value;
    if (window.fastReady) setView(view,false,{q:query});
    else location.hash=view+'?q='+encodeURIComponent(query);
  }
  document.addEventListener('submit', event => {
    if (event.target.id !== 'academy-home-search') return;
    event.preventDefault();
    searchHome(event.target);
  });
  // A reader can type before the full dictionary has initialized. Preserve
  // the chosen home scope before the site's generic startup keyboard handler.
  window.addEventListener('keydown', event => {
    if (window.fastReady || event.key !== 'Enter' || event.isComposing) return;
    const form = event.target.closest('#academy-home-search');
    if (!form || event.target.id !== 'query') return;
    event.preventDefault(); event.stopPropagation(); searchHome(form);
  }, true);
  syncScreen();
})();
