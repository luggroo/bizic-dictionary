"""Localize only the UI's gloss meanings; archival gloss and PDF data stay intact."""
from pathlib import Path
import html,json,re
ROOT=Path(__file__).resolve().parent
LEXICON=json.loads((ROOT/'gloss-ui-locales.json').read_text())
LABELS=set(json.loads((ROOT/'gloss-label-inventory.json').read_text()))

def localize(text,language):
 if language not in ('zh','en'):raise ValueError(language)
 result=[]
 for part in text.split('-'):
  if all(piece in LABELS for piece in part.split('.')):result.append(part)
  else:
   if part not in LEXICON:raise ValueError('Missing UI gloss meaning: '+part)
   result.append(LEXICON[part][language])
 return '-'.join(result)

def attributes(original):
 return ' data-gloss-original="'+html.escape(original,quote=True)+'" data-zh="'+html.escape(localize(original,'zh'),quote=True)+'" data-en="'+html.escape(localize(original,'en'),quote=True)+'"'

def localize_recorded_tables(text,language):
 saved=[]
 def preserve(m):
  saved.append(m[0]);return '<!--preserved-reverse-gloss-'+str(len(saved)-1)+'-->'
 text=re.sub(r'<article\b[^>]*id="example-reverse-song"[^>]*>.*?</article>',preserve,text,flags=re.S)
 def row(match):
  def cell(m):
   attrs,body=m.groups()
   original_attr=re.search(r'\bdata-gloss-original="([^"]*)"',attrs)
   original=html.unescape(original_attr[1]) if original_attr else html.unescape(re.sub(r'<[^>]+>','',body))
   attrs=re.sub(r'\s+(?:data-gloss-original|data-zh|data-en|lang)="[^"]*"','',attrs)
   return '<td'+attrs+' lang="'+language+'"'+attributes(original)+'>'+html.escape(localize(original,language))+'</td>'
  return match[1]+re.sub(r'<td\b([^>]*)>(.*?)</td>',cell,match[2],flags=re.S)+match[3]
 text=re.sub(r'(<tr\b[^>]*class="gloss"[^>]*>)(.*?)(</tr>)',row,text,flags=re.S)
 for i,part in enumerate(saved):text=text.replace('<!--preserved-reverse-gloss-'+str(i)+'-->',part)
 return text
