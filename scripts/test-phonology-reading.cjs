// Regression checks for phonology reading order and source-specific spellings.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom'),root=path.resolve(__dirname,'../site');
const fixture=fs.readFileSync(path.join(__dirname,'test-reviewed-grammar.cjs'),'utf8');
const dom=new JSDOM('<main></main>',{runScripts:'outside-only'}),ctx=dom.getInternalVMContext();
vm.runInContext(fixture.split('content:`')[1].split('`});')[0],ctx);
const files=JSON.parse(fixture.split('for(const f of ')[1].split(')await page.addScriptTag')[0].replaceAll("'",'"'));
for(const f of files)vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
const result=vm.runInContext(`(()=>{
 const failures=[];let renders=0;
 for(const [onset,base,accent] of [['tɕ','jie','jiè'],['dʑ','jie','jiè'],['tɕʰ','qie','qiè'],['ɕ','xie','xiè'],['j','ye','yè'],['ʑ','ye','yè']]){
  const pair=grammarSpelling(onset+'ɛ⁵⁴','north');
  if(pair.ye!==base+'v'||pair.accent!==accent)failures.push(onset+'ɛ: '+JSON.stringify(pair));
  if(grammarSpelling(onset+'ɛ','north').ye!==base)failures.push('Unmarked '+base+' acquired a tone');
  for(const [tone,suffix] of [['55','x'],['35','f'],['33','r'],['54','v']]){
   const raw=onset+'ɛ'+tone,result=convertNotation(raw,'zhou-xr');
   if(result.rows?.[0]?.ye!==base+suffix||result.original!==raw)failures.push('Xianren converter: '+raw+' '+JSON.stringify(result));
  }
 }
 if(grammarSpelling('pɛ⁵⁴','north').ye!=='baiv')failures.push('Unrelated ɛ correspondence changed');
 if(grammarSpelling('tɕai⁵⁴','north').ye!=='jaiv')failures.push('An original ai rime was changed');
 const prose=document.createElement('div');prose.innerHTML=grammarRenderHTML({id:'test',dialect:'north',html:'<p>Compare vowels in /ĩ/.</p>'},'en');
 if(!prose.textContent.includes('in '))failures.push('An English preposition was removed as a spelling label');
 const repeated=document.createElement('div');repeated.innerHTML=grammarRenderHTML({id:'test',dialect:'north',html:'<p>/su²⁴/ /su²⁴/</p>'},'zh');
 if(repeated.querySelectorAll('[data-ipa="su²⁴"]').length!==2)failures.push('A genuinely repeated form was removed');
 for(const d of ['north','south'])for(const mode of d==='north'?['accent','ye']:['accent','poj'])for(const lang of ['zh','en']){
  spellingDisplay=d==='north'?mode:'accent';southernDisplay=d==='south'?mode:'accent';
  const ch=REVIEWED_GRAMMAR[d][0],root=document.createElement('div');root.innerHTML=grammarRenderHTML(ch,lang);renders++;
  const text=root.textContent;
  if(/(?:ng\\s+ng|hx\\s+hx|r\\s+r)\\s*\\[/.test(text))failures.push(d+'/'+mode+'/'+lang+': repeated onset label');
  if(text.includes('e／eə')||text.includes('e/eə'))failures.push('Phonetic contrast acquired romanization');
  const heads=[...root.querySelectorAll('h4')].map(n=>n.textContent);
  const expected=d==='north'?(lang==='zh'?['先读懂一个音节','声母：拼写、音值与词例','韵母：元音、介音与鼻化','声调：调类、调值与调尾','连读中的声调变化','方言差异：音值的分布与变读']:['Start with a syllable','Onsets: spelling, sound values and examples','Rimes: vowels, medials and nasalization','Tones: categories, pitch values and spelling','Tone changes in connected speech','Variety differences: distribution and variants']):(lang==='zh'?['音节结构','声母表','韵母表','声调表','前缀声调随词根变化']:['Syllable structure','Initial consonants','Rimes','Tones','Prefix tones change with the root']);
  let last=-1;for(const title of expected){const i=heads.indexOf(title);if(i<0||i<=last)failures.push(d+'/'+lang+': missing or out-of-order '+title);last=i;}
  for(const pair of root.querySelectorAll('[data-ipa="tɕɛ⁵⁴"],[data-ipa="dʑɛ⁵⁴"]'))if(pair.querySelector('.grammar-spelling').textContent!==(mode==='ye'?'jiev':'jiè'))failures.push('Rendered chop mismatch');
  const anchors=d==='north'?['north-phonology-tables','north-3-1','north-2-1','north-2-2','north-2-3','north-3-2','north-1-2','north-4-1','north-4-2','north-word-tone']:['south-3-1','south-2-1','south-2-2','south-1-2','south-4-3'];
  for(const id of anchors)if(!root.querySelector('[id="'+id+'"]'))failures.push('Lost anchor '+id);
  if(d==='north'){
   const toneTables=[...root.querySelectorAll('table.grammar-tone-overview')];
   if(toneTables.length!==1)failures.push('Expected one consolidated tone table, found '+toneTables.length);
   else{
    const table=toneTables[0];
    if(table.querySelectorAll('tbody tr').length!==4)failures.push('Tone table does not have four categories');
    for(const sound of ['ʔa⁵⁵','ʔa²⁴','ʔa²¹','ʔa⁵¹','⁵⁴','³³'])if(!table.textContent.includes(sound))failures.push('Missing tone form '+sound);
   }
  }
 }
 return {failures,renders};
})()`,ctx);
assert.deepEqual(Array.from(result.failures),[]);
console.log('PASS: '+result.renders+' phonology views; jie, source IPA, tone, nonduplicate labels, reading order and stable anchors.');
dom.window.close();
