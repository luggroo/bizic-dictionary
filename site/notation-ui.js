const NOTATION_LABELS={ye:'叶式拼音',brassett:'Brassett 拼音',ipa:'IPA',accent:'调号拼音'};
const SUPER_DIGITS='⁰¹²³⁴⁵⁶⁷⁸⁹';
const phon=s=>String(s??'').replaceAll('\\u2009',' ').replace(/([\p{L}\p{M}\]])([0-9]+)/gu,(_,a,n)=>a+[...n].map(x=>SUPER_DIGITS[Number(x)]).join(''));
const plainTones=s=>String(s??'').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>String(SUPER_DIGITS.indexOf(c)));
const allSup=s=>String(s).replace(/[0-9]/g,c=>SUPER_DIGITS[Number(c)]);
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
   const ipa=normalizeIPA(term);
   if(existing){existing.attestationIds.push(a.id);if(!existing.ipaForms.includes(ipa))existing.ipaForms.push(ipa);continue}
   values[kind].push({text,method:r.reviewed?'user-reviewed':r.partial?'source-partial':'source-candidate',ambiguous:!!r.ambiguous,profile:p.id,attestationIds:[a.id],ipaForms:[ipa]});
  }
 }
 }
 // Fill missing IPA from normalized Brassett forms; retain the original spellings.
 if(!(w.notations?.ipa||[]).length)for(const v of w.notations?.brassett||[]){
  const text=standardBrassettIPA(plainTones(v.text));
  if(text)values.ipa.push({text,method:'derived',profile:'brassett-phonetic',attestationIds:[...(v.attestationIds||[])]});
 }
 if(!(w.notations?.ye||[]).length)for(const v of w.notations?.brassett||[]){
  const raw=normalizedBrassettText(v.text);
  if(standardBrassettIPA(raw))values.ye.push({text:displayBrassettYe(raw),method:'derived',profile:'brassett-to-ye',attestationIds:[...(v.attestationIds||[])]});
 }
 sourceNotationCache.set(w,values);return values;
}
function notationValues(w,kind){const values=[...(w.notations?.[kind]||[]),...sourceNotationValues(w)[kind].filter(v=>!(w.notations?.[kind]||[]).some(x=>x.text===v.text))];return kind==='ipa'?mergeIPANotations(values):kind==='ye'?values.map(v=>{const b=(w.notations?.brassett||[]).find(b=>standardBrassettToYe(normalizedBrassettText(b.text))===v.text);return {...v,text:b?displayBrassettYe(normalizedBrassettText(b.text)):normalizeYeInitials(v.text,v.ipaForms?.length===1?v.ipaForms[0]:'')};}):values}
let spellingDisplay='accent';try{if(localStorage.getItem('tujia-north-spelling-v2')==='ye')spellingDisplay='ye'}catch{}
const TONE_MARKS={1:'\u0304',2:'\u0301',3:'\u030c',4:'\u0300'};
// Apply to one decoded syllable, never to source IPA or tone-letter strings.
// Rounded front ü already supplies the palatal vowel; hx is a separate onset.
function pinyinPalatalCore(core){return core.replace(/^(jj|[jqx])(?=[aeouê])/i,'$1i')}
function accentSyllable(core,tone){
 core=pinyinPalatalCore(core);
 const lower=core.toLowerCase();let i=lower.indexOf('a');if(i<0)i=lower.indexOf('e');if(i<0)i=lower.indexOf('o');
 if(i<0){for(let k=core.length-1;k>=0;k--)if('iuü'.includes(lower[k])){i=k;break}}
 if(i<0)i=lower.search(/[mn]/);if(i<0)return core;
 return (core.slice(0,i+1)+TONE_MARKS[tone]+core.slice(i+1)).normalize('NFC');
}
// Keep word spacing; use an apostrophe at ambiguous syllable boundaries.
function accentTagged(text,pattern,decode){let end=-1,previous='';return String(text).replace(pattern,(match,core,tone,offset)=>{const part=decode(core,tone),boundary=offset===end&&(/^[aeiouüê]/i.test(part.core)||(/n$/i.test(previous)&&/^g/i.test(part.core)));end=offset+match.length;previous=part.core;return (boundary?"'":'')+accentSyllable(part.core,part.tone)})}
function yeToAccent(text){return String(text).split(/(⟦[^⟧]*⟧)/g).map(part=>part.startsWith('⟦')?'□':accentTagged(part,/([a-züê]*?[aeiouüê][a-züê]*?)([xfrv])/gi,(core,t)=>({core,tone:{x:1,f:2,r:3,v:4}[t.toLowerCase()]}))).join('')}
function displayBrassett(text,mode=spellingDisplay){const raw=plainTones(text);if(/^[-\s]*[iu][-\s]*$/.test(raw))return normalizeYeInitials(raw);if(mode==='accent')return accentTagged(raw,/([a-z]+)\s*([1-4])(?![0-9])/gi,(core,tone)=>({core:displayBrassettCore(core.toLowerCase()),tone}));return raw.replace(/([a-z]+)\s*([1-4])(?![0-9])/gi,(_,core,t)=>displayBrassettCore(core.toLowerCase())+{1:'x',2:'f',3:'r',4:'v'}[t])}
function accentForNotation(w,v){if(v.accent)return v.accent;const b=notationValues(w,'brassett').find(b=>standardBrassettToYe(plainTones(b.text))===v.text);return b?displayBrassett(b.text,'accent').replace(/⟦[^⟧]*⟧/g,'□'):yeToAccent(v.text)}
function visibleNotationValues(w){if(isSouthernWord(w))return southernNotationValues(w).map(v=>({...v,text:typeof reviewedSpelling==='function'?reviewedSpelling(w,v[southernDisplay==='poj'?'poj':'accent'],southernDisplay):v[southernDisplay==='poj'?'poj':'accent']}));const vals=notationValues(w,'ye');return vals.map(v=>({...v,text:typeof reviewedSpelling==='function'?reviewedSpelling(w,spellingDisplay==='accent'?accentForNotation(w,v):v.text.replace(/⟦[^⟧]*⟧/g,'□'),spellingDisplay):(spellingDisplay==='accent'?accentForNotation(w,v):v.text.replace(/⟦[^⟧]*⟧/g,'□'))})).filter((v,i,a)=>a.findIndex(x=>x.text===v.text)===i)}
function wordIPA(w){return [...new Set((w._ipa||notationValues(w,'ipa').map(v=>v.text)).flatMap(text=>text.split(/[~～]/)).map(text=>normalizeIPA(text.trim())).map(text=>typeof displayReviewedIPA==='function'?displayReviewedIPA(w,text):text).filter(Boolean))]}
function completeSpellings(w){if(w._display)return w._display[isSouthernWord(w)?southernDisplay:spellingDisplay]||[];return visibleNotationValues(w).filter(v=>v.method!=='source-partial'&&!/[□⟦⟧]/.test(v.text))}
function notationHead(w){return completeSpellings(w)[0]?.text||wordIPA(w)[0]||phon(w.term)}
function ipaSubtitle(w){const ipa=wordIPA(w);return completeSpellings(w).length&&ipa.length?`<div class="word-ipa">${ipa.map(E).join(' · ')}</div>`:!ipa.length?'<div class="tiny">IPA 待校核</div>':''}
// Pair alternatives only when the same source conversion supplies the link.
// Array order alone is not evidence that two notations describe the same form.
function pairedNotationForms(w){
 const values=completeSpellings(w),ipa=wordIPA(w);
 if(ipa.length<2||!values.length)return null;
 const pairs=values.map(v=>({...v,ipa:(v.ipaForms||[]).map(normalizeIPA).map(p=>typeof displayReviewedIPA==='function'?displayReviewedIPA(w,p):p).filter(p=>ipa.includes(p))}));
 return pairs.every(v=>v.ipa.length)&&ipa.every(p=>pairs.some(v=>v.ipa.includes(p)))?pairs:null;
}
function wordCardNotation(w){
 const pairs=pairedNotationForms(w);
 const row=(text,ipa)=>`<span class="word word-card-title">${E(phon(text))}</span>${ipa.length?`<span class="word-ipa">${ipa.map(v=>'/'+E(v.replace(/^\/|\/$/g,''))+'/').join(' · ')}</span>`:''}`;
 return pairs?pairs.map(v=>row(v.text,v.ipa)).join(''):row(notationHead(w),completeSpellings(w).length?wordIPA(w):[]);
}
function notationCells(w,compact=false){
 const values=completeSpellings(w),ipa=wordIPA(w),shown=compact?values.slice(1,3):values.slice(1),pairs=pairedNotationForms(w);
 const ipaLine=forms=>`<div class="word-ipa">${forms.map(E).join(' · ')}</div>`;
 const forms=pairs?ipaLine(pairs[0].ipa)+(compact?pairs.slice(1,3):pairs.slice(1)).map(v=>`<div class="notation-alternative"><div class="notation-form">${E(v.text)}</div>${ipaLine(v.ipa)}</div>`).join(''):ipaSubtitle(w)+(!values.length&&ipa.length>1?ipaLine(ipa.slice(1)):'')+shown.map(v=>`<div class="notation-form">${E(v.text)}</div>`).join('');
 return forms+(values.some(v=>v.ambiguous)?'<small class="tiny">多种候选</small>':'')+(compact&&values.length>3?`<small class="tiny">另 ${values.length-3} 种</small>`:'');
}

function spellingSelector(item=null){
 const south=item?isSouthernWord(item):(state.dialect==='南部'||(state.view==='grammar'&&state.grammarDialect==='south'));
 const north=item?!south:(!south&&(!!state.dialect||state.view==='grammar'));
 const select=(region,label,value,options)=>`<label class="spelling-selector">${label}<select data-spelling-display="${region}" aria-label="${label}拼音显示">${options.map(([v,t])=>`<option value="${v}" ${value===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
 return (!south?select('north','北部',spellingDisplay,[['accent','调号拼音'],['ye','叶式拼音']]):'')+(!north?select('south','南部',southernDisplay,[['accent','调号拼音'],['poj','白话字拼音']]):'');
}
function normalizeUnmarkedI(text){return String(text).replace(/(^|[\s-])i(?=$|[\s-])/g,'$1yi')}
function normalizeYeInitials(text,ipa=''){
 const value=normalizeUnmarkedI(text),raw=plainTones(ipa),pattern=/([a-züê]*?[aeiouüê][a-züê]*?)([xfrv])/g;
 // A supplied source form preserves a reduced written medial: /uo/ + or → wor.
 const cores=[...raw.matchAll(/([\p{L}\p{M}ʔ]+)[0-9]+/gu)].map(m=>m[1]);
 const aligned=cores.length>0&&cores.length===[...value.matchAll(pattern)].length&&!value.includes('⟦');let index=0;
 if(/^[\p{L}\p{M}ʔ]+$/u.test(raw)&&/^[a-züê]+$/.test(value))return normalizeWInitialSyllable(value,raw);
 return value.split(/(⟦[^⟧]*⟧)/g).map(part=>part.startsWith('⟦')?part:part.replace(pattern,(_,core,tone)=>normalizeWInitialSyllable(core,aligned?cores[index++]:(core.startsWith('u')?'u':''))+tone).replace(/(^|[\s-])u(?=$|[\s-])/g,'$1wu')).join('');
}
function displayBrassettCore(core,ipaCore=standardSyllableIPA(core)||''){return standardBrassettToYe(normalizeInitialGlides(core,ipaCore))}
function displayBrassettYe(text,ipa=''){
 const cores=[...plainTones(ipa).matchAll(/([^0-9]+)([0-9]+)/g)].map(m=>m[1]),pattern=/([a-z]+)([1-4]?)/g;
 const aligned=cores.length>0&&cores.length===[...text.matchAll(pattern)].length;let index=0;
 return text.replace(pattern,(_,core,tone)=>displayBrassettCore(core,aligned?cores[index++]:undefined)+({1:'x',2:'f',3:'r',4:'v'}[tone]||''));
}
function standardBrassettToYe(text){return text.replaceAll('hh','hx').replaceAll('eng','en').replaceAll('ing','in').replaceAll('uo','o').replace(/[1-4]/g,c=>({1:'x',2:'f',3:'r',4:'v'}[c]))}
function standardSyllableIPA(core){
 const onset=Object.keys(NOTATION_CONFIG.onsets).filter(Boolean).sort((a,b)=>b.length-a.length).find(k=>core.startsWith(k))||'',rhyme=core.slice(onset.length);
 let vowel=NOTATION_CONFIG.rimes[rhyme];if(!vowel)return null;
 if(rhyme==='i'&&['c','g','h','hh','k','r','s','z'].includes(onset))vowel='ɨ';
 // In the reviewed hua/hui/huan series, hu corresponds to the labial
 // fricative as a unit; the medial u is not repeated after f. Standalone
 // hu retains [xu], as in Brassett et al. (2006), pp. 10 and 24.
 if(onset==='h'&&/^u[aeio]/.test(rhyme))return 'f'+vowel.replace(/^u/,'');
 return NOTATION_CONFIG.onsets[onset]+vowel;
}
function brassettCoreIPA(core){
 const direct=standardSyllableIPA(core);if(direct)return [direct];
 // A single tone may follow an untoned prefix, as in a-di². Prefer the
 // fewest syllables and reject genuinely ambiguous segmentations.
 const memo=new Map();
 function parse(start){
  if(start===core.length)return [[]];if(memo.has(start))return memo.get(start);
  let best=Infinity,choices=[];
  for(let end=start+1;end<=core.length;end++){
   const ipa=standardSyllableIPA(core.slice(start,end));if(!ipa)continue;
   for(const rest of parse(end)){
    const candidate=[ipa,...rest];if(candidate.length<best){best=candidate.length;choices=[]}
    if(candidate.length===best&&!choices.some(x=>x.join('|')===candidate.join('|')))choices.push(candidate);
   }
  }
  memo.set(start,choices.slice(0,2));return memo.get(start);
 }
 const candidates=parse(0);return candidates.length===1?candidates[0]:null;
}
function normalizedBrassettText(text){return plainTones(text).normalize('NFC').toLowerCase().replaceAll('\\u2009','').replace(/[|｜◦\s]/g,'')}
function standardBrassettIPA(text){
 const input=normalizedBrassettText(text);
 let out='',pos=0,syllables=0;
 for(const m of input.matchAll(/([a-z]+)([0-9]*)|(-)/g)){
  if(m.index!==pos)return null;
  if(m[3])out+='-';
  else{
   if(m[2]&&!/^[1-4]$/.test(m[2]))return null;
   const parts=brassettCoreIPA(m[1]);if(!parts)return null;
   out+=parts.join('')+(m[2]?allSup(NOTATION_CONFIG.tones[m[2]].pitch):'');syllables+=parts.length;
  }
  pos=m.index+m[0].length;
 }
 return syllables&&pos===input.length?out:null;
}
let brassettInputMap;
function brassettIPAInputMap(){
 if(brassettInputMap)return brassettInputMap;
 brassettInputMap={};
 const add=(ipa,core)=>{const key=ipa.replaceAll('ȵ','ɲ̟');brassettInputMap[key]??=[];if(!brassettInputMap[key].includes(core))brassettInputMap[key].push(core)};
 for(const core of new Set(Object.values(NOTATION_CONFIG.yeSyllables).flat())){
  const ipa=standardSyllableIPA(core);if(!ipa)continue;add(ipa,core);
  if(core.startsWith('l'))add('n'+ipa.slice(1),core);
 }
 return brassettInputMap;
}
function reverseYe(text){const memo=new Map(),lookup=NOTATION_CONFIG.yeSyllables;function visit(pos){if(pos===text.length)return [''];if(memo.has(pos))return memo.get(pos);let result=[];for(let end=pos+1;end<text.length;end++){const core=text.slice(pos,end),tone={x:'1',f:'2',r:'3',v:'4'}[text[end]];if(!tone||!lookup[core])continue;for(const raw of lookup[core])for(const tail of visit(end+1)){result.push(raw+tone+tail);if(result.length>=16)break}if(result.length>=16)break}result=[...new Set(result)].slice(0,16);memo.set(pos,result);return result}return visit(0)}
// A source profile is an explicit proposal, never a global IPA substitution.
// After the palatal y onset, spell medial-i rimes as conventional y-initial syllables.
// Do not change standalone yi, yin, or unrelated consonant classes.
function normalizeYInitialSyllable(core,ipaCore=''){
 // Only source-initial /i/ gains y here; zero-onset /ɨ, ɯ/ may also map to i.
 if(/^i/.test(ipaCore.normalize('NFD'))&&core.startsWith('i'))core='y'+core;
 if(core==='yiu')return 'you'; // Northern iu uses ou after y; y+u stays yu.
 return core.replace(/^yi(?=[aeiouüêı])/,'y');
}
function normalizeWInitialSyllable(core,ipaCore=''){
 // A nasal coda does not remove the syllable's vowel: /u, ũ/ → wu, wun.
 // Northern ui contracts uei; un can also contract a medial plus nasal rime.
 if(/^[uʊ]/.test(ipaCore.normalize('NFD'))&&!core.startsWith('w')){
  if(core==='un'&&/^u[əɤɜɛe]/.test(ipaCore))core='uen';
  core='w'+core;
 }
 if(core==='wui')return 'wei';
 return core.replace(/^wu(?=[aeiouüêı])/,'w');
}
function normalizeInitialGlides(core,ipaCore=''){return normalizeWInitialSyllable(normalizeYInitialSyllable(core,ipaCore),ipaCore)}
const W_INITIAL_RULES='拼音中，元音起首的 /u/ 写 wu，后接其他元音时写 w，如 /ua/ → wa、/uo/ → wo、/uei/ → wei。白话字沿用自己的拼写规则。';
function sourceSyllableCores(core,p){
 return rawSourceSyllableCores(core,p)?.map(value=>normalizeYInitialSyllable(value,core));
}
function rawSourceSyllableCores(core,p){
 if(p.id==='brassett-phonetic')return brassettIPAInputMap()[core];
 if(p.mappingMode==='tian-north'){
  core=core.replaceAll('ɑ','a').normalize('NFC');
  if(p.syllableMap[core])return p.syllableMap[core];
  const on=Object.keys(p.onsetMap).filter(Boolean).sort((a,b)=>b.length-a.length).find(x=>core.startsWith(x))||'',r=core.slice(on.length);
  let rs=p.rhymeMap[r];if(!rs)return [];
  if(r==='o'&&!['p','pʰ','m','w'].includes(on))rs=['uo'];
  if(on==='j'&&r.startsWith('i')&&r.length>1)rs=rs.map(x=>x==='iu'?'ou':x.slice(1));
  return (p.onsetMap[on]||[]).flatMap(o=>rs.map(v=>o==='y'?normalizeYInitialSyllable(o+v):o+v));
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
 return [...new Set(ons.flatMap(o=>rs.map(v=>o==='y'?normalizeYInitialSyllable(o+v):o+v)))];
}
function convertNotationAtomic(input,pid){const profile=NOTATION_CONFIG.profiles.find(p=>p.id===pid);if(!profile)return {error:'尚无此来源的独立规则。'};if(profile.conversionEnabled===false)return {error:profile.status+'。原始输入：'+phon(input)};if(['legacy','south'].includes(profile.kind))return {error:profile.status+'。'+(profile.notes||[]).join(' ')};let s=plainTones(input).normalize('NFC').trim().replaceAll('\\u2009','').replace(/\s+/g,''),options=[];if(profile.kind==='brassett'){s=s.toLowerCase().replace(/[|｜◦]/g,'');const normalized=s.replace(/[1-4]/g,c=>profile.toneMap[c]?.[0]||c);if(!standardBrassettIPA(normalized))return {error:'声韵或调号无法解析，保留原文。无调音节可直接转写。'};options=[normalized]}else if(profile.kind==='ye'){options=reverseYe(s.toLowerCase());if(!options.length)return {error:'无法识别完整音节，请检查分词和声调标记。'}}else{s=s.replace(/^\[/,'').replace(/\]$/,'').replace(/^\//,'').replace(/\/$/,'').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ').replaceAll('ȵ','ɲ̟');s=normalizeIPAAspiration(s);let pos=0;options=[''];for(const m of s.matchAll(/([^0-9]+)([0-9]+)/g)){if(m.index!==pos)return {error:'音节边界未解析，保留原文。'};const cores=sourceSyllableCores(m[1],profile),tones=profile.toneMap?.[m[2]];if(!cores?.length||!tones?.length)return {error:`来源 ${profile.title} 中的 ${phon(m[0])} 尚无已核映射（${!cores?.length?'音值／韵母或i的条件分布':'调值'}）。原形保持不变。`};options=options.flatMap(prefix=>cores.flatMap(core=>tones.map(t=>prefix+core+t))).slice(0,16);pos=m.index+m[0].length}if(!pos||pos!==s.length)return {error:'请输入每个音节都带数字调值的IPA，例如 kɨ²¹。'}}options=[...new Set(options)];return {profile:profile.title,status:profile.status,candidate:profile.kind==='ipa'&&profile.id!=='brassett-phonetic',ambiguous:options.length>1,original:input,rows:options.map(b=>({brassett:phon(b),ye:displayBrassettYe(b,profile.kind==='ipa'?s:''),ipa:standardBrassettIPA(b)}))}}
function convertNotation(input,pid){if(NOTATION_CONFIG.profiles.find(p=>p.id===pid)?.kind==='south'){const r=southernSpelling(input,pid);return r?{profile:pid,reviewed:true,southern:true,rows:[{...r,ipa:phon(input)}]}:{error:'此词尚无完整映射，保留国际音标。'}}if(['yubao-60756','yubao-60757','yubao-60823'].includes(pid)){const r=northernSurveySpelling(input,pid.slice(6));return r?{profile:NOTATION_CONFIG.profiles.find(p=>p.id===pid)?.title,reviewed:true,rows:[{ye:r.ye,accent:r.accent,brassett:'',ipa:phon(input)}]}:{error:'此词包含尚未确定的声韵或缺失调值，保留国际音标。'}}const p=NOTATION_CONFIG.profiles.find(p=>p.id===pid),override=p?.conversionEnabled!==false&&p?.wordOverrides?.[plainTones(input).normalize('NFC').replace(/\s+/g,'').trim()];if(override)return {profile:p.title,status:'词例补充记音',candidate:false,reviewed:true,original:input,rows:[{ye:override.ye,brassett:phon(override.brassett),ipa:null}]};const full=convertNotationAtomic(input,pid);if(!full.error||!p||p.kind!=='ipa'||p.conversionEnabled===false)return full;const raw=plainTones(input).normalize('NFC'),unresolved=[],segments=[];let pos=0,converted=0;function literal(text){if(!text)return;const unknown=/[\p{L}\p{M}0-9]/u.test(text);if(unknown)unresolved.push({text:phon(text),reason:'无调、残缺或未解析片段'});segments.push({original:phon(text),rows:[{ye:unknown?'⟦'+phon(text)+'⟧':text,brassett:unknown?'⟦'+phon(text)+'⟧':text}],unresolved:unknown})}for(const m of raw.matchAll(/([\p{L}\p{M}]+)([0-9]+)/gu)){literal(raw.slice(pos,m.index));const result=convertNotationAtomic(m[0],pid);if(result.error){unresolved.push({text:phon(m[0]),reason:result.error});segments.push({original:phon(m[0]),rows:[{ye:'⟦'+phon(m[0])+'⟧',brassett:'⟦'+phon(m[0])+'⟧'}],unresolved:true})}else{segments.push({original:phon(m[0]),rows:result.rows});converted++}pos=m.index+m[0].length}literal(raw.slice(pos));if(!converted)return {...full,unresolved};let rows=[{ye:'',brassett:'',ipa:null}];for(const seg of segments)rows=rows.flatMap(a=>seg.rows.map(b=>({ye:a.ye+b.ye,brassett:a.brassett+b.brassett,ipa:null}))).slice(0,16);return {profile:p.title,status:p.status,candidate:true,original:input,ambiguous:rows.length>1,partial:unresolved.length>0,segmented:true,unresolved,segments,rows}}
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
  if(!groups.has(id))groups.set(id,{id,title:id==='brassett-2004'?'Brassett (2004)':id==='brassett-2006'?'Brassett (2006)':(NOTATION_PAIR_SOURCES[p.id]?.title.replace(/\n/g,' · ')||p.title),profiles:[],dialects:p.dialects,count:0,status:p.status});
  const g=groups.get(id);g.profiles.push(p);g.count+=p.count;
 }
 return [...groups.values()].map(g=>({...g,status:g.profiles.length>1?'同一来源 · '+g.profiles.length+' 种输入格式':g.status}));
}
function notationSourcePicker(p){
 const groups=notationSourceGroups(),key=notationSourceKey(p),group=groups.find(g=>g.id===key);
 const formatLabels=new Map();
 return `<label>文献来源<select id="notation-source">${groups.map(g=>`<option value="${g.id}" ${g.id===key?'selected':''}>${E(g.title)}</option>`).join('')}</select></label>${group.profiles.length>1?`<label>输入记音格式<select id="notation-variant">${group.profiles.map(x=>{const label=notationProfileFormat(x),num=(formatLabels.get(label)||0)+1;formatLabels.set(label,num);return `<option value="${x.id}" ${x.id===p.id?'selected':''}>${E(label)}${num>1?' '+num:''}</option>`}).join('')}</select></label><p class="tiny">同一文献不同文件或记音格式。来源原文件名可在词条出处中查看。</p>`:''}`;
}
function notationGuideTable(title,heads,rows){
 if(!rows?.length)return '<p class="tiny">该材料没有可确认的完整对应表；保留来源原记音。</p>';
 if(heads.length>4||rows.length<12)return mappingTable(title,heads,rows);
 const pane=items=>`<div class="table-wrap"><table><thead><tr>${heads.map(h=>`<th scope="col">${E(h)}</th>`).join('')}</tr></thead><tbody>${items.map(row=>`<tr>${row.map((value,i)=>i?`<td>${E(value)}</td>`:`<th scope="row">${E(value)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 const half=Math.ceil(rows.length/2);
 return `<div class="np-split-host np-guide-split"><h3>${E(title)}</h3><div class="np-split ${heads.length===4?'np-split-four':'np-split-three'}">${pane(rows.slice(0,half))}${pane(rows.slice(half))}</div></div>`;
}

function notationSourceTables(profile){
 let html='<h3>'+E(profile.title)+'</h3><p class="tiny">'+E(profile.status||'')+'</p>';
 if(profile.kind==='brassett'||profile.kind==='ye'){
  html+=notationGuideTable('声母',['来源 Brassett','叶式拼音','IPA'],Object.entries(NOTATION_CONFIG.onsets).filter(([s])=>s).map(([s,ipa])=>[s,s==='hh'?'hx':s,s==='h'?'x / f (u…)':(NOTATION_CONFIG.onsetVariants?.[s]||[ipa]).join(' / ')]));
  html+=notationGuideTable('韵母',['来源 Brassett','叶式拼音','IPA'],Object.entries(NOTATION_CONFIG.rimes).map(([s,ipa])=>[s,standardBrassettToYe(s),ipa]));
  html+=notationGuideTable('i / ii',['拼音环境','对应拼写','IPA','说明'],NOTATION_CONFIG.iRules);
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
function notationSurveyTables(point){return notationPairTables(point==='60823'?'wanmipo':point==='60756'?'yangchao':'longshan',D);}
const NORTH_ONSET_ORDER=['','b','p','m','f','w','d','t','n','l','z','c','s','r','j','q','x','y','g','k','h','hx','ng'];
function onsetSortKey(spelling){const i=NORTH_ONSET_ORDER.indexOf(spelling);return i<0?NORTH_ONSET_ORDER.length:i;}
function southernOnsetOrder([ipa,spell]){return onsetSortKey(spell[0]);}
function notationMatrix(place){return notationPairTables(place,D);}
function notationGuide(){
 const profiles=NOTATION_CONFIG.profiles;
 const get=id=>profiles.find(p=>p.id===id);
 const southTones=[['55','ā','高平'],['33','a（可标 a̱）','中平'],['35','á','上升'],['21','à','低降'],['13','ǎ','低升']];
 return `<details class="panel notation-section"><summary><h2>拼音与调查点</h2></summary><p>按调查点查看各份材料的声母、韵母和声调对应。龙山提供叶式拼音和调号拼音；保靖各点及泸溪分别列出各自的规则。原始 IPA 可在词条出处查看。</p><p>各调查点的调号拼音和叶式拼音都用 y 表示音节起首的 /j/、/ʑ/，以及元音起首的 /i/、/i…/。例如 /i/ → yi、/ie/ → ye、/ia/ → ya；yi、yin 保留 i。白话字沿用自己的拼写规则。</p><p>${W_INITIAL_RULES}</p></details>
 <details class="panel notation-section"><summary><h2>龙山</h2></summary><p>Brassett 2004、2006 共用一列拼音。各来源的原记音分别对照叶式与调号拼音。</p>
 <details><summary>Brassett 拼音与 IPA</summary>${notationSourceTables(get('1EkBQ1pph-C7zHYTg9wuraMsM7cgCwnfE'))}</details>
 ${notationMatrix('longshan')}</details>
 <details class="panel notation-section"><summary><h2>保靖 · 阳朝（仙仁）</h2></summary><p>仙仁：戴庆厦、田静（2005），经 Zhou 2020 引用；另列中国语保阳朝。</p>
 ${notationMatrix('yangchao')}</details>
 <details class="panel notation-section"><summary><h2>保靖 · 碗米坡</h2></summary><p>独立按照调查点的表层声调转写。33 与 31 在叶式中都写 r，但调号拼音中分别为不标调和 ǎ。</p>
 ${notationSurveyTables('60823')}</details>
 <details class="panel notation-section"><summary><h2>泸溪 · 潭溪（南部）</h2></summary><p>南部独立使用调号拼音与白话字；保留浊音对立及原始 IPA。白话字用连字符分音节，c/ch、j、s 的字母合并并不证明语音互补分布。</p>
 ${notationGuideTable('声母',['来源 IPA','调号拼音','白话字'],Object.entries(SOUTH_ONSETS).filter(([k])=>k).sort((a,b)=>southernOnsetOrder(a)-southernOnsetOrder(b)||a[0].localeCompare(b[0],'en')).map(([k,v])=>[k,...v]))}
 ${notationGuideTable('韵母',['来源 IPA','调号拼音','白话字'],southernRimeRows().filter(([r])=>r!=='ɨ'))}
 ${notationGuideTable('分来源韵母',['来源','来源 IPA','声母环境','调号拼音','白话字'],southernSourceRimeRows())}
 <p>${SOUTH_PINYIN_RULES}</p>
 <p>${SOUTH_SOURCE_RIME_RULES}</p>
 <p>${SOUTH_DOTLESS_I_RULES}</p>
 <p>${SOUTH_APICAL_RULES}</p>
 ${notationGuideTable('声调',['来源 IPA','调号拼音／白话字','说明'],southTones)}
 <p class="tiny">资料：Zhou 南部下都／下且己，STEDT 南部田德生与陈康，中国语保 60824。具体词形中如有来源未能解析的音节，保留原 IPA。</p></details>
 <details class="panel notation-section"><summary><h2>小龙热 · Yang 2011 <small class="notation-source-via">via Zhou 2020</small></h2></summary><p>杨再彪《湖南西部四种濒危语言调查》（2011）。</p>${get('zhou-xl')?notationSourceTables(get('zhou-xl')):''}</details>`;
}
function notationView(){const cfg=NOTATION_CONFIG,p=cfg.profiles.find(x=>x.id===notationState.source)||cfg.profiles[0],result=notationState.result;return pageHeader('notation')+notationGuide()+`<details class="panel notation-section" open><summary><h2>记音转换</h2></summary>${notationSourcePicker(p)}<form id="notation-converter" class="searchbar"><input id="notation-input" value="${E(notationState.input)}" aria-label="原词形" placeholder="输入原词形"><button>转换</button></form>${result?result.error?`<p class="notice warn">${E(result.error)}</p>`:mappingTable(result.partial?'部分转写':result.ambiguous?'候选词形':'转换结果',result.southern?['调号拼音','白话字拼音']:['叶式拼音','调号拼音'],result.rows.map(x=>result.southern?[x.accent,x.poj]:[x.ye.replace(/⟦[^⟧]*⟧/g,'□'),x.accent||displayBrassett(x.brassett,'accent').replace(/⟦[^⟧]*⟧/g,'□')])):''}${result?.unresolved?.length?mappingTable('未转换部分',['原形','原因'],result.unresolved.map(x=>[x.text,x.reason])):''}<p class="tiny">1 ā · 2 á · 3 ǎ · 4 à</p><p class="tiny">碗米坡按表层调值转写：13 á／f · 33 不标调／r · 55 ā／x · 53 à／v · 31 ǎ／r。33 与 31 同写 r；调号拼音中33不标，31写ǎ。不标调表示33调值，不表示轻声。</p></details><details><summary>来源规则与笔记</summary>${sourceReviewView(p)}${(NOTATION_PAIR_SOURCES[p.id]?[]:p.notes||[]).map(x=>`<p>${E(x)}</p>`).join('')}${p.rules&&!NOTATION_PAIR_SOURCES[p.id]?mappingTable('声韵对应',['原记号','拼写','条件'],p.rules.map(r=>[r.raw,r.target,r.condition])):''}</details><details><summary>全部来源</summary>${mappingTable('对应进度',['来源','方言','记录数','状态'],notationSourceGroups().map(x=>[x.title,x.dialects.join(' / '),String(x.count),x.status]))}</details><div class="detail-actions"><button id="export-notation-rules">导出规则</button><button data-open="brassett-2006">Brassett 原书</button></div>`}
function bindNotationView(){bindSourceReview();const source=document.querySelector('#notation-source');if(source)source.onchange=e=>{notationState.input=document.querySelector('#notation-input').value;notationState.source=notationSourceGroups().find(g=>g.id===e.target.value).profiles[0].id;notationState.result=null;render()};const variant=document.querySelector('#notation-variant');if(variant)variant.onchange=e=>{notationState.input=document.querySelector('#notation-input').value;notationState.source=e.target.value;notationState.result=null;render()};const f=document.querySelector('#notation-converter');if(f)f.onsubmit=e=>{e.preventDefault();notationState.input=document.querySelector('#notation-input').value;notationState.result=convertNotation(notationState.input,notationState.source);render()};const b=document.querySelector('#export-notation-rules');if(b)b.onclick=()=>download('tujia-source-notation-rules.json',{...NOTATION_CONFIG,southern:{spellingColumns:['accent','poj'],onsets:SOUTH_ONSETS,rimes:Object.fromEntries(southernRimeRows().map(([ipa,...spellings])=>[ipa,spellings])),sourceRimes:southernSourceRimeRows(),tones:SOUTH_TONES,notes:[SOUTH_PINYIN_RULES,SOUTH_SOURCE_RIME_RULES,SOUTH_DOTLESS_I_RULES,SOUTH_APICAL_RULES]}})}
document.addEventListener('click',e=>{const el=e.target.closest('[data-notation-profile]');if(!el)return;notationState.source=el.dataset.notationProfile==='brassett-to-ye'?'1EkBQ1pph-C7zHYTg9wuraMsM7cgCwnfE':el.dataset.notationProfile;notationState.result=null;setView('notation')});

let notationReviews={};try{notationReviews=JSON.parse(localStorage.getItem('tujia-notation-reviews-v1')||'{}')}catch{}
function reviewControls(id){const a=notationReviews[id]||{};return `<label>个人笔记<select data-rule-review="${E(id)}">${[['pending','未作笔记'],['accept','同意此项'],['revise','需要修改'],['reject','不同意']].map(([v,t])=>`<option value="${v}" ${v===(a.status||'pending')?'selected':''}>${t}</option>`).join('')}</select></label><label>修改建议／依据<input data-rule-note="${E(id)}" value="${E(a.note||'')}" placeholder="可填写例词、调查点或文献页码"></label>`}
function sourceReviewView(p){const paired=notationPairSourceReview(p);if(paired!==null)return paired;if(!p.rules)return '';return `<section class="source-review"><h3>本来源对应表</h3><p>可为各项对应添加个人笔记。笔记仅保存在当前浏览器，可导出备份；不会修改网站词条。</p>${(p.evidence||[]).map(e=>`<p><a href="${E(e.url)}" target="_blank" rel="noopener">${E(e.label)} ↗</a></p>`).join('')}${p.observedInventory?`<p class="tiny">本来源实际记录：${p.count} 条；分解出 ${p.observedInventory.syllables} 个带调片段、${p.observedInventory.onsets} 种声母记号、${p.observedInventory.rhymes} 种韵母／异常片段。片段统计不是已确认音位数。</p>`:''}${p.conversionAudit?`<p>全表检查：${p.conversionAudit.total} 条中，${p.conversionAudit.candidateConverted} 条可生成参考候选（其中 ${p.conversionAudit.ambiguous} 条多解），${p.conversionAudit.partialCount||0} 条可部分转换，${p.conversionAudit.unresolvedCount} 条尚未完整解决。可转换不代表已核实。</p><details><summary>查看未能整体转换的例词（最多25条）</summary>${mappingTable('未转换例词',['词条ID','原形','释义','原因'],p.conversionAudit.unresolved.map(a=>[a.id,phon(a.term),a.zh,a.reason]))}</details>`:''}${p.conversionEnabled===false?'<p class="notice">小龙热暂以原始IPA显示；以下对应仅供比较。</p>':'<h4>待考问题</h4>'}${p.reviewItems.map(q=>`<details><summary>${E(q.title)}</summary><p>${E(q.proposal)}</p><p class="tiny">依据：${E(q.evidence)}</p>${reviewControls(q.id)}</details>`).join('')}${['声母','韵母','声调'].map(kind=>`<details ${kind==='韵母'?'open':''}><summary>${kind}对应（${p.rules.filter(r=>r.kind===kind).length} 项）</summary><div class="table-wrap"><table><thead><tr><th>原记号</th><th>叶式参考／候选</th><th>适用条件与证据</th><th>个人笔记</th></tr></thead><tbody>${p.rules.filter(r=>r.kind===kind).map(r=>`<tr><td>${E(kind==='声调'?allSup(r.raw):r.raw)}</td><td>${E(r.target)}<br><small>${E(r.status)}</small></td><td>${E(r.condition)}<details><summary>依据／例词</summary>${E(r.evidence)}</details></td><td>${reviewControls(r.id)}</td></tr>`).join('')}</tbody></table></div></details>`).join('')}${p.anomalies?.length?mappingTable('需逐词核对的异常调号',['词条ID','原形','释义','问题'],p.anomalies.map(a=>[a.id,phon(a.term),a.meaning,a.issue])):''}<div class="detail-actions"><a href="notation-coverage.json" download>下载全部未转换记录（含原形与原因）</a><button id="export-notation-review">导出记音笔记</button><button id="import-notation-review">导入记音笔记</button><input type="file" id="notation-review-file" accept="application/json" hidden></div></section>`}
function importNotationReviews(data){if(data.version!==1||!data.reviews||typeof data.reviews!=='object')throw Error('invalid');const valid=new Set(NOTATION_CONFIG.profiles.flatMap(p=>[...(p.rules||[]),...(p.reviewItems||[])].map(r=>r.id)));for(const [id,v] of Object.entries(data.reviews)){if(!valid.has(id)||!v||!['pending','accept','revise','reject'].includes(v.status))continue;notationReviews[id]={status:v.status,note:typeof v.note==='string'?v.note:'',updatedAt:typeof v.updatedAt==='string'?v.updatedAt:''}}localStorage.setItem('tujia-notation-reviews-v1',JSON.stringify(notationReviews))}
function bindSourceReview(){function save(id,key,value){notationReviews[id]={status:'pending',note:'',...notationReviews[id],[key]:value,updatedAt:new Date().toISOString()};try{localStorage.setItem('tujia-notation-reviews-v1',JSON.stringify(notationReviews));toast('个人笔记已保存至本机')}catch{toast('保存失败，请导出笔记')}}document.querySelectorAll('[data-rule-review]').forEach(el=>el.onchange=()=>save(el.dataset.ruleReview,'status',el.value));document.querySelectorAll('[data-rule-note]').forEach(el=>el.onchange=()=>save(el.dataset.ruleNote,'note',el.value));const ex=document.querySelector('#export-notation-review');if(ex)ex.onclick=()=>download('tujia-notation-review.json',{version:1,profiles:NOTATION_CONFIG.profiles.filter(p=>p.rules),reviews:notationReviews});const im=document.querySelector('#import-notation-review'),file=document.querySelector('#notation-review-file');if(im)im.onclick=()=>file.click();if(file)file.onchange=async e=>{try{importNotationReviews(JSON.parse(await e.target.files[0].text()));render();toast('个人笔记已导入')}catch{toast('无法读取此笔记文件')}}}
