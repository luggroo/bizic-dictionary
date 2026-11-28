(() => {
 const translations={
  '学习个人词语':'Learn personal words','清除个人词库':'Clear personal dictionary','记事本':'Notepad','输出设置':'Output settings','拼音':'Pinyin','音标':'IPA','设置':'Settings',
  '输入法 · 毕兹学堂':'Keyboard · Bizic Academy','显示组合键':'Show key sequences','音标补全词库':'IPA suggestion dictionary','声母':'Initials','元音图':'Vowel chart','前':'Front','央':'Central','后':'Back','声调':'Tones','舌尖':'Apical vowel','成节鼻音':'Syllabic nasals','送气':'Aspirate','鼻化':'Nasalize','分隔组合':'Separate sequences','唇音':'Labial','舌尖音':'Coronal','齿龈音':'Alveolar','龈腭音':'Alveolo-palatal','软腭音':'Velar','喉音':'Glottal',
  '上一页候选':'Previous candidates','下一页候选':'Next candidates','输入草稿':'Composition','记事本正文':'Notepad',
  '用叶氏拼音':'Ye romanization','用带调号拼音':'Tone-marked spelling','用汉字谐音':'Chinese characters',
  '输出形式':'Output form','更多设置':'More settings','返回拼音':'Back to typing','完成':'Done',
  '点调号键给当前音节加调。':'Tap a tone key to mark the current syllable.','空格':'Space','词库用于补全；灰色为所选方言少见或未见记录的音，仍可输入。':'The dictionary supplies suggestions. Gray keys are rare or unattested in the selected variety and can still be used.','北部':'Northern','南部':'Southern',
  '音标补全：':'IPA suggestions:','北部土家语语音输入':'Northern Tujia voice input',
  '语音识别来源':'Speech recognition source','土家语模型项目':'Tujia language model project',
  '录音或上传短音频，识别为国际音标。':'Record or upload a short clip to transcribe it in IPA.',
  '开始识别时，音频会发送至 TujiaNLP 的在线服务。':'Audio is sent to TujiaNLP when you start transcription.',
  '按住说话':'Hold to speak','正在打开麦克风':'Opening microphone','正在录音':'Recording','正在识别':'Transcribing','上传音频':'Upload audio','开始识别':'Transcribe',
  '松手后自动识别，最长录音 30 秒。':'Release to transcribe. Record up to 30 seconds.',
  '请保持按住，麦克风打开后开始录音。':'Keep holding. Recording starts when the microphone is ready.','麦克风打开后开始录音。':'Recording starts when the microphone is ready.',
  '松手后自动识别。':'Release to transcribe.','录音已满 30 秒':'30-second limit reached','松开麦克风开始识别。':'Release to start transcription.',
  '再按一次麦克风结束录音并识别。':'Activate the microphone again to stop and transcribe.','再按一次麦克风开始识别。':'Activate the microphone again to transcribe.',
  '录音已取消。':'Recording canceled.','录音中断，请重试。':'Recording interrupted. Try again.','请按住麦克风，等录音开始后再松手。':'Hold the microphone button until recording starts.',
  '音频已准备好，可以开始识别。':'Audio is ready to transcribe.','没有录到声音，请重试。':'No audio was recorded. Try again.',
  '正在联网识别，可能需要几十秒…':'Transcribing online. This may take a few seconds…','识别完成，可选择结果输入。':'Transcription complete. Choose a result to insert.',
  '识别结果':'Transcription','输入原始结果':'Insert transcription',
  '词库推荐':'Dictionary suggestions','语音合成':'Speech synthesis','朗读记事本':'Read notepad aloud',
  '将记事本中的拼音或音标发送至 TujiaNLP，生成语音。':'Send the notepad’s romanization or IPA to TujiaNLP to generate speech.',
  '在这里输入土家语…':'Type in Tujia here…','关闭':'Close','复制':'Copy'
 };
 const originals=new WeakMap();let language='zh';
 try{language=window.parent.document.documentElement.lang==='en'?'en':'zh'}catch{}
 function apply(){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=walker.nextNode()){
   if(n.parentElement.closest('script,style,#result,#candidates,#voiceRaw,#voiceMatches,#draft,#preeditPreview'))continue;
   const current=n.nodeValue,record=originals.get(n),source=record?.output===current?record.source:current;
   const clean=source.trim(),translated=language==='en'&&translations[clean];
   const next=translated?source.replace(clean,translated):source;
   originals.set(n,{source,output:next});if(next!==current)n.nodeValue=next;
  }
  for(const el of document.querySelectorAll('[aria-label],[data-placeholder]')){
   for(const attr of ['aria-label','data-placeholder']){if(!el.hasAttribute(attr))continue;const key='source'+attr;const current=el.getAttribute(attr);if(!el[key]||!(Object.values(translations).includes(current)||current===el[key]))el[key]=current;const source=el[key],value=language==='en'?(translations[source]||source):source;if(value!==current)el.setAttribute(attr,value)}
  }
  document.title=language==='en'?'Keyboard · Bizic Academy':'输入法 · 毕兹学堂';
  document.documentElement.lang=language==='en'?'en':'zh-CN';
 }
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply()})}).observe(document.body,{childList:true,subtree:true,characterData:true});
 window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='site-language')return;language=e.data.language==='en'?'en':'zh';apply()});
 apply();
})();
