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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import markdownItContainer from 'markdown-it-container'
import markdownItMark from 'markdown-it-mark'
import markdownItIns from 'markdown-it-ins'
import markdownItFootnote from 'markdown-it-footnote'
import markdownItTaskLists from 'markdown-it-task-lists'

import { defaultTheme } from '../themes/default'
import { toRoman } from '../themes/_shared/svgLib'
import type { Theme } from '../themes/types'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // ---------- h2 标题装饰：Roman 自动编号 > h2Prefix SVG > 默认 ---------- //
  // 为什么不用 CSS ::before：公众号后台剥离 ::before/::after；
  // 唯一稳妥的路径是在 DOM 里真实插入一个 inline-block 元素。
  //
  // 行为优先级：
  //   1. 若 theme.behavior.h2RomanNumerals：渲染器按 h2 顺序注入罗马数字 span
  //      （使用 env.__h2Counter 作 per-render 计数器）—— people-story 签名动作
  //   2. 否则若 theme.assets.h2Prefix：注入主题装饰 SVG（其它主题默认路径）
  //   3. 否则交给 markdown-it 默认渲染
  const wantsRoman = theme.behavior?.h2RomanNumerals === true
  const h2Prefix = theme.assets.h2Prefix ?? null
  if (wantsRoman || h2Prefix) {
    md.renderer.rules.heading_open = (tokens, idx, opts, env, self) => {
      const t = tokens[idx]
      if (t.tag === 'h2') {
        if (wantsRoman) {
          const ev = env as ContainerEnv & { __h2Counter?: number }
          ev.__h2Counter = (ev.__h2Counter ?? 0) + 1
          const roman = toRoman(ev.__h2Counter)
          const accent = theme.tokens.colors.accent
          // 规范 §1.3 ③（people-story）：铁锈色罗马数字 + 下方短下划线
          //   16px / 700 / 2px 字距 / margin-right 10px / border-bottom 1px accent
          return (
            `<h2><span class="h2-roman" style="` +
            `color:${accent};font-weight:700;font-size:16px;letter-spacing:2px;` +
            `margin-right:10px;border-bottom:1px solid ${accent};padding-bottom:2px` +
            `">${roman}</span>`
          )
        }
        if (h2Prefix) return `<h2>${h2Prefix}`
      }
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

  // stepBadge：theme.assets.stepBadge(n) 是扩展点；默认不自动注入，
  // 避免污染全局 <ol>。后续主题如需自动编号，可在此处加限定路径的 DOM pass。

  return md
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
