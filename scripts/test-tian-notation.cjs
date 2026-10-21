const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'../site');
const c=vm.createContext({localStorage:{getItem:()=>null},document:{addEventListener(){}}});
for(const f of ['notation-profiles.js','notation-ui.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
for(const [ipa,ye] of [['a21ne55','arniex'],['a55le55','axliex'],['ne21','nier'],['mɨe35','mef'],['mɨe35tse21','mefzer'],['tɕe55','jiex']]){
 const r=c.convertNotation(ipa,'stedt-cb523fc3dc:north');assert.equal(r.rows[0].ye,ye,ipa);assert.ok(!r.partial,ipa);
 const w={attestations:[{id:'test',source:'stedt-cb523fc3dc',dialect:'北部',term:ipa}]};assert.equal(c.sourceNotationValues(w).ye[0].text,ye);
}
for(const ipa of ['me55','xɨe21','e21','ne2','ne5','ne33'])assert.ok(c.convertNotation(ipa,'stedt-cb523fc3dc:north').error,ipa);
assert.equal(c.sourceNotationValues({attestations:[{source:'stedt-cb523fc3dc',dialect:'南部',term:'ne21'}]}).ye.length,0);
console.log('PASS: Tian source routing, vowel correspondences, surface tones, uncertain fallback, Southern isolation');
