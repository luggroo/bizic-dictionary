'use strict';
// Navigation/settings stay part of the application; presentation commentary lives in README.
(() => {
  const words = {'正在载入条目…':'Loading entry…', '重试':'Retry', '显示设置':'Display settings','筛选':'Filters','词形与记音':'Word & pronunciation','释义':'Meaning','方言':'Variety','目录':'Menu','章节目录':'Contents'};
  Object.assign(UI_TRANSLATIONS,words,{'文献全文未能载入，词汇检索仍可使用。':'Source texts could not be loaded. Dictionary search remains available.','重试文献全文检索':'Retry source text search','正在检索文献全文…':'Searching source texts…','文献全文未能载入。离线时可使用词汇检索。':'Source texts could not be loaded. Dictionary search is available offline.','检索词汇 →':'Search dictionary →','文献全文尚未载入，可打开来源原件。':'The source text has not loaded. Open the original source.','条目未能载入，请重试。':'This entry could not be loaded. Please try again.','资料未能载入，请检查网络后刷新页面。':'The data could not be loaded. Check your connection and reload.'});
  const header=document.querySelector('.shell>header');
  const settings=document.createElement('details');settings.className='display-settings';
  settings.innerHTML='<summary>显示设置</summary><div class="display-panel"></div>';
  const panel=settings.querySelector('.display-panel');
  panel.append(document.querySelector('#spelling-control'),document.querySelector('.media-switch'));header.append(settings);
  document.addEventListener('click',e=>{if(!settings.contains(e.target))settings.open=false;});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){settings.open=false;if(document.querySelector('dialog[open]')&&!document.querySelector('dialog:modal'))closeDetail();}});
  window.matchMedia('(min-width:1180px)').addEventListener('change',()=>{if(currentDetail&&W[currentDetail]&&document.querySelector('#detail').open)showDetailDialog(currentDetail);});
  window.tasteRefresh=()=>{
    document.body.dataset.view=state.view;
    document.querySelectorAll('aside nav [data-view]').forEach(el=>{
      if(el.dataset.view===state.view)el.setAttribute('aria-current','page');
      else el.removeAttribute('aria-current');
    });
    const toc=document.querySelector('.grammar-layout>.grammar-toc');
    if(toc){const wrap=document.createElement('details');wrap.className='grammar-toc-wrap';wrap.open=innerWidth>900;wrap.innerHTML='<summary>章节目录</summary>';toc.before(wrap);wrap.append(toc);}
    document.querySelectorAll('.word-card-content').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.open===currentDetail)));
  };
})();
