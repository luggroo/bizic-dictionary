import json,pathlib,datetime
base=pathlib.Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17/frozen/skills/translate-tujia/lexicon');out=pathlib.Path(__file__).parent;m=json.load(open(base/'manifest.json'))
queries=['嘴','mouth','试','try','够','reach','倾','slant'];results={q:[] for q in queries};seen={q:set() for q in queries}
for p in sorted(base.glob('*.jsonl')):
 for l in open(p):
  row=json.loads(l);r=dict(zip(m['record_fields'],row['r']));s=m['sources'].get(r['source'],{})
  if r['dialect']!='北部':continue
  for q in queries:
   field=r['zh'] if any('\u4e00'<=c<='\u9fff' for c in q) else r['en'].lower()
   if q not in field or r['attestation_id'] in seen[q]:continue
   seen[q].add(r['attestation_id']);r['source_metadata']=s;results[q].append(r)
with open(out/'queries.jsonl','a') as f:
 for q,recs in results.items():
  f.write(json.dumps({'query':q,'engine':'static-substring-gloss','revision':m['revision'],'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'hit' if recs else 'zero','records':recs},ensure_ascii=False)+'\n')
  print(q);done=set()
  for r in recs:
   v=(r['term'],r['zh'],r['en'])
   if v not in done:print(r['entry_id'],r['attestation_id'],*v,r['pos'],s.get('canonical_id'));done.add(v)
