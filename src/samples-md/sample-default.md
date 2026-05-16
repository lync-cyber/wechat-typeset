# 工具的工具 · 关于写作辅助软件的克制观

::: intro
一个工具好不好用，往往不在它能做多少，而在它愿意 ==不做== 多少。排版工具应当像好的字体——存在感越低，越尊重内容。
:::

::: author 编辑部 role=主笔
长期写作，偶尔折腾工具。记录关于写、读、做的真心话。
:::

::: announcement
本文内容已同步更新，修订说明见文末。
:::

## 为什么默认主题应该克制

每多一个装饰，作者就少一分自由。这话听上去像句空话，但凡用过那种"主题切了一圈，文字反而没法看"的编辑器，都会立刻明白。

==真正成熟的工具==，是在你**不需要**的时候安静下来，在你**需要**的时候恰好就位。

::: quote-card 王小波
把复杂写简单，是一种对读者的尊重；把简单写复杂，是对自己的谄媚。
:::

### 三个克制原则

::: tip 色彩稀缺
全篇只一个主色（编辑蓝），accent 与 primary 合一。一篇文章里超过两个强色就开始打架。
:::

::: info 字重不滥用
正文 15px / h2 19px / h3 16px——三档已够，再细分就是装饰过载。
:::

::: warning 装饰不抢戏
分隔线只用单根色线，不上花纹；引号回退到 Unicode 字符，不导出额外 SVG。
:::

::: note 第五态补注
note 不抢色——这是中性补注：题外话、补遗、不构成警示但读者可能错过的旁注。和 tip / warning / info / danger 四态形成互补。
:::

::: divider
:::

## 当你确实需要色彩

也有些信息**必须**靠色彩区分。比如 ⌘ + K 这种键位提示、比如代码段、比如一个本周关键数字。

按 <kbd>Ctrl</kbd>（或 <kbd>⌘</kbd>） + <kbd>K</kbd> 把富文本复制到公众号后台——一个键位完成"写 → 排 → 发"。

```ts
import { renderPipeline } from './pipeline'
import { getTheme } from './themes'

const theme = getTheme('default')
const { html, wordCount } = renderPipeline({
  md: '# Hello wechat-typeset',
  theme,
})
```

### 何时取舍

:::: compare

::: pros 选择 default
- 任何题材都不抢戏
- 切到其他主题后整体结构平移
- 用色仅一根主色，阅读疲劳低
:::

::: cons 暂不适合
- 强视觉签名需求（看封面就要识别 IP）
- 重符号语言的栏目（terminal / mook 风）
- 需要醒目数据卡的简报家族
:::

::::

::: highlight
中立不是没有立场，是把舞台让给文字本身。
:::

::: divider
:::

## 实战流程

::: steps 三步出稿
### 写初稿
左侧编辑器粘 Markdown，先保证结构。

### 套主题
顶部下拉切换；右侧 375px 实时预览。

### 一键复制
Ctrl / ⌘ + K 复制富文本到公众号后台。
:::

::: image-caption src="https://placehold.co/600x400?text=workflow" alt="工作流" 图 1 · 三步出稿流程
左侧 Markdown 编辑、中间主题切换、右侧 375px 实时预览。
:::

::: divider
:::

## 文末

::: footer-cta 如果对你有启发 cta=关注我
每周一篇深度，愿意被细细读完。
:::

::: recommend 看完本文还可以
- 切到 `tech-geek` 主题看代码段在琥珀终端里的样子
- 切到 `literary-humanism` 主题看引言与按语如何被素雅化
- 切到 `data-brief` 主题看数据卡如何替你说话
:::

::: qrcode text="https://github.com/lync-cyber/wechat-typeset"
扫码访问项目首页
:::
