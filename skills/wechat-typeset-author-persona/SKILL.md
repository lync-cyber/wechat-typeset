---
name: wechat-typeset-author-persona
description: 设计并创建 wechat-typeset 的主题视觉——色板、字号、间距、SVG motif、容器变体一次性产出可通过 validate 校验的 PersonaSpec JSON。触发词："设计一套深色技术风主题" / "做个暖色生活主题" / "为我的公众号做一套排版样式" / "换个配色" / "加个新的标题前缀图标" / "在 default 基础上改" / "为这个话题挑一套或造一套主题"。**只产 PersonaSpec，不渲染、不改 markdown**。硬约束清单见正文。
---

# wechat-typeset · 主题/Persona 创作

把"我想要一套什么气质的公众号视觉"翻译成机器可投影的 `PersonaSpec` JSON。LLM 生成 → `validate` 校验 → `specToTheme` 投影 → `render` 渲染。**真相来源永远是 spec**，不是手写 Theme 对象、不是 SVG 字符串。

## 边界

本 skill 处理 **视觉气质 → `PersonaSpec` JSON** 的设计，不改 markdown、不做渲染。完整的进入/退出信号见**路由总表**：[`../wechat-typeset/SKILL.md#routing-table`](../wechat-typeset/SKILL.md#routing-table)。

最常见的退出信号：

- ❌ 给一段 markdown 要"标注" / "加排版块" → 转 `wechat-typeset-annotate-markdown`
- ❌ 要"渲染" / "导出 HTML" / "复制到公众号" → 转 `wechat-typeset-export-richtext`
- ❌ 改通用 CSS / 加非主题 fence 容器 → 改 `src/core/vocabulary/vocabulary.ts`（不在 skill 边界内）

> 进入本 skill 前**先跑** `npm run cli -- personas recommend`——能复用内置主题就直接用，**不能复用再造新的**。

## CLI / MCP 入口

校验 / 选型走同一份 schema，三种宿主：CLI / MCP / Node 库。skill 独家工具（prompt 构造、HTML 预览、文件落地）保留为本 skill 的 `scripts/*.ts`。

- **CLI**：`npm run cli -- <subcommand> [--flag value | --json]`
- **MCP**：tool 名是 `<subcommand>` 空格转下划线（如 `validate_spec`、`personas_derive`）
- **接入起点**：先调 `describe` 拉齐全部命令、错误码、`readOnly` 标记

权威映射 / 错误返回 见 [`../_shared/references/mcp-cli-mapping.md`](../_shared/references/mcp-cli-mapping.md)；命令签名 / 退出码 / JSON 形状 见 [`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md)；`SPEC_INVALID` 等 WtException → skill 转向 见 [`../_shared/references/error-routing.md`](../_shared/references/error-routing.md)。

> **工作目录约定**：所有中间产物落在 `tmp/`（已在 `.gitignore`）。如不存在请先 `mkdir -p tmp`。

## 主线工作流（5 步）

复制此 checklist 跟踪进度（**每步带成功判定**）：

```
Task Progress:
- [ ] 1. 收集视觉定位（受众 / 题材 / 参照风格 / 强弱）→ 4 项信号齐全
- [ ] 2. 决策：复用 / 派生 / 全新（personas recommend）→ 输出 ranked + recommendNew
- [ ] 3. 生成 spec JSON（new-persona-from-prompt.ts 输出 schema + prompt）→ tmp/spec.json 落地
- [ ] 4. 校验循环（validate --spec）→ ok=true（errors[] 为空）
- [ ] 5. 预览 + 落地（preview-motifs.ts → 用户拍板 → persist-persona.ts）→ src/core/themes/<id>/ 文件存在
```

### Step 1 · 收集视觉定位

用 `AskUserQuestion` 工具**一次性**收齐 2-4 题（避免追问中断节奏）：

| 题目 | 选项示例 |
| --- | --- |
| 受众 | 技术布道 / 财经内参 / 散文 / 教程文档 / 生活随笔 / 人物特稿 / 学术 / 周刊 newsletter |
| 题材频次 | 单篇 / 长期栏目（栏目要更克制，避免视觉疲劳） |
| 参照锚点 | Stratechery / FT 中文 / Stripe Docs / 财新 / New Yorker（用户能说"像 X"是最强信号） |
| 明确禁忌 | 是否禁用某些颜色（品牌冲突）/ 是否要无衬线 / 是否反对装饰图标 |

### Step 2 · 决策：复用 / 派生 / 全新

```bash
echo '{
  "title":"<占位标题，可写视觉描述>",
  "summary":"<视觉气质一句话>",
  "style":"<参照锚点>"
}' | npm run cli -- personas recommend --json
```

按下表决策：

| 输出特征 | 决策 |
| --- | --- |
| `recommendNew=false` 且 `ranked[0].staticScore ≥ 0.85` | 直接 `wechat-typeset-export-richtext` 用 `ranked[0].id`，本 skill 退出 |
| 受众对、palette 不对（改色板/换骨架就够） | 走 [派生现有主题](#派生现有主题) |
| `recommendNew=true` | 走 [全新造主题](#全新造主题) |

### Step 3 · 生成 spec JSON

**全新造主题**：

```bash
mkdir -p tmp
tsx skills/wechat-typeset-author-persona/scripts/new-persona-from-prompt.ts \
  --description "<用户描述>" \
  --out tmp/new-spec-prompt.json
```

脚本输出**给 LLM 的结构化输出 prompt**（含 JSON Schema 摘要 + 硬约束清单 + 类似主题的 spec 片段）。LLM 消费 prompt，把生成的 spec 写到 `tmp/spec.json`。

**派生现有主题**：从 `templates/derive-from-base.md` 拷骨架（含 spread + 改改样例），改完保存到 `tmp/spec.json`。

### Step 4 · 校验循环（feedback loop）

```bash
# --spec 简写（CLI 自动读文件 + 包到 input.spec）
npm run cli -- validate --spec tmp/spec.json --json

# 或显式喂 JSON
cat tmp/spec.json | jq -c '{spec:.}' | npm run cli -- validate --json
```

输出 `{ ok, errors[], warnings[] }`；每条 error 含 `path` / `message` / `severity` / `hint?`（hint 是匹配硬约束规则后的修复提示）。三种结果：

| 输出 | 动作 |
| --- | --- |
| `ok=true` | 进 Step 5 |
| `ok=false`，errors[] 有内容 | 把整份 errors（含 hint）喂回 LLM 让它 self-correct 同一份 spec，重跑校验 |
| 重试 3 轮仍失败 | 去 [常见失败模式](#常见失败模式) 手工诊断 |

### Step 5 · 预览 + 落地

```bash
tsx skills/wechat-typeset-author-persona/scripts/preview-motifs.ts \
  tmp/spec.json \
  --out tmp/preview.html
```

浏览器打开 `tmp/preview.html` 给用户看 SVG motif gallery（色板色块 + h2Prefix + 全部 divider + stepBadge 占位符示例 + 5 态 admonition icon）。**用户拍板后才进 persist——不要跳预览**。

用户确认后：

```bash
tsx skills/wechat-typeset-author-persona/scripts/persist-persona.ts \
  tmp/spec.json --id <kebab-id>
```

落到 `src/core/themes/<id>/persona.data.ts` + 改 `src/core/themes/registry.ts` 的 import 列表。

## 派生现有主题

最常见场景：客户说"在 tech-explainer 上把主色换成品牌红、code 块更花"。

```ts
const base = getPersona('tech-explainer')
const tweaked: PersonaSpec = {
  ...base,
  id: 'tech-explainer-red',
  name: '文档白昼·红',
  description: '在 tech-explainer 基础上替换主色与 code 块骨架',
  palette: { ...base.palette, primary: '#c8102e', accent: '#c8102e' },
  variants: { ...base.variants, codeBlock: 'header-bar' },
  meta: { ...(base.meta ?? {}), createdAt: '2026-05-13', basedOn: 'tech-explainer' },
}
```

**注意点**：

- ✅ 必须改 `id` / `name`（不能直接 spread——重复用同 id 会冲突）
- ⚠️ `palette.accent = palette.primary` 是 `default` 的设计选择；其他主题里 accent 可与 primary 不同，按主题原 spec 判断
- ✅ 派生 spec 也必须过 `npm run cli -- validate`——patch 系统的 `__reset: true` 能意外清掉硬约束

## 全新造主题

参考 `templates/persona.starter.json`（最小可校验 spec）和 `templates/persona.cookbook.md`（4 套常见话题的 spec 框架）。

**最容易出错的两块**：

### palette 的 4 态 status

`status` 是 `{ tip, info, warning, danger }` 四态，每态 `{ accent, soft }` 成对。`soft` 是底色（10% 不透明的 accent 近似），`accent` 是边线/图标色。**最容易遗漏 `info`**。

### motif 字号 / 描边

LLM 经常凭设计稿习惯写 `fontSize: 12` 或 `strokeWidth: 0.5`——硬约束最低分别是 **14** 和 **1**。SVG 在公众号会被光栅化，亚像素描边直接消失，< 14 字号在 375px 屏上糊成一坨。

完整硬约束清单见 [`../_shared/references/hard-rules.md`](../_shared/references/hard-rules.md)；motif AST 完整字段见 [`../_shared/references/motif-ast.md`](../_shared/references/motif-ast.md)。

## 常见失败模式

cli `validate` 输出的 errors[] 每条带 `hint`；下表是 cli hint 表的速查（完整版见 [cli-contract.md · validate hint 表](../_shared/references/cli-contract.md#validate-错误模式表hint)）：

| 错误 path 模式 | 推断 | 修复 |
| --- | --- | --- |
| `palette.<key>` | hex 非法 / 11 键缺一 | 用 `#[0-9a-f]{3,8}` 形式，补齐 11 键 |
| `status` | 四态缺一 / `{accent,soft}` 不成对 | 必填四态 + 每态两键 |
| `motifs.*.primitives[N].fontSize` | < 14 | 放大到 ≥14 |
| `motifs.*.primitives[N].strokeWidth` | < 1 | 放粗到 ≥1 |
| `motifs.*.primitives[N].fontFamily` | 非白名单 | 只能是 `serif` / `sans-serif` / `monospace` |
| `motifs.*.placeholders` | 未声明占位符 | 把 primitives 里出现的所有 `{name}` 加进 `placeholders` |
| `signatureContainers[N]` | id 不在白名单 | 用 `getSupportedSignatureContainers()` 查；不要写 kebab，是 camelCase |
| `variants.<kind>` | id 不在白名单 | `getVariantIds().<kind>`；典型幻觉 `'glow'` / `'modern'` 不存在 |

self-correct 时把整份 `errors[]`（含 `path` + `hint`）一起喂回 LLM，不要逐条手喂。

## PersonaSpec 创作：✅ 与 ❌ 对照

### 投影来源

✅ 走 `PersonaSpec` → `specToTheme` → `render`
❌ 手写 `Theme` 对象（绕过 `commonTemplates` 合并和 asset 规范化）

### motif 表达

✅ motif 用 AST primitives（`{ kind: 'text', text: '...', fontSize: 16 }`）
❌ 在 spec 里塞原始 SVG 字符串（校验器看不穿）

### 校验纪律

✅ 即便在内置 persona 上做微调，也跑一遍 `npm run cli -- validate`
❌ "我只改了一个色值，应该没问题" → patch 系统的 `__reset: true` 能意外清掉硬约束

### 主题边界

✅ 主题的边界是 token / motif / variant 选择 + signatureContainers 声明
❌ 在 spec 里新增 fence 容器名（容器走 `docs/contract/custom.md` 流程）

### 预览拍板

✅ 跑 `preview-motifs.ts` 让用户视觉确认
❌ 让用户跳过预览（SVG motif 文字描述与渲染效果差异极大）

## CLI 子命令清单（本 skill 用到的）

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `personas recommend` | `{ title, summary, topic?, style? }` | `{ ranked[3], recommendNew, rationaleOneLine }` |
| `validate` | `{ spec }` 或 `{ md, persona? }` | `{ ok, errors[], warnings[] }`（含 `hint`） |
| `personas get` | `{ id }` | 完整 PersonaSpec（派生 base 时用） |
| `personas list` | — | `PersonaSummary[]` |

skill 独家脚本（CLI 不覆盖）：

| 脚本 | 用途 |
| --- | --- |
| `scripts/new-persona-from-prompt.ts` | 输出"给 LLM 用的结构化输出 prompt"（schema + 硬约束 + 相邻样例） |
| `scripts/preview-motifs.ts` | 读 spec.json → 生成单页 HTML gallery（色板 + 所有 motif + 各容器 icon） |
| `scripts/persist-persona.ts` | spec.json 落到 `src/core/themes/<id>/` + patch registry |

## 模板

| 模板 | 用途 |
| --- | --- |
| `templates/persona.starter.json` | 最小可校验 PersonaSpec 骨架（用作 LLM 起点） |
| `templates/persona.cookbook.md` | 4 套常见话题的 spec 骨架（夜行技术 / 暖色生活 / 内参财经 / 学术清简） |
| `templates/motif-h2prefix.json` | h2 标题前缀 4 种常见 motif AST（色条 / 几何 / 衬线点 / 圆点） |
| `templates/motif-divider.json` | 分隔线 5 种模板（wave / dots / flower / rule / glyph） |
| `templates/motif-stepbadge.json` | 步骤徽章模板（含 `{N}` 占位符） |

## 相关参考

共享 references（4 个 skill 共用同一份权威源）：

- [../_shared/references/mcp-cli-mapping.md](../_shared/references/mcp-cli-mapping.md) · CLI ↔ MCP ↔ Node 库 三种宿主形态映射、`describe` 接入起点
- [../_shared/references/error-routing.md](../_shared/references/error-routing.md) · `WtException` → 该转向哪个 skill
- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · subcommand 签名 / 退出码 / hint 表（**CLI 真源**）
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束完整清单
- [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md) · Motif AST 完整字段
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（由 build:skill-refs 派生）

独家 references（本 skill 专属）：

- [references/persona-anatomy.md](references/persona-anatomy.md) · PersonaSpec 11 字段逐个解释
