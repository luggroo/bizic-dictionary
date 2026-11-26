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
  const nav = document.querySelector('aside nav');
  const panel = document.querySelector('.display-panel');
  if (!nav || !panel) return;
  Object.assign(UI_TRANSLATIONS, {
    '毕资学堂': 'Bizic Academy', '词典': 'Dictionary', '语法': 'Grammar',
    '语料': 'Corpus', '文献': 'Sources', '输入法': 'Keyboard',
    '更多资料': 'More', '外观': 'Appearance', '跟随系统': 'System',
    '浅色': 'Light', '深色': 'Dark'
  });

  const more = document.createElement('details');
  more.className = 'academy-more';
  more.innerHTML = '<summary>更多资料</summary><div class="academy-more-menu"></div>';
  const menu = more.lastElementChild;
  document.querySelector('.language-selector').before(more);
  ['notation', 'history'].forEach(view => {
    const button = nav.querySelector('[data-view="' + view + '"]');
    // Keep the existing Tujia heading in this secondary menu, too.
    const subtitle = document.createElement('small');
    subtitle.className = 'tujia-ui';
    subtitle.dataset.uiTujia = view;
    subtitle.lang = 'tji';
    button.querySelector('span').append(subtitle);
    menu.append(button);
  });
  menu.append(nav.querySelector('a[href*="translation"]'));
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
  // The school name already opens the overview.
  nav.querySelector('[data-view="home"]').remove();
  for (const [view, label] of [['words','词典'], ['grammar','语法'], ['corpus','语料'], ['sources','文献']]) {
    const button = nav.querySelector('[data-view="' + view + '"]');
    button.querySelector('span').textContent = label;
    nav.append(button);
  }
  const keyboard = document.createElement('a');
  keyboard.className = 'nav-repo-link academy-keyboard';
  keyboard.href = '/_app/keyboard';
  keyboard.innerHTML = '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M5 9h2m2 0h2m2 0h2m2 0h2M5 12h2m2 0h2m2 0h2m2 0h2M8 15h8"/></svg><span>输入法</span>';
  nav.append(keyboard);

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
