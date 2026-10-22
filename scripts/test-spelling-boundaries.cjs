const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','editorial-notes.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("document.addEventListener(")),ctx);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await ctx.loadYubao(data);ctx.removeExcludedSource(data);ctx.initializeSemanticCategories(data.words);ctx.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',ctx);
 const assert=require('assert/strict');ctx.mergeDictionaryWords(data);
 const death=data.words.find(w=>w.id==='yubao-60757-v-0552');
 const originalDeath=JSON.stringify(death);const noteHTML=ctx.editorialNotesHTML(death);
 assert(noteHTML.includes('编者注')&&noteHTML.includes('睡着了')&&noteHTML.includes('来源释义'));
 assert.equal(JSON.stringify(death),originalDeath);assert.equal(ctx.editorialNotesHTML({id:'none'}),'');
 const before=JSON.stringify(data.words);const ipa=JSON.stringify(data.words.map(w=>w.notations));
 ctx.initializeSpellingBoundaries(data);
 assert.equal(JSON.stringify(data.words.map(w=>w.notations)),ipa,'all original notations remain identical');
 assert(vm.runInContext("SPELLING_BOUNDARY_REVIEWS.every(r=>r.kind!=='suffix')",ctx),'no noun-suffix boundary rules remain');
 const annotated=data.words.filter(w=>w.spellingBoundaries);let changed=[];
 for(const w of annotated){for(const mode of ['accent','ye']){ctx.w=w;ctx.mode=mode;const forms=vm.runInContext('spellingDisplay=mode;completeSpellings(w).map(v=>v.text)',ctx);if(forms.some(x=>/[ -]/.test(x)))changed.push({id:w.id,zh:w.zh,mode,forms});}}
 fs.writeFileSync('/tmp/boundary-results.json',JSON.stringify({annotated:annotated.length,changed},null,2));
 function check(id,expected){const w=data.words.find(w=>w.id===id||w.mergedWordIds?.includes(id));assert(w,id);ctx.w=w;const forms=vm.runInContext("spellingDisplay='accent';completeSpellings(w).map(v=>v.text)",ctx);assert(forms.includes(expected),id+' '+forms.join(' / '));}
 check('stedt-rn-289159','résū sū');check('stedt-rn-218406','riésū sū');
 check('w1203','kōbā tī-mā');check('w1248','lāměn kā-mā');check('yubao-60757-v-2314','xié-mādiē');
 check('w2404',"wúbī");check('w107',"ádābí");check('w286',"bízīkǎ");check('w2697','zǐ báng-mā');check('w1427',"lōbǐdiě");check('w2555',"yě'àyǐ-mā");check('yubao-60823-v-0275',"mo'àba");
 check('w1255','là pō');check('yubao-60757-v-0278',"hāliě'ābā");check('yubao-60756-v-0278',"hālēibā");check('yubao-60823-v-0278',"hāliē'àba");check('yubao-60756-v-1220','sǔsǔ qǐcǎ');check('yubao-60823-v-1220','súsù pong');
 check('w2971',"ǎsǐkūlī");check('w1511',"mětīkūlī");check('w508','cò zù');check('w1629','nié-biētà');check('w1435','lò cái');
 for(const id of ['w46','w717','w1534','w1225','w1429','w363','w584','w630','w962','w1437','w1493','w1229']){const w=data.words.find(w=>w.id===id||w.mergedWordIds?.includes(id));assert(!w.spellingBoundaries,id+' must remain unsplit');}
 const newRules=vm.runInContext("SPELLING_BOUNDARY_REVIEWS.filter(r=>r.sourceForm||r.key==='hamokualiao')",ctx);
 for(const rule of newRules){
  const w=data.words.find(w=>rule.wordIds.includes(w.id)||w.mergedWordIds?.some(id=>rule.wordIds.includes(id)));assert(w,rule.wordIds[0]);ctx.w=w;
  const mode=rule.mode||'accent';ctx.mode=mode;
  const forms=vm.runInContext("spellingDisplay='accent';southernDisplay=mode;completeSpellings(w).map(v=>v.text)",ctx);
  const matching=forms.filter(t=>ctx.boundaryPlain(t).replace(/[\s'’-]/g,'')===rule.key);
  assert(matching.length,rule.wordIds[0]+' missing form '+forms);
  assert(matching.some(t=>rule.separator==='-'?t.includes('-'):t.includes(' ')),rule.wordIds[0]+' missing boundary '+forms);
 }
 check('stedt-rn-407684','hǎ-mǒ-kuā-liāo');
 check('yubao-60756-v-0831','góunà-liě');
 check('yubao-60823-v-0765','re-liē');
 check('yubao-60823-v-2733','xiu-náo');
 check('yubao-60823-v-2870','piu-náo');
 check('yubao-60824-v-2635','no yiì');
 check('yubao-60824-v-2663',"ǎjjiē yǎu'a");
 check('yubao-60824-v-2664','ǎjjiē jǖ');
 check('yubao-60824-v-2665','ǎjjiē nǒn');
 check('yubao-60824-v-2666','ǎjjiē pè');
 check('yubao-60824-v-2667','ǎjjiē zzò');
 const translations=vm.runInNewContext(fs.readFileSync(path.join(root,'ui-translations.js'),'utf8')+';UI_TRANSLATIONS;');
 for(const [id,analysis] of [['yubao-60823-v-2733','xi•unao'],['yubao-60823-v-2870','pi•unao']]){
  const word=data.words.find(w=>w.id===id||w.mergedWordIds?.includes(id));
  assert(ctx.editorialNotesHTML(word).includes(analysis),id+' fusion analysis note');
  const note=ctx.editorialNotesFor(word).find(n=>n.text.includes(analysis));
  assert(translations[note.kind]&&translations[note.text]?.includes(analysis),id+' English fusion note');
 }
 console.log('PASS: all '+newRules.length+' new display rules matched actual dictionary forms.');
 for(const w of data.words)delete w.spellingBoundaries;
 assert.equal(JSON.stringify(data.words),before,'only boundary metadata may change');
 console.log('PASS: '+annotated.length+' annotated entries; source records, IPA, senses and IDs unchanged; reviewed boundaries render in both spelling modes.');
})().catch(e=>{console.error(e);process.exit(1)});
