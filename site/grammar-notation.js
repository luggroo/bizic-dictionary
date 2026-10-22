/* Reference-grammar display only. Original IPA is never rewritten.
 * The four northern display classes also cover cited 44, 325 and 214
 * realizations. Southern 53/31 follow the source's 55/33 correspondences
 * (Xiang 2017, pp. 36–38); the numeric source record remains alongside.
 */
const GRAMMAR_ONSETS={
 'tɕʰ':'q','tsʰ':'c','pʰ':'p','tʰ':'t','kʰ':'k','tɕ':'j','ts':'z',
 'p':'b','t':'d','k':'g','m':'m','n':'n','ɲ':'n','ŋ':'ng','l':'l','s':'s','z':'r',
 'ɕ':'x','x':'h','ɣ':'hx','ʁ':'hx','j':'y','w':'w','ʑ':'y','f':'f','ʔ':"'",'b':'b','d':'d','g':'g','dz':'z','dʑ':'j','':''
};
const GRAMMAR_RIMES={
 'a':'a','ai':'ai','au':'ao','ou':'ou','u':'u','ia':'ia','iau':'iao','iu':'iu',
 'ua':'ua','uai':'uai','uei':'ui','ui':'ui','i':'i','e':'e','ɤ':'e','ɿ':'i','ɨ':'i','ɯ':'i',
 'ĩ':'in','ã':'an','iɛ̃':'ian','iã':'ian','uã':'uan','ɔ̃':'ong','õ':'ong','iɔ̃':'iong',
 'ɜŋ':'en','ɨe':'e','ɜ̃':'en','ɛ̃':'en','ẽ':'en','uɜ̃':'un','uɛ̃':'un','ũ':'un','ie':'ie','iɛ':'ie',
 'ɔ':'o','o':'o','uɔ':'o','ei':'ei','ɯi':'ei','ɯe':'e','ɯə':'e','ɯɛ':'e','uɛ':'uai','iə':'ie','iẽ':'ian','iuŋ':'iong','ue':'ue','uẽ':'uan','ə':'e',
 'an':'an','aŋ':'ang','en':'en','in':'in','ian':'ian','uan':'uan','un':'un','uin':'un',
 'oŋ':'ong','ioŋ':'iong','iŋ':'in','uŋ':'un','io':'io','iɔ':'io','ɛ':'ai','y':'ü',
 'ʊ':'u','ʊa':'ua','ʊo':'o','iaʊ':'iao','uo':'o','ɛn':'an','ong':'ong','uɐ':'ua','ɐ':'a','ɪ':'i','əu':'ou','ɤu':'ou','m̩':'m'
};
const GRAMMAR_NORTH_TONES={'55':'x','44':'x','24':'f','35':'f','325':'f','13':'f','21':'r','214':'r','33':'r','31':'r','51':'v','53':'v','54':'v'};
const GRAMMAR_SUPERS='⁰¹²³⁴⁵⁶⁷⁸⁹';
function grammarIPANormalize(raw){return normalizeIPAAspiration(plainTones(raw).normalize('NFC')).replaceAll('ɡ','g').replaceAll('ɑ','a').replaceAll('ȵ','ɲ').replaceAll('ɲ̟','ɲ').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ').replaceAll('ǳ','dz').replaceAll('ʣ','dz').replaceAll('ʥ','dʑ').replaceAll('t͡s','ts').replaceAll('t͡ɕ','tɕ');}
function grammarNorthSyllable(core,tone=''){
 const onset=Object.keys(GRAMMAR_ONSETS).sort((a,b)=>b.length-a.length).find(k=>core.startsWith(k));
 const r=core.slice(onset.length),rime=GRAMMAR_RIMES[r];
 if(rime===undefined){if(!r&&onset)return {ye:GRAMMAR_ONSETS[onset],accent:GRAMMAR_ONSETS[onset]};throw Error('Unmapped northern rime: '+core);}
 const base=normalizeYInitialSyllable(GRAMMAR_ONSETS[onset]+rime),t=GRAMMAR_NORTH_TONES[tone];
 if(tone&&!t)throw Error('Unmapped northern tone: '+core+tone);
 return {ye:base+(t||''),accent:t?accentSyllable(base,{x:1,f:2,r:3,v:4}[t]):pinyinPalatalCore(base)};
}
function grammarSouthSyllable(core,tone=''){
 const actual=core;
 core=core.replaceAll('e̞','e');
 if(core==='iu')return {accent:southMark('iu',tone||'33'),poj:southMark('iu',tone||'33')};
 core=core.replace(/^h/,'x').replaceAll('ɯɛ','ɯe').replaceAll('ɛ','e');
 // These cited sources write oral nasal codas explicitly, unlike the main lexicon.
 core=core.replace(/oŋ$/,'õ').replace(/ian$/,'iã').replace(/an$/,'ã');
 if(core==='m̩'||core==='m'){
  const t={'53':'55','51':'55','31':'33'}[tone]||tone;
  const mark=t?SOUTH_TONES[t]:'';if(mark===undefined)throw Error('Unmapped syllabic-m tone: '+tone);
  return {accent:('m'+mark).normalize('NFC'),poj:('m'+mark).normalize('NFC')};
 }
 const t={'53':'55','51':'55','31':'33'}[tone]||tone;
 if(!tone&&Object.hasOwn(SOUTH_ONSETS,core))return {accent:SOUTH_ONSETS[core][0],poj:SOUTH_ONSETS[core][1]};
 const out=southernSpelling(core+(t||'33'),'grammar-source');
 if(!out)throw Error('Unmapped southern form: '+actual+tone);
 return out;
}
function grammarSpelling(raw,dialect='north',explicitYe=''){
 if(dialect==='north'&&explicitYe){const ye=raw.includes('ã')?explicitYe.replaceAll('ang','an'):explicitYe;return {ye,accent:yeToAccent(ye)};}
 const normalized=grammarIPANormalize(raw),result=dialect==='south'?{accent:'',poj:''}:{ye:'',accent:''};
 let end=0,count=0;
 for(const m of normalized.matchAll(/([\p{L}\p{M}ʔ]+)([0-9]*)/gu)){
  const gap=normalized.slice(end,m.index);
  if(/[A-Za-z0-9]/.test(gap))throw Error('Unparsed IPA: '+raw);
  const syll=dialect==='south'?grammarSouthSyllable(m[1],m[2]):grammarNorthSyllable(m[1],m[2]);
  for(const key of Object.keys(result)){
   const sep=count&&!gap&&key==='poj'?'-':gap;
   const boundary=count&&!gap&&key==='accent'&&/^[aeiouüı]/.test(syll[key])?"'":'';
   result[key]+=sep+boundary+syll[key];
  }
  end=m.index+m[0].length;count++;
 }
 if(!count)throw Error('No IPA segment: '+raw);
 for(const key of Object.keys(result))result[key]+=normalized.slice(end);
 // Reviewed interlinear spellings retain their word and morpheme boundaries.
 if(dialect==='north'&&explicitYe){result.ye=explicitYe;result.accent=yeToAccent(explicitYe);}
 return result;
}
function grammarDisplayedSpelling(pair,dialect){return pair[dialect==='south'?(southernDisplay==='poj'?'poj':'accent'):(spellingDisplay==='ye'?'ye':'accent')];}
