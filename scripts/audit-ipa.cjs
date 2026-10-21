const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("document.addEventListener(")),ctx);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await ctx.loadYubao(data);ctx.removeExcludedSource(data);ctx.initializeSemanticCategories(data.words);ctx.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',ctx);
 const counts={},unconverted=[];
 for(const w of data.words){const place=ctx.wordVarietyInfo(w).label;counts[place]??={total:0,ipa:0,unconverted:0,partial:0};const c=counts[place];c.total++;if(!ctx.wordIPA(w).length)continue;c.ipa++;
  if(!ctx.completeSpellings(w).length){c.unconverted++;if(ctx.visibleNotationValues(w).length)c.partial++;unconverted.push({id:w.id,place,zh:w.zh||w.en,ipa:ctx.wordIPA(w),sources:w.sourceIds.map(id=>data.sources.find(s=>s.id===id)?.title||id)})}
 }
 const categoryCounts={},unmapped=new Set();for(const w of data.words){for(const c of ctx.wordSemanticCategories(w))categoryCounts[c]=(categoryCounts[c]||0)+1;for(const c of w.categories||[])if(c&&!vm.runInContext('SEMANTIC_LOOKUP',ctx).has(c))unmapped.add(c)}
 fs.writeFileSync('/tmp/ipa-audit.json',JSON.stringify({counts,unconverted,categoryCounts,unmapped:[...unmapped]},null,2));console.log(JSON.stringify({counts,categoryCounts,unmapped:[...unmapped]},null,2));
 console.log('SAMPLES',JSON.stringify(unconverted.filter(x=>x.sources.some(s=>s.includes('语保'))),null,2));
 const chosen=ctx.randomWordItems(data.words);if(chosen.length!==12)throw Error('Expected 12 discovery words');console.log('PASS: 12 discovery words');
})();
