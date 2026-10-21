const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}}});
for(const f of ['notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const run=s=>vm.runInContext(s,ctx);
run(`const E=s=>String(s);let state={view:'words',dialect:''};`);
assert.equal(run('spellingDisplay'),'accent');assert.equal(run('southernDisplay'),'accent');
assert.equal(ctx.southernSpelling('bã33','yubao-60824').accent,'bban');
assert.equal(ctx.southernSpelling('bã33','yubao-60824').poj,'ban');
assert.equal(ctx.southernSpelling('tɕyã33','yubao-60824').accent,'jüan');
assert.equal(ctx.southernSpelling('tɕyã33','yubao-60824').poj,'cüan');
assert.equal(ctx.southernSpelling('lɨ̃²¹ lɨ̃²¹','stedt-cb523fc3dc').accent,'lèn-lèn');
assert.equal(ctx.southernSpelling('nau55sui21','yubao-60824').accent,'nāu-suèi');
assert.equal(ctx.southernSpelling('ɣɨe³⁵','stedt-cb523fc3dc').accent,'ghé');
assert.equal(ctx.southernSpelling('dʑiaɨ³³','stedt-cb523fc3dc').accent,'jjiau');
assert.equal(ctx.southernSpelling('dʑiau33','yubao-60824').accent,'jjiau');
assert.equal(ctx.southernSpelling('ka33','yubao-60824',true).accent,'ga̱');
for(const raw of ['ma221','ma31','pæ̃33','broken','ka33xyz','ka'])assert.equal(ctx.southernSpelling(raw,'yubao-60824'),null,raw);
assert.equal(ctx.yeToAccent('axngair'),"āngǎi");
assert.equal(ctx.northernSurveySpelling('pa33','60823').accent,'ba');
assert.equal(ctx.northernSurveySpelling('pa31','60823').accent,'bǎ');
assert.match(ctx.spellingSelector(),/叶式拼音/);assert.match(ctx.spellingSelector(),/白话字拼音/);
run("state.dialect='南部'");assert.doesNotMatch(ctx.spellingSelector(),/叶式拼音/);
const w={dialect:'南部',attestations:[{id:'example',dialect:'南部',source:'yubao-60824',term:'bã33'}]};
assert.equal(ctx.notationHead(w),'bban');run("southernDisplay='poj'");assert.equal(ctx.notationHead(w),'ban');
assert.equal(ctx.convertNotation('bã33','yubao-60824').rows[0].accent,'bban');
for(const [raw,pinyin,poj] of [['tsi55','zī','crī'],['tshi35','cí','chrí'],['dzi21','zzì','dzrì'],['si33','si','sri'],['zi13','rǐ','zrǐ'],['ɨ13','rǐ','rǐ'],['tɕi55','jī','cī'],['tɕhi35','qí','chí'],['ɕi21','xì','sì'],['ɕy35','xǘ','sǘ'],['sie55','siē','siē'],['sĩ33','sin','sin'],['sʉ33','seu','seu']]){const result=ctx.southernSpelling(raw,'yubao-60824');assert.equal(result.accent,pinyin,raw);assert.equal(result.poj,poj,raw)}
assert.equal(ctx.southernSpelling('si35si21','yubao-60824').poj,'srí-srì');
// Alveolo-palatal c/ch/s and dental c/ch/s share letters, with ri reserved for dental apical i.
for(const [ipa,poj] of [['tsi55','crī'],['tɕi55','cī'],['tshi35','chrí'],['tɕhi35','chí'],['si21','srì'],['ɕi21','sì']])assert.equal(ctx.southernSpelling(ipa,'yubao-60824').poj,poj);
const stats={};const rows=[];
for(const w of JSON.parse(fs.readFileSync(path.join(root,'dictionary.json'))).words)for(const a of w.attestations||[])if(a.dialect==='南部')rows.push(a);
for(const f of fs.readdirSync(root).filter(f=>/^yubao-60824-.*json$/.test(f)))for(const w of JSON.parse(fs.readFileSync(path.join(root,f))).words)rows.push({source:'yubao-60824',term:w[2]});
for(const a of rows){stats[a.source]??={converted:0,ipa:0};stats[a.source][ctx.southernSpelling(a.term,a.source)?'converted':'ipa']++}
console.log('PASS: spelling, source normalization, unknown fallback, independent selectors, Northern regression');console.log(stats);
