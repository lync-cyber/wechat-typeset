# wechat-typeset

> 写 Markdown，看手机预览，一键复制进公众号——不登账号、不跑后端，草稿存在本地不丢。

[![license](https://img.shields.io/badge/license-MIT-a83420.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D24-2a1a14.svg)](package.json)

<p align="center">
  <img src="docs/design/hero-personas.svg" alt="wechat-typeset 主题预览：从极客夜行到慢生活，每套主题自带配色、字距与装饰风格" width="100%"/>
</p>

**[在线编辑器](https://lync-cyber.github.io/wechat-typeset)** — 无需安装，浏览器打开即用。

---

## 亮点

**面向写作者**

- **预览即剪贴板** — 左侧 Markdown，右侧 375 px 手机预览实时同步；点「一键复制」回公众号粘贴，所见即所粘，没有"预览好看、粘贴塌版"。
- **18 套主题，一套一种气质** — 不只换色板，每套是一整组配色、字距、装饰图形与版式骨架。技术稿、财经周刊、人物特稿、生活随笔各有所属，切主题不塌版。
- **公众号高频版式开箱即用** — 提示块、金句卡、步骤卡、对比块、刊头、目录、KPI 仪表盘 ... 在 Markdown 里一行声明即可，主题决定渲染样式。
- **纯前端零外传** — 草稿落本地，不登账号、不跑后端、不加分析。分享走 URL 编码，把内容直接塞进链接里，发出去即载入只读草稿。

**面向 LLM / Agent 集成**

- **四个 Claude Skill 即插即用** — 路由 / 设计主题 / 改写 markdown / 渲染导出四条工作流，挂载即可工作。
- **MCP Server 一行起跑** — `npx -p @wechat-typeset/mcp wechat-typeset-mcp`，与 Claude Desktop / Cursor 直接对接。
- **可作 Node 库 / 命令行使用** — 同一份引擎，三种形态分发，schema 同源、JSON in / JSON out。
- **机器可读的能力清单** — 一份订阅即可获悉全部主题、容器、变体、平台约束与错误码，自描述、可钉版本。

详细的入口、配置与契约说明见 [LLM / Agent 集成指南](docs/README.md#llm--agent-集成)。

---

## 快速开始

**只想发一篇公众号文章** — 打开 [在线编辑器](https://lync-cyber.github.io/wechat-typeset)，左侧粘 Markdown，右侧切主题看预览，点「一键复制」回公众号粘贴。

**想本地跑** —

```bash
git clone https://github.com/lync-cyber/wechat-typeset.git
cd wechat-typeset
pnpm install && pnpm dev      # http://127.0.0.1:5173
```

`pnpm build` 产出静态文件到 `dist/`，可上传任意静态主机。`pnpm test` 跑单测与端到端校验。更多命令见 [CONTRIBUTING.md](CONTRIBUTING.md)。

**想从代码里调用** —

```bash
pnpm add wechat-typeset
```

```ts
import { render } from 'wechat-typeset'

const { html } = render({ md: '# Hello', persona: 'tech-explainer' })
```

完整 API 与参数说明见 [主题作者指南 · 公共 API](docs/theme-authoring.md#公共-api给外部集成方)。

**想接到 Claude / Cursor / 其它 Agent** — 见 [LLM / Agent 集成指南](docs/README.md#llm--agent-集成)，含 Skill 挂载、MCP 配置、CLI 与公共契约订阅。

---

## 18 套主题

切主题不只是换色，是换一整套配色、字距、装饰语言与版式骨架，连同一种读者关系一起换。顶栏选择器即时切换，复制产物与预览完全同步。

| 适合写 | 主题 |
| --- | --- |
| 通用题材 | 默认 |
| 技术 / 工程 / 文档 / 学术 | 极客夜行、文档白昼、学术前沿 |
| 财经 / 行业 / 数据 / 电商 | 硬核财经、行业观察、数据简报、电商脉动 |
| 人文 / 文学 / 生活 | 人文札记、人物特稿、慢生活 |
| 编辑 / 设计 / 慢读 | 编辑刊、苏黎世栅格、粗野主义报刊、深夜电台 |
| 教育 / 公告 / 青年 | 教室课堂、公文公报、青年潮志 |

逐套主题的设计笔记（色板理由 / 拒绝坐标 / 签名动作）在 [docs/design/personas/](docs/design/personas/)；速览表与选型决策树见 [skills/_shared/references/personas.md](skills/_shared/references/personas.md)。

页面级覆盖可在 Markdown 头部声明：

```yaml
---
theme: swiss-grid
variants:
  admonition: pill-tag
---
```

---

## 排版块

Markdown 之外，公众号高频版式只需一行声明。主题自动决定渲染样式。

**提示块** — 四种状态：`tip` / `warning` / `info` / `danger`，形状区分而非仅靠颜色（色盲友好）。

```markdown
::: tip 小贴士
草稿自动保存在浏览器本地，关掉标签页再开还在。
:::
```

**金句卡** — 大字居中，带主题装饰引号。

```markdown
::: quote-card
预览好看、粘贴后塌——这种情况在 wechat-typeset 里是 bug，不是特性。
:::
```

**步骤卡** — 有序列表，数字徽章跟随主题风格。

```markdown
::: steps
1. 粘贴 Markdown 原文
2. 切主题、看手机预览
3. 点「一键复制」，回公众号粘贴
:::
```

**对比块** — 两列并排，外层四冒号，内层三冒号。

```markdown
:::: compare
::: pros 优点
- 无需登录，草稿在本地
:::
::: cons 限制
- 仅适配微信公众号
:::
::::
```

完整清单（作者卡、封面、分割线、推荐卡、二维码 ...）见 [基础契约](docs/contract/base.md)；刊物 / newsletter 版式（刊头、目录、Q&A、脚注、CTA ...）见 [pack:editorial](docs/contract/packs/editorial.md)；数据可视化（KPI 仪表盘、条形图）见 [pack:data-viz](docs/contract/packs/data-viz.md)。

---

## 为什么不用现有工具

公众号编辑器对样式有严格限制：很多 CSS 属性会被剥离或客户端覆盖，细描边会在服务端栅格化时消失。大多数"Markdown 转公众号"工具把这当成 bug 绕过去，结果是一套蓝色主题套在所有题材上——财经稿与生活随笔共用同一组标题样式。

wechat-typeset 把视觉气质当成一等公民处理。每套主题持有完整的视觉语言；微信平台约束在渲染管线内部统一处理，不由作者承担。约束与降级细则见 [平台现实](docs/contract/platform.md) 与 [降级合同](docs/contract/fallback.md)。

---

## 部署

构建产物（`pnpm build` 输出到 `dist/`）上传任意静态主机即可。仓库自带 GitHub Pages、jsDelivr CDN、Cloudflare Pages、Netlify 四个部署入口；配置与 `VITE_BASE` 说明见 [docs/README.md · 镜像部署](docs/README.md#镜像部署)。

---

## 参与贡献

提 issue / PR 前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。新增主题流程见 [主题作者指南](docs/theme-authoring.md)。所有文档入口见 [docs/README.md](docs/README.md)。

---

MIT · © 2026 lync-cyber
