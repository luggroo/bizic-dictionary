// Editorial analysis is separate from source glosses, annotations and IPA.
const EDITORIAL_NOTES=[{
 id:'death-euphemism-sleep',wordIds:['yubao-60757-v-0552'],
 kind:'婉称',
 text:'用于婉称老年人去世，字面为“背盐去了”或“睡着了”。',
 literalMeaning:'/la²⁴pu⁵⁵/ 意为“盐”，/uo⁵⁵/ 意为“背”；/lu²²/ 可能表示动作完成并离去。/ȵie²⁴pie⁵⁵liau/ 意为“睡着了”，末尾 liau 在原记录中未标声调。',
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
