const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const c=vm.createContext({console,URLSearchParams,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','word-classes.js','editorial-notes.js','ui-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),c);
const dictionary=fs.existsSync(path.join(root,'dictionary.json'))?JSON.parse(fs.readFileSync(path.join(root,'dictionary.json'),'utf8')):JSON.parse(execFileSync('python3',['-c',"import gzip,json,pathlib,runpy,sys; r=pathlib.Path(sys.argv[1]); d=json.loads(gzip.decompress((r/'dictionary.json.gz').read_bytes())); x=runpy.run_path(sys.argv[2])['apply_reviews'](d,json.loads((r/'gloss-reviews.json').read_text())['entries']); print(json.dumps(x))",root,path.join(__dirname,'apply-gloss-reviews.py')],{maxBuffer:64*1024*1024}).toString());
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));Object.assign(data,dictionary);await c.loadYubao(data);c.normalizeIPAData(data);c.removeExcludedSource(data);
 const sourceFields=a=>JSON.stringify({term:a.term,zh:a.zh,en:a.en,notice:a.notice,alt:a.alt});
 const surveyBefore=new Map(data.words.flatMap(w=>w.attestations||[]).filter(a=>a.id.startsWith('yubao-')).map(a=>[a.id,sourceFields(a)]));
 c.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',c);c.mergeDictionaryWords(data);c.initializeSpellingBoundaries(data);
 const by=new Map(data.words.map(w=>[w.id,w]));const get=id=>by.get(data.wordAliases[id]||id);
 for(const [id,zh]of Object.entries({'stedt-rn-289609':'总理','stedt-rn-288668':'总理','stedt-rn-289813':'钢笔','stedt-rn-288877':'钢笔','stedt-rn-290103':'提高','stedt-rn-289842':'工人阶级','stedt-rn-288915':'工人阶级','stedt-rn-289701':'裹脚','w2649':'爪爪','w264':'背箩'}))assert.equal(get(id).zh,zh,id);
 assert.equal(get('stedt-rn-205044').zh,'钢笔');
 for(const [id,wrong] of [['stedt-rn-289609','宰相'],['stedt-rn-288668','宰相'],['stedt-rn-205044','圈栏'],['stedt-rn-289813','圈栏'],['stedt-rn-288877','圈栏'],['stedt-rn-289842','无产阶级'],['stedt-rn-288915','无产阶级'],['stedt-rn-289701','绑腿']]){
  const w=get(id);assert(!(w.zhVariants||[]).some(s=>s.includes(wrong)),id+' obsolete translation in search');
  assert(!(w.senses||[]).some(s=>s.zh.includes(wrong)),id+' obsolete translation in merged senses');
 }
 assert.equal(vm.runInContext("UI_TRANSLATIONS['新借']",c),'Loan');
 assert.equal(vm.runInContext("UI_TRANSLATIONS['半借']",c),'Pt. loan');
 assert(!c.modernChineseLoanBadge(get('stedt-rn-289609')).includes('title='),'loan explanation must not depend on hover');

 for(const [id,zh,forbidden]of [['yubao-60824-v-1754','砌墙','土墙'],['w2476','外表','小伙子'],['stedt-rn-454791','外表','小伙子'],['stedt-rn-288801','铲; 锹','锤子'],['stedt-rn-289763','饭锅; 煮锅','锅铲']]){
  const w=get(id);assert.equal(w.zh,zh,id);assert(!c.editorialNotesFor(w).some(n=>n.text.includes(forbidden)),id+' rejected donor must not appear');
 }
 assert(c.editorialNotesFor(get('stedt-rn-288801')).some(n=>n.text==='可能借自西南官话，具体原词待考。'));
 for(const w of data.words)for(const a of w.attestations||[])if(surveyBefore.has(a.id))assert.equal(sourceFields(a),surveyBefore.get(a.id),a.id+' survey source changed');
 const allNotes=vm.runInContext("EDITORIAL_NOTES.filter(n=>n.id.startsWith('chinese-loan-'))",c);assert.equal(allNotes.length,2331);
 for(const n of allNotes){c.note=n.text;assert(vm.runInContext('UI_TRANSLATIONS[note]',c),'English translation missing: '+n.id);assert(n.wordIds.every(id=>get(id)),n.id+' dangling word');for(const id of n.wordIds)if(c.wordVarietyInfo(get(id)).kind!=='south')assert.equal(n.donorVariety,'西南官话',id+' northern donor variety');}
 for(const id of ['stedt-rn-290103','yubao-60824-v-2438'])assert(c.editorialNotesFor(get(id)).some(n=>n.donorVariety==='湘语'),id+' Xiang vowel correspondence');
 assert(c.editorialNotesFor(get('yubao-60824-v-2053')).some(n=>n.text==='可能借自西南官话或湘语「桂花」。'));
 const timed=c.editorialNotesFor(get('stedt-rn-288498')).find(n=>n.id==='chinese-loan-stedt-rn-288498');assert(timed.text.includes('/si²¹tɕe³⁵/')&&!timed.text.includes('si²¹ka³⁵'));
 for(const id of ['w112','w195','w124','w125','stedt-rn-453901','w2079','w42','w473','w50','w576'])assert(!c.editorialNotesFor(get(id)).some(n=>n.id.startsWith('chinese-loan-')),id+' excluded modern loan');
 assert(app.includes("editorialNotes:typeof editorialNotesFor==='function'?editorialNotesFor(w)"),'JSON export must include notes');
 for(const [id,donor] of Object.entries({'yubao-60756-v-0727':'圆珠笔','yubao-60824-v-0727':'圆珠笔','yubao-60756-v-0687':'老虎钳子','yubao-60756-v-0565':'灶神菩萨','yubao-60756-v-0544':'双胞胎'})){
  const n=c.editorialNotesFor(get(id)).find(n=>n.id==='chinese-loan-'+id);assert.equal(n.donor,donor);assert.equal(n.scope,'whole');
 }
 for(const id of ['w375','yubao-60756-v-0747','yubao-60823-v-0747','yubao-60824-v-0747']){
  const n=c.editorialNotesFor(get(id)).find(n=>n.id==='chinese-loan-'+id);assert.equal(n.scope,'component');assert(n.text.includes('部分'));assert.deepEqual(Array.from(n.reviewedForms[0].span),[1,2]);
 }
 assert.equal(c.reviewedSpelling(get('yubao-60756-v-0747'),'mǎjiǎnhā','accent'),'mǎjiǎn hā');
 assert.equal(c.reviewedSpelling(get('yubao-60756-v-0747'),'marjianrhax','ye'),'marjianr hax');
 for(const id of ['yubao-60823-v-0727','yubao-60823-v-0544'])assert(!c.editorialNotesFor(get(id)).some(n=>n.id.startsWith('chinese-loan-')),id+' native equivalent must not inherit Chinese note');
 for(const n of allNotes.filter(n=>n.reviewBatch==='complete-components-4')){
  assert(n.reviewedForms.length);for(const f of n.reviewedForms){assert(f.span[0]>=1&&f.span[1]>=f.span[0]);assert.equal(f.span[1]-f.span[0]+1,n.donor.length);}
 }
 for(const n of allNotes){assert(['whole','component'].includes(n.scope),n.id);assert(n.reviewedForms?.length,n.id+' missing exact forms');}
 for(const id of ['yubao-60756-v-0727','yubao-60756-v-0687','yubao-60756-v-0565','yubao-60756-v-0544','stedt-rn-289609','w2649','w264','w201']){
  assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id);
  assert(c.modernChineseLoanBadge(get(id)).includes('>新借</span>'));
 }
 for(const id of ['w375','yubao-60756-v-0747','yubao-60823-v-0747','yubao-60824-v-0747']){
  assert.equal(c.modernChineseLoanInfo(get(id)).scope,'component',id);
  assert(c.modernChineseLoanBadge(get(id)).includes('>半借</span>'));
 }
 assert.equal(c.modernChineseLoanInfo(get('stedt-rn-288498')).scope,'mixed','native time variant remains');
 for(const id of ['w112','w195','w124','w125','w2079','w42','w473','w50','w576','w2190','w639'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' excluded or unreviewed');
 // A full loan in one variant must never hide an unreviewed or native variant.
 const synthetic=(ipa,scope='whole')=>({id:'loan-fixture',notations:{ipa:[{text:ipa}]},editorialNotes:[{id:'chinese-loan-fixture',scope,reviewedForms:[{ipa:'ma³³tɕaŋ³³',span:[1,2]}]}]});
 assert.equal(c.modernChineseLoanInfo(synthetic('ma³³ tɕaŋ³³')).scope,'whole');
 assert.equal(c.modernChineseLoanInfo(synthetic('ma³³tɕaŋ³³ / so²¹')).scope,'mixed');
 assert.equal(c.modernChineseLoanInfo(synthetic('ma³³tɕaŋ³³; ma³³tɕaŋ²¹')).scope,'mixed','tone distinctions survive');
 assert.equal(c.modernChineseLoanInfo(synthetic('ma³³tɕaŋ³³','component')).scope,'component');
 vm.runInContext("state={...DEFAULT_STATE,view:'words',hideWholeLoans:true}",c);
 assert.equal(c.wordMatches(get('yubao-60756-v-0727')),false);
 assert.equal(c.wordMatches(get('yubao-60756-v-0747')),true);
 assert.equal(c.wordMatches(get('stedt-rn-288498')),true);
 assert.equal(c.wordMatches(get('w576')),true);
 c.loanPosFixture=get('yubao-60756-v-0747');
 vm.runInContext("state.pos=WordClasses.ids(loanPosFixture)[0]||''",c);
 assert.equal(c.wordMatches(get('yubao-60756-v-0747')),true,'partial loan survives matching POS filter');
 assert(app.includes('canonicalPos:WordClasses.ids(w)'),'export retains normalized word classes');
 vm.runInContext("state.pos=''",c);
 const restored=c.parseViewHash(c.viewHash()).state;assert.equal(restored.hideWholeLoans,true);
 assert.equal(c.parseViewHash('#words?hideWholeLoans=false').state.hideWholeLoans,false);
 const counts={};for(const w of data.words){const scope=c.modernChineseLoanInfo(w).scope||'unmarked';counts[scope]=(counts[scope]||0)+1;}
 console.log('Loan badge coverage:',counts);
 console.log('PASS: reviewed glosses, source preservation, 2331 bilingual notes, loan badges, whole/component/variant filtering, URL state and export metadata');
})().catch(e=>{console.error(e);process.exit(1)});
