function surveyIPA(raw,point){
 let text=String(raw).normalize('NFC').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ');
 if(point==='60823')text=text.replaceAll('sɣ33','se33');
 return text.replace(/(tɕ|ts|p|t|k)h/g,'$1ʰ').replace(/[0-9]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]);
}
function dialectSelector(includeComparison=false){
 const option=(value,label)=>`<option value="${E(value)}" ${state.dialect===value?'selected':''}>${E(label)}</option>`;
 return `<select data-filter="dialect" aria-label="方言">${option('','全部方言')}<optgroup label="北部">${option('北部','北部（全部）')}${option('龙山','　龙山')}${option('保靖碗米坡','　保靖碗米坡')}${option('保靖阳朝','　保靖阳朝')}</optgroup>${option('南部','南部')}${includeComparison?option('南北比较','南北比较'):''}${option('未标明','未标明')}</select>`;
}
const dialectCache=new WeakMap();
function dialectTags(item){
 if(dialectCache.has(item))return dialectCache.get(item);
 const tags=new Set(item.dialects||[item.dialect].filter(Boolean));
 const sourceIds=item.sourceIds||[item.source||item.id];
 const pointLocations={'yubao-60757':'龙山','yubao-60756':'保靖阳朝','yubao-60823':'保靖碗米坡'};
 for(const id of sourceIds){
  if(pointLocations[id]){tags.add(pointLocations[id]);tags.add('北部')}
  if(id==='yubao-60824')tags.add('南部');
  if(id==='brassett-2004'||id==='brassett-2006'){tags.add('北部');tags.add('龙山')}
  const src=S[id];if(src?.dialect==='北部'||src?.dialect==='南部')tags.add(src.dialect);
 }
 const locations=[item.location,...(item.locations||[])].filter(Boolean);
 for(const place of locations){if(/龙山|他砂|靛房|坡脚/.test(place)){tags.add('龙山');tags.add('北部')}if(/碗米坡/.test(place)){tags.add('保靖碗米坡');tags.add('北部')}if(/仙仁|阳朝/.test(place)){tags.add('保靖阳朝');tags.add('北部')}}
 dialectCache.set(item,tags);return tags;
}
function dialectMatches(item){return !state.dialect||dialectTags(item).has(state.dialect)}
function corpusCitation(c){return [c.title,S[c.source]?.title,'编号 '+c.code,c.page?'PDF 第 '+c.page+' 页':'',S[c.source]?.url,S[c.audio]?.url?'录音：'+S[c.audio].url:''].filter(Boolean).join('；')}
async function loadYubao(data){
 const manifest=await fetch('yubao-manifest.json').then(r=>{if(!r.ok)throw Error('Survey manifest unavailable');return r.json()});
 const parts=await Promise.all(manifest.map(f=>fetch(f).then(r=>{if(!r.ok)throw Error('Survey data unavailable');return r.json()})));
 const sources=new Set(data.sources.map(s=>s.id)),seen=new Map();
 for(const p of parts){
  const source='yubao-'+p.point;
  p.location=({'60756':'保靖阳朝','60823':'保靖碗米坡','60824':'泸溪（潭溪）'})[p.point]||p.location;
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
function surveySentenceDetail(c){return `<div class="row"><h2 class="grow">${E(c.title)}</h2>${bookmark(c.id)}</div><p>/${E(c.ipa)}/</p><p class="tiny">${E(c.locations.join(' · '))} · 中文为调查提示句</p>${c.annotation?`<p>${E(c.annotation)}</p>`:''}<div class="detail-actions"><button data-copy="${E(c.id)}">复制引用</button></div><p><a href="${E(S[c.source].url)}" target="_blank" rel="noopener">中国语保 · 例句 ${E(c.code)} ↗</a></p>${noteArea(c.id)}`}
