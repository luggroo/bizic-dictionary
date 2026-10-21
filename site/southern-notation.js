// Southern Tujia spelling, agreed 2026-10-20. Never apply these rules to Northern data.
// POJ c/ch/s spell dental and alveolo-palatal correspondences alike; retain source IPA.
// This is an orthographic merger, not a claim of strict complementary distribution.
const SOUTH_ONSETS={
 'tɕʰ':['q','ch'],'tsʰ':['c','ch'],'pʰ':['p','ph'],'tʰ':['t','th'],'kʰ':['k','kh'],
 'dʑ':['jj','j'],'dz':['zz','j'],'tɕ':['j','c'],'ts':['z','c'],
 'p':['b','p'],'t':['d','t'],'k':['g','k'],'b':['bb','b'],'d':['dd','d'],'g':['gg','g'],
 'm':['m','m'],'n':['n','n'],'ɲ':['ni','ni'],'ŋ':['ng','ng'],
 'f':['f','f'],'s':['s','s'],'z':['r','r'],'ɕ':['x','s'],'ʑ':['y','y'],
 'x':['h','h'],'ɣ':['gh','gh'],'ħ':['ḥ','ḥ'],'ʕ':['ẖ','ẖ'],
 'l':['l','l'],'w':['w','w'],'j':['y','y'],'ʔ':["'","'"],'':['','']
};
const SOUTH_RIMES={
 'i':'i','e':'e','a':'a','o':'o','u':'u','y':'ü','ɯ':'eu','ʉ':'eu','ɨ':'ri',
 'ei':'ei','ai':'ai','au':'au','aɨ':'au','aɯ':'au',
 'ie':'ie','ɨe':'e','ɯe':'e','ia':'ia','io':'io','iɯ':'ieu','iʉ':'ieu',
 'iau':'iau','iaɨ':'iau','iaɯ':'iau','ue':'ue','ua':'ua','uei':'uei','ui':'uei','uai':'uai','uo':'uo',
 'ye':'üe','ya':'üa','yi':'üi',
 'ĩ':'in','ẽ':'en','ã':'an','õ':'on','ũ':'un','ỹ':'ün',
 'iã':'ian','iõ':'ion','uẽ':'uen','uã':'uan','uĩ':'uin','yĩ':'üin','yã':'üan','yẽ':'üen'
};
const SOUTH_TONES={'55':'\u0304','33':'','35':'\u0301','21':'\u0300','13':'\u030c'};
const SOUTH_ORDER=Object.keys(SOUTH_ONSETS).sort((a,b)=>b.length-a.length);
let southernDisplay='accent';
try{if(localStorage.getItem('tujia-south-spelling-v1')==='poj')southernDisplay='poj'}catch{}
function isSouthernWord(w){return w.dialect==='南部'||(w.dialects||[]).includes('南部')||(w.attestations||[]).some(a=>a.dialect==='南部')}
function southNormalize(raw,source=''){
 let t=plainTones(raw).normalize('NFC').replaceAll('u̵','ʉ').replaceAll('ɡ','g').replaceAll('ɑ','a').replaceAll('ʦ','ts').replaceAll('ʣ','dz').replaceAll('ʨ','tɕ').replaceAll('ʥ','dʑ').replaceAll('ȵ','ɲ').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ').replaceAll('d͡ʑ','dʑ').replaceAll('d͡z','dz');
 if(source.startsWith('stedt-'))t=t.replaceAll('h̄','ħ').replaceAll('ẖ','ħ');
 return t.replace(/(tɕ|ts|p|t|k)h/g,'$1ʰ').normalize('NFC');
}
function southMark(rime,tone,explicit=false){
 const mark=tone==='33'&&explicit?'\u0331':SOUTH_TONES[tone];
 if(mark===undefined)return null;if(!mark)return rime;
 let index=rime.indexOf('a');if(index<0)index=rime.indexOf('e');if(index<0)index=rime.indexOf('o');
 if(index<0){for(let i=rime.length-1;i>=0;i--)if('iuü'.includes(rime[i])){index=i;break}}
 if(index<0)return null;
 return (rime.slice(0,index+1)+mark+rime.slice(index+1)).normalize('NFC');
}
function southernSpelling(raw,source='',explicit=false){
 const text=southNormalize(raw,source).trim().replace(/^\/(.*)\/$/,'$1');
 let pos=0,accent='',poj='',count=0,previousCore='';
 for(const m of text.matchAll(/([^0-9\s~～|｜/／,，;；()（）\[\]⁇?]+)([0-9]+|\?)/g)){
  const gap=text.slice(pos,m.index);
  if(!/^[\s~～|｜/／,，;；()（）\[\]-]*$/.test(gap))return null;
  const onset=SOUTH_ORDER.find(o=>m[1].startsWith(o));let r=m[1].slice(onset.length),rime=SOUTH_RIMES[r];
  // Only the two reviewed Tian 'nasal mucus' forms use this exceptional mapping.
  if(r==='ɨ̃'&&['l','n'].includes(onset)&&source.startsWith('stedt-cb523fc3dc'))rime='en';
  if(r==='ɨ'&&['k','kʰ','g','x','ɣ','ħ','ʕ'].includes(onset))rime='i';
  if(!rime||(!Object.hasOwn(SOUTH_TONES,m[2])&&m[2]!=='?'))return null;
  if(onset==='ɲ'&&rime.startsWith('i'))rime=rime.slice(1);
  const marked=m[2]==='?'?rime+'⁇':southMark(rime,m[2],explicit);if(marked===null)return null;
  const sep=count&&/^[\s-]*$/.test(gap)?'-':gap.replace(/[|｜]/g,' / ');
  // Apical i after dental sibilants uses ri in POJ (cri/chri/sri versus ci/chi/si).
  // This avoids collapsing common dental-i and alveolo-palatal-i syllables.
  let pojRime=r==='i'&&['ts','tsʰ','dz','s','z'].includes(onset)?'ri':rime;
  // r + apical ri is written ri, not rri.
  if(SOUTH_ONSETS[onset][1]==='r'&&pojRime==='ri')pojRime='i';
  const pojMarked=m[2]==='?'?pojRime+'⁇':southMark(pojRime,m[2],explicit);
  const core=SOUTH_ONSETS[onset][0]+rime;
  const accentSep=sep==='-'?(/^[aeiouü]/i.test(core)||(/n$/i.test(previousCore)&&/^g/i.test(core))?"'":''):sep;
  accent+=accentSep+SOUTH_ONSETS[onset][0]+marked;poj+=sep+SOUTH_ONSETS[onset][1]+pojMarked;
  previousCore=core;
  count++;pos=m.index+m[0].length;
 }
 const tail=text.slice(pos);if(!count||!/^\s*[)）\]]*\s*$/.test(tail))return null;
 return {accent:(accent+tail).normalize('NFC'),poj:(poj+tail).normalize('NFC')};
}
const southernCache=new WeakMap();
function southernNotationValues(w){
 if(southernCache.has(w))return southernCache.get(w);
 const result=[];
 for(const a of w.attestations||[]){
  if(a.dialect!=='南部')continue;
  const r=southernSpelling(a.term,a.source);if(!r)continue;
  if(!result.some(v=>v.accent===r.accent&&v.poj===r.poj))result.push({...r,method:'source',profile:a.source,attestationIds:[a.id]});
 }
 southernCache.set(w,result);return result;
}
function southernMappingHTML(){
 return `<details><summary>南部拼音对应</summary><p>调号拼音词内连写，后续音节以元音开头或 n 与 g 相接时用 ' 隔开；白话字以 - 分隔音节。韵尾 n 表示鼻化。55 ā · 33 a（明确标调时 a̱）· 35 á · 21 à · 13 ǎ。</p>`+
 mappingTable('声母',['IPA','调号拼音','白话字拼音'],Object.entries(SOUTH_ONSETS).filter(([k])=>k).map(([k,v])=>['/'+k+'/',...v]))+
 mappingTable('韵母',['IPA','拼写'],Object.entries(SOUTH_RIMES).map(([k,v])=>['/'+k+'/',v]))+
 '<p>南部白话字将 /dz, dʑ/ 写 j，/z/ 写 r；/ts, tɕ/ 统一写 c，/tsʰ, tɕʰ/ 统一写 ch，/s, ɕ/ 统一写 s。前元音 i、ü 前通常读为腭化音；这仅是正字法合并，不代表这些音在全部材料中已证明互补分布，原始 IPA 仍可在词条出处查看。</p><p>齿龈音后的舌尖元音在白话字中写 ri：cri、chri、jri、sri、ri；对应腭音加前元音的 ci、chi、si。调号拼音仍写 zi、ci、zzi、si、ri。原已写 ri 的韵母保持不变。</p><p>田德生“鼻涕”的 /ɨ̃/ 写 en。来源中的 /ɨ/ 在舌根、喉部声母后按 i 转写；其余独立记录写 ri。原始音标可在词条出处中查看。</p></details>';
}
NOTATION_CONFIG.profiles.push({id:'yubao-60824',source:'yubao-60824',title:'中国语保 · 南部潭溪',kind:'south',count:2884,dialects:['南部'],status:'南部双方案',notes:[]});
