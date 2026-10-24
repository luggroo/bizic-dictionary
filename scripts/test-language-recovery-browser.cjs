// A language change can finish a pending route without losing its detail or draft.
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
let server,base=process.env.BASE_URL;
(async()=>{
 if(!base){
  server=http.createServer((req,res)=>{
   const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',file=path.resolve(root,name);
   if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   try{res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port+'/';
 }
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
 const checks=[],errors=[];
 const ready=p=>p.waitForFunction(()=>window.fastReady&&navigationReady&&!SitePages.pending&&!!document.querySelector('#main h1'));
 const test=async(name,fn)=>{
  const p=await browser.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(30000);p.on('pageerror',e=>errors.push(e.message));
  try{await fn(p);checks.push(name);console.log('PASS: '+name);}finally{await p.close();}
 };
 try{
  await test('cold failed English grammar restores Chinese without another retry',async p=>{
   await p.route('**/grammar-reviewed-i18n.js*',route=>route.fulfill({status:503,body:'busy'}));
   await p.goto(base+'?lang=en#grammar');await p.waitForSelector('#retry-page');
   await p.locator('#ui-language').selectOption('zh');await p.waitForSelector('.grammar-reading-title');await ready(p);
   assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');assert.equal(await p.evaluate(()=>state.view),'grammar');
   assert.equal(new URL(p.url()).searchParams.get('lang'),'zh');
  });
  await test('failed English shared corpus restores its detail and history',async p=>{
   await p.route('**/content-translations.js*',route=>route.fulfill({status:503,body:'busy'}));
   await p.goto(base+'?lang=en&utm_source=qa&id=c1.1#corpus');await p.waitForSelector('#retry-page');
   await p.locator('#ui-language').selectOption('zh');await p.waitForSelector('dialog[open] #detail-body h2');
   assert.equal(await p.evaluate(()=>currentDetail),'c1.1');assert.equal(await p.evaluate(()=>state.view),'corpus');
   assert.equal(new URL(p.url()).searchParams.get('id'),'c1.1');assert.equal(new URL(p.url()).searchParams.get('utm_source'),'qa');
   assert(await p.locator('dialog[open]').getAttribute('aria-labelledby'));
   await p.locator('#close').click();await p.waitForSelector('dialog[open]',{state:'hidden'});assert(!new URL(p.url()).searchParams.has('id'));
   await p.goForward();await p.waitForSelector('dialog[open] #detail-body h2');assert.equal(await p.evaluate(()=>currentDetail),'c1.1');
  });
  await test('pending English shared source restores Chinese before prose completes',async p=>{
   let release,requested;const gate=new Promise(resolve=>{release=resolve}),seen=new Promise(resolve=>{requested=resolve});
   await p.route('**/ui-translations.js*',async route=>{requested();await gate;await route.continue();});
   await p.goto(base+'?lang=en&id=brassett-2006#sources');await seen;
   await p.locator('#ui-language').selectOption('zh');await p.waitForSelector('dialog[open] .grammar-summary');
   const hash=new URL(p.url()).hash,length=await p.evaluate(()=>history.length);release();await p.waitForTimeout(250);
   assert.equal(await p.evaluate(()=>currentDetail),'brassett-2006');assert.equal(await p.evaluate(()=>state.view),'sources');
   assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');assert.equal(new URL(p.url()).hash,hash);assert.equal(await p.evaluate(()=>history.length),length);
  });
  await test('switching routes and language keeps the latest route and unfinished query',async p=>{
   let releaseProse,seenProse,releaseWords,seenWords;
   const proseGate=new Promise(resolve=>{releaseProse=resolve}),proseSeen=new Promise(resolve=>{seenProse=resolve});
   const wordsGate=new Promise(resolve=>{releaseWords=resolve}),wordsSeen=new Promise(resolve=>{seenWords=resolve});
   await p.route('**/grammar-reviewed-i18n.js*',async route=>{seenProse();await proseGate;await route.continue();});
   await p.route('**/prepared/word-search.json.gz*',async route=>{seenWords();await wordsGate;await route.continue();});
   await p.goto(base+'?lang=en#grammar');await proseSeen;
   await p.locator('aside [data-view="words"]').click();await wordsSeen;await p.waitForSelector('#query');
   await p.locator('#query').fill('unfinished query');await p.locator('#query').evaluate(el=>el.setSelectionRange(2,7));
   await p.locator('#ui-language').selectOption('zh');assert.equal(await p.inputValue('#query'),'unfinished query');
   releaseWords();await p.waitForSelector('.word-card');releaseProse();await p.waitForTimeout(250);
   assert.equal(await p.evaluate(()=>state.view),'words');assert.equal(await p.inputValue('#query'),'unfinished query');
   assert.equal(await p.evaluate(()=>state.q),'');assert.equal(new URL(p.url()).hash,'#words');assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');
  });
  await test('recovering a global query initializes the loaded dictionary filters',async p=>{
   await p.route('**/grammar-reviewed-i18n.js*',route=>route.fulfill({status:503,body:'busy'}));
   await p.route('**/prepared/source-*',route=>route.fulfill({status:404,body:'unavailable'}));
   await p.goto(base+'?lang=en#home?q=water');await p.waitForSelector('#retry-page');
   await p.locator('#ui-language').selectOption('zh');await p.waitForSelector('.word-card');await ready(p);
   assert.equal(await p.evaluate(()=>state.view),'home');assert.equal(await p.evaluate(()=>state.q),'water');
   assert.equal(await p.evaluate(()=>window.preparedClassesReady),true);
   await p.locator('aside [data-view="words"]').click();await p.waitForSelector('.word-card');
   assert(await p.locator('[data-filter="pos"] option').count()>5,'part-of-speech filters are initialized after a partial preparation failure');
  });
  for(const view of ['history','corpus'])await test('an obsolete grammar prose failure does not revert '+view+' language',async p=>{
   await p.goto(base+'?lang=zh#grammar');await p.waitForSelector('.grammar-reading-title');
   let release;const gate=new Promise(resolve=>{release=resolve});
   await p.route('**/grammar-reviewed-i18n.js*',async route=>{await gate;await route.fulfill({status:503,body:'busy'});});
   await p.evaluate(()=>{window.pendingLanguage=TujiaUI.setLanguage('en')});
   await p.locator('aside [data-view="'+view+'"]').click();await p.waitForSelector(view==='history'?'.table-wrap':'.corpus-card');
   release();await p.evaluate(()=>window.pendingLanguage);
   assert.equal(await p.evaluate(()=>state.view),view);assert.equal(await p.evaluate(()=>TujiaUI.language),'en');
   assert.equal(await p.evaluate(()=>document.documentElement.lang),'en');assert.equal(new URL(p.url()).searchParams.get('lang'),'en');
  });
  await test('a current prose failure still reverts language and supports retry',async p=>{
   await p.goto(base+'?lang=zh#grammar');await p.waitForSelector('.grammar-reading-title');
   await p.route('**/grammar-reviewed-i18n.js*',route=>route.fulfill({status:503,body:'busy'}));
   await p.evaluate(()=>TujiaUI.setLanguage('en'));
   assert.equal(await p.evaluate(()=>TujiaUI.language),'zh');assert.equal(await p.evaluate(()=>document.documentElement.lang),'zh-CN');
   assert((await p.locator('#toast').innerText()).includes('未能载入'));
   assert.equal(await p.locator('[data-reference-grammar]').getAttribute('data-ui-language'),'zh');
   await p.unroute('**/grammar-reviewed-i18n.js*');await p.evaluate(()=>TujiaUI.setLanguage('en'));
   assert.equal(await p.evaluate(()=>document.documentElement.lang),'en');assert.equal(await p.locator('[data-reference-grammar]').getAttribute('data-ui-language'),'en');
  });
  for(const view of ['grammar','corpus'])await test('repeated '+view+' spelling changes preserve a draft while English prose is pending',async p=>{
   await p.goto(base+'?lang=zh#'+view);await p.waitForSelector(view==='grammar'?'.grammar-reading-title':'.corpus-card');
   await p.locator('.display-settings > summary').click();await p.locator('#query').fill('pending grammar draft');await p.locator('#query').evaluate(el=>el.setSelectionRange(3,9));
   let release,requested;const gate=new Promise(resolve=>{release=resolve}),seen=new Promise(resolve=>{requested=resolve});
   await p.route(view==='grammar'?'**/grammar-reviewed-i18n.js*':'**/content-translations.js*',async route=>{requested();await gate;await route.continue();});
   await p.evaluate(()=>{window.pendingLanguage=TujiaUI.setLanguage('en')});await seen;
   await p.locator('#spelling-control [data-spelling-display="north"]').selectOption('ye');assert.equal(await p.locator('#main #query').count(),0);
   await p.locator('#spelling-control [data-spelling-display="'+(view==='grammar'?'north':'south')+'"]').selectOption(view==='grammar'?'accent':'poj');
   release();await p.evaluate(()=>window.pendingLanguage);await p.waitForSelector(view==='grammar'?'.grammar-reading-title':'.corpus-card');
   assert.equal(await p.inputValue('#query'),'pending grammar draft');assert.equal(await p.evaluate(()=>state.q),'');
   assert.equal(await p.locator('#query').evaluate(el=>el.selectionStart),3);assert.equal(await p.locator('#query').evaluate(el=>el.selectionEnd),9);
   assert.equal(await p.evaluate(()=>spellingDisplay),view==='grammar'?'accent':'ye');assert.equal(await p.evaluate(()=>southernDisplay),view==='grammar'?'accent':'poj');
  });
  for(const view of ['words','grammar'])await test('pending preference draft does not leak after navigating to '+view,async p=>{
   await p.goto(base+'?lang=zh#grammar');await p.waitForSelector('.grammar-reading-title');await p.locator('.display-settings > summary').click();await p.locator('#query').fill('discarded navigation draft');
   let release,requested;const gate=new Promise(resolve=>{release=resolve}),seen=new Promise(resolve=>{requested=resolve});
   await p.route('**/grammar-reviewed-i18n.js*',async route=>{requested();await gate;await route.continue();});
   await p.evaluate(()=>{window.pendingLanguage=TujiaUI.setLanguage('en')});await seen;
   await p.locator('#spelling-control [data-spelling-display="north"]').selectOption('ye');
   await p.locator('aside [data-view="'+view+'"]').click();release();await p.evaluate(()=>window.pendingLanguage);await ready(p);
   assert.equal(await p.evaluate(()=>state.view),view);assert.equal(await p.evaluate(()=>state.q),'');assert.equal(await p.inputValue('#query'),'');
  });
  await test('grammar language changes recalculate submitted results and preserve drafts',async p=>{
   await p.goto(base+'?lang=zh#grammar');await p.waitForSelector('.grammar-reading-title');
   await p.locator('#query').fill('negation');await p.locator('#query').press('Enter');await p.waitForSelector('.grammar-page-results');
   const initial=await p.locator('.grammar-page-results a').count();
   await p.locator('#query').fill('unfinished grammar query');await p.locator('#query').focus();await p.locator('#query').evaluate(el=>el.setSelectionRange(3,8));
   await p.evaluate(()=>scrollTo(0,100));const before=await p.evaluate(()=>({history:history.length,top:scrollY,hash:location.hash}));
   await p.evaluate(()=>TujiaUI.setLanguage('en'));
   const expected=await p.evaluate(()=>grammarSearchPages(state.grammarDialect).filter(p=>contains(p.text,state.q)).length);
   assert(expected>initial,'the English fixture must have additional matches');assert.equal(await p.locator('.grammar-page-results a').count(),expected);
   assert.equal(await p.inputValue('#query'),'unfinished grammar query');assert.equal(await p.evaluate(()=>state.q),'negation');
   assert.equal(await p.evaluate(()=>history.length),before.history);assert.equal(new URL(p.url()).hash,before.hash);
   assert.equal(await p.locator('#query').evaluate(el=>el.selectionStart),3);assert.equal(await p.locator('#query').evaluate(el=>el.selectionEnd),8);
   assert.equal(await p.locator('#query').evaluate(el=>el===document.activeElement),true);assert(Math.abs(await p.evaluate(()=>scrollY)-before.top)<3);
   await p.evaluate(()=>TujiaUI.setLanguage('zh'));assert.equal(await p.locator('.grammar-page-results a').count(),initial);assert.equal(await p.inputValue('#query'),'unfinished grammar query');
   await p.locator('#query').fill('qazzvv-no-match-6262');await p.locator('#query').press('Enter');await p.waitForSelector('.grammar-page-results .empty');
   assert((await p.locator('.grammar-page-results .empty').innerText()).includes('没有匹配'));
   await p.evaluate(()=>TujiaUI.setLanguage('en'));assert(/No matching/i.test(await p.locator('.grammar-page-results .empty').innerText()));
   assert.equal(await p.evaluate(()=>history.length),before.history+1,'language changes do not add navigation entries');
  });
  for(const language of ['zh','en'])for(const scope of ['north','south'])await test('cold '+language+' source scope '+scope,async p=>{
   await p.goto(base+'?lang='+language+'#sources?grammarSourceScope='+scope);await ready(p);await p.waitForSelector('.source-row');
   assert.equal(await p.evaluate(()=>state.grammarSourceScope),scope);assert.equal(await p.locator('#retry-page').count(),0);
   assert.equal(await p.evaluate(()=>document.documentElement.lang),language==='en'?'en':'zh-CN');
  });
  assert.deepEqual(errors,[]);console.log('PASS: '+checks.length+' language recovery scenarios; no browser exceptions.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server?.close());
