const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {normalizeIPAAspiration,normalizeIPA,ipaIdentity,mergeIPANotations,normalizeIPAData}=require('../site/ipa-normalize.js');
// h and typographic/ASCII apostrophes marking aspiration collapse to IPA superscript h.
assert.equal(normalizeIPA("pha55 thɨ33 kha21 tsha55 tɕ’a35 ts'i55"),"pʰa⁵⁵ tʰɨ³³ kʰa²¹ tsʰa⁵⁵ tɕʰa³⁵ tsʰi⁵⁵");
assert.equal(normalizeIPA("tʃhɑ55 tʂ’ɨ31 q'e55"),"tʃʰɑ⁵⁵ tʂʰʅ³¹ qʰe⁵⁵");
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
assert.equal(v[0].text,'tsʰɿ³³');
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
assert(read('index.html').includes('src="page-loader.js'),'index.html loads the reader module loader');
const loader=vm.createContext({window:{},document:{getElementById:id=>id==='main'?{innerHTML:''}:null}});
vm.runInContext(read('page-loader.js'),loader);
const notation=Array.from(vm.runInContext('SitePages.definitions.notation.files',loader));
assert(notation.includes('ipa-normalize.js'),'notation loads the IPA standardizer');
for(const f of ['notation-ui.js','word-merge.js','yubao.js','southern-notation.js','notation-pairs.js','longshan-texts.js']){
 assert(read(f).includes(f==='word-merge.js'?'normalizeIPAWord(':'normalizeIPAAspiration(')||read(f).includes('normalizeIPA('),f+' is not wired to standardizer');
 if(notation.includes(f))assert(notation.indexOf('ipa-normalize.js')<notation.indexOf(f),'standardizer loads before '+f);
}
console.log('PASS: IPA aspiration ʰ, normalized tone values, duplicate coalescing, source retention, converter and corpus integration');

// Site symbols are canonical; non-apical ɨ, diphthongs and source witnesses survive.
assert.equal(normalizeIPA('ɳi55 ɲi21 ɲ̟ie24'),'ȵi⁵⁵ ȵi²¹ ȵie²⁴');
assert.equal(normalizeIPA('tsɨ55 tshɨ24 dzɨ21 sɨ33 zɨ53 tʂɨ55 tʂhɨ21 ʐɨ33'),'tsɿ⁵⁵ tsʰɿ²⁴ dzɿ²¹ sɿ³³ zɿ⁵³ tʂʅ⁵⁵ tʂʰʅ²¹ ʐʅ³³');
assert.equal(normalizeIPA('kɨ55 khɨ21 xɨ33 ɣɨ24 tɨ33 dɨ21 sɨe55'),'kɨ⁵⁵ kʰɨ²¹ xɨ³³ ɣɨ²⁴ tɨ³³ dɨ²¹ sɨe⁵⁵');
assert.equal(normalizeIPA('fu24',{brassett:true}),'ɸu²⁴');
assert.equal(normalizeIPA('xu21 xa55',{brassett:true}),'ɸu²¹ xa⁵⁵');
assert.equal(normalizeIPA('fu24'),'fu²⁴');
const scoped={words:[{attestations:[{id:'b',source:'brassett-2006',term:'fu24'},{id:'c',source:'chen',term:'fu24'}],notations:{ipa:[{text:'fu24',attestationIds:['b']},{text:'fu24',attestationIds:['c']}]}}]};
normalizeIPAData(scoped);
assert.deepEqual(scoped.words[0].notations.ipa.map(n=>n.text),['ɸu²⁴','fu²⁴']);
assert.equal(scoped.words[0].attestations[0].term,'fu24');
assert.deepEqual(scoped.words[0].notations.ipa[0].originalTexts,['fu24']);
assert.equal(normalizeIPA(normalizeIPA('ɲi55 tsɨ21')),'ȵi⁵⁵ tsɿ²¹');
