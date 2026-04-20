# Academic Frontier · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**academic-frontier 不是"科普号"，是"同行评审级的学术论文被搬到公众号"。** 参照坐标：Nature / Science / Cell 正刊的窄栏 + figure caption 竖线分隔、arXiv preprint 与 LaTeX article 默认 Computer Modern 的留白感（我们没有字体权，但可以借精神）、ACM / IEEE transactions 的定理框与 equation numbering、Anthropic/OpenAI research 页面的"白底深墨 + 极少装饰"、《中国科学》正刊的栏线与章节编号、Knuth TAOCP 的脚注纪律（但比 tech-geek 更印刷化、更少工程注释味）。气质关键词：**论文、证据、克制、无装饰**。

拒绝坐标一并写死：拒绝"科普号"卡通插画 + 🧬🔬🤖 emoji；拒绝"学术百家号"的大红大金渐变 banner + "权威发布"四个惊叹号；拒绝 PPT 模板风的多色块阴影图标；拒绝"考点框 / 重点红线 / 填空题"的课本教辅排版；拒绝小红书"精致学术笔记"的荧光笔 + 贴纸 + 手账风；拒绝一切"把论文装扮得活泼一点给小朋友看"的自作多情。

**与 tech-geek 的关键区分**——tech-geek 是"工程师的夜班 manpage"，暖底 / 琥珀 / `§` / `// NOTE` / `[1]` 方括号脚注 / Plan 9 血脉；academic-frontier 是"研究者的期刊 preprint"，白底 / 深靛 / `定理 1.1` / `图 5` / 上标数字 `¹²³` / Nature 血脉。编号语汇、底色、引用标记都走不同路。如果两者的视觉让读者在 2 秒内不能分辨，就是做失败了。

**与 business-finance 的关键区分**——business 是"研究所内参"，有核心判断、数据卡、订阅钩子、K 线涨跌；academic 是"正式论文"，结论需要证据、方法须可复现、避免一切煽动。business 的 `<strong>` 承载"核心判断"；academic 的 `<strong>` **几乎不用**，强调走 `<em>` italic——这是学术排印的硬纪律。business 可以有 K 线与涨跌红蓝；academic **禁用所有涨跌色隐喻**——涨跌不是它的世界。

一句话收束：**academic-frontier 应该让读者觉得"这是一篇 arXiv preprint，只是暂时贴在了公众号上；它不屈服于平台，不讨好读者，是研究者写给同行评审的严谨陈述"。**

---

## 1. Persona 三件套

### 1.1 Color story

学术排印的色彩纪律就两条：**底色纯净、装饰稀少**。这不是"没想法"，而是"想法全在文字和结构里"。任何一眼看去"配色很用心"的学术文档，本质上已经输了——它暴露了作者在意外观多过内容。

我做了两版路径评估，最后**committed 到深靛（deep indigo）**，不走暗酒红。原因写清楚：

- **深靛 `#1e2c4a`** 是 Nature / Science / NeurIPS 主视觉的共同色家族——"正刊深蓝"是全球学术期刊不成文的共识，它冷静、克制、不带情绪。
- **暗酒红 `#6b1e2a`**（Nature 压饱和版）也可以，但**在中文公众号场景里**酒红容易被误读成"党政红书封"或"学报喜庆红"——越本土的读者越会把它往"正式但有点旧"的方向读，失去 preprint 的现代感。
- 深靛同时能和 tech-geek 的 VT220 琥珀在色轮上隔 180°——两个主题不会互相污染。

**底色选 `#fefefe` 纯白而非奶白 `#fafaf7`**——理由同样简洁：纯白是 arXiv / Nature 网页版 / LaTeX 默认输出的底色，它是"未加修饰的论文底"的 universal 默认；奶白已经开始有"纸本味"，那是 literary-humanism 的领地。academic-frontier 要的是**屏幕上的 preprint 感**，不是**纸本扫描感**，所以不退到米色。

#### Token 表（committed 版）

| token | 值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|
| `bg` | `#fefefe` | 论文白 | 等价于 `#fff` 但规避公众号 SVG 光栅化白→透明陷阱；不走奶白（那是 literary） |
| `bgSoft` | `#f6f6f4` | 定理浅底 | 和 bg 差 2%，仅用于定理框、摘要框、方法框的浅底——浅到"几乎看不见"是学术浅底的纪律 |
| `bgMuted` | `#ececea` | 表头灰 | 表格表头、ablation 表的条纹行、代码块中性底；不带色相，纯灰 |
| `text` | `#16181d` | 正刊墨 | 接近黑但偏一点冷，模仿正刊油墨——比 `#000` 柔、比 `#333` 正式 |
| `textMuted` | `#5a5d64` | caption 灰 | figure caption / figure 编号 / 脚注正文 / 日期等附属信息 |
| `textInverse` | `#fefefe` | 反白 | 仅用于定理框顶栏（深靛底）上的白字，整篇最多 2 处 |
| `primary` | `#1e2c4a` | 正刊深靛 | **关键决策**：Nature / NeurIPS 家族色，冷、克制、无情绪。不走酒红（本土误读风险）不走黑（过死） |
| `secondary` | `#4a5670` | 引文靛灰 | primary 的降饱和变体，承担"次级结构色"——section 下划线、figure 边框；绝不与 primary 抢戏 |
| `accent` | `#8a2a2a` | 勘误深酒红 | **仅一色** accent，只在 danger（谬误/反例）和 references 的 DOI 锚色出现。暗酒红是 Nature 正刊红 `#cc0000` 收到 50% 饱和的结果——克制到"你几乎会忘了它存在" |
| `border` | `#d8d8d4` | 版框灰 | 1px 实线分隔，figure / table / theorem 的边框都走它 |
| `code` | `#1a1a1a`（on `#ececea`） | 等宽墨 | **拒绝让 primary 承担代码色**——学术文档的代码只在 Methods 章节出现，它是"方法的一部分"而非"装饰色块"，用中性灰底 + 深墨字即可 |

#### 语义色（学术克制到极致）

学术排印的语义色纪律：**soft 底几乎看不见，accent 色压到中等饱和度**。读者识别语义靠 **label 文字 + 形状冗余**（`Definition.` / `Methods.` / `Limitations.` / `Fallacy.`），颜色只是最后一档弱信号。所有 accent 色在 `#fefefe` 上必须 ≥ AA（4.5:1）。

| 语义 | accent | soft | 对比度（on `#fefefe`） | 角色名（中英双语） |
|---|---|---|---|---|
| tip | `#1e2c4a`（= primary） | `#f3f4f7` | 13.2:1 | **定义**（Definition） |
| info | `#4a5670`（= secondary） | `#f1f2f4` | 7.8:1 | **方法 / 补充材料**（Methods） |
| warning | `#5a4a18` | `#f5f2e8` | 9.1:1 | **局限性**（Limitations） |
| danger | `#8a2a2a`（= accent） | `#f7eeee` | 7.4:1 | **谬误 / 反例**（Fallacy） |

四条纪律：
1. **tip 和 primary 共用色**——学术文档里"定义"是最常出现、最基础的元素，让它和正刊主色同色，形成视觉骨架。
2. **warning 不走琥珀黄**（那是 business / tech-geek 的语义）——改走"古文献土黄"`#5a4a18`，更像 archival notation。
3. **danger 不走鲜红**——鲜红是警报灯、是 error message；academic 的 danger 是"**这里有一个被广泛持有的错误观点，我要明确指出它错**"，需要的是**勘误纪律**而非报警，深酒红 `#8a2a2a` 是正确的克制。
4. **soft 底对比度只有 1-2%**——读者几乎感知不到底色变化，识别靠 label 和形状，颜色是冗余信号。

#### "拒绝什么"

- **拒绝 `#cc0000` / `#e60012`**（Nature 正刊鲜红的直接照抄）——太鲜，会让版面看起来像"警报 + 喜庆"的混合体
- **拒绝任何金色 `#d4a017` / `#c8a15a`**——学术文档不出现金。金是商业、是文创
- **拒绝荧光黄 highlight**——小红书学术笔记审美，已提列为拒绝坐标
- **拒绝涨绿跌红 / K 线配色**——academic 没有"涨跌"的语义世界
- **拒绝任何渐变**——`linear-gradient` 既过不了 juice、也不是学术传统
- **拒绝纯黑 `#000000` 文字**——在 `#fefefe` 底上过刚，压成 `#16181d` 更接近正刊油墨的冷深色
- **拒绝加入第三色**——accent 只有一色是纪律。学术排印的审美核心是"少色"

---

### 1.2 Typographic voice

学术排印的字体节奏和其它所有主题都不同。它的目标是**信息密度高但不拥挤 / 层级清晰但不喊叫**。不能声明 font-family，所有节奏靠 size / weight / letter-spacing / color / margin 拼——好在学术排印的本色就不依赖字体，它依赖**栏宽、行距、编号纪律**。

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（论文标题） | 24 | 600 | 0.2px | 1.4 | `text` | **关键纪律：h1 不上 26**。学术标题要**清瘦**而非宽厚——Nature 正刊的标题字号相对正文只放大 1.5x，而不是公众号常见的 2x。24 + 600（不是 700）+ 极窄字距就够了 |
| h2（章节） | 18 | 600 | 0.1px | 1.45 | `text` | 前缀是**阿拉伯章节号**：`1 ` `2 ` `3 `（中点分隔），不是 SVG 也不是罗马数字（罗马留给 people-story）、不是 `§`（那是 tech-geek）。可选左侧 1px `primary` 竖线 border-left 作为极简装饰 |
| h3（小节） | 16 | 600 | 0 | 1.55 | `text` | 前缀 `1.1 ` `1.2 `（两级大纲）。与正文同号，仅靠字重 + 编号区分 |
| h4（极少用） | 15 | 600 | 0 | 1.6 | `text` | `1.1.1 ` 三级大纲。学术论文里 h4 罕见，但保留 |
| p（正文） | 15 | 400 | 0.3px | 1.75 | `text` | 字重 400，不上 500——学术正文要"呼吸薄"而非"笔画沉"；行距 1.75 介于 business（1.75）和 literary（2.0）之间，是信息密度优先的中间值 |
| small（脚注/caption） | 13 | 400 | 0.2px | 1.6 | `textMuted` | figure caption、脚注正文、references 每条 |
| pull-quote（定理陈述） | 16 | 500 | 0.1px | 1.7 | `text` | **与众不同**：学术的 pull-quote 不放大——定理陈述不靠字号大，靠**theorem 框结构**撑起来。字号和正文接近，但字重升到 500 并带 italic `<em>` 包裹 |
| `<em>` italic | inherit | 500 | inherit | inherit | `text` | **学术强调的主力**。`<em>` 用于：术语第一次出现、定理/引理名称、外文词汇 |
| `<strong>` bold | inherit | 600 | inherit | inherit | `text` | **几乎不用**。全篇最多 2-3 次，仅用于极关键的反直觉结论陈述。严禁正文内到处加粗 |
| `.math` 公式行 | 15 | 500 | 0 | 1.8 | `text` | 公式行走 `<pre class="math">` 或 inline `<code class="math">`：**等宽字形 + 居中 + 上下各 10px 留白 + 行末右对齐加小号 `(1)` `(2)` `(3)` 编号**。公众号不支持 MathJax，我们靠**视觉气**模拟公式行 |
| `.digit`（数字） | 15 | 500 | 0 | 1.75 | `text` | **关键签名动作**：正文内的数字 / 表格数字都走 tabular 风格——字重 500 + 字距 0（不是正文的 0.3px）+ 色 `text`（不染主色）。让数字密集处不抖动，具有"表格级数字"的稳定感 |

#### 字重策略（学术最重要的一条）

**全主题字重只开四档：400 / 500 / 600，`.digit` 允许 500**。严禁出现 700 或更高——学术文档里 700 字重的心理暗示是"讲演稿 / PPT 标题"，和 preprint 的气质严重冲突。Nature 正刊的 h1 都没有上 700。

更关键的纪律：**`<em>` 替代 `<strong>` 作为强调主力**。这是一条硬纪律，违反即失去 academic 气质：

- 术语第一次出现 → italic（`<em>`）
- 定理名、引理名、算法名 → italic
- 外文词汇 / 拉丁短语 → italic
- 反直觉核心结论（全文 ≤ 3 次）→ `<strong>` bold
- "核心判断"这种 business 风的加粗强调 → **禁用**

在公众号字体栈不稳定的前提下，italic 可能被渲染成伪斜体（系统字体的机械倾斜）——这不是 bug，正是 preprint 的真实气质。Nature 网页版的 italic 也是机械斜体。**接受这种"未经美化"的原始感**。

#### 章节编号纪律（与 tech-geek 明确拉开）

- **阿拉伯数字 + 点号**：`1` / `1.1` / `1.1.1` / `1.1.1.1`——LaTeX article 默认风
- **禁止 `§` 符号**——那是 tech-geek 的 manpage 语汇
- **禁止罗马数字 `I. II. III.`**——那是 people-story 的报告文学语汇
- **禁止中文"第一章 / 第一节"**——那是课本语汇
- **禁止花式编号 `01 / 02 / 03`**（大号数字前缀）——那是杂志 / 产品页语汇

#### 引用标记纪律

只在两种之间二选一，不混用：

- **上标数字 `¹²³`**——Nature / Cell / NeurIPS 风；用 `<sup>` 或 SVG text 实现
- **圆括号作者年 `(Author, 2024)`**——ACM / APA 风；纯文本 inline

**本主题 committed 到"上标数字"**。理由：在公众号的中文语境里，`(Author, 2024)` 会让中文读者视觉上断裂（中英混排 + 括号），而 `¹²³` 是 typography-only 的符号，无语言门槛、视觉融入正文流。

**严禁 `[1] [2] [3]` 方括号脚注**——那是 tech-geek 和 IEEE 早期论文的语汇，本主题必须和它拉开。

#### 公式行策略（无 MathJax 的变通）

公众号不支持 MathJax，但 academic 文档没有公式像缺了骨头。变通方案：

- **inline 公式**：`<code class="math">` 包裹，等宽字 + 字重 500 + 色 `text` + `bgSoft` 超浅底（`#f6f6f4`）+ padding `1px 4px`；示例：行内出现 `E = mc²` 式短公式
- **block 公式**：`<pre class="math">` 包裹，居中对齐（`text-align: center`）+ 上下各 10px margin + `bgSoft` 底 + padding `12px 16px` + 右端悬挂小号编号 `(1)` `(2)`（用 inline-block + textMuted 13px + margin-left）
- **变量** `x`、`y`、`θ` 等单字符变量用 `<em>` italic 包裹（这是学术排印的硬纪律：变量永远斜体）

效果是"视觉上像公式行但实际是等宽文本块"——对公众号读者来说这已经是**能识别的 equation 感**。

#### figure caption 纪律

figure 元素的 caption 必须给出样式：

- 13px / 400 / line-height 1.6 / color `textMuted`
- 前缀 `图 1 | ` 或 `Figure 1. ` 或 `Fig. 1. `（**主题 default 用中文 "图 n |"**，竖线分隔是 Nature/Cell 的经典期刊习惯）
- 居左对齐（不居中——期刊 caption 从不居中）
- margin-top 8px（与 figure 图贴近），margin-bottom 20px

---

### 1.3 SVG motif

学术排印的核心原则：**无装饰**。这不是偷懒，这是纪律。Nature / arXiv / LaTeX article 的 primary design decision 就是"不放装饰元素"——任何花边、图标、曲线、渐变都会破坏 "this is a paper, not a blog post" 的严肃感。

所以本主题的 SVG 资产**极少**——3-4 件，每件都承担结构功能而非装饰功能。这和 literary-humanism（云头 + 回纹 + 钤印）、business-finance（K 线 dividerWave）、tech-geek（manpage § + pilcrow ¶）形成鲜明对比：**academic 的 motif 是"几乎没有 motif"**。

#### 保留 / 新增的三件资产

**① h2 章节编号前缀（不用 SVG，用 inline text）**

章节号 `1 ` `2 ` `3 ` 直接走 inline `<span class="sec-num">` 文本，**不做 SVG**——学术排印不给章节加装饰。如果实现层坚持要 SVG 资产：那就是一根 **1px 宽 × 16px 高的 `primary` 色实线**（border-left 即可，不必走 SVG），作为 h2 的左竖装饰。极简到不能再简。

文字草图：`│ 1  章节标题`（竖线 1px + 编号 + 标题）。

**② `theoremMark` · 定理结束符（新增，本主题签名符号）**

`■` 或 `□` 方块，作为 QED（proof end marker）或 theorem block 的结尾符。这是学术排印中**最精致的装饰传统**——从 Halmos 开始，数学论文结尾的 `■` 是对严谨证明完成的无声致敬。

- viewBox `0 0 10 10`，一个 8×8 的填充方块，色 `primary`
- 用在 quoteCard（定理声明框）正文末尾，右对齐
- 也可用作 highlight（Key Finding）的结尾小标记

**③ `figureCorner` · figure 左上角角标（新增，可选）**

极小的 L 形直角标记，14px，色 `border`——标识 figure 容器的左上角。仅为辅助识别 figure 区域，不做视觉装饰。

- viewBox `0 0 14 14`，两条 1px 线组成 `L` 形
- 如果 figure 容器已经有 1px border，这颗可以省略

**④ `rule` · 极细横规（divider 默认）**

学术排印的 divider 传统就是一根细线，不加任何花饰。

- 1px 高 × 100% 宽的 `border` 色水平线，等价于 `<hr>` 样式
- margin 上下 24px
- 可选中央 `❋` 或 `⁂` 三星号符号——**但要克制**：每篇文章最多出现 1 次（论文中段的 "scene break"），其余 divider 都是纯 rule

#### 必删（或从不实现）

- **`dividerWave`**：本主题完全不用 wave，删除或让它 fallback 到 `rule`
- **`dividerFlower`**：同删——学术文档不出现花饰
- **`quoteMark` 大引号**：学术 quote 不做装饰引号（那是杂志审美），靠 `<blockquote>` 左竖线即可
- **`sectionCorner` 书角/L 形块**：literary 的语汇，本主题不用（figureCorner 是另一件东西、仅贴 figure）
- **`stepBadge` 圆/方徽章**：academic 的 steps = Methods 流程，用保守的 `Step 1. Step 2.` 文字点号编号，不做圆徽章——那是 default 主题的教程感
- **任何 emoji**：🧬🔬🤖 一律禁用。学术不需要 icon 辅助识别

#### 绝对禁止（再写一遍）

- 试管 / 分子 / DNA / 显微镜 icon ——这是科普号审美的核心陷阱，看到就打回
- 灯泡 / 问号 / 感叹号 / 齿轮 ——教科书配图审美
- 花边、云纹、回纹（literary 占用）、器物几何（life 占用）、终端字符 `§ ¶ ⁂`（tech 占用）、K 线（business 占用）、手绘贴纸（人文手账号占用）
- RGB 渐变、阴影、glow——过不了 juice 且审美下沉

#### motif 使用纪律

每篇文章最多出现 **一种** divider（默认 `rule`，偶尔 `glyph` 的三星号 `⁂`）、**一种** theoremMark 结束符（只在 quoteCard 和 highlight 结尾）。不允许多种装饰混用——那是"我有很多 SVG 资产"的炫耀，不是学术纪律。

---

## 2. 19 个 container 的视觉差异化方案

全部 19 个容器用**学术语境**重新命名（不是"tip 框 / warning 框"的功能命名）。结构草图与数值是起手值，实现 agent 可 ±2px 微调。

### 2.1 `intro` → **摘要（Abstract）**

**角色**：论文摘要。全文第一段，200 字以内，交代问题 / 方法 / 结论。

**结构**：
```
 ────────────────────────────────────
  ABSTRACT
 ────────────────────────────────────
  摘要正文，textMuted 色、15/1.75、
  左右无边框，上下两根横线夹住
 ────────────────────────────────────
```

- 上下各一根 1px `border` 实线（`border-top` + `border-bottom`，不走 position）
- 左右**无边框**——让摘要和正文贯通
- 顶部一行 `ABSTRACT`（12px / 600 / letter-spacing 2px / `textMuted` / 大写拉丁）
- 正文 15/400/`textMuted`（比正文淡一档——摘要就该"比正文淡")
- padding `16px 0`，margin `0 0 28px 0`

### 2.2 `author` → **通讯作者 / 第一作者（Authors）**

**角色**：论文署名。一行文本，包含作者名 + 单位 + 通讯邮箱。**冷、静、不居中**。

**结构**：
- 单行 `display: block`，`text-align: left`
- 格式：`张三¹, 李四², 王五¹* · ¹某某大学 · ²某某研究所 · * 通讯作者`
- 字号 13px / 400 / `textMuted`
- 上标数字 `¹²` 用 `<sup>`，字号 10px
- 无底色无边框——作者信息本该"几乎隐形"
- margin `0 0 20px 0`

### 2.3 `cover` → **标题块（Title Block）**

**角色**：论文头部。标题 + 作者 + 单位 + 关键词 + 摘要的复合块。

**结构**：
```
  ────────────────────
  论文标题（24/600/text/居左）
  ────────────────────

  张三¹, 李四², 王五¹*    (13/400/textMuted)
  ¹某某大学  ²某某研究所

  关键词：XXX · YYY · ZZZ  (13/400/textMuted + 前缀"关键词："600)

  ────────────────────
   ABSTRACT
  ────────────────────
   摘要正文...
  ────────────────────
```

- 标题下方留 12px，然后作者行
- 作者行下方留 8px，单位/机构行
- 单位下方留 14px，关键词行
- 关键词下方留 20px，再接 ABSTRACT 块
- **无图版式**——学术 cover 不贴大图；图交给 figure 容器
- 拒绝任何"公众号专题头图 + 金字塔构图"——那不是论文头部

### 2.4 `sectionTitle` → **§ Heading（章节号）**

**角色**：章节大标题，比 h2 重一档，用于"方法 / 结果 / 讨论"这类章节分隔。

**variant 选择**：`bordered`（不走 cornered——那是 literary 的书角语汇）。

**结构**：
- 章节号 + 标题文字：`2 · 方法` / `3 · 结果`（阿拉伯数字 + 全角中点 + 章节名）
- 下方 1px `secondary` 实线横规（**通栏**，不是 business 的 48px 短线）
- padding-bottom 6px
- margin `36px 0 16px 0`（section 级需要更大的上 margin）
- 标题文字 19px / 600 / `text` / letter-spacing 0.1px

### 2.5 `quote` → **引文（Citation Quote）**

**角色**：征引他人论文原文。`<blockquote>` 语义。

**variant 选择**：`column-rule`（双侧竖线）——但降级为**左单侧竖线**更学术。

**结构**：
- 左侧 3px `border` 灰色竖条（不是 primary——引文不该强调）
- padding `4px 16px`
- 字号 14px / 400 / `textMuted` / line-height 1.7
- 末尾右对齐一行 caption 小字：`—— Author, Title, Journal, Year`（13/400/textMuted，前缀破折号）
- 无底色、无边框、无圆角
- **不加引号 SVG**——学术引文不做装饰引号

### 2.6 `quoteCard` → **定理声明框（Theorem Box）**——本主题签名 container

**角色**：**定理 / 引理 / 命题 / 定义的正式声明**。不是金句、不是"核心判断"。这是 academic 相对所有其他主题的**独特优势位**，必须做足。

**variant 选择**：`frame-brackets` 但重新诠释为"定理框"。

**结构**：
```
 ┌─────────────────────────────────────┐
 │ Theorem 1.1  (定理名，可选副标题)    │   ← 深靛底 #1e2c4a + 反白字
 ├─────────────────────────────────────┤
 │                                     │
 │  设 X 为 ... 则存在唯一的 y 使得     │   ← 正文 italic (<em>)
 │  f(x, y) = 0 成立。                 │
 │                                     │
 │                                  ■  │   ← 结束符 theoremMark 右对齐
 └─────────────────────────────────────┘
```

- 外框 1px `border` 实线，`border-radius 2px`（极窄圆角——学术文档最多给 2px）
- **顶栏**：`primary` 深靛底 + `textInverse` 反白字 + 14px / 600 / letter-spacing 0.5px + padding `6px 14px` + 格式 `Theorem 1.1` 或 `Lemma 2.3` 或 `Definition 3.1`（英文术语 + 阿拉伯章节号.项号）
- **正文**：padding `16px 18px`，字号 15 / 500 / line-height 1.7 / color `text`
- 正文**整体用 `<em>` italic 包裹**——这是学术排印中定理陈述的硬传统
- **结束符**：正文末尾右对齐一个 `■` theoremMark SVG（8×8 深靛方块）——这是本主题最精致的装饰动作
- 底色 `#fefefe`（不走 bgSoft——定理框要清晰不要氛围）
- margin `20px 0`

**纪律**：顶栏的 `Theorem / Lemma / Definition / Proposition / Corollary` 术语必须用英文，不要翻译成中文（"定理 1.1"可以，但"定理 1.1 (xxx)" 比 "Theorem 1.1 (xxx)" 在学术气质上差一档——英文术语是国际学术社区的共识语汇）。作者可在 frontmatter 配置 `theorem.lang = "zh"` 强制中文。

### 2.7 `footerCTA` → **致谢 + 引用格式（Acknowledgements + Cite As）**

**角色**：论文末尾的致谢、资助信息、推荐引用格式。**不是订阅钩子**——这是 academic 和 business 的又一分水岭。

**结构**：
```
  ────────────────────────────────────
   ACKNOWLEDGEMENTS
  ────────────────────────────────────
   感谢 XX 对本文的审阅，感谢 YY 提供
   数据。本研究得到 NSFC 资助 (No. xxx)。

   ────────────────────────────────────
   CITE AS
  ────────────────────────────────────
   张三, 李四. (2026). 论文标题.
   公众号名, 第 N 期.
   DOI: 10.xxxx/xxxxx
```

- 上下用 1px `border` 横线夹住（和 intro 同纪律）
- 顶标签 `ACKNOWLEDGEMENTS` / `CITE AS` 大写拉丁 + 2px 字距 + 12/600/`textMuted`
- 正文 13/400/`text` / line-height 1.7
- DOI 用 `secondary` 色 + 下划线（这是全主题 accent 之外唯一出现的色链接）
- **拒绝** "关注我们""扫码订阅""在看"的按钮——那是订阅号审美，不是论文审美
- margin `40px 0 24px 0`

### 2.8 `recommend` → **参考文献（References）**

**角色**：论文的 bibliography。极严格的引用格式。

**结构**：APA 或 Vancouver 格式的文献列表，缩进悬挂（hanging indent）。

```
  ────────────────────────────────────
   REFERENCES
  ────────────────────────────────────
   [1] Smith, J., & Doe, A. (2024). Title of
        paper. Journal of Something, 12(3),
        345–360.
   [2] Wang, X., Li, Y., & Zhang, Z. (2025).
        Another title. Nature, 600, 123–130.
   [3] ...
```

- 顶标签 `REFERENCES` 同上 footerCTA 风
- 每条编号 `[1]` `[2]`（方括号数字，primary 色，14/500）
- 每条正文 13 / 400 / `text` / line-height 1.6 / letter-spacing 0.2px
- **悬挂缩进**：首行左对齐，续行左缩 28px——用 `padding-left 28px` + `text-indent -28px` 在 `<p>` 上实现
- 条目之间 margin-bottom 10px
- DOI / arXiv ID 用 `secondary` 色 + 下划线
- 底色 `#fefefe`，无边框

**注意**：学术 references 的 `[1]` 方括号和 tech-geek 的 `[1]` 脚注语汇**会撞**——区分靠上下文：academic 的 `[1]` 只出现在 references 容器内部（文内引用全走上标 `¹²³`），tech 的 `[1]` 散落在正文。读者不会混淆。

### 2.9 `qrcode` → **通讯地址块（Correspondence）**

**角色**：通讯作者的联系信息 + 公众号二维码。

**结构**：`display: table`，左侧 80×80 二维码，右侧三行文字：
- `Correspondence to: zhang@university.edu.cn`
- `Lab: XX Lab, School of YY, ZZ University`
- `WeChat OA: XXXXX`

- 字号 12/400/`textMuted` / line-height 1.7
- 二维码 `padding 4px` + 1px `border` 灰色边框，`#fefefe` 内衬，**radius 0**（二维码不圆角）
- 整体 margin `32px 0 0 0`
- 无容器底色

### 2.10 `tip` → **定义（Definition）**

**variant 选择**：`accent-bar`。

**结构**：
```
 │ Definition.  若 ... 则称 ... 为 ...
```

- 左侧 2px `primary` 深靛竖条
- padding `10px 14px 10px 16px`
- 标题前缀 **`Definition.`**（英文 + 点号）或 **`定义.`**（可通过 frontmatter 切换）—— 14 / 600 / `primary` / letter-spacing 0.2px
- 正文紧跟标题同段或下一段，15 / 400 / `text`
- 底色 `bgSoft` 超浅
- margin `16px 0`

### 2.11 `info` → **方法 / 补充材料（Methods / Supplementary）**

**variant 选择**：`minimal-underline`（重新诠释）。

**结构**：
```
 Methods.  我们使用 XX 数据集，采用 YY 方法 ...
 ──────────
```

- **无左竖条、无外框、无底色**——info 是最轻的语义
- 标题前缀 `Methods.` 或 `Supplementary.` 或 `方法.` —— 14 / 600 / `secondary` 引文靛灰
- 标题下方 1px `secondary` 短横线（宽度 60%）
- 正文 15 / 400 / `text`
- padding `4px 0 10px 0`
- margin `16px 0`

**区分纪律**：info 和 tip 最容易混——tip 有**左竖条 + 底色**，info 是**下划线 + 无底色**；tip 标签是 `Definition.`，info 标签是 `Methods.`——形状 + 文字双重冗余。

### 2.12 `warning` → **局限性（Limitations）**

**variant 选择**：`pill-tag` 但去胶囊化，改为**断口虚线框**。

**结构**：
```
 ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌
 ·                        ·
 · Limitations.           ·
 · 本研究样本仅限 XX 地区， ·
 · 推广到其他地区需谨慎。   ·
 ·                        ·
 ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌
```

- 四周 1px `border` 色**虚线** `dashed`（这是四语义中唯一用虚线的 container——形状辨识信号）
- 标题前缀 `Limitations.` 或 `局限性.` —— 14 / 600 / `#5a4a18` 古文献土黄
- 正文 15 / 400 / `text`
- padding `14px 16px`
- 底色 `bgSoft` 极浅
- margin `18px 0`

### 2.13 `danger` → **谬误 / 反例（Fallacy / Counterexample）**

**variant 选择**：`ticket-notch` 改造为**L 形双边框**。

**结构**：
```
 ┌──
 │  Fallacy.
 │  常见的错误假设是 "XX"，但反例表明 ...
                                         ──┐
                                           │
                                       ────┘
```

- 左上角 + 右下角各一个 L 形双线（1px `accent` 深酒红 实线 + 1.5px 间距 + 0.5px `accent` 浅化线）
- 其余三边无边框——双边框的"缺角"是勘误贴条的视觉传统
- 标题前缀 `Fallacy.` / `Counterexample.` / `谬误.` / `反例.` —— 14 / 600 / `accent` 深酒红 / letter-spacing 0.2px
- 正文 15 / 400 / `text`
- 底色 `#f7eeee` 极浅的酒红 soft
- padding `16px 18px`
- margin `20px 0`

**纪律**：danger 是全主题 accent 深酒红唯一重磅出现的位置——每篇文章**最多 2 次**。danger 的稀缺性保证它出现时读者立刻意识到"这里作者在明确指出一个错误"。

#### tip / info / warning / danger 四态的一眼可辨（学术版）

学术排印不能走 business 的 V 形彩色边框、不能走 tech 的注释前缀——**靠 Definition / Methods / Limitations / Fallacy 四个英文术语标签本身就是第一识别信号**，再叠加形状冗余：

| 容器 | 标题标签 | 形状策略 | 边框 | 色相 |
|---|---|---|---|---|
| tip | **Definition.** | 左竖条 + 浅底 | 左 2px 实线 `primary` | 深靛 |
| info | **Methods.** | 标题下短横线 + 无底 | 仅 60% 宽下划线 | 引文靛灰 |
| warning | **Limitations.** | 四边虚线框 + 浅底 | 全框 1px dashed | 古文献土黄 |
| danger | **Fallacy.** | L 形双边 + 浅酒红底 | 左上 + 右下缺角 | 深酒红 |

即便打印成灰度，四个英文 label 足够区分；加上"无框 / 左框 / 全虚框 / L 双框"的形状递进，完全避开"只靠颜色"的陷阱。这是学术可访问性纪律——色盲读者也能识别。

#### Definition 框 vs quoteCard 定理框的边界

两者都有标签 + 正文结构，容易糊。纪律：

- **quoteCard = 定理陈述**（`Theorem` / `Lemma` / `Proposition`）：深靛顶栏 + 白字 + 外框 + `■` 结束符——**正式、有仪式感**
- **tip = 定义**（`Definition`）：左竖条 + 浅底 + 无顶栏 + 无结束符——**轻、内联式**

定理是"这篇论文的核心断言"（稀缺，每篇 1-3 个）；定义是"术语的澄清"（高频，每篇 5-10 个）。仪式感差一档是纪律。

### 2.14 `highlight` → **关键发现（Key Finding）**

**角色**：Nature/Science 论文在 Abstract 或 Discussion 开头常见的 "key finding" 卡片——用一两句总结本研究最重要的发现。**不是大数字 callout**（那是 business）。

**结构**：
```
 ┃ Finding.  在 N=1000 的队列中，
 ┃ 我们首次观察到 X 与 Y 之间
 ┃ 存在显著正相关 (r=0.42, p<0.001)。
```

- 左侧 2px `accent` 深酒红细竖条（这是 accent 第二次合法出现的位置；danger 之外的唯一出场）
- padding `12px 16px 12px 18px`
- 标题前缀 `Finding.` / `Key Finding.` / `关键发现.` —— 14 / 600 / `accent` / letter-spacing 0.2px
- 正文 15 / 500 / `text`（字重比正文高一档）
- 底色 `bgSoft`，radius 2px
- 数字（如 `r=0.42`, `p<0.001`）走 `.digit` 样式（字重 500 + 字距 0）
- **严禁** 巨号数字 callout —— 那是 business 的签名动作
- margin `20px 0`

### 2.15 `compare` → **对照试验 / Ablation Table**

**角色**：方法对比 / ablation study 的表格呈现。**真正的 `<table>` 结构**，不是两栏卡片。

**variant 选择**：重新诠释为 `ablation-table`（走 column-card variant 的底层路径但用 table 渲染）。

**结构**：
```
 ┌──────────────────┬───────┬───────┬───────┐
 │ Method           │ Acc.  │ F1    │ Time  │   ← 表头
 ├──────────────────┼───────┼───────┼───────┤
 │ Baseline         │ 0.812 │ 0.803 │ 12.3s │
 │ + Module A       │ 0.845 │ 0.838 │ 13.1s │
 │ + Module B       │ 0.867 │ 0.861 │ 14.5s │
 │ Full (Ours)      │ 0.892 │ 0.885 │ 15.2s │
 └──────────────────┴───────┴───────┴───────┘
 表 1 | 消融实验结果。数据集为 XXX。
```

- `<table>` + `border-collapse: collapse`
- 外框 + 所有内线 1px `border` 实线
- 表头行 `bgMuted` 底 + 14 / 600 / `text`
- 数据行 14 / 500 / `text`（数字字重 500）
- 条纹行（zebra）可选：偶数行 `bgSoft` 底
- 数字列 `text-align: right`，`font-feature-settings: "tnum"` 效果靠 `letter-spacing: 0` 模拟
- padding `6px 10px`（每单元格）
- **表格下方 caption**：`表 1 | 消融实验结果...`（13/400/`textMuted`/居左，竖线分隔编号和说明）
- margin `20px 0`
- **拒绝**：两栏卡片 "✓ 优点 / ✗ 缺点" 的比较视觉——那是 business / tech；学术对照走真表格

### 2.16 `steps` → **方法流程（Methods Steps）**

**角色**：算法或实验步骤的序列描述。

**variant 选择**：`number-circle` 但去圆徽章化，改为 **numbered-points** 文字编号。

**结构**：
```
 Step 1.  数据预处理：对 X 进行 normalization，
          剔除 |z| > 3 的 outlier。

 Step 2.  模型训练：使用 Adam 优化器，
          learning rate 1e-3，batch size 64。

 Step 3.  评估：在测试集上计算 Acc / F1 / AUC，
          重复 5 次取均值。
```

- 每步首行前缀 `Step 1.` / `Step 2.`（或 `步骤 1.`） —— 14 / 600 / `primary` / letter-spacing 0.2px
- 前缀后 8px 间距接正文
- 正文从 `Step n.` 后的缩进位置开始（`padding-left 48px` 或 `text-indent -48px` + `padding-left 48px`）
- 步间距 margin-bottom 14px
- 正文 15 / 400 / `text` / line-height 1.75
- **无连接竖线 / 无圆徽章 / 无时间轴点**——那都是 default / tech 的语汇
- 可选末步加 `End.` 或 `∎` 结束符（模仿算法伪代码结尾惯例）

**禁止**：`ribbon-chain` variant（横向飘带）——广告感。`timeline-dot` 也不走——那是 tech 的流程。

### 2.17 `divider` → **横规（Rule）**

**variant 推荐优先级**：`rule`（默认）> `glyph`（三星号 `⁂`，全文 ≤ 1 次）> 其余全部不用。

**结构**：
- `rule`：1px `border` 色水平横线，通栏或 60% 宽，margin 上下 24px
- `glyph`：中央 `⁂` 三星号（14px / `textMuted` / letter-spacing 4px），两侧无线，margin 上下 32px——用于"章节间的 scene break"

**删除**：`wave` / `flower` / `dots` 全部不在本主题实现。如果用户强制指定，fallback 到 `rule`。

### 2.18 `mpvideo` / `mpvoice` → **补充视频 / 音频（Supplementary Video / Audio）**

**角色**：补充材料的多媒体嵌入。期刊的 supplementary material 惯例。

**结构**：
- 外层 `display: block`，padding `12px 0`
- 顶部一行 label：`Supplementary Video 1.` 或 `补充视频 1.` —— 13 / 600 / `textMuted` / letter-spacing 0.3px
- 嵌入组件本身（平台强制样式）
- 下方 caption：`视频 1 | XX 实验过程记录，时长 00:45。`（13/400/`textMuted`/居左）
- 上下各一根 1px `border` 色横线（通栏）——模仿期刊 "figure block" 的版框
- 无底色、无圆角
- margin `24px 0`

### 2.19 `free` → **逐字段（Verbatim）**

**角色**：兜底。不归类的自由内容。

**结构**：padding `14px 0`，margin `18px 0`，无边框无底色无装饰。**继承正文字距和行距**。保持它真正"自由"，不强加 motif。

---

## 3. 反例对照（毒舌版）

把这些钉在耻辱柱上，让落地 agent 随时可以回头自检"我是不是在做一个廉价版学术皮肤"。

### 3.1 "科普号卡通插画 + emoji 🧬🔬🤖"

**症状**：每个章节开头配一张扁平化插画（戴眼镜的卡通科学家 + 试管 + 分子结构），tip 前缀 `💡`，danger 前缀 `⚠️`，正文里 DNA 螺旋用 🧬 代替。
**为什么烂**：emoji 和卡通插画是"娱乐化下沉"的两个最强信号——任何 emoji 在学术文档里都会**瞬间把作者的可信度打折 50%**。读者会立刻把文章归类为"给中学生看的科普文"而非"给同行看的 preprint"。
**规避**：全主题 0 emoji、0 卡通、0 icon——所有语义识别走文字标签（`Definition.` / `Methods.` / `Limitations.` / `Fallacy.`）和结构冗余（左竖 / 下划 / 虚框 / L 框）。

### 3.2 "学术百家号 · 权威发布"

**症状**：h1 大红大金底 + 金色渐变边框 + "权威发布！！！"三个感叹号 + 每段开头 `🔥 重磅` 标签 + footer 巨型订阅卡"关注我们不错过任何学术前沿！"。
**为什么烂**：这是**把学术包装成"重大新闻"**的自媒体路径——真正的学术克制到近乎冷漠，因为**重大的是内容，不是包装**。包装越强，读者越会怀疑内容是否撑得起这个调门。
**规避**：本主题 `#fefefe` 白底 + 深靛主色 + 唯一 accent 深酒红只出现在 danger / Finding / DOI 锚色——全篇红色预算 ≤ 5 次。h1 不居中、不大号、不彩色。footer 是"致谢 + Cite As"而非订阅钩子。

### 3.3 "PPT 配色 + 多色块 + 阴影图标"

**症状**：tip 块荧光绿底 + info 块湖水蓝底 + warning 块亮橙底 + danger 块血红底，每个块右上角一个 PPT 风小图标 + drop-shadow。
**为什么烂**：PPT 是**讲演工具**，它的视觉目标是"让后排观众看清重点"——所以需要强色块 + 大图标 + 阴影。学术文档是**阅读工具**，它的视觉目标是"让读者在 15 分钟深读中不疲劳"——强色块会让眼睛累、图标会打断阅读节奏、阴影在公众号 juice 过滤后会变成灰色斑块（翻车）。两者的审美逻辑正相反。
**规避**：本主题四语义 soft 底对比度 ≤ 2%（几乎看不见），accent 色压到中等饱和度，严禁任何 drop-shadow / box-shadow / linear-gradient。识别靠文字标签而非色块强度。

### 3.4 "课本教辅 · 考点 / 重点"

**症状**：正文间密集出现红色"重点"红线下划 + 黄色"考点"方框 + 绿色"易错"贴条 + 蓝色"例题"框，页面五颜六色像初中教辅。
**为什么烂**：教辅排版的心理暗示是"这是要背的知识点"——学术 preprint 传达的是"这是新发现，欢迎讨论"。前者期待记忆，后者期待批判——两者的读者姿态完全不同。
**规避**：本主题不做"重点 / 易错 / 例题"这类教辅式标签，所有语义标签都是**学术惯用术语**（Definition / Theorem / Methods / Limitations / Fallacy / References）。`<em>` italic 作为强调主力，`<strong>` 几乎不用——学术不划重点，学术靠**论证**让读者认可重点。

### 3.5 "小红书精致学术笔记（手账风）"

**症状**：荧光笔划线 + 手绘贴纸 + 胶带装饰 + 圆角 12px 的粉色小卡片 + "今天学到了～" 的亲切语气 + 每段末尾一个 `✨` 装饰符。
**为什么烂**：这是**把学术 cosplay 成"爱学习的女生人设"**——它的核心目的不是传递知识，而是传递"我在学习"的形象。学术文档的核心目的是"让知识经受审视"，人设是干扰项。
**规避**：本主题全部 `radius ≤ 2px`（所有容器）、0 荧光色、0 贴纸 motif、语言上严禁"我们一起来看看""是不是很有意思呢""今天的分享就到这里"这类社交语气——文档模板里的所有占位文字都用正式陈述语气。

### 3.6 "我借了 tech-geek 的语汇"（最危险的互污染）

**症状**：章节号用 `§ 3.1`、脚注用 `[1] [2]`、tip 前缀写 `// NOTE`、底色换成 `#14110d` 墨炭、代码块和正文同色……做完回头一看，这就是 tech-geek。
**为什么烂**：tech-geek 是"工程师的夜班 manpage"，academic 是"研究者的正式论文"——**审美共同但气质相反**。共用语汇就是主题间的身份偷渡。
**规避**：本主题章节号**阿拉伯数字 `1.1.1`**（不 `§`）、引用**上标 `¹²³`**（不 `[1]`）、标签**英文术语 `Definition.`**（不注释 `// NOTE`）、底色**`#fefefe`**（不墨炭）、代码块**中性灰底**（不正文同色）。每一条都是对 tech-geek 的反向选择。

### 3.7 "我借了 business-finance 的语汇"（次危险）

**症状**：highlight 做成巨号数字 callout（28px / 700 / primary），compare 做成涨红跌蓝 ledger，footer 放订阅胶囊，danger 叫"警报"，`<strong>` 承载"核心判断"到处加粗。
**为什么烂**：business 是"研究所内参，带判断带钩子"，academic 是"正式论文，带证据带克制"——商业内参可以断言"我认为 A 股将上涨"，学术论文必须说"在我们的数据上观察到 X 与 Y 相关 (r=0.42, p<0.001)"。两者的修辞姿态根本不同。
**规避**：本主题 highlight = Key Finding（不是大数字）、compare = ablation table（不是多空账本）、footer = 致谢 + Cite As（不是订阅钩子）、danger = Fallacy（不是警报）、`<strong>` 全文 ≤ 3 次、`.digit` 只做字重 500 而不升字号。

### 3.8 "AI slop 学术主题"（最隐性）

**症状**：配色"正确"（白底深蓝）、间距"合理"、几件 SVG "装饰"齐全，但**没有一个决策让你感觉到作者的判断**——它是平均值，是"学术主题该长的样子"的统计结果。
**为什么烂**：风格是**选择的总和**，不是**添加的总和**。没有"拒绝什么"的决策就没有风格——读完文档你说不出它究竟**反对**什么，只说得出它**包含**什么，那就是 AI 平均值。
**规避**：本文档每一节都有明确的拒绝坐标——拒绝酒红（怕本土误读）、拒绝奶白（那是 literary）、拒绝 `§` 与 `[1]`（那是 tech）、拒绝 K 线与大数字（那是 business）、拒绝第三色（学术纪律）、拒绝 700 字重（学术从不吼叫）、拒绝 emoji 与 icon（科普号路径）、拒绝 wave 与 flower divider（全部删除）。**删除和拒绝才是本规范的主声部，而不是"我们添加了什么"。**

---

## 4. Committed 总结

本规范的三条不可妥协决策（实现 agent 如需偏离，必须先 issue 说服）：

1. **Primary 深靛 `#1e2c4a` 而非暗酒红**。深靛是 Nature / NeurIPS 家族色的全球共识、避开中文语境里酒红的"党政书封"误读、并与 tech-geek 的 VT220 琥珀在色轮 180° 对面——三个好处叠加让这一选择无悬念。Accent 唯一色 `#8a2a2a` 深酒红仅在 danger / Finding / DOI 三处出现，全篇 ≤ 5 次。

2. **极少装饰是纪律不是偷懒**。全主题只有 3-4 件 SVG 资产（theoremMark `■` 结束符 + 极细 rule + 可选 figureCorner），divider 全部删到只剩 `rule` 和 `glyph`。学术排印的审美核心就是"不放装饰"——任何花边都会破坏 preprint 的严肃感。"删除" 是本主题的主动设计动作。

3. **四态辨识靠英文术语标签 + 形状冗余，不靠颜色强度**。`Definition.` / `Methods.` / `Limitations.` / `Fallacy.` 四个英文 label 本身就是第一识别信号，叠加"左竖条 / 下划线 / 虚线框 / L 形缺角"四种形状，打印成灰度也能分出四态——accent 色压到中等饱和度只做冗余信号。`<em>` italic 替代 `<strong>` bold 作为强调主力是配套的硬纪律——学术不吼叫，学术靠论证。

academic-frontier 的成败不在于它是否"看起来很学术"，而在于**同行评审人合上这篇文章时会不会想："这是正经 research。"** 那就对了。
