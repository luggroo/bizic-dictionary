const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const supplementalReviews=['un-wen-sun','rime-supplement','named-supplement'].map(name=>JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-'+name+'-2026-10-24.json'),'utf8')));
const supplementalDecisions=supplementalReviews.flatMap(review=>review.decisions);
const acceptedLater=new Set(supplementalDecisions.flatMap(d=>d.note.wordIds));
const c=vm.createContext({console,URLSearchParams,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','lexical-reviews.js','word-classes.js','editorial-notes.js','ui-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
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

 // Supplementary loans use corrected display forms while retaining source attestations.
 const keyi=get('yubao-60824-v-0916');
 assert.equal(keyi.term,'kʰo⁵⁵ji²¹');
 assert.equal(keyi.attestations.find(a=>a.id==='yubao-60824-v-0916').term,'ko55ji21');
 assert.equal(c.southernSpelling(keyi.term,'yubao-60824').accent,'kōyì');
 for(const id of ['yubao-60824-v-0200','yubao-60824-v-0473','stedt-rn-127351','yubao-60824-v-0890','yubao-60824-v-2838','yubao-60824-v-0916','yubao-60824-v-2754','w1721'])assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id);
 for(const id of ['yubao-60824-v-2124','yubao-60824-v-2773','yubao-60756-v-2773','yubao-60756-v-1974','yubao-60756-v-2618'])assert.equal(c.modernChineseLoanInfo(get(id)).scope,'component',id);
 assert.equal(c.modernChineseLoanInfo(get('stedt-rn-289703')).scope,'whole','sock is a reviewed whole-word loan');
 assert(c.editorialNotesFor(get('stedt-rn-289703')).some(n=>n.id==='chinese-loan-stedt-rn-289703'));
 for(const id of ['yubao-60824-v-1665','yubao-60824-v-2618','yubao-60757-v-2618','yubao-60823-v-2618','stedt-rn-430818'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' other lexical form');
 assert.equal(vm.runInContext("UI_TRANSLATIONS['新借']",c),'Loan');
 assert.equal(vm.runInContext("UI_TRANSLATIONS['半借']",c),'Pt. loan');
 assert(!c.modernChineseLoanBadge(get('stedt-rn-289609')).includes('title='),'loan explanation must not depend on hover');

 for(const [id,zh,forbidden]of [['yubao-60824-v-1754','砌墙','土墙'],['w2476','外表','小伙子'],['stedt-rn-454791','外表','小伙子'],['stedt-rn-288801','铲; 锹','锤子'],['stedt-rn-289763','饭锅; 煮锅','锅铲']]){
  const w=get(id);assert.equal(w.zh,zh,id);assert(!c.editorialNotesFor(w).some(n=>n.text.includes(forbidden)),id+' rejected donor must not appear');
 }
 assert(c.editorialNotesFor(get('stedt-rn-288801')).some(n=>n.text==='可能借自西南官话，具体原词待考。'));
 for(const w of data.words)for(const a of w.attestations||[])if(surveyBefore.has(a.id))assert.equal(sourceFields(a),surveyBefore.get(a.id),a.id+' survey source changed');
 const batch=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/ma-car-dragonfly-review-2026-10-23.json'),'utf8'));
 for(const decision of batch.decisions){
  const expected=decision.note;
  for(const id of expected.wordIds){
   const w=get(id),note=c.editorialNotesFor(w).find(n=>n.id===expected.id);
   assert(note,id+' reviewed note exists');assert.equal(note.text,expected.text);
   c.noteText=note.text;assert.equal(vm.runInContext('UI_TRANSLATIONS[noteText]',c),decision.noteEn);
   if(note.id.startsWith('chinese-loan-'))assert.equal(c.modernChineseLoanInfo(w).scope,note.scope,id+' whole/component coverage');
  }
 }
 for(const item of batch.excludedForms)assert.equal(c.modernChineseLoanBadge(get(item.id)),'',item.id+' unrelated or undated form');
 assert.equal(c.modernChineseLoanBadge(get('stedt-rn-289737')),'','undated Xiang loan has no modern-loan badge');
 assert.equal(get('stedt-rn-289522').notations.ipa[0].text,'dʑio²¹niã³⁵du̵²¹','dragonfly source notation is preserved');
 assert.deepEqual(Array.from(c.editorialNotesFor(get('stedt-rn-289522')).find(n=>n.id==='chinese-loan-stedt-rn-289522').reviewedForms[0].span),[1,2]);
 c.phraseFixture=get('yubao-60823-v-2790');
 assert.equal(vm.runInContext('JSON.stringify(WordClasses.ids(phraseFixture))',c),'["phrase.verb"]');
 vm.runInContext("state.q='ddeu';state.searchLanguage='tujia';state.exact=false",c);
 assert(c.wordSearchScore(get('stedt-rn-289522'))>0,'actual final-syllable spelling is searchable');
 const matches=c.rankedWords(data.words),dragonflyIndex=matches.findIndex(w=>w.id==='stedt-rn-289522');
 assert(dragonflyIndex>=0);
 for(const [index,w] of matches.entries())if(c.wordSearchScore(w)>=50)assert(index<dragonflyIndex,'prefix and full matches precede dragonfly');
 vm.runInContext("state.q='';state.searchLanguage=''",c);
 const followup=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-followup-2026-10-23.json'),'utf8'));
 for(const {note} of followup.decisions)for(const id of note.wordIds){
  const w=get(id);assert.equal(c.modernChineseLoanInfo(w).scope,'whole',id+' entire form is borrowed');
  assert(c.editorialNotesFor(w).some(n=>n.id===note.id&&n.text===note.text));
 }
 const raised=get('w2258');assert.equal(raised.en,'raise; improve');
 const coverage=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-coverage-review-2026-10-23.json'),'utf8'));
 const chiPeriod=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-chi-period-review-2026-10-23.json'),'utf8'));
 const chiReplacements=new Map(chiPeriod.decisions.flatMap(d=>d.previousNotes.map(n=>[n.id,d])));
 coverage.decisions=coverage.decisions.map(d=>chiReplacements.has(d.note.id)?{...d,...chiReplacements.get(d.note.id)}:d);
 for(const {note,noteEn} of coverage.decisions)for(const id of note.wordIds){
  const w=get(id),actual=c.editorialNotesFor(w).find(n=>n.id===note.id);
  assert(actual,id+' reviewed coverage note exists');
  assert.equal(JSON.stringify(actual),JSON.stringify(note),id+' exact reviewed forms and syllable scope');
  if(note.id.startsWith('chinese-loan-'))assert.equal(c.modernChineseLoanInfo(w).scope,note.scope,id+' complete or partial loan');
  else assert.equal(c.modernChineseLoanBadge(w),'',id+' undated etymology has no modern-loan badge');
  c.coverageText=note.text;assert.equal(vm.runInContext('UI_TRANSLATIONS[coverageText]',c),noteEn,id+' bilingual note');
 }
 for(const {id} of coverage.retainedUnmarked)if(!acceptedLater.has(id))assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' uncertain or native form stays unmarked');
 assert.equal(get('w903').en,'reactionary');
 assert(get('w903').attestations.every(a=>['to react','react'].includes(a.en)),'original react gloss stays in evidence');
 assert.deepEqual(Array.from(raised.glosses),['raise; improve']);
 assert(raised.attestations.every(a=>['to provide','provide'].includes(a.en)),'original English remains in source records');
 assert(!raised.en.includes('erroneous'),'correction commentary is not a gloss');
 for(const {wordIds} of followup.phraseBoundaries){c.photoFixture=get(wordIds[0]);assert.equal(vm.runInContext('JSON.stringify(WordClasses.ids(photoFixture))',c),'["phrase.verb"]');}
 for(const [id,ipa,donor] of [['yubao-60824-v-0217','jã²¹jy³⁵','洋芋'],['yubao-60823-v-0425','tsʰa³³','茶']]){
  const w=get(id),note=c.editorialNotesFor(w).find(n=>n.id==='chinese-loan-'+id);
  assert(note,id+' missing loan annotation');assert.equal(note.donor,donor);assert.equal(note.reviewedForms[0].ipa,ipa);
  assert.equal(c.modernChineseLoanInfo(w).scope,'whole',id+' whole-word loan');
  assert(c.modernChineseLoanBadge(w).includes('data-loan-scope="whole"'),id+' visible loan badge');
  c.newLoanNote=note.text;assert(vm.runInContext('!!UI_TRANSLATIONS[newLoanNote]',c),id+' bilingual note');
  assert.equal(sourceFields(w.attestations.find(a=>a.id===id)),surveyBefore.get(id),id+' original source changed');
  vm.runInContext("state.q='';state.searchLanguage='';state.pos='';state.dialect='';state.hideWholeLoans=true",c);
  assert.equal(c.wordMatches(w),false,id+' whole-loan filter');
 }
 vm.runInContext('state.hideWholeLoans=false',c);
 const screening=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-phonotactic-review-2026-10-23.json'),'utf8'));
 const adaptation=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-adaptation-review-2026-10-23.json'),'utf8'));
 const nl=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-nl-review-2026-10-23.json'),'utf8'));
 screening.decisions.push(...adaptation.decisions,...nl.decisions);
 for(const {note,noteEn} of screening.decisions){
  const w=get(note.wordIds[0]),actual=c.editorialNotesFor(w).find(n=>n.id===note.id);
  assert.equal(JSON.stringify(actual),JSON.stringify(note),note.id+' reviewed form and scope');
  assert.equal(c.modernChineseLoanInfo(w).scope,note.scope,note.id+' visible scope');
  c.newLoanNote=actual.text;assert.equal(vm.runInContext('UI_TRANSLATIONS[newLoanNote]',c),noteEn,note.id+' English');
  vm.runInContext('state.hideWholeLoans=true',c);
  assert.equal(c.wordMatches(w),note.scope!=='whole',note.id+' filter respects partial forms');
 }
 vm.runInContext('state.hideWholeLoans=false',c);
 const constraints=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-screening-constraints.json'),'utf8'));
 for(const rule of constraints.rules){
  const w=get(rule.id);assert(w,rule.id+' constraint resolves merged alias');
  if(rule.policy==='exclude-entry')assert.equal(c.modernChineseLoanBadge(w),'',rule.id+' explicit exclusion');
  if(rule.policy==='reject-donor')assert(!c.editorialNotesFor(w).some(n=>n.donor===rule.donor),rule.id+' rejected donor');
  if(rule.policy==='exclude-component')for(const nativeForm of rule.reviewedForms){
   for(const note of c.editorialNotesFor(w).filter(n=>n.id.startsWith('chinese-loan-')))for(const loanForm of note.reviewedForms||[]){
    if(!c.loanIPAForms(nativeForm.ipa).some(ipa=>c.loanIPAForms(loanForm.ipa).includes(ipa)))continue;
    const [a,b]=nativeForm.span,[x,y]=loanForm.span;
    assert(!(x<=b&&y>=a),rule.id+' native xilan component must not be annotated');
   }
  }
 }
 for(const id of ['stedt-rn-353352','yubao-60756-v-2277','yubao-60757-v-2277','yubao-60823-v-2277','w1449'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' setu family excluded');
 assert.equal(c.modernChineseLoanInfo(get('yubao-60824-v-2277')).scope,'whole','distinct Southern siti is outside setu exclusion');
 for(const id of ['yubao-60756-v-0691','yubao-60757-v-1872'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' other forms remain unmarked');
 for(const row of adaptation.excluded){
  assert.equal(c.modernChineseLoanBadge(get(row.id)),'',row.id+' explicit exclusion');
  for(const alias of row.aliases)assert.equal(c.modernChineseLoanBadge(get(alias)),'',alias+' exclusion survives merging');
 }
 for(const id of ['w2335','w5408','w6901','stedt-rn-457979'])assert(c.editorialNotesFor(get(id)).some(n=>n.donor==='团员'),id+' 团员 donor survives merging');
 for(const id of ['yubao-60757-v-2988','w2438'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' xilan stays unmarked');
 const rimeFollowup=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-rime-followup-2026-10-23.json'),'utf8'));
 const hotcell=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-hotcell-confirmed-2026-10-23.json'),'utf8'));
 const unFollowup={decisions:supplementalDecisions};
 const unReplacements=new Map(unFollowup.decisions.filter(d=>d.previousNote).map(d=>[d.previousNote.id,d]));
 for(const previous of [...rimeFollowup.decisions,...rimeFollowup.corrections,...hotcell.decisions,...hotcell.corrections,...chiPeriod.decisions,...unFollowup.decisions]){
  const decision=unReplacements.get(previous.note.id)||previous;
  const {note,noteEn}=decision,w=get(note.wordIds[0]),actual=c.editorialNotesFor(w).find(n=>n.id===note.id);
  assert.equal(JSON.stringify(actual),JSON.stringify(note),note.id+' exact lexical review');
  c.newLoanNote=actual.text;assert.equal(vm.runInContext('UI_TRANSLATIONS[newLoanNote]',c),noteEn,note.id+' bilingual note');
  if(note.id.startsWith('chinese-loan-'))assert.equal(c.modernChineseLoanInfo(w).scope,decision.expectedBadgeScope||note.scope,note.id+' exact variant coverage');
  else assert(!actual.id.startsWith('chinese-loan-'),note.id+' early/undated source is separate from modern loans');
 }
 assert.equal(c.modernChineseLoanBadge(get('stedt-rn-145866')),'','native kun-kun exception remains unmarked');
 for(const id of ['w4124','yubao-60757-v-2317'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' early 官 has no modern-loan badge');
 assert.equal(c.modernChineseLoanBadge(get('w1612')),'','possible cognate is not a modern loan');
 assert(c.editorialNotesFor(get('w1612')).some(n=>n.id==='etymology-comparison-w1612'&&!n.borrowingPeriod));
 assert.equal(get('stedt-rn-289192').zh,'领导；带领');
 assert.equal(get('stedt-rn-289192').en,'lead; guide');
 assert(get('stedt-rn-289192').attestations.some(a=>a.en==='lead'&&a.zh==='牵'));
 for(const review of supplementalReviews)for(const phrase of review.phrases||[]){
  c.reviewedNV=get(phrase.id);assert.equal(vm.runInContext('JSON.stringify(WordClasses.ids(reviewedNV))',c),'["phrase.verb"]');
 }
 assert.equal(c.modernChineseLoanBadge(get('w2532')),'','early key loan has no modern-loan badge');
 assert.equal(c.modernChineseLoanBadge(get('stedt-rn-345864')),'','undated ice loan has no modern-loan badge');
 assert.equal(c.modernChineseLoanBadge(get('w50')),'','grammatical liao stays unmarked');
 for(const {id} of chiPeriod.retainedModern){
  assert(c.notationValues(get(id),'ye').some(v=>v.text==='cir'),id+' retained modern form is exactly cir');
  assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id+' cir retains its modern-loan badge');
 }
 for(const {note} of chiPeriod.decisions)for(const id of note.wordIds)assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' other 尺 tones are undated');
 // Check actual spelling boundaries in each regional display system. The
 // source text and IPA stay plain; only the rendered loan spans get markup.
 const shading=[
  ['w2611','accent',['yǔn'],[['yǔn']]],
  ['w2611','ye',['yunr'],[['yunr']]],
  ['yubao-60756-v-2525','accent',['bíniē'],[['bíniē']]],
  ['yubao-60756-v-0369','accent',['sǔnzǐxìbǎ'],[['sǔnzǐ']]],
  ['yubao-60756-v-0734','accent',['sǔnzǐhxělǎtiáo'],[['sǔnzǐ','tiáo']]],
  ['yubao-60756-v-1639','accent',['lǔwěnzī'],[['lǔwěnzī']]],
  ['yubao-60757-v-1600','accent',['niěcún'],[['cún']]],
  ['w723','accent',['gāng lián'],[['gāng lián']]],
  ['w1612','accent',['niǎnkuī'],[[]]],
  ['yubao-60757-v-2779','accent',['jiémītǐkōtā jiāng'],[['jiāng']]],
  ['yubao-60757-v-2532','accent',['gēndōu hǎ'],[['gēndōu']]],
  ['yubao-60823-v-0772','accent',['pénjiao ha'],[['pénjiao']]],
  ['yubao-60756-v-0522','accent',['nǐnzěn hǎ'],[['nǐnzěn']]],
  ['yubao-60756-v-1681','accent',['niǔjīn'],[['niǔjīn']]],
  ['yubao-60756-v-1681','ye',['niurjinx'],[['niurjinx']]],
  ['yubao-60756-v-2215','accent',['jīnpǐ'],[['jīn']]],
  ['yubao-60756-v-2215','ye',['jinxpir'],[['jinx']]],
  ['yubao-60824-v-1681','accent',['òjinjin'],[['jinjin']]],
  ['yubao-60824-v-1681','poj',['ò-cin-cin'],[['cin','cin']]],
  ['yubao-60824-v-1811','accent',['dèugèusuàbà'],[['suàbà']]],
  ['yubao-60824-v-1811','poj',['tèu-kèu-suà-pà'],[['suà','pà']]],
  ['yubao-60756-v-0594','accent',['kùbǎtǐmǎ','tītōujiàn'],[[],['tītōujiàn']]],
  ['yubao-60756-v-0594','ye',['kuvbartirmar','tixtouxjianv'],[[],['tixtouxjianv']]],
  ['yubao-60823-v-1853','accent',['wǔcí'],[['cí']]],
  ['yubao-60823-v-1853','ye',['wurcif'],[['cif']]],
  ['stedt-rn-185103','accent',['yísīrǐ'],[['sīrǐ']]],
  ['stedt-rn-185103','ye',['ifsixrir'],[['sixrir']]],
  ['w50','accent',['-liǎo'],[[]]],
  ['w50','ye',['-liaor'],[[]]]
 ];
 const escapeSpelling=vm.runInContext('E',c);
 for(const [id,mode,texts,gray] of shading){
  c.mode=mode;vm.runInContext('spellingDisplay=mode;southernDisplay=mode',c);
  const w=get(id),before=JSON.stringify(w),values=c.completeSpellings(w);
  assert.deepEqual(Array.from(values,v=>v.text),texts,id+' '+mode+' spelling');
  assert.deepEqual(Array.from(values,v=>Array.from(c.spellingLoanRanges(w,v),([a,b])=>v.text.slice(a,b))),gray,id+' '+mode+' gray loan syllables');
  for(const value of values)assert.equal(c.loanSpellingHTML(w,value).replace(/<\/?span[^>]*>/g,''),escapeSpelling(value.text),id+' rendered text unchanged');
  assert.equal(JSON.stringify(w),before,id+' source data unchanged by shading');
 }
 vm.runInContext("spellingDisplay='accent';southernDisplay='accent'",c);
 for(const id of ['w73','w337'])assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id+' lexical liao exception');
 assert(!c.editorialNotesFor(get('yubao-60757-v-1743')).find(n=>n.id==='chinese-loan-yubao-60757-v-1743').donor,'unknown stair-step character is not invented');
 for(const [id,review] of Object.entries(hotcell.parallelForms)){
  const w=get(id);assert.deepEqual(Array.from(c.wordIPA(w)),review.forms,id+' parallel IPA forms');
  assert.equal(w.attestations.find(a=>a.id===id).term,review.raw,id+' original combined source');
  assert(c.pairedNotationForms(w)?.length===2,id+' each spelling pairs with its own IPA');
 }
 for(const id of ['stedt-rn-289453','yubao-60824-v-1339'])assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id+' 二月 is fully borrowed');
 for(const id of ['w2480','yubao-60756-v-0718','stedt-rn-289871','yubao-60824-v-0718','yubao-60824-v-0719'])assert(c.editorialNotesFor(get(id)).some(n=>n.donor==='校堂'),id+' 校堂 donor');
 const allNotes=vm.runInContext("EDITORIAL_NOTES.filter(n=>n.id.startsWith('chinese-loan-'))",c);assert.equal(allNotes.length,2996-chiPeriod.reclassifiedModernNoteIds.length+[...rimeFollowup.decisions,...hotcell.decisions,...unFollowup.decisions.filter(d=>d.action==='add-loan-note')].filter(d=>d.note.id.startsWith('chinese-loan-')).length);
 const componentsFollowup=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/loan-components-followup-2026-10-23.json'),'utf8'));
 for(const {note} of componentsFollowup.decisions){
  const w=get(note.wordIds[0]),actual=c.editorialNotesFor(w).find(n=>n.id===note.id);
  assert.equal(c.modernChineseLoanInfo(w).scope,note.scope,note.id+' precise borrowing scope');
  assert.equal(actual.donor,note.donor);
  assert.deepEqual(Array.from(actual.reviewedForms[0].span),note.reviewedForms[0].span);
 }
 for(const row of componentsFollowup.retainedCandidates)for(const id of row.ids)if(!acceptedLater.has(id))assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' candidate stays unmarked');
 assert.equal(c.reviewedSpelling(get('yubao-60823-v-2897'),'dānzisō','accent'),'dānzi sō');
 assert.equal(c.reviewedSpelling(get('yubao-60823-v-2897'),'danxzirsox','ye'),'danxzir sox');
 for(const id of ['yubao-60823-v-2903','yubao-60757-v-2903','yubao-60824-v-2903']){
  const n=c.editorialNotesFor(get(id)).find(n=>n.id==='chinese-loan-'+id);
  assert.equal(n.donor,'造孽');assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole');
 }
 assert.equal(c.editorialNotesFor(get('yubao-60756-v-2903')).find(n=>n.id==='chinese-loan-yubao-60756-v-2903').donor,'可怜','Yangchao uses a distinct donor');
 const correctedNonLoans=['yubao-60756-v-2277','yubao-60757-v-2277','stedt-rn-289762','yubao-60824-v-0306','yubao-60824-v-1801'];
 for(const id of correctedNonLoans)assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' reviewed non-loan');
 const pigLiver=get('yubao-60823-v-0411'),liverNote=c.editorialNotesFor(pigLiver).find(n=>n.id==='chinese-loan-yubao-60823-v-0411');
 assert.equal(c.modernChineseLoanInfo(pigLiver).scope,'component');
 assert.equal(liverNote.donor,'肝');assert.deepEqual(Array.from(liverNote.reviewedForms[0].span),[2,2]);
 assert.equal(c.modernChineseLoanInfo(get('stedt-rn-288809')).scope,'whole','bow remains a loan');
 assert.equal(c.modernChineseLoanInfo(get('yubao-60824-v-0793')).scope,'whole','reviewed Luxi step form is a loan');
 assert.equal(c.modernChineseLoanInfo(get('yubao-60756-v-1897')).scope,'whole','Yangchao cigarette butt is a whole loan');
 for(const id of ['w351','stedt-rn-288669','stedt-rn-289610']){
  const w=get(id);assert.equal(w.zh,'部长');assert.equal(w.en,'minister');
  assert((w.zhVariants||[]).every(s=>!s.includes('大臣')));
  assert((w.senses||[]).every(s=>!s.zh.includes('大臣')));
 }
 assert(get('w351').attestations.some(a=>a.en==='leader'),'source English stays in evidence');
 vm.runInContext("state.q='大臣';state.searchLanguage='zh'",c);
 for(const id of ['w351','stedt-rn-289610'])assert.equal(c.wordSearchScore(get(id)),0,'obsolete translation is not searchable');
 vm.runInContext("state.q='';state.searchLanguage=''",c);
 const unspecifiedNorthernDonors=new Set(['yubao-60756-v-0521','yubao-60756-v-0740','yubao-60756-v-1857','yubao-60823-v-0425',...screening.decisions.filter(d=>d.note.donorVariety==='汉语（方言待核）').flatMap(d=>d.note.wordIds)]);
 const reviewedDonorVarieties=new Map([...rimeFollowup.decisions,...rimeFollowup.corrections,...hotcell.decisions,...hotcell.corrections,...unFollowup.decisions].filter(d=>d.note.id.startsWith('chinese-loan-')).map(d=>[d.note.id,d.note.donorVariety]));
 for(const n of allNotes){c.note=n.text;assert(vm.runInContext('UI_TRANSLATIONS[note]',c),'English translation missing: '+n.id);assert(n.wordIds.every(id=>get(id)),n.id+' dangling word');for(const id of n.wordIds)if(c.wordVarietyInfo(get(id)).kind!=='south')assert.equal(n.donorVariety,reviewedDonorVarieties.get(n.id)||(unspecifiedNorthernDonors.has(id)?'汉语（方言待核）':'西南官话'),id+' northern donor variety');}
 for(const id of ['yubao-60824-v-2438','yubao-60824-v-0200','stedt-rn-289703'])assert(c.editorialNotesFor(get(id)).some(n=>n.donorVariety==='湘语'),id+' Xiang donor');
 // Exact Southern forms and source aliases receive the accepted donor; native
 // components and other forms with the same Chinese gloss keep their scope.
 const xiangWhole=['stedt-rn-289482','yubao-60824-v-0259','yubao-60824-v-1792','yubao-60824-v-0052','stedt-rn-289676','stedt-rn-290190'];
 const xiangParts=['yubao-60824-v-1685','yubao-60824-v-1686','yubao-60824-v-1687','yubao-60824-v-2574','yubao-60824-v-2358','yubao-60824-v-0929','yubao-60824-v-2768','yubao-60824-v-2772','yubao-60824-v-2479'];
 for(const id of [...xiangWhole,...xiangParts,'yubao-60824-v-0860','yubao-60824-v-2208','yubao-60824-v-2454','yubao-60824-v-2486','yubao-60824-v-1560','yubao-60824-v-1688'])assert(c.editorialNotesFor(get(id)).some(n=>n.donorVariety==='湘语'),id+' accepted Xiang donor');
 for(const id of xiangWhole)assert.equal(c.modernChineseLoanInfo(get(id)).scope,'whole',id+' whole Xiang loan');
 for(const id of xiangParts)assert.equal(c.modernChineseLoanInfo(get(id)).scope,'component',id+' mixed compound');
 for(const [id,span] of [['yubao-60824-v-2772',[3,3]],['yubao-60824-v-2479',[2,3]],['yubao-60824-v-0929',[1,3]]])assert.deepEqual(Array.from(c.editorialNotesFor(get(id)).find(n=>n.id==='chinese-loan-'+id).reviewedForms[0].span),span,id+' loan syllables');
 for(const id of ['yubao-60824-v-2866','stedt-rn-289804','stedt-rn-289969','yubao-60824-v-2487','yubao-60824-v-2976'])assert.equal(c.modernChineseLoanBadge(get(id)),'',id+' unrelated form or gloss');
 for(const id of ['stedt-rn-290103','yubao-60824-v-1748'])assert(c.editorialNotesFor(get(id)).some(n=>n.donorVariety==='湘语或西南官话'),id+' qualified donor');
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
 for(const id of [...correctedNonLoans,'yubao-60823-v-0411'])assert.equal(c.wordMatches(get(id)),true,id+' survives hiding whole loans');
 assert.equal(c.wordMatches(get('stedt-rn-288809')),false,'confirmed whole loan is hidden');
 assert.equal(c.wordMatches(get('yubao-60824-v-0793')),false,'Luxi step is hidden with whole loans');
 assert.equal(c.wordMatches(get('yubao-60756-v-1897')),false,'Yangchao cigarette butt is hidden with whole loans');
 for(const {note} of componentsFollowup.decisions)assert.equal(c.wordMatches(get(note.wordIds[0])),note.scope!=='whole',note.id+' partial loans survive filtering');
 assert.equal(c.wordMatches(get('yubao-60756-v-0727')),false);
 assert.equal(c.wordMatches(get('yubao-60756-v-0747')),true);
 assert.equal(c.wordMatches(get('stedt-rn-288498')),true);
 assert.equal(c.wordMatches(get('w576')),true);
 assert.equal(c.wordMatches(get('stedt-rn-289737')),true,'undated co remains visible');
 assert.equal(c.wordMatches(get('yubao-60824-v-1887')),false,'modern ce axle is hidden');
 assert.equal(c.wordMatches(get('stedt-rn-289522')),true,'dragonfly half-loan remains visible');
 for(const {note} of followup.decisions)for(const id of note.wordIds)assert.equal(c.wordMatches(get(id)),false,id+' whole-loan filter includes reanalysed phrases');
 for(const {note} of coverage.decisions)for(const id of note.wordIds)assert.equal(c.wordMatches(get(id)),!note.id.startsWith('chinese-loan-')||note.scope!=='whole',id+' coverage-pass loan filter');
 for(const id of xiangWhole)assert.equal(c.wordMatches(get(id)),false,id+' whole-loan filter');
 for(const id of xiangParts)assert.equal(c.wordMatches(get(id)),true,id+' mixed compound remains visible');
 c.loanPosFixture=get('yubao-60756-v-0747');
 vm.runInContext("state.pos=WordClasses.ids(loanPosFixture)[0]||''",c);
 assert.equal(c.wordMatches(get('yubao-60756-v-0747')),true,'partial loan survives matching POS filter');
 assert(app.includes('canonicalPos:WordClasses.ids(w)'),'export retains normalized word classes');
 vm.runInContext("state.pos=''",c);
 const restored=c.parseViewHash(c.viewHash()).state;assert.equal(restored.hideWholeLoans,true);
 assert.equal(c.parseViewHash('#words?hideWholeLoans=false').state.hideWholeLoans,false);
 const counts={};for(const w of data.words){const scope=c.modernChineseLoanInfo(w).scope||'unmarked';counts[scope]=(counts[scope]||0)+1;}
 console.log('Loan badge coverage:',counts);
 console.log('PASS: reviewed glosses, source preservation, '+allNotes.length+' bilingual notes, loan badges, whole/component/variant filtering, URL state and export metadata');
})().catch(e=>{console.error(e);process.exit(1)});
