# 通用语法

[← 回 README](README.md)

容器和行内扩展之外的部分，本契约不发明新语法——完整支持 [CommonMark](https://commonmark.org/) 与 [GFM](https://github.github.com/gfm/)（标题、列表、表格、代码块、图片、链接、任务列表、脚注）。
本文档只覆盖**契约自有**的两类扩展：容器 fence 和 5 个行内标记。

---

## 容器 fence 通用形式

```
::: name 标题文字 key=value key2="带空格的值"
任意 Markdown 正文（含列表、图片、强调、行内扩展）
:::
```

- **name**：容器 id（kebab-case），决定走哪个渲染器。完整可用名单见 [base.md · 速查表](base.md#速查表) 与 [packs/data-brief.md · 速查表](packs/data-brief.md#速查表)。
- **标题**：`name` 之后、首个 `key=` 之前的空格分隔串被收为 `info.title`。各容器按需使用（`author` 当作者名、`tip` 当醒目标题、`intro/cover` 当标题行）。
- **键值对**：`key=value` 或 `key="v with space"`，**仅在 open 行生效**。渲染器从 `ctx.attrs.key` 读取。
  - 正文里写 `key: value`（YAML 风格）会被当作普通段落，**不是 attr**。
- **正文**：两行 fence 之间的内容仍是完整 Markdown——可继续嵌套强调、图片、列表、行内扩展。

---

## 嵌套

不同长度的冒号标记区分嵌套层级——**外层严格多于内层**即可。常用「外 4 内 3」：

```
:::: compare
::: pros 优点
- ...
:::
::: cons 缺点
- ...
:::
::::
```

按 markdown-it-container 原生行为，**同名 + 同长度**的 fence 才互相关闭。
本契约里强制外层 `::::` 的容器有 `compare` / `toc` / `kpi-dashboard` / `bar-chart`——见各容器自己的小节示例。

---

## variant 覆盖

主题在 spec 里为每个类目（admonition / quote / compare / steps / divider / sectionTitle / codeBlock）挑了**默认骨架**。如果某一处想要不同骨架，可在 fence 的 attrs 里覆盖：

```
::: tip variant=pill-tag 重要
这一处我就是要 pill tag 的视觉
:::
```

合法 variant id 列表由 `getVariantIds()` 公共 API 返回。常用值：

| 类目 | 可选 variant |
| --- | --- |
| `admonition` | `accent-bar` · `pill-tag` · `ticket-notch` · `card-shadow` · `minimal-underline` · `terminal` · ... |
| `quote` | `classic` · `magazine-dropcap` · `column-rule` · `frame-brackets` |
| `compare` | `column-card` · `stacked-row` · `ledger` · `data-card` |
| `steps` | `number-circle` · `ribbon-chain` · `timeline-dot` |
| `divider` | `wave` · `dots` · `flower` · `rule` · `glyph` |
| `sectionTitle` | `bordered` · `cornered` |

> 不在合法 id 列表内的 variant 值会被静默忽略，回退到主题默认骨架。

---

## 五个行内扩展

| 语法 | 效果 | 实现 |
| --- | --- | --- |
| `==高亮==` | 荧光笔背景 | markdown-it-mark |
| `~~删除~~` | 删除线 | GFM 原生 |
| `++插入++` | 下划线 ins | markdown-it-ins |
| `[.着重.]` | 着重号（中文排版传统，点居字下） | 自定义 inline rule |
| `[~波浪~]` | 波浪下划线 | 自定义 inline rule |

行内扩展可与标准 Markdown 强调（`**粗**` / `*斜*` / `` `code` ``）任意组合。

---

## 常见错误

| 症状 | 原因 |
| --- | --- |
| `::: tip key: value` 被当正文 | 键值对必须写在 open 行末尾，不是 YAML 风格 |
| 嵌套容器没生效 | 外层冒号数没严格大于内层（`::: compare` 包 `::: pros` 会冲突，外层应 `::::`） |
| `::: free` 里"样式失灵" | `free` 定位就是「不施加样式」，需要装饰请换具名容器 |
| `variant=xxx` 被忽略 | 该容器不支持 variant 覆盖，或 `xxx` 不在合法 id 列表内 |
| SVG 在公众号白底发灰 | 主题用了纯白 `#ffffff`——`wxPatch` 会换成 `#fefefe`，本地预览看到的可能与公众号不一致 |
| 未知容器名 | 见 [base.md · 速查表](base.md#速查表) 与 [packs/](packs/) 下各扩展包 |
