// Display glosses are deduplicated independently in Chinese and English.
function dictionaryGlosses(values,language){
 const synonym=language==='zh'?{'姐':'姐姐','哥':'哥哥','弟':'弟弟','妹':'妹妹','爸':'爸爸','妈':'妈妈','鼻':'鼻子','耳':'耳朵','眼':'眼睛','舌':'舌头','牙':'牙齿','脖':'脖子'}:{'elder sister':'older sister','elder brother':'older brother'};
 const result=[],seen=new Set();
 for(const value of values){
  // Parenthetical qualifications and uncertain glosses stay attached to their senses.
  const parts=[];let depth=0,start=0;const text=String(value||'');
  for(let i=0;i<text.length;i++){if('（(['.includes(text[i]))depth++;if('）)]'.includes(text[i]))depth=Math.max(0,depth-1);if(!depth&&';；/／'.includes(text[i])){parts.push(text.slice(start,i));start=i+1;}}parts.push(text.slice(start));
  for(let part of parts){part=part.trim();if(!part)continue;let key=part.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();if(language==='en')key=key.replace(/^to (?:be )?/,'');key=synonym[key]||key;if(!seen.has(key)){seen.add(key);result.push(synonym[part]||part);}}
 }return result;
}
const YUBAO_GLOSS_REVIEW={
 'stedt-rn-288568':{zh:'燕子',evidence:'yubao-60757-v-1576'},
 'stedt-rn-362368':{zh:'燕子',evidence:'yubao-60757-v-1576'},
 'stedt-rn-127200':{zh:'吞咽',evidence:'yubao-60757-v-0765'},
 'stedt-rn-43490':{zh:'庹',evidence:'yubao-60757-v-2945'},
 'stedt-rn-289348':{zh:'升',evidence:'yubao-60757-v-2953'},
 'stedt-rn-290264':{zh:'升',evidence:'yubao-60824-v-2953'}
};
function applyYubaoGlossReview(data){
 for(const w of data.words){const r=YUBAO_GLOSS_REVIEW[w.id];if(!r)continue;w.originalDisplayZh=w.originalDisplayZh||w.zh;w.zh=r.zh;w.glossReview={method:'同方言同拼音、语义相容的语保条目核对',evidence:r.evidence};}
}
// Proposed same-form related-sense groups, separately by variety.
function mergeDictionaryWords(data){
 applyYubaoGlossReview(data);
 const byId=new Map(data.words.map(w=>[w.id,w])),removed=new Set(),aliases={...(data.wordAliases||{})};
 const unique=a=>[...new Set(a.filter(v=>v!==undefined&&v!==null&&v!==''))];
 for(const ids of WORD_MERGE_GROUPS){
  const ws=ids.map(id=>byId.get(id)).filter(Boolean);if(ws.length<2)continue;
  const kind=wordVarietyInfo(ws[0]).kind;
  if(!['longshan','south'].includes(kind)||ws.some(w=>wordVarietyInfo(w).kind!==kind))continue;
  const base=ws[0],out={...base};
  out.senses=ws.flatMap(w=>w.senses||[{zh:w.zh||'',en:w.en||'',wordIds:[w.id],attestationIds:(w.attestations||[]).map(a=>a.id)}]);
  out.zh=dictionaryGlosses(ws.map(w=>w.zh),'zh').join('; ');out.en=dictionaryGlosses(ws.map(w=>w.en),'en').join('; ');
  out.attestations=[...new Map(ws.flatMap(w=>w.attestations||[]).map(a=>[a.id,a])).values()];
  for(const key of ['sourceIds','schemes','dialects','collections','positions','categories','forms','glosses','zhVariants'])out[key]=unique(ws.flatMap(w=>w[key]||[]));
  out.forms=unique([...out.forms,...ws.map(w=>w.term)]);
  out.glosses=unique([...out.glosses,...ws.map(w=>w.en)]);
  out.zhVariants=unique([...out.zhVariants,...ws.map(w=>w.zh)]);
  out.notations={};
  for(const key of ['ye','brassett','ipa','accent']){
   const map=new Map();for(const v of ws.flatMap(w=>w.notations?.[key]||[])){
    const k=JSON.stringify([v.text,v.profile,v.method]);
    if(map.has(k))map.get(k).attestationIds=unique([...(map.get(k).attestationIds||[]),...(v.attestationIds||[])]);
    else map.set(k,{...v,attestationIds:[...(v.attestationIds||[])]});
   }out.notations[key]=[...map.values()];
  }
  out.mergedWordIds=unique(ws.flatMap(w=>w.mergedWordIds||[w.id]));
  byId.set(base.id,out);
  for(const w of ws.slice(1)){removed.add(w.id);aliases[w.id]=base.id}
 }
 // Resolve old aliases directly, so saved words and existing links survive.
 for(const old of Object.keys(aliases)){let id=aliases[old],seen=new Set([old]);while(aliases[id]&&!seen.has(id)){seen.add(id);id=aliases[id]}aliases[old]=id}
 data.words=data.words.filter(w=>!removed.has(w.id)).map(w=>byId.get(w.id));data.wordAliases=aliases;
}
