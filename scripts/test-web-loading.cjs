// Prepared-site browser checks for selective loading, retries and navigation races.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',file=path.resolve(root,name);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 try{
  let body=fs.readFileSync(file);const ext=path.extname(file);res.setHeader('Content-Type',types[ext]||'application/octet-stream');
  if(['.html','.js','.css','.json','.svg'].includes(ext)&&req.headers['accept-encoding']?.includes('gzip')){body=zlib.gzipSync(body);res.setHeader('Content-Encoding','gzip');}
  res.writeHead(200);res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404).end()}
});
(async()=>{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const base='http://127.0.0.1:'+server.address().port+'/';
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
 const failures=[];
 const page=async()=>{const p=await browser.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(30000);p.on('pageerror',e=>failures.push(e.message));return p;};
 try{
  let p=await page(),requests=[],attempts=0;p.on('request',r=>requests.push(r.url()));
  await p.route('**/prepared/**',route=>route.abort());
  await p.goto(base);await p.waitForFunction(()=>window.fastReady);
  assert.equal(await p.locator('.metric b').first().innerText(),'16,577');
  assert(!requests.some(url=>/\.json\.gz|editorial-notes|grammar-reviewed-data/.test(url)),'home does not request reader data or reader scripts');
  await p.locator('.display-settings > summary').click();
  await p.locator('#spelling-control [data-spelling-display="north"]').selectOption('ye');
  assert.equal(await p.locator('[data-ui-tujia="home"]').first().textContent(),'ger laix xief','home spelling preferences work without reader scripts');
  await p.locator('#spelling-control [data-spelling-display="north"]').selectOption('accent');
  await p.locator('#ui-language').selectOption('en');assert((await p.locator('#main').innerText()).includes('Overview'));
  await p.unroute('**/prepared/**');await p.route(/\/prepared\/(?:core|word-search|words-\d+)\.json\.gz/,route=>route.abort());
  await p.locator('aside [data-view="grammar"]').click();await p.waitForSelector('.grammar-reading-title');
  assert.equal(await p.evaluate(()=>D.words.length),0,'grammar opens without the dictionary index');
  await p.close();

  p=await page();requests=[];p.on('request',r=>requests.push(r.url()));
  let releaseIndex;const indexGate=new Promise(resolve=>{releaseIndex=resolve});
  await p.route('**/prepared/word-search.json.gz*',async route=>{await indexGate;await route.continue()});
  await p.route(/\/(?:editorial-notes|lexical-reviews|word-merge|spelling-boundaries)\.js/,route=>route.abort());
  await p.route(/\/prepared\/(?:entries\/|words-\d+)/,route=>route.abort());
  await p.goto(base+'#words');await p.waitForSelector('#query');
  assert.equal(await p.locator('.word-card').count(),0,'search controls appear while the index is still unavailable');
  await p.locator('#query').fill('水');await p.locator('#query').press('Enter');
  releaseIndex();await p.waitForSelector('.word-card');
  assert.equal(await p.inputValue('#query'),'水');
  assert.equal(await p.evaluate(()=>state.q),'水','a query submitted during the download runs when the index is ready');
  assert((await p.locator('.result-summary').innerText()).includes('225'));
  assert.equal(await p.evaluate(()=>D.words.filter(w=>w.attestations).length),0,'search never loads full entries');
  assert(!requests.some(url=>/editorial-notes\.js|lexical-reviews\.js|word-merge\.js|spelling-boundaries\.js|\/prepared\/(?:entries\/|words-\d+)/.test(url)),'entry data and editorial scripts wait for a word to be opened');
  await p.unroute(/\/(?:editorial-notes|lexical-reviews|word-merge|spelling-boundaries)\.js/);
  await p.unroute(/\/prepared\/(?:entries\/|words-\d+)/);
  const opened=await p.locator('.word-card-content').first().getAttribute('data-open');
  const expected=await p.evaluate(id=>W[id]._entry,opened);attempts=0;
  await p.route('**/prepared/entries/'+expected+'.json.gz*',route=>++attempts===1?route.fulfill({status:503,body:'busy'}):route.continue());
  await p.locator('.word-card-content').first().click();await p.waitForSelector('dialog[open] h1.word');
  assert.equal(attempts,2,'the selected entry retries a transient failure');
  assert.equal(await p.evaluate(()=>D.words.filter(w=>w.attestations).length),1,'only the selected entry is hydrated');
  assert(!requests.some(url=>/\/prepared\/words-\d+/.test(url)),'opening a word does not download a 200-word bundle');
  await p.locator('#close').click();await p.waitForSelector('dialog[open]',{state:'hidden'});
  await p.locator('.word-card-content').first().click();await p.waitForSelector('dialog[open] h1.word');
  assert.equal(attempts,2,'reopening the selected word reuses its loaded entry');
  await p.locator('#close').click();await p.waitForSelector('dialog[open]',{state:'hidden'});
  const second=await p.locator('.word-card-content').nth(1).getAttribute('data-open');
  const secondEntry=await p.evaluate(id=>W[id]._entry,second);let corruptCalls=0;
  await p.route('**/prepared/entries/'+secondEntry+'.json.gz*',route=>++corruptCalls===1?route.fulfill({status:200,contentType:'application/json',body:'{"id":"wrong-entry"}'}):route.continue());
  await p.locator('.word-card-content').nth(1).click();await p.waitForSelector('#detail-body [data-open="'+second+'"]');
  assert.equal(await p.evaluate(id=>W[id].id,second),second,'a mismatched entry never overwrites the selected word');
  await p.locator('#detail-body [data-open="'+second+'"]').click();await p.waitForSelector('dialog[open] h1.word');
  assert.equal(corruptCalls,2,'manual retry evicts a mismatched cached entry');
  assert.equal(await p.evaluate(()=>D.words.filter(w=>w.attestations).length),2);
  assert(!requests.some(url=>/\/(?:editorial-notes|lexical-reviews|word-merge|spelling-boundaries|ui-translations)\.js/.test(url)),'individual entries include their own notes without loading full review tables');
  const individualReads=requests.filter(url=>/\/prepared\/entries\//.test(url)).length;
  await p.evaluate(()=>loadAllWordEvidence());
  assert.equal(await p.evaluate(()=>D.words.filter(w=>w._chunk!==undefined||!w.attestations).length),0,'full export hydrates every original source record');
  assert.equal(requests.filter(url=>/\/prepared\/entries\//.test(url)).length,individualReads,'full export uses bulk files instead of thousands of individual requests');
  await p.close();

  p=await page();let releaseDraft;const draftGate=new Promise(resolve=>{releaseDraft=resolve});
  await p.route('**/prepared/word-search.json.gz*',async route=>{await draftGate;await route.continue()});
  await p.goto(base+'#words');await p.waitForSelector('#query');await p.locator('#query').fill('尚未提交的搜索');
  releaseDraft();await p.waitForSelector('.word-card');assert.equal(await p.inputValue('#query'),'尚未提交的搜索');await p.close();

  p=await page();let invalidIndexCalls=0;
  await p.route('**/prepared/word-search.json.gz*',route=>++invalidIndexCalls===1?route.fulfill({status:200,contentType:'application/json',body:'{"format":2,"columns":[]}'}):route.continue());
  await p.goto(base+'#words');await p.waitForSelector('#retry-page');
  assert.equal(await p.evaluate(()=>D.words.length),0,'invalid data leaves the existing word registry intact');
  await p.locator('#retry-page').click();await p.waitForSelector('.word-card');assert.equal(invalidIndexCalls,2,'invalid index data is evicted before manual retry');await p.close();

  for(const [route,selector] of [['sources','.source-row'],['topics','.source-row'],['corpus','.corpus-card'],['history','.table-wrap']]){
   p=await page();await p.goto(base+'#'+route);await p.waitForSelector(selector);
   assert.equal(await p.evaluate(()=>D.words.length),0,route+' does not load the dictionary index');await p.close();
  }

  p=await page();attempts=0;
  await p.route('**/grammar-reviewed-data.js*',route=>++attempts===1?route.fulfill({status:503,body:'busy'}):route.continue());
  await p.goto(base+'#grammar/north/101/1');await p.waitForSelector('.grammar-reading-title');assert.equal(attempts,2,'scripts retry a transient failure');await p.close();

  p=await page();attempts=0;
  await p.route('**/prepared/corpus.json.gz*',route=>++attempts<=3?route.fulfill({status:503,body:'busy'}):route.continue());
  await p.goto(base+'#corpus');await p.waitForSelector('#retry-page');assert.equal(attempts,3);
  await p.locator('#retry-page').click();await p.waitForSelector('.corpus-collection-card,.corpus-card');assert.equal(attempts,4,'manual retry clears failed dataset promises');await p.close();

  p=await page();await p.route('**/prepared/word-search.json.gz*',async route=>{await new Promise(done=>setTimeout(done,500));await route.continue();});
  await p.goto(base);await p.waitForFunction(()=>window.fastReady);
  await p.locator('aside [data-view="words"]').click();await p.locator('aside [data-view="grammar"]').click();await p.waitForSelector('.grammar-reading-title');
  await p.waitForTimeout(700);assert.equal(await p.evaluate(()=>state.view),'grammar');assert.equal(await p.locator('.word-grid').count(),0,'an old load cannot replace the current page');await p.close();

  p=await page();await p.goto(base+'?id=w7231#words');await p.waitForSelector('dialog[open] h1.word');
  assert((await p.locator('dialog[open] .loan-badge').innerText()).includes('新借'));await p.locator('#close').click();await p.waitForSelector('dialog[open]',{state:'hidden'});assert.equal(await p.evaluate(()=>state.view),'words');
  await p.evaluate(()=>scrollTo(0,Math.min(400,document.documentElement.scrollHeight-innerHeight)));
  const savedY=await p.evaluate(()=>scrollY);
  await p.route('**/prepared/corpus.json.gz*',async route=>{await new Promise(done=>setTimeout(done,250));await route.continue();});
  await p.locator('aside [data-view="corpus"]').dispatchEvent('click');await p.waitForSelector('.corpus-card');
  await p.goBack();await p.waitForSelector('.word-card');await p.waitForFunction(y=>Math.abs(scrollY-y)<3,savedY);await p.close();

  p=await page();await p.addInitScript(()=>{window.DecompressionStream=undefined});await p.goto(base+'#words');await p.waitForSelector('.word-card');
  assert(await p.evaluate(()=>typeof pako==='object'),'older browsers load the inflater only when needed');await p.close();
  assert.deepEqual(failures,[],'no runtime exceptions across lazy reader routes');
  console.log('PASS: interactive home without datasets, independent grammar, script retries, dataset retry recovery, route races, shared links and lazy gzip fallback.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1}).finally(()=>server.close());
