// Compact, independent reading routes. Ordinary website assets never load these.
// Select individual witnesses, not the dialect of a merged entry.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');

const ORIGIN = 'https://tujia.biz';
const PAGE_SIZE = 100;
const GROUPS = {brassett:'Brassett 04、06', longshan:'龙山语保', southern:'南部土家语'};
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = value => typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
const list = value => (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);
const unique = values => [...new Set(values)];
const compare = (a,b) => a < b ? -1 : a > b ? 1 : 0;
const normal = value => String(value ?? '').normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
const chineseKeys = value => unique(String(value || '').split(/[;；/／]/).map(normal).filter(Boolean));
const entryPath = id => 'text/entry/' + id + '.html';
const queryPath = query => 'text/lookup/zh/' + (Buffer.byteLength(query) <= 180 && !/[\\/\x00-\x1f]/.test(query) && !/^\.+$/.test(query) ? query : '~'+crypto.createHash('sha256').update(query).digest('hex').slice(0,24)) + '.html';
const href = name => '/' + name.split('/').map(encodeURIComponent).join('/');
// The URL is the link text too: flattened web readers retain the destination.
const link = (name, label = '') => `${label ? escape(label)+' ' : ''}<a href="${href(name)}">${ORIGIN+href(name)}</a>`;
const sourceUrl = value => /^https?:\/\//i.test(value || '') ? `<a href="${escape(value)}">${escape(value)}</a>` : '';
const style = ':root{color-scheme:light dark}body{max-width:72ch;margin:1em auto;padding:0 .75em;font:1em/1.5 system-ui,sans-serif;background:Canvas;color:CanvasText;overflow-wrap:anywhere}pre{white-space:pre-wrap;font:inherit}a{color:LinkText;overflow-wrap:anywhere}:focus-visible{outline:2px solid currentColor;outline-offset:2px}h1{font-size:1.4em}h2,h3{font-size:1.1em}footer{margin-top:1.5em}';
function page(title, body, version) {
  return `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="text-scale" content="scale"><meta name="color-scheme" content="light dark"><meta name="prepared-data-version" content="${escape(version)}"><title>${escape(title)}</title><style>${style}</style><body><nav><a class="skip-link" href="#main-heading">跳到正文</a> · <a href="/text/">文本目录</a></nav><main><h1 id="main-heading" tabindex="-1">${escape(title)}</h1>${body}</main><footer>资料版本 ${escape(version)}</footer></body></html>\n`;
}
function sourceMap(data) {
  return new Map([...(data.sourceVariants || []), ...(data.sources || [])].map(s=>[s.id,s]));
}
function groupFor(record, data, sources = sourceMap(data)) {
  const canonical = data.sourceAliases?.[record.source] || record.source;
  if (canonical === 'brassett-2004' || canonical === 'brassett-2006') return 'brassett';
  if (canonical === 'yubao-60757') return 'longshan';
  // A source-wide Southern label selects otherwise unclassified witnesses only;
  // it never overrides an explicit Northern or mixed witness label.
  const dialect = record.dialect;
  if (dialect === '南部' || ((!dialect || dialect === '未标明') && sources.get(canonical)?.dialect === '南部')) return 'southern';
  return null;
}
function selectEntry(entry, data, sources) {
  const attestations = entry.attestations.filter(a=>groupFor(a,data,sources));
  const ids = new Set(attestations.map(a=>a.id));
  const notations = Object.fromEntries(Object.entries(entry.notations || {}).map(([scheme,values])=>[scheme,values.flatMap(n=>{
    const attestationIds = (n.attestationIds || []).filter(id=>ids.has(id));
    return attestationIds.length ? [{...n,attestationIds}] : [];
  })]));
  return {...entry,attestations,notations};
}
const labels = {
  id:'Attestation ID', source:'Source ID', term:'原记音', zh:'汉语', en:'English', scheme:'原记音方案',
  dialect:'方言', location:'调查点', locations:'调查点', pos:'来源词性', locator:'文献定位', sourceRef:'原文定位',
  citation:'引文', originalTerm:'校订前记音', correctedTerm:'校订记音', originalZh:'来源汉语', originalEn:'来源英语',
  zhTranslation:'汉译依据', enTranslation:'英译依据', alt:'其他原始形式', notice:'来源说明',
  parserCorrection:'解析校订', toneReview:'声调校订', zhBeforeReview:'复核前汉语', enBeforeReview:'复核前英语',
  zhReviewStatus:'释义复核状态', zhReviewEvidence:'释义复核依据', collection:'资料集', category:'来源分类', language:'来源语言',
  rn:'STEDT rn', semanticKey:'来源语义编号'
};
function renderAttestation(a) {
  // Keep every populated witness field, including corrections and provenance.
  const lines = Object.entries(a).filter(([key,value])=>value !== undefined && value !== null && (value !== '' || ['originalZh','originalEn'].includes(key)))
    .map(([key,value])=>`${labels[key] || key}: ${value === '' ? '未提供' : text(value)}`);
  if (!a.dialect) lines.push('方言: 未记录');
  if (!list(a.locations || a.location).length) lines.push('调查点: 未记录');
  return `<section id="att-${escape(a.id)}" data-attestation-id="${escape(a.id)}"><pre>${escape(lines.join('\n'))}</pre></section>`;
}
function renderSources(ids, data) {
  const sources = sourceMap(data);
  return '<h2>来源</h2>'+unique(ids).map(id=>{
    const original = sources.get(id);
    const canonicalId = data.sourceAliases?.[id] || id;
    const canonical = sources.get(canonicalId) || original;
    const lines = [`Source ID: ${id}`,`文献: ${canonical?.title || original?.title || id}`];
    if (canonicalId !== id) lines.push(`Canonical source ID: ${canonicalId}`);
    if (original?.title && original.title !== canonical?.title) lines.push(`来源记录: ${original.title}`);
    const geography = list(canonical?.locations || canonical?.location);
    if (geography.length) lines.push(`文献调查范围: ${geography.join('、')}`);
    return `<section data-source-id="${escape(id)}"><pre>${escape(lines.join('\n'))}</pre>${sourceUrl(original?.url || canonical?.url)}</section>`;
  }).join('');
}
function renderEntry(entry, data, version) {
  const senses = unique(entry.attestations.map(a=>a.zh || a.en).filter(Boolean)).join('; ');
  const notes = list(entry._entryNotes || entry.editorialNotes);
  const notations = Object.entries(entry.notations || {}).flatMap(([scheme,values])=>values.map(n=>{
    const {text:form,attestationIds,...metadata} = n;
    const lines = [`${scheme}: ${form}`,`关联见证: ${attestationIds.join(', ')}`];
    if (Object.keys(metadata).length) lines.push(`记录说明: ${JSON.stringify(metadata)}`);
    if (n.sourceMethods?.length > 1 || n.sourceProfiles?.length > 1) lines.push('同形记录合并了多种处理依据；未逐条分配到见证。');
    return `<pre data-notation-scheme="${escape(scheme)}">${escape(lines.join('\n'))}</pre>`;
  })).join('');
  return page(senses+' · '+entry.id,`<p>Entry ID: ${escape(entry.id)} · ${entry.attestations.length} 条见证</p>${notes.map(n=>`<pre>${escape(text(n))}</pre>`).join('')}<h2>来源见证</h2>${entry.attestations.map(renderAttestation).join('')}${notations ? '<h2>关联记音</h2>'+notations : ''}${renderSources(entry.attestations.map(a=>a.source),data)}`,version);
}
function renderLookup(query, entries, data, version) {
  const sources = sourceMap(data);
  const rows = Object.entries(GROUPS).map(([group,label])=>{
    const matches = entries.filter(e=>e.attestations.some(a=>groupFor(a,data,sources) === group && chineseKeys(a.zh).includes(query)));
    return matches.length ? `<h2>${label}</h2>`+matches.map(e=>{
      const forms = unique(e.attestations.filter(a=>groupFor(a,data,sources) === group && chineseKeys(a.zh).includes(query)).map(a=>a.term)).join(' · ');
      return `<p data-entry-id="${escape(e.id)}">${escape(forms)}<br>${link(entryPath(e.id),e.id)}</p>`;
    }).join('') : '';
  }).join('');
  return page(query+' · 汉语义项',`<p>${entries.length} 个词条。按本目录来源范围匹配汉语义项；具体用法见原始见证。</p>${rows}`,version);
}
function renderCorpus(record, data, version) {
  const fields = Object.fromEntries(Object.entries(record).filter(([k,v])=>!['id','title','text','source','audio'].includes(k) && v !== '' && v !== null && v !== undefined));
  const names={originalTranscription:'来源原记音',ipa:'规范化 IPA',annotation:'来源逐词注释',locations:'调查点',dialect:'方言',code:'来源编号',genre:'类型'};
  return page(record.title+' · '+record.id,`<p>Corpus ID: ${escape(record.id)}</p><pre>${escape(record.text || '')}</pre><pre>${escape(Object.entries(fields).map(([k,v])=>`${names[k] || k}: ${text(v)}`).join('\n'))}</pre>${renderSources([record.source],data)}`,version);
}
function buildReadableDictionary({root}) {
  const read = name => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
  const data = read('core'), sources = sourceMap(data);
  const version = fs.readFileSync(path.join(root,'index.html'),'utf8').match(/name="prepared-data-version" content="([^"]+)"/)?.[1];
  if (!version) throw Error('Build prepared website data first: missing version');
  const entries = [], groups = Object.fromEntries(Object.keys(GROUPS).map(key=>[key,{entries:new Set(),witnesses:0}]));
  for (const name of fs.readdirSync(path.join(root,'prepared/entries')).sort()) {
    if (!name.endsWith('.json.gz')) continue;
    const entry = selectEntry(read('entries/'+name.slice(0,-8)),data,sources);
    if (!entry.attestations.length) continue;
    if (!/^[A-Za-z0-9_-]+$/.test(entry.id)) throw Error('Invalid entry ID: '+entry.id);
    const seen = new Set();
    for (const a of entry.attestations) {
      if (!/^[A-Za-z0-9_-]+$/.test(a.id) || seen.has(a.id)) throw Error('Invalid or duplicate witness ID: '+a.id);
      seen.add(a.id); const group = groups[groupFor(a,data,sources)]; group.entries.add(entry.id);group.witnesses++;
    }
    entries.push(entry);
  }
  const queries = new Map();
  for (const e of entries) for (const q of unique(e.attestations.flatMap(a=>chineseKeys(a.zh)))) {
    if (!queries.has(q)) queries.set(q,[]);
    queries.get(q).push(e);
  }
  const originalSentences=new Map();
  const manifestPath=path.join(root,'yubao-manifest.json');
  if(fs.existsSync(manifestPath))for(const name of JSON.parse(fs.readFileSync(manifestPath,'utf8'))) {
    if(!/^yubao-(60757|60824)-\d+\.json$/.test(name))continue;
    const part=JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
    for(const [code,zh,raw] of part.sentences)originalSentences.set(`yubao-${part.point}-s-${code}`,raw);
  }
  const corpus = data.corpus.filter(c=>groupFor(c,data,sources)).map(c=>{
    if(c.survey && !originalSentences.has(c.id))throw Error('Missing original survey sentence: '+c.id);
    return {...c,...(originalSentences.has(c.id) ? {originalTranscription:originalSentences.get(c.id)} : {})};
  });
  // Remove stale generated routes when source selection or query spelling changes.
  fs.rmSync(path.join(root,'text'),{recursive:true,force:true});
  const report = {version,entries:entries.length,witnesses:0,queries:queries.size,corpus:corpus.length,groups:{},files:0,bytes:0,largest:{bytes:0}};
  function write(name,html) {
    const dest=path.join(root,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
    const bytes=Buffer.byteLength(html);report.files++;report.bytes+=bytes;
    if (bytes>report.largest.bytes) report.largest={path:name,bytes};
  }
  for (const e of entries) write(entryPath(e.id),renderEntry(e,data,version));
  const paths = new Set();
  for (const [q,matches] of queries) {
    const name=queryPath(q);if(paths.has(name))throw Error('Query path collision: '+q);paths.add(name);
    write(name,renderLookup(q,matches,data,version));
  }
  function directory(prefix,title,items) {
    const pages=[];
    for(let start=0;start<items.length;start+=PAGE_SIZE) {
      const part=items.slice(start,start+PAGE_SIZE),name=prefix+'/'+(start/PAGE_SIZE+1)+'.html';
      pages.push({name,label:`${start+1}–${start+part.length} · ${part[0].label} … ${part.at(-1).label}`});
      write(name,page(title+` · ${start+1}–${start+part.length}`,part.map(x=>`<p>${link(x.name,x.label)}</p>`).join(''),version));
    }
    write(prefix+'/index.html',page(title,pages.map(x=>`<p>${link(x.name,x.label)}</p>`).join(''),version));
  }
  directory('text/browse/zh','汉语义项目录',[...queries.keys()].sort(compare).map(q=>({name:queryPath(q),label:q})));
  for(const [key,group] of Object.entries(groups)) {
    report.groups[key]={entries:group.entries.size,witnesses:group.witnesses};report.witnesses+=group.witnesses;
    directory('text/source/'+key,GROUPS[key],entries.filter(e=>group.entries.has(e.id)).map(e=>({name:entryPath(e.id),label:e.id+' · '+unique(e.attestations.filter(a=>groupFor(a,data,sources)===key).map(a=>a.zh || a.en)).join('; ')})));
  }
  for(const c of corpus) {
    if(!/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(c.id))throw Error('Invalid corpus ID: '+c.id);
    write('text/corpus/'+c.id+'.html',renderCorpus(c,data,version));
  }
  directory('text/corpus','语保例句',corpus.map(c=>({name:'text/corpus/'+c.id+'.html',label:c.title+' · '+c.id})));
  write('text/index.html',page('土家语词典 · 文本目录',`<p>收录 Brassett 04、06 的词汇见证、龙山语保词汇和例句，以及标注为南部土家语的词汇见证和例句。每条见证保留原记音、义项、来源与已记录的调查点。</p><p>${report.entries} 个词条，${report.witnesses} 条见证，${report.queries} 个汉语义项，${report.corpus} 条例句。目录之外的资料可在交互词典查阅。</p><p>${link('text/browse/zh/index.html','汉语义项')}</p>${queries.has('吃') ? '<p>'+link(queryPath('吃'),'吃')+'</p>' : ''}${Object.entries(GROUPS).map(([key,label])=>`<p>${link('text/source/'+key+'/index.html',label)} · ${report.groups[key].witnesses} 条见证</p>`).join('')}<p>${link('text/corpus/index.html','语保例句')}</p><p><a href="/#words">交互词典</a>（需 JavaScript）</p>`,version));
  return report;
}
module.exports = {buildReadableDictionary,renderEntry,renderAttestation,selectEntry,groupFor,chineseKeys,queryPath,entryPath,renderLookup,renderCorpus};
if(require.main===module)console.log(JSON.stringify(buildReadableDictionary({root:path.resolve(process.argv[2] || path.join(__dirname,'../site'))}),null,2));
