// Read deadlines include the body; transient failures retry, permanent ones do not.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function client(fetch){
 const ctx=vm.createContext({fetch,AbortController,DOMException,setTimeout,clearTimeout});
 vm.runInContext(fs.readFileSync('site/network.js','utf8')+'\nthis.request=SiteRequest;',ctx);return ctx.request;
}
const options={timeoutMs:30,retries:2,retryDelay:0};
(async()=>{
 let calls=0;let request=client(async()=>new Response(++calls<3?'busy':'{"ready":true}',{status:calls<3?503:200}));
 assert.equal((await request.json('data',options)).ready,true);assert.equal(calls,3);
 calls=0;request=client(async()=>{calls++;return new Response('missing',{status:404})});
 await assert.rejects(request.json('data',options),error=>error.status===404);assert.equal(calls,1);
 calls=0;request=client((url,{signal})=>new Promise((resolve,reject)=>{calls++;signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true});}));
 await assert.rejects(request.json('data',options),error=>error.name==='TimeoutError');assert.equal(calls,3);
 calls=0;request=client(async(url,{signal})=>{
  calls++;return new Response(new ReadableStream({start(controller){signal.addEventListener('abort',()=>controller.error(new DOMException('Aborted','AbortError')),{once:true});controller.enqueue(new TextEncoder().encode('{'));}}));
 });
 await assert.rejects(request.json('data',options),error=>error.name==='TimeoutError');assert.equal(calls,3,'a stalled body is bounded');
 const controller=new AbortController();controller.abort();calls=0;request=client(async()=>{calls++;return new Response('{}')});
 await assert.rejects(request.json('data',{...options,signal:controller.signal}));assert.equal(calls,0);
 calls=0;request=client(async()=>new Response(++calls===1?'truncated':'{"ready":true}'));
 assert.equal((await request.json('data',options)).ready,true);assert.equal(calls,2);
 console.log('PASS: 503 retries, permanent 404, stalled headers and body deadlines, caller cancellation and corrupt response recovery.');
})().catch(error=>{console.error(error);process.exitCode=1});
