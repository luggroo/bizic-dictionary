/* Numbered grammar sections are independently addressable reading pages. */
const grammarPageMaps=new Map();
function grammarPages(dialect){return REVIEWED_GRAMMAR[dialect].flatMap(ch=>ch.sections.length?ch.sections.map(section=>({ch,section})): [{ch,section:null}]);}
function grammarPageURL(ch,section,anchor=''){
 const number=section?ch.sections.findIndex(s=>s.id===section.id)+1:0;
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
 const link=(page,direction)=>page?`<a href="${grammarPageURL(page.ch,page.section)}" rel="${direction==='previous'?'prev':'next'}" class="grammar-page-${direction}"><span class="grammar-page-direction">${direction==='previous'?'← 上一页':'下一页 →'}</span><span class="grammar-page-target">${page.section?page.ch.number+'.'+page.section.id.split('.').at(-1):page.ch.number} <span>${E(page.section?.title||page.ch.title)}</span></span></a>`:'<span></span>';
 return `<p class="grammar-page-position" data-ui-content>${window.TujiaUI?.language==='en'?'Page '+(index+1)+' of '+pages.length:'第 '+(index+1)+' / '+pages.length+' 页'}</p><nav class="chapter-pagination grammar-page-navigation" aria-label="语法分页">${link(pages[index-1],'previous')}${link(pages[index+1],'next')}</nav>`;
}
grammarChapter=function(ch){
 const section=ch.sections.find(s=>s.id===state.grammarSection)||ch.sections[0]||null;
 const number=section?ch.number+'.'+section.id.split('.').at(-1):ch.number;
 return (section?`<p class="grammar-page-parent">${ch.number}. <span>${E(ch.title)}</span></p>`:'')+
 `<h1 class="grammar-reading-title${ch.pending?' grammar-pending':''}">${number} <span>${E(section?.title||ch.title)}</span>${ch.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</h1>`+
 grammarPageHTML(ch,section?.id||'')+grammarReadingNavigation(ch,section);
};
grammarView=function(){
 const d=state.grammarDialect||'north',chapters=REVIEWED_GRAMMAR[d],ch=chapters.find(c=>c.id===state.chapter)||chapters[0];
 const current=ch.sections.find(s=>s.id===state.grammarSection)||ch.sections[0];
 const chapterButton=c=>`<button data-chapter="${c.id}" data-grammar-dialect="${d}" class="${c.id===ch.id?'selected ':''}${c.pending?'grammar-pending':''}">${c.number}. <span>${E(c.title)}</span>${c.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</button>`;
 const toc=chapters.map(c=>chapterButton(c)+(c.id===ch.id&&c.sections.length?'<div class="grammar-toc-sections">'+c.sections.map(s=>`<a href="${grammarPageURL(c,s)}"${s.id===current?.id?' aria-current="page"':''}>${c.number+'.'+s.id.split('.').at(-1)} <span>${E(s.title)}</span></a>`).join('')+'</div>':'')).join('');
 const term=state.q?.trim();
 const results=term?grammarPages(d).filter(p=>{
  const holder=document.createElement('div');holder.innerHTML=grammarPageHTML(p.ch,p.section?.id||'');return contains(p.ch.title+' '+(p.section?.title||'')+' '+holder.textContent,term);
 }):[];
 const found=term?'<h1>检索结果</h1><div class="grammar-page-results">'+results.map(p=>`<a href="${grammarPageURL(p.ch,p.section)}">${p.ch.number+(p.section?'.'+p.section.id.split('.').at(-1):'')}. <span>${E(p.section?.title||p.ch.title)}</span></a>`).join('')+'</div>':grammarChapter(ch);
 return pageHeader('grammar')+grammarSwitch()+search('在本套语法中检索规则、章节与例句…')+`<div class="grammar-layout"><nav class="grammar-toc" aria-label="语法目录">${toc}</nav><article class="grammar-article grammar-reading">${found}</article></div>`;
};
