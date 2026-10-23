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
 const r=core.slice(onset.length);
 // After written j/q/x/y, this rime uses ie (jie/qie/xie/ye).
 // Preserve other rimes and the original tone digits.
 const rime=/^(?:tɕʰ?|dʑ|ɕ|j|ʑ)ɛ$/.test(core)?'ie':GRAMMAR_RIMES[r];
 if(rime===undefined){if(!r&&onset)return {ye:GRAMMAR_ONSETS[onset],accent:GRAMMAR_ONSETS[onset]};throw Error('Unmapped northern rime: '+core);}
 const base=normalizeInitialGlides(GRAMMAR_ONSETS[onset]+rime,core),t=GRAMMAR_NORTH_TONES[tone];
 if(tone&&!t)throw Error('Unmapped northern tone: '+core+tone);
 return {ye:base+(t||''),accent:t?accentSyllable(base,{x:1,f:2,r:3,v:4}[t]):pinyinPalatalCore(base)};
}
function grammarSouthSyllable(core,tone=''){
 const actual=core;
 core=core.replaceAll('e̞','e').replaceAll('E','e');
 // Xiang 2011, p. 40 prints only a single 5 on 'stone'. Leave its
 // romanization unmarked rather than inventing a second tone digit.
 if(actual==='lɯ'&&tone==='5')return southernSpelling(core+'33','grammar-source');
 core=core.replace(/^h/,'x').replaceAll('ɯɛ','ɯe').replaceAll('ɛ','e');
 // These cited sources write oral nasal codas explicitly, unlike the main lexicon.
 core=core.replace(/oŋ$/,'õ').replace(/ian$/,'iã').replace(/an$/,'ã').replace(/en$/,'ẽ');
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
 if(dialect==='north'&&explicitYe){
  const ye=normalizeYeInitials(raw.includes('ã')?explicitYe.replaceAll('ang','an'):explicitYe,raw);
  // A tone-free source has no tone letters to decode (the x in niexi is an onset).
  return {ye,accent:/[⁰¹²³⁴⁵⁶⁷⁸⁹0-9]/.test(raw)?yeToAccent(ye):ye};
 }
 const normalized=grammarIPANormalize(raw),result=dialect==='south'?{accent:'',poj:''}:{ye:'',accent:''};
 const nominalBoundaries=dialect==='north'?grammarNominalBoundaries(normalized):new Set();
 let end=0,count=0,previous='';
 for(const m of normalized.matchAll(/([\p{L}\p{M}ʔ]+)([0-9]*)/gu)){
  const gap=normalized.slice(end,m.index);
  if(/[A-Za-z0-9]/.test(gap))throw Error('Unparsed IPA: '+raw);
  const syll=dialect==='south'?grammarSouthSyllable(m[1],m[2]):grammarNorthSyllable(m[1],m[2]);
  for(const key of Object.keys(result)){
   let sep=count&&!gap&&key==='poj'?'-':gap;
   if(dialect==='north'){
    if(nominalBoundaries.has(m.index))sep='-';
    else if(previous==='ɲie'&&m[1]==='ɕi'&&/^\s*\(?$/.test(gap))sep=gap.replace(/\s/g,'');
   }
   const boundary=count&&!gap&&key==='accent'&&/^[aeiouüı]/.test(syll[key])?"'":'';
   result[key]+=sep+boundary+syll[key];
  }
  end=m.index+m[0].length;previous=m[1];count++;
 }
 if(!count)throw Error('No IPA segment: '+raw);
 for(const key of Object.keys(result))result[key]+=normalized.slice(end);
 return result;
}
// Reviewed combinations in inline examples. Homophonous lexical words are not
// inferred to be nominalizers; aligned examples use their explicit glosses below.
function grammarNominalBoundaries(ipa){
 const combinations=['ka35 tsʰi55','xu21 tsʰi21','zi55 tsʰi21','ka21 tsʰi55',
  'zi55 ma21','ka35 ma55','pa55 ma21','ka35 tso55','pʰo55 tso21',
  'sa55 ɕi21','lo21 ɕi21','ka35 ɲie55','ka55 ɲie21'];
 const boundaries=new Set();
 for(const combination of combinations){
  let from=0,index;while((index=ipa.indexOf(combination,from))!==-1){
   const end=index+combination.length;
   if((!index||/[\s[(-]/.test(ipa[index-1]))&&(end===ipa.length||/[\s)\],;=]/.test(ipa[end])))boundaries.add(index+combination.indexOf(' ')+1);
   from=end;
  }
 }
 return boundaries;
}
function grammarDisplayedSpelling(pair,dialect){return pair[dialect==='south'?(southernDisplay==='poj'?'poj':'accent'):(spellingDisplay==='ye'?'ye':'accent')];}
