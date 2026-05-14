# 写作契约（Writer Contract）

> **一句话承诺**：写进本契约的 Markdown，在任何主题下排版稳定、复制到公众号不丢样、切主题不塌版。
> 超出契约的写法（手写 HTML / `class` / `style` / 自由 CSS）不在保护范围内。

写作者**只关心怎么写**——不需要知道当前用了哪套主题、容器底层 CSS 是什么、SVG 如何降级。
本契约就是上游写作和下游排版之间的**唯一接口**。

---

## 契约的三层

| 层 | 由什么构成 | 谁负责 | 入口文档 |
| --- | --- | --- | --- |
| 1. **基础契约** | CommonMark + GFM + 行内扩展集 + 通用容器全集 | 所有写作者必读 | [base.md](base.md) |
| 2. **扩展契约** | 领域专属容器包，按主题"承诺"加载（当前内置：`data-brief`） | 用对应主题时再翻 | [packs/](packs/) |
| 3. **自定义扩展** | fork / 集成方在本地追加私有容器 | 进阶集成方 | [custom.md](custom.md) |

> `容器`指 `::: name … :::` 这类 fence 块。通用 fence 语法（info / attrs / 嵌套 / variant 覆盖）和行内扩展见 [syntax.md](syntax.md)。

---

## 子文档导航

| 文档 | 内容 | 面向 |
| --- | --- | --- |
| [syntax.md](syntax.md) | 容器 fence 通用语法、行内扩展、常见错误 | 任何写作者 |
| [base.md](base.md) | 基础契约的通用容器全集（结构 / 提示 / 内容 / 导航 / 媒体 / 签名 / 兜底） | 任何写作者 |
| [packs/data-brief.md](packs/data-brief.md) | `data-brief` 扩展包：刊头 / 目录 / KPI 仪表盘 / 条形图 / 问答 / 脚注 等签名容器集 | 写数据简报或栏目化深度文 |
| [custom.md](custom.md) | 在 fork 里加私有容器的流程，与契约保护范围的边界 | 集成方 / 主题作者 |
| [platform.md](platform.md) | 公众号平台现实（外链白名单 / footer-cta href / 粘贴责任划分）+ 契约演进规则 | 任何发文的人 |

---

## 三条阅读路线

**A. 我只想写文章**
[syntax.md](syntax.md) → [base.md](base.md) → 写。如果选了 data-brief 主题，再翻 [packs/data-brief.md](packs/data-brief.md)。

**B. 我在做 LLM / Agent 集成**
本目录 + [`dist/api/capabilities.json`](../../dist/api/capabilities.json)（机器可读全集）+ [`skills/wechat-typeset/`](../../skills/wechat-typeset/)（密度写法）。

**C. 我要 fork 或加私有容器**
[custom.md](custom.md) → [theme-authoring.md](../theme-authoring.md)。私有扩展不进入本契约的承诺保护，需自行保证 wxPatch / 公众号兼容。

---

## 这份契约不保证什么

- **写到 `::: free` 之外的手写 HTML 塌版**：退出契约，自行承担。
- **公众号原生节点**（mpvoice / mpvideo / 原创声明 / 封面图 / 小程序卡片）：是平台后台功能，本契约只提供占位锚点容器。
- **跨平台 Markdown 通用性**：本契约面向公众号，不承诺在 Notion / 简书 / Hashnode 等其他平台同样渲染。
- **公众号 UI 改版导致的链接行为变化**：见 [platform.md · 外链现实边界](platform.md#外链的现实边界)。

破坏性变更走 deprecation 流程：见 [platform.md · 契约演进](platform.md#契约演进)。
