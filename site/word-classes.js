/* Bilingual part-of-speech taxonomy. Source labels are preserved unchanged. */
'use strict';
const WordClasses=(()=>{
 const tree=[
  {id:'lexical',zh:'实词',en:'Content words',children:[
   {id:'noun',zh:'名词',en:'Noun',children:[
    {id:'noun.proper',zh:'专有名词',en:'Proper noun'},
    {id:'noun.locative',zh:'处所名词',en:'Locative noun'},
    {id:'noun.temporal',zh:'时间名词',en:'Temporal noun'}]},
   {id:'pronoun',zh:'代词',en:'Pronoun',children:[
    {id:'pronoun.personal',zh:'人称代词',en:'Personal pronoun'},
    {id:'pronoun.demonstrative',zh:'指示代词',en:'Demonstrative pronoun'},
    {id:'pronoun.interrogative',zh:'疑问代词',en:'Interrogative pronoun'},
    {id:'pronoun.reflexive',zh:'反身代词',en:'Reflexive pronoun'}]},
   {id:'verb',zh:'动词',en:'Verb',children:[
    {id:'verb.transitive',zh:'及物动词',en:'Transitive verb'},
    {id:'verb.intransitive',zh:'不及物动词',en:'Intransitive verb'},
    {id:'verb.auxiliary',zh:'助动词',en:'Auxiliary verb'},
    {id:'verb.stative',zh:'状态动词',en:'Stative verb'},
    {id:'verb.copular',zh:'系动词',en:'Copula'}]},
   {id:'adjective',zh:'形容词',en:'Adjective'},
   {id:'adverb',zh:'副词',en:'Adverb'},
   {id:'numeral',zh:'数词',en:'Numeral'},
   {id:'classifier',zh:'量词',en:'Classifier'}]},
  {id:'function',zh:'虚词',en:'Function words',children:[
   {id:'adposition',zh:'介词与后置词',en:'Adpositions',children:[
    {id:'adposition.preposition',zh:'介词',en:'Preposition'},
    {id:'adposition.postposition',zh:'后置词',en:'Postposition'}]},
   {id:'conjunction',zh:'连词',en:'Conjunction'},
   {id:'determiner',zh:'限定词',en:'Determiner'},
   {id:'particle',zh:'助词',en:'Particle',children:[
    {id:'particle.aspect',zh:'体助词',en:'Aspect particle'},
    {id:'particle.modal',zh:'语气助词',en:'Modal particle'},
    {id:'particle.structural',zh:'结构助词',en:'Structural particle'},
    {id:'particle.negative',zh:'否定词',en:'Negator'},
    {id:'particle.nominalizer',zh:'名词化成分',en:'Nominalizer'}]}]},
  {id:'morphology',zh:'词缀与构词成分',en:'Affixes and word formation',children:[
   {id:'affix',zh:'词缀',en:'Affix',children:[
    {id:'affix.prefix',zh:'前缀',en:'Prefix',children:[
     {id:'affix.prefix.nominal',zh:'名词性前缀',en:'Nominal prefix'}]},
    {id:'affix.suffix',zh:'后缀',en:'Suffix',children:[
     {id:'affix.suffix.nominal',zh:'名词性后缀',en:'Nominal suffix'},
     {id:'affix.suffix.verbal',zh:'动词性后缀',en:'Verbal suffix'},
     {id:'affix.suffix.adjectival',zh:'形容词性后缀',en:'Adjectival suffix'}]}]}]},
  {id:'other',zh:'其他',en:'Other',children:[
   {id:'interjection',zh:'感叹词',en:'Interjection'},
   {id:'ideophone',zh:'拟声拟态词',en:'Ideophone'},
   {id:'phrase',zh:'短语与表达',en:'Phrase or expression'},
   {id:'unclassified',zh:'词性未定',en:'Unclassified'}]}
 ];
 const byId=new Map(),parent=new Map(),order=new Map();
 function visit(n,p){byId.set(n.id,n);parent.set(n.id,p);order.set(n.id,order.size);for(const c of n.children||[])visit(c,n.id);}
 tree.forEach(n=>visit(n,''));
 const normalize=x=>String(x??'').normalize('NFKC').toLowerCase().trim()
   .replace(/[‐‑‒–—−]/g,'-').replace(/\s+/g,' ').replace(/^(?:part of speech|word class|pos)\s*:\s*/,'').replace(/[\s.]+$/,'').trim();
 const synonyms=new Map();
 function add(id,...names){for(const n of [id,...names])synonyms.set(normalize(n),id);}
 add('noun','n','n.','subst','substantive','nom','名词','名物词','common noun','普通名词','n.common','nbp','nveg','nanim','nrel');
 add('noun.proper','proper noun','proper name','propn','n.prop','nprop','npr','pn','专名','专有名词','人名','地名');
 add('noun.locative','locative noun','locative','location noun','n.loc','处所名词','方位名词');
 add('noun.temporal','temporal noun','time noun','n.time','时间名词');
 add('pronoun','pron','pron.','pro','pronoun','代词');
 add('pronoun.personal','personal pronoun','pers pron','pers. pron.','人称代词');
 add('pronoun.demonstrative','demonstrative pronoun','dem. pron.','dem pron','指示代词','dem');
 add('pronoun.interrogative','interrogative pronoun','int. pron.','wh pronoun','疑问代词','intg');
 add('pronoun.reflexive','reflexive pronoun','refl pron','反身代词');
 add('verb','v','v.','vb','verb','动词');
 add('verb.transitive','vt','v.t','v.t.','vtr','v.tr','tr.v','tr. v.','transitive verb','transitive v','及物动词','他动词');
 add('verb.intransitive','vi','v.i','v.i.','vintr','v.intr','intr.v','intr. v.','intransitive verb','intransitive v','不及物动词','自动词','itr.v.');
 add('verb.auxiliary','aux','aux.','auxiliary','auxiliary verb','aux verb','v.aux','助动词','va.');
 add('verb.stative','be v.','be','stative verb','be verb','状态动词');
 add('verb.copular','vc.','copula','copular verb','系动词');
 add('adjective','adj','adj.','a','a.','adjectival','adjective','stative adjective','形容词');
 add('adverb','adv','adv.','adverb','adverbial','副词','advm.','advt.','advl.','advd.');
 add('numeral','num','num.','numeral','number','number word','数词');
 add('classifier','cl','cl.','clf','clf.','clsf','class','classifier','measure word','measure','mw','量词','名量词','动量词');
 add('adposition','adp','adposition','介词后置词','介词/后置词');
 add('adposition.preposition','prep','prep.','preposition','介词');
 add('adposition.postposition','postp','postp.','postposition','后置词');
 add('conjunction','conj','conj.','conjunction','connective','连词');
 add('determiner','det','det.','determiner','article','限定词','冠词');
 add('particle','part','part.','ptcl','prt','particle','助词');
 add('particle.aspect','aspect particle','aspect marker','asp particle','体助词','体标记');
 add('particle.modal','modal particle','sentence-final particle','sentence final particle','mood particle','语气词','语气助词');
 add('particle.structural','structural particle','structural marker','结构助词');
 add('particle.negative','neg','neg.','negator','negative particle','negative marker','否定词','否定助词');
 add('particle.nominalizer','nominalizer','nominaliser','nominalizing particle','nominalising particle','名词化成分','名词化助词');
 add('affix','aff','aff.','affix','词缀');
 add('affix.prefix','pref','pref.','prefix','前缀');
 add('affix.prefix.nominal','npref','npref.','nominal prefix','noun prefix','名词性前缀','名词前缀');
 add('affix.suffix','suff','suff.','suf','suf.','suffix','后缀');
 add('affix.suffix.nominal','nsuff','nsuff.','nominal suffix','noun suffix','nominalizing suffix','nominalising suffix','名词性后缀','名词后缀');
 add('affix.suffix.verbal','vsuff','vsuff.','verbal suffix','verb suffix','动词性后缀','动词后缀');
 add('affix.suffix.adjectival','asuff','adjectival suffix','adjective suffix','形容词后缀');
 add('interjection','interj','interj.','intj','interjection','exclamation','叹词','感叹词');
 add('ideophone','ideo','ideophone','onomatopoeia','onomatopoeic','mimetic','拟声词','拟态词','象声词','onom.');
 add('phrase','phr','phr.','phrase','expression','idiom','fixed expression','proverb','短语','惯用语','固定搭配','成语','谚语','expr.');
 add('unclassified','unknown','unspecified','unclassified','undetermined','未分类','待定','词性未定','?','—','-');
 function one(raw){
   const t=normalize(raw);
   if(synonyms.has(t))return synonyms.get(t);
   if(synonyms.has(t.replace(/\s+/g,'')))return synonyms.get(t.replace(/\s+/g,''));
   const paren=t.match(/^(.+?)\s*\([^)]*\)$/);
   return paren?synonyms.get(normalize(paren[1]))||null:null;
 }
 function resolve(raw){
   if(!String(raw??'').trim())return [];
   const direct=one(raw);if(direct)return [direct];
   const parts=String(raw).split(/\s*(?:[,，;；、/＋+&]|\b(?:and|or)\b|\s+兼\s+)\s*/i).filter(Boolean);
   return parts.length>1?[...new Set(parts.map(one).filter(Boolean))]:[];
 }
 function sourceLabels(w){
   return [...new Set([...(Array.isArray(w?.positions)?w.positions:[]),w?.pos]
     .filter(x=>x!==null&&x!==undefined&&String(x).trim()).map(x=>String(x).trim()))];
 }
 const reviewedClasses=new Map([['yubao-60823-v-2790',['phrase']],['yubao-60756-v-2550',['phrase']],['yubao-60823-v-2550',['phrase']],['yubao-60824-v-2550',['phrase']]]);
 function reviewedIds(w){
   return [...new Set([w?.id,...(w?.mergedWordIds||[]),...(w?.attestations||[]).map(a=>a.id)]
     .flatMap(id=>reviewedClasses.get(id)||[]))];
 }
 const cache=new WeakMap();
 function ids(w){
   if(!w||typeof w!=='object')return ['unclassified'];
   if(cache.has(w))return cache.get(w);
   const found=new Set(reviewedIds(w));
   if(!found.size)for(const raw of sourceLabels(w))for(const id of resolve(raw))found.add(id);
   if(!found.size)found.add('unclassified');
   const out=[...found].filter(id=>![...found].some(other=>other!==id&&other.startsWith(id+'.')))
     .sort((a,b)=>order.get(a)-order.get(b));
   cache.set(w,out);return out;
 }
 function filterId(v){if(!v)return '';if(byId.has(v))return v;const a=resolve(v);return a.length===1?a[0]:v;}
 function ancestors(id){const found=[];for(let p=id;p;p=parent.get(p))found.push(p);return found;}
 function matches(w,wanted){
   if(!wanted)return true;
   const target=filterId(wanted);
   return byId.has(target)?ids(w).some(id=>ancestors(id).includes(target))
     :sourceLabels(w).some(label=>normalize(label)===normalize(wanted));
 }
 function label(w){
   if(!sourceLabels(w).length&&!reviewedIds(w).length)return '';
   return ids(w).map(id=>byId.get(id).zh+' / '+byId.get(id).en).join(' · ');
 }
 function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 let counts=new Map();
 function initialize(words){
   counts=new Map();
   for(const w of words){
     const keys=new Set(ids(w).flatMap(ancestors));
     for(const key of keys)counts.set(key,(counts.get(key)||0)+1);
   }
 }
 function selector(selected){
   const chosen=filterId(selected),count=id=>counts.get(id)||0;
   let result='<select data-filter="pos" aria-label="词性 / Part of speech"><option value="">全部词性 / All parts of speech</option>';
   function option(n,depth){
     if(!count(n.id))return '';
     const title=(depth?'　↳ ':'')+n.zh+' / '+n.en;
     let out='<option value="'+escape(n.id)+'"'+(chosen===n.id?' selected':'')+'>'+escape(title)+'</option>';
     for(const child of n.children||[])out+=option(child,depth+1);
     return out;
   }
   for(const group of tree){
     if(!count(group.id))continue;
     result+='<optgroup label="'+escape(group.zh+' / '+group.en)+'">';
     result+=option({id:group.id,zh:'全部'+group.zh,en:'All '+group.en.toLowerCase()},0);
     for(const child of group.children||[])result+=option(child,0);
     result+='</optgroup>';
   }
   if(chosen&&!byId.has(chosen))result+='<option value="'+escape(chosen)+'" selected>'+escape(chosen)+'</option>';
   return result+'</select>';
 }
 function unmapped(words){
   const count=new Map();
   for(const w of words)for(const raw of sourceLabels(w))if(!resolve(raw).length)count.set(raw,(count.get(raw)||0)+1);
   return [...count].sort((a,b)=>b[1]-a[1]);
 }
 return {tree,resolve,ids,filterId,matches,label,initialize,selector,unmapped};
})();
