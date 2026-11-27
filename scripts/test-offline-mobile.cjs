// node scripts/test-offline-mobile.cjs UNPACKED_SNAPSHOT [SCREENSHOT_DIRECTORY]
// Requires Playwright. BROWSER=webkit and CHROMIUM_EXECUTABLE / WEBKIT_EXECUTABLE
// select a browser. RAW_PREPARED=1 exercises clients that serve raw gzip.
// exerciseLearningUI also runs on a real WebView Playwright Page.
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {gunzipSync} = require('node:zlib');

const origin = 'https://appassets.androidplatform.net';
const start = origin + '/index.html';
const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.gz': 'application/octet-stream', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json'
};
const csp = "default-src 'none'; base-uri 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; connect-src 'self'; form-action 'none'; frame-ancestors 'none'; worker-src 'none'; child-src 'none'";

async function ready(page, view) {
  await page.waitForFunction(expected => typeof state !== 'undefined' && state.view === expected &&
    window.fastReady && navigationReady && !SitePages.pending && SitePages.isReady(state, currentDetail) &&
    !!document.querySelector('#main h1'), view, {timeout: 90000});
  await page.evaluate(() => document.fonts.ready.then(() => true));
}

async function reveal(target) {
  for (const panel of await target.locator('xpath=ancestor::details').all()) {
    if (await panel.getAttribute('open') === null) await panel.locator(':scope > summary').click();
  }
}

async function contrastOn(label, surfaceSelector) {
  return label.evaluate((element, surface) => {
    function channels(color) { return color.match(/[\d.]+/g).map(Number); }
    function blend(color, background) {
      const [r, g, b, alpha = 1] = channels(color);
      return [r, g, b].map((channel, i) => channel * alpha + background[i] * (1 - alpha));
    }
    const luminance = color => {
      const [r, g, b] = color.map(n => n / 255)
        .map(n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const layers = [];
    for (let node = element.closest(surface); node; node = node.parentElement)
      layers.unshift(getComputedStyle(node).backgroundColor);
    const surfaceColor = layers.reduce((behind, layer) => blend(layer, behind), [255, 255, 255]);
    const foreground = luminance(blend(getComputedStyle(element).color, surfaceColor));
    const background = luminance(surfaceColor);
    return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
  }, surfaceSelector);
}

async function checkTujiaLabelContrast(page, theme) {
  const brand = await contrastOn(page.locator('.brand .bilingual-label > .tujia-ui'), 'aside');
  const activeTab = await contrastOn(page.locator('aside nav button.active .tujia-ui'), 'button');
  assert(brand >= 4.5 && activeTab >= 4.5,
    `Tujia subtitle contrast in ${theme} theme: brand ${brand.toFixed(2)}, active tab ${activeTab.toFixed(2)}`);
  return {brand, activeTab};
}

async function checkHomeContrast(page) {
  const text = await contrastOn(page.locator('#academy-name'), '#academy-home');
  const slogan = await contrastOn(page.locator('.academy-slogan'), '#academy-home');
  const status = await contrastOn(page.locator('#academy-ime-status'), '.academy-ime-card');
  const action = await contrastOn(page.locator('#academy-ime-action'), '#academy-ime-action');
  const ratios = {text, slogan, status, action};
  for (const [label, ratio] of Object.entries(ratios)) assert(ratio >= 4.5, label + ' contrast was ' + ratio);
  return ratios;
}

async function openDrawer(page) {
  const toggle = page.locator('.academy-menu-toggle:visible').first();
  if (await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
  await page.waitForFunction(() => document.body.classList.contains('academy-drawer-open'));
  const panel = page.locator('#academy-drawer');
  await panel.waitFor();
  return panel;
}

async function navigateFromDrawer(page, view) {
  const panel = await openDrawer(page);
  await panel.locator(`[data-view="${view}"]`).first().click();
  await ready(page, view);
  assert.equal(await page.locator('.academy-menu-toggle[aria-expanded="true"]').count(), 0);
}

async function showPreviousPage(page, view) {
  const back = page.locator('.academy-back:visible').first();
  const box = await back.boundingBox();
  assert(box && box.x < 90 && box.y < 80, 'Back must be reachable at the upper left');
  await back.click();
  await ready(page, view);
}

async function checkHomeActions(page, {firstPaint = false} = {}) {
  const home = page.locator('#academy-home');
  await home.waitFor();
  const bird = page.locator('.academy-toolbar-logo');
  assert(await bird.isVisible());
  assert(await bird.evaluate(img => img.complete && img.naturalWidth > 0));
  const keyboardMark = home.locator('.academy-ime-card img.academy-ime-icon[src="tujia-keyboard.svg"]');
  assert(await keyboardMark.isVisible());
  assert(await keyboardMark.evaluate(img => img.complete && img.naturalWidth > 0));
  const shortcuts = home.locator('.academy-destinations > *');
  const actions = await shortcuts.evaluateAll(items => items.map(item => item.dataset.view || 'translation'));
  assert.deepEqual(actions, ['words', 'corpus', 'translation', 'knowledge']);
  const english = (await page.locator('html').getAttribute('lang')).startsWith('en');
  assert.deepEqual(await shortcuts.allTextContents(), english
    ? ['Dictionary lookup', 'Example corpus', 'Translation tools', 'Language reference']
    : ['词典查询', '例句语料', '翻译工具', '语言知识']);
  assert(await home.locator('.academy-destinations a[data-academy-translation]').isVisible());
  assert(await home.locator('.academy-ime-manage[href="/_app/keyboard"]').isVisible());
  const status = home.locator('#academy-ime-status');
  if (firstPaint) assert.equal(await status.count(), 1);
  else await status.waitFor();
  assert(await home.locator('#academy-home-search').isVisible());
  return home;
}

async function checkEntryJourney(page, capture, report, simulateIme) {
  await page.goto(start);
  await ready(page, 'home');
  assert.equal(await page.locator('html').getAttribute('data-edition'), 'offline');
  const home = await checkHomeActions(page);
  assert((await home.innerText()).includes('逻土话，学土话，用土话'));
  const scopes = home.locator('input[name="academy-scope"]');
  assert.equal(await scopes.count(), 2);
  assert(await home.getByRole('radio', {name: '搜词典'}).isChecked());
  assert(await home.getByRole('radio', {name: '搜全站'}).isVisible());
  if (simulateIme) {
    const readState = () => home.locator('#academy-ime-status').innerText();
    const link = home.locator('#academy-ime-action');
    await page.waitForFunction(() => document.querySelector('#academy-ime-action')?.getAttribute('href') === '/_app/keyboard/enable');
    assert.equal(await readState(), '未启用');
    await simulateIme({enabled: true, selected: false});
    await page.waitForFunction(() => document.querySelector('#academy-ime-action')?.getAttribute('href') === '/_app/keyboard/switch');
    const enabledText = await readState();
    assert.equal(enabledText, '已启用');
    await simulateIme({enabled: true, selected: true});
    await page.waitForFunction(previous => document.querySelector('#academy-ime-status')?.innerText !== previous, enabledText);
    assert.equal(await readState(), '当前使用');
    assert.equal(await link.getAttribute('href'), '/_app/keyboard/switch');
    assert(await home.locator('.academy-ime-manage[href="/_app/keyboard"]').isVisible());
    await simulateIme({enabled: false, selected: false});
    await page.waitForFunction(() => document.querySelector('#academy-ime-action')?.getAttribute('href') === '/_app/keyboard/enable');
    assert(await link.isVisible());
  }
  await capture('home');
  const drawer = await openDrawer(page);
  assert.equal(await drawer.locator('[data-view="sources"]').count(), 0);
  assert.deepEqual(await drawer.locator('nav > *').evaluateAll(items => items.map(item =>
    item.dataset.view || (item.hasAttribute('data-academy-translation') ? 'translation' : 'ime'))),
    ['home', 'words', 'corpus', 'translation', 'knowledge', 'ime', 'settings']);
  assert(await drawer.locator('[data-view="settings"]').isVisible());
  assert.equal(await drawer.getAttribute('aria-hidden'), 'false');
  assert(await drawer.locator('.academy-drawer-close').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Shift+Tab');
  assert(await drawer.locator('button,a[href]').last().evaluate(el => el === document.activeElement));
  await page.keyboard.press('Tab');
  assert(await drawer.locator('.academy-drawer-close').evaluate(el => el === document.activeElement));
  await capture('drawer');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.body.classList.contains('academy-drawer-open'));
  assert.equal(await drawer.getAttribute('aria-hidden'), 'true');
  assert(await page.locator('.academy-menu-toggle:visible').evaluate(el => el === document.activeElement));
  await openDrawer(page);
  await drawer.locator('.academy-drawer-close').click();
  await page.waitForFunction(() => !document.body.classList.contains('academy-drawer-open'));
  await openDrawer(page);
  const backdrop = page.locator('.academy-backdrop');
  const backdropBox = await backdrop.boundingBox();
  await backdrop.click({position: {x: backdropBox.width - 7, y: 20}});
  await page.waitForFunction(() => !document.body.classList.contains('academy-drawer-open'));
  await openDrawer(page);
  await page.goBack();
  await page.waitForFunction(() => !document.body.classList.contains('academy-drawer-open'));
  await home.waitFor();
  await home.locator('[data-view="knowledge"]').click();
  await ready(page, 'knowledge');
  const knowledge = page.locator('#academy-knowledge');
  assert.equal(await knowledge.locator('h1').innerText(), '语言知识');
  assert.deepEqual(await knowledge.locator('button strong').allTextContents(), ['语法', '记音', '历史比较']);
  await capture('knowledge');
  for (const view of ['grammar', 'notation', 'history']) {
    await knowledge.locator('[data-view="' + view + '"]').click();
    await ready(page, view);
    assert.equal(await drawer.locator('[data-view="knowledge"]').getAttribute('aria-current'), 'location');
    if (view === 'notation') { await page.goBack(); await ready(page, 'knowledge'); }
    else await showPreviousPage(page, 'knowledge');
  }
  await showPreviousPage(page, 'home');
  report('Language reference, three subject pages and return to the home screen');
  await home.locator('#query').fill('water');
  await home.locator('#academy-home-search button[type="submit"]').click();
  await ready(page, 'words');
  await page.locator('.word-card-content').first().waitFor();
  assert.equal(await page.locator('#query').inputValue(), 'water');
  await capture('home-dictionary-search');
  await showPreviousPage(page, 'home');
  await home.locator('label').filter({has: page.getByRole('radio', {name: '搜全站'})}).click();
  assert(await home.getByRole('radio', {name: '搜全站'}).isChecked());
  await home.locator('#query').fill('water');
  await home.locator('#query').press('Enter');
  await ready(page, 'home');
  await page.locator('[data-results="history"]').first().waitFor();
  await capture('home-global-search');
  await page.locator('[data-results="history"]').first().click();
  await ready(page, 'history');
  await showPreviousPage(page, 'home');
  assert.equal(await page.locator('#query').inputValue(), 'water');
  await page.goBack();
  await home.waitFor();
  await home.locator('a[data-academy-translation]').click();
  await page.waitForURL(url => url.pathname.endsWith('/translation.html'));
  const guideBack = page.locator('.academy-guide-back');
  const guideBox = await guideBack.boundingBox();
  assert(guideBox && guideBox.x < 90 && guideBox.y < 80, 'Translation Back must be at upper left');
  await capture('translation');
  await guideBack.click();
  await home.waitFor();
  await home.locator('.academy-destinations [data-view="words"]').click();
  await ready(page, 'words');
  await capture('dictionary');
  report('One-page launch, drawer, IME state, dictionary and whole-site search, upper-left Back and history');
}

async function exerciseLearningUI(page, {capture = async () => {}, report = console.log, simulateIme} = {}) {
  const visit = async (route, view) => {
    await page.goto(start + route);
    await ready(page, view);
  };
  const select = async (selector, value) => {
    const field = page.locator(selector).first();
    await reveal(field);
    await field.selectOption(value);
  };
  const close = async () => {
    await page.locator('#close').click();
    await page.locator('#detail[open]').waitFor({state: 'hidden'});
  };
  const firstWord = page.locator('.word-card-content').first();
  await checkEntryJourney(page, capture, report, simulateIme);

  await page.locator('#query').fill('here');
  await page.locator('[data-search-language="en"]').click();
  await page.waitForFunction(() => document.querySelector('.word-card-english')?.innerText.trim().endsWith('here'));
  const meanings = await page.locator('.word-card-meaning').allTextContents();
  assert(meanings.length && meanings.every(label => /\bhere\b/i.test(label)));
  await capture('search');
  const wordId = await firstWord.getAttribute('data-open');
  await firstWord.click();
  const definition = page.locator('#detail[open] .word-entry-definition h2');
  await definition.waitFor();
  const heading = await definition.innerText();
  const deepLink = new URL(page.url());
  assert.equal(deepLink.searchParams.get('id'), wordId);
  assert.equal(deepLink.origin, origin);
  await page.reload();
  await definition.waitFor();
  assert.equal(await definition.innerText(), heading);
  assert.match(await page.locator('#detail-body').innerText(), /here/i);
  assert(await page.locator('#detail-body .word-ipa').count() > 0);
  assert(await page.locator('#detail-body [data-open]').count() > 0);
  await capture('entry');
  await close();
  await visit('#words', 'words');
  await page.locator('#browse-all-words').click();
  await select('[data-filter="dialect"]', {index: 1});
  await firstWord.waitFor();
  const dialect = await page.locator('[data-filter="dialect"]').inputValue();
  assert(dialect);
  await page.reload();
  await ready(page, 'words');
  assert.equal(await page.locator('[data-filter="dialect"]').inputValue(), dialect);
  report('English sense ranking, lexical metadata, stable entry link and persistent dialect filter');

  await visit('#grammar/north/101/1', 'grammar');
  const article = page.locator('.grammar-article');
  assert.match(await article.innerText(), /声母|韵母/);
  const pageLink = article.locator('a[href^="https://www.isw.unibe.ch/"][href$=".pdf#page=64"]').first();
  await pageLink.waitFor({state: 'attached'});
  assert.equal(await pageLink.getAttribute('target'), null);
  await page.locator('.grammar-reading-title').first().scrollIntoViewIfNeeded();
  await capture('grammar-north');
  await page.locator('.chapter-pagination [rel="next"]').first().click();
  await page.waitForFunction(() => state.grammarSection === '101.2');
  await page.goBack();
  await page.waitForFunction(() => state.grammarSection === '101.1');
  await page.locator('[data-grammar-dialect="south"]').first().click();
  await page.waitForFunction(() => state.grammarDialect === 'south' && !!document.querySelector('.grammar-article'));
  assert((await article.innerText()).length > 100);
  await page.locator('.grammar-reading-title').first().scrollIntoViewIfNeeded();
  await capture('grammar-south');
  report('Northern and Southern grammar, section link, pagination and Back');

  await visit('#corpus', 'corpus');
  const collection = page.locator('[data-corpus-collection="xu-tujia-annotated-texts"]');
  await collection.click();
  await page.locator('.corpus-card-content[data-open]').first().click();
  await page.locator('#detail[open] #detail-body h2').first().waitFor();
  assert((await page.locator('#detail-body').innerText()).length > 100);
  await close();
  await visit('#corpus', 'corpus');
  await page.locator('#query').fill('双数');
  await page.locator('#search-form button[type="submit"]').click();
  const hit = page.locator('.corpus-card-content[data-open="tlp-longshan-euphemisms-01"]');
  await hit.click();
  await page.locator('#detail[open] .external-text-block').first().waitFor();
  assert.match(await page.locator('#detail-body').innerText(), /双数/);
  await capture('corpus');
  await close();
  report('Annotated corpus collection, Chinese full-text search and local reader');

  await visit('?id=brassett-2006#sources', 'sources');
  await page.locator('#detail[open] .grammar-summary').first().waitFor();
  const source = await page.locator('#detail-body').innerText();
  assert.match(source, /Brassett/);
  assert.match(source, /2006/);
  const original = page.locator('#detail-body a[href^="https://theswissbay.ch/"][href$=".pdf"]').first();
  await original.waitFor({state: 'attached'});
  assert.equal(await original.getAttribute('target'), null);
  await capture('bibliography');
  await close();
  report('Bibliography, original publication link and a page-specific grammar citation');

  await navigateFromDrawer(page, 'knowledge');
  await page.locator('#academy-knowledge [data-view="notation"]').click();
  await ready(page, 'notation');
  await select('#notation-source', 'zhou-fx');
  await page.locator('#notation-input').fill('kei21');
  await page.locator('#notation-converter button').click();
  await page.waitForFunction(() => !!notationState.result);
  const evidence = page.locator('[data-pair-source="zhou-ts"]').first();
  await reveal(evidence);
  await evidence.click();
  await page.locator('#detail[open] #detail-body h2').first().waitFor();
  assert((await page.locator('#detail-body').innerText()).length > 40);
  await close();
  report('Notation conversion, IPA correspondence and source evidence');

  await navigateFromDrawer(page, 'settings');
  const settings = page.locator('#academy-settings');
  await settings.waitFor();
  assert(await settings.locator('a[href="/_app/privacy"]').isVisible());
  assert(await settings.locator('a[href="/_app/keyboard"]').isVisible());
  const originalLinks = settings.locator('#media-switch');
  assert(await originalLinks.isChecked());
  await originalLinks.uncheck();
  await capture('settings');
  await select('[data-spelling-display="north"]', 'ye');
  await select('#ui-language', 'en');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  await select('#academy-theme', 'dark');
  await page.reload();
  await ready(page, 'settings');
  assert.equal(await settings.locator('#ui-language').inputValue(), 'en');
  assert.equal(await settings.locator('#academy-theme').inputValue(), 'dark');
  assert.equal(await settings.locator('[data-spelling-display="north"]').inputValue(), 'ye');
  assert.equal(await originalLinks.isChecked(), false);
  await originalLinks.check();
  await navigateFromDrawer(page, 'words');
  await openDrawer(page);
  const brand = page.locator('#academy-drawer .brand [lang="tji"]').first();
  assert.equal(await brand.innerText(), 'bifzixsar afhxix');
  const dark = await checkTujiaLabelContrast(page, 'dark');
  await capture('english-dark-drawer');
  await page.keyboard.press('Escape');
  await capture('english-dark');
  await navigateFromDrawer(page, 'home');
  await checkHomeActions(page);
  dark.home = await checkHomeContrast(page);
  await capture('home-en-dark');
  await navigateFromDrawer(page, 'settings');
  await select('[data-spelling-display="north"]', 'accent');
  await select('#academy-theme', 'light');
  await navigateFromDrawer(page, 'words');
  await openDrawer(page);
  assert.notEqual(await brand.innerText(), 'bifzixsar afhxix');
  const light = await checkTujiaLabelContrast(page, 'light');
  await page.keyboard.press('Escape');
  await navigateFromDrawer(page, 'home');
  await checkHomeActions(page);
  light.home = await checkHomeContrast(page);
  // A reader opening the standalone English landing page can change the
  // language and return to the original captions after loading grammar prose.
  await page.goto(origin + '/en/');
  await ready(page, 'home');
  const wordShortcut = page.locator('.academy-destinations [data-view="words"]');
  assert.match(await wordShortcut.innerText(), /Dictionary/);
  await navigateFromDrawer(page, 'settings');
  await select('#ui-language', 'zh');
  await page.waitForFunction(() => document.documentElement.lang === 'zh-CN');
  await navigateFromDrawer(page, 'knowledge');
  await page.locator('#academy-knowledge [data-view="grammar"]').click();
  await ready(page, 'grammar');
  await navigateFromDrawer(page, 'settings');
  await select('#ui-language', 'en');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  await navigateFromDrawer(page, 'home');
  assert.match(await wordShortcut.innerText(), /Dictionary/);
  assert.equal(await page.locator('.academy-destinations [data-view="corpus"]').innerText(), 'Example corpus');
  await page.locator('.academy-destinations a[data-academy-translation]').click();
  await page.waitForURL(url => url.pathname.endsWith('/translation-en.html'));
  await page.locator('.academy-guide-back').click();
  await page.locator('#academy-home').waitFor();
  await navigateFromDrawer(page, 'settings');
  await select('#academy-theme', 'system');
  await select('#ui-language', 'zh');
  await page.waitForFunction(() => document.documentElement.lang === 'zh-CN');
  report('Settings, native privacy entry, persistent theme and language, Tujia orthography, bilingual navigation');
  return {dark, light};
}

// Every browser request is answered from the exact extracted snapshot with the
// same headers as the local asset handler. There is no HTTP server or fallback.
async function serveSnapshot(context, root, log) {
  await context.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    // WebKit routes Blob.stream() reads through its network process. The
    // originating document owns these in-memory bytes; no host is contacted.
    if (url.protocol === 'blob:' && url.origin === origin) return route.continue();
    if (url.origin !== origin || !['GET', 'HEAD'].includes(req.method())) {
      log.foreign.add(req.method() + ' ' + req.url());
      await route.abort('internetdisconnected');
      return;
    }
    if (url.pathname === '/_app/ime-status.json' && !url.search) {
      const status = log.imeStatus || {enabled: false, selected: false};
      log.imeStatusReads = (log.imeStatusReads || 0) + 1;
      await route.fulfill({status: 200, contentType: 'application/json; charset=UTF-8',
        body: req.method() === 'HEAD' ? '' : JSON.stringify(status)});
      return;
    }
    let name = decodeURIComponent(url.pathname.slice(1));
    if (!name || name.endsWith('/')) name += 'index.html';
    const file = path.resolve(root, name);
    assert(file.startsWith(root + path.sep));
    let data;
    try {
      data = await fs.readFile(file);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
      log.missing.add(req.method() + ' ' + url.pathname);
      await route.fulfill({status: 404, contentType: 'text/plain', body: 'Missing asset'});
      return;
    }
    log.requests.add(name);
    let type = contentTypes[path.extname(name)] || 'application/octet-stream';
    if (!log.rawPrepared && name.startsWith('prepared/') && name.endsWith('.json.gz')) {
      // LearningWebClient gives WebView native-inflated JSON at the original URL.
      type = 'application/json; charset=utf-8';
      if (req.method() !== 'HEAD') data = gunzipSync(data);
      log.nativeJson.add(name);
    }
    await route.fulfill({status: 200, headers: {
      'Content-Type': type,
      'Content-Security-Policy': csp, 'X-Content-Type-Options': 'nosniff'
    }, body: req.method() === 'HEAD' ? Buffer.alloc(0) : data});
  });
}

async function checkHomeGeometry(page, {fit} = {}) {
  const measured = await page.locator('body').evaluate(body => {
    const viewport = document.documentElement;
    const home = document.getElementById('academy-home');
    const targets = [...document.querySelectorAll('.academy-toolbar button,#academy-home a[href],#academy-home button,#academy-home label,#academy-home input[type=search]')].filter(item => {
      const dim = item.getBoundingClientRect();
      return dim.width > 0 && dim.height > 0 && !item.classList.contains('visually-hidden') && getComputedStyle(item).visibility !== 'hidden';
    });
    const clips = [], small = [];
    for (const target of targets) {
      const box = target.getBoundingClientRect();
      const text = target.innerText.trim();
      if (box.left < -1 || box.right > viewport.clientWidth + 1) clips.push({text, reason: 'outside viewport'});
      if (Math.min(box.width, box.height) < 43.5) small.push({text: text || target.id, width: box.width, height: box.height});
      const nodes = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = nodes.nextNode())) {
        if (!n.textContent.trim() || n.parentElement.closest('svg,[hidden],.visually-hidden')) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        for (const line of range.getClientRects()) {
          if (!line.width || !line.height) continue;
          if (line.left < box.left - 2 || line.right > box.right + 2 || line.top < box.top - 3 || line.bottom > box.bottom + 3)
            clips.push({text: n.textContent.trim(), reason: 'outside control',
              controlX: [Math.round(box.left), Math.round(box.right)], textX: [Math.round(line.left), Math.round(line.right)]});
        }
      }
    }
    const ime = home.querySelector('#academy-ime-action');
    const imeBox = ime?.getBoundingClientRect();
    const card = home.querySelector('.academy-ime-card').getBoundingClientRect();
    return {width: viewport.clientWidth, viewportHeight: innerHeight, contentWidth: viewport.scrollWidth,
      contentHeight: viewport.scrollHeight, imeBottom: imeBox && Math.round(imeBox.bottom),
      cardBottomGap: Math.round(innerHeight - card.bottom), clips, small};
  });
  assert(measured.contentWidth <= measured.width + 1, 'Home overflows horizontally: ' + JSON.stringify(measured));
  assert.deepEqual(measured.clips, [], 'Clipped home control text at ' + measured.width);
  assert.deepEqual(measured.small, [], 'Home actions need a 44px touch target at ' + measured.width);
  if (fit) {
    assert(measured.contentHeight <= measured.viewportHeight + 2, 'Home does not fit a single screen: ' + JSON.stringify(measured));
    assert(measured.imeBottom > 0 && measured.imeBottom <= measured.viewportHeight + 1, 'IME management is below the fold');
    assert(measured.cardBottomGap >= -1 && measured.cardBottomGap <= 32,
      'Keyboard card must sit at the bottom of the available phone viewport: ' + JSON.stringify(measured));
  }
  return measured;
}

async function checkDisplaySizes(page, engine, capture) {
  const cdp = engine === 'chromium' ? await page.context().newCDPSession(page) : null;
  const sizes = [[320, 568], [360, 640], [390, 844], [768, 1024]];
  const cases = [];
  // These are usable WebView sizes after the Android status/navigation bars.
  for (const [width, height] of [[320, 496], [360, 568]]) {
    await page.setViewportSize({width, height});
    for (const language of ['zh', 'en']) {
      await page.goto(start + '?lang=' + language + '#home');
      await ready(page, 'home');
      const geometry = await checkHomeGeometry(page, {fit: true});
      await capture(`home-${language}-${width}x${height}`);
      cases.push({view: 'home', width, height, language, scale: 1, geometry});
    }
  }
  for (const [width, height] of sizes) {
    await page.setViewportSize({width, height});
    for (const scale of cdp && width === 320 ? [1, 1.5] : [1]) {
      if (cdp) await cdp.send('Emulation.setEmulatedOSTextScale', {scale});
      for (const language of ['zh', 'en']) {
        for (const view of ['home', 'knowledge', 'words', 'grammar', 'corpus', 'sources', 'notation', 'settings']) {
          await page.goto(start + '?lang=' + language + '#' + view);
          await ready(page, view);
          const dimensions = await page.evaluate(() => ({
            viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth
          }));
          assert(dimensions.content <= dimensions.viewport + 1,
            `${language} ${view} at ${width}px and OS text scale ${scale}: ${JSON.stringify(dimensions)}`);
          if (view === 'home') {
            const geometry = await checkHomeGeometry(page, {fit: scale === 1 && width < 768});
            if (scale === 1 && (width === 320 || width === 390)) await capture(`home-${language}-${width}`);
            cases.push({view, width, height, language, scale, geometry});
            continue;
          }
          cases.push({view, width, height, language, scale});
        }
      }
    }
  }
  if (cdp) await cdp.detach();
  return cases;
}

// Fixed-pixel text does not grow with every desktop engine's simulated OS
// preference. Scale the actual computed type sizes for a reproducible reflow
// test. Glyph bounds are measured independently. Native WebView uses textZoom.
async function checkTextReflow(page, capture) {
  const rows = [];
  await page.setViewportSize({width: 320, height: 496});
  for (const language of ['zh', 'en']) {
    for (const factor of [1.5, 2]) {
      await page.goto('about:blank');
      await page.goto(start + '?lang=' + language + '#home');
      await ready(page, 'home');
      await page.waitForFunction(() => document.querySelector('#academy-ime-status')?.textContent.trim());
      const actual = await page.evaluate(scale => {
        const label = document.querySelector('.academy-destinations [data-view=words] > span');
        const height = () => {
          const range = document.createRange();
          range.selectNodeContents(label);
          return range.getClientRects()[0].height;
        };
        const before = height();
        const nodes = [...document.querySelectorAll('.academy-toolbar *,#academy-home,#academy-home *')].filter(el =>
          !(el instanceof SVGElement) && !el.classList.contains('visually-hidden'));
        const sizes = nodes.map(el => parseFloat(getComputedStyle(el).fontSize));
        nodes.forEach((el, i) => { el.style.fontSize = sizes[i] * scale + 'px'; });
        return {before, after: height()};
      }, factor);
      assert(actual.after >= actual.before * (factor - 0.15), 'Glyphs did not grow to the requested size');
      const geometry = await checkHomeGeometry(page);
      await page.locator('#academy-ime-action').scrollIntoViewIfNeeded();
      const clickable = await page.locator('#academy-ime-action').evaluate(el => {
        const box = el.getBoundingClientRect();
        return box.bottom <= innerHeight + 1 && el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
      });
      assert(clickable, 'Keyboard action cannot be reached by scrolling');
      await page.evaluate(() => window.scrollTo(0, 0));
      await capture(`home-${language}-text-${factor * 100}`, true);
      rows.push({language, factor, actual, geometry});
      if (language === 'en' && factor === 2) {
        await page.locator('.academy-destinations [data-view="knowledge"]').click();
        await ready(page, 'knowledge');
        const wordLines = await page.locator('#academy-knowledge').evaluate(section => {
          const nodes = [...section.querySelectorAll('*')].filter(el => !(el instanceof SVGElement));
          const sizes = nodes.map(el => parseFloat(getComputedStyle(el).fontSize));
          nodes.forEach((el, i) => { el.style.fontSize = sizes[i] * 2 + 'px'; });
          const text = section.querySelector('[data-view="history"] strong [data-ui-source]').firstChild;
          const range = document.createRange();
          range.setStart(text, text.nodeValue.indexOf('comparison'));
          range.setEnd(text, text.length);
          return range.getClientRects().length;
        });
        const back = await page.locator('.academy-back').boundingBox();
        const menu = await page.locator('.academy-menu-inner').boundingBox();
        assert(back && menu && menu.x > 240 && Math.abs(back.y - menu.y) <= 1, 'Back and menu stay on one row');
        assert.equal(wordLines, 1, 'The word comparison fits within the reference card');
        await capture('knowledge-en-text-200', true);
      }
    }
  }
  return rows;
}

async function checkFirstPaint(browser, browserOffline, root, log, out) {
  const context = await browser.newContext({viewport: {width: 320, height: 800},
    isMobile: true, javaScriptEnabled: false, offline: browserOffline, serviceWorkers: 'block'});
  try {
    await serveSnapshot(context, root, log);
    const page = await context.newPage();
    const ratios = {};
    for (const [lang, url, name] of [['zh', start, '搜索'], ['en', origin + '/en/', 'Search']]) {
      await page.goto(url);
      await checkHomeActions(page, {firstPaint: true});
      const submit = page.locator('#academy-home-search').getByRole('button', {name, exact: true});
      assert(await submit.isVisible());
      const contrast = await contrastOn(submit, 'button');
      assert(contrast >= 3, `${lang} Search icon contrast before JavaScript was ${contrast}`);
      ratios[lang] = contrast;
      if (out) await page.screenshot({path: path.join(out, `first-paint-${lang}-320.png`)});
    }
    return ratios;
  } finally { await context.close(); }
}

async function checkLargeText(chromium, root, out, log) {
  // Desktop Chromium's simulated OS preference does not enlarge every fixed-px
  // site label. A real browser minimum exercises glyph widths and line wrapping.
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
    args: ['--disable-dev-shm-usage', '--blink-settings=minimumFontSize=20']});
  try {
    const context = await browser.newContext({viewport: {width: 320, height: 690},
      isMobile: true, hasTouch: true, serviceWorkers: 'block', offline: true, reducedMotion: 'reduce'});
    await serveSnapshot(context, root, log);
    const page = await context.newPage();
    await page.goto(start + '?lang=en#home');
    await ready(page, 'home');
    await checkHomeActions(page);
    const geometry = await checkHomeGeometry(page);
    const textHeight = await page.locator('.academy-destinations [data-view="words"]').evaluate(item => {
      const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.includes('Dictionary')) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        return range.getBoundingClientRect().height;
      }
    });
    assert(textHeight >= 19, 'Real enlarged English shortcut text must reach 19 CSS pixels');
    if (out) await page.screenshot({path: path.join(out, 'english-20px-320.png'), fullPage: true});
    const drawer = await openDrawer(page);
    const bounds = await drawer.boundingBox();
    assert(bounds && bounds.x >= -1 && bounds.x + bounds.width <= 321, 'Enlarged drawer fits viewport');
    await drawer.locator('[data-view="settings"]').click();
    await ready(page, 'settings');
    const settingsWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    assert(settingsWidth <= 321, 'Enlarged settings page fits available width');
    return geometry;
  } finally { await browser.close(); }
}

async function main() {
  if (!process.argv[2]) throw Error('Pass an unpacked snapshot directory. A screenshot directory is optional.');
  const {chromium, webkit} = require('playwright');
  const engine = process.env.BROWSER || 'chromium';
  assert(['chromium', 'webkit'].includes(engine));
  const root = path.resolve(process.argv[2]);
  const out = process.argv[3] && path.resolve(process.argv[3]);
  if (out) await fs.mkdir(out, {recursive: true});
  const browser = await (engine === 'chromium' ? chromium : webkit).launch(engine === 'chromium' ? {
    executablePath: process.env.CHROMIUM_EXECUTABLE || undefined, args: ['--disable-dev-shm-usage']
  } : {executablePath: process.env.WEBKIT_EXECUTABLE || undefined});
  const log = {requests: new Set(), foreign: new Set(), missing: new Set(), nativeJson: new Set(),
    rawPrepared: process.env.RAW_PREPARED === '1'};
  const checks = [], errors = [], cspErrors = [];
  // In Linux WebKit the offline switch rejects even route.fulfill for the top
  // document. The route handler still answers every HTTPS read from disk.
  const browserOffline = engine === 'chromium';
  try {
    const context = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 1,
      isMobile: true, hasTouch: true, reducedMotion: 'reduce', serviceWorkers: 'block', offline: browserOffline,
      colorScheme: 'light', locale: 'zh-CN'});
    await serveSnapshot(context, root, log);
    const page = await context.newPage();
    page.setDefaultTimeout(25000);
    page.on('pageerror', e => errors.push(e.message));
    // Native-inflated responses should be parsed directly, keeping a second
    // copy of the full search index out of the JavaScript heap on older phones.
    await page.addInitScript(() => {
      const original = Response.prototype.arrayBuffer;
      Response.prototype.arrayBuffer = function (...args) {
        if (this.url.includes('/prepared/') && this.headers.get('Content-Type')?.startsWith('application/json')) {
          throw Error('Native-inflated JSON was copied to an ArrayBuffer');
        }
        return original.apply(this, args);
      };
    });
    await page.exposeBinding('recordCspViolation', (_, directive, url) => cspErrors.push({directive, url}));
    await page.addInitScript(() => document.addEventListener('securitypolicyviolation', event => {
      window.recordCspViolation(event.effectiveDirective, event.blockedURI);
    }));
    const capture = async (name, fullPage = false) => {
      if (out) await page.screenshot({path: path.join(out, name + '.png'), animations: 'disabled', fullPage});
    };
    const simulateIme = async state => {
      log.imeStatus = state;
      await page.evaluate(() => window.dispatchEvent(new Event('bizic-ime-status-change')));
    };
    const tujiaLabelContrast = await exerciseLearningUI(page, {capture, simulateIme,
      report: name => { checks.push(name); console.log('PASS', name); }});
    // First action after opening a section from outside the app has no reader
    // history. The local Back control must still go somewhere useful.
    for (const [hash, view] of [['#words','words'],['#grammar/north/1','grammar'],['#knowledge','knowledge']]) {
      const linked = await context.newPage();
      await linked.goto(start + hash);
      await ready(linked, view);
      if (view === 'grammar') assert.equal(new URL(linked.url()).hash, '#grammar/north/101');
      await showPreviousPage(linked, 'home');
      await linked.locator('#academy-home').waitFor();
      await linked.close();
    }
    // A legacy fragment link followed inside the reader retains its real parent
    // after chapter normalization, including after a visit to another section.
    const oldLink = await context.newPage();
    await oldLink.goto(start + '#knowledge');
    await ready(oldLink, 'knowledge');
    await oldLink.evaluate(() => { location.hash = 'grammar/north/1'; });
    await ready(oldLink, 'grammar');
    await navigateFromDrawer(oldLink, 'words');
    await showPreviousPage(oldLink, 'grammar');
    await showPreviousPage(oldLink, 'knowledge');
    await oldLink.close();
    if (browserOffline) assert.equal(await page.evaluate(() => navigator.onLine), false);
    await page.emulateMedia({colorScheme: 'dark'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await page.emulateMedia({colorScheme: 'light'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    const firstPaintContrast = await checkFirstPaint(browser, browserOffline, root, log, out);
    const sizes = await checkDisplaySizes(page, engine, capture);
    const textReflow = await checkTextReflow(page, capture);
    const largeTextNavigation = engine === 'chromium' ? await checkLargeText(chromium, root, out, log) : undefined;
    assert.deepEqual([...log.foreign], [], 'Unexpected external requests');
    assert.deepEqual([...log.missing], [], 'Requests for files outside the base snapshot');
    assert.deepEqual(errors, [], 'Unhandled JavaScript exceptions');
    assert.deepEqual(cspErrors, [], 'Content Security Policy violations');
    if (!log.rawPrepared) assert(log.nativeJson.size > 0, 'Native JSON transport was not exercised');
    const result = {engine, browserVersion: browser.version(), browserOffline, network: 'All HTTPS responses served from snapshot on disk', checks, viewports: sizes, firstPaintContrast, tujiaLabelContrast, textReflow, largeTextNavigation,
      nativeImeStatusReads: log.imeStatusReads, distinctLocalResources: log.requests.size, nativeDecodedJsonResources: log.nativeJson.size, externalRequests: [...log.foreign], missingFiles: [...log.missing], errors, cspErrors};
    console.log(JSON.stringify(result, null, 2));
    if (out) await fs.writeFile(path.join(out, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  } finally { await browser.close(); }
}

module.exports = {exerciseLearningUI};
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
