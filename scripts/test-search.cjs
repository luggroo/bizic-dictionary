const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const app=fs.readFileSync(require('path').join(__dirname,'../site/app.js'),'utf8');
const source=app.slice(app.indexOf('const normalize='),app.indexOf('\n',app.indexOf('const contains=')));
const c=vm.createContext({});vm.runInContext(source,c);
for(const [text,q] of [['miē','mie'],['mié','mie'],['miě','mie'],['miè','mie'],['a̱','a'],['ǖ','v'],['ǘ','v'],['ǚ','v'],['ǜ','v'],['ü','v'],['lüè','lve'],['ǖ-ua','v-ua'],['米饭','米饭']]){c.text=text;c.q=q;assert.equal(vm.runInContext('contains(text,q)',c),true,`${text} / ${q}`)}
assert.equal(vm.runInContext("contains('lü','lu')",c),false);
assert.notEqual(vm.runInContext("normalize('miē')",c),vm.runInContext("normalize('mié')",c),'dedup keys retain tones');
console.log('PASS: toneless searches, v/ü alias, ü/u distinction and tone-sensitive identity');
vm.runInContext("const state={q:'',exact:false,searchLanguage:''};function wordForms(w){return w.forms||[]}",c);
vm.runInContext(app.slice(app.indexOf('const wordSearchIndex='),app.indexOf('function wordMatches(')),c);
function score(w,q,lang='',exact=false){c.w=w;c.query=q;c.lang=lang;c.exact=exact;return vm.runInContext('state.q=query;state.searchLanguage=lang;state.exact=exact;wordSearchScore(w)',c)}
for(const en of ['first (in time)','paste / glue / stick','Miao (nationality)','mantis','reactionary','hold meeting','intestines; bowels','stir-fry'])assert.equal(score({forms:['ba'],en},'ti'),0,en);
assert.equal(score({forms:['tí'],en:'carry'},'ti'),100);
assert.equal(score({forms:['tí'],en:'carry'},'ti','en'),0);
assert(score({forms:['ba'],en:'cut; clip; trim'},'clip','en')>0);
assert.equal(score({forms:['ba'],en:'clipping'},'clip','en'),0);
assert.equal(score({forms:['ba'],en:'hold meeting'},'hold meeting','en'),100);
assert(score({forms:['lüè']},'lve','tujia')>0);
assert.equal(score({forms:['lüè']},'lue','tujia'),0);
assert.equal(score({forms:['ba'],zh:'姐姐; 堂姐'},'姐姐','zh',true),100);
assert.equal(score({forms:['tia']},'ti','tujia',true),0);
assert.equal(score({forms:['tí']},'ti','zh'),0);
console.log('PASS: language scopes, English tokens, ti noise rejection, spelling ranking and exact sense matching');
for(const en of ['there','therefore','everywhere','where'])assert.equal(score({forms:['ba'],en},'here','en'),0,en);
assert.equal(score({forms:['ba'],en:'here'},'here','en'),100);
assert.equal(score({forms:['ba'],en:'come here'},'here','en'),70);
vm.runInContext(app.slice(app.indexOf('function rankedWords('),app.indexOf('\nfunction wordMatches(')),c);
c.items=[{forms:['ba'],en:'there'},{forms:['da'],en:'come here'},{forms:['ga'],en:'here'}];
assert.equal(vm.runInContext("state.q='here';state.searchLanguage='zh';rankedWords(items,'').map(w=>w.en).join('|')",c),'here|come here');
assert(app.includes("const words=rankedWords(D.words,'');"));
assert.equal((app.match(/search\(\)\+languageSearchButtons\(\)/g)||[]).length,2);
assert(!app.slice(app.indexOf('function globalView()'),app.indexOf('function setView(')).includes('languageSearchButtons()'));
console.log('PASS: here excludes embedded matches, exact gloss ranks first, global search ignores dictionary language, controls confined to dictionary');
// Exercise the actual submit handler, including consecutive searches in the same language.
vm.runInContext(`const form={},input={value:''};let renders=0;
const document={querySelectorAll:()=>[]};
const $=s=>s==='#search-form'?form:s==='#query'?input:null;
function render(){renders++}`,c);
vm.runInContext(app.slice(app.indexOf('function bindMain()'),app.indexOf('function download(')),c);
vm.runInContext("state.view='words';bindMain()",c);
for(const [lang,query] of [['en','here'],['en','there'],['zh','这里'],['tujia','nix']]){
 c.lang=lang;c.query=query;
 assert.equal(vm.runInContext("input.value=' '+query+' ';form.onsubmit({preventDefault(){},submitter:{dataset:{searchLanguage:lang}}});state.searchLanguage+'|'+state.q",c),lang+'|'+query);
}
assert.equal(vm.runInContext('renders',c),4);
const buttons=vm.runInContext('languageSearchButtons()',c);
assert.equal((buttons.match(/type="submit" form="search-form"/g)||[]).length,3);
assert.equal((buttons.match(/<svg /g)||[]).length,3);
assert(!buttons.includes('aria-pressed'));
console.log('PASS: three independent submit actions search current input, with icons and no selection state');
