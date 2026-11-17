"""Check bilingual UI coverage and protection of the archived language data."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib, json, re, subprocess
from gloss_ui import localize, localize_recorded_tables

ROOT = Path(__file__).resolve().parents[3]
RECORDS = Path(__file__).resolve().parent

class Rows(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.kind = None
        self.cell = None
        self.rows = {k: [] for k in ('pinyin', 'ipa', 'gloss')}
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'tr': self.kind = attrs.get('class')
        if tag == 'td' and self.kind in self.rows: self.cell = [attrs, '']
    def handle_data(self, text):
        if self.cell is not None: self.cell[1] += text
    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.rows[self.kind].append(self.cell)
            self.cell = None
        if tag == 'tr': self.kind = None

assert localize('희다-LNK', 'zh') == '白-LNK'
assert localize('희다-LNK', 'en') == 'white-LNK'
assert localize('DIR.IMM', 'zh') == 'DIR.IMM'
assert localize('은하수', 'en') == 'Milky.Way'
assert localize('གཡར་', 'zh') == '借给'
assert localize('手ぬぐい', 'en') == 'hand.towel'
try:
    localize('unmapped-new-meaning', 'en')
    raise AssertionError('Missing meanings must fail the export')
except ValueError:
    pass

files = ['site/translation.html', 'site/translation-en.html',
         'site/translation-runs.html', 'site/translation-runs-en.html']
files += [str(p.relative_to(ROOT)) for p in (ROOT/'site/translation-runs').glob('*.html')
          if p.stem not in ('all-translations', 'five-translations')]
localized = 0
for name in files:
    text = (ROOT/name).read_text()
    rows = Rows(text).rows
    for attrs, value in rows['gloss']:
        if 'data-gloss-original' not in attrs: continue
        for lang in ('zh', 'en'):
            assert attrs['data-'+lang] == localize(attrs['data-gloss-original'], lang), name
        assert value == attrs['data-'+attrs['lang']], (name, value)
        localized += 1
    # Compare against the base revision when running before commit, or its parent
    # after commit; callers may pin the base revision explicitly.
    import os
    base = os.environ.get('GLOSS_UI_BASE', 'HEAD')
    old = subprocess.check_output(['git', 'show', base+':'+name], cwd=ROOT).decode()
    before = Rows(old).rows
    for kind in ('pinyin', 'ipa'):
        assert [v for _,v in rows[kind]] == [v for _,v in before[kind]], (name, kind)
    reverse = 'example-reverse-song' if name in files[:2] else 'reverse-song'
    pattern = r'<article\b[^>]*id="'+reverse+r'"[^>]*>.*?</article>'
    assert re.findall(pattern, text, re.S) == re.findall(pattern, old, re.S), name
    if name in files[:2]:
        language = 'en' if name.endswith('-en.html') else 'zh'
        assert localize_recorded_tables(text, language) == text, 'Not idempotent: '+name

# PDFs and canonical gloss inputs must not differ from the pinned base revision.
protected = list((ROOT/'site').rglob('*.pdf')) + list(RECORDS.glob('*/gloss.json'))
for p in protected:
    name = str(p.relative_to(ROOT))
    old = subprocess.check_output(['git', 'show', base+':'+name], cwd=ROOT)
    assert hashlib.sha256(old).digest() == hashlib.sha256(p.read_bytes()).digest(), name
assert localized > 1000, localized
print(f'PASS: {localized} localized cells; Pinyin, IPA, reverse song and {len(protected)} archived files unchanged')
