/* Numbered grammar sections are independently addressable reading pages. */
const grammarPageMaps=new Map();
/* Mobile chapter navigation starts expanded and folds away after a selection.
 * The desktop chapter rail remains visible independently of this state. */
let grammarMobileTocExpanded=true;
function grammarTocMobileViewport(){
 return typeof window.matchMedia!=='function'||window.matchMedia('(max-width: 900px)').matches;
}
function grammarSetMobileTocExpanded(expanded){
 grammarMobileTocExpanded=expanded;
 const wrap=document.querySelector('.grammar-toc-wrap');
 if(!wrap)return;
 wrap.dataset.mobileExpanded=String(expanded);
 wrap.querySelector('.grammar-toc-toggle')?.setAttribute('aria-expanded',String(expanded));
}
// On mobile, a chosen reading page begins at its heading, just below the top edge.
function grammarShouldJumpToReadingTitle(){
 return grammarTocMobileViewport()&&!grammarMobileTocExpanded;
}
function grammarJumpToReadingTitle(){
 if(!grammarShouldJumpToReadingTitle())return false;
 const title=document.querySelector('.grammar-article > h1.grammar-reading-title');
 if(!title)return false;
 // A concrete document offset works on mobile Safari, including after an
 // expanded menu disappears and changes the layout above this heading.
 const top=window.scrollY+title.getBoundingClientRect().top-14;
 window.scrollTo({top:Math.max(0,top),behavior:'auto'});
 return true;
}
function grammarQueueReadingTitleScroll(){
 if(!grammarShouldJumpToReadingTitle())return false;
 const destination=location.hash;
 // Navigation and localization rebuild the article. Scroll once immediately
 // and again after the browser has laid out the new heading, not the old TOC.
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(location.hash!==destination||!grammarShouldJumpToReadingTitle())return;
  if(grammarJumpToReadingTitle()&&typeof saveNavigationPosition==='function')saveNavigationPosition();
 }));
 return true;
}
document.addEventListener('click',event=>{
 const target=event.target;
 if(!(target instanceof Element))return;
 if(target.closest('.grammar-toc-toggle')){
  grammarSetMobileTocExpanded(!grammarMobileTocExpanded);
  return;
 }
 // Arriving from navigation opens the index for choosing a chapter.
 if(target.closest('[data-view="grammar"],.grammar-switch [data-grammar-dialect]') ||
    (target.closest('[data-grammar-dialect]')&&!target.closest('[data-chapter]')&&!target.closest('.grammar-toc'))){
  grammarSetMobileTocExpanded(true);
  return;
 }
 // After choosing a chapter, subchapter, or next/previous page, return to reading.
 if(grammarTocMobileViewport()&&target.closest('.grammar-toc [data-chapter],.grammar-toc a[href^="#grammar/"],.grammar-article a[href^="#grammar/"],[data-chapter][data-grammar-dialect]')){
  grammarSetMobileTocExpanded(false);
 }
},true);

// Reading numbers may change while published chapter and section URLs stay stable.
const GRAMMAR_PAGE_REDIRECTS={south:{'201.1':'207.1','201.3':'201.4','202.2':'207.1','202.6':'202.3','203.1':'207.2','203.7':'207.3','204.2':'204.1','204.4':'207.4','205.4':'205.3'}};
function grammarResolvePage(state){
 const target=GRAMMAR_PAGE_REDIRECTS[state.grammarDialect]?.[state.grammarSection];
 return target?{chapter:target.split('.')[0],grammarSection:target}:{};
}
function grammarPageNumber(ch,section){return section?.number||(section?ch.number+'.'+section.id.split('.').at(-1):ch.number);}
function grammarPages(dialect){return REVIEWED_GRAMMAR[dialect].flatMap(ch=>ch.sections.length?ch.sections.map(section=>({ch,section})): [{ch,section:null}]);}
function grammarPageURL(ch,section,anchor=''){
 const number=section?section.id.split('.').at(-1):0;
 return '#grammar/'+ch.dialect+'/'+ch.id+(number?'/'+number:'')+(anchor?'?grammarAnchor='+encodeURIComponent(anchor):'');
}
function grammarPageSections(root){
 const owners=new Map();let index=0;
 for(const node of root.children){
  if(node.matches('h3'))index=Number(node.id.split('-').at(-1));
  let owner=index;
  if(!node.textContent.trim()&&node.querySelector('[id]')){
   let next=node.nextElementSibling;
   while(next&&!next.textContent.trim())next=next.nextElementSibling;
   if(next?.matches('h3'))owner=Number(next.id.split('-').at(-1));
  }
  owners.set(node,owner);
 }
 return owners;
}
function grammarPageMap(ch){
 const key=ch.dialect+'/'+ch.id;if(grammarPageMaps.has(key))return grammarPageMaps.get(key);
 const holder=document.createElement('template');holder.innerHTML=grammarRenderHTML(ch,'zh');const root=holder.content.firstElementChild;
 const map=new Map();
 for(const [node,index] of grammarPageSections(root)){
  if(node.matches('.grammar-footnotes'))continue;
  const section=ch.sections[index]?.id||'';
  for(const el of [node,...node.querySelectorAll('[id]')])if(el.id)map.set(el.id,section);
  for(const citation of node.querySelectorAll('[data-footnote-target]'))if(!map.has(citation.dataset.footnoteTarget))map.set(citation.dataset.footnoteTarget,section);
 }
 for(const note of root.querySelectorAll('.grammar-footnotes li')){
  const section=map.get(note.id);if(section)for(const anchor of note.querySelectorAll('[id]'))map.set(anchor.id,section);
 }
 grammarPageMaps.set(key,map);return map;
}
function normalizeGrammarSection(chapter,dialect,section,anchor=''){
 const ch=REVIEWED_GRAMMAR[dialect].find(c=>c.id===chapter);if(!ch?.sections.length)return '';
 if(anchor){const target=grammarPageMap(ch).get(anchor);if(target)return target;}
 return ch.sections.some(s=>s.id===section)?section:'';
}
function grammarPageHTML(ch,sectionId,language=window.TujiaUI?.language||'zh'){
 const holder=document.createElement('template');holder.innerHTML=grammarRenderHTML(ch,language);const root=holder.content.firstElementChild;
 const selected=ch.sections.findIndex(s=>s.id===sectionId);
 if(selected>=0){
  for(const [node,index] of grammarPageSections(root)){
   if(!node.matches('.grammar-footnotes')&&index!==selected)node.remove();
  }
  // Keep original reference numbers and only the references used on this page.
  const cited=new Set([...root.querySelectorAll(':scope > :not(.grammar-footnotes) [data-footnote-target]')].map(a=>a.dataset.footnoteTarget));
  for(const [i,note]of [...root.querySelectorAll('.grammar-footnotes li')].entries()){
   note.value=i+1;if(!cited.has(note.id)){note.remove();continue;}
   for(const back of note.querySelectorAll('.grammar-footnote-return'))if(!root.querySelector('[id="'+back.dataset.footnoteTarget+'"]'))back.remove();
  }
  const notes=root.querySelector('.grammar-footnotes');if(notes&&!notes.querySelector('li'))notes.remove();
  const title=root.querySelector(':scope > h3');if(title){const anchor=document.createElement('span');anchor.id=title.id;anchor.className='grammar-page-anchor';title.replaceWith(anchor);}
 }
 for(const heading of root.querySelectorAll('h4')){const h=document.createElement('h2');h.innerHTML=heading.innerHTML;if(heading.id)h.id=heading.id;heading.replaceWith(h);}
 root.dataset.readingPage='true';root.dataset.section=sectionId||'';return root.outerHTML;
}
function grammarReadingNavigation(ch,section){
 const pages=grammarPages(ch.dialect),index=pages.findIndex(p=>p.ch.id===ch.id&&(p.section?.id||'')===(section?.id||''));
 const link=(page,direction)=>page?`<a href="${grammarPageURL(page.ch,page.section)}" rel="${direction==='previous'?'prev':'next'}" class="grammar-page-${direction}"><span class="grammar-page-direction">${direction==='previous'?'← 上一页':'下一页 →'}</span><span class="grammar-page-target">${grammarPageNumber(page.ch,page.section)} <span>${E(page.section?.title||page.ch.title)}</span></span></a>`:'<span></span>';
 return `<p class="grammar-page-position" data-ui-content>${window.TujiaUI?.language==='en'?'Page '+(index+1)+' of '+pages.length:'第 '+(index+1)+' / '+pages.length+' 页'}</p><nav class="chapter-pagination grammar-page-navigation" aria-label="语法分页">${link(pages[index-1],'previous')}${link(pages[index+1],'next')}</nav>`;
}
grammarChapter=function(ch){
 const section=ch.sections.find(s=>s.id===state.grammarSection)||ch.sections[0]||null;
 const number=grammarPageNumber(ch,section);
 return (section?`<p class="grammar-page-parent">${ch.number}. <span>${E(ch.title)}</span></p>`:'')+
 `<h1 class="grammar-reading-title${ch.pending?' grammar-pending':''}">${number} <span>${E(section?.title||ch.title)}</span>${ch.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</h1>`+
 grammarPageHTML(ch,section?.id||'')+grammarReadingNavigation(ch,section);
};
const grammarSearchPagesCache=new Map();
function grammarSearchPages(d){
 const key=[d,window.TujiaUI?.language||'zh',spellingDisplay,southernDisplay,Object.keys(UI_TRANSLATIONS).length].join('/');
 if(grammarSearchPagesCache.has(key))return grammarSearchPagesCache.get(key);
 const pages=grammarPages(d).map(page=>{const holder=document.createElement('div');holder.innerHTML=grammarPageHTML(page.ch,page.section?.id||'');return {page,text:page.ch.title+' '+(page.section?.title||'')+' '+holder.textContent};});
 if(grammarSearchPagesCache.size>=8)grammarSearchPagesCache.delete(grammarSearchPagesCache.keys().next().value);
 grammarSearchPagesCache.set(key,pages);return pages;
}
grammarView=function(){
 const d=state.grammarDialect||'north',chapters=REVIEWED_GRAMMAR[d],ch=chapters.find(c=>c.id===state.chapter)||chapters[0];
 const current=ch.sections.find(s=>s.id===state.grammarSection)||ch.sections[0];
 const chapterButton=c=>`<button data-chapter="${c.id}" data-grammar-dialect="${d}" class="${c.id===ch.id?'selected ':''}${c.pending?'grammar-pending':''}">${c.number}. <span>${E(c.title)}</span>${c.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</button>`;
 const toc=chapters.map(c=>chapterButton(c)+(c.id===ch.id&&c.sections.length?'<div class="grammar-toc-sections">'+c.sections.map(s=>`<a href="${grammarPageURL(c,s)}"${s.id===current?.id?' aria-current="page"':''}>${grammarPageNumber(c,s)} <span>${E(s.title)}</span></a>`).join('')+'</div>':'')).join('');
 const term=state.q?.trim();
 const results=term?grammarSearchPages(d).filter(p=>contains(p.text,term)).map(p=>p.page):[];
 const found=term?'<h1>检索结果</h1><div class="grammar-page-results">'+(results.length?results.map(p=>`<a href="${grammarPageURL(p.ch,p.section)}">${grammarPageNumber(p.ch,p.section)}. <span>${E(p.section?.title||p.ch.title)}</span></a>`).join(''):empty())+'</div>':grammarChapter(ch);
 return pageHeader('grammar')+grammarSwitch()+search('在本套语法中检索规则、章节与例句…')+`<div class="grammar-layout"><div class="grammar-toc-wrap" data-mobile-expanded="${grammarMobileTocExpanded}"><button class="grammar-toc-toggle" type="button" aria-controls="grammar-toc-nav" aria-expanded="${grammarMobileTocExpanded}"><span class="grammar-toc-toggle-label">章节目录 <span class="grammar-toc-current">${ch.number}. ${E(ch.title)}</span></span><span class="grammar-toc-chevron" aria-hidden="true"></span></button><nav class="grammar-toc" id="grammar-toc-nav" aria-label="语法目录">${toc}</nav></div><article class="grammar-article grammar-reading">${found}</article></div>`;
};
