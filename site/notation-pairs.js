/* Source-scoped IPA/spelling evidence. Tables and converter share the same outputs.
 * Stored pairs are joined by attestation ID, never by gloss or a shared document ID.
 * Comparative data is read from its original TS/FX/XR column, before merging versions.
 */
'use strict';
const NOTATION_PAIR_SOURCES = {
 'zhou-ts':{title:'Brassett\nIPA',point:'TS'},
 'zhou-fx':{title:'Zhang 2002\nvia Zhou 2020',point:'FX'},
 'zhou-xr':{title:'Dai & Tian 2005\nvia Zhou 2020',point:'XR'},
 'stedt-7fd6565400':{title:'Sun 1991'},
 'stedt-610ab69a37':{title:'Huang & Dai 1992'},
 'stedt-24cc5bbb03':{title:'Chen 1986'},
 'yubao-60757':{title:'中国语保\n龙山'},
 'yubao-60756':{title:'中国语保\n阳朝'},
 'yubao-60823':{title:'中国语保\n碗米坡'}
};
const NP_ORDER=['b','p','m','f','w','d','t','n','l','z','c','s','r','j','q','x','y','g','k','h','hx','ng',''];
const NP_IPA_ONSETS=['tɕʰ','tsʰ','pʰ','tʰ','kʰ','dʑ','dz','tɕ','ts','ȵ','ɲ̟','ɲ','ŋ','ʑ','ɣ','ɸ','p','t','k','m','n','l','s','z','ɕ','x','j','w','b','d','g','ʔ','h'];
const NP_SPELLING_ONSETS=['hx','ng','zh','ch','sh','b','p','m','f','d','t','n','l','z','c','s','r','j','q','x','y','g','k','h','w'];
const NP_TONE_LETTERS={x:'1',f:'2',r:'3',v:'4'};
const NP_CACHE=new WeakMap();
// Explicit source-table supplements. They are labelled separately from word pairs.
// These entries do not draw from the converter's generic accepted-input dictionary.
const NP_SOURCE_TABLES={
 'zhou-ts':{
  reference:'Zhou 2020 §1.3，表1-5～1-7；Brassett 2006 §2.2、§2.6',
  onset:{b:'p',p:'pʰ',m:'m',w:'w',d:'t',t:'tʰ',n:'ȵ',l:'l',z:'ts',c:'tsʰ',s:'s',r:'z',j:'tɕ',q:'tɕʰ',x:'ɕ',y:'j',g:'k',k:'kʰ',h:'x',hx:'ɣ',ng:'ŋ'},
  rime:{a:'a',ai:'ai',an:'ã',ao:'au',e:'ɤ',ei:'ei',en:'ɛ̃',i:'i',ia:'ia',ian:'iɛ̃',iao:'iau',ie:'iɛ',in:'ĩ',iong:'iɔ̃',iu:'iu',o:'ɔ',ong:'ɔ̃',ou:'ou',u:'u',ua:'ua',uai:'uai',uan:'uã',ui:'uei',un:'uɜ̃'}
 },
 'zhou-fx':{
  reference:'Zhang 2002，经 Zhou 2020 §1.3、表1-7 引述',
  onset:{b:'p',p:'pʰ',m:'m',w:'w',d:'t',t:'tʰ',n:'ȵ',l:'l',z:'ts',c:'tsʰ',s:'s',r:'z',j:'tɕ',q:'tɕʰ',x:'ɕ',y:'j',g:'k',k:'kʰ',h:'x',ng:'ŋ'},
  rime:{a:'a',ai:'ai',an:'an',ao:'au',e:'e',ei:'ei',en:'en',i:'i',ia:'ia',ian:'iã',iao:'iau',ie:'ie',in:'in',iong:'ioŋ',iu:'iu',o:'o',ong:'oŋ',ou:'ou',u:'u',ua:'ua',uai:'uai',uan:'uan',ui:'uei'}
 },
 'zhou-xr':{
  reference:'Dai & Tian 2005，经 Zhou 2020 §1.3、表1-8～1-12 引述',
  onset:{b:'p',p:'pʰ',m:'m',w:'w',d:'t',t:'tʰ',n:'n',l:'l',z:'ts',c:'tsʰ',s:'s',r:'z',j:'tɕ',q:'tɕʰ',x:'ɕ',y:'ʑ',g:'k',k:'kʰ',h:'x',hx:'ɣ',ng:'ŋ'},
  rime:{a:'a',ai:'ɛ',an:'ã',ao:'ɔ',e:'e',ei:'ei',en:'ẽ',i:'i',ia:'ia',ian:'iɛ̃',ie:'ie',in:'ĩ',io:'iɔ',iu:'iu',o:'o',ong:'õ',u:'u',ua:'ua',uai:'uɛ',ui:'ui'}
 }
};
// Remove symbols copied from other points, including the unused generic FX ɯ/ɨ set.
// Original observations are retained; unsupported observations go to the audit report.
{
 const fx=NOTATION_CONFIG.profiles.find(p=>p.id==='zhou-fx');
 if(fx){
  const excluded=new Set(['ɤ','ɿ','ɨ','ɯ','ɯe','ɯi','ĩ','ã','ẽ','ɜ̃','uɜ̃','iɛ','iɛ̃','ɔ̃','iɔ̃','ang','aŋ']);
  fx.rhymeMap=Object.fromEntries(Object.entries(fx.rhymeMap).filter(([raw])=>!excluded.has(raw)));
  fx.rhymeMap.en=['eng'];
  fx.rules=(fx.rules||[]).filter(r=>r.kind!=='韵母'||!excluded.has(r.raw));
  if(!fx.rules.some(r=>r.kind==='韵母'&&r.raw==='en'))fx.rules.push({id:'zhou-fx:rhyme-en',kind:'韵母',raw:'en',target:'en',condition:'Brassett eng 对应本站 en',evidence:'FX 原始比较表 pbz-all-238：en³⁵；Zhou 2020 §1.3',status:'来源记音已核'});
  fx.notes=['按比较表 FX 列取词形。i／ei、e／ie 的条件对应见转写例词；不引用其他调查点的音值。'];
  fx.onsetMap.ɣ=[];
  fx.pointId='FX';
 }
 const xr=NOTATION_CONFIG.profiles.find(p=>p.id==='zhou-xr');
 if(xr){xr.onsetMap.n=['n'];xr.rhymeMap.iɔ=['io'];xr.pointId='XR';const nRule=xr.rules?.find(r=>r.kind==='声母'&&r.raw==='n');if(nRule){nRule.target='n';nRule.status='来源记音已核';nRule.condition='n 与 l 分列';}}
 const ts=NOTATION_CONFIG.profiles.find(p=>p.id==='zhou-ts');if(ts)ts.pointId='TS';
 // Keep the symbol used by the original source in phonology-rule descriptions.
 for(const id of ['stedt-7fd6565400','stedt-610ab69a37','stedt-24cc5bbb03']){
  const p=NOTATION_CONFIG.profiles.find(p=>p.id===id);
  for(const rule of p?.rules||[])if(rule.kind==='声母'&&rule.raw==='ɲ̟'&&String(rule.evidence||'').includes('ȵ'))rule.raw='ȵ';
 }
}

const NP_NASAL_DEFAULT_SOURCES=new Set(['zhou-ts','zhou-fx','zhou-xr','stedt-7fd6565400','stedt-610ab69a37','stedt-24cc5bbb03','yubao-60756','yubao-60823']);
const NP_NASAL_CONTRAST_SOURCES=new Set(['yubao-60757']);
for(const pid of NP_NASAL_DEFAULT_SOURCES){
 const p=NOTATION_CONFIG.profiles.find(x=>x.id===pid);
 if(!p?.rhymeMap)continue;
 for(const raw of ['ã','an','ang','aŋ'])if(p.rhymeMap[raw])
  p.rhymeMap[raw]=[...new Set(p.rhymeMap[raw].map(v=>v==='ang'?'an':v))];
}
function npCanonicalPair(out,pid){
 if(!NP_NASAL_DEFAULT_SOURCES.has(pid)||out.rime!=='ang')return out;
 const core=out.onset+'an';
 return {...out,core,rime:'an',text:core+out.tone,
  accent:accentSyllable(core,NP_TONE_LETTERS[out.tone]),sourceSpelling:out.text};
}
function npNormalize(raw){
 return plainTones(raw).normalize('NFC').replaceAll('ɡ','g').replaceAll('ɑ','a')
 .replaceAll('ʦ','ts').replaceAll('ʨ','tɕ').replaceAll('ʣ','dz').replaceAll('ʥ','dʑ')
 .replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ')
 .replaceAll('d͡z','dz').replaceAll('d͡ʑ','dʑ').replace(/(tɕ|ts|p|t|k)h/g,'$1ʰ');
}
function npIPASyllables(raw){
 return [...npNormalize(raw).matchAll(/([\p{L}\p{M}ʔ]+)([0-9]{1,3})(?![0-9])/gu)].map(m=>{
  const onset=NP_IPA_ONSETS.find(o=>m[1].startsWith(o))||'';
  return {text:m[0],core:m[1],onset,rime:m[1].slice(onset.length),tone:m[2]};
 });
}
function npSpellingSyllables(text){
 if(/[⟦⟧□]/.test(text))return [];
 const result=[];
 // Parse to the end of each chunk: final r in er/ier/uer is not a tone letter.
 for(const chunk of String(text).toLowerCase().match(/[a-züê]+/g)||[]){
  const memo=new Map();
  function parse(start){
   if(start===chunk.length)return [[]];if(memo.has(start))return memo.get(start);
   const alternatives=[];
   for(let end=start+1;end<chunk.length;end++){
    const tone=chunk[end];if(!Object.hasOwn(NP_TONE_LETTERS,tone))continue;
    const core=chunk.slice(start,end),onset=NP_SPELLING_ONSETS.find(o=>core.startsWith(o))||'',rime=core.slice(onset.length);
    if(!/^[aeiouüê]+(?:ng|n|r)?$/.test(rime))continue;
    for(const rest of parse(end+1)){
     alternatives.push([{text:core+tone,core,onset,rime,tone},...rest]);
     if(alternatives.length>1)break;
    }
    if(alternatives.length>1)break;
   }
   memo.set(start,alternatives);return alternatives;
  }
  const parsed=parse(0);if(parsed.length!==1)return [];result.push(...parsed[0]);
 }
 return result;
}
function npSymbol(raw){return raw.normalize('NFC').replace(/[\u0331\u0332]/g,'').replace(/ng$/,'ŋ');}
function npRecords(data,pid){
 const source=NOTATION_PAIR_SOURCES[pid],seen=new Set(),records=[];
 if(source.point){
  const originals=data.reconstructionOriginals||data.reconstructions||[];
  // 'all syllables' supplies one original observation per comparison row and point.
  for(const row of originals){
   if(row.dataset!=='原始比较表 · all syllables'||!row.reflexes?.[source.point])continue;
   const id=row.id+':'+source.point;if(seen.has(id))continue;seen.add(id);
   records.push({id,raw:String(row.reflexes[source.point]),gloss:row.zh||row.en||'',locator:row.locator+' · '+source.point,source:row.source,stored:[],linked:[]});
  }
  return records;
 }
 for(const word of data.words||[]){
  for(const a of word.attestations||[]){
   if(a.source!==pid||a.dialect==='南部'||seen.has(a.id))continue;seen.add(a.id);
   // Only pairs attached to this same observation are eligible.
   const stored=(word.notations?.ye||[]).filter(v=>v.attestationIds?.includes(a.id)&&(!v.profile||v.profile===pid));
   const linked=(word.notations?.ye||[]).filter(v=>!stored.includes(v)&&['source','source-normalized','user-reviewed','derived'].includes(v.method));
   records.push({id:a.id,wordId:word.id,raw:a.term,gloss:a.zh||word.zh||a.en||'',locator:a.locator||'',source:a.source,stored,linked});
  }
 }
 return records;
}
function npConvertUnit(unit,pid){
 const r=convertNotation(unit.text,pid);
 if(r.error)return {outputs:[],reason:r.error};
 const outputs=(r.rows||[]).filter(row=>row.ye&&!/[⟦⟧□]/.test(row.ye)).flatMap(row=>{
  const parts=npSpellingSyllables(row.ye);
  return parts.length===1?[{...parts[0],accent:row.accent||accentSyllable(parts[0].core,NP_TONE_LETTERS[parts[0].tone]),method:r.reviewed?'user-reviewed':'current-converter'}]:[];
 });
 return {outputs,reason:r.partial?'部分转写':''};
}
function npIndexSource(data,pid){
 const records=npRecords(data,pid),index={pid,records:records.length,syllables:0,paired:0,stored:0,linked:0,generated:0,onset:new Map(),rime:new Map(),tone:new Map(),unresolved:[]};
 function add(kind,key,value,unit,out,record,position){
  if(!index[kind].has(key))index[kind].set(key,new Map());
  const cells=index[kind].get(key);value=npSymbol(value);
  if(!cells.has(value))cells.set(value,{value,count:0,onsets:new Set(),examples:[],basis:'pairs'});
  const cell=cells.get(value);cell.count++;cell.onsets.add(npSymbol(unit.onset));
  if(cell.examples.length<8)cell.examples.push({recordId:record.id,wordId:record.wordId,raw:record.raw,gloss:record.gloss,locator:record.locator,source:record.source,ipa:phon(unit.text),spelling:out.text,accent:out.accent||accentSyllable(out.core,NP_TONE_LETTERS[out.tone]),method:out.method,position});
 }
 for(const record of records){
  const units=npIPASyllables(pid==='yubao-60823'?surveyIPA(record.raw,'60823'):record.raw);index.syllables+=units.length;
  const stored=record.stored.map(v=>({parts:npSpellingSyllables(v.text),method:v.method})).filter(v=>v.parts.length===units.length);
  const linked=(record.linked||[]).map(v=>({parts:npSpellingSyllables(v.text),profile:v.profile})).filter(v=>v.parts.length===units.length);
  units.forEach((unit,position)=>{
   let outputs,reason='';
   if(stored.length)outputs=stored.map(v=>({...v.parts[position],method:'stored:'+v.method}));
   else {
    const converted=npConvertUnit(unit,pid);outputs=converted.outputs;reason=converted.reason;
    // A pre-existing same-entry spelling may select one compatible candidate.
    // It may not create a new sound correspondence or override a conflicting tone.
    const supported=linked.map(v=>({...v.parts[position],method:'entry-linked:'+v.profile})).filter(v=>outputs.some(o=>o.text===v.text));
    if(new Set(supported.map(v=>v.text)).size===1)outputs=[supported[0]];
   }
   outputs=outputs.map(out=>npCanonicalPair(out,pid));
   const cores=[...new Set(outputs.map(o=>o.core))];
   if(cores.length!==1){index.unresolved.push({id:record.id,raw:record.raw,gloss:record.gloss,syllable:phon(unit.text),candidates:[...new Set(outputs.map(o=>o.text))],reason:reason||'多种拼写'});return;}
   const out=outputs[0];index.paired++;if(out.method.startsWith('stored:'))index.stored++;else if(out.method.startsWith('entry-linked:'))index.linked++;else index.generated++;
   add('onset',out.onset,unit.onset,unit,out,record,position);
   add('rime',out.rime,unit.rime,unit,out,record,position);
   if(new Set(outputs.map(o=>o.tone)).size===1){
        const unmarked=pid==='yubao-60823'&&unit.tone==='33';
    const key=out.tone+'|'+(unmarked?'a':accentSyllable('a',NP_TONE_LETTERS[out.tone]));
    add('tone',key,unit.tone,unit,out,record,position);
   }
  });
 }
 return index;
}
function notationPairAudit(data=D){
 if(NP_CACHE.has(data))return NP_CACHE.get(data);
 const sources=new Map(Object.keys(NOTATION_PAIR_SOURCES).map(pid=>[pid,npIndexSource(data,pid)]));
 const result={sources};NP_CACHE.set(data,result);return result;
}
function npCell(pid,kind,key,data=D){
 const index=notationPairAudit(data).sources.get(pid);
 const values=new Map(index?.[kind].get(key)||[]);
 const declared=NP_SOURCE_TABLES[pid]?.[kind]?.[key];
 if(!values.size&&declared)values.set(declared,{value:declared,count:0,onsets:new Set(),examples:[],basis:'source-table',reference:NP_SOURCE_TABLES[pid].reference});
 return [...values.values()].sort((a,b)=>b.count-a.count||a.value.localeCompare(b.value));
}
function npBrassett(kind,key){
 if(kind==='onset')return Object.keys(NOTATION_CONFIG.onsets).filter(raw=>(raw==='hh'?'hx':raw)===key).join(' / ');
 if(kind==='rime')return Object.keys(NOTATION_CONFIG.rimes).filter(raw=>(raw==='ang'?'an':standardBrassettToYe(raw))===key).join(' / ');
 return NP_TONE_LETTERS[key.split('|')[0]]||'';
}
function npFootnote(pid,kind,key){
 if(kind!=='rime')return '';
 if(pid==='zhou-fx'&&key==='i')return '1';
 if(pid==='zhou-fx'&&['e','ie'].includes(key))return '2';
 if(pid==='zhou-fx'&&['an','en','in'].includes(key))return '3';
 if(pid==='zhou-ts'&&key==='i')return '4';
 if(pid==='zhou-xr'&&['e','ie'].includes(key))return '1';
 if(pid==='zhou-xr'&&key==='i')return '2';
 if(pid==='yubao-60756'&&['e','ei','ie'].includes(key))return '3';
 return '';
}
function npCellHTML(pid,kind,key,data){
 const values=npCell(pid,kind,key,data);if(!values.length)return '<span class="np-empty" aria-label="当前资料未见对应"></span>';
 const note=npFootnote(pid,kind,key),label=values.map(v=>v.value||'∅').join(' / ');
 return `<button class="np-cell" data-pair-source="${E(pid)}" data-pair-kind="${kind}" data-pair-key="${E(key)}" aria-label="查看 ${E(label)} 的转写依据">${E(label)}${note?`<sup>${note}</sup>`:''}</button>`;
}
function npKeys(ids,kind,data,brassett){
 const keys=new Set();const audit=notationPairAudit(data);
 for(const id of ids){for(const key of audit.sources.get(id)?.[kind].keys()||[])keys.add(key);for(const key of Object.keys(NP_SOURCE_TABLES[id]?.[kind]||{}))keys.add(key);}
 if(brassett){
  if(kind==='onset')for(const key of Object.keys(NOTATION_CONFIG.onsets))keys.add(key==='hh'?'hx':key);
  if(kind==='rime')for(const key of Object.keys(NOTATION_CONFIG.rimes))keys.add(key==='ang'?'an':standardBrassettToYe(key));
  if(kind==='tone')for(const [letter,tone]of Object.entries(NP_TONE_LETTERS))keys.add(letter+'|'+accentSyllable('a',tone));
 }
 return [...keys].sort((a,b)=>kind==='onset'?(NP_ORDER.indexOf(a)-NP_ORDER.indexOf(b)||a.localeCompare(b)):kind==='tone'?('xfrv'.indexOf(a[0])-'xfrv'.indexOf(b[0])||a.localeCompare(b)):a.localeCompare(b,'en'));
}
function npTable(title,ids,kind,data,brassett){
 const head=['叶式 / 调号',...(brassett?['Brassett\n拼音']:[]),...ids.map(id=>NOTATION_PAIR_SOURCES[id].title)];
 const keys=npKeys(ids,kind,data,brassett);
 const body=items=>items.map(key=>{
  const label=kind==='tone'?key.replace('|',' · '):key||'∅';
  const cells=[...(brassett?[E(npBrassett(kind,key))]:[]),...ids.map(id=>npCellHTML(id,kind,key,data))];
  return `<tr><th scope="row">${E(label)}</th>${cells.map(cell=>`<td>${cell}</td>`).join('')}</tr>`;
 }).join('');
 const table=items=>`<div class="table-wrap"><table data-notation-kind="${kind}"><thead><tr>${head.map((h,i)=>`<th scope="col"${i?'':' class="np-key"'}>${E(h)}</th>`).join('')}</tr></thead><tbody>${body(items)}</tbody></table></div>`;
 if(head.length<=4&&kind!=='tone'&&keys.length>=12){
  const half=Math.ceil(keys.length/2);
  return `<div class="np-split-host"><h3>${E(title)}</h3><div class="np-split ${head.length===4?'np-split-four':'np-split-three'}">${table(keys.slice(0,half))}${table(keys.slice(half))}</div></div>`;
 }
 return `<h3>${E(title)}</h3>${table(keys)}`;
}
function notationPairTables(place,data=D){
 const isYang=place==='yangchao',isWan=place==='wanmipo';
 const ids=isWan?['yubao-60823']:isYang?['zhou-xr','yubao-60756']:['zhou-ts','zhou-fx','stedt-7fd6565400','stedt-610ab69a37','stedt-24cc5bbb03','yubao-60757'];
 const notes=isWan?'<p>33 写 r，调号不标；31 也写 r，调号写 ǎ。</p>':isYang?
 '<p>¹ 仙仁 e、ɯe、ɯɛ、ɯə、ə，以及 ie、iɛ 的分布见 Zhou 2020 表1-10～1-12；表内保留实际配对的记号。² 仙仁 i 的条件读音包括软腭音后的 ɯ、齿音后的 ɿ。³ 语保阳朝 e 一般转 ei；腭音后的 e／ɛ 按整音节写 jie、qie、xie、ye。仙仁 33→r、54→v、55→x。</p>':
 '<p>¹ Zhang 的 i 行为 i／ei。软腭音后的 ei 转 i；零声母 ei 按整音节写 hxi。² Zhang 的 e 在 t、tʰ、l 及腭音后转 ie，其他环境转 e；原文 ie 保留。³ 未发现前后鼻音对立的资料统一写 an；龙山语保有 lan⁵⁵（现在）与 laŋ⁵⁵（火种），分别写 an 与 ang。Brassett 原书的 ang 记号保留在原拼音列。⁴ Brassett 独立韵母 i 在软腭音后为 ɨ、齿音后为 ɿ。</p>';
 return `<div class="notation-matrix np-matrix"><p class="tiny">点击记音查看原词形、拼音和出处。词条未收录的音系项附表号；多解另列。</p>${npTable('声母',ids,'onset',data,!isYang&&!isWan)}${npTable('韵母',ids,'rime',data,!isYang&&!isWan)}${npTable('声调',ids,'tone',data,!isYang&&!isWan)}<div class="tiny np-notes">${notes}</div>${npAuditSummary(ids,data)}</div>`;
}
function npAuditSummary(ids,data){
 const audit=notationPairAudit(data);
 return `<details class="np-audit"><summary>数据核对</summary><p class="tiny">来源记录内按音节对齐。优先采用数据库已存配对；同条目拼写可核对或消歧，其余使用词条当前的转写结果。转写结果不作为原书音位分析的独立证据。</p><div class="table-wrap"><table><thead><tr><th>来源</th><th>原记录</th><th>音节</th><th>唯一配对</th><th>多解／未解析</th></tr></thead><tbody>${ids.map(id=>{const x=audit.sources.get(id);return `<tr><td>${E(NOTATION_PAIR_SOURCES[id].title)}</td><td>${x.records}</td><td>${x.syllables}</td><td>${x.paired}</td><td><button class="np-cell" data-pair-source="${id}" data-pair-kind="unresolved" data-pair-key="">${x.unresolved.length}</button></td></tr>`}).join('')}</tbody></table></div></details>`;
}
function notationPairSourceReview(p){
 if(!NOTATION_PAIR_SOURCES[p.id])return null;
 const x=notationPairAudit().sources.get(p.id);
 return `<section class="source-review"><h3>${E(NOTATION_PAIR_SOURCES[p.id].title)}</h3>${npAuditSummary([p.id],D)}${npTable('声母',[p.id],'onset',D,false)}${npTable('韵母',[p.id],'rime',D,false)}${npTable('声调',[p.id],'tone',D,false)}</section>`;
}
function npShowEvidence(pid,kind,key){
 const label=NOTATION_PAIR_SOURCES[pid]?.title||pid,index=notationPairAudit().sources.get(pid);if(!index)return;
 let body='';
 if(kind==='unresolved'){
  body=mappingTable('多解／未解析',['原词形','音节','释义','候选／原因'],index.unresolved.map(r=>[r.raw,r.syllable,r.gloss,r.candidates.join(' / ')||r.reason]));
 }else{
  const cells=npCell(pid,kind,key);
  body=`<h2>${E(key.replace('|',' · ')||'∅')}</h2>`+cells.map(cell=>{
   if(cell.basis==='source-table')return `<h3>${E(cell.value)}</h3><p>${E(cell.reference)}</p><p class="tiny">音系表项目；当前词条未提供实例。</p>`;
   return `<h3>${E(cell.value||'∅')} <small>· ${cell.count} 个音节</small></h3><p class="tiny">声母环境：${E([...cell.onsets].map(x=>x||'∅').join('、'))}</p>`+mappingTable('例词',['原记音','叶式拼音','调号拼音','词义','记录／出处'],cell.examples.map(e=>[e.ipa,e.spelling,e.accent,e.gloss,e.recordId+' · '+e.locator]))+`<p class="tiny">${cell.examples.some(e=>e.method.startsWith('stored:'))?'含数据库已存的同记录配对。':cell.examples.some(e=>e.method.startsWith('entry-linked:'))?'含数据库同条目拼写核对。':'拼音为本站当前转换结果。'}原词形与来源记录保留。</p>`;
  }).join('');
 }
 document.querySelector('#detail-label').textContent=label.replace(/\n/g,' · ');
 document.querySelector('#detail-spelling-control').innerHTML='';
 document.querySelector('#detail-body').innerHTML=body;
 if(typeof currentDetail!=='undefined')currentDetail=null;
 const dialog=document.querySelector('#detail');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
}
document.addEventListener('click',event=>{const el=event.target.closest('[data-pair-source]');if(el)npShowEvidence(el.dataset.pairSource,el.dataset.pairKind,el.dataset.pairKey);});
