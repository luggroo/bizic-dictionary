// A local WASI reactor. It uses no filesystem, network, clocks or environment.
function openTujiaCore(data){
  const binary=Uint8Array.from(atob(data.wasm),c=>c.charCodeAt(0));
  const module=new WebAssembly.Module(binary);
  let api;
  const imports={
    environ_sizes_get:(a,b)=>{const v=new DataView(api.memory.buffer);v.setUint32(a,0,true);v.setUint32(b,0,true);return 0},
    environ_get:()=>0,fd_prestat_get:()=>8,fd_prestat_dir_name:()=>8,
    fd_close:()=>8,fd_seek:()=>8,fd_write:()=>8,proc_exit:code=>{throw Error('WASI exit '+code)}
  };
  api=new WebAssembly.Instance(module,{wasi_snapshot_preview1:imports}).exports;
  api._initialize();
  const encoder=new TextEncoder(),decoder=new TextDecoder();
  function bytes(input){
    const array=typeof input==='string'?encoder.encode(input):input;
    const addr=api.malloc(array.byteLength+1);
    if(!addr)throw Error('无法载入离线词库');
    const heap=new Uint8Array(api.memory.buffer,addr,array.byteLength+1);
    heap.set(array);heap[array.byteLength]=0;
    return {addr,size:array.byteLength};
  }
  function withBuffers(values,action){
    const buffers=[];
    try{for(const val of values)buffers.push(bytes(val));return action(buffers)}
    finally{for(const buf of buffers)api.free(buf.addr)}
  }
  function readString(addr){
    if(!addr)return '';
    const heap=new Uint8Array(api.memory.buffer);
    return decoder.decode(heap.subarray(addr,heap.indexOf(0,addr)));
  }
  const dict=withBuffers([data.words,data.ngrams,data.sounds,...(data.senses?[data.senses]:[]),...(data.readings?[data.readings]:[])],bufs=>{
    const fn=bufs.length===5?api.tji_words_open_with_readings:bufs.length===4?api.tji_words_open_with_senses:api.tji_words_open_full;
    return fn(...bufs.flatMap(b=>[b.addr,b.size]));
  });
  if(!dict)throw Error('无法载入离线词库');
  function choices(handle){
    const rows=[];
    try{
      for(let i=0;i<api.tji_choices_count(handle);i++){
        const field=name=>readString(api['tji_choice_'+name](handle,i));
        const ptr=api.malloc(4);let ranges;
        try{
          const start=api.tji_choice_joined_han_ranges(handle,i,ptr);
          const count=new DataView(api.memory.buffer).getUint32(ptr,true);
          ranges=Array.from(new Int32Array(api.memory.buffer,start,count));
        }finally{api.free(ptr)}
        rows.push({form:field('text'),meaning:field('meaning'),short:field('short_meaning'),
          ids:field('lexeme_ids'),sound:field('last_syllable'),hanSenseId:field('han_sense_id'),kind:api.tji_choice_kind(handle,i),
          syllable:!!api.tji_choice_is_syllable(handle,i),loan:!!api.tji_choice_plain_han_loan(handle,i),
          length:api.tji_choice_consumed_utf16(handle,i),ranges});
      }
    }finally{api.tji_choices_close(handle)}
    return rows;
  }
  function words(fn,input,mode,style){
    return withBuffers([input],([s])=>choices(api[fn](dict,s.addr,mode,style)));
  }
  function suffix(draft,length){
    return withBuffers([draft],([s])=>{
      const result=api.tji_suffix_after_choice(s.addr,length);
      try{return readString(result)}finally{api.tji_text_free(result)}
    });
  }
  function space(text,before,after){
    return withBuffers([text],([s])=>{
      const result=api.tji_space_word(s.addr,before,after);
      try{return readString(result)}finally{api.tji_text_free(result)}
    });
  }
  let pen=0;
  function recognize(paths,strong=false){
    if(!paths.length)return [];
    if(!pen)pen=withBuffers([data.pen],([p])=>api.tji_pen_open(p.addr,p.size));
    const xy=[],ends=[];
    for(const path of paths){
      for(const [x,y] of path)xy.push(x,y);
      ends.push(xy.length/2);
    }
    return withBuffers([new Uint8Array(new Float32Array(xy).buffer),new Uint8Array(new Uint32Array(ends).buffer)],([a,b])=>
      choices(strong ? api.tji_recognize_strong(pen,a.addr,xy.length/2,b.addr,ends.length)
                     : api.tji_recognize(pen,a.addr,xy.length/2,b.addr,ends.length,8)).map(c=>c.form));
  }
  return {lookup:(...p)=>words('tji_lookup_with_orthography',...p),
    nextWords:(...p)=>words('tji_next_words',...p),
    nextSounds:(...p)=>words('tji_next_syllables_for_mode',...p),
    matchesPrefix:(input,ye,marked)=>withBuffers([input,ye||'',marked||''],([key,a,b])=>
      !!api.tji_matches_spelling_prefix(key.addr,a.addr,b.addr)),
    spellingCompletions:(prefix,history,mode,style)=>withBuffers([prefix,history],([s,h])=>
      choices(api.tji_spelling_completions(dict,s.addr,h.addr,mode,style))),
    handPrefix:raw=>withBuffers([raw],([s])=>api.tji_score_handwriting_prefix(dict,s.addr)),
    handwrittenWords:(...p)=>words('tji_handwritten_words',...p),
    completions:(...p)=>words('tji_handwriting_suggestions',...p),recognize,recognizeStrong:paths=>recognize(paths,true),suffix,space};
}
