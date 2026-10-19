'use strict';
const comparisonNorm=v=>String(v??'').normalize('NFC').replaceAll('／','/').replace(/\s+/g,'').trim();
function mergeComparisons(data){
 data.reconstructionOriginals=data.reconstructions;
 // User-reviewed: ? denotes unknown tone; retain it when removing the @ prefix.
 const excludedCrossWordRows=new Set(["pbz-bi-11", "pbz-bi-13", "pbz-bi-15", "pbz-bi-17", "pbz-bi-19", "pbz-bi-21", "pbz-bi-23", "pbz-bi-25", "pbz-bi-27", "pbz-bi-29", "pbz-bi-31", "pbz-bi-33", "pbz-bi-39", "pbz-bi-41", "pbz-bi-43", "pbz-bi-45", "pbz-bi-47", "pbz-bi-49", "pbz-bi-51", "pbz-bi-53", "pbz-bi-55", "pbz-bi-57", "pbz-bi-59", "pbz-bi-61", "pbz-bi-63", "pbz-bi-65", "pbz-bi-67", "pbz-bi-69", "pbz-bi-71", "pbz-bi-73", "pbz-bi-75", "pbz-bi-77", "pbz-bi-79", "pbz-bi-85", "pbz-bi-87", "pbz-bi-89", "pbz-bi-91", "pbz-bi-93", "pbz-bi-95", "pbz-bi-97", "pbz-bi-99", "pbz-bi-101", "pbz-bi-103", "pbz-bi-105", "pbz-bi-107", "pbz-bi-109", "pbz-bi-111", "pbz-bi-113", "pbz-bi-115", "pbz-bi-117"]);
 const raw=data.reconstructions.filter(r=>!excludedCrossWordRows.has(r.id)).map(r=>({...r,proto:String(r.proto||'').replaceAll('@','')}));
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
