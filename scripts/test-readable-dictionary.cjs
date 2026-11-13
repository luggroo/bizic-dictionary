// Verify full exported coverage and actual no-JavaScript navigation separately.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const {chromium} = require('playwright');
const {renderEntry,selectEntry,groupFor,queryPath,initialPath,buildReadableDictionary} = require('./build-readable-dictionary.cjs');
const root = path.resolve(process.argv[2] || path.join(__dirname,'../site'));
const read = name => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(root,'prepared',name+'.json.gz'))));
const data = read('core');
const sources = new Map([...(data.sourceVariants || []),...data.sources].map(s=>[s.id,s]));
const version = fs.readFileSync(path.join(root,'index.html'),'utf8').match(/name="prepared-data-version" content="([^"]+)"/)[1];
const decode = html => html.replace(/&(#39|quot|gt|lt|amp);/g,(_,entity)=>({'#39':"'",quot:'"',gt:'>',lt:'<',amp:'&'}[entity]));
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sort = values => [...values].sort();
const keys = value => String(value || '').split(/[;；/／]/).map(x=>x.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim()).filter(Boolean);
function included(a) {
  const canonical=data.sourceAliases?.[a.source] || a.source;
  return ['brassett-2004','brassett-2006','yubao-60757'].includes(canonical) || a.dialect==='南部' ||
    ((!a.dialect || a.dialect==='未标明') && sources.get(canonical)?.dialect==='南部');
}
const entries = new Map(), queries = new Map();
let witnesses = 0;
for(const name of fs.readdirSync(path.join(root,'prepared/entries'))) {
  const original=read('entries/'+name.slice(0,-8)), selected=original.attestations.filter(included);
  if(!selected.length)continue;
  entries.set(original.id,{...original,attestations:selected});witnesses+=selected.length;
  for(const q of new Set(selected.flatMap(a=>keys(a.zh)))) {
    if(!queries.has(q))queries.set(q,new Set());queries.get(q).add(original.id);
  }
}
const corpus = data.corpus.filter(included);
function inspectAllFiles() {
  const files=fs.readdirSync(path.join(root,'text'),{recursive:true}).filter(name=>name.endsWith('.html'));
  const generatedEntries=files.filter(name=>name.startsWith('entry/')).map(name=>path.basename(name,'.html'));
  assert.deepEqual(sort(generatedEntries),sort(entries.keys()),'all and only in-scope entries are exported');
  let bytes=0,gzipBytes=0;const sizes={};
  for(const name of files) {
    const html=fs.readFileSync(path.join(root,'text',name),'utf8');
    sizes[name]=Buffer.byteLength(html);bytes+=sizes[name];gzipBytes+=zlib.gzipSync(html,{level:9}).length;
    assert(!/<(?:script|img|iframe|link)\b|<[^>]+\son[a-z]+\s*=|<[^>]+\b(?:src|action)=/i.test(html),name+': no active content or asset dependencies');
    assert(!/<[^>]+\b(?:hidden|style="display:\s*none")|<details\b/i.test(html),name+': evidence is visible');
    assert(html.includes(version),name+': version is present');
    for(const match of html.matchAll(/href="([^"]+)"/g)) {
      const url=decode(match[1]);
      assert(!/^\s*javascript:/i.test(url),name+': safe URL');
      if(!url.startsWith('/text/'))continue;
      const target=decodeURIComponent(new URL(url,'https://tujia.biz').pathname);
      const file=path.join(root,target.endsWith('/') ? target+'index.html' : target);
      assert(fs.existsSync(file),name+': local link exists '+target);
    }
  }
  for(const [id,e] of entries) {
    const html=fs.readFileSync(path.join(root,'text/entry',id+'.html'),'utf8');
    const blocks=new Map([...html.matchAll(/<section id="att-[^"]+" data-attestation-id="([^"]+)"><pre>([\s\S]*?)<\/pre><\/section>/g)].map(m=>[decode(m[1]),decode(m[2])]));
    assert.deepEqual(sort(blocks.keys()),sort(e.attestations.map(a=>a.id)),id+': exact witness coverage');
    for(const a of e.attestations) for(const [field,value] of Object.entries(a)) {
      if(value===undefined || value===null || value==='')continue;
      assert(blocks.get(a.id).includes(typeof value==='object' ? JSON.stringify(value) : String(value)),a.id+': retain '+field);
    }
    const ids=new Set(e.attestations.map(a=>a.id));
    const actual=[...html.matchAll(/<pre data-notation-scheme="([^"]+)">([\s\S]*?)<\/pre>/g)].map(m=>({scheme:decode(m[1]),text:decode(m[2])}));
    let count=0;
    for(const [scheme,notations] of Object.entries(e.notations || {})) for(const n of notations) {
      const selected=(n.attestationIds || []).filter(id=>ids.has(id));if(!selected.length)continue;count++;
      const rendered=actual.find(r=>r.scheme===scheme && r.text.split('\n')[0]===scheme+': '+n.text && r.text.includes('关联见证: '+selected.join(', ')));
      assert(rendered,id+': notation has exact witness links '+n.text);
      const {text:form,attestationIds,...metadata}=n;
      for(const [key,value] of Object.entries(metadata))assert(rendered.text.includes(JSON.stringify({[key]:value}).slice(1,-1)),id+': notation retains '+key);
    }
    assert.equal(actual.length,count,id+': no unlinked notation introduced');
  }
  for(const [q,expected] of queries) {
    const html=fs.readFileSync(path.join(root,queryPath(q)),'utf8');
    const actual=new Set([...html.matchAll(/data-entry-id="([^"]+)"/g)].map(m=>m[1]));
    assert.deepEqual(sort(actual),sort(expected),q+': all matching selected witnesses remain discoverable');
    const pairs=new Set([...html.matchAll(/data-entry-id="([^"]+)" data-source-id="([^"]+)"/g)].map(m=>m[1]+'|'+m[2]));
    const wanted=new Set([...expected].flatMap(id=>entries.get(id).attestations.filter(a=>keys(a.zh).includes(q)).map(a=>id+'|'+(data.sourceAliases?.[a.source] || a.source))));
    assert.deepEqual(sort(pairs),sort(wanted),q+': each query row belongs to the actual canonical source');
  }
  const expectedSources=new Map(),initials=new Map();
  for(const e of entries.values())for(const a of e.attestations){
    const id=data.sourceAliases?.[a.source] || a.source;
    if(!expectedSources.has(id))expectedSources.set(id,{entries:new Set(),witnesses:0,keys:new Set(),ids:new Set()});
    const s=expectedSources.get(id);s.entries.add(e.id);s.witnesses++;s.ids.add(a.source);keys(a.zh).forEach(q=>s.keys.add(q));
  }
  for(const q of queries.keys()){const first=Array.from(q)[0];if(!initials.has(first))initials.set(first,[]);initials.get(first).push(q);}
  const catalogBytes=fs.readFileSync(path.join(root,'text/catalog.json'));
  const catalog=JSON.parse(catalogBytes);assert.equal(catalog.data_version,version);
  assert.equal(catalog.all_entries,'https://tujia.biz/text/all.html');
  const allHtml=Object.values(catalog.dialect_indexes).map(item=>fs.readFileSync(path.join(root,decodeURIComponent(new URL(item.page).pathname)),'utf8')).join('\n');
  const tables=[...allHtml.matchAll(/<pre class="all-entries" data-dialect="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/g)].map(m=>({dialect:decode(m[1]),text:decode(m[2])}));
  assert(tables.some(t=>t.dialect==='北部') && tables.some(t=>t.dialect==='南部'),'North and South have independent complete tables');
  const foundIds=new Set(),cell=value=>String(value ?? '').replace(/\s+/g,' ').trim();
  for(const table of tables){
    const lines=table.text.split('\n');assert(lines.shift().includes('英语 English'),'complete index contains explicit English glosses');
    const actual=new Map(lines.map(line=>{const fields=line.split('\t|\t');assert.equal(fields.length,4);foundIds.add(fields[3]);return [fields[3],fields]}));
    const expected=new Map();
    for(const e of entries.values()){
      const witnesses=e.attestations.filter(a=>(['北部','南部'].includes(a.dialect) ? a.dialect : '其他或未标明')===table.dialect);
      if(!witnesses.length)continue;
      expected.set(e.id,[[...new Set(witnesses.map(a=>a.zh).filter(Boolean))].join('; '),[...new Set(witnesses.map(a=>a.en).filter(Boolean))].join('; '),[...new Set(witnesses.map(a=>a.term).filter(Boolean))].join(' · '),e.id].map(cell));
    }
    assert.deepEqual(sort(actual.keys()),sort(expected.keys()),table.dialect+': no other dialect enters the table');
    for(const [id,row] of expected)assert.deepEqual(actual.get(id),row,id+': all Chinese/English senses and forms survive in their own dialect section');
  }
  assert.deepEqual(sort(foundIds),sort(entries.keys()),'one page contains every published entry');
  for(const m of allHtml.matchAll(/<pre class="all-entries"[^>]*>([\s\S]*?)<\/pre>/g))assert(!/<a\b/.test(m[1]),'complete tables contain no per-entry links');
  assert.deepEqual(sort(catalog.sources.map(s=>s.id)),sort(expectedSources.keys()),'catalog covers every canonical source');
  for(const s of catalog.sources){
    const expected=expectedSources.get(s.id);
    assert.equal(s.entries,expected.entries.size);assert.equal(s.witnesses,expected.witnesses);assert.equal(s.query_keys,expected.keys.size);
    assert.deepEqual(s.original_source_ids,sort(expected.ids),'original source IDs remain distinct from canonical source IDs');
    const html=fs.readFileSync(path.join(root,decodeURIComponent(new URL(s.page).pathname)),'utf8');
    const actual=decode(html.match(/<pre class="sense-keys">([\s\S]*?)<\/pre>/)[1]).split('\n');
    assert.deepEqual(actual,sort(expected.keys),s.id+': one source page contains its entire Chinese-key index');
    assert(Buffer.byteLength(html)<32768,s.id+': source index stays below 32 KiB');
    for(const q of expected.keys){
      const query=fs.readFileSync(path.join(root,queryPath(q)),'utf8');
      assert(query.includes('id="'+s.query_anchor+'"'),s.id+': advertised query anchor exists');
    }
  }
  for(const [initial,qs] of initials){
    const url=catalog.templates.initial_zh.replace('{initial}',encodeURIComponent(initial));
    const file=path.join(root,decodeURIComponent(new URL(url).pathname));
    const html=fs.readFileSync(file,'utf8');
    const actual=[...html.matchAll(/href="(\/text\/lookup\/zh\/[^\"]+)"/g)].map(m=>decodeURIComponent(m[1]));
    assert.deepEqual(sort(actual),sort(qs.map(q=>'/'+queryPath(q))),initial+': prefix location is predictable and complete');
    assert(Buffer.byteLength(html)<32768,initial+': prefix page stays below 32 KiB');
  }
  for(const q of queries.keys()){
    const url=catalog.exceptional_queries[q] || catalog.templates.exact_zh.replace('{query}',encodeURIComponent(q));
    assert.equal(decodeURIComponent(new URL(url).pathname),'/'+queryPath(q),q+': catalog template or explicit exception locates the actual query');
  }
  bytes+=catalogBytes.length;gzipBytes+=zlib.gzipSync(catalogBytes,{level:9}).length;
  for(const c of corpus) {
    const html=fs.readFileSync(path.join(root,'text/corpus',c.id+'.html'),'utf8');
    for(const key of ['title','text','ipa','annotation','source'])if(c[key])assert(html.includes(escape(c[key])),c.id+': retain '+key);
  }
  for(const name of JSON.parse(fs.readFileSync(path.join(root,'yubao-manifest.json'),'utf8'))) {
    if(!/^yubao-(60757|60824)-\d+\.json$/.test(name))continue;
    const part=JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
    for(const [code,zh,raw] of part.sentences) {
      const id=`yubao-${part.point}-s-${code}`;
      const html=fs.readFileSync(path.join(root,'text/corpus',id+'.html'),'utf8');
      assert(html.includes(escape(raw)),id+': preserve raw survey transcription as well as normalized IPA');
    }
  }
  assert(bytes<60*1024*1024,'text deployment budget stays below 60 MiB');
  assert(sizes['index.html']<4096,'root directory stays small');
  assert(sizes['entry/w684.html']<60248/2,'Northern sample is less than half the previous HTML size');
  return {files:files.length+1,bytes,gzipEstimateBytes:gzipBytes,sources:expectedSources.size,initials:initials.size,rootBytes:sizes['index.html'],sampleBytes:Object.fromEntries(['lookup/zh/吃.html','entry/w684.html','entry/stedt-rn-43584.html'].map(k=>[k,sizes[k]])),largest:Object.entries(sizes).sort((a,b)=>b[1]-a[1])[0]};
}
function inspectFixtures() {
  const fixture={sources:[{id:'brassett-2004'},{id:'south',dialect:'南部'}],sourceAliases:{alias:'brassett-2004'}};
  assert.equal(groupFor({source:'alias'},fixture),'brassett');
  assert.equal(groupFor({source:'south',dialect:'北部'},fixture),null,'source label cannot override explicit witness dialect');
  assert.equal(groupFor({source:'foreign',dialect:'南部'},fixture),'southern');
  assert.equal(groupFor({source:'foreign'},fixture),null,'unknown data does not gain a dialect');
  const original={id:'x',dialect:'南部',attestations:[{id:'keep',source:'alias'},{id:'drop',source:'foreign'}],notations:{ipa:[{text:'shared',attestationIds:['keep','drop']},{text:'foreign',attestationIds:['drop']},{text:'headline',attestationIds:[]}]}};
  const chosen=selectEntry(original,fixture);
  assert.deepEqual(chosen.attestations.map(a=>a.id),['keep']);
  assert.deepEqual(chosen.notations.ipa,[{text:'shared',attestationIds:['keep']}]);
  assert.deepEqual(original.notations.ipa[0].attestationIds,['keep','drop'],'prepared evidence is not mutated');
  for(const q of ['../outside','a\\b','文'.repeat(200)])assert(!queryPath(q).slice('text/lookup/zh/'.length).includes('/'),'unsafe or oversized keys use a short safe path');
  // A tiny real build proves removed data cannot leave stale public routes.
  const temp=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'text-fixture-'));
  try {
    fs.mkdirSync(path.join(temp,'prepared/entries'),{recursive:true});fs.mkdirSync(path.join(temp,'text'));
    fs.writeFileSync(path.join(temp,'text/stale.html'),'old');
    fs.writeFileSync(path.join(temp,'index.html'),'<meta name="prepared-data-version" content="fixture">');
    fs.writeFileSync(path.join(temp,'prepared/core.json.gz'),zlib.gzipSync(JSON.stringify({...fixture,corpus:[]})));
    fs.writeFileSync(path.join(temp,'prepared/entries/x.json.gz'),zlib.gzipSync(JSON.stringify({...original,attestations:original.attestations.map(a=>({...a,zh:'1',term:'raw'}))})));
    fs.writeFileSync(path.join(temp,'prepared/entries/mixed.json.gz'),zlib.gzipSync(JSON.stringify({id:'mixed',attestations:[
      {id:'north-witness',source:'alias',dialect:'北部',term:'NORTH_FORM',zh:'北',en:'NORTHERN_ENGLISH'},
      {id:'south-witness',source:'foreign',dialect:'南部',term:'SOUTH_FORM',zh:'南',en:'SOUTHERN_ENGLISH'}
    ],notations:{}})));
    buildReadableDictionary({root:temp});
    assert(!fs.existsSync(path.join(temp,'text/stale.html')));
    assert(fs.readFileSync(path.join(temp,'text/lookup/zh/1.html'),'utf8').includes('data-entry-id="x"'),'numeric query does not collide with browse pagination');
    const complete=fs.readFileSync(path.join(temp,'text/all/north.html'),'utf8')+fs.readFileSync(path.join(temp,'text/all/south.html'),'utf8');
    const north=complete.match(/data-dialect="北部"[^>]*>([\s\S]*?)<\/pre>/)[1],south=complete.match(/data-dialect="南部"[^>]*>([\s\S]*?)<\/pre>/)[1];
    assert(north.includes('NORTH_FORM') && north.includes('NORTHERN_ENGLISH') && !north.includes('SOUTH_FORM') && !north.includes('SOUTHERN_ENGLISH'));
    assert(south.includes('SOUTH_FORM') && south.includes('SOUTHERN_ENGLISH') && !south.includes('NORTH_FORM') && !south.includes('NORTHERN_ENGLISH'),'even a shared entry is split by witness dialect in the complete index');
  } finally {fs.rmSync(temp,{recursive:true,force:true});}
}
const server=http.createServer((req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+pathname);
    if(!file.startsWith(root+path.sep))return res.writeHead(403).end();
    if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    res.setHeader('Content-Type',file.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8');res.end(fs.readFileSync(file));
  } catch {res.writeHead(404).end();}
});
async function inspectBrowser() {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const executablePath=process.env.CHROMIUM_EXECUTABLE || ['/usr/bin/google-chrome','/usr/bin/chromium'].find(fs.existsSync);
  const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--disable-dev-shm-usage']});
  const screenshots=process.env.READABLE_SCREENSHOT_DIR;
  if(screenshots)fs.mkdirSync(screenshots,{recursive:true});
  const report=[];
  try {
    for(const [label,viewport,colorScheme] of [['desktop',{width:1280,height:900},'light'],['mobile',{width:320,height:800},'light'],['dark',{width:320,height:800},'dark']]) {
      const context=await browser.newContext({javaScriptEnabled:false,viewport,colorScheme});
      try {
        const page=await context.newPage(), requests=[];
        page.setDefaultTimeout(10000);page.setDefaultNavigationTimeout(10000);
        page.on('request',r=>requests.push(r.resourceType()));
        await page.goto(base+'/text/');
        const body=await page.locator('main').innerText();
        assert(body.includes(String(witnesses)),'directory discloses actual coverage');
        // Seed only the root; recover destinations from visible text, not href.
        const urls=[...body.matchAll(/https:\/\/tujia\.biz\/[^\s<>]+/g)].map(m=>m[0]);
        const query=urls.find(url=>decodeURIComponent(new URL(url).pathname)==='/text/lookup/zh/吃.html');assert(query);
        if(screenshots)await page.screenshot({path:path.join(screenshots,label+'-index.png'),fullPage:true});
        await page.goto(base+new URL(query).pathname);
        const found=await page.locator('[data-entry-id]').evaluateAll(elements=>elements.map(e=>e.dataset.entryId));
        assert.deepEqual(sort(new Set(found)),sort(queries.get('吃')));
        if(screenshots)await page.screenshot({path:path.join(screenshots,label+'-lookup.png'),fullPage:true});
        for(const id of ['w684','stedt-rn-43584']) {
          await page.locator('a[href="/text/entry/'+id+'.html"]').first().click();
          const att=await page.locator('[data-attestation-id]').evaluateAll(elements=>elements.map(e=>({id:e.dataset.attestationId,text:e.textContent})));
          assert.deepEqual(sort(att.map(a=>a.id)),sort(entries.get(id).attestations.map(a=>a.id)));
          for(const a of entries.get(id).attestations)assert(att.find(x=>x.id===a.id).text.includes(a.term));
          await page.goBack();
        }
        // Follow the two directory levels to an entry and a sentence without JS.
        for(const route of ['/text/source/longshan/index.html','/text/source/brassett/index.html','/text/source/southern/index.html','/text/corpus/index.html','/text/browse/zh/index.html']) {
          await page.goto(base+route);await page.locator('main a').first().click();await page.locator('main a').first().click();
          assert.equal(await page.locator('h1').count(),1);
        }
        await page.goto(base+'/text/');
        await page.locator('main a[href="/text/all.html"]').click();
        for(const [name,dialect] of [['north','北部'],['south','南部']]){
          await page.locator('main a[href="/text/all/'+name+'.html"]').click();
          assert.equal(await page.locator('.all-entries').count(),1,'one complete dialect per page');
          assert.equal(await page.locator('.all-entries[data-dialect="'+dialect+'"]').count(),1);
          const complete=await page.locator('.all-entries').innerText();
          assert(complete.includes('eat'),'complete dialect index exposes English glosses without script execution');
          assert.equal(await page.locator('.all-entries a').count(),0);
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'complete table reflows on narrow screens');
          if(screenshots)await page.screenshot({path:path.join(screenshots,label+'-all-'+name+'.png')});
          await page.locator('main a[href="/text/all.html"]').click();
        }
        await page.goto(base+'/text/');
        await page.locator('main a[href="/text/source/index.html"]').click();
        await page.locator('main a[href="/text/source/brassett-2004/index.html"]').click();
        assert((await page.locator('.sense-keys').innerText()).split('\n').includes('吃'));
        await page.locator('main a[href*="/lookup/zh/"]').first().click();
        assert.equal(new URL(page.url()).hash,'#source-brassett-2004');
        assert(await page.locator('#source-brassett-2004 [data-entry-id="w684"]').count());
        await page.goto(base+encodeURI('/text/initial/zh/大.html'));
        await page.locator('main a').first().click();
        assert(await page.locator('[data-entry-id]').count(),'first-character route reaches an actual query without page-number guessing');
        for(const route of ['/text/','/text/lookup/zh/吃.html','/text/entry/w684.html','/text/corpus/yubao-60757-s-0001.html']) {
          await page.goto(base+encodeURI(route));
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+route+': reflows');
          await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),true);
          await page.keyboard.press('Enter');assert.equal(await page.locator('#main-heading').evaluate(e=>e===document.activeElement),true);
          await page.evaluate(()=>{const style=document.createElement('style');style.textContent='html{font-size:200%}*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}';document.head.appendChild(style);});
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,label+route+': enlarged text reflows');
        }
        assert.deepEqual(requests.filter(type=>type!=='document'),[],'only document requests');
        report.push({label,query:decodeURIComponent(new URL(query).pathname),candidates:new Set(found).size,sourceRows:found.length,documentOnly:true});
      } finally {await context.close();}
    }
    const context=await browser.newContext({javaScriptEnabled:false});
    try {
      const page=await context.newPage(),attack='<img src=x onerror="alert(1)"> & <script>alert(2)</script>';
      const fixture={id:'fixture',location:'ENTRY_PLACE',attestations:[{id:'a',term:attack,source:'bad',zh:attack}],notations:{ipa:[{text:attack,attestationIds:['a'],method:'source'}]}};
      await page.setContent(renderEntry(fixture,{sources:[{id:'bad',title:attack,location:'SOURCE_PLACE',url:'javascript:alert(3)'}]},version));
      assert.equal(await page.locator('script,img,svg').count(),0);assert((await page.locator('main').innerText()).includes(attack));
      const att=await page.locator('[data-attestation-id]').innerText();
      assert(att.includes('调查点: 未记录') && att.includes('方言: 未记录'));
      assert(!att.includes('ENTRY_PLACE') && !att.includes('SOURCE_PLACE'),'source/entry locality is not assigned to witnesses');
    } finally {await context.close();}
  } finally {await browser.close();}
  return report;
}
(async()=>{
  const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert(!/<(?:a|link|script|iframe|form|meta)\b[^>]*\b(?:href|src|action|content)=["'][^"']*(?:\/|^)text\//i.test(home),'ordinary homepage never exposes or preloads text routes');
  assert(/id="search-form"/.test(home),'ordinary homepage remains interactive');
  inspectFixtures();const size=inspectAllFiles(),browser=await inspectBrowser();
  console.log(JSON.stringify({result:'PASS',entries:entries.size,witnesses,queries:queries.size,corpus:corpus.length,size,browser,homepageSHA256:crypto.createHash('sha256').update(home).digest('hex')}));
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>server.close());
