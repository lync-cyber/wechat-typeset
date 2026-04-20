# Industry Observer · 视觉人格规范

> 本文档是 **设计规范**，不是实现。落地由工程 agent 按此规范生成 tokens / elementOverrides / containers / assets / variants。
> 公众号硬约束：禁 `font-family` / `position` / `float` / flex / grid / `@media` / `@keyframes` / `:hover` / `-webkit-*` / flex gap。布局只有 `table` / `inline-block` / `block` + padding + margin + border。SVG 禁 id / style / script / url()，stroke-width ≥ 1，`<text>` 不声 font-family，光栅后字号 ≥ 14，纯白用 `#fefefe`。

---

## 定位一句话

**industry-observer = 行业观察周刊 / 深度稿 / analyst essay 的公众号呈现。** 参照坐标：**Stratechery** 的微暖底色与 serif 正文、**Benedict Evans weekly** 的冷蓝分析图与大留白、**The Information** 的干净专业感、**Matt Levine / Money Stuff** 的无装饰散文、**Pragmatic Engineer newsletter** 的 TL;DR 侧栏、**晚点 LatePost** 克制的深度长读、**《财新周刊》深度报道**的稿面气质。气质关键词：**周报、断言、矩阵、issue 感**。

**拒绝坐标**，写死：
- 拒绝 **36Kr / 虎嗅编辑部首页**那种多色块 + 红黄渐变 + "必读""重磅"徽章的首页导览审美
- 拒绝**朋友圈截图营销号**：大字加红圈加箭头加"惊！""速看！"
- 拒绝**"创投猎手 / 独角兽 / 风口"**财经八卦号的荧光配色
- 拒绝 **PPT 模板风**：渐变色块 + 2.5D 图标 + 角标徽章
- 拒绝**自媒体财经荧光 highlight + emoji** 📈🚀💰——本主题任何 emoji 都是事故

**与 business-finance 的钉子级差异**（两者最容易互污染，必须刻进 DNA）：

| 维度 | business-finance | industry-observer |
|---|---|---|
| 刊物比喻 | 《财新》《第一财经》FT 中文 **报告** | Stratechery / 晚点 / Benedict Evans **周报 / 深度稿** |
| 阅读对象 | 基金经理、行业分析师 | 产品经理、创业者、投资人、业内同行 |
| 核心 primitive | **数据卡**（巨号数字 + 同比 delta + 数据源） | **断言 pull-quote**（一句话观察摘出） + **矩阵 compare** |
| K 线 | dividerWave 的瑰宝 | **绝对禁用**——industry 不走技术分析路径 |
| 涨跌色 | 红涨绿跌（A 股纪律） | **没有涨跌**——industry 讲趋势不讲价格 |
| 主色 | 深栗墨 `#2a1a14`（暖黑） | **深墨蓝 `#24364f`**（冷黑，Benedict Evans 路径） |
| warning 语义 | 财务/政策风险 | 业务逻辑存疑 / 战略路径争议 |
| danger 语义 | 财务致命风险、退市、政策红线 | 战略错判、业务逻辑崩坏 |
| 节律 | 财季 Q1/Q2/Q3/Q4 | **Issue #023 · 2025-04-20 · 周刊** |
| 表格 | ledger 账本（多方 vs 空方） | **对比矩阵**（公司 × 维度 / 赛道 × 维度） |
| 数字 | `.num` inline tabular，冷峻权威 | 数字**叙事化**（"约 40%"、"不到三成"），数字服从文字 |
| pull-quote | 研究员核心判断（短） | 行业断言 + attribution（长完整一句观点） |
| `<strong>` | 600 / primary 色，节制 | **600 / primary 色，鼓励使用**——观察稿需要断言加粗 |

**与 academic-frontier 的钉子级差异**（Pair 2 另一侧，同为分析型易互污染）：

| 维度 | academic-frontier | industry-observer |
|---|---|---|
| 写作姿态 | 研究者写给同行评审 | 观察者写给业内人士 |
| 底色 | 纯白 `#fefefe`（论文纸） | 微暖米 `#fbf8f1`（newsletter 微温度） |
| `<strong>` | **禁用**（学术界忌讳加粗） | **鼓励**（断言加粗是 industry 签名） |
| 特征 primitive | 定理框 ■ + QED | 观察卡 / 断言框（写观点不证明） |
| 装饰 | 极少，几近素面 | 允许温度：byline、issue stamp、作者头像圆框 |
| 数字气质 | 冷，小数点对齐 | 带叙事，"约三成" > "28.6%" |

**一句话收束**：business-finance 让读者觉得"这是明天晨会前读完的内参"，academic-frontier 让读者觉得"这是待审稿的 working paper"，而 **industry-observer 应该让读者觉得"周二早上收到的这封行业 newsletter，咖啡配它正好"**——有温度但不油腻，有观点但不嚷嚷，有态度但不插科打诨。

---

## 1. Persona 三件套

### 1.1 Color story

industry-observer 的色彩策略只围绕一件事：**让"观察"成立**。观察不是研报的冷峻，也不是论文的素面，是"我读了一周，给你讲讲我看到了什么"的温度。这决定了三条纪律：

1. **底色必须微暖但不甜**——纯白太 academic，奶黄太甜腻，冷米太 people-story，唯一正确的是 Stratechery 式的**淡米 `#fbf8f1`**，黄度 3%、暖度可感、不抢戏
2. **primary 必须是冷色稳重的"观察者之墨"**——三选一，我 **commit C 方案：深墨蓝 `#24364f`**
3. **accent 是稀缺的"断言信号色"**——只用于 `<strong>` / pull-quote 引号 / issue stamp，一期出现 ≤ 10 次

#### Primary 三选一的抉择（commit C）

| 方案 | hex | 风格 | 采纳度 |
|---|---|---|---|
| A) Stratechery 微紫棕 | `#8e5a3c` | 最像美式 newsletter，亲切 | ✗ |
| B) 晚点橙金 | `#b86f2a` | 中文科技商业常见，有态度 | ✗ |
| **C) 深墨蓝** | **`#24364f`** | Benedict Evans 风，最稳、最权威 | **✓ 采纳** |

**为什么 C 胜出**：

- **与 business-finance 拉开到色相对立位**：business 的 primary 是 `#2a1a14` 深栗墨（暖黑，色相 ~20°），本主题 `#24364f` 深墨蓝（冷黑，色相 ~215°），两者在色轮上近乎对顶。读者打开两份稿件，**体温立刻不同**——business 是钨丝灯下的档案袋暖，industry 是清晨咖啡馆落地窗的冷光
- **排除 A（微紫棕）**：紫棕 `#8e5a3c` 和 business 的深栗墨同属暖褐家族，两主题一起展出会被误认同族——**违反 Pair 配对拉开的基本纪律**
- **排除 B（橙金）**：晚点橙金 `#b86f2a` 虽然气质对，但**饱和度过高**做 primary 会挤走 accent 位，且 `<strong>` 全文染橙像营销号
- **C 方案保留 B 的橙金**作为 accent——把橙金让给 issue stamp / byline / `<strong>`，让蓝承担标题与结构色。这是最经济的色彩分工

#### Token 表

| token | 值 | 命名（内部沟通用） | 理由 |
|---|---|---|---|
| `bg` | `#fbf8f1` | Stratechery 米 | 3% 黄度的暖米，newsletter 签名底色。**不纯白不纯米**，精确落在"有温度但不犯甜"的中点 |
| `bgSoft` | `#f5efe1` | 档案米深一级 | 用于 quoteCard、recommend、footer——比主底深 5-6% |
| `bgMuted` | `#ece3cf` | 期号卡背 | 用于 issue stamp 底、compare 表头、代码底 |
| `text` | `#1a2332` | 观察者墨 | 冷黑，比 primary 深墨蓝再深一档。正文字色必须压过所有装饰色 |
| `textMuted` | `#5a6778` | 批注灰蓝 | 署名、日期、数据源标注。带蓝调避免与暖米底打架 |
| `textInverse` | `#fefefe` | 反白 | issue stamp 胶囊字色、footer 胶囊字色。**不是 `#ffffff`**（平台白色陷阱） |
| `primary` | `#24364f` | 深墨蓝 | **主色**。用于 h2 前缀、section-title 短横、封面断言下划、`<strong>`、pull-quote 引号 |
| `secondary` | `#3d5063` | 雾蓝 | 比 primary 浅 18% 的同色系。用于 h3、author byline、矩阵表头 |
| `accent` | `#b86f2a` | 晚点橙金 | **稀缺信号色**。issue stamp 底、`.num` inline 强调、断言引号、作者头像圆框 |
| `border` | `#e0d6c0` | 米纸边 | 暖灰，与米底同族；所有细线、轻分隔用 |
| `code` | `#24364f`（= primary） | 深墨蓝 | 代码 inline 色跟 primary 走——observer 稿里代码极少，冷静即可 |

#### 语义色（四态）

**industry 的四态语言比 academic 轻、比 business 柔**——academic 冷到几乎看不出颜色差异，business 四色浓到接近警示系统，industry 应该落在**"newsletter 编辑在段前加一句 Note: / Context: / But: / Warning:"** 的温度。

做法：**胶囊标签前置 + 容器形状差异双通道**，色彩反而最轻。AA ≥ 4.5:1 过线，但对比度故意不冲最高。

| 语义 | accent（标题/图标） | soft（容器底） | 对比度（on `#fbf8f1`） | 角色名 | 胶囊标签 |
|---|---|---|---|---|---|
| tip | `#2d6a5a` | `#dceae4` | 6.8:1 | **要点**（TL;DR） | `要点` |
| warning | `#8a5a1a` | `#ece0c5` | 5.9:1 | **存疑观点**（Questioned） | `存疑` |
| info | `#3d5a75` | `#dce4ec` | 5.6:1 | **背景**（Context） | `背景` |
| danger | `#8a2a1c` | `#ecd4cf` | 6.7:1 | **错判 / 致命问题**（Flawed） | `错判` |

四色色相分布：tip 墨绿（165°）/ warning 琥珀褐（35°）/ info 烟蓝（210°）/ danger 铁锈红（10°）——**均匀分布在色轮上，任意两色距离 ≥ 60°**，不撞。

注意：
- tip 的墨绿**不是 A 股"绿跌"的绿**——饱和度只有 30%，是"橄榄绿/苔绿"，稳重感而非证券软件感
- danger 的铁锈红**不是 business 的深朱**——更暗、偏褐，是"老报纸勘误栏"的红而非"警示条幅"的红
- 整套四色放在一起是**"秋季编辑部配色"**：米底 + 墨绿 + 琥珀 + 烟蓝 + 铁锈红——像 The Economist 封面栏目色的克制版

#### "拒绝什么"

- **拒绝纯白 `#ffffff`**——会像 academic，且平台 SVG 光栅化会把纯白转透明
- **拒绝冷灰米 `#f5f5f0`**——偏冷会让人读出"生活杂志"的气质（撞 people-story）
- **拒绝奶黄 `#fff8dc` / `#faf0c8`**——太甜，像早教公众号
- **拒绝明亮红 `#ff0000` / `#dc143c`**——营销号配色，本主题禁红到 `<strong>` 也不沾
- **拒绝翠绿 `#00cc00` / `#2ecc71`**——股票软件跌绿 + 微信支付绿双重语义噪音
- **拒绝玫瑰金 / 渐变紫 / 水晶蓝**——任何"国潮""AI""元宇宙"视觉语言都是事故
- **拒绝 emoji 📈 🚀 💰 🔥**——任何 emoji 都是事故，没有例外

---

### 1.2 Typographic voice

industry-observer 的排印节奏应该像**周二早上那封 newsletter**：正文比 academic 松一点（读感优先于密度）、`<strong>` 比 academic 多（观察稿靠断言而非推演）、有一个**全主题签名动作是 pull-quote**（比 business 长、比 academic 生动、比 people-story 克制）。

#### Scale

| 层级 | px | font-weight | letter-spacing | line-height | 颜色 | 说明 |
|---|---|---|---|---|---|---|
| h1（专题头） | 26 | 700 | 0.4px | 1.4 | `text` | 字重 700（不 800——observer 不需要财经那种"压阵"），字距 0.4px 微松，可读性优先 |
| h2（章节） | 20 | 700 | 0.3px | 1.45 | `text` | 前缀 3×13 `primary` 深墨蓝小竖条 + 8px 间隔；下缘无横线（newsletter 不做章节通栏线） |
| h3（小节） | 17 | 600 | 0.2px | 1.55 | `text` | 字重降到 600 避免和 h2 抢；前面允许一个 3×3 `accent` 橙金小方块作为"小节信号" |
| **p（正文）** | **16** | **400** | **0.3px** | **1.85** | `text` | **16/1.85** 比 academic 的 15/1.75 更松——**长读感是 industry 的核心**。行距 1.85 让读者 3000 字稿件不累 |
| small（附注） | 12 | 400 | 0.2px | 1.65 | `textMuted` | byline / issue 日期 / 数据源 |
| **pull-quote（行业断言）** | 22 | 500 | 0.2px | 1.5 | `text` | **新增层级**。22px / 500（不是 600——避免撞 h3 的 600）/ 左右各一根 2px `primary` 深墨蓝竖线夹住。attribution 行 13/`textMuted` |
| **issue stamp（期号戳）** | 11 | 600 | **1.5px** | 1 | `accent` 橙金 | **标志性层级**。全大写拉丁 + 中文混排：`ISSUE #023 · 2025-04-20 · 周刊`。字距拉到 1.5px 是核心动作——模拟印章/戳记的疏朗感 |
| **byline（撰文条）** | 13 | 400 | 0.3px | 1.5 | `textMuted` | `撰文｜林磊，深响编辑 · 2025-04-20`。中间用细分隔符 `｜` 和 `·`，不用 / 和 \| |

#### `<strong>` 纪律（与 academic 相反，与 business 持平）

- 字重 **600**（不 700/800——避免和 h2 撞）
- 颜色 `primary` 深墨蓝
- **鼓励使用**，一段出现 1-2 次 `<strong>` 是正常密度——observer 需要"这句话是我的核心观察"的锚点
- **禁止**：`<strong>` 染 accent 橙金（会和 issue stamp 撞）、`<strong>` 套背景色（变回 highlight 荧光）、连续多个 `<strong>` 堆叠（读者无法判断重心）

#### `<em>` 纪律

- 保留 italic（`font-style: italic`），但用途限定为**术语首次出现**——比如"这里出现了所谓的*飞轮效应*"，第二次再出现就回归正体
- 颜色 `text`，不染 primary（避免和 `<strong>` 抢）
- 公众号字体栈会把中文 italic 渲染为倾斜（假斜体），**只对英文/拉丁术语真正生效**——这符合 industry 的用法（中文概念一般用引号或 `<strong>`，italic 真正派用场是英文术语）

#### Pull-quote 策略（industry 的签名动作之一）

这是 industry 相对 business 的核心差异位：
- business 的 quoteCard 是"研究员核心判断"（短），industry 的 pull-quote 是"**断言长句**"（完整一句观点）
- 结构：左右各一根 2px `primary` 深墨蓝竖线（column-rule variant） + 内部 22/500 `text` 色正文 + **attribution 末行右对齐**
- attribution 格式固定：`—— 张三，某公司 CEO` / `—— 晚点特约评论 · Issue #021`——前缀破折号，姓名 + 身份用逗号分隔，**不用"说"字**
- padding 左右 24px、上下 18px；margin 上下 24px
- **不加引号 SVG** 在 pull-quote 里——引号留给 quoteCard；pull-quote 靠双竖线夹持，是 Benedict Evans 式
- 禁止居中对齐——pull-quote 左对齐，attribution 右对齐

#### Issue stamp 排印（industry 的签名动作之二）

issue stamp 是**跨容器出现的"期号戳记"**，在 cover、footer、每篇顶部都会出现。排印样式必须统一：

```
  ISSUE #023 · 2025-04-20 · 周刊
  ─────────────────────────────
```

- 单行文字，11px / 600 / `accent` 橙金 / `letter-spacing: 1.5px`
- 拉丁 `ISSUE #023` 全大写，中文"周刊"保持原样——中英混排靠字距统一节奏
- 分隔符用 `·`（中点 U+00B7），**不用 /、-、|**
- 底部 1px `accent` 橙金细横线（宽度 auto，最多 180px）——模拟印章下沿
- 出现位置：
  - **cover** 底部：标题下方 12px
  - **footerCTA** 顶部：作为"本期结束"的封口
  - **author** 行尾：紧跟 byline 后作为期号标注

#### Byline 策略

- 格式：`撰文｜林磊，深响编辑 · 2025-04-20`
- 13/400/`textMuted`
- 前缀 `撰文｜` 用全角竖线（U+FF5C，不是半角 |）
- 作者名和角色用全角逗号分隔：`林磊，深响编辑`
- 日期前用中点 `·`
- 可选前置作者头像圆框（见 SVG motif ⑤）—— 圆框 + byline 同行 `inline-block`

#### 数字叙事化纪律（与 business 的核心差异）

industry **故意不做** `.num` 冷峻样式——数字要服从文字：

- **优先用叙事化表述**：`约三成`、`不到 40%`、`接近一倍`、`过去五年翻了四倍` > `28.6%`、`+97.3%`
- **真需要精确数字时**，用 inline 轻强调：`<span class="num">12.3%</span>` → `font-weight: 500`（注意不是 600——比 business 轻一档）、color: `primary` 深墨蓝、**不设 `letter-spacing: 0`**（即继承正文 0.3px，让数字融入段落而非独立成字）
- **禁止**巨号数字卡（business 专有）、同比三角（`▲ ▼`——这是 business 的 A 股纪律）、tabular-nums（多栏对齐是研报审美）
- 数字前后留空格：`约 40%` 比 `约40%` 更有"观察者在讲话"的感觉

#### 段首缩进 / 首字下沉

- **不做** dropcap（people-story 专有）
- **不做** `text-indent: 2em`（publication 古早感，与 newsletter 冲突）
- intro 段落的特殊处理：左侧 3px `accent` 橙金竖条 + 左内缩 14px，模拟"编者按 / 本期观察"的摘要栏

---

### 1.3 SVG motif（4-5 件）

industry-observer 的 SVG 语言必须**故意避开所有已占用的 motif**：
- ✗ **K 线柱状**（business 瑰宝）
- ✗ **§ [1] 脚注**（tech-geek manpage）
- ✗ **定理框 ■ QED**（academic）
- ✗ **罗马章节号 I/II/III**（people-story）
- ✗ **古籍云纹 / 回字纹**（literary-humanism）
- ✗ **器物几何**（life-aesthetic）

industry 自己的视觉语言必须是：**newsletter 的期号印章 + 现代 serif 方头引号 + 对比矩阵十字网 + 中央菱形 ornament + 作者头像圆框**。五件，互不撞车。

#### ① issueStamp · 期号印章（最重要，跨容器复用）

用于 cover、footerCTA、author 行。双线矩形框包住期号文字：

```
 ┌────────────────────────────────┐
 │ ISSUE #023 · 2025-04-20 · 周刊 │
 └────────────────────────────────┘
```

- viewBox `0 0 200 24`，width 可伸缩（cover 用 200、author 行用 140）
- 外框：1px `accent` 橙金（双线可选——内 0.5px 嵌套一层实现"钤印"感）
- 内部 `<text>`：font-size **14**（平台光栅后 ≥14 下限），`fill="${accent}"`，`letter-spacing: 1.5`，`text-anchor: start`，`x=8 y=16`
- 注意：`<text>` 不声 font-family，中英混排字形靠字距 1.5px 统一视觉
- 期号数字由模板注入（`{{issue}}` `{{date}}` `{{kind}}`），渲染器替换
- **绝对禁止**：做成徽章章鱼爪、做成圆形、做成星形——就是**双线矩形 + 疏朗字**

#### ② quoteMark · 现代方头双引号（用于 quoteCard）

**和 people-story 的杂志 "花体大引号"刻意区分**——industry 的引号方头、粗实、断言感。

- viewBox `0 0 32 28`，width 28 height 24
- 双引号并列：`M2,20 L2,12 C2,8 4,6 8,4 L8,7 C5,8 4,10 4,12 L8,12 L8,20 Z M18,20 L18,12 C18,8 20,6 24,4 L24,7 C21,8 20,10 20,12 L24,12 L24,20 Z`
- `fill="${primary}"`（深墨蓝），**无 opacity**（不虚化——断言需要实心引号）
- **和 business 的方头引号差异**：business 的 `quoteMark` 也是方头，但 industry 的引号**更矮更粗**（高度 24 vs business 的 28，笔画 4px vs business 的 3px）——业内人士的断言要**敦实**

#### ③ matrixCross · 矩阵十字线（compare 容器背景辅助，可选）

用于 compare 容器的十字交叉点提示——3 列 4 行的表格，每个交点一个小十字：

- viewBox `0 0 8 8`，width 6 height 6
- `<path d="M4,0 L4,8 M0,4 L8,4" stroke="${border}" stroke-width="0.8"/>`
- 颜色 `border` 米纸边色（非常淡）
- 使用方式：作为 SVG data-URI 背景点缀在 compare `<td>` 的 background-image（禁 url()——所以实际落地是**用 `<img>` 标签放 data-URI**，或者改为 `border-left + border-top` 的双细线实现网格效果，**优先后者更简单**）
- 如果落地嫌复杂，此件可跳过——用 compare 的 table `border` 直接画网格即可

#### ④ ornamentDiamond · 中央菱形分隔（divider glyph variant）

Stratechery 式的段落分隔——一颗小菱形居中：

```
                ◆
```

- viewBox `0 0 24 12`，width 18 height 10
- `<path d="M12,2 L16,6 L12,10 L8,6 Z" fill="${primary}"/>`
- 简单实心菱形，**不加装饰线、不加横线**——单独一颗菱形居中即是分隔
- 使用场景：divider glyph variant（用户在 `::: divider glyph` 时触发）、以及 section-title 之间的轻分隔
- **和 literary-humanism 的 ❦ 花饰刻意区分**：花饰是装饰，菱形是 ornament（字面直译"饰记"）——方向完全不同

#### ⑤ avatarFrame · 作者头像圆框（byline 可选）

给 byline 前置一个圆形头像框（空框，用户填图）：

- viewBox `0 0 28 28`，width 22 height 22
- `<circle cx="14" cy="14" r="13" fill="none" stroke="${primary}" stroke-width="1"/>`
- 使用方式：byline 左侧 `inline-block`，`vertical-align: middle`，`margin-right: 8px`
- 用户在模板里传图片 src 时渲染器把 `<img>` 包进 `<span>` 套上此 SVG（或直接用圆框作 mask——但 mask 禁用，所以实际是**图片套 `border-radius: 50%` + 1px border**，此 SVG 只做无图时的占位）
- **可选资产**——若主题作者觉得累赘可跳过

#### 资产清单总结

| 资产 key | 是否必须 | 用途 |
|---|---|---|
| `sectionCorner` (复用) | ✓ | issueStamp 印章（借 sectionCorner 资产位） |
| `quoteMark` | ✓ | quoteCard 方头双引号 |
| `h2Prefix` | ✓ | h2 的 3×13 小竖条 + 3×3 橙金配块 |
| `dividerFlower` | ○ | 中央菱形 ornament（可作 glyph variant 的资产） |
| `dividerDots` | ○ | 三点横排（米色 `border` 色，极淡） |
| `stepBadge` | ✓ | 时间轴点（见 steps 容器） |
| tipIcon / warningIcon / infoIcon / dangerIcon | ✓ | 四态胶囊前的小图标 |

industry **不使用** dividerWave（留给 business 专有）。

---

## 2. 19 个 container 的视觉差异化方案

### intro · 编者按 / 本期观察

**角色**：newsletter 开篇的编者语。"本期我们关注……"的那种自述。

**结构**：
```
  本期观察                      ISSUE #023 · 2025-04-20 · 周刊
  ▍ 这周我们盯住三家公司：A、B、C。
  ▍ 它们有一个共同点——都在试图改写……
```

- 左侧 3px `accent` 橙金竖条（**不是 primary 蓝**——intro 要温度而非权威）
- 左内缩 14px，padding `14px 16px 14px 17px`
- margin `0 0 24px 0`
- 底色**透明**（不套 bgSoft——保持轻）
- 顶部可选标题行 `本期观察` 13/600/`accent`，右侧浮动 issue stamp
- 正文 16/1.85/`text`

### author · 撰文条

**角色**：署名 + 角色 + 日期 + 期号。业内人士写给业内人士，身份很重要。

**结构**：单行，`display: block`（不是 inline-block——避免被压扁），`padding 10px 0`，`border-bottom: 1px solid border`

```
 (○) 撰文｜林磊，深响编辑  ·  2025-04-20    ISSUE #023
```

- 左侧 `avatarFrame` 空圆框（22×22）或图片头像
- 中间 byline 13/`textMuted`
- 右侧靠右 issue stamp 11/`accent`
- 底部 1px `border` 色横线作为与正文的分界
- margin `0 0 24px 0`

### cover · 标题 + 导语 + Issue stamp

**角色**：专题头。比 business 的封面多一个 issue stamp 和导语。

**结构**：
```
 ┌────────────────────────────────┐
 │  [图片]                        │
 └────────────────────────────────┘

 大标题 26/700/text

 副标题 / 导语  17/400/textMuted/行高 1.7
 可以两到三行，模拟 newsletter 的"本期导读"

 ISSUE #023 · 2025-04-20 · 周刊
 ───────────────
```

- 图片 `border-radius: 3px`（极窄圆角，印刷品感）
- 标题 margin-top 18px / margin-bottom 10px
- 副标题（若存在）16-17/400/`textMuted`/行高 1.7/margin-bottom 14px
- **底部 issue stamp**：模板固定注入此位置（渲染器或模板层处理），11/600/`accent`/letter-spacing 1.5px + 下方 1px `accent` 细横线（宽度 180px）
- **拒绝**：封面居中对齐（要左对齐，newsletter 风）、封面副标题染 primary 色（要 textMuted 收敛）

### section-title · 章节标题

**角色**：观察稿中段的主题分节。

**variant 选择**：`cornered`。

**结构**：
- 左上角 3×3 `accent` 橙金小方块（sectionCorner 资产）
- 标题文字 20/700/`text`/letter-spacing 0.3px
- 下方 2px `primary` 深墨蓝**短横线**（宽度 40px）——而非通栏
- margin `36px 0 16px 0`

**与 business-finance 的 section-title 差异**：business 用 L 形直角 + 琥珀小方块；industry 用**纯方块 + 短横**——更现代、更 newsletter

### quote · 引文（征引）

**角色**：稿件中征引他人的短句。比 quoteCard 轻。

**variant 选择**：`column-rule`。

**结构**：
- 仅左侧 1px `border` 色竖线（**单线，不双线**——双线留给 quoteCard 的 pull-quote）
- padding `6px 16px`
- 字色 `textMuted`，字号 15/1.8
- **不加引号 SVG**（留给 quoteCard）
- **不染底色**
- margin `12px 0`

### quoteCard · 行业断言 / 业内观点（核心 primitive 之一）

**角色**：**业内人士完整观点的 pull-quote**。这是 industry 相对 business 的签名差异——business 的 quoteCard 是短核心判断（一句话），industry 的 quoteCard 是**完整断言段落** + attribution。

**variant 选择**：`column-rule`（左右双竖线）或 `frame-brackets`（四角括号）——**首推 column-rule**，更现代、更 Benedict Evans 风。

**结构**：
```
  ┃                                                              ┃
  ┃  " 技术并不会淘汰公司，淘汰公司的是那些用新技术               ┃
  ┃    重新想象行业边界的人。过去十年的教训                       ┃
  ┃    反复说明了这件事——巨头并非败于技术落伍。"                  ┃
  ┃                                                              ┃
  ┃                           —— 王兴，美团创始人 · 2024 年内部信 ┃
  ┃                                                              ┃
```

- 左右各一根 2px `primary` 深墨蓝竖线（`border-left` + `border-right`）
- padding `20px 28px`
- 底色 `bgSoft` 档案米（轻微与正文区别）
- 左上角 `quoteMark`（方头双引号，橙金 `accent` 色）`inline-block` 置于正文前
- 正文 **22/500/`text`/letter-spacing 0.2px/line-height 1.55**——注意字重 500 避免撞 `<strong>` 的 600
- **attribution 行**：末尾右对齐，13/400/`textMuted`，前缀 `——`（全角破折号），格式 `—— 姓名，身份 · 时间/出处`
- margin `28px 0`
- `border-radius: 3px`

**禁止**：
- quoteCard 正文居中（要左对齐）
- attribution 用"说："（太口语）——用 `——` 破折号前缀
- quoteCard 染 accent 橙金底色（过甜）

### footerCTA · Newsletter 订阅钩子

**角色**：**订阅 newsletter 的封口钩子**。这是 industry 相对 business 的关键差异——business 的 footerCTA 是"扫码订阅研报"（投资者口吻），industry 的 footerCTA 是**"订阅「某某观察」· 每周二更新"**（读者朋友口吻）。

**结构**：
```
 ───────────────────────────────────────────
 ISSUE #023 · 2025-04-20 · 周刊
 ───────

   订阅「某某观察」

   每周二清晨送到，30 分钟读完。
   不追热点，不发快讯，只讲值得下判断的行业变化。

                                   [ 扫码订阅 ▸ ]
 ───────────────────────────────────────────
```

- 顶部一根 1.5px `primary` 深墨蓝横线（通栏）
- 顶部行：issue stamp 11/`accent` + 下方 1px `accent` 短横（140px）
- 主标题 17/700/`text`：`订阅「某某观察」`——用全角方括号 `「」`（日式 newsletter 风）
- 副标题 14/400/`textMuted`/行高 1.7，两到三行
- 右下角"扫码订阅 ▸"胶囊：`inline-block` + padding `6px 14px` + `primary` 深墨蓝底 + `#fefefe` 字 + `border-radius: 3px`——全文唯一允许的深色反白块
- 底部一根 1.5px `primary` 横线封口
- padding `18px 20px`
- margin `40px 0 0 0`

**与 business footerCTA 的差异**：
- business 用"硬核财经" + "扫码订阅"（投资号调性）
- industry 用"某某观察" + "每周二清晨送到"（newsletter 调性）
- 关键是副标题的**频率承诺**（每周二）和**阅读时长承诺**（30 分钟读完）——这是 newsletter 文化的签名语汇

### recommend · 延伸阅读 / 相关 issue

**角色**：卷末关联链接。Stratechery 风——推荐"本期相关" / "往期同主题"。

**结构**：
```
 延伸阅读
 ──

 ▸ 产业观察 · Issue #019 | 互联网巨头的"搜索"围城
 ▸ 业内专访 · Issue #015 | 对话 A 公司 CTO
 ▸ 数据看点 · Issue #012 | 过去三年收购数据拆解
```

- 标题 `延伸阅读` 14/700/`secondary` + 前缀 3×12 `secondary` 雾蓝小竖块
- 标题下方 1px `border` 色短横线（40px）
- 列表每项 14/400/`text`/行高 1.8
- 每项前缀 `▸` 字符（`accent` 橙金色）+ 8px 间距
- 每项格式：`栏目 · Issue #xxx | 文章标题`——用 `·` 和 `|` 分隔
- padding `16px 18px`
- 底色 `bgSoft` 档案米
- `border-radius: 3px`
- margin `24px 0`

**与 business recommend 的差异**：business 用"延伸阅读"短清单，industry 用"栏目 + Issue 编号 + 标题"——模拟 Stratechery"相关文章"模块

### qrcode · 订阅二维码

**角色**：footerCTA 的图像侧。订阅钩子的实体落地。

**结构**：
- 居中 block
- 图像外围 padding 6px + `border 1px ${accent}` + 底色 `#fefefe`
- `border-radius: 0`（二维码不圆角）
- 图像下方 12px/`textMuted` 一行说明：`扫码订阅「某某观察」· 每周二更新`
- margin `24px auto`

### tip · 要点 / TL;DR

**角色**：本期要点摘要。newsletter 常见的"30 秒版本"。

**variant 选择**：`pill-tag`（顶部悬挂胶囊——industry 的四态靠胶囊标签统一签名）。

**结构**：
```
    ┌ 要点 ┐
 ┌──┴─────┴────────────────────────┐
 │                                 │
 │  · 本期核心观察一                │
 │  · 本期核心观察二                │
 │  · 本期核心观察三                │
 │                                 │
 └─────────────────────────────────┘
```

- 顶部胶囊：`margin-top: -12px` 悬挂，padding `3px 10px`，`tip.accent` 墨绿底 + `#fefefe` 字 + 12/700/`letter-spacing: 1px`，`border-radius: 2px`
- 胶囊文字：`要点`（中文二字）
- 容器外框：1px `tip.accent` 墨绿
- 底色 `tip.soft` 浅绿米
- padding `16px 18px 14px 18px`（上留给胶囊）
- margin `20px 0`
- 内部列表用 `·` bullet（不是 `·`，是 middle dot）

### info · 背景 / 行业现状

**角色**：给读者补背景的段落。"为了看懂这事，我们需要先了解……"

**variant 选择**：`minimal-underline`（最轻——background context 不该喧宾夺主）。

**结构**：
- 顶部胶囊前置"背景"（inline 而非悬挂）：`inline-block` + padding `2px 8px` + `info.accent` 烟蓝底 + `#fefefe` 字 + 11/700/`letter-spacing: 1px` + `border-radius: 2px` + margin-right 10px
- 胶囊后接正文段落（同行或换行都可）
- **无外框无底色**——最接近"正文的补注"
- 标题行下方 1px `info.accent` 烟蓝短横（60% 宽度）
- padding `8px 0 12px 0`
- margin `18px 0`

**与 tip 的差异**：tip 有外框有底色（要点要挑出来），info 无框无底（背景要融进正文）

### warning · 存疑观点

**角色**：**业务逻辑上有争议的观察**。不是"危险"，是"这里值得存疑"。

**variant 选择**：`card-shadow`（无阴影版——shadow 禁用，所以改为**卡片硬边 + 重边框**）。

**结构**：
```
 ┌ 存疑 ┐────────────────────────┐
 │  这个判断依赖于 A 的持续增长，  │
 │  但 A 在下半年出现了……         │
 └────────────────────────────────┘
```

- 顶部嵌入胶囊"存疑"：左上角内嵌（**不悬挂，避免和 tip 撞**），padding `2px 10px` + `warning.accent` 琥珀褐底 + `#fefefe` 字 + 11/700/`letter-spacing: 1px`
- 胶囊位置：`display: inline-block` + margin `-4px 10px 8px 0`（inline 于标题行左侧）
- 容器外框：1.5px `warning.accent` 琥珀褐（**比 tip 的 1px 更厚**——存疑比要点重）
- 底色 `warning.soft` 浅琥珀米
- padding `14px 18px`
- margin `20px 0`
- `border-radius: 3px`

### danger · 错判 / 致命问题

**角色**：**战略错误 / 业务逻辑崩坏**。最重的四态。observer 的 danger 不是财务红线（business 专属），是**"这家公司在这件事上做错了"**。

**variant 选择**：`ticket-notch`（票根缺口——勘误栏审美，与 business 持平但色系不同）。

**结构**：
- 顶部胶囊"错判"：顶部悬挂（margin-top: -10px），padding `3px 12px` + `danger.accent` 铁锈红底 + `#fefefe` 字 + 12/700/`letter-spacing: 1px`
- 容器外框：**双边框**——外 1.5px `danger.accent` 铁锈红 + 内 2px `bgSoft` 空白 + 再内 0.5px `danger.accent` 虚线
- 底色 `danger.soft` 浅锈米
- 左右两端"票根缺口"：SVG data-URI 背景（或用 `<img>` 标签放 inline SVG）——两个 6×12 的半圆缺口
- padding `18px 24px`
- margin `24px 0`
- **整个容器视觉重量是四态里最重的**——读者看到就知道"这里 observer 在下判断说某事是错的"

**四态一眼可辨矩阵**：

| 语义 | variant | 胶囊位置 | 外框 | 底色深度 | 中文词 | 气质 |
|---|---|---|---|---|---|---|
| info | minimal-underline | inline 前置 | 无 | 透明/无 | 背景 | 最轻，融进正文 |
| tip | pill-tag | 顶部悬挂 | 1px | 浅 | 要点 | 轻悬浮 |
| warning | card-shadow（硬边） | inline 内嵌 | 1.5px | 中 | 存疑 | 中卡片 |
| danger | ticket-notch | 顶部悬挂 | 1.5px 双框 + 缺口 | 深 | 错判 | 最重，勘误条 |

**四锚点**：
1. **胶囊位置**：inline / 悬挂 / 内嵌 / 悬挂——空间分布递增
2. **外框层数**：0 / 1 / 1 / 2——递增
3. **底色深度**：透明 / 浅 / 中 / 深——递增
4. **中文词分量**：背景 / 要点 / 存疑 / 错判——语义递重

任一锚点失效都能辨识；四锚点叠加基本无误读可能。

### highlight · 关键数字 / 关键事实（**故意不做数据卡**）

**角色**：**正文中需要嵌入强调的 1-2 行事实**。故意拒绝 business 的"巨号数字卡"路径——industry 的 highlight 是**嵌入式轻强调**，数字服从文字。

**结构**：
```
 ▊ 过去五年，这个赛道的融资总额增长了 约四倍，但盈利公司数量
   从十二家降到了 不到五家。
```

- 左侧 3px `accent` 橙金竖条（**不是 primary——橙金作为 highlight 的信号色**）
- padding `8px 14px 8px 16px`
- **底色**：`bgSoft` 档案米（极轻——不满底黄色）
- 正文 16/400/`text`/行高 1.75
- **数字部分**：用 `.num` inline 包裹（`font-weight: 500`、color: `primary` 深墨蓝——轻强调，不突兀）
- margin `20px 0`
- `border-radius: 2px`

**为什么故意不做巨号数据卡**：
- business 的 highlight 做巨号数字卡，是"数字说话"的 DNA
- industry 的 highlight 是"洞察说话"——数字只是洞察的论据，不能喧宾夺主
- **这一条纪律必须钉死**，否则两主题会在视觉层互相污染

### compare · 赛道矩阵 / 公司对比（核心 primitive 之二）

**角色**：**多公司 × 多维度对照表**。这是 industry 相对 business 的签名差异——business 的 compare 是 ledger 账本（多方 vs 空方 / 正反双栏），industry 的 compare 是**矩阵表格**（3 列以上公司 × 3 行以上维度）。

**variant 选择**：本主题**不使用** `ledger`（business 专属）。使用默认 `column-card` 或自定义 matrix variant。

**结构（3 列 × 4 行矩阵示例）**：
```
 ┌─────────────┬──────────┬──────────┬──────────┐
 │             │ 公司 A   │ 公司 B   │ 公司 C   │
 ├─────────────┼──────────┼──────────┼──────────┤
 │ 核心产品    │ 搜索     │ 社交     │ 电商     │
 ├─────────────┼──────────┼──────────┼──────────┤
 │ 营收结构    │ 广告 80% │ 广告 60% │ 商品 70% │
 ├─────────────┼──────────┼──────────┼──────────┤
 │ 增长引擎    │ 海外     │ 视频     │ 下沉市场 │
 ├─────────────┼──────────┼──────────┼──────────┤
 │ 主要风险    │ 监管     │ 流量到顶 │ 利润率   │
 └─────────────┴──────────┴──────────┴──────────┘
```

- `display: table` + 多 `<td>`（支持 3-5 列）
- 表头行（第一行）：`bgMuted` 期号卡背底 + 13/700/`secondary` 雾蓝 + padding `8px 12px` + `text-align: center`
- 第一列（维度列）：13/600/`text` + `text-align: left` + padding `10px 14px`
- 数据格：14/400/`text` + `text-align: center` + padding `10px 12px`
- 所有 td 之间 1px `border` 色细线（通过 `border-right` + `border-bottom` 实现）
- 外框 1px `border` 色 + `border-radius: 3px`
- margin `24px 0`

**与 business ledger 的绝对差异**：
- ledger 是 **2 列对立**（多方 | 空方），industry 是 **3-5 列平行对比**
- ledger 顶栏染 primary 深底，industry 顶栏仅 bgMuted 浅底（matrix 不用强色）
- ledger 底部有"综合判断"封底，industry 矩阵是**纯表格**，无结论行——结论在正文讲
- ledger 用红蓝色系暗示涨跌，**industry 矩阵零语义色**——赛道对比不分"好坏"，只列事实

### steps · 事件时间轴 / 发展阶段

**角色**：**事件发展时间轴** 或 **产业发展阶段**。不是"方法流程 step-by-step"（tech-geek 领域）。

**variant 选择**：`timeline-dot`（时间轴点——industry 最契合的时间叙事骨架）。

**结构**：
```
 ● 2020 · 行业萌芽
 │   这一年，A 公司完成第一轮融资……
 │
 ● 2022 · 群雄竞起
 │   十二家创业公司拿到钱……
 │
 ● 2024 · 洗牌开始
      只剩下三家还在加速……
```

- 左侧 24px 列放**时间轴点**——直径 10px 的实心圆（`stepBadge` 资产在本主题改为圆点而非方章），`primary` 深墨蓝填充
- 圆点之间用 1.5px `border` 米纸边竖线连接（`border-left` 实现）
- 每步标题格式：`● 2020 · 行业萌芽`——**年份**（或 Phase I / Q1）+ 中点 + **阶段名**，标题 15/700/`text`
- 正文 16/400/`text`/行高 1.75
- 每步之间 margin-bottom 20px

**与 business timeline-dot 的差异**：business 用方形 stepBadge（印章感），industry 用**圆点**（时间轴感）——一方一圆，DNA 级差异

**绝对禁止**：`number-circle`（流程步骤）、`ribbon-chain`（课程卡片）——steps 在 industry 语境里只能是"时间轴"或"阶段"

### divider · 分隔

**variant 推荐优先级**：`glyph`（中央菱形 ◆）> `dots`（3 点）> `rule`（细线保底）> `flower` > `wave`（禁用）。

- `glyph` 菱形用于大分节（section-title 之间），margin `32px 0`
- `dots` 3 点用于段间停顿，margin `20px 0`
- `rule` 1px `border` 色横线，用于最朴素的段间分隔
- **`wave` 禁用**——K 线是 business 瑰宝
- `flower` 不推荐但保留兼容

### mpvideo / mpvoice · 微信原生组件

**角色**：嵌入件。平台强制样式，主题只做外围。

**结构**：外包一层 margin `24px 0`，上下各一根 1px `border` 米纸边横线模拟"newsletter 插入视频块"的版框。不加底色、不加圆角、不加 shadow。

### free · 自由容器

**角色**：兜底。padding `14px 16px`，margin `20px 0`，无边框无底色。用户可通过 class 叠加其他容器样式。

---

## 3. 反例对照（如果做糟会长什么样）

### 糟糕版本画像

**"36Kr 首页套餐"**——h1 巨红大字 + 金色渐变描边 + 标题前插个 `[重磅]` 红底标签 + intro 做成"本期看点"多色块九宫格 + quoteCard 染成荧光黄底黑字 + compare 每列头上扣个 ✅❌⚠️ emoji + highlight 整段涂荧光绿 + footer 贴一张"扫码进群领行业报告！限时免费！"的橙红渐变 banner + 全程夹杂 📈🚀💰 表情符号 + issue stamp 做成星形徽章 "VIP #023"。

**"朋友圈营销号截图"**——大字红圈标题 + "速看！" + "行业内幕曝光" + 红箭头指向数字 + 底部二维码上印"关注不迷路" + 标题末尾三个！！！

**"创投猎手风"**——全页紫黑渐变底 + 霓虹粉标题 + "风口""独角兽""超级独角兽"徽章 + 数据用 Matrix 代码瀑布风字体（但禁 font-family 所以改为加粗染荧光绿）+ 整体就像一个二级市场"喊单号"。

### 具体犯的错 & 规避

1. **"借用 business 的巨号数据卡"**
   **规避**：industry 的 highlight **故意不做巨号数字卡**——仅左 3px 橙金竖条 + bgSoft 底 + 正文嵌入式 `.num`。数字字重 500 不是 600（比 business 轻一档），letter-spacing 继承正文不清零。**数字服从洞察，不是反过来。**

2. **"借用 business 的 K 线 dividerWave"**
   **规避**：本主题 divider 禁用 wave。改用中央菱形 ◆（glyph variant）或 3 点横排。K 线是 business 专属，industry 的时间叙事靠 steps timeline-dot（圆点 + 竖线）。

3. **"涨红跌绿 / 涨绿跌红"**
   **规避**：industry 不讲价格，不讲涨跌。全主题**不使用任何涨跌语义色**——tip 是墨绿但低饱和（不是"跌绿"）、danger 是铁锈红（不是"涨红"）。矩阵表格里不做色染。

4. **"36Kr 花花绿绿的多色块"**
   **规避**：本主题全篇活跃色只有 **primary 深墨蓝 + accent 橙金**两支——primary 用于标题/结构，accent 用于 issue stamp / `.num` / `<strong>` 信号位。四态语义色只在 tip/warning/info/danger 四个容器的胶囊标签和边框上出现，**不下放到正文或引文**。红配金、紫配粉、蓝配绿的组合在本主题是事故。

5. **"emoji 📈🚀💰🔥 满天飞"**
   **规避**：禁用全部 emoji。同期号用 `ISSUE #023 · 2025-04-20`、分隔用 `·` 中点、清单用 `·` middle dot 或 `▸`、时间轴用 ● 实心圆——**所有符号都是几何字符或 SVG，零 emoji**。

6. **"营销号巨大感叹号 + all caps"**
   **规避**：h1 左对齐、字重 700 不 800、**无感叹号**（"！"和"!!" 在 observer 语境里破坏冷静观察的调性）。全大写仅出现在 issue stamp 的 `ISSUE #023` 拉丁部分，中文永远保持原样。

7. **"拷贝 academic 的纯白 + 定理框"**
   **规避**：底色 `#fbf8f1` 微暖米（不纯白），四态容器用胶囊标签不用定理框 ■ QED。`<strong>` 在 observer 里**鼓励使用**（和 academic 禁用恰好相反）——观察稿的断言必须靠加粗锚定。

8. **"拷贝 people-story 的 drop cap 和罗马章节号"**
   **规避**：industry 不做首字下沉（dropcap 是杂志审美），不做罗马章节号 I/II/III——改用 `ISSUE #023` 期号（阿拉伯数字）和 steps 的 `2020 · 群雄竞起`（年份 + 中点 + 名称）。

9. **"footer 做成巨型宣传横幅"**
   **规避**：footerCTA 是 Stratechery / Benedict Evans 风——顶底各一根深墨蓝通栏横线夹住冷静文字块，右下一个小胶囊"扫码订阅 ▸"。**强调频率承诺**（每周二）和**阅读时长承诺**（30 分钟读完）——这是 newsletter 文化纪律。拒绝橙红渐变 banner、拒绝"限时免费领研报"、拒绝"关注不迷路"这类诱导话术。

10. **"quoteCard 做成金句截图"**
    **规避**：observer 的 quoteCard 是**完整断言 + attribution**——22px/500/左对齐/左右双竖线 + 末行右对齐破折号前缀的出处。**拒绝居中**、**拒绝大图引号占半屏**、**拒绝"金句"标签**——这里不做朋友圈截图式金句卡，这里做的是"一句有分量的业内断言，值得读三遍"。

11. **"issue stamp 做成圆形 VIP 徽章"**
    **规避**：issue stamp 是**双线矩形 + 疏朗字距 1.5px + 橙金色**——印章的规整感，不是徽章的炫耀感。`ISSUE #023 · 2025-04-20 · 周刊`，全大写拉丁 + 中文原样，`·` 分隔。拒绝做成圆形、星形、盾形、箭头形。

12. **"radius 12 + shadow 软化整页"**
    **规避**：本主题 `radius` 保持 `sm: 2 / md: 3 / lg: 4`——**和 business 同档都走硬边**（academic 和 industry 同为分析型，视觉上都该硬），但略比 business 松一档（business 是 0/2/4，industry 是 2/3/4）——这一微差让 industry 比 business **不那么冷酷**，保留 newsletter 的温度。shadow 禁用（平台不支持 box-shadow 过 juice）。

---

## 结语（给落地工程师）

industry-observer 的核心就三件事：

1. **primary 深墨蓝 `#24364f` + accent 橙金 `#b86f2a`**——冷黑 + 暖金的两支色系。primary 用于结构（标题、short rule、strong），accent 用于信号（issue stamp、.num、quoteMark、highlight 竖条）。底色 `#fbf8f1` Stratechery 米，黄度 3%，微暖但不甜。这一套组合放在 business 深栗墨旁边，**体温立刻不同**——Pair 拉开的关键。

2. **三件签名动作**：
   - **Issue stamp 跨容器出现**——cover / footer / author 行都会见到 `ISSUE #023 · 2025-04-20 · 周刊`，11px/600/橙金/字距 1.5px/双线矩形框包住。这是 industry 的期号 DNA。
   - **Pull-quote = 完整断言 + attribution**——22/500/左对齐 + 左右双 primary 竖线 + 末行右对齐 `—— 姓名，身份 · 出处`。比 business 的短判断长、比 academic 的素朴引文浓、比 people-story 的 drop cap 冷。
   - **Compare = 多列矩阵不是两列账本**——3-5 列公司 × 3-5 行维度的平行对照，顶栏 bgMuted 浅底不染色，零涨跌语义。**ledger variant 在本主题禁用**，这是和 business 的硬分界。

3. **四态靠胶囊标签 + 形状差异统一语言**——要点 / 背景 / 存疑 / 错判四词，tip 胶囊悬挂 / info 胶囊内嵌无框 / warning 胶囊内嵌硬边 / danger 胶囊悬挂双框缺口。胶囊字距 1px、高度 18-22px、中文二字。这套系统让 observer 的四态**比 business 柔、比 academic 活、比 people-story 专业**。

最后一条钉子级纪律：**highlight 故意不做巨号数字卡**。这是 industry 与 business 最容易互污染的位置——工程落地时看到"highlight 要强调数字"会条件反射做成巨号卡，那就是 business 的 DNA 倒灌。observer 的 highlight 是**左 3px 橙金竖条 + 正文嵌入 `.num` 轻强调**——数字服从洞察，不是反过来。这一条打回所有"能不能 primary 改成 `.num` tabular" / "能不能 highlight 做大号数字"的 PR。

observer 不是 analyst，observer 不是 reporter——observer 是那个周二清晨给你写信的业内朋友，有观点，有温度，有节制。**所有视觉决策都必须能回答一句：这在 Benedict Evans 的 newsletter 里会出现吗？** 能，就保留；不能，就砍掉。
