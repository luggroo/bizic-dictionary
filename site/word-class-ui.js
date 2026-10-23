/* Compact, keyboard- and touch-accessible explanations of POS provenance. */
'use strict';
(() => {
 let active=null,popup=null,pinned=false,timer=0;
 function close(){
  clearTimeout(timer);
  if(active){active.setAttribute('aria-expanded','false');active.removeAttribute('aria-describedby');}
  popup?.remove();popup=null;active=null;pinned=false;
 }
 function open(button,pin=false){
  clearTimeout(timer);
  if(active===button&&popup){pinned=pinned||pin;return;}
  close();
  const word=typeof W==='object'?W[button.dataset.posWord]:null;if(!word)return;
  active=button;pinned=pin;
  popup=document.createElement('div');popup.className='pos-explanation';popup.id='pos-explanation';
  popup.setAttribute('role','tooltip');popup.setAttribute('popover','manual');popup.setAttribute('data-ui-content','');
  const lang=window.TujiaUI?.language||'zh';popup.lang=lang;
  popup.textContent=WordClasses.explanation(word,button.dataset.posClass,lang);
  (button.closest('dialog')||document.body).append(popup);
  if(popup.showPopover)popup.showPopover();
  button.setAttribute('aria-expanded','true');button.setAttribute('aria-describedby',popup.id);
  const rect=button.getBoundingClientRect(),box=popup.getBoundingClientRect();
  popup.style.left=Math.max(12,Math.min(rect.left,innerWidth-box.width-12))+'px';
  popup.style.top=(rect.bottom+8+box.height<innerHeight-12?rect.bottom+8:Math.max(12,rect.top-box.height-8))+'px';
 }
 function leave(){clearTimeout(timer);timer=setTimeout(()=>{if(!pinned&&!active?.matches(':focus')&&!popup?.matches(':hover'))close();},180);}
 window.refreshWordClassLabels=()=>{
  const lang=window.TujiaUI?.language||'zh';
  document.querySelectorAll('[data-pos-class]').forEach(button=>{
   const word=typeof W==='object'?W[button.dataset.posWord]:null;if(!word)return;
   const label=button.textContent.trim()+(lang==='en'?': ':'：')+WordClasses.explanation(word,button.dataset.posClass,lang);
   if(button.getAttribute('aria-label')!==label)button.setAttribute('aria-label',label);
  });
  document.querySelectorAll('[data-pos-inline]').forEach(label=>{
   const word=typeof W==='object'?W[label.dataset.posWord]:null;if(!word)return;
   const text=WordClasses.explanation(word,label.dataset.posInline,lang);if(label.title!==text)label.title=text;
  });
  if(active&&popup){const word=W[active.dataset.posWord];popup.lang=lang;const text=WordClasses.explanation(word,active.dataset.posClass,lang);if(popup.textContent!==text)popup.textContent=text;}
 };
 document.addEventListener('pointerover',e=>{const b=e.target.closest('[data-pos-class]');if(b&&e.pointerType!=='touch')open(b);else if(e.target.closest('.pos-explanation'))clearTimeout(timer);});
 document.addEventListener('pointerout',e=>{if(e.target.closest('[data-pos-class],.pos-explanation'))leave();});
 document.addEventListener('focusin',e=>{const b=e.target.closest('[data-pos-class]');if(b)open(b);});
 document.addEventListener('focusout',e=>{if(e.target.closest('[data-pos-class]'))leave();});
 document.addEventListener('click',e=>{
  const b=e.target.closest('[data-pos-class]');
  if(b){e.preventDefault();if(active===b&&pinned)close();else open(b,true);}
  else if(!e.target.closest('.pos-explanation'))close();
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&popup){e.preventDefault();e.stopImmediatePropagation();close();}},true);
 window.addEventListener('resize',close);
 document.addEventListener('scroll',e=>{if(popup&&!popup.contains(e.target))close();},true);
 new MutationObserver(()=>{if(active&&!active.isConnected)close();}).observe(document.body,{childList:true,subtree:true});
})();
