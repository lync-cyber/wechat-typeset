# skills/_shared

> 三个 skill 共享的 references 权威源。**不是一个独立的 skill。**

`_` 前缀表示这是 skill 系统的内部目录，不会被 LLM 当 skill 加载。

## 引用方式（markdown 软链）

三个 skill（`wechat-typeset-author-persona` / `wechat-typeset-annotate-markdown` / `wechat-typeset-export-richtext`）通过 markdown 相对路径直接引用本目录下的文件，**零副本、零同步脚本、跨平台不依赖文件系统软链**：

```markdown
[硬约束清单](../_shared/references/hard-rules.md)
```

改 `_shared/references/*.md` 即对所有订阅的 skill 同时生效。

## 当前共享文件与订阅表

| 文件 | 被哪些 skill 引用 | 来源 |
| --- | --- | --- |
| `references/hard-rules.md` | author-persona / annotate-markdown / export-richtext / wechat-typeset（路由） | 手写 + Variants 段由 `npm run build:skill-refs` 派生 |
| `references/motif-ast.md` | author-persona / annotate-markdown | 手写 |
| `references/personas.md` | author-persona / annotate-markdown / export-richtext / wechat-typeset（路由） | 主要由 `npm run build:skill-refs` 从 `listPersonas()` 派生；决策树手写 |
| `references/container-vocabulary.md` | annotate-markdown / export-richtext / wechat-typeset（路由） | 手写（与 `src/core/vocabulary` 对齐） |
| `references/cli-contract.md` | annotate-markdown / export-richtext / author-persona / wechat-typeset（路由） | 手写（脚本签名 / 退出码 / JSON / lint issue 表的单一真源） |

## 新增共享 reference 的流程

1. 在 `references/` 下新建 `<name>.md`
2. 在需要引用它的 skill 的 SKILL.md "相关参考"段加 `[../_shared/references/<name>.md](../_shared/references/<name>.md)`
3. 更新本 README 的订阅表

## 为什么不用文件系统软链

Windows 上 `mklink` 默认需要管理员权限或开发者模式；git 默认不保留软链；跨平台 CI 容易踩坑。
Markdown 相对路径在所有 markdown viewer / agent 工具下表现一致，是更稳健的"软链"形式。
