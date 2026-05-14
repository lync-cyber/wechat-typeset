/**
 * markdown-it 实例构造
 *
 * 启用插件：container / mark（==高亮==）/ ins / footnote / task-lists，
 * 再叠加两条自定义 inline rule（[.着重.] / [~波浪~]）。
 *
 * 容器：从 CONTAINER_REGISTRY 读取每个容器的 open/close 渲染器，
 * 绑到 markdown-it-container。open 调用时解析 info + attrs；
 * close 如果是函数，会复用同一组 ctx（info/attrs 由容器栈回退得到）。
 *
 * 嵌套容器（compare 包 pros/cons）依赖 fence 长度：外 `::::`、内 `:::`。
 */

import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItTaskLists from 'markdown-it-task-lists'

import { defaultTheme } from '../themes/default'
import { toRoman } from '../themes/_shared/svgLib'
import type { HeadingPrefixDecoration, Theme, ThemeTokens } from '../themes/types'
import { CONTAINER_REGISTRY } from './containers'
import type { ContainerRenderContext } from './containers'
import { parseInfo } from './containers'
import { registerInlineExtensions } from './inline'

/**
 * 容器渲染器在 open 时解析 info/attrs，close 是函数时也要能读取——
 * 用一个 per-render 的 stack：按 name 压入 open 时的 ctx，close 时弹出同名。
 * stack 存在 env 里，确保每次 md.render(...) 彼此隔离。
 */
interface ContainerEnv {
  __wxContainerStacks?: Record<string, ContainerRenderContext[]>
}

function pushCtx(env: ContainerEnv, name: string, ctx: ContainerRenderContext): void {
  env.__wxContainerStacks ??= {}
  env.__wxContainerStacks[name] ??= []
  env.__wxContainerStacks[name].push(ctx)
}

function popCtx(env: ContainerEnv, name: string): ContainerRenderContext | undefined {
  return env.__wxContainerStacks?.[name]?.pop()
}

export interface CreateMarkdownOptions {
  theme?: Theme
}

export function createMarkdown(options: CreateMarkdownOptions = {}): MarkdownIt {
  const theme = options.theme ?? defaultTheme

  const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
    typographer: false,
  })

  md.use(markdownItMark)
  md.use(markdownItIns)
  md.use(markdownItFootnote)
  md.use(markdownItTaskLists, { enabled: true, label: true })

  for (const [name, renderer] of Object.entries(CONTAINER_REGISTRY)) {
    ;(md as any).use(markdownItContainer, name, {
      validate(params: string): boolean {
        // params 为 `name rest...`，name 区分大小写
        return params.trim().split(/\s+/)[0] === name
      },
      render(
        tokens: Array<{ nesting: number; info: string }>,
        idx: number,
        _opts: unknown,
        env: ContainerEnv,
      ) {
        const token = tokens[idx]
        if (token.nesting === 1) {
          // 裁掉 name，剩余为 info；再拆 title + attrs
          const rest = token.info.trim().slice(name.length).trim()
          const { title, attrs } = parseInfo(rest)
          const ctx: ContainerRenderContext = {
            tokens: theme.tokens,
            assets: theme.assets,
            containers: theme.containers,
            innerStyles: theme.innerStyles,
            inline: theme.inline,
            variants: theme.variants,
            info: title,
            attrs,
          }
          pushCtx(env, name, ctx)
          return renderer.open(ctx)
        }
        const ctx = popCtx(env, name) ?? emptyCtx(theme)
        return typeof renderer.close === 'function' ? renderer.close(ctx) : renderer.close
      },
    })
  }

  registerInlineExtensions(md)

  // ---------- 标题装饰：h2Prefix SVG（motif 通路，与 decorations 正交） ---------- //
  // 为什么不用 CSS ::before：公众号后台剥离 ::before/::after；
  // 唯一稳妥的路径是在 DOM 里真实插入一个 inline-block 元素。
  //
  // h2Prefix（SVG 装饰）属于 motif → assets 通路：theme.assets.h2Prefix 提供的是
  // 静态 SVG 字符串，直接在 `<h2>` 后注入。运行时编号 / 文本 kicker 这类装饰已
  // 统一搬到 decorations.headingPrefix 走声明式（见下方 applyHeadingPrefixDecorations）。
  const h2Prefix = theme.assets.h2Prefix ?? null
  if (h2Prefix) {
    md.renderer.rules.heading_open = (tokens, idx, opts, _env, self) => {
      const t = tokens[idx]
      if (t.tag === 'h2') return `<h2>${h2Prefix}`
      return self.renderToken(tokens, idx, opts)
    }
  }

  // ---------- intro 首段首字下沉（dropcap） ---------- //
  // 规范（people-story §1.2）：渲染器把 intro 首段首字符拆成
  //   `<span class="intro-dropcap">X</span>` + 余文，靠 inline-block 放大而非 float。
  // 跳过规则：
  //   - 跳过前导空白 / 中英文标点 / 开引号 / 各式括号
  //   - 若首个实字是阿拉伯数字 —— 不下沉（规范明言：数字下沉很丑）
  //   - 若找不到首段或首段无 inline text 子节点 —— 静默不动
  //
  // R8：从 theme.behavior.introDropcap 升级为 theme.decorations.introDropcap,
  //   样式由 decoration 字段（color/fontSize/fontWeight/marginRight/paddingTop）构造,
  //   主题作者可调字号 / 颜色。`ThemeBehavior` 接口完全删除。
  const dropcap = theme.decorations?.introDropcap
  if (dropcap) {
    const dropcapColor = theme.tokens.colors[dropcap.color]
    const fontSize = dropcap.fontSize ?? 48
    const fontWeight = dropcap.fontWeight ?? 700
    const marginRight = dropcap.marginRight ?? 8
    const paddingTop = dropcap.paddingTop ?? 4
    const dropcapStyle =
      `display:inline-block;font-size:${fontSize}px;font-weight:${fontWeight};` +
      `color:${dropcapColor};line-height:1;margin:0 ${marginRight}px 0 0;` +
      `padding-top:${paddingTop}px;vertical-align:baseline`
    md.core.ruler.push('wx_intro_dropcap', (state) => {
      const tokens = state.tokens
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type !== 'container_intro_open') continue
        // 找到本 intro 块内第一个 paragraph_open
        let j = i + 1
        while (
          j < tokens.length &&
          tokens[j].type !== 'paragraph_open' &&
          tokens[j].type !== 'container_intro_close'
        ) {
          j++
        }
        if (j >= tokens.length || tokens[j].type === 'container_intro_close') continue
        const inlineTok = tokens[j + 1]
        if (!inlineTok || inlineTok.type !== 'inline' || !inlineTok.children) continue

        // 在 children 里找第一个 text 子节点
        const children = inlineTok.children
        let k = 0
        while (k < children.length && children[k].type !== 'text') k++
        if (k >= children.length) continue
        const txt = children[k].content
        if (!txt) continue

        // 跳过标点 / 空白 / 开引号 / 括号
        let p = 0
        while (
          p < txt.length &&
          /[\s"'‘’“”「『《〈(（[［{｛・·。，、；：？！"']/.test(txt[p])
        ) {
          p++
        }
        if (p >= txt.length) continue
        // 阿拉伯数字不下沉
        if (/[0-9]/.test(txt[p])) continue

        const firstChar = txt[p]
        const before = txt.slice(0, p)
        const after = txt.slice(p + 1)

        // 原 text 保留前导部分（如有）；新建 html_inline 承载 dropcap span；若余文非空再建一个 text
        const Token = children[k].constructor as typeof children[number]['constructor']
        const dropcapHtml = new (Token as unknown as {
          new (type: string, tag: string, nesting: number): typeof children[number]
        })('html_inline', '', 0)
        dropcapHtml.content = `<span class="intro-dropcap" style="${dropcapStyle}">${firstChar}</span>`

        const newSegments: Array<typeof children[number]> = [dropcapHtml]
        if (after) {
          const afterTok = new (Token as unknown as {
            new (type: string, tag: string, nesting: number): typeof children[number]
          })('text', '', 0)
          afterTok.content = after
          newSegments.push(afterTok)
        }

        if (before) {
          children[k].content = before
          children.splice(k + 1, 0, ...newSegments)
        } else {
          children.splice(k, 1, ...newSegments)
        }
      }
    })
  }

  // ---------- 标题前缀装饰（声明式） ---------- //
  // 把 theme.decorations.headingPrefix 的声明数据投影为 inline 修改：
  //   - autoNumber → 按出现顺序前置编号 span（罗马 / 阿拉伯 / 零填充）
  //   - pattern   → 按正则切前缀，把捕获组 1 包成装饰 span
  // 实现走 core.ruler 改 inline children（与 introDropcap 同路径），与
  // h2Prefix SVG 装饰互不冲突——前者改 `<h2>` 标签内文本流，后者注入紧贴 `<h2>` 后的 SVG。
  applyHeadingPrefixDecorations(md, theme)

  // ---------- footnotes 条目切分：把 `[N] …` 行切成独立 <p> ---------- //
  // 报刊脚注的排印基线是「一条一行 + hanging indent」（baseContainers.footnotes
  // 已声明 padding-left:1.6em / text-indent:-1.6em）。但 hanging indent 是
  // **块级**属性——只对每个 `<p>` 的第一行生效。
  //
  // 作者写法（与 11-data-brief.html:514-515 设计稿一致）：
  //     ::: footnotes
  //     [1]　数据覆盖 2010–2025…
  //     [2]　"深度理解得分"取自…
  //     :::
  //
  // markdown-it 在 breaks:false 下把两行合成单个 paragraph + 一个 softbreak。
  // hanging indent 只在「整段」的第一行落地，[2] 之后没有悬挂效果——视觉退化为
  // 流水段落。修复：扫描 container_footnotes_open/close 之间的 inline 子 token，
  // 在「softbreak + 紧跟 `[\d+]` 起始的 text」处切段，让每条 `[N]…` 成为独立
  // paragraph，hanging indent 自然按条目复用。
  //
  // 规则只对 `[\d+]` 模式触发，editorial-mook 类 `※ …` 单行脚注不会被误切。
  applyFootnotesEntrySplit(md)

  // stepBadge：theme.assets.stepBadge(n) 是扩展点；默认不自动注入，
  // 避免污染全局 <ol>。后续主题如需自动编号，可在此处加限定路径的 DOM pass。

  return md
}

// ============================================================
// footnotes 条目切分：把 `[N] 正文` 软换行序列切成独立 paragraph
//
// 设计纪律：本函数与 dropcap / heading-prefix 同源——都是「声明式排版语义 →
// markdown-it core.ruler 在 token 层落地」的小型 pass。它**只看** token 类型
// （`container_footnotes_open/close` + paragraph triplet + 子 token 类型），
// 不耦合任何主题；任何启用 `::: footnotes` 的主题都自然受益。
//
// 不做的事：
//   - 不改 inline token 的 content 缓存——content 是 markdown-it 内部 hot path
//     的回退路径，渲染器实际读 children；保留与原段落一致的 content 即可。
//   - 不处理 `[\d+]` 之外的编号模式（罗马 / ⓪①）——若未来扩展先升级正则，不要
//     把判断散到调用方。
// ============================================================

const FOOTNOTE_ENTRY_RE = /^\[\d+\][\s　]+/

/**
 * inline 子 token 的最小结构（与 InlineChild 同型；为避免循环依赖再声明一次）。
 */
type FtChild = { type: string; content: string; constructor: unknown }

function applyFootnotesEntrySplit(md: MarkdownIt): void {
  md.core.ruler.push('wx_footnotes_entry_split', (state) => {
    const tokens = state.tokens
    if (tokens.length === 0) return
    type TokenCtor = new (type: string, tag: string, nesting: number) => typeof tokens[number]
    const Token = tokens[0].constructor as TokenCtor

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'container_footnotes_open') continue

      // 找配对的 close（footnotes 不嵌套，但用 depth 防御写法变更）
      let depth = 1
      let j = i + 1
      while (j < tokens.length) {
        if (tokens[j].type === 'container_footnotes_open') depth++
        else if (tokens[j].type === 'container_footnotes_close') {
          depth--
          if (depth === 0) break
        }
        j++
      }
      if (j >= tokens.length) continue

      // 扫 [i+1, j-1] 之间每个 paragraph 三元组,尝试切分
      const next: typeof tokens = []
      let k = i + 1
      while (k < j) {
        const pOpen = tokens[k]
        const inl = tokens[k + 1]
        const pClose = tokens[k + 2]
        if (
          pOpen?.type === 'paragraph_open' &&
          inl?.type === 'inline' &&
          pClose?.type === 'paragraph_close'
        ) {
          const groups = splitFootnoteChildren((inl.children ?? []) as FtChild[])
          if (groups.length <= 1) {
            next.push(pOpen, inl, pClose)
          } else {
            for (const g of groups) {
              const np = new Token('paragraph_open', 'p', 1)
              const ni = new Token('inline', '', 0)
              ni.children = g as unknown as typeof inl.children
              ni.content = g
                .filter((c) => c.type === 'text')
                .map((c) => c.content)
                .join('')
              const nc = new Token('paragraph_close', 'p', -1)
              next.push(np, ni, nc)
            }
          }
          k += 3
        } else {
          next.push(pOpen)
          k++
        }
      }
      tokens.splice(i + 1, j - i - 1, ...next)
      // i 当前位置仍是 container_footnotes_open；外层 for 的 i++ 会前进进入
      // 我们新插入的 paragraph_open 段——它们 type 不等于 container_footnotes_open，
      // 不会触发重复处理。container_footnotes_close 现在在 i + next.length + 1。
    }
  })
}

/**
 * 按「softbreak/hardbreak + 紧跟 `[N] ` 起始的 text」切分 inline children。
 *   - 第一个子串保留前导内容（可能没有 `[N]` 前缀，比如 `※ 引用` 类——这种情况
 *     会得到一个组，调用方依据 groups.length<=1 跳过切分，等价于不动）
 *   - 切分点的 break token 被丢弃（已经物理分段，软换行视觉冗余）
 */
function splitFootnoteChildren(children: FtChild[]): FtChild[][] {
  if (children.length === 0) return []
  const groups: FtChild[][] = []
  let current: FtChild[] = []
  for (let idx = 0; idx < children.length; idx++) {
    const ch = children[idx]
    if (ch.type === 'softbreak' || ch.type === 'hardbreak') {
      const nx = children[idx + 1]
      if (nx && nx.type === 'text' && FOOTNOTE_ENTRY_RE.test(nx.content)) {
        if (current.length > 0) groups.push(current)
        current = []
        continue
      }
    }
    current.push(ch)
  }
  if (current.length > 0) groups.push(current)
  return groups
}

// ============================================================
// 标题前缀装饰：theme.decorations.headingPrefix 的统一实现
//
// 设计纪律：本函数是"声明式 → 渲染"的唯一投影。新增任何标题前缀类视觉签名都应
// 通过 PersonaSpec.decorations.headingPrefix 声明，不应在本函数之外添加 if 分支。
// 如果一个主题想要无法用此结构表达的视觉，先评估能否扩展 HeadingPrefixDecoration
// 的字段（如新增 underline / fontFamily 这类选项），保证共享层只动一处。
// ============================================================

/** PaletteColorKey → 实际 hex（运行时查 theme.tokens.colors） */
function resolveColor(key: HeadingPrefixDecoration['style']['color'], colors: ThemeTokens['colors']): string {
  return colors[key]
}

function decorationCss(style: HeadingPrefixDecoration['style'], colors: ThemeTokens['colors']): string {
  const color = resolveColor(style.color, colors)
  // display='block' → kicker 自成一行,marginBottom 提供与下方标题文字的垂直间距；
  // display='inline'(默认) → 与现状一致,marginRight 控制横向间距。
  const isBlock = style.display === 'block'
  const parts: string[] = [`display:${isBlock ? 'block' : 'inline-block'}`, `color:${color}`]
  if (style.fontFamily === 'monospace') parts.push('font-family:Menlo,Monaco,monospace')
  if (style.fontWeight) parts.push(`font-weight:${style.fontWeight}`)
  if (style.fontSize) parts.push(`font-size:${style.fontSize}px`)
  if (style.letterSpacing) parts.push(`letter-spacing:${style.letterSpacing}px`)
  if (isBlock) {
    parts.push(`margin-bottom:${style.marginBottom ?? 6}px`)
  } else {
    parts.push(`margin-right:${style.marginRight ?? 8}px`)
  }
  if (style.underline) {
    parts.push(`border-bottom:1px solid ${color}`)
    parts.push(`padding-bottom:${style.underlinePad ?? 2}px`)
  }
  return parts.join(';')
}

/** autoNumber 计数器：一次 render 内累加，按 level 分桶；h3InH2 在每个新 h2 处归零。 */
interface HeadingCounters {
  h2: number
  h3: number
  h3InH2: number
}

type AutoNumberKind = NonNullable<HeadingPrefixDecoration['autoNumber']>

/**
 * Unicode 圆圈数字 1–20。>20 退化为 `(N)` 字符串，避免主题作者意外触发缺字 tofu。
 * 来源：U+2776–U+277F（黑圈反白 1–10）+ U+24EB–U+24F4（黑圈反白 11–20）。
 *
 * 为什么不用 U+2460–U+2473（白圈黑字 ①②③）：mook / POPEYE 设计稿用的是实心圆背景版本
 * （❶❷❸），与"米卡纸底 + 朱橙 accent"的视觉签名一致；白圈版在暖底上对比不足。
 */
const CIRCLED_NUMERALS: readonly string[] = [
  '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿',
  '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴',
]

/** 中文小写数字 1–20。>20 退化为阿拉伯数字。用于 suffix `{cn}` 占位符。 */
const CHINESE_NUMERALS: readonly string[] = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
]

function formatAutoNumber(
  kind: AutoNumberKind,
  counters: HeadingCounters,
  level: 2 | 3,
): string {
  // 复合编号 `${h2}.${h3InH2}` —— 设计上只对 level 3 有意义；level 2 调用时
  // h3InH2 还停留在上一段（或 0），输出会怪——主题作者请把复合格式留给 level 3。
  if (kind === 'arabic-section') {
    return `${counters.h2}.${counters.h3InH2}`
  }
  if (kind === 'arabic-section-padded') {
    return `${String(counters.h2).padStart(2, '0')}.${counters.h3InH2}`
  }
  const n = level === 2 ? counters.h2 : counters.h3
  if (kind === 'roman') return toRoman(n)
  if (kind === 'arabic-padded') return String(n).padStart(2, '0')
  if (kind === 'circled') return CIRCLED_NUMERALS[n - 1] ?? `(${n})`
  return String(n)
}

/**
 * suffix 占位符替换：`{n}` → autoNumber 输出本身，`{cn}` → 中文数字。
 * 占位符未匹配时原样保留；未来扩占位符（如 `{N}` 大写罗马）只需在此追加分支。
 */
function substituteSuffix(suffix: string, formattedN: string, rawIndex: number): string {
  return suffix
    .replace(/\{cn\}/g, CHINESE_NUMERALS[rawIndex - 1] ?? String(rawIndex))
    .replace(/\{n\}/g, formattedN)
}

function applyHeadingPrefixDecorations(md: MarkdownIt, theme: Theme): void {
  const decos = theme.decorations?.headingPrefix
  if (!decos || decos.length === 0) return

  // 按 level 分组，便于扫描时 O(1) 取出适用规则
  const decosByLevel = new Map<2 | 3, HeadingPrefixDecoration[]>()
  for (const d of decos) {
    const list = decosByLevel.get(d.level) ?? []
    list.push(d)
    decosByLevel.set(d.level, list)
  }

  const colors = theme.tokens.colors

  md.core.ruler.push('wx_heading_prefix_decorations', (state) => {
    const tokens = state.tokens
    // per-render 计数器：h2/h3 各自一份 level-local 计数；h3InH2 是"当前 h2 段内
    // 的 h3 序号"，遇到新 h2 时归零——用于复合编号 `${h2}.${h3InH2}`。
    // 不论 decoration 是否声明 autoNumber，计数器都按 heading 出现顺序自然递增；
    // 没声明 autoNumber 的 level 不会读到这些数，所以多算也不耗费什么。
    const counters: HeadingCounters = { h2: 0, h3: 0, h3InH2: 0 }

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i]
      if (tok.type !== 'heading_open') continue
      const level: 2 | 3 | null = tok.tag === 'h2' ? 2 : tok.tag === 'h3' ? 3 : null
      if (level === null) continue

      if (level === 2) {
        counters.h2++
        counters.h3InH2 = 0
      } else {
        counters.h3++
        counters.h3InH2++
      }

      const applicable = decosByLevel.get(level)
      if (!applicable || applicable.length === 0) continue
      const inlineTok = tokens[i + 1]
      if (!inlineTok || inlineTok.type !== 'inline' || !inlineTok.children) continue

      // 按声明顺序依次应用每条 decoration；同 level 多条时累加注入（罕见但允许）
      // children 类型：markdown-it 的 Token[]；上面已断言非 null
      const children = inlineTok.children as InlineChild[]
      for (const d of applicable) {
        applyOneHeadingDecoration(d, children, counters, level, colors)
      }
    }
  })
}

/**
 * inline 子 token 的最小结构（避免引入 markdown-it 的内部类型）。
 * markdown-it 的 Token 类的实例满足此接口。
 */
type InlineChild = { type: string; content: string; constructor: unknown }

/**
 * 对一条 decoration 把变换写回 inline children 数组。
 * 两种模式互斥：autoNumber 直接前置；pattern 仅在 children[0] 是 text 且匹配时切。
 */
function applyOneHeadingDecoration(
  d: HeadingPrefixDecoration,
  children: InlineChild[],
  counters: HeadingCounters,
  level: 2 | 3,
  colors: ThemeTokens['colors'],
): void {
  const css = decorationCss(d.style, colors)

  // 反射出 Token 类（markdown-it 所有 token 实例共享同一构造器）。
  // children 空时 markdown-it 不会产出 heading inline——防御性跳过。
  if (children.length === 0) return
  type TokenCtor = new (type: string, tag: string, nesting: number) => InlineChild
  const Token = children[0].constructor as TokenCtor

  if (d.autoNumber) {
    // autoNumber 不消费文本，直接在最前面插一个 html_inline
    const text = formatAutoNumber(d.autoNumber, counters, level)
    // suffix 取本级 raw 计数（h2 用 h2 计数,h3 用 h3 计数）做 {cn} 等占位替换。
    // 这里 rawIndex 与 formatAutoNumber 内部读的 n 同源（除复合编号外）；
    // 复合编号场景下 suffix `{cn}` 退化为本级 raw 计数,语义清晰。
    const rawIndex = level === 2 ? counters.h2 : counters.h3
    const suffix = d.style.suffix ? substituteSuffix(d.style.suffix, text, rawIndex) : ''
    const span = new Token('html_inline', '', 0)
    span.content = `<span class="heading-prefix heading-prefix--autonumber" style="${css}">${text}${suffix}</span>`
    children.splice(0, 0, span)
    return
  }

  if (d.pattern) {
    const first = children[0]
    if (first.type !== 'text' || !first.content) return
    let re: RegExp
    try {
      re = new RegExp(d.pattern)
    } catch {
      // pattern 非法时静默跳过——校验由 validateSpec 兜底
      return
    }
    const m = re.exec(first.content)
    if (!m || !m[1]) return
    const captured = m[1]
    const consumed = m[0].length
    const rest = first.content.slice(consumed)
    const span = new Token('html_inline', '', 0)
    span.content = `<span class="heading-prefix heading-prefix--pattern" style="${css}">${captured}</span>`
    if (rest) {
      first.content = rest
      children.splice(0, 0, span)
    } else {
      children.splice(0, 1, span)
    }
  }
}

function emptyCtx(theme: Theme): ContainerRenderContext {
  return {
    tokens: theme.tokens,
    assets: theme.assets,
    containers: theme.containers,
    innerStyles: theme.innerStyles,
    inline: theme.inline,
    variants: theme.variants,
    info: '',
    attrs: {},
  }
}
