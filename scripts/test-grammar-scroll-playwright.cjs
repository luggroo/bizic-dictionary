// Real mobile-viewport navigation regression (chapter, subchapter, Back).
// Playwright is installed into /tmp by the Pages workflow; use system Chrome.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site')),mount='/bizic-dictionary/';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 if(!url.pathname.startsWith(mount)){res.writeHead(404).end();return}
 const name=decodeURIComponent(url.pathname.slice(mount.length))||'index.html';
 const file=path.resolve(root,name);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 try{
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.end(fs.existsSync(file)?fs.readFileSync(file):zlib.gunzipSync(fs.readFileSync(file+'.gz')));
 }catch(e){res.writeHead(404).end(String(e))}
});
const browserPath=process.env.CHROMIUM_EXECUTABLE||[
 '/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium'
].find(p=>fs.existsSync(p));
async function main(){
 // Explicit deadline: a hung browser must fail the build promptly.
 const deadline=setTimeout(()=>{console.error('Mobile browser QA timed out');process.exit(1)},120000);
 deadline.unref();
 assert(browserPath,'No system Chrome or Chromium found');
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,executablePath:browserPath,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const page=await browser.newPage({
   viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'
  });
  page.setDefaultTimeout(25000);
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base='http://127.0.0.1:'+server.address().port+mount;
  await page.goto(base+'?lang=zh#grammar/north/101/1');
  await page.waitForFunction(()=>typeof state!=='undefined'&&typeof D!=='undefined'&&D&&state.view==='grammar'&&document.querySelector('.grammar-toc [data-chapter="104"]'),{timeout:60000});
  const measure=()=>page.evaluate(()=>{
   const title=document.querySelector('.grammar-article > h1.grammar-reading-title');
   return {chapter:state.chapter,section:state.grammarSection,windowWidth:innerWidth,mediaQuery:matchMedia('(max-width: 900px)').matches,
    title:title?.textContent,top:title?Math.round(title.getBoundingClientRect().top):null,
    scrollY:Math.round(scrollY),expanded:document.querySelector('.grammar-toc-wrap')?.dataset.mobileExpanded,
    route:location.hash};
  });
  const settle=()=>page.evaluate(()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))));
  const initial=await measure();
  assert(initial.mediaQuery,'Test browser did not enter mobile media query: '+JSON.stringify(initial));
  assert.equal(initial.expanded,'true','Initial chapter menu should be expanded');
  await page.locator('.grammar-toc [data-chapter="104"]').click();
  await page.waitForFunction(()=>state.chapter==='104'&&document.querySelector('.grammar-article > h1.grammar-reading-title'));
  await settle();await settle();
  const chapter=await measure();
  console.log('Mobile chapter click:',JSON.stringify({initial,chapter}));
  assert.equal(chapter.expanded,'false','Chapter selection should collapse index');
  assert(chapter.top>=-8&&chapter.top<=65,'Chapter not scrolled to heading: '+JSON.stringify(chapter));
  assert(chapter.scrollY>=90,'Chapter left at page top: '+JSON.stringify(chapter));
  await page.locator('.grammar-toc-toggle').click();
  await page.locator('.grammar-toc-sections a[href="#grammar/north/104/2"]').click();
  await page.waitForFunction(()=>state.grammarSection==='104.2'&&document.querySelector('.grammar-article > h1.grammar-reading-title'));
  await settle();await settle();
  const section=await measure();
  assert.equal(section.expanded,'false','Subchapter selection should collapse index');
  assert(section.top>=-8&&section.top<=65,'Subchapter not scrolled to heading: '+JSON.stringify(section));
  assert(section.scrollY>=90,'Subchapter left at page top: '+JSON.stringify(section));
  // Exercise the three dialect choices in the real mobile UI, rather than
  // merely calling the route parser or reading the grammar data in Node.
  const choices=await page.locator('.grammar-switch button[data-grammar-dialect]').allTextContents();
  assert.deepEqual(choices.map(s=>s.trim()),['北部－龙山语法','北部－保靖厦语法','南部－泸溪语法']);
  await page.locator('.grammar-switch button[data-grammar-dialect="xiaren"]').click();
  await page.waitForFunction(()=>state.grammarDialect==='xiaren'&&state.chapter==='301'&&document.querySelector('.grammar-toc [data-chapter="302"]'));
  assert.equal(await page.locator('.grammar-switch button[data-grammar-dialect="xiaren"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('.grammar-toc-wrap').getAttribute('data-mobile-expanded'),'true','Dialect choice reopens the mobile chapter menu');
  await page.locator('.grammar-toc [data-chapter="302"]').click();
  await page.waitForFunction(()=>state.grammarDialect==='xiaren'&&state.chapter==='302'&&document.querySelector('.grammar-reading-title'));
  assert.equal(await page.locator('.grammar-toc-wrap').getAttribute('data-mobile-expanded'),'false');
  await page.locator('.grammar-toc-toggle').click();
  await page.locator('.grammar-toc-sections a[href="#grammar/xiaren/302/2"]').click();
  await page.waitForFunction(()=>state.grammarDialect==='xiaren'&&state.grammarSection==='302.2');
  assert.equal(await page.locator('.grammar-toc-wrap').getAttribute('data-mobile-expanded'),'false');
  const mother=()=>page.locator('.grammar-article .grammar-pair').filter({has:page.locator('.grammar-spelling[data-ye="nievnier"]')}).first();
  await mother().waitFor();
  assert.equal(await mother().locator('.grammar-ipa').textContent(),'ne⁵⁴ne³³','The original IPA must survive UI rendering');
  assert.equal(await mother().locator('.grammar-spelling').textContent(),'nièniě');
  await page.locator('.display-settings > summary').click();
  await page.locator('#spelling-control select[data-spelling-display="north"]').selectOption('ye');
  await page.waitForFunction(()=>document.querySelector('.grammar-article .grammar-spelling[data-ye="nievnier"]')?.textContent==='nievnier');
  assert.equal(await mother().locator('.grammar-ipa').textContent(),'ne⁵⁴ne³³','Changing spelling must not change IPA');
  assert.equal(await page.evaluate(()=>state.grammarSection),'302.2','Changing spelling must retain the reading page');
  await page.locator('#spelling-control select[data-spelling-display="north"]').selectOption('accent');
  await page.waitForFunction(()=>document.querySelector('.grammar-article .grammar-spelling[data-ye="nievnier"]')?.textContent==='nièniě');
  await page.locator('.display-settings > summary').click();
  // Select a different chapter and its relation-marking section through the
  // mobile menu, then verify the exact URL and persistence on reload.
  await page.locator('.grammar-toc-toggle').click();
  await page.locator('.grammar-toc [data-chapter="303"]').click();
  await page.waitForFunction(()=>state.chapter==='303'&&state.grammarDialect==='xiaren');
  await page.locator('.grammar-toc-toggle').click();
  await page.locator('.grammar-toc-sections a[href="#grammar/xiaren/303/5"]').click();
  await page.waitForFunction(()=>state.grammarSection==='303.5');
  assert.equal(await page.evaluate(()=>location.hash),'#grammar/xiaren/303/5');
  await page.locator('.display-settings > summary').click();
  await page.locator('#spelling-control select[data-spelling-display="north"]').selectOption('ye');
  await page.waitForFunction(()=>[...document.querySelectorAll('.grammar-article .grammar-spelling[data-ye="nav"]')].some(x=>x.textContent==='nav'));
  await page.reload();
  await page.waitForFunction(()=>typeof state!=='undefined'&&state.grammarDialect==='xiaren'&&state.grammarSection==='303.5'&&[...document.querySelectorAll('.grammar-article .grammar-spelling[data-ye="nav"]')].some(x=>x.textContent==='nav'),{timeout:60000});
  assert.equal(await page.locator('.grammar-switch button[data-grammar-dialect="xiaren"]').getAttribute('aria-pressed'),'true');
  await page.locator('.grammar-switch button[data-grammar-dialect="south"]').click();
  await page.waitForFunction(()=>state.grammarDialect==='south'&&state.chapter==='201'&&document.querySelector('.grammar-reading-title'));
  assert.equal(await page.locator('.grammar-switch button[data-grammar-dialect="south"]').getAttribute('aria-pressed'),'true');
  await page.locator('.grammar-switch button[data-grammar-dialect="north"]').click();
  await page.waitForFunction(()=>state.grammarDialect==='north'&&state.chapter==='101'&&document.querySelector('.grammar-reading-title'));
  assert.equal(await page.locator('.grammar-switch button[data-grammar-dialect="north"]').getAttribute('aria-pressed'),'true');
  console.log('PASS: mobile dialect switching, Xiaren chapter/section routes, spelling toggle and reload');
  console.log('PASS: real 390px mobile viewport, chapter and subchapter scroll to heading');
  console.log(JSON.stringify({initial,chapter,section,browserErrors:errors},null,2));
  assert.deepEqual(errors,[],'Unexpected JS errors');
 }finally{await browser.close()}
}
main().catch(err=>{console.error(err);process.exitCode=1}).finally(()=>server.close());
