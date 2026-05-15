---
name: wechat-typeset-export-richtext
description: 把满足 wechat-typeset 写作契约的 Markdown 渲染并导出为可直接粘贴到微信公众号编辑器的富文本 HTML。内置多套 persona 即选即用，支持自定义 PersonaSpec。触发词："渲染出来" / "导出公众号" / "一键复制" / "生成最终 HTML" / "粘到公众号" / "比较几套主题哪个更好"。渲染管线自动处理微信硬约束（剥 font-family / SVG 颜色规范化 / flex 降级 block 等），写作者无需手工修。
---

# wechat-typeset · 渲染导出

把"满足契约的 markdown"渲染成"可粘贴的富文本 HTML"。**本 skill 不改 markdown 内容**——只跑渲染管线、应用 wxPatch、复制富文本。

## 边界

本 skill 处理 **契约 markdown → 公众号富文本 HTML** 的渲染导出，不改 markdown 内容、不造主题。完整的进入/退出信号见**路由总表**：[`../wechat-typeset/SKILL.md#routing-table`](../wechat-typeset/SKILL.md#routing-table)。

最常见的退出信号（渲染失败时尤其要看）：

- ❌ markdown 还没标 `:::` → 转 `wechat-typeset-annotate-markdown`
- ❌ 要造新主题 → 转 `wechat-typeset-author-persona`
- ❌ 渲染失败 `WtException(SPEC_INVALID)` → 转 `wechat-typeset-author-persona` 修 spec
- ❌ 渲染失败 `WtException(CONTRACT_VIOLATION)` 或 lint 报 `unknown_container` → 转 `wechat-typeset-annotate-markdown` 修 markdown

## CLI 入口

```bash
npm run cli -- <subcommand> [--flag value | --json]
```

退出码、subcommand 签名、JSON 形状的**单一真源**：[`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md)。

> **工作目录约定**：所有中间产物落在 `tmp/`（已在 `.gitignore`）。如不存在请先 `mkdir -p tmp`。

## 主线工作流（4 步）

复制此 checklist（**每步带成功判定**）：

```
Task Progress:
- [ ] 1. lint --persona 确认契约合法（主题敏感）→ ok=true 且 errorCount=0
- [ ] 2. render → output.html → JSON 含 html / wordCount / readingTime
- [ ] 3. （可选）render-gallery 多 persona 比较 → gallery.html 含 N 个并排预览
- [ ] 4. 浏览器打开 → 全选复制 → 粘公众号 / 或 copy-richtext → 公众号编辑器有内容
```

### Step 1 · lint（契约合法性预检 · 主题敏感）

```bash
# 推荐：传 --persona 触发主题敏感检查
echo '{"md":"...","persona":"<id>"}' | npm run cli -- lint --json
# 或文件输入
npm run cli -- lint --input <md> --persona <id>

# 在 markdown frontmatter 写 `theme: <id>` 让 lint 自动取（frontmatter 优先于 --persona）
```

按下表决策：

| 输出 | 动作 |
| --- | --- |
| `ok=true` 且 `warningCount=0` | 直接进 Step 2 |
| `ok=true` 但 `warningCount>0` | 通常是 `wrong_theme_namespace`（用了 theme:* 容器但当前主题不是其专属）。渲染仍出 HTML 但失去签名视觉。**告知用户后再决定是否进 Step 2** |
| `ok=false`（含 error） | 修完再 render。render 阶段才发现错误成本更高 |

issue 修复指南见 [`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md#lint-issue-修复表)。

> **必须传 `--persona`**：不传则跳过 `wrong_theme_namespace` 检查，render 时才暴露主题-容器错配。

### Step 2 · 单 persona 渲染

```bash
mkdir -p tmp
echo '{"md":"...原文...","persona":"<id>"}' | npm run cli -- render --json > tmp/result.json
jq -r .html tmp/result.json > output.html
# 或文件输入
npm run cli -- render --input <md> --persona <id> | jq -r .html > output.html
```

输出 JSON：`{ html, wordCount, readingTime, patchLog, frontmatterIssues, pageConfig }`。

### Step 3 · 多 persona 比较（可选）

```bash
tsx skills/wechat-typeset-export-richtext/scripts/render-gallery.ts \
  --input <md> \
  --personas default,tech-explainer,business-finance \
  --output gallery.html
```

`--personas all` 渲染全部已注册主题。输出 `gallery.html` 包含 N 个 persona 并排预览（iframe srcdoc 隔离），用于让用户选主题或给客户提交备选。

### Step 4 · 复制到公众号

**两种路径**：

**A. 人工**（推荐，可靠性最高）：

1. 浏览器打开 `output.html`
2. Ctrl+A 全选
3. Ctrl+C 复制
4. 打开公众号编辑器（mp.weixin.qq.com → 写文章）
5. Ctrl+V 粘贴

**B. 脚本辅助**（实验性）：

```bash
tsx skills/wechat-typeset-export-richtext/scripts/copy-richtext.ts \
  --input <md> \
  --persona <id> \
  [--save-fallback tmp/output.html]
```

直接吃源 markdown + persona，内部完成 render → 写入系统剪贴板：

- macOS：`osascript` 写 `public.html`
- Windows：`Set-Clipboard -AsHtml`
- Linux：`xclip -selection clipboard -t text/html`

剪贴板写入失败时落盘到 `--save-fallback` 指定路径，并提示作者手动复制。

注意：本脚本**不**接受已渲染的 HTML 文件路径——所有渲染都在脚本内重跑，避免"render 与 copy 之间错版本"。

## 选 persona 的两条规则

| 场景 | 动作 |
| --- | --- |
| 用户在 annotate-markdown 阶段已经定了 persona | 直接用，跳过 gallery 比较 |
| 用户没定 | 先跑 `render-gallery.ts` 看 `default` + 受众强匹配的 2 套（共 3 套），让用户选 |

## 渲染失败排查路径

退出码与 WtException 完整映射见 [`../_shared/references/cli-contract.md`](../_shared/references/cli-contract.md#退出码语义)。常见诊断：

| 退出码 | code | 推断 | 路径 |
| --- | --- | --- | --- |
| `2` | `RESOURCE_NOT_FOUND` | persona id 拼错 / 未注册 | 检查拼写 / `npm run cli -- personas list \| jq -r '.[].id'` |
| `3` | `SPEC_INVALID` | 用 `--spec` 走临时 spec 路径，spec 非法 | 转 `wechat-typeset-author-persona`，跑 `npm run cli -- validate` |
| `4` | `CONTRACT_VIOLATION` | fence 名不存在 / 嵌套不闭合 / variant 写错 | 转 `wechat-typeset-annotate-markdown`，跑 `npm run cli -- lint --persona <id>` |
| `4` | `RENDER_FAILED` | 其他渲染错误 | 看 stderr stack；通常是 markdown-it 解析问题或 wxPatch 边界 case |

## 粘贴后的人工 checklist

公众号编辑器粘贴完成后，建议执行：

```
- [ ] 标题栏填写文章标题（粘贴不会自动填）
- [ ] 封面图（如果 ::: cover 里有图，公众号会识别第一张图为封面候选；否则手动上传）
- [ ] 摘要（< 120 字，可从 ::: intro / ::: abstract 复制）
- [ ] 原创声明（公众号后台勾选）
- [ ] mpvoice / mpvideo 占位卡（如有）→ 替换为真节点（公众号编辑器"插入音频/视频"）
- [ ] 外链检查：::: footer-cta 的 href 是否是白名单（mp.weixin.qq.com / weixin://dl / tel: / mailto: / #anchor）
- [ ] 预览（手机预览图标）→ 看图标 / 二维码 / SVG 是否完整
```

完整粘贴指南见 [`references/paste-checklist.md`](references/paste-checklist.md)。

## 渲染纪律：✅ 与 ❌ 对照

### 调整位置

✅ 所有调整回到 markdown 层重新 render
❌ 手改 `output.html`（等于退出契约保护）

### `::: free` 边界

✅ 把临时 HTML 限制在 `::: free` 内，并承担"wxPatch 不保护"的代价
❌ 把 `::: free` 内的手写 HTML 当作 wxPatch 的保护范围

### lint 先行

✅ 先 `lint --persona <id>` 再 `render`（lint issue 比 render stack 易诊断）
❌ 跳过 lint 直接 render

### 渲染叠加

✅ 同 markdown 想试多 persona：用 `render-gallery.ts`，每个 persona 都从源 md 重跑
❌ 同一份 markdown 不同 persona "叠加渲染"（render 是无状态的）

### 公众号后台补全

✅ 粘贴后按 § 粘贴后的人工 checklist 走一遍
❌ 忘了封面 + 摘要 + 原创声明（这是公众号后台功能，本工具触达不到）

## CLI 子命令清单（本 skill 用到的）

| 子命令 | 输入 | 输出 |
| --- | --- | --- |
| `lint` | `{ md, persona? }` | `{ ok, issues[], count, errorCount, warningCount }` |
| `render` | `{ md, persona?, spec?, platform? }` | `{ html, wordCount, readingTime, patchLog, frontmatterIssues, pageConfig }` |
| `validate` | `{ spec }` 或 `{ md, persona? }` | `{ ok, errors[], warnings[] }` |

skill 独家脚本（CLI 不覆盖）：

| 脚本 | 用途 |
| --- | --- |
| `scripts/render-gallery.ts` | 多 persona 并排预览（iframe srcdoc） |
| `scripts/copy-richtext.ts` | HTML 写入系统剪贴板（Win/Mac/Linux） |
| `scripts/open-in-browser.ts` | 启动 vite preview + 自动打开浏览器 |

## 相关参考

独家 references（本 skill 专属）：

- [references/render-api.md](references/render-api.md) · `render()` / `createPersona()` / wxPatch 选项详细签名
- [references/wxpatch-behavior.md](references/wxpatch-behavior.md) · WxPatch 8 步自动修复的具体行为
- [references/paste-checklist.md](references/paste-checklist.md) · 粘贴前后的人工 checklist

共享 references（三个 skill 共用同一份权威源）：

- [../_shared/references/cli-contract.md](../_shared/references/cli-contract.md) · subcommand 签名 / 退出码 / lint issue 修复表 / JSON 输出形状（**CLI 真源**）
- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
- [../_shared/references/personas.md](../_shared/references/personas.md) · 内置 persona 速查（gallery 时挑哪几套对比）
