/* Load each reader tool when its route is opened; the home screen stays independent. */
'use strict';
window.SITE_HOME_HTML=document.getElementById('main').innerHTML;
const SitePages=(()=>{
 const definitions={
  inflate:{files:['vendor/pako_inflate.min.js']},
  notation:{files:['notation-profiles.js','ipa-normalize.js','notation-ui.js','southern-notation.js','yubao.js','notation-pairs.js'],css:['notation-pairs.css']},
  catalogue:{requires:['notation'],files:['brassett-grammar.js','grammar-data.js','research.js','grammar-dialects.js','ui-translations.js']},
  dictionary:{requires:['notation'],files:['semantic-categories.js','word-merge-groups.js','lexical-reviews.js','word-classes.js','word-merge.js','editorial-notes.js','spelling-boundaries.js','word-class-ui.js','ui-translations.js']},
  grammar:{requires:['catalogue','notation'],files:['south-zhou-phonology.js','grammar-integrated.js','grammar-evidence.js','grammar-notation.js','grammar-reviewed-data.js','grammar-glosses.js','grammar-reviewed.js','content-translations.js','grammar-reviewed-i18n.js','grammar-pages.js'],css:['grammar-integrated.css','grammar-reviewed.css']},
  corpus:{requires:['notation'],files:['longshan-texts.js','corpus-player.js','content-translations.js','ui-translations.js']},
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
  const dependency={'words-index':'dictionary',corpus:'corpus',history:'history'}[name];
  if(!data.has(name))data.set(name,Promise.all([fastChunk(name),dependency?group(dependency):Promise.resolve()]).then(([payload])=>{applyPreparedPart(name,payload);readyData.add(name);}).catch(error=>{data.delete(name);throw error}));
  return data.get(name);
 }
 function needs(next,id){
  const modules=new Set(),parts=new Set();
  const add=view=>{
   if(view==='words'){modules.add('dictionary');parts.add('words-index');}
   if(view==='grammar')modules.add('grammar');
   if(view==='notation'){modules.add('dictionary');modules.add('catalogue');parts.add('words-index');parts.add('history');}
   if(view==='sources'){modules.add('catalogue');parts.add('catalogue');}
   if(view==='corpus'){modules.add('corpus');parts.add('corpus');}
   if(view==='history'){modules.add('history');parts.add('history');}
  };
  if(next.view==='home'&&next.q){for(const view of ['words','grammar','sources','corpus','history'])add(view);}
  else add(next.view);
  if(id){
   if(C?.[id])add('corpus');
   else if(S?.[id])add('sources');
   else if(R?.[id]){add('history');add('words');}
   else add('words');
  }
  // A standalone converter also uses the full interface translations.
  if(modules.delete('ui-translations'))modules.add('catalogue');
  if(modules.size)parts.add('catalogue');
  return {modules:[...modules],parts:[...parts]};
 }
 function isReady(next,id){const n=needs(next,id);return n.modules.every(x=>readyGroups.has(x))&&n.parts.every(x=>readyData.has(x));}
 async function prepare(next,id){
  const n=needs(next,id);await Promise.all([...n.modules.map(group),...n.parts.map(part)]);
  if(readyData.has('words-index')&&!window.preparedClassesReady){WordClasses.initialize(D.words);window.preparedClassesReady=true;}
 }
 function defer(next,id,resume){
  const serial=++requestSerial;
  if(isReady(next,id)){waiting=false;return false;}
  waiting=true;
  const main=document.getElementById('main');
  main.innerHTML='<p role="status">正在载入页面…</p>';
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
  prepare(next,id).then(()=>{if(serial===requestSerial){try{resume()}catch(error){error.pageReload=true;console.error(error);failed(error,true)}}},failed);
  return true;
 }
 return {defer,prepare,isReady,definitions,group,get pending(){return waiting;}};
})();
window.SitePages=SitePages;
