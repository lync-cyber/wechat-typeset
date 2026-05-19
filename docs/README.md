# wechat-typeset · 文档索引

项目文档按"用途"分四层：使用者查语法、主题作者查 spec 合同、LLM / Agent 集成方查 skill 与 CLI / MCP 契约、维护者查验收清单。
`design/personas/` 下是各套人格的**设计笔记**（色板为什么这样定、拒绝了哪些参照），属于 spec 作者的工作稿，不是读者手册。

## 使用者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [../README.md](../README.md) | GitHub 访客 | 这个工具是什么，30 秒决策 |
| [contract/README.md](contract/README.md) | 作者（写 Markdown） | 写作契约总纲：三层模型、子文档导航、阅读路线 |
| [contract/syntax.md](contract/syntax.md) | 作者（写 Markdown） | 容器 fence 通用语法、5 个行内扩展、常见错误 |
| [contract/base.md](contract/base.md) | 作者（写 Markdown） | 基础契约的通用容器全集，含速查表与分组示例 |
| [contract/packs/editorial.md](contract/packs/editorial.md) | 写栏目化深度文 / newsletter 的作者 | `pack:editorial` 扩展包：刊头 / 目录 / 问答 / 脚注 / CTA / 订阅卡 / 编辑部注 / 收束栏 |
| [contract/packs/data-viz.md](contract/packs/data-viz.md) | 写数据简报 / 行业报告 的作者 | `pack:data-viz` 扩展包：KPI 仪表盘、横向条形图 |
| [contract/packs/data-brief.md](contract/packs/data-brief.md) | 用 `data-brief` 主题的作者 | 主题专属装饰说明（章节编号 monospace 等） |
| [contract/custom.md](contract/custom.md) | fork / 集成方 | 在本地追加私有容器的四步流程 |
| [contract/platform.md](contract/platform.md) | 任何发文的人 | 公众号外链白名单、footer-cta href、契约演进规则 |
| [contract/fallback.md](contract/fallback.md) | 任何写作者 / 集成方 | 4 级降级合同：容器 / 变体 / 主题 / 样式各层失效行为 |

## 主题作者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [theme-authoring.md](theme-authoring.md) | 新增 / fork 主题的作者 | `PersonaSpec` 合同、校验器、公共 API、showcase 审稿 7 区块 |
| [design-to-impl-mapping.md](design-to-impl-mapping.md) | variant 实现者 / 主题作者 | 把 `wechat-typeset-container/` 设计稿翻译为 variant 代码：grid/flex 降级、tokens 映射、checklist |
| [design/personas/](design/personas/) | 想理解既有人格的读者 | 各套主题的设计决策笔记（色板理由 / 拒绝坐标 / 签名动作） |
| [THEME-DEBT.md](THEME-DEBT.md) | 主题作者 / Reviewer | 字号 / 对比度 / Voice 覆盖率等"已知技术债"的显式登记 |

## LLM / Agent 集成

项目按"用户意图边界"拆成 3 个工作流 skill + 1 个路由入口；同一份引擎另以 Node 库 / CLI / MCP Server 三种形态分发，schema 同源。

### Skills（挂载到 Claude / Cursor / 其它 Agent）

| 文档 | 面向 | 何时使用 |
| --- | --- | --- |
| [../skills/wechat-typeset/SKILL.md](../skills/wechat-typeset/SKILL.md) | 不确定走哪条线时的路由入口 | 用户笼统说"想发到公众号"，由本 skill 判断分发 |
| [../skills/wechat-typeset-author-persona/SKILL.md](../skills/wechat-typeset-author-persona/SKILL.md) | 主题视觉设计 | 造新主题 / 派生现有主题 / 改色板与 motif |
| [../skills/wechat-typeset-annotate-markdown/SKILL.md](../skills/wechat-typeset-annotate-markdown/SKILL.md) | 写作契约改写 | 普通 markdown → 满足契约的 markdown（含 `:::` 容器） |
| [../skills/wechat-typeset-export-richtext/SKILL.md](../skills/wechat-typeset-export-richtext/SKILL.md) | 渲染 / 导出 / 复制 | 契约 md → 可粘贴公众号的富文本 HTML |
| [../skills/_shared/references/](../skills/_shared/references/) | 给 LLM 读的共享参考 | `hard-rules.md` / `motif-ast.md` / `personas.md` / `container-vocabulary.md` / `cli-contract.md` |

### 包级入口（与 skill 同源，可独立挂载）

| 入口 | 命令 / 引用 | 用途 |
| --- | --- | --- |
| `@wechat-typeset/cli` | `pnpm cli -- <subcommand>` / `npx -p @wechat-typeset/cli wechat-typeset describe` | 自描述命令行；JSON in / JSON out |
| `@wechat-typeset/mcp` | `npx -p @wechat-typeset/mcp wechat-typeset-mcp` | MCP Server，CLI 命令同源暴露为 MCP 工具 |
| `wechat-typeset`（库） | `import { render } from 'wechat-typeset'` | Node-safe 公共 API；Vite / Bun / Node 同构 |
| `dist/api/capabilities.json` | jsDelivr 钉版本订阅 | 机器可读公共契约（personas / containers / variants / 硬约束 / 错误码 / CLI） |

CLI 子命令签名 / 退出码 / JSON 形状的单一真源：[../skills/_shared/references/cli-contract.md](../skills/_shared/references/cli-contract.md)（含 `mcp.json` 配置示例）。
公共 API 的符号清单与 `render()` 三选一入参说明在 [theme-authoring.md · 公共 API](theme-authoring.md#公共-api给外部集成方)。

### `capabilities.json` 公共契约订阅

外部工具链通过订阅 `capabilities.json` 获悉当前支持的主题、容器、变体、平台与硬约束。本契约保持向后兼容：minor 仅增字段；移除项先经一个 minor 窗口的 `deprecations[]` 登记。演进规则见 [../CONTRIBUTING.md](../CONTRIBUTING.md)，diff 工具见 [../scripts/capabilities-diff.ts](../scripts/capabilities-diff.ts)。

订阅 URL（jsDelivr CDN，免鉴权、CORS 友好）：

- **追主分支** — `https://cdn.jsdelivr.net/gh/lync-cyber/wechat-typeset@main/dist/api/capabilities.json`
  jsDelivr 主分支缓存 12 h，发布后自然刷新；适合开发期工具链。
- **钉版本** — `https://cdn.jsdelivr.net/gh/lync-cyber/wechat-typeset@v{x.y.z}/dist/api/capabilities.json`
  钉到 git tag，永远不变；适合生产消费方。

`selfUri` / `versionedSelfUri` 字段同样写在 JSON 内部，下游拿到内容即可知自己来自哪里。`fallbackBehavior` 是降级合同的机器可读副本，详见 [contract/fallback.md](contract/fallback.md)。`compatibility.minToolVersion` / `errorCodes` / `cli.commands` 三段位让工具集成可以从一份 JSON 完成版本桥接、错误分支与命令注册。

## 镜像部署

四个入口同构于 main 分支，差别只在部署目标：

- **GitHub Pages** — `.github/workflows/deploy-pages.yml`，`VITE_BASE=/wechat-typeset/`
- **jsDelivr CDN** — `.github/workflows/deploy-jsdelivr.yml` 把产物推到 `jsdelivr-cdn` 分支；jsDelivr 自动从该 ref 分发，`VITE_BASE` 为绝对 URL；floating branch 缓存 12 h，workflow 末端 purge `index.html` 触发立即刷新
- **Cloudflare Pages / Netlify** — 在各自控制台一键连接仓库即可：CF 选 framework preset `Vite`（无需额外配置）；Netlify 自动读取仓库根的 `netlify.toml`

想自建镜像？把 `dist/` 上传任意静态主机。`VITE_BASE` 默认 `/`，部署到子路径时设为 `/subpath/`，部署到异域 CDN 时设为完整绝对 URL。

## 维护者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [release-checklist.md](release-checklist.md) | 发版前跑 QA 的人 | 自动化测试以外的端到端视觉验收清单 |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | 提 PR 的贡献者 | 本地命令、自检清单、capabilities 演进纪律、不可破坏的硬约束 |

## generated/（不要手改）

- `generated/personas-gallery.html` —— 全主题样例文章画廊（手工维护）
- `generated/personas-spec-gallery.html` —— spec 级字段画廊，方便对照调色（`pnpm gen:gallery` 产出）
- `generated/tokens-spec.html` —— 编辑器外壳 token 的可视化规范页
- `generated/showcase/<id>.html` —— 单主题 7 区块审稿页（`pnpm gen:showcase` 产出，PR 必过）
