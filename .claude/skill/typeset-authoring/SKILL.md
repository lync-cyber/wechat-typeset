---
name: typeset-authoring
description: >
  wx-md（微信公众号 Markdown 排版器）的扩展与排版助手。主要用途：帮用户往本仓库加一套
  新主题 / 新 variant 骨架 / 新组件库预设，产物是直接可跑通 `npm test` 的代码文件，
  不是空文档。次要用途：给用户手头一段 markdown 出"主题 + 6 类 variant 组合 + 组件片段"的
  排版方案。
  触发条件："新主题"、"加主题 {slug}"、"加 variant"、"新骨架"、"加组件预设"、
  "preset"、"排版这段 markdown"、"换个排版风格"、"wx-md 怎么套"。
  首要原则是微信公众号平台兼容（所有产物必须 inline-only 且无 position/float/@media/
  @keyframes/:hover，见 src/pipeline/rules.ts 的硬白名单）；
  次要原则是**极端大胆**——同一视觉决策要么贴基调做极致，要么直接相反，拒绝"差不多"的
  中庸微调。
argument-hint: "[--mode=theme|variant|preset|article] [slug/id]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, AskUserQuestion
---

# wx-md 扩展与排版助手（Typeset Authoring）

本 skill 把 wx-md 的内部结构暴露给 LLM，用来做两件事：

1. **扩展工具**（`--mode=theme|variant|preset`，primary）——产出可跑通 `npm test` 的代码文件
2. **排版一段 markdown**（`--mode=article`，secondary）——不动源码，只产出一份排版方案

---

## 立场宪章（全程遵守）

以下不是建议，是硬边界。违反任一条需回到 §2 重来。

### 宪章 1 — 微信兼容为先

所有平台硬约束的**单一事实来源**是 [src/pipeline/rules.ts](../../../src/pipeline/rules.ts)：

- `FORBIDDEN_CSS_PROPS` —— 主题/variant 在 `elements`/`containers`/`wrapperCSS` 里写了这些属性会在开发期 `throw ThemeAuthoringError`
- `FORBIDDEN_CSS_PATTERNS` —— 最终 HTML 扫描层，`tests/variant-sanity.spec.ts` 会按这张表逐个 `expect(html).not.toContain`
- `FORBIDDEN_DISPLAY_VALUES` —— `flex / grid` 黑名单（改用 `table` / `inline-block`）
- `HARD_REMOVE_TAGS` —— `<style> / <script> / <link> / <meta>` 粘贴后会被微信剥离
- `NEAR_WHITE` = `#fefefe` —— SVG 里需要纯白的地方必须用这个偏色（微信光栅化会把纯白转 alpha=0）

**任何新增规则 = 改这一个文件一次 + 跑 `npm test` 看谁接住**；不要在别处复制粘贴规则。

### 宪章 2 — 极端大胆，拒绝中庸

**真正的设计来自立场，不是居中**。每个新 variant / 新主题 / 新预设要能一句话说清"它在设计空间里占据哪个角落，为什么这个角落值得占"。

反面清单（发现任一条即是中庸）：

- 新主题的 `primary` 色与现有 5 套主题色相差 < 30° —— 等于重复劳动
- 新 variant 的 `wrapperCSS` 和现有 variant 差一个 `padding` 值 —— 这是参数，不是骨架
- 新预设的 markdownSnippet 只和现有某条差一个标点 —— 删掉重想
- 说不出"为什么不用 default" → 不要加

### 宪章 3 — 不造新骨架，除非能命名新 VariantId

新 variant 必须：
1. 在 [src/themes/types.ts](../../../src/themes/types.ts) 的对应 `{Kind}VariantId` union 里**新增一个字面量**
2. 同步把这个字面量加到 `VARIANT_IDS.{kind}` 数组
3. 否则 TS 编译不过，`variant-sanity` 测试也不会扫到

"只改个样式就想跑"的 variant 不是 variant —— 是现有某 variant 的 attrs 变体，应通过 markdown 层传 `attrs` 或用组件库预设封装。

### 宪章 4 — context-specific 的 why

每个决策必须能用一句**具体**的话解释：

- ✗ "我加 `frosted-glass` admonition 因为它看起来现代" — 太泛，换
- ✓ "`frosted-glass` 用 `background: rgba(255,255,255,0.55) + backdrop-filter:blur(8px)` 做半透磨砂，但微信会剥 `backdrop-filter` → 此 variant 要用 SVG data-URI 预渲染的雾化背景图实现" — 有 context 有路径

说不出 context → AI slop，换。

### 宪章 5 — 预设优先于手写 fence

用户的日常写稿动作是**点组件库面板插入预设**，不是手敲 `::: tip variant=X`。
所以：新 variant 加完必须配至少 2 条 preset 上架到 `src/components-lib/presets/{kind}.ts`；不然用户在 UI 里根本看不到它。

---

## 流程

```
①入口判定 → ②mode 分派 → ③（强制 AskUserQuestion ≥1 轮）→ ④写代码/写方案 → ⑤跑验证 → ⑥自检
```

**禁止 0 交互直通**。即使用户给了完整需求，也至少走一次 §2 的 AskUserQuestion 确认"签名元素落在哪"——这是开放题，需要用户选择。

---

## 1. 入口判定

### 必需输入

- `--mode=theme`：`{slug}`（小写 kebab-case，会作为 `src/themes/{slug}/` 目录名和 `themeRegistry` key）
- `--mode=variant`：`{kind}` ∈ {admonition, quote, compare, steps, divider, sectionTitle} + `{id}`（kebab-case）
- `--mode=preset`：`{kind}`（含 `none` 用于 intro/author/footer-cta 等自由组件）+ 目标 variant id（`kind != 'none'` 时必填）
- `--mode=article`：一段粘贴进来的 markdown 文本

### 默认 mode 推断

用户没显式给 `--mode` 时用触发词推断：

| 用户说 | 推断 mode |
|---|---|
| "新主题 {slug}" / "加个主题" | `theme` |
| "加 variant" / "加个骨架" / "加 {kind} 的 {id}" | `variant` |
| "加预设" / "加 preset" / "添加一条组件" | `preset` |
| "排版这段" / "这段怎么排" / 粘贴 markdown 后问"怎么样" | `article` |

推断不了时**先问用户**——不要默认进 article 模式。

---

## 2. 问询（AskUserQuestion · 至少 1 轮 · **不可跳过**）

每个 mode 的必问题如下。用一轮 AskUserQuestion 一次发出（可多选）。

### mode=theme

```
question: "新主题最想跟现有 5 套形成鲜明对比的是哪一点？至多选 2 项。"
options:
  - "色系 — 现有主题以白/米白/深色为底；新主题选一个没人占的方向（例如莫兰迪灰、玫瑰粉金、森系墨绿）"
  - "字感 — 所有主题严禁 font-family（微信会覆盖）；所以靠字号节奏 + letter-spacing 做差异"
  - "装饰密度 — 现有最装饰是 literary-humanism（点饰），最克制是 default；新主题走哪一端"
  - "签名 SVG — 要不要主题独有的 h2Prefix / sectionCorner / dividerFlower（这些装饰决定视觉记忆点）"
  - "variants 选择 — 默认是 DEFAULT_VARIANTS 全默认；大胆主题会在 6 类里选 3+ 个非默认的骨架（见 variants-dictionary.md）"
```

### mode=variant

```
question: "这个新 variant 想把 {kind} 推向哪个现有 variant 没占的方向？"
options:
  - "装饰层 — 现有靠 border/color/shadow，新 variant 用内联 SVG 的几何/纹样做签名"
  - "留白层 — 现有间距都在 16-24px 档，新 variant 用极大留白（48px+）或极密留白（6-8px）做反差"
  - "结构层 — 现有骨架的 DOM 是 div/table，新 variant 用不同结构（比如 ::before/::after？不行，微信会剥——改用 svgSlot 顶部条带/底部条带）"
  - "色彩层 — 现有用 status color，新 variant 对 kind 无关（即全 4 种 tip/warning/info/danger 用同一中性色）"
```

第二轮（视情况）：

```
question: "新 variant 和现有哪个 variant 视觉上最接近？"
补充："这能帮我判断你是想做**极端对比**还是**不小心撞车**——
如果最接近的差异 < 15% 视觉权重，要么推到更极端，要么直接用现有 variant + attrs 覆盖。"
```

### mode=preset

```
question: "这条预设的 markdownSnippet 里该留哪些可编辑占位？"
options:
  - "只留标题 — 像 'ad-tip-accent-bar' 这样：标题 = '小贴士'，正文固定两行，用户改字即可"
  - "全部 TODO — 用户 {标题}/{正文1}/{正文2} 花括号 token，自己逐个替换"
  - "真实示例 — 直接写一段能当范文的内容（见 scripts/sample-full.md 的风格），用户删改"
```

### mode=article

```
question: "这篇的视觉签名要落在哪里？拒绝中庸，至多选 2 项——三个以上就全无签名。"
options:
  - "封面卡 — cover 容器承担第一印象"
  - "章节标题 — section-title 用 cornered + 不同寻常的 sectionCorner"
  - "金句 — quote-card 全部用 magazine-dropcap（首字下沉）"
  - "提示块 — admonition 大量用 terminal 或 pill-tag"
  - "对比 — compare 全部用 ledger（双色账本）"
  - "步骤 — steps 用 timeline-dot"
  - "分隔 — divider 用 glyph + 本文专属字符（❦ / § / ◆ / ❖）"
```

---

## 3. mode=theme 执行步骤

目标目录：`src/themes/{slug}/`（新建），加一个文件 `index.ts`。

### 步骤

1. **Read [src/themes/default/index.ts](../../../src/themes/default/index.ts)**—— 这是最完整的参考实现（tokens + elements + containers + inline + assets + templates + variants 全量）
2. **Read [src/themes/types.ts](../../../src/themes/types.ts)** —— 确认 `Theme` 接口与必填字段
3. **Read [src/themes/_shared/buildTheme.ts](../../../src/themes/_shared/buildTheme.ts)** —— 了解若用工厂风格（life-aesthetic / business-finance 都走这条），和手写式（default / tech-geek）的两种选择
4. **写 `src/themes/{slug}/index.ts`**：导出一个 `Theme` 对象。SVG 资产单独拆到 `assets.ts`（跟 business-finance 学），tokens 色板 ≥ 30° 色相差于现有 5 套
5. **在 [src/themes/index.ts](../../../src/themes/index.ts) 注册**：
   ```ts
   import { {slug}Theme } from './{slug}'
   export const themeRegistry: Record<string, Theme> = {
     ...,
     '{slug}': {slug}Theme,
   }
   ```
6. **跑验证**：
   ```bash
   npm test           # 含 themes.spec / theme-variants.spec / variant-sanity.spec
   npx tsx scripts/verify-sample-full.ts   # 34 项端到端校验
   ```
7. 失败项逐条修（不要跳过任何一个）

### 不做

- **不新建 `font-family` 字段** —— themeCSS 生成器遇到即 throw
- **不把 SVG 放进 `<style>`** —— 微信剥离 `<style>`
- **不覆盖 `variants` 为 `undefined`** —— 必须显式声明 `DEFAULT_VARIANTS` 或替换为具体 id，因为 buildTheme 的默认回填只对经过工厂的路径生效

---

## 4. mode=variant 执行步骤

目标文件：`src/pipeline/containers/variants/{kind}/{id}.ts`。

### 步骤

1. **扩 union 类型**：在 [src/themes/types.ts](../../../src/themes/types.ts) 给 `{Kind}VariantId` union 新增字面量，并加到 `VARIANT_IDS.{kind}` 数组
2. **Read 参考 variant**：按宪章 2 选择和你目标"极端对比"的现有 variant。例如：做 admonition 的反向，可参考 `src/pipeline/containers/variants/admonition/terminal.ts`（最大胆）和 `.../accent-bar.ts`（最克制）
3. **写 `{kind}/{id}.ts`**：
   ```ts
   import { define{Kind} } from '../registry'

   export const {camelId} = define{Kind}('{id}', (ctx, args?) => ({
     wrapperCSS: `margin:... ;padding:... ;background-color:...`,
     titleCSS:   `font-weight:700;font-size:...;color:${ctx.tokens.colors.primary}`,
     bodyCSS:    `...`,
     svgSlot:    `...`,
   }))
   ```
   - `wrapperCSS` ≤ 400 字符（`assertVariantCSSLength` 会 throw）
   - 不写 `position / float / flex / @media / @keyframes / :hover / -webkit-`
   - 装饰用 `svgSlot` 内嵌 SVG 节点（而不是 CSS `::before` 或 `background-image: url(data:...)`——虽然 data-URI 可用，但 inline SVG 更直观）
4. **在 `{kind}/index.ts` 导出**：
   ```ts
   import { {camelId} } from './{id}'
   export const {kind}Variants = { ..., '{id}': {camelId} }
   ```
5. **跑验证**：
   ```bash
   npm test
   ```
   `variant-sanity.spec.ts` 会自动按 `VARIANT_IDS` 矩阵跑新 id × 5 主题；`themeCSS-snapshot.spec.ts` 会失败 → 更新快照前先读失败项确认是新增而非回归：
   ```bash
   npx vitest run tests/variant-sanity -u
   ```
6. **上架 preset**：见 §5，至少 2 条

---

## 5. mode=preset 执行步骤

目标文件：`src/components-lib/presets/{kind}.ts`（已有，追加）。

### 步骤

1. **Read [src/components-lib/types.ts](../../../src/components-lib/types.ts)** —— `ComponentEntry` 接口
2. **Read 同 kind 的现有预设** —— 确认命名模式：
   - admonition 用 `ad-{kind}-{variant}` 或 `ad-{variant}-{任意后缀}`
   - quote 用 `quote-{variant}`
   - compare 用 `compare-{variant}`
   - steps 用 `steps-{variant}`
   - divider 用 `div-{variant}`
   - section-title 用 `st-{variant}`
   - 自由组件（kind='none'）用 `free-{purpose}`（如 `free-intro` / `free-footer-cta`）
3. **追加 entry**：
   ```ts
   {
     id: '{id}',
     name: '{显示名}',
     description: '{≤30 字说明}',
     kind: '{kind}',
     variantId: '{variantId}',      // kind='none' 时省略
     themeCompat: [...],            // 可选
     markdownSnippet: '::: ... variant=... \n ... \n:::\n',
     thumbnailSvg: thumb.{kind}({ accent: '...', soft: '...' }),
   }
   ```
4. **跑验证**：
   ```bash
   npm test                         # component-lib.spec 会扫每条 preset 能否渲染
   ```

### 禁止

- 两条预设 `markdownSnippet` 字符相同 —— component-lib 测试会过，但用户抽屉里会看到"孪生条目"
- `thumbnailSvg` 引用外链图 —— 必须用 `thumb.{variant}()` 工厂或手写 inline SVG

---

## 6. mode=article 执行步骤

**这不改源码**。用户粘来一段 markdown，skill 只产出一份排版方案。

### 步骤

1. 用 §2 的 AskUserQuestion 问签名元素
2. 按 [references/themes-catalog.md](references/themes-catalog.md) 选主题
3. 按 [references/variants-dictionary.md](references/variants-dictionary.md) 组合 6 类骨架
4. 按 `src/components-lib/presets/*.ts` 清单列出可直接插入的预设 id
5. **改写 markdown**：把合适段落包进 `::: {容器} variant={id}` 的 fence，**不改文字内容**（不删句、不重述），只改组织结构
6. 输出格式见下

### 输出格式

```markdown
# 《{文章标题}》排版方案

**主题**：{theme id}
**签名元素**：{唯一的最亮眼视觉}（来自 §2 选项）

## Variant 组合

| kind | variant | why（context-specific） |
|---|---|---|
| admonition | {id} | {≥ 20 字具体理由} |
| quote | {id} | ... |
| compare | {id} | ... |
| steps | {id} | ... |
| divider | {id} | ... |
| section-title | {id} | ... |

## 可直接插入的组件库预设

- 开篇 → `free-intro`
- 第一段提示块 → `ad-tip-terminal`
- ...

## 改写后的 markdown

（完整 fence 化的版本，粘到 wx-md 编辑器就能用）
```

---

## 7. 自检清单

### 7.1 微信兼容（宪章 1）

所有 mode 共用：
- [ ] 产物 markdown / variant 代码里无 `<style>` / `<script>` / 自定义 class
- [ ] 所有图 `src` 均 ≤ 640 宽
- [ ] `npm test` 全绿（包含 variant-sanity 扫 FORBIDDEN_CSS_PATTERNS）

extend 模式额外：
- [ ] `npx tsx scripts/verify-sample-full.ts` 输出 `all green`
- [ ] `npm run typecheck` 无报错（新增的 VariantId 字面量已上 union）

### 7.2 反中庸（宪章 2）

- [ ] 新 variant / 新主题能说出"占据设计空间的哪个角落"
- [ ] 签名唯一（article 模式：§2 选项只有一项重押注）
- [ ] 至少 3 个 variant 非 `DEFAULT_VARIANTS`（article 模式：全默认 = 零覆盖，返工）

### 7.3 组件库优先（宪章 5）

- [ ] 新 variant 附带 ≥ 2 条 preset
- [ ] article 模式能用 preset 的地方都引用了 id

### 7.4 可执行（产物闭环）

- [ ] extend 模式的文件路径能直接 `npm run dev` 看到效果
- [ ] article 模式的改写版粘到 wx-md 编辑器能完整渲染

---

## 扩展资料

| 文件 | 何时读 |
|---|---|
| [references/variants-dictionary.md](references/variants-dictionary.md) | §2/§4 决策——23 个 variant 的气质 + 适用 + 反例 |
| [references/themes-catalog.md](references/themes-catalog.md) | mode=theme / article 选主题——5 套的极端强项 |
| [scripts/sample-full.md](../../../scripts/sample-full.md) | 每个 variant 实际 markdown 怎么写、attrs 怎么传 |
| [src/pipeline/rules.ts](../../../src/pipeline/rules.ts) | 微信排版硬约束单一事实来源（宪章 1） |
| [src/themes/types.ts](../../../src/themes/types.ts) | `VARIANT_IDS` 白名单、`ThemeVariants` 接口 |
| [src/pipeline/containers/variants/registry.ts](../../../src/pipeline/containers/variants/registry.ts) | `define{Kind}` 工厂 + VariantRenderResult 契约 |
| [src/components-lib/presets/](../../../src/components-lib/presets/) | 所有现有预设（加新 preset 时对着模仿） |
| [docs/theme-authoring.md](../../../docs/theme-authoring.md) | 主题级硬约束解释（面向非 LLM 读者的人类指南） |
| [docs/container-syntax.md](../../../docs/container-syntax.md) | `::: {容器} attrs` markdown 扩展语法 |

---
