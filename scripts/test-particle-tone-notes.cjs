// Regression checks for grammatical-particle notes, including homophones.
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const src=fs.readFileSync('site/editorial-notes.js','utf8');
const ctx=vm.createContext({
 YUBAO_LUXI_CORRECTIONS:{},
 wordIPA:w=>w.ipa||[],
 normalizeIPA:s=>s
});
vm.runInContext(src,ctx,{filename:'site/editorial-notes.js'});
const note=vm.runInContext('particleToneNotesFor',ctx);
const specs=[
 ['pɔ²¹','目标','goal-po'],
 ['liɛ⁵⁵','从','source-lie'],
 ['ɕi²¹','名词化','nominalizer-xi'],
 ['ma⁴⁴','做某事的人','agent-ma'],
 ['ɲie⁵⁵','领属','associative-nie'],
 ['mɔ²¹','方式状语','adverbial-mo']
];
for(const [ipa,zh,id] of specs){
 const notes=note({dialect:'北部',ipa:[ipa],zh,en:''});
 assert.equal(notes.length,1,ipa+' should receive exactly one note');
 assert.equal(notes[0].id,'feng-2019-tone-'+id);
 assert.equal(notes[0].kind,'语流变调');
 assert.ok(notes[0].text.includes('Feng（2019'));
 assert.equal(note({dialect:'南部',ipa:[ipa],zh,en:''}).length,0,'southern varieties are excluded');
}
// A leading hyphen is a bound-morpheme marker, not part of the segmental IPA.
// w74 is the attested Brassett verbal suffix -xi2 ('that which').
const suffixW74={id:'w74',dialect:'北部',term:'-xi2',ipa:['-ɕi²⁴'],zh:'的',en:'[that which]',attestations:[{id:'w74',term:'-xi2',pos:'vsuff.'}]};
assert.equal(note(suffixW74).length,1,'w74 -xi must receive the nominalizer note');
assert.equal(note(suffixW74)[0].id,'feng-2019-tone-nominalizer-xi');
assert.equal(vm.runInContext('editorialNotesFor',ctx)(suffixW74).filter(n=>n.id==='feng-2019-tone-nominalizer-xi').length,1,'w74 must show the note in the entry editorial section');

// Every relevant hyphenated morpheme receives its own grammatical-sense note.
// Forms and IDs of the first six rows are from the merged Northern dictionary.
const grammaticalAffixes=[
 [
  "w4",
  "-bo3",
  "-pɔ²¹",
  "去",
  "[towards]",
  "goal-po"
 ],
 [
  "w51",
  "-lie1",
  "-liɛ⁵⁵",
  "在; 从",
  "[at, from]",
  "source-lie"
 ],
 [
  "w55",
  "-ma1",
  "-ma⁵⁵",
  "人",
  "[doer]",
  "agent-ma"
 ],
 [
  "w59",
  "-nie3",
  "-ȵiɛ²¹",
  "的",
  "['s]",
  "associative-nie"
 ],
 [
  "w74",
  "-xi2",
  "-ɕi²⁴",
  "的",
  "[that which]",
  "nominalizer-xi"
 ],
 [
  "w80",
  "-zuo3",
  "-tsuɔ²¹",
  "地方",
  "[place]",
  "locative-tsuo"
 ],
 [
  "fixture-manner",
  "-mo3",
  "-mɔ²¹",
  "方式状语",
  "[manner]",
  "adverbial-mo"
 ]
];
for(const [id,term,ipa,zh,en,key] of grammaticalAffixes){
 const w={id,term,ipa:[ipa],zh,en,dialect:'北部',attestations:[{term,zh,en,pos:'vsuff.'}]};
 const found=note(w);
 assert.deepEqual(Array.from(found,n=>n.id),['feng-2019-tone-'+key],id+' expected a single relevant note');
 assert.equal(vm.runInContext('editorialNotesFor',ctx)(w).filter(n=>n.id==='feng-2019-tone-'+key).length,1,id+' editor note should be rendered once');
 assert.equal(note({...w,dialect:'南部'}).length,0,id+' Southern entries are outside the study');
}
const locative=note({id:'w80',term:'-zuo3',ipa:['-tsuɔ²¹'],zh:'地方',en:'[place]',dialect:'北部'})[0];
assert.match(locative.text,/推测|尚无例证/,'locative sandhi must retain evidential limitation');
assert.equal(note({id:'no-hyphen-place',term:'zuo3',ipa:['tsuɔ²¹'],zh:'地方',en:'place',dialect:'北部'}).length,0,'unmarked place words are not assumed to be locative suffixes');

// Do not propagate the rule to other -xi suffix functions or ordinary -xi-final words.
for(const [term,ipa,zh,en] of [
 ['-xi3','-ɕi²¹','只','only'],
 ['-zu2','-tsu²⁴','时候','when'],
 ['-lie3','-liɛ²¹','了','[past]'],
 ['-lie3','-liɛ²¹','去','[go]'],
 ['-bo3','-pɔ²¹','着','[stative]'],
 ['-xi4','-ɕi²⁴','能; 可以','can'],
 ['-xi2','-ɕi²¹','很; 非常','very'],
 ['-xi3tai2','-ɕi²¹tʰai²⁴','最高程度','intensifier'],
 ['lai1xi2','lai⁵⁵ɕi²¹','什么','what'],
 ['-de1xi3','-tɤ⁵⁵ɕi²¹','可以','can'],
 ['xi1','ɕi⁵⁵','倍','times']
]){
 assert.equal(note({dialect:'北部',term,ipa:[ipa],zh,en}).length,0,'unrelated -xi item '+term+' should have no tone note');
}

for(const [ipa,zh] of [['pɔ²¹','持续体'],['liɛ²¹','完成体'],['mɔ²¹','猫'],['ma²¹','马']]){
 assert.equal(note({dialect:'北部',ipa:[ipa],zh,en:''}).length,0,'homophone incorrectly annotated: '+ipa+' '+zh);
}
console.log('Particle tone notes: six grammatical senses; bound -xi on w74; unrelated homophones excluded.');
