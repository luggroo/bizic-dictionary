function surveyIPA(raw,point){
 let text=String(raw).normalize('NFC').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ');
 if(point==='60823')text=text.replaceAll('sɣ33','se33');
 return text.replace(/(tɕ|ts|p|t|k)h/g,'$1ʰ').replace(/[0-9]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]);
}
async function loadYubao(data){
 const manifest=await fetch('yubao-manifest.json').then(r=>{if(!r.ok)throw Error('Survey manifest unavailable');return r.json()});
 const parts=await Promise.all(manifest.map(f=>fetch(f).then(r=>{if(!r.ok)throw Error('Survey data unavailable');return r.json()})));
 const sources=new Set(data.sources.map(s=>s.id)),seen=new Map();
 for(const p of parts){
  const source='yubao-'+p.point;
  if(!sources.has(source)){
   data.sources.push({id:source,title:'中国语保 · '+p.location,url:'https://zhongguoyuyan.cn/point/'+p.point,dialect:p.dialect,locations:[p.location],topics:['词汇','例句'],kind:'调查资料',status:'已收录',path:'中国语言资源保护工程',text:'',dialectBasis:p.dialect+'土家语，'+p.location});sources.add(source);
  }
  for(const [serial,zh,raw,annotation,alias] of p.words){
   const id=source+'-v-'+serial,ipa=surveyIPA(raw,p.point);
   const a={id,source,term:raw,zh,en:'',pos:'',scheme:'IPA',locator:'词汇 '+serial,alt:alias,notice:annotation,dialect:p.dialect,collection:'中国语保',category:'',language:'土家语'};
   const key=source+'|'+zh+'|'+ipa.replace(/\s/g,'');
   if(seen.has(key)){const w=seen.get(key);w.attestations.push(a);w.notations.ipa[0].attestationIds.push(id);data.wordAliases[id]=w.id;continue}
   const w={...a,term:ipa,location:p.location,attestations:[a],sourceIds:[source],schemes:['IPA'],dialects:[p.dialect],collections:['中国语保'],positions:[''],categories:[''],forms:[ipa,raw],glosses:[],zhVariants:[zh],notations:{ye:[],brassett:[],accent:[],ipa:[{text:ipa,method:'source',profile:source,attestationIds:[id]}]}};
   data.words.push(w);seen.set(key,w);
  }
  for(const [serial,zh,raw,annotation] of p.sentences){const ipa=surveyIPA(raw,p.point);data.corpus.push({id:source+'-s-'+serial,source,survey:true,code:serial,title:zh,ipa,text:zh+'\n/'+ipa+'/',annotation,locations:[p.location],people:[],genre:'调查例句',dialect:p.dialect,audio:'',page:null})}
 }
}
function surveySentenceDetail(c){return `<div class="row"><h2 class="grow">${E(c.title)}</h2>${bookmark(c.id)}</div><p>/${E(c.ipa)}/</p><p class="tiny">${E(c.locations.join(' · '))} · 中文为调查提示句</p>${c.annotation?`<p>${E(c.annotation)}</p>`:''}<p><a href="${E(S[c.source].url)}" target="_blank" rel="noopener">中国语保 · 例句 ${E(c.code)} ↗</a></p>${noteArea(c.id)}`}
