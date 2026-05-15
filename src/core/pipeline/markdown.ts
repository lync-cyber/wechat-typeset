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
import type { Theme, ThemeVariants } from '../themes/types'
import { CONTAINER_REGISTRY } from './containers'
import type { ContainerRenderContext } from './containers'
import { parseInfo } from './containers'
import { registerInlineExtensions } from './inline'
import { applyHeadingPrefixDecorations } from './headingDecorations'

/**
 * 容器渲染器在 open 时解析 info/attrs，close 是函数时也要能读取——
 * 用一个 per-render 的 stack：按 name 压入 open 时的 ctx，close 时弹出同名。
 * stack 存在 env 里，确保每次 md.render(...) 彼此隔离。
 *
 * `pageVariants`：L2 页面局部配置（frontmatter `variants:` 解析结果），由 pipeline 入口
 * 通过 env 透传到每个容器的 ctx；容器 renderer 不需要感知 frontmatter 解析细节。
 */
interface ContainerEnv {
  __wxContainerStacks?: Record<string, ContainerRenderContext[]>
  __wxPageVariants?: Partial<ThemeVariants>
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
            pageVariants: env.__wxPageVariants,
            kickers: theme.kickers,
            info: title,
            attrs,
          }
          pushCtx(env, name, ctx)
          return renderer.open(ctx)
        }
        const ctx = popCtx(env, name) ?? emptyCtx(theme, env.__wxPageVariants)
        return typeof renderer.close === 'function' ? renderer.close(ctx) : renderer.close
      },
    })
  }

  registerInlineExtensions(md)

  // h2Prefix SVG 属于 motif → assets 通路，与 decorations.headingPrefix 正交：
  //   motif 通路：theme.assets.h2Prefix 是静态 SVG 字符串，直接在 <h2> 后注入。
  //   decorations 通路：运行时编号 / 文本 kicker 走 decorations.headingPrefix 声明式（headingDecorations.ts）。
  // 为什么不用 CSS ::before：公众号后台剥离 ::before/::after；
  // 唯一稳妥的路径是在 DOM 里真实插入一个 inline-block 元素。
  const h2Prefix = theme.assets.h2Prefix ?? null
  if (h2Prefix) {
    md.renderer.rules.heading_open = (tokens, idx, opts, _env, self) => {
      const t = tokens[idx]
      if (t.tag === 'h2') return `<h2>${h2Prefix}`
      return self.renderToken(tokens, idx, opts)
    }
  }

  applyDropcap(md, theme)
  applyHeadingPrefixDecorations(md, theme)
  // 微信沙箱会剥 <input>，markdown-it-task-lists 注入的原生 checkbox 粘贴后丢失。
  // 这里把 `<input type="checkbox">` 替换为主题主色实心方块（已勾）/ 描边空方块（未勾）。
  applyTaskListSquares(md, theme)

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
 * inline 子 token 的最小结构（与 headingDecorations.ts 的 InlineChild 同型；
 * 为避免跨文件依赖一个内部辅助类型再声明一次）。
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


/**
 * intro 首段首字下沉（dropcap）
 *
 * 规范（people-story §1.2）：渲染器把 intro 首段首字符拆成
 *   `<span class="intro-dropcap">X</span>` + 余文，靠 inline-block 放大而非 float。
 * 跳过规则：
 *   - 跳过前导空白 / 中英文标点 / 开引号 / 各式括号
 *   - 若首个实字是阿拉伯数字 —— 不下沉（规范明言：数字下沉很丑）
 *   - 若找不到首段或首段无 inline text 子节点 —— 静默不动
 *
 * 主题作者可在 decorations.introDropcap 调字号 / 颜色（PaletteColorKey + 4 个数值字段）。
 */
function applyDropcap(md: MarkdownIt, theme: Theme): void {
  const dropcap = theme.decorations?.introDropcap
  if (!dropcap) return

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

// ============================================================
// task-list 红方块 ✓ 替换
//
// markdown-it-task-lists 把 `- [x] foo` 渲染为 html_inline <input type="checkbox" checked>
// + text "foo"。微信沙箱剥 <input>，预览与产物体感分裂；改写为主题主色方块。
// 12×12 inline-block：已勾用主色 background + ✓ 白字；未勾用 1px border 实线方框。
// 同时清空 markdown-it-task-lists 注入的 <label> 包裹标签（label 在公众号粘贴后无语义）。
// ============================================================

type TLChild = { type: string; content: string }

const CHECKBOX_INPUT_RE = /<input[^>]*\btask-list-item-checkbox\b[^>]*>/i
const CHECKBOX_CHECKED_RE = /\bchecked\b/i
const LABEL_TAG_RE = /^<\/?label\b/i

function applyTaskListSquares(md: MarkdownIt, theme: Theme): void {
  const c = theme.tokens.colors
  const filled =
    `<span class="wx-task-square wx-task-square--on" ` +
    `style="display:inline-block;width:12px;height:12px;` +
    `background-color:${c.primary};color:${c.textInverse};` +
    `text-align:center;line-height:12px;font-size:11px;font-weight:700;` +
    `vertical-align:-2px;margin-right:8px">✓</span>`
  const empty =
    `<span class="wx-task-square wx-task-square--off" ` +
    `style="display:inline-block;width:12px;height:12px;` +
    `border:1px solid ${c.text};` +
    `vertical-align:-2px;margin-right:8px">&nbsp;</span>`

  md.core.ruler.push('wx_tasklist_squares', (state) => {
    for (const tok of state.tokens) {
      if (tok.type !== 'inline' || !tok.children) continue
      const children = tok.children as unknown as TLChild[]
      for (const child of children) {
        if (child.type !== 'html_inline') continue
        if (CHECKBOX_INPUT_RE.test(child.content)) {
          child.content = CHECKBOX_CHECKED_RE.test(child.content) ? filled : empty
        } else if (LABEL_TAG_RE.test(child.content)) {
          child.content = ''
        }
      }
    }
  })
}

function emptyCtx(theme: Theme, pageVariants?: Partial<ThemeVariants>): ContainerRenderContext {
  return {
    tokens: theme.tokens,
    assets: theme.assets,
    containers: theme.containers,
    innerStyles: theme.innerStyles,
    inline: theme.inline,
    variants: theme.variants,
    pageVariants,
    kickers: theme.kickers,
    info: '',
    attrs: {},
  }
}
