---
name: wechat-typeset-annotate-markdown
description: 将原始 Markdown 改写成满足 wechat-typeset 写作契约的 Markdown——按段落语义插入 ::: 容器（tip / quote-card / steps / abstract / key-number / section-title / footer-cta 等 25 种）、5 种行内扩展（==高亮== / [.着重.] / [~波浪~] / ~~删除~~ / ++插入++）、并按需推荐合适的 persona。当用户说"帮我把这篇文章改成微信公众号格式""加上排版块""标注成 tip""按 wechat-typeset 契约改写""挑一套主题""规范化 markdown""为这段文章选个 persona"时使用。产出的契约 md 一定通过 lint-contract.ts 校验（fence 名白名单 / 嵌套深度 / variant 合法 / 行内扩展闭合）。
---

# wechat-typeset · Markdown 标注

把"普通 markdown 文章"翻译成"满足契约的 markdown"——按段落语义插入 `:::` 容器、行内扩展、并推荐合适的 persona。**本 skill 不做渲染**——产出仍是 markdown，交给 `wechat-typeset-export-richtext` 渲染。

## 何时使用

进入本 skill 的信号：

- 用户给一段 / 一篇 markdown，**没**用 `:::` 容器，希望"加排版块"或"按公众号格式"改写
- 用户问"这段写成 tip 还是 highlight"、"这种内容用哪个容器"
- 用户说"挑一套合适的 persona"——先用 `recommend-persona.ts`，复用内置主题不够再转 `wechat-typeset-author-persona`
- 用户已经写完文章，要在公众号发，但还在普通 markdown 状态

不要用本 skill：

- 用户给的 markdown 已经满了 `:::` 容器，要"渲染" / "导出" → 转 `wechat-typeset-export-richtext`
- 用户问主题色 / motif / 自定义视觉 → 转 `wechat-typeset-author-persona`
- 文章主体是数学公式 / 流程图 / 不可识别的非 markdown 内容 → 本 skill 不处理；让用户先转标准 markdown

## 主线工作流（5 步）

复制此 checklist 跟踪进度：

```
Task Progress:
- [ ] 1. 意图判定 + persona 推荐（recommend-persona.ts）
- [ ] 2. 结构扫描（H1 / H2 / 列表 / 引用块 / 代码块）
- [ ] 3. 段落分类 + 容器提议（annotate-md.ts → patches.json）
- [ ] 4. 应用提议（agent 写 markdown，用 show-snippet.ts 拿模板）
- [ ] 5. 校验（lint-contract.ts 至 ok=true）
```

### Step 1 · 意图判定 + persona 推荐

```bash
tsx skills/wechat-typeset-annotate-markdown/scripts/recommend-persona.ts \
  --title "<文章标题>" \
  --summary "<一句摘要>" \
  --topic "<题材：技术/财经/人文/生活/学术>" \
  [--style "<参照锚点：FT中文/Stripe Docs/...>"]
```

输出 top-3 persona id + 选/不选的理由。

- **强匹配某个**（90%+）→ 用它；记下 id 进 Step 2
- **三选都不强**（< 70%）→ 退出本 skill，先去 `wechat-typeset-author-persona` 造新主题，造完回来继续 Step 2
- **不打算用容器签名功能**（用户明确说"不要花哨"）→ 用 `default`，跳过 abstract/key-number/cover 等签名容器的提议

### Step 2 · 结构扫描

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

### Step 3 · 段落分类 + 容器提议（v1：标注提议而非端到端改写）

```bash
tsx skills/wechat-typeset-annotate-markdown/scripts/annotate-md.ts \
  --input <input.md> \
  --persona <id> \
  --out tmp/patches.json
```

输出 `patches.json`，结构：

```json
{
  "persona": "tech-explainer",
  "patches": [
    {
      "line": 3,
      "kind": "wrap_with_container",
      "container": "intro",
      "reason": "首段 2-3 行总览，符合 intro 用途",
      "confidence": "high"
    },
    {
      "line": 18,
      "kind": "convert_blockquote",
      "container": "quote-card",
      "variant": "column-rule",
      "reason": "短引用 + 完整句末标点，金句卡",
      "confidence": "medium"
    },
    {
      "line": 42,
      "kind": "convert_list",
      "container": "steps",
      "reason": "有序列表 5 条 + 动词开头",
      "confidence": "high"
    }
  ]
}
```

**v1 的策略**：脚本不直接改 md，只输出建议。Agent（你）拿着 `patches.json` + 原文，逐条决策"应用 / 跳过 / 改改 confidence"，最后写出新的 md。

为什么 v1 不端到端：契约 md 改写比 spec 生成误差成本更高（一个 fence 写错可能让整段隐藏），让 agent 留在决策链路里。

### Step 4 · 应用提议 + 写新 md

agent 拿着 `patches.json` 和原文，按以下顺序应用：

1. **结构容器优先**：先包 `::: intro` / `::: cover` / `::: section-title`
2. **内容容器**：转换 blockquote → quote-card、ol → steps、特殊段落 → tip/warning/highlight
3. **签名容器**：按 persona 的 signatureContainers 提议（abstract / keyNumber / seeAlso 等），**不强行加** —— 没自然位置就跳
4. **行内扩展**：每千字 ≤3 处 `==高亮==` 或 `[.着重.]`；**不**给整段全标
5. **写完之后**——直接进 Step 5 校验

需要某个容器的最小骨架时，用 `show-snippet.ts`：

```bash
tsx skills/wechat-typeset-annotate-markdown/scripts/show-snippet.ts quote-card --variant column-rule
# 输出：
# ::: quote-card variant=column-rule
# 一段值得突出的引用 …
# :::
```

### Step 5 · 校验

```bash
tsx skills/wechat-typeset-annotate-markdown/scripts/lint-contract.ts <output.md>
```

输出 `ok=true` 或 `issues[]`。**典型 issue**：

| issue.kind | 原因 | 修法 |
| --- | --- | --- |
| `unknown_container` | fence 名拼错或发明了新名字 | 改成 [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) 内的合法名 |
| `unexpected_jsx_attrs` | 写了 `{variant="xxx"}` | 改成 `variant=xxx`（不带大括号引号） |
| `html_comment_variant` | 写了 `<!-- variant=xxx -->` | 删注释，写到 `::: name` open 行 |
| `fence_not_closed` | 缺 `:::` | 补 close fence |
| `nesting_depth` | compare 内层 pros 用了同长度 fence | 外层升级为 `::::`（4 个冒号） |
| `inline_unclosed` | `[.着重` 没闭合 | 补 `.]` |

issues 全部修完再交付——**不要把 lint 失败的 md 交给 export-richtext**。

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

合法 variant id 由 `getVariantsForContainer(name)` 返回。**不要凭记忆写**——LLM 经常幻觉出 `glow` / `modern` / `flat`。

## 不要做的事

- **不要把全文都包进容器**——内容容器应该是节奏点，不是地板砖。一篇 3000 字的文章包 3-6 个容器是健康量
- **不要在 `intro` 之外再写 H1**——一篇文章只有一个 H1
- **不要把 `footer-cta` 放在 `abstract` 之前**——位置语义错位
- **不要在 `:::: compare` 内部嵌 `::: compare`**——markdown-it-container 同名 + 同长度 fence 互相关闭，外层必须 4 个冒号
- **不要发明 vocabulary 之外的 fence 名**——lint 会拒
- **不要写 `class=` / `style=` 这种 HTML**——契约边界外的样式，挪进 `::: free` 或转 InkFlow 主仓审

## 脚本清单

| 脚本 | 用途 |
| --- | --- |
| `scripts/recommend-persona.ts` | 输入标题 + 摘要 + 题材 → 输出 top-3 persona 推荐 + 理由 |
| `scripts/annotate-md.ts` | 输入原文 + persona → 输出 patches.json（标注提议表，不直接改原文） |
| `scripts/lint-contract.ts` | 输入 md → 输出 issues[]（fence 名 / 嵌套 / variant / 行内闭合） |
| `scripts/show-snippet.ts` | 按容器 name + variant 输出最小可用 markdown snippet |

## 模板

| 模板 | 用途 |
| --- | --- |
| `templates/article-skeleton.md` | intro / cover / author / section-title / body / footer-cta 全骨架 |
| `templates/snippets/` | 各容器的最小 example（由 build 脚本从 vocabulary.ts 派生） |

## 相关参考

共享 references（三个 skill 共用同一份权威源，通过相对路径软链）：

- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单（用于排查 lint 失败原因）
- [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md) · Motif AST 完整字段（少数情况 annotator 会接触）

独家 references（本 skill 专属）：

- [references/annotation-recipes.md](references/annotation-recipes.md) · 10 个典型段落 → 推荐容器的对照例子
- [references/inline-extensions.md](references/inline-extensions.md) · 行内扩展的判定规则
- [references/persona-selection.md](references/persona-selection.md) · persona 选型决策树详细版
