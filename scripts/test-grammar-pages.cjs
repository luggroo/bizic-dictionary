// Check section boundaries and retained evidence across all reading pages.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const source=fs.readFileSync(path.join(__dirname,'test-reviewed-grammar.cjs'),'utf8');
const dom=new JSDOM('<main></main>',{runScripts:'outside-only'}),ctx=dom.getInternalVMContext();
vm.runInContext(source.split('content:`')[1].split('`});')[0],ctx);
const files=JSON.parse(source.split('for(const f of ')[1].split(')await page.addScriptTag')[0].replaceAll("'",'"'));
for(const f of [...files,'grammar-pages.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../site',f),'utf8'),ctx,{filename:f});
const result=vm.runInContext(`(()=>{
 const failures=[];let pages=0,citations=0;
 const bodyPairs=root=>[...root.querySelectorAll('.grammar-pair')].filter(n=>!n.closest('.grammar-footnotes')).map(n=>n.dataset.ipa).sort();
 const root=html=>{const n=document.createElement('div');n.innerHTML=html;return n};
 // Stable routes must survive reordered and merged reading sections.
 for(const [dialect,chapters] of Object.entries(REVIEWED_GRAMMAR)){
  for(const ch of chapters)for(const [index,section] of ch.sections.entries()){
   const route=grammarPageURL(ch,section).split('/');
   if(route[2]+'.'+route[3]!==section.id)failures.push(section.id+': route points to another section');
   if(grammarPageNumber(ch,section)!==ch.number+'.'+(index+1))failures.push(section.id+': reading number out of order');
  }
  for(const [old,target] of Object.entries(GRAMMAR_PAGE_REDIRECTS[dialect]||{})){
   const resolved=grammarResolvePage({grammarDialect:dialect,grammarSection:old});
   const ch=chapters.find(c=>c.id===resolved.chapter);
   if(resolved.grammarSection!==target||!ch?.sections.some(s=>s.id===target))failures.push(old+': missing redirect target');
  }
 }
 for(const d of ['north','south'])for(const ch of REVIEWED_GRAMMAR[d])for(const language of ['zh','en']){
  const whole=root(grammarRenderHTML(ch,language)),combined=[],rendered=new Map();
  for(const section of ch.sections.length?ch.sections:[null]){
   const page=root(grammarPageHTML(ch,section?.id||'',language));rendered.set(section?.id||'',page);pages++;combined.push(...bodyPairs(page));
   if(ch.sections.length&&page.querySelector('h3'))failures.push(ch.id+': extra section title');
   for(const a of page.querySelectorAll('[data-footnote-target]')){citations++;if(!page.querySelector('[id="'+a.dataset.footnoteTarget+'"]'))failures.push(ch.id+': missing citation target '+a.dataset.footnoteTarget);}
   const ids=[...page.querySelectorAll('[id]')].map(n=>n.id);if(new Set(ids).size!==ids.length)failures.push(ch.id+': duplicate anchor');
  }
  if(JSON.stringify(combined.sort())!==JSON.stringify(bodyPairs(whole)))failures.push(ch.id+': lost or repeated IPA between sections');
  for(const [anchor,section] of grammarPageMap(ch))if(section){const page=rendered.get(section);if(!page.querySelector('[id="'+anchor+'"]'))failures.push(ch.id+': anchor on wrong page '+anchor);}
 }
 const adjective=root(grammarRenderHTML(REVIEWED_GRAMMAR.north.find(c=>c.id==='104')));
 const table=[...adjective.querySelectorAll('table')].find(t=>t.textContent.includes('好 → 好的'));
 for(const row of table.tBodies[0].rows)for(const cell of [row.cells[1],row.cells[2]]){
  if(cell.querySelectorAll('.grammar-pair').length!==1)failures.push('adjective pair missing');
  const copy=cell.cloneNode(true);copy.querySelectorAll('.grammar-pair').forEach(n=>n.remove());if(copy.textContent.trim())failures.push('duplicate adjective spelling '+copy.textContent);
 }
 const questions=root(grammarRenderHTML(REVIEWED_GRAMMAR.north.find(c=>c.id==='105')));
 const q=[...questions.querySelectorAll('table')].find(t=>t.rows[0].cells[0].textContent==='问什么');
 if(q.tBodies[0].rows.length!==9)failures.push('question forms not grouped');
 const pairs=[...q.querySelectorAll('.grammar-pair')];if(pairs.length!==15||pairs.some(p=>!p.dataset.ipa||!p.querySelector('[data-ye][data-accent]')))failures.push('question notation missing');
 const what=[...q.tBodies[0].rows].find(r=>r.cells[0].textContent==='什么');if(what.querySelectorAll('.grammar-pair').length!==3)failures.push('what variants lost');
 const how=[...q.tBodies[0].rows].find(r=>r.cells[0].textContent.includes('怎么样'));if(how.querySelectorAll('.grammar-pair').length!==4)failures.push('how variants lost');
 // Mobile chapter list opens on entry, supports manual toggling, and
 // collapses after choosing a chapter or subchapter without changing routes.
 document.querySelector('main').innerHTML=grammarView();
 let toc=document.querySelector('.grammar-toc-wrap');
 const toggle=toc?.querySelector('.grammar-toc-toggle');
 if(!toc||!toggle)failures.push('Missing mobile chapter toggle');
 else{
  if(toc.dataset.mobileExpanded!=='true'||toggle.getAttribute('aria-expanded')!=='true')failures.push('Mobile TOC not expanded on entry');
  toggle.click();
  if(toc.dataset.mobileExpanded!=='false'||toggle.getAttribute('aria-expanded')!=='false')failures.push('Mobile TOC cannot be manually collapsed');
  toggle.click();
  if(toc.dataset.mobileExpanded!=='true')failures.push('Mobile TOC cannot reopen');
  const chapter=toc.querySelector('button[data-chapter]');
  chapter.click();
  if(toc.dataset.mobileExpanded!=='false')failures.push('Mobile TOC does not collapse after chapter click');
  document.querySelector('main').innerHTML=grammarView();
  toc=document.querySelector('.grammar-toc-wrap');
  if(toc.dataset.mobileExpanded!=='false')failures.push('Mobile TOC reopened on page render');
  toc.querySelector('.grammar-toc-toggle').click();
  toc.querySelector('.grammar-toc-sections a[href^="#grammar/"]')?.click();
  if(toc.dataset.mobileExpanded!=='false')failures.push('Mobile TOC does not collapse after subsection click');
  // Visiting the Reference Grammar tab again starts with its list expanded.
  const open=document.createElement('button');open.dataset.view='grammar';document.querySelector('main').append(open);open.click();
  document.querySelector('main').innerHTML=grammarView();
  if(document.querySelector('.grammar-toc-wrap')?.dataset.mobileExpanded!=='true')failures.push('Reentering grammar does not reopen chapters');
 }
 // The mobile title jump targets the actual reading heading, never the TOC.
 const heading=document.querySelector('.grammar-article > h1.grammar-reading-title');
 const scrolls=[],originalScroll=window.scrollTo,originalScrollY=window.scrollY;
 const originalHeadingRect=heading.getBoundingClientRect;
 window.scrollTo=options=>scrolls.push(options);
 window.scrollY=125;
 heading.getBoundingClientRect=()=>({top:250});
 const originalMatchMedia=window.matchMedia;
 window.matchMedia=()=>({matches:true});
 grammarSetMobileTocExpanded(false);
 if(!grammarJumpToReadingTitle())failures.push('Collapsed mobile chapter does not jump to title');
 if(scrolls.length!==1||scrolls[0].top!==361||scrolls[0].behavior!=='auto')failures.push('Mobile chapter jump did not target reading h1');
 heading.getBoundingClientRect=()=>({top:-500});
 if(!grammarJumpToReadingTitle()||scrolls.length!==2||scrolls[1].top!==0)failures.push('Mobile chapter jump scrolled above document start');
 grammarSetMobileTocExpanded(true);
 if(grammarJumpToReadingTitle()||scrolls.length!==2)failures.push('Expanded menu unexpectedly triggered title jump');
 grammarSetMobileTocExpanded(false);
 window.matchMedia=()=>({matches:false});
 if(grammarJumpToReadingTitle()||scrolls.length!==2)failures.push('Desktop chapter jump should be disabled');
 if(originalMatchMedia===undefined)delete window.matchMedia;else window.matchMedia=originalMatchMedia;
 window.scrollTo=originalScroll;window.scrollY=originalScrollY;heading.getBoundingClientRect=originalHeadingRect;
 // A genuinely different source spelling remains visible.
 const alternate=root(grammarRenderHTML({id:'999',dialect:'north',html:'<table><tr><td>other /tsʰa²⁴/</td></tr></table>'}));if(!alternate.textContent.includes('other'))failures.push('different source form removed');
 return {failures,pages,citations};
})()`,ctx);
assert.deepEqual(Array.from(result.failures),[]);console.log('PASS: '+result.pages+' bilingual section renders; '+result.citations+' citation links; complete IPA, anchor boundaries, grouped question forms and duplicate spelling regression.');dom.window.close();
