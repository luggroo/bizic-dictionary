// Sitemaps describe published HTML; they never cause the app to load dictionary data.
'use strict';
const fs=require('node:fs'),path=require('node:path');
const ORIGIN='https://tujia.biz',NS='http://www.sitemaps.org/schemas/sitemap/0.9';
const TABS=['words','grammar','notation','history','corpus','sources'];
const PRIMARY_PAGES=['index.html','translation.html','en/index.html','text/all/north.html','text/all/south.html',...TABS.flatMap(tab=>[tab+'.html','en/'+tab+'.html'])];
const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const decode=value=>value.replace(/&(?:amp|quot|apos|#39);/g,s=>({'&amp;':'&','&quot;':'"','&apos;':"'",'&#39;':"'"}[s]));
const address=file=>ORIGIN+(file==='index.html'?'/':file==='en/index.html'?'/en/':file==='text/index.html'?'/text/':'/'+file.split('/').map(encodeURIComponent).join('/'));
const header='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="'+NS+'">\n',footer='</urlset>\n';
function chunkUrls(urls,maxUrls=45000,maxBytes=45*1024*1024){
 const chunks=[];let rows=[],bytes=Buffer.byteLength(header+footer);
 for(const url of urls){
  const row='  <url><loc>'+escape(url)+'</loc></url>\n',size=Buffer.byteLength(row);
  if(size+Buffer.byteLength(header+footer)>maxBytes)throw Error('Sitemap URL exceeds size limit');
  if(rows.length&&(rows.length===maxUrls||bytes+size>maxBytes)){chunks.push(header+rows.join('')+footer);rows=[];bytes=Buffer.byteLength(header+footer);}
  rows.push(row);bytes+=size;
 }
 if(rows.length)chunks.push(header+rows.join('')+footer);
 return chunks;
}
function buildSitemaps(root){
 root=path.resolve(root);
 const files=[];
 function walk(directory){for(const item of fs.readdirSync(path.join(root,directory),{withFileTypes:true})){
  const file=path.posix.join(directory,item.name);
  if(item.isDirectory())walk(file);else if(item.isFile()&&file.endsWith('.html'))files.push(file);
 }}
 if(!fs.existsSync(path.join(root,'text/entry')))throw Error('Build the readable dictionary before sitemaps');
 walk('text');
 const groups={pages:PRIMARY_PAGES.filter(file=>!file.startsWith('text/')),entries:[],lookups:[],sources:[],corpus:[]};
 for(const file of files.sort()){
  if(/^text\/entry\/[^/]+\.html$/.test(file))groups.entries.push(file);
  else if(/^text\/lookup\/zh\/[^/]+\.html$/.test(file))groups.lookups.push(file);
  else if(/^text\/corpus\/(?!index\.html$|\d+\.html$)[^/]+\.html$/.test(file))groups.corpus.push(file);
  else if(/^text\/source\/[^/]+\/index\.html$/.test(file))groups.sources.push(file);
  else if(['text/index.html','text/all.html','text/source/index.html','text/corpus/index.html','text/browse/zh/index.html','text/browse/initial/index.html'].includes(file)||/^text\/all\/[^/]+\.html$/.test(file))groups.pages.push(file);
 }
 const maps=[],seen=new Set(),counts={};
 for(const [group,paths] of Object.entries(groups)){
  const urls=[];
  for(const file of paths){
   const html=fs.readFileSync(path.join(root,file),'utf8');
   const meta=html.match(/<meta\b[^>]*>/gi)||[];
   if(meta.some(tag=>/\bname=["'](?:robots|googlebot)["']/i.test(tag)&&/\bcontent=["'][^"']*\bnoindex\b/i.test(tag))||meta.some(tag=>/http-equiv=["']refresh["']/i.test(tag)))continue;
   const url=address(file);
   if(seen.has(url))throw Error('Duplicate sitemap URL: '+url);
   const canonical=html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
   if(canonical&&decode(canonical)!==url)throw Error('Canonical URL differs from sitemap: '+file);
   seen.add(url);urls.push(url);
  }
  counts[group]=urls.length;
  const chunks=chunkUrls(urls.sort());
  chunks.forEach((xml,i)=>maps.push({name:'sitemap-'+group+(chunks.length>1?'-'+(i+1):'')+'.xml',xml}));
 }
 // Delete only outputs owned by this generator, including shards removed by a shrink.
 for(const name of fs.readdirSync(root))if(/^sitemap-(?:pages|entries|lookups|sources|corpus)(?:-\d+)?\.xml$/.test(name))fs.unlinkSync(path.join(root,name));
 for(const map of maps)fs.writeFileSync(path.join(root,map.name),map.xml);
 const index='<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="'+NS+'">\n'+maps.map(map=>'  <sitemap><loc>'+ORIGIN+'/'+map.name+'</loc></sitemap>\n').join('')+'</sitemapindex>\n';
 fs.writeFileSync(path.join(root,'sitemap-index.xml'),index);
 const primaryUrls=PRIMARY_PAGES.map(address);
 for(const url of primaryUrls)if(!seen.has(url))throw Error('Primary sitemap page is not indexable: '+url);
 const [primary]=chunkUrls(primaryUrls);
 fs.writeFileSync(path.join(root,'sitemap.xml'),primary);
 return {primary:{file:'sitemap.xml',urls:primaryUrls.length,bytes:Buffer.byteLength(primary)},counts,urls:seen.size,sitemaps:maps.map(map=>({file:map.name,bytes:Buffer.byteLength(map.xml)})),indexFile:'sitemap-index.xml',indexBytes:Buffer.byteLength(index)};
}
module.exports={buildSitemaps,chunkUrls,address};
if(require.main===module)console.log(JSON.stringify(buildSitemaps(process.argv[2]||path.join(__dirname,'../site')),null,2));
