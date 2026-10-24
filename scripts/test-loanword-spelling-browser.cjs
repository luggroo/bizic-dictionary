// Run against a prepared site; verify list/detail shading in both regional scripts.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.BASE_URL;if(!base)throw Error('Set BASE_URL to a prepared site.');
const chi=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-chi-period-review-2026-10-23.json')));
const inlineNote=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-rime-followup-2026-10-23.json'))).decisions.find(d=>d.note.wordIds.includes('yubao-60756-v-2594'));
const fixtures=[
 ['yubao-60756-v-1681','north','accent',[['niǔjīn']]],
 ['yubao-60756-v-1681','north','ye',[['niurjinx']]],
 ['yubao-60756-v-2215','north','accent',[['jīn']]],
 ['yubao-60756-v-2215','north','ye',[['jinx']]],
 ['yubao-60824-v-1681','south','accent',[['jinjin']]],
 ['yubao-60824-v-1681','south','poj',[['cin','cin']]],
 ['yubao-60824-v-1811','south','accent',[['suàbà']]],
 ['yubao-60824-v-1811','south','poj',[['suà','pà']]],
 ['yubao-60756-v-0594','north','accent',[[],['tītōujiàn']]],
 ['yubao-60756-v-0594','north','ye',[[],['tixtouxjianv']]],
 ['yubao-60823-v-1853','north','accent',[['cí']]],
 ['yubao-60823-v-1853','north','ye',[['cif']]],
 ['stedt-rn-185103','north','accent',[['sīrǐ']]],
 ['stedt-rn-185103','north','ye',[['sixrir']]],
 ['w50','north','accent',[[]]],
 ['w50','north','ye',[[]]]
];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox']});
 try{for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base+'#words');await page.waitForFunction(()=>typeof D!=='undefined'&&D?.words.length);
  for(const language of ['zh','en']){
   await page.evaluate(language=>TujiaUI.setLanguage(language),language);
   for(const [id,region,mode,gray] of fixtures){
    // The list uses prepared miniature entries, before loading their full detail.
    const card=await page.evaluate(({id,mode})=>{
     spellingDisplay=mode;southernDisplay=mode;
     const mini=D.words.find(w=>w.id===(D.wordAliases[id]||id)),el=document.createElement('div');el.innerHTML=wordTable([mini]);
     return [...el.querySelectorAll('.word-card-title')].map(e=>({text:e.textContent,gray:[...e.querySelectorAll('.loan-spelling')].map(s=>s.textContent)}));
    },{id,mode});
    assert.deepEqual(card.map(v=>v.gray),gray,id+' '+mode+' prepared list loan boundaries');
    await page.evaluate(id=>openPreparedDetail(id),id);await page.waitForSelector('dialog[open] #detail-body h1');
    const before=await page.evaluate(id=>JSON.stringify(W[id].attestations),id);
    await page.locator('#detail-spelling-control [data-spelling-display="'+region+'"]').selectOption(mode);
    const detail=await page.locator('#detail-body .word-entry-form').evaluate(el=>[...el.querySelectorAll('h1,.notation-form')].map(e=>({text:e.textContent,gray:[...e.querySelectorAll('.loan-spelling')].map(s=>s.textContent)})));
    assert.deepEqual(detail,card,id+' '+mode+' list and detail agree');
    for(const span of await page.locator('#detail-body .word-entry-form .loan-spelling').all()){
     const style=await span.evaluate(e=>({color:getComputedStyle(e).color,heading:!!e.closest('h1.word')}));
     assert.equal(style.color,style.heading?'rgb(137, 135, 127)':'rgb(112, 109, 100)',id+' warm grey loan color');
    }
    assert(await page.locator('#detail-body .stack').evaluateAll(roots=>roots.every(root=>[...root.querySelectorAll('.loan-spelling')].every(e=>e.closest('[data-script="transliteration"]')))),id+' related loan spellings retain their phonetic font');
    assert.equal(await page.evaluate(id=>JSON.stringify(W[id].attestations),id),before,id+' source after toggling');
    assert(await page.locator('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1),id+' detail fits viewport');
    if(process.env.QA_SCREENSHOT_DIR&&language==='zh'&&id==='yubao-60824-v-1811'&&mode==='accent')await page.screenshot({path:path.join(process.env.QA_SCREENSHOT_DIR,'loan-shading-'+width+'.png')});
    await page.locator('#close').click();
   }
   for(const {note,noteEn} of chi.decisions){
    const id=note.wordIds[0];await page.evaluate(id=>openPreparedDetail(id),id);await page.waitForSelector('dialog[open] #detail-body h1');
    assert.equal(await page.locator('#detail-body .word-metadata .loan-badge').count(),0,id+' undated 尺 has no modern badge');
    assert((await page.locator('#detail-body .editorial-notes').innerText()).includes(language==='en'?noteEn:note.text),id+' bilingual dating note');
    await page.locator('#close').click();
   }
   for(const {id} of chi.retainedModern){
    await page.evaluate(id=>openPreparedDetail(id),id);await page.waitForSelector('dialog[open] #detail-body h1');
    assert.equal(await page.locator('#detail-body .word-metadata .loan-badge').getAttribute('data-loan-scope'),'whole',id+' cir retains modern badge');
    await page.locator('#close').click();
   }
   await page.evaluate(()=>openPreparedDetail('yubao-60756-v-2594'));await page.waitForSelector('dialog[open] #detail-body h1');
   for(const target of ['en','zh','en']){
    await page.evaluate(l=>TujiaUI.setLanguage(l),target);
    assert((await page.locator('#detail-body .editorial-notes').innerText()).includes(target==='en'?inlineNote.noteEn:inlineNote.note.text),'complete note translates across inline IPA and language toggles');
    assert.equal(await page.locator('#detail-body .editorial-notes [data-script="ipa"]').textContent(),'/xa³³/','IPA survives translation');
   }
   await page.locator('#close').click();await page.evaluate(l=>TujiaUI.setLanguage(l),language);
  }
  assert.deepEqual(errors,[]);await context.close();console.log('PASS '+width+'px: borrowed syllables only, prepared cards/details, four spelling modes, both languages, source preservation and 尺 dating');
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
