(() => {
  const asr='https://tujianlp-tujia-asr-demo.ms.show/gradio_api/call/transcribe';
  const tts='https://tujianlp-tujia-tts-demo.ms.show/gradio_api/call/_fmt';
  let blob=null,stream=null,recorder=null,chunks=[],timer,preview;
  const status=$('voiceStatus'),run=$('voiceRun'),record=$('voiceRecord');
  function tell(message){status.textContent=message}
  function audioFile(file){blob=file;if(preview)URL.revokeObjectURL(preview);preview=URL.createObjectURL(file);$('voiceAudio').src=preview;$('voiceAudio').hidden=false;run.disabled=false;tell('音频已准备好，可以开始识别。')}
  function cleanup(){clearTimeout(timer);stream?.getTracks().forEach(t=>t.stop());stream=null;record.textContent='开始录音'}
  record.onclick=async()=>{
    if(recorder?.state==='recording'){recorder.stop();return}
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){tell('浏览器无法录音，请上传音频。');return}
    try{stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];
      const type=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported(t));
      recorder=type?new MediaRecorder(stream,{mimeType:type}):new MediaRecorder(stream);
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
      recorder.onstop=()=>{const file=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});cleanup();recorder=null;if(file.size)audioFile(file);else tell('没有录到声音，请重试。')};
      recorder.start();record.textContent='结束录音';tell('正在录音，最长 30 秒。');timer=setTimeout(()=>{if(recorder?.state==='recording')recorder.stop()},30000);
    }catch{cleanup();tell('无法访问麦克风，请检查权限或上传音频。')}
  };
  $('voiceFile').onchange=e=>{const f=e.target.files[0];if(f)audioFile(f);e.target.value=''};
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
  run.onclick=async()=>{if(!blob)return;if(blob.size>5*1024*1024){tell('音频超过 5 MB，请缩短后重试。');return}run.disabled=true;record.disabled=true;tell('正在联网识别，可能需要几十秒…');
    try{const data=await gradio(asr,[await dataUrl(blob),0,true,30]);const obj=typeof data[0]==='string'?JSON.parse(data[0]):data[0];if(!obj?.ok)throw Error(obj?.error||'识别失败');if(!obj.text_sup)throw Error('没有识别到音节，请重试');result(obj.text_sup);tell('识别完成，可选择结果输入。')}
    catch(e){tell(e.message||'识别失败，请检查网络。')}finally{run.disabled=false;record.disabled=false}
  };
  $('voiceSpeak').onclick=async()=>{
    const text=output.value.trim(),speak=$('voiceSpeak'),state=$('voiceSpeechStatus');
    if(!text){state.textContent='请先输入要朗读的拼音或音标。';return}
    speak.disabled=true;state.textContent='正在生成语音…';
    try{const data=await gradio(tts,[text,'auto',1.0]);const link=data?.[0]?.url;if(!link||new URL(link).origin!=='https://tujianlp-tujia-tts-demo.ms.show')throw Error('没有生成音频');$('voiceSpeechAudio').src=link;$('voiceSpeechAudio').hidden=false;state.textContent='语音已生成。'}
    catch(e){state.textContent=e.message||'语音生成失败，请重试。'}finally{speak.disabled=false}
  };
  $('voiceMode').onclick=()=>{const panel=$('voicePanel');panel.hidden=!panel.hidden;$('voiceMode').setAttribute('aria-pressed',String(!panel.hidden));if(!panel.hidden)panel.scrollIntoView({block:'nearest'})};
  window.addEventListener('pagehide',cleanup);
  function resize(){window.parent.postMessage({type:'keyboard-height',height:Math.max(740,Math.ceil($('play').getBoundingClientRect().bottom+window.scrollY+30))},location.origin)}
  new ResizeObserver(resize).observe($('play'));window.addEventListener('load',resize);
})();
