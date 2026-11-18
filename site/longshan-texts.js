
function xuSiteSpelling(ipa){
 const ons={'tɕʰ':'q','tsʰ':'c','pʰ':'p','tʰ':'t','kʰ':'k','tɕ':'j','ts':'z','ɕ':'x','ɣ':'hx','ŋ':'ng','p':'b','t':'d','k':'g','m':'m','n':'n','l':'l','s':'s','z':'r','x':'h','w':'w','j':'y'};
 const rh={'ɨe':'e','ɨu':'ou','ɨ':'i','i':'i','ɿ':'i','a':'a','u':'u','o':'o','ai':'ai','au':'ao','iau':'iao','ei':'ei','ia':'ia','iu':'iu','ie':'ie','ua':'ua','uai':'uai','uei':'ui','ĩ':'in','ẽ':'en','ã':'ang','ũ':'ong','iã':'ian','uã':'uan','uẽ':'un','iũ':'iong'};
 const tones={'⁵⁵':'x','⁵³':'v','³⁵':'f','²¹':'r'};
 return String(ipa).replace(/[a-zɐ-ʯʰŋãẽĩũ]+[⁰¹²³⁴⁵⁶⁷⁸⁹]+/gu,sy=>{
  const m=sy.match(/^(.+?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/u);if(!m)return sy;
  const on=Object.keys(ons).find(x=>m[1].startsWith(x))||'',r=m[1].slice(on.length);
  let v=r==='e'?(on?'ie':'e'):rh[r];if(v===undefined||!tones[m[2]])return sy;
  let core=(ons[on]||'')+v;
  if(on==='j')core=core.replace(/^yiu/,'you').replace(/^yi(?=[aeou])/,'y');
  if(!on){if(r==='i')core='yi';else if(r==='iu')core='you';else if(/^i[aou]/.test(r))core='y'+core.slice(1);else if(r==='u')core='wu';else if(r==='uei')core='wei';else if(/^u[a]/.test(r))core='w'+core.slice(1);}
  return core+tones[m[2]];
 });
}
// Texts reproduced with permission confirmed by the project owner; audio stays on the source website.
async function loadLongshanTexts(data){
 const entries=typeof SiteRequest==='undefined'?await fetch('longshan-texts.json').then(r=>{if(!r.ok)throw Error('Longshan texts unavailable');return r.json()}):await SiteRequest.json('longshan-texts.json');
 const annotated=typeof SiteRequest==='undefined'?await fetch('annotated-books.json').then(r=>{if(!r.ok)throw Error('Annotated texts unavailable');return r.json()}):await SiteRequest.json('annotated-books.json');
 entries.push(...annotated);
 if(!data.sources.some(s=>s.id==='xu-tujia-annotated-texts'))data.sources.push({id:'xu-tujia-annotated-texts',title:'《土家语语法标注文本》',url:'https://drive.google.com/file/d/19fGttb_9n8Z83jCqpOLiEXA5XcAAFA5w/view',dialect:'北部',locations:['龙山'],topics:['语料'],kind:'书籍',status:'语料节选',path:'语料',text:'《土家语语法标注文本》书籍语料。'});
 const existing=new Set(data.corpus.map(c=>c.id));
 data.corpus.push(...entries.filter(c=>!existing.has(c.id)));
 if(!data.sources.some(s=>s.id==='tlp-longshan'))data.sources.push({id:'tlp-longshan',title:'《龙山土家语》文本 · Tujia Language Project',url:'https://tujialanguage.com/texts/longshan.html',dialect:'北部',locations:['龙山'],topics:['语料'],kind:'网页',status:'已整理',path:'语料',text:'口彩禁忌、俗语谚语、歌谣和故事。'});
}
function longshanTextDetail(c){
 if(c.bookSource){
  const english=window.TujiaUI?.language==='en';
  const paragraphs=c.blocks.map((b,i)=>`<section class="external-text-block"><p class="tiny">${i+1} · ${english?'Source page':'原书第'} ${E(b.page)}${english?'':' 页'}</p><p class="external-ipa">${english?'Site spelling':'本站拼音'}：${E(typeof spellingDisplay!=='undefined'&&spellingDisplay==='accent'&&typeof yeToAccent==='function'?yeToAccent(xuSiteSpelling(b.ipa)):xuSiteSpelling(b.ipa))}</p>${(b.originalPinyin||b.pinyin)?`<p>${english?'Source spelling':'原书拼音'}：${E(b.originalPinyin||b.pinyin)}</p>`:''}<div class="external-glosses">${b.glosses.map(g=>`<div><span>${E(g.ipa)}</span><span>${E(g.zh)}</span></div>`).join('')}</div><p>${E(b.zh)}</p>${b.notes?`<p class="tiny">${E(b.notes)}</p>`:''}</section>`).join('');
  const translation=(c.independentTranslation||[]).map(t=>`<p>${E(t.text||'')}</p>`).join('');
  const footnotes=(c.footnotes||[]).map(f=>`<p class="tiny">${E(f.text||'')}</p>`).join('');
  return `<div class="eyebrow">${english?'Longshan · narrative':'龙山 · '+E(c.genre||'文本')}</div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><p class="tiny">${english?'Source: Annotated Texts of the Tujia Language, pages '+E(c.sourcePages)+'.':'来源：《土家语语法标注文本》，原书第 '+E(c.sourcePages)+' 页。'}</p><p><a href="https://drive.google.com/file/d/19fGttb_9n8Z83jCqpOLiEXA5XcAAFA5w/view" target="_blank" rel="noopener noreferrer">${english?'View source':'查看原书'} ↗</a></p><div id="corpus-text"><p class="tiny"><a href="/xu-transcription-notes.md">${english?'Transcription conventions and editorial notes':'记音转换与校勘说明'}</a></p>${paragraphs}${footnotes?`<section><h3>${english?'Source notes':'原书注释'}</h3>${footnotes}</section>`:''}${translation?`<section><h3>${english?'Complete Chinese translation':'原书全文汉译'}</h3>${translation}</section>`:''}</div>`;
 }
 const paragraphs=c.blocks.map((b,i)=>`<section class="external-text-block"><p class="tiny">${i+1}</p><p class="external-ipa">/${E(normalizeIPA(b.ipa))}/</p><p>${E(b.zh)}</p>${b.en?`<p lang="en" class="muted">${E(b.en)}</p>`:''}${b.ye?`<details><summary>原网站拼写${b.glosses?.length?'与词语对照':''}</summary><p>${E(b.ye)}</p>${b.glosses?.length?`<div class="external-glosses">${b.glosses.map(g=>`<div><span>${E(g.ye)}</span><span>${E(g.zh)}</span><span lang="en">${E(g.en)}</span></div>`).join('')}</div>`:''}</details>`:''}</section>`).join('');
 return `<div class="eyebrow">龙山 · ${E(c.genre)}</div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><p class="tiny">文本来源：Tujia Language Project ·《龙山土家语》</p><p><a href="${E(c.externalUrl)}" target="_blank" rel="noopener noreferrer">原网站有录音：前往收听 ↗</a></p><div id="corpus-text">${paragraphs}${c.culturalNote?`<details><summary>文化注释（原网站）</summary><p>${E(c.culturalNote)}</p>${c.culturalNoteEn?`<p lang="en">${E(c.culturalNoteEn)}</p>`:''}</details>`:''}</div>`;
}
