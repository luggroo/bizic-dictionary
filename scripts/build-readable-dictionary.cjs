// Separate text-only reading routes built from the website's prepared data.
// Do not link or preload these routes from the ordinary interactive website.
// Keep source witnesses intact; entry-level display strings are not witness pairs.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');

const DETAIL_IDS = ['w684', 'stedt-rn-43584'];
const QUERY = '吃';
const TEXT_ROOT = 'text';
const QUERY_PATH = TEXT_ROOT + '/lookup/zh/' + QUERY + '.html';
const entryPath = id => TEXT_ROOT + '/entry/' + encodeURIComponent(id) + '.html';
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = value => (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);
const text = value => typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
const missing = '未记录 / Not recorded';
const normal = value => String(value ?? '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
const labels = {accent:'调号拼音 / Tone-marked spelling', ipa:'IPA', ye:'叶氏拼音 / Ye spelling', brassett:'Brassett 记音 / Brassett notation', poj:'白话字 / Southern romanization'};
const methods = {source:'来源原记音 / Source transcription', 'source-normalized':'来源形式规范化 / Normalized source form', derived:'推导形式 / Derived form', 'user-reviewed':'编辑校订 / Editorial review'};
// Only UI labels use this helper; source records are escaped without rewriting.
const bilingual = value => {
  const parts = String(value).split(/\s*\/ /);
  return parts.length === 2 ? `${escape(parts[0])} / <span lang="en">${escape(parts[1])}</span>` : escape(value);
};
const field = (name, value, lang = '') => {
  const absent = value === undefined || value === null || value === '';
  return `<dt>${bilingual(name)}</dt><dd${lang && !absent ? ` lang="${lang}"` : ''}>${absent ? bilingual(missing) : escape(text(value))}</dd>`;
};
function sourceLink(source) {
  if (!source?.url || !/^https?:\/\//i.test(source.url)) return '';
  return `<a class="source-link" href="${escape(source.url)}">${bilingual('来源原件 / Source document ↗')}</a>`;
}
const style = `
:root{color-scheme:light dark;--ink:#203b34;--muted:#5b6b63;--line:#d9e0d7;--paper:#f8f8f1;--surface:#fff;--accent:#1c6553;--focus:#bc7029;--note:#faf6eb;--note-edge:#b78b48}
@media(prefers-color-scheme:dark){:root{--ink:#e1ede5;--muted:#b5c6bc;--line:#4b6157;--paper:#15211c;--surface:#1e2d25;--accent:#9ddbc2;--focus:#edbb73;--note:#302c21;--note-edge:#d2ac6e}}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font:1rem/1.7 system-ui,sans-serif}
a{color:var(--accent);text-underline-offset:.18em;overflow-wrap:anywhere}
:focus-visible{outline:3px solid var(--focus);outline-offset:4px}
.skip-link{position:absolute;inset-block-start:1rem;inset-inline-start:1rem;max-inline-size:calc(100% - 2rem);padding:.75rem 1rem;background:var(--surface);border:1px solid var(--line);transform:translateY(calc(-100% - 2rem));z-index:1}
.skip-link:focus{transform:translateY(0)}
header,main,footer{max-inline-size:62.5rem;margin:auto;padding:1.5rem;overflow-wrap:anywhere}
header{border-block-end:1px solid var(--line);display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}
header a{font-weight:650}
header a,.toc a,.actions a,.source-link,.text-index a{display:inline-block;min-block-size:2.75rem;min-inline-size:2.75rem;padding-block:.5rem}
.eyebrow,.meta,dt{color:var(--muted);font-size:.875rem}
h1{font-size:clamp(1.875rem,1.4rem + 2vw,2.875rem);line-height:1.25;margin:.75rem 0;scroll-margin-block-start:1rem}
h2{font-size:1.5rem;margin:2rem 0 .875rem}h3{font-size:1.25rem;margin:0 0 .75rem}p{margin:.625rem 0}
.lede{max-inline-size:48rem}
.text-index{padding-inline-start:1.25rem}.text-index li{margin-block:.75rem}.text-index p{margin:0}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,24rem),1fr));gap:1rem}
.card,.witness{background:var(--surface);border:1px solid var(--line);border-radius:.75rem;padding:1.375rem;min-inline-size:0;overflow-wrap:anywhere}
.witness{margin:1.125rem 0;scroll-margin-block-start:1rem}
.form{font:1.625rem/1.5 'Gentium Plus','Charis SIL',Georgia,serif;overflow-wrap:anywhere}
.tag{font-size:.875rem;letter-spacing:.02em}.scope{margin:.5rem 0 1rem;color:var(--muted)}
dl{display:grid;grid-template-columns:minmax(7.8125rem,11.25rem) minmax(0,1fr);gap:.5rem 1.125rem;margin:1rem 0}
dt,dd{margin:0;overflow-wrap:anywhere}dd{white-space:pre-wrap}
.notations{padding:0;list-style:none}.notations li{border-block-start:1px solid var(--line);padding:.75rem 0}.notations .form{font-size:1.375rem}
.note{border-inline-start:3px solid var(--note-edge);padding:.625rem 1rem;background:var(--note);white-space:pre-wrap;overflow-wrap:anywhere}
.toc{display:flex;flex-wrap:wrap;gap:.375rem 1.125rem;padding-inline-start:1.25rem;font-size:.875rem}
.actions{display:flex;flex-wrap:wrap;gap:.625rem 1.25rem;margin-block-start:1.125rem}
footer{border-block-start:1px solid var(--line);font-size:.875rem;color:var(--muted)}
@media(max-width:45em){header,main,footer{padding:1.125rem}.card,.witness{padding:1.0625rem}dl{grid-template-columns:1fr;gap:.1875rem}dd{margin-block-end:.625rem}.form{font-size:1.5rem}}
@media(forced-colors:active){:focus-visible{outline-color:Highlight}}
`;
function page(title, body, version, checksum = '') {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="text-scale" content="scale"><meta name="color-scheme" content="light dark"><meta name="description" content="${escape(title)} · 土家语词义、记音与来源 / Tujia meanings, transcriptions and sources"><meta name="prepared-data-version" content="${escape(version)}"><title>${escape(title)} · 毕兹学堂 Bizic Academy</title><style>${style}</style></head>
<body><a class="skip-link" href="#main-heading">${bilingual('跳到正文 / Skip to content')}</a><header><a href="/">毕兹学堂 · <span lang="en">Bizic Academy</span></a><a href="/${TEXT_ROOT}/">${bilingual('文本索引 / Text index')}</a><a href="/${encodeURI(QUERY_PATH)}">${bilingual('查「吃」 / Look up “eat”')}</a></header><main>${body}</main><footer>${bilingual('资料版本 / Data version')}: ${escape(version)}${checksum ? `<br>${bilingual('词条数据 SHA-256 / Entry checksum')}: ${escape(checksum)}` : ''}<p>${bilingual('词义与记音保留各来源的范围及差异。 / Meanings and transcriptions retain their source-specific scope and differences.')}</p></footer></body></html>
`;
}
function renderAttestation(a, entry, data) {
  const sources = [...(data.sourceVariants || []), ...(data.sources || [])];
  const original = sources.find(s => s.id === a.source);
  const canonicalId = data.sourceAliases?.[a.source] || a.source;
  const canonical = sources.find(s => s.id === canonicalId) || original;
  const scope = list(a.locations || a.location).join('、');
  const sourceScope = list(canonical?.locations || canonical?.location).join('、');
  const forms = Object.entries(entry.notations || {}).flatMap(([scheme, values]) => values.filter(n => n.attestationIds?.includes(a.id)).map(n => ({scheme, ...n})));
  const notations = forms.map(n => `<li data-notation-scheme="${escape(n.scheme)}"><span class="meta">${labels[n.scheme] ? bilingual(labels[n.scheme]) : escape(n.scheme)}</span><div class="form">${escape(n.text)}</div><p class="meta">记音记录处理 / <span lang="en">Notation-record processing</span>: ${methods[n.method] ? bilingual(methods[n.method]) : n.method ? escape(n.method) : bilingual(missing)}${n.profile ? ' · ' + escape(n.profile) : ''}</p>${(n.sourceMethods?.length > 1 || n.sourceProfiles?.length > 1) ? '<p class="note">同形记音的合并记录包含多种处理依据；此元数据未逐条指定到见证。 / <span lang="en">This merged notation record has multiple processing origins; its metadata does not assign an origin to each witness.</span></p>' : ''}${n.ambiguous ? '<p class="note">对应关系有歧义 / <span lang="en">Ambiguous correspondence</span></p>' : ''}${n.ipaForms ? `<p>本记录关联 IPA / <span lang="en">IPA linked by this record</span>: ${escape(list(n.ipaForms).join(' · '))}</p>` : ''}${n.sourceMethods ? `<p class="meta">处理依据 / <span lang="en">Methods</span>: ${n.sourceMethods.map(m => methods[m] ? bilingual(methods[m]) : escape(m)).join(' · ')}</p>` : ''}${n.sourceProfiles ? `<p class="meta">记音配置 / <span lang="en">Profiles</span>: ${escape(n.sourceProfiles.join(' · '))}</p>` : ''}</li>`).join('');
  const annotations = ['notice','parserCorrection','toneReview'].filter(k => a[k]).map(k => `<p class="note">${escape(text(a[k]))}</p>`).join('');
  return `<article class="witness" id="att-${escape(a.id)}" data-attestation-id="${escape(a.id)}"><h3>见证 / <span lang="en">Attestation</span> <a href="#att-${escape(a.id)}">${escape(a.id)}</a></h3><div class="form original-form">${escape(a.term)}</div><dl>${field('见证编号 / Witness ID', a.id)}${field('词条编号 / Entry ID', entry.id)}${field('汉语义项 / Chinese sense', a.zh)}${field('英语义项 / English sense', a.en, 'en')}${field('原记音方案 / Original notation', a.scheme)}${field('词性（来源标签）/ Source POS', a.pos)}${field('方言（该见证）/ Witness dialect', a.dialect)}${field('调查点（该见证）/ Witness locality', scope)}${field('来源 / Source', canonical?.title || a.citation || canonicalId)}${field('来源编号 / Source ID', a.source)}${canonicalId !== a.source ? field('文献编号 / Canonical source ID', canonicalId) : ''}${field('文献定位 / Locator', a.locator)}${a.sourceRef ? field('原文定位 / Source reference', a.sourceRef) : ''}${a.citation ? field('原引文 / Citation', a.citation) : ''}${sourceScope ? field('文献调查范围 / Source-wide geography', sourceScope) : ''}${a.originalTerm !== undefined ? field('校订前记音 / Earlier transcription', a.originalTerm) : ''}${a.originalZh !== undefined ? field('来源汉语释义 / Original Chinese gloss', a.originalZh || '未提供 / Not supplied') : ''}${a.zhTranslation ? field('汉译依据 / Chinese gloss provenance', text(a.zhTranslation)) : ''}${a.originalEn !== undefined ? field('来源英语释义 / Original English gloss', a.originalEn || '未提供 / Not supplied', a.originalEn ? 'en' : '') : ''}${a.enTranslation ? field('英译依据 / English gloss provenance', text(a.enTranslation)) : ''}${a.alt ? field('其他原始形式 / Other recorded forms', a.alt) : ''}</dl>${sourceLink(original || canonical)}${annotations}<h4>本见证关联记音 / <span lang="en">Notations linked to this witness</span></h4>${notations ? `<ul class="notations" role="list">${notations}</ul>` : '<p>未提供关联记音；上方保留来源原记音。 / <span lang="en">No linked notation is supplied; the original transcription is retained above.</span></p>'}</article>`;
}
function renderEntry(entry, summary, data, version, checksum) {
  const display = list(summary?._display?.accent).map(n => n.text).join(' · ');
  const notes = list(entry._entryNotes || entry.editorialNotes).map(n => `<p class="note">${escape(typeof n === 'string' ? n : [n.kind,n.text,n.literalMeaning,n.originalMeaning].filter(Boolean).join('\n'))}</p>`).join('');
  const toc = entry.attestations.map(a => `<li><a href="#att-${escape(a.id)}">${escape(a.id)}</a></li>`).join('');
  return page(`${entry.zh || entry.en} · ${entry.id}`, `<div class="eyebrow">词条 / <span lang="en">Dictionary entry</span> · ${escape(entry.id)}</div><h1 id="main-heading" tabindex="-1">${escape(entry.zh || entry.en)}</h1><p lang="en">${escape(entry.en)}</p>${display ? `<p class="form">${escape(display)}</p><p class="meta">词条显示拼写 / <span lang="en">Entry display spelling</span></p>` : ''}<p class="lede">各来源见证如下；原记音、义项、地点与关联拼写分别列出。 / <span lang="en">Source witnesses below retain their own transcription, sense, locality and linked spellings.</span></p>${notes}<nav aria-label="见证目录 / Witness contents"><h2>${entry.attestations.length} 条见证 / <span lang="en">Source witnesses</span></h2><ul class="toc">${toc}</ul></nav>${entry.attestations.map(a => renderAttestation(a, entry, data)).join('')}<p class="actions"><a href="/${encodeURI(QUERY_PATH)}">返回「吃」的候选 / <span lang="en">Back to candidates</span></a><a href="/?id=${encodeURIComponent(entry.id)}#words">交互词条（需 JavaScript）/ <span lang="en">Interactive entry (JavaScript)</span></a></p>`, version, checksum);
}
function renderLookup(candidates, data, version) {
  const groups = ['北部','南部','未标明'];
  const groupOf = w => w.dialect?.includes('北') && !w.dialect.includes('南') ? '北部' : w.dialect?.includes('南') && !w.dialect.includes('北') ? '南部' : '未标明';
  const cards = groups.map(group => {
    const words = candidates.filter(w => groupOf(w) === group);
    if (!words.length) return '';
    return `<section><h2>${group} / <span lang="en">${{北部:'Northern',南部:'Southern',未标明:'Unspecified'}[group]}</span></h2><div class="cards">${words.map(w => {
      const display = list(w._display?.accent).map(n => n.text).join(' · ');
      const location = list(w.locations || w.location).join('、');
      const sourceNames = list(w.sourceIds || w.source).map(id => data.sources.find(s => s.id === id)?.title || id).join(' · ');
      const link = DETAIL_IDS.includes(w.id) ? `<a data-static-entry aria-label="${escape(w.id)}：完整见证 / Full source witnesses" href="/${entryPath(w.id)}">完整见证 / <span lang="en">Full source witnesses →</span></a>` : `<a aria-label="${escape(w.id)}：交互词条（需 JavaScript）/ Interactive entry (JavaScript)" href="/?id=${encodeURIComponent(w.id)}#words">交互词条（需 JavaScript）/ <span lang="en">Interactive entry (JavaScript) →</span></a>`;
      return `<article class="card" data-entry-id="${escape(w.id)}"><div class="tag">${escape(w.id)}</div><h3>${escape(w.zh)}</h3><p lang="en">${escape(w.en)}</p>${display ? `<div class="form">${escape(display)}</div><p class="meta">词条显示拼写 / <span lang="en">Entry display spelling</span></p>` : ''}<p class="scope">词条地点 / <span lang="en">Entry locations</span>: ${escape(location || missing)}</p><p class="meta">${escape(sourceNames)}</p><div class="actions">${link}</div></article>`;
    }).join('')}</div></section>`;
  }).join('');
  return page('吃 · 汉语义项检索 / Chinese sense lookup', `<div class="eyebrow">汉语义项检索 / <span lang="en">Chinese sense lookup</span></div><h1 id="main-heading" tabindex="-1">吃 <span lang="en">/ eat</span></h1><p class="lede">${candidates.length} 个词条的汉语检索义项匹配「吃」。同一词条可能另有其他义项；具体用法请参照各来源见证。 / <span lang="en">${candidates.length} entries match the Chinese search sense “吃”. Entries may include other senses; consult individual source witnesses for usage.</span></p>${cards}`, version);
}
function renderIndex(summaries, version) {
  const entries = DETAIL_IDS.map(id => {
    const entry = summaries.find(w => w.id === id);
    if (!entry) throw Error('Missing entry summary: '+id);
    return `<li><a href="/${entryPath(id)}">${escape(entry.zh || entry.en)} · ${escape(id)}</a><p class="meta">${escape(entry.dialect || missing)}</p></li>`;
  }).join('');
  return page('词典文本索引 / Dictionary text index', `<div class="eyebrow">${bilingual('土家语词典 / Tujia dictionary')}</div><h1 id="main-heading" tabindex="-1">${bilingual('词典文本索引 / Dictionary text index')}</h1><p class="lede">${bilingual('按汉语义项查阅词条，或直接打开来源见证。 / Browse by Chinese sense or open source witnesses directly.')}</p><section><h2>${bilingual('汉语义项 / Chinese senses')}</h2><ul class="text-index"><li><a href="/${encodeURI(QUERY_PATH)}">吃 / <span lang="en">eat</span></a></li></ul></section><section><h2>${bilingual('词条与来源 / Entries and sources')}</h2><ul class="text-index">${entries}</ul></section><p class="meta">${bilingual('此目录收录上方列出的检索页与词条。 / This directory covers the lookup and entry pages listed above.')}</p><p class="actions"><a href="/#words">${bilingual('打开完整交互词典（需 JavaScript）/ Open the full interactive dictionary (JavaScript)')}</a></p>`, version);
}
function buildReadableDictionary({root}) {
  const read = name => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
  const data = read('core');
  const summaries = read('words-index').words;
  const version = fs.readFileSync(path.join(root,'index.html'),'utf8').match(/name="prepared-data-version" content="([^"]+)"/)?.[1];
  if (!version) throw Error('Build prepared website data first: missing version');
  const candidates = summaries.filter(w => w._search?.chinese?.some(key => normal(key) === normal(QUERY)));
  if (!candidates.length) throw Error('No exact Chinese candidates for '+QUERY);
  const outputs = [[TEXT_ROOT+'/index.html',renderIndex(summaries,version)],[QUERY_PATH,renderLookup(candidates,data,version)]];
  for (const id of DETAIL_IDS) {
    const bytes = fs.readFileSync(path.join(root,'prepared/entries',id+'.json.gz'));
    const entry = JSON.parse(zlib.gunzipSync(bytes));
    if (entry.id !== id || !entry.attestations?.length) throw Error('Missing source witnesses: '+id);
    const ids = new Set(entry.attestations.map(a => a.id));
    if (ids.size !== entry.attestations.length) throw Error('Duplicate witness ID: '+id);
    for (const a of entry.attestations) if (!/^[A-Za-z0-9_-]+$/.test(a.id)) throw Error('Invalid witness ID: '+a.id);
    outputs.push([entryPath(id),renderEntry(entry,summaries.find(w=>w.id===id),data,version,crypto.createHash('sha256').update(bytes).digest('hex'))]);
  }
  for (const [name,html] of outputs) {const dest=path.join(root,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);}
  return outputs.map(([name,html])=>({path:name,bytes:Buffer.byteLength(html)}));
}
module.exports = {buildReadableDictionary,renderIndex,renderEntry,renderLookup,renderAttestation};
if (require.main === module) console.log(JSON.stringify(buildReadableDictionary({root:path.resolve(process.argv[2] || path.join(__dirname,'../site'))}),null,2));
