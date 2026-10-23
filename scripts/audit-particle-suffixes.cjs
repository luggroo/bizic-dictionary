// Regression audit against actual merged Northern entries with a source hyphen.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../site');
const c=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async p=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'))})});
for(const file of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','lexical-reviews.js','word-merge.js','editorial-notes.js'])
 vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),c);
(async()=>{
 const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 Object.assign(d,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await c.loadYubao(d);c.removeExcludedSource(d);c.initializeSemanticCategories(d.words);
 c.data=d;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',c);
 c.mergeDictionaryWords(d);
 const by=new Map(d.words.map(w=>[w.id,w]));
 const expected={w4:'goal-po',w51:'source-lie',w55:'agent-ma',w59:'associative-nie',w74:'nominalizer-xi',w80:'locative-tsuo'};
 for(const [id,key] of Object.entries(expected)){
  const w=by.get(id);assert(w,'missing '+id);
  assert(w.dialect==='北部');
  assert(/^[-‐‑−]/u.test(String(w.term)),id+' lost its hyphen');
  const notes=c.particleToneNotesFor(w);
  assert(notes.some(n=>n.id==='feng-2019-tone-'+key),id+' missing '+key);
  assert.equal(c.editorialNotesFor(w).filter(n=>n.id==='feng-2019-tone-'+key).length,1,id+' duplicate note');
 }
 for(const id of ['w3','w52','w53','w75','w79','w2867','w2869']){
  const w=by.get(id);assert(w);
  assert.equal(c.particleToneNotesFor(w).length,0,id+' should not inherit the unrelated particle rule');
 }
 const affixes=d.words.filter(w=>w.dialect==='北部'&&String(w.term).startsWith('-'));
 console.log('PASS: '+affixes.length+' Northern hyphenated entries audited; '+Object.keys(expected).length+' relevant affixes covered, unrelated functions excluded.');
})().catch(e=>{console.error(e);process.exitCode=1});
