---
name: wechat-typeset
description: 当用户对 wechat-typeset 仓库提出宽口径的"把文章发到公众号""做一篇公众号""排个版给我看看""帮我用 wechat-typeset 出一篇"之类需求，且不确定该走 author-persona / annotate-markdown / export-richtext 哪一条主线时，由本 skill 在 5 秒内判断意图并指引到具体子 skill。本 skill **不做** 实际工作（不写 spec / 不改 markdown / 不渲染），仅做意图路由 + 一次性概览。
---

# wechat-typeset · 路由入口

> 这是一个**意图分发** skill，不是工作流 skill。它的全部职责：在用户给出"宽口径需求"时，5 秒内判断该走哪条主线、给出一次性的项目概览、把控制权交给真正执行工作的子 skill。

## 为什么需要这个 skill

项目按用户任务边界拆成了 3 个工作流 skill：

| skill | 边界 | 触发词 |
| --- | --- | --- |
| [wechat-typeset-author-persona](../wechat-typeset-author-persona/SKILL.md) | **视觉设计** | "造主题"、"换色板"、"加个 motif"、"VT220 琥珀字"、"像 Stripe Docs" |
| [wechat-typeset-annotate-markdown](../wechat-typeset-annotate-markdown/SKILL.md) | **写作改写** | "改成公众号格式"、"加排版块"、"标注成 tip"、"按契约改写"、"挑一套 persona" |
| [wechat-typeset-export-richtext](../wechat-typeset-export-richtext/SKILL.md) | **渲染导出** | "渲染出来"、"复制到公众号"、"导出 HTML"、"几套主题比较" |

但用户的**第一句话**经常是宽口径的——"帮我用 wechat-typeset 发一篇文章" / "做个公众号"。这时三个 skill 的 description 都有点像、又都不完全像；走错任何一个都要兜回头。本 skill 在这种情况下顶上来，做一次路由，避免 LLM 在三个 skill 描述之间反复横跳。

## 5 步路由判断（请按顺序执行）

进入本 skill 后，**不要直接动手做任何视觉设计 / markdown 改写 / 渲染**。先按下面顺序判：

### Step 1 · 当前输入是哪种？

- **用户给了一段/一篇 markdown** + 没用 `:::` 容器 → 路由到 `wechat-typeset-annotate-markdown`
- **用户给了一段/一篇 markdown** + 已经满了 `:::` 容器 → 路由到 `wechat-typeset-export-richtext`
- **用户只给了视觉气质描述 / 参照锚点**（"像 Stripe Docs"、"暖色系"、"夜行技术风"）→ 路由到 `wechat-typeset-author-persona`
- **以上都没有，只是问"怎么开始"** → 跳到 [Step 5 · 标准 happy path](#step-5--标准-happy-path)

### Step 2 · 用户的需求是哪一类？

| 关键词 / 短语 | 路由到 |
| --- | --- |
| "造主题"、"换主色"、"换 motif"、"deriv from"、"VT220"、"暖米底"、"加个 h2 前缀图标" | `wechat-typeset-author-persona` |
| "改成公众号格式"、"加排版块"、"标注"、"挑一套主题"、"按契约改写" | `wechat-typeset-annotate-markdown` |
| "渲染"、"导出 HTML"、"复制到公众号"、"几套主题比较"、"粘贴" | `wechat-typeset-export-richtext` |
| "做一篇" / "搞一篇" / "发一篇"（笼统） | 看 Step 1 输入；若 Step 1 也不明 → 走 happy path |

### Step 3 · 当前 markdown 是契约 md 还是普通 md？

判定方式：扫一眼输入 md 是否含 `^:::` fence。

- 含 `:::` 但不知道合法不合法 → 让 [`lint-contract.ts`](../wechat-typeset-export-richtext/scripts/lint-contract.ts) 跑一次。**这是本 skill 唯一允许直接跑的脚本** —— 因为路由判断需要这个信号。
  - `ok=true` → 路由到 `wechat-typeset-export-richtext`
  - `ok=false` → 路由到 `wechat-typeset-annotate-markdown`（带 lint issues 列表）
- 不含 `:::` → 路由到 `wechat-typeset-annotate-markdown`

### Step 4 · 用户提到具体 persona id 了吗？

- 提到了具体内置 id（`tech-explainer` / `swiss-grid` / `brutalist` 等）→ 跳过推荐阶段，直接用
- 没提，只说了气质 → 让目标 skill 内的 `recommend-persona.ts` / `recommend-from-prompt.ts` 跑一次
- 完整 persona 速览见 [../_shared/references/personas.md](../_shared/references/personas.md)（14 套内置主题，含决策树）

### Step 5 · 标准 happy path

用户只是问"怎么用这套工具"，没具体输入。给以下三步指引：

```
1. 写 markdown（普通的就行，不用记 ::: 容器）
2. 转到 wechat-typeset-annotate-markdown：
     - 跑 recommend-persona.ts 选主题
     - 跑 annotate-md.ts 拿容器提议
     - 应用 + lint-contract.ts 校验
3. 转到 wechat-typeset-export-richtext：
     - render-html.ts --input <md> --persona <id> --output out.html
     - 浏览器打开 → Ctrl+A + Ctrl+C → 粘到 mp.weixin.qq.com 编辑器
```

仅当用户说"我要造一套自己的主题视觉"时，把第 1 步前置：

```
0. 转到 wechat-typeset-author-persona：
     - recommend-from-prompt.ts 看是否能复用现成主题
     - 不能复用 → new-persona-from-prompt.ts + validate-and-fix.ts 循环 + preview-motifs.ts
     - persist-persona.ts 落到 src/core/themes/
```

## 本 skill 不做的事

- **不写 PersonaSpec JSON** —— 转 `wechat-typeset-author-persona`
- **不改写 markdown 加 `:::` 容器** —— 转 `wechat-typeset-annotate-markdown`
- **不调用 `render()` / `lint()` 之外的脚本** —— 路由仅需 lint 信号，其他脚本属于子 skill
- **不重复子 skill 的工作流细节** —— 路由完就退出；具体步骤在子 skill 的 SKILL.md 里

## 项目一句话概览（仅在路由前需要时引用）

- **公共 API**：`src/public/index.ts` 暴露 12 个符号（`render` / `createPersona` / `validatePersona` / `listPersonas` / `getContainerVocabulary` / `getVariantIds` / `getSupportedSignatureContainers` 等）
- **写作契约**：`:::` fence 容器表见 [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md)；硬约束见 [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md)
- **CLI 真源**：所有脚本签名 / 退出码 / JSON 输出形状见 [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md)
- **14 套内置主题**：见 [../_shared/references/personas.md](../_shared/references/personas.md)

## 相关参考

- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（决策树在底部）
- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · 全部 CLI 真源
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../wechat-typeset-author-persona/SKILL.md](../wechat-typeset-author-persona/SKILL.md) · 视觉设计主线
- [../wechat-typeset-annotate-markdown/SKILL.md](../wechat-typeset-annotate-markdown/SKILL.md) · 写作契约改写主线
- [../wechat-typeset-export-richtext/SKILL.md](../wechat-typeset-export-richtext/SKILL.md) · 渲染导出主线
