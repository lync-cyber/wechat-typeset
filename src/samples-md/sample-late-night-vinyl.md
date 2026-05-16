# 深夜电台 · late-night-vinyl 主题示例

::: masthead 夜读电台 · EP.04 date="ON AIR · 03:41"
:::

:::: toc
::: toc-item no="A1" page="08:12" Says · Nils Frahm
:::
::: toc-item no="A2" page="17:35" Music for Airports · Brian Eno
:::
::: toc-item no="B1" page="06:47" Organica · Hiroshi Yoshimura
:::
::: toc-item no="B2" page="09:03" LesAlpx · Floating Points
:::
::::

::: cover EP.04 · 那些只在深夜成立的歌单
*四首 BPM 60 以下的曲子，与你在 03:41 相遇*

主播　·　**罗离线**　　·　　录音　·　2026.04.22 · 03:41
:::

::: author
主播　罗离线　|　制作　夜读电台工作室　|　EP.04 · 2026.04.22
:::

::: intro
有些歌只在深夜成立。白天放，它就是背景噪音；凌晨三点放，它是整个房间。

这期节目，我想说的不多——让歌自己说。
:::

::: section-title B · BPM 60 stamp=B variant=ribbon-stamp
:::

## 为什么是 BPM 60

::: quote-card Brian Eno · *Music for Airports* sleeve · 1978
我做的不是背景音乐，是一种允许你不去听的东西——但它会一直在那里，等你回过头来。
:::

::: compare 白天 vs 深夜
::: pros 白天歌单
- BPM 90+，推你向前
- 多人混音，群体共鸣
- 旋律带钩，方便记忆
:::
::: cons 深夜歌单
- BPM 60-，与心跳同步
- 多为独奏 / 环境音
- 没有钩，留下气氛
:::
:::

::: steps 选曲方法 variant=split-row
### 01 测心率
确定听者夜间静息心率（多数 55–65）。

### 02 匹配 BPM
首曲 BPM 60 附近，后续逐渐 ±5。

### 03 留呼吸
每两曲之间留 8–12 秒静默。
:::

人在睡前心率下降到每分钟六十次左右。BPM 60 的音乐不是在"放松"你，是在和你的身体对齐。

Nils Frahm 的 *Says* 从 08:12 第一秒起就知道这件事。钢琴泛音落下来的速度，和呼吸周期咬合——不是巧合，是作曲家的刻意。

::: image-caption src="https://placehold.co/800x600/0e1a2b/d97a3c?text=vinyl+03%3A41" alt="黑胶唱片特写" FIG. · 03:41 · side-a opening
1972 年的旧黑胶，B 面还完整。落针那一刻的静电声，是这期节目最好的开场白。
:::

## 四首曲子的选择逻辑

### A 面：钢琴与电子的边界地带

*Says* 是 Nils Frahm 2013 年专辑 *Spaces* 里的现场录音。八分十二秒里，钢琴循环与合成器缓慢堆叠，像雾在室内升起。

*Music for Airports* 是 Brian Eno 1978 年为候机厅创作的环境音乐。他说：

> 「环境音乐必须同时适合主动聆听和被忽视。」
>
> —— *Brian Eno · 1978 · Ambient 1 liner notes*

十七分半，你可以进进出出，它始终在那里。

### B 面：自然声场的两种处理

在节目制作系统里，每次录音前我们会记录一次播放状态：`now_playing.status`。

```
// on air  03:41
now_playing = {
  artist: "Hiroshi Yoshimura",
  track:  "Organica · side-b",
  bpm:    52,
  key:    "D minor"
}
```

吉村弘（Hiroshi Yoshimura）的 *Organica* 来自他 1993 年的同名专辑，水声与合成器纹理交织，比 *Music for Plants* 更晚期，也更沉。Floating Points 的 *LesAlpx* 则走另一条路：jazz 底色，但织体像 ambient，弦乐渐入时有一种克制的尖锐感。

::: editor-note
凌晨三点录音和下午三点录音，说出来的话不一样。不是因为疲惫，是因为这个时段会让人诚实一些。这四首曲子都是我在某个无法入睡的夜晚里找到的，当时都没想着要放进节目。
:::

## 深夜音乐的听法

夜场和日场的区别，不在于音量，在于注意力分配的方式。

白天听音乐：音乐服务于任务。  
深夜听音乐：你服务于音乐。

关上屏幕，[告诉我你在哪首曲子里走神了](#)。

::: author-bio
**罗离线**　·　夜读电台主播

做过五年唱片店夜班，习惯在大家都睡着之后才开始播放。EP.01 起每周四 03:41 AM 准时上线，至今不晚点。喜欢旧黑胶、B 面、以及所有在安静里才能听见的细节。
:::

:::: timeline
::: timeline-item year="00:00"
开场白 + 落针静电声：今晚的四首曲子与选择理由
:::
::: timeline-item year="03:41"
A1 首播：Says · Nils Frahm（08:12）钢琴循环 fade in
:::
::: timeline-item year="14:20"
A2：Music for Airports · Brian Eno（17:35）环境音乐大段
:::
::: timeline-item year="35:00"
听众来信 + B 面开盘：Organica 与 LesAlpx 交替播出
:::
::::

::: qa-block q="主播，ambient 和 lo-fi 有什么区别？"
Lo-fi 是有节拍的，ambient 通常没有。Lo-fi 是陪你工作，ambient 是陪你消失一会儿。
:::

::: info cue
耳机优于音箱。这四首曲子都有需要靠近才能听见的细节。
:::

::: tip b-side
Khruangbin 的 *A Hymn* 是本期的隐藏曲目，不在歌单里，只在片尾静静出现。
:::

::: warning static
手机推送通知会打断 Eno 的结构性静默——那段沉默是音乐的一部分。
:::

::: danger off-air
Cigarettes After Sex 的专辑适合 EP.05，不适合今晚。今晚太密了。
:::

::: note 主播旁白
Ryuichi Sakamoto 曾说，他晚年最喜欢录下窗外的雨声，因为那是他听过最好的"作品"。今晚 B 面的最后三分钟，我放了一段录于深夜的静默。
:::

::: divider
:::

::: cta-bar like="♡ 喜欢" star="★ 收藏" share="↗ 分享"
:::

::: qr-follow desc="每周四 · 03:41 AM 准时上线" kicker="tune · in"
:::

::: recommend 深 夜 选 听
- [Floating Points · Elaenia 全碟深听](#)
- [Hiroshi Yoshimura · Music for Nine Post Cards](#)
:::

::: footnotes
※　本期 A 面配乐：Nils Frahm — *Says*（Erased Tapes Records · 2013）

※　本期 B 面：Hiroshi Yoshimura — *Organica*（Victor Entertainment · 1993）

※　片头静电音效取自 1976 年 SONY PS-4750 黑胶放映机
:::

---

::: colophon next="Khruangbin · 城市波普的 B 面结构" issue="EP.05 · 2026.04.29"
:::
