# 作者契约

> **承诺**：作者写进本契约内的 Markdown，在 9 套主题间切换**不塌版**、复制到公众号**不丢样**。超出契约的写法（手写 HTML、class、style）不在保护范围内。

## 作者 API 全集

1. **25 个容器 fence**（`::: 名字 …`），完整清单见 [container-syntax.md](container-syntax.md) 速查表。其中 23 个可作顶层，`pros` / `cons` 必须嵌在 `:::: compare` 内。
2. **5 个行内扩展**：`==高亮==` / `~~删除~~` / `++插入++` / `[.着重.]` / `[~波浪~]`。
3. 全部 [CommonMark + GFM](https://github.github.com/gfm/) 的标准 Markdown 语法（标题、列表、代码块、表格、图片、链接……）。

**除此之外，不再有隐藏语法。** 作者不需要为"换主题"做任何二次修改。

## 主题的能力与边界

主题作者通过 [persona.spec.ts](../src/themes/) 声明调色板、排版、装饰与 variant 选择。**硬约束**（`src/pipeline/rules.ts` / `src/themes/_shared/spec/validate.ts`）：

- 字号 ≥ 14、SVG stroke-width ≥ 1、fill 纯白 `#ffffff` 统一换 `#fefefe`
- 禁用 `position` / `float` / `font-family` / `@media`
- 禁止扩展 fence 词汇表——新视觉一律注册为 variant，不得新增容器名
- 禁止在 `spec.elements` / `motifs` 之外写自定义 HTML

任意条破坏在构建期即 `ThemeAuthoringError`，不会进入运行时。

## 作者粘贴到公众号后有 bug，谁负责

- **塌版 / 丢样**：wechat-typeset 的 bug（`wxPatch` 层未覆盖到的平台行为），请开 [issue](https://github.com/lync-cyber/wechat-typeset/issues)。
- **自己写 HTML 塌了**：退出契约，自行承担——`::: free` 之外不要手写 HTML。
- **粘贴后需要补公众号原生节点**（`mpvoice` / `mpvideo` / 原创声明 / 封面图）：这是公众号后台功能，契约外，但 `::: mpvoice` / `::: mpvideo` 容器提供了占位锚点。

## 契约演进

字段变更走 [`dist/api/capabilities.json`](../dist/api/capabilities.json) 的 `schemaVersion` + `deprecations[]`：破坏性变更前先登记 deprecation，给下游（如 LLM 集成、第三方 CI）一个 minor 版本的感知窗口。
