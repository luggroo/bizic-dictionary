/* Notes and translations travel with the selected entry. */
'use strict';
function wordEntryNotesHTML(w){
 if(!w._entryNotes)return typeof editorialNotesHTML==='function'?editorialNotesHTML(w):'';
 const notes=w._entryNotes;if(!notes.length)return '';
 return `<section class="editorial-notes"><h3>编者注</h3>${notes.map(n=>`<p>${n.kind?`<strong>${E(n.kind)}</strong>　`:''}${E(n.text)}</p>${n.literalMeaning?`<p>字面义：${E(n.literalMeaning)}</p>`:''}${n.originalMeaning?`<p>来源释义：${E(n.originalMeaning)}</p>`:''}`).join('')}</section>`;
}
