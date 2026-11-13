// Exercise static query -> witness navigation with JavaScript disabled.
// Compare the rendered records with the same prepared data used by the live site.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const zlib = require('node:zlib');
const {chromium} = require('playwright');
const {renderEntry} = require('./build-readable-dictionary.cjs');

const root = path.resolve(process.argv[2] || path.join(__dirname, '../site'));
const read = name => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root, 'prepared', name + '.json.gz'))));
const indexPath = '/text/';
const queryPath = '/text/lookup/zh/吃.html';
const ids = ['w684', 'stedt-rn-43584'];
const entries = new Map(ids.map(id => [id, read('entries/' + id)]));
const candidates = read('words-index').words.filter(w => w._search.chinese.includes('吃'));
const version = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<meta name="prepared-data-version" content="([^"]+)"/)[1];
const snapshots = process.env.READABLE_SCREENSHOT_DIR && path.resolve(process.env.READABLE_SCREENSHOT_DIR);
if (snapshots) fs.mkdirSync(snapshots, {recursive: true});

const server = http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) return res.writeHead(403).end();
    if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch { res.writeHead(404).end(); }
});

async function inspectDocument(page) {
  assert.equal(await page.locator('script').count(), 0, 'evidence pages contain no scripts');
  assert.equal(await page.locator('[hidden], details:not([open])').count(), 0, 'all evidence is directly readable');
  const active = await page.locator('*').evaluateAll(elements => elements.flatMap(el => [...el.attributes]
    .filter(a => /^on/i.test(a.name) || /^(href|src|action)$/i.test(a.name) && /^\s*javascript:/i.test(a.value))
    .map(a => el.tagName + ':' + a.name)));
  assert.deepEqual(active, [], 'no event handlers or executable URLs');
  assert((await page.locator('body').innerText()).includes(version), 'published data version is readable');
  assert.equal(await page.locator('meta[name="text-scale"]').getAttribute('content'), 'scale', 'opt into supported platform text scaling');
  assert.equal(await page.locator('h1#main-heading[tabindex="-1"]').count(), 1, 'a single focusable main heading receives the skip link');
  const destinations = await page.locator('.text-index a, .card .actions a').evaluateAll(elements => elements.map(el => ({href: el.getAttribute('href'), text: el.innerText})));
  for (const link of destinations) assert(link.text.includes(new URL(link.href, 'https://tujia.biz').href), 'a flattened candidate/index link retains its exact destination');
}

async function inspectTextDiscovery(browser, base) {
  const context = await browser.newContext({javaScriptEnabled: false});
  try {
    const page = await context.newPage();
    const extract = text => [...new Set(text.match(/https:\/\/tujia\.biz\/[^\s<>]+/g) || [])];
    // Only the directory URL is seeded. All subsequent destinations come from
    // visible text, modelling a reader which loses href attributes.
    await page.goto(base + '/text/');
    const directory = await page.locator('main').innerText();
    assert(directory.includes('目前收录') && directory.includes('其他义项'), 'directory explains the finite published coverage');
    const lookups = extract(directory).filter(url => new URL(url).pathname.startsWith('/text/lookup/'));
    assert.equal(lookups.length, 1, 'one query is actually advertised');
    await page.goto(base + new URL(lookups[0]).pathname);
    const query = await page.locator('main').innerText();
    const allUrls = extract(query);
    const details = allUrls.filter(url => new URL(url).pathname.startsWith('/text/entry/'));
    assert.equal(details.length, 2, 'only two candidates advertise a text detail page');
    assert.equal(allUrls.filter(url => new URL(url).searchParams.has('id')).length, 2, 'other candidates keep explicitly interactive destinations');
    const discovered = [];
    for (const url of details) {
      const response = await page.goto(base + new URL(url).pathname);
      assert.equal(response.status(), 200, 'a destination discovered in plain text resolves');
      const id = path.basename(new URL(url).pathname, '.html');
      assert(entries.has(id), 'discovered detail belongs to the prepared source');
      await inspectEntry(page, entries.get(id));
      discovered.push({url, witnesses: await page.locator('[data-attestation-id]').count()});
    }
    return {seed: '/text/', query: lookups[0], details: discovered, source: 'visible body text with JavaScript disabled'};
  } finally { await context.close(); }
}

// Computed colors provide a repeatable contrast regression check. This does not
// replace screen-reader testing, OS text-scale testing, or visual review.
async function inspectContrast(page, label) {
  const samples = await page.locator('body, .meta, .scope, dt, dd, a, .note').evaluateAll(elements => {
    const rgb = color => {
      const values = color.match(/[\d.]+/g)?.map(Number);
      if (!values || values.length < 3) throw Error('Unexpected computed color: ' + color);
      return values.length === 3 ? [...values, 1] : values;
    };
    const background = element => {
      const layers = [];
      for (let el = element; el; el = el.parentElement) layers.push(rgb(getComputedStyle(el).backgroundColor));
      let result = [255, 255, 255];
      for (const layer of layers.reverse()) result = result.map((channel, i) => layer[i] * layer[3] + channel * (1 - layer[3]));
      return result;
    };
    const luminance = color => color.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    return elements.filter(el => el.textContent.trim() && !el.classList.contains('skip-link')).map(el => {
      const bg = background(el), style = getComputedStyle(el), fg = rgb(style.color);
      const blended = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]));
      const light = luminance(blended), dark = luminance(bg);
      return {text: el.textContent.trim().slice(0, 60), color: style.color, background: bg, ratio: (Math.max(light, dark) + .05) / (Math.min(light, dark) + .05)};
    });
  });
  const failures = samples.filter(sample => sample.ratio < 4.5);
  assert.deepEqual(failures.slice(0, 5), [], label + ': normal text contrast is at least 4.5:1');
  return Math.min(...samples.map(sample => sample.ratio));
}

async function inspectKeyboard(page, label) {
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true, label + ': first Tab reaches the skip link');
  const skip = await page.locator('.skip-link').evaluate(el => {
    const rect = el.getBoundingClientRect(), css = getComputedStyle(el);
    return {top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height, outline: css.outlineStyle, outlineWidth: parseFloat(css.outlineWidth), opacity: css.opacity, viewport: innerHeight};
  });
  assert(skip.top >= 0 && skip.bottom <= skip.viewport && skip.width > 20 && skip.height > 20 && skip.opacity !== '0', label + ': keyboard focus reveals the skip link inside the viewport');
  assert(skip.outline !== 'none' && skip.outlineWidth >= 2, label + ': skip link has a visible focus indicator');
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#main-heading').evaluate(el => el === document.activeElement), true, label + ': Enter moves native focus to the main heading');
  await page.keyboard.press('Tab');
  const focus = await page.evaluate(() => {
    const el = document.activeElement, css = getComputedStyle(el);
    const rgb = color => color.match(/[\d.]+/g).map(Number);
    let parent = el, bg;
    do { bg = rgb(getComputedStyle(parent).backgroundColor); parent = parent.parentElement; } while (bg[3] === 0 && parent);
    const luma = color => color.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
    const a = luma(rgb(css.outlineColor)), b = luma(bg);
    return {tag: el.tagName, outline: css.outlineStyle, width: parseFloat(css.outlineWidth), ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05)};
  });
  assert.equal(focus.tag, 'A', label + ': next Tab reaches a native link');
  assert(focus.outline !== 'none' && focus.width >= 2, label + ': native link has a visible focus indicator');
  assert(focus.ratio >= 3, label + ': focus outline contrasts with its surface by at least 3:1');
}

async function inspectAccessibility(browser, base, routes) {
  const report = [], surfaces = {};
  for (const mode of [
    {name: 'light', colorScheme: 'light', forcedColors: 'none'},
    {name: 'dark', colorScheme: 'dark', forcedColors: 'none'},
    {name: 'forced-colors', colorScheme: 'light', forcedColors: 'active'}
  ]) {
    const context = await browser.newContext({javaScriptEnabled: false, viewport: {width: 320, height: 800}, colorScheme: mode.colorScheme, forcedColors: mode.forcedColors});
    try {
      const page = await context.newPage(), requests = [];
      page.on('request', request => requests.push({url: request.url(), type: request.resourceType(), navigation: request.isNavigationRequest()}));
      for (const route of routes) {
        await page.goto(base + encodeURI(route));
        await inspectDocument(page);
        assert.equal(await page.evaluate(() => matchMedia('(forced-colors: active)').matches), mode.forcedColors === 'active', 'browser forced-colors emulation is active as requested');
        assert.equal(await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches), mode.colorScheme === 'dark', 'browser color-scheme emulation is active as requested');
        if (route === queryPath) surfaces[mode.name] = await page.locator('body').evaluate(el => getComputedStyle(el).backgroundColor);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, mode.name + route + ': 320px viewport reflows');
        await inspectKeyboard(page, mode.name + route);
        const targets = await page.locator('header a, .toc a, .actions a, .text-index a, main a[href^="https://"]').evaluateAll(elements => elements.map(el => ({text: el.textContent.slice(0, 60), height: el.getBoundingClientRect().height})));
        assert.deepEqual(targets.filter(target => target.height < 43.9), [], mode.name + route + ': navigation and source links have 44px minimum target height');
        const minimumContrast = await inspectContrast(page, mode.name + route);
        if (snapshots && route === queryPath) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({path: path.join(snapshots, 'accessible-' + mode.name + '-320px.png'), fullPage: true});
        }
        // A controlled root-font change checks relative sizing and reflow. It
        // does not emulate an operating system's accessibility font settings.
        await page.evaluate(() => {
          const style = document.createElement('style');
          style.textContent = 'html { font-size: 200% !important; } * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }';
          document.head.appendChild(style);
        });
        assert((await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize))) >= 31.9, 'body text responds to 200% root font size');
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, mode.name + route + ': 320px viewport at 200% root font with expanded text spacing has no horizontal overflow');
        const clipped = await page.locator('main *').evaluateAll(elements => elements.filter(el => {
          const style = getComputedStyle(el);
          return /hidden|clip/.test(style.overflowX) && el.scrollWidth > el.clientWidth + 1 || /hidden|clip/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
        }).map(el => el.textContent.slice(0, 60)));
        assert.deepEqual(clipped, [], mode.name + route + ': enlarged and spaced text is not clipped by fixed containers');
        if (route.startsWith('/text/entry/')) await inspectEntry(page, entries.get(path.basename(route, '.html')));
        report.push({mode: mode.name, route, minimumTextContrast: Number(minimumContrast.toFixed(2))});
        if (snapshots && route === queryPath) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({path: path.join(snapshots, 'accessible-' + mode.name + '-320px-200percent.png')});
        }
      }
      assert.deepEqual(requests.filter(request => request.type !== 'document' || !request.navigation), [], mode.name + ': only document navigations, no external dependencies');
    } finally { await context.close(); }
  }
  assert.notEqual(surfaces.light, surfaces.dark, 'dark preference selects a distinct page surface');
  return report;
}

async function inspectEntry(page, entry) {
  const records = page.locator('[data-attestation-id]');
  assert.deepEqual((await records.evaluateAll(es => es.map(e => e.dataset.attestationId))).sort(),
    entry.attestations.map(a => a.id).sort(), entry.id + ': all original witnesses survive extraction');
  for (const att of entry.attestations) {
    const record = page.locator('[data-attestation-id=' + JSON.stringify(att.id) + ']');
    const text = await record.innerText();
    for (const [field, value] of Object.entries({id: att.id, term: att.term, zh: att.zh, en: att.en, locator: att.locator})) {
      if (value) assert(text.includes(value), att.id + ': preserve ' + field);
    }
    if (att.originalEn !== undefined) {
      const original = await record.locator('dt').evaluateAll(dts => dts.filter(dt => dt.textContent.includes('Original English gloss')).map(dt => dt.nextElementSibling.textContent));
      assert.deepEqual(original, [att.originalEn || '未提供 / Not supplied'], att.id + ': retain whether an original English gloss was supplied');
    }
    if (att.enTranslation) {
      const provenance = await record.locator('dt').evaluateAll(dts => dts.filter(dt => dt.textContent.includes('English gloss provenance')).map(dt => dt.nextElementSibling.textContent));
      assert.equal(provenance.length, 1, att.id + ': retain English editorial translation provenance');
      for (const key of ['method', 'basis']) if (att.enTranslation[key]) assert(provenance[0].includes(att.enTranslation[key]), att.id + ': retain English gloss ' + key);
    }
    for (const [scheme, values] of Object.entries(entry.notations || {})) {
      const linked = values.filter(n => n.attestationIds?.includes(att.id));
      const rendered = await record.locator('[data-notation-scheme=' + JSON.stringify(scheme) + ']').allTextContents();
      for (const notation of linked) assert(rendered.some(s => s.includes(notation.text)), att.id + ': retain linked ' + scheme + ' ' + notation.text);
      for (const notation of linked.filter(n => n.sourceMethods?.length > 1 || n.sourceProfiles?.length > 1)) {
        assert(rendered.some(s => s.includes(notation.text) && s.includes('metadata does not assign an origin to each witness')), att.id + ': merged notation processing origins are not attributed to individual witnesses');
        for (const profile of notation.sourceProfiles || []) assert(rendered.some(s => s.includes(notation.text) && s.includes(profile)), att.id + ': retain merged profile ' + profile);
      }
      const otherOnly = values.filter(n => !n.attestationIds?.includes(att.id) && !linked.some(own => own.text === n.text));
      for (const notation of otherOnly) assert(!rendered.some(s => s.includes(notation.text)), att.id + ': do not import another witness\'s ' + scheme + ' ' + notation.text);
    }
  }
}

async function inspectAdversarialFixture(browser) {
  const context = await browser.newContext({javaScriptEnabled: false});
  try {
    const page = await context.newPage();
    const attack = '<img src=x onerror="alert(1)"> & <script>alert(2)</script>';
    const entry = {
      id: 'fixture-entry', zh: attack, en: 'Fixture only', location: 'ENTRY_ONLY_LOCALITY', dialect: 'ENTRY_ONLY_DIALECT',
      attestations: [
        {id: 'fixture-one', source: 'fixture-source', term: attack, zh: 'Fixture sense one', locator: attack, notice: attack},
        {id: 'fixture-two', source: 'fixture-source', term: 'SOURCE_FORM_TWO', zh: 'Fixture sense two', en: 'Fixture English', originalEn: '', enTranslation: {method: 'FIXTURE_METHOD', basis: 'FIXTURE_BASIS'}, location: 'EXPLICIT_WITNESS_LOCALITY', dialect: 'EXPLICIT_WITNESS_DIALECT'}
      ],
      notations: {ipa: [
        {text: 'LINKED_FORM_ONE', attestationIds: ['fixture-one'], method: 'source'},
        {text: 'LINKED_FORM_TWO', attestationIds: ['fixture-two'], method: 'source'},
        {text: 'SHARED_FORM', attestationIds: ['fixture-one', 'fixture-two'], method: 'source'},
        {text: 'UNLINKED_FORM', attestationIds: [], method: 'derived'}
      ], 'unknown / scheme': [{text: 'LITERAL_METADATA_FORM', attestationIds: ['fixture-one'], method: 'unknown / method'}]}
    };
    const data = {sources: [{id: 'fixture-source', title: attack, location: 'SOURCE_WIDE_LOCALITY', url: 'javascript:alert(3)'}]};
    await page.setContent(renderEntry(entry, {_display: {accent: [{text: attack}]}}, data, version, 'fixture-checksum'));
    await inspectDocument(page);
    assert.equal(await page.locator('img, svg, script').count(), 0, 'source strings remain literal text, not HTML');
    assert((await page.locator('body').innerText()).includes(attack), 'escaping preserves the original transcription and source text');
    await inspectEntry(page, entry);
    const missingEnglishLang = await page.locator('[data-attestation-id="fixture-one"] dt').evaluateAll(dts => dts.filter(dt => dt.textContent.includes('English sense')).map(dt => dt.nextElementSibling.getAttribute('lang')));
    assert.deepEqual(missingEnglishLang, [null], 'a missing bilingual English-gloss placeholder is not labeled entirely English');
    const unknownMetadata = await page.locator('[data-attestation-id="fixture-one"] [data-notation-scheme="unknown / scheme"]').innerText();
    assert(unknownMetadata.includes('unknown / scheme') && unknownMetadata.includes('unknown / method'), 'unknown source metadata retains original slash spacing');
    const fields = await page.locator('[data-attestation-id="fixture-one"] dt').evaluateAll(dts => Object.fromEntries(dts.map(dt => [dt.textContent, dt.nextElementSibling.textContent])));
    assert.equal(Object.entries(fields).find(([label]) => label.includes('Witness locality'))[1], '未记录 / Not recorded', 'unknown witness locality is not inherited from source or merged entry');
    assert.equal(Object.entries(fields).find(([label]) => label.includes('Witness dialect'))[1], '未记录 / Not recorded', 'unknown witness dialect is not inherited from merged entry');
    assert(!Object.values(fields).some(value => value.includes('ENTRY_ONLY_LOCALITY') || value.includes('ENTRY_ONLY_DIALECT')), 'entry scope is never promoted to witness scope');
    const known = await page.locator('[data-attestation-id="fixture-two"]').innerText();
    assert(known.includes('EXPLICIT_WITNESS_LOCALITY') && known.includes('EXPLICIT_WITNESS_DIALECT'), 'explicit witness scope survives');
    assert(!(await page.locator('[data-attestation-id]').allTextContents()).some(text => text.includes('UNLINKED_FORM')), 'unlinked notation cannot become witness evidence');
  } finally { await context.close(); }
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const homeResponse = await fetch(base + '/');
  assert.equal(homeResponse.status, 200, 'default homepage remains available');
  assert.equal(homeResponse.redirected, false, 'default homepage does not redirect to the text directory');
  const homeHtml = await homeResponse.text();
  assert(/<form\b[^>]*\bid=["']search-form["']/i.test(homeHtml), 'default homepage retains its interactive search form');
  assert(/<script\b[^>]*\bsrc=["'][^"']*\bapp\.js(?:\?[^"']*)?["']/i.test(homeHtml), 'default homepage retains its existing application script');
  assert(!/<(?:a|link|script|iframe|form|meta)\b[^>]*\b(?:href|src|action|content)=["'][^"']*(?:\/|^)text\//i.test(homeHtml), 'homepage has no text-directory link, preload, prefetch, script or redirect');
  assert(!/<noscript\b[^>]*>[\s\S]*?\/text\/[\s\S]*?<\/noscript>/i.test(homeHtml), 'no text-directory noscript promotion');
  const routes = [indexPath, queryPath, ...ids.map(id => '/text/entry/' + id + '.html')];
  const sizes = {};
  for (const route of routes) {
    const response = await fetch(base + encodeURI(route));
    assert.equal(response.status, 200, route + ': direct HTTP succeeds');
    assert(response.headers.get('content-type').includes('text/html'), route + ': ordinary readable HTML');
    const html = await response.text();
    sizes[route] = Buffer.byteLength(html);
    assert(html.includes('吃'), route + ': evidence is in the initial response');
    assert(!/<script\b/i.test(html), route + ': no client rendering needed');
  }
  const executablePath = process.env.CHROMIUM_EXECUTABLE || ['/usr/bin/google-chrome', '/usr/bin/chromium'].find(fs.existsSync);
  const browser = await chromium.launch({headless: true, executablePath, args: ['--no-sandbox', '--disable-dev-shm-usage']});
  let accessibility, textDiscovery;
  try {
    await inspectAdversarialFixture(browser);
    textDiscovery = await inspectTextDiscovery(browser, base);
    for (const [label, viewport] of [['desktop', {width: 1280, height: 900}], ['mobile', {width: 390, height: 844}]]) {
      const context = await browser.newContext({javaScriptEnabled: false, viewport});
      const page = await context.newPage();
      const requests = [], errors = [];
      page.on('request', request => requests.push({url: request.url(), type: request.resourceType(), navigation: request.isNavigationRequest()}));
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + indexPath);
      await inspectDocument(page);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, label + ': text index has no horizontal overflow');
      for (const id of ids) assert(await page.locator('main a[href$="entry/' + id + '.html"]').count(), 'text index lists the actual source page ' + id);
      if (snapshots) await page.screenshot({path: path.join(snapshots, label + '-text-index.png'), fullPage: true});
      await page.locator('.text-index a[href*="/lookup/zh/"]').first().click();
      assert.equal(decodeURI(new URL(page.url()).pathname), queryPath, 'text index discovers the Chinese query page through a native link');
      await inspectDocument(page);
      const found = await page.locator('[data-entry-id]').evaluateAll(es => es.map(e => e.dataset.entryId));
      assert.deepEqual(found.sort(), candidates.map(w => w.id).sort(), 'all exact candidates remain, including the other Northern localities');
      for (const id of ids) assert(found.includes(id), 'both requested dialect examples are discoverable');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, label + ': no horizontal overflow');
      if (snapshots) await page.screenshot({path: path.join(snapshots, label + '-lookup.png'), fullPage: true});
      for (const id of ids) {
        await page.locator('a[href$="entry/' + id + '.html"]').first().click();
        assert.equal(new URL(page.url()).pathname, '/text/entry/' + id + '.html', 'follow an ordinary link without JavaScript');
        await inspectDocument(page);
        await inspectEntry(page, entries.get(id));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false, label + ' ' + id + ': no horizontal overflow');
        if (snapshots) await page.screenshot({path: path.join(snapshots, label + '-' + id + '.png'), fullPage: true});
        if (snapshots && label === 'desktop' && id === 'w684') {
          await page.locator('[data-attestation-id]').first().evaluate(el => el.scrollIntoView({block: 'start'}));
          await page.screenshot({path: path.join(snapshots, 'desktop-entry-top.png')});
        }
        await page.goBack();
      }
      assert.deepEqual(requests.filter(request => request.type !== 'document' || !request.navigation), [], 'reading makes only document navigations, with no external dependencies');
      assert.deepEqual(errors, [], 'no page errors');
      await context.close();
    }
    accessibility = await inspectAccessibility(browser, base, routes);
  } finally { await browser.close(); }
  console.log(JSON.stringify({result: 'PASS', candidates: candidates.length, witnesses: Object.fromEntries([...entries].map(([id, e]) => [id, e.attestations.length])), htmlBytes: sizes, textDiscovery, accessibility, screenshots: snapshots || null}));
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
