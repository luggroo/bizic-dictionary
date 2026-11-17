import json,pathlib,datetime
p=pathlib.Path(__file__).parent
e=json.loads((p/'evidence.json').read_text())
clauses=[
('s1a','宋人有耕者','宋国 wótū sígētiē qiě nie lò lá hǔ xié','宋国有一个耕田的人',{'location':'宋国','agent':'lò','action':'sígētiē qiě','existential':'xié'}),
('s1b','田中有株','sígētiē wótū kǎtǐmī xié','田里有树桩',{'location':'sígētiē wótū','theme':'kǎtǐmī'}),
('s1c','兔走触株','mǎotáo xìcǎ mǒ kǎtǐmī pén liē','兔子跑着撞到树桩',{'agent':'mǎotáo','target':'kǎtǐmī','manner':'xìcǎ mǒ'}),
('s1d','折颈而死','gó nie kōngdī kǒ liē, gó sé liē','它的脖子断了，它死了',{'possessor':'rabbit','affected':'kōngdī','result':'sé'}),
('s2a','因释其耒','āimǒ, sígētiē qiě nie lò gó nie 耒 pō liē','因此，耕田的人放下了他的耒',{'agent':'farmer','object':'gó nie 耒'}),
('s2b','而守株','kǎtǐmī sétā tì bǒ','在树桩旁保持等候',{'agent':'farmer','location':'kǎtǐmī sétā'}),
('s2c','冀复得到兔','mǎotáo zái tǐ cá','想再次得到兔子',{'agent':'farmer','object':'mǎotáo','modality':'cá','repetition':'zái'}),
('s3a','兔不可复得','mǎotáo zái tǐ tā tī','兔子不能再得到了',{'agent':'farmer (implicit)','object':'mǎotáo','negation_scope':'ability to obtain rabbit again'}),
('s3b','而身为宋国笑','qiè, 宋国 niě lò gó 嘲笑 liē','然而，宋国的人嘲笑了他',{'agent':'宋国 niě lò','patient':'farmer; gó'})]
source=['宋人有耕者，田中有株，兔走触株，折颈而死。','因释其耒而守株，冀复得到兔。','兔不可复得，而身为宋国笑。']
target=[clauses[0][2]+', '+clauses[1][2]+'; '+clauses[2][2]+', '+clauses[3][2]+'.', clauses[4][2]+', '+clauses[5][2]+'; '+clauses[6][2]+'.', clauses[7][2]+'; '+clauses[8][2]+'.']
text='北部龙山土家语（调号拼音）：\n\n'+'\n\n'.join(f'{i+1}. 原文：{s}\n\n   译文：{t}' for i,(s,t) in enumerate(zip(source,target)))+'\n\n说明：“耒”保留古代农具名称；“嘲笑”采用汉语插入，置于土家语主宾动语序中。“冀”按“想再次得到”译出。以上为依据词典与语法构式形成的拟译。\n\n检索模式：Skill-based。\n'
(p/'round1.md').write_text(text)
lex={}
for q in e['queries']:
 for r in q['records']:
  if r['canonical_source'] in ['brassett-2006','brassett-2004']:
   if r['term'] not in lex or r['canonical_source']=='brassett-2006':lex[r['term']]=r
reference={
'nie':('LNK','clause-patterns.md; B06:95 ex24; Feng2025 ex27b'),
'niě':('GEN/association','clause-patterns.md; B06:56 §4.3.6'),
'mǒ':('MANNER','event-linking.md; B06:37 ex12'),
'liē':('PFV','event-linking.md; B06:69 ex86; aspect-modality.md table7.1'),
'bǒ':('STAT','event-linking.md; B06:90 ex110'),
'āimǒ':('therefore','event-linking.md; w174/B06 rn455293'),
'cá':('want to','aspect-modality.md; B06:129–130'),
'tā':('NEG.MOD','aspect-modality.md; B06:127–128'),
'tī':('ABILITY.NEG','aspect-modality.md; B06:127–128')}
sentences=[]
for cid,s,t,back,roles in clauses:
 tokens=[]
 for w in t.replace(',','').split():
  if w in lex:
   r=lex[w]; tokens.append({'surface':w,'ipa':r['notations'].get('ipa',[]),'gloss':r['zh'],'sense':r['en'],'entry_id':r['entry_id'],'attestation_id':r['attestation_id'],'source_id':r['canonical_source'],'locator':r['locator']})
  elif w in reference:
   gl,loc=reference[w];tokens.append({'surface':w,'gloss':gl,'source_id':'frozen grammar reference','locator':loc,'status':'productive construction'})
  else:tokens.append({'surface':w,'status':'proper name retained' if w=='宋国' else 'minimal Chinese insertion','gloss':w})
 sentences.append({'id':cid,'source':s,'translation':t,'backtranslation':back,'tokens':tokens,'roles':roles,'scope':roles.get('negation_scope',''),'constructions':['production from sourced lexical items and frozen grammar'],'open_issues':['嘲笑: no suitable native contextual transitive verb established; Chinese insertion'] if cid=='s3b' else (['耒: retained historical tool name; hoe/plough not adopted as exact equivalent'] if cid=='s2a' else []),'checked_version':1})
record={'version':1,'source_snapshot':{'revision':e['revision'],'manifest_sha256':e['manifest_sha256']},'dialect':'north/Longshan','notation':'site tone-marked spelling; untoned productive linker nie','sentences':sentences,'query_ledger':[{'query':q['query'],'status':q['status'],'engine':q['engine'],'witness_ids':[r['attestation_id'] for r in q['records']]} for q in e['queries']],'artifacts':['round1.md','translation.json','evidence.json','run-log.md'],'checks':{'coverage':'all nine clauses; no omitted event/participant/negation/repetition','source_alignment':'B06 first; B04 pén and zái; B04/06 hǔ','reference_independence':'Only source and frozen skill/lexicon read; no other translation or evaluations read','borrowing_reconciliation':'pūkī/līgācǐ (hoe) and kātiē (plough) not exact for 耒; niè laugh does not itself establish ridicule, so 嘲笑 retained','corpus_availability':'No corpus files bundled in frozen tree. Expected local data paths absent; no external/current data used.'}}
(p/'translation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2))
end=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')
e['end']=end;e['access_failures']=['Initial custom static reader expected bucket strings; observed dict descriptors, corrected to item.path before successful query execution. No lexical result from failed attempt.'];e['corpus_status']=record['checks']['corpus_availability']
(p/'evidence.json').write_text(json.dumps(e,ensure_ascii=False,indent=2))
(p/'run-log.md').write_text('# Independent blind run: zh-rabbit\n\nStart: '+e['start']+'\n\nEnd: '+end+'\n\nFrozen skill and static dictionary only. No existing translations, agents’ outputs, or evaluation results read. No PDF generated. Skill unchanged.\n\nActual lexical queries: '+str(len(e['queries']))+' keys, saved with complete results in evidence.json. Engine: FNV-1a static exact lookup; manifest '+e['manifest_sha256']+'.\n\nReferences read: SKILL.md; execution-state.md; retrieval.md; grammar-index.md; output.md; paraphrase-and-borrowing.md; clause-patterns.md; event-linking.md; aspect-modality.md; predicate-economy.md; reference-first-check.md; sense-and-coverage.md; evidence.md; nie-niexi.md.\n\nInitial static-reader schema error corrected before lexical retrieval. Source metadata/catalog read for provenance; only frozen materials used.\n')
print(text); print('END',end, 'queries',len(e['queries']))
