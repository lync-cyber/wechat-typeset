# WxPatch 行为详解（独家 reference）

> WxPatch 是渲染管线的最后一关，把 juice 内联后的 HTML 改写成"公众号粘贴稳态"。
> 权威源：`src/core/pipeline/wxPatch.ts` + `src/core/pipeline/rules.ts`。

WxPatch 由 8 个步骤组成，**幂等**——同一段 HTML 跑两次结果不变。

## 8 步详细行为

### 1. `patchListWrap`

```
<ul>...</ul>   → <section data-wx-list-wrap><ul>...</ul></section>
<ol>...</ol>   → <section data-wx-list-wrap><ol>...</ol></section>
```

**为什么**：公众号编辑器吞 `<ul>` / `<ol>` 的外边距，但保 `<section>` 的；外包一层 section 把外边距钉住。

**副作用**：增加约 30 字节/列表。无视觉副作用。

### 2. `stripForbiddenAttrs`

删 inline style 中以下属性：

- `position: absolute / fixed / sticky / relative` （部分客户端错位）
- `float: left / right`（行内 clear 丢失）
- 所有 `id=""` 属性（粘贴后被平台剥离，留着无用）

**输入**：
```html
<div style="position: absolute; color: red;" id="abc">...</div>
```

**输出**：
```html
<div style="color: red;">...</div>
```

### 3. `stripForbiddenTags`

删除以下 tag（递归）：

- `<style>` （所有 CSS 必须 juice 内联，留着会被微信吞）
- `<script>`
- `<noscript>`
- `<link>`
- `<meta>`
- 非白名单 `<iframe>`（白名单：`src` 以 `https://v.qq.com/txp/iframe/player.html` 开头的腾讯视频）

### 4. `stripFontFamily`

剥所有 inline style 中的 `font-family` 声明：

```html
<p style="font-family: 'PingFang SC'; color: #333;">  →  <p style="color: #333;">
```

**为什么**：微信客户端用系统字体覆盖所有声明，留着只让 juice 计算冗余、增加 HTML 体积。

**例外**：SVG 内部 `<text font-family="serif">` **保留**（SVG 内部字体不受平台覆盖）。

### 5. `patchSvgUrlQuotes`

SVG 子树内的 `url("x")` → `url(x)`：

```svg
<defs><linearGradient id="g" /></defs>
<rect fill='url("#g")' />     →  <rect fill='url(#g)' />
```

**为什么**：某些客户端把 `"` 当字面量解析，导致渐变 / 滤镜引用失败。

### 6. `patchSvgIds`

SVG 子树内删所有 `id` 属性：

```svg
<defs><linearGradient id="g" /></defs>   →  <defs><linearGradient /></defs>
```

**为什么**：避免多份同名 SVG 粘贴后 id 冲突。

**副作用**：依赖 id 的 `url(#g)` 引用失效。**这是与 5 矛盾的——为什么共存？**

答：`patchSvgIds` 已经把 `id` 删了，所以 `url(#g)` 引用对象已不存在；本步骤需要在主题生成 SVG 时**避免使用 defs 引用**（用 inline fill 替代）。当前 9 套主题都不用 SVG defs 引用，所以两个 patch 不冲突。

### 7. `patchFlexToFallback`

```html
<div style="display: flex;">  →  <div style="display: block;">
```

**为什么**：微信 Android 客户端不支持 `gap` 属性；多数用 flex 的场景在 fallback 到 block 后视觉差异可接受。

**例外**：带 `data-wx-keep-flex` 属性的元素**保留** flex——少数容器（如 `key-number` 内的数字 + 标签布局）确实需要 flex，渲染器在生成时主动加这个属性。

### 8. `patchSvgWhiteBg`（默认启用）

SVG 内 `fill="#ffffff"` / `fill="#fff"` 全部替换为 `fill="#fefefe"`：

```svg
<rect fill="#ffffff" />   →  <rect fill="#fefefe" />
<rect fill="#fff" />      →  <rect fill="#fefefe" />
<text fill="#ffffff" />   →  <text fill="#fefefe" />
```

**为什么**：微信客户端的 SVG 光栅化器会把 `#fff` fill 当作透明处理，渲染后看上去是"透出底色"，不是"白色"。

**可关闭**：`render({ wxPatch: { svgWhiteBg: false } })`——浏览器本地预览时如果想看纯白对比可关。

## 调试 WxPatch

### 看某段 HTML 走 WxPatch 前后差异

仓库根 `scripts/wechat-typeset-cli.ts` 输出的是**已经走过 WxPatch 的最终 HTML**。要看 WxPatch 前的 HTML：

```ts
// 临时改 src/public/index.ts 的 render() 实现，把 pipelineRender 拆开调，
// 在 wxPatch 前 console.log——这是 debug 路径，不要 PR。
```

### 验证某个 patch 是否生效

写一段触发该 patch 的 markdown，跑 `render-html.ts` 看输出 HTML grep 关键字：

| Patch | 触发 markdown | grep |
| --- | --- | --- |
| stripFontFamily | 任意（主题都不写 font-family 但 juice 可能引入） | HTML 内不应出现 `font-family:` |
| patchSvgWhiteBg | 任何带 SVG 的主题（h2Prefix） | HTML 内不应出现 `fill="#fff"` 或 `fill="#ffffff"`（SVG 内） |
| patchListWrap | `- item 1` / `1. item 1` | HTML 内 `<ul>` / `<ol>` 应被 `<section data-wx-list-wrap>` 包 |
| patchFlexToFallback | `::: key-number value=87% 留存率` | HTML 内 `key-number` 容器不应有 `display:flex`（除非带 `data-wx-keep-flex`） |

## 不要在 WxPatch 之外做的事

- **不要手改 output.html**——绕过 WxPatch 等于退出契约保护
- **不要在 `::: free` 内手写 `<style>` `<script>`**——这是 free 退出契约的边界
- **不要试图让 WxPatch 处理你的私有容器**——WxPatch 是通用规则，私有扩展需要 fork 时自己加 patch 路径
