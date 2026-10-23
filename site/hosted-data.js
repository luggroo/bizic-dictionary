// Decode same-origin prepared data; fall back for browsers without stream decompression.
async function preparedJSON(response){
 if(!response.ok)throw new Error('Data unavailable: '+response.status);
 const bytes=new Uint8Array(await response.arrayBuffer());
 if(bytes[0]!==31||bytes[1]!==139)return new Response(bytes).json();
 if(typeof DecompressionStream==='function'&&typeof Blob.prototype.stream==='function'){
  try{return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).json();}catch{}
 }
 return new Response(pako.ungzip(bytes)).json();
}
