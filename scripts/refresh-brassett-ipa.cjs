// Regenerate only derived Brassett IPA; source records remain verbatim.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(process.argv.find((v,i)=>i>1&&!v.startsWith('--'))||path.join(__dirname,'../site'));
const archives=process.argv.includes('--write-archives');
const ctx=vm.createContext({localStorage:{getItem:()=>null},document:{addEventListener(){}},window:{addEventListener(){}}});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const isDerived=v=>v.method==='derived'&&v.profile==='brassett-phonetic'&&
 (v.sourceMethods||[]).every(m=>m==='derived')&&(v.sourceProfiles||[]).every(p=>p==='brassett-phonetic');
let changed=0,filled=0,spellingsFilled=0;
for(const name of ['data.json','dictionary.json']){
 const filename=path.join(root,name+(archives?'.gz':''));if(!fs.existsSync(filename))continue;
 const data=JSON.parse(archives?zlib.gunzipSync(fs.readFileSync(filename)):fs.readFileSync(filename,'utf8'));
 let dirty=false;
 for(const w of data.words||[]){
  const forms=w.notations?.brassett||[];if(!forms.length)continue;
  const before=w.notations.ipa||[],originalSources=JSON.stringify(w.attestations);
  const derived=forms.flatMap(v=>{
   const text=ctx.standardBrassettIPA(v.text);
   return text?[{text,method:'derived',profile:'brassett-phonetic',attestationIds:[...(v.attestationIds||[])]}]:[];
  });
  const next=ctx.mergeIPANotations([...before.filter(v=>!isDerived(v)),...derived]);
  if(JSON.stringify(next)!==JSON.stringify(before)){dirty=true;changed++;if(!before.length&&next.length)filled++;w.notations.ipa=next}
  if(!(w.notations.ye||[]).length){
   const spellings=forms.flatMap(v=>{
    const raw=ctx.normalizedBrassettText(v.text);
    return ctx.standardBrassettIPA(raw)?[{text:ctx.standardBrassettToYe(raw),method:'derived',profile:'brassett-to-ye',attestationIds:[...(v.attestationIds||[])]}]:[];
   });
   if(spellings.length){dirty=true;spellingsFilled++;w.notations.ye=spellings}
  }
  if(JSON.stringify(w.attestations)!==originalSources)throw Error('Source records changed: '+w.id);
 }
 if(dirty){const text=JSON.stringify(data);fs.writeFileSync(filename,archives?zlib.gzipSync(text,{level:9}):text)}
}
console.log(JSON.stringify({changedWords:changed,newlyFilledWords:filled,spellingsFilled,archives}));
