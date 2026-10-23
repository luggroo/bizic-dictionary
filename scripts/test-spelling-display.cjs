// Run after preparing site data; BASE_URL may select a separately built site.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.BASE_URL;
if(!base)throw Error('Set BASE_URL to a prepared local site.');
async function choose(page,region,value,detail=false){
 const select=page.locator((detail?'#detail-spelling-control':'#spelling-control')+' [data-spelling-display="'+region+'"]');
 if(!await select.isVisible())await page.locator('details:has(#spelling-control)>summary').click();
 await select.selectOption(value);
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,args:['--no-sandbox']});
 try{for(const width of [390,1440]){
  const context=await browser.newContext({viewport:{width,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'#words');await page.waitForFunction(()=>typeof D!=='undefined'&&D&&D.words.length);
  await page.locator('#query').fill('水');await page.locator('[data-search-language="zh"]').click();
  const ids=()=>page.locator('.word-card-content').evaluateAll(es=>es.map(e=>e.dataset.open));
  const initial=await ids(),url=page.url();
  for(const north of ['accent','ye'])for(const south of ['accent','poj']){
   await page.locator('#query').fill('尚未提交的搜索');
   await choose(page,'north',north);await choose(page,'south',south);
   assert.equal(await page.inputValue('#query'),'尚未提交的搜索');
   assert.equal(await page.evaluate(()=>state.q),'水');assert.equal(page.url(),url);assert.deepEqual(await ids(),initial);
  }
  // A preserved draft must remain usable by the actual submit handler.
  await page.locator('#query').fill('here');await page.locator('[data-search-language="en"]').click();
  assert.equal(await page.evaluate(()=>state.q),'here');assert.equal(await page.evaluate(()=>state.searchLanguage),'en');
  for(const [id,region,mode,expected] of [['yubao-60757-v-0128','north','accent','wótū'],['yubao-60757-v-0128','north','ye','woftux'],['yubao-60824-v-0428','south','accent','zzí lā'],['yubao-60824-v-0428','south','poj','jrı́ lā']]){
   await page.evaluate(id=>openPreparedDetail(id),id);await page.waitForSelector('dialog[open] #detail-body h1');
   const original=await page.evaluate(id=>JSON.stringify(W[id].attestations),id);
   await choose(page,region,mode,true);assert.equal(await page.locator('#detail-body h1').first().innerText(),expected);
   assert.equal(await page.evaluate(id=>JSON.stringify(W[id].attestations),id),original);await page.locator('#close').click();
  }
  await choose(page,'north','ye');await choose(page,'south','poj');await page.reload();await page.waitForFunction(()=>typeof D!=='undefined'&&D&&D.words.length);
  assert.deepEqual(await page.evaluate(()=>[spellingDisplay,southernDisplay]),['ye','poj']);assert.deepEqual(errors,[]);
  await page.locator('aside nav [data-view="notation"]').click();await page.locator('#notation-source').selectOption('zhou-xr');
  for(const [input,expected] of [['tɕɛ54','jiev'],['dʑɛ54','jiev'],['tɕʰɛ54','qiev'],['ɕɛ54','xiev'],['jɛ54','yev'],['ʑɛ54','yev']]){
   await page.locator('#notation-input').fill(input);await page.locator('#notation-converter button').click();
   const text=await page.locator('#main').innerText();assert(text.includes(expected));assert(!text.includes('jaiv'));assert.equal(await page.inputValue('#notation-input'),input);
  }
  assert.deepEqual(errors,[]);
  await context.close();console.log('PASS '+width+'px: independent modes, draft, submit, result/route preservation, details, source evidence, reload and Xianren converter');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
