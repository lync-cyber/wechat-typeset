---
name: wechat-typeset
description: wechat-typeset 仓库的意图路由入口。用于“做一篇公众号”“排个版给我看看”“帮我用 wechat-typeset 出一篇”等宽口径需求，区分写作、可选标注、主题设计和渲染导出。普通 Markdown 可直接渲染；不因缺少扩展容器而强制标注。本 skill 只做路由和概览。
---

# wechat-typeset · 路由入口

先按用户要做的事情选择工作流，再检查输入；不要根据是否含 `:::` 决定是否必须标注。

## 子 skill 边界

| skill | 边界 | 适用需求 |
| --- | --- | --- |
| [wechat-typeset-author-persona](../wechat-typeset-author-persona/SKILL.md) | 视觉设计 | 新建主题、换色板、自定义 motif |
| [wechat-typeset-annotate-markdown](../wechat-typeset-annotate-markdown/SKILL.md) | 可选的保守标注与语法修复 | 明确加排版块、选择容器、修复扩展语法 |
| [wechat-typeset-export-richtext](../wechat-typeset-export-richtext/SKILL.md) | 渲染导出 | 普通或扩展 Markdown 套主题、预览、复制、导出 |

写作任务先按用户提供的素材、受众和文风完成普通 Markdown。写作阶段不用加载容器词汇表，也不要求摘要、金句、数据卡或 CTA。内容编辑完成后，再按需要进入下面的排版工作流。

## 路由总表（信号 → skill）{#routing-table}

此表是三个工作流 skill 的进入/退出信号的单一真源。

### 进入信号

| 用户信号 | 路由到 |
| --- | --- |
| 给普通 Markdown，要“渲染 / 导出 / 发公众号 / 按公众号格式排版” | export-richtext；直接套主题，标注不是前置条件 |
| 给已有扩展容器的 Markdown，要“渲染 / 导出 / 复制” | export-richtext |
| 明确要求“加排版块 / 标注成 tip / 选择容器 / 按扩展契约标注” | annotate-markdown；只添加确有收益的标注 |
| “挑一套主题 / 比较几套主题” | export-richtext；按用户要求推荐或比较，不先改正文 |
| 要新主题、色板、motif 或自定义视觉 | author-persona |
| “做一篇公众号”，只有题目或素材 | 先完成普通 Markdown 写作，再进入 export-richtext；用户要求加块时才进入 annotate-markdown |

### 退出 / 转向信号

| 当前 skill | 信号 | 转向 |
| --- | --- | --- |
| annotate-markdown | 用户要渲染，或筛选后没有值得添加的标注 | export-richtext；零标注是有效结果 |
| annotate-markdown | 用户明确要求造主题 / 自定义视觉 | author-persona |
| annotate-markdown | `personas recommend` 输出 `recommendNew=true` | 先使用合适的现有主题或 default；仅用户要求新主题时转 author-persona |
| author-persona | 给 Markdown 要加排版块 | annotate-markdown |
| author-persona | 要渲染 / 导出 HTML | export-richtext |
| author-persona | 改通用 CSS / 新增 fence 容器 | 仓库开发任务，不在主题 skill 边界内 |
| export-richtext | 明确要求额外标注，或已有扩展语法需要修复 | annotate-markdown；修复不附带新增排版块 |
| export-richtext | 要造新主题 | author-persona |
| 任意 skill | 抛 `WtException(...)` | 见 [error-routing.md](../_shared/references/error-routing.md) |

### 输入检查

- 没有 `:::` 的普通 Markdown 是合法渲染输入，直接进入 export-richtext 的 lint / render 流程。
- 有扩展语法且不确定是否合法时，用 `markdown lint` 检查；有错误只修对应语法，不借机改写正文或增加组件。
- 代码块中展示的 `:::` 示例不代表正文已标注，不用 fence 字符串扫描替代语法校验。
- 用户已选 persona 就沿用；未选时可推荐已有主题，无明显偏好时使用 `default`。比较主题仅在用户要求比较时进行。

## 默认流程

```text
1. 写作、内容编辑：普通 Markdown 即可。
2. 直接渲染：markdown lint → markdown render。
3. 仅在需要特殊呈现时：markdown annotate → 筛选 → markdown annotate apply → lint → render。
```

第三步是可选分支，不是每篇文章的必经步骤。所有候选都跳过时，保留原文直接渲染。

```bash
npm run cli -- markdown lint --input article.md --persona default
npm run cli -- markdown render --input article.md --persona default
```

命令返回 JSON，render 的 `html` 字段可保存为 HTML；需要完整 HTML 文档时使用 `asDocument: true`，详见 export-richtext。

## 参考

- [cli-contract.md](../_shared/references/cli-contract.md) · 命令签名、退出码与返回结构
- [mcp-cli-mapping.md](../_shared/references/mcp-cli-mapping.md) · CLI / MCP / Node 映射
- [personas.md](../_shared/references/personas.md) · 仅选主题时查阅
- [container-vocabulary.md](../_shared/references/container-vocabulary.md) · 仅标注具体组件时查阅
- [error-routing.md](../_shared/references/error-routing.md) · 错误定位与转向
