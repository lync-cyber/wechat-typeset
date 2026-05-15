---
name: wechat-typeset-annotate-markdown
description: 把普通 Markdown 改写成 wechat-typeset 写作契约（::: 容器 + 行内扩展），并推荐 persona。触发词："改成公众号格式" / "加排版块" / "标注成 tip" / "挑一套主题" / "按契约改写" / "规范化 markdown" / "为这段文章选个 persona"。**只改 markdown，不渲染**——渲染由 wechat-typeset-export-richtext 接手。完整容器/扩展清单见正文。
---

# wechat-typeset · Markdown 标注

把"普通 markdown 文章"翻译成"满足契约的 markdown"——按段落语义插入 `:::` 容器、行内扩展、并推荐 persona。**本 skill 不做渲染**——产出仍是 markdown，交给 `wechat-typeset-export-richtext` 渲染。

## 边界

本 skill 处理 **markdown → 契约 markdown** 的改写，不做视觉设计、不做渲染。完整的进入/退出信号见**路由总表**：[`../wechat-typeset/SKILL.md#routing-table`](../wechat-typeset/SKILL.md#routing-table)。

最常见的退出信号：

- ❌ markdown 已含合法 `:::` 容器要"渲染" → 转 `wechat-typeset-export-richtext`
- ❌ 要造主题色 / motif / `personas recommend` 输出 `recommendNew=true` → 转 `wechat-typeset-author-persona`

## CLI 入口

所有标注/校验都走 `npm run cli -- <subcommand>`。同一可执行体既能 shell 也能从 MCP 工具调（schema 单一真源）。

```bash
# 通用形式
npm run cli -- <subcommand> [--flag value | --json]

# 从 stdin 读 JSON（推荐复杂参数走这个）
echo '{"md":"# 标题"}' | npm run cli -- lint --json

# 简单参数走 --flag（仅在 inputSchema 声明的字段上有效；--input <path> 读文件作 md）
npm run cli -- containers snippet --name tip
```

退出码、subcommand 签名、JSON 形状的**单一真源**：[`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md)。

> **工作目录约定**：所有中间产物落在 `tmp/`（已在 `.gitignore`）。如不存在请先 `mkdir -p tmp`。

## 主线工作流（6 步）

复制此 checklist 跟踪进度（**每步带成功判定**，不要"跑过即打勾"）：

```
Task Progress:
- [ ] 1. 意图判定 + persona 推荐 → `personas recommend` 输出 ranked[3] + recommendNew
- [ ] 2. 查主题能力 → `personas capabilities` 输出 containers[] / defaultVariants
- [ ] 3. 结构扫描（H1 / H2 / 列表 / 引用块 / 代码块）→ 心里有一张段落→容器的预设
- [ ] 4. 段落分类 + 容器提议 → `annotate` 输出 patches.json，逐条决策
- [ ] 5. 应用提议，写新 markdown（用 `containers snippet` 拿模板）
- [ ] 6. 校验 → `lint --persona <id> --json` 输出 `ok=true` 且 `errorCount=0`
       warning 不阻塞，但交付时复述给用户
```

### Step 1 · 意图判定 + persona 推荐

```bash
echo '{
  "title":"<文章标题>",
  "summary":"<一句摘要>",
  "topic":"<题材：技术/财经/人文/生活/学术/数据/文化/其他>",
  "style":"<参照锚点：FT中文/Stripe Docs/Kinfolk 等，可省>"
}' | npm run cli -- personas recommend --json
```

输出 `{ ranked[3], recommendNew, rationaleOneLine }`，按下表决策：

| 输出特征 | 决策 |
| --- | --- |
| `recommendNew=false` 且 `ranked[0].staticScore ≥ 0.85` | 用 `ranked[0].id`，进 Step 2 |
| `recommendNew=false` 但 score 一般 | ranked 三者任一可用，按用户审美挑 |
| `recommendNew=true` | 退出本 skill，先去 `wechat-typeset-author-persona` 造新主题 |
| 用户明确说"不要花哨" | 用 `default`，跳过 abstract / key-number / cover 等签名容器的提议 |

### Step 2 · 查主题能力（关键：避免用错容器）

```bash
npm run cli -- personas capabilities --id <persona-id>
```

输出含 `defaultVariants` / `recommendedVariants` / `containers[]` / `kickers`。

**Agent 决策规则**：

- ✅ 只对 `available: true` 的容器做提议
- ❌ 不要给 `default` 主题写 `kpi-dashboard`（它属于 `theme:data-brief`，跨主题渲染失去签名视觉）
- ✅ 优先用 `signature: true` 的容器承担"主题 voice"（如 brutalist 的 `masthead`/`colophon`、tech-explainer 的 `note`/`see-also`）
- ❌ 不要凭记忆写 variant id；从 `recommendedVariants` 里挑

筛签名容器例：

```bash
npm run cli -- personas capabilities --id swiss-grid \
  | jq '.containers | map(select(.available and .signature)) | map(.id)'
# → ["abstract", "section-tag", "editorial-header", "byline", ...]
```

### Step 3 · 结构扫描

按以下顺序扫一遍原文，建立"段落→容器"预设；最终决策见 Step 4。

完整 8 类段落识别表（与 [`references/annotation-recipes.md`](references/annotation-recipes.md) 同源）：

| 正则信号 | 文本信号 | 推荐容器 | confidence |
| --- | --- | --- | --- |
| `^# ` 唯一 H1 | — | 保留 H1，可加 `::: intro` 引子 | 高 |
| `^## ` 全文≥3 处 | — | 升级 `::: section-title`（见 recipes） | 中 |
| `^\d+\. ` 连续≥3 + 动词开头 | "第一步" / "打开" / "切换到" | `::: steps` | 高 |
| `^- ` 连续≥3 + 名词短语 | — | 保留原列表 + `==高亮==` 关键词 | 中 |
| `^> ` 短句句末完整 | 含"——作者"署名 | `::: quote-card` | 高 |
| `^> ` + `[1]` / `\s*注：` | "出处" / "注释" | `::: note` 或 `::: footnotes` | 中 |
| 行内代码 ≥3 处的段落 | — | 段落上方提议 `::: tip` 或 `::: warning` | 中 |
| 文首 2-4 行总览 | "本文" / "TL;DR" / "简言之" | `::: intro` 或 `::: abstract` | 高 |
| 数字密度高 `\d+%`/`\d+倍`/`\d+亿` | "X% 用户" / "Y 倍" | `::: key-number value=X 标签` | 中 |
| 双列对比 | "优点 / 缺点"、"A 派 / B 派" | `:::: compare` + `::: pros` / `::: cons` | 高 |
| 命令含 `sudo rm` 或 `⚠️`/`❌` | "切忌" / "千万不要" | `::: danger` 或 `::: warning` | 高 |
| 文末引导 | "关注我" / "点赞" / "转发" / 二维码邻近 | `::: footer-cta` | 高 |

### Step 4 · 容器提议（启发式 patch 表）

```bash
mkdir -p tmp
echo '{"md":"...原文...","persona":"<id>"}' | npm run cli -- annotate --json > tmp/patches.json
# 或文件输入
npm run cli -- annotate --input <input.md> --persona <id> > tmp/patches.json
```

输出 JSON 顶层结构（**完整 schema 见 [cli-contract.md · annotate 输出](../_shared/references/cli-contract.md#annotate-输出)**）：

| 字段 | 用途 |
| --- | --- |
| `patches[]` | 段落 → 容器提议；每条含 `line` / `endLine` / `kind` / `container` / `variant?` / `reason` / `confidence` / `preview` |
| `capabilitySnapshot` | 与 Step 2 `personas capabilities` 同源 |
| `vocabularySubset` | 全容器 example/attrs 速查（**不是 available 真源**） |
| `blockCount` | 块切分数 |

> **Agent 用 `capabilitySnapshot.containers` 作为"本主题下可用容器"的权威单一真源**，`vocabularySubset` 只用来查 example / attrs。

合法 `kind` 枚举：`wrap_paragraph` / `wrap_blockquote` / `convert_list` / `wrap_first_paragraph` / `wrap_section_title` / `wrap_pros_cons`。

**策略**：脚本不直接改 md，只输出建议。Agent（你）拿着 `patches.json` + 原文，逐条决策"应用 / 跳过 / 改改 confidence"，最后写出新的 md。

### Step 5 · 应用提议 + 写新 md

按以下顺序应用：

1. **结构容器优先**：先包 `::: intro` / `::: cover` / `::: section-title`
2. **内容容器**：转换 blockquote → quote-card、ol → steps、特殊段落 → tip/warning/highlight
3. **签名容器**：按 persona 的 signatureContainers 提议（abstract / keyNumber / seeAlso 等），**不强行加**——没自然位置就跳
4. **行内扩展**：每千字 ≤3 处 `==高亮==` 或 `[.着重.]`；**不**给整段全标
5. **写完之后**——直接进 Step 6 校验

需要某个容器的最小骨架时：

```bash
npm run cli -- containers snippet --name quote-card --variant column-rule
# 输出：::: quote-card variant=column-rule\n…\n:::
```

列出全部容器：`npm run cli -- containers list`。

### Step 6 · 校验（主题敏感）

```bash
# --persona 触发主题敏感检查（含 wrong_theme_namespace warning）
echo '{"md":"...","persona":"<id>"}' | npm run cli -- lint --json
# 或文件输入
npm run cli -- lint --input <output.md> --persona <id>

# 在 markdown frontmatter 写 `theme: <id>` 让 lint 自动取（frontmatter 优先于 --persona）
```

输出 `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }`。

issue 修复表见 [`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md#lint-issue-修复表)。**error 全部修完再交付**——warning 不阻塞导出，但要复述给用户。**不要把 error 残留的 md 交给 export-richtext**。

## 容器使用：✅ 与 ❌ 对照

### 嵌套同名 compare

✅ **正例**——外层升级 4 个冒号：

```markdown
:::: compare
::: pros
- 优点 A
:::
::: cons
- 缺点 A
:::
::::
```

❌ **反例**——同长度 fence 互相吃掉：

```markdown
::: compare
::: pros
- 优点 A
:::    ← 这个 ::: 实际关闭了外层 compare
:::
```

### 容器密度

✅ 3000 字文章 3-6 个内容容器（节奏点）
❌ 每段一个 `::: tip` 或 `::: highlight`（地板砖式铺满）

### intro 与 H1

✅ 一篇文章只有一个 H1；可在 H1 上方加 `::: intro` 引子
❌ 在 `::: intro` 之外再写第二个 H1

### footer-cta 位置

✅ 文末
❌ `::: abstract` 之前（位置语义错位）

### fence 名 / 行内扩展

✅ 从 `npm run cli -- containers list` 拿合法名
❌ 发明 vocabulary 之外的 fence 名（lint 会拒）

✅ `==关键词==`、`[.着重.]`
❌ 在 markdown 里写 `class=` / `style=` HTML（契约边界外）

## 选 variant 的两条规则

- **遵从 persona 默认**：不指定 `variant=` 时走主题 spec.variants 的默认骨架，**这是最稳的选择**
- **覆盖只在两种情况**：
  1. 单处想出位强调（如"这一处就要 pill-tag"）
  2. 主题默认不适合这一段（如 tech-explainer 的 `column-rule` quote 给"金句卡"看着太弱，单段升级 `magazine-dropcap`）

合法 variant id 从 `npm run cli -- personas capabilities --id <p>` 的 `recommendedVariants` / `defaultVariants` 取。**不要凭记忆写**——LLM 经常幻觉出 `glow` / `modern` / `flat`。

## CLI 子命令清单（本 skill 用到的）

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `personas recommend` | `{ title, summary, topic?, style? }` | `{ ranked[3], recommendNew, rationaleOneLine }` |
| `personas capabilities` | `{ id }` | `{ persona, defaultVariants, recommendedVariants, containers[], kickers }` |
| `annotate` | `{ md, persona }` | `{ patches[], capabilitySnapshot, vocabularySubset, blockCount }` |
| `lint` | `{ md, persona? }` | `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }` |
| `containers list` / `containers snippet` | — / `{ name, variant? }` | `ContainerSpec[]` / `string` |

全集见 `npm run cli -- describe`（自描述）。

## 模板

| 模板 | 用途 |
| --- | --- |
| `templates/article-skeleton.md` | intro / cover / author / section-title / body / footer-cta 全骨架 |
| `templates/snippets/` | 各容器的最小 example（由 build 脚本从 vocabulary.ts 派生） |

## 相关参考

共享 references（三个 skill 共用同一份权威源）：

- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · subcommand 签名 / 退出码 / lint issue 修复表 / JSON 输出形状（**CLI 真源**）
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（由 build:skill-refs 派生）
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单
- [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md) · Motif AST 完整字段

独家 references（本 skill 专属）：

- [references/annotation-recipes.md](references/annotation-recipes.md) · 10 个典型段落 → 推荐容器对照例子
- [references/inline-extensions.md](references/inline-extensions.md) · 行内扩展判定规则
- [references/persona-selection.md](references/persona-selection.md) · persona 选型决策树详细版
