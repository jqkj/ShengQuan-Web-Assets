# 圣泉传说 · 独立专题站点 V1
生成日期：2026-11-15。共 35 篇真正独立的 HTML 专题页，30 个主题 + 5 个阿斯塔特职业，使用独立的地址（`topics/m9.html`、`topics/profession-apothecary.html` 等）。另有 `topics/index.html` 专题目录、共享 `style.css` 与 `theme.js`。

## 文案基线
- 中文叙事：网站现行 site-data 与 `editorial/2026-11-15/all_articles.md` 审校稿；章节标题取自该审校稿。主模组基线 `jqkj/CK3-ShengQuan-Legend@22f201537364fbf2a1182abc43ca00d07b1f93ed`（V3.1.6 main）。
- 龙角 V3.1.6.1 来自单独分支，不能称与 V3.1.6 main 合并。
- 混沌是独立开发测试候选，铠甲为独立外观工程；骑士王未开放。
- 英文保留网站旧译稿，**未完成与最新中文稿的全量复审**；切换到英文时会提示。

## 部署与边界
`topics/*.html` 需要和 `assets/v1/*.webp` 一起部署在支持多文件路径的静态主机，所有链接使用相对路径。Muse 是独立发布体系：GitHub push 不会自动更新其线上网页，若 Muse 只部署单 HTML，根目录 `index.html` 仍需保留，不能指望 `topics/` 自动可用。

## 静态审计
生成前检查了 35 篇中文叙事全文分配、章节标题存在、英文叙事存在、封面映射、39 个文件路径、全部独立页互链。未执行移动浏览器、完整 WCAG、CK3 实机或 Muse 发布测试。
