// Inspect explicit -xi spellings in the live merged Northern dictionary.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'../site');
const context=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async p=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'))})});
for(const file of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','lexical-reviews.js','word-merge.js'])
 vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),context);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await context.loadYubao(data);context.removeExcludedSource(data);
 context.initializeSemanticCategories(data.words);
 context.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',context);
 context.mergeDictionaryWords(data);
 const word=data.words.find(w=>w.id==='w74');
 console.log('W74:',JSON.stringify({id:word?.id,term:word?.term,zh:word?.zh,en:word?.en,dialect:word?.dialect,forms:word?.forms,ipa:word&&context.wordIPA(word),spellings:word&&context.completeSpellings(word),sourceIds:word?.sourceIds,attestations:word?.attestations?.slice(0,6)},null,2));
 const values=w=>[w.term,...(w.forms||[]),...(w.notations?.ye||[]).map(x=>x.text),...(w.notations?.brassett||[]).map(x=>x.text),...(w.notations?.accent||[]).map(x=>x.text),...context.completeSpellings(w).map(x=>x.text)];
 const north=data.words.filter(w=>w.dialect==='北部');
 const match=north.filter(w=>values(w).some(s=>/(?:^|[\s\-])xi(?:[1-4xfrv])?(?:$|[\s\-])/iu.test(String(s))||/-x[iīíǐì](?:$|[\s\-])/iu.test(String(s))));
 const samples=match.slice(0,100).map(w=>({id:w.id,term:w.term,zh:w.zh,ipa:context.wordIPA(w).slice(0,2),spellings:context.completeSpellings(w).map(v=>v.text).slice(0,3)}));
 console.log('NORTHERN -XI COUNT',match.length,'ALL NORTHERN',north.length);
 console.log('NORTHERN -XI SAMPLES:',JSON.stringify(samples));
})().catch(e=>{console.error(e);process.exitCode=1});
