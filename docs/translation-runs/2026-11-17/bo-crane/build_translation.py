import json,datetime,pathlib
out=pathlib.Path('/workspace/tibetan-rerun-result'); qs=json.loads((out/'queries.json').read_text()); source=(out/'source.txt').read_text().strip().splitlines()
def lex(id,gloss):
 r=next(r for q in qs for r in q['records'] if r['attestation_id']==id)
 return {'form':r['term'],'ipa':(r['notations'].get('ipa') or [None])[0],'gloss':gloss,'evidence_type':'dictionary_attestation','source':r}
def gram(form,ipa,gloss,ref,citation):
 return {'form':form,'ipa':ipa,'gloss':gloss,'evidence_type':'published_skill_grammar','source':{'reference':ref,'citation':citation},'ipa_status':'来源基记；新句连读未核'}
def inserted(form,meaning):return {'form':form,'ipa':None,'gloss':meaning,'evidence_type':'minimal_Chinese_insertion','source':None,'ipa_status':'不拟造读音'}
white=lex('stedt-rn-454844','白'); nie=gram('nie','ɲie','LNK','clause-patterns.md#nominalization','Feng 2025:4 ex.8; A+nie+N，拟译连接成分不标固定调'); crane=inserted('鹤','鹤')
nga=lex('stedt-rn-457139','我'); dat=gram('bǒ','pɔ²¹','DAT','clause-patterns.md#case-frames','B06:102 ex.75，R bǒ O V'); wing=lex('stedt-rn-453564','翅膀'); lend=lex('stedt-rn-456952','借'); imp=gram('gú','ku²⁴','DIR.IMM','directives.md#gu','B06:135–137 ex.190–193、200–201，请求开始活动')
far=lex('stedt-rn-456427','远'); place=lex('stedt-rn-454661','地方'); allative=gram('bō','pɔ⁵⁵','ALL','clause-patterns.md#case-frames','B06:100 ex.64，L bō 移动动词'); go=lex('stedt-rn-454319','走'); neg=gram('tā','tʰa⁵⁵','NEG','clause-patterns.md#negation','B06:132 ex.172，意愿／选择否定；在谓词后')
litang=inserted('理塘','理塘'); visit=lex('stedt-rn-458429','转游'); pfv=gram('liē','lie⁵⁵','PFV','event-linking.md#lie-topic-chain','B06:119 ex.76、154 ex.37，先行事件整体化；步骤可尚未执行'); ret=lex('stedt-rn-457777','回来')
units=[{'id':'1','source':source[0],'translation':'Ǎsǐ nie 鹤！','tokens':[white,nie,crane],'syntax':'呼语；短式性质词以 A nie N 修饰鹤。鸟这一上位类别由鹤包含。'}, {'id':'2','source':source[1],'translation':'Ngá bǒ jiédā lú gú.','tokens':[nga,dat,wing,lend,imp],'syntax':'听者为上句白鹤，省略听者主语和翅膀领有者；接受者+DAT+宾语+借+即时请求。'}, {'id':'3','source':source[2],'translation':'Ngá hxě nie kō bō hxí tā.','tokens':[nga,far,nie,place,allative,go,neg],'syntax':'我+远的地方+ALL+走+意愿否定；表明说话者不会选择远行。'}, {'id':'4','source':source[3],'translation':'理塘 bō zuān liē, sōngkō.','tokens':[litang,allative,visit,pfv,ret],'syntax':'同一主语延续省略；目标地点+ALL+转游+PFV，随后返回。按步骤构式拟译，未来行程由上下文建立。','relation':'转游在先，返回在后；属于一个显式先后构式。'}]
for u in units:
 u['source_language']='Tibetan';u['target_units']=[{'id':u['id'],'translation':u['translation'],'tokens':u.pop('tokens'),'relation':u.get('relation','single clause or vocative')}]
record={'source_text':'\n'.join(source),'language':'北部龙山土家语','notation':'调号拼音；新增汉语插入保留汉字','mode':'Skill-based static exact lookup; no embedding','skill_commit':'f341ec4cef24c68ea9527d6ddbe4dd6b4e068262','lexicon_revision':'5c148a2bfe860969375c16821f22bb25222ab7d8','units':units,'notes':['“鹤”“理塘”保留汉字；末句将环绕写作到理塘转游后返回。','译句依所引词项和能产构式组合；词典及语法提供来源基记，整句连读及母语者审校未执行。'],'coverage':{'bird and white crane':'鹤包含鸟类；白修饰鹤；呼语标点保留呼唤','lend me wings':'DAT 接受者及翅膀+借+即时请求；翼力取诗歌中翅膀意象','not go far':'远地方+目标标记+走+意愿否定','Litang around then come back':'到理塘转游后回来；转游采用 for visits 义，未另加确切一圈数量（原文无数词）'},'query_ledger':'queries.json','constraints_observed':['仅原文、固定发布技能及其本地发布静态词典分片','未读网站翻译例子、其他译文、其他 agent 结果或评测目录','未生成 PDF，未修改技能']}
(out/'translation.json').write_text(json.dumps(record,ensure_ascii=False,indent=2))
md='采用北部龙山土家语，调号拼音。\n\n'
for u in units:md+=u['source']+'\n\n'+u['translation']+'\n\n'
md+='“鹤”“理塘”保留汉字；末句将环绕写作到理塘转游后返回。译句依词典和语法构式组合，尚未经母语者审校。\n\n检索模式：Skill-based（本地静态词典精确查询，无 embedding）。\n'
(out/'translation.md').write_text(md)
print(md)
