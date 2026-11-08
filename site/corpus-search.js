// Corpus full-text search and in-document navigation. Keep source spelling intact.
'use strict';
function corpusSearchText(c){
 // Older corpus records may already provide a richer searchable transcript,
 // including interlinear glosses not present in their display text.
 // Keep that complete source index verbatim to preserve existing searches.
 if(c._searchText!=null)return String(c._searchText);
 if(c.text)return String(c.text);
 const fallback=(c.blocks||[]).flatMap(b=>[b.ipa,b.ye,b.zh,b.en,...(b.glosses||[]).flatMap(g=>[g.ye,g.zh,g.en])]).filter(Boolean).join('\n');
 return [fallback,c.annotation,c.culturalNote,c.culturalNoteEn].filter(Boolean).join('\n');
}
// Fold each grapheme while preserving the original UTF-16 positions for highlights.
function corpusSearchRanges(text,query){
 const needle=searchNormalize(query);if(!needle)return [];
 const source=String(text??''),starts=[],ends=[];let folded='';
 for(const m of source.matchAll(/[\s\S]\p{M}*/gu)){
  const piece=m[0],begin=m.index,end=begin+piece.length;
  let part=/^\s+$/u.test(piece)?' ':searchNormalize(piece);
  if(part===' '&&folded.endsWith(' '))continue;
  for(let k=0;k<part.length;k++){starts.push(begin);ends.push(end);}
  folded+=part;
 }
 const matches=[];
 for(let at=folded.indexOf(needle);at>=0;at=folded.indexOf(needle,at+needle.length)){
  const begin=starts[at],end=ends[at+needle.length-1];
  if(begin!==undefined&&end>begin&&(!matches.length||begin>=matches[matches.length-1].end))matches.push({start:begin,end});
 }
 return matches;
}
function corpusSearchSnippet(c,query){
 const source=String(c._searchText||c.text||''),match=corpusSearchRanges(source,query)[0];
 if(!match)return '';
 const a=Math.max(0,match.start-60),b=Math.min(source.length,match.end+95),clean=s=>E(s.replace(/\s+/g,' '));
 return '<p class="corpus-search-hit">'+(a?'…':'')+clean(source.slice(a,match.start))+
 '<mark>'+E(source.slice(match.start,match.end))+'</mark>'+clean(source.slice(match.end,b))+
 (b<source.length?'…':'')+'</p>';
}
function corpusWithinControls(){
 const english=window.TujiaUI?.language==='en';
 return '<div class="compact-search corpus-within-search" role="search" aria-label="'+(english?'Find in this text':'在本篇语料中查找')+'">'+
 '<input id="within" type="search" value="'+E(state.q)+'" placeholder="'+(english?'Find in this text':'在本篇语料中查找')+'" aria-label="'+(english?'Find in this text':'语料内查找')+'">'+
 '<button type="button" id="within-find">'+(english?'Find':'查找')+'</button>'+
 '<button type="button" id="within-prev" disabled aria-label="'+(english?'Previous match':'上一处')+'">↑</button>'+
 '<button type="button" id="within-next" disabled aria-label="'+(english?'Next match':'下一处')+'">↓</button>'+
 '<span id="within-count" aria-live="polite"></span></div>';
}
function bindCorpusTextSearch(c){
 const panel=document.getElementById('detail-body'),input=panel.querySelector('#within'),
 root=panel.querySelector(c.externalText||c.survey?'#corpus-text':'#source-text');
 if(!input||!root)return;
 const find=panel.querySelector('#within-find'),prev=panel.querySelector('#within-prev'),
 next=panel.querySelector('#within-next'),counter=panel.querySelector('#within-count'),
 english=window.TujiaUI?.language==='en';
 let marks=[],active=-1;
 function unmark(){
  for(const mark of root.querySelectorAll('mark[data-corpus-match]'))mark.replaceWith(document.createTextNode(mark.textContent));
  root.normalize();marks=[];active=-1;
 }
 function goTo(index){
  if(!marks.length)return;
  active=(index+marks.length)%marks.length;
  marks.forEach((mark,i)=>mark.classList.toggle('corpus-current-match',i===active));
  const target=marks[active];
  for(let node=target.parentElement;node&&node!==panel;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;
  counter.textContent=(active+1)+' / '+marks.length;
  target.scrollIntoView({block:'center',behavior:'auto'});
 }
 function run(){
  unmark();const query=input.value.trim();
  if(!query){counter.textContent='';prev.disabled=next.disabled=true;return;}
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  for(let node=walker.nextNode();node;node=walker.nextNode())if(node.nodeValue?.trim())nodes.push(node);
  for(const node of nodes){
   const value=node.nodeValue,ranges=corpusSearchRanges(value,query);
   if(!ranges.length)continue;
   const fragment=document.createDocumentFragment();let offset=0;
   for(const {start,end} of ranges){
    fragment.appendChild(document.createTextNode(value.slice(offset,start)));
    const mark=document.createElement('mark');mark.dataset.corpusMatch='1';mark.textContent=value.slice(start,end);
    fragment.appendChild(mark);offset=end;
   }
   fragment.appendChild(document.createTextNode(value.slice(offset)));node.replaceWith(fragment);
  }
  marks=[...root.querySelectorAll('mark[data-corpus-match]')];prev.disabled=next.disabled=!marks.length;
  if(marks.length)goTo(0);else counter.textContent=english?'No matches':'没有匹配';
 }
 find.onclick=run;
 input.onkeydown=event=>{if(event.key==='Enter'&&!event.isComposing){event.preventDefault();run();}};
 prev.onclick=()=>goTo(active-1);next.onclick=()=>goTo(active+1);
 if(input.value.trim())run();
}
