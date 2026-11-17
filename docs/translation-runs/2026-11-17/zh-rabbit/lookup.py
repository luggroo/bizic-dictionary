import json,pathlib,unicodedata,sys,hashlib,datetime
root=pathlib.Path(__file__).parent
p=root.parent.parent/'frozen/skills/translate-tujia/lexicon'
m=json.loads((p/'manifest.json').read_text()); cache={}; ledger=[]
f=root/'evidence.json'
if f.exists(): ledger=json.loads(f.read_text())['queries']
for q in sys.argv[1:]:
 k=unicodedata.normalize('NFKC',q).casefold().strip(); h=2166136261
 for b in k.encode():h=((h^b)*16777619)&0xffffffff
 records=[]
 for item in m['buckets'][f'{h>>24:02x}']:
  fn=item['path']
  if fn not in cache:cache[fn]=[json.loads(l) for l in (p/fn).read_text().splitlines()]
  for row in cache[fn]:
   if row['k']==k:
    r=dict(zip(m['record_fields'],row['r'])); source=m['sources'].get(r['source'],{}); canonical=source.get('canonical_id');r['canonical_source']=canonical
    if r['dialect']=='南部' or source.get('dialect')=='南部':continue
    records.append(r)
 ledger.append({'query':q,'engine':'static-exact','status':'hit' if records else 'zero','records':records})
 print(q, json.dumps([{'id':r['attestation_id'],'entry':r['entry_id'],'form':r['term'],'zh':r['zh'],'en':r['en'],'src':r['canonical_source']} for r in records],ensure_ascii=False))
f.write_text(json.dumps({'start':'2026-11-17 15:12:43 UTC','revision':m['revision'],'manifest_sha256':hashlib.sha256((p/'manifest.json').read_bytes()).hexdigest(),'queries':ledger},ensure_ascii=False,indent=2))
