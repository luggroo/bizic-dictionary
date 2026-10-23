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
for(const [ipa,zh] of [['pɔ²¹','持续体'],['liɛ²¹','完成体'],['mɔ²¹','猫'],['ma²¹','马']]){
 assert.equal(note({dialect:'北部',ipa:[ipa],zh,en:''}).length,0,'homophone incorrectly annotated: '+ipa+' '+zh);
}
console.log('Particle tone notes: six grammatical senses checked; unrelated homophones excluded.');
