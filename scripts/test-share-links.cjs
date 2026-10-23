// Run with jsdom installed: node scripts/test-share-links.cjs
// Exercises the real page scripts, datasets, DOM and browser history together.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'../site'),base='https://example.test/bizic-dictionary/';
const read=name=>fs.existsSync(path.join(root,name))?fs.readFileSync(path.join(root,name),'utf8'):zlib.gunzipSync(fs.readFileSync(path.join(root,name+'.gz'))).toString();
const tick=()=>new Promise(resolve=>setTimeout(resolve,10));
async function until(predicate){for(let i=0;i<1000;i++){if(predicate())return;await tick()}throw Error('Page did not settle')}
const openPages=new Set();
async function page(url,{stored='zh',file='index.html',historyState=null,storageBlocked=false}={}){
 const dom=new JSDOM(read(file),{url,runScripts:'outside-only',pretendToBeVisual:true});
 openPages.add(dom);
 const w=dom.window,context=dom.getInternalVMContext(),errors=[];
 const run=source=>vm.runInContext(source,context);
 w.addEventListener('error',event=>errors.push(event.message));
 w.localStorage.setItem('tujia-ui-language',stored);
 if(storageBlocked)Object.defineProperty(w,'localStorage',{get(){throw Error('Storage blocked')}});
 if(historyState)w.history.replaceState(historyState,'',url);
 w.matchMedia=()=>({matches:false,addEventListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
 w.HTMLMediaElement.prototype.pause=()=>{};w.HTMLMediaElement.prototype.load=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');this._modal=true};
 w.HTMLDialogElement.prototype.show=function(){this.setAttribute('open','');this._modal=false};
 w.HTMLDialogElement.prototype.matches=function(selector){return selector===':modal'?!!this._modal:w.HTMLElement.prototype.matches.call(this,selector)};
 w.Response=Response;w.Blob=Blob;w.DecompressionStream=DecompressionStream;
 w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'))};
 w.fetch=async name=>({ok:true,json:async()=>JSON.parse(read(name)),arrayBuffer:async()=>{const b=fs.readFileSync(path.join(root,name.split('?')[0]));return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}});
 for(const [,src]of read(file).matchAll(/<script src="([^"?]+)(?:\?[^" ]*)?" defer><\/script>/g)){
  const asset=path.posix.normalize(path.posix.join(path.posix.dirname(file),src));
  run(read(asset));
 }
 if(file==='index.html')await until(()=>run('navigationReady'));
 await tick();
 return {w,run,errors,close(){w.close();openPages.delete(dom)}};
}
function expectLanguage(p,language){
 assert.equal(p.w.TujiaUI.language,language);
 assert.equal(p.w.document.documentElement.lang,language==='en'?'en':'zh-CN');
 assert.equal(p.w.document.querySelector('#ui-language').value,language);
 assert.equal(new URL(p.w.location.href).searchParams.get('lang'),language);
}
async function travel(p,direction){
 const changed=new Promise(resolve=>p.w.addEventListener('popstate',resolve,{once:true}));
 p.w.history[direction]();await changed;await tick();
}
(async()=>{
 const p=await page(base+'?lang=en&utm_source=share#words?q=water&searchLanguage=en',{stored:'zh'});
 expectLanguage(p,'en');
 assert.match(p.w.document.title,/Dictionary/);
 const word=p.run('D.words[0].id'),corpus=p.run('D.corpus[0].id');
 p.run('openDetail('+JSON.stringify(word)+')');await tick();
 assert.equal(new URL(p.w.location.href).searchParams.get('id'),word);
 assert.equal(p.w.location.hash,'#words?q=water&searchLanguage=en');
 assert.equal(p.run('currentDetail'),word);assert(p.w.document.querySelector('#detail').open);
 const shared=p.w.location.href;
 const saved=JSON.stringify(p.w.history.state),historyLength=p.w.history.length;
 p.w.TujiaUI.setLanguage('zh');
 expectLanguage(p,'zh');
 assert.equal(JSON.stringify(p.w.history.state),saved,'language switch preserves navigation state');
 assert.equal(p.w.history.length,historyLength,'language switch does not add a history entry');
 assert.equal(new URL(p.w.location.href).searchParams.get('id'),word);
 assert.equal(new URL(p.w.location.href).searchParams.get('utm_source'),'share');
 await travel(p,'back');expectLanguage(p,'en');
 assert(!p.w.document.querySelector('#detail').open);
 assert(!new URL(p.w.location.href).searchParams.has('id'));
 await travel(p,'forward');expectLanguage(p,'zh');
 assert.equal(p.run('currentDetail'),word);
 // Fresh recipient opens the exact copied link, despite a different saved language.
 const recipient=await page(shared,{stored:'zh'});
 expectLanguage(recipient,'en');assert.equal(recipient.run('currentDetail'),word);
 const closed=new Promise(resolve=>recipient.w.addEventListener('popstate',resolve,{once:true}));
 recipient.run('closeDetail()');await closed;await tick();
 assert(!recipient.w.document.querySelector('#detail').open);
 assert.equal(recipient.w.location.hash,'#words?q=water&searchLanguage=en');
 assert(!new URL(recipient.w.location.href).searchParams.has('id'));
 recipient.close();
 // Reload restores the URL-selected detail and keeps its navigation snapshot.
 const reloaded=await page(p.w.location.href,{stored:'en',historyState:p.w.history.state});
 expectLanguage(reloaded,'zh');assert.equal(reloaded.run('currentDetail'),word);reloaded.close();
 p.run('setView("corpus");openDetail('+JSON.stringify(corpus)+')');await tick();
 assert.equal(new URL(p.w.location.href).searchParams.get('id'),corpus);
 assert.equal(p.w.location.hash,'#corpus');
 const corpusLink=p.w.location.href;
 const corpusRecipient=await page(corpusLink,{stored:'en'});
 expectLanguage(corpusRecipient,'zh');assert.equal(corpusRecipient.run('currentDetail'),corpus);corpusRecipient.close();
 p.run('setView("grammar",false,{grammarDialect:"north",chapter:"9"})');await tick();
 assert(!new URL(p.w.location.href).searchParams.has('id'),'leaving a detail removes its ID');
 // The reviewed grammar maps the former chapter 9 to chapter 104.
 assert.equal(p.w.location.hash,'#grammar/north/104');
 // Section pages survive direct links, language changes and browser history.
 p.run('setView("grammar",false,{grammarDialect:"north",chapter:"103",grammarSection:"103.1"})');await tick();
 assert.equal(p.w.location.hash,'#grammar/north/103/1');
 assert.equal(p.w.document.querySelectorAll('.reviewed-grammar h3').length,0);
 assert.match(p.w.document.querySelector('.grammar-reading-title').textContent,/3\.1/);
 const sectionIPA=[...p.w.document.querySelectorAll('.grammar-ipa')].map(n=>n.textContent);
 p.w.TujiaUI.setLanguage('en');
 assert.equal(p.w.document.querySelector('.reviewed-grammar').dataset.section,'103.1');
 assert.deepEqual([...p.w.document.querySelectorAll('.grammar-ipa')].map(n=>n.textContent),sectionIPA);
 p.w.document.querySelector('.grammar-page-next').click();await until(()=>p.w.location.hash==='#grammar/north/103/2');await tick();
 assert.equal(p.w.document.querySelector('.reviewed-grammar').dataset.section,'103.2');
 await travel(p,'back');assert.equal(p.w.document.querySelector('.reviewed-grammar').dataset.section,'103.1');
 await travel(p,'forward');assert.equal(p.w.document.querySelector('.reviewed-grammar').dataset.section,'103.2');
 const sectionPage=await page(p.w.location.href);assert.equal(sectionPage.w.document.querySelector('.reviewed-grammar').dataset.section,'103.2');sectionPage.close();
 const anchored=await page(base+'?lang=zh#grammar/north/103?grammarAnchor=chapter-103-1');
 assert.equal(anchored.w.document.querySelector('.reviewed-grammar').dataset.section,'103.2');anchored.close();
 for(const view of ['words','sources','corpus']){p.run('setView("home")');p.w.document.querySelector('.metrics a[href="#'+view+'"]').click();assert.equal(p.run('state.view'),view);}
 // Existing non-record overlays still round-trip without an ID query parameter.
 p.run('setView("notation");npShowEvidence("zhou-ts","onset","n")');await tick();
 assert.equal(p.run('currentOverlay.type'),'notation-pair');
 assert(!new URL(p.w.location.href).searchParams.has('id'));
 await travel(p,'back');assert(!p.w.document.querySelector('#detail').open);
 await travel(p,'forward');assert.equal(p.run('currentOverlay.type'),'notation-pair');
 const alias=p.run('Object.entries(D.wordAliases).find(([old,id])=>old!==id&&W[id])');
 assert(alias,'fixture includes a merged word ID');
 const aliasPage=await page(base+'?lang=en&id='+encodeURIComponent(alias[0]));
 assert.equal(aliasPage.run('currentDetail'),alias[1]);
 assert.equal(new URL(aliasPage.w.location.href).searchParams.get('id'),alias[1]);
 assert.equal(aliasPage.w.location.hash,'#words');aliasPage.close();
 // Corpus-only links need no route fragment; unknown and prototype names are safe.
 const directCorpus=await page(base+'?lang=en&id='+encodeURIComponent(corpus));
 assert.equal(directCorpus.w.location.hash,'#corpus');assert.equal(directCorpus.run('currentDetail'),corpus);directCorpus.close();
 const invalid=await page(base+'?lang=en&id=__proto__#corpus');
 assert(!invalid.w.document.querySelector('#detail').open);
 assert.equal(invalid.w.document.querySelector('#toast').textContent,'Entry not found.');
 assert(!new URL(invalid.w.location.href).searchParams.has('id'));invalid.close();
 const blocked=await page(base+'?lang=en#words',{stored:'zh',storageBlocked:true});
 expectLanguage(blocked,'en');blocked.w.TujiaUI.setLanguage('zh');expectLanguage(blocked,'zh');assert.deepEqual(blocked.errors,[]);blocked.close();
 await p.run('loadAllSourceTexts()');
 const rendered=p.run(`(()=>{const counts={};for(const [kind,fn]of [['sources',sourceDetail],['corpus',corpusDetail],['reconstructions',reconstructionDetail]]){for(const record of D[kind]){const html=fn(record);if(!html||html.includes('undefined'))throw Error(kind+': '+record.id);}counts[kind]=D[kind].length;}return counts;})()`);
 await p.run('loadAllWordEvidence()');
 p.run('setView("words",false,{q:"water",searchLanguage:"en"});download=(name,rows)=>{window.testExport={name,rows}}');
 await p.w.document.querySelector('#export-words').onclick();
 const exported=p.w.testExport;
 assert(exported.rows.length>0);assert(exported.rows.some(w=>w.attestations?.length));
 assert(exported.rows.every(w=>!Object.keys(w).some(k=>k.startsWith('_'))));
 assert(exported.rows.every(w=>Array.isArray(w.canonicalPos)&&w.source_url!==undefined));
 console.log('PASS: complete source/corpus/comparison detail rendering '+JSON.stringify(rendered)+'; lazy export includes evidence and excludes internal caches.');
 assert.deepEqual(p.errors,[]);p.close();
 console.log('PASS: shared languages, fresh word/corpus links, reload, Back/Forward/Close, route/filter preservation, merged IDs, invalid IDs and blocked storage.');
})().catch(error=>{console.error(error);process.exitCode=1}).finally(()=>{for(const dom of openPages)dom.window.close()});
