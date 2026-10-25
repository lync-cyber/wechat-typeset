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

- **name**：容器 id（kebab-case），决定走哪个渲染器。完整可用名单见 [base.md · 速查表](base.md#速查表)、[editorial · 速查表](packs/editorial.md#速查表) 与 [data-viz · 速查表](packs/data-viz.md#速查表)。
- **标题**：从 `name` 后的文字中提取所有 `key=value` 属性，剩余文字合并空白后成为 `info.title`。属性可放在标题前后；例如 `::: tip 重要 variant=pill-tag` 与 `::: tip variant=pill-tag 重要` 等效。各容器按需使用标题。
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

闭合行只写冒号，数量至少与对应开启行相同；闭合行不带容器名。嵌套时内层闭合行的冒号应少于外层，避免提前关闭外层。
本契约建议外层 `::::` 的容器有 `compare` / `toc` / `timeline` / `kpi-dashboard` / `bar-chart` / `table-card` / `gallery` / `dialogue`——见各容器自己的小节示例。

---

## Frontmatter（页面局部配置 · L2）

markdown 文件首部允许声明一段 YAML 子集 frontmatter，作为**页面级**配置，介于"逐处 attrs 覆盖"与"主题默认骨架"之间生效。所有字段**均可缺省**。

```markdown
---
theme: swiss-grid           # 页面级主题切换（可选），覆盖 render() 入参 persona/theme/spec
variants:                   # 页面级 variant 覆盖（可选），按 slot 部分指定即可
  admonition: terminal
  quote: tilted-sticker
  steps: ribbon-chain
---

# 正文从这里开始……
```

**优先级链（L1 高 → L4 低）**：

1. **L1** · 逐处 attrs 覆盖：`::: tip variant=pill-tag 重要`
2. **L2** · 本节 frontmatter `variants:` 字段（本页全局，覆盖主题默认）
3. **L3** · 主题映射表 `theme.variants[slot]`
4. **L4** · 系统默认 `DEFAULT_VARIANTS`

合法 variant id 见下方 [variant 覆盖](#variant-覆盖) 段。frontmatter 里写了**非法 variant id** 会被静默忽略并回退到 L3/L4（不塌版）；非法 `theme:` 同样回退到入参主题。集成方可读 `RenderOutput.frontmatterIssues` 拿到告警明细。

---

## variant 覆盖

主题在 spec 里为各个 variant 类目挑选**默认骨架**。如果某一处想要不同骨架，可在 fence 的 attrs 里覆盖。容器是否支持切换及对应类目见 `getVariantsForContainer(name)`；完整类目和 id 见 `getVariantIds()`。两种语法形式：

**支持 variant 的容器 fence**写在 open 行的 attrs 里：

```
::: tip variant=pill-tag 重要
这一处我就是要 pill tag 的视觉
:::
```

**代码块 fence**（codeBlock）写在 ` ``` ` 之后的 info 行末尾，与语言 token 用空格分隔：

````
```typescript variant=header-bar
interface User { id: string; name: string }
const u: User = { id: 'u1', name: 'Ada' }
```
````

合法 variant id 列表由 `getVariantIds()` 公共 API 返回。常用值：

| 类目 | 可选 variant |
| --- | --- |
| `admonition` | `accent-bar` · `pill-tag` · `ticket-notch` · `card-shadow` · `minimal-underline` · `terminal` · ... |
| `quote` | `classic` · `magazine-dropcap` · `column-rule` · `frame-brackets` |
| `compare` | `column-card` · `stacked-row` · `ledger` · `data-card` |
| `steps` | `number-circle` · `ribbon-chain` · `timeline-dot` |
| `divider` | `wave` · `dots` · `flower` · `rule` · `glyph` |
| `sectionTitle` | `bordered` · `cornered` |
| `note` | `minimal-callout` · `box-callout` · `side-bar` · `editorial-stripe` · `research-dense` · ... |
| `recommend` | `card-list` · `academic-refs` |
| `qrcode` | `bare` · `follow-card` |
| `footerCTA` | `button-led` · `triptych-actions` |
| `footnotes` | `lined` · `inline-flow` |
| `codeBlock` | `bare` · `header-bar` |

> **渲染**：不在合法 id 列表内的 variant 值会被静默忽略，回退到主题默认骨架——换主题不塌版。
>
> **保存为「我的组件」**：含 `variant=野id` 的片段在保存时会被组件库拒绝，并列出未注册的 `<container> → <id>`。不影响渲染，只影响能否落库。

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
