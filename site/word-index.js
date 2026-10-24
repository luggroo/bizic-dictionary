/* Compact search summaries; complete entries are fetched only when opened. */
'use strict';
const WordIndex=(()=>{
 const unique=values=>[...new Set(values)];
 const forms=w=>unique([w.term,...w._ipa,...Object.values(w._display).flatMap(values=>values.map(v=>v.text))].map(searchNormalize));
 const chinese=w=>unique([w.zh].filter(Boolean).flatMap(s=>s.split(/[;；/／]/)).map(normalize));
 const english=w=>unique([w.en].filter(Boolean).flatMap(s=>searchableEnglish(s).split(/[;；/／]/)).map(normalize));
 const references=(values,base)=>unique(values).map(value=>base.includes(value)?base.indexOf(value):value);
 const restore=(values,base)=>values.map(value=>typeof value==='number'?base[value]:value);
 function pack(words,wordAliases){
  const keys=unique(words.flatMap(Object.keys)).filter(key=>key!=='_search');
  return {format:2,keys,columns:keys.map(key=>words.map(w=>w[key]??null)),search:{
   forms:words.map(w=>references(w._search.forms,forms(w))),
   chinese:words.map(w=>references(w._search.chinese,chinese(w))),
   english:words.map(w=>references(w._search.english,english(w))),
   glottal:words.map(w=>w._search.hasGlottal?1:0)
  },wordAliases};
 }
 function unpack(payload){
  if(payload?.format!==2){if(Array.isArray(payload?.words))return payload;throw Error('Invalid word search data');}
  const count=payload.columns?.[0]?.length;
  if(!Array.isArray(payload.keys)||!payload.keys.length||payload.keys.length!==payload.columns.length||
   !payload.columns.every(column=>Array.isArray(column)&&column.length===count)||
   !['forms','chinese','english','glottal'].every(key=>Array.isArray(payload.search?.[key])&&payload.search[key].length===count))throw Error('Incomplete word search data');
  const words=payload.columns[0].map((_,i)=>{
   const w={};
   payload.keys.forEach((key,k)=>{const value=payload.columns[k][i];if(value!==null||key==='_classReview')w[key]=value;});
   w._entry=w.id;
   const s=payload.search;
   const en=restore(s.english[i],english(w));
   w._search={forms:restore(s.forms[i],forms(w)),chinese:restore(s.chinese[i],chinese(w)),english:en,
    englishWords:new Set(en.flatMap(englishTokens)),hasGlottal:!!s.glottal[i]};
   return w;
  });
  return {words,wordAliases:payload.wordAliases};
 }
 return {pack,unpack};
})();
