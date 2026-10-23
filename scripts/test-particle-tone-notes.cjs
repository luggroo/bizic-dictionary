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
// Do not propagate the rule to other -xi suffix functions or ordinary -xi-final words.
for(const [term,ipa,zh,en] of [
 ['-xi3','-ɕi²¹','只','only'],
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
