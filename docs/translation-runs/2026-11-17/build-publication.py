"""Publish the archived drafts as source-aligned gloss HTML and PDFs."""
from pathlib import Path
import argparse,hashlib,html,json,re,subprocess,sys,zipfile,unicodedata
from PIL import ImageFont
from gloss_ui import localize,attributes,localize_recorded_tables
ROOT=Path(__file__).resolve().parents[3]
RECORDS=Path(__file__).resolve().parent
SITE=ROOT/'site';OUT=SITE/'translation-runs'
IDS=['en-crow','zh-rabbit','ja-jizo','bo-crane','reverse-song','ko-bandal']
COMBINED_STEM='all-translations'
TITLES={'en-crow':('乌鸦喝水','The Crow and the Pitcher'),'zh-rabbit':('守株待兔','Waiting by a Tree Stump'),'ja-jizo':('笠地蔵','The Jizō Statues and the Straw Hats'),'bo-crane':('洁白的仙鹤','The White Crane'),'reverse-song':('四行土家语歌','A Four-Line Tujia Song'),'ko-bandal':('半月（반달）','Half Moon (반달)')}
RECORD_URL='https://github.com/luggroo/bizic-dictionary/tree/main/docs/translation-runs/2026-11-17'
LABELS=json.loads((RECORDS/'gloss-label-inventory.json').read_text())
FONTDIR=Path('/usr/share/fonts')
FONTS={
 'latin':ImageFont.truetype(str(FONTDIR/'truetype/noto/NotoSerif-Regular.ttf'),44),
 'cjk':ImageFont.truetype(str(FONTDIR/'opentype/noto/NotoSerifCJK-Regular.ttc'),44),
 'tibetan':ImageFont.truetype(str(FONTDIR/'truetype/noto/NotoSerifTibetan-Regular.ttf'),48),
}
CSS='''*{box-sizing:border-box}body{margin:0;background:#f5f6f1;color:#203c34;font:16px/1.7 "Noto Serif","Noto Serif CJK SC","Noto Serif Tibetan",serif}main{max-width:960px;margin:auto;padding:32px 24px}a{color:#16584c}header{border-bottom:1px solid #c9d5cd;padding-bottom:24px}h1{font-size:28px;line-height:1.4}h2{font-size:23px}h3{font-size:18px}article{background:white;border:1px solid #d5ded7;border-radius:8px;margin:28px 0;padding:24px;scroll-margin-top:20px}.downloads{display:flex;flex-wrap:wrap;gap:16px}nav ul{display:flex;gap:20px;flex-wrap:wrap;padding:0;list-style:none}.source{white-space:pre-wrap;margin:1.1em 0 .7em;break-after:avoid}.source[lang=bo]{font-size:1.1em;line-height:1.8}.unit-label{font-size:.8em;margin:.8em 0 .1em}.gloss-unit{margin:0 0 1em}.gloss-chunk{break-inside:avoid;overflow-x:auto;margin:0 0 .5em}.interlinear{border-collapse:collapse;table-layout:fixed;width:max-content;max-width:none;margin:0;font-size:11pt;line-height:1.75}.interlinear td{border:0;padding:0 8pt 0 0;text-align:left;vertical-align:top;white-space:nowrap}[data-ui-gloss-language] .interlinear{table-layout:auto}.pinyin{font-style:italic}.ipa,.gloss{font-style:normal}.gloss [lang=bo]{font-size:12pt}:lang(ko){font-family:"Noto Serif CJK KR","Noto Serif",serif}.notes{font-size:.9em;margin-top:1.5em}.abbreviations{font-size:.9em}.translation{margin:.25em 0;line-height:1.7}.screen-only{display:block}.print-only{display:none}@page{size:A4;margin:18mm 17mm 19mm;@bottom-center{content:counter(page);font:9pt "Noto Serif",serif}}@media print{body{background:white;color:black;font-size:11pt;line-height:1.65}main{padding:0;max-width:none}header{border:0;padding:0;margin-bottom:1em}h1{font-size:17pt}h2{font-size:14pt}h3{font-size:11pt}.case{background:none;border:0;border-radius:0;padding:0;margin:0;break-before:page}.case:first-child,.paper-heading + .case{break-before:auto}.paper-heading{margin-bottom:1em}.gloss-chunk{overflow:visible}.interlinear{font-size:11pt}.source{background:none;padding:0}.screen-only,nav,.downloads{display:none}.print-only{display:block}a{color:black;text-decoration:none}h1,h2,h3{break-after:avoid}.notes{font-size:9pt}.unit-label{font-size:9pt}.abbreviations{font-size:9pt;line-height:1.5;break-inside:avoid}}'''
def esc(x):return html.escape(str(x))
def width(text):
 text=str(text)
 if any('\u0f00'<=c<='\u0fff' for c in text):f=FONTS['tibetan']
 elif any(unicodedata.east_asian_width(c) in ('W','F') for c in text):f=FONTS['cjk']
 else:f=FONTS['latin']
 return f.getlength(text)/4*1.13

def chunks(tokens,limit=488):
 groups=[];current=[];size=0
 for token in tokens:
  w=max(width(token.get('pinyin','')),width(token.get('ipa') or ''),width(token.get('gloss','')),12)+11
  if w>limit:raise ValueError('A single token exceeds printable width: '+token['pinyin'])
  if current and size+w>limit:groups.append(current);current=[];size=0
  current.append((token,w));size+=w
 if current:groups.append(current)
 return groups

def table(tokens,label=None,ui_language=None):
 if ui_language:tokens=[{**t,"_gloss_original":t["gloss"],"gloss":localize(t["gloss"],ui_language)} for t in tokens]
 out=[]
 for chunk_index,group in enumerate(chunks(tokens)):
  total=sum(w for _,w in group)
  cols=''.join('<col style="width:%.2fpt">'%w for _,w in group)
  rows=[]
  for field,cls in [('pinyin','pinyin'),('ipa','ipa'),('gloss','gloss')]:
   cells=[]
   for t,w in group:
    value=t.get(field) or ''
    lang=' lang="bo"' if any('\u0f00'<=c<='\u0fff' for c in value) else (' lang="ko"' if any('\uac00'<=c<='\ud7af' for c in value) else '')
    extra=attributes(t['_gloss_original']) if ui_language and field=='gloss' else ''
    if extra:lang=' lang="'+ui_language+'"'
    cells.append('<td'+lang+extra+'>'+esc(value)+'</td>')
   rows.append('<tr class="'+cls+'">'+''.join(cells)+'</tr>')
  out.append('<div class="gloss-chunk">'+('<p class="unit-label">'+esc(label)+'</p>' if label and chunk_index==0 else '')+'<table class="interlinear" style="width:%.2fpt">'%total+'<colgroup>'+cols+'</colgroup><tbody>'+''.join(rows)+'</tbody></table></div>')
 return ''.join(out)

def validate(data,cid):
 for c in data['clauses']:
  assert c['source'].strip(),cid
  assert c['target_units'],cid
  for u in c['target_units']:
   assert u['tokens'],cid
   for t in u['tokens']:
    assert t.get('pinyin') and t.get('gloss'),(cid,t)
    assert 'ipa' in t and (t['ipa'] is None or isinstance(t['ipa'],str)),(cid,t)
    assert not re.search(r'\s',t['pinyin']),('unsegmented words in one column',cid,t['pinyin'])

def reader_notes(cid,data):
 if cid=='en-crow':return [
  'guán 表罐，záqī 表嘴；喙沿用嘴的概括表达。第二句为不能用嘴碰到水，第三句明说罐太重而翻不动。',
  '“试着”为汉语插入，IPA位置留空。IPA保留所选来源基记，连读变调未核。',
  '数词lá的所选见证为/la³⁵/，少量义lá与投掷义lá为各自见证/la²⁴/，来源调值分别保留。']
 if cid=='ja-jizo':return [
  '漢語挿入の発音欄は空欄。無声調のnieは対応音形の根拠が不足する箇所を「読音未確認」とした。',
  'IPAは所選語彙または文法例の基底表記。文中の連続変調は未確認。',
  'táiは文脈により「貧しい」と「無い」、dáは数量句で「個」、否定位置でNEGとした。',
  '「地藏菩萨像」「除夕」「排成一排」「第六尊」「剩下」「渐渐」等は漢語挿入。使役・受益の組み合わせと一部の搭配は試訳。']
 notes=data.get('notes',[])
 if cid=='reverse-song':return ['原文保留叶式记音；对照IPA为所选词典见证的基记，不是歌谣原始演唱的实测音值。候选音形与原记音的差异分别保留。']+[n for n in notes if not n.startswith(('四语自由译文','本轮仅'))]
 return notes

def body_case(cid,data,en=False,start=1,ui_language=None):
 if cid=="reverse-song":ui_language=None
 out=['<article class="case" id="'+cid+'"><h2>'+TITLES[cid][en]+'</h2>']
 out.append('<p class="screen-only"><a href="translation-runs/'+cid+'.pdf">'+('Download interlinear gloss PDF' if en else '下载逐词对照 PDF')+'</a></p>')
 for i,c in enumerate(data['clauses'],start):
  lang=' lang="bo"' if cid=='bo-crane' else (' lang="ko"' if cid=='ko-bandal' else '')
  out.append('<section class="sentence"><p class="source"'+lang+'><span class="number">('+str(i)+')</span> '+esc(c['source'])+'</p>')
  for j,u in enumerate(c['target_units']):
   label=str(i)+chr(97+j) if len(c['target_units'])>1 else None
   out.append('<div class="gloss-unit">'+table(u['tokens'],label,ui_language)+'</div>')
  for language,text in c.get('translations',{}).items():
   label={'zh':'汉语','en':'English','ja':'日本語','bo':'藏语'}.get(language,language)
   out.append('<p class="translation" lang="'+language+'">'+label+'：'+esc(text)+'</p>')
  out.append('</section>')
 notes=reader_notes(cid,data)
 if notes:out.append('<div class="notes"><h3>'+('Notes' if en else '说明')+'</h3>'+''.join('<p>'+esc(n)+'</p>' for n in notes)+'</div>')
 if data.get('abbreviations'):out.append('<p class="abbreviations">'+('Abbreviations: ' if en else '缩写：')+'；'.join(esc(k)+' = '+esc('.'.join(LABELS[part] for part in k.split('.'))) for k in data['abbreviations'])+'</p>')
 out.append('</article>');return ''.join(out)

def document(body,lang,title,canonical=None,ui_language=None):
 meta=''
 if canonical:meta='<link rel="canonical" href="https://tujia.biz/'+canonical+'"><link rel="alternate" hreflang="zh" href="https://tujia.biz/translation-runs.html"><link rel="alternate" hreflang="en" href="https://tujia.biz/translation-runs-en.html">'
 ui_script='<script defer src="/translation-runs-language.js"></script>' if ui_language else ''
 ui_attr=' data-ui-gloss-language="'+ui_language+'"' if ui_language else ''
 return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' · 毕兹学堂</title>'+meta+'<style>'+CSS+'</style>'+ui_script+'</head><body'+ui_attr+'><main>'+body+'</main></body></html>'

def build(only=None,html_only=False):
 if not html_only:from weasyprint import HTML
 ids=[only] if only else IDS
 OUT.mkdir(exist_ok=True);data={};manifest=[]
 for cid in ids:
  d=json.loads((RECORDS/cid/'gloss.json').read_text());validate(d,cid);data[cid]=d
  page=OUT/(cid+'.html')
  if not (html_only and cid=='reverse-song'):page.write_text(document(body_case(cid,d,ui_language='zh'),'zh',TITLES[cid][0]+' · Gloss',ui_language='zh'))
  pdf=page.with_suffix('.pdf')
  if not html_only:HTML(string=document(body_case(cid,d),'zh',TITLES[cid][0]+' · Gloss'),base_url=str(ROOT)).write_pdf(str(pdf))
  manifest.append({'id':cid,'gloss_sha256':hashlib.sha256((RECORDS/cid/'gloss.json').read_bytes()).hexdigest(),'pdf':pdf.name,'pdf_sha256':hashlib.sha256(pdf.read_bytes()).hexdigest(),'clauses':len(d['clauses']),'target_units':sum(len(c['target_units']) for c in d['clauses']),'format':'source + aligned pinyin / IPA / gloss'})
 if only:return manifest
 for en in [False,True]:
  lang='en' if en else 'zh';name='translation-runs-en.html' if en else 'translation-runs.html';title='Six translations with interlinear gloss' if en else '六例译文与逐词对照'
  note='Sources and Tujia forms are aligned word by word with IPA and gloss. Some expressions remain provisional or use Chinese insertions; the song’s rixhuax is unresolved.' if en else '各例按原文逐句列出土家语拼音、IPA 和逐词释义。汉语插入的读音位置留空；词义及读音疑点在局部标明。歌谣的 rixhuax 仍未解。'
  header='<header><div class="downloads"><a href="'+('translation-en.html' if en else 'translation.html')+'">'+('Translation examples' if en else '翻译例子')+'</a><a href="'+('translation-runs.html' if en else 'translation-runs-en.html')+'" data-gloss-ui-link="'+('zh' if en else 'en')+'">'+('中文' if en else 'English')+'</a></div><h1>'+title+'</h1><p>'+note+'</p><div class="downloads"><a href="translation-runs/all-translations.pdf">'+('Download combined gloss PDF' if en else '下载六例 gloss 合集 PDF')+'</a><a href="'+RECORD_URL+'">'+('Sources and lookup records' if en else '查看来源与检索记录')+'</a><a href="https://raw.githubusercontent.com/luggroo/bizic-dictionary/main/docs/translation-runs/2026-11-17/records.zip">'+('Download complete records' if en else '下载完整记录')+'</a></div></header>'
  nav='<nav><ul>'+''.join('<li><a href="#'+cid+'">'+TITLES[cid][en]+'</a></li>' for cid in ids)+'</ul></nav>'
  parts=[];number=1
  for cid in ids:parts.append(body_case(cid,data[cid],en,number,ui_language=lang));number+=len(data[cid]['clauses'])
  path=SITE/name;path.write_text(document(header+nav+''.join(parts),lang,title,name,ui_language=lang))
  if not en and not html_only:
   paper_parts=[];paper_number=1
   for cid in ids:paper_parts.append(body_case(cid,data[cid],False,paper_number));paper_number+=len(data[cid]['clauses'])
   paper='<div class="paper-heading"><h1>六例逐词对照</h1></div>'+''.join(paper_parts)
   paperpath=OUT/(COMBINED_STEM+'.html');paperpath.write_text(document(paper,'zh','六例逐词对照'))
   HTML(filename=str(paperpath)).write_pdf(str(OUT/(COMBINED_STEM+'.pdf')))
 for name,en in [('translation.html',False),('translation-en.html',True)]:
  p=SITE/name;s=p.read_text();s=re.sub(r'<p class="independent-drafts-link">.*?</p>','',s)
  link='<p class="independent-drafts-link"><a href="'+('translation-runs-en.html' if en else 'translation-runs.html')+'">'+('Six independent drafts with interlinear gloss PDFs' if en else '六例独立译稿与逐词对照 PDF')+'</a></p>'
  s=s.replace('id="examples">','id="examples">'+link,1)
  s=re.sub(r'<a class="card korean-example".*?</a>','',s)
  korean='<a class="card korean-example" href="'+('translation-runs-en.html' if en else 'translation-runs.html')+'#ko-bandal"><small data-zh="韩语 → 北部土家语" data-en="Korean → Northern Tujia">'+('Korean → Northern Tujia' if en else '韩语 → 北部土家语')+'</small><strong data-zh="半月（반달） →" data-en="Half Moon (반달) →">'+('Half Moon (반달) →' if en else '半月（반달） →')+'</strong></a>'
  s=re.sub(r'(<div class="cards">)(.*?)(</div>)',lambda m:m[1]+m[2]+korean+m[3],s,count=1,flags=re.S)
  begin=s.index('id="examples"');end=s.index('<div class="cards">',begin)
  intro_en='Examples translate English, Classical Chinese, Japanese, Tibetan and Korean into Northern Tujia, and Tujia into other languages. Each includes the source text and an interlinear gloss PDF.'
  intro_zh='例子包括英语、文言汉语、日语、藏语和韩语译入北部土家语，以及土家语译入其他语言；各例提供原文和逐词对照 PDF。'
  intro='<p class="">'+('<span data-en="'+intro_en+'" data-zh="'+intro_zh+'">'+(intro_en if en else intro_zh)+'</span>')+'</p>'
  section=re.sub(r'<p class="">.*?</p>',lambda _:intro,s[begin:end],count=1,flags=re.S)
  s=s[:begin]+section+s[end:]
  p.write_text(localize_recorded_tables(s,'en' if en else 'zh'))
 if html_only:return manifest
 (RECORDS/'gloss-publication-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 (RECORDS/'publication-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 archive=RECORDS/'records.zip';old=Path('/workspace/bizic-translator/docs/evaluation/blind-five-2026-11-17');rerun=Path('/workspace/tibetan-rerun-result')
 with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for base,prefix in [(old,'first-blind-run'),(rerun,'published-tibetan-rerun'),(Path('/workspace/korean-bandall-result'),'korean-bandal-run')]:
   for p in base.rglob('*'):
    if p.is_file() and '__pycache__' not in p.parts and 'song-normalize' not in p.parts:z.write(p,Path(prefix)/p.relative_to(base))
  for cid in ids:
   for name in ['gloss.json','gloss-audit.md']:z.write(RECORDS/cid/name,Path('aligned-gloss')/cid/name)
  for name in ['build-publication.py','gloss_ui.py','gloss-ui-locales.json','gloss-publication-manifest.json','gloss-label-inventory.json']:z.write(RECORDS/name,Path('aligned-gloss')/name)
  for cid in ids:z.write(OUT/(cid+'.pdf'),Path('aligned-gloss/pdf')/(cid+'.pdf'))
  z.write(OUT/(COMBINED_STEM+'.pdf'),'aligned-gloss/pdf/all-translations.pdf')
 print(json.dumps(manifest,ensure_ascii=False))
 return manifest
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--only',choices=IDS);parser.add_argument('--html-only',action='store_true');args=parser.parse_args();build(args.only,args.html_only)
