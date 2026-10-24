// Real mobile-viewport navigation regression (chapter, subchapter, Back).
// Playwright is installed into /tmp by the Pages workflow; use system Chrome.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../site'),mount='/bizic-dictionary/';
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
  await page.evaluate(()=>{
   window.__grammarClickTrace=[];
   document.addEventListener('click',event=>{
    const el=event.target instanceof Element?event.target:null;
    if(!el?.closest('.grammar-toc [data-chapter]'))return;
    window.__grammarClickTrace.push({
     target:el.tagName,
     insideSwitch:!!el.closest('.grammar-switch [data-grammar-dialect]'),
     insideToc:!!el.closest('.grammar-toc'),
     mobile:grammarTocMobileViewport(),expanded:grammarMobileTocExpanded
    });
   },true);
  });
  const initial=await measure();
  assert(initial.mediaQuery,'Test browser did not enter mobile media query: '+JSON.stringify(initial));
  assert.equal(initial.expanded,'true','Initial chapter menu should be expanded');
  await page.locator('.grammar-toc [data-chapter="104"]').click();
  await page.waitForFunction(()=>state.chapter==='104'&&document.querySelector('.grammar-article > h1.grammar-reading-title'));
  await settle();await settle();
  const chapter=await measure();
  const clickTrace=await page.evaluate(()=>window.__grammarClickTrace);
  console.log('Mobile chapter click diagnostic:',JSON.stringify({initial,chapter,clickTrace}));
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
  console.log('PASS: real 390px mobile viewport, chapter and subchapter scroll to heading');
  console.log(JSON.stringify({initial,chapter,section,browserErrors:errors},null,2));
  assert.deepEqual(errors,[],'Unexpected JS errors');
 }finally{await browser.close()}
}
main().catch(err=>{console.error(err);process.exitCode=1}).finally(()=>server.close());
