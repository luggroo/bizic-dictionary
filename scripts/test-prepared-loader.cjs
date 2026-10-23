const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../site'));
const bytes=fs.readFileSync(path.join(root,'prepared/core.json.gz')),expected=JSON.parse(zlib.gunzipSync(bytes));
(async()=>{
 for(const native of [true,false]){
  const ctx=vm.createContext({Response,Blob,Uint8Array,DecompressionStream:native?DecompressionStream:undefined});
  vm.runInContext(fs.readFileSync(path.join(root,'vendor/pako_inflate.min.js'),'utf8'),ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'hosted-data.js'),'utf8'),ctx);
  const actual=await ctx.preparedJSON(new Response(bytes));assert.equal(JSON.stringify(actual),JSON.stringify(expected));
  const plain=await ctx.preparedJSON(new Response(JSON.stringify({ready:true})));assert.equal(plain.ready,true);
  await assert.rejects(ctx.preparedJSON(new Response('missing',{status:404})));
  await assert.rejects(ctx.preparedJSON(new Response(bytes.subarray(0,100))));
 }
 console.log('PASS: native gzip and pako fallback, decoded JSON, missing and truncated data.');
})().catch(e=>{console.error(e);process.exitCode=1});
