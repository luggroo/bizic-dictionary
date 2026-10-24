// Texts reproduced with permission confirmed by the project owner; audio stays on the source website.
async function loadLongshanTexts(data){
 const entries=typeof SiteRequest==='undefined'?await fetch('longshan-texts.json').then(r=>{if(!r.ok)throw Error('Longshan texts unavailable');return r.json()}):await SiteRequest.json('longshan-texts.json');
 const existing=new Set(data.corpus.map(c=>c.id));
 data.corpus.push(...entries.filter(c=>!existing.has(c.id)));
 if(!data.sources.some(s=>s.id==='tlp-longshan'))data.sources.push({id:'tlp-longshan',title:'《龙山土家语》文本 · Tujia Language Project',url:'https://tujialanguage.com/texts/longshan.html',dialect:'北部',locations:['龙山'],topics:['语料'],kind:'网页',status:'已整理',path:'语料',text:'口彩禁忌、俗语谚语、歌谣和故事。'});
}
function longshanTextDetail(c){
 const paragraphs=c.blocks.map((b,i)=>`<section class="external-text-block"><p class="tiny">${i+1}</p><p class="external-ipa">/${E(normalizeIPA(b.ipa))}/</p><p>${E(b.zh)}</p>${b.en?`<p lang="en" class="muted">${E(b.en)}</p>`:''}${b.ye?`<details><summary>原网站拼写${b.glosses?.length?'与词语对照':''}</summary><p>${E(b.ye)}</p>${b.glosses?.length?`<div class="external-glosses">${b.glosses.map(g=>`<div><span>${E(g.ye)}</span><span>${E(g.zh)}</span><span lang="en">${E(g.en)}</span></div>`).join('')}</div>`:''}</details>`:''}</section>`).join('');
 return `<div class="eyebrow">龙山 · ${E(c.genre)}</div><div class="row"><h2 class="grow">${E(c.title)}</h2></div><p class="tiny">文本来源：Tujia Language Project ·《龙山土家语》</p><p><a href="${E(c.externalUrl)}" target="_blank" rel="noopener noreferrer">原网站有录音：前往收听 ↗</a></p>${paragraphs}${c.culturalNote?`<details><summary>文化注释（原网站）</summary><p>${E(c.culturalNote)}</p>${c.culturalNoteEn?`<p lang="en">${E(c.culturalNoteEn)}</p>`:''}</details>`:''}`;
}
