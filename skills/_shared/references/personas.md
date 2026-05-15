# 内置 Persona 速查（共享 reference）

> author-persona / annotate-markdown 两个 skill 通过 `../_shared/references/personas.md` 相对路径共同引用本文件，零副本零同步。改本文件 = 两个 skill 同时生效。
>
> **本文件部分内容由 `npm run build:skill-refs` 从 `src/public/personas.ts` 派生**——速查表与逐个画像段落不要手改；新增主题只需在 `src/public/personas.ts` 注册，跑一次 build 脚本即可。
>
> 决策树与"什么时候选 / 选它的信号"等手写指引保留在本文件末尾。

选型时先读 **受众** 和 **视觉签名**（variants），再对比 **signatureContainers** 看是否满足内容需要。id 只是索引，不要按字面猜（`tech-geek` 和 `tech-explainer` 都属技术题材，但气质截然不同）。

## 速览表（自动生成，勿手改）

<!-- generated:personas-table:start -->

| id | 中文名 | 受众 | admonition | quote | steps | divider | codeBlock | note | signatureContainers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `default` | 默认主题 | 通用（全题材公平阅读） | `accent-bar` | `classic` | `number-circle` | `rule` | `bare` | `minimal-callout` | —— |
| `tech-geek` | 极客夜行 | 技术布道 / 工程随笔 / 架构评论（manpage / RFC / TAOCP 脚注风） | `manpage-log` | `frame-brackets` | `number-circle` | `wave` | `bare` | `side-bar` | —— |
| `tech-explainer` | 文档白昼 | 技术布道 / 产品文档 / 教程 | `accent-bar` | `column-rule` | `number-circle` | `rule` | `header-bar` | `box-callout` | note、seeAlso |
| `life-aesthetic` | 慢生活 | 生活写作 / 非虚构随笔 | `bubble-organic` | `classic` | `number-circle` | `rule` | `bare` | `minimal-callout` | —— |
| `business-finance` | 硬核财经 | 财经内参 / 研究所 newsletter（FT 中文、财新周刊、Bloomberg Terminal、HBR） | `ledger-cell` | `frame-brackets` | `timeline-dot` | `wave` | `bare` | `box-callout` | abstract、keyNumber |
| `data-brief` | 数据简报 | 数据 newsletter / 数据简报 / 行业图表周刊 | `news-row` | `classic` | `number-circle` | `flower` | `bare` | `side-bar` | abstract、masthead、sectionTag、toc、kpiDashboard、barChart、qaBlock、footnotes、refs、ctaBar、qrFollow、editorNote、methodology、colophon |
| `literary-humanism` | 人文札记 | 人文非虚构（散文 / 书评 / 长评 / 札记） | `marginalia` | `magazine-dropcap` | `timeline-dot` | `flower` | `bare` | `minimal-callout` | —— |
| `industry-observer` | 行业观察 | 内参 newsletter / 行业周报 / analyst essay 读者 | `report-section` | `column-rule` | `timeline-dot` | `glyph` | `bare` | `side-bar` | cover、author、footerCTA、abstract、keyNumber、seeAlso |
| `people-story` | 人物特稿 | 人物特稿 / 人文非虚构 / 杂志 Profile | `magazine-pull` | `magazine-dropcap` | `timeline-dot` | `rule` | `bare` | `minimal-callout` | —— |
| `academic-frontier` | 学术前沿 | 学术研究者 / 同行评审向的论文化陈述 | `sidenote-latex` | `frame-brackets` | `timeline-dot` | `rule` | `bare` | `box-callout` | abstract、seeAlso |
| `editorial-mook` | 编辑刊 | 慢读 newsletter / 文化随笔季刊 / 编辑型 mook 刊物 | `mook-tag` | `classic` | `number-circle` | `glyph` | `bare` | `minimal-callout` | abstract、masthead、toc、qaBlock、footnotes、ctaBar、qrFollow、editorNote、colophon |
| `swiss-grid` | 苏黎世栅格 | 设计评论 / 编辑刊 / 视觉栅格杂志 / Neue Grafik 系排印随笔 | `news-underline` | `classic` | `number-circle` | `seal-mark` | `bare` | `side-bar` | abstract、sectionTag、editorialHeader、byline、toc、keyNumber、qaBlock、editorNote、footnotes、refs、calloutGroup、ctaBar、qrFollow、colophon、methodology、barChart |
| `brutalist` | 粗野主义报刊 | 夜读简报 / 文化批评 / 实验栏目 | `news-row` | `tilted-sticker` | `number-circle` | `flower` | `bare` | `side-bar` | masthead、toc、qaBlock、footnotes、ctaBar、qrFollow、editorNote、colophon |
| `late-night-vinyl` | 深夜电台 | 电台 newsletter / 夜读慢读 / 播客文化随笔 / 长夜散文 | `news-row` | `classic` | `number-circle` | `dots` | `bare` | `side-bar` | intro、cover、author、masthead、toc、qaBlock、editorNote、footnotes、ctaBar、qrFollow、colophon |

<!-- generated:personas-table:end -->

## 逐个画像（自动生成，勿手改）

<!-- generated:persona-cards:start -->

### default · 默认主题

**受众**：通用（全题材公平阅读）

**描述**：有意识的中立——Medium/Notion/Substack 默认家族

**视觉签名**：admonition=`accent-bar` · quote=`classic` · steps=`number-circle` · divider=`rule` · codeBlock=`bare` · note=`minimal-callout`

### tech-geek · 极客夜行

**受众**：技术布道 / 工程随笔 / 架构评论（manpage / RFC / TAOCP 脚注风）

**描述**：VT220 琥珀 + 墨炭暖底 + manpage 印刷传统，成年工程师的工程写作

**视觉签名**：admonition=`manpage-log` · quote=`frame-brackets` · steps=`number-circle` · divider=`wave` · codeBlock=`bare` · note=`side-bar`

### tech-explainer · 文档白昼

**受众**：技术布道 / 产品文档 / 教程

**描述**：Stripe Docs / MDN 家族，手把手跟做的技术产品文档

**视觉签名**：admonition=`accent-bar` · quote=`column-rule` · steps=`number-circle` · divider=`rule` · codeBlock=`header-bar` · note=`box-callout`

**signatureContainers**：`note`、`seeAlso`

### life-aesthetic · 慢生活

**受众**：生活写作 / 非虚构随笔

**描述**：暖米底 + 圆角柔和，写写饮食、旅行与长日

**视觉签名**：admonition=`bubble-organic` · quote=`classic` · steps=`number-circle` · divider=`rule` · codeBlock=`bare` · note=`minimal-callout`

### business-finance · 硬核财经

**受众**：财经内参 / 研究所 newsletter（FT 中文、财新周刊、Bloomberg Terminal、HBR）

**描述**：深栗墨 + 内参蓝，研究所内参版面，数字与判断优先

**视觉签名**：admonition=`ledger-cell` · quote=`frame-brackets` · steps=`timeline-dot` · divider=`wave` · codeBlock=`bare` · note=`box-callout`

**signatureContainers**：`abstract`、`keyNumber`

### data-brief · 数据简报

**受众**：数据 newsletter / 数据简报 / 行业图表周刊

**描述**：数据蓝 + 黑底代码 + 直角硬边：晚点 / 财新数据 / Morning Brew 感

**视觉签名**：admonition=`news-row` · quote=`classic` · steps=`number-circle` · divider=`flower` · codeBlock=`bare` · note=`side-bar`

**signatureContainers**：`abstract`、`masthead`、`sectionTag`、`toc`、`kpiDashboard`、`barChart`、`qaBlock`、`footnotes`、`refs`、`ctaBar`、`qrFollow`、`editorNote`、`methodology`、`colophon`

### literary-humanism · 人文札记

**受众**：人文非虚构（散文 / 书评 / 长评 / 札记）

**描述**：宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸

**视觉签名**：admonition=`marginalia` · quote=`magazine-dropcap` · steps=`timeline-dot` · divider=`flower` · codeBlock=`bare` · note=`minimal-callout`

### industry-observer · 行业观察

**受众**：内参 newsletter / 行业周报 / analyst essay 读者

**描述**：Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿

**视觉签名**：admonition=`report-section` · quote=`column-rule` · steps=`timeline-dot` · divider=`glyph` · codeBlock=`bare` · note=`side-bar`

**signatureContainers**：`cover`、`author`、`footerCTA`、`abstract`、`keyNumber`、`seeAlso`

### people-story · 人物特稿

**受众**：人物特稿 / 人文非虚构 / 杂志 Profile

**描述**：《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版

**视觉签名**：admonition=`magazine-pull` · quote=`magazine-dropcap` · steps=`timeline-dot` · divider=`rule` · codeBlock=`bare` · note=`minimal-callout`

### academic-frontier · 学术前沿

**受众**：学术研究者 / 同行评审向的论文化陈述

**描述**：Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述

**视觉签名**：admonition=`sidenote-latex` · quote=`frame-brackets` · steps=`timeline-dot` · divider=`rule` · codeBlock=`bare` · note=`box-callout`

**signatureContainers**：`abstract`、`seeAlso`

### editorial-mook · 编辑刊

**受众**：慢读 newsletter / 文化随笔季刊 / 编辑型 mook 刊物

**描述**：米白底 + 朱橙单点缀 + 极小字号 · POPEYE / BRUTUS 系慢读编辑刊

**视觉签名**：admonition=`mook-tag` · quote=`classic` · steps=`number-circle` · divider=`glyph` · codeBlock=`bare` · note=`minimal-callout`

**signatureContainers**：`abstract`、`masthead`、`toc`、`qaBlock`、`footnotes`、`ctaBar`、`qrFollow`、`editorNote`、`colophon`

### swiss-grid · 苏黎世栅格

**受众**：设计评论 / 编辑刊 / 视觉栅格杂志 / Neue Grafik 系排印随笔

**描述**：国际红 + 12 栏铁律 + 直角硬边：1958 Neue Grafik 苏黎世对开页

**视觉签名**：admonition=`news-underline` · quote=`classic` · steps=`number-circle` · divider=`seal-mark` · codeBlock=`bare` · note=`side-bar`

**signatureContainers**：`abstract`、`sectionTag`、`editorialHeader`、`byline`、`toc`、`keyNumber`、`qaBlock`、`editorNote`、`footnotes`、`refs`、`calloutGroup`、`ctaBar`、`qrFollow`、`colophon`、`methodology`、`barChart`

### brutalist · 粗野主义报刊

**受众**：夜读简报 / 文化批评 / 实验栏目

**描述**：近黑底 + 荧光黄 + 直角硬边：punk-zine / 终端 / 凌晨三点印刷厂

**视觉签名**：admonition=`news-row` · quote=`tilted-sticker` · steps=`number-circle` · divider=`flower` · codeBlock=`bare` · note=`side-bar`

**signatureContainers**：`masthead`、`toc`、`qaBlock`、`footnotes`、`ctaBar`、`qrFollow`、`editorNote`、`colophon`

### late-night-vinyl · 深夜电台

**受众**：电台 newsletter / 夜读慢读 / 播客文化随笔 / 长夜散文

**描述**：深夜蓝 + 暖米白 + 橙色唱针 · 03:41 AM 黑胶播客慢读感

**视觉签名**：admonition=`news-row` · quote=`classic` · steps=`number-circle` · divider=`dots` · codeBlock=`bare` · note=`side-bar`

**signatureContainers**：`intro`、`cover`、`author`、`masthead`、`toc`、`qaBlock`、`editorNote`、`footnotes`、`ctaBar`、`qrFollow`、`colophon`

<!-- generated:persona-cards:end -->

## 决策树（给 LLM · 手写指引）

```
用户话题是技术？
├── 教程 / 文档 / step-by-step        → tech-explainer
├── 工程独白 / 底层 / manpage 风       → tech-geek
└── 研究 / 论文 / 方法学              → academic-frontier

用户话题是商业 / 财经 / 数据？
├── 单篇深度报告                       → business-finance
├── 周刊 newsletter（期号 / 定期）       → industry-observer
└── 数据 / 图表 / KPI 简报             → data-brief

用户话题是人文 / 文学？
├── 人物特稿 / 专访 / profile         → people-story
├── 散文 / 书评 / 札记                 → literary-humanism
└── 生活 / 旅行 / 美食                 → life-aesthetic

用户话题是文化 / 编辑 / 设计 / 慢读 newsletter？
├── 编辑刊 / mook / POPEYE 系慢读      → editorial-mook
├── 设计评论 / Neue Grafik 系排印      → swiss-grid
├── 夜读 / 文化批评 / punk-zine 实验   → brutalist
└── 电台 / 播客 / 长夜散文             → late-night-vinyl

其他 / 不确定                          → default
```

不够匹配时永远回退 `default`——它是设计上唯一完全中立的。**不要**把 `life-aesthetic` 当作「default 的暖色版」使用；它的母语是"生活随笔"，技术 / 商业内容会显得轻飘。

## 设计原型与独有能力（手写指引）

仅记录 **从 listPersonas() 摘要无法窥见** 的特殊能力。常规 variants / signatureContainers 见上方速览表。

- **tech-explainer** — 全项目唯一 `codeBlock=header-bar` 的主题（顶部语言标签 + copy icon）。
- **industry-observer** — 主题自带 `issueStamp` 模板 motif。markdown 容器里写 `issue=023 date=2025-04-20 kind=周刊` 时，cover / author / footerCTA 三处自动贴上期号印章 SVG。
- **people-story** — 声明了 `decorations.introDropcap`（首段首字下沉）+ `decorations.headingPrefix` h2 罗马数字（I / II / III）。
- **swiss-grid** — H2 红章前缀（`backgroundColor='primary' + textInverse`），全 0 圆角（"半径 ≥ 1 即破"）。`editorNoteKicker` 走全幅黑底白字 header bar 形态。
- **brutalist** — `quote=tilted-sticker`（反色卡片 + `transform:rotate(-1deg)`），status 四态打破交通灯（NOTE 蓝 / TIP 绿 / WARN 黄 / HALT 红）。
- **editorial-mook** — `admonition=mook-tag`（参 / 編 / 注 / 禁 单字 CJK 标签）；`decorations.headingPrefix` 走 `arabic-padded` + 中文小写后缀 `第{cn}章`。
- **late-night-vinyl** — `admonition=news-row`，深夜蓝 + 暖米白 + 橙色唱针的"03:41 AM"播客慢读 voice。
- **data-brief** — `compare=data-card`（顶 3px 色条 + bgSoft + monospace 数字），`admonition=news-row`，signatureContainers 含全套 data-brief 家族（masthead / toc / kpiDashboard / barChart / qaBlock / footnotes / ctaBar / qrFollow / editorNote / methodology / colophon）。

## 重要：派生 vs 全新造的硬规则

| 用户描述 | 选择 |
| --- | --- |
| audience 命中速览表里某行 + 用户没指明视觉冲突 | 直接复用该 id，不要造新 |
| audience 命中但用户说"换主色 / 换 quote 骨架" | 派生（`getPersona(id)` 拷贝 + 改 palette/variants），不要造新 |
| 用户能说出"像 X 那种"（参照锚点强信号） | 优先在内置主题里找 audience 最近的派生 |
| audience 全部不对 + 参照锚点也拉不上 | 才进入"全新造主题"路径（`wechat-typeset-author-persona`） |
