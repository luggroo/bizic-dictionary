// Use the Android IPA completion vocabulary with a chart and an ASCII input scheme.
(() => {
  const initials = [
    ['唇音','p pʰ b m ɸ f w'], ['舌尖音','t tʰ d n l'],
    ['齿龈音','ts tsʰ dz s z'], ['龈腭音','tɕ tɕʰ dʑ ɕ ʑ ȵ j'],
    ['软腭音','k kʰ ɡ ŋ x ɣ'], ['喉音','h ʔ']
  ];
  const vowels = [
    ['i',10,13],['y',24,13],['ɨ',49,13],['ɯ',75,13],['u',89,13],
    ['e',20,37],['ə',53,49],['ɤ',75,37],['o',89,37],
    ['ɛ',28,62],['ɔ',89,62],['æ',37,84],['a',54,85],['ɑ',89,85]
  ];
  const vowelMark='\u0303';
  const vowelPattern=/[iyɨɯueəɤoɛɔæaɑɿ]\p{M}*/gu;
  const codes = Object.assign(Object.create(null), {
    ph:'pʰ',th:'tʰ',kh:'kʰ',tsh:'tsʰ',tjh:'tɕʰ',tj:'tɕ',dj:'dʑ',sj:'ɕ',zj:'ʑ',nj:'ȵ',ng:'ŋ',
    g:'ɡ',gh:'ɣ',pf:'ɸ',qq:'ʔ',ih:'ɨ',uh:'ɯ',ee:'ɛ',eh:'ə',eo:'ɤ',oo:'ɔ',aa:'ɑ',ae:'æ',ii:'ɿ', '^h':'ʰ',
    'm:':'m̩','ng:':'ŋ̍'
  });
  const symbolCodes=new Map();
  for(const [key,value] of Object.entries(codes)) symbolCodes.set(value,key);
  const tokens = Object.keys(codes).sort((a,b)=>b.length-a.length);
  const superscript=digits=>digits.replace(/[1-5]/g,digit=>'¹²³⁴⁵'[Number(digit)-1]);
  let lexicon=[],dialects=1,scheme='chart',nasal;
  try{
    const saved=localStorage.getItem('tujia-site-ipa-dialects');
    if(saved!==null && /^[0-3]$/.test(saved))dialects=Number(saved);
    if(localStorage.getItem('tujia-site-ipa-layout')==='ascii')scheme='ascii';
  }catch{}
  const normalize=s=>s.toLowerCase().normalize('NFD').replace(/\s/g,'').replaceAll('g','ɡ').replaceAll('’',"'");
  const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const sounds=/[\p{Script=Latin}\p{Lm}]/u;
  function pattern(prefix,nasal) {
    const parts=prefix.match(/[\p{Script=Latin}\p{Lm}]\p{M}*|[¹²³⁴⁵]+|[-']/gu)||[];
    let prev=false, result='^';
    for (const part of parts) {
      const letter=sounds.test(part);
      if(prev&&(letter||part==='-')) result+='[¹²³⁴⁵]*';
      result+=escape(part);
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
  window.keyboardIPA={fromDraft,readingTone,acceptsKey(key){
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
        for(const entry of lexicon){if(!(entry.mask&dialects)||seen.has(entry.normalized))continue;
          if(exact.test(entry.normalized)){a.push(entry);seen.add(entry.normalized)}
          else if(relaxed.test(entry.normalized)){b.push(entry);seen.add(entry.normalized)}
        }
        for(const entry of [...a,...b])push(entry.ipa,entry.meaning);
      }
    }
    showCandidatePage(0);
  };
  fetch('ipa-completions.tsv').then(r=>{if(!r.ok)throw Error('IPA vocabulary unavailable');return r.text()}).then(text=>{
    lexicon=text.split('\n').filter(s=>s&&!s.startsWith('#')).map(line=>{const [mask,ipa,...rest]=line.split('\t');return {mask:Number(mask),ipa:ipa.replace(/\s/g,''),meaning:rest.join('\t'),normalized:normalize(ipa)}});
    window.tujiaIpaEntries=lexicon; if(mode===3)window.ipaCandidates();
  }).catch(()=>{$('ipa-load-status').textContent='音标词库加载失败';});

  const area=$('ipaKeys');
  const toolbar=node('div','','ipa-toolbar'),schemes=node('div','','ipa-schemes');
  const chartChoice=button('音系图',()=>setScheme('chart'));
  const asciiChoice=button('组合键',()=>setScheme('ascii'));
  schemes.append(chartChoice,asciiChoice);
  const dialectSelect=node('select','');dialectSelect.setAttribute('aria-label','音标补全方言');
  for(const [mask,name] of [[1,'北部'],[2,'南部'],[3,'南北部'],[0,'关闭补全']]){
    const option=node('option',name);option.value=mask;dialectSelect.append(option);
  }
  dialectSelect.value=dialects;
  dialectSelect.onchange=()=>{
    dialects=Number(dialectSelect.value);
    try{localStorage.setItem('tujia-site-ipa-dialects',String(dialects))}catch{}
    rebuild();candidates();
  };
  toolbar.append(schemes,dialectSelect);area.append(toolbar);
  const hint=node('p','','ipa-hint');
  for(const [keys,label] of [['zj',' → ʑ'],['eo',' → ɤ'],['kh',' → kʰ'],[':55',' → ⁵⁵'],['~','加鼻化'],['|','分隔组合']]){
    const item=node('span','');item.append(node('kbd',keys),' ',node('span',label));hint.append(item);
  }
  const chart=node('div','','ipa-chart'),tones=node('div','','ipa-tones');
  const status=node('span','','ipa-status');status.id='ipa-load-status';status.setAttribute('role','status');
  area.append(hint,chart,tones,status);
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
  function buildVowelChart(){
    const group=node('section','','ipa-vowels');
    const heading=node('div','','vowel-heading');
    const modifiers=node('div','','vowel-modifiers');
    const aspiration=soundKey('ʰ','^h');
    aspiration.setAttribute('aria-label','送气');
    nasal=preserveDraft(button('',()=>{
      const cursor=draft.selectionEnd,before=draft.value.slice(0,cursor);
      if(scheme==='ascii'){editKey('~|');return;}
      const marked=toggleNasal(before);
      draft.setRangeText(marked,0,cursor,'end');change(draft.value);
    },'key nasal-key'));
    nasal.id='ipa-nasal';
    const mark=node('span','◌̃','ipa-glyph');mark.setAttribute('aria-hidden','true');
    nasal.append(mark,node('span','鼻化'));
    if(scheme==='ascii')nasal.append(node('kbd','~'));
    modifiers.append(aspiration,nasal);
    heading.append(node('h3','元音图'),modifiers);group.append(heading);
    const frame=node('div','','vowel-frame'),axis=node('div','','vowel-axis'),plot=node('div','','vowel-plot');
    for(const label of ['前','央','后'])axis.append(node('span',label));
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');
    svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
    path.setAttribute('d','M10 13H89V85H42ZM20 37H89M31 62H89M49 13L60 85');
    path.setAttribute('vector-effect','non-scaling-stroke');svg.append(path);plot.append(svg);
    for(const [ipa,x,y] of vowels){
      const key=soundKey(ipa,symbolCodes.get(ipa));
      key.style.setProperty('--x',x+'%');key.style.setProperty('--y',y+'%');plot.append(key);
    }
    frame.append(axis,plot);group.append(frame);
    const extra=node('div','','vowel-extra');
    extra.append(node('span','舌尖'),soundKey('ɿ',symbolCodes.get('ɿ')),node('span','成节鼻音'),soundKey('m̩','m:'),soundKey('ŋ̍','ng:'));
    group.append(extra);
    return group;
  }
  function rebuild(){
    chartChoice.setAttribute('aria-pressed',String(scheme==='chart'));
    asciiChoice.setAttribute('aria-pressed',String(scheme==='ascii'));
    hint.hidden=scheme!=='ascii';
    const initialGroup=node('section','','ipa-initials'),grid=node('div','','initial-grid');
    initialGroup.append(node('h3','声母'),grid);
    for(const [caption,list] of initials){
      const line=node('div','','initial-row');line.append(node('span',caption,'initial-label'));
      for(const ipa of list.split(' '))line.append(soundKey(ipa,symbolCodes.get(ipa)));
      grid.append(line);
    }
    chart.replaceChildren(initialGroup,buildVowelChart());
    const values=dialects===2?['33','21','55','13']:['55','21','53','35','33','13'];
    const toneRow=node('div','','ipa-tone-row');
    for(const digits of values)toneRow.append(soundKey(superscript(digits),':'+digits));
    const utilities=node('div','','ipa-utilities');
    utilities.append(preserveDraft(button('空格',()=>{
      if(draft.value)submit(fromDraft(draft.value));else submit(' ');
    },'key ipa-action')),preserveDraft(button('⌫',()=>editKey('⌫'),'key ipa-action')));
    tones.replaceChildren(node('h3','声调'),toneRow,utilities);
    paintNasal();
  }
  $('ipaMode').onclick=()=>{choose(3);rebuild();candidates()};
  $('voiceMode').addEventListener('click',()=>{if($('voicePanel').hidden)return;setMore(false)});
  draft.addEventListener('select',paintNasal);
})();
