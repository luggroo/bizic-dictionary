// Run with Playwright installed; CHROMIUM_EXECUTABLE may select a local browser.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path'), http=require('node:http'), zlib=require('node:zlib');
const root=path.resolve(__dirname,'../site');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost'), name=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1)), file=path.resolve(root,name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  try {res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.existsSync(file)?fs.readFileSync(file):zlib.gunzipSync(fs.readFileSync(file+'.gz')));} catch {res.writeHead(404).end();}
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
  try {
    const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port);
    await page.waitForSelector('.hero',{timeout:90000});
    assert.equal(await page.locator('.brand [data-ui-tujia]').innerText(),'bízīkǎ áhxī');
    await page.selectOption('#ui-language','en');
    assert.match(await page.title(),/^Overview/);
    assert.equal(await page.locator('nav [data-ui-tujia="words"]').innerText(),'cīcī nī');
    await page.selectOption('#spelling-control [data-spelling-display="north"]','ye');
    assert.equal(await page.locator('.brand [data-ui-tujia]').innerText(),'bifzixkar afhxix');
    assert.equal(await page.locator('nav [data-ui-tujia="saved"]').innerText(),'suxsux-civ');
    await page.locator('nav [data-view="words"]').click();
    assert.equal(await page.locator('.word-card').count(),12);
    const snapshot=await page.evaluate(()=>JSON.stringify(D.words.map(w=>[w.id,w.zh,w.en,w.term,w.forms,w.attestations])));
    await page.locator('#query').fill('水');
    await page.locator('[data-search-language="zh"]').click();
    assert.match(await page.locator('.result-head').innerText(),/entries/);
    assert.match(await page.locator('.word-card-meaning').first().innerText(),/水/);
    const before=await page.locator('.word-card-meaning').allTextContents();
    await page.selectOption('#ui-language','zh');
    assert.deepEqual(await page.locator('.word-card-meaning').allTextContents(),before);
    assert.equal(await page.locator('[data-search-language][aria-pressed]').count(),0);
    assert.equal(await page.locator('#search-form button').count(),0);
    assert.equal(await page.evaluate(()=>state.searchLanguage),'zh');
    assert.equal(await page.inputValue('#query'),'水');
    await page.selectOption('#ui-language','en');
    const bookmark=page.locator('.bookmark').first(),id=await bookmark.getAttribute('data-save');
    assert.match(await bookmark.getAttribute('aria-label'),/suxsux/);
    await bookmark.click();
    assert.equal(await bookmark.innerText(),'★');
    await page.locator('.word-card-content').first().click();
    await page.waitForSelector('dialog[open]');
    assert.match(await page.locator('#detail-label').innerText(),/Dictionary entry/);
    assert.match(await page.locator('#detail-body>h2').innerText(),/水/);
    await page.selectOption('#detail-spelling-control [data-spelling-display="north"]','accent');
    assert.equal(await page.locator('.brand [data-ui-tujia]').innerText(),'bízīkǎ áhxī');
    await page.locator('#close').click();
    await page.locator('nav [data-view="saved"]').click();
    assert.equal(await page.locator('#main [data-save="'+id+'"]').count(),1);
    await page.reload();
    await page.waitForSelector('.word-card',{timeout:90000});
    assert.equal(await page.inputValue('#ui-language'),'en');
    assert.equal(await page.locator('.brand [data-ui-tujia]').innerText(),'bízīkǎ áhxī');
    for(const view of ['home','words','corpus','sources','grammar','notation','history','topics','saved']){
      await page.locator('nav [data-view="'+view+'"]').click();
      assert(await page.locator('#main').innerText(),view+' is empty');
      assert(!/未能载入|undefined|NaN/.test(await page.locator('#main').innerText()),view+' failed');
    }
    assert.equal(await page.evaluate(()=>JSON.stringify(D.words.map(w=>[w.id,w.zh,w.en,w.term,w.forms,w.attestations]))),snapshot);
    for(const width of [390,768,1280]){
      await page.setViewportSize({width,height:844});
      for(const view of ['home','words','corpus','grammar','notation']){
        await page.locator('nav [data-view="'+view+'"]').click();
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
        assert.equal(overflow,false,view+' page overflows at '+width+'px');
        const crowded=await page.locator('aside>nav button').evaluateAll(items=>items.some(b=>b.scrollWidth>b.clientWidth+2));
        assert.equal(crowded,false,'Navigation labels overlap at '+width+'px');
      }
    }
    await page.setViewportSize({width:390,height:844});
    await page.locator('nav [data-view="words"]').click();
    await page.screenshot({path:'/tmp/tujia-ui-mobile-en.png',fullPage:true});
    await page.selectOption('#ui-language','zh');
    await page.screenshot({path:'/tmp/tujia-ui-mobile-zh.png',fullPage:true});
    assert.equal(await page.locator('nav [data-view="words"]>span').innerText(),'词汇检索\ncīcī nī');
    assert.deepEqual(errors,[]);
    console.log('PASS: UI languages and both spellings; search/filter values; protected glosses and source data; bookmark/detail/reload; nine views; 390/768/1280px layouts.');
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
