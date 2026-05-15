# wechat-typeset · 文档索引

项目文档按"用途"分三层：使用者查语法、主题作者查 spec 合同、维护者查验收清单。
`design/personas/` 下是各套人格的**设计笔记**（色板为什么这样定、拒绝了哪些参照），
属于 spec 作者的工作稿，不是读者手册。

## 使用者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [../README.md](../README.md) | GitHub 访客 | 这个工具是什么，30 秒决策 |
| [contract/README.md](contract/README.md) | 作者（写 Markdown） | 写作契约总纲：三层模型、子文档导航、阅读路线 |
| [contract/syntax.md](contract/syntax.md) | 作者（写 Markdown） | 容器 fence 通用语法、5 个行内扩展、常见错误 |
| [contract/base.md](contract/base.md) | 作者（写 Markdown） | 基础契约的通用容器全集，含速查表与分组示例 |
| [contract/packs/data-brief.md](contract/packs/data-brief.md) | 写数据简报 / 栏目化深度文的作者 | data-brief 扩展包的签名容器全集 |
| [contract/custom.md](contract/custom.md) | fork / 集成方 | 在本地追加私有容器的四步流程 |
| [contract/platform.md](contract/platform.md) | 任何发文的人 | 公众号外链白名单、footer-cta href、契约演进规则 |

## 主题作者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [theme-authoring.md](theme-authoring.md) | 新增 / fork 主题的作者 | `PersonaSpec` 合同、校验器、公共 API |
| [design/personas/](design/personas/) | 想理解既有人格的读者 | 各套主题的设计决策笔记（色板理由 / 拒绝坐标 / 签名动作） |

## LLM / Agent 集成

挂 skill 的 Agent 维护者：项目按"用户意图边界"拆成 3 个 skill + 1 个轻量调度入口，详见各 SKILL.md 顶部 description：

| 文档 | 面向 | 何时使用 |
| --- | --- | --- |
| [../skills/wechat-typeset/SKILL.md](../skills/wechat-typeset/SKILL.md) | 不确定走哪条线时的路由入口 | 用户笼统说"想发到公众号"，由本 skill 判断分发 |
| [../skills/wechat-typeset-author-persona/SKILL.md](../skills/wechat-typeset-author-persona/SKILL.md) | 主题视觉设计 | 造新主题 / 派生现有主题 / 改色板与 motif |
| [../skills/wechat-typeset-annotate-markdown/SKILL.md](../skills/wechat-typeset-annotate-markdown/SKILL.md) | 写作契约改写 | 普通 markdown → 满足契约的 markdown（含 `:::` 容器） |
| [../skills/wechat-typeset-export-richtext/SKILL.md](../skills/wechat-typeset-export-richtext/SKILL.md) | 渲染 / 导出 / 复制 | 契约 md → 可粘贴公众号的富文本 HTML |
| [../skills/_shared/references/](../skills/_shared/references/) | 给 LLM 读的共享参考 | `hard-rules.md` / `motif-ast.md` / `personas.md` / `container-vocabulary.md` / `cli-contract.md` |

## 维护者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [release-checklist.md](release-checklist.md) | 发版前跑 QA 的人 | 自动化测试以外的端到端视觉验收清单 |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | 提 PR 的贡献者 | 本地命令、自检清单、不可破坏的硬约束 |

## generated/（不要手改）

- `generated/personas-gallery.html` —— 全主题样例文章画廊（手工维护）
- `generated/personas-spec-gallery.html` —— spec 级字段画廊，方便对照调色（`npm run gen:gallery` 产出）
- `generated/tokens-spec.html` —— 编辑器外壳 token 的可视化规范页
