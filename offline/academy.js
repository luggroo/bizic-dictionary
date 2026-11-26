// Only shipped in the containing app. All reading and search actions use the website router.
(() => {
  'use strict';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const preference = 'bizic-reader-theme';
  let theme = 'system';
  try { theme = localStorage.getItem(preference) || 'system'; } catch {}
  function applyTheme() {
    root.dataset.theme = theme === 'dark' || (theme === 'system' && system.matches) ? 'dark' : 'light';
  }
  applyTheme();
  if (system.addEventListener) system.addEventListener('change', applyTheme);
  else system.addListener(applyTheme);

  // The separately authored translation guide already has its own bilingual navigation.
  const more = document.querySelector('.academy-more');
  const panel = document.querySelector('.display-panel');
  if (!more || !panel) return;
  Object.assign(UI_TRANSLATIONS, {
    '毕资学堂': 'Bizic Academy',
    '更多资料': 'More', '外观': 'Appearance', '跟随系统': 'System',
    '浅色': 'Light', '深色': 'Dark'
  });

  const sidebar = document.querySelector('body > aside');
  const topbar = document.createElement('div');
  topbar.className = 'academy-mobile-bar';
  topbar.innerHTML = '<button type="button" class="academy-menu-toggle" aria-expanded="false" aria-controls="academy-drawer" aria-label="打开目录">☰</button><strong>毕资学堂</strong>';
  const backdrop = document.createElement('button');
  backdrop.className = 'academy-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', '关闭目录');
  sidebar.id = 'academy-drawer';
  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.insertBefore(backdrop, sidebar);
  const toggle = topbar.querySelector('button');
  function drawer(open) {
    document.body.classList.toggle('academy-drawer-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', () => drawer(!document.body.classList.contains('academy-drawer-open')));
  backdrop.addEventListener('click', () => drawer(false));
  sidebar.querySelector('nav').addEventListener('click', event => {
    if (event.target.closest('button, a')) drawer(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('academy-drawer-open')) {
      drawer(false);
      toggle.focus();
    }
  });

  const menu = more.lastElementChild;
  ['notation', 'history'].forEach(view => {
    const button = menu.querySelector('[data-view="' + view + '"]');
    // Keep the existing Tujia heading in this secondary menu, too.
    const subtitle = document.createElement('small');
    subtitle.className = 'tujia-ui';
    subtitle.dataset.uiTujia = view;
    subtitle.lang = 'tji';
    button.querySelector('span').append(subtitle);
  });
  menu.addEventListener('click', () => { more.open = false; });
  document.addEventListener('click', event => {
    if (!more.contains(event.target)) more.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && more.open) {
      more.open = false;
      more.firstElementChild.focus();
    }
  });
  const label = document.createElement('label');
  label.className = 'spelling-selector academy-theme';
  label.innerHTML = '外观<select id="academy-theme"><option value="system">跟随系统</option><option value="light">浅色</option><option value="dark">深色</option></select>';
  const select = label.querySelector('select');
  select.value = theme;
  select.addEventListener('change', () => {
    theme = select.value;
    try { localStorage.setItem(preference, theme); } catch {}
    applyTheme();
  });
  // The website protects <option> text from automatic translation.
  function themeLabels() {
    const english = document.querySelector('#ui-language').value === 'en';
    const labels = english ? ['System', 'Light', 'Dark'] : ['跟随系统', '浅色', '深色'];
    Array.from(select.options).forEach((option, index) => { option.textContent = labels[index]; });
  }
  document.addEventListener('DOMContentLoaded', themeLabels);
  document.querySelector('#ui-language').addEventListener('change', themeLabels);
  panel.prepend(label);
})();
