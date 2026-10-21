// Southern Tujia spelling, agreed 2026-10-20. Never apply these rules to Northern data.
const SOUTH_ONSETS={
 'tɕʰ':['q','ch'],'tsʰ':['c','tsh'],'pʰ':['p','ph'],'tʰ':['t','th'],'kʰ':['k','kh'],
 'dʑ':['jj','j'],'dz':['zz','dz'],'tɕ':['j','c'],'ts':['z','ts'],
 'p':['b','p'],'t':['d','t'],'k':['g','k'],'b':['bb','b'],'d':['dd','d'],'g':['gg','g'],
 'm':['m','m'],'n':['n','n'],'ɲ':['ni','ni'],'ŋ':['ng','ng'],
 'f':['f','f'],'s':['s','s'],'z':['r','z'],'ɕ':['x','ŝ'],'ʑ':['y','y'],
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
 let t=plainTones(raw).normalize('NFC').replaceAll('u̵','ʉ').replaceAll('ɡ','g').replaceAll('ɑ','a').replaceAll('ʦ','ts').replaceAll('ʣ','dz').replaceAll('ʨ','tɕ').replaceAll('ʥ','dʑ').replaceAll('ȵ','ɲ').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ').replaceAll('d͡ʑ','dʑ');
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
 let pos=0,accent='',poj='',count=0;
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
  // Apical i after dental fricates uses ri in POJ; existing ri stays ri.
  const pojRime=r==='i'&&['ts','tsʰ','dz','s','z'].includes(onset)?'ri':rime;
  const pojMarked=m[2]==='?'?pojRime+'⁇':southMark(pojRime,m[2],explicit);
  accent+=sep+SOUTH_ONSETS[onset][0]+marked;poj+=sep+SOUTH_ONSETS[onset][1]+pojMarked;
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
 return `<details><summary>南部拼音对应</summary><p>词内音节以 - 分隔；韵尾 n 表示鼻化。55 ā · 33 a（明确标调时 a̱）· 35 á · 21 à · 13 ǎ。</p>`+
 mappingTable('声母',['IPA','调号拼音','白话字拼音'],Object.entries(SOUTH_ONSETS).filter(([k])=>k).map(([k,v])=>['/'+k+'/',...v]))+
 mappingTable('韵母',['IPA','拼写'],Object.entries(SOUTH_RIMES).map(([k,v])=>['/'+k+'/',v]))+
 '<p>舌尖元音在白话字中写 ri：tsri、tshri、dzri、sri、zri；调号拼音仍写 zi、ci、zzi、si、ri。原已写 ri 的韵母保持不变。</p><p>田德生“鼻涕”的 /ɨ̃/ 写 en。来源中的 /ɨ/ 在舌根、喉部声母后按 i 转写；其余独立记录写 ri。原始音标可在词条出处中查看。</p></details>';
}
NOTATION_CONFIG.profiles.push({id:'yubao-60824',source:'yubao-60824',title:'中国语保 · 南部潭溪',kind:'south',count:2884,dialects:['南部'],status:'南部双方案',notes:[]});
