// Read the same prepared entries as the website; never mutate source data.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(process.argv[2]||'site'),output=process.argv[3];
if(!output)throw new Error('Usage: node scripts/export-loan-screening.cjs PREPARED_SITE OUTPUT.json');
const read=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
const core=read('core'),c=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'editorial-notes.js'),'utf8'),c);
const notes=vm.runInContext('EDITORIAL_NOTES.filter(n=>n.id.startsWith("chinese-loan-"))',c);
const chunks=new Map(),words=[];
for(const mini of core.words){
 if(!chunks.has(mini._chunk))chunks.set(mini._chunk,read('words-'+mini._chunk));
 const w=chunks.get(mini._chunk).find(w=>w.id===mini.id);
 if(!w)throw new Error('Missing prepared detail: '+mini.id);
 const ids=[...new Set([w.id,...w.mergedWordIds||[],...(w.attestations||[]).map(a=>a.id)])];
 // Prepared entry notes include embedded notes carried through source merging,
 // as well as editorial notes addressed to a merged alias. Use the same set as
 // the published reader rather than reconstructing it from IDs alone.
 const entry=read('entries/'+mini.id);
 const wordNotes=(entry._entryNotes||[]).filter(n=>n.id?.startsWith('chinese-loan-'));
 if(Boolean(mini._loan.scope)!==Boolean(wordNotes.length))throw new Error('Inconsistent prepared loan notes: '+w.id);
 words.push({id:w.id,aliases:ids,zh:w.zh,en:w.en,ipa:mini._ipa,spelling:mini._display,
  source:w.source,sourceIds:w.sourceIds,dialect:w.dialect,location:w.location||'',
  scope:mini._loan.scope,notes:wordNotes});
}
fs.writeFileSync(output,JSON.stringify({words},null,2)+'\n');
console.log('Exported',words.length,'entries and',notes.length,'loan notes');
