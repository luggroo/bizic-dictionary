// The same written y onset must reach dictionary, grammar and source-table paths.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
for(const file of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','notation-pairs.js','grammar-notation.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const run=s=>vm.runInContext(s,ctx);
const plain=s=>s.normalize('NFD').replace(/\p{M}/gu,'');
const profiles=run('NOTATION_CONFIG.profiles');

// All supported northern IPA profiles share the onset, with independent rimes/tones.
let synthetic=0;
for(const p of profiles.filter(p=>p.kind==='ipa'&&p.mappingMode&&p.conversionEnabled!==false)){
 for(const core of ['i','ĩ','ie','ia','iu','ji','jie','jia','ʑi','ʑie','ʑia']){
  for(const tone of Object.keys(p.toneMap||{})){
   const result=ctx.convertNotation(core+tone,p.id);
   if(result.error||result.partial)continue;
   for(const row of result.rows)assert(row.ye.startsWith('y'),p.id+' '+core+tone+' → '+row.ye);
   synthetic++;
  }
 }
}
for(const point of ['60756','60757','60823'])for(const core of ['i','ie','ia','iu','ji','jie','jia','ʑi','ʑie','ʑia']){
 const result=ctx.northernSurveySpelling((point==='60823'?core.replace(/iu$/,'iɤu'):core)+'55',point);
 assert(result,point+' '+core);
 assert(result.ye.startsWith('y')&&result.accent.startsWith('y'),point+' '+core);
 assert(!/yi[aeou]/.test(plain(result.accent)),point+' '+core+' duplicates i');
}
assert.equal(ctx.northernSurveySpelling('ie21ka24tshu53','60757').accent,'yěgácù');
assert.equal(ctx.northernSurveySpelling('ie21ka24tshu53','60757').ye,'yergafcuv');
assert.equal(ctx.northernSurveySpelling('me24i24la33','60757').accent,'méyílā');
for(const [raw,accent,poj] of [['i55','yī','ī'],['ĩ55','yīn','īn'],['ie35','yé','ié'],['ia21','yà','ià'],['iu35','yú','iú'],['ji35','yí','í'],['ʑie35','yé','yé']]){
 const result=ctx.southernSpelling(raw,'yubao-60824');
 assert.equal(result.accent,accent,raw);assert.equal(result.poj,poj,raw);
}
assert.equal(ctx.grammarSpelling('ie²¹ka²⁴tsʰu⁵³').accent,'yěgácù');
assert.equal(ctx.grammarSpelling('i','north').accent,'yi');
assert.equal(ctx.grammarSpelling('iu³⁵','south').accent,'yú');
assert.equal(ctx.grammarSpelling('iu³⁵','south').poj,'iú');
assert.equal(ctx.grammarSpelling('ɨ²¹','north').accent,'ǐ','central vowels must not acquire y');
assert.equal(ctx.southernSpelling('ʔi35','yubao-60824').accent,"'í",'preserve the glottal onset');
assert.equal(ctx.southernSpelling('dʑi35','yubao-60824').accent,'jjí','affricates are not /ʑ/');
assert.equal(ctx.northernSurveySpelling('tɕi55','60757').accent,'jī');
assert.equal(ctx.displayBrassett('-i','ye'),'-yi');
for(const p of profiles.filter(p=>p.kind==='brassett'))assert.equal(ctx.convertNotation('i1',p.id).rows[0].ye,'yix');

(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));
 await ctx.loadYubao(data);
 const evidence=JSON.stringify(data.words.map(w=>[w.term,w.attestations,w.notations?.ipa]));
 let checked=0;
 for(const w of data.words)for(const a of w.attestations||[]){
  const source=a.source==='stedt-cb523fc3dc'&&a.dialect==='北部'?a.source+':north':a.source;
  const p=profiles.find(p=>p.id===source);
  if(a.dialect!=='南部'&&(!p||p.conversionEnabled===false||p.kind!=='ipa'))continue;
  for(const unit of ctx.npIPASyllables(a.correctedTerm||a.term)){
   if(!/^[ijʑ]/.test(unit.core.normalize('NFD')))continue;
   const result=a.dialect==='南部'?ctx.southernSpelling(unit.text,source):ctx.convertNotation(unit.text,source);
   if(!result||result.error||result.partial)continue;
   const forms=a.dialect==='南部'?[result.accent]:result.rows.map(r=>r.ye).filter(Boolean);
   for(const form of forms){assert(form.startsWith('y'),a.id+' '+unit.text+' → '+form);checked++;}
  }
 }
 const restaurant=data.words.find(w=>w.id==='yubao-60757-v-0695');
 assert.equal(ctx.notationHead(restaurant),'yěgácù');
 run("spellingDisplay='ye'");assert.equal(ctx.notationHead(restaurant),'yergafcuv');
 assert.equal(ctx.notationHead(data.words.find(w=>w.id==='w38')),'-yi');
 assert.equal(JSON.stringify(data.words.map(w=>[w.term,w.attestations,w.notations?.ipa])),evidence,'source evidence remains untouched');
 console.log('PASS: y onset in '+synthetic+' profile cases and '+checked+' attested syllables; dictionary, grammar, source tables, POJ exceptions and source IPA.');
})().catch(e=>{console.error(e);process.exitCode=1});
