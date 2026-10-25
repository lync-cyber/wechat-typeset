import{m as _,z as g,T as w,A as d,i as m,f as b,J as x,h as k,G as h,H as L,c as M}from"./index-xIISb_XW.js";import"./themes-MDkJVAjA.js";import"./markdown-C7l5odKG.js";import"./codemirror-CLw21sAn.js";import"./juice-DRS-NUY2.js";const V={class:"iso-shell"},E={key:0,class:"iso-error",role:"alert"},H=`<!doctype html>
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
</html>`,C=_({__name:"IsolatedPreview",props:{placeholderMd:{},theme:{},userVariants:{}},emits:["patch-log"],setup(u,{emit:p}){const t=u,f=p,s=h(null),o=h("");let l=!1,r="";function v(){if(!t.placeholderMd.trim())return null;try{const e=L({md:t.placeholderMd,theme:t.theme,userVariants:t.userVariants});return o.value="",f("patch-log",e.patchLog??null),e.html}catch(e){return o.value=e instanceof Error?e.message:String(e),null}}function i(e){const n=s.value?.contentDocument;if(!n)return;const c=n.querySelector(".phone-viewport");c&&(c.innerHTML=e)}function a(){const e=v();e!==null&&(r=e,l&&i(e))}function y(){l=!0,r?i(r):a()}return g(()=>{a()}),w(()=>[t.placeholderMd,t.theme,t.userVariants],()=>a(),{deep:!0}),(e,n)=>(d(),m("div",V,[b("iframe",{ref_key:"iframeEl",ref:s,class:"iso-frame",srcdoc:H,sandbox:"allow-same-origin",title:"变体预览",onLoad:y},null,544),o.value?(d(),m("div",E," 渲染失败 · "+x(o.value)+"（已保留上次有效快照） ",1)):k("",!0)]))}}),P=M(C,[["__scopeId","data-v-d60253c1"]]);export{P as default};
