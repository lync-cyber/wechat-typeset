::: key-number NEUE GRAFIK REVUE value="Nº09"
VOL.IX · 2026—05—16 · CHF 14.—
:::

::: section-tag ESSAY · 01
:::

::: editorial-header 12 栏作为 / 版面的 / 呼吸节奏 chip="ESSAY · 01" pp="PP.04–19" subtitle="论 Neue Grafik 体系中的网格约束与编辑设计" topRule="6" titleDot="primary"
:::

::: byline cells="AUTHOR:顾栏白 | EDITOR:徐间距 | SET:09·2026" monospaceLast="true"
:::

::: abstract INDEX · 副刊导读
网格不是牢笼，是自由的前提。Müller-Brockmann 在 1958 年苏黎世的那套 12 栏体系，至今仍是编辑设计者无法绕过的基础坐标。本文从栏位分配、行长约束、视觉节奏三个维度，重新丈量这套系统的内在逻辑。
:::

::: announcement tone="danger"
本期取消订阅奖励活动，专注内容本身。感谢读者理解。
:::

:::: toc INDEX layout="split" meta="目次排布采用 12 栏 / 1/3 : 2/3 比例"
::: toc-item no="01" page="04" 网格作为版面呼吸
:::
::: toc-item no="02" page="08" 三款无衬线字体比较
:::
::: toc-item no="03" page="14" Müller-Brockmann 之后
:::
::: toc-item no="附" page="18" Q&A · 方法论注
:::
::::

::: intro
Grid systems are not a guarantee of good design. 网格不担保好设计——它只是给设计者一个可供背离的理性基础。
:::

::: section-title 网格作为版面的呼吸节奏 kicker="ESSAY · 01 — THE GRID" variant=kicker-stack
:::

## 网格作为版面的呼吸节奏

::: quote-card Karl Gerstner
约束即自由——网格不是把可能性减少，而是让可能性变得可控。
:::

::: pull-quote
真正改变一个人的，往往是最简单的一句话。
:::

::: steps 一份版面的诞生 variant=split-row
### 01 框定
12 栏 + 8 行 + 4 mm 沟距，先确定容器骨架。

### 02 分配
按内容权重分配栏宽：1/3 留白、2/3 实体，黄金切割比恒定。

### 03 编辑
最后把每一段文字放进对应栏，行长不超过 60 字符。
:::

12 栏系统的核心洞见并非"把页面切成 12 份"，而是通过 ==栏位比例关系== 让版面获得内在节奏。留白栏与实栏同等重要，这一点在 *Neue Grafik* 第 2 期即已被申明。

Karl Gerstner 在《Designing Programmes》中将网格定义为"尽可能多的可能性中最小的公分母"——这个描述精准捕捉了栅格设计的本质：**约束即自由**。

:::: bar-chart FIG.01 · 按栏数 · 瑞士设计年鉴版面栏位分布 subtitle="n=240 · 单位：出版物页数占比 · 数据来源：样本调研 1955–1975"
::: bar label="12 栏" pct="62" value="62%"
:::
::: bar label="8 栏" pct="21" value="21%"
:::
::: bar label="6 栏" pct="10" value="10%"
:::
::: bar label="4 栏" pct="5" value="5%"
:::
::: bar label="自由版" pct="2" value="2%" tone="warn"
:::
::::

::: image-caption src="https://placehold.co/900x400?text=FIG.01"
FIG.01 · 12 本瑞士设计年鉴（1955–1975）版面栏位分布。样本覆盖 240 个对开页，按主栏数分类统计。
:::

## 三款无衬线字体的编辑学比较

### Akzidenz-Grotesk：实用主义的基底

1896 年由柏林 H. Berthold 铸字行发行的 Akzidenz-Grotesk，是 20 世纪国际排印运动的字体起点。其 x 高度适中，字间负空间均匀，在正文 10–13px 区间表现稳健。

> 字体选择是一种立场声明。选择 Akzidenz-Grotesk 意味着选择了实用主义传统而非个性主张。
>
> — HELMUT SCHMID · *Typography Today*, 2003

### Univers：系统化的野心

01. Adrian Frutiger 在 1957 年为 Deberny & Peignot 设计，21 个字重与字宽的完整矩阵
02. 数字命名法（55 Regular / 65 Bold / 75 Black）将字体设计变成可量化的工程学
03. Univers 首次证明：一个字体家族可以被当作模块化系统来构建

### Helvetica：中立性的两面

- [x] x 高度高于 Akzidenz-Grotesk，移动端小字号可读性更佳
- [x] 字重范围完整，从 Thin 到 Black 覆盖编辑设计全场景
- [ ] 过度使用导致视觉疲劳——在信息密集页面应控制字重层级不超过三级

:::: callout-group
::: info INFO
12 栏网格不等于 12 列内容——留白栏与实栏的比例关系，决定版面是否有呼吸感。
:::
::: tip TIP
正文行长以 60–75 字符为宜（约 9–11em）；移动端单栏适配后控制在 40 字符以内。
:::
::: warning WARN
将 Helvetica 与 Neue Haas Grotesk 混排时，x 高度差异在 12px 以下明显，需逐级校对。
:::
::: danger STOP
切勿在正文中使用三级以上字重层级——层级过多等于没有层级，视觉权重归零。
:::
::::

以一行伪代码表达栏位逻辑：`grid(12, gutter=20px)`。

```javascript
// GRID.JS · 12-column Swiss system
const column = (total, gutter) =>
  (pageWidth - gutter * (total - 1)) / total;
```

:::: compare CONTRAST
::: pros GRID · 有网格
- 比例关系内在一致，版面节奏可预期
- 留白由系统分配，不依赖设计师直觉
- 跨页展开时视觉连贯性有保障
:::
::: cons FREE · 自由版
- 每次决策都是从零出发，认知成本高
- 局部精彩，但全局缺乏结构性呼吸
- 版式复刻时难以维护一致性
:::
::::

::: note RANDNOTIZ
栏位制并非要求页面"满"——白栏的存在让黑栏更可阅读。Tschichold 在《Asymmetric Typography》第三章专论留白的积极功能，称其为"版面的沉默发言人"。
:::

## Müller-Brockmann 之后：承继与背叛

1981 年，Müller-Brockmann 在《Grid Systems in Graphic Design》中将 *Neue Grafik* 体系系统化。此后 40 年，这套框架经历了数字化的冲击与重构。

当代设计师的困境在于：网格提供的是纸张对开页的节奏方案，而屏幕是无边界的流动媒介。[响应式网格](#) 是对这一矛盾的工程学妥协，但它丧失了原版系统中对"物理页面绝对尺寸"的依赖。

::: qa-block READER Q&A q="数字编辑刊是否还需要严格的 12 栏系统？"
需要，但方式变了。移动端的"12 栏"更接近一套比例约定而非像素精确值。核心不变的是：*版面的每一个决策都应能在网格坐标系中被解释*。Jedes Element muss im Raster begründbar sein.
:::

::: note variant=editorial-stripe EDITOR'S NOTE
*Neue Grafik* 1958–1965 共出版 18 期，每期均以英、德、法三语平行排印。其本身就是国际主义排印的实践现场，而非仅是理论宣言。本栏目的视觉系统直接取法于 Nº04 内页的红色辅助线与 12 栏铅笔草图。
:::

::: footnotes NOTES
[1] Josef Müller-Brockmann, *Grid Systems in Graphic Design*, Niggli Verlag, 1981, p.10.
[2] Jan Tschichold, *Asymmetric Typography*, Reinhold Publishing, 1967.
[3] Karl Gerstner, *Designing Programmes*, Arthur Niggli, 1964, p.22.
[4] 样本调研：取 12 本瑞士设计年鉴（1955–1975），逐页记录主栏数，共 240 对开页，排除广告版。
:::

::: divider
:::

::: note variant=research-dense METHODOLOGY
本文数据取样自 12 本瑞士设计年鉴（1955–1975），逐页人工记录主栏数，共计 240 个对开页；广告版与折页不计入统计。"自由版"定义为无可辨识栏位参考线的版面。条形图按占比降序排列，满分 100 对应单一栏数全覆盖。
:::

::: footer-cta variant=triptych-actions IF YOU LIKED THIS like="♡  LIKE" star="◎  SEEN" share="→  SHARE"
:::

::: qrcode variant=follow-card NEUE GRAFIK REVUE desc="每双周四出版 · 编辑设计与栅格排印评论" kicker="SUBSCRIBE"
:::

::: recommend FURTHER READING
- Müller-Brockmann, *Grid Systems in Graphic Design*, Niggli 1981
- Karl Gerstner, *Designing Programmes*, Arthur Niggli 1964
- Jan Tschichold, *Asymmetric Typography*, Reinhold 1967
:::

::: colophon next="字距作为空间：Univers 55 在正文中的间距实验" issue="Nº09 / 2026 / ZÜRICH"
:::
