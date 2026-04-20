# 主题作者指南

写给两类人：
1. **想新增一套内置主题**的贡献者（目标：PR 合入 `src/themes/<slug>/`）。
2. **想在 fork 里自用定制**、或通过 LLM 动态生成主题喂给 `render()` 的集成方。

微信公众号的平台约束不是"最佳实践"——**是硬红线**。校验器 `validatePersona` 在构造期把违反约束的 spec 挡下；试图在运行时绕过（手改 `Theme` 对象）会在粘贴到后台时塌掉。按本文档走，默认就是稳的。

---

## 核心心智模型

一个主题的 ground truth 是 `PersonaSpec`——**一份 JSON-serializable 对象**。

```
persona.spec.ts  ──┬─► specToTheme(spec)   → 运行时 Theme（渲染管线吃这个）
                   ├─► specToGallery(spec) → 人看的目录页（personas-gallery.html）
                   └─► getSchema()         → JSON Schema（约束 LLM 结构化输出）
```

三条投影共享同一份 spec。色板、字号、motif（SVG AST）、容器变体选择——**全部**写在 spec 里，`index.ts` 只是一行 `export default specToTheme(spec)`。

> 想改主题外观？**改 spec，不改 index.ts。**

---

## 新增一套主题（端到端步骤）

### 1. 起个目录，复制最简骨架

```bash
cp -r src/themes/default src/themes/your-slug
```

`id` 用 kebab-case，与目录名一致（e.g. `urban-diary`）。

### 2. 编辑 `persona.spec.ts`

必填字段（[完整类型](../src/themes/_shared/spec/types.ts)）：

```ts
import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = {
  id: 'urban-diary',
  name: '城市日记',
  description: '一句自然语言定位，LLM 选型时读这句',
  audience: '受众标签，如 "城市非虚构 / 街拍随笔"',

  palette: {
    primary: '#...', secondary: '#...', accent: '#...',
    bg: '#...', bgSoft: '#...', bgMuted: '#...',
    text: '#...', textMuted: '#...', textInverse: '#...',
    border: '#...', code: '#...',
  },
  status: {
    tip:     { accent: '#...', soft: '#...' },
    info:    { accent: '#...', soft: '#...' },
    warning: { accent: '#...', soft: '#...' },
    danger:  { accent: '#...', soft: '#...' },
  },
  typography: { baseSize: 15, lineHeight: 1.8, h1Size: 24, h2Size: 20, h3Size: 17, letterSpacing: 0.5 },
  spacing:    { paragraph: 18, section: 28, listItem: 8, containerPadding: 16 },
  radius:     { sm: 4, md: 8, lg: 12 },

  motifs: { /* 见下节「Motif AST」 */ },
  variants: { admonition: 'accent-bar', quote: 'serif-mark', compare: 'two-column',
              steps: 'numbered-badge', divider: 'flower', sectionTitle: 'prefix-bar',
              codeBlock: 'plain' },

  meta: { createdAt: '2026-04-20' },
}
```

### 3. `index.ts` 只做一行投影

```ts
import { specToTheme } from '../_shared/spec'
import { spec } from './persona.spec'

export const urbanDiaryTheme = specToTheme(spec)
```

`src/themes/index.ts` 用 `import.meta.glob` 自动发现——**不需要**去注册表里登记。想调主题在 UI 里的显示顺序，改 `DISPLAY_ORDER` 数组。

### 4. 跑校验 → 预览 → 测试

```bash
npm run validate:spec   # 扫 spec 的硬约束（字号 / 描边 / hex / 占位符）
npm run dev             # 热更新预览，切到新主题肉眼过一遍
npm test                # 全量单测 + sample-full.md 端到端
```

### 5. 补一份设计笔记（PR 要求）

在 `docs/design/personas/your-slug.md` 写清楚：
- **定位一句话**（参照坐标 + 拒绝坐标）
- **签名动作 3 条**（让读者一眼认出这是你的主题的视觉特征）
- **色板理由**（为什么选这个 primary，拒绝了哪些候选）

这不是官僚主义——人格漂移最快的时间点是第 6 个月的"微调"，笔记是未来自己的锚点。既有主题的范本：[tech-geek.md](design/personas/tech-geek.md) / [literary-humanism.md](design/personas/literary-humanism.md)。

---

## 硬约束（校验器会拦）

`validatePersona(spec)` 返回 `{ ok, errors, warnings }`。以下违规**在构造期就会失败**：

| 约束 | 由谁拦 | 理由 |
| --- | --- | --- |
| SVG `<text>` 的 `fontSize < 14` | `validateSpec` | 微信服务端光栅化 < 14 px 字号会糊 |
| SVG 描边 `strokeWidth < 1` | `validateSpec` | 亚像素描边在栅格化时消失 |
| `palette.*` / `status.*.accent/soft` 不是合法 hex | `validateSpec` | 后续管线假设 hex 输入做对比度计算 |
| `motifs.stepBadge` 占位符与声明不符 | `validateSpec` | `{N}` 之外的占位符会被当字面量输出 |
| `elements` / `containers` 任何一条 CSS 含 `font-family` | `themeCSS` 构造期 throw `ThemeAuthoringError` | 微信客户端会覆盖所有 `font-family`，声明无效且误导作者 |
| `signatureContainers` 声明了但没实现 | `tests/conformance.spec.ts` | 主题对 LLM 的"承诺即契约"；声明了就必须渲染得出 |

**`juice` 内联化 + `wxPatch` 运行时剥离**（粘贴进公众号前的最后一关，不抛错、静默处理）：

- `class` 属性全部剥离——所有样式必须是 `style=""` 行内
- `<style>` / `<script>` / `id=` 全部剥离
- `position` / `float` / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex `gap` —— 剥或改写
- SVG `url()` 引号剥掉（`url('#g')` → `url(#g)`）
- 纯白 `#ffffff` 建议替换为 `#fefefe`（在深色底 SVG 内，纯白会被转成透明）

---

## Motif AST（SVG 装饰 JSON 化）

传统做法是在 `assets.ts` 里堆手写 SVG 字符串——LLM 难以生成、难以校验、难以跨主题复用。本项目把所有 motif 编码为**图元 AST**：

```ts
motifs: {
  h2Prefix: {
    viewBox: [0, 0, 20, 18],
    width: 18, height: 16,
    inlineStyle: { display: 'inline-block', verticalAlign: 'middle', marginRight: 8 },
    primitives: [
      { type: 'rect', x: 0, y: 2, w: 3, h: 14, fill: '#d4a65a' },
      { type: 'text', x: 8, y: 14, content: '§', fontSize: 14, fontFamily: 'serif', fill: '#d4a65a' },
    ],
  },
  stepBadge: {        // 模板型 motif，含占位符
    viewBox: [0, 0, 24, 24],
    primitives: [{ type: 'text', x: 12, y: 17, content: '{N}', fontSize: 14, fill: '#fefefe' }],
    placeholders: ['N'],
  },
}
```

图元类型：`rect` / `circle` / `path` / `text` / `line` / `polyline` / `polygon`。
校验器会把 `placeholders` 列表与 `primitives` 内实际出现的 `{name}` 交叉对账——漏声明或漏使用都会 error。

**要手动渲染某个 motif**（比如文档页、独立卡片）：

```ts
import { renderMotif, renderMotifWithValues, getMotifSpec } from 'wechat-typeset'

const motifs = getMotifSpec('tech-geek')
const svg = renderMotif(motifs.h2Prefix!)                     // 普通 shape
const badge = renderMotifWithValues(motifs.stepBadge!, { N: 3 })  // 模板
```

---

## 容器变体（variants）

同一个容器（比如 `tip`）可以有若干视觉骨架。主题在 spec 里为每个类目挑一个默认 variant：

| 类目 | 可选 variant | 常见选法 |
| --- | --- | --- |
| `admonition` | `accent-bar` / `pill-tag` / `ticket-notch` / `card-shadow` / `minimal-underline` / `terminal` | default 用 `accent-bar`；`tech-geek` 用 `terminal` |
| `quote` | `serif-mark` / `left-rule` / `pullquote-card` | `people-story` 的巨号引号走 `pullquote-card` |
| `compare` | `two-column` / `ledger` / `matrix` | `business-finance` 用 `ledger`（账本感） |
| `steps` | `numbered-badge` / `vertical-rule` / `terminal-prompt` | |
| `divider` | `line` / `wave` / `dots` / `flower` / `glyph` | `business-finance` 禁 `wave` 以避免与 K 线冲突 |
| `sectionTitle` | `prefix-bar` / `centered-rule` / `roman-numeral` | `people-story` 用罗马数字 |
| `codeBlock` | `plain` / `header-bar` / `terminal` | `tech-explainer` 用 `header-bar`（Stripe Docs 签名） |

完整列表：`src/variants/` 下各目录。获取合法 id 清单用 `getVariantIds()`。

作者在 Markdown 正文也能显式覆盖：

```markdown
::: tip variant=pill-tag 小贴士
主题默认是 accent-bar，这一处我想要 pill-tag
:::
```

---

## 公共 API（给外部集成方）

所有入口在 `src/public`，Node / Vite / Bun 下都能跑（无 `import.meta.glob`）：

```ts
import {
  // 只读元信息
  listPersonas, getPersona, getPersonaSummary, getSchema,
  getSupportedSignatureContainers, getVariantIds,

  // 校验
  validatePersona, SpecValidationError,

  // 渲染
  render, createPersona,

  // Motif 工具
  getMotifSpec, renderMotif, renderMotifWithValues,
} from 'wechat-typeset'

// 最小用法：内置主题
const { html } = render({ md: '# Hello', persona: 'tech-geek' })

// LLM 生成的临时 spec
const { html } = render({ md: source, spec: llmOutput })  // 先 validate，失败抛 SpecValidationError

// 想先看校验结果、再决定怎么处理
const { theme, validation } = createPersona(llmOutput)
if (!validation.ok) console.warn(validation.errors)  // [{ path, message, severity }]
```

`render()` 的三选一输入：`persona` (id 查内置) / `theme` (已构建的 Theme) / `spec` (临时 spec，渲染前跑校验)。都不给时默认 `persona: 'default'`；给多个抛错。

---

## 调试与参考

```bash
npm run validate:spec    # 只跑 spec 校验，改主题时最快反馈
npm run gen:gallery      # 重新生成 docs/personas-gallery.html
npm run gen:schema       # 重新导出 JSON Schema（用于 LLM 结构化输出）
npm test                 # 全量：vitest + sample-full 端到端
```

- **完整示例**：[`src/themes/default/persona.spec.ts`](../src/themes/default/persona.spec.ts) 是最干净的参照；[`tech-geek/persona.spec.ts`](../src/themes/tech-geek/persona.spec.ts) 展示了深色主题 + 复杂 motif 的用法。
- **类型定义**：[`src/themes/_shared/spec/types.ts`](../src/themes/_shared/spec/types.ts)
- **校验器源码**：[`src/themes/_shared/spec/validate.ts`](../src/themes/_shared/spec/validate.ts)
- **设计笔记范本**：[`docs/design/personas/`](design/personas/)
