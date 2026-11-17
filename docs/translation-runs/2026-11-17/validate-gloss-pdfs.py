"""Reopen every exported PDF and check text, page geometry and gloss structure."""
from pathlib import Path
from html.parser import HTMLParser
import fitz,json,re,unicodedata
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[3];RECORDS=Path(__file__).resolve().parent
IDS=['en-crow','zh-rabbit','ja-jizo','bo-crane','reverse-song']
def norm(s):return re.sub(r'\s+','',unicodedata.normalize('NFKC',s)).replace('\u200b','').replace('\u00ad','')
def letters(s):return ''.join(c for c in unicodedata.normalize('NFKC',s).casefold() if unicodedata.category(c)[0] in 'LMN')
class Tables(HTMLParser):
 def __init__(self):super().__init__();self.inside=False;self.rows=[];self.all=[]
 def handle_starttag(self,tag,a):
  d=dict(a)
  if tag=='table' and d.get('class')=='interlinear':self.inside=True;self.rows=[]
  if tag=='tr' and self.inside:self.rows.append(0)
  if tag=='td' and self.inside:self.rows[-1]+=1
 def handle_endtag(self,tag):
  if tag=='table' and self.inside:self.all.append(self.rows);self.inside=False
results=[];thumbs=[]
for cid in IDS:
 d=json.loads((RECORDS/cid/'gloss.json').read_text());page=ROOT/'site/translation-runs'/(cid+'.html');parser=Tables();parser.feed(page.read_text())
 assert parser.all and all(len(rows)==3 and len(set(rows))==1 for rows in parser.all),(cid,parser.all)
 if cid!='reverse-song':
  old=json.loads((RECORDS/cid/('translation-reviewed.json' if cid=='bo-crane' else 'translation.json')).read_text());raw=old.get('sentences',old.get('units',[]))
  oldtext=''.join(x['translation'] for x in raw);newtext=''.join(t['pinyin'] for c in d['clauses'] for u in c['target_units'] for t in u['tokens'])
  assert letters(oldtext)==letters(newtext),(cid,'Lexical sequence changed')
 doc=fitz.open(page.with_suffix('.pdf'));full=norm(''.join(p.get_text() for p in doc));missing=[];outside=[]
 for c in d['clauses']:
  assert norm(c['source']) in full,(cid,'source missing',c['source'])
  for u in c['target_units']:
   for t in u['tokens']:
    for field in ['pinyin','ipa','gloss']:
     if t.get(field) and norm(t[field]) not in full:missing.append((field,t[field]))
 assert not missing,(cid,missing)
 for i,p in enumerate(doc):
  # A white page fill is harmless; visible rules or shaded panels are not.
  assert all(not dr.get('color') and dr.get('fill') in (None,(1.0,1.0,1.0)) for dr in p.get_drawings()),(cid,i,'Unexpected rules/shading')
  for b in p.get_text('blocks'):
   if b[0]<0 or b[1]<0 or b[2]>p.rect.width+.5 or b[3]>p.rect.height+.5:outside.append(i+1)
  assert re.search(r'\b'+str(i+1)+r'\s*$',p.get_text()),(cid,i,'page number missing')
  pix=p.get_pixmap(matrix=fitz.Matrix(.43,.43));img=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
  card=Image.new('RGB',(270,390),'white');card.paste(img,(4,20));ImageDraw.Draw(card).text((5,3),f'{cid} p{i+1}',fill='black');thumbs.append(card)
 assert not outside,(cid,outside)
 results.append({'id':cid,'pages':len(doc),'clauses':len(d['clauses']),'aligned_tables':len(parser.all),'three_rows_equal_columns':True,'lexical_sequence_preserved':True,'all_source_and_cell_text_present':True,'black_and_white_unboxed':True,'no_page_overflow':True})
 for ix in set([0,len(doc)//2,len(doc)-1]):doc[ix].get_pixmap(matrix=fitz.Matrix(1.3,1.3)).save(f'/tmp/gloss-{cid}-{ix+1}.png')
combined=fitz.open(ROOT/'site/translation-runs/five-translations.pdf');text=''.join(p.get_text() for p in combined)
nums=[int(x) for x in re.findall(r'\((\d+)\)',text)];assert nums==list(range(1,44)),nums
results.append({'combined_pages':len(combined),'continuous_source_numbers':nums})
canvas=Image.new('RGB',(270*3,390*((len(thumbs)+2)//3)),(210,210,210))
for i,img in enumerate(thumbs):canvas.paste(img,((i%3)*270,(i//3)*390))
canvas.save('/tmp/gloss-all-pages.png');(RECORDS/'pdf-validation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n');print(json.dumps(results,ensure_ascii=False))
