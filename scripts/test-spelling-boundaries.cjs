const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js','editorial-notes.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
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
 const annotated=data.words.filter(w=>w.spellingBoundaries);let changed=[];
 for(const w of annotated){for(const mode of ['accent','ye']){ctx.w=w;ctx.mode=mode;const forms=vm.runInContext('spellingDisplay=mode;completeSpellings(w).map(v=>v.text)',ctx);if(forms.some(x=>/[ -]/.test(x)))changed.push({id:w.id,zh:w.zh,mode,forms});}}
 fs.writeFileSync('/tmp/boundary-results.json',JSON.stringify({annotated:annotated.length,changed},null,2));
 function check(id,expected){const w=data.words.find(w=>w.id===id||w.mergedWordIds?.includes(id));assert(w,id);ctx.w=w;const forms=vm.runInContext("spellingDisplay='accent';completeSpellings(w).map(v=>v.text)",ctx);assert(forms.includes(expected),id+' '+forms.join(' / '));}
 check('stedt-rn-289159','résū sū');check('stedt-rn-218406','riésū sū');
 check('w2404','wú-bī');check('w107','ádā-bí');check('w286','bízī-kǎ');check('w2697','zǐ báng-mā');check('w1427','lō-bǐ-diě');check('w2555',"yě'àyǐ-mā");check('yubao-60823-v-0275','mo-àba');
 check('w1255','là pō');check('yubao-60757-v-0278','hāliě-ābā');check('yubao-60756-v-0278','hālēi-bā');check('yubao-60823-v-0278','hāliē-àba');check('yubao-60756-v-1220','sǔsǔ qǐcǎ');check('yubao-60823-v-1220','súsù pong');
 check('w2971','ǎsǐ-kūlī');check('w1511','mětī-kūlī');check('w508','cò zù');check('w1629','nié-biētà');check('w1435','lò cái');
 for(const id of ['w46','w717','w1534','w1225','w1429','w363','w584','w630','w962','w1437','w1493','w1229']){const w=data.words.find(w=>w.id===id||w.mergedWordIds?.includes(id));assert(!w.spellingBoundaries,id+' must remain unsplit');}
 for(const w of data.words)delete w.spellingBoundaries;
 assert.equal(JSON.stringify(data.words),before,'only boundary metadata may change');
 console.log('PASS: '+annotated.length+' annotated entries; source records, IPA, senses and IDs unchanged; reviewed boundaries render in both spelling modes.');
})().catch(e=>{console.error(e);process.exit(1)});
