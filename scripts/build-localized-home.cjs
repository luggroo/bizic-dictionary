// Publish the English home from the same HTML, labels and assets as the Chinese home.
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const decode=value=>value.replace(/&(?:amp|lt|gt|quot|#39);/g,s=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[s]));
function buildLocalizedHome(root){
 root=path.resolve(root);
 const context=vm.createContext({});
 for(const file of ['ui-core-translations.js','ui-translations.js','content-translations.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
 const labels=vm.runInContext('UI_TRANSLATIONS',context);
 function translate(value){
  const text=value.trim();
  if(labels[text])return value.replace(text,labels[text]);
  const read=text.match(/^阅读：(.+)$/);
  if(read)return 'Read: '+(labels[read[1]]||read[1]);
  const arrow=text.match(/^(.+?)(\s*[→↗])$/);
  return arrow&&labels[arrow[1]]?labels[arrow[1]]+arrow[2]:value;
 }
 let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 // The source is our authored HTML. Raw script/style payloads are kept byte-for-byte;
 // only interface text is translated, never bootstrap records or Tujia labels.
 const tokens=html.match(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>|[^<]+/gi);
 const stack=[],voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
 let body=false;
 html=tokens.map(token=>{
  if(/^<(?:script|style)\b|^<!--|^<!/i.test(token))return token;
  const close=token.match(/^<\/([\w-]+)/);
  if(close){const at=stack.map(s=>s.tag).lastIndexOf(close[1]);if(at>=0)stack.splice(at);if(close[1]==='body')body=false;return token;}
  const open=token.match(/^<([\w-]+)/);
  if(open){
   const tag=open[1];if(tag==='body')body=true;
   const protectedText=stack.some(s=>s.protectedText)||/\bdata-ui-(?:tujia|content|language-link)\b/.test(token)||['option','textarea','code','pre'].includes(tag);
   if(!voids.has(tag)&&!token.endsWith('/>'))stack.push({tag,protectedText});
   if(body&&!protectedText)token=token.replace(/\b(aria-label|title|placeholder|alt)="([^"]*)"/g,(all,attr,value)=>{
    const source=decode(value),output=translate(source);
    return output===source?all:attr+'="'+escape(output)+'" data-ui-source-'+attr+'="'+escape(source)+'"';
   });
   if(tag==='meta')token=token.replace(/\bcontent="([^"]*)"/,(_,value)=>'content="'+escape(translate(decode(value)))+'"');
   return token;
  }
  if(stack.some(s=>s.protectedText))return token;
  const source=decode(token),output=translate(source);
  if(output===source)return token;
  return body?'<span data-ui-source="'+escape(source)+'">'+escape(output)+'</span>':escape(output);
 }).join('');
 html=html.replace('<html lang="zh-CN"','<html lang="en"').replace('data-home-language="zh"','data-home-language="en"')
  .replace(/href="#(home|words|sources|corpus)"/g,'href="/en/#$1"')
  .replace('<option value="en">','<option value="en" selected>')
  .replace('rel="canonical" href="https://tujia.biz/"','rel="canonical" href="https://tujia.biz/en/"')
  .replace('property="og:url" content="https://tujia.biz/"','property="og:url" content="https://tujia.biz/en/"')
  .replace('property="og:locale" content="zh_CN"','property="og:locale" content="en_US"');
 const directory=path.join(root,'en');fs.mkdirSync(directory,{recursive:true});
 fs.writeFileSync(path.join(directory,'index.html'),html);
 console.log('English home:',Buffer.byteLength(html),'bytes; shared scripts, styles and datasets.');
}
module.exports={buildLocalizedHome};
if(require.main===module)buildLocalizedHome(process.argv[2]||path.join(__dirname,'../site'));
