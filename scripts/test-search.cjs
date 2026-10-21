const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const app=fs.readFileSync(require('path').join(__dirname,'../site/app.js'),'utf8');
const source=app.slice(app.indexOf('const normalize='),app.indexOf('\n',app.indexOf('const contains=')));
const c=vm.createContext({});vm.runInContext(source,c);
for(const [text,q] of [['miē','mie'],['mié','mie'],['miě','mie'],['miè','mie'],['a̱','a'],['ǖ','v'],['ǘ','v'],['ǚ','v'],['ǜ','v'],['ü','v'],['lüè','lve'],['ǖ-ua','v-ua'],['米饭','米饭']]){c.text=text;c.q=q;assert.equal(vm.runInContext('contains(text,q)',c),true,`${text} / ${q}`)}
assert.equal(vm.runInContext("contains('lü','lu')",c),false);
assert.notEqual(vm.runInContext("normalize('miē')",c),vm.runInContext("normalize('mié')",c),'dedup keys retain tones');
console.log('PASS: toneless searches, v/ü alias, ü/u distinction and tone-sensitive identity');
