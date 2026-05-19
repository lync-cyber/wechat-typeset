# 画布设计稿 → 项目集成指南

把 `content-1/2/3/4.html`、`meta-1/2.html`、`media.html` 里的容器卡片设计落地到 `src/core/variants/<kind>/<variant>.ts` 的实操手册。**面向**：variant 实现者、主题作者、LLM 协作者（claude code 等）。

本指南只覆盖"从画布静态 HTML 到运行时 variant 代码"这一段。CSS 子集降级规则见 [../design-to-impl-mapping.md](../design-to-impl-mapping.md)；写作契约见 [../contract/](../contract/)。

---

## 1. 全景：7 份画布 HTML 分别承载什么

| 文件 | 容器（markdown fence） | 集成路径 |
|---|---|---|
| [content-1.html](content-1.html) | admonition · note · quote-card · highlight · pull-quote | variant 系 ① |
| [content-2.html](content-2.html) | compare · steps · dialogue · qa-block · table-card | variant 系 ① |
| [content-3.html](content-3.html) | gallery · bar-chart · announcement · recommend · qrcode | variant 系 ① + 无 variant 系 ② |
| [content-4.html](content-4.html) | divider · section-title · footer-cta · footnotes | variant 系 ① |
| [meta-1.html](meta-1.html) | cover · intro · abstract · toc · masthead · editorial-header | 单卡组件 ③ |
| [meta-2.html](meta-2.html) | author · author-bio · byline · section-tag · colophon · key-number | 单卡组件 ③ |
| [media.html](media.html) | voice-card · video-card · image-caption | 单卡组件 ③ |

三种集成路径详见 [§3](#3-三种集成路径)。

每张卡片在画布里通过 `.variant[data-motif=...]` 标注，内含 `.v-label .var-id`（如 `02·B PAPER SLIP`）和 `.phone.tN .phone-inner`（4 主题切片 + 真实预览框）。

---

## 2. 集成状态盘点

### 2.1 现状

**已对齐**（设计稿 IR 全部能找到对应 `.ts` 实现，并已纳入 [`tests/unit/visual-parity-geometry.spec.ts`](../../tests/unit/visual-parity-geometry.spec.ts) 几何断言）：

| kind | IR 数 | 实现数 | 状态 |
|---|---|---|---|
| admonition | 8 | 25 | 全部对应 + 17 个早期版本 variant 仍保留 |
| note | 8 | 15 | 全部对应 |
| quote | 8 | 14 | 全部对应 |
| highlight | 8 | 9 | 全部对应 |
| pull-quote | 8 | 12 | 全部对应 |

**待集成**（设计稿存在 IR，实现侧缺少 `src/core/variants/<kind>/<id>.ts` 或命名不对齐）：

| kind | 待补 variant id（来自 var-id 推断） |
|---|---|
| compare | numbered-cols / interleaved-rows / specimen-ab / measurement / circle-square |
| steps | large-numeral / timeline-row / ruler-ticks / field-stages / geometric-chain / block-stack |
| dialogue | screenplay / short-initial / specimen-tag / shape-speaker / code-name |
| qa-block | circle-vs-square（实现是 `circle-square.ts`，命名要对齐） |
| table-card | threeline-table（实现是 `three-line-table.ts`）/ specimen-table / sample-log / grid-block |
| gallery | newspaper-grid / strip-legend / sample-plate / folio-strip / asymmetric-grid / circle-frame |
| announcement | masthead-bar / index-card / field-notice / stamp-card / red-square-burst / black-plate |
| recommend | numbered-list / thumbnail-rows / folio-refs / file-cards / shape-index / number-stack |
| qrcode | news-card / index-slot / field-collate / specimen-pin / geometric-card / corner-mark |
| divider | double-rule / three-bullets / ruler-mark / folio-break / shape-trio / thick-bar |
| section-title | h2-numeral / h3-inline / h2 / h3 / h2-folio-head / h3-binomial / h2-geometric / h3-numbered |
| footer-cta | subscription-call / coupon-card / field-stub / specimen-voucher / shape-cta / black-closer |
| footnotes | numbered-list / column-gloss / reference-table / field-appendix / mono-list / indent-block |

特殊：[content-3.html](content-3.html) 的 `bar-chart` 6 个变体（field-graduate / hollow-bars / rule-bars / stacked-rows / stepped-block / tick-ruler）**不**走 variant 系——见 [§3.2](#32-路径-2--无-variant-系容器)。

meta-1 / meta-2 / media.html 的 21 类容器全部走 [§3.3](#33-路径-3--单卡组件meta--media) 的"单卡组件"路径。

### 2.2 派生现状的命令

```powershell
pnpm tsx tools/extract-design-ir.ts --check
```

输出每行 `[warning] content-X.html:NN variant 'kind/id' 未在 src/core/variants/<kind>/<id>.ts 实现（label="..."）`。**这是唯一的事实来源**——本表会随设计稿/实现演进过期，**别用本表做决策，跑命令**。

---

## 3. 三种集成路径

### 3.1 路径 ① · variant 系容器（compare / steps / divider / 等 14 类）

适用于 markdown fence 是 `:::` 形式、注册在 [`src/core/variants/<kind>/_all.ts`](../../src/core/variants/) 的容器。集成 = 写一个 variant.ts、注册、跑工具。

**6 步标准流程**：

#### 步骤 1 · 读 IR

```powershell
# 没生成过就先跑一遍
pnpm tsx tools/extract-design-ir.ts
# 然后看你要集成的卡片
type docs\generated\design-ir\compare.numbered-cols.json
```

IR 给出 wrapper 几何、各 slot 的 box（display/width/padding/fontSize/lineHeight/color literal/tokenSuggestion）、装饰锚点。LLM 直接读这个 JSON，**不要**对着 [content-2.html](content-2.html) 里的 inline-style 现场翻译。

#### 步骤 2 · 写 variant.ts

`src/core/variants/<kind>/<id>.ts`，default-export 一个 [`VariantDef`](../../src/core/variants/_core.ts)。骨架参考最接近的已实现 variant（如 [admonition/paper-slip.ts](../../src/core/variants/admonition/paper-slip.ts) 是双栏 + 竖排签条的范例）。

关键约束（从 IR 翻译到 variant render 输出）：

- **不**写字面 hex/rgb，全部走 `ctx.tokens.colors.xxx`（IR 里 `tokenSuggestion` 字段已经告诉你映射到哪个 token）
- **不**用 `display:flex` / `display:grid` / `gap` / `aspect-ratio`（公众号粘贴会剥成 block）
- 双栏布局走 `display:table` + `table-layout:fixed` + 子 cell `display:table-cell` + `box-sizing:border-box` + 显式 `width`
- 竖排（`writing-mode:vertical-rl`）必须显式 `line-height`（1.0–1.3）
- 装饰元素：`::before` / `::after` 被剥，改用 `svgSlot` 内联 SVG 或真实 DOM 节点
- `font-family` 全局禁用（除等宽场景的 `monospace` 关键字）

详细降级表见 [../design-to-impl-mapping.md §2](../design-to-impl-mapping.md)。

#### 步骤 3 · 注册到 _all.ts

把新 variant `import` 加到 [`src/core/variants/<kind>/_all.ts`](../../src/core/variants/) 的聚合数组里。`VARIANT_IDS.<kind>` 会自动派生新 id（如有 conformance 守卫会提示加 `experimental: true` + `experimentalSince`）。

#### 步骤 4 · 命名对齐（如有偏差）

IR 推断的 variant id（`var-id` 文本 → kebab）可能与历史实现命名不一致：

| 设计稿 var-id | IR 推断 | 实现侧已用名 | 处置 |
|---|---|---|---|
| `01·A THREE-LINE TABLE` | `threeline-table` | `three-line-table.ts` | 把 IR 改名（重提取后命名稳定）**或**实现侧改名 |
| `04·A CIRCLE vs SQUARE` | `circle-vs-square` | `circle-square.ts` | 同上 |

推荐**改 IR 推断**（即在 var-id 文本里规范化），不要改实现——实现命名进了 [VARIANT_IDS](../../src/core/themes/types.ts) 后改动是破坏性的。

#### 步骤 5 · 跑 lint（编译期守卫）

```powershell
pnpm tsx tools/lint-variant-css.ts --files src/core/variants/<kind>/<id>.ts
```

5 条规则按"翻译陷阱"频率排：

| 规则 | 含义 |
|---|---|
| banned-modern-css | 写了 flex / grid / gap / aspect-ratio |
| table-needs-fixed-layout | `display:table` 没配 `table-layout:fixed` |
| vertical-needs-explicit-lh | `writing-mode:vertical-rl` 没显式 `line-height` |
| table-cell-needs-border-box-when-width | `display:table-cell` + `width:N` 没配 `box-sizing:border-box` |
| no-literal-color | render 返回字符串含 `background/color:#xxxxxx` |

#### 步骤 6 · 跑 geometry diff（运行期验证）

```powershell
pnpm tsx packages/cli/bin/wechat-typeset.mjs "variant diff-geometry" `
  --kind <kind> --variantId <id>
```

输出 JSON：

```json
{
  "diffs": [
    { "path": "slot[0/leftCol]", "prop": "fontSize",
      "baseline": "14px", "actual": "16px", "severity": "warning" }
  ],
  "summary": { "error": 0, "warning": 1, "info": 11 }
}
```

读 `summary.error === 0` 算几何对齐。剩余 warning 是"主题字面色与设计稿不同 / 数值偏离"——逐条判断保留还是修正。**不要看截图，看 JSON**。

---

### 3.2 路径 ② · 无 variant 系容器（bar-chart）

[content-3.html](content-3.html) 的 6 个 bar-chart 设计稿对应**单个**容器实现：[src/core/pipeline/containers/databrief/metrics.ts](../../src/core/pipeline/containers/databrief/metrics.ts)（约 L280）。这个容器的"变体"不是 variant SPI，而是 markdown 作者通过 `attrs` 传配置（如 `labelWidth` / `valueWidth`）来产生不同视觉。

集成 = 给 `barChartContainer` 增加配置维度，覆盖设计稿 6 种几何：

1. 读 6 份 IR（`docs/generated/design-ir/bar-chart.*.json`），列出"6 种几何的关键差异点"——条形高度 / 是否带刻度 / 是否反白 / 数字位置等
2. 设计 attrs schema 扩展（如 `chartStyle: 'graduate' | 'hollow' | 'rule' | 'stacked' | 'stepped' | 'tick'`）
3. 在 `barChartContainer.open()` 里按 `attrs.chartStyle` 分支生成不同 inline-style
4. lint / diff 工具**不直接适用**——bar-chart 不进 VARIANT_IDS。但 lint CSS 子集规则（路径 ① 步骤 5）依然可用，对着 metrics.ts 跑

⚠️ bar-chart 集成不在 [`tools/extract-design-ir.ts`](../../tools/extract-design-ir.ts) 的 `KIND_TO_DIR` 里，IR check 时会被跳过 variant-存在性校验——这是预期。

---

### 3.3 路径 ③ · 单卡组件（meta / media）

[meta-1.html](meta-1.html)、[meta-2.html](meta-2.html)、[media.html](media.html) 的 21 类容器（cover / intro / abstract / toc / masthead / editorial-header / author / author-bio / byline / section-tag / colophon / key-number / voice-card / video-card / image-caption）是"文章入口/署名/多媒体"这类整版组件。它们与正文 variant 不同：

- **不**走 [VARIANT_IDS](../../src/core/themes/types.ts)（一篇文章至多出现一次）
- **可能**走 [`src/core/pipeline/containers/`](../../src/core/pipeline/containers/) 直接渲染，**也可能**走 [`src/core/variants/<kind>/`](../../src/core/variants/) 但 `kind: 'none'`（参见 [_core.ts:259](../../src/core/variants/_core.ts) `VariantDef` 注释）
- 设计稿仍按 `data-motif` + `.v-label` 标注，8 个变体覆盖 4 主题（与正文容器同节奏）

**当前状态**：[tools/extract-design-ir.ts](../../tools/extract-design-ir.ts) 的 `DEFAULT_HTML_FILES` 只列了 content-1..4，**meta-* / media.html 暂未跑过 IR 提取**。要集成前先扩 DEFAULT_HTML_FILES + 在 `FENCE_TO_KIND` 字典里给这 21 个 fence 名加映射：

```typescript
// tools/extract-design-ir.ts FENCE_TO_KIND（补充）
const FENCE_TO_KIND: Record<string, string> = {
  // ...
  cover: 'cover',
  intro: 'intro',
  abstract: 'abstract',
  toc: 'toc',
  masthead: 'masthead',
  'editorial-header': 'editorial-header',
  author: 'author',
  // ... 同样的形态补完
  'voice-card': 'voice-card',
  'video-card': 'video-card',
  'image-caption': 'image-caption',
}
```

之后流程类似路径 ①，但**注册位置不同**——`kind: 'none'` 走 [`_all.ts`](../../src/core/variants/) 里的 `none-` 前缀分组（参考 [intro / cover / author](../../src/core/variants/_core.ts) 在 `_core.ts` 末尾的说明）。

⚠️ "单卡组件"路径仍在演进中。先集成 1-2 个（推荐从 [intro](meta-1.html) 或 [byline](meta-2.html) 起步——结构最简单）跑通整条链路，再批量做。

---

## 4. 集成 checklist（每条机器可验）

新增一个 variant 时逐条勾选：

- [ ] **IR 已生成**：`docs/generated/design-ir/<kind>.<id>.json` 存在
- [ ] **variant.ts 已写**：`src/core/variants/<kind>/<id>.ts`
- [ ] **已注册**：导入到 `<kind>/_all.ts`
- [ ] **lint 0 error**：`pnpm tsx tools/lint-variant-css.ts --files <path> --check` 退出 0
- [ ] **geometry diff 0 error**：`variant diff-geometry --kind <k> --variantId <id>` 的 `summary.error === 0`
- [ ] **snippets 已声明**：`VariantDef.snippets` 至少一条（[`tests/unit/variant-sanity.spec.ts`](../../tests/unit/variant-sanity.spec.ts) 守 case 数）
- [ ] **designedFor 已声明**：`meta.designedFor: [<themeId>]`（来自 IR 的 `recommendedThemeId`）
- [ ] **快照已更新**：`pnpm vitest run tests/unit/variant-sanity.spec.ts -u`
- [ ] **几何 spec 通过**：`pnpm vitest run tests/unit/visual-parity-geometry.spec.ts`
- [ ] **typecheck/lint 通过**：`pnpm typecheck:core && pnpm lint:core`

---

## 5. 翻译模式速查

把这张表与 IR JSON 对照，覆盖绝大多数从 inline-style 到 variant render 的翻译场景。完整版见 [../design-to-impl-mapping.md](../design-to-impl-mapping.md)。

### 5.1 双栏 / 多栏

```css
/* 设计稿 inline-style（content-*.html） */
display:flex; gap:14px;
  div { flex-shrink:0; width:38px; ... }
  div { flex:1; ... }
```

→

```typescript
// variant render 输出
{
  wrapperCSS: `display:table;table-layout:fixed;width:100%;...`,
  svgSlot: `<div style="display:table-cell;vertical-align:top;width:38px;box-sizing:border-box;...">...</div>`,
  bodyCSS: `display:table-cell;vertical-align:top;padding-left:14px;...`,
}
```

### 5.2 竖排签条

```css
/* 设计稿 */
writing-mode:vertical-rl; font-size:14px; padding:10px 6px; ...
```

→

```typescript
// variant render
svgSlot: `<div style="display:table-cell;vertical-align:top;width:32px;box-sizing:border-box;writing-mode:vertical-rl;line-height:1.25;font-size:16px;padding:12px 6px;...">${escText(slipText)}</div>`,
```

注意：`line-height:1.25` 必须显式（继承的 1.75 会把行盒物理宽顶到 28px+）；`box-sizing:border-box` 让 padding 计入 `width:32px`。

### 5.3 旋转印章

设计稿 `transform:rotate(-3deg)` 在主题白名单内可保留（已验证：vermilion-seal、mook-tag、stamped-banner）。

```typescript
svgSlot: `<div style="position:absolute;top:4px;right:6px;width:42px;height:42px;border:2.5px solid ${c.primary};color:${c.primary};text-align:center;line-height:38px;transform:rotate(-3deg);">告</div>`,
```

⚠️ `position:absolute` 需要父级有非 absolute 锚点（实现侧 wrapper 用 `position:relative`），且单字旋转角度 ≤ ±5°。

### 5.4 颜色 token 化

IR 给每个字面色配了 `tokenSuggestion`：

```json
{ "background": { "literal": "#f3eada", "tokenSuggestion": "tokens.colors.bg" } }
```

→ variant render 写 `background-color:${ctx.tokens.colors.bg}`。**永远**不写字面 hex。

`tokenSuggestion` 的来源是从 18 主题 [PersonaSpec.palette](../../src/core/themes/_shared/spec/types.ts) 自动派生的反查表（[`src/core/design-ir/build-token-index.ts`](../../src/core/design-ir/build-token-index.ts)）+ 画稿原型字典 fallback。改了主题 palette 后下一次 `extract-design-ir` 即生效，不需要手抄。

未命中（`tokenSuggestion: null`）时调 MCP `palette lookup-token` 拿建议：

```powershell
pnpm tsx packages/cli/bin/wechat-typeset.mjs "palette lookup-token" `
  --literal "#a03a2a" --themeId literary-humanism
```

输出含 `preferred` / `matches` / `alternatives` / `advice` 四段，`advice` 字段对 LLM 直接可读（"在 variant render 中写 `${ctx.tokens.colors.accentClassical}`" 之类）。

如果命令也找不到（跨 18 主题都未登记）：把字面加到该主题 `persona.data.ts` 的 palette 语义槽（`textCaption` / `highlightBg` / `codeBg` / `quoteCardBg` / `noteBorder` / `accentClassical` / `accentNaturalist`）。**不要**改 [`literal-to-token.ts`](../../src/core/design-ir/literal-to-token.ts) ——它的画稿快照表只锁画稿原型字面，主题字面靠 palette 自动派生。

### 5.5 装饰短线 / 几何形

```css
/* 设计稿 */
.tick { display:inline-block; border-left:1px solid #5e6f6a; height:6px; }
```

→ 实现侧两条路径：
- 简单：直接拼 inline `<span>` 节点（已验证：admonition/field-tag）
- 复杂（多边形/弧形）：用 inline SVG 走 `svgSlot`（已验证：admonition/triangle-top）

⚠️ 不要用 `clip-path` / `mask-*`——公众号会剥。

---

## 6. 工具速查

| 命令 | 何时用 |
|---|---|
| `pnpm tsx tools/extract-design-ir.ts` | 设计稿改了 / 新加 IR 字典 / 集成新 variant 前 |
| `pnpm tsx tools/extract-design-ir.ts --check` | CI 校验"IR 与实现是否同步" |
| `pnpm tsx tools/lint-variant-css.ts` | 看仓库整体健康度（默认 exit 0） |
| `pnpm tsx tools/lint-variant-css.ts --files <ts> --check` | 单 variant 上手前自检 |
| `pnpm tsx packages/cli/bin/wechat-typeset.mjs "variant diff-geometry" --kind <k> --variantId <id>` | LLM 写完 variant.ts 自我验证的核心命令 |
| `pnpm tsx packages/cli/bin/wechat-typeset.mjs "palette lookup-token" --literal <hex> --themeId <id>` | 字面 hex → ctx.tokens 路径反查；写 variant.ts 时拿确定性建议 |
| `pnpm preview:variant <kind>.<id>` | 浏览器里看渲染效果（与 diff 工具互补，diff 看数值/preview 看人眼） |
| `pnpm vitest run tests/unit/visual-parity-geometry.spec.ts` | 几何 spec（数据驱动，wrapper 层断言） |
| `pnpm vitest run tests/unit/visual-parity.spec.ts` | 文本/装饰锚点 spec（contains-check，与几何 spec 互补） |

集成时的最小 loop：

```powershell
# 1. 改 variant.ts
# 2. lint 自检
pnpm tsx tools/lint-variant-css.ts --files src/core/variants/<kind>/<id>.ts --check
# 3. 看几何 diff
pnpm tsx packages/cli/bin/wechat-typeset.mjs "variant diff-geometry" --kind <kind> --variantId <id>
# 4. 读 diff JSON，挑差异最大的一处 prop 改，回到 1
```

每轮只改 1-2 个属性。**不要**一次改 5 处然后看截图——这正是设计 IR / lint / diff 三件套要消除的反馈链路问题。

---

## 7. FAQ

**Q: IR 推断的 variant id 和我想叫的名字不一样怎么办？**
看 [§3.1 步骤 4](#步骤-4--命名对齐如有偏差)。优先改 var-id 文本（人写的画稿标签），不要改实现侧已注册的 id。

**Q: 设计稿用了 `clip-path` / `mask` / `aspect-ratio`，我必须保留吗？**
不能。公众号会剥。改用 SVG `<polygon>` / `<clipPath>`（path/mask 内嵌 SVG）/ 显式 `width: Npx; height: Npx`。详见 [../design-to-impl-mapping.md §2.6](../design-to-impl-mapping.md)。

**Q: 跑 geometry diff 看到一堆 info / warning，但 error=0，要修吗？**
- `info` 多数是"设计稿用现代 CSS，实现侧合规降级"——预期，不用动
- `warning` 含三类：(1) 数值偏离设计稿（如 fontSize 14→16）—— 看是不是有意为之；(2) 颜色字面差但 token 一致 —— 不用动；(3) 字段在 actual 多/少 —— 评估必要性
- `error` 是"几何严重偏离 / 漏写关键属性"，必须修

**Q: 设计稿在 [content-*.html](content-1.html) 里画了一个变体，但我跑 `extract-design-ir.ts --check` 没看到对应 warning——为什么？**
两种可能：(1) 已经实现了（去 `src/core/variants/<kind>/` 找）；(2) 设计稿那张卡缺 `.v-label .var-id` 或 `data-motif`——IR 提取按这两个 selector 取卡，缺一就跳过。检查画稿 DOM 结构。

**Q: meta-* / media.html 的 21 类容器我现在能集成吗？**
能，但要先扩 [tools/extract-design-ir.ts](../../tools/extract-design-ir.ts) 的 `DEFAULT_HTML_FILES` 与 `FENCE_TO_KIND`（见 [§3.3](#33-路径-3--单卡组件meta--media)），让 IR 提取覆盖到这三份 html。之后流程同正文 variant，但注册位置和 `kind` 标注略不同。

**Q: 集成一个 variant 大概要多久？**
熟悉降级规则后，简单变体（双栏、单色装饰）20–40 分钟；含 SVG 几何或竖排的中等变体 60–90 分钟。第一次集成会显著慢——读完 [../design-to-impl-mapping.md](../design-to-impl-mapping.md) 整篇 + 这份 README 后会快很多。

---

## 8. 相关文档

- [../design-to-impl-mapping.md](../design-to-impl-mapping.md) —— CSS 降级规则、token 翻译表的完整版
- [persona-contracts.md](persona-contracts.md) —— 4 主题跨容器的视觉边界（叙述强度 / 手法防重复）
- [../../src/core/design-ir/](../../src/core/design-ir/) —— IR 类型 / 字典 / lint 规则的代码本体
- [../../tests/unit/visual-parity-geometry.spec.ts](../../tests/unit/visual-parity-geometry.spec.ts) —— 几何断言 spec
- [../../tests/unit/visual-parity.spec.ts](../../tests/unit/visual-parity.spec.ts) —— 文本/装饰锚点 spec
- [../../tests/unit/build-token-index.spec.ts](../../tests/unit/build-token-index.spec.ts) —— 18 主题 token 反查表 spec
