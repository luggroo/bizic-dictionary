// Compare cached search/display records with their complete source records.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const read=n=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',n+'.json.gz'))));
const core=read('core');
const fullWords=fs.readdirSync(path.join(root,'prepared')).filter(n=>/^words-\d+\.json.gz$/.test(n)).sort((a,b)=>parseInt(a.slice(6))-parseInt(b.slice(6))).flatMap(n=>read(n.replace('.json.gz','')));
function context(data){
 const ctx=vm.createContext({console,URL,URLSearchParams,Map,Set,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}}});
 const files=['brassett-grammar.js','grammar-data.js','comparison-merge.js','research.js','grammar-dialects.js','south-zhou-phonology.js','notation-profiles.js','ipa-normalize.js','notation-ui.js','southern-notation.js','grammar-integrated.js','grammar-evidence.js','yubao.js','semantic-categories.js','word-classes.js','editorial-notes.js','spelling-boundaries.js','notation-pairs.js'];
 for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("window.addEventListener('popstate'")),ctx);
 ctx.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));WordClasses.initialize(D.words);',ctx);
 ctx.initializeSemanticCategories(data.words);return ctx;
}
const baseline=context({...core,words:fullWords}),fast=context(core);
assert.equal(core.words.length,fullWords.length);
let assertions=0;
const equal=(a,b,label)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),label);assertions++;};
for(let i=0;i<fullWords.length;i++){
 const a=fullWords[i],b=core.words[i];equal(a.id,b.id,'record order');
 equal(baseline.wordIPA(a),fast.wordIPA(b),a.id+' IPA');
 equal(baseline.modernChineseLoanInfo(a),fast.modernChineseLoanInfo(b),a.id+' loan scope');
 equal(baseline.wordSemanticCategories(a),fast.wordSemanticCategories(b),a.id+' semantics');
 for(const mode of ['accent',baseline.isSouthernWord(a)?'poj':'ye']){
  for(const c of [baseline,fast]){c.mode=mode;vm.runInContext('spellingDisplay=mode;southernDisplay=mode;',c);}
  equal(baseline.notationHead(a),fast.notationHead(b),a.id+' '+mode);
 }
}
const searches=[['水',''],['water','en'],["'",'tujia'],['’','tujia'],['ce','tujia'],['here','en'],['there','en'],['否定','zh'],['ıi','tujia'],['','']];
for(const [q,searchLanguage]of searches)for(const exact of [false,true])for(const hideWholeLoans of [false,true]){
 for(const c of [baseline,fast]){c.patch={q,searchLanguage,exact,hideWholeLoans};vm.runInContext('state={...DEFAULT_STATE,...patch}',c);}
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),fast.data.words.filter(fast.wordMatches).map(w=>w.id),'search '+JSON.stringify({q,searchLanguage,exact,hideWholeLoans}));
}
for(const pos of ['lexical','noun','verb','verb.transitive','pronoun','function','particle','morphology','affix.suffix','other']){
 for(const c of [baseline,fast]){c.pos=pos;vm.runInContext('state={...DEFAULT_STATE,pos}',c);}
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),fast.data.words.filter(fast.wordMatches).map(w=>w.id),'POS '+pos);
}
if(process.env.PREPARED_REFERENCE){
 const reference=JSON.parse(fs.readFileSync(process.env.PREPARED_REFERENCE));
 equal(fullWords,reference.words.map(({_search,_semantic,...w})=>w),'all evidence retained');
 for(const s of [...reference.sources,...(reference.sourceVariants||[])]){
  const mini=[...core.sources,...(core.sourceVariants||[])].find(x=>x.id===s.id);
  equal(mini._textChunk?read(mini._textChunk).text:mini.text,s.text||'',s.id+' full text');
 }
}
console.log('PASS: '+assertions+' checks; '+fullWords.length+' words; every IPA, spelling, loan marker and semantic label; 40 query/filter combinations and 10 POS groups.');
