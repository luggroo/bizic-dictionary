const $ = id => document.getElementById(id);
const allWords=[...entries,...storyEntries];
const wordById=new Map(allWords.map(w=>[w.id,w]));
const core=openTujiaCore(tujiaCoreData);
for(const row of tujiaCoreData.words.split('\n')){
  const end=row.indexOf('\t'),entry=wordById.get(row.slice(0,end));
  if(!entry)continue;
  const [,word,key,meaning,recommended,aliases,,frequency,,shortGloss,plain,diacritic,units,roman,presentation]=row.split('\t');
  Object.assign(entry,{word,key,meaning,recommended,frequency:Number(frequency),shortGloss,plain,diacritic,
    hanUnits:units.split('|'),aliases:aliases?aliases.split(' '):[],romanAliases:roman?roman.split(' '):[],presentation});
}
let orthography='diacritic', demoSpelling=null, tonePlayback=false;
let handHan=true, handSession=null, handTimer=0, inkRevision=0;
let mode=0, typingMode=0, drafts=['','',''], strokes=[], drawingPointer=null;
try{
  orthography=localStorage.getItem('tujia-orthography')==='ye'?'ye':'diacritic';
  typingMode=mode=localStorage.getItem('tujia-typing-output')==='han'?1:0;
  handHan=localStorage.getItem('tujia-hand-output')!=='spelling';
}catch{}
function spelling(e){return (demoSpelling || orthography)==='diacritic'?e.diacritic:e.word}
const exampleWord=wordById.get('xu213-1-3');
const outputChoices=[
  {form:'ye',name:'用叶氏拼音',sample:exampleWord.word,menuId:'menuSpell'},
  {form:'diacritic',name:'用带调号拼音',sample:exampleWord.diacritic,menuId:'menuMarked'},
  {form:'han',name:'用汉字谐音',sample:exampleWord.recommended,menuId:'menuHan'}
];
const draft=$('draft'), output=$('result'), canvas=$('canvas');
installNoteEditor(output);
function button(label,action,cl=''){
  const el=document.createElement('button');
  el.textContent=label;el.className=cl;el.onclick=action;return el;
}
function node(tag,txt,cl=''){
  const el=document.createElement(tag);el.textContent=txt;el.className=cl;return el;
}
function addOutputChoices(group,onPick){
  for(const {form,name,sample,menuId} of outputChoices){
    const key=button('',()=>onPick(form),'formChoice');
    key.type='button';key.dataset.form=form;
    if(group.id==='menuOutputs')key.id=menuId;
    key.append(node('small',sample,'sample'),node('span',name));
    key.setAttribute('aria-label',name+'，'+sample);
    group.append(key);
  }
}
function markOutput(group,active){
  for(const key of group.children)key.setAttribute('aria-pressed',String(key.dataset.form===active));
}
for(const count of [10,10,9,6]){
  const row=node('div','','ar');
  for(let i=0;i<count;i++)row.append(node('i',''));
  $('art').append(row);
}
function sizeDesktopDock(){
  if(!window.matchMedia?.('(min-width:801px)').matches)return;
  const rect=$('play').getBoundingClientRect();
  const style=$('inputDock').style;
  style.setProperty('--dock-x',(rect.left+5)+'px');
  style.setProperty('--dock-width',(rect.width-10)+'px');
}
function fitVisibleViewport(){
  const viewport=window.visualViewport;
  if(!viewport)return;
  const dock=$('inputDock').style;
  dock.setProperty('--ime-visible-height',viewport.height+'px');
  dock.setProperty('--ime-inset',Math.max(0,window.innerHeight-viewport.offsetTop-viewport.height)+'px');
}
window.visualViewport?.addEventListener('resize',fitVisibleViewport);
window.visualViewport?.addEventListener('scroll',fitVisibleViewport);
function setMore(open){
  $('kbMorePanel').hidden=!open;
  $('kbMore').setAttribute('aria-expanded',String(open));
}
function keyboardOpen(open){
  if(!open){setMore(false);clearTimeout(handTimer);inkRevision++}
  if(open){fitVisibleViewport();sizeDesktopDock();$('formLookup').hidden=true}
  $('keyboardPanel').hidden=!open;
  document.body.classList.toggle('keyboard-open',open);
  output.setAttribute('aria-expanded',String(open));
}
output.setAttribute('aria-controls','keyboardPanel');
output.setAttribute('inputmode','none');
output.onfocus=output.onclick=()=>{keyboardOpen(true);candidates()};
$('hideKeyboard').onclick=()=>{takeOver();keyboardOpen(false);output.blur()};
function choose(i,scroll=false){
  setMore(false);
  if(i!==2){clearTimeout(handTimer);inkRevision++;handSession=null}
  mode=i;
  if(i<2 && !demoActive)typingMode=i;
  render();
  if(scroll)keyboardOpen(true);
  if(scroll && matchMedia('(max-width:800px)').matches)$('play').scrollIntoView({block:'start'});
}
function selectOutput(form,where){
  if(demoActive)takeOver();
  const han=form==='han',hand=mode===2 && where!=='typing';
  if(!han)orthography=form;
  if(!hand || where==='settings')typingMode=han?1:0;
  if(hand || where==='settings')handHan=han;
  try{
    localStorage.setItem('tujia-orthography',orthography);
    if(!hand || where==='settings')localStorage.setItem('tujia-typing-output',han?'han':'spelling');
    if(hand || where==='settings')localStorage.setItem('tujia-hand-output',han?'han':'spelling');
  }catch{}
  if(hand){
    clearTimeout(handTimer);inkRevision++;handSession=null;strokes=[];glyphButtons();setMore(false);render();
  }else choose(typingMode,where==='typing');
}
const learnedKey='tujia-site-learned-words-v1';
let learningEnabled=true;try{learningEnabled=localStorage.getItem('tujia-site-learning')!=='off'}catch{}
let learned=[];try{const data=JSON.parse(localStorage.getItem(learnedKey)||'[]');if(Array.isArray(data))learned=data.filter(x=>x&&typeof x.key==='string'&&typeof x.form==='string').slice(-500)}catch{}
function rememberWord(input,form){
  if(!learningEnabled || !input || !form || /\s/.test(input) || input.length>64 || form.length>128)return;
  const key=input.toLowerCase(),scheme=mode===0?orthography:mode;
  let row=learned.find(x=>x.key===key&&x.form===form&&x.scheme===scheme);
  if(!row){row={key,form,scheme,count:0};learned.push(row)}row.count=Math.min((row.count||0)+1,10000);
  learned=learned.slice(-500);try{localStorage.setItem(learnedKey,JSON.stringify(learned))}catch{}
}
function learnedChoices(value){
  const key=value.toLowerCase(),scheme=mode===0?orthography:mode;
  if(!learningEnabled)return [];
  return learned.filter(x=>x.count>=2&&x.scheme===scheme&&x.key.startsWith(key)).sort((a,b)=>b.count-a.count).map(row=>({form:row.form,short:'',meaning:'',source:'learned',kind:0,consumed:value.length,commit:()=>submit(row.form)}));
}
$('typeMode').onclick=()=>choose(typingMode);
$('handMode').onclick=()=>choose(2);
addOutputChoices($('menuOutputs'),form=>selectOutput(form,'keyboard'));
addOutputChoices($('typingOutputs'),form=>selectOutput(form,'typing'));
addOutputChoices($('orthography'),form=>selectOutput(form,'settings'));
$('menuBackToTyping').onclick=()=>choose(typingMode);
$('kbMore').onclick=()=>setMore($('kbMorePanel').hidden);
const learningControls=node('div','','site-learning-controls'),learningLabel=node('label',''),learningToggle=document.createElement('input');
learningToggle.type='checkbox';learningToggle.checked=learningEnabled;learningLabel.append(learningToggle,document.createTextNode('学习个人词语'));
learningToggle.onchange=()=>{learningEnabled=learningToggle.checked;try{localStorage.setItem('tujia-site-learning',learningEnabled?'on':'off')}catch{}candidates()};
const clearLearned=button('清除个人词库',()=>{learned=[];try{localStorage.removeItem(learnedKey)}catch{}candidates()});
learningControls.append(learningLabel,clearLearned);$('kbMorePanel').append(learningControls);

document.addEventListener('pointerdown',event=>{
  if(!event.target.closest('#kbMore,#kbMorePanel'))setMore(false);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && !$('kbMorePanel').hidden){
    event.preventDefault();setMore(false);$('kbMore').focus({preventScroll:true});
  }
});
function render(){
  const selected=mode;
  $('demoHand').setAttribute('aria-pressed',selected===2);
  $('demoHan').setAttribute('aria-pressed',selected===1);
  $('demoTujia').setAttribute('aria-pressed',selected===0 && !tonePlayback);
  $('demoTone').setAttribute('aria-pressed',selected===0 && tonePlayback);
  $('choices').replaceChildren(...[['手写记音','手写汉字，继续记音','✎']].map(([name,hint,icon])=>{
    const i=2;
    const el=button('',()=>choose(i,true),'choice'+(selected===i?' active':''));
    const info=node('span','');info.append(node('strong',name),node('small',hint));
    el.append(node('span',icon,'icon'),info,node('span',selected===i?'●':'○','check'));
    el.setAttribute('aria-pressed',i===selected);return el;
  }));
  $('typeMode').setAttribute('aria-pressed',String(selected<2));
  $('handMode').setAttribute('aria-pressed',String(selected===2)); $('ipaMode').setAttribute('aria-pressed',String(selected===3));
  const han=mode===2?handHan:mode===1;
  const active=han?'han':demoSpelling||orthography;
  markOutput($('menuOutputs'),active);
  markOutput($('orthography'),active);
  markOutput($('typingOutputs'),selected<2?active:null);
  $('keys').hidden=mode===2||mode===3; $('ipaKeys').hidden=mode!==3; $('hand').hidden=mode!==2;
  $('keyboardPanel').classList.toggle('ipa-mode',mode===3);
  $('menuOutputs').hidden=mode===3;
  $('raw').hidden=true;
  $('inputDock').classList.toggle('ipa-mode',mode===3);
  $('toneKeys').hidden=!(mode===1 || mode===0 && (demoSpelling||orthography)==='diacritic');
  draft.value=drafts[draftSlot()];
  candidates();
  if(mode===2)paint();
}
function draftSlot(){return mode===3?2:mode===2?1:0}
function change(value){
  if(value && mode===2)handSession=null;
  draft.value=value;drafts[draftSlot()]=value;candidates();
}
function wordButton(form, meaning, action, units){
  const el=button('',action,'word');
  el.append(node('small',meaning || ''));
  const label=node('strong','');putHanUnits(label,form,units);el.append(label);
  return el;
}
const memoryKey='tujia-handwritten-forms-v1';
let personalForms=[];
try{
  const stored=JSON.parse(localStorage.getItem(memoryKey)||'[]');
  if(Array.isArray(stored))personalForms=stored.filter(x=>x && typeof x.form==='string' && entries.some(e=>e.id===x.id));
}catch{}
function acceptsForm(entry,form){
  if(entry.recommended===form || entry.aliases.includes(form) || personalForms.some(x=>x.id===entry.id && x.form===form))return true;
  let ends=new Set([0]);
  for(let i=0;i<entry.syllables.length;i++){
    const possible=new Set([entry.hanUnits[i],...(soundVariants[entry.syllables[i]]||''),...(entry.legacyHanUnits?.[i]||'')]);
    const next=new Set();
    for(const offset of ends)for(const unit of possible)if(unit && form.startsWith(unit,offset))next.add(offset+unit.length);
    if(!next.size)return false;
    ends=next;
  }
  return ends.has(form.length);
}
function addFormPicker(box,form){
  const choices=entries.filter(e=>!acceptsForm(e,form));
  if(!choices.length || !/^\p{Script=Han}+$/u.test(form))return;
  const details=node('details','','guide');
  details.append(node('summary','用「'+form+'」查找其他词'));details.open=true;
  details.append(node('p','选一个词，以后用这个字也能找到它。','hint'));
  const filter=document.createElement('input');
  filter.type='search';filter.placeholder='按汉义或拼写找词';filter.setAttribute('aria-label',filter.placeholder);
  const list=node('div','','candidates');
  function refresh(){
    list.replaceChildren();
    for(const entry of choices.filter(e=>searchMatch(e,filter.value)))list.append(wordButton(entry.word,entry.meaning,()=>{
    personalForms.push({form,id:entry.id});
    let message='已记住「'+form+'」的写法';
    try{localStorage.setItem(memoryKey,JSON.stringify(personalForms))}catch{message='已在本次试用中记住「'+form+'」'}
    candidates();keyboardOpen(true);paint();$('playStatus').textContent=message;
  }));
    if(!list.childElementCount)list.append(node('span','没有匹配的词','hint'));
  }
  filter.oninput=refresh;
  details.ontoggle=()=>{if(details.open)refresh()};
  details.append(filter,list);box.append(details);refresh();
}
function searchMatch(entry,query){
  const needle=query.trim().toLowerCase();
  return [entry.word,entry.key,entry.plain,entry.diacritic,...entry.romanAliases,entry.meaning,entry.recommended,...entry.aliases].some(v=>v.includes(needle)) ||
    personalForms.some(x=>x.id===entry.id && x.form.includes(needle));
}
const sentenceWords=['w1585','w2548','w684'].map(id=>entries.find(entry=>entry.id===id));
let firstCommit=null;
let committedContext=null, editRevision=0;
function compositionMode(){return mode===2?(handHan?1:2):mode}
function outputForm(entry){return compositionMode()===1?entry.recommended:spelling(entry)}
function practiceInput(entry){
  if(mode===2)return entry.recommended;
  return mode===1?entry.plain:spelling(entry);
}
function editorContext(){
  const at=output.selectionStart, before=output.value.slice(0,at);
  if(at===output.selectionEnd){
    if(committedContext?.at===at)return committedContext;
  }
  const start=!before.trim()||/[。！？.!?\n]\s*$/u.test(before);
  return {ids:start?'<s>':'',sound:start?'<s>':''};
}
function appendHistory(history,next){
  if(!next)return '';
  if(next==='<s>' && history.split(' ').at(-1)==='<s>')return history;
  return [history,next].filter(Boolean).join(' ').split(' ').slice(-32).join(' ');
}
function submit(value,remainder='',units,choice,previous=editorContext()){
  if(!value)return;
  const start=output.selectionStart,end=output.selectionEnd;
  rememberWord(draft.value,value);
  handSession=null;
  const old=output.value;
  const formatted=bracketHanUnits(core.space(value,old.charCodeAt(start-1)||0,old.charCodeAt(end)||0),units);
  const spaced=formatted.text;
  output.setRangeText(spaced,start,end,'end',formatted.units);
  if(end===old.length)output.scrollTop=output.scrollHeight;
  editRevision++;
  const at=start+spaced.length,closed=/[。！？.!?\n]\s*$/u.test(value);
  let ids=appendHistory(previous.ids,choice?.ids);
  if(closed){
    if(!choice||choice.kind===3)ids=previous.ids;
    ids=appendHistory(ids,'<s>');
  }
  const sound=closed?'<s>':choice?.sound||'';
  committedContext=ids||sound?{at,ids,sound}:null;
  count();change(remainder); saveSiteNote();
}
function count(){$('count').textContent=Array.from(output.value).length+' 字符'}
function saveSiteNote(){try{sessionStorage.setItem('tujia-site-note',output.value)}catch{}}
try{output.value=sessionStorage.getItem('tujia-site-note')||''}catch{}
count();
$('copyNote').onclick=async()=>{try{await navigator.clipboard.writeText(output.value);$('copyNote').textContent='已复制';setTimeout(()=>$('copyNote').textContent='复制',1500)}catch{output.focus()}};
output.oninput=()=>{saveSiteNote();editRevision++;committedContext=null;handSession=null;count();candidates()};
document.addEventListener('selectionchange',()=>{
  if(document.activeElement!==output||!committedContext)return;
  if(output.selectionStart===committedContext.at && output.selectionEnd===committedContext.at)return;
  committedContext=null;handSession=null;candidates();
});
function unitsFromRanges(text,ranges){
  if(!ranges?.length)return;
  const units=[];let from=0;
  for(let i=0;i<ranges.length;i+=2){
    units.push(...Array.from(text.slice(from,ranges[i])),text.slice(ranges[i],ranges[i+1]));from=ranges[i+1];
  }
  return [...units,...Array.from(text.slice(from))];
}
const cardsPerPage=4;
let candidateItems=[],candidatePage=0,candidatePages=[{start:0,widths:[]}];
function paginateCandidates(){
  const width=$('candidates').clientWidth;
  const pages=[{start:0,widths:[]}];
  let used=0;
  const font=parseFloat(getComputedStyle(document.documentElement).fontSize)||16;
  candidateItems.forEach((item,index)=>{
    const em=Array.from(item.form).reduce((sum,ch)=>sum+(/\p{Script=Han}/u.test(ch)?1:.62),0);
    const preferred=width?Math.min(width,Math.max(width/cardsPerPage,em*font*1.2+8)):1;
    if(pages.at(-1).widths.length && used+preferred>(width||cardsPerPage)+.01){
      pages.push({start:index,widths:[]});used=0;
    }
    pages.at(-1).widths.push(preferred);used+=preferred;
  });
  candidatePages=pages;
}
const reading=$('candidateReading');
let readingChoice=null;
function openReading(item){
  if(reading.open)return;
  readingChoice=item;
  const handMatch=item.source==='hand-match';
  $('readChoose').hidden=handMatch;
  $('readOutputs').hidden=!handMatch;
  $('readOutputs').replaceChildren();
  if(handMatch){
    item.prepare();
    addOutputChoices($('readOutputs'),form=>{reading.close();item.replaceWith(form)});
    for(const key of $('readOutputs').children)key.disabled=!item.forms[key.dataset.form];
  }
  putHanUnits($('readForm'),item.form,item.units);
  const meanings=item.readerLines||[item.fullGloss].filter(Boolean);
  $('readMeaning').replaceChildren(...meanings.map(text=>node('p',text)));
  $('readMeaning').hidden=!meanings.length;
  $('readEdits').replaceChildren(...(item.otherEdits||[]).map(edit=>{
    const section=node('div');
    section.append(button('用 '+edit.prefix+'，保留 '+edit.remainder,()=>{reading.close();edit.commit()}));
    if(edit.readerLines.length)section.append(node('p',edit.readerLines.join('、')));
    return section;
  }));
  reading.showModal();
}
$('readBack').onclick=()=>reading.close();
$('readChoose').onclick=()=>{
  const choice=readingChoice;
  reading.close();if(choice?.source!=='hand-match')choice?.commit();
};
reading.addEventListener('close',()=>{readingChoice=null});
function allowReading(el,item){
  let timer,held=false;
  el.addEventListener('pointerdown',event=>{
    clearTimeout(timer);held=false;
    if(event.button===0)timer=setTimeout(()=>{held=true;openReading(item)},520);
  });
  for(const event of ['pointerup','pointercancel','pointerleave'])el.addEventListener(event,()=>clearTimeout(timer));
  el.addEventListener('click',event=>{
    if(held && event.detail){event.preventDefault();event.stopImmediatePropagation();held=false}
  },true);
  el.addEventListener('contextmenu',event=>{event.preventDefault();held=true;openReading(item)});
  el.addEventListener('keydown',event=>{
    if(event.key==='F2'){event.preventDefault();openReading(item)}
  });
  el.setAttribute('aria-keyshortcuts','F2');
}
function fitGlossPairs(){
  for(const label of $('candidates').querySelectorAll('.glossPair')){
    const [left,space,right]=label.children;
    label.classList.remove('tight','packed');
    const room=label.clientWidth;
    if(!room)continue;
    const textWidth=left.scrollWidth+right.scrollWidth;
    if(textWidth+space.getBoundingClientRect().width>room)label.classList.add('tight');
    // Keep the chosen text height for short labels that only just miss one line.
    if(textWidth>room && room/textWidth>=.75){
      label.style.setProperty('--gloss-scale',String((room-.5)/textWidth));
      label.classList.add('packed');
    }
  }
}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(fitGlossPairs).observe($('candidates'));
document.fonts?.ready.then(fitGlossPairs);
window.addEventListener('resize',()=>showCandidatePage(0));
function showCandidatePage(page){
  const box=$('candidates');
  if(page===0)paginateCandidates();
  candidatePage=Math.min(page,candidatePages.length-1);
  const {start,widths}=candidatePages[candidatePage];
  const visible=candidateItems.slice(start,start+widths.length);
  box.style.gridTemplateColumns=widths.map(w=>'minmax(0,'+w+'fr)').join(' ');

  box.replaceChildren(...visible.map(item=>{
    const el=wordButton(item.form,item.short,item.commit,item.units);
    if((item.members||[item]).some(c=>c.source==='exact' && c.kind===0 && c.meaning && c.consumed===draft.value.length) || item.source==='hand-match')el.classList.add('dictionary-match');
    if(item.source==='hand-match' && item.roman){
      const small=el.firstElementChild;
      small.classList.add('hand-match-meta');
      small.replaceChildren(node('span',item.short),node('span',item.roman,'hand-reading'));
    }
    if(/^\p{Script=Han}{2,4}$/u.test(item.form))el.dataset.hanCount=Array.from(item.form).length;
    if(item.shortParts?.length===2){
      const small=el.firstElementChild;small.classList.add('glossPair');
      small.replaceChildren(node('span','¹'+item.shortParts[0]),node('span',' ','glossGap'),node('span','²'+item.shortParts[1]));
    }
    const description=item.shortParts?.length===2?item.shortParts.join('、'):item.short?(item.meaning||item.short):item.kind===1?'汉语':'';
    el.setAttribute('aria-label',[description,item.roman,item.form].filter(Boolean).join('，'));
    const explanation=item.readerLines?.join('；')??item.fullGloss;
    el.title=explanation||'';
    if(explanation && explanation!==description)el.setAttribute('aria-description','汉义　'+explanation);
    allowReading(el,item);
    if(item.id)el.dataset.wordId=item.id;
    if(item.source)el.dataset.source=item.source;el.dataset.consumed=String(item.consumed);
    return el;
  }));
  if(!visible.length && draft.value)box.append(node('span','可继续输入','hint'));
  $('previousCandidates').disabled=page===0;
  $('nextCandidates').disabled=candidatePage+1>=candidatePages.length;
  firstCommit=(mode===0 && visible[0]?.source==='verbatim' && visible[1] ? visible[1] : visible[0])?.commit || null;
  fitGlossPairs();
}
$('previousCandidates').onclick=()=>{if(candidatePage>0)showCandidatePage(candidatePage-1)};
$('nextCandidates').onclick=()=>{if(!$('nextCandidates').disabled)showCandidatePage(candidatePage+1)};
$('moreForms').onclick=()=>{
  const box=$('formLookup');
  keyboardOpen(false);box.hidden=false;box.replaceChildren();
  addFormPicker(box,draft.value.trim());
  box.append(button('返回手写',()=>{keyboardOpen(true);paint()}));
  box.scrollIntoView({block:'center'});
};
// Multiple readings can produce the same written form. Render that form once
// and retain each distinct edit, so a shorter match can still leave a suffix.
function groupHanCards(items,raw){
  const groups=new Map();
  for(const item of items){
    const group=groups.get(item.form);
    if(group)group.push(item);else groups.set(item.form,[item]);
  }
  return Array.from(groups.values(),members=>{
    if(members.length===1)return members[0];
    const boundaries=new Map();
    for(const member of members){
      if(!boundaries.has(member.consumed))boundaries.set(member.consumed,[]);
      boundaries.get(member.consumed).push(member);
    }
    const edits=Array.from(boundaries,([consumed,variants])=>{
      const dialect=variants.filter(item=>item.kind===0);
      const candidate=dialect.find(item=>!item.syllable)||dialect[0]||variants[0];
      const meanings=new Map(),loans=new Set();
      for(const item of dialect){
        if(!item.fullGloss)continue;
        if(item.loan)loans.add(item.fullGloss);
        else if(item.hasMeaning&&!meanings.has(item.fullGloss))meanings.set(item.fullGloss,item.short||item.fullGloss);
      }
      const meaningParts=[...meanings.keys()];
      const labels=[...new Set(meanings.values())];
      const shortParts=labels.length===1&&labels[0]===candidate.form?[]:labels.slice(0,2);
      const readerLines=shortParts.length?[...meaningParts,...Array.from(loans,v=>v+'（借词本字）')]:[];
      // A Mandarin fallback does not supply evidence about a Tujia reading.
      const wordIds=new Set(dialect.filter(item=>!item.syllable||item.hasMeaning).map(item=>item.id));
      const sounds=new Set(dialect.map(item=>item.sound));
      const context={kind:candidate.kind,ids:wordIds.size===1?[...wordIds][0]:'',sound:sounds.size===1?[...sounds][0]:''};
      return {...candidate,id:context.ids,meaning:meaningParts.join('；'),fullGloss:readerLines.join('；'),
        short:shortParts.length===2?'¹'+shortParts[0]+' ²'+shortParts[1]:shortParts[0]||'',
        shortParts,meaningParts,readerLines,consumed,commit:()=>candidate.commitWith(context)};
    }).sort((a,b)=>b.consumed-a.consumed);
    const [primary,...alternates]=edits;
    return {...primary,members,otherEdits:alternates.map(edit=>({
      consumed:edit.consumed,prefix:raw.slice(0,edit.consumed),remainder:core.suffix(raw,edit.consumed),
      readerLines:edit.readerLines,commit:edit.commit
    }))};
  });
}
// A written suffix can have several readings. Coalesce only entries sharing
// its complete accented reading and meaning; keep different tones separate.
function groupHandMatches(matches,romans,before){
  const groups=new Map();
  const cursor=output.selectionStart,revision=editRevision;
  for(const c of matches){
    const actual=before.slice(-c.length);
    const roman=romans.get(c.ids)||'';
    const key=[actual,roman||c.ids,c.meaning].join('\0');
    if(!groups.has(key))groups.set(key,{actual,roman,variants:[]});
    groups.get(key).variants.push(c);
  }
  return Array.from(groups.values(),({actual,roman,variants})=>{
    const first=variants[0], label=first.short||first.meaning;
    const item={form:actual,short:label,roman,
      meaning:first.meaning,fullGloss:first.meaning,readerLines:[roman,first.meaning].filter(Boolean),
      source:'hand-match',id:variants.length===1?first.ids:'',kind:first.kind,consumed:first.length,commit:()=>{}};
    item.prepare=()=>{
      const formFor=style=>core.handwrittenWords(before,2,style).find(c=>c.ids===first.ids && c.length===first.length);
      item.forms={han:first,ye:formFor(0),diacritic:formFor(1)};
      item.replaceWith=form=>{
        const c=item.forms[form],start=cursor-actual.length;
        if(!c || revision!==editRevision || output.selectionStart!==cursor || output.selectionEnd!==cursor ||
           output.value.slice(start,cursor)!==actual)return;
        const units=unitsFromRanges(c.form,c.ranges);
        const formatted=bracketHanUnits(c.form,units);
        if(formatted.text!==actual){
          output.setRangeText(formatted.text,start,cursor,'end',formatted.units);
          editRevision++;count();
        }
        committedContext={at:output.selectionEnd,ids:first.ids,sound:first.sound};
        handSession=null;candidates();
      };
    };
    item.commit=()=>openReading(item);
    return item;
  });
}
function paintPreedit(){
  const preview=$('preeditPreview');
  const value=mode===3?(window.keyboardIPA?.fromDraft(draft.value)??draft.value):draft.value;
  preview.hidden=!value;
  output.classList.toggle('is-composing',!!value);
  if(!value)return;

  const start=output.selectionStart,end=output.selectionEnd;
  preview.replaceChildren(...Array.from(output.childNodes,child=>child.cloneNode(true)));
  const range=document.createRange(),walker=document.createTreeWalker(preview,NodeFilter.SHOW_TEXT);
  range.selectNodeContents(preview);
  let text,offset=0,started=false;
  while((text=walker.nextNode())){
    const next=offset+text.length;
    if(!started && start<=next){range.setStart(text,start-offset);started=true}
    if(started && end<=next){range.setEnd(text,end-offset);break}
    offset=next;
  }
  if(!started)range.collapse(false);
  range.deleteContents();
  range.insertNode(node('span',value,'pending-text'));
  preview.scrollTop=output.scrollTop;
}
output.addEventListener('scroll',()=>{$('preeditPreview').scrollTop=output.scrollTop},{passive:true});
document.addEventListener('selectionchange',()=>{if(document.activeElement===output && draft.value)paintPreedit()});
function candidates(){
  paintPreedit();
  if(mode===3 && window.ipaCandidates){window.ipaCandidates();return;}
  const hand=mode===2 && !draft.value ? activeHand() : null;
  const value=draft.value||hand?.raw||'',val=value.trim(),outputMode=compositionMode();
  const style=(demoSpelling||orthography)==='diacritic'?1:0;
  $('draftBar').classList.toggle('has-text',!!draft.value);
  $('toneKeys').querySelectorAll('button').forEach(key=>{key.disabled=!pinyinVowelRun(draft.value,draft.selectionEnd)});
  // A handwritten glyph is already in the editor. Only pending spelling appears in the toolbar.
  $('raw').disabled=!val;$('raw').hidden=mode===1||!draft.value;
  $('raw').textContent=mode?'用原字':'用原拼写';
  $('raw').setAttribute('aria-label',mode&&val?'输入原字 '+val:$('raw').textContent);
  candidateItems=[];
  const seen=new Set(),forms=new Set(),hanSenses=new Map();
  function offer(c,source){
    const consumed=source==='exact'?c.length:value.length;
    const visible=c.form+'\0'+consumed;
    const hanOutput=mode===1 && /\p{Script=Han}/u.test(c.form);
    const key=hanOutput?[visible,c.kind,c.ids,c.sound,c.meaning].join('\0')
      :visible+'\0'+(c.syllable||c.loan?'':c.meaning);
    const fallback=source==='exact' && c.kind!==0;
    if(!hanOutput && !fallback && (source==='sound'?forms.has(visible):seen.has(key)))return;
    if(hanOutput && seen.has(key))return;
    // Retain every possible reading of the displayed form. A phonetic 萌 may
    // be either mongr or munr and cannot establish either sound as history.
    const sense=hanOutput && c.hanSenseId?consumed+'\0'+c.hanSenseId:'';
    if(sense && hanSenses.has(sense) && hanSenses.get(sense)!==c.form)return;
    if(hanOutput && c.kind===1 && forms.has(visible))return;
    if(sense)hanSenses.set(sense,c.form);
    forms.add(visible);seen.add(key);
    const units=unitsFromRanges(c.form,c.ranges);
    const gloss=c.kind===0&&!c.loan&&(!c.syllable||source==='sound')?c.short:'';
    const short=outputMode===1 && gloss===c.form?'':gloss;
    const fullGloss=c.kind===0 && (!c.syllable||gloss)?c.meaning:'';
    function commitWith(context){
      const replacing=hand && (source==='exact'||source==='completion');
      const before=replacing?hand.prior:editorContext();
      if(replacing)output.setSelectionRange(hand.start,hand.at);
      submit(c.form,source==='exact'?core.suffix(value,c.length):'',units,context,before);
    }
    const readerLines=outputMode===1 && (c.kind!==0 || c.loan || fullGloss===c.form)?[]:undefined;
    candidateItems.push({form:c.form,meaning:c.meaning,short,fullGloss,readerLines,id:c.ids,units,source,consumed,kind:c.kind,
      sound:c.sound,loan:c.loan,syllable:c.syllable,hasMeaning:!!gloss,commitWith,commit:()=>commitWith(c)});

  }
  const {ids,sound}=editorContext();
  if(value && !(mode===2 && handHan && !draft.value)){
    const exact=core.lookup(value,outputMode,style).filter(c=>!hand || (c.length===value.length && c.kind===0));
    for(const c of exact)if(c.kind===0&&!c.syllable&&c.length===value.length)offer(c,'exact');
    if(mode!==2)for(const c of core.spellingCompletions(value,ids,outputMode,style))offer(c,'completion');
    if(mode===2){
      for(const form of personalForms.filter(x=>x.form===value)){
        const e=wordById.get(form.id);
        for(const c of core.lookup(e.recommended,outputMode,style).filter(c=>c.ids===e.id))offer(c,'completion');
      }
      for(const c of core.completions(value,outputMode,style))offer(c,'completion');
    }
    for(const c of exact)if(c.syllable&&c.length===value.length&&(mode===1||!forms.has(c.form+'\0'+c.length)))offer(c,'exact');
    for(const c of exact)if(c.kind===0&&(mode===1||!c.syllable||!forms.has(c.form+'\0'+c.length)))offer(c,'exact');
    for(const c of exact)if(c.kind!==0)offer(c,'exact');
  }
  if(mode===2 && handHan && !draft.value && output.selectionStart===output.selectionEnd){
    const before=output.value.slice(0,output.selectionStart);
    const romans=new Map(core.handwrittenWords(before,2,1).map(c=>[c.ids,c.form]));
    const matches=groupHandMatches(core.handwrittenWords(before,1,style),romans,before);
    candidateItems.unshift(...matches);
  }
  if(!(mode===2 && handHan && !draft.value)){
    const prefix=mode===2?'':val;
    const words=ids?core.nextWords(ids,outputMode,style):[];
    const sounds=sound?core.nextSounds(sound,outputMode,style):[];
    const markedWords=prefix?new Map(core.nextWords(ids,0,1).map(c=>[c.ids,c.form])):null;
    const yeWords=prefix?new Map(core.nextWords(ids,0,0).map(c=>[c.ids,c.form])):null;
    const markedSounds=prefix?new Map(core.nextSounds(sound,0,1).map(c=>[c.sound,c.form])):null;
    for(const c of words)if(!prefix||core.matchesPrefix(prefix,yeWords.get(c.ids),markedWords.get(c.ids)))offer(c,'word');
    for(const c of sounds)if(!prefix||core.matchesPrefix(prefix,c.sound,markedSounds.get(c.sound)))offer(c,'sound');
  }
  if(mode===1)candidateItems=groupHanCards(candidateItems,value);
  if(val){const personal=learnedChoices(value),forms=new Set(personal.map(x=>x.form));candidateItems=personal.concat(candidateItems.filter(x=>!forms.has(x.form)));}
  if(mode===0 && val){candidateItems.unshift({form:value,short:'',meaning:'',source:'verbatim',kind:0,consumed:value.length,commit:()=>submit(value)});}
  $('moreForms').disabled=!/^\p{Script=Han}+$/u.test(val);
  showCandidatePage(0);
}
draft.oninput=()=>change(draft.value);
// Physical number keys choose the current candidate page. An empty editor
// keeps ordinary number entry; the focused keyboard can select predictions.
document.addEventListener('keydown',event=>{
  if(event.isComposing||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey||
     !/^[1-4]$/.test(event.key)||$('keyboardPanel').hidden||(!draft.value && event.target===output)||
     !(event.target===draft||event.target===output||$('keyboardPanel').contains(event.target)))return;
  if(mode===3 && window.keyboardIPA?.readingTone(draft.value,draft.selectionEnd))return;
  const slot=Number(event.key)-1;
  if(slot>=candidatePages[candidatePage].widths.length)return;
  const candidate=candidateItems[candidatePages[candidatePage].start+slot];
  if(!candidate)return;
  event.preventDefault();
  if(demoActive)takeOver();
  candidate.commit();
},true);
draft.onkeydown=e=>{
  if(e.isComposing || (e.key!=='Enter' && (e.key!==' ' || e.shiftKey)))return;
  e.preventDefault();
  if(!draft.value){submit(e.key==='Enter'?'\n':' ');return}
  if(firstCommit)firstCommit();else if(mode!==1)submit(draft.value);
};
$('raw').onclick=()=>{setMore(false);submit(draft.value)};
output.addEventListener('keydown',event=>{
  if(event.isComposing||event.ctrlKey||event.metaKey||event.altKey||mode===2)return;
  if(mode===3 ? !(window.keyboardIPA?.acceptsKey(event.key)||/^[\p{Script=Latin}\p{M}¹²³⁴⁵'’-]$/u.test(event.key)) : !/^[A-Za-z'āáǎàēéěèīíǐìōóǒòūúǔù]$/u.test(event.key))return;
  event.preventDefault();editKey(event.key.toLowerCase());draft.focus({preventScroll:true});
});
function editKey(key){
  if(key==='⌫'&&!draft.value){
    let from=output.selectionStart;const to=output.selectionEnd;
    if(from===to && from){
      const before=output.value.slice(0,from), pair=before.match(/˻\p{Script=Han}{2}˼$/u);
      from-=pair?pair[0].length:Array.from(before).at(-1).length;
    }
    if(from!==to){output.setRangeText('',from,to,'end');output.dispatchEvent(new Event('input'))}
    return;
  }
  let a=draft.selectionStart,b=draft.selectionEnd;
  if(key==='⌫' && a===b)a=Math.max(0,a-1);
  draft.setRangeText(key==='⌫'?'':key,a,b,'end');
  drafts[draftSlot()]=draft.value;candidates();
  draft.focus({preventScroll:true});
}
$('noteBackspace').addEventListener('pointerdown',event=>event.preventDefault());
$('noteBackspace').onclick=()=>editKey('⌫');
const pinyinTones=[['ˉ','\u0304'],['ˊ','\u0301'],['ˇ','\u030c'],['ˋ','\u0300']];
function pinyinVowelRun(value,cursor){
  const before=value.slice(0,cursor);
  const syllable=before.match(/[a-z\u00c0-\u024f\p{M}]+$/iu)?.[0];
  if(!syllable)return null;
  const pieces=syllable.normalize('NFD').match(/\p{L}\p{M}*/gu)||[];
  const matches=pieces.map((p,i)=>/^[aeiou]/i.test(p)?i:-1).filter(i=>i>=0);
  const vowel=matches.at(-1);
  if(vowel===undefined)return null;
  let first=vowel;
  while(first>0 && /^[aeiou]/i.test(pieces[first-1]))first--;
  const marked=pieces.findIndex((p,i)=>i>=first&&i<=vowel&&/[\u0300\u0301\u0304\u030c]/u.test(p));
  const run=pieces.slice(first,vowel+1);
  const priority=['a','e','o'].map(letter=>run.findIndex(v=>v[0].toLowerCase()===letter)).find(i=>i>=0);
  return {start:before.length-syllable.length,pieces,index:marked>=0?marked:priority===undefined?vowel:first+priority};
}
function setPinyinTone(mark){
  const cursor=draft.selectionEnd,run=pinyinVowelRun(draft.value,cursor);
  if(!run)return;
  run.pieces[run.index]=run.pieces[run.index].replace(/[\u0300\u0301\u0304\u030c]/gu,'')+mark;
  const marked=run.pieces.join('').normalize('NFC');
  draft.setRangeText(marked,run.start,cursor,'end');
  change(draft.value);
  draft.focus({preventScroll:true});
  const at=run.start+marked.length;
  draft.setSelectionRange(at,at);
}
const virtualKeys=new Map();
for(const [index,[sign,mark]] of pinyinTones.entries()){
  const key=button('',()=>setPinyinTone(mark),'key pinyin-tone');
  const label=node('span',String(index+1),'tone-number');label.setAttribute('aria-hidden','true');
  key.setAttribute('aria-label',`声调 ${index+1} ${sign}`);
  key.append(node('span',sign,'tone-sign'),label);
  $('toneKeys').append(key);
}
draft.addEventListener('select',()=>{
  const enabled=!!pinyinVowelRun(draft.value,draft.selectionEnd);
  $('toneKeys').querySelectorAll('button').forEach(key=>{key.disabled=!enabled});
});
for(const chars of ['qwertyuiop','asdfghjkl','zxcvbnm']){
  const row=node('div','','row');
  for(const c of chars){
    const key=button(c,()=>editKey(c),'key');
    key.setAttribute('aria-label',c);virtualKeys.set(c,key);key.dataset.letter=c;row.append(key);
  }
  $('keys').append(row);
}
const last=node('div','','row');
const separator=button("'",()=>editKey("'"),'key wide');
virtualKeys.set("'",separator);last.append(separator,button('。',()=>draft.value?editKey('。'):submit('。'),'key wide'),button('空格',()=>draft.value?(firstCommit?firstCommit():editKey(' ')):submit(' '),'key wide'));$('keys').append(last);
const ctx=canvas.getContext('2d');
function paint(){
  const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;
  const ratio=window.devicePixelRatio||1;
  const width=Math.round(w*ratio),height=Math.round(h*ratio);
  if(canvas.width!==width || canvas.height!==height){canvas.width=width;canvas.height=height}
  ctx.setTransform(ratio,0,0,ratio,0,0);
  ctx.clearRect(0,0,w,h);ctx.strokeStyle='#35241e';ctx.fillStyle=ctx.strokeStyle;ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';
  for(const stroke of strokes){
    ctx.beginPath();stroke.forEach(([x,y],i)=>i?ctx.lineTo(x*w,y*h):ctx.moveTo(x*w,y*h));ctx.stroke();
    if(stroke.length===1){ctx.beginPath();ctx.arc(stroke[0][0]*w,stroke[0][1]*h,2,0,2*Math.PI);ctx.fill()}
  }
}
function activeHand(){
  const hand=handSession;
  return hand && editRevision===hand.revision && output.selectionStart===hand.at && output.selectionEnd===hand.at?hand:null;
}
function acceptGlyph(glyph,correct=false){
  clearTimeout(handTimer);inkRevision++;
  const previous=activeHand();
  const correction=correct && !!previous;
  const combined=!correction && previous && core.handPrefix(previous.raw+glyph)>0;
  const prefix=correction?previous.prefix:combined?previous.raw:'';
  const raw=prefix+glyph;
  const style=(demoSpelling||orthography)==='diacritic'?1:0, outMode=compositionMode();
  const best=core.lookup(raw,outMode,style).find(c=>c.kind===0 && c.length===raw.length);
  const value=handHan?raw:best?.form||raw;
  const prior=correction||combined?previous.prior:editorContext();
  if(correction||combined)output.setSelectionRange(previous.start,previous.at);
  const before=output.selectionStart;
  submit(value,'',best?.form===value?unitsFromRanges(value,best.ranges):null,best,prior);
  handSession={raw,prefix,prior,start:before,at:output.selectionStart,revision:editRevision};
  strokes=[];paint();candidates();
}
function glyphButtons(glyphs=[],correct=false){
  const sample=!glyphs.length;
  const options=sample?['嘎','尬','波','俐','木','三']:glyphs.slice(0,6);
  $('han').replaceChildren(...options.map(glyph=>{
    const pick=button(glyph,()=>{acceptGlyph(glyph,correct);glyphButtons(options,true)});
    pick.setAttribute('aria-label',(sample?'输入示例字 ':'选择识别字形 ')+glyph);
    return pick;
  }));
}
function recognizeInk(){
  clearTimeout(handTimer);
  const revision=++inkRevision;
  if(!strokes.length){glyphButtons();return}
  const at=output.selectionStart,end=output.selectionEnd,revisionAtStart=editRevision;
  handTimer=setTimeout(async()=>{
    if(mode!==2||drawingPointer!==null||revision!==inkRevision)return;
    const paths=strokes.map(path=>path.map(([x,y])=>[x*canvas.clientWidth,y*canvas.clientHeight]));
    let glyphs;
    try{glyphs=await recognizeHand(paths,canvas.clientWidth,canvas.clientHeight)}catch{glyphs=core.recognize(paths)}
    if(mode!==2||revision!==inkRevision||revisionAtStart!==editRevision||at!==output.selectionStart||end!==output.selectionEnd)return;
    glyphButtons(glyphs);
    if(glyphs.length)handTimer=setTimeout(()=>{
      if(mode!==2||revision!==inkRevision||revisionAtStart!==editRevision||at!==output.selectionStart||end!==output.selectionEnd)return;
      acceptGlyph(glyphs[0]);glyphButtons(glyphs,true);
    },900);
  },150);
}
glyphButtons();
$('keyboardPanel').addEventListener('wheel',e=>{
  if(Math.abs(e.deltaY)>=Math.abs(e.deltaX) && !e.ctrlKey)e.preventDefault();
},{passive:false});
function point(e){const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]}
canvas.onpointerdown=e=>{
  if(!e.isPrimary || drawingPointer!==null)return;
  e.preventDefault();clearTimeout(handTimer);inkRevision++;
  drawingPointer=e.pointerId;canvas.setPointerCapture(e.pointerId);
  strokes.push([point(e)]);paint();
};
canvas.onpointermove=e=>{
  if(e.pointerId!==drawingPointer)return;
  const stroke=strokes.at(-1),previous=stroke.at(-1),next=point(e);
  stroke.push(next);
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.beginPath();ctx.moveTo(previous[0]*w,previous[1]*h);
  ctx.lineTo(next[0]*w,next[1]*h);ctx.stroke();
};
canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=e=>{
  if(e.pointerId===drawingPointer){drawingPointer=null;recognizeInk()}
};
$('undo').onclick=()=>{strokes.pop();paint();recognizeInk()};$('reset').onclick=()=>{strokes=[];paint();recognizeInk()};
window.addEventListener('resize',()=>{sizeDesktopDock();if(mode===2)paint()});
render();

$('showScene').onclick=()=>{
  restoreManual();choose(mode);keyboardOpen(true);
  change(sentenceWords.map(entry=>mode===1?entry.word:practiceInput(entry)).join('')+'。');
  $('playStatus').textContent='点首选可输入整句；点短词后可继续选词';
};

$('tryForms').onclick=()=>{
  restoreManual();choose(typingMode,true);change(exampleWord.plain);setMore(true);
  $('playStatus').textContent='选一种写法，再点「土家族」下面的词';
};

$('tryNext').onclick=()=>{
  restoreManual();choose(0,true);change(practiceInput(wordById.get('w309')));
  $('playStatus').textContent='点「小孩」，再点想接着输入的词或音节';
};

$('tryPrefix').onclick=()=>{
  restoreManual();choose(2,true);keyboardOpen(true);
  change('早箍得尬');
  $('playStatus').textContent='先选“早晨”，再为剩下的“尬”选词';
};

// The story is composed using the ordinary candidate and commit paths.
const noteWords=noteStory.sections.flatMap((section,i)=>
  section.rows.map(row=>({entry:wordById.get(row.id),end:row.end,paragraph:i+1})));
let hanPlayback=true, timer, playing=false, demoActive=false, marked;
let token=0,letter=0,phase='focus',saved=null;
function mark(el){marked?.classList.remove('lit');marked=el;marked?.classList.add('lit')}
function updateTransport(status,label){
  $('playStatus').textContent=status;$('pause').textContent=label;$('take').hidden=!demoActive;
}
function takeOver(){
  demoSpelling=null;
  clearTimeout(timer);playing=false;demoActive=false;mark(null);saved=null;
  updateTransport('自由输入','播放山歌');
}
function restoreManual(){
  if(!demoActive)return;
  const old=saved;takeOver();
  if(old){
    committedContext=old.context;output.value=old.value; output.restoreGroups?.(old.units);output.setSelectionRange(old.start,old.end);drafts=old.drafts;
    choose(old.mode);count();
  }
}
function matchesStoryWord(item,entry){
  return (item.members||[item]).some(member=>
    member.id===entry.id || (member.form===outputForm(entry) && member.meaning===entry.meaning));
}
function schedule(ms){
  const speed=Number($('playSpeed').value)||1;
  timer=setTimeout(advance,Math.max(12,ms/speed));
}
function advance(){
  if(!playing)return;
  mark(null);
  if(phase==='focus'){
    output.focus({preventScroll:true});keyboardOpen(true);phase='type';schedule(450);return;
  }
  if(token===noteWords.length){
    playing=false;updateTransport('第一首已写完','重播');return;
  }
  const {entry,end,paragraph}=noteWords[token];
  const keys=Array.from((tonePlayback?entry.diacritic:entry.plain).normalize('NFC').replace(/[\s-]/g,''));
  $('playStatus').textContent='第 '+paragraph+' / '+noteStory.sections.length+' 行 · '+(token+1)+' / '+noteWords.length+' 词';
  if(phase==='type'){
    const symbol=keys[letter], base=symbol.normalize('NFD')[0];
    mark(virtualKeys.get(base));
    change(draft.value+symbol);
    letter++;phase=letter===keys.length?'review':'type';
    schedule(token<2?650:190);
  }else if(phase==='review'){
    const index=candidateItems.findIndex(item=>matchesStoryWord(item,entry));
    if(index<0){playing=false;updateTransport('未找到“'+entry.meaning+'”的候选','重播');return}
    const page=candidatePages.findIndex(p=>index>=p.start && index<p.start+p.widths.length);
    showCandidatePage(page);
    mark($('candidates').children[index-candidatePages[page].start]);phase='commit';schedule(token<2?3600:850);
  }else{
    const choice=candidateItems.find(item=>matchesStoryWord(item,entry));
    choice.commit();if(end)submit(end);
    token++;letter=0;phase='type';schedule(240);
  }
}
function startPlayback(){
  if(!demoActive)saved={value:output.value,context:committedContext,units:output.noteGroups?.(),drafts:drafts.slice(),mode,
    start:output.selectionStart,end:output.selectionEnd};
  clearTimeout(timer);mark(null);demoSpelling=tonePlayback?'diacritic':'ye';demoActive=true;playing=true;token=0;letter=0;phase='focus';
  committedContext=null;choose(hanPlayback?1:0);change('');output.value='';output.setSelectionRange(0,0);count();
  keyboardOpen(false);updateTransport('打开《山歌两首》记事本','暂停');
  timer=setTimeout(advance,850);
}
$('pause').onclick=()=>{
  if(playing){clearTimeout(timer);playing=false;updateTransport('已暂停 · 可继续或接手','继续')}
  else if(demoActive && token<noteWords.length){playing=true;updateTransport('正在写山歌','暂停');advance()}
  else startPlayback();
};
$('take').onclick=()=>{takeOver();choose(typingMode);keyboardOpen(true);draft.focus()};
function handleManual(e){
  if(!demoActive || e.target.closest('.transport,.demo-select,#settingsPanel,#openSettings,#kbSettings'))return;
  takeOver();
}
document.addEventListener('pointerdown',handleManual,true);
document.addEventListener('keydown',e=>{if(e.key!=='Tab')handleManual(e)},true);
function switchPlayback(han,tones=false){
  hanPlayback=han;tonePlayback=tones;
  $('demoHan').setAttribute('aria-pressed',han);
  $('demoTujia').setAttribute('aria-pressed',!han && !tones);
  $('demoTone').setAttribute('aria-pressed',tones);
  startPlayback();
}
const settings=$('settingsPanel');
let resumeAfterSettings=false;
$('kbSettings').onclick=$('openSettings').onclick=()=>{
  setMore(false);
  resumeAfterSettings=playing;
  clearTimeout(timer);playing=false;mark(null);
  if(settings.showModal)settings.showModal();else settings.setAttribute('open','');
};
settings.addEventListener('close',()=>{
  if(resumeAfterSettings && demoActive){playing=true;if(phase==='commit')phase='review';schedule(300)}
  resumeAfterSettings=false;
});
$('demoHand').onclick=()=>{restoreManual();handHan=false;choose(2);keyboardOpen(true);
  updateTransport('写一个记音字，停笔可输入拼写','播放山歌')};
$('demoHan').onclick=()=>switchPlayback(true);
$('demoTujia').onclick=()=>switchPlayback(false);
$('demoTone').onclick=()=>switchPlayback(false,true);
let libraryPage=0;
const pageSize=8;
function renderLibrary(){
  const matches=entries.filter(entry=>searchMatch(entry,$('wordSearch').value));
  const pages=Math.ceil(matches.length/pageSize);
  libraryPage=Math.max(0,Math.min(libraryPage,pages-1));
  const list=$('wordList');list.replaceChildren();
  for(const entry of matches.slice(libraryPage*pageSize,(libraryPage+1)*pageSize)){
    const row=node('div','','lexrow');
    const tryWord=button('',()=>{
      restoreManual();choose(mode,true);change(practiceInput(entry));
      $('playStatus').textContent='点候选词，放入输入框';
      $('play').scrollIntoView({block:'start'});
    });
    const hanLabel=node('small','');putHanUnits(hanLabel,entry.recommended,entry.hanUnits);
    tryWord.append(node('strong',entry.meaning+' · '+entry.word),hanLabel);
    const link=node('a','原词条');link.href='https://tujia.biz/text/entry/'+entry.id+'.html';link.target='_blank';link.rel='noopener';
    const evidence=node('details','','lookup-evidence');
    evidence.append(node('summary','配字依据'));
    if(entry.meaningForm){
      evidence.append(node('p',entry.word+' 表示“'+entry.meaning+(entry.loanForm?'”时沿用汉语本字「':entry.trialForm?'”时试写「':'”时写「')+entry.meaningForm+'」。'+(entry.formNote||'')));
      if(entry.survey)evidence.append(node('p','字音 · '+entry.survey));
    }else{
      evidence.append(node('p','逐音节写法　'+entry.hanUnits.join(' · ')));
    }
    entry.sounds.forEach(([target,place,raw],i)=>{
      if(raw)evidence.append(node('p','旧字音依据　'+entry.legacyHanUnits[i]+' · '+(place==='jishou'?'吉首':'永顺')+' '+raw+' · 土家语 '+target));
    });
    if(entry.loanHint)evidence.append(node('p','待核词源 · '+entry.loanHint));
    row.append(tryWord,link,evidence);list.append(row);
  }
  $('wordCount').textContent=pages?'共 '+matches.length+' 词 · 第 '+(libraryPage+1)+' / '+pages+' 页':'没有找到这个词';
  $('prevWords').disabled=libraryPage===0;$('nextWords').disabled=libraryPage+1>=pages;
}
$('wordSearch').oninput=()=>{libraryPage=0;renderLibrary()};
$('prevWords').onclick=()=>{libraryPage--;renderLibrary()};
$('nextWords').onclick=()=>{libraryPage++;renderLibrary()};
$('findWords').onclick=()=>{keyboardOpen(false);$('wordSearch').focus();$('library').scrollIntoView({block:'start'})};
renderLibrary();
const trialWord=window.location && new URLSearchParams(window.location.search).get('try');
if(trialWord && allWords.some(e=>e.word===trialWord || e.plain===trialWord || e.diacritic===trialWord)){
  choose(1,true);
  change(trialWord);
  updateTransport('点选符合词义的字','播放演示');
}else if(window.location?.hash==='#tone-input'){
  switchPlayback(false,true);
}else if(window.location?.hash==='#spelling'){
  switchPlayback(false);
}else{
  choose(typingMode); keyboardOpen(true);
}

window.addEventListener('hashchange',()=>{
  if(window.location.hash==='#tone-input')switchPlayback(false,true);
  else if(window.location.hash==='#spelling')switchPlayback(false);
});
