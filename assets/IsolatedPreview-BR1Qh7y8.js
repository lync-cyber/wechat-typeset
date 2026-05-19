import{h as _,q as g,y as w,r as d,e as m,b,v as x,d as k,s as h,t as L,_ as M}from"./index-BE9jUhAl.js";import"./codemirror-o3ugzYrd.js";import"./themes-BM1nhHlk.js";import"./markdown-CXq-4r5b.js";import"./juice-D0R5JQLj.js";const V={class:"iso-shell"},E={key:0,class:"iso-error",role:"alert"},C=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=300, initial-scale=1">
<style>
  html, body {
    margin: 0; padding: 0;
    background: #ececec;
  }
  body {
    display: flex; justify-content: center;
    min-height: 100vh;
  }
  .phone-viewport {
    width: 300px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  }
</style>
</head>
<body>
<div class="phone-viewport"></div>
</body>
</html>`,H=_({__name:"IsolatedPreview",props:{placeholderMd:{},theme:{},userVariants:{}},emits:["patch-log"],setup(u,{emit:p}){const t=u,f=p,s=h(null),r=h("");let l=!1,o="";function v(){if(!t.placeholderMd.trim())return null;try{const e=L({md:t.placeholderMd,theme:t.theme,userVariants:t.userVariants});return r.value="",f("patch-log",e.patchLog??null),e.html}catch(e){return r.value=e instanceof Error?e.message:String(e),null}}function i(e){const n=s.value?.contentDocument;if(!n)return;const c=n.querySelector(".phone-viewport");c&&(c.innerHTML=e)}function a(){const e=v();e!==null&&(o=e,l&&i(e))}function y(){l=!0,o?i(o):a()}return g(()=>{a()}),w(()=>[t.placeholderMd,t.theme,t.userVariants],()=>a(),{deep:!0}),(e,n)=>(d(),m("div",V,[b("iframe",{ref_key:"iframeEl",ref:s,class:"iso-frame",srcdoc:C,sandbox:"allow-same-origin",title:"变体预览",onLoad:y},null,544),r.value?(d(),m("div",E," 渲染失败 · "+x(r.value)+"（已保留上次有效快照） ",1)):k("",!0)]))}}),N=M(H,[["__scopeId","data-v-d60253c1"]]);export{N as default};
