# 极客夜行 · 全量示例

> 本篇用于在 tech-geek 主题下肉眼校验 **VT220 琥珀 + 墨炭暖底 + HN 橙脚注** 的深底气质。
> 覆盖 19 个容器与四态 admonition 的**四重冗余**（注释前缀 / 边框样式 / 边框位置 / 图标形状）。
>
> 参照坐标：Plan 9 manpage · Phrack ASCII zine · ACM Queue · TAOCP 脚注 · Fabien Sanglard。
> 气质关键词：**成年、克制、琥珀、脚注**。

::: cover 工程随笔 Vol.03 · On Writing Postmortems
![封面占位](https://placehold.co/1200x630?text=tech-geek+cover)

夜班工程师视角：凌晨三点对着终端写事故复盘，不是在炫酷，是在认真。
:::

::: author ¶ 某某 · 2026-04-20 · 阅读时长 12 分钟 · 字数 3400
:::

::: intro ABSTRACT
本篇整理过去 18 个月里我在三家公司写 postmortem 的经验——从"一人一事故"的短条
模板，到跨团队复盘的 RCA 文档格式，再到对外公开的 learning 文章。关注点始终
只有一件事：**让下一个读到这份文档的工程师，能在 15 分钟内判断他该不该改行为**。
:::

::: divider variant=wave
:::

## 写 postmortem 的三条约束

本章用三条约束锚定 postmortem 的边界。tech-geek 的 h2 走 `§` 前缀（manpage heading） +
1.5px 字距 + `1px dashed border-bottom` —— 博客风下划线改成虚线的克制版。

### 约束一 · 时间轴必须精确到分钟

不是 "14:00 左右"，是 `14:03:21`。时间戳的精度决定了三个月后回溯时**能否
把相邻事件拉出因果链**。这是我从 *Google SRE Book* 那里学到的第一条纪律。

### 约束二 · "为什么没发现"比"发生了什么"更重要

事故报告有 `WHAT` 和 `WHY-DETECT` 两栏。多数人只写 `WHAT`，是因为 `WHY-DETECT`
要求回答"为什么我们的监控没报"——这问题很难，但回避它等于没做复盘。

### 约束三 · 行动项必须**可以被拒绝**

给每个 action item 一个 `owner` + `due date` + `rejectable reason`——如果三个月
后 owner 来说"这个做不成，理由是...."——那说明约束清晰、讨论有效。全部 100%
执行的 action items 列表反而是 bad smell。

::: tip // NOTE variant=dashed-border
这三条约束不是我发明的，是 Google / Amazon / Stripe 公开 postmortem 反推出的
共同骨架。`dashed-border` 的"附注性"语义在这里正合——铅笔划边的补充说明。
:::

::: warning // CAVEAT variant=accent-bar
**小团队慎用正式 postmortem 模板**。5 人以下团队写 9 页 RCA 文档是灾难——
修复时间都不够，复盘写一下午。小团队的约束换成"事故本身长度 × 2 = 复盘文档
长度上限"。2 小时事故，写 4 小时复盘即止；超过了就是`// PITFALL`。
:::

::: info // REF §2.3.1 variant=double-border
参考：Google SRE Book · Chapter 15 Postmortem Culture；以及 Stripe 工程 blog 的
"Writing Great Design Docs"（2019）。`double-border` 的"交叉引用"语义——RFC / manpage
常见的"参见他节"排版传统。
:::

::: danger // PITFALL variant=top-bottom-rule
**最典型 PITFALL**：把 postmortem 写成"找谁背锅"。一旦文档里出现"人名 + 应当
更谨慎"的句式，之后没人会写诚实的时间轴——大家都会自我审查。`top-bottom-rule`
的上下双线像 errata 勘误条，把这种**稀缺的严重警告**夹起来。
:::

::: note // NOTE on scope
本篇只谈"对内 postmortem"；对外公开的 learning 文章（面向客户 / 监管）是另一套
体裁——语气更克制，数据更少，结构更像新闻稿。note 在 tech-geek 里就是 manpage 里
那种"aside"附注：不改变主叙事，只为专业读者留一条旁路。
:::

::: divider variant=dots
:::

## Key Number · 三组关键数据

::: highlight
**14:03:21** · 告警触发时间

**14:09:17** · on-call 确认事故 —— **6 分钟**延迟
:::

::: highlight
**87%** · 事故有"早期信号"但被 on-call 误判为误报

**2.3×** · 有 runbook 的事故平均修复时间 / 无 runbook 的比值
:::

::: divider variant=flower
:::

## Pull Quote · TAOCP 脚注风

::: quote-card Knuth · TAOCP Vol. 1, §1.2.5 variant=frame-brackets
An algorithm must **always terminate** after a finite number of steps. A procedure
that lacks this feature but has all other characteristics of an algorithm may be
called a computational method.
:::

> 裸引用："Premature optimization is the root of all evil (or at least most of it)."
> —— Knuth，走左侧 1px border 竖线 + textMuted，没有引号 SVG（留给 quoteCard 独占）。

::: divider variant=wave
:::

## Trade-off · 两种 RCA 文档格式

:::: compare

::: pros + PRO 五段式模板
- 长度可控（每段 100 字上限）
- 新人写第一份也不会跑偏
- 好检索、好做 embedding
- 劣势：模板压死"非典型事故"
:::

::: cons - CON 自由叙述
- 能承载复杂因果链
- 老手写的质量上限高
- 劣势：新人写起来像在写作文
- 劣势：模板缺位 = 月底每份都要人肉 review
:::

::::

**两种格式并存**，不是二选一——新事故用模板，复盘评审后允许作者把"模板装不下的
复杂因果"另开一段自由叙述。这叫 `graceful degradation`。

## Algorithm · 写 postmortem 的步骤

::: steps
### [1] 拉 timeline
先把监控 / log / Slack / tickets 四条线的时间戳合并成单一 timeline。精确到秒。

### [2] 标因果链
从 timeline 找"这一步**直接**导致下一步"的箭头。箭头数量应该 ≤ 事件数 - 1。

### [3] 找 detection gap
每个箭头问一次"这一步有没有可能被**更早**发现"。这就是 `WHY-DETECT`。
:::

三步走；不加第 4 步的"action items"——那是评审会议的产物，不是作者个人产出。

::: section-title APPENDIX A · 排版纪律 variant=cornered
:::

本主题的排版纪律（tech-geek signature）：

- **正文**：15px / **500** / 字距 0.6px / 行高 1.85（深底补偿：400 会发虚）
- **h1**：25px / 600 / 字距 2px（不上 700 —— 深底大字号 + 700 会"塑料硬边"）
- **h2**：19px / 600 / 字距 1.5px / 下方 1px 虚线（不做实色通栏下划）
- **h3**：16px / 600 / 字距 1px（与正文同号，只靠字重 + 字距区分）
- **inline code**：字号 = 正文 15 / 字重 = 500 / 字距 +0.2px / `primary` 琥珀色
  —— **signature 动作**：code 与正文同色同族，不割裂

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>R</kbd> 在终端里 reverse-search 历史命令。inline `grep`
走 `primary` 琥珀色 + `bgMuted` 底 —— 和正文自然延续的一笔，不是"另起异物"。

### bare codeBlock

本主题 codeBlock 走 `bare` —— tech-geek 不需要 header-bar 语言标签带（那是
tech-explainer 签名）。代码块**不加 border-left**（去掉"代码块是异物"的做法），
底色仅与正文底差 5% 明度。

```bash
# 从上一次 deploy 之后的错误日志里捞时间戳（UTC 转本地）
$ journalctl --since "2026-04-19 14:00" --until "2026-04-19 15:00" \
    | grep -i error \
    | awk '{print $1,$2,$3}' \
    | sort -u
```

```python
# 把 timeline 合并成单一因果链的小脚本
def merge_timeline(sources: list[list[dict]]) -> list[dict]:
    """Merge N parallel streams into one timeline sorted by ts."""
    return sorted(
        (event for stream in sources for event in stream),
        key=lambda e: e["ts"]
    )
```

::: divider variant=dots
:::

## Attachment · 媒体嵌入件

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="事故复盘语音版" play_length="900000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: free
自由容器 = Verbatim：tech-geek 的 free 保持透明底 + 无边框，真正"自由"——
不强加任何 motif。
:::

::: divider variant=flower
:::

## References · 延伸阅读

::: recommend
- [1] Google SRE Book · Chapter 15 Postmortem Culture
- [2] Stripe Engineering · Writing Great Design Docs (2019)
- [3] TAOCP Vol. 1, §1.2.5 · Algorithms vs Methods
:::

::: qrcode 订阅「工程随笔」
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta SEE ALSO
- 相关工程随笔 Vol.02（编者按）
- 本篇的数据与实验脚本（附录 B）
- 下一期主题：*On Reading Production Code*

¶ 某某 · 2026-04-20 · 若此文对你有用，请回信告诉我一件**你改了的行为**
:::
