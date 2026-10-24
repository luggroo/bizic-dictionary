// Verify the reviewed categories and boundaries against real merged source records.
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||'site');
const ctx=vm.createContext({console,URLSearchParams,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','lexical-reviews.js','word-classes.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','editorial-notes.js','ui-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),ctx);
const run=s=>vm.runInContext(s,ctx);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 const dictionary=path.join(root,'dictionary.json');
 Object.assign(data,JSON.parse(fs.existsSync(dictionary)?fs.readFileSync(dictionary,'utf8'):zlib.gunzipSync(fs.readFileSync(dictionary+'.gz'))));
 await ctx.loadYubao(data);ctx.normalizeIPAData(data);ctx.removeExcludedSource(data);
 const before=new Map(data.words.flatMap(w=>w.attestations||[]).map(a=>[a.id,JSON.stringify(a)]));
 ctx.data=data;run('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));');ctx.mergeDictionaryWords(data);
 const notationBefore=JSON.stringify(data.words.map(w=>w.notations));ctx.initializeSpellingBoundaries(data);
 assert.equal(JSON.stringify(data.words.map(w=>w.notations)),notationBefore,'source notations unchanged');
 for(const w of data.words)for(const a of w.attestations||[])assert.equal(JSON.stringify(a),before.get(a.id),a.id+' original evidence');
 const by=new Map(data.words.map(w=>[w.id,w]));const get=id=>by.get(data.wordAliases[id]||id);
 let classified=0;
 for(const [category,ids]of Object.entries(run('LEXICAL_REVIEWS.groups')))for(const id of ids.split(' ')){
  const w=get(id);assert(w,id+' missing');ctx.w=w;
  assert(run('WordClasses.ids(w)').includes(category),id+' category');classified++;
 }
 assert.equal(classified,11518);assert.equal(data.words.length,16577);
 const check=(id,category)=>{ctx.w=get(id);assert(run('WordClasses.ids(w)').includes(category),id);};
 for(const point of ['60757','60756','60823','60824']){
  for(const number of ['1073','1074','1075'])check('yubao-'+point+'-v-'+number,'numeral');
  check('yubao-'+point+'-v-0509','phrase.subject_predicate');
  check('yubao-'+point+'-v-0909','verb.modal');check('yubao-'+point+'-v-0913','verb.modal');
  check('yubao-'+point+'-v-1081','interrogative');
 }
 check('w17','affix.suffix.verbal');check('yubao-60757-v-0273','phrase.verb');
 check('w2192','property');assert.equal(get('w2192').zh,'怀孕');assert.equal(get('w419').zh,'水沸');assert.equal(get('w1236').zh,'裂开');
 assert.equal(get('stedt-rn-454490').zh,'酒壶');assert.equal(get('stedt-rn-127290').zh,'拃');
 for(const id of ['yubao-60756-v-1122','yubao-60823-v-1122']){check(id,'phrase.quantity');assert.equal(get(id).zh,'一点');}
 for(const id of ['yubao-60757-v-1140','yubao-60757-v-1080']){ctx.w=get(id);assert(!run('WordClasses.ids(w)').includes('pronoun'));assert(!run('WordClasses.ids(w)').includes('numeral'));}
 let boundaries=0;
 for(const reviewed of run('LEXICAL_BOUNDARY_REVIEWS'))for(const mode of reviewed.mode?[reviewed.mode]:['accent','ye']){
  const rule={...reviewed,mode};
  const w=get(rule.wordIds[0]);ctx.w=w;ctx.mode=rule.mode;ctx.rule=rule;
  const forms=run('spellingDisplay=mode;southernDisplay=mode;completeSpellings(w).map(v=>v.text)');
  const matching=forms.filter(t=>{
   if(rule.mode==='ye')t=t.replace(/([a-züê]*?[aeiouüê][a-züê]*?)[xfrv]/gi,'$1');
   return ctx.boundaryPlain(t).replace(/[\s'’-]/g,'')===rule.key;
  });
  assert(matching.length,rule.wordIds[0]+' '+rule.mode+' missing '+rule.key+' in '+forms);
  assert(matching.some(t=>t.includes(' ')),rule.wordIds[0]+' missing word space');boundaries++;
 }
 for(const [id,forms]of Object.entries(run('LEXICAL_IPA_BOUNDARIES'))){
  const w=get(id);for(const [original,display]of Object.entries(forms)){
   assert.equal(display.replace(/\s/g,''),original,id+' changed phonology');
   assert(ctx.wordIPA(w).includes(display),id+' missing display IPA');
  }
 }
 ctx.w=get('yubao-60757-v-0273');assert(run('WordClasses.badges(w)').includes('word-class-inferred'));
 assert(!run('WordClasses.badges(w)').replace(/<[^>]+>/g,'').includes('AI'),'no visible AI label');
 assert(run('WordClasses.explanation(w,"phrase.verb","en")').includes('AI assistance'));
 ctx.w=get('w17');assert(!run('WordClasses.badges(w)').includes('word-class-inferred'),'source label stays unmarked');
 for(const id of ['yubao-60756-v-0521','yubao-60756-v-0740'])assert.equal(ctx.modernChineseLoanInfo(get(id)).scope,'whole');
 assert.equal(ctx.modernChineseLoanInfo(get('yubao-60756-v-1857')).scope,'component');
 const note=ctx.editorialNotesFor(get('yubao-60757-v-0273')).find(n=>n.id==='site-pos-inference');ctx.note=note;
 assert(note);assert(run('UI_TRANSLATIONS[note.text]').includes('may be incorrect'));
 console.log(`PASS: ${classified} reviewed classifications, ${boundaries} spelling rules, all source evidence preserved, OV/SV, numerals, pronouns, modals and provenance.`);
})().catch(e=>{console.error(e);process.exit(1)});
