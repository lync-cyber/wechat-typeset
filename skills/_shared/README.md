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

| 文件 | 被哪些 skill 引用 |
| --- | --- |
| `references/hard-rules.md` | author-persona / annotate-markdown / export-richtext |
| `references/motif-ast.md` | author-persona / annotate-markdown |
| `references/personas.md` | author-persona / annotate-markdown |
| `references/container-vocabulary.md` | annotate-markdown / export-richtext |

## 新增共享 reference 的流程

1. 在 `references/` 下新建 `<name>.md`
2. 在需要引用它的 skill 的 SKILL.md "相关参考"段加 `[../_shared/references/<name>.md](../_shared/references/<name>.md)`
3. 更新本 README 的订阅表

## 为什么不用文件系统软链

Windows 上 `mklink` 默认需要管理员权限或开发者模式；git 默认不保留软链；跨平台 CI 容易踩坑。
Markdown 相对路径在所有 markdown viewer / agent 工具下表现一致，是更稳健的"软链"形式。
