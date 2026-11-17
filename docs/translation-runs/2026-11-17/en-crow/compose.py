import json,pathlib,hashlib,datetime
out=pathlib.Path(__file__).parent
root=pathlib.Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17/frozen/skills/translate-tujia')
queries=[json.loads(l) for l in open(out/'queries.jsonl')]
records={r['attestation_id']:r for q in queries for r in q['records']}
chosen={'gǎ':'stedt-rn-453559','zégǎ':'stedt-rn-454800','guán':'stedt-rn-456261','nì':'stedt-rn-430963','cě':'stedt-rn-453517','lá':'stedt-rn-455255','záqī':'stedt-rn-453769','dī':'w575','dùzǐ':'stedt-rn-454872','ǎbǎ':'stedt-rn-453497','bíkuī':'stedt-rn-454852','bú':'stedt-rn-455728','duán':'stedt-rn-453784','būbǔ':'stedt-rn-453779','óng':'stedt-rn-454366','qiè':'stedt-rn-455276','zuíhóu':'stedt-rn-458435','hǔ':'stedt-rn-413634','lǒng':'stedt-rn-456932'}
gram={
 'liē':('liɛ⁵⁵','PFV','aspect-modality.md; event-linking.md, B06:69 ex86'),
 'wótū':('wɔ²⁴tʰu⁵⁵','inside','direction-suffixes.md, rn455022'),
 'xié':('ɕie²⁴','exist','clause-patterns.md B06:84 ex62'),
 'gó':('kuɔ²⁴','3SG','clause-patterns.md B06:83 ex59'),
 'niě':('ɲie²¹','GEN','clause-patterns.md B06:56 §4.3.6'),
 'hǒliě':('xuɔ²¹lie²¹','INSTR','clause-patterns.md B06:154 ex37'),
 'xǐtái':('','very','rn455076; clause-patterns.md comparison; proposed excess inferred through consequence'),
 'tā':('tʰa⁵⁵','NEG','aspect-modality.md B06:127–128'),
 'tī':('tʰi⁵⁵','can.NEG','aspect-modality.md B06:127–128'),
 'hī':('xɨ⁵⁵','NEG.physical','aspect-modality.md B06:127–129'),
 'cē':('tsʰɤ⁵⁵','physical.ability','aspect-modality.md B06:127–129'),
 'āiliē':('ai⁵⁵lie⁵⁵','then','event-linking.md B06:69 ex86'),
 'mǒ':('mɔ²¹','MANNER','event-linking.md B06:37 ex12'),
 'bō':('pɔ⁵⁵','GOAL','clause-patterns.md B06:100 ex64'),
 'dē':('tɤ⁵⁵','can','aspect-modality.md B06:127–128'),
 'xǐ':('ɕi²¹','can','aspect-modality.md B06:127–128'),
 '试着':('','try (Chinese insertion)','paraphrase-and-borrowing.md; not an attested Tujia form')
}
# numeral lá has a distinct witness from the little-quantity lá.
num=next(r for q in queries if q['query']=='一' for r in q['records'] if r['term']=='lá')
source=[
'A thirsty crow found a pitcher with a little water in it.',
'The water was too low for its beak to reach.',
'It tried to tip the pitcher, but it was too heavy.',
'Then the crow dropped small stones into it, one by one.',
'The water rose, and at last the crow could drink.']
target=[
'Gǎ lá lǒng zégǎ, guán lá lǒng nì liē; guán wótū cě lá xié.',
'Cě dī xǐtái, gó niě záqī hǒliě cě būbǔ tā tī.',
'Gó guán 试着 duán, qiè guán dùzǐ xǐtái; gó guán duán hī cē.',
'Āiliē gǎ ǎbǎ bíkuī lá bú lá bú mǒ guán wótū bō lá liē.',
'Cě óng liē, zuíhóu gǎ cě hǔ dē xǐ.']
notes='说明：“水罐”用 guán（罐），“喙”用 záqī（嘴）表达；“试着”保留最小汉语插入。第二句改述为“水很低，它用嘴碰不到水”；第三句明说因太重而翻不动。以上为依据词典和能产句式的拟译。'
text='北部龙山土家语（调号拼音）\n\n'
for i,(s,t) in enumerate(zip(source,target),1):text+=f'{i}. {s}\n\n   {t}\n\n'
text+=notes+'\n\n检索模式：Skill-based。\n\n需要逐词 gloss 或对齐 PDF 吗？\n'
(out/'round1.md').write_text(text)
sentences=[]
roles=[{'actor':'crow','theme':'pitcher','background':'little water inside pitcher'},{'theme':'water','instrument':'crow beak','patient':'water','negated_event':'touch/reach'},{'actor':'crow','theme':'pitcher','relation':'attempt; contrast; weight prevents tipping'},{'actor':'crow','theme':'small stones','goal':'inside pitcher','manner':'one by one'},{'theme':'water','result':'rise','actor':'crow','modality':'circumstantial ability to drink'}]
for i,(s,t) in enumerate(zip(source,target)):
 tokens=[]
 for j,tok in enumerate(t.translate(str.maketrans('', '', ',;.')).split()):
  k=tok.casefold();d={'surface':tok,'ipa':'','gloss':'','sense':'','entry_id':'','attestation_id':'','source_id':'','locator':''}
  r=records.get(chosen.get(k,''))
  if k=='lá' and (i==3 and j in (4,6) or i==0 and j in (1,5)):r=num
  if k=='lá' and i==3 and j==12:r=records['stedt-rn-453801']
  if k=='xǐtái':r=records['stedt-rn-455076']
  if r:
   d.update(ipa=' / '.join(r['notations'].get('ipa',[])),gloss=r['en'],sense=r['zh'],entry_id=r['entry_id'],attestation_id=r['attestation_id'],source_id=r['source_metadata'].get('canonical_id',r['source']),locator=r['locator'])
  elif k in gram:d.update(ipa=gram[k][0],gloss=gram[k][1],sense=gram[k][1],source_id='frozen-skill-reference',locator=gram[k][2])
  else:d['sense']='unresolved token lookup'
  tokens.append(d)
 sentences.append({'id':f's{i+1}','source':s,'translation':t,'tokens':tokens,'roles':roles[i],'scope':{'tense':'past narrative','negation':i in (1,2)},'constructions':['SOV; frozen clause-patterns.md','productive sentence; attested lexical replacements'],'open_issues':(['nì attested Northern TBL; locality not recorded; differs from Brassett nī look for'] if i==0 else ['generic mouth for beak; touching paraphrase; xǐtái very rather than separate excess marker'] if i==1 else ['Chinese adverb insertion 试着; provisional placement before native verb; explicit inability expands implication'] if i==2 else []),'checked_version':1})
manifest=root/'lexicon/manifest.json'
report={'version':1,'source_snapshot':{'revision':queries[0]['revision'],'manifest_sha256':hashlib.sha256(manifest.read_bytes()).hexdigest()},'dialect':'north / Longshan default; Brassett main with named Northern supplement','start_time_utc':'2026-11-17 15:12:34 UTC','end_time_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sentences':sentences,'query_ledger':[{'query':q['query'],'engine':q['engine'],'status':q['status'],'witness_ids':[r['attestation_id'] for r in q['records']]} for q in queries],'artifacts':['round1.md','translation.json','queries.jsonl','evidence.md'],'notes':notes,'deviations':['Attempt concept used 13 query keys including exact and substring queries, exceeding the per-concept maximum of 12 by one; no embedding used.','Initial lookup implementation failed before results were saved because it treated a single r as a list of records; corrected and executed the batch. Failed invocation did not produce a scoped inventory conclusion.']}
(out/'translation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
evidence='''# Blind run evidence — en-crow

Only the assigned original and the frozen translate-tujia skill, reference files and static shards were read. No prior translations, other agents’ output, or evaluation results were consulted. No PDF was generated; the frozen skill was not modified.

Start: 2026-11-17 15:12:34 UTC.
End: '''+report['end_time_utc']+'''.

Snapshot and every actual successful query response are in translation.json and queries.jsonl. Static exact lookups normalized NFKC/casefold/trim, used manifest FNV buckets, then filtered Northern records and source metadata. A later single scan queried eight explicit gloss substrings, saved complete witnesses, and deduplicated attestations. substring.py's console source label was accidentally taken from the last catalog value; the JSON records carry the correct per-record source_metadata and are authoritative.

## Selection and construction decisions

- Crow gǎ, thirst zégǎ, water cě, jar guán, stones ǎbǎ, turn over duán, swell/rise óng, finally zuíhóu: selected exact attested Northern forms. guán is a jar term; no assertion of a spout or handle is added.
- Found nì: Northern TBL rn430963 explicitly find / look for. Perfective liē supplies a completed narrative event. Brassett nī was retrieved but is glossed look for; yǐ see was rejected in favor of the exact find witness. TBL locality is not explicit in the export.
- Generic mouth záqī: B06 rn453769 (found by scoped substring), not the classifier zé. Instrument phrase uses B06:154 ex37; ordinary inability uses B06:127–128 V tā tī. Sentence 2 paraphrases failure to reach as inability to touch water with the mouth. Heavy dùzǐ with physical inability V hī cē follows B06:127–129.
- A little: cě lá xié uses lá (quantity a little, B06 rn455255) before existential. Numeral lá (one) is distinct: the sentence 4 quantity phrase follows the fully attested B06:37 ex12 lá bú lá bú mǒ; bú is explicitly used for stones (B04 rn455728). The first sentence's one crow and one jar use animal/jar classifier lǒng.
- Small stones: noun + attested long adjective bíkuī. Clause-patterns.md B06:101 ex66/69 supplies this direct modifier order. No adjective-nie structure is invented for a form already licensed directly.
- Goal: guán wótū bō, using the entire inside-pitcher place phrase before goal bō and main throwing verb lá. Original one-by-one is retained.
- Tried: exact and bounded expanded checks found no suitable attempt word. 试着 is a proposed minimal Chinese adverb insertion, placed immediately before duán. This is provisional contact-language composition under paraphrase-and-borrowing.md, not an attested whole clause. The attempt concept inadvertently reached 13 query keys (limit 12); recorded rather than omitted.
- Water rose: óng rn454366 explicitly rise/swell, avoiding the weaker preliminary ascend gǔ. Final dē xǐ expresses circumstantial ability, not permission or a newly acquired skill.

Meaning check: all five source sentences retained in order; crow and jar references consistent; little water vs low level distinguished; third sentence attempt, contrast and physical weight preserved; interior destination and iterative quantity preserved; rise precedes final ability. No IPA was invented for missing fields. Display term forms follow frozen format-2 shards; function forms follow bundled source-paired examples.

## Queries and execution

The exact commands are preserved as lookup.py, substring.py and compose.py. lookup.py was invoked with five batches; queries.jsonl records actual normalized conceptual keys, time, status, engine, source revision, full records and witness IDs. It includes zeroes and rejected candidates. No embedding setup or external retrieval was used.
'''
(out/'evidence.md').write_text(evidence)
print(text);print('saved',out)
