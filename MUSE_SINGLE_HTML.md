# Muse 单 HTML 发布约定 / Single-file deployment

> 2026-11-16：**Muse 一个空间只能维护一个 HTML。根目录 `index.html` 是唯一需要复制进 Muse 的页面。** 本项目不要求 Muse 具备文件夹、多个 HTML 或静态资源目录。

## 实际结构

- `index.html`：所有 CSS、JavaScript、30 个模块 / 支持主题、5 个阿斯塔特职业、版本公告、资源图鉴和站内搜索都在一个文件。
- `#compendium`：35 个专题的分类目录；每篇内容以 `#m9`、`#c3`、`#profession-apothecary` 等路由单独打开。
- `#resources`：CK3 与圣泉的资源标识、四种有对照 PNG 的彩色资源及两种宗教变体、12 个界面图案。
- `#versions`：版本目录；`#v3163`：CK3 1.21 适配与宝物熔炉修复；`#v3162`：宝物升华、人物招募与学院；`#v3161`：泉水之龙更新与八图实机拼图。
- `assets/v1/`、`assets/releases/`、`assets/ck3-ui/`：放在公开 GitHub 仓库，以完整 HTTPS 图片地址供网页按需加载。
- `topics/*.html`、`versions/*.html`：保留供多文件静态主机、校对及档案使用；**不要当作 Muse 必需文件**。

## 每次更新的发布顺序

1. 如果涉及图片，先向 GitHub 提交新图片并确认路径存在；前端使用 GitHub 图片地址（当前使用 jsDelivr 代理 GitHub）。
2. 修改仓库根目录的 `index.html`；确保不引用外部 CSS、JS 或其它 HTML 页面作为必要依赖。
3. 运行 `node scripts/verify-muse-single-html.mjs` 做静态审查。
4. 在 Muse 的现有空间中替换唯一 HTML 内容或文件；**GitHub push 不能自动更新 Muse**。
5. 在电脑、手机浏览器分别测试 `#home`、`#compendium`、`#m9`、`#profession-apothecary`、`#resources`、`#versions`、最新公告 `#v3163`、上一版 `#v3162`、龙角历史公告 `#v3161`，并测试图片加载、中文/英文、搜索、后退及刷新后的深链接。
6. 若图片路径变更，应注意 CDN 缓存；已锁定 GitHub 提交版本的素材必须同步更新引用，不要仅覆盖旧路径期待立即刷新。

## 单文件体积优化

- 历史版把 48 × 2 × 5 = **480 个 PNG 导出变体**全部编码在 HTML 里。
- 现改为保留 SVG 源码，用户点击 PNG 导出时使用浏览器 Canvas 按选择的尺寸和浅/深主题生成 PNG；名称、分辨率选项仍在。具体观感可能与旧预渲染 PNG 有细微差别，需做浏览器回归。
- 去掉了未被网站 JavaScript 使用的 `ornamentPng` 内嵌变体。品牌小图与装饰 SVG 不受影响。
- 如果 Muse 环境禁用 JavaScript，单文件应用中的动态页面及 PNG 导出都无法运行；不能把“HTML 能上传”误判为交互已经通过验收。

## 来源与版权

彩色 CK3 PNG 资源的名称与 `gui/texticons.gui` / `texticons_religion.gui` 注册名、DDS 路径进行了对照；**没有**证明 PNG 与原始 DDS 逐字节相同。游戏资源版权归 Paradox Interactive AB；本站非商业图例不意味着获得自由分发许可。

历史独立专题页面以仓库资料为准，但不应覆盖主站的唯一发布约定。
