// Catch recurring commissioning-language leaks, including publish-time annotations.
// Original literature and recorded speech are deliberately outside this check.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const assert = require('node:assert/strict');
const root = path.resolve(process.argv[2] || path.join(__dirname, '../site'));
const forbidden = /使用者(?:核定|核对)|经用户确认|用户(?:审核|核定|确认|要求|明确核定)|依据用户判断|据用户补充|结合用户补充|优先请你审核|交回整合|本次编辑补译|分享的 Gemini 对话|对话中的模型分类|不冒充作者|exported for integration/i;
const failures = [];
function check(text, location) {
  const match = String(text).match(forbidden);
  if (match) failures.push(`${location}: ${match[0]}`);
}
for (const name of fs.readdirSync(root)) {
  if (name.endsWith('.js')) check(fs.readFileSync(path.join(root, name), 'utf8'), name);
}
for (const name of ['guides/verbs.html', 'brassett/grammar.json', 'gloss-reviews.json']) {
  check(fs.readFileSync(path.join(root, name), 'utf8'), name);
}
function metadata(value, location) {
  if (Array.isArray(value)) value.forEach((item, i) => metadata(item, `${location}[${i}]`));
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      // These fields contain original literature or recorded speech.
      if (key !== 'text' && key !== 'fullText') metadata(item, `${location}.${key}`);
    }
  } else if (typeof value === 'string') check(value, location);
}
for (const base of ['data.json', 'dictionary.json']) {
  metadata(JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root, base + '.gz')))), base + '.gz');
  if (fs.existsSync(path.join(root, base))) metadata(JSON.parse(fs.readFileSync(path.join(root, base), 'utf8')), base);
}
assert.equal(failures.length, 0, failures.join('\n'));
console.log('PASS: no known commissioning-language leaks in authored copy or published metadata');
