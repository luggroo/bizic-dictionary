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
for(const q of ['ıì-mò-kēn-crı̀','ıi-mo-ken-cri','ii-mo-ken-cri','iimokencri']){
 assert.equal(score({forms:['ıì-mò-kēn-crı̀']},q,'tujia',true),100,q);
}
assert.equal(score({forms:['cıi']},'cii','tujia',true),100);
assert.equal(score({forms:['cıi']},'ci','tujia',true),0);
assert.equal(score({forms:['cıi']},'cri','tujia',true),0);
console.log('PASS: language scopes, English tokens, ti noise rejection, spelling ranking and exact sense matching');
const glottalQuotes=["'",'‘','’','ʼ','ʻ','ʹ','′','＇','ʔ'];
for(const quote of glottalQuotes){
 assert.equal(score({forms:['ʔo³⁵',"'ó"]},quote,'tujia'),80,quote+' finds the consonant');
 assert.equal(score({forms:['ʔo³⁵',"'ó"]},quote),80,quote+' works across languages');
 assert.equal(score({forms:["ma'à"],en:"father's brother"},quote),0,quote+' excludes boundaries and English punctuation');
 assert.equal(score({forms:['ʔo³⁵']},quote,'en'),0);
 assert.equal(score({forms:['ʔo³⁵']},quote,'tujia',true),0,'exact matching still means whole forms');
 assert.equal(score({forms:['ʔo³⁵',"'ó"]},quote+'o','tujia',true),100);
 assert.equal(score({forms:['ó']},quote+'o','tujia',true),0,'an explicit onset is not discarded');
 assert(score({forms:['ma³³ʔa²¹']},quote+'a','tujia')>0,'medial glottal syllables');
 assert.equal(score({forms:["'ıì-mò"]},quote+'ii-mo','tujia',true),100,'dotless and toneless spelling aliases');
}
assert.notEqual(vm.runInContext("normalize('ʔo')",c),vm.runInContext('normalize("\'o")',c),'search aliases never rewrite source identity');
console.log('PASS: apostrophe variants and IPA glottal queries, with boundary and language-scope exclusions');
for(const en of ['there','therefore','everywhere','where'])assert.equal(score({forms:['ba'],en},'here','en'),0,en);
for(const en of ["chest (English 'chest' here is the body part.)","pigweed (Original English 'pigweed' suggests a plant; here the gloss is 猪草 (grass/greens); not a species.)","time (The English 'time' denotes 时节／时间 here.)","water (Note: 'here' belongs to an editorial note (unverified).)"]){
 assert.equal(score({forms:['ba'],en},'here','en'),0,en);
}
assert(score({forms:['ba'],en:'water (hot)'},'hot','en')>0,'meaningful sense qualifiers remain searchable');
assert.equal(score({forms:['ba'],en:"pigweed (Original English 'pigweed' suggests a plant (grass/greens).); fodder"},'fodder','en'),100,'senses after nested editorial notes remain searchable');
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
// Default submissions clear the last single-language scope and preserve filters.
for(const submitter of [undefined,{dataset:{}}]){
 c.submitter=submitter;
 assert.equal(vm.runInContext("state.searchLanguage='zh';state.dialect='北部';input.value='here';form.onsubmit({preventDefault(){},submitter});state.searchLanguage+'|'+state.q+'|'+state.dialect",c),'|here|北部');
}
assert.equal(vm.runInContext('searchScopeLabel()',c),'搜索范围：土话、客话、英语');
const buttons=vm.runInContext('languageSearchButtons()',c);
assert.equal((buttons.match(/type="submit" form="search-form"/g)||[]).length,3);
assert.equal((buttons.match(/<svg /g)||[]).length,3);
assert(!buttons.includes('aria-pressed'));
assert(buttons.includes('只逻土话')&&buttons.includes('只逻客话')&&buttons.includes('只逻英语'));
console.log('PASS: three independent submit actions search current input, with icons and no selection state');

assert.equal(score({forms:['óngqìsě'],en:"snivel (The source word 'snivel' is ambiguous; here the gloss is 鼻涕 ('nasal mucus; snot').)"},'here','en'),0);
