const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const root=path.resolve(__dirname,'../site');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.GRAMMAR_TEST_CHROMIUM||undefined,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.setContent('<main></main>');
  await page.addScriptTag({content:`const DIALECT_GRAMMARS={north:[],south:[]},GR_BLOCKS={north:{},south:{}};function grammarBlocks(d){return GR_BLOCKS[d]}let state={grammarDialect:'north',chapter:'101',q:''};const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');function grammarView(){} function grammarChapter(){} function pageHeader(){return ''} function grammarSwitch(){return ''} function search(){return ''} function contains(a,b){return a.includes(b)}`});
  for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','grammar-notation.js','grammar-reviewed-data.js','grammar-glosses.js','grammar-reviewed.js'])await page.addScriptTag({path:path.join(root,f)});
  const audit=await page.evaluate(()=>{
   const failures=[],results=[],pending=new Set();
   for(const d of ['north','south'])for(const ch of REVIEWED_GRAMMAR[d]){
    try{
     const html=grammarRenderHTML(ch);document.querySelector('main').innerHTML=html;
     results.push({id:ch.id,pairs:document.querySelectorAll('.grammar-pair').length,examples:document.querySelectorAll('.grammar-interlinear').length});
     for(const n of document.querySelectorAll('.grammar-pair')){
      if(n.dataset.spellingPending){pending.add(n.dataset.ipa);continue;}
      const r=n.querySelector('.grammar-spelling');
      for(const k of n.dataset.dialect==='north'?['ye','accent']:['accent','poj'])if(!r.dataset[k]||/[□⟦⟧]/.test(r.dataset[k]))failures.push(ch.id+': missing '+k+' '+n.dataset.ipa);
     }
    }catch(e){failures.push(ch.id+': '+e.message)}
   }
   return {failures,results,pending:[...pending].sort()};
  });
  console.log(JSON.stringify(audit,null,2));assert.deepEqual(audit.failures,[]);assert.deepEqual(audit.pending,['iæ̃','yæ̃','æ̃'].sort());
  console.log('PASS: every reviewed chapter renders; all established IPA forms have both spelling modes; three previously unresolved southern rimes stay explicitly pending.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
