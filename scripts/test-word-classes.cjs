/* Word-class normalization and a data-driven audit of original POS tags. */
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const source=fs.readFileSync('site/word-classes.js','utf8');
const context=vm.createContext({});
vm.runInContext(source+'\nthis.WordClasses=WordClasses;',context);
const pos=context.WordClasses;
const get=(...labels)=>JSON.stringify(pos.ids({positions:labels}));
assert.equal(get('n.','noun','名词'),'["noun"]');
assert.equal(get('n. / v.'),'["noun","verb"]');
assert.equal(get('v.','vt'),'["verb.transitive"]');
assert.equal(get('nsuff.','nominal suffix'),'["affix.suffix.nominal"]');
assert.equal(get('vsuff.','verbal suffix'),'["affix.suffix.verbal"]');
assert.equal(get('pron.'),'["pronoun"]');
assert.equal(get('adjective'),'["adjective"]');
assert.equal(get('unmapped source label'),'["unclassified"]');
assert.equal(pos.matches({positions:['n.']},'lexical'),true);
assert.equal(pos.matches({positions:['vt']},'verb'),true);
assert.equal(pos.matches({positions:['nsuff.']},'morphology'),true);
assert.equal(pos.matches({positions:['n.']},'verb'),false);
assert.equal(pos.filterId('adj.'),'adjective');
assert.equal(pos.matches({positions:['unmapped source label']},'unmapped source label'),true);
pos.initialize([{positions:['n.']},{positions:['noun']},{positions:['vt']},{positions:['nsuff.']}]);
assert.match(pos.selector('noun'),/value="noun" selected/);
assert.match(pos.selector(''),/名词 \/ Noun \(2\)/);
assert.match(pos.label({positions:['nsuff.']}),/名词性后缀 \/ Nominal suffix/);
console.log('Word-class normalization, hierarchy and bilingual labels: OK');
const file='site/dictionary.json.gz';
if(fs.existsSync(file)){
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(file)).toString('utf8'));
 const words=Array.isArray(data.words)?data.words:[];
 if(words.length){
  const raw=new Map();
  for(const w of words)for(const value of [...(Array.isArray(w.positions)?w.positions:[]),w.pos].filter(Boolean)){
   const label=String(value).trim();raw.set(label,(raw.get(label)||0)+1);
  }
  console.log('Dictionary entries: '+words.length+'; distinct source POS labels: '+raw.size);
  console.log('Most common POS labels: '+JSON.stringify([...raw].sort((a,b)=>b[1]-a[1]).slice(0,50)));
  const notMapped=pos.unmapped(words);
  console.log('Unmapped POS labels ('+notMapped.length+'): '+JSON.stringify(notMapped.slice(0,100)));
 }
}

/* Source examples for ambiguous inherited abbreviations; diagnostics only. */
{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync('site/dictionary.json.gz')).toString('utf8'));
 const watch=new Set(['be v.','advm.','expr.','advt.','onom.','nbp','advl.','advd.','dem','nveg','intg','va.','be','vc.','Nanim','itr.v.','nrel','Nbp']);
 const examples={};
 for(const w of data.words||[]){
  const tags=[...(Array.isArray(w.positions)?w.positions:[]),w.pos].filter(Boolean);
  for(const tag of tags){
   if(!watch.has(String(tag)))continue;
   const key=String(tag);
   if(!examples[key])examples[key]=[];
   if(examples[key].length>=4||examples[key].some(x=>x.term===w.term))continue;
   examples[key].push({term:w.term,zh:w.zh,en:w.en});
  }
 }
 console.log('Source POS examples: '+JSON.stringify(examples));
}
