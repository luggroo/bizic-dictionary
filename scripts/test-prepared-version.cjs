// Run after expanding the website datasets. A note-only edit must bust caches.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'loan-prepared-version-'));
try{
 fs.cpSync(root,fixture,{recursive:true,filter:name=>path.basename(name)!=='prepared'});
 const build=()=>{
  execFileSync(process.execPath,[path.join(__dirname,'prepare-search-data.cjs'),fixture],{stdio:'pipe'});
  const version=fs.readFileSync(path.join(fixture,'index.html'),'utf8').match(/name="prepared-data-version" content="([^"]+)"/)[1];
  const core=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(fixture,'prepared/core.json.gz'))));
  return {version,core};
 };
 const original=build(),notes=path.join(fixture,'editorial-notes.js'),source=fs.readFileSync(notes,'utf8');
 const dictionaryHash=()=>crypto.createHash('sha256').update(fs.readFileSync(path.join(fixture,'dictionary.json'))).digest('hex');
 const before=dictionaryHash(),marker='"id":"chinese-loan-w2335"';
 assert(source.includes(marker),'fixture loan annotation must exist');
 assert.equal(original.core.words.find(w=>w.id==='w2335')._loan.scope,'whole');
 // Keep the text, IPA, sense and all sources; remove only badge recognition.
 fs.writeFileSync(notes,source.replace(marker,'"id":"version-test-w2335"'));
 const changed=build();
 assert.equal(changed.core.words.find(w=>w.id==='w2335')._loan.scope,'');
 assert.notEqual(changed.version,original.version,'note-only badge changes require a new prepared URL');
 assert.equal(dictionaryHash(),before,'source dictionary must be unchanged');
 console.log('PASS: note-only loan badge changes invalidate prepared data without changing dictionary sources.');
}finally{fs.rmSync(fixture,{recursive:true,force:true});}
