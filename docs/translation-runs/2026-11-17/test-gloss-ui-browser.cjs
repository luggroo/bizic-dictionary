// Run with NODE_PATH pointing to the temporary Playwright installation.
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'../../../site');
const server=http.createServer((req,res)=>{
 const file=path.join(root,new URL(req.url,'http://localhost').pathname);
 try {res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.writeHead(404).end()}
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try {
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
  page.setDefaultTimeout(15000);page.on('pageerror',e=>errors.push(e.message));
  const base='http://127.0.0.1:'+server.address().port;
  const cells=()=>page.locator('.gloss td[data-gloss-original]').evaluateAll(c=>c.map(x=>({text:x.textContent,zh:x.dataset.zh,en:x.dataset.en,lang:x.lang})));
  const protectedRows=()=>page.evaluate(()=>Object.fromEntries(['.pinyin td','.ipa td','#example-reverse-song .gloss td,#reverse-song .gloss td'].map(selector=>[selector,[...document.querySelectorAll(selector)].map(x=>x.textContent)])));
  await page.goto(base+'/translation.html?lang=zh#example-ja-jizo');
  const before=await protectedRows(),pdfLinks=await page.locator('a[href$=".pdf"]').evaluateAll(a=>a.map(x=>x.href));
  assert((await cells()).every(x=>x.text===x.zh&&x.lang==='zh'));
  await page.locator('#ui-language').selectOption('en');
  assert((await cells()).every(x=>x.text===x.en&&x.lang==='en'));
  assert.deepEqual(await protectedRows(),before);
  assert.deepEqual(await page.locator('a[href$=".pdf"]').evaluateAll(a=>a.map(x=>x.href)),pdfLinks);
  assert.match(await page.locator('.korean-example').getAttribute('href'),/translation-runs-en.html\?lang=en#ko-bandal/);
  await page.screenshot({path:'/tmp/gloss-ui-main-en.png',fullPage:false});
  await page.locator('#ui-language').selectOption('zh');
  assert((await cells()).every(x=>x.text===x.zh));
  await page.goto(base+'/translation-runs.html?lang=en#ko-bandal');
  await page.waitForURL('**/translation-runs-en.html?lang=en#ko-bandal');
  assert((await cells()).every(x=>x.text===x.en&&x.lang==='en'));
  const enRows=await protectedRows();
  await page.screenshot({path:'/tmp/gloss-ui-korean-en.png',fullPage:false});
  await page.locator('[data-gloss-ui-link]').click();
  await page.waitForURL('**/translation-runs.html?lang=zh#ko-bandal');
  assert((await cells()).every(x=>x.text===x.zh&&x.lang==='zh'));
  assert.deepEqual(await protectedRows(),enRows);
  await page.screenshot({path:'/tmp/gloss-ui-korean-zh.png',fullPage:false});
  for(const lang of ['en','zh']){
   await page.goto(base+'/translation-runs/ko-bandal.html?lang='+lang);
   assert((await cells()).every(x=>x.text===x[lang]&&x.lang===lang));
  }
  await page.goto(base+'/translation-runs.html?lang=zh');
  await page.locator('nav a[href="#bo-crane"]').click();
  await page.waitForFunction(()=>document.querySelector('[data-gloss-ui-link]').hash==='#bo-crane');
  assert.match(await page.locator('[data-gloss-ui-link]').getAttribute('href'),/lang=en#bo-crane$/);
  assert.deepEqual(errors,[]);
  console.log('PASS: browser language switching, reader redirect, preserved anchor, standalone gloss; reverse text, Pinyin, IPA and PDF links unchanged');
 }finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
setTimeout(()=>{console.error('Browser verification timeout');process.exit(1)},60000).unref();
