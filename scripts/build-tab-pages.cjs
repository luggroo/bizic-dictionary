// Snapshot the actual tab content in both languages, with the shared app retained.
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'site');
const tabs=['words','grammar','notation','history','corpus','sources'];
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1);if(!name||name.endsWith('/'))name+='index.html';
 const file=path.resolve(root,name);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 try{res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port+'/';
 const executablePath=process.env.CHROMIUM_EXECUTABLE||['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
 const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const results=[];
  for(const lang of ['zh','en']){
   const prefix=lang==='en'?'en/':'';
   const source=fs.readFileSync(path.join(root,prefix+'index.html'),'utf8');
   const home=source.match(/<main id="main">([\s\S]*?)<\/main>/)[1];
   const context=await browser.newContext();const page=await context.newPage();
   for(const tab of tabs){
    await page.goto(base+prefix+'#'+tab);
    await page.waitForFunction(t=>window.fastReady&&navigationReady&&!SitePages.pending&&state.view===t&&!!document.querySelector('#main h1'),tab,{timeout:90000});
    await page.waitForFunction(l=>TujiaUI.language===l,lang);
    const snapshot=await page.evaluate(()=>({main:document.querySelector('#main').innerHTML,title:document.title,heading:document.querySelector('#main h1').textContent,css:[...document.querySelectorAll('link[rel=stylesheet]')].map(e=>e.href)}));
    assert(snapshot.main.length>200&&snapshot.heading.trim());
    const canonical='https://tujia.biz/'+prefix+tab+'.html';
    let html=source.replace(/<title>[\s\S]*?<\/title>/,'<title>'+escape(snapshot.title)+'</title>')
     .replace(/<main id="main">[\s\S]*?<\/main>/,()=>'<main id="main">'+snapshot.main+'</main><template id="site-home-content">'+home+'</template>')
     .replace('href="./" lang="zh-CN"', 'href="'+tab+'.html" lang="zh-CN"')
     .replace('href="en/" lang="en"', 'href="en/'+tab+'.html" lang="en"')
     .replace('<body ', '<body data-entry-view="'+tab+'" ')
     .replace(/(<link rel="canonical" href=")[^"]+/, '$1'+canonical)
     .replace(/(<meta property="og:url" content=")[^"]+/, '$1'+canonical)
     .replace(/(<meta property="og:title" content=")[^"]+/, '$1'+escape(snapshot.title))
     .replace(/(<link rel="alternate" hreflang="(?:zh-CN|x-default)" href=")[^"]+/g,'$1https://tujia.biz/'+tab+'.html')
     .replace(/(<link rel="alternate" hreflang="en" href=")[^"]+/g,'$1https://tujia.biz/en/'+tab+'.html');
    for(const css of snapshot.css){const relative=css.slice(base.length);if(css.startsWith(base)&&!html.includes('href="'+relative+'"'))html=html.replace('</head>','<link rel="stylesheet" href="'+escape(relative)+'"></head>');}
    // The hash initializes the existing router; the canonical URL remains the HTML file.
    html=html.replace('</head>',`<script>if(!location.hash&&!new URLSearchParams(location.search).has('id'))history.replaceState(null,'',location.pathname+location.search+'#${tab}');</script></head>`);
    const file=prefix+tab+'.html';fs.writeFileSync(path.join(root,file),html);
    results.push({file,heading:snapshot.heading,bytes:Buffer.byteLength(html)});
   }
   await context.close();
  }
  const nojs=await browser.newContext({javaScriptEnabled:false});
  const page=await nojs.newPage();
  for(const item of results){await page.goto(base+item.file);assert.equal(await page.locator('#main h1').first().textContent(),item.heading);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://tujia.biz/'+item.file);}
  await nojs.close();
  const context=await browser.newContext();const interactive=await context.newPage();
  for(const item of results){await interactive.goto(base+item.file);await interactive.waitForFunction(t=>window.fastReady&&navigationReady&&!SitePages.pending&&state.view===t,item.file.split('/').at(-1).replace('.html',''),{timeout:90000});assert.equal(await interactive.locator('link[rel=canonical]').getAttribute('href'),'https://tujia.biz/'+item.file);}
  await interactive.locator('aside button[data-view=home]').click();await interactive.waitForSelector('.translation-callout');
  await context.close();console.log(JSON.stringify({result:'PASS',pages:results,checks:'Both languages, static content, canonical URLs, interactive startup and return home'}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
