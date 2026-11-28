(() => {
  const asr='https://tujianlp-tujia-asr-demo.ms.show/gradio_api/call/transcribe';
  const tts='https://tujianlp-tujia-tts-demo.ms.show/gradio_api/call/_fmt';
  let pendingAudio=null,preview,capture=null,recognizing=false;
  const status=$('voiceStatus'),run=$('voiceRun'),record=$('voiceRecord'),upload=$('voiceFile'),recordLabel=$('voiceRecordLabel');
  function tell(message){status.textContent=message}
  function showMic(state,label){record.dataset.state=state;recordLabel.textContent=label}
  function syncActions(){
    record.disabled=recognizing;
    upload.disabled=Boolean(capture)||recognizing;
    run.hidden=!pendingAudio;
    run.disabled=upload.disabled||!pendingAudio;
  }
  function previewAudio(file){
    if(preview)URL.revokeObjectURL(preview);
    preview=URL.createObjectURL(file);
    $('voiceAudio').src=preview;
    $('voiceAudio').hidden=false;
  }
  function stopTracks(stream){stream?.getTracks().forEach(track=>track.stop())}
  function releaseMic(current){
    clearTimeout(current.timer);
    stopTracks(current.stream);
    current.stream=null;
  }
  function clearCapture(current){
    capture=null;
    releaseMic(current);
    showMic('idle','按住说话');
    syncActions();
  }
  function transcribeCapture(current){
    clearCapture(current);
    if(!current.file.size){tell('没有录到声音，请重试。');return}
    previewAudio(current.file);
    recognize(current.file);
  }
  async function beginCapture(control){
    if(capture||recognizing)return;
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){tell('浏览器无法录音，请上传音频。');return}
    const current={control};
    capture=current;
    showMic('waiting','正在打开麦克风');
    tell(control==='activation'?'麦克风打开后开始录音。':'请保持按住，麦克风打开后开始录音。');
    syncActions();
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(capture!==current){stopTracks(stream);return}
      current.stream=stream;
      const type=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported(t));
      const recorder=type?new MediaRecorder(stream,{mimeType:type}):new MediaRecorder(stream);
      const chunks=[];
      current.recorder=recorder;
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
      recorder.onerror=()=>{
        if(capture!==current)return;
        clearCapture(current);
        tell('录音中断，请重试。');
      };
      recorder.onstop=()=>{
        if(capture!==current)return;
        releaseMic(current);
        current.file=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
        if(current.released){transcribeCapture(current);return}
        showMic('ready','录音已满 30 秒');
        tell(control==='activation'?'再按一次麦克风开始识别。':'松开麦克风开始识别。');
      };
      recorder.start();
      showMic('recording','正在录音');
      tell(control==='activation'?'再按一次麦克风结束录音并识别。':'松手后自动识别。');
      current.timer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop()},30000);
    }catch{
      if(capture!==current)return;
      clearCapture(current);
      tell('无法访问麦克风，请检查权限或上传音频。');
    }
  }
  function endCapture(control,discard=false){
    const current=capture;
    if(!current||current.control!==control||current.released)return;
    if(discard||!current.recorder){
      clearCapture(current);
      tell(discard?'录音已取消。':'请按住麦克风，等录音开始后再松手。');
      return;
    }
    current.released=true;
    if(current.file)transcribeCapture(current);
    else if(current.recorder.state==='recording')current.recorder.stop();
  }
  record.addEventListener('pointerdown',event=>{
    if(!event.isPrimary||event.button!==0)return;
    event.preventDefault();
    record.setPointerCapture(event.pointerId);
    beginCapture(event.pointerId);
  });
  record.addEventListener('pointerup',event=>endCapture(event.pointerId));
  record.addEventListener('pointercancel',event=>endCapture(event.pointerId,true));
  record.addEventListener('lostpointercapture',event=>endCapture(event.pointerId,true));
  record.addEventListener('contextmenu',event=>event.preventDefault());
  record.addEventListener('keydown',event=>{
    if(event.key!==' '&&event.key!=='Enter')return;
    event.preventDefault();
    if(!event.repeat)beginCapture(event.key);
  });
  record.addEventListener('keyup',event=>{
    if(event.key!==' '&&event.key!=='Enter')return;
    event.preventDefault();
    endCapture(event.key);
  });
  record.addEventListener('blur',()=>{
    if(capture?.control===' '||capture?.control==='Enter')endCapture(capture.control,true);
  });
  record.addEventListener('click',event=>{
    if(event.detail!==0)return;
    if(capture?.control==='activation')endCapture('activation');
    else beginCapture('activation');
  });
  upload.onchange=e=>{
    const file=e.target.files[0];
    if(file){pendingAudio=file;previewAudio(file);syncActions();tell('音频已准备好，可以开始识别。')}
    e.target.value='';
  };
  const dataUrl=file=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('无法读取音频'));reader.readAsDataURL(file)});
  async function gradio(endpoint,values){
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:values})});
    if(!response.ok){const detail=(await response.text()).slice(0,250);throw Error('服务连接失败（'+response.status+'）'+(detail.includes('SDK Token')?'：服务拒绝了浏览器请求':''));}const first=await response.json();
    if(!first.event_id)throw Error(first.error||'服务没有返回任务编号');
    const events=await fetch(endpoint+'/'+encodeURIComponent(first.event_id));if(!events.ok)throw Error('获取识别结果失败');
    const reader=events.body.getReader(),decoder=new TextDecoder();let pending='';
    while(true){const {value,done}=await reader.read();pending+=decoder.decode(value||new Uint8Array(),{stream:!done});
      let boundary;while((boundary=pending.search(/\r?\n\r?\n/))>=0){const chunk=pending.slice(0,boundary);pending=pending.slice(boundary).replace(/^\r?\n\r?\n/,'');
        const event=chunk.match(/^event:\s*(.+)$/m)?.[1],data=chunk.match(/^data:\s*(.+)$/m)?.[1];
        if(event==='error')throw Error('服务处理失败，请重试');if(event==='complete'&&data)return JSON.parse(data);
      }if(done)break;
    }throw Error('服务未返回结果');
  }
  const key=(s,toned=false)=>s.toLowerCase().normalize('NFD').replace(/[1-5]/g,c=>'¹²³⁴⁵'[+c-1]).replace(toned?/[^\p{L}\p{M}¹²³⁴⁵]/gu:/[^\p{L}\p{M}]/gu,'').replace(/g/g,'ɡ');
  const tones=s=>(s.replace(/[1-5]/g,c=>'¹²³⁴⁵'[+c-1]).match(/[¹²³⁴⁵]+/g)||[]).join('/');
  function dist(a,b){let p=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const q=[i];for(let j=1;j<=b.length;j++)q[j]=Math.min(q[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=q}return p[b.length]}
  function matches(text){const h=key(text),t=tones(text),full=key(text,true);if(h.length<2||h.length>32||text.trim().split(/\s+/).length>5)return[];const max=h.length<5?0:h.length<9?1:2,out=[],seen=new Set();
    for(const entry of window.tujiaIpaEntries||[]){if(!(entry.mask&1)||entry.ipa.startsWith('-'))continue;const c=key(entry.ipa),ct=tones(entry.ipa);if(Math.abs(c.length-h.length)>max||t&&ct&&t.split('/').length!==ct.split('/').length)continue;const d=dist(h,c);if(d>max||d>0&&t!==ct)continue;out.push({...entry,d,tone:key(entry.ipa,true)===full})}
    out.sort((a,b)=>a.d-b.d||Number(b.tone)-Number(a.tone));return out.filter(e=>{if(seen.has(e.ipa))return false;seen.add(e.ipa);return true}).slice(0,12)
  }
  let resultText='';
  function result(text){resultText=text;$('voiceRaw').textContent=text;$('voiceResult').hidden=false;const list=$('voiceMatches');list.replaceChildren();
    for(const e of matches(text)){const b=button('',()=>insertVoice(e.ipa));b.append(node('b',e.ipa),node('span',e.meaning));list.append(b)}
    if(!list.childNodes.length)list.textContent='没有足够接近的词，可以使用原始结果。';
  }
  function insertVoice(value){if(draft.value)submit(draft.value);submit(value)}
  $('voiceInsert').onclick=()=>{if(resultText)insertVoice(resultText)};
  async function recognize(file){
    if(recognizing)return;
    pendingAudio=null;
    if(file.size>5*1024*1024){syncActions();tell('音频超过 5 MB，请缩短后重试。');return}
    recognizing=true;
    showMic('recognizing','正在识别');
    syncActions();
    tell('正在联网识别，可能需要几十秒…');
    try{const data=await gradio(asr,[await dataUrl(file),0,true,30]);const obj=typeof data[0]==='string'?JSON.parse(data[0]):data[0];if(!obj?.ok)throw Error(obj?.error||'识别失败');if(!obj.text_sup)throw Error('没有识别到音节，请重试');result(obj.text_sup);tell('识别完成，可选择结果输入。')}
    catch(e){pendingAudio=file;tell(e.message||'识别失败，请检查网络。')}
    finally{recognizing=false;showMic('idle','按住说话');syncActions()}
  }
  run.onclick=()=>{if(pendingAudio)recognize(pendingAudio)};
  $('voiceSpeak').onclick=async()=>{
    const text=output.value.trim(),speak=$('voiceSpeak'),state=$('voiceSpeechStatus');
    if(!text){state.textContent='请先输入要朗读的拼音或音标。';return}
    speak.disabled=true;state.textContent='正在生成语音…';
    try{const data=await gradio(tts,[text,'auto',1.0]);const link=data?.[0]?.url;if(!link||new URL(link).origin!=='https://tujianlp-tujia-tts-demo.ms.show')throw Error('没有生成音频');$('voiceSpeechAudio').src=link;$('voiceSpeechAudio').hidden=false;state.textContent='语音已生成。'}
    catch(e){state.textContent=e.message||'语音生成失败，请重试。'}finally{speak.disabled=false}
  };
  window.addEventListener('pagehide',()=>{if(capture)clearCapture(capture)});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&capture)endCapture(capture.control,true)});
  function resize(){window.parent.postMessage({type:'keyboard-height',height:Math.ceil($('play').getBoundingClientRect().bottom+window.scrollY+12)},location.origin)}
  new ResizeObserver(resize).observe($('play'));window.addEventListener('load',resize);
})();
