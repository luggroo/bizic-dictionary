/* Canonical IPA for the published dictionary; source attestations remain verbatim.
 * Apostrophe U+0027 / right quote U+2019 and plain h signify aspiration only
 * after an IPA stop/affricate. U+02BC (ejective) and standalone /h/ are distinct.
 * Never apply this to Ye, Brassett or POJ romanization.
 */
const IPA_TONE_SUPERSCRIPTS='⁰¹²³⁴⁵⁶⁷⁸⁹';
function normalizeIPAAspiration(value){
 return String(value??'').normalize('NFC')
  .replace(/(tɕ|tʂ|tʃ|ts|dʑ|dz|ʦ|ʨ|ʧ|ʥ|ʈ|ɖ|p|b|t|d|k|g|q|c|ɟ)(?:h|['’])/gu,'$1ʰ');
}
function normalizeIPA(value,options={}){
 let text=normalizeIPAAspiration(value)
  .replace(/ɲ̟|ɲ|ɳ/gu,'ȵ')
  .replace(/([szʦʣǳ](?:[͜͡]?ʰ)?)ɨ(?![\p{L}\p{M}])/gu,'$1ɿ')
  .replace(/([ʂʐ](?:ʰ)?)ɨ(?![\p{L}\p{M}])/gu,'$1ʅ');
 if(options.brassett)text=text.replaceAll('f','ɸ');
 return text.replace(/([\p{L}\p{M}\]])([0-9]+)/gu,(_,base,digits)=>base+[...digits].map(d=>IPA_TONE_SUPERSCRIPTS[Number(d)]).join(''));
}
function ipaIdentity(value){
 return normalizeIPA(value).normalize('NFC').replace(/[\t \u00a0\u2009\u202f]+/gu,' ').trim();
}
function mergeIPANotations(values,word){
 const unique=items=>[...new Set(items.filter(x=>x!==undefined&&x!==null&&x!==''))];
 const result=[],seen=new Map();
 for(const item of values||[]){
  if(!item?.text)continue;
  const profiles=[...(item.sourceProfiles||[]),item.profile];
  const witnesses=(word?.attestations||[]).filter(a=>(item.attestationIds||[]).includes(a.id));
  const brassett=profiles.includes('brassett-phonetic')||witnesses.length>0&&witnesses.every(a=>isBrassettSource(a.source));
  const text=normalizeIPA(item.text,{brassett}),key=ipaIdentity(text);
  if(!key)continue;
  const originals=unique([...(item.originalTexts||[]),...(item.text===text?[]:[item.text])]);
  const sourceProfiles=unique(profiles);
  const methods=unique([...(item.sourceMethods||[]),item.method]);
  const previous=seen.get(key);
  if(previous){
   previous.attestationIds=unique([...(previous.attestationIds||[]),...(item.attestationIds||[])]);
   previous.originalTexts=unique([...(previous.originalTexts||[]),...originals]);
   previous.sourceProfiles=unique([...(previous.sourceProfiles||[]),...sourceProfiles]);
   previous.sourceMethods=unique([...(previous.sourceMethods||[]),...methods]);
  }else{
   const next={...item,text,attestationIds:unique(item.attestationIds||[])};
   if(originals.length)next.originalTexts=originals;
   if(sourceProfiles.length)next.sourceProfiles=sourceProfiles;
   if(methods.length)next.sourceMethods=methods;
   seen.set(key,next);result.push(next);
  }
 }
 return result;
}
function isBrassettSource(source){
 return /brassett/i.test(source||'')||['1EkBQ1pph-C7zHYTg9wuraMsM7cgCwnfE','165XnSc-ZLEptpsYT3_gGkCR2lMznvbIO','stedt-07898ef938','stedt-39f4cd9a6b','1w-0oecUhi3MkzPM64qzGNWsm7WSNa_YF'].includes(source);
}
function normalizeIPAWord(word){
 if(word?.notations?.ipa)word.notations.ipa=mergeIPANotations(word.notations.ipa,word);
 return word;
}
function normalizeIPAData(data){
 for(const word of data.words||[])normalizeIPAWord(word);
 for(const item of data.corpus||[]){
  const options={brassett:isBrassettSource(item.source)};
  if(typeof item.ipa==='string')item.ipa=normalizeIPA(item.ipa,options);
  for(const block of item.blocks||[])if(typeof block.ipa==='string')block.ipa=normalizeIPA(block.ipa,options);
 }
 return data;
}
if(typeof module!=='undefined'&&module.exports)
 module.exports={normalizeIPAAspiration,normalizeIPA,ipaIdentity,mergeIPANotations,normalizeIPAWord,normalizeIPAData};
