import json,unicodedata,pathlib,sys,datetime
root=pathlib.Path('/workspace/tibetan-rerun/skills/translate-tujia/lexicon'); m=json.loads((root/'manifest.json').read_text()); cache={}
ledgerp=pathlib.Path('/workspace/tibetan-rerun-result/queries.json'); ledger=json.loads(ledgerp.read_text()) if ledgerp.exists() else []
for query in sys.argv[1:]:
 k=unicodedata.normalize('NFKC',query).casefold().strip(); h=2166136261
 for x in k.encode():h=((h^x)*16777619)&0xffffffff
 b=f'{h>>24:02x}'; rs=[]
 for shard in m['buckets'].get(b,[]):
  path=shard['path']
  if path not in cache:cache[path]=[json.loads(l) for l in (root/path).read_text().splitlines()]
  for row in cache[path]:
   if row['k']==k:
    for raw in [row['r']]:
     r=dict(zip(m['record_fields'],raw));r['source_metadata']=m['sources'].get(r['source'],{});rs.append(r)
 rec={'query':query,'engine':'static exact','revision':m['revision'],'utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'bucket':b,'status':'hit' if rs else 'zero','records':rs};ledger.append(rec)
 print(json.dumps(rec,ensure_ascii=False))
ledgerp.write_text(json.dumps(ledger,ensure_ascii=False,indent=2))
