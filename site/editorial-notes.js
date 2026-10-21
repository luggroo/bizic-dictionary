// Editorial analysis is separate from source glosses, annotations and IPA.
const EDITORIAL_NOTES=[{
 id:'death-euphemism-sleep',wordIds:['yubao-60757-v-0552'],
 kind:'婉称',
 text:'以“背盐去了”“睡着了”婉称死亡。/uo⁵⁵/ 的“背”义经用户确认；/lu²²/ 暂按完成离心标记分析。',
 literalMeaning:'/la²⁴pu⁵⁵ uo⁵⁵-lu²²/：盐＋背－完成离心，即“背盐去了”。/ȵie²⁴pie⁵⁵liau/：睡着了。末尾 liau 在原记录中未标声调。',
 originalMeaning:'死。原注：“婉称，最常用的几种，指老人：他～了”。',
 evidenceIds:['yubao-60757-v-0806','w1621','w1628','yubao-60757-v-0552']
}];
function editorialNotesFor(w){
 const ids=new Set([w.id,...(w.mergedWordIds||[]),...(w.attestations||[]).map(a=>a.id)]);
 return [...(w.editorialNotes||[]),...EDITORIAL_NOTES.filter(n=>n.wordIds.some(id=>ids.has(id)))].filter((n,i,a)=>a.findIndex(x=>x.id===n.id)===i);
}
function editorialNotesHTML(w){
 const notes=editorialNotesFor(w);if(!notes.length)return '';
 return `<section class="editorial-notes"><h3>编者注</h3>${notes.map(n=>`<p>${n.kind?`<strong>${E(n.kind)}</strong>　`:''}${E(n.text)}</p>${n.literalMeaning?`<p>字面义：${E(n.literalMeaning)}</p>`:''}${n.originalMeaning?`<p>来源释义：${E(n.originalMeaning)}</p>`:''}`).join('')}</section>`;
}
