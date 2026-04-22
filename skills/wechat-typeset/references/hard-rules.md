# 硬约束完整清单

这些规则都由 `validatePersona`、`themeCSS` 生成器、或 `wxPatch` 管线在渲染前/时强制执行。每一条规则背后都对应微信公众号平台的一个具体现象——不是洁癖，是事故。

## 目录

- [色板与状态色](#色板与状态色)
- [字号 / 字体 / 字距](#字号--字体--字距)
- [SVG motif 硬底线](#svg-motif-硬底线)
- [Persona 元信息](#persona-元信息)
- [CSS / HTML 禁区](#css--html-禁区)
- [签名容器白名单](#签名容器白名单)
- [Variants 合法性](#variants-合法性)
- [WxPatch 自动修复](#wxpatch-自动修复)

---

## 色板与状态色

| 规则 | 触发路径 | 为什么 |
| --- | --- | --- |
| `palette` 11 键必齐：`primary` / `secondary` / `accent` / `bg` / `bgSoft` / `bgMuted` / `text` / `textMuted` / `textInverse` / `border` / `code` | `validatePersona` | `buildTheme` 每个 CSS 生成分支都引用这些 token；缺一就会在某个边缘容器（如 `code`、`textMuted` 脚注）瓜子一样掉色。 |
| 每键必须匹配 `^#[0-9a-fA-F]{3,8}$` | `validatePersona` | 允许 3/4/6/8 位 hex，含 alpha。非 hex（rgba / hsl / 颜色名）在 juice 内联后会被微信部分客户端拒绝识别。 |
| `palette.textInverse` 推荐 `#fefefe` 而不是 `#ffffff` | 未强校验（规范） | 微信客户端的 SVG 光栅化器把 `#fff` fill 当作透明处理，`#fefefe` 在视觉上看不出差别但能保留填充。 |
| `status` 四态 `tip` / `info` / `warning` / `danger` 全部必填，每态 `{ accent, soft }` 成对 | `validatePersona` | admonition 容器按 variant id 查 status palette；缺一态会在用户写 `::: warning` 时渲染出空心容器。 |

## 字号 / 字体 / 字距

| 规则 | 触发路径 | 为什么 |
| --- | --- | --- |
| `typography.baseSize` ≥ 14 | 规范 | 375px 移动端视口下，< 14px 的中文会糊成一团；微信客户端的字体渲染对 CJK 字形的最小清晰字号就是 14。 |
| `typography.lineHeight` ≥ 1.5 | 规范 | 中文排版基线，< 1.5 会让密集段落看起来是黑块。 |
| **绝对禁止 `font-family`**（tokens / elements / containers / inline） | `themeCSS` 生成器（抛 `ThemeAuthoringError`）+ `wxPatch.stripFontFamily` | 微信客户端会用系统字体覆盖所有声明，但 `font-family` 留在 inline 里会让 juice 计算样式合并时生成冗余，某些粘贴路径下会导致段落错位。真的需要衬线对比？走 motif 内 `text.fontFamily: 'serif' \| 'sans-serif' \| 'monospace'`——SVG 内部的字体家族不受平台覆盖。 |

## SVG motif 硬底线

| 规则 | 触发路径 | 为什么 |
| --- | --- | --- |
| motif 里的 `text.fontSize` ≥ 14 | `validatePersona`（`MIN_FONT_SIZE=14`） | 微信把 SVG 光栅化后贴到内容流，< 14px 在 375px 屏上糊成一坨。 |
| motif 所有 `strokeWidth` ≥ 1 | `validatePersona`（`MIN_STROKE_WIDTH=1`） | 亚像素描边在光栅化后直接消失。0.5px / 0.8px 描边在设计稿好看，在微信移动端会变成「什么都没有」。 |
| motif `text.fontFamily` 必须是 `'serif' \| 'sans-serif' \| 'monospace'` | `validatePersona` | 平台不保证其他字体可用；三大通用家族是 baseline 保证。 |
| motif 基元类型必须是白名单（`rect` / `circle` / `ellipse` / `path` / `text` / `line` / `group`） | `validatePersona` | 其他 SVG 标签（`filter` / `mask` / `use`）在部分客户端不被光栅化。 |
| `MotifTemplate.placeholders` 必须声明所有在 primitives 里用到的 `{name}` | `validatePersona`（`collectPlaceholders`） | 没声明的占位符运行时会泄漏字面量 `{N}` 到 SVG。 |

## Persona 元信息

| 规则 | 触发路径 | 为什么 |
| --- | --- | --- |
| `id` 必须 kebab-case（`^[a-z][a-z0-9-]*$`） | `validatePersona` | 和目录名绑定（`src/themes/<id>/persona.spec.ts`），也是 `render({ persona: id })` 的查找键。 |
| `id` 等于其 `persona.spec.ts` 所在目录名 | conformance 测试 | 目录名 ≠ id 会让 `themeList` 错位。 |
| `name` / `description` / `audience` 非空 | `validatePersona` | LLM 选型主要靠这三项；空字符串会让 `listPersonas()` 的推荐阶段退化成「按 id 猜」。 |
| `meta.createdAt` 必填 | `validatePersona` | 用于 gallery 里按时间排序，也方便版本管理。 |

## CSS / HTML 禁区

这些特性在 WeChat 公众号富文本里无效或有 bug，pipeline 会在 WxPatch 层剔除。不要在 `elements` / `containers` / `inline` 的 `CSSObject` 里写它们。

| 禁用特性 | 现象 |
| --- | --- |
| `<style>` 标签 | 被微信编辑器吞掉——所有 CSS 必须 juice 内联。 |
| `class` 属性（运行时 CSS 引用） | 样式全部内联；保留的 class 只用作渲染时锚点，粘贴后会被平台剥离。 |
| `position: absolute / fixed / sticky` | 部分客户端错位，pull-to-refresh 时会跳到文档根。 |
| `float: left / right` | 行内 clear 丢失，后续段落全部错位。 |
| `display: flex` + `gap` | `gap` 属性微信 Android 客户端不支持，`wxPatch.patchFlexToFallback` 会把 `display:flex` 降级为 `display:block`（带 `data-wx-keep-flex` 标记的除外）。 |
| `@media` / `@keyframes` / `:hover` | 不生效。 |
| `-webkit-*` 前缀 | juice 保留也无效，徒增字节。 |
| `::before` / `::after` | 部分客户端吞掉，装饰必须走 inline SVG。 |
| `font-family` 任意声明 | 见上。 |

## 签名容器白名单

`spec.signatureContainers` 只能取以下 24 个 id 之一：

```
intro · author · cover
tip · warning · info · danger · note
quoteCard · highlight · compare · steps · sectionTitle
footerCTA · recommend · qrcode · mpvoice · mpvideo
abstract · algorithm · keyNumber · seeAlso · seal · prelude
```

- **camelCase**，不是 kebab-case（kebab 名由 `src/containers/vocabulary.ts` 的 `STYLE_KEY_TO_CONTAINER_NAME` 派生）。
- 项目目前**没有** `algorithm` / `seal` / `prelude` 的 renderer——这些是为未来主题预留的合法 id，但现在没有主题声明它们。**新造主题时不要声明这三个**，要等未来补实现。
- 添加新 id 需要同步改 `src/themes/_shared/spec/types.ts` 的 `SUPPORTED_SIGNATURE_CONTAINERS` 常量 + 加对应 renderer。

## Variants 合法性

`variants` 7 个字段各有固定 id 清单：

```ts
admonition:   accent-bar | pill-tag | ticket-notch | card-shadow |
              minimal-underline | terminal | dashed-border |
              double-border | top-bottom-rule
quote:        classic | magazine-dropcap | column-rule | frame-brackets
compare:      column-card | stacked-row | ledger
steps:        number-circle | ribbon-chain | timeline-dot
divider:      wave | dots | flower | rule | glyph
sectionTitle: bordered | cornered
codeBlock:    bare | header-bar
```

任何其他字符串（典型的 LLM 幻觉：`'glow'` / `'modern'` / `'flat'`）都会在 `validatePersona` 抛错。LLM 生成 variant id 前先 `getVariantIds()` 拿真实白名单。

## WxPatch 自动修复

以下由管线自动处理，不是 LLM / 作者的责任——但知道它们的存在能避免误解「为什么我的 spec 里写的 X 渲染出来没了」：

| Patch 步骤 | 行为 |
| --- | --- |
| `patchListWrap` | 把 `<ul>`/`<ol>` 外包一层 `<section>`，保住列表外边距（微信吞 list 外边距）。 |
| `stripForbiddenAttrs` | 删所有 `id` + `position` 相关 inline 样式。 |
| `stripForbiddenTags` | 删 `<style>` / `<script>` / `<noscript>` / `<link>` / `<meta>` / 非白名单 `<iframe>`（白名单：`v.qq.com` 腾讯视频）。 |
| `stripFontFamily` | 剥所有 inline `font-family`。 |
| `patchSvgUrlQuotes` | SVG 子树内 `url("x")` → `url(x)`（某些客户端识别不了带引号的 url）。 |
| `patchSvgIds` | SVG 子树内删所有 `id`（避免多份同名 SVG 粘贴后 id 冲突）。 |
| `patchFlexToFallback` | `display:flex` → `display:block`（带 `data-wx-keep-flex` 的保留）。 |
| `patchSvgWhiteBg` | SVG 内 `fill="#fff"`/`#ffffff` → `#fefefe`（默认启用，`render({ wxPatch: { svgWhiteBg: false } })` 可关）。 |

幂等——同一段 HTML 走两次 WxPatch 结果不变。
