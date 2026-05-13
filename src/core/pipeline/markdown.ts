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
  if (theme.behavior?.introDropcap) {
    // 规范（people-story §1.2）：48px / 700 / accent / inline-block / line-height 1 /
    //   margin 0 8px 0 0 / padding-top 4px. 靠 inline-block 放大而非 float.
    const dropcapAccent = theme.tokens.colors.accent
    const dropcapStyle =
      `display:inline-block;font-size:48px;font-weight:700;` +
      `color:${dropcapAccent};line-height:1;margin:0 8px 0 0;` +
      `padding-top:4px;vertical-align:baseline`
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

  // stepBadge：theme.assets.stepBadge(n) 是扩展点；默认不自动注入，
  // 避免污染全局 <ol>。后续主题如需自动编号，可在此处加限定路径的 DOM pass。

  return md
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
  const parts: string[] = ['display:inline-block', `color:${color}`]
  if (style.fontFamily === 'monospace') parts.push('font-family:Menlo,Monaco,monospace')
  if (style.fontWeight) parts.push(`font-weight:${style.fontWeight}`)
  if (style.fontSize) parts.push(`font-size:${style.fontSize}px`)
  if (style.letterSpacing) parts.push(`letter-spacing:${style.letterSpacing}px`)
  parts.push(`margin-right:${style.marginRight ?? 8}px`)
  if (style.underline) {
    parts.push(`border-bottom:1px solid ${color}`)
    parts.push(`padding-bottom:${style.underlinePad ?? 2}px`)
  }
  return parts.join(';')
}

function formatAutoNumber(kind: 'roman' | 'arabic' | 'arabic-padded', n: number): string {
  if (kind === 'roman') return toRoman(n)
  if (kind === 'arabic-padded') return String(n).padStart(2, '0')
  return String(n)
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
    // per-render 计数器，按 level 分桶（autoNumber 共享同一计数器）
    const counters: Record<2 | 3, number> = { 2: 0, 3: 0 }

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i]
      if (tok.type !== 'heading_open') continue
      const level: 2 | 3 | null = tok.tag === 'h2' ? 2 : tok.tag === 'h3' ? 3 : null
      if (level === null) continue
      const applicable = decosByLevel.get(level)
      if (!applicable || applicable.length === 0) continue
      const inlineTok = tokens[i + 1]
      if (!inlineTok || inlineTok.type !== 'inline' || !inlineTok.children) continue

      counters[level]++

      // 按声明顺序依次应用每条 decoration；同 level 多条时累加注入（罕见但允许）
      // children 类型：markdown-it 的 Token[]；上面已断言非 null
      const children = inlineTok.children as InlineChild[]
      for (const d of applicable) {
        applyOneHeadingDecoration(d, children, counters[level], colors)
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
  index: number,
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
    const text = formatAutoNumber(d.autoNumber, index)
    const span = new Token('html_inline', '', 0)
    span.content = `<span class="heading-prefix heading-prefix--autonumber" style="${css}">${text}</span>`
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
    inline: theme.inline,
    variants: theme.variants,
    info: '',
    attrs: {},
  }
}
