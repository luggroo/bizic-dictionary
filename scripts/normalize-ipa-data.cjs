/* Normalize published JSON (expanded from the archived .gz) without changing source attestations. */
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib');
const {normalizeIPAData,ipaIdentity}=require('../site/ipa-normalize.js');
const root=path.resolve(process.argv.find((v,i)=>i>1&&!v.startsWith('--'))||path.join(__dirname,'../site'));
const archives=process.argv.includes('--write-archives');
let words=0,duplicates=0,standardized=0;
for(const filename of ['data.json','dictionary.json']){
 const file=path.join(root,filename+(archives?'.gz':''));
 if(!fs.existsSync(file))continue;
 const data=JSON.parse(archives?zlib.gunzipSync(fs.readFileSync(file)):fs.readFileSync(file,'utf8'));
 for(const w of data.words||[]){
  words++;
  const before=w.notations?.ipa||[];
  const originals=before.map(v=>v.text);
  const keys=before.map(v=>ipaIdentity(v.text));
  duplicates+=keys.length-new Set(keys).size;
  standardized+=originals.filter((v,i)=>v!==require('../site/ipa-normalize.js').normalizeIPA(v)).length;
 }
 normalizeIPAData(data);
 for(const w of data.words||[]){
  const ipa=w.notations?.ipa||[];
  if(new Set(ipa.map(v=>ipaIdentity(v.text))).size!==ipa.length)throw Error('Duplicate canonical IPA in '+w.id);
 }
 const text=JSON.stringify(data);fs.writeFileSync(file,archives?zlib.gzipSync(text,{level:9}):text);
 console.log(filename+': '+(data.words?.length||0)+' words normalized');
}
console.log('IPA notation normalization: '+words+' words checked, '+standardized+' forms standardized, '+duplicates+' repeated forms coalesced; original attestations retained.');
