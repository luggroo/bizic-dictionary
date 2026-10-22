const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'../site');
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const ctx=vm.createContext({console,document:{addEventListener(){}},localStorage:{getItem:()=>null},fetch:async f=>({ok:true,json:async()=>read(f)})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
(async()=>{
 const data={wordAliases:{},words:[],sources:[],corpus:[]};await ctx.loadYubao(data);
 const attestations=new Map(data.words.flatMap(w=>w.attestations.map(a=>[a.id,a])));let count=0;
 for(const file of read('yubao-manifest.json')){const p=read(file);for(const [serial,zh,raw,annotation,alias] of p.words){
  const a=attestations.get('yubao-'+p.point+'-v-'+serial);assert(a);assert(a.en.trim());assert.equal(a.term,raw);assert.equal(a.zh,zh);assert.equal(a.notice,annotation);assert.equal(a.alt,alias);assert.equal(a.originalEn,'');assert.equal(a.enTranslation.method,'editorial-translation');count++;
 }}
 assert.equal(count,10765);assert.equal(attestations.size,count);
 for(const w of data.words)for(const a of w.attestations)assert(w.glosses.includes(a.en),a.id+' missing aggregate English');
 const en=read('yubao-english.json');assert.notEqual(en.serialOverrides['0489'],en.serialOverrides['0806']);assert.notEqual(en.serialOverrides['0702'],en.serialOverrides['2951']);
 console.log('PASS: '+count+' survey attestations have English; original forms and prompts unchanged; distinct senses retained.');
})().catch(e=>{console.error(e);process.exit(1)});
