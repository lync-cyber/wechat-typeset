# 数据简报 · 主题示例

> 本篇用于在 data-brief 主题下肉眼校验 **数据蓝 + 黑底代码 + 直角硬边** 的版面气质。
>
> 参照坐标：晚点 LatePost · 财新数据 · 机器之心 · Morning Brew。
> 气质关键词：**简报、数字、栏目化、克制**。

::: masthead 慢读简报 issue="004" date="2026.04.22"
:::

::: section-tag
深度
:::

::: cover 在无人深夜，重新学习如何阅读一本书
算法时代的注意力账簿，正在失去一笔隐形支出：连续时间。
:::

::: author
撰文 **李翊云** &nbsp;&nbsp; 编辑 **沈帆**
:::

::: abstract 三句话读完本文
① 我们没有失去阅读能力，失去的是连续时间。  
② 算法只做分发，不做阅读；一本书要求的是完整的自己。  
③ 慢读是对时间主权的重新申明。
:::

:::: toc 目录 · CONTENTS
::: toc-item no="01" page="p.04" 为什么我们失去了阅读的耐心
:::
::: toc-item no="02" page="p.08" 慢读的三种练习
:::
::: toc-item no="03" page="p.14" 夜晚作为最后的阅读时区
:::
::: toc-item no="附" page="p.18" 数据说明 · Q&A · 方法论
:::
::::

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2024 / YoY" source="全国国民阅读调查 / 中国互联网络信息中心 · n=1,432 · 2015–2024"
::: kpi-item label="01 · MIN/DAY" caption="日均连读时长" value="12" unit="分钟" delta="−68%" trend="down" series="2,4,5,6,8,9,10,11" foot="'15 38分 → '24 12分"
:::
::: kpi-item label="02 · UNLOCK/DAY" caption="日均手机解锁" value="138" unit="次" delta="+23%" trend="up" series="11,10,9,8,7,5,3,2" foot="'15 41次 → '24 138次"
:::
::: kpi-item label="03 · BOOKS/YR" caption="年均完整阅读" value="2.7" unit="本" delta="±0" trend="flat" series="7,6,8,7,8,6,7,7" foot="'15 2.8本 → '24 2.7本"
:::
::::

## <span style="color:#1756d1;margin-right:8px;font-family:Menlo,monospace;font-weight:700">01</span>为什么我们失去了阅读的耐心

每一则推送、每一次震动，都在训练我们把注意力切成更小的碎片。我们以为自己在**主动获取信息**，实际上是 *被信息反向喂养*。

算法并不阅读，它只是分发。一本书要求你交出的是完整的自己——不是五分钟，不是通勤时间，也不是临睡前滑手机的余光。

:::: bar-chart 每日连续阅读时长 · 按年龄分布 subtitle="单位：分钟 · 数据来源：作者调研 n=1,024"
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

> "凡我所是，皆因我读。"
>
> —— 博尔赫斯

## <span style="color:#1756d1;margin-right:8px;font-family:Menlo,monospace;font-weight:700">02</span>慢读的三种练习

### 2.1&nbsp;&nbsp;纸质之必要

纸张的阻力是一种保护。翻页需要手的动作，这动作本身就是对注意力的锚定。

:::: compare
::: pros 纸 本 value="+37%" caption="深度理解得分"
:::
::: cons 屏 读 value="+210%" caption="跳读切换次数"
:::
::::

### 2.2&nbsp;&nbsp;每日有定数

1. 每日只读 20 页
2. 读完合眼默想
3. 纸质笔记本记录三句话

### 2.3&nbsp;&nbsp;手的参与

- 铅笔轻划，不用荧光笔
- 书页一角折痕做记
- 读完抄录一段于扉页

若用一行函数表达：`read(book, slowly)`。

```javascript
const reading = (book) =>
  book.read(slowly);
```

<section style="margin:22px 0;padding:14px 16px;background:#f5f7fa;border-left:3px solid #1756d1">
<section style="font-size:11px;font-weight:700;color:#1756d1;letter-spacing:0.1em;margin-bottom:6px">编 者 按</section>
<section style="font-size:13px;line-height:1.7;color:#111418">慢读并非复古姿态，而是一种对自己时间主权的重新申明。</section>
</section>

## <span style="color:#1756d1;margin-right:8px;font-family:Menlo,monospace;font-weight:700">03</span>夜晚作为最后的阅读时区

白日属于他人，夜晚才真正属于自己。那一盏台灯下的半小时，是这个时代里所剩不多的**连续时间**。

点击 [这里](#) 分享你今夜读的那一页，下期我们将汇总读者笔记。

::: divider
:::

::: qa-block 读者问答 · Q&A q="数据显示 30 岁以下日均连读仅 8 分钟，还有救吗？"
有。数据衡量的是习惯而非能力。从睡前 15 分钟开始，两周可回升至 22 分钟（样本内中位数）。
:::

**数据说明 · NOTES**

::: info INFO
所有时长以分钟计，四舍五入。
:::

::: tip TIP
睡前 15 分钟是回升的最低成本入口。
:::

::: warning WARN
<18 岁样本量较小（n=87），结论仅供参考。
:::

::: danger STOP
勿将"平均值"误读为"大多数人"。
:::

::: cta-bar
:::

::: qr-follow 慢读简报 desc="每周四，一封邮件，一组数据"
:::

<section style="background:#f5f7fa;padding:10px 12px;font-size:10px;line-height:1.7;color:#5a6068;margin:16px 0"><b style="color:#111418">方法论</b>&nbsp;&nbsp;本文数据为作者自行整理，n=1,024，样本覆盖 18–72 岁都市读者；"连续阅读"定义为不被通知或切屏中断、持续 5 分钟以上的阅读行为。</section>

::: footnotes
[1]&nbsp;&nbsp;数据覆盖 2010–2025，以两年为滑动窗口平滑处理。
[2]&nbsp;&nbsp;"深度理解得分"取自阅读后 24h 回忆测试，满分 100。
:::

<section style="border-top:1px solid #111418;margin-top:20px;padding-top:12px;display:table;width:100%;table-layout:fixed;font-size:11px;line-height:1.6;color:#111418">
<span style="display:table-cell;vertical-align:top"><span style="display:block;color:#5a6068;font-size:10px;letter-spacing:0.1em;margin-bottom:3px">下 期</span>纸本之必要：论书脊与手指的记忆</span>
<span style="display:table-cell;vertical-align:top;text-align:right"><span style="display:block;color:#5a6068;font-size:10px;letter-spacing:0.1em;margin-bottom:3px">卷 · 期</span>第 004 期 &nbsp;·&nbsp; 2026</span>
</section>
