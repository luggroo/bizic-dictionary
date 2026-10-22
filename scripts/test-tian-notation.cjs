const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'../site');
const c=vm.createContext({localStorage:{getItem:()=>null},document:{addEventListener(){}}});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
for(const [ipa,ye] of [['a21ne55','arniex'],['a55le55','axliex'],['ne21','nier'],['mɨe35','mef'],['mɨe35tse21','mefzer'],['tɕe55','jiex']]){
 const r=c.convertNotation(ipa,'stedt-cb523fc3dc:north');assert.equal(r.rows[0].ye,ye,ipa);assert.ok(!r.partial,ipa);
 const w={attestations:[{id:'test',source:'stedt-cb523fc3dc',dialect:'北部',term:ipa}]};assert.equal(c.sourceNotationValues(w).ye[0].text,ye);
}
for(const ipa of ['e21','ne2','ne5','ne33'])assert.ok(c.convertNotation(ipa,'stedt-cb523fc3dc:north').error,ipa);
assert.equal(c.sourceNotationValues({attestations:[{source:'stedt-cb523fc3dc',dialect:'南部',term:'ne21'}]}).ye.length,0);
console.log('PASS: Tian source routing, vowel correspondences, surface tones, uncertain fallback, Southern isolation');

for(const [ipa,ye] of [['me55','miex'],['me21xa21','mierhar'],['xɨe21','her'],['xɨe55','hex']]){
 const r=c.convertNotation(ipa,'stedt-cb523fc3dc:north');assert.equal(r.rows[0].ye,ye);assert.equal(r.reviewed,true);
}
console.log('PASS: four user-reviewed whole-word corrections');

for(const [ipa,ye] of [['tsi55','zix'],['si21','sir'],['no55','nox'],['mũ21','mongr'],['liã35','lianf'],['te55','diex'],['the55','tiex'],['phe55','piex'],['khɨe55','kex'],['ɣɨe21','hxer'],['jiu35','youf'],['tha◦i35','taif']]){
 const r=c.convertNotation(ipa,'stedt-cb523fc3dc:north');assert.equal(r.rows[0].ye,ye,ipa);assert.ok(!r.partial,ipa);
}
assert.equal(c.sourceNotationValues({attestations:[{id:'alt',source:'stedt-cb523fc3dc',dialect:'北部',term:'khɨu³⁵~khei³⁵'}]}).ye.filter(v=>v.method!=='source-partial')[0].text,'keif');
console.log('PASS: Tian contextual vowels, nasals, independent alternates and unknown-tone preservation');
