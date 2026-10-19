'use strict';
let comparisonReviews={};try{comparisonReviews=JSON.parse(localStorage.getItem('tujia-comparison-reviews')||'{}')}catch{}
const comparisonNorm=v=>String(v??'').normalize('NFC').replace(/\s+/g,'').trim();
function mergeComparisons(data){
 const raw=data.reconstructions;data.reconstructionOriginals=raw;
 const byId=Object.fromEntries(raw.map(r=>[r.id,r])),joined=raw.filter(r=>r.joinedFrom),components=new Set(joined.flatMap(r=>r.joinedFrom.map(id=>byId[id]?.no).filter(Boolean)));
 const groups=[];for(const r of joined){const g=groups.find(g=>g.base.no===r.no);if(g)g.versions.push(r);else groups.push({base:r,versions:[r]});}
 for(const g of groups){
  const nos=g.base.joinedFrom.map(id=>byId[id]?.no);
  for(const dataset of [...new Set(raw.map(r=>r.dataset))]){
   if(dataset===byId[g.base.joinedFrom[0]]?.dataset||g.versions.some(v=>v.dataset===dataset))continue;
   const parts=nos.map(no=>raw.find(r=>r.dataset===dataset&&r.no===no));
   if(parts.every(Boolean))g.versions.push({...parts[0],id:parts.map(r=>r.id).join('+'),no:g.base.no,proto:parts.map(r=>r.proto.replace(/^\*/, '').replace(/\s+/g,'')).join('').replace(/^/,'*'),reflexes:Object.fromEntries([...new Set(parts.flatMap(r=>Object.keys(r.reflexes)))].map(k=>[k,[...new Set(parts.map(r=>r.reflexes[k]).filter(Boolean))].join(' ／ ')])),locator:parts.map(r=>r.locator).join(' + ')});
  }
 }
 for(const r of raw){
  if(r.joinedFrom||r.componentOf||components.has(r.no))continue;
  let g=r.no?groups.find(g=>g.base.no===r.no):null;
  if(!r.no){const matches=groups.filter(g=>(r.en&&comparisonNorm(g.base.en).toLowerCase()===comparisonNorm(r.en).toLowerCase())||(r.zh&&comparisonNorm(g.base.zh)===comparisonNorm(r.zh)));if(matches.length===1)g=matches[0];}
  if(g)g.versions.push(r);else groups.push({base:r,versions:[r]});
 }
 data.reconstructions=groups.map(g=>{
  const r={...g.base,reflexes:{...g.base.reflexes},versions:g.versions,conflicts:[],dataset:'原始比较表'};
  for(const field of ['proto','zh','en',...new Set(g.versions.flatMap(v=>Object.keys(v.reflexes).map(k=>'reflex:'+k)))]){
   const options=new Map();for(const v of g.versions){const value=field.startsWith('reflex:')?v.reflexes[field.slice(7)]:v[field];if(!value)continue;const key=comparisonNorm(value);if(!options.has(key))options.set(key,{value,versions:[]});options.get(key).versions.push({dataset:v.dataset,locator:v.locator});}
   const choices=[...options.values()];if(choices.length>1||choices.some(x=>/^#/.test(x.value)))r.conflicts.push({field,choices});
   if(choices.length){if(field.startsWith('reflex:'))r.reflexes[field.slice(7)]=choices[0].value;else r[field]=choices[0].value;}
  }
  return r;
 });
}
function comparisonReviewPanel(r){if(!r.conflicts?.length)return '';const queue=D.reconstructions.filter(x=>x.conflicts?.length),at=queue.findIndex(x=>x.id===r.id);return `<section class="panel"><h3>逐项核对差异 · ${at+1} / ${queue.length}</h3><div class="detail-actions">${at>0?`<button data-open="${queue[at-1].id}">上一词</button>`:''}${at<queue.length-1?`<button data-open="${queue[at+1].id}">下一词 →</button>`:''}</div>${r.conflicts.map(c=>{const id=r.id+':'+c.field,review=comparisonReviews[id]||{};return `<div class="comparison-question"><b>${E(({proto:'重建形式',zh:'汉语释义',en:'英语释义'})[c.field]||c.field.replace('reflex:','方言 '))}</b>${c.choices.map((v,i)=>`<p>${i+1}. ${E(v.value)}<br><small>${v.versions.map(x=>E(x.dataset+' · '+x.locator)).join('<br>')}</small></p>`).join('')}<label>审核 <select data-comparison-review="${E(id)}"><option value="">待核</option>${c.choices.map((v,i)=>`<option value="${i}" ${review.choice===String(i)?'selected':''}>采用 ${i+1}</option>`).join('')}<option value="keep" ${review.choice==='keep'?'selected':''}>保留异读</option><option value="manual" ${review.choice==='manual'?'selected':''}>另行修订</option></select></label><input data-comparison-note="${E(id)}" value="${E(review.note||'')}" aria-label="修订内容或依据" placeholder="修订内容或依据"></div>`}).join('')}<button data-export-comparison="true">导出审核结果</button><p class="tiny">审核保存在当前浏览器，导出后可用于整合。</p></section>`}
document.addEventListener('change',e=>{const id=e.target.dataset.comparisonReview||e.target.dataset.comparisonNote;if(!id)return;const old=comparisonReviews[id]||{};comparisonReviews[id]={...old,[e.target.dataset.comparisonReview?'choice':'note']:e.target.value};try{localStorage.setItem('tujia-comparison-reviews',JSON.stringify(comparisonReviews))}catch{toast('保存失败，请导出审核结果')}});
document.addEventListener('click',e=>{if(e.target.closest('[data-export-comparison]'))download('tujia-comparison-reviews.json',{version:1,reviews:comparisonReviews});if(e.target.closest('[data-comparison-only]')){state.comparisonOnly=!state.comparisonOnly;state.page=1;render()}});
