# 画布原型 · 容器边界契约（persona-contracts）

**来源**：[content-1.html](content-1.html) 集成分析任务二（变体重复性检查）。
**适用范围**：画布原型层 4 主题（编辑部 / 宋本批注 / 博物笔记 / 包豪斯文摘），以及将来生产侧对应主题（建议 id：editorial / classical / naturalist / bauhaus）。
**消费方**：LLM 容器选择决策、新 variant 落地（任务 T2.x）、视觉手法防重复（任务 T3.x）、`narrativeStrength` 字段（任务 T5.5）。

本文档约束的是**跨主题的容器边界规则**，不绑定具体主题。所有规则在 4 主题中均适用。

---

## 规则 1 · announcement vs admonition 叙述强度梯度

**约束**：`announcement` > `admonition`（叙述强度梯度）。

**原因**：两者都"提请注意"，语义部分重叠；不通过强度划界就会被 LLM 互换使用。

**落地**：

| 维度 | admonition | announcement |
|---|---|---|
| 叙述强度（建议 `narrativeStrength`） | 3 | 4 |
| 占位 | 段落级，不抢版心 | 整版级，可占满 `.phone-inner` 宽度 |
| 字号上限 | 与正文 `body` 相当（≤16px） | 标题可放大（18–22px） |
| 标题文字 | 保留"告示 / NOTICE / NB." 等克制标签 | 可用"通告 / NOTICE / FIELD NOTICE"等更强的标签 |

**视觉手法防重复**（避免 4 主题中手法撞车）：

| 主题 | admonition 手法 | announcement 手法 |
|---|---|---|
| t1 编辑部 | 编号 + 双横线（NOTICE·N°01） | 满版 MASTHEAD BAR / INDEX CARD |
| t2 宋本 | -3° 旋转方框朱印 | 无旋转双框朱印 |
| t3 博物 | 刻度 + 学名小标（FIG.CAVE—04） | 满版 FIELD NOTICE / STAMP CARD |
| t4 包豪斯 | 18×18 实心方块 + 横线 / 三角顶 | 满版 RED SQUARE BURST / BLACK PLATE |

---

## 规则 2 · footnotes vs note 编号规则

**约束**：`footnotes` **必带数字编号**，`note` **不带编号**。

**原因**：两者都是"补充说明"，差别在"文末编号引用 vs 正文中段编辑出场"。手法（小字 / 学者气）相近，唯一可靠的解耦点是编号与位置。

**落地**：

| 维度 | note | footnotes |
|---|---|---|
| 编号 | 不含 | 必含 ¹²³ 或 `[01][02]` 或 `1.` `2.` |
| 位置 | 正文段落附近 | 文末，作为列表 |
| 条目数 | 单段为主 | 多条并列 |
| 与正文引用 | 不需引用锚点 | 需对应正文上标锚点 |

---

## 规则 3 · image-caption 必带 FIG 前缀

**约束**：`image-caption` **必含 `FIG. / PL. / PLATE / 图 N`** 等前缀且依附图片；`note` **不得使用** 这些前缀。

**原因**：手法（小字注解 / 悬挂式标签）相似，前缀是语义锚点。

**落地**：

| 维度 | note | image-caption |
|---|---|---|
| 前缀 | 不含 FIG/PL/PLATE | 必含 |
| 上文 | 任意段落 | 必为图片元素 |
| 用途 | 编辑出场 / 旁批 | 图说 / 图注 |

---

## 规则 4 · pull-quote vs abstract / intro 位置语义

**约束**：`abstract` 和 `intro` **锁定文首**，`pull-quote` **锁定正文中段**。

**原因**：三者都用"大字 / drop cap"手法，无法靠视觉划界，必须靠位置语义解耦。

**落地**：

| 维度 | abstract / intro | pull-quote |
|---|---|---|
| 出现位置 | 文章第一屏（标题之后、正文开始前） | 正文段落之间，不在第一屏 |
| 与正文关系 | 总览 / 引导 | 提炼 / 强调 |

**额外约束**：`pull-quote` **不得实现"文首 drop cap + 大字"组合形态的变体**——这种形态默认归 intro 使用，避免抢位。

---

## 规则 5 · section-tag / highlight / key-number / quote-card 尺度划界

**约束**：靠**字号尺度**差解耦，不靠装饰手法差。反白色块、大数字朱印是 4 主题共用的核心视觉资源，无法独占给单个容器。

**原因**：
- `section-tag` 的反白色块 ≈ `highlight` T4 反白色块
- `key-number` 的大数字朱印 ≈ `quote-card` T4 巨数字编号

**落地**：

| 容器 | 角色 | 字号上限 | 元素尺度 |
|---|---|---|---|
| section-tag | 栏目名 inline 短词 | 12–14px | 自身高度 ≤ 24px |
| highlight | 段内关键短句（≤10 字） | 与正文 body 一致（15px） | 与正文行高一致 |
| key-number | 独立"数字事件"组件 | 数字 ≥ 44px | 占独立段，可加副标 |
| quote-card | 引言序号 + 引文 | 数字 ≤ 36px，引文 18–21px | 卡片形态有边框 |

---

## 引用关系（下游任务）

| 下游任务 | 依赖本文档的规则 |
|---|---|
| T1.x（types.ts 增 `narrativeStrength` 字段） | 规则 1 |
| T2.x（40 变体落地的视觉手法） | 规则 1 / 4 / 5 |
| T3.3 / T3.4（persona 边界落地） | 全部 5 条 |
| T5.5（`narrativeStrength: 1..5`） | 规则 1 → admonition=3, announcement=4；规则 5 → highlight=1, note=2, abstract=3, pull-quote=5, key-number=5 |

## 主题映射建议（供 P1 阶段引入新主题时参考）

| 画布原型主题 | 建议生产侧主题 id | 现有最接近主题 |
|---|---|---|
| 编辑部 t1 | `editorial` | `editorial-mook` / `default` |
| 宋本批注 t2 | `classical` | `literary-humanism` |
| 博物笔记 t3 | `naturalist` | `academic-frontier` |
| 包豪斯文摘 t4 | `bauhaus` | `swiss-grid` / `brutalist` |

映射关系**尚未确认**。P1 阶段决策时可选：（a）新建 4 个独立主题，或（b）复用现有相近主题并修改 palette。本文档的规则在两种方案下都适用。
