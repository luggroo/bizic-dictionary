// Inspect exact leading-hyphen affixes in merged Northern entries.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'../site');
const c=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async p=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'))})});
for(const file of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','lexical-reviews.js','word-merge.js','editorial-notes.js'])
 vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(app.slice(0,app.indexOf('document.addEventListener(')),c);
(async()=>{
 const d=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 Object.assign(d,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await c.loadYubao(d);c.removeExcludedSource(d);c.initializeSemanticCategories(d.words);
 c.data=d;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',c);
 c.mergeDictionaryWords(d);
 const pref=w=>String(w.term||'').trimStart().startsWith('-')||(w.attestations||[]).some(a=>String(a.term||'').trimStart().startsWith('-'));
 const north=d.words.filter(w=>w.dialect==='北部');
 const affix=north.filter(pref);
 const brief=w=>({id:w.id,term:w.term,zh:w.zh,en:w.en,ipa:c.wordIPA(w).slice(0,4),forms:w.forms,attestations:(w.attestations||[]).map(a=>({term:a.term,zh:a.zh,en:a.en,pos:a.pos})).slice(0,7),notes:c.particleToneNotesFor(w).map(n=>n.id)});
 const match=affix.filter(w=>c.wordIPA(w).some(v=>/^(?:[-‐‑−])?(?:ɕi|ɲie|ȵie|nie|liɛ|lie|ma|mɔ|mo|pɔ|po|tsuo|tsɔ|tso)[⁰¹²³⁴⁵⁶⁷⁸⁹0-9]*$/u.test(String(v).replace(/\s/g,''))));
 console.log('AUDIT TOTALS',JSON.stringify({north:north.length,leadingAffixes:affix.length,phoneticMatch:match.length,matchedNotes:match.filter(w=>c.particleToneNotesFor(w).length).length}));
 for(const w of match)console.log('AFFIX CANDIDATE',JSON.stringify(brief(w)));
 for(const w of affix.filter(w=>!match.includes(w)).slice(0,90))console.log('OTHER PREFIXED',JSON.stringify({id:w.id,term:w.term,zh:w.zh,en:w.en,ipa:c.wordIPA(w).slice(0,2),notes:c.particleToneNotesFor(w).map(n=>n.id)}));
})().catch(e=>{console.error(e);process.exitCode=1});
