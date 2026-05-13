# `data-brief` 扩展包

[← 回 README](../README.md) · [基础契约](../base.md) · [自定义扩展](../custom.md)

为**数据简报 / 财经栏目 / 内参版面**设计的签名容器集——刊头、目录、KPI 仪表盘、横向条形图、读者问答、脚注、CTA 三栏、订阅卡。
气质参照：晚点 LatePost · 财新数据 · 机器之心 · Morning Brew。

## 何时用本扩展包

- 文章主体是**数据驱动**（统计 / 调研 / 季度复盘）
- 想要**栏目化**的克制气质（不是公众号家常的彩色卡片）
- 选了 `data-brief` 主题，或类似深度刊（business-finance / industry-observer）

> **可移植性**：本包容器在任何主题里**语法都合法**，但只有"承诺渲染本包"的主题才会给出签名视觉。
> 其他主题里它会回退到中性兜底样式——**不塌版、不丢内容，但少签名感**。
> 谁承诺了：在 `src/themes/<slug>/persona.spec.ts` 的 `signatureContainers` 字段里登记本包的容器 styleKey。

## 速查表

<!-- generated:container-quick-ref:data-brief:start -->

为数据简报 / 财经栏目化版面设计的签名元素。在其他主题里语法仍合法，但会回退到中性兜底样式（不塌版，少签名）。带 ★ 是可登记的**签名容器**。

| 类 | 容器 | ★ | 一句话用途 |
| --- | --- | :-: | --- |
| 结构 | `masthead` | ★ | 刊头：刊名（info）左对齐 + 期号·日期 monospace 右对齐 + 下划线。data-brief 家族签名。 |
|  | `section-tag` | ★ | 小栏目标签（黑底白字胶囊小字，info 为标签文字，如 "深度"）。 |
|  | `toc` | ★ | 目录三栏（序号·标题·页码）。外层用 4 个冒号，内部用 toc-item 列条目。info 为 kicker（如 "目录 · CONTENTS"）。 |
|  | `toc-item` |  | toc 内单条；info 为条目标题。body 内容会被忽略。 |
| 内容 | `qa-block` | ★ | 读者问答：attrs.q 为问题，body 为回答（支持 markdown）。info 为 kicker（如 "读者问答 · Q&A"）。 |
| 签名 | `kpi-dashboard` | ★ | KPI 仪表盘：三指标 grid + sparkline。外层用 4 个冒号，内部用 kpi-item。info 为标题（如 "KEY METRICS · 三项关键指标"）。 |
|  | `kpi-item` |  | kpi-dashboard 内单指标。一切以 attrs 驱动，body 内容被忽略。 |
|  | `bar-chart` | ★ | 横向条形图（纯 div 宽度，无 SVG）。外层用 4 个冒号，内部用 bar 条目。info 为图表标题。 |
|  | `bar` |  | bar-chart 内单条；attrs.label/pct/value 必填，tone 决定柱色（normal 走主色）。 |
|  | `footnotes` | ★ | 脚注块：上分割线 + 小字编号引用。body 通常为 `[1] 文本 / [2] 文本` 或有序列表，渲染器只加外框。 |
|  | `cta-bar` | ★ | CTA 三栏：左/右描边格 + 中实色格。data-brief 签名（赞同 / 收藏 / 转发）。body 忽略。 |
|  | `qr-follow` | ★ | 二维码订阅卡：左 60×60 QR + 右 SUBSCRIBE/标题/说明三行。info 作为主标题。 |
|  | `editor-note` | ★ | 编辑部注：主色左竖条 callout + kicker 小标题 + 正文。data-brief / industry-observer 等深度刊家族常用，区别于中性的 note。 |
|  | `methodology` | ★ | 方法论小字注释：浅底 + 10px textMuted + 粗体标签头。调研类主题的脚注本，与中性 note 的区别在排印密度（更紧、更小、更"说明栏"）。 |
|  | `colophon` | ★ | 刊物收束栏：上分割线 + 左右双栏 monospace 元数据（下期预告 / 卷·期）。data-brief 等刊物化主题的"尾签名"。 |

> 由 `npm run build:writer-docs` 从 `src/containers/vocabulary.ts` 生成，请勿手改。新增容器先改 vocabulary，需要划入扩展包再在 `scripts/build-writer-docs.ts:PACK_OF` 追加。

<!-- generated:container-quick-ref:data-brief:end -->

---

## 刊物气质三件套

```
::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

::: section-tag
深度
:::

::: cover 在无人深夜，重新学习如何阅读一本书
算法时代的注意力账簿，正在失去一笔隐形支出：连续时间。
:::
```

- `masthead`：刊名（info）左对齐 + 期号·日期 monospace 右对齐 + 下划线。`issue` / `date` / `kind` 都是 attrs。
- `section-tag`：黑底白字小胶囊（栏目标签，如「深度」「数据」），info 即标签文字。
- `cover` 在基础契约里已存在，但 data-brief 家族会把它渲染得更刊物化（题图被替换为粗排印题头）。

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

## KPI 仪表盘（三指标 + sparkline）

```
:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="n=1,432"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="-68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::: kpi-item label="02 · UNLOCK/DAY" caption="日均手机解锁" value="138" unit="次" delta="+23%" trend="up" series="11,10,9,8,7,5,3,2" foot="'15 41次 → '24 138次"
:::
::: kpi-item label="03 · BOOKS/YR" caption="年均完整阅读" value="2.7" unit="本" delta="±0" trend="flat" series="7,6,8,7,8,6,7,7" foot="'15 2.8本 → '24 2.7本"
:::
::::
```

`kpi-item` 的全部展示**靠 attrs 驱动**，body 内容会被忽略：

| attr | 用途 |
| --- | --- |
| `label` | 指标编号 / 口径（monospace） |
| `caption` | 中文说明 |
| `value` / `unit` | 数字本体 + 单位 |
| `delta` | 同比标签（前缀决定颜色：`-` 红 / `+` 红 / `±` 灰） |
| `trend` | sparkline 颜色方向（`up` / `down` / `flat`） |
| `series` | sparkline 折线数据（逗号分隔 0–13 整数，左右端点对齐） |
| `foot` | 期端对比小字（monospace 双端） |

---

## 横向条形图

```
:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟 · n=1,024"
::: bar label="60+" pct="84" value="42 分"
:::
::: bar label="45–59" pct="58" value="29 分"
:::
::: bar label="30–44" pct="34" value="17 分"
:::
::: bar label="18–29" pct="16" value="8 分"
:::
::: bar label="<18" pct="10" value="5 分" tone="warn"
:::
::::
```

纯 `div` 宽度，无 SVG——`pct` 是 0–100 整数。`tone="warn"` 把柱色切到 danger 红，用作"异常值"标注。

---

## 读者问答

```
::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力。从睡前 15 分钟开始，两周可回升至 22 分钟（样本内中位数）。
:::
```

- `info` 是 kicker（如 `读者问答 · Q&A`）；`q` attr 是问题文本（主色 Q 方块头像 + 单行）；body 是回答（支持完整 Markdown）。

---

## 脚注块

```
::: footnotes
[1] 数据覆盖 2010–2025，以两年为滑动窗口平滑处理。
[2] "深度理解得分"取自阅读后 24h 回忆测试，满分 100。
:::
```

上分割线 + 小字编号引用。body 通常为 `[1] 文本 / [2] 文本` 或有序列表，渲染器只加外框。

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

## 章节蓝色 monospace 编号（无需手写 HTML）

data-brief 主题在渲染层识别 `## 01 标题` / `## 12 标题` / `## 附 数据说明` 这类前缀模式，自动把数字（1–2 位）或单字标记（`附` / `终` / `前` / `补`）切成主色 monospace 小字 + 间距。作者写：

```
## 01 为什么我们失去了阅读的耐心
## 02 慢读的三种练习
## 附 数据说明 · NOTES
```

不写任何 `<span>` 标签。匹配不上的前缀（如 `## 一、 …` 或 `## 第一章`）保持原样不被改写。其它主题里语法仍合法，但不做这层装饰——这是 data-brief 主题的私有视觉签名（`theme.behavior.h2DataBriefKicker`）。

---

## 完整示例

可直接套用的端到端示范：[`src/samples-md/sample-data-brief.md`](../../../src/samples-md/sample-data-brief.md)。
肉眼校验 data-brief 主题下的版面气质——数据蓝 + 黑底代码 + 直角硬边 + 栏目化克制。
