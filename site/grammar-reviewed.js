/* Reading order, aligned examples and switchable spelling for the reviewed grammar. */
for(const d of ['north','south']){
 DIALECT_GRAMMARS[d]=REVIEWED_GRAMMAR[d];
 for(const ch of REVIEWED_GRAMMAR[d])for(const sec of ch.sections)grammarBlocks(d)[sec.id]={integratedHtml:ch.html};
}
function normalizeGrammarChapter(id,d){return REVIEWED_GRAMMAR[d].some(c=>c.id===id)?id:GRAMMAR_LEGACY_CHAPTERS[d][id]||REVIEWED_GRAMMAR[d][0].id;}
const GRAMMAR_JOINED_WORDS=['tɕĩ⁴⁴ xʊa⁴⁴','sa⁴⁴ mi⁴⁴','nie²⁴ pi⁴⁴','pa⁵⁵ pa⁵⁵','ta⁵¹ pʰi²¹','pʰa²¹ pʰu³⁵','tɕʰi³⁵ pu⁵⁵','doŋ²¹ dzian²¹','doŋ²¹ dʑian²¹','ɕi³³ ti²¹','a²¹ pa⁵⁵','a⁵⁵ tiu⁵⁵','a⁵⁵ lu²¹','tɕʰie²¹ pi²⁴'];
function grammarExampleWords(ipa,gloss){
 let text=ipa;for(const word of GRAMMAR_JOINED_WORDS)text=text.replaceAll(word,word.replaceAll(' ','\u00a0'));
 let words=text.split(/\s+/u).filter(Boolean);
 // NBSP keeps explicitly established multi-syllable words in one gloss column.
 words=text.split(/[ \t\n]+/).filter(Boolean).map(w=>w.replaceAll('\u00a0',' '));
 const glosses=gloss.split(/[｜＋，；]/).map(x=>x.trim()).filter(Boolean);
 if(glosses.length===1)return {words:[ipa],glosses};
 if(words.length!==glosses.length)throw Error('Interlinear alignment '+words.length+'/'+glosses.length+': '+ipa);
 return {words,glosses};
}
function grammarGlossEnglish(zh){
 if(GRAMMAR_GLOSS_EN[zh])return GRAMMAR_GLOSS_EN[zh];
 return zh.replace(/[\p{Script=Han}]+/gu,x=>GRAMMAR_GLOSS_EN[x]||x);
}
function grammarPairElement(ipa,d,ye='',enclosure='',spelling=null){
 const pending=d==='south'&&/^(?:i|y)?æ̃$/.test(ipa);
 const pair=pending?{accent:'（拼音待补充）',poj:'（拼音待补充）'}:spelling||grammarSpelling(ipa,d,ye),span=document.createElement('span');
 if(pending)span.dataset.spellingPending='true';
 span.className='grammar-pair'+(pending?' grammar-pending':'');span.dataset.ipa=ipa;span.dataset.dialect=d;span.dataset.uiContent='';
 const roman=document.createElement('span');roman.className='grammar-spelling';roman.lang=d==='south'?'tjs':'tji';
 for(const [key,value] of Object.entries(pair))roman.dataset[key]=value;
 roman.textContent=grammarDisplayedSpelling(pair,d);
 const phonetic=document.createElement('span');phonetic.className='grammar-ipa';phonetic.textContent=enclosure==='/'?'/'+ipa+'/':enclosure==='['?'['+ipa+']':ipa;
 span.append(roman,phonetic);return span;
}
function grammarExample(ipa,glosses,d,pinyin=[],english=[]){
 const figure=document.createElement('figure');figure.className='grammar-interlinear';figure.dataset.dialect=d;
 const line=document.createElement('div');line.className='grammar-word-line';
 const groups=ipa.map((raw,i)=>({raw,spelling:grammarSpelling(raw,d,pinyin[i]||''),zh:glosses[i]||'',en:english[i]||grammarGlossEnglish(glosses[i]||'')}));
 const bare=s=>s.replace(/[\[\]［］()（）*]/g,'').trim();
 if(d==='north')for(let i=1;i<groups.length;i++){
  if(bare(groups[i].zh)!=='名词化')continue;
  let start=i-1;
  while(start>0&&/^(?:状态|不能|未完成|完成)$/.test(bare(groups[start].zh)))start--;
  const parts=groups.slice(start,i+1),merged={raw:parts.map(p=>p.raw).join(' '),spelling:{}};
  for(const key of ['ye','accent'])merged.spelling[key]=parts.slice(0,-1).map(p=>p.spelling[key]).join('')+'-'+parts.at(-1).spelling[key];
  for(const key of ['zh','en'])merged[key]=parts.slice(0,-1).map(p=>p[key]).join('.')+'-'+parts.at(-1)[key];
  groups.splice(start,parts.length,merged);i=start;
 }
 groups.forEach(({raw,spelling,zh,en})=>{
  const word=document.createElement('span');word.className='grammar-word';word.append(grammarPairElement(raw,d,'','',spelling));
  const gloss=document.createElement('span');gloss.className='grammar-gloss';gloss.dataset.uiContent='';gloss.dataset.zh=zh;gloss.dataset.en=en;gloss.textContent=zh;word.append(gloss);line.append(word);
 });figure.append(line);return figure;
}
function grammarMoveTranslation(figure,node){
 if(!node||node.tagName!=='P')return;
 const raw=node.textContent.trim(),translated=raw.replace(/^译文：/,'').split(' / '),caption=document.createElement('figcaption');
 // A source reference may share the paragraph after a Markdown hard break.
 const htmlParts=node.innerHTML.split(/<br\s*\/?>(?:\s*)/i);
 caption.innerHTML=htmlParts[0].replace(/^译文：/,'');
 if(translated.length===2){caption.dataset.uiContent='';caption.dataset.zh=translated[0];caption.dataset.en=translated[1].split('出处：')[0].trim();caption.textContent=caption.dataset.zh;}
 figure.append(caption);
 if(htmlParts.length>1){node.innerHTML=htmlParts.slice(1).join('<br>');}else node.remove();
}
function grammarLocalizeSource(root,language){
 if(language!=='en')return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.grammar-pair,.grammar-ipa:not([data-source-has-han]),.grammar-gloss,[data-zh][data-en],script,style')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 let node;while((node=walker.nextNode())){
  const raw=node.nodeValue,key=raw.trim();if(!key)continue;
  let en=UI_TRANSLATIONS[key];
  if(!en){const numbered=key.match(/^(\d+(?:\.\d+)*\.?\s+)(.+)$/);if(numbered&&UI_TRANSLATIONS[numbered[2]])en=numbered[1]+UI_TRANSLATIONS[numbered[2]];}
  if(en)node.nodeValue=raw.slice(0,raw.indexOf(key))+en+raw.slice(raw.indexOf(key)+key.length);
  node.nodeValue=node.nodeValue.replace(/[。；，：（）、＋]/g,c=>({'。':'. ','；':'; ','，':', ','：':': ','（':'(', '）':')','、':', ','＋':' + '})[c]);
  if(node.nextSibling?.nodeType===1&&node.nextSibling.matches('a,strong,em,code')&&/[A-Za-z0-9’”),;:]$/.test(node.nodeValue))node.nodeValue+=' ';
  if(node.previousSibling?.nodeType===1&&node.previousSibling.matches('a,strong,em,code')&&/^[A-Za-z0-9‘“(]/.test(node.nodeValue))node.nodeValue=' '+node.nodeValue;
 }
}
function grammarBuildReferences(root,ch,language){
 const en=language==='en',definitions=new Map(),entries=[],byContent=new Map();let serial=0;
 const sourceParagraph=node=>node?.tagName==='P'&&/^(?:出处：|说明：|原有说明：|(?:Brassett\s*等|Brassett)[，,]|田志慧[，,]|向亮（|Liu（|Zhou（)/.test(node.textContent.trim());
 for(const note of root.querySelectorAll('details.grammar-reference')){
  const body=note.querySelector('p[id]');if(body)definitions.set(body.id,body.cloneNode(true));note.remove();
 }
 // Markdown hard breaks can leave an example and its source in one paragraph.
 for(const p of [...root.querySelectorAll('p')]){
  const parts=p.innerHTML.split(/<br\s*\/?>(?:\s*)/i);if(parts.length<2)continue;
  const sources=[],rest=[];
  for(const html of parts){const q=document.createElement('p');q.innerHTML=html;if(q.textContent.trim().startsWith('出处：'))sources.push(q);else rest.push(html);}
  if(sources.length){p.innerHTML=rest.join('<br>');let after=p;for(const q of sources){after.after(q);after=q;}}
 }
 // A separately printed original-source link belongs to the preceding citation.
 for(const p of [...root.querySelectorAll('p')]){
  const link=p.children.length===1&&p.firstElementChild;
  if(!link||link.tagName!=='A'||p.textContent.trim()!==link.textContent.trim()||!/^原(?:文|书)$/.test(link.textContent.trim())||!/^https?:/.test(link.href))continue;
  const previous=p.previousElementSibling;
  if(sourceParagraph(previous)){previous.append(' ',...p.childNodes);p.remove();}
 }
 function citation(body,oldId=''){
  const key=body.innerHTML.trim();let entry=byContent.get(key);
  if(!entry){entry={number:entries.length+1,body,aliases:[],refs:[]};entries.push(entry);byContent.set(key,entry);}
  if(oldId&&!entry.aliases.includes(oldId))entry.aliases.push(oldId);
  const target='grammar-note-'+ch.id+'-'+entry.number,a=document.createElement('a');
  a.className='grammar-citation';a.id='grammar-cite-'+ch.id+'-'+(++serial);a.href='#grammar/'+ch.dialect+'/'+ch.id+'?grammarAnchor='+target;a.dataset.footnoteTarget=target;
  a.textContent='['+entry.number+']';a.title=body.textContent.trim().replace(/^(?:出处：|Source:\s*)/,'');a.setAttribute('aria-label',(en?'Source ':'出处 ')+a.textContent+': '+a.title);entry.refs.push(a.id);return a;
 }
 // Source columns use the same numbered references as the running text.
 for(const table of root.querySelectorAll('table')){
  const headers=JSON.parse(table.dataset.originalHeaders||'[]');
  headers.forEach((header,column)=>{
   if(!/^(?:出处|词库记录|原文位置|原文页码与例号)$/.test(header))return;
   for(const row of table.querySelectorAll('tbody tr')){
    const cell=row.cells[column];if(!cell||!cell.textContent.trim())continue;
    const body=document.createElement('p');
    const prefix=header==='原文页码与例号'?'鲁曼等（2021），':header==='原文位置'?'Zhou（2020），':'';if(prefix){const label=document.createElement('span');label.textContent=prefix;body.append(label);}
    body.innerHTML+=cell.innerHTML;cell.replaceChildren(citation(body));
   }
  });
 }
 for(const node of [...root.querySelectorAll('p,a[href]')]){
  if(!root.contains(node)||node.closest('.grammar-footnotes'))continue;
  if(node.tagName==='A'&&node.getAttribute('href').startsWith('#fn-')){
   const oldId=node.getAttribute('href').slice(1),body=definitions.get(oldId);if(body)node.replaceWith(citation(body,oldId));
  }else if(sourceParagraph(node)){
   const sup=document.createElement('sup');sup.className='grammar-source-marker';sup.append(citation(node.cloneNode(true)));
   const previous=node.previousElementSibling;
   if(previous?.matches('p,figure,li')){(previous.querySelector('figcaption')||previous).append(' ',sup);node.remove();}else node.replaceWith(sup);
  }else if(node.tagName==='A'&&/^第[0-9].*页/.test(node.textContent.trim())&&/^https:/.test(node.href)){
   const body=document.createElement('p');if(node.href.includes('english.hnu.edu.cn'))body.append('鲁曼等（2021），');else if(node.href.includes('79jggwdzaghv6u4vpsh04nbnavmu'))body.append('Feng（2025），');body.append(node.cloneNode(true));const sup=document.createElement('sup');sup.append(citation(body));node.replaceWith(sup);
  }
 }
 if(!entries.length)return;
 const inReadingOrder=[];for(const a of root.querySelectorAll('.grammar-citation')){const entry=entries.find(e=>e.refs.includes(a.id));if(entry&&!inReadingOrder.includes(entry))inReadingOrder.push(entry);}
 entries.splice(0,entries.length,...inReadingOrder);entries.forEach((entry,index)=>{entry.number=index+1;for(const id of entry.refs){const a=root.querySelector('#'+id);a.textContent='['+entry.number+']';a.dataset.footnoteTarget='grammar-note-'+ch.id+'-'+entry.number;a.href='#grammar/'+ch.dialect+'/'+ch.id+'?grammarAnchor='+a.dataset.footnoteTarget;}});
 const details=document.createElement('details');details.className='grammar-footnotes';details.id='grammar-notes-'+ch.id;
 const summary=document.createElement('summary');summary.textContent=en?'Sources and notes':'出处与注释';details.append(summary);
 const list=document.createElement('ol');
 for(const entry of entries){
  const item=document.createElement('li');item.id='grammar-note-'+ch.id+'-'+entry.number;item.tabIndex=-1;
  for(const id of entry.aliases){const anchor=document.createElement('span');anchor.id=id;item.append(anchor);}
  entry.body.removeAttribute('id');item.append(entry.body);
  for(const [index,id] of entry.refs.entries()){
   const back=document.createElement('a');back.className='grammar-footnote-return';back.href='#grammar/'+ch.dialect+'/'+ch.id+'?grammarAnchor='+id;back.dataset.footnoteTarget=id;back.textContent=entry.refs.length===1?'↩':'↩'+(index+1);back.setAttribute('aria-label',en?'Back to citation':'返回引用处');item.append(back,' ');
  }
  list.append(item);
 }
 details.append(list);root.append(details);
}
document.addEventListener('click',event=>{
 const link=event.target.closest?.('[data-footnote-target]');if(!link)return;
 const target=document.getElementById(link.dataset.footnoteTarget);if(!target)return;
 event.preventDefault();event.stopPropagation();for(let n=target.parentElement;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;
 target.scrollIntoView({block:'start'});target.focus({preventScroll:true});
},true);
const grammarRenderedCache=new Map();
function grammarRenderHTML(ch,language=window.TujiaUI?.language||'zh'){
 const cacheKey=[ch.dialect,ch.id,language,spellingDisplay,southernDisplay,Object.keys(UI_TRANSLATIONS).length].join('/');
 if(grammarRenderedCache.has(cacheKey))return grammarRenderedCache.get(cacheKey);
 const root=document.createElement('div');root.className='reviewed-grammar integrated-grammar';root.dataset.referenceGrammar='';root.dataset.dialect=ch.dialect;root.dataset.chapter=ch.id;root.dataset.uiLanguage=language;root.dataset.uiContent='';root.lang=language==='en'?'en':'zh-CN';root.innerHTML=ch.html;
 let heading=0;for(const h of root.querySelectorAll('h3'))h.id='chapter-'+ch.id+'-'+heading++;
 for(const table of root.querySelectorAll('table')){
  const headers=[...table.querySelectorAll('thead th')].map(c=>c.textContent.trim());table.dataset.originalHeaders=JSON.stringify(headers);
  if(ch.id==='101'&&headers.includes('他砂词例（IPA）'))table.classList.add('grammar-tone-overview');
  // Inventory values already have a corresponding spelling column. Full-word
  // examples still need their own spelling when that column only names a segment.
  const separateSpelling=['101','201'].includes(ch.id)&&headers.some(h=>/拼音|拼写|白话字/.test(h));
  for(const row of table.querySelectorAll('tbody tr'))for(const [i,cell] of [...row.cells].entries()){
   if(/\p{Script=Han}/u.test(cell.textContent))cell.dataset.sourceHasHan='true';
   if(separateSpelling&&/IPA|音值|^(?:TS|拉西峒|XR仙仁|XL小龙热|CB|CJ)/.test(headers[i]||'')&&!/词例|读法/.test(headers[i]))cell.classList.add('grammar-ipa');
  }
 }
 // Standard interlinear tables already supply authoritative word boundaries.
 for(const table of [...root.querySelectorAll('table')]){
  const rows=[...table.rows].map(r=>[...r.cells].map(c=>c.textContent.trim()));
  const phon=rows.find(r=>r[0]==='IPA'),spell=rows.find(r=>r[0]==='拼音'),gloss=rows.find(r=>['逐词','中文逐词'].includes(r[0])),en=rows.find(r=>r[0]==='English');
  if(!phon||!spell||!gloss)continue;
  if(![spell,gloss,...(en?[en]:[])].every(r=>r.length===phon.length))throw Error('Unequal interlinear rows in '+ch.id);
  const figure=grammarExample(phon.slice(1),gloss.slice(1),ch.dialect,spell.slice(1),en?.slice(1));
  const next=table.nextElementSibling;table.replaceWith(figure);if(next?.textContent.trim().startsWith('译文：'))grammarMoveTranslation(figure,next);
 }
 // Earlier examples are IPA / gloss / translation paragraphs.
 for(const p of [...root.querySelectorAll('p')]){
  const match=p.textContent.trim().match(/^(\*?)\/([^/]+)\/$/);if(!match)continue;
  const gloss=p.nextElementSibling,translation=gloss?.nextElementSibling;
  if(gloss?.tagName!=='P'||translation?.tagName!=='P'||!/[｜＋]/.test(gloss.textContent))continue;
  const d=/泸溪|且己/.test(translation.textContent)?'south':ch.dialect;
  const aligned=grammarExampleWords(match[1]+match[2],gloss.textContent.trim());
  const figure=grammarExample(aligned.words,aligned.glosses,d);p.replaceWith(figure);gloss.remove();grammarMoveTranslation(figure,translation);
 }
 for(const n of root.querySelectorAll('[data-zh][data-en]'))n.textContent=n.dataset[language==='en'?'en':'zh'];
 grammarBuildReferences(root,ch,language);
 grammarLocalizeSource(root,language);
 // A source already has a superscript number; remove parentheses enclosing only it.
 for(const citation of root.querySelectorAll('.grammar-citation')){
  const marker=citation.parentElement.tagName==='SUP'?citation.parentElement:citation;
  const before=marker.previousSibling,after=marker.nextSibling;
  if(before?.nodeType!==Node.TEXT_NODE||after?.nodeType!==Node.TEXT_NODE)continue;
  const open=before.nodeValue.match(/([（(])\s*$/),close=after.nodeValue.match(/^\s*([）)])/);
  if(open&&close&&((open[1]==='（'&&close[1]==='）')||(open[1]==='('&&close[1]===')'))){
   before.nodeValue=before.nodeValue.slice(0,open.index);after.nodeValue=after.nodeValue.slice(close[0].length);
  }
 }
 for(const a of root.querySelectorAll('.grammar-citation')){const body=root.querySelector('#'+a.dataset.footnoteTarget+'>p');if(body){a.title=body.textContent.trim().replace(/^(?:出处：|Source:\s*)/,'');a.setAttribute('aria-label',(language==='en'?'Source ':'出处 ')+a.textContent+': '+a.title);}}
 // Pair every remaining phonetic word/phrase, including inline citations and tables.
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,.grammar-pair,.grammar-ipa,.grammar-gloss')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const nodes=[];let node;while((node=walker.nextNode()))nodes.push(node);
 const letters='a-z'+(ch.dialect==='south'?'E':'')+'ãẽĩõũỹɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥʰüɡ\u0300-\u036f';
 const token='['+letters+']+';
 const enclosed='['+letters+'¹²³⁴⁵0-9 \\t(){},、;*+＝=~～\\-]+';const pattern=new RegExp('(?<!['+letters+'¹²³⁴⁵])/(?<slashIPA>'+enclosed+')/(?!['+letters+'¹²³⁴⁵])|\\[('+enclosed+')\\]|'+token+'[¹²³⁴⁵]+(?:'+token+'[¹²³⁴⁵]+)*|'+token,'gu');
 for(const n of nodes){
  const raw=n.nodeValue,fr=document.createDocumentFragment();let pos=0,changed=false;
  for(const m of raw.matchAll(pattern)){
   const ipa=m[1]||m[2]||m[0],enclosedMatch=m[1]!==undefined||m[2]!==undefined;
   if(enclosedMatch&&!/[¹²³⁴⁵ɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥʰ\u0300-\u036f]/u.test(ipa)&&!ipa.split(/[ ,、;+~～]+/).every(s=>/^(?:p|b|t|d|k|g|m|n|l|s|z|f|h|w|j|r|ts|dz|i|u|y|e|o|a|ai|au|ei|ou|ia|ie|iu|ua|uo|ui|an|en|in|un|po|xu|kau|la|lu|lie|liau|te|ti|tiu|to|tso|ma|ta|ku|tau)$/.test(s)))continue;
   if(!enclosedMatch&&!/[¹²³⁴⁵ɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥʰ\u0303\u0329]/u.test(ipa))continue;
   if(!/[a-zãẽĩõũỹɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥ]/u.test(ipa))continue;
   // Uppercase labels are excluded, except for the source vowel notation E.
   let d=ch.dialect;
   if(ipa.includes('ʕɯ')&&/ŋo/.test(ipa))d='south';
   if(enclosedMatch){try{grammarSpelling(ipa,d);}catch{continue;}}
   fr.append(raw.slice(pos,m.index));
   fr.append(grammarPairElement(ipa,d,'',enclosedMatch?m[0][0]:''));pos=m.index+m[0].length;changed=true;
  }
  if(changed){fr.append(raw.slice(pos));n.replaceWith(fr);}
 }
 // A source label directly before IPA is already supplied by the switchable
 // pair. This occurs in prose as well as tables; do not remove separate pairs
 // in genuine repeated words or examples.
 for(const pair of root.querySelectorAll('.grammar-pair')){
  const forms=pair.querySelector('.grammar-spelling').dataset;
  const known=new Set([forms.ye,forms.accent,forms.poj].filter(Boolean).map(x=>x.normalize('NFC')));
  let before=pair.previousSibling;
  if(before?.nodeType===Node.TEXT_NODE){
   const match=before.nodeValue.match(/([\p{Script=Latin}\p{M}]+)(\s*(?:\(\s*)?)$/u);
   // In prose, only remove explicit onset labels. An English preposition
   // such as "in" before /ĩ/ must not be mistaken for its spelling.
   if(match&&known.has(match[1].normalize('NFC'))&&(pair.closest('td,th')||['ng','hx','r'].includes(match[1])))before.nodeValue=before.nodeValue.slice(0,match.index)+match[2];
  }else if(before?.matches?.('.grammar-spelling')&&known.has(before.textContent.trim().normalize('NFC')))before.remove();
 }
 // Romanization-only paradigms share the same display selector.
 if(ch.dialect==='north'){
  const accepted=new Set(GRAMMAR_YE_FORMS),w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.grammar-pair,.grammar-ipa,.grammar-gloss,.grammar-spelling,script,style')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const texts=[];let t;while((t=w.nextNode()))texts.push(t);
  // Unmarked /aze/ is spelled "are"; English prose also uses this word.
  // Explicit interlinear spellings are rendered separately above.
  if(language==='en')accepted.delete('are');
  const labels={niexi:{ye:'niexxi',accent:'niēxi'},gaxica:{ye:'ga-xi ca',accent:'ga-xi ca'},gaci:{ye:'ga-ci',accent:'ga-ci'}};
  for(const n of texts){let end=0,frag=document.createDocumentFragment();for(const m of n.nodeValue.matchAll(/\b[a-z]+\b/g)){if(!accepted.has(m[0])&&!labels[m[0]])continue;const span=document.createElement('span');span.className='grammar-spelling';span.dataset.uiContent='';span.dataset.ye=labels[m[0]]?.ye||m[0].replace(/^angf/,'anf').replace(/^angx/,'anx');span.dataset.accent=labels[m[0]]?.accent||yeToAccent(span.dataset.ye);span.textContent=grammarDisplayedSpelling(span.dataset,'north');frag.append(n.nodeValue.slice(end,m.index),span);end=m.index+m[0].length;}if(end){frag.append(n.nodeValue.slice(end));n.replaceWith(frag);}}
 }
 // Bare onset/rime inventory cells also receive their matching romanization.
 for(const table of root.querySelectorAll('table')){
  const headers=JSON.parse(table.dataset.originalHeaders||'[]');delete table.dataset.originalHeaders;
  if(headers[0]==='问什么'&&headers[1]?.includes('形式'))table.classList.add('grammar-question-forms');
  for(const row of table.querySelectorAll('tbody tr'))for(let i=0;i<row.cells.length;i++){
   const cell=row.cells[i],header=headers[i]||'',raw=cell.textContent.trim();
   if(!raw||raw==='—'||cell.classList.contains('grammar-ipa'))continue;
   const phoneticHeader=/IPA|声母|韵母|唇部|齿|腭部|软腭|咽|^(?:TS|拉西峒|XR仙仁|XL小龙热|CB|CJ)|音值|符号/.test(header)&&!/叶氏|词例（叶氏）|出现条件|汉义|说明/.test(header);
   if(!['101','201'].includes(ch.id)||!phoneticHeader||cell.dataset.sourceHasHan)continue;
   const w=document.createTreeWalker(cell,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.grammar-pair')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const remaining=[];let t;while((t=w.nextNode()))remaining.push(t);
   for(const n of remaining){const original=n.nodeValue,frag=document.createDocumentFragment();let end=0;
    for(const m of original.matchAll(new RegExp('[A-Z'+letters+']+','gu'))){if(/[A-Z]/.test(m[0]))continue;frag.append(original.slice(end,m.index),grammarPairElement(m[0],ch.dialect));end=m.index+m[0].length;}
    if(end){frag.append(original.slice(end));n.replaceWith(frag);}
   }
  }
  const wrap=document.createElement('div');wrap.className='grammar-table-scroll';wrap.tabIndex=0;table.replaceWith(wrap);wrap.append(table);
 }
 // Prose reads on one line; source tables and interlinear examples remain stacked.
 const inProse=node=>!node.closest('table,figure,.grammar-example,.example,.grammar-formula');
 for(const pair of root.querySelectorAll('.grammar-pair')){
  if(!inProse(pair))continue;
  pair.classList.add('grammar-pair-inline');
  pair.querySelector('.grammar-spelling').after(document.createTextNode(' '));
  const ipa=pair.querySelector('.grammar-ipa');
  if(!/^[\/\[]/.test(ipa.textContent))ipa.textContent='/'+ipa.textContent+'/';
 }
 for(const spelling of root.querySelectorAll('.grammar-spelling')){
  if(!spelling.closest('.grammar-pair')&&inProse(spelling))spelling.classList.add('grammar-spelling-inline');
 }
 for(const note of root.querySelectorAll('sup')){
  if(note.querySelector('.grammar-citation')&&inProse(note))note.classList.add('grammar-inline-citation');
 }
 for(const link of root.querySelectorAll('a[href^="#"]')){
  const target=link.getAttribute('href').slice(1),where=GRAMMAR_ANCHORS[target];if(where)link.href='#grammar/'+where.dialect+'/'+where.chapter+'?grammarAnchor='+encodeURIComponent(target);
 }
 const html=root.outerHTML;if(grammarRenderedCache.size>=48)grammarRenderedCache.delete(grammarRenderedCache.keys().next().value);grammarRenderedCache.set(cacheKey,html);return html;
}
grammarView=function(){
 const d=state.grammarDialect||'north',gs=REVIEWED_GRAMMAR[d],ch=gs.find(c=>c.id===state.chapter)||gs[0];
 const term=state.q?.trim(),found=term?gs.filter(c=>contains(c.title+' '+c.html.replace(/<[^>]*>/g,' '),term)):[];
 const button=c=>`<button data-chapter="${c.id}" data-grammar-dialect="${d}" class="${c.id===ch.id?'selected ':''}${c.pending?'grammar-pending':''}" >${c.number}. <span>${E(c.title)}</span>${c.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</button>`;
 return pageHeader('grammar')+grammarSwitch()+search('在本套语法中检索规则、章节与例句…')+`<div class="grammar-layout"><nav class="grammar-toc" aria-label="语法目录">${gs.map(button).join('')}</nav><article class="grammar-article">${term?'<h1>检索结果</h1>'+found.map(button).join(''):grammarChapter(ch)}</article></div>`;
};
grammarChapter=function(ch){
 const gs=REVIEWED_GRAMMAR[ch.dialect],index=gs.indexOf(ch),parts=ch.sections;
 return `<h1 class="${ch.pending?'grammar-pending':''}">${ch.number}. <span>${E(ch.title)}</span>${ch.pending?'<span class="grammar-pending-label">（待补充）</span>':''}</h1>`+
 (parts.length?'<nav class="grammar-section-links" aria-label="本章目录">'+parts.map((s,i)=>`<a href="#grammar/${ch.dialect}/${ch.id}?grammarAnchor=chapter-${ch.id}-${i}">${s.id.split('.').slice(1).join('.')}. <span>${E(s.title)}</span></a>`).join('')+'</nav>':'')+
 grammarRenderHTML(ch)+
 `<div class="chapter-pagination">${[[-1,'← 上一章'],[1,'下一章 →']].map(([step,label])=>gs[index+step]?`<button data-chapter="${gs[index+step].id}" data-grammar-dialect="${ch.dialect}">${label}</button>`:'').join('')}</div>`;
};
window.ReviewedGrammar={refresh(){
 const language=window.TujiaUI?.language||'zh',en=language==='en';
 const position=document.querySelector('.grammar-page-position');
 if(position){const values=position.textContent.match(/\d+/g);if(values?.length===2)position.textContent=en?'Page '+values[0]+' of '+values[1]:'第 '+values[0]+' / '+values[1]+' 页';}
 for(const root of document.querySelectorAll('.reviewed-grammar')){
  if(root.dataset.uiLanguage===language)continue;
  const ch=REVIEWED_GRAMMAR[root.dataset.dialect].find(c=>c.id===root.dataset.chapter);if(!ch)continue;
  const opened=[...root.querySelectorAll('details')].map(n=>n.open),holder=document.createElement('template');holder.innerHTML=root.dataset.readingPage==='true'?grammarPageHTML(ch,root.dataset.section,language):grammarRenderHTML(ch,language);
  const replacement=holder.content.firstElementChild;[...replacement.querySelectorAll('details')].forEach((n,i)=>n.open=opened[i]||false);root.replaceWith(replacement);
 }
 for(const n of document.querySelectorAll('.reviewed-grammar .grammar-spelling')){const d=n.closest('[data-dialect]').dataset.dialect,value=n.closest('[data-spelling-pending]')?(en?'(spelling pending)':'（拼音待补充）'):grammarDisplayedSpelling(n.dataset,d);if(n.textContent!==value)n.textContent=value;}
}};
