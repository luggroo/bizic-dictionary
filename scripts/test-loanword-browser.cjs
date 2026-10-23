// Run against a prepared site with Playwright and a local Chromium.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.BASE_URL;if(!base)throw Error('Set BASE_URL to a prepared site.');
const review=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-phonotactic-review-2026-10-23.json')));
const adaptation=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-adaptation-review-2026-10-23.json')));
const nl=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-nl-review-2026-10-23.json')));
review.decisions.push(...adaptation.decisions,...nl.decisions);
const guards=['stedt-rn-353352','yubao-60756-v-2277','yubao-60757-v-2277','yubao-60823-v-2277','w1449','yubao-60756-v-0691',...adaptation.excluded.map(w=>w.id),'yubao-60757-v-2988','w2438'];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox']});
 try{for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#words');await page.waitForFunction(()=>typeof D!=='undefined'&&D&&D.words.length);
  for(const language of ['zh','en']){
   await page.evaluate(language=>TujiaUI.setLanguage(language),language);
   for(const {note,noteEn} of review.decisions){
    const id=note.wordIds[0];await page.evaluate(id=>openPreparedDetail(id),id);
    await page.waitForSelector('dialog[open] #detail-body h1');
    assert.equal(await page.locator('#detail-body .word-metadata .loan-badge').getAttribute('data-loan-scope'),note.scope,id);
    assert((await page.locator('#detail-body .editorial-notes').innerText()).includes(language==='en'?noteEn:note.text),id+' translated note');
    const original=await page.evaluate(id=>JSON.stringify(W[id].attestations),id);
    const area=id.includes('60824')?'south':'north',modes=area==='south'?['accent','poj']:['accent','ye'];
    for(const mode of modes){
     await page.locator('#detail-spelling-control [data-spelling-display="'+area+'"]').selectOption(mode);
     assert.equal(await page.evaluate(id=>JSON.stringify(W[id].attestations),id),original,id+' source after spelling change');
    }
    const filterResult=await page.evaluate(id=>{const saved=state;state={...DEFAULT_STATE,view:'words',hideWholeLoans:true};const result=wordMatches(W[id]);state=saved;return result},id);
    assert.equal(filterResult,note.scope!=='whole',id+' whole-loan filter');
    await page.locator('#close').click();
   }
   for(const id of guards){
    await page.evaluate(id=>openPreparedDetail(id),id);await page.waitForSelector('dialog[open] #detail-body h1');
    assert.equal(await page.locator('#detail-body .word-metadata .loan-badge').count(),0,id+' excluded or rope');
    await page.locator('#close').click();
   }
  }
  assert.deepEqual(errors,[]);await context.close();console.log('PASS '+width+'px: '+review.decisions.length+' notes, two languages, spelling modes, provenance, filters and '+guards.length+' unmarked guards');
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
