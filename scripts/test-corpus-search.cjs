// Unit and prepared-index regressions for corpus search.
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const context=vm.createContext({});
vm.runInContext(app.slice(0,app.indexOf('const DEFAULT_STATE'))+fs.readFileSync(path.join(root,'corpus-search.js'),'utf8'),context);
const fold=context.corpusSearchRanges;
assert.equal(fold('rè ré re','re').length,3);
assert.equal(fold('bízīkǎ niě','bizika')[0].start,0);
assert.equal(fold('bízīkǎ niě','bizika')[0].end,6);
assert.equal(fold('a\u0301b a\u0301b','ab').length,2);
assert.equal(fold('Alpha \n Beta','alpha beta').length,1);
assert.equal(fold('双数双数','双数').length,2);
assert.equal(fold('abcdef','').length,0);
const text=context.corpusSearchText({blocks:[{ipa:'suã⁵⁵',ye:'Suanx dix',zh:'双数',en:'even number',glosses:[{zh:'双'}]}],culturalNote:'口彩'});
for(const s of ['suã⁵⁵','Suanx dix','双数','even number','口彩'])assert(text.includes(s),s);
const snippet=context.corpusSearchSnippet({_searchText:'one <script> then ré and more'},'re');
assert(snippet.includes('<mark>ré</mark>'));
assert(!snippet.includes('<script>'));
const prepared=path.join(root,'prepared/corpus-search.json.gz');
if(fs.existsSync(prepared)){
 const index=JSON.parse(zlib.gunzipSync(fs.readFileSync(prepared)));
 assert(index.texts['tlp-longshan-euphemisms-01'].includes('Suanx dix'));
 assert(index.texts['tlp-longshan-euphemisms-01'].includes('双数'));
 assert(Object.keys(index.texts).length>=400);
}
console.log('PASS: corpus search offsets, tones, source coverage and safe excerpts');
