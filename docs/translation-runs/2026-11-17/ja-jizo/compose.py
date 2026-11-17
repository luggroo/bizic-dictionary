from pathlib import Path
import json,hashlib,re,datetime
base=Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17');out=base/'runs/ja-jizo';source=(base/'inputs/ja-jizo.txt').read_text().splitlines()
tr=[
'dēnpǒng diè nie 地藏菩萨',
'Dīgǎ, kūzā niě bǎtǐ lōyōu bíkuī lá bú wótū, pǎpū niē āmā ǒng bǒ.',
'Gèzē tái; cīkā niě líbū bé tái.',
'除夕 zàogūdiē, pǎpū guándǒ rī nie dēnpǒng ōng dá hǒ liē, cěn bō hxí liē, dēnpǒng lǔ.',
'Dángsí, cěn wótū, lò húnī dēnpǒng pū dá.',
'Lǎngcāi, pǎpū dēnpǒng ōng dá hǒ bǒ mǒ, sōngkō cá.',
'Sōngkō nie là gǎ, súsū zí hǔ.',
'Làkūtǔ, 地藏菩萨像 六尊 排成一排 zūzù bǒ.',
'Kātā gǎ niē pétīkē gǎ, ǎsǐ nie súsū mā bǒ.',
'“Súsū gěhò dǔ bǒ, hǒnghuāi sà!”',
'Pǎpū jié hǒliě, 地藏菩萨像 niě kātā gǎ niě súsū hxǐ liē; 地藏菩萨像 lá bú lá bú mǒ dǒ dēnpǒng diè liē.',
'Dángsí, dēnpǒng ōng dá láng xié.',
'Pǎpū guándǒ niě jiézū hí liē; 第六尊地藏菩萨像 bǒ, kātā jiézū hǒliě pē liē.',
'Pǎpū sōngkō zú, āmā sīliě:',
'“Dēnpǒng lǔ liē?”',
'Pǎpū āmā bǒ, “Ngá líbū pū tā tī; ngá 地藏菩萨像 bǒ dēnpǒng lié liē,” lǐ liē.',
'Āmā xiě dá, lǐ liē:',
'“Ní sǎ cái rī liē.',
'地藏菩萨像 bé nièlīniègá i.”',
'Gèzē 剩下 nie kābiēliē lábiē pǐ mǒ gá liē, zào nié liē.',
'Āi lǎyé, rǐ nie lò jiě nie árē niē dù nie yě tō nie árē, hxě nie āidū liē ěnzǐ; gèzē rǔ liē.',
'Āi árē 渐渐 zòng diú, gèzē niě cò zīgē těn liē.',
'Pǎpū lāměn tóng zú, āidū, lótiē cībā wótū niě líbū niē bābā niē hācē pō bǒ.',
'Súsū là niě lábiān, 地藏菩萨像 六尊 sōngkō lā; gèzē dēnpǒng ōng dá niē jiézū lá hxī diè bǒ. Pǎpū gèzē yǐ liē.',
'“Āmā, 地藏菩萨像 ángnī bǒ líbū hǒ dí!”',
'Gèzē 地藏菩萨像 niě qǐnnié bō, kúkū liē, zái kúkū liē, zái kúkū liē.',
'Āiliē, 地藏菩萨像 lié nie líbū niē bābā hǒliě, gèzē nièlīniègá bǒ mǒ cīkā liē.'
]
assert len(source)==len(tr)
intro='以下采用北部龙山土家语，以调号拼音书写。\n\n'
body='\n\n'.join(f'({i}) 原文：{s}\n\n译文：{t}' for i,(s,t) in enumerate(zip(source,tr)))
notes='\n\n说明：“地藏菩萨像”“除夕”保留汉语名称；“排成一排”“第六尊”“剩下”“渐渐”采用汉语插入。“戴笠”的使役句与“包头巾”的受益句是依语法规则组合的拟译，其具体搭配仍需核实。\n\n检索模式：Skill-based。\n\n需要逐词 gloss 吗？\n'
(out/'round1.md').write_text(intro+body+notes)
evidence=json.loads((out/'evidence.json').read_text());manifest=json.loads((base/'frozen/skills/translate-tujia/lexicon/manifest.json').read_text());forms={}
for q in evidence['queries']:
 for r in q['records']:
  if r[3] and not r[3].startswith('/') and ' / ' not in r[3]:
   canon=manifest['sources'].get(r[2],{}).get('canonical_id','unknown')
   priority={'brassett-2006':0,'brassett-2004':1}.get(canon,2)
   if r[3] not in forms or priority<forms[r[3]][0]:forms[r[3]]=(priority,r,canon)
rows=[]
roles=[{}, {'participants':['old man','old woman'],'location':'small village at mountain foot','state':'residence'}, {'participants':['couple'],'poverty':True,'negation':'no rice for New Year'}, {'actor':'old man','theme':'five self-made bamboo hats','destination':'town','purpose':'sell','time':'New Year eve morning'}, {'actor':'all town people','predicate':'buy hats','negation':True}, {'actor':'old man','theme':'five hats still held','time':'evening','intention':'return home'}, {'event':'snow starts','location':'way home'}, {'theme':'six Jizo statues','posture':'standing in row','location':'roadside'}, {'theme':'white snow','location':['heads','shoulders'],'state':'accumulated'}, {'speaker':'old man','inference':'surely cold','cause':'so much snow covering'}, {'actor':'old man','instrument':'hand','events':['brush snow off statue heads','put hats on one by one']}, {'theme':'hats','exact_number':5,'focus':'only'}, {'actor':'old man','recipient':'sixth statue','theme':'own headcloth','events':['remove cloth','wrap head']}, {'actor':'old woman','event':'ask','time':'old man returns'}, {'speaker':'old woman','question_scope':'sale succeeded'}, {'speaker':'old man','events':['could not buy rice','gave hats to Jizo']}, {'speaker':'old woman','negation':'anger','event':'say'}, {'speaker':'old woman','evaluation':'good deed'}, {'speaker':'old woman','modality':'supposition','state':'Jizo also happy'}, {'participants':['couple'],'theme':'little remaining porridge','events':['share and eat','sleep early']}, {'experiencers':['couple'],'sounds':['many people calling','heavy things dragged'],'source':'far away','time':'that night'}, {'theme':'sound','events':['approach gradually','stop before house']}, {'actor':'old man','event':'open door','discovery':['rice in large bag','rice cakes','vegetables'],'state':'placed there'}, {'experiencer':'old man','theme':'six Jizo statues going home','clothing':['five hats','one headcloth'],'location':'far side of snowy path'}, {'speaker':'old man','addressee':'old woman','actor':'Jizo','theme':'rice','direction':'brought here','beneficiary':'couple'}, {'actors':['couple'],'goal':'backs of departing Jizo','event':'bow repeatedly'}, {'actors':['couple'],'means':['received rice','rice cakes'],'event':'celebrate New Year','manner':'happy'}]
for i,(s,t) in enumerate(zip(source,tr)):
 tokens=[]
 for surface in re.findall(r"[A-Za-zÀ-žǍǎǏǐǑǒǓǔǕ-ǜ]+(?:'[A-Za-zÀ-ž]+)?|[\u3400-\u9fff]+",t):
  key=surface[0].lower()+surface[1:]
  hit=forms.get(key)
  if hit:
   _,r,canon=hit; tokens.append({'surface':surface,'ipa':r[10].get('ipa',[]),'gloss':r[4] or r[5],'sense':r[4] or r[5],'entry_id':r[0],'attestation_id':r[1],'source_id':canon,'locator':r[8],'source_term':r[11]})
  else:tokens.append({'surface':surface,'ipa':None,'gloss':None,'evidence_type':'Chinese insertion' if re.search('[\u3400-\u9fff]',surface) else 'grammar reference or bound form; no independently paired lexical token'})
 rows.append({'id':f's{i}','source':s,'translation':t,'tokens':tokens,'roles':roles[i],'scope':roles[i],'constructions':['productive SOV; nominal relations per clause-patterns.md; TAM per aspect-modality.md; event sequence/manner per event-linking.md'],'open_issues': ['new causative/benefactive combination not directly attested'] if i in [10,12] else [],'checked_version':1})
record={'version':1,'source_snapshot':{'revision':manifest['revision'],'manifest_sha256':hashlib.sha256((base/'frozen/skills/translate-tujia/lexicon/manifest.json').read_bytes()).hexdigest()},'dialect':'north; Longshan target; supplementary unlocalized northern lexical witnesses retained at their actual source scope','source_language':'Japanese','sentences':rows,'query_ledger':evidence['queries'],'artifacts':['round1.md','evidence.json','translation.json'],'coverage_check':'All 27 input lines retained in original order, including title and split quoted sentences; events and participants reviewed once.'}
(out/'translation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2))
end=datetime.datetime.now(datetime.timezone.utc).isoformat()
(out/'run-meta.json').write_text(json.dumps({'start':'2026-11-17T15:13:08Z','end':end,'source_sha256':hashlib.sha256((base/'inputs/ja-jizo.txt').read_bytes()).hexdigest(),'query_count':len(evidence['queries']),'engine':'frozen static exact FNV shards','network_queries':0,'blind_constraints':'Only assigned source, frozen skill/reference/lexicon read. No other translations, evaluation results, website examples or PDF.','queries_file':'evidence.json'},ensure_ascii=False,indent=2))
print({'sentences':len(rows),'queries':len(evidence['queries']),'end':end,'output':str(out/'round1.md')})
