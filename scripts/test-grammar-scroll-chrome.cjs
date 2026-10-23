// Browser-level mobile chapter navigation regression without external test dependencies.
// Run after site data preparation. Uses Chrome's headless DOM snapshot.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),zlib=require('node:zlib');
const cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../site');
const mount='/bizic-dictionary/';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
const harness=[
 "(async()=>{",
 " const errors=[];",
 " window.addEventListener('error',e=>errors.push(e.message));",
 " window.addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));",
 " const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));",
 " const settle=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));",
 " const until=async(fn,label)=>{for(let i=0;i<160;i++){if(fn())return;await pause(100)}throw Error('Timeout waiting for '+label)};",
 " const position=()=>{const title=document.querySelector('.grammar-article > h1.grammar-reading-title');return {title:title?.textContent,top:title?Math.round(title.getBoundingClientRect().top):null,y:Math.round(window.scrollY),expanded:document.querySelector('.grammar-toc-wrap')?.dataset.mobileExpanded,route:location.hash}};",
 " try{",
 "  await until(()=>typeof state!=='undefined'&&typeof D!=='undefined'&&D&&state.view==='grammar'&&document.querySelector('.grammar-toc [data-chapter=\"104\"]'),'initial grammar');",
 "  await document.fonts.ready;",
 "  const initial=position();",
 "  document.querySelector('.grammar-toc [data-chapter=\"104\"]').click();",
 "  await until(()=>state.chapter==='104'&&document.querySelector('.grammar-reading-title')&&document.querySelector('.grammar-toc-wrap')?.dataset.mobileExpanded==='false','chapter 104');",
 "  await settle();await settle();",
 "  const afterChapter=position();",
 "  document.querySelector('.grammar-toc-toggle').click();",
 "  const link=document.querySelector('.grammar-toc-sections a[href=\"#grammar/north/104/2\"]');",
 "  if(!link)throw Error('Missing section 104.2');",
 "  link.click();",
 "  await until(()=>state.grammarSection==='104.2'&&document.querySelector('.grammar-reading-title')&&document.querySelector('.grammar-toc-wrap')?.dataset.mobileExpanded==='false','section 104.2');",
 "  await settle();await settle();",
 "  const afterSection=position();",
 "  const result={width:innerWidth,initial,afterChapter,afterSection,errors};",
 "  if(innerWidth>900)throw Error('Chrome mobile viewport '+innerWidth+' is too wide');",
 "  for(const [kind,snapshot] of [['chapter',afterChapter],['section',afterSection]]){",
 "   if(snapshot.top===null||snapshot.top< -8||snapshot.top>65)throw Error(kind+' did not land at heading: '+JSON.stringify(snapshot));",
 "   if(snapshot.y<90)throw Error(kind+' left page near top: '+JSON.stringify(snapshot));",
 "  }",
 "  if(errors.length)throw Error('Browser errors: '+errors.join('; '));",
 "  result.status='PASS';window.__grammarScrollResult=result;",
 " }catch(err){window.__grammarScrollResult={status:'FAIL',error:String(err),errors,position:position()}}",
 " const pre=document.createElement('pre');pre.id='grammar-scroll-qa';pre.textContent=JSON.stringify(window.__grammarScrollResult);document.body.append(pre);",
 "})();"
].join('\n');
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 if(!url.pathname.startsWith(mount)){res.writeHead(404).end();return}
 const part=decodeURIComponent(url.pathname.slice(mount.length))||'index.html';
 const file=path.resolve(root,part);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 try{
  let data=fs.existsSync(file)?fs.readFileSync(file):zlib.gunzipSync(fs.readFileSync(file+'.gz'));
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  if(part==='index.html'){
   const html=data.toString('utf8');
   assert(html.includes('</body>'),'index.html is missing body');
   data=Buffer.from(html.replace('</body>','<script>'+harness+'</script></body>'));
  }
  res.end(data);
 }catch(e){res.writeHead(404).end(String(e))}
});
(async()=>{
 const available=['google-chrome','google-chrome-stable','chromium','chromium-browser'];
 const binary=process.env.CHROMIUM_EXECUTABLE||available.find(p=>cp.spawnSync('which',[p],{stdio:'ignore'}).status===0);
 assert(binary,'Chrome or Chromium must be installed to test mobile navigation');
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const addr='http://127.0.0.1:'+server.address().port+mount+'?lang=zh#grammar/north/101/1';
 const flags=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-first-run','--hide-scrollbars','--window-size=390,844','--force-device-scale-factor=1','--virtual-time-budget=35000','--dump-dom',addr];
 let stdout='',stderr='';
 const child=cp.spawn(binary,flags,{stdio:['ignore','pipe','pipe']});
 child.stdout.setEncoding('utf8');child.stderr.setEncoding('utf8');
 child.stdout.on('data',chunk=>{stdout+=chunk;if(stdout.length>20e6)child.kill()});
 child.stderr.on('data',chunk=>stderr+=chunk);
 const exit=await Promise.race([
  new Promise(resolve=>child.on('close',code=>resolve({code}))),
  new Promise(resolve=>setTimeout(()=>{child.kill();resolve({code:-1,reason:'timeout'})},120000))
 ]);
 const match=stdout.match(/<pre id="grammar-scroll-qa">([\s\S]*?)<\/pre>/);
 if(!match)throw Error('Chrome produced no QA result: '+JSON.stringify({exit,stderr:stderr.slice(-1000),out:stdout.slice(-1500)}));
 const raw=match[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 const result=JSON.parse(raw);
 console.log(JSON.stringify(result,null,2));
 assert.equal(result.status,'PASS','Mobile grammar did not scroll to selected headings');
 assert.equal(exit.code,0,'Headless Chrome exited unsuccessfully');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
