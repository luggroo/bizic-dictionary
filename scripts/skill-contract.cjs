// Versioned, read-only contract for translation consumers; no frontend runtime dependency.
'use strict';
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
const zlib=require('node:zlib');

const CONVERTERS=[
  'ipa-normalize.js','notation-profiles.js','notation-ui.js',
  'southern-notation.js','yubao.js','grammar-notation.js',
  'lexical-reviews.js','spelling-boundaries.js'
];
const ROUTES=Object.freeze({
  exact_zh:'https://tujia.biz/text/lookup/zh/{query}.html',
  initial_zh:'https://tujia.biz/text/initial/zh/{initial}.html',
  entry:'https://tujia.biz/text/entry/{entry_id}.html'
});
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const fileSha=file=>sha(fs.readFileSync(file));
const idsSha=values=>sha([...values].sort().join('\n')+'\n');
const readGzip=file=>JSON.parse(zlib.gunzipSync(fs.readFileSync(file)));
function strictIds(values,label){
  const ids=values.map(value=>{assert.equal(typeof value,'string',label+' must be strings');assert(value.length,label+' must not be empty');return value;});
  assert.equal(new Set(ids).size,ids.length,'Duplicate '+label);
  return ids;
}
function createContract(root,catalog){
  assert.equal(catalog.schema_version,1,'Unsupported text catalog schema');
  assert.deepEqual(catalog.templates,ROUTES,'Skill lookup URL templates changed');
  assert.equal(typeof catalog.data_version,'string','Missing prepared data version');
  const dictionaryFile=path.join(root,'dictionary.json.gz');
  const metadataFile=path.join(root,'data.json.gz');
  const dictionary=readGzip(dictionaryFile),metadata=readGzip(metadataFile);
  assert(Array.isArray(dictionary.words),'Source dictionary words missing');
  assert(Array.isArray(metadata.sources),'Source metadata missing');
  const entryIds=strictIds(dictionary.words.map(w=>w.id),'entry IDs');
  const witnesses=dictionary.words.flatMap(w=>{
    assert(Array.isArray(w.attestations),'Missing attestations: '+w.id);
    return w.attestations;
  });
  const attestationIds=strictIds(witnesses.map(a=>a.id),'attestation IDs');
  const sourceIds=strictIds([...(metadata.sources||[]),...(metadata.sourceVariants||[])].map(s=>s.id),'source IDs');
  const sourcePairs=witnesses.map(a=>a.id+'\t'+(a.source||''));
  const converterHashes=Object.fromEntries(CONVERTERS.map(file=>[file,fileSha(path.join(root,file))]));
  return {
    schema_version:1,
    producer:'luggroo/bizic-dictionary',
    data_version:catalog.data_version,
    source_sha256:fileSha(dictionaryFile),
    metadata_source_sha256:fileSha(metadataFile),
    dictionary_entries:entryIds.length,
    dictionary_attestations:attestationIds.length,
    entry_ids_sha256:idsSha(entryIds),
    attestation_ids_sha256:idsSha(attestationIds),
    attestation_sources_sha256:idsSha(sourcePairs),
    source_ids_sha256:idsSha(sourceIds),
    site_converter_sha256:converterHashes,
    catalog_url:'https://tujia.biz/text/catalog.json',
    templates:{...ROUTES}
  };
}
function verifyContract(root){
  const catalog=JSON.parse(fs.readFileSync(path.join(root,'text/catalog.json'),'utf8'));
  const expected=createContract(root,catalog);
  const published=JSON.parse(fs.readFileSync(path.join(root,'text/contract.json'),'utf8'));
  assert.deepEqual(published,expected,'Published translation contract does not match source snapshot');
  for(const [type,template] of Object.entries(ROUTES)){
    assert.equal(published.templates[type],template);
  }
  for(const source of catalog.sources){
    const pathname=new URL(source.page).pathname;
    assert(pathname.startsWith('/text/source/'),'Unexpected source index path: '+pathname);
    assert(fs.existsSync(path.join(root,pathname.slice(1).replace(/\/$/,'/index.html'))),'Missing source index: '+pathname);
  }
  return expected;
}
module.exports={CONVERTERS,ROUTES,createContract,verifyContract,idsSha};
if(require.main===module){
  const root=path.resolve(process.argv[2]||'site');
  console.log(JSON.stringify(verifyContract(root),null,2));
}
