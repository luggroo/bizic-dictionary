const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','lexical-reviews.js','word-merge.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("document.addEventListener(")),ctx);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await ctx.loadYubao(data);ctx.removeExcludedSource(data);ctx.initializeSemanticCategories(data.words);ctx.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',ctx);
 const assert=require('assert');const before=data.words.length;const bao=data.words.filter(w=>['yangchao','wanmipo'].includes(ctx.wordVarietyInfo(w).kind)).map(w=>w.id);
 ctx.mergeDictionaryWords(data);
 assert.equal(before-data.words.length,2137);assert.equal(new Set(data.words.map(w=>w.id)).size,data.words.length);
 assert.deepEqual(data.words.filter(w=>['yangchao','wanmipo'].includes(ctx.wordVarietyInfo(w).kind)).map(w=>w.id),bao);
 for(const w of data.words){const ds=new Set((w.attestations||[]).map(a=>a.dialect));assert(!(ds.has('北部')&&ds.has('南部')),w.id+' mixed dialect attestations');const ipa=w.notations?.ipa||[];assert.equal(new Set(ipa.map(v=>ctx.ipaIdentity(v.text))).size,ipa.length,w.id+' duplicate IPA');for(const v of ipa)assert.equal(v.text,ctx.normalizeIPA(v.text),w.id+' noncanonical IPA');}
 const by=new Map(data.words.map(w=>[w.id,w]));assert(by.has('w1760'));assert.notEqual(data.wordAliases['w1759']||'w1759',data.wordAliases['w1758']||'w1758');
 assert.equal(ctx.dictionaryGlosses(['cut / clip / trim','clip;cut'],'en').join('; '),'cut; clip; trim');
 assert.equal(ctx.dictionaryGlosses(['姐/姐姐','堂姐'],'zh').join('; '),'姐姐; 堂姐');
 for(const [ipa,accent] of [['tɕe⁵⁵','jiē'],['tɕɛ⁵⁵','jiē'],['tɕʰe³³','qiě'],['ɕɛ³³','xiě'],['ʑe³³','yě'],['pe³³','běi'],['ȵɛ⁵⁵','niē'],['ɲɛ³³','niě'],['ȵe⁵⁵','niē'],['ȵa⁵⁵','niā'],['ȵu⁵⁵','niū'],['ȵai⁵⁵','niāi'],['nɛ⁵⁵','nāi']])assert.equal(ctx.northernSurveySpelling(ipa,'60756').accent,accent);
 assert.equal(ctx.northernSurveySpelling('ȵɛ⁵⁵','60757').accent,'nāi');
 const graduate=by.get('yubao-60756-v-2525');
 assert.equal(graduate.notations.accent[0].text,'bíniē');
 assert.equal(graduate.notations.ye[0].text,'bifniex');
 assert.equal(graduate.notations.ipa[0].text,'pi³⁵ȵɛ⁵⁵');
 assert.equal(graduate.attestations[0].term,'pi35ȵɛ55');
 for(const [old,id] of Object.entries(data.wordAliases))assert(by.has(id),old+' dangling alias '+id);
 vm.runInContext("state.dialect='南部'",ctx);for(const w of data.words.filter(ctx.dialectMatches))assert.equal(ctx.wordVarietyInfo(w).kind,'south',w.id);
 console.log('PASS: '+before+' → '+data.words.length+' entries; Baojing preserved; unrelated homonyms separate; gloss deduplication; Xianren; aliases.');
})().catch(e=>{console.error(e);process.exit(1)});
