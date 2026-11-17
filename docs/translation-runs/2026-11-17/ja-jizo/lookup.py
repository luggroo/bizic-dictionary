import json,pathlib,unicodedata,sys
base=pathlib.Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17');p=base/'frozen/skills/translate-tujia/lexicon'; out=base/'runs/ja-jizo';m=json.loads((p/'manifest.json').read_text());cache={}
queries=sys.argv[1:];old=json.loads((out/'evidence.json').read_text()) if (out/'evidence.json').exists() else {'revision':m['revision'],'queries':[]}
for q in queries:
 k=unicodedata.normalize('NFKC',q).casefold().strip(); h=2166136261
 for b in k.encode(): h=((h^b)*16777619)&0xffffffff
 bucket=f'{h>>24:02x}'
 if bucket not in cache:cache[bucket]=[json.loads(l) for f in m['buckets'][bucket] for l in (p/f['path']).read_text().splitlines()]
 rows=[x['r'] for x in cache[bucket] if x['k']==k and (x['r'][7]=='北部' or m['sources'].get(x['r'][2],{}).get('canonical_id') in ['brassett-2004','brassett-2006'])]
 old['queries'].append({'query':q,'engine':'static-exact','status':'hit' if rows else 'zero','records':rows})
 seen=set(); vals=[]
 for r in rows:
  a=(r[3],r[4],r[5]);
  if a not in seen:vals.append(' | '.join([r[0],r[3],r[4],r[5]]));seen.add(a)
 print(q+': '+'; '.join(vals[:14]))
(out/'evidence.json').write_text(json.dumps(old,ensure_ascii=False,indent=2))
