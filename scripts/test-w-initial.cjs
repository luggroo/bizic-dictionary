// Written initial w must agree in the lexicon, grammar and source conversions.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
for(const file of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','notation-pairs.js','grammar-notation.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const run=s=>vm.runInContext(s,ctx),profiles=run('NOTATION_CONFIG.profiles');
let synthetic=0;
for(const p of profiles.filter(p=>p.kind==='ipa'&&p.mappingMode&&p.conversionEnabled!==false))for(const core of ['u','ũ','ua','uo','uai','uei','ui','uan','un','uŋ'])for(const tone of Object.keys(p.toneMap||{})){
 const result=ctx.convertNotation(core+tone,p.id);if(result.error||result.partial)continue;
 for(const row of result.rows)assert(row.ye.startsWith('w'),p.id+' '+core+tone+' → '+row.ye);
 synthetic++;
}
for(const p of profiles.filter(p=>p.kind==='ipa'&&p.mappingMode&&p.conversionEnabled!==false))for(const core of ['o','ɔ','õ','ɔ̃'])for(const tone of Object.keys(p.toneMap||{})){
 const result=ctx.convertNotation(core+tone,p.id);if(result.error||result.partial)continue;
 for(const row of result.rows)assert(!row.ye.startsWith('w'),p.id+' '+core+tone+' must not acquire w: '+row.ye);
}
for(const point of ['60756','60757','60823'])for(const [core,written] of [['u','wū'],['ua','wā'],['uo','wō'],['uai','wāi'],['ui','wēi']])assert.equal(ctx.northernSurveySpelling(core+'55',point).accent,written,point+' '+core);
for(const [raw,accent,poj] of [['u55','wū','ū'],['ũ55','wūn','ūn'],['ua35','wá','uá'],['uo21','wò','uò'],['uei35','wéi','uéi'],['uã55','wān','uān'],['wu55','wū','ū']]){
 const result=ctx.southernSpelling(raw,'yubao-60824');assert.equal(result.accent,accent,raw);assert.equal(result.poj,poj,raw);
}
assert.equal(ctx.northernSurveySpelling('uo24thu55','60757').accent,'wótū');
assert.equal(ctx.northernSurveySpelling('uei33tsi33li24','60757').accent,'wēizīlí');
assert.equal(ctx.northernSurveySpelling('uɤ̃55','60823').accent,'wēn');
assert.equal(ctx.northernSurveySpelling('un55','60756').accent,'wēn');
assert.equal(ctx.northernSurveySpelling('un33','60756').ye,'wenr');
assert.equal(ctx.northernSurveySpelling('kun55','60756').accent,'gūn');
assert.equal(ctx.northernSurveySpelling('lu33un33tsɿ55','60756').accent,'lǔwěnzī');
assert.equal(ctx.grammarSpelling('u','north').accent,'wu');
assert.equal(ctx.grammarSpelling('u²¹','north','ur').accent,'wǔ');
assert.equal(ctx.grammarSpelling('uo²¹','north').accent,'wǒ');
assert.equal(ctx.grammarSpelling('uo²¹','north','or').accent,'wǒ');
assert.equal(ctx.grammarSpelling('u³⁵','south').accent,'wú');
assert.equal(ctx.grammarSpelling('u³⁵','south').poj,'ú');
assert.equal(ctx.grammarSpelling('ɯ²¹','north').accent,'ǐ');
assert.equal(ctx.southernSpelling('u̵35','stedt-cb523fc3dc').accent,'éu','barred u is a different vowel');
assert.equal(ctx.southernSpelling('ʔu35','yubao-60824').accent,"'ú",'preserve the glottal onset');
assert.equal(ctx.grammarSpelling('ku²¹','north').accent,'gǔ','consonant-initial u stays a rime');
assert.equal(ctx.displayBrassett('-u','ye'),'-wu');
assert.equal(ctx.normalizeYeInitials('ufduxfufuox'), 'wufduxfufwox');
assert.equal(ctx.normalizeYeInitials('ox'), 'ox','bare o does not identify initial u');
assert.equal(ctx.normalizeYeInitials('⟦u55⟧ uf'), '⟦u55⟧ wuf');
for(const p of profiles.filter(p=>p.kind==='brassett'))assert.equal(ctx.convertNotation('u1',p.id).rows[0].ye,'wux');
assert.equal(ctx.convertNotation('u55','zhou-ts').rows[0].ipa,ctx.standardBrassettIPA('u1'),'written w does not add a phonetic onset');
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));Object.assign(data,JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))));await ctx.loadYubao(data);
 const evidence=JSON.stringify(data.words.map(w=>[w.term,w.attestations,w.notations?.ipa]));let checked=0;
 for(const w of data.words)for(const a of w.attestations||[]){
  const source=a.source==='stedt-cb523fc3dc'&&a.dialect==='北部'?a.source+':north':a.source,p=profiles.find(p=>p.id===source);
  if(a.dialect!=='南部'&&(!p||p.conversionEnabled===false||p.kind!=='ipa'))continue;
  for(const unit of ctx.npIPASyllables(a.correctedTerm||a.term)){
   const core=a.dialect==='南部'?ctx.southNormalize(unit.core,source):unit.core;if(!/^u/.test(core.normalize('NFD')))continue;
   const result=a.dialect==='南部'?ctx.southernSpelling(unit.text,source):ctx.convertNotation(unit.text,source);if(!result||result.error||result.partial)continue;
   const forms=a.dialect==='南部'?[result.accent]:result.rows.map(r=>r.ye).filter(Boolean);for(const form of forms){assert(form.startsWith('w'),a.id+' '+unit.text+' → '+form);checked++;}
  }
 }
 for(const [id,accent,ye] of [['yubao-60757-v-0128','wótū','woftux'],['yubao-60757-v-2568','wēizīlí','weixzixlif']]){
  const w=data.words.find(w=>w.id===id);run("spellingDisplay='accent'");assert.equal(ctx.notationHead(w),accent);run("spellingDisplay='ye'");assert.equal(ctx.notationHead(w),ye);
 }
 assert.equal(JSON.stringify(data.words.map(w=>[w.term,w.attestations,w.notations?.ipa])),evidence,'source evidence remains untouched');
 console.log('PASS: w onset in '+synthetic+' profile cases and '+checked+' attested syllables; dictionary, grammar, independent consonants, POJ and original IPA.');
})().catch(e=>{console.error(e);process.exitCode=1});
