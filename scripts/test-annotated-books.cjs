'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path'),root=path.resolve(__dirname,'../site');
const ctx=vm.createContext({window:{},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))}),E:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),normalizeIPA:s=>s});
vm.runInContext(fs.readFileSync(path.join(root,'longshan-texts.js'),'utf8'),ctx);
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.match(/function corpusCollectionKey\(c\)\{[^}]+\}/)[0],ctx);
(async()=>{
 const data={corpus:[],sources:[]};await ctx.loadLongshanTexts(data);
 const record=data.corpus.find(c=>c.id==='xu-tujia-annotated-2-1-excerpt');
 assert.ok(record);assert.equal(ctx.corpusCollectionKey(record),'xu-tujia-annotated-texts');
 assert.equal(ctx.corpusCollectionKey(data.corpus.find(c=>c.source==='tlp-longshan')),'tlp-longshan');
 assert.equal(record.blocks.length,19);assert.ok(data.sources.find(s=>s.id===record.source));
 assert.ok(record.blocks.every(b=>b.ipa&&b.originalIpa&&b.zh&&b.glosses.every(g=>g.ipa&&g.zh)));
 const html=ctx.longshanTextDetail(record);
 for(const piece of ['土家语语法标注文本','节选','ɣɨ³⁵','INJ','以前土家族人得了一场病'])assert.ok(html.includes(piece),piece);
 assert.ok(!html.includes('Tujia Language Project'));
 await ctx.loadLongshanTexts(data);assert.equal(data.corpus.filter(c=>c.id===record.id).length,1);
 console.log('PASS: annotated book provenance, grouping, alignment, IPA, rendering and deduplication');
})().catch(e=>{console.error(e);process.exitCode=1});
