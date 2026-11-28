// Use the Android IPA completion vocabulary with a chart and an ASCII input scheme.
(() => {
  const initials = 'p pʰ b m ɸ f w t tʰ d n l ts tsʰ dz s z tɕ tɕʰ dʑ ɕ ʑ ȵ j k kʰ ɡ ŋ x ɣ ħ ʕ h ʔ'.split(' ');
  const vowels = [
    ['i',10,13],['y',24,13],['ɨ',49,13],['ʉ',62,13],['ɯ',75,13],['u',89,13],
    ['e',22,37],['ə',56,49],['ɤ',75,37],['o',89,37],
    ['ɛ',34,62],['ɔ',89,62],['æ',46,85],['a',61,85],['ɑ',89,85]
  ];
  const vowelMark='\u0303';
  const vowelPattern=/[iyɨʉɯueəɤoɛɔæaɑɿ]\p{M}*/gu;
  const codes = Object.assign(Object.create(null), {
    ph:'pʰ',th:'tʰ',kh:'kʰ',tsh:'tsʰ',tjh:'tɕʰ',tj:'tɕ',dj:'dʑ',sj:'ɕ',zj:'ʑ',nj:'ȵ',ng:'ŋ',
    g:'ɡ',gh:'ɣ',hh:'ħ',qh:'ʕ',pf:'ɸ',qq:'ʔ',ih:'ɨ',uy:'ʉ',uh:'ɯ',ee:'ɛ',eh:'ə',eo:'ɤ',oo:'ɔ',aa:'ɑ',ae:'æ',ii:'ɿ', '^h':'ʰ',
    'm:':'m̩','ng:':'ŋ̍'
  });
  const symbolCodes=new Map();
  for(const [key,value] of Object.entries(codes)) symbolCodes.set(value,key);
  const tokens = Object.keys(codes).sort((a,b)=>b.length-a.length);
  const superscript=digits=>digits.replace(/[1-5]/g,digit=>'¹²³⁴⁵'[Number(digit)-1]);
  let lexicon=[],dialects=3,scheme='chart',nasal;
  const recorded=[new Set(),new Set(['ȵ','ħ','ʕ'])];
  const segmentPattern=/tsʰ|tɕʰ|pʰ|tʰ|kʰ|ts|dz|tɕ|dʑ|[¹²³⁴⁵]+|\p{Script=Latin}\p{M}*/gu;
  let recordsLoaded=false;
  function markRecorded(){
    for(const key of area.querySelectorAll('[data-symbol]')){
      const symbol=key.dataset.symbol.normalize('NFD');
      const found=recorded.some((sounds,index)=>(dialects&(1<<index))&&sounds.has(symbol));
      key.classList.toggle('ipa-unattested',recordsLoaded&&Boolean(dialects)&&symbol!=='ʰ'&&!found);
    }
  }
  try{
    const saved=localStorage.getItem('tujia-site-ipa-dialects');
    if(saved!==null && /^[0-3]$/.test(saved))dialects=Number(saved);
    if(localStorage.getItem('tujia-site-ipa-layout')==='ascii')scheme='ascii';
  }catch{}
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/\s/g,'').replaceAll('g','ɡ').replaceAll('’',"'");
  const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const sounds=/[\p{Script=Latin}\p{Lm}]/u;
  function pattern(prefix,nasal,southernH=false) {
    const parts=prefix.match(/[\p{Script=Latin}\p{Lm}]\p{M}*|[¹²³⁴⁵]+|[-']/gu)||[];
    let prev=false, result='^';
    for (const part of parts) {
      const letter=sounds.test(part);
      if(prev&&(letter||part==='-')) result+='[¹²³⁴⁵]*';
      if(southernH&&part==='ħ')result+='(?:ħ|h\\p{M}*)';
      else if(southernH&&part==='ʕ')result+='(?:ʕ|h\\p{M}*(?=[iyeɪʏøɨʉ]))';
      else result+=escape(part);
      if(nasal && part.length===1 && 'aeiouyɑɐəɛɜɤɨɪɔʊʉɯøʌ'.includes(part)) result+='\\u0303?';
      prev=letter;
    }
    return new RegExp(result,'u');
  }
  function lastVowel(value){
    const text=value.normalize('NFD');
    const boundary=text.search(/[\s'’.-][^\s'’.-]*$/u)+1;
    const match=[...text.slice(boundary).matchAll(vowelPattern)].at(-1);
    return match&&{text,index:boundary+match.index,form:match[0]};
  }
  function toggleNasal(value){
    const vowel=lastVowel(value);
    if(!vowel)return value;
    const {text,index,form}=vowel;
    const marked=form.includes(vowelMark)?form.replace(vowelMark,''):form+vowelMark;
    return (text.slice(0,index)+marked+text.slice(index+form.length)).normalize('NFC');
  }
  function convert(raw) {
    let output='';
    for(let i=0;i<raw.length;){
      const rest=raw.slice(i);
      if(rest[0]==='|'){i++;continue;}
      if(rest[0]==='~'){output=toggleNasal(output);i++;continue;}
      const tone=rest.match(/^:([1-5]{2})/);
      if(tone){output+=superscript(tone[1]);i+=tone[0].length;continue;}
      const token=tokens.find(t=>rest.startsWith(t));
      if(token){output+=codes[token];i+=token.length;continue;}
      output+=raw[i++];
    }
    return output.normalize('NFC');
  }
  function fromDraft(value){return scheme==='ascii'?convert(value):value;}
  function readingTone(value,cursor=value.length){return scheme==='ascii' && /:([1-5])?$/.test(value.slice(0,cursor));}
  function backspaceStart(value,cursor){
    const before=value.slice(0,cursor);
    if(scheme!=='ascii'||!before.endsWith('|'))return Math.max(0,cursor-1);
    const segment=before.slice(0,-1).split('|').at(-1);
    const token=segment.match(/:[1-5]{2}$/)?.[0]||tokens.find(code=>segment.endsWith(code))||Array.from(segment).at(-1)||'';
    return cursor-1-token.length;
  }
  window.keyboardIPA={fromDraft,readingTone,backspaceStart,acceptsKey(key){
    return scheme==='ascii' && (/^[~:|^]$/.test(key)||(/^[1-5]$/.test(key)&&readingTone(draft.value,draft.selectionEnd)));
  }};
  function paintNasal(){
    if(!nasal)return;
    const vowel=lastVowel(fromDraft(draft.value.slice(0,draft.selectionEnd)));
    nasal.disabled=!vowel;
    nasal.setAttribute('aria-pressed',String(!!vowel?.form.includes(vowelMark)));
  }
  window.ipaCandidates=()=>{
    const raw=fromDraft(draft.value), prefix=normalize(raw);
    paintNasal();
    $('draftBar').classList.toggle('has-text',!!raw);
    candidateItems=[];
    if(raw){
      const matching=lexicon.filter(e=>(e.mask&dialects) && e.normalized===prefix);
      const push=(form,meaning)=>candidateItems.push({form,meaning,short:meaning,fullGloss:meaning,source:'ipa',kind:0,consumed:raw.length,commit:()=>submit(form)});
      push(raw,[...new Set(matching.map(e=>e.meaning))].join('；'));
      candidateItems.push(...learnedChoices(draft.value).filter(x=>x.form!==raw));
      if(prefix.length<=64 && sounds.test(prefix) && dialects){
        const exact=pattern(prefix,false),relaxed=pattern(prefix,true),seen=new Set([prefix]),a=[],b=[];
        const southernH=/[ħʕ]/u.test(prefix);
        const southernExact=southernH?pattern(prefix,false,true):exact;
        const southernRelaxed=southernH?pattern(prefix,true,true):relaxed;
        for(const entry of lexicon){if(!(entry.mask&dialects)||seen.has(entry.normalized))continue;
          if((entry.mask&2?southernExact:exact).test(entry.normalized)){a.push(entry);seen.add(entry.normalized)}
          else if((entry.mask&2?southernRelaxed:relaxed).test(entry.normalized)){b.push(entry);seen.add(entry.normalized)}
        }
        for(const entry of [...a,...b])push(entry.ipa,entry.meaning);
      }
    }
    showCandidatePage(0);
  };
  fetch('ipa-completions.tsv').then(r=>{if(!r.ok)throw Error('IPA vocabulary unavailable');return r.text()}).then(text=>{
    lexicon=text.split('\n').filter(s=>s&&!s.startsWith('#')).map(line=>{const [mask,ipa,...rest]=line.split('\t');return {mask:Number(mask),ipa:ipa.replace(/\s/g,''),meaning:rest.join('\t'),normalized:normalize(ipa)}});
    for(const {mask,normalized} of lexicon){
      for(const part of normalized.match(segmentPattern)||[]){
        const sound=part.replaceAll('\u0303','');
        if(mask&1)recorded[0].add(sound);
        if(mask&2)recorded[1].add(sound);
      }
    }
    recorded[0].delete('ʔ');
    recordsLoaded=true;
    markRecorded();
    window.tujiaIpaEntries=lexicon; if(mode===3)window.ipaCandidates();
  }).catch(()=>{$('ipa-load-status').textContent='音标词库加载失败';});

  const area=$('ipaKeys');
  const toolbar=node('div','','ipa-toolbar');
  const shortcuts=node('input','');shortcuts.type='checkbox';shortcuts.id='ipa-shortcuts';
  shortcuts.checked=scheme==='ascii';
  shortcuts.onchange=()=>setScheme(shortcuts.checked?'ascii':'chart');
  const shortcutLabel=node('label','');shortcutLabel.append(shortcuts,node('span','显示组合键'));
  const dialectSelect=node('select','');dialectSelect.setAttribute('aria-label','音标补全词库');
  for(const [mask,name] of [[1,'北部'],[2,'南部'],[3,'南北部'],[0,'关闭补全']]){
    const option=node('option',name);option.value=mask;dialectSelect.append(option);
  }
  dialectSelect.value=dialects;
  dialectSelect.onchange=()=>{
    dialects=Number(dialectSelect.value);
    try{localStorage.setItem('tujia-site-ipa-dialects',String(dialects))}catch{}
    markRecorded();candidates();
  };
  const dictionaryLabel=node('label','');dictionaryLabel.append(node('span','音标补全词库'),dialectSelect);
  toolbar.append(shortcutLabel,dictionaryLabel,node('small','词库用于补全。灰字表示所选方言中少见或未见记录的音，仍可输入。','ipa-dictionary-note'));
  const hint=node('p','','ipa-hint');
  for(const [keys,label] of [['zj',' → ʑ'],['eo',' → ɤ'],['kh',' → kʰ'],[':55',' → ⁵⁵'],['~','加鼻化'],['|','分隔组合']]){
    const item=node('span','');item.append(node('kbd',keys),' ',node('span',label));hint.append(item);
  }
  const chart=node('div','','ipa-chart'),tones=node('div','','ipa-tones');
  const status=node('span','','ipa-status');status.id='ipa-load-status';status.setAttribute('role','status');
  area.append(chart,tones,toolbar,hint,status);
  function setScheme(next){
    if(next===scheme)return;
    if(draft.value)submit(fromDraft(draft.value));
    scheme=next;
    try{localStorage.setItem('tujia-site-ipa-layout',scheme)}catch{}
    rebuild();candidates();
  }
  function preserveDraft(key){key.addEventListener('pointerdown',event=>event.preventDefault());return key;}
  function soundKey(ipa,code){
    const key=preserveDraft(button('',()=>editKey(scheme==='ascii'?(code||ipa)+'|':ipa),'key ipa-sound'));
    key.dataset.symbol=ipa;key.setAttribute('aria-label',ipa);
    key.append(node('span',ipa,'ipa-glyph'));
    if(scheme==='ascii'&&code&&code!==ipa)key.append(node('kbd',code));
    return key;
  }
  function addModifiers(grid){
    const aspiration=soundKey('ʰ','^h');
    aspiration.setAttribute('aria-label','送气');
    nasal=preserveDraft(button('',()=>{
      const cursor=draft.selectionEnd,before=draft.value.slice(0,cursor);
      if(scheme==='ascii'){editKey('~|');return;}
      const marked=toggleNasal(before);
      draft.setRangeText(marked,0,cursor,'end');change(draft.value);
    },'key ipa-sound nasal-key'));
    nasal.id='ipa-nasal';
    nasal.setAttribute('aria-label','鼻化');
    nasal.append(node('span','◌̃','ipa-glyph'));
    if(scheme==='ascii')nasal.append(node('kbd','~'));
    grid.append(aspiration,nasal);
  }
  function buildVowelChart(){
    const group=node('section','','ipa-vowels');
    group.setAttribute('aria-label','元音图');
    const frame=node('div','','vowel-frame'),axis=node('div','','vowel-axis'),plot=node('div','','vowel-plot');
    for(const label of ['前','央','后'])axis.append(node('span',label));
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
    svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
    path.setAttribute('d','M10 13H89V85H46L34 62L22 37ZM22 37H89M34 62H89M49 13L61 85');
    path.setAttribute('vector-effect','non-scaling-stroke');svg.append(path);plot.append(svg);
    const extraVowels=[['ɿ',8,85,true],['m̩',18,85,true],['ŋ̍',28,85,true]];
    for(const [ipa,x,y,isExtra] of [...vowels,...extraVowels]){
      const key=soundKey(ipa,symbolCodes.get(ipa));
      if(isExtra)key.classList.add('vowel-extra-key');
      key.style.setProperty('--x',x+'%');key.style.setProperty('--y',y+'%');plot.append(key);
    }
    frame.append(axis,plot);group.append(frame);
    return group;
  }
  function rebuild(){
    hint.hidden=scheme!=='ascii';
    const initialGroup=node('section','','ipa-initials'),grid=node('div','','initial-grid');
    initialGroup.setAttribute('aria-label','声母');
    initialGroup.append(grid);
    for(const ipa of initials)grid.append(soundKey(ipa,symbolCodes.get(ipa)));
    addModifiers(grid);
    chart.replaceChildren(initialGroup,buildVowelChart());
    const values=['55','21','53','35','33','13'];
    const toneRow=node('div','','ipa-tone-row');
    for(const digits of values)toneRow.append(soundKey(superscript(digits),':'+digits));
    const utilities=node('div','','ipa-utilities');
    utilities.append(preserveDraft(button('空格',()=>{
      if(draft.value)submit(fromDraft(draft.value));else submit(' ');
    },'key ipa-action')));
    tones.setAttribute('role','group');tones.setAttribute('aria-label','声调');
    tones.replaceChildren(toneRow,utilities);
    markRecorded();
    paintNasal();
  }
  $('ipaMode').onclick=()=>{choose(3);rebuild();candidates()};
  draft.addEventListener('select',paintNasal);
})();
