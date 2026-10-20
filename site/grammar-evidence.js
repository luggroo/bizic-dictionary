// Source-checked examples and relational-clause evidence. Source tones are retained.
(()=>{
 const north=DIALECT_GRAMMARS.north;
 const rename=(id,title)=>{for(const c of north){const s=c.sections.find(s=>s.id===id);if(s)s.title=title}};
 rename('12.1','基数与数量');rename('15.3','使役与受影响的参与者');
 // Editorial collation notes belong in the working record, not a grammar chapter.
 north.find(c=>c.id==='28').sections=north.find(c=>c.id==='28').sections.filter(s=>s.id!=='28.3');
 BRASSETT_GRAMMAR['1.1'].examples[0].ipa='/ka²⁴/';BRASSETT_GRAMMAR['1.1'].examples[0].text='ga²';
 const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const ex=(form,gloss,translation,ref)=>`<figure class="example"><div class="form">${esc(form)}</div><div class="gloss">${esc(gloss)}</div><figcaption>${esc(translation)}</figcaption><p class="source">${esc(ref)}</p></figure>`;
 const posterRef=n=>`Liu（2025），WCCFL 43 海报，例（${n}）。`;
 const posterTitle='Kang Franco Liu. 2025. Transitive subject extraction restriction in Northern Tujia and beyond. WCCFL 43, University of Washington, Seattle, 26 April 2025.';
 const addSection=(id,title,body)=>{const cid=id.split('.')[0],ch=north.find(c=>c.id===cid);if(!ch.sections.some(s=>s.id===id))ch.sections.push({id,key:'north-'+id,title,query:title});else ch.sections.find(s=>s.id===id).title=title;BRASSETT_GRAMMAR[id]={integratedHtml:body,paragraphs:[],pages:[],examples:[]}};
 addSection('25.3','中心语外置与内置',
 '<p>关系从句可以把所指的名词放在从句外，也可以把它保留在从句内原有的位置。下面两句都表示“我要吃金花不能吃的东西”：外置式的“东西”在关系从句之后，内置式的“东西”在“吃”之前，仍占宾语位置。方括号划出关系从句。</p>'+
 ex('/ŋa²⁴ [tɕĩ⁴⁴ xʊa⁴⁴ ka²⁴ tʰi⁴⁴ ɕi⁴⁴] ie²¹ ka²⁴=i⁴⁴/','我｜［金花｜吃｜不能｜名物化］｜东西｜吃＝将要','我要吃金花不能吃的东西。（中心语外置）',posterRef(2))+
 ex('/ŋa²⁴ [tɕĩ⁴⁴ xʊa⁴⁴ ie²¹ ka²⁴ tʰi⁴⁴ ɕi⁴⁴] ka²⁴=i⁴⁴/','我｜［金花｜东西｜吃｜不能｜名物化］｜吃＝将要','我要吃金花不能吃的东西。（中心语内置）',posterRef(2))+
 '<p>这组材料的名物化标记写作 /ɕi⁴⁴/；下节的例句另有 /ɕi²⁴/。</p><details class="grammar-reference"><summary>文献出处</summary><p>'+posterTitle+'</p></details>');
 addSection('25.201','内置式对及物主语的限制',
 '<p>在 Liu 的材料中，内置式可以指称从句的宾语或不及物动词的主语，但不能直接指称及物动词的主语。下例中，“孩子”是“吃”的主语，“食物”是宾语。把“孩子”放到从句外，句子成立；把它留在从句内，句子不成立。星号标示原文判为不合语法的形式。</p>'+
 ex('/tɕĩ⁴⁴ xʊa⁴⁴ [sa⁴⁴ mi⁴⁴ ka²⁴ ɕi⁴⁴] pai⁴⁴ lʊo²¹ liaʊ²¹/','金花｜［食物｜吃｜名物化］｜孩子｜骂｜完成','金花骂了吃那种食物的孩子。',posterRef(1))+
 ex('*/tɕĩ⁴⁴ xʊa⁴⁴ [pai⁴⁴ sa⁴⁴ mi⁴⁴ ka²⁴ ɕi⁴⁴] lʊo²¹ liaʊ²¹/','金花｜［孩子｜食物｜吃｜名物化］｜骂｜完成','意图表达同一意思，但内置的“孩子”是及物主语，原文判为不合语法。',posterRef(1))+
 '<p class="source">/sa⁴⁴ mi⁴⁴/ 在海报中释为 tuansa（一种食物），此处泛译“那种食物”。</p>');
 addSection('25.202','关系从句中的进行标记',
 '<p>两种结构还存在句末成分的差别。在下列外置式中，关系从句可带 /la²¹/；相应的内置式不能带这个标记。括号表示可省略，括号内的星号表示加入该成分后不合语法。</p>'+
 ex('/tɕĩ⁴⁴ xʊa⁴⁴ [ŋa²⁴ i²¹ (la²¹) ɕi²⁴] nie²⁴ pi⁴⁴ a⁴⁴ liaʊ⁴⁴/','金花｜［我｜看｜（未完成）｜名物化］｜鸟｜喂｜完成','金花喂了我经常看到的鸟。（外置式）',posterRef('3a'))+
 ex('/tɕĩ⁴⁴ xʊa⁴⁴ [ŋa²⁴ nie²⁴ pi⁴⁴ i²¹ (*la²¹) ɕi²⁴] a⁴⁴ liaʊ⁴⁴/','金花｜［我｜鸟｜看｜（*未完成）｜名物化］｜喂｜完成','金花喂了我经常看到的鸟。（内置式；不能加入 /la²¹/）',posterRef('3b')));
 addSection('25.203','嵌套小句中的主语',
 '<p>及物主语的限制与从句结构有关。如果“孩子”位于“记得”所带的嵌套小句中，内置式就可以成立：</p>'+
 ex('/tɕĩ⁴⁴ xʊa⁴⁴ [ŋa²⁴ tie²⁴ [pai⁴⁴ tɕʰie²¹ pi²⁴ ta²⁴ liaʊ⁴⁴] ɕi⁴⁴] lʊo²¹ liaʊ²¹/','金花｜［我｜记得｜［孩子｜碗｜打破｜完成］｜名物化］｜骂｜完成','金花骂了我记得打破碗的那个孩子。',posterRef(7))+
 '<details><summary>结构分析</summary><p>Liu 将内置式分析为较小的从句结构（TP），外置式则为较大的结构（CP），并用句法移动距离的限制解释上述差异。这是该研究提出的理论分析；观察到的限制本身不意味着土家语具有作格配列。</p><p>'+posterTitle+'</p></details>');
 // The summary of the regional chapter now illustrates an actual structural contrast.
 BRASSETT_GRAMMAR['28.1']={integratedHtml:'<p>北部和南部的给予结构都可以把接受者放在物品前，但标记方式不尽相同。下面的龙山例在接受者后使用 /po⁵⁵/；泸溪且己例没有对应的标记。</p>'+
 ex('/pʰa²¹ pʰu³⁵ ŋa³⁵ po⁵⁵ tɕʰi³⁵ pu⁵⁵ ka⁵⁵ si⁵⁵ le³⁵ le⁵⁵/','爷爷｜我｜间接宾语｜黄豆｜几｜升｜给｜语助','爷爷给我几升黄豆。（龙山靛房）','向亮（2019），第77页，例（31）。')+
 ex('/ŋo³¹ ɲi³¹ doŋ²¹ dzian²¹ ʕɯ¹³/','我｜你｜铜钱｜还','我还你钱。（泸溪且己）','向亮（2019），第76页，例（27）。'),paragraphs:[],pages:[],examples:[]};
 const southExamples={
  '7.1':{text:'南部部分职业称谓以“人”为中心，前面的动宾结构说明职业活动。例如“石头＋打＋人”表示石匠，“衣服＋缝＋人”表示裁缝。',examples:[['/lɯ⁵¹ bu⁵¹ ɲia⁵⁵/','石头｜打｜人','石匠。','向亮（2011），第40页。'],['/ɕi³³ ti²¹ lo¹³ ɲia⁵⁵/','衣服｜缝｜人','裁缝。','向亮（2011），第40页。']]},
  '15.2':{text:'双宾句可以按“主语—接受者—物品—动词”排列。泸溪且己下例的“你”在“铜钱”前，两个宾语都没有额外的关系标记。',examples:[['/ŋo³¹ ɲi³¹ doŋ²¹ dzian²¹ ʕɯ¹³/','我｜你｜铜钱｜还','我还你钱。（泸溪且己）','向亮（2019），第76页，例（27）。']]},
  '18.1':{text:'南部判断句可使用判断动词。否定判断时，否定成分放在判断动词前；下例的 /mɛ²¹ su⁵³/表示“不是”。',examples:[['/dzia²¹ bu²¹ mɛ²¹ su⁵³ ŋo¹³ gu²¹/','这｜个｜不｜是｜我｜的','这个不是我的。（泸溪且己）','向亮（2019），第73–74页，例（12）。']]},
  '19.2':{text:'物品可以移到句首作话题，主语和接受者留在后面。下例先提出“这杆笔”，再说明“我送给你”。',examples:[['/dzia²¹ kan³¹ bi²¹ ŋo³¹ ɲi³¹ lie⁵³/','这｜杆｜笔｜我｜你｜送','这杆笔我送你。（泸溪且己）','向亮（2019），第76页，例（28）。']]},
  '21.2':{text:'判断否定采用“否定成分＋判断动词”。下例中，/mɛ²¹/放在 /su⁵³/前，否定“这是我的”这一判断。',examples:[['/dzia²¹ bu²¹ mɛ²¹ su⁵³ ŋo¹³ gu²¹/','这｜个｜不｜是｜我｜的','这个不是我的。（泸溪且己）','向亮（2019），第73–74页，例（12）。']]},
  '28.1':{text:'南部土家语内部也有地域差异。例如下都和下且己的“蛇”在声调和元音上都不相同。',examples:[['/tɨ³³ pʰie³⁵/；/ti⁵⁵ pʰei⁵⁵/','下都；下且己','蛇。','Zhou（2020），第31页。']]},
  '28.2':{text:'南部土家语吸收了汉语词汇，如表示“白菜”的 /bɯɛ²¹ tsʰɛ³⁵/。',examples:[['/bɯɛ²¹ tsʰɛ³⁵/','借词','白菜。','向亮（2011），第41页。']]}
 };
 for(const [id,entry] of Object.entries(southExamples)){const old=SOUTH_GRAMMAR[id];old.integratedHtml='<p>'+entry.text+'</p>'+entry.examples.map(x=>ex(...x)).join('')+'<details class="grammar-reference"><summary>文献出处</summary><button data-open="'+old.source+'">查看原文</button></details>';}
 // Sound-system introductions use attested words, rather than invented sentences.
 for(const id of ['1.1','1.2']){const b=SOUTH_GRAMMAR[id];b.tables.push({title:'词例',headers:['形式','意义','出处'],rows:[['/tɨ³³pʰie³⁵/','蛇（下都）','Zhou 2020，第31页'],['/ti⁵⁵pʰei⁵⁵/','蛇（下且己）','Zhou 2020，第31页']]});}
 // Do not repeat the geographical source note as an example-free supplementary entry.
 SOUTH_GRAMMAR['1.3'].supplements=[];
})();
(()=>{
 const b=BRASSETT_GRAMMAR['20.2'];b.pages.push(205);
 b.tables[0].rows.push(['la¹xi³','什么（词表另列）'],['lei⁴qie³','怎么'],['qing³lie²','怎么'],['qing³mo¹nie³','为什么；怎么']);
 b.notes=(b.notes||[]).concat('疑问词表据第48页表4.8与第205页§7.4；例句见第84–88页。');
 const s=SOUTH_GRAMMAR;
 s['2.2'].tables.push({title:'韵母词例',headers:['形式','意义','出处'],rows:[['/tɨ³³pʰie³⁵/','蛇（下都）','Zhou 2020，第31页'],['/ti⁵⁵pʰei⁵⁵/','蛇（下且己）','Zhou 2020，第31页']]});
 s['4.1'].tables.push({title:'词中的调值',headers:['形式','意义','出处'],rows:[['/mi²¹mi²¹/','血（下都）','Zhou 2020，表5-4'],['/ʔa¹³lie⁵⁵/','蛋（下都）','Zhou 2020，表5-7']]});
 s['28.2'].integratedHtml=s['28.2'].integratedHtml.replace('tshɛ','tsʰɛ');
})();
