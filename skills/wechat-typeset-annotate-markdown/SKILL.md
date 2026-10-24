---
name: wechat-typeset-annotate-markdown
description: 用户明确要求加排版块、标注容器或修复扩展语法时，对 Markdown 做保守标注，保留原文内容。零标注也是有效结果。仅要求公众号排版、选主题或渲染时直接用 wechat-typeset-export-richtext，普通 Markdown 无需先标注。本 skill 不渲染。
---

# wechat-typeset · Markdown 标注

对已完成内容编辑的 Markdown 按需添加少量语义明确的容器或行内扩展。普通 Markdown 本身就是合法输入，**不添加任何标注也是完整结果**。本 skill 不做渲染；渲染交给 `wechat-typeset-export-richtext`。

## 保守标注原则

- 只在原文已有明确语义、且特殊呈现有阅读收益时添加标注；没有把握就保留普通 Markdown。
- 保留原文字句、事实、数字及单位、限定词、链接、引用署名和内容顺序。新增摘要、提炼金句、补 CTA、改写比较项属于内容编辑，不能夹带在标注步骤中。
- 不按文章长度、标题数量或主题签名凑组件。所有组件和行内扩展都没有最低数量要求；已有标题、列表、引用、粗体足够时不重复装饰。
- `confidence` 是启发式信号强弱，不是必须应用的指令；高置信度也要结合上下文复核。
- 用户明确指定的标注可以按需应用，但不能为填充组件编造内容；语法修复只修错误，不顺带新增标注。

## 边界

本 skill 处理 **Markdown → 可选标注后的 Markdown**，不负责初稿写作、内容改写、视觉设计或渲染。完整的进入/退出信号见**路由总表**：[`../wechat-typeset/SKILL.md#routing-table`](../wechat-typeset/SKILL.md#routing-table)。

最常见的退出信号：

- 只要“渲染 / 导出 / 套主题”，无论是否含 `:::` → 转 `wechat-typeset-export-richtext`
- 明确要造主题色 / motif → 转 `wechat-typeset-author-persona`；推荐器的 `recommendNew=true` 本身不触发新主题创作

## CLI / MCP 入口

所有标注/校验走同一份 schema，三种宿主形态：

- **CLI（shell）**：`npm run cli -- <subcommand>`（`<subcommand>` 多词用空格，`--flag value` 或 `--json` 走 stdin）
- **MCP**：tool 名是 `<subcommand>` 空格转下划线（`markdown_annotate` 等），inputSchema 与 CLI 同源
- **接入起点（任一宿主）**：先调 `describe` 拉齐全部命令清单、错误码、`readOnly` 标记

```bash
# 通用形式
npm run cli -- <subcommand> [--flag value | --json]

# 从 stdin 读 JSON（推荐复杂参数走这个；MCP 端等价于 tool call payload）
echo '{"md":"# 标题"}' | npm run cli -- markdown lint --json

# 简单参数走 --flag（仅在 inputSchema 声明的字段上有效；--input <path> 读文件作 md）
npm run cli -- containers snippet --name tip
```

权威映射 / 错误返回结构 见 [`../_shared/references/mcp-cli-mapping.md`](../_shared/references/mcp-cli-mapping.md)；命令签名 / 退出码 / JSON 形状 见 [`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md)；`WtException` → 应转向哪个 skill 见 [`../_shared/references/error-routing.md`](../_shared/references/error-routing.md)。

> **工作目录约定**：中间产物落在已被 Git 忽略的 `tmp/`，建议使用本次任务子目录；交付后清理不再需要的过程文件。

## 主线工作流（6 步）

复制此 checklist 跟踪进度（**每步带成功判定**，不要"跑过即打勾"）：

```
Task Progress:
- [ ] 1. 确认是标注需求；沿用已选 persona，未选时推荐现有主题或使用 default
- [ ] 2. 查主题能力 → `personas capabilities` 输出 containers[] / defaultVariants
- [ ] 3. 结构扫描 → 找出确有特殊呈现收益的位置，其余保留原样
- [ ] 4. 段落分类 + 容器提议 → `annotate` 输出 patches.json，逐条决策
- [ ] 5. 保守筛选 + 应用 patches → 允许空集合；核对原文内容、顺序和强调含义未改变
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
| `recommendNew=true` | 仍从现有主题挑合适的或用 default；用户明确要求新主题时才转 author-persona |
| 用户明确说"不要花哨" | 沿用用户选定主题，否则用 default；优先直接渲染普通 Markdown |

### Step 2 · 查主题能力

```bash
npm run cli -- personas capabilities --id <persona-id>
```

输出含 `defaultVariants` / `recommendedVariants` / `containers[]` / `kickers`。

**Agent 决策规则**：

- ✅ 只对 `available: true` 的容器做提议
- ✅ `kpi-dashboard`/`bar-chart` 只在原文数据、口径与来源足够且用户需要图表时考虑；主题签名仅决定视觉支持，不为展示组件补数据
- ✅ 先按内容决定是否需要容器，再查主题能力；`signature: true` 仅说明视觉支持，不是添加组件的理由
- ❌ 不要凭记忆写 variant id；从 `recommendedVariants` 里挑

查本次候选能力例（先有语义需要，再查可用性）：

```bash
npm run cli -- personas capabilities --id swiss-grid \
  | jq '.containers | map(select(.available and .id == "tip"))'
```

### Step 3 · 结构扫描

先识别需保留的标题、叙事、引用、代码、表格和已有容器，再检查剩余内容是否有明确的呈现需求。配方见 [`references/annotation-recipes.md`](references/annotation-recipes.md)，配方是可选用法，不是待填清单。

| 原文情况 | 默认处理 |
| --- | --- |
| 普通开篇、故事场景、H1/H2、要点列表 | 保留，不按位置、长度或数量升级组件 |
| 已有明确总览 / 导读 | 可提议 intro；不能把叙事改写成摘要 |
| 明确的操作步骤列表 | 可提议 steps；枚举观点、经历或复杂嵌套列表保留 |
| 直接面向读者的提示 / 警告 | 可提议相应容器；正文提到“注意”“危险”不等于警告 |
| 引用、数字段落、现有粗体 | 默认保留；不自动变金句、数据卡或重复高亮 |
| 原文已有对比、CTA 或延伸阅读 | 仅在有阅读收益或用户指定时考虑；不新增内容来补齐版式 |
| 代码示例、已有容器及其内部内容 | 保留，不重复包裹 |

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

**策略**：脚本只输出候选。Agent 结合原文逐条判断“应用 / 跳过”，不把 confidence 当审批结果，也不为使用主题签名而添加候选。没有适合的候选时直接保留原文。

### Step 5 · 筛选 + 应用 patches

**核心**：你只筛选，文本替换交给 `annotate apply`。patches 必须对应同一份未改动原文；原文变动后重新生成建议，避免行号失效。

1. **筛**：从 `tmp/patches.json` 挑保留集，落到 `tmp/patches.filtered.json`
   - ✅ 仅保留：语义与上下文相符、有明确阅读收益、不会改变原意或重复强调的候选
   - ❌ 跳过：语义不确定、只因主题签名 / 数量 / 位置提出、与已有强调重复或范围冲突的候选；high 也不例外
   - 全部跳过是正常结果：保留原文，直接进入校验与渲染；不补“至少一个”组件
2. **应用**：

   ```bash
   jq -n --slurpfile p tmp/patches.filtered.json --rawfile m input.md \
     '{md:$m, patches:$p[0]}' | npm run cli -- annotate apply --json > tmp/apply.json
   jq -r .md tmp/apply.json > tmp/annotated.md
   ```

   核对 `applied + skipped.length == patches.length`，并检查 diff：字句、数字单位、限定词、链接、署名与顺序不变；标题与引用标记变化仍需保留原有语义。`skipped[].reason` 含义见 [cli-contract.md · annotate apply 输出](../_shared/references/cli-contract.md#annotate-apply-输出)。空集合无需调用 apply，直接沿用原文。

3. **确有需要才手工标注**：
   - CLI 不支持的结构（如 compare）仅在能保留原文结构与内容时处理，否则保留普通 Markdown；不重写内容来适配组件
   - 行内扩展默认不加，已有强调足够时不叠加；确需强调时只标语义完整的必要范围，不按字数配额添加。详见 [`references/inline-extensions.md`](references/inline-extensions.md)
   - 取容器骨架：`containers snippet --name <X> [--persona <id>]`（传 `--persona` 自动绑定该主题 default variant）

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

✅ 可以整篇零容器；只在确有收益的位置添加，数量取决于内容
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

- **默认不写 `variant=`**：走主题 spec.variants 的默认骨架
- **仅在以下两种情况覆盖**：
  1. 单处想出位强调（如"这一处就要 pill-tag"）
  2. 主题默认不适合这一段（如 tech-explainer 的 `column-rule` quote 给"金句卡"太弱，单段升级 `magazine-dropcap`）

合法 variant id 从 `npm run cli -- personas capabilities --id <p>` 的 `recommendedVariants` / `defaultVariants` 取。**不要凭记忆写**——LLM 经常幻觉出 `glow` / `modern` / `flat`。

## CLI 子命令清单（本 skill 用到的）

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `personas recommend` | `{ title, summary, topic?, style? }` | `{ ranked[3], recommendNew, rationaleOneLine }` |
| `personas capabilities` | `{ id }` | `{ persona, defaultVariants, recommendedVariants, containers[], kickers }` |
| `annotate` | `{ md, persona }` | `{ patches[], capabilitySnapshot, vocabularySubset, blockCount }` |
| `annotate apply` | `{ md, patches[] }` | `{ md, applied, skipped[] }`（**Step 5 核心：纯函数应用 patches 到 md**） |
| `lint` | `{ md, persona? }` | `{ ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }` |
| `containers list` / `containers snippet` | — / `{ name, variant?, persona? }` | `ContainerSpec[]` / `string`（传 `persona` 自动绑定该主题 default variant） |

全集见 `npm run cli -- describe`（自描述）。

## 模板

| 模板 | 用途 |
| --- | --- |
| `templates/article-skeleton.md` | 普通 Markdown 起稿模板与可选标注指引；无必含组件 |
| `containers snippet --name <X>` | 按需获取容器的最小 example，无需维护本地片段副本 |

## 相关参考

共享 references（4 个 skill 共用同一份权威源）：

- [../_shared/references/mcp-cli-mapping.md](../_shared/references/mcp-cli-mapping.md) · CLI ↔ MCP ↔ Node 库 三种宿主形态映射、`describe` 接入起点
- [../_shared/references/error-routing.md](../_shared/references/error-routing.md) · `WtException` → 该转向哪个 skill
- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · subcommand 签名 / 退出码 / lint issue 修复表 / JSON 输出形状（**CLI 真源**）
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（由 build:skill-refs 派生）
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单
- [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md) · Motif AST 完整字段

独家 references（本 skill 专属）：

- [references/annotation-recipes.md](references/annotation-recipes.md) · 10 个典型段落 → 推荐容器对照例子
- [references/inline-extensions.md](references/inline-extensions.md) · 行内扩展判定规则
- [references/persona-selection.md](references/persona-selection.md) · persona 选型决策树详细版
