---
name: wechat-typeset-annotate-markdown
description: 将原始 Markdown 改写成满足 wechat-typeset 写作契约的 Markdown——按段落语义插入 ::: 容器（tip / quote-card / steps / abstract / key-number / section-title / footer-cta 等 25 种）、5 种行内扩展（==高亮== / [.着重.] / [~波浪~] / ~~删除~~ / ++插入++）、并按需推荐合适的 persona。当用户说"帮我把这篇文章改成微信公众号格式""加上排版块""标注成 tip""按 wechat-typeset 契约改写""挑一套主题""规范化 markdown""为这段文章选个 persona"时使用。产出的契约 md 一定通过 `wechat-typeset lint` 校验（fence 名白名单 / 嵌套深度 / variant 合法 / 行内扩展闭合）。
---

# wechat-typeset · Markdown 标注

把"普通 markdown 文章"翻译成"满足契约的 markdown"——按段落语义插入 `:::` 容器、行内扩展、并推荐合适的 persona。**本 skill 不做渲染**——产出仍是 markdown，交给 `wechat-typeset-export-richtext` 渲染。

## 何时使用

进入本 skill 的信号：

- 用户给一段 / 一篇 markdown，**没**用 `:::` 容器，希望"加排版块"或"按公众号格式"改写
- 用户问"这段写成 tip 还是 highlight"、"这种内容用哪个容器"
- 用户说"挑一套合适的 persona"——先用 `wechat-typeset personas recommend`，复用内置主题不够再转 `wechat-typeset-author-persona`
- 用户已经写完文章，要在公众号发，但还在普通 markdown 状态

不要用本 skill：

- 用户给的 markdown 已经满了 `:::` 容器，要"渲染" / "导出" → 转 `wechat-typeset-export-richtext`
- 用户问主题色 / motif / 自定义视觉 → 转 `wechat-typeset-author-persona`
- 文章主体是数学公式 / 流程图 / 不可识别的非 markdown 内容 → 本 skill 不处理；让用户先转标准 markdown

## CLI 入口

所有标注/校验都走 `@wechat-typeset/cli` 子命令派发。同一可执行体既能 shell 也能从 MCP 工具调（schema 单一真源）。

```bash
# 一般形式
npm run cli -- <subcommand> [--flag value | --json]

# 从 stdin 读 JSON（推荐复杂参数走这个；schema 与 wechat-typeset describe 输出 100% 一致）
echo '{"md":"# 标题"}' | npm run cli -- lint --json

# 简单参数走 --flag（仅在 inputSchema 声明的字段上有效；--input <path> 读文件作 md）
npm run cli -- containers snippet --name tip
```

退出码：`0` ok / `1` 输入解析错 / `2` 业务 ok=false（lint 错、validate 错） / `3-5` WtException(SPEC_INVALID / CONTRACT_VIOLATION / PLATFORM_UNSUPPORTED)。

详见 [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md)（subcommand 表 / inputSchema / 退出码单一真源）。

## 主线工作流（6 步）

复制此 checklist 跟踪进度：

```
Task Progress:
- [ ] 1. 意图判定 + persona 推荐（personas recommend）
- [ ] 2. 查主题能力（personas capabilities）—— "开工前先查，避免给 default 写 kpi-dashboard"
- [ ] 3. 结构扫描（H1 / H2 / 列表 / 引用块 / 代码块）
- [ ] 4. 段落分类 + 容器提议（annotate → patches.json）
- [ ] 5. 应用提议（agent 写 markdown，用 containers snippet 拿模板）
- [ ] 6. 校验（lint --persona 至 ok=true）
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

输出 `{ ranked[3], recommendNew, rationaleOneLine }`：

- **`recommendNew=false` 且 `ranked[0].staticScore ≥ 0.85`**（强匹配）→ 用 `ranked[0].id`，进 Step 2
- **`recommendNew=false` 但 score 一般** → 三者任一可用，按用户审美挑
- **`recommendNew=true`** → 退出本 skill，先去 `wechat-typeset-author-persona` 造新主题
- **不打算用容器签名功能**（用户明确说"不要花哨"）→ 用 `default`，跳过 abstract/key-number/cover 等签名容器的提议

### Step 2 · 查主题能力（关键：避免用错容器）

```bash
npm run cli -- personas capabilities --id <persona-id>
```

输出 JSON 含：

- **`defaultVariants`** —— 每个 slot 的当前默认骨架（写 markdown 不指定 variant 默认走这些）
- **`recommendedVariants`** —— 每个 kind 对本主题"友好"的 variant id 列表（覆盖时挑这里的）
- **`containers[]`** —— 每个容器在本主题下的 `available` / `signature` / `excluded` / `namespace` 状态
- **`kickers`** —— renderer 内默认 kicker 文案（写 ::: qa-block 不指定 info 时这是兜底）

**Agent 决策规则**：

- 只对 `available: true` 的容器做提议（避免给 `default` 主题写 `kpi-dashboard`——它属于 `theme:data-brief`，跨主题渲染会失去签名视觉）
- 优先用 `signature: true` 的容器承担"主题 voice"（如 brutalist 的 masthead / colophon、tech-explainer 的 note / see-also）
- 不要凭记忆写 variant id；从 `recommendedVariants` 里挑

筛签名容器例：

```bash
npm run cli -- personas capabilities --id swiss-grid | jq '.containers | map(select(.available and .signature)) | map(.id)'
# → ["abstract", "section-tag", "editorial-header", "byline", ...]
```

### Step 3 · 结构扫描

按以下顺序扫一遍原文：

| 找什么 | 怎么找 | 推荐容器 |
| --- | --- | --- |
| H1 | `^# ` | 题图 + `::: intro` 引子（H1 本身保留） |
| H2 章节标志 | `^## ` 且全文≥3 个 | 决定是否升级为 `::: section-title`（看 [annotation-recipes.md](references/annotation-recipes.md)） |
| 列表（步骤型） | `^\d+\. ` 连续 ≥3 条 + 动词开头 | `::: steps` |
| 列表（要点型） | `^- ` 连续 ≥3 条 + 名词短语 | 保持原列表，可加 `==高亮==` 强调关键词 |
| 引用块（金句） | `^> ` + 短句 + 句末标点完整 | `::: quote-card` |
| 引用块（脚注/出处） | `^> ` + 句首 `[1] / 注：` | `::: note` 或 `::: footnotes`（data-brief） |
| 行内代码 ≥3 处的段落 | `` ` `` 多 | 段落上方提议 `::: tip` 或 `::: warning` 视语义 |
| 摘要段（文首 2-4 行总览） | 段首"本文..."、"TL;DR"、"简言之" | `::: abstract` |
| 数据段（"X% / Y倍 / Z亿"） | 数字密度高的句子 | 周围段落提议 `::: key-number value=X 标签` |

### Step 4 · 段落分类 + 容器提议（启发式 patch 表）

```bash
echo '{"md":"...原文...","persona":"<id>"}' | npm run cli -- annotate --json > tmp/patches.json
# 或文件输入
npm run cli -- annotate --input <input.md> --persona <id>
```

输出 JSON 顶层结构（**完整 schema 见 [_shared/cli-contract.md · annotate 输出](../_shared/references/cli-contract.md#annotate-输出)**）：

| 字段 | 用途 |
| --- | --- |
| `patches[]` | 段落 → 容器提议；每条含 `line` / `endLine` / `kind` / `container` / `variant?` / `reason` / `confidence` / `preview` |
| `capabilitySnapshot` | 与 Step 2 `personas capabilities` 同源；含 `personaId` / `defaultVariants` / `recommendedVariants` / `containers[]` |
| `vocabularySubset` | 全容器 example/attrs 速查（仅查参考，**不是 available 真源**） |
| `blockCount` | 块切分数 |

> **Agent 用 `capabilitySnapshot.containers` 作为"本主题下可用容器"的权威单一真源**，而非 `vocabularySubset`。后者只用来查 example / attrs。

合法 `kind` 枚举：`wrap_paragraph` / `wrap_blockquote` / `convert_list` / `wrap_first_paragraph` / `wrap_section_title` / `wrap_pros_cons`。

**策略**：脚本不直接改 md，只输出建议。Agent（你）拿着 `patches.json` + 原文，逐条决策"应用 / 跳过 / 改改 confidence"，最后写出新的 md。

### Step 5 · 应用提议 + 写新 md

agent 拿着 patches 和原文，按以下顺序应用：

1. **结构容器优先**：先包 `::: intro` / `::: cover` / `::: section-title`
2. **内容容器**：转换 blockquote → quote-card、ol → steps、特殊段落 → tip/warning/highlight
3. **签名容器**：按 persona 的 signatureContainers 提议（abstract / keyNumber / seeAlso 等），**不强行加** —— 没自然位置就跳
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

输出 `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }`。**典型 issue**：

| issue.kind | 原因 | 修法 |
| --- | --- | --- |
| `unknown_container` | fence 名拼错或发明了新名字 | 改成 [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) 内的合法名 |
| `unexpected_jsx_attrs` | 写了 `{variant="xxx"}` | 改成 `variant=xxx`（不带大括号引号） |
| `html_comment_variant` | 写了 `<!-- variant=xxx -->` | 删注释，写到 `::: name` open 行 |
| `fence_not_closed` | 缺 `:::` | 补 close fence |
| `nesting_depth` | compare 内层 pros 用了同长度 fence | 外层升级为 `::::`（4 个冒号） |
| `inline_unclosed` | `[.着重` 没闭合 | 补 `.]` |
| `wrong_theme_namespace` (warning) | 用了 theme:* 容器但当前主题不是其专属 | 换 base/pack:editorial 替代容器，或切换主题（仅警告，不阻塞） |
| `frontmatter_invalid` (warning) | frontmatter 内 variant id / theme id 非法 | 改成合法 id 或删除字段（pipeline 会回退） |

error 全部修完再交付——warning 不阻塞导出，但 LLM 应该解读后告知用户。**不要把 error 残留的 md 交给 export-richtext**。

## 8 类典型段落识别（核心规则）

完整对照见 [references/annotation-recipes.md](references/annotation-recipes.md)。速查：

| 段落特征 | 容器 | 信号 |
| --- | --- | --- |
| 文首 2-4 行总览 / TL;DR | `intro` 或 `abstract` | "本文将"、"简言之"、"先说结论" |
| 整段是金句 / 引语 | `quote-card` | 句末完整 + 长度 ≤2 行 + 有"——作者"署名感 |
| 整段是警告 / 错误示范 | `danger` 或 `warning` | "切忌"、"千万不要"、"❌"、命令前缀 `sudo rm -rf` |
| 整段是补充 / 注意 | `tip` 或 `info` | "顺便"、"补充一句"、"注意" |
| 数字 + 短标签 | `key-number` | "87% 用户"、"3 倍"、"500 万 DAU" |
| 双列对比 | `compare` + `pros`/`cons` | "优点 / 缺点"、"前 / 后"、"A 派 / B 派" |
| 有序步骤动作 | `steps` | "第一步"、"打开"、"切换到"动作密集 |
| 文末引导 | `footer-cta` | "关注我"、"点赞"、"转发"、二维码邻近 |

## 选 variant 的两条规则

- **遵从 persona 默认**：不指定 `variant=` 时走主题 spec.variants 的默认骨架，**这是最稳的选择**
- **覆盖只在两种情况**：（1）单处想出位强调（如"这一处就要 pill-tag"）（2）主题默认不适合这一段（如 tech-explainer 的 `column-rule` quote 给"金句卡"看着太弱，单段升级 `magazine-dropcap`）

合法 variant id 从 `personas capabilities --id <p>` 的 `recommendedVariants` / `defaultVariants` 取。**不要凭记忆写**——LLM 经常幻觉出 `glow` / `modern` / `flat`。

## 不要做的事

- **不要把全文都包进容器**——内容容器应该是节奏点，不是地板砖。一篇 3000 字的文章包 3-6 个容器是健康量
- **不要在 `intro` 之外再写 H1**——一篇文章只有一个 H1
- **不要把 `footer-cta` 放在 `abstract` 之前**——位置语义错位
- **不要在 `:::: compare` 内部嵌 `::: compare`**——markdown-it-container 同名 + 同长度 fence 互相关闭，外层必须 4 个冒号
- **不要发明 vocabulary 之外的 fence 名**——lint 会拒
- **不要写 `class=` / `style=` 这种 HTML**——契约边界外的样式，挪进 `::: free` 或转 InkFlow 主仓审

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
