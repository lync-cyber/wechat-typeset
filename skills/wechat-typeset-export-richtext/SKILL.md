---
name: wechat-typeset-export-richtext
description: 将满足 wechat-typeset 写作契约的 Markdown 渲染并导出为可直接粘贴到微信公众号编辑器的富文本 HTML。内置多套 persona 即选即用，也支持自定义 PersonaSpec。当用户说"渲染出来""导出公众号""一键复制""生成最终 HTML""给我成品""粘到公众号""跑 wxPatch""比较几套主题哪个更好"时使用。渲染管线自动处理微信硬约束（剥 font-family / 替换 SVG #fff → #fefefe / flex 降级 block 等），写作者无需手工修。
---

# wechat-typeset · 渲染导出

把"满足契约的 markdown"渲染成"可粘贴的富文本 HTML"。**本 skill 不改 markdown 内容**——只跑渲染管线、应用 wxPatch、复制富文本。

## 何时使用

进入本 skill 的信号：

- 用户给一份 `:::` 容器满布的 markdown，要"渲染" / "导出" / "复制"
- 用户在浏览器里跑过 `npm run dev` 但想纯 CLI 走（CI / 自动化场景）
- 用户拿不准用哪套 persona，想"几套都渲染一下比较"

不要用本 skill：

- 用户给的 markdown 还没标 `:::` → 先转 `wechat-typeset-annotate-markdown`
- 用户要造新主题 → 先转 `wechat-typeset-author-persona`
- 渲染失败 stack 里是 `SpecValidationError` → 转 `wechat-typeset-author-persona` 修 spec
- 渲染失败 stack 里是 `fence_syntax` / `unknown_container` → 转 `wechat-typeset-annotate-markdown` 修 markdown

## 主线工作流（4 步）

复制此 checklist：

```
Task Progress:
- [ ] 1. lint-contract.ts <input.md> 确认契约合法
- [ ] 2. render-html.ts <input.md> --persona <id> --out output.html
- [ ] 3. （可选）render-gallery.ts 比较多 persona
- [ ] 4. 浏览器打开 → 全选复制 → 粘公众号 / 或 copy-richtext.ts
```

### Step 1 · lint（契约合法性预检）

```bash
tsx skills/wechat-typeset-export-richtext/scripts/lint-contract.ts <input.md>
```

输出 `ok=true` 或 `issues[]`。**lint 失败不要进 Step 2**——render 阶段才发现错误成本更高。

issue 修复指南见 `wechat-typeset-annotate-markdown` 的 SKILL.md（重复同一份 issue 修复表）。

### Step 2 · 单 persona 渲染

```bash
tsx skills/wechat-typeset-export-richtext/scripts/render-html.ts \
  <input.md> \
  --persona <id> \
  --out output.html
```

输出：

- `output.html` 完整 HTML（含 juice 内联 + wxPatch）
- stdout JSON：`{ ok, persona, wordCount, readingTime, htmlLength }`

退出码：
- `0` 成功
- `1` IO 错
- `2` 未知 persona id
- `3` SpecValidationError（如果用了 `--spec` 路径而 spec 非法）
- `4` render 失败（容器语法错 / 嵌套不闭合）

### Step 3 · 多 persona 比较（可选）

```bash
tsx skills/wechat-typeset-export-richtext/scripts/render-gallery.ts \
  <input.md> \
  --personas default,tech-explainer,business-finance \
  --out gallery.html
```

输出 `gallery.html` 包含 N 个 persona 并排预览（iframe srcdoc 隔离）。**典型场景**：

- 用户写完一篇文章，不知道哪套 persona 更合气质
- 给客户提交 3 套备选

不指定 `--personas` 时默认渲染全部已注册主题。

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
tsx skills/wechat-typeset-export-richtext/scripts/copy-richtext.ts output.html
```

把 HTML 写入系统剪贴板（Windows 用 `clip`，macOS 用 `pbcopy`，Linux 用 `xclip`）。**注意**：

- Windows 的 `clip` 只支持纯文本，HTML 进剪贴板需要专用脚本（脚本内已处理）
- 公众号编辑器粘贴时优先识别 `text/html` MIME；如果剪贴板里只有 `text/plain`，会丢样

## 选 persona 的两条规则

如果不知道选哪个：

1. **用户在 annotate-markdown 阶段已经定了 persona** → 直接用，跳过 gallery 比较
2. **用户没定** → 先跑 `render-gallery.ts` 看 default + 受众强匹配的 2 套（共 3 套），让用户选

## 渲染失败排查路径

| 退出码 | error 字段 | 推断 | 路径 |
| --- | --- | --- | --- |
| `2` | `unknown_persona` | persona id 拼错 / 未注册 | 检查拼写 / 用 `listPersonas()` 查 |
| `3` | `spec_validation` | 用 `--spec` 走临时 spec 路径，spec 非法 | 转 `wechat-typeset-author-persona`，跑 `validate-and-fix.ts` |
| `4` | `fence_syntax` | fence 名不存在 / 嵌套不闭合 / variant 写错 | 转 `wechat-typeset-annotate-markdown`，跑 `lint-contract.ts` |
| `4` | `render_failure` | 其他渲染错误（罕见） | 看 stack；多半是 markdown-it 解析问题或 wxPatch 边界 case |

## 粘贴后的人工 checklist

**公众号编辑器粘贴完成后**，建议执行：

```
- [ ] 标题栏填写文章标题（粘贴不会自动填）
- [ ] 封面图（如果 ::: cover 里有图，公众号会识别第一张图为封面候选；否则手动上传）
- [ ] 摘要（< 120 字，可从 ::: intro / ::: abstract 复制）
- [ ] 原创声明（公众号后台勾选）
- [ ] mpvoice / mpvideo 占位卡（如有）→ 替换为真节点（公众号编辑器"插入音频/视频"）
- [ ] 外链检查：::: footer-cta 的 href 是否是白名单（mp.weixin.qq.com / weixin://dl / tel: / mailto: / #anchor）
- [ ] 预览（手机预览图标）→ 看图标 / 二维码 / SVG 是否完整
```

完整粘贴指南见 [references/paste-checklist.md](references/paste-checklist.md)。

## 脚本清单

| 脚本 | 用途 |
| --- | --- |
| `scripts/lint-contract.ts` | 契约合法性预检（fence / 嵌套 / variant / 行内闭合） |
| `scripts/render-html.ts` | 单 persona 渲染（薄壳，转发到仓库根 scripts/wechat-typeset-cli.ts） |
| `scripts/render-gallery.ts` | 多 persona 并排预览（iframe srcdoc） |
| `scripts/copy-richtext.ts` | HTML 写入系统剪贴板（Win/Mac/Linux 兼容） |
| `scripts/open-in-browser.ts` | 启动 vite preview + 自动打开浏览器（少用，命令行场景） |

## 不要做的事

- **不要手改 output.html**——所有调整应回到 markdown 层。改 HTML 等于退出契约保护
- **不要把 `::: free` 内的手写 HTML 当作 wxPatch 的保护范围**——free 退出契约
- **不要跳过 lint 直接 render**——render 失败的 stack 比 lint issue 难诊断
- **不要把同一份 markdown 用不同 persona 多次"叠加渲染"**——render 是无状态的，每次都从源 markdown 开始
- **不要忘记在公众号编辑器后补一遍封面 + 摘要 + 原创声明**——这是公众号后台功能，本工具触达不到

## 相关参考

独家 references（本 skill 专属）：

- [references/render-api.md](references/render-api.md) · `render()` / `createPersona()` / wxPatch 选项详细签名
- [references/wxpatch-behavior.md](references/wxpatch-behavior.md) · WxPatch 8 步自动修复的具体行为
- [references/paste-checklist.md](references/paste-checklist.md) · 粘贴前后的人工 checklist

共享 references（与 author-persona / annotate-markdown 共用同一份权威源，通过相对路径软链）：

- [../_shared/references/hard-rules.md](../_shared/references/hard-rules.md) · 硬约束清单（用于排查渲染失败的"为什么"）
- [../_shared/references/container-vocabulary.md](../_shared/references/container-vocabulary.md) · 容器词汇表速查
