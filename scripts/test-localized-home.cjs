// Verify crawlable language versions and the real dictionary flow from /en/.
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2'};
const titles={zh:'土家语词典、语法与语料｜毕兹学堂',en:'Tujia Dictionary, Grammar & Texts | Bizic Academy 毕兹学堂'};
const grammarLabels={
 zh:['北部－龙山语法','北部－保靖厦语法','南部－泸溪语法'],
 en:['Northern — Longshan grammar','Northern — Baojing Xia grammar','Southern — Luxi grammar']
};
const homeGrammarLabels=async page=>(await page.locator('#main [data-grammar-dialect]').allInnerTexts()).map(text=>text.trim().replace(/\s*→$/,''));
const mount='/bizic-dictionary/';
let server,base=process.env.BASE_URL;
(async()=>{
 if(!base){
  server=http.createServer((req,res)=>{
   const pathname=new URL(req.url,'http://localhost').pathname;
   if(!pathname.startsWith(mount)){res.writeHead(404).end();return;}
   let name=decodeURIComponent(pathname.slice(mount.length));
   if(!name||name.endsWith('/'))name+='index.html';
   const file=path.resolve(root,name);
   if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
   try{res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+server.address().port+mount;
 }
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
 const errors=[],failures=[];
 const ready=p=>p.waitForFunction(()=>window.fastReady&&navigationReady&&!SitePages.pending&&!!document.querySelector('#main h1'),null,{timeout:60000});
 const screenshot=async(p,name)=>{if(process.env.QA_SCREENSHOTS){fs.mkdirSync(process.env.QA_SCREENSHOTS,{recursive:true});await p.screenshot({path:path.join(process.env.QA_SCREENSHOTS,name+'.png'),fullPage:true});}};
 try{
  const nojs=await browser.newContext({javaScriptEnabled:false});
  for(const lang of ['zh','en']){
   const p=await nojs.newPage();await p.goto(base+(lang==='en'?'en/':''));
   assert.equal(await p.title(),titles[lang]);
   assert((await p.locator('meta[name=description]').getAttribute('content')).startsWith(lang==='en'?'Search Northern and Southern Tujia vocabulary':'查询北部与南部土家语词汇'));
   assert.equal(await p.locator('html').getAttribute('lang'),lang==='en'?'en':'zh-CN');
   assert((await p.locator('.hero h1').innerText()).includes(lang==='en'?'Tujia Dictionary':'土家语词典'));
   assert.equal(await p.locator('link[rel=canonical]').getAttribute('href'),'https://tujia.biz/'+(lang==='en'?'en/':''));
   assert.equal(await p.locator('link[hreflang=en]').getAttribute('href'),'https://tujia.biz/en/');
   assert.equal(await p.locator('link[hreflang="zh-CN"]').getAttribute('href'),'https://tujia.biz/');
   assert.equal(await p.locator('link[hreflang="x-default"]').getAttribute('href'),'https://tujia.biz/');
   const body=await p.locator('#main').innerText();
   assert.deepEqual(await homeGrammarLabels(p),grammarLabels[lang],`all three ${lang} grammar entries appear in order without JavaScript`);
   assert(body.includes(lang==='en'?'Compatible AI tools must be able to run code and read the translation skill, dictionary and grammar materials.':'适用环境：能运行代码，并能读取翻译技能、词典和语法资料的 AI 工具。'));
   assert(await p.locator('.translation-callout').evaluate(e=>e.parentElement.lastElementChild===e));
   assert.equal(await p.locator('nav .nav-repo-link').getAttribute('href'),'/translation.html');
   assert.equal(await p.locator('nav .nav-repo-link').getAttribute('target'),null);
   assert((await p.locator('nav .nav-repo-link').innerText()).includes(lang==='en'?'Translation skill':'翻译技能'));
   assert((await p.locator('.translation-callout h2').innerText()).includes(lang==='en'?'Tujia translation':'土家语翻译'));
   await p.locator('[data-ui-language-link="'+(lang==='en'?'zh':'en')+'"]').click();
   assert.equal(await p.title(),titles[lang==='en'?'zh':'en']);
   await p.close();
  }
  await nojs.close();console.log('PASS: no-JavaScript titles, descriptions, body, reciprocal hreflang/canonicals and language links');
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
  p.on('response',r=>{
   const url=new URL(r.url());
   // Optional recordings are checked with HEAD and hidden when absent.
   const optionalMedia=r.status()===404&&r.request().method()==='HEAD'&&url.pathname.startsWith(new URL('media/',base).pathname);
   if(r.status()>=400&&url.origin===new URL(base).origin&&!optionalMedia)failures.push(r.status()+' '+r.url());
  });
  const requests=[];p.on('request',r=>requests.push(new URL(r.url()).pathname));
  await p.goto(base);await ready(p);await p.evaluate(()=>localStorage.setItem('tujia-ui-language','zh'));
  await p.goto(base+'en/');await ready(p);
  assert.equal(await p.evaluate(()=>TujiaUI.language),'en','explicit English entry overrides a saved Chinese preference');
  assert.equal(await p.title(),titles.en);assert.equal(new URL(p.url()).pathname,new URL('en/',base).pathname);
  assert(!requests.some(url=>url.includes('/prepared/')),'both homepages remain independent of dictionary downloads');
  assert(!requests.some(url=>url.startsWith(new URL('en/',base).pathname)&&/\.(?:js|css|gz)$/.test(url)),'English entry reuses root assets');
  await screenshot(p,'home-en-desktop');
  for(const lang of ['zh','en']){
   await p.selectOption('#ui-language',lang);assert.equal(await p.title(),titles[lang]);
   assert((await p.locator('.hero h1').innerText()).includes(lang==='en'?'Tujia Dictionary':'土家语词典'));
   assert.equal(await p.locator('#query').getAttribute('aria-label'),lang==='en'?'Search':'搜索');
   assert.deepEqual(await homeGrammarLabels(p),grammarLabels[lang],`all three grammar entries update when switching to ${lang}`);
   assert.equal(await p.locator('.translation-requirement').innerText(),lang==='en'?'Compatible AI tools must be able to run code and read the translation skill, dictionary and grammar materials.':'适用环境：能运行代码，并能读取翻译技能、词典和语法资料的 AI 工具。');
   await p.setViewportSize({width:320,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await screenshot(p,'home-'+lang+'-mobile');await p.setViewportSize({width:1280,height:900});
  }
  console.log('PASS: locale preference, reversible pretranslated text/attributes, mobile layout and shared assets');
  await p.goto(base+'en/#words?q='+encodeURIComponent('吃'));await p.waitForSelector('.word-card');await ready(p);
  assert.equal(await p.title(),'Tujia Dictionary | Bizic Academy 毕兹学堂');
  await p.locator('.word-card-content').first().click();await p.waitForSelector('dialog[open] #detail-body h2');await ready(p);
  const id=new URL(p.url()).searchParams.get('id');assert(id);
  const chinese=await p.locator('[data-ui-language-link=zh]').getAttribute('href');
  assert.equal(new URL(chinese,base).searchParams.get('id'),id);assert(new URL(chinese,base).hash.includes('q='));
  await p.goto(new URL(chinese,base).href);await p.waitForSelector('dialog[open] #detail-body h2');await ready(p);
  assert.equal(await p.evaluate(()=>TujiaUI.language),'zh');assert.equal(new URL(p.url()).searchParams.get('id'),id);
  assert.equal(await p.title(),'土家语词典｜毕兹学堂');
  await p.locator('#close').click();await p.waitForSelector('dialog[open]',{state:'hidden'});
  await p.locator('[data-ui-language-link=en]').click();await p.waitForSelector('.word-card');await ready(p);
  assert.equal(await p.evaluate(()=>state.q),'吃');assert.equal(await p.evaluate(()=>TujiaUI.language),'en');
  await p.locator('aside [data-view=grammar]').click();await p.waitForSelector('.grammar-reading-title');await ready(p);
  assert.equal(new URL(p.url()).pathname,new URL('en/',base).pathname);
  const chapter=p.locator('.grammar-toc a[href^="#grammar/"]').first();
  if(await chapter.count()){await chapter.click();await ready(p);assert.equal(new URL(p.url()).pathname,new URL('en/',base).pathname);}
  await p.locator('aside button[data-view=home]').click();await p.waitForSelector('.hero');await ready(p);
  assert.equal(await p.title(),titles.en);
  assert((await p.locator('.hero h1').innerText()).includes('Tujia Dictionary'));
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
  console.log('PASS: English dictionary query, source detail, linked Chinese/English routes, grammar navigation and return home');
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server?.close());
