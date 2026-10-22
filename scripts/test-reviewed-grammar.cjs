const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const root=path.resolve(__dirname,'../site');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.GRAMMAR_TEST_CHROMIUM||undefined,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.setContent('<main></main>');
  await page.addScriptTag({content:`const DIALECT_GRAMMARS={north:[],south:[]},GR_BLOCKS={north:{},south:{}};function grammarBlocks(d){return GR_BLOCKS[d]}let state={grammarDialect:'north',chapter:'101',q:''};const E=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');function grammarView(){} function grammarChapter(){} function pageHeader(){return ''} function grammarSwitch(){return ''} function search(){return ''} function contains(a,b){return a.includes(b)}`});
  for(const f of ['ipa-normalize.js','notation-profiles.js','notation-ui.js','southern-notation.js','grammar-notation.js','grammar-reviewed-data.js','grammar-glosses.js','ui-translations.js','content-translations.js','grammar-reviewed-i18n.js','grammar-reviewed.js'])await page.addScriptTag({path:path.join(root,f)});
  const audit=await page.evaluate(()=>{
   const failures=[],results=[],pending=new Set();
   for(const d of ['north','south'])for(const ch of REVIEWED_GRAMMAR[d]){
    try{
     for(const title of [ch.title,...ch.sections.map(s=>s.title)])if(!UI_TRANSLATIONS[title])failures.push(ch.id+': untranslated navigation title '+title);
     const html=grammarRenderHTML(ch);document.querySelector('main').innerHTML=html;
     const zhIPA=[...document.querySelectorAll('.grammar-pair')].flatMap(n=>n.dataset.ipa.split(/[、,]\s*/)).sort();
     const zhRefs=[...document.querySelectorAll('.grammar-citation')].map(n=>[n.textContent,n.dataset.footnoteTarget]);
     const english=document.createElement('div');english.innerHTML=grammarRenderHTML(ch,'en');
     const enIPA=[...english.querySelectorAll('.grammar-pair')].flatMap(n=>n.dataset.ipa.split(/[、,]\s*/)).sort();
     if(JSON.stringify(zhIPA)!==JSON.stringify(enIPA))failures.push(ch.id+': IPA changes in English: '+JSON.stringify({zh:zhIPA.filter((x,i)=>zhIPA.indexOf(x)===i&&zhIPA.filter(y=>y===x).length!==enIPA.filter(y=>y===x).length),en:enIPA.filter((x,i)=>enIPA.indexOf(x)===i&&zhIPA.filter(y=>y===x).length!==enIPA.filter(y=>y===x).length),counts:[zhIPA.length,enIPA.length]}));
     if(JSON.stringify(zhRefs)!==JSON.stringify([...english.querySelectorAll('.grammar-citation')].map(n=>[n.textContent,n.dataset.footnoteTarget])))failures.push(ch.id+': citation numbering changes with language');
     const walker=document.createTreeWalker(english,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode()))if(!n.parentElement.closest('[data-spelling-pending]')&&/\p{Script=Han}/u.test(n.nodeValue))failures.push(ch.id+': untranslated '+n.nodeValue);
     for(const rendered of [document.querySelector('main'),english]){const words=document.createTreeWalker(rendered,NodeFilter.SHOW_TEXT);let word;while((word=words.nextNode()))if(!word.parentElement.closest('.grammar-pair')&&/[\p{Script=Latin}\p{M}ʰ]+[¹²³⁴⁵]+/u.test(word.nodeValue))failures.push(ch.id+': IPA without romanization '+word.nodeValue);}
     for(const a of english.querySelectorAll('.grammar-citation')){if(!/^\[\d+\]$/.test(a.textContent)||!a.title||/\p{Script=Han}/u.test(a.title)||!english.querySelector('#'+a.dataset.footnoteTarget))failures.push(ch.id+': invalid reference '+a.outerHTML);}
     if(ch.id==='101'&&(![...english.querySelectorAll('.grammar-ipa')].some(n=>n.textContent==='/p/')||![...english.querySelectorAll('.grammar-ipa')].some(n=>n.textContent==='[b]')))failures.push('IPA slashes/brackets missing');
     if(ch.id==='104'){
      const overview=[...document.querySelectorAll('table')].find(t=>t.querySelectorAll('th')[1]?.textContent==='形式或组合');
      const forms=[...overview.querySelectorAll('tbody tr')].map(r=>r.cells[1]);
      for(const cell of forms){const w=document.createTreeWalker(cell,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))if(!n.parentElement.closest('.grammar-pair')&&/\/[^/]+\//.test(n.nodeValue))failures.push('Overview: unpaired IPA '+n.nodeValue);}
      for(const ipa of ['la','tɕi','xu','tuɔ','ɕi','tsʰi','ɲie ɕi','ma'])if(!forms.some(c=>[...c.querySelectorAll('.grammar-pair')].some(p=>p.dataset.ipa===ipa&&!/[¹²³⁴⁵xfrv]$/.test(p.querySelector('.grammar-spelling').dataset.ye))))failures.push('Overview: variable-tone affix not displayed without tone: '+ipa);
      for(const [ipa,ye] of [['ɕie²⁴','xief'],['ɕiau²⁴','xiaof'],['ɜ̃²¹tsɿ²¹','enrzir'],['ɜ̃²¹tsou²⁴','enrzouf'],['tʰai²⁴','taif'],['tʰau²⁴','taof']])if(!forms.some(c=>[...c.querySelectorAll('.grammar-pair')].some(p=>p.dataset.ipa===ipa&&p.querySelector('.grammar-spelling').dataset.ye===ye)))failures.push('Overview: irregular word missing its tone: '+ipa);
     }
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
  console.log('PASS: every reviewed chapter renders; all established IPA forms have both spelling modes; English prose and glosses are complete; phonetic forms and citation numbers survive language switching; IPA delimiters are preserved.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
