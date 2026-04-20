# Default · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**default 的人格是"有意识的中立"——不是没有主张，而是对所有题材保持公平。** 参照坐标：Medium 默认阅读视图、Notion 默认块样式、Substack 未定制版面、MDN Web Docs 未登录默认态、Apple Human Interface Guidelines 文档页、Reader's Digest、《读者》《南方周末》的普适中文排版。气质关键词：**中性、准确、得体、可用、不抢戏、不偷懒**。

**拒绝坐标**写死在纸面上，任何时候违反都算事故：
- 拒绝**"企业官网"灰底 + 鲜蓝 Banner**——Bootstrap `#007bff` 与一切 Sass primary 蓝
- 拒绝**"Word 默认样式"**的廉价文档感——Calibri 味、黑字纯白、Word 灰边框表格
- 拒绝任何承诺某种题材气质的装饰语汇——古籍云纹（literary 已占）、器皿几何（life 已占）、K 线/账本（business 已占）、终端 `§`/`// NOTE`（tech-geek 已占）、drop cap/罗马数字/巨引号（people-story 已占）、定理框/QED/上标数字（academic 已占）、Issue stamp/观察卡（industry 已占）
- 拒绝**"最安全"的 emoji** 🎯 📌 ⚠️ 💡——在 default 里任何 emoji 都会立刻把版面拉到小红书审美
- 拒绝**渐变、阴影霓虹、毛玻璃、圆角 16px 以上**——这些是"Bootstrap 模板温柔化"的全部作案工具

**与其他七套主题的一句话区分**：它们是**"committed 人格"**，每套都在押注一种编辑部气质；**default 是"出厂状态"**——押注"任何稿子贴上去都成立"，拒绝成为第八种气质。这是完全不同的产品岗位。

**一句话收束**：default 应该让读者觉得"这是一份被认真排过的稿子，但我说不出它是哪家刊物的风格——它就是'一篇公众号文章'该有的样子"。只有用户在 committed 主题里挑不出来时，才会落到 default；而落到 default，不能让人感到"被迫接受了兜底"。

---

## 为什么 default 最难做（必须先讲清楚）

在我接到的这八个槽位里，default 是**设计难度最高的一个**，不是因为它要装饰多、而是因为它必须**主动放弃**其他七套主题的所有签名动作，却又不能显得"什么都不是"。

committed 主题的设计路径是"加法"——选一个参照坐标（Kinfolk、Nature、Stratechery），取它的底色、字距、装饰母题，把它翻译成公众号能落地的版本就行。**default 的设计路径是"减法"**——它要知道哪些加法在业内是对的，然后**一条一条地选择不做**，而且每一条"不做"都要有理由。

这里最容易翻车的地方是"以为中立就很简单"。真相完全相反：**中立是一种高度自觉的选择**。它要求设计者对所有已占位的气质都有识别力，才能在自己的版面上把它们**精确地剔除掉**。一个没训练过的人做"中立"，做出来的不是 Medium 默认视图，而是 Word 默认样式——那是懒、不是中立。懒的 default 比坏的 committed 还糟糕，因为它会污染整个主题矩阵的品牌 voice。

所以这份规范通篇的口气会比其他几份更"克制"也更"防御"。很多章节不是在讲"我们要做什么"，而是在讲"我们为什么不做那个"。请所有下游 agent 在实现时对齐这条气口：**default 的每一处克制都是训练出来的，不是懒出来的**。

---

## 1. Persona 三件套

### 1.1 Color story

#### 当前 default tokens 的诊断

当前配色（primary `#2d6fdd` 鲜蓝 + secondary `#1f3b70` 深蓝 + accent `#ff7043` 暖橙 + bg `#ffffff` 纯白）有三个结构性问题，每一个都指向同一种错误：**"以为中立 = 用最常见的配色"**。

1. **primary `#2d6fdd` 太像 Bootstrap 默认蓝 `#007bff` / Material `#2196f3`**。任何读者看到这个色，潜意识都会把稿件定位成"企业官网文档"或"程序员博客"。它不是坏色，但它**有出处**——而 default 的纪律是**没有出处**。
2. **accent `#ff7043` 暖橙多余**。default 用不到一支饱和度 70% 的强点缀色；它的整套语义色 + primary 已经覆盖了所有需要被强调的位置。一支 accent 存在就意味着它"必须找地方用"，而 default 一旦开始"找地方用 accent"，就离开了中立。
3. **secondary `#1f3b70` 深蓝和 primary `#2d6fdd` 鲜蓝同色相不同明度**——这是 Bootstrap 那种"一族蓝色"的配色套路，但 default 不需要分 primary/secondary 两档蓝，**一档就够**。

#### 新色值提案（Token 表）

核心决策先写在最上面：
- **primary 选编辑蓝 `#2558b0`**——不走 Bootstrap 鲜蓝、不走深石墨 `#2a3140`
- **secondary 降格为中性灰阶**，不再是"第二种蓝"
- **accent 字段保留（接口兼容），但取值与 primary 相同**——"语义 accent"从视觉系统里被移除

| token | 旧值 | 新值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|---|
| `bg` | `#ffffff` | `#fdfdfc` | 微暖白 | 比纯白让出 1% 暖度。纯白在公众号 SVG 光栅化里会偶发"白→透明"；微暖白 `#fdfdfc` 规避这一点，同时给长读体带一丝纸感——但比 literary `#f4efe3` 凉、比 people-story `#f2efe7` 暖，**不偏科**到任何一侧 |
| `bgSoft` | `#f7f8fa` | `#f5f5f3` | 浅灰米 | 当前 `#f7f8fa` 偏冷（Bootstrap-body-bg 味），改到中性偏 0.5% 暖的 `#f5f5f3`——与 bg 差 3%，足以识别容器边界，不至于"贴条" |
| `bgMuted` | `#eef1f6` | `#eceae4` | 深浅灰米 | 同路线再深一档，给 code inline 底、compare 表头用 |
| `text` | `#1f2328` | `#1c1f24` | 中性墨 | 微调更冷更深一档。仍避开 literary `#1f1b14` 的暖黑、避开 people-story `#17171a` 的蓝黑、避开 academic `#16181d` 的冷墨——取三者的几何中点 |
| `textMuted` | `#6a737d` | `#636870` | 中性灰 | 同路线微调 |
| `textInverse` | `#ffffff` | `#fefefe` | 反白 | 平台纪律。与 business/academic 对齐 |
| `primary` | `#2d6fdd` | `#2558b0` | 编辑蓝 | **关键决策**：把"Bootstrap 鲜蓝"压到"Medium/Economist 链接蓝"。`#2558b0` 是 Medium 阅读视图链接色、Economist 文内链接色、MDN 未登录默认态链接色的**共同家族**——它仍然是蓝，但饱和度从 75% 降到 55%、明度从 55% 降到 42%，彻底脱离"SaaS 官网 Hero CTA"的戳印 |
| `secondary` | `#1f3b70` | `#8a8f98` | 中性石墨 | **关键改动**：secondary 不再是"另一种蓝"，退回到纯灰阶。理由见下文"为什么削减 accent 和 secondary" |
| `accent` | `#ff7043` | `#2558b0`（= primary） | 编辑蓝 | **关键改动**：字段保留（types.ts 要求 `accent: string` 必填），但**取值与 primary 一致**——等于在视觉语言里把 accent 作为独立变量**删掉了**。任何引用 `accent` 的地方读到的都是编辑蓝，不会出现"第三种彩色"。这是 default 的签名动作——**不加、而是退** |
| `border` | `#e1e4e8` | `#d8d8d4` | 细线灰 | 微暖、饱和度再压一档。让 1px 细线看起来像"铅笔勾过的轮廓线"，不像"CSS border 的默认灰" |
| `code` | `#d63384` | `#1c1f24`（= text） | 中性墨 | **拒绝让 code 承担颜色**。default 的 code 是"一段被引用的字符串"，不是"一块醒目的彩色装饰"——深墨字 + 浅灰米底就够了 |

#### 为什么 primary 选编辑蓝 `#2558b0` 而不是深石墨 `#2a3140`

我在这两个方案之间犹豫过。**深石墨**的吸引力在于它"更没出处"——接近黑但不是黑，几乎没有色相，绝对中立。但最终选编辑蓝，理由三条：

1. **链接色这一位置必须有色相**。在公众号里 `<a>` 必须与正文文字明显拉开，而正文已经是中性墨 `#1c1f24`——如果 primary 也是深石墨，二者明度只差一档，链接的可见性会变差。AA 对比度可以过，但"一扫就看到链接"的直觉会丢。default 以"可用性"优先，这一档必须让渡给蓝。
2. **编辑蓝比深石墨更有"出版物基因"**。Medium、The Economist、MDN 等的链接蓝都是这个家族——它已经是全球阅读网络里"链接 = 蓝"的视觉契约。default 作为出厂状态，应当尊重这个契约，而不是标新立异。
3. **编辑蓝与已占位的所有主色都有明确距离**：business 深栗墨（暖黑）、academic 正刊深靛 `#1e2c4a`（深一档蓝）、industry 深墨蓝 `#24364f`（也深一档）、tech-geek VT220 琥珀（黄）、literary 宋椠褐（褐）、life 陶土（褐）、people 深墨靛（蓝黑）。`#2558b0` 是**比 academic/industry 明度更高、比所有蓝系主题都更"链接色"的蓝**——它不是结构色，它是"可点击"色。

深石墨方案可以作为未来 `default-mono` 兄弟主题的备选，但首版 default 必须是编辑蓝。

#### 为什么削减 accent 和 secondary

committed 主题里，secondary 和 accent 各自承担一个叙事任务——business 的 accent 琥珀是数字色、life 的 accent 亚麻线是中性高光、industry 的 accent 橙金是断言信号。**每一支 accent 都对应一个"这个主题必须有的角色"**。

default 的问题是：**它没有"这个主题必须有的角色"**。它不讲述金融、不讲述人物、不讲述工程、不讲述学术——所以它也**不需要**一支有专属职能的强点缀色。硬要配一个 accent，只会出现两种后果：要么它没地方用，闲置在 token 里；要么实现 agent 会"找地方用"，把它塞进 pull-quote/issue stamp 之类的位置，瞬间让 default 开始"像某一种主题"。

同理，secondary 不再承担"第二主色"。它在 default 里的新职能是**纯灰阶辅色**——用于 caption、byline、次级 label、次级边框。这意味着 default 的视觉系统从"primary + secondary + accent"**三色变两色**（蓝 + 灰阶）——更像 Notion/Medium 的实际做法，也让 default 在 8 套主题里**用色最少**，与其"出厂中立"的定位对齐。

#### 语义色（tip / info / warning / danger）

这是 default 最需要保持"寡淡一档"的地方。纪律三条：

1. **四色走 AA 标准，但每色都比它在任何 committed 主题的同色**——**更冷、更灰、更 Bootstrap-alert 的保守版本**。default 的语义色应该是"教科书给的那个版本"——不是"学术克制版"（academic 已经占）、不是"厨房实物版"（life 已经占）、不是"内参 alert"（business 已经占），就是**"最寡淡的那个版本"**。
2. **soft 底与 bg `#fdfdfc` 的明度差严格控制在 5-8%**——识别容器靠 3px 色条形状 + 图标，而不是"底色跳出来"。
3. **accent 色仅用于 3px 左边色条 + 图标填色**，不用于 label 文字底色、不用于外框——形态统一，颜色轻量（见 §2 tip/info/warning/danger 展开）。

| 语义 | accent（3px 色条 + 图标） | soft（容器浅底） | 对比度（accent on `#fdfdfc`） | 角色名 |
|---|---|---|---|---|
| tip | `#1f8a4c` | `#eef6ef` | 4.9:1 | **提示** |
| info | `#2558b0`（= primary） | `#eef2f9` | 8.2:1 | **信息** |
| warning | `#9a6b1a` | `#f7f0df` | 5.1:1 | **注意** |
| danger | `#b42318` | `#fbecea` | 5.6:1 | **危险** |

**对比坐标**：
- tip 绿 `#1f8a4c` 比 life-aesthetic 的菜叶绿 `#6f8268` 更饱和、更"标准"、更不挑稿——对齐 Bootstrap `alert-success` 的家族，但降一档饱和度
- info 蓝直接 = primary `#2558b0`——default 的"info = 主色"合并是结构性的经济处理，不是巧合
- warning 黄棕 `#9a6b1a` 比 tech-geek `#d4a65a` 琥珀更暗更土、比 literary `#8a6428` 商榷黄更饱和——就是"标准 warning 黄"本身
- danger 红 `#b42318` 比 academic 勘误红 `#8a2a2a` 鲜一档、比 business 警报红 `#9a1b20` 正一档——对齐 Bootstrap `alert-danger` 家族

每一档都是"最标准的那一版"——这不是抄袭 Bootstrap，而是**尊重全球 Web 十几年建立起来的语义色契约**。default 的身份决定它不能发明新的 alert 色。

#### 拒绝什么（default 版本的"拒绝色"很特别——它拒绝的是"各主题已占色"）

- **拒绝 `#007bff` / `#2196f3` 鲜亮 Bootstrap 蓝** → 改走 `#2558b0` 编辑蓝
- **拒绝 `#ff7043` / `#ff6b35` 暖橙**（industry-observer 橙金、tech-geek HN 橙已占）→ default 不做第三种橙
- **拒绝 `#5a4a3a` 宋椠褐、`#9c6b4f` 陶土褐、`#2a1a14` 深栗墨**（literary / life / business 已占）→ default 的深色位由中性墨承担，不走褐
- **拒绝 `#1e2c4a` 正刊深靛、`#24364f` 深墨蓝、`#1b2330` 深墨靛**（academic / industry / people-story 已占）→ default 的蓝位走明度更高的 `#2558b0`，一眼可辨
- **拒绝 `#d4a65a` VT220 琥珀**（tech-geek 已占）→ default 不走琥珀
- **拒绝 `#8a3f2b` 深铁锈**（people-story 已占）→ default 不做"人物色"
- **拒绝任何渐变、任何金色、任何莫兰迪雾系、任何荧光**
- **拒绝 `#fff3b0` 当前 highlight 的饱和荧光黄**——改走 `#fff4c8` 一档更淡的米黄（见 §1.3 inline）
- **拒绝 `#282c34` 当前 pre 的 Atom One Dark 底**——这是 IDE 血统，default 的 pre 走中性深灰 `#2a2d32`，不沾任何 IDE 调色板出处

---

### 1.2 Typographic voice

default 的字体节奏纪律一句话就能讲完：**没有签名动作**。其他七套主题各自有一手"一看就认识"的排字手法——literary 的 2.0 行高 + 3px 字距、life 的 h1 28px/500/4px 展签、business 的 `.num` 数字内联、tech-geek 的等宽琥珀、people-story 的 drop cap、academic 的 `<em>` 替 `<strong>`、industry 的 issue stamp byline。**default 必须一条都不做**。

这不是 design constraint，是 product constraint——签名动作意味着"偏科"，而 default 是兜底，偏到任何一科都是失败。

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（文章标题） | 22 | 700 | 0.3px | 1.45 | `text` | **比 business 26px / literary 26px / life 28px 都小**。default 的 h1 不吼——它预设自己不是封面，只是文章标题 |
| h2（章节标题） | 19 | 700 | 0.3px | 1.5 | `text` | **比 literary 19 / business 21 / academic 20 都小或同档**，但字距完全不拉。前缀 SVG 单竖条（见 §1.4）+ 10px 内间隔，不走双竖条、不走色条 + 横线混搭 |
| h3（小节标题） | 16 | 700 | 0.2px | 1.55 | `text` | **与正文同号**。不加前缀、不加下划线。h3 靠字重 + margin 区分——这是最普适的做法，也是 Medium 默认视图的 h3 做法 |
| p（正文） | 15 | 400 | 0.3px | 1.75 | `text` | 保留当前 15 / 1.8 的方向，行高微调到 1.75（1.8 是 literary 的 2.0 家族下限，1.75 是"Notion 默认"的值）。字距 0.3px——比 tech-geek 的等宽字距窄、比 literary 的 1px 书斋字距窄 |
| small（附注） | 13 | 400 | 0.2px | 1.6 | `textMuted` | 脚注、版权、日期——没有任何额外处理 |
| pull-quote（引用文字） | 17 | 500 | 0.3px | 1.7 | `text` | **刻意压到几乎不"pull"**——只比正文大 2px、重一档。default 的引用不做 pull-quote 的大字号戏剧化（那是 literary 22px / business 20px / industry 签名动作）——它就是"比正文稍显眼一点的引用"而已 |

#### "没有签名动作"的纪律陈述

以下列表是 default **不会做**的事，每条都对应一个已被占位的签名。任何实现如果触发了下列任一条，就是越界：

1. **不做 drop cap**——people-story 的签名。default 的 intro 首字不下沉、不放大、不染色。
2. **不做大字距标题**（letter-spacing > 1px）——literary 的签名（3px）、life 的签名（4px）。default 所有标题字距 ≤ 0.3px。
3. **不做罗马数字章节号**（I / II / III）——people-story 的签名。default 的 sectionTitle 不编号，或使用阿拉伯数字 1 / 2 / 3。
4. **不做 tabular 数字**（`.num` 内联）——business 的签名。default 正文里的数字就是普通文字，不加任何 inline 类。
5. **不用 `<em>` italic 替代 `<strong>` bold**——academic 的签名。default 的 `<strong>` 就是 700 bold + text 色，`<em>` 就是 italic + text 色，两者各司其职、互不替代。
6. **不用等宽字的叙事气质**——tech-geek 的签名。default 的 `<code>` 和 `<pre>` 作为"被引用的字符串"存在，不参与文风建构。
7. **不做 byline 分隔符 · 或 ––**——people-story 签名（serif bullet）、industry 签名（issue stamp）。default 的 author 行就是 `姓名 / 日期`，用斜线分，不做专属分隔符。
8. **不做巨号装饰引号 SVG**——literary、people-story、industry 都在 quoteCard 里用了各自的引号动作。default 的 quoteCard **不放引号 SVG**，靠"浅色块 + 细左边框"承担引用语义。
9. **不做 2.0 行高**——literary 的签名。default 行高 1.75 封顶。
10. **不做首行缩进 `text-indent: 2em`**——传统中文排版动作，但任何一套 committed 主题里出现都会被读成"那一种气质"。default 的段落齐左，段间用 18px margin 区分。
11. **不做 All Caps 英文标题**（text-transform: uppercase）——杂志签名。default 英文按原文大小写呈现。
12. **不做上标 `<sup>` 脚注数字**——academic 的签名。default 的脚注（如果出现）就是括号里的数字 `(1)`。

这份清单看起来像"一直在说不"——对，default 的 typographic voice 就是由这 12 条"不"构成的。它的正向主张只有一条：**把每个级别都压到"这个平台上的中位数"**。中位数不是平庸，它是在清楚所有极端选项之后的一种自觉定位。

---

### 1.3 Inline 强调

`inline.highlight` / `inline.wavy` / `inline.emphasis` 三支在 default 里走最保守的做法：

| inline | 当前值 | 新值 | 理由 |
|---|---|---|---|
| `highlight` | `#fff3b0` 底 + 原色字 | `#fff4c8` 底 + `text` 字 + `padding: 0 3px` + `border-radius: 2px` | 比当前饱和度降一档；接近 Notion `<mark>` 的浅米黄。不走 life-aesthetic 的"亚麻线"米灰、不走 business 的琥珀黄 |
| `wavy` | underline-wavy + `accent` 橙 | underline-wavy + `primary` 编辑蓝 + `text-underline-offset: 3px` | 波浪下划线保留（这是 CSS 支持的最轻装饰），但颜色从当前橙收回到 primary 编辑蓝——不引入第三种颜色 |
| `emphasis` | primary + 600 | primary + 600 | 保留——这是"关键词强调"的最通用做法 |

---

### 1.4 SVG motif（3-4 件最少化）

其他主题 assets 里通常有 6-10 件 SVG。**default 故意只保留 4 件**——这是 default 的设计签名之一：**少即是多**。

以下是"保留清单"，列出保留的 4 件 + 需要从当前 assets 中**删除**的 1 件。

#### 保留 1：h2Prefix · 单竖条

**文字草图**：一条 3px 宽、20px 高的主色竖条，`display: inline-block` + `vertical-align: middle` + `margin-right: 8px`，跟在 h2 文字左侧。

**尺寸**：`viewBox="0 0 3 20"`，width 3 / height 16 输出。

**填色**：`primary` 编辑蓝 `#2558b0`，无透明度、无第二根辅条。

**为什么简化**：当前 h2Prefix 是"主竖条 4px + 辅竖条 3px opacity 0.6"的双条结构——这个结构来自工业图表/仪表盘美学，放在 business-finance 里非常合适（那里已采用类似的竖条 + 短横的组合）。在 default 里，双条会**把稿子往"行业报告"方向偏**。单条是最中性的解法——Medium 的 h2 左侧就是单根色线。

**删去**原 `<rect x="7" y="4" width="3" height="14" opacity="0.6"/>` 辅条。

#### 保留 2-4：dividerWave / dividerDots / dividerFlower · 三档装饰强度

这三件分割线保留，但**每件都退一档装饰强度**——default 的分割线要比 committed 主题的同类更"手松"，像是"我放了一条线在这里，但不特别想被注意到"。

##### dividerWave（波浪）

**草图**：240 × 12 画布，单根正弦波，色 `border` `#d8d8d4`，stroke-width 1.2。

**改动**：当前 stroke-width 1.5 降到 1.2；不使用 primary 色（当前 SVG 也是 border 色，保留即可）。

**用途**：主要用在 `divider` 容器。

##### dividerDots（点阵）

**草图**：240 × 8 画布，**3 个** 2px 半径的圆点，水平居中等距排列（x=96/120/144），色 `border`。

**改动**：当前是 4 个圆点（x=60/100/140/180）——改到 3 个且更靠中间。4 点密度已经接近"虚线分割"的节奏，3 点才是"三颗排布"的装饰节奏。视觉更疏朗、更中性。

**用途**：`divider` 容器变体。

##### dividerFlower（菱花）

**草图**：240 × 10 画布，两条 1px 水平细线分列两侧（0-110 和 130-240），**中间仅留一个 3px 半径的圆点**（x=120, y=5），色 `border` + primary 圆点。

**改动**：**去掉当前的中央菱形** `<path d="M120,2 L124,9 L120,16 L116,9 Z"/>` + 两侧小辅助点——只保留一个居中圆点。当前 SVG 的菱形有"中国结装饰"的隐含联想，去掉后就是纯粹的"两条线 + 一个点"——这是全球出版物里最通用的 ornamental break（Medium/Substack 就是这么做的）。

**用途**：`divider` 容器变体，较正式场合。

#### 保留 5（可选）：sectionCorner · L 形角标

**草图**：`viewBox="0 0 14 14"`，L 形 2px 描边轮廓（不填色的 stroke 版本），色 `primary`。

**改动**：当前 SVG 是 4px 粗的实心 L 形——改到 **2px 细描边**（`fill="none" stroke="${primary}" stroke-width="2"`）。当前的粗实心 L 形有"财经报告角标"的暗示（industry-observer 的观察卡角标也是这个路数）——细描边版本更像 Notion/Substack 的可选列表标记，中性得多。

**用途**：仅当 `variants.sectionTitle === 'cornered'` 时使用。在 default 里建议仍走 `bordered` 作为主变体，`cornered` 只作备用。

#### 保留 6：stepBadge · 实心圆 + 白字

**草图**：直径 24px 实心圆（`circle r=11`），填 `primary`，内置 `<text font-size="14" fill="#fefefe">` 数字。

**改动**：font-size 从 15 降到 14（仍满足光栅 ≥ 14 的平台下限）——让徽章感更小更"步骤标签"而不是"大号编号"。其余保留。

**用途**：`steps` 容器。这是最通用的步骤徽章，保留。

#### 删除：quoteMark

**判决**：**从 assets 中删除 `quoteMark`**。当前的双引号 SVG（两组带透明度的现代引号字形）在 default 里**无用且有害**——literary 有朱砂钤印引号、people-story 有巨号 serif 引号、industry 有断言引号、academic 虽然不用引号但用定理框语义替代。default 在 quoteCard 上**故意退回到"纯色块 + 细左边框"**（见 §2 quoteCard），不放任何引号装饰。

这是 default 的一次主动放弃——**删比加贵**。

#### 禁止新增的 motif

以下装饰**绝对禁止**出现在 default assets 里，因为每一件都已经被 committed 主题占位：

- 古籍云头 / 回纹 / 钤印印章 · literary
- 器皿几何 / 叶片花瓣 / 针脚线 · life-aesthetic
- K 线折线 / ledger 账本条 / `.num` 数字装饰 · business
- 终端 `§` / `// NOTE` 注释前缀 / manpage footer 横线 · tech-geek
- Drop cap 装饰框 / 巨号 serif 引号 / 瘦细 column rule / 罗马数字 · people-story
- 定理框 ■ / QED ■ / 上标数字 `¹²³` · academic
- Issue #XXX stamp / 作者头像圆框 / 观察卡角标 / byline 分隔 · industry-observer

**也禁止新增**：任何 emoji 式的图标（🎯 📌 ⚠️ 💡）、任何"最安全"的通用图标（齿轮 / 灯泡 / 放大镜 / 对勾圆圈）——这些在 default 里会立刻把版面拉到 PPT 模板审美。

---

## 2. 19 个 container 的视觉差异化方案

default 的命名纪律：**不玩术语游戏**。intro 就叫"导语"、tip 就叫"提示"、warning 就叫"注意"——不做"批注/商榷/案语/校勘"（literary）、不做"要点/风险提示/警报"（business）、不做"// NOTE / // CAVEAT"（tech-geek）。读者看到 default 的 container label，脑子里出现的就是最通用的那个词。

以下 19 个 container 每个给出**角色命名 / 结构草图 / 数值 / motif 使用**。多个容器共享骨架时合并讲述。

### 2.1 intro（导语）

- **角色**：导语
- **结构**：`bgSoft` 浅灰米底 + 6px 圆角 + padding 14px 16px + margin 18px 0
- **文字色**：`textMuted` 中性灰
- **motif**：无
- **备注**：首字**不**下沉（这是 people-story 的签名）；段落齐左、无缩进；行高 1.7（比正文 1.75 略紧凑，标示"这是一段概括"）

### 2.2 author（作者）

- **角色**：作者
- **结构**：`bgSoft` 底 + 6px 圆角 + padding 12px 14px + margin 16px 0
- **内容骨架**：`姓名 / 日期`（斜线分隔，不做 · bullet，不做 byline 分隔符）
- **字号**：13px + `textMuted`
- **motif**：无
- **备注**：**不放作者头像圆框**（industry 的签名）；**不放"by"前缀**（people-story 的杂志感签名）

### 2.3 cover（封面）

- **角色**：封面
- **结构**：
  ```
  ┌──────────────────────────────┐
  │     [Cover 图片 · 16:9]      │
  ├──────────────────────────────┤
  │   文章标题（22px / 700）    │
  │   副标题（16px / 400 / muted）│
  │   作者 / 日期（13px / muted） │
  └──────────────────────────────┘
  ```
- **数值**：图 100% 宽 + border-radius 6px；标题 margin-top 14px；整块 margin 20px 0
- **motif**：无——封面不加任何装饰 SVG。这一点和其他七套都不同（industry 在这里会贴 Issue stamp、people-story 会走深底封面）
- **备注**：default 的 cover 是"最普适的封面"——一张图 + 一行标题 + 一行作者信息，结束

### 2.4 sectionTitle（章节标题）

- **角色**：章节
- **结构（variant = bordered，主变体）**：文字 19px/700 + `padding-bottom: 6px` + `border-bottom: 2px solid primary`
- **结构（variant = cornered，备用）**：L 形细描边 SVG + 文字，不加下划线
- **margin**：24px 0 12px
- **motif**：h2Prefix 单竖条（仅当 sectionTitle 承载 h2 语义时）；或 sectionCorner 细 L 形
- **备注**：**不编号**——不做罗马数字（people-story 占）、也不自动加阿拉伯数字前缀。章节编号由作者在文字里自己写

### 2.5 quote（正文引用 blockquote）

- **角色**：引用
- **结构**：`border-left: 3px solid primary` + `bgSoft` 底 + padding 12px 16px + margin 18px 0 + border-radius 4px
- **文字色**：`textMuted`
- **motif**：**无**——default 的 blockquote 不放 quoteMark SVG
- **备注**：当前 default 的 blockquote border-left 是 4px，改到 3px——更细、更不抢戏

### 2.6 quoteCard（引用卡片）

- **角色**：引用卡
- **结构**：
  ```
  ┌──────────────────────────────┐
  │ │ 引用文字（17px / 500 /     │
  │ │ text 色 / 居中 / 1.7 行高）│
  │ │   —— 来源（13px / muted） │
  └──────────────────────────────┘
  ```
  左侧 3px `primary` 编辑蓝细边（`border-left: 3px solid`），`bgSoft` 浅底，padding 18px 20px，margin 22px 0，border-radius 6px
- **motif**：**无引号 SVG**——这是 default 对 quoteCard 的核心纪律。literary / people-story / industry 都在这里放了各自的引号动作，default **故意留白**——让 quoteCard 靠"色块 + 细边框 + 居中文字"成立
- **来源行**：全角破折号 `——` 前缀 + 作者/出处名，字号 13px + `textMuted`——这是最通用的中文引用来源标注，不做 byline 分隔符

### 2.7 tip（提示）

- **角色**：提示
- **结构**：
  ```
  ┃ [icon] 标题
  ┃ 正文内容段
  ```
  `border-left: 3px solid tip.accent #1f8a4c` + `bgSoft = tip.soft #eef6ef` + padding 12px 14px + margin 16px 0 + border-radius 0 4px 4px 0（仅右侧圆角，左侧色条直边）
- **标题**：`tip.accent` 绿 + 700 + 15px + 内置 tipIcon SVG（圆圈 + i 字形，色 = accent）
- **正文**：`text` + 400 + 15px
- **motif**：tipIcon（保留当前 SVG，stroke 色跟随 accent）

### 2.8 info（信息）

**与 tip 同骨架**，仅换色：
- border-left 色 = `info.accent = primary #2558b0`
- soft 底色 = `info.soft #eef2f9`
- 图标 = infoIcon（圆圈 + i）

### 2.9 warning（注意）

**与 tip 同骨架**，仅换色：
- border-left 色 = `warning.accent #9a6b1a`
- soft 底色 = `warning.soft #f7f0df`
- 图标 = warningIcon（三角形 + ! ）

### 2.10 danger（危险）

**与 tip 同骨架**，仅换色：
- border-left 色 = `danger.accent #b42318`
- soft 底色 = `danger.soft #fbecea`
- 图标 = dangerIcon（实心圆 + 白色横线）

#### 四态"故意同形"的纪律陈述（这是 default 的关键决策）

business 的 warning 变成 ticket-notch、tech-geek 的 warning 变成 `// CAVEAT` 注释前缀、academic 的 danger 走"Fallacy."标签形、life 把 tip 变成青瓷叶片——**每一套 committed 主题都会在四态里做形状变化**，来强化自己的气质签名。

**default 故意反其道而行**——四态使用**完全相同的骨架**（左侧 3px 色条 + 浅底 + 图标 + 标题 + 正文），**只靠色相区分**。

这不是懒，这是 default 的身份陈述——它是"**所有场景下的最小公分母**"。当 default 的用户不确定稿子是科普、教程、还是感悟时，tip/info/warning/danger 四态不应该"额外提供一层气质"；它们应该**退到一个对所有语境都成立的形态**。

左 3px 色条 + 浅底 + 图标是 GitHub / Notion / Medium / Stack Overflow / MDN **共同使用的那个形态**——它不属于任何一家，它属于整个 Web 的"admonition 契约"。default 尊重这个契约。

形状同一、颜色轻量，但**颜色语义不妥协**：tip 绿 / info 蓝 / warning 黄 / danger 红——这四种色相-语义绑定是全球软件界的共识（Windows / macOS / Linux GUI、HTML spec、WCAG 都如此）。default 在语义色相上保持"标准绑定"，在形态上保持"最小公分母"——两条都是 committed 主题不会选择的做法，因为它们都太"不偏科"了。

### 2.11 highlight（高亮）

- **角色**：高亮
- **结构**：`bgSoft = #fff4c8` 浅米黄底 + padding 12px 14px + margin 16px 0 + border-radius 4px + **无边框**
- **motif**：无
- **备注**：走 Notion `<mark>` / Medium highlight 路数——**纯底色，不加边框、不加图标、不加标题栏**。这是 highlight 最通用、最克制的做法

### 2.12 compare（对比）

- **角色**：对比
- **结构（variant = column-card，唯一变体）**：
  ```
  ┌─────────────┬─────────────┐
  │  A 栏标题   │  B 栏标题   │  ← 两栏等宽 width 50%
  ├─────────────┼─────────────┤
  │  A 栏内容   │  B 栏内容   │
  └─────────────┴─────────────┘
  ```
  `display: table` + `table-layout: fixed` + 两个 `td` 各 50%，中间 1px `border` 细线分隔，外部 1px `border` 细线包围，padding 12px 14px
- **色**：表头底 = `bgMuted`，表头文字 = `text` / 700；内容底 = `bg`，文字 = `text` / 400
- **motif**：无
- **拒绝**：**不做 ledger 账本**（business 占 compare 的 ledger variant）——default 的 compare 就是等宽两栏。**不做 stacked-row** 作为 default 的主变体——table-cell 两栏才是最普适的做法

### 2.13 steps（步骤）

- **角色**：步骤
- **结构（variant = number-circle）**：
  ```
  ① 第一步标题
     第一步说明
  ② 第二步标题
     第二步说明
  ```
  每步一行，`stepBadge` SVG 圆徽章（24px）左置 + 标题 + 换行 + 正文。步与步之间 margin-bottom 14px
- **数值**：stepBadge 24px + text-indent 左 32px 处理正文段
- **motif**：stepBadge（直径 24px 实心圆 + 白字）
- **拒绝**：**不做 ribbon-chain**（有"工业流程图"味）、**不做 timeline-dot**（有 industry-observer 倾向）——default 的 steps 就是最普适的"数字圆圈 + 文字"纵向堆叠

### 2.14 divider（分割）

- **角色**：分割
- **结构（variant = rule，主变体）**：单根 `border` 色细线，height 1px，margin 24px 0
- **备用变体**：wave / dots / flower（见 §1.4 SVG motif）
- **motif**：按 variant 切换
- **禁止**：`glyph` variant（◆ § ❦）——glyph 分隔符来自书面刊物传统（literary 用 ❦、tech-geek 用 §），default 不走这条路

### 2.15 footerCTA（页脚召集）

- **角色**：页脚
- **结构**：`bgSoft` 底 + 8px 圆角 + padding 16px + margin 28px 0 + `border: 1px solid border` 细边
- **内容**：一句引导文字（居中，15px / `text`）+ 可选的"阅读原文/分享"等链接（13px / primary / 居中）
- **motif**：无
- **拒绝**：**不做订阅钩子**（industry 占）、**不做致谢引用**（academic 占）——default 的 footerCTA 就是"文章结束 + 一句收束"的位置，不承担任何号召

### 2.16 recommend（推荐）

- **角色**：推荐
- **结构**：`bgSoft` 底 + 6px 圆角 + padding 14px 16px + margin 22px 0 + 左侧 3px `secondary #8a8f98` 中性灰细边
- **内容**：小标签"推荐阅读"（13px / `textMuted`）+ 下方 1-3 条文章链接（15px / `primary`）
- **motif**：无
- **备注**：左边灰色条是这里唯一的结构性装饰——之所以用 secondary 灰而不是 primary 蓝，是因为 recommend 区块**不应该比正文链接更抢眼**。灰色条足以区分语义，不抢色。

### 2.17 qrcode（二维码）

- **角色**：二维码
- **结构**：居中 + padding 16px + margin 22px 0 + `border: 1px solid border` + border-radius 6px + **无底色**
- **二维码图像**：居中，max-width 160px
- **说明文字**：下方一行 13px / `textMuted` / 居中
- **motif**：无
- **备注**：default 的 qrcode 不做任何装饰边框花样——就是"图 + 一行说明 + 细边框"

### 2.18 mpvideo（视频卡）

- **角色**：视频
- **结构**：视频封面 16:9 + 播放按钮 overlay（CSS 不允许 `position: absolute`，所以 overlay 走居中的 SVG 三角 + 圆圈 inline 节点方式）+ 下方标题 15px / 700 / `text`
- **外框**：`border: 1px solid border` + border-radius 6px + padding 0 + margin 20px 0
- **motif**：播放按钮 SVG（圆圈 + 三角）——这是全球视频卡的通用符号，不算 default 新增的气质装饰
- **备注**：不加"视频"标签徽章、不加时长角标（这两者都会把卡片推向"UGC 平台卡片"审美）

### 2.19 mpvoice（音频卡）

- **角色**：音频
- **结构**：左侧播放按钮 SVG（圆 + 三角）+ 右侧标题 + 时长（横向 table-cell 两列）
- **外框**：`bgSoft` 底 + 6px 圆角 + padding 12px 14px + margin 18px 0 + **无边框**
- **motif**：播放按钮 SVG
- **备注**：音频卡比视频卡更"次级"——用浅底代替边框，让它在版面里稍微退后一档

### 2.20 free（自由块）

- **角色**：自由
- **结构**：**无样式** · 仅承担"一段普通文本"
- **数值**：不加 padding、不加 background、不加 margin（或只加 margin 15px 0 保证段间距）
- **motif**：无
- **备注**：free 是"用户输入什么就渲染什么"的逃生舱。default 对 free 的纪律是**零样式**——不强加任何视觉

---

## 3. 反例对照：失败模式的 default

default 不容易被做成"荧光花哨"——它的失败模式**反过来**：**不自觉地偏科**。以下五种失败模式每一种都对应一条"无意识借用的签名"，实现 agent 必须能识别并规避。

### 3.1 反例 A：不自觉借 Bootstrap 蓝 · 变成"企业官网文档"

**症状**：primary 停留在 `#007bff` / `#2196f3` 附近，h2 的双色条 + 圆角 12px 以上 + 阴影 0 4px 12px 的卡片。读者一眼读成"SaaS 产品文档"。

**规避对策**：
- primary 严格取 `#2558b0`——不是 `#1976d2`、不是 `#007bff`、不是 `#3b82f6`
- h2Prefix 只允许单竖条 3px，**不允许双条 + 短横的工业图表结构**
- 所有圆角 ≤ 8px（sm 4 / md 6 / lg 8）
- **禁用 box-shadow** 作为装饰（平台本来也过滤得差不多了，但心里要清楚：阴影是 SaaS 卡片审美）

### 3.2 反例 B：不自觉借 Medium 的 serif 精神 · 变成"太文艺"

**症状**：尝试用行高 2.0 + 大段留白 + 深米底来"像 Medium"——结果踩了 literary-humanism 的领地。

**规避对策**：
- bg 严格取 `#fdfdfc` 微暖白——**不允许退到任何米底**
- 行高 1.75 封顶，**不允许 2.0**
- 段间 margin 18px，**不允许 24px 以上**——大段留白是 literary / life 的签名
- quoteCard **不做居中大字号**（那是 Medium pull-quote 的签名）——居中可以，但字号只比正文大 2px

### 3.3 反例 C：不自觉借 Economist 的红 · 变成"新闻感"

**症状**：accent 或某个 label 底用了 `#cc0000` / `#dc143c` 饱和红——立刻变成 Economist / FT / 新京报的新闻刊风。

**规避对策**：
- accent 字段**必须 = primary 编辑蓝**，不独立取色
- danger 红严格取 `#b42318`——比 Economist 红暗一档、比 Bootstrap danger `#dc3545` 暗一档
- 任何"label 底色为红"的装饰都要报警——default 的红只出现在 3px 色条 + 图标

### 3.4 反例 D：不自觉做成"Word 默认" · 廉价感

**症状**：primary 是深蓝、正文用 `#333`、表格用 1px solid 黑框、h2 加"下划线 + 粗体"、列表用黑实心点——看起来像 Word 粘贴到公众号。

**规避对策**：
- 所有深色**不用纯黑 `#000000` / `#333333`**——text 用 `#1c1f24`，border 用 `#d8d8d4`
- 表格不用黑边框——所有 border 都走 `#d8d8d4` 细线灰
- 列表项前缀如果要 SVG 化，用一个小圆点 2px 半径 + `textMuted` 色，**不用 `•` U+2022 字符**（Word 默认）也**不用 `■` 实心方块**
- pre 代码块底色取 `#2a2d32` 中性深灰——**拒绝 `#282c34`**（Atom One Dark 原值）和 `#1e1e1e`（VSCode Dark+ 原值）

### 3.5 反例 E：不自觉加"最安全"的 emoji · 失去默认的庄重

**症状**：在 tip 前加 💡、warning 前加 ⚠️、danger 前加 ❌、footerCTA 加 👉——"反正 emoji 是通用的，应该安全"。

**规避对策**：
- **default 禁用所有 emoji**，一个都不允许
- tip/info/warning/danger 的标识完全由 3px 色条 + 语义图标 SVG 承担
- 如果作者的原文里出现 emoji，按原文保留；但**主题的装饰体系里 0 个 emoji**

这条反例最危险，因为它伪装成"普适的表达"。真相是：**emoji 立刻把稿件拉到小红书 / 朋友圈 / 闲聊群的审美段位**，而 default 要的是"报纸 / 长读网站"的段位。emoji 是 default 的天敌。

---

## 4. 总结：default 的三句话人格

1. **default 是"有意识的中立"**——不是没有主张，是对所有题材保持公平。中立需要高度自觉，而非偷懒。
2. **default 是"最小公分母"**——四态语义色形态相同、SVG 只保留 4 件、Typography 12 条"不做"、色彩系统砍到 primary + 灰阶两档。每一处减法都是为了让它在任何语境下都成立。
3. **default 是"出厂状态"**——它不是第八种气质，它是其他七种气质失败时的落点。用户选到它不应该感到被迫接受兜底，而应该感到**稿子被认真排过、但不被任何一种气质所绑架**。

做好 default 的唯一方法是：先把另外七套 committed 主题做到的事**全部识别出来**，然后在自己的版面上**一条一条主动放弃**。每一条"放弃"都是一次小小的克制训练——训练结束后留下的那个骨架，就是 default。
