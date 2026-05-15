---
name: wechat-typeset
description: wechat-typeset 仓库的意图路由入口。当用户对仓库提出宽口径需求（"做一篇公众号""排个版给我看看""帮我用 wechat-typeset 出一篇"）且不确定走 author-persona / annotate-markdown / export-richtext 哪条主线时使用。**只做意图判断 + 一次性概览**——不写 spec、不改 markdown、不渲染。
---

# wechat-typeset · 路由入口

> 这是**意图分发** skill，不是工作流 skill。职责：在用户给出"宽口径需求"时，5 秒内判断走哪条主线、给出一次性的项目概览、把控制权交给真正执行工作的子 skill。

## 子 skill 边界

| skill | 边界 | 触发词 |
| --- | --- | --- |
| [wechat-typeset-author-persona](../wechat-typeset-author-persona/SKILL.md) | **视觉设计** | "造主题"、"换色板"、"加个 motif"、"VT220 琥珀字"、"像 Stripe Docs" |
| [wechat-typeset-annotate-markdown](../wechat-typeset-annotate-markdown/SKILL.md) | **写作改写** | "改成公众号格式"、"加排版块"、"标注成 tip"、"按契约改写"、"挑一套 persona" |
| [wechat-typeset-export-richtext](../wechat-typeset-export-richtext/SKILL.md) | **渲染导出** | "渲染出来"、"复制到公众号"、"导出 HTML"、"几套主题比较" |

用户的第一句话经常是宽口径的——"帮我用 wechat-typeset 发一篇文章" / "做个公众号"。本 skill 顶上来做一次路由，避免 LLM 在三个 skill 描述之间反复横跳。

## 路由总表（信号 → skill）{#routing-table}

> **三个工作流 skill 的进入/退出信号的单一真源**。子 skill SKILL.md 不再重复，只引此处。

### 进入信号（一句话需求 → 直接进哪个 skill）

| 用户信号 | 路由到 |
| --- | --- |
| 给一段/一篇 markdown，**没**用 `:::` 容器，要"加排版块" / "按公众号格式" | `wechat-typeset-annotate-markdown` |
| 问"这段写成 tip 还是 highlight" / "这种内容用哪个容器" | `wechat-typeset-annotate-markdown` |
| 说"挑一套合适的 persona" / "为这个话题选 persona" | `wechat-typeset-annotate-markdown` |
| 文章写完要发公众号但还在普通 markdown 状态 | `wechat-typeset-annotate-markdown` |
| 描述视觉气质（"暖米底圆角" / "VT220 琥珀字" / "杂志感首字下沉" / "newsletter 期号印章"） | `wechat-typeset-author-persona` |
| 从现有主题派生（"在 default 基础上换主色" / "tech-explainer 但 code 块要更花"） | `wechat-typeset-author-persona` |
| 要造装饰元素（h2 前缀图标 / 分隔线 motif / 步骤徽章 / 印章） | `wechat-typeset-author-persona` |
| 给一份 `:::` 容器满布的 markdown，要"渲染" / "导出" / "复制" | `wechat-typeset-export-richtext` |
| 在浏览器跑过 `npm run dev` 但想纯 CLI 走（CI / 自动化场景） | `wechat-typeset-export-richtext` |
| 拿不准用哪套 persona，想"几套都渲染一下比较" | `wechat-typeset-export-richtext` |

### 退出 / 转向信号（已在某 skill 内但要换出去）

| 当前 skill | 信号 | 转向 |
| --- | --- | --- |
| annotate-markdown | markdown 已含合法 `:::` 容器要"渲染" / "导出" | export-richtext |
| annotate-markdown | 要造主题色 / motif / 自定义视觉 | author-persona |
| annotate-markdown | `personas recommend` 输出 `recommendNew=true` | author-persona |
| annotate-markdown | 主体是数学公式 / 流程图 / 非 markdown 内容 | 不处理；让用户先转标准 markdown |
| author-persona | 给一段 markdown 要"标注" / "加排版块" | annotate-markdown |
| author-persona | 要"渲染" / "导出 HTML" / "复制到公众号" | export-richtext |
| author-persona | 改通用 CSS / 加非主题 fence 容器 | 改 `src/core/vocabulary/vocabulary.ts`（不在 skill 边界内） |
| export-richtext | markdown 还没标 `:::` | annotate-markdown |
| export-richtext | 要造新主题 | author-persona |
| export-richtext | 渲染失败抛 `WtException(SPEC_INVALID)` | author-persona 修 spec |
| export-richtext | 渲染失败抛 `WtException(CONTRACT_VIOLATION)` 或 lint 报 `unknown_container` | annotate-markdown 修 markdown |

## 5 步路由判断（按顺序执行）

进入本 skill 后**不要直接动手做视觉设计 / markdown 改写 / 渲染**，按下面顺序判：

### Step 1 · 当前输入是哪种？

| 输入特征 | 路由到 |
| --- | --- |
| 一段/一篇 markdown + 没用 `:::` 容器 | `wechat-typeset-annotate-markdown` |
| 一段/一篇 markdown + 已经满了 `:::` 容器 | `wechat-typeset-export-richtext` |
| 只有视觉气质描述 / 参照锚点（"像 Stripe Docs"、"暖色系"、"夜行技术风"） | `wechat-typeset-author-persona` |
| 只是问"怎么开始"，无具体输入 | 跳到 Step 5 标准 happy path |

### Step 2 · 用户的需求是哪一类？

| 关键词 / 短语 | 路由到 |
| --- | --- |
| "造主题"、"换主色"、"换 motif"、"derive from"、"VT220"、"暖米底"、"加个 h2 前缀图标" | `wechat-typeset-author-persona` |
| "改成公众号格式"、"加排版块"、"标注"、"挑一套主题"、"按契约改写" | `wechat-typeset-annotate-markdown` |
| "渲染"、"导出 HTML"、"复制到公众号"、"几套主题比较"、"粘贴" | `wechat-typeset-export-richtext` |
| "做一篇" / "搞一篇" / "发一篇"（笼统） | 看 Step 1 输入；若 Step 1 也不明 → 走 Step 5 happy path |

### Step 3 · 当前 markdown 是契约 md 还是普通 md？

判定方式：扫输入 md 是否含 `^:::` fence。

- **不含 `:::`** → 路由到 `wechat-typeset-annotate-markdown`
- **含 `:::` 但不知道合法不合法** → 跑 `npm run cli -- lint --json`（**这是本 skill 唯一允许直接跑的命令**，路由判断需要这个信号）：
  - `ok=true` → 路由到 `wechat-typeset-export-richtext`
  - `ok=false` → 路由到 `wechat-typeset-annotate-markdown`（带 issues 列表）

```bash
echo '{"md":"...原文..."}' | npm run cli -- lint --json
```

### Step 4 · 用户提到具体 persona id 了吗？

- **提到了具体内置 id**（`tech-explainer` / `swiss-grid` / `brutalist` 等）→ 跳过推荐阶段，直接转目标 skill
- **没提，只说了气质** → 让目标 skill 内的 `npm run cli -- personas recommend` 跑一次
- 完整 persona 速览见 [../_shared/references/personas.md](../_shared/references/personas.md)（14 套内置主题，含决策树）

### Step 5 · 标准 happy path

用户只是问"怎么用这套工具"，没具体输入。给以下三步指引：

```
1. 写 markdown（普通的就行，不用记 ::: 容器）
2. 转 wechat-typeset-annotate-markdown：
     - npm run cli -- personas recommend  # 选主题
     - npm run cli -- annotate            # 拿容器提议
     - npm run cli -- lint --persona <id> # 校验
3. 转 wechat-typeset-export-richtext：
     - npm run cli -- render --input <md> --persona <id> > out.html
     - 浏览器打开 → Ctrl+A + Ctrl+C → 粘到 mp.weixin.qq.com
```

仅当用户说"我要造一套自己的主题视觉"时，把第 1 步前置：

```
0. 转 wechat-typeset-author-persona：
     - npm run cli -- personas recommend                          # 看能否复用
     - 不能复用 → tsx skills/wechat-typeset-author-persona/scripts/new-persona-from-prompt.ts
     - npm run cli -- validate --spec tmp/spec.json               # 循环至 ok=true
     - tsx skills/wechat-typeset-author-persona/scripts/preview-motifs.ts tmp/spec.json
     - tsx skills/wechat-typeset-author-persona/scripts/persist-persona.ts tmp/spec.json --id <kebab-id>
```

## 本 skill 不做的事

| ❌ 不做 | ✅ 应转向 |
| --- | --- |
| 写 PersonaSpec JSON | `wechat-typeset-author-persona` |
| 改写 markdown 加 `:::` 容器 | `wechat-typeset-annotate-markdown` |
| 调用 `lint` 之外的 CLI 命令 | 子 skill 各自负责（路由只需 lint 信号） |
| 重复子 skill 的工作流细节 | 路由完即退出；具体步骤在子 skill 的 SKILL.md |

## 项目一句话概览（仅在路由前需要时引用）

- **公共 API**：`src/public/index.ts` 暴露 12 个符号（`render` / `createPersona` / `validatePersona` / `listPersonas` / `getContainerVocabulary` / `getVariantIds` / `getSupportedSignatureContainers` 等）
- **写作契约**：`:::` fence 容器表见 [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md)；硬约束见 [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md)
- **CLI 真源**：所有命令签名 / 退出码 / JSON 输出形状见 [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md)
- **14 套内置主题**：见 [../_shared/references/personas.md](../_shared/references/personas.md)

## 相关参考

- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · 全部 CLI 真源
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（决策树在底部）
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单
- [../wechat-typeset-author-persona/SKILL.md](../wechat-typeset-author-persona/SKILL.md) · 视觉设计主线
- [../wechat-typeset-annotate-markdown/SKILL.md](../wechat-typeset-annotate-markdown/SKILL.md) · 写作契约改写主线
- [../wechat-typeset-export-richtext/SKILL.md](../wechat-typeset-export-richtext/SKILL.md) · 渲染导出主线
