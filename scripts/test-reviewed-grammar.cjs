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
   for(const [ipa,explicit,ye,accent] of [
    ['ɲie ɕi','','niexi','niexi'],
    ['ɲie²¹ ɕi²⁴','nierxif','nierxif','niěxí'],
    ['ɲie⁵⁵ɕi⁵⁵','niexxix','niexxix','niēxī'],
    ['pʰu-{nie／ɕi／nie-ɕi}]','pu-{nie／xi／nie-xi}]','pu-{nie／xi／nie-xi}]','pu-{nie／xi／nie-xi}]'],
    ['tsi²¹ ka³⁵ tsʰi⁵⁵','','zir gaf-cix','zǐ gá-cī'],
    ['sa⁵⁵ ɕi²¹ ke⁵⁵','','sax-xir gex','sā-xǐ gē'],
    ['ka³⁵ tso⁵⁵','','gaf-zox','gá-zō'],
    ['ka³⁵ ɲie⁵⁵ (ɕi²¹)','','gaf-niex(xir)','gá-niē(xǐ)'],
    ['ɕi³³ ti²¹','','xir dir','xǐ dǐ']
   ]){const pair=grammarSpelling(ipa,'north',explicit);if(pair.ye!==ye||pair.accent!==accent)failures.push('Nominalizer spelling: '+JSON.stringify({ipa,expected:{ye,accent},actual:pair}));}
   for(const d of ['north','south'])for(const ch of REVIEWED_GRAMMAR[d]){
    try{
     for(const title of [ch.title,...ch.sections.map(s=>s.title)])if(!UI_TRANSLATIONS[title])failures.push(ch.id+': untranslated navigation title '+title);
     const html=grammarRenderHTML(ch);document.querySelector('main').innerHTML=html;
     const zhIPA=[...document.querySelectorAll('.grammar-pair')].flatMap(n=>n.dataset.ipa.split(/[、,]\s*/)).sort();
     const zhRefs=[...document.querySelectorAll('.grammar-citation')].map(n=>[n.textContent,n.dataset.footnoteTarget]);
     const english=document.createElement('div');english.innerHTML=grammarRenderHTML(ch,'en');
     if(ch.id==='103'){
      if(!english.textContent.includes('Both orders are acceptable:'))failures.push('English are was converted to Tujia spelling');
      const sound=[...english.querySelectorAll('.grammar-pair')].filter(p=>p.dataset.ipa==='aze');
      if(sound.length!==2||sound.some(p=>p.querySelector('.grammar-spelling').dataset.ye!=='are'))failures.push('Unmarked sound examples lost their spelling');
     }
     const original=document.createElement('div');original.innerHTML=ch.html;
     const sourceLinks=[...original.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>/^https?:/.test(h));
     for(const rendered of [document.querySelector('main'),english]){
      if([...rendered.querySelectorAll('p')].some(p=>!p.closest('.grammar-footnotes')&&/^(?:说明：|原有说明：|出处：)/.test(p.textContent.trim())))failures.push(ch.id+': note left in the reading text');
      for(const citation of rendered.querySelectorAll('.grammar-citation')){
       const marker=citation.parentElement.tagName==='SUP'?citation.parentElement:citation;
       if(/[（(]\s*$/.test(marker.previousSibling?.textContent||'')&&/^\s*[）)]/.test(marker.nextSibling?.textContent||''))failures.push(ch.id+': redundant parentheses around citation '+citation.textContent);
      }
      const links=new Set([...rendered.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')));
      for(const href of sourceLinks)if(!links.has(href))failures.push(ch.id+': source link lost '+href);
     }
     const enIPA=[...english.querySelectorAll('.grammar-pair')].flatMap(n=>n.dataset.ipa.split(/[、,]\s*/)).sort();
     if(JSON.stringify(zhIPA)!==JSON.stringify(enIPA))failures.push(ch.id+': IPA changes in English: '+JSON.stringify({zh:zhIPA.filter((x,i)=>zhIPA.indexOf(x)===i&&zhIPA.filter(y=>y===x).length!==enIPA.filter(y=>y===x).length),en:enIPA.filter((x,i)=>enIPA.indexOf(x)===i&&zhIPA.filter(y=>y===x).length!==enIPA.filter(y=>y===x).length),counts:[zhIPA.length,enIPA.length]}));
     if(JSON.stringify(zhRefs)!==JSON.stringify([...english.querySelectorAll('.grammar-citation')].map(n=>[n.textContent,n.dataset.footnoteTarget])))failures.push(ch.id+': citation numbering changes with language');
     const walker=document.createTreeWalker(english,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode()))if(!n.parentElement.closest('[data-spelling-pending]')&&/\p{Script=Han}/u.test(n.nodeValue))failures.push(ch.id+': untranslated '+n.nodeValue);
     for(const rendered of [document.querySelector('main'),english]){const words=document.createTreeWalker(rendered,NodeFilter.SHOW_TEXT);let word;while((word=words.nextNode()))if(!word.parentElement.closest('.grammar-pair,.grammar-ipa')&&/[\p{Script=Latin}\p{M}ʰ]+[¹²³⁴⁵]+/u.test(word.nodeValue))failures.push(ch.id+': IPA without romanization '+word.nodeValue);}
     if(ch.id==='101')for(const rendered of [document.querySelector('main'),english]){
      const tables=[...rendered.querySelectorAll('table')],originalTables=[...original.querySelectorAll('table')];
      let inventories=0;
      for(const [index,table] of originalTables.entries()){
       const headers=[...table.querySelectorAll('thead th')].map(n=>n.textContent);
       if(!headers.includes('叶氏拼音'))continue;
       const columns=headers[0]==='类别'?[2,3,4]:['IPA','IPA（原表记法）','音值／位置'].includes(headers[0])?[0]:[];
       if(!columns.length)continue;
       inventories++;
       for(const [r,row] of [...tables[index].tBodies[0].rows].entries())for(const c of columns){
        const cell=row.cells[c],source=originalTables[index].tBodies[0].rows[r].cells[c];
        const expected=rendered===english?(UI_TRANSLATIONS[source.textContent]||source.textContent):source.textContent;
        if(cell.textContent!==expected||cell.querySelector('.grammar-spelling'))failures.push('Inventory IPA repeated or changed: '+source.textContent);
       }
       if(headers[2]==='词例（IPA）'&&!tables[index].tBodies[0].rows[0].cells[2].querySelector('.grammar-pair .grammar-spelling'))failures.push('Example word lost its spelling');
      }
      if(inventories<6)failures.push('Missing onset/rime inventories');
     }
     for(const a of english.querySelectorAll('.grammar-citation')){if(!/^\[\d+\]$/.test(a.textContent)||!a.title||/\p{Script=Han}/u.test(a.title)||!english.querySelector('#'+a.dataset.footnoteTarget))failures.push(ch.id+': invalid reference '+a.outerHTML);}
     if(ch.id==='101'&&(![...english.querySelectorAll('.grammar-ipa')].some(n=>n.textContent==='/p/')||![...english.querySelectorAll('.grammar-ipa')].some(n=>n.textContent==='[b]')))failures.push('IPA slashes/brackets missing');
     if(d==='north')for(const word of document.querySelectorAll('.grammar-word')){
      const gloss=word.querySelector('.grammar-gloss'),spelling=word.querySelector('.grammar-spelling');
      if(/NMLZ/.test(gloss.dataset.en)&&(!spelling.dataset.ye.includes('-')||!spelling.dataset.accent.includes('-')))failures.push(ch.id+': unattached nominalizer '+word.textContent);
     }
     if(ch.id==='106'){
      for(const rendered of [document.querySelector('main'),english]){
       const liuNotes=[...rendered.querySelectorAll('.grammar-footnotes li')].filter(n=>n.textContent.includes('Kang Franco Liu. 2025.'));
       if(liuNotes.length!==1||liuNotes[0].querySelectorAll('.grammar-footnote-return').length!==2)failures.push('Liu bibliography missing, duplicated or disconnected from its citations');
       if([...rendered.querySelectorAll('p')].some(p=>!p.closest('.grammar-footnotes')&&p.textContent.includes('Kang Franco Liu. 2025.')))failures.push('Full bibliography left in the reading text');
       if(rendered.textContent.includes('niēi')||![...rendered.querySelectorAll('h3,h4')].some(h=>h.textContent.includes('niēxi')))failures.push('niexi onset missing from heading');
       const see=[...rendered.querySelectorAll('.grammar-word .grammar-pair')].find(p=>p.dataset.ipa==='pai⁵³')?.querySelector('.grammar-spelling');
       if(see?.dataset.ye!=='baiv'||see?.dataset.accent!=='bài')failures.push('Unaspirated /p/ in bai must be spelled b');
       const paired=[...rendered.querySelectorAll('.grammar-word .grammar-pair')].find(p=>p.dataset.ipa==='[tsa²⁴ pɔ²¹ ɕi²⁴]');
       if(!paired||paired.querySelector('.grammar-spelling').dataset.ye!=='[zafbor-xif]')failures.push('State-marked verb and nominalizer not aligned together');
       if(![...rendered.querySelectorAll('.grammar-pair')].some(p=>p.dataset.ipa==='pʰu-{nie／ɕi／nie-ɕi}]'&&p.querySelector('.grammar-spelling').dataset.accent==='pu-{nie／xi／nie-xi}]'))failures.push('Unmarked source acquired a tone');
      }
     }
     if(ch.id==='104'){
      const overview=document.querySelector('.grammar-predicate-overview');
      const headings=[...overview.querySelectorAll('h5')].map(h=>h.textContent);
      if(JSON.stringify(headings)!==JSON.stringify(['一般否定','体态及其否定','情态及其否定','方向','程度','不规则变化','名词化']))failures.push('Overview: missing or reordered sections');
      if(overview.querySelectorAll('table').length!==10)failures.push('Overview: missing section or aspect subgroup table');
      const forms=[...overview.querySelectorAll('tbody td')];
      for(const cell of forms){const w=document.createTreeWalker(cell,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))if(!n.parentElement.closest('.grammar-pair')&&/\/[^/]+\//.test(n.nodeValue))failures.push('Overview: unpaired IPA '+n.nodeValue);}
      const orderTables=[...document.querySelectorAll('table')].filter(t=>['位置','位置组合'].includes(t.rows[0]?.cells[0]?.textContent));
      for(const table of orderTables){const copy=table.cloneNode(true);copy.querySelectorAll('.grammar-pair').forEach(n=>n.remove());if(/\/[^/]+\//.test(copy.textContent))failures.push('Postpredicate order: IPA missing switchable spelling');}
      for(const ipa of ['la','tɕi','po la','po ɕi','liau','tɕi liau','xu','tuɔ','ɕi','tsʰi','ɲie ɕi','ma','ku'])if(!forms.some(c=>[...c.querySelectorAll('.grammar-pair')].some(p=>p.dataset.ipa===ipa&&!/[¹²³⁴⁵xfrv]$/.test(p.querySelector('.grammar-spelling').dataset.ye))))failures.push('Overview: variable-tone affix not displayed without tone: '+ipa);
      const modality=[...overview.querySelectorAll('table')].find(t=>t.rows[0].cells[2]?.textContent==='对应否定');
      for(const [positive,negative] of [['ɣɤ⁵⁵','tsʰɿ⁵⁵ ɣɤ⁵⁵'],['tsʰɤ⁵⁵','xɨ⁵⁵ tsʰɤ⁵⁵'],['pie⁵⁵','tʰa⁵⁵ pie⁵⁵'],['tsʰa²⁴','tsʰa²⁴ ta²⁴'],['tsʰɤ⁵⁵','tʰa⁵⁵ tsʰɤ⁵⁵']])if(![...modality.tBodies[0].rows].some(r=>r.cells[1].querySelector('[data-ipa="'+positive+'"]')&&r.cells[2].querySelector('[data-ipa="'+negative+'"]')))failures.push('Overview: modal negative separated from affirmative '+negative);
      if(![...document.querySelectorAll('h4')].some(h=>h.textContent==='Brassett的合音分析'))failures.push('Overview: contraction analysis lost its attribution');
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
