// IPA layout and completion data follow the Android keyboard's IpaKeyboard.
(() => {
  const letters = [
    [['q'],['w'],['e','ə','ɛ','ẽ'],['r','²¹'],['t','ts','tsʰ','tɕ','tɕʰ','tʰ','ʈ','ʈʰ'],['y','ɤ','ɥ','ỹ'],['u','ɯ','ʊ','ʉ','ũ'],['i','ɪ','ɨ','ɿ','ʅ','ĩ'],['o','ɔ','ø','õ'],['p','ɸ','pʰ']],
    [['a','ɑ','ʌ','ã'],['s','ʂ','ʃ'],['d','dz','dʑ','ɖ'],['f','³⁵'],['g','ɣ','ɡ','ʁ'],['h','ʰ','ħ','ʕ'],['j','³³'],['k','kʰ'],['l','¹³']],
    [['z','ʐ','ʒ','ʑ'],['x','⁵⁵'],['c','ɕ'],['v','⁵³'],['b'],['n','ŋ','ȵ','ɲ'],['m','m̩']]
  ];
  const symbols = [[['¹'],['²'],['³'],['⁴'],['⁵'],['/'],['['],[']'],['('],[')']],
    [['̃'],['̩'],['͡'],['̥'],['̬'],['-'],['.'],['ʰ'],['ɿ'],['ʅ']],
    [['ħ'],['ʕ'],['ʁ'],['ɣ'],['ȵ'],['ʉ'],['ɯ'],['ʑ']]];
  let lexicon = [], symbolMode = false, dialects = 1;
  try { const saved=Number(localStorage.getItem('tujia-site-ipa-dialects')); if ([0,1,2,3].includes(saved) && localStorage.getItem('tujia-site-ipa-dialects')!==null) dialects=saved; } catch {}
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
  window.ipaCandidates=()=>{
    const raw=draft.value, prefix=normalize(raw);
    $('draftBar').classList.toggle('has-text',!!raw);
    candidateItems=[];
    if(raw){
      const matching=lexicon.filter(e=>(e.mask&dialects) && e.normalized===prefix);
      const push=(form,meaning)=>candidateItems.push({form,meaning,short:meaning,fullGloss:meaning,source:'ipa',kind:0,consumed:raw.length,commit:()=>submit(form)});
      push(raw,[...new Set(matching.map(e=>e.meaning))].join('；'));
      candidateItems.push(...learnedChoices(raw).filter(x=>x.form!==raw));
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
  }).catch(()=>{ $('ipaStatus').textContent='音标词库加载失败'; });
  const settings=node('div','','ipa-settings');settings.id='ipaSettings';settings.hidden=true;
  settings.append(node('span','音标补全：'));
  for(const [name,bit] of [['北部',1],['南部',2]]){
    const label=node('label',''),check=document.createElement('input');check.type='checkbox';check.checked=!!(dialects&bit);
    check.addEventListener('change',()=>{dialects=check.checked?dialects|bit:dialects&~bit;try{localStorage.setItem('tujia-site-ipa-dialects',String(dialects))}catch{}window.ipaCandidates()});
    label.append(check,document.createTextNode(name));settings.append(label);
  }
  const status=node('span','','');status.id='ipaStatus';status.setAttribute('role','status');settings.append(status);
  $('kbMorePanel').append(settings);
  function rebuild(){
    const area=$('ipaKeys');area.replaceChildren();
    for(const row of symbolMode?symbols:letters){const line=node('div','','row');
      for(const options of row){
        let held=false,timer;const label=/^\p{M}$/u.test(options[0])?'◌'+options[0]:options[0];
        const key=button(label,()=>{if(held){held=false;return}editKey(options[0])},'key');
        if(options.length>1){key.title='长按选择音标';key.setAttribute('aria-label',options[0]+'，长按选择音标');
          const show=()=>{held=true;area.querySelector('.ipa-popup')?.remove();const pop=node('div','','ipa-popup');
            for(const value of options){const option=button(value,()=>{editKey(value);pop.remove()},'');pop.append(option)}
            const close=button('×',()=>pop.remove());close.setAttribute('aria-label','关闭');pop.append(close);area.append(pop)};
          key.addEventListener('pointerdown',()=>{held=false;timer=setTimeout(show,450)});
          for(const ev of ['pointerup','pointerleave','pointercancel'])key.addEventListener(ev,()=>clearTimeout(timer));
          key.addEventListener('contextmenu',e=>{e.preventDefault();show()});
        }
        line.append(key);
      } area.append(line);
    }
    const line=node('div','','row');
    line.append(button(symbolMode?'ABC':'?123',()=>{symbolMode=!symbolMode;rebuild()},'key wide'));
    for(const tone of ['⁵⁵','²¹','⁵³','²⁴','³³','¹³'])line.append(button(tone,()=>editKey(tone),'key'));
    line.append(button('空格',()=>draft.value?(firstCommit?firstCommit():submit(draft.value)):submit(' '),'key wide'),button('⌫',()=>editKey('⌫'),'key wide'));
    area.append(line);
  }
  $('ipaMode').onclick=()=>{choose(3);$('menuOutputs').hidden=true;settings.hidden=false;rebuild();window.ipaCandidates()};
  $('typeMode').addEventListener('click',()=>{$('menuOutputs').hidden=false;settings.hidden=true});
})();
