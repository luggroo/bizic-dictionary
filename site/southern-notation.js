// Southern Tujia spelling, agreed 2026-10-20. Never apply these rules to Northern data.
// POJ c/ch/s spell dental and alveolo-palatal correspondences alike; retain source IPA.
// This is an orthographic merger, not a claim of strict complementary distribution.
const SOUTH_ONSETS={
 'tɕʰ':['q','ch'],'tsʰ':['c','ch'],'pʰ':['p','ph'],'tʰ':['t','th'],'kʰ':['k','kh'],
 'dʑ':['jj','j'],'dz':['zz','j'],'tɕ':['j','c'],'ts':['z','c'],
 'p':['b','p'],'t':['d','t'],'k':['g','k'],'b':['bb','b'],'d':['dd','d'],'g':['gg','g'],
 'm':['m','m'],'n':['n','n'],'ɲ':['ni','ni'],'ȵ':['ni','ni'],'ŋ':['ng','ng'],
 'f':['f','f'],'s':['s','s'],'z':['r','r'],'ɕ':['x','s'],'ʑ':['y','y'],
 'x':['h','h'],'ɣ':['hx','gh'],'ħ':['h','h'],'ʕ':['h','h'],
 'l':['l','l'],'w':['w','w'],'j':['y','y'],'ʔ':["'","'"],'':['','']
};
const SOUTH_RIMES={
 'i':'i','e':'e','a':'a','o':'o','u':'u','y':'ü','ɯ':'eu','ʉ':'eu','ɨ':'ıi','ɿ':'rı',
 'ei':'ei','ai':'ai','au':'au','ao':'au','aɨ':'au','aɯ':'au',
 'ie':'ie','ɨe':'e','ɯe':'e','ia':'ia','io':'io','iu':'iu','iɯ':'ieu','iʉ':'ieu',
 'iau':'iau','iaɨ':'iau','iaɯ':'iau','ue':'ue','ua':'ua','uei':'uei','ui':'uei','uai':'uai','uo':'uo',
 'ye':'üe','ya':'üa','yi':'üi',
 'ĩ':'in','ẽ':'en','ã':'an','õ':'on','ũ':'un','ỹ':'ün',
 'iã':'ian','iõ':'ion','uẽ':'uen','uã':'uan','uĩ':'uin','yĩ':'üin','yã':'üan','yẽ':'üen'
};
const SOUTH_TONES={'55':'\u0304','33':'','35':'\u0301','21':'\u0300','13':'\u030c'};
const SOUTH_ORDER=Object.keys(SOUTH_ONSETS).sort((a,b)=>b.length-a.length);
const SOUTH_PINYIN_RULES='调号拼音 j、q、x（含浊音 jj）后补足 i，如 je → jie、qa → qia、xon → xion；已有 i 或 ü 不重复添加。两套拼写中，y 后的 i 在另一个元音前省去，如 yia → ya、yie → ye、yio → yo、yieu → yeu；yi、yin 保留 i。白话字 /j/ 起首的相应形式写 ia、ie、io、ieu。下表为基础对应，/i、ei、ɨ/ 的来源差异另列。';
const SOUTH_SOURCE_RIME_RULES='Tian 86 南部：调号拼音与白话字共用韵母，/i/ 写 i，/ei/ 写 ei；/ɨ/ 在 /k、kʰ、g、ŋ、x、ɣ/ 后写 i，其他位置写 ıi。中国语保泸溪：/t、d/ 后的 /ɨ/ 在两套拼写中写 ei；/k、kʰ、g、x、ɣ、ħ、ʕ/ 后写 i，其他位置写 ıi。';
const SOUTH_APICAL_RULES='舌尖元音在调号拼音中写 i，在白话字中写 rı。例如 /ts、tsʰ、dz、s、z/ 后的舌尖元音，调号拼音写 zi、ci、zzi、si、ri，白话字写 crı、chrı、jrı、srı、rı。白话字的 ı 不带点，声调直接加在 ı 上：rı̄、rı、rı́、rı̀、rı̌；声母 r 与韵母 rı 相接时只写一个 r。Tian 86 的 /i/ 按来源对应，在两套拼写中都写 i。其他来源中，上述声母后记作 /i/ 或直接记作 /ɿ/ 的舌尖元音按此规则拼写；原始 IPA 保留各来源的记法。';
const SOUTH_DOTLESS_I_RULES='ıi 表示一个元音 /ɨ/，首字母为无点 ı，声调标在第二个 i 上：ıī、ıi、ıí、ıì、ıǐ。白话字的 cıi、chıi、sıi 与 ci、chi、si 区分；ıi 不触发 i、ü 前的腭化读法。搜索时也可输入 ii。';
function southernRimeRows(){return Object.entries(SOUTH_RIMES).map(([ipa,rime])=>[ipa,rime==='rı'?'i':rime,rime])}
function southernSourceRimeRows(){return [
 ['Tian 86','i','全部','i','i'],['Tian 86','ei','全部','ei','ei'],
 ['Tian 86','ɨ','k、kʰ、g、ŋ、x、ɣ','i','i'],['Tian 86','ɨ','其他声母或零声母','ıi','ıi'],
 ['中国语保 · 泸溪','ɨ','t、d','ei','ei'],['中国语保 · 泸溪','ɨ','k、kʰ、g、x、ɣ、ħ、ʕ','i','i'],['中国语保 · 泸溪','ɨ','其他声母或零声母','ıi','ıi'],
 ['中国语保泸溪及其他非 Tian 86 来源','i','ts、tsʰ、dz、s、z（舌尖元音）','i','rı'],
 ['南部各来源','ɿ','全部','i','rı'],
 ['其他南部来源','ɨ','k、kʰ、g、x、ɣ、ħ、ʕ','i','i'],['其他南部来源','ɨ','其他声母或零声母','ıi','ıi']
]}
let southernDisplay='accent';
try{if(localStorage.getItem('tujia-south-spelling-v1')==='poj')southernDisplay='poj'}catch{}
function isSouthernWord(w){return w.dialect==='南部'||(w.dialects||[]).includes('南部')||(w.attestations||[]).some(a=>a.dialect==='南部')}
function southNormalize(raw,source=''){
 let t=plainTones(raw).normalize('NFC').replaceAll('u̵','ʉ').replaceAll('ɡ','g').replaceAll('ɑ','a').replaceAll('ʦ','ts').replaceAll('ʣ','dz').replaceAll('ʨ','tɕ').replaceAll('ʥ','dʑ').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ').replaceAll('d͡ʑ','dʑ').replaceAll('d͡z','dz');
 if(source.startsWith('stedt-'))t=t.replaceAll('h̄','ħ').replaceAll('ẖ','ħ');
 return normalizeIPAAspiration(t).normalize('NFC');
}
function southMark(rime,tone,explicit=false){
 const mark=tone==='33'&&explicit?'\u0331':SOUTH_TONES[tone];
 if(mark===undefined)return null;if(!mark)return rime;
 let index=rime.indexOf('a');if(index<0)index=rime.indexOf('e');if(index<0)index=rime.indexOf('o');
 if(index<0){for(let i=rime.length-1;i>=0;i--)if('iuüı'.includes(rime[i])){index=i;break}}
 if(index<0)return null;
 return (rime.slice(0,index+1)+mark+rime.slice(index+1)).normalize('NFC');
}
// Apply before tone marking, to one syllable with a written y onset.
function southYInitialRime(onset,rime){return onset==='y'?rime.replace(/^i(?=[aeiouüêı])/,''):rime}
function southernSpelling(raw,source='',explicit=false){
 const text=southNormalize(raw,source).trim().replace(/^\/(.*)\/$/,'$1');
 const tian=['stedt-cb523fc3dc','stedt-cb523fc3dc:south'].includes(source),luxi=source==='yubao-60824';
 let pos=0,accent='',poj='',count=0,previousCore='';
 for(const m of text.matchAll(/([^0-9\s~～|｜/／,，;；()（）\[\]⁇?]+)([0-9]+|\?)/g)){
  const gap=text.slice(pos,m.index);
  if(!/^[\s~～|｜/／,，;；()（）\[\]-]*$/.test(gap))return null;
  const onset=SOUTH_ORDER.find(o=>m[1].startsWith(o));let r=m[1].slice(onset.length),rime=SOUTH_RIMES[r];
  // Only the two reviewed Tian 'nasal mucus' forms use this exceptional mapping.
  if(r==='ɨ̃'&&['l','n'].includes(onset)&&source.startsWith('stedt-cb523fc3dc'))rime='en';
  if(r==='ɨ'&&['k','kʰ','g','x','ɣ','ħ','ʕ'].includes(onset))rime='i';
  const sharedRime=tian&&['i','ei','ɨ'].includes(r);
  if(sharedRime)rime=r==='ɨ'?(['k','kʰ','g','ŋ','x','ɣ'].includes(onset)?'i':'ıi'):r;
  if(luxi&&r==='ɨ'){
   if(['t','d'].includes(onset))rime='ei';
  }
  // Dental i is the source's apical-vowel notation outside Tian's separate i mapping.
  if(!tian&&r==='i'&&['ts','tsʰ','dz','s','z'].includes(onset))rime='rı';
  if(!rime||(!Object.hasOwn(SOUTH_TONES,m[2])&&m[2]!=='?'))return null;
  // Keep the vowel available for tone marking, including standalone /ɲi/.
  const nasalOverlap=['ɲ','ȵ'].includes(onset)&&rime.startsWith('i');
  const sep=count&&/^[\s-]*$/.test(gap)?'-':gap.replace(/[|｜]/g,' / ');
  let pojRime=rime;
  // The onset r and the r of the apical rime are written only once.
  if(SOUTH_ONSETS[onset][1]==='r'&&pojRime==='rı')pojRime='ı';
  let pojOnset=nasalOverlap?'n':SOUTH_ONSETS[onset][1];
  if(onset==='j'&&!sharedRime){pojOnset='';if(!/^[iıü]/.test(pojRime))pojRime='i'+pojRime;}
  if(onset==='w'&&!sharedRime){pojOnset='';if(!pojRime.startsWith('u'))pojRime='u'+pojRime;}
  pojRime=southYInitialRime(pojOnset,pojRime);
  const pojMarked=m[2]==='?'?pojRime+'⁇':southMark(pojRime,m[2],explicit);
  const pinyinOnset=nasalOverlap?'n':SOUTH_ONSETS[onset][0];
  let pinyinBaseRime=rime==='rı'?'i':rime;
  pinyinBaseRime=southYInitialRime(pinyinOnset,pinyinBaseRime);
  const core=pinyinPalatalCore(pinyinOnset+pinyinBaseRime);
  const pinyinRime=core.slice(pinyinOnset.length);
  const marked=m[2]==='?'?pinyinRime+'⁇':southMark(pinyinRime,m[2],explicit);if(marked===null)return null;
  const accentSep=sep==='-'?(/^[aeiouüı]/i.test(core)||(/n$/i.test(previousCore)&&/^g/i.test(core))?"'":''):sep;
  accent+=accentSep+pinyinOnset+marked;poj+=sep+pojOnset+pojMarked;
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
  const r=southernSpelling(a.correctedTerm||a.term,a.source);if(!r)continue;
  if(!result.some(v=>v.accent===r.accent&&v.poj===r.poj))result.push({...r,method:a.correctedTerm?'editorial-correction':'source',profile:a.source,attestationIds:[a.id]});
 }
 southernCache.set(w,result);return result;
}
function southernMappingHTML(){
 return `<details><summary>南部拼音对应</summary><p>调号拼音词内连写，后续音节以元音开头或 n 与 g 相接时用 ' 隔开；白话字以 - 分隔音节。韵尾 n 表示鼻化。55 ā · 33 a（明确标调时 a̱）· 35 á · 21 à · 13 ǎ。</p>`+
 mappingTable('声母',['IPA','调号拼音','白话字拼音'],Object.entries(SOUTH_ONSETS).filter(([k])=>k).map(([k,v])=>['/'+k+'/',...v]))+
 mappingTable('韵母',['IPA','调号拼音','白话字'],southernRimeRows().filter(([r])=>r!=='ɨ').map(([k,...v])=>['/'+k+'/',...v]))+
 mappingTable('分来源韵母',['来源','IPA','声母环境','调号拼音','白话字'],southernSourceRimeRows())+
 '<p>'+SOUTH_PINYIN_RULES+'</p><p>'+SOUTH_SOURCE_RIME_RULES+'</p><p>'+SOUTH_DOTLESS_I_RULES+'</p><p>南部白话字将 /dz, dʑ/ 写 j，/z/ 写 r；/ts, tɕ/ 统一写 c，/tsʰ, tɕʰ/ 统一写 ch，/s, ɕ/ 统一写 s。前元音 i、ü 前通常读为腭化音；这仅是正字法合并，不代表这些音在全部材料中已证明互补分布，原始 IPA 仍可在词条出处查看。</p><p>'+SOUTH_APICAL_RULES+'</p><p>田德生“鼻涕”的 /ɨ̃/ 写 en。原始音标可在词条出处中查看。</p></details>';
}
NOTATION_CONFIG.profiles.push({id:'yubao-60824',source:'yubao-60824',title:'中国语保 · 南部潭溪',kind:'south',count:2884,dialects:['南部'],status:'南部双方案',notes:[]});
