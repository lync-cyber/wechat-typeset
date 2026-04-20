# 容器扩展语法

基于 [markdown-it-container](https://github.com/markdown-it/markdown-it-container) 扩展。
每种容器是公众号高频视觉元素——作者写 fence，渲染器吐出经过主题加工、符合微信粘贴约束的 `<section>`。**避免作者手写 HTML。**

---

## 通用语法

```
::: name 标题文字 key=value key2="带空格的值"
任意 Markdown 正文
:::
```

- **name**：容器 id（kebab-case），决定走哪个渲染器
- **标题**：`name` 之后、首个 `key=` 之前的空格分隔串被收为 `info.title`；各容器按需使用（`author` 当作者名、`tip/warning/...` 当醒目标题、`intro/cover` 当标题行）
- **键值对**：`key=value` 或 `key="v with space"`，**仅在 open 行生效**。渲染器从 `ctx.attrs.key` 读取。正文里写 `key: v`（YAML 风格）会被当作普通段落
- **正文**：两行 fence 之间的内容仍是完整 Markdown（含列表、图片、强调、行内扩展）

### 嵌套

不同长度的冒号标记区分嵌套层级——**外层严格多于内层**即可。常用外 4 内 3：

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

---

## 速查表

22 个容器按用途分 6 组。带 ★ 是 spec 登记的**签名容器**（主题可在 `signatureContainers` 里声明）。

| 组 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |
| 文章结构 | `intro` | ★ | 导语块（浅色背景 + 小字号） |
| | `cover` | ★ | 封面卡（标题 + 图片 + 描述） |
| | `author` | ★ | 作者栏（姓名 + role + 发布日期） |
| | `section-title` | ★ | 章节大标题（带装饰 SVG） |
| | `abstract` | ★ | 摘要 / TL;DR 段（学术家族常用） |
| 提示 (admonition) | `tip` | ★ | 正向提示 |
| | `warning` | ★ | 风险提示 |
| | `info` | ★ | 补充说明 |
| | `danger` | ★ | 严重警告 |
| | `note` | ★ | 脚注 / 补注（第五态，中性） |
| 金句与强调 | `quote-card` | ★ | 大字号金句卡，带装饰引号 |
| | `highlight` | ★ | 整段高亮背景的重点段 |
| | `key-number` | ★ | 数据卡（巨号数字 + 注释） |
| 对比与列表 | `compare` | ★ | 对比容器（外层）—— 内嵌 `pros` / `cons` |
| | `pros` | | `compare` 内的正面列 |
| | `cons` | | `compare` 内的反面列 |
| | `steps` | ★ | 步骤卡（有序列表 + 序号徽章） |
| 装饰 | `divider` | | 分隔线（variant = wave / dots / flower / line / glyph） |
| 文末引导 | `footer-cta` | ★ | 文末召唤卡（引导关注 / 阅读） |
| | `recommend` | ★ | 推荐阅读列表 |
| | `qrcode` | ★ | 二维码图片卡 |
| | `see-also` | ★ | "相关阅读"链接条（学术 / 观察家族用） |
| 媒体 | `mpvoice` | ★ | 微信语音占位（粘贴无法保留原件） |
| | `mpvideo` | ★ | 腾讯视频 `qqvid=` 或微信视频占位 |
| 兜底 | `free` | | 不施加主题样式的自由容器（escape hatch） |

> 非签名容器 `pros` / `cons` / `divider` / `free` 是**结构位**，不参与主题人格签名。
> `signatureContainers` 的合法 id 清单：`getSupportedSignatureContainers()`。

---

## 文章结构类

```
::: intro
文章导语。独立视觉样式——浅色背景、左侧色条、小字号，
用来把"文章要讲什么"钉在最顶。
:::

::: cover 本期封面
![封面图](https://placehold.co/1200x630)

_一句图注_
:::

::: author 张三 role=主笔
发表于 2026-04-18

一句简短的作者话
:::

::: section-title 第一章
章节大标题，带主题装饰 SVG
:::

::: abstract
TL;DR · 一段 80–160 字的摘要。学术 / 行业观察家族推荐在正文前挂一段，
给读者"是否继续读下去"的决策材料。
:::
```

---

## 提示类（admonition）

四（五）态分别渲染不同标签与形状。**形状冗余**是色盲友好设计——不仅靠颜色区分。

```
::: tip 小贴士
提示内容
:::

::: warning 注意
风险提示
:::

::: info 补充
补充说明
:::

::: danger 警告
严重警告
:::

::: note 脚注
中性补注——不是提示也不是警告，放"参考资料 / 版本说明"这类场景
:::
```

**覆盖默认 variant**——主题在 spec 里挑了 `accent-bar`，某处想要 `pill-tag`：

```
::: tip variant=pill-tag 重要
这一处我就是要 pill tag 的视觉
:::
```

合法 `variant` 值：`accent-bar` / `pill-tag` / `ticket-notch` / `card-shadow` / `minimal-underline` / `terminal`。

---

## 金句与强调

```
::: quote-card
这是一句金句，大字号居中，主题装饰引号 SVG。
—— 作者
:::

::: highlight
重点段落，整段高亮背景——用于"本文核心论点"这类锚点。
:::

::: key-number value=87% label=留存率
数据卡：巨号数字 + 标签 + 注释。
:::
```

`quote-card` 的 variant：`serif-mark` / `left-rule` / `pullquote-card`——后者是 `people-story` 的巨号 serif 引号签名动作。

---

## 对比与列表

```
:::: compare
::: pros 优点
- 优点 1
- 优点 2
:::
::: cons 缺点
- 缺点 1
- 缺点 2
:::
::::

::: steps
1. 第一步
2. 第二步
3. 第三步
:::
```

- `compare` 的 variant：`two-column`（默认）/ `ledger`（账本感，`business-finance` 签名）/ `matrix`（多列矩阵，`industry-observer` 用）
- `steps` 的 variant：`numbered-badge`（默认）/ `vertical-rule` / `terminal-prompt`

---

## 章节装饰

```
::: divider variant=flower
:::
```

`variant` 可选：`line`（默认）/ `wave` / `dots` / `flower` / `glyph`。视觉 SVG 来自 `theme.motifs.divider{Wave,Dots,Flower}`；主题未声明则回退到内置简版。

`glyph` 是唯一允许 Unicode 当装饰的位置——`::: divider variant=glyph glyph=§` 之类，需主动开启。

---

## 文末引导

```
::: footer-cta 觉得有用？ cta=关注我
一句引导文案
:::

::: recommend 推荐阅读
- [文章 A](https://...)
- [文章 B](https://...)
:::

::: qrcode 扫码关注
![二维码](https://...)
:::

::: see-also
- [相关资料 A](https://...)
- [相关资料 B](https://...)
:::
```

---

## 媒体（公众号官方元素的占位）

```
::: mpvoice 标题占位
微信 <mpvoice> 只能在公众号后台从素材库插入，粘贴富文本无法保留；
此容器渲染为占位提示卡。
:::

::: mpvideo vid=wxv_xxx
官方视频同上；vid= 参数仅作提示。
:::

::: mpvideo qqvid=v326875u4ek
腾讯视频：直接渲染 v.qq.com iframe。
:::
```

---

## 兜底：`free`

```
::: free
刻意不施加主题样式——边距与正文段落对齐，无边框、无底色。
用来装"编辑部补注 / 致谢列表"这类不归类内容。
:::
```

写进 `free` 意味着**放弃**人格签名——主题作者也不应在自己的 spec 里给 `free` 加 CSS。

---

## 内联扩展

| 语法 | 效果 |
| --- | --- |
| `==高亮文字==` | 荧光笔（markdown-it-mark） |
| `~~删除线~~` | GFM 原生 |
| `++插入++` | markdown-it-ins |
| `[.着重.]` | 着重号（中文排版传统） |
| `[~波浪~]` | 波浪下划线 |

---

## 常见错误

| 症状 | 原因 |
| --- | --- |
| `::: tip key: value` 被当正文 | 键值对必须写在 open 行，不是 YAML 风格 |
| 嵌套容器没生效 | 外层冒号数没严格大于内层（`::: compare` 包 `::: pros` 会冲突） |
| `::: free` 里样式"失灵" | `free` 定位就是"不施加样式"，需要装饰请换具名容器 |
| `variant=xxx` 被忽略 | 该容器不支持 variant 覆盖，或 `xxx` 不在合法 id 列表内 |
| SVG 在公众号白底发灰 | 主题用了纯白 `#ffffff`——换 `#fefefe` |
