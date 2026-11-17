import json,sys,unicodedata,pathlib,datetime
base=pathlib.Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17/frozen/skills/translate-tujia/lexicon'); out=pathlib.Path(__file__).parent
m=json.load(open(base/'manifest.json'));cache={};results=[]
for q in sys.argv[1:]:
 k=unicodedata.normalize('NFKC',q).casefold().strip(); h=2166136261
 for b in k.encode():h=((h^b)*16777619)&0xffffffff
 rec=[]
 for f in m['buckets'][f'{h>>24:02x}']:
  p=f['path']
  if p not in cache:cache[p]=[json.loads(l) for l in open(base/p)]
  for row in cache[p]:
   if row['k']==k:
    for r in [row['r']]:
     d=dict(zip(m['record_fields'],r));s=m['sources'].get(d['source'],{}); d['source_metadata']=s
     if d['dialect'] in ('north','北部') or s.get('dialect')=='北部' or s.get('canonical_id') in ('brassett-2004','brassett-2006'):rec.append(d)
 result={'query':q,'engine':'static-exact','revision':m['revision'],'time':datetime.datetime.now(datetime.timezone.utc).isoformat(),'status':'hit' if rec else 'zero','records':rec};results.append(result)
 print(q, json.dumps(rec,ensure_ascii=False))
with open(out/'queries.jsonl','a') as f:
 for r in results:f.write(json.dumps(r,ensure_ascii=False)+'\n')
