const NOTATION_LABELS={ye:'叶式拼音',brassett:'Brassett 拼音',ipa:'IPA',accent:'调号拼音'};
const SUPER_DIGITS='⁰¹²³⁴⁵⁶⁷⁸⁹';
const phon=s=>String(s??'').replaceAll('\\u2009',' ').replace(/([\p{L}\p{M}\]])([0-9]+)/gu,(_,a,n)=>a+[...n].map(x=>SUPER_DIGITS[Number(x)]).join(''));
const plainTones=s=>String(s??'').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>String(SUPER_DIGITS.indexOf(c)));
const allSup=s=>String(s).replace(/[0-9]/g,c=>SUPER_DIGITS[Number(c)]);
let transcriptionEdits={};try{transcriptionEdits=JSON.parse(localStorage.getItem('tujia-transcriptions-v1')||'{}')}catch{}
let notationState={source:'brassett-phonetic',input:'kɨ²¹',result:null};
const sourceNotationCache=new WeakMap();
function sourceNotationValues(w){
 if(sourceNotationCache.has(w))return sourceNotationCache.get(w);
 const values={ye:[],brassett:[],ipa:[],accent:[]};
 for(const a of w.attestations||[]){
  if(a.dialect==='南部')continue;
  const pid=a.source==='stedt-cb523fc3dc'&&a.dialect==='北部'?a.source+':north':a.source;
  const p=NOTATION_CONFIG.profiles.find(p=>p.id===pid);
  if(!p?.mappingMode||p.conversionEnabled===false||p.kind!=='ipa')continue;
  // An unresolved alternate must not hide another fully transcribed alternate.
  for(const term of p.mappingMode==='tian-north'?a.term.split(/[~～]/):[a.term]){
  const r=convertNotation(term,p.id);if(r.error)continue;
  for(const row of r.rows)for(const kind of ['ye','brassett']){
   const text=row[kind];if(!text)continue;
   const existing=values[kind].find(v=>v.text===text&&v.profile===p.id);
   if(existing){existing.attestationIds.push(a.id);continue}
   values[kind].push({text,method:r.reviewed?'user-reviewed':r.partial?'source-partial':'source-candidate',ambiguous:!!r.ambiguous,profile:p.id,attestationIds:[a.id]});
  }
 }
 }
 sourceNotationCache.set(w,values);return values;
}
function notationValues(w,kind){return [...(w.notations?.[kind]||[]),...sourceNotationValues(w)[kind].filter(v=>!(w.notations?.[kind]||[]).some(x=>x.text===v.text)),...(transcriptionEdits[w.id]?.[kind]||'').split('\n').map(t=>t.trim()).filter(Boolean).map(text=>({text,method:'user',profile:'',attestationIds:[]}))]}
let spellingDisplay='accent';try{if(localStorage.getItem('tujia-north-spelling-v2')==='ye')spellingDisplay='ye'}catch{}
const TONE_MARKS={1:'\u0304',2:'\u0301',3:'\u030c',4:'\u0300'};
function accentSyllable(core,tone){
 const lower=core.toLowerCase();let i=lower.indexOf('a');if(i<0)i=lower.indexOf('e');if(i<0)i=lower.indexOf('o');
 if(i<0){for(let k=core.length-1;k>=0;k--)if('iuü'.includes(lower[k])){i=k;break}}
 if(i<0)i=lower.search(/[mn]/);if(i<0)return core;
 return (core.slice(0,i+1)+TONE_MARKS[tone]+core.slice(i+1)).normalize('NFC');
}
// Keep word spacing; use an apostrophe at ambiguous syllable boundaries.
function accentTagged(text,pattern,decode){let end=-1,previous='';return String(text).replace(pattern,(match,core,tone,offset)=>{const part=decode(core,tone),boundary=offset===end&&(/^[aeiouüê]/i.test(part.core)||(/n$/i.test(previous)&&/^g/i.test(part.core)));end=offset+match.length;previous=part.core;return (boundary?"'":'')+accentSyllable(part.core,part.tone)})}
function yeToAccent(text){return String(text).split(/(⟦[^⟧]*⟧)/g).map(part=>part.startsWith('⟦')?'□':accentTagged(part,/([a-züê]*?[aeiouüê][a-züê]*?)([xfrv])/gi,(core,t)=>({core,tone:{x:1,f:2,r:3,v:4}[t.toLowerCase()]}))).join('')}
function displayBrassett(text,mode=spellingDisplay){const raw=plainTones(text);if(mode==='accent')return accentTagged(raw,/([a-z]+)\s*([1-4])(?![0-9])/gi,(core,tone)=>({core:standardBrassettToYe(core.toLowerCase()),tone}));return raw.replace(/([a-z]+)\s*([1-4])(?![0-9])/gi,(_,core,t)=>standardBrassettToYe(core.toLowerCase())+{1:'x',2:'f',3:'r',4:'v'}[t])}
function accentForNotation(w,v){if(v.accent)return v.accent;const b=notationValues(w,'brassett').find(b=>standardBrassettToYe(plainTones(b.text))===v.text);return b?displayBrassett(b.text,'accent').replace(/⟦[^⟧]*⟧/g,'□'):yeToAccent(v.text)}
function visibleNotationValues(w){if(isSouthernWord(w))return southernNotationValues(w).map(v=>({...v,text:v[southernDisplay==='poj'?'poj':'accent']}));const vals=notationValues(w,'ye');return vals.map(v=>({...v,text:typeof reviewedSpelling==='function'?reviewedSpelling(w,spellingDisplay==='accent'?accentForNotation(w,v):v.text.replace(/⟦[^⟧]*⟧/g,'□'),spellingDisplay):(spellingDisplay==='accent'?accentForNotation(w,v):v.text.replace(/⟦[^⟧]*⟧/g,'□'))})).filter((v,i,a)=>a.findIndex(x=>x.text===v.text)===i)}
function wordIPA(w){return [...new Set(notationValues(w,'ipa').map(v=>phon(v.text)).filter(Boolean))]}
function completeSpellings(w){return visibleNotationValues(w).filter(v=>v.method!=='source-partial'&&!/[□⟦⟧]/.test(v.text))}
function notationHead(w){return completeSpellings(w)[0]?.text||wordIPA(w)[0]||phon(w.term)}
function ipaSubtitle(w){const ipa=wordIPA(w);return completeSpellings(w).length&&ipa.length?`<div class="word-ipa">${ipa.map(E).join(' · ')}</div>`:!ipa.length?'<div class="tiny">IPA 待校核</div>':''}
function notationCells(w,compact=false){const values=completeSpellings(w),ipa=wordIPA(w),shown=compact?values.slice(1,3):values.slice(1);return ipaSubtitle(w)+(!values.length&&ipa.length>1?`<div class="word-ipa">${ipa.slice(1).map(E).join(' · ')}</div>`:'')+shown.map(v=>`<div class="notation-form">${E(v.text)}</div>`).join('')+(values.some(v=>v.ambiguous)?'<small class="tiny">多种候选</small>':'')+(compact&&values.length>3?`<small class="tiny">另 ${values.length-3} 种</small>`:'')}

function spellingSelector(item=null){
 const south=item?isSouthernWord(item):(state.dialect==='南部'||(state.view==='grammar'&&state.grammarDialect==='south'));
 const north=item?!south:(!south&&(!!state.dialect||state.view==='grammar'));
 const select=(region,label,value,options)=>`<label class="spelling-selector">${label}<select data-spelling-display="${region}" aria-label="${label}拼音显示">${options.map(([v,t])=>`<option value="${v}" ${value===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
 return (!south?select('north','北部',spellingDisplay,[['accent','调号拼音'],['ye','叶式拼音']]):'')+(!north?select('south','南部',southernDisplay,[['accent','调号拼音'],['poj','白话字拼音']]):'');
}
function transcriptionEditor(w){const own=transcriptionEdits[w.id]||{};return `<details class="transcription-editor"><summary>编辑记音</summary><p class="tiny">每行一种词形。</p><form id="transcription-form">${Object.entries(NOTATION_LABELS).map(([k,label])=>`<label>${label}<textarea data-notation-field="${k}" rows="2" placeholder="尚缺的记音或更正建议">${E(own[k]||'')}</textarea></label>`).join('')}<label>来源、页码／修订理由<textarea data-notation-field="evidence" rows="2">${E(own.evidence||'')}</textarea></label><button type="submit">保存补充</button></form></details>`}
function bindTranscriptionEditor(w){const form=document.querySelector('#transcription-form');if(!form)return;form.onsubmit=e=>{e.preventDefault();const item={};form.querySelectorAll('[data-notation-field]').forEach(el=>item[el.dataset.notationField]=el.value.trim());transcriptionEdits[w.id]=item;try{localStorage.setItem('tujia-transcriptions-v1',JSON.stringify(transcriptionEdits));toast('记音补充已保存至本机');openDetail(w.id)}catch{toast('本机保存失败，请先导出备份')}}}
function migrateTranscriptions(){for(const [old,id]of Object.entries(D.wordAliases||{})){if(!transcriptionEdits[old])continue;const dest=transcriptionEdits[id]||{};for(const [k,v]of Object.entries(transcriptionEdits[old]))if(v&&!String(dest[k]||'').split('\n').includes(v))dest[k]=dest[k]?dest[k]+'\n'+v:v;transcriptionEdits[id]=dest;delete transcriptionEdits[old]}}
function standardBrassettToYe(text){return text.replaceAll('hh','hx').replaceAll('eng','en').replaceAll('ing','in').replaceAll('uo','o').replace(/[1-4]/g,c=>({1:'x',2:'f',3:'r',4:'v'}[c]))}
function standardSyllableIPA(core){const onset=Object.keys(NOTATION_CONFIG.onsets).filter(Boolean).sort((a,b)=>b.length-a.length).find(k=>core.startsWith(k))||'',rhyme=core.slice(onset.length);let vowel=NOTATION_CONFIG.rimes[rhyme];if(!vowel)return null;if(rhyme==='i'){if(['g','h','k','hh'].includes(onset))vowel='ɨ';else if(['z','c','s','r'].includes(onset))vowel='ɿ'}if(onset==='y'&&rhyme==='e')vowel='e';return NOTATION_CONFIG.onsets[onset]+vowel}
function standardBrassettIPA(text){let out='',pos=0;for(const m of text.matchAll(/([a-z]+)([1-4])/g)){const sep=text.slice(pos,m.index);if(sep!==''&&sep!=='-')return null;const part=standardSyllableIPA(m[1]);if(!part)return null;out+=sep+part+allSup(NOTATION_CONFIG.tones[m[2]].pitch);pos=m.index+m[0].length}return out&&pos===text.length?out:null}
function reverseYe(text){const memo=new Map(),lookup=NOTATION_CONFIG.yeSyllables;function visit(pos){if(pos===text.length)return [''];if(memo.has(pos))return memo.get(pos);let result=[];for(let end=pos+1;end<text.length;end++){const core=text.slice(pos,end),tone={x:'1',f:'2',r:'3',v:'4'}[text[end]];if(!tone||!lookup[core])continue;for(const raw of lookup[core])for(const tail of visit(end+1)){result.push(raw+tone+tail);if(result.length>=16)break}if(result.length>=16)break}result=[...new Set(result)].slice(0,16);memo.set(pos,result);return result}return visit(0)}
// A source profile is an explicit proposal, never a global IPA substitution.
// After the palatal y onset, spell medial-i rimes as conventional y-initial syllables.
// Do not change standalone yi, yin, or unrelated consonant classes.
function normalizeYInitialSyllable(core){
 if(!core.startsWith('y'))return core;
 const rest=core.slice(1);
 const changes={ia:'a',iao:'ao',ian:'an',iang:'ang',ie:'e',io:'o',iong:'ong',iu:'ou',iua:'ua',iuan:'uan'};
 return 'y'+(changes[rest]||rest);
}
function sourceSyllableCores(core,p){
 if(p.mappingMode==='tian-north'){
  core=core.replaceAll('ɑ','a').normalize('NFC');
  if(p.syllableMap[core])return p.syllableMap[core];
  const on=Object.keys(p.onsetMap).filter(Boolean).sort((a,b)=>b.length-a.length).find(x=>core.startsWith(x))||'',r=core.slice(on.length);
  let rs=p.rhymeMap[r];if(!rs)return [];
  if(r==='o'&&!['p','pʰ','m','w'].includes(on))rs=['uo'];
  if(on==='j'&&r.startsWith('i')&&r.length>1)rs=rs.map(x=>x==='iu'?'ou':x.slice(1));
  return (p.onsetMap[on]||[]).flatMap(o=>rs.map(v=>o+v));
 }
 if(!p.mappingMode)return NOTATION_CONFIG.ipaSyllables[core];
 for(const [a,b] of Object.entries(p.symbolNormalization||{}))core=core.replaceAll(a,b);
 const on=Object.keys(p.onsetMap).filter(Boolean).sort((a,b)=>b.length-a.length).find(x=>core.startsWith(x))||'', r=core.slice(on.length), mode=p.mappingMode;
 let ons=p.onsetMap[on]||[],rs=p.rhymeMap[r]||[];
 if(r==='ɯ'&&!p.reviewedVowels&&!['k','kʰ','x','ɣ'].includes(on))return [];
 if(r==='ɿ'&&!['ts','tsʰ','s','z'].includes(on))return [];
 if(r==='ɨ'&&!['k','kʰ','x','ɣ'].includes(on))return [];
 if(mode==='zhou-xl'&&r==='i'&&['ts','tsʰ','s','z'].includes(on))return [];
 if(r==='i')rs=['i'];
 if(r==='o'&&['sunhuang','zhou-fx','zhou-xl','chen'].includes(mode))rs=[['p','pʰ','m','w'].includes(on)?'o':'uo'];
 if(mode==='zhou-fx'&&r==='e')rs=[['t','tʰ','l','tɕ','tɕʰ','ɕ','ɲ̟'].includes(on)?'ie':'e'];
 if(mode==='zhou-fx'&&r==='ei'){if(!on)return ['hhi'];rs=[['k','kʰ','x','ɣ'].includes(on)?'i':'ei']}
 if(mode==='chen'&&r==='e'&&['tɕ','tɕʰ','ɕ','ɲ̟'].includes(on))rs=['ie'];
 return [...new Set(ons.flatMap(o=>rs.map(v=>mode==='zhou-xr'&&o==='y'?normalizeYInitialSyllable(o+v):o+v)))];
}
function convertNotationAtomic(input,pid){const profile=NOTATION_CONFIG.profiles.find(p=>p.id===pid);if(!profile)return {error:'尚无此来源的独立规则。'};if(profile.conversionEnabled===false)return {error:profile.status+'。原始输入：'+phon(input)};if(['legacy','south'].includes(profile.kind))return {error:profile.status+'。'+(profile.notes||[]).join(' ')};let s=plainTones(input).normalize('NFC').trim().replaceAll('\\u2009','').replace(/\s+/g,''),options=[];if(profile.kind==='brassett'){s=s.toLowerCase();if(!/^-?(?:[a-z]+[1-4])+$/.test(s))return {error:'仅处理完整带调音节；括注、异读分隔、无调形式或未知数字请逐项核对。'};options=[s.replace(/[1-4]/g,c=>profile.toneMap[c]?.[0]||c)]}else if(profile.kind==='ye'){options=reverseYe(s.toLowerCase());if(!options.length)return {error:'这段叶式拼音没有唯一可核的音节分解。请分词检查；不猜测未收录或无调音节。'}}else{s=s.replace(/^\[/,'').replace(/\]$/,'').replace(/^\//,'').replace(/\/$/,'').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ').replaceAll('ȵ','ɲ̟').replace(/(tɕ|ts|p|t|k)h/g,'$1ʰ');let pos=0;options=[''];for(const m of s.matchAll(/([^0-9]+)([0-9]+)/g)){if(m.index!==pos)return {error:'音节边界未解析，保留原文。'};const cores=sourceSyllableCores(m[1],profile),tones=profile.toneMap?.[m[2]];if(!cores?.length||!tones?.length)return {error:`来源 ${profile.title} 中的 ${phon(m[0])} 尚无已核映射（${!cores?.length?'音值／韵母或i的条件分布':'调值'}）。原形保持不变。`};options=options.flatMap(prefix=>cores.flatMap(core=>tones.map(t=>prefix+core+t))).slice(0,16);pos=m.index+m[0].length}if(!pos||pos!==s.length)return {error:'请输入每个音节都带数字调值的IPA，例如 kɨ²¹。'}}options=[...new Set(options)];return {profile:profile.title,status:profile.status,candidate:profile.kind==='ipa'&&profile.id!=='brassett-phonetic',ambiguous:options.length>1,original:input,rows:options.map(b=>({brassett:phon(b),ye:standardBrassettToYe(b),ipa:standardBrassettIPA(b)}))}}
function convertNotation(input,pid){if(NOTATION_CONFIG.profiles.find(p=>p.id===pid)?.kind==='south'){const r=southernSpelling(input,pid);return r?{profile:pid,reviewed:true,southern:true,rows:[{...r,ipa:phon(input)}]}:{error:'此词尚无完整映射，保留国际音标。'}}if(['yubao-60756','yubao-60757','yubao-60823'].includes(pid)){const r=northernSurveySpelling(input,pid.slice(6));return r?{profile:NOTATION_CONFIG.profiles.find(p=>p.id===pid)?.title,reviewed:true,rows:[{ye:r.ye,accent:r.accent,brassett:'',ipa:phon(input)}]}:{error:'此词包含尚未确定的声韵或缺失调值，保留国际音标。'}}const p=NOTATION_CONFIG.profiles.find(p=>p.id===pid),override=p?.conversionEnabled!==false&&p?.wordOverrides?.[plainTones(input).normalize('NFC').replace(/\s+/g,'').trim()];if(override)return {profile:p.title,status:'用户逐词审核',candidate:false,reviewed:true,original:input,rows:[{ye:override.ye,brassett:phon(override.brassett),ipa:null}]};const full=convertNotationAtomic(input,pid);if(!full.error||!p||p.kind!=='ipa'||p.conversionEnabled===false)return full;const raw=plainTones(input).normalize('NFC'),unresolved=[],segments=[];let pos=0,converted=0;function literal(text){if(!text)return;const unknown=/[\p{L}\p{M}0-9]/u.test(text);if(unknown)unresolved.push({text:phon(text),reason:'无调、残缺或未解析片段'});segments.push({original:phon(text),rows:[{ye:unknown?'⟦'+phon(text)+'⟧':text,brassett:unknown?'⟦'+phon(text)+'⟧':text}],unresolved:unknown})}for(const m of raw.matchAll(/([\p{L}\p{M}]+)([0-9]+)/gu)){literal(raw.slice(pos,m.index));const result=convertNotationAtomic(m[0],pid);if(result.error){unresolved.push({text:phon(m[0]),reason:result.error});segments.push({original:phon(m[0]),rows:[{ye:'⟦'+phon(m[0])+'⟧',brassett:'⟦'+phon(m[0])+'⟧'}],unresolved:true})}else{segments.push({original:phon(m[0]),rows:result.rows});converted++}pos=m.index+m[0].length}literal(raw.slice(pos));if(!converted)return {...full,unresolved};let rows=[{ye:'',brassett:'',ipa:null}];for(const seg of segments)rows=rows.flatMap(a=>seg.rows.map(b=>({ye:a.ye+b.ye,brassett:a.brassett+b.brassett,ipa:null}))).slice(0,16);return {profile:p.title,status:p.status,candidate:true,original:input,ambiguous:rows.length>1,partial:unresolved.length>0,segmented:true,unresolved,segments,rows}}
function mappingTable(title,headers,rows){return `<h3>${E(title)}</h3><div class="table-wrap"><table><thead><tr>${headers.map(x=>`<th>${E(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${E(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
const BRASSETT_GROUPS={
 'brassett-2004':['1EkBQ1pph-C7zHYTg9wuraMsM7cgCwnfE','stedt-07898ef938'],
 'brassett-2006':['165XnSc-ZLEptpsYT3_gGkCR2lMznvbIO','stedt-39f4cd9a6b','1w-0oecUhi3MkzPM64qzGNWsm7WSNa_YF','brassett-phonetic']
};
function notationSourceKey(p){
 for(const [key,ids]of Object.entries(BRASSETT_GROUPS))if(ids.includes(p.id)||ids.includes(p.source))return key;
 const id=D.sourceAliases?.[p.source]||p.source;
 return ['brassett-2004','brassett-2006'].includes(id)?id:p.id;
}
function notationProfileFormat(p){
 if(p.kind==='ye')return '叶式拼音对照';
 if(p.id==='brassett-phonetic')return '书中 IPA 音值';
 if(p.kind==='brassett'&&p.toneMap?.['2']?.[0]==='3')return '数字调类重编号词表';
 if(p.kind==='brassett')return '数字调类词表';
 return p.title;
}
function notationSourceGroups(){
 const groups=new Map();
 for(const p of NOTATION_CONFIG.profiles){
  const id=notationSourceKey(p);
  if(!groups.has(id))groups.set(id,{id,title:id==='brassett-2004'?'Brassett (2004)':id==='brassett-2006'?'Brassett (2006)':p.title,profiles:[],dialects:p.dialects,count:0,status:p.status});
  const g=groups.get(id);g.profiles.push(p);g.count+=p.count;
 }
 return [...groups.values()].map(g=>({...g,status:g.profiles.length>1?'同一来源 · '+g.profiles.length+' 种输入格式':g.status}));
}
function notationSourcePicker(p){
 const groups=notationSourceGroups(),key=notationSourceKey(p),group=groups.find(g=>g.id===key);
 const formatLabels=new Map();
 return `<label>文献来源<select id="notation-source">${groups.map(g=>`<option value="${g.id}" ${g.id===key?'selected':''}>${E(g.title)}</option>`).join('')}</select></label>${group.profiles.length>1?`<label>输入记音格式<select id="notation-variant">${group.profiles.map(x=>{const label=notationProfileFormat(x),num=(formatLabels.get(label)||0)+1;formatLabels.set(label,num);return `<option value="${x.id}" ${x.id===p.id?'selected':''}>${E(label)}${num>1?' '+num:''}</option>`}).join('')}</select></label><p class="tiny">同一文献不同文件或记音格式。来源原文件名可在词条出处中查看。</p>`:''}`;
}
function notationGuideTable(title,heads,rows){return rows?.length?mappingTable(title,heads,rows):'<p class="tiny">该材料没有可确认的完整对应表；保留来源原记音。</p>'}
function notationSourceTables(profile){
 let html='<h3>'+E(profile.title)+'</h3><p class="tiny">'+E(profile.status||'')+'</p>';
 if(profile.kind==='brassett'||profile.kind==='ye'){
  html+=notationGuideTable('声母',['来源 Brassett','叶式拼音','IPA'],Object.entries(NOTATION_CONFIG.onsets).filter(([s])=>s).map(([s,ipa])=>[s,s==='hh'?'hx':s,ipa]));
  html+=notationGuideTable('韵母',['来源 Brassett','叶式拼音','IPA'],Object.entries(NOTATION_CONFIG.rimes).map(([s,ipa])=>[s,standardBrassettToYe(s),ipa]));
 }else if(profile.kind==='ipa'){
  const ons=profile.onsetMap||{},rimes=profile.rhymeMap||{};
  const grouped=profile.rules||[];
  html+=notationGuideTable('声母',['原记音','本站拼写','条件／核对状态'],grouped.some(x=>x.kind==='声母')?grouped.filter(x=>x.kind==='声母').map(x=>[x.raw,x.target,x.condition||x.status||'']):Object.entries(ons).map(([s,variants])=>[s,(variants||[]).join(' / '),'按本来源整音节验证']));
  html+=notationGuideTable('韵母',['原记音','本站拼写','条件／核对状态'],grouped.some(x=>x.kind==='韵母')?grouped.filter(x=>x.kind==='韵母').map(x=>[x.raw,x.target,x.condition||x.status||'']):Object.entries(rimes).map(([s,variants])=>[s,(variants||[]).join(' / '),'按本来源整音节验证']));
 }
 if(profile.kind==='brassett'||profile.kind==='ye'){
  html+=notationGuideTable('声调',['原材料调类','Brassett 调类','叶式','调号'],Object.entries(profile.toneMap||{}).map(([s,d])=>[s,d.join('/'),d.map(x=>({1:'x',2:'f',3:'r',4:'v'}[x]||'待核')).join('/'),d.map(x=>({1:'ā',2:'á',3:'ǎ',4:'à'}[x]||'待核')).join('/')]));
 }else{
  html+=notationGuideTable('声调',['原材料调值','叶式','调号'],Object.entries(profile.toneMap||{}).map(([s,d])=>[s,d.map(x=>({1:'x',2:'f',3:'r',4:'v'}[x]||'待核')).join('/'),d.map(x=>({1:'ā',2:'á',3:'ǎ',4:'à'}[x]||'待核')).join('/')]));
 }
 if(profile.notes?.length)html+='<p class="tiny">'+profile.notes.map(E).join('；')+'</p>';
 return html;
}
function notationSurveyTables(point){
 const toneMap=point==='60823'?[['13','f','á'],['33','r','不标'],['55','x','ā'],['53','v','à'],['31','r','ǎ']]:point==='60756'?[['55','x','ā'],['35','f','á'],['33','r','ǎ'],['53','v','à']]:[['55 / 53 / 33','x','ā'],['24','f','á'],['22 / 21','r','ǎ']];
 const onsets={'p':'b','pʰ':'p','t':'d','tʰ':'t','k':'g','kʰ':'k','ts':'z','tsʰ':'c','tɕ':'j','tɕʰ':'q','s':'s','z':'r','ɕ':'x','ʑ':'y','x':'h','ɣ':'hx','m':'m','n':'n','l':'l','ɲ':'n','ŋ':'ng'};
 const rimes={'a':'a','i':'i','u':'u','ɿ':'i','o':'o','e':point==='60756'?'ei':'e','ai':'ai','ei':'ei','au':'ao','iau':'iao','əu':'ou','iəu':'iu','ua':'ua','uai':'uai','ia':'ia','uo':'o','aŋ':'ang','ian':'ian','uan':'uan','ɚ':'er','iɚ':'ier','uɚ':'uer'};
 if(point==='60823'){Object.assign(rimes,{'ɤ':'e','ɤe':'e','ɤu':'ou','iɤu':'iu','ũ':'ong','ã':'ang','ĩ':'in','uã':'uan','ɤ̃':'en','uɤ̃':'un'});}
 if(point==='60756'){Object.assign(rimes,{'ə':'e','ɛ':'ai','ɘ':'e','ɔ':'o','ɯ':'i','iɘ':'ie','iə':'ie','ɘi':'ei','ɘu':'ou','uɛ':'uai','ɘn':'en','ɘŋ':'en','əŋ':'en'});}
 return notationGuideTable('声母',['来源 IPA','叶式／调号拼音'],Object.entries(onsets).map(([a,b])=>[a,b]))+
 notationGuideTable('韵母',['来源 IPA','叶式／调号拼音'],Object.entries(rimes).map(([a,b])=>[a,b]))+
 notationGuideTable('声调',['来源 IPA','叶式拼音','调号拼音'],toneMap);
}

const NORTH_ONSET_ORDER=['','b','p','m','f','w','d','t','n','l','z','c','s','r','j','q','x','y','g','k','h','hx','ng'];
function onsetSortKey(spelling){const i=NORTH_ONSET_ORDER.indexOf(spelling);return i<0?NORTH_ONSET_ORDER.length:i;}
function southernOnsetOrder([ipa,spell]){return onsetSortKey(spell[0]);}
function notationMatrix(place){
 const isYang=place==='yangchao';
 const sources=isYang?
  [{title:'田静《仙仁土家语研究》（via Zhou 2020）',id:'zhou-xr',kind:'profile'},{title:'中国语保 · 阳朝',id:'60756',kind:'survey'}]:
  [{title:'他砂 · IPA（via Zhou 2020）',id:'zhou-ts',kind:'profile'},{title:'张伟权《土家语汉语词典》· 拉西峒（via Zhou 2020）',id:'zhou-fx',kind:'profile'},{title:'Sun 1991',id:'stedt-7fd6565400',kind:'profile'},{title:'Huang & Dai 1992',id:'stedt-610ab69a37',kind:'profile'},{title:'Chen 1986',id:'stedt-24cc5bbb03',kind:'profile'},{title:'中国语保 · 龙山',id:'60757',kind:'survey'}];
 const profiles=Object.fromEntries(NOTATION_CONFIG.profiles.map(p=>[p.id,p]));
 const surveyOnsets={'p':'b','pʰ':'p','t':'d','tʰ':'t','k':'g','kʰ':'k','ts':'z','tsʰ':'c','tɕ':'j','tɕʰ':'q','m':'m','n':'n','l':'l','ɲ':'n','ȵ':'n','ŋ':'ng','s':'s','z':'r','ɕ':'x','ʑ':'y','x':'h','ɣ':'hx','ɸ':'h'};
 const surveyRimes={'a':'a','i':'i','u':'u','ɿ':'i','o':'o','ɔ':'o','ɘ':'e','ə':'e','ɤ':'e','ɯ':'i','e':isYang?'ei':'e','ɛ':'ai','ie':'ie','iɘ':'ie','iə':'ie','ai':'ai','ei':'ei','ɘi':'ei','au':'ao','iau':'iao','əu':'ou','ɘu':'ou','iəu':'iu','iɘu':'iu','iu':'iu','ui':'ui','uei':'ui','ua':'ua','uai':'uai','uɛ':'uai','ia':'ia','uo':'o','io':'io','aŋ':'ang','an':'an','ian':'ian','iaŋ':'iang','uan':'uan','uaŋ':'uang','uŋ':'ong','ɔŋ':'ong','ɘn':'en','ən':'en','ɘŋ':'en','əŋ':'en','en':'en','eŋ':'en','in':'in','iŋ':'in','un':'un','uen':'un','iən':'ian','ɚ':'er','iɚ':'ier','uɚ':'uer'};
 // Normalize the special palatal combinations noted in the Yangchao converter.
 function mappedSource(kind,src,key){
  if(src.kind==='tasha'){
   if(kind==='onset')return Object.entries(NOTATION_CONFIG.onsets).filter(([raw])=>(raw==='hh'?'hx':raw)===key).map(([raw])=>{const p=profiles['zhou-ts'];const mapped=p?.onsetMap||{};const ipa=Object.entries(mapped).filter(([,v])=>(v||[]).includes(key)).map(([ipa])=>ipa);return ipa.length?ipa.join(' / '):NOTATION_CONFIG.onsets[raw]||'—'});
   return Object.keys(NOTATION_CONFIG.rimes).filter(raw=>standardBrassettToYe(raw)===key).map(raw=>{const p=profiles['zhou-ts'];const ipa=Object.entries(p?.rhymeMap||{}).filter(([,v])=>(v||[]).some(t=>standardBrassettToYe(t)===key)).map(([ipa])=>ipa);return ipa.length?ipa.join(' / '):NOTATION_CONFIG.rimes[raw]||'—'});
  }
  if(src.kind==='brassett'){
   if(kind==='onset')return Object.entries(NOTATION_CONFIG.onsets).filter(([raw])=>(raw==='hh'?'hx':raw)===key).map(([raw])=>raw);
   return Object.keys(NOTATION_CONFIG.rimes).filter(raw=>standardBrassettToYe(raw)===key);
  }
  if(src.kind==='survey'){
   const dict=kind==='onset'?surveyOnsets:surveyRimes;
   let rows=Object.entries(dict).filter(([raw,sp])=>sp===key).map(([raw])=>raw);
   if(kind==='rime'&&isYang&&key==='ie')rows.push('e / ɛ（腭音后）');
   return [...new Set(rows)];
  }
  const p=profiles[src.id];if(!p)return [];
  const dictionary=kind==='onset'?p.onsetMap:p.rhymeMap;
  if(!dictionary){
   if(src.kind==='tian'){
    const reference=kind==='onset'?NOTATION_CONFIG.onsets:NOTATION_CONFIG.rimes;
    return Object.entries(reference).filter(([raw])=>(kind==='onset'?(raw==='hh'?'hx':raw):standardBrassettToYe(raw))===key).map(([,ipa])=>ipa);
   }
   return [];
  }
  return Object.entries(dictionary).filter(([raw,targets])=>(targets||[]).some(t=>(kind==='rime'?standardBrassettToYe(t):t)===key)).map(([raw])=>raw);
 }
 const bOns=Object.keys(NOTATION_CONFIG.onsets).filter(Boolean).map(k=>k==='hh'?'hx':k);
 const bRimes=Object.keys(NOTATION_CONFIG.rimes).map(k=>standardBrassettToYe(k));
 function keys(kind){
  const all=[...(kind==='onset'?bOns:bRimes),...Object.values(kind==='onset'?surveyOnsets:surveyRimes)];
  for(const source of sources.filter(x=>x.kind==='profile')){
   const p=profiles[source.id],dict=kind==='onset'?p?.onsetMap:p?.rhymeMap;
   for(const targets of Object.values(dict||{}))for(const t of targets||[])all.push(kind==='rime'?standardBrassettToYe(t):t);
  }
  return [...new Set(all)].filter(Boolean).sort((a,b)=>kind==='onset'?(onsetSortKey(a)-onsetSortKey(b)||a.localeCompare(b,'en')):a.localeCompare(b,'en'));
 }
 const headings=isYang?['本站拼写',...sources.map(x=>x.title)]:['本站拼写','Brassett 拼音',...sources.map(x=>x.title)];
 function matrix(kind,title){
  return notationGuideTable(title,headings,keys(kind).map(key=>[key,...(!isYang?[mappedSource(kind,{kind:'brassett'},key).join(' / ')||'—']:[]),...sources.map(src=>{const vals=mappedSource(kind,src,key);return vals.length?vals.join(' / '):'—'})]));
 }
 const longTone=[['x · ā','1','55','55','55','55','55','55 / 53 / 33'],
 ['f · á','2','24','35','35','35','35','24'],
 ['r · ǎ','3','21','21','21','21','21','22 / 21'],
 ['v · à','4','51','53','53','—','53','—']];
 const yangTone=[['x · ā','55','55'],['f · á','35','35'],['r · ǎ','33 / 54','33'],['v · à','—','53']];
 const tone=notationGuideTable('声调',headings,isYang?yangTone:longTone);
 const intro='<p class="tiny">Brassett 拼音单列，其他列显示各材料的 IPA 音值。— 表示尚无可核对应；多项音值以 / 分隔，条件见表下注释。表格为本站现有转换规则的索引。</p>';
 const notes=isYang?
 '<p class="tiny">声韵注：① 仙仁 /ʑ/ 与 /j/ 的 y 写法须检查介音组合，yiao 等形式已规范为 yao。② 阳朝语保 ȵ 按 ni 处理，腭音后的 e／ɛ 按整音节规则写 jie、qie、xie、ye；原始 IPA 保留。③ 表中的 e、ei、ie 涉及来源和声母条件，不能作为无条件音变对应。</p><p class="tiny">声调注：Zhou 仙仁 54→r、55→x，33→r；语保阳朝按 55、35、33、53 的表层调值处理。</p>':
 '<p class="tiny">声韵注：① Brassett 的独立韵母 i：g、h、k、hh 后读 [ɨ]，z、c、s、r 后读 [ɿ]。② Brassett hh→叶式 hx，eng→en，ing→in，uo→o。③ Zhou 各点 e／ie、o／uo 及 i 的读法有声母条件；表中列出原记音，具体转换按整个音节判断。</p><p class="tiny">声调注：① Brassett 的 1–4 为原书调类，Zhou 2020 提供他砂的 IPA 音值。② 龙山语保当前按表层音值归并 55／53／33→x、24→f、22／21→r。</p>';
 return intro+matrix('onset','声母')+matrix('rime','韵母')+tone+notes;
}
function notationGuide(){
 const profiles=NOTATION_CONFIG.profiles;
 const get=id=>profiles.find(p=>p.id===id);
 const brassettGroups=['brassett-2004','brassett-2006'];
 const longshan=['zhou-ts','zhou-fx','stedt-cb523fc3dc:north','yubao-60757'];
 const southTones=[['55','ā','高平'],['33','a（可标 a̱）','中平'],['35','á','上升'],['21','à','低降'],['13','ǎ','低升']];
 return `<section class="panel"><h2>拼音与调查点</h2><p>按调查点查看各份材料的声母、韵母和声调对应。龙山提供叶式拼音和调号拼音；保靖各点及泸溪分别列出各自的规则。原始 IPA 可在词条出处查看。</p></section>
 <section class="panel"><h2>龙山</h2><p>声母、韵母和声调按来源横向对照。左列为本站拼音；Brassett 2004、2006 共用一列拼音；Zhou 2020 他砂列对应 IPA 音值。</p>
 ${notationMatrix('longshan')}</section>
 <section class="panel"><h2>保靖 · 阳朝（仙仁）</h2><p>田静《仙仁土家语研究》（via Zhou 2020）与中国语保阳朝资料的声韵调对照。</p>
 ${notationMatrix('yangchao')}</section>
 <section class="panel"><h2>保靖 · 碗米坡</h2><p>独立按照调查点的表层声调转写。33 与 31 在叶式中都写 r，但调号拼音中分别为不标调和 ǎ。</p>
 ${notationSurveyTables('60823')}</section>
 <section class="panel"><h2>泸溪 · 潭溪（南部）</h2><p>南部独立使用调号拼音与白话字；保留浊音对立及原始 IPA。白话字用连字符分音节，c/ch、j、s 的字母合并并不证明语音互补分布。</p>
 ${notationGuideTable('声母',['来源 IPA','调号拼音','白话字'],Object.entries(SOUTH_ONSETS).filter(([k])=>k).sort((a,b)=>southernOnsetOrder(a)-southernOnsetOrder(b)||a[0].localeCompare(b[0],'en')).map(([k,v])=>[k,...v]))}
 ${notationGuideTable('韵母',['来源 IPA','两种拼音韵母'],Object.entries(SOUTH_RIMES).map(([k,v])=>[k,v]))}
 ${notationGuideTable('声调',['来源 IPA','调号拼音／白话字','说明'],southTones)}
 <p class="tiny">资料：Zhou 南部下都／下且己，STEDT 南部田德生与陈康，中国语保 60824。具体词形中如有来源未能解析的音节，保留原 IPA。</p></section>
 <section class="panel"><h2>小龙热 · 杨再彪（2011）</h2><p>小龙热记音据杨再彪（2011）《湖南西部四种濒危语言调查》，经 Zhou 2020 引用整理。</p>${get('zhou-xl')?notationSourceTables(get('zhou-xl')):''}</section>`;
}
function notationView(){const cfg=NOTATION_CONFIG,p=cfg.profiles.find(x=>x.id===notationState.source)||cfg.profiles[0],result=notationState.result;return pageHeader('notation')+notationGuide()+`<section class="panel">${notationSourcePicker(p)}<form id="notation-converter" class="searchbar"><input id="notation-input" value="${E(notationState.input)}" aria-label="原词形" placeholder="输入原词形"><button>转换</button></form>${result?result.error?`<p class="notice warn">${E(result.error)}</p>`:mappingTable(result.partial?'部分转写':result.ambiguous?'候选词形':'转换结果',result.southern?['调号拼音','白话字拼音']:['叶式拼音','调号拼音'],result.rows.map(x=>result.southern?[x.accent,x.poj]:[x.ye.replace(/⟦[^⟧]*⟧/g,'□'),x.accent||displayBrassett(x.brassett,'accent').replace(/⟦[^⟧]*⟧/g,'□')])):''}${result?.unresolved?.length?mappingTable('未转换部分',['原形','原因'],result.unresolved.map(x=>[x.text,x.reason])):''}<p class="tiny">1 ā · 2 á · 3 ǎ · 4 à</p><p class="tiny">碗米坡按表层调值转写：13 á／f · 33 不标调／r · 55 ā／x · 53 à／v · 31 ǎ／r。33 与 31 同写 r；调号拼音中33不标，31写ǎ。不标调表示33调值，不表示轻声。</p></section><details><summary>来源规则与审核</summary>${sourceReviewView(p)}${(p.notes||[]).map(x=>`<p>${E(x)}</p>`).join('')}${p.rules?mappingTable('声韵对应',['原记号','拼写','条件'],p.rules.map(r=>[r.raw,r.target,r.condition])):''}</details><details><summary>全部来源</summary>${mappingTable('对应进度',['来源','方言','记录数','状态'],notationSourceGroups().map(x=>[x.title,x.dialects.join(' / '),String(x.count),x.status]))}</details><div class="detail-actions"><button id="export-notation-rules">导出规则</button><button data-open="brassett-2006">Brassett 原书</button></div>`}
function bindNotationView(){bindSourceReview();const source=document.querySelector('#notation-source');if(source)source.onchange=e=>{notationState.source=notationSourceGroups().find(g=>g.id===e.target.value).profiles[0].id;notationState.result=null;render()};const variant=document.querySelector('#notation-variant');if(variant)variant.onchange=e=>{notationState.source=e.target.value;notationState.result=null;render()};const f=document.querySelector('#notation-converter');if(f)f.onsubmit=e=>{e.preventDefault();notationState.input=document.querySelector('#notation-input').value;notationState.result=convertNotation(notationState.input,notationState.source);render()};const b=document.querySelector('#export-notation-rules');if(b)b.onclick=()=>download('tujia-source-notation-rules.json',NOTATION_CONFIG)}
document.addEventListener('click',e=>{const el=e.target.closest('[data-notation-profile]');if(!el)return;notationState.source=el.dataset.notationProfile==='brassett-to-ye'?'1EkBQ1pph-C7zHYTg9wuraMsM7cgCwnfE':el.dataset.notationProfile;notationState.result=null;if(document.querySelector('#detail').open)document.querySelector('#detail').close();setView('notation')});

let notationReviews={};try{notationReviews=JSON.parse(localStorage.getItem('tujia-notation-reviews-v1')||'{}')}catch{}
function reviewControls(id){const a=notationReviews[id]||{};return `<label>审核结论<select data-rule-review="${E(id)}">${[['pending','待审核'],['accept','同意此项'],['revise','需要修改'],['reject','不同意']].map(([v,t])=>`<option value="${v}" ${v===(a.status||'pending')?'selected':''}>${t}</option>`).join('')}</select></label><label>修改建议／依据<input data-rule-note="${E(id)}" value="${E(a.note||'')}" placeholder="候选、调查点、例词、页码"></label>`}
function sourceReviewView(p){if(!p.rules)return '';return `<section class="source-review"><h3>本来源对应表与审核</h3><p>每项列出条件和依据。审核结论保存在当前浏览器，可导出交回整合；此处记录结论，不自动改动词典或已发布转换规则。</p>${(p.evidence||[]).map(e=>`<p><a href="${E(e.url)}" target="_blank" rel="noopener">${E(e.label)} ↗</a></p>`).join('')}${p.observedInventory?`<p class="tiny">本来源实际记录：${p.count} 条；分解出 ${p.observedInventory.syllables} 个带调片段、${p.observedInventory.onsets} 种声母记号、${p.observedInventory.rhymes} 种韵母／异常片段。片段统计不是已确认音位数。</p>`:''}${p.conversionAudit?`<p>全表检查：${p.conversionAudit.total} 条中，${p.conversionAudit.candidateConverted} 条可生成参考候选（其中 ${p.conversionAudit.ambiguous} 条多解），${p.conversionAudit.partialCount||0} 条可部分转换，${p.conversionAudit.unresolvedCount} 条尚未完整解决。可转换不代表已核实。</p><details><summary>查看未能整体转换的例词（最多25条）</summary>${mappingTable('未转换例词',['词条ID','原形','释义','原因'],p.conversionAudit.unresolved.map(a=>[a.id,phon(a.term),a.zh,a.reason]))}</details>`:''}${p.conversionEnabled===false?'<p class="notice">XL 转写已暂停，以下对应表仅为未启用草稿。</p>':'<h4>优先请你审核</h4>'}${p.reviewItems.map(q=>`<details><summary>${E(q.title)}</summary><p>${E(q.proposal)}</p><p class="tiny">依据：${E(q.evidence)}</p>${reviewControls(q.id)}</details>`).join('')}${['声母','韵母','声调'].map(kind=>`<details ${kind==='韵母'?'open':''}><summary>${kind}对应（${p.rules.filter(r=>r.kind===kind).length} 项）</summary><div class="table-wrap"><table><thead><tr><th>原记号</th><th>叶式参考／候选</th><th>适用条件与证据</th><th>审核</th></tr></thead><tbody>${p.rules.filter(r=>r.kind===kind).map(r=>`<tr><td>${E(kind==='声调'?allSup(r.raw):r.raw)}</td><td>${E(r.target)}<br><small>${E(r.status)}</small></td><td>${E(r.condition)}<details><summary>依据／例词</summary>${E(r.evidence)}</details></td><td>${reviewControls(r.id)}</td></tr>`).join('')}</tbody></table></div></details>`).join('')}${p.anomalies?.length?mappingTable('需逐词核对的异常调号',['词条ID','原形','释义','问题'],p.anomalies.map(a=>[a.id,phon(a.term),a.meaning,a.issue])):''}<div class="detail-actions"><a href="notation-coverage.json" download>下载全部未转换记录（含原形与原因）</a><button id="export-notation-review">导出审核稿（含规则和结论）</button><button id="import-notation-review">导入审核结论</button><input type="file" id="notation-review-file" accept="application/json" hidden></div></section>`}
function importNotationReviews(data){if(data.version!==1||!data.reviews||typeof data.reviews!=='object')throw Error('invalid');const valid=new Set(NOTATION_CONFIG.profiles.flatMap(p=>[...(p.rules||[]),...(p.reviewItems||[])].map(r=>r.id)));for(const [id,v] of Object.entries(data.reviews)){if(!valid.has(id)||!v||!['pending','accept','revise','reject'].includes(v.status))continue;notationReviews[id]={status:v.status,note:typeof v.note==='string'?v.note:'',updatedAt:typeof v.updatedAt==='string'?v.updatedAt:''}}localStorage.setItem('tujia-notation-reviews-v1',JSON.stringify(notationReviews))}
function bindSourceReview(){function save(id,key,value){notationReviews[id]={status:'pending',note:'',...notationReviews[id],[key]:value,updatedAt:new Date().toISOString()};try{localStorage.setItem('tujia-notation-reviews-v1',JSON.stringify(notationReviews));toast('审核结论已保存至本机')}catch{toast('保存失败，请导出审核稿')}}document.querySelectorAll('[data-rule-review]').forEach(el=>el.onchange=()=>save(el.dataset.ruleReview,'status',el.value));document.querySelectorAll('[data-rule-note]').forEach(el=>el.onchange=()=>save(el.dataset.ruleNote,'note',el.value));const ex=document.querySelector('#export-notation-review');if(ex)ex.onclick=()=>download('tujia-notation-review.json',{version:1,profiles:NOTATION_CONFIG.profiles.filter(p=>p.rules),reviews:notationReviews});const im=document.querySelector('#import-notation-review'),file=document.querySelector('#notation-review-file');if(im)im.onclick=()=>file.click();if(file)file.onchange=async e=>{try{importNotationReviews(JSON.parse(await e.target.files[0].text()));render();toast('审核结论已导入')}catch{toast('无效审核文件，未导入')}}}
