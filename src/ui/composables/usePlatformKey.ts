/**
 * 平台键检测：返回 modKey（⌘ / Ctrl）+ 是否 Mac/iOS。
 *
 * 历史：曾在 App.vue / Toolbar.vue / OnboardingCard.vue 重复写
 *   `const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)`
 * 三处。`navigator.platform` 在 Chromium 已标记 deprecated（保留兼容）；
 * `navigator.userAgentData.platform` 是新 API，在 Chrome/Edge 上可用，
 * Safari/Firefox 暂未实现，回落到 `navigator.platform`。
 *
 * 不写成 reactive：平台在会话期不会变，常量足够。
 */

interface NavigatorUAData {
  platform?: string
}

function detectMac(): boolean {
  if (typeof navigator === 'undefined') return false
  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData
  if (uaData && typeof uaData.platform === 'string') {
    return /mac/i.test(uaData.platform)
  }
  // 旧 API 仍是 Safari / Firefox 唯一可用源；iPadOS 13+ 返回 'MacIntel' 也算 Mac
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform)
}

const isMac: boolean = detectMac()
export const modKey: string = isMac ? '⌘' : 'Ctrl'
