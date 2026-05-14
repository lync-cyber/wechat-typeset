# PersonaSpec 11 字段解剖（独家 reference）

> 解释 `PersonaSpec` 顶层 11 个字段各自的存在意义、典型取值范围、和容易踩的坑。
> 权威类型定义：`src/core/themes/_shared/spec/types.ts`。

## 顶层字段速览

```ts
interface PersonaSpec {
  id: string                  // kebab-case，与目录名一致
  name: string                // 中文主题名（listPersonas 给用户看）
  description: string         // 一句话定位（LLM 选型用）
  audience: string            // 受众标签
  palette: Palette            // 11 键色板
  status: StatusPalette       // 4 态语义色
  typography: Typography      // 字号 / 行高 / 字距
  spacing: Spacing            // 段落 / 章节 / 列表项 / 容器内边距
  radius: RadiusScale         // sm / md / lg 圆角
  motifs: MotifSpec           // 装饰 SVG AST 集合
  variants: ThemeVariants     // 7 个 variant slot 的骨架 id 选择
  signatureContainers: readonly SignatureContainerId[]   // 承诺渲染的签名容器
  // 可选：
  elements?: ThemeElements    // h1-h6 / p / a / ul / ol / code / blockquote 等基础元素样式补丁
  containers?: ThemeContainers // 各容器的样式补丁（每键 CSSObject 或 StylePatch；键集见 vocabulary.ts 的 STYLED_CONTAINERS）
  inline?: ThemeInline        // mark / del / ins / 着重点 / 波浪 行内样式补丁
  innerStyles?: ThemeInnerStyles
  templates?: ThemeTemplates  // commonTemplates 覆盖（advanced）
  behavior?: ThemeBehavior    // introDropcap / h2RomanNumerals 等行为开关
  meta?: { createdAt: string; basedOn?: string; ownerNotes?: string }
}
```

## 逐字段解释

### `id` / `name` / `description` / `audience`

- **`id`**：必须 `^[a-z][a-z0-9-]*$`，与 `src/core/themes/<id>/` 目录名严格一致。换名相当于换主题，不要原地改。
- **`name`**：中文 2-6 字，显示在 toolbar 主题切换器。
- **`description`**：≤30 字，`listPersonas()` 的选型信号。**用结果描述**（"暖米底 + 圆角，慢生活"）而不是产品命名（"专门为 X 设计"）。
- **`audience`**：受众标签，是 LLM 选型最强的信号——把"读者是谁"写清楚（"通用全题材公平阅读" / "技术布道工程师"）。

### `palette` · 11 键色板

`primary`（主色）/ `secondary`（次色） / `accent`（强调色） / `bg`（正文底）/ `bgSoft`（intro/quote 等次级底）/ `bgMuted`（highlight 等闷色底）/ `text`（正文）/ `textMuted`（脚注 / 元信息）/ `textInverse`（深色块上的反色文字，推荐 `#fefefe` 不是 `#ffffff`）/ `border`（边框 / 分隔线）/ `code`（代码字色）。

**取舍**：

- `primary` 是判定题（蓝 / 红 / 黑 / 暖色），别犹豫
- `accent` 多数主题里 `= primary`（如 default）；偏装饰的主题（如 life-aesthetic / industry-observer）可以独立
- `textMuted` 与 `text` 对比度建议 ≥ 4.5（WCAG AA），实测 `#636870` on `#fdfdfc` 是边界
- `code` 默认随 `text`；想做"代码醒目"才独立（如 tech-explainer 的 code header bar）

### `status` · 4 态语义色

`{ tip, info, warning, danger }` 四态，每态 `{ accent, soft }` 成对。`accent` 是 admonition 容器的左边线 / 图标色；`soft` 是 admonition 容器的浅色底（accent 约 8-12% 不透明的近似 hex）。**不要漏 info**——它最容易被想成"不用就不写"，但 admonition variant 默认会查到 info，缺一态运行时空心。

| 态 | 典型色相 |
| --- | --- |
| `tip` | 绿（成功/正向）#1f8a4c / #eef6ef |
| `info` | 蓝（中性/补充）#2558b0 / #eef2f9（可与 primary 同色） |
| `warning` | 橙黄（注意）#9a6b1a / #f7f0df |
| `danger` | 红（高风险）#b42318 / #fbecea |

### `typography` · 字号矩阵

```ts
{ baseSize, lineHeight, h1Size, h2Size, h3Size, letterSpacing }
```

- **`baseSize`** ≥ 14（硬约束）。多数主题 15-16。
- **`lineHeight`** ≥ 1.5（中文排版基线）；克制刊物（默认 / business-finance）走 1.75-1.8，紧凑刊物（tech-geek）走 1.6
- **`h1Size`**：22-28 区间。**比一般博客小**——公众号里 h1 与封面/intro 一起出场，过大会争夺视线
- **`letterSpacing`** ≤ 0.3em：中文 letter-spacing 超过 0.5 看起来"散架"

### `spacing` · 4 维度

```ts
{ paragraph, section, listItem, containerPadding }
```

- `paragraph` 段间距：14-22px 区间
- `section` h2 上下间距：≥ paragraph 的 1.5 倍
- `listItem` 列表项间距：通常 = paragraph 的 0.5-0.8
- `containerPadding` 容器内边距：14-20px

### `radius` · 圆角三档

`{ sm, md, lg }` 默认对应 small（按钮 / pill tag）/ medium（admonition / quote-card）/ large（cover / card 类）。

**主题气质**：硬朗主题（business-finance / tech-geek）全 ≤4px；柔和主题（life-aesthetic / industry-observer）md/lg 可到 12/16。

### `motifs` · SVG AST 集合

不是 SVG 字符串，是 AST。完整字段见 [../../_shared/references/motif-ast.md](../../_shared/references/motif-ast.md)。**最少要给的几个**：

- `h2Prefix`：h2 标题前的装饰图标（20×20）——主题脸面
- `dividerWave`（或 dividerDots / dividerFlower）：分隔线（块级）
- `tipIcon` / `warningIcon` / `infoIcon` / `dangerIcon`：4 态 admonition 图标（16×16 或 20×20）
- `noteIcon`：第五态 note 图标
- `stepBadge`：步骤徽章（带 `{N}` 占位符）

**可选**：`quoteMark`（quote-card 装饰引号）/ `sealMark`（卷尾印章）/ `issueStamp`（newsletter 期号印章）/ `sectionCorner`（section-title cornered variant 用）。

### `variants` · 7 个骨架 slot

每个 slot 选一个 id（必须在 `VARIANT_IDS.<kind>` 白名单内）：

```ts
{
  admonition: 'accent-bar' | 'pill-tag' | 'ticket-notch' | 'card-shadow' | ...
  quote: 'classic' | 'magazine-dropcap' | 'column-rule' | 'frame-brackets'
  compare: 'column-card' | 'stacked-row' | 'ledger' | 'data-card'
  steps: 'number-circle' | 'ribbon-chain' | 'timeline-dot'
  divider: 'wave' | 'dots' | 'flower' | 'rule' | 'glyph'
  sectionTitle: 'bordered' | 'cornered'
  codeBlock: 'bare' | 'header-bar'
  note: 'minimal' | 'margin-bracket' | 'ledger-row'
}
```

完整白名单见 [../../_shared/references/hard-rules.md](../../_shared/references/hard-rules.md) 的 Variants 合法性 段。

### `signatureContainers` · 承诺渲染的签名容器

`SignatureContainerId[]`（camelCase id 数组）。声明哪些容器在本主题里有"人格签名视觉"——未声明的依旧可用但走中性兜底。**只声明你真的在 elements/containers patches 里给了样式的**。

### `elements` / `containers` / `inline` · 可选样式补丁

`CSSObject` 形态的样式补丁。深合并到 `buildTheme` 的 baseline。需要"完全覆盖"某条 baseline 时用 `__reset: true`（慎用——会清掉默认间距）。

### `behavior` · 行为开关

目前两个：

- `introDropcap: true` — intro 容器首段首字自动放大（people-story 用）
- `h2RomanNumerals: true` — h2 自动编号 I / II / III（people-story 用，会取代 h2Prefix）

### `meta` · 元信息

```ts
{ createdAt: 'YYYY-MM-DD', basedOn?: string, ownerNotes?: string }
```

- `createdAt` 必填（用于 gallery 排序）
- `basedOn` 派生主题填，便于追溯
- `ownerNotes` 主题作者的备忘录（建议）；不参与渲染

## 设计取舍清单

LLM 生成 spec 时**先决策、再写值**，按以下优先级：

1. **palette.primary**：选主色（蓝 / 红 / 暖 / 黑）——决定 60% 气质
2. **typography.baseSize + lineHeight**：克制刊物大行高、紧凑刊物小行高
3. **variants.admonition + variants.quote**：决定 admonition 与引用的视觉签名
4. **motifs.h2Prefix**：单点装饰，影响最大
5. **palette.bg + palette.bgSoft**：白底 / 米底 / 灰底 / 深色——决定阅读"温度"
6. **signatureContainers**：克制——只承诺有把握的，宁缺勿滥

## 验证完整性 checklist

提交 spec 前自查：

- [ ] `id` kebab-case、与目录名一致
- [ ] `palette` 11 键齐全、全部 hex
- [ ] `status` 四态齐全、每态 `{accent, soft}` 成对
- [ ] `typography.baseSize ≥ 14` / `lineHeight ≥ 1.5`
- [ ] 所有 motif `text.fontSize ≥ 14` / `line/path/rect.strokeWidth ≥ 1`
- [ ] 所有 motif `text.fontFamily` ∈ {serif, sans-serif, monospace}
- [ ] 所有 `MotifTemplate.placeholders` 与 primitives 里出现的 `{name}` 一致
- [ ] `variants` 每键值在 `VARIANT_IDS.<kind>` 白名单内
- [ ] `signatureContainers` 每项在 `SUPPORTED_SIGNATURE_CONTAINERS` 白名单内
- [ ] `meta.createdAt` 已填
