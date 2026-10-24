// Prepare search and notation once during the build; lazy chunks retain all source evidence.
const fs=require('fs'),path=require('path'),vm=require('vm');
const zlib=require('node:zlib'),crypto=require('node:crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));const marks={};
const ctx=vm.createContext({console,URL,URLSearchParams,Map,Set,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
const files=['brassett-grammar.js','grammar-data.js','comparison-merge.js','research.js','grammar-dialects.js','south-zhou-phonology.js','notation-profiles.js','ipa-normalize.js','notation-ui.js','southern-notation.js','longshan-texts.js','corpus-player.js','grammar-integrated.js','grammar-evidence.js','grammar-notation.js','grammar-reviewed-data.js','grammar-glosses.js','grammar-reviewed.js','yubao.js','semantic-categories.js','lexical-reviews.js','word-classes.js','word-merge-groups.js','word-merge.js','editorial-notes.js','spelling-boundaries.js','notation-pairs.js','ui-translations.js','content-translations.js'];
for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf('window.addEventListener(\'popstate\'')),ctx);
let prev=performance.now();function mark(name){const n=performance.now();marks[name]=Math.round(n-prev);prev=n;console.log(name,marks[name]+'ms');}
(async()=>{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data.json')));Object.assign(data,JSON.parse(fs.readFileSync(path.join(root,'dictionary.json'))));mark('read/parse');
 await ctx.loadYubao(data);mark('survey');await ctx.loadLongshanTexts(data);ctx.normalizeIPAData(data);mark('normalize');
 ctx.data=data;vm.runInContext('D=data;removeExcludedSource(D);S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',ctx);ctx.mergeDictionaryWords(data);mark('merge');
 vm.runInContext('WordClasses.initialize(D.words)',ctx);ctx.initializeSpellingBoundaries(data);ctx.initializeSemanticCategories(data.words);mark('boundaries/categories');ctx.mergeComparisons(data);mark('comparisons');
 vm.runInContext("for(const s of D.sources)s.title=s.title.replace(/^STEDT\\s*·\\s*/,'');S=Object.fromEntries([...(D.sourceVariants||[]),...D.sources].map(x=>[x.id,x]));",ctx);
 for(const w of data.words){
   const search=ctx.indexedWord(w);w._search={...search,englishWords:[...search.englishWords]};
   w._semantic=ctx.wordSemanticCategories(w);
 }
 mark('search-index');
 const compiled=path.join(root,'prepared');fs.mkdirSync(compiled,{recursive:true});
 function write(name,value){fs.writeFileSync(path.join(compiled,name+'.json.gz'),zlib.gzipSync(JSON.stringify(value),{level:9}));}
 const kept=['id','term','zh','en','pos','source','sourceIds','dialect','dialects','location','locations','positions','schemes','_search','_semantic','formHeadwords'];
 const coreWords=[];const chunkSize=200;
 for(let i=0;i<data.words.length;i++){
  const w=data.words[i],mini=Object.fromEntries(kept.filter(k=>w[k]!==undefined).map(k=>[k,w[k]]));
  mini._loan=ctx.modernChineseLoanInfo(w);mini._ipa=ctx.wordIPA(w);mini._display={};
  ctx.currentWord=w;
  for(const mode of (ctx.isSouthernWord(w)?['accent','poj']:['accent','ye'])){
   ctx.mode=mode;vm.runInContext('spellingDisplay=mode;southernDisplay=mode;',ctx);
   mini._display[mode]=ctx.completeSpellings(w).map(v=>({text:v.text,loanRanges:ctx.spellingLoanRanges(w,v,mode),...(v.ambiguous?{ambiguous:true}:{}),...(v.ipaForms?{ipaForms:v.ipaForms}:{})}));
  }
  mini._chunk=Math.floor(i/chunkSize);coreWords.push(mini);
 }
 vm.runInContext("spellingDisplay='accent';southernDisplay='accent';",ctx);
 const textNames=[];
 const stripText=s=>{if(!s.text)return {...s,text:s.text||''};const name='source-'+textNames.length;textNames.push(name);write(name,{id:s.id,text:s.text});return {...s,text:'',_textChunk:name};};
 const core={...data,words:coreWords,sources:data.sources.map(stripText),sourceVariants:(data.sourceVariants||[]).map(stripText),_textNames:textNames};
 delete core.dictionaryFile;delete core.reconstructionOriginals;
 for(let i=0;i<data.words.length;i+=chunkSize){write('words-'+Math.floor(i/chunkSize),data.words.slice(i,i+chunkSize).map(w=>{const out={...w};delete out._search;delete out._semantic;return out;}));}
 write('core',core);
 ctx.data=data;vm.runInContext('D=data;',ctx);
 // Loan scopes and precomputed spellings live in coreWords, not data.words.
 // Include them so returning readers request the refreshed prepared payload.
 const version=crypto.createHash('sha256').update(JSON.stringify(core)).update(JSON.stringify(data)).digest('hex').slice(0,16);
 const index=path.join(root,'index.html');
 let html=fs.readFileSync(index,'utf8').replace(/<main id="main">[\s\S]*?<\/main>/,'<main id="main">'+ctx.overview()+'</main>');
 html=html.replace(/<meta name="prepared-data-version"[^>]*>/g,'').replace(/<link[^>]*data-prepared-preload[^>]*>/g,'');
 html=html.replace('</head>',`<meta name="prepared-data-version" content="${version}"><link data-prepared-preload rel="preload" as="fetch" href="prepared/core.json.gz?v=${version}" crossorigin></head>`);
 fs.writeFileSync(index,html);
 mark('prepare-lazy-chunks');
 if(process.env.PREPARED_REFERENCE)fs.writeFileSync(process.env.PREPARED_REFERENCE,JSON.stringify(data));mark('write');
 console.log('words',data.words.length,'core gzip bytes',fs.statSync(path.join(compiled,'core.json.gz')).size);
})().catch(e=>{console.error(e);process.exit(1)});
