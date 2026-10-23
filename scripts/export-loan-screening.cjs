// Read the same prepared entries as the website; never mutate source data.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(process.argv[2]||'site'),output=process.argv[3];
if(!output)throw new Error('Usage: node scripts/export-loan-screening.cjs PREPARED_SITE OUTPUT.json');
const read=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
const core=read('core'),c=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'editorial-notes.js'),'utf8'),c);
const notes=vm.runInContext('EDITORIAL_NOTES.filter(n=>n.id.startsWith("chinese-loan-"))',c);
const byId=new Map();
for(const note of notes)for(const id of note.wordIds){if(!byId.has(id))byId.set(id,[]);byId.get(id).push(note);}
const chunks=new Map(),words=[];
for(const mini of core.words){
 if(!chunks.has(mini._chunk))chunks.set(mini._chunk,read('words-'+mini._chunk));
 const w=chunks.get(mini._chunk).find(w=>w.id===mini.id);
 if(!w)throw new Error('Missing prepared detail: '+mini.id);
 const ids=[...new Set([w.id,...w.mergedWordIds||[],...(w.attestations||[]).map(a=>a.id)])];
 const wordNotes=[...new Map(ids.flatMap(id=>byId.get(id)||[]).map(n=>[n.id,n])).values()];
 if(Boolean(mini._loan.scope)!==Boolean(wordNotes.length))throw new Error('Rebuild prepared data before exporting changed loan notes: '+w.id);
 words.push({id:w.id,aliases:ids,zh:w.zh,en:w.en,ipa:mini._ipa,spelling:mini._display,
  source:w.source,sourceIds:w.sourceIds,dialect:w.dialect,location:w.location||'',
  scope:mini._loan.scope,notes:wordNotes});
}
fs.writeFileSync(output,JSON.stringify({words},null,2)+'\n');
console.log('Exported',words.length,'entries and',notes.length,'loan notes');
