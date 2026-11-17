import json, pathlib, hashlib, datetime
P=pathlib.Path('/workspace/korean-bandall-result'); R=pathlib.Path('/workspace/korean-bandall-skill')
allr=[]
for n in ['02','03','04']:
 d=json.loads((P/f'evidence-{n}.json').read_text())
 for q in d['results']:
  for c in q['candidate_results']: allr.extend(c['witnesses'])
def witness(a):
 return next(w for w in allr if w['attestation_id']==a)
def tok(a,g,p=None):
 w=witness(a);return {'surface':p or w['term'],'ipa':w.get('notations',{}).get('ipa',[None])[0],'gloss':g,'sense':w['zh']+' / '+w['en'],'entry_id':w['entry_id'],'attestation_id':a,'source_id':w['canonical_source'],'locator':w['locator'],'source':w}
def loan(word,g):
 q=json.loads((P/f'loan-{word}.json').read_text()); d=json.loads(q['stdout']); return {'surface':d['romanization'].replace(' ',''),'ipa':None,'gloss':g,'sense':word,'entry_id':None,'attestation_id':None,'source_id':'proposed-loan-mapping','locator':'scripts/lookup-loan.py','source':{'type':'proposed-loan-mapping','word':word,'evidence_file':f'loan-{word}.json','attested':False,'mapped_ipa':d['ipa']}}
def name():return {'surface':'윤극영','ipa':None,'gloss':'윤극영','source':{'type':'source-proper-name','source':'윤극영 작사 작곡','note':'이름의 토가어 독음 미확인; 원문 표기 유지'}}
def linked(a,g):
 t=tok(a,g);n=tok('stedt-rn-455065','LNK');t['surface']+='-'+n['surface'];t['ipa']+='-'+n['ipa'];t['gloss']+='-LNK';t['source']={'type':'productive-modifier','root':t['source'],'linker':n['source'],'rule':'references/clause-patterns.md#nominalization; A-nie N'};return t
clauses=[]
def add(source,units,roles,scope,constructions,issues=[]):
 us=[]
 for ts in units:us.append({'translation':' '.join(t['surface'] for t in ts),'tokens':ts})
 clauses.append({'id':'s'+str(len(clauses)+1),'source':source,'translation':'\n'.join(u['translation'] for u in us),'target_units':us,'roles':roles,'scope':scope,'constructions':constructions,'open_issues':issues,'checked_version':1})
add('<반달>',[[tok('stedt-rn-453488','달'),tok('stedt-rn-455092','절반')]],{'head':'moon','quantity':'half'}, {},['N + quantity'],['반달 제목은 달의 절반이라는 명사구로 풀이한 생산적 표현이다.'])
add('윤극영 작사 작곡',[[name(),loan('歌词','노랫말'),tok('stedt-rn-454684','쓰다')],[name(),loan('作曲','작곡하다')]],{'agent':'윤극영','events':['write lyrics','compose music']},{},['SOV; Chinese predicate insertion'],['윤극영의 토가어 독음은 확인되지 않아 원문을 유지한다.'])
add('푸른 하늘 은하수 하얀 쪽배에',[[linked('w5558','푸르다'),tok('stedt-rn-453464','하늘'),tok('stedt-rn-455022','안'),loan('银河','은하수'),tok('stedt-rn-455022','안'),linked('stedt-rn-454844','희다'),tok('stedt-rn-454631','배'),tok('stedt-rn-454852','작은'),tok('stedt-rn-455022','안')]],{'locations':['blue sky','Milky Way','white little boat']},{'blue':'sky','white':'boat','small':'boat'},['short property-LNK-N; N + attested long adjective; stacked locative background'],['쪽배는 작은 배로 옮겼다.'])
add('계수나무 한 나무 토끼 한 마리',[[loan('桂树','계수나무'),tok('stedt-rn-455088','하나'),tok('stedt-rn-457128','그루'),tok('stedt-rn-453578','토끼'),tok('stedt-rn-455088','하나'),tok('stedt-rn-456932','마리'),tok('stedt-rn-454792','있다')]],{'existents':['one osmanthus tree','one rabbit'],'location':'previous source line, inside boat'},{'one':['tree','rabbit']},['location + existents + existence; noun-number-classifier'])
add('돛대도 아니 달고 삿대도 없이',[[tok('stedt-rn-458015','돛대'),tok('stedt-rn-455212','FOC'),tok('stedt-rn-454362','달다'),tok('stedt-rn-455032','NEG')],[tok('stedt-rn-454643','삿대'),tok('stedt-rn-455212','FOC'),tok('stedt-rn-454784','없다')]],{'topic':'boat from preceding lines','objects':['mast','steering pole']},{'negation':['install mast','have pole'],'additive_focus':['mast','pole']},['O + additive focus + V + factual NEG; negative existence'],['두 부정 진술로 풀어 쓰며, 다음 행의 이동 배경이라는 관계는 문맥으로 이어진다.'])
add('가기도 잘도 간다 서쪽 나라로',[[tok('stedt-rn-458086','서쪽'),tok('stedt-rn-455065','LNK'),tok('stedt-rn-456283','나라'),{'surface':'bō','ipa':'pɔ⁵⁵','gloss':'ALL','source':{'type':'compiled-grammar','reference':'references/clause-patterns.md#case-frames','citation':'Brassett 2006:100 ex.64','paired_forms':'bō /pɔ⁵⁵/'}},tok('stedt-rn-454858','좋다'),tok('stedt-rn-455076','아주'),{'surface':'mǒ','ipa':'mɔ²¹','gloss':'ADVZ','source':{'type':'compiled-grammar','reference':'references/event-linking.md#event-relations','citation':'Brassett 2006:37 ex.12; 152–154','paired_forms':'mǒ /mɔ²¹/'}},tok('stedt-rn-454319','가다')]],{'mover':'boat from preceding context','goal':'western country'},{'manner':'very well; evaluative emphasis','tense':'general present'},['goal + ALL + manner + ADVZ + motion predicate'])
ledger=[]
for n in ['02','03','04']:
 for q in json.loads((P/f'evidence-{n}.json').read_text())['results']:
  for c in q['candidate_results']:ledger.append({'query':c['query'],'engine':'static-exact','dialect':'north','revision':q['dictionary_revision'],'status':'hit' if c['dialect_filtered_hits'] else 'zero','witness_ids':[w['attestation_id'] for w in c['witnesses']],'evidence_file':f'evidence-{n}.json','budget_max':12})
manifest=R/'skills/translate-tujia/lexicon/manifest.json'
record={'version':1,'source_snapshot':{'skill_revision':'8acd0fbcc4ace28d6a9e16871c98365427b2c0aa','revision':json.loads(manifest.read_text()).get('revision'),'manifest_sha256':hashlib.sha256(manifest.read_bytes()).hexdigest()},'dialect':'Northern Tujia / Longshan','notation':'accented pinyin; source tones; proposed loan mappings explicitly identified','sentences':clauses,'query_ledger':ledger,'artifacts':['translation.md','translation.json'],'review':{'content_coverage':'all title/credit/poetry lines included; two exact quantities; mast-install negation; pole absence; goal; positive manner','candidate_reconciliation':{'ship':'bù selected; cā rejected because classifier','blue':'w5558 selected with same-witness IPA; other local forms rejected to keep paired spelling','mast':'wěizǐ selected','steering_pole':'jiázū selected via 篙; generic pole not adopted','tree':'kǎmǒng is generic tree; species-specific 桂树 proposed loan retained','go':'hxí selected through go/走; directional suffixes not substituted for independent motion','small':'bíkuī selected because attested direct adjective','half':'lāzā selected as one-half noun; title productive, not an attested lexical title'},'native_review':False}}
notes='북부 용산 토가어의 생산적 번역이다. 은하수·계수나무·노랫말·작곡은 한자어의 새 차용형이며, 윤극영의 이름은 원문으로 표기했다. 쪽배는 작은 배로 옮겼다. 셋째 행은 두 부정문으로 풀어 썼다.'
md=['북부 용산 토가어\n']
for c in clauses: md.extend([c['source'],'\n'+c['translation']+'\n'])
md.extend(['주: '+notes,'\n检索模式：Skill-based'])
for fn,data in [('translation.json',json.dumps(record,ensure_ascii=False,indent=2)),('translation.md','\n'.join(md)+'\n')]:
 with (P/fn).open('x') as f:f.write(data)
# The first-round files are now saved; gloss is derived without modifying them.
gloss={'clauses':[],'notes':[notes,'새 차용형과 이름의 IPA는 null이다. 차용형의 오프라인 대응음은 개별 근거 파일에 보관했다.','IPA는 각 낱말의 출처 기재음이다. 조합한 문장의 연결 발음은 확인되지 않았다.','반달: 달+절반의 생산적 명사구. 제목의 관용적 명칭은 미확인이다.'],'abbreviations':{'LNK':'linker','FOC':'focus','NEG':'negation','ALL':'allative','ADVZ':'adverbializer'}}
for c in clauses:
 gloss['clauses'].append({'source':c['source'],'target_units':[{'translation':u['translation'],'tokens':[{'pinyin':t['surface'],'ipa':t['ipa'],'gloss':t['gloss'],'source':t['source']} for t in u['tokens']]} for u in c['target_units']]})
with (P/'gloss.json').open('x') as f:json.dump(gloss,f,ensure_ascii=False,indent=2)
(P/'management.json').write_text(json.dumps({'start':'2026-11-17 19:50:41 UTC','end':datetime.datetime.now(datetime.timezone.utc).isoformat(),'first_round_sha256':{f:hashlib.sha256((P/f).read_bytes()).hexdigest() for f in ['translation.md','translation.json']},'query_logs':['queries-01.json','queries-02.json','queries-03.json','queries-04.json'],'failed_initial_query':'limit_per_query=20 was rejected before retrieval; corrected to 10; full error retained','grammar_used':['references/clause-patterns.md','references/event-linking.md','references/predicate-economy.md'],'translation_examples_from_web_or_other_agents':False},ensure_ascii=False,indent=2))
print((P/'translation.md').read_text())
