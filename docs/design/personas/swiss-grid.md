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

两者共享 data-brief 家族容器（toc / qa-block / editor-note / footnotes / refs / cta-bar / qr-follow /
colophon / methodology / bar-chart / key-number），仅在 tokens / variants / innerStyles 上分叉视觉个性。

## 复用与扩展的边界

### 复用 (zero new container)
- `news-row` admonition variant —— 设计稿 multi-callout (INFO/TIP/WARN/STOP) 1:1 复刻
- `key-number` 容器承担 issue-banner —— kicker / value / body 三段堆叠适配 375px 移动端
- `refs` 容器承担 NOTES 脚注 —— 自带 kicker info 槽
- `bar-chart` + `bar` 承担 FIG.01 条形图
- 全部 data-brief 家族容器（除 masthead / methodology 略弱化）

### 配置扩展（非主题专属，全局可用）

`HeadingPrefixDecoration.style` 三个新字段：

```ts
backgroundColor?: PaletteColorKey  // 编号底色，撑成色块徽章
paddingX?: number                  // 徽章左右内边距 px
paddingY?: number                  // 徽章上下内边距 px
```

> 加入动机：swiss-grid H2 「01」红方块徽章是设计稿最强签名；扩展三个字段后,
> 任何想用"色块章号"做章节锚点的未来主题都能直接复用,不绑定 swiss-grid。

`ThemeInnerStyles` 一个新槽位：

```ts
editorNoteKicker: CSSObject
```

> 加入动机：editor-note 的 kicker 之前 renderer 硬编码 (`primary` 色 + 11px + letter-spacing)。
> swiss-grid 需要全幅黑底白字 header bar 形态——通过负 margin 把 kicker 撑到 wrapper 边缘。
> 同时把 renderer 改为 `ctx.innerStyles.editorNoteKicker`，与 R8 的 abstractKicker /
> keyNumberKicker 同构。baseInnerStyles 兜底保持 default / data-brief / 其它主题字节等价。

`PaletteColorKey` 增 `'textInverse'`：

> 装饰前缀加底色时，文字色经常需要"反白"（红底白字、黑底白字）。原五 key 缺这个常用色。

## 已知 acceptable deviation

- **QA-block 徽章配色反相**：设计稿 Q 黑 / A 红；本主题 primary=红, renderer 硬编码
  Q=primary / A=text → 渲染为 Q 红 / A 黑。两态仍可区分，仅角色用色反相。
- **Issue-banner 取消右侧浮动列**：设计稿 issue-banner 有右侧"VOL.IV / 2026-04-22 / CHF 14.—"
  浮动列;本主题用 key-number 承载,改为 body 单段堆叠（375px 移动端更稳）。
- **Pull-quote 25% 左偏移**：设计稿 12 栏 3/12 偏移；本主题用 `margin-left: 25%`
  在 blockquote element 上近似（无栏 grid）。

## 写作纪律（content vs presentation 解耦）

- 不要在 markdown 里手写视觉装饰字符（如 ■ 红方块、章节序号、kicker 标签等）
- 红章 H2 编号由 `decorations.headingPrefix` 注入；作者只写 `## 章节标题`
- 红 W 首字下沉由 `decorations.introDropcap` 注入；作者只写 `::: intro\nW e did not lose...`
- 编辑部注的黑色 header bar 由 `innerStyles.editorNoteKicker` 注入；作者只写 `::: editor-note 编 者 按 · 01`

## sample-swiss-grid.md 容器覆盖

| 设计稿 # | 设计稿组件 | 本主题实现 |
|---|---|---|
| 01 | issue-banner 巨型期号 | `::: key-number NEUE LESE GRAFIK value="Nº04"` |
| 03 | toc 双栏目录 | `:::: toc INDEX · 目次` + `::: toc-item no= page=` |
| 04 | cover-header ESSAY · 01 | `::: section-tag ESSAY · 01` + `::: cover` |
| 05 | byline AUTHOR/EDITOR/SET | `::: author` |
| 06 | intro-para 大字导语 | `::: abstract INDEX · 副刊导读` |
| 07 | drop-cap W | `::: intro\nWe did not lose...`（decorations.introDropcap 注入） |
| 08 | section-heading 红章 H2 | `## 章节名`（decorations.headingPrefix 注入「01」红章） |
| 10 | data-chart FIG.01 | `:::: bar-chart FIG.01 ...` + `::: bar` |
| 12 | h3-heading 2.1/2.2 | `### 子节名`（decorations.headingPrefix arabic-section 注入） |
| 15 | multi-callout INFO/TIP/WARN/STOP | `::: info INFO` ... `::: danger STOP`（admonition: news-row） |
| 17 | code-block 黑底白字 | ``` ```javascript ``` ```（elements.pre __reset 黑底白字） |
| 18 | qa-block Q/A | `::: qa-block READER Q&A q="..."` |
| 19 | editor-note 黑底头 | `::: editor-note 编 者 按 · 01`（innerStyles.editorNoteKicker 黑 bar） |
| 20 | footnotes NOTES | `::: footnotes NOTES` 或 `::: footnotes variant=inline-flow REFERENCES` |
| 22 | cta-bar 三栏 | `::: cta-bar like= star= share=` |
| 23 | qr-follow SUBSCRIBE | `::: qr-follow NEUE LESE GRAFIK kicker= desc=` |
| 24 | footer NEXT/VOL | `::: colophon next= issue=` |
