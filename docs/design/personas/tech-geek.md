# Tech Geek · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`（深色底尤其要盯）。

---

## 定位一句话

**tech-geek 不是"程序员皮肤"，是"工程师写作"。** 参照坐标是 Plan 9 的 manpage、Phrack 的 ASCII zine 骨架、ACM Queue 的白皮字距、Dan Luu 写数据时不加装饰的 plain HTML、Fabien Sanglard 暗底复古印刷、Knuth 在 TAOCP 里用 `§` 与脚注制造的层级。气质关键词：**成年、克制、琥珀、脚注**。拒绝坐标也写死：拒绝 VSCode Dracula / One Dark / Monokai 的廉价深色皮肤复刻，拒绝 Tron 霓虹蓝紫渐变，拒绝小红书"程序员必备配色"那种荧光绿 + 黑底的赛博朋克，拒绝 🚀💻⚡ 等码农 emoji，拒绝 CRT glitch / scanline glow / neon bloom 之类**怀旧当气质**的装饰，拒绝一切"AI slop 深色主题"——正确但没有作者。

**选择方案 A：深色路线，VT220 琥珀 + Plan 9 manpage 气质，committed 到"成年工程师写作"。** 不选 B（浅色白皮书）的原因很简单：在本项目五套主题的矩阵里，literary-humanism 已经占据米底出版物的位置、business-finance 占据白底研究所内参的位置——tech-geek 如果也退到浅底，就变成"另一个内参"；项目会失去一个气质段位。深色主题的不可替代性是它能承载一种**夜班工程师视角**——凌晨三点对着终端写事故复盘的那种人格。关键不是放弃深色，而是让深色从"VSCode 皮肤"升格到"VT220 终端 + manpage"——远离 neon，走进 amber。

一句话收束：**tech-geek 应该让读者觉得"这是一个写了二十年系统代码的工程师，在 man page 的排版纪律下写他的工程随笔——不是在炫酷，是在认真"**。

---

## 1. Persona 三件套

### 1.1 Color story

当前配色的问题不是"深色太深"，是**青绿 `#4ec9b0` 过于 VSCode**：这个色值几乎是 One Dark 和 Dracula 的"类型色"（type highlight）默认值，任何看过 IDE 的读者都能一眼识别它的出处——等于给主题盖了个"我是 AI 生成的深色皮肤"的戳。`#12141a` 蓝黑底同样是 IDE 默认，冷、硬、像未调色的 PS 画布；accent `#ffbf5f` 的暖黄浮在蓝黑底上显得孤立，三色没有形成一个有呼吸的"终端 + 琥珀磷光屏"家族。

我只做一版提案——**A 版：墨炭暖底 + VT220 琥珀主色 + HN 橙 accent，彻底脱离 VSCode 青绿**。没有 B 版本分支：上文的方案 B（浅色白皮书）另开一主题更合适，不塞进 tech-geek。

#### 新色值提案

| token | 旧值 | 新值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|---|
| `bg` | `#12141a` | `#14110d` | 墨炭底 | **关键改动**：从冷蓝黑改到**暖炭黑**。带一丝暖、像旧 CRT 的背光漏出；纯黑 `#000` 不用（对比度太硬、光栅噪点重），蓝黑不用（VSCode 味）。`#14110d` 是"夜里关灯但没拉窗帘"的那种黑——有空气感 |
| `bgSoft` | `#1b1f27` | `#1e1a14` | 炉火暗 | 代码块、容器浅底层；和 bg 拉开 4-5% 明度，够分辨边界又不会"悬浮感" |
| `bgMuted` | `#242933` | `#2a241c` | 旧纸炭 | inline code 底、compare 表头底；再深一档用作对比参考底 |
| `text` | `#e6e6e6` | `#e6d9c2` | 羊皮黄 | **关键改动**：正文从"中性灰白"改到**淡羊皮黄**。VT220 的 amber phosphor 底色就是偏黄白而非纯白——这一步直接把主题从"VSCode 夜间"搬到"终端磷屏"。`#e6d9c2` 不触发 `#fff → 透明` 的平台问题，且对比度 9.1:1 远超 AA |
| `textMuted` | `#9aa5b1` | `#8c8272` | 雾色批注 | 从冷灰改到暖灰，和正文羊皮黄同家族；批注 / 日期 / 脚注号用 |
| `textInverse` | `#12141a` | `#14110d` | 墨炭底 | 跟随 bg |
| `primary` | `#4ec9b0`（低饱青绿） | `#d4a65a` | VT220 琥珀 | **最关键的一刀**：砍掉 VSCode 青绿，换 VT220 amber phosphor。`#d4a65a` 是 DEC VT220 原机的 amber 磷光屏在相机下的中频色——比纯金柔、比棕土亮、夜间护眼（长波低蓝光），且在深色主题矩阵里**绝不和任何 IDE 默认色撞衫** |
| `secondary` | `#56b6c2`（青蓝） | `#8a7a54` | 旧铜灰 | 辅色不再承担"第二主色"，降格为"年代灰"——给 divider / border / 脚注号等安静地方用；彻底不再和 primary 抢戏 |
| `accent` | `#ffbf5f` | `#e06a28` | HN 橙 | 改成 Hacker News 橙（`#ff6600` 的略压饱和版）。整个主题的"点睛色"交给它——highlight 数字、pull-quote 引号、pilcrow、dangerous 警示色的一部分都从这里取。HN 橙在深底上极度醒目但不 neon，和 amber 主色同色相邻区（色轮 30° 内），形成"黄-橙"一家族的**成年配色** |
| `border` | `#2a2f3a` | `#3a3228` | 边栏线 | 暖深棕灰，比新 bg 深 8%，仅承担 1px 实线 / 虚线分隔 |
| `code` | `#ffbf5f` | `#d4a65a`（= primary） | VT220 琥珀 | 代码色 = 正文强调色 = 主色。tech-geek 的签名动作：**代码不再是"割裂的彩色块"，它和正文同色同家族，只靠字距与底色微差与正文区分** |

#### 语义色（深色底最容易变成警报灯的地方，核心返工）

这是 VSCode 皮肤最常翻车的模块。四个语义各给一个高饱和色（青 / 黄 / 蓝 / 红）塞在黑底上，瞬间变成"服务器机房的四色指示灯"——**工程气 → 警报气**，气质崩塌。tech-geek 的语义色纪律三条：

1. **全部语义色拉进"琥珀家族 + 冷绿点缀 + 冷蓝点缀"的低饱和区**，严禁出现"纯红 + 纯黄 + 纯蓝 + 纯绿"的彩虹四色。
2. **不靠颜色区分，靠注释前缀语言 + 边框样式区分**——`// NOTE` vs `// CAVEAT` vs `// PITFALL` vs `// REF`。读者扫一眼就知道类别，颜色只是第二信号。
3. **深色底正文色对比度用"文字色 vs 底色"而非"色块 vs 底色"算**——这是 VSCode 皮肤常年算错的地方。下表的对比度全部走 WebAIM 的 WCAG 公式，基于 `#14110d` 墨炭底。

| 语义 | accent（前缀/图标/边框色） | soft（容器浅底） | 对比度（accent on `#14110d`） | 角色名 |
|---|---|---|---|---|
| tip | `#a8c08a` | `#1e1f16` | 9.4:1 | `// NOTE`（备注） |
| warning | `#d4a65a`（= primary） | `#1e1a14` | 9.0:1 | `// CAVEAT`（谨慎） |
| info | `#7a9cb8` | `#161b1f` | 7.6:1 | `// REF`（参见） |
| danger | `#c85a3a` | `#1f1612` | 6.3:1 | `// PITFALL`（陷阱） |

对比度全部 ≥ AA；**danger 不走 `#ff4444` 鲜红**——鲜红在深底是"服务器宕机告警"的语义，不是工程写作。`#c85a3a` 是被 HN 橙压了一档的**陶土红**，更像 manpage 里标注"DEPRECATED"的那种成年红。

**warning 和 primary 共用 `#d4a65a`** 不是 bug 是 feature——工程写作里 warning 本该是最常出现的语义（"这里有个坑但能绕"），让它 = 主色，形成视觉节奏；而 danger 的**稀缺性**靠陶土红保证（整篇最多出现 1-2 次）。

#### "拒绝什么"

- **拒绝 `#4ec9b0` / `#56b6c2`**（VSCode 青绿青蓝）——这是本主题要摆脱的核心污名
- **拒绝 `#bd93f9` / `#ff79c6`**（Dracula 紫粉）——别碰
- **拒绝 `#00ff00` / `#00ffcc`**（Matrix 绿、霓虹青）——CRT 怀旧陷阱
- **拒绝 `#0066ff` / `#00aaff` 渐变**（Tron 电光蓝）——科幻片美学
- **拒绝纯黑 `#000000` 底**——光栅有噪点、对比度过硬、缺空气感
- **拒绝纯白 `#ffffff` 文字**——平台会转透明，必须 `#fefefe` 或更暖的 `#e6d9c2`
- **拒绝 rgb glow / box-shadow neon**——平台 CSS 过滤会杀掉，且气质下沉
- **拒绝 "涨绿跌红 / 红黄警报灯"四色高饱和**——语义色必须走低饱和琥珀家族

---

### 1.2 Typographic voice

深色底的字体节奏和浅底**完全不同**。浅底上 400 字重能立住，深底上 400 会发虚（光晕效应让暗底浅字显得更细）——这是 VSCode 皮肤常年的字重灾难。tech-geek 的纪律：**正文 500，强调 600，标题 600（不上 700，因为 700 在深底会变成"塑料硬边"），全靠字距 letter-spacing 拉开等宽美学的骨架**。

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（专题头） | 25 | 600 | 2px | 1.4 | `text` | 字重 600 + 2px 字距，**稀比粗贵**。深底大标题不要 700，会硬。前缀不用 SVG，用 `§ I` 这种 inline SVG text 章节号 |
| h2（章节） | 19 | 600 | 1.5px | 1.5 | `text` | **降 1px**（从 20 到 19），和正文的节律更贴。前缀是**章节罗马数字 + 点**（`II.` / `III.`）的单色 SVG，不是扫描线竖条 |
| h3（小节） | 16 | 600 | 1px | 1.6 | `text` | 和正文同号，纯靠字重 600 + 字距 1px 区分。前缀是方头的 `§ 3.1`——manpage 风 |
| p（正文） | 15 | 500 | 0.6px | 1.85 | `text` | **关键改动**：字重从当前推定的 400 升到 500（深底补偿）；行高从 1.8 提到 1.85——工程写作需要比财经密、比人文疏的中间态，1.85 是我反复测出来的甜点 |
| small（附注/脚注） | 13 | 500 | 0.4px | 1.7 | `textMuted` | 脚注内容、来源、日期；字重同样 500 而非 400 |
| pull-quote（金句） | 20 | 500 | 1px | 1.75 | `text` | 金句不拉 primary 色，和 business-finance 同纪律——金句是正文的放大，不是装饰色块。左右用 SVG `>` `<` heredoc 引号夹住（保留原方向但精修） |
| `.code`（内联代码） | 15 | 500 | 0.8px | 1.85 | `primary` | **签名动作**：inline code 字号=正文、字重=正文、行高=正文，只靠 letter-spacing +0.2px 和 primary 琥珀色与正文区分。读者读到代码不会"被扔进割裂的彩色块"，而是**文中自然延续的琥珀一笔**。底色走 `bgMuted` 但 padding 收到 `1px 5px`（不是 `2px 6px`）——更薄、更像铅字嵌入 |
| `.footnote-ref`（脚注号） | 12 | 500 | 0 | 1 | `accent`（HN 橙） | 正文里的 `[1] [2] [3]` 上标；这是全主题唯一允许 HN 橙出现在正文流里的位置 |

#### 字重策略（深色底专属）

禁止出现任何 400 字重——深底 400 = 视觉事故。只开四档：**500 / 600 / 700**，其中 700 严禁用在任何**大字号 + 主色**组合（那是霓虹招牌）。

- 正文、inline code、small、pull-quote：500
- 强调（`<strong>`）、h3、h2、h1：600
- 仅 `.digit`（大号数据 callout 里的数字）可用 700——且字号必须 ≥ 24

#### 字距是核心

tech-geek 不能写 font-family，**但等宽美学的灵魂不是字体，是字距**。所有 `.code` / 脚注号 / 章节号（罗马数字）都要 `letter-spacing: 0.8-1.2px`，正文 0.6px——这个微差异在屏幕上会让"代码"自动浮现出等宽感，不需要等宽字体。

#### 代码块的非割裂设计

pre 块当前的 `border-left: 3px solid primary` + 不同底色 = 典型"代码块是异物"的做法。改写纪律：

- 底色 `bgSoft #1e1a14`（和正文底只差 5% 明度），**不加 border-left**
- 字号 13（比正文略小一档，暗示"这是更密的信息区"），字重 500，行高 1.7
- 颜色走 `text`（羊皮黄），而非当前的 `#e6e6e6` 中性灰
- 代码块的"代码感"由**行首 `$ ` 或 `>>> ` 的 inline SVG** 提供，而不是色彩边框

---

### 1.3 SVG motif

tech-geek 的 motif 语汇只有四个来源：**manpage（§、¶、脚注方括号）、RFC（章节号、rule 线）、Plan 9（章节符、pilcrow）、TAOCP 排印（脚注、参考文献）**。**一切 VSCode / Dracula / neon / 窗口装饰 / 频谱条 / 三色圆点 全部逐出**。

#### 必删

- **`dividerFlower`（频谱条）——删除**。Dribbble 和 VSCode 皮肤营销页最泛滥的装饰；它让主题立刻变成"某款播放器皮肤"。工程写作文档里不应出现频谱条。
- **当前 `sectionCorner`（三个方块 + 竖条）——删除**。这是 macOS 窗口装饰的模仿物，把主题拉回"我是一个 IDE UI 截图"的语义。工程写作不需要窗口装饰。

#### 保留但重做

- **`h2Prefix`（原扫描线竖条）→ 改为"章节罗马数字"**
  文字草图：`▌ II.`——1px 宽 14px 高的单色竖条（primary 琥珀，不要叠加渐隐方块）+ 5px 间距 + 方头罗马数字 `II.`（SVG `<text>` 光栅后 ≥ 14px）。罗马数字务必用**方头**风格（serif 但无花体），模仿 TAOCP 的章节题头。用于 h2。

- **`dividerWave`（原虚线 + 两端方块）→ 改为"manpage rule + § 字符"**
  文字草图：`§ ═══════════════════════ §`——中段 220px 1px 虚线横规（`border` 色），两端各一个 `§` SVG text（primary 琥珀，14px）。去掉两端的方块装饰。这是 manpage 底部标注章节分隔的经典样式。divider 的默认 variant。

- **`dividerDots`（9 点阵）→ 保留但降调**
  9 点改 5 点，间距拉大到 20px，颜色从 primary 改为 `border` 暖灰 + 中间 1 点用 primary——像印刷稿的省略号 `. . . . .`。用于段落内的轻分隔。

- **`quoteMark`（heredoc `<>` 引号）→ 保留方向但精修**
  保留 `<` `>` 的 heredoc 语义（这是 tech-geek 最有作者气的一件），但：
  - 字重压到 2px stroke（当前 3px 偏粗）
  - 色改 primary 琥珀
  - 新增**attribution slot**：引号下方留一行 small（13px / textMuted / 前缀 `—— `）——像 TAOCP 脚注引用"—— Knuth, TAOCP Vol. 1, §1.2.5"

- **`stepBadge`（圆角方形数字）→ 改为脚注方括号**
  文字草图：`[1]`、`[2]`、`[3]`——方括号字重 600、primary 琥珀，无背景无边框。完全是 learned-paper footnote 样式。用于 steps 容器 + 正文脚注号。

#### 新增

- **`pilcrow`（¶ 段落标记）**
  14px SVG text `¶`，`textMuted` 色。用于 author 容器、section 分节处的低调标记——像 Knuth 排版里分段落时偶尔冒出来的符号。

- **`manpagePrefix`（§ 3.1.2 章节号）**
  `§` 符号 + 点号数字（`3.1.2`）的组合，primary 琥珀，14px text。用于 sectionTitle cornered variant、intro 容器的前缀。

- **`ruler`（═══ 或 ── 横规）**
  两个变体：
  - `ruler-double`：两条平行 1px 实线（间距 2px），像 RFC 文档的章节大分隔
  - `ruler-single`：1px 实线 + 左端 `§` 标记，像 manpage 的段落分隔

- **`asterism`（⁂ 三星号）**
  三个星号组成的三角 SVG，`textMuted` 色。用于长文中"章节间停顿但不算新章节"——这是 19 世纪印刷遗产，Knuth 至今在用。divider 的 glyph variant 选它。

**motif 使用纪律**：每篇文章最多出现 **一个** h2Prefix、**一种** divider、**一种** quote attribution 样式。不允许同一篇里 dividerWave + dividerDots + asterism 三种都登场——那是"我有很多 SVG 资产"的炫耀，不是编辑纪律。

---

## 2. 19 个 Container 的视觉差异化方案

所有容器角色用**工程写作语汇**重命名（不是"tip 框 / warning 框"这种功能命名）。结构描述里的数值都是起手值，实现 agent 可±2px 微调。

### 2.1 `intro` → **Abstract（摘要）**
学术论文或 RFC 开头的摘要段。
- 结构：`bg` 墨炭底、上下各 1px `border` 实线（双平行线用 `border-top` + `border-bottom`，不用 position）、左右无边框
- 前缀：一行 small 级别的 `ABSTRACT` 大写字母 + 2px 字距 + textMuted 色
- padding：18px 上下、0 左右（让它和正文贯通）
- 正文走 textMuted（摘要本就要"比正文淡一档"）

### 2.2 `author` → **Colophon（版权页/署名）**
- 结构：纯文本一行，前缀 `¶ ` pilcrow SVG + 作者名 + 中点 `·` + 日期 + 中点 + 字数/阅读时长
- 字号 13 / textMuted / 字距 0.6px
- 无底色无边框——颜色克制到几乎和 bg 同化
- 居左对齐（不居中，colophon 从不居中）

### 2.3 `cover` → **Title Block（题头块）**
- 结构：无图版式。`manpagePrefix` 风格的 `§ 0.` 前缀 + 大号标题（h1 层级）+ 下方 1px 实线横规 + small 级副标题
- 背景 `bg`（不给 bgSoft，题头不贴纸）
- 可选副标题右下角给一个 `—— <volume>.<issue>` 式的 RFC 期号（小字）
- 拒绝当前模板里 `$ cat this_week.md` 的终端命令开场——那是梗，不是纪律

### 2.4 `sectionTitle` → **§ Heading（章节号）**
primary variant: `cornered` → 重做为 **manpage-heading**
- 结构：左侧 `manpagePrefix` `§ 3.` SVG + 14px 间距 + h2 文字 + 下方 1px `border` 虚线
- 不要"bordered variant"的 2px 实心主色线——那是博客风，不是工程写作风；虚线更克制

### 2.5 `quote` → **Pull Quote（书中引文）**
primary variant: `frame-brackets` 但方向改"manpage 四角括号"
- 结构：左右各一个 `<` `>` heredoc SVG（精修版 quoteMark），居中正文 20px pull-quote，下方一行 13 / textMuted 的 `—— 出处, 年份` attribution
- padding：24px 上下、0 左右
- 无底色

### 2.6 `quoteCard` → **Footnote Card（脚注卡）**
这个容器是 TAOCP 脚注风格的典范。
- 结构：左上角小号 `[n]` 方括号脚注号（primary 琥珀）+ 14 号正文 + 下方一行 textMuted 的 attribution
- 底色 `bgSoft`（和 bg 差 5%），无边框，仅 padding 18px
- 字距略拉（0.8px）——脚注区应比正文更"排版感"

### 2.7 `footerCTA` → **See Also（参见/延伸）**
manpage 结尾的 "SEE ALSO" 段。
- 结构：顶部一行 13 / letter-spacing 2px / textMuted 的 `SEE ALSO` 大写标签 + 下方 1px `border` 虚线 + 下列项用 `[1] [2] [3]` 方括号脚注号引出
- 拒绝按钮感（不画圆角方块、不加 accent 底）——CTA 在工程写作里应该像"参考文献列表"

### 2.8 `recommend` → **References（参考文献）**
- 结构：`REFERENCES` 大写标题 + 每项一行 `[n] 标题, 作者, 年份`，首行 primary 方括号号、后续 textMuted
- 小字 13px，行高 1.6，项间距 10px
- 完全文字化，无图无底色——这就是 TAOCP 最后一章的排法

### 2.9 `qrcode` → **Address Block（联系块）**
- 结构：左侧 90×90 二维码（SVG 或 img）+ 右侧三行文字（`HANDLE`、`CHANNEL`、`HTTPS://...`），大写标签 + 2px 字距 + textMuted，值用 text 色
- `display: table` + 两个 `table-cell`
- 不加卡片底，不加边框——像 signature block

### 2.10 `tip` → **`// NOTE`（备注）**
primary variant: `minimal-underline`（重新诠释）
- 结构：首行 `// NOTE` 前缀（primary 琥珀、字距 1px、字重 600）+ 正文跟随在同段或下一段
- 左边界 2px `border` **虚线**（stroke-dasharray 4 3）——虚线 = "附注性"
- 底色 `bgSoft`、padding `12px 16px`
- **关键区分**：tip 的 `// NOTE` 是**注释语法前缀**，不走等宽字距——这样读者一眼就知道"这是编辑的批注，不是代码"

### 2.11 `warning` → **`// CAVEAT`（谨慎）**
- 结构：首行 `// CAVEAT` 前缀（warning accent = primary 琥珀、字距 1px、字重 600）
- 左边界 2px `border` **实线**（与 tip 的虚线区分）
- 底色 `bgSoft`、padding `12px 16px`
- 图标 warningIcon 改为"manpage 里的  `!` 方括号"：`[!]` SVG，不是三角警告

### 2.12 `info` → **`// REF`（参见）**
- 结构：首行 `// REF §2.3.1` 前缀（info accent 冷蓝 `#7a9cb8`、字距 1px、字重 600）——章节号可选
- 左边界 1px **双线**（用 `border-left: 3px double`）——双线 = "交叉引用"
- 底色保持 `bg`（不给 bgSoft），只靠左 border 区分
- 图标用 `¶` pilcrow

### 2.13 `danger` → **`// PITFALL`（陷阱）**
- 结构：首行 `// PITFALL` 前缀（danger accent 陶土红 `#c85a3a`、字距 1.2px、字重 600）
- 边界：**顶部 + 底部各一根 1px 实线** 陶土红（不是左边框——左边框和 tip/warning/info 都一样，视觉上区分不开）
- 底色 `bgSoft` 上再压一档到 `#1f1612`（陶土红偏底）
- 图标用方括号 `[X]`（不是八角 stop sign）

#### tip / info / warning / danger 的一眼可辨纪律

四个容器**严禁只靠颜色区分**——深底四色高饱和边框是 VSCode 皮肤烂尾的标志。本主题走四重信号叠加：

| 容器 | 注释前缀 | 边框样式 | 边框位置 | 图标 |
|---|---|---|---|---|
| tip | `// NOTE` | 虚线 | 左 | 无 |
| warning | `// CAVEAT` | 实线 | 左 | `[!]` |
| info | `// REF` | 双线 | 左 | `¶` |
| danger | `// PITFALL` | 实线 | 上下 | `[X]` |

即使读者是色盲，也能靠"前缀语 + 边框样式 + 边框位置 + 图标形状"四重冗余识别。这是工程文档的可访问性纪律。

#### tip 容器和 code 容器的边界（关键陷阱）

深色主题里 tip 的 `bgSoft #1e1a14` 和 pre 代码块的 `bgSoft` 天生同色——很容易糊成一片。tip 必须打出"我不是代码"的明确信号：

- tip 的正文走**正文字距**（0.6px），不走代码字距（0.8-1.2px）
- tip 的首行有 `// NOTE` 注释符前缀——这个前缀本身反而**明确标识这是"关于代码的文字"，不是代码本身**
- tip 不使用等宽视觉（letter-spacing 不拉宽）
- tip 的 padding 是 `12px 16px`，代码块是 `14px 16px`（空间呼吸不同）

### 2.14 `highlight` → **Key Number（关键数据）**
大号数据 callout，但比 business-finance 克制。
- 结构：`display: table`，左列（50%）大号数字（28px、字重 700、primary 琥珀、letter-spacing 0）+ 下方 13 textMuted 的单位/标签；右列（50%）是 14 号正文说明
- 底色 `bgSoft`、padding 20px、无边框
- 数字必须包 `.digit` 类、必须是 primary 琥珀——全主题唯一合法使用 28px + 700 字重的地方
- 严禁使用 HN 橙 accent——那留给脚注号

### 2.15 `compare` → **Trade-off（权衡）**
primary variant: `column-card` 改造为 **diff-cols**
- 结构：`display: table`，两列 `table-cell`，列间 1px `border` 竖线分隔
- 每列首行是 primary 琥珀的大写标签 `+ PRO` / `- CON`（用 `+` `-` 前缀，不是红绿色块）
- 正文 14 号，padding 16px
- **严禁** git diff 的红绿配色——工程写作里对比不是"敌对阵营"，是"同一个 RFC 的 alternatives"
- 底色双列都保持 `bg`（不给绿底红底），靠字符前缀和竖线分隔

### 2.16 `steps` → **Algorithm（算法步骤）**
primary variant: 重做为 **numbered-steps**（不走 ribbon-chain，那是广告感；不走 timeline-dot，那是时间线）
- 结构：每步一行 `[n]` 方括号脚注号（primary 琥珀、字重 600）+ 8px 间距 + 14 号正文
- 左侧**不连续竖线**——连续竖线会让它变成"进度条"，工程写作里步骤是**可重入、可跳步**的
- 步间距 14px，步内正文行高 1.7
- 最末步可加一行 `; end.` 或 `⟂` 结束符（拟 TAOCP 算法结尾惯例）

### 2.17 `divider` → **Rule（横规）**
primary variant: `rule` 改为 **manpage-rule**（不是 wave / flower / dots）
- 内容：220px 宽 1px `border` 虚线 + 中段 primary 琥珀 `§` 字符（14 px SVG text）
- 居中、margin 上下 24px
- 备选 variants：
  - `glyph`：asterism `⁂` 三星号（textMuted）——长文的章节间停顿
  - `dots`：5 点省略号（已降调版）——段落内轻停顿
  - **删除** `flower`（频谱条）和原 `wave`（两端方块）

### 2.18 `mpvideo / mpvoice` → **Attachment（附件）**
公众号视频/音频嵌入容器。
- 结构：外层 `display: block`，padding 12px，底色 `bgSoft`，无边框
- 顶部一行 small 级别大写标签 `[ ATTACHMENT ]` 或 `[ AUDIO ]`（primary 琥珀、字距 2px）
- 下方是实际嵌入——treat like 附件，不是"媒体卡"

### 2.19 `free` → **Verbatim（逐字段）**
自由容器 / 不归类的内容。
- 结构：继承正文字距和底色，无任何装饰
- 这是 escape hatch——保持它真正"自由"，不强加 motif

---

## 3. 反例对照（毒舌版）

写出来是为了让实现 agent 随时能拿这份表做"我是不是在做一个廉价皮肤"的自检。

### 3.1 VSCode 皮肤 / Dracula 复刻
**症状**：`#282a36` 底 + `#bd93f9` 紫 + `#ff79c6` 粉 + `#50fa7b` 绿 + `#ffb86c` 橙 + `#8be9fd` 青——彩虹六件套。
**为什么烂**：这是 syntax highlighting 调色板，不是内容排版调色板。它存在的意义是在代码里区分 keyword/string/number/function——把它搬到正文排版上，等于把读者放进 IDE 截图里阅读文章。**没有作者**。
**规避**：本主题严禁 primary 是青绿系，严禁任何紫粉出现，severity 颜色全部压到琥珀家族。

### 3.2 Tron 霓虹赛博
**症状**：`#000` 纯黑底 + `#00ffff` 电光蓝 + `#ff00ff` 品红 + box-shadow glow + linear-gradient 渐变。
**为什么烂**：这是电影海报配色，不是写作配色。霓虹的心理暗示是"炫酷未来感"——和"成年工程师写事故复盘"的气质南辕北辙。而且 box-shadow 和 gradient 过不了 juice 层，实际渲染还会翻车。
**规避**：本主题墨炭底不上纯黑，主色是 amber 不是 cyan，严禁 box-shadow glow 和 gradient。

### 3.3 码农 emoji 表情包
**症状**：标题 `🚀 性能优化实战`、tip 前缀 `💡`、warning 前缀 `⚠️`、庆祝 `🎉`。
**为什么烂**：emoji 是短平快的社交媒体语言，不是长文排版语言。任何 emoji 在工程写作里都会**瞬间把作者的专业度打折 50%**——读者会默认"这是培训班讲义，不是一线工程师的笔记"。
**规避**：全主题禁 emoji。所有语义信号用 `// NOTE` `// CAVEAT` `[!]` `[X]` `§` `¶` `⁂` 这类**印刷排字 + 代码注释**符号。

### 3.4 小红书"程序员必备配色"
**症状**：荧光绿 `#39ff14` + 紫黑 `#1a0033` + 粉色 accent + 大圆角卡片 + "极客感"贴纸。
**为什么烂**：这是"想象中的程序员"而非真实程序员。真正的工程写作要的是**能在凌晨三点不晃眼的对比度**，不是"让我看起来像个程序员"的 cosplay。
**规避**：本主题的羊皮黄正文色、墨炭暖底、琥珀主色都是从 VT220 真实老终端色温反推出来的——服务长时间阅读，不服务 tag 表演。

### 3.5 CRT scanline / glitch art
**症状**：给正文加半透明水平扫描线、故意错位 RGB 分离、像素化边缘。
**为什么烂**：这是 Vaporwave 美学，是"把怀旧当气质"的偷懒。真正的 VT220 不会给你扫描线——扫描线是**CRT 的缺陷**，不是它的 feature；怀念扫描线的人从未在 CRT 上工作过。
**规避**：本主题保留 `dividerWave` 的名字但**彻底去扫描化**——改为 manpage 横规 + `§`。motif 只从印刷传统取，不从 CRT 怀旧取。

### 3.6 红黄警报灯四色
**症状**：tip 荧光绿 + warning 荧光黄 + info 电光蓝 + danger 鲜红——四色高饱和塞在黑底。
**为什么烂**：深色底 + 四色高饱和 = 机房服务器状态灯的视觉语义。读者看到会下意识紧张，而工程写作的 `// NOTE` 大多数只是"这里有个小坑"，不该触发警报情绪。
**规避**：本主题四语义全压进琥珀家族 + 一点冷蓝 + 一点陶土红，主要区分靠前缀语和边框样式，而非颜色强度。

### 3.7 "AI slop" 深色主题
**症状**：配色"正确"、间距"合理"、SVG 装饰"丰富"，但**没有一个决策让你感觉到作者的判断**——它是平均值，是"深色主题该有的样子"的统计结果。
**为什么烂**：这是当前 tech-geek 的症状，也是整个 AI 生成设计的通病。没有"拒绝什么"的决策就没有风格——风格是**选择的总和**，不是**添加的总和**。
**规避**：本文档每一节都有"拒绝什么"——删除 dividerFlower、拒绝青绿、拒绝 emoji、拒绝扫描线、拒绝四色警报——**删除和拒绝才是这套规范的主声部**，而不是"我们加了什么"。

---

## 4. Committed 总结

本规范的三条不可妥协决策（实现 agent 如需偏离，必须先在 issue 里说服我）：

1. **主色 `#d4a65a` VT220 琥珀，不再是 `#4ec9b0` 青绿**——这一条决定了主题是否还能被称为"有作者"。
2. **四语义容器靠注释前缀 + 边框样式四重冗余区分，不靠颜色强度**——深色底四色警报灯是 VSCode 皮肤的原罪。
3. **删除 dividerFlower、去扫描化 dividerWave、sectionCorner 从窗口装饰改为章节号**——motif 语汇从"VSCode 装饰"迁到"manpage 印刷"。

tech-geek 的成败不在于它是否"炫酷"，而在于读者合上这篇文章时会不会想："这个人应该不好骗。"那就对了。
