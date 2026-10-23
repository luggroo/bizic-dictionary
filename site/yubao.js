// Corrections are keyed by survey item and preserve the original recording transcript.
const YUBAO_LUXI_CORRECTIONS={
 '0916':{"original": "ko55ji21", "corrected": "kho55ji21", "note": "原记音 ko⁵⁵ji²¹；首音节声母校订为送气音 [kʰ]，读作 kʰo⁵⁵ji²¹。"},
 '1287':{original:'xei33dzẽ33',corrected:'xuei33dzẽ33',note:'原记音 xei³³dzẽ³³；据录音校订为 xuei³³dzẽ³³，首音节补记介音 u。'},
 '0363':{original:'ɕi35di55',corrected:'ɕi55ti35',note:'原记音 ɕi³⁵di⁵⁵；据录音校订为 ɕi⁵⁵ti³⁵。第二音节声母为清不送气音 [t]，两音节声调分别为 55、35。'},
 '0435':{original:'dia21',corrected:'tia21',note:'原记音 dia²¹；据录音，声母为清不送气音 [t]，校订为 tia²¹。'},
 '0502':{original:'nɨ21tɕi21pa35',corrected:'li21tɕi21pa35',note:'原记音 nɨ²¹tɕi²¹pa³⁵；据录音，首音节校订为 li²¹。'},
 '0751':{original:'nɨ33ɣɨ35',corrected:'li33ɣɨ35',note:'原记音 nɨ³³ɣɨ³⁵；据录音，首音节校订为 li³³。'},
 '2168':{original:'lɨ21tɕi21',corrected:'li21tɕi21',note:'原记音 lɨ²¹tɕi²¹；据录音，首音节校订为 li²¹。'}
};
function surveyWordCorrection(raw,point,serial){
 const correction=point==='60824'?YUBAO_LUXI_CORRECTIONS[serial]:null;
 return correction&&raw.normalize('NFC')===correction.original.normalize('NFC')?correction:null;
}
function surveyIPA(raw,point){
 let text=String(raw).normalize('NFC').replaceAll('ʦ','ts').replaceAll('ʨ','tɕ');
 if(point==='60823')text=text.replaceAll('sɣ33','se33');
 return normalizeIPA(text);
}
function dialectSelector(includeComparison=false){
 const option=(value,label)=>`<option value="${E(value)}" ${state.dialect===value?'selected':''}>${E(label)}</option>`;
 return `<select data-filter="dialect" aria-label="方言">${option('','全部方言')}${option('北部','北部（毕兹 密基）')}${option('龙山','　北部 · 龙山')}${option('保靖碗米坡','　北部 · 保靖碗米坡')}${option('保靖阳朝','　北部 · 保靖阳朝')}${option('南部','南部 · 泸溪潭溪')}${includeComparison?option('南北比较','南北比较'):''}${option('未标明','未标明')}</select>`;
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
 for(const place of locations){if(/龙山|他砂|靛房|坡脚/.test(place)){tags.add('龙山');tags.add('北部')}if(/保靖/.test(place)){tags.add('保靖');tags.add('北部')}if(/碗米坡/.test(place)){tags.add('保靖碗米坡');tags.add('北部')}if(/仙仁|阳朝/.test(place)){tags.add('保靖阳朝');tags.add('北部')}}
 if(tags.has('北部')&&!['龙山','保靖','保靖阳朝','保靖碗米坡','南部'].some(t=>tags.has(t)))tags.add('龙山');
 dialectCache.set(item,tags);return tags;
}
function dialectMatches(item){return !state.dialect||dialectTags(item).has(state.dialect)}
function wordVarietyInfo(w){const tags=dialectTags(w),loc=String(w.location||'').trim();if(tags.has('保靖阳朝'))return {label:'北部 · 保靖阳朝',kind:'yangchao'};if(tags.has('保靖碗米坡'))return {label:'北部 · 保靖碗米坡',kind:'wanmipo'};if(tags.has('保靖'))return {label:loc||'保靖',kind:'baojing'};if(tags.has('龙山')||tags.has('北部'))return {label:'北部 · 龙山',kind:'longshan'};if(tags.has('南部'))return {label:'南部 · 泸溪潭溪',kind:'south'};return {label:loc||w.dialect||'未标明',kind:'other'}}
function wordVarietyPill(w){const v=wordVarietyInfo(w);return `<span class="pill variety-pill variety-${v.kind}">${E(v.label)}</span>`}
function corpusCitation(c){return [c.title,S[c.source]?.title,'编号 '+c.code,c.page?'PDF 第 '+c.page+' 页':'',S[c.source]?.url,S[c.audio]?.url?'录音：'+S[c.audio].url:''].filter(Boolean).join('；')}
// Parallel lexical alternatives recorded together; spaces elsewhere retain their phrase meaning.
const YUBAO_PARALLEL_FORMS={
 'yubao-60756-v-0594':['khu53pa33thi33ma33','thi55thəu55tɕaŋ53'],
 'yubao-60756-v-0739':['tshaŋ33kɔ33','kɔ35tshaŋ33'],
 'yubao-60756-v-0370':['miaŋ33ʑi33','phau33tsɿ33']
};
async function loadYubao(data){
 const manifest=await fetch('yubao-manifest.json').then(r=>{if(!r.ok)throw Error('Survey manifest unavailable');return r.json()});
 const parts=await Promise.all(manifest.map(f=>fetch(f).then(r=>{if(!r.ok)throw Error('Survey data unavailable');return r.json()})));
 const english=await fetch('yubao-english.json').then(r=>{if(!r.ok)throw Error('Survey English glosses unavailable');return r.json()});
 const sources=new Set(data.sources.map(s=>s.id)),seen=new Map();
 for(const p of parts){
  const source='yubao-'+p.point;
  p.location=({'60756':'保靖阳朝','60823':'保靖碗米坡','60824':'泸溪潭溪'})[p.point]||p.location;
  if(!sources.has(source)){
   data.sources.push({id:source,title:'中国语保 · '+p.location,url:'https://zhongguoyuyan.cn/point/'+p.point,dialect:p.dialect,locations:[p.location],topics:['词汇','例句'],kind:'调查资料',status:'已收录',path:'中国语言资源保护工程',text:'',dialectBasis:p.dialect+'土家语，'+p.location});sources.add(source);
  }
  for(const [serial,zh,raw,annotation,alias] of p.words){
   const correction=surveyWordCorrection(raw,p.point,serial);
   const id=source+'-v-'+serial,ipa=surveyIPA(correction?.corrected||raw,p.point);
   const en=english.serialOverrides[serial]||english.glosses[zh]||'';
   if(!en)throw Error('Missing survey English gloss: '+serial+' '+zh);
   const enTranslation={method:'editorial-translation',basis:'语保汉语调查词目与提示',evidence:english.evidence[p.point+'-'+serial]||[]};
   const a={id,source,term:raw,zh,en,originalEn:'',enTranslation,pos:'',scheme:'IPA',locator:'词汇 '+serial,alt:alias,notice:annotation,dialect:p.dialect,collection:'中国语保',category:'',language:'土家语'};
   if(correction)a.correctedTerm=correction.corrected;
   const key=source+'|'+zh+'|'+ipa.replace(/\s/g,'');
   if(seen.has(key)){const w=seen.get(key);w.attestations.push(a);if(!w.glosses.includes(en))w.glosses.push(en);w.notations.ipa[0].attestationIds.push(id);data.wordAliases[id]=w.id;continue}
   const parallel=YUBAO_PARALLEL_FORMS[id],rawForms=parallel||[raw],ipaForms=parallel?rawForms.map(form=>surveyIPA(form,p.point)):[ipa];
   const w={...a,term:ipaForms.join(' ~ '),location:p.location,attestations:[a],sourceIds:[source],schemes:['IPA'],dialects:[p.dialect],collections:['中国语保'],positions:[''],categories:[''],forms:parallel?[...new Set([...ipaForms,...rawForms,raw])]:[ipa,raw],glosses:[en],zhVariants:[zh],notations:{ye:[],brassett:[],accent:[],ipa:ipaForms.map(text=>({text,method:'source',profile:source,attestationIds:[id]}))}};
   if(parallel)w.parallelFormReview={method:'editorial-segmentation',parts:[...parallel]};
   if(correction)w.notations.ipa[0].method='editorial-correction';
   if(['60756','60757','60823'].includes(p.point))for(const [index,form] of rawForms.entries()){
    const converted=northernSurveySpelling(form,p.point);if(!converted)continue;
    const pairing=parallel?{ipaForms:[ipaForms[index]]}:{};
    w.notations.ye.push({text:converted.ye,accent:converted.accent,method:'user-reviewed',profile:source,attestationIds:[id],...pairing});
    w.notations.accent.push({text:converted.accent,method:'user-reviewed',profile:source,attestationIds:[id],...pairing});
   }
   data.words.push(w);seen.set(key,w);
  }
  for(const [serial,zh,raw,annotation] of p.sentences){const ipa=surveyIPA(raw,p.point);data.corpus.push({id:source+'-s-'+serial,source,survey:true,code:serial,title:zh,ipa,text:zh+'\n/'+ipa+'/',annotation,locations:[p.location],people:[],genre:'调查例句',dialect:p.dialect,audio:'',page:null})}
 }
}
function surveySentenceDetail(c){const converted=c.dialect==='南部'?southernSpelling(c.ipa,c.source):northernSurveySpelling(c.ipa,c.source.replace('yubao-',''));const spelling=converted?(c.dialect==='南部'?converted[southernDisplay==='poj'?'poj':'accent']:converted[spellingDisplay==='ye'?'ye':'accent']):'';return `<div class="row"><h2 class="grow">${E(c.title)}</h2></div>${spelling?`<p class="survey-spelling">${E(spelling)}</p>`:''}<p>/${E(c.ipa)}/</p><p class="tiny">${corpusMetadataLabels([...c.locations,'中文为调查提示句'])}</p>${c.annotation?`<p>${E(c.annotation)}</p>`:''}<div class="detail-actions"><button data-copy="${E(c.id)}">复制引用</button></div><p><a href="${E(S[c.source].url)}" target="_blank" rel="noopener">中国语保 · 例句 ${E(c.code)} ↗</a></p>`}

// Wan­mipo surface-tone spelling: 33 and 31 share r, but retain distinct accents.
const WANMIPO_TONES={'13':['f',2],'33':['r',3],'55':['x',1],'53':['v',4],'31':['r',3]};
// Initial i/u use y/w; source-specific rimes and tone classes remain separate.
function northernInitialCore(core,ipaCore=''){return normalizeInitialGlides(core,ipaCore)}
function wanmipoSpelling(raw){
 const onsets={'tɕʰ':'q','tsʰ':'c','pʰ':'p','tʰ':'t','kʰ':'k','tɕ':'j','ts':'z','ɲ':'n','ȵ':'n','ŋ':'ng','p':'b','t':'d','k':'g','m':'m','n':'n','l':'l','s':'s','z':'r','ɕ':'x','ʑ':'y','j':'y','x':'h','ɣ':'hx','':''};
 const rimes={'a':'a','i':'i','u':'u','ɿ':'i','o':'o','e':'e','ɤ':'e','ɤe':'e','ie':'ie','ai':'ai','au':'ao','iau':'iao','ɤu':'ou','iɤu':'iu','ui':'ui','ua':'ua','uai':'uai','ia':'ia','uo':'o','ũ':'ong','ã':'an','iã':'ian','ĩ':'in','uã':'uan','ɤ̃':'en','uɤ̃':'un','iɚ':'ier','uɚ':'uer'};
 const text=plainTones(surveyIPA(raw,'60823')).normalize('NFC');
 let ye='',accent='',pos=0,previous='';
 for(const m of text.matchAll(/([^0-9\s]+)([0-9]+)/g)){
  const gap=text.slice(pos,m.index);if(gap.trim())return null;
  const onset=Object.keys(onsets).sort((a,b)=>b.length-a.length).find(o=>m[1].startsWith(o));
  const rime=m[1].slice(onset.length),vowel=rimes[rime],tone=WANMIPO_TONES[m[2]];
  if(!vowel||!tone)return null;
  const core=pinyinPalatalCore(northernInitialCore(onsets[onset]+vowel,m[1]));
  const marked=m[2]==='33'?core:accentSyllable(core,tone[1]);
  const separator=!gap&&previous&&(/^[aeiou]/.test(core)||(/n$/.test(previous)&&/^g/.test(core)))?"'":'';
  ye+=gap+core+tone[0];accent+=gap+separator+marked;previous=core;pos=m.index+m[0].length;
 }
 return pos&& !text.slice(pos).trim()?{ye:ye+text.slice(pos),accent:accent+text.slice(pos)}:null;
}
NOTATION_CONFIG.profiles.push({id:'yubao-60823',source:'yubao-60823',title:'中国语保 · 保靖碗米坡',kind:'ipa',status:'按表层调值转写',count:2990,dialects:['北部 · 保靖碗米坡'],notes:['碗米坡按表层调值转写：13→f／á，33→r／不标调，55→x／ā，53→v／à，31→r／ǎ。33、31在叶式拼音中同写r；调号拼音中33不标，31写ǎ。不标调表示33调值，不表示轻声。']});

// Point-specific survey orthographies; original IPA remains untouched.
function northernSurveySpelling(raw,point){
 if(point==='60823')return wanmipoSpelling(raw);
 if(!['60756','60757'].includes(point))return null;
 const xr=point==='60756';
 const tones=xr?{'55':['x',1],'35':['f',2],'33':['r',3],'53':['v',4]}:{'55':['x',1],'53':['v',4],'33':['x',1],'24':['f',2],'22':['r',3],'21':['r',3]};
 const onsets={'tɕʰ':'q','tsʰ':'c','pʰ':'p','tʰ':'t','kʰ':'k','tɕ':'j','ts':'z','ɲ':'n','ȵ':'n','ŋ':'ng','p':'b','t':'d','k':'g','m':'m','n':'n','l':'l','s':'s','z':'r','ɕ':'x','ʑ':'y','j':'y','x':'h','ɣ':'hx','ɸ':'h','':''};
 const rimes={'a':'a','i':'i','u':'u','ɿ':'i','o':'o','ɔ':'o','ɘ':'e','ə':'e','ɤ':'e','ɯ':'i','e':xr?'ei':'e','ɛ':'ai','ie':'ie','iɘ':'ie','iə':'ie','ai':'ai','ei':'ei','ɘi':'ei','au':'ao','iau':'iao','əu':'ou','ɘu':'ou','iəu':'iu','iɘu':'iu','iu':'iu','ui':'ui','uei':'ui','ua':'ua','uai':'uai','uɛ':'uai','ia':'ia','uo':'o','io':'io','aŋ':xr?'an':'ang','an':'an','ian':'ian','iaŋ':'iang','uan':'uan','uaŋ':'uang','uŋ':'ong','ɔŋ':'ong','ɘn':'en','ən':'en','ɘŋ':'en','əŋ':'en','en':'en','eŋ':'en','in':'in','iŋ':'in','un':'un','uen':'un','iən':'ian','ɚ':'er','iɚ':'ier','uɚ':'uer'};
 const text=plainTones(surveyIPA(raw,point)).normalize('NFC');
 let ye='',accent='',pos=0,previous='';
 for(const m of text.matchAll(/([^0-9\s（）()]+)([0-9]+)/g)){
  const gap=text.slice(pos,m.index);if(!/^[\s（）()]*$/.test(gap))return null;
  const onset=Object.keys(onsets).sort((a,b)=>b.length-a.length).find(o=>m[1].startsWith(o));
  const rime=m[1].slice(onset.length),vowel=rimes[rime],tone=tones[m[2]];
  if(!vowel||!tone)return null;
  let core=northernInitialCore(onsets[onset]+vowel,m[1]);
  if(xr&&['ȵ','ɲ'].includes(onset))core='ni'+(rime==='e'?'e':vowel.replace(/^i/,''));
  if(xr&&['e','ɛ'].includes(rime)&&['tɕ','tɕʰ','ɕ','ʑ'].includes(onset))core=({'tɕ':'jie','tɕʰ':'qie','ɕ':'xie','ʑ':'ye'})[onset];
  core=pinyinPalatalCore(core);
  const separator=!gap&&previous&&(/^[aeiou]/.test(core)||(/n$/.test(previous)&&/^g/.test(core)))?"'":'';
  ye+=gap+core+tone[0];accent+=gap+separator+accentSyllable(core,tone[1]);previous=core;pos=m.index+m[0].length;
 }
 const tail=text.slice(pos);return pos&&/^[\s（）()]*$/.test(tail)?{ye:ye+tail,accent:accent+tail}:null;
}
for(const [point,title,count,notes] of [
 ['60756','保靖仙仁（阳朝）',2883,'55→x，35→f，33→r，53→v；e→ei，ə→e，ɛ→ai；j/q/x/y对应声母后的e、ɛ统一写jie/qie/xie/ye；ȵ→ni，ȵe→nie；ɚ→er。'],
 ['60757','龙山',2008,'按当前表层归并：55／33→x，53→v，24→f，22／21→r。an 与 aŋ 分别写 an、ang；异常调值保留 IPA。']
])NOTATION_CONFIG.profiles.push({id:'yubao-'+point,source:'yubao-'+point,title:'中国语保 · '+title,kind:'ipa',status:'按调查点规则转写',count,dialects:['北部 · '+title],notes:[notes]});
