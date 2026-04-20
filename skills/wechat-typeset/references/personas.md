# 9 套内置 Persona 速查

选型时先读 **受众** 和 **视觉签名**（variants），再对比 **signature 容器** 看是否满足内容需要。id 只是索引，不要按字面猜（`tech-geek` 和 `tech-explainer` 都属技术题材，但气质截然不同）。

## 速览表

| id | 中文名 | 受众 | admonition | quote | steps | divider | codeBlock | signatureContainers |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `default` | 默认主题 | 通用（全题材公平阅读） | `accent-bar` | `classic` | `number-circle` | `rule` | `bare` | —— |
| `tech-geek` | 极客夜行 | 技术布道 / 工程随笔 / 架构评论（manpage / RFC / TAOCP 脚注风） | `dashed-border` | `frame-brackets` | `number-circle` | `wave` | `bare` | —— |
| `tech-explainer` | 文档白昼 | 技术布道 / 产品文档 / 教程 | `accent-bar` | `column-rule` | `number-circle` | `rule` | **`header-bar`** | `note`、`seeAlso` |
| `life-aesthetic` | 慢生活 | 生活写作 / 非虚构随笔 | `accent-bar` | `classic` | `number-circle` | `rule` | `bare` | —— |
| `business-finance` | 硬核财经 | 财经内参 / 研究所 newsletter（FT 中文、财新周刊、Bloomberg Terminal、HBR） | `accent-bar` | `frame-brackets` | `timeline-dot` | `wave` | `bare` | `abstract`、`keyNumber` |
| `literary-humanism` | 人文札记 | 人文非虚构（散文 / 书评 / 长评 / 札记） | `minimal-underline` | `magazine-dropcap` | `timeline-dot` | `flower` | `bare` | —— |
| `industry-observer` | 行业观察 | 内参 newsletter / 行业周报 / analyst essay 读者 | `pill-tag` | `column-rule` | `timeline-dot` | `glyph` | `bare` | `cover`、`author`、`footerCTA`、`abstract`、`keyNumber`、`seeAlso` |
| `people-story` | 人物特稿 | 人物特稿 / 人文非虚构 / 杂志 Profile | `minimal-underline` | `magazine-dropcap` | `timeline-dot` | `rule` | `bare` | —— |
| `academic-frontier` | 学术前沿 | 学术研究者 / 同行评审向的论文化陈述 | `accent-bar` | `frame-brackets` | `timeline-dot` | `rule` | `bare` | `abstract`、`seeAlso` |

## 逐个画像

### default · 默认主题

**定位**：Medium / Notion / Substack 默认家族的「有意识的中立」。

**什么时候选**：用户没说明话题、或者话题跨度大、或者明确说「不要太花」。安全回退。

**选它的信号**：「随便一个干净的就行」「不要太花哨」「像 Medium 那种感觉」。

### tech-geek · 极客夜行

**定位**：VT220 琥珀字 + 墨炭暖底 + manpage / RFC / TAOCP 的印刷传统。成年工程师写给同行的工程散文。

**什么时候选**：写 Linux kernel 内幕、编译器实现、并发模型、数据结构考古、底层系统调优。文风偏独白、脚注多、不忌讳放 shell 片段。

**视觉签名**：`dashed-border` admonition（铅笔批注感）、`frame-brackets` quote（四角方括号 manpage 风）、`wave` divider（`§——§` 横线）。**没有** code header bar——code 与正文同色系，安静处理。

**选它的信号**：「写给工程师看的」「manpage」「RFC」「内核」「系统编程」「和 Dan Luu / jvns 那种风格」。

### tech-explainer · 文档白昼

**定位**：Stripe Docs / MDN 家族，手把手跟做的教程文档。

**什么时候选**：Step-by-step 教程、API 文档翻译、新人 onboarding 文档、工具评测。需要 `note` 提醒框、code 块带语言标签。

**视觉签名**：**`header-bar` codeBlock**（顶部语言标签带 + copy icon）——这是全项目唯一一个不是 `bare` 的 codeBlock。`seeAlso` 容器用于「延伸阅读」。

**选它的信号**：「教程」「step-by-step」「新手指南」「文档」「Stripe」「MDN」。

### life-aesthetic · 慢生活

**定位**：暖米底 + 圆角柔和，饮食 / 旅行 / 长日。

**什么时候选**：食谱、旅行札记、季节随笔、生活美学短文、家居小品。

**视觉签名**：暖米色 bg、圆角柔和、无硬线条。没有 signature 容器——纯靠 palette 和 spacing 的气质承载。

**选它的信号**：「写生活」「美食」「旅行」「四时」「慢节奏」「小确幸」。

### business-finance · 硬核财经

**定位**：深栗墨 + 内参蓝，研究所内参版面，数字与判断优先。

**什么时候选**：行业深度报告、财报分析、宏观观察、投资备忘录、FT 中文 / 财新 / HBR 中文版调性的内容。

**视觉签名**：`frame-brackets` quote（四角 L 形 + attribution 位）、`ledger` compare（账本双列，一红一绿）、`wave` divider（K 线感）、`timeline-dot` steps（阶段时间轴）。`abstract`（tl;dr 摘要）+ `keyNumber`（大数字卡）是两把杀手锏。

**选它的信号**：「财经」「内参」「财报」「投资」「研究报告」「数字 + 判断」「FT 中文风」。

### literary-humanism · 人文札记

**定位**：宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸。

**什么时候选**：文学评论、书评、长篇散文、译序、思想笔记。文风偏引述 / 题辞 / 脚注。

**视觉签名**：`minimal-underline` admonition（最轻的一档，铅笔划）、`magazine-dropcap` quote（首字下沉题辞感）、`flower` divider（云头花饰）、`timeline-dot` steps（卷一 / 卷二 / 卷三）。

**选它的信号**：「散文」「书评」「文学」「札记」「人文」「古典」「宋椠」。

### industry-observer · 行业观察

**定位**：Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿。

**什么时候选**：行业周报、analyst essay、公司业务拆解、趋势观察。newsletter 调性，期号 / 日期 / 刊物类型在封面 + 作者栏 + CTA 三个位置保持视觉一致。

**视觉签名**：`pill-tag` admonition（顶部胶囊悬挂）、`column-rule` quote（左右双竖线夹住段落）、`glyph` divider（中央菱形 ◆）、`cornered` sectionTitle（左上 3×3 accent 方块）。

**独有能力**：主题自带 `issueStamp` 模板 motif——支持在 markdown 容器里写 `issue=023 date=2025-04-20 kind=周刊`，渲染时会在封面 / 作者栏 / CTA 三处自动贴上期号印章 SVG。

**signature 容器最丰富**（6 个）：`cover` + `author` + `footerCTA` + `abstract` + `keyNumber` + `seeAlso`。拿 `seeAlso` 做「相关阅读」、`keyNumber` 做「核心数据」、`abstract` 做「tl;dr」。

**选它的信号**：「周报」「newsletter」「行业观察」「analyst」「Stratechery」「Ben Thompson」「每周一推」「业务拆解」。

### people-story · 人物特稿

**定位**：《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版。

**什么时候选**：人物特稿、深度专访、口述史、杂志 profile。文风叙事 / 人物引语 / 场景白描。

**视觉签名**：`minimal-underline` admonition（采访手记感）、`magazine-dropcap` quote（巨号 serif 引号 + 金句 + byline）、`cornered` sectionTitle（左上肖像 silhouette）。

**独有能力**：声明了 `behavior.introDropcap: true`——intro 首段首字自动拆成放大 span（杂志 profile 的 dropcap 签名）；`behavior.h2RomanNumerals: true`——h2 自动编号 I / II / III（取代 SVG h2Prefix 位置）。

**选它的信号**：「特稿」「人物」「采访」「口述史」「profile」「《人物》杂志」「New Yorker」「纽约客」。

### academic-frontier · 学术前沿

**定位**：Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述。

**什么时候选**：论文科普、方法学解读、研究综述、学术 newsletter。文风严谨、公式 / 引用 / 脚注多。

**视觉签名**：`frame-brackets` quote（论文引文的四角框）、`timeline-dot` steps（方法步骤时间轴）、`rule` divider（最枯的一道线）。`abstract` + `seeAlso` 两件套对应「摘要」和「参考文献 / 扩展阅读」。

**选它的信号**：「学术」「论文」「arXiv」「Nature」「研究综述」「同行评审」「方法学」「LaTeX」。

## 决策树（给 LLM）

```
用户话题是技术？
├── 教程 / 文档 / step-by-step        → tech-explainer
├── 工程独白 / 底层 / manpage 风       → tech-geek
└── 研究 / 论文 / 方法学              → academic-frontier

用户话题是商业 / 财经？
└── 财报 / 投资 / 内参 / 行业观察
    ├── 周刊 newsletter（期号 / 定期）  → industry-observer
    └── 单篇深度报告                    → business-finance

用户话题是人文 / 文学？
├── 人物特稿 / 专访 / profile         → people-story
├── 散文 / 书评 / 札记                 → literary-humanism
└── 生活 / 旅行 / 美食                 → life-aesthetic

其他 / 不确定                          → default
```

不够匹配时永远回退 `default`——它是设计上唯一完全中立的。**不要**把 `life-aesthetic` 当作「default 的暖色版」使用，它的 palette 和 spacing 都是为生活文特化的。
