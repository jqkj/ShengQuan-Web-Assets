# 圣泉传说 · 版本更新档案

网站入口：[`index.html#versions`](../index.html#versions)

此目录以**新增文件**保存每次更新，而不是用新公告覆盖旧公告。索引见 [`index.json`](index.json)。历史内容保留发布时的功能与限制，**不视作当前玩法说明**。

| 版本 | 更新题名 | 历史记录 |
| --- | --- | --- |
| V3.1.6.1 | 泉水之龙 | [3.1.6.1.md](3.1.6.1.md) |
| V3.1.6 | 余烬不熄 | [3.1.6.md](3.1.6.md) |
| V3.1.5 | 圣泉功业与精钢军械 | [3.1.5.md](3.1.5.md) |

## 今后更新约定

1. 为每版新增 `versions/<版本号>.md`，不改写历史公告原意。
2. 在 `versions/index.json` 和网站 `site-data.releases` 登记新版本；首页只展示最新两版，完整记录在版本目录。
3. 游戏实机图放在 `assets/releases/<版本号>/`；新资源要同步登记 `asset_manifest.json` 和网页图片索引。
4. GitHub 是站点源文件；**Muse 站点不会因 Git 提交自动重新发布**。
5. 更新前备份：`archive/site-before-v3.1.6.1` 分支指向 V3.1.6.1 更新前的完整站点快照。

## 独立 HTML 版本页 / Standalone HTML pages

- [版本目录 / Archive](index.html)
- [V3.1.6.1 · 泉水之龙](3.1.6.1.html) — [原始 Markdown](3.1.6.1.md)
- [V3.1.6 · 余烬不熄](3.1.6.html) — [原始 Markdown](3.1.6.md)
- [V3.1.5 · 圣泉功业与精钢军械](3.1.5.html) — [原始 Markdown](3.1.5.md)

**归档原则：**每个版本的原始 Markdown 保留；独立 HTML 页面根据站点已有的中英双语版本正文生成，并使用相同的湖神主题样式。更新页面不能删除旧版本。静态页面需要与整个仓库一起部署；Muse 目前是单独发布站点，GitHub 变更不会自动生成 Muse 页面。

**Publishing:** Deploy the `versions/` directory as part of a static host for the standalone URLs to resolve. The existing Muse-hosted site still uses internal `#versions` / `#v3161` routes until explicitly synchronized.
