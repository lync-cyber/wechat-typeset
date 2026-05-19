const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IsolatedPreview-BR1Qh7y8.js","assets/codemirror-o3ugzYrd.js","assets/themes-BM1nhHlk.js","assets/markdown-CXq-4r5b.js","assets/juice-D0R5JQLj.js","assets/IsolatedPreview-CAeekjYe.css","assets/SourceModePanel-Bv7iwn49.js","assets/userVariantScaffold-CnP60OCC.js","assets/userVariantScaffold-CnuzLc4l.css","assets/SourceModePanel-Ciuf7aPl.css","assets/CustomModePanel-OPMHb5R7.js","assets/CustomModePanel-BpibVBhA.css","assets/UserVariantsPanel-CCyS-6Jf.js","assets/UserVariantsPanel-pIrqv1io.css"])))=>i.map(i=>d[i]);
import{d as kp,q as xp,v as Cp,c as tu,b as ft,i as $p,D as On,R as Ep,S as Tp,a as nu,p as ou,g as Ap,j as Ip,k as su,o as ru,f as iu,l as au,h as Rp,n as lu,r as cu,C as Mp,s as uu,t as Op}from"./codemirror-o3ugzYrd.js";import{z as Ys,V as Ut,e as Js,K as Qs,t as ze,x as ri,u as Y,A as Np,S as za,h as Lp,k as Wa,d as ii,m as Dp,f as Pp,j as Ka,F as qa,R as Bp,N as Fp,c as jp,Q as Ga,g as Hp,P as Vp,T as Ya,G as gr,D as br,U as Up,L as zp,n as Wp,o as Kp,C as _s,l as Ja,O as qp,i as Gp,M as Yp,H as Jp,a as Qp,I as Xp,W as Zp,J as ho,B as eh,w as th,b as nh,v as oh,y as du,E as sh,q as rh,p as ih,r as ah,s as lh}from"./themes-BM1nhHlk.js";import{M as ch,j as uh,k as dh,f as fh,m as ph,c as Qa,h as hh}from"./markdown-CXq-4r5b.js";import{j as mh}from"./juice-D0R5JQLj.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Xa=globalThis||void 0||self;/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Oi(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Be={},eo=[],zt=()=>{},fu=()=>!1,Xs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Zs=e=>e.startsWith("onUpdate:"),tt=Object.assign,Ni=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},gh=Object.prototype.hasOwnProperty,Le=(e,t)=>gh.call(e,t),ye=Array.isArray,to=e=>ss(e)==="[object Map]",mo=e=>ss(e)==="[object Set]",Za=e=>ss(e)==="[object Date]",Se=e=>typeof e=="function",Ve=e=>typeof e=="string",Mt=e=>typeof e=="symbol",Pe=e=>e!==null&&typeof e=="object",pu=e=>(Pe(e)||Se(e))&&Se(e.then)&&Se(e.catch),hu=Object.prototype.toString,ss=e=>hu.call(e),bh=e=>ss(e).slice(8,-1),mu=e=>ss(e)==="[object Object]",Li=e=>Ve(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Lo=Oi(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),er=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},yh=/-\w/g,At=er(e=>e.replace(yh,t=>t.slice(1).toUpperCase())),vh=/\B([A-Z])/g,Sn=er(e=>e.replace(vh,"-$1").toLowerCase()),gu=er(e=>e.charAt(0).toUpperCase()+e.slice(1)),yr=er(e=>e?`on${gu(e)}`:""),Vt=(e,t)=>!Object.is(e,t),ks=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},bu=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},tr=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let el;const nr=()=>el||(el=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof Xa<"u"?Xa:{});function Ge(e){if(ye(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],s=Ve(o)?kh(o):Ge(o);if(s)for(const r in s)t[r]=s[r]}return t}else if(Ve(e)||Pe(e))return e}const wh=/;(?![^(]*\))/g,Sh=/:([^]+)/,_h=/\/\*[^]*?\*\//g;function kh(e){const t={};return e.replace(_h,"").split(wh).forEach(n=>{if(n){const o=n.split(Sh);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function Ce(e){let t="";if(Ve(e))t=e;else if(ye(e))for(let n=0;n<e.length;n++){const o=Ce(e[n]);o&&(t+=o+" ")}else if(Pe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const xh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ch=Oi(xh);function yu(e){return!!e||e===""}function $h(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=go(e[o],t[o]);return n}function go(e,t){if(e===t)return!0;let n=Za(e),o=Za(t);if(n||o)return n&&o?e.getTime()===t.getTime():!1;if(n=Mt(e),o=Mt(t),n||o)return e===t;if(n=ye(e),o=ye(t),n||o)return n&&o?$h(e,t):!1;if(n=Pe(e),o=Pe(t),n||o){if(!n||!o)return!1;const s=Object.keys(e).length,r=Object.keys(t).length;if(s!==r)return!1;for(const i in e){const a=e.hasOwnProperty(i),l=t.hasOwnProperty(i);if(a&&!l||!a&&l||!go(e[i],t[i]))return!1}}return String(e)===String(t)}function Di(e,t){return e.findIndex(n=>go(n,t))}const vu=e=>!!(e&&e.__v_isRef===!0),z=e=>Ve(e)?e:e==null?"":ye(e)||Pe(e)&&(e.toString===hu||!Se(e.toString))?vu(e)?z(e.value):JSON.stringify(e,wu,2):String(e),wu=(e,t)=>vu(t)?wu(e,t.value):to(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,s],r)=>(n[vr(o,r)+" =>"]=s,n),{})}:mo(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>vr(n))}:Mt(t)?vr(t):Pe(t)&&!ye(t)&&!mu(t)?String(t):t,vr=(e,t="")=>{var n;return Mt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Xe;class Eh{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Xe&&(Xe.active?(this.parent=Xe,this.index=(Xe.scopes||(Xe.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Xe;try{return Xe=this,t()}finally{Xe=n}}}on(){++this._on===1&&(this.prevScope=Xe,Xe=this)}off(){if(this._on>0&&--this._on===0){if(Xe===this)Xe=this.prevScope;else{let t=Xe;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,o=this.scopes.length;n<o;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Th(){return Xe}let Fe;const wr=new WeakSet;class Su{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Xe&&(Xe.active?Xe.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wr.has(this)&&(wr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||ku(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,tl(this),xu(this);const t=Fe,n=It;Fe=this,It=!0;try{return this.fn()}finally{Cu(this),Fe=t,It=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Fi(t);this.deps=this.depsTail=void 0,tl(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ai(this)&&this.run()}get dirty(){return ai(this)}}let _u=0,Do,Po;function ku(e,t=!1){if(e.flags|=8,t){e.next=Po,Po=e;return}e.next=Do,Do=e}function Pi(){_u++}function Bi(){if(--_u>0)return;if(Po){let t=Po;for(Po=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Do;){let t=Do;for(Do=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function xu(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Cu(e){let t,n=e.depsTail,o=n;for(;o;){const s=o.prevDep;o.version===-1?(o===n&&(n=s),Fi(o),Ah(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=s}e.deps=t,e.depsTail=n}function ai(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&($u(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function $u(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===zo)||(e.globalVersion=zo,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ai(e))))return;e.flags|=2;const t=e.dep,n=Fe,o=It;Fe=e,It=!0;try{xu(e);const s=e.fn(e._value);(t.version===0||Vt(s,e._value))&&(e.flags|=128,e._value=s,t.version++)}catch(s){throw t.version++,s}finally{Fe=n,It=o,Cu(e),e.flags&=-3}}function Fi(e,t=!1){const{dep:n,prevSub:o,nextSub:s}=e;if(o&&(o.nextSub=s,e.prevSub=void 0),s&&(s.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let r=n.computed.deps;r;r=r.nextDep)Fi(r,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ah(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let It=!0;const Eu=[];function rn(){Eu.push(It),It=!1}function an(){const e=Eu.pop();It=e===void 0?!0:e}function tl(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Fe;Fe=void 0;try{t()}finally{Fe=n}}}let zo=0;class Ih{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ji{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Fe||!It||Fe===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Fe)n=this.activeLink=new Ih(Fe,this),Fe.deps?(n.prevDep=Fe.depsTail,Fe.depsTail.nextDep=n,Fe.depsTail=n):Fe.deps=Fe.depsTail=n,Tu(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=Fe.depsTail,n.nextDep=void 0,Fe.depsTail.nextDep=n,Fe.depsTail=n,Fe.deps===n&&(Fe.deps=o)}return n}trigger(t){this.version++,zo++,this.notify(t)}notify(t){Pi();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Bi()}}}function Tu(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Tu(o)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const li=new WeakMap,Dn=Symbol(""),ci=Symbol(""),Wo=Symbol("");function ot(e,t,n){if(It&&Fe){let o=li.get(e);o||li.set(e,o=new Map);let s=o.get(n);s||(o.set(n,s=new ji),s.map=o,s.key=n),s.track()}}function en(e,t,n,o,s,r){const i=li.get(e);if(!i){zo++;return}const a=l=>{l&&l.trigger()};if(Pi(),t==="clear")i.forEach(a);else{const l=ye(e),c=l&&Li(n);if(l&&n==="length"){const u=Number(o);i.forEach((d,f)=>{(f==="length"||f===Wo||!Mt(f)&&f>=u)&&a(d)})}else switch((n!==void 0||i.has(void 0))&&a(i.get(n)),c&&a(i.get(Wo)),t){case"add":l?c&&a(i.get("length")):(a(i.get(Dn)),to(e)&&a(i.get(ci)));break;case"delete":l||(a(i.get(Dn)),to(e)&&a(i.get(ci)));break;case"set":to(e)&&a(i.get(Dn));break}}Bi()}function Kn(e){const t=Ne(e);return t===e?t:(ot(t,"iterate",Wo),xt(e)?t:t.map(Ot))}function or(e){return ot(e=Ne(e),"iterate",Wo),e}function jt(e,t){return ln(e)?ro(Pn(e)?Ot(t):t):Ot(t)}const Rh={__proto__:null,[Symbol.iterator](){return Sr(this,Symbol.iterator,e=>jt(this,e))},concat(...e){return Kn(this).concat(...e.map(t=>ye(t)?Kn(t):t))},entries(){return Sr(this,"entries",e=>(e[1]=jt(this,e[1]),e))},every(e,t){return Yt(this,"every",e,t,void 0,arguments)},filter(e,t){return Yt(this,"filter",e,t,n=>n.map(o=>jt(this,o)),arguments)},find(e,t){return Yt(this,"find",e,t,n=>jt(this,n),arguments)},findIndex(e,t){return Yt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Yt(this,"findLast",e,t,n=>jt(this,n),arguments)},findLastIndex(e,t){return Yt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Yt(this,"forEach",e,t,void 0,arguments)},includes(...e){return _r(this,"includes",e)},indexOf(...e){return _r(this,"indexOf",e)},join(e){return Kn(this).join(e)},lastIndexOf(...e){return _r(this,"lastIndexOf",e)},map(e,t){return Yt(this,"map",e,t,void 0,arguments)},pop(){return $o(this,"pop")},push(...e){return $o(this,"push",e)},reduce(e,...t){return nl(this,"reduce",e,t)},reduceRight(e,...t){return nl(this,"reduceRight",e,t)},shift(){return $o(this,"shift")},some(e,t){return Yt(this,"some",e,t,void 0,arguments)},splice(...e){return $o(this,"splice",e)},toReversed(){return Kn(this).toReversed()},toSorted(e){return Kn(this).toSorted(e)},toSpliced(...e){return Kn(this).toSpliced(...e)},unshift(...e){return $o(this,"unshift",e)},values(){return Sr(this,"values",e=>jt(this,e))}};function Sr(e,t,n){const o=or(e),s=o[t]();return o!==e&&!xt(e)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=n(r.value)),r}),s}const Mh=Array.prototype;function Yt(e,t,n,o,s,r){const i=or(e),a=i!==e&&!xt(e),l=i[t];if(l!==Mh[t]){const d=l.apply(e,r);return a?Ot(d):d}let c=n;i!==e&&(a?c=function(d,f){return n.call(this,jt(e,d),f,e)}:n.length>2&&(c=function(d,f){return n.call(this,d,f,e)}));const u=l.call(i,c,o);return a&&s?s(u):u}function nl(e,t,n,o){const s=or(e),r=s!==e&&!xt(e);let i=n,a=!1;s!==e&&(r?(a=o.length===0,i=function(c,u,d){return a&&(a=!1,c=jt(e,c)),n.call(this,c,jt(e,u),d,e)}):n.length>3&&(i=function(c,u,d){return n.call(this,c,u,d,e)}));const l=s[t](i,...o);return a?jt(e,l):l}function _r(e,t,n){const o=Ne(e);ot(o,"iterate",Wo);const s=o[t](...n);return(s===-1||s===!1)&&Ui(n[0])?(n[0]=Ne(n[0]),o[t](...n)):s}function $o(e,t,n=[]){rn(),Pi();const o=Ne(e)[t].apply(e,n);return Bi(),an(),o}const Oh=Oi("__proto__,__v_isRef,__isVue"),Au=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Mt));function Nh(e){Mt(e)||(e=String(e));const t=Ne(this);return ot(t,"has",e),t.hasOwnProperty(e)}class Iu{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return r;if(n==="__v_raw")return o===(s?r?zh:Nu:r?Ou:Mu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;const i=ye(t);if(!s){let l;if(i&&(l=Rh[n]))return l;if(n==="hasOwnProperty")return Nh}const a=Reflect.get(t,n,Ye(t)?t:o);if((Mt(n)?Au.has(n):Oh(n))||(s||ot(t,"get",n),r))return a;if(Ye(a)){const l=i&&Li(n)?a:a.value;return s&&Pe(l)?di(l):l}return Pe(a)?s?di(a):Kt(a):a}}class Ru extends Iu{constructor(t=!1){super(!1,t)}set(t,n,o,s){let r=t[n];const i=ye(t)&&Li(n);if(!this._isShallow){const c=ln(r);if(!xt(o)&&!ln(o)&&(r=Ne(r),o=Ne(o)),!i&&Ye(r)&&!Ye(o))return c||(r.value=o),!0}const a=i?Number(n)<t.length:Le(t,n),l=Reflect.set(t,n,o,Ye(t)?t:s);return t===Ne(s)&&(a?Vt(o,r)&&en(t,"set",n,o):en(t,"add",n,o)),l}deleteProperty(t,n){const o=Le(t,n);t[n];const s=Reflect.deleteProperty(t,n);return s&&o&&en(t,"delete",n,void 0),s}has(t,n){const o=Reflect.has(t,n);return(!Mt(n)||!Au.has(n))&&ot(t,"has",n),o}ownKeys(t){return ot(t,"iterate",ye(t)?"length":Dn),Reflect.ownKeys(t)}}class Lh extends Iu{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Dh=new Ru,Ph=new Lh,Bh=new Ru(!0);const ui=e=>e,fs=e=>Reflect.getPrototypeOf(e);function Fh(e,t,n){return function(...o){const s=this.__v_raw,r=Ne(s),i=to(r),a=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,c=s[e](...o),u=n?ui:t?ro:Ot;return!t&&ot(r,"iterate",l?ci:Dn),tt(Object.create(c),{next(){const{value:d,done:f}=c.next();return f?{value:d,done:f}:{value:a?[u(d[0]),u(d[1])]:u(d),done:f}}})}}function ps(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function jh(e,t){const n={get(s){const r=this.__v_raw,i=Ne(r),a=Ne(s);e||(Vt(s,a)&&ot(i,"get",s),ot(i,"get",a));const{has:l}=fs(i),c=t?ui:e?ro:Ot;if(l.call(i,s))return c(r.get(s));if(l.call(i,a))return c(r.get(a));r!==i&&r.get(s)},get size(){const s=this.__v_raw;return!e&&ot(Ne(s),"iterate",Dn),s.size},has(s){const r=this.__v_raw,i=Ne(r),a=Ne(s);return e||(Vt(s,a)&&ot(i,"has",s),ot(i,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const i=this,a=i.__v_raw,l=Ne(a),c=t?ui:e?ro:Ot;return!e&&ot(l,"iterate",Dn),a.forEach((u,d)=>s.call(r,c(u),c(d),i))}};return tt(n,e?{add:ps("add"),set:ps("set"),delete:ps("delete"),clear:ps("clear")}:{add(s){const r=Ne(this),i=fs(r),a=Ne(s),l=!t&&!xt(s)&&!ln(s)?a:s;return i.has.call(r,l)||Vt(s,l)&&i.has.call(r,s)||Vt(a,l)&&i.has.call(r,a)||(r.add(l),en(r,"add",l,l)),this},set(s,r){!t&&!xt(r)&&!ln(r)&&(r=Ne(r));const i=Ne(this),{has:a,get:l}=fs(i);let c=a.call(i,s);c||(s=Ne(s),c=a.call(i,s));const u=l.call(i,s);return i.set(s,r),c?Vt(r,u)&&en(i,"set",s,r):en(i,"add",s,r),this},delete(s){const r=Ne(this),{has:i,get:a}=fs(r);let l=i.call(r,s);l||(s=Ne(s),l=i.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&en(r,"delete",s,void 0),c},clear(){const s=Ne(this),r=s.size!==0,i=s.clear();return r&&en(s,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Fh(s,e,t)}),n}function Hi(e,t){const n=jh(e,t);return(o,s,r)=>s==="__v_isReactive"?!e:s==="__v_isReadonly"?e:s==="__v_raw"?o:Reflect.get(Le(n,s)&&s in o?n:o,s,r)}const Hh={get:Hi(!1,!1)},Vh={get:Hi(!1,!0)},Uh={get:Hi(!0,!1)};const Mu=new WeakMap,Ou=new WeakMap,Nu=new WeakMap,zh=new WeakMap;function Wh(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Kh(e){return e.__v_skip||!Object.isExtensible(e)?0:Wh(bh(e))}function Kt(e){return ln(e)?e:Vi(e,!1,Dh,Hh,Mu)}function qh(e){return Vi(e,!1,Bh,Vh,Ou)}function di(e){return Vi(e,!0,Ph,Uh,Nu)}function Vi(e,t,n,o,s){if(!Pe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const r=Kh(e);if(r===0)return e;const i=s.get(e);if(i)return i;const a=new Proxy(e,r===2?o:n);return s.set(e,a),a}function Pn(e){return ln(e)?Pn(e.__v_raw):!!(e&&e.__v_isReactive)}function ln(e){return!!(e&&e.__v_isReadonly)}function xt(e){return!!(e&&e.__v_isShallow)}function Ui(e){return e?!!e.__v_raw:!1}function Ne(e){const t=e&&e.__v_raw;return t?Ne(t):e}function Gh(e){return!Le(e,"__v_skip")&&Object.isExtensible(e)&&bu(e,"__v_skip",!0),e}const Ot=e=>Pe(e)?Kt(e):e,ro=e=>Pe(e)?di(e):e;function Ye(e){return e?e.__v_isRef===!0:!1}function te(e){return Yh(e,!1)}function Yh(e,t){return Ye(e)?e:new Jh(e,t)}class Jh{constructor(t,n){this.dep=new ji,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Ne(t),this._value=n?t:Ot(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,o=this.__v_isShallow||xt(t)||ln(t);t=o?t:Ne(t),Vt(t,n)&&(this._rawValue=t,this._value=o?t:Ot(t),this.dep.trigger())}}function I(e){return Ye(e)?e.value:e}const Qh={get:(e,t,n)=>t==="__v_raw"?e:I(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const s=e[t];return Ye(s)&&!Ye(n)?(s.value=n,!0):Reflect.set(e,t,n,o)}};function Lu(e){return Pn(e)?e:new Proxy(e,Qh)}class Xh{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new ji(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=zo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&Fe!==this)return ku(this,!0),!0}get value(){const t=this.dep.track();return $u(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Zh(e,t,n=!1){let o,s;return Se(e)?o=e:(o=e.get,s=e.set),new Xh(o,s,n)}const hs={},Es=new WeakMap;let Rn;function em(e,t=!1,n=Rn){if(n){let o=Es.get(n);o||Es.set(n,o=[]),o.push(e)}}function tm(e,t,n=Be){const{immediate:o,deep:s,once:r,scheduler:i,augmentJob:a,call:l}=n,c=R=>s?R:xt(R)||s===!1||s===0?tn(R,1):tn(R);let u,d,f,m,v=!1,g=!1;if(Ye(e)?(d=()=>e.value,v=xt(e)):Pn(e)?(d=()=>c(e),v=!0):ye(e)?(g=!0,v=e.some(R=>Pn(R)||xt(R)),d=()=>e.map(R=>{if(Ye(R))return R.value;if(Pn(R))return c(R);if(Se(R))return l?l(R,2):R()})):Se(e)?t?d=l?()=>l(e,2):e:d=()=>{if(f){rn();try{f()}finally{an()}}const R=Rn;Rn=u;try{return l?l(e,3,[m]):e(m)}finally{Rn=R}}:d=zt,t&&s){const R=d,B=s===!0?1/0:s;d=()=>tn(R(),B)}const h=Th(),w=()=>{u.stop(),h&&h.active&&Ni(h.effects,u)};if(r&&t){const R=t;t=(...B)=>{R(...B),w()}}let A=g?new Array(e.length).fill(hs):hs;const M=R=>{if(!(!(u.flags&1)||!u.dirty&&!R))if(t){const B=u.run();if(s||v||(g?B.some((N,k)=>Vt(N,A[k])):Vt(B,A))){f&&f();const N=Rn;Rn=u;try{const k=[B,A===hs?void 0:g&&A[0]===hs?[]:A,m];A=B,l?l(t,3,k):t(...k)}finally{Rn=N}}}else u.run()};return a&&a(M),u=new Su(d),u.scheduler=i?()=>i(M,!1):M,m=R=>em(R,!1,u),f=u.onStop=()=>{const R=Es.get(u);if(R){if(l)l(R,4);else for(const B of R)B();Es.delete(u)}},t?o?M(!0):A=u.run():i?i(M.bind(null,!0),!0):u.run(),w.pause=u.pause.bind(u),w.resume=u.resume.bind(u),w.stop=w,w}function tn(e,t=1/0,n){if(t<=0||!Pe(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,Ye(e))tn(e.value,t,n);else if(ye(e))for(let o=0;o<e.length;o++)tn(e[o],t,n);else if(mo(e)||to(e))e.forEach(o=>{tn(o,t,n)});else if(mu(e)){for(const o in e)tn(e[o],t,n);for(const o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&tn(e[o],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function rs(e,t,n,o){try{return o?e(...o):e()}catch(s){is(s,t,n)}}function qt(e,t,n,o){if(Se(e)){const s=rs(e,t,n,o);return s&&pu(s)&&s.catch(r=>{is(r,t,n)}),s}if(ye(e)){const s=[];for(let r=0;r<e.length;r++)s.push(qt(e[r],t,n,o));return s}}function is(e,t,n,o=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||Be;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](e,l,c)===!1)return}a=a.parent}if(r){rn(),rs(r,null,10,[e,l,c]),an();return}}nm(e,n,s,o,i)}function nm(e,t,n,o=!0,s=!1){if(s)throw e;console.error(e)}const pt=[];let Ft=-1;const no=[];let gn=null,Qn=0;const Du=Promise.resolve();let Ts=null;function jn(e){const t=Ts||Du;return e?t.then(this?e.bind(this):e):t}function om(e){let t=Ft+1,n=pt.length;for(;t<n;){const o=t+n>>>1,s=pt[o],r=Ko(s);r<e||r===e&&s.flags&2?t=o+1:n=o}return t}function zi(e){if(!(e.flags&1)){const t=Ko(e),n=pt[pt.length-1];!n||!(e.flags&2)&&t>=Ko(n)?pt.push(e):pt.splice(om(t),0,e),e.flags|=1,Pu()}}function Pu(){Ts||(Ts=Du.then(Fu))}function sm(e){ye(e)?no.push(...e):gn&&e.id===-1?gn.splice(Qn+1,0,e):e.flags&1||(no.push(e),e.flags|=1),Pu()}function ol(e,t,n=Ft+1){for(;n<pt.length;n++){const o=pt[n];if(o&&o.flags&2){if(e&&o.id!==e.uid)continue;pt.splice(n,1),n--,o.flags&4&&(o.flags&=-2),o(),o.flags&4||(o.flags&=-2)}}}function Bu(e){if(no.length){const t=[...new Set(no)].sort((n,o)=>Ko(n)-Ko(o));if(no.length=0,gn){gn.push(...t);return}for(gn=t,Qn=0;Qn<gn.length;Qn++){const n=gn[Qn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}gn=null,Qn=0}}const Ko=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Fu(e){try{for(Ft=0;Ft<pt.length;Ft++){const t=pt[Ft];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),rs(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ft<pt.length;Ft++){const t=pt[Ft];t&&(t.flags&=-2)}Ft=-1,pt.length=0,Bu(),Ts=null,(pt.length||no.length)&&Fu()}}let rt=null,ju=null;function As(e){const t=rt;return rt=e,ju=e&&e.type.__scopeId||null,t}function kt(e,t=rt,n){if(!t||e._n)return e;const o=(...s)=>{o._d&&bl(-1);const r=As(t);let i;try{i=e(...s)}finally{As(r),o._d&&bl(1)}return i};return o._n=!0,o._c=!0,o._d=!0,o}function et(e,t){if(rt===null)return e;const n=ar(rt),o=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[r,i,a,l=Be]=t[s];r&&(Se(r)&&(r={mounted:r,updated:r}),r.deep&&tn(i),o.push({dir:r,instance:n,value:i,oldValue:void 0,arg:a,modifiers:l}))}return e}function En(e,t,n,o){const s=e.dirs,r=t&&t.dirs;for(let i=0;i<s.length;i++){const a=s[i];r&&(a.oldValue=r[i].value);let l=a.dir[o];l&&(rn(),qt(l,n,8,[e.el,a,e,t]),an())}}function rm(e,t){if(st){let n=st.provides;const o=st.parent&&st.parent.provides;o===n&&(n=st.provides=Object.create(o)),n[e]=t}}function xs(e,t,n=!1){const o=rg();if(o||so){let s=so?so._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&Se(t)?t.call(o&&o.proxy):t}}const im=Symbol.for("v-scx"),am=()=>xs(im);function je(e,t,n){return Hu(e,t,n)}function Hu(e,t,n=Be){const{immediate:o,deep:s,flush:r,once:i}=n,a=tt({},n),l=t&&o||!t&&r!=="post";let c;if(ao){if(r==="sync"){const m=am();c=m.__watcherHandles||(m.__watcherHandles=[])}else if(!l){const m=()=>{};return m.stop=zt,m.resume=zt,m.pause=zt,m}}const u=st;a.call=(m,v,g)=>qt(m,u,v,g);let d=!1;r==="post"?a.scheduler=m=>{dt(m,u&&u.suspense)}:r!=="sync"&&(d=!0,a.scheduler=(m,v)=>{v?m():zi(m)}),a.augmentJob=m=>{t&&(m.flags|=4),d&&(m.flags|=2,u&&(m.id=u.uid,m.i=u))};const f=tm(e,t,a);return ao&&(c?c.push(f):l&&f()),f}function lm(e,t,n){const o=this.proxy,s=Ve(e)?e.includes(".")?Vu(o,e):()=>o[e]:e.bind(o,o);let r;Se(t)?r=t:(r=t.handler,n=t);const i=as(this),a=Hu(s,r.bind(o),n);return i(),a}function Vu(e,t){const n=t.split(".");return()=>{let o=e;for(let s=0;s<n.length&&o;s++)o=o[n[s]];return o}}const hn=new WeakMap,Uu=Symbol("_vte"),cm=e=>e.__isTeleport,Mn=e=>e&&(e.disabled||e.disabled===""),um=e=>e&&(e.defer||e.defer===""),sl=e=>typeof SVGElement<"u"&&e instanceof SVGElement,rl=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,fi=(e,t)=>{const n=e&&e.to;return Ve(n)?t?t(n):null:n},dm={name:"Teleport",__isTeleport:!0,process(e,t,n,o,s,r,i,a,l,c){const{mc:u,pc:d,pbc:f,o:{insert:m,querySelector:v,createText:g,createComment:h,parentNode:w}}=c,A=Mn(t.props);let{dynamicChildren:M}=t;const R=(k,y,b)=>{k.shapeFlag&16&&u(k.children,y,b,s,r,i,a,l)},B=(k=t)=>{const y=Mn(k.props),b=k.target=fi(k.props,v),_=pi(b,k,g,m);b&&(i!=="svg"&&sl(b)?i="svg":i!=="mathml"&&rl(b)&&(i="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(b),y||(R(k,b,_),Io(k,!1)))},N=k=>{const y=()=>{if(hn.get(k)===y){if(hn.delete(k),Mn(k.props)){const b=w(k.el)||n;R(k,b,k.anchor),Io(k,!0)}B(k)}};hn.set(k,y),dt(y,r)};if(e==null){const k=t.el=g(""),y=t.anchor=g("");if(m(k,n,o),m(y,n,o),um(t.props)||r&&r.pendingBranch){N(t);return}A&&(R(t,n,y),Io(t,!0)),B()}else{t.el=e.el;const k=t.anchor=e.anchor,y=hn.get(e);if(y){y.flags|=8,hn.delete(e),N(t);return}t.targetStart=e.targetStart;const b=t.target=e.target,_=t.targetAnchor=e.targetAnchor,x=Mn(e.props),$=x?n:b,P=x?k:_;if(i==="svg"||sl(b)?i="svg":(i==="mathml"||rl(b))&&(i="mathml"),M?(f(e.dynamicChildren,M,$,s,r,i,a),Qi(e,t,!0)):l||d(e,t,$,P,s,r,i,a,!1),A)x?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):ms(t,n,k,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const W=t.target=fi(t.props,v);W&&ms(t,W,null,c,0)}else x&&ms(t,b,_,c,1);Io(t,A)}},remove(e,t,n,{um:o,o:{remove:s}},r){const{shapeFlag:i,children:a,anchor:l,targetStart:c,targetAnchor:u,target:d,props:f}=e;let m=r||!Mn(f);const v=hn.get(e);if(v&&(v.flags|=8,hn.delete(e),m=!1),d&&(s(c),s(u)),r&&s(l),i&16)for(let g=0;g<a.length;g++){const h=a[g];o(h,t,n,m,!!h.dynamicChildren)}},move:ms,hydrate:fm};function ms(e,t,n,{o:{insert:o},m:s},r=2){r===0&&o(e.targetAnchor,t,n);const{el:i,anchor:a,shapeFlag:l,children:c,props:u}=e,d=r===2;if(d&&o(i,t,n),!hn.has(e)&&(!d||Mn(u))&&l&16)for(let f=0;f<c.length;f++)s(c[f],t,n,2);d&&o(a,t,n)}function fm(e,t,n,o,s,r,{o:{nextSibling:i,parentNode:a,querySelector:l,insert:c,createText:u}},d){function f(h,w){let A=w;for(;A;){if(A&&A.nodeType===8){if(A.data==="teleport start anchor")t.targetStart=A;else if(A.data==="teleport anchor"){t.targetAnchor=A,h._lpa=t.targetAnchor&&i(t.targetAnchor);break}}A=i(A)}}function m(h,w){w.anchor=d(i(h),w,a(h),n,o,s,r)}const v=t.target=fi(t.props,l),g=Mn(t.props);if(v){const h=v._lpa||v.firstChild;t.shapeFlag&16&&(g?(m(e,t),f(v,h),t.targetAnchor||pi(v,t,u,c,a(e)===v?e:null)):(t.anchor=i(e),f(v,h),t.targetAnchor||pi(v,t,u,c),d(h&&i(h),t,v,n,o,s,r))),Io(t,g)}else g&&t.shapeFlag&16&&(m(e,t),t.targetStart=e,t.targetAnchor=i(e));return t.anchor&&i(t.anchor)}const zu=dm;function Io(e,t){const n=e.ctx;if(n&&n.ut){let o,s;for(t?(o=e.el,s=e.anchor):(o=e.targetStart,s=e.targetAnchor);o&&o!==s;)o.nodeType===1&&o.setAttribute("data-v-owner",n.uid),o=o.nextSibling;n.ut()}}function pi(e,t,n,o,s=null){const r=t.targetStart=n(""),i=t.targetAnchor=n("");return r[Uu]=i,e&&(o(r,e,s),o(i,e,s)),i}const pm=Symbol("_leaveCb");function Wi(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Wi(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Me(e,t){return Se(e)?tt({name:e.name},t,{setup:e}):e}function Ki(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function il(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Is=new WeakMap;function Bo(e,t,n,o,s=!1){if(ye(e)){e.forEach((g,h)=>Bo(g,t&&(ye(t)?t[h]:t),n,o,s));return}if(oo(o)&&!s){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Bo(e,t,n,o.component.subTree);return}const r=o.shapeFlag&4?ar(o.component):o.el,i=s?null:r,{i:a,r:l}=e,c=t&&t.r,u=a.refs===Be?a.refs={}:a.refs,d=a.setupState,f=Ne(d),m=d===Be?fu:g=>il(u,g)?!1:Le(f,g),v=(g,h)=>!(h&&il(u,h));if(c!=null&&c!==l){if(al(t),Ve(c))u[c]=null,m(c)&&(d[c]=null);else if(Ye(c)){const g=t;v(c,g.k)&&(c.value=null),g.k&&(u[g.k]=null)}}if(Se(l))rs(l,a,12,[i,u]);else{const g=Ve(l),h=Ye(l);if(g||h){const w=()=>{if(e.f){const A=g?m(l)?d[l]:u[l]:v()||!e.k?l.value:u[e.k];if(s)ye(A)&&Ni(A,r);else if(ye(A))A.includes(r)||A.push(r);else if(g)u[l]=[r],m(l)&&(d[l]=u[l]);else{const M=[r];v(l,e.k)&&(l.value=M),e.k&&(u[e.k]=M)}}else g?(u[l]=i,m(l)&&(d[l]=i)):h&&(v(l,e.k)&&(l.value=i),e.k&&(u[e.k]=i))};if(i){const A=()=>{w(),Is.delete(e)};A.id=-1,Is.set(e,A),dt(A,n)}else al(e),w()}}}function al(e){const t=Is.get(e);t&&(t.flags|=8,Is.delete(e))}const ll=e=>e.nodeType===8;nr().requestIdleCallback;nr().cancelIdleCallback;function hm(e,t){if(ll(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(ll(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}const oo=e=>!!e.type.__asyncLoader;function Rs(e){Se(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:s=200,hydrate:r,timeout:i,suspensible:a=!0,onError:l}=e;let c=null,u,d=0;const f=()=>(d++,c=null,m()),m=()=>{let v;return c||(v=c=t().catch(g=>{if(g=g instanceof Error?g:new Error(String(g)),l)return new Promise((h,w)=>{l(g,()=>h(f()),()=>w(g),d+1)});throw g}).then(g=>v!==c&&c?c:(g&&(g.__esModule||g[Symbol.toStringTag]==="Module")&&(g=g.default),u=g,g)))};return Me({name:"AsyncComponentWrapper",__asyncLoader:m,__asyncHydrate(v,g,h){let w=!1;(g.bu||(g.bu=[])).push(()=>w=!0);const A=()=>{w||h()},M=r?()=>{const R=r(A,B=>hm(v,B));R&&(g.bum||(g.bum=[])).push(R)}:A;u?M():m().then(()=>!g.isUnmounted&&M())},get __asyncResolved(){return u},setup(){const v=st;if(Ki(v),u)return()=>gs(u,v);const g=M=>{c=null,is(M,v,13,!o)};if(a&&v.suspense||ao)return m().then(M=>()=>gs(M,v)).catch(M=>(g(M),()=>o?$e(o,{error:M}):null));const h=te(!1),w=te(),A=te(!!s);return s&&setTimeout(()=>{A.value=!1},s),i!=null&&setTimeout(()=>{if(!h.value&&!w.value){const M=new Error(`Async component timed out after ${i}ms.`);g(M),w.value=M}},i),m().then(()=>{h.value=!0,v.parent&&qi(v.parent.vnode)&&v.parent.update()}).catch(M=>{g(M),w.value=M}),()=>{if(h.value&&u)return gs(u,v);if(w.value&&o)return $e(o,{error:w.value});if(n&&!A.value)return gs(n,v)}}})}function gs(e,t){const{ref:n,props:o,children:s,ce:r}=t.vnode,i=$e(e,o,s);return i.ref=n,i.ce=r,delete t.vnode.ce,i}const qi=e=>e.type.__isKeepAlive;function mm(e,t){Wu(e,"a",t)}function gm(e,t){Wu(e,"da",t)}function Wu(e,t,n=st){const o=e.__wdc||(e.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return e()});if(sr(t,o,n),n){let s=n.parent;for(;s&&s.parent;)qi(s.parent.vnode)&&bm(o,t,n,s),s=s.parent}}function bm(e,t,n,o){const s=sr(t,e,o,!0);Gi(()=>{Ni(o[t],s)},n)}function sr(e,t,n=st,o=!1){if(n){const s=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...i)=>{rn();const a=as(n),l=qt(t,n,e,i);return a(),an(),l});return o?s.unshift(r):s.push(r),r}}const un=e=>(t,n=st)=>{(!ao||e==="sp")&&sr(e,(...o)=>t(...o),n)},ym=un("bm"),mt=un("m"),vm=un("bu"),wm=un("u"),Je=un("bum"),Gi=un("um"),Sm=un("sp"),_m=un("rtg"),km=un("rtc");function Ku(e,t=st){sr("ec",e,t)}const xm=Symbol.for("v-ndc");function Te(e,t,n,o){let s;const r=n,i=ye(e);if(i||Ve(e)){const a=i&&Pn(e);let l=!1,c=!1;a&&(l=!xt(e),c=ln(e),e=or(e)),s=new Array(e.length);for(let u=0,d=e.length;u<d;u++)s[u]=t(l?c?ro(Ot(e[u])):Ot(e[u]):e[u],u,void 0,r)}else if(typeof e=="number"){s=new Array(e);for(let a=0;a<e;a++)s[a]=t(a+1,a,void 0,r)}else if(Pe(e))if(e[Symbol.iterator])s=Array.from(e,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(e);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(e[u],u,l,r)}}else s=[];return s}function Fo(e,t,n={},o,s){if(rt.ce||rt.parent&&oo(rt.parent)&&rt.parent.ce){const c=Object.keys(n).length>0;return t!=="default"&&(n.name=t),T(),He(ae,null,[$e("slot",n,o&&o())],c?-2:64)}let r=e[t];r&&r._c&&(r._d=!1),T();const i=r&&qu(r(n)),a=n.key||i&&i.key,l=He(ae,{key:(a&&!Mt(a)?a:`_${t}`)+(!i&&o?"_fb":"")},i||(o?o():[]),i&&e._===1?64:-2);return r&&r._c&&(r._d=!0),l}function qu(e){return e.some(t=>Xi(t)?!(t.type===cn||t.type===ae&&!qu(t.children)):!0)?e:null}const hi=e=>e?fd(e)?ar(e):hi(e.parent):null,jo=tt(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>hi(e.parent),$root:e=>hi(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Yu(e),$forceUpdate:e=>e.f||(e.f=()=>{zi(e.update)}),$nextTick:e=>e.n||(e.n=jn.bind(e.proxy)),$watch:e=>lm.bind(e)}),kr=(e,t)=>e!==Be&&!e.__isScriptSetup&&Le(e,t),Cm={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:o,data:s,props:r,accessCache:i,type:a,appContext:l}=e;if(t[0]!=="$"){const f=i[t];if(f!==void 0)switch(f){case 1:return o[t];case 2:return s[t];case 4:return n[t];case 3:return r[t]}else{if(kr(o,t))return i[t]=1,o[t];if(s!==Be&&Le(s,t))return i[t]=2,s[t];if(Le(r,t))return i[t]=3,r[t];if(n!==Be&&Le(n,t))return i[t]=4,n[t];mi&&(i[t]=0)}}const c=jo[t];let u,d;if(c)return t==="$attrs"&&ot(e.attrs,"get",""),c(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==Be&&Le(n,t))return i[t]=4,n[t];if(d=l.config.globalProperties,Le(d,t))return d[t]},set({_:e},t,n){const{data:o,setupState:s,ctx:r}=e;return kr(s,t)?(s[t]=n,!0):o!==Be&&Le(o,t)?(o[t]=n,!0):Le(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(r[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:s,props:r,type:i}},a){let l;return!!(n[a]||e!==Be&&a[0]!=="$"&&Le(e,a)||kr(t,a)||Le(r,a)||Le(o,a)||Le(jo,a)||Le(s.config.globalProperties,a)||(l=i.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Le(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function cl(e){return ye(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let mi=!0;function $m(e){const t=Yu(e),n=e.proxy,o=e.ctx;mi=!1,t.beforeCreate&&ul(t.beforeCreate,e,"bc");const{data:s,computed:r,methods:i,watch:a,provide:l,inject:c,created:u,beforeMount:d,mounted:f,beforeUpdate:m,updated:v,activated:g,deactivated:h,beforeDestroy:w,beforeUnmount:A,destroyed:M,unmounted:R,render:B,renderTracked:N,renderTriggered:k,errorCaptured:y,serverPrefetch:b,expose:_,inheritAttrs:x,components:$,directives:P,filters:W}=t;if(c&&Em(c,o,null),i)for(const F in i){const j=i[F];Se(j)&&(o[F]=j.bind(n))}if(s){const F=s.call(n,n);Pe(F)&&(e.data=Kt(F))}if(mi=!0,r)for(const F in r){const j=r[F],oe=Se(j)?j.bind(n,n):Se(j.get)?j.get.bind(n,n):zt,be=!Se(j)&&Se(j.set)?j.set.bind(n):zt,xe=ne({get:oe,set:be});Object.defineProperty(o,F,{enumerable:!0,configurable:!0,get:()=>xe.value,set:Ee=>xe.value=Ee})}if(a)for(const F in a)Gu(a[F],o,n,F);if(l){const F=Se(l)?l.call(n):l;Reflect.ownKeys(F).forEach(j=>{rm(j,F[j])})}u&&ul(u,e,"c");function E(F,j){ye(j)?j.forEach(oe=>F(oe.bind(n))):j&&F(j.bind(n))}if(E(ym,d),E(mt,f),E(vm,m),E(wm,v),E(mm,g),E(gm,h),E(Ku,y),E(km,N),E(_m,k),E(Je,A),E(Gi,R),E(Sm,b),ye(_))if(_.length){const F=e.exposed||(e.exposed={});_.forEach(j=>{Object.defineProperty(F,j,{get:()=>n[j],set:oe=>n[j]=oe,enumerable:!0})})}else e.exposed||(e.exposed={});B&&e.render===zt&&(e.render=B),x!=null&&(e.inheritAttrs=x),$&&(e.components=$),P&&(e.directives=P),b&&Ki(e)}function Em(e,t,n=zt){ye(e)&&(e=gi(e));for(const o in e){const s=e[o];let r;Pe(s)?"default"in s?r=xs(s.from||o,s.default,!0):r=xs(s.from||o):r=xs(s),Ye(r)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>r.value,set:i=>r.value=i}):t[o]=r}}function ul(e,t,n){qt(ye(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,n)}function Gu(e,t,n,o){let s=o.includes(".")?Vu(n,o):()=>n[o];if(Ve(e)){const r=t[e];Se(r)&&je(s,r)}else if(Se(e))je(s,e.bind(n));else if(Pe(e))if(ye(e))e.forEach(r=>Gu(r,t,n,o));else{const r=Se(e.handler)?e.handler.bind(n):t[e.handler];Se(r)&&je(s,r,e)}}function Yu(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!n&&!o?l=t:(l={},s.length&&s.forEach(c=>Ms(l,c,i,!0)),Ms(l,t,i)),Pe(t)&&r.set(t,l),l}function Ms(e,t,n,o=!1){const{mixins:s,extends:r}=t;r&&Ms(e,r,n,!0),s&&s.forEach(i=>Ms(e,i,n,!0));for(const i in t)if(!(o&&i==="expose")){const a=Tm[i]||n&&n[i];e[i]=a?a(e[i],t[i]):t[i]}return e}const Tm={data:dl,props:fl,emits:fl,methods:Ro,computed:Ro,beforeCreate:ut,created:ut,beforeMount:ut,mounted:ut,beforeUpdate:ut,updated:ut,beforeDestroy:ut,beforeUnmount:ut,destroyed:ut,unmounted:ut,activated:ut,deactivated:ut,errorCaptured:ut,serverPrefetch:ut,components:Ro,directives:Ro,watch:Im,provide:dl,inject:Am};function dl(e,t){return t?e?function(){return tt(Se(e)?e.call(this,this):e,Se(t)?t.call(this,this):t)}:t:e}function Am(e,t){return Ro(gi(e),gi(t))}function gi(e){if(ye(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function ut(e,t){return e?[...new Set([].concat(e,t))]:t}function Ro(e,t){return e?tt(Object.create(null),e,t):t}function fl(e,t){return e?ye(e)&&ye(t)?[...new Set([...e,...t])]:tt(Object.create(null),cl(e),cl(t??{})):t}function Im(e,t){if(!e)return t;if(!t)return e;const n=tt(Object.create(null),e);for(const o in t)n[o]=ut(e[o],t[o]);return n}function Ju(){return{app:null,config:{isNativeTag:fu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Rm=0;function Mm(e,t){return function(o,s=null){Se(o)||(o=tt({},o)),s!=null&&!Pe(s)&&(s=null);const r=Ju(),i=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Rm++,_component:o,_props:s,_container:null,_context:r,_instance:null,version:dg,get config(){return r.config},set config(u){},use(u,...d){return i.has(u)||(u&&Se(u.install)?(i.add(u),u.install(c,...d)):Se(u)&&(i.add(u),u(c,...d))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,d){return d?(r.components[u]=d,c):r.components[u]},directive(u,d){return d?(r.directives[u]=d,c):r.directives[u]},mount(u,d,f){if(!l){const m=c._ceVNode||$e(o,s);return m.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),e(m,u,f),l=!0,c._container=u,u.__vue_app__=c,ar(m.component)}},onUnmount(u){a.push(u)},unmount(){l&&(qt(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,d){return r.provides[u]=d,c},runWithContext(u){const d=so;so=c;try{return u()}finally{so=d}}};return c}}let so=null;const Om=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${At(t)}Modifiers`]||e[`${Sn(t)}Modifiers`];function Nm(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||Be;let s=n;const r=t.startsWith("update:"),i=r&&Om(o,t.slice(7));i&&(i.trim&&(s=n.map(u=>Ve(u)?u.trim():u)),i.number&&(s=n.map(tr)));let a,l=o[a=yr(t)]||o[a=yr(At(t))];!l&&r&&(l=o[a=yr(Sn(t))]),l&&qt(l,e,6,s);const c=o[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,qt(c,e,6,s)}}const Lm=new WeakMap;function Qu(e,t,n=!1){const o=n?Lm:t.emitsCache,s=o.get(e);if(s!==void 0)return s;const r=e.emits;let i={},a=!1;if(!Se(e)){const l=c=>{const u=Qu(c,t,!0);u&&(a=!0,tt(i,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!r&&!a?(Pe(e)&&o.set(e,null),null):(ye(r)?r.forEach(l=>i[l]=null):tt(i,r),Pe(e)&&o.set(e,i),i)}function rr(e,t){return!e||!Xs(t)?!1:(t=t.slice(2).replace(/Once$/,""),Le(e,t[0].toLowerCase()+t.slice(1))||Le(e,Sn(t))||Le(e,t))}function pl(e){const{type:t,vnode:n,proxy:o,withProxy:s,propsOptions:[r],slots:i,attrs:a,emit:l,render:c,renderCache:u,props:d,data:f,setupState:m,ctx:v,inheritAttrs:g}=e,h=As(e);let w,A;try{if(n.shapeFlag&4){const R=s||o,B=R;w=Ht(c.call(B,R,u,d,m,f,v)),A=a}else{const R=t;w=Ht(R.length>1?R(d,{attrs:a,slots:i,emit:l}):R(d,null)),A=t.props?a:Dm(a)}}catch(R){Ho.length=0,is(R,e,1),w=$e(cn)}let M=w;if(A&&g!==!1){const R=Object.keys(A),{shapeFlag:B}=M;R.length&&B&7&&(r&&R.some(Zs)&&(A=Pm(A,r)),M=io(M,A,!1,!0))}return n.dirs&&(M=io(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&Wi(M,n.transition),w=M,As(h),w}const Dm=e=>{let t;for(const n in e)(n==="class"||n==="style"||Xs(n))&&((t||(t={}))[n]=e[n]);return t},Pm=(e,t)=>{const n={};for(const o in e)(!Zs(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function Bm(e,t,n){const{props:o,children:s,component:r}=e,{props:i,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?hl(o,i,c):!!i;if(l&8){const u=t.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(Xu(i,o,f)&&!rr(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:o===i?!1:o?i?hl(o,i,c):!0:!!i;return!1}function hl(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let s=0;s<o.length;s++){const r=o[s];if(Xu(t,e,r)&&!rr(n,r))return!0}return!1}function Xu(e,t,n){const o=e[n],s=t[n];return n==="style"&&Pe(o)&&Pe(s)?!go(o,s):o!==s}function Fm({vnode:e,parent:t,suspense:n},o){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.suspense.vnode.el=s.el=o,e=s),s===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}const Zu={},ed=()=>Object.create(Zu),td=e=>Object.getPrototypeOf(e)===Zu;function jm(e,t,n,o=!1){const s={},r=ed();e.propsDefaults=Object.create(null),nd(e,t,s,r);for(const i in e.propsOptions[0])i in s||(s[i]=void 0);n?e.props=o?s:qh(s):e.type.props?e.props=s:e.props=r,e.attrs=r}function Hm(e,t,n,o){const{props:s,attrs:r,vnode:{patchFlag:i}}=e,a=Ne(s),[l]=e.propsOptions;let c=!1;if((o||i>0)&&!(i&16)){if(i&8){const u=e.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(rr(e.emitsOptions,f))continue;const m=t[f];if(l)if(Le(r,f))m!==r[f]&&(r[f]=m,c=!0);else{const v=At(f);s[v]=bi(l,a,v,m,e,!1)}else m!==r[f]&&(r[f]=m,c=!0)}}}else{nd(e,t,s,r)&&(c=!0);let u;for(const d in a)(!t||!Le(t,d)&&((u=Sn(d))===d||!Le(t,u)))&&(l?n&&(n[d]!==void 0||n[u]!==void 0)&&(s[d]=bi(l,a,d,void 0,e,!0)):delete s[d]);if(r!==a)for(const d in r)(!t||!Le(t,d))&&(delete r[d],c=!0)}c&&en(e.attrs,"set","")}function nd(e,t,n,o){const[s,r]=e.propsOptions;let i=!1,a;if(t)for(let l in t){if(Lo(l))continue;const c=t[l];let u;s&&Le(s,u=At(l))?!r||!r.includes(u)?n[u]=c:(a||(a={}))[u]=c:rr(e.emitsOptions,l)||(!(l in o)||c!==o[l])&&(o[l]=c,i=!0)}if(r){const l=Ne(n),c=a||Be;for(let u=0;u<r.length;u++){const d=r[u];n[d]=bi(s,l,d,c[d],e,!Le(c,d))}}return i}function bi(e,t,n,o,s,r){const i=e[n];if(i!=null){const a=Le(i,"default");if(a&&o===void 0){const l=i.default;if(i.type!==Function&&!i.skipFactory&&Se(l)){const{propsDefaults:c}=s;if(n in c)o=c[n];else{const u=as(s);o=c[n]=l.call(null,t),u()}}else o=l;s.ce&&s.ce._setProp(n,o)}i[0]&&(r&&!a?o=!1:i[1]&&(o===""||o===Sn(n))&&(o=!0))}return o}const Vm=new WeakMap;function od(e,t,n=!1){const o=n?Vm:t.propsCache,s=o.get(e);if(s)return s;const r=e.props,i={},a=[];let l=!1;if(!Se(e)){const u=d=>{l=!0;const[f,m]=od(d,t,!0);tt(i,f),m&&a.push(...m)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!r&&!l)return Pe(e)&&o.set(e,eo),eo;if(ye(r))for(let u=0;u<r.length;u++){const d=At(r[u]);ml(d)&&(i[d]=Be)}else if(r)for(const u in r){const d=At(u);if(ml(d)){const f=r[u],m=i[d]=ye(f)||Se(f)?{type:f}:tt({},f),v=m.type;let g=!1,h=!0;if(ye(v))for(let w=0;w<v.length;++w){const A=v[w],M=Se(A)&&A.name;if(M==="Boolean"){g=!0;break}else M==="String"&&(h=!1)}else g=Se(v)&&v.name==="Boolean";m[0]=g,m[1]=h,(g||Le(m,"default"))&&a.push(d)}}const c=[i,a];return Pe(e)&&o.set(e,c),c}function ml(e){return e[0]!=="$"&&!Lo(e)}const Yi=e=>e==="_"||e==="_ctx"||e==="$stable",Ji=e=>ye(e)?e.map(Ht):[Ht(e)],Um=(e,t,n)=>{if(t._n)return t;const o=kt((...s)=>Ji(t(...s)),n);return o._c=!1,o},sd=(e,t,n)=>{const o=e._ctx;for(const s in e){if(Yi(s))continue;const r=e[s];if(Se(r))t[s]=Um(s,r,o);else if(r!=null){const i=Ji(r);t[s]=()=>i}}},rd=(e,t)=>{const n=Ji(t);e.slots.default=()=>n},id=(e,t,n)=>{for(const o in t)(n||!Yi(o))&&(e[o]=t[o])},zm=(e,t,n)=>{const o=e.slots=ed();if(e.vnode.shapeFlag&32){const s=t._;s?(id(o,t,n),n&&bu(o,"_",s,!0)):sd(t,o)}else t&&rd(e,t)},Wm=(e,t,n)=>{const{vnode:o,slots:s}=e;let r=!0,i=Be;if(o.shapeFlag&32){const a=t._;a?n&&a===1?r=!1:id(s,t,n):(r=!t.$stable,sd(t,s)),i=t}else t&&(rd(e,t),i={default:1});if(r)for(const a in s)!Yi(a)&&i[a]==null&&delete s[a]},dt=Jm;function Km(e){return qm(e)}function qm(e,t){const n=nr();n.__VUE__=!0;const{insert:o,remove:s,patchProp:r,createElement:i,createText:a,createComment:l,setText:c,setElementText:u,parentNode:d,nextSibling:f,setScopeId:m=zt,insertStaticContent:v}=e,g=(S,C,D,U=null,K=null,G=null,V=void 0,Z=null,J=!!C.dynamicChildren)=>{if(S===C)return;S&&!Eo(S,C)&&(U=ve(S),Ee(S,K,G,!0),S=null),C.patchFlag===-2&&(J=!1,C.dynamicChildren=null);const{type:H,ref:de,shapeFlag:ee}=C;switch(H){case ir:h(S,C,D,U);break;case cn:w(S,C,D,U);break;case Cs:S==null&&A(C,D,U,V);break;case ae:$(S,C,D,U,K,G,V,Z,J);break;default:ee&1?B(S,C,D,U,K,G,V,Z,J):ee&6?P(S,C,D,U,K,G,V,Z,J):(ee&64||ee&128)&&H.process(S,C,D,U,K,G,V,Z,J,gt)}de!=null&&K?Bo(de,S&&S.ref,G,C||S,!C):de==null&&S&&S.ref!=null&&Bo(S.ref,null,G,S,!0)},h=(S,C,D,U)=>{if(S==null)o(C.el=a(C.children),D,U);else{const K=C.el=S.el;C.children!==S.children&&c(K,C.children)}},w=(S,C,D,U)=>{S==null?o(C.el=l(C.children||""),D,U):C.el=S.el},A=(S,C,D,U)=>{[S.el,S.anchor]=v(S.children,C,D,U,S.el,S.anchor)},M=({el:S,anchor:C},D,U)=>{let K;for(;S&&S!==C;)K=f(S),o(S,D,U),S=K;o(C,D,U)},R=({el:S,anchor:C})=>{let D;for(;S&&S!==C;)D=f(S),s(S),S=D;s(C)},B=(S,C,D,U,K,G,V,Z,J)=>{if(C.type==="svg"?V="svg":C.type==="math"&&(V="mathml"),S==null)N(C,D,U,K,G,V,Z,J);else{const H=S.el&&S.el._isVueCE?S.el:null;try{H&&H._beginPatch(),b(S,C,K,G,V,Z,J)}finally{H&&H._endPatch()}}},N=(S,C,D,U,K,G,V,Z)=>{let J,H;const{props:de,shapeFlag:ee,transition:fe,dirs:me}=S;if(J=S.el=i(S.type,G,de&&de.is,de),ee&8?u(J,S.children):ee&16&&y(S.children,J,null,U,K,xr(S,G),V,Z),me&&En(S,null,U,"created"),k(J,S,S.scopeId,V,U),de){for(const X in de)X!=="value"&&!Lo(X)&&r(J,X,null,de[X],G,U);"value"in de&&r(J,"value",null,de.value,G),(H=de.onVnodeBeforeMount)&&Bt(H,U,S)}me&&En(S,null,U,"beforeMount");const q=Gm(K,fe);q&&fe.beforeEnter(J),o(J,C,D),((H=de&&de.onVnodeMounted)||q||me)&&dt(()=>{try{H&&Bt(H,U,S),q&&fe.enter(J),me&&En(S,null,U,"mounted")}finally{}},K)},k=(S,C,D,U,K)=>{if(D&&m(S,D),U)for(let G=0;G<U.length;G++)m(S,U[G]);if(K){let G=K.subTree;if(C===G||cd(G.type)&&(G.ssContent===C||G.ssFallback===C)){const V=K.vnode;k(S,V,V.scopeId,V.slotScopeIds,K.parent)}}},y=(S,C,D,U,K,G,V,Z,J=0)=>{for(let H=J;H<S.length;H++){const de=S[H]=Z?Xt(S[H]):Ht(S[H]);g(null,de,C,D,U,K,G,V,Z)}},b=(S,C,D,U,K,G,V)=>{const Z=C.el=S.el;let{patchFlag:J,dynamicChildren:H,dirs:de}=C;J|=S.patchFlag&16;const ee=S.props||Be,fe=C.props||Be;let me;if(D&&Tn(D,!1),(me=fe.onVnodeBeforeUpdate)&&Bt(me,D,C,S),de&&En(C,S,D,"beforeUpdate"),D&&Tn(D,!0),(ee.innerHTML&&fe.innerHTML==null||ee.textContent&&fe.textContent==null)&&u(Z,""),H?_(S.dynamicChildren,H,Z,D,U,xr(C,K),G):V||j(S,C,Z,null,D,U,xr(C,K),G,!1),J>0){if(J&16)x(Z,ee,fe,D,K);else if(J&2&&ee.class!==fe.class&&r(Z,"class",null,fe.class,K),J&4&&r(Z,"style",ee.style,fe.style,K),J&8){const q=C.dynamicProps;for(let X=0;X<q.length;X++){const ie=q[X],he=ee[ie],ge=fe[ie];(ge!==he||ie==="value")&&r(Z,ie,he,ge,K,D)}}J&1&&S.children!==C.children&&u(Z,C.children)}else!V&&H==null&&x(Z,ee,fe,D,K);((me=fe.onVnodeUpdated)||de)&&dt(()=>{me&&Bt(me,D,C,S),de&&En(C,S,D,"updated")},U)},_=(S,C,D,U,K,G,V)=>{for(let Z=0;Z<C.length;Z++){const J=S[Z],H=C[Z],de=J.el&&(J.type===ae||!Eo(J,H)||J.shapeFlag&198)?d(J.el):D;g(J,H,de,null,U,K,G,V,!0)}},x=(S,C,D,U,K)=>{if(C!==D){if(C!==Be)for(const G in C)!Lo(G)&&!(G in D)&&r(S,G,C[G],null,K,U);for(const G in D){if(Lo(G))continue;const V=D[G],Z=C[G];V!==Z&&G!=="value"&&r(S,G,Z,V,K,U)}"value"in D&&r(S,"value",C.value,D.value,K)}},$=(S,C,D,U,K,G,V,Z,J)=>{const H=C.el=S?S.el:a(""),de=C.anchor=S?S.anchor:a("");let{patchFlag:ee,dynamicChildren:fe,slotScopeIds:me}=C;me&&(Z=Z?Z.concat(me):me),S==null?(o(H,D,U),o(de,D,U),y(C.children||[],D,de,K,G,V,Z,J)):ee>0&&ee&64&&fe&&S.dynamicChildren&&S.dynamicChildren.length===fe.length?(_(S.dynamicChildren,fe,D,K,G,V,Z),(C.key!=null||K&&C===K.subTree)&&Qi(S,C,!0)):j(S,C,D,de,K,G,V,Z,J)},P=(S,C,D,U,K,G,V,Z,J)=>{C.slotScopeIds=Z,S==null?C.shapeFlag&512?K.ctx.activate(C,D,U,V,J):W(C,D,U,K,G,V,J):O(S,C,J)},W=(S,C,D,U,K,G,V)=>{const Z=S.component=sg(S,U,K);if(qi(S)&&(Z.ctx.renderer=gt),ig(Z,!1,V),Z.asyncDep){if(K&&K.registerDep(Z,E,V),!S.el){const J=Z.subTree=$e(cn);w(null,J,C,D),S.placeholder=J.el}}else E(Z,S,C,D,K,G,V)},O=(S,C,D)=>{const U=C.component=S.component;if(Bm(S,C,D))if(U.asyncDep&&!U.asyncResolved){F(U,C,D);return}else U.next=C,U.update();else C.el=S.el,U.vnode=C},E=(S,C,D,U,K,G,V)=>{const Z=()=>{if(S.isMounted){let{next:ee,bu:fe,u:me,parent:q,vnode:X}=S;{const _e=ad(S);if(_e){ee&&(ee.el=X.el,F(S,ee,V)),_e.asyncDep.then(()=>{dt(()=>{S.isUnmounted||H()},K)});return}}let ie=ee,he;Tn(S,!1),ee?(ee.el=X.el,F(S,ee,V)):ee=X,fe&&ks(fe),(he=ee.props&&ee.props.onVnodeBeforeUpdate)&&Bt(he,q,ee,X),Tn(S,!0);const ge=pl(S),se=S.subTree;S.subTree=ge,g(se,ge,d(se.el),ve(se),S,K,G),ee.el=ge.el,ie===null&&Fm(S,ge.el),me&&dt(me,K),(he=ee.props&&ee.props.onVnodeUpdated)&&dt(()=>Bt(he,q,ee,X),K)}else{let ee;const{el:fe,props:me}=C,{bm:q,m:X,parent:ie,root:he,type:ge}=S,se=oo(C);Tn(S,!1),q&&ks(q),!se&&(ee=me&&me.onVnodeBeforeMount)&&Bt(ee,ie,C),Tn(S,!0);{he.ce&&he.ce._hasShadowRoot()&&he.ce._injectChildStyle(ge,S.parent?S.parent.type:void 0);const _e=S.subTree=pl(S);g(null,_e,D,U,S,K,G),C.el=_e.el}if(X&&dt(X,K),!se&&(ee=me&&me.onVnodeMounted)){const _e=C;dt(()=>Bt(ee,ie,_e),K)}(C.shapeFlag&256||ie&&oo(ie.vnode)&&ie.vnode.shapeFlag&256)&&S.a&&dt(S.a,K),S.isMounted=!0,C=D=U=null}};S.scope.on();const J=S.effect=new Su(Z);S.scope.off();const H=S.update=J.run.bind(J),de=S.job=J.runIfDirty.bind(J);de.i=S,de.id=S.uid,J.scheduler=()=>zi(de),Tn(S,!0),H()},F=(S,C,D)=>{C.component=S;const U=S.vnode.props;S.vnode=C,S.next=null,Hm(S,C.props,U,D),Wm(S,C.children,D),rn(),ol(S),an()},j=(S,C,D,U,K,G,V,Z,J=!1)=>{const H=S&&S.children,de=S?S.shapeFlag:0,ee=C.children,{patchFlag:fe,shapeFlag:me}=C;if(fe>0){if(fe&128){be(H,ee,D,U,K,G,V,Z,J);return}else if(fe&256){oe(H,ee,D,U,K,G,V,Z,J);return}}me&8?(de&16&&ce(H,K,G),ee!==H&&u(D,ee)):de&16?me&16?be(H,ee,D,U,K,G,V,Z,J):ce(H,K,G,!0):(de&8&&u(D,""),me&16&&y(ee,D,U,K,G,V,Z,J))},oe=(S,C,D,U,K,G,V,Z,J)=>{S=S||eo,C=C||eo;const H=S.length,de=C.length,ee=Math.min(H,de);let fe;for(fe=0;fe<ee;fe++){const me=C[fe]=J?Xt(C[fe]):Ht(C[fe]);g(S[fe],me,D,null,K,G,V,Z,J)}H>de?ce(S,K,G,!0,!1,ee):y(C,D,U,K,G,V,Z,J,ee)},be=(S,C,D,U,K,G,V,Z,J)=>{let H=0;const de=C.length;let ee=S.length-1,fe=de-1;for(;H<=ee&&H<=fe;){const me=S[H],q=C[H]=J?Xt(C[H]):Ht(C[H]);if(Eo(me,q))g(me,q,D,null,K,G,V,Z,J);else break;H++}for(;H<=ee&&H<=fe;){const me=S[ee],q=C[fe]=J?Xt(C[fe]):Ht(C[fe]);if(Eo(me,q))g(me,q,D,null,K,G,V,Z,J);else break;ee--,fe--}if(H>ee){if(H<=fe){const me=fe+1,q=me<de?C[me].el:U;for(;H<=fe;)g(null,C[H]=J?Xt(C[H]):Ht(C[H]),D,q,K,G,V,Z,J),H++}}else if(H>fe)for(;H<=ee;)Ee(S[H],K,G,!0),H++;else{const me=H,q=H,X=new Map;for(H=q;H<=fe;H++){const bt=C[H]=J?Xt(C[H]):Ht(C[H]);bt.key!=null&&X.set(bt.key,H)}let ie,he=0;const ge=fe-q+1;let se=!1,_e=0;const $n=new Array(ge);for(H=0;H<ge;H++)$n[H]=0;for(H=me;H<=ee;H++){const bt=S[H];if(he>=ge){Ee(bt,K,G,!0);continue}let Pt;if(bt.key!=null)Pt=X.get(bt.key);else for(ie=q;ie<=fe;ie++)if($n[ie-q]===0&&Eo(bt,C[ie])){Pt=ie;break}Pt===void 0?Ee(bt,K,G,!0):($n[Pt-q]=H+1,Pt>=_e?_e=Pt:se=!0,g(bt,C[Pt],D,null,K,G,V,Z,J),he++)}const Ha=se?Ym($n):eo;for(ie=Ha.length-1,H=ge-1;H>=0;H--){const bt=q+H,Pt=C[bt],Va=C[bt+1],Ua=bt+1<de?Va.el||ld(Va):U;$n[H]===0?g(null,Pt,D,Ua,K,G,V,Z,J):se&&(ie<0||H!==Ha[ie]?xe(Pt,D,Ua,2):ie--)}}},xe=(S,C,D,U,K=null)=>{const{el:G,type:V,transition:Z,children:J,shapeFlag:H}=S;if(H&6){xe(S.component.subTree,C,D,U);return}if(H&128){S.suspense.move(C,D,U);return}if(H&64){V.move(S,C,D,gt);return}if(V===ae){o(G,C,D);for(let ee=0;ee<J.length;ee++)xe(J[ee],C,D,U);o(S.anchor,C,D);return}if(V===Cs){M(S,C,D);return}if(U!==2&&H&1&&Z)if(U===0)Z.beforeEnter(G),o(G,C,D),dt(()=>Z.enter(G),K);else{const{leave:ee,delayLeave:fe,afterLeave:me}=Z,q=()=>{S.ctx.isUnmounted?s(G):o(G,C,D)},X=()=>{G._isLeaving&&G[pm](!0),ee(G,()=>{q(),me&&me()})};fe?fe(G,q,X):X()}else o(G,C,D)},Ee=(S,C,D,U=!1,K=!1)=>{const{type:G,props:V,ref:Z,children:J,dynamicChildren:H,shapeFlag:de,patchFlag:ee,dirs:fe,cacheIndex:me,memo:q}=S;if(ee===-2&&(K=!1),Z!=null&&(rn(),Bo(Z,null,D,S,!0),an()),me!=null&&(C.renderCache[me]=void 0),de&256){C.ctx.deactivate(S);return}const X=de&1&&fe,ie=!oo(S);let he;if(ie&&(he=V&&V.onVnodeBeforeUnmount)&&Bt(he,C,S),de&6)re(S.component,D,U);else{if(de&128){S.suspense.unmount(D,U);return}X&&En(S,null,C,"beforeUnmount"),de&64?S.type.remove(S,C,D,gt,U):H&&!H.hasOnce&&(G!==ae||ee>0&&ee&64)?ce(H,C,D,!1,!0):(G===ae&&ee&384||!K&&de&16)&&ce(J,C,D),U&&Ie(S)}const ge=q!=null&&me==null;(ie&&(he=V&&V.onVnodeUnmounted)||X||ge)&&dt(()=>{he&&Bt(he,C,S),X&&En(S,null,C,"unmounted"),ge&&(S.el=null)},D)},Ie=S=>{const{type:C,el:D,anchor:U,transition:K}=S;if(C===ae){le(D,U);return}if(C===Cs){R(S);return}const G=()=>{s(D),K&&!K.persisted&&K.afterLeave&&K.afterLeave()};if(S.shapeFlag&1&&K&&!K.persisted){const{leave:V,delayLeave:Z}=K,J=()=>V(D,G);Z?Z(S.el,G,J):J()}else G()},le=(S,C)=>{let D;for(;S!==C;)D=f(S),s(S),S=D;s(C)},re=(S,C,D)=>{const{bum:U,scope:K,job:G,subTree:V,um:Z,m:J,a:H}=S;gl(J),gl(H),U&&ks(U),K.stop(),G&&(G.flags|=8,Ee(V,S,C,D)),Z&&dt(Z,C),dt(()=>{S.isUnmounted=!0},C)},ce=(S,C,D,U=!1,K=!1,G=0)=>{for(let V=G;V<S.length;V++)Ee(S[V],C,D,U,K)},ve=S=>{if(S.shapeFlag&6)return ve(S.component.subTree);if(S.shapeFlag&128)return S.suspense.next();const C=f(S.anchor||S.el),D=C&&C[Uu];return D?f(D):C};let Ue=!1;const St=(S,C,D)=>{let U;S==null?C._vnode&&(Ee(C._vnode,null,null,!0),U=C._vnode.component):g(C._vnode||null,S,C,null,null,null,D),C._vnode=S,Ue||(Ue=!0,ol(U),Bu(),Ue=!1)},gt={p:g,um:Ee,m:xe,r:Ie,mt:W,mc:y,pc:j,pbc:_,n:ve,o:e};return{render:St,hydrate:void 0,createApp:Mm(St)}}function xr({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Tn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Gm(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Qi(e,t,n=!1){const o=e.children,s=t.children;if(ye(o)&&ye(s))for(let r=0;r<o.length;r++){const i=o[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Xt(s[r]),a.el=i.el),!n&&a.patchFlag!==-2&&Qi(i,a)),a.type===ir&&(a.patchFlag===-1&&(a=s[r]=Xt(a)),a.el=i.el),a.type===cn&&!a.el&&(a.el=i.el)}}function Ym(e){const t=e.slice(),n=[0];let o,s,r,i,a;const l=e.length;for(o=0;o<l;o++){const c=e[o];if(c!==0){if(s=n[n.length-1],e[s]<c){t[o]=s,n.push(o);continue}for(r=0,i=n.length-1;r<i;)a=r+i>>1,e[n[a]]<c?r=a+1:i=a;c<e[n[r]]&&(r>0&&(t[o]=n[r-1]),n[r]=o)}}for(r=n.length,i=n[r-1];r-- >0;)n[r]=i,i=t[i];return n}function ad(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ad(t)}function gl(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function ld(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?ld(t.subTree):null}const cd=e=>e.__isSuspense;function Jm(e,t){t&&t.pendingBranch?ye(e)?t.effects.push(...e):t.effects.push(e):sm(e)}const ae=Symbol.for("v-fgt"),ir=Symbol.for("v-txt"),cn=Symbol.for("v-cmt"),Cs=Symbol.for("v-stc"),Ho=[];let yt=null;function T(e=!1){Ho.push(yt=e?null:[])}function Qm(){Ho.pop(),yt=Ho[Ho.length-1]||null}let qo=1;function bl(e,t=!1){qo+=e,e<0&&yt&&t&&(yt.hasOnce=!0)}function ud(e){return e.dynamicChildren=qo>0?yt||eo:null,Qm(),qo>0&&yt&&yt.push(e),e}function L(e,t,n,o,s,r){return ud(p(e,t,n,o,s,r,!0))}function He(e,t,n,o,s){return ud($e(e,t,n,o,s,!0))}function Xi(e){return e?e.__v_isVNode===!0:!1}function Eo(e,t){return e.type===t.type&&e.key===t.key}const dd=({key:e})=>e??null,$s=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Ve(e)||Ye(e)||Se(e)?{i:rt,r:e,k:t,f:!!n}:e:null);function p(e,t=null,n=null,o=0,s=null,r=e===ae?0:1,i=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&dd(t),ref:t&&$s(t),scopeId:ju,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:o,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:rt};return a?(Zi(l,n),r&128&&e.normalize(l)):n&&(l.shapeFlag|=Ve(n)?8:16),qo>0&&!i&&yt&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&yt.push(l),l}const $e=Xm;function Xm(e,t=null,n=null,o=0,s=null,r=!1){if((!e||e===xm)&&(e=cn),Xi(e)){const a=io(e,t,!0);return n&&Zi(a,n),qo>0&&!r&&yt&&(a.shapeFlag&6?yt[yt.indexOf(e)]=a:yt.push(a)),a.patchFlag=-2,a}if(ug(e)&&(e=e.__vccOpts),t){t=Zm(t);let{class:a,style:l}=t;a&&!Ve(a)&&(t.class=Ce(a)),Pe(l)&&(Ui(l)&&!ye(l)&&(l=tt({},l)),t.style=Ge(l))}const i=Ve(e)?1:cd(e)?128:cm(e)?64:Pe(e)?4:Se(e)?2:0;return p(e,t,n,o,s,i,r,!0)}function Zm(e){return e?Ui(e)||td(e)?tt({},e):e:null}function io(e,t,n=!1,o=!1){const{props:s,ref:r,patchFlag:i,children:a,transition:l}=e,c=t?tg(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&dd(c),ref:t&&t.ref?n&&r?ye(r)?r.concat($s(t)):[r,$s(t)]:$s(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ae?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&io(e.ssContent),ssFallback:e.ssFallback&&io(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&o&&Wi(u,l.clone(u)),u}function De(e=" ",t=0){return $e(ir,null,e,t)}function eg(e,t){const n=$e(Cs,null,e);return n.staticCount=t,n}function ue(e="",t=!1){return t?(T(),He(cn,null,e)):$e(cn,null,e)}function Ht(e){return e==null||typeof e=="boolean"?$e(cn):ye(e)?$e(ae,null,e.slice()):Xi(e)?Xt(e):$e(ir,null,String(e))}function Xt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:io(e)}function Zi(e,t){let n=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(ye(t))n=16;else if(typeof t=="object")if(o&65){const s=t.default;s&&(s._c&&(s._d=!1),Zi(e,s()),s._c&&(s._d=!0));return}else{n=32;const s=t._;!s&&!td(t)?t._ctx=rt:s===3&&rt&&(rt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Se(t)?(t={default:t,_ctx:rt},n=32):(t=String(t),o&64?(n=16,t=[De(t)]):n=8);e.children=t,e.shapeFlag|=n}function tg(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const s in o)if(s==="class")t.class!==o.class&&(t.class=Ce([t.class,o.class]));else if(s==="style")t.style=Ge([t.style,o.style]);else if(Xs(s)){const r=t[s],i=o[s];i&&r!==i&&!(ye(r)&&r.includes(i))?t[s]=r?[].concat(r,i):i:i==null&&r==null&&!Zs(s)&&(t[s]=i)}else s!==""&&(t[s]=o[s])}return t}function Bt(e,t,n,o=null){qt(e,t,7,[n,o])}const ng=Ju();let og=0;function sg(e,t,n){const o=e.type,s=(t?t.appContext:e.appContext)||ng,r={uid:og++,vnode:e,type:o,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Eh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:od(o,s),emitsOptions:Qu(o,s),emit:null,emitted:null,propsDefaults:Be,inheritAttrs:o.inheritAttrs,ctx:Be,data:Be,props:Be,attrs:Be,slots:Be,refs:Be,setupState:Be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Nm.bind(null,r),e.ce&&e.ce(r),r}let st=null;const rg=()=>st||rt;let Os,yi;{const e=nr(),t=(n,o)=>{let s;return(s=e[n])||(s=e[n]=[]),s.push(o),r=>{s.length>1?s.forEach(i=>i(r)):s[0](r)}};Os=t("__VUE_INSTANCE_SETTERS__",n=>st=n),yi=t("__VUE_SSR_SETTERS__",n=>ao=n)}const as=e=>{const t=st;return Os(e),e.scope.on(),()=>{e.scope.off(),Os(t)}},yl=()=>{st&&st.scope.off(),Os(null)};function fd(e){return e.vnode.shapeFlag&4}let ao=!1;function ig(e,t=!1,n=!1){t&&yi(t);const{props:o,children:s}=e.vnode,r=fd(e);jm(e,o,r,t),zm(e,s,n||t);const i=r?ag(e,t):void 0;return t&&yi(!1),i}function ag(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Cm);const{setup:o}=n;if(o){rn();const s=e.setupContext=o.length>1?cg(e):null,r=as(e),i=rs(o,e,0,[e.props,s]),a=pu(i);if(an(),r(),(a||e.sp)&&!oo(e)&&Ki(e),a){if(i.then(yl,yl),t)return i.then(l=>{vl(e,l)}).catch(l=>{is(l,e,0)});e.asyncDep=i}else vl(e,i)}else pd(e)}function vl(e,t,n){Se(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Pe(t)&&(e.setupState=Lu(t)),pd(e)}function pd(e,t,n){const o=e.type;e.render||(e.render=o.render||zt);{const s=as(e);rn();try{$m(e)}finally{an(),s()}}}const lg={get(e,t){return ot(e,"get",""),e[t]}};function cg(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,lg),slots:e.slots,emit:e.emit,expose:t}}function ar(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Lu(Gh(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in jo)return jo[n](e)},has(t,n){return n in t||n in jo}})):e.proxy}function ug(e){return Se(e)&&"__vccOpts"in e}const ne=(e,t)=>Zh(e,t,ao),dg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let vi;const wl=typeof window<"u"&&window.trustedTypes;if(wl)try{vi=wl.createPolicy("vue",{createHTML:e=>e})}catch{}const hd=vi?e=>vi.createHTML(e):e=>e,fg="http://www.w3.org/2000/svg",pg="http://www.w3.org/1998/Math/MathML",Qt=typeof document<"u"?document:null,Sl=Qt&&Qt.createElement("template"),hg={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const s=t==="svg"?Qt.createElementNS(fg,e):t==="mathml"?Qt.createElementNS(pg,e):n?Qt.createElement(e,{is:n}):Qt.createElement(e);return e==="select"&&o&&o.multiple!=null&&s.setAttribute("multiple",o.multiple),s},createText:e=>Qt.createTextNode(e),createComment:e=>Qt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Qt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,s,r){const i=n?n.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===r||!(s=s.nextSibling)););else{Sl.innerHTML=hd(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);const a=Sl.content;if(o==="svg"||o==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},mg=Symbol("_vtc");function gg(e,t,n){const o=e[mg];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Ns=Symbol("_vod"),md=Symbol("_vsh"),bg={name:"show",beforeMount(e,{value:t},{transition:n}){e[Ns]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):To(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),To(e,!0),o.enter(e)):o.leave(e,()=>{To(e,!1)}):To(e,t))},beforeUnmount(e,{value:t}){To(e,t)}};function To(e,t){e.style.display=t?e[Ns]:"none",e[md]=!t}const yg=Symbol(""),vg=/(?:^|;)\s*display\s*:/;function wg(e,t,n){const o=e.style,s=Ve(n);let r=!1;if(n&&!s){if(t)if(Ve(t))for(const i of t.split(";")){const a=i.slice(0,i.indexOf(":")).trim();n[a]==null&&Mo(o,a,"")}else for(const i in t)n[i]==null&&Mo(o,i,"");for(const i in n){i==="display"&&(r=!0);const a=n[i];a!=null?_g(e,i,!Ve(t)&&t?t[i]:void 0,a)||Mo(o,i,a):Mo(o,i,"")}}else if(s){if(t!==n){const i=o[yg];i&&(n+=";"+i),o.cssText=n,r=vg.test(n)}}else t&&e.removeAttribute("style");Ns in e&&(e[Ns]=r?o.display:"",e[md]&&(o.display="none"))}const _l=/\s*!important$/;function Mo(e,t,n){if(ye(n))n.forEach(o=>Mo(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=Sg(e,t);_l.test(n)?e.setProperty(Sn(o),n.replace(_l,""),"important"):e[o]=n}}const kl=["Webkit","Moz","ms"],Cr={};function Sg(e,t){const n=Cr[t];if(n)return n;let o=At(t);if(o!=="filter"&&o in e)return Cr[t]=o;o=gu(o);for(let s=0;s<kl.length;s++){const r=kl[s]+o;if(r in e)return Cr[t]=r}return t}function _g(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&Ve(o)&&n===o}const xl="http://www.w3.org/1999/xlink";function Cl(e,t,n,o,s,r=Ch(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(xl,t.slice(6,t.length)):e.setAttributeNS(xl,t,n):n==null||r&&!yu(n)?e.removeAttribute(t):e.setAttribute(t,r?"":Mt(n)?String(n):n)}function $l(e,t,n,o,s){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?hd(n):n);return}const r=e.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=yu(n):n==null&&a==="string"?(n="",i=!0):a==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(s||t)}function yn(e,t,n,o){e.addEventListener(t,n,o)}function kg(e,t,n,o){e.removeEventListener(t,n,o)}const El=Symbol("_vei");function xg(e,t,n,o,s=null){const r=e[El]||(e[El]={}),i=r[t];if(o&&i)i.value=o;else{const[a,l]=Cg(t);if(o){const c=r[t]=Tg(o,s);yn(e,a,c,l)}else i&&(kg(e,a,i,l),r[t]=void 0)}}const Tl=/(?:Once|Passive|Capture)$/;function Cg(e){let t;if(Tl.test(e)){t={};let o;for(;o=e.match(Tl);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Sn(e.slice(2)),t]}let $r=0;const $g=Promise.resolve(),Eg=()=>$r||($g.then(()=>$r=0),$r=Date.now());function Tg(e,t){const n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;qt(Ag(o,n.value),t,5,[o])};return n.value=e,n.attached=Eg(),n}function Ag(e,t){if(ye(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(o=>s=>!s._stopped&&o&&o(s))}else return t}const Al=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ig=(e,t,n,o,s,r)=>{const i=s==="svg";t==="class"?gg(e,o,i):t==="style"?wg(e,n,o):Xs(t)?Zs(t)||xg(e,t,n,o,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Rg(e,t,o,i))?($l(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Cl(e,t,o,i,r,t!=="value")):e._isVueCE&&(Mg(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!Ve(o)))?$l(e,At(t),o,r,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Cl(e,t,o,i))};function Rg(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Al(t)&&Se(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Al(t)&&Ve(n)?!1:t in e}function Mg(e,t){const n=e._def.props;if(!n)return!1;const o=At(t);return Array.isArray(n)?n.some(s=>At(s)===o):Object.keys(n).some(s=>At(s)===o)}const lo=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ye(t)?n=>ks(t,n):t};function Og(e){e.target.composing=!0}function Il(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const on=Symbol("_assign");function Rl(e,t,n){return t&&(e=e.trim()),n&&(e=tr(e)),e}const vt={created(e,{modifiers:{lazy:t,trim:n,number:o}},s){e[on]=lo(s);const r=o||s.props&&s.props.type==="number";yn(e,t?"change":"input",i=>{i.target.composing||e[on](Rl(e.value,n,r))}),(n||r)&&yn(e,"change",()=>{e.value=Rl(e.value,n,r)}),t||(yn(e,"compositionstart",Og),yn(e,"compositionend",Il),yn(e,"change",Il))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:s,number:r}},i){if(e[on]=lo(i),e.composing)return;const a=(r||e.type==="number")&&!/^0\d/.test(e.value)?tr(e.value):e.value,l=t??"";if(a===l)return;const c=e.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===e&&e.type!=="range"&&(o&&t===n||s&&e.value.trim()===l)||(e.value=l)}},Ng={deep:!0,created(e,t,n){e[on]=lo(n),yn(e,"change",()=>{const o=e._modelValue,s=Go(e),r=e.checked,i=e[on];if(ye(o)){const a=Di(o,s),l=a!==-1;if(r&&!l)i(o.concat(s));else if(!r&&l){const c=[...o];c.splice(a,1),i(c)}}else if(mo(o)){const a=new Set(o);r?a.add(s):a.delete(s),i(a)}else i(gd(e,r))})},mounted:Ml,beforeUpdate(e,t,n){e[on]=lo(n),Ml(e,t,n)}};function Ml(e,{value:t,oldValue:n},o){e._modelValue=t;let s;if(ye(t))s=Di(t,o.props.value)>-1;else if(mo(t))s=t.has(o.props.value);else{if(t===n)return;s=go(t,gd(e,!0))}e.checked!==s&&(e.checked=s)}const Ol={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const s=mo(t);yn(e,"change",()=>{const r=Array.prototype.filter.call(e.options,i=>i.selected).map(i=>n?tr(Go(i)):Go(i));e[on](e.multiple?s?new Set(r):r:r[0]),e._assigning=!0,jn(()=>{e._assigning=!1})}),e[on]=lo(o)},mounted(e,{value:t}){Nl(e,t)},beforeUpdate(e,t,n){e[on]=lo(n)},updated(e,{value:t}){e._assigning||Nl(e,t)}};function Nl(e,t){const n=e.multiple,o=ye(t);if(!(n&&!o&&!mo(t))){for(let s=0,r=e.options.length;s<r;s++){const i=e.options[s],a=Go(i);if(n)if(o){const l=typeof a;l==="string"||l==="number"?i.selected=t.some(c=>String(c)===String(a)):i.selected=Di(t,a)>-1}else i.selected=t.has(a);else if(go(Go(i),t)){e.selectedIndex!==s&&(e.selectedIndex=s);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Go(e){return"_value"in e?e._value:e.value}function gd(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Lg=["ctrl","shift","alt","meta"],Dg={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Lg.some(n=>e[`${n}Key`]&&!t.includes(n))},ht=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=(s,...r)=>{for(let i=0;i<t.length;i++){const a=Dg[t[i]];if(a&&a(s,t))return}return e(s,...r)})},Pg={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Nn=(e,t)=>{const n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=s=>{if(!("key"in s))return;const r=Sn(s.key);if(t.some(i=>i===r||Pg[i]===r))return e(s)})},Bg=tt({patchProp:Ig},hg);let Ll;function Fg(){return Ll||(Ll=Km(Bg))}const jg=(...e)=>{const t=Fg().createApp(...e),{mount:n}=t;return t.mount=o=>{const s=Vg(o);if(!s)return;const r=t._component;!Se(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const i=n(s,!1,Hg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),i},t};function Hg(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Vg(e){return Ve(e)?document.querySelector(e):e}const Ug=/```[\s\S]*?```/g,zg=/`[^`\n]+`/g,Wg=/https?:\/\/\S+/gi,Kg=/\]\([^)\n]*\)/g,qg=/<[^>\n]+>/g,Gg=/^(?: {4}|\t)[^\n]*$/gm;function Yg(e){const t=[];for(const o of[Ug,zg,Wg,Kg,qg,Gg]){o.lastIndex=0;let s;for(;(s=o.exec(e))!==null;)t.push({from:s.index,to:s.index+s[0].length}),s[0].length===0&&o.lastIndex++}t.sort((o,s)=>o.from-s.from);const n=[];for(const o of t){const s=n[n.length-1];s&&o.from<=s.to?s.to=Math.max(s.to,o.to):n.push({from:o.from,to:o.to})}return n}function Jg(e,t){if(t.length===0)return e;const n=e.split("");for(const o of t)for(let s=o.from;s<o.to;s++)n[s]="\0";return n.join("")}const Yo="一-鿿㐀-䶿",Oo=new RegExp(`[${Yo}]`),Dl=new RegExp(`([${Yo}])([A-Za-z0-9])|([A-Za-z0-9])([${Yo}])`,"g"),Pl=new RegExp(`([${Yo}])([,.!?:;])`,"g"),Bl=new RegExp(`([,.!?:;])([${Yo}])`,"g"),Fl=/"([^"\n]*?)"/g,jl=/\.{3,}/g,Hl=/--/g,Vl={",":"，",".":"。","!":"！","?":"？",":":"：",";":"；"};function Qg(e){const t=[];Dl.lastIndex=0;let n;for(;(n=Dl.exec(e))!==null;){const o=n[0],s=o[0],r=o[1];t.push({from:n.index,to:n.index+o.length,code:"zh-ascii-spacing",original:o,replacement:`${s} ${r}`})}return t}function Xg(e){const t=[],n=new Set;Pl.lastIndex=0;let o;for(;(o=Pl.exec(e))!==null;){const s=o.index+o[1].length;if(n.has(s))continue;const r=Vl[o[2]];r&&(o[2]==="."&&e[s+1]==="."||(n.add(s),t.push({from:o.index,to:o.index+o[0].length,code:"zh-halfwidth-punct",original:o[0],replacement:o[1]+r})))}for(Bl.lastIndex=0;(o=Bl.exec(e))!==null;){const s=o.index;if(n.has(s))continue;const r=o.index>0?e[o.index-1]:"";if(/\d/.test(r))continue;const i=Vl[o[1]];i&&(o[1]==="."&&r==="."||(n.add(s),t.push({from:o.index,to:o.index+o[0].length,code:"zh-halfwidth-punct",original:o[0],replacement:i+o[2]})))}return t}function Zg(e){const t=[];Fl.lastIndex=0;let n;for(;(n=Fl.exec(e))!==null;){const o=n[1];Oo.test(o)&&t.push({from:n.index,to:n.index+n[0].length,code:"zh-straight-quote",original:n[0],replacement:`“${o}”`})}return t}function e0(e){const t=[];jl.lastIndex=0;let n;for(;(n=jl.exec(e))!==null;){const o=n.index>0?e[n.index-1]:"",s=e[n.index+n[0].length]??"";!Oo.test(o)&&!Oo.test(s)||t.push({from:n.index,to:n.index+n[0].length,code:"zh-dash-ellipsis",original:n[0],replacement:"……"})}for(Hl.lastIndex=0;(n=Hl.exec(e))!==null;){const o=n.index>0?e[n.index-1]:"",s=e[n.index+2]??"";!Oo.test(o)&&!Oo.test(s)||t.push({from:n.index,to:n.index+2,code:"zh-dash-ellipsis",original:"--",replacement:"——"})}return t}function bd(e){if(!e)return[];const t=Jg(e,Yg(e)),n=[...Qg(t),...Xg(t),...Zg(t),...e0(t)];return n.sort((o,s)=>o.from-s.from||o.code.localeCompare(s.code)),n}function t0(e){const t=bd(e);if(t.length===0)return{fixed:e,ranges:[]};const n=[];let o=1/0;for(let a=t.length-1;a>=0;a--){const l=t[a];l.to>o||(n.push(l),o=l.from)}n.reverse();let s=e,r=0;const i=[];for(const a of n){const l=a.from+r;s=s.slice(0,l)+a.replacement+s.slice(l+a.original.length);const c=l+a.replacement.length;i.push({from:l,to:c,code:a.code}),r+=a.replacement.length-a.original.length}return{fixed:s,ranges:i}}const n0=[/^https:\/\/mp\.weixin\.qq\.com\/s\//i,/^weixin:\/\/dl\//i,/^tel:/i,/^mailto:/i,/^#/],yd=new Set(Js.map(e=>e.name)),o0=/^(:{3,})[ \t]*([A-Za-z][\w-]*)?[ \t]*(.*?)[ \t]*$/,s0=/^(:{3,})[ \t]*$/,r0=/^([ \t]*)([-*+]|\d+\.)\s/;function i0(e){const t=[],n=e.split(`
`),o=[],s=new Array(n.length);let r=0;for(let l=0;l<n.length;l++)s[l]=r,r+=n[l].length+1;for(let l=0;l<n.length;l++){const c=n[l],u=s[l],d=u+c.length,f=r0.exec(c);if(f){let b=0;for(const _ of f[1])b+=_==="	"?4:1;if(b>=4){const _=u+f[1].length,x=_+f[2].length;t.push({from:_,to:x,severity:"warning",code:"list-too-deep",message:'列表嵌套 ≥ 3 层——公众号渲染时会被扁平化为带"·"前缀的段落，建议改为两级以内。'})}}const m=s0.exec(c);if(m){const b=m[1].length;if(o.length===0)continue;o[o.length-1].colons===b&&o.pop();continue}const v=o0.exec(c);if(!v)continue;const g=v[1].length,h=v[2]??"",w=v[3]??"";if(!h)continue;const A=u+c.indexOf(v[1]),M=c.indexOf(h,v[1].length),R=u+(M>=0?M:v[1].length+1),B=R+h.length;if(!yd.has(h)){const b=u0(h);t.push({from:R,to:B,severity:"error",code:"unknown-container",message:b?`未知容器 "${h}"——是否想写 "${b}"？合法名见 docs/contract/base.md 速查表。`:`未知容器 "${h}"。合法 fence 名见 docs/contract/base.md 速查表。`}),o.push({line:l,colons:g,name:h,openStart:A,openEnd:d});continue}const N=Ys(h);if(N.fenceLength!==g){const b=":".repeat(N.fenceLength);t.push({from:A,to:A+g,severity:"error",code:"fence-length-wrong",message:`容器 "${h}" 应使用 ${N.fenceLength} 个冒号（"${b}"）；当前是 ${g} 个。`+(h==="compare"?" compare 外层必须 ::::，内层 pros/cons 才能用 :::。":N.parent?` 作为 ${N.parent} 的子容器，必须用 :::。`:""),fix:{title:`改为 ${b}`,edits:[{from:A,to:A+g,insert:b}]}})}if(N.parent){const b=o[o.length-1];(!b||b.name!==N.parent)&&t.push({from:R,to:B,severity:"error",code:"nested-misplaced",message:`"${h}" 必须嵌在 ":::: ${N.parent}" 容器内；当前在外层孤立使用。`})}const k=l0(w);if(k&&N.variantKind){const b=Ut[N.variantKind];if(b&&!b.includes(k.value)){const _=u+c.indexOf("variant=")+8;t.push({from:_,to:_+k.value.length,severity:"warning",code:"unknown-variant",message:`未知 variant "${k.value}" —— "${h}" (${N.variantKind}) 合法取值：`+b.join(" / ")})}}else k&&!N.variantKind&&t.push({from:u+c.indexOf("variant="),to:u+c.indexOf("variant=")+8+k.value.length,severity:"info",code:"unknown-variant",message:`容器 "${h}" 不支持 variant 覆盖（无 variantKind），该声明会被忽略。`});if(h==="footer-cta"){const b=c0(w);if(b&&!n0.some(_=>_.test(b.value))){const _=c.indexOf("href=",c.indexOf(h)+h.length),x=u+_+5;t.push({from:x,to:x+(b.rawLen??b.value.length),severity:"warning",code:"footer-cta-outlink",message:`footer-cta 的 "${b.value}" 在公众号正文里不可直接点击——建议改为 mp.weixin.qq.com/s/* 同域文章链 / weixin://dl/* 小程序协议 / tel: / mailto: / 页内锚点 #；或把该 URL 放到公众号后台"阅读原文"位置。`})}}const y=/(?:^|\s)([a-zA-Z_][\w-]*):[ \t]/.exec(w);if(y&&!/=/.test(w.slice(0,y.index+y[0].length))){const b=c.indexOf(y[1]+":",c.indexOf(h)+h.length);if(b>=0){const _=u+b,x=_+y[1].length;t.push({from:_,to:x+1,severity:"warning",code:"yaml-style-attr",message:`open 行的 "${y[1]}:" 看起来像 YAML；容器属性只接受 "key=value" 写法。 若是标题文字请忽略此告警。`,fix:{title:`改为 ${y[1]}=`,edits:[{from:x,to:x+1,insert:"="}]}})}}o.push({line:l,colons:g,name:h,openStart:A,openEnd:d})}const i=e.length,a=i>0&&e[i-1]!==`
`;for(let l=o.length-1;l>=0;l--){const c=o[l],u=":".repeat(c.colons);t.push({from:c.openStart,to:c.openEnd,severity:"error",code:"unclosed-fence",message:`"${c.name}" 容器未闭合——末尾缺少 "${u}" 行。`,fix:{title:`在文末插入 ${u}`,edits:[{from:i,to:i,insert:(a?`
`:"")+u+`
`}]}})}for(const l of bd(e))t.push({from:l.from,to:l.to,severity:"info",code:l.code,message:a0[l.code](l.original,l.replacement),fix:{title:`改为 "${l.replacement}"`,edits:[{from:l.from,to:l.to,insert:l.replacement}]}});return t.sort((l,c)=>l.from-c.from)}const a0={"zh-ascii-spacing":e=>`中英混排建议加空格："${e}"——Toolbar"一键修复中文排版"可批量处理。`,"zh-halfwidth-punct":(e,t)=>`中文后请用全角标点："${e}" → "${t}"。`,"zh-straight-quote":(e,t)=>`含 CJK 引语建议用弯引号："${e}" → "${t}"。`,"zh-dash-ellipsis":(e,t)=>e.startsWith(".")?`中文省略号建议用 …… 代替 ${e.length} 个英文句点。`:`中文破折号建议用 —— 代替两个半角连字符（${e} → ${t}）。`};function l0(e){const t=/(^|\s)variant=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??""}:null}function c0(e){const t=/(^|\s)href=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??"",rawLen:t[2].length}:null}function u0(e){let t=null,n=3;for(const o of yd){const s=d0(e,o);s<n&&(n=s,t=o)}return t}function d0(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 3;const n=e.length,o=t.length,s=new Array((o+1)*2);for(let r=0;r<=o;r++)s[r]=r;for(let r=1;r<=n;r++){const i=(r&1)*(o+1),a=(r-1&1)*(o+1);s[i]=r;for(let l=1;l<=o;l++){const c=e[r-1]===t[l-1]?0:1;s[i+l]=Math.min(s[a+l]+1,s[i+l-1]+1,s[a+l-1]+c)}}return s[(n&1)*(o+1)+o]}function f0(e){const n=e.replace(/\$/g,"\\$").split(`
`);let o=-1;for(let s=0;s<n.length;s++){const r=n[s].trim();if(r.length!==0&&!/^:{3,}/.test(r)){o=s;break}}return o===-1?(n.length>=1&&(n[0]=`${n[0]}\${1}`),n.join(`
`)):(n[o]=`\${1:${n[o]}}`,n.join(`
`))}function p0(e){const t=document.createElement("div");t.style.cssText="max-width:360px;padding:4px 6px;";const n=document.createElement("div");n.style.cssText="font-size:12px;line-height:1.5;color:var(--editor-text,inherit);",n.textContent=e.description,t.appendChild(n);const o=document.createElement("pre");return o.style.cssText="margin:6px 0 0;padding:6px 8px;background:var(--editor-active,rgba(0,0,0,.04));border-left:2px solid var(--accent,#888);font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;color:var(--editor-text,inherit);overflow:hidden;text-overflow:ellipsis;",o.textContent=e.example,t.appendChild(o),t}const h0=Js.map(e=>({label:e.name,type:e.parent?"interface":"class",detail:e.category,info:()=>p0(e),apply:Cp(f0(e.example))})),m0=new Map(Js.filter(e=>e.variantKind!==void 0).map(e=>{const n=(Ut[e.variantKind]??[]).map(o=>({label:o,type:"enum",detail:e.variantKind}));return[e.name,n]}));function g0(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from);return/^(:{3,})\s+([A-Za-z][\w-]*)?$/.test(n)?{from:t.from,to:e.pos,options:h0,validFor:/^:{3,}\s+[A-Za-z0-9_-]*$/}:null}function b0(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from),o=/^(:{3,})\s+([A-Za-z][\w-]*)\b/.exec(t.text);if(!o)return null;const s=m0.get(o[2]);if(!s||s.length===0)return null;const r=/variant=(["']?)([A-Za-z0-9_-]*)$/.exec(n);if(!r)return null;const i=r[2];return{from:e.pos-i.length,to:e.pos,options:s,validFor:/^[A-Za-z0-9_-]*$/}}function y0(e){const t=e.state.doc.lineAt(e.pos),n=/^(:{3,})\s+([A-Za-z][\w-]*)/.exec(t.text);if(!n)return null;const o=Ys(n[2]);if(!o?.attrs?.length||e.pos-t.from<=n[0].length)return null;const r=e.matchBefore(/[A-Za-z][\w-]*/),i=r?.text??"",a=r?.from??e.pos,l=a-t.from,c=l>0?t.text[l-1]:"";if(c!==""&&!/\s/.test(c)||!e.explicit&&i.length===0)return null;const u=o.attrs.map(d=>{const f=d.example?`"${d.example.replace(/"/g,'\\"')}"`:"";return{label:d.key,type:"property",detail:d.enum?d.enum.join(" | "):d.example,info:d.description,apply:`${d.key}=${f}`}});return{from:a,to:e.pos,options:u,validFor:/^[A-Za-z0-9_-]*$/}}function v0(e){const t=e.state.doc.lineAt(e.pos),n=/^(:{3,})\s+([A-Za-z][\w-]*)/.exec(t.text);if(!n)return null;const o=Ys(n[2]);if(!o?.attrs?.length)return null;const s=t.text.slice(0,e.pos-t.from),r=/(\b[A-Za-z][\w-]*)=(["']?)([A-Za-z0-9_-]*)$/.exec(s);if(!r)return null;const[,i,,a]=r;if(i==="variant")return null;const l=o.attrs.find(u=>u.key===i);if(!l?.enum?.length)return null;const c=l.enum.map(u=>({label:u,type:"enum",detail:i}));return{from:e.pos-a.length,to:e.pos,options:c,validFor:/^[A-Za-z0-9_-]*$/}}function w0(){return kp({override:[b0,v0,y0,g0],activateOnTyping:!0,icons:!1})}const S0={error:"error",warning:"warning",info:"info"};function _0(){return xp(e=>{const t=e.state.doc.toString();return i0(t).map(o=>{const s={from:Math.min(o.from,t.length),to:Math.min(Math.max(o.to,o.from),t.length),severity:S0[o.severity],message:o.message,source:`wechat-typeset:${o.code}`};if(o.fix){const r=o.fix.edits,i=o.fix.title;s.actions=[{name:i,apply:a=>{const l=a.state.doc.length,c=r.filter(u=>u.from>=0&&u.to<=l&&u.from<=u.to).map(u=>({from:u.from,to:u.to,insert:u.insert}));c.length!==0&&a.dispatch({changes:c})}}]}return s})},{delay:500})}const Jo=/^(:{3,})\s+([A-Za-z][\w-]*)/,ea=/^(:{3,})\s*$/;function k0(e){const t=[],n=[];for(let o=1;o<=e.lines;o++){const s=e.line(o).text,r=ea.exec(s);if(r&&n.length>0){const a=r[1].length,l=n[n.length-1];if(l.colons===a){t[l.frameIdx].closeLine=o,n.pop();continue}}const i=Jo.exec(s);if(i){const a=i[1].length,l=n.length+1,c=t.length;t.push({name:i[2],colons:a,openLine:o,closeLine:-1,depth:l}),n.push({colons:a,frameIdx:c})}}return t}const x0=4;function Ul(e){const t=k0(e);if(t.length===0)return On.none;const n=new Array(e.lines+1).fill(0),o=new Set,s=new Set;for(const i of t){o.add(i.openLine),i.closeLine!==-1&&s.add(i.closeLine);const a=i.closeLine===-1?e.lines:i.closeLine;for(let l=i.openLine;l<=a;l++)i.depth>n[l]&&(n[l]=i.depth)}const r=new Ep;for(let i=1;i<=e.lines;i++){const a=n[i];if(a===0)continue;const c=[`wt-container-depth-${Math.min(a,x0)}`];o.has(i)?c.push("wt-container-open"):s.has(i)?c.push("wt-container-close"):c.push("wt-container-body");const u=e.line(i);r.add(u.from,u.from,On.line({class:c.join(" ")}))}return r.finish()}const C0=tu.define({create(e){return Ul(e.doc)},update(e,t){return t.docChanged?Ul(t.state.doc):e},provide:e=>ft.decorations.from(e)}),$0=ft.theme({".wt-container-depth-1":{backgroundColor:"rgba(99, 102, 241, 0.06)"},".wt-container-depth-2":{backgroundColor:"rgba(99, 102, 241, 0.11)"},".wt-container-depth-3":{backgroundColor:"rgba(99, 102, 241, 0.16)"},".wt-container-depth-4":{backgroundColor:"rgba(99, 102, 241, 0.21)"},".wt-container-open, .wt-container-close":{boxShadow:"inset 2px 0 0 var(--accent, #6366f1)",fontWeight:"600"},".wt-container-close":{opacity:"0.7"}}),E0=[C0,$0],T0=$p.of((e,t)=>{const n=e.doc,o=n.lineAt(t),s=Jo.exec(o.text);if(!s)return null;const i=[s[1].length];for(let a=o.number+1;a<=n.lines;a++){const l=n.line(a).text,c=ea.exec(l);if(c){const d=c[1].length;if(i[i.length-1]===d){if(i.pop(),i.length===0)return{from:o.to,to:n.line(a).to};continue}}const u=Jo.exec(l);u&&i.push(u[1].length)}return null});function A0(e,t,n){const o=[n];for(let s=t+1;s<=e.lines;s++){const r=e.line(s).text,i=ea.exec(r);if(i){const l=i[1].length;if(o[o.length-1]===l){if(o.pop(),o.length===0)return!0;continue}}const a=Jo.exec(r);a&&o.push(a[1].length)}return!1}const I0=ft.inputHandler.of((e,t,n,o)=>{if(o!==`
`||t!==n)return!1;const s=e.state.doc,r=s.lineAt(t);if(t!==r.to)return!1;const i=Jo.exec(r.text);if(!i)return!1;const a=i[1];return A0(s,r.number,a.length)?!1:(e.dispatch({changes:{from:t,to:n,insert:`

${a}
`},selection:{anchor:t+1},userEvent:"input.type"}),!0)}),R0=[E0,T0,I0],M0=5e3,wi=Tp.define(),O0=On.mark({class:"cm-zhfix-mark"}),N0=tu.define({create(){return On.none},update(e,t){e=e.map(t.changes);for(const n of t.effects)if(n.is(wi))if(n.value===null)e=On.none;else if(n.value.length===0)e=On.none;else{const o=n.value.map(s=>O0.range(s.from,s.to));e=On.set(o,!0)}return e},provide:e=>ft.decorations.from(e)}),L0=ft.theme({".cm-zhfix-mark":{backgroundColor:"var(--zhfix-bg, rgba(248, 196, 84, 0.32))",borderRadius:"2px",transition:"background-color 400ms ease-out"}}),D0=[N0,L0],Er=new WeakMap;function P0(e,t){if(t.length===0)return;e.dispatch({effects:wi.of(t)});const n=Er.get(e);n!==void 0&&window.clearTimeout(n);const o=window.setTimeout(()=>{Er.delete(e);try{e.dispatch({effects:wi.of(null)})}catch{}},M0);Er.set(e,o)}function B0(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}function Si(e,t){return Array(t+1).join(e)}function vd(e){return e.replace(/^\n*/,"")}function wd(e){for(var t=e.length;t>0&&e[t-1]===`
`;)t--;return e.substring(0,t)}function Sd(e){return wd(vd(e))}var F0=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function ta(e){return na(e,F0)}var _d=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function kd(e){return na(e,_d)}function j0(e){return Cd(e,_d)}var xd=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function H0(e){return na(e,xd)}function V0(e){return Cd(e,xd)}function na(e,t){return t.indexOf(e.nodeName)>=0}function Cd(e,t){return e.getElementsByTagName&&t.some(function(n){return e.getElementsByTagName(n).length})}var U0=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function $d(e){return U0.reduce(function(t,n){return t.replace(n[0],n[1])},e)}var at={};at.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};at.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+`
`}};at.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,n){var o=Number(t.nodeName.charAt(1));if(n.headingStyle==="setext"&&o<3){var s=Si(o===1?"=":"-",e.length);return`

`+e+`
`+s+`

`}else return`

`+Si("#",o)+" "+e+`

`}};at.blockquote={filter:"blockquote",replacement:function(e){return e=Sd(e).replace(/^/gm,"> "),`

`+e+`

`}};at.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;return n.nodeName==="LI"&&n.lastElementChild===t?`
`+e:`

`+e+`

`}};at.listItem={filter:"li",replacement:function(e,t,n){var o=n.bulletListMarker+"   ",s=t.parentNode;if(s.nodeName==="OL"){var r=s.getAttribute("start"),i=Array.prototype.indexOf.call(s.children,t);o=(r?Number(r)+i:i+1)+".  "}var a=/\n$/.test(e);return e=Sd(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(o.length)),o+e+(t.nextSibling?`
`:"")}};at.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};at.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){for(var o=t.firstChild.getAttribute("class")||"",s=(o.match(/language-(\S+)/)||[null,""])[1],r=t.firstChild.textContent,i=n.fence.charAt(0),a=3,l=new RegExp("^"+i+"{3,}","gm"),c;c=l.exec(r);)c[0].length>=a&&(a=c[0].length+1);var u=Si(i,a);return`

`+u+s+`
`+r.replace(/\n$/,"")+`
`+u+`

`}};at.horizontalRule={filter:"hr",replacement:function(e,t,n){return`

`+n.hr+`

`}};at.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var n=oa(t.getAttribute("href")),o=sa(Ls(t.getAttribute("title"))),s=o?' "'+o+'"':"";return"["+e+"]("+n+s+")"}};at.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,n){var o=oa(t.getAttribute("href")),s=Ls(t.getAttribute("title"));s&&(s=' "'+sa(s)+'"');var r,i;switch(n.linkReferenceStyle){case"collapsed":r="["+e+"][]",i="["+e+"]: "+o+s;break;case"shortcut":r="["+e+"]",i="["+e+"]: "+o+s;break;default:var a=this.references.length+1;r="["+e+"]["+a+"]",i="["+a+"]: "+o+s}return this.references.push(i),r},references:[],append:function(e){var t="";return this.references.length&&(t=`

`+this.references.join(`
`)+`

`,this.references=[]),t}};at.emphasis={filter:["em","i"],replacement:function(e,t,n){return e.trim()?n.emDelimiter+e+n.emDelimiter:""}};at.strong={filter:["strong","b"],replacement:function(e,t,n){return e.trim()?n.strongDelimiter+e+n.strongDelimiter:""}};at.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",n="`",o=e.match(/`+/gm)||[];o.indexOf(n)!==-1;)n=n+"`";return n+t+e+t+n}};at.image={filter:"img",replacement:function(e,t){var n=$d(Ls(t.getAttribute("alt"))),o=oa(t.getAttribute("src")||""),s=Ls(t.getAttribute("title")),r=s?' "'+sa(s)+'"':"";return o?"!["+n+"]("+o+r+")":""}};function Ls(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function oa(e){var t=e.replace(/([<>()])/g,"\\$1");return t.indexOf(" ")>=0?"<"+t+">":t}function sa(e){return e.replace(/"/g,'\\"')}function Ed(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}Ed.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;return(t=Tr(this.array,e,this.options))||(t=Tr(this._keep,e,this.options))||(t=Tr(this._remove,e,this.options))?t:this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};function Tr(e,t,n){for(var o=0;o<e.length;o++){var s=e[o];if(z0(s,t,n))return s}}function z0(e,t,n){var o=e.filter;if(typeof o=="string"){if(o===t.nodeName.toLowerCase())return!0}else if(Array.isArray(o)){if(o.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof o=="function"){if(o.call(e,t,n))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function W0(e){var t=e.element,n=e.isBlock,o=e.isVoid,s=e.isPre||function(d){return d.nodeName==="PRE"};if(!(!t.firstChild||s(t))){for(var r=null,i=!1,a=null,l=zl(a,t,s);l!==t;){if(l.nodeType===3||l.nodeType===4){var c=l.data.replace(/[ \r\n\t]+/g," ");if((!r||/ $/.test(r.data))&&!i&&c[0]===" "&&(c=c.substr(1)),!c){l=Ar(l);continue}l.data=c,r=l}else if(l.nodeType===1)n(l)||l.nodeName==="BR"?(r&&(r.data=r.data.replace(/ $/,"")),r=null,i=!1):o(l)||s(l)?(r=null,i=!0):r&&(i=!1);else{l=Ar(l);continue}var u=zl(a,l,s);a=l,l=u}r&&(r.data=r.data.replace(/ $/,""),r.data||Ar(r))}}function Ar(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function zl(e,t,n){return e&&e.parentNode===t||n(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}var ra=typeof window<"u"?window:{};function K0(){var e=ra.DOMParser,t=!1;try{new e().parseFromString("","text/html")&&(t=!0)}catch{}return t}function q0(){var e=function(){};return G0()?e.prototype.parseFromString=function(t){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(t),n.close(),n}:e.prototype.parseFromString=function(t){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(t),n.close(),n},e}function G0(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{ra.ActiveXObject&&(e=!0)}return e}var Y0=K0()?ra.DOMParser:q0();function J0(e,t){var n;if(typeof e=="string"){var o=Q0().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");n=o.getElementById("turndown-root")}else n=e.cloneNode(!0);return W0({element:n,isBlock:ta,isVoid:kd,isPre:t.preformattedCode?X0:null}),n}var Ir;function Q0(){return Ir=Ir||new Y0,Ir}function X0(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Z0(e,t){return e.isBlock=ta(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=e1(e),e.flankingWhitespace=t1(e,t),e}function e1(e){return!kd(e)&&!H0(e)&&/^\s*$/i.test(e.textContent)&&!j0(e)&&!V0(e)}function t1(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var n=n1(e.textContent);return n.leadingAscii&&Wl("left",e,t)&&(n.leading=n.leadingNonAscii),n.trailingAscii&&Wl("right",e,t)&&(n.trailing=n.trailingNonAscii),{leading:n.leading,trailing:n.trailing}}function n1(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}function Wl(e,t,n){var o,s,r;return e==="left"?(o=t.previousSibling,s=/ $/):(o=t.nextSibling,s=/^ /),o&&(o.nodeType===3?r=s.test(o.nodeValue):n.preformattedCode&&o.nodeName==="CODE"?r=!1:o.nodeType===1&&!ta(o)&&(r=s.test(o.textContent))),r}var o1=Array.prototype.reduce;function Ds(e){if(!(this instanceof Ds))return new Ds(e);var t={rules:at,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(n,o){return o.isBlock?`

`:""},keepReplacement:function(n,o){return o.isBlock?`

`+o.outerHTML+`

`:o.outerHTML},defaultReplacement:function(n,o){return o.isBlock?`

`+n+`

`:n}};this.options=B0({},t,e),this.rules=new Ed(this.options)}Ds.prototype={turndown:function(e){if(!i1(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=Td.call(this,new J0(e,this.options));return s1.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return $d(e)}};function Td(e){var t=this;return o1.call(e.childNodes,function(n,o){o=new Z0(o,t.options);var s="";return o.nodeType===3?s=o.isCode?o.nodeValue:t.escape(o.nodeValue):o.nodeType===1&&(s=r1.call(t,o)),Ad(n,s)},"")}function s1(e){var t=this;return this.rules.forEach(function(n){typeof n.append=="function"&&(e=Ad(e,n.append(t.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function r1(e){var t=this.rules.forNode(e),n=Td.call(this,e),o=e.flankingWhitespace;return(o.leading||o.trailing)&&(n=n.trim()),o.leading+t.replacement(n,e,this.options)+o.trailing}function Ad(e,t){var n=wd(e),o=vd(t),s=Math.max(e.length-n.length,t.length-o.length),r=`

`.substring(0,s);return n+r+o}function i1(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}const ia=new Ds({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",emDelimiter:"*",strongDelimiter:"**",hr:"---"});ia.remove(["style","script","meta","link","title"]);ia.addRule("wordXmlNs",{filter:e=>{const t=e.nodeName.toLowerCase();return t.startsWith("o:")||t.startsWith("w:")||t.startsWith("v:")},replacement:()=>""});function a1(e){if(!e||!e.trim())return"";const t=e.match(/<!--\s*StartFragment\s*-->/i),n=e.match(/<!--\s*EndFragment\s*-->/i);let o=e;if(t&&n){const r=(t.index??0)+t[0].length,i=n.index??e.length;o=e.slice(r,i)}return ia.turndown(o).replace(/\n{3,}/g,`

`).trim()}function l1(e){if(!e||!Array.from(e.types??[]).includes("text/html"))return!1;const o=e.getData("text/html").replace(/<meta[^>]*>/gi,"").trim();return!/^<p[^>]*>[^<]*<\/p>$/i.test(o)}const c1=2e5,u1=4e6,d1={name:"base64",async upload(e,t={}){const n=t.compressThreshold??32768;if(e.size<=n)return Kl(e);const o=t.quality??.85,s=t.targetBytes??c1;try{const r=await f1(e,o,s);if(r.length<e.size*1.5)return r}catch{}return Kl(e)}};async function f1(e,t,n){const o=await ql(e,t);if(n<=0||o.length<=n)return o;const s=[t-.15,t-.3,t-.45].map(i=>Math.max(.2,Math.min(.95,i))).filter((i,a,l)=>l.indexOf(i)===a);let r=o;for(const i of s){const a=await ql(e,i);if(a.length<=n)return a;a.length<r.length&&(r=a)}return r}function Kl(e){return new Promise((t,n)=>{const o=new FileReader;o.onload=()=>t(String(o.result)),o.onerror=()=>n(o.error??new Error("FileReader failed")),o.readAsDataURL(e)})}async function ql(e,t){const n=URL.createObjectURL(e);try{const o=await p1(n),s=document.createElement("canvas");s.width=o.naturalWidth,s.height=o.naturalHeight;const r=s.getContext("2d");if(!r)throw new Error("canvas 2d context unavailable");r.drawImage(o,0,0);const i=s.toDataURL("image/webp",t);if(!i.startsWith("data:image/webp"))throw new Error("webp encoding unsupported");return i}finally{URL.revokeObjectURL(n)}}function p1(e){return new Promise((t,n)=>{const o=new Image;o.onload=()=>t(o),o.onerror=()=>n(new Error("image decode failed")),o.src=e})}function _i(e){return/^image\//i.test(e.type)}let h1=d1;async function m1(e,t=h1,n){const o=u1,s=[];let r=0,i=null;for(let a=0;a<e.length;a++){const l=e[a];if(!_i(l))continue;const c=g1(l.name)??"image";try{const u=await t.upload(l,n);if(r+=u.length,s.push(`![${c}](${u})`),o>0&&r>o&&a<e.length-1){i=a+1;break}}catch(u){s.push(`<!-- image upload failed: ${l.name} (${String(u)}) -->`)}}if(i!==null){const a=e.length-i;s.push(`<!-- image budget exceeded: 累计 ${r} B 超过 ${o} B；剩余 ${a} 张未上传，请减图或切换 OSS provider -->`)}return s.join(`

`)}function g1(e){if(!e)return null;const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}function $t(e){try{return localStorage.getItem(e)}catch{return null}}function wt(e,t){try{return localStorage.setItem(e,t),!0}catch(n){return console.warn(`[storage] safeWrite failed: ${e}`,n),!1}}function aa(e){try{localStorage.removeItem(e)}catch{}}function la(e,t){const n=$t(e);if(n==null)return t;try{return JSON.parse(n)}catch{return t}}function ca(e,t){let n;try{n=JSON.stringify(t)}catch(o){return console.warn(`[storage] safeWriteJson stringify failed: ${e}`,o),!1}return wt(e,n)}function ua(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const Id="wechat-typeset:ui-theme";function b1(){return $t(Id)==="dark"?"dark":"light"}const co=te(b1());function Gl(e){document.documentElement.dataset.theme=e}function y1(){Gl(co.value),je(co,e=>{Gl(e),wt(Id,e)})}const v1=767,w1=100,S1=Me({__name:"Editor",props:{modelValue:{}},emits:["update:modelValue","scroll"],setup(e,{expose:t,emit:n}){const o=ft.theme({"&":{backgroundColor:"var(--editor-bg)",color:"var(--editor-text)",height:"100%",fontSize:"14px"},".cm-scroller":{overflow:"auto"},".cm-content":{caretColor:"var(--accent)"},"&.cm-focused .cm-cursor":{borderLeftColor:"var(--accent)"},".cm-gutters":{backgroundColor:"var(--editor-surface)",color:"var(--editor-linenum)",border:"none"},".cm-activeLine":{backgroundColor:"var(--editor-active)"},".cm-activeLineGutter":{backgroundColor:"transparent"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--editor-selection)"}}),s=new Mp;function r(b){return b==="dark"?uu:[]}const i=e,a=n,l=te(null);let c=null;function u(b){if(!c)return;const{from:_,to:x}=c.state.selection.main,P=(_>0&&c.state.doc.sliceString(Math.max(0,_-1),_)!==`
`?`
`:"")+b+(b.endsWith(`
`)?"":`
`);c.dispatch({changes:{from:_,to:x,insert:P},selection:{anchor:_+P.length}}),c.focus()}function d(){if(!c)return"";const{from:b,to:_}=c.state.selection.main;return b===_?"":c.state.doc.sliceString(b,_)}function f(){return c?.scrollDOM??null}function m(b){const _=f();if(!_)return;const x=_.scrollHeight-_.clientHeight;x<=0||(_.scrollTop=Math.max(0,Math.min(x,b*x)))}function v(){c?.focus()}function g(b){c&&P0(c,b)}t({insertAtCursor:u,getSelectedText:d,getScroller:f,scrollToRatio:m,focus:v,highlightZhFix:g});function h(b,_){const{from:x,to:$}=b.state.selection.main;b.dispatch({changes:{from:x,to:$,insert:_},selection:{anchor:x+_.length}})}function w(b){if(!b)return[];const _=[],x=new Set;for(const $ of Array.from(b.files??[]))_i($)&&!x.has($)&&(_.push($),x.add($));for(const $ of Array.from(b.items??[])){if($.kind!=="file")continue;const P=$.getAsFile();P&&_i(P)&&!x.has(P)&&(_.push(P),x.add(P))}return _}function A(b,_){const x=b.clipboardData,$=w(x);if($.length>0)return b.preventDefault(),R(_,$),!0;if(!l1(x))return!1;const P=x.getData("text/html"),W=a1(P);return W?(b.preventDefault(),h(_,W),!0):!1}function M(b,_){const x=w(b.dataTransfer);return x.length===0?!1:(b.preventDefault(),R(_,x),!0)}function R(b,_){const x=`<!-- 图片上传中… (${_.length}) -->`,{from:$}=b.state.selection.main;h(b,x),m1(_).then(P=>{try{const O=b.state.doc.toString().indexOf(x,Math.max(0,$-1));if(O<0)return;b.dispatch({changes:{from:O,to:O+x.length,insert:P}})}catch{}})}function B(){if(!c||window.innerWidth>v1)return;const b=window.visualViewport;if(!b||window.innerHeight-b.height<w1)return;const{head:x}=c.state.selection.main;c.dispatch({effects:ft.scrollIntoView(x,{y:"center"})})}let N=0;function k(b){const _=b.target;if(!_)return;const x=_.scrollHeight-_.clientHeight;if(x<=0)return;const $=Date.now();$-N<16||(N=$,a("scroll",_.scrollTop/x))}function y(b){if(!l.value)return;const _=nu.create({doc:b,extensions:[ou(),Ap(),Ip(),su(),ru.of([...iu,...au,...Rp,lu]),cu(),o,s.of(r(co.value)),w0(),_0(),R0,...D0,ft.lineWrapping,ft.updateListener.of(x=>{x.docChanged&&a("update:modelValue",x.state.doc.toString())}),ft.domEventHandlers({scroll:k,paste:(x,$)=>A(x,$),drop:(x,$)=>M(x,$)})]});c=new ft({state:_,parent:l.value})}return mt(()=>{y(i.modelValue),window.visualViewport?.addEventListener("resize",B)}),je(()=>i.modelValue,b=>{if(!c)return;const _=c.state.doc.toString();b!==_&&c.dispatch({changes:{from:0,to:_.length,insert:b}})}),je(co,b=>{c&&c.dispatch({effects:s.reconfigure(r(b))})}),Je(()=>{window.visualViewport?.removeEventListener("resize",B),c?.destroy(),c=null}),(b,_)=>(T(),L("div",{class:"editor-host",ref_key:"host",ref:l},null,512))}}),Oe=(e,t)=>{const n=e.__vccOpts||e;for(const[o,s]of t)n[o]=s;return n},_1=Oe(S1,[["__scopeId","data-v-8793c21d"]]),k1={class:"preview-shell"},x1=["aria-expanded"],C1={class:"tx-label"},$1={class:"tx-chev"},E1={key:0,class:"transparency-list"},T1={class:"tx-entry-label"},A1={class:"tx-entry-count"},I1=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1">
<style>
  /* 外框透明，由宿主 iframe.preview-frame 的 var(--preview-frame) 透出底色；
   * 不要给 html/body 加背景，否则会盖掉父级亮暗切换。 */
  html, body {
    margin: 0;
    padding: 0;
    background: transparent;
  }
  body {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  .phone-viewport {
    width: 375px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
    transform-origin: top center;
  }
  /* 当 iframe 宿主窄于 375 时，等比缩放，避免横向滚动 */
  @media (max-width: 374px) {
    body { align-items: flex-start; }
    .phone-viewport { transform: scale(calc(100vw / 375)); transform-origin: top left; }
  }
</style>
</head>
<body>
<div class="phone-viewport"></div>
</body>
</html>`,R1=Me({__name:"Preview",props:{html:{},patchLog:{}},emits:["scroll","ready"],setup(e,{expose:t,emit:n}){const o=e,s=te(!1),r=n,i=te(null);let a=!1;function l(){return i.value}function c(){return i.value?.contentDocument?.scrollingElement??i.value?.contentDocument?.documentElement??null}function u(g){const h=c();if(!h)return;const w=h.scrollHeight-h.clientHeight;w<=0||(h.scrollTop=Math.max(0,Math.min(w,g*w)))}t({getIframe:l,getScroller:c,scrollToRatio:u});function d(){const g=i.value?.contentDocument;if(!g)return!1;const h=g.querySelector(".phone-viewport");return h?(h.innerHTML=o.html,!0):!1}let f=0;function m(){const g=c();if(!g)return;const h=g.scrollHeight-g.clientHeight;if(h<=0)return;const w=Date.now();w-f<16||(f=w,r("scroll",g.scrollTop/h))}function v(){const g=i.value?.contentDocument;g&&(a=!0,g.addEventListener("scroll",m,{passive:!0}),d(),r("ready"))}return je(()=>o.html,()=>{a&&d()}),(g,h)=>(T(),L("div",k1,[h[4]||(h[4]=p("div",{class:"preview-meta mono"},[p("span",{class:"meta-dot"}),De(" 移动端视口 · 所见即所得 ")],-1)),p("iframe",{ref_key:"iframeEl",ref:i,class:"preview-frame wechat-typeset-preview",srcdoc:I1,sandbox:"allow-same-origin",title:"wechat-typeset 预览",onLoad:v},null,544),o.patchLog&&o.patchLog.total>0?(T(),L("div",{key:0,class:Ce(["transparency-strip",{expanded:s.value}])},[p("button",{class:"transparency-toggle","aria-expanded":s.value,onClick:h[0]||(h[0]=w=>s.value=!s.value)},[h[3]||(h[3]=p("span",{class:"tx-dot"},null,-1)),p("span",C1,[h[1]||(h[1]=De(" 渲染透明度 · 本次对 HTML 做了 ",-1)),p("b",null,z(o.patchLog.total),1),h[2]||(h[2]=De(" 处微信适配 ",-1))]),p("span",$1,z(s.value?"▾":"▸"),1)],8,x1),s.value?(T(),L("ul",E1,[(T(!0),L(ae,null,Te(o.patchLog.entries,(w,A)=>(T(),L("li",{key:A},[p("span",T1,z(w.label),1),p("span",A1,"× "+z(w.count),1)]))),128))])):ue("",!0)],2)):ue("",!0)]))}}),M1=Oe(R1,[["__scopeId","data-v-4e0fa808"]]),O1=["title","onClick","onMouseenter","onFocus"],N1={class:"card-foot"},L1={class:"card-name"},D1={class:"swatches"},P1=Me({__name:"ThemePicker",props:{modelValue:{}},emits:["update:modelValue","hover"],setup(e,{emit:t}){const n=e,o=t,s=ne(()=>Qs.map(d=>({id:d.id,name:d.name,description:d.description,primary:d.tokens.colors.primary,secondary:d.tokens.colors.secondary,accent:d.tokens.colors.accent,bg:d.tokens.colors.bg,bgSoft:d.tokens.colors.bgSoft,text:d.tokens.colors.text,textMuted:d.tokens.colors.textMuted,border:d.tokens.colors.border,tipAccent:d.tokens.colors.status.tip.accent,tipSoft:d.tokens.colors.status.tip.soft})));function r(d){d!==n.modelValue&&o("update:modelValue",d)}let i=null,a=null;function l(d){a=d,i===null&&(i=requestAnimationFrame(()=>{i=null,o("hover",a)}))}function c(d){l(d)}function u(){l(null)}return Je(()=>{i!==null&&(cancelAnimationFrame(i),i=null)}),(d,f)=>(T(),L("div",{class:"theme-grid",onMouseleave:u},[(T(!0),L(ae,null,Te(s.value,m=>(T(),L("button",{key:m.id,class:Ce(["theme-card",{active:m.id===n.modelValue}]),title:m.description,onClick:v=>r(m.id),onMouseenter:v=>c(m.id),onFocus:v=>c(m.id),onBlur:u},[p("span",{class:"preview",style:Ge({background:m.bg,color:m.text})},[p("span",{class:"prev-h2",style:Ge({color:m.primary,borderBottom:`2px solid ${m.primary}`})},"H2 标题",4),p("span",{class:"prev-quote",style:Ge({background:m.bgSoft,borderLeft:`3px solid ${m.primary}`,color:m.textMuted})},"引文示意",4),p("span",{class:"prev-tip",style:Ge({background:m.tipSoft,borderLeft:`3px solid ${m.tipAccent}`,color:m.tipAccent})},"tip 提示",4)],4),p("span",N1,[p("span",L1,z(m.name),1),p("span",D1,[p("span",{class:"sw",style:Ge({background:m.primary})},null,4),p("span",{class:"sw",style:Ge({background:m.secondary})},null,4),p("span",{class:"sw",style:Ge({background:m.accent})},null,4)])])],42,O1))),128))],32))}}),B1=Oe(P1,[["__scopeId","data-v-ab6cdfa1"]]),F1={class:"popover popover-menu"},j1={class:"menu-kbd"},H1={class:"menu-kbd"},V1=Me({__name:"OverflowMenu",props:{drawer:{},modKey:{}},emits:["toggle","action","close"],setup(e,{emit:t}){const n=t;function o(r){n("toggle",r),n("close")}function s(r){n("action",r),n("close")}return(r,i)=>(T(),L("div",F1,[i[30]||(i[30]=p("div",{class:"menu-section-head"},"视图",-1)),p("button",{class:"menu-item",onClick:i[0]||(i[0]=a=>o("drafts"))},[p("span",null,z(e.drawer.drafts?"关闭草稿列表":"草稿列表"),1)]),p("button",{class:"menu-item",onClick:i[1]||(i[1]=a=>o("components"))},[p("span",null,z(e.drawer.components?"关闭组件库":"插入组件"),1)]),p("button",{class:"menu-item",onClick:i[2]||(i[2]=a=>o("customizer"))},[p("span",null,z(e.drawer.customizer?"关闭自定义配色":"自定义配色"),1)]),p("button",{class:"menu-item",onClick:i[3]||(i[3]=a=>o("checklist"))},[p("span",null,z(e.drawer.checklist?"关闭发文清单":"发文清单"),1)]),p("button",{class:"menu-item",onClick:i[4]||(i[4]=a=>s("openHelp"))},[...i[17]||(i[17]=[p("span",null,"快捷键与帮助",-1),p("span",{class:"menu-kbd"},"?",-1)])]),i[31]||(i[31]=p("div",{class:"menu-sep"},null,-1)),i[32]||(i[32]=p("div",{class:"menu-section-head"},"内容操作",-1)),p("button",{class:"menu-item",onClick:i[5]||(i[5]=a=>s("loadSample"))},[...i[18]||(i[18]=[p("span",null,"载入当前主题示例",-1)])]),p("button",{class:"menu-item",onClick:i[6]||(i[6]=a=>s("loadReference"))},[...i[19]||(i[19]=[p("span",null,"载入当前主题组件参考",-1)])]),p("button",{class:"menu-item",onClick:i[7]||(i[7]=a=>s("loadShowcase"))},[...i[20]||(i[20]=[p("span",null,"载入全功能展示",-1)])]),p("button",{class:"menu-item",onClick:i[8]||(i[8]=a=>s("saveSelection"))},[...i[21]||(i[21]=[p("span",null,"保存选区为组件",-1)])]),p("button",{class:"menu-item",onClick:i[9]||(i[9]=a=>s("fixZhTypo"))},[...i[22]||(i[22]=[p("span",null,"一键修复中文排版",-1)])]),i[33]||(i[33]=p("div",{class:"menu-sep"},null,-1)),i[34]||(i[34]=p("div",{class:"menu-section-head"},"导出",-1)),p("button",{class:"menu-item",onClick:i[10]||(i[10]=a=>s("exportHtml"))},[i[23]||(i[23]=p("span",null,"导出 HTML",-1)),p("span",j1,z(e.modKey)+"⇧H",1)]),p("button",{class:"menu-item",onClick:i[11]||(i[11]=a=>s("exportMd"))},[i[24]||(i[24]=p("span",null,"导出 Markdown",-1)),p("span",H1,z(e.modKey)+"⇧M",1)]),p("button",{class:"menu-item",onClick:i[12]||(i[12]=a=>s("exportImage"))},[...i[25]||(i[25]=[p("span",null,"导出全文长图",-1)])]),p("button",{class:"menu-item",onClick:i[13]||(i[13]=a=>s("exportCoverHorizontal"))},[...i[26]||(i[26]=[p("span",null,"导出封面 · 横版 900×383",-1)])]),p("button",{class:"menu-item",onClick:i[14]||(i[14]=a=>s("exportCoverSquare"))},[...i[27]||(i[27]=[p("span",null,"导出封面 · 方版 900×900",-1)])]),p("button",{class:"menu-item",onClick:i[15]||(i[15]=a=>s("copyShareLink"))},[...i[28]||(i[28]=[p("span",null,"复制分享链接",-1)])]),i[35]||(i[35]=p("div",{class:"menu-sep"},null,-1)),p("button",{class:"menu-item danger",onClick:i[16]||(i[16]=a=>s("clear"))},[...i[29]||(i[29]=[p("span",null,"清空正文",-1)])])]))}}),U1=Oe(V1,[["__scopeId","data-v-52b02f6f"]]),Rd="wechat-typeset:drafts:index",ki="wechat-typeset:drafts:active",Un="wechat-typeset:drafts:body:",z1="wechat-typeset:drafts:",W1=()=>ua("d");function _n(){const e=la(Rd,[]);return Array.isArray(e)?e:[]}function Qo(e){return ca(Rd,e)}function da(e){const t=e.split(`
`).map(o=>o.trim()).find(o=>o.length>0);return t?t.replace(/^#+\s*/,"").slice(0,24):""}function vn(){return[..._n()].sort((t,n)=>n.updatedAt-t.updatedAt)}function Md(){return $t(ki)}function Ln(e){e?wt(ki,e):aa(ki)}function Xn(e){const t=_n().find(o=>o.id===e);if(!t)return null;const n=$t(`${Un}${e}`)??"";return{...t,body:n}}function ls(e){const t=W1(),n=Date.now(),o=e?.body??"",s=e?.tags?.filter(a=>a.trim().length>0),r={id:t,title:e?.title||da(o)||"未命名草稿",themeId:e?.themeId??"default",updatedAt:n,createdAt:n,...s&&s.length?{tags:s}:{}},i=_n();return i.unshift(r),Qo(i),wt(`${Un}${t}`,o),Ln(t),{...r,body:o}}function Vo(e,t){const n=_n(),o=n.findIndex(l=>l.id===e);if(o===-1)return!1;const s=Date.now(),r=n[o],i={...r,title:t.title??r.title,themeId:t.themeId??r.themeId,tags:t.tags??r.tags,updatedAt:s};n[o]=i;let a=Qo(n);if(typeof t.body=="string"&&(a=wt(`${Un}${e}`,t.body)&&a,!t.title)){const l=da(t.body);l&&(n[o]={...i,title:l},a=Qo(n)&&a)}return a}function K1(e={}){const t=e.query?.trim()??"",n=t?t.split(/\s+/):[],o=n.filter(l=>l.startsWith("#")).map(l=>l.slice(1).toLowerCase()).filter(Boolean),s=n.filter(l=>!l.startsWith("#")).map(l=>l.toLowerCase()).filter(Boolean),r=(e.tags??[]).map(l=>l.toLowerCase()).filter(Boolean),i=Array.from(new Set([...o,...r]));return vn().filter(l=>{if(i.length>0){const d=(l.tags??[]).map(f=>f.toLowerCase());if(!i.every(f=>d.includes(f)))return!1}if(s.length===0)return!0;const c=$t(`${Un}${l.id}`)??"",u=`${l.title}
${c}
${(l.tags??[]).join(" ")}`.toLowerCase();return s.every(d=>u.includes(d))})}function q1(){const e=new Set;for(const t of _n())for(const n of t.tags??[]){const o=n.trim();o&&e.add(o)}return Array.from(e).sort((t,n)=>t.localeCompare(n))}function Od(e){const t=_n().filter(n=>n.id!==e);Qo(t),aa(`${Un}${e}`),Md()===e&&Ln(t[0]?.id??null)}function G1(){const t=_n().map(n=>({...n,body:$t(`${Un}${n.id}`)??""}));return JSON.stringify({version:1,drafts:t},null,2)}function Nd(e){const t={added:0,skipped:0,invalid:0};let n;try{n=JSON.parse(e)}catch{return t}const o=Yl(n)&&Array.isArray(n.drafts)?n.drafts:[],s=_n();for(const r of o){if(!Yl(r)){t.invalid+=1;continue}const i=typeof r.id=="string"&&r.id.length>0?r.id:null;if(!i){t.invalid+=1;continue}if(s.some(m=>m.id===i)){t.skipped+=1;continue}const a=typeof r.body=="string"?r.body:"",l=typeof r.title=="string"&&r.title?r.title:da(a)||"未命名草稿",c=typeof r.themeId=="string"&&r.themeId?r.themeId:"default",u=typeof r.updatedAt=="number"?r.updatedAt:Date.now(),d=typeof r.createdAt=="number"?r.createdAt:Date.now(),f=Array.isArray(r.tags)?r.tags.filter(m=>typeof m=="string"&&m.trim().length>0):void 0;s.push({id:i,title:l,themeId:c,updatedAt:u,createdAt:d,...f&&f.length?{tags:f}:{}}),wt(`${Un}${i}`,a),t.added+=1}return Qo(s),t}function Yl(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Ld=["keep","tail-list","drop"],Rr={keep:"保留","tail-list":"尾注",drop:"丢弃"},Y1={keep:"正文保留蓝色超链，公众号读者不可点","tail-list":"正文加 [N]，文末追加参考链接",drop:"剥掉 <a>，只留文字"},J1=/^https?:\/\//i;function Q1(e,t){if(t==="keep"||!e)return{html:e,count:0};if(typeof DOMParser>"u")return{html:e,count:0};const n=new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,"text/html"),o=n.body,s=o.querySelector("ol[data-wx-outlink-list]"),i=Array.from(o.querySelectorAll("a")).map(l=>({el:l,href:l.getAttribute("href")??""})).filter(({el:l,href:c})=>J1.test(c)&&!l.hasAttribute("data-wx-footer-cta"));if(i.length===0)return{html:e,count:0};if(t==="drop"){for(const{el:l}of i){const c=l.parentNode;if(c){for(;l.firstChild;)c.insertBefore(l.firstChild,l);c.removeChild(l)}}return{html:o.innerHTML,count:i.length}}const a=n.createElement("ol");if(a.setAttribute("data-wx-outlink-list",""),i.forEach(({el:l,href:c},u)=>{const d=u+1,f=n.createElement("sup");f.setAttribute("data-wx-outlink-ref",String(d)),f.textContent=`[${d}]`;const m=l.parentNode;if(!m)return;for(;l.firstChild;)m.insertBefore(l.firstChild,l);m.insertBefore(f,l),m.removeChild(l);const v=n.createElement("li");v.textContent=c,a.appendChild(v)}),s)for(;a.firstChild;)s.appendChild(a.firstChild);else{const l=n.createElement("p");l.setAttribute("data-wx-outlink-heading",""),l.textContent="参考链接",o.appendChild(l),o.appendChild(a)}return{html:o.innerHTML,count:i.length}}const Jl=["theme","overflow","outlink","draft"];function X1(){const e={theme:te(!1),overflow:te(!1),outlink:te(!1),draft:te(!1)};function t(r){for(const i of Jl)e[i].value=i===r?!e[i].value:!1}function n(){for(const r of Jl)e[r].value=!1}function o(r){const i=r.target;i&&(i.closest("[data-popover-root]")||n())}function s(r){r.key==="Escape"&&n()}return je([e.theme,e.overflow,e.outlink,e.draft],([r,i,a,l])=>{r||i||a||l?(window.addEventListener("mousedown",o),window.addEventListener("keydown",s)):(window.removeEventListener("mousedown",o),window.removeEventListener("keydown",s))}),Je(()=>{window.removeEventListener("mousedown",o),window.removeEventListener("keydown",s)}),{theme:e.theme,overflow:e.overflow,outlink:e.outlink,draft:e.draft,toggleTheme:()=>t("theme"),toggleOverflow:()=>t("overflow"),toggleOutlink:()=>t("outlink"),toggleDraft:()=>t("draft"),closeAll:n}}function Z1(){if(typeof navigator>"u")return!1;const e=navigator.userAgentData;return e&&typeof e.platform=="string"?/mac/i.test(e.platform):/Mac|iPhone|iPad|iPod/.test(navigator.platform)}const eb=Z1(),_t=eb?"⌘":"Ctrl",tb={class:"zone zone-left"},nb={class:"pop-wrap","data-popover-root":""},ob=["title","aria-expanded"],sb={class:"draft-title"},rb={key:0,class:"popover popover-draft",role:"menu","aria-label":"草稿列表"},ib={key:0,class:"draft-pop-list"},ab=["aria-checked","onClick"],lb={class:"draft-pop-title"},cb={class:"draft-pop-meta mono"},ub={key:1,class:"draft-pop-empty"},db={class:"draft-pop-action-kbd mono"},fb={class:"zone zone-center"},pb={class:"pop-wrap","data-popover-root":""},hb={class:"theme-name-full"},mb={key:0,class:"custom-chip",title:"已有自定义配色"},gb={key:0,class:"popover popover-theme"},bb={class:"theme-popover-foot"},yb=["title"],vb=["title","aria-label"],wb={class:"zone zone-right"},Sb={class:"stats mono"},_b={class:"stat"},kb={class:"stat-num"},xb={class:"stat"},Cb={class:"stat-num"},$b=["title"],Eb={class:"saving-text"},Tb=["title","aria-label"],Ab={class:"kbd"},Ib=["title","aria-label"],Rb={key:0,class:"btn-icon-svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},Mb={key:1,class:"btn-icon-svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},Ob={class:"pop-wrap","data-popover-root":""},Nb={class:"copy-split","data-popover-root":""},Lb=["title"],Db=["title","aria-label","aria-expanded"],Pb={key:0,class:"popover popover-outlink",role:"menu","aria-label":"外链处理策略"},Bb=["aria-checked","onClick"],Fb={class:"outlink-radio","aria-hidden":"true"},jb={key:0,class:"outlink-radio-dot"},Hb={class:"outlink-label"},Vb={class:"outlink-hint"},Ub={key:0,class:"toolbar-banners",role:"region","aria-label":"工具栏提示"},zb={key:0,class:"error-banner",role:"alert"},Wb={class:"error-text"},Kb=["title"],qb={class:"error-text"},Gb=Me({__name:"Toolbar",props:{collapsed:{type:Boolean},draftTitle:{},activeDraftId:{},draftIndexTick:{},wordCount:{},readingTime:{},savingState:{},savingLabel:{},error:{},themeId:{},hasCustomColor:{type:Boolean},drawer:{},outlinkStrategy:{},uiTheme:{}},emits:["update:themeId","update:outlinkStrategy","update:uiTheme","toggle","action","hoverTheme","selectDraft","newDraft"],setup(e,{expose:t,emit:n}){const o=e,s=n,r=X1(),i=ne(()=>Qs.find(g=>g.id===o.themeId)?.name??o.themeId);function a(g){s("update:themeId",g),s("hoverTheme",null),r.theme.value=!1}function l(g){s("update:outlinkStrategy",g),r.outlink.value=!1}const c=ne(()=>(o.draftIndexTick,vn().slice(0,5)));function u(g){s("selectDraft",g),r.draft.value=!1}function d(){s("newDraft"),r.draft.value=!1}function f(){r.draft.value=!1,o.drawer.drafts||s("toggle","drafts")}function m(g){const h=new Date(g),w=new Date,A=h.toDateString()===w.toDateString(),M=h.getHours().toString().padStart(2,"0"),R=h.getMinutes().toString().padStart(2,"0");if(A)return`今天 ${M}:${R}`;const B=(h.getMonth()+1).toString().padStart(2,"0"),N=h.getDate().toString().padStart(2,"0");return`${B}-${N} ${M}:${R}`}function v(g){s("toggle",g),s("hoverTheme",null),r.theme.value=!1}return je(r.theme,g=>{g||s("hoverTheme",null)}),t({openOverflow(){r.overflow.value=!0,r.theme.value=!1}}),(g,h)=>(T(),L("header",{class:Ce(["toolbar",{"is-collapsed":o.collapsed}])},[h[39]||(h[39]=p("div",{class:"ruler"},null,-1)),p("div",tb,[h[23]||(h[23]=p("span",{class:"brand"},[p("span",{class:"brand-mark"},"wechat"),p("span",{class:"brand-dot"},"-"),p("span",{class:"brand-name"},"typeset")],-1)),p("div",nb,[p("button",{class:Ce(["draft-switch",{active:I(r).draft.value||o.drawer.drafts}]),title:`草稿列表  ${I(_t)}+Shift+D`,"aria-haspopup":"menu","aria-expanded":I(r).draft.value,onClick:h[0]||(h[0]=w=>I(r).toggleDraft())},[p("span",sb,z(o.draftTitle||"未命名草稿"),1),h[16]||(h[16]=p("span",{class:"draft-mobile-hint"},"导入",-1)),h[17]||(h[17]=p("span",{class:"chevron"},"▾",-1))],10,ob),I(r).draft.value?(T(),L("div",rb,[h[21]||(h[21]=p("div",{class:"draft-pop-head"},"最近草稿",-1)),c.value.length>0?(T(),L("ul",ib,[(T(!0),L(ae,null,Te(c.value,w=>(T(),L("li",{key:w.id},[p("button",{type:"button",class:Ce(["draft-pop-item",{active:w.id===o.activeDraftId}]),role:"menuitemradio","aria-checked":w.id===o.activeDraftId,onClick:A=>u(w.id)},[p("span",lb,z(w.title||"未命名草稿"),1),p("span",cb,z(m(w.updatedAt)),1)],10,ab)]))),128))])):(T(),L("div",ub,"暂无草稿")),h[22]||(h[22]=p("div",{class:"draft-pop-sep"},null,-1)),p("button",{type:"button",class:"draft-pop-action",onClick:d},[...h[18]||(h[18]=[p("span",{class:"draft-pop-action-glyph","aria-hidden":"true"},"＋",-1),p("span",null,"新建草稿",-1)])]),p("button",{type:"button",class:"draft-pop-action",onClick:f},[h[19]||(h[19]=p("span",{class:"draft-pop-action-glyph","aria-hidden":"true"},"⇉",-1)),h[20]||(h[20]=p("span",null,"全部草稿与搜索",-1)),p("span",db,z(I(_t))+"⇧D",1)])])):ue("",!0)])]),p("div",fb,[p("div",pb,[p("button",{class:Ce(["btn btn-ghost btn-theme",{active:I(r).theme.value}]),title:"切换主题",onClick:h[1]||(h[1]=w=>I(r).toggleTheme())},[h[24]||(h[24]=p("span",{class:"dot-mark"},null,-1)),p("span",hb,z(i.value),1),o.hasCustomColor?(T(),L("span",mb,"·自定义")):ue("",!0)],2),I(r).theme.value?(T(),L("div",gb,[$e(B1,{"model-value":o.themeId,"onUpdate:modelValue":a,onHover:h[2]||(h[2]=w=>s("hoverTheme",w))},null,8,["model-value"]),p("div",bb,[p("button",{type:"button",class:Ce(["theme-foot-btn",{active:o.drawer.customizer}]),title:`自定义配色  ${I(_t)}+Shift+C`,onClick:h[3]||(h[3]=w=>v("customizer"))},[...h[25]||(h[25]=[p("span",{class:"theme-foot-glyph","aria-hidden":"true"},"◐",-1),p("span",{class:"theme-foot-label"},"自定义配色",-1)])],10,yb),p("button",{type:"button",class:Ce(["theme-foot-btn",{active:o.drawer.personaStudio}]),title:"打开主题编辑器（创建 / 派生主题）",onClick:h[4]||(h[4]=w=>v("personaStudio"))},[...h[26]||(h[26]=[p("span",{class:"theme-foot-glyph","aria-hidden":"true"},"＋",-1),p("span",{class:"theme-foot-label"},"主题编辑器",-1)])],2)])])):ue("",!0)]),p("button",{class:Ce(["btn btn-ghost btn-insert",{active:o.drawer.components}]),title:`插入组件 / 主题模板  ${I(_t)}+Shift+P`,"aria-label":`插入组件 / 主题模板  ${I(_t)}+Shift+P`,onClick:h[5]||(h[5]=w=>s("toggle","components"))},[...h[27]||(h[27]=[p("span",{class:"btn-label"},"插入",-1),p("span",{class:"btn-glyph","aria-hidden":"true"},"＋",-1)])],10,vb)]),p("div",wb,[p("div",Sb,[p("span",_b,[p("span",kb,z(o.wordCount),1),h[28]||(h[28]=p("span",{class:"stat-lbl"},"字",-1))]),p("span",xb,[p("span",Cb,z(o.readingTime),1),h[29]||(h[29]=p("span",{class:"stat-lbl"},"分钟",-1))]),p("span",{class:Ce(["saving",o.savingState]),title:o.savingLabel},[h[30]||(h[30]=p("span",{class:"saving-dot"},null,-1)),p("span",Eb,z(o.savingLabel),1)],10,$b)]),p("button",{class:"btn btn-ghost icon btn-cmd",title:`命令面板  ${I(_t)}+K`,"aria-label":`命令面板 ${I(_t)}+K`,onClick:h[6]||(h[6]=w=>s("action","openCommand"))},[p("span",Ab,z(I(_t))+"K",1)],8,Tb),p("button",{class:Ce(["btn btn-ghost icon btn-ui-theme",{"is-dark":o.uiTheme==="dark"}]),title:o.uiTheme==="dark"?"切换到亮色界面":"切换到暗色界面","aria-label":o.uiTheme==="dark"?"切换到亮色界面":"切换到暗色界面",onClick:h[7]||(h[7]=w=>s("update:uiTheme",o.uiTheme==="dark"?"light":"dark"))},[o.uiTheme!=="dark"?(T(),L("svg",Rb,[...h[31]||(h[31]=[eg('<circle cx="8" cy="8" r="2.6" data-v-78f8c8b4></circle><line x1="8" y1="1.2" x2="8" y2="2.8" data-v-78f8c8b4></line><line x1="8" y1="13.2" x2="8" y2="14.8" data-v-78f8c8b4></line><line x1="1.2" y1="8" x2="2.8" y2="8" data-v-78f8c8b4></line><line x1="13.2" y1="8" x2="14.8" y2="8" data-v-78f8c8b4></line><line x1="3.2" y1="3.2" x2="4.4" y2="4.4" data-v-78f8c8b4></line><line x1="11.6" y1="11.6" x2="12.8" y2="12.8" data-v-78f8c8b4></line><line x1="12.8" y1="3.2" x2="11.6" y2="4.4" data-v-78f8c8b4></line><line x1="4.4" y1="11.6" x2="3.2" y2="12.8" data-v-78f8c8b4></line>',9)])])):(T(),L("svg",Mb,[...h[32]||(h[32]=[p("path",{d:"M13.6 9.4A5.6 5.6 0 1 1 6.6 2.4a4.6 4.6 0 0 0 7 7z"},null,-1)])]))],10,Ib),p("div",Ob,[p("button",{class:Ce(["btn btn-ghost icon btn-overflow",{active:I(r).overflow.value}]),title:"更多操作","aria-label":"更多操作",onClick:h[8]||(h[8]=w=>I(r).toggleOverflow())},[...h[33]||(h[33]=[p("svg",{class:"btn-icon-svg",width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true"},[p("circle",{cx:"3",cy:"8",r:"1.3"}),p("circle",{cx:"8",cy:"8",r:"1.3"}),p("circle",{cx:"13",cy:"8",r:"1.3"})],-1)])],2),I(r).overflow.value?(T(),He(U1,{key:0,drawer:o.drawer,"mod-key":I(_t),onToggle:h[9]||(h[9]=w=>s("toggle",w)),onAction:h[10]||(h[10]=w=>s("action",w)),onClose:h[11]||(h[11]=w=>I(r).overflow.value=!1)},null,8,["drawer","mod-key"])):ue("",!0)]),p("div",Nb,[p("button",{class:"btn btn-primary btn-copy-main",title:`复制到剪贴板  ${I(_t)}+Enter`,onClick:h[12]||(h[12]=w=>s("action","copy"))},[...h[34]||(h[34]=[p("span",null,"一键复制",-1)])],8,Lb),p("button",{class:Ce(["btn btn-primary btn-copy-chev",{active:I(r).outlink.value}]),title:`外链处理 · 当前：${I(Rr)[o.outlinkStrategy]}`,"aria-label":`外链处理 · 当前${I(Rr)[o.outlinkStrategy]}`,"aria-haspopup":"menu","aria-expanded":I(r).outlink.value,onClick:h[13]||(h[13]=w=>I(r).toggleOutlink())},[...h[35]||(h[35]=[p("svg",{width:"10",height:"10",viewBox:"0 0 10 10",fill:"currentColor","aria-hidden":"true"},[p("path",{d:"M2 4l3 3 3-3z"})],-1)])],10,Db),I(r).outlink.value?(T(),L("div",Pb,[h[36]||(h[36]=p("div",{class:"outlink-head"},"外链处理",-1)),(T(!0),L(ae,null,Te(I(Ld),w=>(T(),L("button",{key:w,type:"button",class:Ce(["outlink-item",{active:o.outlinkStrategy===w}]),role:"menuitemradio","aria-checked":o.outlinkStrategy===w,onClick:A=>l(w)},[p("span",Fb,[o.outlinkStrategy===w?(T(),L("span",jb)):ue("",!0)]),p("span",Hb,z(I(Rr)[w]),1),p("span",Vb,z(I(Y1)[w]),1)],10,Bb))),128))])):ue("",!0)])]),o.error||o.savingState==="error"?(T(),L("div",Ub,[o.error?(T(),L("div",zb,[h[37]||(h[37]=p("span",{class:"error-icon"},"!",-1)),p("span",Wb,z(o.error),1),p("button",{class:"error-close",onClick:h[14]||(h[14]=w=>s("action","dismissError"))},"知道了")])):ue("",!0),o.savingState==="error"?(T(),L("div",{key:1,class:"error-banner saving-error-banner",role:"alert",title:o.savingLabel||"草稿写盘失败 · 存储已满"},[h[38]||(h[38]=p("span",{class:"error-icon"},"!",-1)),p("span",qb,z(o.savingLabel||"草稿写盘失败 · 存储已满"),1),p("button",{class:"error-close",type:"button",onClick:h[15]||(h[15]=w=>s("toggle","drafts"))}," 查看草稿 ")],8,Kb)):ue("",!0)])):ue("",!0)],2))}}),Yb=Oe(Gb,[["__scopeId","data-v-78f8c8b4"]]),Jb=["aria-valuenow","aria-valuemin","aria-valuemax"],Qb=Me({__name:"PaneSplitter",props:{width:{},min:{},max:{}},emits:["update:width"],setup(e,{emit:t}){const n=e,o=t,s=te(!1),r=ne(()=>n.min??320);function i(M){return n.max!==void 0&&M>n.max?n.max:M<r.value?r.value:M}let a=0,l=0;function c(M){M.button===0&&(M.preventDefault(),s.value=!0,a=M.clientX,l=n.width??M.currentTarget.offsetLeft,document.body.classList.add("splitter-dragging"),window.addEventListener("mousemove",u),window.addEventListener("mouseup",d,{once:!0}))}function u(M){if(!s.value)return;const R=M.clientX-a;o("update:width",i(l+R))}function d(){s.value=!1,document.body.classList.remove("splitter-dragging"),window.removeEventListener("mousemove",u)}let f=0,m=0;function v(M){M.touches.length===1&&(s.value=!0,f=M.touches[0].clientX,m=n.width??M.currentTarget.offsetLeft)}function g(M){if(!s.value||M.touches.length!==1)return;const R=M.touches[0].clientX-f;o("update:width",i(m+R))}function h(){s.value=!1}function w(){o("update:width",null)}function A(M){let R=0;if(M.key==="ArrowLeft")R=-24;else if(M.key==="ArrowRight")R=24;else if(M.key==="PageDown")R=-96;else if(M.key==="PageUp")R=96;else if(M.key==="Home"){o("update:width",r.value),M.preventDefault();return}else if(M.key==="End"){n.max!==void 0&&o("update:width",n.max),M.preventDefault();return}else if(M.key==="Enter"||M.key===" "){o("update:width",null),M.preventDefault();return}else return;M.preventDefault();const B=n.width??M.currentTarget.offsetLeft;o("update:width",i(B+R))}return Je(()=>{window.removeEventListener("mousemove",u),document.body.classList.remove("splitter-dragging")}),(M,R)=>(T(),L("div",{class:Ce(["splitter",{dragging:s.value}]),role:"separator","aria-orientation":"vertical","aria-label":"拖动调整编辑栏宽度（双击恢复默认）","aria-valuenow":n.width??void 0,"aria-valuemin":r.value,"aria-valuemax":n.max,tabindex:"0",onMousedown:c,onTouchstart:v,onTouchmove:g,onTouchend:h,onTouchcancel:h,onDblclick:w,onKeydown:A},[...R[0]||(R[0]=[p("span",{class:"splitter-handle","aria-hidden":"true"},null,-1)])],42,Jb))}}),Xb=Oe(Qb,[["__scopeId","data-v-f53936eb"]]),Dd=.8,Ql=5*1024*1024;async function Zb(){try{if(navigator.storage&&typeof navigator.storage.estimate=="function"){const{usage:e=0,quota:t=0}=await navigator.storage.estimate();if(t>0){const n=e/t;return{supported:!0,used:e,quota:t,pct:n,warn:n>=Dd}}}}catch{}return ty()}function ey(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(1)} MB`:`${(e/(1024*1024*1024)).toFixed(1)} GB`}function ty(){let e=0;try{for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);if(!o||!o.startsWith("wechat-typeset:"))continue;const s=localStorage.getItem(o)??"";e+=(o.length+s.length)*2}}catch{e=0}const t=e/Ql;return{supported:!1,used:e,quota:Ql,pct:t,warn:t>=Dd}}function ny(){const e=te(0),t=te({supported:!1,used:0,quota:5*1024*1024,pct:0,warn:!1});function n(){e.value+=1,o()}async function o(){t.value=await Zb()}return mt(()=>{o()}),{drafts:ne(()=>(e.value,vn())),knownTags:ne(()=>(e.value,q1())),storageStat:t,storagePct:ne(()=>Math.min(100,Math.round(t.value.pct*100))),search(s){return e.value,K1(s)},read:Xn,create(s){const r=ls(s);return n(),r},update(s,r){Vo(s,r),n()},remove(s){Od(s),n()},exportJSON:G1,importJSON(s){const r=Nd(s);return n(),r},refresh:n,formatBytes:ey}}const oy="modulepreload",sy=function(e){return"https://cdn.jsdelivr.net/gh/lync-cyber/wechat-typeset@jsdelivr-cdn/"+e},Xl={},Hn=function(t,n,o){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=i?.nonce||i?.getAttribute("nonce");s=Promise.allSettled(n.map(l=>{if(l=sy(l),l in Xl)return;Xl[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":oy,c||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((f,m)=>{d.addEventListener("load",f),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return s.then(i=>{for(const a of i||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Qe="markdown-body",ry=375;function fa(e,t){const n=URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}function cs(e,t,n){fa(e,new Blob([t],{type:n}))}function iy(e,t,n={}){const o=ze(uy(e)),s=n.background??"#ffffff",r=n.color??"#222222",i=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=${ry},initial-scale=1"><title>${o}</title><style>body{margin:0;padding:24px 0;background:${s};color:${r};font-family:"PingFang SC","Microsoft YaHei",sans-serif;}.wechat-typeset-wrap{max-width:640px;margin:0 auto;padding:0 16px;}</style></head><body><div class="wechat-typeset-wrap">${t}</div></body></html>`;cs(e,i,"text/html")}function ay(e,t){cs(e,t,"text/markdown")}async function ly(e,t,n={}){try{const s=(await Hn(()=>import("./html2canvas.esm-BfxBtG_O.js"),[])).default,r=cy(e,n.background),i=await s(e,{backgroundColor:r,useCORS:!0,scale:2,logging:!1});return await new Promise(a=>{i.toBlob(l=>{if(!l){a({ok:!1,error:"toBlob 返回 null"});return}fa(t,l),a({ok:!0})},"image/png")})}catch(o){return{ok:!1,error:o?.message??"长图导出失败"}}}function cy(e,t){if(t)return t;if(t===null)return null;try{const n=e.ownerDocument,o=n?.defaultView;if(!o)return"#ffffff";const r=o.getComputedStyle(e).backgroundColor;if(r&&r!=="rgba(0, 0, 0, 0)"&&r!=="transparent")return r;const i=n.body?o.getComputedStyle(n.body).backgroundColor:"";return i&&i!=="rgba(0, 0, 0, 0)"&&i!=="transparent"?i:"#ffffff"}catch{return"#ffffff"}}function uy(e){const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}const dy=["aria-label"],fy={class:"panel-header__title tx-section"},py={class:"panel-header__meta"},hy={class:"panel-header__actions"},my=Me({__name:"PanelHeader",props:{title:{},ariaLabel:{},size:{default:"md"}},emits:["close"],setup(e,{emit:t}){const n=t;return(o,s)=>(T(),L("header",{class:Ce(["panel-header",`panel-header--${e.size}`]),"aria-label":e.ariaLabel},[Fo(o.$slots,"default",{},()=>[p("h3",fy,z(e.title),1)]),p("span",py,[Fo(o.$slots,"meta",{},void 0)]),p("span",hy,[Fo(o.$slots,"actions",{},void 0),p("button",{class:"panel-header__close btn-text",type:"button",onClick:s[0]||(s[0]=r=>n("close"))},"关闭")])],10,dy))}}),bo=Oe(my,[["__scopeId","data-v-b5ce295a"]]),gy={class:"drawer","aria-label":"草稿列表"},by={class:"head-tools"},yy={class:"search"},vy={class:"io-row"},wy={class:"btn btn-ghost"},Sy={key:0,class:"io-feedback"},_y={key:0,class:"tagbar","aria-label":"标签过滤"},ky=["aria-pressed","onClick"],xy={key:1,class:"quota-warn",role:"status"},Cy={class:"quota-warn-text"},$y={class:"list"},Ey=["onClick"],Ty={class:"item-main"},Ay=["onKeydown"],Iy=["title","onDblclick"],Ry={class:"summary"},My=["onClick"],Oy=["onKeydown"],Ny={key:3,class:"tags"},Ly=["onClick"],Dy={class:"meta mono"},Py={class:"meta-theme"},By={class:"item-actions"},Fy=["onClick"],jy=["onClick"],Hy=["onClick"],Vy={key:0,class:"empty"},Uy={key:1,class:"empty"},zy={class:"empty-body"},Wy={class:"empty-title mono"},Ky={class:"drawer-foot mono"},qy={class:"cap-bar"},Gy={class:"cap-text"},Yy={key:0,class:"dot",title:"浏览器未暴露 storage.estimate API，此为 localStorage 估算值"},Jy=Me({__name:"DraftDrawer",props:{activeId:{}},emits:["select","close","requestDelete","refresh"],setup(e,{expose:t,emit:n}){const o=e,s=n,r=ny(),i=r.drafts,a=r.knownTags,l=r.storageStat,c=r.storagePct,u=r.formatBytes,d=te(""),f=te(null),m=te(""),v=te(null),g=te(null),h=te(null);je(()=>o.activeId,()=>r.refresh());const w=ne(()=>{const le=d.value.trim(),re=h.value?[h.value]:void 0;return!le&&!re?r.drafts.value:r.search({query:le,tags:re})});function A(){r.refresh(),s("refresh")}function M(le){const re=new Date(le),ce=new Date,ve=re.toDateString()===ce.toDateString(),Ue=re.getHours().toString().padStart(2,"0"),St=re.getMinutes().toString().padStart(2,"0");if(ve)return`今天 ${Ue}:${St}`;const gt=(re.getMonth()+1).toString().padStart(2,"0"),Gt=re.getDate().toString().padStart(2,"0");return`${gt}-${Gt} ${Ue}:${St}`}function R(le){const ce=(r.read(le)?.body??"").split(`
`).map(ve=>ve.replace(/^#+\s*/,"").replace(/^\s*[-*>:]+\s*/,"").trim()).find(ve=>ve.length>0&&!ve.startsWith(":::"));return ce?ce.length>60?ce.slice(0,60)+"…":ce:"（空白草稿）"}function B(){const le=r.create({title:"新草稿",body:`# 新草稿
`});s("select",le.id)}function N(le,re){re.stopPropagation(),f.value=le.id,m.value=le.title||"",jn(()=>v.value?.focus())}function k(){if(!f.value)return;const le=m.value.trim()||"未命名草稿";r.update(f.value,{title:le}),f.value=null}function y(){f.value=null}function b(le,re){re.stopPropagation(),s("requestDelete",le.id,le.title||"未命名草稿")}const _=te(null),x=te([]),$=te(""),P=te(null);function W(le,re){re.stopPropagation(),_.value=le.id,x.value=[...le.tags??[]],$.value="",jn(()=>P.value?.focus())}function O(le){const re=le.trim();re&&(x.value.includes(re)||x.value.push(re))}function E(){$.value.split(/[,，\s]+/g).filter(re=>re.length>0).forEach(O),$.value=""}function F(le){if(le.key===","||le.key==="，"||le.key===" "){le.preventDefault(),E();return}le.key==="Backspace"&&$.value===""&&(le.preventDefault(),x.value.pop())}function j(le){x.value.splice(le,1)}function oe(){_.value!==null&&(E(),r.update(_.value,{tags:[...x.value]}),_.value=null,x.value=[])}function be(){_.value=null,x.value=[],$.value=""}function xe(le){h.value=h.value===le?null:le}function Ee(){cs(`wechat-typeset-drafts-${Date.now()}.json`,r.exportJSON(),"application/json")}function Ie(le){const re=le.target,ce=re.files?.[0];if(!ce)return;const ve=new FileReader;ve.onload=()=>{const Ue=r.importJSON(String(ve.result??""));g.value=`导入 ${Ue.added} 篇（跳过 ${Ue.skipped}，非法 ${Ue.invalid}）`,re.value="",setTimeout(()=>g.value=null,3200)},ve.readAsText(ce)}return t({refresh:A}),(le,re)=>(T(),L("aside",gy,[$e(bo,{title:"草稿",size:"sm",onClose:re[0]||(re[0]=ce=>s("close"))}),p("div",by,[p("button",{class:"btn btn-primary",onClick:B},"+ 新建"),p("div",yy,[re[6]||(re[6]=p("span",{class:"search-icon"},"⌕",-1)),et(p("input",{"onUpdate:modelValue":re[1]||(re[1]=ce=>d.value=ce),class:"search-input",type:"search",placeholder:"搜索标题 / 正文 / #标签","aria-label":"搜索草稿"},null,512),[[vt,d.value]])])]),p("div",vy,[p("button",{class:"btn btn-ghost",onClick:Ee},"导出 JSON"),p("label",wy,[re[7]||(re[7]=De(" 导入 JSON ",-1)),p("input",{type:"file",accept:"application/json",hidden:"",onChange:Ie},null,32)]),g.value?(T(),L("span",Sy,z(g.value),1)):ue("",!0)]),I(a).length>0?(T(),L("div",_y,[(T(!0),L(ae,null,Te(I(a),ce=>(T(),L("button",{key:ce,class:Ce(["tag-pill",{active:h.value===ce}]),"aria-pressed":h.value===ce,onClick:ve=>xe(ce)},"#"+z(ce),11,ky))),128))])):ue("",!0),I(l).warn?(T(),L("div",xy,[re[8]||(re[8]=p("span",{class:"quota-warn-icon","aria-hidden":"true"},"!",-1)),p("span",Cy," 存储占用 "+z(I(c))+"%，建议导出 JSON 并删除不再需要的草稿 ",1)])):ue("",!0),p("ul",$y,[(T(!0),L(ae,null,Te(w.value,ce=>(T(),L("li",{key:ce.id,class:Ce(["item",{active:ce.id===o.activeId}]),onClick:ve=>s("select",ce.id)},[p("div",Ty,[f.value===ce.id?(T(),L("div",{key:0,class:"rename-row",onClick:re[3]||(re[3]=ht(()=>{},["stop"]))},[et(p("input",{ref_for:!0,ref_key:"renameInputRef",ref:v,"onUpdate:modelValue":re[2]||(re[2]=ve=>m.value=ve),class:"rename-input",maxlength:"48",onKeydown:[Nn(ht(k,["prevent","stop"]),["enter"]),Nn(ht(y,["prevent","stop"]),["esc"])],onBlur:k},null,40,Ay),[[vt,m.value]])])):(T(),L("div",{key:1,class:"title",title:`双击重命名 · ${ce.title}`,onDblclick:ht(ve=>N(ce,ve),["stop"])},z(ce.title||"未命名"),41,Iy)),p("div",Ry,z(R(ce.id)),1),_.value===ce.id?(T(),L("div",{key:2,class:"tag-editor",onClick:re[5]||(re[5]=ht(()=>{},["stop"]))},[(T(!0),L(ae,null,Te(x.value,(ve,Ue)=>(T(),L("span",{key:`${ve}-${Ue}`,class:"tag-chip tag-chip-edit"},[De(" #"+z(ve)+" ",1),p("button",{type:"button",class:"tag-chip-remove",title:"删除此标签","aria-label":"删除标签",onClick:St=>j(Ue)},"×",8,My)]))),128)),et(p("input",{ref_for:!0,ref_key:"tagInputRef",ref:P,"onUpdate:modelValue":re[4]||(re[4]=ve=>$.value=ve),class:"tag-input",placeholder:"新标签 · Enter / 逗号 / 空格 添加","aria-label":"新标签",onKeydown:[Nn(ht(E,["prevent","stop"]),["enter"]),Nn(ht(be,["prevent","stop"]),["esc"]),F]},null,40,Oy),[[vt,$.value]]),p("button",{type:"button",class:"tag-editor-done",title:"完成",onClick:oe},"✓")])):ce.tags&&ce.tags.length>0?(T(),L("div",Ny,[(T(!0),L(ae,null,Te(ce.tags,ve=>(T(),L("span",{key:ve,class:"tag-chip",onClick:ht(Ue=>xe(ve),["stop"])},"#"+z(ve),9,Ly))),128))])):ue("",!0),p("div",Dy,[p("span",Py,z(ce.themeId),1),re[9]||(re[9]=p("span",{class:"dot"},"·",-1)),p("span",null,z(M(ce.updatedAt)),1)])]),p("div",By,[p("button",{class:Ce(["icon-btn",{active:_.value===ce.id}]),title:"编辑标签",onClick:ve=>W(ce,ve)},"#",10,Fy),p("button",{class:"icon-btn",title:"重命名",onClick:ve=>N(ce,ve)},"✎",8,jy),p("button",{class:"icon-btn danger",title:"删除",onClick:ve=>b(ce,ve)},"×",8,Hy)])],10,Ey))),128)),I(i).length===0?(T(),L("li",Vy,[p("div",{class:"empty-body"},[re[10]||(re[10]=p("div",{class:"empty-title"},"还没有草稿",-1)),re[11]||(re[11]=p("div",{class:"empty-hint"},"新建一篇开始，或者把旧 JSON 导进来继续写。",-1)),p("button",{class:"btn btn-primary",onClick:B},"新建第一篇")])])):w.value.length===0?(T(),L("li",Uy,[p("div",zy,[p("div",Wy,'没有匹配 "'+z(d.value)+'" 的草稿',1)])])):ue("",!0)]),p("footer",Ky,[p("div",qy,[p("div",{class:"cap-fill",style:Ge({width:I(c)+"%"})},null,4)]),p("div",Gy,[p("span",null,z(I(i).length)+" 篇",1),re[12]||(re[12]=p("span",{class:"dot"},"·",-1)),p("span",null,[De(z(I(c))+"% · "+z(I(u)(I(l).used))+" / "+z(I(u)(I(l).quota))+" ",1),I(l).supported?ue("",!0):(T(),L("span",Yy,"估算"))])])])]))}}),Qy=Oe(Jy,[["__scopeId","data-v-f74103a6"]]),Xy=[{id:"warm",name:"温暖",description:"暖橙 + 奶油黄，适合生活美学",primary:"#d98141",secondary:"#b96234",accent:"#efb758"},{id:"cool",name:"冷静",description:"青绿 + 深蓝，技术/产品稳重感",primary:"#2d6fdd",secondary:"#1f3b70",accent:"#4ec9b0"},{id:"morandi",name:"莫兰迪",description:"低饱和灰粉 + 灰绿，克制优雅",primary:"#a88b8a",secondary:"#6b7c7b",accent:"#c9b9a0"},{id:"clash",name:"撞色",description:"高饱和撞色，运营号放大表达",primary:"#e23e57",secondary:"#522546",accent:"#f8b400"},{id:"sophisticated-gray",name:"高级灰",description:"深灰 + 金点缀，商务深度",primary:"#3a3d42",secondary:"#1f2124",accent:"#c9a96c"},{id:"japanese",name:"日系",description:"樱粉 + 淡黄 + 浅竹青",primary:"#d67b8c",secondary:"#a85a6a",accent:"#8ba888"},{id:"nordic",name:"北欧",description:"雾蓝 + 浅灰 + 木色",primary:"#4a7590",secondary:"#2e4a5c",accent:"#c7a97a"},{id:"black-gold",name:"黑金",description:"深黑 + 金，奢侈品调性",primary:"#c9a96c",secondary:"#1a1a1a",accent:"#f4dfa3",dark:!0},{id:"porcelain",name:"青花",description:"深青 + 瓷白 + 赭红",primary:"#2a5b8a",secondary:"#143154",accent:"#b1413a"},{id:"neo-chinese",name:"新中式",description:"胭脂红 + 墨绿 + 米黄",primary:"#9b2f2b",secondary:"#3e4e3a",accent:"#d9b26a"}],{min:Zy,max:ev}=Math,Bn=(e,t=0,n=1)=>Zy(ev(t,e),n),pa=e=>{e._clipped=!1,e._unclipped=e.slice(0);for(let t=0;t<=3;t++)t<3?((e[t]<0||e[t]>255)&&(e._clipped=!0),e[t]=Bn(e[t],0,255)):t===3&&(e[t]=Bn(e[t],0,1));return e},Pd={};for(let e of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])Pd[`[object ${e}]`]=e.toLowerCase();function Ae(e){return Pd[Object.prototype.toString.call(e)]||"object"}const ke=(e,t=null)=>e.length>=3?Array.prototype.slice.call(e):Ae(e[0])=="object"&&t?t.split("").filter(n=>e[0][n]!==void 0).map(n=>e[0][n]):e[0].slice(0),yo=e=>{if(e.length<2)return null;const t=e.length-1;return Ae(e[t])=="string"?e[t].toLowerCase():null},{PI:lr,min:Bd,max:Fd}=Math,Ct=e=>Math.round(e*100)/100,xi=e=>Math.round(e*100)/100,Zt=lr*2,Mr=lr/3,tv=lr/180,nv=180/lr;function jd(e){return[...e.slice(0,3).reverse(),...e.slice(3)]}const we={format:{},autodetect:[]};class Q{constructor(...t){const n=this;if(Ae(t[0])==="object"&&t[0].constructor&&t[0].constructor===this.constructor)return t[0];let o=yo(t),s=!1;if(!o){s=!0,we.sorted||(we.autodetect=we.autodetect.sort((r,i)=>i.p-r.p),we.sorted=!0);for(let r of we.autodetect)if(o=r.test(...t),o)break}if(we.format[o]){const r=we.format[o].apply(null,s?t:t.slice(0,-1));n._rgb=pa(r)}else throw new Error("unknown format: "+t);n._rgb.length===3&&n._rgb.push(1)}toString(){return Ae(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}}const ov="3.2.0",pe=(...e)=>new Q(...e);pe.version=ov;const uo={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},sv=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,rv=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,Hd=e=>{if(e.match(sv)){(e.length===4||e.length===7)&&(e=e.substr(1)),e.length===3&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const t=parseInt(e,16),n=t>>16,o=t>>8&255,s=t&255;return[n,o,s,1]}if(e.match(rv)){(e.length===5||e.length===9)&&(e=e.substr(1)),e.length===4&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=parseInt(e,16),n=t>>24&255,o=t>>16&255,s=t>>8&255,r=Math.round((t&255)/255*100)/100;return[n,o,s,r]}throw new Error(`unknown hex color: ${e}`)},{round:bs}=Math,Vd=(...e)=>{let[t,n,o,s]=ke(e,"rgba"),r=yo(e)||"auto";s===void 0&&(s=1),r==="auto"&&(r=s<1?"rgba":"rgb"),t=bs(t),n=bs(n),o=bs(o);let a="000000"+(t<<16|n<<8|o).toString(16);a=a.substr(a.length-6);let l="0"+bs(s*255).toString(16);switch(l=l.substr(l.length-2),r.toLowerCase()){case"rgba":return`#${a}${l}`;case"argb":return`#${l}${a}`;default:return`#${a}`}};Q.prototype.name=function(){const e=Vd(this._rgb,"rgb");for(let t of Object.keys(uo))if(uo[t]===e)return t.toLowerCase();return e};we.format.named=e=>{if(e=e.toLowerCase(),uo[e])return Hd(uo[e]);throw new Error("unknown color name: "+e)};we.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&Ae(e)==="string"&&uo[e.toLowerCase()])return"named"}});Q.prototype.alpha=function(e,t=!1){return e!==void 0&&Ae(e)==="number"?t?(this._rgb[3]=e,this):new Q([this._rgb[0],this._rgb[1],this._rgb[2],e],"rgb"):this._rgb[3]};Q.prototype.clipped=function(){return this._rgb._clipped||!1};const Wt={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},iv=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function nn(e){const t=iv.get(String(e).toLowerCase());if(!t)throw new Error("unknown Lab illuminant "+e);Wt.labWhitePoint=e,Wt.Xn=t[0],Wt.Zn=t[1]}function Xo(){return Wt.labWhitePoint}const ha=(...e)=>{e=ke(e,"lab");const[t,n,o]=e,[s,r,i]=av(t,n,o),[a,l,c]=Ud(s,r,i);return[a,l,c,e.length>3?e[3]:1]},av=(e,t,n)=>{const{kE:o,kK:s,kKE:r,Xn:i,Yn:a,Zn:l}=Wt,c=(e+16)/116,u=.002*t+c,d=c-.005*n,f=u*u*u,m=d*d*d,v=f>o?f:(116*u-16)/s,g=e>r?Math.pow((e+16)/116,3):e/s,h=m>o?m:(116*d-16)/s,w=v*i,A=g*a,M=h*l;return[w,A,M]},Or=e=>{const t=Math.sign(e);return e=Math.abs(e),(e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055)*t},Ud=(e,t,n)=>{const{MtxAdaptMa:o,MtxAdaptMaI:s,MtxXYZ2RGB:r,RefWhiteRGB:i,Xn:a,Yn:l,Zn:c}=Wt,u=a*o.m00+l*o.m10+c*o.m20,d=a*o.m01+l*o.m11+c*o.m21,f=a*o.m02+l*o.m12+c*o.m22,m=i.X*o.m00+i.Y*o.m10+i.Z*o.m20,v=i.X*o.m01+i.Y*o.m11+i.Z*o.m21,g=i.X*o.m02+i.Y*o.m12+i.Z*o.m22,h=(e*o.m00+t*o.m10+n*o.m20)*(m/u),w=(e*o.m01+t*o.m11+n*o.m21)*(v/d),A=(e*o.m02+t*o.m12+n*o.m22)*(g/f),M=h*s.m00+w*s.m10+A*s.m20,R=h*s.m01+w*s.m11+A*s.m21,B=h*s.m02+w*s.m12+A*s.m22,N=Or(M*r.m00+R*r.m10+B*r.m20),k=Or(M*r.m01+R*r.m11+B*r.m21),y=Or(M*r.m02+R*r.m12+B*r.m22);return[N*255,k*255,y*255]},ma=(...e)=>{const[t,n,o,...s]=ke(e,"rgb"),[r,i,a]=zd(t,n,o),[l,c,u]=lv(r,i,a);return[l,c,u,...s.length>0&&s[0]<1?[s[0]]:[]]};function lv(e,t,n){const{Xn:o,Yn:s,Zn:r,kE:i,kK:a}=Wt,l=e/o,c=t/s,u=n/r,d=l>i?Math.pow(l,1/3):(a*l+16)/116,f=c>i?Math.pow(c,1/3):(a*c+16)/116,m=u>i?Math.pow(u,1/3):(a*u+16)/116;return[116*f-16,500*(d-f),200*(f-m)]}function Nr(e){const t=Math.sign(e);return e=Math.abs(e),(e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4))*t}const zd=(e,t,n)=>{e=Nr(e/255),t=Nr(t/255),n=Nr(n/255);const{MtxRGB2XYZ:o,MtxAdaptMa:s,MtxAdaptMaI:r,Xn:i,Yn:a,Zn:l,As:c,Bs:u,Cs:d}=Wt;let f=e*o.m00+t*o.m10+n*o.m20,m=e*o.m01+t*o.m11+n*o.m21,v=e*o.m02+t*o.m12+n*o.m22;const g=i*s.m00+a*s.m10+l*s.m20,h=i*s.m01+a*s.m11+l*s.m21,w=i*s.m02+a*s.m12+l*s.m22;let A=f*s.m00+m*s.m10+v*s.m20,M=f*s.m01+m*s.m11+v*s.m21,R=f*s.m02+m*s.m12+v*s.m22;return A*=g/c,M*=h/u,R*=w/d,f=A*r.m00+M*r.m10+R*r.m20,m=A*r.m01+M*r.m11+R*r.m21,v=A*r.m02+M*r.m12+R*r.m22,[f,m,v]};Q.prototype.lab=function(){return ma(this._rgb)};const cv=(...e)=>new Q(...e,"lab");Object.assign(pe,{lab:cv,getLabWhitePoint:Xo,setLabWhitePoint:nn});we.format.lab=ha;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"lab"),Ae(e)==="array"&&e.length===3)return"lab"}});Q.prototype.darken=function(e=1){const t=this,n=t.lab();return n[0]-=Wt.Kn*e,new Q(n,"lab").alpha(t.alpha(),!0)};Q.prototype.brighten=function(e=1){return this.darken(-e)};Q.prototype.darker=Q.prototype.darken;Q.prototype.brighter=Q.prototype.brighten;Q.prototype.get=function(e){const[t,n]=e.split("."),o=this[t]();if(n){const s=t.indexOf(n)-(t.substr(0,2)==="ok"?2:0);if(s>-1)return o[s];throw new Error(`unknown channel ${n} in mode ${t}`)}else return o};const{pow:uv}=Math,dv=1e-7,fv=20;Q.prototype.luminance=function(e,t="rgb"){if(e!==void 0&&Ae(e)==="number"){if(e===0)return new Q([0,0,0,this._rgb[3]],"rgb");if(e===1)return new Q([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),o=fv;const s=(i,a)=>{const l=i.interpolate(a,.5,t),c=l.luminance();return Math.abs(e-c)<dv||!o--?l:c>e?s(i,l):s(l,a)},r=(n>e?s(new Q([0,0,0]),this):s(this,new Q([255,255,255]))).rgb();return new Q([...r,this._rgb[3]])}return pv(...this._rgb.slice(0,3))};const pv=(e,t,n)=>(e=Lr(e),t=Lr(t),n=Lr(n),.2126*e+.7152*t+.0722*n),Lr=e=>(e/=255,e<=.03928?e/12.92:uv((e+.055)/1.055,2.4)),it={},fo=(e,t,n=.5,...o)=>{let s=o[0]||"lrgb";if(!it[s]&&!o.length&&(s=Object.keys(it)[0]),!it[s])throw new Error(`interpolation mode ${s} is not defined`);return Ae(e)!=="object"&&(e=new Q(e)),Ae(t)!=="object"&&(t=new Q(t)),it[s](e,t,n).alpha(e.alpha()+n*(t.alpha()-e.alpha()))};Q.prototype.mix=Q.prototype.interpolate=function(e,t=.5,...n){return fo(this,e,t,...n)};Q.prototype.premultiply=function(e=!1){const t=this._rgb,n=t[3];return e?(this._rgb=[t[0]*n,t[1]*n,t[2]*n,n],this):new Q([t[0]*n,t[1]*n,t[2]*n,n],"rgb")};const{sin:hv,cos:mv}=Math,Wd=(...e)=>{let[t,n,o]=ke(e,"lch");return isNaN(o)&&(o=0),o=o*tv,[t,mv(o)*n,hv(o)*n]},ga=(...e)=>{e=ke(e,"lch");const[t,n,o]=e,[s,r,i]=Wd(t,n,o),[a,l,c]=ha(s,r,i);return[a,l,c,e.length>3?e[3]:1]},gv=(...e)=>{const t=jd(ke(e,"hcl"));return ga(...t)},{sqrt:bv,atan2:yv,round:vv}=Math,Kd=(...e)=>{const[t,n,o]=ke(e,"lab"),s=bv(n*n+o*o);let r=(yv(o,n)*nv+360)%360;return vv(s*1e4)===0&&(r=Number.NaN),[t,s,r]},ba=(...e)=>{const[t,n,o,...s]=ke(e,"rgb"),[r,i,a]=ma(t,n,o),[l,c,u]=Kd(r,i,a);return[l,c,u,...s.length>0&&s[0]<1?[s[0]]:[]]};Q.prototype.lch=function(){return ba(this._rgb)};Q.prototype.hcl=function(){return jd(ba(this._rgb))};const wv=(...e)=>new Q(...e,"lch"),Sv=(...e)=>new Q(...e,"hcl");Object.assign(pe,{lch:wv,hcl:Sv});we.format.lch=ga;we.format.hcl=gv;["lch","hcl"].forEach(e=>we.autodetect.push({p:2,test:(...t)=>{if(t=ke(t,e),Ae(t)==="array"&&t.length===3)return e}}));Q.prototype.saturate=function(e=1){const t=this,n=t.lch();return n[1]+=Wt.Kn*e,n[1]<0&&(n[1]=0),new Q(n,"lch").alpha(t.alpha(),!0)};Q.prototype.desaturate=function(e=1){return this.saturate(-e)};Q.prototype.set=function(e,t,n=!1){const[o,s]=e.split("."),r=this[o]();if(s){const i=o.indexOf(s)-(o.substr(0,2)==="ok"?2:0);if(i>-1){if(Ae(t)=="string")switch(t.charAt(0)){case"+":r[i]+=+t;break;case"-":r[i]+=+t;break;case"*":r[i]*=+t.substr(1);break;case"/":r[i]/=+t.substr(1);break;default:r[i]=+t}else if(Ae(t)==="number")r[i]=t;else throw new Error("unsupported value for Color.set");const a=new Q(r,o);return n?(this._rgb=a._rgb,this):a}throw new Error(`unknown channel ${s} in mode ${o}`)}else return r};Q.prototype.tint=function(e=.5,...t){return fo(this,"white",e,...t)};Q.prototype.shade=function(e=.5,...t){return fo(this,"black",e,...t)};const _v=(e,t,n)=>{const o=e._rgb,s=t._rgb;return new Q(o[0]+n*(s[0]-o[0]),o[1]+n*(s[1]-o[1]),o[2]+n*(s[2]-o[2]),"rgb")};it.rgb=_v;const{sqrt:Dr,pow:qn}=Math,kv=(e,t,n)=>{const[o,s,r]=e._rgb,[i,a,l]=t._rgb;return new Q(Dr(qn(o,2)*(1-n)+qn(i,2)*n),Dr(qn(s,2)*(1-n)+qn(a,2)*n),Dr(qn(r,2)*(1-n)+qn(l,2)*n),"rgb")};it.lrgb=kv;const xv=(e,t,n)=>{const o=e.lab(),s=t.lab();return new Q(o[0]+n*(s[0]-o[0]),o[1]+n*(s[1]-o[1]),o[2]+n*(s[2]-o[2]),"lab")};it.lab=xv;const vo=(e,t,n,o)=>{let s,r;o==="hsl"?(s=e.hsl(),r=t.hsl()):o==="hsv"?(s=e.hsv(),r=t.hsv()):o==="hcg"?(s=e.hcg(),r=t.hcg()):o==="hsi"?(s=e.hsi(),r=t.hsi()):o==="lch"||o==="hcl"?(o="hcl",s=e.hcl(),r=t.hcl()):o==="oklch"&&(s=e.oklch().reverse(),r=t.oklch().reverse());let i,a,l,c,u,d;(o.substr(0,1)==="h"||o==="oklch")&&([i,l,u]=s,[a,c,d]=r);let f,m,v,g;return!isNaN(i)&&!isNaN(a)?(a>i&&a-i>180?g=a-(i+360):a<i&&i-a>180?g=a+360-i:g=a-i,m=i+n*g):isNaN(i)?isNaN(a)?m=Number.NaN:(m=a,(u==1||u==0)&&o!="hsv"&&(f=c)):(m=i,(d==1||d==0)&&o!="hsv"&&(f=l)),f===void 0&&(f=l+n*(c-l)),v=u+n*(d-u),o==="oklch"?new Q([v,f,m],o):new Q([m,f,v],o)},qd=(e,t,n)=>vo(e,t,n,"lch");it.lch=qd;it.hcl=qd;const Cv=e=>{if(Ae(e)=="number"&&e>=0&&e<=16777215){const t=e>>16,n=e>>8&255,o=e&255;return[t,n,o,1]}throw new Error("unknown num color: "+e)},$v=(...e)=>{const[t,n,o]=ke(e,"rgb");return(t<<16)+(n<<8)+o};Q.prototype.num=function(){return $v(this._rgb)};const Ev=(...e)=>new Q(...e,"num");Object.assign(pe,{num:Ev});we.format.num=Cv;we.autodetect.push({p:5,test:(...e)=>{if(e.length===1&&Ae(e[0])==="number"&&e[0]>=0&&e[0]<=16777215)return"num"}});const Tv=(e,t,n)=>{const o=e.num(),s=t.num();return new Q(o+n*(s-o),"num")};it.num=Tv;const{floor:Av}=Math,Iv=(...e)=>{e=ke(e,"hcg");let[t,n,o]=e,s,r,i;o=o*255;const a=n*255;if(n===0)s=r=i=o;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const l=Av(t),c=t-l,u=o*(1-n),d=u+a*(1-c),f=u+a*c,m=u+a;switch(l){case 0:[s,r,i]=[m,f,u];break;case 1:[s,r,i]=[d,m,u];break;case 2:[s,r,i]=[u,m,f];break;case 3:[s,r,i]=[u,d,m];break;case 4:[s,r,i]=[f,u,m];break;case 5:[s,r,i]=[m,u,d];break}}return[s,r,i,e.length>3?e[3]:1]},Rv=(...e)=>{const[t,n,o]=ke(e,"rgb"),s=Bd(t,n,o),r=Fd(t,n,o),i=r-s,a=i*100/255,l=s/(255-i)*100;let c;return i===0?c=Number.NaN:(t===r&&(c=(n-o)/i),n===r&&(c=2+(o-t)/i),o===r&&(c=4+(t-n)/i),c*=60,c<0&&(c+=360)),[c,a,l]};Q.prototype.hcg=function(){return Rv(this._rgb)};const Mv=(...e)=>new Q(...e,"hcg");pe.hcg=Mv;we.format.hcg=Iv;we.autodetect.push({p:1,test:(...e)=>{if(e=ke(e,"hcg"),Ae(e)==="array"&&e.length===3)return"hcg"}});const Ov=(e,t,n)=>vo(e,t,n,"hcg");it.hcg=Ov;const{cos:Gn}=Math,Nv=(...e)=>{e=ke(e,"hsi");let[t,n,o]=e,s,r,i;return isNaN(t)&&(t=0),isNaN(n)&&(n=0),t>360&&(t-=360),t<0&&(t+=360),t/=360,t<1/3?(i=(1-n)/3,s=(1+n*Gn(Zt*t)/Gn(Mr-Zt*t))/3,r=1-(i+s)):t<2/3?(t-=1/3,s=(1-n)/3,r=(1+n*Gn(Zt*t)/Gn(Mr-Zt*t))/3,i=1-(s+r)):(t-=2/3,r=(1-n)/3,i=(1+n*Gn(Zt*t)/Gn(Mr-Zt*t))/3,s=1-(r+i)),s=Bn(o*s*3),r=Bn(o*r*3),i=Bn(o*i*3),[s*255,r*255,i*255,e.length>3?e[3]:1]},{min:Lv,sqrt:Dv,acos:Pv}=Math,Bv=(...e)=>{let[t,n,o]=ke(e,"rgb");t/=255,n/=255,o/=255;let s;const r=Lv(t,n,o),i=(t+n+o)/3,a=i>0?1-r/i:0;return a===0?s=NaN:(s=(t-n+(t-o))/2,s/=Dv((t-n)*(t-n)+(t-o)*(n-o)),s=Pv(s),o>n&&(s=Zt-s),s/=Zt),[s*360,a,i]};Q.prototype.hsi=function(){return Bv(this._rgb)};const Fv=(...e)=>new Q(...e,"hsi");pe.hsi=Fv;we.format.hsi=Nv;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"hsi"),Ae(e)==="array"&&e.length===3)return"hsi"}});const jv=(e,t,n)=>vo(e,t,n,"hsi");it.hsi=jv;const Ci=(...e)=>{e=ke(e,"hsl");const[t,n,o]=e;let s,r,i;if(n===0)s=r=i=o*255;else{const a=[0,0,0],l=[0,0,0],c=o<.5?o*(1+n):o+n-o*n,u=2*o-c,d=t/360;a[0]=d+1/3,a[1]=d,a[2]=d-1/3;for(let f=0;f<3;f++)a[f]<0&&(a[f]+=1),a[f]>1&&(a[f]-=1),6*a[f]<1?l[f]=u+(c-u)*6*a[f]:2*a[f]<1?l[f]=c:3*a[f]<2?l[f]=u+(c-u)*(2/3-a[f])*6:l[f]=u;[s,r,i]=[l[0]*255,l[1]*255,l[2]*255]}return e.length>3?[s,r,i,e[3]]:[s,r,i,1]},Gd=(...e)=>{e=ke(e,"rgba");let[t,n,o]=e;t/=255,n/=255,o/=255;const s=Bd(t,n,o),r=Fd(t,n,o),i=(r+s)/2;let a,l;return r===s?(a=0,l=Number.NaN):a=i<.5?(r-s)/(r+s):(r-s)/(2-r-s),t==r?l=(n-o)/(r-s):n==r?l=2+(o-t)/(r-s):o==r&&(l=4+(t-n)/(r-s)),l*=60,l<0&&(l+=360),e.length>3&&e[3]!==void 0?[l,a,i,e[3]]:[l,a,i]};Q.prototype.hsl=function(){return Gd(this._rgb)};const Hv=(...e)=>new Q(...e,"hsl");pe.hsl=Hv;we.format.hsl=Ci;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"hsl"),Ae(e)==="array"&&e.length===3)return"hsl"}});const Vv=(e,t,n)=>vo(e,t,n,"hsl");it.hsl=Vv;const{floor:Uv}=Math,zv=(...e)=>{e=ke(e,"hsv");let[t,n,o]=e,s,r,i;if(o*=255,n===0)s=r=i=o;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const a=Uv(t),l=t-a,c=o*(1-n),u=o*(1-n*l),d=o*(1-n*(1-l));switch(a){case 0:[s,r,i]=[o,d,c];break;case 1:[s,r,i]=[u,o,c];break;case 2:[s,r,i]=[c,o,d];break;case 3:[s,r,i]=[c,u,o];break;case 4:[s,r,i]=[d,c,o];break;case 5:[s,r,i]=[o,c,u];break}}return[s,r,i,e.length>3?e[3]:1]},{min:Wv,max:Kv}=Math,qv=(...e)=>{e=ke(e,"rgb");let[t,n,o]=e;const s=Wv(t,n,o),r=Kv(t,n,o),i=r-s;let a,l,c;return c=r/255,r===0?(a=Number.NaN,l=0):(l=i/r,t===r&&(a=(n-o)/i),n===r&&(a=2+(o-t)/i),o===r&&(a=4+(t-n)/i),a*=60,a<0&&(a+=360)),[a,l,c]};Q.prototype.hsv=function(){return qv(this._rgb)};const Gv=(...e)=>new Q(...e,"hsv");pe.hsv=Gv;we.format.hsv=zv;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"hsv"),Ae(e)==="array"&&e.length===3)return"hsv"}});const Yv=(e,t,n)=>vo(e,t,n,"hsv");it.hsv=Yv;function Ps(e,t){let n=e.length;Array.isArray(e[0])||(e=[e]),Array.isArray(t[0])||(t=t.map(i=>[i]));let o=t[0].length,s=t[0].map((i,a)=>t.map(l=>l[a])),r=e.map(i=>s.map(a=>Array.isArray(i)?i.reduce((l,c,u)=>l+c*(a[u]||0),0):a.reduce((l,c)=>l+c*i,0)));return n===1&&(r=r[0]),o===1?r.map(i=>i[0]):r}const ya=(...e)=>{e=ke(e,"lab");const[t,n,o,...s]=e,[r,i,a]=Jv([t,n,o]),[l,c,u]=Ud(r,i,a);return[l,c,u,...s.length>0&&s[0]<1?[s[0]]:[]]};function Jv(e){var t=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],n=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],o=Ps(n,e);return Ps(t,o.map(s=>s**3))}const va=(...e)=>{const[t,n,o,...s]=ke(e,"rgb"),r=zd(t,n,o);return[...Qv(r),...s.length>0&&s[0]<1?[s[0]]:[]]};function Qv(e){const t=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],n=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],o=Ps(t,e);return Ps(n,o.map(s=>Math.cbrt(s)))}Q.prototype.oklab=function(){return va(this._rgb)};const Xv=(...e)=>new Q(...e,"oklab");Object.assign(pe,{oklab:Xv});we.format.oklab=ya;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"oklab"),Ae(e)==="array"&&e.length===3)return"oklab"}});const Zv=(e,t,n)=>{const o=e.oklab(),s=t.oklab();return new Q(o[0]+n*(s[0]-o[0]),o[1]+n*(s[1]-o[1]),o[2]+n*(s[2]-o[2]),"oklab")};it.oklab=Zv;const ew=(e,t,n)=>vo(e,t,n,"oklch");it.oklch=ew;const{pow:Pr,sqrt:Br,PI:Fr,cos:Zl,sin:ec,atan2:tw}=Math,nw=(e,t="lrgb",n=null)=>{const o=e.length;n||(n=Array.from(new Array(o)).map(()=>1));const s=o/n.reduce(function(d,f){return d+f});if(n.forEach((d,f)=>{n[f]*=s}),e=e.map(d=>new Q(d)),t==="lrgb")return ow(e,n);const r=e.shift(),i=r.get(t),a=[];let l=0,c=0;for(let d=0;d<i.length;d++)if(i[d]=(i[d]||0)*n[0],a.push(isNaN(i[d])?0:n[0]),t.charAt(d)==="h"&&!isNaN(i[d])){const f=i[d]/180*Fr;l+=Zl(f)*n[0],c+=ec(f)*n[0]}let u=r.alpha()*n[0];e.forEach((d,f)=>{const m=d.get(t);u+=d.alpha()*n[f+1];for(let v=0;v<i.length;v++)if(!isNaN(m[v]))if(a[v]+=n[f+1],t.charAt(v)==="h"){const g=m[v]/180*Fr;l+=Zl(g)*n[f+1],c+=ec(g)*n[f+1]}else i[v]+=m[v]*n[f+1]});for(let d=0;d<i.length;d++)if(t.charAt(d)==="h"){let f=tw(c/a[d],l/a[d])/Fr*180;for(;f<0;)f+=360;for(;f>=360;)f-=360;i[d]=f}else i[d]=i[d]/a[d];return u/=o,new Q(i,t).alpha(u>.99999?1:u,!0)},ow=(e,t)=>{const n=e.length,o=[0,0,0,0];for(let s=0;s<e.length;s++){const r=e[s],i=t[s]/n,a=r._rgb;o[0]+=Pr(a[0],2)*i,o[1]+=Pr(a[1],2)*i,o[2]+=Pr(a[2],2)*i,o[3]+=a[3]*i}return o[0]=Br(o[0]),o[1]=Br(o[1]),o[2]=Br(o[2]),o[3]>.9999999&&(o[3]=1),new Q(pa(o))},{pow:sw}=Math;function Bs(e){let t="rgb",n=pe("#ccc"),o=0,s=[0,1],r=[0,1],i=[],a=[0,0],l=!1,c=[],u=!1,d=0,f=1,m=!1,v={},g=!0,h=1;const w=function(y){if(y=y||["#fff","#000"],y&&Ae(y)==="string"&&pe.brewer&&pe.brewer[y.toLowerCase()]&&(y=pe.brewer[y.toLowerCase()]),Ae(y)==="array"){y.length===1&&(y=[y[0],y[0]]),y=y.slice(0);for(let b=0;b<y.length;b++)y[b]=pe(y[b]);i.length=0;for(let b=0;b<y.length;b++)i.push(b/(y.length-1))}return N(),c=y},A=function(y){if(l!=null){const b=l.length-1;let _=0;for(;_<b&&y>=l[_];)_++;return _-1}return 0};let M=y=>y,R=y=>y;const B=function(y,b){let _,x;if(b==null&&(b=!1),isNaN(y)||y===null)return n;b?x=y:l&&l.length>2?x=A(y)/(l.length-2):f!==d?x=(y-d)/(f-d):x=1,x=R(x),b||(x=M(x)),h!==1&&(x=sw(x,h)),x=a[0]+x*(1-a[0]-a[1]),x=Bn(x,0,1);const $=Math.floor(x*1e4);if(g&&v[$])_=v[$];else{if(Ae(c)==="array")for(let P=0;P<i.length;P++){const W=i[P];if(x<=W){_=c[P];break}if(x>=W&&P===i.length-1){_=c[P];break}if(x>W&&x<i[P+1]){x=(x-W)/(i[P+1]-W),_=pe.interpolate(c[P],c[P+1],x,t);break}}else Ae(c)==="function"&&(_=c(x));g&&(v[$]=_)}return _};var N=()=>v={};w(e);const k=function(y){const b=pe(B(y));return u&&b[u]?b[u]():b};return k.classes=function(y){if(y!=null){if(Ae(y)==="array")l=y,s=[y[0],y[y.length-1]];else{const b=pe.analyze(s);y===0?l=[b.min,b.max]:l=pe.limits(b,"e",y)}return k}return l},k.domain=function(y){if(!arguments.length)return r;r=y.slice(0),d=y[0],f=y[y.length-1],i=[];const b=c.length;if(y.length===b&&d!==f)for(let _ of Array.from(y))i.push((_-d)/(f-d));else{for(let _=0;_<b;_++)i.push(_/(b-1));if(y.length>2){const _=y.map(($,P)=>P/(y.length-1)),x=y.map($=>($-d)/(f-d));x.every(($,P)=>_[P]===$)||(R=$=>{if($<=0||$>=1)return $;let P=0;for(;$>=x[P+1];)P++;const W=($-x[P])/(x[P+1]-x[P]);return _[P]+W*(_[P+1]-_[P])})}}return s=[d,f],k},k.mode=function(y){return arguments.length?(t=y,N(),k):t},k.range=function(y,b){return w(y),k},k.out=function(y){return u=y,k},k.spread=function(y){return arguments.length?(o=y,k):o},k.correctLightness=function(y){return y==null&&(y=!0),m=y,N(),m?M=function(b){const _=B(0,!0).lab()[0],x=B(1,!0).lab()[0],$=_>x;let P=B(b,!0).lab()[0];const W=_+(x-_)*b;let O=P-W,E=0,F=1,j=20;for(;Math.abs(O)>.01&&j-- >0;)(function(){return $&&(O*=-1),O<0?(E=b,b+=(F-b)*.5):(F=b,b+=(E-b)*.5),P=B(b,!0).lab()[0],O=P-W})();return b}:M=b=>b,k},k.padding=function(y){return y!=null?(Ae(y)==="number"&&(y=[y,y]),a=y,k):a},k.colors=function(y,b){arguments.length<2&&(b="hex");let _=[];if(arguments.length===0)_=c.slice(0);else if(y===1)_=[k(.5)];else if(y>1){const x=s[0],$=s[1]-x;_=rw(0,y).map(P=>k(x+P/(y-1)*$))}else{e=[];let x=[];if(l&&l.length>2)for(let $=1,P=l.length,W=1<=P;W?$<P:$>P;W?$++:$--)x.push((l[$-1]+l[$])*.5);else x=s;_=x.map($=>k($))}return pe[b]&&(_=_.map(x=>x[b]())),_},k.cache=function(y){return y!=null?(g=y,k):g},k.gamma=function(y){return y!=null?(h=y,k):h},k.nodata=function(y){return y!=null?(n=pe(y),k):n},k}function rw(e,t,n){let o=[],s=e<t,r=t;for(let i=e;s?i<r:i>r;s?i++:i--)o.push(i);return o}const iw=function(e){let t=[1,1];for(let n=1;n<e;n++){let o=[1];for(let s=1;s<=t.length;s++)o[s]=(t[s]||0)+t[s-1];t=o}return t},aw=function(e){let t,n,o,s;if(e=e.map(r=>new Q(r)),e.length===2)[n,o]=e.map(r=>r.lab()),t=function(r){const i=[0,1,2].map(a=>n[a]+r*(o[a]-n[a]));return new Q(i,"lab")};else if(e.length===3)[n,o,s]=e.map(r=>r.lab()),t=function(r){const i=[0,1,2].map(a=>(1-r)*(1-r)*n[a]+2*(1-r)*r*o[a]+r*r*s[a]);return new Q(i,"lab")};else if(e.length===4){let r;[n,o,s,r]=e.map(i=>i.lab()),t=function(i){const a=[0,1,2].map(l=>(1-i)*(1-i)*(1-i)*n[l]+3*(1-i)*(1-i)*i*o[l]+3*(1-i)*i*i*s[l]+i*i*i*r[l]);return new Q(a,"lab")}}else if(e.length>=5){let r,i,a;r=e.map(l=>l.lab()),a=e.length-1,i=iw(a),t=function(l){const c=1-l,u=[0,1,2].map(d=>r.reduce((f,m,v)=>f+i[v]*c**(a-v)*l**v*m[d],0));return new Q(u,"lab")}}else throw new RangeError("No point in running bezier with only one color.");return t},lw=e=>{const t=aw(e);return t.scale=()=>Bs(t),t},{round:Yd}=Math;Q.prototype.rgb=function(e=!0){return e===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(Yd)};Q.prototype.rgba=function(e=!0){return this._rgb.slice(0,4).map((t,n)=>n<3?e===!1?t:Yd(t):t)};const cw=(...e)=>new Q(...e,"rgb");Object.assign(pe,{rgb:cw});we.format.rgb=(...e)=>{const t=ke(e,"rgba");return t[3]===void 0&&(t[3]=1),t};we.autodetect.push({p:3,test:(...e)=>{if(e=ke(e,"rgba"),Ae(e)==="array"&&(e.length===3||e.length===4&&Ae(e[3])=="number"&&e[3]>=0&&e[3]<=1))return"rgb"}});const Nt=(e,t,n)=>{if(!Nt[n])throw new Error("unknown blend mode "+n);return Nt[n](e,t)},kn=e=>(t,n)=>{const o=pe(n).rgb(),s=pe(t).rgb();return pe.rgb(e(o,s))},xn=e=>(t,n)=>{const o=[];return o[0]=e(t[0],n[0]),o[1]=e(t[1],n[1]),o[2]=e(t[2],n[2]),o},uw=e=>e,dw=(e,t)=>e*t/255,fw=(e,t)=>e>t?t:e,pw=(e,t)=>e>t?e:t,hw=(e,t)=>255*(1-(1-e/255)*(1-t/255)),mw=(e,t)=>t<128?2*e*t/255:255*(1-2*(1-e/255)*(1-t/255)),gw=(e,t)=>255*(1-(1-t/255)/(e/255)),bw=(e,t)=>e===255?255:(e=255*(t/255)/(1-e/255),e>255?255:e);Nt.normal=kn(xn(uw));Nt.multiply=kn(xn(dw));Nt.screen=kn(xn(hw));Nt.overlay=kn(xn(mw));Nt.darken=kn(xn(fw));Nt.lighten=kn(xn(pw));Nt.dodge=kn(xn(bw));Nt.burn=kn(xn(gw));const{pow:yw,sin:vw,cos:ww}=Math;function Sw(e=300,t=-1.5,n=1,o=1,s=[0,1]){let r=0,i;Ae(s)==="array"?i=s[1]-s[0]:(i=0,s=[s,s]);const a=function(l){const c=Zt*((e+120)/360+t*l),u=yw(s[0]+i*l,o),f=(r!==0?n[0]+l*r:n)*u*(1-u)/2,m=ww(c),v=vw(c),g=u+f*(-.14861*m+1.78277*v),h=u+f*(-.29227*m-.90649*v),w=u+f*(1.97294*m);return pe(pa([g*255,h*255,w*255,1]))};return a.start=function(l){return l==null?e:(e=l,a)},a.rotations=function(l){return l==null?t:(t=l,a)},a.gamma=function(l){return l==null?o:(o=l,a)},a.hue=function(l){return l==null?n:(n=l,Ae(n)==="array"?(r=n[1]-n[0],r===0&&(n=n[1])):r=0,a)},a.lightness=function(l){return l==null?s:(Ae(l)==="array"?(s=l,i=l[1]-l[0]):(s=[l,l],i=0),a)},a.scale=()=>pe.scale(a),a.hue(n),a}const _w="0123456789abcdef",{floor:kw,random:xw}=Math,Cw=(e=xw)=>{let t="#";for(let n=0;n<6;n++)t+=_w.charAt(kw(e()*16));return new Q(t,"hex")},{log:tc,pow:$w,floor:Ew,abs:Tw}=Math;function Jd(e,t=null){const n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return Ae(e)==="object"&&(e=Object.values(e)),e.forEach(o=>{t&&Ae(o)==="object"&&(o=o[t]),o!=null&&!isNaN(o)&&(n.values.push(o),n.sum+=o,o<n.min&&(n.min=o),o>n.max&&(n.max=o),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(o,s)=>Qd(n,o,s),n}function Qd(e,t="equal",n=7){Ae(e)=="array"&&(e=Jd(e));const{min:o,max:s}=e,r=e.values.sort((a,l)=>a-l);if(n===1)return[o,s];const i=[];if(t.substr(0,1)==="c"&&(i.push(o),i.push(s)),t.substr(0,1)==="e"){i.push(o);for(let a=1;a<n;a++)i.push(o+a/n*(s-o));i.push(s)}else if(t.substr(0,1)==="l"){if(o<=0)throw new Error("Logarithmic scales are only possible for values > 0");const a=Math.LOG10E*tc(o),l=Math.LOG10E*tc(s);i.push(o);for(let c=1;c<n;c++)i.push($w(10,a+c/n*(l-a)));i.push(s)}else if(t.substr(0,1)==="q"){i.push(o);for(let a=1;a<n;a++){const l=(r.length-1)*a/n,c=Ew(l);if(c===l)i.push(r[c]);else{const u=l-c;i.push(r[c]*(1-u)+r[c+1]*u)}}i.push(s)}else if(t.substr(0,1)==="k"){let a;const l=r.length,c=new Array(l),u=new Array(n);let d=!0,f=0,m=null;m=[],m.push(o);for(let h=1;h<n;h++)m.push(o+h/n*(s-o));for(m.push(s);d;){for(let w=0;w<n;w++)u[w]=0;for(let w=0;w<l;w++){const A=r[w];let M=Number.MAX_VALUE,R;for(let B=0;B<n;B++){const N=Tw(m[B]-A);N<M&&(M=N,R=B),u[R]++,c[w]=R}}const h=new Array(n);for(let w=0;w<n;w++)h[w]=null;for(let w=0;w<l;w++)a=c[w],h[a]===null?h[a]=r[w]:h[a]+=r[w];for(let w=0;w<n;w++)h[w]*=1/u[w];d=!1;for(let w=0;w<n;w++)if(h[w]!==m[w]){d=!0;break}m=h,f++,f>200&&(d=!1)}const v={};for(let h=0;h<n;h++)v[h]=[];for(let h=0;h<l;h++)a=c[h],v[a].push(r[h]);let g=[];for(let h=0;h<n;h++)g.push(v[h][0]),g.push(v[h][v[h].length-1]);g=g.sort((h,w)=>h-w),i.push(g[0]);for(let h=1;h<g.length;h+=2){const w=g[h];!isNaN(w)&&i.indexOf(w)===-1&&i.push(w)}}return i}const Aw=(e,t)=>{e=new Q(e),t=new Q(t);const n=e.luminance(),o=t.luminance();return n>o?(n+.05)/(o+.05):(o+.05)/(n+.05)};/**
 * @license
 *
 * The APCA contrast prediction algorithm is based of the formulas published
 * in the APCA-1.0.98G specification by Myndex. The specification is available at:
 * https://raw.githubusercontent.com/Myndex/apca-w3/master/images/APCAw3_0.1.17_APCA0.0.98G.svg
 *
 * Note that the APCA implementation is still beta, so please update to
 * future versions of chroma.js when they become available.
 *
 * You can read more about the APCA Readability Criterion at
 * https://readtech.org/ARC/
 */const nc=.027,Iw=5e-4,Rw=.1,oc=1.14,ys=.022,sc=1.414,Mw=(e,t)=>{e=new Q(e),t=new Q(t),e.alpha()<1&&(e=fo(t,e,e.alpha(),"rgb"));const n=rc(...e.rgb()),o=rc(...t.rgb()),s=n>=ys?n:n+Math.pow(ys-n,sc),r=o>=ys?o:o+Math.pow(ys-o,sc),i=Math.pow(r,.56)-Math.pow(s,.57),a=Math.pow(r,.65)-Math.pow(s,.62),l=Math.abs(r-s)<Iw?0:s<r?i*oc:a*oc;return(Math.abs(l)<Rw?0:l>0?l-nc:l+nc)*100};function rc(e,t,n){return .2126729*Math.pow(e/255,2.4)+.7151522*Math.pow(t/255,2.4)+.072175*Math.pow(n/255,2.4)}const{sqrt:Jt,pow:Ke,min:Ow,max:Nw,atan2:ic,abs:ac,cos:vs,sin:lc,exp:Lw,PI:cc}=Math;function Dw(e,t,n=1,o=1,s=1){var r=function(Ie){return 360*Ie/(2*cc)},i=function(Ie){return 2*cc*Ie/360};e=new Q(e),t=new Q(t);const[a,l,c]=Array.from(e.lab()),[u,d,f]=Array.from(t.lab()),m=(a+u)/2,v=Jt(Ke(l,2)+Ke(c,2)),g=Jt(Ke(d,2)+Ke(f,2)),h=(v+g)/2,w=.5*(1-Jt(Ke(h,7)/(Ke(h,7)+Ke(25,7)))),A=l*(1+w),M=d*(1+w),R=Jt(Ke(A,2)+Ke(c,2)),B=Jt(Ke(M,2)+Ke(f,2)),N=(R+B)/2,k=r(ic(c,A)),y=r(ic(f,M)),b=k>=0?k:k+360,_=y>=0?y:y+360,x=ac(b-_)>180?(b+_+360)/2:(b+_)/2,$=1-.17*vs(i(x-30))+.24*vs(i(2*x))+.32*vs(i(3*x+6))-.2*vs(i(4*x-63));let P=_-b;P=ac(P)<=180?P:_<=b?P+360:P-360,P=2*Jt(R*B)*lc(i(P)/2);const W=u-a,O=B-R,E=1+.015*Ke(m-50,2)/Jt(20+Ke(m-50,2)),F=1+.045*N,j=1+.015*N*$,oe=30*Lw(-Ke((x-275)/25,2)),xe=-(2*Jt(Ke(N,7)/(Ke(N,7)+Ke(25,7))))*lc(2*i(oe)),Ee=Jt(Ke(W/(n*E),2)+Ke(O/(o*F),2)+Ke(P/(s*j),2)+xe*(O/(o*F))*(P/(s*j)));return Nw(0,Ow(100,Ee))}function Pw(e,t,n="lab"){e=new Q(e),t=new Q(t);const o=e.get(n),s=t.get(n);let r=0;for(let i in o){const a=(o[i]||0)-(s[i]||0);r+=a*a}return Math.sqrt(r)}const Bw=(...e)=>{try{return new Q(...e),!0}catch{return!1}},Fw={cool(){return Bs([pe.hsl(180,1,.9),pe.hsl(250,.7,.4)])},hot(){return Bs(["#000","#f00","#ff0","#fff"]).mode("rgb")}},$i={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},Xd=Object.keys($i),uc=new Map(Xd.map(e=>[e.toLowerCase(),e])),jw=typeof Proxy=="function"?new Proxy($i,{get(e,t){const n=t.toLowerCase();if(uc.has(n))return e[uc.get(n)]},getOwnPropertyNames(){return Object.getOwnPropertyNames(Xd)}}):$i,Hw=(...e)=>{e=ke(e,"cmyk");const[t,n,o,s]=e,r=e.length>4?e[4]:1;return s===1?[0,0,0,r]:[t>=1?0:255*(1-t)*(1-s),n>=1?0:255*(1-n)*(1-s),o>=1?0:255*(1-o)*(1-s),r]},{max:dc}=Math,Vw=(...e)=>{let[t,n,o]=ke(e,"rgb");t=t/255,n=n/255,o=o/255;const s=1-dc(t,dc(n,o)),r=s<1?1/(1-s):0,i=(1-t-s)*r,a=(1-n-s)*r,l=(1-o-s)*r;return[i,a,l,s]};Q.prototype.cmyk=function(){return Vw(this._rgb)};const Uw=(...e)=>new Q(...e,"cmyk");Object.assign(pe,{cmyk:Uw});we.format.cmyk=Hw;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"cmyk"),Ae(e)==="array"&&e.length===4)return"cmyk"}});const zw=(...e)=>{const t=ke(e,"hsla");let n=yo(e)||"lsa";return t[0]=Ct(t[0]||0)+"deg",t[1]=Ct(t[1]*100)+"%",t[2]=Ct(t[2]*100)+"%",n==="hsla"||t.length>3&&t[3]<1?(t[3]="/ "+(t.length>3?t[3]:1),n="hsla"):t.length=3,`${n.substr(0,3)}(${t.join(" ")})`},Ww=(...e)=>{const t=ke(e,"lab");let n=yo(e)||"lab";return t[0]=Ct(t[0])+"%",t[1]=Ct(t[1]),t[2]=Ct(t[2]),n==="laba"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lab(${t.join(" ")})`},Kw=(...e)=>{const t=ke(e,"lch");let n=yo(e)||"lab";return t[0]=Ct(t[0])+"%",t[1]=Ct(t[1]),t[2]=isNaN(t[2])?"none":Ct(t[2])+"deg",n==="lcha"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lch(${t.join(" ")})`},qw=(...e)=>{const t=ke(e,"lab");return t[0]=Ct(t[0]*100)+"%",t[1]=xi(t[1]),t[2]=xi(t[2]),t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklab(${t.join(" ")})`},Zd=(...e)=>{const[t,n,o,...s]=ke(e,"rgb"),[r,i,a]=va(t,n,o),[l,c,u]=Kd(r,i,a);return[l,c,u,...s.length>0&&s[0]<1?[s[0]]:[]]},Gw=(...e)=>{const t=ke(e,"lch");return t[0]=Ct(t[0]*100)+"%",t[1]=xi(t[1]),t[2]=isNaN(t[2])?"none":Ct(t[2])+"deg",t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklch(${t.join(" ")})`},{round:jr}=Math,Yw=(...e)=>{const t=ke(e,"rgba");let n=yo(e)||"rgb";if(n.substr(0,3)==="hsl")return zw(Gd(t),n);if(n.substr(0,3)==="lab"){const o=Xo();nn("d50");const s=Ww(ma(t),n);return nn(o),s}if(n.substr(0,3)==="lch"){const o=Xo();nn("d50");const s=Kw(ba(t),n);return nn(o),s}return n.substr(0,5)==="oklab"?qw(va(t)):n.substr(0,5)==="oklch"?Gw(Zd(t)):(t[0]=jr(t[0]),t[1]=jr(t[1]),t[2]=jr(t[2]),(n==="rgba"||t.length>3&&t[3]<1)&&(t[3]="/ "+(t.length>3?t[3]:1),n="rgba"),`${n.substr(0,3)}(${t.slice(0,n==="rgb"?3:4).join(" ")})`)},ef=(...e)=>{e=ke(e,"lch");const[t,n,o,...s]=e,[r,i,a]=Wd(t,n,o),[l,c,u]=ya(r,i,a);return[l,c,u,...s.length>0&&s[0]<1?[s[0]]:[]]},sn=/((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,Rt=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,Fs=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,Et=/\s*/.source,wo=/\s+/.source,wa=/\s*,\s*/.source,cr=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,So=/\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,tf=new RegExp("^rgba?\\("+Et+[sn,sn,sn].join(wo)+So+"\\)$"),nf=new RegExp("^rgb\\("+Et+[sn,sn,sn].join(wa)+Et+"\\)$"),of=new RegExp("^rgba\\("+Et+[sn,sn,sn,Rt].join(wa)+Et+"\\)$"),sf=new RegExp("^hsla?\\("+Et+[cr,Fs,Fs].join(wo)+So+"\\)$"),rf=new RegExp("^hsl?\\("+Et+[cr,Fs,Fs].join(wa)+Et+"\\)$"),af=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,lf=new RegExp("^lab\\("+Et+[Rt,Rt,Rt].join(wo)+So+"\\)$"),cf=new RegExp("^lch\\("+Et+[Rt,Rt,cr].join(wo)+So+"\\)$"),uf=new RegExp("^oklab\\("+Et+[Rt,Rt,Rt].join(wo)+So+"\\)$"),df=new RegExp("^oklch\\("+Et+[Rt,Rt,cr].join(wo)+So+"\\)$"),{round:ff}=Math,Yn=e=>e.map((t,n)=>n<=2?Bn(ff(t),0,255):t),qe=(e,t=0,n=100,o=!1)=>(typeof e=="string"&&e.endsWith("%")&&(e=parseFloat(e.substring(0,e.length-1))/100,o?e=t+(e+1)*.5*(n-t):e=t+e*(n-t)),+e),lt=(e,t)=>e==="none"?t:e,Sa=e=>{if(e=e.toLowerCase().trim(),e==="transparent")return[0,0,0,0];let t;if(we.format.named)try{return we.format.named(e)}catch{}if((t=e.match(tf))||(t=e.match(nf))){let n=t.slice(1,4);for(let s=0;s<3;s++)n[s]=+qe(lt(n[s],0),0,255);n=Yn(n);const o=t[4]!==void 0?+qe(t[4],0,1):1;return n[3]=o,n}if(t=e.match(of)){const n=t.slice(1,5);for(let o=0;o<4;o++)n[o]=+qe(n[o],0,255);return n}if((t=e.match(sf))||(t=e.match(rf))){const n=t.slice(1,4);n[0]=+lt(n[0].replace("deg",""),0),n[1]=+qe(lt(n[1],0),0,100)*.01,n[2]=+qe(lt(n[2],0),0,100)*.01;const o=Yn(Ci(n)),s=t[4]!==void 0?+qe(t[4],0,1):1;return o[3]=s,o}if(t=e.match(af)){const n=t.slice(1,4);n[1]*=.01,n[2]*=.01;const o=Ci(n);for(let s=0;s<3;s++)o[s]=ff(o[s]);return o[3]=+t[4],o}if(t=e.match(lf)){const n=t.slice(1,4);n[0]=qe(lt(n[0],0),0,100),n[1]=qe(lt(n[1],0),-125,125,!0),n[2]=qe(lt(n[2],0),-125,125,!0);const o=Xo();nn("d50");const s=Yn(ha(n));nn(o);const r=t[4]!==void 0?+qe(t[4],0,1):1;return s[3]=r,s}if(t=e.match(cf)){const n=t.slice(1,4);n[0]=qe(n[0],0,100),n[1]=qe(lt(n[1],0),0,150,!1),n[2]=+lt(n[2].replace("deg",""),0);const o=Xo();nn("d50");const s=Yn(ga(n));nn(o);const r=t[4]!==void 0?+qe(t[4],0,1):1;return s[3]=r,s}if(t=e.match(uf)){const n=t.slice(1,4);n[0]=qe(lt(n[0],0),0,1),n[1]=qe(lt(n[1],0),-.4,.4,!0),n[2]=qe(lt(n[2],0),-.4,.4,!0);const o=Yn(ya(n)),s=t[4]!==void 0?+qe(t[4],0,1):1;return o[3]=s,o}if(t=e.match(df)){const n=t.slice(1,4);n[0]=qe(lt(n[0],0),0,1),n[1]=qe(lt(n[1],0),0,.4,!1),n[2]=+lt(n[2].replace("deg",""),0);const o=Yn(ef(n)),s=t[4]!==void 0?+qe(t[4],0,1):1;return o[3]=s,o}};Sa.test=e=>tf.test(e)||sf.test(e)||lf.test(e)||cf.test(e)||uf.test(e)||df.test(e)||nf.test(e)||of.test(e)||rf.test(e)||af.test(e)||e==="transparent";Q.prototype.css=function(e){return Yw(this._rgb,e)};const Jw=(...e)=>new Q(...e,"css");pe.css=Jw;we.format.css=Sa;we.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&Ae(e)==="string"&&Sa.test(e))return"css"}});we.format.gl=(...e)=>{const t=ke(e,"rgba");return t[0]*=255,t[1]*=255,t[2]*=255,t};const Qw=(...e)=>new Q(...e,"gl");pe.gl=Qw;Q.prototype.gl=function(){const e=this._rgb;return[e[0]/255,e[1]/255,e[2]/255,e[3]]};Q.prototype.hex=function(e){return Vd(this._rgb,e)};const Xw=(...e)=>new Q(...e,"hex");pe.hex=Xw;we.format.hex=Hd;we.autodetect.push({p:4,test:(e,...t)=>{if(!t.length&&Ae(e)==="string"&&[3,4,5,6,7,8,9].indexOf(e.length)>=0)return"hex"}});const{log:ws}=Math,pf=e=>{const t=e/100;let n,o,s;return t<66?(n=255,o=t<6?0:-155.25485562709179-.44596950469579133*(o=t-2)+104.49216199393888*ws(o),s=t<20?0:-254.76935184120902+.8274096064007395*(s=t-10)+115.67994401066147*ws(s)):(n=351.97690566805693+.114206453784165*(n=t-55)-40.25366309332127*ws(n),o=325.4494125711974+.07943456536662342*(o=t-50)-28.0852963507957*ws(o),s=255),[n,o,s,1]},{round:Zw}=Math,eS=(...e)=>{const t=ke(e,"rgb"),n=t[0],o=t[2];let s=1e3,r=4e4;const i=.4;let a;for(;r-s>i;){a=(r+s)*.5;const l=pf(a);l[2]/l[0]>=o/n?r=a:s=a}return Zw(a)};Q.prototype.temp=Q.prototype.kelvin=Q.prototype.temperature=function(){return eS(this._rgb)};const Hr=(...e)=>new Q(...e,"temp");Object.assign(pe,{temp:Hr,kelvin:Hr,temperature:Hr});we.format.temp=we.format.kelvin=we.format.temperature=pf;Q.prototype.oklch=function(){return Zd(this._rgb)};const tS=(...e)=>new Q(...e,"oklch");Object.assign(pe,{oklch:tS});we.format.oklch=ef;we.autodetect.push({p:2,test:(...e)=>{if(e=ke(e,"oklch"),Ae(e)==="array"&&e.length===3)return"oklch"}});Object.assign(pe,{analyze:Jd,average:nw,bezier:lw,blend:Nt,brewer:jw,Color:Q,colors:uo,contrast:Aw,contrastAPCA:Mw,cubehelix:Sw,deltaE:Dw,distance:Pw,input:we,interpolate:fo,limits:Qd,mix:fo,random:Cw,scale:Bs,scales:Fw,valid:Bw});function hf(e){const t=pe(e.primary).hex(),n=pe(e.secondary).hex(),o=pe(e.accent).hex(),s=e.dark??oS(t,n),r=s?"#12141a":"#ffffff",i=s?pe.mix(r,t,.12,"lch").hex():pe.mix(r,t,.06,"lch").hex(),a=s?pe.mix(r,t,.2,"lch").hex():pe.mix(r,t,.12,"lch").hex(),l=s?"#e6e6e6":"#1f2328",c=s?"#9aa5b1":"#6a737d",u=s?"#12141a":"#ffffff",d=s?pe.mix(r,"#ffffff",.12,"lch").hex():pe.mix(r,"#000000",.1,"lch").hex(),f=o,m=s?{tip:{accent:"#4ec9b0",soft:pe.mix("#4ec9b0",r,.8,"lch").hex()},warning:{accent:"#f0a35b",soft:pe.mix("#f0a35b",r,.8,"lch").hex()},info:{accent:"#61afef",soft:pe.mix("#61afef",r,.8,"lch").hex()},danger:{accent:"#e06c75",soft:pe.mix("#e06c75",r,.8,"lch").hex()}}:{tip:{accent:"#1a8450",soft:pe.mix("#1a8450",r,.88,"lch").hex()},warning:{accent:"#b7791f",soft:pe.mix("#b7791f",r,.88,"lch").hex()},info:{accent:"#1a73e8",soft:pe.mix("#1a73e8",r,.88,"lch").hex()},danger:{accent:"#b42318",soft:pe.mix("#b42318",r,.88,"lch").hex()}};return{primary:t,secondary:n,accent:o,bg:r,bgSoft:i,bgMuted:a,text:l,textMuted:c,textInverse:u,border:d,code:f,status:m}}function nS(e,t=!1){const n=pe(e),o=n.darken(1.2).saturate(.3).hex(),[s,r,i]=n.lch(),l=pe.lch(s,Math.max(r,45),(i+150)%360).hex();return{primary:n.hex(),secondary:o,accent:l,dark:t}}function oS(e,t){const n=pe(e).luminance(),o=pe(t).luminance();return(n+o)/2<.18}function sS(e,t){const n=pe.contrast(e,t);return{pass:n>=3,ratio:Math.round(n*10)/10}}const rS={class:"panel"},iS={class:"panel-section"},aS={class:"preset-grid"},lS=["title","onClick"],cS={class:"preset-swatches"},uS={class:"preset-name"},dS={class:"panel-section"},fS={class:"field-row"},pS={class:"field"},hS={class:"mono"},mS={class:"field"},gS={class:"mono"},bS={class:"field"},yS={class:"mono"},vS={class:"field-row inline"},wS={class:"toggle"},SS={class:"panel-section"},_S={key:0,class:"check-ok"},kS={key:1,class:"check-bad"},xS={class:"panel-foot"},CS=["disabled"],$S=Me({__name:"ColorCustomizer",props:{hasCustomColor:{type:Boolean}},emits:["apply","reset","close"],setup(e,{emit:t}){const n=e,o=t,s=Kt({primary:"#a83420",secondary:"#6a6655",accent:"#46573f",dark:!1}),r=Kt({previewBg:"#ffffff",contrastRatio:0,contrastPass:!0});let i=null;je(()=>[s.primary,s.secondary,s.accent,s.dark],()=>{const u=hf(s);r.previewBg=u.bg;const{pass:d,ratio:f}=sS(s.primary,u.bg);r.contrastPass=d,r.contrastRatio=f,i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>o("apply",{...s}),120)},{immediate:!0}),Je(()=>{i!==null&&window.clearTimeout(i)});function a(u){s.primary=u.primary,s.secondary=u.secondary,s.accent=u.accent,s.dark=!!u.dark}function l(){const u=nS(s.primary,s.dark);s.secondary=u.secondary,s.accent=u.accent}function c(){o("reset")}return(u,d)=>(T(),L("div",rS,[$e(bo,{title:"自定义配色",size:"sm",onClose:d[0]||(d[0]=f=>o("close"))}),d[13]||(d[13]=p("div",{class:"hint mono"},[p("span",null,"改动即刻应用；切主题会重置。")],-1)),p("section",iS,[d[5]||(d[5]=p("div",{class:"section-title"},"预设调色板",-1)),p("div",aS,[(T(!0),L(ae,null,Te(I(Xy),f=>(T(),L("button",{key:f.id,class:"preset",title:f.description,onClick:m=>a(f)},[p("span",cS,[p("span",{class:"swatch",style:Ge({background:f.primary})},null,4),p("span",{class:"swatch",style:Ge({background:f.secondary})},null,4),p("span",{class:"swatch",style:Ge({background:f.accent})},null,4)]),p("span",uS,z(f.name),1)],8,lS))),128))])]),p("section",dS,[d[10]||(d[10]=p("div",{class:"section-title"},"三色 seed",-1)),p("div",fS,[p("label",pS,[d[6]||(d[6]=p("span",{class:"field-label"},"主色",-1)),et(p("input",{type:"color","onUpdate:modelValue":d[1]||(d[1]=f=>s.primary=f)},null,512),[[vt,s.primary]]),p("code",hS,z(s.primary),1)]),p("label",mS,[d[7]||(d[7]=p("span",{class:"field-label"},"辅色",-1)),et(p("input",{type:"color","onUpdate:modelValue":d[2]||(d[2]=f=>s.secondary=f)},null,512),[[vt,s.secondary]]),p("code",gS,z(s.secondary),1)]),p("label",bS,[d[8]||(d[8]=p("span",{class:"field-label"},"点缀",-1)),et(p("input",{type:"color","onUpdate:modelValue":d[3]||(d[3]=f=>s.accent=f)},null,512),[[vt,s.accent]]),p("code",yS,z(s.accent),1)])]),p("div",vS,[p("label",wS,[et(p("input",{type:"checkbox","onUpdate:modelValue":d[4]||(d[4]=f=>s.dark=f)},null,512),[[Ng,s.dark]]),d[9]||(d[9]=De(" 暗底主题 ",-1))]),p("button",{class:"btn btn-ghost",onClick:l},"由主色补全")])]),p("section",SS,[d[12]||(d[12]=p("div",{class:"section-title"},"对比度",-1)),p("div",{class:Ce(["check mono",{fail:!r.contrastPass}])},[d[11]||(d[11]=De(" primary × bg = ",-1)),p("strong",null,z(r.contrastRatio.toFixed(1)),1),r.contrastPass?(T(),L("span",_S,"通过 WCAG AA 3.0")):(T(),L("span",kS,"低于 3.0 · 可读性差"))],2)]),p("footer",xS,[p("button",{class:"btn btn-ghost wide",disabled:!n.hasCustomColor,onClick:c},"还原为主题默认",8,CS)])]))}}),ES=Oe($S,[["__scopeId","data-v-3ab45869"]]),Re=te(""),Ze=te("default"),Ei=te(null),Tt=te(null),dn=te("editor"),bn=te(null),Vr=ne(()=>Ei.value?ri(Ei.value):Tt.value??ri(Ze.value)),TS=["aria-valuenow","aria-valuemin","aria-valuemax"],AS=Me({__name:"DrawerResizer",props:{width:{},min:{},max:{},defaultWidth:{}},emits:["update:width"],setup(e,{emit:t}){const n=e,o=t,s=ne(()=>n.min??300);function r(w){return n.max!==void 0&&w>n.max?n.max:w<s.value?s.value:w}let i=0,a=0;function l(w){w.button===0&&(w.preventDefault(),i=w.clientX,a=n.width??n.defaultWidth,document.body.classList.add("splitter-dragging"),window.addEventListener("mousemove",c),window.addEventListener("mouseup",u,{once:!0}))}function c(w){const A=i-w.clientX;o("update:width",r(a+A))}function u(){document.body.classList.remove("splitter-dragging"),window.removeEventListener("mousemove",c)}let d=0,f=0;function m(w){w.touches.length===1&&(d=w.touches[0].clientX,f=n.width??n.defaultWidth)}function v(w){if(w.touches.length!==1)return;const A=d-w.touches[0].clientX;o("update:width",r(f+A))}function g(){o("update:width",null)}function h(w){let A=0;if(w.key==="ArrowLeft")A=24;else if(w.key==="ArrowRight")A=-24;else if(w.key==="PageUp")A=96;else if(w.key==="PageDown")A=-96;else if(w.key==="Home"){n.max!==void 0&&o("update:width",n.max),w.preventDefault();return}else if(w.key==="End"){o("update:width",s.value),w.preventDefault();return}else if(w.key==="Enter"||w.key===" "){o("update:width",null),w.preventDefault();return}else return;w.preventDefault();const M=n.width??n.defaultWidth;o("update:width",r(M+A))}return Je(()=>{window.removeEventListener("mousemove",c),document.body.classList.remove("splitter-dragging")}),(w,A)=>(T(),L("div",{class:"drawer-resizer",role:"separator","aria-orientation":"vertical","aria-label":"拖动加宽抽屉（双击恢复默认）","aria-valuenow":n.width??void 0,"aria-valuemin":s.value,"aria-valuemax":n.max,tabindex:"0",onMousedown:l,onTouchstart:m,onTouchmove:v,onTouchend:()=>{},onDblclick:g,onKeydown:h},[...A[0]||(A[0]=[p("span",{class:"drawer-resizer-handle","aria-hidden":"true"},null,-1)])],40,TS))}}),mf=Oe(AS,[["__scopeId","data-v-fe9f7c25"]]),IS={class:"palette-editor"},RS={class:"section",open:""},MS={class:"row-label"},OS=["value","onInput"],NS=["value","onInput"],LS={class:"section"},DS={class:"status-label"},PS={class:"color-row"},BS=["value","onInput"],FS=["value","onInput"],jS={class:"color-row"},HS=["value","onInput"],VS=["value","onInput"],US=Me({__name:"PaletteEditor",props:{palette:{},status:{}},setup(e){const t=[["primary","主色"],["secondary","次色"],["accent","点睛色"],["bg","正文底色"],["bgSoft","柔底（intro / quote 等）"],["bgMuted","极柔底（inline code）"],["text","正文文本"],["textMuted","次要文本（脚注 / hint）"],["textInverse","反白文本（暗底主题）"],["border","描边 / divider"],["code","inline code 文本色"]],n=[["tip","tip · 提示"],["info","info · 信息"],["warning","warning · 警告"],["danger","danger · 危险"]];return(o,s)=>(T(),L("div",IS,[p("details",RS,[s[0]||(s[0]=p("summary",{class:"section-title"},"色板 · palette",-1)),(T(),L(ae,null,Te(t,([r,i])=>p("label",{key:r,class:"color-row"},[p("span",MS,z(i),1),p("input",{type:"color",value:e.palette[r],onInput:a=>e.palette[r]=a.target.value},null,40,OS),p("input",{class:"hex-input",type:"text",value:e.palette[r],onInput:a=>e.palette[r]=a.target.value},null,40,NS)])),64))]),p("details",LS,[s[3]||(s[3]=p("summary",{class:"section-title"},"状态四色 · status",-1)),(T(),L(ae,null,Te(n,([r,i])=>p("div",{key:r,class:"status-block"},[p("div",DS,z(i),1),p("label",PS,[s[1]||(s[1]=p("span",{class:"row-label"},"accent",-1)),p("input",{type:"color",value:e.status[r].accent,onInput:a=>e.status[r].accent=a.target.value},null,40,BS),p("input",{class:"hex-input",type:"text",value:e.status[r].accent,onInput:a=>e.status[r].accent=a.target.value},null,40,FS)]),p("label",jS,[s[2]||(s[2]=p("span",{class:"row-label"},"soft",-1)),p("input",{type:"color",value:e.status[r].soft,onInput:a=>e.status[r].soft=a.target.value},null,40,HS),p("input",{class:"hex-input",type:"text",value:e.status[r].soft,onInput:a=>e.status[r].soft=a.target.value},null,40,VS)])])),64))])]))}}),zS=Oe(US,[["__scopeId","data-v-4b4f114a"]]),Ti=Object.freeze({CONTRACT_VIOLATION:{exitCode:4,description:"markdown 容器/语法/嵌套错（fence_not_closed 等）"},SPEC_INVALID:{exitCode:3,description:"PersonaSpec 校验失败"},INPUT_AMBIGUOUS:{exitCode:1,description:"render 同时给 persona/theme/spec"},RESOURCE_NOT_FOUND:{exitCode:2,description:"未知 persona / 容器 / variant id"},PLATFORM_UNSUPPORTED:{exitCode:5,description:"未知 publish 平台 id"},RENDER_FAILED:{exitCode:6,description:"管线内部异常（未归类，兜底）。与 CONTRACT_VIOLATION 区分，便于 CI 程序化分支"}});Object.freeze(Object.keys(Ti));class WS extends Error{code;errors;warnings;constructor(t,n,o=[]){const s=n[0]?.message??t,r=n.length>1?` (+${n.length-1} more)`:"";super(`${t}: ${s}${r}`),this.name="WtException",this.code=t,this.errors=n,this.warnings=o}}Object.freeze(Object.fromEntries(Object.keys(Ti).map(e=>[e,Ti[e].exitCode])));function gf(e,t,n={}){throw new WS(e,[{message:t,severity:"error",...n}])}function _a(e,t){return e.level==="tokens"?{...t,wrapperCSS:qS(t.wrapperCSS,e.tokens)}:{...t,wrapperCSS:Ur(t.wrapperCSS,e.cssPatch.wrapperCSS)??"",titleCSS:Ur(t.titleCSS,e.cssPatch.titleCSS),bodyCSS:Ur(t.bodyCSS,e.cssPatch.bodyCSS)}}const KS="--uv-";function qS(e,t){const n=Object.entries(t);if(n.length===0)return e;const o=n.map(([s,r])=>`${KS}${s}:${r}`).join(";");return e?`${e};${o}`:o}function Ur(e,t){return t?e===""?"":e?`${e};${t}`:t:e}function ka(e){return e.level==="tokens"||e.level==="patch"}function Cn(e){const{name:t,themeSlot:n,table:o,fallbackId:s,resolveAlias:r,args:i,title:a,body:l}=e;function c(u){const d=u.pageVariants?.[n],f=u.variants[n],m=d&&d in o?d:void 0,v=f&&f in o?f:void 0,g=u.attrs.variant;if(g){const M=g.toLowerCase().trim();if(M.startsWith("uv_")){const R=u.userVariants?.get(M);if(R&&ka(R)&&R.base.kind===n){const B=o[R.base.variantId];if(B?.render){const N=B.render(u,i?.(u));return{id:R.id,result:_a(R,N)}}}}}let h=s;if(g){const M=g.toLowerCase().trim(),B=r?.(M)??g;B in o?h=B:h=m??v??s}else h=m??v??s;const A=(o[h]??o[s]).render(u,i?.(u));return{id:h,result:A}}return{open:u=>{const{id:d,result:f}=c(u),m=()=>a?.defaultText?typeof a.defaultText=="function"?a.defaultText(u):a.defaultText:"",v=a?u.info.trim()||m():"",g=!!a&&v!==""&&f.titleCSS!=="",h=[];if(h.push(`<section class="container-${t} container-${t}--${d}" style="${f.wrapperCSS}">`),f.svgSlot&&h.push(f.svgSlot),g&&a){const w=f.titleCSS??(typeof a.defaultCSS=="function"?a.defaultCSS(u):a.defaultCSS),A=a.iconKey&&!f.suppressIcon?u.assets[a.iconKey]??"":"";h.push(`<section class="container-${t}__title" style="${w}">${A}${Y(v)}</section>`)}return l&&l.mode==="optional"&&f.bodyCSS&&h.push(`<section class="container-${t}__body" style="${f.bodyCSS}">`),h.join(`
`)+`
`},close:u=>{if(!l)return`</section>
`;const{result:d}=c(u);return(d.bodyCSS?`</section>
`:"")+`</section>
`}}}const GS={tip:"小贴士",warning:"注意",info:"说明",danger:"警告"};function ur(e){return Cn({name:e,themeSlot:"admonition",table:Np,fallbackId:"accent-bar",args:()=>({kind:e}),title:{defaultText:GS[e],defaultCSS:t=>`font-weight:700;color:${t.tokens.colors.status[e].accent};margin-bottom:6px;letter-spacing:0.3px`,iconKey:`${e}Icon`},body:{mode:"optional"}})}const YS=ur("tip"),JS=ur("warning"),QS=ur("info"),XS=ur("danger");function Lt(e,t,n,o){const s=e.attrs.variant;if(s&&s in n)return s;const r=e.variants[t];return r&&r in n?r:o}function Zo(e,t,n,o,s){const r=e.attrs.variant;if(r){const l=r.toLowerCase().trim();if(l.startsWith("uv_")){const c=e.userVariants?.get(l);if(c&&ka(c)&&c.base.kind===t){const u=n[c.base.variantId];if(u?.render){const d=u.render(e,s?.(e));return{id:c.base.variantId,result:_a(c,d)}}}}}const i=Lt(e,t,n,o),a=n[i].render(e,s?.(e));return{id:i,result:a}}const ZS={open:e=>{const t=e.info.trim();return`<section class="container-intro">
${t?`<section class="container-intro__title" style="font-weight:700;margin-bottom:10px">${Y(t)}</section>`:""}`},close:`</section>
`};function bf(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",o=e.attrs.date??"",s=e.attrs.kind??"";return!n&&!o&&!s?"":t(n,o,s)}const e2={open:e=>{const t=e.info.trim(),n=t?`<section class="container-cover__title" style="text-align:center;font-weight:700;font-size:18px;margin-bottom:10px">${Y(t)}</section>`:"",o=bf(e),s=o?`<section class="container-cover__stamp" style="margin-top:12px;text-align:center">${o}</section>`:"";return`<section class="container-cover">
${n}${s}`},close:`</section>
`},t2={open:e=>{const t=e.info.trim()||"作者",n=e.attrs.role?`<span style="color:${e.tokens.colors.textMuted};margin-left:8px">${Y(e.attrs.role)}</span>`:"",o=bf(e),s=o?`<span class="container-author__stamp" style="margin-left:10px;vertical-align:middle">${o}</span>`:"";return`<section class="container-author">
<section class="container-author__header" style="margin-bottom:8px"><strong>${Y(t)}</strong>${n}${s}</section>
`},close:`</section>
`},n2={open:e=>{const t=e.info.trim(),n=Lt(e,"sectionTitle",za,"bordered"),o=za[n].render(e),s=[];if(s.push(`<section class="container-section-title container-section-title--${n}" style="${o.wrapperCSS}">`),t){const r=o.svgSlot??"",i=o.titleCSS??"font-weight:700;font-size:20px";s.push(`<section class="container-section-title__label" style="${i}">${r}${Y(t)}</section>`)}return s.join(`
`)+`
`},close:`</section>
`};function o2(e){return`text-align:center;color:${e.tokens.colors.textMuted};margin-top:2px;font-size:13px`}const s2={open:e=>{const{id:t,result:n}=Zo(e,"quote",Wa,"classic"),o=[];return o.push(`<section class="container-quote-card container-quote-card--${t}" style="${n.wrapperCSS}">`),n.svgSlot&&o.push(n.svgSlot),o.push(`<section class="container-quote-card__body" style="${n.bodyCSS??""}">`),o.join(`
`)+`
`},close:e=>{const{result:t}=Zo(e,"quote",Wa,"classic"),n=t.closeSlot??"",o=e.info.trim();if(!o)return`</section>
${n}</section>
`;const s=t.bylineCSS??o2(e),r=t.bylinePrefix??"— ";return`</section>
${`<section class="container-quote-card__byline" style="${s}">${Y(r)}${Y(o)}</section>`}
${n}</section>
`}},r2={open:e=>{const{id:t,result:n}=Zo(e,"highlight",Lp,"plain"),o=`container-highlight container-highlight--${t}`,s=n.wrapperCSS?` style="${n.wrapperCSS}"`:"";return`<section class="${o}"${s}>
`},close:`</section>
`},i2={open:e=>{const t=Lt(e,"compare",ii,"column-card"),n=ii[t].render(e,{slot:"wrapper"});return`<section class="container-compare container-compare--${t}" style="${n.wrapperCSS}">
`},close:`</section>
`};function yf(e,t){return Cn({name:e,themeSlot:"compare",table:ii,fallbackId:"column-card",args:()=>({slot:e}),title:{defaultText:t,defaultCSS:"font-weight:700;margin-bottom:6px"}})}const a2=yf("pros","优点"),l2=yf("cons","缺点"),c2=Cn({name:"steps",themeSlot:"steps",table:Dp,fallbackId:"number-circle",title:{defaultCSS:"font-weight:700;margin-bottom:12px"},body:{mode:"optional"}}),u2=Cn({name:"divider",themeSlot:"divider",table:Pp,fallbackId:"rule",resolveAlias:e=>e==="line"?"rule":void 0}),_o=function(e,t){let s=e;const r=No[t];let i=null,a=0,l=null;const c=[],u={},d=function(k,y){a=s*4+17,i=function(b){const _=new Array(b);for(let x=0;x<b;x+=1){_[x]=new Array(b);for(let $=0;$<b;$+=1)_[x][$]=null}return _}(a),f(0,0),f(a-7,0),f(0,a-7),g(),v(),w(k,y),s>=7&&h(k),l==null&&(l=R(s,r,c)),A(l,y)},f=function(k,y){for(let b=-1;b<=7;b+=1)if(!(k+b<=-1||a<=k+b))for(let _=-1;_<=7;_+=1)y+_<=-1||a<=y+_||(0<=b&&b<=6&&(_==0||_==6)||0<=_&&_<=6&&(b==0||b==6)||2<=b&&b<=4&&2<=_&&_<=4?i[k+b][y+_]=!0:i[k+b][y+_]=!1)},m=function(){let k=0,y=0;for(let b=0;b<8;b+=1){d(!0,b);const _=pn.getLostPoint(u);(b==0||k>_)&&(k=_,y=b)}return y},v=function(){for(let k=8;k<a-8;k+=1)i[k][6]==null&&(i[k][6]=k%2==0);for(let k=8;k<a-8;k+=1)i[6][k]==null&&(i[6][k]=k%2==0)},g=function(){const k=pn.getPatternPosition(s);for(let y=0;y<k.length;y+=1)for(let b=0;b<k.length;b+=1){const _=k[y],x=k[b];if(i[_][x]==null)for(let $=-2;$<=2;$+=1)for(let P=-2;P<=2;P+=1)$==-2||$==2||P==-2||P==2||$==0&&P==0?i[_+$][x+P]=!0:i[_+$][x+P]=!1}},h=function(k){const y=pn.getBCHTypeNumber(s);for(let b=0;b<18;b+=1){const _=!k&&(y>>b&1)==1;i[Math.floor(b/3)][b%3+a-8-3]=_}for(let b=0;b<18;b+=1){const _=!k&&(y>>b&1)==1;i[b%3+a-8-3][Math.floor(b/3)]=_}},w=function(k,y){const b=r<<3|y,_=pn.getBCHTypeInfo(b);for(let x=0;x<15;x+=1){const $=!k&&(_>>x&1)==1;x<6?i[x][8]=$:x<8?i[x+1][8]=$:i[a-15+x][8]=$}for(let x=0;x<15;x+=1){const $=!k&&(_>>x&1)==1;x<8?i[8][a-x-1]=$:x<9?i[8][15-x-1+1]=$:i[8][15-x-1]=$}i[a-8][8]=!k},A=function(k,y){let b=-1,_=a-1,x=7,$=0;const P=pn.getMaskFunction(y);for(let W=a-1;W>0;W-=2)for(W==6&&(W-=1);;){for(let O=0;O<2;O+=1)if(i[_][W-O]==null){let E=!1;$<k.length&&(E=(k[$]>>>x&1)==1),P(_,W-O)&&(E=!E),i[_][W-O]=E,x-=1,x==-1&&($+=1,x=7)}if(_+=b,_<0||a<=_){_-=b,b=-b;break}}},M=function(k,y){let b=0,_=0,x=0;const $=new Array(y.length),P=new Array(y.length);for(let F=0;F<y.length;F+=1){const j=y[F].dataCount,oe=y[F].totalCount-j;_=Math.max(_,j),x=Math.max(x,oe),$[F]=new Array(j);for(let Ie=0;Ie<$[F].length;Ie+=1)$[F][Ie]=255&k.getBuffer()[Ie+b];b+=j;const be=pn.getErrorCorrectPolynomial(oe),Ee=es($[F],be.getLength()-1).mod(be);P[F]=new Array(be.getLength()-1);for(let Ie=0;Ie<P[F].length;Ie+=1){const le=Ie+Ee.getLength()-P[F].length;P[F][Ie]=le>=0?Ee.getAt(le):0}}let W=0;for(let F=0;F<y.length;F+=1)W+=y[F].totalCount;const O=new Array(W);let E=0;for(let F=0;F<_;F+=1)for(let j=0;j<y.length;j+=1)F<$[j].length&&(O[E]=$[j][F],E+=1);for(let F=0;F<x;F+=1)for(let j=0;j<y.length;j+=1)F<P[j].length&&(O[E]=P[j][F],E+=1);return O},R=function(k,y,b){const _=fc.getRSBlocks(k,y),x=pc();for(let P=0;P<b.length;P+=1){const W=b[P];x.put(W.getMode(),4),x.put(W.getLength(),pn.getLengthInBits(W.getMode(),k)),W.write(x)}let $=0;for(let P=0;P<_.length;P+=1)$+=_[P].dataCount;if(x.getLengthInBits()>$*8)throw"code length overflow. ("+x.getLengthInBits()+">"+$*8+")";for(x.getLengthInBits()+4<=$*8&&x.put(0,4);x.getLengthInBits()%8!=0;)x.putBit(!1);for(;!(x.getLengthInBits()>=$*8||(x.put(236,8),x.getLengthInBits()>=$*8));)x.put(17,8);return M(x,_)};u.addData=function(k,y){y=y||"Byte";let b=null;switch(y){case"Numeric":b=d2(k);break;case"Alphanumeric":b=f2(k);break;case"Byte":b=p2(k);break;case"Kanji":b=h2(k);break;default:throw"mode:"+y}c.push(b),l=null},u.isDark=function(k,y){if(k<0||a<=k||y<0||a<=y)throw k+","+y;return i[k][y]},u.getModuleCount=function(){return a},u.make=function(){if(s<1){let k=1;for(;k<40;k++){const y=fc.getRSBlocks(k,r),b=pc();for(let x=0;x<c.length;x++){const $=c[x];b.put($.getMode(),4),b.put($.getLength(),pn.getLengthInBits($.getMode(),k)),$.write(b)}let _=0;for(let x=0;x<y.length;x++)_+=y[x].dataCount;if(b.getLengthInBits()<=_*8)break}s=k}d(!1,m())},u.createTableTag=function(k,y){k=k||2,y=typeof y>"u"?k*4:y;let b="";b+='<table style="',b+=" border-width: 0px; border-style: none;",b+=" border-collapse: collapse;",b+=" padding: 0px; margin: "+y+"px;",b+='">',b+="<tbody>";for(let _=0;_<u.getModuleCount();_+=1){b+="<tr>";for(let x=0;x<u.getModuleCount();x+=1)b+='<td style="',b+=" border-width: 0px; border-style: none;",b+=" border-collapse: collapse;",b+=" padding: 0px; margin: 0px;",b+=" width: "+k+"px;",b+=" height: "+k+"px;",b+=" background-color: ",b+=u.isDark(_,x)?"#000000":"#ffffff",b+=";",b+='"/>';b+="</tr>"}return b+="</tbody>",b+="</table>",b},u.createSvgTag=function(k,y,b,_){let x={};typeof arguments[0]=="object"&&(x=arguments[0],k=x.cellSize,y=x.margin,b=x.alt,_=x.title),k=k||2,y=typeof y>"u"?k*4:y,b=typeof b=="string"?{text:b}:b||{},b.text=b.text||null,b.id=b.text?b.id||"qrcode-description":null,_=typeof _=="string"?{text:_}:_||{},_.text=_.text||null,_.id=_.text?_.id||"qrcode-title":null;const $=u.getModuleCount()*k+y*2;let P,W,O,E,F="",j;for(j="l"+k+",0 0,"+k+" -"+k+",0 0,-"+k+"z ",F+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',F+=x.scalable?"":' width="'+$+'px" height="'+$+'px"',F+=' viewBox="0 0 '+$+" "+$+'" ',F+=' preserveAspectRatio="xMinYMin meet"',F+=_.text||b.text?' role="img" aria-labelledby="'+B([_.id,b.id].join(" ").trim())+'"':"",F+=">",F+=_.text?'<title id="'+B(_.id)+'">'+B(_.text)+"</title>":"",F+=b.text?'<description id="'+B(b.id)+'">'+B(b.text)+"</description>":"",F+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',F+='<path d="',O=0;O<u.getModuleCount();O+=1)for(E=O*k+y,P=0;P<u.getModuleCount();P+=1)u.isDark(O,P)&&(W=P*k+y,F+="M"+W+","+E+j);return F+='" stroke="transparent" fill="black"/>',F+="</svg>",F},u.createDataURL=function(k,y){k=k||2,y=typeof y>"u"?k*4:y;const b=u.getModuleCount()*k+y*2,_=y,x=b-y;return y2(b,b,function($,P){if(_<=$&&$<x&&_<=P&&P<x){const W=Math.floor(($-_)/k),O=Math.floor((P-_)/k);return u.isDark(O,W)?0:1}else return 1})},u.createImgTag=function(k,y,b){k=k||2,y=typeof y>"u"?k*4:y;const _=u.getModuleCount()*k+y*2;let x="";return x+="<img",x+=' src="',x+=u.createDataURL(k,y),x+='"',x+=' width="',x+=_,x+='"',x+=' height="',x+=_,x+='"',b&&(x+=' alt="',x+=B(b),x+='"'),x+="/>",x};const B=function(k){let y="";for(let b=0;b<k.length;b+=1){const _=k.charAt(b);switch(_){case"<":y+="&lt;";break;case">":y+="&gt;";break;case"&":y+="&amp;";break;case'"':y+="&quot;";break;default:y+=_;break}}return y},N=function(k){k=typeof k>"u"?1*2:k;const b=u.getModuleCount()*1+k*2,_=k,x=b-k;let $,P,W,O,E;const F={"██":"█","█ ":"▀"," █":"▄","  ":" "},j={"██":"▀","█ ":"▀"," █":" ","  ":" "};let oe="";for($=0;$<b;$+=2){for(W=Math.floor(($-_)/1),O=Math.floor(($+1-_)/1),P=0;P<b;P+=1)E="█",_<=P&&P<x&&_<=$&&$<x&&u.isDark(W,Math.floor((P-_)/1))&&(E=" "),_<=P&&P<x&&_<=$+1&&$+1<x&&u.isDark(O,Math.floor((P-_)/1))?E+=" ":E+="█",oe+=k<1&&$+1>=x?j[E]:F[E];oe+=`
`}return b%2&&k>0?oe.substring(0,oe.length-b-1)+Array(b+1).join("▀"):oe.substring(0,oe.length-1)};return u.createASCII=function(k,y){if(k=k||1,k<2)return N(y);k-=1,y=typeof y>"u"?k*2:y;const b=u.getModuleCount()*k+y*2,_=y,x=b-y;let $,P,W,O;const E=Array(k+1).join("██"),F=Array(k+1).join("  ");let j="",oe="";for($=0;$<b;$+=1){for(W=Math.floor(($-_)/k),oe="",P=0;P<b;P+=1)O=1,_<=P&&P<x&&_<=$&&$<x&&u.isDark(W,Math.floor((P-_)/k))&&(O=0),oe+=O?E:F;for(W=0;W<k;W+=1)j+=oe+`
`}return j.substring(0,j.length-1)},u.renderTo2dContext=function(k,y){y=y||2;const b=u.getModuleCount();for(let _=0;_<b;_++)for(let x=0;x<b;x++)k.fillStyle=u.isDark(_,x)?"black":"white",k.fillRect(x*y,_*y,y,y)},u};_o.stringToBytes=function(e){const t=[];for(let n=0;n<e.length;n+=1){const o=e.charCodeAt(n);t.push(o&255)}return t};_o.createStringToBytes=function(e,t){const n=function(){const s=g2(e),r=function(){const l=s.read();if(l==-1)throw"eof";return l};let i=0;const a={};for(;;){const l=s.read();if(l==-1)break;const c=r(),u=r(),d=r(),f=String.fromCharCode(l<<8|c),m=u<<8|d;a[f]=m,i+=1}if(i!=t)throw i+" != "+t;return a}(),o=63;return function(s){const r=[];for(let i=0;i<s.length;i+=1){const a=s.charCodeAt(i);if(a<128)r.push(a);else{const l=n[s.charAt(i)];typeof l=="number"?(l&255)==l?r.push(l):(r.push(l>>>8),r.push(l&255)):r.push(o)}}return r}};const nt={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},No={L:1,M:0,Q:3,H:2},fn={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},pn=function(){const e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,n=7973,o=21522,s={},r=function(i){let a=0;for(;i!=0;)a+=1,i>>>=1;return a};return s.getBCHTypeInfo=function(i){let a=i<<10;for(;r(a)-r(t)>=0;)a^=t<<r(a)-r(t);return(i<<10|a)^o},s.getBCHTypeNumber=function(i){let a=i<<12;for(;r(a)-r(n)>=0;)a^=n<<r(a)-r(n);return i<<12|a},s.getPatternPosition=function(i){return e[i-1]},s.getMaskFunction=function(i){switch(i){case fn.PATTERN000:return function(a,l){return(a+l)%2==0};case fn.PATTERN001:return function(a,l){return a%2==0};case fn.PATTERN010:return function(a,l){return l%3==0};case fn.PATTERN011:return function(a,l){return(a+l)%3==0};case fn.PATTERN100:return function(a,l){return(Math.floor(a/2)+Math.floor(l/3))%2==0};case fn.PATTERN101:return function(a,l){return a*l%2+a*l%3==0};case fn.PATTERN110:return function(a,l){return(a*l%2+a*l%3)%2==0};case fn.PATTERN111:return function(a,l){return(a*l%3+(a+l)%2)%2==0};default:throw"bad maskPattern:"+i}},s.getErrorCorrectPolynomial=function(i){let a=es([1],0);for(let l=0;l<i;l+=1)a=a.multiply(es([1,mn.gexp(l)],0));return a},s.getLengthInBits=function(i,a){if(1<=a&&a<10)switch(i){case nt.MODE_NUMBER:return 10;case nt.MODE_ALPHA_NUM:return 9;case nt.MODE_8BIT_BYTE:return 8;case nt.MODE_KANJI:return 8;default:throw"mode:"+i}else if(a<27)switch(i){case nt.MODE_NUMBER:return 12;case nt.MODE_ALPHA_NUM:return 11;case nt.MODE_8BIT_BYTE:return 16;case nt.MODE_KANJI:return 10;default:throw"mode:"+i}else if(a<41)switch(i){case nt.MODE_NUMBER:return 14;case nt.MODE_ALPHA_NUM:return 13;case nt.MODE_8BIT_BYTE:return 16;case nt.MODE_KANJI:return 12;default:throw"mode:"+i}else throw"type:"+a},s.getLostPoint=function(i){const a=i.getModuleCount();let l=0;for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1){let m=0;const v=i.isDark(d,f);for(let g=-1;g<=1;g+=1)if(!(d+g<0||a<=d+g))for(let h=-1;h<=1;h+=1)f+h<0||a<=f+h||g==0&&h==0||v==i.isDark(d+g,f+h)&&(m+=1);m>5&&(l+=3+m-5)}for(let d=0;d<a-1;d+=1)for(let f=0;f<a-1;f+=1){let m=0;i.isDark(d,f)&&(m+=1),i.isDark(d+1,f)&&(m+=1),i.isDark(d,f+1)&&(m+=1),i.isDark(d+1,f+1)&&(m+=1),(m==0||m==4)&&(l+=3)}for(let d=0;d<a;d+=1)for(let f=0;f<a-6;f+=1)i.isDark(d,f)&&!i.isDark(d,f+1)&&i.isDark(d,f+2)&&i.isDark(d,f+3)&&i.isDark(d,f+4)&&!i.isDark(d,f+5)&&i.isDark(d,f+6)&&(l+=40);for(let d=0;d<a;d+=1)for(let f=0;f<a-6;f+=1)i.isDark(f,d)&&!i.isDark(f+1,d)&&i.isDark(f+2,d)&&i.isDark(f+3,d)&&i.isDark(f+4,d)&&!i.isDark(f+5,d)&&i.isDark(f+6,d)&&(l+=40);let c=0;for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1)i.isDark(f,d)&&(c+=1);const u=Math.abs(100*c/a/a-50)/5;return l+=u*10,l},s}(),mn=function(){const e=new Array(256),t=new Array(256);for(let o=0;o<8;o+=1)e[o]=1<<o;for(let o=8;o<256;o+=1)e[o]=e[o-4]^e[o-5]^e[o-6]^e[o-8];for(let o=0;o<255;o+=1)t[e[o]]=o;const n={};return n.glog=function(o){if(o<1)throw"glog("+o+")";return t[o]},n.gexp=function(o){for(;o<0;)o+=255;for(;o>=256;)o-=255;return e[o]},n}(),es=function(e,t){if(typeof e.length>"u")throw e.length+"/"+t;const n=function(){let s=0;for(;s<e.length&&e[s]==0;)s+=1;const r=new Array(e.length-s+t);for(let i=0;i<e.length-s;i+=1)r[i]=e[i+s];return r}(),o={};return o.getAt=function(s){return n[s]},o.getLength=function(){return n.length},o.multiply=function(s){const r=new Array(o.getLength()+s.getLength()-1);for(let i=0;i<o.getLength();i+=1)for(let a=0;a<s.getLength();a+=1)r[i+a]^=mn.gexp(mn.glog(o.getAt(i))+mn.glog(s.getAt(a)));return es(r,0)},o.mod=function(s){if(o.getLength()-s.getLength()<0)return o;const r=mn.glog(o.getAt(0))-mn.glog(s.getAt(0)),i=new Array(o.getLength());for(let a=0;a<o.getLength();a+=1)i[a]=o.getAt(a);for(let a=0;a<s.getLength();a+=1)i[a]^=mn.gexp(mn.glog(s.getAt(a))+r);return es(i,0).mod(s)},o},fc=function(){const e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(s,r){const i={};return i.totalCount=s,i.dataCount=r,i},n={},o=function(s,r){switch(r){case No.L:return e[(s-1)*4+0];case No.M:return e[(s-1)*4+1];case No.Q:return e[(s-1)*4+2];case No.H:return e[(s-1)*4+3];default:return}};return n.getRSBlocks=function(s,r){const i=o(s,r);if(typeof i>"u")throw"bad rs block @ typeNumber:"+s+"/errorCorrectionLevel:"+r;const a=i.length/3,l=[];for(let c=0;c<a;c+=1){const u=i[c*3+0],d=i[c*3+1],f=i[c*3+2];for(let m=0;m<u;m+=1)l.push(t(d,f))}return l},n}(),pc=function(){const e=[];let t=0;const n={};return n.getBuffer=function(){return e},n.getAt=function(o){const s=Math.floor(o/8);return(e[s]>>>7-o%8&1)==1},n.put=function(o,s){for(let r=0;r<s;r+=1)n.putBit((o>>>s-r-1&1)==1)},n.getLengthInBits=function(){return t},n.putBit=function(o){const s=Math.floor(t/8);e.length<=s&&e.push(0),o&&(e[s]|=128>>>t%8),t+=1},n},d2=function(e){const t=nt.MODE_NUMBER,n=e,o={};o.getMode=function(){return t},o.getLength=function(i){return n.length},o.write=function(i){const a=n;let l=0;for(;l+2<a.length;)i.put(s(a.substring(l,l+3)),10),l+=3;l<a.length&&(a.length-l==1?i.put(s(a.substring(l,l+1)),4):a.length-l==2&&i.put(s(a.substring(l,l+2)),7))};const s=function(i){let a=0;for(let l=0;l<i.length;l+=1)a=a*10+r(i.charAt(l));return a},r=function(i){if("0"<=i&&i<="9")return i.charCodeAt(0)-48;throw"illegal char :"+i};return o},f2=function(e){const t=nt.MODE_ALPHA_NUM,n=e,o={};o.getMode=function(){return t},o.getLength=function(r){return n.length},o.write=function(r){const i=n;let a=0;for(;a+1<i.length;)r.put(s(i.charAt(a))*45+s(i.charAt(a+1)),11),a+=2;a<i.length&&r.put(s(i.charAt(a)),6)};const s=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-48;if("A"<=r&&r<="Z")return r.charCodeAt(0)-65+10;switch(r){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+r}};return o},p2=function(e){const t=nt.MODE_8BIT_BYTE,n=_o.stringToBytes(e),o={};return o.getMode=function(){return t},o.getLength=function(s){return n.length},o.write=function(s){for(let r=0;r<n.length;r+=1)s.put(n[r],8)},o},h2=function(e){const t=nt.MODE_KANJI,n=_o.stringToBytes;(function(r,i){const a=n(r);if(a.length!=2||(a[0]<<8|a[1])!=i)throw"sjis not supported."})("友",38726);const o=n(e),s={};return s.getMode=function(){return t},s.getLength=function(r){return~~(o.length/2)},s.write=function(r){const i=o;let a=0;for(;a+1<i.length;){let l=(255&i[a])<<8|255&i[a+1];if(33088<=l&&l<=40956)l-=33088;else if(57408<=l&&l<=60351)l-=49472;else throw"illegal char at "+(a+1)+"/"+l;l=(l>>>8&255)*192+(l&255),r.put(l,13),a+=2}if(a<i.length)throw"illegal char at "+(a+1)},s},vf=function(){const e=[],t={};return t.writeByte=function(n){e.push(n&255)},t.writeShort=function(n){t.writeByte(n),t.writeByte(n>>>8)},t.writeBytes=function(n,o,s){o=o||0,s=s||n.length;for(let r=0;r<s;r+=1)t.writeByte(n[r+o])},t.writeString=function(n){for(let o=0;o<n.length;o+=1)t.writeByte(n.charCodeAt(o))},t.toByteArray=function(){return e},t.toString=function(){let n="";n+="[";for(let o=0;o<e.length;o+=1)o>0&&(n+=","),n+=e[o];return n+="]",n},t},m2=function(){let e=0,t=0,n=0,o="";const s={},r=function(a){o+=String.fromCharCode(i(a&63))},i=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return s.writeByte=function(a){for(e=e<<8|a&255,t+=8,n+=1;t>=6;)r(e>>>t-6),t-=6},s.flush=function(){if(t>0&&(r(e<<6-t),e=0,t=0),n%3!=0){const a=3-n%3;for(let l=0;l<a;l+=1)o+="="}},s.toString=function(){return o},s},g2=function(e){const t=e;let n=0,o=0,s=0;const r={};r.read=function(){for(;s<8;){if(n>=t.length){if(s==0)return-1;throw"unexpected end of file./"+s}const l=t.charAt(n);if(n+=1,l=="=")return s=0,-1;if(l.match(/^\s$/))continue;o=o<<6|i(l.charCodeAt(0)),s+=6}const a=o>>>s-8&255;return s-=8,a};const i=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return r},b2=function(e,t){const n=e,o=t,s=new Array(e*t),r={};r.setPixel=function(c,u,d){s[u*n+c]=d},r.write=function(c){c.writeString("GIF87a"),c.writeShort(n),c.writeShort(o),c.writeByte(128),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(255),c.writeByte(255),c.writeByte(255),c.writeString(","),c.writeShort(0),c.writeShort(0),c.writeShort(n),c.writeShort(o),c.writeByte(0);const u=2,d=a(u);c.writeByte(u);let f=0;for(;d.length-f>255;)c.writeByte(255),c.writeBytes(d,f,255),f+=255;c.writeByte(d.length-f),c.writeBytes(d,f,d.length-f),c.writeByte(0),c.writeString(";")};const i=function(c){const u=c;let d=0,f=0;const m={};return m.write=function(v,g){if(v>>>g)throw"length over";for(;d+g>=8;)u.writeByte(255&(v<<d|f)),g-=8-d,v>>>=8-d,f=0,d=0;f=v<<d|f,d=d+g},m.flush=function(){d>0&&u.writeByte(f)},m},a=function(c){const u=1<<c,d=(1<<c)+1;let f=c+1;const m=l();for(let A=0;A<u;A+=1)m.add(String.fromCharCode(A));m.add(String.fromCharCode(u)),m.add(String.fromCharCode(d));const v=vf(),g=i(v);g.write(u,f);let h=0,w=String.fromCharCode(s[h]);for(h+=1;h<s.length;){const A=String.fromCharCode(s[h]);h+=1,m.contains(w+A)?w=w+A:(g.write(m.indexOf(w),f),m.size()<4095&&(m.size()==1<<f&&(f+=1),m.add(w+A)),w=A)}return g.write(m.indexOf(w),f),g.write(d,f),g.flush(),v.toByteArray()},l=function(){const c={};let u=0;const d={};return d.add=function(f){if(d.contains(f))throw"dup key:"+f;c[f]=u,u+=1},d.size=function(){return u},d.indexOf=function(f){return c[f]},d.contains=function(f){return typeof c[f]<"u"},d};return r},y2=function(e,t,n){const o=b2(e,t);for(let a=0;a<t;a+=1)for(let l=0;l<e;l+=1)o.setPixel(l,a,n(l,a));const s=vf();o.write(s);const r=m2(),i=s.toByteArray();for(let a=0;a<i.length;a+=1)r.writeByte(i[a]);return r.flush(),"data:image/gif;base64,"+r};_o.stringToBytes;function v2(e,t={}){const n=t.ecc??"M",o=t.margin??4,s=t.fg??"#000",r=t.bg??"#fff",i=_o(0,n);i.addData(e,"Byte"),i.make();const a=i.getModuleCount(),l=a+o*2,c=[];for(let d=0;d<a;d++)for(let f=0;f<a;f++)i.isDark(d,f)&&c.push(`M${f+o} ${d+o}h1v1h-1z`);const u=t.size?` width="${t.size}" height="${t.size}"`:"";return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${l} ${l}"${u} shape-rendering="crispEdges"><rect width="${l}" height="${l}" fill="${r}"/><path d="${c.join("")}" fill="${s}"/></svg>`}function w2(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",o=e.attrs.date??"",s=e.attrs.kind??"";return!n&&!o&&!s?"":t(n,o,s)}function S2(e){const t=e.tokens.colors,n=e.attrs.like??"♡ 赞同",o=e.attrs.star??"★ 收藏",s=e.attrs.share??"↗ 转发",r=e.info.trim(),i=r?"":"display:table;width:100%;table-layout:fixed;border-collapse:collapse;",a=["display:table-cell","padding:12px 0","text-align:center","font-size:11px","letter-spacing:0.1em","box-sizing:border-box"],l=[...a,`color:${t.text}`,`border-right:1px solid ${t.text}`].join(";"),c=[...a,`color:${t.text}`].join(";"),u=[...a,`background-color:${t.primary}`,`color:${t.textInverse}`,"font-weight:500",`border-right:1px solid ${t.text}`].join(";"),d="display:table;width:100%;table-layout:fixed;border-collapse:collapse",f=`<span style="${l}">${Y(n)}</span><span style="${u}">${Y(o)}</span><span style="${c}">${Y(s)}</span>`;return r?`<section class="container-footer-cta container-footer-cta--triptych-actions"><section class="container-footer-cta__kicker" style="${["display:block",`background-color:${t.text}`,`color:${t.textInverse}`,"padding:5px 10px","font-size:10px","letter-spacing:0.2em","font-weight:700"].join(";")}">${Y(r)}</section><section class="container-footer-cta__cells" style="${d}">${f}</section></section>
`:`<section class="container-footer-cta container-footer-cta--triptych-actions" style="${i}">${f}</section>
`}const _2={open:e=>{if(Lt(e,"footerCTA",qa,"button-led")==="triptych-actions")return S2(e);const n=e.info.trim()||e.kickers.footerCTATitle,o=e.attrs.cta?Y(e.attrs.cta):"",s=e.attrs.href??"",r=`display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:6px 18px;box-sizing:border-box;border-radius:${e.tokens.radius.lg}px;background-color:${e.tokens.colors.primary};color:${e.tokens.colors.textInverse};text-decoration:none`,i=o?s?`<a href="${ze(s)}" data-wx-footer-cta="" style="${r}">${o}</a>`:`<span style="${r}">${o}</span>`:"",a=i?`<section class="container-footer-cta__cta" style="text-align:center;margin-top:10px">${i}</section>`:"",l=w2(e);return`<section class="container-footer-cta container-footer-cta--button-led" style="text-align:center">
`+(l?`<section class="container-footer-cta__stamp" style="text-align:center;margin-bottom:10px">${l}</section>`:"")+`<section class="container-footer-cta__title" style="font-weight:700;font-size:16px;margin-bottom:8px">${Y(n)}</section>
`+a+`
`},close:e=>Lt(e,"footerCTA",qa,"button-led")==="triptych-actions"?"":(e.assets.sealMark?`<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${e.assets.sealMark}</section>
`:"")+`</section>
`},k2=Cn({name:"recommend",themeSlot:"recommend",table:Bp,fallbackId:"card-list",title:{defaultText:e=>e.kickers.recommend,defaultCSS:"font-weight:700;margin-bottom:10px"}});function wf(e){const t=e.attrs.text;if(!t)return"";const n=(e.attrs.ecc??"M").toUpperCase(),s=["L","M","Q","H"].includes(n)?n:"M",r=Number(e.attrs.size??"")||160;let i;try{i=v2(t,{ecc:s,fg:e.tokens.colors.text,bg:e.tokens.colors.bg,size:r})}catch(a){return`<section class="container-qrcode__error" style="color:${e.tokens.colors.textMuted};font-size:12px">[QR 编码失败：${Y(String(a))}]</section>
`}return`<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${i}</section>
`}function zr(e,t){const n=e.tokens.colors,o=e.attrs.qr??"",s=`display:block;width:${t}px;height:${t}px`;if(e.attrs.text)return wf(e).replace(/margin-bottom:8px/,s);if(o)return`<img src="${ze(o)}" alt="QR" style="${s}"/>`;const r=n.bg;return`<svg viewBox="0 0 60 60" width="${t}" height="${t}" style="${s}"><g fill="${n.text}"><rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="${r}"/><rect x="9" y="9" width="4" height="4"/><rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="${r}"/><rect x="47" y="9" width="4" height="4"/><rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="${r}"/><rect x="9" y="47" width="4" height="4"/><rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/><rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/><rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/><rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/></g></svg>`}const x2={open:e=>{const t=Lt(e,"qrcode",Ka,"bare");if(t==="qr-stack"){const l=e.tokens.colors,c=e.attrs.kicker??e.kickers.qrFollowKicker,u=e.info.trim()||e.kickers.qrFollowTitle,d=e.attrs.desc??"",f=zr(e,96),m="text-align:center;line-height:0;margin-bottom:12px",v=["font-family:Menlo,Monaco,monospace","font-size:10px","font-weight:700",`color:${l.primary}`,"letter-spacing:0.25em","text-align:center"].join(";"),g=["font-size:15px","font-weight:700",`color:${l.text}`,"margin-top:6px","text-align:center","letter-spacing:-0.01em"].join(";"),h=["font-size:11px",`color:${l.textMuted}`,"margin-top:4px","line-height:1.5","text-align:center"].join(";"),w=d?`<section style="${h}">${Y(d)}</section>`:"";return`<section class="container-qrcode container-qrcode--qr-stack" style="text-align:center"><section style="${m}">${f}</section><section style="${v}">${Y(c)}</section><section style="${g}">${Y(u)}</section>`+w+`</section>
`}if(t==="follow-card"){const l=e.tokens.colors,c=e.attrs.kicker??e.kickers.qrFollowKicker,u=e.info.trim()||e.kickers.qrFollowTitle,d=e.attrs.desc??"",f="display:table;width:100%;table-layout:auto;border-collapse:collapse",m=["display:table-cell","vertical-align:middle","padding:12px",`border-right:1px solid ${l.text}`,`background-color:${l.bg}`].join(";"),v="display:table-cell;vertical-align:middle;padding:10px 14px",g=["font-family:Menlo,Monaco,monospace","font-size:9px","font-weight:700",`color:${l.primary}`,"letter-spacing:0.2em"].join(";"),h=["font-size:14px","font-weight:700",`color:${l.text}`,"margin-top:4px","letter-spacing:-0.01em"].join(";"),w=["font-size:10px",`color:${l.textMuted}`,"margin-top:4px","line-height:1.5"].join(";"),A=d?`<section style="${w}">${Y(d)}</section>`:"",M=zr(e,64);return`<section class="container-qrcode container-qrcode--follow-card" style="${f}"><span style="${m}">${M}</span><span style="${v}"><section style="${g}">${Y(c)}</section><section style="${h}">${Y(u)}</section>`+A+`</span></section>
`}const n=e.info.trim(),o=n?`<section class="container-qrcode__caption" style="text-align:center;color:${e.tokens.colors.textMuted};margin-bottom:8px">${Y(n)}</section>`:"",s=e.attrs.desc??"",r=s?`<section class="container-qrcode__desc" style="text-align:center;color:${e.tokens.colors.textMuted};font-size:12px;line-height:1.5;margin-top:4px">${Y(s)}</section>`:"",i=Number(e.attrs.size??"")||160;return`<section class="container-qrcode container-qrcode--bare" style="text-align:center">
${e.attrs.text?wf(e):`<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${zr(e,i)}</section>
`}${o}${r}
`},close:e=>{const t=Lt(e,"qrcode",Ka,"bare");return t==="follow-card"||t==="qr-stack"?"":`</section>
`}};function We(e){if(!e)return"";const t=[];for(const[n,o]of Object.entries(e)){if(o==null||o==="")continue;const s=typeof o=="number"?`${o}px`:String(o).trim();s&&t.push(`${n.trim()}:${s}`)}return t.join(";")}const C2={open:e=>{const t=e.info.trim()||"音频",n=e.attrs.voice_encode_fileid??e.attrs.fileid,o=n?`已携带 fileid=${Y(n)}，粘贴到公众号后自动展开`:'粘贴到公众号后请手动选择"插入音频"',s=e.tokens.colors.primary,r=n?` data-wx-mp-fileid="${ze(n)}"`:"",i=` data-wx-mp-name="${ze(t)}"`,a=We(e.containers.voiceCard)+";text-align:center";return`<section class="container-voice-card" data-wx-mp-kind="voice"${r}${i} style="${a}">
<section style="font-size:12px;letter-spacing:1px;color:${s};margin-bottom:6px">[ 音频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${Y(t)}</section>
<section style="font-size:13px">${o}</section>
`},close:`</section>
`},$2={open:e=>{const t=e.info.trim()||"视频",n=e.attrs.qqvid??e.attrs.vid;if(n){const l=`https://v.qq.com/txp/iframe/player.html?vid=${encodeURIComponent(n)}`;return`<section class="container-video-card" data-wx-mp-kind="video" data-wx-mp-vid="${ze(n)}">
<iframe src="${ze(l)}" frameborder="0" width="100%" height="220" allowfullscreen="true" title="${ze(t)}"></iframe>
`}const o=e.tokens.colors.primary,s=e.attrs.fileid??e.attrs.video_encode_fileid,r=s?` data-wx-mp-fileid="${ze(s)}"`:"",i=` data-wx-mp-name="${ze(t)}"`,a=We(e.containers.videoCard)+";text-align:center";return`<section class="container-video-card" data-wx-mp-kind="video"${r}${i} style="${a}">
<section style="font-size:12px;letter-spacing:1px;color:${o};margin-bottom:6px">[ 视频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${Y(t)}</section>
<section style="font-size:13px">粘贴到公众号后请手动选择"插入视频"</section>
`},close:`</section>
`},E2=Cn({name:"note",themeSlot:"note",table:Fp,fallbackId:"minimal-callout",title:{defaultText:"补注",defaultCSS:"font-weight:600;font-size:13px",iconKey:"noteIcon"},body:{mode:"optional"}}),T2=Cn({name:"announcement",themeSlot:"announcement",table:jp,fallbackId:"danger-bar",title:{defaultCSS:"font-weight:700;font-size:14px;letter-spacing:0.5px;margin-bottom:6px"},body:{mode:"optional"}}),A2={open:e=>{const t=e.attrs.name??e.info.trim(),n=e.attrs.role??"",o=e.attrs.avatar??"",s=We(e.containers.authorBio),r=`font-weight:700;font-size:15px;color:${e.tokens.colors.text};margin-bottom:2px`,i=`font-size:12px;color:${e.tokens.colors.textMuted};letter-spacing:0.5px;margin-bottom:8px`,a=o?`<img src="${ze(o)}" alt="${ze(t||"author")}" style="display:inline-block;width:48px;height:48px;border-radius:24px;vertical-align:middle;margin-right:12px;object-fit:cover" />`:"",l=t?`<section class="container-author-bio__name" style="${r}">${Y(t)}</section>
`:"",c=n?`<section class="container-author-bio__role" style="${i}">${Y(n)}</section>
`:"",u=a||l||c?`<section style="margin-bottom:8px">${a}<section style="display:inline-block;vertical-align:middle">${l}${c}</section></section>
`:"";return`<section class="container-author-bio" style="${s}">
${u}`},close:`</section>
`},I2={open:e=>{const t=e.info.trim(),n=e.attrs.src??"",o=e.attrs.alt??t,s=We(e.containers.imageCaption),r=n?`<img src="${ze(n)}" alt="${ze(o)}" style="max-width:100%;display:block;margin:0 auto 6px;border-radius:4px" />
`:"",i=`font-size:12px;color:${e.tokens.colors.textMuted};letter-spacing:0.5px;line-height:1.6;text-align:center;margin-bottom:6px`,a=t?`<section class="container-image-caption__caption" style="${i}">${Y(t)}</section>
`:"";return`<section class="container-image-caption" style="${s}">
${r}${a}`},close:`</section>
`},R2={open:e=>{const t=e.info.trim(),n=We(e.containers.timeline),o=`font-weight:700;font-size:14px;color:${e.tokens.colors.text};letter-spacing:0.5px;margin-bottom:10px`,s=t?`<section class="container-timeline__title" style="${o}">${Y(t)}</section>
`:"";return`<section class="container-timeline" style="${n}">
${s}`},close:`</section>
`},M2={open:e=>{const t=e.attrs.year??"",n=e.info.trim(),o="display:table;width:100%;table-layout:fixed;margin-bottom:10px",s=["display:table-cell","vertical-align:top","width:64px","font-family:Menlo,Monaco,monospace",`color:${e.tokens.colors.primary}`,"font-size:12px","font-weight:700","letter-spacing:0.5px","padding-right:12px"].join(";"),r="display:table-cell;vertical-align:top",i=`font-weight:600;font-size:14px;color:${e.tokens.colors.text};margin-bottom:4px;line-height:1.5`,a=n?`<section class="container-timeline-item__title" style="${i}">${Y(n)}</section>
`:"";return`<section class="container-timeline-item" style="${o}">
<span style="${s}">${Y(t)}</span><span style="${r}">${a}`},close:`</span></section>
`},O2={open:e=>{const t=e.info.trim()||"摘要",n=We(e.containers.abstract),o=We(e.innerStyles.abstractKicker);return`<section class="container-abstract" style="${n}">
<section class="container-abstract__kicker" style="${o}">${Y(t)}</section>
`},close:`</section>
`},N2={open:e=>{const t=e.info.trim(),n=e.attrs.value??"0",o=e.attrs.meta??"",s=We(e.containers.keyNumber),r=We(e.innerStyles.keyNumberValue),i=We(e.innerStyles.keyNumberKicker),a=t?`<section class="container-key-number__kicker" style="${i}">${Y(t)}</section>
`:"",l=`<section class="container-key-number__value" style="${r}">${Y(n)}</section>
`;if(o){const c=o.split(" / ").map(v=>v.trim()).filter(Boolean),u="display:table;width:100%;table-layout:auto",d="display:table-cell;vertical-align:bottom",f=["display:table-cell","vertical-align:bottom","text-align:right","font-family:Menlo,Monaco,monospace","font-size:9px","line-height:1.6","letter-spacing:0.1em","white-space:nowrap","padding-left:10px"].join(";"),m=c.map(v=>`<span style="display:block">${Y(v)}</span>`).join("");return`<section class="container-key-number" style="${s}">
<section class="container-key-number__row" style="${u}"><span style="${d}">${a}${l}</span><span class="container-key-number__meta" style="${f}">${m}</span></section>
`}return`<section class="container-key-number" style="${s}">
`+a+l},close:`</section>
`},L2={open:e=>{const t=e.info.trim()||e.kickers.mastheadName,n=e.attrs.issue??"",o=e.attrs.date??"",s=e.attrs.kicker??"",r=e.tokens.colors,i=s!=="",a=`display:table;width:100%;table-layout:${i?"fixed":"auto"};`+We(e.containers.masthead);if(i){const d=["display:table-cell","vertical-align:baseline","width:33.33%",`color:${r.text}`,"font-family:Menlo,Monaco,monospace","font-size:10px","letter-spacing:0.1em"].join(";"),f=d+";text-align:right",m=["display:table-cell","vertical-align:baseline","width:33.33%",`color:${r.primary}`,"font-family:Menlo,Monaco,monospace","font-size:10px","font-weight:700","letter-spacing:0.1em","text-align:center"].join(";");return`<section class="container-masthead container-masthead--ribbon" style="${a}">
<span class="container-masthead__kicker" style="${d}">${Y(s)}</span><span class="container-masthead__name" style="${m}">${Y(t)}</span><span class="container-masthead__date" style="${f}">${Y(o)}</span>
`}const l=["display:table-cell","vertical-align:baseline",`color:${r.text}`,"font-size:13px","font-weight:700","letter-spacing:-0.01em"].join(";"),c=["display:table-cell","vertical-align:baseline","width:180px",`color:${r.textMuted}`,"font-family:Menlo,Monaco,monospace","font-size:11px","text-align:right"].join(";"),u=n||o?`${n?`第 ${Y(n)} 期`:""}${n&&o?" · ":""}${o?Y(o):""}`:"";return`<section class="container-masthead" style="${a}">
<span class="container-masthead__name" style="${l}">${Y(t)}</span>`+(u?`<span class="container-masthead__meta" style="${c}">${u}</span>`:`<span style="${c}"></span>`)+`
`},close:`</section>
`},D2={open:e=>{const t=e.info.trim()||"标签",n=e.tokens.colors,o=We(e.containers.sectionTag),s=["display:inline-block",`background-color:${n.primary}`,`color:${n.textInverse}`,"font-size:10px","letter-spacing:0.15em","padding:3px 8px"].join(";");return`<section class="container-section-tag" style="${o}"><span class="container-section-tag__pill" style="${s}">${Y(t)}</span></section>
`},close:""},P2={open:e=>{const t=e.tokens.colors,n=e.attrs.cells??"",o=e.attrs.monospaceLast==="true",s=We(e.containers.byline);if(!n)return`<section class="container-byline" style="${s}">`;const r=n.split("|").map(f=>f.trim()).filter(Boolean).map(f=>{const m=f.indexOf(":");return m<0?{kicker:"",value:f}:{kicker:f.slice(0,m).trim(),value:f.slice(m+1).trim()}}),i="display:table;width:100%;table-layout:fixed",a="display:table-cell;vertical-align:top",l=["display:block","font-size:9px","letter-spacing:0.15em",`color:${t.textMuted}`,"margin-bottom:2px"].join(";"),c=["display:block","font-size:12px","font-weight:700",`color:${t.text}`].join(";"),u=c+";font-family:Menlo,Monaco,monospace",d=r.map((f,m)=>{const v=m===0,g=m===r.length-1,h=v?"0":"12px",w=g?"0":"12px",A=g?"":`;border-right:1px solid ${t.text}`,M=`${a};padding:6px ${w} 6px ${h}${A}`,R=o&&g?u:c,B=f.kicker?`<span style="${l}">${Y(f.kicker)}</span>`:"";return`<span class="container-byline__cell" style="${M}">`+B+`<span style="${R}">${Y(f.value)}</span></span>`}).join("");return`<section class="container-byline" style="${s}"><section class="container-byline__row" style="${i}">${d}</section></section>
`},close:""},B2=new Set(["primary","accent","secondary"]),F2={open:e=>{const t=e.tokens.colors,n=e.attrs.chip??"",o=e.attrs.pp??"",s=e.attrs.subtitle??"",r=e.attrs.titleDot??"",i=e.attrs.br??" / ",a=Number(e.attrs.topRule??"0"),l=Number.isFinite(a)&&a>0?Math.floor(a):0,c=B2.has(r)?t[r]:"",u=We(e.containers.editorialHeader),d=l>0?`<section class="container-editorial-header__top-rule" style="border-top:${l}px solid ${t.text};margin-bottom:12px"></section>
`:"";let f="";if(n){const B="display:table;width:100%;table-layout:fixed;margin-bottom:12px",N="display:table-cell;vertical-align:middle;width:80px",k=["display:inline-block",`background-color:${t.primary}`,`color:${t.textInverse}`,"font-size:10px","font-weight:700","padding:3px 8px","line-height:1","letter-spacing:0.05em"].join(";"),y="display:table-cell;vertical-align:middle;padding:0 10px",b=`border-top:1px solid ${t.text};height:1px;font-size:0;line-height:0`,_=["display:table-cell","vertical-align:middle","width:60px","font-family:Menlo,Monaco,monospace","font-size:9px","letter-spacing:0.2em","text-align:right",`color:${t.text}`].join(";"),x=o?`<span style="${_}">${Y(o)}</span>`:"";f=`<section class="container-editorial-header__chip-row" style="${B}"><span style="${N}"><span style="${k}">${Y(n)}</span></span><span style="${y}"><span style="${b}">&nbsp;</span></span>`+x+`</section>
`}const m=e.info.split(i).map(B=>B.trim()).filter(Boolean),v=["font-size:32px","font-weight:700","line-height:1.08",`color:${t.text}`,"letter-spacing:-0.03em","margin:0 0 12px 0"].join(";"),g=m.map(Y),h=c?`<span style="color:${c}">.</span>`:"",w=g.length>0?g.join("<br>")+h:h,A=w?`<section class="container-editorial-header__title" style="${v}">${w}</section>
`:"",M=["font-size:13px","font-weight:500","line-height:1.4",`color:${t.text}`,"margin:0 0 14px 0"].join(";"),R=s?`<section class="container-editorial-header__subtitle" style="${M}">${Y(s)}</section>
`:"";return`<section class="container-editorial-header" style="${u}">
`+d+f+A+R},close:`</section>
`},j2={open:e=>{const t=e.info.trim()||e.kickers.toc,n=e.attrs.layout??"default",o=e.attrs.meta??"",s=e.tokens.colors,r=We(e.containers.toc),i=[`color:${s.primary}`,"font-size:10px","font-weight:700","letter-spacing:0.15em","margin-bottom:6px"].join(";");if(n==="split"){const a="display:table;width:100%;table-layout:fixed",l=["display:table-cell","vertical-align:top","width:33%","padding:12px 14px 12px 0",`border-right:1px solid ${s.text}`].join(";"),c=["display:table-cell","vertical-align:top","padding:12px 0 12px 14px","font-size:11px","line-height:1.85"].join(";"),u=o.split(" / ").map(v=>v.trim()).filter(Boolean),d=u.map(v=>`<span style="display:block">${Y(v)}</span>`).join(""),f=["font-size:9px",`color:${s.text}`,"line-height:1.7"].join(";"),m=u.length?`<section class="container-toc__meta" style="${f}">${d}</section>`:"";return`<section class="container-toc container-toc--split" style="${r}"><section class="container-toc__row" style="${a}"><span class="container-toc__left" style="${l}"><section class="container-toc__kicker" style="${i}">${Y(t)}</section>`+m+`</span><span class="container-toc__right" style="${c}">
`}return`<section class="container-toc" style="${r}">
<section class="container-toc__kicker" style="${i}">${Y(t)}</section>
`},close:e=>(e.attrs.layout??"default")==="split"?`</span></section></section>
`:`</section>
`},H2={open:e=>{const t=e.attrs.no??"",n=e.attrs.page??"",o=e.info.trim(),s=e.tokens.colors,r=["display:table","width:100%","table-layout:auto","font-size:12px","line-height:1.75","padding:1px 0"].join(";"),i=["display:table-cell","vertical-align:baseline","width:30px","padding-right:10px","font-family:Menlo,Monaco,monospace",`color:${s.primary}`,"font-size:11px"].join(";"),a=["display:table-cell","vertical-align:baseline",`color:${s.text}`].join(";"),l=["display:table-cell","vertical-align:baseline","width:56px","padding-left:10px","font-family:Menlo,Monaco,monospace",`color:${s.textMuted}`,"font-size:11px","text-align:right"].join(";");return`<section class="container-toc-item" style="${r}"><span style="${i}">${Y(t)}</span><span style="${a}">${Y(o)}</span><span style="${l}">${Y(n)}</span></section>
`},close:""},V2={open:e=>{const t=e.tokens.colors,n=e.attrs.next??"",o=e.attrs.issue??"",s=We(e.containers.colophon),r=[`border-top:1px solid ${t.text}`,"margin-top:20px","padding-top:12px"].join(";"),i=`display:table;width:100%;table-layout:fixed;font-size:11px;line-height:1.6;color:${t.text};${s||r}`,a="display:table-cell;vertical-align:top",l="display:table-cell;vertical-align:top;text-align:right",c=["display:block",`color:${t.textMuted}`,"font-size:10px","letter-spacing:0.1em","margin-bottom:3px"].join(";");return`<section class="container-colophon" style="${i}"><span style="${a}"><span style="${c}">${Y(e.kickers.colophonNextLabel)}</span>${Y(n)}</span><span style="${l}"><span style="${c}">${Y(e.kickers.colophonIssueLabel)}</span>${Y(o)}</span></section>
`},close:""};function U2(e){if(!e)return[];const t=[];for(const n of e.split(",")){const o=Number(n.trim());Number.isFinite(o)&&t.push(o)}return t}function z2(e,t=110){if(e.length===0)return{points:"",lastY:7};if(e.length===1)return{points:`0,7 ${t},7`,lastY:7};const n=Math.min(...e),o=Math.max(...e),s=o-n,r=t/(e.length-1),i=2,a=10,l=u=>s===0?7:i+(o-u)/s*a;return{points:e.map((u,d)=>`${(d*r).toFixed(1)},${l(u).toFixed(2)}`).join(" "),lastY:l(e[e.length-1])}}function W2(e,t){if(!e)return t.textMuted;const n=e.trim();return n.startsWith("-")||n.startsWith("−")||n.startsWith("+")?t.status.danger.accent:t.textMuted}function K2(e,t){return e==="flat"?t.textMuted:e==="up"||e==="down"?t.status.danger.accent:t.textMuted}const js=[],q2={open:e=>{const t=e.info.trim()||"KEY METRICS",n=e.attrs.period??"",o=e.attrs.source??"";js.push({source:o,itemCount:0});const s=e.tokens.colors,r=We(e.containers.kpiDashboard),i=["display:table","width:100%","table-layout:auto","margin-bottom:14px","padding-bottom:8px",`border-bottom:1px solid ${s.border}`].join(";"),a=["display:table-cell","vertical-align:baseline","font-family:Menlo,Monaco,monospace",`color:${s.text}`,"font-size:10px","letter-spacing:0.15em"].join(";"),l=["display:table-cell","vertical-align:baseline","width:160px","font-family:Menlo,Monaco,monospace",`color:${s.textMuted}`,"font-size:9px","letter-spacing:0.05em","text-align:right"].join(";"),c=["display:table","width:100%","table-layout:fixed"].join(";");return`<section class="container-kpi-dashboard" style="${r}">
<section class="container-kpi-dashboard__header" style="${i}"><span style="${a}">${Y(t)}</span><span style="${l}">${Y(n)}</span></section>
<section class="container-kpi-dashboard__grid" style="${c}">
`},close:e=>{const n=js.pop()?.source??"",o=e.tokens.colors,s=["margin-top:12px","padding-top:8px",`border-top:1px solid ${o.border}`,"font-family:Menlo,Monaco,monospace","font-size:9px",`color:${o.textMuted}`,"letter-spacing:0.05em"].join(";");return`</section>
${n?`<section class="container-kpi-dashboard__source" style="${s}">SOURCE · ${Y(n)}</section>
`:""}</section>
`}},G2={open:e=>{const t=e.attrs.label??"",n=e.attrs.caption??"",o=e.attrs.value??"0",s=e.attrs.unit??"",r=e.attrs.delta??"",i=e.attrs.trend??"flat",a=U2(e.attrs.series),l=e.attrs.foot??"",c=e.tokens.colors,u=js[js.length-1],d=u?u.itemCount:0;u&&(u.itemCount=d+1);const g=["display:table-cell","vertical-align:top","width:33.33%",`padding:0 8px 0 ${d===0?0:8}px`,`border-right:1px solid ${c.border}`].join(";"),h=["display:table","width:100%","table-layout:auto","margin-bottom:12px"].join(";"),w=["display:table-cell","vertical-align:baseline","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${c.textMuted}`].join(";"),A=["display:table-cell","vertical-align:baseline","width:60px","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${W2(r,c)}`,"text-align:right"].join(";"),M=["font-size:10px",`color:${c.textMuted}`,"margin-bottom:2px"].join(";"),R=["display:inline-block","margin-bottom:10px","vertical-align:baseline","white-space:nowrap"].join(";"),B=["font-size:30px","font-weight:700","line-height:0.9",`color:${c.text}`,"letter-spacing:-0.03em"].join(";"),N=["font-size:11px","font-weight:500",`color:${c.textMuted}`,"margin-left:3px"].join(";"),k=["display:table","width:100%","table-layout:auto","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${c.textMuted}`,"line-height:1.4","margin-top:4px"].join(";"),y="display:table-cell;vertical-align:top;word-break:break-all",b="display:table-cell;vertical-align:top;text-align:right;padding-left:4px;word-break:break-all",_=K2(i,c),{points:x,lastY:$}=z2(a),P=x?`<svg viewBox="0 0 110 14" width="100%" height="14" preserveAspectRatio="none" style="display:block"><line x1="0" y1="7" x2="110" y2="7" stroke="${c.border}" stroke-width="1"/><polyline points="${x}" fill="none" stroke="${_}" stroke-width="1.2"/><circle cx="110" cy="${$.toFixed(2)}" r="2" fill="${_}"/></svg>`:"",[W,O]=l.includes("→")?l.split("→").map(F=>F.trim()):[l,""],E=W||O?`<section style="${k}"><span style="${y}">${Y(W)}</span><span style="${b}">${Y(O)}</span></section>`:"";return`<section class="container-kpi-item" style="${g}">
<section style="${h}"><span style="${w}">${Y(t)}</span><span style="${A}">${Y(r)}</span></section>
<section style="${M}">${Y(n)}</section>
<section style="${R}"><span style="${B}">${Y(o)}</span><span style="${N}">${Y(s)}</span></section>
`+P+`
`+E+`
`},close:`</section>
`},Hs=[],Sf="72px",_f="48px",Y2=/^\d+(?:px|%|em|rem|ch)?$/;function Vs(e,t){if(!e)return t;const n=e.trim();return Y2.test(n)?/^\d+$/.test(n)?`${n}px`:n:t}const J2={open:e=>{const t=e.info.trim()||"",n=e.attrs.subtitle??"",o=Vs(e.attrs.labelWidth,Sf),s=Vs(e.attrs.valueWidth,_f);Hs.push({labelWidth:o,valueWidth:s});const r=e.tokens.colors,i=We(e.containers.barChart),a=["font-size:12px","font-weight:700",`color:${r.text}`,"margin-bottom:4px"].join(";"),l=["font-size:10px",`color:${r.textMuted}`,"margin-bottom:14px"].join(";"),c=t?`<section class="container-bar-chart__title" style="${a}">${Y(t)}</section>
`:"",u=n?`<section class="container-bar-chart__subtitle" style="${l}">${Y(n)}</section>
`:"";return`<section class="container-bar-chart" style="${i}">
${c}${u}`},close:()=>(Hs.pop(),`</section>
`)},Q2={open:e=>{const t=e.attrs.label??"",n=Number(e.attrs.pct??"0"),o=Number.isFinite(n)?Math.max(0,Math.min(100,n)):0,s=e.attrs.value??"",r=e.attrs.tone??"normal",i=e.tokens.colors,a=r==="warn"?i.status.danger.accent:i.primary,l=Hs[Hs.length-1],c=Vs(e.attrs.labelWidth,l?.labelWidth??Sf),u=Vs(e.attrs.valueWidth,l?.valueWidth??_f),d=["display:table","width:100%","table-layout:fixed","font-family:Menlo,Monaco,monospace","font-size:11px","margin-bottom:6px"].join(";"),f=["display:table-cell",`width:${c}`,"vertical-align:middle",`color:${i.text}`].join(";"),m=["display:table-cell","padding:0 6px","vertical-align:middle"].join(";"),v=["display:table-cell",`width:${u}`,"vertical-align:middle","text-align:right",`color:${i.text}`].join(";"),g=["display:block","width:100%",`background-color:${i.border}`,"height:10px"].join(";"),h=["display:block",`background-color:${a}`,"height:10px",`width:${o}%`].join(";");return`<section class="container-bar" style="${d}"><span style="${f}">${Y(t)}</span><span style="${m}"><section style="${g}"><section style="${h}"></section></section></span><span style="${v}">${Y(s)}</span></section>
`},close:""},X2={open:e=>{const{id:t,result:n}=Zo(e,"qaBlock",Ga,"numbered-faq"),o=n.qaBlock??{kickerHtml:"",qHtml:"",aOpenHtml:""};return`<section class="container-qa-block container-qa-block--${t}" style="${n.wrapperCSS}">
`+o.kickerHtml+o.qHtml+o.aOpenHtml},close:e=>{const{result:t}=Zo(e,"qaBlock",Ga,"numbered-faq");return(t.qaBlock??{aCloseHtml:""}).aCloseHtml+`</section>
`}},Z2=Cn({name:"footnotes",themeSlot:"footnotes",table:Hp,fallbackId:"lined",title:{defaultCSS:e=>[`color:${e.tokens.colors.primary}`,"font-size:10px","font-weight:700","letter-spacing:0.15em","margin-bottom:6px","text-indent:0"].join(";")}});function e_(e){return[`color:${e.tokens.colors.text}`,"font-size:18px","font-weight:600","line-height:1.7","letter-spacing:0.2px","margin-top:0","margin-bottom:0"].join(";")}function t_(e){return[`color:${e.tokens.colors.textMuted}`,"font-size:13px","line-height:1.6","margin-top:10px","text-align:left"].join(";")}function hc(e){const t=Vp,n=e.attrs.variant;if(n){const s=n.toLowerCase().trim();if(s.startsWith("uv_")){const r=e.userVariants?.get(s);if(r&&ka(r)&&r.base.kind==="pullQuote"){const i=t[r.base.variantId];if(i?.render)return{id:r.id,result:_a(r,i.render(e))}}}}const o=Lt(e,"pullQuote",t,"giant-mark");return{id:o,result:t[o].render(e)}}const n_={open:e=>{const{id:t,result:n}=hc(e),o=n.quoteCSS??e_(e),r=[`<style>.container-pull-quote--${t} > .container-pull-quote__body > p {${o}}</style>`,`<section class="container-pull-quote container-pull-quote--${t}" style="${n.wrapperCSS}">`];return n.svgSlot&&r.push(n.svgSlot),r.push(`<section class="container-pull-quote__body" style="${n.bodyCSS??""}">`),r.join(`
`)+`
`},close:e=>{const{result:t}=hc(e),n=e.info.trim();if(!n)return`</section>
</section>
`;const o=t.bylineCSS??t_(e),s=t.bylinePrefix??"— ";return`${`<section class="container-pull-quote__byline" style="${o}">${Y(s)}${Y(n)}</section>`}
</section>
</section>
`}},o_={DEV:!1};function s_(){if(typeof import.meta>"u")return!1;const e=o_;return e?e.DEV===!0:!1}function kf(e,t){s_()&&console.warn(`[${e}] ${t}`)}const Us=[];function r_(e){return e?e.split("|").map(t=>t.trim()):[]}function xf(e){return e.startsWith("\\*")?{recommend:!1,text:e.slice(1)}:e.startsWith("*")?{recommend:!0,text:e.slice(1).trim()}:{recommend:!1,text:e}}const mc=new Set;function i_(e,t,n){const o=`${e}::${t}`;mc.has(o)||(mc.add(o),console.warn(`[wechat-typeset] table-card[${e}] ${n}`))}const a_={open:e=>{const t=Lt(e,"tableCard",Ya,"rule-grid");Us.push({variantId:t,rowCount:0,columnsCount:0,highlightCols:new Set,bodyRowsRendered:0});const n=We(e.containers.tableCard),o=Ya[t].render(e),s=[n,o.wrapperCSS].filter(Boolean).join(";"),r=e.info.trim(),a=["font-weight:700","font-size:13px",`color:${e.tokens.colors.text}`,"letter-spacing:0.5px","margin-bottom:8px"].join(";"),l=r?`<section class="container-table-card__title" style="${a}">${Y(r)}</section>
`:"",u=["display:table","width:100%","table-layout:fixed","border-collapse:separate",`border-spacing:${t==="price-tier"?"3px 0":"0"}`].join(";");return`<section class="container-table-card container-table-card--${t}" style="${s}">
`+l+`<section class="container-table-card__grid" style="${u}">
`},close:()=>(Us.pop(),`</section>
</section>
`)},l_={open:e=>{const t=Us[Us.length-1];if(!t)return"";const n=e.attrs.header==="true",o=r_(e.attrs.cells);t.rowCount===0?(t.columnsCount=o.length,t.variantId==="price-tier"&&o.forEach((r,i)=>{xf(r).recommend&&t.highlightCols.add(i)})):o.length!==t.columnsCount&&kf("table-card:cells",`第 ${t.rowCount+1} 行 cells 列数 ${o.length} 与首行 ${t.columnsCount} 不一致：多余列被截断、缺失列留空。检查 attrs.cells 的 "|" 分隔符是否漏写或多写。`),t.rowCount+=1;const s=n?-1:t.bodyRowsRendered;switch(n||(t.bodyRowsRendered+=1),t.variantId){case"zebra-rows":return d_(e,o,n,s);case"key-value":return f_(e,o,n);case"price-tier":return p_(e,o,n,s,t.highlightCols);case"three-line-table":return h_(e,o,n);case"index-table":return m_(e,o,n);case"matrix":return g_(e,o,n);case"rule-grid":default:return u_(e,o,n)}},close:""};function c_(e){return xf(e).text}function u_(e,t,n){const o=e.tokens.colors,r=(100/(t.length||1)).toFixed(2),i="display:table-row",a=n?o.bgMuted:o.bg,l=n?o.accent:o.text,c=n?700:400,u=t.map((d,f)=>{const m=f===t.length-1;return`<span style="${["display:table-cell",`width:${r}%`,"vertical-align:middle",`background-color:${a}`,`color:${l}`,`font-weight:${c}`,"font-size:13px","line-height:1.5","padding:8px 10px",`border-bottom:1px solid ${o.border}`,m?"":`border-right:1px solid ${o.border}`].filter(Boolean).join(";")}">${Y(d)}</span>`}).join("");return`<section class="container-table-row" style="${i}">${u}</section>
`}function d_(e,t,n,o){const s=e.tokens.colors,i=(100/(t.length||1)).toFixed(2),a="display:table-row",l=n?"transparent":o%2===0?s.bgSoft:s.bg,c=n?s.textMuted:s.text,u=n?700:400,d=n?"11px":"13px",f=n?"0.1em":"normal",m=n?"uppercase":"none",v=t.map(g=>`<span style="${["display:table-cell",`width:${i}%`,"vertical-align:middle",`background-color:${l}`,`color:${c}`,`font-weight:${u}`,`font-size:${d}`,`letter-spacing:${f}`,`text-transform:${m}`,"line-height:1.5","padding:10px 12px",n?`border-bottom:1px solid ${s.border}`:""].filter(Boolean).join(";")}">${Y(g)}</span>`).join("");return`<section class="container-table-row" style="${a}">${v}</section>
`}function f_(e,t,n){const o=e.tokens.colors,s="display:table-row";if(n){const c=t.join(" · "),u=["display:table-cell","width:100%","vertical-align:middle",`background-color:${o.bgSoft}`,`color:${o.text}`,"font-weight:700","font-size:12px","letter-spacing:0.1em","text-transform:uppercase","text-align:center","padding:10px 12px",`border-bottom:1px solid ${o.border}`].join(";");return`<section class="container-table-row" style="${s}"><span style="${u}">${Y(c)}</span></section>
`}t.length!==2&&i_("key-value","row-arity",`row cells.length=${t.length}，应为 2（左 key / 右 value）；少列补空、多列截断`);const r=t[0]??"",i=t[1]??"",a=["display:table-cell","width:35%","vertical-align:middle",`background-color:${o.bgSoft}`,`color:${o.textMuted}`,"font-weight:600","font-family:Menlo,Monaco,monospace","font-size:12px","text-align:right","padding:10px 12px",`border-bottom:1px solid ${o.border}`].join(";"),l=["display:table-cell","width:65%","vertical-align:middle",`color:${o.text}`,"font-size:13px","line-height:1.5","text-align:left","padding:10px 14px",`border-bottom:1px solid ${o.border}`].join(";");return`<section class="container-table-row" style="${s}"><span style="${a}">${Y(r)}</span><span style="${l}">${Y(i)}</span></section>
`}function p_(e,t,n,o,s){const r=e.tokens.colors,a=(100/(t.length||1)).toFixed(2),l="display:table-row",c=!n&&o===0,u=t.map((d,f)=>{const m=c_(d),g=s.has(f)?r.accent:r.primary,h=n?r.bgSoft:r.bg,w=r.text,A=n||c?700:400,M=n?"14px":c?"16px":"12px",R=n?"12px":"10px",B=n?`border-top:3px solid ${g}`:"";return`<span style="${["display:table-cell",`width:${a}%`,"vertical-align:middle",`background-color:${h}`,`color:${w}`,`font-weight:${A}`,`font-size:${M}`,"line-height:1.4","text-align:center",`padding:${R} 8px`,B,`border-bottom:1px solid ${r.border}`].filter(Boolean).join(";")}">${Y(m)}</span>`}).join("");return`<section class="container-table-row" style="${l}">${u}</section>
`}function h_(e,t,n){const o=e.tokens.colors,r=(100/(t.length||1)).toFixed(2),i="display:table-row",a=n?o.textMuted:o.text,l=n?600:400,c=n?"11px":"13px",u=n?"0.08em":"normal",d=n?"uppercase":"none",f=t.map(m=>`<span style="${["display:table-cell",`width:${r}%`,"vertical-align:middle",`color:${a}`,`font-weight:${l}`,`font-size:${c}`,`letter-spacing:${u}`,`text-transform:${d}`,"line-height:1.5","padding:10px 12px",n?`border-bottom:1px solid ${o.text}`:""].filter(Boolean).join(";")}">${Y(m)}</span>`).join("");return`<section class="container-table-row" style="${i}">${f}</section>
`}function m_(e,t,n){const o=e.tokens.colors,s=t.length||1,r=(100/s).toFixed(2),i="display:table-row",a=600,l=t.map((c,u)=>{const d=u===0||u===s-1,f=u===t.length-1,m="transparent",v=n||d?o.textMuted:o.text,g=n?a:400,h=n?"11px":d?"12px":"13px",w=!n&&d?"font-family:Menlo,Monaco,monospace":"",A=!n&&f?"text-align:right":"text-align:left",M=n?`border-bottom:1px solid ${o.text}`:`border-bottom:1px dashed ${o.border}`;return`<span style="${["display:table-cell",`width:${r}%`,"vertical-align:middle",`background-color:${m}`,`color:${v}`,`font-weight:${g}`,`font-size:${h}`,w,n?"letter-spacing:0.08em":"",n?"text-transform:uppercase":"",A,"line-height:1.5","padding:10px 12px",M].filter(Boolean).join(";")}">${Y(c)}</span>`}).join("");return`<section class="container-table-row" style="${i}">${l}</section>
`}function g_(e,t,n){const o=e.tokens.colors,s=36,r=50,i="display:table-row";if(n){const u=["display:table-cell",`width:${r}px`,`height:${s}px`,"vertical-align:middle","text-align:right","padding-right:8px",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.1em","text-transform:uppercase","font-weight:600"].join(";"),d=["display:table-cell",`width:${s}px`,`height:${s}px`,"vertical-align:middle","text-align:center",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.1em","text-transform:uppercase","font-weight:600"].join(";"),f=t.map((m,v)=>v===0?`<span style="${u}">${Y(m)}</span>`:`<span style="${d}">${Y(m)}</span>`).join("");return`<section class="container-table-row" style="${i}">${f}</section>
`}const a=["display:table-cell",`width:${r}px`,`height:${s}px`,"vertical-align:middle","text-align:right","padding-right:8px",`color:${o.text}`,"font-size:11px","font-weight:600"].join(";"),l=["display:table-cell",`width:${s}px`,`height:${s}px`,"vertical-align:middle","text-align:center",`background-color:${o.primary}`,`color:${o.textInverse}`,"font-size:11px","font-weight:700",`border:1px solid ${o.bg}`].join(";"),c=t.map((u,d)=>d===0?`<span style="${a}">${Y(u)}</span>`:`<span style="${l}">${Y(u)}</span>`).join("");return`<section class="container-table-row" style="${i}">${c}</section>
`}const zs=[],b_={open:e=>{const t=Lt(e,"gallery",gr,"duo");zs.push({variantId:t,itemCount:0});const o=(gr[t]??gr.duo).render(e),r=[We(e.containers.gallery),o.wrapperCSS].filter(Boolean).join(";"),i=o.bodyCSS??"display:table;width:100%;table-layout:fixed;border-spacing:8px 0",a=e.info.trim(),l=["font-weight:700",`color:${e.tokens.colors.text}`,"font-size:13px","letter-spacing:0.5px","margin-bottom:8px"].join(";"),c=a?`<section class="container-gallery__title" style="${l}">${Y(a)}</section>
`:"";return`<section class="container-gallery container-gallery--${t}" style="${r}">
`+c+`<section class="container-gallery__grid" style="${i}">
`},close:()=>(zs.pop(),`</section>
</section>
`)},y_={open:e=>{const t=zs[zs.length-1];if(!t)return"";const n=e.attrs.src??"",o=e.attrs.alt??e.info.trim(),s=e.info.trim();switch(t.itemCount+=1,t.variantId){case"triptych":return w_(e,n,o,s);case"nine-grid":return S_(e,n,o,s);case"ribbon-strip":return __(e,n,o,s);case"duo":default:return v_(e,n,o,s)}},close:""};function v_(e,t,n,o){const s="display:table-cell;width:50%;vertical-align:top",r="max-width:100%;display:block;border-radius:4px;margin:0 auto",i=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;return dr("duo",s,t,n,o,r,i)}function w_(e,t,n,o){const s="display:table-cell;width:33.33%;vertical-align:top",r="width:100%;height:140px;object-fit:cover;display:block;border-radius:4px",i=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;return dr("triptych",s,t,n,o,r,i)}function S_(e,t,n,o){const s="display:inline-block;width:32%;margin-right:1%;margin-bottom:1%;vertical-align:top",r="width:100%;aspect-ratio:1;object-fit:cover;display:block;border-radius:2px",i=`font-size:9px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:2px;line-height:1.3`;return dr("nine-grid",s,t,n,o,r,i)}function __(e,t,n,o){const s="display:inline-block;width:64%;margin-right:8px;vertical-align:top;white-space:normal",r="max-width:100%;height:180px;object-fit:cover;display:block;border-radius:4px",i=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:left;margin-top:6px;line-height:1.5`;return dr("ribbon-strip",s,t,n,o,r,i)}function dr(e,t,n,o,s,r,i){const a=n?`<img src="${ze(n)}" alt="${ze(o)}" style="${r}" />`:"",l=s?`<section style="${i}">${Y(s)}</section>`:"";return`<section class="container-image-item container-image-item--${e}" style="${t}">${a}${l}</section>
`}const Zn=[],k_={open:e=>{const t=Lt(e,"dialogue",br,"qa-rows");Zn.push({variantId:t,turnCount:0});const o=(br[t]??br["qa-rows"]).render(e),s=We(e.containers.dialogue)+";"+o.wrapperCSS,r=e.info.trim(),a=["font-weight:700",`color:${e.tokens.colors.text}`,"font-size:14px","letter-spacing:0.5px","margin-bottom:12px"].join(";"),l=r?`<section class="container-dialogue__title" style="${a}">${Y(r)}</section>
`:"";return`<section class="container-dialogue container-dialogue--${t}" style="${s}">
`+l},close:()=>(Zn.pop(),`</section>
`)},x_={open:e=>{const t=Zn[Zn.length-1];if(!t)return"";const n=e.attrs.name??e.attrs.speaker??"",o=e.attrs.role??"",s=e.attrs.side,r=s??"left";s!==void 0&&t.variantId!=="chat-bubbles"&&kf("dialogue:side",`side="${s}" 仅 chat-bubbles 骨架消费，当前 variant="${t.variantId}" 会忽略此 attr。要左右气泡请给 dialogue 加 variant=chat-bubbles。`),t.turnCount+=1;const i=t.turnCount-1;switch(t.variantId){case"chat-bubbles":return T_(e,n,r);case"name-prefix":return I_(e,n);case"interview-column":return M_(e,n,o);case"audio-stamp":return N_(e,n,o,e.attrs.timestamp??"");case"qa-rows":default:return $_(e,n,o,i)}},close:()=>{const e=Zn[Zn.length-1];if(!e)return"";switch(e.variantId){case"chat-bubbles":return A_();case"name-prefix":return R_();case"interview-column":return O_();case"audio-stamp":return L_();case"qa-rows":default:return E_()}}};function C_(e,t,n){const o=e.trim();if(o==="Q"||o==="q"||o==="主持人"||o==="提问"||o==="问")return!0;if(o==="A"||o==="a"||o==="答"||o==="回答"||o)return!1;const s=t.trim();if(s){if(/[Qq问]|主持人|提问|买家|客户|用户/.test(s))return!0;if(/[Aa答]|商家|客服|主播/.test(s))return!1}return n%2===0}function $_(e,t,n,o){const s=e.tokens.colors,r=C_(n,t,o),i=["display:table","width:100%","table-layout:fixed",o===0?"margin-top:0":"margin-top:18px"].join(";"),a="display:table-cell;vertical-align:top;width:32px;padding-right:10px",l=r?["display:inline-block","width:24px","height:24px",`background-color:${s.primary}`,`color:${s.textInverse}`,"text-align:center","line-height:24px","font-size:12px","font-weight:700","letter-spacing:0"].join(";"):["display:inline-block","width:24px","height:24px","background-color:transparent",`border:1px solid ${s.textMuted}`,`color:${s.textMuted}`,"text-align:center","line-height:22px","font-size:12px","font-weight:700"].join(";"),c="display:table-cell;vertical-align:top",u=["display:block",`color:${s.textMuted}`,"font-size:11px","letter-spacing:0.1em","margin-bottom:4px","font-weight:600"].join(";"),d=`color:${s.text};font-size:14px;line-height:1.7`,f=r?"Q":"A",m=t?`<span style="${u}">${Y(t)}</span>`:"";return`<section class="container-dialogue-turn" style="${i}"><span style="${a}"><span style="${l}">${f}</span></span><span style="${c}">${m}<span style="${d}">`}function E_(){return`</span></span></section>
`}const Cf=[];function T_(e,t,n){const o=e.tokens.colors,s=n==="right",r=(t||"?").slice(0,1),i=s?o.primary:o.textMuted,a=o.bgSoft,l="display:table-cell;vertical-align:top;width:36px",c=`<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top"><circle cx="14" cy="14" r="14" fill="${i}"/><text x="14" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="${o.textInverse}">${Y(r)}</text></svg>`;Cf.push({tailAfter:s?gc(a,"right"):"",rightAvatarHtml:s?`<span style="${l}">${c}</span>`:`<span style="${l}"></span>`});const u=["display:table","width:100%","table-layout:fixed","margin-top:14px"].join(";"),d=["display:table-cell","vertical-align:top","padding:0 8px",s?"text-align:right":"text-align:left"].join(";"),f=["display:block",`color:${o.textMuted}`,"font-size:11px","margin-bottom:3px"].join(";"),m=["display:inline-block",`background-color:${a}`,`color:${o.text}`,"padding:10px 14px","border-radius:12px","font-size:14px","line-height:1.65","max-width:84%","vertical-align:top","text-align:left"].join(";"),v=t?`<span style="${f}">${Y(t)}</span>`:"",g=s?"":gc(a,"left"),h=s?`<span style="${l}"></span>`:`<span style="${l}">${c}</span>`;return`<section class="container-dialogue-turn" style="${u}">`+h+`<span style="${d}">${v}${g}<span style="${m}">`}function A_(){const e=Cf.pop();return e?`</span>${e.tailAfter}</span>${e.rightAvatarHtml}</section>
`:`</span></span></section>
`}function gc(e,t){return`<svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:bottom"><path d="${t==="left"?"M8,0 L0,5 L8,10 Z":"M0,0 L8,5 L0,10 Z"}" fill="${e}"/></svg>`}function I_(e,t){const n=e.tokens.colors,o=["margin:0 0 12px","font-size:14px","line-height:1.75",`color:${n.text}`].join(";"),s=["display:inline","font-weight:700",`color:${n.accent}`,"font-size:13px","letter-spacing:0.5px","font-family:Menlo,Monaco,monospace","margin-right:2px"].join(";"),r=t?`<span style="${s}">${Y(t)}：</span>`:"";return`<section class="container-dialogue-turn" style="${o}">${r}<span style="display:inline">`}function R_(){return`</span></section>
`}function M_(e,t,n){const o=e.tokens.colors,s=["display:table","width:100%","table-layout:fixed","margin-bottom:16px"].join(";"),r=["display:table-cell","vertical-align:top","width:96px","padding-right:12px","text-align:right"].join(";"),i=["display:block",`color:${o.textMuted}`,"font-size:11px","letter-spacing:0.15em","text-transform:uppercase","font-weight:700","line-height:1.6","padding-top:4px"].join(";"),a=["display:block",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.05em","margin-top:2px","font-weight:400"].join(";"),l=["display:table-cell","vertical-align:top","padding-left:16px",`border-left:1px solid ${o.border}`].join(";"),c=[`color:${o.text}`,"font-size:17px","line-height:1.8","text-align:left"].join(";"),u=t?`<span style="${i}">${Y(t)}</span>`:"",d=n?`<span style="${a}">${Y(n)}</span>`:"";return`<section class="container-dialogue-turn" style="${s}"><span style="${r}">${u}${d}</span><span style="${l}"><span style="${c}">`}function O_(){return`</span></span></section>
`}function N_(e,t,n,o){const s=e.tokens.colors,r="display:block;margin-top:16px",i=["display:block","font-family:Menlo,Monaco,monospace","font-size:10px","letter-spacing:0.1em",`color:${s.primary}`,"margin-bottom:2px"].join(";"),a=["font-size:11px","font-weight:600",`color:${s.text}`].join(";"),l=["font-size:10px","font-style:italic",`color:${s.textMuted}`,"margin-left:8px"].join(";"),c=[`color:${s.text}`,"line-height:1.7"].join(";"),u=o?`<section style="${i}">${Y(o)}</section>`:"",d=`<section style="display:block;margin-bottom:6px"><span style="${a}">${Y(t)}</span><span style="${l}">— ${Y(n||"speaker")}</span></section>`;return`<section class="container-dialogue-turn" style="${r}">`+u+d+`<section style="${c}">`}function L_(){return`</section></section>
`}const D_=/([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g;function ts(e){const t={};let n=e;return n=n.replace(D_,(s,r,i,a,l,c)=>(t[r]=a??l??c??"","")),{title:n.replace(/\s+/g," ").trim(),attrs:t}}const P_={open:()=>`<section class="container-free">
`,close:`</section>
`},B_={intro:ZS,cover:e2,author:t2,"section-title":n2,tip:YS,warning:JS,info:QS,danger:XS,note:E2,"quote-card":s2,highlight:r2,compare:i2,pros:a2,cons:l2,steps:c2,divider:u2,"footer-cta":_2,recommend:k2,qrcode:x2,"voice-card":C2,"video-card":$2,announcement:T2,"author-bio":A2,"image-caption":I2,timeline:R2,"timeline-item":M2,free:P_,abstract:O2,"key-number":N2,masthead:L2,"section-tag":D2,byline:P2,"editorial-header":F2,toc:j2,"toc-item":H2,"kpi-dashboard":q2,"kpi-item":G2,"bar-chart":J2,bar:Q2,"qa-block":X2,footnotes:Z2,colophon:V2,"pull-quote":n_,"table-card":a_,"table-row":l_,gallery:b_,"image-item":y_,dialogue:k_,"dialogue-turn":x_},bc=/\{\{\s*body\s*\}\}/;function $f(e){const t=e.search(bc);if(t<0)return{open:e,close:""};const n=e.match(bc);return n?{open:e.slice(0,t),close:e.slice(t+n[0].length)}:{open:e,close:""}}function Ef(e,t,n){let o=e;return o=o.replace(/\{\{\s*title\s*\}\}/g,ze(n.title)),o=o.replace(/\{\{\s*attr\.([a-zA-Z_][\w-]*)\s*\}\}/g,(s,r)=>{const i=n.attrs[r];return i===void 0?"":ze(i)}),o=o.replace(/\{\{\s*wrapperCSS\s*\}\}/g,ze(t.css.wrapperCSS??"")),o=o.replace(/\{\{\s*titleCSS\s*\}\}/g,ze(t.css.titleCSS??"")),o=o.replace(/\{\{\s*bodyCSS\s*\}\}/g,ze(t.css.bodyCSS??"")),o=o.replace(/\{\{\s*svgSlot\s*\}\}/g,t.css.svgSlot??""),o}function F_(e,t){const{open:n}=$f(e.template);return Ef(n,e,t)}function j_(e,t){const{close:n}=$f(e.template);return Ef(n,e,t)}function H_(e){return`uc-${e}`}const V_="[.",U_=".]",z_="[~",W_="~]";function yc(e,t,n){return function(s,r){const i=s.src,a=s.pos;if(i.substr(a,e.length)!==e)return!1;const l=a+e.length;let c=-1;for(let d=l;d<i.length-(t.length-1);d++){const f=i[d];if(f===`
`)return!1;if(f==="\\"){d++;continue}if(i.substr(d,t.length)===t){c=d;break}}if(c<0)return!1;const u=i.slice(l,c);if(!u)return!1;if(!r){const d=s.push("html_inline","",0);d.content=`<span class="${n}">`;const m=s.md.renderInline(u,s.env),v=s.push("html_inline","",0);v.content=m;const g=s.push("html_inline","",0);g.content="</span>"}return s.pos=c+t.length,!0}}function K_(e){e.inline.ruler.before("emphasis","wx_emphasis",yc(V_,U_,"wx-emphasis")),e.inline.ruler.before("emphasis","wx_wavy",yc(z_,W_,"wx-wavy"))}function vc(e,t){return t[e]}function q_(e,t){const n=vc(e.color,t),o=e.display==="block",s=[`display:${o?"block":"inline-block"}`,`color:${n}`];if(e.fontFamily==="monospace"&&s.push("font-family:Menlo,Monaco,monospace"),e.fontWeight&&s.push(`font-weight:${e.fontWeight}`),e.fontSize&&s.push(`font-size:${e.fontSize}px`),e.letterSpacing&&s.push(`letter-spacing:${e.letterSpacing}px`),o?s.push(`margin-bottom:${e.marginBottom??6}px`):s.push(`margin-right:${e.marginRight??8}px`),e.underline&&(s.push(`border-bottom:1px solid ${n}`),s.push(`padding-bottom:${e.underlinePad??2}px`)),e.backgroundColor){const r=vc(e.backgroundColor,t);s.push(`background-color:${r}`);const i=e.paddingX??0,a=e.paddingY??0;(i||a)&&s.push(`padding:${a}px ${i}px`)}return s.join(";")}const G_=["❶","❷","❸","❹","❺","❻","❼","❽","❾","❿","⓫","⓬","⓭","⓮","⓯","⓰","⓱","⓲","⓳","⓴"],Y_=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];function J_(e,t,n){if(e==="arabic-section")return`${t.h2}.${t.h3InH2}`;if(e==="arabic-section-padded")return`${String(t.h2).padStart(2,"0")}.${t.h3InH2}`;const o=n===2?t.h2:t.h3;return e==="roman"?Up(o):e==="arabic-padded"?String(o).padStart(2,"0"):e==="circled"?G_[o-1]??`(${o})`:String(o)}function Q_(e,t,n){return e.replace(/\{cn\}/g,Y_[n-1]??String(n)).replace(/\{n\}/g,t)}function X_(e,t){const n=t.decorations?.headingPrefix;if(!n||n.length===0)return;const o=new Map;for(const r of n){const i=o.get(r.level)??[];i.push(r),o.set(r.level,i)}const s=t.tokens.colors;e.core.ruler.push("wx_heading_prefix_decorations",r=>{const i=r.tokens,a={h2:0,h3:0,h3InH2:0};for(let l=0;l<i.length;l++){const c=i[l];if(c.type!=="heading_open")continue;const u=c.tag==="h2"?2:c.tag==="h3"?3:null;if(u===null)continue;u===2?(a.h2++,a.h3InH2=0):(a.h3++,a.h3InH2++);const d=o.get(u);if(!d||d.length===0)continue;const f=i[l+1];if(!f||f.type!=="inline"||!f.children)continue;const m=f.children;for(const v of d)Z_(v,m,a,u,s)}})}function Z_(e,t,n,o,s){const r=q_(e.style,s);if(t.length===0)return;const i=t[0].constructor;if(e.autoNumber){const a=J_(e.autoNumber,n,o),l=o===2?n.h2:n.h3,c=e.style.suffix?Q_(e.style.suffix,a,l):"",u=new i("html_inline","",0);u.content=`<span class="heading-prefix heading-prefix--autonumber" style="${r}">${a}${c}</span>`,t.splice(0,0,u);return}if(e.pattern){const a=t[0];if(a.type!=="text"||!a.content)return;let l;try{l=new RegExp(e.pattern)}catch{return}const c=l.exec(a.content);if(!c||!c[1])return;const u=c[1],d=c[0].length,f=a.content.slice(d),m=new i("html_inline","",0);m.content=`<span class="heading-prefix heading-prefix--pattern" style="${r}">${u}</span>`,f?(a.content=f,t.splice(0,0,m)):t.splice(0,1,m)}}function ek(e,t,n){e.__wxContainerStacks??={},e.__wxContainerStacks[t]??=[],e.__wxContainerStacks[t].push(n)}function tk(e,t){return e.__wxContainerStacks?.[t]?.pop()}function nk(e,t,n){e.__wxCustomInfoStacks??={},e.__wxCustomInfoStacks[t]??=[],e.__wxCustomInfoStacks[t].push(n)}function ok(e,t){return e.__wxCustomInfoStacks?.[t]?.pop()}function sk(e={}){const t=e.theme??zp.default,n=e.customVariants??[],o=new ch({html:!0,xhtmlOut:!1,breaks:!1,linkify:!0,typographer:!1});o.use(uh),o.use(dh),o.use(fh),o.use(ph,{enabled:!0,label:!0});for(const[r,i]of Object.entries(B_))o.use(Qa,r,{validate(a){return a.trim().split(/\s+/)[0]===r},render(a,l,c,u){const d=a[l];if(d.nesting===1){const m=d.info.trim().slice(r.length).trim(),{title:v,attrs:g}=ts(m),h={themeId:t.id,tokens:t.tokens,assets:t.assets,containers:t.containers,innerStyles:t.innerStyles,inline:t.inline,variants:t.variants,pageVariants:u.__wxPageVariants,kickers:t.kickers,info:v,attrs:g,userVariants:u.__wxUserVariants};return ek(u,r,h),i.open(h)}const f=tk(u,r)??pk(t,u.__wxPageVariants,u.__wxUserVariants);return typeof i.close=="function"?i.close(f):i.close}});for(const r of n){const i=H_(r.id);o.use(Qa,i,{validate(a){return a.trim().split(/\s+/)[0]===i},render(a,l,c,u){const d=a[l];if(d.nesting===1){const m=d.info.trim().slice(i.length).trim(),v=ts(m);return nk(u,i,v),F_(r,v)}const f=ok(u,i)??{title:"",attrs:{}};return j_(r,f)}})}K_(o);const s=t.assets.h2Prefix??null;return s&&(o.renderer.rules.heading_open=(r,i,a,l,c)=>r[i].tag==="h2"?`<h2>${s}`:c.renderToken(r,i,a)),lk(o,t),X_(o,t),fk(o,t),ik(o),o}const rk=/^\[\d+\][\s　]+/;function ik(e){e.core.ruler.push("wx_footnotes_entry_split",t=>{const n=t.tokens;if(n.length===0)return;const o=n[0].constructor;for(let s=0;s<n.length;s++){if(n[s].type!=="container_footnotes_open")continue;let r=1,i=s+1;for(;i<n.length;){if(n[i].type==="container_footnotes_open")r++;else if(n[i].type==="container_footnotes_close"&&(r--,r===0))break;i++}if(i>=n.length)continue;const a=[];let l=s+1;for(;l<i;){const c=n[l],u=n[l+1],d=n[l+2];if(c?.type==="paragraph_open"&&u?.type==="inline"&&d?.type==="paragraph_close"){const f=ak(u.children??[]);if(f.length<=1)a.push(c,u,d);else for(const m of f){const v=new o("paragraph_open","p",1),g=new o("inline","",0);g.children=m,g.content=m.filter(w=>w.type==="text").map(w=>w.content).join("");const h=new o("paragraph_close","p",-1);a.push(v,g,h)}l+=3}else a.push(c),l++}n.splice(s+1,i-s-1,...a)}})}function ak(e){if(e.length===0)return[];const t=[];let n=[];for(let o=0;o<e.length;o++){const s=e[o];if(s.type==="softbreak"||s.type==="hardbreak"){const r=e[o+1];if(r&&r.type==="text"&&rk.test(r.content)){n.length>0&&t.push(n),n=[];continue}}n.push(s)}return n.length>0&&t.push(n),t}function lk(e,t){const n=t.decorations?.introDropcap;if(!n)return;const o=t.tokens.colors[n.color],s=n.fontSize??48,r=n.fontWeight??700,i=n.marginRight??8,a=n.paddingTop??4,l=`display:inline-block;font-size:${s}px;font-weight:${r};color:${o};line-height:1;margin:0 ${i}px 0 0;padding-top:${a}px;vertical-align:baseline`;e.core.ruler.push("wx_intro_dropcap",c=>{const u=c.tokens;for(let d=0;d<u.length;d++){if(u[d].type!=="container_intro_open")continue;let f=d+1;for(;f<u.length&&u[f].type!=="paragraph_open"&&u[f].type!=="container_intro_close";)f++;if(f>=u.length||u[f].type==="container_intro_close")continue;const m=u[f+1];if(!m||m.type!=="inline"||!m.children)continue;const v=m.children;let g=0;for(;g<v.length&&v[g].type!=="text";)g++;if(g>=v.length)continue;const h=v[g].content;if(!h)continue;let w=0;for(;w<h.length&&/[\s"'‘’“”「『《〈(（[［{｛・·。，、；：？！"']/.test(h[w]);)w++;if(w>=h.length||/[0-9]/.test(h[w]))continue;const A=h[w],M=h.slice(0,w),R=h.slice(w+1),B=v[g].constructor,N=new B("html_inline","",0);N.content=`<span class="intro-dropcap" style="${l}">${A}</span>`;const k=[N];if(R){const y=new B("text","",0);y.content=R,k.push(y)}M?(v[g].content=M,v.splice(g+1,0,...k)):v.splice(g,1,...k)}})}const ck=/<input[^>]*\btask-list-item-checkbox\b[^>]*>/i,uk=/\bchecked\b/i,dk=/^<\/?label\b/i;function fk(e,t){const n=t.tokens.colors,o=`<span class="wx-task-square wx-task-square--on" style="display:inline-block;width:12px;height:12px;background-color:${n.primary};color:${n.textInverse};text-align:center;line-height:12px;font-size:11px;font-weight:700;vertical-align:-2px;margin-right:8px">✓</span>`,s=`<span class="wx-task-square wx-task-square--off" style="display:inline-block;width:12px;height:12px;border:1px solid ${n.text};vertical-align:-2px;margin-right:8px">&nbsp;</span>`;e.core.ruler.push("wx_tasklist_squares",r=>{for(const i of r.tokens){if(i.type!=="inline"||!i.children)continue;const a=i.children;for(const l of a)l.type==="html_inline"&&(ck.test(l.content)?l.content=uk.test(l.content)?o:s:dk.test(l.content)&&(l.content=""))}})}function pk(e,t,n){return{themeId:e.id,tokens:e.tokens,assets:e.assets,containers:e.containers,innerStyles:e.innerStyles,inline:e.inline,variants:e.variants,pageVariants:t,kickers:e.kickers,info:"",attrs:{},userVariants:n}}const hk=["font-family","fontfamily","position","float"],mk=new Set(["flex","inline-flex","grid","inline-grid"]),gk=[[/-webkit-/i,"-webkit- 前缀在公众号会被剥离"],[/@media/i,"@media 查询会被公众号剥离"],[/@keyframes/i,"@keyframes 动画不被公众号支持"],[/:hover/i,":hover 伪类粘贴后无效"],[/:active/i,":active 伪类粘贴后无效"]],Tf=new Set(["position","top","right","bottom","left","z-index"]),xa=new Set(["style","script","noscript","link","meta"]),Ca=[/^https?:\/\/v\.qq\.com\//i],wc="#fefefe";function Af(e,t,n){const o=e.toLowerCase();if(hk.includes(o))return[{severity:"error",code:"forbidden-prop",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 声明了 \`${e}\`，违反微信平台约束。请移除。`}];if(o==="display"&&mk.has(t.toLowerCase().trim()))return[{severity:"error",code:"forbidden-display",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 使用了 \`display: ${t}\`，微信粘贴后会被剥离。改用 block / inline-block / table 系列。`}];for(const[s,r]of gk)if(s.test(t))return[{severity:"error",code:"forbidden-value-pattern",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 的值里命中禁用模式（${r}）：\`${t}\`。请移除。`}];return[]}function bk(e,t){const n=[];for(const o of e.split(";")){const s=o.trim();if(!s)continue;const r=s.indexOf(":");if(r<0)continue;const i=s.slice(0,r).trim(),a=s.slice(r+1).trim();!i||!a||n.push(...Af(i,a,t))}return n}const Wr=/\{\{\s*([\w.]+)\s*\}\}/g,yk=/^attr\.[a-zA-Z_][\w-]*$/,vk=new Set(["title","body","wrapperCSS","titleCSS","bodyCSS","svgSlot"]),wk=new Set([...xa,"object","embed","form"]),Sc=/<\s*\/?\s*([a-zA-Z][\w-]*)\b([^>]*)>/g,_c=/\bon[a-z]+\s*=/gi,Sk=/\b(?:href|src|formaction|action)\s*=\s*("|')?\s*javascript:/i,_k=/\bsrc\s*=\s*("([^"]*)"|'([^']*)'|(\S+))/i,kc=/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi;function H5(e,t){const n=[];Sc.lastIndex=0;let o;for(;(o=Sc.exec(e))!==null;){const i=o[1].toLowerCase(),a=o[2]??"",l=o[0];if(/^<\s*\//.test(l))continue;if(wk.has(i)){n.push({severity:"error",code:"forbidden-tag",prop:i,value:l,path:t,message:`[template] ${t} 含禁用标签 <${i}>，微信沙箱会整棵剥离或视为攻击面，请移除。`});continue}if(i==="iframe"){const d=_k.exec(a),f=d?d[2]??d[3]??d[4]??"":"";f&&Ca.some(v=>v.test(f))||n.push({severity:"error",code:"iframe-src-not-allowed",prop:"iframe.src",value:f,path:t,message:`[template] ${t} 的 <iframe> src 不在白名单。当前仅允许 v.qq.com（mpvideo 容器）。`})}_c.lastIndex=0;let c;for(;(c=_c.exec(a))!==null;)n.push({severity:"error",code:"forbidden-attr",prop:c[0].replace(/\s*=\s*$/,""),value:l,path:t,message:`[template] ${t} 含事件属性 \`${c[0].trim()}\`，微信会剥离且为 XSS 风险点。`});Sk.test(a)&&n.push({severity:"error",code:"forbidden-attr",prop:"javascript-protocol",value:l,path:t,message:`[template] ${t} 含 \`javascript:\` 协议，禁止——XSS 风险。`}),kc.lastIndex=0;let u;for(;(u=kc.exec(a))!==null;){const d=u[2]??u[3]??"";!d||!d.replace(Wr,"").trim()||n.push(...bk(d,`${t}.style@<${i}>`))}}let s=0;Wr.lastIndex=0;let r;for(;(r=Wr.exec(e))!==null;){const i=r[1];if(i==="body"){s++;continue}vk.has(i)||yk.test(i)||n.push({severity:"warning",code:"unknown-placeholder",prop:i,value:r[0],path:t,message:`[template] ${t} 含未识别占位符 \`${r[0]}\`，渲染时会原样输出。白名单：{{title}}/{{body}}/{{attr.X}}/{{wrapperCSS}}/{{titleCSS}}/{{bodyCSS}}/{{svgSlot}}。`})}return s===0?n.push({severity:"error",code:"missing-body-placeholder",prop:"{{body}}",value:"",path:t,message:`[template] ${t} 缺少 {{body}} 占位符——渲染器据此切分 open/close，必须恰好 1 个。`}):s>1&&n.push({severity:"error",code:"duplicate-body-placeholder",prop:"{{body}}",value:String(s),path:t,message:`[template] ${t} 含 ${s} 个 {{body}} 占位符；必须恰好 1 个。`}),n}function $a(e){if(e<=0)throw new Error("[lru] max must be > 0");const t=new Map;return{get(n){const o=t.get(n);if(!(o===void 0&&!t.has(n)))return t.delete(n),t.set(n,o),o},set(n,o){if(t.has(n)&&t.delete(n),t.set(n,o),t.size>e){const s=t.keys().next().value;s!==void 0&&t.delete(s)}},has(n){return t.has(n)},delete(n){return t.delete(n)},clear(){t.clear()},get size(){return t.size}}}function kk(e,t,n){const o=Af(e,t,n);if(o.length!==0)throw new Kp(o[0].message)}function xk(e,t){const n=[];for(const[o,s]of Object.entries(e)){const r=o.trim(),i=typeof s=="number"?`${s}px`:String(s).trim();i&&(kk(r,i,t),n.push(`  ${r}: ${i};`))}return n.join(`
`)}function ct(e,t,n){const o=xk(t,n);return o?`${e} {
${o}
}`:""}function Ck(e){return`.${Qe} ${e}`}function $k(e){return`.${Qe} .container-${e}`}const xc=$a(12);function Ek(e){const t=xc.get(e.id);if(t&&t.theme===e)return t.css;const n=Tk(e);return xc.set(e.id,{theme:e,css:n}),n}function Tk(e){const t=[];t.push(ct(`.${Qe}`,{"background-color":e.tokens.colors.bg,color:e.tokens.colors.text,"font-size":`${e.tokens.typography.baseSize}px`,"line-height":String(e.tokens.typography.lineHeight),"letter-spacing":`${e.tokens.typography.letterSpacing}px`,padding:"20px 16px"},"root"));const n=[["h1",e.elements.h1],["h2",e.elements.h2],["h3",e.elements.h3],["h4",e.elements.h4],["h5",e.elements.h5],["h6",e.elements.h6],["p",e.elements.p],["blockquote",e.elements.blockquote],["ul",e.elements.ul],["ol",e.elements.ol],["li",e.elements.li],["code",{...e.elements.code,"word-break":"break-all"}],["kbd",e.elements.kbd],["pre",e.elements.pre],["pre code",{"background-color":"transparent",color:"inherit",padding:"0","word-break":"normal"}],["img",e.elements.img],["a",e.elements.a],["hr",e.elements.hr],["table",e.elements.table],["th",e.elements.th],["td",e.elements.td],["strong",e.elements.strong],["em",e.elements.em]];for(const[i,a]of n){const l=ct(Ck(i),a,`elements.${i}`);l&&t.push(l)}t.push(ct(`.${Qe} mark`,e.inline.highlight,"inline.highlight")),t.push(ct(`.${Qe} .wx-wavy`,e.inline.wavy,"inline.wavy")),t.push(ct(`.${Qe} .wx-emphasis`,e.inline.emphasis,"inline.emphasis")),t.push(ct(`.${Qe} s, .${Qe} del`,e.inline.del,"inline.del")),t.push(ct(`.${Qe} ins`,e.inline.ins,"inline.ins"));for(const i of Wp){const a=e.containers[i.styleKey];if(!a)continue;const l=ct($k(i.name),a,`containers.${i.styleKey}`);l&&t.push(l)}const o=`.${Qe} .container-pros, .${Qe} .container-cons`,s=i=>`.${Qe} .container-pros ${i}, .${Qe} .container-cons ${i}`;t.push(ct(o,{"letter-spacing":"0"},"compare.col")),t.push(ct(s("p"),{"font-size":"13px","letter-spacing":"0","line-height":"1.6","margin-bottom":"6px"},"compare.col p")),t.push(ct(s("li"),{"font-size":"13px","letter-spacing":"0","line-height":"1.55","margin-bottom":"4px"},"compare.col li")),t.push(ct(s("ul")+`, ${s("ol")}`,{"padding-left":"12px","margin-bottom":"8px"},"compare.col ul")),t.push(ct(s("h3"),{"font-size":"14px","margin-top":"8px","margin-bottom":"6px","line-height":"1.4"},"compare.col h3")),t.push(ct(s("code"),{"font-size":"12px",padding:"1px 4px"},"compare.col code"));const r=`.${Qe} .container-tip p,.${Qe} .container-info p,.${Qe} .container-warning p,.${Qe} .container-danger p`;return t.push(ct(r,{"text-indent":"0"},"admonition.body p")),t.filter(Boolean).join(`

`)}function If(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&If(n)}),e}class Cc{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Rf(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function wn(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const s in o)n[s]=o[s]}),n}const Ak="</span>",$c=e=>!!e.scope,Ik=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,s)=>`${o}${"_".repeat(s+1)}`)].join(" ")}return`${t}${e}`};class Rk{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Rf(t)}openNode(t){if(!$c(t))return;const n=Ik(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){$c(t)&&(this.buffer+=Ak)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Ec=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ea{constructor(){this.rootNode=Ec(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Ec({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ea._collapse(n)}))}}class Mk extends Ea{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Rk(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ns(e){return e?typeof e=="string"?e:e.source:null}function Mf(e){return zn("(?=",e,")")}function Ok(e){return zn("(?:",e,")*")}function Nk(e){return zn("(?:",e,")?")}function zn(...e){return e.map(n=>ns(n)).join("")}function Lk(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ta(...e){return"("+(Lk(e).capture?"":"?:")+e.map(o=>ns(o)).join("|")+")"}function Of(e){return new RegExp(e.toString()+"|").exec("").length-1}function Dk(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Pk=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Aa(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const s=n;let r=ns(o),i="";for(;r.length>0;){const a=Pk.exec(r);if(!a){i+=r;break}i+=r.substring(0,a.index),r=r.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?i+="\\"+String(Number(a[1])+s):(i+=a[0],a[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(t)}const Bk=/\b\B/,Nf="[a-zA-Z]\\w*",Ia="[a-zA-Z_]\\w*",Lf="\\b\\d+(\\.\\d+)?",Df="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Pf="\\b(0b[01]+)",Fk="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jk=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=zn(t,/.*\b/,e.binary,/\b.*/)),wn({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},os={begin:"\\\\[\\s\\S]",relevance:0},Hk={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[os]},Vk={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[os]},Uk={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},fr=function(e,t,n={}){const o=wn({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const s=Ta("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:zn(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},zk=fr("//","$"),Wk=fr("/\\*","\\*/"),Kk=fr("#","$"),qk={scope:"number",begin:Lf,relevance:0},Gk={scope:"number",begin:Df,relevance:0},Yk={scope:"number",begin:Pf,relevance:0},Jk={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[os,{begin:/\[/,end:/\]/,relevance:0,contains:[os]}]},Qk={scope:"title",begin:Nf,relevance:0},Xk={scope:"title",begin:Ia,relevance:0},Zk={begin:"\\.\\s*"+Ia,relevance:0},ex=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ss=Object.freeze({__proto__:null,APOS_STRING_MODE:Hk,BACKSLASH_ESCAPE:os,BINARY_NUMBER_MODE:Yk,BINARY_NUMBER_RE:Pf,COMMENT:fr,C_BLOCK_COMMENT_MODE:Wk,C_LINE_COMMENT_MODE:zk,C_NUMBER_MODE:Gk,C_NUMBER_RE:Df,END_SAME_AS_BEGIN:ex,HASH_COMMENT_MODE:Kk,IDENT_RE:Nf,MATCH_NOTHING_RE:Bk,METHOD_GUARD:Zk,NUMBER_MODE:qk,NUMBER_RE:Lf,PHRASAL_WORDS_MODE:Uk,QUOTE_STRING_MODE:Vk,REGEXP_MODE:Jk,RE_STARTERS_RE:Fk,SHEBANG:jk,TITLE_MODE:Qk,UNDERSCORE_IDENT_RE:Ia,UNDERSCORE_TITLE_MODE:Xk});function tx(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function nx(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ox(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=tx,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function sx(e,t){Array.isArray(e.illegal)&&(e.illegal=Ta(...e.illegal))}function rx(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ix(e,t){e.relevance===void 0&&(e.relevance=1)}const ax=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=zn(n.beforeMatch,Mf(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},lx=["of","and","for","in","not","or","if","then","parent","list","value"],cx="keyword";function Bf(e,t,n=cx){const o=Object.create(null);return typeof e=="string"?s(n,e.split(" ")):Array.isArray(e)?s(n,e):Object.keys(e).forEach(function(r){Object.assign(o,Bf(e[r],t,r))}),o;function s(r,i){t&&(i=i.map(a=>a.toLowerCase())),i.forEach(function(a){const l=a.split("|");o[l[0]]=[r,ux(l[0],l[1])]})}}function ux(e,t){return t?Number(t):dx(e)?0:1}function dx(e){return lx.includes(e.toLowerCase())}const Tc={},Fn=e=>{console.error(e)},Ac=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Jn=(e,t)=>{Tc[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Tc[`${e}/${t}`]=!0)},Ws=new Error;function Ff(e,t,{key:n}){let o=0;const s=e[n],r={},i={};for(let a=1;a<=t.length;a++)i[a+o]=s[a],r[a+o]=!0,o+=Of(t[a-1]);e[n]=i,e[n]._emit=r,e[n]._multi=!0}function fx(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Fn("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ws;if(typeof e.beginScope!="object"||e.beginScope===null)throw Fn("beginScope must be object"),Ws;Ff(e,e.begin,{key:"beginScope"}),e.begin=Aa(e.begin,{joinWith:""})}}function px(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Fn("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ws;if(typeof e.endScope!="object"||e.endScope===null)throw Fn("endScope must be object"),Ws;Ff(e,e.end,{key:"endScope"}),e.end=Aa(e.end,{joinWith:""})}}function hx(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function mx(e){hx(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),fx(e),px(e)}function gx(e){function t(i,a){return new RegExp(ns(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,a]),this.matchAt+=Of(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const a=this.regexes.map(l=>l[1]);this.matcherRe=t(Aa(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(a);if(!l)return null;const c=l.findIndex((d,f)=>f>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];const l=new n;return this.rules.slice(a).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[a]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,l){this.rules.push([a,l]),l.type==="begin"&&this.count++}exec(a){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(a);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(a)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function s(i){const a=new o;return i.contains.forEach(l=>a.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&a.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&a.addRule(i.illegal,{type:"illegal"}),a}function r(i,a){const l=i;if(i.isCompiled)return l;[nx,rx,mx,ax].forEach(u=>u(i,a)),e.compilerExtensions.forEach(u=>u(i,a)),i.__beforeBegin=null,[ox,sx,ix].forEach(u=>u(i,a)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Bf(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(c,!0),a&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=ns(l.end)||"",i.endsWithParent&&a.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+a.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return bx(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,a),l.matcher=s(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=wn(e.classNameAliases||{}),r(e)}function jf(e){return e?e.endsWithParent||jf(e.starts):!1}function bx(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return wn(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:jf(e)?wn(e,{starts:e.starts?wn(e.starts):null}):Object.isFrozen(e)?wn(e):e}var yx="11.11.1";class vx extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Kr=Rf,Ic=wn,Rc=Symbol("nomatch"),wx=7,Hf=function(e){const t=Object.create(null),n=Object.create(null),o=[];let s=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Mk};function l(E){return a.noHighlightRe.test(E)}function c(E){let F=E.className+" ";F+=E.parentNode?E.parentNode.className:"";const j=a.languageDetectRe.exec(F);if(j){const oe=y(j[1]);return oe||(Ac(r.replace("{}",j[1])),Ac("Falling back to no-highlight mode for this block.",E)),oe?j[1]:"no-highlight"}return F.split(/\s+/).find(oe=>l(oe)||y(oe))}function u(E,F,j){let oe="",be="";typeof F=="object"?(oe=E,j=F.ignoreIllegals,be=F.language):(Jn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Jn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),be=E,oe=F),j===void 0&&(j=!0);const xe={code:oe,language:be};W("before:highlight",xe);const Ee=xe.result?xe.result:d(xe.language,xe.code,j);return Ee.code=xe.code,W("after:highlight",Ee),Ee}function d(E,F,j,oe){const be=Object.create(null);function xe(q,X){return q.keywords[X]}function Ee(){if(!V.keywords){J.addText(H);return}let q=0;V.keywordPatternRe.lastIndex=0;let X=V.keywordPatternRe.exec(H),ie="";for(;X;){ie+=H.substring(q,X.index);const he=U.case_insensitive?X[0].toLowerCase():X[0],ge=xe(V,he);if(ge){const[se,_e]=ge;if(J.addText(ie),ie="",be[he]=(be[he]||0)+1,be[he]<=wx&&(de+=_e),se.startsWith("_"))ie+=X[0];else{const $n=U.classNameAliases[se]||se;re(X[0],$n)}}else ie+=X[0];q=V.keywordPatternRe.lastIndex,X=V.keywordPatternRe.exec(H)}ie+=H.substring(q),J.addText(ie)}function Ie(){if(H==="")return;let q=null;if(typeof V.subLanguage=="string"){if(!t[V.subLanguage]){J.addText(H);return}q=d(V.subLanguage,H,!0,Z[V.subLanguage]),Z[V.subLanguage]=q._top}else q=m(H,V.subLanguage.length?V.subLanguage:null);V.relevance>0&&(de+=q.relevance),J.__addSublanguage(q._emitter,q.language)}function le(){V.subLanguage!=null?Ie():Ee(),H=""}function re(q,X){q!==""&&(J.startScope(X),J.addText(q),J.endScope())}function ce(q,X){let ie=1;const he=X.length-1;for(;ie<=he;){if(!q._emit[ie]){ie++;continue}const ge=U.classNameAliases[q[ie]]||q[ie],se=X[ie];ge?re(se,ge):(H=se,Ee(),H=""),ie++}}function ve(q,X){return q.scope&&typeof q.scope=="string"&&J.openNode(U.classNameAliases[q.scope]||q.scope),q.beginScope&&(q.beginScope._wrap?(re(H,U.classNameAliases[q.beginScope._wrap]||q.beginScope._wrap),H=""):q.beginScope._multi&&(ce(q.beginScope,X),H="")),V=Object.create(q,{parent:{value:V}}),V}function Ue(q,X,ie){let he=Dk(q.endRe,ie);if(he){if(q["on:end"]){const ge=new Cc(q);q["on:end"](X,ge),ge.isMatchIgnored&&(he=!1)}if(he){for(;q.endsParent&&q.parent;)q=q.parent;return q}}if(q.endsWithParent)return Ue(q.parent,X,ie)}function St(q){return V.matcher.regexIndex===0?(H+=q[0],1):(me=!0,0)}function gt(q){const X=q[0],ie=q.rule,he=new Cc(ie),ge=[ie.__beforeBegin,ie["on:begin"]];for(const se of ge)if(se&&(se(q,he),he.isMatchIgnored))return St(X);return ie.skip?H+=X:(ie.excludeBegin&&(H+=X),le(),!ie.returnBegin&&!ie.excludeBegin&&(H=X)),ve(ie,q),ie.returnBegin?0:X.length}function Gt(q){const X=q[0],ie=F.substring(q.index),he=Ue(V,q,ie);if(!he)return Rc;const ge=V;V.endScope&&V.endScope._wrap?(le(),re(X,V.endScope._wrap)):V.endScope&&V.endScope._multi?(le(),ce(V.endScope,q)):ge.skip?H+=X:(ge.returnEnd||ge.excludeEnd||(H+=X),le(),ge.excludeEnd&&(H=X));do V.scope&&J.closeNode(),!V.skip&&!V.subLanguage&&(de+=V.relevance),V=V.parent;while(V!==he.parent);return he.starts&&ve(he.starts,q),ge.returnEnd?0:X.length}function S(){const q=[];for(let X=V;X!==U;X=X.parent)X.scope&&q.unshift(X.scope);q.forEach(X=>J.openNode(X))}let C={};function D(q,X){const ie=X&&X[0];if(H+=q,ie==null)return le(),0;if(C.type==="begin"&&X.type==="end"&&C.index===X.index&&ie===""){if(H+=F.slice(X.index,X.index+1),!s){const he=new Error(`0 width match regex (${E})`);throw he.languageName=E,he.badRule=C.rule,he}return 1}if(C=X,X.type==="begin")return gt(X);if(X.type==="illegal"&&!j){const he=new Error('Illegal lexeme "'+ie+'" for mode "'+(V.scope||"<unnamed>")+'"');throw he.mode=V,he}else if(X.type==="end"){const he=Gt(X);if(he!==Rc)return he}if(X.type==="illegal"&&ie==="")return H+=`
`,1;if(fe>1e5&&fe>X.index*3)throw new Error("potential infinite loop, way more iterations than matches");return H+=ie,ie.length}const U=y(E);if(!U)throw Fn(r.replace("{}",E)),new Error('Unknown language: "'+E+'"');const K=gx(U);let G="",V=oe||K;const Z={},J=new a.__emitter(a);S();let H="",de=0,ee=0,fe=0,me=!1;try{if(U.__emitTokens)U.__emitTokens(F,J);else{for(V.matcher.considerAll();;){fe++,me?me=!1:V.matcher.considerAll(),V.matcher.lastIndex=ee;const q=V.matcher.exec(F);if(!q)break;const X=F.substring(ee,q.index),ie=D(X,q);ee=q.index+ie}D(F.substring(ee))}return J.finalize(),G=J.toHTML(),{language:E,value:G,relevance:de,illegal:!1,_emitter:J,_top:V}}catch(q){if(q.message&&q.message.includes("Illegal"))return{language:E,value:Kr(F),illegal:!0,relevance:0,_illegalBy:{message:q.message,index:ee,context:F.slice(ee-100,ee+100),mode:q.mode,resultSoFar:G},_emitter:J};if(s)return{language:E,value:Kr(F),illegal:!1,relevance:0,errorRaised:q,_emitter:J,_top:V};throw q}}function f(E){const F={value:Kr(E),illegal:!1,relevance:0,_top:i,_emitter:new a.__emitter(a)};return F._emitter.addText(E),F}function m(E,F){F=F||a.languages||Object.keys(t);const j=f(E),oe=F.filter(y).filter(_).map(le=>d(le,E,!1));oe.unshift(j);const be=oe.sort((le,re)=>{if(le.relevance!==re.relevance)return re.relevance-le.relevance;if(le.language&&re.language){if(y(le.language).supersetOf===re.language)return 1;if(y(re.language).supersetOf===le.language)return-1}return 0}),[xe,Ee]=be,Ie=xe;return Ie.secondBest=Ee,Ie}function v(E,F,j){const oe=F&&n[F]||j;E.classList.add("hljs"),E.classList.add(`language-${oe}`)}function g(E){let F=null;const j=c(E);if(l(j))return;if(W("before:highlightElement",{el:E,language:j}),E.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",E);return}if(E.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(E)),a.throwUnescapedHTML))throw new vx("One of your code blocks includes unescaped HTML.",E.innerHTML);F=E;const oe=F.textContent,be=j?u(oe,{language:j,ignoreIllegals:!0}):m(oe);E.innerHTML=be.value,E.dataset.highlighted="yes",v(E,j,be.language),E.result={language:be.language,re:be.relevance,relevance:be.relevance},be.secondBest&&(E.secondBest={language:be.secondBest.language,relevance:be.secondBest.relevance}),W("after:highlightElement",{el:E,result:be,text:oe})}function h(E){a=Ic(a,E)}const w=()=>{R(),Jn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function A(){R(),Jn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let M=!1;function R(){function E(){R()}if(document.readyState==="loading"){M||window.addEventListener("DOMContentLoaded",E,!1),M=!0;return}document.querySelectorAll(a.cssSelector).forEach(g)}function B(E,F){let j=null;try{j=F(e)}catch(oe){if(Fn("Language definition for '{}' could not be registered.".replace("{}",E)),s)Fn(oe);else throw oe;j=i}j.name||(j.name=E),t[E]=j,j.rawDefinition=F.bind(null,e),j.aliases&&b(j.aliases,{languageName:E})}function N(E){delete t[E];for(const F of Object.keys(n))n[F]===E&&delete n[F]}function k(){return Object.keys(t)}function y(E){return E=(E||"").toLowerCase(),t[E]||t[n[E]]}function b(E,{languageName:F}){typeof E=="string"&&(E=[E]),E.forEach(j=>{n[j.toLowerCase()]=F})}function _(E){const F=y(E);return F&&!F.disableAutodetect}function x(E){E["before:highlightBlock"]&&!E["before:highlightElement"]&&(E["before:highlightElement"]=F=>{E["before:highlightBlock"](Object.assign({block:F.el},F))}),E["after:highlightBlock"]&&!E["after:highlightElement"]&&(E["after:highlightElement"]=F=>{E["after:highlightBlock"](Object.assign({block:F.el},F))})}function $(E){x(E),o.push(E)}function P(E){const F=o.indexOf(E);F!==-1&&o.splice(F,1)}function W(E,F){const j=E;o.forEach(function(oe){oe[j]&&oe[j](F)})}function O(E){return Jn("10.7.0","highlightBlock will be removed entirely in v12.0"),Jn("10.7.0","Please use highlightElement now."),g(E)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:R,highlightElement:g,highlightBlock:O,configure:h,initHighlighting:w,initHighlightingOnLoad:A,registerLanguage:B,unregisterLanguage:N,listLanguages:k,getLanguage:y,registerAliases:b,autoDetection:_,inherit:Ic,addPlugin:$,removePlugin:P}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString=yx,e.regex={concat:zn,lookahead:Mf,either:Ta,optional:Nk,anyNumberOfTimes:Ok};for(const E in Ss)typeof Ss[E]=="object"&&If(Ss[E]);return Object.assign(e,Ss),e},po=Hf({});po.newInstance=()=>Hf({});var Sx=po;po.HighlightJS=po;po.default=po;const Dt=hh(Sx),Mc="[A-Za-z$_][0-9A-Za-z$_]*",_x=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],kx=["true","false","null","undefined","NaN","Infinity"],Vf=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Uf=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],zf=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],xx=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Cx=[].concat(zf,Vf,Uf);function Wf(e){const t=e.regex,n=(j,{after:oe})=>{const be="</"+j[0].slice(1);return j.input.indexOf(be,oe)!==-1},o=Mc,s={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(j,oe)=>{const be=j[0].length+j.index,xe=j.input[be];if(xe==="<"||xe===","){oe.ignoreMatch();return}xe===">"&&(n(j,{after:be})||oe.ignoreMatch());let Ee;const Ie=j.input.substring(be);if(Ee=Ie.match(/^\s*=/)){oe.ignoreMatch();return}if((Ee=Ie.match(/^\s+extends\s+/))&&Ee.index===0){oe.ignoreMatch();return}}},a={$pattern:Mc,keyword:_x,literal:kx,built_in:Cx,"variable.language":xx},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},m={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},A={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},M=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,v,g,h,{match:/\$\d+/},d];f.contains=M.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(M)});const R=[].concat(A,f.contains),B=R.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(R)}]),N={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:B},k={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},y={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Vf,...Uf]}},b={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},_={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[N],illegal:/%/},x={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function $(j){return t.concat("(?!",j.join("|"),")")}const P={match:t.concat(/\b/,$([...zf,"super","import"].map(j=>`${j}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},O={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},N]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",F={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[N]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:y},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),b,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,v,g,h,A,{match:/\$\d+/},d,y,{scope:"attr",match:o+t.lookahead(":"),relevance:0},F,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[A,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},_,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[N,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[N]},P,x,k,O,{match:/\$[(.]/}]}}const Ks="[A-Za-z$_][0-9A-Za-z$_]*",Kf=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],qf=["true","false","null","undefined","NaN","Infinity"],Gf=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yf=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Jf=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Qf=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Xf=[].concat(Jf,Gf,Yf);function $x(e){const t=e.regex,n=(j,{after:oe})=>{const be="</"+j[0].slice(1);return j.input.indexOf(be,oe)!==-1},o=Ks,s={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(j,oe)=>{const be=j[0].length+j.index,xe=j.input[be];if(xe==="<"||xe===","){oe.ignoreMatch();return}xe===">"&&(n(j,{after:be})||oe.ignoreMatch());let Ee;const Ie=j.input.substring(be);if(Ee=Ie.match(/^\s*=/)){oe.ignoreMatch();return}if((Ee=Ie.match(/^\s+extends\s+/))&&Ee.index===0){oe.ignoreMatch();return}}},a={$pattern:Ks,keyword:Kf,literal:qf,built_in:Xf,"variable.language":Qf},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},m={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},g={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},A={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},M=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,v,g,h,{match:/\$\d+/},d];f.contains=M.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(M)});const R=[].concat(A,f.contains),B=R.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(R)}]),N={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:B},k={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},y={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Gf,...Yf]}},b={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},_={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[N],illegal:/%/},x={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function $(j){return t.concat("(?!",j.join("|"),")")}const P={match:t.concat(/\b/,$([...Jf,"super","import"].map(j=>`${j}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},O={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},N]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",F={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[N]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:y},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),b,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,v,g,h,A,{match:/\$\d+/},d,y,{scope:"attr",match:o+t.lookahead(":"),relevance:0},F,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[A,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},_,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[N,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[N]},P,x,k,O,{match:/\$[(.]/}]}}function Zf(e){const t=e.regex,n=$x(e),o=Ks,s=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],r={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},i={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:s},contains:[n.exports.CLASS_REFERENCE]},a={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},l=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],c={$pattern:Ks,keyword:Kf.concat(l),literal:qf,built_in:Xf.concat(s),"variable.language":Qf},u={className:"meta",begin:"@"+o},d=(g,h,w)=>{const A=g.contains.findIndex(M=>M.label===h);if(A===-1)throw new Error("can not find mode to replace");g.contains.splice(A,1,w)};Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(u);const f=n.contains.find(g=>g.scope==="attr"),m=Object.assign({},f,{match:t.concat(o,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,f,m]),n.contains=n.contains.concat([u,r,i,m]),d(n,"shebang",e.SHEBANG()),d(n,"use_strict",a);const v=n.contains.find(g=>g.label==="func.def");return v.relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),n}function ep(e){const t=e.regex,n=/[\p{XID_Start}_]\p{XID_Continue}*/u,o=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],a={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:o,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},l={className:"meta",begin:/^(>>>|\.\.\.) /},c={className:"subst",begin:/\{/,end:/\}/,keywords:a,illegal:/#/},u={begin:/\{\{/,relevance:0},d={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,u,c]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},f="[0-9](_?[0-9])*",m=`(\\b(${f}))?\\.(${f})|\\b(${f})\\.`,v=`\\b|${o.join("|")}`,g={className:"number",relevance:0,variants:[{begin:`(\\b(${f})|(${m}))[eE][+-]?(${f})[jJ]?(?=${v})`},{begin:`(${m})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${v})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${v})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${v})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${v})`},{begin:`\\b(${f})[jJ](?=${v})`}]},h={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:a,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},w={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:["self",l,g,d,e.HASH_COMMENT_MODE]}]};return c.contains=[d,g,l],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:a,illegal:/(<\/|\?)|=>/,contains:[l,g,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},d,h,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,n],scope:{1:"keyword",3:"title.function"},contains:[w]},{variants:[{match:[/\bclass/,/\s+/,n,/\s*/,/\(\s*/,n,/\s*\)/]},{match:[/\bclass/,/\s+/,n]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[g,w,d]}]}}function tp(e){const t=e.regex,n={},o={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},o]});const s={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},r=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),i={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},a={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,s]};s.contains.push(a);const l={match:/\\"/},c={className:"string",begin:/'/,end:/'/},u={match:/\\'/},d={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},f=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],m=e.SHEBANG({binary:`(${f.join("|")})`,relevance:10}),v={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},g=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],h=["true","false"],w={match:/(\/[a-z._-]+)+/},A=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],M=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],R=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],B=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:g,literal:h,built_in:[...A,...M,"set","shopt",...R,...B]},contains:[m,e.SHEBANG(),v,d,r,i,w,a,l,c,u,n]}}function Ex(e){const t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},n={match:/[{}[\],:]/,className:"punctuation",relevance:0},o=["true","false","null"],s={scope:"literal",beginKeywords:o.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:o},contains:[t,n,e.QUOTE_STRING_MODE,s,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}Dt.registerLanguage("javascript",Wf);Dt.registerLanguage("js",Wf);Dt.registerLanguage("typescript",Zf);Dt.registerLanguage("ts",Zf);Dt.registerLanguage("python",ep);Dt.registerLanguage("py",ep);Dt.registerLanguage("bash",tp);Dt.registerLanguage("sh",tp);Dt.registerLanguage("json",Ex);function Tx(e,t){const n=t&&Dt.getLanguage(t)?t:"";if(!n)return{html:Y(e),language:""};try{return{html:Dt.highlight(e,{language:n,ignoreIllegals:!0}).value,language:n}}catch{return{html:Y(e),language:""}}}const Ax=`
.hljs { color: #abb2bf; background: #282c34; }
.hljs-comment, .hljs-quote { color: #5c6370; font-style: italic; }
.hljs-doctag, .hljs-keyword, .hljs-formula { color: #c678dd; }
.hljs-section, .hljs-name, .hljs-selector-tag, .hljs-deletion, .hljs-subst { color: #e06c75; }
.hljs-literal { color: #56b6c2; }
.hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string { color: #98c379; }
.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-type, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, .hljs-number { color: #d19a66; }
.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title { color: #61aeee; }
.hljs-built_in, .hljs-title.class_, .hljs-class .hljs-title { color: #e6c07b; }
.hljs-emphasis { font-style: italic; }
.hljs-strong { font-weight: bold; }
`;let qr=null,Oc=null;function Ix(e){if(qr!==null&&qr===e)return Oc;const t=[],n=e.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi,(r,i)=>(t.push(i),"")),o=t.join(`
`),s=o.trim()?mh.inlineContent(n,o,{inlinePseudoElements:!1,preserveImportant:!1,preserveMediaQueries:!1,preserveFontFaces:!1,removeStyleTags:!0}):n;return qr=e,Oc=s,s}function Wn(e){const n=new DOMParser().parseFromString(`<!doctype html><html><body><div id="__wx_root__">${e}</div></body></html>`,"text/html"),o=n.getElementById("__wx_root__");return{doc:n,container:o}}function ko(e){return e.innerHTML}function xo(e){if(!e)return[];const t=[],n="\0";let o=0,s="";for(const r of e)r==="("&&o++,r===")"&&(o=Math.max(0,o-1)),s+=o>0&&r===";"?n:r;for(const r of s.split(";")){const i=r.replace(new RegExp(n,"g"),";").trim();if(!i)continue;const a=i.indexOf(":");if(a<0)continue;let l=i.slice(0,a).trim(),c=i.slice(a+1).trim(),u=!1;/!important\s*$/i.test(c)&&(u=!0,c=c.replace(/!important\s*$/i,"").trim()),!(!l||!c)&&t.push({prop:l,value:c,important:u})}return t}function us(e){return e.map(t=>`${t.prop}: ${t.value}${t.important?" !important":""}`).join("; ")}function Vn(e,t){const n=[e];for(;n.length;){const o=n.pop();t(o);for(let s=o.children.length-1;s>=0;s--)n.push(o.children[s])}}function np(e){let t=e;for(;t;){if(t.tagName.toLowerCase()==="svg")return!0;t=t.parentElement}return!1}function Ra(e,t){const{container:n}=Wn(e);return n.querySelectorAll("svg").forEach(s=>{Vn(s,t)}),ko(n)}const Nc="data-wx-list-wrap",Rx="data-wx-list-flatten",Mx="· ";function Ox(e){const{container:t}=Wn(e),n=[];Vn(t,s=>{const r=s.tagName.toLowerCase();r!=="ul"&&r!=="ol"||Nx(s)===2&&n.push(s)});for(const s of n){const r=op(s);s.parentElement?.replaceChild(r,s)}const o=[];Vn(t,s=>{const r=s.tagName.toLowerCase();if(r!=="ul"&&r!=="ol")return;const i=s.parentElement;i&&i.hasAttribute(Nc)||o.push(s)});for(const s of o){const r=s.ownerDocument.createElement("section");r.setAttribute(Nc,"");const i=s.getAttribute("style")??"";i&&r.setAttribute("style",i),s.parentElement?.insertBefore(r,s),r.appendChild(s)}return ko(t)}function Nx(e){let t=0,n=e.parentElement;for(;n;){const o=n.tagName.toLowerCase();(o==="ul"||o==="ol")&&t++,n=n.parentElement}return t}function op(e){const t=e.ownerDocument,n=t.createDocumentFragment(),o=Array.from(e.children).filter(s=>s.tagName.toLowerCase()==="li");for(const s of o){const r=Array.from(s.children).filter(l=>{const c=l.tagName.toLowerCase();return c==="ul"||c==="ol"});for(const l of r){const c=op(l);s.replaceChild(c,l)}const i=t.createElement("p");i.setAttribute(Rx,""),i.appendChild(t.createTextNode(Mx));const a=[];for(;s.firstChild;){const l=s.firstChild;l.nodeType===1&&l.tagName.toLowerCase()==="p"?(a.push(l),s.removeChild(l)):i.appendChild(l)}i.childNodes.length>1&&n.appendChild(i);for(const l of a)n.appendChild(l)}return n}const Lx=/^(fn|fnref|footnote)[-\d]/i;function Dx(e){const{container:t}=Wn(e);return Vn(t,n=>{if(n.hasAttribute("id")){const i=n.getAttribute("id")??"";(np(n)||!Lx.test(i))&&n.removeAttribute("id")}const o=n.getAttribute("style");if(!o)return;const s=xo(o),r=s.filter(i=>!Tf.has(i.prop.toLowerCase()));r.length!==s.length&&(r.length===0?n.removeAttribute("style"):n.setAttribute("style",us(r)))}),ko(t)}function Px(e){const{container:t}=Wn(e),n=[],o=t.getElementsByTagName("*");for(let s=0;s<o.length;s++){const r=o[s],i=r.tagName.toLowerCase();if(xa.has(i)){n.push(r);continue}if(i==="iframe"){const a=r.getAttribute("src")??"";Ca.some(c=>c.test(a))||n.push(r)}}for(const s of n)s.remove();return ko(t)}function Bx(e){const{container:t}=Wn(e);return Vn(t,n=>{const o=n.getAttribute("style");if(!o)return;const s=xo(o),r=s.filter(i=>i.prop.toLowerCase()!=="font-family");r.length!==s.length&&(r.length===0?n.removeAttribute("style"):n.setAttribute("style",us(r)))}),ko(t)}const Fx=/url\(\s*(['"])([^'"]*)\1\s*\)/g;function Lc(e){return e.replace(Fx,(t,n,o)=>`url(${o})`)}function jx(e){return Ra(e,t=>{for(let o=0;o<t.attributes.length;o++){const s=t.attributes[o];if(!s.value.includes("url("))continue;const r=Lc(s.value);r!==s.value&&t.setAttribute(s.name,r)}const n=t.getAttribute("style");if(n&&n.includes("url(")){const o=xo(n).map(s=>({...s,value:Lc(s.value)}));t.setAttribute("style",us(o))}})}function Hx(e){return Ra(e,t=>{t.hasAttribute("id")&&t.removeAttribute("id")})}const Vx="data-wx-keep-flex";function Ux(e){const{container:t}=Wn(e);return Vn(t,n=>{if(n.hasAttribute(Vx))return;const o=n.getAttribute("style");if(!o)return;const s=xo(o);let r=!1;const i=s.map(a=>{if(a.prop.toLowerCase()!=="display")return a;const l=a.value.toLowerCase();return l==="flex"||l==="inline-flex"?(r=!0,{...a,value:l==="inline-flex"?"inline-block":"block"}):a});r&&n.setAttribute("style",us(i))}),ko(t)}const zx=new Set(["#fff","#ffffff","white"]),Wx=/^\s*rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)\s*$/i;function Dc(e){const t=e.trim().toLowerCase();return zx.has(t)||Wx.test(t)}const Kx=new Set(["fill","stroke","stop-color","flood-color","lighting-color"]),qx=new Set(["fill","stroke","color","background","background-color","stop-color"]);function Gx(e){return Ra(e,t=>{for(const s of Array.from(Kx)){const r=t.getAttribute(s);r&&Dc(r)&&t.setAttribute(s,wc)}const n=t.getAttribute("style");if(!n)return;const o=xo(n).map(s=>qx.has(s.prop.toLowerCase())&&Dc(s.value)?{...s,value:wc}:s);t.setAttribute("style",us(o))})}const Yx="data-wx-list-wrap",Jx="data-wx-keep-flex",Qx=/^(fn|fnref|footnote)[-\d]/i,Xx=5;function Zx(e){const t=e.tagName.toLowerCase(),n=(e.getAttribute("class")??"").trim().split(/\s+/).filter(Boolean).slice(0,3);return n.length>0?`${t}.${n.join(".")}`:t}function An(e,t){e.length<Xx&&e.push(t)}function eC(e){const t={listWrap:0,deepList:0,strippedId:0,strippedPos:0,hardTag:0,disallowedIframe:0,fontFamily:0,flexFallback:0,svgId:0},n={strippedId:[],strippedPos:[],hardTag:[],disallowedIframe:[],fontFamily:[],flexFallback:[],svgId:[]};if(e&&e.trim())try{const{container:s}=Wn(e);Vn(s,r=>{if(r===s)return;const i=r.tagName.toLowerCase(),a=Zx(r);if(i==="ul"||i==="ol"){const c=r.parentElement;(!c||!c.hasAttribute(Yx))&&t.listWrap++;let u=0,d=r.parentElement;for(;d;){const f=d.tagName.toLowerCase();(f==="ul"||f==="ol")&&u++,d=d.parentElement}u===2&&t.deepList++}if(r.hasAttribute("id")){const c=r.getAttribute("id")??"";np(r)?(t.svgId++,An(n.svgId,{selector:a,before:`id="${c}"`})):Qx.test(c)||(t.strippedId++,An(n.strippedId,{selector:a,before:`id="${c}"`}))}if(xa.has(i)&&(t.hardTag++,An(n.hardTag,{selector:a,before:`<${i}>`})),i==="iframe"){const c=r.getAttribute("src")??"";Ca.some(d=>d.test(c))||(t.disallowedIframe++,An(n.disallowedIframe,{selector:a,before:`src="${c}"`}))}const l=r.getAttribute("style");if(l){const c=xo(l);for(const u of c){const d=u.prop.toLowerCase();Tf.has(d)&&(t.strippedPos++,An(n.strippedPos,{selector:a,before:`${u.prop}: ${u.value}`})),d==="font-family"&&(t.fontFamily++,An(n.fontFamily,{selector:a,before:`${u.prop}: ${u.value}`})),d==="display"&&/flex/i.test(u.value)&&!r.hasAttribute(Jx)&&(t.flexFallback++,An(n.flexFallback,{selector:a,before:`display: ${u.value}`}))}}})}catch{}const o=[];return t.listWrap&&o.push({patch:"patchListWrap",label:"列表外包 <section>（保住外边距）",count:t.listWrap}),t.deepList&&o.push({patch:"patchListWrap",label:"≥ 3 层嵌套列表扁平化为段落",count:t.deepList}),t.strippedId&&o.push({patch:"stripForbiddenAttrs",label:"删除 id 属性（脚注锚点除外）",count:t.strippedId,samples:n.strippedId}),t.strippedPos&&o.push({patch:"stripForbiddenAttrs",label:"剥离 position/top/z-index 等定位声明",count:t.strippedPos,samples:n.strippedPos}),t.hardTag&&o.push({patch:"stripForbiddenTags",label:"移除 style/script/meta/link 等标签",count:t.hardTag,samples:n.hardTag}),t.disallowedIframe&&o.push({patch:"stripForbiddenTags",label:"剥离非白名单 iframe",count:t.disallowedIframe,samples:n.disallowedIframe}),t.fontFamily&&o.push({patch:"stripFontFamily",label:"剥离 inline font-family",count:t.fontFamily,samples:n.fontFamily}),t.flexFallback&&o.push({patch:"patchFlexToFallback",label:"display:flex → block 降级",count:t.flexFallback,samples:n.flexFallback}),t.svgId&&o.push({patch:"patchSvgIds",label:"SVG 子树 id 清理",count:t.svgId,samples:n.svgId}),{entries:o,total:o.reduce((s,r)=>s+r.count,0)}}function tC(e,t={}){let n=e;return n=Ox(n),n=Dx(n),n=Px(n),n=Bx(n),n=jx(n),n=Hx(n),n=Ux(n),t.svgWhiteBg!==!1&&(n=Gx(n)),n}const nC={id:"wechat",name:"微信公众号",status:"stable",patch:(e,t)=>tC(e,t??{}),inspect:eC};function oC(e,t={}){return e}const sC={id:"zhihu",name:"知乎专栏",status:"placeholder",patch:(e,t)=>oC(e,t??{})};function rC(e,t={}){return e}const iC={id:"xhs",name:"小红书",status:"placeholder",patch:(e,t)=>rC(e,t??{})},sp=[nC,sC,iC],aC=Object.fromEntries(sp.map(e=>[e.id,e])),rp="wechat";function lC(e){const t=aC[e];return t||gf("PLATFORM_UNSUPPORTED",`Unknown platform id: "${e}"`,{hint:`Known: ${sp.map(n=>n.id).join(", ")}`}),t}const cC=/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;function uC(e){const t=cC.exec(e);if(!t)return{config:{},body:e,issues:[]};const n=t[1],o=e.slice(t[0].length),{tree:s,issues:r}=dC(n),i={},a=s.variants;if(a!==void 0)if(typeof a=="string")r.push({path:"variants",message:"variants 应为对象（嵌套 key: id 形式），不是标量值",severity:"error"});else{const c={};for(const[u,d]of Object.entries(a)){if(typeof d!="string"){r.push({path:`variants.${u}`,message:"值应为 variant id 字符串",severity:"error"});continue}if(!(u in Ut)){r.push({path:`variants.${u}`,message:`未知 variant slot "${u}"——合法值：${Object.keys(Ut).join(" / ")}`,severity:"warning"});continue}const f=Ut[u];if(!f.includes(d)){r.push({path:`variants.${u}`,message:`非法 variant id "${d}"——${u} 合法值：${f.join(" / ")}`,severity:"warning"});continue}c[u]=d}Object.keys(c).length>0&&(i.variants=c)}const l=s.theme;l!==void 0&&(typeof l!="string"?r.push({path:"theme",message:"theme 应为字符串（主题 id）",severity:"error"}):i.theme=l);for(const c of Object.keys(s))c!=="variants"&&c!=="theme"&&r.push({path:c,message:`未识别 frontmatter 字段 "${c}"——本契约目前只消费 variants / theme`,severity:"warning"});return{config:i,body:o,issues:r}}const Pc=/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/;function Bc(e){const t=e.trim();return t.length>=2&&(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'"))?t.slice(1,-1):t}function dC(e){const t={},n=[],o=e.split(/\r?\n/);let s=0;for(;s<o.length;){const r=o[s];if(!r.trim()||r.trim().startsWith("#")){s++;continue}if((r.match(/^(\s*)/)?.[1].length??0)>0){n.push({path:`line:${s+1}`,message:"frontmatter 顶层不应缩进；嵌套对象用 `key:` 头 + 下一行缩进 2 空格",severity:"warning"}),s++;continue}const a=Pc.exec(r);if(!a){n.push({path:`line:${s+1}`,message:`无法解析（期望 \`key: value\` 形式）：${r}`,severity:"warning"}),s++;continue}const l=a[1],c=a[2];if(c.trim()===""){const u={};for(s++;s<o.length;){const d=o[s];if(!d.trim()){s++;continue}if((d.match(/^(\s*)/)?.[1].length??0)===0)break;const m=Pc.exec(d.trim());if(!m){n.push({path:`${l}.line:${s+1}`,message:`无法解析嵌套行：${d}`,severity:"warning"}),s++;continue}u[m[1]]=Bc(m[2]),s++}t[l]=u}else t[l]=Bc(c),s++}return{tree:t,issues:n}}const fC=12,Fc=$a(fC);function pC(e){return e.length===0?"":[...e].sort((t,n)=>t.id.localeCompare(n.id)).map(t=>`${t.id}@${t.updatedAt}`).join("|")}function hC(e,t){const n=`${e.id}:${pC(t)}`,o=Fc.get(n);if(o)return o;const s=sk({theme:e,customVariants:t});return s.renderer.rules.fence=(r,i)=>{const a=r[i],l=a.info?a.info.trim():"",{title:c,attrs:u}=ts(l),d=c.split(/\s+/)[0]??"",{html:f,language:m}=Tx(a.content,d),v=e.variants.codeBlock,g=u.variant,h=g&&g in _s?g:v;return(_s[h]??_s.bare).render(e,{language:m,codeInnerHtml:f})+`
`},Fc.set(n,s),s}const mC=16,jc=$a(mC);function Hc(e){let t=5381;for(let n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n)|0;return t.toString(36)}function gC(e){return!e||e.length===0?"":[...e].sort((t,n)=>t.id.localeCompare(n.id)).map(t=>`${t.id}@${t.updatedAt}`).join("|")}function bC(e){const t=e.platform??rp,n=e.wxPatch?Hc(JSON.stringify(e.wxPatch)):"";return[e.theme.id,Hc(e.md),t,n,gC(e.userVariants)].join(":")}function ip(e){const t=bC(e),n=jc.get(t);if(n)return n;const{md:o,theme:s}=e,{config:r,body:i,issues:a}=uC(o),l=e.userVariants??[],c=l.filter(N=>N.level==="custom"),u=hC(s,c),d={};r.variants&&(d.__wxPageVariants=r.variants),l.length>0&&(d.__wxUserVariants=new Map(l.map(N=>[N.id,N])));const f=u.render(i,d),m=Ek(s),v=[`<section class="${Qe}">`,`<style>${m}
${Ax}</style>`,f,"</section>"].join(`
`),g=Ix(v),h=lC(e.platform??rp),w=h.inspect?h.inspect(g):{entries:[],total:0},A=h.patch(g,e.wxPatch),M=yC(i),R=Math.max(1,Math.ceil(M/300)),B={html:A,wordCount:M,readingTime:R,patchLog:w,pageConfig:r,frontmatterIssues:a};return jc.set(t,B),B}function yC(e){const t=(e.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g)??[]).length,n=e.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g," ").split(/\s+/).filter(Boolean).length;return t+n}function vC(e){return{id:e.id,name:e.name,description:e.description,audience:e.audience,palette:e.palette,variants:e.variants,signatureContainers:e.signatureContainers??[]}}function wC(){return qp.map(vC)}function Vc(e){const t=Ja[e];return t||gf("RESOURCE_NOT_FOUND",`Unknown persona id: "${e}"`,{path:"persona.id",hint:`Known ids: ${Object.keys(Ja).join(", ")}`}),t}Object.freeze({hexPattern:Jp.source,minFontSize:Yp,minStrokeWidth:Gp,allowedFontFamilies:Object.freeze([...Qp])});function Uc(e){return structuredClone(e)}function SC(e){const t={current:e},n=Uc(Vc(e)),o=Kt(n);let s=JSON.stringify(n);const r=ne(()=>Zp(o)),i=ne(()=>Xp(o)),a=ne(()=>JSON.stringify(o)!==s),l=wC().map(v=>({id:v.id,name:v.name})),c=ne(()=>t.current);function u(v){if(!l.some(h=>h.id===v))return;const g=Uc(Vc(v));Object.keys(o).forEach(h=>delete o[h]),Object.assign(o,g),t.current=v,s=JSON.stringify(g)}function d(){u(t.current)}function f(){return JSON.stringify(o,null,2)}function m(v){try{const g=JSON.parse(v);return!g||typeof g!="object"?!1:(Object.keys(o).forEach(h=>delete o[h]),Object.assign(o,g),!0)}catch{return!1}}return{baseId:c,draft:o,validation:r,previewTheme:i,dirty:a,baseOptions:l,setBase:u,reset:d,exportJson:f,importJson:m}}function ap(e){const t=e.min??300,n=e.maxViewportRatio??.6,o=te(s());function s(){const l=$t(e.storageKey);if(l===null||l===""||l==="null")return null;const c=Number(l);return!Number.isFinite(c)||c<t?null:c}const r=te(typeof window<"u"?window.innerWidth:1280);function i(){r.value=window.innerWidth}mt(()=>window.addEventListener("resize",i)),Je(()=>window.removeEventListener("resize",i));const a=ne(()=>Math.max(t,Math.floor(r.value*n)));return je(o,l=>{wt(e.storageKey,l===null?"":String(l))}),je([r,o],()=>{o.value!==null&&o.value>a.value&&(o.value=a.value)}),{width:o,maxWidth:a,defaultWidth:e.defaultWidth,minWidth:t}}const lp="wechat-typeset:theme:last",Gr="wechat-typeset:editor-width",_C="wechat-typeset:component-palette-width",kC="wechat-typeset:persona-studio-width",xC=["disabled"],CC={class:"body"},$C={class:"section"},EC={class:"row"},TC=["value"],AC=["value"],IC={class:"row"},RC=["value"],MC={key:0,class:"hint hint-warn"},OC={class:"row"},NC={class:"row row-text"},LC={class:"section"},DC={class:"row"},PC=["value"],BC={class:"row"},FC=["value"],jC={class:"row"},HC=["value"],VC={class:"row"},UC=["value"],zC={class:"row"},WC=["value"],KC={class:"row"},qC=["value"],GC={class:"section"},YC={class:"row"},JC=["value"],QC={class:"row"},XC=["value"],ZC={class:"row"},e$=["value"],t$={class:"row"},n$=["value"],o$={class:"section"},s$={class:"row"},r$=["value"],i$={class:"row"},a$=["value"],l$={class:"row"},c$=["value"],u$={class:"section"},d$={class:"row-label"},f$=["value","onChange"],p$=["value"],h$={class:"section"},m$={class:"row"},g$=["value"],b$=["value"],y$={key:0,class:"section section-warn",open:""},v$={class:"section-title"},w$={class:"issues"},S$={class:"actions"},_$=["disabled"],k$={key:0,class:"action-status",role:"status","aria-live":"polite","aria-atomic":"true"},x$=400,C$=Me({__name:"PersonaStudio",props:{initialBaseId:{}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,s=SC(n.initialBaseId),r=s.draft,{width:i,maxWidth:a,defaultWidth:l,minWidth:c}=ap({storageKey:kC,defaultWidth:x$,min:360,maxViewportRatio:.55}),u=ne(()=>i.value===null?void 0:{width:i.value+"px"}),d=Kt({status:""});let f=null;function m(W,O=2e3){d.status=W,f!=null&&window.clearTimeout(f),f=window.setTimeout(()=>{d.status="",f=null},O)}const v=[["admonition","admonition (tip/warning/info/danger)"],["quote","quote-card"],["compare","compare 对比块"],["steps","steps 步骤"],["divider","divider 分隔"],["sectionTitle","section-title 章节"],["codeBlock","code block 代码块"],["note","note 第五态"]],g=["geometric","soft","serif","playful"],h=ne(()=>s.validation.value.errors),w=ne(()=>s.validation.value.warnings),A=ne(()=>s.validation.value.ok);function M(){if(!A.value){m("校验未通过，先修正再应用",2500);return}Tt.value=s.previewTheme.value,m("已应用为当前预览主题")}function R(){const W=s.exportJson(),O=`persona-${r.id||"custom"}.spec.json`;cs(O,W,"application/json"),m("已下载 spec.json")}function B(){s.dirty.value&&!window.confirm("放弃当前所有改动？")||(s.reset(),m("已恢复 base persona 默认"))}function N(W){const O=W.target.value;if(s.dirty.value&&!window.confirm("切换 base 将丢失当前改动，继续？")){W.target.value=s.baseId.value;return}s.setBase(O)}function k(W,O,E){const F=Number(E.target.value);Number.isFinite(F)&&(W[O]=F)}function y(W,O){Ut[W].includes(O)&&(r.variants[W]=O)}function b(W){return g.includes(W)?W:void 0}function _(W){const O=b(W.target.value);O&&(r.svgVariant=O)}const x=new Set(s.baseOptions.map(W=>W.id));function $(W){const O=W.target.value.trim().toLowerCase().replace(/[^a-z0-9-]/g,"-");r.id=O}const P=ne(()=>x.has(r.id)&&r.id!==s.baseId.value);return(W,O)=>(T(),L("aside",{class:"studio","aria-label":"主题编辑器",style:Ge(u.value)},[$e(mf,{width:I(i),min:I(c),max:I(a),"default-width":I(l),"onUpdate:width":O[0]||(O[0]=E=>i.value=E)},null,8,["width","min","max","default-width"]),$e(bo,{title:"主题编辑器",size:"sm",onClose:O[1]||(O[1]=E=>o("close"))},{actions:kt(()=>[p("button",{class:"head-action",disabled:!I(s).dirty.value,onClick:B}," 还原 ",8,xC)]),_:1}),p("div",CC,[p("section",$C,[O[21]||(O[21]=p("header",{class:"section-title"},"基底主题",-1)),p("label",EC,[O[17]||(O[17]=p("span",{class:"row-label"},"Base persona",-1)),p("select",{value:I(s).baseId.value,onChange:N},[(T(!0),L(ae,null,Te(I(s).baseOptions,E=>(T(),L("option",{key:E.id,value:E.id},z(E.name)+" ("+z(E.id)+") ",9,AC))),128))],40,TC)]),p("label",IC,[O[18]||(O[18]=p("span",{class:"row-label"},"新主题 id",-1)),p("input",{value:I(r).id,placeholder:"my-theme",onInput:$},null,40,RC)]),P.value?(T(),L("div",MC,' 该 id 与内置主题冲突；用于"另存为"前请改名。 ')):ue("",!0),p("label",OC,[O[19]||(O[19]=p("span",{class:"row-label"},"中文名",-1)),et(p("input",{"onUpdate:modelValue":O[2]||(O[2]=E=>I(r).name=E),placeholder:"我的主题"},null,512),[[vt,I(r).name]])]),p("label",NC,[O[20]||(O[20]=p("span",{class:"row-label"},"一句描述",-1)),et(p("textarea",{"onUpdate:modelValue":O[3]||(O[3]=E=>I(r).description=E),rows:"2"},null,512),[[vt,I(r).description]])])]),$e(zS,{palette:I(r).palette,status:I(r).status},null,8,["palette","status"]),p("details",LC,[O[28]||(O[28]=p("summary",{class:"section-title"},"字号 / 字距 · typography",-1)),p("label",DC,[O[22]||(O[22]=p("span",{class:"row-label"},"baseSize (px, ≥14)",-1)),p("input",{type:"number",min:"14",max:"22",value:I(r).typography.baseSize,onInput:O[4]||(O[4]=E=>k(I(r).typography,"baseSize",E))},null,40,PC)]),p("label",BC,[O[23]||(O[23]=p("span",{class:"row-label"},"lineHeight",-1)),p("input",{type:"number",min:"1",max:"2.5",step:"0.05",value:I(r).typography.lineHeight,onInput:O[5]||(O[5]=E=>k(I(r).typography,"lineHeight",E))},null,40,FC)]),p("label",jC,[O[24]||(O[24]=p("span",{class:"row-label"},"h1Size",-1)),p("input",{type:"number",min:"14",max:"48",value:I(r).typography.h1Size,onInput:O[6]||(O[6]=E=>k(I(r).typography,"h1Size",E))},null,40,HC)]),p("label",VC,[O[25]||(O[25]=p("span",{class:"row-label"},"h2Size",-1)),p("input",{type:"number",min:"14",max:"36",value:I(r).typography.h2Size,onInput:O[7]||(O[7]=E=>k(I(r).typography,"h2Size",E))},null,40,UC)]),p("label",zC,[O[26]||(O[26]=p("span",{class:"row-label"},"h3Size",-1)),p("input",{type:"number",min:"14",max:"28",value:I(r).typography.h3Size,onInput:O[8]||(O[8]=E=>k(I(r).typography,"h3Size",E))},null,40,WC)]),p("label",KC,[O[27]||(O[27]=p("span",{class:"row-label"},"letterSpacing (px)",-1)),p("input",{type:"number",min:"-2",max:"4",step:"0.1",value:I(r).typography.letterSpacing,onInput:O[9]||(O[9]=E=>k(I(r).typography,"letterSpacing",E))},null,40,qC)])]),p("details",GC,[O[33]||(O[33]=p("summary",{class:"section-title"},"间距 · spacing (px)",-1)),p("label",YC,[O[29]||(O[29]=p("span",{class:"row-label"},"paragraph",-1)),p("input",{type:"number",min:"0",max:"48",value:I(r).spacing.paragraph,onInput:O[10]||(O[10]=E=>k(I(r).spacing,"paragraph",E))},null,40,JC)]),p("label",QC,[O[30]||(O[30]=p("span",{class:"row-label"},"section",-1)),p("input",{type:"number",min:"0",max:"72",value:I(r).spacing.section,onInput:O[11]||(O[11]=E=>k(I(r).spacing,"section",E))},null,40,XC)]),p("label",ZC,[O[31]||(O[31]=p("span",{class:"row-label"},"listItem",-1)),p("input",{type:"number",min:"0",max:"24",value:I(r).spacing.listItem,onInput:O[12]||(O[12]=E=>k(I(r).spacing,"listItem",E))},null,40,e$)]),p("label",t$,[O[32]||(O[32]=p("span",{class:"row-label"},"containerPadding",-1)),p("input",{type:"number",min:"0",max:"48",value:I(r).spacing.containerPadding,onInput:O[13]||(O[13]=E=>k(I(r).spacing,"containerPadding",E))},null,40,n$)])]),p("details",o$,[O[37]||(O[37]=p("summary",{class:"section-title"},"圆角 · radius (px)",-1)),p("label",s$,[O[34]||(O[34]=p("span",{class:"row-label"},"sm",-1)),p("input",{type:"number",min:"0",max:"24",value:I(r).radius.sm,onInput:O[14]||(O[14]=E=>k(I(r).radius,"sm",E))},null,40,r$)]),p("label",i$,[O[35]||(O[35]=p("span",{class:"row-label"},"md",-1)),p("input",{type:"number",min:"0",max:"32",value:I(r).radius.md,onInput:O[15]||(O[15]=E=>k(I(r).radius,"md",E))},null,40,a$)]),p("label",l$,[O[36]||(O[36]=p("span",{class:"row-label"},"lg",-1)),p("input",{type:"number",min:"0",max:"48",value:I(r).radius.lg,onInput:O[16]||(O[16]=E=>k(I(r).radius,"lg",E))},null,40,c$)])]),p("details",u$,[O[38]||(O[38]=p("summary",{class:"section-title"},"骨架变体 · variants",-1)),(T(),L(ae,null,Te(v,([E,F])=>p("label",{key:E,class:"row"},[p("span",d$,z(F),1),p("select",{value:I(r).variants[E],onChange:j=>y(E,j.target.value)},[(T(!0),L(ae,null,Te(I(Ut)[E],j=>(T(),L("option",{key:j,value:j},z(j),9,p$))),128))],40,f$)])),64))]),p("details",h$,[O[40]||(O[40]=p("summary",{class:"section-title"},"SVG 字形 · svgVariant",-1)),p("label",m$,[O[39]||(O[39]=p("span",{class:"row-label"},"几何 / 柔和 / 衬线 / 活泼",-1)),p("select",{value:I(r).svgVariant??"geometric",onChange:_},[(T(),L(ae,null,Te(g,E=>p("option",{key:E,value:E},z(E),9,b$)),64))],40,g$)]),O[41]||(O[41]=p("p",{class:"hint"}," 仅作为 applyPalette 用户自定义配色路径的 fallback；spec-first 主路径不消费此字段。 ",-1))]),h.value.length||w.value.length?(T(),L("details",y$,[p("summary",v$," 校验 · "+z(h.value.length)+" error / "+z(w.value.length)+" warning ",1),p("ul",w$,[(T(!0),L(ae,null,Te(h.value,(E,F)=>(T(),L("li",{key:`e${F}`,class:"issue issue-err"},[p("code",null,z(E.path),1),De(" "+z(E.message),1)]))),128)),(T(!0),L(ae,null,Te(w.value,(E,F)=>(T(),L("li",{key:`w${F}`,class:"issue issue-warn"},[p("code",null,z(E.path),1),De(" "+z(E.message),1)]))),128))])])):ue("",!0)]),p("footer",S$,[p("button",{class:"action-btn",disabled:!A.value,onClick:M}," 应用为当前主题 ",8,_$),p("button",{class:"action-btn action-secondary",onClick:R}," 下载 spec.json "),d.status?(T(),L("span",k$,z(d.status),1)):ue("",!0)])],4))}}),$$=Oe(C$,[["__scopeId","data-v-bec87e8e"]]);function E$(){return ho('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const T$={meta:{id:"intro",kind:"none",name:"开场导语",description:"文章开头的引子卡，独立视觉"},thumbnail:E$,snippets:[{presetId:"free-intro",name:"开场导语",description:"文章开头的引子卡，独立视觉",markdown:`::: intro
一段用来承载"本文将讨论什么"的导语。
:::
`}]};function A$(){return ho('<rect x="6" y="22" width="63" height="32" rx="4" fill="#f7f8fa"/><circle cx="16" cy="38" r="6" fill="#c0c6cf"/><rect x="28" y="32" width="24" height="3" fill="#1f2328"/><rect x="28" y="40" width="34" height="2" fill="#c0c6cf"/>')}const I$={meta:{id:"author",kind:"none",name:"作者栏",description:"姓名 + 角色 + 一句话"},thumbnail:A$,snippets:[{presetId:"free-author",name:"作者栏",description:"姓名 + 角色 + 一句话",markdown:`::: author 张三 role=主笔
一段作者自述或背景。
:::
`}]};function R$(){return ho('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const M$={meta:{id:"cover",kind:"none",name:"封面卡",description:"标题 + 一张图 + 一行描述"},thumbnail:R$,snippets:[{presetId:"free-cover",name:"封面卡",description:"标题 + 一张图 + 一行描述",markdown:`::: cover 本期封面
![封面图](https://placehold.co/1200x630)

_一句描述_
:::
`}]};function O$(){return ho('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const N$={meta:{id:"highlight",kind:"none",name:"重点高亮块",description:"整段荧光底色"},thumbnail:O$,snippets:[{presetId:"free-highlight",name:"重点高亮块",description:"整段荧光底色",markdown:`::: highlight
这一段将被整段高亮，用来压重点。
:::
`}]};function L$(){return ho('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const D$={meta:{id:"voice-card",kind:"none",name:"音频占位",description:"粘贴后微信识别为 mpvoice 真节点"},thumbnail:L$,snippets:[{presetId:"free-voice-card",name:"音频占位",description:"粘贴后微信识别为 mpvoice 真节点",markdown:`::: voice-card 本期播客
粘贴后在公众号后台从素材库重新插入。
:::
`}]};function P$(){return ho('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const B$={meta:{id:"video-card",kind:"none",name:"腾讯视频",description:"直接渲染 v.qq.com iframe"},thumbnail:P$,snippets:[{presetId:"free-video-card-qq",name:"腾讯视频",description:"直接渲染 v.qq.com iframe",markdown:`::: video-card qqvid=v326875u4ek
视频标题
:::
`}]},F$=[T$,I$,M$,N$,D$,B$],j$=[...nh,...F$],H$=["accent-bar","pill-tag","ticket-notch","card-shadow","minimal-underline","terminal","dashed-border","top-bottom-rule","manpage-log","sidenote-latex","marginalia","ledger-cell","bubble-organic","magazine-pull","report-section","news-row","news-underline","mook-tag","slab-corner"],V$=["classic","magazine-dropcap","column-rule","frame-brackets"],U$=["column-card","stacked-row","ledger","data-card"],z$=["number-circle","ribbon-chain","timeline-dot"],W$=["wave","dots","flower","rule","glyph"],K$=["bordered","cornered"],q$=["bare","header-bar"],G$=["minimal-callout","box-callout","side-bar"],Y$=["plain"],J$=["lined","inline-flow"],Q$=["card-list","academic-refs"],X$=["bare","follow-card","qr-stack"],Z$=["button-led","triptych-actions"],eE=["giant-mark","centered-rule","stamp-quote","margin-pull"],tE=["danger-bar","mono-disclaimer","ai-notice","stamped-banner"],nE=["rule-grid","zebra-rows","key-value","price-tier"],oE=["duo","triptych","nine-grid","ribbon-strip"],sE=["qa-rows","chat-bubbles","name-prefix","interview-column"],rE=["numbered-faq","hanging-qa","seal-stamp","query-annotation","sample-query","field-card","circle-square","typed-block"],iE=["intro","author","cover","highlight","voice-card","video-card"],aE={admonition:H$,quote:V$,compare:U$,steps:z$,divider:W$,sectionTitle:K$,codeBlock:q$,note:G$,highlight:Y$,footnotes:J$,recommend:Q$,qrcode:X$,footerCTA:Z$,pullQuote:eE,announcement:tE,tableCard:nE,gallery:oE,dialogue:sE,qaBlock:rE,none:iE};function lE(e,t){const n=e.thumbnail?e.thumbnail(t.thumbArgs):"",o=th(e.meta),s=t.designedFor?[...t.designedFor]:o.length>0?[...o]:void 0;return{source:"builtin",id:t.presetId,name:t.name,description:t.description,kind:e.meta.kind,variantId:e.meta.id,designedFor:s,markdownSnippet:t.markdown,thumbnailSvg:n}}function cE(){const e=[],t=["admonition","quote","compare","steps","divider","sectionTitle","codeBlock","note","highlight","footnotes","recommend","qrcode","footerCTA","pullQuote","announcement","tableCard","gallery","dialogue","qaBlock","none"];for(const n of t)for(const o of eh(j$,n,aE[n]))for(const s of o.snippets)e.push(lE(o,s));return e}const uE=cE(),dE=uE,Ao=[{id:"template",label:"主题模板",subs:[{key:"tpl-current",label:"当前主题精选",source:{type:"theme-template"}}]},{id:"callout",label:"提示与强调",subs:[{key:"k-admonition",label:"提示",source:{type:"kind",kind:"admonition"}},{key:"k-note",label:"补注",source:{type:"kind",kind:"note"}},{key:"k-quote",label:"引用",source:{type:"kind",kind:"quote"}},{key:"k-pullQuote",label:"引文",source:{type:"kind",kind:"pullQuote"}},{key:"k-announcement",label:"公告",source:{type:"kind",kind:"announcement"}},{key:"k-highlight",label:"高亮",source:{type:"kind",kind:"highlight"}}]},{id:"structure",label:"结构",subs:[{key:"k-sectionTitle",label:"章节",source:{type:"kind",kind:"sectionTitle"}},{key:"k-divider",label:"分隔",source:{type:"kind",kind:"divider"}},{key:"k-steps",label:"步骤",source:{type:"kind",kind:"steps"}},{key:"k-compare",label:"对比",source:{type:"kind",kind:"compare"}},{key:"k-codeBlock",label:"代码",source:{type:"kind",kind:"codeBlock"}}]},{id:"data-dialog",label:"数据与对话",subs:[{key:"k-tableCard",label:"表格",source:{type:"kind",kind:"tableCard"}},{key:"k-gallery",label:"图集",source:{type:"kind",kind:"gallery"}},{key:"k-dialogue",label:"对话",source:{type:"kind",kind:"dialogue"}},{key:"k-qaBlock",label:"问答",source:{type:"kind",kind:"qaBlock"}}]},{id:"interaction",label:"互动",subs:[{key:"k-recommend",label:"推荐",source:{type:"kind",kind:"recommend"}},{key:"k-qrcode",label:"二维码",source:{type:"kind",kind:"qrcode"}},{key:"k-footerCTA",label:"文末 CTA",source:{type:"kind",kind:"footerCTA"}},{key:"k-footnotes",label:"脚注",source:{type:"kind",kind:"footnotes"}}]},{id:"frame",label:"页饰",subs:[{key:"f-intro",label:"开场",source:{type:"kind",kind:"none",variantIds:["intro"]}},{key:"f-author",label:"作者",source:{type:"kind",kind:"none",variantIds:["author"]}},{key:"f-cover",label:"封面",source:{type:"kind",kind:"none",variantIds:["cover"]}},{key:"f-voice",label:"音频卡",source:{type:"kind",kind:"none",variantIds:["voice-card"]}},{key:"f-video",label:"视频卡",source:{type:"kind",kind:"none",variantIds:["video-card"]}},{key:"f-highlight",label:"重点高亮",source:{type:"kind",kind:"none",variantIds:["highlight"]}}]},{id:"mine",label:"我的",subs:[{key:"m-user",label:"我的组件",source:{type:"user"}},{key:"m-uv",label:"我的样式",source:{type:"uv"}}]}];function fE(e){const t=e.templates??{};return[{id:"cover",name:"封面卡",md:t.cover,hint:"文首封面"},{id:"authorBar",name:"作者栏",md:t.authorBar,hint:"作者+日期"},{id:"tip",name:"小贴士",md:t.tip,hint:"tip 容器"},{id:"compare",name:"对比两列",md:t.compare,hint:"左右两栏"},{id:"steps",name:"步骤流程",md:t.steps,hint:"分步推进"},{id:"footerCTA",name:"文末引导",md:t.footerCTA,hint:"关注/收藏"},{id:"recommend",name:"推荐阅读",md:t.recommend,hint:"文末链接"}].filter(o=>!!o.md).map(o=>({source:"builtin",id:`tpl-${e.id}-${o.id}`,name:o.name,description:o.hint,kind:"none",markdownSnippet:o.md,thumbnailSvg:pE(o.id,e)}))}function pE(e,t){const n=t.tokens.colors,o=e==="compare"||e==="steps"?n.secondary:n.primary,s=e.slice(0,1).toUpperCase();return`<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="73" height="73" rx="6" fill="${n.bg}" stroke="${n.border}" stroke-width="1"/><rect x="10" y="14" width="55" height="4" rx="2" fill="${o}"/><rect x="10" y="24" width="42" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.6"/><rect x="10" y="31" width="50" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.4"/><rect x="10" y="38" width="38" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.4"/><text x="58" y="62" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="${o}" opacity="0.7">${s}</text></svg>`}function hE(e){const t=e.trim().charAt(0)||"组";return`<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="75" height="75" rx="6" fill="#eef1f6"/><text x="37.5" y="48" text-anchor="middle" font-size="32" font-weight="700" fill="#6a737d">${oh(t)}</text></svg>`}const cp="wechat-typeset:user-components",mE=()=>ua("uc");function gE(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.name=="string"&&typeof t.markdownSnippet=="string"&&typeof t.thumbnailSvg=="string"}function Co(){const e=la(cp,[]);return Array.isArray(e)?e.filter(gE).map(t=>({...t,source:"user"})):[]}function pr(e){ca(cp,e)}function bE(){return[...Co()].sort((e,t)=>t.createdAt-e.createdAt)}function up(e){const t=Co(),n={source:"user",id:mE(),name:e.name.trim()||"未命名组件",description:e.description?.trim()??"",kind:e.kind??"none",variantId:e.variantId,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg??hE(e.name),sourceMarkdown:e.sourceMarkdown,linkedUserVariantId:e.linkedUserVariantId,createdAt:Date.now()};return t.unshift(n),pr(t),n}function yE(e){const t=Co().filter(n=>n.id!==e);pr(t)}function vE(e,t){const n=Co(),o=n.findIndex(r=>r.id===e);if(o===-1)return;const s=n[o];return n[o]={...s,name:t.name??s.name,description:t.description??s.description,markdownSnippet:t.markdownSnippet??s.markdownSnippet,thumbnailSvg:t.thumbnailSvg??s.thumbnailSvg,linkedUserVariantId:t.linkedUserVariantId===void 0?s.linkedUserVariantId:t.linkedUserVariantId??void 0},pr(n),n[o]}function wE(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.name=="string"&&typeof t.markdownSnippet=="string"&&typeof t.thumbnailSvg=="string"}function SE(){return JSON.stringify({version:1,components:Co()},null,2)}function _E(e){let t;try{t=JSON.parse(e)}catch{return 0}const n=t&&typeof t=="object"&&"components"in t?t.components:t;if(!Array.isArray(n))return 0;const o=Co();let s=0;for(const r of n)wE(r)&&(o.some(i=>i.id===r.id)||(o.push(r),s+=1));return pr(o),s}const kE=/^(:::+)\s+(\S+)(.*)$/,xE=/^(`{3,})(.*)$/;function Ma(e){const t=e.split(`
`),n=[];let o=!1;for(let l=0;l<t.length;l++){const c=t[l],u=l+1,d=c.match(xE);if(d){if(o){o=!1;continue}o=!0;const A=d[2].trim();if(A){const{attrs:M}=ts(A);M.variant&&!(M.variant in _s)&&n.push({kind:"unknown-variant",container:"code",variantKind:"codeBlock",variantId:M.variant,line:u})}continue}if(o)continue;const f=c.match(kE);if(!f)continue;const m=f[2],v=f[3],g=Ys(m);if(!g){n.push({kind:"unknown-fence",name:m,line:u});continue}if(!g.variantKind||!v)continue;const{attrs:h}=ts(v.trim());if(!h.variant)continue;Ut[g.variantKind].includes(h.variant)||n.push({kind:"unknown-variant",container:m,variantKind:g.variantKind,variantId:h.variant,line:u})}const s=CE(n.filter(l=>l.kind==="unknown-fence").map(l=>l.name)),r=n.filter(l=>l.kind==="unknown-variant"),i=new Set,a=[];for(const l of r){const c=`${l.container}:${l.variantKind}:${l.variantId}`;i.has(c)||(i.add(c),a.push({container:l.container,variantKind:l.variantKind,variantId:l.variantId}))}return{ok:n.length===0,unknownFences:s,unknownVariants:a,issues:n}}function CE(e){return[...new Set(e)]}const dp="wechat-typeset:user-variants",$E=()=>ua("uv"),EE=new Set(["tokens","patch","custom"]);function TE(e){if(!e||typeof e!="object")return!1;const t=e;if(typeof t.id!="string"||!t.id||typeof t.name!="string"||typeof t.createdAt!="number"||typeof t.updatedAt!="number"||typeof t.level!="string"||!EE.has(t.level))return!1;if(t.level==="custom")return!(t.base!==null||typeof t.template!="string"||!t.css||typeof t.css!="object"||typeof t.css.wrapperCSS!="string");const n=t.base;return!n||typeof n!="object"||typeof n.kind!="string"||typeof n.variantId!="string"?!1:t.level==="tokens"?!!t.tokens&&typeof t.tokens=="object":t.level==="patch"?!!t.cssPatch&&typeof t.cssPatch=="object":!1}function ds(){const e=la(dp,[]);return Array.isArray(e)?e.filter(TE):[]}function Oa(e){return ca(dp,e)}function V5(){return[...ds()].sort((e,t)=>t.updatedAt-e.updatedAt)}function fp(e){return ds().find(t=>t.id===e)}function AE(e){const t=Date.now(),n={...e,id:$E(),createdAt:t,updatedAt:t},o=ds();return o.unshift(n),Oa(o),n}function Yr(e,t){const n=ds(),o=n.findIndex(i=>i.id===e);if(o===-1)return;const s=n[o],r=IE(s,t);return n[o]=r,Oa(n),r}function IE(e,t){const n={name:t.name??e.name,description:t.description??e.description,updatedAt:Date.now()};return e.level==="tokens"?{...e,...n,tokens:t.tokens??e.tokens}:e.level==="patch"?{...e,...n,cssPatch:t.cssPatch??e.cssPatch}:{...e,...n,template:t.template??e.template,css:t.css?{wrapperCSS:t.css.wrapperCSS??e.css.wrapperCSS,titleCSS:t.css.titleCSS??e.css.titleCSS,bodyCSS:t.css.bodyCSS??e.css.bodyCSS,svgSlot:t.css.svgSlot??e.css.svgSlot}:e.css}}function zc(e){const t=ds(),n=t.filter(o=>o.id!==e);return n.length===t.length?!1:(Oa(n),!0)}function Na(e){const t=Ma(e.markdownSnippet);return t.ok?{ok:!0,entry:up(e)}:{ok:!1,reason:"validation",result:t}}function RE(e,t){if(t.markdownSnippet!==void 0){const o=Ma(t.markdownSnippet);if(!o.ok)return{ok:!1,reason:"validation",result:o}}const n=vE(e,t);return n?{ok:!0,entry:n}:{ok:!1,reason:"not-found"}}function ME(){const e=te(0),t=()=>{e.value+=1};return{list:ne(()=>(e.value,bE())),create(n){const o=up(n);return t(),o},remove(n){yE(n),t()},refresh:t}}function OE(e){return new TextEncoder().encode(e)}function NE(e){return new TextDecoder().decode(e)}function LE(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function DE(e){const t=(4-e.length%4)%4,n=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat(t),o=atob(n),s=new Uint8Array(o.length);for(let r=0;r<o.length;r++)s[r]=o.charCodeAt(r);return s}function PE(e){return LE(OE(JSON.stringify(e)))}function BE(e,t){if(!t)return null;try{const n=NE(DE(t)),o=JSON.parse(n);return e.validate(o)}catch{return null}}function FE(e){return e.origin??(typeof location<"u"?location.origin:"")}function jE(e){return e.pathname??(typeof location<"u"?location.pathname:"/")}function pp(e,t,n={}){return`${FE(n)}${jE(n)}#${e.prefix}${PE(t)}`}function La(e,t){if(!t)return null;const n=t.startsWith("#")?t.slice(1):t;return n.startsWith(e.prefix)?BE(e,n.slice(e.prefix.length)):null}function Da(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Ai=1,HE="share-component=";function VE(e){return!Da(e)||typeof e.id!="string"||typeof e.name!="string"||typeof e.description!="string"||typeof e.kind!="string"||typeof e.markdownSnippet!="string"||typeof e.thumbnailSvg!="string"||e.variantId!==void 0&&typeof e.variantId!="string"?null:{id:e.id,name:e.name,description:e.description,kind:e.kind,variantId:typeof e.variantId=="string"?e.variantId:void 0,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg}}const Pa={prefix:HE,validate(e){if(!Da(e)||e.v!==Ai||e.kind!=="component")return null;const t=VE(e.component);return t?{v:Ai,kind:"component",component:t}:null}};function UE(e){return{v:Ai,kind:"component",component:{id:e.id,name:e.name,description:e.description,kind:e.kind,variantId:e.variantId,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg}}}function zE(e,t,n,o=12){const s=e.left-n.width-o,r=s>=o,i=r?s:e.right+o,a=r?"left":"right",l=e.top+e.height/2-n.height/2,c=t.height-n.height-o,u=Math.max(o,Math.min(l,c));return{left:i,top:u,side:a}}const WE={class:"grid"},KE=["title","onClick","onDblclick","onMouseenter"],qE=["innerHTML"],GE={class:"name"},YE=["title"],JE={key:1,class:"cell-actions"},QE=["title","onClick"],XE={class:"cell-preview-meta"},ZE={class:"cell-preview-frame"},Wc=320,Kc=280,e4=Me({__name:"ComponentGrid",props:{entries:{},theme:{},actions:{}},emits:["select","action"],setup(e,{emit:t}){const n=new Map(Qs.map(N=>[N.id,N.name]));function o(N){return n.get(N)??N}const s=Rs(()=>Hn(()=>import("./IsolatedPreview-BR1Qh7y8.js"),__vite__mapDeps([0,1,2,3,4,5]))),r=e,i=t;function a(N){i("select",N)}function l(N,k){r.actions?.includes("edit")&&(k.preventDefault(),i("action",{kind:"edit",entry:N}))}function c(N,k,y){y.stopPropagation(),i("action",{kind:N,entry:k})}function u(){return!!(r.actions&&r.actions.length>0)}function d(N){return N==="delete"?"删除":N==="edit"?"编辑":N==="share"?"复制分享链接":"复制一份到「我的」可编辑"}function f(N){if(N.source!=="builtin")return null;const k=N.designedFor;if(!k||k.length===0)return null;const y=r.theme?.id;if(y&&k.includes(y))return null;const b=k.map(o),_=b.length===1?b[0]:b.join(" / ");return{primary:b[0],tooltip:"本变体为「"+_+"」主题设计；当前主题下色彩会按当前 token 调和"}}const m=te(null),v=te(!1);let g=null,h=null;const w=ne(()=>{if(m.value)return{left:m.value.left+"px",top:m.value.top+"px",width:Wc+"px",height:Kc+"px"}});function A(){g!=null&&(window.clearTimeout(g),g=null),h!=null&&(window.clearTimeout(h),h=null)}function M(){return!(!r.theme||window.matchMedia("(pointer: coarse)").matches)}function R(N,k){if(!M())return;A();const y=k.currentTarget;y&&(g=window.setTimeout(()=>{g=null;const b=y.getBoundingClientRect(),_=zE(b,{height:window.innerHeight},{width:Wc,height:Kc});m.value={entry:N,left:_.left,top:_.top},v.value=!0},80))}function B(){M()&&(g!=null&&(window.clearTimeout(g),g=null),h!=null&&window.clearTimeout(h),h=window.setTimeout(()=>{h=null,m.value=null},150))}return Je(()=>{A()}),(N,k)=>(T(),L(ae,null,[p("div",WE,[(T(!0),L(ae,null,Te(e.entries,y=>(T(),L("button",{key:y.id,class:"cell",title:y.description,onClick:b=>a(y),onDblclick:b=>l(y,b),onMouseenter:b=>R(y,b),onMouseleave:B},[p("span",{class:"thumb",innerHTML:y.thumbnailSvg},null,8,qE),p("span",GE,z(y.name),1),f(y)?(T(),L("span",{key:0,class:"designed-for-chip",title:f(y).tooltip}," 为 "+z(f(y).primary)+" 设计 ",9,YE)):ue("",!0),u()?(T(),L("span",JE,[(T(!0),L(ae,null,Te(e.actions,b=>(T(),L("button",{key:b,type:"button",class:Ce(["cell-action",`cell-action--${b}`]),title:d(b),onClick:_=>c(b,y,_)},[b==="delete"?(T(),L(ae,{key:0},[De("×")],64)):b==="edit"?(T(),L(ae,{key:1},[De("✎")],64)):b==="share"?(T(),L(ae,{key:2},[De("↗")],64)):(T(),L(ae,{key:3},[De("+")],64))],10,QE))),128))])):ue("",!0)],40,KE))),128))]),v.value&&r.theme?(T(),He(zu,{key:0,to:"body"},[et(p("div",{class:"cell-preview-popover",style:Ge(w.value),role:"tooltip","aria-hidden":"true"},[p("div",XE,z(m.value?.entry.name)+" · "+z(r.theme.name),1),p("div",ZE,[m.value?(T(),He(I(s),{key:0,"placeholder-md":m.value.entry.markdownSnippet,theme:r.theme},null,8,["placeholder-md","theme"])):ue("",!0)])],4),[[bg,m.value]])])):ue("",!0)],64))}}),t4=Oe(e4,[["__scopeId","data-v-3471111f"]]),n4={class:"modal",role:"dialog","aria-label":"保存选区为组件"},o4={class:"modal-field"},s4=["onKeydown"],r4={key:0,class:"field-error"},i4={class:"modal-field"},a4={class:"preview-src"},l4={class:"mono"},c4=Me({__name:"SaveSelectionDialog",props:{open:{type:Boolean},sourceText:{},error:{}},emits:["cancel","confirm"],setup(e,{emit:t}){const n=e,o=t,s=te(""),r=te("");je(()=>n.open,l=>{l&&(s.value="",r.value="")});function i(){o("cancel")}function a(){o("confirm",{name:s.value.trim(),description:r.value.trim()})}return(l,c)=>e.open?(T(),L("div",{key:0,class:"modal-mask",onClick:ht(i,["self"])},[p("div",n4,[c[5]||(c[5]=p("h4",{class:"modal-title"},"保存选区为组件",-1)),p("label",o4,[c[2]||(c[2]=p("span",null,"名称",-1)),et(p("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>s.value=u),maxlength:"20",placeholder:"如：我的封面卡",class:Ce({invalid:!!e.error}),onKeydown:Nn(ht(a,["prevent"]),["enter"])},null,42,s4),[[vt,s.value]]),e.error?(T(),L("span",r4,z(e.error),1)):ue("",!0)]),p("label",i4,[c[3]||(c[3]=p("span",null,"描述（可选）",-1)),et(p("input",{"onUpdate:modelValue":c[1]||(c[1]=u=>r.value=u),maxlength:"30",placeholder:"一句话说明"},null,512),[[vt,r.value]])]),p("details",a4,[c[4]||(c[4]=p("summary",null,"选区预览",-1)),p("pre",l4,z(e.sourceText),1)]),p("div",{class:"modal-actions"},[p("button",{class:"btn btn-ghost",onClick:i},"取消"),p("button",{class:"btn btn-primary",onClick:a},"保存")])])])):ue("",!0)}}),u4=Oe(c4,[["__scopeId","data-v-7b1a0b09"]]);function U5(e,t){if(!t)return null;const n=["wrapperCSS","titleCSS","bodyCSS"];for(const o of n)if(e[o].includes(t))return o;return null}function hp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Uo(e,t,n){if(!t||!n||!e)return e;const o=new RegExp(`\\bvariant=${hp(t)}\\b`,"g");return e.replace(o,`variant=${n}`)}const Ii="uc-NEW";function mp(e,t,n){if(!n||!e||t===n)return e;const o=new RegExp(`(:{3,}\\s*)${hp(t)}\\b`,"g");return e.replace(o,`$1${n}`)}function gp(e){const t=e.userVariantCssPatch;return!!(t.wrapperCSS.trim()||t.titleCSS.trim()||t.bodyCSS.trim())}function bp(e){const t=e.userVariantCustom;return!!(t.template.trim()&&t.wrapperCSS.trim())}function qs(e){return e.kind!=="none"&&!!e.variantId}function Jr(e){return e.userVariantMode==="custom"?bp(e):qs(e)?e.userVariantMode==="tokens"?Object.keys(e.userVariantTokens).length>0:e.userVariantMode==="patch"?gp(e):!1:!1}function d4(e){if(e.userVariantMode==="custom"&&bp(e)){const n=e.userVariantCustom;return{level:"custom",name:`${e.name.trim()} · custom`,base:null,template:n.template,css:{wrapperCSS:n.wrapperCSS,...n.titleCSS.trim()?{titleCSS:n.titleCSS}:{},...n.bodyCSS.trim()?{bodyCSS:n.bodyCSS}:{},...n.svgSlot.trim()?{svgSlot:n.svgSlot}:{}}}}if(!qs(e))return null;const t={kind:e.kind,variantId:e.variantId};if(e.userVariantMode==="tokens"&&Object.keys(e.userVariantTokens).length>0)return{level:"tokens",name:`${e.name.trim()} · tokens`,base:t,tokens:{...e.userVariantTokens}};if(e.userVariantMode==="patch"&&gp(e)){const n=e.userVariantCssPatch;return{level:"patch",name:`${e.name.trim()} · patch`,base:t,cssPatch:{...n.wrapperCSS.trim()?{wrapperCSS:n.wrapperCSS}:{},...n.titleCSS.trim()?{titleCSS:n.titleCSS}:{},...n.bodyCSS.trim()?{bodyCSS:n.bodyCSS}:{}}}}return null}function f4(e,t){let n=t,o=e.markdownSnippet;if(n&&(qs(e)||e.userVariantMode==="custom")){const s=fp(n);if(s){const r=s.level!=="custom"&&e.userVariantMode!=="custom"&&(s.base.kind!==e.kind||s.base.variantId!==e.variantId),i=s.level!==e.userVariantMode;(r||i)&&(s.level!=="custom"&&e.userVariantMode!=="custom"&&(o=Uo(o,n,e.variantId)),zc(n),n=null)}}if(n&&Jr(e)){if(e.userVariantMode==="tokens")Yr(n,{tokens:{...e.userVariantTokens}});else if(e.userVariantMode==="patch"){const s=e.userVariantCssPatch;Yr(n,{cssPatch:{...s.wrapperCSS.trim()?{wrapperCSS:s.wrapperCSS}:{},...s.titleCSS.trim()?{titleCSS:s.titleCSS}:{},...s.bodyCSS.trim()?{bodyCSS:s.bodyCSS}:{}}})}else if(e.userVariantMode==="custom"){const s=e.userVariantCustom;Yr(n,{template:s.template,css:{wrapperCSS:s.wrapperCSS,titleCSS:s.titleCSS,bodyCSS:s.bodyCSS,svgSlot:s.svgSlot}})}return{markdown:e.markdownSnippet,linkAction:{kind:"noop"}}}if(n&&!Jr(e))return zc(n),{markdown:qs(e)?Uo(e.markdownSnippet,n,e.variantId):e.markdownSnippet,linkAction:{kind:"clear"}};if(!n&&Jr(e)){const s=d4(e);if(s){const r=AE(s);return{markdown:e.userVariantMode==="custom"?mp(o,Ii,`uc-${r.id}`):Uo(o,e.variantId,r.id),linkAction:{kind:"set",id:r.id}}}}return{markdown:o,linkAction:n===null&&o!==e.markdownSnippet?{kind:"clear"}:{kind:"noop"}}}const p4={admonition:e=>`::: tip 标题占位 variant=${e}
这里是正文示例段落。
:::
`,quote:e=>`::: quote-card 作者占位 variant=${e}
金句占位
:::
`,pullQuote:e=>`::: pull-quote variant=${e} 引文占位
副文占位
:::
`,compare:e=>`::: compare variant=${e}
::: pros
A
:::
::: cons
B
:::
:::
`,steps:e=>`::: steps variant=${e} 步骤示例
第一步
第二步
:::
`,divider:e=>`::: divider variant=${e}
:::
`,sectionTitle:e=>`::: section-title variant=${e}
章节标题占位
:::
`,note:e=>`::: note variant=${e}
备注占位
:::
`};function h4(e,t){if(e==="none")return"";const n=p4[e];return n?n(t||""):""}function m4(e){const{kind:t,variantId:n,prevKind:o,prevVariantId:s,current:r,lastInjected:i}=e;return r.trim()!==""&&r!==i?t===o&&n&&s&&n!==s?{nextSnippet:Uo(r,s,n),rewriteLastInjected:!1}:{nextSnippet:r,rewriteLastInjected:!1}:{nextSnippet:h4(t,n),rewriteLastInjected:!0}}const g4=Me({__name:"MarkdownInput",props:{modelValue:{},placeholder:{default:""}},emits:["update:modelValue"],setup(e,{emit:t}){const n=e,o=t,s=te(null);let r=null;return mt(()=>{if(!s.value)return;const i=[ou(),su(),ru.of([...iu,...au,lu]),cu(),uu,ft.lineWrapping,ft.updateListener.of(l=>{l.docChanged&&o("update:modelValue",l.state.doc.toString())}),ft.theme({"&":{height:"100%",fontSize:"13px"},".cm-scroller":{overflow:"auto"}})];n.placeholder&&i.push(Op(n.placeholder));const a=nu.create({doc:n.modelValue,extensions:i});r=new ft({state:a,parent:s.value})}),je(()=>n.modelValue,i=>{if(!r)return;const a=r.state.doc.toString();i!==a&&r.dispatch({changes:{from:0,to:a.length,insert:i}})}),Je(()=>{r?.destroy(),r=null}),(i,a)=>(T(),L("div",{class:"md-input",ref_key:"host",ref:s},null,512))}}),b4=Oe(g4,[["__scopeId","data-v-5a5fb4e9"]]),y4={class:"tokens-panel"},v4={key:0,class:"empty"},w4={key:1,class:"fields"},S4={class:"field-head"},_4={class:"label"},k4={class:"key mono"},x4={class:"field-body"},C4=["value","onInput"],$4=["placeholder","value","onInput"],E4=["placeholder","value","onInput"],T4=["onClick"],A4={key:0,class:"hint"},I4=Me({__name:"TokensPanel",props:{kind:{},variantId:{},tokens:{}},setup(e){const t=e,n=ne(()=>{if(!(t.kind==="none"||!t.variantId))return du(t.kind,t.variantId)}),o=ne(()=>{const l=n.value;return l?Object.entries(l).map(([c,u])=>({key:c,field:u,value:t.tokens[c]??""})):[]});function s(l,c){const u=c.trim();u===""?delete t.tokens[l]:t.tokens[l]=u}function r(l,c){s(l,c.target.value)}function i(l,c){s(l,c.target.value)}function a(l){delete t.tokens[l]}return(l,c)=>(T(),L("div",y4,[n.value?(T(),L("div",w4,[(T(!0),L(ae,null,Te(o.value,u=>(T(),L("div",{key:u.key,class:"field"},[p("label",S4,[p("span",_4,z(u.field.label),1),p("span",k4,z(u.key),1)]),p("div",x4,[u.field.type==="color"?(T(),L(ae,{key:0},[p("input",{type:"color",class:"color-input",value:u.value||"#000000",onInput:d=>r(u.key,d)},null,40,C4),p("input",{type:"text",class:"text-input",placeholder:u.field.default,value:u.value,onInput:d=>i(u.key,d)},null,40,$4)],64)):(T(),L("input",{key:1,type:"text",class:"text-input full",placeholder:u.field.default,value:u.value,onInput:d=>i(u.key,d)},null,40,E4)),u.value?(T(),L("button",{key:2,type:"button",class:"clear",title:"清除覆盖",onClick:d=>a(u.key)},"×",8,T4)):ue("",!0)]),u.field.hint?(T(),L("p",A4,z(u.field.hint),1)):ue("",!0)]))),128))])):(T(),L("div",v4,' 此 variant 未开放可调字段；如需自定义样式，可后续走"源码模式"（步骤 5）。 '))]))}}),R4=Oe(I4,[["__scopeId","data-v-d76b4b25"]]),M4={class:"editor"},O4={class:"row"},N4={class:"field"},L4={class:"row"},D4={class:"field"},P4={class:"row row-split"},B4={class:"field"},F4=["value"],j4={class:"field"},H4=["disabled"],V4=["value"],U4={class:"row md-row"},z4={key:0,class:"diagnostics"},W4={class:"diag-list"},K4={key:0},q4={class:"advanced"},G4={class:"slot-tree",role:"tree","aria-label":"样式编辑模式与槽位"},Y4=["aria-expanded","onClick"],J4={class:"caret","aria-hidden":"true"},Q4={key:0,class:"tree-slots",role:"group"},X4=["aria-selected","onClick"],Z4={key:0,class:"tree-dot","aria-hidden":"true"},eT=Me({__name:"ComponentEditor",props:{draft:{},theme:{},originalLinkedUvId:{},livePatchLog:{}},setup(e){const t=Rs(()=>Hn(()=>import("./SourceModePanel-Bv7iwn49.js"),__vite__mapDeps([6,7,1,8,0,2,3,4,5,9]))),n=Rs(()=>Hn(()=>import("./CustomModePanel-OPMHb5R7.js"),__vite__mapDeps([10,7,1,8,0,2,3,4,5,11]))),o=e,s=[{value:"none",label:"自由组件"},{value:"admonition",label:"提示 (admonition)"},{value:"quote",label:"引用 (quote)"},{value:"compare",label:"对比 (compare)"},{value:"steps",label:"步骤 (steps)"},{value:"divider",label:"分隔 (divider)"},{value:"sectionTitle",label:"章节标题 (section-title)"},{value:"note",label:"补注 (note)"},{value:"codeBlock",label:"代码块 (codeBlock)"}],r=ne(()=>{const R=o.draft.kind;return R==="none"?[]:[...Ut[R]]}),i=te("");je(()=>[o.draft.kind,o.draft.variantId],([R,B],[N,k])=>{if(R!==N)if(R==="none"){if(o.draft.variantId!==""){o.draft.variantId="";return}}else{const _=Ut[R];if(!_.includes(B)){o.draft.variantId=_[0]??"";return}}const{nextSnippet:y,rewriteLastInjected:b}=m4({kind:R,variantId:B,prevKind:N,prevVariantId:k,current:o.draft.markdownSnippet,lastInjected:i.value});y!==o.draft.markdownSnippet&&(o.draft.markdownSnippet=y),b&&(i.value=y)});const a=ne(()=>Ma(o.draft.markdownSnippet)),l=ne(()=>o.draft.kind==="none"||!o.draft.variantId?!1:!!du(o.draft.kind,o.draft.variantId)),c=ne(()=>o.draft.kind!=="none"&&!!o.draft.variantId);je(()=>`${o.draft.kind}::${o.draft.variantId}`,()=>{if(o.draft.userVariantMode!=="custom"){for(const R of Object.keys(o.draft.userVariantTokens))delete o.draft.userVariantTokens[R];o.draft.userVariantCssPatch.wrapperCSS="",o.draft.userVariantCssPatch.titleCSS="",o.draft.userVariantCssPatch.bodyCSS="",o.draft.userVariantMode=null}});function u(R){const B=o.draft.userVariantMode;if(R===B){o.draft.userVariantMode=null;return}const N=o.draft,k=Object.keys(N.userVariantTokens).length>0,y=N.userVariantCssPatch,b=!!(y.wrapperCSS.trim()||y.titleCSS.trim()||y.bodyCSS.trim()),_=N.userVariantCustom,x=!!(_.template.trim()||_.wrapperCSS.trim()||_.titleCSS.trim()||_.bodyCSS.trim()||_.svgSlot.trim());if(!((R!=="tokens"&&k||R!=="patch"&&b||R!=="custom"&&x)&&!window.confirm("切换将清空其它模式下已写的内容，是否继续？"))){if(R==="tokens")N.userVariantCssPatch.wrapperCSS="",N.userVariantCssPatch.titleCSS="",N.userVariantCssPatch.bodyCSS="",d();else if(R==="patch"){for(const P of Object.keys(N.userVariantTokens))delete N.userVariantTokens[P];d()}else if(R==="custom"){for(const P of Object.keys(N.userVariantTokens))delete N.userVariantTokens[P];N.userVariantCssPatch.wrapperCSS="",N.userVariantCssPatch.titleCSS="",N.userVariantCssPatch.bodyCSS=""}N.userVariantMode=R}}function d(){o.draft.userVariantCustom.template="",o.draft.userVariantCustom.wrapperCSS="",o.draft.userVariantCustom.titleCSS="",o.draft.userVariantCustom.bodyCSS="",o.draft.userVariantCustom.svgSlot=""}const f=te("wrapperCSS"),m=te("template"),v={wrapperCSS:"外壳 (wrapper)",titleCSS:"标题 (title)",bodyCSS:"正文 (body)"},g={template:"HTML 骨架",wrapperCSS:"外壳 (wrapper)",titleCSS:"标题 (title)",bodyCSS:"正文 (body)",svgSlot:"装饰 SVG"},h=ne(()=>{const R=o.draft.userVariantMode,B=o.draft;return[{id:"tokens",label:"Tokens 微调骨架值",available:l.value,expanded:R==="tokens",slots:[]},{id:"patch",label:"源码模式 改基底 CSS",available:c.value,expanded:R==="patch",slots:["wrapperCSS","titleCSS","bodyCSS"].map(N=>({slot:N,label:v[N],hasContent:!!B.userVariantCssPatch[N].trim()}))},{id:"custom",label:"完全自定义 从零写",available:!0,expanded:R==="custom",slots:["template","wrapperCSS","titleCSS","bodyCSS","svgSlot"].map(N=>({slot:N,label:g[N],hasContent:!!B.userVariantCustom[N].trim()}))}]});function w(R){return R==="patch"?f.value:R==="custom"?m.value:""}function A(R){u(R)}function M(R,B){R==="patch"?f.value=B:R==="custom"&&(m.value=B)}return(R,B)=>(T(),L("div",M4,[p("div",O4,[p("label",N4,[B[7]||(B[7]=p("span",{class:"label"},"名称",-1)),et(p("input",{"onUpdate:modelValue":B[0]||(B[0]=N=>o.draft.name=N),maxlength:"20",placeholder:"如:我的封面卡",class:"text-input"},null,512),[[vt,o.draft.name]])])]),p("div",L4,[p("label",D4,[B[8]||(B[8]=p("span",{class:"label"},"描述 (可选)",-1)),et(p("input",{"onUpdate:modelValue":B[1]||(B[1]=N=>o.draft.description=N),maxlength:"30",placeholder:"一句话说明",class:"text-input"},null,512),[[vt,o.draft.description]])])]),p("div",P4,[p("label",B4,[B[9]||(B[9]=p("span",{class:"label"},"分类",-1)),et(p("select",{"onUpdate:modelValue":B[2]||(B[2]=N=>o.draft.kind=N),class:"text-input"},[(T(),L(ae,null,Te(s,N=>p("option",{key:N.value,value:N.value},z(N.label),9,F4)),64))],512),[[Ol,o.draft.kind]])]),p("label",j4,[B[11]||(B[11]=p("span",{class:"label"},"骨架 (variant)",-1)),et(p("select",{"onUpdate:modelValue":B[3]||(B[3]=N=>o.draft.variantId=N),class:"text-input",disabled:o.draft.kind==="none"},[B[10]||(B[10]=p("option",{value:""},"(无)",-1)),(T(!0),L(ae,null,Te(r.value,N=>(T(),L("option",{key:N,value:N},z(N),9,V4))),128))],8,H4),[[Ol,o.draft.variantId]])])]),p("div",U4,[B[12]||(B[12]=p("span",{class:"label"},"Markdown",-1)),$e(b4,{modelValue:o.draft.markdownSnippet,"onUpdate:modelValue":B[4]||(B[4]=N=>o.draft.markdownSnippet=N),placeholder:"选择上方“分类 + 骨架”自动填入示例；或直接在此撰写自由 markdown"},null,8,["modelValue"])]),a.value.ok?ue("",!0):(T(),L("div",z4,[B[15]||(B[15]=p("div",{class:"diag-title"},"未通过校验",-1)),p("ul",W4,[a.value.unknownFences.length>0?(T(),L("li",K4,[B[13]||(B[13]=De(" 未注册容器: ",-1)),p("code",null,z(a.value.unknownFences.join(", ")),1)])):ue("",!0),(T(!0),L(ae,null,Te(a.value.unknownVariants,(N,k)=>(T(),L("li",{key:k},[B[14]||(B[14]=De(" 未注册 variant: ",-1)),p("code",null,z(N.container)+" → variant="+z(N.variantId),1)]))),128))])])),p("div",q4,[B[16]||(B[16]=p("p",{class:"advanced-hint"}," 高级样式 · 三档互斥：Tokens 微调骨架值 · 源码模式 改基底 CSS · 完全自定义 从零写 ",-1)),p("div",G4,[(T(!0),L(ae,null,Te(h.value,N=>(T(),L(ae,{key:N.id},[N.available?(T(),L(ae,{key:0},[p("button",{type:"button",role:"treeitem","aria-expanded":N.expanded,class:Ce(["tree-group",{active:N.expanded}]),onClick:k=>A(N.id)},[p("span",J4,z(N.expanded?"▼":"▶"),1),De(" "+z(N.label),1)],10,Y4),N.expanded&&N.slots.length>0?(T(),L("div",Q4,[(T(!0),L(ae,null,Te(N.slots,k=>(T(),L("button",{key:k.slot,type:"button",role:"treeitem","aria-selected":w(N.id)===k.slot,class:Ce(["tree-slot",{active:w(N.id)===k.slot}]),onClick:y=>M(N.id,k.slot)},[De(z(k.label)+" ",1),k.hasContent?(T(),L("span",Z4)):ue("",!0)],10,X4))),128))])):ue("",!0)],64)):ue("",!0)],64))),128))]),o.draft.userVariantMode==="tokens"&&l.value?(T(),He(R4,{key:0,kind:o.draft.kind,"variant-id":o.draft.variantId,tokens:o.draft.userVariantTokens},null,8,["kind","variant-id","tokens"])):o.draft.userVariantMode==="patch"?(T(),He(I(t),{key:1,kind:o.draft.kind,"variant-id":o.draft.variantId,"css-patch":o.draft.userVariantCssPatch,theme:o.theme,"live-patch-log":o.livePatchLog??null,"active-slot":f.value,"onUpdate:activeSlot":B[5]||(B[5]=N=>f.value=N)},null,8,["kind","variant-id","css-patch","theme","live-patch-log","active-slot"])):o.draft.userVariantMode==="custom"?(T(),He(I(n),{key:2,custom:o.draft.userVariantCustom,theme:o.theme,"original-linked-uv-id":o.originalLinkedUvId??null,"live-patch-log":o.livePatchLog??null,"active-tab":m.value,"onUpdate:activeTab":B[6]||(B[6]=N=>m.value=N)},null,8,["custom","theme","original-linked-uv-id","live-patch-log","active-tab"])):ue("",!0)])]))}}),tT=Oe(eT,[["__scopeId","data-v-fb1c9ef6"]]),nT={class:"head"},oT={class:"head-text"},sT={key:0,class:"entries"},rT={class:"entry-head"},iT={class:"patch-name mono"},aT={class:"label"},lT={class:"count mono"},cT={key:0,class:"samples"},uT=["role","tabindex","onClick","onKeydown"],dT={class:"selector mono"},fT={class:"before mono"},pT={key:0,class:"more"},hT=Me({__name:"PatchInspector",props:{patchLog:{},clickable:{type:Boolean}},emits:["click-sample"],setup(e,{emit:t}){const n=e,o=t;function s(a){n.clickable&&o("click-sample",a)}const r=ne(()=>n.patchLog?n.patchLog.total>0:!1),i=ne(()=>n.patchLog?.entries??[]);return(a,l)=>(T(),L("div",{class:Ce(["patch-inspector",{empty:!r.value}])},[p("div",nT,[l[2]||(l[2]=p("span",{class:"dot"},null,-1)),p("span",oT,[r.value?(T(),L(ae,{key:0},[l[0]||(l[0]=De(" 本次渲染对 HTML 做了 ",-1)),p("b",null,z(n.patchLog?.total),1),l[1]||(l[1]=De(" 处微信适配 ",-1))],64)):(T(),L(ae,{key:1},[De(" 渲染透明度 · 无适配 ")],64))])]),r.value?(T(),L("ul",sT,[(T(!0),L(ae,null,Te(i.value,(c,u)=>(T(),L("li",{key:u,class:"entry"},[p("div",rT,[p("code",iT,z(c.patch),1),p("span",aT,z(c.label),1),p("span",lT,"× "+z(c.count),1)]),c.samples&&c.samples.length>0?(T(),L("ul",cT,[(T(!0),L(ae,null,Te(c.samples,(d,f)=>(T(),L("li",{key:f,class:Ce(["sample",{clickable:n.clickable}]),role:n.clickable?"button":void 0,tabindex:n.clickable?0:void 0,onClick:m=>s(d),onKeydown:[Nn(ht(m=>s(d),["prevent"]),["enter"]),Nn(ht(m=>s(d),["prevent"]),["space"])]},[p("code",dT,z(d.selector),1),l[3]||(l[3]=p("span",{class:"arrow"},"→",-1)),p("code",fT,z(d.before),1)],42,uT))),128)),c.count>c.samples.length?(T(),L("li",pT," ...还有 "+z(c.count-c.samples.length)+" 处 ",1)):ue("",!0)])):ue("",!0)]))),128))])):ue("",!0)],2))}}),mT=Oe(hT,[["__scopeId","data-v-2c543997"]]),gT={class:"preview-shell"},bT={class:"preview-meta mono"},yT={key:0,class:"empty"},vT=["srcdoc"],wT=Me({__name:"ComponentPreview",props:{md:{},theme:{},userVariants:{}},emits:["patch-log"],setup(e,{emit:t}){const n=e,o=t,s=ne(()=>{if(!n.md.trim())return null;try{return ip({md:n.md,theme:n.theme,userVariants:n.userVariants})}catch{return null}}),r=ne(()=>s.value?.html??""),i=ne(()=>s.value?.patchLog??null);je(i,l=>o("patch-log",l),{immediate:!0});const a=ne(()=>r.value?`<!doctype html>
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
<div class="phone-viewport">${r.value}</div>
</body>
</html>`:"");return(l,c)=>(T(),L("div",gT,[p("div",bT,z(n.theme.name)+" · 预览",1),r.value?(T(),L("iframe",{key:1,class:"preview-frame",srcdoc:a.value,sandbox:"allow-same-origin",title:"组件预览"},null,8,vT)):(T(),L("div",yT,"输入 markdown 后,这里会显示渲染结果。")),r.value?(T(),He(mT,{key:2,"patch-log":i.value,class:"inspector"},null,8,["patch-log"])):ue("",!0)]))}}),ST=Oe(wT,[["__scopeId","data-v-34345d9a"]]),hr={wrapperCSS:"",titleCSS:"",bodyCSS:""},mr={template:"",wrapperCSS:"",titleCSS:"",bodyCSS:"",svgSlot:""},_T={name:"",description:"",kind:"none",variantId:"",markdownSnippet:"",thumbnailSvg:"",userVariantTokens:{},userVariantMode:null,userVariantCssPatch:{...hr},userVariantCustom:{...mr}};function qc(e,t=""){return{name:t?`${t}${e.name}`:e.name,description:e.description??"",kind:e.kind,variantId:e.variantId??"",markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg,userVariantTokens:{},userVariantMode:null,userVariantCssPatch:{...hr},userVariantCustom:{...mr}}}function kT(e){const t={originalLinkedUvId:e.linkedUserVariantId??null,tokens:{},cssPatch:{...hr},custom:{...mr},mode:null},n=e.linkedUserVariantId;if(!n)return t;const o=fp(n);return o?o.level==="custom"?{...t,custom:{template:o.template,wrapperCSS:o.css.wrapperCSS,titleCSS:o.css.titleCSS??"",bodyCSS:o.css.bodyCSS??"",svgSlot:o.css.svgSlot??""},mode:"custom"}:o.base.kind!==e.kind||o.base.variantId!==(e.variantId??"")?t:o.level==="tokens"?{...t,tokens:{...o.tokens},mode:"tokens"}:{...t,cssPatch:{wrapperCSS:o.cssPatch.wrapperCSS??"",titleCSS:o.cssPatch.titleCSS??"",bodyCSS:o.cssPatch.bodyCSS??""},mode:"patch"}:t}function xT(e,t){let n,o=null,s=null;if(e==="new"||!t)n={..._T,userVariantCssPatch:{...hr},userVariantCustom:{...mr}};else if(e==="edit"){if(n=qc(t),t.source==="user"){o=t.id;const l=kT(t);n.userVariantTokens=l.tokens,n.userVariantCssPatch=l.cssPatch,n.userVariantCustom=l.custom,n.userVariantMode=l.mode,s=l.originalLinkedUvId}}else n=qc(t,"副本 · ");const r=Kt({...n,userVariantTokens:{...n.userVariantTokens},userVariantCssPatch:{...n.userVariantCssPatch},userVariantCustom:{...n.userVariantCustom}}),i=ne(()=>r.name!==n.name||r.description!==n.description||r.kind!==n.kind||r.variantId!==n.variantId||r.markdownSnippet!==n.markdownSnippet||r.thumbnailSvg!==n.thumbnailSvg||r.userVariantMode!==n.userVariantMode||!ET(r.userVariantTokens,n.userVariantTokens)||!CT(r.userVariantCssPatch,n.userVariantCssPatch)||!$T(r.userVariantCustom,n.userVariantCustom));function a(){r.name=n.name,r.description=n.description,r.kind=n.kind,r.variantId=n.variantId,r.markdownSnippet=n.markdownSnippet,r.thumbnailSvg=n.thumbnailSvg,r.userVariantMode=n.userVariantMode;for(const l of Object.keys(r.userVariantTokens))delete r.userVariantTokens[l];Object.assign(r.userVariantTokens,n.userVariantTokens),r.userVariantCssPatch.wrapperCSS=n.userVariantCssPatch.wrapperCSS,r.userVariantCssPatch.titleCSS=n.userVariantCssPatch.titleCSS,r.userVariantCssPatch.bodyCSS=n.userVariantCssPatch.bodyCSS,r.userVariantCustom.template=n.userVariantCustom.template,r.userVariantCustom.wrapperCSS=n.userVariantCustom.wrapperCSS,r.userVariantCustom.titleCSS=n.userVariantCustom.titleCSS,r.userVariantCustom.bodyCSS=n.userVariantCustom.bodyCSS,r.userVariantCustom.svgSlot=n.userVariantCustom.svgSlot}return{draft:r,initial:n,dirty:i,editingId:o,originalLinkedUvId:s,reset:a}}function CT(e,t){return e.wrapperCSS===t.wrapperCSS&&e.titleCSS===t.titleCSS&&e.bodyCSS===t.bodyCSS}function $T(e,t){return e.template===t.template&&e.wrapperCSS===t.wrapperCSS&&e.titleCSS===t.titleCSS&&e.bodyCSS===t.bodyCSS&&e.svgSlot===t.svgSlot}function ET(e,t){const n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(const s of n)if(e[s]!==t[s])return!1;return!0}const TT={class:"studio","aria-label":"组件 Studio"},AT={class:"modal-head"},IT={class:"modal-head-label"},RT={key:0,class:"modal-head-dirty","aria-label":"有未保存改动"},MT={class:"content"},OT={class:"col col-editor"},NT={class:"col col-preview"},LT={class:"preview-wrap"},DT={class:"footer"},PT={key:0,class:"error"},BT={class:"actions"},FT=["disabled"],Qr="uv_preview_draft",jT=Me({__name:"ComponentStudio",props:{init:{},theme:{}},emits:["done","cancel"],setup(e,{expose:t,emit:n}){const o=e,s=n,{draft:r,dirty:i,editingId:a,originalLinkedUvId:l,reset:c}=xT(o.init.mode,o.init.source??null),u=te(""),d=te(null);function f($){d.value=$}const m=ne(()=>Object.keys(r.userVariantTokens).length),v=ne(()=>{const $=r.userVariantCssPatch;return!!($.wrapperCSS.trim()||$.titleCSS.trim()||$.bodyCSS.trim())}),g=ne(()=>{const $=r.userVariantCustom;return!!($.template.trim()&&$.wrapperCSS.trim())}),h=ne(()=>r.kind!=="none"&&!!r.variantId),w=ne(()=>r.userVariantMode==="custom"?g.value:h.value?r.userVariantMode==="tokens"?m.value>0:r.userVariantMode==="patch"?v.value:!1:!1),A=ne(()=>l??Ii.replace(/^uc-/,"")),M=ne(()=>{if(!w.value)return[];if(r.userVariantMode==="custom"){const O=r.userVariantCustom;return[{id:A.value,name:"__custom_preview__",level:"custom",createdAt:0,updatedAt:Date.now(),base:null,template:O.template,css:{wrapperCSS:O.wrapperCSS,...O.titleCSS.trim()?{titleCSS:O.titleCSS}:{},...O.bodyCSS.trim()?{bodyCSS:O.bodyCSS}:{},...O.svgSlot.trim()?{svgSlot:O.svgSlot}:{}}}]}const $={kind:r.kind,variantId:r.variantId};if(r.userVariantMode==="tokens")return[{id:Qr,name:"__preview__",level:"tokens",createdAt:0,updatedAt:0,base:$,tokens:{...r.userVariantTokens}}];const P=r.userVariantCssPatch;return[{id:Qr,name:"__preview__",level:"patch",createdAt:0,updatedAt:0,base:$,cssPatch:{...P.wrapperCSS.trim()?{wrapperCSS:P.wrapperCSS}:{},...P.titleCSS.trim()?{titleCSS:P.titleCSS}:{},...P.bodyCSS.trim()?{bodyCSS:P.bodyCSS}:{}}}]}),R=ne(()=>w.value?r.userVariantMode==="custom"?mp(r.markdownSnippet,Ii,`uc-${A.value}`):Uo(r.markdownSnippet,r.variantId,Qr):r.markdownSnippet);function B(){i.value&&!window.confirm("放弃此次编辑?")||s("cancel")}function N(){c(),u.value=""}const k=ne(()=>!(!r.name.trim()||!r.markdownSnippet.trim()));function y(){if(u.value="",!r.name.trim()){u.value="名称不能为空";return}if(!r.markdownSnippet.trim()){u.value="Markdown 内容不能为空";return}const{markdown:$,linkAction:P}=f4(r,l),W=P.kind==="set"?P.id:P.kind==="clear"?null:void 0,O={name:r.name.trim(),description:r.description.trim(),kind:r.kind,variantId:r.variantId||void 0,markdownSnippet:b($),thumbnailSvg:r.thumbnailSvg||void 0,linkedUserVariantId:P.kind==="set"?P.id:void 0};if(o.init.mode==="edit"&&a){const F=RE(a,{name:O.name,description:O.description,markdownSnippet:O.markdownSnippet,thumbnailSvg:O.thumbnailSvg,linkedUserVariantId:W});if(!F.ok){u.value=_(F);return}s("done",a);return}const E=Na(O);if(!E.ok){u.value=_(E);return}s("done",E.entry.id)}function b($){return $.endsWith(`
`)?$:$+`
`}function _($){if($.reason==="not-found")return"组件不存在(可能已被删除)";const P=$.result;if(P.unknownFences.length>0)return`未注册容器: ${P.unknownFences.join(", ")}`;if(P.unknownVariants.length>0){const W=P.unknownVariants[0];return`未注册 variant: ${W.container} → ${W.variantId}`}return"校验失败"}const x=ne(()=>o.init.mode==="new"?"新建组件":o.init.mode==="edit"?"编辑组件":"派生为我的组件");return t({attemptCancel:B}),($,P)=>(T(),L("section",TT,[p("header",AT,[p("span",IT,z(x.value),1),I(i)?(T(),L("span",RT,"·已改动")):ue("",!0),p("button",{class:"modal-head-close",type:"button","aria-label":"关闭",title:"关闭（Esc）",onClick:B},"×")]),p("div",MT,[p("div",OT,[$e(tT,{draft:I(r),theme:o.theme,"original-linked-uv-id":I(l),"live-patch-log":d.value},null,8,["draft","theme","original-linked-uv-id","live-patch-log"])]),p("div",NT,[p("div",LT,[$e(ST,{md:R.value,theme:o.theme,"user-variants":M.value,onPatchLog:f},null,8,["md","theme","user-variants"])])])]),p("div",DT,[u.value?(T(),L("div",PT,z(u.value),1)):ue("",!0),p("div",BT,[p("button",{class:"btn btn-ghost",type:"button",onClick:B},"取消"),I(i)?(T(),L("button",{key:0,class:"btn btn-ghost",type:"button",title:"还原到初始状态",onClick:N},"还原")):ue("",!0),p("button",{class:"btn btn-primary",type:"button",disabled:!k.value,onClick:y},"保存",8,FT)])])]))}}),HT=Oe(jT,[["__scopeId","data-v-cef927b2"]]),VT={class:"tabs tabs-group",role:"tablist","aria-label":"组件分组"},UT=["aria-selected","onClick"],zT={key:0,class:"tabs tabs-sub",role:"tablist","aria-label":"子分类"},WT=["aria-selected","onClick"],KT={key:0,class:"sub-count"},qT={key:1,class:"user-toolbar"},GT={key:0,class:"tool-status",role:"status","aria-live":"polite","aria-atomic":"true"},YT={class:"body"},JT={key:0,class:"empty"},QT={class:"empty-title"},XT={class:"studio-modal-card"},ZT=340,e3=Me({__name:"ComponentPalette",props:{theme:{}},emits:["insert","close"],setup(e,{expose:t,emit:n}){const o=Rs(()=>Hn(()=>import("./UserVariantsPanel-CCyS-6Jf.js"),__vite__mapDeps([12,1,2,3,4,13]))),s=e,r=n,i=te("list"),a=te(null),l=te(null),c=te("template"),u=te(Ao[0]?.subs[0]?.key??""),d=ne(()=>Ao.find(S=>S.id===c.value)??Ao[0]),f=ne(()=>d.value.subs.find(S=>S.key===u.value));function m(S){c.value=S;const C=Ao.find(D=>D.id===S);C&&C.subs.length>0&&(u.value=C.subs[0].key)}const{width:v,maxWidth:g,defaultWidth:h,minWidth:w}=ap({storageKey:_C,defaultWidth:ZT,min:320,maxViewportRatio:.55}),A=ne(()=>v.value===null?void 0:{width:v.value+"px"});function M(){l.value?.attemptCancel()}function R(S){S.key==="Escape"&&i.value==="studio"&&(S.stopPropagation(),S.preventDefault(),l.value?.attemptCancel())}mt(()=>{document.addEventListener("keydown",R)}),Je(()=>{document.removeEventListener("keydown",R)});const B=ME(),N=B.list,k=ne(()=>{const S={admonition:[],quote:[],compare:[],steps:[],divider:[],sectionTitle:[],codeBlock:[],note:[],highlight:[],footnotes:[],recommend:[],qrcode:[],footerCTA:[],pullQuote:[],announcement:[],tableCard:[],gallery:[],dialogue:[],qaBlock:[],none:[]};for(const C of dE)C.kind in S&&S[C.kind].push(C);return S}),y=ne(()=>fE(s.theme));function b(S){if(!S)return[];const C=S.source;if(C.type==="theme-template")return y.value;if(C.type==="user")return N.value;if(C.type==="uv")return[];const D=k.value[C.kind]??[];if(!C.variantIds||C.variantIds.length===0)return D;const U=new Set(C.variantIds);return D.filter(K=>K.variantId!==void 0&&U.has(K.variantId))}const _=ne(()=>b(f.value)),x=ne(()=>f.value?.source.type==="user"?["edit","share","delete"]:["derive"]);function $(S){return S.source.type==="uv"?0:b(S).length}const P=te("");let W=null;function O(S,C=2e3){P.value=S,W!=null&&window.clearTimeout(W),W=window.setTimeout(()=>{P.value="",W=null},C)}function E(S){r("insert",S.markdownSnippet)}function F(S){const{kind:C,entry:D}=S;if(C==="delete"){B.remove(D.id);return}if(C==="edit"){if(D.source!=="user"){O("内置组件不可直接编辑，请先派生为「我的」",2500);return}a.value={mode:"edit",source:D},i.value="studio";return}if(C==="derive"){a.value={mode:"derive",source:D},i.value="studio";return}C==="share"&&j(D)}async function j(S){const C=UE({id:S.id,name:S.name,description:S.description,kind:S.kind,variantId:S.variantId,markdownSnippet:S.markdownSnippet,thumbnailSvg:S.thumbnailSvg}),D=pp(Pa,C);try{navigator.clipboard?.writeText?(await navigator.clipboard.writeText(D),O("已复制分享链接")):(location.hash=D.slice(D.indexOf("#")),O("请从地址栏复制当前链接",3e3))}catch{O("分享失败：剪贴板权限不足",3e3)}}function oe(){const S=SE(),C=`wechat-typeset-components-${new Date().toISOString().slice(0,10)}.json`;cs(C,S,"application/json"),O("已导出组件库 JSON")}const be=te(null);function xe(){be.value?.click()}async function Ee(S){const C=S.target,D=C.files?.[0];if(C.value="",!!D)try{const U=await D.text(),K=_E(U);K>0?(B.refresh(),O(`已导入 ${K} 个组件`)):O("未导入：文件为空或重复",2500)}catch{O("导入失败：文件读取错误",2500)}}function Ie(){a.value={mode:"new"},i.value="studio"}function le(){i.value="list",a.value=null}function re(S){le(),m("mine"),u.value="m-user",B.refresh()}const ce=Kt({open:!1,source:"",error:""});function ve(S){S.trim()&&(ce.open=!0,ce.source=S,ce.error="")}function Ue(){ce.open=!1,ce.error=""}function St(S){if(!S.name){ce.error="组件名不能为空";return}const C=gt(ce.source),D=Na({name:S.name,description:S.description,markdownSnippet:C,sourceMarkdown:ce.source,kind:"none"});if(!D.ok){ce.error=Gt(D);return}ce.open=!1,ce.error="",m("mine"),u.value="m-user",B.refresh()}function gt(S){return S.endsWith(`
`)?S:S+`
`}function Gt(S){if(S.reason==="validation"){const C=S.result.unknownFences,D=S.result.unknownVariants;if(C.length>0)return`选区含未注册容器: ${C.join(", ")}。请在编辑器修正后再保存。`;if(D.length>0){const U=D[0];return`选区含未注册 variant: ${U.container}:${U.variantId}。请在编辑器修正。`}return"选区内容未通过校验"}return"保存失败"}return t({openSaveDialog:ve}),(S,C)=>(T(),L(ae,null,[p("aside",{class:"palette","aria-label":"组件库",style:Ge(A.value)},[$e(mf,{width:I(v),min:I(w),max:I(g),"default-width":I(h),"onUpdate:width":C[0]||(C[0]=D=>v.value=D)},null,8,["width","min","max","default-width"]),$e(bo,{title:"插入",size:"sm",onClose:C[1]||(C[1]=D=>r("close"))},{actions:kt(()=>[i.value!=="studio"?(T(),L("button",{key:0,class:"head-action",title:"新建组件",onClick:Ie},"+ 新建")):ue("",!0)]),_:1}),p("nav",VT,[(T(!0),L(ae,null,Te(I(Ao),D=>(T(),L("button",{key:D.id,class:Ce(["tab",{active:c.value===D.id}]),role:"tab","aria-selected":c.value===D.id,onClick:U=>m(D.id)},z(D.label),11,UT))),128))]),d.value.subs.length>1?(T(),L("nav",zT,[(T(!0),L(ae,null,Te(d.value.subs,D=>(T(),L("button",{key:D.key,class:Ce(["sub-tab",{active:u.value===D.key}]),role:"tab","aria-selected":u.value===D.key,onClick:U=>u.value=D.key},[p("span",null,z(D.label),1),D.source.type!=="uv"&&$(D)>0?(T(),L("span",KT,z($(D)),1)):ue("",!0)],10,WT))),128))])):ue("",!0),f.value?.source.type==="user"?(T(),L("div",qT,[p("button",{class:"tool-btn",title:"导出我的组件为 JSON",onClick:oe},"↓ 导出"),p("button",{class:"tool-btn",title:"从 JSON 文件导入组件",onClick:xe},"↑ 导入"),p("input",{ref_key:"importInputRef",ref:be,type:"file",accept:"application/json,.json",class:"hidden-input",onChange:Ee},null,544),P.value?(T(),L("span",GT,z(P.value),1)):ue("",!0)])):ue("",!0),p("div",YT,[f.value?.source.type==="uv"?(T(),He(I(o),{key:0})):(T(),L(ae,{key:1},[_.value.length===0?(T(),L("div",JT,[f.value?.source.type==="theme-template"?(T(),L(ae,{key:0},[p("div",QT,"当前主题「"+z(s.theme.name)+"」暂无预设模板",1),C[2]||(C[2]=p("div",{class:"empty-hint"},"从工具栏切换主题，或在其它分类挑选通用组件。",-1))],64)):f.value?.source.type==="user"?(T(),L(ae,{key:1},[C[3]||(C[3]=p("div",{class:"empty-title"},"还没有自创组件",-1)),C[4]||(C[4]=p("div",{class:"empty-hint"},' 点下方"新建"开始，或在编辑器里选中一段 markdown 后用"保存选区为组件"把它存下来。 ',-1)),p("button",{class:"empty-cta",type:"button",onClick:Ie},"＋ 新建组件")],64)):(T(),L(ae,{key:2},[C[5]||(C[5]=p("div",{class:"empty-title"},"本分类暂无预设",-1)),C[6]||(C[6]=p("div",{class:"empty-hint"},"切到其它子分类继续浏览。",-1))],64))])):(T(),He(t4,{key:1,entries:_.value,theme:s.theme,actions:x.value,onSelect:E,onAction:F},null,8,["entries","theme","actions"]))],64))]),$e(u4,{open:ce.open,"source-text":ce.source,error:ce.error,onCancel:Ue,onConfirm:St},null,8,["open","source-text","error"])],4),(T(),He(zu,{to:"body"},[i.value==="studio"&&a.value?(T(),L("div",{key:0,class:"studio-modal-mask",role:"dialog","aria-modal":"true","aria-label":"组件 Studio",onClick:ht(M,["self"])},[p("div",XT,[$e(HT,{ref_key:"studioRef",ref:l,init:a.value,theme:s.theme,onDone:re,onCancel:le},null,8,["init","theme"])])])):ue("",!0)]))],64))}}),t3=Oe(e3,[["__scopeId","data-v-80c45fc3"]]),Gc=/!\[[^\]]*\]\(([^)\s]+)(?:\s"[^"]*")?\)/g,Yc=/\[[^\]]+\]\((https?:\/\/[^)\s]+)(?:\s"[^"]*")?\)/g,n3=/^:::\s*author\b/m,o3=/^#{1,6}\s+/,Jc=/[\u4e00-\u9fff\u3400-\u4dbf]/g,Xr=120,Zr=400,s3=10,r3=1024*1024;function i3(e){const t=[];if(!e||!e.trim())return t.push({id:"empty",status:"fail",label:"正文为空",hint:"请至少写一段内容再发稿。"}),{items:t,pass:!1};const n=a3(e);n?(t.push({id:"cover-image",status:"pass",label:"已有封面图",hint:n.length>60?n.slice(0,57)+"…":n}),t.push({id:"cover-ratio",status:"info",label:"封面比例",hint:"公众号支持 3.35:1（1200×358）与 1:1（900×900）两档；发稿前在素材库核对。"})):t.push({id:"cover-image",status:"warn",label:"未检测到封面图",hint:"建议在首段前放一张 `![封面](...)` ；公众号列表页会自动取第一张图。"});const s=l3(e).length;s===0?t.push({id:"abstract-length",status:"warn",label:"未找到摘要段",hint:"建议首段写一段 ≤ 120 字的导语，作为公众号摘要抓取候选。"}):s<=Xr?t.push({id:"abstract-length",status:"pass",label:`摘要段 ${s} 字（≤ ${Xr}）`}):t.push({id:"abstract-length",status:"warn",label:`摘要段偏长：${s} 字（建议 ≤ ${Xr}）`,hint:"公众号列表页预览至多 120 字，过长会被截断。"});const r=c3(e);t.push({id:"word-count",status:r>=Zr?"pass":"warn",label:`正文 ${r} 字`,hint:r>=Zr?void 0:`短于 ${Zr} 字，公众号"深阅读"率会明显偏低。`});const i=n3.test(e);t.push({id:"author-declaration",status:i?"pass":"info",label:i?"已声明作者（::: author）":"未声明作者",hint:i?void 0:'原创文章建议加 `::: author` 容器写署名；无此容器也可在公众号后台单独勾选"原创"。'});const a=u3(e);a===0?t.push({id:"external-links",status:"pass",label:"无站外链接"}):a<=s3?t.push({id:"external-links",status:"info",label:`站外链接 ${a} 条`,hint:"公众号不支持站外跳转，发文时需在文末二维码长图 / 原文链接里引导。"}):t.push({id:"external-links",status:"warn",label:`站外链接过多：${a} 条`,hint:'建议降级：保留 3-5 条核心链接，其余改为文末"相关阅读"列表。'});const l=d3(e);return l===0||(l<r3?t.push({id:"inline-image-size",status:"pass",label:`内联 base64 图片约 ${Qc(l)}`}):t.push({id:"inline-image-size",status:"warn",label:`内联 base64 图片偏大：${Qc(l)}`,hint:"公众号单图上限 10 MB；接近上限前建议改走 CDN provider，减少草稿体积。"})),{items:t,pass:t.every(c=>c.status!=="fail")}}function a3(e){Gc.lastIndex=0;const t=Gc.exec(e);return t?t[1]:null}function l3(e){const t=e.split(/\r?\n/);let n=!1,o=0;const s=[];for(const r of t){const i=r.trimEnd();if(/^```/.test(i)){if(n=!n,s.length>0)break;continue}if(!n){if(/^:{3,}\s*$/.test(i)){o=Math.max(0,o-1);continue}if(/^:{3,}\s+[A-Za-z]/.test(i)){o++;continue}if(!(o>0)){if(!i.trim()){if(s.length>0)break;continue}if(o3.test(i)){if(s.length>0)break;continue}s.push(i)}}}return s.join("").replace(/\s+/g,"")}function c3(e){const t=(e.match(Jc)??[]).length,n=e.replace(Jc," ").split(/\s+/).filter(Boolean).length;return t+n}function u3(e){Yc.lastIndex=0;let t=0;for(;Yc.exec(e)!==null;)t++;return t}function d3(e){const t=/data:image\/[a-z+]+;base64,([A-Za-z0-9+/=]+)/g;let n=0,o;for(;(o=t.exec(e))!==null;)n+=Math.floor(o[1].length*3/4);return n}function Qc(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}const f3={class:"panel"},p3={class:"panel-section summary"},h3={class:"summary-text"},m3={class:"items"},g3={class:"item-body"},b3={class:"item-label"},y3={key:0,class:"item-hint"},v3=Me({__name:"PublishChecklist",props:{md:{}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,s=ne(()=>i3(n.md)),r={pass:"pass",warn:"warn",fail:"fail",info:"info"};return(i,a)=>(T(),L("div",f3,[$e(bo,{title:"发文前清单",size:"sm",onClose:a[0]||(a[0]=l=>o("close"))}),a[2]||(a[2]=p("div",{class:"hint"},"静态分析 · 封面 / 摘要 / 原创 / 外链 / 体积",-1)),p("div",p3,[p("div",{class:Ce(["summary-dot",s.value.pass?"summary-dot-pass":"summary-dot-warn"])},null,2),p("div",h3,z(s.value.pass?"清单无阻断项，可以进入发稿流程":"存在待处理项，建议修正后再发稿"),1)]),p("ul",m3,[(T(!0),L(ae,null,Te(s.value.items,l=>(T(),L("li",{key:l.id,class:Ce(["item",`status-${r[l.status]}`])},[a[1]||(a[1]=p("span",{class:"item-dot","aria-hidden":"true"},null,-1)),p("div",g3,[p("div",b3,z(l.label),1),l.hint?(T(),L("div",y3,z(l.hint),1)):ue("",!0)])],2))),128))])]))}}),w3=Oe(v3,[["__scopeId","data-v-b1d37f76"]]),S3=["aria-label"],_3=Me({__name:"PanelShell",props:{ariaLabel:{},maxWidth:{default:560},maxHeight:{default:80},align:{default:"center"},topPadVh:{default:12}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,s=ne(()=>({width:`min(${n.maxWidth}px, 92vw)`,maxHeight:`${n.maxHeight}vh`})),r=ne(()=>["panel-shell-mask",`panel-shell-mask--align-${n.align}`]),i=ne(()=>n.align==="top"?{paddingTop:`${n.topPadVh}vh`}:{});return(a,l)=>(T(),L("div",{class:Ce(r.value),style:Ge(i.value),onClick:l[0]||(l[0]=ht(c=>o("close"),["self"]))},[p("div",{class:"panel-shell-card",role:"dialog","aria-label":e.ariaLabel,style:Ge(s.value)},[Fo(a.$slots,"default",{},void 0)],12,S3)],6))}}),yp=Oe(_3,[["__scopeId","data-v-d56f7a06"]]);function vp(e){const t=te(""),n=ne(()=>{const s=typeof e.source=="function"?e.source():e.source.value,r=t.value.trim().toLowerCase();return r?s.filter(i=>e.predicate(i,r)):s});function o(){t.value=""}return{query:t,filtered:n,clear:o}}const k3={class:"cmd-group mono"},x3=["data-idx","onMouseenter","onClick"],C3={class:"cmd-title"},$3={key:0,class:"cmd-kbd"},E3={key:0,class:"cmd-empty"},T3=Me({__name:"CommandPalette",props:{commands:{}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,s=te(0),r=te(null),i=te(null),{query:a,filtered:l}=vp({source:ne(()=>n.commands),predicate:(v,g)=>`${v.title} ${v.group} ${v.keywords??""} ${v.shortcut??""}`.toLowerCase().includes(g)});je(l,()=>{s.value=0}),mt(()=>{jn(()=>r.value?.focus())});function c(v){if(v.key==="Escape"){v.preventDefault(),o("close");return}if(v.key==="ArrowDown"){v.preventDefault(),s.value=Math.min(s.value+1,l.value.length-1),u();return}if(v.key==="ArrowUp"){v.preventDefault(),s.value=Math.max(s.value-1,0),u();return}if(v.key==="Enter"){v.preventDefault();const g=l.value[s.value];g&&(g.run(),o("close"))}}function u(){jn(()=>{i.value?.querySelector(`[data-idx="${s.value}"]`)?.scrollIntoView({block:"nearest"})})}function d(v){v.run(),o("close")}const f=ne(()=>{const v=new Map;return l.value.forEach(g=>{const h=v.get(g.group)??[];h.push(g),v.set(g.group,h)}),Array.from(v.entries())});function m(v){return l.value.indexOf(v)}return(v,g)=>(T(),He(yp,{"aria-label":"命令面板","max-width":620,"max-height":64,align:"top","top-pad-vh":12,onClose:g[1]||(g[1]=h=>o("close"))},{default:kt(()=>[p("div",{class:"cmd-head",onKeydown:c},[g[2]||(g[2]=p("span",{class:"cmd-icon"},"⌘",-1)),et(p("input",{ref_key:"inputRef",ref:r,"onUpdate:modelValue":g[0]||(g[0]=h=>Ye(a)?a.value=h:null),class:"cmd-input",type:"text",placeholder:"搜索命令、草稿、主题…",onKeydown:c},null,544),[[vt,I(a)]]),g[3]||(g[3]=p("span",{class:"cmd-hint mono"},"↵ 执行 · Esc 关闭",-1))],32),p("ul",{ref_key:"listRef",ref:i,class:"cmd-list"},[(T(!0),L(ae,null,Te(f.value,([h,w])=>(T(),L(ae,{key:h},[p("li",k3,z(h),1),(T(!0),L(ae,null,Te(w,A=>(T(),L("li",{key:A.id,class:Ce(["cmd-item",{active:m(A)===s.value}]),"data-idx":m(A),onMouseenter:M=>s.value=m(A),onClick:M=>d(A)},[p("span",C3,z(A.title),1),A.shortcut?(T(),L("span",$3,z(A.shortcut),1)):ue("",!0)],42,x3))),128))],64))),128)),I(l).length===0?(T(),L("li",E3,"没有匹配的命令")):ue("",!0)],512)]),_:1}))}}),A3=Oe(T3,[["__scopeId","data-v-ea7e7567"]]),I3=["value","placeholder","aria-label"],R3=Me({__name:"SearchBox",props:{modelValue:{},placeholder:{},ariaLabel:{},size:{}},emits:["update:modelValue"],setup(e,{expose:t,emit:n}){const o=n,s=te(null);return t({focus(){s.value?.focus()}}),(r,i)=>(T(),L("input",{ref_key:"inputRef",ref:s,type:"search",class:Ce(["search-box",e.size==="sm"?"search-box--sm":"search-box--md"]),value:e.modelValue,placeholder:e.placeholder,"aria-label":e.ariaLabel,onInput:i[0]||(i[0]=a=>o("update:modelValue",a.target.value))},null,42,I3))}}),M3=Oe(R3,[["__scopeId","data-v-647189fd"]]),O3={class:"help-shortcuts"},N3={class:"group-title mono"},L3={class:"shortcut-list"},D3={class:"item-title"},P3={class:"item-kbd mono"},B3={class:"help-containers"},F3={class:"container-cat mono"},j3={class:"container-list"},H3=["onClick"],V3={class:"container-name"},U3={class:"container-desc"},z3={key:0,class:"container-empty"},W3={class:"help-foot"},K3=Me({__name:"HelpPanel",props:{commands:{}},emits:["close","insert","restartOnboard"],setup(e,{emit:t}){const n=e,o=t;function s(){const f=new Map;return n.commands.filter(m=>m.shortcut).forEach(m=>{const v=f.get(m.group)??[];v.push(m),f.set(m.group,v)}),Array.from(f.entries())}const r=s(),i={structure:"文章结构",admonition:"提示",content:"内容",navigation:"导航",media:"媒体",signature:"签名",data:"数据图表",free:"兜底"},a=["structure","admonition","content","navigation","data","media","signature","free"],{query:l,filtered:c}=vp({source:()=>Js,predicate:(f,m)=>f.name.toLowerCase().includes(m)||f.description.toLowerCase().includes(m)||f.category.toLowerCase().includes(m)}),u=ne(()=>{const f=new Map;for(const m of c.value){const v=f.get(m.category)??[];v.push(m),f.set(m.category,v)}return a.map(m=>[m,f.get(m)??[]]).filter(([,m])=>m.length>0)});function d(f){o("insert",f.example),o("close")}return(f,m)=>(T(),He(yp,{"aria-label":"快捷键与帮助","max-width":560,"max-height":80,onClose:m[3]||(m[3]=v=>o("close"))},{default:kt(()=>[$e(bo,{title:"快捷键与帮助",onClose:m[0]||(m[0]=v=>o("close"))}),m[5]||(m[5]=p("section",{class:"help-intro"},[p("div",{class:"intro-line"},[p("strong",null,"wechat-typeset"),De(" 是纯浏览器里的微信公众号 Markdown 排版工具。 ")]),p("div",{class:"intro-line"}," 草稿保存在本地浏览器，切 tab / 关 tab 都不丢；一键复制后直接粘贴进公众号编辑器即可保留排版。 ")],-1)),m[6]||(m[6]=p("section",{class:"help-icons"},[p("div",{class:"group-title mono"},"移动端工具栏"),p("ul",{class:"icon-list"},[p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"●"),p("span",{class:"icon-desc"},[p("strong",null,"切换主题"),De(" — 更换排版风格与配色方案")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"＋"),p("span",{class:"icon-desc"},[p("strong",null,"插入组件"),De(" — 封面、引用、代码块等预置模板")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"◐"),p("span",{class:"icon-desc"},[p("strong",null,"自定义配色"),De(" — 调整强调色与文字颜色")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"···"),p("span",{class:"icon-desc"},[p("strong",null,"更多操作"),De(" — 导出、清空、三档样张（故事 / 组件参考 / 全功能展示）等")])])])],-1)),p("section",O3,[(T(!0),L(ae,null,Te(I(r),([v,g])=>(T(),L("div",{key:v,class:"shortcut-group"},[p("div",N3,z(v),1),p("ul",L3,[(T(!0),L(ae,null,Te(g,h=>(T(),L("li",{key:h.id,class:"shortcut-item"},[p("span",D3,z(h.title),1),p("span",P3,z(h.shortcut),1)]))),128))])]))),128))]),p("section",B3,[m[4]||(m[4]=p("div",{class:"group-title mono"},"容器速查 · 点击插入光标处",-1)),$e(M3,{modelValue:I(l),"onUpdate:modelValue":m[1]||(m[1]=v=>Ye(l)?l.value=v:null),class:"container-search",size:"sm",placeholder:"搜索容器名或用途（例：金句 / admonition / compare）","aria-label":"搜索容器"},null,8,["modelValue"]),(T(!0),L(ae,null,Te(u.value,([v,g])=>(T(),L("div",{key:v,class:"container-group"},[p("div",F3,z(i[v]),1),p("ul",j3,[(T(!0),L(ae,null,Te(g,h=>(T(),L("li",{key:h.name,class:"container-item",onClick:w=>d(h)},[p("code",V3,"::: "+z(h.name),1),p("span",U3,z(h.description),1)],8,H3))),128))])]))),128)),u.value.length===0?(T(),L("div",z3," 无匹配容器 ")):ue("",!0)]),m[7]||(m[7]=p("section",{class:"help-tips"},[p("div",{class:"tip-title mono"},"提示"),p("ul",null,[p("li",null,"双击草稿标题可就地重命名。"),p("li",null,"自定义配色改动即刻应用；切主题会还原为主题默认。"),p("li",null,"复制失败时请改用 Chrome / Safari 或关闭跨域预览。")])],-1)),p("footer",W3,[p("button",{class:"help-foot-btn",type:"button",onClick:m[2]||(m[2]=v=>o("restartOnboard"))}," ↻ 重新打开新手引导 ")])]),_:1}))}}),q3=Oe(K3,[["__scopeId","data-v-2f1c8e9d"]]),Ba="(max-width: 767px) and (pointer: coarse), (max-width: 540px)";function G3(){return window.matchMedia(Ba).matches}const z5="(min-width: 900px)",Y3={class:"onboard",role:"note","aria-label":"首次使用引导"},J3={class:"onboard-head"},Q3={class:"onboard-kicker mono"},X3={class:"onboard-title"},Z3={class:"onboard-body"},eA={class:"onboard-dots",role:"tablist","aria-label":"引导步骤"},tA=["aria-selected","aria-label","onClick"],nA={class:"onboard-actions"},oA={key:0,class:"onboard-foot"},ei=3,ti="onboard-spotlight",sA=Me({__name:"OnboardingCard",emits:["dismiss","openHelp"],setup(e,{emit:t}){const n=t,o=te(!1);let s=null;function r(){o.value=s?.matches??!1}const i=te(0),a=[{anchor:".btn-theme",title:"① 先选主题",body:"点工具栏的「主题名」按钮，主题决定配色、字距、装饰；切换瞬时生效。",next:"下一步 →"},{anchor:".btn-insert",title:"② 插入排版块",body:"点「+ 插入」打开组件库——提示块、金句卡、步骤、对比……一键插光标处。",next:"下一步 →"},{anchor:".btn-copy-main",title:"③ 一键复制到公众号",body:`按 ${_t} ↵ 或点工具栏「一键复制」，回到公众号编辑器粘贴即可。`,next:"完成"}],l=[{anchor:".btn-theme",title:"① 先选主题",body:"点上方「主题名」选不同视觉气质；预览实时更新。",next:"下一步 →"},{anchor:".btn-insert",title:"② 插入排版块",body:"点「+」插入提示块 / 金句卡 / 步骤等公众号常用版式。",next:"下一步 →"},{anchor:".mobile-tab-copy",title:"③ 一键复制",body:"底部「一键复制」按钮把富文本复制到剪贴板，去公众号粘贴即可。",next:"完成"}],c=ne(()=>o.value?l:a),u=ne(()=>c.value[i.value]);function d(){document.querySelectorAll(`.${ti}`).forEach(w=>{w.classList.remove(ti)})}function f(w){if(d(),!w)return;document.querySelector(w)?.classList.add(ti)}const m=te(null);function v(){jn(()=>m.value?.focus())}function g(w){if(w>=ei){h();return}i.value=w,f(u.value.anchor),v()}function h(){d(),n("dismiss")}return mt(()=>{s=window.matchMedia(Ba),r(),s.addEventListener("change",r),f(u.value.anchor),v()}),Gi(()=>{s?.removeEventListener("change",r),d()}),(w,A)=>(T(),L("aside",Y3,[p("header",J3,[p("span",Q3,"WELCOME · "+z(i.value+1)+"/"+z(ei),1),p("button",{class:"close",title:"不再显示","aria-label":"不再显示",onClick:h},"×")]),p("h4",X3,z(u.value.title),1),p("p",Z3,z(u.value.body),1),p("div",eA,[(T(),L(ae,null,Te(ei,M=>p("button",{key:M,type:"button",role:"tab",class:Ce(["onboard-dot",{active:M-1===i.value}]),"aria-selected":M-1===i.value,"aria-label":`第 ${M} 步`,onClick:R=>g(M-1)},null,10,tA)),64))]),p("div",nA,[p("button",{class:"onboard-skip",type:"button",onClick:h},"跳过"),p("button",{ref_key:"nextBtnRef",ref:m,class:"onboard-next",type:"button",onClick:A[0]||(A[0]=M=>g(i.value+1))},z(u.value.next),513)]),i.value===0?(T(),L("p",oA,[A[2]||(A[2]=De(" 想直接看快捷键？ ",-1)),p("button",{class:"onboard-link",type:"button",onClick:A[1]||(A[1]=M=>{n("openHelp"),h()})},"打开帮助")])):ue("",!0)]))}}),rA=Oe(sA,[["__scopeId","data-v-7f414c25"]]),iA={class:"toast",role:"status","aria-live":"polite","aria-atomic":"true"},aA={class:"toast-msg"},lA=Me({__name:"UndoToast",props:{message:{},duration:{}},emits:["undo","expire"],setup(e,{emit:t}){const n=e,o=t;let s=null;mt(()=>{s=window.setTimeout(()=>o("expire"),n.duration??4e3)}),Je(()=>{s!==null&&window.clearTimeout(s)});function r(){s!==null&&window.clearTimeout(s),o("undo")}return(i,a)=>(T(),L("div",iA,[p("span",aA,z(n.message),1),p("button",{class:"toast-undo",onClick:r},"撤销")]))}}),cA=Oe(lA,[["__scopeId","data-v-d3fcc27f"]]),uA={class:"copy-toast",role:"status","aria-live":"polite","aria-atomic":"true"},dA={class:"copy-toast-body"},fA={class:"copy-toast-text"},pA={class:"copy-toast-msg"},hA={key:0,class:"copy-toast-chips"},mA={class:"copy-toast-actions"},gA=Me({__name:"CopyResultToast",props:{message:{},details:{},cta:{},duration:{}},emits:["dismiss"],setup(e,{emit:t}){const n=e,o=t;let s=null;mt(()=>{s=window.setTimeout(()=>o("dismiss"),n.duration??6e3)}),Je(()=>{s!==null&&window.clearTimeout(s)});function r(){n.cta&&(window.open(n.cta.url,"_blank","noopener,noreferrer"),o("dismiss"))}function i(){o("dismiss")}return(a,l)=>(T(),L("div",uA,[p("div",dA,[l[0]||(l[0]=p("span",{class:"copy-toast-glyph","aria-hidden":"true"},"✓",-1)),p("div",fA,[p("span",pA,z(n.message),1),n.details&&n.details.length>0?(T(),L("span",hA,[(T(!0),L(ae,null,Te(n.details,(c,u)=>(T(),L("span",{key:u,class:"copy-toast-chip"},z(c),1))),128))])):ue("",!0)])]),p("div",mA,[n.cta?(T(),L("button",{key:0,class:"copy-toast-cta",type:"button",onClick:r},z(n.cta.label)+" →",1)):ue("",!0),p("button",{class:"copy-toast-close",type:"button","aria-label":"关闭",onClick:i},"×")])]))}}),bA=Oe(gA,[["__scopeId","data-v-6eb3f8ee"]]),yA={key:0,class:"error-boundary",role:"alert"},vA={class:"error-boundary__head"},wA={class:"error-boundary__title"},SA={class:"error-boundary__body"},_A={class:"error-boundary__message"},kA={key:0,class:"error-boundary__details"},xA={class:"error-boundary__stack"},CA=Me({__name:"ErrorBoundary",props:{fallbackTitle:{},logToConsole:{type:Boolean}},emits:["close","error"],setup(e,{emit:t}){const n=e,o=t,s=te(null),r=te(0);Ku(l=>{const c=l instanceof Error?l:new Error(String(l));return s.value={message:c.message||"未知错误",stack:c.stack},(n.logToConsole??!1??!1)&&console.error("[ErrorBoundary]",c),o("error",c),!1});function i(){s.value=null,r.value+=1}function a(){o("close")}return(l,c)=>s.value?(T(),L("div",yA,[p("div",vA,[p("strong",wA,z(e.fallbackTitle??"面板渲染失败"),1),p("button",{class:"error-boundary__close",type:"button",onClick:a},"关闭")]),p("div",SA,[p("p",_A,z(s.value.message),1),s.value.stack?(T(),L("details",kA,[c[0]||(c[0]=p("summary",null,"调用栈",-1)),p("pre",xA,z(s.value.stack),1)])):ue("",!0)]),p("div",{class:"error-boundary__actions"},[p("button",{class:"error-boundary__retry",type:"button",onClick:i},"重试")])])):Fo(l.$slots,"default",{key:r.value},void 0)}}),In=Oe(CA,[["__scopeId","data-v-a9a763ac"]]),$A={html:"",wordCount:0,readingTime:1,patchLog:{entries:[],total:0},pageConfig:{},frontmatterIssues:[]};function EA(e,t={}){const n=t.delayMs??80,o=t.immediate??!0,s=te($A);let r=null;function i(c){try{s.value=ip(c)}catch(u){console.error("[useDebouncedRender] render failed:",u),s.value={html:`<pre style="color:#c00;padding:16px;white-space:pre-wrap">渲染失败：${Y(String(u))}</pre>`,wordCount:0,readingTime:1,patchLog:{entries:[],total:0},pageConfig:{},frontmatterIssues:[]}}}function a(c){r!==null&&window.clearTimeout(r),r=window.setTimeout(()=>{r=null,i(c)},n)}function l(){r!==null&&(window.clearTimeout(r),r=null),i(e.value)}return je(e,c=>{a(c)},{immediate:o}),Je(()=>{r!==null&&(window.clearTimeout(r),r=null)}),{rendered:s,flush:l}}function TA(){const e=Kt({leftSlot:null,rightSlot:null,commandOpen:!1,helpOpen:!1}),t=ne(()=>({drafts:e.leftSlot==="drafts",components:e.rightSlot==="components",customizer:e.rightSlot==="customizer",checklist:e.rightSlot==="checklist",personaStudio:e.rightSlot==="persona-studio"}));function n(r){e.leftSlot=e.leftSlot===r?null:r}function o(r){e.rightSlot=e.rightSlot===r?null:r}function s(){e.leftSlot=null,e.rightSlot=null}return{ui:e,drawerStates:t,toggleLeft:n,toggleRight:o,closeAll:s}}const Ri={"academic-frontier":`# 关于对比学习中表征坍缩的一个新观察

::: abstract ABSTRACT
本文重新审视对比学习（contrastive learning）中的*表征坍缩*现象。不同于以往将坍缩归因于负样本不足的主流观点，我们在三个公开基准上的实验表明：**当批次规模固定时，温度系数 *τ* 的选择比负样本数量更能决定坍缩是否发生**。我们进一步给出一个理论解释，并提出一种不依赖于大批次的轻量级缓解方案。
:::

::: author 张三¹, 李四², 王五¹*
¹清华大学 交叉信息研究院  ·  ²上海人工智能实验室  ·  通讯作者：zhang@mails.tsinghua.edu.cn  ·  投稿日期：2026-04-20
:::

::: divider
:::

::: section-title 1 · 引言 variant=number-prefix
:::

## 1 引言

对比学习在自监督表征学习中取得了显著进展。SimCLR、MoCo、BYOL 等方法的核心思想是：把同一样本的两个增强视图拉近，把不同样本的视图推远。然而，当负样本不足时，所有样本的表征会坍缩到同一向量——这被称作 [.表征坍缩.]。

::: quote-card Theorem 1.1
设 *X* 为正则化后的表征空间，*τ* 为 InfoNCE 温度系数。若 *τ* 小于临界值 *τ**，则存在非平凡平衡态使得梯度沿维度收缩方向单调下降，坍缩概率 ≥ 0.5。
:::

本文的贡献有三：

- 给出温度系数 *τ* 与坍缩临界值 *τ** 之间的闭式关系
- 在 ImageNet-100 / CIFAR-10 / STL-10 三个基准上系统验证
- 提出 *τ*-adaptive 调度策略，推理成本几乎为零[^1]

## 2 相关工作

::: tip Definition.
设 *f*: *X* → *Y* 为表征映射。若对任意 *x₁*, *x₂* ∈ *X*，均有 ‖*f*(*x₁*) − *f*(*x₂*)‖ < *ε*，则称 *f* 发生了 *ε*-坍缩。当 *ε* → 0，退化为完全坍缩。
:::

::: info Methods.
我们在 ResNet-50 骨干网络上按 SimCLR 协议训练 200 epoch，batch size 固定为 256。所有实验在 8×A100 集群上完成，代码基于 PyTorch 2.1 与 \`timm\` 库。关键超参搜索范围：\`τ ∈ [0.05, 0.5]\`，\`lr ∈ [0.1, 1.0]\`。
:::

::: warning Limitations.
本文实验未覆盖大批次场景（*N* > 4096），对 BYOL 系列非对比方法不直接适用。另外，*τ*-adaptive 调度在 ViT 骨干上的表现仍需后续验证。
:::

::: danger Fallacy.
须指出一种常见的错误归因：将小批次下的坍缩完全归咎于负样本数量，并据此无限扩大批次——这忽略了温度 *τ* 的主导作用。我们在 §4.2 给出反例：即使 *N* = 8192，*τ* = 0.02 仍可诱发坍缩。
:::

::: note Aside.
本文将"坍缩"严格限定在表征层面，与文献中"模式坍缩"（mode collapse）的生成式定义不同；后者属另一支研究脉络。
:::

::: divider
:::

## 3 方法

::: steps 三阶段 τ-adaptive 调度
### 阶段一：暖启动
在前 10 个 epoch 固定 *τ* = 0.2，使表征在各向同性的高温下均匀铺开，避免早期过早对齐。

### 阶段二：平滑降温
第 10 至 100 epoch 按余弦曲线将 *τ* 从 0.2 降至 *τ**（数据集相关，CIFAR-10 上为 0.12）。此阶段模型开始收获判别力。

### 阶段三：稳态微调
后续 epoch 保持 *τ* = *τ** 不变，配合线性 lr 衰减。此时坍缩风险理论上最低。
:::

核心算法伪码如下：

\`\`\`python
for epoch in range(E):
    tau = schedule(epoch, tau_star)
    for x in loader:
        z1, z2 = f(aug(x)), f(aug(x))
        loss = info_nce(z1, z2, tau)
        loss.backward(); opt.step()
\`\`\`

## 3.1 研究时间线

::::: timeline

:::: timeline-item year=2020
SimCLR 与 MoCo 同期发表，对比学习进入爆发期；负样本数量被视作核心超参。
::::

:::: timeline-item year=2022
BYOL 与 Barlow Twins 展示"无负样本"路径，但坍缩机制的理论解释仍缺失。
::::

:::: timeline-item year=2024
温度系数 *τ* 与坍缩的关系开始在若干 workshop 论文中被独立观察到；本文是首篇系统性实证。
::::

:::::

::: divider
:::

## 4 实验

::: highlight Key Finding
在 CIFAR-10 上，*τ*-adaptive 将线性评估准确率从 84.3% 提升至 87.1%，而将 batch size 从 256 翻倍到 512 仅带来 0.4% 提升——**温度的收益显著大于批次的收益**，这与以往"批次越大越好"的主流观点相悖[^2]。
:::

### 4.1 消融对比

以下对比固定 batch size = 256，仅改变 τ 调度策略。

:::: compare

::: pros 方法 A · 固定 τ = 0.1（baseline）
标准 InfoNCE 配置，不做调度

- Top-1 准确率（CIFAR-10）：84.3%
- Top-1 准确率（STL-10）：79.6%
- 训练曲线抖动较大
- 对 batch size 敏感
:::

::: cons 方法 B · τ-adaptive（本文）
三阶段余弦调度，无额外参数

- Top-1 准确率（CIFAR-10）：87.1%
- Top-1 准确率（STL-10）：83.2%
- 训练曲线平滑收敛
- 对 batch size 鲁棒
:::

::::

::: divider
:::

## 5 结论

我们重新审视了对比学习中的表征坍缩现象，给出了 *τ* 与坍缩临界值的闭式关系，并提出一种几乎零成本的调度策略。代码与预训练权重将开源。

::: footer-cta ACKNOWLEDGEMENTS
感谢 XX 教授对本文初稿的审阅，感谢 YY 实验室提供 A100 计算资源。本研究得到国家自然科学基金（No. 62xxx）与上海市人工智能伦理委员会（No. AI-2026-xxx）资助。

CITE AS — 张三, 李四, 王五. (2026). 关于对比学习中表征坍缩的一个新观察. 公众号《学术前沿》, 第 42 期. DOI: 10.48550/arXiv.2604.12345
:::

::: recommend variant=academic-refs SEE ALSO · 相关工作导览
- *Wang & Isola, 2020* 的 alignment–uniformity 视角与本文温度主导观点互补
- *Dubois et al., 2022* 对小批次场景的分析可参照本文 §4.2
- OpenReview 上本文预印本：arxiv.org/abs/2604.12345v2 含扩展附录
:::

::: recommend REFERENCES
- [1] Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A simple framework for contrastive learning of visual representations. *ICML*, 1597–1607.
- [2] He, K., Fan, H., Wu, Y., Xie, S., & Girshick, R. (2020). Momentum contrast for unsupervised visual representation learning. *CVPR*, 9729–9738.
- [3] Grill, J.-B., Strub, F., Altché, F., et al. (2020). Bootstrap your own latent: A new approach to self-supervised learning. *NeurIPS*, 33, 21271–21284.
- [4] Wang, T., & Isola, P. (2020). Understanding contrastive representation learning through alignment and uniformity on the hypersphere. *ICML*, 9929–9939.
- [5] Liu, M. (2026). On temperature scaling in contrastive objectives. arXiv: 2604.01234.
:::

::: footnotes
[^1]: *τ*-adaptive 调度在推理阶段不引入任何额外计算：调度仅在训练中运行，推理时 τ 已固定为 *τ**。
[^2]: "批次越大越好"的观点主要来自 Chen et al. (2020) 的 Figure 9，其实验条件固定 τ = 0.07。本文结果在 τ 自适应条件下不再成立。
:::
`,brutalist:`# 粗野主义 · brutalist 主题示例

::: masthead INK issue="07" date="2026.05.16" kicker="第 07 期"
:::

:::: toc // CONTENTS
::: toc-item no="01" page="// p.03" 撕掉订阅
:::
::: toc-item no="02" page="// p.07" 印刷不死
:::
::: toc-item no="03" page="// p.12" 反 FEED 宣言
:::
::: toc-item no="04" page="// p.17" Q&A / CTA / fn[]
:::
::::

::: announcement 重要
// HALT / 本期停止数字分发 / 只印 200 份 / 邮购自取
:::

# INK · 当所有内容都在滚动，纸是唯一不动的东西

::: author
撰文　何印制

日期　2026.05.16
:::

::: abstract // TL;DR
推送不会停。算法不会停。==唯一能停下来的是你==——拿一份纸，把它握在手里，==不要让它变成 feed==。
:::

::: intro
你打开手机的那一秒，有人已经替你决定了接下来看什么。这不是推荐，这是饲养。
:::

::: section-title 撕 · 撕掉订阅 stamp=撕 variant=ribbon-stamp
:::

## 撕掉订阅

::: compare // 算法 vs 纸本
::: pros 纸本
- 单向阅读，无算法回路
- 没有点赞机制
- 留下后会被翻第二次
:::
::: cons 算法
- 双向回路，反复重赋权
- 数据驱动推荐
- 滑走就消失
:::
:::

::: steps // 退订流程 variant=split-row
### 01 // 取消关注
打开订阅列表，逐个取关。

### 02 // 清空消息
关闭所有推送通知。

### 03 // 留三个
只留对你最重要的三个。
:::

每一次「关注」都是一次授权。你授权一个算法替你筛选世界。

撕掉。现在。

拿一把美工刀，把你觉得"迟早会取关"的全取关了。今天。不是下周。

Black Flag 在 1981 年自己印 *Damaged*，因为主厂商说"太负面，不发"。他们没有去求别的厂牌。他们印。

::: image-caption src="https://placehold.co/800x600/1a1a1a/ebff00?text=PRINT+OR+DIE" alt="凌晨三点印刷厂" // FIG.01 · 凌晨三点四十一分 · 油墨还没干
照片作者自摄 // CC-BY-NC
:::

## 印刷不死

### 纸的物理性

纸张有重量。有气味。有摩擦。这些都是**抵抗力**。

屏幕没有阻力，所以你从来停不下来。纸要求你**翻页**——一个物理动作，一次注意力的锚定。

::: quote-card AARON LAKE SMITH · *BRIG* ZINE · 2019
印刷让文字变成物体。物体不会被 mute，不会被算法折叠，不会消失在 feed 底部。
:::

::: pull-quote
承诺是免费的，兑现才有价钱。
:::

### 独立印刷的三条命

1. Dischord Records：1980 年起，自建发行，从不卖给大厂
2. Bill Daniel：*Who Is Bozo Texino?* 拍了 20 年，手工复制，邮寄给陌生人
3. Crass：每张 EP 附赠一份 A4 折叠 zine，比唱片说的话更多

用代码说：\`zine.distribute(method="mail", copies=200, price="cost")\`。

\`\`\`
// print run 200
cut_stencil()
run_risograph(color="#ebff00")
fold()
staple()
ship_to(address=reader.po_box)
// done. no algorithm involved.
\`\`\`

::: note variant=editorial-stripe 编 · 者 · 按
印一份纸。找到 200 个人。把它塞进信封。这是行动，不是比喻。我们下期只邮寄，不上线。
:::

## 反 FEED 宣言

内容不等于信息。信息不等于知识。推送不等于选择。

当你在 feed 里"发现"一篇文章，那不是发现——那是投喂。

分享你手上的那份纸：[#](#)

::: qa-block // Q&A q="没有读者怎么办？"
200 份已经够了。Crass 第一张单曲只卖了几百张。没有人一开始就有读者。先印，再找人。
:::

::: info NOTE
risograph 印刷：单色每张成本约 0.3 元，200 份起印，最低门槛。
:::

::: tip TIP
用 A4 折三折，不用装订。读完可以撕开当书签。
:::

::: warning WARN
不要把 zine 的 PDF 版挂到公众平台。印刷物的稀缺性是它的力量。
:::

::: danger HALT
禁止把本期内容拆条发短视频。拆了就死了。
:::

::: note SIDE NOTE
"独立"不是美学标签——是拒绝让别人替你决定谁能看到你。
:::

::: divider
:::

::: footer-cta variant=triptych-actions like="LIKE" star="STAR ★" share="FWD →"
:::

::: qrcode variant=follow-card INK // ink.press desc="双月刊 · 纸本邮寄 · CC-BY-NC" kicker="// SCAN & ORDER"
:::

::: recommend [READ_NEXT]
- [Dischord Records 四十年：不妥协的发行模型](#)
- [risograph 入门：200 份 zine 的完整成本清单](#)
:::

::: footnotes
fn[1]　Black Flag, *Damaged*, SST Records 1981 —— 原定 MCA 发行，因内容被拒后自建 SST 独立发行

fn[2]　Aaron Lake Smith 编辑 *BRIG* zine，记录美国监狱系统；仅纸本发行，拒绝数字版
:::

---

::: colophon next="risograph 入门：200 份 zine 的完整成本清单" issue="第 07 期 · 2026"
:::
`,"business-finance":`::: cover 本期议题 · 消费信贷利率结构性下行
![封面占位](https://placehold.co/1200x630?text=business-finance+cover)

**核心判断**：2026Q1 居民部门利率弹性首次显著大于企业端，**银行业息差压力** 将从"负债端"转到"资产端"。
:::

::: author 研究员 · 张某某
2026Q1 · 阅读时长 8 分钟
:::

::: abstract 摘要 · ABSTRACT
本期就 2026 年一季度居民消费信贷利率走势作三段拆解：**一是** 新发放个人消费贷款加权利率
首次跌破 3.9%；**二是** LPR 非对称调整对结构性产品的定价传导；**三是** 我们对下一季度
商业银行息差压力的量化判断。全篇数据均取自央行 2026Q1 货币政策执行报告。
:::

::: key-number value="3.87%" 新发放个人消费贷款加权利率
2026Q1 同比下行 62bp，连续第 7 个月环比下降。
:::

::: divider
:::

## 利率结构性下行的三条证据

本章用三条证据 + 两个同比数据卡锚定 2026Q1 的**核心事实**。

### 证据一 · 新发放个人消费贷款利率

央行数据：2026 年 3 月新发放个人消费贷款加权平均利率 **3.87%**，同比下行 **62bp**，
连续第 7 个月环比下降。这是数据层面的"结构性下行"首次得到官方数字背书。

### 证据二 · LPR 非对称调整

1 年期 LPR 调降 10bp，5 年期仅调降 5bp。**非对称**的含义是：央行希望把刺激精确
投放在消费端（1Y 主导），而非继续鼓励居民加杠杆买房（5Y 主导）。

::: tip 要点
消费信贷利率结构性下行的**三条证据** —— LPR 非对称、居民贷款加权利率破 3.9%、
商业银行息差同比收窄 18bp。三条证据之间互为因果，非并列。
:::

::: info 补注
本文数据口径：央行 2026Q1 货币政策执行报告 + 上市银行季报披露值。加权利率
按贷款余额加权计算，与"新发放利率"口径略有差异，具体见附录 A.1。
:::

::: warning 风险提示
**数据存在口径差异**：央行公布的加权利率与上市银行披露值存在 12–18bp 偏差，
主要来自住房按揭贷款在加权计算中的占比差异。读者据此下结论前应自行核对。
:::

::: danger 警报
**本文不构成投资建议**。文中所有量化判断均为研究性质推演，不代表作者与机构立场。
A 股相关标的请读者根据自身风险偏好独立判断。
:::

::: note 口径说明
文中"信用债"统计口径不含同业存单与可转债；与 Wind 默认信用债指数样本存在约 7% 差异。
:::

::: divider
:::

## 数据卡 · 季度关键数字

::: highlight
**3.87%** · 2026Q1 新发放个人消费贷款加权利率

**▼ −62bp** 同比 · **▼ −18bp** 环比

*数据来源：中国人民银行 2026Q1 货币政策执行报告*
:::

::: highlight
**1.72%** · 2026Q1 上市银行加权平均净息差

**▼ −18bp** 同比 · **▼ −7bp** 环比

*数据来源：A 股 42 家上市银行季报加权平均，剔除城商行非标口径*
:::

::: divider
:::

## 核心判断 · 研究员 pull-quote

::: quote-card 张某某 · 资本市场研究院
我们判断 2026Q2 商业银行的息差压力**不会来自负债成本**，而会来自**资产端议价能力**的
持续让利。前者是央行可以直接干预的变量；后者是市场结构变量，难以通过政策工具直接逆转。
:::

> "利率市场化改革的终点，是资产端和负债端**各自回归**到各自的均衡定价路径上。"

::: image-caption src="https://placehold.co/900x400?text=NIM+Trend+2020-2026"
图 1 · 商业银行净息差走势（2020Q1–2026Q1）。数据来源：上市银行季报，作者整理。
:::

::: divider
:::

## 多空两面 · Ledger 账本

:::: compare

::: pros 多方观点
- 利率结构性下行 → 消费信贷需求释放 → 银行量升弥补价降
- 商业银行对公贷款定价权仍在 → 对公 ROE 维持稳定
- LPR 非对称下调对居民部门精准投放 → 地产风险敞口有限
- 一季度不良生成率边际改善 **0.08pp**
:::

::: cons 空方观点
- 息差连续 6 季度收窄 → 拨备前利润承压 → 分红能力下滑
- 城商行/农商行对公议价能力弱 → 首先受损
- 居民消费信贷违约率历史高位 → 量升未必弥补不良
- 一季度中间业务收入同比下滑 **14.3%** → 非息收入替代逻辑失效
:::

::::

**多空两面并置**，不代表择一而从 —— business-finance 的 compare ledger
是 "Bull Case vs Bear Case" 的多空对照，读者应合读二者之后**自判断**。

::: divider
:::

## 研究日程 · Phase I / II / III

::: steps 研究员下一步日程
### Phase I · 数据采集
完成央行报告 + 42 家上市银行季报交叉验证，剔除城商行非标口径偏差。

### Phase II · 量化模型
搭建息差压力三因子模型（负债成本 / 资产定价 / 中间业务），用 2020Q1–2025Q4 样本拟合。

### Phase III · 季度跟踪
按季度披露更新预测。下一季度报告预计 2026-07-25 刊发。
:::

::: section-title 附录 · 方法论与排版纪律
:::

### inline code 与代码块

按 <kbd>Ctrl</kbd> + <kbd>F</kbd> 在正文里找"息差"。inline \`code\` 走 bgMuted 底 +
**secondary 内参蓝**字色 —— 拒绝朱红承担代码色。

\`\`\`python
# 商业银行息差三因子模型（简化版）
def spread_pressure(cost_of_liab, asset_pricing, non_interest):
    return 0.45 * cost_of_liab + 0.38 * asset_pricing + 0.17 * non_interest
\`\`\`

::: note variant=research-dense 方法论
数据来源：中国人民银行 2026Q1 货币政策执行报告；A 股 42 家上市银行 2026Q1 季报。加权利率按各银行贷款余额加权，剔除城商行非标口径后与央行口径偏差 ≤ 5bp。三因子模型以 OLS 回归拟合 2020Q1–2025Q4 共 24 个季度数据，样本内 R² = 0.87。
:::

::: footnotes 参考文献
[1] 中国人民银行，《2026年第一季度货币政策执行报告》，2026年5月
[2] 各上市银行 2026Q1 季报，Wind 资讯整理
[3] 易纲，《利率市场化改革的逻辑》，中国金融出版社，2024
[4] BIS Working Paper No. 1124，Net Interest Margin Compression in Emerging Markets，2025
:::

::: divider
:::

## 延伸阅读与订阅

::: recommend 延伸阅读
- [2025Q4 商业银行息差拆解](https://example.com/a)
- [LPR 非对称调整的政策传导路径](https://example.com/b)
- [本刊往期财经专题](https://example.com/c)
:::

::: qrcode 扫码订阅《硬核财经》研究周报
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 关注「硬核财经」
不吹票、不带节奏，只讲值得下判断的数据。每周二清晨送到，30 分钟读完。

研究员 · 张某某　　2026Q1　　本文所有数据均已交叉核对
:::
`,"commerce-pulse":`::: announcement 限时特卖 · 距结束仅剩 8 小时
**双 11 年度最低价**——今日下单立减 300，明日恢复原价，错过等一年！
:::

# 2026 年最值得买的 10 款美妆好物

::: author
测评 **陈美仪**　编辑 **林晓颖**
:::

::: abstract 三句话读懂本文
① 本期 10 款好物均来自 2026 年 Q3 实测，含小样盲测与上妆对比。
② 全部附带当前最低价格与限时优惠码，直接跳转购买链接。
③ 精华 / 防晒 / 粉底三大品类各有一款年度推荐单品压轴。
:::

## 开场：为什么今年你不得不出手

去年双 11 我观望了，今年我后悔了——那款防晒现在涨了 **40 块**。这次我把自己实测了 3 个月的好物全部整理出来，附上当前最低价和测评结论，拒绝废话，直接开买。

::: tip 限时活动
本文所有商品均已核实 2026-11-11 档期价格，点击品名链接直达直播间 / 购物车，**活动截止今日 23:59**。
:::

## 品类一：精华液

::: section-title 精华液推荐 kicker="SERUM · 抗初老 / 提亮 / 修护" variant=kicker-stack
:::

### A 款：某雌马酸精华

三月实测，第 14 天开始有感，痘印淡化约 40%——不是"感觉变好了"，是闺蜜主动问我换了什么。

::: pull-quote
用了三个月，素颜也敢出门了，这不是我说的，是我妈说的。
:::

::: recommend 本期精选 · 精华液
**A 款雌马酸精华 30ml**｜原价 ¥398｜**到手 ¥268**

**B 款多肽精华 50ml**｜原价 ¥526｜**到手 ¥359**（含赠品小样 ×2）

**C 款维 C 亮肤精华 30ml**｜原价 ¥299｜**到手 ¥199**（新人礼盒装）
:::

### 价格横评

:::: compare
::: pros A 款雌马酸精华 value="¥268" caption="30ml · 到手价"
性价比最高，实测淡斑效果 TOP 1
:::
::: cons B 款多肽精华 value="¥359" caption="50ml · 到手价"
容量更大，适合混油肌，但质地偏厚重
:::
::::

## 品类二：防晒霜

::: section-title 防晒推荐 kicker="SUNSCREEN · 军训 / 海边 / 日常" variant=kicker-stack
:::

防晒的选择比精华更依赖肤质和使用场景。以下三款覆盖了"日常通勤 / 户外强防护 / 敏感肌"三个核心需求。

:::: table-card 三款防晒横评 variant=rule-grid
::: table-row
| 品名 | SPF / PA | 价格 | 适用肤质 | 推荐指数 |
|---|---|---|---|---|
| D 款隔离防晒 | SPF50+ PA++++ | ¥168 | 干皮 / 混皮 | ★★★★★ |
| E 款清爽防晒 | SPF50 PA+++ | ¥128 | 油皮 / 混油 | ★★★★☆ |
| F 款儿童防晒 | SPF30 PA++ | ¥98 | 敏感肌 / 儿童 | ★★★★☆ |
:::
::::

::: warning 库存告急
D 款隔离防晒库存显示仅剩 **47 件**，活动结束后恢复原价 ¥228，建议先下单再考虑。
:::

## 品类三：粉底液

粉底液是最难买的品类——色号差一点就翻车，所以我帮你们问了三个不同肤色好友，以下结论基于集体盲测。

::: quote-card 闺蜜盲测真实反馈
我们四个人试了 G 款，最白的姐妹 N10，最黄的姐妹 N30，全程没翻车。这款的贴合度是今年测过里最好的。
:::

::: steps 如何找到自己的色号
### 第一步：确认底色
对着自然光，看手腕内侧静脉颜色：蓝紫偏冷底，绿色偏暖底，蓝绿中性。

### 第二步：试色候选
在下颌线涂抹候选色号，自然光下等 5 分钟再判断，不要用室内灯光。

### 第三步：下单与退换
首单建议选平台支持"色号不符无理由退"的店铺，避免踩坑损失。
:::

## 购买 Q&A

:::: dialogue variant=qa-rows
::: dialogue-turn speaker="买家问"
小样测试颜色很合适，正装会不会有色差？
:::
::: dialogue-turn speaker="商家答"
小样与正装批次相同，不存在系统性色差。建议收货后先在手腕内侧试色，24 小时内可申请仅退款。
:::
::: dialogue-turn speaker="买家问"
是否支持开具发票？企业采购能用吗？
:::
::: dialogue-turn speaker="商家答"
支持开具增值税普通发票，企业采购请联系客服走对公渠道，可享 8.5 折团购优惠。
:::
::::

## 本期开销汇总

:::: gallery variant=duo
::: image-item
![开箱图 A](/assets/unbox-a.jpg)
精华液全家福（含赠品小样）
:::
::: image-item
![开箱图 B](/assets/unbox-b.jpg)
防晒 + 粉底液组合装
:::
::::

::: note
以上价格均为 2026-11-11 活动档期价，结算时以实际购物车为准。部分商品需领取店铺优惠券方可到手最低价。
:::

::: info 免责说明
本文所有测评基于博主个人真实购买体验，不涉及任何品牌付费合作；价格数据于发布前 2 小时确认，实时价格以平台为准。
:::

::: danger 版权声明
本文图文内容为博主原创，禁止未经授权转载；评测数据受数据保护协议约束，商业引用须联系作者授权。
:::

::: divider
:::

::: footer-cta variant=triptych-actions
:::

::: qrcode 扫码进直播间 desc="今晚 20:00 开播，现场演示上妆，粉丝专属额外折扣"
:::

::: footnotes 参考来源
[1] 各品牌官方旗舰店商品详情页，2026-11-11 活动档期价格截图存档
[2] 国家化妆品监督管理平台，产品备案查询，2026年9月
[3] 中检院化妆品重金属检测标准 GB/T 35828-2018
:::
`,"data-brief":`::: masthead 数字阅读观察 issue="2026Q1" date="2026.04.15"
:::

::: section-tag 数据
:::

# CNNIC 2026Q1 国民数字阅读行为调查简报

::: author
数据整理 **沈晓薇**　编辑 **程子谦**
:::

::: abstract 三句话读完本期
① 日均深度阅读时长 9 分钟，同比下滑 25%，连续三年创历史新低。
② 18–29 岁群体人均年完整书籍阅读量首次跌破 2 本。
③ 电子书渗透率升至 61.3%，但平均单次阅读时长仅 6.2 分钟。
:::

:::: toc 本期目录 · INDEX
::: toc-item no="01" page="p.03" 三项关键指标
:::
::: toc-item no="02" page="p.06" 阅读时长：年龄层分布
:::
::: toc-item no="03" page="p.10" 介质偏好与行为特征
:::
::: toc-item no="附" page="p.14" 方法论 · Q&A · 参考文献
:::
::::

::: divider
:::

:::: kpi-dashboard KEY METRICS · 三项关键指标 period="2026Q1 / YoY+QoQ" source="CNNIC · 全国国民数字阅读行为调查 · n=12,847 · 2026年1月"
::: kpi-item label="01 · MIN/DAY" caption="日均深度阅读时长" value="9" unit="分钟" delta="−25%" trend="down" series="14,13,12,11,11,10,10,10,9" foot="2023Q1 14分 → 2026Q1 9分"
:::
::: kpi-item label="02 · BOOKS/YR" caption="人均年完整阅读" value="1.8" unit="本" delta="−18%" trend="down" series="3,3,2,2,2,2,2,2,2" foot="18–29岁子群 · 首次跌破 2 本"
:::
::: kpi-item label="03 · PENETRATION" caption="电子书渗透率" value="61.3" unit="%" delta="+4.1pp" trend="up" series="48,51,54,56,58,59,60,61,61" foot="2023Q1 48% → 2026Q1 61.3%"
:::
::::

::: section-title 阅读时长：年龄层分布 kicker="SECTION 01 · TIME DISTRIBUTION" variant=kicker-stack
:::

## 阅读时长：年龄层分布

深度阅读定义为**单次不间断、持续 5 分钟以上**的阅读行为，不含短视频字幕与信息流摘要。18–29 岁群体日均 5 分钟，较 2023 年下降 38%；60 岁以上群体仍维持 31 分钟，同比基本持平（−2%）。

:::: bar-chart 日均深度阅读时长 · 按年龄分布 subtitle="单位：分钟 · n=12,847 · 置信区间 95% · 误差 ±1.4%"
::: bar label="60+" pct="82" value="31 分" 
:::
::: bar label="45–59" pct="55" value="21 分"
:::
::: bar label="30–44" pct="29" value="11 分"
:::
::: bar label="18–29" pct="13" value="5 分" tone="warn"
:::
::: bar label="<18" pct="8" value="3 分" tone="warn"
:::
::::

::: quote-card CNNIC · 2026Q1 报告执行摘要
数字化转型提升了内容触达效率，但碎片化分发机制与深度阅读时长之间存在显著负相关（r = −0.73，p < 0.01）。
:::

::: pull-quote
时代变得太快，慢的人反而成了风景。
:::

## 介质偏好与行为特征

### 电子书 vs 纸质书

电子书渗透率上升并未带动深度阅读量增长。调查显示，电子书用户平均单次阅读时长（6.2 分钟）显著低于纸质书用户（23.7 分钟），差距扩大至 17.5 分钟（2023Q1 为 12.1 分钟）。

:::: compare
::: pros 纸 质 书 value="23.7 min" caption="单次平均阅读时长"
:::
::: cons 电 子 书 value="6.2 min" caption="单次平均阅读时长"
:::
::::

### 阅读中断频次

用户在电子阅读器上的平均中断频次为每小时 **14.3 次**，手机端为 **28.6 次**；纸质书为 **2.1 次**。通知推送是主要中断源（占 61%），其次为社交应用切换（占 23%）。

:::: bar-chart 中断行为来源分布 subtitle="手机端 · n=6,203"
::: bar label="通知推送" pct="61" value="61%" tone="warn"
:::
::: bar label="社交切换" pct="23" value="23%"
:::
::: bar label="浏览器跳转" pct="9" value="9%"
:::
::: bar label="其他" pct="7" value="7%"
:::
::::

::: note variant=editorial-stripe 编 者 按
中断频次差异不可直接归因于介质本身，设备使用场景（通勤 vs 居家）对行为影响的独立贡献约为 34%（多元回归，已控制年龄与受教育程度）。
:::

::: tip 数据解读
**渗透率 ≠ 阅读量**。本期三项 KPI 不可线性合并：渗透率反映装机覆盖，阅读量反映行为完成，两者在样本层面分别加权。
:::

::: info 抽样口径
本期问卷题项涵盖 21 个城市样本，覆盖 6 类介质偏好。"深度阅读"题项采用 7 点 Likert 量表，回收率 92.4%。
:::

::: warning 数据警示
本期"完整阅读"自报口径与平台后台数据存在系统性偏差，受访者倾向高估约 14%（已在最终估计中校正）。
:::

::: danger 引用纪律
本简报数据仅供研究与教学；任何商业引用须保留 CNNIC 原始报告编号与本简报期号，**禁止单独剪裁单项 KPI**。
:::

::: divider
:::

## 方法论 · 附录

::: qa-block 读者来函 · Q&A q="电子书渗透率上升，为何完整阅读量反而下降？"
两个指标测量维度不同。渗透率衡量"是否使用"，完整阅读量衡量"是否读完"。本次调查中，电子书用户中仅 21.4% 在过去 12 个月内完整读完至少一本书（纸质书用户为 58.7%）。启动行为与完成行为之间存在显著落差（Δ = 37.3pp）。
:::

::: note 数据口径说明
"完整阅读"定义为读完书籍 80% 以上内容；电子书以平台阅读进度为准，纸质书以被访者自报为准。两类口径均经交叉验证（Cohen's κ = 0.81）。
:::

::: steps 抽样流程 variant=step-card
### 框定总体
全国 31 省级行政区，剔除年龄 < 14 的样本。

### 分层随机
城乡 6:4，按统计局 2025 年人口分层，三阶段抽样。

### 加权汇总
事后分层加权，整体误差 ±0.87pp。
:::

::: footer-cta variant=triptych-actions
:::

::: qrcode variant=follow-card 数字阅读观察 desc="每季度发布 · CNNIC 合作数据 · 订阅可获原始数据集"
:::

::: note variant=research-dense 方法论 · METHODOLOGY
样本：n=12,847，覆盖全国 31 个省级行政区，城乡比 6:4，分层随机抽样。调查时间：2026年1月6日—1月24日。深度阅读定义：单次持续 ≥5 分钟、未被通知或切屏中断。电子书渗透率统计口径：过去 30 天内使用电子阅读设备或 App 阅读书籍 ≥1 次。置信区间 95%，整体误差 ±0.87pp。加权方法：按国家统计局2025年人口抽样数据事后分层加权。
:::

::: footnotes 参 考 文 献
[1] CNNIC 第 57 次《中国互联网络发展状况统计报告》，2026年3月
[2] 全国国民阅读调查 2026Q1，中国新闻出版研究院
[3] OECD Digital Reading Behaviour Study 2025
[4] 国家图书馆全民阅读数据年鉴 2025
[5] 中国传媒大学媒介素养研究院，《数字阅读中断行为实验报告》，2025
[6] Nielsen Book Research，Global Reading Tracker Q4 2025
:::

::: colophon next="平台阅读完成率：付费墙与完读率的相关性分析" issue="2026Q1 · 第 012 期"
:::
`,default:`# 工具的工具 · 关于写作辅助软件的克制观

::: intro
一个工具好不好用，往往不在它能做多少，而在它愿意 ==不做== 多少。排版工具应当像好的字体——存在感越低，越尊重内容。
:::

::: author 编辑部 role=主笔
长期写作，偶尔折腾工具。记录关于写、读、做的真心话。
:::

::: announcement
本文内容已同步更新，修订说明见文末。
:::

## 为什么默认主题应该克制

每多一个装饰，作者就少一分自由。这话听上去像句空话，但凡用过那种"主题切了一圈，文字反而没法看"的编辑器，都会立刻明白。

==真正成熟的工具==，是在你**不需要**的时候安静下来，在你**需要**的时候恰好就位。

::: quote-card 王小波
把复杂写简单，是一种对读者的尊重；把简单写复杂，是对自己的谄媚。
:::

### 三个克制原则

::: tip 色彩稀缺
全篇只一个主色（编辑蓝），accent 与 primary 合一。一篇文章里超过两个强色就开始打架。
:::

::: info 字重不滥用
正文 15px / h2 19px / h3 16px——三档已够，再细分就是装饰过载。
:::

::: warning 装饰不抢戏
分隔线只用单根色线，不上花纹；引号回退到 Unicode 字符，不导出额外 SVG。
:::

::: note 第五态补注
note 不抢色——这是中性补注：题外话、补遗、不构成警示但读者可能错过的旁注。和 tip / warning / info / danger 四态形成互补。
:::

::: divider
:::

## 当你确实需要色彩

也有些信息**必须**靠色彩区分。比如 ⌘ + K 这种键位提示、比如代码段、比如一个本周关键数字。

按 <kbd>Ctrl</kbd>（或 <kbd>⌘</kbd>） + <kbd>K</kbd> 把富文本复制到公众号后台——一个键位完成"写 → 排 → 发"。

\`\`\`ts
import { renderPipeline } from './pipeline'
import { getTheme } from './themes'

const theme = getTheme('default')
const { html, wordCount } = renderPipeline({
  md: '# Hello wechat-typeset',
  theme,
})
\`\`\`

### 何时取舍

:::: compare

::: pros 选择 default
- 任何题材都不抢戏
- 切到其他主题后整体结构平移
- 用色仅一根主色，阅读疲劳低
:::

::: cons 暂不适合
- 强视觉签名需求（看封面就要识别 IP）
- 重符号语言的栏目（terminal / mook 风）
- 需要醒目数据卡的简报家族
:::

::::

::: highlight
中立不是没有立场，是把舞台让给文字本身。
:::

::: divider
:::

## 实战流程

::: steps 三步出稿
### 写初稿
左侧编辑器粘 Markdown，先保证结构。

### 套主题
顶部下拉切换；右侧 375px 实时预览。

### 一键复制
Ctrl / ⌘ + K 复制富文本到公众号后台。
:::

::: image-caption src="https://placehold.co/600x400?text=workflow" alt="工作流" 图 1 · 三步出稿流程
左侧 Markdown 编辑、中间主题切换、右侧 375px 实时预览。
:::

::: divider
:::

## 文末

::: footer-cta 如果对你有启发 cta=关注我
每周一篇深度，愿意被细细读完。
:::

::: recommend 看完本文还可以
- 切到 \`tech-geek\` 主题看代码段在琥珀终端里的样子
- 切到 \`literary-humanism\` 主题看引言与按语如何被素雅化
- 切到 \`data-brief\` 主题看数据卡如何替你说话
:::

::: qrcode text="https://github.com/lync-cyber/wechat-typeset"
扫码访问项目首页
:::
`,"editorial-mook":`::: masthead slow reading issue="05" date="2026.05.15"
:::

::: section-tag
特集 · 关于书店
:::

# 书店还活着，只是变了地址

::: author
沈听雨 · 2026.05.15
:::

:::: toc 目録 · 目次
::: toc-item no="❶" page="p.02" 書店不是圖書館
:::
::: toc-item no="❷" page="p.06" 選書這件事
:::
::: toc-item no="❸" page="p.11" 壓箱舊書與新書平台
:::
::: toc-item no="附" page="p.16" 讀者來信 · 編集後記
:::
::::

::: abstract 导读
书店在缩减，但爱书的人没有减少。他们只是换了一种相遇的方式。
:::

::: intro
走进一家陌生的书店，站在书架前，你并不知道自己在找什么。这是书店最独特的功能——不是帮你找到你要的书，而是让你遇见你还不知道自己需要的书。
:::

::: section-title 章 · 書店與時間 stamp=章 variant=ribbon-stamp
:::

## 书店不是图书馆

::: quote-card 從一家書店裡讀到了一座城
書店不是把書藏起來，是把人帶過來。一個城市好不好讀，先看它的書店願不願意把人留住。
:::

::: compare 一場關於書店的對話
::: pros 圖書館
- 借閱為主，不能塗寫
- 體系清晰，目錄為王
- 安靜，個人為單位
:::
::: cons 書店
- 購買為主，可圈點批註
- 體系個人化，編者為王
- 流動，群體為單位
:::
:::

::: steps 一日選書流程 variant=timeline-dot
### 晨間
新進到貨清點，按主題分類入庫。

### 午後
店主親自巡視書架，調整推薦面。

### 黃昏
合上門牌前最後一輪整理，旁邊放上明日推薦書單。
:::

\`\`\`text
書店的時間是慢的——
書進來，書出去，
人來，人去，
只有書架的位置慢慢偏移。
\`\`\`

书店的逻辑与图书馆不同。

图书馆要的是完备——每一本书都要在，每一个主题都要有代表。书店的逻辑是**选择**——它只要那些选书人愿意为之背书的书。

这一点差异，决定了两种完全不同的阅读入口。

> "你只要走进一家真正的书店，
> 就已经把自己交给了一个陌生的趣味。"

::: tip 參
本期特集的书店田野调查历时三个月，走访城市十一座，记录书目选择差异，访谈书店主理人及固定读者各十五名。
:::

### 选书的标准

一家书店的"选书观"是可以被读懂的。

走到哲学区，看它放了几个人的书；走到文学区，看译作与原著的比例；走到最角落的书架，看它在那里放了什么——角落往往最真实，因为那里不是给初次到访者看的。

::: info 編
日本独立书店"选书师"（ブック・ディレクター）这一职业在 2010 年代开始出现职业细分。代表人物幅允孝曾为餐厅、美容院、公共空间等非书店场所进行书目策展。
:::

## 压箱旧书与新书平台

### 旧书的市场逻辑

旧书价格不由印量决定，由**需要它的人数**决定。

一本发行五万册的哲学入门，网上的二手价可能不及定价三折；一本发行三千册的私人摄影集，旧书网上可能溢价两三倍。

- ❶ 稀缺性是主要变量
- ❷ 买家的具体需求决定溢价幅度
- ❸ 品相次于稀缺性，但出版年代更早反而可能加分

::: warning 注
转售旧书前请确认版权状态。部分限定版、机构内部版书籍流入二手市场存在一定版权模糊地带，购买时需注意卖家说明。
:::

### 书店的数字出口

线下书店与线上书单并不对立。

很多独立书店现在维持一份邮件订阅——每月寄一份"本月选书"，附上主理人手写的推荐语。这比算法推荐多了一个可追溯的"人"。

::: danger 禁
切勿在二手书交易平台将出版社赠阅样书（封面通常标注"样书·非卖品"）进行转售。此类行为损害出版社与作者权益，平台亦有举报机制。
:::

::: note 编者补注
本刊无赠阅样书赠送项目。如有合作出版社希望洽谈书评合作，请通过正式渠道联系编辑部。
:::

## 夜间书店的另一个功能

有一种书店，白天与晚上的客群完全不同。

白天来的，多半是有目的的——找一本具体的书，或者带孩子来看绘本。晚上来的，是来**待着**的人。

他们坐在窗边的椅子上，把手机放到包里，就这么坐着。这在别的地方会显得奇怪，在书店不会。

::: image-caption src=https://placehold.co/900x400?text=bookshop+night
上海某独立书店，夜间营业时段。书架间的过道窄，客人走得慢。
:::

书店能做到这一件事：让"发呆"合法化，让"无目的地待着"有了一个可以对自己交代的理由——"我在书店"。

::: note variant=editorial-stripe 编辑手记
本期特集策划始于一封读者来信，提问："还有多少书店值得再去一次？"我们没有给出清单，而是试图追问：什么样的书店让人"值得再去"？这个问题比清单更难回答，也更有意思。
:::

::: qa-block 讀者問答 q="城市越大，書店反而越難找到？"
大城市的书店在地图上越来越多，但真正"值得专程去"的在变少。规模大的书店往往选书趋同，勇于做个人判断的反而是那些十几平米的小店——它们的选书观比大书店更清晰，也更容易被理解。
:::

::: announcement
**第 06 期预告：** 插画师与他们的手稿——关于"过程"的另一种出版形态。
:::

::: footer-cta variant=triptych-actions like="❤  喜欢" star="★  收藏" share="↗  分享"
:::

::: qrcode variant=follow-card slow reading desc="隔周四夜刊行"
:::

::: author-bio name=沈听雨 role=编集人
读书、选书、写书话。本刊主编，负责每期特集策划与主稿。
:::

::: footnotes
①　本文田野调查期间书店均为正常营业状态，受访信息均获受访者确认。
②　旧书溢价数据来源：孔夫子旧书网 2025 年度交易报告，略有简化处理。
:::

::: divider glyph="❦"
:::

::: colophon next="插画师与他们的手稿" issue="第 06 期 · 2026"
:::
`,"edu-classroom":`# 如何给孩子讲"光合作用"

::: intro 学完你将能
- 用一句话说清楚"植物为什么是绿色的"
- 把光合作用分成**两个阶段**讲给孩子听
- 用厨房里的材料做一个简单实验，让孩子亲眼看到"气泡"
:::

::: cover 今日课题
**光合作用：植物如何"吃饭"？**

**适合年龄：** \`8岁以上\` **难度：** \`★★☆\`

_预计阅读 10 分钟 · 家长可与孩子共读_
:::

::: author 李晓梅 role=科学启蒙作者
最后更新：**2026-05-17** · 亲子共读约 10 分钟
:::

::: divider
:::

::: section-title 第一课题
今天我们要解答什么？
:::

## 一、先从一个问题开始

植物不需要"去超市买菜"，也不需要妈妈做饭——它们能自己**制造食物**。

这个过程就叫做**光合作用**（Photosynthesis）。

::: tip 小贴士
"光合"两个字可以这样拆解：**光**=太阳光，**合**=合成（制造）。所以光合作用就是"利用阳光来制造食物"。
:::

一片叶子，就是一座微型"食物工厂"。它需要三种原料：

1. **阳光**——能量来源
2. **水**——从根部吸收，通过茎运输到叶子
3. **二氧化碳**（CO₂）——从空气中吸收

工厂开工后，产出两样东西：

- **葡萄糖**——植物的"饭"（也是我们吃蔬菜时摄入糖分的来源）
- **氧气**——释放到空气中，我们才有新鲜空气可以呼吸

::: info 知识点
光合作用的化学方程式写出来是这样的：

\`6CO₂ + 6H₂O + 光能 → C₆H₁₂O₆ + 6O₂\`

不需要记住公式，只需要知道：**左边进去的是二氧化碳和水，右边出来的是糖和氧气**。
:::

::: divider
:::

::: section-title 第二课题
拆成两步来理解
:::

## 二、两个阶段，一个工厂

::: steps 光合作用的两个阶段
### 第一步：捕获光能（"充电"）

叶子里有一种叫做**叶绿素**的物质，它是绿色的（这就是为什么大多数植物是绿色的）。

叶绿素的任务是把阳光转化成化学能——就像给手机充电一样，把太阳的能量"存"起来。

### 第二步：合成糖分（"做饭"）

有了能量，植物就开始"做饭"：把二氧化碳和水拼在一起，做成葡萄糖。

同时，多余的氧原子结合成氧气（O₂），从叶片上的小孔——**气孔**——释放出去。
:::

::: quote-card 帮孩子记住的一句话
> 植物的叶子就是一座有太阳能电池板的厨房。阳光充电，空气和水做原料，做好的饭叫葡萄糖，"厨房废气"是我们要呼吸的氧气。

:::

::: divider
:::

::: section-title 第三课题
动手实验：亲眼看见气泡
:::

## 三、家庭实验：看到光合作用"工作"

::: announcement 实验前请准备
需要：透明玻璃杯、水、小苏打（约 1/4 茶匙）、一片新鲜菠菜叶或水草、强光手电筒。
:::

::: steps 实验步骤
### 第一步：准备溶液

在玻璃杯里加入清水，加入少量小苏打（提供 CO₂），轻轻搅拌溶解。

### 第二步：放入叶片

把菠菜叶撕成小片（或者放入水草），沉入杯底。

### 第三步：照光

用手电筒对着玻璃杯强光照射，等待 3–5 分钟。

### 第四步：观察

仔细看叶片上——会出现==细小的气泡==！这些气泡就是叶片正在释放的**氧气**。
:::

::: tip 小贴士
气泡越多，说明光合作用越旺盛。如果换用更强的光源（比如台灯），或者加入更多的小苏打，气泡会更明显。
:::

::: warning 注意
不要用热水——温度过高会杀死叶片里的叶绿素。用室温水或稍凉的水效果最好。
:::

::: divider
:::

## 四、常见问题解答

:::: dialogue 问答课堂

::: dialogue-turn speaker=孩子
植物晚上也在做光合作用吗？
:::

::: dialogue-turn speaker=解答
不做。光合作用需要阳光，没有光就不能工作。但植物晚上仍然在"呼吸"——消耗自己白天存下来的葡萄糖来维持生命，同时释放少量二氧化碳。所以晚上卧室里放很多植物，并不会让空气变新鲜。
:::

::: dialogue-turn speaker=孩子
仙人掌没有叶子，它怎么进行光合作用？
:::

::: dialogue-turn speaker=解答
仙人掌的茎是绿色的——那里就是它的"叶子"！茎里含有叶绿素，代替叶子完成光合作用。叶子退化成刺，是为了在沙漠里减少水分蒸发。
:::

::::

::: note variant=smallcaps-kicker layout=hanging 延伸阅读
海藻、苔藓、蕨类植物的光合作用原理与陆生植物相同，但叶绿素的种类有所不同，所以颜色从绿变红、变褐，各不相同。
:::

::: divider
:::

## 五、今日重点

:::: compare

::: pros 记住这些
- 光合作用 = 利用光能把 CO₂ + H₂O 变成葡萄糖 + O₂
- 叶绿素是绿色的，所以叶子是绿色的
- 晚上植物不做光合作用，只做呼吸作用
:::

::: cons 容易搞混的
- 光合作用 ≠ 呼吸作用（方向相反）
- 植物也会呼吸，不只是放氧气
- 叶子颜色不等于叶绿素多少（红叶也有叶绿素，只是被遮住了）
:::

::::

::: pull-quote
植物的每一片叶子，都是一座用阳光运转的微型工厂。
:::

::: divider
:::

## 六、推荐书单与延伸

::: recommend 适合亲子共读的科普书
- 《植物学家的笔记》——图文并茂，适合 8–12 岁
- 《看不见的森林》——描述一棵树一年的生命，深入浅出
- 《DK 自然百科》——高质量图鉴，家庭必备参考书
:::

:::: table-card 光合作用 vs 呼吸作用对比表

::: table-row
| 比较项目 | 光合作用 | 呼吸作用 |
|--------|---------|---------|
| 何时进行 | 白天（有光） | 全天 |
| 吸收什么 | CO₂ 和 H₂O | O₂ |
| 释放什么 | O₂ 和葡萄糖 | CO₂ 和水 |
| 能量方向 | 储存能量 | 释放能量 |
:::

::::

::: footer-cta 继续探索 cta=下一节：动物如何消化葡萄糖
动物吃了植物之后，这些葡萄糖去了哪里？能量是怎么被"提取"出来的？
:::

::: qrcode 关注「知识课堂」获取配套练习
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footnotes 参考来源
[1] 人教版初中生物八年级上册《光合作用》章节（2024年版）。
[2] 《植物学家的笔记》，吴宝俊著，中信出版社，2022。
:::
`,"industry-observer":`::: cover 专题头 · 技术并不淘汰公司 issue=023 date=2025-04-20 kind=周刊
![封面占位](https://placehold.co/1200x630?text=industry-observer+cover)

副标题：**淘汰公司的，是那些用新技术重新想象行业边界的人** —— 本期从三家正在试图
改写行业边界的公司讲起：它们的共同点、它们的分歧点、以及未来 18 个月最大的风险。
:::

::: author 林磊 role=深响编辑
:::

::: intro 本期观察
这周我们盯住三家公司：A、B、C。它们有一个共同点 —— 都在试图**改写行业边界**，
而不只是改写单个产品的形态。与上期（Issue #022）讨论的"平台越权"话题一脉相承，
这三家提供了三种不同的越权路径。
:::

::: abstract 全篇要点 · TL;DR
A / B / C 三家在 2024H2 完成"分发 → 交易"闭环。本期不做业务拆解（见 Issue #018），
只对照三条战略路径。判断：**未来 18 个月**监管对支付与金融许可的收紧将是关键变量。
:::

::: key-number value="40%+" 共同 GMV 同比增速
三家均跨过"分发渠道 → 交易闭环"临界点的核心信号。
:::

::: note 术语约定
本期所称"交易闭环" = 支付 / 物流 / 供给三要素闭合，不是"有购物按钮"那种弱定义。
不符合此定义的"带货链接"不计入 GMV 统计口径。
:::

::: divider
:::

## 一、三家公司的共同点

过去十二个月，A、B、C 三家公司分别在搜索、社交、电商三条主赛道上做了**同一件事**：
把原本是"分发渠道"的产品重新定位成"交易闭环"。这不是偶然，也不是三家公司各自的产品
战略巧合 —— **这是一轮更深层次的行业迁移的表征**。

### 1.1 "分发 → 交易"的迁移动力

==这个迁移的底层动力不是技术，是资本效率==。当流量增长见顶，提高单用户 ARPU 的
方法只剩两条：要么涨价（广告），要么把自己变成交易闭环（GMV）。三家都选了后者。

::: tip 要点
- **分发天花板**已至 —— 三家的广告收入同比增速都跌破 10%
- **交易闭环**是下一曲线 —— GMV 同比 40% 以上增长是共同信号
- **监管风险**同步抬升 —— 涉及支付与金融许可的平台监管会跟上
:::

::: info 背景
对不熟悉这三家公司的读者：A 是搜索起家的公司，B 是社交起家的公司，C 是电商起家的
公司。它们在**2024 年后半年**分别完成了交易闭环的关键拼图 —— 支付、物流、供给。
本期不做三家公司的商业模式拆解（那是 Issue #018 的主题），只谈"战略对照"。
:::

### 1.2 各家的差异

::: warning 存疑
A 公司当前的增长叙事高度依赖其海外业务（占比约 45%），而过去六个月海外监管口径
明显收紧。如果海外增长失速，A 的整个"分发 → 交易"故事线会失去最重要的支撑点。
**这是本期最不确定的一个判断**，欢迎业内读者在评论区提供反驳视角。
:::

::: divider
:::

## 二、赛道矩阵 · 三公司 × 四维度

下表列出三家公司在四个关键维度上的对照。**这张表本身不下结论 —— 结论在正文里讲**。
industry-observer 的矩阵纪律是"平行对照，零语义色"，不做 ledger 红绿账本。

:::: compare

::: pros 公司 A · 搜索路径
- 核心产品：**搜索**
- 营收结构：广告 80% / 交易 12% / 其他 8%
- 增长引擎：海外（北美 + 东南亚）
- 主要风险：**监管**（支付许可、跨境数据）
:::

::: cons 公司 B · 社交路径
- 核心产品：**社交**
- 营收结构：广告 60% / 交易 28% / 其他 12%
- 增长引擎：短视频与直播
- 主要风险：**流量到顶**（日活增速跌破 2%）
:::

::::

::: divider
:::

## 三、题辞 · 一段业内断言

::: quote-card 王兴 · 美团创始人 2024 内部信
技术并不会淘汰公司，淘汰公司的是那些用新技术**重新想象行业边界**的人。过去十年的
教训反复说明了这件事 —— 巨头并非败于技术落伍，而是败于对"边界"的固守。我们今天
所做的事，其实只是回答一个简单问题：如果我们今天从零开始做外卖，我们会怎么做？
:::

> 用 blockquote 承载裸引文："市场不会错，只有叙事会错。"叙事修复了，价格就回来了。
> Benedict Evans 风 pull-quote —— 左 1px 米纸边线 + textMuted + 无引号 SVG。

::: divider
:::

## 四、事件时间轴 · 赛道演化

:::: timeline

::: timeline-item year="2020" 行业萌芽
A 公司完成第一轮融资；B 公司的核心产品发布内测版；C 公司专注供应链切入，团队两百人。
:::

::: timeline-item year="2022" 群雄竞起
十二家创业公司拿到钱，赛道从"是不是伪需求"变成"如何跑出来"的竞速。A、B 完成基础设施构建；C 做出了被广泛模仿的交付模式。
:::

::: timeline-item year="2024" 洗牌开始
只剩三家还在加速；大部分小公司被头部吸收或转向。**真正的拐点是 Q3** —— 那个季度三家同时披露交易 GMV，形成了业内对"赛道第二曲线"的共识。
:::

::::

::: section-title 附录 · 关键数字与叙事化表述
:::

industry-observer 故意不做 business 的巨号数据卡。**数字叙事化**纪律示例：

- 过去五年，这个赛道的融资总额增长了 **约四倍**（而非 "增长了 397%"）
- 盈利公司数量从十二家降到 **不到五家**（而非 "降幅 66.7%"）
- 三家公司的用户重合度在过去十八个月 **从三成涨到接近五成**

::: highlight
**过去五年**，这个赛道的融资总额增长了 **约四倍**，但盈利公司数量从十二家降到了
**不到五家**。三家头部用户重合度从 **约三成**涨到 **接近五成** —— 数字服从洞察。
:::

::: image-caption src="https://placehold.co/900x400?text=Market+Share+Shift"
图 1 · 三家公司 GMV 占比演变（2020–2024）。数据来源：各公司财报，作者整理。
:::

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>K</kbd>（或 Mac 下 <kbd>⌘</kbd> + <kbd>K</kbd>）把文章复制到公众号
后台。observer 稿里 \`code\` 出现不多 —— \`bgMuted\` 底 + \`primary\` 字是冷静标识。

\`\`\`ts
interface IndustryObserverInput {
  issue: string
  date: string
  kind: '周刊' | '月刊' | '特辑'
  primaryThesis: string
}
\`\`\`

::: danger 错判
**战略错判示例**：2023 年 Q2，市场普遍认为 D 公司会在一年内跑出交易闭环。
结果 D 公司在 Q4 关停了交易业务，回归内容分发。这是 industry-observer 罕见使用 danger
容器的场景 —— 不是模糊警示，而是**"业内对某个判断已有定论"**的勘误条。
:::

::: divider
:::

## 五、未来 18 个月的关键节点

基于三家公司当前的战略态势，我们提炼出三个需要持续跟踪的关键节点：

::: steps 下一阶段观察日程
### Step 1 · 监管落地时间窗
2025 年 Q3 前，支付许可与跨境数据合规口径预计收紧。**A 公司海外业务**是最先受到
冲击的业务单元。需跟踪：季报里"国际收入"占比变化方向。

### Step 2 · GMV 增速拐点
若三家整体 GMV 同比增速在连续两季度后跌破 25%，"分发 → 交易"第二曲线叙事将
面临重新定价。用 GMV 增速斜率（不是绝对值）作为观察核心指标。

### Step 3 · 中小平台的接盘逻辑
当三家头部继续吸收流量时，中腰部平台的流量分发依赖度将进一步上升。这意味着
**渠道议价权**会从内容方向平台方迁移 —— 这是下一轮行业格局的前哨战。
:::

::: divider
:::

## 六、延伸阅读与参考

::: recommend variant=academic-refs 参考来源
- [平台越权：行业边界的历史演化](https://example.com/platform-overreach)
- [Benedict Evans: Retail, Amazon and Apple](https://benedict.evans/retail-2024)
- [Stratechery: The Aggregation Theory](https://stratechery.com/aggregation-theory)
:::

::: recommend 延伸阅读
- [产业观察 · Issue #019 | 互联网巨头的"搜索"围城](https://example.com/issue-019)
- [业内专访 · Issue #015 | 对话 A 公司 CTO](https://example.com/issue-015)
- [数据看点 · Issue #012 | 过去三年收购数据拆解](https://example.com/issue-012)
:::

::: author-bio name="林磊" role="深响资深编辑 · 行业观察专栏主理人" issue=023 date=2025-04-20
关注互联网平台经济六年，专注边界战争与格局演化。每周二清晨，一份 30 分钟可读完的深度稿。
:::

::: qrcode 扫码订阅「某某观察」 · 每周二更新
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
:::

::: footnotes 参考来源 · References
[1] CB Insights · 2026 Q1 Tech Industry Report
[2] 艾瑞咨询 · 中国 SaaS 市场季度数据 2026Q1
[3] 各公司公开财报，截至 2026-04-15
:::
`,"late-night-vinyl":`# 深夜电台 · late-night-vinyl 主题示例

::: masthead 夜读电台 · EP.04 date="ON AIR · 03:41"
:::

:::: toc
::: toc-item no="A1" page="08:12" Says · Nils Frahm
:::
::: toc-item no="A2" page="17:35" Music for Airports · Brian Eno
:::
::: toc-item no="B1" page="06:47" Organica · Hiroshi Yoshimura
:::
::: toc-item no="B2" page="09:03" LesAlpx · Floating Points
:::
::::

::: cover EP.04 · 那些只在深夜成立的歌单
*四首 BPM 60 以下的曲子，与你在 03:41 相遇*

主播　·　**罗离线**　　·　　录音　·　2026.04.22 · 03:41
:::

::: author
主播　罗离线　|　制作　夜读电台工作室　|　EP.04 · 2026.04.22
:::

::: intro
有些歌只在深夜成立。白天放，它就是背景噪音；凌晨三点放，它是整个房间。

这期节目，我想说的不多——让歌自己说。
:::

::: section-title B · BPM 60 stamp=B variant=ribbon-stamp
:::

## 为什么是 BPM 60

::: quote-card Brian Eno · *Music for Airports* sleeve · 1978
我做的不是背景音乐，是一种允许你不去听的东西——但它会一直在那里，等你回过头来。
:::

::: pull-quote
深夜不是用来追赶白天的，是用来给白天还账的。
:::

::: compare 白天 vs 深夜
::: pros 白天歌单
- BPM 90+，推你向前
- 多人混音，群体共鸣
- 旋律带钩，方便记忆
:::
::: cons 深夜歌单
- BPM 60-，与心跳同步
- 多为独奏 / 环境音
- 没有钩，留下气氛
:::
:::

::: steps 选曲方法 variant=split-row
### 01 测心率
确定听者夜间静息心率（多数 55–65）。

### 02 匹配 BPM
首曲 BPM 60 附近，后续逐渐 ±5。

### 03 留呼吸
每两曲之间留 8–12 秒静默。
:::

人在睡前心率下降到每分钟六十次左右。BPM 60 的音乐不是在"放松"你，是在和你的身体对齐。

Nils Frahm 的 *Says* 从 08:12 第一秒起就知道这件事。钢琴泛音落下来的速度，和呼吸周期咬合——不是巧合，是作曲家的刻意。

::: image-caption src="https://placehold.co/800x600/0e1a2b/d97a3c?text=vinyl+03%3A41" alt="黑胶唱片特写" FIG. · 03:41 · side-a opening
1972 年的旧黑胶，B 面还完整。落针那一刻的静电声，是这期节目最好的开场白。
:::

## 四首曲子的选择逻辑

### A 面：钢琴与电子的边界地带

*Says* 是 Nils Frahm 2013 年专辑 *Spaces* 里的现场录音。八分十二秒里，钢琴循环与合成器缓慢堆叠，像雾在室内升起。

*Music for Airports* 是 Brian Eno 1978 年为候机厅创作的环境音乐。他说：

> 「环境音乐必须同时适合主动聆听和被忽视。」
>
> —— *Brian Eno · 1978 · Ambient 1 liner notes*

十七分半，你可以进进出出，它始终在那里。

### B 面：自然声场的两种处理

在节目制作系统里，每次录音前我们会记录一次播放状态：\`now_playing.status\`。

\`\`\`
// on air  03:41
now_playing = {
  artist: "Hiroshi Yoshimura",
  track:  "Organica · side-b",
  bpm:    52,
  key:    "D minor"
}
\`\`\`

吉村弘（Hiroshi Yoshimura）的 *Organica* 来自他 1993 年的同名专辑，水声与合成器纹理交织，比 *Music for Plants* 更晚期，也更沉。Floating Points 的 *LesAlpx* 则走另一条路：jazz 底色，但织体像 ambient，弦乐渐入时有一种克制的尖锐感。

::: note variant=editorial-stripe
凌晨三点录音和下午三点录音，说出来的话不一样。不是因为疲惫，是因为这个时段会让人诚实一些。这四首曲子都是我在某个无法入睡的夜晚里找到的，当时都没想着要放进节目。
:::

## 深夜音乐的听法

夜场和日场的区别，不在于音量，在于注意力分配的方式。

白天听音乐：音乐服务于任务。  
深夜听音乐：你服务于音乐。

关上屏幕，[告诉我你在哪首曲子里走神了](#)。

::: author-bio
**罗离线**　·　夜读电台主播

做过五年唱片店夜班，习惯在大家都睡着之后才开始播放。EP.01 起每周四 03:41 AM 准时上线，至今不晚点。喜欢旧黑胶、B 面、以及所有在安静里才能听见的细节。
:::

:::: timeline
::: timeline-item year="00:00"
开场白 + 落针静电声：今晚的四首曲子与选择理由
:::
::: timeline-item year="03:41"
A1 首播：Says · Nils Frahm（08:12）钢琴循环 fade in
:::
::: timeline-item year="14:20"
A2：Music for Airports · Brian Eno（17:35）环境音乐大段
:::
::: timeline-item year="35:00"
听众来信 + B 面开盘：Organica 与 LesAlpx 交替播出
:::
::::

::: qa-block q="主播，ambient 和 lo-fi 有什么区别？"
Lo-fi 是有节拍的，ambient 通常没有。Lo-fi 是陪你工作，ambient 是陪你消失一会儿。
:::

::: info cue
耳机优于音箱。这四首曲子都有需要靠近才能听见的细节。
:::

::: tip b-side
Khruangbin 的 *A Hymn* 是本期的隐藏曲目，不在歌单里，只在片尾静静出现。
:::

::: warning static
手机推送通知会打断 Eno 的结构性静默——那段沉默是音乐的一部分。
:::

::: danger off-air
Cigarettes After Sex 的专辑适合 EP.05，不适合今晚。今晚太密了。
:::

::: note 主播旁白
Ryuichi Sakamoto 曾说，他晚年最喜欢录下窗外的雨声，因为那是他听过最好的"作品"。今晚 B 面的最后三分钟，我放了一段录于深夜的静默。
:::

::: divider
:::

::: footer-cta variant=triptych-actions like="♡ 喜欢" star="★ 收藏" share="↗ 分享"
:::

::: qrcode variant=follow-card desc="每周四 · 03:41 AM 准时上线" kicker="tune · in"
:::

::: recommend 深 夜 选 听
- [Floating Points · Elaenia 全碟深听](#)
- [Hiroshi Yoshimura · Music for Nine Post Cards](#)
:::

::: footnotes
※　本期 A 面配乐：Nils Frahm — *Says*（Erased Tapes Records · 2013）

※　本期 B 面：Hiroshi Yoshimura — *Organica*（Victor Entertainment · 1993）

※　片头静电音效取自 1976 年 SONY PS-4750 黑胶放映机
:::

---

::: colophon next="Khruangbin · 城市波普的 B 面结构" issue="EP.05 · 2026.04.29"
:::
`,"life-aesthetic":`# 梅雨季的厨房 · 把潮湿过成一种腔调

::: cover 本期主题
![封面占位](https://placehold.co/1200x630?text=life+aesthetic)

_一盏茶、一扇窗、雨天才有的那种按耐不住的慢。_
:::

::: author 如初 role=生活作者
写于梅雨第七天，窗玻璃上还挂着水珠。
:::

::: intro 关于梅雨
南方的梅雨是会黏人的——它不像台风那样轰轰烈烈地来，就是低着头、拉着你的袖子，说：别走了，你哪儿也去不了。我慢慢觉得，梅雨季是适合做饭的。锅里炖着什么，雨在打着什么，时间就这么过了。
:::

::: divider
:::

## 一、梅雨天的采买逻辑

早市在七点半就散了，因为菜叶子受不了潮气。==我学会了六点四十就出门==，带上一个旧布袋，不定目标，看到什么带什么。这一点与晴天不同：晴天可以列清单，梅雨天只能随缘。

那天菜场里剩着一把茭白、半筐小番茄，还有一位阿姨手边散散的一捧薄荷。我都买了。回家坐下来想了十分钟，决定做一锅清汤，薄荷最后撒。

### 1.1 梅雨季的储藏方法

食物比平时更容易潮，这是事实。但潮不等于坏——红糖潮了可以炒，花生潮了可以晒，米潮了可以做炒饭，淡淡的焦香会盖掉水汽的气息。

::: tip 一个小经验
薄荷叶用湿纸巾裹着放冰箱，两天内还是活的，入汤时撕着放，香气更集中。梅雨天做汤少放盐，鲜味自然就出来了——潮湿的空气本身已经带了一点咸腥。
:::

### 1.2 关于慢炖的时间感

梅雨天做慢炖有一个好处：你不会觉得时间在浪费。窗外在下雨，你本来也无处可去，于是那两小时就不是"花掉"的，而是"好好用掉"的——这一字之差，在感受上非常不同。

::: divider
:::

## 二、手账里的两种气候

:::: compare

::: pros 晴天的厨房
- 可以开窗，油烟跑得快
- 食材新鲜，选择宽裕
- 炒菜的锅气更旺
- 饭后可以出门散步消食
:::

::: cons 梅雨天的厨房
- 关窗怕潮，开窗进雨，两难
- 食材要当日买当日用
- 更适合炖煮，不适合爆炒
- 饭后只能在屋里转圈
:::

::::

其实两种都有味道。晴天的厨房是热闹的，梅雨天的厨房是话少的。话少不是冷清，是专注。

::: divider
:::

## 三、一个下午的节律

::: steps 梅雨天的厨房节奏
### 撇沫
大火开锅，等第一层泡沫浮上来，用汤勺撇干净。这个动作像做任何事之前先清空一点空间。

### 转小火
把火拨到最小能维持沸腾的位置，锅盖留一条缝。然后就可以离开了——厨房会自己工作。

### 去做别的事
泡一杯茶，看看书，或者就坐在窗边听雨。每二十分钟回来看一眼是否还在沸着。

### 收汤
两小时后汤变得浑厚，颜色深了一档。关火，薄荷撒进去，盖盖子焖三分钟，开盖，香气先出来了。
:::

::: divider
:::

## 四、汪曾祺说的那句话

::: quote-card 汪曾祺 · 《五味》
一个人的口味要宽一点，杂一点，对生活才有兴趣。
:::

> 他的文章里总有厨房，厨房里总有具体的食材、具体的火候——那些细节不是"干货"，是腔调。

::: info 小知识
茭白原产中国，宋代已有种植记录。《本草纲目》称其"甘冷，滑，解烦热，去肠胃热。"梅雨天吃茭白从中医角度正好对症——这是凑巧，不是我刻意的。
:::

::: divider
:::

## 五、留给明天的事

::: highlight
今天炖了汤，骨头留着。晒干，装进一个旧铁罐。下次做汤时直接放进去，又是一锅不同的味道。
:::

::: warning 别急
潮天里食物容易变质，但也不必每隔一小时就打开冰箱确认。东西放进去了就信任它——就像把一件事交出去之后，不要一直追问进展。
:::

::: note 关于薄荷
薄荷有很多种，市场上常见的是胡椒薄荷和绿薄荷。入汤用绿薄荷更温和，胡椒薄荷的清凉感太强，喧宾夺主。若买不到薄荷，紫苏叶也是梅雨天厨房的好伴。
:::

::: divider
:::

## 六、镜头里的那碗汤

::: image-caption src=https://placehold.co/900x500?text=slow+kitchen
茭白清汤，薄荷浮在表面，砂锅搁在一块青布上。窗外雨声未歇。
:::

拍完这张照片，我把手机放到一边，端着碗坐到窗边。雨还在下。汤是热的。

::: divider
:::

::: section-title 七 stamp=七 variant=ribbon-stamp
:::

## 七、与你分享的几件事

::: recommend 延伸阅读
- [梅雨天的另外三道菜](https://example.com/rainy-recipes)
- [汪曾祺的饭桌与他的文章](https://example.com/wang-zengqi)
- [砂锅的选购与养护](https://example.com/clay-pot)
:::

::: qrcode 一起慢生活
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: author-bio name=如初 role=生活随笔作者 avatar=https://placehold.co/80x80?text=avatar
记录日常里值得记下来的那些小时刻。食物、节气、窗外的天色。每周更新一次，不赶日子。
:::

::: footer-cta 如果你也在下雨 cta=来陪我慢生活
每周末一篇生活随笔，一道时令菜谱，一些可以慢下来的小事。
:::

::: footnotes 此前的几篇
- 《雨夜的小米粥》是上个梅雨季的第一篇。
- 《茶事记》写过焙茶的湿度容忍线。
:::

如果想自己上手——

\`\`\`text
雨天厨房三件套：
- 干燥剂
- 砂锅
- 留两扇窗的对流
\`\`\`

`,"literary-humanism":`# 一本书与它的旁批者

::: cover 卷首语 · 岁在丙午清明
![封面占位](https://placehold.co/1200x630?text=humanism+cover)

_写于清明前后，庭院里桃花落了满地。_
:::

::: intro 题解
读书人有一个共同的毛病：爱在书上乱写。朱笔、铅笔、毛笔，甚至指甲——旁批、眉批、圈点、校勘，代代叠加，一本书最终成了多个读者的合唱。本篇所讨论的，就是这件事的意义。
:::

::: author 钟山 role=主笔
长读深耕，短评不妄。清明前后。
:::

::: divider
:::

## 一、批注作为阅读的身体动作

古人读书，笔不离手。不是因为记性不好，而是因为手的动作本身就是思维的一部分。==毛笔落在纸上的那一刻，批者与作者已在时间里握手==。这不是夸张——苏轼批韩愈的"气盛言宜"，就是在这个动作里发生的。

读者在边角留下的字，有时比正文更耐看。因为那些字不是表演给任何人看的，只是把一个瞬间的念头定住——与其说是注释，不如说是私语。

### 1.1 "眉批"与"旁批"的分工

眉批通常是全局判断，如："此节是全篇枢纽"；旁批是局部反应，如："此句有味"。二者合看，可以还原一个读者阅读时的完整心理运动。清人批《红楼梦》时，常把主观感受与文本分析并置，就是靠这两者分工实现的。

::: tip 按
"眉批"得名于写在书页天头（眉处）。古代雕版书天头往往留有三至四厘米空白，正是为批校设计。
:::

### 1.2 批注的密度

批注过密，反而成了另一种噪音。最能说明问题的是金圣叹批《水浒》——他在最精彩的一段前只写了一个字："妙"。

::: warning 疑
金圣叹腰斩《水浒》，后世批评家对此看法不一。此处援引，仅就批注密度这一点立说，不涉及对删改行为本身的评判。
:::

这个"妙"字，比长篇分析更有力量——不是因为简短，而是因为它把阅读者的震动原样保存了下来。

::: divider
:::

## 二、甲说乙说 · 批注者的两种心态

:::: compare

::: pros 甲说 · 批注是对话
- 批注使书成为跨越时代的往来信件
- 与作者争辩，才能真正理解作者
- 一本有密批的书，等于一段思想史
:::

::: cons 乙说 · 批注是干扰
- 他人的眉批会先入为主影响判断
- 初读一本书，干净的白本更好
- 批注者的趣味未必与你一致
:::

::::

两说并无高下；关键在于：你是第几个读这本书的人。初读时保持空白，重读时才放开来批——这或许是一个折中的方法。

::: divider
:::

## 三、一段题辞

::: quote-card 苏轼 · 答谢民师推官书
辞达而已矣。辞至于能达，则文不可胜用矣。凡事之难易，皆出于人之所欲为与所不欲为，非天下之公难也。
:::

> 书页两侧的双竖线是裸引用的标记——这段苏轼原文本该写在某本书的旁边，批者把它整段抄在下一张纸上，变成了独立的题辞。

::: divider
:::

## 四、读书的卷次

::: steps 读一本有旁批的旧书
### 卷一 · 先读正文
遮住所有批注，只看作者本人的叙述。让自己形成第一印象，哪怕模糊。

### 卷二 · 读前人的批
对照正文，看别人在哪里停下来了、在哪里皱眉了。把自己的感受与他人的感受并排放着。

### 卷三 · 写自己的批
现在才动笔。用不同颜色与前人区分。你在这本书上留下的，是这本书流传过程中的第几层墨迹？
:::

::: section-title 附录 · 旁批用具小史
:::

从竹签到毛笔，从铅笔到荧光笔，批注用具的变化本身也是一段阅读文化史。竹签划过书页留下的压痕，某种意义上比墨迹更耐久——纸可以褪色，但压痕在一定湿度下还能重现。

::: info 注
宋元刻本中常见的"圈点"并非随意涂鸦，而是有固定符号体系：圈（○）表示精彩，点（·）表示重要，竖（丨）表示存疑。这一体系在清代仍被广泛沿用。
:::

::: divider
:::

## 五、形式的意义

::: highlight
==一本书在流传过程中积累的所有批注，构成了它的阅读史。== 而阅读史，有时比作品本身更能说明那个时代的人在想什么。
:::

::: danger 辨
"旁批使书增值"这个说法在旧书市场里是事实，但并非所有批注都值得保留。名人批注因稀缺而溢价；普通读者的密批往往反而降低可读性。两者不可混为一谈。
:::

::: note 补注
本节所言"批注"限于手写批注。现代数字阅读平台的"划线与高亮"功能在技术上近似，但无法还原毛笔落纸的触觉反馈，也无法被后代读者"再批注"，故不在讨论范围内。
:::

::: divider
:::

## 六、图像里的批注者

::: image-caption src=https://placehold.co/900x500?text=annotated+book
一册清代旧抄本，天头眉批与正文行间并存三家笔迹，最晚一家约为民国初年。
:::

这类多代叠批的旧本，在古旧书肆里并不罕见。旧书商有时把它们叫做"有故事的书"——故事不在正文里，在那些细小的朱笔字里。

::: divider
:::

## 七、延伸阅读与订阅

::: recommend 延伸阅读
- [章学诚《文史通义》论批注体例](https://example.com/zhang)
- [金圣叹批本《水浒》的版本学问题](https://example.com/jin)
- [读库 · 旧书旧事特辑](https://example.com/dk)
:::

::: qrcode 扫码加入书话小组
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: author-bio name=钟山 role=主笔
长读深耕，短评不妄。主持"书页边"系列，已刊散文二十余篇。联系方式见公众号简介。
:::

::: footer-cta 每周一封长信 cta=加入人文札记
写我最近读到的那一本，以及书页边角的那些私语。
:::

抄录一段读书圈点的旧法，作为收笔——

\`\`\`text
○  精彩处加圈
·  要点处加点
丨 存疑处加竖
※ 大段不解处加米花
\`\`\`

::: footnotes 卷末附记
[1] 文中所引《围城》《白先勇细说红楼梦》《读库》等，均为坊间通行版本，不另注页码。
[2] 凡引旧人长文者，皆经版本对勘，与作者书信往来核实。
:::
`,"official-gazette":`---
theme: official-gazette
---

::: announcement
**重要公告：** 本文件为模拟示例，用于展示公文公报主题视觉效果，不构成任何实际法律文件或监管指引。
:::

::: cover 关于印发《某某信息技术安全管理办法（试行）》的通知
某某部门〔2026〕第12号

各省、自治区、直辖市及新疆生产建设兵团相关部门，各有关单位：
:::

::: author 某某监管部门
发文日期：二〇二六年五月十七日　　文号：某某〔2026〕12号
:::

::: intro
为贯彻落实党中央、国务院关于信息技术安全管理的决策部署，规范信息技术产品的安全管理，维护国家信息安全和社会公共利益，依据《网络安全法》《数据安全法》等有关法律法规，制定本办法。
:::

## 总则

### 第一条　立法目的

本办法适用于在中华人民共和国境内从事信息技术产品研发、生产、销售和使用的单位和个人，旨在建立健全信息技术安全管理制度，防范化解重大信息安全风险。

### 第二条　适用范围

凡在本辖区内注册的企业法人、事业单位及其他组织，涉及以下业务范围的，须遵照本办法执行：

- 关键信息基础设施的建设与运营
- 重要数据的收集、存储、处理与跨境传输
- 具有特定功能的网络产品与服务的研发和推广
- 其他依法须申报审批的信息技术活动

::: tip 附注
本办法所称"关键信息基础设施"，依照国务院相关条例的界定执行。运营者应参照主管部门发布的最新认定标准，对照自查。
:::

## 申报与审批

::: section-title
申报要求
:::

::: quote-card 《某某监管部门工作纪要》第三条
"申报材料的真实性、完整性、及时性，是开展业务前置审批的基础。"
:::

申报主体须在开展业务前**三十日内**向主管部门提交书面申请，并附具下列材料：

::: steps
1. 营业执照及组织机构代码证复印件（需加盖公章）
2. 信息安全管理制度说明书及技术方案说明
3. 具备相应资质的第三方评估机构出具的安全评估报告
4. 主要负责人及信息安全管理员身份证明材料
5. 法律法规要求的其他材料
:::

::: info 背景说明
国家已建立统一的申报信息系统，申报单位可登录"国家信息安全申报服务平台"在线填报。纸质材料须与电子版内容一致，并由法定代表人签字盖章后报送。
:::

## 监督检查

主管部门依法对辖区内相关单位开展定期检查和随机检查，检查内容包括：

:::: compare
::: pros
**合规指标**

- 安全制度是否健全
- 技术防护措施是否到位
- 应急预案是否演练有效
- 人员培训记录是否完备
:::
::: cons
**违规情形**

- 未申报擅自开展业务
- 安全评估报告虚假伪造
- 重大安全事件未按规定报告
- 拒绝、阻碍依法检查
:::
::::

::: warning 注意事项
各单位须在每年度第一季度末前，向主管部门提交上年度信息安全工作报告。报告格式按主管部门另行发布的《年度报告格式指引》执行，不得逾期提交。
:::

## 法律责任

::: danger 严肃警示
对于违反本办法规定的，主管部门依据情节轻重，按下列方式处理：

一、责令限期整改，并处一万元以上十万元以下罚款；  
二、情节严重的，吊销相关许可证件，处十万元以上一百万元以下罚款；  
三、构成犯罪的，依法移送司法机关追究刑事责任。
:::

::: pull-quote
信息安全是国家安全的重要组成部分，维护信息安全是每一个参与者的法定义务。
:::

## 附则

::: note
本办法自二〇二六年七月一日起施行，原《某某信息技术管理暂行办法》（某某〔2022〕第8号）同时废止。本办法解释权归某某监管部门。
:::

:::: table-card 各章节适用对象一览
::: table-row header=true cells="条款 | 主要内容 | 适用对象 | 时限"
:::
::: table-row cells="第一章 | 总则与适用范围 | 全部主体 | 即行"
:::
::: table-row cells="第二章 | 申报与审批程序 | 申报单位 | 业务前30日"
:::
::: table-row cells="第三章 | 监督检查机制 | 运营单位 | 每年度"
:::
::: table-row cells="第四章 | 法律责任与处罚 | 违规主体 | 即行"
:::
::: table-row cells="第五章 | 附则与施行日期 | 全部主体 | 2026-07-01"
:::
::::

::: footnotes
[1] 《中华人民共和国网络安全法》（2017年6月1日施行）
[2] 《中华人民共和国数据安全法》（2021年9月1日施行）
[3] 《关键信息基础设施安全保护条例》（国务院令第745号）
[4] 《网络产品安全漏洞管理规定》（工业和信息化部令第33号）
:::

::: recommend 参考文件
- [1] 《国家信息安全申报服务平台操作手册》（2026年版）
- [2] 《年度信息安全工作报告格式指引》（某某部门发布）
- [3] 《信息安全评估机构资质认定管理办法》
:::

::: footer-cta 联系我们 cta=下载全文 ▸
如有疑问，请拨打政务服务热线：**010-XXXXXXXX**，工作时间：周一至周五 9:00–17:00（法定节假日除外）。电子邮件：xxxx@gov.cn。
:::
`,"people-story":`::: cover 林若华
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**诗人、编辑，1964 年生于福州**

她说，诗这种东西，写的时候是为了自己，发表的时候是为了陌生人，留下来的时候是为了时间本身。
:::

::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 5 月刊
:::

::: intro 人物
她的办公桌上只有一只笔和一叠稿纸。没有电脑，没有便利贴，没有任何与"效率"有关的工具。采访那天下午，她把一杯茶推到我面前，说：我写诗写了四十年，至今不知道一首诗能做什么——但我知道它不能做什么。这是关于她的故事，也是关于那一叠始终摆在桌上的稿纸的故事。
:::

::: announcement
本期特稿历时五个月采写，含三次正式访谈及多次通信往来，全部引语经受访人确认。
:::

## 进入一首诗之前

采访她必须提前一周约。不是因为她很忙，而是因为她每天只接受一件"外来的事"。

她把这叫做**"一日一事"**——这个规矩她执行了将近二十年，只在父亲去世那一年暂停过。除此之外，雷打不动。

我那天是她那一天唯一的外来事。她把手机留在另一个房间，下午两点开门，傍晚五点送我到楼梯口，说："明天我要写一首诗。今天这些对话会在里面。"

### 诗的来源

她的诗极少直接写"我"。

观察过她十来首近作的读者会发现：诗里的主语常常是"一棵树""一块石头""一个人走在某地"——描述性的，不揭示。被问到这个问题时，她低头想了一会儿，说：

> "因为'我'太窄了。
> 一棵树比我宽。"

::: tip 采访手记
她说这句话时，窗外恰好有鸟叫。录音里能听见。这种时刻，记者会本能地想"这个场景应该写进去"——但写进去还是留在自己的记忆里，是两种不同的选择。我选择了前者，她大约会选择后者。
:::

## 编辑的另一面

她在一家文学期刊做了将近三十年的诗歌编辑。

许多人先认识她的诗，后来才知道她是编辑。也有不少人只知道她是编辑，从未读过她的诗。她对这两种相遇方式同样坦然——"诗人和编辑，说到底是同一种工作：在语言里为他人腾出空间。"

::: info 背景说明
她所在的期刊创刊于 1985 年，现为国内历史较长的文学类诗歌专刊之一。任职期间，她主持的"新人推荐"栏目已推介逾两百位青年诗人，其中数十人后来成为各自领域的重要写作者。
:::

## 金句 · 关于编辑工作

::: quote-card 林若华 · 受访谈话
编辑不是作者的老师，也不是读者的代理人。编辑是第一个被文字说服的陌生人，仅此而已。如果文字没有说服我，我没有办法假装它说服了我。
:::

::: section-title 四十年的时序
:::

一位诗人的时间与一般职业履历的时间不太一样。有些年她几乎什么都没发表，有些年一口气出现十几首。她把这叫做"写作的呼吸"——没有固定节律，但从未中断。

::: highlight
1964  福州，闽江边的一座老宅。

1982  第一首诗发表于省级文学杂志，只署了笔名，家人至今不知道。

1991  入职某文学期刊，开始诗歌编辑生涯。

2003  出版第一部诗集，印量两千册，半年售罄。

2018  获某某年度诗人奖，颁奖典礼上她只说了一句话：谢谢还有人在读诗。

2026  新诗集《时间里的陌生人》即将付印。
:::

## 两个时期的工作方式

:::: compare

::: pros 早年 · 手写稿
- 稿纸涂改、修补、推倒重来
- 诗稿在抽屉里放满半年再取出来看
- 编辑意见通过信件往来，一来一往要两周
- 没有退稿数据，不知道自己被拒绝了多少次
:::

::: cons 现在 · 仍是手写
- 依旧只用稿纸，不用电脑起草
- 诗稿仍然在抽屉里放，但现在放三个月就够了
- 与作者可以即时通信，但她仍倾向于写长信
- 退稿数量从未统计，"知道了也没用"
:::

::::

她始终是那个少数派：在这个时代坚持不用电脑写作的诗人，并非因为浪漫主义，而是因为"手写时我能感觉到自己在思考，键盘会让我觉得我只是在打字"。

::: warning 事实核查
"半年售罄"的说法来自受访人口述，出版社方面确认首印两千册已于 2004 年 3 月前全部售出，与受访人陈述基本吻合，时间节点略有出入。
:::

## 那叠稿纸说的事

::: steps 一首诗的生长周期
### 起点 · 一个触发
通常是很小的事：一句无意间听见的话，一个出门时看见的细节。她不当场记录，而是让它在脑子里放着。

### 沉淀 · 几天到几个月
不刻意想，但也不放开。她说这一阶段像是"等一张底片显影"——需要某种黑暗环境，急不得。

### 起稿 · 一次性完成
她从来不分次完成一首诗。一首诗必须在一次坐下来的时间内完成初稿，哪怕初稿很差。

### 修改 · 漫长的磨
改一首诗有时比写一首诗花更多时间。改动往往集中在最后两行——"结尾是诗的脸，不能将就"。
:::

::: note 编辑说明
本稿采写历时五个月，正式录音访谈三次，累计约九小时。引语均经受访人书面确认。时间线条目中的部分背景信息已经本人核准，涉及期刊内部情况的描述依本人意见做了适度处理。
:::

::: divider
:::

## 尾声

送我出门时，她说了一句我没预期的话。

我问她：现在还会紧张吗？比如交出一首新诗给编辑。

她想了想，说：**"紧张是对的。不紧张说明你以为自己已经写完了。诗是写不完的。"**

::: image-caption src=https://placehold.co/900x600?text=writer+desk
林若华的书桌一角，稿纸与那只笔。拍摄于 2026 年 3 月。
:::

::: author-bio name=林若华 role=诗人、文学编辑
任职某文学期刊诗歌编辑近三十年，已出版诗集四部。现居福州。新诗集《时间里的陌生人》即将出版。
:::

::: recommend 延伸阅读
- [关于慢写作的另一份特稿](https://example.com/slow-writing)
- [《时间里的陌生人》创作谈](https://example.com/new-book)
- [本刊往期诗人专题](https://example.com/poet-series)
:::

::: qrcode 订阅本刊
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 卷尾致谢
本文基于 2025 年 12 月至 2026 年 4 月多次采访整理而成。

感谢林若华女士接受长时间访谈，以及她的编辑同事提供的背景资料与协助。

文 / 某记者　摄影 / 某摄影师　　2026 年 5 月刊
:::

林若华工作室留下的写作公约——

\`\`\`text
一  每月有一周离线
二  一稿不过夜
三  不接非邀约采访
四  永远先把稿子读给至少一个朋友听
\`\`\`

::: footnotes 引文出处
[1] 林若华《时间里的陌生人》，人民文学出版社，2026 年 1 月版。
[2] 本刊往期专题，2024 年 8 月号·诗人系列。
:::
`,"swiss-grid":`::: key-number NEUE GRAFIK REVUE value="Nº09"
VOL.IX · 2026—05—16 · CHF 14.—
:::

::: editorial-header 12 栏作为 / 版面的 / 呼吸节奏 chip="ESSAY · 01" pp="PP.04–19" subtitle="论 Neue Grafik 体系中的网格约束与编辑设计" topRule="6" titleDot="primary"
:::

::: byline cells="AUTHOR:顾栏白 | EDITOR:徐间距 | SET:09·2026" monospaceLast="true"
:::

::: abstract INDEX · 副刊导读
网格不是牢笼，是自由的前提。Müller-Brockmann 在 1958 年苏黎世的那套 12 栏体系，至今仍是编辑设计者无法绕过的基础坐标。本文从栏位分配、行长约束、视觉节奏三个维度，重新丈量这套系统的内在逻辑。
:::

::: announcement tone="danger"
本期取消订阅奖励活动，专注内容本身。感谢读者理解。
:::

:::: toc INDEX layout="split" meta="目次排布采用 12 栏 / 1/3 : 2/3 比例"
::: toc-item no="01" page="04" 网格作为版面呼吸
:::
::: toc-item no="02" page="08" 三款无衬线字体比较
:::
::: toc-item no="03" page="14" Müller-Brockmann 之后
:::
::: toc-item no="附" page="18" Q&A · 方法论注
:::
::::

::: intro
Grid systems are not a guarantee of good design. 网格不担保好设计——它只是给设计者一个可供背离的理性基础。
:::

::: section-title 网格作为版面的呼吸节奏 kicker="ESSAY · 01 — THE GRID" variant=kicker-stack
:::

## 网格作为版面的呼吸节奏

::: quote-card Karl Gerstner
约束即自由——网格不是把可能性减少，而是让可能性变得可控。
:::

::: pull-quote
真正改变一个人的，往往是最简单的一句话。
:::

::: steps 一份版面的诞生 variant=split-row
### 01 框定
12 栏 + 8 行 + 4 mm 沟距，先确定容器骨架。

### 02 分配
按内容权重分配栏宽：1/3 留白、2/3 实体，黄金切割比恒定。

### 03 编辑
最后把每一段文字放进对应栏，行长不超过 60 字符。
:::

12 栏系统的核心洞见并非"把页面切成 12 份"，而是通过 ==栏位比例关系== 让版面获得内在节奏。留白栏与实栏同等重要，这一点在 *Neue Grafik* 第 2 期即已被申明。

Karl Gerstner 在《Designing Programmes》中将网格定义为"尽可能多的可能性中最小的公分母"——这个描述精准捕捉了栅格设计的本质：**约束即自由**。

:::: bar-chart FIG.01 · 按栏数 · 瑞士设计年鉴版面栏位分布 subtitle="n=240 · 单位：出版物页数占比 · 数据来源：样本调研 1955–1975"
::: bar label="12 栏" pct="62" value="62%"
:::
::: bar label="8 栏" pct="21" value="21%"
:::
::: bar label="6 栏" pct="10" value="10%"
:::
::: bar label="4 栏" pct="5" value="5%"
:::
::: bar label="自由版" pct="2" value="2%" tone="warn"
:::
::::

::: image-caption src="https://placehold.co/900x400?text=FIG.01"
FIG.01 · 12 本瑞士设计年鉴（1955–1975）版面栏位分布。样本覆盖 240 个对开页，按主栏数分类统计。
:::

## 三款无衬线字体的编辑学比较

### Akzidenz-Grotesk：实用主义的基底

1896 年由柏林 H. Berthold 铸字行发行的 Akzidenz-Grotesk，是 20 世纪国际排印运动的字体起点。其 x 高度适中，字间负空间均匀，在正文 10–13px 区间表现稳健。

> 字体选择是一种立场声明。选择 Akzidenz-Grotesk 意味着选择了实用主义传统而非个性主张。
>
> — HELMUT SCHMID · *Typography Today*, 2003

### Univers：系统化的野心

01. Adrian Frutiger 在 1957 年为 Deberny & Peignot 设计，21 个字重与字宽的完整矩阵
02. 数字命名法（55 Regular / 65 Bold / 75 Black）将字体设计变成可量化的工程学
03. Univers 首次证明：一个字体家族可以被当作模块化系统来构建

### Helvetica：中立性的两面

- [x] x 高度高于 Akzidenz-Grotesk，移动端小字号可读性更佳
- [x] 字重范围完整，从 Thin 到 Black 覆盖编辑设计全场景
- [ ] 过度使用导致视觉疲劳——在信息密集页面应控制字重层级不超过三级

::: info INFO
12 栏网格不等于 12 列内容——留白栏与实栏的比例关系，决定版面是否有呼吸感。
:::

::: tip TIP
正文行长以 60–75 字符为宜（约 9–11em）；移动端单栏适配后控制在 40 字符以内。
:::

::: warning WARN
将 Helvetica 与 Neue Haas Grotesk 混排时，x 高度差异在 12px 以下明显，需逐级校对。
:::

::: danger STOP
切勿在正文中使用三级以上字重层级——层级过多等于没有层级，视觉权重归零。
:::

以一行伪代码表达栏位逻辑：\`grid(12, gutter=20px)\`。

\`\`\`javascript
// GRID.JS · 12-column Swiss system
const column = (total, gutter) =>
  (pageWidth - gutter * (total - 1)) / total;
\`\`\`

:::: compare CONTRAST
::: pros GRID · 有网格
- 比例关系内在一致，版面节奏可预期
- 留白由系统分配，不依赖设计师直觉
- 跨页展开时视觉连贯性有保障
:::
::: cons FREE · 自由版
- 每次决策都是从零出发，认知成本高
- 局部精彩，但全局缺乏结构性呼吸
- 版式复刻时难以维护一致性
:::
::::

::: note RANDNOTIZ
栏位制并非要求页面"满"——白栏的存在让黑栏更可阅读。Tschichold 在《Asymmetric Typography》第三章专论留白的积极功能，称其为"版面的沉默发言人"。
:::

## Müller-Brockmann 之后：承继与背叛

1981 年，Müller-Brockmann 在《Grid Systems in Graphic Design》中将 *Neue Grafik* 体系系统化。此后 40 年，这套框架经历了数字化的冲击与重构。

当代设计师的困境在于：网格提供的是纸张对开页的节奏方案，而屏幕是无边界的流动媒介。[响应式网格](#) 是对这一矛盾的工程学妥协，但它丧失了原版系统中对"物理页面绝对尺寸"的依赖。

::: qa-block READER Q&A q="数字编辑刊是否还需要严格的 12 栏系统？"
需要，但方式变了。移动端的"12 栏"更接近一套比例约定而非像素精确值。核心不变的是：*版面的每一个决策都应能在网格坐标系中被解释*。Jedes Element muss im Raster begründbar sein.
:::

::: note variant=editorial-stripe EDITOR'S NOTE
*Neue Grafik* 1958–1965 共出版 18 期，每期均以英、德、法三语平行排印。其本身就是国际主义排印的实践现场，而非仅是理论宣言。本栏目的视觉系统直接取法于 Nº04 内页的红色辅助线与 12 栏铅笔草图。
:::

::: footnotes NOTES
[1] Josef Müller-Brockmann, *Grid Systems in Graphic Design*, Niggli Verlag, 1981, p.10.
[2] Jan Tschichold, *Asymmetric Typography*, Reinhold Publishing, 1967.
[3] Karl Gerstner, *Designing Programmes*, Arthur Niggli, 1964, p.22.
[4] 样本调研：取 12 本瑞士设计年鉴（1955–1975），逐页记录主栏数，共 240 对开页，排除广告版。
:::

::: divider
:::

::: note variant=research-dense METHODOLOGY
本文数据取样自 12 本瑞士设计年鉴（1955–1975），逐页人工记录主栏数，共计 240 个对开页；广告版与折页不计入统计。"自由版"定义为无可辨识栏位参考线的版面。条形图按占比降序排列，满分 100 对应单一栏数全覆盖。
:::

::: footer-cta variant=triptych-actions IF YOU LIKED THIS like="♡  LIKE" star="◎  SEEN" share="→  SHARE"
:::

::: qrcode variant=follow-card NEUE GRAFIK REVUE desc="每双周四出版 · 编辑设计与栅格排印评论" kicker="SUBSCRIBE"
:::

::: recommend FURTHER READING
- Müller-Brockmann, *Grid Systems in Graphic Design*, Niggli 1981
- Karl Gerstner, *Designing Programmes*, Arthur Niggli 1964
- Jan Tschichold, *Asymmetric Typography*, Reinhold 1967
:::

::: colophon next="字距作为空间：Univers 55 在正文中的间距实验" issue="Nº09 / 2026 / ZÜRICH"
:::
`,"tech-explainer":`# 用 TypeScript 从零实现 JWT 认证

::: intro 学完你将能
- 说出 JWT 的三段式结构：Header、Payload、Signature
- 用 Node.js 内置 \`crypto\` 模块手写签发与验签，无第三方依赖
- 识别并规避五种高频误用：弱密钥、\`alg:none\`、敏感字段入 Payload、跳过 \`exp\`、明文传输
:::

::: cover 教程说明
**前置知识：** \`JavaScript 基础\` \`HTTP 协议\` \`Base64 编码\`

_预计阅读 12 分钟 · 最后更新 2026-04-20_
:::

::: author 陈朗 role=后端工程师
最后更新：**2026-04-20** · 阅读时长约 12 分钟
:::

::: divider
:::

::: section-title 01 · JWT 的结构
:::

## 1. JWT 的结构

JWT（JSON Web Token）由三段 Base64url 编码字符串拼成，用 \`.\` 分隔：

\`\`\`text
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.SIGNATURE
    ↑ Header           ↑ Payload           ↑ Signature
\`\`\`

::: tip Tip · 小贴士
Header 和 Payload 只是 Base64url 编码，**没有加密**——任何人都能解码读到内容。密码、手机号绝对不能放在 Payload 里。
:::

::: info Info · 延伸知识
JWT 常被误称为"加密 Token"，正确叫法是"签名 Token"——它保证数据**未被篡改**，不保证数据**保密**。
:::

::: image-caption src="https://placehold.co/600x300?text=JWT+Structure" alt="JWT 结构示意图" 图 1 · JWT 三段式结构示意
Header 声明算法，Payload 携带声明，Signature 保证完整性。三段均为 Base64url 编码，用点号连接。
:::

::: divider
:::

## 2. 分步实现

::: steps 手写 JWT 签发与验签
### Step 1. 引入内置模块

只需 Node.js 18+ 内置的 \`crypto\`，无需任何 npm 依赖：

\`\`\`typescript
import { createHmac, timingSafeEqual } from 'node:crypto'
\`\`\`

### Step 2. 实现 HMAC-SHA256 签名

\`\`\`typescript
function hmacSign(data: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(data)
    .digest('base64url')
}
\`\`\`

### Step 3. 签发 Token

\`\`\`typescript
function sign(payload: object, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body   = btoa(JSON.stringify(payload))
  const sig    = hmacSign(\`\${header}.\${body}\`, secret)
  return \`\${header}.\${body}.\${sig}\`
}
\`\`\`

### Step 4. 验签并检查过期

\`\`\`typescript
function verify(token: string, secret: string): object {
  const [header, payload, sig] = token.split('.')
  const expected = hmacSign(\`\${header}.\${payload}\`, secret)
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw new Error('invalid signature')
  }
  const decoded = JSON.parse(atob(payload))
  if (decoded.exp && decoded.exp < Date.now() / 1000) {
    throw new Error('token expired')
  }
  return decoded
}
\`\`\`
:::

::: divider
:::

## 3. 正确与错误对比

:::: compare

::: pros Do · 推荐写法
- 密钥长度 ≥ 256 位随机字符
- Payload 只存用户 ID 与 \`exp\`
- 始终校验 \`exp\` 字段
- 通过 HTTPS 传输，绝不放 URL
:::

::: cons Don't · 避免这么做
- 用 \`"secret"\` 或 \`"1234"\` 当密钥
- 把密码、手机号塞进 Payload
- 跳过 \`exp\` 校验
- 在 query string 里传 Token
:::

::::

::: warning Warning · 常见陷阱
部分早期 JWT 库支持 \`alg: none\`，攻击者可构造无签名的合法 Token。**永远显式指定算法**，不要信任客户端传入的 \`alg\` 字段。
:::

::: danger Caution · 重大变更
从 HS256 迁移到 RS256 时，旧 Token 需要双算法过渡期——若直接切换，线上存量 Token 将全部失效。这是生产事故的高发点。
:::

::: note Node.js 版本
本文所有示例需要 Node.js 18+（依赖原生 \`btoa\` / \`atob\` / \`base64url\`）。若仍在 Node 16 线上，请用 \`Buffer.from(x).toString('base64url')\` 替代。
:::

::: divider
:::

## 4. 设计纲领与进阶

::: quote-card JWT 设计纲领
JWT 是信任契约，不是加密容器。签名确保"数据未被篡改"，不确保"数据看不到"——把这句话刻进 API 设计阶段，90% 的 JWT 安全问题都能提前规避。
:::

::: highlight
**进阶技巧**：用 \`kid\`（Key ID）字段实现密钥无感轮转——服务端维护 \`kid → secret\` 映射表，签发新 Token 时写入最新 kid，验签时按 kid 查表，旧 Token 继续有效。
:::

::: footer-cta 继续阅读 cta=下一篇：OAuth 2.0 与 JWT
手把手厘清 OAuth 为何要用 JWT，JWT 又解决了 OAuth 的哪些麻烦。
:::

::: divider
:::

## 5. 视频 / 语音版

::: video-card
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: voice-card
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="JWT 教程音频版" play_length="600000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: qrcode 关注「文档白昼」获取代码
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: recommend variant=academic-refs 下一篇会讲什么
- **OAuth 2.0 与 JWT 的协作关系**：授权码流程里，JWT 扮演什么角色
- **Refresh Token 的正确实现**：为什么不能把它当 Access Token 用
- **JWK Set 与密钥轮转**：从 kid 到完整轮转链路的工程化
:::

::: recommend 延伸阅读
- [RFC 7519：JWT 规范原文](https://example.com/rfc7519)
- [OWASP：JWT 安全最佳实践](https://example.com/owasp)
- [Node.js crypto 官方文档](https://example.com/crypto)
:::

::: footnotes 参考资料
[1] RFC 7519 · JSON Web Token (JWT) · IETF 2015。
[2] OWASP JWT Cheatsheet · 2024 最新版。
:::
`,"tech-geek":`# 极客夜行 · 工程随笔 Vol.03

::: cover 工程随笔 Vol.03 · 写事故复盘
![封面占位](https://placehold.co/1200x630?text=tech-geek+cover)

夜班工程师视角：凌晨三点对着终端写事故复盘，不是在炫酷，是在认真。
:::

::: author 某某 · 2026-04-20 · 阅读时长 12 分钟 · 字数 3400
:::

::: intro 题解
本篇整理过去 18 个月里我在三家公司写 postmortem 的经验——从"一人一事故"的短条
模板，到跨团队复盘的 RCA 文档格式，再到对外公开的 learning 文章。关注点始终
只有一件事：**让下一个读到这份文档的工程师，能在 15 分钟内判断他该不该改行为**。
:::

::: divider
:::

## 写 postmortem 的三条约束

三条约束锚定 postmortem 的边界，来自 Google / Amazon / Stripe 公开 postmortem 的共同骨架[^1]。

### 约束一 · 时间轴必须精确到分钟

不是"14:00 左右"，是 \`14:03:21\`。时间戳的精度决定了三个月后回溯时**能否把相邻事件拉出因果链**。

### 约束二 · "为什么没发现"比"发生了什么"更重要

事故报告有 \`WHAT\` 和 \`WHY-DETECT\` 两栏。多数人只写 \`WHAT\`，是因为 \`WHY-DETECT\` 要求回答"为什么我们的监控没报"——这问题很难，但回避它等于没做复盘。

### 约束三 · 行动项必须**可以被拒绝**

给每个 action item 一个 \`owner\` + \`due date\` + \`rejectable reason\`。全部 100% 执行的 action items 列表反而是 bad smell。

::: tip 附注
这三条约束不是我发明的，是反推公开案例得出的共同骨架。走 manpage-log 默认骨架——顶底分隔线 + 状态标签条，与正文同色族。
:::

::: warning 注意陷阱
**小团队慎用正式 postmortem 模板**。5 人以下团队写 9 页 RCA 文档是灾难——修复时间都不够，复盘写一下午。小团队的约束换成"事故本身长度 × 2 = 复盘文档长度上限"。
:::

::: info 参考
Google SRE Book · Chapter 15 Postmortem Culture；以及 Stripe 工程 blog 的 "Writing Great Design Docs"（2019）。
:::

::: danger 严重警告
**最典型 anti-pattern**：把 postmortem 写成"找谁背锅"。一旦文档里出现"人名 + 应当更谨慎"的句式，之后没人会写诚实的时间轴——大家都会自我审查。
:::

::: note 范围说明
本篇只谈"对内 postmortem"；对外公开的 learning 文章（面向客户 / 监管）是另一套体裁——语气更克制，数据更少，结构更像新闻稿。
:::

::: divider
:::

## 关键对照数据

以下是来自三家公司 18 个月内 47 份 postmortem 的汇总统计[^2]：

| 指标 | 有 runbook | 无 runbook |
| --- | --- | --- |
| 平均 MTTR（分钟） | 23 | 54 |
| 复盘完成率 | 91% | 64% |
| 行动项执行率 | 78% | 41% |
| 重复事故发生率 | 12% | 38% |

\`\`\`bash
# 从上一次 deploy 之后的错误日志里捞时间戳（UTC 转本地）
$ journalctl --since "2026-04-19 14:00" --until "2026-04-19 15:00" \\
    | grep -i error \\
    | awk '{print $1,$2,$3}' \\
    | sort -u
\`\`\`

::: divider
:::

## 引文 · 算法的终止性

::: quote-card Knuth · TAOCP Vol. 1
An algorithm must **always terminate** after a finite number of steps. A procedure
that lacks this feature but has all other characteristics of an algorithm may be
called a computational method.
:::

> "Premature optimization is the root of all evil (or at least most of it)."
> —— Knuth

::: divider
:::

## 取舍 · 两种 RCA 文档格式

:::: compare

::: pros 五段式模板
- 长度可控（每段 100 字上限）
- 新人写第一份也不会跑偏
- 好检索、好做 embedding
- 劣势：模板压死"非典型事故"
:::

::: cons 自由叙述
- 能承载复杂因果链
- 老手写的质量上限高
- 劣势：新人写起来像在写作文
- 劣势：月底每份都要人肉 review
:::

::::

**两种格式并存**，不是二选一——新事故用模板，复盘评审后允许作者把"模板装不下的复杂因果"另开一段自由叙述。这叫 \`graceful degradation\`。

## 步骤 · 写 postmortem 的方法

::: steps
### 拉 timeline
先把监控 / log / Slack / tickets 四条线的时间戳合并成单一 timeline。精确到秒。

### 标因果链
从 timeline 找"这一步**直接**导致下一步"的箭头。箭头数量应该 ≤ 事件数 - 1。

### 找 detection gap
每个箭头问一次"这一步有没有可能被**更早**发现"。这就是核心拷问。
:::

三步走；不加第 4 步的"action items"——那是评审会议的产物，不是作者个人产出。

::: section-title 附录 · 排版纪律
:::

\`\`\`python
# 把 timeline 合并成单一因果链的小脚本
def merge_timeline(sources: list[list[dict]]) -> list[dict]:
    """Merge N parallel streams into one timeline sorted by ts."""
    return sorted(
        (event for stream in sources for event in stream),
        key=lambda e: e["ts"]
    )
\`\`\`

按 <kbd>Ctrl</kbd> + <kbd>R</kbd> 在终端里 reverse-search 历史命令。inline \`grep\` 走 \`primary\` 琥珀色 + \`bgMuted\` 底——和正文自然延续的一笔，不是"另起异物"。

::: divider
:::

## 媒体嵌入

::: video-card
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: voice-card
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="事故复盘语音版" play_length="900000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: divider
:::

## 延伸阅读

::: recommend
- Google SRE Book · Chapter 15 Postmortem Culture
- Stripe Engineering · Writing Great Design Docs (2019)
- TAOCP Vol. 1 · Algorithms vs Methods
:::

::: qrcode 订阅「工程随笔」
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 延伸阅读
- 相关工程随笔 Vol.02（编者按）
- 本篇的数据与实验脚本（附录 B）
- 下一期主题：*读生产环境代码的方法*

某某 · 2026-04-20 · 若此文对你有用，请回信告诉我一件**你改了的行为**
:::

::: footnotes
[^1]: 数据来源：Google SRE Book Chapter 15、Stripe Engineering Blog（2019）、Amazon Builder's Library（2020）。三处来源的模板骨架在"时间轴精度 / 根因问题 / 可拒绝行动项"三点上高度收敛。
[^2]: 统计周期 2024-10 至 2026-03，覆盖 3 家公司 47 份 postmortem，其中 SaaS 产品类 29 份、基础设施类 18 份。有 runbook / 无 runbook 的分组依据是事故发生时 on-call 能否在 2 分钟内定位操作手册。
:::
`,"youth-zine":`::: author
@潮流小编 · 2026.05.17
:::

::: abstract kicker="本期速览"
本篇精选 2026 春夏最值得入手的潮流单品，从运动鞋到配件全覆盖。==每一件都是编辑亲测推荐==，不踩雷指南。
:::

## 开箱前的碎碎念

最近收到了好多姐妹的私信，问我这一季最值得买的是什么。说实话，我也挑了很久——毕竟钱包是有限的，但==好东西是无限的==。

今天就把我的私藏清单一口气都给你们了 🎉

::: tip
买之前记得比价！同款在官网和买手店差价有时候高达两折。
:::

::: section-title 运动鞋安利 kicker="SNEAKERS · 春夏新品三连"
:::

:::: gallery variant=triptych
::: image-item
![鞋款 A](https://via.placeholder.com/300x300/e91e63/ffffff?text=A)
粉白波浪底
:::

::: image-item
![鞋款 B](https://via.placeholder.com/300x300/26c6da/ffffff?text=B)
青蓝泡泡底
:::

::: image-item
![鞋款 C](https://via.placeholder.com/300x300/ffd54f/1a0a12?text=C)
奶黄厚底
:::
::::

::: divider variant=dots
:::

这一季我最推荐的三款分别是：

- 粉白波浪底：日常通勤 + 运动两用，==百搭王者==
- 青蓝泡泡底：街头感拉满，配阔腿裤绝了
- 奶黄厚底：身高 +5cm 的秘密武器，姐妹们懂的

::: steps 三步上手清单
### 确认尺码
这个品牌偏小，建议大一码入手。

### 选色策略
第一双选中性色，第二双才是大胆撞色。

### 保养要点
到手先喷防污喷雾，好不好养决定穿的次数。
:::

## 和风格博主的一次对话

:::: dialogue variant=chat-bubbles
::: dialogue-turn speaker="小编"
你今年春夏最推荐的配色方向是什么？
:::

::: dialogue-turn speaker="风格博主 @Yuki"
粉色系今年真的很能打！不是那种甜腻的芭比粉，是更饱和的玫粉——配白色或者米色简直无敌。
:::

::: dialogue-turn speaker="小编"
那手包呢？今年有没有什么"值得投资"的款？
:::

::: dialogue-turn speaker="风格博主 @Yuki"
还是推经典款，颜色出彩就行。我最近在用的是一个玫粉色迷你挎包，上镜效果特别好。
:::
::::

::: quote-card @Yuki 风格博主
本质上，玫粉是 Gen-Z 的克制宣言——颜色出位，但不是用来讨好镜头的。
:::

## 春夏配件对比：买哪个？

:::: compare
::: pros 迷你挎包
- 出镜率高，拍照好看
- 轻便，日常通勤无压力
- 颜值即正义，入手不后悔
:::

::: cons 大号托特
- 容量焦虑彻底解决
- 通勤、购物、健身三合一
- 但确实有点沉……
:::
::::

## 本季三大关键词

::: key-number 潮流预测 value="↑82%"
Gen-Z 玫粉搜索热度同比
:::

::: pull-quote variant=stamp-quote attribution="@Yuki 春夏风格报告"
不是所有粉都叫粉。2026 的玫粉是一种态度——饱和、清醒、不讨好。
:::

## 安利清单汇总

::: recommend
- [玫粉波浪底运动鞋 · ¥599](https://example.com) — 适合所有想要"踩在粉色云朵上"的你
- [迷你玫粉迷你挎包 · ¥289](https://example.com) — 这一季最出镜的小包，手慢无
- [防晒薄荷绿风衣 · ¥399](https://example.com) — 颜色很 Gen-Z，防晒值在线
:::

## 粉丝问答

::: qa-block 粉丝问答 q="玫粉是不是只适合冷白皮？"
不是。玫粉对黄皮反而更友好——选偏冷调的玫粉调，黄皮上身会更显气色。重点是饱和度，不是色相。
:::

## 关于价格的几点说明

::: note
以上价格为发稿时参考售价，实际以各平台为准。部分商品在大促期间折扣可能达 7 折。
:::

::: info
如需了解海淘渠道，可私信我获取推荐链接，使用邀请码额外享 9.5 折优惠。
:::

::: warning
谨防仿品！请认准官方授权店铺，或通过认证买手入手。
:::

::: announcement 限时提醒
本篇所有商品链接在 2026.06.01 前有效，部分款式库存有限，喜欢的姐妹趁早！
:::

---

::: footer-cta
关注我，每周更新最新潮流安利 ✨
:::

::: footnotes 数据与口径
- 运动鞋尺码数据来源于品牌官方换算表，2026 年春季版本。
- 价格数据来源于各平台公开售价，2026.05 采集。
:::
`},Gs="f16a197ed8e5";function Fa(e){return Ri[e]??Ri.default??""}async function AA(e){const{REFERENCE_BY_THEME:t}=await Hn(async()=>{const{REFERENCE_BY_THEME:n}=await import("./_references-B-n4rTHz.js");return{REFERENCE_BY_THEME:n}},[]);return t[e]??t.default??""}async function IA(){const{SHOWCASE_MARKDOWN:e}=await Hn(async()=>{const{SHOWCASE_MARKDOWN:t}=await import("./_showcase-5x7JXmnw.js");return{SHOWCASE_MARKDOWN:t}},[]);return e}const RA=400,MA=1800,Xc="wechat-typeset:dev:sampleBuildId";function OA(){return typeof import.meta<"u"&&!1}function NA(){if(!OA())return!1;const e=$t(Xc);return e===Gs?!1:(wt(Xc,Gs),e!==null)}function LA(e){const t=te(null),n=te(0),o=te("idle"),s=te("");let r=null;const i=te(null);let a=null,l=null,c=null;function u(y,b=1500){s.value=y,r!==null&&window.clearTimeout(r),r=window.setTimeout(()=>s.value="",b)}const d=ne(()=>s.value?s.value:o.value==="saving"?"保存中…":o.value==="saved"?"已保存":o.value==="error"?"草稿写盘失败 · 存储已满":"　"),f=ne(()=>o.value==="error"?"error":s.value?"saved":o.value);function m(y,b){i.value={message:y,restore:b}}function v(){i.value?.restore(),i.value=null}function g(){i.value=null}const h=ne(()=>(n.value,t.value?vn().find(y=>y.id===t.value)?.title??"":""));function w(){a!==null&&(window.clearTimeout(a),a=null),l!==null&&t.value&&(Vo(t.value,{body:l})?(l=null,n.value+=1,o.value="saved",c!==null&&window.clearTimeout(c),c=window.setTimeout(()=>{o.value==="saved"&&(o.value="idle")},MA)):(o.value="error",u("草稿写盘失败 · 存储已满",4e3)))}je(e.md,y=>{t.value&&(l=y,o.value="saving",a!==null&&window.clearTimeout(a),a=window.setTimeout(w,RA))});function A(y="default"){const b=NA(),_=Md();if(_){const $=Xn(_);if($){t.value=$.id;const P=$.themeId||y;if(b){const W=e.getSample(P);e.md.value=W,Vo($.id,{body:W}),console.info(`[dev] 检测到样本重建（SAMPLE_BUILD_ID=${Gs}）；活跃草稿正文已重置为 sample-${P}.md`)}else e.md.value=$.body;$.themeId&&(e.baseThemeId.value=$.themeId);return}}const x=vn();if(x.length>0){const $=x[0];t.value=$.id,Ln($.id);const P=$.themeId||y;if(b){const W=e.getSample(P);e.md.value=W,Vo($.id,{body:W}),console.info(`[dev] 检测到样本重建（SAMPLE_BUILD_ID=${Gs}）；活跃草稿正文已重置为 sample-${P}.md`)}else e.md.value=Xn($.id)?.body??"";$.themeId&&(e.baseThemeId.value=$.themeId)}else{const $=ls({title:"wechat-typeset 示例",body:e.getSample(y),themeId:y});t.value=$.id,e.md.value=$.body}}function M(){t.value&&(l=e.md.value,w(),u("已保存"))}function R(y){if(y===t.value)return;w();const b=Xn(y);b&&(t.value=b.id,Ln(b.id),e.md.value=b.body,b.themeId&&(e.baseThemeId.value=b.themeId),n.value+=1)}function B(y,b){const _=Xn(y);if(!_)return;const x=t.value===y;if(Od(y),x){const $=vn()[0];if($){const P=Xn($.id)?.body??"";t.value=$.id,Ln($.id),e.md.value=P,$.themeId&&(e.baseThemeId.value=$.themeId)}else t.value=null,e.md.value=""}n.value+=1,m(`已删除「${b}」`,()=>{const $={..._};Nd(JSON.stringify({version:1,drafts:[$]})),t.value=$.id,Ln($.id),e.md.value=$.body,$.themeId&&(e.baseThemeId.value=$.themeId),n.value+=1})}function N(y){(y.key===null||y.key.startsWith(z1))&&(n.value+=1)}mt(()=>{window.addEventListener("storage",N)}),Je(()=>{window.removeEventListener("storage",N)});function k(y="wechat-typeset-export"){return(vn().find(_=>_.id===t.value)?.title??y).replace(/[\\/:*?"<>|\s]+/g,"-")||y}return{activeDraftId:t,draftIndexTick:n,savingState:o,displayedSavingLabel:d,displayedSavingState:f,currentDraftTitle:h,undo:i,initActiveDraft:A,handleSave:M,handleSelectDraft:R,handleDeleteDraftRequest:B,flushDraftSave:w,pingTransient:u,showUndo:m,onUndo:v,onUndoExpire:g,fileStem:k}}async function DA(e,t){if(navigator.clipboard&&window.isSecureContext&&typeof ClipboardItem<"u")try{const n=new Blob([e],{type:"text/html"}),o=new Blob([t],{type:"text/plain"}),s=new ClipboardItem({"text/html":Promise.resolve(n),"text/plain":Promise.resolve(o)});return await navigator.clipboard.write([s]),{ok:!0,mode:"clipboard-api"}}catch(n){console.warn("[copyHtml] Clipboard API failed, fallback to execCommand:",n)}try{const n=document.createElement("div");n.setAttribute("contenteditable","true"),n.style.position="fixed",n.style.left="-9999px",n.style.top="0",n.innerHTML=e,document.body.appendChild(n);const o=document.createRange();o.selectNodeContents(n);const s=window.getSelection();if(!s)throw new Error("no selection");s.removeAllRanges(),s.addRange(o);const r=document.execCommand("copy");if(s.removeAllRanges(),document.body.removeChild(n),!r)throw new Error("execCommand copy returned false");return{ok:!0,mode:"exec-command"}}catch(n){return{ok:!1,mode:"failed",error:String(n)}}}function PA(e){if(!e)return 0;const t=/<img\b[\s\S]*?\bsrc\s*=\s*["']data:image\//gi,n=e.match(t);return n?n.length:0}const Zc={voice:(e,t)=>{const n=["mpvoice"];return t&&n.push(`name="${t}"`),e&&n.push(`voice_encode_fileid="${e}"`),` ${n.join(" ")} `},video:(e,t,n)=>{const o=["mpvideo"];return e&&o.push(`vid="${e}"`),t&&o.push(`video_encode_fileid="${t}"`),n&&o.push(`name="${n}"`),` ${o.join(" ")} `}};function BA(e){if(!e)return{html:e,count:0};if(typeof DOMParser>"u")return{html:e,count:0};const t=new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,"text/html"),n=t.body,o=Array.from(n.querySelectorAll("[data-wx-mp-kind]"));if(o.length===0)return{html:e,count:0};let s=0;for(const r of o){if(r.getAttribute("data-wx-mp-hint")==="emitted")continue;const i=r.getAttribute("data-wx-mp-kind"),a=r.getAttribute("data-wx-mp-name"),l=r.getAttribute("data-wx-mp-fileid");let c;if(i==="voice")c=Zc.voice(l,a);else if(i==="video"){const f=r.getAttribute("data-wx-mp-vid");c=Zc.video(f,l,a)}else continue;const u=t.createComment(c),d=r.parentNode;d&&(d.insertBefore(u,r),r.setAttribute("data-wx-mp-hint","emitted"),s+=1)}return s===0?{html:e,count:0}:{html:n.innerHTML,count:s}}const eu=1,FA="share=",jA="#wechat-typeset-stripped-image",wp={prefix:FA,validate(e){if(!Da(e)||e.v!==eu||typeof e.md!="string"||typeof e.themeId!="string")return null;const t=typeof e.strippedImages=="number"&&e.strippedImages>0?e.strippedImages:void 0;return{v:eu,md:e.md,themeId:e.themeId,...t!==void 0?{strippedImages:t}:{}}}};function HA(e,t={}){return pp(wp,e,t)}function VA(e){return La(wp,e)}function UA(e){if(!e)return{md:"",count:0};let t=0;return{md:zA(e).map(s=>s.code?s.text:s.text.replace(/!\[([^\]]*)\]\(data:[^)\s]+\)/g,(r,i)=>(t++,`![${i}](${jA})`))).join(""),count:t}}function zA(e){const t=e.split(`
`),n=[];let o=[],s=!1;for(let r=0;r<t.length;r++){const i=t[r];if(/^\s*```/.test(i)){o.push(i),n.push({text:o.join(`
`)+(r<t.length-1?`
`:""),code:s}),o=[],s=!s;continue}o.push(i)}return o.length>0&&n.push({text:o.join(`
`),code:s}),n}const Sp="wechat-typeset:outlink-strategy";function WA(){const e=$t(Sp);return e&&Ld.includes(e)?e:"keep"}function KA(e){return e.trim()?e.split(/\n\s*\n+/).filter(t=>t.trim().length>0).length:0}const qA="https://mp.weixin.qq.com/";function GA(e){const t=te(WA()),n=te(null),o=te(null);function s(u){t.value=u,wt(Sp,u)}function r(){o.value=null}async function i(){e.flush();const u=e.rendered.value.html,{html:d,count:f}=Q1(u,t.value),{html:m}=BA(d),v=PA(m),g=e.md.value,h=await DA(m,g);if(h.ok){const w=[],A=e.rendered.value.wordCount,M=KA(g);A>0&&w.push(`${A} 字`),M>0&&w.push(`${M} 段`),f>0&&t.value==="tail-list"?w.push(`${f} 条外链已尾注`):f>0&&t.value==="drop"&&w.push(`${f} 条外链已丢弃`),v>0&&w.push(`${v} 张内联图待微信转存`),h.mode!=="clipboard-api"&&w.push("已降级走 execCommand");const R=h.mode==="clipboard-api"?"已复制":"已复制（降级）";e.pingTransient(w.length>0?`${R}（${w.join(" · ")}）`:R),o.value={message:"已复制到剪贴板",details:w,cta:{label:"打开公众号后台",url:qA}},n.value=null}else n.value=`复制失败：${h.error??"未知错误"}（请换 Chrome/Safari 或关闭跨域 iframe）`}async function a(){const{md:u,count:d}=UA(e.md.value),f={v:1,md:u,themeId:e.baseThemeId.value,...d>0?{strippedImages:d}:{}},m=HA(f),v=d>0?`（${d} 张内联图已剥离）`:"";try{navigator.clipboard?.writeText?(await navigator.clipboard.writeText(m),e.pingTransient("已复制分享链接"+v)):(location.hash=m.slice(m.indexOf("#")),e.pingTransient("请从地址栏复制当前链接"+v))}catch{n.value="分享链接复制失败：请手动复制地址栏 URL"}}function l(u){return`[分享] ${(u.split(`
`).map(m=>m.trim()).find(m=>m.length>0)??"").replace(/^#+\s*/,"").slice(0,20)||"未命名"}`}function c(u){const d=VA(location.hash);if(!d)return!1;const f=ls({title:l(d.md),body:d.md,themeId:d.themeId});Ln(f.id),u(f.id,f.body,f.themeId),e.draftIndexTick.value+=1;try{history.replaceState(null,"",location.pathname+location.search)}catch{location.hash=""}const m=d.strippedImages?`（原稿剥离了 ${d.strippedImages} 张内联图，请在编辑端补图）`:"";return e.pingTransient("已从分享链接载入新草稿"+m,3500),!0}return{outlinkStrategy:t,setOutlinkStrategy:s,persistentError:n,copyResult:o,dismissCopyResult:r,handleCopy:i,handleCopyShareLink:a,tryLoadShareFromHash:c}}async function YA(e,t,n){const{width:o,height:s}=n,r=n.scale,i=n.background??"#ffffff",a=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`;try{const l=await JA(a),c=document.createElement("canvas");c.width=o*r,c.height=s*r;const u=c.getContext("2d");if(!u)return{ok:!1,error:"获取 Canvas 2D context 失败（浏览器不支持？）"};u.fillStyle=i,u.fillRect(0,0,c.width,c.height),u.drawImage(l,0,0,c.width,c.height);const d=await QA(c);return d?(fa(t,d),{ok:!0}):{ok:!1,error:"canvas.toBlob 返回 null（浏览器不支持 PNG 编码？）"}}catch(l){return{ok:!1,error:l?.message??"封面导出失败"}}}function JA(e){return new Promise((t,n)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>t(o),o.onerror=()=>n(new Error("SVG 解码失败")),o.src=e})}function QA(e){return new Promise(t=>{e.toBlob(n=>t(n),"image/png")})}const XA={"wechat-horizontal":{id:"wechat-horizontal",label:"横版主图 900×383",hint:"公众号图文头图",width:900,height:383},"wechat-square":{id:"wechat-square",label:"方版 900×900",hint:"列表缩略图 / 次封面",width:900,height:900},"og-image":{id:"og-image",label:"og:image 1200×630",hint:"社交分享卡片",width:1200,height:630}};function ZA(e,t){switch(t){case"wechat-horizontal":return e5(e);case"wechat-square":return t5(e);case"og-image":default:return n5(e)}}function e5(e){const{palette:t}=e,n=900,o=383,s=e.titleFamily??"sans-serif",r=e.titleWeight??700,i=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:60,y1:56,x2:n-60,y2:56,stroke:t.border,strokeWidth:1},{type:"line",x1:60,y1:o-56,x2:n-60,y2:o-56,stroke:t.border,strokeWidth:1},{type:"rect",x:60,y:130,w:4,h:130,fill:t.primary}];return e.kicker&&i.push({type:"text",x:80,y:100,content:e.kicker,fontSize:14,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:3}),i.push({type:"text",x:80,y:185,content:e.title,fontSize:52,fontFamily:s,fontWeight:r,fill:t.text}),e.tagline&&i.push({type:"text",x:80,y:240,content:e.tagline,fontSize:18,fontFamily:s,fontWeight:400,fill:t.textMuted}),ja(i,t,{x:80,y:o-40,markRight:n-60}),{viewBox:[0,0,n,o],width:n,height:o,primitives:i}}function t5(e){const{palette:t}=e,n=900,o=900,s=e.titleFamily??"sans-serif",r=e.titleWeight??700,i=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:80,y1:80,x2:n-80,y2:80,stroke:t.border,strokeWidth:1},{type:"line",x1:80,y1:o-80,x2:n-80,y2:o-80,stroke:t.border,strokeWidth:1},{type:"rect",x:80,y:o/2-100,w:4,h:200,fill:t.primary}];return e.kicker&&i.push({type:"text",x:100,y:o/2-120,content:e.kicker,fontSize:18,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:4}),i.push({type:"text",x:100,y:o/2-30,content:e.title,fontSize:76,fontFamily:s,fontWeight:r,fill:t.text}),e.tagline&&i.push({type:"text",x:100,y:o/2+30,content:e.tagline,fontSize:22,fontFamily:s,fontWeight:400,fill:t.textMuted}),ja(i,t,{x:100,y:o-110,markRight:n-80}),{viewBox:[0,0,n,o],width:n,height:o,primitives:i}}function n5(e){const{palette:t}=e,n=1200,o=630,s=e.titleFamily??"sans-serif",r=e.titleWeight??700,i=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:80,y1:80,x2:n-80,y2:80,stroke:t.border,strokeWidth:1},{type:"line",x1:80,y1:o-80,x2:n-80,y2:o-80,stroke:t.border,strokeWidth:1},{type:"rect",x:80,y:200,w:4,h:200,fill:t.primary}];return e.kicker&&i.push({type:"text",x:110,y:150,content:e.kicker,fontSize:20,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:4}),i.push({type:"text",x:110,y:290,content:e.title,fontSize:84,fontFamily:s,fontWeight:r,fill:t.text}),e.tagline&&i.push({type:"text",x:110,y:380,content:e.tagline,fontSize:22,fontFamily:s,fontWeight:400,fill:t.textMuted}),ja(i,t,{x:110,y:o-50,markRight:n-80}),{viewBox:[0,0,n,o],width:n,height:o,primitives:i}}function ja(e,t,n){["primary","secondary","accent","bgSoft","border","textMuted"].forEach((i,a)=>{e.push({type:"rect",x:n.x+a*20,y:n.y,w:14,h:14,fill:t[i]})}),e.push({type:"text",x:n.markRight,y:n.y+10,content:"wechat-typeset",fontSize:14,fontFamily:"monospace",fontWeight:400,fill:t.textMuted,textAnchor:"end",letterSpacing:2})}function o5(e){const t=te(!1);function n(){if(!t.value){t.value=!0;try{e.flush();const i=e.activeTheme.value.tokens.colors;iy(`${e.fileStem()}.html`,e.rendered.value.html,{background:i.bg,color:i.text}),e.pingTransient("已导出 HTML")}finally{t.value=!1}}}function o(){if(!t.value){t.value=!0;try{ay(`${e.fileStem()}.md`,e.md.value),e.pingTransient("已导出 Markdown")}finally{t.value=!1}}}async function s(){if(!t.value){t.value=!0;try{e.pingTransient("长图渲染中…",4e3);const i=e.getPreviewBody();if(!i){e.setPersistentError("长图导出失败：未找到预览节点");return}const a=await ly(i,`${e.fileStem()}.png`,{background:e.activeTheme.value.tokens.colors.bg});a.ok?e.pingTransient("已导出长图"):e.setPersistentError(`长图导出失败：${a.error??"未知错误"}`)}finally{t.value=!1}}}async function r(i){if(!t.value){t.value=!0;try{const a=XA[i];e.pingTransient(`正在生成${a.label}…`,2500);const l=e.activeTheme.value,c=r5(l),u=s5(e.md.value),d=ZA({palette:c,title:u||l.name,tagline:l.description,kicker:l.id.toUpperCase().replace(/-/g," ")},i),f=sh(d,l.tokens),m=`${e.fileStem()}-cover-${i}.png`,v=await YA(f,m,{width:a.width,height:a.height,scale:2,background:c.bg});v.ok?e.pingTransient(`已导出${a.label}`):e.setPersistentError(`封面导出失败：${v.error??"未知错误"}`)}finally{t.value=!1}}}return{doExportHtml:n,doExportMd:o,doExportImage:s,doExportCover:r,isExporting:t}}function s5(e){const t=e.split(`
`);for(const n of t){const o=n.trim();if(!o)continue;const s=/^#+\s+(.+)$/.exec(o);return s?s[1].trim().slice(0,40):o.slice(0,40)}return""}function r5(e){const t=e.tokens.colors;return{primary:t.primary,secondary:t.secondary,accent:t.accent,bg:t.bg,bgSoft:t.bgSoft,bgMuted:t.bgMuted,text:t.text,textMuted:t.textMuted,textInverse:t.textInverse,border:t.border,code:t.code}}function i5(e){function t(n){const o=n.ctrlKey||n.metaKey,r=!!n.target?.closest('input, textarea, [contenteditable="true"], .cm-editor');if(o){const i=n.key.toLowerCase();if(i==="k"&&!n.shiftKey){n.preventDefault(),e.openCommand();return}if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),e.copy();return}if(i==="s"&&!n.shiftKey){n.preventDefault(),e.save();return}if(i==="c"&&n.shiftKey){n.preventDefault(),e.toggleCustomizer();return}if(i==="d"&&n.shiftKey){n.preventDefault(),e.toggleDrafts();return}if(i==="p"&&n.shiftKey){n.preventDefault(),e.toggleComponents();return}if(i==="h"&&n.shiftKey){n.preventDefault(),e.exportHtml();return}if(i==="m"&&n.shiftKey){n.preventDefault(),e.exportMd();return}}if(n.key==="?"&&!r){n.preventDefault(),e.openHelp();return}n.key==="Escape"&&(e.closeCommand()||e.closeHelp()||e.closeDrawers())}mt(()=>{window.addEventListener("keydown",t)}),Je(()=>{window.removeEventListener("keydown",t)})}const a5=.01,l5=.02;function c5(){const e=te(!1),t=te(!1),n={editor:0,preview:0},o=window.matchMedia(Ba);function s(){t.value=o.matches,t.value||(e.value=!1)}s(),o.addEventListener("change",s),Je(()=>{o.removeEventListener("change",s)});function r(i,a){if(!t.value)return;const l=n[a],c=i-l;if(n[a]=i,i<l5){e.value=!1;return}Math.abs(c)<a5||(e.value=c>0)}return{collapsed:e,observe:r}}function u5(e){const t=e.lockMs??180;let n=0,o=null;function s(i){o==="preview"&&Date.now()-n<t||(o="editor",n=Date.now(),e.previewRef.value?.scrollToRatio(i))}function r(i){o==="editor"&&Date.now()-n<t||(o="preview",n=Date.now(),e.editorRef.value?.scrollToRatio?.(i))}return{onEditorScroll:s,onPreviewScroll:r}}function d5(e){wt(lp,e)}function f5(e,t){if(!Tt.value)return;const n=Tt.value;Tt.value=null,t("已切换主题并重置自定义配色",()=>{Mi=!0,Ze.value=e,Tt.value=n})}function p5(e){const t=Re.value.replace(/\r\n/g,`
`);Object.values(Ri).some(o=>o.replace(/\r\n/g,`
`)===t)&&(Re.value=Fa(e))}function h5(e,t,n){t.value&&(Vo(t.value,{themeId:e}),n.value+=1)}let Mi=!1;function m5(e){je(Ze,(t,n)=>{if(d5(t),Mi){Mi=!1;return}t!==n&&(f5(n,e.showUndo),p5(t),h5(t,e.activeDraftId,e.draftIndexTick))})}function g5(e){const{modKey:t}=e;return ne(()=>{e.draftIndexTick.value;const n=[];return n.push({id:"copy",title:"复制为微信富文本",group:"操作",shortcut:`${t} ↵`,run:e.handleCopy}),n.push({id:"save",title:"保存当前草稿",group:"操作",shortcut:`${t} S`,run:e.handleSave}),n.push({id:"clear",title:"清空正文",group:"操作",run:e.handleClear}),n.push({id:"load-sample",title:"载入当前主题示例",group:"操作",run:e.handleLoadSample}),n.push({id:"load-reference",title:"载入当前主题组件参考",group:"操作",keywords:"参考 reference 组件 全集",run:e.handleLoadReference}),n.push({id:"load-showcase",title:"载入全功能展示",group:"操作",keywords:"showcase 全功能 全部容器 全部变体 高级 advanced",run:e.handleLoadShowcase}),n.push({id:"save-selection",title:"保存选区为组件",group:"操作",run:e.handleSaveSelection}),n.push({id:"fix-zh-typo",title:"一键修复中文排版",group:"操作",run:e.handleFixZhTypo}),n.push({id:"toggle-drafts",title:e.drawerStates.value.drafts?"关闭草稿抽屉":"打开草稿抽屉",group:"视图",shortcut:`${t} ⇧ D`,run:()=>e.toggleLeft("drafts")}),n.push({id:"toggle-components",title:e.drawerStates.value.components?"关闭组件库":"打开组件库",group:"视图",shortcut:`${t} ⇧ P`,run:()=>e.toggleRight("components")}),n.push({id:"toggle-customizer",title:e.drawerStates.value.customizer?"关闭自定义配色":"打开自定义配色",group:"视图",shortcut:`${t} ⇧ C`,run:()=>e.toggleRight("customizer")}),n.push({id:"toggle-checklist",title:e.drawerStates.value.checklist?"关闭发文清单":"打开发文清单",group:"视图",run:()=>e.toggleRight("checklist")}),n.push({id:"open-help",title:"快捷键与帮助",group:"视图",shortcut:"?",run:()=>e.ui.helpOpen=!0}),n.push({id:"export-html",title:"导出 HTML",group:"导出",shortcut:`${t} ⇧ H`,run:e.doExportHtml}),n.push({id:"export-md",title:"导出 Markdown",group:"导出",shortcut:`${t} ⇧ M`,run:e.doExportMd}),n.push({id:"export-image",title:"导出全文长图",group:"导出",run:e.doExportImage}),n.push({id:"export-cover-h",title:"导出封面 · 横版 900×383",group:"导出",keywords:"封面 cover 公众号",run:e.doExportCoverHorizontal}),n.push({id:"export-cover-s",title:"导出封面 · 方版 900×900",group:"导出",keywords:"封面 cover 公众号 方版 缩略图",run:e.doExportCoverSquare}),n.push({id:"copy-share-link",title:"复制分享链接",group:"导出",run:e.handleCopyShareLink}),Qs.forEach(o=>{n.push({id:`theme-${o.id}`,title:`主题 · ${o.name}`,group:"主题",keywords:`${o.id} theme`,run:()=>{Ze.value=o.id}})}),n.push({id:"new-draft",title:"新建草稿",group:"草稿",run:()=>{const o=ls({title:"新草稿",body:`# 新草稿
`,themeId:Ze.value});e.handleSelectDraft(o.id),e.draftIndexTick.value+=1}}),vn().slice(0,30).forEach(o=>{n.push({id:`draft-${o.id}`,title:`草稿 · ${o.title||"未命名"}`,group:"草稿",keywords:o.themeId,run:()=>e.handleSelectDraft(o.id)})}),n})}function b5(e){const{base:t,seed:n}=e,o=hf(n),s={...t.tokens,colors:{...o,...t.tokens.colors.preBg?{preBg:t.tokens.colors.preBg}:{},...t.tokens.colors.preText?{preText:t.tokens.colors.preText}:{}}},r=e.variant??t.svgVariant??"geometric",i=rh(t.tokens),a=ih(t.tokens),l=ah(t.tokens),c=ni(t.elements,i),u=ni(t.containers,a),d=ni(t.inline,l);return lh({id:e.id??`${t.id}--custom`,name:e.name??`${t.name} · 自定义`,description:`基于 ${t.name} 的自定义配色`,variant:r,tokens:s,elements:oi(c,t.tokens.colors,o),containers:oi(u,t.tokens.colors,o),inline:oi(d,t.tokens.colors,o),kickers:t.kickers})}function ni(e,t){const n={};for(const[o,s]of Object.entries(e)){const r=t[o]??{},i={};for(const[a,l]of Object.entries(s))r[a]!==l&&(i[a]=l);Object.keys(i).length>0&&(n[o]=i)}return n}function oi(e,t,n){const o=v5(t,n),s={};for(const[r,i]of Object.entries(e)){const a={};for(const[l,c]of Object.entries(i))if(typeof c=="string"){let u=c;for(const[d,f]of o)u=w5(u,d,f);a[l]=u}else a[l]=c;s[r]=a}return s}function y5(e){const t=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e.trim());return t?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:e}function v5(e,t){const n=[[e.primary,t.primary],[e.secondary,t.secondary],[e.accent,t.accent],[e.bg,t.bg],[e.bgSoft,t.bgSoft],[e.bgMuted,t.bgMuted],[e.text,t.text],[e.textMuted,t.textMuted],[e.textInverse,t.textInverse],[e.border,t.border],[e.code,t.code],[e.status.tip.accent,t.status.tip.accent],[e.status.tip.soft,t.status.tip.soft],[e.status.warning.accent,t.status.warning.accent],[e.status.warning.soft,t.status.warning.soft],[e.status.info.accent,t.status.info.accent],[e.status.info.soft,t.status.info.soft],[e.status.danger.accent,t.status.danger.accent],[e.status.danger.soft,t.status.danger.soft]];e.preBg&&t.preBg&&n.push([e.preBg,t.preBg]),e.preText&&t.preText&&n.push([e.preText,t.preText]);const o=[];for(const[r,i]of n){o.push([r,i]);const a=y5(r);a!==r&&o.push([a,i])}o.sort((r,i)=>i[0].length-r[0].length);const s=new Set;return o.filter(([r])=>{const i=r.toLowerCase();return s.has(i)?!1:(s.add(i),!0)})}function w5(e,t,n){if(!t)return e;const o=e.toLowerCase(),s=t.toLowerCase();let r="",i=0;for(;i<e.length;)o.slice(i,i+s.length)===s?(r+=n,i+=s.length):(r+=e[i],i+=1);return r}function S5(e){const{showUndo:t,pingTransient:n,editorRef:o,paletteRef:s,ui:r}=e;function i(){if(!Re.value)return;const g=Re.value;Re.value="",t("已清空正文",()=>{Re.value=g})}function a(){const g=Fa(Ze.value);if(Re.value===g)return;const h=Re.value;Re.value=g,h.trim()?t("已载入示例，原正文可撤销",()=>{Re.value=h}):n("已载入示例")}async function l(){const g=await AA(Ze.value);if(!g||Re.value===g){n("本主题暂无组件参考");return}const h=Re.value;Re.value=g,h.trim()?t("已载入组件参考，原正文可撤销",()=>{Re.value=h}):n("已载入组件参考")}async function c(){const g=await IA();if(!g||Re.value===g){n("全功能展示稿为空");return}const h=Re.value;Re.value=g,h.trim()?t("已载入全功能展示，原正文可撤销",()=>{Re.value=h}):n("已载入全功能展示")}function u(){const g=Re.value;if(!g){n("正文为空");return}const{fixed:h,ranges:w}=t0(g);if(w.length===0){n("中文排版已干净");return}Re.value=h,t(`已修正 ${w.length} 处中文排版`,()=>{Re.value=g}),requestAnimationFrame(()=>{o.value?.highlightZhFix?.(w)})}function d(g){const h=ri(Ze.value);Tt.value=b5({base:h,seed:g,id:`${h.id}--custom`,name:`${h.name} · 自定义`})}function f(){Tt.value&&(Tt.value=null,n("已还原主题配色"))}function m(g){const h=o.value;h&&typeof h.insertAtCursor=="function"?h.insertAtCursor(g):Re.value=`${Re.value}${Re.value.endsWith(`
`)?"":`
`}
${g}`,n("已插入")}function v(){const h=o.value?.getSelectedText?.()??"";if(!h.trim()){n("先在编辑器中选中一段 markdown");return}r.rightSlot!=="components"&&(r.rightSlot="components"),requestAnimationFrame(()=>s.value?.openSaveDialog?.(h))}return{handleClear:i,handleLoadSample:a,handleLoadReference:l,handleLoadShowcase:c,handleFixZhTypo:u,handleApplyPalette:d,handleResetPalette:f,handleInsertTemplate:m,handleSaveSelection:v}}function _5(e){const t=La(Pa,e);if(!t)return{ok:!1,reason:"parse"};const n=t.component,o=Na({name:n.name,description:n.description,kind:n.kind,variantId:n.variantId,markdownSnippet:n.markdownSnippet,thumbnailSvg:n.thumbnailSvg});return o.ok?{ok:!0,entryId:o.entry.id,name:o.entry.name}:{ok:!1,reason:o.reason==="validation"?"validation":"parse",message:o.reason==="validation"?"导入的组件未通过校验（可能含未注册容器 / variant）":"导入失败"}}function k5(e){return La(Pa,e)}function x5(e){const t=location.hash,n=k5(t);if(!n)return!1;const o=window.confirm(`检测到分享链接里包含组件「${n.component.name}」。
导入到我的组件库吗？

（${n.component.description||"无描述"}）`);try{history.replaceState(null,"",location.pathname+location.search)}catch{location.hash=""}if(!o)return!1;const s=_5(t);return s.ok?(e?.(),!0):(s.message&&window.alert(s.message),!1)}function C5(e){y1(),mt(()=>{const t=$t(lp);t&&(Ze.value=t);const n=$t(Gr);if(n){const s=Number.parseInt(n,10);Number.isFinite(s)&&s>0&&(bn.value=s)}x5(e.onComponentImported),e.flushDraftSave(),e.tryLoadShareFromHash((s,r,i)=>{e.activeDraftId.value=s,Re.value=r,Ze.value=i})||e.initActiveDraft(Ze.value),window.addEventListener("pagehide",e.flushDraftSave)}),je(e.hasOpenDrawer,t=>{document.body.classList.toggle("drawer-scroll-lock",t&&G3())}),je(bn,t=>{t==null?wt(Gr,""):wt(Gr,String(Math.round(t)))}),Je(()=>{window.removeEventListener("pagehide",e.flushDraftSave),e.flushDraftSave(),document.body.classList.remove("drawer-scroll-lock")})}const $5=407,E5=6,T5=8,_p=320;function A5(e){const t=te(window.innerWidth);function n(){t.value=window.innerWidth}mt(()=>window.addEventListener("resize",n)),Je(()=>window.removeEventListener("resize",n));const o=ne(()=>Math.max(_p,t.value-$5-E5-T5));return je([t,o],()=>{e.editorWidth.value!==null&&e.editorWidth.value>o.value&&(e.editorWidth.value=o.value)}),{editorMaxWidth:o,viewportW:t}}const I5=["data-mobile-tab"],R5={class:"pane pane-preview"},M5={class:"mobile-tabs",role:"tablist","aria-label":"视图切换"},O5=["aria-selected"],N5=["aria-selected"],si="wechat-typeset:onboard:dismissed",L5=Me({__name:"App",setup(e){const t=te(null),n=te(null),o=te(null),s=te(null),{ui:r,drawerStates:i,toggleLeft:a,toggleRight:l,closeAll:c}=TA(),{activeDraftId:u,draftIndexTick:d,displayedSavingLabel:f,displayedSavingState:m,currentDraftTitle:v,undo:g,initActiveDraft:h,handleSave:w,handleSelectDraft:A,handleDeleteDraftRequest:M,flushDraftSave:R,pingTransient:B,showUndo:N,onUndo:k,onUndoExpire:y,fileStem:b}=LA({md:Re,baseThemeId:Ze,getSample:Fa}),_=ne(()=>({md:Re.value,theme:Vr.value})),{rendered:x,flush:$}=EA(_,{delayMs:80}),{outlinkStrategy:P,setOutlinkStrategy:W,persistentError:O,copyResult:E,dismissCopyResult:F,handleCopy:j,handleCopyShareLink:oe,tryLoadShareFromHash:be}=GA({md:Re,rendered:x,flush:$,baseThemeId:Ze,activeDraftId:u,draftIndexTick:d,pingTransient:B}),{doExportHtml:xe,doExportMd:Ee,doExportImage:Ie,doExportCover:le}=o5({md:Re,rendered:x,flush:$,activeTheme:Vr,getPreviewBody:()=>n.value?.getIframe?.()?.contentDocument?.body??null,fileStem:()=>b(),pingTransient:B,setPersistentError:ge=>{O.value=ge}});m5({showUndo:N,activeDraftId:u,draftIndexTick:d});const{onEditorScroll:re,onPreviewScroll:ce}=u5({editorRef:t,previewRef:n}),{collapsed:ve,observe:Ue}=c5();function St(ge){re(ge),Ue(ge,"editor")}function gt(ge){ce(ge),Ue(ge,"preview")}const{handleClear:Gt,handleLoadSample:S,handleLoadReference:C,handleLoadShowcase:D,handleFixZhTypo:U,handleApplyPalette:K,handleResetPalette:G,handleInsertTemplate:V,handleSaveSelection:Z}=S5({showUndo:N,pingTransient:B,editorRef:t,paletteRef:s,ui:r});function J(){const ge=ls({title:"新草稿",body:`# 新草稿
`,themeId:Ze.value});A(ge.id),d.value+=1}je(dn,()=>{c()});const{editorMaxWidth:H}=A5({editorWidth:bn}),de=te($t(si)==="1");function ee(){de.value=!0,wt(si,"1")}function fe(){aa(si),de.value=!1,r.helpOpen=!1,r.commandOpen=!1,c()}const me=ne(()=>!de.value&&!r.commandOpen&&!r.helpOpen&&r.leftSlot===null&&r.rightSlot===null),q=ne(()=>r.leftSlot!==null||r.rightSlot!==null||r.commandOpen||r.helpOpen);function X(ge){ge==="drafts"?a("drafts"):l(ge==="personaStudio"?"persona-studio":ge)}function ie(ge){switch(ge){case"copy":return j();case"clear":return Gt();case"loadSample":return S();case"loadReference":return C();case"loadShowcase":return D();case"saveSelection":return Z();case"fixZhTypo":return U();case"exportHtml":return xe();case"exportMd":return Ee();case"exportImage":return Ie();case"exportCoverHorizontal":return le("wechat-horizontal");case"exportCoverSquare":return le("wechat-square");case"copyShareLink":return oe();case"openCommand":r.commandOpen=!0;return;case"openHelp":r.helpOpen=!0;return;case"dismissError":O.value=null;return}}const he=g5({modKey:_t,ui:r,drawerStates:i,toggleLeft:a,toggleRight:l,draftIndexTick:d,activeDraftId:u,handleSave:w,handleSelectDraft:A,handleCopy:j,handleCopyShareLink:oe,doExportHtml:xe,doExportMd:Ee,doExportImage:Ie,doExportCoverHorizontal:()=>le("wechat-horizontal"),doExportCoverSquare:()=>le("wechat-square"),handleClear:Gt,handleLoadSample:S,handleLoadReference:C,handleLoadShowcase:D,handleSaveSelection:Z,handleFixZhTypo:U});return i5({openCommand:()=>{r.commandOpen=!0},copy:j,save:w,toggleCustomizer:()=>l("customizer"),toggleDrafts:()=>a("drafts"),toggleComponents:()=>l("components"),exportHtml:xe,exportMd:Ee,openHelp:()=>{r.helpOpen=!0},closeCommand:()=>r.commandOpen?(r.commandOpen=!1,!0):!1,closeHelp:()=>r.helpOpen?(r.helpOpen=!1,!0):!1,closeDrawers:()=>r.leftSlot!==null||r.rightSlot!==null?(c(),!0):!1}),C5({activeDraftId:u,initActiveDraft:h,flushDraftSave:R,tryLoadShareFromHash:be,hasOpenDrawer:q}),(ge,se)=>(T(),L("div",{class:Ce(["app",{"drawer-open":q.value}])},[$e(Yb,{ref_key:"toolbarRef",ref:o,collapsed:I(ve),"draft-title":I(v),"active-draft-id":I(u),"draft-index-tick":I(d),"word-count":I(x).wordCount,"reading-time":I(x).readingTime,"saving-state":I(m),"saving-label":I(f),error:I(O),"theme-id":I(Ze),"has-custom-color":I(Tt)!==null,drawer:I(i),"outlink-strategy":I(P),"ui-theme":I(co),"onUpdate:themeId":se[0]||(se[0]=_e=>Ze.value=_e),"onUpdate:outlinkStrategy":I(W),"onUpdate:uiTheme":se[1]||(se[1]=_e=>co.value=_e),onHoverTheme:se[2]||(se[2]=_e=>Ei.value=_e),onToggle:X,onAction:ie,onSelectDraft:I(A),onNewDraft:J},null,8,["collapsed","draft-title","active-draft-id","draft-index-tick","word-count","reading-time","saving-state","saving-label","error","theme-id","has-custom-color","drawer","outlink-strategy","ui-theme","onUpdate:outlinkStrategy","onSelectDraft"]),p("main",{class:"main","data-mobile-tab":I(dn)},[I(r).leftSlot==="drafts"?(T(),He(In,{key:0,"fallback-title":"草稿列表加载失败",onClose:se[4]||(se[4]=_e=>I(r).leftSlot=null)},{default:kt(()=>[$e(Qy,{"active-id":I(u),onSelect:I(A),onClose:se[3]||(se[3]=_e=>I(r).leftSlot=null),onRequestDelete:I(M)},null,8,["active-id","onSelect","onRequestDelete"])]),_:1})):ue("",!0),p("section",{class:Ce(["pane pane-editor",{"fixed-width":I(bn)!==null}]),style:Ge(I(bn)!==null?{"--editor-w":I(bn)+"px"}:void 0)},[$e(_1,{ref_key:"editorRef",ref:t,modelValue:I(Re),"onUpdate:modelValue":se[5]||(se[5]=_e=>Ye(Re)?Re.value=_e:null),onScroll:St},null,8,["modelValue"]),me.value?(T(),He(rA,{key:0,onDismiss:ee,onOpenHelp:se[6]||(se[6]=_e=>{I(r).helpOpen=!0,ee()})})):ue("",!0)],6),$e(Xb,{width:I(bn),min:I(_p),max:I(H),"onUpdate:width":se[7]||(se[7]=_e=>bn.value=_e)},null,8,["width","min","max"]),p("section",R5,[$e(M1,{ref_key:"previewRef",ref:n,html:I(x).html,"patch-log":I(x).patchLog,onScroll:gt},null,8,["html","patch-log"])]),I(r).rightSlot==="components"?(T(),He(In,{key:1,"fallback-title":"组件库加载失败",onClose:se[9]||(se[9]=_e=>I(r).rightSlot=null)},{default:kt(()=>[$e(t3,{ref_key:"paletteRef",ref:s,theme:I(Vr),onInsert:I(V),onClose:se[8]||(se[8]=_e=>I(r).rightSlot=null)},null,8,["theme","onInsert"])]),_:1})):I(r).rightSlot==="customizer"?(T(),He(In,{key:2,"fallback-title":"配色面板渲染失败",onClose:se[11]||(se[11]=_e=>I(r).rightSlot=null)},{default:kt(()=>[$e(ES,{"has-custom-color":I(Tt)!==null,onApply:I(K),onReset:I(G),onClose:se[10]||(se[10]=_e=>I(r).rightSlot=null)},null,8,["has-custom-color","onApply","onReset"])]),_:1})):I(r).rightSlot==="checklist"?(T(),He(In,{key:3,"fallback-title":"发文清单渲染失败",onClose:se[13]||(se[13]=_e=>I(r).rightSlot=null)},{default:kt(()=>[$e(w3,{md:I(Re),onClose:se[12]||(se[12]=_e=>I(r).rightSlot=null)},null,8,["md"])]),_:1})):I(r).rightSlot==="persona-studio"?(T(),He(In,{key:4,"fallback-title":"主题编辑器渲染失败",onClose:se[15]||(se[15]=_e=>I(r).rightSlot=null)},{default:kt(()=>[$e($$,{"initial-base-id":I(Ze),onClose:se[14]||(se[14]=_e=>I(r).rightSlot=null)},null,8,["initial-base-id"])]),_:1})):ue("",!0)],8,I5),I(r).commandOpen?(T(),He(In,{key:0,"fallback-title":"命令面板渲染失败",onClose:se[17]||(se[17]=_e=>I(r).commandOpen=!1)},{default:kt(()=>[$e(A3,{commands:I(he),onClose:se[16]||(se[16]=_e=>I(r).commandOpen=!1)},null,8,["commands"])]),_:1})):ue("",!0),I(r).helpOpen?(T(),He(In,{key:1,"fallback-title":"帮助面板渲染失败",onClose:se[19]||(se[19]=_e=>I(r).helpOpen=!1)},{default:kt(()=>[$e(q3,{commands:I(he),onClose:se[18]||(se[18]=_e=>I(r).helpOpen=!1),onInsert:I(V),onRestartOnboard:fe},null,8,["commands","onInsert"])]),_:1})):ue("",!0),I(g)?(T(),He(cA,{key:2,message:I(g).message,onUndo:I(k),onExpire:I(y)},null,8,["message","onUndo","onExpire"])):ue("",!0),I(E)?(T(),He(bA,{key:3,message:I(E).message,details:I(E).details,cta:I(E).cta,onDismiss:I(F)},null,8,["message","details","cta","onDismiss"])):ue("",!0),I(r).leftSlot||I(r).rightSlot?(T(),L("div",{key:4,class:"mobile-drawer-mask","aria-hidden":"true",onClick:se[20]||(se[20]=_e=>{I(r).leftSlot=null,I(r).rightSlot=null})})):ue("",!0),p("nav",M5,[p("button",{class:Ce(["mobile-tab",{active:I(dn)==="editor"}]),role:"tab","aria-selected":I(dn)==="editor",onClick:se[21]||(se[21]=_e=>dn.value="editor")},"编辑",10,O5),p("button",{class:"mobile-tab-copy","aria-label":"复制到剪贴板",onClick:se[22]||(se[22]=(..._e)=>I(j)&&I(j)(..._e))},"一键复制"),p("button",{class:Ce(["mobile-tab",{active:I(dn)==="preview"}]),role:"tab","aria-selected":I(dn)==="preview",onClick:se[23]||(se[23]=_e=>dn.value="preview")},"预览",10,N5)])],2))}}),D5=Oe(L5,[["__scopeId","data-v-2959b62c"]]);jg(D5).mount("#app");export{Nn as A,ht as B,ae as F,p4 as P,z5 as S,Oe as _,mT as a,p as b,ne as c,ue as d,L as e,De as f,$e as g,Me as h,zc as i,U5 as j,H5 as k,bk as l,V5 as m,jn as n,Ce as o,Je as p,mt as q,T as r,te as s,ip as t,Te as u,z as v,Yr as w,vt as x,je as y,et as z};
