# 文章骨架模板

> 标准深度文（1500-3000 字）的全骨架。LLM 接手新文章时可拷此骨架先搭"位置感"，再往里填内容。
> 简短文章（≤800 字）按需删；超长文章（≥5000 字）补 abstract / footnotes / colophon。

```markdown
# {文章标题}

::: cover
![](https://cdn.example.com/cover.png)

## {副标题或 kicker，可选}
:::

::: author 作者名
发表于 2026-04-18 · 标签
:::

::: intro
{文章 2-4 行总览。回答：本文要讲什么？为什么读者要继续读？}
:::

<!-- 仅深度刊（business-finance / academic-frontier / industry-observer）建议用 abstract -->
<!--
::: abstract 摘要
{80-160 字摘要：核心论点 + 主要论据。读者读完即可判断"是否继续读"。}
:::
-->

::: section-title
第一节 · {小标题}
:::

{正文段落 N 个。视情况插入：}

<!-- 关键论点段落：用 highlight -->
::: highlight
{核心论点，整段醒目。}
:::

<!-- 数据点：用 key-number -->
::: key-number value=87% 留存率
{背景一句话，重复数字解释。}
:::

<!-- 提示 / 警告 -->
::: tip
{小贴士。}
:::

::: warning
{需要注意的点。}
:::

<!-- 步骤 -->
::: steps
1. {步骤 1}
2. {步骤 2}
3. {步骤 3}
:::

<!-- 对比 -->
:::: compare
::: pros 优点
- {优点 1}
- {优点 2}
:::
::: cons 缺点
- {缺点 1}
- {缺点 2}
:::
::::

::: divider
:::

::: section-title
第二节 · {小标题}
:::

{正文段落...}

<!-- 引用块 -->
::: quote-card
{金句。}
:::

::: divider
:::

::: section-title
第三节 · {小标题}
:::

{正文段落...}

<!-- 文末 -->
::: see-also 延伸阅读
- [{相关文章 A 标题}]({URL})
- [{相关文章 B 标题}]({URL})
:::

::: footer-cta 觉得有用？ cta=关注我 href=https://mp.weixin.qq.com/s/xxxxx
{一句引导文案。}
:::

::: qrcode
![](https://cdn.example.com/qr.png)

扫码加群继续聊
:::
```

## 节奏建议

| 文章长度 | 容器数量 | 必含 |
| --- | --- | --- |
| 短文（≤800 字） | 1-3 个 | 至少 1 个 quote-card 或 highlight |
| 标准文（1500-3000 字） | 3-6 个 | intro / 2-3 节 section-title / 1 个 footer-cta |
| 深度文（3000-5000 字） | 6-10 个 | intro 或 abstract / 3+ 节 section-title / 2 个 key-number / 1 个 see-also / 1 个 footer-cta |
| 超长文（≥5000 字） | 10-15 个 | abstract / 4+ 节 section-title / 数据卡 + 对比块 + 步骤 + footnotes / colophon |

**坑**：不要按"骨架的每个 ::: 都得填"——骨架是**可用位置**，不是**必填位置**。

## variant 决策点（骨架阶段不要决策）

骨架阶段**不要**在 `:::` 后写 `variant=xxx`——主题默认骨架就够了，单独想覆盖再加。

仅以下情况需要写 variant：

- `::: divider variant=glyph glyph=§` —— 用 § 装饰分隔（glyph 是唯一允许 Unicode 装饰的位置）
- 主题默认骨架不适合本段（少数情况，要有明确理由）

## 不要在骨架阶段做的事

- 不要在骨架里写 `::: free`（除非真的有"编辑部补注"这种不归类内容）
- 不要写 `::: mpvoice` / `::: mpvideo` 占位卡（除非用户明确说要发语音 / 视频；这是公众号后台功能）
- 不要写不在词汇表内的 fence 名（包括看似合理的 `::: insight` / `::: callout`——都不存在）
