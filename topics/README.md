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

## CK3 官方资源与圣泉自定义图标（2026-11-15）

- `resources.html`：图标对照词典；`theme.js`：全站通用资源标签、数值前的小图标、专题查询与分类筛选；`style.css`：轻量 Wiki 风格视觉。
- 本体图标注册在 `jesec/ck3-mod-base@master/base/game/gui/texticons.gui`、`texticons_religion.gui`；功业自定义纹样注册在 `jqkj/CK3-ShengQuan-Legend@22f201537364fbf2a1182abc43ca00d07b1f93ed/gui/jic_oath_board_texticons.gui`。
- base 仓库的 DDS 是二进制元数据占位文件（例如 `icon_gold.dds` 内容是 JSON 元数据），不能直接当作网页图像；没有在公开站点中转存游戏官方贴图。
- 初始版本用**原创 SVG 示意图**展示全部注册宏；自 2026-11-16 起，部分资源改为经文件名及路径核对的 CK3 PNG 预览，其余仍是原创 SVG。精确效果、费用与奖励仍以游戏为准。
- “本文涉及资源”通过已有中文正文、资格和规则文本提及的名称生成，**不意味着会必然消耗或获取这些资源**；英译仍有待对等复审。
- 总目录现在支持搜索与 5 组筛选，保留原有 35 个独立 HTML 页面。未改动游戏仓库、没有自动发布 Muse。

## CK3 扁平 UI PNG 资源（2026-11-15）
- assets/ck3-ui/flat/：从用户 Drive flat_icons 目录选取首批四张真实 60×60 透明 PNG，网页在资源词典及专题首页展示。
- 对照 jesec/ck3-mod-base@master/base/game/gfx/interface/icons/flat_icons/ 下 prestige、piety、time、treasury 的同名 DDS 元数据。
- 这 12 张是通用界面剪影，不等同于 @prestige_icon!、@piety_icon! 等文本注册宏所用彩色贴图。资源宏现为四张 PNG + 其余原创 SVG 回退。
- PNG 与 DDS 只确认文件命名与视觉用途，没有进行二进制同一性验证；版权仍属 Paradox Interactive AB，非商业展示不等同再分发授权。
- 根目录单 HTML 主站保持独立，不新增多文件 PNG 依赖；Muse 与多页 topics/ 仍需分别发布。

### 第二批 CK3 UI 图标对照
- 在相同 flat_icons 目录增补 8 个系统图标：faith、holy_order、culture、dynasty、county_control、development、army、council。
- 资源词典现在按“资源与时间”（4 项）和“领地、信仰与军事系统”（8 项）分组，共 12 张。首页仅展示前 4 张，避免挤占专题导航。
- 原版 GUI @texticon! 词典仍独立计 11 项；新增图像没有宣称等于对应的彩色文本宏。

## 资源宏彩色 PNG 与检索体验（2026-11-16）
- 从用户 Google Drive 的 CK3 `modifiers` 目录取得四种资源的同名 PNG 预览：威望、虔诚（默认基督教样式）、宗族威望、影响力；另展示 `piety_icon_eastern` 与 `piety_icon_taoism` 变体，共六张 PNG。
- 在 `jesec/ck3-mod-base@master/base/game/gui/texticons.gui` / `texticons_religion.gui` 核对注册名与路径；只确认**名称、路径与视觉对应**，没有对 DDS 与 PNG 做二进制同源校验。
- 官网 PNG 仅作为模组介绍中的资源参考图，属于 Paradox Interactive AB 的知识产权；不是本站自有素材，不是开放图片库，发布前仍应核查适用的授权条款。
- `theme.js` 自动在有 PNG 的资源图例使用图片，在来源缺失或加载出错时退回站点 SVG；保留 11 项注册图例并明示图像来源状态。虔诚宗教变体独立展示，不会改变 `@piety_icon!` 在原版中的注册路径。
- 目录搜索按实际条目数显示，支持中英双语关键词、多词匹配、快捷键 `/` 与 `Esc`、无结果提示和重置；各栏目使用匹配的扁平 UI 图案作为装饰。
- 新增 `node topics/verify-wiki.mjs` 静态自检脚本（Node 18+），不依赖额外 npm 包。

## 独立链接回归（2026-11-16）
- 全量检查 35 篇专题的本页锚点，将 `#c1`～`#c4`、`#armour`、`#status`、`#unknown` 等遗留指向改为真正的 HTML 独立专题页面。
- 版本相关 `#v3161`、`#v316`、`#versions` 改为 `versions/` 目录中专门的 HTML 版本页；对龙角页附八图展示。原 Markdown 与 JSON 原稿继续保留。
- 旧 `#chaos` 链接指向 `topics/index.html#chaos`，对应独立扩展栏目；没有把独立候选机制误写成主模组现行功能。
- 静态检查增加本页锚点、跨页面 HTML 引用与版本图片存在性检查；根目录原有 Muse 单文件站不做结构性改动。
