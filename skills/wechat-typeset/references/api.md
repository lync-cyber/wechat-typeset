# API 详细参考

`src/public` 暴露 12 个符号 + 1 个错误类型。以下按分组列出签名、返回值和典型用法。主线任务里不要把本文件整段读入——按需查。

## 目录

- [元信息（6）](#元信息)
- [校验（2）](#校验)
- [渲染（2）](#渲染)
- [Motif 工具（3）](#motif-工具)
- [导出类型](#导出类型)

## 元信息

### `listPersonas(): readonly PersonaSummary[]`

返回 9 份内置 persona 的摘要，展示顺序稳定（`default` 永远第一）。

```ts
const list = listPersonas()
// list[0] = {
//   id: 'default', name: '默认主题',
//   description: '有意识的中立——Medium/Notion/Substack 默认家族',
//   audience: '通用（全题材公平阅读）',
//   palette: { primary, secondary, ... 11 个 hex },
//   variants: { admonition, quote, compare, ... 7 个 id },
//   signatureContainers: []
// }
```

**摘要只含选型信号**——不含 `motifs` / `elements` / `containers` / `inline` 等重字段。要拿详细数据走 `getPersona(id)`。

### `getPersona(id: string): PersonaSpec`

拿完整 `PersonaSpec`。未知 id 抛 `Error`（不静默回退到 `default`——LLM 拼错了要早失败）。

### `getPersonaSummary(id: string): PersonaSummary`

等价于 `listPersonas().find((s) => s.id === id)` 的 strict 版本（未知 id 抛错）。

### `getSchema(): JSONSchema7`

`PersonaSpec` 的完整 JSON Schema（draft-07），直接可喂给 structured-output 接口。内容和 `scripts/gen-schema.ts` 导出的 `dist/schema/persona-spec.schema.json` byte-identical。

### `getSupportedSignatureContainers(): readonly SignatureContainerId[]`

24 个合法 signatureContainer id 的白名单。超出清单的 id 写进 spec.signatureContainers 会被 `validatePersona` 判错。

当前清单：`intro` · `author` · `cover` · `tip` · `warning` · `info` · `danger` · `note` · `quoteCard` · `highlight` · `compare` · `steps` · `sectionTitle` · `footerCTA` · `recommend` · `qrcode` · `mpvoice` · `mpvideo` · `abstract` · `algorithm` · `keyNumber` · `seeAlso` · `seal` · `prelude`。

### `getVariantIds(): typeof VARIANT_IDS`

7 种 variant 类目的合法 id 清单。例：

```ts
getVariantIds().admonition
// → ['accent-bar','pill-tag','ticket-notch','card-shadow',
//    'minimal-underline','terminal','dashed-border','double-border','top-bottom-rule']
```

完整类目：`admonition`(9) · `quote`(4) · `compare`(3) · `steps`(3) · `divider`(5) · `sectionTitle`(2) · `codeBlock`(2)。

## 校验

### `validatePersona(spec: PersonaSpec): SpecValidationResult`

对一份 spec 跑所有硬约束。返回：

```ts
interface SpecValidationResult {
  ok: boolean
  errors: Array<{ path: string, message: string, severity: 'error' }>
  warnings: Array<{ path: string, message: string, severity: 'warning' }>
}
```

`path` 是点分路径（`palette.primary` / `motifs.h2Prefix.primitives[2]`），可以原样喂回 LLM 做结构化 self-correct。硬约束完整列表见 [hard-rules.md](./hard-rules.md)。

### `SpecValidationError`（class）

`render({ spec })` 路径上校验失败时抛出：

```ts
try { render({ md, spec: llmSpec }) }
catch (e) {
  if (e instanceof SpecValidationError) {
    console.log(e.result.errors) // 可喂回模型
  }
}
```

`createPersona(spec)` **不会**抛这个错——它把 validation 当作返回值给你看，方便 UI 里做「带警告的预览」。

## 渲染

### `render(input: PublicRenderInput): PublicRenderOutput`

主入口。三种互斥的主题来源：

```ts
interface PublicRenderInput {
  md: string
  persona?: string       // 查内置注册表
  theme?: Theme          // 已构建的 Theme 对象
  spec?: PersonaSpec     // 临时 spec（先校验再投影）
  wxPatch?: WxPatchOptions
}

interface PublicRenderOutput {
  html: string
  wordCount: number
  readingTime: number   // 分钟，向上取整
}
```

- **三选一严格互斥**：同时提供两个以上抛 `Error('render: provide exactly one of ...')`。
- **都不提供**：默认 `persona: 'default'`。
- **走 `spec` 路径**：先 `validateSpec`，不通过抛 `SpecValidationError`。
- **`wxPatch`**：`{ svgWhiteBg?: boolean }`——默认 `true`，将 SVG 内 `#fff`/`#ffffff` 换成 `#fefefe`（规避微信把纯白光栅化为透明）。主题预览纸需要纯白对比时传 `false`。

### `createPersona(spec: PersonaSpec): CreatePersonaResult`

```ts
interface CreatePersonaResult {
  theme: Theme
  validation: SpecValidationResult
}
```

**不抛错**，即使校验失败也返回 best-effort 投影的 `theme`。适合「带警告预览」场景：UI 里既显示渲染结果、又提示违规点。

## Motif 工具

### `getMotifSpec(personaId: string): MotifSpec`

取指定 persona 的 motif AST 集合（`h2Prefix` / `dividerWave` / `tipIcon` / `stepBadge` 等）。字段可选——某些 persona 故意不导出某 motif（如 `default` 没有 `quoteMark`）。

### `renderMotif(shape: MotifShape): string`

把单个 `MotifShape` 渲染为 SVG 字符串（自动注入 `xmlns="http://www.w3.org/2000/svg"`）。

```ts
const svg = renderMotif(getMotifSpec('default').h2Prefix!)
// → '<svg viewBox="0 0 20 20" width="20" height="20" xmlns="...">...</svg>'
```

### `renderMotifWithValues(template: MotifTemplate, values: Record<string, string | number>): string`

模板 motif 的占位符替换版（`stepBadge` 里的 `{N}`、`issueStamp` 里的 `{issue}` `{date}` `{kind}`）。

```ts
const badge = renderMotifWithValues(getMotifSpec('tech-geek').stepBadge!, { N: 3 })
// stepBadge 里所有 "{N}" 字面量都被替换成 "3"
```

未被替换的占位符保留原形（`{name}` 字面保留），不会抛错——方便调试。

## 导出类型

| 类型 | 用途 |
| --- | --- |
| `PersonaSpec` | 主题完整规格（JSON-serializable ground truth） |
| `PersonaSummary` | 选型用的轻量摘要 |
| `Theme` | 运行时 Theme 对象（`specToTheme` 产物；含 `(n)=>string` 模板函数，不是 JSON-serializable） |
| `MotifSpec` | motif 集合（所有字段可选） |
| `MotifShape` | 单个 motif 的 viewBox + 基元数组 |
| `MotifTemplate` | 带占位符的模板 motif |
| `Palette` | 11 键色板结构 |
| `ThemeVariants` | 7 键 variant 选择 |
| `SignatureContainerId` | `SUPPORTED_SIGNATURE_CONTAINERS` 的联合字面量类型 |
| `SpecValidationResult` | 校验返回值 |
| `WxPatchOptions` | `render` 的 `wxPatch` 入参 |
| `JSONSchema7` | `getSchema()` 返回类型 |
