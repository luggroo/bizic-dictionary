/* Reading order, aligned examples and switchable spelling for the reviewed grammar. */
for(const d of ['north','south']){
 DIALECT_GRAMMARS[d]=REVIEWED_GRAMMAR[d];
 for(const ch of REVIEWED_GRAMMAR[d])for(const sec of ch.sections)grammarBlocks(d)[sec.id]={integratedHtml:ch.html};
}
function normalizeGrammarChapter(id,d){return REVIEWED_GRAMMAR[d].some(c=>c.id===id)?id:GRAMMAR_LEGACY_CHAPTERS[d][id]||REVIEWED_GRAMMAR[d][0].id;}
const GRAMMAR_JOINED_WORDS=['tɕĩ⁴⁴ xʊa⁴⁴','sa⁴⁴ mi⁴⁴','nie²⁴ pi⁴⁴','pa⁵⁵ pa⁵⁵','ta⁵¹ pʰi²¹','pʰa²¹ pʰu³⁵','tɕʰi³⁵ pu⁵⁵','doŋ²¹ dzian²¹','ɕi³³ ti²¹','a²¹ pa⁵⁵','a⁵⁵ tiu⁵⁵','a⁵⁵ lu²¹','tɕʰie²¹ pi²⁴'];
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
function grammarPairElement(ipa,d,ye=''){
 const pending=d==='south'&&/^(?:i|y)?æ̃$/.test(ipa);
 const pair=pending?{accent:'（拼音待补充）',poj:'（拼音待补充）'}:grammarSpelling(ipa,d,ye),span=document.createElement('span');
 if(pending)span.dataset.spellingPending='true';
 span.className='grammar-pair'+(pending?' grammar-pending':'');span.dataset.ipa=ipa;span.dataset.dialect=d;span.dataset.uiContent='';
 const roman=document.createElement('span');roman.className='grammar-spelling';roman.lang=d==='south'?'tjs':'tji';
 for(const [key,value] of Object.entries(pair))roman.dataset[key]=value;
 roman.textContent=grammarDisplayedSpelling(pair,d);
 const phonetic=document.createElement('span');phonetic.className='grammar-ipa';phonetic.textContent=ipa;
 span.append(roman,phonetic);return span;
}
function grammarExample(ipa,glosses,d,pinyin=[],english=[]){
 const figure=document.createElement('figure');figure.className='grammar-interlinear';figure.dataset.dialect=d;
 const line=document.createElement('div');line.className='grammar-word-line';
 ipa.forEach((raw,i)=>{
  const word=document.createElement('span');word.className='grammar-word';word.append(grammarPairElement(raw,d,pinyin[i]||''));
  const gloss=document.createElement('span');gloss.className='grammar-gloss';gloss.dataset.uiContent='';gloss.dataset.zh=glosses[i]||'';gloss.dataset.en=english[i]||grammarGlossEnglish(glosses[i]||'');gloss.textContent=gloss.dataset.zh;word.append(gloss);line.append(word);
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
function grammarRenderHTML(ch){
 const root=document.createElement('div');root.className='reviewed-grammar integrated-grammar';root.dataset.referenceGrammar='';root.dataset.dialect=ch.dialect;root.innerHTML=ch.html;
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
 // Pair every remaining phonetic word/phrase, including inline citations and tables.
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('script,style,.grammar-pair,.grammar-gloss')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
 const nodes=[];let node;while((node=walker.nextNode()))nodes.push(node);
 const letters='a-zɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥʰüɡ\u0300-\u036f';
 const token='['+letters+']+';
 const pattern=new RegExp('[/\\[](['+letters+'¹²³⁴⁵0-9 \\t\\[\\](){},;*+＝=~～\\-]+)[/\\]]|'+token+'[¹²³⁴⁵]+(?:'+token+'[¹²³⁴⁵]+)*|'+token,'gu');
 for(const n of nodes){
  const raw=n.nodeValue,fr=document.createDocumentFragment();let pos=0,changed=false;
  for(const m of raw.matchAll(pattern)){
   const ipa=m[1]||m[0];
   if(m[0].startsWith('[')&&/^[a-z ]+$/.test(ipa)&&ipa.includes(' '))continue;
   if(!m[1]&&!/[¹²³⁴⁵ɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥʰ\u0303\u0329]/u.test(ipa))continue;
   if(!/[a-zɑɒæɐɔɤɛəɜɪʊɨɯɿʅɲȵŋɣʁɕʑʔʕħʦʨǳʣʥ]/u.test(ipa))continue;
   // Non-IPA Latin labels such as /CONTENTS/ are excluded by the lowercase pattern.
   fr.append(raw.slice(pos,m.index));
   let d=ch.dialect;
   if(ipa.includes('ʕɯ')&&/ŋo/.test(ipa))d='south';
   fr.append(grammarPairElement(ipa,d));pos=m.index+m[0].length;changed=true;
  }
  if(changed){fr.append(raw.slice(pos));n.replaceWith(fr);}
 }
 // Romanization-only paradigms share the same display selector.
 if(ch.dialect==='north'){
  const accepted=new Set(GRAMMAR_YE_FORMS),w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.grammar-pair,.grammar-gloss,.grammar-spelling,script,style')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const texts=[];let t;while((t=w.nextNode()))texts.push(t);
  for(const n of texts){let end=0,frag=document.createDocumentFragment();for(const m of n.nodeValue.matchAll(/\b[a-z]+\b/g)){if(!accepted.has(m[0]))continue;const span=document.createElement('span');span.className='grammar-spelling';span.dataset.uiContent='';span.dataset.ye=m[0].replace(/^angf/,'anf').replace(/^angx/,'anx');span.dataset.accent=yeToAccent(span.dataset.ye);span.textContent=grammarDisplayedSpelling(span.dataset,'north');frag.append(n.nodeValue.slice(end,m.index),span);end=m.index+m[0].length;}if(end){frag.append(n.nodeValue.slice(end));n.replaceWith(frag);}}
 }
 // Bare onset/rime inventory cells also receive their matching romanization.
 for(const table of root.querySelectorAll('table')){
  const headers=[...table.querySelectorAll('thead th')].map(c=>c.textContent.trim());
  for(const row of table.querySelectorAll('tbody tr'))for(let i=0;i<row.cells.length;i++){
   const cell=row.cells[i],header=headers[i]||'',raw=cell.textContent.trim();
   if(!raw||raw==='—')continue;
   const phoneticHeader=/IPA|声母|韵母|唇部|齿|腭部|软腭|咽|^(?:TS|拉西峒|XR仙仁|XL小龙热|CB|CJ)|音值|符号/.test(header)&&!/叶氏|词例（叶氏）|出现条件|汉义|说明/.test(header);
   if(!['101','201'].includes(ch.id)||!phoneticHeader||/\p{Script=Han}/u.test(raw))continue;
   const w=document.createTreeWalker(cell,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.grammar-pair')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const remaining=[];let t;while((t=w.nextNode()))remaining.push(t);
   for(const n of remaining){const original=n.nodeValue,frag=document.createDocumentFragment();let end=0;
    for(const m of original.matchAll(new RegExp('[A-Z'+letters+']+','gu'))){if(/[A-Z]/.test(m[0]))continue;frag.append(original.slice(end,m.index),grammarPairElement(m[0],ch.dialect));end=m.index+m[0].length;}
    if(end){frag.append(original.slice(end));n.replaceWith(frag);}
   }
  }
  const wrap=document.createElement('div');wrap.className='grammar-table-scroll';wrap.tabIndex=0;table.replaceWith(wrap);wrap.append(table);
 }
 for(const link of root.querySelectorAll('a[href^="#"]')){
  const target=link.getAttribute('href').slice(1),where=GRAMMAR_ANCHORS[target];if(where)link.href='#grammar/'+where.dialect+'/'+where.chapter+'?grammarAnchor='+encodeURIComponent(target);
 }
 return root.outerHTML;
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
 grammarRenderHTML(ch).replace(/<h3>/g,(()=>{let i=0;return()=>`<h3 id="chapter-${ch.id}-${i++}">`;})())+
 `<div class="chapter-pagination">${[[-1,'← 上一章'],[1,'下一章 →']].map(([step,label])=>gs[index+step]?`<button data-chapter="${gs[index+step].id}" data-grammar-dialect="${ch.dialect}">${label}</button>`:'').join('')}</div>`;
};
window.ReviewedGrammar={refresh(){
 const en=window.TujiaUI?.language==='en';
 for(const n of document.querySelectorAll('.reviewed-grammar [data-zh][data-en]')){const value=n.dataset[en?'en':'zh'];if(n.textContent!==value)n.textContent=value;}
 for(const n of document.querySelectorAll('.reviewed-grammar .grammar-spelling')){const d=n.closest('[data-dialect]').dataset.dialect,value=n.closest('[data-spelling-pending]')?(en?'(spelling pending)':'（拼音待补充）'):grammarDisplayedSpelling(n.dataset,d);if(n.textContent!==value)n.textContent=value;}
}};
