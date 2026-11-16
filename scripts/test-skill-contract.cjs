'use strict';
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const zlib=require('node:zlib');
const {CONVERTERS,ROUTES,createContract,verifyContract}=require('./skill-contract.cjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'skill-contract-'));
try{
  const dictionary={words:[
    {id:'w1',attestations:[{id:'a1',source:'brassett-2006',term:'gaf',zh:'好',en:'good'},{id:'a2',source:'south-test',term:'gá',zh:'好',en:'good'}]},
    {id:'w2',attestations:[{id:'a3',source:'brassett-2006',term:'dox',zh:'去',en:'go'}]}
  ]};
  const metadata={sources:[{id:'brassett-2006'},{id:'south-test'}],sourceVariants:[]};
  function gzip(name,data){fs.writeFileSync(path.join(temp,name),zlib.gzipSync(JSON.stringify(data)));}
  gzip('dictionary.json.gz',dictionary);
  gzip('data.json.gz',metadata);
  for(const name of CONVERTERS)fs.writeFileSync(path.join(temp,name),'// pinned converter\n');
  const catalog={schema_version:1,data_version:'fixture',templates:{...ROUTES},sources:[
    {id:'brassett-2006',page:'https://tujia.biz/text/source/brassett-2006/index.html'}
  ]};
  fs.mkdirSync(path.join(temp,'text/source/brassett-2006'),{recursive:true});
  fs.writeFileSync(path.join(temp,'text/source/brassett-2006/index.html'),'<html>source</html>');
  fs.writeFileSync(path.join(temp,'text/catalog.json'),JSON.stringify(catalog));
  const contract=createContract(temp,catalog);
  assert.equal(contract.dictionary_entries,2);
  assert.equal(contract.dictionary_attestations,3);
  assert.equal(contract.source_sha256,sha(fs.readFileSync(path.join(temp,'dictionary.json.gz'))));
  assert.equal(contract.site_converter_sha256['notation-ui.js'],sha(fs.readFileSync(path.join(temp,'notation-ui.js'))));
  assert.notEqual(contract.entry_ids_sha256,contract.attestation_ids_sha256);
  fs.writeFileSync(path.join(temp,'text/contract.json'),JSON.stringify(contract));
  verifyContract(temp);
  // A mismatch in data, converter code, source identity or route must fail closed.
  gzip('dictionary.json.gz',{words:dictionary.words.slice(0,1)});
  assert.throws(()=>verifyContract(temp),/contract does not match/);
  gzip('dictionary.json.gz',dictionary);
  fs.appendFileSync(path.join(temp,'notation-ui.js'),'// incompatible converter\n');
  assert.throws(()=>verifyContract(temp),/contract does not match/);
  fs.writeFileSync(path.join(temp,'notation-ui.js'),'// pinned converter\n');
  const bad={...catalog,templates:{...catalog.templates,entry:'https://tujia.biz/entry/{entry_id}.html'}};
  assert.throws(()=>createContract(temp,bad),/URL templates changed/);
  assert.throws(()=>createContract(temp,{...catalog,schema_version:2}),/Unsupported text catalog/);
  gzip('dictionary.json.gz',{words:[...dictionary.words,{id:'w1',attestations:[]}]});
  assert.throws(()=>createContract(temp,catalog),/Duplicate entry IDs/);
  gzip('dictionary.json.gz',{words:[...dictionary.words,{id:'w3',attestations:[{id:'a1'}]}]});
  assert.throws(()=>createContract(temp,catalog),/Duplicate attestation IDs/);
  console.log('PASS: producer contract fixture, hashes, routes, duplicate IDs, and mutation detection');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
// Test the deployed-site build artifact if a prepared site root was supplied.
if(process.argv[2]){
  const real=verifyContract(path.resolve(process.argv[2]));
  console.log('PASS: published text/contract.json matches canonical inputs, '+real.dictionary_entries+' entries and '+real.dictionary_attestations+' attestations');
}
