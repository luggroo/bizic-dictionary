# 土家语知识索引

静态网页位于 site/。较大的文本数据以 gzip 保存；Pages 工作流会解压为原始文件，再发布。

## 首次发布

仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions，然后运行 Actions → Publish Tujia knowledge index。

## 当前阶段

已优先迁移网页、词典、南北部语法、拼音映射及语料转写文本。扫描页、地图和录音文件尚待补传，对应本地媒体链接暂不可用，来源中的原件链接仍保留。原 Replit 应用文件未改动。

本地预览前解压：`find site -name '*.gz' -exec gzip -dk {} \;`，然后 `python -m http.server 8000 --directory site`。

当前没有离线缓存，浏览器收藏及审核结果不会跨设备或跨域名自动同步。iOS / Android 真机验收尚未完成。

详见 docs/repository-coverage.md；Replit 在线数据库后续修改尚未导出核对。
