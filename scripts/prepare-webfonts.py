#!/usr/bin/env python3
"""Install the unmodified, pinned upstream Gentium Plus webfonts for Pages.

No request to an external font service is made by a site visitor. The original
OFL is published with the fonts. Failure aborts deployment rather than silently
publishing a site with missing fonts. Run before serving site/ locally as well.
"""
from io import BytesIO
from pathlib import Path
import sys
import time
from urllib.request import Request, urlopen
from zipfile import ZipFile

URL = 'https://github.com/silnrsi/font-gentium/releases/download/v6.200/GentiumPlus-6.200.zip'
ARCHIVE_BYTES = 10935378  # Upstream release asset 93877537.
STYLES = ('Regular', 'Bold', 'Italic', 'BoldItalic')


def install(root: Path) -> None:
    data = None
    for attempt in range(3):
        try:
            request = Request(URL, headers={'User-Agent': 'bizic-dictionary-webfont-build'})
            with urlopen(request, timeout=90) as response:
                data = response.read(ARCHIVE_BYTES + 1)
            if len(data) != ARCHIVE_BYTES:
                raise ValueError('Unexpected Gentium Plus release archive size')
            break
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)
    destination = root / 'fonts'
    destination.mkdir(parents=True, exist_ok=True)
    with ZipFile(BytesIO(data)) as archive:
        for style in STYLES:
            filename = f'GentiumPlus-{style}.woff2'
            matches = [name for name in archive.namelist() if Path(name).name == filename]
            if len(matches) != 1:
                raise ValueError(f'Expected one upstream {filename}; got {matches}')
            font = archive.read(matches[0])
            if not font.startswith(b'wOF2'):
                raise ValueError(f'Not a WOFF2 file: {filename}')
            (destination / filename).write_bytes(font)
        license_files = [name for name in archive.namelist() if Path(name).name == 'OFL.txt']
        if len(license_files) != 1:
            raise ValueError('Missing or ambiguous upstream OFL license')
        (destination / 'GentiumPlus-OFL.txt').write_bytes(archive.read(license_files[0]))
    print('Installed Gentium Plus 6.200: Regular, Bold, Italic, BoldItalic and OFL')


if __name__ == '__main__':
    install(Path(sys.argv[1] if len(sys.argv) > 1 else 'site'))
