// Only entries in this catalogue can be requested by a mobile reader.
const fs = require('node:fs');
const path = require('node:path');
const { gunzipSync } = require('node:zlib');
const { createHash } = require('node:crypto');

const mediaTypes = {
  '.pdf': 'application/pdf', '.mp3': 'audio/mpeg', '.wav': 'audio/wav',
  '.mp4': 'video/mp4', '.flv': 'video/x-flv', '.flac': 'audio/flac',
  '.png': 'image/png', '.jpg': 'image/jpeg'
};
const siteURL = 'https://tujia.biz/';
const hash = data => createHash('sha256').update(data).digest('hex');

function writeCatalog(sourceSite, destination) {
  const official = JSON.parse(gunzipSync(fs.readFileSync(path.join(sourceSite, 'data.json.gz'))));
  const entries = {};
  function register(url, type, name, links, size = 0, sha256 = '', revision = '') {
    // A new file revision gets its own cache key even when the URL is unchanged.
    const id = hash([url, type, size, sha256, revision].join('\n')).slice(0, 32);
    entries[id] = {url, type, name, links: [...new Set(links)].sort(), size, sha256};
  }
  for (const source of [...official.sources, ...(official.sourceVariants || [])]) {
    const original = source.url || '';
    const drive = /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view(?:\?|$)/.exec(original);
    const type = source.mime_type === 'video/flv' ? 'video/x-flv' : source.mime_type;
    const links = [original, source.image, source.media].filter(Boolean);
    if (drive && drive[1] === source.id && source.can_download && Object.values(mediaTypes).includes(type)) {
      const url = 'https://drive.usercontent.google.com/download?id=' + source.id + '&export=download&confirm=t';
      register(url, type, source.title, links, Number(source.size), '', source.modified_time);
    } else if (source.id === 'brassett-2006' && original === official.brassett.url) {
      register(original, 'application/pdf', source.title, links, Number(source.size), official.brassett.sha256);
    }
    if (source.image && /^maps\/[\w-]+\.png$/.test(source.image) && !source.can_download) {
      register(new URL(source.image, siteURL).href, 'image/png', source.title, [source.image]);
    }
    for (const member of source.members || []) {
      if (!/^media\/[\w-]+\.(wav|flac)$/.test(member.media || '')) continue;
      register(new URL(member.media, siteURL).href, mediaTypes[path.extname(member.media)], member.name, [member.media]);
    }
  }
  for (const page of official.brassett.checkedScanPages) {
    const name = 'brassett/pages/' + String(page).padStart(3, '0') + '.jpg';
    register(new URL(name, siteURL).href, 'image/jpeg', 'Brassett · ' + page, [name]);
  }
  for (const folder of ['translation-pdfs', 'translation-runs']) {
    for (const file of fs.readdirSync(path.join(sourceSite, folder)).sort()) {
      if (!file.endsWith('.pdf')) continue;
      const name = folder + '/' + file;
      const contents = fs.readFileSync(path.join(sourceSite, name));
      register(new URL(name, siteURL).href, 'application/pdf', file, [name], contents.length, hash(contents));
    }
  }
  fs.writeFileSync(path.join(destination, 'optional-resources.json'), JSON.stringify({
    schemaVersion: 1, resources: Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0))
  }) + '\n');
}

module.exports = {writeCatalog};
