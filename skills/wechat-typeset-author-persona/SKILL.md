---
name: wechat-typeset-author-persona
description: 设计并创建 wechat-typeset 的组件样式——色板、字号、间距、SVG motif、容器变体一次性产出可通过 validatePersona 校验的 PersonaSpec JSON。当用户说"设计一套深色技术风主题""做个暖色生活主题""为我的公众号做一套排版样式""换个配色""加个新的标题前缀图标""定制公众号视觉""basis 上调一下 quote 骨架""为这个话题挑一套或造一套主题"时使用。产出严格通过硬约束（11 键色板、四态 status、motif fontSize≥14、strokeWidth≥1、variant id 白名单、signatureContainers 白名单）。
---

# wechat-typeset · 主题/Persona 创作

把"我想要一套什么气质的公众号视觉"翻译成机器可投影的 `PersonaSpec` JSON。LLM 生成 → `validatePersona` 校验 → `specToTheme` 投影 → `render()` 渲染。**真相来源永远是 spec**，不是手写 Theme 对象、不是 SVG 字符串。

## 何时使用

进入本 skill 的信号：

- 用户描述视觉气质（"暖米底圆角"、"VT220 琥珀字"、"杂志感首字下沉"、"newsletter 期号印章"）
- 用户要从现有主题派生（"在 default 基础上换主色"、"tech-explainer 但代码块要更花"）
- 用户要造装饰元素（h2 前缀图标、分隔线 motif、步骤徽章、印章）
- 用户问"应该选哪套主题"——先用 [`scripts/recommend-from-prompt.ts`](scripts/recommend-from-prompt.ts) 看是否能复用内置主题，**不能复用再造新的**

不要用本 skill：

- 用户给一段 markdown 要"标注"或"加排版块" → 转 `wechat-typeset-annotate-markdown`
- 用户要"渲染" / "导出 HTML" / "复制到公众号" → 转 `wechat-typeset-export-richtext`
- 改通用 CSS / 加非主题的 fence 容器 → 改 `src/core/vocabulary/vocabulary.ts`，不在本 skill 边界内

## 主线工作流（5 步）

复制此 checklist 跟踪进度：

```
Task Progress:
- [ ] 1. 收集视觉定位（受众 / 题材 / 参照风格 / 强弱）
- [ ] 2. 决策：复用内置 / 派生现有 / 全新造
- [ ] 3. 生成 spec JSON（new-persona-from-prompt.ts 输出 schema + prompt）
- [ ] 4. 校验循环（validate-and-fix.ts 至 ok=true）
- [ ] 5. 预览 + 落地（preview-motifs.ts → 用户拍板 → persist-persona.ts）
```

### Step 1 · 收集视觉定位

用 AskQuestion 一次拿齐（避免追问）：

- **受众**：技术布道 / 财经内参 / 散文 / 教程文档 / 生活随笔 / 人物特稿 / 学术 / 周刊 newsletter
- **题材频次**：单篇 / 长期栏目（栏目要更克制，避免视觉疲劳）
- **参照锚点**：用户能说出"像 X 那种感觉"是最强信号（Stratechery / FT 中文 / Stripe Docs / 财新 / New Yorker）
- **明确禁忌**：是否禁用某些颜色（品牌冲突）、是否要无衬线、是否反对装饰图标

### Step 2 · 决策：复用 / 派生 / 全新

`scripts/recommend-from-prompt.ts --description "<用户描述>"` 输出推荐链：

1. **强匹配**（受众 + 视觉参照都对上）→ 直接 `wechat-typeset-export-richtext` 用内置 id，本 skill 退出
2. **改色板/换骨架就够**（受众对、palette 不对）→ 走 [派生现有主题](#派生现有主题) 路径
3. **气质全新**（参照锚点和现有内置主题都拉不上）→ 走 [全新造主题](#全新造主题) 路径

### Step 3 · 生成 spec JSON

**全新造主题**：

```bash
tsx skills/wechat-typeset-author-persona/scripts/new-persona-from-prompt.ts \
  --description "<用户描述>" \
  --out tmp/new-spec.json
```

脚本输出**给 LLM 的结构化输出 prompt**（含 JSON Schema 摘要 + 硬约束清单 + 类似主题的 spec 片段）。LLM 把 JSON 写到 `tmp/new-spec.json`。

**派生现有主题**：从 `templates/derive-from-base.md` 拷骨架（含 spread + 改改样例），改完保存到 `tmp/spec.json`。

### Step 4 · 校验循环（feedback loop）

```bash
tsx skills/wechat-typeset-author-persona/scripts/validate-and-fix.ts tmp/spec.json
```

输出三种结果：

- **`ok=true`**：进 Step 5
- **`ok=false`，列了 errors[]**：每条 error 含 `path` + `message` + 修复建议。把整份 errors 喂回 LLM 让它 self-correct 同一份 spec，重跑校验
- **重试 3 轮仍失败**：去 [常见失败模式](#常见失败模式与处理) 手工诊断

### Step 5 · 预览 + 落地

```bash
tsx skills/wechat-typeset-author-persona/scripts/preview-motifs.ts tmp/spec.json --out tmp/preview.html
```

浏览器打开 `tmp/preview.html` 给用户看 SVG motif gallery（色板色块 + h2Prefix + 全部 divider + stepBadge 占位符示例 + 5 态 admonition icon）。**这是用户拍板的关键步骤**——不要跳。

用户确认后：

```bash
tsx skills/wechat-typeset-author-persona/scripts/persist-persona.ts \
  tmp/spec.json --id <kebab-id>
```

落到 `src/core/themes/<id>/persona.data.ts` + 改 `src/public/personas.ts` 的 import 列表。

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

- `id` / `name` 不能直接 spread（必须改）——用户重复用同 id 会冲突
- `palette.accent = palette.primary` 是 default 的设计选择；其他主题里 accent 可与 primary 不同，按主题原 spec 判断
- 派生 spec 也必须过 `validate-and-fix.ts`——patch 系统的 `__reset: true` 能意外清掉硬约束

## 全新造主题

参考 `templates/persona.starter.json`（最小可校验 spec）和 `templates/persona.cookbook.md`（4 套常见话题的 spec 框架）。

**最容易出错的两块**：

### palette 的 4 态 status

`status` 是 `{ tip, info, warning, danger }` 四态，每态 `{ accent, soft }` 成对。soft 是底色（10% 不透明的 accent 近似），accent 是边线/图标色。最容易遗漏 `info`（被当成"我又不用 info 容器"忽略掉）。

### motif 字号 / 描边

LLM 经常凭设计稿习惯写 `fontSize: 12` 或 `strokeWidth: 0.5`——硬约束最低分别是 14 和 1。SVG 在公众号会被光栅化，亚像素描边直接消失，< 14 字号在 375px 屏上糊成一坨。

完整硬约束清单见 [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md)；motif AST 完整字段见 [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md)。

## 常见失败模式与处理

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

## 不要做的事

- **不要手写 `Theme` 对象**——永远走 `PersonaSpec`。`specToTheme` 里隐含的 `commonTemplates` 合并和 asset 规范化不能绕过
- **不要在 spec 里塞原始 SVG 字符串**——motif 必须是 AST。校验器看不穿字符串
- **不要跳过 `validatePersona`**——即便在内置 persona 上做微调。patch 系统的 `__reset: true` 能清掉平台约束
- **不要发明 fence 名**——主题的边界是 token / motif / variant 选择 + signatureContainers 声明，**不**包括新增容器；新容器走 `docs/contract/custom.md` 流程
- **不要让用户跳过预览**——SVG motif 文字描述与渲染效果差异极大，必须 preview-motifs.ts 让用户视觉确认

## 脚本清单

| 脚本 | 用途 |
| --- | --- |
| `scripts/recommend-from-prompt.ts` | 用户描述 → 输出 top-3 内置主题推荐（含选/不选的理由）+ 是否建议造新 |
| `scripts/new-persona-from-prompt.ts` | 输出"给 LLM 用的结构化输出 prompt"（schema + 硬约束 + 相邻样例），不调 LLM |
| `scripts/validate-and-fix.ts` | 读 spec.json → `validatePersona` → 输出 errors[] + 修复建议（喂回 LLM 用） |
| `scripts/preview-motifs.ts` | 读 spec.json → 生成单页 HTML gallery（色板 + 所有 motif + 各容器的 admonition icon） |
| `scripts/persist-persona.ts` | 把 spec.json 落到 `src/core/themes/<id>/persona.data.ts` + patch `src/public/personas.ts` |

## 模板

| 模板 | 用途 |
| --- | --- |
| `templates/persona.starter.json` | 最小可校验 PersonaSpec 骨架（用作 LLM 起点） |
| `templates/persona.cookbook.md` | 4 套常见话题的 spec 骨架（夜行技术 / 暖色生活 / 内参财经 / 学术清简） |
| `templates/motif-h2prefix.json` | h2 标题前缀 4 种常见 motif AST（色条 / 几何 / 衬线点 / 圆点） |
| `templates/motif-divider.json` | 分隔线 5 种模板（wave / dots / flower / rule / glyph） |
| `templates/motif-stepbadge.json` | 步骤徽章模板（含 `{N}` 占位符） |

## 相关参考

共享 references（三个 skill 共用同一份权威源，通过相对路径软链）：

- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束完整清单
- [../_shared/references/motif-ast.md](../_shared/references/motif-ast.md) · Motif AST 完整字段
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查

独家 references（本 skill 专属）：

- [references/persona-anatomy.md](references/persona-anatomy.md) · PersonaSpec 11 字段逐个解释
