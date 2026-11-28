(() => {
 const translations={
  '学习个人词语':'Learn personal words','清除个人词库':'Clear personal dictionary','记事本':'Notepad','输出设置':'Output settings','拼音':'Pinyin','音标':'IPA','语音':'Voice','设置':'Settings',
  '上一页候选':'Previous candidates','下一页候选':'Next candidates','输入草稿':'Composition','记事本正文':'Notepad',
  '用叶氏拼音':'Ye romanization','用带调号拼音':'Tone-marked spelling','用汉字谐音':'Chinese characters',
  '输出形式':'Output form','更多设置':'More settings','返回拼音':'Back to typing','完成':'Done',
  '长按元音键可选调号。':'Hold a vowel to choose a tone.','空格':'Space','北部':'Northern','南部':'Southern',
  '音标补全：':'IPA suggestions:','北部土家语语音输入':'Northern Tujia voice input',
  '录音或上传短音频，识别为国际音标。':'Record or upload a short clip to transcribe it in IPA.',
  '开始识别时，音频会发送至 TujiaNLP 的在线服务。':'Audio is sent to TujiaNLP when you start transcription.',
  '开始录音':'Start recording','结束录音':'Stop recording','上传音频':'Upload audio','开始识别':'Transcribe',
  '录音最长 30 秒。':'Recordings can be up to 30 seconds.','识别结果':'Transcription','输入原始结果':'Insert transcription',
  '词库推荐':'Dictionary suggestions','语音合成':'Speech synthesis','朗读记事本':'Read notepad aloud',
  '将记事本中的拼音或音标发送至 TujiaNLP，生成语音。':'Send the notepad’s romanization or IPA to TujiaNLP to generate speech.',
  '在这里输入土家语…':'Type in Tujia here…','关闭':'Close','复制':'Copy'
 };
 const originals=new WeakMap();let language='zh';
 try{language=window.parent.document.documentElement.lang==='en'?'en':'zh'}catch{}
 function apply(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=walker.nextNode()){
   if(n.parentElement.closest('script,style,#result,#candidates,#voiceRaw,#voiceMatches,#draft'))continue;
   const current=n.nodeValue,record=originals.get(n),source=record?.output===current?record.source:current;
   const clean=source.trim(),translated=language==='en'&&translations[clean];
   const next=translated?source.replace(clean,translated):source;
   originals.set(n,{source,output:next});if(next!==current)n.nodeValue=next;
  }
  for(const el of document.querySelectorAll('[aria-label],[data-placeholder]')){
   for(const attr of ['aria-label','data-placeholder']){if(!el.hasAttribute(attr))continue;const key='source'+attr;const current=el.getAttribute(attr);if(!el[key]||!(Object.values(translations).includes(current)||current===el[key]))el[key]=current;const source=el[key],value=language==='en'?(translations[source]||source):source;if(value!==current)el.setAttribute(attr,value)}
  }
  document.documentElement.lang=language==='en'?'en':'zh-CN';
 }
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})}).observe(document.body,{childList:true,subtree:true,characterData:true});
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='site-language')return;language=e.data.language==='en'?'en':'zh';apply()});
 apply();
})();
