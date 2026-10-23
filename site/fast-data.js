'use strict';
// Prepared search records are ready to use; original evidence stays in lazy chunks.
const fastChunks=new Map();
const preparedVersion=document.querySelector('meta[name="prepared-data-version"]')?.content||'';
function fastChunk(name){
 if(!fastChunks.has(name))fastChunks.set(name,fetch('prepared/'+name+'.json.gz'+(preparedVersion?'?v='+encodeURIComponent(preparedVersion):'')).then(preparedJSON).catch(e=>{fastChunks.delete(name);throw e;}));
 return fastChunks.get(name);
}
let fullTextReady=false,fullTextPromise=null,sourceSearchFailed=false;
async function loadSourceText(source){
 if(!source?._textChunk)return;
 const record=await fastChunk(source._textChunk);source.text=record.text;
 delete source._textChunk;delete source._textUnavailable;
}
function loadAllSourceTexts(){
 if(fullTextReady)return Promise.resolve();
 if(!fullTextPromise)fullTextPromise=Promise.all([...D.sources,...(D.sourceVariants||[])].map(loadSourceText)).then(()=>{fullTextReady=true;}).catch(e=>{fullTextPromise=null;throw e;});
 return fullTextPromise;
}
async function loadWordEvidence(word){
 if(word._chunk===undefined)return word;
 const original=(await fastChunk('words-'+word._chunk)).find(w=>w.id===word.id);
 if(!original)throw Error('Missing word '+word.id);
 // Keep object identity so history, dialect filters and WeakMap caches remain valid.
 Object.assign(word,original);delete word._chunk;return word;
}
async function loadAllWordEvidence(){
 const chunks=[...new Set(D.words.filter(w=>w._chunk!==undefined).map(w=>w._chunk))];
 for(const n of chunks){const rows=await fastChunk('words-'+n);for(const original of rows){const word=W[original.id];if(word){Object.assign(word,original);delete word._chunk;}}}
}
let evidenceRequest=0;
async function openPreparedDetail(id){
 const token=++evidenceRequest,dialog=$('#detail'),wasOpen=dialog.open;
 currentDetail=id;currentOverlay=id;
 $('#detail-label').textContent=W[id]?'词汇条目':'文献详情';
 $('#detail-spelling-control').innerHTML='';
 $('#detail-body').innerHTML='<p role="status">正在载入条目…</p>';
 showDetailDialog(id);
 commitDetailNavigation(id,wasOpen);
 if(window.TujiaUI)TujiaUI.refresh();
 try{
  if(W[id]?._chunk!==undefined)await loadWordEvidence(W[id]);
  else if(S[id]?._textChunk){
   try{await loadSourceText(S[id]);}catch{S[id]._textUnavailable=true;S[id]._skipTextOnce=true;}
  }
  if(token===evidenceRequest)openDetail(id);
 }catch{if(token===evidenceRequest){$('#detail-body').innerHTML='<p role="status">条目未能载入，请重试。</p><button data-open="'+E(id)+'">重试</button>';if(window.TujiaUI)TujiaUI.refresh();}}
}
function refreshSourceResults(requested){
 if(viewHash()!==requested)return;
 const input=document.querySelector('#query'),draft=input?.value,focused=document.activeElement===input;
 const start=input?.selectionStart,end=input?.selectionEnd;
 render();
 const next=document.querySelector('#query');
 if(next&&draft!==undefined){next.value=draft;if(focused){next.focus();next.setSelectionRange(start,end);}}
}
function ensureSourceSearch(){
 if(fullTextReady||!state.q.trim()||!['home','sources'].includes(state.view))return false;
 const requested=viewHash();
 if(state.view==='home'){
  if(!fullTextPromise&&!sourceSearchFailed)loadAllSourceTexts().then(()=>refreshSourceResults(requested)).catch(()=>{sourceSearchFailed=true;refreshSourceResults(requested);});
  return false;
 }
 $('#main').innerHTML='<p role="status">正在检索文献全文…</p>';
 if(window.TujiaUI)TujiaUI.refresh();
 loadAllSourceTexts().then(()=>{if(viewHash()===requested)render();}).catch(()=>{if(viewHash()===requested){$('#main').innerHTML='<p role="status">文献全文未能载入。离线时可使用词汇检索。</p><button data-results="words">检索词汇 →</button>';if(window.TujiaUI)TujiaUI.refresh();}});
 return true;
}
document.addEventListener('click',e=>{if(e.target.closest('[data-retry-source-search]')){sourceSearchFailed=false;render();}});
let startupAction=null;
function queueStartupSearch(e){
 e.preventDefault();e.stopImmediatePropagation();startupAction={type:'search',q:document.querySelector('#query')?.value||''};
}
document.addEventListener('submit',e=>{
 if(window.fastReady||e.target.id!=='search-form')return;
 queueStartupSearch(e);
},true);
document.addEventListener('keydown',e=>{if(!window.fastReady&&e.key==='Enter'&&e.target.id==='query'&&!e.isComposing)queueStartupSearch(e);},true);
document.addEventListener('click',e=>{
 if(window.fastReady)return;
 if(e.target.closest('#search-form button,[data-search-language]')){queueStartupSearch(e);return;}
 const b=e.target.closest('[data-view],[data-query],[data-grammar-dialect],[data-open]');if(!b)return;
 e.preventDefault();e.stopImmediatePropagation();startupAction={type:'click',dataset:{...b.dataset}};
},true);
async function initializePreparedData(){
 try{
  const data=await fastChunk('core');D=data;
  S=Object.fromEntries([...(D.sourceVariants||[]),...D.sources].map(x=>[x.id,x]));
  W=Object.fromEntries(D.words.map(x=>[x.id,x]));
  for(const [old,id]of Object.entries(D.wordAliases||{}))W[old]=W[id];
  C=Object.fromEntries(D.corpus.map(x=>[x.id,x]));R=Object.fromEntries((D.reconstructions||[]).map(x=>[x.id,x]));
  WordClasses.initialize(D.words);
  window.fastReady=true;
  initializeNavigation();
  if(startupAction?.type==='search')setView('home',false,{q:startupAction.q});
  else if(startupAction?.type==='click'){
   const d=startupAction.dataset;
   if(d.view)setView(d.view);
   else if(d.query)setView('home',false,{q:d.query});
   else if(d.grammarDialect)setView('grammar',false,{grammarDialect:d.grammarDialect});
   else if(d.open)openDetail(d.open);
  }
  document.documentElement.dataset.readyMs=String(Math.round(performance.now()));
  const status=document.getElementById('startup-status');if(status)status.hidden=true;
 }catch(error){console.error(error);window.fastReady=false;const status=document.getElementById('startup-status');if(status)status.hidden=true;$('#main').innerHTML='<p role="status">资料未能载入，请检查网络后刷新页面。</p>';}
}
