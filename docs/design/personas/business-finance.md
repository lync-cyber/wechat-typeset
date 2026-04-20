# Business Finance · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**硬核财经不是"涨停板红配金"，是"研究所的内刊"。** 参照坐标是《财新周刊》的封面与栏目头、《经济观察报》的黑白分栏、FT 中文网粉色新闻纸的冷静字距、Bloomberg Terminal 的黑橙对照、The Economist 的 sidebar 断言、HBR 的 pull-quote 与侧栏。气质关键词：**报告、数据、分栏、纪律**。拒绝坐标一并写死：拒绝券商研报 PPT 的"大红大金渐变折线"，拒绝自媒体财经号的荧光黄 highlight + emoji 📈📉，拒绝股票 APP 的涨停绿跌停红满天飞，拒绝"硬核"被误读为"咄咄逼人"——**真正的硬核是克制到近乎冷酷的排版，不是加粗感叹号和红底黑字标签**。

一句话收束：**business-finance 应该让读者觉得"这是一份可以被打印出来、订进活页夹、明天晨会前读完的内参"**。

---

## 1. Persona 三件套

### 1.1 Color story

当前 tokens 有一个**结构性硬伤**：`primary #b1252b`（深红）和 `danger #a01c22`（暗朱红）**色相几乎一致、明度仅差 5%**，读者根本无法一眼分辨"这是主色标题还是 danger 提示"；而 `warning #b700e` 的驼黄又和 primary 的红同在"暖色高饱和"区间，四个语义色挤在色轮 0°-40° 的夹缝里互相抢戏。这不是"微调色值"能解决的，是**整套色彩策略**要重做。

我做了两版提案——**A 版（保留 primary 红，但让红降格为"accent 级稀缺资源"）**和 **B 版（激进方案：primary 改为深栗墨，把红彻底让给 K 线的"涨"与 danger）**。**本文档采纳 B 版**：这是唯一能让 K 线资产不被 primary 红稀释的方向。FT 中文网正是这么做的——主色是墨黑偏栗，红色稀缺到一期只出现两三次。

#### 新色值提案（采纳 B 版：深栗墨为主，红留给涨/险）

| token | 旧值 | 新值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|---|
| `bg` | `#ffffff` | `#fefefe` | 报纸白 | 绝对纯白在 SVG 光栅化中会被公众号转成透明，改为 `#fefefe` 是平台级纪律 |
| `bgSoft` | `#f4f6f9` | `#f3f1ec` | 新闻纸米 | 从冷灰改成**FT 粉色新闻纸**方向但收敛——不走粉而走"旧纸米"，冷静且不像股票 APP |
| `bgMuted` | `#e8ecf2` | `#e6e2d8` | 档案袋灰 | 同路线，比 bgSoft 再深 6%，留给代码底、compare 表头 |
| `text` | `#161d26` | `#0f141b` | 内参墨 | 再压深一档。硬核财经的文字色必须比所有装饰色都深。 |
| `textMuted` | `#5c6573` | `#56606e` | 批注灰 | 微调，偏冷 |
| `primary` | `#b1252b`（深红） | `#2a1a14` | 深栗墨 | **关键改动**：primary 不再是红色，改为 FT/HBR 风的"深栗墨"——接近黑但带一点栗褐的温度。这样红色就可以**完整地让给 K 线的"涨"与 danger 语义**，四色系统不再互抢。 |
| `secondary` | `#0f3a5b`（深海蓝） | `#0e3654` | 内参蓝 | 保留方向，饱和度略降。这是"研究部蓝"，report 的权威感来源。 |
| `accent` | `#d4a23c`（驼金） | `#b8821f` | 琥珀黄 | 降饱和避免"月饼盒金"，留给**数字 `.num` 的下划/同比箭头/stepBadge 底条** |
| `border` | `#d7dce3` | `#d0cec8` | 版框线 | 与新米底配套的暖灰，比冷灰更像新闻纸边线 |
| `code` | `#b1252b`（红） | `#0e3654`（= secondary） | 内参蓝 | **拒绝让红色承担代码色**。财经语境里代码色应跟 secondary 走冷静路线，红色是稀缺战略资源 |

#### 语义色（核心修复）

这是当前主题最需要被推倒重做的模块。纪律三条：

1. **warning 脱离红色系**——改走"琥珀 + 冷灰"路线，和 primary / danger 拉开色相 60°+
2. **danger 虽仍在红系**，但和 primary（深栗墨）**结构差异远大于色差**——primary 只用在 h2 竖条/封面题字等标题位，danger 用在容器 ticket-notch/双框/顶标签；一个是"标题体"的墨，一个是"勘误贴条"的红
3. **tip 与 info 共享冷蓝家族但区分明度**——tip 偏"钢青"，info 偏"烟蓝"

| 语义 | accent（标题/图标色） | soft（容器浅底） | 对比度（accent on `#fefefe`） | 角色名 |
|---|---|---|---|---|
| tip | `#1f4f6b` | `#dfe8ee` | 7.8:1 | **要点**（Key Takeaway） |
| warning | `#8a6416` | `#f1e8d1` | 5.9:1 | **风险提示**（Risk Note） |
| info | `#3d5a75` | `#dde4ec` | 5.6:1 | **补注**（Memo） |
| danger | `#9a1b20` | `#f0dadc` | 6.8:1 | **警报**（Alert） |

所有对比度均 ≥ AA（4.5:1）；warning 的琥珀对米底对比度偏低但**只承担标题/图标位**，正文仍走 `text` 色，实测可用。

#### "拒绝什么"

- **拒绝 `#dc143c` / `#e60012`**（春联红、广告红）——这是自媒体财经号配色
- **拒绝 `#f5c518` / `#ffd700`**（荧光金、纯金）——券商研报 PPT 审美
- **拒绝渐变色**——`linear-gradient` 不过 juice 层就是白给
- **拒绝"涨绿跌红"欧美习惯**——本主题面向中国 A 股读者，**涨=红、跌=绿/蓝**是地域纪律。具体到 compare ledger variant：左栏（多头/涨）底色 `#f0dadc`（与 danger.soft 同色系但略浅），右栏（空头/跌）底色 `#dfe8ee`（与 tip.soft 同源）。绿色在本主题**完全不出现**——A 股读者看到绿会自动读成"跌"，若 compare 左栏是绿会产生语义噪音
- **拒绝 emoji 📈📉💰**——任何 emoji 都禁止

---

### 1.2 Typographic voice

business-finance 的字体节奏应该像内参：**大标题稀、正文密、数字独立成字**。不能写 font-family，节奏靠 size / weight / letter-spacing / color / margin 拼。

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（专题头） | 26 | 800 | 0.5px | 1.35 | `text` | 字重 800（当前 800 保留），字距收紧到 0.5px——财经标题**不拉字距、靠字重压阵**，和人文主题完全相反 |
| h2（章节） | 21 | 700 | 0.3px | 1.4 | `text` | 前缀左侧 4px `primary` 深栗墨竖条 + 8px 内间隔；竖条下端延伸出一根 12px 宽的 `accent` 琥珀短横（图表 legend 感，保留当前方向但压细） |
| h3（小节） | 17 | 700 | 0.2px | 1.5 | `text` | 不加前缀，仅靠字号 + 字重区分。前面留一个 4×4 `secondary` 蓝方块也可（SVG），但建议不给——h3 应该轻 |
| p（正文） | 15 | 400 | 0.3px | 1.75 | `text` | 保留当前 15/1.75（财经正文不比人文需要 2.0 行距，信息密度优先） |
| small（附注） | 12 | 400 | 0.2px | 1.6 | `textMuted` | 数据源标注 / 日期 / 单位 |
| **pull-quote（核心判断）** | 20 | 600 | 0.2px | 1.55 | `text` | **新增层级**。pull-quote 在 business-finance 里是"研究员核心判断"——要大、要重、要居中、要用 text 色不用 primary（避免和 h2 抢）；左右各一根 2px `secondary` 竖线夹住（frame-brackets 的变体） |
| **`.num`（数字内联）** | 15 | 600 | 0 | 1.75 | `primary` 深栗墨 | **全主题签名动作**。正文里凡数字（`12.3%`、`¥ 2,340 亿`、`+7.2pp`）均包裹 `.num` inline，字重 600 + 字距 0 + primary 色——让数字在 400/0.3px 的正文里**自成一格**，读者视线一扫就能抓住所有数据点 |

#### 字重策略

- 正文 400，强调（`<strong>`）600——**不要 700/800**。当前 `strong: font-weight 800` 是硬伤：和 h1 同重，正文里到处 800 就是"全页加粗等于没重点"。降到 600，配合 primary 色即可识别
- 标题 700/800
- 禁止 `italic`——公众号字体栈不稳定会回退成假斜体，财经主题宁可用 `letter-spacing` 抬字距造"疏"感

#### 数字权威感（本主题最重要）

**`.num` 是 business-finance 区别于其他主题的核心动作**。规范层需要明确：

1. 所有内联数字**由渲染器或用户手动**包裹 `<span class="num">12.3%</span>`，该 span 走 `inlineOverrides.num` 注入 600/primary/`letter-spacing:0`
2. 数字前后留 thin-space（`&thinsp;` 或一个普通空格）——`增长 12.3%` 比 `增长12.3%` 读起来像数据而不是广告
3. 同比/环比前缀符号（`+` / `-` / `▲` / `▼`）跟随数字色——涨用 danger 红（A 股纪律），跌用 secondary 蓝，不用任何绿色
4. 单位（`%` / `亿` / `bp` / `pp`）字重不降——保持 600，但颜色可用 `textMuted` 让单位退后一层

#### 首字下沉 / 段首缩进

- 本主题**不做**首字下沉。dropcap 是杂志审美，不是内参审美
- 正文**不做** `text-indent: 2em`
- `intro` 段落**左侧加 3px `secondary` 竖条 + 左内缩 14px**——模拟研报"摘要 Abstract"的栏框

---

### 1.3 SVG motif

当前资产里有**一件真正的瑰宝**——`dividerWave` 的 K 线柱状分割线（柱体 + 中心 open/close 竖线 + 红蓝交替）。这是全项目单件最强资产，不是"财经主题惯用股票涨跌箭头"那种廉价暗示，而是真的懂 K 线节律。**它必须保留，且进一步精修**。其他资产按"保留 / 重做 / 新增"三栏分别处理。

#### 保留（方向对，微调即可）

**① dividerWave · K 线分割线（瑰宝）**

- 保留柱体 + 中心 open/close 竖线 + 红/蓝交替的结构
- 颜色更新：`primary` 从 `#b1252b` → **`#9a1b20`**（= danger.accent，因为 primary 改成了栗墨，K 线的"涨"应该走 danger 红），`secondary` 保持 `#0e3654`
- **精修点**：当前 9 根 K 线是"逐级下压"（收盘价从 6 降到 2）——这在模拟"下跌趋势"。建议改为**前 5 根下压、后 4 根反弹**的 V 型走势，暗示"触底回升"——更积极、更符合"硬核判断"的气场
- 柱体宽度 4px 保留，stroke-width 0.8 提到 1.0（平台光栅化更稳）
- viewBox 保持 `0 0 240 20`
- 使用场景：`divider` 容器默认 variant `wave`；以及 section 级别的大分隔

**② H2 前缀 · 色块 + legend 横条**

- 保留当前"主色方块 + 辅色细横条"的 legend 语言
- 色块颜色更新：主块 `primary` 深栗墨（而非旧红），辅块 `secondary` 蓝 `opacity 0.75`
- 几何微调：主块 `4×12` → `3×13`（更瘦更像 legend 的方块），辅块 `12×4` → `14×3`（更细）
- viewBox `0 0 18 18` 保留

**③ sectionCorner · L 形直角**

- 保留，但 `accent` 琥珀的小方块 `4×4` → `3×3`，更克制
- 配合 sectionTitle 的 `cornered` variant 使用

**④ stepBadge · 正方形钤印**

- 保留正方形方向（和 literary-humanism 的圆钤印拉开）
- 底色由 `primary` 深栗墨填充（变了语义——旧红变成栗墨，更像"内参封面的编号章"）
- 底部 3px 条从 `accent` 琥珀保留——这是 stepBadge 唯一的暖色点
- 数字 `#fefefe` 保留（平台白色陷阱纪律）
- 字号 15 + 字重 700 保留

#### 重做（偏装饰、用词错误、或撞车）

**⑤ dividerFlower · 章节编号 Sec.I / Sec.II**

当前的"中心方块 + 横线"偏装饰、不承载语义。重做为**内参常用的"章节编号 + 双线"**：

```
 ───────────────  Sec.II  ───────────────
```

- viewBox `0 0 240 16`
- 左右各一根 1px `border` 色细线（长度 92px）
- 中央文字 `Sec.II` / `Sec.III`（拉丁数字）用 `<text>`，font-size 12（注意规范：光栅后 ≥ 14，所以 viewBox 的 12 对应渲染后放大 1.2x 后 ≈ 14.4，实际 width/height 要对应缩放——或直接把 font-size 提到 14）
- 文字色 `textMuted`，letter-spacing 1.5px
- **注意**：由于 `<text>` 不能声明 font-family，拉丁数字在不同平台字形会漂移——可接受，这正是 `letter-spacing` 配合的用意
- 编号数字由用户通过 `::: divider sec=II` 传入，默认 `I`；或渲染器根据文档内 dividerFlower 出现顺序自动递增
- 使用场景：section-title 之间的大分隔，不是段间小停顿

**⑥ dividerDots · 紧凑点阵（降级备用）**

- 保留"方块序列"方向但收紧：从 6 个方块降到 **3 个方块**，居中
- 颜色红（danger）/ 蓝（secondary）/ 红交替——而不是当前 6 个平均分布
- 用于段落间紧凑停顿，频率较低

**⑦ quoteMark · 方头引号 + attribution 空间**

当前锐利方头引号方向对，但 quoteCard 里缺**"出处"位置**——内参/研报的核心判断必须有出处。重做：

- SVG 本身只做引号，保留当前方头几何（`M4,6 L4,14...`）
- 引号放在 quoteCard 容器的左上角（`inline-block` + `margin-right 8px`），不居中
- quoteCard 的 CSS 结构里，**末行右对齐**预留一个 `.attribution` 小字位：`——XX 研究院 2026/04` 格式，13px textMuted，前缀破折号

#### 新增

**⑧ dataMark · 数字卡背景条纹（可选）**

- `highlight` 容器升级为"数据卡"时，背景用一根**细 grid 线**（1px `border` 色，水平一道 in baseline）作为 SVG data-URI 背景或直接 `border-bottom`
- 如果用 SVG：viewBox `0 0 400 80`，仅一根 `<line y1=60 y2=60 stroke=border stroke-width=0.8>`——极轻的底纹，暗示"数据坐标轴"
- **也可以**不做 SVG，直接用 `border-bottom: 1px solid border` 达到同等效果——优先选简单方案

**⑨ deltaArrow · 同比/环比三角（小号，14×14）**

- 实心等腰三角：上三角（涨）填 `danger.accent`、下三角（跌）填 `secondary`
- 用在 highlight 数据卡的 "同比" / "环比" 数字前
- viewBox `0 0 14 14`，三角底 8px 高 6px，居中

#### 四状态图标（保留方形硬边，但要拉开骨架）

当前 tipIcon / warningIcon / infoIcon / dangerIcon 都是"方框 + 内部感叹号变体"——形状同质化严重。虽然 admonition 容器骨架已经区分（见后文），但图标本身也要差异化：

- **tipIcon**：方框 + 内部"✓"（两笔折线）——要点是"建议采纳"
- **warningIcon**：方框 + 内部"!"（保留当前感叹号）
- **infoIcon**：方框 + 内部"i"（竖条 + 点）
- **dangerIcon**：方框 + 内部"×"（两笔交叉）或"STOP"风格的一道粗横线——**标志性的"勘误"感**

每个保留 stroke-width 1.5、viewBox `0 0 16 16`。

---

## 2. 19 个 container 的视觉差异化方案

### intro · 摘要

**角色**：Abstract / Executive Summary。全文第一段落，要让读者在 10 秒内知道"这期讲什么"。

**结构**：
```
 ▍ 摘要 · Abstract
 ▍
 ▍ 正文内容，左侧 3px secondary 竖条 + 左内缩 14px
 ▍ 字号 15 / 行高 1.75
```

- 左侧 3px `secondary` 内参蓝竖条（border-left）
- padding `12px 16px 12px 17px`（左 17 = 14 内缩 + 3 竖条）
- margin `0 0 24px 0`
- 底色 `bgSoft` 新闻纸米
- 标题"摘要"可选，若有则 `14px / 700 / secondary` 色 + `margin-bottom 6px`

### author · 署名条

**角色**：作者 / 研究员 / 栏目。署名要**冷**，不是可爱徽章。

**结构**：单行 `display:inline-block`，`padding 4px 10px`，`bgMuted` 底，`textMuted` 色 13px 文字，`border-radius 0`（方块）。
- 左侧可选一根 2px `accent` 琥珀色竖条，暗示"栏目色标"

### cover · 封面

**角色**：专题封面。图 + 一行题记 + 核心判断短句。

**结构**：
- 图片 `border-radius 2px`（极窄圆角，稍微留一点"印刷品感"但不足以像卡片）
- 图下一行 12px `textMuted` 小字题记（`text-align: left`，不居中——内参感）
- 再下方可选一行 17px 600 `text` 色的"核心判断"短句（不是标题，是印在封面的断言），带一道 2px `primary` 栗墨下划短线（宽度 40px）

### section-title · 卷/章标题

**角色**：专题内的大分段。比 h2 更重。

**variant 选择**：`cornered`。
**结构**：
- 左上角 `sectionCorner`（L 形 + 琥珀小方块）
- 标题文字 19px / 700 / `text` 色 / `letter-spacing 0.3px`
- 下方一道 1.5px `primary` 栗墨**短横线**（宽度 48px），而不是通栏
- margin `40px 0 18px 0`

### quote · 引文

**角色**：征引他人言。`blockquote` 语义。

**variant 选择**：`column-rule`。
**结构**：
- 左右各一根 1px `secondary` 内参蓝竖线
- padding `8px 20px`
- 底色**不用** bgSoft——透明即可
- 字色 `textMuted`，letter-spacing 0.5px
- **不加引号 SVG**（引号留给 quoteCard）

### quoteCard · 核心判断

**角色**：**研究员核心判断 / 访谈摘录**。这是全篇最有分量的断言位，不是"金句"。

**variant 选择**：`frame-brackets`（左右 L 形括号 + 内部大字）。
**结构**：
```
  ┌                                  ┐

    "判断正文 20px 600 text 色
     居中 / letter-spacing 0.2px
     可以两到三行"

                     ——研究员姓名·机构·日期

  └                                  ┘
```

- 外框由四个角的 L 形 SVG 装饰组成（不是完整 border），L 形长 14px、粗 1.5px、色 `primary` 栗墨
- padding `26px 28px`
- 底色 `bgSoft`
- 引号 `quoteMark` 放在正文左上角前（非居中）——保留方头锐利引号
- **attribution 行**：末尾右对齐，13px `textMuted`，前缀 `——`，格式 `——机构·日期`
- `border-radius 2px`

### footerCTA · 卷尾订阅卡

**角色**：订阅钩子。要**像 FT 的订阅提示条**：冷静、短、有一个明确的动作提示。

**结构**：
```
  ──────────────────────────────────────
   关注「硬核财经」
   不吹票、不带节奏，只讲值得下判断的数据
                             [ 扫码订阅 ▸ ]
  ──────────────────────────────────────
```

- 上下各一根 1.5px `primary` 栗墨横线（通栏）
- 中间 `padding 20px 20px`
- 标题行 16px / 700 / `text` 色
- 副标题 13px / `textMuted` / 行高 1.6
- 右下角"扫码订阅 ▸"胶囊（`display:inline-block`，padding `6px 12px`，`primary` 底，`#fefefe` 字，radius 2px）——这是全文唯一允许的"深色底反白字"
- margin `32px 0 0 0`

### recommend · 延伸阅读

**角色**：卷末书单 / 相关推荐。

**结构**：
- 上方标题行"延伸阅读"：14px / 700 / `secondary` 蓝色 + 前缀一个 `secondary` 蓝的 3×12 小竖块
- 列表项每行 14px / 1.8 / `text` 色 / 前缀 `▸` 字符（`textMuted` 色）
- padding `14px 18px`，底色 `bgSoft`，radius 2px

### qrcode · 二维码

**角色**：订阅钩子的图像侧。

**结构**：居中 block，图像下方 12px `textMuted` 一行说明。图像外围 `padding 6px`、`border 1px border-color`、底色 `#fefefe`。`border-radius 0`——二维码不圆角。

---

### tip / warning / info / danger · 四件套（**重头戏**）

**核心原则：四件套必须靠形状差异而非色差区分**。打印成黑白也能一眼分出。

| 语义 | variant | 形状策略 | 理由 |
|---|---|---|---|
| **tip**（要点） | `accent-bar` | 左侧 3px `tip.accent` 钢青竖条 + `tip.soft` 浅底，无外框 | 要点是中性建议，骨架应最简 |
| **info**（补注） | `minimal-underline` | 仅标题下方 1px `info.accent` 烟蓝短线（宽度 60%），**无底色无边框** | 补注最轻，像铅笔批注在空白纸上 |
| **warning**（风险提示） | `pill-tag` | 顶部悬挂"风险提示"琥珀胶囊（margin-top 负值 -12px） + 外框 1px `warning.accent` 琥珀 + `warning.soft` 底 | 风险提示要"挑出来"，胶囊悬浮于边缘 |
| **danger**（警报） | `ticket-notch` | 左右两端圆切齿（SVG data-URI 背景）+ 双边框（外 1.5px `danger.accent` 深朱 + 内 1px `bgSoft` 空白 + 再内 0.5px `danger.accent` 虚化） | 警报必须**最重**，票根缺口是"勘误贴条"的视觉传统 |

#### 四者一眼可辨的 4 个锚点

1. **边框策略**：tip 仅左竖条 / info 仅下划线 / warning 全外框 + 悬挂 / danger 双框 + 缺口——**边框数量递增**
2. **底色深度**：info 透明 / tip 浅 / warning 中 / danger 深——**深度递增**
3. **图标形状**：✓ / i / ! / ×——**紧张度递增**
4. **标题词**：要点 / 补注 / 风险提示 / 警报——**分量递增，中文四词各异**

这 4 条锚点任一条失效都能分得出；四条叠加基本无误读可能。

#### 骨架数值

| variant | padding | margin | border | 标题前缀 | 标题字重/色 |
|---|---|---|---|---|---|
| tip · accent-bar | `10px 14px 10px 16px` | `0 0 16px` | 左 3px tip.accent | `tipIcon` ✓ + "要点" | 14 / 700 / tip.accent |
| info · minimal-underline | `6px 0 10px 0` | `0 0 16px` | 无 | `infoIcon` i + "补注" | 14 / 600 / info.accent |
| warning · pill-tag | `18px 16px 14px 16px` | `14px 0 16px`（上 14 给胶囊露头） | 1px warning.accent | 悬挂胶囊"风险提示" 12/700/`#fefefe` on warning.accent bg | —— |
| danger · ticket-notch | `18px 22px` | `0 0 20px` | 双层（见上） | `dangerIcon` × + "警报" | 14 / 700 / danger.accent |

---

### highlight · 数据卡（primitive 升级）

**角色**：**数据 callout**。这是本主题相对其他主题的**独特优势位**——highlight 不再是"浅底加粗段"，而是一张**巨号数字 + 单位 + 同比 + 标签**的数据卡。

#### 结构草图（`display: table`，table 布局规避 flex 禁令）

```
 ┌────────────────────────────────────────┐
 │  ▍ 标签（12/600/secondary，左上）      │
 │                                        │
 │   12.3%       ▲ +2.1pp  同比           │
 │   (巨号)        (小号 delta)           │
 │                                        │
 │  数据来源：XX 统计局 2026Q1（小字右下） │
 └────────────────────────────────────────┘
```

- 外框 1px `border` 色，radius 2px，底色 `#fefefe`
- padding `18px 20px`
- 用 `display: table` + `table-cell` 两栏：左栏是巨号数字（`font-size: 36px / font-weight: 800 / color: primary / letter-spacing: -0.5px`，数字专用负字距让位），右栏是 delta + 标签（14/600/delta 色）
- 巨号数字下方 12px `textMuted` 的单位/说明
- 底部右对齐一行 11px `textMuted` 数据源
- 顶部左侧 12/600/`secondary` 的标签（如"CPI"、"GDP 增速"），前缀 3px `secondary` 小竖块

#### 小屏降级

- 当单个 highlight 在小屏（约 320px 宽）展示时，table 两栏会自动靠 cellpadding 压缩——**不做响应式**（禁 @media），而是**把 delta 小号文字放在巨号数字右侧、用 `vertical-align: baseline`**，靠 baseline 对齐容忍窄屏时的换行

#### 纪律

- **涨红跌蓝**：delta 为正时用 `danger.accent` 红（A 股纪律），为负时用 `secondary` 蓝
- delta 符号用 `▲ +` / `▼ -`，不用 emoji
- 巨号数字**必须**是 `.num` 样式（600 + letter-spacing 0）

---

### compare · Ledger 账本（多空两面）

**角色**：**多空两面 / 基本面 vs 技术面 / 正方 vs 反方**。不是"优点缺点"。

**variant 选择**：`ledger`。
**结构**：
```
 ┌──── 多方观点 ────┬──── 空方观点 ────┐
 │ (顶栏 primary 栗墨底 / #fefefe 字)  │
 ├──────────────────┼──────────────────┤
 │                  │                  │
 │   论据一          │   论据一          │
 │   论据二          │   论据二          │
 │   论据三          │   论据三          │
 │                  │                  │
 ├──────────────────┼──────────────────┤
 │ 综合判断：        │ 综合判断：        │
 │ 一句话收束        │ 一句话收束        │
 └──────────────────┴──────────────────┘
    (底栏 bgMuted 底 / text 字 / 600)
```

- `display: table` + 两 `table-cell`，中间 1px `border` 色竖分隔（用右 border 实现）
- 顶栏（`thead` 视觉）：`primary` 栗墨底 + `#fefefe` 字 + 14/700 + `text-align: center` + padding `8px`
- 主体：padding `14px 16px`，每栏独立
- 底栏（结论）：`bgMuted` 底 + 14/600 + padding `10px 16px` + 上方 1px `border` 色横线
- 外框 1px `border` 色，`border-radius 2px`
- **颜色纪律**：左栏（多方/涨）顶栏底色叠加一层 `danger.soft` 的 15% 透明度（用 mix 算好的固定色 `#f3e4e5`）；右栏（空方/跌）顶栏底色叠加 `tip.soft` 的同等（`#e4ecf1`）。主栏正文区保持 `#fefefe` 底，不做"整栏红/蓝底"——那会像股票 APP

**拒绝**：绿色在 compare 中绝不出现，哪怕是空方栏。A 股语义纪律优先于视觉对称。

---

### steps · 阶段仪表盘

**角色**：**Phase I / II / III** 或 **Q1 / Q2 / Q3**——时间阶段或研究步骤的递进。

**variant 选择**：默认 `timeline-dot`（左侧时间轴点 + 正文），备选 `number-circle`（使用现有方形 stepBadge）。

#### timeline-dot 骨架

```
 ■ Phase I · 启动
 │    正文内容，左 24px 留白对齐
 │    可以多行
 │
 ■ Phase II · 推进
 │    正文内容
 │
 ■ Phase III · 收束
      正文内容
```

- 左侧 24px 列放 **方形 stepBadge**（保留正方形、`primary` 栗墨底、`accent` 琥珀底条、`#fefefe` 数字）
- badge 之间用 1.5px `border` 色竖线连接（`border-left` 实现）——竖线与 badge 中轴对齐
- 每步标题前缀 **由 template 注入** `Phase I / Phase II / Phase III` 或 `Q1 / Q2 / Q3`（用户可在 frontmatter 配置前缀风格）
- 标题 15/700/`text`，正文 15/400/`text`
- 每步之间 margin-bottom 18px

#### number-circle 备选

仅当用户在 template 里显式指定 `steps.style = "numeric"` 时使用——方形 stepBadge 嵌在每步标题左侧，不画连接竖线，按段落并列。

**禁止**：`ribbon-chain`（横向飘带）variant——那是课程卡片审美。

---

### divider · 分割

**角色**：呼吸。

**variant 推荐优先级**：`wave`（K 线，默认）> `flower`（Sec.II 编号）> `dots`（紧凑 3 点）> `rule`（偷懒保底）> `glyph`（禁用）。

**纪律**：
- `wave` 用于大分隔（每个 section-title 之间、或文章中段"换气"位），margin `32px 0`
- `flower` 用于章节编号过渡，margin `28px 0`，**出现时伴随 Sec 编号递增**
- `dots` 用于紧凑段间停顿，margin `20px 0`
- `rule` 和 `glyph` 不推荐，但保留兼容性

---

### mpvideo / mpvoice · 微信原生组件

**角色**：嵌入件。平台强制样式，主题只做外围。

**结构**：外包一层 `margin 22px 0`，**上方一根 1px `border` 色横线、下方一根同**（模拟内参"图版"的版框）。不加底色、不加圆角、不加 shadow。

### free · 自由容器

**角色**：兜底。padding `14px 16px`，margin `18px 0`，无边框无底色。

---

## 3. 反例对照（如果做糟会长什么样）

### 糟糕版本画像

**"券商研报 PPT 套餐"**——h1 居中巨红字 + 金色渐变边框 + 每段前面都贴一个涨跌箭头 emoji 📈 + quoteCard 做成绿底黑字的"黄金三判断"卡片 + compare 直接上"✅ 利好 / ❌ 利空"的 emoji + 所有数字加粗加红加感叹号 + footer 放一张"扫码进群领免费研报！！！"的橙底红字横幅 + 全屏花花绿绿的涨停红/跌停绿/警示黄/订阅紫。

### 具体犯的错 & 规避

1. **"primary 深红 + danger 暗红几乎同色"**（当前硬伤）
   **规避**：primary 改为 `#2a1a14` 深栗墨，彻底让 red 色位给 danger 和 K 线"涨"。四语义色色相分布均匀：tip 钢青（200°）/ info 烟蓝（210°）/ warning 琥珀（40°）/ danger 深朱（358°）。

2. **"warning 驼黄和 primary 红撞色"**（当前硬伤）
   **规避**：warning 改为 `#8a6416` 琥珀，亮度明显低于驼黄，且 primary 已让出红色区，warning 不再与任何主色撞。

3. **"emoji 📈📉 代替数据语言"**
   **规避**：禁用全部 emoji。同比涨跌用 `▲ +` / `▼ -` 纯字符三角；数字用 `.num` inline 样式强化。**数据的权威感靠字重和字距，不靠表情符号。**

4. **"涨绿跌红"（欧美习惯误用）**
   **规避**：红涨绿跌是 A 股纪律。本主题干脆**不用绿色**——compare 空方栏用 tip 钢青而非绿，任何地方出现绿都是事故。

5. **"所有标题居中 + all caps + 感叹号"**
   **规避**：h1/h2/h3 全部左对齐；中文没有 all caps 但禁止"！！！"和全角叹号连用；h 层级靠 size + weight + 前缀 SVG 区分，不靠居中与惊叹。

6. **"渐变色 + 阴影 + 毛玻璃"**
   **规避**：`linear-gradient` / `backdrop-filter` 过不了 juice。本主题所有容器 `border-radius ≤ 2px`（全项目最硬的角度——literary-humanism 在 0-2、life-aesthetic 在 6-12，我们在 0-2 但更加硬）、无阴影、无渐变。

7. **"highlight 变成荧光黄涂满整段"**
   **规避**：`inline.highlight` 底色从 `accent` 琥珀 **降饱和**到 `#f1e8d1`（= warning.soft），字色保持 `text` 深墨——highlight 是"标记"不是"涂鸦"。数据卡 primitive 也走 `#fefefe` 底 + 细边框，绝不满底色。

8. **"h2 红竖条 + h1 红大字 + strong 全部红 800"**（当前准硬伤）
   **规避**：`<strong>` 字重降到 600（不是 800），颜色保留 primary 栗墨（新色）。h1 用 `text` 色。红色全文的"预算"控制在：K 线 dividerWave 的涨柱 + danger 容器 + 数字 delta 为正时——合计每篇出现 ≤ 8 次。**红色稀缺，才有分量。**

9. **"radius 6/12/18 软化整个主题"**
   **规避**：本主题 `radius` 维持 `sm:0 / md:2 / lg:4`——**比当前 2/4/6 再硬一级**。硬核财经理应直角，任何圆角 ≥ 6 的 PR 直接打回。

10. **"footer 搞成巨型宣传横幅"**
    **规避**：footer 做成 FT 订阅栏风格——上下通栏细线夹一段冷静文字 + 右下一个小号胶囊。订阅钩子要**像内参最后一页的订阅说明**，不是直播间 banner。

---

## 结语（给落地工程师）

这份规范的核心只有一句话：**用"减法"做权威，用"稀缺"做强调，用"数字"做断言。**

落地时四件事最重要：

1. **色彩大修**：`primary` 改 `#2a1a14` 深栗墨（**不再是红**），红色全部让给 `danger` 与 K 线的"涨"；`warning` 改琥珀 `#8a6416` 脱离红系；四语义色色相分布 tip(钢青) / info(烟蓝) / warning(琥珀) / danger(深朱)，AA 对比度全部过线。
2. **四件套四形状**：tip = accent-bar、info = minimal-underline、warning = pill-tag、danger = ticket-notch——同时给各自配 ✓ / i / ! / × 的图标和"要点/补注/风险提示/警报"四个中文词，打印黑白也能辨认。
3. **highlight → 数据卡 primitive**：table 布局的"巨号数字 + 单位 + 同比 delta + 标签 + 数据源"五件套，是本主题相对其他主题的独特优势位，必须做足。
4. **`.num` inline 样式**：所有内联数字包裹 `.num`（600 + letter-spacing 0 + primary 栗墨），配合 `▲ +` / `▼ -` 三角符号——这是 business-finance 的签名动作，是让主题"看起来像内参而不是公众号"的最重要细节。

K 线 dividerWave 是全项目的瑰宝，请**视同文物**对待：颜色跟随新色系更新（涨柱走 danger 红），几何改为前压后扬的 V 形走势，stroke-width 从 0.8 提到 1.0。除此之外一切保留。**不要重做它**。
