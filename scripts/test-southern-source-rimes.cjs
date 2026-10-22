const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../site');
const c=vm.createContext({console,document:{addEventListener(){}},localStorage:{getItem:()=>null},fetch:async f=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','editorial-notes.js','ui-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
const tian='stedt-cb523fc3dc',luxi='yubao-60824',chen='stedt-4fdbdbf516';
for(const [raw,accent,poj] of [
 ['ti33tei33tɨ33','dideidii','ti-tei-tii'],
 ['di33dei33dɨ33','ddiddeiddii','di-dei-dii'],
 ['si21ŋɨ21bie21','sìngìbbiè','sì-ngì-biè'],
 ['bɨ33','bbii','bii'],['bi33','bbi','bi'],
 ['tsi55','zī','cī'],['tshi35','cí','chí'],['dzi21','zzì','jì'],
 ['wei13','wěi','wěi'],['ji55','yī','yī'],
 ['ɨ13','iǐ','iǐ'],['ʔɨ21',"'iì","'iì"],['ħɨ55','hiī','hiī'],['ʕɨ55','hiī','hiī'],
 ['kɨ21','gì','kì'],['khɨ21','kì','khì'],['gɨ21','ggì','gì'],['ŋɨ21','ngì','ngì'],['xɨ21','hì','hì'],['ɣɨ21','hxì','ghì'],
 ['tɨe33','de','te'],['taɨ33','dau','tau'],['lɨ̃21','lèn','lèn']
]){const r=c.southernSpelling(raw,tian);assert.equal(r?.accent,accent,raw);assert.equal(r?.poj,poj,raw);}
assert.equal(c.southernSpelling('tɨ33',luxi).accent,'dei');assert.equal(c.southernSpelling('dɨ33',luxi).poj,'dei');
assert.equal(c.southernSpelling('tɨ33',chen).accent,'dii');assert.equal(c.southernSpelling('tɨ33',chen).poj,'tri');
assert.equal(c.southernSpelling('si33',luxi).poj,'sri');assert.equal(c.southernSpelling('si33',chen).poj,'sri');
assert.equal(c.southernSpelling('ŋɨ33',luxi).accent,'ngii');assert.equal(c.southernSpelling('ŋɨ33',chen).poj,'ngri');
assert.equal(c.convertNotation('tɨ33','stedt-cb523fc3dc:south').rows[0].poj,'tii');
assert.equal(c.convertNotation('ŋɨ33','stedt-cb523fc3dc:south').rows[0].accent,'ngi');
assert.equal(c.surveyWordCorrection('other','60824','0363'),null);assert.equal(c.surveyWordCorrection('ɕi35di55','60757','0363'),null);
(async()=>{
 const data={words:[],wordAliases:{},sources:[],corpus:[]};await c.loadYubao(data);
 const expected=[['0363','ɕi55ti35','xīdí','sī-tí'],['0435','tia21','dià','tià'],['1287','xuei33dzẽ33','hueizzen','huei-jen'],['0502','li21tɕi21pa35','lìjìbá','lì-cì-pá'],['0751','li33ɣɨ35','lihxí','li-ghí'],['2168','li21tɕi21','lìjì','lì-cì']];
 for(const [serial,raw,accent,poj] of expected){
  const id=luxi+'-v-'+serial,w=data.words.find(w=>w.attestations.some(a=>a.id===id));assert(w,id);
  const a=w.attestations.find(a=>a.id===id);assert.equal(a.correctedTerm,raw);assert.notEqual(a.term,raw);
  assert.equal(w.notations.ipa[0].text,c.surveyIPA(raw,'60824'));
  const v=c.southernNotationValues(w)[0];assert.equal(v.accent,accent,id);assert.equal(v.poj,poj,id);
  const note=c.editorialNotesFor(w).find(n=>n.id==='luxi-transcription-'+serial);assert(note,id);
  c.noteText=note.text;assert(vm.runInContext('UI_TRANSLATIONS[noteText]',c),id+' missing English note');
 }
 assert.equal(data.words.flatMap(w=>w.attestations).filter(a=>a.correctedTerm).length,6);
 const you=data.words.find(w=>w.id===luxi+'-v-1130');assert.equal(you.attestations[0].term,'ni33');assert(!you.attestations[0].correctedTerm);
 console.log('PASS: source-specific rimes, Tian matching romanizations, Luxi six corrections, original forms, notes and unchanged ni.');
})().catch(e=>{console.error(e);process.exit(1)});
