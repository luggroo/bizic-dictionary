// Compare catalogue summaries and individually loaded texts with the published corpus.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const read=name=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
const full=read('corpus').corpus,index=read('corpus-index').corpus,search=read('corpus-search').texts;
const ctx=vm.createContext({window:{addEventListener(){}},document:{addEventListener(){}}});
for(const name of ['ui-translations.js','content-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,name),'utf8'),ctx);
const translations=vm.runInContext('UI_TRANSLATIONS',ctx);
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("window.addEventListener('popstate'")),ctx);
const normalizeSearch=vm.runInContext('searchNormalize',ctx);
assert.equal(index.length,full.length);
for(let i=0;i<full.length;i++){
 const a=full[i],b=index[i];assert.equal(b.id,a.id);
 assert.deepEqual(read('corpus-entries/'+a.id),a,a.id+' original text, metadata, audio and glosses');
 assert.equal(b._corpusEntry,a.id);assert.equal(b.text,'');assert(!b.blocks);
 for(const [key,value]of Object.entries(b))if(!key.startsWith('_')&&key!=='text')assert.deepEqual(value,a[key],a.id+' '+key);
 const haystack=c=>[c.title,c._titleEnglish??translations[c.title]??'',c._searchText??c.text,...(c.locations||[]),...(c.people||[])].join(' ');
 assert.equal(normalizeSearch(haystack(a)),normalizeSearch(haystack({...b,_searchText:search[b.id]})),a.id+' complete Chinese, English, IPA and location search text');
}
assert(fs.statSync(path.join(root,'prepared/corpus-index.json.gz')).size<fs.statSync(path.join(root,'prepared/corpus.json.gz')).size/4,'the catalogue does not carry all transcripts');
console.log('PASS: '+full.length+' corpus summaries, all standalone source records, complete search text and English title aliases.');
