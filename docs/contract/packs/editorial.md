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
| 内容 | `qa-block` | ★ | 读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。 |
|  | `pull-quote` | ★ | 拉引：正文中段把作者已写过的句子放大重申。info 为引用文字，body 可选为署名 / 上下文。与 quote-card 正交（quote-card 是引用他人外部话语）。 |
|  | `dialogue` | ★ | 多轮访谈 / 对谈。与 qa-block 正交：qa-block 是单 Q + 单 A 签名格式，dialogue 承载 ≥2 轮 Q&A 或多人对谈。外层 4 冒号，内部 dialogue-turn 列单轮。 |
| 导航 | `toc` | ★ | 目录：默认单列（kicker 顶 + items 下）；声明 layout=split 切到双栏（左 INDEX kicker + meta 描述 / 右 toc-items）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker。 |
|  | `toc-item` |  | toc 内单条；info 为条目标题。body 内容会被忽略。 |
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

## 读者问答（qa-block）

```
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力。从睡前 15 分钟开始，两周可回升至 22 分钟（样本内中位数）。
:::
```

- `info` 是 kicker（如 `读者问答 · Q&A`，可空——某些 variant 设计上不渲染 kicker）；`q` attr 是问题文本；body 是回答（支持完整 Markdown）。

### 与 `dialogue` 容器的边界（出错频繁的地方）

`qa-block` 与 `dialogue.qa-rows` **不可互换**。判断标准：

| 维度 | `qa-block` | `dialogue` |
| --- | --- | --- |
| 轮次 | **单 Q + 单 A**（FAQ 范式） | **≥ 2 轮**（访谈 / 对谈整理稿） |
| 数据形式 | `q` 写在 attrs（单值），body 是 A | 每轮一个 `dialogue-turn` 子容器，`name` / `role` 是 attrs |
| 视觉 | 单条问答卡片（8 variant 各异） | 多段对话流（5 variant 各异） |
| 语义 | 编辑部主动设问 → 一次性回答 | 真实双向交谈 / 多人对谈 |

混用判定：1 次问答 → 用 `qa-block`；3 轮以上对答 → 用 `dialogue`；恰好 2 轮 → 看语义（编辑设问 = qa-block 的"问 + 答"切两轮过于堆叠；真实双向 = dialogue）。

### 8 个 variant

主题级默认骨架由 `theme.variants.qaBlock` 声明；作者侧用 `variant=<id>` 单稿覆盖。

| id | 骨架 | 默认采用主题 | 适用场景 |
| --- | --- | --- | --- |
| `numbered-faq` | Q.NN 序号 + 加粗设问 + 底线分隔 + 下方答复段 | data-brief / commerce-pulse / late-night-vinyl / official-gazette / edu-classroom 等 15 主题 | FAQ 体例：逐条编号 Q + 解释 A，最通用 |
| `hanging-qa` | 32px 左列大号斜体 Q./A. + 右列设问/回答（A 顶 1px 分隔） | editorial-mook | 杂志拉引体：编辑部读者通信，正式而克制 |
| `seal-stamp` | 26×26 实心 + 描边 朱印徽章承载 CJK "问/答" | （experimental，待文言主题采用） | 宋本批注 / 古籍语境：问答以朱印呈现 |
| `query-annotation` | 设问行夹在上下两条 1px 线之间 + 註 hanging 缩进 | （experimental） | 文言批注体：设问 + 注释式回答 |
| `sample-query` | 左 54px QUERY / FINDING 双栏 + N°/obs 编号 | （experimental，待博物笔记主题采用） | 田野调查 / 标本采样：编号化设问 + 发现 |
| `field-card` | 1px 实色外框 + Q/A kicker + dashed 行间分隔 + Card NN 编号 | （experimental） | 博物笔记 / 卡片记录：田野卡片孔位感 |
| `circle-square` | 24×24 圆环 Q + 实心方 A 几何徽章 | youth-zine | 包豪斯 zine：粉丝问答的几何对照 |
| `typed-block` | 1px 外框 + 黑底反白 Q 段 + 白底 A 段（双段叠层） | swiss-grid / brutalist | Neue Grafik / 终端 typed block：强反差对照 |

作者侧切骨架示例：

```
::: qa-block 读者问答 · Q&A variant=hanging-qa q="我需要先具备写作基础才能加入这个写作社群？"
不需要。我们更欢迎尚未形成"写作惯性"的初学者。
:::
```

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
