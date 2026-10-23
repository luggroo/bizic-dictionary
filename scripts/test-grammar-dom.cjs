// Reuse the reviewed-grammar assertions in a DOM runtime, without requiring a browser binary.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom'),root=path.resolve(__dirname,'../site');
const source=fs.readFileSync(path.join(__dirname,'test-reviewed-grammar.cjs'),'utf8');
const setup=source.split('content:`')[1].split('`});')[0];
const files=source.split('for(const f of ')[1].split(')await page.addScriptTag')[0];
const audit=source.split('const audit=await page.evaluate(()=>{')[1].split('\n  });\n  console.log')[0];
const dom=new JSDOM('<main></main>',{runScripts:'outside-only'}),ctx=dom.getInternalVMContext();
vm.runInContext(setup,ctx);
for(const f of JSON.parse(files.replaceAll("'",'"')))vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const result=vm.runInContext('(()=>{'+audit+'})()',ctx);
assert.equal(result.failures.length,0,JSON.stringify(result.failures));
assert.equal(JSON.stringify(result.pending),JSON.stringify(['iæ̃','yæ̃','æ̃'].sort()));
console.log('PASS: '+result.results.length+' reviewed chapters; '+result.results.reduce((n,r)=>n+r.pairs,0)+' IPA pairs; bilingual glosses, citations, source links and spelling modes.');dom.window.close();
