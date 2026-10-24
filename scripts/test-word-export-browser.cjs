// Verify actual downloads, selection snapshots, retry feedback and bounded export requests.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),http=require('node:http');
let base=process.env.BASE_URL;
const root=path.resolve(process.argv[2]||process.env.SITE_ROOT||path.join(__dirname,'../site'));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',file=path.resolve(root,name);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
});
const read=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
const full=read('core');
const canonical=new Map(full.words.map(w=>[w.id,w]));
const sources=new Map([...(full.sourceVariants||[]),...full.sources].map(s=>[s.id,s]));
function assertRecords(records,ids){
 assert.deepEqual(records.map(w=>w.id),ids,'the download contains the click-time selection');
 for(const row of records){
  const entry=read('entries/'+row.id),{_entryNotes,_translations,...original}=entry;
  for(const [key,value]of Object.entries(original))if(!key.startsWith('_')&&key!=='editorialNotes')assert.deepEqual(row[key],value,row.id+' original '+key);
  assert.deepEqual(row.editorialNotes,_entryNotes,row.id+' complete annotations');
  assert.equal(row.modernChineseLoanScope,canonical.get(row.id)._loan.scope,row.id+' complete loan scope');
  assert(Array.isArray(row.canonicalPos)&&Array.isArray(row.posProvenance),row.id+' POS provenance');
  assert.equal(row.source_title,sources.get(row.source)?.title,row.id+' source title');
  assert.equal(row.source_url,sources.get(row.source)?.url,row.id+' source URL');
 }
}
(async()=>{
 if(!base){await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port+'/';}
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox']});const failures=[];
 const fresh=async(language='zh')=>{const p=await browser.newPage({viewport:{width:1280,height:900},acceptDownloads:true});p.setDefaultTimeout(90000);p.on('pageerror',e=>failures.push(e.message));await p.goto(base+'?lang='+language+'#words');await p.waitForSelector('.word-card');return p;};
 const results=async p=>p.evaluate(()=>D.words.filter(wordMatches).map(w=>w.id));
 const query=async(p,q)=>{await p.locator('#query').fill(q);await p.locator('[data-search-language="zh"]').click();};
 const downloaded=async event=>JSON.parse(fs.readFileSync(await(await event).path(),'utf8'));
 try{
  // Delay hydration, replace the whole result DOM, then try to submit twice.
  let p=await fresh(),requests=[],downloads=0;p.on('request',r=>requests.push(r.url()));p.on('download',()=>downloads++);
  await query(p,'水');const selected=await results(p),needed=await p.evaluate(()=>[...new Set(D.words.filter(wordMatches).filter(w=>w._chunk!==undefined).map(w=>w._chunk))]);
  let release,started;const gate=new Promise(r=>release=r),seen=new Promise(r=>started=r);
  await p.route('**/prepared/words-'+needed[0]+'.json.gz*',async route=>{started();await gate;await route.continue()});
  let download=p.waitForEvent('download');await p.locator('#export-words').click();await seen;
  await query(p,'茶');assert(await p.locator('#export-words').isDisabled(),'a replacement export button remains locked');assert.equal(await p.locator('#export-words').getAttribute('aria-busy'),'true');
  await p.locator('#export-words').dispatchEvent('click');release();assertRecords(await downloaded(download),selected);
  await p.waitForFunction(()=>!wordExportPending);await p.waitForTimeout(100);assert.equal(downloads,1,'busy clicks do not create duplicate downloads');
  const requested=requests.flatMap(url=>{const m=url.match(/\/words-(\d+)\.json\.gz/);return m?[Number(m[1])]:[]});
  assert.deepEqual([...new Set(requested)].sort((a,b)=>a-b),needed.sort((a,b)=>a-b),'filtered exports load only required batches');assert(!requests.some(url=>/\/entries\//.test(url)));await p.close();

  // Fail a selected independent entry, show a localized message, then retry.
  for(const language of ['zh','en']){
   p=await fresh(language);await query(p,'毕业');await p.locator('.filter-disclosure > summary').click();await p.locator('[data-filter="sourceFilter"]').selectOption('yubao-60756');
   const ids=await results(p);assert.deepEqual(ids,['yubao-60756-v-2525']);let attempts=0;requests=[];p.on('request',r=>requests.push(r.url()));
   await p.route('**/prepared/entries/yubao-60756-v-2525.json.gz*',r=>++attempts===1?r.fulfill({status:404,body:'missing'}):r.continue());
   await p.locator('#export-words').click();await p.waitForFunction(()=>!wordExportPending);
   await p.waitForFunction(()=>document.querySelector('#toast').textContent.trim());
   assert((await p.locator('#toast').innerText()).includes(language==='en'?'could not be completed':'导出未能完成'),'failure feedback follows the interface language');
   assert(!(await p.locator('#export-words').isDisabled()));download=p.waitForEvent('download');await p.locator('#export-words').click();assertRecords(await downloaded(download),ids);assert.equal(attempts,2,'a later click retries the failed entry');
   assert(!requests.some(url=>/\/words-\d+\.json\.gz/.test(url)),'a one-word export reads its independent record');await p.close();
  }

  // Invalid successful responses must be evicted, not exported as summaries.
  p=await fresh();await query(p,'水');const recoveryIds=await results(p);const recoveryChunk=await p.evaluate(()=>D.words.find(wordMatches)._chunk);let invalidCalls=0;
  await p.route('**/prepared/words-'+recoveryChunk+'.json.gz*',r=>++invalidCalls===1?r.fulfill({status:200,contentType:'application/json',body:'[]'}):r.continue());
  await p.locator('#export-words').click();await p.waitForFunction(()=>!wordExportPending);assert(await p.locator('#toast').isVisible());
  download=p.waitForEvent('download');await p.locator('#export-words').click();assertRecords(await downloaded(download),recoveryIds);assert.equal(invalidCalls,2);await p.close();

  // Older summary formats have no independent-entry pointer or compiled notes.
  p=await fresh();await query(p,'毕业');await p.locator('.filter-disclosure > summary').click();await p.locator('[data-filter="sourceFilter"]').selectOption('yubao-60756');
  const legacyChunk=await p.evaluate(()=>{const word=W['yubao-60756-v-2525'];delete word._entry;return word._chunk;});let legacyCalls=0;
  await p.route('**/prepared/words-'+legacyChunk+'.json.gz*',r=>++legacyCalls===1?r.fulfill({status:200,contentType:'application/json',body:'{"invalid":"batch"}'}):r.continue());
  await p.locator('#export-words').click();await p.waitForFunction(()=>!wordExportPending);assert(await p.locator('#toast').isVisible());
  download=p.waitForEvent('download');await p.locator('#export-words').click();assertRecords(await downloaded(download),['yubao-60756-v-2525']);assert.equal(legacyCalls,2,'invalid legacy batches are evicted before retry');await p.close();

  // The full dictionary still uses batches, with every original field and note.
  p=await fresh();await p.locator('#browse-all-words').click();const all=await results(p);assert.equal(all.length,16577);requests=[];p.on('request',r=>requests.push(r.url()));
  download=p.waitForEvent('download');await p.locator('#export-words').click();assertRecords(await downloaded(download),all);
  assert.equal(new Set(requests.filter(url=>/\/words-\d+\.json\.gz/.test(url))).size,Math.ceil(all.length/200));
  assert(!requests.some(url=>/\/entries\//.test(url)),'full export avoids thousands of individual requests');await p.close();
  assert.deepEqual(failures,[],'no unhandled errors for successful or failed exports');
  console.log('PASS: click-time selections, replacement-button locking, no duplicate downloads, localized failure/retry, invalid-payload recovery, selected batches, independent/legacy single entries and all 16,577 complete source records.');
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1}).finally(()=>server.close());
