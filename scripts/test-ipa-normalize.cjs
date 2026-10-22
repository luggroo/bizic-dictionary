const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {normalizeIPAAspiration,normalizeIPA,ipaIdentity,mergeIPANotations,normalizeIPAData}=require('../site/ipa-normalize.js');
// h and typographic/ASCII apostrophes marking aspiration collapse to IPA superscript h.
assert.equal(normalizeIPA("pha55 thɨ33 kha21 tsha55 tɕ’a35 ts'i55"),"pʰa⁵⁵ tʰɨ³³ kʰa²¹ tsʰa⁵⁵ tɕʰa³⁵ tsʰi⁵⁵");
assert.equal(normalizeIPA("tʃhɑ55 tʂ’ɨ31 q'e55"),"tʃʰɑ⁵⁵ tʂʰɨ³¹ qʰe⁵⁵");
assert.equal(normalizeIPA("pʰa⁵⁵ tsʰi³³"),"pʰa⁵⁵ tsʰi³³");
// Non-aspiration is not rewritten: ejectives U+02BC, glottal stop, plain h, spelling boundaries.
assert.equal(normalizeIPA("kʼa55 ʔa55 ha55 a'ɯ33"),"kʼa⁵⁵ ʔa⁵⁵ ha⁵⁵ a'ɯ³³");
assert.equal(normalizeIPAAspiration("sɣ33"),"sɣ33");
assert.equal(ipaIdentity("tshɨ33"),ipaIdentity("ts’ɨ³³"));
const v=mergeIPANotations([
 {text:"tshɨ33",profile:'chen',method:'source',attestationIds:['source1']},
 {text:"ts'ɨ³³",profile:'sun',method:'source',attestationIds:['source2']},
 {text:"tsʰɨ33",profile:'chen',method:'user',attestationIds:['source3']},
 {text:"tsɨ33",profile:'chen',method:'source',attestationIds:['source4']}
]);
assert.equal(v.length,2);
assert.equal(v[0].text,'tsʰɨ³³');
assert.deepEqual(v[0].attestationIds,['source1','source2','source3']);
assert.deepEqual(v[0].sourceProfiles,['chen','sun']);
assert.deepEqual(v[0].originalTexts,['tshɨ33',"ts'ɨ³³",'tsʰɨ33']);
assert.notEqual(v[0].text,v[1].text);
const raw={words:[{notations:{ipa:[{text:"p’a55",attestationIds:['a']},{text:'pha⁵⁵',attestationIds:['b']}]},attestations:[{id:'a',term:"p’a55"},{id:'b',term:'pha55'}]}],corpus:[{ipa:'tha55',blocks:[{ipa:"ts'i33"}]}]};
normalizeIPAData(raw);
assert.equal(raw.words[0].notations.ipa.length,1);
assert.equal(raw.words[0].notations.ipa[0].text,'pʰa⁵⁵');
assert.equal(raw.words[0].attestations[0].term,"p’a55");
assert.equal(raw.corpus[0].ipa,'tʰa⁵⁵');
assert.equal(raw.corpus[0].blocks[0].ipa,'tsʰi³³');
// Guard all published pathways against a regression to the old h-only replacement.
const site=path.resolve(__dirname,'../site');
const read=f=>fs.readFileSync(path.join(site,f),'utf8');
for(const f of ['index.html','notation-ui.js','word-merge.js','yubao.js','southern-notation.js','notation-pairs.js','longshan-texts.js']){
 assert(read(f).includes(f==='index.html'?'ipa-normalize.js':f==='word-merge.js'?'normalizeIPAWord(':f==='longshan-texts.js'?'normalizeIPA(':'normalizeIPAAspiration(')||read(f).includes('normalizeIPA('),f+' is not wired to standardizer');
}
console.log('PASS: IPA aspiration ʰ, normalized tone values, duplicate coalescing, source retention, converter and corpus integration');
