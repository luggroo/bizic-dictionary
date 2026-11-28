// Each annotation is a pair of UTF-16 offsets into the note's plain text.
function makeJoinedHan(text){
  const group=document.createElement('span'),ink=document.createElement('span');
  group.className='joined-han';ink.textContent=text;group.append(ink);return group;
}
function putHanUnits(target,text,units){
  if(!units || !units.some(s=>/^\p{Script=Han}{2}$/u.test(s))){target.textContent=text;return}
  target.replaceChildren(...units.flatMap(s=>/^\p{Script=Han}{2}$/u.test(s)
    ?[document.createTextNode('˻'),makeJoinedHan(s),document.createTextNode('˼')]:[document.createTextNode(s)]));
}
function bracketHanUnits(text,units){
  if(!units || !units.some(s=>/^\p{Script=Han}{2}$/u.test(s)))return {text,units};
  const joined=units.join(''), at=text.indexOf(joined);
  if(at<0)return {text,units};
  const parts=[text.slice(0,at)];
  for(const unit of units){
    if(/^\p{Script=Han}{2}$/u.test(unit))parts.push('˻',unit,'˼');else parts.push(unit);
  }
  parts.push(text.slice(at+joined.length));
  return {text:parts.join(''),units:parts};
}
function installNoteEditor(el){
  if(!el.isContentEditable || !document.createRange)return;
  let text='',groups=[],start=0,end=0;
  function readSelection(){
    if(document.activeElement!==el)return;
    const sel=window.getSelection();
    if(!sel?.rangeCount)return;
    const range=sel.getRangeAt(0);
    if(!el.contains(range.startContainer)||!el.contains(range.endContainer))return;
    const before=document.createRange();before.selectNodeContents(el);before.setEnd(range.startContainer,range.startOffset);
    start=before.toString().length;end=start+range.toString().length;
  }
  function setSelection(a,b){
    start=Math.min(a,text.length);end=Math.min(b,text.length);
    if(document.activeElement!==el)return;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),range=document.createRange();
    let n,offset=0,found=false;range.selectNodeContents(el);range.collapse(false);
    while(n=walker.nextNode()){
      const next=offset+n.length;
      if(!found && start<=next){range.setStart(n,start-offset);found=true}
      if(found && end<=next){range.setEnd(n,end-offset);break}
      offset=next;
    }
    const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
  }
  function paint(){
    const pieces=[];let at=0;
    for(const [a,b] of groups){
      pieces.push(document.createTextNode(text.slice(at,a)),makeJoinedHan(text.slice(a,b)));at=b;
    }
    pieces.push(document.createTextNode(text.slice(at)));el.replaceChildren(...pieces);
  }
  function replace(value,a,b,units){
    const delta=value.length-(b-a);
    groups=groups.flatMap(([x,y])=>y<=a?[[x,y]]:x>=b?[[x+delta,y+delta]]:[]);
    let i=a;
    for(const unit of units||[]){if(/^\p{Script=Han}{2}$/u.test(unit))groups.push([i,i+unit.length]);i+=unit.length}
    groups.sort((x,y)=>x[0]-y[0]);text=text.slice(0,a)+value+text.slice(b);paint();setSelection(a+value.length,a+value.length);
  }
  Object.defineProperties(el,{
    value:{get:()=>text,set:s=>{text=s;groups=[];start=end=s.length;paint()}},
    selectionStart:{get:()=>{readSelection();return start}},selectionEnd:{get:()=>{readSelection();return end}}
  });
  el.setSelectionRange=setSelection;el.setRangeText=(s,a,b,action,units)=>replace(s,a,b,units);
  el.noteGroups=()=>groups.map(v=>v.slice());el.restoreGroups=g=>{groups=g||[];paint()};
  document.addEventListener('selectionchange',()=>{if(document.activeElement===el)readSelection()});
  el.addEventListener('beforeinput',e=>{
    if(e.inputType!=='insertParagraph'&&e.inputType!=='insertLineBreak')return;
    e.preventDefault();readSelection();replace('\n',start,end);el.dispatchEvent(new Event('input'));
  });
  el.addEventListener('paste',e=>{
    e.preventDefault();readSelection();replace(e.clipboardData.getData('text/plain'),start,end);el.dispatchEvent(new Event('input'));
  });
  el.addEventListener('input',e=>{
    if(e.isComposing)return;
    syncTypedText();
  });
  el.addEventListener('compositionend',syncTypedText);
  function syncTypedText(){
    const next=el.textContent;
    if(next===text)return;
    let a=0,b=0;
    while(a<text.length && a<next.length && text[a]===next[a])a++;
    while(b<text.length-a && b<next.length-a && text[text.length-1-b]===next[next.length-1-b])b++;
    replace(next.slice(a,next.length-b),a,text.length-b);
  }
  paint();
}
