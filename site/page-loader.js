/* Load each reader tool when its route is opened; the home screen stays independent. */
'use strict';
window.SITE_HOME_HTML=document.getElementById('main').innerHTML;
const SitePages=(()=>{
 const definitions={
  inflate:{files:['vendor/pako_inflate.min.js']},
  notation:{files:['notation-profiles.js','ipa-normalize.js','notation-ui.js','southern-notation.js','yubao.js','notation-pairs.js'],css:['notation-pairs.css']},
  catalogue:{requires:['notation'],files:['research.js']},
  'grammar-base':{requires:['catalogue'],files:['brassett-grammar.js','grammar-data.js','grammar-dialects.js']},
  interface:{files:['ui-translations.js']},
  'corpus-en':{requires:['interface'],files:['content-translations.js']},
  'grammar-en':{requires:['interface'],files:['content-translations.js','grammar-reviewed-i18n.js']},
  'word-list':{requires:['notation'],files:['semantic-categories.js','word-classes.js','word-index.js','word-class-ui.js']},
  'word-detail':{requires:['word-list'],files:['word-entry.js']},
  dictionary:{requires:['word-list'],files:['word-merge-groups.js','lexical-reviews.js','word-merge.js','editorial-notes.js','spelling-boundaries.js','ui-translations.js']},
  grammar:{requires:['grammar-base','notation'],files:['south-zhou-phonology.js','grammar-integrated.js','grammar-evidence.js','grammar-notation.js','grammar-reviewed-data.js','grammar-glosses.js','grammar-reviewed.js','grammar-pages.js'],css:['grammar-integrated.css','grammar-reviewed.css']},
  corpus:{requires:['notation'],files:['longshan-texts.js','corpus-player.js']},
  history:{requires:['catalogue','notation'],files:['comparison-merge.js']}
 };
 const assets=JSON.parse(document.getElementById('site-assets')?.textContent||'{}');
 const reads=new Map(),loaded=new Set(),groups=new Map(),readyGroups=new Set(),data=new Map(),readyData=new Set();
 let requestSerial=0,waiting=false;
 const assetURL=name=>name+(assets[name]?'?v='+assets[name]:'');
 function readAsset(name){
  if(!reads.has(name))reads.set(name,SiteRequest.text(assetURL(name)).catch(error=>{reads.delete(name);throw error}));
  return reads.get(name);
 }
 function execute(name,source){
  if(loaded.has(name))return;
  const node=document.createElement(name.endsWith('.css')?'style':'script');node.dataset.siteAsset=name;
  if(node.tagName==='STYLE')node.textContent=source;
  else node.textContent=source+'\n//# sourceURL='+new URL(assetURL(name),location.href).href;
  let failure;
  const onError=event=>{failure=event.error||new Error(event.message)};
  window.addEventListener('error',onError);
  try{document.head.append(node);}finally{window.removeEventListener('error',onError);}
  if(failure){reads.delete(name);node.remove();failure.pageReload=true;throw failure;}
  loaded.add(name);
 }
 function group(name){
  if(!groups.has(name))groups.set(name,(async()=>{
   const definition=definitions[name];
   await Promise.all((definition.requires||[]).map(group));
   const names=[...(definition.css||[]),...definition.files];
   const sources=await Promise.all(names.map(readAsset));
   names.forEach((name,i)=>execute(name,sources[i]));
   readyGroups.add(name);
  })().catch(error=>{groups.delete(name);throw error}));
  return groups.get(name);
 }
 function part(name){
  const dependency={'word-search':'word-list','corpus-index':'corpus','corpus-search':'corpus',history:'history'}[name];
  if(!data.has(name))data.set(name,Promise.all([fastChunk(name),dependency?group(dependency):Promise.resolve(),name==='corpus-search'?part('corpus-index'):Promise.resolve()]).then(([payload])=>{applyPreparedPart(name,payload);readyData.add(name);}).catch(error=>{data.delete(name);fastChunks.delete(name);throw error}));
  return data.get(name);
 }
 function needs(next,id,language=window.TujiaUI?.language||'zh'){
  const modules=new Set(),parts=new Set();
  const add=view=>{
   if(view==='words'){modules.add('word-list');parts.add('word-search');}
   if(view==='grammar')modules.add('grammar');
   if(view==='notation'){modules.add('dictionary');modules.add('catalogue');parts.add('word-search');parts.add('history');}
   if(view==='sources'){modules.add('catalogue');parts.add('catalogue');}
   if(view==='corpus'){modules.add('corpus');parts.add('corpus-index');if(next.q&&['home','corpus'].includes(next.view))parts.add('corpus-search');}
   if(view==='history'){modules.add('history');parts.add('history');}
  };
  if(next.view==='home'&&next.q){for(const view of ['words','grammar','sources','corpus','history'])add(view);}
  else add(next.view);
  if(id){
   if(C?.[id])add('corpus');
   else if(S?.[id])add('sources');
   else if(R?.[id])add('history');
   else {add('words');modules.add('word-detail');}
   if(id==='brassett-2006')modules.add('grammar-base');
  }
  // A standalone converter also uses the full interface translations.
  if(modules.delete('ui-translations'))modules.add('catalogue');
  if(language==='en'){
   if(['catalogue','grammar','corpus','history'].some(name=>modules.has(name)))modules.add('interface');
   if(modules.has('grammar'))modules.add('grammar-en');
   if(modules.has('corpus'))modules.add('corpus-en');
  }
  if(modules.size)parts.add('catalogue');
  return {modules:[...modules],parts:[...parts]};
 }
 function isReady(next,id){const n=needs(next,id);return n.modules.every(x=>readyGroups.has(x))&&n.parts.every(x=>readyData.has(x));}
 async function prepare(next,id){
  const n=needs(next,id);await Promise.all([...n.modules.map(group),...n.parts.map(part)]);
  if(readyData.has('word-search')&&!window.preparedClassesReady){WordClasses.initialize(D.words);window.preparedClassesReady=true;}
 }
 function defer(next,id,resume){
  const serial=++requestSerial;
  if(isReady(next,id)){waiting=false;return false;}
  waiting=true;
  const main=document.getElementById('main');
  const wordSearch=next.view==='words';
  main.innerHTML=wordSearch?pageHeader('words')+search()+languageSearchButtons()+'<p role="status">正在准备词汇检索…</p>':'<p role="status">正在载入页面…</p>';
  if(wordSearch)bindMain();
  document.getElementById('crumb').textContent=titles[next.view]||titles.home;
  document.body.dataset.view=next.view;
  document.querySelectorAll('aside>nav [data-view]').forEach(button=>{const current=button.dataset.view===next.view;button.classList.toggle('active',current);if(current)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
  window.TujiaUI?.refresh();
  const failed=(error,force=false)=>{
   if(!force&&serial!==requestSerial)return;
   main.innerHTML='<p role="status">页面未能载入，请重试。</p><button id="retry-page">重试</button>';
   document.getElementById('retry-page').onclick=()=>{if(error.pageReload)location.reload();else if(!defer(next,id,resume))resume();};
   window.TujiaUI?.refresh();
  };
  prepare(next,id).then(()=>{if(serial===requestSerial){
   const input=main.querySelector('#query'),draft=input?.value,focused=document.activeElement===input,start=input?.selectionStart,end=input?.selectionEnd;
   try{
    resume();
    const readyInput=main.querySelector('#query');
    if(readyInput&&draft!==undefined&&draft!==next.q){readyInput.value=draft;if(focused){readyInput.focus();readyInput.setSelectionRange(start,end);}}
   }catch(error){error.pageReload=true;console.error(error);failed(error,true)}
  }},failed);
  return true;
 }
 async function prepareLanguage(language){const n=needs(state,currentDetail,language);await Promise.all(n.modules.map(group));}
 return {defer,prepare,isReady,prepareLanguage,definitions,group,get pending(){return waiting;}};
})();
window.SitePages=SitePages;
