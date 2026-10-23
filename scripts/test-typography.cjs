/* Run against a served site after prepare-webfonts.py.
   BASE_URL=http://127.0.0.1:8000/ node scripts/test-typography.cjs
   Set BROWSER=webkit for WebKit; Playwright must be installed. */
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
(async () => {
  const engine = process.env.BROWSER === 'webkit' ? webkit : chromium;
  const browser = await engine.launch({ headless: true, ...(process.env.BROWSER==='webkit'?{}:{executablePath:process.env.CHROMIUM_EXECUTABLE||undefined}) });
  try {
    for (const width of [320, 390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.BASE_URL || 'http://127.0.0.1:8000/');
      await page.waitForSelector('.metrics');
      await page.evaluate(() => document.fonts.ready);
      for (const view of ['home','words','grammar','notation','history','corpus','sources']) {
        await page.locator(`aside>nav [data-view="${view}"]`).click();
        await page.waitForTimeout(100);
        const result = await page.evaluate(() => ({
          view: state.view,
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          invalid: [...document.querySelectorAll('.bilingual-label')].filter(el => {
            const primary = el.querySelector(':scope>[data-ui-tujia]');
            const secondary = el.querySelector(':scope>.ui-secondary');
            return !primary || !secondary || el.firstElementChild !== primary || primary.getBoundingClientRect().bottom > secondary.getBoundingClientRect().top + 1;
          }).map(el => el.textContent),
          font: getComputedStyle(document.querySelector('aside>nav .tujia-ui')).fontFamily
        }));
        assert.equal(result.view, view);
        assert.equal(result.overflow, false, `${width}px ${view}`);
        assert.deepEqual(result.invalid, []);
        assert.match(result.font, /^"Gentium Plus"/);
      }
      for (const language of ['en','zh','en','zh']) await page.locator('#ui-language').selectOption(language);
      await page.waitForTimeout(100);
      assert.equal(await page.locator('aside>nav [data-view="words"] .ui-secondary').innerText(), '词汇检索');
      assert.equal(await page.locator('aside>nav [data-ui-tujia]').count(), 7);
      const words = await page.evaluate(() => [D.words.find(w => completeSpellings(w).length && wordIPA(w).length)?.id, D.words.find(w => !completeSpellings(w).length && wordIPA(w).length)?.id]);
      for (let i = 0; i < words.length; i++) {
        assert.ok(words[i]);
        await page.evaluate(id => openDetail(id), words[i]);
        await page.waitForTimeout(100);
        assert.equal(await page.locator('#detail-body h1.word').getAttribute('data-script'), i === 0 ? 'transliteration' : 'ipa');
        await page.locator('#close').click();
      }
      await page.locator('aside>nav [data-view="words"]').click();
      await page.locator('details:has(#spelling-control)>summary').click();
      await page.locator('[data-spelling-display="north"]').first().selectOption('ye');
      await page.waitForTimeout(100);
      assert.equal(await page.locator('aside>nav [data-view="words"] .tujia-ui').innerText(), 'cixcix nix');
      await page.locator('[data-spelling-display="north"]').first().selectOption('accent');
      const loaded = await page.evaluate(async () => {
        const sample = 'ā á ǎ à ī í ǐ ì ǖ ǘ ǚ ǜ a̱ o̱ a̲ o̲ á̱ ǒ̱ á̱ ǒ̱ ⁵⁵ ³³ ³¹ ⁵³';
        const specs = ['400 20px "Gentium Plus"','700 20px "Gentium Plus"','italic 400 20px "Gentium Plus"','italic 700 20px "Gentium Plus"','400 20px "Charis SIL"'];
        return Promise.all(specs.map(async spec => (await document.fonts.load(spec, sample)).length > 0));
      });
      assert.ok(loaded.every(Boolean), 'All full webfont faces must load');
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: seven pages, bilingual order, languages, spelling, IPA and fonts`);
      await context.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
