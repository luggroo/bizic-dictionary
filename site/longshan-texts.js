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
  const paragraphs=c.blocks.map((b,i)=>`<section class="external-text-block"><p class="tiny">${i+1} · ${english?'Source page':'原书第'} ${E(b.page)}${english?'':' 页'}</p>${(b.originalPinyin||b.pinyin)?`<p>${english?'Source spelling':'原书拼音'}：${E(b.originalPinyin||b.pinyin)}</p>`:''}<p class="external-ipa">${b.ipaStatus?E(b.ipaStatus)+'：':''}/${E(b.ipa)}/</p>${b.originalIpa&&b.originalIpa!==b.ipa?`<p class="tiny">${english?'Source notation':'原书记音'}：${E(b.originalIpa)}</p>`:''}<div class="external-glosses">${b.glosses.map(g=>`<div><span>${E(g.ipa)}</span><span>${E(g.zh)}</span></div>`).join('')}</div><p>${E(b.zh)}</p>${b.notes?`<p class="tiny">${E(b.notes)}</p>`:''}${b.reviewNote?`<p class="tiny">${E(b.reviewNote)}</p>`:''}</section>`).join('');
  const translation=(c.independentTranslation||[]).map(t=>`<p>${E(t.text||'')}</p>`).join('');
  const footnotes=(c.footnotes||[]).map(f=>`<p class="tiny">${E(f.text||'')}</p>`).join('');
  return `<div class="eyebrow">${english?'Longshan · narrative':'龙山 · '+E(c.genre||'文本')}</div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><p class="tiny">${english?'Source: Annotated Texts of the Tujia Language, pages '+E(c.sourcePages)+'.':'来源：《土家语语法标注文本》，原书第 '+E(c.sourcePages)+' 页。'}</p><p><a href="https://drive.google.com/file/d/19fGttb_9n8Z83jCqpOLiEXA5XcAAFA5w/view" target="_blank" rel="noopener noreferrer">${english?'View source':'查看原书'} ↗</a></p>${c.reviewNote?`<p class="tiny">${E(c.reviewNote)}</p>`:''}<div id="corpus-text">${paragraphs}${footnotes?`<section><h3>${english?'Source notes':'原书注释'}</h3>${footnotes}</section>`:''}${translation?`<section><h3>${english?'Complete Chinese translation':'原书全文汉译'}</h3>${translation}</section>`:''}</div>`;
 }
 const paragraphs=c.blocks.map((b,i)=>`<section class="external-text-block"><p class="tiny">${i+1}</p><p class="external-ipa">/${E(normalizeIPA(b.ipa))}/</p><p>${E(b.zh)}</p>${b.en?`<p lang="en" class="muted">${E(b.en)}</p>`:''}${b.ye?`<details><summary>原网站拼写${b.glosses?.length?'与词语对照':''}</summary><p>${E(b.ye)}</p>${b.glosses?.length?`<div class="external-glosses">${b.glosses.map(g=>`<div><span>${E(g.ye)}</span><span>${E(g.zh)}</span><span lang="en">${E(g.en)}</span></div>`).join('')}</div>`:''}</details>`:''}</section>`).join('');
 return `<div class="eyebrow">龙山 · ${E(c.genre)}</div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><p class="tiny">文本来源：Tujia Language Project ·《龙山土家语》</p><p><a href="${E(c.externalUrl)}" target="_blank" rel="noopener noreferrer">原网站有录音：前往收听 ↗</a></p><div id="corpus-text">${paragraphs}${c.culturalNote?`<details><summary>文化注释（原网站）</summary><p>${E(c.culturalNote)}</p>${c.culturalNoteEn?`<p lang="en">${E(c.culturalNoteEn)}</p>`:''}</details>`:''}</div>`;
}
