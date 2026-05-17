# `editorial` 扩展包（领域：刊物 / 出版 / 栏目化深度文）

[← 回 README](../README.md) · [基础契约](../base.md) · [data-brief 主题专属](data-brief.md) · [自定义扩展](../custom.md)

为**刊物排版 / 栏目化深度文 / newsletter / Q&A 杂志**设计的领域扩展包——刊头、目录、问答、脚注、CTA、订阅卡、编辑部注、收束栏等容器全集。
本包是**领域扩展**，多主题可借用（不绑定单一主题）。气质参照：晚点 LatePost · 财新数据 · 机器之心 · Morning Brew · POPEYE / BRUTUS。

## 何时用本扩展包

- 写**栏目化的刊物体**（深度专题、newsletter、调研报告、读者来信）
- 主题选了 data-brief / industry-observer / brutalist / swiss-grid / late-night-vinyl 等"刊物化"人格
- 想要**克制气质**（不是公众号家常的彩色卡片）

> **可移植性**：本包容器在任何主题里**语法都合法**，但只有"承诺渲染本包"的主题才会给出签名视觉。
> 其他主题里它会回退到中性兜底样式——**不塌版、不丢内容，但少签名感**。
> 谁承诺了：在 `src/themes/<slug>/persona.data.ts` 的 `signatureContainers` 字段里登记本包的容器 styleKey。

## 速查表

<!-- generated:container-quick-ref:pack:editorial:start -->

为刊物 / 栏目化深度文 / newsletter 设计的领域容器集（多主题可借用）。在未声明 signatureContainers 的主题里语法仍合法，但会回退到中性兜底样式（不塌版，少签名）。带 ★ 是可登记的**签名容器**。

| 类 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |
| 结构 | `masthead` | ★ | 刊头：默认两栏（刊名左 + 期号·日期 monospace 右）；声明 attrs.kicker 切三栏 ribbon。 |
|  | `section-tag` | ★ | 小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。body 内容会被忽略。 |
|  | `byline` | ★ | 署名条：N 栏分隔（kicker 小字 / value 主视），data-brief 家族签名。与 author 容器正交：author 是"作者名 + role"两段签名块；byline 是"AUTHOR / EDITOR / SET" 多栏 newspaper 形态。 |
|  | `editorial-header` | ★ | 装饰性副刊头：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。与微信原生标题（H1）正交，本容器输出 <section>，不抢平台 H1 语义。data-brief 家族签名。 |
| 提示 | `callout-group` | ★ | 四态 callout 联表：外框承担"上/下/左/右 hairline"，子项 (tip/warning/info/danger) 在内串联。设计稿 multi-callout 母本——配合 admonition variant=news-row 用最佳。外层用 4 个冒号。 |
| 内容 | `qa-block` | ★ | 读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。 |
| 导航 | `toc` | ★ | 目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。 |
|  | `toc-item` |  | toc 内单条；info 为条目标题。body 内容会被忽略。 |
|  | `cta-bar` | ★ | CTA 三栏：左/右描边格 + 中实色格。data-brief 签名（赞同 / 收藏 / 转发）。body 忽略。 |
|  | `qr-follow` | ★ | 二维码订阅卡：左 60×60 QR + 右 SUBSCRIBE/标题/说明三行。info 作为主标题。 |
| 签名 | `footnotes` | ★ | 脚注 / 参考文献块。两骨架可选：lined（默认，一条一行 + hanging indent）适合 5~10 条短引用；inline-flow（同段流式排列 + 内滚动）适合 20+ 条长文献列表，作者用 `·` / `／` 分隔条目。info 非空时渲染主色 kicker（如 "NOTES" / "参考文献"），与 editor-note / qa-block 同源。 |
|  | `colophon` | ★ | 刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。 |

> 由 `npm run build:writer-docs` 从 `src/containers/vocabulary.ts` 生成，请勿手改。新增容器先改 vocabulary（含 `pack` 字段），需要划入扩展包就声明 `pack: '<id>'`。

<!-- generated:container-quick-ref:pack:editorial:end -->

---

## 刊物气质三件套

```
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

::: section-tag 深度
:::

::: cover 在无人深夜，重新学习如何阅读一本书
算法时代的注意力账簿，正在失去一笔隐形支出：连续时间。
:::
```

- `masthead`：刊名（info）左对齐 + 期号·日期 monospace 右对齐 + 下划线。`issue` / `date` / `kind` 都是 attrs。
- `section-tag`：黑底白字小胶囊（栏目标签，如「深度」「数据」），info 即标签文字。
- `cover` 在基础契约里已存在，但 editorial 家族主题会把它渲染得更刊物化（题图被替换为粗排印题头）。

---

## 三栏目录

```
:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::: toc-item no="02" page="p.08" 慢读的三种练习
:::
::: toc-item no="03" page="p.14" 夜晚作为最后的阅读时区
:::
::: toc-item no="附" page="p.18" 数据说明 · Q&A · 方法论
:::
::::
```

- 外层 4 个冒号 `::::`，内部 `toc-item` 用 3 个 `:::`。
- `toc` 的 `info` 是 kicker（如 `目录 · CONTENTS`）。
- `toc-item` 的 `info` 是条目标题，body 内容被忽略；`no` / `page` 都是 monospace 小字。

---

## 读者问答

```
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力。从睡前 15 分钟开始，两周可回升至 22 分钟（样本内中位数）。
:::
```

- `info` 是 kicker（如 `读者问答 · Q&A`）；`q` attr 是问题文本（主色 Q 方块头像 + 单行）；body 是回答（支持完整 Markdown）。

---

## 四态 callout 联表

```
:::: callout-group
::: info INFO variant=news-row
说明一。
:::
::: tip TIP variant=news-row
小贴士。
:::
::::
```

外框承担"上/下/左/右 hairline"，子项 (tip/warning/info/danger) 在内串联。**设计稿 multi-callout 母本**——配合 admonition `variant=news-row` 用最佳。外层 4 个冒号。

---

## 脚注块 / 参考文献

`footnotes` 一个容器、两套骨架，按"条目数 × 字数"选 variant：

```
::: footnotes
[1] 数据覆盖 2010–2025，以两年为滑动窗口平滑处理。
[2] "深度理解得分"取自阅读后 24h 回忆测试，满分 100。
:::

::: footnotes variant=inline-flow 参 考 文 献
[1] 全国国民阅读调查 2015–2024 · [2] 中国互联网络信息中心 第 53 次报告 · [3] OECD Reading Habits Survey 2023
:::
```

- `variant=lined`（默认）：一条一行 + hanging indent，编号 `[N]` 悬挂在外、正文左缘对齐。适合 ≤ 6 条带说明性文字的脚注。
- `variant=inline-flow`：所有条目同段流式排列，作者用 `·` / `／` 手动分隔条目。同样高度可装 2~3 倍条目，自带 `max-height:320px + overflow-y:auto + -webkit-overflow-scrolling:touch` 内滚动（公众号移动端实测启用触摸滑动，参见 mdnice `.multiquote-1`）；适合 20+ 条纯出处列表。
- `info` 非空时渲染主色 kicker（`参 考 文 献` / `NOTES`），与 `editor-note` / `qa-block` 同源。

---

## 文末三栏 CTA

```
::: cta-bar
:::

::: cta-bar like="♡ 同意" star="★ 收藏" share="↗ 转发"
:::
```

左 / 右描边格 + 中实色格。`body` 忽略；自定义文字走 `like` / `star` / `share` 三个 attr，留空走默认。

---

## 订阅二维码卡

```
::: qr-follow 慢读简报 desc="每周四，一封邮件，一组数据" qr="https://.../qr.png"
:::
```

- 左 60×60 QR + 右三行：`kicker`（默认 SUBSCRIBE）/ 标题（info）/ `desc`。
- `qr` 留空时画占位 SVG，发文前换成实际二维码图片。

---

## 编辑部注 callout

```
::: editor-note 编 者 按
慢读并非复古姿态，而是一种对自己时间主权的重新申明。
:::
```

主色左竖条 + 浅底卡片 + kicker 小标题（info 文字）+ 正文。区别于通用 `note`：`note` 走中性 `textMuted` 调，`editor-note` 是栏目编辑发声块，主色介入。

---

## 方法论小字注释

```
::: methodology 方法论
本文数据为作者自行整理，n=1,024，样本覆盖 18–72 岁都市读者。
:::
```

浅底 + 10px `textMuted` + 粗体标签头（info 文字）。**与 `note` 的差别**：`methodology` 排印更紧密（10px、padding 10/12），用于"调研口径 / 数据说明"这类紧凑脚注；`note` 是叙事性补注，行距更松。

---

## 刊物收束栏（colophon）

```
::: colophon next="纸本之必要：论书脊与手指的记忆" issue="第 004 期 · 2026"
:::
```

文末"下期预告 / 卷·期"双栏 monospace 元数据，上分割线 1px 近黑（强分隔，标记全文结束）。body 忽略；左右两栏分别走 `next` / `issue` 两个 attr。

---

## 副刊头 / 署名条（mook 系签名）

杂志体（POPEYE / BRUTUS / The Gentlewoman 等）常用的两件签名：

```
::: editorial-header 在无人深夜， / 重新学习 / 如何阅读一本书 chip="ESSAY · 01" pp="PP.04–19" subtitle="论慢读在算法时代的价值" topRule="6" titleDot="primary"
:::

::: byline cells="AUTHOR:顾留白 | EDITOR:徐稍后读 | SET:04·2026" monospaceLast="true"
:::
```

- `editorial-header`：跨栏大字标题 + 可选 chip 红章 + PP 页码 + subtitle + titleDot 红点。**与微信原生标题（H1）正交**，本容器输出 `<section>`，不抢平台 H1 语义。
- `byline`：N 栏分隔（kicker 小字 / value 主视）的"AUTHOR / EDITOR / SET" newspaper 形态，与 `author` 容器（单作者名 + role 两段块）正交。

---

## 完整示例

可直接套用的端到端示范：[`src/samples-md/sample-data-brief.md`](../../../src/samples-md/sample-data-brief.md) 同时演示了 editorial 家族容器与 data-brief 主题专属的 KPI/条形图。
