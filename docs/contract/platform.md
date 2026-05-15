# 公众号平台现实与契约演进

[← 回 README](README.md)

本文档收录写作契约与公众号平台之间的"接缝处"——哪些限制源自平台、哪些是本工具帮你绕过、哪些是无法绕过只能告知，以及契约自身的演进规则。

---

## 责任划分（粘贴到公众号后塌版了，找谁）

| 症状 | 责任方 | 处理 |
| --- | --- | --- |
| 塌版 / 丢样（基础契约容器） | wechat-typeset 的 bug（`wxPatch` 层未覆盖的平台行为） | 开 [issue](https://github.com/lync-cyber/wechat-typeset/issues) |
| `::: free` 里手写 HTML 塌了 | 写作者退出契约 | 自行承担——`free` 之外不要手写 HTML |
| `voice-card` / `video-card` 占位卡未替换为真节点 | 公众号后台功能，契约外 | 粘贴后在公众号编辑器用"插入音频/视频"补真节点（mpvoice / mpvideo） |
| 原创声明、封面图、小程序卡片缺失 | 公众号后台功能，契约外 | 后台发文时手动配置 |
| 自定义扩展容器（fork 私有）塌了 | fork 维护方 | 自行修 wxPatch 或回退到 `::: free` |

---

## 硬约束（主题作者不能突破，写作者不会踩到）

主题通过 [`persona.data.ts`](../../src/themes/) 声明调色板、排版、装饰与 variant 选择。
以下约束由 `src/pipeline/rules.ts` / `src/themes/_shared/spec/validate.ts` 在构建期校验：

- 字号 ≥ 14、SVG `stroke-width` ≥ 1、`fill` 纯白 `#ffffff` 统一换 `#fefefe`
- 禁用 `position` / `float` / `font-family` / `@media` / `:hover` / `-webkit-*` / flex `gap`
- 禁止扩展 fence 词汇表——新视觉一律注册为 variant，不得新增容器名（自定义扩展走 [custom.md](custom.md)）
- 禁止在 `spec.elements` / `motifs` 之外写自定义 HTML

任意条破坏在构建期即 `ThemeAuthoringError`，不会进入运行时。这意味着写作者使用任意内置主题**都不会**踩到底层 CSS 雷区。

`juice` 内联化 + `wxPatch` 运行时剥离（粘贴前最后一关，不抛错、静默处理）：

- `class` / `id=` / `<style>` / `<script>` 全部剥离，样式全部走 `style=""` 行内
- SVG `url('#g')` → `url(#g)`（公众号会把引号当字面量）
- 纯白 `#ffffff` → `#fefefe`

---

## 外链的现实边界

公众号正文里 `<a href>` 的行为由平台决定，不由本工具：

- **可跳转的几类 URL**（白名单）：
  - `https://mp.weixin.qq.com/s/*` —— 同域历史文章
  - `weixin://dl/*` —— 小程序协议
  - `tel:*` / `mailto:*` —— 移动端系统协议
  - `#` 开头的页内锚点
- **普通站外 `https://` 链接**：公众号会把它渲染为灰色不可点文字，读者若仍坚持点，多半弹"已停止访问该网页"。**放在正文里等于骗点击。**

### footer-cta 的 href 属性

`::: footer-cta` 支持 `href=` 属性。渲染时：

- 有 `href` → 按钮胶囊渲染为 `<a>`，在预览 / 导出 HTML / 导出长图里**可点**；
- **白名单 URL**：在复制到公众号时**保持原样**（不受 Toolbar 外链策略影响，作者核心转化入口永远保真）；
- **非白名单 URL**：编辑器左侧显示 `footer-cta-outlink` 黄波浪线提示，**复制时仍保持原样**——作者明知有这一局限再发文。

### 推荐的转化路径

1. **阅读原文位**：公众号文章有且只有一个"阅读原文"入口，在后台发文时手填任意外链——这是最稳妥的站外跳转。
2. **二维码**：`::: qrcode` 与 `::: footer-cta` 组合使用——按钮做视觉引导，二维码做实际跳转。
3. **同域文章链**：走 `footer-cta` 的 `href=https://mp.weixin.qq.com/s/*`，公众号内互导。
4. **小程序卡片**：URL 合规但卡片渲染需在后台编辑器用"@小程序"原生插入，纯粘贴做不到；`footer-cta` 的 `weixin://dl/*` href 只是 URL 级合规，**不等于卡片**。

---

## 契约演进

字段变更走 [`dist/api/capabilities.json`](../../dist/api/capabilities.json) 的 `schemaVersion` + `deprecations[]`：

- **新增**容器 / 行内扩展 / variant：minor 版本推出，无需 deprecation。
- **改名**或**移除**：先在 `deprecations[]` 登记 old → new 映射，给下游（LLM 集成、第三方 CI）一个 minor 版本的感知窗口，再在下一个 major 版本里实际移除。
- **语义变更**（同名但行为不同）：视同移除 + 新增——旧 id 进 deprecation，新 id 用新名。
- **扩展包**：增减包内容器按上述规则走；新增整个 pack 不影响现有契约。

> 写自动化集成的人请定期拉取 [`dist/api/capabilities.json`](../../dist/api/capabilities.json)，机器可读全集 + 版本号在那里。

### 登记一个 deprecation（模板）

在 `scripts/build-capabilities.ts` 的 `deprecations: [...]` 里追加一条：

```ts
{
  id: 'oldFieldName',                        // 顶层字段名 / 路径
  sinceVersion: '3.1',                       // 何时标记 deprecated
  replacement: '改用 newFieldName',           // 下游迁移指引
  removalPlannedIn: '4.0',                   // 计划在哪个 major 移除
}
```

`tests/unit/capabilities.spec.ts` 在 CI 阶段守三件事：

1. `id / sinceVersion / replacement` 三字段必填
2. `sinceVersion` 满足 `主.次` 格式
3. 登记 deprecated 的 id 必须**仍在** `capabilities.json` 顶层（窗口期承诺：字段还在，只是建议替换；真正移除要等下一个 major）

schema 3.0 初始版 `deprecations[]` 为空——首次破坏 contract 时按上述模板登记。
