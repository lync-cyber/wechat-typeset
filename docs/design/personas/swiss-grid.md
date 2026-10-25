# swiss-grid · 苏黎世栅格

> 视觉灵魂：Josef Müller-Brockmann 在 Neue Grafik 04 内页上画红色辅助线的那支铅笔。
> 国际红 + 12 栏铁律 + 直角硬边 · 1958 Zürich 编辑部对开页。

- **视觉 ground truth**: `docs/themes-specs/themes/02-swiss-grid.html`
- **PersonaSpec**: `src/core/themes/swiss-grid/persona.data.ts`
- **样稿**: `src/samples-md/sample-swiss-grid.md`

## 三条不可妥协决策

1. `radius` 全 0——半径 ≥ 1 即破"Swiss 现代主义即硬"的气质
2. `primary = #e30613`——瑞士国旗红，对应 Neue Grafik 04 期号底色（不是 Bootstrap 红）
3. H2 章节序号用红色方块徽章（"01" / "02" / "03"）——通过
   `decorations.headingPrefix.style.backgroundColor=primary` + `paddingX/paddingY` 撑开，
   是整套主题最强烈的版面节奏锚点。

## 与 data-brief（数据简报）的边界

| | data-brief | swiss-grid |
|---|---|---|
| 灵魂色 | 数据蓝 #1756d1 | 国际红 #e30613 |
| 章节签名 | 蓝色 monospace 序号（02.1） | 红方块徽章（02） |
| 主视觉媒介 | KPI dashboard + sparkline | 巨号 Nº 期号 + 红章 H2 |
| 排印气质 | 数据报表 | 栅格构成 |

两者复用通用容器，通过 tokens、variants、innerStyles 与装饰配置表达视觉差异。当前结构以 [PersonaSpec](../../../src/core/themes/swiss-grid/persona.data.ts) 和 [主题样稿](../../../src/samples-md/sample-swiss-grid.md) 为准。

## 配置与写作边界

- `decorations.headingPrefix` 注入章节编号；`style.backgroundColor`、`paddingX`、`paddingY` 控制红色徽章，反白文字使用 `textInverse`。
- `decorations.introDropcap` 注入导语首字下沉；正文不手写装饰字符。
- 编者按使用 `note variant=editorial-stripe`，标题与主体由变体渲染；普通旁注保留主题默认的 `side-bar` 骨架。
- 嵌套目录、条形图和对照块使用四冒号外层、三冒号子项；每个子项独立闭合。
- 手写参考文献使用 `footnotes`；原生 `[^id]:` 定义直接写在正文中。

## 主要组件映射

| 设计元素 | 当前写法 |
|---|---|
| 巨型期号 | `key-number`，含 `value` 属性 |
| 分行刊头 | `editorial-header`，含 `chip`、`pp`、`subtitle` 属性 |
| AUTHOR / EDITOR / SET | `byline`，`cells` 内的单元格以竖线分隔 |
| 副刊导读 | `abstract` |
| 双栏目录 | `toc layout=split` + `toc-item` |
| 红章章节标题 | Markdown H2 + `decorations.headingPrefix` |
| 条形图 | `bar-chart` + `bar` |
| INFO / TIP / WARN / STOP | `info` / `tip` / `warning` / `danger`，使用 `news-row` 骨架 |
| 问答 | `qa-block` |
| 编者按 | `note variant=editorial-stripe` |
| 方法说明 | `note variant=research-dense` |
| 参考文献 | `footnotes`；长列表可显式选择 `variant=inline-flow` |
| 三栏互动 | `footer-cta variant=triptych-actions`，含 `like`、`star`、`share` 属性 |
| 订阅卡 | `qrcode variant=follow-card`，含 `kicker`、`desc` 属性 |
| 卷尾信息 | `colophon`，含 `next`、`issue` 属性 |

完整语法见 [基础契约](../../contract/base.md) 和 [编辑扩展包](../../contract/packs/editorial.md)。
