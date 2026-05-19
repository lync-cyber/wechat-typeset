# 设计稿到实现的降级映射

> **适用范围**：把 [docs/wechat-typeset-container/](wechat-typeset-container/) 下 `content-*.html` / `meta-*.html` / `media.html` 的视觉草案落地为 `src/core/variants/<kind>/<id>.ts`、`src/core/pipeline/containers/*.ts` 实际代码时使用。
>
> **对象**：主题作者 / variant 实现者 / 集成方。**不**面向 markdown 写作者（那条线见 [contract/](contract/)）。
>
> **配套读物**：[theme-authoring.md](theme-authoring.md)（主题完整落地）；本文只覆盖"设计稿现代 CSS → variant 代码"这一段降级。

---

## 1. 为什么需要降级

设计稿（[content-2.html](wechat-typeset-container/content-2.html) 等）大量使用 `display:grid` / `display:flex` / `writing-mode:vertical-rl` / `gap` / `aspect-ratio` —— 这些在桌面浏览器预览没问题，**但微信公众号后台编辑器会剥掉或降级**：

- `display:grid` / `display:flex` → 多数情况降级为 `display:block`，所有子元素竖排堆叠
- `gap` → 完全丢失，子元素紧贴
- `::before` / `::after` → 整段剥除
- `writing-mode` / `transform` → 多数主题里幸存，但跨终端表现不可控
- `aspect-ratio` → 完全不支持

因此 variant 的渲染产物**只能使用以下 CSS 子集**（仓库内已通过 [src/core/css/](../src/core/css/) 与 [tests/unit/wxpaste.spec.ts](../tests/unit/wxpaste.spec.ts) 闸口锁死）：

| 允许 | 备注 |
|---|---|
| `display:table` / `table-cell` / `table-row` | 公众号粘贴后保留度最高，是双栏/网格布局的**唯一**稳定写法 |
| `display:block` / `inline-block` / `inline` | 常规 |
| `margin` / `padding` / `border` / `border-radius` | 常规 |
| `background-color` / `color` / `font-weight` / `font-size` / `line-height` / `letter-spacing` / `text-transform` / `text-align` / `vertical-align` | 常规 |
| `width` / `height`（**像素或百分比**） | 公众号会重写 `min-width` / `max-width`，慎用 |
| `box-shadow:inset` | 微信保留；外阴影易被吃 |
| `<svg>` 内联（不依赖 `::before`） | 装饰元素的唯一稳定路径 |

**禁用**（即使设计稿用了，实现也必须降级）：

`display:grid` / `display:flex` / `gap` / `aspect-ratio` / `writing-mode` / `position:absolute|fixed|sticky` / `transform`（除单字旋转印章这类已验证场景）/ `clip-path` / `mask-*` / `filter` / `backdrop-filter` / `::before` / `::after` / `::first-letter` / `@supports` / `@container` / CSS 变量（公众号会保留 `var()` 字面但取值环境不稳）/ `font-family`（[types.ts:102](../src/core/themes/types.ts) 禁止；themeCSS 生成器会 throw）。

---

## 2. CSS 属性降级表

### 2.1 双栏 / 多栏布局

设计稿常用 `display:grid; grid-template-columns:32px 1fr` 表达"左固定 + 右自动"。

**降级写法**：

```html
<!-- 设计稿 -->
<div style="display:grid; grid-template-columns:32px 1fr; gap:12px;">
  <span>L</span>
  <span>R</span>
</div>

<!-- 实现（公众号兼容） -->
<section style="display:table; width:100%; border-collapse:separate; border-spacing:12px 0;">
  <span style="display:table-cell; width:32px; vertical-align:top;">L</span>
  <span style="display:table-cell; vertical-align:top;">R</span>
</section>
```

- `border-spacing` 替代 `gap`（仅 `display:table` 上生效，且 `border-collapse:separate` 必加）。
- 纵向 `gap` 用 `margin-top:Npx` 加在内部块上。
- 三列以上：每列写 `display:table-cell` + 显式 `width:NN%`，宽度总和 100%（参考 [table-card.ts:160](../src/core/pipeline/containers/table-card.ts)）。

### 2.2 居中 / 对齐

| 设计稿 | 实现 |
|---|---|
| `display:flex; align-items:center;` | `display:table-cell; vertical-align:middle;` |
| `display:flex; justify-content:center;` | `text-align:center`（仅内联元素）/ `margin:0 auto;`（块） |
| `display:flex; align-items:baseline;` | `display:table-cell; vertical-align:baseline;` |

### 2.3 间距

| 设计稿 | 实现 |
|---|---|
| `gap:Npx`（横向） | `border-spacing:Npx 0` on `display:table` parent |
| `gap:Npx`（纵向） | 子元素加 `margin-top:Npx`，首项 `margin-top:0`（用 `:first-child` 不稳，直接渲染时跳过首项 margin） |

### 2.4 装饰元素（替代 `::before` / `::after`）

公众号编辑器会**完全剥除**伪元素。任何"序号徽章 / 引号字符 / 装饰线"的渲染必须走以下路径之一：

1. **SVG 内联**：variant 通过 `svgSlot` 返回 `<svg>...</svg>`，由 [makeVariantContainer.ts:209](../src/core/pipeline/containers/_shared/makeVariantContainer.ts) 插入为兄弟节点。
2. **真实 DOM 节点**：variant 返回 HTML 字符串，包含 `<span class="...badge">N°</span>` 这种字面节点。
3. **`background-image`**（仅静态装饰底纹）：公众号保留，但 URL 必须是仓库内 base64（外链会被屏蔽）。

### 2.5 竖向文字 / 印章旋转

设计稿 `writing-mode:vertical-rl`（[content-2.html:467](wechat-typeset-container/content-2.html) 等）在公众号上**不稳定**——少数客户端版本会无视该声明，导致文字横排错位。

**降级策略**（按可信度从高到低）：

1. **单字 inline-block 堆叠**：把"问 / 答 / 註"拆为 `<span style="display:block;text-align:center;">问</span>` 等多行 block，配合外层固定宽度（如 `width:1em`）。
2. **放弃竖写**：横向小标签 + letter-spacing 加大模拟"庄重感"。这是 [qa-block 当前实现](../src/core/pipeline/containers/databrief/editorial.ts) 的策略。
3. **保留 `writing-mode`** + 已验证主题白名单：如确需，加入 [tests/unit/wxpaste.spec.ts](../tests/unit/wxpaste.spec.ts) 的 allowlist 并附测试用例。

`transform:rotate(N°)` 已在 admonition `mook-tag` / `stamped-banner` 等多处验证可用——**仅限旋转角度 ≤ ±5° 的单字徽章**，超过会触发字形抗锯齿失真。

### 2.6 圆形 / 几何形装饰

设计稿 04·A 系列大量出现"圆形边框 vs 实心方块"对比。

| 设计稿 | 实现 |
|---|---|
| `border-radius:50%` 圆 | 同名属性，公众号保留 |
| `aspect-ratio:1` 强制正方形 | 显式写 `width:Npx; height:Npx` |
| `clip-path:circle(...)` | **禁用**——用 SVG `<circle>` 替代 |
| `clip-path:polygon(...)`（三角/几何形） | **禁用**——用 SVG `<polygon>` 替代 |

### 2.7 网格 / 矩阵（设计稿 04·B MATRIX）

`display:grid; grid-template-columns:repeat(4, 1fr);` 这类网格在公众号无对应降级。

**降级**：
- 行：`display:table-row`，每个单元格 `display:table-cell; width:25%;`
- 多行：每行独立 `<section style="display:table-row">`，外层 `display:table`
- 行列标签：占位 cell（首列保留为 label 列），不用 `grid-row` 跨行

跨行 / 跨列（colspan / rowspan）：**HTML `<span>` 不支持**——必须用 `<table>` 真实标签，但这要修改 markdown-it-container 输出，目前未实现。Phase P2.18 matrix variant 会重新评估。

---

## 3. 设计稿 [tokens.css](wechat-typeset-container/tokens.css) → [ThemeTokens](../src/core/themes/types.ts) 映射

设计稿与代码 token 体系**完全正交**：设计稿是面向"画布原型预览"的单主题 CSS，[ThemeTokens](../src/core/themes/types.ts) 是面向"4-themes × N-variant"运行时主题字典。**variant 实现时不要直接 import 设计稿 CSS 变量**——用下表把字面色翻译到 `ctx.tokens.colors.xxx`。

### 3.1 灰阶（中性色）

| 设计稿 | 字面值 | 用途 | ThemeTokens 字段 |
|---|---|---|---|
| `--ink-1` | `#1a1a1a` | 标题、关键文字 | `colors.text` |
| `--ink-2` | `#333333` | 正文 | `colors.text`（深底主题用 `colors.textInverse`） |
| `--ink-3` | `#595959` | 次要文字、说明 | `colors.textMuted` 或 `colors.textCaption`（图注/脚注语境） |
| `--ink-4` | `#8c8c8c` | 标签、辅助 | `colors.textMuted` |
| `--ink-5` | `#bfbfbf` | 装饰线、占位 | `colors.border` |

注意：设计稿 `--ink-1..5` 是**单调灰阶**，每个主题对 muted/border 的实际灰度略不同（如 swiss-grid 用 `#333333` 作 `textCaption`，与 `--ink-2` 不同字面但语义对齐）。**翻译以语义为准**，不复制字面色。

### 3.2 纸面背景

| 设计稿 | 字面值 | 用途 | ThemeTokens 字段 |
|---|---|---|---|
| `--paper` | `#ffffff` | 主背景 | `colors.bg` |
| `--paper-soft` | `#fafaf9` | 微差背景 | `colors.bgSoft` |
| `--paper-gray` | `#f5f5f4` | 引用块底色 | `colors.bgMuted` 或 `colors.quoteCardBg` |
| `--paper-deep` | `#1a1a1a` | 反白卡片底 | `colors.textInverse` 当 bg / 主题级深色卡需另起字段 |

设计稿 4 主题的纸色字面（[content-2.html](wechat-typeset-container/content-2.html) 内联）：

| 主题 | 字面 bg | 在 spec/palette 中表达 |
|---|---|---|
| 编辑部 t1 | `#fbfaf7` | `colors.bg` |
| 宋本批注 t2 | `#f3eada` | `colors.bg`（暖米卡纸） |
| 博物笔记 t3 | `#ece4d2` | `colors.bg`（自然米） |
| 包豪斯文摘 t4 | `#efece5` | `colors.bg`（冷米） |

### 3.3 主题色（accent）

| 设计稿 | 字面值 | 用途 | ThemeTokens 字段 |
|---|---|---|---|
| `--accent` | `#B83A2E` | 编辑红 | `colors.primary` 或 `colors.accent`（看主题角色） |
| `--accent-soft` | `rgba(184,58,46,.10)` | 软底 | `colors.status.tip.soft` 等 / 主题级 inline rgba |
| `--accent-dim` | `rgba(184,58,46,.20)` | 描边 | 仅 inline 使用，不进 token |

设计稿 4 主题 accent 字面（[content-2.html](wechat-typeset-container/content-2.html) 内联，与全局 `--accent` **不一致**）：

| 主题 | accent 字面 | spec/palette 字段 |
|---|---|---|
| 编辑部 t1 | `#B83A2E` 编辑红（与全局一致） | `colors.primary` |
| 宋本批注 t2 | `#a03a2a` 朱红（偏暗） | `colors.primary` |
| 博物笔记 t3 | `#8b4a3a` 棕褐 | `colors.primary` 或 `colors.secondary` |
| 包豪斯文摘 t4 | `#c8412e` 包豪斯红（偏亮） | `colors.primary` |

**关键纪律**：写 variant 时**不要写 `#a03a2a` 字面**；写 `${ctx.tokens.colors.primary}`，让主题在自己的 `persona.data.ts` 里声明字面色。这是 [theme-token-flow lint](../src/core/themes/_shared/) 抓的核心规则。

### 3.4 字体栈

设计稿 `--serif` / `--sans` / `--mono` 是面向预览的字体声明。

**实现侧禁止 `font-family`**——见 [types.ts:102](../src/core/themes/types.ts)。理由：微信公众号客户端会用系统字体覆盖，themeCSS 生成器扫到 `font-family` 直接 throw `ThemeAuthoringError`。

variant 想表达"Lora italic 大号"这类设计稿要求时，**只能用字号 + font-weight + font-style + letter-spacing 模拟语感**——具体字体由公众号读者端决定。

特例：等宽字（`<code>` / monospace 标签）可以用 `font-family:Menlo,Monaco,monospace`（[key-value.ts:271](../src/core/variants/table-card/key-value.ts) 已采用）——`monospace` 关键字在所有端有兜底，不依赖具体字体。

### 3.5 字号尺度

| 设计稿 | 字面值 | ThemeTokens 字段 |
|---|---|---|
| `--fs-display` | 56px | inline 使用（kpi-dashboard 大数字等场景），不进 typography token |
| `--fs-stat` | 44px | inline / `typography.h1Size`（display 主题） |
| `--fs-h2` | 22px | `typography.h2Size` |
| `--fs-h3` | 18px | `typography.h3Size` |
| `--fs-body` | 16px | `typography.baseSize` |
| `--fs-small` | 14px | inline / `typography.monoSize` |
| `--fs-micro` | 12px | inline / `typography.captionSize` |

设计稿 `--fs-display` 56px 在公众号阅读宽度（≤ 440px）下偏大，落地时建议下调到 40-48px。

### 3.6 行高

| 设计稿 | 字面 | ThemeTokens |
|---|---|---|
| `--lh-tight` | 1.25 | `elements.h2.lineHeight` 等 |
| `--lh-base` | 1.75 | `typography.lineHeight` |
| `--lh-loose` | 2.0 | 大段 quote / pull-quote inline |

### 3.7 一段示例：设计稿 02·A（compare 甲乙）→ variant code

设计稿（节选）：

```html
<div style="display:grid; gap:10px; grid-template-columns:1fr 1fr;
            background:#f3eada; padding:14px;">
  <div style="background:#a03a2a; color:#fff; padding:6px 10px;">甲</div>
  <div style="border:1.5px solid #a03a2a; padding:6px 10px;">乙</div>
</div>
```

variant `render(ctx)` 返回：

```typescript
{
  wrapperCSS: [
    'display:table',
    'width:100%',
    'border-collapse:separate',
    'border-spacing:10px 0',
    `background-color:${ctx.tokens.colors.bg}`,  // 主题 bg = #f3eada（宋本主题在 palette 声明）
    'padding:14px',
  ].join(';'),
}
```

而"甲实心 / 乙描边"两侧的徽章样式写在 pros/cons 子容器对应的 variant args 里（[makeVariantContainer.ts](../src/core/pipeline/containers/_shared/makeVariantContainer.ts) `args` 注入路径），**字面色不出现在 variant 里**：

```typescript
// pros (甲) 列
{ background-color: ctx.tokens.colors.primary, color: ctx.tokens.colors.textInverse }
// cons (乙) 列
{ background: 'transparent', border: `1.5px solid ${ctx.tokens.colors.primary}`,
  color: ctx.tokens.colors.primary }
```

---

## 4. 设计稿 4 主题 → 现有实现主题候选

设计稿 t1-t4 是**画布原型主题**（预览级），代码 [src/core/themes/](../src/core/themes/) 是**生产主题**。两边没有 1:1 绑定。

| 设计稿主题 | 视觉特征 | 实现侧候选 | 备注 |
|---|---|---|---|
| 编辑部 t1 | 暖白纸 `#fbfaf7` + 编辑红 `#B83A2E` + Serif 序号 | [editorial-mook](../src/core/themes/editorial-mook/) / [default](../src/core/themes/default/) | editorial-mook 已接近 |
| 宋本批注 t2 | 暖米卡 `#f3eada` + 朱红 `#a03a2a` + CJK 印章 | 暂无对应——可能要新建主题或扩展 [literary-humanism](../src/core/themes/literary-humanism/) | 古典批注调，类似 [literary-humanism](../src/core/themes/literary-humanism/) palette 走向 |
| 博物笔记 t3 | 自然米 `#ece4d2` + 棕褐 `#8b4a3a` + 拉丁学名 italic | 暂无对应——可能扩展 [academic-frontier](../src/core/themes/academic-frontier/) | 学术+博物志气质 |
| 包豪斯文摘 t4 | 冷米 `#efece5` + 黑 `#111` + 包豪斯红 `#c8412e` + Sans + 几何符号 | [swiss-grid](../src/core/themes/swiss-grid/) / [brutalist](../src/core/themes/brutalist/) | swiss-grid 已是 Neue Grafik 系，brutalist 是粗野变体 |

**重要**：这是**初步候选**，不是决策。新主题落地走 [theme-authoring.md](theme-authoring.md) + persona spec 路径，与本映射独立。本表的作用仅是**让 variant 实现者在写 thumbnail / snippets 时知道把示例挂到哪个主题**。

---

## 5. variant 实现 checklist

新增 / 修改 variant 时，逐条勾选：

- [ ] **CSS 子集**：未使用 §1 禁用清单中的属性（grid/flex/gap/aspect-ratio/伪元素 等）
- [ ] **无 font-family**：除等宽场景的 `monospace` 关键字
- [ ] **色值从 token**：variant `render(ctx)` 返回的 CSS 字符串里没有字面 hex / rgb（除 `transparent`、`currentColor`、`rgba(0,0,0,*)` 这类语义常量）
- [ ] **wrapper-only**：variant 只负责 `wrapperCSS` / 可选 `titleCSS` / `bodyCSS` / `svgSlot` 四段产物（[makeVariantContainer.ts:74](../src/core/pipeline/containers/_shared/makeVariantContainer.ts)）
- [ ] **thumbnail**：导出 `thumbnail(args)` 函数返回 SVG 字符串，args 接受 `accent / soft / text` 三种主题预览色（参考 [_thumb.ts](../src/core/variants/_thumb.ts)）
- [ ] **snippet**：在 `snippets:` 数组里加至少一个示例 markdown，`presetId` 走 `<kind>-<variant-id>` 格式
- [ ] **快照**：运行 `pnpm test:snap` 更新所有主题的渲染快照（如 variant 进入了某主题的 spec.variants）
- [ ] **wxpaste 测试**：如新增 variant 用了边界 CSS（box-shadow / transform 等），加 `tests/unit/wxpaste.spec.ts` allowlist

---

## 6. 边界与例外

- **本映射不替代 [contract/](contract/) 作者契约**——后者是 markdown 作者层，前者是实现层。
- **设计稿与实现的差异是常态**：完全像素级还原既不可能（公众号粘贴损耗）也不必要。本映射的目标是让降级**有据可查**，而不是消除差异。
- **新发现的兼容性问题**：发现公众号会剥的属性，更新本文 §1 + [tests/unit/wxpaste.spec.ts](../tests/unit/wxpaste.spec.ts) allowlist，两处同步。
