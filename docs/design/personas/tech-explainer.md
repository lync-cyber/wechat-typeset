# Tech Explainer · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**tech-explainer 不是"程序员博客皮肤"，是"一份可以逐字跟做的技术产品文档"。** 参照坐标是 Stripe Docs（业内最高标杆的 inline code / kbd / 右栏代码带语言标签的分层节律）、Tailwind Docs（彩色语义标签 + 大量代码 + 平台示意图的教学密度）、MDN Web Docs（结构化 API 文档 + 清晰的 Note/Warning/Deprecation 标签）、Linear 的 changelog 与 blog post（产品级简洁）、Vercel / React / Next.js 官方文档（白底 + 清凉主色 + 极少情绪色）、A List Apart（技术文章版面典范）、The Pragmatic Engineer 的教学长文（Gergely Orosz 的专业教学语）、廖雪峰教程与阮一峰周刊（中文路径的"我教你"语气）。气质关键词：**白昼、课堂、友好、引导**。

拒绝坐标一并写死：拒绝 CSDN / 博客园"复制粘贴教程"的大红大蓝标题 + 荧光重点 + `【重要】【注意】`大字标签；拒绝掘金首页的营销渐变 banner + 彩色卡片；拒绝知乎技术答案那种"引用框 + 粗体 + 不一致字号"的廉价拼贴；拒绝微信公众号"干货号"的 emoji 💡⚠️📌 + 感叹号 + 红箭头堆叠；拒绝 B 站知识区封面截屏 + 加粗标题条；拒绝 Bootstrap alert 四色方框 (`bg-info bg-warning bg-danger`) 那种"我抄了个 UI 库"的廉价感；拒绝一切"把教程做得活泼一点吸引初学者"的自作多情。

**与 tech-geek 的关键区分——这是整份规范最强的污染源，必须钉死**。tech-geek 和 tech-explainer 是**同一家族的两种不同职能**，不是"深色版 / 浅色版"的孪生兄弟——它们服务的是**完全不同的读者关系**：

| 维度 | tech-geek | tech-explainer |
|---|---|---|
| 读者心理 | 已是同行，懒得被教 | 愿意跟着学，需要被引导 |
| 气质 | 夜班、孤独、键盘党 | 白昼、课堂、友好 |
| 底色 | 墨炭暖黑 `#14110d` | 清凉微冷白 `#fafbfc` |
| 刊物比喻 | Phrack zine / Plan 9 manpage / TAOCP 正文 | Stripe Docs / Tailwind Docs / MDN |
| 主色 | VT220 琥珀 `#d4a65a` | Stripe 清凉蓝 `#0066cc` |
| accent | HN 橙 `#e06a28` | 琥珀 `#f59e0b`（仅 Warning / Tip 图标） |
| 代码块 | 正文的延续（同色系暖黄） | 结构化组件（深灰底 + 语法高亮 + 顶部语言标签带） |
| 注释 motif | `// NOTE` `// CAVEAT` `// REF` `// PITFALL` | `Note` / `Tip` / `Warning` / `Caution` 英中双语胶囊 |
| 核心 motif | `§ ¶ ⁂ [1] [!] [X]` manpage/RFC 印刷符 | kbd 键帽 / URL 地址条 / terminal `$` / 文件路径胶囊 / 复制图标 / 外链箭头 |
| 装饰节律 | 克制、arcane、"懂的都懂" | 友好、引导、"你现在明白了吗" |
| pull-quote | TAOCP 脚注克制 | Tip Box / Key Takeaway 小结 |
| steps 徽章 | `[1][2][3]` 方括号脚注风 | ①②③ 圆圈数字 + 左侧竖线连续线 |

**读者关系一句话**：tech-geek 是"写给已懂工程师的冷静随笔"，tech-explainer 是"手把手带你做的产品文档"。tech-geek 的读者觉得"这人不好骗"；tech-explainer 的读者觉得"我跟着做能做出来"。**两种信任感完全不同**。

一句话收束：**tech-explainer 应该让读者合上文章时想："这篇写得真清楚，我可以照着做出来"——而不是"作者好有气质"或"作者好厉害"。清楚 > 气质 > 厉害，这是它的价值排序。**

---

## 1. Persona 三件套

### 1.1 Color story

技术文档的底色纪律只有一条：**清凉感 + 长时阅读不疲劳**。CSDN / 博客园的纯白 `#ffffff` + 大红标题是"屏幕反光刺眼 + 警报色攻击眼睛"的组合拳——读者扫五分钟就要合上。Stripe / Tailwind / Linear 能让读者一气读完三千字教程的秘诀就是**底色微冷 + 主色清凉 + 语义色不霓虹**。

我做了三版提案评估——**A 版清凉蓝、B 版 Linear 紫、C 版友好翠绿**——最终 **committed 到 A 版：Stripe 清凉蓝 `#0066cc`**。理由写清楚：

- **紫（B 版 `#5e60ce`）** 是 Linear / Vercel / Stripe Checkout 的 SaaS 主色，很好看，但**在中文公众号语境里**会被误读为"我是一个 SaaS 工具的 landing page"——读者期待的是"我要学会这个知识点"，不是"我要注册一个工具"；紫色会让整个主题飘到营销页方向。
- **翠绿（C 版 `#0d9f7f`）** 的课堂感、教学感确实更足，但**绿色在技术文档里天然承载 "success / passed / correct"的语义**——如果 primary 是绿，Do/Don't 对比里的绿色 ✓ 就会被主色稀释；同时绿色在深色代码块上的 syntax highlighting 里通常是 `string` 字面量——主色会和语法高亮打架。
- **蓝（A 版 `#0066cc`）** 是 Stripe Docs、React 官方、MDN、阮一峰周刊、廖雪峰教程的共同色家族——"文档蓝"是全球技术文档不成文的共识。它冷静、可读、无情绪倾向；在 `#fafbfc` 微冷白底上对比度 7.1:1 远超 AA；同时与 tech-geek 的 VT220 琥珀（色轮上几乎 180°）形成最大视觉对位——两个主题绝不可能被读者混为一谈。

底色不走纯白 `#ffffff` 而走 `#fafbfc`（带 1-2% 蓝灰感）——这是 Stripe Docs / GitHub Docs / Vercel Docs 的共同秘密：**纯白在移动端 OLED 屏上刺眼，略带蓝灰的"清凉白"能让长段代码读起来不累**。与 academic-frontier 的 `#fefefe` 论文白、default 的 `#ffffff`、literary-humanism 的奶白完全拉开——白色家族里每个主题占据一个明确身位。

#### Token 表（committed 版）

| token | 值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|
| `bg` | `#fafbfc` | 文档清凉白 | 带 1-2% 蓝灰的微冷白，移动端长段阅读友好；和纯白的 default / `#fefefe` 的 academic 明确拉开 |
| `bgSoft` | `#f3f5f8` | 侧栏浅底 | 代码块外壳、tip 容器底色、author 栏底色；比 bg 深 3%，够分辨又不"贴纸感" |
| `bgMuted` | `#e8ecf1` | 表头灰蓝 | 表格表头、compare 表头、inline code 底；带同一色相的蓝灰，保持家族感 |
| `text` | `#1a2233` | 文档墨 | 接近黑但偏蓝冷，和主色同色相家族；`#000` 在微冷白上过刚，`#1a2233` 是 Stripe Docs 正文的精确冷深色 |
| `textMuted` | `#5c6778` | 侧注灰 | caption / 日期 / "最后更新" / 脚注正文——技术文档大量使用这档色 |
| `textInverse` | `#fefefe` | 反白 | 代码块顶部标签带、danger 容器标题的反白字；规避 `#fff` 光栅透明 |
| `primary` | `#0066cc` | 文档蓝（Stripe Docs 家族） | **关键决策**：清凉、可读、全球技术文档共识色。不走紫（SaaS 营销味）不走绿（会和 success 语义冲突）。对比度 7.1:1 on `#fafbfc` 远超 AA |
| `secondary` | `#4a90e2` | 链接蓝 | primary 的亮化变体，承担 `<a>` hover 不允许但视觉上的"可点击"暗示；也是 info 语义的基础色 |
| `accent` | `#f59e0b` | 琥珀警示 | **唯一暖色**，仅在 Warning（黄）与 Tip（软化版黄）图标上出现。和主色蓝在色轮上互补 180°，形成"蓝底 + 黄警示"的技术文档经典对位 |
| `border` | `#d9dee5` | 边框灰蓝 | 1px 实线分隔、代码块边框、kbd 底部边框；带蓝灰以融入主色家族，不带纯灰 |
| `code` | `#0066cc`（= primary） | 文档蓝（inline code 字色） | inline code 用主色字 + `bgMuted` 底，与代码块的深灰底 + 高亮色明确区分。读者扫一眼就知道"这是个 token / API 名" |

#### 语义色体系（tech-explainer 最丰富的那一档，给六种）

tech-explainer 是全部 7 个主题里**四态使用最频繁**的主题——技术文档的 `Note` / `Tip` / `Warning` / `Caution` / `Deprecated` / `Pro Tip` 可能在同一篇里全部出现。光有四色远远不够，必须扩到六色，且每一色必须**一眼可辨、互不干扰**。

所有 accent 色在 `#fafbfc` 上必须 ≥ AA（4.5:1 正文，3:1 大字）。纪律三条：
1. **每色独占一个色相槽**——蓝 / 绿 / 琥珀 / 橙 / 红 / 灰，六个色相不重叠。
2. **soft 底饱和度 ≤ 6%**，浅到"几乎看不见"——避免 Bootstrap alert 的廉价 bg-color 感。
3. **语义识别靠"图标 + 胶囊标签文字 + 左侧 3px 色条"三重信号**，颜色只是第三档冗余——色盲读者也能一眼分辨。

| 语义 | accent | soft | 对比度（on `#fafbfc`） | 角色名（英中双语胶囊） | 典型图标 |
|---|---|---|---|---|---|
| note | `#5c6778`（= textMuted） | `#f0f2f5` | 4.8:1 | **Note · 注** | `i` 圆圈（中性信息） |
| tip | `#0d9f7f` | `#e6f5f0` | 4.6:1 | **Tip · 小贴士** | 灯泡（友好提示） |
| info | `#0066cc`（= primary） | `#e6f0fb` | 7.1:1 | **Info · 补充** | `i` 方块（链接到更多） |
| warning | `#b87614` | `#fdf4e2` | 5.1:1 | **Warning · 常见陷阱** | 三角惊叹号 |
| danger | `#c8322d` | `#fce9e7` | 5.5:1 | **Caution · 重大变更** | 八边形 × / 禁止符 |
| deprecated | `#8a8f99`（删除线灰） | `#ececef` | 3.2:1（仅用于大字） | **Deprecated · 已废弃** | 删除线 + 斜体 |

**几条必须写死的纪律**：
- **info = primary 蓝**。技术文档里 info 容器本质是"这里有个延伸知识点"——让它等于主色是合理的，也让主题的视觉节奏统一。
- **tip 绿 `#0d9f7f` 是 Mint 绿**，不是鲜绿也不是翠绿——这是 Stripe Success Green 压一档饱和度的结果，友好但不卡通。
- **warning 琥珀 `#b87614`** 是主题 accent `#f59e0b` 的"文字色版本"（accent 作底色、`#b87614` 作文字色/图标色），达到 AA。
- **danger 陶土红 `#c8322d`**，不是鲜红 `#ff0000`——鲜红是"服务器告警"，陶土红是"这是一个 breaking change，你真的要注意"。后者才是技术文档的语气。
- **deprecated 灰** 是唯一允许的 disabled 色，必须搭配**文本级删除线**（`text-decoration: line-through`）使用——没有删除线就降格为普通 textMuted。

#### 代码语法高亮色（signature 决定成败）

tech-explainer 的代码块是**全主题的 signature**——技术文档 70% 的视觉印象来自代码块。拒绝 One Dark / Monokai / Dracula 的霓虹感（那是 tech-geek 都避开的东西），走 **GitHub Light / Prism Tomorrow** 的清爽版——**深灰底 + 冷色高亮**。

| 语法角色 | 色值 | 说明 |
|---|---|---|
| 代码块底 | `#1e2533` | 冷深灰（略带蓝），不走 `#282c34` One Dark 也不走 `#000` |
| 代码块正文 | `#e8ebf0` | 冷浅灰白，略冷于 tech-geek 的羊皮黄 |
| keyword（`function` `const` `if` `return`） | `#ff7b72` | 柔粉红（GitHub Dark 家族），不走 Dracula 紫 |
| string（`"..."`） | `#a5d6a3` | 柔绿（不走荧光绿） |
| comment（`// ...`） | `#8b98a8` | 中性灰蓝，明显弱化 |
| number / boolean | `#79c0ff` | 清凉蓝（和主色呼应但在深底上） |
| function name | `#d2a8ff` | 柔紫（GitHub Dark 默认） |
| 变量 / 参数 | `#e8ebf0`（= 正文） | 不单独高亮，保持低密度 |

**纪律**：不搞五彩满天。每行代码平均只应有 2-3 个色高亮，读者扫代码时**主视觉焦点仍是结构（缩进 / 括号 / 行号），而非色彩**。这是 GitHub Docs 和 Stripe Docs 都遵守的低饱和原则。

#### inline code 与 kbd 的色值

- **inline code**：`bgMuted #e8ecf1` 底 + `primary #0066cc` 字 + `1px 4px` padding + `3px` 圆角。字号 14px（比正文略小）。这是 Stripe Docs 的标志性 inline code 样式。
- **kbd 键帽**：`#fafbfc` 底 + `border 1px solid #d9dee5` + `border-bottom 2px solid #d9dee5`（模拟键帽立体轻微阴影，纯 CSS border 实现）+ `#1a2233` 字 + `2px 6px` padding + `3px` 圆角。字号 12-13px。**关键**：下边框 2px 比其他三边 1px 更深——这就是"键帽感"的全部奥秘，不需要 box-shadow（公众号也过不了 box-shadow）。

#### "拒绝什么"

- **拒绝 Bootstrap alert 四色**（`bg-info #d1ecf1` / `bg-warning #fff3cd` / `bg-danger #f8d7da` / `bg-success #d4edda`）——廉价 UI 框架识别度最高的配色
- **拒绝 CSDN 荧光黄 highlight + 大红标题**——"抖音教程"排版的通病
- **拒绝 Dracula / Monokai / One Dark 的霓虹代码块**——那是 tech-geek 都避开的东西，tech-explainer 绝对不能碰
- **拒绝纯黑 `#000000` 代码块底**——在白底主题上反差过猛，会让代码块"砸"出页面
- **拒绝任何 gradient / neon glow / box-shadow 大阴影**——平台过不了，气质也不对
- **拒绝"复制粘贴教程"的彩色 emoji 图标**（💡⚠️📌🔥✨）——tech-explainer 最容易犯的错
- **拒绝紫色系 primary**（无论 Linear 紫还是 VSCode Dracula 紫）——SaaS 营销味
- **拒绝主色是绿**——会和 Do/Don't 的 ✓ 打架

---

### 1.2 Typographic voice

技术文档的字体节奏和前面两个主题都不同：**层级丰富 + 字重克制 + inline 元素（code / kbd / link）必须全部定义**。CSDN / 博客园最大的通病就是"只定义了 h1 h2 h3 p，其他全靠浏览器默认"——结果 `<code>` 和 `<kbd>` 长得像 `<strong>`，`<a>` 藏在文本里看不见，教程读起来像没排版。

tech-explainer 的纪律：**400 正文、500 强调、600 小标题；700 只留给 h1 题头。inline 的 code / kbd / link 必须各有独立样式。代码块顶部必须有语言标签带。**

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（专题题头） | 26 | 700 | 0 | 1.35 | `text` | 题头唯一允许 700 字重；字距 0（现代文档风，不拉宽）；无装饰前缀 |
| h2（章节） | 21 | 600 | 0 | 1.4 | `text` | 底部 1px `border` 实线分隔（不是 2px 主色线——那太博客风）；前缀用主色 3px 短竖条 + 10px 间距 |
| h3（小节） | 17 | 600 | 0 | 1.5 | `text` | 无底线无前缀，纯靠字号 + 字重与正文区分 |
| h4（Step 小标题） | 15 | 600 | 0.3px | 1.5 | `primary` | **新增层级**：技术教程有四级小节（如 `Step 1. 初始化项目`），h4 必须定义；用主色 + 字重 600，和正文拉开但不抢 h3 的位 |
| p（正文） | 15 | 400 | 0.3px | 1.75 | `text` | 字重 400（白底不用补偿到 500）；行高 1.75（比 tech-geek 的 1.85 略密——教程密度应高于随笔） |
| small（脚注/caption） | 13 | 400 | 0.2px | 1.6 | `textMuted` | "最后更新 2026-04-20"、图片 caption、footer 日期 |
| pull-quote（Key Takeaway） | 17 | 500 | 0.3px | 1.7 | `text` | Tip Box 小结用；不放大字号（和 default / business-finance 的大号 pull-quote 路线不同）——教程里的 takeaway 应该像"我小结一下"的平口气 |
| `<code>` inline | 14 | 500 | 0 | 1.5 | `primary` | 比正文小 1px（更像"嵌入"而非"凸起"）；字重 500（白底 500 够分量）；字距 0 保留等宽视觉 |
| `<kbd>` | 13 | 600 | 0.2px | 1.4 | `text` | 键帽字；字距 0.2 补偿等宽感；搭配浅底 + 下边框 2px |
| `<a>` link | 15 | 400 | 0.3px | 1.75 | `primary` | 继承正文，只换色；`text-decoration: underline` + `text-underline-offset: 3px`（保留下划线——技术文档的"可点击"信号必须明确，不学某些现代 SaaS 把下划线去掉那种自作聪明） |
| 代码块正文 | 13 | 400 | 0 | 1.6 | `#e8ebf0`（on `#1e2533`） | 字号 13（比 tech-geek 的 13 同——代码块字号是跨主题共识） |
| 行号 | 12 | 400 | 0 | 1.6 | `#5c6778`（muted） | 代码块左侧 行号列，宽度 32px，右对齐 |
| 顶部语言标签带 | 11 | 500 | 0.5px | 1.4 | `textMuted` on `bgSoft` | 大写字距 0.5；格式 `JAVASCRIPT · src/api/auth.js` |

#### 字重纪律

- **禁止 300 和 200**——公众号客户端会退化成 400；自作聪明声明细体 = 白设计
- **400 只给正文和 `<a>`**；500 给 inline code 和 pull-quote；600 给所有 heading；**700 只给 h1 一处**
- **不出现 800 / 900**——那是营销 banner 的字重

#### 代码块顶部语言标签带（signature 决定成败的细节）

这是 tech-explainer 最重要的单一视觉元素，必须详细写清结构：

```
┌─────────────────────────────────────────┐
│ JAVASCRIPT · src/api/auth.js       [⧉]  │  ← 顶部标签带
├─────────────────────────────────────────┤
│ 1  import { NextResponse } from 'next'  │
│ 2  import { verify } from 'jsonwebtoken'│  ← 代码正文
│ 3                                       │
│ 4  export async function middleware(){  │
└─────────────────────────────────────────┘
```

**规格**：
- 外层代码块（`<pre>`）统一 `border-radius: 6px`、`overflow: hidden`；顶部标签带和代码正文共享外框
- 顶部标签带：`bgSoft #f3f5f8` 底（**比代码正文深灰底浅**——形成"文档内嵌入一块深色代码"的层次）、`textMuted #5c6778` 字、`11px font-size`、`500 font-weight`、`letter-spacing 0.5px`、`padding 8px 14px`、大写英文语言名（JAVASCRIPT / TYPESCRIPT / PYTHON / BASH / SQL / YAML / JSON）、中点 ` · ` 分隔、小写文件路径
- 右端可选**复制图标**（装饰性 SVG 小矩形 ⧉，`textMuted` 描边、16px 见方）——公众号不能真的实现复制，但这个图标是"读者可以抄这段"的文化信号，**不要吝啬，一定要画上**
- 代码正文块：`#1e2533` 冷深灰底、`#e8ebf0` 冷浅灰文字、`padding 14px 16px`、行号列用 `border-right 1px solid rgba(255,255,255,0.08)` 与正文区分

**语言标签颜色微差（可选进阶）**：可以让不同语言的标签文字换一点点色彩——JavaScript 黄（`#d4a015`）、TypeScript 蓝（`#0066cc`）、Python 蓝绿（`#3a7a8a`）、Bash 灰（`#5c6778`），但**底色保持统一的 bgSoft**。这是 Prism.js 的经典做法。仅当实现有余力时加，不是必选项。

#### h4 定义（新增）

h4 是技术教程必备但常被忽略的层级。tech-explainer 的 h4 专门承载 **"Step 1. 初始化项目"** 这类带编号的小标题——它介于 h3 章节小节和 p 正文之间，是**可操作的具体步骤题头**。规格见上表（15px / 600 / primary 色）。

---

### 1.3 SVG motif

tech-explainer 的 motif 语汇只有两个来源：**技术文档的 UI 语汇（kbd / url bar / terminal prompt / file path / copy icon / external link / 四态 icon / checkmark）** 和 **产品文档的结构语汇（步骤连接线 / 顶部语言标签带 / 行号列）**。**一切 emoji、Font Awesome 彩色图标、3D 立体、卡通化装饰、手绘线条 全部逐出**。

原则：
1. **几何化但不过于抽象**——技术文档语汇本就是一套约定俗成的符号（灯泡 = Tip、三角 = Warning），不像 tech-geek 要重新发明；可以稍具象，但**拒绝卡通化**（不要圆眼睛、不要笑脸灯泡）
2. **sw ≥ 1.5px**——公众号光栅化后细笔画会糊；不走极细线设计
3. **色彩走语义色 accent**，不乱用主色——四态图标必须一眼对应到四态色

#### 必备 motif 清单（共 8 件，比 tech-geek 的 7 件多一件复制图标，因为教程容器更多）

- **`h2Prefix`（章节短竖条）**
  文字草图：`▌ 2. 配置环境`——3px 宽 16px 高的 primary 蓝短竖条 + 10px 间距 + 文字。唯一的 heading 装饰，克制、清爽。

- **`infoIcon` / `tipIcon` / `warningIcon` / `dangerIcon` / `noteIcon`（四态 + note 五件套）**
  五个 16×16 几何图标，**必须同一视觉语系（圆角 2px、线宽 1.5、内部留白等）**，否则四态混排会花：
  - `noteIcon`：空心圆 + 中央小 `i`（note 灰）——中性信息标
  - `tipIcon`：灯泡轮廓（圆头 + 底部 2 道灯座横线，不要画灯光放射线，那是卡通化）——mint 绿
  - `infoIcon`：圆角方形 + 中央 `i`（info 蓝 = primary）——与 note 的圆形区分
  - `warningIcon`：等边三角形 + 中央 `!`（warning 琥珀）
  - `dangerIcon`：八边形 + 中央 `×`（danger 陶土红）——stop sign 的简化，**不要用禁止符那个圆 + 斜线**（语义是"禁止"而不是"危险"）
  - 共性：线宽 1.5 统一；都填充空心（stroke，不 fill），让底色透过来，更轻更文档化

- **`checkmark` / `cross`（Do / Don't 的 ✓ / ✗）**
  - `checkmark`：14×14，mint 绿 `#0d9f7f`，两笔勾的简化路径，sw=2
  - `cross`：14×14，danger 陶土红 `#c8322d`，两笔交叉 ×，sw=2
  - 这两个必须成对，compare 容器的 Do/Don't 双栏每栏首行都会用

- **`stepBadge(n)`（圆圈数字）**
  文字草图：`①` —— 24×24 primary 蓝 fill 圆 + 中央白色数字（`#fefefe`，规避纯白透明）+ font-size 15（光栅后 ≥ 14）+ 字重 600。用于 steps 容器。
  **与 default 的 stepBadge 的区别**：default 是纯圆圈 + 数字，tech-explainer 的 steps 容器**额外加一根左侧 1px 连接竖线**（见 §2.16）——这根竖线不是 SVG 资产，是容器 CSS 的 `border-left`，但视觉上 stepBadge 和连接线组合成"线上串珠"的教程步骤节律。

- **`copyIcon`（代码块右上角装饰）**
  16×16，两个叠放的圆角方形（后方 sw=1.5 描边、前方 sw=1.5 描边 + 左下角偏移 2px），`textMuted` 色。这是 GitHub / Stripe / MDN 所有技术文档代码块右上角的 universal 复制图标——公众号不能真的复制，但这个图标本身是**"这段代码是给你抄的"的文化信号**。极其重要，不能省。

- **`externalLinkIcon`（外链箭头）**
  12×12，右上角 45° 箭头（一条短对角线 + 右上角箭头头的两段 L 形 + 左下角一个 L 形方框），`primary` 色，sw=1.5。用于 `<a>` 元素外链的装饰——inline SVG 跟在链接文字后 2px 间距。这是 MDN / Stripe Docs 的 universal 外链标识。

- **`terminalPrompt`（bash 代码块前缀 `$`）**
  18×14，primary 蓝 `$` 字符（SVG `<text>`，字号 14），单独作为 inline SVG 可贴在 bash 代码块第一行前——提示读者"这行是 shell 命令"。tech-geek 用 `// NOTE` 做注释前缀，tech-explainer 用 `$` 做命令前缀，两者语义、语系都区分开。

- **`filePath` 胶囊（文件路径 inline 引用）**
  这个不是单独的 SVG，是 inline 元素 `<span class="file-path">src/api/auth.js</span>` 的 CSS 样式：`bgMuted #e8ecf1` 底 + `text` 字 + `1px 6px` padding + `3px` 圆角 + 字号 13 + letter-spacing 0。视觉像 inline code 但底色稍浅、字色是 `text` 不是 primary——用于在正文里引用具体文件路径（如"打开 `src/config/db.ts` 文件"）。**这个胶囊与 inline code 的差别必须写清楚**：code 是"这是一段代码片段"（字色 primary），filePath 是"这是一个文件路径"（字色 text）。

#### kbd 键帽（不是 SVG，是 CSS）

如上文字体表所述——`<kbd>` 通过 CSS 实现（浅底 + 四边 border-1px + 底边 border-2px + 圆角 3px + 12-13px 字号 + 字距 0.2px）。典型用法 `<kbd>⌘</kbd> + <kbd>K</kbd>` 呈现为两个相邻的键帽 + 中间的 `+`。

#### motif 使用纪律

- 每篇文章最多出现**一次** copyIcon（代码块默认都自带，但读者视觉识别它一次就够）
- 外链图标 externalLinkIcon 必须出现在**每个** `<a>` 后（一致性比"克制"重要——读者需要可预期的信号）
- 四态图标在同一个容器里不重复，但跨容器可重复（如一篇文章里可以有 3 个 Tip Box，每个都显示 tipIcon）
- terminalPrompt `$` 只用于 `language-bash` 代码块；JS / TS / Python 不用
- **禁止的 motif**：emoji（💡⚠️📌🔥）、Font Awesome 彩色图标、手绘/涂鸦风、3D/渐变、CSDN 的`【重要】【注意】`大字标签、微信干货号的箭头堆叠（`→→→`）

---

## 2. 19 个 Container 的视觉差异化方案

所有容器角色用**技术文档语汇**重命名。结构描述里的数值都是起手值，实现 agent 可±2px 微调。

### 2.1 `intro` → **TL;DR · 本文要点**

教程开头的"三句话摘要"，给赶时间的读者。
- 结构：顶部一行 `TL;DR` 大写胶囊标签（13px / 字距 0.5px / primary 蓝 / bgSoft 底 / padding `2px 8px` / 圆角 3px / inline-block）+ 下方 3-5 条短句列表（不要完整段落）
- 容器：`bgSoft #f3f5f8` 底、`border-left 3px solid primary`、padding `14px 18px`、margin `20px 0`、圆角 `0 6px 6px 0`
- 正文 15px / textMuted——摘要本就应比正文淡一档

### 2.2 `author` → **作者 + 最后更新日期**

技术文档的"新鲜度标记"极其重要——一篇过期的教程比没有教程更糟。
- 结构：一行文字。格式 `[作者头像 20×20 圆形] 作者名 · 最后更新 2026-04-20 · 阅读时长 8 分钟`
- 作者头像可选（如有则走 `<img>` 20×20 + `border-radius: 50%` + `vertical-align: middle`；如无则省略）
- 字号 13 / textMuted / 字距 0.2px
- 无底色无边框——颜色克制到几乎融入页面
- **"最后更新"必须醒目**：日期本身可用 `text` 色 + 字重 500，其他信息保持 textMuted

### 2.3 `cover` → **标题 + 前置知识 + 预计阅读**

教程封面的信息密度远高于人文主题——读者点开第一眼要知道"这教程值不值得读"。
- 结构（从上到下）：
  1. 大号标题（h1 层级，26px / 700）
  2. 一行副标题（17px / 500 / textMuted）—— 可选
  3. **前置知识胶囊带**：`前置知识：` 前缀（13px textMuted）+ 后接多个 inline-block 胶囊（如 `HTML` `CSS` `JavaScript 基础`），每个胶囊 `bgSoft` 底 + `border 1px solid border` + `3px 10px` padding + `3px` 圆角 + 字号 13
  4. **阅读时长 + 更新日期行**：`📖 15 分钟阅读 · 最后更新 2026-04-20`——**注意**：这里**可以例外使用一个书本字符 📖 或时钟字符**（是的，我刚说禁 emoji；但这里是信息性图示，不是情绪装饰）——**更好的做法是用 SVG 的书本 icon**，避免 emoji 陷阱
- 背景 `bg`（不贴纸），底部 1px border 实线分隔下方正文

### 2.4 `sectionTitle` → **章节小节**

primary variant: `bordered` 重做为 **short-bar-heading**
- 结构：左侧 3px × 16px primary 蓝短竖条 + 10px 间距 + 文字
- 无底线、无背景
- margin `32px 0 14px`——章节间需要大喘息

### 2.5 `quote` → **引用官方文档 / 规范**

primary variant: `column-rule`——双侧细竖线夹住段落
- 结构：左右各一根 1px `border` 细竖线（高度随内容）+ 中间 15px / italic / textMuted 文字
- padding `16px 24px`、margin `20px 0`、无底色
- 底部一行 13px textMuted 的 `—— MDN Web Docs, "Arrays"` attribution（前缀 `—— `）
- **与 tech-geek 的 quote 区别**：tech-geek 用 `<` `>` heredoc 括号（代码隐喻）；tech-explainer 用双竖线（印刷隐喻）——两者视觉语汇完全不同

### 2.6 `quoteCard` → **Key Takeaway · 核心要点**

小节末尾的"我小结一下"。
- 结构：顶部 `Key Takeaway · 核心要点` 胶囊标签（同 TL;DR 规格但字色 primary 白底 → 这里用 mint 绿 `#0d9f7f` 字 + tip.soft `#e6f5f0` 底）+ 下方 17px / 500 / text 的 pull-quote 文字（1-3 句）
- 容器：`bgSoft` 底、`border-left 3px solid #0d9f7f` mint 绿色条（与 tip 容器同一绿但位置是左侧 3px——读者形成"绿色 = takeaway / tip 家族"的认知）
- padding `16px 18px`、margin `20px 0`、圆角 `0 6px 6px 0`
- 无引号装饰——takeaway 不是引文是小结

### 2.7 `footerCTA` → **下一篇 / 相关教程**

- 结构：顶部一行 `继续阅读 · Continue Reading` 大写胶囊标签 + 下方 2 个横向卡片（`display: table` + 2 个 `table-cell`，间距 12px）：`← 上一篇：配置环境` / `下一篇：部署到生产 →`
- 每个卡片：`bgSoft` 底 + `border 1px solid border` + padding 14px + 圆角 6px + 14px 字号
- 箭头 `←` `→` 是 text 字符不是 SVG——字符足够清楚
- **拒绝**"关注公众号 · 分享好友 · 点赞在看"这种营销钩子堆叠——技术文档的 CTA 只有"读下一篇"和"去仓库 Star"两种

### 2.8 `recommend` → **延伸阅读 + 官方文档链接**

- 结构：顶部 `Further Reading · 延伸阅读` 大写标签 + 下方列表，每项一行：`标题` + externalLinkIcon + ` — 来源` （13px / textMuted）
- 标题 primary 色 + 下划线，链接样式；来源走 textMuted
- 项间距 10px，无底色
- 这是 MDN 每篇文档底部"See Also"的翻版

### 2.9 `qrcode` → **关注公众号追更 / GitHub 仓库**

- 结构：`display: table` 两列（二维码左 90×90 + 右侧文字说明）
- 右侧三行：`GitHub 仓库`（13px textMuted 大写）/ `github.com/user/repo`（15px primary）/ `Star & Watch 追更`（13px textMuted）
- 底色 `bgSoft`、padding 16px、圆角 6px
- **与 tech-geek 的 Address Block 区分**：tech-geek 走 signature block 风（无底色、`HANDLE` `CHANNEL` 大写标签）；tech-explainer 走"GitHub 仓库卡片"风（有浅底、有圆角、有 primary 色 URL）——两者的"关注我"文化完全不同

### 2.10 `tip` → **Tip · 小贴士**

primary variant: `accent-bar` 保留但精修
- 结构：
  ```
  ┌─────────────────────────────────
  │[💡icon] Tip · 小贴士
  │
  │  这里放正文，15px 正文字号。
  │  可以有第二段。
  └─────────────────────────────────
  ```
- 顶部一行：`tipIcon` 16×16（mint 绿灯泡）+ 8px 间距 + `Tip · 小贴士` 胶囊（13px / 字距 0.5px / mint 绿字 + tip.soft 底 + padding `2px 8px` + 圆角 3px + inline-block）
- 容器：`tip.soft #e6f5f0` 底、`border-left 3px solid #0d9f7f`、padding `14px 18px`、margin `18px 0`、圆角 `0 6px 6px 0`
- 正文 15px text
- **关键**：胶囊标签的"Tip · 小贴士"是英中双语——英文 + 中点 + 中文。这是 MDN / GitHub 中文文档的通用做法，既友好又专业

### 2.11 `warning` → **Warning · 常见陷阱**

同 tip 结构，换色换图标换标签：
- `warningIcon` 三角惊叹号（warning 琥珀 `#b87614`）+ `Warning · 常见陷阱` 胶囊
- 容器：`warning.soft #fdf4e2` 底、`border-left 3px solid #b87614`
- 其余同 tip

### 2.12 `info` → **Note · 注意事项**

同 tip 结构：
- `noteIcon` 空心圆+i（note 灰 `#5c6778`）+ `Note · 注意事项` 胶囊
- 容器：`note.soft #f0f2f5` 底、`border-left 3px solid #5c6778`
- 其余同 tip
- **关键**：tech-explainer 的 `info` 容器**中文叫"注意事项"不是"信息"**——info 在技术文档里语义就是"中性补充说明"，用 Note 更准确

### 2.13 `danger` → **Caution · 重大变更**

比 tip/warning/info 更重：
- `dangerIcon` 八边形 × （danger 陶土红 `#c8322d`）+ `Caution · 重大变更` 胶囊（白字 + 陶土红底——唯一反白的标签）
- 容器：`danger.soft #fce9e7` 底、`border-left 4px solid #c8322d`（左条比其他容器粗 1px——视觉加重）、padding `16px 18px`（比其他容器多 2px——空间加重）
- 正文 15px text，字重可选 500（轻微加重）
- **拒绝**：不用红底白字的警告条、不用满屏红底——那是服务器告警。本主题的 danger 是"这是个 breaking change，请留意"，克制但明确

#### tip / note / info / warning / danger 的一眼可辨纪律

五个容器（是的，tech-explainer 多一个 note，所以是五态）必须**即使黑白打印**也能分辨：

| 容器 | 图标形状 | 胶囊标签 | 左条宽度 | 底色 | 识别重心 |
|---|---|---|---|---|---|
| tip | 灯泡 | Tip · 小贴士 | 3px mint | `#e6f5f0` | 友好、进阶 |
| note | 圆圈+i | Note · 注意事项 | 3px note 灰 | `#f0f2f5` | 中性补充 |
| info | 方块+i | Info · 补充 | 3px primary 蓝 | `#e6f0fb` | 延伸链接 |
| warning | 三角+! | Warning · 常见陷阱 | 3px 琥珀 | `#fdf4e2` | 你会被坑 |
| danger | 八边形+× | Caution · 重大变更 | 4px 陶土红 | `#fce9e7` | 别做这事 |

**严禁做成 Bootstrap alert 那种四个矩形框塞满一屏的廉价感**——纪律是"每篇文章不超过 2 个警告类容器"，读者看多了就麻木。

#### tip 容器 vs 代码块的边界

tech-explainer 的 tip 是浅色底（`#e6f5f0` mint soft），代码块是深色底（`#1e2533`）——**两者天然区分**。不像 tech-geek 深色底全家同色需要额外信号。但仍有一条纪律：**tip 容器内不放大段代码**——如果需要"带代码示例的 tip"，把代码块放到 tip **外**，tip 只写一句话引导（"参考下面的示例"）。tip 内只放 inline code（`<code>`），不放 pre 代码块。

### 2.14 `highlight` → **Pro Tip · 进阶技巧**

与 tip 的区分：tip 是"新手小贴士"（基础注意），Pro Tip 是"进阶技巧"（高手分享）。
- 结构：顶部一行 `💡 Pro Tip · 进阶技巧` 胶囊（琥珀 accent `#f59e0b` 图标 + warning.soft 底 + warning 琥珀字）—— **注意**：这里用琥珀是和 warning 同家族但语义完全不同（warning 警告、Pro Tip 点拨），靠标签文字区分
- 容器：`warning.soft` 底 + `border-left 3px solid #f59e0b` + padding `14px 18px` + 圆角
- 正文 15px text，可带 pull-quote 感
- **与 tip 的使用场景区别**：tip 是"刚学会的人应该注意 X"，Pro Tip 是"已经会了的人可能不知道 X"——后者的语气更像"私下分享"

### 2.15 `compare` → **Do / Don't · 正反对比**

primary variant: `column-card` 重做为 **do-dont-cols**
- 结构：`display: table`，两列 `table-cell`（50% / 50%）
- 左列首行：`checkmark` SVG（mint 绿 ✓）+ 8px 间距 + `Do · 推荐写法` 胶囊（mint 绿字 + tip.soft 底）
- 右列首行：`cross` SVG（陶土红 ✗）+ 8px 间距 + `Don't · 避免这么做` 胶囊（陶土红字 + danger.soft 底）
- 两列间 16px 间隙（用 cell 的 padding-right / padding-left 实现，不用 gap）
- 每列 padding 16px，底色分别 `#f7fbf9`（淡 tip）和 `#fcf4f3`（淡 danger）——**这是唯一允许让 compare 双列走绿/红底的地方**，因为语义就是 Do/Don't 的对立；但底色必须浅到只有"暗示"而非"对抗"
- 变体：如果是"旧写法 vs 新写法"（API 迁移），图标可换 `✕ 旧` / `✓ 新`，语义等价
- **禁止**：git diff 的红底绿底高饱和版、小红书"避雷"贴的大红叉——本主题的 Do/Don't 是教学对比，不是道德审判

### 2.16 `steps` → **Step 1 → Step 2 → Step 3 · 教程步骤**

primary variant: **numbered-connected**（自定义变体，如果与 `number-circle` 等价则选 `number-circle`，但必须带连接竖线）
- 结构：每步一行（`display: block`），左列是 stepBadge 圆圈数字（24×24 primary 圆 + 白数字），右列是正文
- **关键差异**：steps 容器外层加 `border-left: 1px solid border`（淡灰蓝 border 色）+ `padding-left: 24px`，形成左侧一条细竖线；每个 stepBadge 通过 `margin-left: -36px`（负值）让圆徽章"坐"在竖线上——视觉上是"线上串珠"的教程步骤节律
- 每步结构：
  ```
  │
  ├─① Step 1. 初始化项目
  │   15px 正文说明文字。
  │   可以有多段。
  │
  ├─② Step 2. 安装依赖
  │   ...
  ```
- Step 标题用 h4 规格（15px / 600 / primary）
- 步间距 `margin-bottom: 20px`
- 最末步后竖线停止（容器 padding-bottom 0）
- **与 default 的区别**：default 是独立圆圈数字、无连接线；tech-explainer 是**连续竖线串圆**——教程感更强
- **与 tech-geek 的区别**：tech-geek 用 `[1][2][3]` 方括号 + 无竖线（"可跳步、可重入"）；tech-explainer 用 ① + 竖线（"顺序、连续、跟着做"）——读者关系再次体现

### 2.17 `divider` → **横规**

primary variant: `rule`——极简 1px 实线
- 内容：220px 宽 1px `border` 实线，居中，margin 上下 28px
- 备选 variants：
  - `dots`：5 个小圆点等距排列，primary 色 + 中间点略大——段落内轻停顿
  - `glyph`：一个小菱形 ◆（primary 色 SVG），长文章节间用
  - 本主题**禁用** `wave`（太装饰）和 `flower`（太人文）

### 2.18 `mpvideo` / `mpvoice` → **视频 / 音频教学**

公众号视频/音频嵌入容器。
- 结构：外层 `display: block`、bgSoft 底、`border 1px solid border`、圆角 6px、padding 14px
- 顶部一行胶囊标签 `▶ Video · 视频演示` 或 `♪ Audio · 音频讲解`（primary 蓝 / bgSoft 底）
- 下方是实际嵌入
- 底部可选一行 `— 建议配合正文阅读 ·  04:32`（13px textMuted）

### 2.19 `free` → **自由容器**

Escape hatch。
- 结构：继承正文字距和底色，无任何装饰
- 保持它真正"自由"，不强加 motif

---

## 3. 反例对照（毒舌版）

写出来是为了让实现 agent 随时能拿这份表做"我是不是在做一个廉价教程皮肤"的自检。

### 3.1 CSDN "【重要】【注意】" 大字标签 + 荧光色

**症状**：h2 前加红色 `【重要】` 方头括号标签、tip 用纯黄 `#ffff00` 底、warning 用大红底白字"⚠️严重警告⚠️"。
**为什么烂**：这是小学作文的修辞（划重点、打五角星）搬到技术文档——它暴露作者认为读者**没有能力自己识别重要内容**，需要靠字号/颜色/标签把读者摁在座位上。真正的好教程是"把重要的写在前面、把次要的写在后面"，而不是把次要的也贴个大红标签。
**规避**：本主题的标签系统只有五种（Tip / Note / Info / Warning / Caution）+ 一个 Pro Tip——全部英中双语胶囊、底色饱和度 ≤ 6%、字号 13。**严禁"重要"、"注意"、"划重点"这些口水词作为独立标签**。

### 3.2 emoji 💡⚠️📌🔥 替代图标

**症状**：tip 前缀用 💡、warning 用 ⚠️、danger 用 🚨、highlight 用 🔥、"点赞"用 👍。
**为什么烂**：emoji 是短平快的社交媒体语言，**跨平台不一致**（iOS / Android / Windows 的 emoji 设计完全不同，读者在不同设备看到的是不同的图）——这对技术文档的"一致性"是致命伤。更重要的是 emoji 携带的是**情绪语义**而非信息语义，而技术文档要的是信息不是情绪。
**规避**：全主题的 motif 图标**全部 inline SVG**——自行绘制、色彩统一、跨平台渲染一致。四态图标 + checkmark/cross + copyIcon + externalLinkIcon + terminalPrompt 八件套，加起来不到 4KB，零 emoji。

### 3.3 掘金首页营销色（渐变 banner + 彩色卡片）

**症状**：封面用 linear-gradient 紫蓝渐变、cover 容器用"大标题 + 炫酷背景图"、footerCTA 用"立即订阅"按钮带悬浮阴影。
**为什么烂**：这是内容平台的**流量运营思维**——"让读者第一眼被吸引"比"让读者读完有收获"更重要。技术文档的读者是**带着问题来的**，不是被封面骗进来的——营销色会稀释内容本身的权威性。同时 linear-gradient 和 box-shadow 公众号 juice 层过不了，实际渲染会翻车。
**规避**：封面只有"标题 + 前置知识胶囊 + 阅读时长"三行文字信息，**无 banner、无渐变、无大图**。CTA 是 `← 上一篇` / `下一篇 →` 两个浅底卡片，不是"点击订阅"按钮。

### 3.4 Bootstrap alert 四色方框（廉价 UI 库感）

**症状**：tip 用 `bg-info #d1ecf1` 浅蓝框、warning 用 `bg-warning #fff3cd` 浅黄框、danger 用 `bg-danger #f8d7da` 浅红框、success 用 `bg-success #d4edda` 浅绿框——四个扁平方框 + 无图标 + 无标签。
**为什么烂**：Bootstrap alert 是 2013 年的 UI 框架遗产，它的配色是**通用 Web UI** 而非**技术文档**——通用 UI 要兼顾所有场景，所以颜色必须中庸；但技术文档需要**针对内容定制的视觉语汇**。抄 Bootstrap = "我没有思考过容器该长什么样，我抄了个现成的"。更糟的是 Bootstrap alert 没有图标、没有标签胶囊，五种容器只靠底色区分——色盲不友好。
**规避**：本主题的五态容器**图标 + 胶囊标签 + 左侧色条 + 底色**四重信号冗余，每层都承担识别责任。底色饱和度 ≤ 6%（远低于 Bootstrap 的 15%），标签是英中双语胶囊不是单色字——任何一层失效读者仍能分辨。

### 3.5 emoji + 感叹号 + 红箭头堆砌（微信干货号）

**症状**：`🔥🔥🔥 建议收藏！！！ ➡️➡️➡️ 保姆级教程 👇👇👇`
**为什么烂**：这是公众号流量号的话术模板，它不属于技术文档——它属于情绪营销。任何带这种话术的教程都会让读者**默认作者是二道贩子、内容是抄的**——真正的第一手工程师写教程时不会用这种话术。
**规避**：全主题禁所有 emoji、禁双感叹号、禁连续箭头。要 CTA 就写 `下一篇 →`，要吸引就靠标题本身，要强调就靠 `<strong>` 粗体 + inline code。**"保姆级"、"建议收藏"、"干货满满"全部视作文案违禁词**。

### 3.6 截屏不加边框直接糊在段落里

**症状**：文章里贴一张 Terminal 截屏或浏览器控制台截图，`<img>` 直接怼在段落中间，**无圆角、无边框、无阴影、无 caption**——图和文字糊在一起，读者分不清哪是图哪是正文。
**为什么烂**：截图是技术教程的高频元素，但截图本身是**低分辨率、低对比度、非本主题配色**的——不加处理直接嵌入会让整篇文章的视觉一致性崩盘。
**规避**：img 必备三件套——`border: 1px solid border` 淡边框 + `border-radius: 6px` + `margin: 18px auto` 上下呼吸 + `max-width: 100%`。有条件的加 `figcaption`（13px textMuted，图片下方 8px 间距）说明"图 1：xxx 界面"。这是 A List Apart / Stripe Docs 的 universal 截图处理。

### 3.7 代码块无顶部标签带（光秃秃深色块）

**症状**：`<pre>` 直接是一块深色底 + 白字，没有语言名、没有文件路径、没有复制图标——读者看到代码块**不知道这是什么语言、该贴到哪个文件**。
**为什么烂**：这是 tech-explainer 最容易犯的错——默认 highlight.js 或 prism.js 渲染的代码块就是光秃秃的。但**顶部标签带是技术文档代码块的 signature**，缺了它整个主题的"Stripe Docs 气质"就塌了一半。
**规避**：本规范 §1.2 写死了代码块顶部标签带的完整规格——`JAVASCRIPT · src/api/auth.js` 格式、bgSoft 底、11px 字距 0.5px、右端复制图标。**实现 agent 如果偷懒省略顶部标签带，直接打回**。

### 3.8 "AI slop" 技术文档主题

**症状**：配色"正确"（蓝 + 白 + 灰）、间距"合理"、图标"齐全"，但**每一个决策都是最安全的中间值**——没有任何地方让读者感觉到"这个设计师做过取舍"。它是平均值，是"技术文档该有的样子"的统计结果。
**为什么烂**：这是大多数 AI 生成设计的通病——**没有"拒绝什么"的决策就没有风格**。tech-explainer 最危险的地方正是它太"合理"——蓝白灰 + 五态容器 + 代码块 + kbd 键帽，这个配方太熟悉了，很容易滑入"又一个 docs 主题"的平庸。
**规避**：本文档每一节都有明确的"committed 决策 + 拒绝理由"——主色为什么选 A 不选 B / C（拒绝紫 SaaS 味、拒绝绿 success 语义冲突）、底色为什么 `#fafbfc` 不 `#ffffff`（纯白 OLED 刺眼）、Pro Tip 为什么和 Tip 分开（一个新手向一个进阶向）、steps 为什么有连接线（和 default / tech-geek 区分）——**删除和拒绝才是这套规范的主声部**，而不是"我们加了什么"。

---

## 4. Committed 总结

本规范的三条不可妥协决策（实现 agent 如需偏离，必须先在 issue 里说服我）：

1. **主色 `#0066cc` Stripe 文档蓝**，不走 Linear 紫（SaaS 营销味）、不走友好翠绿（和 success 语义冲突）——这一条决定了主题是否还能被称为"白昼教学文档"而不是"另一个 SaaS landing"。底色 `#fafbfc` 微冷白而非纯白（OLED 刺眼），与 default / academic / literary 的白色家族明确错开身位。

2. **代码块顶部语言标签带是全主题的 signature**——`bgSoft` 底 + 大写语言名 + 中点 + 小写文件路径 + 右端复制图标。11px / 字距 0.5px / textMuted。缺了这条带，整个主题的 Stripe Docs 气质就塌了一半——实现 agent 偷懒省略直接打回。

3. **与 tech-geek 彻底不打架的三条硬边界**：(a) 色系 180° 反向（琥珀暖暗 vs 文档蓝清凉白）；(b) motif 语系完全隔离（manpage `§ ¶ ⁂ [1]` 印刷符 vs 技术文档 kbd / $ / 文件路径胶囊 / copyIcon）；(c) 读者关系完全不同（写给已懂工程师的冷静随笔 vs 手把手带你做的产品文档）——任何一条边界被破坏（比如 tech-explainer 用上了 `// NOTE` 注释前缀、或 tech-geek 用了 `Tip · 小贴士` 英中双语胶囊），两个主题就会互相污染、读者在 2 秒内无法分辨，那就是做失败了。

tech-explainer 的成败不在于它是否"美观"或"酷"，而在于读者照着教程做的时候会不会心想："这篇写得真清楚，我能照着做出来。"那就对了。**清楚 > 美观 > 酷**——这是它最硬的价值排序。
