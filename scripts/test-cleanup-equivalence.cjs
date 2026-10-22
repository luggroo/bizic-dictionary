// Compare actual rendered HTML and processed records against the pre-cleanup revision.
const fs=require('fs'),path=require('path'),vm=require('vm'),cp=require('child_process'),zlib=require('zlib'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),base=process.argv[2]||'43765b36a0c70ad93c2007846fd6f8d2aea1f4b3';
function read(p,before){return before?cp.execFileSync('git',['show',`${base}:${p}`],{cwd:root,maxBuffer:50e6}).toString():fs.readFileSync(path.join(root,p),'utf8')}
async function snapshot(before){
 const dummy={addEventListener(){},querySelectorAll:()=>[],classList:{toggle(){}},style:{}};
 const c=vm.createContext({MutationObserver:class{observe(){}},console,localStorage:{getItem:()=>null},document:{getElementById:()=>dummy,addEventListener(){},querySelector:()=>dummy,querySelectorAll:()=>[]},window:{addEventListener(){}},fetch:async p=>({ok:true,json:async()=>JSON.parse(read('site/'+p,before))})});
 vm.runInContext('Math.random=()=>0.25',c);
 const files=[...read('site/index.html',before).matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
 for(const f of files){let s=read('site/'+f,before);if(f==='app.js')s=s.slice(0,s.indexOf("document.addEventListener("));vm.runInContext(s,c,{filename:f})}
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'site/data.json.gz'))));Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'site/dictionary.json.gz')))));
 await c.loadYubao(data);c.data=data;
 vm.runInContext("D=data;removeExcludedSource(D);S=Object.fromEntries(D.sources.map(s=>[s.id,s]));mergeDictionaryWords(D);initializeSemanticCategories(D.words);mergeComparisons(D);for(const s of D.sources)s.title=s.title.replace(/^STEDT\\s*·\\s*/,'');S=Object.fromEntries([...(D.sourceVariants||[]),...D.sources].map(x=>[x.id,x]));W=Object.fromEntries(D.words.map(x=>[x.id,x]));C=Object.fromEntries(D.corpus.map(x=>[x.id,x]));R=Object.fromEntries(D.reconstructions.map(x=>[x.id,x]));",c);
 const out={data:JSON.stringify(data)};
 function capture(key,code){out[key]=vm.runInContext(code,c)}
 for(const [view,fn] of Object.entries({home:'overview',words:'wordView',sources:'sourcesView',corpus:'corpusView',topics:'topicsView',saved:'savedView',history:'historyView',notation:'notationView'}))capture(view,`state.view='${view}';${fn}()`);
 for(const d of ['north','south'])for(let n=1;n<=28;n++)capture(`grammar/${d}/${n}`,`state.grammarDialect='${d}';state.chapter='${n}';grammarView()`);
 for(const lang of ['','zh','en','tujia'])for(const q of ['ti','cut','水','lve'])capture(`search/${lang}/${q}`,`state.view='words';state.searchLanguage='${lang}';state.q='${q}';wordView()`);
 for(const [kind,fn]of [['words','wordDetail'],['corpus','corpusDetail'],['sources','sourceDetail'],['reconstructions','reconstructionDetail']])capture(kind+'/details',`D.${kind}.slice(0,10).map(x=>${fn}(x)).join('')`);
 capture('saved/populated',"saved[D.words[0].id]=true;saved[D.corpus[0].id]=true;savedView()");
 return out;
}
(async()=>{const a=await snapshot(true),b=await snapshot(false);for(const key of Object.keys(a))assert.equal(b[key],a[key],key+' changed');console.log(`PASS: processed dataset and ${Object.keys(a).length-1} rendered states are byte-for-byte identical.`)})().catch(e=>{console.error(String(e).slice(0,2000));process.exit(1)});
