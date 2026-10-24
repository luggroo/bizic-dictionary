// Compare cached search/display records with their complete source records.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const read=n=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',n+'.json.gz'))));
const core=read('core');
const fullWords=fs.readdirSync(path.join(root,'prepared')).filter(n=>/^words-\d+\.json.gz$/.test(n)).sort((a,b)=>parseInt(a.slice(6))-parseInt(b.slice(6))).flatMap(n=>read(n.replace('.json.gz','')));
function context(data,compact=false){
 const ctx=vm.createContext({console,URL,URLSearchParams,Map,Set,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}}});
 const files=['brassett-grammar.js','grammar-data.js','comparison-merge.js','research.js','grammar-dialects.js','south-zhou-phonology.js','notation-profiles.js','ipa-normalize.js','notation-ui.js','southern-notation.js','grammar-integrated.js','grammar-evidence.js','yubao.js','semantic-categories.js','lexical-reviews.js','word-classes.js','editorial-notes.js','spelling-boundaries.js','notation-pairs.js'];
 for(const f of [...files.filter(f=>!compact||!['lexical-reviews.js','editorial-notes.js','spelling-boundaries.js'].includes(f)),'word-index.js','word-entry.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
 if(!compact)vm.runInContext(fs.readFileSync(path.join(root,'ui-translations.js'),'utf8'),ctx);
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("window.addEventListener('popstate'")),ctx);
 ctx.data=data;if(compact){ctx.payload=read('word-search');Object.assign(data,vm.runInContext('WordIndex.unpack(payload)',ctx));}
 vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));WordClasses.initialize(D.words);',ctx);
 ctx.initializeSemanticCategories(data.words);return ctx;
}
const baseline=context({...core,words:fullWords}),fast=context(core),compact=context({...core,words:[]},true);
// Alternatives split for reading, while the attested source string stays intact.
const husk=fullWords.find(w=>w.id==='stedt-rn-288782');
const huskCore=core.words.find(w=>w.id===husk.id);
assert(husk.attestations[0].term.includes('~'),'original alternative separator retained');
assert.deepEqual(Array.from(baseline.wordIPA(husk)),['kʰo⁵⁵tsʰo⁵⁵','pʰɨe⁵⁵tʰa⁵⁵kʰo⁵⁵tsʰo⁵⁵']);
for(const mode of ['accent','ye']){
 for(const c of [baseline,fast]){c.mode=mode;vm.runInContext('spellingDisplay=mode;',c);}
 const pairs=baseline.pairedNotationForms(husk);
 assert(pairs&&pairs.length===2,'two evidenced spelling/IPA pairs');
 assert.equal(pairs[0].ipa[0],'kʰo⁵⁵tsʰo⁵⁵');
 assert.equal(pairs[1].ipa[0],'pʰɨe⁵⁵tʰa⁵⁵kʰo⁵⁵tsʰo⁵⁵');
 assert.equal(baseline.notationCells(husk),fast.notationCells(huskCore),'lazy and complete alternative display agree');
 assert(!baseline.notationCells(husk).includes('~'));
}
assert.equal(baseline.pairedNotationForms({_ipa:['a⁵⁵','pa⁵⁵'],_display:{ye:[{text:'ax'},{text:'bax'}]}}),null,'do not pair by array order without source links');
assert.equal(core.words.length,fullWords.length);
let assertions=0;
const equal=(a,b,label)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),label);assertions++;};
for(let i=0;i<fullWords.length;i++){
 const a=fullWords[i],b=core.words[i];equal(a.id,b.id,'record order');
 const c=compact.data.words[i];equal(c.id,a.id,'compact record order');
 const {_entryNotes,_translations,...entry}=read('entries/'+a.id);
 equal(entry,a,a.id+' standalone entry preserves every source field');
 equal(baseline.editorialNotesHTML(a),compact.wordEntryNotesHTML({...c,...entry,_entryNotes}),a.id+' standalone entry preserves all annotations');
 for(const [zh,en]of Object.entries(_translations)){
  baseline.translationKey=zh;equal(vm.runInContext('UI_TRANSLATIONS[translationKey]',baseline),en,a.id+' annotation English translation');
 }
 for(const key of ['forms','chinese','english'])equal([...new Set(b._search[key])].sort(),[...new Set(c._search[key])].sort(),a.id+' compact search '+key);
 equal([...b._search.englishWords].sort(),[...compact.indexedWord(c).englishWords].sort(),a.id+' compact English tokens');
 equal(b._search.hasGlottal,c._search.hasGlottal,a.id+' compact glottal search');
 compact.posWord=c;
 equal(baseline.wordIPA(a),fast.wordIPA(b),a.id+' IPA');
 equal(baseline.modernChineseLoanInfo(a),fast.modernChineseLoanInfo(b),a.id+' loan scope');
 baseline.posWord=a;fast.posWord=b;
 equal(vm.runInContext('WordClasses.ids(posWord)',baseline),vm.runInContext('WordClasses.ids(posWord)',compact),a.id+' compact POS');
 equal(vm.runInContext('WordClasses.provenance(posWord)',baseline),vm.runInContext('WordClasses.provenance(posWord)',compact),a.id+' compact POS provenance');
 equal(vm.runInContext('WordClasses.ids(posWord)',baseline),vm.runInContext('WordClasses.ids(posWord)',fast),a.id+' POS');
 equal(vm.runInContext('WordClasses.provenance(posWord)',baseline),vm.runInContext('WordClasses.provenance(posWord)',fast),a.id+' POS provenance');
 equal(baseline.wordSemanticCategories(a),fast.wordSemanticCategories(b),a.id+' semantics');
 for(const mode of ['accent',baseline.isSouthernWord(a)?'poj':'ye']){
  for(const c of [baseline,fast,compact]){c.mode=mode;vm.runInContext('spellingDisplay=mode;southernDisplay=mode;',c);}
  equal(baseline.notationHead(a),fast.notationHead(b),a.id+' '+mode);
  equal(baseline.wordCardNotation(a),fast.wordCardNotation(b),a.id+' '+mode+' loan shading and paired forms');
  equal(baseline.wordTable([a]),compact.wordTable([c]),a.id+' '+mode+' compact card, loan shading and POS');
  equal(baseline.notationCells(a),fast.notationCells(b),a.id+' '+mode+' alternative loan shading');
 }
}
const searches=[['水',''],['water','en'],["'",'tujia'],['’','tujia'],['ce','tujia'],['here','en'],['there','en'],['否定','zh'],['ıi','tujia'],['','']];
for(const [q,searchLanguage]of searches)for(const exact of [false,true])for(const hideWholeLoans of [false,true]){
 for(const c of [baseline,fast,compact]){c.patch={q,searchLanguage,exact,hideWholeLoans};vm.runInContext('state={...DEFAULT_STATE,...patch}',c);}
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),fast.data.words.filter(fast.wordMatches).map(w=>w.id),'search '+JSON.stringify({q,searchLanguage,exact,hideWholeLoans}));
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),compact.data.words.filter(compact.wordMatches).map(w=>w.id),'compact search '+JSON.stringify({q,searchLanguage,exact,hideWholeLoans}));
}
for(const pos of ['lexical','noun','verb','verb.transitive','pronoun','function','particle','morphology','affix.suffix','other']){
 for(const c of [baseline,fast,compact]){c.pos=pos;vm.runInContext('state={...DEFAULT_STATE,pos}',c);}
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),fast.data.words.filter(fast.wordMatches).map(w=>w.id),'POS '+pos);
 equal(baseline.data.words.filter(baseline.wordMatches).map(w=>w.id),compact.data.words.filter(compact.wordMatches).map(w=>w.id),'compact POS '+pos);
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
