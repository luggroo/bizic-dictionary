const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),zlib=require('node:zlib');
const root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({console,localStorage:{getItem:()=>null},document:{addEventListener(){}}});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const run=s=>vm.runInContext(s,ctx);
run(`const E=s=>String(s);let state={view:'words',dialect:''};`);
assert.equal(run('spellingDisplay'),'accent');assert.equal(run('southernDisplay'),'accent');
assert.equal(ctx.southernSpelling('bã33','yubao-60824').accent,'bban');
assert.equal(ctx.southernSpelling('bã33','yubao-60824').poj,'ban');
assert.equal(ctx.southernSpelling('tɕyã33','yubao-60824').accent,'jüan');
assert.equal(ctx.southernSpelling('tɕyã33','yubao-60824').poj,'cüan');
assert.equal(ctx.southernSpelling('lɨ̃²¹ lɨ̃²¹','stedt-cb523fc3dc').accent,'lènlèn');
assert.equal(ctx.southernSpelling('nau55sui21','yubao-60824').accent,'nāusuèi');
assert.equal(ctx.southernSpelling('ɣɨe³⁵','stedt-cb523fc3dc').accent,'hxé');
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
for(const [raw,pinyin,poj] of [['tsi55','zrı̄','crı̄'],['tshi35','crı́','chrı́'],['dzi21','zzrı̀','jrı̀'],['si33','srı','srı'],['zi13','rı̌','rı̌'],['ɨ13','ıǐ','ıǐ'],['tɕi55','jī','cī'],['tɕhi35','qí','chí'],['ɕi21','xì','sì'],['ɕy35','xǘ','sǘ'],['sie55','siē','siē'],['sĩ33','sin','sin'],['sʉ33','seu','seu']]){const result=ctx.southernSpelling(raw,'yubao-60824');assert.equal(result.accent,pinyin,raw);assert.equal(result.poj,poj,raw)}
assert.equal(ctx.southernSpelling('si35si21','yubao-60824').poj,'srı́-srı̀');
// Alveolo-palatal c/ch/s and dental c/ch/s share letters, with rı reserved for dental apical i.
for(const [ipa,poj] of [['tsi55','crı̄'],['tɕi55','cī'],['tshi35','chrı́'],['tɕhi35','chí'],['si21','srı̀'],['ɕi21','sì']])assert.equal(ctx.southernSpelling(ipa,'yubao-60824').poj,poj);
for(const [raw,accent,poj] of [['ɕiã33ku33',"xian'gu",'sian-ku'],['tsha33mẽ33a33lo35',"camen'aló",'cha-men-a-ló'],['ma21tɕi35a33ni35',"màjí'aní",'mà-cí-a-ní'],['no35do21','nóddò','nó-dò'],['tɕĩ33y21',"jin'ǜ",'cin-ǜ']]){const v=ctx.southernSpelling(raw,'yubao-60824');assert.equal(v.accent,accent);assert.equal(v.poj,poj)}
const stats={};const rows=[];
for(const w of JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'dictionary.json.gz')))).words)for(const a of w.attestations||[])if(a.dialect==='南部')rows.push(a);
for(const f of fs.readdirSync(root).filter(f=>/^yubao-60824-.*json$/.test(f)))for(const w of JSON.parse(fs.readFileSync(path.join(root,f))).words)rows.push({source:'yubao-60824',term:w[2]});
for(const a of rows){stats[a.source]??={converted:0,ipa:0};stats[a.source][ctx.southernSpelling(a.term,a.source)?'converted':'ipa']++}
console.log('PASS: spelling, source normalization, unknown fallback, independent selectors, Northern regression');console.log(stats);

for(const [ipa,poj] of [['xo33zi33','ho-rı'],['dzi33','jrı'],['dʑi33','ji'],['dza33','ja'],['za33','ra'],['zɨ33','rıi'],['d͡zi33','jrı'],['ʣi33','jrı']])assert.equal(ctx.southernSpelling(ipa,'yubao-60824').poj,poj,ipa);
console.log('PASS: dz→j, z→r, apical rı contraction and affricate notation variants');

for(const [ipa,poj] of [['je33','ie'],['ji55','ī'],['ja35','iá'],['jy55','ǖ'],['jye35','üé'],['wa33','ua'],['wu55','ū'],['wei35','uéi'],['wo21','uò'],['ʑe33','ye']])assert.equal(ctx.southernSpelling(ipa,'yubao-60824').poj,poj,ipa);
console.log('PASS: vowel-initial glide spelling, no duplicate i/u, rounded front vowel, fricative distinction');

assert.equal(ctx.southernSpelling('ɣɨe³⁵','stedt-cb523fc3dc').poj,'ghé');

for(const raw of ['ħa33','ʕa33','h̄a33','ẖa33','xa33']){assert.equal(ctx.southernSpelling(raw,'stedt-cb523fc3dc').accent,'ha');assert.equal(ctx.southernSpelling(raw,'stedt-cb523fc3dc').poj,'ha');}

// Whole-word regressions: palatal medials, the reported fish-fry form, and ıi boundaries.
for(const [raw,accent,poj] of [
 ['si21ŋɨ21bie21','srı̀ngıìbbiè','srı̀-ngıì-biè'],
 ['dʑe55','jjiē','jē'],['tɕʰe35','qié','ché'],['ɕẽ33','xien','sen'],
 ['dʑua13','jjiuǎ','juǎ'],['tɕɨ21','jıì','cıì'],['dɨ55','ddēi','dēi'],
 ['ma33ɨ21',"ma'ıì",'ma-ıì'],['zi33','rı','rı'],['zɨ33','rıi','rıi'],
 ['ɣe35','hxé','ghé'],['kɨ21','gì','kì']
]){const value=ctx.southernSpelling(raw,'yubao-60824');assert.equal(value.accent,accent,raw);assert.equal(value.poj,poj,raw)}
assert.equal(ctx.southernSpelling('ŋɨ33','yubao-60824',true).accent,'ngıi̱');
assert.equal(ctx.southernSpelling('ɨ?','yubao-60824').accent,'ıi⁇');
const fish={dialect:'南部',attestations:[{id:'fish-fry',dialect:'南部',source:'yubao-60824',term:'si21ŋɨ21bie21'}]};
run("southernDisplay='accent'");assert.equal(ctx.notationHead(fish),'srı̀ngıìbbiè');
run("southernDisplay='poj'");assert.equal(ctx.notationHead(fish),'srı̀-ngıì-biè');
assert.equal(ctx.convertNotation('si21ŋɨ21bie21','yubao-60824').rows[0].accent,'srı̀ngıìbbiè');
assert.equal(ctx.southernRimeRows().find(row=>row[0]==='ɨ').slice(1).join('/'),'ıi/ıi');
for(const [raw,point,accent] of [
 ['tɕa55','60756','jiā'],['tɕʰau33','60756','qiǎo'],['ɕɔŋ33','60756','xiǒng'],
 ['tɕʰɘ55','60757','qiē'],['tɕo31','60823','jiǒ'],['ɕũ55','60823','xiōng']
])assert.equal(ctx.northernSurveySpelling(raw,point).accent,accent,raw);
assert.equal(ctx.yeToAccent('loxqunr'),'lōqiǔn');
assert.equal(ctx.yeToAccent('hxex'),'hxē');
// Check each parsed source syllable, avoiding false matches on hx or tone-letter x.
for(const a of rows)for(const match of ctx.southNormalize(a.term,a.source).matchAll(/([^0-9\s~～|｜/／,，;；()（）\[\]⁇?]+)([0-9]+|\?)/g)){
 const value=ctx.southernSpelling(match[0],a.source);if(!value)continue;
 const plain=value.accent.normalize('NFD').replace(/[\u0300\u0301\u0304\u030c\u0331]/g,'').normalize('NFC');
 assert(!/^(?:jj|[jqx])[aeouê]/.test(plain),a.source+' '+match[0]+' → '+value.accent);
}
console.log('PASS: palatal medials across Southern records and Northern survey points; ıi/rı separation, tone marks, boundaries and display modes');

// Initial /j/ already represents the glide in /jiʉ, jiɯ/.
for(const raw of ['jiʉ35','jiɯ35']){
 const v=ctx.southernSpelling(raw,'yubao-60824');
 assert.equal(v.accent,'yéu');assert.equal(v.poj,'iéu');
}
assert.equal(ctx.southernSpelling('phẽ33jiʉ33','yubao-60824').accent,'penyeu');
assert.equal(ctx.southernSpelling('dʑiʉ33','yubao-60824').accent,'jjieu');

assert.equal(ctx.southernSpelling('zi13ɨ13','yubao-60824').poj,'rı̌-ıǐ');

// Dotless ıi is a whole rime, separate from front i and the apical rı.
for(const [raw,expected] of [['tsɨ55','cıī'],['tsʰɨ35','chıí'],['sɨ21','sıì'],['tɕi55','cī'],['tɕʰi35','chí'],['ɕi21','sì'],['tsi21','crı̀']]){
 assert.equal(ctx.southernSpelling(raw,'yubao-60824').poj,expected,raw);
}
for(const [tone,form] of [['55','ıī'],['33','ıi'],['35','ıí'],['21','ıì'],['13','ıǐ']]){
 assert.equal(ctx.southernSpelling('ɨ'+tone,'yubao-60824').poj,form);
}
assert.equal(ctx.southernSpelling('jɨ21','yubao-60824').poj,'ıì');
assert.equal(ctx.southernSpelling('ma33ɨ21','yubao-60824').accent,"ma'ıì");
console.log('PASS: dotless rime contrasts, all tones, glide spelling and vowel boundaries');

for(const [tone,form] of [['55','crı̄'],['33','crı'],['35','crı́'],['21','crı̀'],['13','crı̌']]){
 const v=ctx.southernSpelling('tsi'+tone,'yubao-60824');
 assert.equal(v.poj,form);assert(!v.poj.includes('i'));
 assert.equal(ctx.southernSpelling('tsɿ'+tone,'yubao-60824').poj,form);
}
assert.equal(ctx.southernSpelling('zi13','yubao-60824').accent,'rı̌');
assert.equal(ctx.southernSpelling('tsi21','yubao-60824').accent,'zrı̀');

// Written y absorbs medial i before another vowel, including nasalized rimes.
const withoutTone=s=>s.normalize('NFD').replace(/[\u0300\u0301\u0304\u030c\u0331]/g,'').normalize('NFC');
for(const [raw,accent,poj] of [
 ['jia35','yá','iá'],['jie35','yé','ié'],['jio55','yō','iō'],
 ['jiau55','yāu','iāu'],['jiã21','yàn','iàn'],['jiõ13','yǒn','iǒn'],
 ['jiɯ35','yéu','iéu'],['jiʉ35','yéu','iéu'],
 ['ʑio55','yō','yō'],['ʑiau55','yāu','yāu'],
 ['ji35','yí','í'],['jĩ55','yīn','īn'],['jɨ21','yıì','ıì'],
 ['ji35a21',"yí'à",'í-à']
]){
 const value=ctx.southernSpelling(raw,'yubao-60824');
 assert.equal(value.accent,accent,raw);assert.equal(value.poj,poj,raw);
}
const youngWomanRaw='si³³la²¹dʑi⁵⁵ʔa¹³jio⁵⁵be²¹';
assert.equal(ctx.southernSpelling(youngWomanRaw,'stedt-cb523fc3dc').accent,"silàjjī'ǎyōbbè");
const youngWoman={dialect:'南部',attestations:[{id:'young-woman',dialect:'南部',source:'stedt-cb523fc3dc',term:youngWomanRaw}]};
run("southernDisplay='accent'");assert.equal(ctx.notationHead(youngWoman),"silàjjī'ǎyōbbè");
assert.equal(ctx.convertNotation(youngWomanRaw,'stedt-cb523fc3dc:south').rows[0].accent,"silàjjī'ǎyōbbè");
// Cover every supported rime and tone as well as all loaded Southern records.
for(const source of ['stedt-cb523fc3dc','stedt-4fdbdbf516','yubao-60824']){
 for(const onset of ['j','ʑ'])for(const rime of run('Object.keys(SOUTH_RIMES)'))for(const tone of ['55','33','35','21','13']){
  const raw=onset+rime+tone,value=ctx.southernSpelling(raw,source);assert(value,raw);
  for(const form of Object.values(value))assert(!/yi[aeiouüêı]/.test(withoutTone(form)),source+' '+raw+' → '+form);
 }
}
for(const a of rows){
 const value=ctx.southernSpelling(a.term,a.source);if(!value)continue;
 for(const form of Object.values(value))assert(!/yi[aeiouüêı]/.test(withoutTone(form)),a.source+' '+a.term+' → '+form);
}
const translations=vm.runInNewContext(fs.readFileSync(path.join(root,'ui-translations.js'),'utf8')+';UI_TRANSLATIONS');
assert(translations[run('SOUTH_PINYIN_RULES')].includes('yio → yo'));
console.log('PASS: y + medial i across all rimes, tones, sources, '+rows.length+' Southern records, display and conversion; yi/yin and syllable boundaries preserved');
assert.equal(ctx.northernSurveySpelling('ʑia55phiã33','60823').accent,'yāpian');
assert.equal(ctx.northernSurveySpelling('sɿ33sɿ33ui55ʑia33','60823').accent,"sisi'uīya");
assert.equal(ctx.northernSurveySpelling('ʑia55phiã33','60823').ye,'yaxpianr');
for(const [core,expected] of [['yia','ya'],['yio','yo'],['yier','yer'],['yiu','you'],['yi','yi'],['yin','yin'],['yu','yu']]){
 assert.equal(ctx.northernYCore(core),expected);assert.equal(ctx.normalizeYInitialSyllable(core),expected);
}
