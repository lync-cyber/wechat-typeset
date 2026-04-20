---
name: wechat-typeset
description: 将中文 Markdown 转换为可直接粘贴到微信公众号的富文本 HTML，内置 9 套编辑排版人设（tech-geek / 人文 / 财经 / 学术前沿等），也支持根据话题即时生成自定义人设。只要用户提到公众号 / 微信排版 / 微信文章 / 公众号主题 / 公众号模板 / markdown 转公众号 / 公众号人设 / 微信推送样式 / 公众号排版器，或在讨论把 Markdown 发布到微信生态（而非普通博客 / 邮件），就使用本技能——即便用户没点名"排版"二字。渲染全程遵守微信公众号硬约束：禁 class、禁 font-family、禁 position、禁 @media、禁亚像素描边、禁 14px 以下字号，所有样式 juice 内联。不要用于非微信平台（普通 HTML、静态博客、邮件模板）的排版。
---

# wechat-typeset

把中文 Markdown 转成微信公众号可粘贴的富文本 HTML。真相来源是一份 JSON-serializable 的 `PersonaSpec`，经三条投影（`specToTheme` 运行时 / `specToGallery` 人看的目录 / `specToJsonSchema` LLM 约束）派生出所有产物。微信的硬约束（无 `<style>`、无 `class`、无 `font-family`、无 1 像素以下描边、无 14px 以下字号）编码在校验器里——**通过 `validatePersona` 的 spec 按构造就能稳定粘贴**。

## 何时使用

命中以下任意信号就进入本技能：

- 用户提到「公众号」「微信排版」「公众号文章」「markdown 转公众号」「公众号推送」「微信公众号主题」「公众号人设」。
- 用户贴出一段中文 Markdown，暗示要「发出去」「推送」「发到公众号」。
- 用户想为某个垂直话题（科普 / 财经 / 文学 / 学术简报 / 人物特稿 / 产品观察）挑一套匹配主题，或想**新造一套**主题。
- 用户要单独复用某个主题的装饰 SVG（标题前缀、分隔线、步骤徽章）。

**不要**用于：普通博客 HTML、邮件模板、静态站——本技能的 WxPatch 层会剔除那些平台允许的特性，硬塞会错位。

## 核心心智模型

`PersonaSpec` 是一份纯 JSON 对象，承载了主题的**全部**信息（色板 / 字号 / 间距 / SVG motif 的 AST / 变体选择 / 签名容器）。它能被 LLM 直接生成，也能被 `validateSpec` 一把校验。运行时 `specToTheme(spec)` 把它投影为 `Theme` 对象，再喂给 `render()`。

所有微信平台约束都是校验器的硬规则——LLM 生成的 spec 如果违反，会在 `validatePersona` 里拿到结构化错误（`{path, message, severity}`），喂回模型改写即可。

## 公共 API（从 `src/public` 导入）

```ts
import {
  // 元信息
  listPersonas, getPersona, getPersonaSummary,
  getSchema, getSupportedSignatureContainers, getVariantIds,
  // 校验
  validatePersona, SpecValidationError,
  // 渲染
  render, createPersona,
  // Motif 工具
  getMotifSpec, renderMotif, renderMotifWithValues,
  // 类型
  type PersonaSpec, type PersonaSummary, type Theme,
} from '../src/public'
```

详细签名速查见 [references/api.md](references/api.md)。

## 五条主力工作流

### 1. 挑一套内置 persona 渲染文章

```ts
const { html, wordCount, readingTime } = render({
  md: userMarkdown,
  persona: 'tech-explainer',   // 不给则默认 'default'
})
```

9 个内置 id：`default`、`tech-geek`、`tech-explainer`、`life-aesthetic`、`business-finance`、`literary-humanism`、`industry-observer`、`people-story`、`academic-frontier`。受众 / 视觉签名速查见 [references/personas.md](references/personas.md)。

### 2. 根据用户意图推荐 persona

```ts
const candidates = listPersonas()
// 每项含：id / name / description / audience / palette / variants / signatureContainers
```

**选型信号优先级**（按重要性排序）：

1. `audience`——最强信号（「技术布道」「人文非虚构」「内参 newsletter」差别极大，不要只看 id 字面）。
2. `signatureContainers`——如果用户明确要「大数字」就要 `keyNumber`；要「延伸阅读」就要 `seeAlso`；要「摘要」就要 `abstract`。
3. `variants.admonition`——最直观的视觉签名（`accent-bar` 保守、`terminal` 极客、`card-shadow` 现代、`ticket-notch` 杂志感）。

### 3. 生成一套全新自定义 persona

```ts
const schema = getSchema()  // JSON Schema draft-07

// 把 schema 喂给结构化输出接口，生成一份 PersonaSpec JSON
const spec: PersonaSpec = /* model output */

const { theme, validation } = createPersona(spec)
if (!validation.ok) {
  // validation.errors 每项都是 { path, message, severity }
  // 把错误原样喂回模型让它改写，典型失败：
  //   palette.primary: 必须匹配 ^#[0-9a-fA-F]{3,8}$
  //   motifs.h2Prefix.primitives[2]: font-size 12 < 14（MIN_FONT_SIZE）
  //   motifs.dividerWave.primitives[0]: stroke-width 0.5 < 1（MIN_STROKE_WIDTH）
  //   signatureContainers[1]: "algorithms" 不在白名单
  //   variants.admonition: "glow" 不是合法 id
}

// 校验通过后直接渲染
const { html } = render({ md: userMarkdown, theme })
```

完整硬约束清单与触发路径见 [references/hard-rules.md](references/hard-rules.md)。

### 4. 预览 persona 的装饰 motif

```ts
const motifs = getMotifSpec('literary-humanism')
const h2Prefix = renderMotif(motifs.h2Prefix!)          // 独立 SVG 字符串
const badge3   = renderMotifWithValues(motifs.stepBadge!, { N: 3 })
```

用于图标表、motif 画廊、色板预览等不走完整 Markdown 管线的场景。MotifShape / MotifTemplate / 基元类型详见 [references/motif-ast.md](references/motif-ast.md)。

### 5. 临时微调一套内置 persona

```ts
const base = getPersona('tech-explainer')
const tweaked: PersonaSpec = {
  ...base,
  palette: { ...base.palette, primary: '#c8102e' },
}
const { html } = render({ md: userMarkdown, spec: tweaked })
// tweaked 不通过校验时，render() 抛 SpecValidationError
```

`render` 的 `persona` / `theme` / `spec` 三个入口互斥——同时提供会直接抛错。不想在失败时抛错、要允许「带警告预览」时走 `createPersona`（返回 `{ theme, validation }`，不抛）。

## 常见失败模式与处理

**`SpecValidationError`**：`render({ md, spec })` 路径上 spec 校验失败时抛出。`err.result.errors` 数组可以整段喂回 LLM 做一次 self-correct。优先修 `palette` hex 非法 → `status` 四态缺一 → motif 字号 / 描边越界 → `signatureContainers` / `variants` id 不在白名单。

**`Unknown persona id`**：LLM 拼错了 id。用 `listPersonas()` 的 `id` 字段做 fuzzy 回退前先检查是否拼写错误，不要静默 fallback 到 `default`——会掩盖意图错误。

**LLM 生成的 motif 渲染出来很扁 / 看不见**：99% 是 `strokeWidth < 1` 或 `fontSize < 14` 被校验器挡下。规则见 [references/hard-rules.md](references/hard-rules.md)。

## 不要做的事

- **不要手写 `Theme` 对象**——永远走 `PersonaSpec`。`specToTheme` 里隐含的 `commonTemplates` 合并和 asset 规范化不能绕过。
- **不要在 spec 里塞原始 SVG 字符串**——motif 必须是 AST。校验器看不穿字符串，字号 / 描边硬约束会被悄悄绕过。
- **不要通过改模块注册新 persona**——本项目没有运行时 mutation 路径。临时用走 `render({ spec })`；要入仓库，加 `src/themes/<id>/persona.spec.ts` **并**把 import 加到 `src/public/personas.ts`。
- **不要跳过 `validatePersona`**——即便是在内置 persona 上做微调。patch 系统（`elements` / `containers` / `inline` 支持 `__reset: true`）能意外清掉平台约束。

## 相关工程资源

- [src/themes/_shared/spec/types.ts](../../src/themes/_shared/spec/types.ts)——`PersonaSpec` 完整类型，每个字段的注释解释了存在意义。
- [src/themes/_shared/spec/validate.ts](../../src/themes/_shared/spec/validate.ts)——每条硬规则都写了**为什么**（对应微信平台上的哪个坑）。
- [src/themes/default/persona.spec.ts](../../src/themes/default/persona.spec.ts)——金标准参考；其余 8 套都是对它的变奏。
- [scripts/validate-spec.ts](../../scripts/validate-spec.ts)——`npx tsx scripts/validate-spec.ts` 一键校验所有内置 spec。
- [scripts/gen-schema.ts](../../scripts/gen-schema.ts)——导出 `dist/schema/persona-spec.schema.json` 给外部消费方。
- [scripts/gen-gallery.ts](../../scripts/gen-gallery.ts)——从实时 spec 重新生成 `docs/personas-spec-gallery.html`。

## references/ 目录

只在真正需要查某块细节时读对应文件，避免在主线任务里过度加载：

- [references/api.md](references/api.md)——12 个符号的完整签名 + 返回类型 + 典型调用。
- [references/hard-rules.md](references/hard-rules.md)——硬约束清单 + 每条规则**为什么存在**（微信平台上的具体现象）。
- [references/motif-ast.md](references/motif-ast.md)——MotifShape / MotifTemplate / 7 种基元的字段语义 + 嵌套规则 + 占位符替换。
- [references/personas.md](references/personas.md)——9 套内置 persona 的速查表：受众、配色签名、signature 容器、适配话题。
