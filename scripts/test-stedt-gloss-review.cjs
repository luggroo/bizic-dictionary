// Review projections, source preservation, exact aliases and form-specific names.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const read=name=>fs.existsSync(path.join(root,name))?fs.readFileSync(path.join(root,name),'utf8'):zlib.gunzipSync(fs.readFileSync(path.join(root,name+'.gz'))).toString();
const c=vm.createContext({console,URLSearchParams,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(read(name))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','lexical-reviews.js','word-classes.js','editorial-notes.js','ui-translations.js'])vm.runInContext(read(f),c,{filename:f});
const app=read('app.js');vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),c);
const batch=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/stedt-loan-gloss-review-2026-10-23.json'),'utf8'));
const plain=x=>JSON.parse(JSON.stringify(x));
(async()=>{
 const data=JSON.parse(read('data.json'));Object.assign(data,JSON.parse(read('dictionary.json')));
 await c.loadYubao(data);c.normalizeIPAData(data);c.removeExcludedSource(data);
 const evidence=new Map(data.words.flatMap(w=>w.attestations||[]).map(a=>[a.id,JSON.stringify(a)]));
 c.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',c);
 c.mergeDictionaryWords(data);c.initializeSpellingBoundaries(data);
 const by=new Map(data.words.map(w=>[w.id,w]));
 const categoryBaseline=plain(data.words),categoryById=new Map(categoryBaseline.map(w=>[w.id,w]));
 for(const d of batch.decisions){const w=categoryById.get(d.id);w.zh=d.beforeZh;if(w.lexicalGlossReview)delete w.lexicalGlossReview.semanticGloss;}
 c.initializeSemanticCategories(categoryBaseline);
 const categories=new Map(categoryBaseline.map(w=>[w.id,JSON.stringify(c.wordSemanticCategories(w))]));
 c.initializeSemanticCategories(data.words);
 for(const w of data.words)assert.equal(JSON.stringify(c.wordSemanticCategories(w)),categories.get(w.id),w.id+' topic filtering survives the new headword');
 const score=(w,q,language='zh')=>{c.fixture=w;c.query=q;c.language=language;vm.runInContext('state.q=query;state.searchLanguage=language;state.exact=true;',c);return c.wordSearchScore(w);};
 let aliases=0,forms=0;
 for(const d of batch.decisions){
  const w=by.get(d.id),r=d.review;assert(w,d.id);
  assert.equal(w.zh,r.zh,d.id+' display Chinese');assert.equal(w.en,r.en,d.id+' display English');
  assert.deepEqual(Array.from(c.wordIPA(w)),d.originalIPA,d.id+' original IPA and tone values');
  assert.equal(c.modernChineseLoanInfo(w).scope,d.originalLoanScope,d.id+' borrowing scope');
  for(const a of r.zhAliases){assert.equal(score(w,a),100,d.id+' exact Chinese alias '+a);aliases++;}
  for(const mode of Object.keys(d.originalSpellings)){
   c.mode=mode;vm.runInContext('spellingDisplay=mode;southernDisplay=mode;',c);
   assert.deepEqual(Array.from(c.completeSpellings(w),v=>v.text),d.originalSpellings[mode].map(v=>v.text),d.id+' '+mode+' spelling');
  }
  for(const form of r.formHeadwords||[]){
   assert(c.formHeadwordHTML(w,form.ipa).includes('〔'+form.zh+'〕'),d.id+' named IPA');forms++;
   for(const ipa of c.wordIPA(w))if(!r.formHeadwords.some(f=>c.loanIPAForms(f.ipa)[0]===c.loanIPAForms(ipa)[0]))assert.equal(c.formHeadwordHTML(w,ipa),'',d.id+' other form has no inherited Chinese name');
  }
  for(const a of w.attestations||[])assert.equal(JSON.stringify(a),evidence.get(a.id),d.id+' original attestation '+a.id);
 }
 for(const [id,zh] of [['stedt-rn-288670','县长'],['stedt-rn-289611','县长'],['stedt-rn-288671','书记（文书；办事员）'],['stedt-rn-289612','书记（文书；办事员）']])assert.equal(by.get(id).zh,zh);
 for(const id of ['stedt-rn-288670','stedt-rn-289611'])assert.equal(score(by.get(id),'县官'),0,'superseded official title is not an active sense');
 for(const [ids,old] of [[['stedt-rn-288511','stedt-rn-289452','stedt-rn-384788'],'January'],[['stedt-rn-288521','stedt-rn-289462'],'November'],[['stedt-rn-288522','stedt-rn-289463'],'December']])for(const id of ids){
  const w=by.get(id);assert(w.en.includes('lunar month'));assert.equal(score(w,old,'en'),0,id+' excludes Gregorian sense');assert(w.attestations.some(a=>a.en===old),id+' original English retained');
 }
 for(const [id,name,ipa] of [['stedt-rn-288932','优点','jiu⁵⁵tiã⁵⁵'],['stedt-rn-289301','光明','kuã⁵⁵mĩ²¹']]){
  const w=by.get(id);assert(!w.zh.startsWith(name));assert(c.notationCells(w).includes('〔'+name+'〕'));assert(c.wordCardNotation(w).includes('〔'+name+'〕'));assert(c.formHeadwordHTML(w,ipa));
 }
 for(const item of batch.retained)assert.equal(by.get(item.id).zh,item.zh,item.id+' pending or retained meaning');
 assert.equal(c.modernChineseLoanBadge(by.get('w1612')),'','little-finger comparison is not a modern loan');
 for(const id of ['w4124','yubao-60757-v-2317'])assert.equal(c.modernChineseLoanBadge(by.get(id)),'',id+' early 官 remains separate');
 for(const w of data.words)for(const a of w.attestations||[])assert.equal(JSON.stringify(a),evidence.get(a.id),a.id+' all source records preserved');
 const coreFile=path.join(root,'prepared/core.json.gz');
 if(fs.existsSync(coreFile)){
  const core=new Map(JSON.parse(zlib.gunzipSync(fs.readFileSync(coreFile))).words.map(w=>[w.id,w]));
  for(const d of batch.decisions){
   const full=by.get(d.id),mini=core.get(d.id);assert.equal(mini.zh,full.zh,d.id+' prepared title');
   for(const a of d.review.zhAliases)assert.equal(score(mini,a),100,d.id+' prepared exact alias '+a);
   c.mode='accent';vm.runInContext('spellingDisplay=mode;southernDisplay=mode;',c);
   assert.equal(c.wordCardNotation(mini),c.wordCardNotation(full),d.id+' prepared form-name display');
  }
 }
 console.log('PASS: '+batch.decisions.length+' entry updates, '+aliases+' exact Chinese aliases, '+forms+' named IPA forms; source evidence, phonology, loan masks, native alternatives and lunar/official senses.');
})().catch(e=>{console.error(e);process.exit(1)});
