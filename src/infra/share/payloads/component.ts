/**
 * Component 分享 payload —— 把"我的组件"一条 entry 编入 URL hash。
 *
 * 线路格式：
 *   `#share-component={base64url(JSON({ v: 1, kind: 'component', component: {…} }))}`
 *
 * 为什么独立 prefix 而不复用 `share=`：
 *   article 与 component 是完全不同的应用语用（一篇文章 vs 一个组件预设），落地动作
 *   也不同（载入草稿 vs 询问导入到"我的组件"）。前缀分流避免 dispatcher 误把组件
 *   当文章解码——validate 侧虽然能拦下来，但前缀分流更早失败，错误信息也更精确。
 *
 * 组件字段子集：刻意只复制 UserComponent 的"展示+落地"字段，不带 source / createdAt
 *   / sourceMarkdown 这些 receiver 侧应当自己生成的字段。receiver 通过 mutations
 *   层走 validateSnippet + 配额检查，把外来组件视作不受信任的输入。
 *
 * 当前状态：codec 已就绪；UI 入口（导出 / 导入分享链接按钮）将在下一轮接入。
 */

import { type ShareCodec } from '../codec'
import { isRecord } from '../_utils'

const COMPONENT_VERSION = 1
const COMPONENT_PREFIX = 'share-component='

/**
 * 与 domain/components-lib/types 中 UserComponent 形状对齐，但**故意只取 receiver
 * 落地需要的字段**——createdAt / source / sourceMarkdown 不进线路。
 */
export interface ComponentSnapshot {
  /** 建议 id；receiver 端冲突时由 mutations 重新生成 */
  id: string
  name: string
  description: string
  /** ComponentKind = VariantKind | 'none'；用 string 是为避免 share 层依赖 domain 类型 */
  kind: string
  variantId?: string
  markdownSnippet: string
  thumbnailSvg: string
}

export interface SharePayloadComponent {
  v: 1
  kind: 'component'
  component: ComponentSnapshot
}

function validateSnapshot(raw: unknown): ComponentSnapshot | null {
  if (!isRecord(raw)) return null
  if (typeof raw.id !== 'string') return null
  if (typeof raw.name !== 'string') return null
  if (typeof raw.description !== 'string') return null
  if (typeof raw.kind !== 'string') return null
  if (typeof raw.markdownSnippet !== 'string') return null
  if (typeof raw.thumbnailSvg !== 'string') return null
  if (raw.variantId !== undefined && typeof raw.variantId !== 'string') return null
  // 显式重建：丢掉非契约字段（外部塞 prototype 污染字段或私有元数据时都被剥）
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    kind: raw.kind,
    variantId: typeof raw.variantId === 'string' ? raw.variantId : undefined,
    markdownSnippet: raw.markdownSnippet,
    thumbnailSvg: raw.thumbnailSvg,
  }
}

export const componentCodec: ShareCodec<SharePayloadComponent> = {
  prefix: COMPONENT_PREFIX,
  validate(raw: unknown): SharePayloadComponent | null {
    if (!isRecord(raw)) return null
    if (raw.v !== COMPONENT_VERSION) return null
    if (raw.kind !== 'component') return null
    const snapshot = validateSnapshot(raw.component)
    if (!snapshot) return null
    return { v: COMPONENT_VERSION, kind: 'component', component: snapshot }
  },
}

/**
 * 把任意 ComponentSnapshot-形状的对象包成线路 payload，**显式重建字段**——
 * 调用方常会传 UserComponent（含 createdAt / source 等非契约字段）；显式重建
 * 让编码 JSON 只携带契约里声明的 7 个字段，不会意外把 sourceMarkdown 之类的
 * 敏感 / 大字段带进 URL。
 *
 * receiver 端拿到后建议走 mutations.createComponent 路径，让 validateSnippet 与
 * 配额检查同样作用——线路 validate 只保证形状，不保证内容（如 SVG 大小、变量名合法）。
 */
export function wrapComponentSnapshot(snapshot: ComponentSnapshot): SharePayloadComponent {
  return {
    v: COMPONENT_VERSION,
    kind: 'component',
    component: {
      id: snapshot.id,
      name: snapshot.name,
      description: snapshot.description,
      kind: snapshot.kind,
      variantId: snapshot.variantId,
      markdownSnippet: snapshot.markdownSnippet,
      thumbnailSvg: snapshot.thumbnailSvg,
    },
  }
}
