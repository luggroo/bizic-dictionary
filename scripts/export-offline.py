#!/usr/bin/env python3
"""Build a self-contained, deterministic reader ZIP from the Pages inputs."""
import argparse
import gzip
import hashlib
from html import escape
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile, ZipInfo

REPO = Path(__file__).resolve().parents[1]
SITE = REPO / 'site'
SCRIPTS = REPO / 'scripts'


def run(*args):
    subprocess.run(args, cwd=REPO, check=True)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def json_bytes(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).encode('utf-8')


def prepared_json(root, name):
    return json.loads(gzip.decompress((root / 'prepared' / (name + '.json.gz')).read_bytes()))


def prepare(root, font_archive):
    # A working checkout can also contain the generated multi-thousand-page SEO tree.
    # Start from tracked Pages inputs, not from the contents of a previous build.
    names = subprocess.check_output(['git', 'ls-files', '-z', 'site'], cwd=REPO).decode().split('\0')
    for name in filter(None, names):
        source = REPO / name
        destination = root / source.relative_to(SITE)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    for name in ('data.json', 'dictionary.json'):
        (root / name).write_bytes(gzip.decompress((root / (name + '.gz')).read_bytes()))
    font_args = ['--archive', str(font_archive.resolve())] if font_archive else []
    run(sys.executable, SCRIPTS / 'prepare-webfonts.py', root, *font_args)
    run(sys.executable, SCRIPTS / 'apply-gloss-reviews.py', root)
    for script in ('refresh-brassett-ipa', 'normalize-ipa-data', 'prepare-search-data', 'build-localized-home'):
        flags = ['--offline-reader'] if script == 'prepare-search-data' else []
        run('node', SCRIPTS / (script + '.cjs'), root, *flags)


def category(path):
    name = path.name
    if path.parts[0] == 'fonts':
        return 'fonts'
    if path.parts[0] == 'prepared':
        if name.startswith(('word', 'entries')):
            return 'dictionary'
        if name.startswith('corpus'):
            return 'corpus'
        if name.startswith(('catalogue', 'source-', 'history')):
            return 'bibliography'
        return 'other'
    if 'translations' in name or name.startswith('ui-language'):
        return 'localization'
    if 'grammar' in name or name.startswith(('south-zhou', 'verbs')):
        return 'grammar'
    if 'notation' in name or 'ipa' in name:
        return 'notation'
    if name.startswith(('word-', 'editorial-', 'lexical-', 'semantic-', 'spelling-')):
        return 'dictionary'
    if name.startswith(('yubao', 'longshan-texts', 'corpus')):
        return 'corpus'
    if name in ('research.js', 'comparison-merge.js'):
        return 'bibliography'
    if path.suffix in ('.js', '.html', '.css', '.svg', '.webmanifest'):
        return 'frontend'
    return 'other'


LABELS = {
    'brand': ('毕兹学堂', 'Bizic Academy'), 'slogan': ('逻土话，学土话，用土话', 'Find Tujia words, learn Tujia, use Tujia.'),
    'navigation': ('主导航', 'Navigation'), 'menu': ('目录', 'Menu'), 'back': ('返回', 'Back'),
    'close': ('关闭目录', 'Close menu'), 'home': ('首页', 'Home'), 'words': ('词典查询', 'Dictionary lookup'),
    'grammar': ('语法', 'Grammar'), 'corpus': ('例句语料', 'Example corpus'), 'notation': ('记音', 'Notation'),
    'history': ('历史比较', 'Historical comparison'), 'translation': ('翻译工具', 'Translation tools'),
    'knowledge': ('语言知识', 'Language reference'),
    'grammar_summary': ('龙山、保靖仙仁与泸溪的参考语法', 'Reference grammars for Longshan, Baojing Xianren and Luxi.'),
    'notation_summary': ('对照不同资料中的音标与拼写', 'Compare IPA and spelling across sources.'),
    'history_summary': ('查阅重建词形和各地的读音', 'Explore reconstructed forms and local pronunciations.'),
    'query': ('词形、汉语或英语', 'Word, Chinese or English'), 'scope': ('搜索范围', 'Search scope'),
    'search': ('搜索', 'Search'), 'words_search': ('搜词典', 'Dictionary search'), 'global_search': ('搜全站', 'Search all'),
    'ime': ('土家语输入法', 'Tujia Keyboard'), 'manage': ('管理', 'Manage'), 'keyboard_settings': ('输入法设置', 'Keyboard settings'),
    'settings': ('设置', 'Settings'), 'language': ('界面语言', 'Interface language'), 'privacy': ('隐私说明', 'Privacy'),
    'appearance': ('外观', 'Appearance'), 'system': ('跟随系统', 'System'), 'light': ('浅色', 'Light'),
    'dark': ('深色', 'Dark'), 'spelling': ('拼写与记音', 'Spelling and notation'),
    'media_links': ('显示原图和录音链接', 'Show image and recording links')
}

ICON_PATHS = {
    'knowledge': '<rect x="3" y="4" width="4" height="16" rx="1"/><rect x="9" y="4" width="4" height="16" rx="1"/><path d="m15 6 4-1 3 14-4 1z"/>',
    'keyboard': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M5 9h2m2 0h2m2 0h2m2 0h2M5 12h2m2 0h2m2 0h2m2 0h2M8 15h8"/>',
    'settings': '<path d="M4 6h5m4 0h7M4 12h9m4 0h3M4 18h2m4 0h10"/><circle cx="11" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
    'menu': '<path d="M3 6h18M3 12h14M3 18h18"/>', 'back': '<path d="m14 5-7 7 7 7"/>',
    'next': '<path d="m9 6 6 6-6 6"/>', 'close': '<path d="m6 6 12 12M18 6 6 18"/>',
    'search': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>'
}


def app_navigation(html, english):
    # Website route icons and the actual shared home markup are available before
    # scripts run. The production renderer captures #main as its home template.
    nav = re.search(r'<nav\b[^>]*>([\s\S]*?)</nav>', html)[1]
    icons = {key: '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
             'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>'
             for key, path in ICON_PATHS.items()}
    icons.update({key: svg for key, svg in re.findall(r'<button data-view="([^"]+)">(<svg[\s\S]*?</svg>)', nav)})
    icons['translation'] = re.search(r'<a class="nav-repo-link"[^>]*>(<svg[\s\S]*?</svg>)', nav)[1]

    def label(key):
        zh, en = LABELS[key]
        return f'<span data-ui-source="{escape(zh)}" data-ui-english="{escape(en)}">{escape(en if english else zh)}</span>'

    def link(key, home_tile=False):
        if key == 'translation':
            target = 'translation-en.html' if english else 'translation.html'
            tag, attrs = 'a', f'href="{target}" data-academy-translation'
        elif key == 'ime':
            tag, attrs = 'a', 'href="/_app/keyboard"'
        else:
            tag, attrs = 'button', f'type="button" data-view="{key}"'
        icon = icons['keyboard' if key == 'ime' else key]
        icon = f'<i class="academy-tile-icon" aria-hidden="true">{icon}</i>' if home_tile else icon
        caption = label(key) if home_tile else '<span>' + label(key) + '</span>'
        return f'<{tag} {attrs} class="academy-link-{key}">{icon}{caption}</{tag}>'

    destinations = ['words', 'corpus', 'translation', 'knowledge']
    tokens = {key: escape(pair[int(english)]) for key, pair in LABELS.items()}
    tokens.update({'icon_' + key: svg for key, svg in icons.items()})
    tokens['destinations'] = ''.join(link(key, True) for key in destinations)
    tokens['drawer_links'] = ''.join(link(key) for key in ['home', *destinations, 'ime', 'settings'])

    def template(name):
        source = (REPO / 'offline' / (name + '.html')).read_text()
        source = re.sub(r'\[\[(\w+)\]\]', lambda match: label(match[1]), source)
        return re.sub(r'\{\{(\w+)\}\}', lambda match: tokens[match[1]], source)

    html = re.sub(r'<aside\b[\s\S]*?</aside>', lambda _: template('navigation'), html, count=1)
    html = re.sub(r'<main id="main">[\s\S]*?</main>', lambda _: '<main id="main">' + template('home') + '</main>' + template('settings') + template('knowledge'), html, count=1)
    html = re.sub(r'<footer class="site-footer">[\s\S]*?</footer>', '', html, count=1)
    return html.replace('<body ', '<body class="academy-app" data-academy-home="yes" ', 1)


def build_reader(root, output):
    def copy(name, source=None):
        dest = output / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source or root / name, dest)
    index = (root / 'index.html').read_text()
    version = re.search(r'<meta name="prepared-data-version" content="([0-9a-f]+)">', index)[1]
    # Same eager dependencies and all of the production loader's lazy groups.
    eager = re.findall(r'(?:src|href)="([^"?]+\.(?:js|css))(?:\?[^"]*)?"', index)
    loader = (root / 'page-loader.js').read_text().split(' const assets=', 1)[0]
    lazy = re.findall(r"'([\w./-]+\.(?:js|css))'", loader)
    data_files = ['icon.svg', 'yangque-logo.svg', 'brassett/grammar.json',
                  'notation-coverage.json', 'xu-ipa-site-mapping.json', 'xu-ipa-site-mapping.md',
                  'xu-transcription-notes.md', 'translation-gloss.js', 'translation-guide.js',
                  'translation-guide.css', 'vendor/pako-LICENSE.txt', 'vendor/opencc-dictionary-LICENSE.txt']
    for name in set(eager + lazy + data_files):
        copy(name)
    for name in ('ui-language.js', 'translation-guide.js'):
        module = output / name
        module.write_text(module.read_text().replace('毕资学堂', '毕兹学堂'))
    for path in (root / 'fonts').iterdir():
        copy(path.relative_to(root))
    copy('fonts/NotoSerifTibetan-OFL.txt', REPO / 'offline/NotoSerifTibetan-OFL.txt')
    for name in ('academy.css', 'academy.js', 'tujia-keyboard.svg'):
        copy(name, REPO / 'offline' / name)
    copy('mobile-optional.js', SITE / 'mobile-optional.js')

    for name in ('home', 'catalogue', 'history', 'corpus', 'corpus-search', 'corpus-index'):
        copy('prepared/' + name + '.json.gz')
    copy('prepared/word-search.json.gz', root / 'prepared/offline-word-search.json.gz')
    for path in (root / 'prepared').glob('source-*.json.gz'):
        copy(path.relative_to(root))
    # Batch the exact production single-entry payloads. The forgiving online loader
    # also needs separate 200-word batches for exports; the app can share one set.
    index_data = prepared_json(root, 'word-search')
    columns = dict(zip(index_data['keys'], index_data['columns'], strict=True))
    batches = {}
    for word_id, group in zip(columns['id'], columns['_chunk'], strict=True):
        batches.setdefault(group, []).append(word_id)
    for group, ids in batches.items():
        entries = [prepared_json(root, 'entries/' + word_id) for word_id in ids]
        if any(entry['id'] != word_id or not isinstance(entry['attestations'], list)
               for entry, word_id in zip(entries, ids, strict=True)):
            raise ValueError('Invalid dictionary batch ' + str(group))
        data = gzip.compress(json_bytes(entries), compresslevel=9, mtime=0)
        (output / 'prepared' / ('words-' + str(group) + '.json.gz')).write_bytes(data)
    # gzip headers can record the build host's operating system. The payload and
    # CRC are independent of those fields. Use a fixed timestamp and OS byte.
    for chunk in (output / 'prepared').glob('*.gz'):
        data = bytearray(chunk.read_bytes())
        data[4:8] = bytes(4)
        data[9] = 255
        chunk.write_bytes(data)
    corpus_ids = [c['id'] for c in prepared_json(root, 'corpus')['corpus']]
    if corpus_ids != [c['_corpusEntry'] for c in prepared_json(root, 'corpus-index')['corpus']]:
        raise ValueError('Corpus index disagrees with full corpus')
    optional_script = '<script src="mobile-optional.js" defer></script>'
    for name in ('index.html', 'en/index.html', 'translation.html', 'translation-en.html'):
        html = (root / name).read_text().replace('<html lang=', '<html data-edition="offline" lang=', 1)
        html = html.replace('</head>', '<link rel="stylesheet" href="academy.css"></head>')
        if name.endswith('index.html'):
            html = app_navigation(html, name.startswith('en/'))
            html = re.sub(r'<link rel="manifest"[^>]*>', '', html)
            # Both entrypoints render their localized home immediately. Both use the same bootstrap data.
            html, count = re.subn(r'<script id="site-bootstrap-data"[^>]*>[\s\S]*?</script>', '', html)
            if count != 1:
                raise ValueError('Expected production home bootstrap data')
            html = html.replace('<script src="media.js"', optional_script + '<script src="media.js"', 1)
            html = html.replace('<script src="app.js"', '<script src="academy.js" defer></script><script src="app.js"', 1)
        else:
            english = name == 'translation-en.html'
            home_url = '/en/#home' if english else '/#home'
            back = 'Back' if english else '返回'
            guide_title = LABELS['translation'][int(english)]
            bar = (f'<header class="academy-guide-bar"><a class="academy-guide-back" href="{home_url}" aria-label="{back}">'
                   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
                   'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg></a>'
                   f'<strong>{guide_title}</strong></header>')
            html = re.sub(r'(<body\b[^>]*>)', lambda match: match[1] + bar, html, count=1)
            html = html.replace('<html data-edition="offline"', '<html data-edition="offline" data-academy-guide')
            # The translation guide uses editorial absolute links for its learning tabs.
            html = html.replace('href="https://tujia.biz/?lang=', 'href="/?lang=')
            html = html.replace('href="translation-runs', 'href="https://tujia.biz/translation-runs')
            html = html.replace('</body>', optional_script+'<script src="academy.js" defer></script></body>')
        dest = output / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html)
    # Keep the legacy published grammar URL; avoid executing inline redirects.
    guide = (root / 'guides/verbs.html').read_text()
    inline = re.search(r'<script>([^<]+)</script>', guide)
    (output / 'guides').mkdir()
    (output / 'guides/verbs.js').write_text(inline[1] + '\n')
    guide = guide.replace('<meta charset=', '<head><meta charset=', 1)
    (output / 'guides/verbs.html').write_text(guide.replace(inline[0], '<script src="verbs.js" defer></script></head>'))
    return version, {'words':len(columns['id']), 'aliases':len(index_data['wordAliases']), 'corpus':len(corpus_ids),
                     'sources':len(prepared_json(root, 'catalogue')['sources'])}


def write_zip(output, archive, version, counts):
    revision = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=REPO, text=True).strip()
    entries = sorted((p.relative_to(output) for p in output.rglob('*') if p.is_file()), key=Path.as_posix)
    files = []
    for name in entries:
        data = (output / name).read_bytes()
        files.append({'path':name.as_posix(), 'size':len(data), 'sha256':digest(data), 'category':category(name)})
    manifest = {'schemaVersion':1, 'contentVersion':version, 'sourceRevision':revision, 'counts':counts, 'files':files}
    manifest_path = Path('offline-manifest.json')
    (output / manifest_path).write_bytes(json_bytes(manifest) + b'\n')
    with ZipFile(archive, 'w') as bundle:
        for name in sorted([manifest_path, *entries], key=Path.as_posix):
            info = ZipInfo(name.as_posix(), (1980, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            method = ZIP_STORED if name.suffix in ('.gz','.woff','.woff2') else ZIP_DEFLATED
            bundle.writestr(info, (output / name).read_bytes(), compress_type=method, compresslevel=9)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    parser.add_argument('--directory', type=Path, help='Also write extracted assets to this new directory')
    parser.add_argument('--font-archive', type=Path, help='Use the cached upstream GentiumPlus-6.200.zip')
    options = parser.parse_args()
    if options.directory and options.directory.exists():
        parser.error('--directory must be a new directory')
    archive = options.archive.resolve()
    archive.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=archive.parent) as scratch:
        temp = Path(scratch)
        root, output = temp / 'pages', temp / 'mobile'
        output.mkdir()
        prepare(root, options.font_archive)
        version, counts = build_reader(root, output)
        run('node', SCRIPTS / 'mobile-compat/build.cjs', output)
        result = temp / 'snapshot.zip'
        write_zip(output, result, version, counts)
        if options.directory:
            shutil.copytree(output, options.directory)
        result.replace(archive)
        print(json.dumps({'archive':str(archive), 'bytes':archive.stat().st_size, 'sha256':digest(archive.read_bytes()),
                          'contentVersion':version, **counts}, ensure_ascii=False))


if __name__ == '__main__':
    main()
