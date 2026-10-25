import{a as w,v as b,b as l,s as E,n as _,r as M,h as k,o as L,q as z,C as g,f as T,p as I,E as O,t as h}from"./codemirror-CLw21sAn.js";import{m as q,z as x,T as m,y as v,A as D,i as P,G as y,c as V,q as B,r as U}from"./index-xIISb_XW.js";const F=q({__name:"CodeMirrorPane",props:{value:{},lang:{},extraExtensions:{}},emits:["update:value"],setup(t,{expose:o,emit:a}){const e=t,s=a,i=y(null);let n=null;const p=new g,d=new g;let u=!1;function S(r){return r==="css"?T():I()}x(()=>{if(!i.value)return;const r=w.create({doc:e.value,extensions:[E(),_(),M.of([...k,...L,z]),p.of(S(e.lang)),d.of(e.extraExtensions??[]),b,l.lineWrapping,l.updateListener.of(c=>{c.docChanged&&(u=!0,s("update:value",c.state.doc.toString()),queueMicrotask(()=>{u=!1}))}),l.theme({"&":{height:"100%",fontSize:"12px"},".cm-scroller":{overflow:"auto"},".cm-content":{fontFamily:"ui-monospace, SFMono-Regular, Menlo, monospace"}})]});n=new l({state:r,parent:i.value})}),m(()=>e.value,r=>{if(!n||u)return;const c=n.state.doc.toString();r!==c&&n.dispatch({changes:{from:0,to:c.length,insert:r}})}),m(()=>e.lang,r=>{n&&n.dispatch({effects:p.reconfigure(S(r))})}),m(()=>e.extraExtensions,r=>{n&&n.dispatch({effects:d.reconfigure(r??[])})}),v(()=>{n?.destroy(),n=null});function C(r){if(!n||!r)return!1;const f=n.state.doc.toString().indexOf(r);return f<0?!1:(n.dispatch({selection:O.cursor(f),effects:l.scrollIntoView(f,{y:"center"})}),n.focus(),!0)}return o({jumpToSubstring:C}),(r,c)=>(D(),P("div",{class:"cm-pane",ref_key:"host",ref:i},null,512))}}),j=V(F,[["__scopeId","data-v-27ceb35f"]]);function H(t,o,a){const e=t.indexOf(o);if(e<0)return[0,0];const s=t.indexOf(":",e+o.length);if(s<0)return[e,e+o.length];const i=t.indexOf(";",s+1),n=i<0?t.length:i;return[e,n]}function A(t="editor"){return h(o=>{const a=o.state.doc.toString();return B(a,t).map(e=>{const[s,i]=H(a,e.prop,e.value);return{from:s,to:i,severity:e.severity,message:e.message,source:"wxts-css"}})})}function G(t="template"){return h(o=>{const a=o.state.doc.toString();return U(a,t).map(e=>{let s=0,i=a.length;if(e.value&&typeof e.value=="string"){const n=a.indexOf(e.value);n>=0&&(s=n,i=n+e.value.length)}return{from:s,to:i,severity:e.severity,message:e.message,source:"wxts-template"}})})}function N(t){const o=y(!1);let a=null;const e=s=>{o.value=s.matches};return x(()=>{a=window.matchMedia(t),o.value=a.matches,a.addEventListener("change",e)}),v(()=>{a?.removeEventListener("change",e),a=null}),o}function Q(){return{wrapperCSS:`background-color: #f6f7f9;
padding: 16px 20px;
border-radius: 8px;`,titleCSS:`color: #1a1a1a;
font-size: 16px;
font-weight: 600;`,bodyCSS:`color: #4a4a4a;
font-size: 14px;
line-height: 1.7;`}}function R(){return{template:`<section data-uc-wrap style="{{wrapperCSS}}">
  <h3 data-uc-title style="{{titleCSS}}">{{title}}</h3>
  <div data-uc-body style="{{bodyCSS}}">{{body}}</div>
</section>`,wrapperCSS:`background-color: #f6f7f9;
padding: 18px 20px;
border-radius: 10px;
margin: 16px 0;`,titleCSS:`color: #1a1a1a;
font-size: 16px;
font-weight: 600;
margin-bottom: 8px;`,bodyCSS:`color: #4a4a4a;
font-size: 14px;
line-height: 1.7;`,svgSlot:""}}function J(t){return!t.wrapperCSS.trim()&&!t.titleCSS.trim()&&!t.bodyCSS.trim()}function X(t){return!t.template.trim()&&!t.wrapperCSS.trim()&&!t.titleCSS.trim()&&!t.bodyCSS.trim()&&!t.svgSlot.trim()}export{j as C,G as a,Q as b,A as c,R as d,J as e,X as i,N as u};
