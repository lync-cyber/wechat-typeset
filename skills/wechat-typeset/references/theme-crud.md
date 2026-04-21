# 主题 CRUD 工作流（LLM 作为主题作者）

本文档覆盖 LLM 作为主题作者时需要用的完整工作流：**查询词汇表 → 读现有主题 → 创建/修改临时主题 → 一次性预览 → 持久化落地**。

## 核心事实

- **主题 = PersonaSpec**（纯 JSON 对象），不是手写 `Theme` 对象。
- **9 套内置 persona** 存放在 `src/themes/*/persona.spec.ts`（git 版本化），运行时由 `src/public/personas.ts` 静态 import 聚合。
- **没有运行时 mutation 路径**：`createPersona(spec)` 只构造 Theme 对象，不写注册表；要永久新增/修改主题必须编辑源文件。
- **LLM 友好的三种操作路径**：
  - 临时（会话内）主题 → `render({ spec })` / `createPersona(spec)` 路径，不落盘。
  - 持久化新主题 → 编辑 `src/themes/<id>/persona.spec.ts` + 注册到 `src/public/personas.ts`。
  - 修改现有主题 → 改 spec 文件即可；9 套 spec 彼此独立。

## R（Read）——查询现有主题与容器能力

### 列出全部内置 persona

```ts
import { listPersonas } from '../src/public'
const summaries = listPersonas()
// 每项：id / name / description / audience / palette / variants / signatureContainers
```

**选型信号排序**：`audience` > `signatureContainers` > `variants.admonition` > 色板。不要只看 id 字面。

### 拿完整 spec（用于派生改写）

```ts
import { getPersona } from '../src/public'
const base = getPersona('tech-explainer')  // 未知 id 抛 Error，不静默 fallback
```

### 查容器词汇表（主题无关）

```ts
import { getContainerVocabulary, getVariantsForContainer } from '../src/public'

// 全部 25 条容器（含 example / attrs / category / variantKind 等）
const vocab = getContainerVocabulary()

// 某容器可切的骨架
const tipVariants = getVariantsForContainer('tip')  // 16 条
```

### 查某主题的默认骨架选择

```ts
import { getPersona, getThemeDefaultVariants } from '../src/public'
const v = getThemeDefaultVariants(getPersona('tech-geek').variants)
// v[0] = { id:'manpage-log', kind:'admonition', name:'日志块', ... }
```

### 查硬约束与合法枚举

```ts
import {
  getSchema,                        // JSON Schema（LLM 结构化输出约束）
  getSupportedSignatureContainers,  // 24 个白名单 signatureContainer id
  getVariantIds,                    // 7 个 variant 类目的合法 id
} from '../src/public'
```

完整硬约束语义见 [hard-rules.md](./hard-rules.md)。

## C（Create）——临时会话内新主题

### 流程

1. **获取 JSON Schema**：`const schema = getSchema()`
2. **让 LLM 结构化输出 PersonaSpec**（JSON）
3. **走 `createPersona`**（不抛错，返回 validation）或 `render({ spec })`（校验失败抛 `SpecValidationError`）

```ts
import { createPersona, render, SpecValidationError } from '../src/public'

const spec: PersonaSpec = /* 模型产出 */
const { theme, validation } = createPersona(spec)

if (validation.ok) {
  const { html } = render({ md, theme })
} else {
  // 把 validation.errors 原样喂回 LLM self-correct
  console.log(validation.errors)
}
```

### 常见校验失败 → 修复建议

| 错误 path 示例 | 原因 | 修复 |
|----|----|----|
| `palette.primary` | hex 非法 | 改成 `^#[0-9a-fA-F]{3,8}$` 形式 |
| `palette.status` | 四态缺一 | 补齐 tip/warning/info/danger |
| `motifs.h2Prefix.primitives[2]` | font-size < 14 | 放大到 ≥14 |
| `motifs.dividerWave.primitives[0]` | stroke-width < 1 | 放粗到 ≥1 |
| `signatureContainers[1]` | id 不在白名单 | 用 `getSupportedSignatureContainers()` 列表 |
| `variants.admonition` | id 非法 | 用 `getVariantIds().admonition` 列表 |

## U（Update）——临时改现有主题

### 最小修改：只改色板

```ts
const base = getPersona('tech-explainer')
const tweaked: PersonaSpec = {
  ...base,
  palette: { ...base.palette, primary: '#c8102e' },
}
const { html } = render({ md, spec: tweaked })
```

### 换骨架 variant（不改视觉 token）

```ts
const base = getPersona('life-aesthetic')
const tweaked: PersonaSpec = {
  ...base,
  variants: { ...base.variants, admonition: 'bubble-organic', quote: 'magazine-dropcap' },
}
```

### 叠加 container 样式补丁（主题作者 voice）

```ts
const base = getPersona('default')
const tweaked: PersonaSpec = {
  ...base,
  containers: {
    // 扩展现有补丁（深合并）
    ...(base.containers ?? {}),
    tip: { ...(base.containers?.tip ?? {}), 'border-radius': '12px' },
    // 签名槽位（对老 spec 也可直接叠）
    abstract: { 'background-color': '#fff8e1' },
  },
}
```

**`containers` 字段的 styleKey 用 camelCase**（`quoteCard` / `sectionTitle` / `footerCTA` / `keyNumber` / `seeAlso`）——不要写成 markdown fence 名（`quote-card`）。映射表在 `STYLE_KEY_TO_CONTAINER_NAME`。

### 重置主题的基础样式

对 `elements` / `containers` / `inline` 任一槽位用 `__reset: true`：

```ts
containers: {
  highlight: { __reset: true, 'background-color': '#000', color: '#fff' },
}
```

**慎用**：reset 会清掉 buildTheme 提供的默认间距，容易导致容器贴边。

## D（Delete）——临时"删除"

运行时没有 delete。真正的等价操作：

- **不选用某 persona**：就不要 `getPersona(id)`。
- **禁用某容器**：主题作者无法禁；作者层面不写对应 markdown fence 即可。
- **关闭某 signatureContainer**：从 spec.signatureContainers 里去掉 id（conformance 测试相应放宽）。

若真要从仓库移除一个 persona：
1. 删 `src/themes/<id>/` 目录
2. 从 `src/public/personas.ts` 移除 import
3. 跑 `npx tsx scripts/validate-spec.ts` + `npm run build:capabilities`

## 持久化（改仓库）

临时主题调通后要永久落地：

1. 新建 `src/themes/<id>/persona.spec.ts`，export default 一个 `PersonaSpec`。
2. 在 `src/public/personas.ts` 里 `import spec from '../themes/<id>/persona.spec'` 并加进 `PERSONA_SPECS` 数组。
3. 跑 `npx tsx scripts/validate-spec.ts` —— 所有内置 spec 必须 ok。
4. 跑 `npm run build:capabilities` —— 刷新 `dist/api/capabilities.json`（对外契约）。
5. 可选：`npx tsx scripts/gen-gallery.ts` 生成画廊 HTML。

## 反模式（不要做）

- **不要手写 `Theme` 对象绕过 spec** —— specToTheme 的合并和 asset 规范化会被绕过，patch 系统的 `__reset` 语义会失效。
- **不要在 spec 里塞原始 SVG 字符串** —— motif 必须是 AST（见 [motif-ast.md](./motif-ast.md)）。校验器看不穿字符串，字号/描边硬约束会被悄悄绕过。
- **不要跳过 `validatePersona`** —— patch 系统（`__reset: true`）能清掉平台约束。
- **不要用 kebab fence 名作 containers patch key** —— `containers.quote-card` 会被 TS 拦下；正确写法 `containers.quoteCard`。
