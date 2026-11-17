from pathlib import Path
import json,html,re,shutil,hashlib,zipfile
ROOT=Path('/workspace/publish-dictionary')
OLD=Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17')
RUN=Path('/workspace/tibetan-rerun-result')
DEST=ROOT/'docs/translation-runs/2026-11-17'
SITE=ROOT/'site';OUT=SITE/'translation-runs';OUT.mkdir(exist_ok=True)
TITLES={'en-crow':('乌鸦喝水','The Crow and the Pitcher'),'zh-rabbit':('守株待兔','Waiting by a Tree Stump'),'ja-jizo':('笠地蔵','The Jizō Statues and the Straw Hats'),'bo-crane':('洁白的仙鹤','The White Crane'),'reverse-song':('四行土家语歌','A Four-Line Tujia Song')}
RECORDS='https://github.com/luggroo/bizic-dictionary/tree/main/docs/translation-runs/2026-11-17'
CSS='''*{box-sizing:border-box}body{margin:0;background:#f5f6f1;color:#203c34;font:16px/1.8 "DejaVu Sans","Noto Sans CJK SC","Noto Serif Tibetan",sans-serif}main{max-width:960px;margin:auto;padding:32px 24px}a{color:#16584c}header{border-bottom:1px solid #c9d5cd;padding-bottom:24px}h1{font-size:30px;line-height:1.4}h2{font-size:24px}h3{font-size:18px}.case{background:white;border:1px solid #d5ded7;border-radius:8px;margin:28px 0;padding:24px;scroll-margin-top:20px}.source{white-space:pre-wrap;background:#f3f5ef;padding:16px;overflow-wrap:anywhere}.line{white-space:pre-wrap;overflow-wrap:anywhere;margin:0 0 10px}.downloads{display:flex;flex-wrap:wrap;gap:16px}.note{border-left:3px solid #a48955;padding-left:14px;color:#5a5c45}nav ul{display:flex;gap:20px;flex-wrap:wrap;padding:0;list-style:none}.meta{font-size:14px;color:#586b61}@page{size:A4;margin:18mm} @media print{body{background:white;font-size:10pt}main{padding:0;max-width:none}.case{border:0;padding:0;break-before:page}nav{display:none}.source{font-size:9pt}h1,h2,h3{break-after:avoid}a{color:inherit;text-decoration:none}}'''
def md(s):
 out=[];fence=False;table=False
 for line in s.splitlines():
  if line.startswith('```'):fence=not fence;continue
  if line.startswith('|') and line.endswith('|'):
   if re.fullmatch(r'[| :\-]+',line):continue
   tag='td' if table else 'th'
   if not table:out.append('<table>');table=True
   out.append('<tr>'+''.join('<'+tag+'>'+html.escape(x.strip())+'</'+tag+'>' for x in line.strip('|').split('|'))+'</tr>');continue
  if table:out.append('</table>');table=False
  if not line.strip():continue
  m=re.match(r'^(#{1,6})\s+(.*)',line)
  if m:out.append('<h3>'+html.escape(m[2])+'</h3>')
  else:out.append('<p class="line">'+html.escape(line)+'</p>')
 if table:out.append('</table>')
 return '\n'.join(out)
def clean(s):
 return '\n'.join(l for l in s.splitlines() if not re.match(r'^(需要逐词|需要.*gloss|如有需要，可以另附|检索模式：|原文按北部土家语分析；检索模式)',l.strip()))
def doc(body,lang,title):
 other='translation-runs-en.html' if lang=='zh' else 'translation-runs.html'
 return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' · 毕兹学堂</title><style>'+CSS+'</style></head><body><main>'+body+'</main></body></html>'
def build():
 from weasyprint import HTML
 cases=json.loads((OLD/'cases.json').read_text());items=[]
 for c in cases:
  cid=c['id'];source=RUN if cid=='bo-crane' else OLD/'runs'/cid
  record=DEST/cid;record.mkdir(exist_ok=True)
  if cid=='bo-crane':
   files=list(source.glob('*'));answer=source/('translation-reviewed.md' if (source/'translation-reviewed.md').exists() else 'translation.md')
  else:
   files=list(source.glob('*'));answer=source/('round2.md' if cid=='reverse-song' else 'round1.md')
  for p in files:
   if p.is_file():shutil.copyfile(p,record/p.name)
  (record/'source.txt').write_text(c['source']+'\n')
  text=clean(answer.read_text()).strip();(record/'display.md').write_text(text+'\n')
  part='<article class="case" id="'+cid+'"><h2>'+TITLES[cid][0]+'</h2><h3>原文</h3><div class="source">'+html.escape(c['source'])+'</div><h3>译文</h3>'+md(text)+'</article>'
  htmlfile=OUT/(cid+'.html');htmlfile.write_text(doc(part,'zh',TITLES[cid][0]));pdf=OUT/(cid+'.pdf');HTML(filename=str(htmlfile)).write_pdf(str(pdf))
  items.append({'id':cid,'source':c['source'],'translation':text,'pdf':pdf.name,'pdf_sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'skill_revision':'f341ec4cef24c68ea9527d6ddbe4dd6b4e068262' if cid=='bo-crane' else 'local snapshot archived in first blind run'})
 (DEST/'publication-manifest.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
 notes={'zh':'这些译稿展示英语、文言汉语、日语、藏语与北部土家语之间的翻译。土家语歌另译成汉语、英语、日语和藏语。译稿含汉语插入及待核表达；歌谣第三句的 rixhuax 仍未解，不能视为完整译出。藏语例采用更新后技能的独立译稿。','en':'These drafts cover translation from English, Classical Chinese, Japanese and Tibetan into Northern Tujia, plus a Tujia song translated into four languages. Some expressions remain provisional or use Chinese insertions. The song’s rixhuax is unresolved, so its third line remains incomplete. The Tibetan example uses an independent draft made with the updated skill.'}
 for lang in ['zh','en']:
  en=lang=='en';title='Five independent translation drafts' if en else '五例独立译稿';back='translation-en.html' if en else 'translation.html';other='translation-runs.html' if en else 'translation-runs-en.html'
  body='<header><div class="downloads"><a href="'+back+'">'+('Translation examples' if en else '翻译例子')+'</a><a href="'+other+'">'+('中文' if en else 'English')+'</a></div><h1>'+title+'</h1><p>'+notes[lang]+'</p><div class="downloads"><a href="translation-runs/five-translations.pdf">'+('Download all five drafts (PDF)' if en else '下载五例合集 PDF')+'</a><a href="'+RECORDS+'">'+('Sources and lookup records' if en else '查看原文、来源与检索记录')+'</a><a href="https://raw.githubusercontent.com/luggroo/bizic-dictionary/main/docs/translation-runs/2026-11-17/records.zip">'+('Download complete records' if en else '下载完整记录')+'</a></div></header><nav><ul>'+''.join('<li><a href="#'+x['id']+'">'+TITLES[x['id']][en]+'</a></li>' for x in items)+'</ul></nav>'
  for x in items:
   cid=x['id'];body+='<article class="case" id="'+cid+'"><h2>'+TITLES[cid][en]+'</h2><p><a href="translation-runs/'+cid+'.pdf">'+('Download this draft (PDF)' if en else '下载本例译稿 PDF')+'</a></p><h3>'+('Source text' if en else '原文')+'</h3><div class="source">'+html.escape(x['source'])+'</div><h3>'+('Translation' if en else '译文')+'</h3>'+md(x['translation'])+'</article>'
  page=SITE/('translation-runs-en.html' if en else 'translation-runs.html');page.write_text(doc(body,lang,title).replace('<style>', '<link rel="canonical" href="https://tujia.biz/'+page.name+'"><link rel="alternate" hreflang="zh" href="https://tujia.biz/translation-runs.html"><link rel="alternate" hreflang="en" href="https://tujia.biz/translation-runs-en.html"><style>',1))
  if not en:HTML(filename=str(page)).write_pdf(str(OUT/'five-translations.pdf'))
 for name,en in [('translation.html',False),('translation-en.html',True)]:
  p=SITE/name;s=p.read_text();href='translation-runs-en.html' if en else 'translation-runs.html';label='Five independent drafts and PDFs' if en else '五例独立译稿与 PDF';link='<p class="independent-drafts-link"><a href="'+href+'">'+label+'</a></p>'
  s=re.sub(r'<p class="independent-drafts-link">.*?</p>','',s)
  s=s.replace('id="examples">','id="examples">'+link,1);p.write_text(s)
 # Full experiment archive includes the original first-round evidence and the published-skill rerun.
 archive=DEST/'records.zip'
 with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for base,prefix in [(OLD,'first-blind-run'),(RUN,'published-tibetan-rerun')]:
   for p in base.rglob('*'):
    if p.is_file() and '__pycache__' not in p.parts and 'song-normalize' not in p.parts:z.write(p,Path(prefix)/p.relative_to(base))
 print(json.dumps({'cases':len(items),'pdfs':6,'archive_bytes':archive.stat().st_size}))
if __name__=='__main__':build()
