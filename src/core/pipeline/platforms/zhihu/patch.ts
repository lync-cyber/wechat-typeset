/**
 * 知乎平台 patch 占位
 *
 * 当前状态：identity（不修改 HTML）。
 *
 * 知乎专栏的粘贴行为与公众号差异较大，主要风险点：
 *   - <section> 容器：知乎会保留但样式会被覆盖，需要决定外框策略
 *   - <iframe>：知乎仅允许极少数白名单源（与微信不同）
 *   - 图片：粘贴外链图通常会被知乎自动上传到自家 CDN，可保留原 src
 *   - <style>：与微信一致，必须丢
 *
 * 实现方式：参考 wechat/patch.ts 链式组合若干纯函数 html → html。
 * 各 patch 自带幂等性，inspect 可选；先实现 patch，UI 再开 select。
 */

export interface ZhihuPatchOptions {
  /** 占位字段，待具体 patch 实现时再细化 */
  _reserved?: never
}

export function applyZhihuPatches(html: string, _opts: ZhihuPatchOptions = {}): string {
  return html
}
