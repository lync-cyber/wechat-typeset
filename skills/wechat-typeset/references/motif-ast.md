# Motif AST 参考

Motif = 嵌入主题的装饰性 SVG（标题前缀、分隔线、提示图标、步骤徽章、卷尾印章……）。**不以字符串形式存在**——而是 JSON AST，由 `shapeToSvg` / `renderMotifTemplate` 在运行时投射为 SVG 字符串。

**为什么不是字符串？** 因为字符串没法过校验器。字号 / 描边 / 白名单都是结构化字段上做的检查，塞原始 SVG 字符串会悄悄绕过所有硬约束。

## 目录

- [MotifShape vs MotifTemplate](#motifshape-vs-motiftemplate)
- [`<svg>` 包装字段](#svg-包装字段)
- [基元（MotifPrimitive）](#基元motifprimitive)
  - [rect / circle / ellipse](#rect--circle--ellipse)
  - [path](#path)
  - [line](#line)
  - [text](#text)
  - [group](#group)
- [模板占位符](#模板占位符)
- [完整示例](#完整示例)

---

## MotifShape vs MotifTemplate

两种顶层结构，差别只在**是否接受占位符**：

```ts
// 静态 motif：h2Prefix / dividerWave / tipIcon 等
interface MotifShape {
  viewBox: [number, number, number, number]
  width?: number       // <svg width="...">，省略则按 viewBox 推断
  height?: number
  inlineStyle?: SvgInlineStyle
  primitives: MotifPrimitive[]
}

// 参数化 motif：stepBadge / issueStamp 等
interface MotifTemplate extends Omit<MotifShape, never> {
  placeholders: readonly string[]   // 必须声明所有 {name} 占位符
}
```

**何时用 Template**：需要同一个 motif 在不同位置显示不同内容时。`stepBadge` 的 `{N}` 每步从 1、2、3 递增；`issueStamp` 的 `{issue}` / `{date}` / `{kind}` 按当次渲染的容器 attr 填。

## `<svg>` 包装字段

`SvgInlineStyle` 只开 4 个语义字段——这不是故意苛刻，是 9 套主题的真实需求收敛下来的：

```ts
interface SvgInlineStyle {
  display?: 'inline-block' | 'block' | 'inline'
  verticalAlign?: 'baseline' | 'middle' | 'top' | 'bottom'
  marginRight?: number   // px
  marginLeft?: number    // px
}
```

典型用法：

- **prefix 图标**（`h2Prefix` / `tipIcon`）：`{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }`，贴在标题 / 段落前头。
- **块级装饰**（`dividerWave`）：`inlineStyle` 整块不要（默认块级渲染）。
- **容器徽章**（`stepBadge`）：`{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }`。

## 基元（MotifPrimitive）

7 种基元。每种的字段严格对齐 SVG 属性名——给 LLM 生成时可以直接参考 SVG 文档，别创造字段。

### rect / circle / ellipse

```ts
// rect
{ type: 'rect', x, y, w, h, fill?, stroke?, strokeWidth?, rx?, ry?, opacity? }

// circle
{ type: 'circle', cx, cy, r, fill?, stroke?, strokeWidth?, opacity? }

// ellipse
{ type: 'ellipse', cx, cy, rx, ry, fill?, stroke?, strokeWidth?, opacity? }
```

- `fill` 不写默认为 `'none'`——所以要画实心形状必须显式写 `fill`。
- `strokeWidth` 写了但 `< 1` 会被校验器拒。

### path

```ts
{ type: 'path', d,
  fill?, stroke?, strokeWidth?,
  strokeLinecap?: 'butt' | 'round' | 'square',
  strokeLinejoin?: 'miter' | 'round' | 'bevel',
  strokeDasharray?: string,
  opacity? }
```

`d` 原样嵌入，不做解析。复杂曲线用 path，但能 rect / circle 表达的简单形状别绕 path——后者维护成本高。

### line

```ts
{ type: 'line', x1, y1, x2, y2, stroke, strokeWidth,
  strokeLinecap?, strokeDasharray?, opacity? }
```

`stroke` 和 `strokeWidth` **必填**（line 没有 `fill`，不描边就看不见）。

### text

```ts
{ type: 'text', x, y, content, fontSize,
  fontFamily?: 'serif' | 'sans-serif' | 'monospace',
  fontWeight?: number | 'bold' | 'normal',
  fill?,
  textAnchor?: 'start' | 'middle' | 'end',
  dominantBaseline?: 'auto' | 'middle' | 'central' | 'hanging' | 'alphabetic',
  letterSpacing?: number,
  opacity? }
```

- `fontSize` 必须 ≥ 14（平台硬约束）。
- `fontFamily` 枚举只能是三个值之一——SVG 内部的字体家族**不**受微信客户端的字体覆盖影响，所以这里是唯一能做衬线 / 无衬线 / 等宽区分的通道。
- 居中对齐的标准写法：`textAnchor: 'middle'` + `dominantBaseline: 'central'`，配合 `x: cx, y: cy`。

### group

```ts
{ type: 'group', transform, children: MotifPrimitive[], opacity? }
```

`transform` 是原始 SVG 字符串（`translate(10 20) rotate(45)` / `scale(0.8)`）——保留字符串而非结构化分解，因为 SVG transform 的组合语义比字段组合精确。

`children` 可以继续嵌套 group，占位符替换会递归进去。

## 模板占位符

模板 motif 用 `{name}` 字面量占位，出现在任何 string 字段：`content`、`d`、`fill`、`stroke`、`strokeDasharray` 等。**数值字段不参与替换**（占位符必然是字符串量）。

```ts
const stepBadge: MotifTemplate = {
  viewBox: [0, 0, 24, 24],
  width: 24, height: 24,
  placeholders: ['N'],
  primitives: [
    { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#c8102e' },
    { type: 'text',
      x: 12, y: 12, content: '{N}', fontSize: 14,
      fill: '#fefefe', fontWeight: 700,
      textAnchor: 'middle', dominantBaseline: 'central' },
  ],
}

// 运行时调用
renderMotifWithValues(stepBadge, { N: 3 })
// → text 的 content 变成 '3'，其他原样
```

**校验器会追查**：

- `primitives` 里出现的 `{X}` 如果不在 `placeholders` 里声明，抛 error。
- `placeholders` 里声明了但 primitives 里没用到，警告（不是 error，方便外部做 stepBadge 这类「预留 N 槽位」的模板）。

**没被替换的占位符**不会抛错，原样保留（`{name}` 字面字符在 SVG 里会被 viewer 当普通文本渲染）——方便调试。

## 完整示例

### h2Prefix（两段色条）

```ts
h2Prefix: {
  viewBox: [0, 0, 20, 20],
  width: 20, height: 20,
  inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 6 },
  primitives: [
    { type: 'rect', x: 2, y: 8, w: 14, h: 4, fill: '#c8102e', rx: 1 },
    { type: 'circle', cx: 18, cy: 10, r: 2, fill: '#c8102e' },
  ],
}
```

### dividerWave（波浪分隔线）

```ts
dividerWave: {
  viewBox: [0, 0, 200, 12],
  primitives: [
    { type: 'path',
      d: 'M0 6 Q 25 0 50 6 T 100 6 T 150 6 T 200 6',
      stroke: '#c8102e', strokeWidth: 1.5, fill: 'none',
      strokeLinecap: 'round' },
  ],
}
```

### 带 group + 占位符的 issueStamp

```ts
issueStamp: {
  viewBox: [0, 0, 80, 80],
  width: 60, height: 60,
  placeholders: ['issue', 'date', 'kind'],
  primitives: [
    { type: 'group', transform: 'rotate(-8 40 40)', children: [
      { type: 'circle', cx: 40, cy: 40, r: 36, fill: 'none',
        stroke: '#8b1a1a', strokeWidth: 2 },
      { type: 'text', x: 40, y: 32, content: 'ISSUE #{issue}',
        fontSize: 14, fontFamily: 'serif', fontWeight: 700,
        fill: '#8b1a1a', textAnchor: 'middle' },
      { type: 'text', x: 40, y: 46, content: '{date}',
        fontSize: 14, fontFamily: 'serif',
        fill: '#8b1a1a', textAnchor: 'middle' },
      { type: 'text', x: 40, y: 60, content: '{kind}',
        fontSize: 14, fontFamily: 'serif',
        fill: '#8b1a1a', textAnchor: 'middle' },
    ]},
  ],
}
```

## 生成 motif 的建议

对 LLM 生成场景，留意：

1. **先确定 viewBox**，再想基元怎么放。`[0, 0, W, H]` 的 W / H 决定后续所有坐标。
2. **inline prefix 图标**几乎总是 20×20 或 24×24 + `display: inline-block` + `verticalAlign: middle` + `marginRight: 6~8`。
3. **block divider** 用很扁的 viewBox（例如 `[0, 0, 200, 12]`），让水平延展不变形。
4. **step badge / stamp** 用正方形（24×24 / 80×80），圆形 / 方形居中。
5. **色相来源**：`fill` / `stroke` 用 hex，可以引用 `palette.primary` / `palette.accent` 的值——但不要用 CSS 变量语法 `var(--primary)`（SVG 内部的变量作用域微信解析不稳）。直接 inline hex。
