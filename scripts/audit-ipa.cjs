const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib');
const {execFileSync}=require('child_process');
const root=path.resolve(__dirname,'../site');
const reportPath=path.resolve(__dirname,'../research/unconverted-ipa.md');
const pendingReportPath=path.resolve(__dirname,'../research/pending-ipa.md');
const ctx=vm.createContext({console,window:{addEventListener(){}},localStorage:{getItem:()=>null},document:{addEventListener(){}},fetch:async name=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'))})});
for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','yubao.js','semantic-categories.js','word-merge-groups.js','word-merge.js','spelling-boundaries.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');vm.runInContext(app.slice(0,app.indexOf("document.addEventListener(")),ctx);
(async()=>{
 const data=JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'data.json.gz'))));
 // Reuse the publication step, including reviewed dialect/location changes.
 // Work in memory so the audit never modifies source datasets.
 const dictionary=execFileSync('python3',['-c',[
  'import gzip, json, pathlib, runpy, sys',
  'site = pathlib.Path(sys.argv[1])',
  "apply = runpy.run_path(sys.argv[2])['apply_reviews']",
  "data = json.loads(gzip.decompress((site / 'dictionary.json.gz').read_bytes()))",
  "reviews = json.loads((site / 'gloss-reviews.json').read_text())['entries']",
  'print(json.dumps(apply(data, reviews), ensure_ascii=False))'
 ].join('\n'),root,path.join(__dirname,'apply-gloss-reviews.py')],{encoding:'utf8',maxBuffer:64*1024*1024});
 Object.assign(data,JSON.parse(dictionary));
 await ctx.loadYubao(data);ctx.removeExcludedSource(data);ctx.data=data;vm.runInContext('D=data;S=Object.fromEntries(D.sources.map(s=>[s.id,s]));',ctx);
 ctx.mergeDictionaryWords(data);ctx.initializeSpellingBoundaries(data);ctx.initializeSemanticCategories(data.words);
 const counts={},unconverted=[],pending=[];
 for(const w of data.words){const place=ctx.wordVarietyInfo(w).label;counts[place]??={total:0,ipa:0,unconverted:0,partial:0};const c=counts[place];c.total++;if(!ctx.wordIPA(w).length){pending.push({id:w.id,place,head:ctx.notationHead(w),zh:w.zh||w.en,forms:(w.notations?.brassett||[]).map(v=>v.text)});continue}c.ipa++;
  if(!ctx.completeSpellings(w).length){c.unconverted++;const partialSpellings=[...new Set(ctx.visibleNotationValues(w).map(v=>v.text))],partial=partialSpellings.length>0;if(partial)c.partial++;unconverted.push({id:w.id,place,zh:w.zh||w.en,ipa:ctx.wordIPA(w),partial,partialSpellings,placeholder:ctx.wordIPA(w).every(text=>!/[\p{L}\p{N}]/u.test(text)),sources:w.sourceIds.map(id=>data.sources.find(s=>s.id===id)?.title||id)})}
 }
 const categoryCounts={},unmapped=new Set();for(const w of data.words){for(const c of ctx.wordSemanticCategories(w))categoryCounts[c]=(categoryCounts[c]||0)+1;for(const c of w.categories||[])if(c&&!vm.runInContext('SEMANTIC_LOOKUP',ctx).has(c))unmapped.add(c)}
 const order=['北部 · 龙山','北部 · 保靖阳朝','北部 · 保靖碗米坡','南部 · 泸溪潭溪','未标明'];
 const orderedCounts=Object.fromEntries([...order,...Object.keys(counts).filter(p=>!order.includes(p))].filter(p=>counts[p]).map(p=>[p,counts[p]]));
 const result={counts:orderedCounts,unconverted,pending,categoryCounts,unmapped:[...unmapped]};
 fs.writeFileSync('/tmp/ipa-audit.json',JSON.stringify(result,null,2));
 const report=markdown(result),pendingReport=pendingMarkdown(result);
 if(process.argv.includes('--write')){fs.writeFileSync(reportPath,report);fs.writeFileSync(pendingReportPath,pendingReport)}
 if(process.argv.includes('--check')&&fs.readFileSync(reportPath,'utf8')!==report)throw Error('Unconverted IPA list is stale; run node scripts/audit-ipa.cjs --write');
 if(process.argv.includes('--check')&&fs.readFileSync(pendingReportPath,'utf8')!==pendingReport)throw Error('Pending IPA list is stale; run node scripts/audit-ipa.cjs --write');
 console.log(JSON.stringify({counts:orderedCounts,unconverted:unconverted.length,pendingIPA:pending.length},null,2));
 const chosen=ctx.randomWordItems(data.words);if(chosen.length!==12)throw Error('Expected 12 discovery words');console.log('PASS: 12 discovery words');
})().catch(error=>{console.error(error);process.exitCode=1});

function pendingMarkdown({counts,pending}){
 const lines=['# IPA 待校核词条','',`当前词典中共有 **${pending.length} 条**因没有可显示的 IPA 而标为“IPA 待校核”。`,'',
 'Brassett 拼音按对应表转写：an → ɛn、ang → aŋ、ii → ɯ；yan → jɛn。介音和韵尾使用普通字母，送气写 ʰ。原文未标调的部分不加声调；|、｜、◦ 不参与转换。来源原文保留。','',
 '复现：`node scripts/audit-ipa.cjs --write`；检查清单：`node scripts/audit-ipa.cjs --check`。统计按网站应用释义审核并合并词条后的结果，不包括语料和历史比较表。','',
 '|语言点|词条总数|IPA 待校核|','|---|---:|---:|'];
 for(const [place,count]of Object.entries(counts))lines.push(`|${place}|${count.total}|${count.total-count.ipa}|`);
 if(pending.length){
  const cell=v=>String(v||'').replaceAll('|','\\|').replace(/\r?\n/g,' ');
  lines.push('','|词条 ID|语言点|显示拼写|释义|Brassett 记音|','|---|---|---|---|---|');
  for(const w of pending)lines.push('|'+[w.id,w.place,w.head,w.zh,[...new Set(w.forms)].join(' / ')].map(cell).join('|')+'|');
 }
 lines.push('','“有 IPA、尚无完整拼音”的词条另列于 [未转拼音的 IPA 词条清单](unconverted-ipa.md)。本表不将无调形式视为缺失 IPA。');
 return lines.join('\n')+'\n';
}

function markdown({counts,unconverted}){
 const lines=[
  '# 未转拼音的 IPA 词条清单','',
  '统计范围：当前词汇检索数据，先应用已审核的释义与调查点更正，再按网站现行规则拆分、合并词条；不包括历史比较表和语料句子。未转写指没有任何完整拼音，包含仅部分转写。有一个完整异读或合并后的完整词形，即不列入本清单。按网站语言点标签归组，不额外推断调查点。','',
  '复现：`node scripts/audit-ipa.cjs --write`；检查清单是否过期：`node scripts/audit-ipa.cjs --check`。采用网站默认拼音显示，不读取浏览器本机补充。','',
  '|语言点|词条总数|含 IPA|尚无完整拼音|其中部分转写|',
  '|---|---:|---:|---:|---:|'
 ];
 const total={total:0,ipa:0,unconverted:0,partial:0};
 for(const [place,c]of Object.entries(counts)){
  lines.push(`|${place}|${c.total}|${c.ipa}|${c.unconverted}|${c.partial}|`);
  for(const key of Object.keys(total))total[key]+=c[key];
 }
 lines.push(`|合计|${total.total}|${total.ipa}|${total.unconverted}|${total.partial}|`,'',
  '“含 IPA”沿用网站记音字段的判定，包含原记音仅为占位符 `·` 的条目；这类记录在下表单独标注。部分转写栏中的 `□` 表示尚未完成映射的片段。');
 const cell=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('|','\\|').replace(/\r?\n/g,' ');
 for(const place of Object.keys(counts)){
  const rows=unconverted.filter(w=>w.place===place);
  lines.push('',`## ${place}（${rows.length} 条）`,'');
  if(!rows.length){lines.push('无。');continue;}
  lines.push('|词条 ID|汉义／原释义|原记音|转写状态|已有部分拼音|来源|','|---|---|---|---|---|---|');
  for(const w of rows)lines.push('|'+[w.id,w.zh,w.ipa.join(' / '),w.placeholder?'原记音仅占位符':w.partial?'部分转写':'未转写',w.partialSpellings.join(' / ')||'—',w.sources.join('；')].map(cell).join('|')+'|');
 }
 return lines.join('\n')+'\n';
}
