// Browser regression suite. Requires Playwright and an installed Chromium or WebKit.
// BROWSER=webkit selects WebKit; CHROMIUM_EXECUTABLE can select a local Chromium.
// BASE_URL can point to the deployed site; otherwise serve the site at its Pages subpath.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const browsers=require('playwright');
const root=path.resolve(__dirname,'../site');
const mount='/bizic-dictionary/';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2'};
let server,browser;
const checks=[];
async function main(){
 let base=process.env.BASE_URL;
 if(!base){
  server=http.createServer((req,res)=>{
   const url=new URL(req.url,'http://localhost');
   if(!url.pathname.startsWith(mount)){res.writeHead(404).end();return;}
   const name=decodeURIComponent(url.pathname.slice(mount.length))||'index.html';
   const file=path.resolve(root,name);
   if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.existsSync(file)?fs.readFileSync(file):zlib.gunzipSync(fs.readFileSync(file+'.gz')));}
   catch{res.writeHead(404).end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  base='http://127.0.0.1:'+server.address().port+mount;
 }
 const engine=process.env.BROWSER||'chromium';
 browser=await browsers[engine].launch({headless:true,...(engine==='chromium'?{executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']}:{} )});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce',acceptDownloads:true});
 const page=await context.newPage(),errors=[],badAssets=[];
 page.setDefaultTimeout(20000);
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400&&/\.(?:js|css|json|woff2)(?:\?|$)/.test(response.url()))badAssets.push([response.status(),response.url()]);});
 const ready=async view=>{
  await page.waitForFunction(v=>typeof D!=='undefined'&&D&&state.view===v&&!!document.querySelector('#main h1'),view,{timeout:90000});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.equal(await page.locator('aside nav .active').getAttribute('data-view'),view);
 };
 const tap=async selector=>{
  const target=page.locator(selector).first();
  if(!await target.evaluate(el=>el.tagName==='SUMMARY'))for(const detail of await target.locator('xpath=ancestor::details').all())if(await detail.getAttribute('open')===null)await detail.locator('summary').first().tap();
  await target.tap();
 };
 const nav=async view=>{await tap('aside nav [data-view="'+view+'"]');await ready(view);};
 const closed=async()=>page.waitForFunction(()=>!document.querySelector('#detail').open);
 const close=async()=>{await tap('#close');await closed();};
 const visit=async(hash,view)=>{await page.goto(base+hash);await ready(view);};
 const back=async view=>{await page.goBack();await ready(view);};
 const pass=name=>{checks.push(name);console.log('PASS ['+engine+']: '+name);};
 const notationHistoryChecks=async()=>{
  await visit('#notation','notation');
  await tap('[data-pair-source="zhou-ts"]');await page.waitForSelector('dialog[open]');
  const evidence=await page.locator('#detail-body').innerText();
  await page.goBack();await closed();await ready('notation');
  await page.goForward();await page.waitForSelector('dialog[open]');
  assert.equal(await page.locator('#detail-body').innerText(),evidence);
  await page.reload();await page.waitForSelector('dialog[open]',{timeout:90000});
  assert.equal(await page.locator('#detail-body').innerText(),evidence);
  await close();
  await page.locator('#notation-source').selectOption('zhou-fx');
  await page.locator('#notation-input').fill('kei21');await tap('#notation-converter button');
  const converted=await page.evaluate(()=>JSON.stringify(notationState));
  await nav('words');await back('notation');
  assert.equal(await page.evaluate(()=>JSON.stringify(notationState)),converted);
  await page.reload();await ready('notation');
  assert.equal(await page.evaluate(()=>JSON.stringify(notationState)),converted);
  await page.locator('#notation-input').fill('en35');await nav('words');await back('notation');
  assert.equal(await page.inputValue('#notation-input'),'en35');
  await page.locator('#notation-source').selectOption('brassett-2004');
  assert.equal(await page.inputValue('#notation-input'),'en35');
  pass('Transcription evidence Back/Forward/Close/reload; converter and draft input restore');
 };
 if(process.env.QA_FOCUS==='notation'){
  await notationHistoryChecks();assert.deepEqual(errors,[]);assert.deepEqual(badAssets,[]);return;
 }

 await visit('#home','home');
 for(const view of ['words','grammar','notation','history','corpus','sources','home']){
  await nav(view);
  assert((await page.locator('#main').innerText()).length>40,view+' content');
 }
 await back('sources');
 await page.goForward();await ready('home');
 pass('All seven mobile navigation targets, browser Back and Forward');

 const renderCounts=await page.evaluate(async()=>{
  await loadAllCorpusEvidence();
  const groups=[['sources',D.sources,sourceDetail],['corpus',D.corpus,corpusDetail],['comparisons',D.reconstructions,reconstructionDetail]],counts={};
  for(const [kind,records,renderDetail] of groups){
   for(const record of records){const html=renderDetail(record);if(!html||html.includes('data-save=')||html.includes('id="save-note"'))throw Error(kind+' detail failed: '+record.id);}
   counts[kind]=records.length;
  }
  return counts;
 });
 pass('All detail renderers: '+JSON.stringify(renderCounts));

 await nav('words');
 await page.locator('#query').fill('here');await tap('[data-search-language="en"]');
 await page.waitForSelector('.word-card');
 assert.equal(await page.evaluate(()=>state.searchLanguage),'en');
 const meanings=await page.locator('.word-card-meaning').allTextContents();
 assert(meanings.some(x=>/here/.test(x)));
 assert(meanings.every(x=>/\bhere\b/.test(x)),'every hit has a matching sense');
 assert(!meanings.some(x=>/English.*here/.test(x)),'editorial notes do not create false matches');
 assert.equal(await page.locator('.word-card-english').first().evaluate(el=>[...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join('').trim()),'here','exact gloss ranks first');
 const searchURL=page.url();
 await nav('history');await back('words');
 assert.equal(await page.inputValue('#query'),'here');
 assert.equal(await page.evaluate(()=>state.searchLanguage),'en');
 assert.deepEqual(await page.locator('.word-card-meaning').allTextContents(),meanings);
 await page.reload();await ready('words');
 assert.equal(await page.inputValue('#query'),'here');
 assert.equal(page.url(),searchURL);
 pass('Search scope and results survive Back and reload; here excludes there');

 await tap('.word-card-content');await page.waitForSelector('dialog[open]');
 const detailHeading=await page.locator('#detail-body h1').first().innerText();
 await page.goBack();await closed();await ready('words');
 assert.equal(await page.inputValue('#query'),'here');
 await page.goForward();await page.waitForSelector('dialog[open]');
 assert.equal(await page.locator('#detail-body h1').first().innerText(),detailHeading);
 await close();
 pass('Back closes details before leaving the list; Forward restores details');

 await nav('words');await tap('#browse-all-words');
 await tap('.filter-disclosure>summary');
 await page.locator('[data-filter="dialect"]').selectOption({index:1});
 await tap('.pager button:last-child');
 await page.waitForFunction(()=>state.page===2);
 const filters=await page.evaluate(()=>({dialect:state.dialect,page:state.page}));
 const listIds=await page.locator('.word-card-content').evaluateAll(items=>items.map(el=>el.dataset.open));
 await page.evaluate(()=>window.scrollTo({top:Math.min(800,document.documentElement.scrollHeight-innerHeight),behavior:'instant'}));
 const savedY=await page.evaluate(()=>scrollY);
 // Dispatch the same navigation action without scrolling the static mobile menu into view.
 await page.locator('aside nav [data-view="corpus"]').dispatchEvent('click');await ready('corpus');await back('words');
 assert.deepEqual(await page.evaluate(()=>({dialect:state.dialect,page:state.page})),filters);
 assert.deepEqual(await page.locator('.word-card-content').evaluateAll(items=>items.map(el=>el.dataset.open)),listIds);
 await page.waitForFunction(y=>Math.abs(scrollY-y)<3,savedY);
 await page.reload();await ready('words');
 assert.deepEqual(await page.evaluate(()=>({dialect:state.dialect,page:state.page})),filters);
 pass('Dictionary filters, pagination, list contents and scroll restore');

 await nav('corpus');
 const collections=await page.locator('[data-corpus-collection]').evaluateAll(items=>items.map(el=>el.dataset.corpusCollection));
 assert.equal(collections.length,3);
 for(const collection of collections){
  await tap('[data-corpus-collection="'+collection+'"]');
  await page.waitForSelector('.corpus-card-content[data-open]');
  const collectionURL=page.url();
  await page.reload();await ready('corpus');
  assert.equal(await page.evaluate(()=>state.corpusCollection),collection);
  await tap('.corpus-card-content[data-open]');await page.waitForSelector('dialog[open]');
  assert((await page.locator('#detail-body').innerText()).length>50);
  assert.equal(await page.locator('#note,#save-note,.bookmark').count(),0);
  await page.goBack();await closed();
  assert.equal(page.url(),collectionURL);
  await tap('[data-corpus-collection=""]');
 }
 pass('All three corpus collections, their readers, collection deep links and Back');

 await nav('history');await tap('#main [data-open]');await page.waitForSelector('dialog[open]');await close();
 await nav('home');await page.locator('#query').fill('water');await tap('#search-form button');
 await page.waitForSelector('[data-results="history"]');
 await tap('[data-results="history"]');await ready('history');
 assert.equal(await page.inputValue('#query'),'water');
 await back('home');assert.equal(await page.inputValue('#query'),'water');
 pass('Historical comparison and cross-page global search');

 await visit('#grammar/north/101/1','grammar');
 const ref=page.locator('.grammar-article .grammar-citation').first();
 const target=await ref.getAttribute('data-footnote-target'),grammarURL=page.url();
 await ref.tap();
 assert.equal(await page.locator('[id="'+target+'"]').isVisible(),true);
 assert.equal(page.url(),grammarURL);
 await page.reload();await ready('grammar');
 assert.equal(await page.evaluate(()=>state.grammarSection),'101.1');
 await tap('.chapter-pagination a[rel="next"]');
 assert.equal(await page.evaluate(()=>state.grammarSection),'101.2');
 await back('grammar');assert.equal(await page.evaluate(()=>state.grammarSection),'101.1');
 await tap('[data-grammar-dialect="south"]');
 assert.equal(await page.evaluate(()=>state.grammarDialect),'south');
 await back('grammar');assert.equal(await page.evaluate(()=>state.grammarDialect),'north');
 pass('Grammar chapter/dialect navigation, footnotes, reload and chapter history');

 const chapters=await page.evaluate(()=>Object.entries(DIALECT_GRAMMARS).flatMap(([dialect,list])=>list.map(ch=>({dialect,id:ch.id}))));
 for(const chapter of chapters){
  await page.evaluate(c=>{location.hash='grammar/'+c.dialect+'/'+c.id;},chapter);
  await page.waitForFunction(c=>state.view==='grammar'&&state.grammarDialect===c.dialect&&state.chapter===c.id,chapter);
  assert((await page.locator('.grammar-article').innerText()).length>30,chapter.dialect+'/'+chapter.id);
 }
 pass('All '+chapters.length+' north/south chapter deep links react to hash changes');

 await visit('#grammar/north/9','grammar');
 const queryButton=page.locator('[data-grammar-query]').first();
 if(await queryButton.count()){
  await page.locator('.grammar-research > summary').first().tap();
  await queryButton.tap();await ready('sources');
  const query=await page.inputValue('#query');
  assert(query);
  assert(page.url().includes('#sources'));
  await page.reload();await ready('sources');assert.equal(await page.inputValue('#query'),query);
  await back('grammar');
 }
 await visit('#grammar/north/101/1','grammar');
 await page.goto(new URL('guides/verbs.html',base).href);await ready('grammar');
 assert.equal(await page.evaluate(()=>state.chapter),'104');
 await back('grammar');assert.equal(await page.evaluate(()=>state.chapter),'101');
 pass('Legacy continuous-reading guide redirects to current grammar and Back restores the reading page');

 for(const [hash,view] of [['#saved','home'],['#topics','sources'],['#not-a-page','home'],['#grammar/north/999','grammar']]){
  await visit(hash,view);
  assert(!/999|undefined|NaN/.test(await page.locator('h1').first().innerText()));
 }
 pass('Removed routes, unknown routes and invalid chapters fall back safely');

 await nav('notation');
 const notationSources=await page.locator('#notation-source option').evaluateAll(items=>items.map(el=>el.value));
 for(const value of notationSources){
  await page.locator('#notation-source').selectOption(value);
  assert((await page.locator('#main').innerText()).length>100);
 }
 await tap('#main [data-open="brassett-2006"]');await page.waitForSelector('dialog[open]');await close();
 pass('All '+notationSources.length+' transcription source selectors and source detail');
 await notationHistoryChecks();

 for(const width of [320,375,390,430,768,1280]){
  await page.setViewportSize({width,height:844});
  for(const lang of ['zh','en']){
   await page.selectOption('#ui-language',lang);
   for(const view of ['home','words','grammar','notation','history','corpus','sources']){
    await nav(view);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,lang+' '+view+' overflows at '+width);
    const navClipped=await page.locator('aside nav button').evaluateAll(items=>items.some(b=>b.scrollWidth>b.clientWidth+2));
    assert.equal(navClipped,false,lang+' navigation clips at '+width);
   }
  }
 }
 pass('84 page/language/viewport combinations (320–1280 px) without page overflow');
 assert.deepEqual(errors,[],'Unhandled browser errors');
 assert.deepEqual(badAssets,[],'Required application assets must load');
 console.log(JSON.stringify({engine,checks:checks.length,browserErrors:errors,failedAssets:badAssets},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(server)await new Promise(resolve=>server.close(resolve));});
