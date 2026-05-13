# 自定义扩展

[← 回 README](README.md)

写作者通常用不到本文档——基础契约 + 现有扩展包足以覆盖公众号 95% 的版面需求。
当你做集成 / fork、需要加私有容器或新增 variant 骨架时（如内刊专用 `editorial-note`、播客 `episode-card`、电商 `sku-row`，或给现有 `admonition` 池加一种 `corporate-stamp` 骨架），按本文档走。

## 何时该加自定义容器（决策清单）

先问三次"能不能不加"：

1. **能用基础契约的容器拼出来吗？** —— 优先复用，少新增。基础契约 23 个容器覆盖面已经很广。
2. **能用 `::: free` 装下吗？** —— 一次性的、不可复用的版面（推荐合集、致谢页），写进 `free` 即可，无需建容器。注意：`free` 内的内容退出契约保护。
3. **它在产品里至少出现 3 次了吗？** —— 三次以上的重复模式才值得抽出来。一次性需求别污染词汇表。

三次都"是"，再开始走自定义流程。

---

## 自定义容器的四步流程

新增 variant 骨架（不是容器、只是给已有池加新视觉）走的是 [另一份流程](#自定义-variant-骨架)。

### 1. 在词汇表登记

[`src/containers/vocabulary.ts`](../../src/containers/vocabulary.ts) 末尾追加 `ContainerSpec`：

```ts
{
  name: 'episode-card',         // kebab-case，fence 名直接用这个
  styleKey: 'episodeCard',      // camelCase，对应 ThemeContainers 字段；不参与主题 CSS 槽位填 null
  category: 'content',          // 写作者心智分组
  fenceLength: 3,
  attrs: [
    { key: 'ep', description: '第 N 期（monospace 小字）', example: 'EP.042' },
    { key: 'duration', description: '时长 mm:ss', example: '46:18' },
  ],
  description: '播客单期卡：封面 + 标题 + 期号 + 时长。',
  example: '::: episode-card ep="EP.042" duration="46:18"\n标题\n:::\n',
}
```

### 2. 写渲染器

在 `src/pipeline/containers/` 下新建文件，导出一个 `ContainerRenderer`：

```ts
export const episodeCardContainer: ContainerRenderer = {
  open: (ctx) => `<section class="container-episode-card" style="...">…`,
  close: '</section>\n',
}
```

在 `src/pipeline/containers/index.ts` 的 `CONTAINER_REGISTRY` 里登记 `'episode-card': episodeCardContainer`。

### 3. （可选）参与主题 CSS 槽位

如果希望主题作者能为本容器调样式：

- `vocabulary.ts` 里 `styleKey` 写 camelCase（如 `'episodeCard'`）
- 在 [`src/themes/types.ts`](../../src/themes/types.ts) 的 `ThemeContainers` 接口补 `episodeCard?: CSSObject`
- 在 [`src/themes/_shared/buildTheme.ts`](../../src/themes/_shared/buildTheme.ts) 的 `baseContainers()` 里补默认值（可以是 `{}`）

### 4. （可选）登记为签名容器

如果某些主题想"承诺"渲染本容器，使其出现在 `signatureContainers` 声明里：

- 在 [`src/themes/_shared/spec/`](../../src/themes/_shared/spec/) 的 `SUPPORTED_SIGNATURE_CONTAINERS` 数组里追加 styleKey
- 主题 spec 里加 `signatureContainers: [..., 'episodeCard']`

---

## 该划进哪个 pack？

| 情况 | 建议 |
| --- | --- |
| 通用度高，预计大多数主题都该支持 | 归入 **base**（基础契约） |
| 服务特定写作品类（数据简报 / 学术 / 电商 / 播客 / 本地生活……） | 新建 **扩展包**：在 [`scripts/build-writer-docs.ts`](../../scripts/build-writer-docs.ts) 的 `PACK_OF` 里登记，并在 `docs/contract/packs/` 下新建文档 |
| 仅供单个集成方使用 | 不要进 vocabulary，走 fork 私有维护 |

> 同一容器**只能属于一个 pack**。pack 是文档分组手段，不是运行时加载边界——所有 vocabulary 里的容器都会被注册到 markdown-it。

---

## 自定义 variant 骨架

不是新加容器，而是给某个**已有 variant 池**（admonition / quote / compare / steps / divider / sectionTitle / note / codeBlock）加一种新骨架，按下面三步：

### 1. 实现 variant 文件

在 `src/core/variants/<kind>/` 目录下新建 `<id>.ts`，default export 一个 `VariantDef`（codeBlock 是 `CodeBlockDef`）：

```ts
import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { svg } from '../_thumb'

const myStamp: VariantDef<AdmonitionRenderArgs> = {
  meta: { id: 'corporate-stamp', kind: 'admonition', name: '公司印章', description: '...' },
  thumbnail: () => svg(`<rect .../>`),
  snippets: [{
    presetId: 'ad-tip-corporate-stamp',
    name: '公司印章 Tip',
    description: '...',
    admonitionKind: 'tip',
    markdown: '::: tip variant=corporate-stamp\n...\n:::\n',
  }],
  render: (ctx, { kind }) => ({ wrapperCSS: '...', /* ... */ }),
}
export default myStamp
```

### 2. 进聚合器 `_all.ts`

在 `src/core/variants/<kind>/_all.ts` import 并追加到数组，让 `ALL_VARIANT_DEFS` 收得到。

### 3. 登记到 `VARIANT_IDS`

在 [`src/core/themes/types.ts`](../../src/core/themes/types.ts) 的 `VARIANT_IDS[<kind>]` 数组末尾加 id，同步把对应 union 类型（`AdmonitionVariantId` / `QuoteVariantId` / ...）也加上：

```ts
export type AdmonitionVariantId =
  | 'accent-bar'
  | 'pill-tag'
  // ...
  | 'corporate-stamp'

export const VARIANT_IDS = {
  admonition: [
    'accent-bar',
    // ...
    'corporate-stamp',
  ] as const satisfies readonly AdmonitionVariantId[],
  // ...
}
```

主题在 PersonaSpec 里选用时与其他 id 同写法，TS 编译器按 union 类型校验：

```ts
export const spec: PersonaSpec = {
  variants: { admonition: 'corporate-stamp', /* ... */ },
}
```

### 不进 `VARIANT_IDS` 的后果

| 机制 | 后果 |
| --- | --- |
| 组件库面板 | snippet 不出现在抽屉或 Studio 里——作者无入口插入 |
| 用户保存校验 | 含 `variant=<id>` 的片段被判为"未注册 variant"，不能保存为「我的组件」 |
| 反向 sanity 守卫 | 单测失败——实现进了 `ALL_VARIANT_DEFS` 但 `VARIANT_IDS` 没同步 |

`_all.ts` 决定渲染器认不认；`VARIANT_IDS` 决定面板和保存路径认不认。两边必须对齐。

### 契约保护范围

进了 `VARIANT_IDS` 的 variant 由 `variant-sanity.spec.ts` 在所有内置主题 × 全部 variant 矩阵下跑渲染，验证：

- 渲染零抛错
- 产物不含被微信剥离的 CSS（`position:` / `@media` / `:hover` 等）
- 内嵌 SVG 不带 `id=` / `url('...')`
- juice 后 `<style>` 全部内联

外部 fork 里只在私有 `_all.ts` 注册、未进 `VARIANT_IDS` 的 variant 不在保护范围。

---

## 自定义扩展不在契约保护内

写进 [`vocabulary.ts`](../../src/containers/vocabulary.ts) 的容器在**本仓库的承诺保护下**——通过测试、走 wxPatch、与硬约束验证集成。
但**fork 私有维护、绕过 PR 流程添加**的容器：

- 不参与 `dist/api/capabilities.json` 的对外契约
- 不进入 `wxPatch` / 硬约束的回归测试矩阵
- 公众号侧的 bug 自行承担

如果你的私有容器值得共享，欢迎 PR 进主仓——pack 命名 / 适用主题边界讨论清楚后入库。
