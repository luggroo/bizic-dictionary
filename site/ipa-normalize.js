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
function normalizeIPA(value){
 return normalizeIPAAspiration(value).replace(/([\p{L}\p{M}\]])([0-9]+)/gu,(_,base,digits)=>base+[...digits].map(d=>IPA_TONE_SUPERSCRIPTS[Number(d)]).join(''));
}
function ipaIdentity(value){
 return normalizeIPA(value).normalize('NFC').replace(/[\t \u00a0\u2009\u202f]+/gu,' ').trim();
}
function mergeIPANotations(values){
 const unique=items=>[...new Set(items.filter(x=>x!==undefined&&x!==null&&x!==''))];
 const result=[],seen=new Map();
 for(const item of values||[]){
  if(!item?.text)continue;
  const text=normalizeIPA(item.text),key=ipaIdentity(text);
  if(!key)continue;
  const originals=unique([...(item.originalTexts||[]),...(item.text===text?[]:[item.text])]);
  const profiles=unique([...(item.sourceProfiles||[]),item.profile]);
  const methods=unique([...(item.sourceMethods||[]),item.method]);
  const previous=seen.get(key);
  if(previous){
   previous.attestationIds=unique([...(previous.attestationIds||[]),...(item.attestationIds||[])]);
   previous.originalTexts=unique([...(previous.originalTexts||[]),...originals]);
   previous.sourceProfiles=unique([...(previous.sourceProfiles||[]),...profiles]);
   previous.sourceMethods=unique([...(previous.sourceMethods||[]),...methods]);
  }else{
   const next={...item,text,attestationIds:unique(item.attestationIds||[])};
   if(originals.length)next.originalTexts=originals;
   if(profiles.length)next.sourceProfiles=profiles;
   if(methods.length)next.sourceMethods=methods;
   seen.set(key,next);result.push(next);
  }
 }
 return result;
}
function normalizeIPAWord(word){
 if(word?.notations?.ipa)word.notations.ipa=mergeIPANotations(word.notations.ipa);
 return word;
}
function normalizeIPAData(data){
 for(const word of data.words||[])normalizeIPAWord(word);
 for(const item of data.corpus||[]){
  if(typeof item.ipa==='string')item.ipa=normalizeIPA(item.ipa);
  for(const block of item.blocks||[])if(typeof block.ipa==='string')block.ipa=normalizeIPA(block.ipa);
 }
 return data;
}
if(typeof module!=='undefined'&&module.exports)
 module.exports={normalizeIPAAspiration,normalizeIPA,ipaIdentity,mergeIPANotations,normalizeIPAWord,normalizeIPAData};
