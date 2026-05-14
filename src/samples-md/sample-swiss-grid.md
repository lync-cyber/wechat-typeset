# 苏黎世栅格 · 主题示例

> 本篇用于在 swiss-grid 主题下肉眼校验 **国际红 + 12 栏铁律 + 直角硬边** 的版面气质。
>
> 设计原型：docs/themes-specs/themes/02-swiss-grid.html · 1958 Neue Grafik 04 苏黎世对开页。
> 气质关键词：**Josef Müller-Brockmann · 红铅笔辅助线 · hairline · 红章 H2**。

::: key-number NEUE LESE GRAFIK value="Nº04"
VOL.IV · 2026—04—22 · CHF 14.—
:::

::: section-tag ESSAY · 01
:::

::: cover 在无人深夜，重新学习如何阅读一本书
:::

::: author
撰文 **顾留白**　·　编辑 **徐稍后读**　·　SET **04·2026**
:::

::: abstract INDEX · 副刊导读
我们并非失去了阅读的能力，而是失去了为阅读腾出一整段连续时间的勇气。算法只做分发，不做阅读；一本书要求的是完整的自己。慢读是对时间主权的重新申明。
:::

:::: toc INDEX · 目次
::: toc-item no="01" page="04" 失去耐心的结构
:::
::: toc-item no="02" page="08" 慢读三练习
:::
::: toc-item no="03" page="14" 夜晚作为阅读时区
:::
::: toc-item no="附" page="18" Q&A · 方法论注
:::
::::

::: intro
We did not lose the ability to read. 我们失去的是——为阅读腾出一整段连续时间的勇气。
:::

## 为什么我们失去了阅读的耐心

每一则推送、每一次震动，都在训练我们把注意力切成更小的碎片。我们以为自己在 ==主动获取信息==，实际上是 *被信息反向喂养*。

算法并不阅读，它只是分发。一本书要求你交出的是完整的自己——**完整的自己**。

:::: bar-chart FIG.01 · 按年龄 · 日均连续阅读 subtitle="n=1024 · 单位：分钟 · 数据来源：作者调研"
::: bar label="60+" pct="84" value="42 分"
:::
::: bar label="45–59" pct="58" value="29 分"
:::
::: bar label="30–44" pct="34" value="17 分"
:::
::: bar label="18–29" pct="16" value="8 分"
:::
::: bar label="<18" pct="10" value="5 分" tone="warn"
:::
::::

## 慢读的三种练习

### 纸质之必要

纸张的阻力是一种保护。翻页需要手的动作，这动作本身就是对注意力的锚定。

> 凡我所是，皆因我读。
>
> — J. L. BORGES · 1960

### 每日有定数

1. 每日只读 20 页
2. 读完合眼默想——记住一个词，记住一处停顿
3. 纸质笔记本记录三句话

### 手的参与

- [x] 铅笔轻划，不用荧光笔
- [x] 书页一角折痕做记
- [ ] 读完抄录一段于扉页

::: info INFO
深夜读书请保持光源在书后侧 45°。
:::

::: tip TIP
配温水一盏。茶易醒脑，咖啡断连续。
:::

::: warning WARN
手机应在另一房间充电，非床头。
:::

::: danger STOP
勿在短视频毕后方翻书。
:::

以一行函数表达：`read(book, slowly)`。

```javascript
// READING.JS
const reading = (book) =>
  book.read(slowly);
```

::: qa-block READER Q&A q="周末仅余两小时，能读完一本书吗？"
不能。能读完的不是书，是书的大意。两小时只够与一章 **相处**——已足矣。
:::

::: editor-note 编 者 按 · 01
慢读并非复古姿态，而是一种对自己时间主权的重新申明。
:::

## 夜晚作为最后的阅读时区

白日属于他人，夜晚才真正属于自己。那一盏台灯下的半小时，是这个时代里所剩不多的 **连续时间**。

读者若有心，不妨 [分享你今夜读的那一页](#)。

::: refs NOTES
[1]　出自帕慕克《别样的色彩》，略有改动。
:::

::: divider
:::

::: cta-bar like="♡  LIKE" star="◎  SEEN" share="→  SHARE"
:::

::: qr-follow NEUE LESE GRAFIK desc="每双周四出版 · 栏位制设计评论" kicker="SUBSCRIBE"
:::

::: methodology 方法论
本文数据为作者自行整理，n=1,024，样本覆盖 18–72 岁都市读者；"连续阅读"定义为不被通知或切屏中断、持续 5 分钟以上的阅读行为。
:::

::: colophon next="纸本之必要：论书脊与手指的记忆" issue="Nº04 / 2026 / ZÜRICH"
:::
