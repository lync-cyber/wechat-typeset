# wechat-typeset · 文档索引

项目文档按"用途"分三层：使用者查语法、主题作者查 spec 合同、维护者查验收清单。
`design/personas/` 下是 9 套人格的**设计笔记**（色板为什么这样定、拒绝了哪些参照），
属于 spec 作者的工作稿，不是读者手册。

## 使用者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [../README.md](../README.md) | GitHub 访客 | 这个工具是什么，30 秒决策 |
| [container-syntax.md](container-syntax.md) | 作者（写 Markdown） | 22 种容器的 fence 语法与键值对 |

## 主题作者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [theme-authoring.md](theme-authoring.md) | 新增 / fork 主题的作者 | `PersonaSpec` 合同、校验器、公共 API |
| [design/personas/](design/personas/) | 想理解既有人格的读者 | 9 套主题的设计决策笔记（色板理由 / 拒绝坐标 / 签名动作） |

## LLM / Agent 集成

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [../skills/wechat-typeset/SKILL.md](../skills/wechat-typeset/SKILL.md) | 挂 skill 的 Agent 维护者 | 何时启用、公共 API 速览、与平台约束的对应 |
| [../skills/wechat-typeset/references/](../skills/wechat-typeset/references/) | 给 LLM 读的参考 | `api.md` / `hard-rules.md` / `motif-ast.md` / `personas.md` 四份密度写法 |

## 维护者

| 文档 | 面向 | 回答什么 |
| --- | --- | --- |
| [TESTING.md](TESTING.md) | 发版前跑 QA 的人 | 自动化测试以外的端到端视觉验收清单 |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | 提 PR 的贡献者 | 本地命令、自检清单、不可破坏的硬约束 |

## generated/（不要手改）

- `generated/personas-gallery.html` —— 9 套主题的样例文章画廊（手工维护）
- `generated/personas-spec-gallery.html` —— spec 级字段画廊，方便对照调色（`npm run gen:gallery` 产出）
- `generated/tokens-spec.html` —— 编辑器外壳 token 的可视化规范页
