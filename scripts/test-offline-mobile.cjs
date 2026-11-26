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
    const luminance = color => {
      const [r, g, b] = color.match(/[\d.]+/g).slice(0, 3).map(n => Number(n) / 255)
        .map(n => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4);
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const foreground = luminance(getComputedStyle(element).color);
    const background = luminance(getComputedStyle(element.closest(surface)).backgroundColor);
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

async function exerciseLearningUI(page, {capture = async () => {}, report = console.log} = {}) {
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
  await page.goto(start);
  await page.waitForFunction(() => window.fastReady && navigationReady && !SitePages.pending);
  await page.locator('#main h1').first().waitFor();
  assert.equal(await page.locator('html').getAttribute('data-edition'), 'offline');
  const words = page.locator('aside nav [data-view="words"]').first();
  await reveal(words);
  await words.click();
  await ready(page, 'words');
  const keyboard = page.locator('aside a[href^="/_app/keyboard"]').first();
  assert.equal(await keyboard.count(), 1);
  await reveal(keyboard);
  assert(await keyboard.isVisible());
  await capture('dictionary');
  report('Cold launch, dictionary navigation and native keyboard settings link');

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
  await page.locator('#detail-body a[href^="/_app/resource/"]').first().waitFor({state: 'attached'});
  await capture('bibliography');
  await close();
  report('Bibliography, source details and optional publication link');

  const notation = page.locator('.academy-more-menu [data-view="notation"]');
  await reveal(notation);
  await notation.click();
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

  await visit('#words?q=here&searchLanguage=en', 'words');
  const brand = page.locator('.brand [lang="tji"]').first();
  const accent = await brand.innerText();
  await select('[data-spelling-display="north"]', 'ye');
  assert.equal(await brand.innerText(), 'bifzixsar afhxix');
  assert.notEqual(await brand.innerText(), accent);
  await select('#ui-language', 'en');
  await ready(page, 'words');
  await page.waitForFunction(() => document.documentElement.lang === 'en');
  assert.match(await page.locator('#main h1').innerText(), /Dictionary|Word|Lexic/i);
  await select('[data-spelling-display="north"]', 'accent');
  await select('#academy-theme', 'dark');
  await page.reload();
  await ready(page, 'words');
  assert.equal(await page.locator('#ui-language').inputValue(), 'en');
  assert.equal(await brand.innerText(), accent);
  assert.equal(await page.locator('#academy-theme').inputValue(), 'dark');
  const pageColor = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const darkColor = await pageColor();
  const dark = await checkTujiaLabelContrast(page, 'dark');
  await capture('english-dark');
  await select('#academy-theme', 'light');
  assert.notEqual(await pageColor(), darkColor);
  const light = await checkTujiaLabelContrast(page, 'light');
  await select('#academy-theme', 'system');
  await select('#ui-language', 'zh');
  await page.waitForFunction(() => document.documentElement.lang === 'zh-CN');
  // English landing-page HTML has different source captions. Late grammar
  // translations must preserve the same five labels after a round trip.
  await page.goto(origin + '/en/');
  await ready(page, 'home');
  const labels = () => page.locator('aside nav > *').evaluateAll(items => items.map(item =>
    (item.querySelector('.ui-secondary') || item.querySelector('[data-ui-source]')).textContent));
  const english = ['Dictionary', 'Grammar', 'Corpus', 'Sources', 'Keyboard'];
  assert.deepEqual(await labels(), english);
  await select('#ui-language', 'zh');
  await page.waitForFunction(() => document.querySelector('aside [data-view="words"] .ui-secondary').textContent === '词典');
  assert.deepEqual(await labels(), ['词典', '语法', '语料', '文献', '输入法']);
  await page.locator('aside nav [data-view="grammar"]').click();
  await ready(page, 'grammar');
  await select('#ui-language', 'en');
  await ready(page, 'grammar');
  await page.waitForFunction(() => document.querySelector('aside [data-view="words"] .ui-secondary').textContent === 'Dictionary');
  assert.deepEqual(await labels(), english);
  report('Chinese and English interface, Tujia diacritic/Ye labels, saved theme and spelling');
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

async function checkDisplaySizes(page, engine, capture) {
  const cdp = engine === 'chromium' ? await page.context().newCDPSession(page) : null;
  const sizes = [[320, 690], [390, 844], [768, 1024]];
  const cases = [];
  for (const [width, height] of sizes) {
    await page.setViewportSize({width, height});
    for (const scale of cdp && width === 320 ? [1, 1.5] : [1]) {
      if (cdp) await cdp.send('Emulation.setEmulatedOSTextScale', {scale});
      for (const language of ['zh', 'en']) {
        for (const view of ['words', 'grammar', 'corpus', 'sources', 'notation']) {
          await page.goto(start + '?lang=' + language + '#' + view);
          await ready(page, view);
          const dimensions = await page.evaluate(() => ({
            viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth
          }));
          assert(dimensions.content <= dimensions.viewport + 1,
            `${language} ${view} at ${width}px and OS text scale ${scale}: ${JSON.stringify(dimensions)}`);
          if (view === 'words') {
            const more = page.locator('.academy-more');
            await more.locator('summary').click();
            const box = await more.locator('.academy-more-menu').boundingBox();
            assert(box && box.x >= -1 && box.x + box.width <= width + 1,
              `${language} More menu escapes the ${width}px screen: ${JSON.stringify(box)}`);
            if (width === 320 && language === 'en' && scale === 1) await capture('english-menu-320');
            await more.locator('summary').click();
            if (language === 'zh' && (scale !== 1 || width === 768)) await capture(`dictionary-${width}-${scale}`);
          }
          cases.push({view, width, height, language, scale});
        }
      }
    }
  }
  if (cdp) await cdp.detach();
  return cases;
}

async function checkEnglishFirstPaint(browser, browserOffline, root, log, out) {
  const context = await browser.newContext({viewport: {width: 320, height: 800},
    isMobile: true, javaScriptEnabled: false, offline: browserOffline, serviceWorkers: 'block'});
  try {
    await serveSnapshot(context, root, log);
    const page = await context.newPage();
    await page.goto(origin + '/en/');
    const labels = await page.locator('aside nav > *').allInnerTexts();
    assert.deepEqual(labels.map(s => s.trim()), ['Dictionary', 'Grammar', 'Corpus', 'Sources', 'Keyboard']);
    const contrast = await contrastOn(page.locator('#search-form button [data-ui-source]'), 'button');
    assert(contrast >= 4.5, `English Search caption contrast before JavaScript was ${contrast}`);
    if (out) await page.screenshot({path: path.join(out, 'first-paint-en-320.png')});
    return contrast;
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
    await page.goto(start + '?lang=en#words?q=here&searchLanguage=en');
    await ready(page, 'words');
    const geometry = await page.locator('aside nav > *').evaluateAll(items => items.map(item => {
      const label = item.querySelector('.ui-secondary') || item.querySelector('span');
      const range = document.createRange();
      range.selectNodeContents(label);
      const text = range.getBoundingClientRect(), box = item.getBoundingClientRect();
      return {label: label.textContent.trim(), height: text.height, left: text.left, right: text.right,
        buttonLeft: box.left, buttonRight: box.right};
    }));
    assert.equal(geometry.length, 5);
    for (const g of geometry) {
      assert(g.height >= 19, 'Enlarged text must reach the intended size: ' + JSON.stringify(g));
      assert(g.left >= g.buttonLeft - 1 && g.right <= g.buttonRight + 1 && g.left >= -1 && g.right <= 321,
        'Enlarged navigation label escapes its button: ' + JSON.stringify(g));
    }
    if (out) await page.screenshot({path: path.join(out, 'english-20px-320.png')});
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
    const capture = async name => {
      if (out) await page.screenshot({path: path.join(out, name + '.png'), animations: 'disabled'});
    };
    const tujiaLabelContrast = await exerciseLearningUI(page, {capture, report: name => { checks.push(name); console.log('PASS', name); }});
    if (browserOffline) assert.equal(await page.evaluate(() => navigator.onLine), false);
    await page.emulateMedia({colorScheme: 'dark'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await page.emulateMedia({colorScheme: 'light'});
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    const firstPaintContrast = await checkEnglishFirstPaint(browser, browserOffline, root, log, out);
    const sizes = await checkDisplaySizes(page, engine, capture);
    const largeTextNavigation = engine === 'chromium' ? await checkLargeText(chromium, root, out, log) : undefined;
    assert.deepEqual([...log.foreign], [], 'Unexpected external requests');
    assert.deepEqual([...log.missing], [], 'Requests for files outside the base snapshot');
    assert.deepEqual(errors, [], 'Unhandled JavaScript exceptions');
    assert.deepEqual(cspErrors, [], 'Content Security Policy violations');
    if (!log.rawPrepared) assert(log.nativeJson.size > 0, 'Native JSON transport was not exercised');
    const result = {engine, browserVersion: browser.version(), browserOffline, network: 'All HTTPS responses served from snapshot on disk', checks, viewports: sizes, firstPaintContrast, tujiaLabelContrast, largeTextNavigation,
      distinctLocalResources: log.requests.size, nativeDecodedJsonResources: log.nativeJson.size, externalRequests: [...log.foreign], missingFiles: [...log.missing], errors, cspErrors};
    console.log(JSON.stringify(result, null, 2));
    if (out) await fs.writeFile(path.join(out, 'results.json'), JSON.stringify(result, null, 2) + '\n');
  } finally { await browser.close(); }
}

module.exports = {exerciseLearningUI};
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
