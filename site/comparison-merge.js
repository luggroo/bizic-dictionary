'use strict';
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
