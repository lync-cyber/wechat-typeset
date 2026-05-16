# 极客夜行 · 工程随笔 Vol.03

::: cover 工程随笔 Vol.03 · 写事故复盘
![封面占位](https://placehold.co/1200x630?text=tech-geek+cover)

夜班工程师视角：凌晨三点对着终端写事故复盘，不是在炫酷，是在认真。
:::

::: author 某某 · 2026-04-20 · 阅读时长 12 分钟 · 字数 3400
:::

::: intro 题解
本篇整理过去 18 个月里我在三家公司写 postmortem 的经验——从"一人一事故"的短条
模板，到跨团队复盘的 RCA 文档格式，再到对外公开的 learning 文章。关注点始终
只有一件事：**让下一个读到这份文档的工程师，能在 15 分钟内判断他该不该改行为**。
:::

::: divider
:::

## 写 postmortem 的三条约束

三条约束锚定 postmortem 的边界，来自 Google / Amazon / Stripe 公开 postmortem 的共同骨架[^1]。

### 约束一 · 时间轴必须精确到分钟

不是"14:00 左右"，是 `14:03:21`。时间戳的精度决定了三个月后回溯时**能否把相邻事件拉出因果链**。

### 约束二 · "为什么没发现"比"发生了什么"更重要

事故报告有 `WHAT` 和 `WHY-DETECT` 两栏。多数人只写 `WHAT`，是因为 `WHY-DETECT` 要求回答"为什么我们的监控没报"——这问题很难，但回避它等于没做复盘。

### 约束三 · 行动项必须**可以被拒绝**

给每个 action item 一个 `owner` + `due date` + `rejectable reason`。全部 100% 执行的 action items 列表反而是 bad smell。

::: tip 附注
这三条约束不是我发明的，是反推公开案例得出的共同骨架。走 manpage-log 默认骨架——顶底分隔线 + 状态标签条，与正文同色族。
:::

::: warning 注意陷阱
**小团队慎用正式 postmortem 模板**。5 人以下团队写 9 页 RCA 文档是灾难——修复时间都不够，复盘写一下午。小团队的约束换成"事故本身长度 × 2 = 复盘文档长度上限"。
:::

::: info 参考
Google SRE Book · Chapter 15 Postmortem Culture；以及 Stripe 工程 blog 的 "Writing Great Design Docs"（2019）。
:::

::: danger 严重警告
**最典型 anti-pattern**：把 postmortem 写成"找谁背锅"。一旦文档里出现"人名 + 应当更谨慎"的句式，之后没人会写诚实的时间轴——大家都会自我审查。
:::

::: note 范围说明
本篇只谈"对内 postmortem"；对外公开的 learning 文章（面向客户 / 监管）是另一套体裁——语气更克制，数据更少，结构更像新闻稿。
:::

::: divider
:::

## 关键对照数据

以下是来自三家公司 18 个月内 47 份 postmortem 的汇总统计[^2]：

| 指标 | 有 runbook | 无 runbook |
| --- | --- | --- |
| 平均 MTTR（分钟） | 23 | 54 |
| 复盘完成率 | 91% | 64% |
| 行动项执行率 | 78% | 41% |
| 重复事故发生率 | 12% | 38% |

```bash
# 从上一次 deploy 之后的错误日志里捞时间戳（UTC 转本地）
$ journalctl --since "2026-04-19 14:00" --until "2026-04-19 15:00" \
    | grep -i error \
    | awk '{print $1,$2,$3}' \
    | sort -u
```

::: divider
:::

## 引文 · 算法的终止性

::: quote-card Knuth · TAOCP Vol. 1
An algorithm must **always terminate** after a finite number of steps. A procedure
that lacks this feature but has all other characteristics of an algorithm may be
called a computational method.
:::

> "Premature optimization is the root of all evil (or at least most of it)."
> —— Knuth

::: divider
:::

## 取舍 · 两种 RCA 文档格式

:::: compare

::: pros 五段式模板
- 长度可控（每段 100 字上限）
- 新人写第一份也不会跑偏
- 好检索、好做 embedding
- 劣势：模板压死"非典型事故"
:::

::: cons 自由叙述
- 能承载复杂因果链
- 老手写的质量上限高
- 劣势：新人写起来像在写作文
- 劣势：月底每份都要人肉 review
:::

::::

**两种格式并存**，不是二选一——新事故用模板，复盘评审后允许作者把"模板装不下的复杂因果"另开一段自由叙述。这叫 `graceful degradation`。

## 步骤 · 写 postmortem 的方法

::: steps
### 拉 timeline
先把监控 / log / Slack / tickets 四条线的时间戳合并成单一 timeline。精确到秒。

### 标因果链
从 timeline 找"这一步**直接**导致下一步"的箭头。箭头数量应该 ≤ 事件数 - 1。

### 找 detection gap
每个箭头问一次"这一步有没有可能被**更早**发现"。这就是核心拷问。
:::

三步走；不加第 4 步的"action items"——那是评审会议的产物，不是作者个人产出。

::: section-title 附录 · 排版纪律
:::

```python
# 把 timeline 合并成单一因果链的小脚本
def merge_timeline(sources: list[list[dict]]) -> list[dict]:
    """Merge N parallel streams into one timeline sorted by ts."""
    return sorted(
        (event for stream in sources for event in stream),
        key=lambda e: e["ts"]
    )
```

按 <kbd>Ctrl</kbd> + <kbd>R</kbd> 在终端里 reverse-search 历史命令。inline `grep` 走 `primary` 琥珀色 + `bgMuted` 底——和正文自然延续的一笔，不是"另起异物"。

::: divider
:::

## 媒体嵌入

::: video-card
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: voice-card
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="事故复盘语音版" play_length="900000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: divider
:::

## 延伸阅读

::: recommend
- Google SRE Book · Chapter 15 Postmortem Culture
- Stripe Engineering · Writing Great Design Docs (2019)
- TAOCP Vol. 1 · Algorithms vs Methods
:::

::: qrcode 订阅「工程随笔」
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 延伸阅读
- 相关工程随笔 Vol.02（编者按）
- 本篇的数据与实验脚本（附录 B）
- 下一期主题：*读生产环境代码的方法*

某某 · 2026-04-20 · 若此文对你有用，请回信告诉我一件**你改了的行为**
:::

::: footnotes
[^1]: 数据来源：Google SRE Book Chapter 15、Stripe Engineering Blog（2019）、Amazon Builder's Library（2020）。三处来源的模板骨架在"时间轴精度 / 根因问题 / 可拒绝行动项"三点上高度收敛。
[^2]: 统计周期 2024-10 至 2026-03，覆盖 3 家公司 47 份 postmortem，其中 SaaS 产品类 29 份、基础设施类 18 份。有 runbook / 无 runbook 的分组依据是事故发生时 on-call 能否在 2 分钟内定位操作手册。
:::
