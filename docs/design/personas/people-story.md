# People Story · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets。
> 所有判断都在公众号硬约束下成立：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap，布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**People Story 不是"公众号人物爆款"，是"杂志特稿的排版"。** 参照坐标是《人物》杂志的封面与人物特写内页、《三联生活周刊》的人物专访、《GQ 智族》中国版的人物特写、《端传媒》的冷调人物稿、*The New Yorker* 的 "Profiles" 栏目（瘦细 column rule + 大 drop cap + 小号 byline）、*Granta* 与 *The Paris Review* 的访谈版面。气质关键词：**肖像感、克制、冷米、瘦细线、巨大引号、一个人物色**。

**拒绝坐标**：一切"她 30 岁年入千万 / 他泪流满面"的营销号红黄感叹号、朋友圈长图文的粉紫渐变、水彩插画鸡汤金句、小剧场 Q 版人物贴图、手写签名体 + 玫瑰金边框、仿旧报纸的土味做旧纹理。任何时候讨论里出现"暖心"、"治愈"、"逆袭"、"燃"、"戳心"这类词，视为警报，回到本规范对齐。

**与 literary-humanism 的关键差异**——两者共用"出版物"血统、共用"米底 + 克制"的大方向，但从这里就要彻底分叉，一厘米都不能越线：

| 维度 | literary-humanism | people-story |
|---|---|---|
| 刊物比喻 | 三联书店的集、中华书局的笺 | 《人物》杂志、GQ 特稿、New Yorker Profiles |
| 主角 | 文本 / 思想 | **人 / 事件**——是一张脸、一段话、一条时间线 |
| 气质 | 书斋、藏锋 | **杂志、肖像、采访** |
| 装饰语汇 | 古籍版框、如意云头、钤印、回纹 | **瘦细 column rule、巨大 serif 引号、drop cap、byline 分隔符、罗马数字章节号** |
| 主色方向 | 宋椠墨褐 `#5a4a3a` | **深墨靛 `#1b2330` + 一支"人物色"** |
| 底色 | 暖米 `#f4efe3`（偏黄） | **冷米 `#f2efe7`**（偏蓝灰）——微弱但决定性的差异 |
| 排版签名 | 2.0 行高 + 大字距 + 竖条版框 | **1.75 行高 + drop cap + 巨号 pull-quote + 瘦细横线** |
| accent 的用法 | 朱砂只出现两处（首字 + 钤印） | 人物色只出现三处（drop cap + pull-quote 引号 + 罗马数字） |

一句话总结：**literary-humanism 是书，people-story 是杂志。书给文字让位，杂志给人物让位。**

---

## 1. Persona 三件套

### 1.1 Color story

#### 底色决策：走冷米，不走轻深色

我在两条路之间选了冷米。全深色专题页（`#1e1c1a` 炭黑）是《人物》封面的招牌动作，能做出最强的"肖像感"——但它对正文读感要求极高，长文阅读下来眼睛会累，而公众号环境无法保证明暗模式切换、也没办法让用户跳过长段正文。一个长人物稿在深色底上读完 3000 字，比冷米底上读完 3000 字的流失率高一个量级。所以**主题底走冷米**，深色氛围交给 `cover` 单独处理（封面可以是深底的，正文必须是米底的）。

当前我们没有这套配色的旧值可压，直接给新提案。全部以"冷米 + 深墨靛 + 一支人物色"为骨架。

| token | 新值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|
| `bg` | `#f2efe7` | 冷米 | **比 literary-humanism 的 `#f4efe3` 凉 2° 色温**——肉眼几乎察觉不到，但在同屏并排时就是"书"与"杂志"的差别。偏近 *Cereal* 内页底色，有一点蓝灰，不再是暖米 |
| `bgSoft` | `#e9e5db` | 杂志衬底 | 与主底 6% 明度差；用于 intro / recommend / quoteCard 这类静态容器 |
| `bgMuted` | `#dcd7c9` | 深米 | 仅用于 code / byline 块的更深底，绝不铺整页 |
| `text` | `#17171a` | 深墨 | **比 literary-humanism 的 `#1f1b14` 更冷、更黑**——杂志正文印刷油墨就是这个样子，偏蓝黑而非暖黑 |
| `textMuted` | `#5d5d63` | 版权灰 | byline、采访时间、摄影署名、日期——用在"谁写的 / 什么时候写的 / 谁拍的"这些元信息上 |
| `textInverse` | `#f2efe7` | 反白 = bg | 深底反白字时用底色本身，不要纯白 |
| `primary` | `#1b2330` | 深墨靛 | **关键决策**：不走黑（`#000` 太冷漠）、不走墨褐（那是 literary）。深墨靛 = 杂志封面大刊头的色，带一点点蓝但**不是蓝**，承担 h1 / h2 / pull-quote 引号主色 / byline 分隔符的活 |
| `secondary` | `#4a5260` | 靛灰 | 作为 h3 / 标题下划线 / 次级装饰色，从 primary 降 2 档明度的辅位色 |
| `accent` | `#8a3f2b` | **深铁锈** | 见下节"人物色"——这是整套主题最关键的一颗色 |
| `border` | `#c8c2b3` | 版面细线 | 所有 1px 瘦细线都取这个色——杂志内页的 column rule 就是这个调 |
| `code` | `#5d5d63`（= textMuted） | 版权灰 | **拒绝让 code 承担暖色或人物色**。人物稿里的 code 是"邮箱地址、作品名、年份"，是信息不是装饰 |

#### 人物色（accent）：我选"深铁锈"`#8a3f2b`

规范里明确给了三支候选：深铁锈、深橄榄、灰葡萄紫。我选**深铁锈 `#8a3f2b`**，理由三条：

1. **它是"旧照片里的红"**——不是时尚杂志的饱和珊瑚红，不是节庆春联的正朱红，而是 70–80 年代彩色胶片褪色后的那种"血红掺锈"。一放在米底上立刻有人物档案照的年代感。这是 New Yorker 偶尔用在 drop cap 上的色。
2. **它与深墨靛 primary 的色相距离够远**（靛 218° vs 锈 15°），不会互相污染；同时两者都**掺了灰**，不会出现"红配蓝"的原色冲突。
3. **橄榄太像户外杂志、葡萄紫太像时尚女刊**。铁锈是最中性的"人物色"——男性人物、女性人物、中年人物、青年人物都撑得住。如果未来需要扩展为色族（比如 dark mode 或季度版），橄榄和葡萄紫可作为兄弟主题（people-story-olive / people-story-plum），但**首版只做铁锈**。

"人物色不应该漂亮"——这颗 `#8a3f2b` 专门被我压到微偏灰、稍带旧纸颗粒感。它不会让你"哇好好看"，它只会让你"嗯，稳"。这就对了。

#### 人物色的稀缺用法（三处，仅此三处）

- `intro` 首段的 drop cap 首字（下沉 2.5 倍）
- `quoteCard` 的巨号 serif 引号 SVG（填色 accent）
- `sectionTitle` 与 `steps` 的罗马数字 I / II / III 前缀

**不允许出现在**：h1 / h2 / h3 正文、正文段落、链接色（链接走 primary 不走 accent）、border、status 色、图标。
一旦人物色在第四处登场，就降格成普通辅色，整套主题的"人物感"立刻垮掉。

#### 拒绝什么

- **拒绝 `#dc143c` / `#ff5a36` / `#e60012` 一切正红**——这是春联、国旗、营销号感叹号的色。
- **拒绝 `#ffb400` / `#f5a623` 暖橙与金黄**——鸡汤号的签名色。
- **拒绝玫瑰金 `#d4a59a` / 珊瑚粉 `#ff8d85` / 奶油黄 `#f5e9c1`**——这是"土味小资 + 朋友圈咖啡"配色。
- **拒绝 `#c8a15a` 亮金边框**——跟 literary 和 life-aesthetic 已经拒绝过了，这里再拒绝一次。
- **拒绝紫色渐变、粉紫渐变、蓝紫渐变**——不仅是色值问题，公众号环境下渐变本身就是会被 juice 吞掉的技术债。

#### 语义色（tip / warning / info / danger）

人物稿里这四者用得**非常克制**（见 §2 四件套详细方案），但 token 必须齐备。约束：冷米 `#f2efe7` 上对比度 ≥ 4.5:1（AA），**全部掺灰**，**不允许任何一个 accent 饱和度超过 40%**。人物色已经是铁锈，这四者就不能再出现任何"类铁锈的暖红"。

| 语义 | accent | soft | 对比度（on bg） | 命名 | 角色 |
|---|---|---|---|---|---|
| tip | `#4a6a7a` | `#d9dfe2` | 5.0:1 | 钢笔蓝灰 | **采访手记**（记者笔记本里的小字） |
| info | `#556170` | `#d6d9dd` | 5.3:1 | 灰铅笔 | **背景说明**（给不熟悉人物的读者的补充） |
| warning | `#7a6b3a` | `#e2ddc8` | 5.1:1 | 档案黄 | **事实核查**（编辑部审稿时的 fact-check 标记） |
| danger | `#6b3a32` | `#dccdc7` | 5.2:1 | 暗铁锈浅 | **官方回应**（受访方提供的正式声明，与主 accent 同族但明显不同） |

**danger 必须跟 accent 错开**。accent 是 `#8a3f2b` 亮一点、偏锈红；danger 是 `#6b3a32` 暗一点、偏暗红——两者同族但**决不混用**，因为一个是"情感色"（人物色），一个是"功能色"（官方回应）。落地时注意：页面同时出现 drop cap 和 danger 容器，两者必须视觉上可分辨；如果哪天开发者把 accent 和 danger.accent 拉到同一个 hex，整套语义就崩了。

---

### 1.2 Typographic voice

不能写 font-family，全部的节奏靠 **size / weight / letter-spacing / color / margin** 拼骨架。杂志特稿的节奏语言是：
- **drop cap** 开场（一个大得突兀的首字，昭告"这是一篇特稿"）
- **正文节奏紧凑**（行高 1.75，不是 literary 的 2.0）
- **巨号 pull-quote 撕裂正文**（24–26px、字重 500，与正文差一个量级）
- **byline 极小、字距极大**（13px + 2px 字距，像版权页小字）
- **章节用罗马数字**（I / II / III）而非 1 / 2 / 3

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（特稿大标题） | 28 | 700 | 1.2px | 1.35 | `text` | **比 literary 的 26 高 2px**——特稿标题要"砸"进版面，不靠字距稀，靠字号重。letter-spacing 小（1.2px）是因为黑体大字加大字距会散，杂志封面标题都是紧排 |
| h2（章节） | 20 | 600 | 1px | 1.5 | `text` | 前面挂罗马数字前缀（见 §1.3），h2 的"章节感"靠前缀而非字体 |
| h3（小节） | 16 | 600 | 0.8px | 1.7 | `text` | 与正文同号、字重跳一档——编辑部小节切分的常用手法 |
| p（正文） | 16 | 400 | 0.5px | 1.75 | `text` | **行高 1.75**——比 literary 的 2.0 紧、比 default 的 1.8 稍紧。杂志正文的阅读节奏本就比散文书快 |
| pull-quote（金句） | 25 | 500 | 1px | 1.5 | `primary` | **全主题最大的 inline 文字**。必须和正文差一个量级——25 vs 16，3px 字距差、字重差、行高差一起上，造出"这一段要停下来看"的视觉刹车 |
| drop cap（首字） | 48 | 700 | 0 | 1 | `accent`（铁锈） | 见下节。这是整套主题的第一签名动作 |
| byline（署名） | 13 | 400 | 2px | 1.5 | `textMuted` | **大字距 + 小字号**是 byline 的身份证。出现在 cover、author、quoteCard attribution、footer |
| caption（图说） | 13 | 400 | 0.8px | 1.6 | `textMuted` | 图片下方小字说明 |
| small（附注） | 12 | 400 | 0.5px | 1.6 | `textMuted` | footer 日期、quoteCard 出处、年表年份 |

#### 字重对比策略

只用 **400 / 500 / 600 / 700 四档**，禁止用 300。
- 正文 400，inline 强调 500
- h3 小节 600
- h2 章节 600
- h1 标题 700（唯一允许到 700 的地方，除了 drop cap）
- pull-quote 500（**不是 700**——25px 的 500 已经够重，700 会把 pull-quote 变成广告标语）

#### Drop cap 落地策略（**最重要的一条**）

杂志特稿的 drop cap 在 CSS 里靠 `::first-letter` + `float: left` 实现，我们**两者都用不了**。所以方案是：

**`intro` 容器使用专用 dropcap 标记**。渲染器扫描 `intro` 的首段文字，把首字符拆成 `<span class="dropcap">X</span><span class="intro-rest">...</span>` 两段，靠 `display: inline-block` + 精确 margin 达到视觉下沉效果：

- `.dropcap`: `display: inline-block; font-size: 48px; font-weight: 700; color: accent; line-height: 1; margin: 0 8px 0 0; padding-top: 4px;`（vertical-align baseline 即可，不用 float）
- `.intro-rest`: 正常 p 样式，跟在 dropcap 后面
- 由于 inline-block 不会 float，首字不会被两行文字包围，而是"首字大 + 同行其余文字顶齐基线"的效果——这是公众号环境下最诚实、最稳的 drop cap 形态。接受它，不模拟 float。
- **只在 `intro` 的第一段首字触发**。不要全文段首都下沉，那是儿童读物。
- **仅 accent（铁锈）色**，不允许 primary 或 text。
- 首字如果是中文标点（"「《"），跳过标点找到第一个实字。
- 首字如果是阿拉伯数字，不下沉（数字下沉很丑，是编辑部共识）。

退而求其次的方案：如果渲染器不能拆 span，则在 `intro` 容器的 CSS 里给第一行用 first-line 伪类（但 `::first-line` 在公众号也不稳）。所以**必须走 span 方案**。

#### Pull-quote 策略

`quoteCard` 是这套主题的视觉 signature。结构（详见 §2）：

- 上方一个 52pt 量级的 SVG 左引号（铁锈色），相对正文文本 **超出左边界 12px**，靠 `margin-left: -12px` 实现外挂
- 正文 25px / 500 / primary / letter-spacing 1px / line-height 1.5
- 下方 `——人物名，XX 年某月` byline 署名，13px / textMuted / 2px 字距 / 右对齐
- 不加边框、不加底色——只有引号、文字、署名**三件事**，空背景才是杂志感

#### 首行缩进策略

- 正文 p **不做** `text-indent`。杂志版本身就不缩进首行。
- `intro` 除了 drop cap 之外，整段**左右各内缩 12px**，模拟杂志 lead paragraph 的版心内缩。
- `quote`（blockquote）左右各内缩 16px，配合 column-rule 瘦竖线。

---

### 1.3 SVG motif

五件标志性符号，所有装饰的总和。少一件都不行，多一件都拒绝。

#### ① 巨号 serif 引号（`quoteMark` · pull-quote 专用）

这是主题的**第一装饰**。与 literary 的"方框 + 四角花"彻底不同，与 default 的几何双引号也不同——我们要的是**杂志级的大号 serif 左引号**，62pt 量级，厚重、静默，像一枚印章但**不是古籍印章**。

- viewBox `0 0 60 52`，渲染尺寸 48×42（小屏友好）
- 绘制一个西文左双引号 `"` 的几何化形态：两个水滴形 path，水滴头在上、尾在下拖一个小钩，整体略微向左上倾斜 8°（不是倾斜变换，是 path 本身绘制时的几何斜度——公众号不支持 transform rotate 的光栅化会走样）
- 填色 `accent`（铁锈），不透明度 0.92
- stroke-width = 0（纯填充，不描边——描边会变"图标感"，我们要的是"字符感"）
- **不含右引号**。杂志 pull-quote 通常只画左引号挂角，右引号靠文末 byline 自然收束

文字草图：
```
      ▃▃         ▃▃
     ▐▐▐▐       ▐▐▐▐
      ▝▝▜▖       ▝▝▜▖
         ▜           ▜
          （拖尾小钩）
```

#### ② 瘦细 column rule（`dividerRule` / `dividerDots` / author 分隔 共享骨架）

杂志特稿的分隔线是**瘦细 1px 横线 + 偶尔一个小圆点**，绝不花哨。三种变体：

**dividerRule（默认分隔）**：单根 1px `border` 色横线，宽 120px 居中，上下 margin 36px。**就这么克制**。

**dividerDots（byline 分隔符）**：`—— · ——` 式样：两侧各 40px 长 1px `border` 横线，中央一个 `r=1.8` 的 `textMuted` 色小圆点。用于 cover 里作者与日期之间、footer 致谢块的各行之间。

**dividerFlower**（杂志章节分隔）：中央一个 6×6 的 45° 旋转正方形（菱形占位），两侧 80px `border` 色横线。菱形填色 primary，opacity 0.7。不用花饰、不用云头——杂志就是要这么枯。

#### ③ 罗马数字章节前缀（`h2Prefix` + stepBadge 共享）

罗马数字是 people-story 的第二签名。它不是装饰，它是**结构**。

- `h2Prefix`：不输出 SVG 图案，而是渲染器在 h2 前面加一个 **`<span>`** 包裹的罗马数字（I / II / III / IV...），span 样式：`color: accent; font-weight: 700; font-size: 16px; letter-spacing: 2px; margin-right: 10px; border-bottom: 1px solid accent; padding-bottom: 2px;`
- 即"**铁锈色罗马数字 + 下方短下划线**"，h2 的黑体标题文字紧跟其后
- 下划线**只在罗马数字下面**，不是整行 h2 的下划线
- 如果主题配置未开启章节编号，则 prefix 为空（渲染器判定 h2 顺序自增生成编号）

- `stepBadge(n)`：steps 容器的人生阶段编号，用**大号罗马数字**而非圆形数字徽章
  - SVG viewBox `0 0 40 40`，渲染 40×40
  - 中央 `<text>` 大号罗马数字（I / II / III），font-size 24，fill `accent`，`<text>` 不声 font-family
  - 数字下方一根 24px `accent` 色 1.2 粗横线
  - 无圆圈、无方框——**裸数字 + 一根横线**，像章节封面的大章号

文字草图：
```
       I                II               III
      ━━               ━━━              ━━━
   1978–1992        1993–2006         2007 至今
   （下方紧接步骤标题文字）
```

#### ④ Byline 分隔符（内嵌 in author / cover / footer）

复用上面 `dividerDots` 的 `—— · ——` 骨架，但**更小**：两侧 20px 横线 + 中央 `r=1.2` 小点。宽度 44px 左右。用在"作者 · 摄影 · 日期"的三段式 byline 中间。

单独打包为 `assets.bylineDot`（不占用 11 个标准 asset 字段，作为扩展资产由 author/cover/footerCTA 三个渲染器引用）。

#### ⑤ 肖像 silhouette（`sectionCorner` 兜底，可选）

规范里提到"可选"。我的决定：**做**，但放得克制。
- viewBox `0 0 24 24`，渲染 18×18
- 抽象几何：一个 `r=5` 的圆（头）+ 下方一个梯形（肩，上底 8、下底 14、高 6）
- 填色 `border`（不是 primary——用 border 色让它"退后"）
- 仅作 `sectionCorner` 使用，出现在 sectionTitle 的左上角。一篇文章最多出现 3–5 次
- **绝对不画表情、不画头发、不画耳朵**——就是一个最原始的"人形签"
- 拒绝一切相机、胶片、麦克风、对话气泡 icon。那是播客卡片审美，不是人物特稿

文字草图：
```
       ●          （头：圆）
      ▁▂▃▄▅       （肩：梯形）
```

#### 四个 admonition 图标（tip / warning / info / danger）

**不新造**，复用 default 主题的几何风格，但**全部降一级存在感**——stroke 1 改 0.8（在 14×14 viewBox 里光栅化后仍有 1px），fill 改成 accent 色的 70% 不透明度。人物稿里这四件基本不露面，不值得占用装饰额度。

**不允许出现的图标**：
- 相机 📷 / 胶片 🎞 / 麦克风 🎤（太直白，画报风）
- 爱心 ❤ / 星标 ★ / 对话气泡 💬（emoji 化）
- 水墨人物画、Q 版插画、手绘涂鸦（一切"画人"的尝试）

---

## 2. 19 个 container 的视觉差异化方案

### intro · 人物卡 / 导语

**角色**：**导语 + drop cap**。特稿的开场。一句话描述人物身份 + 一段 150 字左右的 lead paragraph，首字下沉 48px 铁锈色。

**结构**：
```
  ┌────────────────────────────────────┐
  │                                    │
  │  X                                 │   X = drop cap 48px accent
  │   某某，某某身份，某某年出生于某地，   │
  │   正在做某某事。这是关于他/她的故事。  │
  │                                    │
  └────────────────────────────────────┘
       （整段左右内缩 12px，底色 bgSoft）
```

- padding `20px 24px`，margin `0 0 32px 0`
- 底色 `bgSoft`，**无边框，无圆角**（`radius 0`）
- 第一段走 dropcap 双 span 结构（见 §1.2 Drop cap 落地策略）
- 字号 16 / line-height 1.75 / letter-spacing 0.5px
- **不加图标、不加前缀文字**——drop cap 本身就是唯一的装饰

### author · 作者 / 摄影

**角色**：**记者 + 摄影**。不是"作者简介"，是**署名条**——谁写的、谁拍的、什么时间。

**结构**：
```
  文 / 记者姓名    ——— · ———    摄影 / 摄影师姓名    ——— · ———    发表于 2026 年 4 月
```

- 单行横排（`display: block`，内部 `inline-block` 三段）
- 每段：13px / 400 / textMuted / letter-spacing 2px
- 段与段之间用 `bylineDot` SVG（44px 宽的 —— · ——）
- padding `10px 0`，margin `0 0 24px 0`
- **无底色、无边框、无圆角**——杂志 byline 就是一行小字，什么都不加
- "文 /" "摄影 /" 这样的前缀字不加粗，跟名字同字重

### cover · 封面人物卡

**角色**：**杂志封面的一体化组合**——大图 + 人物名 + 一行身份 + 一句 deck（副标题/导语）。这是特稿的开场书签，不是简单的 "cover image"。

**结构**：
```
  ┌──────────────────────────────────┐
  │                                  │
  │      [ 肖像图 · 满宽 · radius 0 ]  │
  │                                  │
  └──────────────────────────────────┘
     人物全名（28px / 700 / text）
     ─── 身份一行（13px / textMuted / 2px 字距 / 铁锈色）
     deck 导语（17px / 400 / text / line-height 1.5）
       —— 作者 · 摄影 · 日期 byline 行 ——
```

- 外框 margin `0 0 40px 0`，无内边距
- 图片 `border-radius 0`（杂志封面从不圆角），满宽 block
- 人物名：h1 级别，28px / 700，text 色，**居左不居中**——杂志封面大名字都是靠左顶格，不是居中
- 身份行：13px / textMuted / letter-spacing 2px / **铁锈色（accent）**——这是 accent 第四处出现？不是，见下方说明
- deck 导语：17px，比正文大一号，字重 400 但 letter-spacing 0.8px，像小标题不像正文
- 最底下一行 byline（同 author 容器格式）

**关于"身份行是否允许 accent"**：我把它留给"视觉监督决策者自裁"——身份行的铁锈色是**可选的**，默认走 textMuted。只有当整篇文章的 quoteCard 不出现（即这篇没有金句卡）时，才把 cover 身份行提升为 accent 补位。否则保持 textMuted，把 accent 留给 drop cap + pull-quote + 罗马数字。规范原则："人物色每篇最多三处露面"是上限，不是下限。

**模板（`templates.cover`）**：
```
::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::
```

### sectionTitle · 章节标题

**角色**：章节封面。比 h2 更重，用于长文的大段切分。

**variant 选择**：`cornered`。
**结构**：
```
  ●
 ▃▄▅   I    某个章节标题
        ━━
   ────────────────────────────────（通栏 1px border 横线）
```

- 左上角一枚 `sectionCorner`（肖像 silhouette 18×18）
- 紧跟一个罗马数字 span（16px / 700 / accent / 2px 字距 / 下划线 1px accent）
- 罗马数字后空 10px 再放章节标题文字（20px / 600 / text / 1px 字距）
- 下方 1px `border` 色**通栏**横线（与 literary 的 60% 短线不同——杂志 section 是通栏）
- margin `48px 0 20px 0`，比 h2 的 margin 更大，制造章节换幕感

### quote · 引文（blockquote）

**角色**：**征引**——别人的话、文件里的话、书里的话。不是人物自己的金句（那个交给 quoteCard）。

**variant 选择**：`column-rule`。双侧瘦细线夹住。这是 New Yorker Profiles 内文引用的经典做法。
**结构**：
- 左右各一根 1px `textMuted` 色瘦竖线（不是 primary，太重）
- padding `8px 20px`，margin `18px 0`
- 文字 16 / 400 / textMuted / letter-spacing 0.8px
- **不加引号 SVG**——引号资源留给 quoteCard 独占
- 与 literary 的 quote 唯一区别：literary 用 primary 色竖线（墨褐），我们用 textMuted（版权灰）——**更冷、更静**

### quoteCard · 人物金句（pull-quote）

**角色**：**特稿的心脏**——人物自己说的那句"可以上封面腰封"的话。全主题最贵的一页。

**variant 选择**：`magazine-dropcap`（变体名沿用，但语义从"首字下沉"改造为"巨号引号"——variant 框架允许这样复用）。

**结构**：
```
    ❝
     我从来没想过要成为别人
     期待的那种人。我只是
     在做我一直想做的事。
                      —— 某某，2024
```

- 巨号 serif 左引号 SVG（48×42，铁锈色，参见 §1.3 ①），**超出文本左边界 12px**（`margin-left: -12px`），垂直方向靠顶
- 引号下方紧跟金句正文：25px / 500 / primary / letter-spacing 1px / line-height 1.5
- 文末一行 attribution：13px / 400 / textMuted / letter-spacing 2px / 右对齐 / 前缀 `—— `
- 整块 padding `24px 24px 20px 36px`（左 padding 大一些给引号留位）
- margin `32px 0`
- **无底色、无边框、无圆角**——只有引号、文字、署名三件事
- **不加 drop cap**——首字下沉是 intro 的专利，quoteCard 不能抢

### steps · 人生阶段 / 采访段落

**角色**：**人生阶段 I / II / III**——时间或事件的递进，不是流程。

**variant 选择**：`timeline-dot`，但 badge 改用罗马数字版本（见 §1.3 ③）。

**结构**：
```
   I       1978 – 1992 · 少年时代
  ━━       正文内容，左侧 56px 内缩与罗马数字对齐
           可以多段。
            
   II      1993 – 2006 · 留学与回国
  ━━       ...
            
   III     2007 – 至今 · 现在的他
  ━━       ...
```

- 左侧 48px 宽列放 stepBadge（罗马数字 + 下横线）
- 每阶段标题行：年份区间 + `·` + 阶段名，14px / 600 / text / letter-spacing 1px
- 阶段之间**不加**竖线连接（那是流程图做法），靠 margin 36px 和罗马数字的重量自然分节
- **拒绝 `number-circle` variant**（圆圈数字）——太会议纪要审美
- **拒绝 `ribbon-chain` variant**（飘带链）——太课程卡片

### highlight · 年表片段 / 生平要点

**角色**：**年表**。列表式，左年份右事件。用在"履历速览"、"作品年表"、"获奖记录"这类需要快速扫读的结构。

**结构**：
```
   1989     考入某大学中文系
   1993     发表第一篇短篇《XX》
   1997     出版第一本小说集
   2005     获某某文学奖
   2018     译介某外国作家全集
   2024     新长篇出版
```

- 整块 padding `16px 0`，margin `20px 0`
- 无底色、无边框
- 每行 `display: block`，内部两列：
  - 左列：年份，`display: inline-block; width: 64px; font-weight: 600; color: accent; letter-spacing: 1px; font-size: 14px;`——**年份用 accent 铁锈色**（第四处 accent 登场？不，这里把 accent 视作"数字重音"，跟 drop cap 的首字同族，算同一次使用。但每篇 highlight 最多出现一组，不能连用三组年表）
  - 右列：事件文字，`display: inline-block; font-size: 15px; color: text;`
- 行间 margin 8px，line-height 1.7
- **拒绝时间轴竖线**——那是 steps 的做法，highlight 更扁平

### compare · 两人 / 两时期并置

**角色**：**对照**——不是 PK，不是优缺点。是"他 30 岁 vs 他 50 岁"、"他的作品 vs 批评者的作品"、"他说 vs 她说"的冷克制对照。

**variant 选择**：`column-card`。
**结构**：
```
  ┌─── 30 岁 ───┐   ┌─── 50 岁 ───┐
  │             │   │             │
  │   论述内容   │   │   论述内容   │
  │             │   │             │
  └─────────────┘   └─────────────┘
```

- 两栏 `display: table-cell`，中间 16px 间隙（padding 不 gap）
- 每栏：1px `border` 色外框、`radius 0`、padding `16px 18px`、底色透明
- 标题行前缀不是"优点 / 缺点"、不是"甲说 / 乙说"（那是 literary），而是**时期 / 视角 / 身份** 等人物稿语汇，由渲染器走 template 配置，用户可覆盖
- 标题 14px / 600 / primary / 1px 字距
- **拒绝 `ledger` variant**（绿红双色）——医疗软件审美
- **拒绝 `stacked-row` variant**（上下堆叠）——两个人物上下堆叠读起来像简历对比，丧失"并置"的张力

### tip / warning / info / danger · 四件套（人物稿的特殊赋义）

**核心原则**：人物稿里这四者**很少用**。当它们真的出现时，角色完全被重新定义：

| 语义 | 新角色 | variant | 形状策略 | 标题前缀 | 留白 |
|---|---|---|---|---|---|
| tip | **采访手记**（记者笔记本里的旁注） | `minimal-underline` | **最轻**。无边框，仅标题下方 1px `tip.accent` 色短下划线（长度 = 标题宽） | `— 采访手记 —` 前后各一短破折号 | padding `6px 0 14px 0`，**无底色** |
| info | **背景说明**（给陌生读者的上下文） | `accent-bar` | 左侧 2px `info.accent` 细竖条 + 无底色（**不加 soft 底**）| `背景：` 两字加粗，无图标 | padding `10px 0 10px 14px`，无底色 |
| warning | **事实核查**（fact-check 标签） | `pill-tag` | 顶部左侧挂一个 `warning.accent` 色胶囊 "FACT CHECK"（英文大写，字距 2px） + 1px `warning.soft` 底横向虚底 | 胶囊内 "FACT CHECK" 11px / 600 / textInverse + warning.accent 底 | padding `14px 16px`，底色 warning.soft 但**淡到几乎看不见** |
| danger | **官方回应**（受访方提供的正式声明） | `ticket-notch` | 重 + 方正。上下双 1px `danger.accent` 实线 + 左侧 3px `danger.accent` 色块 + 右上角一枚小标签 "受访者回应" | 无图标，标题行用 `danger.accent` 色 600 字重 | padding `18px 20px`，底色 `danger.soft` |

**一眼可辨的锚点**：
- 采访手记**最轻**——像记者划的一道铅笔线，出现在正文里几乎不打断阅读
- 背景说明**最窄**——左细竖条 + 无底色，像文章边距的旁批
- 事实核查**最醒目**——英文大写胶囊标签，是杂志编辑部真实在稿件上贴的标签
- 官方回应**最重**——双实线 + 色块 + 右上角标签，像法律意见书

**关键自律**：这四件套在人物稿里每篇最多出现**一次**。它们的存在是为了处理"真实性"（事实核查）、"立场"（官方回应）、"上下文"（背景说明）这类严肃需求，不是装饰。

四者的标题用语（采访手记 / 背景 / FACT CHECK / 受访者回应）**从语言上**强化差异——比色块更有效。

### footerCTA · 卷尾致谢

**角色**：**不是 CTA**。人物稿的 footer 不叫号召行动，它是**署名 + 致谢 + 日期**的编辑部收束块。

**结构**：
```
                  ────  ·  ────
  
               本文基于 2024 年 3 月至 6 月
                 多次采访整理而成。
  
             感谢受访者及所有提供帮助的朋友。
  
                  ────  ·  ────
  
               文 / 某记者    摄影 / 某摄影师
                     2026 年 4 月刊
```

- 顶部一个 `dividerDots`（—— · ——）
- 中间致谢文字三段，全部 13px / 400 / textMuted / 居中 / letter-spacing 1px / line-height 1.7
- 底部一个 `dividerDots`
- 最底三行：记者 + 摄影（同 author 格式）+ 刊期
- padding `32px 0 24px 0`，margin `40px 0 0 0`
- **无底色、无边框、无圆角**——杂志末页就是这么空
- **拒绝"关注公众号"、"点赞转发在看"**等营销语——如果用户执意要加，走 `recommend` 或 `free` 容器，不是 footer

### recommend · 延伸阅读 / 相关特稿

**角色**：**推荐阅读**。出现在 footer 之前，形式像杂志期刊底部的"本期他文推荐"小栏。

**结构**：
```
  ┌─────────────────────────────────┐
  │   延伸阅读                       │
  │                                 │
  │   ▸ 关于她的另一篇长文：《XX》   │
  │   ▸ 她的上一本书：《YY》         │
  │   ▸ 本刊往期人物专题：《ZZ》     │
  │                                 │
  └─────────────────────────────────┘
```

- padding `18px 22px`，margin `28px 0`
- 底色 `bgSoft`，**无边框**，radius 0
- 标题行"延伸阅读"：14px / 600 / primary / letter-spacing 2px
- 列表项：14px / line-height 1.9 / color text
- 行首 `▸` 字符（U+25B8）或一个 3×6 三角 SVG（primary 色）——两者取一，我推荐字符（公众号更稳）

### qrcode · 二维码

**角色**：**订阅入口**。克制。

**结构**：
- 居中 block，图像下方一行 13px textMuted 说明（如"扫码订阅《某某》杂志"）
- 图像外框 1px `border` 色，内衬 `padding 8px` 用 `#fefefe`（避免公众号把 `#fff` 透明化）
- margin `24px 0`
- 不加圆角、不加投影

### divider · 分割

**角色**：呼吸。

**variant 推荐**：默认 `rule`（最枯的一根横线），次选 `dots`（`—— · ——`），`flower`（菱形版）留给章节级别。
- `wave` 与 `glyph` **禁用**——缠枝、装饰字符都不是特稿语汇
- 所有 divider 上下 margin **36px**——跟 literary 同级，给足呼吸

### mpvideo / mpvoice · 微信原生组件

**角色**：嵌入件。

**结构**：外围包 `margin 24px 0` + 上下各一根 1px `border` 色横线。**不加底色、不加圆角、不加 shadow**。

与 literary 同策略——嵌入件都是"平台给的外观不动它"。

### free · 自由容器

**角色**：兜底。padding `18px 22px`，margin `24px 0`，无边框无底色无图标。**主题不预设视觉意见**。

---

## 3. 反例对照（如果做糟会长什么样）

一个做糟的 people-story 会是这样，我必须把它钉在耻辱柱上：

### 糟糕版本画像

**"朋友圈爆款套餐"**——封面用粉紫渐变 + 人物大头贴叠玫瑰金边框 + 标题是"90 后她年入千万背后的血泪史" + drop cap 做成毛笔字 PNG + pull-quote 两端用巨大红色感叹号 + 每个 h2 都配一个相机 emoji + quoteCard 底色大红 + byline 用手写签名体 + 年表做成"时光机 timeline" 带 UI kit 蓝色图标 + footer 一个巨大"关注我" 二维码金色边框 + 全文字体大小从 14 到 32 乱跳。

### 具体犯的错 & 我的规避

1. **"人物色选太漂亮"**——拿 Dribbble 上的"lifestyle palette"当 accent，一眼网红感。
   **规避**：accent 定死 `#8a3f2b`（深铁锈），掺灰、偏暗、有旧照片颗粒感。一颗"不漂亮的红"，才撑得起"人物稿"的重量。漂亮是营销号路径。

2. **"Drop cap 做成艺术字"**——加阴影、加描边、加渐变、用衬线字仿书法。
   **规避**：drop cap 就一件事——**字号大 2.5 倍 + 铁锈色 + line-height 1**。没了。不许加任何描边、阴影、旋转。杂志的 drop cap 就是"一个大写字母原样放大"。

3. **"pull-quote 加引号感叹号 emoji"**——两端甩上 "「...！」" 加粗红色。
   **规避**：引号只**一枚**（左引号 SVG），右引号靠 byline 自然收束。文字色 primary 不是 accent（accent 归引号），字重 500 不是 700。**25px 的 500 已经够重**，红色粗体是营销号肌肉记忆。

4. **"h1 居中 + 全体粗体 + 标题堆成金句海报"**——特稿标题最容易犯的病。
   **规避**：h1 **左对齐**（不居中——杂志封面人物名都是顶格左对齐），字重 700 字号 28 就够了，letter-spacing 只给 1.2px（大标题紧排），颜色走 text 不走 accent。

5. **"byline 用手写体 / italic / 装饰花边"**——以为这样才有"个人感"。
   **规避**：byline 是**编辑部署名**，不是作者自我表达。13px / 400 / textMuted / 2px 字距，冷到近乎冷漠——这才是《人物》《GQ》的 byline 调性。

6. **"把 tip/warning/info/danger 四件套当装饰盒子铺满全文"**——默认主题的毛病，在人物稿里不可原谅。
   **规避**：四件套在人物稿里每篇最多出现**一次**（采访手记 / 背景 / FACT CHECK / 官方回应）。它们的出现必须有信息必要性。用多了立刻从"杂志特稿"跌回"知识付费专栏"。

7. **"章节编号用 1 / 2 / 3 阿拉伯数字"**——偷懒选项。
   **规避**：章节编号走罗马数字 I / II / III。这是《人物》《The New Yorker》长文的硬性习惯。阿拉伯数字是流程图语言，罗马数字是章节语言。

8. **"年表做成 timeline 竖线 + 圆点 + 图标"**——SaaS 产品页的 timeline kit。
   **规避**：highlight 是**扁平表格**，左年份右事件。年份 accent 色、事件 text 色。**不画竖线、不画圆点、不画图标**。杂志年表从来就是"数字 + 事件"两列对齐，这是 200 年来的传统。

9. **"cover 图圆角 12px"**——SaaS 卡片审美。
   **规避**：cover 图 `radius 0`。所有容器默认 `radius 0`。intro / recommend / qrcode 内衬允许最多 2px，其余一律方。**方版心是杂志，圆角是 App。**

10. **"footer CTA 按钮"**——"关注公众号领取福利"配色大红大黄按钮。
    **规避**：footer 没有 CTA。footer 是致谢 + 署名 + 日期。想放关注二维码，走 qrcode 容器，放在 footer 之前，不是之中。

11. **"行距塞到 1.5 为了多装字"**——PM 一句"再紧一点能多塞 200 字"能毁掉整套气质。
    **规避**：正文 line-height **1.75 是红线**。宁可少一屏，不让呼吸塌。

12. **"accent 到处贴花"**——drop cap 用、pull-quote 用、h2 用、链接用、下划线用、图标用、边框用、小三角用。
    **规避**：accent **只出现三处**（drop cap + pull-quote 引号 + 罗马数字）。其余任何地方想给 accent，先数一下这篇文章里 accent 已经出现了几次，超三次自动撤销。稀缺制造重量，泛滥只剩廉价。

---

## 结语（给落地工程师）

这份规范的核心只有一句话：**用"冷克制"做杂志感，用"人物色"做签名，用"大引号"做心跳。**

people-story 是一本杂志，不是一本书（literary 是书）；是一张脸，不是一件器物（life-aesthetic 是器物）；是一场采访，不是一份报告（business-finance 是报告）。每次你想加一个装饰、加一个色、加一个 emoji 的时候，先问三个问题：

1. **它是人物稿语汇吗？**（drop cap / pull-quote / byline / 罗马数字 / 瘦细线 / 肖像签 是。云纹 / 器皿速写 / 图表 / 胶囊 UI 不是。）
2. **它稀缺吗？**（accent 超过三次就不稀缺了。装饰 SVG 超过五件就不稀缺了。）
3. **它替代了什么？**（如果它上来，谁下去？答不上来就不加。）

落地时四件事最关键：

1. **`primary` 定 `#1b2330`（深墨靛），`accent` 定 `#8a3f2b`（深铁锈）。** 底色 `#f2efe7` 冷米。三个锚点 hex 不许动。
2. **Drop cap 必须走 span 拆字方案**（不是 `::first-letter`，不是 `float`），48px / 700 / accent / inline-block。仅在 `intro` 首段首字触发。
3. **quoteCard 结构必须是"一枚左引号 SVG + 25px 金句 + byline attribution"三件事，无底色无边框。** 不是卡片、不是色块、不是印章。
4. **admonition 四件套必须走四种不同 variant（minimal-underline / accent-bar / pill-tag / ticket-notch）**，并且每篇最多出现一次；前缀改用采访手记 / 背景 / FACT CHECK / 官方回应 这套杂志编辑部语汇。

人物色每次想加第四处登场，就想一下《人物》杂志内页——它有多少处用彩色？通常是零到两处。我们已经给到三处，是奢侈品了。
