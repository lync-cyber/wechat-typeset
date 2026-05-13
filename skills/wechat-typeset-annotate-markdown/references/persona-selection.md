# Persona 选型决策树（独家 reference）

> 给 LLM 在标注阶段判断"这篇文章用哪套主题"的精细决策图。
> 配合速查表 [../../_shared/references/personas.md](../../_shared/references/personas.md) 使用——本文档是"判别"，那是"画像"。

## 输入信号优先级

按以下三层信号判断，**前层强匹配则不必看后层**：

### 第 1 层：用户给的参照锚点（最强信号）

用户用人名 / 媒体名 / 产品名给参照时，直接匹配：

| 参照 | 推荐主题 |
| --- | --- |
| Medium / Notion / Substack 默认 | `default` |
| Dan Luu / jvns / manpage / RFC / TAOCP | `tech-geek` |
| Stripe Docs / MDN / GitHub Docs | `tech-explainer` |
| 食谱 / 旅行 / 慢节奏 / Kinfolk | `life-aesthetic` |
| FT 中文 / 财新 / HBR / Bloomberg / 投行内参 | `business-finance` |
| 散文 / 宋椠 / 古典 / 三联生活周刊 | `literary-humanism` |
| Stratechery / Ben Thompson / 业内周刊 | `industry-observer` |
| 《人物》 / New Yorker / 杂志特稿 | `people-story` |
| arXiv / Nature / LaTeX article | `academic-frontier` |

锚点 ≥ 90% 命中——退出决策，用对应主题。

### 第 2 层：题材分类（次强）

按题材走决策树：

```
用户话题是技术？
├── 教程 / 文档 / step-by-step                                 → tech-explainer
├── 工程独白 / 底层 / manpage 风                                → tech-geek
└── 研究 / 论文 / 方法学                                        → academic-frontier

用户话题是商业 / 财经？
└── 财报 / 投资 / 内参 / 行业观察
    ├── 周刊 newsletter（期号 / 定期 / 业务拆解）                → industry-observer
    └── 单篇深度报告 / 内参                                       → business-finance

用户话题是人文 / 文学？
├── 人物特稿 / 专访 / profile                                  → people-story
├── 散文 / 书评 / 札记                                          → literary-humanism
└── 生活 / 旅行 / 美食                                          → life-aesthetic

其他 / 不确定                                                   → default
```

### 第 3 层：内容结构特征（最弱）

文章本身的结构在选型时起辅助作用：

| 内容特征 | 偏好主题 |
| --- | --- |
| 大量代码块 + step-by-step | `tech-explainer`（仅它的 codeBlock variant 是 header-bar） |
| 大量数字 + 表格 + 短句 | `business-finance` 或 data-brief 主题（如果有） |
| 段落普遍长 + 引用密集 | `literary-humanism` |
| 段落短 + 节奏快 + 列表多 | `industry-observer` |
| 公式 + 引用 + 严谨陈述 | `academic-frontier` |
| 散文式叙事 + 人物对话 | `people-story` |
| 没有特殊结构 | `default` |

## 多维度评分（高级用法）

当题材模糊时，给候选主题打分：

```
score = audience_match × 3 + signature_container_match × 2 + style_match × 1
```

- `audience_match`：用户说的"受众"与 persona.audience 的语义重合度（0-1）
- `signature_container_match`：文章是否需要 abstract / keyNumber / cover / footerCTA / seeAlso 等签名容器，且 persona 在 signatureContainers 里登记了（0-1）
- `style_match`：参照锚点匹配度（0-1，没锚点时 0.5）

取分数最高的；分差 < 1 时返回 top-2 让用户选。

## 决策中的陷阱

### 陷阱 1：按 id 字面猜

`tech-geek` 和 `tech-explainer` 都属技术，气质截然不同：

- `tech-geek`：暗琥珀字 + 墨炭暖底 + manpage——给同行写的"工程独白"
- `tech-explainer`：白底 + Stripe Docs 风 + code header bar——给新人写的"手把手跟做"

用户说"写技术文"——不够区分。要追问"是给同行看的工程随笔，还是给入门读者的教程"。

### 陷阱 2：把 life-aesthetic 当成"default 暖色版"

`life-aesthetic` 的 spacing 是为长日散文调的（行高 1.85），用来写技术教程会"段落散架"。**default 才是真正中立的**。

### 陷阱 3：industry-observer vs business-finance

两者都是"深度文"，差别：

- `industry-observer`：**周刊** newsletter——有期号、有刊物类型、栏目化，封面 / 作者 / CTA 三处都贴印章
- `business-finance`：**单篇** 深度报告——克制、`ledger` 双列对比、内参版面

用户说"我写每周一篇的行业观察"→ industry-observer 强烈优先。
用户说"我写一篇关于某公司财报的深度分析"→ business-finance 强烈优先。

### 陷阱 4：academic-frontier 不一定是"学术"题材

`academic-frontier` 的气质是**克制 + 衬线**——任何想要"权威克制感"的内容都可以用，不限于真的论文。例如：

- 法律解读
- 政策分析
- 严肃书评（与 literary-humanism 形成对照——后者更柔，前者更冷）

### 陷阱 5：default 是回退而非默认

当题材模糊时回退 `default` 是对的；但**用户明显是写散文 / 财经 / 周刊**时还选 default，是浪费 persona 系统。

## 推荐输出格式

`recommend-persona.ts` 输出的结构应该是：

```json
{
  "ranked": [
    {
      "id": "tech-explainer",
      "score": 0.92,
      "reasons": [
        "受众匹配：教程文 ↔ tech-explainer.audience='教程文档'",
        "结构匹配：检测到 5+ 代码块 → 偏好 codeBlock=header-bar"
      ]
    },
    {
      "id": "tech-geek",
      "score": 0.68,
      "reasons": [
        "受众部分匹配：技术题材",
        "但参照锚点 'Stripe Docs' 强烈指向 tech-explainer，本项次选"
      ]
    },
    { "id": "default", "score": 0.45, "reasons": ["回退选项"] }
  ],
  "recommend_new": false,
  "rationale_one_line": "教程文 + 多代码块 → tech-explainer 是强匹配"
}
```

`recommend_new: true` 仅在 top-1 score < 0.6 时返回——意味"内置主题都不够匹配，建议造新"。
