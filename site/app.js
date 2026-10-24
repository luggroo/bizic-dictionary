'use strict';
let D, S, W, C, R;
const $=s=>document.querySelector(s), E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
const searchNormalize=s=>normalize(s).normalize('NFD').replace(/[\u0300\u0301\u0302\u0304\u030c\u0331]/g,'').replace(/a\u0308/g,'a').normalize('NFC').replace(/v/g,'ü').replace(/ı/g,'i').replace(/[ʔ‘’ʼʻʹ′]/g,"'");
const contains=(s,q)=>searchNormalize(s).includes(searchNormalize(q));
const DEFAULT_STATE={view:'home',q:'',scheme:'',pos:'',topic:'',dialect:'',kind:'',status:'',genre:'',collection:'',category:'',sourceFilter:'',dataset:'',priority:'',batch:'',chapter:'1',grammarAnchor:'',grammarSection:'',grammarDialect:'north',grammarSourceScope:'',page:1,exact:false,hideWholeLoans:false,searchLanguage:'',browseWords:false,corpusCollection:''};
let state={...DEFAULT_STATE}, currentDetail=null,currentOverlay=null;
const titles={notation:'记音对应与补全',home:'知识总览',words:'词汇检索',topics:'语法与专题',corpus:'例句语料',sources:'全部文献',history:'历史比较',grammar:'参考语法'};
const descriptions={notation:'',words:'',topics:'按主题浏览研究文献。',corpus:'阅读故事、民歌与日常对话。',sources:'',history:'比较各方言的词形与历史重建。',grammar:''};
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',2400)}
function pill(t,w=false){return `<span class="pill${w?' warn':''}">${E(t)}</span>`}
function opts(values,current,all){return `<option value="">${E(all)}</option>`+[...new Set(values)].filter(Boolean).sort((a,b)=>a.localeCompare(b,'zh')).map(x=>`<option ${x===current?'selected':''} value="${E(x)}">${E(x)}</option>`).join('')}
function select(key,values,label){return `<select data-filter="${key}" aria-label="${E(label)}">${opts(values,state[key],label)}</select>`}
function search(placeholder='搜索词形、中文、英语…'){
 const dictionary=state.view==='words';
 return `<form class="searchbar" id="search-form">${dictionary?'':'<span aria-hidden="true">⌕</span>'}<input id="query" aria-label="搜索" value="${E(state.q)}" placeholder="${placeholder}" autocomplete="off">${dictionary?`<button type="submit" class="search-all" data-search-all>${searchIcon()}<span class="search-language-label"><span>全部搜索</span><small class="tujia-ui" data-ui-tujia="search" lang="tji"></small></span></button>`:'<button type="submit">搜索</button>'}</form>`;
}
function pageHeader(view){return `<div class="eyebrow"><span class="tujia-ui" data-ui-tujia="${view==='topics'?'sources':view}" lang="tji"></span></div><h1>${titles[view]}</h1>${descriptions[view]?`<p class="sub">${descriptions[view]}</p>`:''}`}
function snippet(text,q,n=150){let idx=String(text).toLowerCase().indexOf(String(q).toLowerCase());if(idx<0)idx=0;const start=Math.max(0,idx-45);return (start?'…':'')+E(text.slice(start,start+n))+(start+n<text.length?'…':'')}
function sourceRows(items,limit=items.length){return items.slice(0,limit).map(s=>`<article class="source-row"><div class="filetype">${E(s.title.split('.').pop().toUpperCase().slice(0,5))}</div><div class="grow"><h3><button class="card-title" data-open="${s.id}">${E(s.title)}</button></h3><div class="chips">${pill(s.dialect)}${s.topics.slice(0,3).map(t=>pill(t)).join('')}${pill(s.status,s.status.includes('待'))}</div><div class="tiny" style="margin-top:7px">${E(s.path)}${s.locations.length?' · '+E(s.locations.join(' / ')):''}</div>${state.q&&contains(s.text,state.q)?`<p class="snippet">${s.recognition?.allowAutomaticExcerpts===false?'检索命中'+E(matchedPageLabel(s,state.q))+'；音标请参照原页。':'正文命中'+E(matchedPageLabel(s,state.q))+'：'+snippet(s.text,state.q)}</p>`:''}</div></article>`).join('')}
function topicCards(topics){return `<div class="grid">${topics.map((t,i)=>`<article class="card"><span class="num">${String(i+1).padStart(2,'0')} / RESEARCH TOPIC</span><button class="card-title" data-topic="${E(t.name)}">${E(t.name)} →</button><p style="margin-top:10px">${E(t.summary)}</p><div class="card-foot"><span>${t.sources.length} 份相关资料</span><button data-topic="${E(t.name)}">浏览文献 ↗</button></div></article>`).join('')}</div>`}
function corpusMetadataLabels(values){return values.filter(Boolean).map(value=>`<span>${E(value)}</span>`).join(' · ')}
function corpusCards(items){return `<div class="grid corpus-grid">${items.map(c=>`<article class="card corpus-card"><div class="row"><span class="num grow">${corpusMetadataLabels([...(c.locations||[]),c.genre])}</span></div><button class="corpus-card-content" data-open="${E(c.id)}" aria-label="阅读：${E(c.title)}"><span class="card-title">${E(c.title)}</span>${c.survey?`<span class="survey-ipa">/${E(c.ipa)}/</span>`:''}<span class="tiny">阅读 →</span></button>${S[c.audio]?.media?`<audio controls preload="none" hidden data-media-src="${E(S[c.audio].media)}" aria-label="${E(c.title)}录音"></audio>`:''}</article>`).join('')}</div>`}

function overview(){return `<section class="hero"><h1>知识总览</h1><p class="sub">查词、读语法、看语料。</p>${search('词形、汉语、英语或研究主题…')}<div class="chips">${['水','否定','他砂','哭嫁歌'].map(x=>`<button data-query="${x}">${x}</button>`).join('')}</div></section><div class="metrics"><a class="metric" href="#words" data-view="words"><b>${D.words.length.toLocaleString()}</b><span>词条</span></a><a class="metric" href="#sources" data-view="sources"><b>${D.sources.length}</b><span>文献</span></a><a class="metric" href="#corpus" data-view="corpus"><b>${D.corpus.length}</b><span>语料</span></a></div><div class="section-head"><h2>参考语法</h2></div>${grammarEntryCards()}<div class="section-head"><h2>读土家语</h2><button data-view="corpus">全部语料 →</button></div>${corpusCards(D.corpus.filter(c=>['1.1','3.2','6.3'].includes(c.code)))}` }

function removeExcludedSource(data){
 const id='1a5k-8h7ZWLI2nZtJGIec5JWSznl4e9Tk';
 data.sources=data.sources.filter(s=>s.id!==id);
 data.sourceVariants=(data.sourceVariants||[]).filter(s=>s.id!==id);
 data.words=data.words.filter(w=>!w.attestations.every(a=>a.source===id));
 const remaining=new Set(data.words.map(w=>w.id));
 data.wordAliases=Object.fromEntries(Object.entries(data.wordAliases||{}).filter(([old,target])=>remaining.has(target)));
 NOTATION_CONFIG.profiles=NOTATION_CONFIG.profiles.filter(p=>p.id!==id&&p.source!==id);
}
function canonicalSource(id){return D.sourceAliases?.[id]||id}
const displayedAttestationsCache=new WeakMap();
function displayedAttestations(w){
 if(displayedAttestationsCache.has(w))return displayedAttestationsCache.get(w);
 const key=a=>JSON.stringify([canonicalSource(a.source),plainTones(a.term).normalize('NFKC').replace(/\s+/g,'').toLowerCase(),(a.en||'').trim()]);
 const stedt=new Set(w.attestations.filter(a=>a.collection==='STEDT').map(key));
 const rows=w.attestations.filter(a=>a.collection!=='Drive 词表'||!stedt.has(key(a)));
 displayedAttestationsCache.set(w,rows);return rows;
}
function wordSources(w){return [...new Set((w.sourceIds||[w.source]).map(canonicalSource))]}
function wordForms(w){return [...(typeof reviewedSpelling==='function'?notationValues(w,'ye').flatMap(v=>[reviewedSpelling(w,v.text,'ye'),reviewedSpelling(w,accentForNotation(w,v),'accent')]):[]),...(isSouthernWord(w)?southernNotationValues(w).flatMap(v=>[v.accent,v.poj]):[]),...(w.forms||[w.term]),...Object.keys(NOTATION_LABELS).flatMap(k=>notationValues(w,k).map(x=>x.text)),...notationValues(w,'ye').map(v=>accentForNotation(w,v))]}
function wordSearchText(w){return [...wordForms(w),w.zh,...(w.glosses||[w.en]),w.alt].join(' ')}
function wordSourceGroups(w){
 const groups=new Map();
 for(const a of w.attestations){
  const id=canonicalSource(a.source);
  if(!groups.has(id))groups.set(id,{id,records:new Map()});
  const key=JSON.stringify([plainTones(a.term).normalize('NFKC').replace(/\s+/g,'').toLowerCase(),(a.en||'').trim()]);
  const records=groups.get(id).records;
  if(!records.has(key))records.set(key,{term:a.term,en:a.en,translations:new Set(),locations:new Set(),notes:new Set()});
  const r=records.get(key);if(a.zh)r.translations.add(a.zh);if(a.locator)r.locations.add(a.locator);if(a.toneReview)r.notes.add(a.toneReview);if(a.parserCorrection)r.notes.add(a.parserCorrection);
 }
 return [...groups.values()].map(g=>({...g,records:[...g.records.values()]}));
}
function dictionaryProvenance(w){return wordSourceGroups(w).map(g=>`<article class="card" style="margin:10px 0"><button class="card-title" data-open="${g.id}">${E(S[g.id].title)}</button>${g.records.map(r=>`<div class="source-word-record"><b class="word">${E(phon(r.term))}</b><p data-ui-content>${[...r.translations].map(E).join('；')}<br><span class="tiny">${E(r.en)}</span></p>${r.locations.size?`<details><summary>文献定位</summary><p class="tiny">${[...r.locations].map(E).join('<br>')}</p></details>`:''}${[...r.notes].map(n=>`<p class="notice warn">${E(n)}</p>`).join('')}</div>`).join('')}${sourceLink(g.id)}</article>`).join('')}


// Separate indices prevent short spelling queries from matching inside English words.
const wordSearchIndex=new WeakMap();
const englishTokens=s=>normalize(s).match(/[a-z]+(?:'[a-z]+)?/g)||[];
function searchableEnglish(value){
 const text=String(value),noteStart=/^\(\s*(?:note\s*:|the\s+source\s+word\s+['"‘“]|(?:(?:original(?:\s+stedt)?|source|the)\s+)?english\s+['"‘“])/i;
 let output='';
 for(let i=0;i<text.length;){
  if(text[i]==='('&&noteStart.test(text.slice(i))){
   let depth=0;
   do{if(text[i]==='(')depth++;else if(text[i]===')')depth--;i++}while(i<text.length&&depth);
   output+=' ';
  }else output+=text[i++];
 }
 return output;
}
function indexedWord(w){
 if(w._search){if(Array.isArray(w._search.englishWords))w._search.englishWords=new Set(w._search.englishWords);return w._search;}
 if(wordSearchIndex.has(w))return wordSearchIndex.get(w);
 const rawForms=wordForms(w).filter(Boolean);
 const forms=[...new Set(rawForms.map(searchNormalize))];
 const chinese=[w.zh,...(w.zhVariants||[])].filter(Boolean).flatMap(s=>s.split(/[;；/／]/)).map(normalize);
 const english=[w.en,...(w.glosses||[])].filter(Boolean).flatMap(s=>searchableEnglish(s).split(/[;；/／]/)).map(normalize);
 const index={forms,hasGlottal:rawForms.some(f=>f.includes('ʔ')),chinese,english,englishWords:new Set(english.flatMap(englishTokens))};wordSearchIndex.set(w,index);return index;
}
function wordSearchScore(w,language=state.searchLanguage){
 const raw=state.q.trim();if(!raw)return 1;
 const index=indexedWord(w),lang=language||'',q=searchNormalize(raw),normal=normalize(raw);let score=0;
 // A bare apostrophe searches the recorded consonant, not spelling separators or English punctuation.
 if(q==="'")return !state.exact&&(!lang||lang==='tujia')&&index.hasGlottal?80:0;
 if(!lang||lang==='tujia'){
  const quoted=q.includes("'"),compact=t=>t.replace(quoted?/[\s\-]/g:/[\s'\-]/g,'');
  const compactQuery=compact(q);
  if(index.forms.some(f=>f===q||(compactQuery&&compact(f)===compactQuery)))score=100;
  if(!state.exact&&!score){
   if(index.forms.some(f=>f.split(quoted?/[\s\-0-9]+/:/[\s'\-0-9]+/).includes(q)))score=80;
   else if(q.length>=2&&index.forms.some(f=>f.startsWith(q)))score=50;
   else if(q.length>=2&&index.forms.some(f=>f.includes(q)))score=40;
  }
 }
 if(!lang||lang==='zh'){
  if(index.chinese.includes(normal))score=Math.max(score,100);
  else if(!state.exact&&/\p{Script=Han}/u.test(normal)&&index.chinese.some(f=>f.includes(normal)))score=Math.max(score,60);
 }
 if(!lang||lang==='en'){
  if(index.english.includes(normal))score=Math.max(score,100);
  else if(!state.exact){const tokens=englishTokens(raw);if(tokens.length&&tokens.every(t=>index.englishWords.has(t)))score=Math.max(score,70);}
 }
 return score;
}
function searchIcon(){return '<svg class="search-language-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>'}
// The form's first submit button searches every language, including on Enter.
// These separate actions submit the current input within a single language.
function languageSearchButtons(){return `<div class="search-languages" role="group" aria-label="搜索语言">${[['tujia','只逻土话','searchTujia'],['zh','只逻客话','searchZh'],['en','只逻英语','searchEn']].map(([v,t,key])=>`<button type="submit" form="search-form" data-search-language="${v}">${searchIcon()}<span class="search-language-label"><span>${t}</span><small class="tujia-ui" data-ui-tujia="${key}" lang="tji"></small></span></button>`).join('')}</div>`}
function searchScopeLabel(){return {tujia:'搜索范围：土话',zh:'搜索范围：客话',en:'搜索范围：英语'}[state.searchLanguage]||'搜索范围：土话、客话、英语'}
function rankedWords(items,language=state.searchLanguage){return items.map(w=>({w,score:wordSearchScore(w,language)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).map(x=>x.w)}

function wordMatches(w){return (!state.hideWholeLoans||modernChineseLoanInfo(w).scope!=='whole')&&wordSearchScore(w)>0&&(!state.scheme||w.schemes.includes(state.scheme))&&(!state.pos||WordClasses.matches(w,state.pos))&&dialectMatches(w)&&(!state.category||wordSemanticCategories(w).includes(state.category))&&(!state.sourceFilter||wordSources(w).includes(canonicalSource(state.sourceFilter)))}
function sourceMatches(s){return (!state.grammarSourceScope||s.grammarScope===state.grammarSourceScope)&&(!state.batch||!!s.recognition)&&(!state.priority||(state.priority==='全部待解析'?!!s.parsePriority:s.parsePriority?.tier===state.priority))&&(!state.q||contains(s.title+' '+(s.variantSearch||'')+' '+s.path+' '+s.text,state.q))&&(!state.topic||s.topics.includes(state.topic))&&dialectMatches(s)&&(!state.kind||s.kind===state.kind)&&(!state.status||s.status===state.status)}
function pager(n){const pages=Math.max(1,Math.ceil(n/40));state.page=Math.min(state.page,pages);return `<div class="pager"><button data-page="${state.page-1}" ${state.page<=1?'disabled':''}>← 上一页</button><span>${state.page} / ${pages}</span><button data-page="${state.page+1}" ${state.page>=pages?'disabled':''}>下一页 →</button></div>`}
function wordTable(items){return `<div class="word-grid">${items.map(w=>`<article class="word-card"><button class="word-card-content" data-open="${w.id}" aria-label="${E(w.zh||w.en)}，查看词条${modernChineseLoanAccessibleSuffix(w)}"><span class="word-card-heading">${wordCardNotation(w)}</span><span class="word-card-definition"><span class="word-card-meaning" data-ui-content>${E(w.zh||'')}${w.en?`<span class="${w.zh?'tiny ':''}word-card-english" lang="en">${WordClasses.inline(w)?WordClasses.inline(w)+' ':''}${E(w.en)}</span>`:''}</span><span class="word-card-dialect">${wordVarietyPill(w)}${modernChineseLoanBadge(w)}${!wordIPA(w).length?'<span class="tiny">IPA 待校核</span>':''}</span></span></button></article>`).join('')}</div>`}


let randomWordSelection={key:'',ids:[]};
function randomWordItems(items,refresh=false){
 const key=JSON.stringify([state.dialect,state.pos,state.category,state.sourceFilter,state.scheme,state.hideWholeLoans]);
 const byId=new Map(items.map(w=>[w.id,w]));
 if(!refresh&&randomWordSelection.key===key&&randomWordSelection.ids.length&&randomWordSelection.ids.every(id=>byId.has(id)))return randomWordSelection.ids.map(id=>byId.get(id));
 const previous=new Set(randomWordSelection.ids),seen=new Set();
 const eligible=items.filter(w=>{
  if(!String(w.zh||w.en||'').trim()||/^[-–]/.test(w.term)||WordClasses.matches(w,'affix'))return false;
  const k=normalize(notationHead(w))+'|'+normalize(w.zh||w.en)+'|'+w.dialect;
  if(seen.has(k))return false;seen.add(k);return true;
 });
 let pool=refresh?eligible.filter(w=>!previous.has(w.id)):eligible;
 if(pool.length<Math.min(12,eligible.length))pool=eligible;
 pool=[...pool];for(let i=0;i<Math.min(12,pool.length);i++){const j=i+Math.floor(Math.random()*(pool.length-i));[pool[i],pool[j]]=[pool[j],pool[i]]}
 const chosen=pool.slice(0,12);randomWordSelection={key,ids:chosen.map(w=>w.id)};return chosen;
}
function wordView(){
 let items=D.words.filter(wordMatches);
 if(state.q.trim())items=rankedWords(items);
 const discovery=!state.q.trim()&&!state.browseWords;
 const activeFilters=[state.pos,state.dialect,state.category,state.sourceFilter,state.exact,state.hideWholeLoans].filter(Boolean).length;
 const filters=`<details class="filter-disclosure" ${activeFilters?'open':''}><summary>筛选 ${activeFilters?`<span class="filter-count">${activeFilters}</span>`:''}</summary><div class="filters">${WordClasses.selector(state.pos)}${dialectSelector()}${select('category',SEMANTIC_GROUP_ORDER,'全部语义分类')}<select data-filter="sourceFilter" aria-label="文献来源"><option value="">全部文献</option>${[...new Set(D.words.flatMap(wordSources))].map(id=>`<option value="${id}" ${state.sourceFilter===id?'selected':''}>${E(S[id].title)}</option>`).join('')}</select><label><input type="checkbox" id="exact" ${state.exact?'checked':''}>完整词形／义项匹配</label><label class="loan-filter" title="保留半借及含其他词形的词条"><input type="checkbox" id="hide-whole-loans" ${state.hideWholeLoans?'checked':''}>隐藏整词新借</label><button id="reset">清除筛选</button></div><p class="loan-key">虚线词性为本站借助 AI 推测，可能有误；点按词条中的词性可查看依据。</p><p class="loan-key">新借：整词可能借自汉语；半借：部分可能借自汉语。</p></details>`;
 if(discovery){const chosen=randomWordItems(items);return pageHeader('words')+search()+languageSearchButtons()+filters+`<div class="section-head"><h2>遇见几个土家语词</h2><button id="shuffle-words">换一组</button></div>`+(chosen.length?wordTable(chosen):empty())+`<div class="detail-actions"><button id="browse-all-words">浏览全部词汇 →</button></div>`}
 if(state.browseWords&&!state.q.trim()){const collator=new Intl.Collator('zh-CN',{numeric:true,sensitivity:'base'});items=items.map(w=>({w,key:notationHead(w)})).sort((a,b)=>collator.compare(a.key,b.key)).map(x=>x.w)}
 const pg=pager(items.length);
 return pageHeader('words')+search()+languageSearchButtons()+filters+`<div class="result-head"><div class="result-summary"><span>${items.length.toLocaleString()} 个词条</span>${state.q.trim()?`<small class="search-scope" role="status">${searchScopeLabel()}</small>`:''}</div><button id="export-words">导出当前检索 JSON</button></div>`+(items.length?wordTable(items.slice((state.page-1)*40,state.page*40)):empty())+pg+`<div class="detail-actions"><button id="discover-words">随机看词</button></div>`;
}
function empty(){return '<div class="empty">没有匹配的记录。<br><small>试试更短的词、其他拼写，或清除筛选条件。</small></div>'}
function sourcesView(){const items=D.sources.filter(sourceMatches);if(state.priority)items.sort((a,b)=>a.parsePriority.rank-b.parsePriority.rank);const pg=pager(items.length);return pageHeader('sources')+(state.grammarSourceScope?`<div class="notice">当前仅检索${GRAMMAR_LABELS[state.grammarSourceScope]}资料。清除筛选可恢复全部文献。</div>`:'')+`<div class="detail-actions"><button data-recognition-batch="true">扫描文献全文</button></div>`+search('搜索题名、原目录与已提取正文…')+`<div class="filters">${select('topic',D.topics.map(t=>t.name).concat('综合资料'),'全部专题')}${select('kind',D.sources.map(s=>s.kind),'全部资料类型')}${dialectSelector(true)}${select('status',D.sources.map(s=>s.status),'全文收录情况')}<button id="reset">清除筛选</button></div><div class="result-head"><span>${items.length} 份资料</span><button id="export-sources">导出目录 JSON</button></div>`+(items.length?sourceRows(items.slice((state.page-1)*40,state.page*40)):empty())+pg}
function corpusCollectionKey(c){return c.survey?'yubao':c.externalText?'tlp-longshan':c.source}
function corpusCollectionTitle(key){return key==='yubao'?'中国语言资源保护工程':key==='tlp-longshan'?'《龙山土家语》':D.corpus.some(c=>c.source===key&&!c.survey&&!c.externalText)?'Liao–Brassett 土家语文库':S[key]?.title||key}
function corpusView(){
 const collection=state.corpusCollection||'';
 const matches=c=>(!state.q||contains([c.title,UI_TRANSLATIONS[c.title]||'',c.text,...(c.locations||[]),...(c.people||[])].join(' '),state.q))&&(!state.genre||state.genre===c.genre)&&dialectMatches(c);
 const pool=D.corpus.filter(c=>!collection||corpusCollectionKey(c)===collection),items=pool.filter(matches);
 const controls=search('搜索中文、音标、地点或标题…')+`<div class="filters">${dialectSelector()}${select('genre',pool.map(c=>c.genre),'全部体裁')}<button id="reset">清除筛选</button></div>`;
 if(!collection){
  const groups=new Map();for(const c of items){const key=corpusCollectionKey(c);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(c)}
  return pageHeader('corpus')+controls+(groups.size?`<div class="grid corpus-grid">${[...groups].map(([key,entries])=>`<article class="card corpus-card"><button class="corpus-card-content" data-corpus-collection="${E(key)}"><span class="card-title">${E(corpusCollectionTitle(key))}</span><span>${corpusMetadataLabels([...new Set(entries.map(c=>c.genre))])}</span><span class="tiny">${entries.length} 篇${state.q||state.genre||state.dialect?'匹配语料':''} · 查看篇目 →</span></button></article>`).join('')}</div>`:empty());
 }
 state.page=Math.min(state.page,Math.max(1,Math.ceil(items.length/40)));
 return `<button data-corpus-collection="">← 全部来源</button><h1>${E(corpusCollectionTitle(collection))}</h1>`+controls+`<div class="result-head"><span>${items.length} 篇语料</span></div>`+(items.length?corpusCards(items.slice((state.page-1)*40,state.page*40))+pager(items.length):empty());
}

function topicsView(){return pageHeader('topics')+search('搜索专题名称或研究方向…')+topicCards(D.topics.filter(t=>!state.q||contains(t.name+' '+t.summary,state.q)))}
function globalView(){const chapters=Object.values(DIALECT_GRAMMARS).flat().filter(g=>contains(g.title+' '+g.sections.map(s=>s.title+' '+s.query).join(' '),state.q));const recon=D.reconstructions.filter(r=>!r.componentOf&&reconstructionMatches(r));const words=rankedWords(D.words,'');const sources=D.sources.filter(s=>contains(s.title+' '+s.text+' '+s.path,state.q));const corpus=D.corpus.filter(c=>contains(c.title+' '+(UI_TRANSLATIONS[c.title]||'')+' '+c.text,state.q));return `<div class="eyebrow"><span class="tujia-ui" data-ui-tujia="brand" lang="tji"></span> / <span class="tujia-ui" data-ui-tujia="search" lang="tji"></span></div><h1>检索整个知识库</h1>${search('词形、释义、文献正文与语料…')}<p class="sub">“${E(state.q)}” · 词汇 ${words.length} · 文献 ${fullTextReady?sources.length:'…'} · 语料 ${corpus.length} · 语法章节 ${chapters.length} · 历史比较 ${recon.length}</p>${chapters.length?`<div class="section-head"><h2>参考语法</h2></div><div class="chips">${chapters.map(g=>`<button data-chapter="${g.id}" data-grammar-dialect="${g.dialect}">${GRAMMAR_LABELS[g.dialect]} · §${g.id} ${E(g.title)}</button>`).join('')}</div>`:''}${recon.length?`<div class="section-head"><h2>历史比较</h2><button data-results="history">查看全部 ${recon.length} 条 →</button></div>${reconstructionTable(recon.slice(0,6))}`:''}<div class="section-head"><h2>词汇</h2><button data-results="words">查看全部 ${words.length} 条 →</button></div>${words.length?wordTable(words.slice(0,8)):empty()}<div class="section-head"><h2>文献与正文</h2>${fullTextReady?`<button data-results="sources">查看全部 ${sources.length} 份 →</button>`:''}</div>${!fullTextReady?(sourceSearchFailed?'<p role="status">文献全文未能载入，词汇检索仍可使用。</p><button data-retry-source-search>重试文献全文检索</button>':'<p role="status">正在检索文献全文…</p>'):(sources.length?sourceRows(sources,5):empty())}<div class="section-head"><h2>语料</h2><button data-results="corpus">查看全部 ${corpus.length} 段 →</button></div>${corpus.length?corpusCards(corpus.slice(0,3)):empty()}`}
// The URL records the selected page and its controls. History also keeps the
// scroll position and the single detail overlay, so Back works on phones.
const ROUTE_FIELDS={
 home:['q'],
 words:['q','scheme','pos','dialect','category','sourceFilter','page','exact','hideWholeLoans','searchLanguage','browseWords'],
 sources:['q','topic','dialect','kind','status','priority','batch','grammarSourceScope','page'],
 corpus:['q','dialect','genre','corpusCollection','page'],
 history:['q','page'],
 grammar:['q','grammarAnchor'],
 notation:[]
};
let navigationReady=false,restoringNavigation=false,closingDetail=false,navigationSerial=0,lastNavigationToken='';
const navigationPositions=new Map();
function cleanViewState(value){
 const next={...DEFAULT_STATE};
 for(const key of Object.keys(next))if(Object.hasOwn(value||{},key))next[key]=value[key];
 if(next.view==='topics')next.view='sources';
 if(next.view==='saved'||!Object.hasOwn(ROUTE_FIELDS,next.view))next.view='home';
 for(const key of Object.keys(next))if(typeof DEFAULT_STATE[key]==='string')next[key]=String(next[key]??'').slice(0,2000);
 next.grammarDialect=next.grammarDialect==='south'?'south':'north';
 next.chapter=typeof normalizeGrammarChapter==='function'?normalizeGrammarChapter(next.chapter,next.grammarDialect):next.chapter;
 if(typeof grammarResolvePage==='function')Object.assign(next,grammarResolvePage(next));
 if(typeof normalizeGrammarSection==='function')next.grammarSection=normalizeGrammarSection(next.chapter,next.grammarDialect,next.grammarSection,next.grammarAnchor);
 if(D&&next.pos)next.pos=WordClasses.filterId(next.pos);
 next.page=Number.isFinite(Number(next.page))?Math.max(1,Math.floor(Number(next.page)||1)):1;
 next.exact=next.exact===true||next.exact==='1';
 next.hideWholeLoans=next.hideWholeLoans===true||next.hideWholeLoans==='1';
 next.browseWords=next.browseWords===true||next.browseWords==='1';
 if(!['','tujia','zh','en'].includes(next.searchLanguage))next.searchLanguage='';
 if(!['','north','south'].includes(next.grammarSourceScope))next.grammarSourceScope='';
 if(next.corpusCollection&&D&&!D.corpus.some(c=>corpusCollectionKey(c)===next.corpusCollection))next.corpusCollection='';
 return next;
}
function viewHash(value=state){
 const params=new URLSearchParams();
 for(const key of ROUTE_FIELDS[value.view]||[]){
  const v=value[key];
  if(v!==DEFAULT_STATE[key]&&v!==''&&v!=null)params.set(key,typeof v==='boolean'?(v?'1':'0'):String(v));
 }
 const route=value.view==='grammar'?'grammar/'+value.grammarDialect+'/'+value.chapter+(value.grammarSection?'/'+value.grammarSection.split('.').at(-1):''):value.view;
 return '#'+route+(params.size?'?'+params:'');
}
function parseViewHash(hash){
 const [path,query='']=hash.replace(/^#/,'').split('?'),next={...DEFAULT_STATE};
 const grammar=path.match(/^grammar\/(north|south)\/(\d+)(?:\/(\d+))?$/);
 const oldAnchor=path.match(/^(?:ref|section)-(north|south)-(\d+)[.-]/);
 if(grammar||oldAnchor){const match=grammar||oldAnchor;next.view='grammar';next.grammarDialect=match[1];next.chapter=match[2];if(grammar?.[3])next.grammarSection=next.chapter+'.'+grammar[3]}
 else next.view=path||'home';
 const params=new URLSearchParams(query);
 for(const key of ROUTE_FIELDS[next.view]||[])if(params.has(key))next[key]=params.get(key);
 if(oldAnchor&&typeof GRAMMAR_ANCHORS!=='undefined'){
  const target=path.startsWith('section-')?path.slice(8).replaceAll('.','-'):'fn-'+path;
  const where=GRAMMAR_ANCHORS[target];if(where){next.chapter=where.chapter;next.grammarAnchor=target;}
 }
 if(next.view==='grammar'&&next.grammarAnchor&&typeof GRAMMAR_ANCHORS!=='undefined'){
  const where=GRAMMAR_ANCHORS[next.grammarAnchor];
  if(where){next.chapter=where.chapter;next.grammarDialect=where.dialect;}
 }
 return {state:cleanViewState(next),anchor:next.grammarAnchor||(oldAnchor?path:'')};
}
function resolveDetailId(value){
 if(typeof value!=='string'||!value)return null;
 const id=Object.hasOwn(D.wordAliases||{},value)?D.wordAliases[value]:value;
 return [W,C,S,R].some(items=>Object.hasOwn(items||{},id))?id:null;
}
function navigationURL(detail=null,value=state){
 const url=new URL(location.href),id=resolveDetailId(detail);
 if(id)url.searchParams.set('id',id);else url.searchParams.delete('id');
 url.hash=viewHash(value);
 return url.pathname+url.search+url.hash;
}
function sharedDetailView(id){return W[id]?'words':C[id]?'corpus':R[id]?'history':'sources'}
function navigationEntry(){return history.state?.tujiaNavigation===1?history.state:null}
function navigationToken(){return location.href+'|'+(navigationEntry()?.key||'')}
function mainOpenDetails(){return [...document.querySelectorAll('#main details')].flatMap((el,i)=>el.open?[i]:[])}
function notationNavigationState(){
 if(state.view!=='notation')return null;
 const input=document.querySelector('#notation-input')?.value??notationState.input;
 return {source:notationState.source,input,converted:input===notationState.input&&!!notationState.result};
}
function restoreNotationState(snapshot){
 if(!snapshot||!NOTATION_CONFIG.profiles.some(p=>p.id===snapshot.source))return;
 notationState={source:snapshot.source,input:String(snapshot.input??''),result:null};
 if(snapshot.converted)notationState.result=convertNotation(notationState.input,notationState.source);
}
function saveNavigationPosition(){
 const entry=navigationEntry();
 if(!navigationReady||restoringNavigation||!entry||viewHash(entry.viewState)!==location.hash)return;
 navigationPositions.set(entry.key,window.scrollY);
 const openDetails=mainOpenDetails();
 const input=entry.notation?document.querySelector('#notation-input')?.value:undefined;
 const notation=input===undefined?entry.notation:{...entry.notation,input,converted:input===entry.notation.input&&entry.notation.converted};
 if(entry.scrollY===window.scrollY&&JSON.stringify(entry.openDetails)===JSON.stringify(openDetails)&&JSON.stringify(entry.notation)===JSON.stringify(notation))return;
 history.replaceState({...entry,scrollY:window.scrollY,openDetails,notation},'',location.href);
}
function newNavigationEntry(detail=null){return {tujiaNavigation:1,key:Date.now()+'-'+(++navigationSerial),viewState:{...state},detail,notation:notationNavigationState(),scrollY:window.scrollY,openDetails:mainOpenDetails()}}
function closeDetailSilently(){
 if(typeof evidenceRequest!=='undefined')evidenceRequest++;
 const dialog=$('#detail');
 dialog.querySelectorAll('audio').forEach(a=>a.pause());
 if(dialog.open)dialog.close();
 document.body.classList.remove('word-detail-open');
 document.querySelectorAll('.word-card-content[aria-pressed=true]').forEach(el=>el.setAttribute('aria-pressed','false'));
 currentDetail=null;currentOverlay=null;
}
function commitDetailNavigation(detail,wasOpen){
 currentOverlay=detail;
 if(!navigationReady||restoringNavigation)return;
 const entry=wasOpen?{...(navigationEntry()||newNavigationEntry()),detail}:newNavigationEntry(detail);
 history[wasOpen?'replaceState':'pushState'](entry,'',navigationURL(detail));
 lastNavigationToken=navigationToken();
}
function restoreDetailNavigation(detail){
 if(typeof detail==='string')openDetail(detail);
 else if(detail?.type==='notation-pair')npShowEvidence(detail.source,detail.kind,detail.key);
}
function finishNavigation(previous){
 if(!navigationReady||restoringNavigation)return;
 const hash=viewHash(),changed=location.hash!==hash,dialog=$('#detail');
 const entry=changed?newNavigationEntry():{...(previous||newNavigationEntry()),viewState:{...state},detail:dialog.open?currentOverlay:null,notation:notationNavigationState(),scrollY:window.scrollY,openDetails:mainOpenDetails()};
 // A link out of a detail replaces the overlay entry; Back returns to its list.
 history[changed&&!previous?.detail?'pushState':'replaceState'](entry,'',navigationURL(entry.detail));
 lastNavigationToken=navigationToken();
}
function revealPageAnchor(id){
 const target=document.getElementById(id);
 if(!target)return false;
 for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
 target.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 return true;
}
function restoreNavigation(){
 if(!navigationReady||navigationToken()===lastNavigationToken)return;
 const parsed=parseViewHash(location.hash),saved=navigationEntry();
 const requestedId=new URLSearchParams(location.search).get('id'),sharedId=resolveDetailId(requestedId);
 if(!location.hash&&sharedId)parsed.state.view=sharedDetailView(sharedId);
 const entry=saved&&viewHash(saved.viewState)===location.hash&&resolveDetailId(saved.detail)===sharedId?saved:null;
 restoringNavigation=true;closingDetail=false;
 closeDetailSilently();
 state=cleanViewState(entry?.viewState||parsed.state);
 restoreNotationState(entry?.notation);
 render();
 if(entry?.openDetails){const open=new Set(entry.openDetails);document.querySelectorAll('#main details').forEach((el,i)=>el.open=open.has(i))}
 if(sharedId||entry?.detail)restoreDetailNavigation(sharedId||entry.detail);
 const restored={...(entry||newNavigationEntry()),viewState:{...state},detail:$('#detail').open?currentOverlay:null,notation:notationNavigationState(),scrollY:entry?(navigationPositions.get(entry.key)??entry.scrollY??0):0,openDetails:mainOpenDetails()};
 history.replaceState(restored,'',navigationURL(restored.detail));
 lastNavigationToken=navigationToken();
 const token=lastNavigationToken;
 // New mobile chapter selections should open at the reading title. Back/Forward
 // still restores their own saved scroll position; explicit anchors take priority.
 const jumpToChapter=!entry&&!parsed.anchor&&state.view==='grammar'&&typeof grammarShouldJumpToReadingTitle==='function'&&grammarShouldJumpToReadingTitle();
 requestAnimationFrame(()=>{if(token===navigationToken()){window.scrollTo({top:restored.scrollY,behavior:'instant'});if(parsed.anchor)revealPageAnchor(parsed.anchor);else if(jumpToChapter&&grammarJumpToReadingTitle())grammarQueueReadingTitleScroll();}});
 restoringNavigation=false;
 if(requestedId&&!sharedId)toast('未找到该条目。');
}
function initializeNavigation(){
 navigationReady=true;
 history.scrollRestoration='manual';
 const sharedId=resolveDetailId(new URLSearchParams(location.search).get('id'));
 // A fresh shared link gets a list entry underneath, so Close and Back stay on site.
 if(sharedId&&!navigationEntry()?.detail){
  state=parseViewHash(location.hash).state;
  if(!location.hash)state.view=sharedDetailView(sharedId);
  history.replaceState(newNavigationEntry(),'',navigationURL());
  history.pushState(newNavigationEntry(sharedId),'',navigationURL(sharedId));
 }
 restoreNavigation();
}
window.addEventListener('popstate',restoreNavigation);
window.addEventListener('hashchange',restoreNavigation);
let scrollSaveTimer;
window.addEventListener('scroll',()=>{
 const entry=navigationEntry();
 if(navigationReady&&!restoringNavigation&&entry)navigationPositions.set(entry.key,window.scrollY);
 clearTimeout(scrollSaveTimer);
 // Safari rate-limits History API writes; a swipe must not write every frame.
 scrollSaveTimer=setTimeout(saveNavigationPosition,200);
},{passive:true});
window.addEventListener('pagehide',saveNavigationPosition);
function render(){
 if(typeof ensureSourceSearch==='function'&&ensureSourceSearch())return;
 const previous=navigationEntry();
 saveNavigationPosition();
 state=cleanViewState(state);
 if(navigationReady&&!restoringNavigation&&location.hash!==viewHash())closeDetailSilently();
 if($('#spelling-control'))$('#spelling-control').innerHTML=spellingSelector();
 document.querySelectorAll('aside>nav button').forEach(b=>{const active=b.dataset.view===state.view;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 const nav=$('aside>nav'),active=nav.querySelector('.active');
 if(active&&nav.scrollWidth>nav.clientWidth){
  const box=nav.getBoundingClientRect(),button=active.getBoundingClientRect();
  if(button.left<box.left)nav.scrollLeft-=box.left-button.left;
  else if(button.right>box.right)nav.scrollLeft+=button.right-box.right;
 }
 $('#crumb').textContent=titles[state.view]||'知识检索';
 const views={home:()=>state.q?globalView():overview(),words:wordView,sources:sourcesView,corpus:corpusView,history:historyView,grammar:grammarView,notation:notationView};
 $('#main').innerHTML=views[state.view]();
 document.title=(titles[state.view]||'知识总览')+' · 土家语知识索引';
 bindMain();bindNotationView();if(window.tasteRefresh)tasteRefresh();if(window.TujiaUI)TujiaUI.refresh();
 finishNavigation(previous);
}
function setView(v,keep=false,patch={}){
 if(typeof evidenceRequest!=='undefined')evidenceRequest++;
 state={...DEFAULT_STATE,view:v,q:keep?state.q:'',grammarDialect:state.grammarDialect||'north',...patch};
 if($('#detail').open&&viewHash(cleanViewState(state))===location.hash){
  const changedNotation=state.view==='notation'&&JSON.stringify(notationNavigationState())!==JSON.stringify(navigationEntry()?.notation);
  if(!changedNotation){closeDetail();return}
  closeDetailSilently();
 }
 // The mobile chapter picker was collapsed by the capturing click handler.
 const jumpToChapter=v==='grammar'&&typeof grammarShouldJumpToReadingTitle==='function'&&grammarShouldJumpToReadingTitle();
 render();
 if(jumpToChapter&&grammarJumpToReadingTitle())grammarQueueReadingTitleScroll();
 else window.scrollTo({top:0,behavior:'instant'});
}
function bindMain(){document.querySelectorAll('[data-corpus-collection]').forEach(b=>b.onclick=()=>{state.corpusCollection=b.dataset.corpusCollection;state.page=1;state.genre="";render();window.scrollTo({top:0,behavior:"smooth"})});if($('#shuffle-words'))$('#shuffle-words').onclick=()=>{randomWordItems(D.words.filter(wordMatches),true);render()};if($('#browse-all-words'))$('#browse-all-words').onclick=()=>{state.browseWords=true;state.page=1;render()};if($('#discover-words'))$('#discover-words').onclick=()=>{state.browseWords=false;state.q='';state.page=1;render()};const form=$('#search-form');if(form){const search=language=>{state.q=$('#query').value.trim();state.searchLanguage=state.view==='words'?language:'';state.page=1;render()};form.onsubmit=e=>{e.preventDefault();search(e.submitter?.dataset.searchLanguage||'')};form.onkeydown=e=>{if(e.key==='Enter'&&e.target.id==='query'&&!e.isComposing){e.preventDefault();search('')}};document.querySelectorAll('#search-form button,[data-search-language]').forEach(button=>button.onclick=e=>{e.preventDefault();search(button.dataset.searchLanguage||'')})};document.querySelectorAll('[data-filter]').forEach(el=>el.onchange=()=>{state[el.dataset.filter]=el.value;state.page=1;render()});if($('#hide-whole-loans'))$('#hide-whole-loans').onchange=e=>{state.hideWholeLoans=e.target.checked;state.page=1;render()};if($('#exact'))$('#exact').onchange=e=>{state.exact=e.target.checked;state.page=1;render()};if($('#reset'))$('#reset').onclick=()=>{if(state.view==='corpus'){state.q='';state.genre='';state.dialect='';state.page=1;render()}else setView(state.view)};if($('#export-words'))$('#export-words').onclick=async()=>{await loadAllWordEvidence();download('tujia-words.json',D.words.filter(wordMatches).map(w=>({...Object.fromEntries(Object.entries(w).filter(([key])=>!key.startsWith('_'))),canonicalPos:WordClasses.ids(w),posProvenance:WordClasses.provenance(w),sitePosAnalysis:WordClasses.review(w),modernChineseLoanScope:modernChineseLoanInfo(w).scope,editorialNotes:typeof editorialNotesFor==='function'?editorialNotesFor(w):(w.editorialNotes||[]),source_title:S[w.source].title,source_url:S[w.source].url})));};if($('#export-sources'))$('#export-sources').onclick=()=>download('tujia-catalogue.json',D.sources.filter(sourceMatches).map(({text,...s})=>s));if($('#export-reconstructions'))$('#export-reconstructions').onclick=()=>download('proto-bizic-comparison.json',D.reconstructions.filter(reconstructionMatches));}
function download(name,obj){const u=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function sourceLink(id,label='打开来源原件 ↗'){if(!S[id]?.url)return '';return `<a href="${E(S[id].url)}" target="_blank" rel="noopener">${label}</a>`}
function wordDetail(w){
 const related=D.words.filter(x=>x.id!==w.id&&((w.zh&&normalize(x.zh)===normalize(w.zh))||(w.en&&normalize(x.en)===normalize(w.en)))).slice(0,10);
 const metadata=WordClasses.badges(w)+modernChineseLoanBadge(w);
 return `<div class="word-entry-summary">
 <div class="word-entry-form"><div class="chips">${wordVarietyPill(w)}</div><h1 class="word">${notationHeadHTML(w)}</h1>${notationCells(w)}</div>
 <div class="word-entry-definition"><h2 data-ui-content>${E(w.zh||w.en)}</h2>${w.en?`<p class="sub word-detail-english" lang="en" data-ui-content>${E(w.en)}</p>`:''}${metadata?`<div class="word-metadata">${metadata}</div>`:''}${w.zhReviewEvidence?`<details class="gloss-evidence"><summary>释义说明</summary><p>${E(w.zhReviewEvidence)}</p></details>`:''}</div>
 <div class="detail-actions"><button data-copy="${w.id}">复制引用</button><button data-word-search="${E(w.en||w.zh)}">查找同义词</button></div>
 </div><details><summary>出处与原记音</summary>${dictionaryProvenance(w)}</details>${typeof editorialNotesHTML==='function'?editorialNotesHTML(w):''}${related.length?`<h3>同义词条</h3><div class="stack">${related.map(x=>`<button data-open="${x.id}">${notationHeadHTML(x)} · ${E(wordVarietyInfo(x).label)} · ${E(x.zh||x.en)}</button>`).join('')}</div>`:''}`
}

function sourceVariantPanel(s){if(s.canonicalSource)return `<div class="notice">本文件属于 <button data-open="${s.canonicalSource}">${E(S[s.canonicalSource].title)}</button>。</div>`;if(!s.variantIds)return '';return `<h3>原著与文件版本</h3><p>${E(s.originalTitle)}</p>${s.variantIds.map(id=>{const v=S[id];return `<article class="card"><button data-open="${id}">${E(v.title)}</button>${sourceLink(id)}</article>`}).join('')}`}
function sourceDetail(s){return `<div class="eyebrow"><span class="tujia-ui" data-ui-tujia="sources" lang="tji"></span></div><div class="row"><h2 class="grow">${E(s.title)}</h2></div><div class="chips">${pill(s.kind)}${s.topics.map(t=>pill(t)).join('')}${pill(s.status,s.status.includes('待'))}</div><dl><dt>原始目录</dt><dd>${E(s.path)}</dd><dt>方言标签</dt><dd>${E(s.dialect)}</dd><dt>地点线索</dt><dd>${E(s.locations.join(' / ')||'题名未说明')}</dd><dt>文件大小</dt><dd>${s.size?(Number(s.size)/1024/1024).toFixed(2)+' MB':'不适用／未提供'}</dd></dl>${sourceVariantPanel(s)}${s.id==='brassett-2006'?brassettSourcePanel():''}${s.recognition?recognitionPanel(s):''}${s.description?`<p class="sub">${E(s.description)}</p>`:''}<div class="detail-actions">${sourceLink(s.id)}<button data-copy="${s.id}">复制来源引用</button>${D.words.some(w=>wordSources(w).includes(s.id))?`<button data-source-words="${s.id}">检索本来源词条</button>`:''}</div>${s.image?`<figure style="margin:15px 0"><a href="${E(s.image)}" target="_blank"><img class="research-map" hidden data-media-src="${E(s.image)}" alt="原始地图 ${E(s.title)}"></a><figcaption class="tiny">原图 ${E(s.title)} · 点击放大。历史版本地图请结合论文勘误阅读。</figcaption></figure>`:''}${s.media?`<audio controls preload="metadata" hidden data-media-src="${E(s.media)}"></audio>`:''}${s.members?`<h3>压缩包内容</h3>${s.members.map(m=>`<p>${E(m.name)} · ${(m.size/1024).toFixed(0)} KB</p>${m.media?`<audio controls preload="none" hidden data-media-src="${E(m.media)}"></audio>`:''}`).join('')}`:''}${s.text.length>500?`<div class="notice warn">${E(s.textNotice)}</div><h3>提取文本</h3><div class="compact-search"><input id="within" value="${E(state.q)}" placeholder="在正文中查找关键词" aria-label="文内定位"><button id="within-find">定位</button></div><div class="text-view" id="source-text">${s.recognition?recognizedHTML(s):E(s.text)}</div>`:`<div class="notice">${s._textUnavailable?'文献全文尚未载入，可打开来源原件。':s.media?'暂无逐句转写，可查看原始资料。':s.status.includes('词表')?'可通过“检索本来源词条”查看词汇。':'暂无全文，请打开原件。'}</div>`}`}
function corpusDetail(c){if(c.externalText)return longshanTextDetail(c);if(c.survey)return surveySentenceDetail(c);return `<div class="eyebrow"><span class="tujia-ui" data-ui-tujia="corpus" lang="tji"></span></div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><div class="chips">${pill(c.genre)}${pill(c.code)}</div>${corpusPlayer(c)}<dl><dt>方言判定依据</dt><dd>${E(S[c.source].dialectBasis||'范围尚未核定')}</dd><dt>地点线索</dt><dd>${E(c.locations.join(' / ')||'待核')}</dd><dt>人物原文</dt><dd>${c.people.length?c.people.map(E).join('<br>'):'待核'}</dd><dt>文本来源</dt><dd>土家语文库 网站原版（拼音版）${c.page?' · PDF 第 '+c.page+' 页起':''}</dd></dl><div class="detail-actions">${sourceLink(c.audio,'打开原始录音 ↗')}${sourceLink(c.source,'打开 PDF 原件 ↗')}<button data-copy="${c.id}">复制语料引用</button></div>${c.text?`<div class="compact-search"><input id="within" value="${E(state.q)}" placeholder="在本段文本中定位" aria-label="语料内定位"><button id="within-find">定位</button></div><details><summary>查看原始全文与分行</summary><div class="text-view" id="source-text">${E(c.text)}</div></details>`:'<div class="notice warn">暂无文本。</div>'}`}
function showDetailDialog(id){
 const dialog=$('#detail');
 const docked=!!W[id]&&state.view==='words'&&innerWidth>=1180;
 dialog.classList.toggle('word-detail',docked);
 document.body.classList.toggle('word-detail-open',docked);
 if(dialog.open&&dialog.matches(':modal')===docked)dialog.close();
 if(!dialog.open){if(docked)dialog.show();else dialog.showModal();}
 document.querySelectorAll('.word-card-content').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.open===id)));
}
function openDetail(id){
 if(W[id]?._chunk!==undefined||(S[id]?._textChunk&&!S[id]._skipTextOnce)){openPreparedDetail(id);return;}
 if(S[id])delete S[id]._skipTextOnce;
 id=resolveDetailId(id);
 if(!id)return;
 const dialog=$('#detail'),wasOpen=dialog.open;
 saveNavigationPosition();
 const html=R[id]?reconstructionDetail(R[id]):W[id]?wordDetail(W[id]):C[id]?corpusDetail(C[id]):sourceDetail(S[id]);
 currentDetail=id;
 $('#detail-spelling-control').innerHTML=spellingSelector(W[id]||C[id]);
 $('#detail-label').textContent=W[id]?'词汇条目':C[id]?'语料详情':R[id]?'历史比较':'文献详情';
 $('#detail-body').innerHTML=html;
 showDetailDialog(id);
 if(C[id]&&!C[id].survey&&!C[id].externalText){try{bindCorpusPlayer(C[id])}catch(error){console.error('Corpus player unavailable',error)}}
 dialog.scrollTop=0;
 commitDetailNavigation(id,wasOpen);
 if($('#jump-doc-page'))$('#jump-doc-page').onclick=()=>{
  const n=Number($('#doc-page-number').value);
  if(!Number.isInteger(n)||n<1||n>S[id]?.recognition?.pageCount){toast('请输入有效的文件页码');return}
  if(S[id]?.recognition?.pageImages)$('#source-text').innerHTML=recognizedHTML(S[id],'',n);
  const target=$('#doc-page-'+n);
  if(target)target.scrollIntoView({block:'start',behavior:'smooth'});else toast('请输入有效的文件页码');
 };
 if($('#within-find'))$('#within-find').onclick=()=>{
  document.querySelector('#source-text')?.closest('details')?.setAttribute('open','');
  const q=$('#within').value.trim(),text=W[id]?'':C[id]?C[id].text:S[id].text,box=$('#source-text');
  if(S[id]?.recognition){box.innerHTML=recognizedHTML(S[id],q);const first=box.querySelector('mark');if(first)first.scrollIntoView({block:'center',behavior:'smooth'});else if(q)toast('没有找到关键词');return}
  if(!q){box.innerHTML=E(text);return}
  const at=normalize(text).indexOf(normalize(q));
  if(at<0){toast('没有找到关键词');return}
  const escaped=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  box.innerHTML=text.split(new RegExp('('+escaped+')','gi')).map((p,i)=>i%2?'<mark>'+E(p)+'</mark>':E(p)).join('');
  const first=box.querySelector('mark');if(first)first.scrollIntoView({block:'center',behavior:'smooth'});
 };
}
function closeDetail(){
 if(closingDetail)return;
 if(navigationReady&&navigationEntry()?.detail){closingDetail=true;history.back()}
 else closeDetailSilently();
}
document.addEventListener('click',async e=>{
 const b=e.target.closest('button,a');if(!b)return;
 // Route grammar section links through the same navigation path as chapter
 // buttons. Native #hash scrolling competes with the reading-title scroll.
 if(b.matches('a[href^="#grammar/"]')&&b.closest('.grammar-toc,.grammar-page-navigation,.grammar-page-results')){
  const destination=parseViewHash(b.getAttribute('href')).state;
  if(destination.view==='grammar'){
   e.preventDefault();
   if(b.closest('.grammar-toc')&&typeof grammarTocMobileViewport==='function'&&grammarTocMobileViewport())grammarSetMobileTocExpanded(false);
   setView('grammar',false,{
    grammarDialect:destination.grammarDialect,
    chapter:destination.chapter,
    grammarSection:destination.grammarSection,
    grammarAnchor:destination.grammarAnchor
   });
   return;
  }
 }
 if(b.tagName==='A'&&b.getAttribute('href')?.startsWith('#')&&!b.dataset.view){
  let id;try{id=decodeURIComponent(b.getAttribute('href').slice(1))}catch{return}
  if(document.getElementById(id)){e.preventDefault();revealPageAnchor(id);return}
 }
 if(b.dataset.readerPage&&S[currentDetail]?.recognition?.pageImages){
  const n=Number(b.dataset.readerPage);$('#source-text').innerHTML=recognizedHTML(S[currentDetail],'',n);$('#doc-page-number').value=readingPages[currentDetail];$('#source-text').scrollIntoView({block:'start'});return;
 }
 if(b.dataset.recognitionBatch){setView('sources',false,{batch:'first-five'});return}
 if(b.dataset.priorityQueue){setView('sources',false,{priority:'全部待解析'});return}
 if(b.dataset.grammarDialect||b.dataset.chapter){
  // A chapter selection must close its index before rendering or measuring
  // the reading title; a global capture listener alone can miss this transition.
  if(b.dataset.chapter&&b.closest('.grammar-toc')&&typeof grammarTocMobileViewport==='function'&&grammarTocMobileViewport())grammarSetMobileTocExpanded(false);
  setView('grammar',false,{grammarDialect:b.dataset.grammarDialect||state.grammarDialect||'north',chapter:b.dataset.chapter||'1'});return;
 }
 if(b.dataset.grammarQuery){setView('sources',false,{q:b.dataset.grammarQuery,grammarSourceScope:b.dataset.queryScope||state.grammarDialect||'north'});return}
 if(b.dataset.view){
  e.preventDefault();
  if(!D){location.hash=b.dataset.view;return}
  setView(b.dataset.view);return;
 }
 if(b.dataset.results){setView(b.dataset.results,true);return}
 if(b.dataset.query){state.q=b.dataset.query;state.page=1;render();return}
 if(b.dataset.topic){setView('sources',false,{topic:b.dataset.topic});return}
 if(b.dataset.open){openDetail(b.dataset.open);return}
 if(b.dataset.page){state.page=Number(b.dataset.page);render();window.scrollTo({top:200,behavior:'instant'});return}
 if(b.dataset.wordSearch){setView('words',false,{q:b.dataset.wordSearch});return}
 if(b.dataset.sourceWords){setView('words',false,{sourceFilter:b.dataset.sourceWords});return}
 if(b.dataset.copy){
  const id=b.dataset.copy,w=W[id],c=C[id],s=S[id];
  const str=w?`${phon(w.term)} — ${w.zh||w.en} (${w.scheme}); ${w.attestations.map(a=>`${phon(a.term)} [${a.scheme}] ${S[a.source].title}, ${a.locator}. ${S[a.source].url}`).join('; ')}`:c?corpusCitation(c):`${s.title}. ${s.url}`;
  try{await navigator.clipboard.writeText(str);toast('引用已复制')}catch{toast('复制不可用，请从原件链接获取出处')}
 }
});
$('#close').onclick=closeDetail;
$('#detail').addEventListener('cancel',e=>{e.preventDefault();closeDetail()});
$('#detail').addEventListener('close',()=>{$('#detail').querySelectorAll('audio').forEach(a=>a.pause())});
document.addEventListener('play',e=>{if(e.target.tagName==='AUDIO')document.querySelectorAll('audio').forEach(a=>{if(a!==e.target)a.pause()})},true);
initializePreparedData();

document.addEventListener('change',e=>{
 if(!e.target.dataset.spellingDisplay)return;
 const query=$('#query'),draft=query?.value,start=query?.selectionStart,end=query?.selectionEnd;
 if(e.target.dataset.spellingDisplay==='south'){
  southernDisplay=e.target.value==='poj'?'poj':'accent';
  try{localStorage.setItem('tujia-south-spelling-v1',southernDisplay)}catch{}
 }else{
  spellingDisplay=e.target.value==='ye'?'ye':'accent';
  try{localStorage.setItem('tujia-north-spelling-v2',spellingDisplay)}catch{}
 }
 const id=currentDetail,isOpen=$('#detail').open;
 render();
 // Display preferences must not submit or discard an unfinished query.
 const nextQuery=$('#query');
 if(nextQuery&&draft!==undefined){nextQuery.value=draft;if(start!==null&&start!==undefined)nextQuery.setSelectionRange(start,end);}
 $('#detail-spelling-control').innerHTML=spellingSelector();
 if(isOpen&&id){
  if(C[id]&&!C[id].survey){const lines=corpusLyricLines(C[id].text);document.querySelectorAll('.lyric-tujia').forEach((el,i)=>el.textContent=displayBrassett(lines[i].text))}
  else openDetail(id);
 }else if(isOpen&&currentOverlay)restoreDetailNavigation(currentOverlay);
});
