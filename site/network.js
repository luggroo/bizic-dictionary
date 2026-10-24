/* Bounded, repeatable reads of static assets, including their response bodies. */
'use strict';
const SiteRequest=(()=>{
 const retryable=new Set([408,425,429,500,502,503,504]);
 const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function read(url,consume,options={}){
  const {timeoutMs=20000,retries=2,retryDelay=350,signal,...init}=options;
  const attempts=['GET','HEAD'].includes((init.method||'GET').toUpperCase())?retries+1:1;
  for(let attempt=0;attempt<attempts;attempt++){
   if(signal?.aborted)throw signal.reason||new DOMException('Cancelled','AbortError');
   const controller=new AbortController();let timedOut=false;
   const abort=()=>controller.abort(signal.reason);
   signal?.addEventListener('abort',abort,{once:true});
   const timer=setTimeout(()=>{timedOut=true;controller.abort();},timeoutMs);
   try{
    const response=await fetch(url,{...init,signal:controller.signal});
    if(!response.ok){
     try{await response.body?.cancel();}catch{}
     throw Object.assign(new Error('HTTP '+response.status),{status:response.status,retryable:retryable.has(response.status)});
    }
    return await consume(response);
   }catch(error){
    if(signal?.aborted)throw signal.reason||error;
    if(attempt+1===attempts||error.retryable===false)throw timedOut?Object.assign(new Error('Request timed out'),{name:'TimeoutError',cause:error}):error;
   }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
   await delay(retryDelay*2**attempt);
  }
 }
 return {read,text:(url,options)=>read(url,r=>r.text(),options),json:(url,options)=>read(url,r=>r.json(),options),fetch:(url,options)=>read(url,r=>r,options)};
})();
