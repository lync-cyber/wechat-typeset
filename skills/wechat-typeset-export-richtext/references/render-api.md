# Render API 详细参考（独家 reference）

> 渲染管线的公共 API 完整签名。**只列 export-richtext skill 用得到的部分**——主题创作的 API（createPersona / validatePersona / motif 工具）在 wechat-typeset-author-persona skill 里。

## 入口：`render(input)`

```ts
import { render } from '../../../src/public'

interface PublicRenderInput {
  md: string
  persona?: string       // 9 个内置 id 之一
  theme?: Theme          // 已构建的 Theme 对象（罕见）
  spec?: PersonaSpec     // 临时 spec（先校验再投影）
  wxPatch?: WxPatchOptions
}

interface WxPatchOptions {
  svgWhiteBg?: boolean   // 默认 true。SVG fill #fff/#ffffff → #fefefe（规避微信光栅化把纯白当透明）
}

interface PublicRenderOutput {
  html: string
  wordCount: number
  readingTime: number    // 分钟，向上取整
}
```

### 三选一规则（exclusive）

- 同时给两个以上 → 抛 `Error('render: provide exactly one of persona | theme | spec')`
- 都不给 → 默认 `persona: 'default'`
- 给 `spec` 时先 `validateSpec`，不通过抛 `SpecValidationError`

### 三条路径的语义

```ts
render({ md, persona: 'tech-explainer' })   // 内置主题（最常见）
render({ md, theme: builtTheme })           // 已经 specToTheme 过的对象（罕见，CI 复用）
render({ md, spec: llmGeneratedSpec })      // LLM 临时 spec（每次都跑校验，失败抛错）
```

## 元信息查询

```ts
import {
  listPersonas,
  getPersona,
  getPersonaSummary,
} from '../../../src/public'

listPersonas()
// → [{id, name, description, audience, palette, variants, signatureContainers}, ...] × 9

getPersona('tech-explainer')
// → 完整 PersonaSpec；未知 id 抛 Error（不静默回退到 default）

getPersonaSummary('tech-explainer')
// → 等价于 listPersonas().find(s => s.id === id) 的 strict 版
```

## 容器词汇表查询（用于 lint）

```ts
import {
  getContainerVocabulary,
  getContainerSpec,
} from '../../../src/public'

getContainerVocabulary()
// → readonly ContainerSpec[]（25 条）

getContainerSpec('quote-card')
// → { name, styleKey, category, variantKind?, attrs?, fenceLength, description, example }
// 未知 name 返回 undefined（不抛错，方便 fuzzy 查询）
```

## wxPatch 选项细节

`wxPatch: { svgWhiteBg: true }` （默认）行为：

- SVG 子树内 `fill="#ffffff"` / `fill="#fff"` 替换为 `fill="#fefefe"`
- 不影响 SVG 外的 HTML 内容
- 不影响非纯白 fill（如 `#fefefe` 已经是它本身，原样保留）

**何时关 `svgWhiteBg: false`**：

- 主题预览页面想要纯白对比（如 toolbar 主题切换器的预览纸）
- 本地 HTML 文件浏览器查看（不会粘贴到公众号）

```ts
render({ md, persona: 'default', wxPatch: { svgWhiteBg: false } })
```

## 异常类型

### `SpecValidationError`

走 `render({ spec })` 路径时 spec 校验失败抛出：

```ts
try { render({ md, spec: llmSpec }) }
catch (e) {
  if (e instanceof SpecValidationError) {
    console.log(e.result.errors)
    // [{ path: 'palette.primary', message: 'must match ^#[0-9a-fA-F]{3,8}$', severity: 'error' }, ...]
  }
}
```

`e.result.errors` 数组可以原样喂回 LLM 做 self-correct——但这是 author-persona skill 的工作，不是本 skill。

### `Error('Unknown persona id')`

`getPersona(id)` 路径上 id 未注册时抛出。本 skill 应：

1. 不 catch，直接转告用户检查拼写
2. 用 `listPersonas()` 显示合法 id 清单
3. 不要静默回退到 `default`——掩盖意图错

### markdown-it 渲染异常

不会抛——markdown-it-container 对未知 fence 名静默当段落。**这是为什么需要 lint-contract.ts**：发现 unknown_container 不能等到 render 阶段，只能在源 markdown 上扫描。

## 渲染管线步骤

`render()` 内部按顺序执行：

```
md
 ├── markdown-it 解析（含 5 个行内扩展 + 25 个 container 注册）
 ├── plugin 链：mark / ins / footnote / task-lists / 自定义着重&波浪 / 容器
 ├── 主题样式投影：specToTheme（如果走 spec 路径）+ themeCSS 生成 inline style
 ├── juice 内联：把 <style> 内 CSS 全部内联到 style=""
 ├── wxPatch 链：
 │     patchListWrap → stripForbiddenAttrs → stripForbiddenTags
 │     → stripFontFamily → patchSvgUrlQuotes → patchSvgIds
 │     → patchFlexToFallback → patchSvgWhiteBg（可关）
 └── html string（含 wordCount / readingTime 统计）
```

`wxPatch` 详细行为见 [wxpatch-behavior.md](wxpatch-behavior.md)。

## 性能特征

- 单 persona 渲染（2000 字 markdown）：~50-100ms（Node 18+）
- gallery 9 persona：~500-1000ms（串行；可加 worker 并行但对本 skill 不必要）
- 大文档（≥10000 字）：~200-500ms

**瓶颈**：juice 内联（字符串扫描合并 CSS）。无关 markdown-it 解析速度。

## 与浏览器 dev 版本的差异

仓库 `npm run dev` 用浏览器跑同一份 `render()`——结果**应该完全一致**。差异点：

- 浏览器版本走 Vue 组件挂载，多了 DOM mount 过程（不影响 HTML 输出）
- 本 skill 的 CLI 用 JSDOM 提供 DOMParser/XMLSerializer/document/Node 全局
- JSDOM 与 Chrome 的 DOM 实现 99% 等价；少数 SVG edge case 可能差异（罕见）

如果 CLI 渲染结果与浏览器不一致，提 issue 到 wechat-typeset 仓库。
