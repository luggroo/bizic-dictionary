# 离线资料与拼音规则更新

毕兹学堂从签名 APK 读取学习资料和键盘词表。维护者可以在两份本地 Git 仓库中更新来源、重建资料、对照新旧拼写，再发布应用。手机无需联网。发布清单放在构建报告中，记录一份学习 ZIP、两份键盘 TSV 和它们的来源。个人词库、使用次数、笔记和设置不在这些输入或输出路径内。

## 每个版本号回答什么问题

| 字段或输入 | 用途 |
| --- | --- |
| `dictionaryRevision` | ZIP 内 `offline-manifest.json` 声明的词典 Git 提交。核验相关工作树文件与提交对象的字节，排除暂存及未跟踪的发布输入。 |
| `contentVersion` | 网站准备程序对词条、语料及索引计算的 16 位十六进制摘要。两种语言首页版本、搜索 ID、完整词条、别名、文献和语料计数均须相符。首页样式可以单独改版。 |
| `spellingRulesVersion` | 带路径的 SHA-256，分别列出 `spellingEvidence` 中的映射/校勘资料和 `spellingPrograms` 中的转换程序。其他网站构建代码、键盘导入程序、C++ 输入核心各有分组摘要。运行时程序和表格的归属可以分别比较。 |
| `witnesses` | 分别对每条词的完整来源见证数组和记音记录计算摘要，再按词条 ID 汇总。地点、页码、原文、异写、调值、审订说明、推导方法及新增字段均参与散列。|
| `keyboardInputRevision`、`jointInputVersion` | 键盘仓库的输入提交，以及学习 ZIP、带表头 `words.tsv`、无表头 `northern-words.tsv` 三者的联合 SHA-256。两表同用 15 列顺序，`id` 标识候选，`word`、`diacritic` 分别保留叶氏和调符拼写。长按资料索引由这三份输入在构建时生成。 |
| `sharedSpellingAudit` | 只比较 `tujia`、`phonetic` 行中 ID 与 ZIP 搜索词条直接相符的两套拼写。记录完全一致、仅大小写有别、至少一种形式有别和无直接 ID。两边均保留原样。方言、异读、复合候选、借词和缺少书证的情况须分别解释。 |

`archiveSha256` 固定整份 ZIP 的精确字节。Git 提交可以停在不带该报告的上一提交，只要受检输入一字未变即可再次核验。摘要用来辨认和比较版本；首次采用一个新摘要时，需要可信来源的清单或独立重建。批准的历史输入组合可以复核；仅凭组合摘要无法证明两份 TSV 源自同一次词典生成，也无法裁定哪种拼写正确。

## 来源与转换

词典以 `site/data.json.gz`、`site/dictionary.json.gz`、标注文献和各调查点资料为依据。发布流水线先应用 `gloss-reviews.json` 的审订，再重算标为推导的 Brassett IPA、规范 IPA 显示，最后准备网站与离线索引。`scripts/test-offline-parity.py` 能把每一条打包词条、语料和文献原文与独立准备的网站逐字比对。检索索引和键盘的规范化字段用于查找；校勘时查看完整词条的 `attestations`、`notations` 和原页。

`site/xu-ipa-site-mapping.json` 的适用范围是《土家语语法标注文本》龙山资料。该表保留原书拼音、原音、条件、例词锚点、来源观察和限制。文件和说明须与 Git 原件逐字相同。改变其中的示例或表格后，还要核对实际执行 `xuSiteSpelling` 的 `longshan-texts.js`。Brassett 的不同来源有各自的数字调号，田氏资料含未定调和并列读法，南部资料按调查点处理。修订时保留来源 ID、方言、定位信息及原拼写，另记建议读法、证据和适用条件。不确定的分析继续保持不确定。

键盘构建的 `tools/site_spellings.cjs` 直接载入词典的 `notation-ui.js`、`notation-profiles.js`、`southern-notation.js`、`longshan-texts.js` 等模块，调用 `completeSpellings`、`yeToAccent` 和 `xuSiteSpelling`。`import_northern_words.py` 在混合方言词中选取有北部见证的形式。汉字候选和输入简码另有 `tools/data/orthography-*.{tsv,json}` 等编辑资料。新增拼音对应应先改适用的词典来源和规则，再用键盘适配器生成；汉字候选、排序和用户学习各有自己的依据。

## 在本地生成并验收

`DICTIONARY` 指向所选发布提交的干净词典工作副本。`KEYBOARD`、`REPORTS` 和 `FONT_ZIP` 分别指向键盘仓库、报告目录和已缓存的官方 Gentium Plus 6.200 字体 ZIP。所需 Node 包须已缓存在本机。既有准备程序从工作树读取文件，复现发布包时需使用相同的 Python、Node、pnpm、gzip 和字体版本。

```sh
set -eu
mkdir -p "$REPORTS"
cd "$DICTIONARY"
pnpm --dir scripts/mobile-compat --ignore-workspace install --offline --frozen-lockfile --ignore-scripts
python3 scripts/export-offline.py "$REPORTS/learning.zip" --font-archive "$FONT_ZIP"
python3 scripts/export-offline.py "$REPORTS/repeat.zip" --font-archive "$FONT_ZIP"
cmp "$REPORTS/learning.zip" "$REPORTS/repeat.zip"
sha256sum "$REPORTS/learning.zip"
```

审核词典导出及 TSV 差异后，把导出复制至键盘仓库的 `learning-content/learning.zip`，将 64 位 SHA-256 单独一行写入 `learning-content/learning.sha256`，与选定的两份 TSV 和索引生成器一起固定到 Git 提交。随后运行下列命令。生成和核验均检查 ZIP 每个文件的长度及 SHA-256，并核对原始资料、规则和 TSV。两者只读取这两个仓库；输出仅写入指定的报告路径。

```sh
UPDATE_TOOL="${UPDATE_TOOLS:-$DICTIONARY}/scripts/offline-update-lock.py"
DICT_REV=$(python3 -c 'import json, sys, zipfile; print(json.loads(zipfile.ZipFile(sys.argv[1]).read("offline-manifest.json"))["sourceRevision"])' "$KEYBOARD/learning-content/learning.zip")
test "$DICT_REV" = "$(git -C "$DICTIONARY" rev-parse HEAD)"
python3 "$UPDATE_TOOL" create --dictionary "$DICTIONARY" --keyboard "$KEYBOARD" \
  --dictionary-revision "$DICT_REV" --out "$REPORTS/offline-update-lock.json"
python3 "$UPDATE_TOOL" verify --dictionary "$DICTIONARY" --keyboard "$KEYBOARD" --lock "$REPORTS/offline-update-lock.json"
python3 "$UPDATE_TOOL" spellings --lock "$REPORTS/offline-update-lock.json" \
  --out "$REPORTS/spelling-differences.json"
python3 "$UPDATE_TOOL" compare "$PREVIOUS_LOCK" "$REPORTS/offline-update-lock.json" --review-spellings
```

最后一步逐项列出来源、程序、资源和词表变化。它会列出新出现、形式改变、已解决和失去可比性的拼写差异。新增差异、原差异失去对应，或新增无直接 ID 的词形会以非零退出码提示编辑复核。根据来源审校后，可以保留有依据的不同表示并批准新的完整清单。完整 ZIP 含 JavaScript、HTML 和 SVG；本版所有资料和程序都随 APK 更新。

`threeInputBytesChanged` 表示学习 ZIP 或两份键盘 TSV 的字节发生变化。`indexBuildCodeChanged` 表示生成长按资料索引的程序或构建入口发生变化。修订来源判定逻辑时，三个输入即使相同，也可能生成不同的索引。交付的实际索引字节需要再从 APK 逐项核对。

核验既有出货版本时，可把 `UPDATE_TOOLS` 指向较新的维护工具工作副本，同时让 `DICTIONARY` 对应 ZIP 中的发布提交。例如，本次学习 ZIP 固定于 `9a73174350c3daeffa89ff237690b0431a37e4f4`。后续工具和文档的提交只用于生成报告，已签 APK 的词典来源和原清单可继续按原提交核验。

### 重新生成键盘词表

在独立的键盘工作副本中操作，保存当前两份 TSV 作对照。`DEMO_DIST` 是已核验的本地演示词表目录，至少含 `words.js` 和 `dialect-data-LICENSE.txt`。保留使用的故事词表、汉语读音、原始授权和任何明确批准的词频覆盖。完整导入器使用这些资料以及词典的同一 Git 提交。程序记录实际 `sourceRevision`、读取文件的 SHA-256 和核心 TSV 的输出 SHA-256。对于脱离 Git 的资料副本，用 `--dictionary-git "$DICTIONARY" --dictionary-revision "$DICT_REV"` 逐字核对。缺少 Git 见证的快照会明确留下空提交号。

```sh
cd "$KEYBOARD_BUILD_COPY"
ASSETS=shared/bundle/Assets
python3 tools/import_words.py "$DEMO_DIST" --dictionary-site "$DICTIONARY/site" \
  --dictionary-revision "$DICT_REV" --out "$ASSETS" --web "$DEMO_DIST/ranking.js"
python3 tools/import_northern_words.py "$DICTIONARY/site"
git diff --stat -- "$ASSETS/words.tsv" "$ASSETS/northern-words.tsv"
git diff -- "$ASSETS/words.tsv" "$ASSETS/northern-words.tsv" > "$REPORTS/keyboard-regeneration.diff"
```

先对照 ID、词形、调符、义项、候选和词频，再决定哪些变化可以入库。对两份新生成的正式 TSV，还可将独立生成结果、相同输入及 `licenses/tujia-frequencies.json` 交给 `verify --rebuilt-lexicons "$KEYBOARD_BUILD_COPY/shared/bundle/Assets"`，核对词典提交、输入摘要和两表字节。只有实际从另一干净副本运行生成程序，才构成独立重建。既有核准词表保留原文件、历史来源记录和差异，避免以一次重跑覆盖编辑或频率调整。

### 已有黄金样例

在词典仓库运行下列七组本地测试。它们分别覆盖北部拼写边界、各调查点的原记音对应、南部韵母对立与异读、田氏未定调、Brassett 原始声调及 IPA 规范化。

```sh
cd "$DICTIONARY"
for suite in spelling-boundaries notation-pairs southern-notation southern-source-rimes tian-notation brassett-ipa ipa-normalize; do
  node "scripts/test-$suite.cjs" || exit 1
done
python3 scripts/test-offline-update-lock.py
python3 scripts/test-offline-parity.py "$PREPARED_SITE" "$REPORTS/learning.zip"
cd "$KEYBOARD"
python3 tools/test_import_words_provenance.py
bash tools/test-core.sh words
```

`tools/test-site-spellings.py "$DICTIONARY/site" "$DEMO_DIST"` 还对照网站转换函数、键盘叶氏/调符拼写、山歌和故事选词。它需要与被测两表同版的 `words.js`、`story-words.js` 和 `ranking.js`；演示目录来源不同会在词频或故事本字阶段报错。打包验收应另在两种实际 APK 上运行键盘仓库的 `qa/verify-apk.py`、长按资料回归和断网设备测试。

## 已出货基线

词典 `7ca9e447a2ec8d249c566501da80913680499729`、键盘上次可执行源码 `cbbb34e177dff46883ddfd12cf92c4e18a915e98`，后续 `ec1ae0d79240f2d0a7c1d4742d9577540b29d94f` 只改 QA。学习 ZIP 的 SHA-256 为 `09bf220b30dceda31224d6328c16182dbfacb277964667b378c41cf06e55cf39`。共有 16,577 个词条、29,102 条来源见证。核心表 37,694 行，补充表 14,640 行。

| 同 ID 的叶氏与调符拼写 | 完全一致 | 仅大小写不同 | 至少一种不同，待按来源复核 | 无直接 ID |
| --- | ---: | ---: | ---: | ---: |
| 核心表的 526 个土家语候选 | 350 | 0 | 0 | 176 |
| 北部补充表 | 12,118 | 41 | 247 | 2,234 |

逐条报告可用 `spellings` 从清单再生。例如 `stedt-rn-127225` 的键盘形式为 `angxbixtax / āngbītā`，读本显示 `anxbixtax / ānbītā`。二者有可追溯的记录。对无直接 ID 的扩展词、派生候选、复合输入不做显示词相似度联结。

使用仓库内现存演示词形、许可及默认输入重跑旧导入器，北部补充表逐字节相同。核心表有 49 行在候选字、别名、字频、推荐字或字单元上不同，词形和调符拼写相同。旧词频文件也保留了更早的来源 URL，当中的 `words.js`、`story-words.tsv`、`mandarin-reading-aliases.tsv` 哈希与现存本地输入不同。该基线是批准保留的历史词表；完整同源生成仍有这些差异待核实。

## 今后若提供联网资料更新

当前应用无下载或远程执行入口。将来发布联网功能，需要新的应用版本和用户可见的版本说明。可设计仅接收固定 JSON/TSV 模式的独立数据包。用随 APK 预置的公钥验证签名清单，清单包含递增发布序号、资料/规则和最低读本/IME 模式版本、路径、大小及 SHA-256；核验发布身份、兼容性和回滚序号后才读取载荷。限制文件种类、解压后大小、路径、字段和引用，文本按文字显示。保留原始见证、歧义、方言范围和不同来源的 ID。

下载和校验可在临时目录完成。同一版本的词典、映射数据、键盘来源及索引全部验证后，原子切换到只读的新目录；中断或验证失败时继续使用上一完整版本。个人词库及本地学习记录在独立目录，数据升级与回滚均沿用原记录。若未来加入经审计的声明式规则解释器，映射行可限于它已支持的来源、调类与条件。现有 JS 含转换算法，C++ 实现候选匹配，两者的改变以及新增条件算法、解释器、网页代码均需重新构建和签署 APK。
