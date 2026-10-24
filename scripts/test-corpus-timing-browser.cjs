// Verify time-mark cleanup using real metadata events from a synthetic WAV.
// Original external recordings are not fetched or treated as verified playback.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2'};
let server;
function wav(seconds){
 const samples=seconds*8000,body=Buffer.alloc(44+samples*2);
 body.write('RIFF');body.writeUInt32LE(body.length-8,4);body.write('WAVEfmt ',8);body.writeUInt32LE(16,16);
 body.writeUInt16LE(1,20);body.writeUInt16LE(1,22);body.writeUInt32LE(8000,24);body.writeUInt32LE(16000,28);
 body.writeUInt16LE(2,32);body.writeUInt16LE(16,34);body.write('data',36);body.writeUInt32LE(samples*2,40);return body;
}
(async()=>{
 const deadline=setTimeout(()=>{console.error('Corpus timing browser QA timed out');process.exit(1)},90000);deadline.unref();
 let base=process.env.BASE_URL;
 if(!base){
  server=http.createServer((req,res)=>{
   const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html',file=path.resolve(root,name);
   if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   try{res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');const body=fs.readFileSync(file);res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404).end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port+'/';
 }
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},acceptDownloads:true});page.setDefaultTimeout(30000);
  const errors=[],body=wav(120);page.on('pageerror',error=>errors.push(error.message));
  const dataRequests=[];page.on('request',request=>{if(/\/prepared\/(?:corpus\.json\.gz|corpus-entries\/)/.test(request.url()))dataRequests.push(request.url());});
  let pendingAudio='',releaseAudio;let audioGate=Promise.resolve();
  await page.route('**/media/**',async route=>{
   const request=route.request();if(!request.url().includes('.mp3'))return route.continue();
   if(request.method()==='HEAD')return route.fulfill({status:200,contentType:'audio/wav',headers:{'content-length':String(body.length)},body:Buffer.alloc(0)});
   if(pendingAudio&&request.url().includes(pendingAudio))await audioGate;
   const range=request.headers().range?.match(/bytes=(\d+)-(\d*)/),start=range?+range[1]:0,end=range&&range[2]?+range[2]:body.length-1;
   await route.fulfill({status:range?206:200,contentType:'audio/wav',headers:{'accept-ranges':'bytes',...(range?{'content-range':`bytes ${start}-${end}/${body.length}`}:{})},body:body.subarray(start,end+1)});
  });
  const current=()=>page.evaluate(()=>({memory:corpusTiming[currentDetail],stored:JSON.parse(localStorage.getItem('tujia-corpus-timing-v1')||'{}')[currentDetail]}));
  const upload=data=>page.locator('#lyric-file').setInputFiles({name:'timings.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});
  async function exported(){
   if(await page.locator('.lyric-calibration').getAttribute('open')===null)await page.locator('.lyric-calibration > summary').click();
   const downloading=page.waitForEvent('download');await page.locator('#lyric-export').click();return JSON.parse(fs.readFileSync(await(await downloading).path(),'utf8'));
  }
  async function close(){await page.locator('#close').click();await page.waitForSelector('dialog[open]',{state:'hidden'});}
  async function open(id,metadata=true){await page.evaluate(id=>openDetail(id),id);await page.waitForSelector('dialog[open] #lyric-window');if(metadata)await page.waitForFunction(()=>document.querySelector('#corpus-audio')?.duration===120);}
  await page.goto(base+'#corpus');await page.waitForSelector('.corpus-card');await open('c1.1');
  const original=await page.evaluate(()=>C['c1.1'].text);
  const signature=await page.evaluate(()=>lyricSignature(corpusLyricLines(C['c1.1'].text)));
  const corpusFile=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared/corpus-entries',name+'.json.gz'))));
  const reference2=corpusFile('c1.2'),reference3=corpusFile('c1.3');
  const signatures=await page.evaluate(records=>records.map(record=>lyricSignature(corpusLyricLines(record.text))),[reference2,reference3]);
  const other={signature:signatures[0],media:await page.evaluate(()=>S[C['c1.2'].audio].media)};
  assert(await page.evaluate(()=>!!C['c1.2']._corpusEntry),'the second transcript has not been read when its backup is prepared');
  await page.route('**/prepared/corpus.json.gz*',route=>route.abort());
  const offlineEntries='**/prepared/corpus-entries/**';await page.route(offlineEntries,route=>route.abort());
  const beforeLocalImport=dataRequests.length;
  await upload({version:1,kind:'corpus-timing',timings:{'c1.1':{signature,anchors:{'0':5,'1':180}}}});
  await page.waitForFunction(()=>corpusTiming['c1.1']?.anchors?.['0']===5);
  const known=await current();assert.deepEqual(known.memory.anchors,{'0':5});assert.deepEqual(known.stored,known.memory);
  assert.deepEqual((await exported()).timings['c1.1'],known.memory,'known-duration imports export exactly the cleaned marks');
  assert.equal(dataRequests.length,beforeLocalImport,'a loaded-text backup imports offline without requesting the full corpus or other texts');
  assert((await page.locator('[data-lyric-time="1"]').innerText()).startsWith('≈'),'the discarded mark is shown as an estimate');
  await upload({version:1,kind:'corpus-timing',timings:{'c1.1':{signature:'wrong-source-signature',anchors:{'0':2}}}});
  await page.waitForTimeout(100);assert.deepEqual((await current()).memory,known.memory,'wrong-source imports preserve existing marks');
  const emptySignature=await page.evaluate(()=>lyricSignature([]));
  await upload({version:1,kind:'corpus-timing',timings:Object.fromEntries(['missing-text','constructor','__proto__'].map(id=>[id,{signature:emptySignature,anchors:{}}]))});
  await page.waitForTimeout(100);
  assert.deepEqual((await current()).memory,known.memory,'unknown records do not replace the current marks');
  assert.equal(await page.evaluate(()=>Object.hasOwn(corpusTiming,'constructor')),false,'prototype names are not corpus IDs');
  assert.equal(await page.evaluate(()=>Object.getPrototypeOf(corpusTiming)===Object.prototype),true);
  assert.equal(dataRequests.length,beforeLocalImport,'invalid signatures and unknown IDs are checked before any network read');
  await page.unroute(offlineEntries);
  let failThird=true,thirdReads=0;
  await page.route('**/prepared/corpus-entries/c1.3.json.gz*',route=>{thirdReads++;return failThird?route.fulfill({status:503,body:'busy'}):route.continue();});
  const third={signature:signatures[1],anchors:{'0':11}};
  await upload({version:1,kind:'corpus-timing',timings:{'c1.1':{signature,anchors:{'0':9}},'c1.3':third}});
  await page.waitForFunction(()=>document.querySelector('#toast').textContent==='部分语料未能载入，已导入可核对的时间标记。');
  assert.deepEqual((await current()).memory.anchors,{'0':9});assert.deepEqual((await current()).stored,(await current()).memory);
  assert.equal(await page.evaluate(()=>Object.hasOwn(corpusTiming,'c1.3')),false);assert.equal(thirdReads,3,'transient per-text errors exhaust automatic retries');
  await upload({version:1,kind:'corpus-timing',timings:{'c1.3':third}});
  await page.waitForFunction(()=>document.querySelector('#toast').textContent==='语料未能载入，请重试导入。');
  assert.equal(await page.locator('#lyric-file').inputValue(),'','clearing the picker enables retrying the same backup');
  assert.deepEqual((await current()).memory.anchors,{'0':9});assert.equal(thirdReads,6);
  failThird=false;await upload({version:1,kind:'corpus-timing',timings:{'c1.3':third}});
  await page.waitForFunction(()=>corpusTiming['c1.3']?.anchors?.['0']===11);assert.equal(thirdReads,7,'manual retry re-reads only the failed transcript');
  assert((await page.locator('#toast').innerText()).includes('时间标记已导入'));
  await upload({version:1,kind:'corpus-timing',timings:{'c1.1':known.memory}});await page.waitForFunction(()=>corpusTiming['c1.1'].anchors['0']===5);
  assert(await page.evaluate(()=>!!C['c1.2']._corpusEntry),'unmentioned texts remain unread through partial failure and retry');
  assert(!dataRequests.some(url=>/\/prepared\/corpus\.json\.gz/.test(url)),'no backup import requests the whole corpus');
  await upload({version:1,kind:'corpus-timing',timings:{'c1.2':{signature:other.signature,anchors:{'0':7,'1':180}}}});
  await page.waitForFunction(()=>corpusTiming['c1.2']?.anchors?.['1']===180);
  assert.deepEqual(await page.evaluate(()=>corpusTiming['c1.2'].anchors),{'0':7,'1':180},'unopened recordings keep plausible marks until their duration is known');
  pendingAudio=other.media;audioGate=new Promise(resolve=>{releaseAudio=resolve});await close();await open('c1.2',false);
  assert.equal(await page.evaluate(()=>Number.isFinite(document.querySelector('#corpus-audio').duration)),false);
  releaseAudio();await page.waitForFunction(()=>document.querySelector('#corpus-audio').duration===120&&!Object.hasOwn(corpusTiming['c1.2'].anchors,'1'));
  const hydrated=await current();assert.deepEqual(hydrated.memory.anchors,{'0':7});assert.deepEqual(hydrated.stored,hydrated.memory);
  assert.deepEqual((await exported()).timings['c1.2'],hydrated.memory,'metadata cleanup is reflected in memory, storage and subsequent export');
  await close();await open('c1.1');assert.equal(await page.evaluate(()=>C['c1.1'].text),original,'the source transcript is unchanged');
  assert.deepEqual((await current()).memory.anchors,{'0':5});assert((await page.locator('[data-lyric-time="0"]').innerText()).includes('0:05'));
  await page.evaluate(()=>{const audio=document.querySelector('#corpus-audio');audio.currentTime=30;window.testTimingAudio=audio;return audio.play()});
  await page.locator('#detail-spelling-control [data-spelling-display="north"]').selectOption('ye');
  assert.equal(await page.evaluate(()=>document.querySelector('#corpus-audio')===window.testTimingAudio),true);
  assert.equal(await page.evaluate(()=>document.querySelector('#corpus-audio').paused),false);
  assert.equal(await page.evaluate(()=>C['c1.1'].text),original);
  await page.evaluate(()=>{
   window.timingOriginalSetItem=Storage.prototype.setItem;
   Storage.prototype.setItem=function(){throw new DOMException('Quota exceeded','QuotaExceededError')};
   const audio=document.querySelector('#corpus-audio');audio.pause();audio.currentTime=20;
  });
  try{
   await page.locator('[data-lyric-anchor="0"]').click();
   assert((await page.locator('#toast').innerText()).includes('保存失败'),'marking must retain the save-failure message');
   assert.deepEqual((await current()).memory.anchors,{'0':20});assert.deepEqual((await current()).stored,known.memory);
   assert.deepEqual((await exported()).timings['c1.1'].anchors,{'0':20},'unsaved session marks remain exportable');
   await upload({version:1,kind:'corpus-timing',timings:{'c1.1':{signature,anchors:{'0':22}}}});
   await page.waitForFunction(()=>corpusTiming['c1.1'].anchors['0']===22);
   assert((await page.locator('#toast').innerText()).includes('保存失败'),'import must not overwrite save-failure feedback with success');
   assert.deepEqual((await exported()).timings['c1.1'].anchors,{'0':22});
   await page.locator('#lyric-reset').click();
   assert((await page.locator('#toast').innerText()).includes('保存失败'),'reset must not claim durable success after storage failure');
   assert.deepEqual((await current()).memory.anchors,{});assert.deepEqual((await exported()).timings['c1.1'].anchors,{});
  }finally{await page.evaluate(()=>Storage.prototype.setItem=window.timingOriginalSetItem)}
  assert.equal(await page.evaluate(()=>C['c1.1'].text),original);assert.deepEqual(errors,[]);
  console.log('PASS: offline loaded-text import; per-target reads and partial/all-failure retry; synthetic WAV metadata; known/deferred duration cleanup; genuine corpus IDs; consistent storage/export and save-failure feedback; preserved playback and transcript.');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server?.close());
