const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IsolatedPreview-CXS4eLDm.js","assets/themes-MDkJVAjA.js","assets/markdown-C7l5odKG.js","assets/codemirror-CLw21sAn.js","assets/juice-DRS-NUY2.js","assets/IsolatedPreview-CAeekjYe.css","assets/SourceModePanel-CN0SGsdx.js","assets/userVariantScaffold-D69oA-Ax.js","assets/userVariantScaffold-CnuzLc4l.css","assets/SourceModePanel-Ciuf7aPl.css","assets/CustomModePanel-Dd33FcyN.js","assets/CustomModePanel-BpibVBhA.css","assets/UserVariantsPanel-jPLk0bsN.js","assets/UserVariantsPanel-pIrqv1io.css","assets/PublishChecklist-cUTWzQJp.js","assets/PublishChecklist-DylEW2uM.css","assets/WritingStyleControl-CkZVoOs-.js","assets/WritingStyleControl-DSmtl8fZ.css","assets/ThemeInspector-D2JV1Cx7.js","assets/ThemeInspector-B8dY_TUz.css"])))=>i.map(i=>d[i]);
import{V as En,E as Zi,f as Qi,v as dt,z as pa,w as G,A as zh,S as Ql,i as Wh,l as Xl,d as ha,n as Kh,g as qh,k as ec,F as tc,R as Gh,N as Yh,c as Jh,Q as nc,h as Zh,P as Qh,T as oc,G as Es,D as Ts,X as Xh,W as em,o as tm,p as nm,C as $i,m as rc,O as om,j as rm,M as im,H as sm,a as am,K as lm,Y as cm,L as ar,I as um,y as dm,b as fm,x as pm,U as id,B as sd,J as hm,r as mm,q as gm,s as bm,t as ym,u as vm}from"./themes-MDkJVAjA.js";import{M as ad,c as ma,k as wm,l as Sm,f as km,m as xm,i as _m}from"./markdown-C7l5odKG.js";import{d as Cm,t as $m,y as Em,c as ld,b as Rt,l as cd,D as Co,R as Tm,S as Am,e as Im,a as ud,s as dd,j as Rm,m as Mm,n as fd,r as pd,h as hd,o as md,k as Om,q as gd,u as bd,C as Lm,i as Nm,v as yd,z as Dm,g as Pm,w as Bm}from"./codemirror-CLw21sAn.js";import{j as Fm}from"./juice-DRS-NUY2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const ic=globalThis||void 0||self;/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ua(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Qe={},Go=[],Tn=()=>{},vd=()=>!1,Xi=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),es=e=>e.startsWith("onUpdate:"),Ct=Object.assign,za=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},jm=Object.prototype.hasOwnProperty,ze=(e,t)=>jm.call(e,t),Se=Array.isArray,Yo=e=>Qr(e)==="[object Map]",lr=e=>Qr(e)==="[object Set]",sc=e=>Qr(e)==="[object Date]",Ce=e=>typeof e=="function",at=e=>typeof e=="string",cn=e=>typeof e=="symbol",Ze=e=>e!==null&&typeof e=="object",wd=e=>(Ze(e)||Ce(e))&&Ce(e.then)&&Ce(e.catch),Sd=Object.prototype.toString,Qr=e=>Sd.call(e),Hm=e=>Qr(e).slice(8,-1),kd=e=>Qr(e)==="[object Object]",Wa=e=>at(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Mr=Ua(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ts=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Vm=/-\w/g,sn=ts(e=>e.replace(Vm,t=>t.slice(1).toUpperCase())),Um=/\B([A-Z])/g,lo=ts(e=>e.replace(Um,"-$1").toLowerCase()),xd=ts(e=>e.charAt(0).toUpperCase()+e.slice(1)),As=ts(e=>e?`on${xd(e)}`:""),$n=(e,t)=>!Object.is(e,t),Ei=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},_d=(e,t,n,o=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:o,value:n})},ns=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ac;const os=()=>ac||(ac=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof ic<"u"?ic:{});function Qt(e){if(Se(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],r=at(o)?qm(o):Qt(o);if(r)for(const i in r)t[i]=r[i]}return t}else if(at(e)||Ze(e))return e}const zm=/;(?![^(]*\))/g,Wm=/:([^]+)/,Km=/\/\*[^]*?\*\//g;function qm(e){const t={};return e.replace(Km,"").split(zm).forEach(n=>{if(n){const o=n.split(Wm);o.length>1&&(t[o[0].trim()]=o[1].trim())}}),t}function $e(e){let t="";if(at(e))t=e;else if(Se(e))for(let n=0;n<e.length;n++){const o=$e(e[n]);o&&(t+=o+" ")}else if(Ze(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Gm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ym=Ua(Gm);function Cd(e){return!!e||e===""}function Jm(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=cr(e[o],t[o]);return n}function cr(e,t){if(e===t)return!0;let n=sc(e),o=sc(t);if(n||o)return n&&o?e.getTime()===t.getTime():!1;if(n=cn(e),o=cn(t),n||o)return e===t;if(n=Se(e),o=Se(t),n||o)return n&&o?Jm(e,t):!1;if(n=Ze(e),o=Ze(t),n||o){if(!n||!o)return!1;const r=Object.keys(e).length,i=Object.keys(t).length;if(r!==i)return!1;for(const s in e){const a=e.hasOwnProperty(s),l=t.hasOwnProperty(s);if(a&&!l||!a&&l||!cr(e[s],t[s]))return!1}}return String(e)===String(t)}function Ka(e,t){return e.findIndex(n=>cr(n,t))}const $d=e=>!!(e&&e.__v_isRef===!0),U=e=>at(e)?e:e==null?"":Se(e)||Ze(e)&&(e.toString===Sd||!Ce(e.toString))?$d(e)?U(e.value):JSON.stringify(e,Ed,2):String(e),Ed=(e,t)=>$d(t)?Ed(e,t.value):Yo(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[o,r],i)=>(n[Is(o,i)+" =>"]=r,n),{})}:lr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>Is(n))}:cn(t)?Is(t):Ze(t)&&!Se(t)&&!kd(t)?String(t):t,Is=(e,t="")=>{var n;return cn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _t;class Zm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&_t&&(_t.active?(this.parent=_t,this.index=(_t.scopes||(_t.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=_t;try{return _t=this,t()}finally{_t=n}}}on(){++this._on===1&&(this.prevScope=_t,_t=this)}off(){if(this._on>0&&--this._on===0){if(_t===this)_t=this.prevScope;else{let t=_t;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,o;for(n=0,o=this.effects.length;n<o;n++)this.effects[n].stop();for(this.effects.length=0,n=0,o=this.cleanups.length;n<o;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,o=this.scopes.length;n<o;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Qm(){return _t}let tt;const Rs=new WeakSet;class Td{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_t&&(_t.active?_t.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Rs.has(this)&&(Rs.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Id(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,lc(this),Rd(this);const t=tt,n=an;tt=this,an=!0;try{return this.fn()}finally{Md(this),tt=t,an=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ya(t);this.deps=this.depsTail=void 0,lc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Rs.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ga(this)&&this.run()}get dirty(){return ga(this)}}let Ad=0,Or,Lr;function Id(e,t=!1){if(e.flags|=8,t){e.next=Lr,Lr=e;return}e.next=Or,Or=e}function qa(){Ad++}function Ga(){if(--Ad>0)return;if(Lr){let t=Lr;for(Lr=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Or;){let t=Or;for(Or=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(o){e||(e=o)}t=n}}if(e)throw e}function Rd(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Md(e){let t,n=e.depsTail,o=n;for(;o;){const r=o.prevDep;o.version===-1?(o===n&&(n=r),Ya(o),Xm(o)):t=o,o.dep.activeLink=o.prevActiveLink,o.prevActiveLink=void 0,o=r}e.deps=t,e.depsTail=n}function ga(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Od(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Od(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Hr)||(e.globalVersion=Hr,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ga(e))))return;e.flags|=2;const t=e.dep,n=tt,o=an;tt=e,an=!0;try{Rd(e);const r=e.fn(e._value);(t.version===0||$n(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{tt=n,an=o,Md(e),e.flags&=-3}}function Ya(e,t=!1){const{dep:n,prevSub:o,nextSub:r}=e;if(o&&(o.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=o,e.nextSub=void 0),n.subs===e&&(n.subs=o,!o&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Ya(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Xm(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let an=!0;const Ld=[];function Kn(){Ld.push(an),an=!1}function qn(){const e=Ld.pop();an=e===void 0?!0:e}function lc(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=tt;tt=void 0;try{t()}finally{tt=n}}}let Hr=0;class eg{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ja{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!tt||!an||tt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==tt)n=this.activeLink=new eg(tt,this),tt.deps?(n.prevDep=tt.depsTail,tt.depsTail.nextDep=n,tt.depsTail=n):tt.deps=tt.depsTail=n,Nd(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const o=n.nextDep;o.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=o),n.prevDep=tt.depsTail,n.nextDep=void 0,tt.depsTail.nextDep=n,tt.depsTail=n,tt.deps===n&&(tt.deps=o)}return n}trigger(t){this.version++,Hr++,this.notify(t)}notify(t){qa();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Ga()}}}function Nd(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let o=t.deps;o;o=o.nextDep)Nd(o)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const ba=new WeakMap,Ao=Symbol(""),ya=Symbol(""),Vr=Symbol("");function Mt(e,t,n){if(an&&tt){let o=ba.get(e);o||ba.set(e,o=new Map);let r=o.get(n);r||(o.set(n,r=new Ja),r.map=o,r.key=n),r.track()}}function jn(e,t,n,o,r,i){const s=ba.get(e);if(!s){Hr++;return}const a=l=>{l&&l.trigger()};if(qa(),t==="clear")s.forEach(a);else{const l=Se(e),c=l&&Wa(n);if(l&&n==="length"){const u=Number(o);s.forEach((d,f)=>{(f==="length"||f===Vr||!cn(f)&&f>=u)&&a(d)})}else switch((n!==void 0||s.has(void 0))&&a(s.get(n)),c&&a(s.get(Vr)),t){case"add":l?c&&a(s.get("length")):(a(s.get(Ao)),Yo(e)&&a(s.get(ya)));break;case"delete":l||(a(s.get(Ao)),Yo(e)&&a(s.get(ya)));break;case"set":Yo(e)&&a(s.get(Ao));break}}Ga()}function Fo(e){const t=Ue(e);return t===e?t:(Mt(t,"iterate",Vr),Xt(e)?t:t.map(un))}function rs(e){return Mt(e=Ue(e),"iterate",Vr),e}function _n(e,t){return Gn(e)?Xo(Io(e)?un(t):t):un(t)}const tg={__proto__:null,[Symbol.iterator](){return Ms(this,Symbol.iterator,e=>_n(this,e))},concat(...e){return Fo(this).concat(...e.map(t=>Se(t)?Fo(t):t))},entries(){return Ms(this,"entries",e=>(e[1]=_n(this,e[1]),e))},every(e,t){return Nn(this,"every",e,t,void 0,arguments)},filter(e,t){return Nn(this,"filter",e,t,n=>n.map(o=>_n(this,o)),arguments)},find(e,t){return Nn(this,"find",e,t,n=>_n(this,n),arguments)},findIndex(e,t){return Nn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Nn(this,"findLast",e,t,n=>_n(this,n),arguments)},findLastIndex(e,t){return Nn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Nn(this,"forEach",e,t,void 0,arguments)},includes(...e){return Os(this,"includes",e)},indexOf(...e){return Os(this,"indexOf",e)},join(e){return Fo(this).join(e)},lastIndexOf(...e){return Os(this,"lastIndexOf",e)},map(e,t){return Nn(this,"map",e,t,void 0,arguments)},pop(){return Sr(this,"pop")},push(...e){return Sr(this,"push",e)},reduce(e,...t){return cc(this,"reduce",e,t)},reduceRight(e,...t){return cc(this,"reduceRight",e,t)},shift(){return Sr(this,"shift")},some(e,t){return Nn(this,"some",e,t,void 0,arguments)},splice(...e){return Sr(this,"splice",e)},toReversed(){return Fo(this).toReversed()},toSorted(e){return Fo(this).toSorted(e)},toSpliced(...e){return Fo(this).toSpliced(...e)},unshift(...e){return Sr(this,"unshift",e)},values(){return Ms(this,"values",e=>_n(this,e))}};function Ms(e,t,n){const o=rs(e),r=o[t]();return o!==e&&!Xt(e)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const ng=Array.prototype;function Nn(e,t,n,o,r,i){const s=rs(e),a=s!==e&&!Xt(e),l=s[t];if(l!==ng[t]){const d=l.apply(e,i);return a?un(d):d}let c=n;s!==e&&(a?c=function(d,f){return n.call(this,_n(e,d),f,e)}:n.length>2&&(c=function(d,f){return n.call(this,d,f,e)}));const u=l.call(s,c,o);return a&&r?r(u):u}function cc(e,t,n,o){const r=rs(e),i=r!==e&&!Xt(e);let s=n,a=!1;r!==e&&(i?(a=o.length===0,s=function(c,u,d){return a&&(a=!1,c=_n(e,c)),n.call(this,c,_n(e,u),d,e)}):n.length>3&&(s=function(c,u,d){return n.call(this,c,u,d,e)}));const l=r[t](s,...o);return a?_n(e,l):l}function Os(e,t,n){const o=Ue(e);Mt(o,"iterate",Vr);const r=o[t](...n);return(r===-1||r===!1)&&Xa(n[0])?(n[0]=Ue(n[0]),o[t](...n)):r}function Sr(e,t,n=[]){Kn(),qa();const o=Ue(e)[t].apply(e,n);return Ga(),qn(),o}const og=Ua("__proto__,__v_isRef,__isVue"),Dd=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(cn));function rg(e){cn(e)||(e=String(e));const t=Ue(this);return Mt(t,"has",e),t.hasOwnProperty(e)}class Pd{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,o){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return o===(r?i?hg:Hd:i?jd:Fd).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(o)?t:void 0;const s=Se(t);if(!r){let l;if(s&&(l=tg[n]))return l;if(n==="hasOwnProperty")return rg}const a=Reflect.get(t,n,bt(t)?t:o);if((cn(n)?Dd.has(n):og(n))||(r||Mt(t,"get",n),i))return a;if(bt(a)){const l=s&&Wa(n)?a:a.value;return r&&Ze(l)?wa(l):l}return Ze(a)?r?wa(a):Rn(a):a}}class Bd extends Pd{constructor(t=!1){super(!1,t)}set(t,n,o,r){let i=t[n];const s=Se(t)&&Wa(n);if(!this._isShallow){const c=Gn(i);if(!Xt(o)&&!Gn(o)&&(i=Ue(i),o=Ue(o)),!s&&bt(i)&&!bt(o))return c||(i.value=o),!0}const a=s?Number(n)<t.length:ze(t,n),l=Reflect.set(t,n,o,bt(t)?t:r);return t===Ue(r)&&(a?$n(o,i)&&jn(t,"set",n,o):jn(t,"add",n,o)),l}deleteProperty(t,n){const o=ze(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&o&&jn(t,"delete",n,void 0),r}has(t,n){const o=Reflect.has(t,n);return(!cn(n)||!Dd.has(n))&&Mt(t,"has",n),o}ownKeys(t){return Mt(t,"iterate",Se(t)?"length":Ao),Reflect.ownKeys(t)}}class ig extends Pd{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const sg=new Bd,ag=new ig,lg=new Bd(!0);const va=e=>e,fi=e=>Reflect.getPrototypeOf(e);function cg(e,t,n){return function(...o){const r=this.__v_raw,i=Ue(r),s=Yo(i),a=e==="entries"||e===Symbol.iterator&&s,l=e==="keys"&&s,c=r[e](...o),u=n?va:t?Xo:un;return!t&&Mt(i,"iterate",l?ya:Ao),Ct(Object.create(c),{next(){const{value:d,done:f}=c.next();return f?{value:d,done:f}:{value:a?[u(d[0]),u(d[1])]:u(d),done:f}}})}}function pi(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function ug(e,t){const n={get(r){const i=this.__v_raw,s=Ue(i),a=Ue(r);e||($n(r,a)&&Mt(s,"get",r),Mt(s,"get",a));const{has:l}=fi(s),c=t?va:e?Xo:un;if(l.call(s,r))return c(i.get(r));if(l.call(s,a))return c(i.get(a));i!==s&&i.get(r)},get size(){const r=this.__v_raw;return!e&&Mt(Ue(r),"iterate",Ao),r.size},has(r){const i=this.__v_raw,s=Ue(i),a=Ue(r);return e||($n(r,a)&&Mt(s,"has",r),Mt(s,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const s=this,a=s.__v_raw,l=Ue(a),c=t?va:e?Xo:un;return!e&&Mt(l,"iterate",Ao),a.forEach((u,d)=>r.call(i,c(u),c(d),s))}};return Ct(n,e?{add:pi("add"),set:pi("set"),delete:pi("delete"),clear:pi("clear")}:{add(r){const i=Ue(this),s=fi(i),a=Ue(r),l=!t&&!Xt(r)&&!Gn(r)?a:r;return s.has.call(i,l)||$n(r,l)&&s.has.call(i,r)||$n(a,l)&&s.has.call(i,a)||(i.add(l),jn(i,"add",l,l)),this},set(r,i){!t&&!Xt(i)&&!Gn(i)&&(i=Ue(i));const s=Ue(this),{has:a,get:l}=fi(s);let c=a.call(s,r);c||(r=Ue(r),c=a.call(s,r));const u=l.call(s,r);return s.set(r,i),c?$n(i,u)&&jn(s,"set",r,i):jn(s,"add",r,i),this},delete(r){const i=Ue(this),{has:s,get:a}=fi(i);let l=s.call(i,r);l||(r=Ue(r),l=s.call(i,r)),a&&a.call(i,r);const c=i.delete(r);return l&&jn(i,"delete",r,void 0),c},clear(){const r=Ue(this),i=r.size!==0,s=r.clear();return i&&jn(r,"clear",void 0,void 0),s}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=cg(r,e,t)}),n}function Za(e,t){const n=ug(e,t);return(o,r,i)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?o:Reflect.get(ze(n,r)&&r in o?n:o,r,i)}const dg={get:Za(!1,!1)},fg={get:Za(!1,!0)},pg={get:Za(!0,!1)};const Fd=new WeakMap,jd=new WeakMap,Hd=new WeakMap,hg=new WeakMap;function mg(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function gg(e){return e.__v_skip||!Object.isExtensible(e)?0:mg(Hm(e))}function Rn(e){return Gn(e)?e:Qa(e,!1,sg,dg,Fd)}function bg(e){return Qa(e,!1,lg,fg,jd)}function wa(e){return Qa(e,!0,ag,pg,Hd)}function Qa(e,t,n,o,r){if(!Ze(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=gg(e);if(i===0)return e;const s=r.get(e);if(s)return s;const a=new Proxy(e,i===2?o:n);return r.set(e,a),a}function Io(e){return Gn(e)?Io(e.__v_raw):!!(e&&e.__v_isReactive)}function Gn(e){return!!(e&&e.__v_isReadonly)}function Xt(e){return!!(e&&e.__v_isShallow)}function Xa(e){return e?!!e.__v_raw:!1}function Ue(e){const t=e&&e.__v_raw;return t?Ue(t):e}function yg(e){return!ze(e,"__v_skip")&&Object.isExtensible(e)&&_d(e,"__v_skip",!0),e}const un=e=>Ze(e)?Rn(e):e,Xo=e=>Ze(e)?wa(e):e;function bt(e){return e?e.__v_isRef===!0:!1}function J(e){return Vd(e,!1)}function $r(e){return Vd(e,!0)}function Vd(e,t){return bt(e)?e:new vg(e,t)}class vg{constructor(t,n){this.dep=new Ja,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Ue(t),this._value=n?t:un(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,o=this.__v_isShallow||Xt(t)||Gn(t);t=o?t:Ue(t),$n(t,n)&&(this._rawValue=t,this._value=o?t:un(t),this.dep.trigger())}}function A(e){return bt(e)?e.value:e}const wg={get:(e,t,n)=>t==="__v_raw"?e:A(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return bt(r)&&!bt(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function Ud(e){return Io(e)?e:new Proxy(e,wg)}class Sg{constructor(t,n,o){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ja(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Hr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=o}notify(){if(this.flags|=16,!(this.flags&8)&&tt!==this)return Id(this,!0),!0}get value(){const t=this.dep.track();return Od(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function kg(e,t,n=!1){let o,r;return Ce(e)?o=e:(o=e.get,r=e.set),new Sg(o,r,n)}const hi={},Ri=new WeakMap;let ko;function xg(e,t=!1,n=ko){if(n){let o=Ri.get(n);o||Ri.set(n,o=[]),o.push(e)}}function _g(e,t,n=Qe){const{immediate:o,deep:r,once:i,scheduler:s,augmentJob:a,call:l}=n,c=$=>r?$:Xt($)||r===!1||r===0?Hn($,1):Hn($);let u,d,f,h,g=!1,m=!1;if(bt(e)?(d=()=>e.value,g=Xt(e)):Io(e)?(d=()=>c(e),g=!0):Se(e)?(m=!0,g=e.some($=>Io($)||Xt($)),d=()=>e.map($=>{if(bt($))return $.value;if(Io($))return c($);if(Ce($))return l?l($,2):$()})):Ce(e)?t?d=l?()=>l(e,2):e:d=()=>{if(f){Kn();try{f()}finally{qn()}}const $=ko;ko=u;try{return l?l(e,3,[h]):e(h)}finally{ko=$}}:d=Tn,t&&r){const $=d,N=r===!0?1/0:r;d=()=>Hn($(),N)}const w=Qm(),k=()=>{u.stop(),w&&w.active&&za(w.effects,u)};if(i&&t){const $=t;t=(...N)=>{$(...N),k()}}let x=m?new Array(e.length).fill(hi):hi;const L=$=>{if(!(!(u.flags&1)||!u.dirty&&!$))if(t){const N=u.run();if(r||g||(m?N.some((D,_)=>$n(D,x[_])):$n(N,x))){f&&f();const D=ko;ko=u;try{const _=[N,x===hi?void 0:m&&x[0]===hi?[]:x,h];x=N,l?l(t,3,_):t(..._)}finally{ko=D}}}else u.run()};return a&&a(L),u=new Td(d),u.scheduler=s?()=>s(L,!1):L,h=$=>xg($,!1,u),f=u.onStop=()=>{const $=Ri.get(u);if($){if(l)l($,4);else for(const N of $)N();Ri.delete(u)}},t?o?L(!0):x=u.run():s?s(L.bind(null,!0),!0):u.run(),k.pause=u.pause.bind(u),k.resume=u.resume.bind(u),k.stop=k,k}function Hn(e,t=1/0,n){if(t<=0||!Ze(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,bt(e))Hn(e.value,t,n);else if(Se(e))for(let o=0;o<e.length;o++)Hn(e[o],t,n);else if(lr(e)||Yo(e))e.forEach(o=>{Hn(o,t,n)});else if(kd(e)){for(const o in e)Hn(e[o],t,n);for(const o of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,o)&&Hn(e[o],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Xr(e,t,n,o){try{return o?e(...o):e()}catch(r){ei(r,t,n)}}function Mn(e,t,n,o){if(Ce(e)){const r=Xr(e,t,n,o);return r&&wd(r)&&r.catch(i=>{ei(i,t,n)}),r}if(Se(e)){const r=[];for(let i=0;i<e.length;i++)r.push(Mn(e[i],t,n,o));return r}}function ei(e,t,n,o=!0){const r=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||Qe;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](e,l,c)===!1)return}a=a.parent}if(i){Kn(),Xr(i,null,10,[e,l,c]),qn();return}}Cg(e,n,r,o,s)}function Cg(e,t,n,o=!0,r=!1){if(r)throw e;console.error(e)}const Vt=[];let kn=-1;const Jo=[];let ro=null,Uo=0;const zd=Promise.resolve();let Mi=null;function en(e){const t=Mi||zd;return e?t.then(this?e.bind(this):e):t}function $g(e){let t=kn+1,n=Vt.length;for(;t<n;){const o=t+n>>>1,r=Vt[o],i=Ur(r);i<e||i===e&&r.flags&2?t=o+1:n=o}return t}function el(e){if(!(e.flags&1)){const t=Ur(e),n=Vt[Vt.length-1];!n||!(e.flags&2)&&t>=Ur(n)?Vt.push(e):Vt.splice($g(t),0,e),e.flags|=1,Wd()}}function Wd(){Mi||(Mi=zd.then(qd))}function Eg(e){Se(e)?Jo.push(...e):ro&&e.id===-1?ro.splice(Uo+1,0,e):e.flags&1||(Jo.push(e),e.flags|=1),Wd()}function uc(e,t,n=kn+1){for(;n<Vt.length;n++){const o=Vt[n];if(o&&o.flags&2){if(e&&o.id!==e.uid)continue;Vt.splice(n,1),n--,o.flags&4&&(o.flags&=-2),o(),o.flags&4||(o.flags&=-2)}}}function Kd(e){if(Jo.length){const t=[...new Set(Jo)].sort((n,o)=>Ur(n)-Ur(o));if(Jo.length=0,ro){ro.push(...t);return}for(ro=t,Uo=0;Uo<ro.length;Uo++){const n=ro[Uo];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}ro=null,Uo=0}}const Ur=e=>e.id==null?e.flags&2?-1:1/0:e.id;function qd(e){try{for(kn=0;kn<Vt.length;kn++){const t=Vt[kn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Xr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;kn<Vt.length;kn++){const t=Vt[kn];t&&(t.flags&=-2)}kn=-1,Vt.length=0,Kd(),Mi=null,(Vt.length||Jo.length)&&qd()}}let Lt=null,Gd=null;function Oi(e){const t=Lt;return Lt=e,Gd=e&&e.type.__scopeId||null,t}function Jt(e,t=Lt,n){if(!t||e._n)return e;const o=(...r)=>{o._d&&_c(-1);const i=Oi(t);let s;try{s=e(...r)}finally{Oi(i),o._d&&_c(1)}return s};return o._n=!0,o._c=!0,o._d=!0,o}function ot(e,t){if(Lt===null)return e;const n=ls(Lt),o=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[i,s,a,l=Qe]=t[r];i&&(Ce(i)&&(i={mounted:i,updated:i}),i.deep&&Hn(s),o.push({dir:i,instance:n,value:s,oldValue:void 0,arg:a,modifiers:l}))}return e}function yo(e,t,n,o){const r=e.dirs,i=t&&t.dirs;for(let s=0;s<r.length;s++){const a=r[s];i&&(a.oldValue=i[s].value);let l=a.dir[o];l&&(Kn(),Mn(l,n,8,[e.el,a,e,t]),qn())}}function Tg(e,t){if(Ot){let n=Ot.provides;const o=Ot.parent&&Ot.parent.provides;o===n&&(n=Ot.provides=Object.create(o)),n[e]=t}}function Ti(e,t,n=!1){const o=Sf();if(o||Qo){let r=Qo?Qo._context.provides:o?o.parent==null||o.ce?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Ce(t)?t.call(o&&o.proxy):t}}const Ag=Symbol.for("v-scx"),Ig=()=>Ti(Ag);function Pe(e,t,n){return Yd(e,t,n)}function Yd(e,t,n=Qe){const{immediate:o,deep:r,flush:i,once:s}=n,a=Ct({},n),l=t&&o||!t&&i!=="post";let c;if(tr){if(i==="sync"){const h=Ig();c=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=Tn,h.resume=Tn,h.pause=Tn,h}}const u=Ot;a.call=(h,g,m)=>Mn(h,u,g,m);let d=!1;i==="post"?a.scheduler=h=>{Ht(h,u&&u.suspense)}:i!=="sync"&&(d=!0,a.scheduler=(h,g)=>{g?h():el(h)}),a.augmentJob=h=>{t&&(h.flags|=4),d&&(h.flags|=2,u&&(h.id=u.uid,h.i=u))};const f=_g(e,t,a);return tr&&(c?c.push(f):l&&f()),f}function Rg(e,t,n){const o=this.proxy,r=at(e)?e.includes(".")?Jd(o,e):()=>o[e]:e.bind(o,o);let i;Ce(t)?i=t:(i=t.handler,n=t);const s=ti(this),a=Yd(r,i.bind(o),n);return s(),a}function Jd(e,t){const n=t.split(".");return()=>{let o=e;for(let r=0;r<n.length&&o;r++)o=o[n[r]];return o}}const no=new WeakMap,Zd=Symbol("_vte"),Mg=e=>e.__isTeleport,xo=e=>e&&(e.disabled||e.disabled===""),Og=e=>e&&(e.defer||e.defer===""),dc=e=>typeof SVGElement<"u"&&e instanceof SVGElement,fc=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Sa=(e,t)=>{const n=e&&e.to;return at(n)?t?t(n):null:n},Lg={name:"Teleport",__isTeleport:!0,process(e,t,n,o,r,i,s,a,l,c){const{mc:u,pc:d,pbc:f,o:{insert:h,querySelector:g,createText:m,createComment:w,parentNode:k}}=c,x=xo(t.props);let{dynamicChildren:L}=t;const $=(_,v,S)=>{_.shapeFlag&16&&u(_.children,v,S,r,i,s,a,l)},N=(_=t)=>{const v=xo(_.props),S=_.target=Sa(_.props,g),I=ka(S,_,m,h);S&&(s!=="svg"&&dc(S)?s="svg":s!=="mathml"&&fc(S)&&(s="mathml"),r&&r.isCE&&(r.ce._teleportTargets||(r.ce._teleportTargets=new Set)).add(S),v||($(_,S,I),Er(_,!1)))},D=_=>{const v=()=>{if(no.get(_)===v){if(no.delete(_),xo(_.props)){const S=k(_.el)||n;$(_,S,_.anchor),Er(_,!0)}N(_)}};no.set(_,v),Ht(v,i)};if(e==null){const _=t.el=m(""),v=t.anchor=m("");if(h(_,n,o),h(v,n,o),Og(t.props)||i&&i.pendingBranch){D(t);return}x&&($(t,n,v),Er(t,!0)),N()}else{t.el=e.el;const _=t.anchor=e.anchor,v=no.get(e);if(v){v.flags|=8,no.delete(e),D(t);return}t.targetStart=e.targetStart;const S=t.target=e.target,I=t.targetAnchor=e.targetAnchor,C=xo(e.props),F=C?n:S,E=C?_:I;if(s==="svg"||dc(S)?s="svg":(s==="mathml"||fc(S))&&(s="mathml"),L?(f(e.dynamicChildren,L,F,r,i,s,a),al(e,t,!0)):l||d(e,t,F,E,r,i,s,a,!1),x)C?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):mi(t,n,_,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const j=t.target=Sa(t.props,g);j&&mi(t,j,null,c,0)}else C&&mi(t,S,I,c,1);Er(t,x)}},remove(e,t,n,{um:o,o:{remove:r}},i){const{shapeFlag:s,children:a,anchor:l,targetStart:c,targetAnchor:u,target:d,props:f}=e;let h=i||!xo(f);const g=no.get(e);if(g&&(g.flags|=8,no.delete(e),h=!1),d&&(r(c),r(u)),i&&r(l),s&16)for(let m=0;m<a.length;m++){const w=a[m];o(w,t,n,h,!!w.dynamicChildren)}},move:mi,hydrate:Ng};function mi(e,t,n,{o:{insert:o},m:r},i=2){i===0&&o(e.targetAnchor,t,n);const{el:s,anchor:a,shapeFlag:l,children:c,props:u}=e,d=i===2;if(d&&o(s,t,n),!no.has(e)&&(!d||xo(u))&&l&16)for(let f=0;f<c.length;f++)r(c[f],t,n,2);d&&o(a,t,n)}function Ng(e,t,n,o,r,i,{o:{nextSibling:s,parentNode:a,querySelector:l,insert:c,createText:u}},d){function f(w,k){let x=k;for(;x;){if(x&&x.nodeType===8){if(x.data==="teleport start anchor")t.targetStart=x;else if(x.data==="teleport anchor"){t.targetAnchor=x,w._lpa=t.targetAnchor&&s(t.targetAnchor);break}}x=s(x)}}function h(w,k){k.anchor=d(s(w),k,a(w),n,o,r,i)}const g=t.target=Sa(t.props,l),m=xo(t.props);if(g){const w=g._lpa||g.firstChild;t.shapeFlag&16&&(m?(h(e,t),f(g,w),t.targetAnchor||ka(g,t,u,c,a(e)===g?e:null)):(t.anchor=s(e),f(g,w),t.targetAnchor||ka(g,t,u,c),d(w&&s(w),t,g,n,o,r,i))),Er(t,m)}else m&&t.shapeFlag&16&&(h(e,t),t.targetStart=e,t.targetAnchor=s(e));return t.anchor&&s(t.anchor)}const Qd=Lg;function Er(e,t){const n=e.ctx;if(n&&n.ut){let o,r;for(t?(o=e.el,r=e.anchor):(o=e.targetStart,r=e.targetAnchor);o&&o!==r;)o.nodeType===1&&o.setAttribute("data-v-owner",n.uid),o=o.nextSibling;n.ut()}}function ka(e,t,n,o,r=null){const i=t.targetStart=n(""),s=t.targetAnchor=n("");return i[Zd]=s,e&&(o(i,e,r),o(s,e,r)),s}const Dg=Symbol("_leaveCb");function tl(e,t){e.shapeFlag&6&&e.component?(e.transition=t,tl(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ke(e,t){return Ce(e)?Ct({name:e.name},t,{setup:e}):e}function y6(){const e=Sf();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function nl(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function pc(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Li=new WeakMap;function Nr(e,t,n,o,r=!1){if(Se(e)){e.forEach((m,w)=>Nr(m,t&&(Se(t)?t[w]:t),n,o,r));return}if(Zo(o)&&!r){o.shapeFlag&512&&o.type.__asyncResolved&&o.component.subTree.component&&Nr(e,t,n,o.component.subTree);return}const i=o.shapeFlag&4?ls(o.component):o.el,s=r?null:i,{i:a,r:l}=e,c=t&&t.r,u=a.refs===Qe?a.refs={}:a.refs,d=a.setupState,f=Ue(d),h=d===Qe?vd:m=>pc(u,m)?!1:ze(f,m),g=(m,w)=>!(w&&pc(u,w));if(c!=null&&c!==l){if(hc(t),at(c))u[c]=null,h(c)&&(d[c]=null);else if(bt(c)){const m=t;g(c,m.k)&&(c.value=null),m.k&&(u[m.k]=null)}}if(Ce(l))Xr(l,a,12,[s,u]);else{const m=at(l),w=bt(l);if(m||w){const k=()=>{if(e.f){const x=m?h(l)?d[l]:u[l]:g()||!e.k?l.value:u[e.k];if(r)Se(x)&&za(x,i);else if(Se(x))x.includes(i)||x.push(i);else if(m)u[l]=[i],h(l)&&(d[l]=u[l]);else{const L=[i];g(l,e.k)&&(l.value=L),e.k&&(u[e.k]=L)}}else m?(u[l]=s,h(l)&&(d[l]=s)):w&&(g(l,e.k)&&(l.value=s),e.k&&(u[e.k]=s))};if(s){const x=()=>{k(),Li.delete(e)};x.id=-1,Li.set(e,x),Ht(x,n)}else hc(e),k()}}}function hc(e){const t=Li.get(e);t&&(t.flags|=8,Li.delete(e))}const mc=e=>e.nodeType===8;os().requestIdleCallback;os().cancelIdleCallback;function Pg(e,t){if(mc(e)&&e.data==="["){let n=1,o=e.nextSibling;for(;o;){if(o.nodeType===1){if(t(o)===!1)break}else if(mc(o))if(o.data==="]"){if(--n===0)break}else o.data==="["&&n++;o=o.nextSibling}}else t(e)}const Zo=e=>!!e.type.__asyncLoader;function Ro(e){Ce(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,hydrate:i,timeout:s,suspensible:a=!0,onError:l}=e;let c=null,u,d=0;const f=()=>(d++,c=null,h()),h=()=>{let g;return c||(g=c=t().catch(m=>{if(m=m instanceof Error?m:new Error(String(m)),l)return new Promise((w,k)=>{l(m,()=>w(f()),()=>k(m),d+1)});throw m}).then(m=>g!==c&&c?c:(m&&(m.__esModule||m[Symbol.toStringTag]==="Module")&&(m=m.default),u=m,m)))};return Ke({name:"AsyncComponentWrapper",__asyncLoader:h,__asyncHydrate(g,m,w){let k=!1;(m.bu||(m.bu=[])).push(()=>k=!0);const x=()=>{k||w()},L=i?()=>{const $=i(x,N=>Pg(g,N));$&&(m.bum||(m.bum=[])).push($)}:x;u?L():h().then(()=>!m.isUnmounted&&L())},get __asyncResolved(){return u},setup(){const g=Ot;if(nl(g),u)return()=>gi(u,g);const m=L=>{c=null,ei(L,g,13,!o)};if(a&&g.suspense||tr)return h().then(L=>()=>gi(L,g)).catch(L=>(m(L),()=>o?Me(o,{error:L}):null));const w=J(!1),k=J(),x=J(!!r);return r&&setTimeout(()=>{x.value=!1},r),s!=null&&setTimeout(()=>{if(!w.value&&!k.value){const L=new Error(`Async component timed out after ${s}ms.`);m(L),k.value=L}},s),h().then(()=>{w.value=!0,g.parent&&ol(g.parent.vnode)&&g.parent.update()}).catch(L=>{m(L),k.value=L}),()=>{if(w.value&&u)return gi(u,g);if(k.value&&o)return Me(o,{error:k.value});if(n&&!x.value)return gi(n,g)}}})}function gi(e,t){const{ref:n,props:o,children:r,ce:i}=t.vnode,s=Me(e,o,r);return s.ref=n,s.ce=i,delete t.vnode.ce,s}const ol=e=>e.type.__isKeepAlive;function Bg(e,t){Xd(e,"a",t)}function Fg(e,t){Xd(e,"da",t)}function Xd(e,t,n=Ot){const o=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(is(t,o,n),n){let r=n.parent;for(;r&&r.parent;)ol(r.parent.vnode)&&jg(o,t,n,r),r=r.parent}}function jg(e,t,n,o){const r=is(t,e,o,!0);rl(()=>{za(o[t],r)},n)}function is(e,t,n=Ot,o=!1){if(n){const r=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...s)=>{Kn();const a=ti(n),l=Mn(t,n,e,s);return a(),qn(),l});return o?r.unshift(i):r.push(i),i}}const Jn=e=>(t,n=Ot)=>{(!tr||e==="sp")&&is(e,(...o)=>t(...o),n)},Hg=Jn("bm"),zt=Jn("m"),Vg=Jn("bu"),Ug=Jn("u"),yt=Jn("bum"),rl=Jn("um"),zg=Jn("sp"),Wg=Jn("rtg"),Kg=Jn("rtc");function ef(e,t=Ot){is("ec",e,t)}const qg=Symbol.for("v-ndc");function Le(e,t,n,o){let r;const i=n,s=Se(e);if(s||at(e)){const a=s&&Io(e);let l=!1,c=!1;a&&(l=!Xt(e),c=Gn(e),e=rs(e)),r=new Array(e.length);for(let u=0,d=e.length;u<d;u++)r[u]=t(l?c?Xo(un(e[u])):un(e[u]):e[u],u,void 0,i)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,i)}else if(Ze(e))if(e[Symbol.iterator])r=Array.from(e,(a,l)=>t(a,l,void 0,i));else{const a=Object.keys(e);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=t(e[u],u,l,i)}}else r=[];return r}function Dr(e,t,n={},o,r){if(Lt.ce||Lt.parent&&Zo(Lt.parent)&&Lt.parent.ce){const c=Object.keys(n).length>0;return t!=="default"&&(n.name=t),O(),nt(ue,null,[Me("slot",n,o&&o())],c?-2:64)}let i=e[t];i&&i._c&&(i._d=!1),O();const s=i&&tf(i(n)),a=n.key||s&&s.key,l=nt(ue,{key:(a&&!cn(a)?a:`_${t}`)+(!s&&o?"_fb":"")},s||(o?o():[]),s&&e._===1?64:-2);return i&&i._c&&(i._d=!0),l}function tf(e){return e.some(t=>ll(t)?!(t.type===Yn||t.type===ue&&!tf(t.children)):!0)?e:null}const xa=e=>e?kf(e)?ls(e):xa(e.parent):null,Pr=Ct(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>xa(e.parent),$root:e=>xa(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>of(e),$forceUpdate:e=>e.f||(e.f=()=>{el(e.update)}),$nextTick:e=>e.n||(e.n=en.bind(e.proxy)),$watch:e=>Rg.bind(e)}),Ls=(e,t)=>e!==Qe&&!e.__isScriptSetup&&ze(e,t),Gg={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:o,data:r,props:i,accessCache:s,type:a,appContext:l}=e;if(t[0]!=="$"){const f=s[t];if(f!==void 0)switch(f){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return i[t]}else{if(Ls(o,t))return s[t]=1,o[t];if(r!==Qe&&ze(r,t))return s[t]=2,r[t];if(ze(i,t))return s[t]=3,i[t];if(n!==Qe&&ze(n,t))return s[t]=4,n[t];_a&&(s[t]=0)}}const c=Pr[t];let u,d;if(c)return t==="$attrs"&&Mt(e.attrs,"get",""),c(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(n!==Qe&&ze(n,t))return s[t]=4,n[t];if(d=l.config.globalProperties,ze(d,t))return d[t]},set({_:e},t,n){const{data:o,setupState:r,ctx:i}=e;return Ls(r,t)?(r[t]=n,!0):o!==Qe&&ze(o,t)?(o[t]=n,!0):ze(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,props:i,type:s}},a){let l;return!!(n[a]||e!==Qe&&a[0]!=="$"&&ze(e,a)||Ls(t,a)||ze(i,a)||ze(o,a)||ze(Pr,a)||ze(r.config.globalProperties,a)||(l=s.__cssModules)&&l[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ze(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function gc(e){return Se(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let _a=!0;function Yg(e){const t=of(e),n=e.proxy,o=e.ctx;_a=!1,t.beforeCreate&&bc(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:s,watch:a,provide:l,inject:c,created:u,beforeMount:d,mounted:f,beforeUpdate:h,updated:g,activated:m,deactivated:w,beforeDestroy:k,beforeUnmount:x,destroyed:L,unmounted:$,render:N,renderTracked:D,renderTriggered:_,errorCaptured:v,serverPrefetch:S,expose:I,inheritAttrs:C,components:F,directives:E,filters:j}=t;if(c&&Jg(c,o,null),s)for(const V in s){const z=s[V];Ce(z)&&(o[V]=z.bind(n))}if(r){const V=r.call(n,n);Ze(V)&&(e.data=Rn(V))}if(_a=!0,i)for(const V in i){const z=i[V],fe=Ce(z)?z.bind(n,n):Ce(z.get)?z.get.bind(n,n):Tn,je=!Ce(z)&&Ce(z.set)?z.set.bind(n):Tn,Ne=te({get:fe,set:je});Object.defineProperty(o,V,{enumerable:!0,configurable:!0,get:()=>Ne.value,set:Fe=>Ne.value=Fe})}if(a)for(const V in a)nf(a[V],o,n,V);if(l){const V=Ce(l)?l.call(n):l;Reflect.ownKeys(V).forEach(z=>{Tg(z,V[z])})}u&&bc(u,e,"c");function B(V,z){Se(z)?z.forEach(fe=>V(fe.bind(n))):z&&V(z.bind(n))}if(B(Hg,d),B(zt,f),B(Vg,h),B(Ug,g),B(Bg,m),B(Fg,w),B(ef,v),B(Kg,D),B(Wg,_),B(yt,x),B(rl,$),B(zg,S),Se(I))if(I.length){const V=e.exposed||(e.exposed={});I.forEach(z=>{Object.defineProperty(V,z,{get:()=>n[z],set:fe=>n[z]=fe,enumerable:!0})})}else e.exposed||(e.exposed={});N&&e.render===Tn&&(e.render=N),C!=null&&(e.inheritAttrs=C),F&&(e.components=F),E&&(e.directives=E),S&&nl(e)}function Jg(e,t,n=Tn){Se(e)&&(e=Ca(e));for(const o in e){const r=e[o];let i;Ze(r)?"default"in r?i=Ti(r.from||o,r.default,!0):i=Ti(r.from||o):i=Ti(r),bt(i)?Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>i.value,set:s=>i.value=s}):t[o]=i}}function bc(e,t,n){Mn(Se(e)?e.map(o=>o.bind(t.proxy)):e.bind(t.proxy),t,n)}function nf(e,t,n,o){let r=o.includes(".")?Jd(n,o):()=>n[o];if(at(e)){const i=t[e];Ce(i)&&Pe(r,i)}else if(Ce(e))Pe(r,e.bind(n));else if(Ze(e))if(Se(e))e.forEach(i=>nf(i,t,n,o));else{const i=Ce(e.handler)?e.handler.bind(n):t[e.handler];Ce(i)&&Pe(r,i,e)}}function of(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:i,config:{optionMergeStrategies:s}}=e.appContext,a=i.get(t);let l;return a?l=a:!r.length&&!n&&!o?l=t:(l={},r.length&&r.forEach(c=>Ni(l,c,s,!0)),Ni(l,t,s)),Ze(t)&&i.set(t,l),l}function Ni(e,t,n,o=!1){const{mixins:r,extends:i}=t;i&&Ni(e,i,n,!0),r&&r.forEach(s=>Ni(e,s,n,!0));for(const s in t)if(!(o&&s==="expose")){const a=Zg[s]||n&&n[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const Zg={data:yc,props:vc,emits:vc,methods:Tr,computed:Tr,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:Tr,directives:Tr,watch:Xg,provide:yc,inject:Qg};function yc(e,t){return t?e?function(){return Ct(Ce(e)?e.call(this,this):e,Ce(t)?t.call(this,this):t)}:t:e}function Qg(e,t){return Tr(Ca(e),Ca(t))}function Ca(e){if(Se(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function jt(e,t){return e?[...new Set([].concat(e,t))]:t}function Tr(e,t){return e?Ct(Object.create(null),e,t):t}function vc(e,t){return e?Se(e)&&Se(t)?[...new Set([...e,...t])]:Ct(Object.create(null),gc(e),gc(t??{})):t}function Xg(e,t){if(!e)return t;if(!t)return e;const n=Ct(Object.create(null),e);for(const o in t)n[o]=jt(e[o],t[o]);return n}function rf(){return{app:null,config:{isNativeTag:vd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let e0=0;function t0(e,t){return function(o,r=null){Ce(o)||(o=Ct({},o)),r!=null&&!Ze(r)&&(r=null);const i=rf(),s=new WeakSet,a=[];let l=!1;const c=i.app={_uid:e0++,_component:o,_props:r,_container:null,_context:i,_instance:null,version:M0,get config(){return i.config},set config(u){},use(u,...d){return s.has(u)||(u&&Ce(u.install)?(s.add(u),u.install(c,...d)):Ce(u)&&(s.add(u),u(c,...d))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,d){return d?(i.components[u]=d,c):i.components[u]},directive(u,d){return d?(i.directives[u]=d,c):i.directives[u]},mount(u,d,f){if(!l){const h=c._ceVNode||Me(o,r);return h.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),e(h,u,f),l=!0,c._container=u,u.__vue_app__=c,ls(h.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Mn(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,d){return i.provides[u]=d,c},runWithContext(u){const d=Qo;Qo=c;try{return u()}finally{Qo=d}}};return c}}let Qo=null;const n0=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${sn(t)}Modifiers`]||e[`${lo(t)}Modifiers`];function o0(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||Qe;let r=n;const i=t.startsWith("update:"),s=i&&n0(o,t.slice(7));s&&(s.trim&&(r=n.map(u=>at(u)?u.trim():u)),s.number&&(r=n.map(ns)));let a,l=o[a=As(t)]||o[a=As(sn(t))];!l&&i&&(l=o[a=As(lo(t))]),l&&Mn(l,e,6,r);const c=o[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,Mn(c,e,6,r)}}const r0=new WeakMap;function sf(e,t,n=!1){const o=n?r0:t.emitsCache,r=o.get(e);if(r!==void 0)return r;const i=e.emits;let s={},a=!1;if(!Ce(e)){const l=c=>{const u=sf(c,t,!0);u&&(a=!0,Ct(s,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!a?(Ze(e)&&o.set(e,null),null):(Se(i)?i.forEach(l=>s[l]=null):Ct(s,i),Ze(e)&&o.set(e,s),s)}function ss(e,t){return!e||!Xi(t)?!1:(t=t.slice(2).replace(/Once$/,""),ze(e,t[0].toLowerCase()+t.slice(1))||ze(e,lo(t))||ze(e,t))}function wc(e){const{type:t,vnode:n,proxy:o,withProxy:r,propsOptions:[i],slots:s,attrs:a,emit:l,render:c,renderCache:u,props:d,data:f,setupState:h,ctx:g,inheritAttrs:m}=e,w=Oi(e);let k,x;try{if(n.shapeFlag&4){const $=r||o,N=$;k=Cn(c.call(N,$,u,d,h,f,g)),x=a}else{const $=t;k=Cn($.length>1?$(d,{attrs:a,slots:s,emit:l}):$(d,null)),x=t.props?a:i0(a)}}catch($){Br.length=0,ei($,e,1),k=Me(Yn)}let L=k;if(x&&m!==!1){const $=Object.keys(x),{shapeFlag:N}=L;$.length&&N&7&&(i&&$.some(es)&&(x=s0(x,i)),L=er(L,x,!1,!0))}return n.dirs&&(L=er(L,null,!1,!0),L.dirs=L.dirs?L.dirs.concat(n.dirs):n.dirs),n.transition&&tl(L,n.transition),k=L,Oi(w),k}const i0=e=>{let t;for(const n in e)(n==="class"||n==="style"||Xi(n))&&((t||(t={}))[n]=e[n]);return t},s0=(e,t)=>{const n={};for(const o in e)(!es(o)||!(o.slice(9)in t))&&(n[o]=e[o]);return n};function a0(e,t,n){const{props:o,children:r,component:i}=e,{props:s,children:a,patchFlag:l}=t,c=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return o?Sc(o,s,c):!!s;if(l&8){const u=t.dynamicProps;for(let d=0;d<u.length;d++){const f=u[d];if(af(s,o,f)&&!ss(c,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:o===s?!1:o?s?Sc(o,s,c):!0:!!s;return!1}function Sc(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){const i=o[r];if(af(t,e,i)&&!ss(n,i))return!0}return!1}function af(e,t,n){const o=e[n],r=t[n];return n==="style"&&Ze(o)&&Ze(r)?!cr(o,r):o!==r}function l0({vnode:e,parent:t,suspense:n},o){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=o,e=r),r===e)(e=t.vnode).el=o,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=o)}const lf={},cf=()=>Object.create(lf),uf=e=>Object.getPrototypeOf(e)===lf;function c0(e,t,n,o=!1){const r={},i=cf();e.propsDefaults=Object.create(null),df(e,t,r,i);for(const s in e.propsOptions[0])s in r||(r[s]=void 0);n?e.props=o?r:bg(r):e.type.props?e.props=r:e.props=i,e.attrs=i}function u0(e,t,n,o){const{props:r,attrs:i,vnode:{patchFlag:s}}=e,a=Ue(r),[l]=e.propsOptions;let c=!1;if((o||s>0)&&!(s&16)){if(s&8){const u=e.vnode.dynamicProps;for(let d=0;d<u.length;d++){let f=u[d];if(ss(e.emitsOptions,f))continue;const h=t[f];if(l)if(ze(i,f))h!==i[f]&&(i[f]=h,c=!0);else{const g=sn(f);r[g]=$a(l,a,g,h,e,!1)}else h!==i[f]&&(i[f]=h,c=!0)}}}else{df(e,t,r,i)&&(c=!0);let u;for(const d in a)(!t||!ze(t,d)&&((u=lo(d))===d||!ze(t,u)))&&(l?n&&(n[d]!==void 0||n[u]!==void 0)&&(r[d]=$a(l,a,d,void 0,e,!0)):delete r[d]);if(i!==a)for(const d in i)(!t||!ze(t,d))&&(delete i[d],c=!0)}c&&jn(e.attrs,"set","")}function df(e,t,n,o){const[r,i]=e.propsOptions;let s=!1,a;if(t)for(let l in t){if(Mr(l))continue;const c=t[l];let u;r&&ze(r,u=sn(l))?!i||!i.includes(u)?n[u]=c:(a||(a={}))[u]=c:ss(e.emitsOptions,l)||(!(l in o)||c!==o[l])&&(o[l]=c,s=!0)}if(i){const l=Ue(n),c=a||Qe;for(let u=0;u<i.length;u++){const d=i[u];n[d]=$a(r,l,d,c[d],e,!ze(c,d))}}return s}function $a(e,t,n,o,r,i){const s=e[n];if(s!=null){const a=ze(s,"default");if(a&&o===void 0){const l=s.default;if(s.type!==Function&&!s.skipFactory&&Ce(l)){const{propsDefaults:c}=r;if(n in c)o=c[n];else{const u=ti(r);o=c[n]=l.call(null,t),u()}}else o=l;r.ce&&r.ce._setProp(n,o)}s[0]&&(i&&!a?o=!1:s[1]&&(o===""||o===lo(n))&&(o=!0))}return o}const d0=new WeakMap;function ff(e,t,n=!1){const o=n?d0:t.propsCache,r=o.get(e);if(r)return r;const i=e.props,s={},a=[];let l=!1;if(!Ce(e)){const u=d=>{l=!0;const[f,h]=ff(d,t,!0);Ct(s,f),h&&a.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!i&&!l)return Ze(e)&&o.set(e,Go),Go;if(Se(i))for(let u=0;u<i.length;u++){const d=sn(i[u]);kc(d)&&(s[d]=Qe)}else if(i)for(const u in i){const d=sn(u);if(kc(d)){const f=i[u],h=s[d]=Se(f)||Ce(f)?{type:f}:Ct({},f),g=h.type;let m=!1,w=!0;if(Se(g))for(let k=0;k<g.length;++k){const x=g[k],L=Ce(x)&&x.name;if(L==="Boolean"){m=!0;break}else L==="String"&&(w=!1)}else m=Ce(g)&&g.name==="Boolean";h[0]=m,h[1]=w,(m||ze(h,"default"))&&a.push(d)}}const c=[s,a];return Ze(e)&&o.set(e,c),c}function kc(e){return e[0]!=="$"&&!Mr(e)}const il=e=>e==="_"||e==="_ctx"||e==="$stable",sl=e=>Se(e)?e.map(Cn):[Cn(e)],f0=(e,t,n)=>{if(t._n)return t;const o=Jt((...r)=>sl(t(...r)),n);return o._c=!1,o},pf=(e,t,n)=>{const o=e._ctx;for(const r in e){if(il(r))continue;const i=e[r];if(Ce(i))t[r]=f0(r,i,o);else if(i!=null){const s=sl(i);t[r]=()=>s}}},hf=(e,t)=>{const n=sl(t);e.slots.default=()=>n},mf=(e,t,n)=>{for(const o in t)(n||!il(o))&&(e[o]=t[o])},p0=(e,t,n)=>{const o=e.slots=cf();if(e.vnode.shapeFlag&32){const r=t._;r?(mf(o,t,n),n&&_d(o,"_",r,!0)):pf(t,o)}else t&&hf(e,t)},h0=(e,t,n)=>{const{vnode:o,slots:r}=e;let i=!0,s=Qe;if(o.shapeFlag&32){const a=t._;a?n&&a===1?i=!1:mf(r,t,n):(i=!t.$stable,pf(t,r)),s=t}else t&&(hf(e,t),s={default:1});if(i)for(const a in r)!il(a)&&s[a]==null&&delete r[a]},Ht=v0;function m0(e){return g0(e)}function g0(e,t){const n=os();n.__VUE__=!0;const{insert:o,remove:r,patchProp:i,createElement:s,createText:a,createComment:l,setText:c,setElementText:u,parentNode:d,nextSibling:f,setScopeId:h=Tn,insertStaticContent:g}=e,m=(y,b,T,H=null,W=null,q=null,ie=void 0,ne=null,X=!!b.dynamicChildren)=>{if(y===b)return;y&&!kr(y,b)&&(H=Pt(y),Fe(y,W,q,!0),y=null),b.patchFlag===-2&&(X=!1,b.dynamicChildren=null);const{type:Y,ref:ge,shapeFlag:oe}=b;switch(Y){case as:w(y,b,T,H);break;case Yn:k(y,b,T,H);break;case Ds:y==null&&x(b,T,H,ie);break;case ue:F(y,b,T,H,W,q,ie,ne,X);break;default:oe&1?N(y,b,T,H,W,q,ie,ne,X):oe&6?E(y,b,T,H,W,q,ie,ne,X):(oe&64||oe&128)&&Y.process(y,b,T,H,W,q,ie,ne,X,wt)}ge!=null&&W?Nr(ge,y&&y.ref,q,b||y,!b):ge==null&&y&&y.ref!=null&&Nr(y.ref,null,q,y,!0)},w=(y,b,T,H)=>{if(y==null)o(b.el=a(b.children),T,H);else{const W=b.el=y.el;b.children!==y.children&&c(W,b.children)}},k=(y,b,T,H)=>{y==null?o(b.el=l(b.children||""),T,H):b.el=y.el},x=(y,b,T,H)=>{[y.el,y.anchor]=g(y.children,b,T,H,y.el,y.anchor)},L=({el:y,anchor:b},T,H)=>{let W;for(;y&&y!==b;)W=f(y),o(y,T,H),y=W;o(b,T,H)},$=({el:y,anchor:b})=>{let T;for(;y&&y!==b;)T=f(y),r(y),y=T;r(b)},N=(y,b,T,H,W,q,ie,ne,X)=>{if(b.type==="svg"?ie="svg":b.type==="math"&&(ie="mathml"),y==null)D(b,T,H,W,q,ie,ne,X);else{const Y=y.el&&y.el._isVueCE?y.el:null;try{Y&&Y._beginPatch(),S(y,b,W,q,ie,ne,X)}finally{Y&&Y._endPatch()}}},D=(y,b,T,H,W,q,ie,ne)=>{let X,Y;const{props:ge,shapeFlag:oe,transition:ce,dirs:ve}=y;if(X=y.el=s(y.type,q,ge&&ge.is,ge),oe&8?u(X,y.children):oe&16&&v(y.children,X,null,H,W,Ns(y,q),ie,ne),ve&&yo(y,null,H,"created"),_(X,y,y.scopeId,ie,H),ge){for(const Be in ge)Be!=="value"&&!Mr(Be)&&i(X,Be,null,ge[Be],q,H);"value"in ge&&i(X,"value",null,ge.value,q),(Y=ge.onVnodeBeforeMount)&&wn(Y,H,y)}ve&&yo(y,null,H,"beforeMount");const Ae=b0(W,ce);Ae&&ce.beforeEnter(X),o(X,b,T),((Y=ge&&ge.onVnodeMounted)||Ae||ve)&&Ht(()=>{try{Y&&wn(Y,H,y),Ae&&ce.enter(X),ve&&yo(y,null,H,"mounted")}finally{}},W)},_=(y,b,T,H,W)=>{if(T&&h(y,T),H)for(let q=0;q<H.length;q++)h(y,H[q]);if(W){let q=W.subTree;if(b===q||yf(q.type)&&(q.ssContent===b||q.ssFallback===b)){const ie=W.vnode;_(y,ie,ie.scopeId,ie.slotScopeIds,W.parent)}}},v=(y,b,T,H,W,q,ie,ne,X=0)=>{for(let Y=X;Y<y.length;Y++){const ge=y[Y]=ne?Bn(y[Y]):Cn(y[Y]);m(null,ge,b,T,H,W,q,ie,ne)}},S=(y,b,T,H,W,q,ie)=>{const ne=b.el=y.el;let{patchFlag:X,dynamicChildren:Y,dirs:ge}=b;X|=y.patchFlag&16;const oe=y.props||Qe,ce=b.props||Qe;let ve;if(T&&vo(T,!1),(ve=ce.onVnodeBeforeUpdate)&&wn(ve,T,b,y),ge&&yo(b,y,T,"beforeUpdate"),T&&vo(T,!0),(oe.innerHTML&&ce.innerHTML==null||oe.textContent&&ce.textContent==null)&&u(ne,""),Y?I(y.dynamicChildren,Y,ne,T,H,Ns(b,W),q):ie||z(y,b,ne,null,T,H,Ns(b,W),q,!1),X>0){if(X&16)C(ne,oe,ce,T,W);else if(X&2&&oe.class!==ce.class&&i(ne,"class",null,ce.class,W),X&4&&i(ne,"style",oe.style,ce.style,W),X&8){const Ae=b.dynamicProps;for(let Be=0;Be<Ae.length;Be++){const Ve=Ae[Be],rt=oe[Ve],ct=ce[Ve];(ct!==rt||Ve==="value")&&i(ne,Ve,rt,ct,W,T)}}X&1&&y.children!==b.children&&u(ne,b.children)}else!ie&&Y==null&&C(ne,oe,ce,T,W);((ve=ce.onVnodeUpdated)||ge)&&Ht(()=>{ve&&wn(ve,T,b,y),ge&&yo(b,y,T,"updated")},H)},I=(y,b,T,H,W,q,ie)=>{for(let ne=0;ne<b.length;ne++){const X=y[ne],Y=b[ne],ge=X.el&&(X.type===ue||!kr(X,Y)||X.shapeFlag&198)?d(X.el):T;m(X,Y,ge,null,H,W,q,ie,!0)}},C=(y,b,T,H,W)=>{if(b!==T){if(b!==Qe)for(const q in b)!Mr(q)&&!(q in T)&&i(y,q,b[q],null,W,H);for(const q in T){if(Mr(q))continue;const ie=T[q],ne=b[q];ie!==ne&&q!=="value"&&i(y,q,ne,ie,W,H)}"value"in T&&i(y,"value",b.value,T.value,W)}},F=(y,b,T,H,W,q,ie,ne,X)=>{const Y=b.el=y?y.el:a(""),ge=b.anchor=y?y.anchor:a("");let{patchFlag:oe,dynamicChildren:ce,slotScopeIds:ve}=b;ve&&(ne=ne?ne.concat(ve):ve),y==null?(o(Y,T,H),o(ge,T,H),v(b.children||[],T,ge,W,q,ie,ne,X)):oe>0&&oe&64&&ce&&y.dynamicChildren&&y.dynamicChildren.length===ce.length?(I(y.dynamicChildren,ce,T,W,q,ie,ne),(b.key!=null||W&&b===W.subTree)&&al(y,b,!0)):z(y,b,T,ge,W,q,ie,ne,X)},E=(y,b,T,H,W,q,ie,ne,X)=>{b.slotScopeIds=ne,y==null?b.shapeFlag&512?W.ctx.activate(b,T,H,ie,X):j(b,T,H,W,q,ie,X):R(y,b,X)},j=(y,b,T,H,W,q,ie)=>{const ne=y.component=$0(y,H,W);if(ol(y)&&(ne.ctx.renderer=wt),E0(ne,!1,ie),ne.asyncDep){if(W&&W.registerDep(ne,B,ie),!y.el){const X=ne.subTree=Me(Yn);k(null,X,b,T),y.placeholder=X.el}}else B(ne,y,b,T,W,q,ie)},R=(y,b,T)=>{const H=b.component=y.component;if(a0(y,b,T))if(H.asyncDep&&!H.asyncResolved){V(H,b,T);return}else H.next=b,H.update();else b.el=y.el,H.vnode=b},B=(y,b,T,H,W,q,ie)=>{const ne=()=>{if(y.isMounted){let{next:oe,bu:ce,u:ve,parent:Ae,vnode:Be}=y;{const Kt=gf(y);if(Kt){oe&&(oe.el=Be.el,V(y,oe,ie)),Kt.asyncDep.then(()=>{Ht(()=>{y.isUnmounted||Y()},W)});return}}let Ve=oe,rt;vo(y,!1),oe?(oe.el=Be.el,V(y,oe,ie)):oe=Be,ce&&Ei(ce),(rt=oe.props&&oe.props.onVnodeBeforeUpdate)&&wn(rt,Ae,oe,Be),vo(y,!0);const ct=wc(y),Wt=y.subTree;y.subTree=ct,m(Wt,ct,d(Wt.el),Pt(Wt),y,W,q),oe.el=ct.el,Ve===null&&l0(y,ct.el),ve&&Ht(ve,W),(rt=oe.props&&oe.props.onVnodeUpdated)&&Ht(()=>wn(rt,Ae,oe,Be),W)}else{let oe;const{el:ce,props:ve}=b,{bm:Ae,m:Be,parent:Ve,root:rt,type:ct}=y,Wt=Zo(b);vo(y,!1),Ae&&Ei(Ae),!Wt&&(oe=ve&&ve.onVnodeBeforeMount)&&wn(oe,Ve,b),vo(y,!0);{rt.ce&&rt.ce._hasShadowRoot()&&rt.ce._injectChildStyle(ct,y.parent?y.parent.type:void 0);const Kt=y.subTree=wc(y);m(null,Kt,T,H,y,W,q),b.el=Kt.el}if(Be&&Ht(Be,W),!Wt&&(oe=ve&&ve.onVnodeMounted)){const Kt=b;Ht(()=>wn(oe,Ve,Kt),W)}(b.shapeFlag&256||Ve&&Zo(Ve.vnode)&&Ve.vnode.shapeFlag&256)&&y.a&&Ht(y.a,W),y.isMounted=!0,b=T=H=null}};y.scope.on();const X=y.effect=new Td(ne);y.scope.off();const Y=y.update=X.run.bind(X),ge=y.job=X.runIfDirty.bind(X);ge.i=y,ge.id=y.uid,X.scheduler=()=>el(ge),vo(y,!0),Y()},V=(y,b,T)=>{b.component=y;const H=y.vnode.props;y.vnode=b,y.next=null,u0(y,b.props,H,T),h0(y,b.children,T),Kn(),uc(y),qn()},z=(y,b,T,H,W,q,ie,ne,X=!1)=>{const Y=y&&y.children,ge=y?y.shapeFlag:0,oe=b.children,{patchFlag:ce,shapeFlag:ve}=b;if(ce>0){if(ce&128){je(Y,oe,T,H,W,q,ie,ne,X);return}else if(ce&256){fe(Y,oe,T,H,W,q,ie,ne,X);return}}ve&8?(ge&16&&Je(Y,W,q),oe!==Y&&u(T,oe)):ge&16?ve&16?je(Y,oe,T,H,W,q,ie,ne,X):Je(Y,W,q,!0):(ge&8&&u(T,""),ve&16&&v(oe,T,H,W,q,ie,ne,X))},fe=(y,b,T,H,W,q,ie,ne,X)=>{y=y||Go,b=b||Go;const Y=y.length,ge=b.length,oe=Math.min(Y,ge);let ce;for(ce=0;ce<oe;ce++){const ve=b[ce]=X?Bn(b[ce]):Cn(b[ce]);m(y[ce],ve,T,null,W,q,ie,ne,X)}Y>ge?Je(y,W,q,!0,!1,oe):v(b,T,H,W,q,ie,ne,X,oe)},je=(y,b,T,H,W,q,ie,ne,X)=>{let Y=0;const ge=b.length;let oe=y.length-1,ce=ge-1;for(;Y<=oe&&Y<=ce;){const ve=y[Y],Ae=b[Y]=X?Bn(b[Y]):Cn(b[Y]);if(kr(ve,Ae))m(ve,Ae,T,null,W,q,ie,ne,X);else break;Y++}for(;Y<=oe&&Y<=ce;){const ve=y[oe],Ae=b[ce]=X?Bn(b[ce]):Cn(b[ce]);if(kr(ve,Ae))m(ve,Ae,T,null,W,q,ie,ne,X);else break;oe--,ce--}if(Y>oe){if(Y<=ce){const ve=ce+1,Ae=ve<ge?b[ve].el:H;for(;Y<=ce;)m(null,b[Y]=X?Bn(b[Y]):Cn(b[Y]),T,Ae,W,q,ie,ne,X),Y++}}else if(Y>ce)for(;Y<=oe;)Fe(y[Y],W,q,!0),Y++;else{const ve=Y,Ae=Y,Be=new Map;for(Y=Ae;Y<=ce;Y++){const St=b[Y]=X?Bn(b[Y]):Cn(b[Y]);St.key!=null&&Be.set(St.key,Y)}let Ve,rt=0;const ct=ce-Ae+1;let Wt=!1,Kt=0;const $t=new Array(ct);for(Y=0;Y<ct;Y++)$t[Y]=0;for(Y=ve;Y<=oe;Y++){const St=y[Y];if(rt>=ct){Fe(St,W,q,!0);continue}let Et;if(St.key!=null)Et=Be.get(St.key);else for(Ve=Ae;Ve<=ce;Ve++)if($t[Ve-Ae]===0&&kr(St,b[Ve])){Et=Ve;break}Et===void 0?Fe(St,W,q,!0):($t[Et-Ae]=Y+1,Et>=Kt?Kt=Et:Wt=!0,m(St,b[Et],T,null,W,q,ie,ne,X),rt++)}const On=Wt?y0($t):Go;for(Ve=On.length-1,Y=ct-1;Y>=0;Y--){const St=Ae+Y,Et=b[St],ho=b[St+1],bn=St+1<ge?ho.el||bf(ho):H;$t[Y]===0?m(null,Et,T,bn,W,q,ie,ne,X):Wt&&(Ve<0||Y!==On[Ve]?Ne(Et,T,bn,2):Ve--)}}},Ne=(y,b,T,H,W=null)=>{const{el:q,type:ie,transition:ne,children:X,shapeFlag:Y}=y;if(Y&6){Ne(y.component.subTree,b,T,H);return}if(Y&128){y.suspense.move(b,T,H);return}if(Y&64){ie.move(y,b,T,wt);return}if(ie===ue){o(q,b,T);for(let oe=0;oe<X.length;oe++)Ne(X[oe],b,T,H);o(y.anchor,b,T);return}if(ie===Ds){L(y,b,T);return}if(H!==2&&Y&1&&ne)if(H===0)ne.beforeEnter(q),o(q,b,T),Ht(()=>ne.enter(q),W);else{const{leave:oe,delayLeave:ce,afterLeave:ve}=ne,Ae=()=>{y.ctx.isUnmounted?r(q):o(q,b,T)},Be=()=>{q._isLeaving&&q[Dg](!0),oe(q,()=>{Ae(),ve&&ve()})};ce?ce(q,Ae,Be):Be()}else o(q,b,T)},Fe=(y,b,T,H=!1,W=!1)=>{const{type:q,props:ie,ref:ne,children:X,dynamicChildren:Y,shapeFlag:ge,patchFlag:oe,dirs:ce,cacheIndex:ve,memo:Ae}=y;if(oe===-2&&(W=!1),ne!=null&&(Kn(),Nr(ne,null,T,y,!0),qn()),ve!=null&&(b.renderCache[ve]=void 0),ge&256){b.ctx.deactivate(y);return}const Be=ge&1&&ce,Ve=!Zo(y);let rt;if(Ve&&(rt=ie&&ie.onVnodeBeforeUnmount)&&wn(rt,b,y),ge&6)Ye(y.component,T,H);else{if(ge&128){y.suspense.unmount(T,H);return}Be&&yo(y,null,b,"beforeUnmount"),ge&64?y.type.remove(y,b,T,wt,H):Y&&!Y.hasOnce&&(q!==ue||oe>0&&oe&64)?Je(Y,b,T,!1,!0):(q===ue&&oe&384||!W&&ge&16)&&Je(X,b,T),H&&He(y)}const ct=Ae!=null&&ve==null;(Ve&&(rt=ie&&ie.onVnodeUnmounted)||Be||ct)&&Ht(()=>{rt&&wn(rt,b,y),Be&&yo(y,null,b,"unmounted"),ct&&(y.el=null)},T)},He=y=>{const{type:b,el:T,anchor:H,transition:W}=y;if(b===ue){Te(T,H);return}if(b===Ds){$(y);return}const q=()=>{r(T),W&&!W.persisted&&W.afterLeave&&W.afterLeave()};if(y.shapeFlag&1&&W&&!W.persisted){const{leave:ie,delayLeave:ne}=W,X=()=>ie(T,q);ne?ne(y.el,q,X):X()}else q()},Te=(y,b)=>{let T;for(;y!==b;)T=f(y),r(y),y=T;r(b)},Ye=(y,b,T)=>{const{bum:H,scope:W,job:q,subTree:ie,um:ne,m:X,a:Y}=y;xc(X),xc(Y),H&&Ei(H),W.stop(),q&&(q.flags|=8,Fe(ie,y,b,T)),ne&&Ht(ne,b),Ht(()=>{y.isUnmounted=!0},b)},Je=(y,b,T,H=!1,W=!1,q=0)=>{for(let ie=q;ie<y.length;ie++)Fe(y[ie],b,T,H,W)},Pt=y=>{if(y.shapeFlag&6)return Pt(y.component.subTree);if(y.shapeFlag&128)return y.suspense.next();const b=f(y.anchor||y.el),T=b&&b[Zd];return T?f(T):b};let pt=!1;const mn=(y,b,T)=>{let H;y==null?b._vnode&&(Fe(b._vnode,null,null,!0),H=b._vnode.component):m(b._vnode||null,y,b,null,null,null,T),b._vnode=y,pt||(pt=!0,uc(H),Kd(),pt=!1)},wt={p:m,um:Fe,m:Ne,r:He,mt:j,mc:v,pc:z,pbc:I,n:Pt,o:e};return{render:mn,hydrate:void 0,createApp:t0(mn)}}function Ns({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function vo({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function b0(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function al(e,t,n=!1){const o=e.children,r=t.children;if(Se(o)&&Se(r))for(let i=0;i<o.length;i++){const s=o[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=Bn(r[i]),a.el=s.el),!n&&a.patchFlag!==-2&&al(s,a)),a.type===as&&(a.patchFlag===-1&&(a=r[i]=Bn(a)),a.el=s.el),a.type===Yn&&!a.el&&(a.el=s.el)}}function y0(e){const t=e.slice(),n=[0];let o,r,i,s,a;const l=e.length;for(o=0;o<l;o++){const c=e[o];if(c!==0){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(i=0,s=n.length-1;i<s;)a=i+s>>1,e[n[a]]<c?i=a+1:s=a;c<e[n[i]]&&(i>0&&(t[o]=n[i-1]),n[i]=o)}}for(i=n.length,s=n[i-1];i-- >0;)n[i]=s,s=t[s];return n}function gf(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:gf(t)}function xc(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function bf(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?bf(t.subTree):null}const yf=e=>e.__isSuspense;function v0(e,t){t&&t.pendingBranch?Se(e)?t.effects.push(...e):t.effects.push(e):Eg(e)}const ue=Symbol.for("v-fgt"),as=Symbol.for("v-txt"),Yn=Symbol.for("v-cmt"),Ds=Symbol.for("v-stc"),Br=[];let Gt=null;function O(e=!1){Br.push(Gt=e?null:[])}function w0(){Br.pop(),Gt=Br[Br.length-1]||null}let zr=1;function _c(e,t=!1){zr+=e,e<0&&Gt&&t&&(Gt.hasOnce=!0)}function vf(e){return e.dynamicChildren=zr>0?Gt||Go:null,w0(),zr>0&&Gt&&Gt.push(e),e}function P(e,t,n,o,r,i){return vf(p(e,t,n,o,r,i,!0))}function nt(e,t,n,o,r){return vf(Me(e,t,n,o,r,!0))}function ll(e){return e?e.__v_isVNode===!0:!1}function kr(e,t){return e.type===t.type&&e.key===t.key}const wf=({key:e})=>e??null,Ai=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?at(e)||bt(e)||Ce(e)?{i:Lt,r:e,k:t,f:!!n}:e:null);function p(e,t=null,n=null,o=0,r=null,i=e===ue?0:1,s=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&wf(t),ref:t&&Ai(t),scopeId:Gd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Lt};return a?(cl(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=at(n)?8:16),zr>0&&!s&&Gt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Gt.push(l),l}const Me=S0;function S0(e,t=null,n=null,o=0,r=null,i=!1){if((!e||e===qg)&&(e=Yn),ll(e)){const a=er(e,t,!0);return n&&cl(a,n),zr>0&&!i&&Gt&&(a.shapeFlag&6?Gt[Gt.indexOf(e)]=a:Gt.push(a)),a.patchFlag=-2,a}if(R0(e)&&(e=e.__vccOpts),t){t=k0(t);let{class:a,style:l}=t;a&&!at(a)&&(t.class=$e(a)),Ze(l)&&(Xa(l)&&!Se(l)&&(l=Ct({},l)),t.style=Qt(l))}const s=at(e)?1:yf(e)?128:Mg(e)?64:Ze(e)?4:Ce(e)?2:0;return p(e,t,n,o,r,s,i,!0)}function k0(e){return e?Xa(e)||uf(e)?Ct({},e):e:null}function er(e,t,n=!1,o=!1){const{props:r,ref:i,patchFlag:s,children:a,transition:l}=e,c=t?x0(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&wf(c),ref:t&&t.ref?n&&i?Se(i)?i.concat(Ai(t)):[i,Ai(t)]:Ai(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ue?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&er(e.ssContent),ssFallback:e.ssFallback&&er(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&o&&tl(u,l.clone(u)),u}function We(e=" ",t=0){return Me(as,null,e,t)}function ae(e="",t=!1){return t?(O(),nt(Yn,null,e)):Me(Yn,null,e)}function Cn(e){return e==null||typeof e=="boolean"?Me(Yn):Se(e)?Me(ue,null,e.slice()):ll(e)?Bn(e):Me(as,null,String(e))}function Bn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:er(e)}function cl(e,t){let n=0;const{shapeFlag:o}=e;if(t==null)t=null;else if(Se(t))n=16;else if(typeof t=="object")if(o&65){const r=t.default;r&&(r._c&&(r._d=!1),cl(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!uf(t)?t._ctx=Lt:r===3&&Lt&&(Lt.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Ce(t)?(t={default:t,_ctx:Lt},n=32):(t=String(t),o&64?(n=16,t=[We(t)]):n=8);e.children=t,e.shapeFlag|=n}function x0(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const r in o)if(r==="class")t.class!==o.class&&(t.class=$e([t.class,o.class]));else if(r==="style")t.style=Qt([t.style,o.style]);else if(Xi(r)){const i=t[r],s=o[r];s&&i!==s&&!(Se(i)&&i.includes(s))?t[r]=i?[].concat(i,s):s:s==null&&i==null&&!es(r)&&(t[r]=s)}else r!==""&&(t[r]=o[r])}return t}function wn(e,t,n,o=null){Mn(e,t,7,[n,o])}const _0=rf();let C0=0;function $0(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||_0,i={uid:C0++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Zm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ff(o,r),emitsOptions:sf(o,r),emit:null,emitted:null,propsDefaults:Qe,inheritAttrs:o.inheritAttrs,ctx:Qe,data:Qe,props:Qe,attrs:Qe,slots:Qe,refs:Qe,setupState:Qe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=o0.bind(null,i),e.ce&&e.ce(i),i}let Ot=null;const Sf=()=>Ot||Lt;let Di,Ea;{const e=os(),t=(n,o)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(o),i=>{r.length>1?r.forEach(s=>s(i)):r[0](i)}};Di=t("__VUE_INSTANCE_SETTERS__",n=>Ot=n),Ea=t("__VUE_SSR_SETTERS__",n=>tr=n)}const ti=e=>{const t=Ot;return Di(e),e.scope.on(),()=>{e.scope.off(),Di(t)}},Cc=()=>{Ot&&Ot.scope.off(),Di(null)};function kf(e){return e.vnode.shapeFlag&4}let tr=!1;function E0(e,t=!1,n=!1){t&&Ea(t);const{props:o,children:r}=e.vnode,i=kf(e);c0(e,o,i,t),p0(e,r,n||t);const s=i?T0(e,t):void 0;return t&&Ea(!1),s}function T0(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Gg);const{setup:o}=n;if(o){Kn();const r=e.setupContext=o.length>1?I0(e):null,i=ti(e),s=Xr(o,e,0,[e.props,r]),a=wd(s);if(qn(),i(),(a||e.sp)&&!Zo(e)&&nl(e),a){if(s.then(Cc,Cc),t)return s.then(l=>{$c(e,l)}).catch(l=>{ei(l,e,0)});e.asyncDep=s}else $c(e,s)}else xf(e)}function $c(e,t,n){Ce(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ze(t)&&(e.setupState=Ud(t)),xf(e)}function xf(e,t,n){const o=e.type;e.render||(e.render=o.render||Tn);{const r=ti(e);Kn();try{Yg(e)}finally{qn(),r()}}}const A0={get(e,t){return Mt(e,"get",""),e[t]}};function I0(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,A0),slots:e.slots,emit:e.emit,expose:t}}function ls(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Ud(yg(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Pr)return Pr[n](e)},has(t,n){return n in t||n in Pr}})):e.proxy}function R0(e){return Ce(e)&&"__vccOpts"in e}const te=(e,t)=>kg(e,t,tr),M0="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ta;const Ec=typeof window<"u"&&window.trustedTypes;if(Ec)try{Ta=Ec.createPolicy("vue",{createHTML:e=>e})}catch{}const _f=Ta?e=>Ta.createHTML(e):e=>e,O0="http://www.w3.org/2000/svg",L0="http://www.w3.org/1998/Math/MathML",Pn=typeof document<"u"?document:null,Tc=Pn&&Pn.createElement("template"),N0={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const r=t==="svg"?Pn.createElementNS(O0,e):t==="mathml"?Pn.createElementNS(L0,e):n?Pn.createElement(e,{is:n}):Pn.createElement(e);return e==="select"&&o&&o.multiple!=null&&r.setAttribute("multiple",o.multiple),r},createText:e=>Pn.createTextNode(e),createComment:e=>Pn.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Pn.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,i){const s=n?n.previousSibling:t.lastChild;if(r&&(r===i||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{Tc.innerHTML=_f(o==="svg"?`<svg>${e}</svg>`:o==="mathml"?`<math>${e}</math>`:e);const a=Tc.content;if(o==="svg"||o==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},D0=Symbol("_vtc");function P0(e,t,n){const o=e[D0];o&&(t=(t?[t,...o]:[...o]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Pi=Symbol("_vod"),Cf=Symbol("_vsh"),_o={name:"show",beforeMount(e,{value:t},{transition:n}){e[Pi]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):xr(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),xr(e,!0),o.enter(e)):o.leave(e,()=>{xr(e,!1)}):xr(e,t))},beforeUnmount(e,{value:t}){xr(e,t)}};function xr(e,t){e.style.display=t?e[Pi]:"none",e[Cf]=!t}const B0=Symbol(""),F0=/(?:^|;)\s*display\s*:/;function j0(e,t,n){const o=e.style,r=at(n);let i=!1;if(n&&!r){if(t)if(at(t))for(const s of t.split(";")){const a=s.slice(0,s.indexOf(":")).trim();n[a]==null&&Ar(o,a,"")}else for(const s in t)n[s]==null&&Ar(o,s,"");for(const s in n){s==="display"&&(i=!0);const a=n[s];a!=null?V0(e,s,!at(t)&&t?t[s]:void 0,a)||Ar(o,s,a):Ar(o,s,"")}}else if(r){if(t!==n){const s=o[B0];s&&(n+=";"+s),o.cssText=n,i=F0.test(n)}}else t&&e.removeAttribute("style");Pi in e&&(e[Pi]=i?o.display:"",e[Cf]&&(o.display="none"))}const Ac=/\s*!important$/;function Ar(e,t,n){if(Se(n))n.forEach(o=>Ar(e,t,o));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=H0(e,t);Ac.test(n)?e.setProperty(lo(o),n.replace(Ac,""),"important"):e[o]=n}}const Ic=["Webkit","Moz","ms"],Ps={};function H0(e,t){const n=Ps[t];if(n)return n;let o=sn(t);if(o!=="filter"&&o in e)return Ps[t]=o;o=xd(o);for(let r=0;r<Ic.length;r++){const i=Ic[r]+o;if(i in e)return Ps[t]=i}return t}function V0(e,t,n,o){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&at(o)&&n===o}const Rc="http://www.w3.org/1999/xlink";function Mc(e,t,n,o,r,i=Ym(t)){o&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Rc,t.slice(6,t.length)):e.setAttributeNS(Rc,t,n):n==null||i&&!Cd(n)?e.removeAttribute(t):e.setAttribute(t,i?"":cn(n)?String(n):n)}function Oc(e,t,n,o,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?_f(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let s=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Cd(n):n==null&&a==="string"?(n="",s=!0):a==="number"&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(r||t)}function ao(e,t,n,o){e.addEventListener(t,n,o)}function U0(e,t,n,o){e.removeEventListener(t,n,o)}const Lc=Symbol("_vei");function z0(e,t,n,o,r=null){const i=e[Lc]||(e[Lc]={}),s=i[t];if(o&&s)s.value=o;else{const[a,l]=W0(t);if(o){const c=i[t]=G0(o,r);ao(e,a,c,l)}else s&&(U0(e,a,s,l),i[t]=void 0)}}const Nc=/(?:Once|Passive|Capture)$/;function W0(e){let t;if(Nc.test(e)){t={};let o;for(;o=e.match(Nc);)e=e.slice(0,e.length-o[0].length),t[o[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):lo(e.slice(2)),t]}let Bs=0;const K0=Promise.resolve(),q0=()=>Bs||(K0.then(()=>Bs=0),Bs=Date.now());function G0(e,t){const n=o=>{if(!o._vts)o._vts=Date.now();else if(o._vts<=n.attached)return;Mn(Y0(o,n.value),t,5,[o])};return n.value=e,n.attached=q0(),n}function Y0(e,t){if(Se(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(o=>r=>!r._stopped&&o&&o(r))}else return t}const Dc=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,J0=(e,t,n,o,r,i)=>{const s=r==="svg";t==="class"?P0(e,o,s):t==="style"?j0(e,n,o):Xi(t)?es(t)||z0(e,t,n,o,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Z0(e,t,o,s))?(Oc(e,t,o),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Mc(e,t,o,s,i,t!=="value")):e._isVueCE&&(Q0(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!at(o)))?Oc(e,sn(t),o,i,t):(t==="true-value"?e._trueValue=o:t==="false-value"&&(e._falseValue=o),Mc(e,t,o,s))};function Z0(e,t,n,o){if(o)return!!(t==="innerHTML"||t==="textContent"||t in e&&Dc(t)&&Ce(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Dc(t)&&at(n)?!1:t in e}function Q0(e,t){const n=e._def.props;if(!n)return!1;const o=sn(t);return Array.isArray(n)?n.some(r=>sn(r)===o):Object.keys(n).some(r=>sn(r)===o)}const nr=e=>{const t=e.props["onUpdate:modelValue"]||!1;return Se(t)?n=>Ei(t,n):t};function X0(e){e.target.composing=!0}function Pc(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Un=Symbol("_assign");function Bc(e,t,n){return t&&(e=e.trim()),n&&(e=ns(e)),e}const Ut={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e[Un]=nr(r);const i=o||r.props&&r.props.type==="number";ao(e,t?"change":"input",s=>{s.target.composing||e[Un](Bc(e.value,n,i))}),(n||i)&&ao(e,"change",()=>{e.value=Bc(e.value,n,i)}),t||(ao(e,"compositionstart",X0),ao(e,"compositionend",Pc),ao(e,"change",Pc))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:o,trim:r,number:i}},s){if(e[Un]=nr(s),e.composing)return;const a=(i||e.type==="number")&&!/^0\d/.test(e.value)?ns(e.value):e.value,l=t??"";if(a===l)return;const c=e.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===e&&e.type!=="range"&&(o&&t===n||r&&e.value.trim()===l)||(e.value=l)}},e1={deep:!0,created(e,t,n){e[Un]=nr(n),ao(e,"change",()=>{const o=e._modelValue,r=Wr(e),i=e.checked,s=e[Un];if(Se(o)){const a=Ka(o,r),l=a!==-1;if(i&&!l)s(o.concat(r));else if(!i&&l){const c=[...o];c.splice(a,1),s(c)}}else if(lr(o)){const a=new Set(o);i?a.add(r):a.delete(r),s(a)}else s($f(e,i))})},mounted:Fc,beforeUpdate(e,t,n){e[Un]=nr(n),Fc(e,t,n)}};function Fc(e,{value:t,oldValue:n},o){e._modelValue=t;let r;if(Se(t))r=Ka(t,o.props.value)>-1;else if(lr(t))r=t.has(o.props.value);else{if(t===n)return;r=cr(t,$f(e,!0))}e.checked!==r&&(e.checked=r)}const jc={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=lr(t);ao(e,"change",()=>{const i=Array.prototype.filter.call(e.options,s=>s.selected).map(s=>n?ns(Wr(s)):Wr(s));e[Un](e.multiple?r?new Set(i):i:i[0]),e._assigning=!0,en(()=>{e._assigning=!1})}),e[Un]=nr(o)},mounted(e,{value:t}){Hc(e,t)},beforeUpdate(e,t,n){e[Un]=nr(n)},updated(e,{value:t}){e._assigning||Hc(e,t)}};function Hc(e,t){const n=e.multiple,o=Se(t);if(!(n&&!o&&!lr(t))){for(let r=0,i=e.options.length;r<i;r++){const s=e.options[r],a=Wr(s);if(n)if(o){const l=typeof a;l==="string"||l==="number"?s.selected=t.some(c=>String(c)===String(a)):s.selected=Ka(t,a)>-1}else s.selected=t.has(a);else if(cr(Wr(s),t)){e.selectedIndex!==r&&(e.selectedIndex=r);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Wr(e){return"_value"in e?e._value:e.value}function $f(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const t1=["ctrl","shift","alt","meta"],n1={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>t1.some(n=>e[`${n}Key`]&&!t.includes(n))},It=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),o=t.join(".");return n[o]||(n[o]=((r,...i)=>{for(let s=0;s<t.length;s++){const a=n1[t[s]];if(a&&a(r,t))return}return e(r,...i)}))},o1={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},xn=(e,t)=>{const n=e._withKeys||(e._withKeys={}),o=t.join(".");return n[o]||(n[o]=(r=>{if(!("key"in r))return;const i=lo(r.key);if(t.some(s=>s===i||o1[s]===i))return e(r)}))},r1=Ct({patchProp:J0},N0);let Vc;function i1(){return Vc||(Vc=m0(r1))}const s1=((...e)=>{const t=i1().createApp(...e),{mount:n}=t;return t.mount=o=>{const r=l1(o);if(!r)return;const i=t._component;!Ce(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const s=n(r,!1,a1(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),s},t});function a1(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function l1(e){return at(e)?document.querySelector(e):e}const c1="modulepreload",u1=function(e){return"https://cdn.jsdelivr.net/gh/lync-cyber/wechat-typeset@jsdelivr-cdn/"+e},Uc={},An=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");r=s(n.map(c=>{if(c=u1(c),c in Uc)return;Uc[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":c1,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,g)=>{f.addEventListener("load",h),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function i(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return r.then(s=>{for(const a of s||[])a.status==="rejected"&&i(a.reason);return t().catch(i)})},Bi=["title","digest","author","cover","source","date","writingStyle"];function Ef(e){const t=/^\uFEFF?---[ \t]*\r?\n/.exec(e)?.[0];if(!t)return null;const n=e.slice(t.length),o=/^---[ \t]*(?:\r?\n|$)/m.exec(n);return o?{opening:t,yaml:n.slice(0,o.index),closing:o[0],body:n.slice(o.index+o[0].length)}:null}function Oo(e){const t=Ef(e);if(!t)return{config:{},publication:{},body:e,issues:[]};const{body:n}=t,{tree:o,issues:r}=f1(t.yaml),i={},s={},a=o.variants;if(a!==void 0)if(typeof a=="string")r.push({path:"variants",message:"variants 应为对象（嵌套 key: id 形式），不是标量值",severity:"error"});else{const c={};for(const[u,d]of Object.entries(a)){if(typeof d!="string"){r.push({path:`variants.${u}`,message:"值应为 variant id 字符串",severity:"error"});continue}if(!(u in En)){r.push({path:`variants.${u}`,message:`未知 variant slot "${u}"——合法值：${Object.keys(En).join(" / ")}`,severity:"warning"});continue}const f=En[u];if(!f.includes(d)){r.push({path:`variants.${u}`,message:`非法 variant id "${d}"——${u} 合法值：${f.join(" / ")}`,severity:"warning"});continue}c[u]=d}Object.keys(c).length>0&&(i.variants=c)}const l=o.theme;l!==void 0&&(typeof l!="string"?r.push({path:"theme",message:"theme 应为字符串（主题 id）",severity:"error"}):i.theme=l);for(const c of Bi){const u=o[c];typeof u=="string"?s[c]=u:u!==void 0&&r.push({path:c,message:`${c} 应为字符串（发布信息）`,severity:"error"})}for(const c of Object.keys(o))c!=="variants"&&c!=="theme"&&!Bi.includes(c)&&r.push({path:c,message:`未识别 frontmatter 字段 "${c}"——支持 variants / theme 及发布信息`,severity:"warning"});return{config:i,publication:s,body:n,issues:r}}function Tf(e,t){const n={};for(const o of Bi)typeof t[o]=="string"&&(n[o]=t[o]);return Af(e,n)}function d1(e,t){return Af(e,{theme:t})}function Af(e,t){const n=Object.keys(t);if(n.length===0)return e;const o=e.includes(`\r
`)?`\r
`:`
`,r=Ef(e),i=u=>`${u}: ${JSON.stringify(t[u])}${o}`;if(!r){const u=e.startsWith("\uFEFF")?"\uFEFF":"";return`${u}---${o}${n.map(i).join("")}---${o}${e.slice(u.length)}`}const s=new Set(n),a=r.yaml.match(/[^\r\n]*(?:\r?\n|$)/g)?.filter(Boolean)??[],l=[];let c=!1;for(const u of a){const d=Aa.exec(u.replace(/\r?\n$/,""))?.[1];if(d&&n.includes(d))s.delete(d)&&l.push(i(d)),c=!0;else{if(c&&/^[ \t]+\S/.test(u)&&!u.trimStart().startsWith("#"))continue;/^\S/.test(u)&&(c=!1),l.push(u)}}for(const u of s)l.push(i(u));return r.opening+l.join("")+r.closing+r.body}const Aa=/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/;function zc(e){const t=e.trim();if(t.length>=2){if(t.startsWith('"')&&t.endsWith('"'))try{return JSON.parse(t)}catch{return t.slice(1,-1)}if(t.startsWith("'")&&t.endsWith("'"))return t.slice(1,-1).replace(/''/g,"'")}return t}function f1(e){const t={},n=[],o=e.split(/\r?\n/);let r=0;for(;r<o.length;){const i=o[r];if(!i.trim()||i.trim().startsWith("#")){r++;continue}if((i.match(/^(\s*)/)?.[1].length??0)>0){n.push({path:`line:${r+1}`,message:"frontmatter 顶层不应缩进；嵌套对象用 `key:` 头 + 下一行缩进 2 空格",severity:"warning"}),r++;continue}const a=Aa.exec(i);if(!a){n.push({path:`line:${r+1}`,message:`无法解析（期望 \`key: value\` 形式）：${i}`,severity:"warning"}),r++;continue}const l=a[1],c=a[2];if(c.trim()===""){const u={};for(r++;r<o.length;){const d=o[r];if(!d.trim()){r++;continue}if((d.match(/^(\s*)/)?.[1].length??0)===0)break;const h=Aa.exec(d.trim());if(!h){n.push({path:`${l}.line:${r+1}`,message:`无法解析嵌套行：${d}`,severity:"warning"}),r++;continue}u[h[1]]=zc(h[2]),r++}t[l]=Object.keys(u).length===0&&Bi.includes(l)?"":u}else t[l]=zc(c),r++}return{tree:t,issues:n}}const p1=/([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g;function or(e){const t={};let n=e;return n=n.replace(p1,(r,i,s,a,l,c)=>(t[i]=a??l??c??"","")),{title:n.replace(/\s+/g," ").trim(),attrs:t}}const h1=2e5,m1=4e6,g1={name:"base64",async upload(e,t={}){const n=t.compressThreshold??32768;if(e.size<=n)return Wc(e);try{const o=await If(e,t);if(o.length<e.size*1.5)return o}catch{}return Wc(e)}};function If(e,t={}){return b1(e,t.quality??.85,t.targetBytes??h1)}async function b1(e,t,n){const o=await Kc(e,t);if(n<=0||o.length<=n)return o;const r=[t-.15,t-.3,t-.45].map(s=>Math.max(.2,Math.min(.95,s))).filter((s,a,l)=>l.indexOf(s)===a);let i=o;for(const s of r){const a=await Kc(e,s);if(a.length<=n)return a;a.length<i.length&&(i=a)}return i}function Wc(e){return new Promise((t,n)=>{const o=new FileReader;o.onload=()=>t(String(o.result)),o.onerror=()=>n(o.error??new Error("FileReader failed")),o.readAsDataURL(e)})}async function Kc(e,t){const n=URL.createObjectURL(e);try{const o=await y1(n),r=document.createElement("canvas");r.width=o.naturalWidth,r.height=o.naturalHeight;const i=r.getContext("2d");if(!i)throw new Error("canvas 2d context unavailable");i.drawImage(o,0,0);const s=r.toDataURL("image/webp",t);if(!s.startsWith("data:image/webp"))throw new Error("webp encoding unsupported");return s}finally{URL.revokeObjectURL(n)}}function y1(e){return new Promise((t,n)=>{const o=new Image;o.onload=()=>t(o),o.onerror=()=>n(new Error("image decode failed")),o.src=e})}function Fr(e){return/^image\//i.test(e.type)}let v1=g1;async function w1(e,t=v1,n){const o=m1,r=[];let i=0,s=null;for(let a=0;a<e.length;a++){const l=e[a];if(!Fr(l))continue;const c=S1(l.name)??"image";try{const u=await t.upload(l,n);if(i+=u.length,r.push(`![${c}](${u})`),o>0&&i>o&&a<e.length-1){s=a+1;break}}catch(u){r.push(`<!-- image upload failed: ${l.name} (${String(u)}) -->`)}}if(s!==null){const a=e.length-s;r.push(`<!-- image budget exceeded: 累计 ${i} B 超过 ${o} B；剩余 ${a} 张未上传，请减图或切换 OSS provider -->`)}return r.join(`

`)}function S1(e){if(!e)return null;const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}const k1="wechat-typeset:library",$o="handles";function x1(){return typeof window<"u"&&typeof window.showDirectoryPicker=="function"&&typeof indexedDB<"u"}function Rf(){return new Promise((e,t)=>{const n=indexedDB.open(k1,1);n.onupgradeneeded=()=>{n.result.createObjectStore($o,{keyPath:"id"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error??new Error("无法打开文章库记录"))})}function Mf(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>n(e.error??new Error("无法读取文章库记录"))})}async function qc(){const e=window.showDirectoryPicker;if(!e)throw new Error("当前浏览器不支持文件夹文章库，请使用 Chrome 或 Edge");const t=await e.call(window,{mode:"readwrite"}),n=await Rf();try{const o=await Mf(n.transaction($o,"readonly").objectStore($o).getAll());let r="";for(const s of o)if("dir"in s)try{if(await t.isSameEntry(s.dir)){r=s.id;break}}catch{}const i={id:r||crypto.randomUUID(),dir:t};return await new Promise((s,a)=>{const l=n.transaction($o,"readwrite"),c=l.objectStore($o);l.oncomplete=()=>s(),l.onabort=()=>a(l.error??new Error("文章库记录未保存")),l.onerror=()=>a(l.error??new Error("文章库记录未保存")),c.put(i),c.put({id:"active",libraryId:i.id})}),i}finally{n.close()}}async function _1(){if(typeof indexedDB>"u")return null;const e=await Rf();try{const t=await Mf(e.transaction($o,"readonly").objectStore($o).getAll()),n=t.find(r=>r.id==="active");return!n||!("libraryId"in n)?null:t.find(r=>"dir"in r&&r.id===n.libraryId)??null}finally{e.close()}}function C1(e){const t=Array.from(e.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}\p{M}]+/gu,"-").replace(/^-+|-+$/g,"")).slice(0,80).join("").replace(/-+$/g,"")||"untitled";return/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(t)?`article-${t}`:t}function Of(e,t){const n=new Set(Array.from(t,r=>r.toLowerCase()));let o=e;for(let r=2;n.has(o.toLowerCase());r++)o=`${e}-${r}`;return o}function $1(e){return e instanceof DOMException&&(e.name==="NotFoundError"||e.name==="TypeMismatchError")}async function E1(e){const t=[];for await(const n of e.values()){if(n.kind!=="directory"||n.name==="_archive"||n.name.startsWith("."))continue;const o=n;try{const r=await o.getFileHandle("article.md"),{text:i,lastModified:s}=await Wo(r),{publication:a}=Oo(i);t.push({name:o.name,title:a.title?.trim()||o.name,date:a.date??"",lastModified:s,dir:o,file:r})}catch(r){if(!$1(r))throw r}}return t.sort((n,o)=>o.lastModified-n.lastModified||n.name.localeCompare(o.name))}async function Wo(e){const t=await e.getFile();return{text:await t.text(),lastModified:t.lastModified}}async function ul(e,t){const n=await e.createWritable();try{await n.write(t),await n.close()}catch(o){try{await n.abort()}catch{}throw o}return(await e.getFile()).lastModified}async function T1(e,t,n=new Date){const o=t.trim().replace(/[\r\n]+/g," ")||"未命名文章",r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,i=[];for await(const d of e.values())i.push(d.name);const s=Of(`${r}-${C1(o)}`,i),a=await e.getDirectoryHandle(s,{create:!0}),l=await a.getFileHandle("article.md",{create:!0}),c=Tf(`# ${o}
`,{title:o,date:r}),u=await ul(l,c);return{name:s,title:o,date:r,lastModified:u,dir:a,file:l}}const Gc=new WeakMap,bi=new WeakMap,Lf={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",webp:"image/webp",gif:"image/gif",avif:"image/avif",bmp:"image/bmp",svg:"image/svg+xml"},zn=new ad({html:!1});for(const e of["gallery","image-caption","image-item","author-bio"])zn.use(ma,e,{validate:t=>t.trim().split(/\s+/)[0]===e});const A1=zn.inline.ruler.getRules("");zn.inline.ruler.disable("image");const I1=new Set(zn.inline.ruler.getRules("")),R1=A1.find(e=>!I1.has(e));zn.inline.ruler.at("image",(e,t)=>{const n=e.pos,o=R1(e,t),r=e.env;if(o&&!t&&e.src===r.scanSource){const i=e.tokens[e.tokens.length-1];r.images?.push({from:n,to:e.pos,path:i.attrGet("src")??"",alt:i.content,title:i.attrGet("title")??""})}return o});zn.inline.ruler.enable("image");function M1(e){const t={},n=zn.parse(e,t),o=e.match(/[^\n]*\n|[^\n]+$/g)??[],r=[0];for(const s of o)r.push(r[r.length-1]+s.length);const i=[];for(const s of n){if(s.map&&["container_image-caption_open","container_image-item_open","container_author-bio_open"].includes(s.type)){const l=s.type.slice(10,-5),c=l==="author-bio"?"avatar":"src",u=or(s.info.trim().slice(l.length).trim()).attrs[c];if(!u)continue;const d=[...s.info.matchAll(/([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g)].filter(w=>w[1]===c),f=d[d.length-1],h=o[s.map[0]].indexOf(s.info);if(!f||h<0)continue;const g=f[2].startsWith('"')||f[2].startsWith("'"),m=r[s.map[0]]+h+f.index+f[0].indexOf("=")+1+Number(g);i.push({from:m,to:m+u.length,path:u,alt:"",title:"",attribute:!0});continue}if(s.type!=="inline"&&s.type!=="tr_open"||!s.map)continue;t.scanSource=o.slice(s.map[0],s.map[1]).join(""),t.images=[];const a=[];zn.inline.parse(t.scanSource,zn,t,a);for(const l of t.images)i.push({...l,from:l.from+r[s.map[0]],to:l.to+r[s.map[0]]})}return i}function Nf(e){return e instanceof DOMException&&(e.name==="NotFoundError"||e.name==="TypeMismatchError")}function O1(e){if(!e.startsWith("images/"))return null;let t;try{t=decodeURIComponent(e.split(/[?#]/,1)[0])}catch{return""}return t.split("/").some(o=>!o||o==="."||o===".."||/[\\\u0000-\u001f]/.test(o))?"":t}function L1(e){const t=Lf[e.name.split(".").pop()?.toLowerCase()??""],n=!e.type.startsWith("image/")&&t?new Blob([e],{type:t}):e;return new Promise((o,r)=>{const i=new FileReader;i.onload=()=>o(String(i.result)),i.onerror=()=>r(i.error??new Error(`无法读取图片 ${e.name}`)),i.readAsDataURL(n)})}async function N1(e,t){let n=Gc.get(t);n||(n=new Map,Gc.set(t,n));try{const o=e.split("/");let r=t;for(const l of o.slice(0,-1))r=await r.getDirectoryHandle(l);const i=await(await r.getFileHandle(o[o.length-1])).getFile(),s=n.get(e);if(s?.lastModified===i.lastModified&&s.size===i.size)return s.data;const a=await L1(i);return n.set(e,{lastModified:i.lastModified,size:i.size,data:a}),a}catch(o){if(n.delete(e),Nf(o))return null;throw o}}async function D1(e,t){const{body:n,publication:o}=Oo(e),r=M1(n),i=new Set(r.map(c=>c.path));o.cover&&i.add(o.cover);const s=new Map,a=new Set;for(const c of i){const u=O1(c);if(u===null)continue;const d=u?await N1(u,t):null;d?s.set(c,d):a.add(u||c)}let l=n;for(const c of r.sort((u,d)=>d.from-u.from)){const u=s.get(c.path);if(!u)continue;const d=c.title?` "${c.title.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`:"",f=c.attribute?u:`![${c.alt}](${u}${d})`;l=l.slice(0,c.from)+f+l.slice(c.to)}return{md:e.slice(0,e.length-n.length)+l,missing:[...a]}}async function v6(e){let t;try{t=await e.getDirectoryHandle("images")}catch(r){if(Nf(r))return[];throw r}const n=[];async function o(r,i){for await(const s of r.values()){const a=`${i}/${s.name}`;if(s.kind==="directory")await o(s,a);else{const l=s.name.split(".").pop()?.toLowerCase()??"";Lf[l]&&n.push(a)}}}return await o(t,"images"),n.sort((r,i)=>r.localeCompare(i))}function P1(e,t,n){const o=(bi.get(e)??Promise.resolve()).catch(()=>{}).then(async()=>{if(!Fr(t))throw new Error("请选择图片文件");const i=await If(t,n),s="data:image/webp;base64,";if(!i.startsWith(s))throw new Error("浏览器未能生成 WebP 图片");const a=Uint8Array.from(atob(i.slice(s.length)),h=>h.charCodeAt(0)),l=await e.getDirectoryHandle("images",{create:!0}),c=[];for await(const h of l.values())/\.webp$/i.test(h.name)&&c.push(h.name.slice(0,-5));const u=`${Of(String(Date.now()),c)}.webp`,f=await(await l.getFileHandle(u,{create:!0})).createWritable();try{await f.write(new Blob([a],{type:"image/webp"})),await f.close()}catch(h){try{await f.abort()}catch{}throw h}return`images/${u}`});bi.set(e,o);const r=()=>{bi.get(e)===o&&bi.delete(e)};return o.then(r,r),o}const B1=/```[\s\S]*?```/g,F1=/`[^`\n]+`/g,j1=/https?:\/\/\S+/gi,H1=/\]\([^)\n]*\)/g,V1=/<[^>\n]+>/g,U1=/^(?: {4}|\t)[^\n]*$/gm;function z1(e){const t=[];for(const o of[B1,F1,j1,H1,V1,U1]){o.lastIndex=0;let r;for(;(r=o.exec(e))!==null;)t.push({from:r.index,to:r.index+r[0].length}),r[0].length===0&&o.lastIndex++}t.sort((o,r)=>o.from-r.from);const n=[];for(const o of t){const r=n[n.length-1];r&&o.from<=r.to?r.to=Math.max(r.to,o.to):n.push({from:o.from,to:o.to})}return n}function W1(e,t){if(t.length===0)return e;const n=e.split("");for(const o of t)for(let r=o.from;r<o.to;r++)n[r]="\0";return n.join("")}const Kr="一-鿿㐀-䶿",Ir=new RegExp(`[${Kr}]`),Yc=new RegExp(`([${Kr}])([A-Za-z0-9])|([A-Za-z0-9])([${Kr}])`,"g"),Jc=new RegExp(`([${Kr}])([,.!?:;])`,"g"),Zc=new RegExp(`([,.!?:;])([${Kr}])`,"g"),Qc=/"([^"\n]*?)"/g,Xc=/\.{3,}/g,eu=/--/g,tu={",":"，",".":"。","!":"！","?":"？",":":"：",";":"；"};function K1(e){const t=[];Yc.lastIndex=0;let n;for(;(n=Yc.exec(e))!==null;){const o=n[0],r=o[0],i=o[1];t.push({from:n.index,to:n.index+o.length,code:"zh-ascii-spacing",original:o,replacement:`${r} ${i}`})}return t}function q1(e){const t=[],n=new Set;Jc.lastIndex=0;let o;for(;(o=Jc.exec(e))!==null;){const r=o.index+o[1].length;if(n.has(r))continue;const i=tu[o[2]];i&&(o[2]==="."&&e[r+1]==="."||(n.add(r),t.push({from:o.index,to:o.index+o[0].length,code:"zh-halfwidth-punct",original:o[0],replacement:o[1]+i})))}for(Zc.lastIndex=0;(o=Zc.exec(e))!==null;){const r=o.index;if(n.has(r))continue;const i=o.index>0?e[o.index-1]:"";if(/\d/.test(i))continue;const s=tu[o[1]];s&&(o[1]==="."&&i==="."||(n.add(r),t.push({from:o.index,to:o.index+o[0].length,code:"zh-halfwidth-punct",original:o[0],replacement:s+o[2]})))}return t}function G1(e){const t=[];Qc.lastIndex=0;let n;for(;(n=Qc.exec(e))!==null;){const o=n[1];Ir.test(o)&&t.push({from:n.index,to:n.index+n[0].length,code:"zh-straight-quote",original:n[0],replacement:`“${o}”`})}return t}function Y1(e){const t=[];Xc.lastIndex=0;let n;for(;(n=Xc.exec(e))!==null;){const o=n.index>0?e[n.index-1]:"",r=e[n.index+n[0].length]??"";!Ir.test(o)&&!Ir.test(r)||t.push({from:n.index,to:n.index+n[0].length,code:"zh-dash-ellipsis",original:n[0],replacement:"……"})}for(eu.lastIndex=0;(n=eu.exec(e))!==null;){const o=n.index>0?e[n.index-1]:"",r=e[n.index+2]??"";!Ir.test(o)&&!Ir.test(r)||t.push({from:n.index,to:n.index+2,code:"zh-dash-ellipsis",original:"--",replacement:"——"})}return t}function Df(e){if(!e)return[];const t=W1(e,z1(e)),n=[...K1(t),...q1(t),...G1(t),...Y1(t)];return n.sort((o,r)=>o.from-r.from||o.code.localeCompare(r.code)),n}function J1(e){const t=Df(e);if(t.length===0)return{fixed:e,ranges:[]};const n=[];let o=1/0;for(let a=t.length-1;a>=0;a--){const l=t[a];l.to>o||(n.push(l),o=l.from)}n.reverse();let r=e,i=0;const s=[];for(const a of n){const l=a.from+i;r=r.slice(0,l)+a.replacement+r.slice(l+a.original.length);const c=l+a.replacement.length;s.push({from:l,to:c,code:a.code}),i+=a.replacement.length-a.original.length}return{fixed:r,ranges:s}}const Z1=[/^https:\/\/mp\.weixin\.qq\.com\/s\//i,/^weixin:\/\/dl\//i,/^tel:/i,/^mailto:/i,/^#/],Pf=new Set(Qi.map(e=>e.name)),Q1=/^ {0,3}(:{3,})[ \t]*([A-Za-z][\w-]*)?[ \t]*(.*?)[ \t]*$/,X1=/^ {0,3}(:{3,})[ \t]*$/,eb=/^([ \t]*)([-*+]|\d+\.)\s/;function tb(e){const t=[],n=e.split(`
`),o=[];let r=null;const i=new Array(n.length);let s=0;for(let c=0;c<n.length;c++)i[c]=s,s+=n[c].length+1;for(let c=0;c<n.length;c++){const u=n[c].replace(/\r$/,""),d=i[c],f=d+u.length,h=/^ {0,3}(`{3,}|~{3,})(.*)$/.exec(u);if(r){h&&h[1][0]===r[0]&&h[1].length>=r.length&&/^\s*$/.test(h[2])&&(r=null);continue}if(h&&(h[1][0]==="~"||!h[2].includes("`"))){r=h[1];continue}const g=eb.exec(u);if(g){let C=0;for(const F of g[1])C+=F==="	"?4:1;if(C>=4){const F=d+g[1].length,E=F+g[2].length;t.push({from:F,to:E,severity:"warning",code:"list-too-deep",message:'列表嵌套 ≥ 3 层——公众号渲染时会被扁平化为带"·"前缀的段落，建议改为两级以内。'})}}const m=X1.exec(u);if(m){const C=m[1].length;if(o.length===0)continue;o[o.length-1].colons===C&&o.pop();continue}const w=Q1.exec(u);if(!w)continue;const k=w[1].length,x=w[2]??"",L=w[3]??"";if(!x)continue;const $=d+u.indexOf(w[1]),N=u.indexOf(x,w[1].length),D=d+(N>=0?N:w[1].length+1),_=D+x.length;if(!Pf.has(x)){const C=ib(x);t.push({from:D,to:_,severity:"error",code:"unknown-container",message:C?`未知容器 "${x}"——是否想写 "${C}"？合法名见 docs/contract/base.md 速查表。`:`未知容器 "${x}"。合法 fence 名见 docs/contract/base.md 速查表。`}),o.push({line:c,colons:k,name:x,openStart:$,openEnd:f});continue}const v=Zi(x);if(v.fenceLength!==k){const C=":".repeat(v.fenceLength);t.push({from:$,to:$+k,severity:"error",code:"fence-length-wrong",message:`容器 "${x}" 应使用 ${v.fenceLength} 个冒号（"${C}"）；当前是 ${k} 个。`+(x==="compare"?" compare 外层必须 ::::，内层 pros/cons 才能用 :::。":v.parent?` 作为 ${v.parent} 的子容器，必须用 :::。`:""),fix:{title:`改为 ${C}`,edits:[{from:$,to:$+k,insert:C}]}})}if(v.parent){const C=o[o.length-1];(!C||C.name!==v.parent)&&t.push({from:D,to:_,severity:"error",code:"nested-misplaced",message:`"${x}" 必须嵌在 ":::: ${v.parent}" 容器内；当前在外层孤立使用。`})}const S=ob(L);if(S&&v.variantKind){const C=En[v.variantKind];if(C&&!C.includes(S.value)){const F=d+u.indexOf("variant=")+8;t.push({from:F,to:F+S.value.length,severity:"warning",code:"unknown-variant",message:`未知 variant "${S.value}" —— "${x}" (${v.variantKind}) 合法取值：`+C.join(" / ")})}}else S&&!v.variantKind&&t.push({from:d+u.indexOf("variant="),to:d+u.indexOf("variant=")+8+S.value.length,severity:"info",code:"unknown-variant",message:`容器 "${x}" 不支持 variant 覆盖（无 variantKind），该声明会被忽略。`});if(x==="footer-cta"){const C=rb(L);if(C&&!Z1.some(F=>F.test(C.value))){const F=u.indexOf("href=",u.indexOf(x)+x.length),E=d+F+5;t.push({from:E,to:E+(C.rawLen??C.value.length),severity:"warning",code:"footer-cta-outlink",message:`footer-cta 的 "${C.value}" 在公众号正文里不可直接点击——建议改为 mp.weixin.qq.com/s/* 同域文章链 / weixin://dl/* 小程序协议 / tel: / mailto: / 页内锚点 #；或把该 URL 放到公众号后台"阅读原文"位置。`})}}const I=/(?:^|\s)([a-zA-Z_][\w-]*):[ \t]/.exec(L);if(I&&!/=/.test(L.slice(0,I.index+I[0].length))){const C=u.indexOf(I[1]+":",u.indexOf(x)+x.length);if(C>=0){const F=d+C,E=F+I[1].length;t.push({from:F,to:E+1,severity:"warning",code:"yaml-style-attr",message:`open 行的 "${I[1]}:" 看起来像 YAML；容器属性只接受 "key=value" 写法。 若是标题文字请忽略此告警。`,fix:{title:`改为 ${I[1]}=`,edits:[{from:E,to:E+1,insert:"="}]}})}}o.push({line:c,colons:k,name:x,openStart:$,openEnd:f})}const a=e.length,l=a>0&&e[a-1]!==`
`;for(let c=o.length-1;c>=0;c--){const u=o[c],d=":".repeat(u.colons);t.push({from:u.openStart,to:u.openEnd,severity:"error",code:"unclosed-fence",message:`"${u.name}" 容器未闭合——末尾缺少 "${d}" 行。`,fix:{title:`在文末插入 ${d}`,edits:[{from:a,to:a,insert:(l?`
`:"")+d+`
`}]}})}for(const c of Df(e))t.push({from:c.from,to:c.to,severity:"info",code:c.code,message:nb[c.code](c.original,c.replacement),fix:{title:`改为 "${c.replacement}"`,edits:[{from:c.from,to:c.to,insert:c.replacement}]}});return t.sort((c,u)=>c.from-u.from)}const nb={"zh-ascii-spacing":e=>`中英混排建议加空格："${e}"——Toolbar"一键修复中文排版"可批量处理。`,"zh-halfwidth-punct":(e,t)=>`中文后请用全角标点："${e}" → "${t}"。`,"zh-straight-quote":(e,t)=>`含 CJK 引语建议用弯引号："${e}" → "${t}"。`,"zh-dash-ellipsis":(e,t)=>e.startsWith(".")?`中文省略号建议用 …… 代替 ${e.length} 个英文句点。`:`中文破折号建议用 —— 代替两个半角连字符（${e} → ${t}）。`};function ob(e){const t=/(^|\s)variant=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??""}:null}function rb(e){const t=/(^|\s)href=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??"",rawLen:t[2].length}:null}function ib(e){let t=null,n=3;for(const o of Pf){const r=sb(e,o);r<n&&(n=r,t=o)}return t}function sb(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 3;const n=e.length,o=t.length,r=new Array((o+1)*2);for(let i=0;i<=o;i++)r[i]=i;for(let i=1;i<=n;i++){const s=(i&1)*(o+1),a=(i-1&1)*(o+1);r[s]=i;for(let l=1;l<=o;l++){const c=e[i-1]===t[l-1]?0:1;r[s+l]=Math.min(r[a+l]+1,r[s+l-1]+1,r[a+l-1]+c)}}return r[(n&1)*(o+1)+o]}function ab(e){const n=e.replace(/\$/g,"\\$").split(`
`);let o=-1;for(let r=0;r<n.length;r++){const i=n[r].trim();if(i.length!==0&&!/^:{3,}/.test(i)){o=r;break}}return o===-1?(n.length>=1&&(n[0]=`${n[0]}\${1}`),n.join(`
`)):(n[o]=`\${1:${n[o]}}`,n.join(`
`))}function lb(e){const t=document.createElement("div");t.style.cssText="max-width:360px;padding:4px 6px;";const n=document.createElement("div");n.style.cssText="font-size:12px;line-height:1.5;color:var(--editor-text,inherit);",n.textContent=e.description,t.appendChild(n);const o=document.createElement("pre");return o.style.cssText="margin:6px 0 0;padding:6px 8px;background:var(--editor-active,rgba(0,0,0,.04));border-left:2px solid var(--accent,#888);font:11px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap;color:var(--editor-text,inherit);overflow:hidden;text-overflow:ellipsis;",o.textContent=e.example,t.appendChild(o),t}const cb=Qi.map(e=>({label:e.name,type:e.parent?"interface":"class",detail:e.category,info:()=>lb(e),apply:Em(ab(e.example))})),ub=new Map(Qi.filter(e=>e.variantKind!==void 0).map(e=>{const n=(En[e.variantKind]??[]).map(o=>({label:o,type:"enum",detail:e.variantKind}));return[e.name,n]}));function db(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from);return/^(:{3,})\s+([A-Za-z][\w-]*)?$/.test(n)?{from:t.from,to:e.pos,options:cb,validFor:/^:{3,}\s+[A-Za-z0-9_-]*$/}:null}function fb(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from),o=/^(:{3,})\s+([A-Za-z][\w-]*)\b/.exec(t.text);if(!o)return null;const r=ub.get(o[2]);if(!r||r.length===0)return null;const i=/variant=(["']?)([A-Za-z0-9_-]*)$/.exec(n);if(!i)return null;const s=i[2];return{from:e.pos-s.length,to:e.pos,options:r,validFor:/^[A-Za-z0-9_-]*$/}}function pb(e){const t=e.state.doc.lineAt(e.pos),n=/^(:{3,})\s+([A-Za-z][\w-]*)/.exec(t.text);if(!n)return null;const o=Zi(n[2]);if(!o?.attrs?.length||e.pos-t.from<=n[0].length)return null;const i=e.matchBefore(/[A-Za-z][\w-]*/),s=i?.text??"",a=i?.from??e.pos,l=a-t.from,c=l>0?t.text[l-1]:"";if(c!==""&&!/\s/.test(c)||!e.explicit&&s.length===0)return null;const u=o.attrs.map(d=>{const f=d.example?`"${d.example.replace(/"/g,'\\"')}"`:"";return{label:d.key,type:"property",detail:d.enum?d.enum.join(" | "):d.example,info:d.description,apply:`${d.key}=${f}`}});return{from:a,to:e.pos,options:u,validFor:/^[A-Za-z0-9_-]*$/}}function hb(e){const t=e.state.doc.lineAt(e.pos),n=/^(:{3,})\s+([A-Za-z][\w-]*)/.exec(t.text);if(!n)return null;const o=Zi(n[2]);if(!o?.attrs?.length)return null;const r=t.text.slice(0,e.pos-t.from),i=/(\b[A-Za-z][\w-]*)=(["']?)([A-Za-z0-9_-]*)$/.exec(r);if(!i)return null;const[,s,,a]=i;if(s==="variant")return null;const l=o.attrs.find(u=>u.key===s);if(!l?.enum?.length)return null;const c=l.enum.map(u=>({label:u,type:"enum",detail:s}));return{from:e.pos-a.length,to:e.pos,options:c,validFor:/^[A-Za-z0-9_-]*$/}}function mb(){return Cm({override:[fb,hb,pb,db],activateOnTyping:!0,icons:!1})}const gb={error:"error",warning:"warning",info:"info"};function bb(){return $m(e=>{const t=e.state.doc.toString();return tb(t).map(o=>{const r={from:Math.min(o.from,t.length),to:Math.min(Math.max(o.to,o.from),t.length),severity:gb[o.severity],message:o.message,source:`wechat-typeset:${o.code}`};if(o.fix){const i=o.fix.edits,s=o.fix.title;r.actions=[{name:s,apply:a=>{const l=a.state.doc.length,c=i.filter(u=>u.from>=0&&u.to<=l&&u.from<=u.to).map(u=>({from:u.from,to:u.to,insert:u.insert}));c.length!==0&&a.dispatch({changes:c})}}]}return r})},{delay:500})}const qr=/^(:{3,})\s+([A-Za-z][\w-]*)/,dl=/^(:{3,})\s*$/;function yb(e){const t=[],n=[];for(let o=1;o<=e.lines;o++){const r=e.line(o).text,i=dl.exec(r);if(i&&n.length>0){const a=i[1].length,l=n[n.length-1];if(l.colons===a){t[l.frameIdx].closeLine=o,n.pop();continue}}const s=qr.exec(r);if(s){const a=s[1].length,l=n.length+1,c=t.length;t.push({name:s[2],colons:a,openLine:o,closeLine:-1,depth:l}),n.push({colons:a,frameIdx:c})}}return t}const vb=4;function nu(e){const t=yb(e);if(t.length===0)return Co.none;const n=new Array(e.lines+1).fill(0),o=new Set,r=new Set;for(const s of t){o.add(s.openLine),s.closeLine!==-1&&r.add(s.closeLine);const a=s.closeLine===-1?e.lines:s.closeLine;for(let l=s.openLine;l<=a;l++)s.depth>n[l]&&(n[l]=s.depth)}const i=new Tm;for(let s=1;s<=e.lines;s++){const a=n[s];if(a===0)continue;const c=[`wt-container-depth-${Math.min(a,vb)}`];o.has(s)?c.push("wt-container-open"):r.has(s)?c.push("wt-container-close"):c.push("wt-container-body");const u=e.line(s);i.add(u.from,u.from,Co.line({class:c.join(" ")}))}return i.finish()}const wb=ld.define({create(e){return nu(e.doc)},update(e,t){return t.docChanged?nu(t.state.doc):e},provide:e=>Rt.decorations.from(e)}),Sb=Rt.theme({".wt-container-depth-1":{backgroundColor:"rgba(99, 102, 241, 0.06)"},".wt-container-depth-2":{backgroundColor:"rgba(99, 102, 241, 0.11)"},".wt-container-depth-3":{backgroundColor:"rgba(99, 102, 241, 0.16)"},".wt-container-depth-4":{backgroundColor:"rgba(99, 102, 241, 0.21)"},".wt-container-open, .wt-container-close":{boxShadow:"inset 2px 0 0 var(--accent, #6366f1)",fontWeight:"600"},".wt-container-close":{opacity:"0.7"}}),kb=[wb,Sb],xb=cd.of((e,t)=>{const n=e.doc,o=n.lineAt(t),r=qr.exec(o.text);if(!r)return null;const s=[r[1].length];for(let a=o.number+1;a<=n.lines;a++){const l=n.line(a).text,c=dl.exec(l);if(c){const d=c[1].length;if(s[s.length-1]===d){if(s.pop(),s.length===0)return{from:o.to,to:n.line(a).to};continue}}const u=qr.exec(l);u&&s.push(u[1].length)}return null});function _b(e,t,n){const o=[n];for(let r=t+1;r<=e.lines;r++){const i=e.line(r).text,s=dl.exec(i);if(s){const l=s[1].length;if(o[o.length-1]===l){if(o.pop(),o.length===0)return!0;continue}}const a=qr.exec(i);a&&o.push(a[1].length)}return!1}const Cb=Rt.inputHandler.of((e,t,n,o)=>{if(o!==`
`||t!==n)return!1;const r=e.state.doc,i=r.lineAt(t);if(t!==i.to)return!1;const s=qr.exec(i.text);if(!s)return!1;const a=s[1];return _b(r,i.number,a.length)?!1:(e.dispatch({changes:{from:t,to:n,insert:`

${a}
`},selection:{anchor:t+1},userEvent:"input.type"}),!0)}),$b=[kb,xb,Cb],Eb=5e3,Ia=Am.define(),Tb=Co.mark({class:"cm-zhfix-mark"}),Ab=ld.define({create(){return Co.none},update(e,t){e=e.map(t.changes);for(const n of t.effects)if(n.is(Ia))if(n.value===null)e=Co.none;else if(n.value.length===0)e=Co.none;else{const o=n.value.map(r=>Tb.range(r.from,r.to));e=Co.set(o,!0)}return e},provide:e=>Rt.decorations.from(e)}),Ib=Rt.theme({".cm-zhfix-mark":{backgroundColor:"var(--zhfix-bg, rgba(248, 196, 84, 0.32))",borderRadius:"2px",transition:"background-color 400ms ease-out"}}),Rb=[Ab,Ib],Fs=new WeakMap;function Mb(e,t){if(t.length===0)return;e.dispatch({effects:Ia.of(t)});const n=Fs.get(e);n!==void 0&&window.clearTimeout(n);const o=window.setTimeout(()=>{Fs.delete(e);try{e.dispatch({effects:Ia.of(null)})}catch{}},Eb);Fs.set(e,o)}function Ra(e){if(!/^\uFEFF?---[ \t]*$/.test(e.line(1).text))return null;for(let t=2;t<=e.lines;t++)if(/^---[ \t]*$/.test(e.line(t).text))return{from:0,to:e.line(t).to};return null}const Ob=[cd.of((e,t)=>t===0?Ra(e.doc):null),Im({preparePlaceholder:(e,t)=>t.from===0&&Ra(e.doc)?.to===t.to,placeholderDOM:(e,t,n)=>{const o=document.createElement("button");return o.type="button",o.className="cm-foldPlaceholder",o.textContent=n?"发布信息 · 展开":"…",o.setAttribute("aria-label",n?"展开发布信息源码":"展开折叠内容"),o.addEventListener("click",t),o}})];function Lb(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}function Ma(e,t){return Array(t+1).join(e)}function Bf(e){return e.replace(/^\n*/,"")}function Ff(e){for(var t=e.length;t>0&&e[t-1]===`
`;)t--;return e.substring(0,t)}function jf(e){return Ff(Bf(e))}var Nb=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function fl(e){return pl(e,Nb)}var Hf=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function Vf(e){return pl(e,Hf)}function Db(e){return zf(e,Hf)}var Uf=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function Pb(e){return pl(e,Uf)}function Bb(e){return zf(e,Uf)}function pl(e,t){return t.indexOf(e.nodeName)>=0}function zf(e,t){return e.getElementsByTagName&&t.some(function(n){return e.getElementsByTagName(n).length})}var Fb=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function Wf(e){return Fb.reduce(function(t,n){return t.replace(n[0],n[1])},e)}var Dt={};Dt.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};Dt.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+`
`}};Dt.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,n){var o=Number(t.nodeName.charAt(1));if(n.headingStyle==="setext"&&o<3){var r=Ma(o===1?"=":"-",e.length);return`

`+e+`
`+r+`

`}else return`

`+Ma("#",o)+" "+e+`

`}};Dt.blockquote={filter:"blockquote",replacement:function(e){return e=jf(e).replace(/^/gm,"> "),`

`+e+`

`}};Dt.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;return n.nodeName==="LI"&&n.lastElementChild===t?`
`+e:`

`+e+`

`}};Dt.listItem={filter:"li",replacement:function(e,t,n){var o=n.bulletListMarker+"   ",r=t.parentNode;if(r.nodeName==="OL"){var i=r.getAttribute("start"),s=Array.prototype.indexOf.call(r.children,t);o=(i?Number(i)+s:s+1)+".  "}var a=/\n$/.test(e);return e=jf(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(o.length)),o+e+(t.nextSibling?`
`:"")}};Dt.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};Dt.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){for(var o=t.firstChild.getAttribute("class")||"",r=(o.match(/language-(\S+)/)||[null,""])[1],i=t.firstChild.textContent,s=n.fence.charAt(0),a=3,l=new RegExp("^"+s+"{3,}","gm"),c;c=l.exec(i);)c[0].length>=a&&(a=c[0].length+1);var u=Ma(s,a);return`

`+u+r+`
`+i.replace(/\n$/,"")+`
`+u+`

`}};Dt.horizontalRule={filter:"hr",replacement:function(e,t,n){return`

`+n.hr+`

`}};Dt.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var n=hl(t.getAttribute("href")),o=ml(Fi(t.getAttribute("title"))),r=o?' "'+o+'"':"";return"["+e+"]("+n+r+")"}};Dt.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,n){var o=hl(t.getAttribute("href")),r=Fi(t.getAttribute("title"));r&&(r=' "'+ml(r)+'"');var i,s;switch(n.linkReferenceStyle){case"collapsed":i="["+e+"][]",s="["+e+"]: "+o+r;break;case"shortcut":i="["+e+"]",s="["+e+"]: "+o+r;break;default:var a=this.references.length+1;i="["+e+"]["+a+"]",s="["+a+"]: "+o+r}return this.references.push(s),i},references:[],append:function(e){var t="";return this.references.length&&(t=`

`+this.references.join(`
`)+`

`,this.references=[]),t}};Dt.emphasis={filter:["em","i"],replacement:function(e,t,n){return e.trim()?n.emDelimiter+e+n.emDelimiter:""}};Dt.strong={filter:["strong","b"],replacement:function(e,t,n){return e.trim()?n.strongDelimiter+e+n.strongDelimiter:""}};Dt.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",n="`",o=e.match(/`+/gm)||[];o.indexOf(n)!==-1;)n=n+"`";return n+t+e+t+n}};Dt.image={filter:"img",replacement:function(e,t){var n=Wf(Fi(t.getAttribute("alt"))),o=hl(t.getAttribute("src")||""),r=Fi(t.getAttribute("title")),i=r?' "'+ml(r)+'"':"";return o?"!["+n+"]("+o+i+")":""}};function Fi(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function hl(e){var t=e.replace(/([<>()])/g,"\\$1");return t.indexOf(" ")>=0?"<"+t+">":t}function ml(e){return e.replace(/"/g,'\\"')}function Kf(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}Kf.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;return(t=js(this.array,e,this.options))||(t=js(this._keep,e,this.options))||(t=js(this._remove,e,this.options))?t:this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};function js(e,t,n){for(var o=0;o<e.length;o++){var r=e[o];if(jb(r,t,n))return r}}function jb(e,t,n){var o=e.filter;if(typeof o=="string"){if(o===t.nodeName.toLowerCase())return!0}else if(Array.isArray(o)){if(o.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof o=="function"){if(o.call(e,t,n))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function Hb(e){var t=e.element,n=e.isBlock,o=e.isVoid,r=e.isPre||function(d){return d.nodeName==="PRE"};if(!(!t.firstChild||r(t))){for(var i=null,s=!1,a=null,l=ou(a,t,r);l!==t;){if(l.nodeType===3||l.nodeType===4){var c=l.data.replace(/[ \r\n\t]+/g," ");if((!i||/ $/.test(i.data))&&!s&&c[0]===" "&&(c=c.substr(1)),!c){l=Hs(l);continue}l.data=c,i=l}else if(l.nodeType===1)n(l)||l.nodeName==="BR"?(i&&(i.data=i.data.replace(/ $/,"")),i=null,s=!1):o(l)||r(l)?(i=null,s=!0):i&&(s=!1);else{l=Hs(l);continue}var u=ou(a,l,r);a=l,l=u}i&&(i.data=i.data.replace(/ $/,""),i.data||Hs(i))}}function Hs(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function ou(e,t,n){return e&&e.parentNode===t||n(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}var gl=typeof window<"u"?window:{};function Vb(){var e=gl.DOMParser,t=!1;try{new e().parseFromString("","text/html")&&(t=!0)}catch{}return t}function Ub(){var e=function(){};return zb()?e.prototype.parseFromString=function(t){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(t),n.close(),n}:e.prototype.parseFromString=function(t){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(t),n.close(),n},e}function zb(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{gl.ActiveXObject&&(e=!0)}return e}var Wb=Vb()?gl.DOMParser:Ub();function Kb(e,t){var n;if(typeof e=="string"){var o=qb().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");n=o.getElementById("turndown-root")}else n=e.cloneNode(!0);return Hb({element:n,isBlock:fl,isVoid:Vf,isPre:t.preformattedCode?Gb:null}),n}var Vs;function qb(){return Vs=Vs||new Wb,Vs}function Gb(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Yb(e,t){return e.isBlock=fl(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=Jb(e),e.flankingWhitespace=Zb(e,t),e}function Jb(e){return!Vf(e)&&!Pb(e)&&/^\s*$/i.test(e.textContent)&&!Db(e)&&!Bb(e)}function Zb(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var n=Qb(e.textContent);return n.leadingAscii&&ru("left",e,t)&&(n.leading=n.leadingNonAscii),n.trailingAscii&&ru("right",e,t)&&(n.trailing=n.trailingNonAscii),{leading:n.leading,trailing:n.trailing}}function Qb(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}function ru(e,t,n){var o,r,i;return e==="left"?(o=t.previousSibling,r=/ $/):(o=t.nextSibling,r=/^ /),o&&(o.nodeType===3?i=r.test(o.nodeValue):n.preformattedCode&&o.nodeName==="CODE"?i=!1:o.nodeType===1&&!fl(o)&&(i=r.test(o.textContent))),i}var Xb=Array.prototype.reduce;function ji(e){if(!(this instanceof ji))return new ji(e);var t={rules:Dt,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(n,o){return o.isBlock?`

`:""},keepReplacement:function(n,o){return o.isBlock?`

`+o.outerHTML+`

`:o.outerHTML},defaultReplacement:function(n,o){return o.isBlock?`

`+n+`

`:n}};this.options=Lb({},t,e),this.rules=new Kf(this.options)}ji.prototype={turndown:function(e){if(!ny(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=qf.call(this,new Kb(e,this.options));return ey.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return Wf(e)}};function qf(e){var t=this;return Xb.call(e.childNodes,function(n,o){o=new Yb(o,t.options);var r="";return o.nodeType===3?r=o.isCode?o.nodeValue:t.escape(o.nodeValue):o.nodeType===1&&(r=ty.call(t,o)),Gf(n,r)},"")}function ey(e){var t=this;return this.rules.forEach(function(n){typeof n.append=="function"&&(e=Gf(e,n.append(t.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function ty(e){var t=this.rules.forNode(e),n=qf.call(this,e),o=e.flankingWhitespace;return(o.leading||o.trailing)&&(n=n.trim()),o.leading+t.replacement(n,e,this.options)+o.trailing}function Gf(e,t){var n=Ff(e),o=Bf(t),r=Math.max(e.length-n.length,t.length-o.length),i=`

`.substring(0,r);return n+i+o}function ny(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}const bl=new ji({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",emDelimiter:"*",strongDelimiter:"**",hr:"---"});bl.remove(["style","script","meta","link","title"]);bl.addRule("wordXmlNs",{filter:e=>{const t=e.nodeName.toLowerCase();return t.startsWith("o:")||t.startsWith("w:")||t.startsWith("v:")},replacement:()=>""});function oy(e){if(!e||!e.trim())return"";const t=e.match(/<!--\s*StartFragment\s*-->/i),n=e.match(/<!--\s*EndFragment\s*-->/i);let o=e;if(t&&n){const i=(t.index??0)+t[0].length,s=n.index??e.length;o=e.slice(i,s)}return bl.turndown(o).replace(/\n{3,}/g,`

`).trim()}function ry(e){if(!e||!Array.from(e.types??[]).includes("text/html"))return!1;const o=e.getData("text/html").replace(/<meta[^>]*>/gi,"").trim();return!/^<p[^>]*>[^<]*<\/p>$/i.test(o)}function dn(e){try{return localStorage.getItem(e)}catch{return null}}function Yt(e,t){try{return localStorage.setItem(e,t),!0}catch(n){return console.warn(`[storage] safeWrite failed: ${e}`,n),!1}}function cs(e){try{localStorage.removeItem(e)}catch{}}function us(e,t){const n=dn(e);if(n==null)return t;try{return JSON.parse(n)}catch{return t}}function ds(e,t){let n;try{n=JSON.stringify(t)}catch(o){return console.warn(`[storage] safeWriteJson stringify failed: ${e}`,o),!1}return Yt(e,n)}function yl(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const Yf="wechat-typeset:ui-theme";function iy(){return dn(Yf)==="dark"?"dark":"light"}const rr=J(iy());function iu(e){document.documentElement.dataset.theme=e}function sy(){iu(rr.value),Pe(rr,e=>{iu(e),Yt(Yf,e)})}const ay={class:"editor-shell"},ly={class:"editor-tools"},cy=["disabled"],uy=767,dy=100,fy=Ke({__name:"Editor",props:{modelValue:{},imageDirectory:{},documentId:{}},emits:["update:modelValue","scroll","imageBusy"],setup(e,{expose:t,emit:n}){const o=Rt.theme({"&":{backgroundColor:"var(--editor-bg)",color:"var(--editor-text)",height:"100%",fontSize:"14px"},".cm-scroller":{overflow:"auto",fontFamily:"var(--font-mono)",lineHeight:"1.9"},".cm-content":{caretColor:"var(--accent)",padding:"18px 0 32px"},".cm-line":{padding:"0 20px 0 10px"},"&.cm-focused .cm-cursor":{borderLeftColor:"var(--accent)"},".cm-gutters":{backgroundColor:"var(--editor-surface)",color:"var(--editor-linenum)",border:"none"},".cm-lineNumbers .cm-gutterElement":{minWidth:"30px",padding:"0 5px 0 12px",fontSize:"11px"},".cm-foldGutter .cm-gutterElement":{padding:"0 4px",opacity:"0.6"},".cm-foldPlaceholder":{border:"none",borderRadius:"4px",backgroundColor:"var(--surface)",color:"var(--text-muted)",padding:"2px 8px",fontFamily:"var(--font-text)",fontSize:"12px",cursor:"pointer"},".cm-activeLine":{backgroundColor:"var(--editor-active)"},".cm-activeLineGutter":{backgroundColor:"transparent"},".cm-selectionBackground, &.cm-focused .cm-selectionBackground":{backgroundColor:"var(--editor-selection)"}}),r=new Lm;function i(E){return E==="dark"?yd:Dm(Pm)}const s=e,a=n,l=J(null);let c=null;const u=J(0);function d(E){if(!c)return;const{from:j,to:R}=c.state.selection.main,V=(j>0&&c.state.doc.sliceString(Math.max(0,j-1),j)!==`
`?`
`:"")+E+(E.endsWith(`
`)?"":`
`);c.dispatch({changes:{from:j,to:R,insert:V},selection:{anchor:j+V.length}}),c.focus()}function f(){if(!c)return"";const{from:E,to:j}=c.state.selection.main;return E===j?"":c.state.doc.sliceString(E,j)}function h(){return c?.scrollDOM??null}function g(E){const j=h();if(!j)return;const R=j.scrollHeight-j.clientHeight;R<=0||(j.scrollTop=Math.max(0,Math.min(R,E*R)))}function m(){c?.focus()}function w(E){if(!c||!Number.isFinite(E))return;const j=c.state.doc.line(Math.max(1,Math.min(c.state.doc.lines,Math.trunc(E))));c.dispatch({selection:{anchor:j.from,head:j.to},effects:Rt.scrollIntoView(j.from,{y:"center"})}),c.focus()}function k(E){c&&Mb(c,E)}t({insertAtCursor:d,getSelectedText:f,getScroller:h,scrollToRatio:g,focus:m,goToLine:w,highlightZhFix:k});function x(E,j){const{from:R,to:B}=E.state.selection.main;E.dispatch({changes:{from:R,to:B,insert:j},selection:{anchor:R+j.length}})}function L(E){if(!E)return[];const j=[],R=new Set;for(const B of Array.from(E.files??[]))Fr(B)&&!R.has(B)&&(j.push(B),R.add(B));for(const B of Array.from(E.items??[])){if(B.kind!=="file")continue;const V=B.getAsFile();V&&Fr(V)&&!R.has(V)&&(j.push(V),R.add(V))}return j}function $(E,j){const R=E.clipboardData,B=L(R);if(B.length>0)return E.preventDefault(),D(j,B),!0;if(!ry(R))return!1;const V=R.getData("text/html"),z=oy(V);return z?(E.preventDefault(),x(j,z),!0):!1}function N(E,j){const R=L(E.dataTransfer);return R.length===0?!1:(E.preventDefault(),D(j,R),!0)}function D(E,j){const R=`<!-- 图片处理中 ${crypto.randomUUID()} -->`,B=s.documentId,V=s.imageDirectory;x(E,R),u.value++,a("imageBusy",!0),w1(j,V?{name:"article-folder",upload:fe=>P1(V,fe)}:void 0).then(fe=>{if(!(B!==s.documentId||E!==c))try{const Ne=E.state.doc.toString().indexOf(R);if(Ne<0)return;E.dispatch({changes:{from:Ne,to:Ne+R.length,insert:fe}})}catch{}}).finally(()=>{u.value--,a("imageBusy",u.value>0)})}function _(E){const j=E.target,R=Array.from(j.files??[]).filter(Fr);c&&R.length&&D(c,R),j.value=""}function v(){if(!c||window.innerWidth>uy)return;const E=window.visualViewport;if(!E||window.innerHeight-E.height<dy)return;const{head:R}=c.state.selection.main;c.dispatch({effects:Rt.scrollIntoView(R,{y:"center"})})}let S=0;function I(E){const j=E.target;if(!j)return;const R=j.scrollHeight-j.clientHeight;if(R<=0)return;const B=Date.now();B-S<16||(S=B,a("scroll",j.scrollTop/R))}function C(E){if(!l.value)return;const j=ud.create({doc:E,extensions:[dd(),Rm(),Ob,Mm(),fd(),pd.of([...hd,...md,...Om,gd]),bd(),o,r.of(i(rr.value)),mb(),bb(),$b,...Rb,Rt.lineWrapping,Rt.updateListener.of(R=>{R.docChanged&&a("update:modelValue",R.state.doc.toString())}),Rt.domEventHandlers({scroll:I,paste:(R,B)=>$(R,B),drop:(R,B)=>N(R,B)})]});c=new Rt({state:j,parent:l.value}),F()}function F(){if(!c)return;const E=Ra(c.state.doc);!E||E.to===c.state.doc.length||c.dispatch({effects:Nm.of(E),selection:{anchor:E.to+1}})}return zt(()=>{C(s.modelValue),window.visualViewport?.addEventListener("resize",v)}),Pe(()=>s.modelValue,E=>{if(!c)return;const j=c.state.doc.toString();E!==j&&c.dispatch({changes:{from:0,to:j.length,insert:E}})}),Pe(()=>s.documentId,F,{flush:"post"}),Pe(rr,E=>{c&&c.dispatch({effects:r.reconfigure(i(E))})}),yt(()=>{window.visualViewport?.removeEventListener("resize",v),c?.destroy(),c=null}),(E,j)=>(O(),P("div",ay,[p("div",ly,[j[1]||(j[1]=p("span",{class:"editor-label"},[p("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[p("path",{d:"m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 22"})]),We("Markdown")],-1)),p("label",{class:$e(["image-upload",{busy:u.value>0}])},[j[0]||(j[0]=p("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[p("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),p("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),p("path",{d:"m21 15-5-5L5 21"})],-1)),We(U(u.value?"图片处理中…":"插入图片"),1),p("input",{type:"file",accept:".png,.apng,.jpg,.jpeg,.jpe,.jfif,.pjpeg,.pjp,.webp,.gif,.avif,.avifs,.jxl,.bmp,.dib,.svg,.svgz,.ico,.cur,.heic,.heif,.heics,.heifs,.hif,.tif,.tiff,.pict,.pic,.pct,.cod,.ief,.ras,.cmx,.pnm,.pbm,.pgm,.ppm,.rgb,.xbm,.xpm,.xwd",multiple:"",disabled:u.value>0,"aria-label":"插入图片",onChange:_},null,40,cy)],2)]),p("div",{class:"editor-host",ref_key:"host",ref:l},null,512)]))}}),Ge=(e,t)=>{const n=e.__vccOpts||e;for(const[o,r]of t)n[o]=r;return n},py=Ge(fy,[["__scopeId","data-v-4416321b"]]),hy={class:"preview-shell"},my={class:"preview-canvas"},gy=["aria-expanded"],by={class:"tx-label"},yy={class:"tx-chev"},vy={key:0,class:"transparency-list"},wy={class:"tx-entry-label"},Sy={class:"tx-entry-count"},ky=`<!doctype html>
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
    flex: 0 0 375px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
    transform-origin: top center;
  }
  /* 当 iframe 宿主窄于 375 时，等比缩放，避免横向滚动 */
  @media (max-width: 374px) {
    body { align-items: flex-start; justify-content: flex-start; }
  }
</style>
</head>
<body>
<div class="phone-viewport"></div>
</body>
</html>`,xy=Ke({__name:"Preview",props:{html:{},patchLog:{}},emits:["scroll","ready"],setup(e,{expose:t,emit:n}){const o=e,r=J(!1),i=n,s=J(null);let a=!1,l=null;function c(){const k=s.value?.contentDocument,x=k?.querySelector(".phone-viewport"),L=k?.documentElement.clientWidth??0;x&&L>0&&(x.style.zoom=String(Math.min(1,L/375)))}Pe(s,k=>{l?.disconnect(),!(!k||typeof ResizeObserver>"u")&&(l=new ResizeObserver(c),l.observe(k))}),yt(()=>l?.disconnect());function u(){return s.value}function d(){return s.value?.contentDocument?.scrollingElement??s.value?.contentDocument?.documentElement??null}function f(k){const x=d();if(!x)return;const L=x.scrollHeight-x.clientHeight;L<=0||(x.scrollTop=Math.max(0,Math.min(L,k*L)))}t({getIframe:u,getScroller:d,scrollToRatio:f});function h(){const k=s.value?.contentDocument;if(!k)return!1;const x=k.querySelector(".phone-viewport");return x?(x.innerHTML=o.html,c(),!0):!1}let g=0;function m(){const k=d();if(!k)return;const x=k.scrollHeight-k.clientHeight;if(x<=0)return;const L=Date.now();L-g<16||(g=L,i("scroll",k.scrollTop/x))}function w(){const k=s.value?.contentDocument;k&&(a=!0,k.addEventListener("scroll",m,{passive:!0}),h(),i("ready"))}return Pe(()=>o.html,()=>{a&&h()}),(k,x)=>(O(),P("div",hy,[x[4]||(x[4]=p("div",{class:"preview-meta"},[p("span",{class:"preview-label"},"公众号预览"),p("span",{class:"viewport-badge mono",title:"与公众号正文一致的 375px 视口"},"375 px"),p("span",{class:"preview-fidelity",title:"预览与复制使用同一份 HTML"},"所见即所得")],-1)),p("div",my,[p("iframe",{ref_key:"iframeEl",ref:s,class:"preview-frame wechat-typeset-preview",srcdoc:ky,sandbox:"allow-same-origin",title:"wechat-typeset 预览",onLoad:w},null,544)]),o.patchLog&&o.patchLog.total>0?(O(),P("div",{key:0,class:$e(["transparency-strip",{expanded:r.value}])},[p("button",{class:"transparency-toggle","aria-expanded":r.value,onClick:x[0]||(x[0]=L=>r.value=!r.value)},[x[3]||(x[3]=p("span",{class:"tx-dot"},null,-1)),p("span",by,[x[1]||(x[1]=We(" 渲染透明度 · 本次对 HTML 做了 ",-1)),p("b",null,U(o.patchLog.total),1),x[2]||(x[2]=We(" 处微信适配 ",-1))]),p("span",yy,U(r.value?"▾":"▸"),1)],8,gy),r.value?(O(),P("ul",vy,[(O(!0),P(ue,null,Le(o.patchLog.entries,(L,$)=>(O(),P("li",{key:$},[p("span",wy,U(L.label),1),p("span",Sy,"× "+U(L.count),1)]))),128))])):ae("",!0)],2)):ae("",!0)]))}}),_y=Ge(xy,[["__scopeId","data-v-cec13e73"]]),Cy={class:"popover popover-menu"},$y={class:"menu-kbd"},Ey={class:"menu-kbd"},Ty=Ke({__name:"OverflowMenu",props:{drawer:{},modKey:{}},emits:["toggle","action","close"],setup(e,{emit:t}){const n=t;function o(i){n("toggle",i),n("close")}function r(i){n("action",i),n("close")}return(i,s)=>(O(),P("div",Cy,[s[30]||(s[30]=p("div",{class:"menu-section-head"},"视图",-1)),p("button",{class:"menu-item",onClick:s[0]||(s[0]=a=>o("drafts"))},[p("span",null,U(e.drawer.drafts?"关闭草稿列表":"草稿列表"),1)]),p("button",{class:"menu-item",onClick:s[1]||(s[1]=a=>o("components"))},[p("span",null,U(e.drawer.components?"关闭组件库":"插入组件"),1)]),p("button",{class:"menu-item",onClick:s[2]||(s[2]=a=>o("customizer"))},[p("span",null,U(e.drawer.customizer?"关闭自定义配色":"自定义配色"),1)]),p("button",{class:"menu-item",onClick:s[3]||(s[3]=a=>o("checklist"))},[p("span",null,U(e.drawer.checklist?"关闭发文清单":"发文清单"),1)]),p("button",{class:"menu-item",onClick:s[4]||(s[4]=a=>r("openHelp"))},[...s[17]||(s[17]=[p("span",null,"快捷键与帮助",-1),p("span",{class:"menu-kbd"},"?",-1)])]),s[31]||(s[31]=p("div",{class:"menu-sep"},null,-1)),s[32]||(s[32]=p("div",{class:"menu-section-head"},"内容操作",-1)),p("button",{class:"menu-item",onClick:s[5]||(s[5]=a=>r("loadSample"))},[...s[18]||(s[18]=[p("span",null,"载入当前主题示例",-1)])]),p("button",{class:"menu-item",onClick:s[6]||(s[6]=a=>r("loadReference"))},[...s[19]||(s[19]=[p("span",null,"载入当前主题组件参考",-1)])]),p("button",{class:"menu-item",onClick:s[7]||(s[7]=a=>r("loadShowcase"))},[...s[20]||(s[20]=[p("span",null,"载入全功能展示",-1)])]),p("button",{class:"menu-item",onClick:s[8]||(s[8]=a=>r("saveSelection"))},[...s[21]||(s[21]=[p("span",null,"保存选区为组件",-1)])]),p("button",{class:"menu-item",onClick:s[9]||(s[9]=a=>r("fixZhTypo"))},[...s[22]||(s[22]=[p("span",null,"一键修复中文排版",-1)])]),s[33]||(s[33]=p("div",{class:"menu-sep"},null,-1)),s[34]||(s[34]=p("div",{class:"menu-section-head"},"导出",-1)),p("button",{class:"menu-item",onClick:s[10]||(s[10]=a=>r("exportHtml"))},[s[23]||(s[23]=p("span",null,"导出 HTML",-1)),p("span",$y,U(e.modKey)+"⇧H",1)]),p("button",{class:"menu-item",onClick:s[11]||(s[11]=a=>r("exportMd"))},[s[24]||(s[24]=p("span",null,"导出 Markdown",-1)),p("span",Ey,U(e.modKey)+"⇧M",1)]),p("button",{class:"menu-item",onClick:s[12]||(s[12]=a=>r("exportImage"))},[...s[25]||(s[25]=[p("span",null,"导出全文长图",-1)])]),p("button",{class:"menu-item",onClick:s[13]||(s[13]=a=>r("exportCoverHorizontal"))},[...s[26]||(s[26]=[p("span",null,"导出封面 · 横版 900×383",-1)])]),p("button",{class:"menu-item",onClick:s[14]||(s[14]=a=>r("exportCoverSquare"))},[...s[27]||(s[27]=[p("span",null,"导出封面 · 方版 900×900",-1)])]),p("button",{class:"menu-item",onClick:s[15]||(s[15]=a=>r("copyShareLink"))},[...s[28]||(s[28]=[p("span",null,"复制分享链接",-1)])]),s[35]||(s[35]=p("div",{class:"menu-sep"},null,-1)),p("button",{class:"menu-item danger",onClick:s[16]||(s[16]=a=>r("clear"))},[...s[29]||(s[29]=[p("span",null,"清空正文",-1)])])]))}}),Ay=Ge(Ty,[["__scopeId","data-v-52b02f6f"]]),Jf=["keep","tail-list","drop"],Us={keep:"保留","tail-list":"尾注",drop:"丢弃"},Iy={keep:"正文保留蓝色超链，公众号读者不可点","tail-list":"正文加 [N]，文末追加参考链接",drop:"剥掉 <a>，只留文字"},Ry=/^https?:\/\//i;function My(e,t){if(t==="keep"||!e)return{html:e,count:0};if(typeof DOMParser>"u")return{html:e,count:0};const n=new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,"text/html"),o=n.body,r=o.querySelector("ol[data-wx-outlink-list]"),s=Array.from(o.querySelectorAll("a")).map(l=>({el:l,href:l.getAttribute("href")??""})).filter(({el:l,href:c})=>Ry.test(c)&&!l.hasAttribute("data-wx-footer-cta"));if(s.length===0)return{html:e,count:0};if(t==="drop"){for(const{el:l}of s){const c=l.parentNode;if(c){for(;l.firstChild;)c.insertBefore(l.firstChild,l);c.removeChild(l)}}return{html:o.innerHTML,count:s.length}}const a=n.createElement("ol");if(a.setAttribute("data-wx-outlink-list",""),s.forEach(({el:l,href:c},u)=>{const d=u+1,f=n.createElement("sup");f.setAttribute("data-wx-outlink-ref",String(d)),f.textContent=`[${d}]`;const h=l.parentNode;if(!h)return;for(;l.firstChild;)h.insertBefore(l.firstChild,l);h.insertBefore(f,l),h.removeChild(l);const g=n.createElement("li");g.textContent=c,a.appendChild(g)}),r)for(;a.firstChild;)r.appendChild(a.firstChild);else{const l=n.createElement("p");l.setAttribute("data-wx-outlink-heading",""),l.textContent="参考链接",o.appendChild(l),o.appendChild(a)}return{html:o.innerHTML,count:s.length}}const su=["theme","overflow","outlink","draft"];function Oy(){const e={theme:J(!1),overflow:J(!1),outlink:J(!1),draft:J(!1)};function t(i){for(const s of su)e[s].value=s===i?!e[s].value:!1}function n(){for(const i of su)e[i].value=!1}function o(i){const s=i.target;s&&(s.closest("[data-popover-root]")||n())}function r(i){i.key==="Escape"&&n()}return Pe([e.theme,e.overflow,e.outlink,e.draft],([i,s,a,l])=>{i||s||a||l?(window.addEventListener("mousedown",o),window.addEventListener("keydown",r)):(window.removeEventListener("mousedown",o),window.removeEventListener("keydown",r))}),yt(()=>{window.removeEventListener("mousedown",o),window.removeEventListener("keydown",r)}),{theme:e.theme,overflow:e.overflow,outlink:e.outlink,draft:e.draft,toggleTheme:()=>t("theme"),toggleOverflow:()=>t("overflow"),toggleOutlink:()=>t("outlink"),toggleDraft:()=>t("draft"),closeAll:n}}function Ly(){if(typeof navigator>"u")return!1;const e=navigator.userAgentData;return e&&typeof e.platform=="string"?/mac/i.test(e.platform):/Mac|iPhone|iPad|iPod/.test(navigator.platform)}const Ny=Ly(),Ko=Ny?"⌘":"Ctrl",Dy={class:"toolbar-leading"},Py=["aria-expanded"],By={class:"workflow","aria-label":"创作流程"},Fy=["aria-current","onClick"],jy=["innerHTML"],Hy={class:"toolbar-actions"},Vy=["title"],Uy=["title"],zy={class:"copy-control","data-popover-root":""},Wy=["title"],Ky=["title","aria-label","aria-expanded"],qy={key:0,class:"outlink-menu",role:"menu","aria-label":"外链处理策略"},Gy=["aria-checked","onClick"],Yy={class:"utilities","data-popover-root":""},Jy=["aria-expanded"],Zy={key:0,class:"utility-menu","aria-label":"更多操作"},Qy={key:0,class:"toolbar-banners","aria-label":"保存与复制提示"},Xy={key:0,class:"error-banner",role:"alert"},ev={key:1,class:"error-banner",role:"alert"},tv=Ke({__name:"Toolbar",props:{stage:{default:"typeset"},collapsed:{type:Boolean},draftTitle:{},activeDraftId:{},draftIndexTick:{},wordCount:{},readingTime:{},savingState:{},savingLabel:{},error:{},themeId:{},hasCustomColor:{type:Boolean},drawer:{},outlinkStrategy:{},uiTheme:{}},emits:["update:stage","save","update:themeId","update:outlinkStrategy","update:uiTheme","toggle","action","hoverTheme","selectDraft","newDraft"],setup(e,{expose:t,emit:n}){const o=e,r=n,i=Oy(),s=[{id:"write",label:"写作",icon:'<path d="m14 5 5 5M3 21l4.5-1 12-12a2.12 2.12 0 0 0-3-3l-12 12L3 21Z"/>'},{id:"typeset",label:"排版",icon:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h8M8 11h8M8 15h5"/>'},{id:"publish",label:"发布准备",icon:'<path d="M12 3v14m0 0 5-5m-5 5-5-5M4 17v4h16v-4"/>'}],a=te(()=>o.savingLabel.trim());function l(d){i.closeAll(),r("update:stage",d)}function c(d){r("update:outlinkStrategy",d),i.outlink.value=!1}function u(){i.closeAll(),r("action","openCommand")}return t({openOverflow:()=>{i.closeAll(),i.overflow.value=!0}}),(d,f)=>(O(),P("header",{class:$e(["toolbar",{"is-collapsed":e.collapsed}]),"aria-label":"文章工作区"},[p("div",Dy,[p("button",{class:"library-trigger icon-button",type:"button","aria-label":"打开文章库","aria-expanded":e.drawer.drafts,onClick:f[0]||(f[0]=h=>r("toggle","drafts"))},[...f[11]||(f[11]=[p("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"M3 6h6l2 2h10v12H3V6Z"})],-1)])],8,Py)]),p("nav",By,[(O(),P(ue,null,Le(s,h=>p("button",{key:h.id,type:"button",class:$e(["workflow-step",{active:e.stage===h.id}]),"aria-current":e.stage===h.id?"page":void 0,onClick:g=>l(h.id)},[(O(),P("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",innerHTML:h.icon},null,8,jy)),p("span",null,U(h.label),1)],10,Fy)),64))]),p("div",Hy,[a.value?(O(),P("span",{key:0,class:$e(["saving",e.savingState]),title:a.value,role:"status","aria-live":"polite"},[f[12]||(f[12]=p("span",{class:"saving-dot","aria-hidden":"true"},null,-1)),p("span",null,U(a.value),1)],10,Vy)):ae("",!0),p("button",{class:"save-button",type:"button",title:`保存文章 ${A(Ko)}+S`,onClick:f[1]||(f[1]=h=>r("save"))},"保存",8,Uy),p("div",zy,[p("button",{class:"copy-button",type:"button",title:`复制到公众号 ${A(Ko)}+Enter`,onClick:f[2]||(f[2]=h=>r("action","copy"))},[...f[13]||(f[13]=[p("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("rect",{x:"8",y:"8",width:"12",height:"13",rx:"1"}),p("path",{d:"M16 8V3H4v13h4"})],-1),p("span",null,"复制到公众号",-1)])],8,Wy),p("button",{class:$e(["copy-options",{active:A(i).outlink.value}]),type:"button",title:`外链处理：${A(Us)[e.outlinkStrategy]}`,"aria-label":`外链处理：${A(Us)[e.outlinkStrategy]}`,"aria-haspopup":"menu","aria-expanded":A(i).outlink.value,onClick:f[3]||(f[3]=h=>A(i).toggleOutlink())},[...f[14]||(f[14]=[p("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"m6 9 6 6 6-6"})],-1)])],10,Ky),A(i).outlink.value?(O(),P("div",qy,[f[15]||(f[15]=p("p",{class:"menu-title"},"外链处理",-1)),(O(!0),P(ue,null,Le(A(Jf),h=>(O(),P("button",{key:h,type:"button",class:$e(["outlink-option",{selected:h===e.outlinkStrategy}]),role:"menuitemradio","aria-checked":h===e.outlinkStrategy,onClick:g=>c(h)},[p("strong",null,U(A(Us)[h]),1),p("span",null,U(A(Iy)[h]),1)],10,Gy))),128))])):ae("",!0)]),p("div",Yy,[p("button",{class:"icon-button more-button",type:"button",title:"更多操作","aria-label":"更多操作","aria-haspopup":"true","aria-expanded":A(i).overflow.value,onClick:f[4]||(f[4]=h=>A(i).toggleOverflow())},[...f[16]||(f[16]=[p("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","aria-hidden":"true"},[p("circle",{cx:"5",cy:"12",r:"1"}),p("circle",{cx:"12",cy:"12",r:"1"}),p("circle",{cx:"19",cy:"12",r:"1"})],-1)])],8,Jy),A(i).overflow.value?(O(),P("div",Zy,[p("div",null,[p("button",{class:"outlink-option",type:"button",onClick:u},[p("strong",null,[f[17]||(f[17]=We("命令面板 ",-1)),p("kbd",null,U(A(Ko))+" K",1)])]),p("button",{class:"outlink-option",type:"button",onClick:f[5]||(f[5]=h=>r("update:uiTheme",e.uiTheme==="dark"?"light":"dark"))},[p("strong",null,U(e.uiTheme==="dark"?"使用亮色界面":"使用暗色界面"),1)])]),Me(Ay,{drawer:e.drawer,"mod-key":A(Ko),onToggle:f[6]||(f[6]=h=>r("toggle",h)),onAction:f[7]||(f[7]=h=>r("action",h)),onClose:f[8]||(f[8]=h=>A(i).overflow.value=!1)},null,8,["drawer","mod-key"])])):ae("",!0)])]),e.error||e.savingState==="error"?(O(),P("div",Qy,[e.error?(O(),P("div",Xy,[p("span",null,U(e.error),1),p("button",{type:"button",onClick:f[9]||(f[9]=h=>r("action","dismissError"))},"知道了")])):ae("",!0),e.savingState==="error"?(O(),P("div",ev,[p("span",null,U(a.value||"保存失败，请保留当前页面并重试。"),1),p("button",{type:"button",onClick:f[10]||(f[10]=h=>r("save"))},"重新保存")])):ae("",!0)])):ae("",!0)],2))}}),nv=Ge(tv,[["__scopeId","data-v-bebea73d"]]),ov=["aria-valuenow","aria-valuemin","aria-valuemax"],rv=Ke({__name:"PaneSplitter",props:{width:{},min:{},max:{}},emits:["update:width"],setup(e,{emit:t}){const n=e,o=t,r=J(!1),i=te(()=>n.min??320);function s($){return n.max!==void 0&&$>n.max?n.max:$<i.value?i.value:$}function a($){if(n.width!==null)return n.width;const N=$.previousElementSibling?.getBoundingClientRect().width??0;return N>0?N:i.value}let l=0,c=0;function u($){$.button===0&&($.preventDefault(),r.value=!0,l=$.clientX,c=a($.currentTarget),document.body.classList.add("splitter-dragging"),window.addEventListener("mousemove",d),window.addEventListener("mouseup",f,{once:!0}))}function d($){if(!r.value)return;const N=$.clientX-l;o("update:width",s(c+N))}function f(){r.value=!1,document.body.classList.remove("splitter-dragging"),window.removeEventListener("mousemove",d)}let h=0,g=0;function m($){$.touches.length===1&&(r.value=!0,h=$.touches[0].clientX,g=a($.currentTarget))}function w($){if(!r.value||$.touches.length!==1)return;const N=$.touches[0].clientX-h;o("update:width",s(g+N))}function k(){r.value=!1}function x(){o("update:width",null)}function L($){let N=0;if($.key==="ArrowLeft")N=-24;else if($.key==="ArrowRight")N=24;else if($.key==="PageDown")N=-96;else if($.key==="PageUp")N=96;else if($.key==="Home"){o("update:width",i.value),$.preventDefault();return}else if($.key==="End"){n.max!==void 0&&o("update:width",n.max),$.preventDefault();return}else if($.key==="Enter"||$.key===" "){o("update:width",null),$.preventDefault();return}else return;$.preventDefault();const D=a($.currentTarget);o("update:width",s(D+N))}return yt(()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",f),document.body.classList.remove("splitter-dragging")}),($,N)=>(O(),P("div",{class:$e(["splitter",{dragging:r.value}]),role:"separator","aria-orientation":"vertical","aria-label":"拖动调整编辑栏宽度（双击恢复默认）","aria-valuenow":n.width??void 0,"aria-valuemin":i.value,"aria-valuemax":n.max,tabindex:"0",onMousedown:u,onTouchstart:m,onTouchmove:w,onTouchend:k,onTouchcancel:k,onDblclick:x,onKeydown:L},[...N[0]||(N[0]=[p("span",{class:"splitter-handle","aria-hidden":"true"},null,-1)])],42,ov))}}),iv=Ge(rv,[["__scopeId","data-v-df237fde"]]),Zf="wechat-typeset:drafts:index",Oa="wechat-typeset:drafts:active",No="wechat-typeset:drafts:body:",sv="wechat-typeset:drafts:",av=()=>yl("d");function co(){const e=us(Zf,[]);return Array.isArray(e)?e:[]}function Gr(e){return ds(Zf,e)}function vl(e){const{publication:t,body:n}=Oo(e),o=t.title?.trim();if(o)return o;const r=n.split(`
`).map(s=>s.trim()).find(s=>s.length>0);return r?r.replace(/^#+\s*/,"").slice(0,24):""}function Eo(){return[...co()].sort((t,n)=>n.updatedAt-t.updatedAt)}function Qf(){return dn(Oa)}function To(e){e?Yt(Oa,e):cs(Oa)}function zo(e){const t=co().find(o=>o.id===e);if(!t)return null;const n=dn(`${No}${e}`)??"";return{...t,body:n}}function ni(e){const t=av(),n=Date.now(),o=e?.body??"",r=e?.tags?.filter(a=>a.trim().length>0),i={id:t,title:e?.title||vl(o)||"未命名草稿",themeId:e?.themeId??"default",updatedAt:n,createdAt:n,...r&&r.length?{tags:r}:{}},s=co();return s.unshift(i),Gr(s),Yt(`${No}${t}`,o),To(t),{...i,body:o}}function wl(e,t){const n=co(),o=n.findIndex(l=>l.id===e);if(o===-1)return!1;const r=Date.now(),i=n[o],s={...i,title:t.title??i.title,themeId:t.themeId??i.themeId,tags:t.tags??i.tags,updatedAt:r};n[o]=s;let a=Gr(n);if(typeof t.body=="string"&&(a=Yt(`${No}${e}`,t.body)&&a,!t.title)){const l=vl(t.body);l&&(n[o]={...s,title:l},a=Gr(n)&&a)}return a}function lv(e={}){const t=e.query?.trim()??"",n=t?t.split(/\s+/):[],o=n.filter(l=>l.startsWith("#")).map(l=>l.slice(1).toLowerCase()).filter(Boolean),r=n.filter(l=>!l.startsWith("#")).map(l=>l.toLowerCase()).filter(Boolean),i=(e.tags??[]).map(l=>l.toLowerCase()).filter(Boolean),s=Array.from(new Set([...o,...i]));return Eo().filter(l=>{if(s.length>0){const d=(l.tags??[]).map(f=>f.toLowerCase());if(!s.every(f=>d.includes(f)))return!1}if(r.length===0)return!0;const c=dn(`${No}${l.id}`)??"",u=`${l.title}
${c}
${(l.tags??[]).join(" ")}`.toLowerCase();return r.every(d=>u.includes(d))})}function cv(){const e=new Set;for(const t of co())for(const n of t.tags??[]){const o=n.trim();o&&e.add(o)}return Array.from(e).sort((t,n)=>t.localeCompare(n))}function Xf(e){const t=co().filter(n=>n.id!==e);Gr(t),cs(`${No}${e}`),Qf()===e&&To(t[0]?.id??null)}function uv(){const t=co().map(n=>({...n,body:dn(`${No}${n.id}`)??""}));return JSON.stringify({version:1,drafts:t},null,2)}function ep(e){const t={added:0,skipped:0,invalid:0};let n;try{n=JSON.parse(e)}catch{return t}const o=au(n)&&Array.isArray(n.drafts)?n.drafts:[],r=co();for(const i of o){if(!au(i)){t.invalid+=1;continue}const s=typeof i.id=="string"&&i.id.length>0?i.id:null;if(!s){t.invalid+=1;continue}if(r.some(h=>h.id===s)){t.skipped+=1;continue}const a=typeof i.body=="string"?i.body:"",l=typeof i.title=="string"&&i.title?i.title:vl(a)||"未命名草稿",c=typeof i.themeId=="string"&&i.themeId?i.themeId:"default",u=typeof i.updatedAt=="number"?i.updatedAt:Date.now(),d=typeof i.createdAt=="number"?i.createdAt:Date.now(),f=Array.isArray(i.tags)?i.tags.filter(h=>typeof h=="string"&&h.trim().length>0):void 0;r.push({id:s,title:l,themeId:c,updatedAt:u,createdAt:d,...f&&f.length?{tags:f}:{}}),Yt(`${No}${s}`,a),t.added+=1}return Gr(r),t}function au(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const tp=.8,lu=5*1024*1024;async function dv(){try{if(navigator.storage&&typeof navigator.storage.estimate=="function"){const{usage:e=0,quota:t=0}=await navigator.storage.estimate();if(t>0){const n=e/t;return{supported:!0,used:e,quota:t,pct:n,warn:n>=tp}}}}catch{}return pv()}function fv(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(1)} MB`:`${(e/(1024*1024*1024)).toFixed(1)} GB`}function pv(){let e=0;try{for(let n=0;n<localStorage.length;n++){const o=localStorage.key(n);if(!o||!o.startsWith("wechat-typeset:"))continue;const r=localStorage.getItem(o)??"";e+=(o.length+r.length)*2}}catch{e=0}const t=e/lu;return{supported:!1,used:e,quota:lu,pct:t,warn:t>=tp}}function hv(){const e=J(0),t=J({supported:!1,used:0,quota:5*1024*1024,pct:0,warn:!1});function n(){e.value+=1,o()}async function o(){t.value=await dv()}return zt(()=>{o()}),{drafts:te(()=>(e.value,Eo())),knownTags:te(()=>(e.value,cv())),storageStat:t,storagePct:te(()=>Math.min(100,Math.round(t.value.pct*100))),search(r){return e.value,lv(r)},read:zo,create(r){const i=ni(r);return n(),i},update(r,i){wl(r,i),n()},remove(r){Xf(r),n()},exportJSON:uv,importJSON(r){const i=ep(r);return n(),i},refresh:n,formatBytes:fv}}const kt="markdown-body",mv=375;function Sl(e,t){const n=URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(n)}function oi(e,t,n){Sl(e,new Blob([t],{type:n}))}function gv(e,t,n={}){const o=dt(wv(e)),r=n.background??"#ffffff",i=n.color??"#222222",s=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=${mv},initial-scale=1"><title>${o}</title><style>body{margin:0;padding:24px 0;background:${r};color:${i};font-family:"PingFang SC","Microsoft YaHei",sans-serif;}.wechat-typeset-wrap{max-width:640px;margin:0 auto;padding:0 16px;}</style></head><body><div class="wechat-typeset-wrap">${t}</div></body></html>`;oi(e,s,"text/html")}function bv(e,t){oi(e,t,"text/markdown")}async function yv(e,t,n={}){try{const r=(await An(()=>import("./html2canvas.esm-B0tyYwQk.js"),[])).default,i=vv(e,n.background),s=await r(e,{backgroundColor:i,useCORS:!0,scale:2,logging:!1});return await new Promise(a=>{s.toBlob(l=>{if(!l){a({ok:!1,error:"toBlob 返回 null"});return}Sl(t,l),a({ok:!0})},"image/png")})}catch(o){return{ok:!1,error:o?.message??"长图导出失败"}}}function vv(e,t){if(t)return t;if(t===null)return null;try{const n=e.ownerDocument,o=n?.defaultView;if(!o)return"#ffffff";const i=o.getComputedStyle(e).backgroundColor;if(i&&i!=="rgba(0, 0, 0, 0)"&&i!=="transparent")return i;const s=n.body?o.getComputedStyle(n.body).backgroundColor:"";return s&&s!=="rgba(0, 0, 0, 0)"&&s!=="transparent"?s:"#ffffff"}catch{return"#ffffff"}}function wv(e){const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}const Sv={class:"sidebar-brand"},kv={class:"library-heading"},xv=["title"],_v={class:"folder-menu-content"},Cv=["disabled"],$v=["disabled"],Ev={class:"library-tools"},Tv={class:"search-field"},Av=["disabled"],Iv=["disabled"],Rv=["disabled"],Mv=["aria-busy"],Ov=["aria-current","disabled","title","onClick"],Lv={class:"article-copy"},Nv={class:"article-title"},Dv={class:"article-date"},Pv={key:0,class:"empty-message"},Bv={key:1,class:"library-empty-state"},Fv=["disabled"],jv={key:2,class:"library-error",role:"alert"},Hv=["aria-expanded"],Vv={class:"draft-count"},Uv={id:"browser-drafts-panel",class:"browser-panel"},zv={class:"library-tools"},Wv={class:"search-field browser-search"},Kv=["disabled"],qv={key:0,class:"tag-filters","aria-label":"按标签筛选草稿"},Gv=["aria-pressed","onClick"],Yv={class:"browser-list"},Jv={class:"browser-item-main"},Zv=["onKeydown"],Qv=["disabled","aria-current","title","onClick","onDblclick"],Xv={class:"article-title"},ew={class:"article-date"},tw=["aria-label"],nw={class:"row-menu-content"},ow=["onClick"],rw=["onClick"],iw=["onClick"],sw={key:0,class:"tag-editor"},aw={class:"tag-filters"},lw=["aria-label","onClick"],cw=["onKeydown"],uw={class:"tag-editor-actions"},dw={key:1,class:"draft-tags"},fw=["onClick"],pw={key:0,class:"empty-message"},hw={class:"browser-management"},mw={class:"backup-actions"},gw={key:0,class:"import-feedback",role:"status"},bw={key:1,class:"storage-summary warning"},yw=Ke({__name:"DraftDrawer",props:{activeId:{},draftIndexTick:{},librarySupported:{type:Boolean},libraryName:{},libraryPermitted:{type:Boolean},articles:{},activeArticle:{},libraryBusy:{type:Boolean},libraryError:{}},emits:["select","close","requestDelete","refresh","connectLibrary","chooseLibrary","selectArticle","createArticle"],setup(e,{expose:t,emit:n}){const o=e,r=n,i=hv(),s=i.drafts,a=i.knownTags,l=i.storageStat,c=i.storagePct,u=i.formatBytes,d=te(()=>o.librarySupported&&o.libraryPermitted),f=J(!o.libraryPermitted),h=J(""),g=J(""),m=J(!1),w=J(null),k=J(null),x=te(()=>(o.articles??[]).filter(y=>y.title.toLocaleLowerCase().includes(h.value.trim().toLocaleLowerCase()))),L=J(""),$=J(null),N=J(""),D=J(null),_=J(null),v=J(null),S=J(null),I=J([]),C=J(""),F=J(null);Pe(()=>o.draftIndexTick,()=>i.refresh()),Pe(()=>o.libraryPermitted,y=>{f.value=!y}),Pe(()=>o.activeId,y=>{i.refresh(),y&&(f.value=!0)});const E=te(()=>{const y=L.value.trim(),b=v.value?[v.value]:void 0;return!y&&!b?i.drafts.value:i.search({query:y,tags:b})});function j(){i.refresh(),r("refresh")}function R(y){k.value&&(k.value.open=!1),r(y==="chooseLibrary"?"chooseLibrary":"connectLibrary")}function B(){m.value=!0,en(()=>w.value?.focus())}function V(){!g.value.trim()||o.libraryBusy||(r("createArticle",g.value.trim()),g.value="",m.value=!1)}function z(y,b){if(/^\d{4}-\d{2}-\d{2}/.test(y))return y.slice(0,10).replaceAll("-",".");const T=new Date(b);return`${T.getFullYear()}.${String(T.getMonth()+1).padStart(2,"0")}.${String(T.getDate()).padStart(2,"0")}`}function fe(){if(o.libraryBusy)return;const y=i.create({title:"新草稿",body:`# 新草稿
`});r("select",y.id)}function je(y){r("select",y)}function Ne(y){const b=y.currentTarget.closest("details");b&&(b.open=!1)}function Fe(y,b){Ne(b),$.value=y.id,N.value=y.title,en(()=>{D.value?.focus(),D.value?.select()})}function He(){$.value&&(i.update($.value,{title:N.value.trim()||"未命名草稿"}),$.value=null,r("refresh"))}function Te(y,b){Ne(b),r("requestDelete",y.id,y.title||"未命名草稿")}function Ye(y,b){Ne(b),S.value=y.id,I.value=[...y.tags??[]],C.value="",en(()=>F.value?.focus())}function Je(){for(const y of C.value.split(/[,，\s]+/g).filter(Boolean))I.value.includes(y)||I.value.push(y);C.value=""}function Pt(y){[",","，"," "].includes(y.key)&&(y.preventDefault(),Je()),y.key==="Backspace"&&!C.value&&(y.preventDefault(),I.value.pop())}function pt(){S.value&&(Je(),i.update(S.value,{tags:[...I.value]}),S.value=null,r("refresh"))}function mn(y){v.value=v.value===y?null:y}function wt(){oi(`wechat-typeset-drafts-${Date.now()}.json`,i.exportJSON(),"application/json")}function gn(y){const b=y.target,T=b.files?.[0];if(!T)return;const H=new FileReader;H.onload=()=>{const W=i.importJSON(String(H.result??""));_.value=`导入 ${W.added} 篇，跳过 ${W.skipped} 篇，无效 ${W.invalid} 篇`,b.value="",r("refresh")},H.onerror=()=>{_.value="文件读取失败，请重新选择。",b.value=""},H.readAsText(T)}return t({refresh:j}),(y,b)=>(O(),P("aside",{class:$e(["drawer",{"only-browser":!d.value}]),"aria-label":"文章库"},[p("div",Sv,[b[17]||(b[17]=p("svg",{class:"brand-mark",width:"25",height:"25",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.7","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"m14 5 5 5M3 21l4.5-1 12-12a2.12 2.12 0 0 0-3-3l-12 12L3 21Z"})],-1)),b[18]||(b[18]=p("div",null,[p("strong",null,"wechat-typeset"),p("span",null,"本地文章与排版工具")],-1)),p("button",{class:"sidebar-close",type:"button","aria-label":"关闭文章库",onClick:b[0]||(b[0]=T=>r("close"))},"关闭")]),e.librarySupported?(O(),P("section",{key:0,class:$e(["file-library",{connected:d.value}]),"aria-label":"文件夹文章库"},[p("div",kv,[b[20]||(b[20]=p("svg",{class:"heading-icon",width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"M3 6h6l2 2h10v12H3V6Z"})],-1)),p("h2",{title:e.libraryName},U(e.libraryName||"我的文章库"),9,xv),p("details",{ref_key:"folderMenu",ref:k,class:"folder-menu",onKeydown:b[3]||(b[3]=xn(It(T=>k.value&&(k.value.open=!1),["prevent","stop"]),["esc"]))},[b[19]||(b[19]=p("summary",{"aria-label":"文章库操作",title:"文章库操作"},[p("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.7","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"m6 9 6 6 6-6"})])],-1)),p("div",_v,[p("button",{type:"button",disabled:e.libraryBusy,onClick:b[1]||(b[1]=T=>R("connectLibrary"))},U(e.libraryPermitted?"刷新文章列表":e.libraryName?"恢复文件夹访问":"打开文件夹"),9,Cv),e.libraryName?(O(),P("button",{key:0,type:"button",disabled:e.libraryBusy,onClick:b[2]||(b[2]=T=>R("chooseLibrary"))},"更换文件夹",8,$v)):ae("",!0)])],544)]),d.value?(O(),P(ue,{key:0},[p("div",Ev,[p("label",Tv,[b[21]||(b[21]=p("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("circle",{cx:"10.8",cy:"10.8",r:"6.5"}),p("path",{d:"m16 16 5 5"})],-1)),ot(p("input",{"onUpdate:modelValue":b[4]||(b[4]=T=>h.value=T),type:"search",placeholder:"搜索文章","aria-label":"搜索文件夹文章"},null,512),[[Ut,h.value]])]),p("button",{class:"icon-button",type:"button","aria-label":"新建文章",title:"新建文章",disabled:e.libraryBusy||m.value,onClick:B},[...b[22]||(b[22]=[p("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","aria-hidden":"true"},[p("path",{d:"M12 5v14M5 12h14"})],-1)])],8,Av)]),m.value?(O(),P("form",{key:0,class:"new-article-form",onSubmit:It(V,["prevent"])},[ot(p("input",{ref_key:"articleTitleInput",ref:w,"onUpdate:modelValue":b[5]||(b[5]=T=>g.value=T),"aria-label":"新文章标题",placeholder:"写下文章标题",maxlength:"120",disabled:e.libraryBusy,onKeydown:b[6]||(b[6]=xn(It(T=>m.value=!1,["prevent"]),["esc"]))},null,40,Iv),[[Ut,g.value]]),p("button",{type:"submit",class:"create-confirm","aria-label":"创建文章",title:"创建文章",disabled:e.libraryBusy||!g.value.trim()},[...b[23]||(b[23]=[p("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"m20 6-11 11-5-5"})],-1)])],8,Rv),p("button",{type:"button",class:"create-cancel","aria-label":"取消新建",title:"取消",onClick:b[7]||(b[7]=T=>m.value=!1)},[...b[24]||(b[24]=[p("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","stroke-linecap":"round","aria-hidden":"true"},[p("path",{d:"m18 6-12 12M6 6l12 12"})],-1)])])],32)):ae("",!0),p("ul",{class:"article-list","aria-busy":e.libraryBusy},[(O(!0),P(ue,null,Le(x.value,T=>(O(),P("li",{key:T.name},[p("button",{class:$e(["article-item",{active:T.name===e.activeArticle}]),type:"button","aria-current":T.name===e.activeArticle?"page":void 0,disabled:e.libraryBusy,title:T.title,onClick:H=>r("selectArticle",T)},[b[25]||(b[25]=p("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("rect",{x:"4",y:"3",width:"16",height:"18",rx:"1"}),p("path",{d:"M8 7h8M8 11h8M8 15h5"})],-1)),p("span",Lv,[p("span",Nv,U(T.title),1),p("span",Dv,U(z(T.date,T.lastModified)),1)])],10,Ov)]))),128)),x.value.length?ae("",!0):(O(),P("li",Pv,U(e.libraryBusy?"正在读取文章…":h.value?"没有匹配的文章":"还没有文章，开始写第一篇。"),1))],8,Mv)],64)):(O(),P("div",Bv,[p("p",null,U(e.libraryName?"恢复文件夹访问，接着写。":"从一个文件夹开始，文章与图片都在本机。"),1),p("button",{class:"connect-button",type:"button",disabled:e.libraryBusy,onClick:b[8]||(b[8]=T=>r("connectLibrary"))},[p("span",null,U(e.libraryBusy?"正在连接…":e.libraryName?"恢复访问":"打开文章文件夹"),1),b[26]||(b[26]=p("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"M5 12h14m-6-6 6 6-6 6"})],-1))],8,Fv)])),e.libraryError?(O(),P("p",jv,U(e.libraryError),1)):ae("",!0)],2)):ae("",!0),p("section",{class:$e(["browser-library",{expanded:f.value}]),"aria-label":"浏览器草稿"},[p("button",{class:"browser-heading",type:"button","aria-expanded":f.value,"aria-controls":"browser-drafts-panel",onClick:b[9]||(b[9]=T=>f.value=!f.value)},[b[28]||(b[28]=p("svg",{width:"19",height:"19",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("path",{d:"M3 6h6l2 2h10v12H3V6Z"})],-1)),b[29]||(b[29]=p("span",null,"浏览器草稿",-1)),p("span",Vv,U(A(s).length),1),(O(),P("svg",{class:$e(["section-chevron",{expanded:f.value}]),width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.7","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[...b[27]||(b[27]=[p("path",{d:"m6 9 6 6 6-6"},null,-1)])],2))],8,Hv),ot(p("div",Uv,[p("div",zv,[p("label",Wv,[b[30]||(b[30]=p("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","aria-hidden":"true"},[p("circle",{cx:"10.8",cy:"10.8",r:"6.5"}),p("path",{d:"m16 16 5 5"})],-1)),ot(p("input",{"onUpdate:modelValue":b[10]||(b[10]=T=>L.value=T),type:"search",placeholder:"搜索草稿 / #标签","aria-label":"搜索浏览器草稿"},null,512),[[Ut,L.value]])]),p("button",{class:"icon-button",type:"button","aria-label":"新建浏览器草稿",title:"新建浏览器草稿",disabled:e.libraryBusy,onClick:fe},[...b[31]||(b[31]=[p("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","aria-hidden":"true"},[p("path",{d:"M12 5v14M5 12h14"})],-1)])],8,Kv)]),A(a).length?(O(),P("div",qv,[(O(!0),P(ue,null,Le(A(a),T=>(O(),P("button",{key:T,type:"button",class:$e({selected:v.value===T}),"aria-pressed":v.value===T,onClick:H=>mn(T)},"#"+U(T),11,Gv))),128))])):ae("",!0),p("ul",Yv,[(O(!0),P(ue,null,Le(E.value,T=>(O(),P("li",{key:T.id,class:$e(["browser-item",{active:T.id===e.activeId}])},[p("div",Jv,[b[33]||(b[33]=p("svg",{class:"draft-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[p("rect",{x:"4",y:"3",width:"16",height:"18",rx:"1"}),p("path",{d:"M8 7h8M8 11h8M8 15h5"})],-1)),$.value===T.id?ot((O(),P("input",{key:0,ref_for:!0,ref:H=>D.value=H,"onUpdate:modelValue":b[11]||(b[11]=H=>N.value=H),class:"rename-input","aria-label":"草稿名称",maxlength:"48",onKeydown:[xn(It(He,["prevent"]),["enter"]),b[12]||(b[12]=xn(It(H=>$.value=null,["prevent","stop"]),["esc"]))],onBlur:He},null,40,Zv)),[[Ut,N.value]]):(O(),P("button",{key:1,class:"draft-select",type:"button",disabled:e.libraryBusy,"aria-current":T.id===e.activeId?"page":void 0,title:T.title||"未命名草稿",onClick:H=>je(T.id),onDblclick:H=>Fe(T,H)},[p("span",Xv,U(T.title||"未命名草稿"),1),p("span",ew,U(z("",T.updatedAt)),1)],40,Qv)),p("details",{class:"row-menu",onKeydown:b[13]||(b[13]=xn(It(H=>Ne(H),["prevent","stop"]),["esc"]))},[p("summary",{"aria-label":`管理草稿：${T.title}`,title:"管理草稿"},[...b[32]||(b[32]=[p("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","aria-hidden":"true"},[p("circle",{cx:"5",cy:"12",r:"1"}),p("circle",{cx:"12",cy:"12",r:"1"}),p("circle",{cx:"19",cy:"12",r:"1"})],-1)])],8,tw),p("div",nw,[p("button",{type:"button",onClick:H=>Fe(T,H)},"重命名",8,ow),p("button",{type:"button",onClick:H=>Ye(T,H)},"编辑标签",8,rw),p("button",{type:"button",class:"danger",onClick:H=>Te(T,H)},"删除草稿",8,iw)])],32)]),S.value===T.id?(O(),P("div",sw,[p("div",aw,[(O(!0),P(ue,null,Le(I.value,(H,W)=>(O(),P("button",{key:H,type:"button","aria-label":`移除标签 ${H}`,onClick:q=>I.value.splice(W,1)},"#"+U(H)+" · 移除",9,lw))),128))]),ot(p("input",{ref_for:!0,ref:H=>F.value=H,"onUpdate:modelValue":b[14]||(b[14]=H=>C.value=H),"aria-label":"新标签",placeholder:"输入标签，回车添加",onKeydown:[xn(It(Je,["prevent"]),["enter"]),b[15]||(b[15]=xn(It(H=>S.value=null,["prevent"]),["esc"])),Pt]},null,40,cw),[[Ut,C.value]]),p("div",uw,[p("button",{class:"text-button",type:"button",onClick:b[16]||(b[16]=H=>S.value=null)},"取消"),p("button",{class:"text-button",type:"button",onClick:pt},"完成")])])):T.tags?.length?(O(),P("div",dw,[(O(!0),P(ue,null,Le(T.tags,H=>(O(),P("button",{key:H,type:"button",onClick:W=>mn(H)},"#"+U(H),9,fw))),128))])):ae("",!0)],2))),128)),E.value.length?ae("",!0):(O(),P("li",pw,U(A(s).length?"没有匹配的草稿":"暂时没有浏览器草稿"),1))]),p("details",hw,[b[35]||(b[35]=p("summary",null,"管理与备份",-1)),p("div",mw,[p("button",{type:"button",onClick:wt},"导出 JSON"),p("label",null,[b[34]||(b[34]=We("导入 JSON",-1)),p("input",{type:"file",accept:"application/json",onChange:gn},null,32)])]),_.value?(O(),P("p",gw,U(_.value),1)):ae("",!0),p("p",{class:$e(["storage-summary",{warning:A(l).warn}])},"已用 "+U(A(c))+"% · "+U(A(u)(A(l).used))+" / "+U(A(u)(A(l).quota))+U(A(l).supported?"":"（估算）"),3),A(l).warn?(O(),P("p",bw,"存储空间不足，建议先导出备份。")):ae("",!0)])],512),[[_o,f.value]])],2),b[36]||(b[36]=p("footer",{class:"sidebar-footer"},[p("span",{class:"local-dot","aria-hidden":"true"}),We("仅在本机保存")],-1))],2))}}),vw=Ge(yw,[["__scopeId","data-v-5d1a93ec"]]),ww=[{id:"warm",name:"温暖",description:"暖橙 + 奶油黄，适合生活美学",primary:"#d98141",secondary:"#b96234",accent:"#efb758"},{id:"cool",name:"冷静",description:"青绿 + 深蓝，技术/产品稳重感",primary:"#2d6fdd",secondary:"#1f3b70",accent:"#4ec9b0"},{id:"morandi",name:"莫兰迪",description:"低饱和灰粉 + 灰绿，克制优雅",primary:"#a88b8a",secondary:"#6b7c7b",accent:"#c9b9a0"},{id:"clash",name:"撞色",description:"高饱和撞色，运营号放大表达",primary:"#e23e57",secondary:"#522546",accent:"#f8b400"},{id:"sophisticated-gray",name:"高级灰",description:"深灰 + 金点缀，商务深度",primary:"#3a3d42",secondary:"#1f2124",accent:"#c9a96c"},{id:"japanese",name:"日系",description:"樱粉 + 淡黄 + 浅竹青",primary:"#d67b8c",secondary:"#a85a6a",accent:"#8ba888"},{id:"nordic",name:"北欧",description:"雾蓝 + 浅灰 + 木色",primary:"#4a7590",secondary:"#2e4a5c",accent:"#c7a97a"},{id:"black-gold",name:"黑金",description:"深黑 + 金，奢侈品调性",primary:"#c9a96c",secondary:"#1a1a1a",accent:"#f4dfa3",dark:!0},{id:"porcelain",name:"青花",description:"深青 + 瓷白 + 赭红",primary:"#2a5b8a",secondary:"#143154",accent:"#b1413a"},{id:"neo-chinese",name:"新中式",description:"胭脂红 + 墨绿 + 米黄",primary:"#9b2f2b",secondary:"#3e4e3a",accent:"#d9b26a"}],{min:Sw,max:kw}=Math,Mo=(e,t=0,n=1)=>Sw(kw(t,e),n),kl=e=>{e._clipped=!1,e._unclipped=e.slice(0);for(let t=0;t<=3;t++)t<3?((e[t]<0||e[t]>255)&&(e._clipped=!0),e[t]=Mo(e[t],0,255)):t===3&&(e[t]=Mo(e[t],0,1));return e},np={};for(let e of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])np[`[object ${e}]`]=e.toLowerCase();function Oe(e){return np[Object.prototype.toString.call(e)]||"object"}const Ee=(e,t=null)=>e.length>=3?Array.prototype.slice.call(e):Oe(e[0])=="object"&&t?t.split("").filter(n=>e[0][n]!==void 0).map(n=>e[0][n]):e[0].slice(0),ur=e=>{if(e.length<2)return null;const t=e.length-1;return Oe(e[t])=="string"?e[t].toLowerCase():null},{PI:fs,min:op,max:rp}=Math,tn=e=>Math.round(e*100)/100,La=e=>Math.round(e*100)/100,Fn=fs*2,zs=fs/3,xw=fs/180,_w=180/fs;function ip(e){return[...e.slice(0,3).reverse(),...e.slice(3)]}const _e={format:{},autodetect:[]};class Q{constructor(...t){const n=this;if(Oe(t[0])==="object"&&t[0].constructor&&t[0].constructor===this.constructor)return t[0];let o=ur(t),r=!1;if(!o){r=!0,_e.sorted||(_e.autodetect=_e.autodetect.sort((i,s)=>s.p-i.p),_e.sorted=!0);for(let i of _e.autodetect)if(o=i.test(...t),o)break}if(_e.format[o]){const i=_e.format[o].apply(null,r?t:t.slice(0,-1));n._rgb=kl(i)}else throw new Error("unknown format: "+t);n._rgb.length===3&&n._rgb.push(1)}toString(){return Oe(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}}const Cw="3.2.0",me=(...e)=>new Q(...e);me.version=Cw;const ir={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},$w=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,Ew=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,sp=e=>{if(e.match($w)){(e.length===4||e.length===7)&&(e=e.substr(1)),e.length===3&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const t=parseInt(e,16),n=t>>16,o=t>>8&255,r=t&255;return[n,o,r,1]}if(e.match(Ew)){(e.length===5||e.length===9)&&(e=e.substr(1)),e.length===4&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=parseInt(e,16),n=t>>24&255,o=t>>16&255,r=t>>8&255,i=Math.round((t&255)/255*100)/100;return[n,o,r,i]}throw new Error(`unknown hex color: ${e}`)},{round:yi}=Math,ap=(...e)=>{let[t,n,o,r]=Ee(e,"rgba"),i=ur(e)||"auto";r===void 0&&(r=1),i==="auto"&&(i=r<1?"rgba":"rgb"),t=yi(t),n=yi(n),o=yi(o);let a="000000"+(t<<16|n<<8|o).toString(16);a=a.substr(a.length-6);let l="0"+yi(r*255).toString(16);switch(l=l.substr(l.length-2),i.toLowerCase()){case"rgba":return`#${a}${l}`;case"argb":return`#${l}${a}`;default:return`#${a}`}};Q.prototype.name=function(){const e=ap(this._rgb,"rgb");for(let t of Object.keys(ir))if(ir[t]===e)return t.toLowerCase();return e};_e.format.named=e=>{if(e=e.toLowerCase(),ir[e])return sp(ir[e]);throw new Error("unknown color name: "+e)};_e.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&Oe(e)==="string"&&ir[e.toLowerCase()])return"named"}});Q.prototype.alpha=function(e,t=!1){return e!==void 0&&Oe(e)==="number"?t?(this._rgb[3]=e,this):new Q([this._rgb[0],this._rgb[1],this._rgb[2],e],"rgb"):this._rgb[3]};Q.prototype.clipped=function(){return this._rgb._clipped||!1};const In={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},Tw=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function Vn(e){const t=Tw.get(String(e).toLowerCase());if(!t)throw new Error("unknown Lab illuminant "+e);In.labWhitePoint=e,In.Xn=t[0],In.Zn=t[1]}function Yr(){return In.labWhitePoint}const xl=(...e)=>{e=Ee(e,"lab");const[t,n,o]=e,[r,i,s]=Aw(t,n,o),[a,l,c]=lp(r,i,s);return[a,l,c,e.length>3?e[3]:1]},Aw=(e,t,n)=>{const{kE:o,kK:r,kKE:i,Xn:s,Yn:a,Zn:l}=In,c=(e+16)/116,u=.002*t+c,d=c-.005*n,f=u*u*u,h=d*d*d,g=f>o?f:(116*u-16)/r,m=e>i?Math.pow((e+16)/116,3):e/r,w=h>o?h:(116*d-16)/r,k=g*s,x=m*a,L=w*l;return[k,x,L]},Ws=e=>{const t=Math.sign(e);return e=Math.abs(e),(e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055)*t},lp=(e,t,n)=>{const{MtxAdaptMa:o,MtxAdaptMaI:r,MtxXYZ2RGB:i,RefWhiteRGB:s,Xn:a,Yn:l,Zn:c}=In,u=a*o.m00+l*o.m10+c*o.m20,d=a*o.m01+l*o.m11+c*o.m21,f=a*o.m02+l*o.m12+c*o.m22,h=s.X*o.m00+s.Y*o.m10+s.Z*o.m20,g=s.X*o.m01+s.Y*o.m11+s.Z*o.m21,m=s.X*o.m02+s.Y*o.m12+s.Z*o.m22,w=(e*o.m00+t*o.m10+n*o.m20)*(h/u),k=(e*o.m01+t*o.m11+n*o.m21)*(g/d),x=(e*o.m02+t*o.m12+n*o.m22)*(m/f),L=w*r.m00+k*r.m10+x*r.m20,$=w*r.m01+k*r.m11+x*r.m21,N=w*r.m02+k*r.m12+x*r.m22,D=Ws(L*i.m00+$*i.m10+N*i.m20),_=Ws(L*i.m01+$*i.m11+N*i.m21),v=Ws(L*i.m02+$*i.m12+N*i.m22);return[D*255,_*255,v*255]},_l=(...e)=>{const[t,n,o,...r]=Ee(e,"rgb"),[i,s,a]=cp(t,n,o),[l,c,u]=Iw(i,s,a);return[l,c,u,...r.length>0&&r[0]<1?[r[0]]:[]]};function Iw(e,t,n){const{Xn:o,Yn:r,Zn:i,kE:s,kK:a}=In,l=e/o,c=t/r,u=n/i,d=l>s?Math.pow(l,1/3):(a*l+16)/116,f=c>s?Math.pow(c,1/3):(a*c+16)/116,h=u>s?Math.pow(u,1/3):(a*u+16)/116;return[116*f-16,500*(d-f),200*(f-h)]}function Ks(e){const t=Math.sign(e);return e=Math.abs(e),(e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4))*t}const cp=(e,t,n)=>{e=Ks(e/255),t=Ks(t/255),n=Ks(n/255);const{MtxRGB2XYZ:o,MtxAdaptMa:r,MtxAdaptMaI:i,Xn:s,Yn:a,Zn:l,As:c,Bs:u,Cs:d}=In;let f=e*o.m00+t*o.m10+n*o.m20,h=e*o.m01+t*o.m11+n*o.m21,g=e*o.m02+t*o.m12+n*o.m22;const m=s*r.m00+a*r.m10+l*r.m20,w=s*r.m01+a*r.m11+l*r.m21,k=s*r.m02+a*r.m12+l*r.m22;let x=f*r.m00+h*r.m10+g*r.m20,L=f*r.m01+h*r.m11+g*r.m21,$=f*r.m02+h*r.m12+g*r.m22;return x*=m/c,L*=w/u,$*=k/d,f=x*i.m00+L*i.m10+$*i.m20,h=x*i.m01+L*i.m11+$*i.m21,g=x*i.m02+L*i.m12+$*i.m22,[f,h,g]};Q.prototype.lab=function(){return _l(this._rgb)};const Rw=(...e)=>new Q(...e,"lab");Object.assign(me,{lab:Rw,getLabWhitePoint:Yr,setLabWhitePoint:Vn});_e.format.lab=xl;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"lab"),Oe(e)==="array"&&e.length===3)return"lab"}});Q.prototype.darken=function(e=1){const t=this,n=t.lab();return n[0]-=In.Kn*e,new Q(n,"lab").alpha(t.alpha(),!0)};Q.prototype.brighten=function(e=1){return this.darken(-e)};Q.prototype.darker=Q.prototype.darken;Q.prototype.brighter=Q.prototype.brighten;Q.prototype.get=function(e){const[t,n]=e.split("."),o=this[t]();if(n){const r=t.indexOf(n)-(t.substr(0,2)==="ok"?2:0);if(r>-1)return o[r];throw new Error(`unknown channel ${n} in mode ${t}`)}else return o};const{pow:Mw}=Math,Ow=1e-7,Lw=20;Q.prototype.luminance=function(e,t="rgb"){if(e!==void 0&&Oe(e)==="number"){if(e===0)return new Q([0,0,0,this._rgb[3]],"rgb");if(e===1)return new Q([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),o=Lw;const r=(s,a)=>{const l=s.interpolate(a,.5,t),c=l.luminance();return Math.abs(e-c)<Ow||!o--?l:c>e?r(s,l):r(l,a)},i=(n>e?r(new Q([0,0,0]),this):r(this,new Q([255,255,255]))).rgb();return new Q([...i,this._rgb[3]])}return Nw(...this._rgb.slice(0,3))};const Nw=(e,t,n)=>(e=qs(e),t=qs(t),n=qs(n),.2126*e+.7152*t+.0722*n),qs=e=>(e/=255,e<=.03928?e/12.92:Mw((e+.055)/1.055,2.4)),Nt={},sr=(e,t,n=.5,...o)=>{let r=o[0]||"lrgb";if(!Nt[r]&&!o.length&&(r=Object.keys(Nt)[0]),!Nt[r])throw new Error(`interpolation mode ${r} is not defined`);return Oe(e)!=="object"&&(e=new Q(e)),Oe(t)!=="object"&&(t=new Q(t)),Nt[r](e,t,n).alpha(e.alpha()+n*(t.alpha()-e.alpha()))};Q.prototype.mix=Q.prototype.interpolate=function(e,t=.5,...n){return sr(this,e,t,...n)};Q.prototype.premultiply=function(e=!1){const t=this._rgb,n=t[3];return e?(this._rgb=[t[0]*n,t[1]*n,t[2]*n,n],this):new Q([t[0]*n,t[1]*n,t[2]*n,n],"rgb")};const{sin:Dw,cos:Pw}=Math,up=(...e)=>{let[t,n,o]=Ee(e,"lch");return isNaN(o)&&(o=0),o=o*xw,[t,Pw(o)*n,Dw(o)*n]},Cl=(...e)=>{e=Ee(e,"lch");const[t,n,o]=e,[r,i,s]=up(t,n,o),[a,l,c]=xl(r,i,s);return[a,l,c,e.length>3?e[3]:1]},Bw=(...e)=>{const t=ip(Ee(e,"hcl"));return Cl(...t)},{sqrt:Fw,atan2:jw,round:Hw}=Math,dp=(...e)=>{const[t,n,o]=Ee(e,"lab"),r=Fw(n*n+o*o);let i=(jw(o,n)*_w+360)%360;return Hw(r*1e4)===0&&(i=Number.NaN),[t,r,i]},$l=(...e)=>{const[t,n,o,...r]=Ee(e,"rgb"),[i,s,a]=_l(t,n,o),[l,c,u]=dp(i,s,a);return[l,c,u,...r.length>0&&r[0]<1?[r[0]]:[]]};Q.prototype.lch=function(){return $l(this._rgb)};Q.prototype.hcl=function(){return ip($l(this._rgb))};const Vw=(...e)=>new Q(...e,"lch"),Uw=(...e)=>new Q(...e,"hcl");Object.assign(me,{lch:Vw,hcl:Uw});_e.format.lch=Cl;_e.format.hcl=Bw;["lch","hcl"].forEach(e=>_e.autodetect.push({p:2,test:(...t)=>{if(t=Ee(t,e),Oe(t)==="array"&&t.length===3)return e}}));Q.prototype.saturate=function(e=1){const t=this,n=t.lch();return n[1]+=In.Kn*e,n[1]<0&&(n[1]=0),new Q(n,"lch").alpha(t.alpha(),!0)};Q.prototype.desaturate=function(e=1){return this.saturate(-e)};Q.prototype.set=function(e,t,n=!1){const[o,r]=e.split("."),i=this[o]();if(r){const s=o.indexOf(r)-(o.substr(0,2)==="ok"?2:0);if(s>-1){if(Oe(t)=="string")switch(t.charAt(0)){case"+":i[s]+=+t;break;case"-":i[s]+=+t;break;case"*":i[s]*=+t.substr(1);break;case"/":i[s]/=+t.substr(1);break;default:i[s]=+t}else if(Oe(t)==="number")i[s]=t;else throw new Error("unsupported value for Color.set");const a=new Q(i,o);return n?(this._rgb=a._rgb,this):a}throw new Error(`unknown channel ${r} in mode ${o}`)}else return i};Q.prototype.tint=function(e=.5,...t){return sr(this,"white",e,...t)};Q.prototype.shade=function(e=.5,...t){return sr(this,"black",e,...t)};const zw=(e,t,n)=>{const o=e._rgb,r=t._rgb;return new Q(o[0]+n*(r[0]-o[0]),o[1]+n*(r[1]-o[1]),o[2]+n*(r[2]-o[2]),"rgb")};Nt.rgb=zw;const{sqrt:Gs,pow:jo}=Math,Ww=(e,t,n)=>{const[o,r,i]=e._rgb,[s,a,l]=t._rgb;return new Q(Gs(jo(o,2)*(1-n)+jo(s,2)*n),Gs(jo(r,2)*(1-n)+jo(a,2)*n),Gs(jo(i,2)*(1-n)+jo(l,2)*n),"rgb")};Nt.lrgb=Ww;const Kw=(e,t,n)=>{const o=e.lab(),r=t.lab();return new Q(o[0]+n*(r[0]-o[0]),o[1]+n*(r[1]-o[1]),o[2]+n*(r[2]-o[2]),"lab")};Nt.lab=Kw;const dr=(e,t,n,o)=>{let r,i;o==="hsl"?(r=e.hsl(),i=t.hsl()):o==="hsv"?(r=e.hsv(),i=t.hsv()):o==="hcg"?(r=e.hcg(),i=t.hcg()):o==="hsi"?(r=e.hsi(),i=t.hsi()):o==="lch"||o==="hcl"?(o="hcl",r=e.hcl(),i=t.hcl()):o==="oklch"&&(r=e.oklch().reverse(),i=t.oklch().reverse());let s,a,l,c,u,d;(o.substr(0,1)==="h"||o==="oklch")&&([s,l,u]=r,[a,c,d]=i);let f,h,g,m;return!isNaN(s)&&!isNaN(a)?(a>s&&a-s>180?m=a-(s+360):a<s&&s-a>180?m=a+360-s:m=a-s,h=s+n*m):isNaN(s)?isNaN(a)?h=Number.NaN:(h=a,(u==1||u==0)&&o!="hsv"&&(f=c)):(h=s,(d==1||d==0)&&o!="hsv"&&(f=l)),f===void 0&&(f=l+n*(c-l)),g=u+n*(d-u),o==="oklch"?new Q([g,f,h],o):new Q([h,f,g],o)},fp=(e,t,n)=>dr(e,t,n,"lch");Nt.lch=fp;Nt.hcl=fp;const qw=e=>{if(Oe(e)=="number"&&e>=0&&e<=16777215){const t=e>>16,n=e>>8&255,o=e&255;return[t,n,o,1]}throw new Error("unknown num color: "+e)},Gw=(...e)=>{const[t,n,o]=Ee(e,"rgb");return(t<<16)+(n<<8)+o};Q.prototype.num=function(){return Gw(this._rgb)};const Yw=(...e)=>new Q(...e,"num");Object.assign(me,{num:Yw});_e.format.num=qw;_e.autodetect.push({p:5,test:(...e)=>{if(e.length===1&&Oe(e[0])==="number"&&e[0]>=0&&e[0]<=16777215)return"num"}});const Jw=(e,t,n)=>{const o=e.num(),r=t.num();return new Q(o+n*(r-o),"num")};Nt.num=Jw;const{floor:Zw}=Math,Qw=(...e)=>{e=Ee(e,"hcg");let[t,n,o]=e,r,i,s;o=o*255;const a=n*255;if(n===0)r=i=s=o;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const l=Zw(t),c=t-l,u=o*(1-n),d=u+a*(1-c),f=u+a*c,h=u+a;switch(l){case 0:[r,i,s]=[h,f,u];break;case 1:[r,i,s]=[d,h,u];break;case 2:[r,i,s]=[u,h,f];break;case 3:[r,i,s]=[u,d,h];break;case 4:[r,i,s]=[f,u,h];break;case 5:[r,i,s]=[h,u,d];break}}return[r,i,s,e.length>3?e[3]:1]},Xw=(...e)=>{const[t,n,o]=Ee(e,"rgb"),r=op(t,n,o),i=rp(t,n,o),s=i-r,a=s*100/255,l=r/(255-s)*100;let c;return s===0?c=Number.NaN:(t===i&&(c=(n-o)/s),n===i&&(c=2+(o-t)/s),o===i&&(c=4+(t-n)/s),c*=60,c<0&&(c+=360)),[c,a,l]};Q.prototype.hcg=function(){return Xw(this._rgb)};const e2=(...e)=>new Q(...e,"hcg");me.hcg=e2;_e.format.hcg=Qw;_e.autodetect.push({p:1,test:(...e)=>{if(e=Ee(e,"hcg"),Oe(e)==="array"&&e.length===3)return"hcg"}});const t2=(e,t,n)=>dr(e,t,n,"hcg");Nt.hcg=t2;const{cos:Ho}=Math,n2=(...e)=>{e=Ee(e,"hsi");let[t,n,o]=e,r,i,s;return isNaN(t)&&(t=0),isNaN(n)&&(n=0),t>360&&(t-=360),t<0&&(t+=360),t/=360,t<1/3?(s=(1-n)/3,r=(1+n*Ho(Fn*t)/Ho(zs-Fn*t))/3,i=1-(s+r)):t<2/3?(t-=1/3,r=(1-n)/3,i=(1+n*Ho(Fn*t)/Ho(zs-Fn*t))/3,s=1-(r+i)):(t-=2/3,i=(1-n)/3,s=(1+n*Ho(Fn*t)/Ho(zs-Fn*t))/3,r=1-(i+s)),r=Mo(o*r*3),i=Mo(o*i*3),s=Mo(o*s*3),[r*255,i*255,s*255,e.length>3?e[3]:1]},{min:o2,sqrt:r2,acos:i2}=Math,s2=(...e)=>{let[t,n,o]=Ee(e,"rgb");t/=255,n/=255,o/=255;let r;const i=o2(t,n,o),s=(t+n+o)/3,a=s>0?1-i/s:0;return a===0?r=NaN:(r=(t-n+(t-o))/2,r/=r2((t-n)*(t-n)+(t-o)*(n-o)),r=i2(r),o>n&&(r=Fn-r),r/=Fn),[r*360,a,s]};Q.prototype.hsi=function(){return s2(this._rgb)};const a2=(...e)=>new Q(...e,"hsi");me.hsi=a2;_e.format.hsi=n2;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"hsi"),Oe(e)==="array"&&e.length===3)return"hsi"}});const l2=(e,t,n)=>dr(e,t,n,"hsi");Nt.hsi=l2;const Na=(...e)=>{e=Ee(e,"hsl");const[t,n,o]=e;let r,i,s;if(n===0)r=i=s=o*255;else{const a=[0,0,0],l=[0,0,0],c=o<.5?o*(1+n):o+n-o*n,u=2*o-c,d=t/360;a[0]=d+1/3,a[1]=d,a[2]=d-1/3;for(let f=0;f<3;f++)a[f]<0&&(a[f]+=1),a[f]>1&&(a[f]-=1),6*a[f]<1?l[f]=u+(c-u)*6*a[f]:2*a[f]<1?l[f]=c:3*a[f]<2?l[f]=u+(c-u)*(2/3-a[f])*6:l[f]=u;[r,i,s]=[l[0]*255,l[1]*255,l[2]*255]}return e.length>3?[r,i,s,e[3]]:[r,i,s,1]},pp=(...e)=>{e=Ee(e,"rgba");let[t,n,o]=e;t/=255,n/=255,o/=255;const r=op(t,n,o),i=rp(t,n,o),s=(i+r)/2;let a,l;return i===r?(a=0,l=Number.NaN):a=s<.5?(i-r)/(i+r):(i-r)/(2-i-r),t==i?l=(n-o)/(i-r):n==i?l=2+(o-t)/(i-r):o==i&&(l=4+(t-n)/(i-r)),l*=60,l<0&&(l+=360),e.length>3&&e[3]!==void 0?[l,a,s,e[3]]:[l,a,s]};Q.prototype.hsl=function(){return pp(this._rgb)};const c2=(...e)=>new Q(...e,"hsl");me.hsl=c2;_e.format.hsl=Na;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"hsl"),Oe(e)==="array"&&e.length===3)return"hsl"}});const u2=(e,t,n)=>dr(e,t,n,"hsl");Nt.hsl=u2;const{floor:d2}=Math,f2=(...e)=>{e=Ee(e,"hsv");let[t,n,o]=e,r,i,s;if(o*=255,n===0)r=i=s=o;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const a=d2(t),l=t-a,c=o*(1-n),u=o*(1-n*l),d=o*(1-n*(1-l));switch(a){case 0:[r,i,s]=[o,d,c];break;case 1:[r,i,s]=[u,o,c];break;case 2:[r,i,s]=[c,o,d];break;case 3:[r,i,s]=[c,u,o];break;case 4:[r,i,s]=[d,c,o];break;case 5:[r,i,s]=[o,c,u];break}}return[r,i,s,e.length>3?e[3]:1]},{min:p2,max:h2}=Math,m2=(...e)=>{e=Ee(e,"rgb");let[t,n,o]=e;const r=p2(t,n,o),i=h2(t,n,o),s=i-r;let a,l,c;return c=i/255,i===0?(a=Number.NaN,l=0):(l=s/i,t===i&&(a=(n-o)/s),n===i&&(a=2+(o-t)/s),o===i&&(a=4+(t-n)/s),a*=60,a<0&&(a+=360)),[a,l,c]};Q.prototype.hsv=function(){return m2(this._rgb)};const g2=(...e)=>new Q(...e,"hsv");me.hsv=g2;_e.format.hsv=f2;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"hsv"),Oe(e)==="array"&&e.length===3)return"hsv"}});const b2=(e,t,n)=>dr(e,t,n,"hsv");Nt.hsv=b2;function Hi(e,t){let n=e.length;Array.isArray(e[0])||(e=[e]),Array.isArray(t[0])||(t=t.map(s=>[s]));let o=t[0].length,r=t[0].map((s,a)=>t.map(l=>l[a])),i=e.map(s=>r.map(a=>Array.isArray(s)?s.reduce((l,c,u)=>l+c*(a[u]||0),0):a.reduce((l,c)=>l+c*s,0)));return n===1&&(i=i[0]),o===1?i.map(s=>s[0]):i}const El=(...e)=>{e=Ee(e,"lab");const[t,n,o,...r]=e,[i,s,a]=y2([t,n,o]),[l,c,u]=lp(i,s,a);return[l,c,u,...r.length>0&&r[0]<1?[r[0]]:[]]};function y2(e){var t=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],n=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],o=Hi(n,e);return Hi(t,o.map(r=>r**3))}const Tl=(...e)=>{const[t,n,o,...r]=Ee(e,"rgb"),i=cp(t,n,o);return[...v2(i),...r.length>0&&r[0]<1?[r[0]]:[]]};function v2(e){const t=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],n=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],o=Hi(t,e);return Hi(n,o.map(r=>Math.cbrt(r)))}Q.prototype.oklab=function(){return Tl(this._rgb)};const w2=(...e)=>new Q(...e,"oklab");Object.assign(me,{oklab:w2});_e.format.oklab=El;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"oklab"),Oe(e)==="array"&&e.length===3)return"oklab"}});const S2=(e,t,n)=>{const o=e.oklab(),r=t.oklab();return new Q(o[0]+n*(r[0]-o[0]),o[1]+n*(r[1]-o[1]),o[2]+n*(r[2]-o[2]),"oklab")};Nt.oklab=S2;const k2=(e,t,n)=>dr(e,t,n,"oklch");Nt.oklch=k2;const{pow:Ys,sqrt:Js,PI:Zs,cos:cu,sin:uu,atan2:x2}=Math,_2=(e,t="lrgb",n=null)=>{const o=e.length;n||(n=Array.from(new Array(o)).map(()=>1));const r=o/n.reduce(function(d,f){return d+f});if(n.forEach((d,f)=>{n[f]*=r}),e=e.map(d=>new Q(d)),t==="lrgb")return C2(e,n);const i=e.shift(),s=i.get(t),a=[];let l=0,c=0;for(let d=0;d<s.length;d++)if(s[d]=(s[d]||0)*n[0],a.push(isNaN(s[d])?0:n[0]),t.charAt(d)==="h"&&!isNaN(s[d])){const f=s[d]/180*Zs;l+=cu(f)*n[0],c+=uu(f)*n[0]}let u=i.alpha()*n[0];e.forEach((d,f)=>{const h=d.get(t);u+=d.alpha()*n[f+1];for(let g=0;g<s.length;g++)if(!isNaN(h[g]))if(a[g]+=n[f+1],t.charAt(g)==="h"){const m=h[g]/180*Zs;l+=cu(m)*n[f+1],c+=uu(m)*n[f+1]}else s[g]+=h[g]*n[f+1]});for(let d=0;d<s.length;d++)if(t.charAt(d)==="h"){let f=x2(c/a[d],l/a[d])/Zs*180;for(;f<0;)f+=360;for(;f>=360;)f-=360;s[d]=f}else s[d]=s[d]/a[d];return u/=o,new Q(s,t).alpha(u>.99999?1:u,!0)},C2=(e,t)=>{const n=e.length,o=[0,0,0,0];for(let r=0;r<e.length;r++){const i=e[r],s=t[r]/n,a=i._rgb;o[0]+=Ys(a[0],2)*s,o[1]+=Ys(a[1],2)*s,o[2]+=Ys(a[2],2)*s,o[3]+=a[3]*s}return o[0]=Js(o[0]),o[1]=Js(o[1]),o[2]=Js(o[2]),o[3]>.9999999&&(o[3]=1),new Q(kl(o))},{pow:$2}=Math;function Vi(e){let t="rgb",n=me("#ccc"),o=0,r=[0,1],i=[0,1],s=[],a=[0,0],l=!1,c=[],u=!1,d=0,f=1,h=!1,g={},m=!0,w=1;const k=function(v){if(v=v||["#fff","#000"],v&&Oe(v)==="string"&&me.brewer&&me.brewer[v.toLowerCase()]&&(v=me.brewer[v.toLowerCase()]),Oe(v)==="array"){v.length===1&&(v=[v[0],v[0]]),v=v.slice(0);for(let S=0;S<v.length;S++)v[S]=me(v[S]);s.length=0;for(let S=0;S<v.length;S++)s.push(S/(v.length-1))}return D(),c=v},x=function(v){if(l!=null){const S=l.length-1;let I=0;for(;I<S&&v>=l[I];)I++;return I-1}return 0};let L=v=>v,$=v=>v;const N=function(v,S){let I,C;if(S==null&&(S=!1),isNaN(v)||v===null)return n;S?C=v:l&&l.length>2?C=x(v)/(l.length-2):f!==d?C=(v-d)/(f-d):C=1,C=$(C),S||(C=L(C)),w!==1&&(C=$2(C,w)),C=a[0]+C*(1-a[0]-a[1]),C=Mo(C,0,1);const F=Math.floor(C*1e4);if(m&&g[F])I=g[F];else{if(Oe(c)==="array")for(let E=0;E<s.length;E++){const j=s[E];if(C<=j){I=c[E];break}if(C>=j&&E===s.length-1){I=c[E];break}if(C>j&&C<s[E+1]){C=(C-j)/(s[E+1]-j),I=me.interpolate(c[E],c[E+1],C,t);break}}else Oe(c)==="function"&&(I=c(C));m&&(g[F]=I)}return I};var D=()=>g={};k(e);const _=function(v){const S=me(N(v));return u&&S[u]?S[u]():S};return _.classes=function(v){if(v!=null){if(Oe(v)==="array")l=v,r=[v[0],v[v.length-1]];else{const S=me.analyze(r);v===0?l=[S.min,S.max]:l=me.limits(S,"e",v)}return _}return l},_.domain=function(v){if(!arguments.length)return i;i=v.slice(0),d=v[0],f=v[v.length-1],s=[];const S=c.length;if(v.length===S&&d!==f)for(let I of Array.from(v))s.push((I-d)/(f-d));else{for(let I=0;I<S;I++)s.push(I/(S-1));if(v.length>2){const I=v.map((F,E)=>E/(v.length-1)),C=v.map(F=>(F-d)/(f-d));C.every((F,E)=>I[E]===F)||($=F=>{if(F<=0||F>=1)return F;let E=0;for(;F>=C[E+1];)E++;const j=(F-C[E])/(C[E+1]-C[E]);return I[E]+j*(I[E+1]-I[E])})}}return r=[d,f],_},_.mode=function(v){return arguments.length?(t=v,D(),_):t},_.range=function(v,S){return k(v),_},_.out=function(v){return u=v,_},_.spread=function(v){return arguments.length?(o=v,_):o},_.correctLightness=function(v){return v==null&&(v=!0),h=v,D(),h?L=function(S){const I=N(0,!0).lab()[0],C=N(1,!0).lab()[0],F=I>C;let E=N(S,!0).lab()[0];const j=I+(C-I)*S;let R=E-j,B=0,V=1,z=20;for(;Math.abs(R)>.01&&z-- >0;)(function(){return F&&(R*=-1),R<0?(B=S,S+=(V-S)*.5):(V=S,S+=(B-S)*.5),E=N(S,!0).lab()[0],R=E-j})();return S}:L=S=>S,_},_.padding=function(v){return v!=null?(Oe(v)==="number"&&(v=[v,v]),a=v,_):a},_.colors=function(v,S){arguments.length<2&&(S="hex");let I=[];if(arguments.length===0)I=c.slice(0);else if(v===1)I=[_(.5)];else if(v>1){const C=r[0],F=r[1]-C;I=E2(0,v).map(E=>_(C+E/(v-1)*F))}else{e=[];let C=[];if(l&&l.length>2)for(let F=1,E=l.length,j=1<=E;j?F<E:F>E;j?F++:F--)C.push((l[F-1]+l[F])*.5);else C=r;I=C.map(F=>_(F))}return me[S]&&(I=I.map(C=>C[S]())),I},_.cache=function(v){return v!=null?(m=v,_):m},_.gamma=function(v){return v!=null?(w=v,_):w},_.nodata=function(v){return v!=null?(n=me(v),_):n},_}function E2(e,t,n){let o=[],r=e<t,i=t;for(let s=e;r?s<i:s>i;r?s++:s--)o.push(s);return o}const T2=function(e){let t=[1,1];for(let n=1;n<e;n++){let o=[1];for(let r=1;r<=t.length;r++)o[r]=(t[r]||0)+t[r-1];t=o}return t},A2=function(e){let t,n,o,r;if(e=e.map(i=>new Q(i)),e.length===2)[n,o]=e.map(i=>i.lab()),t=function(i){const s=[0,1,2].map(a=>n[a]+i*(o[a]-n[a]));return new Q(s,"lab")};else if(e.length===3)[n,o,r]=e.map(i=>i.lab()),t=function(i){const s=[0,1,2].map(a=>(1-i)*(1-i)*n[a]+2*(1-i)*i*o[a]+i*i*r[a]);return new Q(s,"lab")};else if(e.length===4){let i;[n,o,r,i]=e.map(s=>s.lab()),t=function(s){const a=[0,1,2].map(l=>(1-s)*(1-s)*(1-s)*n[l]+3*(1-s)*(1-s)*s*o[l]+3*(1-s)*s*s*r[l]+s*s*s*i[l]);return new Q(a,"lab")}}else if(e.length>=5){let i,s,a;i=e.map(l=>l.lab()),a=e.length-1,s=T2(a),t=function(l){const c=1-l,u=[0,1,2].map(d=>i.reduce((f,h,g)=>f+s[g]*c**(a-g)*l**g*h[d],0));return new Q(u,"lab")}}else throw new RangeError("No point in running bezier with only one color.");return t},I2=e=>{const t=A2(e);return t.scale=()=>Vi(t),t},{round:hp}=Math;Q.prototype.rgb=function(e=!0){return e===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(hp)};Q.prototype.rgba=function(e=!0){return this._rgb.slice(0,4).map((t,n)=>n<3?e===!1?t:hp(t):t)};const R2=(...e)=>new Q(...e,"rgb");Object.assign(me,{rgb:R2});_e.format.rgb=(...e)=>{const t=Ee(e,"rgba");return t[3]===void 0&&(t[3]=1),t};_e.autodetect.push({p:3,test:(...e)=>{if(e=Ee(e,"rgba"),Oe(e)==="array"&&(e.length===3||e.length===4&&Oe(e[3])=="number"&&e[3]>=0&&e[3]<=1))return"rgb"}});const fn=(e,t,n)=>{if(!fn[n])throw new Error("unknown blend mode "+n);return fn[n](e,t)},uo=e=>(t,n)=>{const o=me(n).rgb(),r=me(t).rgb();return me.rgb(e(o,r))},fo=e=>(t,n)=>{const o=[];return o[0]=e(t[0],n[0]),o[1]=e(t[1],n[1]),o[2]=e(t[2],n[2]),o},M2=e=>e,O2=(e,t)=>e*t/255,L2=(e,t)=>e>t?t:e,N2=(e,t)=>e>t?e:t,D2=(e,t)=>255*(1-(1-e/255)*(1-t/255)),P2=(e,t)=>t<128?2*e*t/255:255*(1-2*(1-e/255)*(1-t/255)),B2=(e,t)=>255*(1-(1-t/255)/(e/255)),F2=(e,t)=>e===255?255:(e=255*(t/255)/(1-e/255),e>255?255:e);fn.normal=uo(fo(M2));fn.multiply=uo(fo(O2));fn.screen=uo(fo(D2));fn.overlay=uo(fo(P2));fn.darken=uo(fo(L2));fn.lighten=uo(fo(N2));fn.dodge=uo(fo(F2));fn.burn=uo(fo(B2));const{pow:j2,sin:H2,cos:V2}=Math;function U2(e=300,t=-1.5,n=1,o=1,r=[0,1]){let i=0,s;Oe(r)==="array"?s=r[1]-r[0]:(s=0,r=[r,r]);const a=function(l){const c=Fn*((e+120)/360+t*l),u=j2(r[0]+s*l,o),f=(i!==0?n[0]+l*i:n)*u*(1-u)/2,h=V2(c),g=H2(c),m=u+f*(-.14861*h+1.78277*g),w=u+f*(-.29227*h-.90649*g),k=u+f*(1.97294*h);return me(kl([m*255,w*255,k*255,1]))};return a.start=function(l){return l==null?e:(e=l,a)},a.rotations=function(l){return l==null?t:(t=l,a)},a.gamma=function(l){return l==null?o:(o=l,a)},a.hue=function(l){return l==null?n:(n=l,Oe(n)==="array"?(i=n[1]-n[0],i===0&&(n=n[1])):i=0,a)},a.lightness=function(l){return l==null?r:(Oe(l)==="array"?(r=l,s=l[1]-l[0]):(r=[l,l],s=0),a)},a.scale=()=>me.scale(a),a.hue(n),a}const z2="0123456789abcdef",{floor:W2,random:K2}=Math,q2=(e=K2)=>{let t="#";for(let n=0;n<6;n++)t+=z2.charAt(W2(e()*16));return new Q(t,"hex")},{log:du,pow:G2,floor:Y2,abs:J2}=Math;function mp(e,t=null){const n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return Oe(e)==="object"&&(e=Object.values(e)),e.forEach(o=>{t&&Oe(o)==="object"&&(o=o[t]),o!=null&&!isNaN(o)&&(n.values.push(o),n.sum+=o,o<n.min&&(n.min=o),o>n.max&&(n.max=o),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(o,r)=>gp(n,o,r),n}function gp(e,t="equal",n=7){Oe(e)=="array"&&(e=mp(e));const{min:o,max:r}=e,i=e.values.sort((a,l)=>a-l);if(n===1)return[o,r];const s=[];if(t.substr(0,1)==="c"&&(s.push(o),s.push(r)),t.substr(0,1)==="e"){s.push(o);for(let a=1;a<n;a++)s.push(o+a/n*(r-o));s.push(r)}else if(t.substr(0,1)==="l"){if(o<=0)throw new Error("Logarithmic scales are only possible for values > 0");const a=Math.LOG10E*du(o),l=Math.LOG10E*du(r);s.push(o);for(let c=1;c<n;c++)s.push(G2(10,a+c/n*(l-a)));s.push(r)}else if(t.substr(0,1)==="q"){s.push(o);for(let a=1;a<n;a++){const l=(i.length-1)*a/n,c=Y2(l);if(c===l)s.push(i[c]);else{const u=l-c;s.push(i[c]*(1-u)+i[c+1]*u)}}s.push(r)}else if(t.substr(0,1)==="k"){let a;const l=i.length,c=new Array(l),u=new Array(n);let d=!0,f=0,h=null;h=[],h.push(o);for(let w=1;w<n;w++)h.push(o+w/n*(r-o));for(h.push(r);d;){for(let k=0;k<n;k++)u[k]=0;for(let k=0;k<l;k++){const x=i[k];let L=Number.MAX_VALUE,$;for(let N=0;N<n;N++){const D=J2(h[N]-x);D<L&&(L=D,$=N),u[$]++,c[k]=$}}const w=new Array(n);for(let k=0;k<n;k++)w[k]=null;for(let k=0;k<l;k++)a=c[k],w[a]===null?w[a]=i[k]:w[a]+=i[k];for(let k=0;k<n;k++)w[k]*=1/u[k];d=!1;for(let k=0;k<n;k++)if(w[k]!==h[k]){d=!0;break}h=w,f++,f>200&&(d=!1)}const g={};for(let w=0;w<n;w++)g[w]=[];for(let w=0;w<l;w++)a=c[w],g[a].push(i[w]);let m=[];for(let w=0;w<n;w++)m.push(g[w][0]),m.push(g[w][g[w].length-1]);m=m.sort((w,k)=>w-k),s.push(m[0]);for(let w=1;w<m.length;w+=2){const k=m[w];!isNaN(k)&&s.indexOf(k)===-1&&s.push(k)}}return s}const Z2=(e,t)=>{e=new Q(e),t=new Q(t);const n=e.luminance(),o=t.luminance();return n>o?(n+.05)/(o+.05):(o+.05)/(n+.05)};/**
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
 */const fu=.027,Q2=5e-4,X2=.1,pu=1.14,vi=.022,hu=1.414,eS=(e,t)=>{e=new Q(e),t=new Q(t),e.alpha()<1&&(e=sr(t,e,e.alpha(),"rgb"));const n=mu(...e.rgb()),o=mu(...t.rgb()),r=n>=vi?n:n+Math.pow(vi-n,hu),i=o>=vi?o:o+Math.pow(vi-o,hu),s=Math.pow(i,.56)-Math.pow(r,.57),a=Math.pow(i,.65)-Math.pow(r,.62),l=Math.abs(i-r)<Q2?0:r<i?s*pu:a*pu;return(Math.abs(l)<X2?0:l>0?l-fu:l+fu)*100};function mu(e,t,n){return .2126729*Math.pow(e/255,2.4)+.7151522*Math.pow(t/255,2.4)+.072175*Math.pow(n/255,2.4)}const{sqrt:Dn,pow:ht,min:tS,max:nS,atan2:gu,abs:bu,cos:wi,sin:yu,exp:oS,PI:vu}=Math;function rS(e,t,n=1,o=1,r=1){var i=function(He){return 360*He/(2*vu)},s=function(He){return 2*vu*He/360};e=new Q(e),t=new Q(t);const[a,l,c]=Array.from(e.lab()),[u,d,f]=Array.from(t.lab()),h=(a+u)/2,g=Dn(ht(l,2)+ht(c,2)),m=Dn(ht(d,2)+ht(f,2)),w=(g+m)/2,k=.5*(1-Dn(ht(w,7)/(ht(w,7)+ht(25,7)))),x=l*(1+k),L=d*(1+k),$=Dn(ht(x,2)+ht(c,2)),N=Dn(ht(L,2)+ht(f,2)),D=($+N)/2,_=i(gu(c,x)),v=i(gu(f,L)),S=_>=0?_:_+360,I=v>=0?v:v+360,C=bu(S-I)>180?(S+I+360)/2:(S+I)/2,F=1-.17*wi(s(C-30))+.24*wi(s(2*C))+.32*wi(s(3*C+6))-.2*wi(s(4*C-63));let E=I-S;E=bu(E)<=180?E:I<=S?E+360:E-360,E=2*Dn($*N)*yu(s(E)/2);const j=u-a,R=N-$,B=1+.015*ht(h-50,2)/Dn(20+ht(h-50,2)),V=1+.045*D,z=1+.015*D*F,fe=30*oS(-ht((C-275)/25,2)),Ne=-(2*Dn(ht(D,7)/(ht(D,7)+ht(25,7))))*yu(2*s(fe)),Fe=Dn(ht(j/(n*B),2)+ht(R/(o*V),2)+ht(E/(r*z),2)+Ne*(R/(o*V))*(E/(r*z)));return nS(0,tS(100,Fe))}function iS(e,t,n="lab"){e=new Q(e),t=new Q(t);const o=e.get(n),r=t.get(n);let i=0;for(let s in o){const a=(o[s]||0)-(r[s]||0);i+=a*a}return Math.sqrt(i)}const sS=(...e)=>{try{return new Q(...e),!0}catch{return!1}},aS={cool(){return Vi([me.hsl(180,1,.9),me.hsl(250,.7,.4)])},hot(){return Vi(["#000","#f00","#ff0","#fff"]).mode("rgb")}},Da={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},bp=Object.keys(Da),wu=new Map(bp.map(e=>[e.toLowerCase(),e])),lS=typeof Proxy=="function"?new Proxy(Da,{get(e,t){const n=t.toLowerCase();if(wu.has(n))return e[wu.get(n)]},getOwnPropertyNames(){return Object.getOwnPropertyNames(bp)}}):Da,cS=(...e)=>{e=Ee(e,"cmyk");const[t,n,o,r]=e,i=e.length>4?e[4]:1;return r===1?[0,0,0,i]:[t>=1?0:255*(1-t)*(1-r),n>=1?0:255*(1-n)*(1-r),o>=1?0:255*(1-o)*(1-r),i]},{max:Su}=Math,uS=(...e)=>{let[t,n,o]=Ee(e,"rgb");t=t/255,n=n/255,o=o/255;const r=1-Su(t,Su(n,o)),i=r<1?1/(1-r):0,s=(1-t-r)*i,a=(1-n-r)*i,l=(1-o-r)*i;return[s,a,l,r]};Q.prototype.cmyk=function(){return uS(this._rgb)};const dS=(...e)=>new Q(...e,"cmyk");Object.assign(me,{cmyk:dS});_e.format.cmyk=cS;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"cmyk"),Oe(e)==="array"&&e.length===4)return"cmyk"}});const fS=(...e)=>{const t=Ee(e,"hsla");let n=ur(e)||"lsa";return t[0]=tn(t[0]||0)+"deg",t[1]=tn(t[1]*100)+"%",t[2]=tn(t[2]*100)+"%",n==="hsla"||t.length>3&&t[3]<1?(t[3]="/ "+(t.length>3?t[3]:1),n="hsla"):t.length=3,`${n.substr(0,3)}(${t.join(" ")})`},pS=(...e)=>{const t=Ee(e,"lab");let n=ur(e)||"lab";return t[0]=tn(t[0])+"%",t[1]=tn(t[1]),t[2]=tn(t[2]),n==="laba"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lab(${t.join(" ")})`},hS=(...e)=>{const t=Ee(e,"lch");let n=ur(e)||"lab";return t[0]=tn(t[0])+"%",t[1]=tn(t[1]),t[2]=isNaN(t[2])?"none":tn(t[2])+"deg",n==="lcha"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lch(${t.join(" ")})`},mS=(...e)=>{const t=Ee(e,"lab");return t[0]=tn(t[0]*100)+"%",t[1]=La(t[1]),t[2]=La(t[2]),t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklab(${t.join(" ")})`},yp=(...e)=>{const[t,n,o,...r]=Ee(e,"rgb"),[i,s,a]=Tl(t,n,o),[l,c,u]=dp(i,s,a);return[l,c,u,...r.length>0&&r[0]<1?[r[0]]:[]]},gS=(...e)=>{const t=Ee(e,"lch");return t[0]=tn(t[0]*100)+"%",t[1]=La(t[1]),t[2]=isNaN(t[2])?"none":tn(t[2])+"deg",t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklch(${t.join(" ")})`},{round:Qs}=Math,bS=(...e)=>{const t=Ee(e,"rgba");let n=ur(e)||"rgb";if(n.substr(0,3)==="hsl")return fS(pp(t),n);if(n.substr(0,3)==="lab"){const o=Yr();Vn("d50");const r=pS(_l(t),n);return Vn(o),r}if(n.substr(0,3)==="lch"){const o=Yr();Vn("d50");const r=hS($l(t),n);return Vn(o),r}return n.substr(0,5)==="oklab"?mS(Tl(t)):n.substr(0,5)==="oklch"?gS(yp(t)):(t[0]=Qs(t[0]),t[1]=Qs(t[1]),t[2]=Qs(t[2]),(n==="rgba"||t.length>3&&t[3]<1)&&(t[3]="/ "+(t.length>3?t[3]:1),n="rgba"),`${n.substr(0,3)}(${t.slice(0,n==="rgb"?3:4).join(" ")})`)},vp=(...e)=>{e=Ee(e,"lch");const[t,n,o,...r]=e,[i,s,a]=up(t,n,o),[l,c,u]=El(i,s,a);return[l,c,u,...r.length>0&&r[0]<1?[r[0]]:[]]},Wn=/((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,ln=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,Ui=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,nn=/\s*/.source,fr=/\s+/.source,Al=/\s*,\s*/.source,ps=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,pr=/\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,wp=new RegExp("^rgba?\\("+nn+[Wn,Wn,Wn].join(fr)+pr+"\\)$"),Sp=new RegExp("^rgb\\("+nn+[Wn,Wn,Wn].join(Al)+nn+"\\)$"),kp=new RegExp("^rgba\\("+nn+[Wn,Wn,Wn,ln].join(Al)+nn+"\\)$"),xp=new RegExp("^hsla?\\("+nn+[ps,Ui,Ui].join(fr)+pr+"\\)$"),_p=new RegExp("^hsl?\\("+nn+[ps,Ui,Ui].join(Al)+nn+"\\)$"),Cp=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,$p=new RegExp("^lab\\("+nn+[ln,ln,ln].join(fr)+pr+"\\)$"),Ep=new RegExp("^lch\\("+nn+[ln,ln,ps].join(fr)+pr+"\\)$"),Tp=new RegExp("^oklab\\("+nn+[ln,ln,ln].join(fr)+pr+"\\)$"),Ap=new RegExp("^oklch\\("+nn+[ln,ln,ps].join(fr)+pr+"\\)$"),{round:Ip}=Math,Vo=e=>e.map((t,n)=>n<=2?Mo(Ip(t),0,255):t),mt=(e,t=0,n=100,o=!1)=>(typeof e=="string"&&e.endsWith("%")&&(e=parseFloat(e.substring(0,e.length-1))/100,o?e=t+(e+1)*.5*(n-t):e=t+e*(n-t)),+e),Bt=(e,t)=>e==="none"?t:e,Il=e=>{if(e=e.toLowerCase().trim(),e==="transparent")return[0,0,0,0];let t;if(_e.format.named)try{return _e.format.named(e)}catch{}if((t=e.match(wp))||(t=e.match(Sp))){let n=t.slice(1,4);for(let r=0;r<3;r++)n[r]=+mt(Bt(n[r],0),0,255);n=Vo(n);const o=t[4]!==void 0?+mt(t[4],0,1):1;return n[3]=o,n}if(t=e.match(kp)){const n=t.slice(1,5);for(let o=0;o<4;o++)n[o]=+mt(n[o],0,255);return n}if((t=e.match(xp))||(t=e.match(_p))){const n=t.slice(1,4);n[0]=+Bt(n[0].replace("deg",""),0),n[1]=+mt(Bt(n[1],0),0,100)*.01,n[2]=+mt(Bt(n[2],0),0,100)*.01;const o=Vo(Na(n)),r=t[4]!==void 0?+mt(t[4],0,1):1;return o[3]=r,o}if(t=e.match(Cp)){const n=t.slice(1,4);n[1]*=.01,n[2]*=.01;const o=Na(n);for(let r=0;r<3;r++)o[r]=Ip(o[r]);return o[3]=+t[4],o}if(t=e.match($p)){const n=t.slice(1,4);n[0]=mt(Bt(n[0],0),0,100),n[1]=mt(Bt(n[1],0),-125,125,!0),n[2]=mt(Bt(n[2],0),-125,125,!0);const o=Yr();Vn("d50");const r=Vo(xl(n));Vn(o);const i=t[4]!==void 0?+mt(t[4],0,1):1;return r[3]=i,r}if(t=e.match(Ep)){const n=t.slice(1,4);n[0]=mt(n[0],0,100),n[1]=mt(Bt(n[1],0),0,150,!1),n[2]=+Bt(n[2].replace("deg",""),0);const o=Yr();Vn("d50");const r=Vo(Cl(n));Vn(o);const i=t[4]!==void 0?+mt(t[4],0,1):1;return r[3]=i,r}if(t=e.match(Tp)){const n=t.slice(1,4);n[0]=mt(Bt(n[0],0),0,1),n[1]=mt(Bt(n[1],0),-.4,.4,!0),n[2]=mt(Bt(n[2],0),-.4,.4,!0);const o=Vo(El(n)),r=t[4]!==void 0?+mt(t[4],0,1):1;return o[3]=r,o}if(t=e.match(Ap)){const n=t.slice(1,4);n[0]=mt(Bt(n[0],0),0,1),n[1]=mt(Bt(n[1],0),0,.4,!1),n[2]=+Bt(n[2].replace("deg",""),0);const o=Vo(vp(n)),r=t[4]!==void 0?+mt(t[4],0,1):1;return o[3]=r,o}};Il.test=e=>wp.test(e)||xp.test(e)||$p.test(e)||Ep.test(e)||Tp.test(e)||Ap.test(e)||Sp.test(e)||kp.test(e)||_p.test(e)||Cp.test(e)||e==="transparent";Q.prototype.css=function(e){return bS(this._rgb,e)};const yS=(...e)=>new Q(...e,"css");me.css=yS;_e.format.css=Il;_e.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&Oe(e)==="string"&&Il.test(e))return"css"}});_e.format.gl=(...e)=>{const t=Ee(e,"rgba");return t[0]*=255,t[1]*=255,t[2]*=255,t};const vS=(...e)=>new Q(...e,"gl");me.gl=vS;Q.prototype.gl=function(){const e=this._rgb;return[e[0]/255,e[1]/255,e[2]/255,e[3]]};Q.prototype.hex=function(e){return ap(this._rgb,e)};const wS=(...e)=>new Q(...e,"hex");me.hex=wS;_e.format.hex=sp;_e.autodetect.push({p:4,test:(e,...t)=>{if(!t.length&&Oe(e)==="string"&&[3,4,5,6,7,8,9].indexOf(e.length)>=0)return"hex"}});const{log:Si}=Math,Rp=e=>{const t=e/100;let n,o,r;return t<66?(n=255,o=t<6?0:-155.25485562709179-.44596950469579133*(o=t-2)+104.49216199393888*Si(o),r=t<20?0:-254.76935184120902+.8274096064007395*(r=t-10)+115.67994401066147*Si(r)):(n=351.97690566805693+.114206453784165*(n=t-55)-40.25366309332127*Si(n),o=325.4494125711974+.07943456536662342*(o=t-50)-28.0852963507957*Si(o),r=255),[n,o,r,1]},{round:SS}=Math,kS=(...e)=>{const t=Ee(e,"rgb"),n=t[0],o=t[2];let r=1e3,i=4e4;const s=.4;let a;for(;i-r>s;){a=(i+r)*.5;const l=Rp(a);l[2]/l[0]>=o/n?i=a:r=a}return SS(a)};Q.prototype.temp=Q.prototype.kelvin=Q.prototype.temperature=function(){return kS(this._rgb)};const Xs=(...e)=>new Q(...e,"temp");Object.assign(me,{temp:Xs,kelvin:Xs,temperature:Xs});_e.format.temp=_e.format.kelvin=_e.format.temperature=Rp;Q.prototype.oklch=function(){return yp(this._rgb)};const xS=(...e)=>new Q(...e,"oklch");Object.assign(me,{oklch:xS});_e.format.oklch=vp;_e.autodetect.push({p:2,test:(...e)=>{if(e=Ee(e,"oklch"),Oe(e)==="array"&&e.length===3)return"oklch"}});Object.assign(me,{analyze:mp,average:_2,bezier:I2,blend:fn,brewer:lS,Color:Q,colors:ir,contrast:Z2,contrastAPCA:eS,cubehelix:U2,deltaE:rS,distance:iS,input:_e,interpolate:sr,limits:gp,mix:sr,random:q2,scale:Vi,scales:aS,valid:sS});function Mp(e){const t=me(e.primary).hex(),n=me(e.secondary).hex(),o=me(e.accent).hex(),r=e.dark??CS(t,n),i=r?"#12141a":"#ffffff",s=r?me.mix(i,t,.12,"lch").hex():me.mix(i,t,.06,"lch").hex(),a=r?me.mix(i,t,.2,"lch").hex():me.mix(i,t,.12,"lch").hex(),l=r?"#e6e6e6":"#1f2328",c=r?"#9aa5b1":"#6a737d",u=r?"#12141a":"#ffffff",d=r?me.mix(i,"#ffffff",.12,"lch").hex():me.mix(i,"#000000",.1,"lch").hex(),f=o,h=r?{tip:{accent:"#4ec9b0",soft:me.mix("#4ec9b0",i,.8,"lch").hex()},warning:{accent:"#f0a35b",soft:me.mix("#f0a35b",i,.8,"lch").hex()},info:{accent:"#61afef",soft:me.mix("#61afef",i,.8,"lch").hex()},danger:{accent:"#e06c75",soft:me.mix("#e06c75",i,.8,"lch").hex()}}:{tip:{accent:"#1a8450",soft:me.mix("#1a8450",i,.88,"lch").hex()},warning:{accent:"#b7791f",soft:me.mix("#b7791f",i,.88,"lch").hex()},info:{accent:"#1a73e8",soft:me.mix("#1a73e8",i,.88,"lch").hex()},danger:{accent:"#b42318",soft:me.mix("#b42318",i,.88,"lch").hex()}};return{primary:t,secondary:n,accent:o,bg:i,bgSoft:s,bgMuted:a,text:l,textMuted:c,textInverse:u,border:d,code:f,status:h}}function _S(e,t=!1){const n=me(e),o=n.darken(1.2).saturate(.3).hex(),[r,i,s]=n.lch(),l=me.lch(r,Math.max(i,45),(s+150)%360).hex();return{primary:n.hex(),secondary:o,accent:l,dark:t}}function CS(e,t){const n=me(e).luminance(),o=me(t).luminance();return(n+o)/2<.18}function $S(e,t){const n=me.contrast(e,t);return{pass:n>=3,ratio:Math.round(n*10)/10}}const ES=["aria-label"],TS={class:"panel-header__title tx-section"},AS={class:"panel-header__meta"},IS={class:"panel-header__actions"},RS=Ke({__name:"PanelHeader",props:{title:{},ariaLabel:{},size:{default:"md"}},emits:["close"],setup(e,{emit:t}){const n=t;return(o,r)=>(O(),P("header",{class:$e(["panel-header",`panel-header--${e.size}`]),"aria-label":e.ariaLabel},[Dr(o.$slots,"default",{},()=>[p("h3",TS,U(e.title),1)]),p("span",AS,[Dr(o.$slots,"meta",{},void 0)]),p("span",IS,[Dr(o.$slots,"actions",{},void 0),p("button",{class:"panel-header__close btn-text",type:"button",onClick:r[0]||(r[0]=i=>n("close"))},"关闭")])],10,ES))}}),hs=Ge(RS,[["__scopeId","data-v-b5ce295a"]]),MS={class:"panel"},OS={class:"panel-section"},LS={class:"preset-grid"},NS=["title","onClick"],DS={class:"preset-swatches"},PS={class:"preset-name"},BS={class:"panel-section"},FS={class:"field-row"},jS={class:"field"},HS={class:"mono"},VS={class:"field"},US={class:"mono"},zS={class:"field"},WS={class:"mono"},KS={class:"field-row inline"},qS={class:"toggle"},GS={class:"panel-section"},YS={key:0,class:"check-ok"},JS={key:1,class:"check-bad"},ZS={class:"panel-foot"},QS=["disabled"],XS=Ke({__name:"ColorCustomizer",props:{hasCustomColor:{type:Boolean}},emits:["apply","reset","close"],setup(e,{emit:t}){const n=e,o=t,r=Rn({primary:"#a83420",secondary:"#6a6655",accent:"#46573f",dark:!1}),i=Rn({previewBg:"#ffffff",contrastRatio:0,contrastPass:!0});let s=null;Pe(()=>[r.primary,r.secondary,r.accent,r.dark],()=>{const u=Mp(r);i.previewBg=u.bg;const{pass:d,ratio:f}=$S(r.primary,u.bg);i.contrastPass=d,i.contrastRatio=f,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>o("apply",{...r}),120)},{immediate:!0}),yt(()=>{s!==null&&window.clearTimeout(s)});function a(u){r.primary=u.primary,r.secondary=u.secondary,r.accent=u.accent,r.dark=!!u.dark}function l(){const u=_S(r.primary,r.dark);r.secondary=u.secondary,r.accent=u.accent}function c(){o("reset")}return(u,d)=>(O(),P("div",MS,[Me(hs,{title:"自定义配色",size:"sm",onClose:d[0]||(d[0]=f=>o("close"))}),d[13]||(d[13]=p("div",{class:"hint mono"},[p("span",null,"改动即刻应用；切主题会重置。")],-1)),p("section",OS,[d[5]||(d[5]=p("div",{class:"section-title"},"预设调色板",-1)),p("div",LS,[(O(!0),P(ue,null,Le(A(ww),f=>(O(),P("button",{key:f.id,class:"preset",title:f.description,onClick:h=>a(f)},[p("span",DS,[p("span",{class:"swatch",style:Qt({background:f.primary})},null,4),p("span",{class:"swatch",style:Qt({background:f.secondary})},null,4),p("span",{class:"swatch",style:Qt({background:f.accent})},null,4)]),p("span",PS,U(f.name),1)],8,NS))),128))])]),p("section",BS,[d[10]||(d[10]=p("div",{class:"section-title"},"三色 seed",-1)),p("div",FS,[p("label",jS,[d[6]||(d[6]=p("span",{class:"field-label"},"主色",-1)),ot(p("input",{type:"color","onUpdate:modelValue":d[1]||(d[1]=f=>r.primary=f)},null,512),[[Ut,r.primary]]),p("code",HS,U(r.primary),1)]),p("label",VS,[d[7]||(d[7]=p("span",{class:"field-label"},"辅色",-1)),ot(p("input",{type:"color","onUpdate:modelValue":d[2]||(d[2]=f=>r.secondary=f)},null,512),[[Ut,r.secondary]]),p("code",US,U(r.secondary),1)]),p("label",zS,[d[8]||(d[8]=p("span",{class:"field-label"},"点缀",-1)),ot(p("input",{type:"color","onUpdate:modelValue":d[3]||(d[3]=f=>r.accent=f)},null,512),[[Ut,r.accent]]),p("code",WS,U(r.accent),1)])]),p("div",KS,[p("label",qS,[ot(p("input",{type:"checkbox","onUpdate:modelValue":d[4]||(d[4]=f=>r.dark=f)},null,512),[[e1,r.dark]]),d[9]||(d[9]=We(" 暗底主题 ",-1))]),p("button",{class:"btn btn-ghost",onClick:l},"由主色补全")])]),p("section",GS,[d[12]||(d[12]=p("div",{class:"section-title"},"对比度",-1)),p("div",{class:$e(["check mono",{fail:!i.contrastPass}])},[d[11]||(d[11]=We(" primary × bg = ",-1)),p("strong",null,U(i.contrastRatio.toFixed(1)),1),i.contrastPass?(O(),P("span",YS,"通过 WCAG AA 3.0")):(O(),P("span",JS,"低于 3.0 · 可读性差"))],2)]),p("footer",ZS,[p("button",{class:"btn btn-ghost wide",disabled:!n.hasCustomColor,onClick:c},"还原为主题默认",8,QS)])]))}}),ek=Ge(XS,[["__scopeId","data-v-3ab45869"]]),Re=J(""),gt=J("default"),io=J(null),Zt=J(null),Sn=J("editor"),so=J(null),ki=te(()=>io.value?pa(io.value):Zt.value??pa(gt.value)),tk=["aria-valuenow","aria-valuemin","aria-valuemax"],nk=Ke({__name:"DrawerResizer",props:{width:{},min:{},max:{},defaultWidth:{}},emits:["update:width"],setup(e,{emit:t}){const n=e,o=t,r=te(()=>n.min??300);function i(k){return n.max!==void 0&&k>n.max?n.max:k<r.value?r.value:k}let s=0,a=0;function l(k){k.button===0&&(k.preventDefault(),s=k.clientX,a=n.width??n.defaultWidth,document.body.classList.add("splitter-dragging"),window.addEventListener("mousemove",c),window.addEventListener("mouseup",u,{once:!0}))}function c(k){const x=s-k.clientX;o("update:width",i(a+x))}function u(){document.body.classList.remove("splitter-dragging"),window.removeEventListener("mousemove",c)}let d=0,f=0;function h(k){k.touches.length===1&&(d=k.touches[0].clientX,f=n.width??n.defaultWidth)}function g(k){if(k.touches.length!==1)return;const x=d-k.touches[0].clientX;o("update:width",i(f+x))}function m(){o("update:width",null)}function w(k){let x=0;if(k.key==="ArrowLeft")x=24;else if(k.key==="ArrowRight")x=-24;else if(k.key==="PageUp")x=96;else if(k.key==="PageDown")x=-96;else if(k.key==="Home"){n.max!==void 0&&o("update:width",n.max),k.preventDefault();return}else if(k.key==="End"){o("update:width",r.value),k.preventDefault();return}else if(k.key==="Enter"||k.key===" "){o("update:width",null),k.preventDefault();return}else return;k.preventDefault();const L=n.width??n.defaultWidth;o("update:width",i(L+x))}return yt(()=>{window.removeEventListener("mousemove",c),document.body.classList.remove("splitter-dragging")}),(k,x)=>(O(),P("div",{class:"drawer-resizer",role:"separator","aria-orientation":"vertical","aria-label":"拖动加宽抽屉（双击恢复默认）","aria-valuenow":n.width??void 0,"aria-valuemin":r.value,"aria-valuemax":n.max,tabindex:"0",onMousedown:l,onTouchstart:h,onTouchmove:g,onTouchend:()=>{},onDblclick:m,onKeydown:w},[...x[0]||(x[0]=[p("span",{class:"drawer-resizer-handle","aria-hidden":"true"},null,-1)])],40,tk))}}),Op=Ge(nk,[["__scopeId","data-v-fe9f7c25"]]),ok={class:"palette-editor"},rk={class:"section",open:""},ik={class:"row-label"},sk=["value","onInput"],ak=["value","onInput"],lk={class:"section"},ck={class:"status-label"},uk={class:"color-row"},dk=["value","onInput"],fk=["value","onInput"],pk={class:"color-row"},hk=["value","onInput"],mk=["value","onInput"],gk=Ke({__name:"PaletteEditor",props:{palette:{},status:{}},setup(e){const t=[["primary","主色"],["secondary","次色"],["accent","点睛色"],["bg","正文底色"],["bgSoft","柔底（intro / quote 等）"],["bgMuted","极柔底（inline code）"],["text","正文文本"],["textMuted","次要文本（脚注 / hint）"],["textInverse","反白文本（暗底主题）"],["border","描边 / divider"],["code","inline code 文本色"]],n=[["tip","tip · 提示"],["info","info · 信息"],["warning","warning · 警告"],["danger","danger · 危险"]];return(o,r)=>(O(),P("div",ok,[p("details",rk,[r[0]||(r[0]=p("summary",{class:"section-title"},"色板 · palette",-1)),(O(),P(ue,null,Le(t,([i,s])=>p("label",{key:i,class:"color-row"},[p("span",ik,U(s),1),p("input",{type:"color",value:e.palette[i],onInput:a=>e.palette[i]=a.target.value},null,40,sk),p("input",{class:"hex-input",type:"text",value:e.palette[i],onInput:a=>e.palette[i]=a.target.value},null,40,ak)])),64))]),p("details",lk,[r[3]||(r[3]=p("summary",{class:"section-title"},"状态四色 · status",-1)),(O(),P(ue,null,Le(n,([i,s])=>p("div",{key:i,class:"status-block"},[p("div",ck,U(s),1),p("label",uk,[r[1]||(r[1]=p("span",{class:"row-label"},"accent",-1)),p("input",{type:"color",value:e.status[i].accent,onInput:a=>e.status[i].accent=a.target.value},null,40,dk),p("input",{class:"hex-input",type:"text",value:e.status[i].accent,onInput:a=>e.status[i].accent=a.target.value},null,40,fk)]),p("label",pk,[r[2]||(r[2]=p("span",{class:"row-label"},"soft",-1)),p("input",{type:"color",value:e.status[i].soft,onInput:a=>e.status[i].soft=a.target.value},null,40,hk),p("input",{class:"hex-input",type:"text",value:e.status[i].soft,onInput:a=>e.status[i].soft=a.target.value},null,40,mk)])])),64))])]))}}),bk=Ge(gk,[["__scopeId","data-v-4b4f114a"]]),Pa=Object.freeze({CONTRACT_VIOLATION:{exitCode:4,description:"markdown 容器/语法/嵌套错（fence_not_closed 等）"},SPEC_INVALID:{exitCode:3,description:"PersonaSpec 校验失败"},INPUT_AMBIGUOUS:{exitCode:1,description:"render 同时给 persona/theme/spec"},RESOURCE_NOT_FOUND:{exitCode:2,description:"未知 persona / 容器 / variant id"},PLATFORM_UNSUPPORTED:{exitCode:5,description:"未知 publish 平台 id"},RENDER_FAILED:{exitCode:6,description:"管线内部异常（未归类，兜底）。与 CONTRACT_VIOLATION 区分，便于 CI 程序化分支"}});Object.freeze(Object.keys(Pa));class yk extends Error{code;errors;warnings;constructor(t,n,o=[]){const r=n[0]?.message??t,i=n.length>1?` (+${n.length-1} more)`:"";super(`${t}: ${r}${i}`),this.name="WtException",this.code=t,this.errors=n,this.warnings=o}}Object.freeze(Object.fromEntries(Object.keys(Pa).map(e=>[e,Pa[e].exitCode])));function Lp(e,t,n={}){throw new yk(e,[{message:t,severity:"error",...n}])}function Rl(e,t){return e.level==="tokens"?{...t,wrapperCSS:wk(t.wrapperCSS,e.tokens)}:{...t,wrapperCSS:ea(t.wrapperCSS,e.cssPatch.wrapperCSS)??"",titleCSS:ea(t.titleCSS,e.cssPatch.titleCSS),bodyCSS:ea(t.bodyCSS,e.cssPatch.bodyCSS)}}const vk="--uv-";function wk(e,t){const n=Object.entries(t);if(n.length===0)return e;const o=n.map(([r,i])=>`${vk}${r}:${i}`).join(";");return e?`${e};${o}`:o}function ea(e,t){return t?e===""?"":e?`${e};${t}`:t:e}function Ml(e){return e.level==="tokens"||e.level==="patch"}function po(e){const{name:t,themeSlot:n,table:o,fallbackId:r,resolveAlias:i,args:s,title:a,body:l}=e;function c(u){const d=u.pageVariants?.[n],f=u.variants[n],h=d&&d in o?d:void 0,g=f&&f in o?f:void 0,m=u.attrs.variant;if(m){const L=m.toLowerCase().trim();if(L.startsWith("uv_")){const $=u.userVariants?.get(L);if($&&Ml($)&&$.base.kind===n){const N=o[$.base.variantId];if(N?.render){const D=N.render(u,s?.(u));return{id:$.id,result:Rl($,D)}}}}}let w=r;if(m){const L=m.toLowerCase().trim(),N=i?.(L)??m;N in o?w=N:w=h??g??r}else w=h??g??r;const x=(o[w]??o[r]).render(u,s?.(u));return{id:w,result:x}}return{open:u=>{const{id:d,result:f}=c(u),h=()=>a?.defaultText?typeof a.defaultText=="function"?a.defaultText(u):a.defaultText:"",g=a?u.info.trim()||h():"",m=!!a&&g!==""&&f.titleCSS!=="",w=[];if(w.push(`<section class="container-${t} container-${t}--${d}" style="${f.wrapperCSS}">`),f.svgSlot&&w.push(f.svgSlot),m&&a){const k=f.titleCSS??(typeof a.defaultCSS=="function"?a.defaultCSS(u):a.defaultCSS),x=a.iconKey&&!f.suppressIcon?u.assets[a.iconKey]??"":"";w.push(`<section class="container-${t}__title" style="${k}">${x}${G(g)}</section>`)}return l&&l.mode==="optional"&&f.bodyCSS&&w.push(`<section class="container-${t}__body" style="${f.bodyCSS}">`),w.join(`
`)+`
`},close:u=>{if(!l)return`</section>
`;const{result:d}=c(u);return(d.bodyCSS?`</section>
`:"")+`</section>
`}}}const Sk={tip:"小贴士",warning:"注意",info:"说明",danger:"警告"};function ms(e){return po({name:e,themeSlot:"admonition",table:zh,fallbackId:"accent-bar",args:()=>({kind:e}),title:{defaultText:Sk[e],defaultCSS:t=>`font-weight:700;color:${t.tokens.colors.status[e].accent};margin-bottom:6px;letter-spacing:0.3px`,iconKey:`${e}Icon`},body:{mode:"optional"}})}const kk=ms("tip"),xk=ms("warning"),_k=ms("info"),Ck=ms("danger");function pn(e,t,n,o){const r=e.attrs.variant;if(r&&r in n)return r;const i=e.variants[t];return i&&i in n?i:o}function Jr(e,t,n,o,r){const i=e.attrs.variant;if(i){const l=i.toLowerCase().trim();if(l.startsWith("uv_")){const c=e.userVariants?.get(l);if(c&&Ml(c)&&c.base.kind===t){const u=n[c.base.variantId];if(u?.render){const d=u.render(e,r?.(e));return{id:c.base.variantId,result:Rl(c,d)}}}}}const s=pn(e,t,n,o),a=n[s].render(e,r?.(e));return{id:s,result:a}}const $k={open:e=>{const t=e.info.trim();return`<section class="container-intro">
${t?`<section class="container-intro__title" style="font-weight:700;margin-bottom:10px">${G(t)}</section>`:""}`},close:`</section>
`};function Np(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",o=e.attrs.date??"",r=e.attrs.kind??"";return!n&&!o&&!r?"":t(n,o,r)}const Ek={open:e=>{const t=e.info.trim(),n=t?`<section class="container-cover__title" style="text-align:center;font-weight:700;font-size:18px;margin-bottom:10px">${G(t)}</section>`:"",o=Np(e),r=o?`<section class="container-cover__stamp" style="margin-top:12px;text-align:center">${o}</section>`:"";return`<section class="container-cover">
${n}${r}`},close:`</section>
`},Tk={open:e=>{const t=e.info.trim()||"作者",n=e.attrs.role?`<span style="color:${e.tokens.colors.textMuted};margin-left:8px">${G(e.attrs.role)}</span>`:"",o=Np(e),r=o?`<span class="container-author__stamp" style="margin-left:10px;vertical-align:middle">${o}</span>`:"";return`<section class="container-author">
<section class="container-author__header" style="margin-bottom:8px"><strong>${G(t)}</strong>${n}${r}</section>
`},close:`</section>
`},Ak={open:e=>{const t=e.info.trim(),n=pn(e,"sectionTitle",Ql,"bordered"),o=Ql[n].render(e),r=[];if(r.push(`<section class="container-section-title container-section-title--${n}" style="${o.wrapperCSS}">`),t){const i=o.svgSlot??"",s=o.titleCSS??"font-weight:700;font-size:20px";r.push(`<section class="container-section-title__label" style="${s}">${i}${G(t)}</section>`)}return r.join(`
`)+`
`},close:`</section>
`};function Ik(e){return`text-align:center;color:${e.tokens.colors.textMuted};margin-top:2px;font-size:13px`}const Rk={open:e=>{const{id:t,result:n}=Jr(e,"quote",Xl,"classic"),o=[];return o.push(`<section class="container-quote-card container-quote-card--${t}" style="${n.wrapperCSS}">`),n.svgSlot&&o.push(n.svgSlot),o.push(`<section class="container-quote-card__body" style="${n.bodyCSS??""}">`),o.join(`
`)+`
`},close:e=>{const{result:t}=Jr(e,"quote",Xl,"classic"),n=t.closeSlot??"",o=e.info.trim();if(!o)return`</section>
${n}</section>
`;const r=t.bylineCSS??Ik(e),i=t.bylinePrefix??"— ";return`</section>
${`<section class="container-quote-card__byline" style="${r}">${G(i)}${G(o)}</section>`}
${n}</section>
`}},Mk={open:e=>{const{id:t,result:n}=Jr(e,"highlight",Wh,"plain"),o=`container-highlight container-highlight--${t}`,r=n.wrapperCSS?` style="${n.wrapperCSS}"`:"";return`<section class="${o}"${r}>
`},close:`</section>
`},Ok={open:e=>{const t=pn(e,"compare",ha,"column-card"),n=ha[t].render(e,{slot:"wrapper"});return`<section class="container-compare container-compare--${t}" style="${n.wrapperCSS}">
`},close:`</section>
`};function Dp(e,t){return po({name:e,themeSlot:"compare",table:ha,fallbackId:"column-card",args:()=>({slot:e}),title:{defaultText:t,defaultCSS:"font-weight:700;margin-bottom:6px"}})}const Lk=Dp("pros","优点"),Nk=Dp("cons","缺点"),Dk=po({name:"steps",themeSlot:"steps",table:Kh,fallbackId:"number-circle",title:{defaultCSS:"font-weight:700;margin-bottom:12px"},body:{mode:"optional"}}),Pk=po({name:"divider",themeSlot:"divider",table:qh,fallbackId:"rule",resolveAlias:e=>e==="line"?"rule":void 0}),hr=function(e,t){let r=e;const i=Rr[t];let s=null,a=0,l=null;const c=[],u={},d=function(_,v){a=r*4+17,s=(function(S){const I=new Array(S);for(let C=0;C<S;C+=1){I[C]=new Array(S);for(let F=0;F<S;F+=1)I[C][F]=null}return I})(a),f(0,0),f(a-7,0),f(0,a-7),m(),g(),k(_,v),r>=7&&w(_),l==null&&(l=$(r,i,c)),x(l,v)},f=function(_,v){for(let S=-1;S<=7;S+=1)if(!(_+S<=-1||a<=_+S))for(let I=-1;I<=7;I+=1)v+I<=-1||a<=v+I||(0<=S&&S<=6&&(I==0||I==6)||0<=I&&I<=6&&(S==0||S==6)||2<=S&&S<=4&&2<=I&&I<=4?s[_+S][v+I]=!0:s[_+S][v+I]=!1)},h=function(){let _=0,v=0;for(let S=0;S<8;S+=1){d(!0,S);const I=to.getLostPoint(u);(S==0||_>I)&&(_=I,v=S)}return v},g=function(){for(let _=8;_<a-8;_+=1)s[_][6]==null&&(s[_][6]=_%2==0);for(let _=8;_<a-8;_+=1)s[6][_]==null&&(s[6][_]=_%2==0)},m=function(){const _=to.getPatternPosition(r);for(let v=0;v<_.length;v+=1)for(let S=0;S<_.length;S+=1){const I=_[v],C=_[S];if(s[I][C]==null)for(let F=-2;F<=2;F+=1)for(let E=-2;E<=2;E+=1)F==-2||F==2||E==-2||E==2||F==0&&E==0?s[I+F][C+E]=!0:s[I+F][C+E]=!1}},w=function(_){const v=to.getBCHTypeNumber(r);for(let S=0;S<18;S+=1){const I=!_&&(v>>S&1)==1;s[Math.floor(S/3)][S%3+a-8-3]=I}for(let S=0;S<18;S+=1){const I=!_&&(v>>S&1)==1;s[S%3+a-8-3][Math.floor(S/3)]=I}},k=function(_,v){const S=i<<3|v,I=to.getBCHTypeInfo(S);for(let C=0;C<15;C+=1){const F=!_&&(I>>C&1)==1;C<6?s[C][8]=F:C<8?s[C+1][8]=F:s[a-15+C][8]=F}for(let C=0;C<15;C+=1){const F=!_&&(I>>C&1)==1;C<8?s[8][a-C-1]=F:C<9?s[8][15-C-1+1]=F:s[8][15-C-1]=F}s[a-8][8]=!_},x=function(_,v){let S=-1,I=a-1,C=7,F=0;const E=to.getMaskFunction(v);for(let j=a-1;j>0;j-=2)for(j==6&&(j-=1);;){for(let R=0;R<2;R+=1)if(s[I][j-R]==null){let B=!1;F<_.length&&(B=(_[F]>>>C&1)==1),E(I,j-R)&&(B=!B),s[I][j-R]=B,C-=1,C==-1&&(F+=1,C=7)}if(I+=S,I<0||a<=I){I-=S,S=-S;break}}},L=function(_,v){let S=0,I=0,C=0;const F=new Array(v.length),E=new Array(v.length);for(let V=0;V<v.length;V+=1){const z=v[V].dataCount,fe=v[V].totalCount-z;I=Math.max(I,z),C=Math.max(C,fe),F[V]=new Array(z);for(let He=0;He<F[V].length;He+=1)F[V][He]=255&_.getBuffer()[He+S];S+=z;const je=to.getErrorCorrectPolynomial(fe),Fe=Zr(F[V],je.getLength()-1).mod(je);E[V]=new Array(je.getLength()-1);for(let He=0;He<E[V].length;He+=1){const Te=He+Fe.getLength()-E[V].length;E[V][He]=Te>=0?Fe.getAt(Te):0}}let j=0;for(let V=0;V<v.length;V+=1)j+=v[V].totalCount;const R=new Array(j);let B=0;for(let V=0;V<I;V+=1)for(let z=0;z<v.length;z+=1)V<F[z].length&&(R[B]=F[z][V],B+=1);for(let V=0;V<C;V+=1)for(let z=0;z<v.length;z+=1)V<E[z].length&&(R[B]=E[z][V],B+=1);return R},$=function(_,v,S){const I=ku.getRSBlocks(_,v),C=xu();for(let E=0;E<S.length;E+=1){const j=S[E];C.put(j.getMode(),4),C.put(j.getLength(),to.getLengthInBits(j.getMode(),_)),j.write(C)}let F=0;for(let E=0;E<I.length;E+=1)F+=I[E].dataCount;if(C.getLengthInBits()>F*8)throw"code length overflow. ("+C.getLengthInBits()+">"+F*8+")";for(C.getLengthInBits()+4<=F*8&&C.put(0,4);C.getLengthInBits()%8!=0;)C.putBit(!1);for(;!(C.getLengthInBits()>=F*8||(C.put(236,8),C.getLengthInBits()>=F*8));)C.put(17,8);return L(C,I)};u.addData=function(_,v){v=v||"Byte";let S=null;switch(v){case"Numeric":S=Bk(_);break;case"Alphanumeric":S=Fk(_);break;case"Byte":S=jk(_);break;case"Kanji":S=Hk(_);break;default:throw"mode:"+v}c.push(S),l=null},u.isDark=function(_,v){if(_<0||a<=_||v<0||a<=v)throw _+","+v;return s[_][v]},u.getModuleCount=function(){return a},u.make=function(){if(r<1){let _=1;for(;_<40;_++){const v=ku.getRSBlocks(_,i),S=xu();for(let C=0;C<c.length;C++){const F=c[C];S.put(F.getMode(),4),S.put(F.getLength(),to.getLengthInBits(F.getMode(),_)),F.write(S)}let I=0;for(let C=0;C<v.length;C++)I+=v[C].dataCount;if(S.getLengthInBits()<=I*8)break}r=_}d(!1,h())},u.createTableTag=function(_,v){_=_||2,v=typeof v>"u"?_*4:v;let S="";S+='<table style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: "+v+"px;",S+='">',S+="<tbody>";for(let I=0;I<u.getModuleCount();I+=1){S+="<tr>";for(let C=0;C<u.getModuleCount();C+=1)S+='<td style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: 0px;",S+=" width: "+_+"px;",S+=" height: "+_+"px;",S+=" background-color: ",S+=u.isDark(I,C)?"#000000":"#ffffff",S+=";",S+='"/>';S+="</tr>"}return S+="</tbody>",S+="</table>",S},u.createSvgTag=function(_,v,S,I){let C={};typeof arguments[0]=="object"&&(C=arguments[0],_=C.cellSize,v=C.margin,S=C.alt,I=C.title),_=_||2,v=typeof v>"u"?_*4:v,S=typeof S=="string"?{text:S}:S||{},S.text=S.text||null,S.id=S.text?S.id||"qrcode-description":null,I=typeof I=="string"?{text:I}:I||{},I.text=I.text||null,I.id=I.text?I.id||"qrcode-title":null;const F=u.getModuleCount()*_+v*2;let E,j,R,B,V="",z;for(z="l"+_+",0 0,"+_+" -"+_+",0 0,-"+_+"z ",V+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',V+=C.scalable?"":' width="'+F+'px" height="'+F+'px"',V+=' viewBox="0 0 '+F+" "+F+'" ',V+=' preserveAspectRatio="xMinYMin meet"',V+=I.text||S.text?' role="img" aria-labelledby="'+N([I.id,S.id].join(" ").trim())+'"':"",V+=">",V+=I.text?'<title id="'+N(I.id)+'">'+N(I.text)+"</title>":"",V+=S.text?'<description id="'+N(S.id)+'">'+N(S.text)+"</description>":"",V+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',V+='<path d="',R=0;R<u.getModuleCount();R+=1)for(B=R*_+v,E=0;E<u.getModuleCount();E+=1)u.isDark(R,E)&&(j=E*_+v,V+="M"+j+","+B+z);return V+='" stroke="transparent" fill="black"/>',V+="</svg>",V},u.createDataURL=function(_,v){_=_||2,v=typeof v>"u"?_*4:v;const S=u.getModuleCount()*_+v*2,I=v,C=S-v;return Wk(S,S,function(F,E){if(I<=F&&F<C&&I<=E&&E<C){const j=Math.floor((F-I)/_),R=Math.floor((E-I)/_);return u.isDark(R,j)?0:1}else return 1})},u.createImgTag=function(_,v,S){_=_||2,v=typeof v>"u"?_*4:v;const I=u.getModuleCount()*_+v*2;let C="";return C+="<img",C+=' src="',C+=u.createDataURL(_,v),C+='"',C+=' width="',C+=I,C+='"',C+=' height="',C+=I,C+='"',S&&(C+=' alt="',C+=N(S),C+='"'),C+="/>",C};const N=function(_){let v="";for(let S=0;S<_.length;S+=1){const I=_.charAt(S);switch(I){case"<":v+="&lt;";break;case">":v+="&gt;";break;case"&":v+="&amp;";break;case'"':v+="&quot;";break;default:v+=I;break}}return v},D=function(_){_=typeof _>"u"?2:_;const S=u.getModuleCount()*1+_*2,I=_,C=S-_;let F,E,j,R,B;const V={"██":"█","█ ":"▀"," █":"▄","  ":" "},z={"██":"▀","█ ":"▀"," █":" ","  ":" "};let fe="";for(F=0;F<S;F+=2){for(j=Math.floor((F-I)/1),R=Math.floor((F+1-I)/1),E=0;E<S;E+=1)B="█",I<=E&&E<C&&I<=F&&F<C&&u.isDark(j,Math.floor((E-I)/1))&&(B=" "),I<=E&&E<C&&I<=F+1&&F+1<C&&u.isDark(R,Math.floor((E-I)/1))?B+=" ":B+="█",fe+=_<1&&F+1>=C?z[B]:V[B];fe+=`
`}return S%2&&_>0?fe.substring(0,fe.length-S-1)+Array(S+1).join("▀"):fe.substring(0,fe.length-1)};return u.createASCII=function(_,v){if(_=_||1,_<2)return D(v);_-=1,v=typeof v>"u"?_*2:v;const S=u.getModuleCount()*_+v*2,I=v,C=S-v;let F,E,j,R;const B=Array(_+1).join("██"),V=Array(_+1).join("  ");let z="",fe="";for(F=0;F<S;F+=1){for(j=Math.floor((F-I)/_),fe="",E=0;E<S;E+=1)R=1,I<=E&&E<C&&I<=F&&F<C&&u.isDark(j,Math.floor((E-I)/_))&&(R=0),fe+=R?B:V;for(j=0;j<_;j+=1)z+=fe+`
`}return z.substring(0,z.length-1)},u.renderTo2dContext=function(_,v){v=v||2;const S=u.getModuleCount();for(let I=0;I<S;I++)for(let C=0;C<S;C++)_.fillStyle=u.isDark(I,C)?"black":"white",_.fillRect(C*v,I*v,v,v)},u};hr.stringToBytes=function(e){const t=[];for(let n=0;n<e.length;n+=1){const o=e.charCodeAt(n);t.push(o&255)}return t};hr.createStringToBytes=function(e,t){const n=(function(){const r=Uk(e),i=function(){const l=r.read();if(l==-1)throw"eof";return l};let s=0;const a={};for(;;){const l=r.read();if(l==-1)break;const c=i(),u=i(),d=i(),f=String.fromCharCode(l<<8|c),h=u<<8|d;a[f]=h,s+=1}if(s!=t)throw s+" != "+t;return a})(),o=63;return function(r){const i=[];for(let s=0;s<r.length;s+=1){const a=r.charCodeAt(s);if(a<128)i.push(a);else{const l=n[r.charAt(s)];typeof l=="number"?(l&255)==l?i.push(l):(i.push(l>>>8),i.push(l&255)):i.push(o)}}return i}};const At={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},Rr={L:1,M:0,Q:3,H:2},eo={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},to=(function(){const e=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,n=7973,o=21522,r={},i=function(s){let a=0;for(;s!=0;)a+=1,s>>>=1;return a};return r.getBCHTypeInfo=function(s){let a=s<<10;for(;i(a)-i(t)>=0;)a^=t<<i(a)-i(t);return(s<<10|a)^o},r.getBCHTypeNumber=function(s){let a=s<<12;for(;i(a)-i(n)>=0;)a^=n<<i(a)-i(n);return s<<12|a},r.getPatternPosition=function(s){return e[s-1]},r.getMaskFunction=function(s){switch(s){case eo.PATTERN000:return function(a,l){return(a+l)%2==0};case eo.PATTERN001:return function(a,l){return a%2==0};case eo.PATTERN010:return function(a,l){return l%3==0};case eo.PATTERN011:return function(a,l){return(a+l)%3==0};case eo.PATTERN100:return function(a,l){return(Math.floor(a/2)+Math.floor(l/3))%2==0};case eo.PATTERN101:return function(a,l){return a*l%2+a*l%3==0};case eo.PATTERN110:return function(a,l){return(a*l%2+a*l%3)%2==0};case eo.PATTERN111:return function(a,l){return(a*l%3+(a+l)%2)%2==0};default:throw"bad maskPattern:"+s}},r.getErrorCorrectPolynomial=function(s){let a=Zr([1],0);for(let l=0;l<s;l+=1)a=a.multiply(Zr([1,oo.gexp(l)],0));return a},r.getLengthInBits=function(s,a){if(1<=a&&a<10)switch(s){case At.MODE_NUMBER:return 10;case At.MODE_ALPHA_NUM:return 9;case At.MODE_8BIT_BYTE:return 8;case At.MODE_KANJI:return 8;default:throw"mode:"+s}else if(a<27)switch(s){case At.MODE_NUMBER:return 12;case At.MODE_ALPHA_NUM:return 11;case At.MODE_8BIT_BYTE:return 16;case At.MODE_KANJI:return 10;default:throw"mode:"+s}else if(a<41)switch(s){case At.MODE_NUMBER:return 14;case At.MODE_ALPHA_NUM:return 13;case At.MODE_8BIT_BYTE:return 16;case At.MODE_KANJI:return 12;default:throw"mode:"+s}else throw"type:"+a},r.getLostPoint=function(s){const a=s.getModuleCount();let l=0;for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1){let h=0;const g=s.isDark(d,f);for(let m=-1;m<=1;m+=1)if(!(d+m<0||a<=d+m))for(let w=-1;w<=1;w+=1)f+w<0||a<=f+w||m==0&&w==0||g==s.isDark(d+m,f+w)&&(h+=1);h>5&&(l+=3+h-5)}for(let d=0;d<a-1;d+=1)for(let f=0;f<a-1;f+=1){let h=0;s.isDark(d,f)&&(h+=1),s.isDark(d+1,f)&&(h+=1),s.isDark(d,f+1)&&(h+=1),s.isDark(d+1,f+1)&&(h+=1),(h==0||h==4)&&(l+=3)}for(let d=0;d<a;d+=1)for(let f=0;f<a-6;f+=1)s.isDark(d,f)&&!s.isDark(d,f+1)&&s.isDark(d,f+2)&&s.isDark(d,f+3)&&s.isDark(d,f+4)&&!s.isDark(d,f+5)&&s.isDark(d,f+6)&&(l+=40);for(let d=0;d<a;d+=1)for(let f=0;f<a-6;f+=1)s.isDark(f,d)&&!s.isDark(f+1,d)&&s.isDark(f+2,d)&&s.isDark(f+3,d)&&s.isDark(f+4,d)&&!s.isDark(f+5,d)&&s.isDark(f+6,d)&&(l+=40);let c=0;for(let d=0;d<a;d+=1)for(let f=0;f<a;f+=1)s.isDark(f,d)&&(c+=1);const u=Math.abs(100*c/a/a-50)/5;return l+=u*10,l},r})(),oo=(function(){const e=new Array(256),t=new Array(256);for(let o=0;o<8;o+=1)e[o]=1<<o;for(let o=8;o<256;o+=1)e[o]=e[o-4]^e[o-5]^e[o-6]^e[o-8];for(let o=0;o<255;o+=1)t[e[o]]=o;const n={};return n.glog=function(o){if(o<1)throw"glog("+o+")";return t[o]},n.gexp=function(o){for(;o<0;)o+=255;for(;o>=256;)o-=255;return e[o]},n})(),Zr=function(e,t){if(typeof e.length>"u")throw e.length+"/"+t;const n=(function(){let r=0;for(;r<e.length&&e[r]==0;)r+=1;const i=new Array(e.length-r+t);for(let s=0;s<e.length-r;s+=1)i[s]=e[s+r];return i})(),o={};return o.getAt=function(r){return n[r]},o.getLength=function(){return n.length},o.multiply=function(r){const i=new Array(o.getLength()+r.getLength()-1);for(let s=0;s<o.getLength();s+=1)for(let a=0;a<r.getLength();a+=1)i[s+a]^=oo.gexp(oo.glog(o.getAt(s))+oo.glog(r.getAt(a)));return Zr(i,0)},o.mod=function(r){if(o.getLength()-r.getLength()<0)return o;const i=oo.glog(o.getAt(0))-oo.glog(r.getAt(0)),s=new Array(o.getLength());for(let a=0;a<o.getLength();a+=1)s[a]=o.getAt(a);for(let a=0;a<r.getLength();a+=1)s[a]^=oo.gexp(oo.glog(r.getAt(a))+i);return Zr(s,0).mod(r)},o},ku=(function(){const e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(r,i){const s={};return s.totalCount=r,s.dataCount=i,s},n={},o=function(r,i){switch(i){case Rr.L:return e[(r-1)*4+0];case Rr.M:return e[(r-1)*4+1];case Rr.Q:return e[(r-1)*4+2];case Rr.H:return e[(r-1)*4+3];default:return}};return n.getRSBlocks=function(r,i){const s=o(r,i);if(typeof s>"u")throw"bad rs block @ typeNumber:"+r+"/errorCorrectionLevel:"+i;const a=s.length/3,l=[];for(let c=0;c<a;c+=1){const u=s[c*3+0],d=s[c*3+1],f=s[c*3+2];for(let h=0;h<u;h+=1)l.push(t(d,f))}return l},n})(),xu=function(){const e=[];let t=0;const n={};return n.getBuffer=function(){return e},n.getAt=function(o){const r=Math.floor(o/8);return(e[r]>>>7-o%8&1)==1},n.put=function(o,r){for(let i=0;i<r;i+=1)n.putBit((o>>>r-i-1&1)==1)},n.getLengthInBits=function(){return t},n.putBit=function(o){const r=Math.floor(t/8);e.length<=r&&e.push(0),o&&(e[r]|=128>>>t%8),t+=1},n},Bk=function(e){const t=At.MODE_NUMBER,n=e,o={};o.getMode=function(){return t},o.getLength=function(s){return n.length},o.write=function(s){const a=n;let l=0;for(;l+2<a.length;)s.put(r(a.substring(l,l+3)),10),l+=3;l<a.length&&(a.length-l==1?s.put(r(a.substring(l,l+1)),4):a.length-l==2&&s.put(r(a.substring(l,l+2)),7))};const r=function(s){let a=0;for(let l=0;l<s.length;l+=1)a=a*10+i(s.charAt(l));return a},i=function(s){if("0"<=s&&s<="9")return s.charCodeAt(0)-48;throw"illegal char :"+s};return o},Fk=function(e){const t=At.MODE_ALPHA_NUM,n=e,o={};o.getMode=function(){return t},o.getLength=function(i){return n.length},o.write=function(i){const s=n;let a=0;for(;a+1<s.length;)i.put(r(s.charAt(a))*45+r(s.charAt(a+1)),11),a+=2;a<s.length&&i.put(r(s.charAt(a)),6)};const r=function(i){if("0"<=i&&i<="9")return i.charCodeAt(0)-48;if("A"<=i&&i<="Z")return i.charCodeAt(0)-65+10;switch(i){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+i}};return o},jk=function(e){const t=At.MODE_8BIT_BYTE,n=hr.stringToBytes(e),o={};return o.getMode=function(){return t},o.getLength=function(r){return n.length},o.write=function(r){for(let i=0;i<n.length;i+=1)r.put(n[i],8)},o},Hk=function(e){const t=At.MODE_KANJI,n=hr.stringToBytes;(function(i,s){const a=n(i);if(a.length!=2||(a[0]<<8|a[1])!=s)throw"sjis not supported."})("友",38726);const o=n(e),r={};return r.getMode=function(){return t},r.getLength=function(i){return~~(o.length/2)},r.write=function(i){const s=o;let a=0;for(;a+1<s.length;){let l=(255&s[a])<<8|255&s[a+1];if(33088<=l&&l<=40956)l-=33088;else if(57408<=l&&l<=60351)l-=49472;else throw"illegal char at "+(a+1)+"/"+l;l=(l>>>8&255)*192+(l&255),i.put(l,13),a+=2}if(a<s.length)throw"illegal char at "+(a+1)},r},Pp=function(){const e=[],t={};return t.writeByte=function(n){e.push(n&255)},t.writeShort=function(n){t.writeByte(n),t.writeByte(n>>>8)},t.writeBytes=function(n,o,r){o=o||0,r=r||n.length;for(let i=0;i<r;i+=1)t.writeByte(n[i+o])},t.writeString=function(n){for(let o=0;o<n.length;o+=1)t.writeByte(n.charCodeAt(o))},t.toByteArray=function(){return e},t.toString=function(){let n="";n+="[";for(let o=0;o<e.length;o+=1)o>0&&(n+=","),n+=e[o];return n+="]",n},t},Vk=function(){let e=0,t=0,n=0,o="";const r={},i=function(a){o+=String.fromCharCode(s(a&63))},s=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return r.writeByte=function(a){for(e=e<<8|a&255,t+=8,n+=1;t>=6;)i(e>>>t-6),t-=6},r.flush=function(){if(t>0&&(i(e<<6-t),e=0,t=0),n%3!=0){const a=3-n%3;for(let l=0;l<a;l+=1)o+="="}},r.toString=function(){return o},r},Uk=function(e){const t=e;let n=0,o=0,r=0;const i={};i.read=function(){for(;r<8;){if(n>=t.length){if(r==0)return-1;throw"unexpected end of file./"+r}const l=t.charAt(n);if(n+=1,l=="=")return r=0,-1;if(l.match(/^\s$/))continue;o=o<<6|s(l.charCodeAt(0)),r+=6}const a=o>>>r-8&255;return r-=8,a};const s=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return i},zk=function(e,t){const n=e,o=t,r=new Array(e*t),i={};i.setPixel=function(c,u,d){r[u*n+c]=d},i.write=function(c){c.writeString("GIF87a"),c.writeShort(n),c.writeShort(o),c.writeByte(128),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(0),c.writeByte(255),c.writeByte(255),c.writeByte(255),c.writeString(","),c.writeShort(0),c.writeShort(0),c.writeShort(n),c.writeShort(o),c.writeByte(0);const u=2,d=a(u);c.writeByte(u);let f=0;for(;d.length-f>255;)c.writeByte(255),c.writeBytes(d,f,255),f+=255;c.writeByte(d.length-f),c.writeBytes(d,f,d.length-f),c.writeByte(0),c.writeString(";")};const s=function(c){const u=c;let d=0,f=0;const h={};return h.write=function(g,m){if(g>>>m)throw"length over";for(;d+m>=8;)u.writeByte(255&(g<<d|f)),m-=8-d,g>>>=8-d,f=0,d=0;f=g<<d|f,d=d+m},h.flush=function(){d>0&&u.writeByte(f)},h},a=function(c){const u=1<<c,d=(1<<c)+1;let f=c+1;const h=l();for(let x=0;x<u;x+=1)h.add(String.fromCharCode(x));h.add(String.fromCharCode(u)),h.add(String.fromCharCode(d));const g=Pp(),m=s(g);m.write(u,f);let w=0,k=String.fromCharCode(r[w]);for(w+=1;w<r.length;){const x=String.fromCharCode(r[w]);w+=1,h.contains(k+x)?k=k+x:(m.write(h.indexOf(k),f),h.size()<4095&&(h.size()==1<<f&&(f+=1),h.add(k+x)),k=x)}return m.write(h.indexOf(k),f),m.write(d,f),m.flush(),g.toByteArray()},l=function(){const c={};let u=0;const d={};return d.add=function(f){if(d.contains(f))throw"dup key:"+f;c[f]=u,u+=1},d.size=function(){return u},d.indexOf=function(f){return c[f]},d.contains=function(f){return typeof c[f]<"u"},d};return i},Wk=function(e,t,n){const o=zk(e,t);for(let a=0;a<t;a+=1)for(let l=0;l<e;l+=1)o.setPixel(l,a,n(l,a));const r=Pp();o.write(r);const i=Vk(),s=r.toByteArray();for(let a=0;a<s.length;a+=1)i.writeByte(s[a]);return i.flush(),"data:image/gif;base64,"+i};hr.stringToBytes;function Kk(e,t={}){const n=t.ecc??"M",o=t.margin??4,r=t.fg??"#000",i=t.bg??"#fff",s=hr(0,n);s.addData(e,"Byte"),s.make();const a=s.getModuleCount(),l=a+o*2,c=[];for(let d=0;d<a;d++)for(let f=0;f<a;f++)s.isDark(d,f)&&c.push(`M${f+o} ${d+o}h1v1h-1z`);const u=t.size?` width="${t.size}" height="${t.size}"`:"";return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${l} ${l}"${u} shape-rendering="crispEdges"><rect width="${l}" height="${l}" fill="${i}"/><path d="${c.join("")}" fill="${r}"/></svg>`}function qk(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",o=e.attrs.date??"",r=e.attrs.kind??"";return!n&&!o&&!r?"":t(n,o,r)}function Gk(e){const t=e.tokens.colors,n=e.attrs.like??"♡ 赞同",o=e.attrs.star??"★ 收藏",r=e.attrs.share??"↗ 转发",i=e.info.trim(),s=i?"":"display:table;width:100%;table-layout:fixed;border-collapse:collapse;",a=["display:table-cell","padding:12px 0","text-align:center","font-size:11px","letter-spacing:0.1em","box-sizing:border-box"],l=[...a,`color:${t.text}`,`border-right:1px solid ${t.text}`].join(";"),c=[...a,`color:${t.text}`].join(";"),u=[...a,`background-color:${t.primary}`,`color:${t.textInverse}`,"font-weight:500",`border-right:1px solid ${t.text}`].join(";"),d="display:table;width:100%;table-layout:fixed;border-collapse:collapse",f=`<span style="${l}">${G(n)}</span><span style="${u}">${G(o)}</span><span style="${c}">${G(r)}</span>`;return i?`<section class="container-footer-cta container-footer-cta--triptych-actions"><section class="container-footer-cta__kicker" style="${["display:block",`background-color:${t.text}`,`color:${t.textInverse}`,"padding:5px 10px","font-size:10px","letter-spacing:0.2em","font-weight:700"].join(";")}">${G(i)}</section><section class="container-footer-cta__cells" style="${d}">${f}</section></section>
`:`<section class="container-footer-cta container-footer-cta--triptych-actions" style="${s}">${f}</section>
`}const Yk={open:e=>{if(pn(e,"footerCTA",tc,"button-led")==="triptych-actions")return Gk(e);const n=e.info.trim()||e.kickers.footerCTATitle,o=e.attrs.cta?G(e.attrs.cta):"",r=e.attrs.href??"",i=`display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:6px 18px;box-sizing:border-box;border-radius:${e.tokens.radius.lg}px;background-color:${e.tokens.colors.primary};color:${e.tokens.colors.textInverse};text-decoration:none`,s=o?r?`<a href="${dt(r)}" data-wx-footer-cta="" style="${i}">${o}</a>`:`<span style="${i}">${o}</span>`:"",a=s?`<section class="container-footer-cta__cta" style="text-align:center;margin-top:10px">${s}</section>`:"",l=qk(e);return`<section class="container-footer-cta container-footer-cta--button-led" style="text-align:center">
`+(l?`<section class="container-footer-cta__stamp" style="text-align:center;margin-bottom:10px">${l}</section>`:"")+`<section class="container-footer-cta__title" style="font-weight:700;font-size:16px;margin-bottom:8px">${G(n)}</section>
`+a+`
`},close:e=>pn(e,"footerCTA",tc,"button-led")==="triptych-actions"?"":(e.assets.sealMark?`<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${e.assets.sealMark}</section>
`:"")+`</section>
`},Jk=po({name:"recommend",themeSlot:"recommend",table:Gh,fallbackId:"card-list",title:{defaultText:e=>e.kickers.recommend,defaultCSS:"font-weight:700;margin-bottom:10px"}});function Bp(e){const t=e.attrs.text;if(!t)return"";const n=(e.attrs.ecc??"M").toUpperCase(),r=["L","M","Q","H"].includes(n)?n:"M",i=Number(e.attrs.size??"")||160;let s;try{s=Kk(t,{ecc:r,fg:e.tokens.colors.text,bg:e.tokens.colors.bg,size:i})}catch(a){return`<section class="container-qrcode__error" style="color:${e.tokens.colors.textMuted};font-size:12px">[QR 编码失败：${G(String(a))}]</section>
`}return`<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${s}</section>
`}function ta(e,t){const n=e.tokens.colors,o=e.attrs.qr??"",r=`display:block;width:${t}px;height:${t}px`;if(e.attrs.text)return Bp(e).replace(/margin-bottom:8px/,r);if(o)return`<img src="${dt(o)}" alt="QR" style="${r}"/>`;const i=n.bg;return`<svg viewBox="0 0 60 60" width="${t}" height="${t}" style="${r}"><g fill="${n.text}"><rect x="3" y="3" width="16" height="16"/><rect x="6" y="6" width="10" height="10" fill="${i}"/><rect x="9" y="9" width="4" height="4"/><rect x="41" y="3" width="16" height="16"/><rect x="44" y="6" width="10" height="10" fill="${i}"/><rect x="47" y="9" width="4" height="4"/><rect x="3" y="41" width="16" height="16"/><rect x="6" y="44" width="10" height="10" fill="${i}"/><rect x="9" y="47" width="4" height="4"/><rect x="24" y="24" width="3" height="3"/><rect x="30" y="24" width="3" height="3"/><rect x="36" y="27" width="3" height="3"/><rect x="24" y="30" width="3" height="3"/><rect x="33" y="30" width="3" height="3"/><rect x="27" y="36" width="3" height="3"/><rect x="36" y="36" width="3" height="3"/><rect x="42" y="39" width="3" height="3"/><rect x="24" y="42" width="3" height="3"/><rect x="39" y="45" width="3" height="3"/><rect x="27" y="48" width="3" height="3"/></g></svg>`}const Zk={open:e=>{const t=pn(e,"qrcode",ec,"bare");if(t==="qr-stack"){const l=e.tokens.colors,c=e.attrs.kicker??e.kickers.qrFollowKicker,u=e.info.trim()||e.kickers.qrFollowTitle,d=e.attrs.desc??"",f=ta(e,96),h="text-align:center;line-height:0;margin-bottom:12px",g=["font-family:Menlo,Monaco,monospace","font-size:10px","font-weight:700",`color:${l.primary}`,"letter-spacing:0.25em","text-align:center"].join(";"),m=["font-size:15px","font-weight:700",`color:${l.text}`,"margin-top:6px","text-align:center","letter-spacing:-0.01em"].join(";"),w=["font-size:11px",`color:${l.textMuted}`,"margin-top:4px","line-height:1.5","text-align:center"].join(";"),k=d?`<section style="${w}">${G(d)}</section>`:"";return`<section class="container-qrcode container-qrcode--qr-stack" style="text-align:center"><section style="${h}">${f}</section><section style="${g}">${G(c)}</section><section style="${m}">${G(u)}</section>`+k+`</section>
`}if(t==="follow-card"){const l=e.tokens.colors,c=e.attrs.kicker??e.kickers.qrFollowKicker,u=e.info.trim()||e.kickers.qrFollowTitle,d=e.attrs.desc??"",f="display:table;width:100%;table-layout:auto;border-collapse:collapse",h=["display:table-cell","vertical-align:middle","padding:12px",`border-right:1px solid ${l.text}`,`background-color:${l.bg}`].join(";"),g="display:table-cell;vertical-align:middle;padding:10px 14px",m=["font-family:Menlo,Monaco,monospace","font-size:9px","font-weight:700",`color:${l.primary}`,"letter-spacing:0.2em"].join(";"),w=["font-size:14px","font-weight:700",`color:${l.text}`,"margin-top:4px","letter-spacing:-0.01em"].join(";"),k=["font-size:10px",`color:${l.textMuted}`,"margin-top:4px","line-height:1.5"].join(";"),x=d?`<section style="${k}">${G(d)}</section>`:"",L=ta(e,64);return`<section class="container-qrcode container-qrcode--follow-card" style="${f}"><span style="${h}">${L}</span><span style="${g}"><section style="${m}">${G(c)}</section><section style="${w}">${G(u)}</section>`+x+`</span></section>
`}const n=e.info.trim(),o=n?`<section class="container-qrcode__caption" style="text-align:center;color:${e.tokens.colors.textMuted};margin-bottom:8px">${G(n)}</section>`:"",r=e.attrs.desc??"",i=r?`<section class="container-qrcode__desc" style="text-align:center;color:${e.tokens.colors.textMuted};font-size:12px;line-height:1.5;margin-top:4px">${G(r)}</section>`:"",s=Number(e.attrs.size??"")||160;return`<section class="container-qrcode container-qrcode--bare" style="text-align:center">
${e.attrs.text?Bp(e):`<section class="container-qrcode__qr" style="display:inline-block;margin-bottom:8px">${ta(e,s)}</section>
`}${o}${i}
`},close:e=>{const t=pn(e,"qrcode",ec,"bare");return t==="follow-card"||t==="qr-stack"?"":`</section>
`}};function ft(e){if(!e)return"";const t=[];for(const[n,o]of Object.entries(e)){if(o==null||o==="")continue;const r=typeof o=="number"?`${o}px`:String(o).trim();r&&t.push(`${n.trim()}:${r}`)}return t.join(";")}const Qk={open:e=>{const t=e.info.trim()||"音频",n=e.attrs.voice_encode_fileid??e.attrs.fileid,o=n?`已携带 fileid=${G(n)}，粘贴到公众号后自动展开`:'粘贴到公众号后请手动选择"插入音频"',r=e.tokens.colors.primary,i=n?` data-wx-mp-fileid="${dt(n)}"`:"",s=` data-wx-mp-name="${dt(t)}"`,a=ft(e.containers.voiceCard)+";text-align:center";return`<section class="container-voice-card" data-wx-mp-kind="voice"${i}${s} style="${a}">
<section style="font-size:12px;letter-spacing:1px;color:${r};margin-bottom:6px">[ 音频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${G(t)}</section>
<section style="font-size:13px">${o}</section>
`},close:`</section>
`},Xk={open:e=>{const t=e.info.trim()||"视频",n=e.attrs.qqvid??e.attrs.vid;if(n){const l=`https://v.qq.com/txp/iframe/player.html?vid=${encodeURIComponent(n)}`;return`<section class="container-video-card" data-wx-mp-kind="video" data-wx-mp-vid="${dt(n)}">
<iframe src="${dt(l)}" frameborder="0" width="100%" height="220" allowfullscreen="true" title="${dt(t)}"></iframe>
`}const o=e.tokens.colors.primary,r=e.attrs.fileid??e.attrs.video_encode_fileid,i=r?` data-wx-mp-fileid="${dt(r)}"`:"",s=` data-wx-mp-name="${dt(t)}"`,a=ft(e.containers.videoCard)+";text-align:center";return`<section class="container-video-card" data-wx-mp-kind="video"${i}${s} style="${a}">
<section style="font-size:12px;letter-spacing:1px;color:${o};margin-bottom:6px">[ 视频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${G(t)}</section>
<section style="font-size:13px">粘贴到公众号后请手动选择"插入视频"</section>
`},close:`</section>
`},ex=po({name:"note",themeSlot:"note",table:Yh,fallbackId:"minimal-callout",title:{defaultText:"补注",defaultCSS:"font-weight:600;font-size:13px",iconKey:"noteIcon"},body:{mode:"optional"}}),tx=po({name:"announcement",themeSlot:"announcement",table:Jh,fallbackId:"danger-bar",title:{defaultCSS:"font-weight:700;font-size:14px;letter-spacing:0.5px;margin-bottom:6px"},body:{mode:"optional"}}),nx={open:e=>{const t=e.attrs.name??e.info.trim(),n=e.attrs.role??"",o=e.attrs.avatar??"",r=ft(e.containers.authorBio),i=`font-weight:700;font-size:15px;color:${e.tokens.colors.text};margin-bottom:2px`,s=`font-size:12px;color:${e.tokens.colors.textMuted};letter-spacing:0.5px;margin-bottom:8px`,a=o?`<img src="${dt(o)}" alt="${dt(t||"author")}" style="display:inline-block;width:48px;height:48px;border-radius:24px;vertical-align:middle;margin-right:12px;object-fit:cover" />`:"",l=t?`<section class="container-author-bio__name" style="${i}">${G(t)}</section>
`:"",c=n?`<section class="container-author-bio__role" style="${s}">${G(n)}</section>
`:"",u=a||l||c?`<section style="margin-bottom:8px">${a}<section style="display:inline-block;vertical-align:middle">${l}${c}</section></section>
`:"";return`<section class="container-author-bio" style="${r}">
${u}`},close:`</section>
`},ox={open:e=>{const t=e.info.trim(),n=e.attrs.src??"",o=e.attrs.alt??t,r=ft(e.containers.imageCaption),i=n?`<img src="${dt(n)}" alt="${dt(o)}" style="max-width:100%;display:block;margin:0 auto 6px;border-radius:4px" />
`:"",s=`font-size:12px;color:${e.tokens.colors.textMuted};letter-spacing:0.5px;line-height:1.6;text-align:center;margin-bottom:6px`,a=t?`<section class="container-image-caption__caption" style="${s}">${G(t)}</section>
`:"";return`<section class="container-image-caption" style="${r}">
${i}${a}`},close:`</section>
`},rx={open:e=>{const t=e.info.trim(),n=ft(e.containers.timeline),o=`font-weight:700;font-size:14px;color:${e.tokens.colors.text};letter-spacing:0.5px;margin-bottom:10px`,r=t?`<section class="container-timeline__title" style="${o}">${G(t)}</section>
`:"";return`<section class="container-timeline" style="${n}">
${r}`},close:`</section>
`},ix={open:e=>{const t=e.attrs.year??"",n=e.info.trim(),o="display:table;width:100%;table-layout:fixed;margin-bottom:10px",r=["display:table-cell","vertical-align:top","width:64px","font-family:Menlo,Monaco,monospace",`color:${e.tokens.colors.primary}`,"font-size:12px","font-weight:700","letter-spacing:0.5px","padding-right:12px"].join(";"),i="display:table-cell;vertical-align:top",s=`font-weight:600;font-size:14px;color:${e.tokens.colors.text};margin-bottom:4px;line-height:1.5`,a=n?`<section class="container-timeline-item__title" style="${s}">${G(n)}</section>
`:"";return`<section class="container-timeline-item" style="${o}">
<span style="${r}">${G(t)}</span><span style="${i}">${a}`},close:`</span></section>
`},sx={open:e=>{const t=e.info.trim()||"摘要",n=ft(e.containers.abstract),o=ft(e.innerStyles.abstractKicker);return`<section class="container-abstract" style="${n}">
<section class="container-abstract__kicker" style="${o}">${G(t)}</section>
`},close:`</section>
`},ax={open:e=>{const t=e.info.trim(),n=e.attrs.value??"0",o=e.attrs.meta??"",r=ft(e.containers.keyNumber),i=ft(e.innerStyles.keyNumberValue),s=ft(e.innerStyles.keyNumberKicker),a=t?`<section class="container-key-number__kicker" style="${s}">${G(t)}</section>
`:"",l=`<section class="container-key-number__value" style="${i}">${G(n)}</section>
`;if(o){const c=o.split(" / ").map(g=>g.trim()).filter(Boolean),u="display:table;width:100%;table-layout:auto",d="display:table-cell;vertical-align:bottom",f=["display:table-cell","vertical-align:bottom","text-align:right","font-family:Menlo,Monaco,monospace","font-size:9px","line-height:1.6","letter-spacing:0.1em","white-space:nowrap","padding-left:10px"].join(";"),h=c.map(g=>`<span style="display:block">${G(g)}</span>`).join("");return`<section class="container-key-number" style="${r}">
<section class="container-key-number__row" style="${u}"><span style="${d}">${a}${l}</span><span class="container-key-number__meta" style="${f}">${h}</span></section>
`}return`<section class="container-key-number" style="${r}">
`+a+l},close:`</section>
`},lx={open:e=>{const t=e.info.trim()||e.kickers.mastheadName,n=e.attrs.issue??"",o=e.attrs.date??"",r=e.attrs.kicker??"",i=e.tokens.colors,s=r!=="",a=`display:table;width:100%;table-layout:${s?"fixed":"auto"};`+ft(e.containers.masthead);if(s){const d=["display:table-cell","vertical-align:baseline","width:33.33%",`color:${i.text}`,"font-family:Menlo,Monaco,monospace","font-size:10px","letter-spacing:0.1em"].join(";"),f=d+";text-align:right",h=["display:table-cell","vertical-align:baseline","width:33.33%",`color:${i.primary}`,"font-family:Menlo,Monaco,monospace","font-size:10px","font-weight:700","letter-spacing:0.1em","text-align:center"].join(";");return`<section class="container-masthead container-masthead--ribbon" style="${a}">
<span class="container-masthead__kicker" style="${d}">${G(r)}</span><span class="container-masthead__name" style="${h}">${G(t)}</span><span class="container-masthead__date" style="${f}">${G(o)}</span>
`}const l=["display:table-cell","vertical-align:baseline",`color:${i.text}`,"font-size:13px","font-weight:700","letter-spacing:-0.01em"].join(";"),c=["display:table-cell","vertical-align:baseline","width:180px",`color:${i.textMuted}`,"font-family:Menlo,Monaco,monospace","font-size:11px","text-align:right"].join(";"),u=n||o?`${n?`第 ${G(n)} 期`:""}${n&&o?" · ":""}${o?G(o):""}`:"";return`<section class="container-masthead" style="${a}">
<span class="container-masthead__name" style="${l}">${G(t)}</span>`+(u?`<span class="container-masthead__meta" style="${c}">${u}</span>`:`<span style="${c}"></span>`)+`
`},close:`</section>
`},cx={open:e=>{const t=e.info.trim()||"标签",n=e.tokens.colors,o=ft(e.containers.sectionTag),r=["display:inline-block",`background-color:${n.primary}`,`color:${n.textInverse}`,"font-size:10px","letter-spacing:0.15em","padding:3px 8px"].join(";");return`<section class="container-section-tag" style="${o}"><span class="container-section-tag__pill" style="${r}">${G(t)}</span></section>
`},close:""},ux={open:e=>{const t=e.tokens.colors,n=e.attrs.cells??"",o=e.attrs.monospaceLast==="true",r=ft(e.containers.byline);if(!n)return`<section class="container-byline" style="${r}">`;const i=n.split("|").map(f=>f.trim()).filter(Boolean).map(f=>{const h=f.indexOf(":");return h<0?{kicker:"",value:f}:{kicker:f.slice(0,h).trim(),value:f.slice(h+1).trim()}}),s="display:table;width:100%;table-layout:fixed",a="display:table-cell;vertical-align:top",l=["display:block","font-size:9px","letter-spacing:0.15em",`color:${t.textMuted}`,"margin-bottom:2px"].join(";"),c=["display:block","font-size:12px","font-weight:700",`color:${t.text}`].join(";"),u=c+";font-family:Menlo,Monaco,monospace",d=i.map((f,h)=>{const g=h===0,m=h===i.length-1,w=g?"0":"12px",k=m?"0":"12px",x=m?"":`;border-right:1px solid ${t.text}`,L=`${a};padding:6px ${k} 6px ${w}${x}`,$=o&&m?u:c,N=f.kicker?`<span style="${l}">${G(f.kicker)}</span>`:"";return`<span class="container-byline__cell" style="${L}">`+N+`<span style="${$}">${G(f.value)}</span></span>`}).join("");return`<section class="container-byline" style="${r}"><section class="container-byline__row" style="${s}">${d}</section></section>
`},close:""},dx=new Set(["primary","accent","secondary"]),fx={open:e=>{const t=e.tokens.colors,n=e.attrs.chip??"",o=e.attrs.pp??"",r=e.attrs.subtitle??"",i=e.attrs.titleDot??"",s=e.attrs.br??" / ",a=Number(e.attrs.topRule??"0"),l=Number.isFinite(a)&&a>0?Math.floor(a):0,c=dx.has(i)?t[i]:"",u=ft(e.containers.editorialHeader),d=l>0?`<section class="container-editorial-header__top-rule" style="border-top:${l}px solid ${t.text};margin-bottom:12px"></section>
`:"";let f="";if(n){const N="display:table;width:100%;table-layout:fixed;margin-bottom:12px",D="display:table-cell;vertical-align:middle;width:80px",_=["display:inline-block",`background-color:${t.primary}`,`color:${t.textInverse}`,"font-size:10px","font-weight:700","padding:3px 8px","line-height:1","letter-spacing:0.05em"].join(";"),v="display:table-cell;vertical-align:middle;padding:0 10px",S=`border-top:1px solid ${t.text};height:1px;font-size:0;line-height:0`,I=["display:table-cell","vertical-align:middle","width:60px","font-family:Menlo,Monaco,monospace","font-size:9px","letter-spacing:0.2em","text-align:right",`color:${t.text}`].join(";"),C=o?`<span style="${I}">${G(o)}</span>`:"";f=`<section class="container-editorial-header__chip-row" style="${N}"><span style="${D}"><span style="${_}">${G(n)}</span></span><span style="${v}"><span style="${S}">&nbsp;</span></span>`+C+`</section>
`}const h=e.info.split(s).map(N=>N.trim()).filter(Boolean),g=["font-size:32px","font-weight:700","line-height:1.08",`color:${t.text}`,"letter-spacing:-0.03em","margin:0 0 12px 0"].join(";"),m=h.map(G),w=c?`<span style="color:${c}">.</span>`:"",k=m.length>0?m.join("<br>")+w:w,x=k?`<section class="container-editorial-header__title" style="${g}">${k}</section>
`:"",L=["font-size:13px","font-weight:500","line-height:1.4",`color:${t.text}`,"margin:0 0 14px 0"].join(";"),$=r?`<section class="container-editorial-header__subtitle" style="${L}">${G(r)}</section>
`:"";return`<section class="container-editorial-header" style="${u}">
`+d+f+x+$},close:`</section>
`},px={open:e=>{const t=e.info.trim()||e.kickers.toc,n=e.attrs.layout??"default",o=e.attrs.meta??"",r=e.tokens.colors,i=ft(e.containers.toc),s=[`color:${r.primary}`,"font-size:10px","font-weight:700","letter-spacing:0.15em","margin-bottom:6px"].join(";");if(n==="split"){const a="display:table;width:100%;table-layout:fixed",l=["display:table-cell","vertical-align:top","width:33%","padding:12px 14px 12px 0",`border-right:1px solid ${r.text}`].join(";"),c=["display:table-cell","vertical-align:top","padding:12px 0 12px 14px","font-size:11px","line-height:1.85"].join(";"),u=o.split(" / ").map(g=>g.trim()).filter(Boolean),d=u.map(g=>`<span style="display:block">${G(g)}</span>`).join(""),f=["font-size:9px",`color:${r.text}`,"line-height:1.7"].join(";"),h=u.length?`<section class="container-toc__meta" style="${f}">${d}</section>`:"";return`<section class="container-toc container-toc--split" style="${i}"><section class="container-toc__row" style="${a}"><span class="container-toc__left" style="${l}"><section class="container-toc__kicker" style="${s}">${G(t)}</section>`+h+`</span><span class="container-toc__right" style="${c}">
`}return`<section class="container-toc" style="${i}">
<section class="container-toc__kicker" style="${s}">${G(t)}</section>
`},close:e=>(e.attrs.layout??"default")==="split"?`</span></section></section>
`:`</section>
`},hx={open:e=>{const t=e.attrs.no??"",n=e.attrs.page??"",o=e.info.trim(),r=e.tokens.colors,i=["display:table","width:100%","table-layout:auto","font-size:12px","line-height:1.75","padding:1px 0"].join(";"),s=["display:table-cell","vertical-align:baseline","width:30px","padding-right:10px","font-family:Menlo,Monaco,monospace",`color:${r.primary}`,"font-size:11px"].join(";"),a=["display:table-cell","vertical-align:baseline",`color:${r.text}`].join(";"),l=["display:table-cell","vertical-align:baseline","width:56px","padding-left:10px","font-family:Menlo,Monaco,monospace",`color:${r.textMuted}`,"font-size:11px","text-align:right"].join(";");return`<section class="container-toc-item" style="${i}"><span style="${s}">${G(t)}</span><span style="${a}">${G(o)}</span><span style="${l}">${G(n)}</span></section>
`},close:""},mx={open:e=>{const t=e.tokens.colors,n=e.attrs.next??"",o=e.attrs.issue??"",r=ft(e.containers.colophon),i=[`border-top:1px solid ${t.text}`,"margin-top:20px","padding-top:12px"].join(";"),s=`display:table;width:100%;table-layout:fixed;font-size:11px;line-height:1.6;color:${t.text};${r||i}`,a="display:table-cell;vertical-align:top",l="display:table-cell;vertical-align:top;text-align:right",c=["display:block",`color:${t.textMuted}`,"font-size:10px","letter-spacing:0.1em","margin-bottom:3px"].join(";");return`<section class="container-colophon" style="${s}"><span style="${a}"><span style="${c}">${G(e.kickers.colophonNextLabel)}</span>${G(n)}</span><span style="${l}"><span style="${c}">${G(e.kickers.colophonIssueLabel)}</span>${G(o)}</span></section>
`},close:""};function gx(e){if(!e)return[];const t=[];for(const n of e.split(",")){const o=Number(n.trim());Number.isFinite(o)&&t.push(o)}return t}function bx(e,t=110){if(e.length===0)return{points:"",lastY:7};if(e.length===1)return{points:`0,7 ${t},7`,lastY:7};const n=Math.min(...e),o=Math.max(...e),r=o-n,i=t/(e.length-1),s=2,a=10,l=u=>r===0?7:s+(o-u)/r*a;return{points:e.map((u,d)=>`${(d*i).toFixed(1)},${l(u).toFixed(2)}`).join(" "),lastY:l(e[e.length-1])}}function yx(e,t){if(!e)return t.textMuted;const n=e.trim();return n.startsWith("-")||n.startsWith("−")||n.startsWith("+")?t.status.danger.accent:t.textMuted}function vx(e,t){return e==="flat"?t.textMuted:e==="up"||e==="down"?t.status.danger.accent:t.textMuted}const zi=[],wx={open:e=>{const t=e.info.trim()||"KEY METRICS",n=e.attrs.period??"",o=e.attrs.source??"";zi.push({source:o,itemCount:0});const r=e.tokens.colors,i=ft(e.containers.kpiDashboard),s=["display:table","width:100%","table-layout:auto","margin-bottom:14px","padding-bottom:8px",`border-bottom:1px solid ${r.border}`].join(";"),a=["display:table-cell","vertical-align:baseline","font-family:Menlo,Monaco,monospace",`color:${r.text}`,"font-size:10px","letter-spacing:0.15em"].join(";"),l=["display:table-cell","vertical-align:baseline","width:160px","font-family:Menlo,Monaco,monospace",`color:${r.textMuted}`,"font-size:9px","letter-spacing:0.05em","text-align:right"].join(";"),c=["display:table","width:100%","table-layout:fixed"].join(";");return`<section class="container-kpi-dashboard" style="${i}">
<section class="container-kpi-dashboard__header" style="${s}"><span style="${a}">${G(t)}</span><span style="${l}">${G(n)}</span></section>
<section class="container-kpi-dashboard__grid" style="${c}">
`},close:e=>{const n=zi.pop()?.source??"",o=e.tokens.colors,r=["margin-top:12px","padding-top:8px",`border-top:1px solid ${o.border}`,"font-family:Menlo,Monaco,monospace","font-size:9px",`color:${o.textMuted}`,"letter-spacing:0.05em"].join(";");return`</section>
${n?`<section class="container-kpi-dashboard__source" style="${r}">SOURCE · ${G(n)}</section>
`:""}</section>
`}},Sx={open:e=>{const t=e.attrs.label??"",n=e.attrs.caption??"",o=e.attrs.value??"0",r=e.attrs.unit??"",i=e.attrs.delta??"",s=e.attrs.trend??"flat",a=gx(e.attrs.series),l=e.attrs.foot??"",c=e.tokens.colors,u=zi[zi.length-1],d=u?u.itemCount:0;u&&(u.itemCount=d+1);const m=["display:table-cell","vertical-align:top","width:33.33%",`padding:0 8px 0 ${d===0?0:8}px`,`border-right:1px solid ${c.border}`].join(";"),w=["display:table","width:100%","table-layout:auto","margin-bottom:12px"].join(";"),k=["display:table-cell","vertical-align:baseline","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${c.textMuted}`].join(";"),x=["display:table-cell","vertical-align:baseline","width:60px","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${yx(i,c)}`,"text-align:right"].join(";"),L=["font-size:10px",`color:${c.textMuted}`,"margin-bottom:2px"].join(";"),$=["display:inline-block","margin-bottom:10px","vertical-align:baseline","white-space:nowrap"].join(";"),N=["font-size:30px","font-weight:700","line-height:0.9",`color:${c.text}`,"letter-spacing:-0.03em"].join(";"),D=["font-size:11px","font-weight:500",`color:${c.textMuted}`,"margin-left:3px"].join(";"),_=["display:table","width:100%","table-layout:auto","font-family:Menlo,Monaco,monospace","font-size:9px",`color:${c.textMuted}`,"line-height:1.4","margin-top:4px"].join(";"),v="display:table-cell;vertical-align:top;word-break:break-all",S="display:table-cell;vertical-align:top;text-align:right;padding-left:4px;word-break:break-all",I=vx(s,c),{points:C,lastY:F}=bx(a),E=C?`<svg viewBox="0 0 110 14" width="100%" height="14" preserveAspectRatio="none" style="display:block"><line x1="0" y1="7" x2="110" y2="7" stroke="${c.border}" stroke-width="1"/><polyline points="${C}" fill="none" stroke="${I}" stroke-width="1.2"/><circle cx="110" cy="${F.toFixed(2)}" r="2" fill="${I}"/></svg>`:"",[j,R]=l.includes("→")?l.split("→").map(V=>V.trim()):[l,""],B=j||R?`<section style="${_}"><span style="${v}">${G(j)}</span><span style="${S}">${G(R)}</span></section>`:"";return`<section class="container-kpi-item" style="${m}">
<section style="${w}"><span style="${k}">${G(t)}</span><span style="${x}">${G(i)}</span></section>
<section style="${L}">${G(n)}</section>
<section style="${$}"><span style="${N}">${G(o)}</span><span style="${D}">${G(r)}</span></section>
`+E+`
`+B+`
`},close:`</section>
`},Wi=[],Fp="72px",jp="48px",kx=/^\d+(?:px|%|em|rem|ch)?$/;function Ki(e,t){if(!e)return t;const n=e.trim();return kx.test(n)?/^\d+$/.test(n)?`${n}px`:n:t}const xx={open:e=>{const t=e.info.trim()||"",n=e.attrs.subtitle??"",o=Ki(e.attrs.labelWidth,Fp),r=Ki(e.attrs.valueWidth,jp);Wi.push({labelWidth:o,valueWidth:r});const i=e.tokens.colors,s=ft(e.containers.barChart),a=["font-size:12px","font-weight:700",`color:${i.text}`,"margin-bottom:4px"].join(";"),l=["font-size:10px",`color:${i.textMuted}`,"margin-bottom:14px"].join(";"),c=t?`<section class="container-bar-chart__title" style="${a}">${G(t)}</section>
`:"",u=n?`<section class="container-bar-chart__subtitle" style="${l}">${G(n)}</section>
`:"";return`<section class="container-bar-chart" style="${s}">
${c}${u}`},close:()=>(Wi.pop(),`</section>
`)},_x={open:e=>{const t=e.attrs.label??"",n=Number(e.attrs.pct??"0"),o=Number.isFinite(n)?Math.max(0,Math.min(100,n)):0,r=e.attrs.value??"",i=e.attrs.tone??"normal",s=e.tokens.colors,a=i==="warn"?s.status.danger.accent:s.primary,l=Wi[Wi.length-1],c=Ki(e.attrs.labelWidth,l?.labelWidth??Fp),u=Ki(e.attrs.valueWidth,l?.valueWidth??jp),d=["display:table","width:100%","table-layout:fixed","font-family:Menlo,Monaco,monospace","font-size:11px","margin-bottom:6px"].join(";"),f=["display:table-cell",`width:${c}`,"vertical-align:middle",`color:${s.text}`].join(";"),h=["display:table-cell","padding:0 6px","vertical-align:middle"].join(";"),g=["display:table-cell",`width:${u}`,"vertical-align:middle","text-align:right",`color:${s.text}`].join(";"),m=["display:block","width:100%",`background-color:${s.border}`,"height:10px"].join(";"),w=["display:block",`background-color:${a}`,"height:10px",`width:${o}%`].join(";");return`<section class="container-bar" style="${d}"><span style="${f}">${G(t)}</span><span style="${h}"><section style="${m}"><section style="${w}"></section></section></span><span style="${g}">${G(r)}</span></section>
`},close:""},Cx={open:e=>{const{id:t,result:n}=Jr(e,"qaBlock",nc,"numbered-faq"),o=n.qaBlock??{kickerHtml:"",qHtml:"",aOpenHtml:""};return`<section class="container-qa-block container-qa-block--${t}" style="${n.wrapperCSS}">
`+o.kickerHtml+o.qHtml+o.aOpenHtml},close:e=>{const{result:t}=Jr(e,"qaBlock",nc,"numbered-faq");return(t.qaBlock??{aCloseHtml:""}).aCloseHtml+`</section>
`}},$x=po({name:"footnotes",themeSlot:"footnotes",table:Zh,fallbackId:"lined",title:{defaultCSS:e=>[`color:${e.tokens.colors.primary}`,"font-size:10px","font-weight:700","letter-spacing:0.15em","margin-bottom:6px","text-indent:0"].join(";")}});function Ex(e){return[`color:${e.tokens.colors.text}`,"font-size:18px","font-weight:600","line-height:1.7","letter-spacing:0.2px","margin-top:0","margin-bottom:0"].join(";")}function Tx(e){return[`color:${e.tokens.colors.textMuted}`,"font-size:13px","line-height:1.6","margin-top:10px","text-align:left"].join(";")}function _u(e){const t=Qh,n=e.attrs.variant;if(n){const r=n.toLowerCase().trim();if(r.startsWith("uv_")){const i=e.userVariants?.get(r);if(i&&Ml(i)&&i.base.kind==="pullQuote"){const s=t[i.base.variantId];if(s?.render)return{id:i.id,result:Rl(i,s.render(e))}}}}const o=pn(e,"pullQuote",t,"giant-mark");return{id:o,result:t[o].render(e)}}const Ax={open:e=>{const{id:t,result:n}=_u(e),o=n.quoteCSS??Ex(e),i=[`<style>.container-pull-quote--${t} > .container-pull-quote__body > p {${o}}</style>`,`<section class="container-pull-quote container-pull-quote--${t}" style="${n.wrapperCSS}">`];return n.svgSlot&&i.push(n.svgSlot),i.push(`<section class="container-pull-quote__body" style="${n.bodyCSS??""}">`),i.join(`
`)+`
`},close:e=>{const{result:t}=_u(e),n=e.info.trim();if(!n)return`</section>
</section>
`;const o=t.bylineCSS??Tx(e),r=t.bylinePrefix??"— ";return`${`<section class="container-pull-quote__byline" style="${o}">${G(r)}${G(n)}</section>`}
</section>
</section>
`}},Ix={DEV:!1};function Rx(){if(typeof import.meta>"u")return!1;const e=Ix;return e?e.DEV===!0:!1}function Hp(e,t){Rx()&&console.warn(`[${e}] ${t}`)}const qi=[];function Mx(e){return e?e.split("|").map(t=>t.trim()):[]}function Vp(e){return e.startsWith("\\*")?{recommend:!1,text:e.slice(1)}:e.startsWith("*")?{recommend:!0,text:e.slice(1).trim()}:{recommend:!1,text:e}}const Cu=new Set;function Ox(e,t,n){const o=`${e}::${t}`;Cu.has(o)||(Cu.add(o),console.warn(`[wechat-typeset] table-card[${e}] ${n}`))}const Lx={open:e=>{const t=pn(e,"tableCard",oc,"rule-grid");qi.push({variantId:t,rowCount:0,columnsCount:0,highlightCols:new Set,bodyRowsRendered:0});const n=ft(e.containers.tableCard),o=oc[t].render(e),r=[n,o.wrapperCSS].filter(Boolean).join(";"),i=e.info.trim(),a=["font-weight:700","font-size:13px",`color:${e.tokens.colors.text}`,"letter-spacing:0.5px","margin-bottom:8px"].join(";"),l=i?`<section class="container-table-card__title" style="${a}">${G(i)}</section>
`:"",u=["display:table","width:100%","table-layout:fixed","border-collapse:separate",`border-spacing:${t==="price-tier"?"3px 0":"0"}`].join(";");return`<section class="container-table-card container-table-card--${t}" style="${r}">
`+l+`<section class="container-table-card__grid" style="${u}">
`},close:()=>(qi.pop(),`</section>
</section>
`)},Nx={open:e=>{const t=qi[qi.length-1];if(!t)return"";const n=e.attrs.header==="true",o=Mx(e.attrs.cells);t.rowCount===0?(t.columnsCount=o.length,t.variantId==="price-tier"&&o.forEach((i,s)=>{Vp(i).recommend&&t.highlightCols.add(s)})):o.length!==t.columnsCount&&Hp("table-card:cells",`第 ${t.rowCount+1} 行 cells 列数 ${o.length} 与首行 ${t.columnsCount} 不一致：多余列被截断、缺失列留空。检查 attrs.cells 的 "|" 分隔符是否漏写或多写。`),t.rowCount+=1;const r=n?-1:t.bodyRowsRendered;switch(n||(t.bodyRowsRendered+=1),t.variantId){case"zebra-rows":return Bx(e,o,n,r);case"key-value":return Fx(e,o,n);case"price-tier":return jx(e,o,n,r,t.highlightCols);case"three-line-table":return Hx(e,o,n);case"index-table":return Vx(e,o,n);case"matrix":return Ux(e,o,n);case"rule-grid":default:return Px(e,o,n)}},close:""};function Dx(e){return Vp(e).text}function Px(e,t,n){const o=e.tokens.colors,i=(100/(t.length||1)).toFixed(2),s="display:table-row",a=n?o.bgMuted:o.bg,l=n?o.accent:o.text,c=n?700:400,u=t.map((d,f)=>{const h=f===t.length-1;return`<span style="${["display:table-cell",`width:${i}%`,"vertical-align:middle",`background-color:${a}`,`color:${l}`,`font-weight:${c}`,"font-size:13px","line-height:1.5","padding:8px 10px",`border-bottom:1px solid ${o.border}`,h?"":`border-right:1px solid ${o.border}`].filter(Boolean).join(";")}">${G(d)}</span>`}).join("");return`<section class="container-table-row" style="${s}">${u}</section>
`}function Bx(e,t,n,o){const r=e.tokens.colors,s=(100/(t.length||1)).toFixed(2),a="display:table-row",l=n?"transparent":o%2===0?r.bgSoft:r.bg,c=n?r.textMuted:r.text,u=n?700:400,d=n?"11px":"13px",f=n?"0.1em":"normal",h=n?"uppercase":"none",g=t.map(m=>`<span style="${["display:table-cell",`width:${s}%`,"vertical-align:middle",`background-color:${l}`,`color:${c}`,`font-weight:${u}`,`font-size:${d}`,`letter-spacing:${f}`,`text-transform:${h}`,"line-height:1.5","padding:10px 12px",n?`border-bottom:1px solid ${r.border}`:""].filter(Boolean).join(";")}">${G(m)}</span>`).join("");return`<section class="container-table-row" style="${a}">${g}</section>
`}function Fx(e,t,n){const o=e.tokens.colors,r="display:table-row";if(n){const c=t.join(" · "),u=["display:table-cell","width:100%","vertical-align:middle",`background-color:${o.bgSoft}`,`color:${o.text}`,"font-weight:700","font-size:12px","letter-spacing:0.1em","text-transform:uppercase","text-align:center","padding:10px 12px",`border-bottom:1px solid ${o.border}`].join(";");return`<section class="container-table-row" style="${r}"><span style="${u}">${G(c)}</span></section>
`}t.length!==2&&Ox("key-value","row-arity",`row cells.length=${t.length}，应为 2（左 key / 右 value）；少列补空、多列截断`);const i=t[0]??"",s=t[1]??"",a=["display:table-cell","width:35%","vertical-align:middle",`background-color:${o.bgSoft}`,`color:${o.textMuted}`,"font-weight:600","font-family:Menlo,Monaco,monospace","font-size:12px","text-align:right","padding:10px 12px",`border-bottom:1px solid ${o.border}`].join(";"),l=["display:table-cell","width:65%","vertical-align:middle",`color:${o.text}`,"font-size:13px","line-height:1.5","text-align:left","padding:10px 14px",`border-bottom:1px solid ${o.border}`].join(";");return`<section class="container-table-row" style="${r}"><span style="${a}">${G(i)}</span><span style="${l}">${G(s)}</span></section>
`}function jx(e,t,n,o,r){const i=e.tokens.colors,a=(100/(t.length||1)).toFixed(2),l="display:table-row",c=!n&&o===0,u=t.map((d,f)=>{const h=Dx(d),m=r.has(f)?i.accent:i.primary,w=n?i.bgSoft:i.bg,k=i.text,x=n||c?700:400,L=n?"14px":c?"16px":"12px",$=n?"12px":"10px",N=n?`border-top:3px solid ${m}`:"";return`<span style="${["display:table-cell",`width:${a}%`,"vertical-align:middle",`background-color:${w}`,`color:${k}`,`font-weight:${x}`,`font-size:${L}`,"line-height:1.4","text-align:center",`padding:${$} 8px`,N,`border-bottom:1px solid ${i.border}`].filter(Boolean).join(";")}">${G(h)}</span>`}).join("");return`<section class="container-table-row" style="${l}">${u}</section>
`}function Hx(e,t,n){const o=e.tokens.colors,i=(100/(t.length||1)).toFixed(2),s="display:table-row",a=n?o.textMuted:o.text,l=n?600:400,c=n?"11px":"13px",u=n?"0.08em":"normal",d=n?"uppercase":"none",f=t.map(h=>`<span style="${["display:table-cell",`width:${i}%`,"vertical-align:middle",`color:${a}`,`font-weight:${l}`,`font-size:${c}`,`letter-spacing:${u}`,`text-transform:${d}`,"line-height:1.5","padding:10px 12px",n?`border-bottom:1px solid ${o.text}`:""].filter(Boolean).join(";")}">${G(h)}</span>`).join("");return`<section class="container-table-row" style="${s}">${f}</section>
`}function Vx(e,t,n){const o=e.tokens.colors,r=t.length||1,i=(100/r).toFixed(2),s="display:table-row",a=600,l=t.map((c,u)=>{const d=u===0||u===r-1,f=u===t.length-1,h="transparent",g=n||d?o.textMuted:o.text,m=n?a:400,w=n?"11px":d?"12px":"13px",k=!n&&d?"font-family:Menlo,Monaco,monospace":"",x=!n&&f?"text-align:right":"text-align:left",L=n?`border-bottom:1px solid ${o.text}`:`border-bottom:1px dashed ${o.border}`;return`<span style="${["display:table-cell",`width:${i}%`,"vertical-align:middle",`background-color:${h}`,`color:${g}`,`font-weight:${m}`,`font-size:${w}`,k,n?"letter-spacing:0.08em":"",n?"text-transform:uppercase":"",x,"line-height:1.5","padding:10px 12px",L].filter(Boolean).join(";")}">${G(c)}</span>`}).join("");return`<section class="container-table-row" style="${s}">${l}</section>
`}function Ux(e,t,n){const o=e.tokens.colors,r=36,i=50,s="display:table-row";if(n){const u=["display:table-cell",`width:${i}px`,`height:${r}px`,"vertical-align:middle","text-align:right","padding-right:8px",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.1em","text-transform:uppercase","font-weight:600"].join(";"),d=["display:table-cell",`width:${r}px`,`height:${r}px`,"vertical-align:middle","text-align:center",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.1em","text-transform:uppercase","font-weight:600"].join(";"),f=t.map((h,g)=>g===0?`<span style="${u}">${G(h)}</span>`:`<span style="${d}">${G(h)}</span>`).join("");return`<section class="container-table-row" style="${s}">${f}</section>
`}const a=["display:table-cell",`width:${i}px`,`height:${r}px`,"vertical-align:middle","text-align:right","padding-right:8px",`color:${o.text}`,"font-size:11px","font-weight:600"].join(";"),l=["display:table-cell",`width:${r}px`,`height:${r}px`,"vertical-align:middle","text-align:center",`background-color:${o.primary}`,`color:${o.textInverse}`,"font-size:11px","font-weight:700",`border:1px solid ${o.bg}`].join(";"),c=t.map((u,d)=>d===0?`<span style="${a}">${G(u)}</span>`:`<span style="${l}">${G(u)}</span>`).join("");return`<section class="container-table-row" style="${s}">${c}</section>
`}const Gi=[],zx={open:e=>{const t=pn(e,"gallery",Es,"duo");Gi.push({variantId:t,itemCount:0});const o=(Es[t]??Es.duo).render(e),i=[ft(e.containers.gallery),o.wrapperCSS].filter(Boolean).join(";"),s=o.bodyCSS??"display:table;width:100%;table-layout:fixed;border-spacing:8px 0",a=e.info.trim(),l=["font-weight:700",`color:${e.tokens.colors.text}`,"font-size:13px","letter-spacing:0.5px","margin-bottom:8px"].join(";"),c=a?`<section class="container-gallery__title" style="${l}">${G(a)}</section>
`:"";return`<section class="container-gallery container-gallery--${t}" style="${i}">
`+c+`<section class="container-gallery__grid" style="${s}">
`},close:()=>(Gi.pop(),`</section>
</section>
`)},Wx={open:e=>{const t=Gi[Gi.length-1];if(!t)return"";const n=e.attrs.src??"",o=e.attrs.alt??e.info.trim(),r=e.info.trim();switch(t.itemCount+=1,t.variantId){case"triptych":return qx(e,n,o,r);case"nine-grid":return Gx(e,n,o,r);case"ribbon-strip":return Yx(e,n,o,r);case"duo":default:return Kx(e,n,o,r)}},close:""};function Kx(e,t,n,o){const r="display:table-cell;width:50%;vertical-align:top",i="max-width:100%;display:block;border-radius:4px;margin:0 auto",s=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;return gs("duo",r,t,n,o,i,s)}function qx(e,t,n,o){const r="display:table-cell;width:33.33%;vertical-align:top",i="width:100%;height:140px;object-fit:cover;display:block;border-radius:4px",s=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:6px;line-height:1.5`;return gs("triptych",r,t,n,o,i,s)}function Gx(e,t,n,o){const r="display:inline-block;width:32%;margin-right:1%;margin-bottom:1%;vertical-align:top",i="width:100%;aspect-ratio:1;object-fit:cover;display:block;border-radius:2px",s=`font-size:9px;color:${e.tokens.colors.textMuted};text-align:center;margin-top:2px;line-height:1.3`;return gs("nine-grid",r,t,n,o,i,s)}function Yx(e,t,n,o){const r="display:inline-block;width:64%;margin-right:8px;vertical-align:top;white-space:normal",i="max-width:100%;height:180px;object-fit:cover;display:block;border-radius:4px",s=`font-size:12px;color:${e.tokens.colors.textMuted};text-align:left;margin-top:6px;line-height:1.5`;return gs("ribbon-strip",r,t,n,o,i,s)}function gs(e,t,n,o,r,i,s){const a=n?`<img src="${dt(n)}" alt="${dt(o)}" style="${i}" />`:"",l=r?`<section style="${s}">${G(r)}</section>`:"";return`<section class="container-image-item container-image-item--${e}" style="${t}">${a}${l}</section>
`}const qo=[],Jx={open:e=>{const t=pn(e,"dialogue",Ts,"qa-rows");qo.push({variantId:t,turnCount:0});const o=(Ts[t]??Ts["qa-rows"]).render(e),r=ft(e.containers.dialogue)+";"+o.wrapperCSS,i=e.info.trim(),a=["font-weight:700",`color:${e.tokens.colors.text}`,"font-size:14px","letter-spacing:0.5px","margin-bottom:12px"].join(";"),l=i?`<section class="container-dialogue__title" style="${a}">${G(i)}</section>
`:"";return`<section class="container-dialogue container-dialogue--${t}" style="${r}">
`+l},close:()=>(qo.pop(),`</section>
`)},Zx={open:e=>{const t=qo[qo.length-1];if(!t)return"";const n=e.attrs.name??e.attrs.speaker??"",o=e.attrs.role??"",r=e.attrs.side,i=r??"left";r!==void 0&&t.variantId!=="chat-bubbles"&&Hp("dialogue:side",`side="${r}" 仅 chat-bubbles 骨架消费，当前 variant="${t.variantId}" 会忽略此 attr。要左右气泡请给 dialogue 加 variant=chat-bubbles。`),t.turnCount+=1;const s=t.turnCount-1;switch(t.variantId){case"chat-bubbles":return t_(e,n,i);case"name-prefix":return o_(e,n);case"interview-column":return i_(e,n,o);case"audio-stamp":return a_(e,n,o,e.attrs.timestamp??"");case"qa-rows":default:return Xx(e,n,o,s)}},close:()=>{const e=qo[qo.length-1];if(!e)return"";switch(e.variantId){case"chat-bubbles":return n_();case"name-prefix":return r_();case"interview-column":return s_();case"audio-stamp":return l_();case"qa-rows":default:return e_()}}};function Qx(e,t,n){const o=e.trim();if(o==="Q"||o==="q"||o==="主持人"||o==="提问"||o==="问")return!0;if(o==="A"||o==="a"||o==="答"||o==="回答"||o)return!1;const r=t.trim();if(r){if(/[Qq问]|主持人|提问|买家|客户|用户/.test(r))return!0;if(/[Aa答]|商家|客服|主播/.test(r))return!1}return n%2===0}function Xx(e,t,n,o){const r=e.tokens.colors,i=Qx(n,t,o),s=["display:table","width:100%","table-layout:fixed",o===0?"margin-top:0":"margin-top:18px"].join(";"),a="display:table-cell;vertical-align:top;width:32px;padding-right:10px",l=i?["display:inline-block","width:24px","height:24px",`background-color:${r.primary}`,`color:${r.textInverse}`,"text-align:center","line-height:24px","font-size:12px","font-weight:700","letter-spacing:0"].join(";"):["display:inline-block","width:24px","height:24px","background-color:transparent",`border:1px solid ${r.textMuted}`,`color:${r.textMuted}`,"text-align:center","line-height:22px","font-size:12px","font-weight:700"].join(";"),c="display:table-cell;vertical-align:top",u=["display:block",`color:${r.textMuted}`,"font-size:11px","letter-spacing:0.1em","margin-bottom:4px","font-weight:600"].join(";"),d=`color:${r.text};font-size:14px;line-height:1.7`,f=i?"Q":"A",h=t?`<span style="${u}">${G(t)}</span>`:"";return`<section class="container-dialogue-turn" style="${s}"><span style="${a}"><span style="${l}">${f}</span></span><span style="${c}">${h}<span style="${d}">`}function e_(){return`</span></span></section>
`}const Up=[];function t_(e,t,n){const o=e.tokens.colors,r=n==="right",i=(t||"?").slice(0,1),s=r?o.primary:o.textMuted,a=o.bgSoft,l="display:table-cell;vertical-align:top;width:36px",c=`<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top"><circle cx="14" cy="14" r="14" fill="${s}"/><text x="14" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="${o.textInverse}">${G(i)}</text></svg>`;Up.push({tailAfter:r?$u(a,"right"):"",rightAvatarHtml:r?`<span style="${l}">${c}</span>`:`<span style="${l}"></span>`});const u=["display:table","width:100%","table-layout:fixed","margin-top:14px"].join(";"),d=["display:table-cell","vertical-align:top","padding:0 8px",r?"text-align:right":"text-align:left"].join(";"),f=["display:block",`color:${o.textMuted}`,"font-size:11px","margin-bottom:3px"].join(";"),h=["display:inline-block",`background-color:${a}`,`color:${o.text}`,"padding:10px 14px","border-radius:12px","font-size:14px","line-height:1.65","max-width:84%","vertical-align:top","text-align:left"].join(";"),g=t?`<span style="${f}">${G(t)}</span>`:"",m=r?"":$u(a,"left"),w=r?`<span style="${l}"></span>`:`<span style="${l}">${c}</span>`;return`<section class="container-dialogue-turn" style="${u}">`+w+`<span style="${d}">${g}${m}<span style="${h}">`}function n_(){const e=Up.pop();return e?`</span>${e.tailAfter}</span>${e.rightAvatarHtml}</section>
`:`</span></span></section>
`}function $u(e,t){return`<svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:bottom"><path d="${t==="left"?"M8,0 L0,5 L8,10 Z":"M0,0 L8,5 L0,10 Z"}" fill="${e}"/></svg>`}function o_(e,t){const n=e.tokens.colors,o=["margin:0 0 12px","font-size:14px","line-height:1.75",`color:${n.text}`].join(";"),r=["display:inline","font-weight:700",`color:${n.accent}`,"font-size:13px","letter-spacing:0.5px","font-family:Menlo,Monaco,monospace","margin-right:2px"].join(";"),i=t?`<span style="${r}">${G(t)}：</span>`:"";return`<section class="container-dialogue-turn" style="${o}">${i}<span style="display:inline">`}function r_(){return`</span></section>
`}function i_(e,t,n){const o=e.tokens.colors,r=["display:table","width:100%","table-layout:fixed","margin-bottom:16px"].join(";"),i=["display:table-cell","vertical-align:top","width:96px","padding-right:12px","text-align:right"].join(";"),s=["display:block",`color:${o.textMuted}`,"font-size:11px","letter-spacing:0.15em","text-transform:uppercase","font-weight:700","line-height:1.6","padding-top:4px"].join(";"),a=["display:block",`color:${o.textMuted}`,"font-size:10px","letter-spacing:0.05em","margin-top:2px","font-weight:400"].join(";"),l=["display:table-cell","vertical-align:top","padding-left:16px",`border-left:1px solid ${o.border}`].join(";"),c=[`color:${o.text}`,"font-size:17px","line-height:1.8","text-align:left"].join(";"),u=t?`<span style="${s}">${G(t)}</span>`:"",d=n?`<span style="${a}">${G(n)}</span>`:"";return`<section class="container-dialogue-turn" style="${r}"><span style="${i}">${u}${d}</span><span style="${l}"><span style="${c}">`}function s_(){return`</span></span></section>
`}function a_(e,t,n,o){const r=e.tokens.colors,i="display:block;margin-top:16px",s=["display:block","font-family:Menlo,Monaco,monospace","font-size:10px","letter-spacing:0.1em",`color:${r.primary}`,"margin-bottom:2px"].join(";"),a=["font-size:11px","font-weight:600",`color:${r.text}`].join(";"),l=["font-size:10px","font-style:italic",`color:${r.textMuted}`,"margin-left:8px"].join(";"),c=[`color:${r.text}`,"line-height:1.7"].join(";"),u=o?`<section style="${s}">${G(o)}</section>`:"",d=`<section style="display:block;margin-bottom:6px"><span style="${a}">${G(t)}</span><span style="${l}">— ${G(n||"speaker")}</span></section>`;return`<section class="container-dialogue-turn" style="${i}">`+u+d+`<section style="${c}">`}function l_(){return`</section></section>
`}const c_={open:()=>`<section class="container-free">
`,close:`</section>
`},u_={intro:$k,cover:Ek,author:Tk,"section-title":Ak,tip:kk,warning:xk,info:_k,danger:Ck,note:ex,"quote-card":Rk,highlight:Mk,compare:Ok,pros:Lk,cons:Nk,steps:Dk,divider:Pk,"footer-cta":Yk,recommend:Jk,qrcode:Zk,"voice-card":Qk,"video-card":Xk,announcement:tx,"author-bio":nx,"image-caption":ox,timeline:rx,"timeline-item":ix,free:c_,abstract:sx,"key-number":ax,masthead:lx,"section-tag":cx,byline:ux,"editorial-header":fx,toc:px,"toc-item":hx,"kpi-dashboard":wx,"kpi-item":Sx,"bar-chart":xx,bar:_x,"qa-block":Cx,footnotes:$x,colophon:mx,"pull-quote":Ax,"table-card":Lx,"table-row":Nx,gallery:zx,"image-item":Wx,dialogue:Jx,"dialogue-turn":Zx},Eu=/\{\{\s*body\s*\}\}/;function zp(e){const t=e.search(Eu);if(t<0)return{open:e,close:""};const n=e.match(Eu);return n?{open:e.slice(0,t),close:e.slice(t+n[0].length)}:{open:e,close:""}}function Wp(e,t,n){let o=e;return o=o.replace(/\{\{\s*title\s*\}\}/g,dt(n.title)),o=o.replace(/\{\{\s*attr\.([a-zA-Z_][\w-]*)\s*\}\}/g,(r,i)=>{const s=n.attrs[i];return s===void 0?"":dt(s)}),o=o.replace(/\{\{\s*wrapperCSS\s*\}\}/g,dt(t.css.wrapperCSS??"")),o=o.replace(/\{\{\s*titleCSS\s*\}\}/g,dt(t.css.titleCSS??"")),o=o.replace(/\{\{\s*bodyCSS\s*\}\}/g,dt(t.css.bodyCSS??"")),o=o.replace(/\{\{\s*svgSlot\s*\}\}/g,t.css.svgSlot??""),o}function d_(e,t){const{open:n}=zp(e.template);return Wp(n,e,t)}function f_(e,t){const{close:n}=zp(e.template);return Wp(n,e,t)}function p_(e){return`uc-${e}`}const h_="[.",m_=".]",g_="[~",b_="~]";function Tu(e,t,n){return function(r,i){const s=r.src,a=r.pos;if(s.substr(a,e.length)!==e)return!1;const l=a+e.length;let c=-1;for(let d=l;d<s.length-(t.length-1);d++){const f=s[d];if(f===`
`)return!1;if(f==="\\"){d++;continue}if(s.substr(d,t.length)===t){c=d;break}}if(c<0)return!1;const u=s.slice(l,c);if(!u)return!1;if(!i){const d=r.push("html_inline","",0);d.content=`<span class="${n}">`;const h=r.md.renderInline(u,r.env),g=r.push("html_inline","",0);g.content=h;const m=r.push("html_inline","",0);m.content="</span>"}return r.pos=c+t.length,!0}}function y_(e){e.inline.ruler.before("emphasis","wx_emphasis",Tu(h_,m_,"wx-emphasis")),e.inline.ruler.before("emphasis","wx_wavy",Tu(g_,b_,"wx-wavy"))}function Au(e,t){return t[e]}function v_(e,t){const n=Au(e.color,t),o=e.display==="block",r=[`display:${o?"block":"inline-block"}`,`color:${n}`];if(e.fontFamily==="monospace"&&r.push("font-family:Menlo,Monaco,monospace"),e.fontWeight&&r.push(`font-weight:${e.fontWeight}`),e.fontSize&&r.push(`font-size:${e.fontSize}px`),e.letterSpacing&&r.push(`letter-spacing:${e.letterSpacing}px`),o?r.push(`margin-bottom:${e.marginBottom??6}px`):r.push(`margin-right:${e.marginRight??8}px`),e.underline&&(r.push(`border-bottom:1px solid ${n}`),r.push(`padding-bottom:${e.underlinePad??2}px`)),e.backgroundColor){const i=Au(e.backgroundColor,t);r.push(`background-color:${i}`);const s=e.paddingX??0,a=e.paddingY??0;(s||a)&&r.push(`padding:${a}px ${s}px`)}return r.join(";")}const w_=["❶","❷","❸","❹","❺","❻","❼","❽","❾","❿","⓫","⓬","⓭","⓮","⓯","⓰","⓱","⓲","⓳","⓴"],S_=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];function k_(e,t,n){if(e==="arabic-section")return`${t.h2}.${t.h3InH2}`;if(e==="arabic-section-padded")return`${String(t.h2).padStart(2,"0")}.${t.h3InH2}`;const o=n===2?t.h2:t.h3;return e==="roman"?Xh(o):e==="arabic-padded"?String(o).padStart(2,"0"):e==="circled"?w_[o-1]??`(${o})`:String(o)}function x_(e,t,n){return e.replace(/\{cn\}/g,S_[n-1]??String(n)).replace(/\{n\}/g,t)}function __(e,t){const n=t.decorations?.headingPrefix;if(!n||n.length===0)return;const o=new Map;for(const i of n){const s=o.get(i.level)??[];s.push(i),o.set(i.level,s)}const r=t.tokens.colors;e.core.ruler.push("wx_heading_prefix_decorations",i=>{const s=i.tokens,a={h2:0,h3:0,h3InH2:0};for(let l=0;l<s.length;l++){const c=s[l];if(c.type!=="heading_open")continue;const u=c.tag==="h2"?2:c.tag==="h3"?3:null;if(u===null)continue;u===2?(a.h2++,a.h3InH2=0):(a.h3++,a.h3InH2++);const d=o.get(u);if(!d||d.length===0)continue;const f=s[l+1];if(!f||f.type!=="inline"||!f.children)continue;const h=f.children;for(const g of d)C_(g,h,a,u,r)}})}function C_(e,t,n,o,r){const i=v_(e.style,r);if(t.length===0)return;const s=t[0].constructor;if(e.autoNumber){const a=k_(e.autoNumber,n,o),l=o===2?n.h2:n.h3,c=e.style.suffix?x_(e.style.suffix,a,l):"",u=new s("html_inline","",0);u.content=`<span class="heading-prefix heading-prefix--autonumber" style="${i}">${a}${c}</span>`,t.splice(0,0,u);return}if(e.pattern){const a=t[0];if(a.type!=="text"||!a.content)return;let l;try{l=new RegExp(e.pattern)}catch{return}const c=l.exec(a.content);if(!c||!c[1])return;const u=c[1],d=c[0].length,f=a.content.slice(d),h=new s("html_inline","",0);h.content=`<span class="heading-prefix heading-prefix--pattern" style="${i}">${u}</span>`,f?(a.content=f,t.splice(0,0,h)):t.splice(0,1,h)}}function $_(e,t,n){e.__wxContainerStacks??={},e.__wxContainerStacks[t]??=[],e.__wxContainerStacks[t].push(n)}function E_(e,t){return e.__wxContainerStacks?.[t]?.pop()}function T_(e,t,n){e.__wxCustomInfoStacks??={},e.__wxCustomInfoStacks[t]??=[],e.__wxCustomInfoStacks[t].push(n)}function A_(e,t){return e.__wxCustomInfoStacks?.[t]?.pop()}function I_(e={}){const t=e.theme??em.default,n=e.customVariants??[],o=new ad({html:!0,xhtmlOut:!1,breaks:!1,linkify:!0,typographer:!1});o.use(wm),o.use(Sm),o.use(km),o.use(xm,{enabled:!0,label:!0});for(const[i,s]of Object.entries(u_))o.use(ma,i,{validate(a){return a.trim().split(/\s+/)[0]===i},render(a,l,c,u){const d=a[l];if(d.nesting===1){const h=d.info.trim().slice(i.length).trim(),{title:g,attrs:m}=or(h),w={themeId:t.id,tokens:t.tokens,assets:t.assets,containers:t.containers,innerStyles:t.innerStyles,inline:t.inline,variants:t.variants,pageVariants:u.__wxPageVariants,kickers:t.kickers,info:g,attrs:m,userVariants:u.__wxUserVariants};return $_(u,i,w),s.open(w)}const f=E_(u,i)??F_(t,u.__wxPageVariants,u.__wxUserVariants);return typeof s.close=="function"?s.close(f):s.close}});for(const i of n){const s=p_(i.id);o.use(ma,s,{validate(a){return a.trim().split(/\s+/)[0]===s},render(a,l,c,u){const d=a[l];if(d.nesting===1){const h=d.info.trim().slice(s.length).trim(),g=or(h);return T_(u,s,g),d_(i,g)}const f=A_(u,s)??{title:"",attrs:{}};return f_(i,f)}})}y_(o);const r=t.assets.h2Prefix??null;return r&&(o.renderer.rules.heading_open=(i,s,a,l,c)=>i[s].tag==="h2"?`<h2>${r}`:c.renderToken(i,s,a)),L_(o,t),__(o,t),B_(o,t),M_(o),o}const R_=/^\[\d+\][\s　]+/;function M_(e){e.core.ruler.push("wx_footnotes_entry_split",t=>{const n=t.tokens;if(n.length===0)return;const o=n[0].constructor;for(let r=0;r<n.length;r++){if(n[r].type!=="container_footnotes_open")continue;let i=1,s=r+1;for(;s<n.length;){if(n[s].type==="container_footnotes_open")i++;else if(n[s].type==="container_footnotes_close"&&(i--,i===0))break;s++}if(s>=n.length)continue;const a=[];let l=r+1;for(;l<s;){const c=n[l],u=n[l+1],d=n[l+2];if(c?.type==="paragraph_open"&&u?.type==="inline"&&d?.type==="paragraph_close"){const f=O_(u.children??[]);if(f.length<=1)a.push(c,u,d);else for(const h of f){const g=new o("paragraph_open","p",1),m=new o("inline","",0);m.children=h,m.content=h.filter(k=>k.type==="text").map(k=>k.content).join("");const w=new o("paragraph_close","p",-1);a.push(g,m,w)}l+=3}else a.push(c),l++}n.splice(r+1,s-r-1,...a)}})}function O_(e){if(e.length===0)return[];const t=[];let n=[];for(let o=0;o<e.length;o++){const r=e[o];if(r.type==="softbreak"||r.type==="hardbreak"){const i=e[o+1];if(i&&i.type==="text"&&R_.test(i.content)){n.length>0&&t.push(n),n=[];continue}}n.push(r)}return n.length>0&&t.push(n),t}function L_(e,t){const n=t.decorations?.introDropcap;if(!n)return;const o=t.tokens.colors[n.color],r=n.fontSize??48,i=n.fontWeight??700,s=n.marginRight??8,a=n.paddingTop??4,l=`display:inline-block;font-size:${r}px;font-weight:${i};color:${o};line-height:1;margin:0 ${s}px 0 0;padding-top:${a}px;vertical-align:baseline`;e.core.ruler.push("wx_intro_dropcap",c=>{const u=c.tokens;for(let d=0;d<u.length;d++){if(u[d].type!=="container_intro_open")continue;let f=d+1;for(;f<u.length&&u[f].type!=="paragraph_open"&&u[f].type!=="container_intro_close";)f++;if(f>=u.length||u[f].type==="container_intro_close")continue;const h=u[f+1];if(!h||h.type!=="inline"||!h.children)continue;const g=h.children;let m=0;for(;m<g.length&&g[m].type!=="text";)m++;if(m>=g.length)continue;const w=g[m].content;if(!w)continue;let k=0;for(;k<w.length&&/[\s"'‘’“”「『《〈(（[［{｛・·。，、；：？！"']/.test(w[k]);)k++;if(k>=w.length||/[0-9]/.test(w[k]))continue;const x=w[k],L=w.slice(0,k),$=w.slice(k+1),N=g[m].constructor,D=new N("html_inline","",0);D.content=`<span class="intro-dropcap" style="${l}">${x}</span>`;const _=[D];if($){const v=new N("text","",0);v.content=$,_.push(v)}L?(g[m].content=L,g.splice(m+1,0,..._)):g.splice(m,1,..._)}})}const N_=/<input[^>]*\btask-list-item-checkbox\b[^>]*>/i,D_=/\bchecked\b/i,P_=/^<\/?label\b/i;function B_(e,t){const n=t.tokens.colors,o=`<span class="wx-task-square wx-task-square--on" style="display:inline-block;width:12px;height:12px;background-color:${n.primary};color:${n.textInverse};text-align:center;line-height:12px;font-size:11px;font-weight:700;vertical-align:-2px;margin-right:8px">✓</span>`,r=`<span class="wx-task-square wx-task-square--off" style="display:inline-block;width:12px;height:12px;border:1px solid ${n.text};vertical-align:-2px;margin-right:8px">&nbsp;</span>`;e.core.ruler.push("wx_tasklist_squares",i=>{for(const s of i.tokens){if(s.type!=="inline"||!s.children)continue;const a=s.children;for(const l of a)l.type==="html_inline"&&(N_.test(l.content)?l.content=D_.test(l.content)?o:r:P_.test(l.content)&&(l.content=""))}})}function F_(e,t,n){return{themeId:e.id,tokens:e.tokens,assets:e.assets,containers:e.containers,innerStyles:e.innerStyles,inline:e.inline,variants:e.variants,pageVariants:t,kickers:e.kickers,info:"",attrs:{},userVariants:n}}const j_=["font-family","fontfamily","position","float"],H_=new Set(["flex","inline-flex","grid","inline-grid"]),V_=[[/-webkit-/i,"-webkit- 前缀在公众号会被剥离"],[/@media/i,"@media 查询会被公众号剥离"],[/@keyframes/i,"@keyframes 动画不被公众号支持"],[/:hover/i,":hover 伪类粘贴后无效"],[/:active/i,":active 伪类粘贴后无效"]],Kp=new Set(["position","top","right","bottom","left","z-index"]),Ol=new Set(["style","script","noscript","link","meta"]),Ll=[/^https?:\/\/v\.qq\.com\//i],Iu="#fefefe";function qp(e,t,n){const o=e.toLowerCase();if(j_.includes(o))return[{severity:"error",code:"forbidden-prop",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 声明了 \`${e}\`，违反微信平台约束。请移除。`}];if(o==="display"&&H_.has(t.toLowerCase().trim()))return[{severity:"error",code:"forbidden-display",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 使用了 \`display: ${t}\`，微信粘贴后会被剥离。改用 block / inline-block / table 系列。`}];for(const[r,i]of V_)if(r.test(t))return[{severity:"error",code:"forbidden-value-pattern",prop:e,value:t,path:n,message:`[themeCSS] 主题在 ${n} 的值里命中禁用模式（${i}）：\`${t}\`。请移除。`}];return[]}function U_(e,t){const n=[];for(const o of e.split(";")){const r=o.trim();if(!r)continue;const i=r.indexOf(":");if(i<0)continue;const s=r.slice(0,i).trim(),a=r.slice(i+1).trim();!s||!a||n.push(...qp(s,a,t))}return n}const na=/\{\{\s*([\w.]+)\s*\}\}/g,z_=/^attr\.[a-zA-Z_][\w-]*$/,W_=new Set(["title","body","wrapperCSS","titleCSS","bodyCSS","svgSlot"]),K_=new Set([...Ol,"object","embed","form"]),Ru=/<\s*\/?\s*([a-zA-Z][\w-]*)\b([^>]*)>/g,Mu=/\bon[a-z]+\s*=/gi,q_=/\b(?:href|src|formaction|action)\s*=\s*("|')?\s*javascript:/i,G_=/\bsrc\s*=\s*("([^"]*)"|'([^']*)'|(\S+))/i,Ou=/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi;function w6(e,t){const n=[];Ru.lastIndex=0;let o;for(;(o=Ru.exec(e))!==null;){const s=o[1].toLowerCase(),a=o[2]??"",l=o[0];if(/^<\s*\//.test(l))continue;if(K_.has(s)){n.push({severity:"error",code:"forbidden-tag",prop:s,value:l,path:t,message:`[template] ${t} 含禁用标签 <${s}>，微信沙箱会整棵剥离或视为攻击面，请移除。`});continue}if(s==="iframe"){const d=G_.exec(a),f=d?d[2]??d[3]??d[4]??"":"";f&&Ll.some(g=>g.test(f))||n.push({severity:"error",code:"iframe-src-not-allowed",prop:"iframe.src",value:f,path:t,message:`[template] ${t} 的 <iframe> src 不在白名单。当前仅允许 v.qq.com（mpvideo 容器）。`})}Mu.lastIndex=0;let c;for(;(c=Mu.exec(a))!==null;)n.push({severity:"error",code:"forbidden-attr",prop:c[0].replace(/\s*=\s*$/,""),value:l,path:t,message:`[template] ${t} 含事件属性 \`${c[0].trim()}\`，微信会剥离且为 XSS 风险点。`});q_.test(a)&&n.push({severity:"error",code:"forbidden-attr",prop:"javascript-protocol",value:l,path:t,message:`[template] ${t} 含 \`javascript:\` 协议，禁止——XSS 风险。`}),Ou.lastIndex=0;let u;for(;(u=Ou.exec(a))!==null;){const d=u[2]??u[3]??"";!d||!d.replace(na,"").trim()||n.push(...U_(d,`${t}.style@<${s}>`))}}let r=0;na.lastIndex=0;let i;for(;(i=na.exec(e))!==null;){const s=i[1];if(s==="body"){r++;continue}W_.has(s)||z_.test(s)||n.push({severity:"warning",code:"unknown-placeholder",prop:s,value:i[0],path:t,message:`[template] ${t} 含未识别占位符 \`${i[0]}\`，渲染时会原样输出。白名单：{{title}}/{{body}}/{{attr.X}}/{{wrapperCSS}}/{{titleCSS}}/{{bodyCSS}}/{{svgSlot}}。`})}return r===0?n.push({severity:"error",code:"missing-body-placeholder",prop:"{{body}}",value:"",path:t,message:`[template] ${t} 缺少 {{body}} 占位符——渲染器据此切分 open/close，必须恰好 1 个。`}):r>1&&n.push({severity:"error",code:"duplicate-body-placeholder",prop:"{{body}}",value:String(r),path:t,message:`[template] ${t} 含 ${r} 个 {{body}} 占位符；必须恰好 1 个。`}),n}function Nl(e){if(e<=0)throw new Error("[lru] max must be > 0");const t=new Map;return{get(n){const o=t.get(n);if(!(o===void 0&&!t.has(n)))return t.delete(n),t.set(n,o),o},set(n,o){if(t.has(n)&&t.delete(n),t.set(n,o),t.size>e){const r=t.keys().next().value;r!==void 0&&t.delete(r)}},has(n){return t.has(n)},delete(n){return t.delete(n)},clear(){t.clear()},get size(){return t.size}}}function Y_(e,t,n){const o=qp(e,t,n);if(o.length!==0)throw new nm(o[0].message)}function J_(e,t){const n=[];for(const[o,r]of Object.entries(e)){const i=o.trim(),s=typeof r=="number"?`${r}px`:String(r).trim();s&&(Y_(i,s,t),n.push(`  ${i}: ${s};`))}return n.join(`
`)}function Ft(e,t,n){const o=J_(t,n);return o?`${e} {
${o}
}`:""}function Z_(e){return`.${kt} ${e}`}function Q_(e){return`.${kt} .container-${e}`}const Lu=Nl(12);function X_(e){const t=Lu.get(e.id);if(t&&t.theme===e)return t.css;const n=eC(e);return Lu.set(e.id,{theme:e,css:n}),n}function eC(e){const t=[];t.push(Ft(`.${kt}`,{"background-color":e.tokens.colors.bg,color:e.tokens.colors.text,"font-size":`${e.tokens.typography.baseSize}px`,"line-height":String(e.tokens.typography.lineHeight),"letter-spacing":`${e.tokens.typography.letterSpacing}px`,padding:"20px 16px"},"root"));const n=[["h1",e.elements.h1],["h2",e.elements.h2],["h3",e.elements.h3],["h4",e.elements.h4],["h5",e.elements.h5],["h6",e.elements.h6],["p",e.elements.p],["blockquote",e.elements.blockquote],["ul",e.elements.ul],["ol",e.elements.ol],["li",e.elements.li],["code",{...e.elements.code,"word-break":"break-all"}],["kbd",e.elements.kbd],["pre",e.elements.pre],["pre code",{"background-color":"transparent",color:"inherit",padding:"0","word-break":"normal"}],["img",e.elements.img],["a",e.elements.a],["hr",e.elements.hr],["table",e.elements.table],["th",e.elements.th],["td",e.elements.td],["strong",e.elements.strong],["em",e.elements.em]];for(const[s,a]of n){const l=Ft(Z_(s),a,`elements.${s}`);l&&t.push(l)}t.push(Ft(`.${kt} mark`,e.inline.highlight,"inline.highlight")),t.push(Ft(`.${kt} .wx-wavy`,e.inline.wavy,"inline.wavy")),t.push(Ft(`.${kt} .wx-emphasis`,e.inline.emphasis,"inline.emphasis")),t.push(Ft(`.${kt} s, .${kt} del`,e.inline.del,"inline.del")),t.push(Ft(`.${kt} ins`,e.inline.ins,"inline.ins"));for(const s of tm){const a=e.containers[s.styleKey];if(!a)continue;const l=Ft(Q_(s.name),a,`containers.${s.styleKey}`);l&&t.push(l)}const o=`.${kt} .container-pros, .${kt} .container-cons`,r=s=>`.${kt} .container-pros ${s}, .${kt} .container-cons ${s}`;t.push(Ft(o,{"letter-spacing":"0"},"compare.col")),t.push(Ft(r("p"),{"font-size":"13px","letter-spacing":"0","line-height":"1.6","margin-bottom":"6px"},"compare.col p")),t.push(Ft(r("li"),{"font-size":"13px","letter-spacing":"0","line-height":"1.55","margin-bottom":"4px"},"compare.col li")),t.push(Ft(r("ul")+`, ${r("ol")}`,{"padding-left":"12px","margin-bottom":"8px"},"compare.col ul")),t.push(Ft(r("h3"),{"font-size":"14px","margin-top":"8px","margin-bottom":"6px","line-height":"1.4"},"compare.col h3")),t.push(Ft(r("code"),{"font-size":"12px",padding:"1px 4px"},"compare.col code"));const i=`.${kt} .container-tip p,.${kt} .container-info p,.${kt} .container-warning p,.${kt} .container-danger p`;return t.push(Ft(i,{"text-indent":"0"},"admonition.body p")),t.filter(Boolean).join(`

`)}var oa,Nu;function tC(){if(Nu)return oa;Nu=1;function e(M){return M instanceof Map?M.clear=M.delete=M.set=function(){throw new Error("map is read-only")}:M instanceof Set&&(M.add=M.clear=M.delete=function(){throw new Error("set is read-only")}),Object.freeze(M),Object.getOwnPropertyNames(M).forEach(K=>{const re=M[K],ke=typeof re;(ke==="object"||ke==="function")&&!Object.isFrozen(re)&&e(re)}),M}class t{constructor(K){K.data===void 0&&(K.data={}),this.data=K.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(M){return M.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function o(M,...K){const re=Object.create(null);for(const ke in M)re[ke]=M[ke];return K.forEach(function(ke){for(const it in ke)re[it]=ke[it]}),re}const r="</span>",i=M=>!!M.scope,s=(M,{prefix:K})=>{if(M.startsWith("language:"))return M.replace("language:","language-");if(M.includes(".")){const re=M.split(".");return[`${K}${re.shift()}`,...re.map((ke,it)=>`${ke}${"_".repeat(it+1)}`)].join(" ")}return`${K}${M}`};class a{constructor(K,re){this.buffer="",this.classPrefix=re.classPrefix,K.walk(this)}addText(K){this.buffer+=n(K)}openNode(K){if(!i(K))return;const re=s(K.scope,{prefix:this.classPrefix});this.span(re)}closeNode(K){i(K)&&(this.buffer+=r)}value(){return this.buffer}span(K){this.buffer+=`<span class="${K}">`}}const l=(M={})=>{const K={children:[]};return Object.assign(K,M),K};class c{constructor(){this.rootNode=l(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(K){this.top.children.push(K)}openNode(K){const re=l({scope:K});this.add(re),this.stack.push(re)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(K){return this.constructor._walk(K,this.rootNode)}static _walk(K,re){return typeof re=="string"?K.addText(re):re.children&&(K.openNode(re),re.children.forEach(ke=>this._walk(K,ke)),K.closeNode(re)),K}static _collapse(K){typeof K!="string"&&K.children&&(K.children.every(re=>typeof re=="string")?K.children=[K.children.join("")]:K.children.forEach(re=>{c._collapse(re)}))}}class u extends c{constructor(K){super(),this.options=K}addText(K){K!==""&&this.add(K)}startScope(K){this.openNode(K)}endScope(){this.closeNode()}__addSublanguage(K,re){const ke=K.root;re&&(ke.scope=`language:${re}`),this.add(ke)}toHTML(){return new a(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function d(M){return M?typeof M=="string"?M:M.source:null}function f(M){return m("(?=",M,")")}function h(M){return m("(?:",M,")*")}function g(M){return m("(?:",M,")?")}function m(...M){return M.map(re=>d(re)).join("")}function w(M){const K=M[M.length-1];return typeof K=="object"&&K.constructor===Object?(M.splice(M.length-1,1),K):{}}function k(...M){return"("+(w(M).capture?"":"?:")+M.map(ke=>d(ke)).join("|")+")"}function x(M){return new RegExp(M.toString()+"|").exec("").length-1}function L(M,K){const re=M&&M.exec(K);return re&&re.index===0}const $=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function N(M,{joinWith:K}){let re=0;return M.map(ke=>{re+=1;const it=re;let st=d(ke),de="";for(;st.length>0;){const le=$.exec(st);if(!le){de+=st;break}de+=st.substring(0,le.index),st=st.substring(le.index+le[0].length),le[0][0]==="\\"&&le[1]?de+="\\"+String(Number(le[1])+it):(de+=le[0],le[0]==="("&&re++)}return de}).map(ke=>`(${ke})`).join(K)}const D=/\b\B/,_="[a-zA-Z]\\w*",v="[a-zA-Z_]\\w*",S="\\b\\d+(\\.\\d+)?",I="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",C="\\b(0b[01]+)",F="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",E=(M={})=>{const K=/^#![ ]*\//;return M.binary&&(M.begin=m(K,/.*\b/,M.binary,/\b.*/)),o({scope:"meta",begin:K,end:/$/,relevance:0,"on:begin":(re,ke)=>{re.index!==0&&ke.ignoreMatch()}},M)},j={begin:"\\\\[\\s\\S]",relevance:0},R={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[j]},B={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[j]},V={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},z=function(M,K,re={}){const ke=o({scope:"comment",begin:M,end:K,contains:[]},re);ke.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const it=k("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return ke.contains.push({begin:m(/[ ]+/,"(",it,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),ke},fe=z("//","$"),je=z("/\\*","\\*/"),Ne=z("#","$"),Fe={scope:"number",begin:S,relevance:0},He={scope:"number",begin:I,relevance:0},Te={scope:"number",begin:C,relevance:0},Ye={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[j,{begin:/\[/,end:/\]/,relevance:0,contains:[j]}]},Je={scope:"title",begin:_,relevance:0},Pt={scope:"title",begin:v,relevance:0},pt={begin:"\\.\\s*"+v,relevance:0};var wt=Object.freeze({__proto__:null,APOS_STRING_MODE:R,BACKSLASH_ESCAPE:j,BINARY_NUMBER_MODE:Te,BINARY_NUMBER_RE:C,COMMENT:z,C_BLOCK_COMMENT_MODE:je,C_LINE_COMMENT_MODE:fe,C_NUMBER_MODE:He,C_NUMBER_RE:I,END_SAME_AS_BEGIN:function(M){return Object.assign(M,{"on:begin":(K,re)=>{re.data._beginMatch=K[1]},"on:end":(K,re)=>{re.data._beginMatch!==K[1]&&re.ignoreMatch()}})},HASH_COMMENT_MODE:Ne,IDENT_RE:_,MATCH_NOTHING_RE:D,METHOD_GUARD:pt,NUMBER_MODE:Fe,NUMBER_RE:S,PHRASAL_WORDS_MODE:V,QUOTE_STRING_MODE:B,REGEXP_MODE:Ye,RE_STARTERS_RE:F,SHEBANG:E,TITLE_MODE:Je,UNDERSCORE_IDENT_RE:v,UNDERSCORE_TITLE_MODE:Pt});function gn(M,K){M.input[M.index-1]==="."&&K.ignoreMatch()}function y(M,K){M.className!==void 0&&(M.scope=M.className,delete M.className)}function b(M,K){K&&M.beginKeywords&&(M.begin="\\b("+M.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",M.__beforeBegin=gn,M.keywords=M.keywords||M.beginKeywords,delete M.beginKeywords,M.relevance===void 0&&(M.relevance=0))}function T(M,K){Array.isArray(M.illegal)&&(M.illegal=k(...M.illegal))}function H(M,K){if(M.match){if(M.begin||M.end)throw new Error("begin & end are not supported with match");M.begin=M.match,delete M.match}}function W(M,K){M.relevance===void 0&&(M.relevance=1)}const q=(M,K)=>{if(!M.beforeMatch)return;if(M.starts)throw new Error("beforeMatch cannot be used with starts");const re=Object.assign({},M);Object.keys(M).forEach(ke=>{delete M[ke]}),M.keywords=re.keywords,M.begin=m(re.beforeMatch,f(re.begin)),M.starts={relevance:0,contains:[Object.assign(re,{endsParent:!0})]},M.relevance=0,delete re.beforeMatch},ie=["of","and","for","in","not","or","if","then","parent","list","value"],ne="keyword";function X(M,K,re=ne){const ke=Object.create(null);return typeof M=="string"?it(re,M.split(" ")):Array.isArray(M)?it(re,M):Object.keys(M).forEach(function(st){Object.assign(ke,X(M[st],K,st))}),ke;function it(st,de){K&&(de=de.map(le=>le.toLowerCase())),de.forEach(function(le){const we=le.split("|");ke[we[0]]=[st,Y(we[0],we[1])]})}}function Y(M,K){return K?Number(K):ge(M)?0:1}function ge(M){return ie.includes(M.toLowerCase())}const oe={},ce=M=>{console.error(M)},ve=(M,...K)=>{console.log(`WARN: ${M}`,...K)},Ae=(M,K)=>{oe[`${M}/${K}`]||(console.log(`Deprecated as of ${M}. ${K}`),oe[`${M}/${K}`]=!0)},Be=new Error;function Ve(M,K,{key:re}){let ke=0;const it=M[re],st={},de={};for(let le=1;le<=K.length;le++)de[le+ke]=it[le],st[le+ke]=!0,ke+=x(K[le-1]);M[re]=de,M[re]._emit=st,M[re]._multi=!0}function rt(M){if(Array.isArray(M.begin)){if(M.skip||M.excludeBegin||M.returnBegin)throw ce("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Be;if(typeof M.beginScope!="object"||M.beginScope===null)throw ce("beginScope must be object"),Be;Ve(M,M.begin,{key:"beginScope"}),M.begin=N(M.begin,{joinWith:""})}}function ct(M){if(Array.isArray(M.end)){if(M.skip||M.excludeEnd||M.returnEnd)throw ce("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Be;if(typeof M.endScope!="object"||M.endScope===null)throw ce("endScope must be object"),Be;Ve(M,M.end,{key:"endScope"}),M.end=N(M.end,{joinWith:""})}}function Wt(M){M.scope&&typeof M.scope=="object"&&M.scope!==null&&(M.beginScope=M.scope,delete M.scope)}function Kt(M){Wt(M),typeof M.beginScope=="string"&&(M.beginScope={_wrap:M.beginScope}),typeof M.endScope=="string"&&(M.endScope={_wrap:M.endScope}),rt(M),ct(M)}function $t(M){function K(de,le){return new RegExp(d(de),"m"+(M.case_insensitive?"i":"")+(M.unicodeRegex?"u":"")+(le?"g":""))}class re{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(le,we){we.position=this.position++,this.matchIndexes[this.matchAt]=we,this.regexes.push([we,le]),this.matchAt+=x(le)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const le=this.regexes.map(we=>we[1]);this.matcherRe=K(N(le,{joinWith:"|"}),!0),this.lastIndex=0}exec(le){this.matcherRe.lastIndex=this.lastIndex;const we=this.matcherRe.exec(le);if(!we)return null;const ut=we.findIndex((mo,go)=>go>0&&mo!==void 0),lt=this.matchIndexes[ut];return we.splice(0,ut),Object.assign(we,lt)}}class ke{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(le){if(this.multiRegexes[le])return this.multiRegexes[le];const we=new re;return this.rules.slice(le).forEach(([ut,lt])=>we.addRule(ut,lt)),we.compile(),this.multiRegexes[le]=we,we}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(le,we){this.rules.push([le,we]),we.type==="begin"&&this.count++}exec(le){const we=this.getMatcher(this.regexIndex);we.lastIndex=this.lastIndex;let ut=we.exec(le);if(this.resumingScanAtSamePosition()&&!(ut&&ut.index===this.lastIndex)){const lt=this.getMatcher(0);lt.lastIndex=this.lastIndex+1,ut=lt.exec(le)}return ut&&(this.regexIndex+=ut.position+1,this.regexIndex===this.count&&this.considerAll()),ut}}function it(de){const le=new ke;return de.contains.forEach(we=>le.addRule(we.begin,{rule:we,type:"begin"})),de.terminatorEnd&&le.addRule(de.terminatorEnd,{type:"end"}),de.illegal&&le.addRule(de.illegal,{type:"illegal"}),le}function st(de,le){const we=de;if(de.isCompiled)return we;[y,H,Kt,q].forEach(lt=>lt(de,le)),M.compilerExtensions.forEach(lt=>lt(de,le)),de.__beforeBegin=null,[b,T,W].forEach(lt=>lt(de,le)),de.isCompiled=!0;let ut=null;return typeof de.keywords=="object"&&de.keywords.$pattern&&(de.keywords=Object.assign({},de.keywords),ut=de.keywords.$pattern,delete de.keywords.$pattern),ut=ut||/\w+/,de.keywords&&(de.keywords=X(de.keywords,M.case_insensitive)),we.keywordPatternRe=K(ut,!0),le&&(de.begin||(de.begin=/\B|\b/),we.beginRe=K(we.begin),!de.end&&!de.endsWithParent&&(de.end=/\B|\b/),de.end&&(we.endRe=K(we.end)),we.terminatorEnd=d(we.end)||"",de.endsWithParent&&le.terminatorEnd&&(we.terminatorEnd+=(de.end?"|":"")+le.terminatorEnd)),de.illegal&&(we.illegalRe=K(de.illegal)),de.contains||(de.contains=[]),de.contains=[].concat(...de.contains.map(function(lt){return St(lt==="self"?de:lt)})),de.contains.forEach(function(lt){st(lt,we)}),de.starts&&st(de.starts,le),we.matcher=it(we),we}if(M.compilerExtensions||(M.compilerExtensions=[]),M.contains&&M.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return M.classNameAliases=o(M.classNameAliases||{}),st(M)}function On(M){return M?M.endsWithParent||On(M.starts):!1}function St(M){return M.variants&&!M.cachedVariants&&(M.cachedVariants=M.variants.map(function(K){return o(M,{variants:null},K)})),M.cachedVariants?M.cachedVariants:On(M)?o(M,{starts:M.starts?o(M.starts):null}):Object.isFrozen(M)?o(M):M}var Et="11.11.1";class ho extends Error{constructor(K,re){super(K),this.name="HTMLInjectionError",this.html=re}}const bn=n,Do=o,br=Symbol("nomatch"),Po=7,si=function(M){const K=Object.create(null),re=Object.create(null),ke=[];let it=!0;const st="Could not find the language '{}', did you forget to load/include a language module?",de={disableAutodetect:!0,name:"Plain text",contains:[]};let le={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:u};function we(ee){return le.noHighlightRe.test(ee)}function ut(ee){let be=ee.className+" ";be+=ee.parentNode?ee.parentNode.className:"";const De=le.languageDetectRe.exec(be);if(De){const Xe=Qn(De[1]);return Xe||(ve(st.replace("{}",De[1])),ve("Falling back to no-highlight mode for this block.",ee)),Xe?De[1]:"no-highlight"}return be.split(/\s+/).find(Xe=>we(Xe)||Qn(Xe))}function lt(ee,be,De){let Xe="",vt="";typeof be=="object"?(Xe=ee,De=be.ignoreIllegals,vt=be.language):(Ae("10.7.0","highlight(lang, code, ...args) has been deprecated."),Ae("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),vt=ee,Xe=be),De===void 0&&(De=!0);const on={code:Xe,language:vt};li("before:highlight",on);const Xn=on.result?on.result:mo(on.language,on.code,De);return Xn.code=on.code,li("after:highlight",Xn),Xn}function mo(ee,be,De,Xe){const vt=Object.create(null);function on(se,he){return se.keywords[he]}function Xn(){if(!xe.keywords){xt.addText(et);return}let se=0;xe.keywordPatternRe.lastIndex=0;let he=xe.keywordPatternRe.exec(et),Ie="";for(;he;){Ie+=et.substring(se,he.index);const qe=vn.case_insensitive?he[0].toLowerCase():he[0],Tt=on(xe,qe);if(Tt){const[Ln,Vh]=Tt;if(xt.addText(Ie),Ie="",vt[qe]=(vt[qe]||0)+1,vt[qe]<=Po&&(di+=Vh),Ln.startsWith("_"))Ie+=he[0];else{const Uh=vn.classNameAliases[Ln]||Ln;yn(he[0],Uh)}}else Ie+=he[0];se=xe.keywordPatternRe.lastIndex,he=xe.keywordPatternRe.exec(et)}Ie+=et.substring(se),xt.addText(Ie)}function ci(){if(et==="")return;let se=null;if(typeof xe.subLanguage=="string"){if(!K[xe.subLanguage]){xt.addText(et);return}se=mo(xe.subLanguage,et,!0,Zl[xe.subLanguage]),Zl[xe.subLanguage]=se._top}else se=Bo(et,xe.subLanguage.length?xe.subLanguage:null);xe.relevance>0&&(di+=se.relevance),xt.__addSublanguage(se._emitter,se.language)}function qt(){xe.subLanguage!=null?ci():Xn(),et=""}function yn(se,he){se!==""&&(xt.startScope(he),xt.addText(se),xt.endScope())}function ql(se,he){let Ie=1;const qe=he.length-1;for(;Ie<=qe;){if(!se._emit[Ie]){Ie++;continue}const Tt=vn.classNameAliases[se[Ie]]||se[Ie],Ln=he[Ie];Tt?yn(Ln,Tt):(et=Ln,Xn(),et=""),Ie++}}function Gl(se,he){return se.scope&&typeof se.scope=="string"&&xt.openNode(vn.classNameAliases[se.scope]||se.scope),se.beginScope&&(se.beginScope._wrap?(yn(et,vn.classNameAliases[se.beginScope._wrap]||se.beginScope._wrap),et=""):se.beginScope._multi&&(ql(se.beginScope,he),et="")),xe=Object.create(se,{parent:{value:xe}}),xe}function Yl(se,he,Ie){let qe=L(se.endRe,Ie);if(qe){if(se["on:end"]){const Tt=new t(se);se["on:end"](he,Tt),Tt.isMatchIgnored&&(qe=!1)}if(qe){for(;se.endsParent&&se.parent;)se=se.parent;return se}}if(se.endsWithParent)return Yl(se.parent,he,Ie)}function Ph(se){return xe.matcher.regexIndex===0?(et+=se[0],1):($s=!0,0)}function Bh(se){const he=se[0],Ie=se.rule,qe=new t(Ie),Tt=[Ie.__beforeBegin,Ie["on:begin"]];for(const Ln of Tt)if(Ln&&(Ln(se,qe),qe.isMatchIgnored))return Ph(he);return Ie.skip?et+=he:(Ie.excludeBegin&&(et+=he),qt(),!Ie.returnBegin&&!Ie.excludeBegin&&(et=he)),Gl(Ie,se),Ie.returnBegin?0:he.length}function Fh(se){const he=se[0],Ie=be.substring(se.index),qe=Yl(xe,se,Ie);if(!qe)return br;const Tt=xe;xe.endScope&&xe.endScope._wrap?(qt(),yn(he,xe.endScope._wrap)):xe.endScope&&xe.endScope._multi?(qt(),ql(xe.endScope,se)):Tt.skip?et+=he:(Tt.returnEnd||Tt.excludeEnd||(et+=he),qt(),Tt.excludeEnd&&(et=he));do xe.scope&&xt.closeNode(),!xe.skip&&!xe.subLanguage&&(di+=xe.relevance),xe=xe.parent;while(xe!==qe.parent);return qe.starts&&Gl(qe.starts,se),Tt.returnEnd?0:he.length}function jh(){const se=[];for(let he=xe;he!==vn;he=he.parent)he.scope&&se.unshift(he.scope);se.forEach(he=>xt.openNode(he))}let ui={};function Jl(se,he){const Ie=he&&he[0];if(et+=se,Ie==null)return qt(),0;if(ui.type==="begin"&&he.type==="end"&&ui.index===he.index&&Ie===""){if(et+=be.slice(he.index,he.index+1),!it){const qe=new Error(`0 width match regex (${ee})`);throw qe.languageName=ee,qe.badRule=ui.rule,qe}return 1}if(ui=he,he.type==="begin")return Bh(he);if(he.type==="illegal"&&!De){const qe=new Error('Illegal lexeme "'+Ie+'" for mode "'+(xe.scope||"<unnamed>")+'"');throw qe.mode=xe,qe}else if(he.type==="end"){const qe=Fh(he);if(qe!==br)return qe}if(he.type==="illegal"&&Ie==="")return et+=`
`,1;if(Cs>1e5&&Cs>he.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=Ie,Ie.length}const vn=Qn(ee);if(!vn)throw ce(st.replace("{}",ee)),new Error('Unknown language: "'+ee+'"');const Hh=$t(vn);let _s="",xe=Xe||Hh;const Zl={},xt=new le.__emitter(le);jh();let et="",di=0,bo=0,Cs=0,$s=!1;try{if(vn.__emitTokens)vn.__emitTokens(be,xt);else{for(xe.matcher.considerAll();;){Cs++,$s?$s=!1:xe.matcher.considerAll(),xe.matcher.lastIndex=bo;const se=xe.matcher.exec(be);if(!se)break;const he=be.substring(bo,se.index),Ie=Jl(he,se);bo=se.index+Ie}Jl(be.substring(bo))}return xt.finalize(),_s=xt.toHTML(),{language:ee,value:_s,relevance:di,illegal:!1,_emitter:xt,_top:xe}}catch(se){if(se.message&&se.message.includes("Illegal"))return{language:ee,value:bn(be),illegal:!0,relevance:0,_illegalBy:{message:se.message,index:bo,context:be.slice(bo-100,bo+100),mode:se.mode,resultSoFar:_s},_emitter:xt};if(it)return{language:ee,value:bn(be),illegal:!1,relevance:0,errorRaised:se,_emitter:xt,_top:xe};throw se}}function go(ee){const be={value:bn(ee),illegal:!1,relevance:0,_top:de,_emitter:new le.__emitter(le)};return be._emitter.addText(ee),be}function Bo(ee,be){be=be||le.languages||Object.keys(K);const De=go(ee),Xe=be.filter(Qn).filter(Kl).map(qt=>mo(qt,ee,!1));Xe.unshift(De);const vt=Xe.sort((qt,yn)=>{if(qt.relevance!==yn.relevance)return yn.relevance-qt.relevance;if(qt.language&&yn.language){if(Qn(qt.language).supersetOf===yn.language)return 1;if(Qn(yn.language).supersetOf===qt.language)return-1}return 0}),[on,Xn]=vt,ci=on;return ci.secondBest=Xn,ci}function Ss(ee,be,De){const Xe=be&&re[be]||De;ee.classList.add("hljs"),ee.classList.add(`language-${Xe}`)}function yr(ee){let be=null;const De=ut(ee);if(we(De))return;if(li("before:highlightElement",{el:ee,language:De}),ee.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",ee);return}if(ee.children.length>0&&(le.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(ee)),le.throwUnescapedHTML))throw new ho("One of your code blocks includes unescaped HTML.",ee.innerHTML);be=ee;const Xe=be.textContent,vt=De?lt(Xe,{language:De,ignoreIllegals:!0}):Bo(Xe);ee.innerHTML=vt.value,ee.dataset.highlighted="yes",Ss(ee,De,vt.language),ee.result={language:vt.language,re:vt.relevance,relevance:vt.relevance},vt.secondBest&&(ee.secondBest={language:vt.secondBest.language,relevance:vt.secondBest.relevance}),li("after:highlightElement",{el:ee,result:vt,text:Xe})}function ai(ee){le=Do(le,ee)}const ks=()=>{pe(),Ae("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function xs(){pe(),Ae("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let vr=!1;function pe(){function ee(){pe()}if(document.readyState==="loading"){vr||window.addEventListener("DOMContentLoaded",ee,!1),vr=!0;return}document.querySelectorAll(le.cssSelector).forEach(yr)}function Z(ee,be){let De=null;try{De=be(M)}catch(Xe){if(ce("Language definition for '{}' could not be registered.".replace("{}",ee)),it)ce(Xe);else throw Xe;De=de}De.name||(De.name=ee),K[ee]=De,De.rawDefinition=be.bind(null,M),De.aliases&&Wl(De.aliases,{languageName:ee})}function ye(ee){delete K[ee];for(const be of Object.keys(re))re[be]===ee&&delete re[be]}function wr(){return Object.keys(K)}function Qn(ee){return ee=(ee||"").toLowerCase(),K[ee]||K[re[ee]]}function Wl(ee,{languageName:be}){typeof ee=="string"&&(ee=[ee]),ee.forEach(De=>{re[De.toLowerCase()]=be})}function Kl(ee){const be=Qn(ee);return be&&!be.disableAutodetect}function Oh(ee){ee["before:highlightBlock"]&&!ee["before:highlightElement"]&&(ee["before:highlightElement"]=be=>{ee["before:highlightBlock"](Object.assign({block:be.el},be))}),ee["after:highlightBlock"]&&!ee["after:highlightElement"]&&(ee["after:highlightElement"]=be=>{ee["after:highlightBlock"](Object.assign({block:be.el},be))})}function Lh(ee){Oh(ee),ke.push(ee)}function Nh(ee){const be=ke.indexOf(ee);be!==-1&&ke.splice(be,1)}function li(ee,be){const De=ee;ke.forEach(function(Xe){Xe[De]&&Xe[De](be)})}function Dh(ee){return Ae("10.7.0","highlightBlock will be removed entirely in v12.0"),Ae("10.7.0","Please use highlightElement now."),yr(ee)}Object.assign(M,{highlight:lt,highlightAuto:Bo,highlightAll:pe,highlightElement:yr,highlightBlock:Dh,configure:ai,initHighlighting:ks,initHighlightingOnLoad:xs,registerLanguage:Z,unregisterLanguage:ye,listLanguages:wr,getLanguage:Qn,registerAliases:Wl,autoDetection:Kl,inherit:Do,addPlugin:Lh,removePlugin:Nh}),M.debugMode=function(){it=!1},M.safeMode=function(){it=!0},M.versionString=Et,M.regex={concat:m,lookahead:f,either:k,optional:g,anyNumberOfTimes:h};for(const ee in wt)typeof wt[ee]=="object"&&e(wt[ee]);return Object.assign(M,wt),M},Zn=si({});return Zn.newInstance=()=>si({}),oa=Zn,Zn.HighlightJS=Zn,Zn.default=Zn,oa}var nC=tC();const hn=_m(nC),Du="[A-Za-z$_][0-9A-Za-z$_]*",oC=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],rC=["true","false","null","undefined","NaN","Infinity"],Gp=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yp=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Jp=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],iC=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],sC=[].concat(Jp,Gp,Yp);function Zp(e){const t=e.regex,n=(z,{after:fe})=>{const je="</"+z[0].slice(1);return z.input.indexOf(je,fe)!==-1},o=Du,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(z,fe)=>{const je=z[0].length+z.index,Ne=z.input[je];if(Ne==="<"||Ne===","){fe.ignoreMatch();return}Ne===">"&&(n(z,{after:je})||fe.ignoreMatch());let Fe;const He=z.input.substring(je);if(Fe=He.match(/^\s*=/)){fe.ignoreMatch();return}if((Fe=He.match(/^\s+extends\s+/))&&Fe.index===0){fe.ignoreMatch();return}}},a={$pattern:Du,keyword:oC,literal:rC,built_in:sC,"variable.language":iC},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},g={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},m={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},L=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,g,m,w,{match:/\$\d+/},d];f.contains=L.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(L)});const $=[].concat(x,f.contains),N=$.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat($)}]),D={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N},_={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},v={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Gp,...Yp]}},S={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},C={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function F(z){return t.concat("(?!",z.join("|"),")")}const E={match:t.concat(/\b/,F([...Jp,"super","import"].map(z=>`${z}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},j={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},R={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},B="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",V={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(B)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:v},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),S,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,g,m,w,x,{match:/\$\d+/},d,v,{scope:"attr",match:o+t.lookahead(":"),relevance:0},V,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:B,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},j,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},E,C,_,R,{match:/\$[(.]/}]}}const Yi="[A-Za-z$_][0-9A-Za-z$_]*",Qp=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Xp=["true","false","null","undefined","NaN","Infinity"],eh=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],th=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nh=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],oh=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],rh=[].concat(nh,eh,th);function aC(e){const t=e.regex,n=(z,{after:fe})=>{const je="</"+z[0].slice(1);return z.input.indexOf(je,fe)!==-1},o=Yi,r={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(z,fe)=>{const je=z[0].length+z.index,Ne=z.input[je];if(Ne==="<"||Ne===","){fe.ignoreMatch();return}Ne===">"&&(n(z,{after:je})||fe.ignoreMatch());let Fe;const He=z.input.substring(je);if(Fe=He.match(/^\s*=/)){fe.ignoreMatch();return}if((Fe=He.match(/^\s+extends\s+/))&&Fe.index===0){fe.ignoreMatch();return}}},a={$pattern:Yi,keyword:Qp,literal:Xp,built_in:rh,"variable.language":oh},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},f={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},h={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"xml"}},g={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"css"}},m={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,f],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,f]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},L=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,g,m,w,{match:/\$\d+/},d];f.contains=L.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(L)});const $=[].concat(x,f.contains),N=$.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat($)}]),D={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N},_={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},v={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...eh,...th]}},S={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},C={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function F(z){return t.concat("(?!",z.join("|"),")")}const E={match:t.concat(/\b/,F([...nh,"super","import"].map(z=>`${z}\\s*\\(`)),o,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},j={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},R={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},B="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",V={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(B)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:v},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),S,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,g,m,w,x,{match:/\$\d+/},d,v,{scope:"attr",match:o+t.lookahead(":"),relevance:0},V,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:B,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},j,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},E,C,_,R,{match:/\$[(.]/}]}}function ih(e){const t=e.regex,n=aC(e),o=Yi,r=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],i={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},s={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:r},contains:[n.exports.CLASS_REFERENCE]},a={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},l=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],c={$pattern:Yi,keyword:Qp.concat(l),literal:Xp,built_in:rh.concat(r),"variable.language":oh},u={className:"meta",begin:"@"+o},d=(m,w,k)=>{const x=m.contains.findIndex(L=>L.label===w);if(x===-1)throw new Error("can not find mode to replace");m.contains.splice(x,1,k)};Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(u);const f=n.contains.find(m=>m.scope==="attr"),h=Object.assign({},f,{match:t.concat(o,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,f,h]),n.contains=n.contains.concat([u,i,s,h]),d(n,"shebang",e.SHEBANG()),d(n,"use_strict",a);const g=n.contains.find(m=>m.label==="func.def");return g.relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),n}function sh(e){const t=e.regex,n=/[\p{XID_Start}_]\p{XID_Continue}*/u,o=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],a={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:o,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},l={className:"meta",begin:/^(>>>|\.\.\.) /},c={className:"subst",begin:/\{/,end:/\}/,keywords:a,illegal:/#/},u={begin:/\{\{/,relevance:0},d={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,l,u,c]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,u,c]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,u,c]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},f="[0-9](_?[0-9])*",h=`(\\b(${f}))?\\.(${f})|\\b(${f})\\.`,g=`\\b|${o.join("|")}`,m={className:"number",relevance:0,variants:[{begin:`(\\b(${f})|(${h}))[eE][+-]?(${f})[jJ]?(?=${g})`},{begin:`(${h})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${g})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${g})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${g})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${g})`},{begin:`\\b(${f})[jJ](?=${g})`}]},w={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:a,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},k={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:["self",l,m,d,e.HASH_COMMENT_MODE]}]};return c.contains=[d,m,l],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:a,illegal:/(<\/|\?)|=>/,contains:[l,m,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},d,w,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,n],scope:{1:"keyword",3:"title.function"},contains:[k]},{variants:[{match:[/\bclass/,/\s+/,n,/\s*/,/\(\s*/,n,/\s*\)/]},{match:[/\bclass/,/\s+/,n]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[m,k,d]}]}}function ah(e){const t=e.regex,n={},o={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},o]});const r={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),s={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},a={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,r]};r.contains.push(a);const l={match:/\\"/},c={className:"string",begin:/'/,end:/'/},u={match:/\\'/},d={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},f=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],h=e.SHEBANG({binary:`(${f.join("|")})`,relevance:10}),g={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},m=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],w=["true","false"],k={match:/(\/[a-z._-]+)+/},x=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],L=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],$=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],N=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:m,literal:w,built_in:[...x,...L,"set","shopt",...$,...N]},contains:[h,e.SHEBANG(),g,d,i,s,k,a,l,c,u,n]}}function lC(e){const t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},n={match:/[{}[\],:]/,className:"punctuation",relevance:0},o=["true","false","null"],r={scope:"literal",beginKeywords:o.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:o},contains:[t,n,e.QUOTE_STRING_MODE,r,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}hn.registerLanguage("javascript",Zp);hn.registerLanguage("js",Zp);hn.registerLanguage("typescript",ih);hn.registerLanguage("ts",ih);hn.registerLanguage("python",sh);hn.registerLanguage("py",sh);hn.registerLanguage("bash",ah);hn.registerLanguage("sh",ah);hn.registerLanguage("json",lC);function cC(e,t){const n=t&&hn.getLanguage(t)?t:"";if(!n)return{html:G(e),language:""};try{return{html:hn.highlight(e,{language:n,ignoreIllegals:!0}).value,language:n}}catch{return{html:G(e),language:""}}}const uC=`
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
`;let ra=null,Pu=null;function dC(e){if(ra!==null&&ra===e)return Pu;const t=[],n=e.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi,(i,s)=>(t.push(s),"")),o=t.join(`
`),r=o.trim()?Fm.inlineContent(n,o,{inlinePseudoElements:!1,preserveImportant:!1,preserveMediaQueries:!1,preserveFontFaces:!1,removeStyleTags:!0}):n;return ra=e,Pu=r,r}function bs(e){const n=new DOMParser().parseFromString(`<!doctype html><html><body><div id="__wx_root__">${e}</div></body></html>`,"text/html"),o=n.getElementById("__wx_root__");return{doc:n,container:o}}function Bu(e){return e.innerHTML}function mr(e){if(!e)return[];const t=[],n="\0";let o=0,r="";for(const i of e)i==="("&&o++,i===")"&&(o=Math.max(0,o-1)),r+=o>0&&i===";"?n:i;for(const i of r.split(";")){const s=i.replace(new RegExp(n,"g"),";").trim();if(!s)continue;const a=s.indexOf(":");if(a<0)continue;let l=s.slice(0,a).trim(),c=s.slice(a+1).trim(),u=!1;/!important\s*$/i.test(c)&&(u=!0,c=c.replace(/!important\s*$/i,"").trim()),!(!l||!c)&&t.push({prop:l,value:c,important:u})}return t}function ri(e){return e.map(t=>`${t.prop}: ${t.value}${t.important?" !important":""}`).join("; ")}function Lo(e,t){const n=[e];for(;n.length;){const o=n.pop();t(o);for(let r=o.children.length-1;r>=0;r--)n.push(o.children[r])}}function lh(e){let t=e;for(;t;){if(t.tagName.toLowerCase()==="svg")return!0;t=t.parentElement}return!1}function Dl(e,t){e.querySelectorAll("svg").forEach(o=>{Lo(o,t)})}const Fu="data-wx-list-wrap",fC="data-wx-list-flatten",pC="· ";function hC(e){const t=[];Lo(e,o=>{const r=o.tagName.toLowerCase();r!=="ul"&&r!=="ol"||mC(o)===2&&t.push(o)});for(const o of t){const r=ch(o);o.parentElement?.replaceChild(r,o)}const n=[];Lo(e,o=>{const r=o.tagName.toLowerCase();if(r!=="ul"&&r!=="ol")return;const i=o.parentElement;i&&i.hasAttribute(Fu)||n.push(o)});for(const o of n){const r=o.ownerDocument.createElement("section");r.setAttribute(Fu,"");const i=o.getAttribute("style")??"";i&&r.setAttribute("style",i),o.parentElement?.insertBefore(r,o),r.appendChild(o)}return t.length>0}function mC(e){let t=0,n=e.parentElement;for(;n;){const o=n.tagName.toLowerCase();(o==="ul"||o==="ol")&&t++,n=n.parentElement}return t}function ch(e){const t=e.ownerDocument,n=t.createDocumentFragment(),o=Array.from(e.children).filter(r=>r.tagName.toLowerCase()==="li");for(const r of o){const i=Array.from(r.children).filter(l=>{const c=l.tagName.toLowerCase();return c==="ul"||c==="ol"});for(const l of i){const c=ch(l);r.replaceChild(c,l)}const s=t.createElement("p");s.setAttribute(fC,""),s.appendChild(t.createTextNode(pC));const a=[];for(;r.firstChild;){const l=r.firstChild;l.nodeType===1&&l.tagName.toLowerCase()==="p"?(a.push(l),r.removeChild(l)):s.appendChild(l)}s.childNodes.length>1&&n.appendChild(s);for(const l of a)n.appendChild(l)}return n}const gC=/^(fn|fnref|footnote)[-\d]/i;function bC(e){Lo(e,t=>{if(t.hasAttribute("id")){const i=t.getAttribute("id")??"";(lh(t)||!gC.test(i))&&t.removeAttribute("id")}const n=t.getAttribute("style");if(!n)return;const o=mr(n),r=o.filter(i=>!Kp.has(i.prop.toLowerCase()));r.length!==o.length&&(r.length===0?t.removeAttribute("style"):t.setAttribute("style",ri(r)))})}function yC(e){const t=[],n=e.getElementsByTagName("*");for(let o=0;o<n.length;o++){const r=n[o],i=r.tagName.toLowerCase();if(Ol.has(i)){t.push(r);continue}if(i==="iframe"){const s=r.getAttribute("src")??"";Ll.some(l=>l.test(s))||t.push(r)}}for(const o of t)o.remove()}function vC(e){Lo(e,t=>{const n=t.getAttribute("style");if(!n)return;const o=mr(n),r=o.filter(i=>i.prop.toLowerCase()!=="font-family");r.length!==o.length&&(r.length===0?t.removeAttribute("style"):t.setAttribute("style",ri(r)))})}const wC=/url\(\s*(['"])([^'"]*)\1\s*\)/g;function ju(e){return e.replace(wC,(t,n,o)=>`url(${o})`)}function SC(e){Dl(e,t=>{for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];if(!r.value.includes("url("))continue;const i=ju(r.value);i!==r.value&&t.setAttribute(r.name,i)}const n=t.getAttribute("style");if(n&&n.includes("url(")){const o=mr(n).map(r=>({...r,value:ju(r.value)}));t.setAttribute("style",ri(o))}})}function kC(e){Dl(e,t=>{t.hasAttribute("id")&&t.removeAttribute("id")})}const xC="data-wx-keep-flex";function _C(e){Lo(e,t=>{if(t.hasAttribute(xC))return;const n=t.getAttribute("style");if(!n)return;const o=mr(n);let r=!1;const i=o.map(s=>{if(s.prop.toLowerCase()!=="display")return s;const a=s.value.toLowerCase();return a==="flex"||a==="inline-flex"?(r=!0,{...s,value:a==="inline-flex"?"inline-block":"block"}):s});r&&t.setAttribute("style",ri(i))})}const CC=new Set(["#fff","#ffffff","white"]),$C=/^\s*rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)\s*$/i;function Hu(e){const t=e.trim().toLowerCase();return CC.has(t)||$C.test(t)}const EC=new Set(["fill","stroke","stop-color","flood-color","lighting-color"]),TC=new Set(["fill","stroke","color","background","background-color","stop-color"]);function AC(e){Dl(e,t=>{for(const r of Array.from(EC)){const i=t.getAttribute(r);i&&Hu(i)&&t.setAttribute(r,Iu)}const n=t.getAttribute("style");if(!n)return;const o=mr(n).map(r=>TC.has(r.prop.toLowerCase())&&Hu(r.value)?{...r,value:Iu}:r);t.setAttribute("style",ri(o))})}const IC="data-wx-list-wrap",RC="data-wx-keep-flex",MC=/^(fn|fnref|footnote)[-\d]/i,OC=5;function LC(e){const t=e.tagName.toLowerCase(),n=(e.getAttribute("class")??"").trim().split(/\s+/).filter(Boolean).slice(0,3);return n.length>0?`${t}.${n.join(".")}`:t}function wo(e,t){e.length<OC&&e.push(t)}function NC(e){if(!e||!e.trim())return{entries:[],total:0};try{return uh(bs(e).container)}catch{return{entries:[],total:0}}}function uh(e){const t={listWrap:0,deepList:0,strippedId:0,strippedPos:0,hardTag:0,disallowedIframe:0,fontFamily:0,flexFallback:0,svgId:0},n={strippedId:[],strippedPos:[],hardTag:[],disallowedIframe:[],fontFamily:[],flexFallback:[],svgId:[]};try{Lo(e,r=>{if(r===e)return;const i=r.tagName.toLowerCase(),s=LC(r);if(i==="ul"||i==="ol"){const l=r.parentElement;(!l||!l.hasAttribute(IC))&&t.listWrap++;let c=0,u=r.parentElement;for(;u;){const d=u.tagName.toLowerCase();(d==="ul"||d==="ol")&&c++,u=u.parentElement}c===2&&t.deepList++}if(r.hasAttribute("id")){const l=r.getAttribute("id")??"";lh(r)?(t.svgId++,wo(n.svgId,{selector:s,before:`id="${l}"`})):MC.test(l)||(t.strippedId++,wo(n.strippedId,{selector:s,before:`id="${l}"`}))}if(Ol.has(i)&&(t.hardTag++,wo(n.hardTag,{selector:s,before:`<${i}>`})),i==="iframe"){const l=r.getAttribute("src")??"";Ll.some(u=>u.test(l))||(t.disallowedIframe++,wo(n.disallowedIframe,{selector:s,before:`src="${l}"`}))}const a=r.getAttribute("style");if(a){const l=mr(a);for(const c of l){const u=c.prop.toLowerCase();Kp.has(u)&&(t.strippedPos++,wo(n.strippedPos,{selector:s,before:`${c.prop}: ${c.value}`})),u==="font-family"&&(t.fontFamily++,wo(n.fontFamily,{selector:s,before:`${c.prop}: ${c.value}`})),u==="display"&&/flex/i.test(c.value)&&!r.hasAttribute(RC)&&(t.flexFallback++,wo(n.flexFallback,{selector:s,before:`display: ${c.value}`}))}}})}catch{}const o=[];return t.listWrap&&o.push({patch:"patchListWrap",label:"列表外包 <section>（保住外边距）",count:t.listWrap}),t.deepList&&o.push({patch:"patchListWrap",label:"≥ 3 层嵌套列表扁平化为段落",count:t.deepList}),t.strippedId&&o.push({patch:"stripForbiddenAttrs",label:"删除 id 属性（脚注锚点除外）",count:t.strippedId,samples:n.strippedId}),t.strippedPos&&o.push({patch:"stripForbiddenAttrs",label:"剥离 position/top/z-index 等定位声明",count:t.strippedPos,samples:n.strippedPos}),t.hardTag&&o.push({patch:"stripForbiddenTags",label:"移除 style/script/meta/link 等标签",count:t.hardTag,samples:n.hardTag}),t.disallowedIframe&&o.push({patch:"stripForbiddenTags",label:"剥离非白名单 iframe",count:t.disallowedIframe,samples:n.disallowedIframe}),t.fontFamily&&o.push({patch:"stripFontFamily",label:"剥离 inline font-family",count:t.fontFamily,samples:n.fontFamily}),t.flexFallback&&o.push({patch:"patchFlexToFallback",label:"display:flex → block 降级",count:t.flexFallback,samples:n.flexFallback}),t.svgId&&o.push({patch:"patchSvgIds",label:"SVG 子树 id 清理",count:t.svgId,samples:n.svgId}),{entries:o,total:o.reduce((r,i)=>r+i.count,0)}}function DC(e,t={}){return dh(bs(e).container,t)}function PC(e,t={}){const{container:n}=bs(e),o=uh(n);return{html:dh(n,t),patchLog:o}}function dh(e,t){return hC(e)&&(e=bs(Bu(e)).container),bC(e),yC(e),vC(e),SC(e),kC(e),_C(e),t.svgWhiteBg!==!1&&AC(e),Bu(e)}const BC={id:"wechat",name:"微信公众号",status:"stable",patch:(e,t)=>DC(e,t??{}),inspect:NC,patchWithLog:(e,t)=>PC(e,t??{})};function FC(e,t={}){return e}const jC={id:"zhihu",name:"知乎专栏",status:"placeholder",patch:(e,t)=>FC(e,t??{})};function HC(e,t={}){return e}const VC={id:"xhs",name:"小红书",status:"placeholder",patch:(e,t)=>HC(e,t??{})},fh=[BC,jC,VC],UC=Object.fromEntries(fh.map(e=>[e.id,e])),ph="wechat";function zC(e){const t=UC[e];return t||Lp("PLATFORM_UNSUPPORTED",`Unknown platform id: "${e}"`,{hint:`Known: ${fh.map(n=>n.id).join(", ")}`}),t}const Vu=new WeakMap;let WC=0;function hh(e){let t=Vu.get(e);return t===void 0&&(t=++WC,Vu.set(e,t)),t}const KC=12,Uu=Nl(KC);function qC(e){return e.length===0?"":[...e].sort((t,n)=>t.id.localeCompare(n.id)).map(t=>`${t.id}@${t.updatedAt}`).join("|")}function GC(e,t){const n=`${hh(e)}:${qC(t)}`,o=Uu.get(n);if(o)return o;const r=I_({theme:e,customVariants:t});return r.renderer.rules.fence=(i,s)=>{const a=i[s],l=a.info?a.info.trim():"",{title:c,attrs:u}=or(l),d=c.split(/\s+/)[0]??"",{html:f,language:h}=cC(a.content,d),g=e.variants.codeBlock,m=u.variant,w=m&&m in $i?m:g;return($i[w]??$i.bare).render(e,{language:h,codeInnerHtml:f})+`
`},Uu.set(n,r),r}const YC=16,zu=Nl(YC);function JC(e){return!e||e.length===0?"":[...e].sort((t,n)=>t.id.localeCompare(n.id)).map(t=>`${t.id}@${t.updatedAt}`).join("|")}function ZC(e){const t=e.platform??ph;return JSON.stringify([hh(e.theme),e.md,t,e.wxPatch??null,JC(e.userVariants)])}function mh(e){const t=ZC(e),n=zu.get(t);if(n)return n;const{md:o,theme:r}=e,{config:i,body:s,issues:a}=Oo(o),l=e.userVariants??[],c=l.filter(D=>D.level==="custom"),u=GC(r,c),d={};i.variants&&(d.__wxPageVariants=i.variants),l.length>0&&(d.__wxUserVariants=new Map(l.map(D=>[D.id,D])));const f=u.render(s,d),h=X_(r),g=[`<section class="${kt}">`,`<style>${h}
${uC}</style>`,f,"</section>"].join(`
`),m=dC(g),w=zC(e.platform??ph);let k,x;if(w.patchWithLog){const D=w.patchWithLog(m,e.wxPatch);k=D.patchLog,x=D.html}else k=w.inspect?w.inspect(m):{entries:[],total:0},x=w.patch(m,e.wxPatch);const L=QC(s),$=Math.max(1,Math.ceil(L/300)),N={html:x,wordCount:L,readingTime:$,patchLog:k,pageConfig:i,frontmatterIssues:a};return zu.set(t,N),N}function QC(e){const t=(e.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g)??[]).length,n=e.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g," ").split(/\s+/).filter(Boolean).length;return t+n}function XC(e){return{id:e.id,name:e.name,description:e.description,audience:e.audience,palette:e.palette,variants:e.variants,signatureContainers:e.signatureContainers??[]}}function e$(){return om.map(XC)}function Wu(e){const t=rc[e];return t||Lp("RESOURCE_NOT_FOUND",`Unknown persona id: "${e}"`,{path:"persona.id",hint:`Known ids: ${Object.keys(rc).join(", ")}`}),t}Object.freeze({hexPattern:sm.source,minFontSize:im,minStrokeWidth:rm,allowedFontFamilies:Object.freeze([...am])});function Ku(e){return structuredClone(e)}function t$(e){const t={current:e},n=Ku(Wu(e)),o=Rn(n);let r=JSON.stringify(n);const i=te(()=>cm(o)),s=te(()=>lm(o)),a=te(()=>JSON.stringify(o)!==r),l=e$().map(g=>({id:g.id,name:g.name})),c=te(()=>t.current);function u(g){if(!l.some(w=>w.id===g))return;const m=Ku(Wu(g));Object.keys(o).forEach(w=>delete o[w]),Object.assign(o,m),t.current=g,r=JSON.stringify(m)}function d(){u(t.current)}function f(){return JSON.stringify(o,null,2)}function h(g){try{const m=JSON.parse(g);return!m||typeof m!="object"?!1:(Object.keys(o).forEach(w=>delete o[w]),Object.assign(o,m),!0)}catch{return!1}}return{baseId:c,draft:o,validation:i,previewTheme:s,dirty:a,baseOptions:l,setBase:u,reset:d,exportJson:f,importJson:h}}function gh(e){const t=e.min??300,n=e.maxViewportRatio??.6,o=J(r());function r(){const l=dn(e.storageKey);if(l===null||l===""||l==="null")return null;const c=Number(l);return!Number.isFinite(c)||c<t?null:c}const i=J(typeof window<"u"?window.innerWidth:1280);function s(){i.value=window.innerWidth}zt(()=>window.addEventListener("resize",s)),yt(()=>window.removeEventListener("resize",s));const a=te(()=>Math.max(t,Math.floor(i.value*n)));return Pe(o,l=>{Yt(e.storageKey,l===null?"":String(l))}),Pe([i,o],()=>{o.value!==null&&o.value>a.value&&(o.value=a.value)}),{width:o,maxWidth:a,defaultWidth:e.defaultWidth,minWidth:t}}const bh="wechat-typeset:theme:last",ia="wechat-typeset:editor-width",n$="wechat-typeset:component-palette-width",o$="wechat-typeset:persona-studio-width",r$=["disabled"],i$={class:"body"},s$={class:"section"},a$={class:"row"},l$=["value"],c$=["value"],u$={class:"row"},d$=["value"],f$={key:0,class:"hint hint-warn"},p$={class:"row"},h$={class:"row row-text"},m$={class:"section"},g$={class:"row"},b$=["value"],y$={class:"row"},v$=["value"],w$={class:"row"},S$=["value"],k$={class:"row"},x$=["value"],_$={class:"row"},C$=["value"],$$={class:"row"},E$=["value"],T$={class:"section"},A$={class:"row"},I$=["value"],R$={class:"row"},M$=["value"],O$={class:"row"},L$=["value"],N$={class:"row"},D$=["value"],P$={class:"section"},B$={class:"row"},F$=["value"],j$={class:"row"},H$=["value"],V$={class:"row"},U$=["value"],z$={class:"section"},W$={class:"row-label"},K$=["value","onChange"],q$=["value"],G$={class:"section"},Y$={class:"row"},J$=["value"],Z$=["value"],Q$={key:0,class:"section section-warn",open:""},X$={class:"section-title"},eE={class:"issues"},tE={class:"actions"},nE=["disabled"],oE={key:0,class:"action-status",role:"status","aria-live":"polite","aria-atomic":"true"},rE=400,iE=Ke({__name:"PersonaStudio",props:{initialBaseId:{}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,r=t$(n.initialBaseId),i=r.draft,{width:s,maxWidth:a,defaultWidth:l,minWidth:c}=gh({storageKey:o$,defaultWidth:rE,min:360,maxViewportRatio:.55}),u=te(()=>s.value===null?void 0:{width:s.value+"px"}),d=Rn({status:""});let f=null;function h(j,R=2e3){d.status=j,f!=null&&window.clearTimeout(f),f=window.setTimeout(()=>{d.status="",f=null},R)}const g=[["admonition","admonition (tip/warning/info/danger)"],["quote","quote-card"],["compare","compare 对比块"],["steps","steps 步骤"],["divider","divider 分隔"],["sectionTitle","section-title 章节"],["codeBlock","code block 代码块"],["note","note 第五态"]],m=["geometric","soft","serif","playful"],w=te(()=>r.validation.value.errors),k=te(()=>r.validation.value.warnings),x=te(()=>r.validation.value.ok);function L(){if(!x.value){h("校验未通过，先修正再应用",2500);return}Zt.value=r.previewTheme.value,h("已应用为当前预览主题")}function $(){const j=r.exportJson(),R=`persona-${i.id||"custom"}.spec.json`;oi(R,j,"application/json"),h("已下载 spec.json")}function N(){r.dirty.value&&!window.confirm("放弃当前所有改动？")||(r.reset(),h("已恢复 base persona 默认"))}function D(j){const R=j.target.value;if(r.dirty.value&&!window.confirm("切换 base 将丢失当前改动，继续？")){j.target.value=r.baseId.value;return}r.setBase(R)}function _(j,R,B){const V=Number(B.target.value);Number.isFinite(V)&&(j[R]=V)}function v(j,R){En[j].includes(R)&&(i.variants[j]=R)}function S(j){return m.includes(j)?j:void 0}function I(j){const R=S(j.target.value);R&&(i.svgVariant=R)}const C=new Set(r.baseOptions.map(j=>j.id));function F(j){const R=j.target.value.trim().toLowerCase().replace(/[^a-z0-9-]/g,"-");i.id=R}const E=te(()=>C.has(i.id)&&i.id!==r.baseId.value);return(j,R)=>(O(),P("aside",{class:"studio","aria-label":"主题编辑器",style:Qt(u.value)},[Me(Op,{width:A(s),min:A(c),max:A(a),"default-width":A(l),"onUpdate:width":R[0]||(R[0]=B=>s.value=B)},null,8,["width","min","max","default-width"]),Me(hs,{title:"主题编辑器",size:"sm",onClose:R[1]||(R[1]=B=>o("close"))},{actions:Jt(()=>[p("button",{class:"head-action",disabled:!A(r).dirty.value,onClick:N}," 还原 ",8,r$)]),_:1}),p("div",i$,[p("section",s$,[R[21]||(R[21]=p("header",{class:"section-title"},"基底主题",-1)),p("label",a$,[R[17]||(R[17]=p("span",{class:"row-label"},"Base persona",-1)),p("select",{value:A(r).baseId.value,onChange:D},[(O(!0),P(ue,null,Le(A(r).baseOptions,B=>(O(),P("option",{key:B.id,value:B.id},U(B.name)+" ("+U(B.id)+") ",9,c$))),128))],40,l$)]),p("label",u$,[R[18]||(R[18]=p("span",{class:"row-label"},"新主题 id",-1)),p("input",{value:A(i).id,placeholder:"my-theme",onInput:F},null,40,d$)]),E.value?(O(),P("div",f$,' 该 id 与内置主题冲突；用于"另存为"前请改名。 ')):ae("",!0),p("label",p$,[R[19]||(R[19]=p("span",{class:"row-label"},"中文名",-1)),ot(p("input",{"onUpdate:modelValue":R[2]||(R[2]=B=>A(i).name=B),placeholder:"我的主题"},null,512),[[Ut,A(i).name]])]),p("label",h$,[R[20]||(R[20]=p("span",{class:"row-label"},"一句描述",-1)),ot(p("textarea",{"onUpdate:modelValue":R[3]||(R[3]=B=>A(i).description=B),rows:"2"},null,512),[[Ut,A(i).description]])])]),Me(bk,{palette:A(i).palette,status:A(i).status},null,8,["palette","status"]),p("details",m$,[R[28]||(R[28]=p("summary",{class:"section-title"},"字号 / 字距 · typography",-1)),p("label",g$,[R[22]||(R[22]=p("span",{class:"row-label"},"baseSize (px, ≥14)",-1)),p("input",{type:"number",min:"14",max:"22",value:A(i).typography.baseSize,onInput:R[4]||(R[4]=B=>_(A(i).typography,"baseSize",B))},null,40,b$)]),p("label",y$,[R[23]||(R[23]=p("span",{class:"row-label"},"lineHeight",-1)),p("input",{type:"number",min:"1",max:"2.5",step:"0.05",value:A(i).typography.lineHeight,onInput:R[5]||(R[5]=B=>_(A(i).typography,"lineHeight",B))},null,40,v$)]),p("label",w$,[R[24]||(R[24]=p("span",{class:"row-label"},"h1Size",-1)),p("input",{type:"number",min:"14",max:"48",value:A(i).typography.h1Size,onInput:R[6]||(R[6]=B=>_(A(i).typography,"h1Size",B))},null,40,S$)]),p("label",k$,[R[25]||(R[25]=p("span",{class:"row-label"},"h2Size",-1)),p("input",{type:"number",min:"14",max:"36",value:A(i).typography.h2Size,onInput:R[7]||(R[7]=B=>_(A(i).typography,"h2Size",B))},null,40,x$)]),p("label",_$,[R[26]||(R[26]=p("span",{class:"row-label"},"h3Size",-1)),p("input",{type:"number",min:"14",max:"28",value:A(i).typography.h3Size,onInput:R[8]||(R[8]=B=>_(A(i).typography,"h3Size",B))},null,40,C$)]),p("label",$$,[R[27]||(R[27]=p("span",{class:"row-label"},"letterSpacing (px)",-1)),p("input",{type:"number",min:"-2",max:"4",step:"0.1",value:A(i).typography.letterSpacing,onInput:R[9]||(R[9]=B=>_(A(i).typography,"letterSpacing",B))},null,40,E$)])]),p("details",T$,[R[33]||(R[33]=p("summary",{class:"section-title"},"间距 · spacing (px)",-1)),p("label",A$,[R[29]||(R[29]=p("span",{class:"row-label"},"paragraph",-1)),p("input",{type:"number",min:"0",max:"48",value:A(i).spacing.paragraph,onInput:R[10]||(R[10]=B=>_(A(i).spacing,"paragraph",B))},null,40,I$)]),p("label",R$,[R[30]||(R[30]=p("span",{class:"row-label"},"section",-1)),p("input",{type:"number",min:"0",max:"72",value:A(i).spacing.section,onInput:R[11]||(R[11]=B=>_(A(i).spacing,"section",B))},null,40,M$)]),p("label",O$,[R[31]||(R[31]=p("span",{class:"row-label"},"listItem",-1)),p("input",{type:"number",min:"0",max:"24",value:A(i).spacing.listItem,onInput:R[12]||(R[12]=B=>_(A(i).spacing,"listItem",B))},null,40,L$)]),p("label",N$,[R[32]||(R[32]=p("span",{class:"row-label"},"containerPadding",-1)),p("input",{type:"number",min:"0",max:"48",value:A(i).spacing.containerPadding,onInput:R[13]||(R[13]=B=>_(A(i).spacing,"containerPadding",B))},null,40,D$)])]),p("details",P$,[R[37]||(R[37]=p("summary",{class:"section-title"},"圆角 · radius (px)",-1)),p("label",B$,[R[34]||(R[34]=p("span",{class:"row-label"},"sm",-1)),p("input",{type:"number",min:"0",max:"24",value:A(i).radius.sm,onInput:R[14]||(R[14]=B=>_(A(i).radius,"sm",B))},null,40,F$)]),p("label",j$,[R[35]||(R[35]=p("span",{class:"row-label"},"md",-1)),p("input",{type:"number",min:"0",max:"32",value:A(i).radius.md,onInput:R[15]||(R[15]=B=>_(A(i).radius,"md",B))},null,40,H$)]),p("label",V$,[R[36]||(R[36]=p("span",{class:"row-label"},"lg",-1)),p("input",{type:"number",min:"0",max:"48",value:A(i).radius.lg,onInput:R[16]||(R[16]=B=>_(A(i).radius,"lg",B))},null,40,U$)])]),p("details",z$,[R[38]||(R[38]=p("summary",{class:"section-title"},"骨架变体 · variants",-1)),(O(),P(ue,null,Le(g,([B,V])=>p("label",{key:B,class:"row"},[p("span",W$,U(V),1),p("select",{value:A(i).variants[B],onChange:z=>v(B,z.target.value)},[(O(!0),P(ue,null,Le(A(En)[B],z=>(O(),P("option",{key:z,value:z},U(z),9,q$))),128))],40,K$)])),64))]),p("details",G$,[R[40]||(R[40]=p("summary",{class:"section-title"},"SVG 字形 · svgVariant",-1)),p("label",Y$,[R[39]||(R[39]=p("span",{class:"row-label"},"几何 / 柔和 / 衬线 / 活泼",-1)),p("select",{value:A(i).svgVariant??"geometric",onChange:I},[(O(),P(ue,null,Le(m,B=>p("option",{key:B,value:B},U(B),9,Z$)),64))],40,J$)]),R[41]||(R[41]=p("p",{class:"hint"}," 仅作为 applyPalette 用户自定义配色路径的 fallback；spec-first 主路径不消费此字段。 ",-1))]),w.value.length||k.value.length?(O(),P("details",Q$,[p("summary",X$," 校验 · "+U(w.value.length)+" error / "+U(k.value.length)+" warning ",1),p("ul",eE,[(O(!0),P(ue,null,Le(w.value,(B,V)=>(O(),P("li",{key:`e${V}`,class:"issue issue-err"},[p("code",null,U(B.path),1),We(" "+U(B.message),1)]))),128)),(O(!0),P(ue,null,Le(k.value,(B,V)=>(O(),P("li",{key:`w${V}`,class:"issue issue-warn"},[p("code",null,U(B.path),1),We(" "+U(B.message),1)]))),128))])])):ae("",!0)]),p("footer",tE,[p("button",{class:"action-btn",disabled:!x.value,onClick:L}," 应用为当前主题 ",8,nE),p("button",{class:"action-btn action-secondary",onClick:$}," 下载 spec.json "),d.status?(O(),P("span",oE,U(d.status),1)):ae("",!0)])],4))}}),sE=Ge(iE,[["__scopeId","data-v-bec87e8e"]]);function aE(){return ar('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const lE={meta:{id:"intro",kind:"none",name:"开场导语",description:"文章开头的引子卡，独立视觉"},thumbnail:aE,snippets:[{presetId:"free-intro",name:"开场导语",description:"文章开头的引子卡，独立视觉",markdown:`::: intro
一段用来承载"本文将讨论什么"的导语。
:::
`}]};function cE(){return ar('<rect x="6" y="22" width="63" height="32" rx="4" fill="#f7f8fa"/><circle cx="16" cy="38" r="6" fill="#c0c6cf"/><rect x="28" y="32" width="24" height="3" fill="#1f2328"/><rect x="28" y="40" width="34" height="2" fill="#c0c6cf"/>')}const uE={meta:{id:"author",kind:"none",name:"作者栏",description:"姓名 + 角色 + 一句话"},thumbnail:cE,snippets:[{presetId:"free-author",name:"作者栏",description:"姓名 + 角色 + 一句话",markdown:`::: author 张三 role=主笔
一段作者自述或背景。
:::
`}]};function dE(){return ar('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const fE={meta:{id:"cover",kind:"none",name:"封面卡",description:"标题 + 一张图 + 一行描述"},thumbnail:dE,snippets:[{presetId:"free-cover",name:"封面卡",description:"标题 + 一张图 + 一行描述",markdown:`::: cover 本期封面
![封面图](https://placehold.co/1200x630)

_一句描述_
:::
`}]};function pE(){return ar('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const hE={meta:{id:"highlight",kind:"none",name:"重点高亮块",description:"整段荧光底色"},thumbnail:pE,snippets:[{presetId:"free-highlight",name:"重点高亮块",description:"整段荧光底色",markdown:`::: highlight
这一段将被整段高亮，用来压重点。
:::
`}]};function mE(){return ar('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const gE={meta:{id:"voice-card",kind:"none",name:"音频占位",description:"粘贴后微信识别为 mpvoice 真节点"},thumbnail:mE,snippets:[{presetId:"free-voice-card",name:"音频占位",description:"粘贴后微信识别为 mpvoice 真节点",markdown:`::: voice-card 本期播客
粘贴后在公众号后台从素材库重新插入。
:::
`}]};function bE(){return ar('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const yE={meta:{id:"video-card",kind:"none",name:"腾讯视频",description:"直接渲染 v.qq.com iframe"},thumbnail:bE,snippets:[{presetId:"free-video-card-qq",name:"腾讯视频",description:"直接渲染 v.qq.com iframe",markdown:`::: video-card qqvid=v326875u4ek
视频标题
:::
`}]},vE=[lE,uE,fE,hE,gE,yE],wE=[...fm,...vE],SE=["accent-bar","pill-tag","ticket-notch","card-shadow","minimal-underline","terminal","dashed-border","top-bottom-rule","manpage-log","sidenote-latex","marginalia","ledger-cell","bubble-organic","magazine-pull","report-section","news-row","news-underline","mook-tag","slab-corner"],kE=["classic","magazine-dropcap","column-rule","frame-brackets"],xE=["column-card","stacked-row","ledger","data-card"],_E=["number-circle","ribbon-chain","timeline-dot"],CE=["wave","dots","flower","rule","glyph"],$E=["bordered","cornered"],EE=["bare","header-bar"],TE=["minimal-callout","box-callout","side-bar"],AE=["plain"],IE=["lined","inline-flow"],RE=["card-list","academic-refs"],ME=["bare","follow-card","qr-stack"],OE=["button-led","triptych-actions"],LE=["giant-mark","centered-rule","stamp-quote","margin-pull"],NE=["danger-bar","mono-disclaimer","ai-notice","stamped-banner"],DE=["rule-grid","zebra-rows","key-value","price-tier"],PE=["duo","triptych","nine-grid","ribbon-strip"],BE=["qa-rows","chat-bubbles","name-prefix","interview-column"],FE=["numbered-faq","hanging-qa","seal-stamp","query-annotation","sample-query","field-card","circle-square","typed-block"],jE=["intro","author","cover","highlight","voice-card","video-card"],HE={admonition:SE,quote:kE,compare:xE,steps:_E,divider:CE,sectionTitle:$E,codeBlock:EE,note:TE,highlight:AE,footnotes:IE,recommend:RE,qrcode:ME,footerCTA:OE,pullQuote:LE,announcement:NE,tableCard:DE,gallery:PE,dialogue:BE,qaBlock:FE,none:jE};function VE(e,t){const n=e.thumbnail?e.thumbnail(t.thumbArgs):"",o=dm(e.meta),r=t.designedFor?[...t.designedFor]:o.length>0?[...o]:void 0;return{source:"builtin",id:t.presetId,name:t.name,description:t.description,kind:e.meta.kind,variantId:e.meta.id,designedFor:r,markdownSnippet:t.markdown,thumbnailSvg:n}}function UE(){const e=[],t=["admonition","quote","compare","steps","divider","sectionTitle","codeBlock","note","highlight","footnotes","recommend","qrcode","footerCTA","pullQuote","announcement","tableCard","gallery","dialogue","qaBlock","none"];for(const n of t)for(const o of um(wE,n,HE[n]))for(const r of o.snippets)e.push(VE(o,r));return e}const zE=UE(),WE=zE,_r=[{id:"template",label:"主题模板",subs:[{key:"tpl-current",label:"当前主题精选",source:{type:"theme-template"}}]},{id:"callout",label:"提示与强调",subs:[{key:"k-admonition",label:"提示",source:{type:"kind",kind:"admonition"}},{key:"k-note",label:"补注",source:{type:"kind",kind:"note"}},{key:"k-quote",label:"引用",source:{type:"kind",kind:"quote"}},{key:"k-pullQuote",label:"引文",source:{type:"kind",kind:"pullQuote"}},{key:"k-announcement",label:"公告",source:{type:"kind",kind:"announcement"}},{key:"k-highlight",label:"高亮",source:{type:"kind",kind:"highlight"}}]},{id:"structure",label:"结构",subs:[{key:"k-sectionTitle",label:"章节",source:{type:"kind",kind:"sectionTitle"}},{key:"k-divider",label:"分隔",source:{type:"kind",kind:"divider"}},{key:"k-steps",label:"步骤",source:{type:"kind",kind:"steps"}},{key:"k-compare",label:"对比",source:{type:"kind",kind:"compare"}},{key:"k-codeBlock",label:"代码",source:{type:"kind",kind:"codeBlock"}}]},{id:"data-dialog",label:"数据与对话",subs:[{key:"k-tableCard",label:"表格",source:{type:"kind",kind:"tableCard"}},{key:"k-gallery",label:"图集",source:{type:"kind",kind:"gallery"}},{key:"k-dialogue",label:"对话",source:{type:"kind",kind:"dialogue"}},{key:"k-qaBlock",label:"问答",source:{type:"kind",kind:"qaBlock"}}]},{id:"interaction",label:"互动",subs:[{key:"k-recommend",label:"推荐",source:{type:"kind",kind:"recommend"}},{key:"k-qrcode",label:"二维码",source:{type:"kind",kind:"qrcode"}},{key:"k-footerCTA",label:"文末 CTA",source:{type:"kind",kind:"footerCTA"}},{key:"k-footnotes",label:"脚注",source:{type:"kind",kind:"footnotes"}}]},{id:"frame",label:"页饰",subs:[{key:"f-intro",label:"开场",source:{type:"kind",kind:"none",variantIds:["intro"]}},{key:"f-author",label:"作者",source:{type:"kind",kind:"none",variantIds:["author"]}},{key:"f-cover",label:"封面",source:{type:"kind",kind:"none",variantIds:["cover"]}},{key:"f-voice",label:"音频卡",source:{type:"kind",kind:"none",variantIds:["voice-card"]}},{key:"f-video",label:"视频卡",source:{type:"kind",kind:"none",variantIds:["video-card"]}},{key:"f-highlight",label:"重点高亮",source:{type:"kind",kind:"none",variantIds:["highlight"]}}]},{id:"mine",label:"我的",subs:[{key:"m-user",label:"我的组件",source:{type:"user"}},{key:"m-uv",label:"我的样式",source:{type:"uv"}}]}];function KE(e){const t=e.templates??{};return[{id:"cover",name:"封面卡",md:t.cover,hint:"文首封面"},{id:"authorBar",name:"作者栏",md:t.authorBar,hint:"作者+日期"},{id:"tip",name:"小贴士",md:t.tip,hint:"tip 容器"},{id:"compare",name:"对比两列",md:t.compare,hint:"左右两栏"},{id:"steps",name:"步骤流程",md:t.steps,hint:"分步推进"},{id:"footerCTA",name:"文末引导",md:t.footerCTA,hint:"关注/收藏"},{id:"recommend",name:"推荐阅读",md:t.recommend,hint:"文末链接"}].filter(o=>!!o.md).map(o=>({source:"builtin",id:`tpl-${e.id}-${o.id}`,name:o.name,description:o.hint,kind:"none",markdownSnippet:o.md,thumbnailSvg:qE(o.id,e)}))}function qE(e,t){const n=t.tokens.colors,o=e==="compare"||e==="steps"?n.secondary:n.primary,r=e.slice(0,1).toUpperCase();return`<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="73" height="73" rx="6" fill="${n.bg}" stroke="${n.border}" stroke-width="1"/><rect x="10" y="14" width="55" height="4" rx="2" fill="${o}"/><rect x="10" y="24" width="42" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.6"/><rect x="10" y="31" width="50" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.4"/><rect x="10" y="38" width="38" height="2.5" rx="1.25" fill="${n.textMuted}" opacity="0.4"/><text x="58" y="62" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="${o}" opacity="0.7">${r}</text></svg>`}function GE(e){const t=e.trim().charAt(0)||"组";return`<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="75" height="75" rx="6" fill="#eef1f6"/><text x="37.5" y="48" text-anchor="middle" font-size="32" font-weight="700" fill="#6a737d">${pm(t)}</text></svg>`}const yh="wechat-typeset:user-components",YE=()=>yl("uc");function JE(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.name=="string"&&typeof t.markdownSnippet=="string"&&typeof t.thumbnailSvg=="string"}function gr(){const e=us(yh,[]);return Array.isArray(e)?e.filter(JE).map(t=>({...t,source:"user"})):[]}function ys(e){ds(yh,e)}function ZE(){return[...gr()].sort((e,t)=>t.createdAt-e.createdAt)}function vh(e){const t=gr(),n={source:"user",id:YE(),name:e.name.trim()||"未命名组件",description:e.description?.trim()??"",kind:e.kind??"none",variantId:e.variantId,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg??GE(e.name),sourceMarkdown:e.sourceMarkdown,linkedUserVariantId:e.linkedUserVariantId,createdAt:Date.now()};return t.unshift(n),ys(t),n}function QE(e){const t=gr().filter(n=>n.id!==e);ys(t)}function XE(e,t){const n=gr(),o=n.findIndex(i=>i.id===e);if(o===-1)return;const r=n[o];return n[o]={...r,name:t.name??r.name,description:t.description??r.description,markdownSnippet:t.markdownSnippet??r.markdownSnippet,thumbnailSvg:t.thumbnailSvg??r.thumbnailSvg,linkedUserVariantId:t.linkedUserVariantId===void 0?r.linkedUserVariantId:t.linkedUserVariantId??void 0},ys(n),n[o]}function e4(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.name=="string"&&typeof t.markdownSnippet=="string"&&typeof t.thumbnailSvg=="string"}function t4(){return JSON.stringify({version:1,components:gr()},null,2)}function n4(e){let t;try{t=JSON.parse(e)}catch{return 0}const n=t&&typeof t=="object"&&"components"in t?t.components:t;if(!Array.isArray(n))return 0;const o=gr();let r=0;for(const i of n)e4(i)&&(o.some(s=>s.id===i.id)||(o.push(i),r+=1));return ys(o),r}const o4=/^(:::+)\s+(\S+)(.*)$/,r4=/^(`{3,})(.*)$/;function Pl(e){const t=e.split(`
`),n=[];let o=!1;for(let l=0;l<t.length;l++){const c=t[l],u=l+1,d=c.match(r4);if(d){if(o){o=!1;continue}o=!0;const x=d[2].trim();if(x){const{attrs:L}=or(x);L.variant&&!(L.variant in $i)&&n.push({kind:"unknown-variant",container:"code",variantKind:"codeBlock",variantId:L.variant,line:u})}continue}if(o)continue;const f=c.match(o4);if(!f)continue;const h=f[2],g=f[3],m=Zi(h);if(!m){n.push({kind:"unknown-fence",name:h,line:u});continue}if(!m.variantKind||!g)continue;const{attrs:w}=or(g.trim());if(!w.variant)continue;En[m.variantKind].includes(w.variant)||n.push({kind:"unknown-variant",container:h,variantKind:m.variantKind,variantId:w.variant,line:u})}const r=i4(n.filter(l=>l.kind==="unknown-fence").map(l=>l.name)),i=n.filter(l=>l.kind==="unknown-variant"),s=new Set,a=[];for(const l of i){const c=`${l.container}:${l.variantKind}:${l.variantId}`;s.has(c)||(s.add(c),a.push({container:l.container,variantKind:l.variantKind,variantId:l.variantId}))}return{ok:n.length===0,unknownFences:r,unknownVariants:a,issues:n}}function i4(e){return[...new Set(e)]}const wh="wechat-typeset:user-variants",s4=()=>yl("uv"),a4=new Set(["tokens","patch","custom"]);function l4(e){if(!e||typeof e!="object")return!1;const t=e;if(typeof t.id!="string"||!t.id||typeof t.name!="string"||typeof t.createdAt!="number"||typeof t.updatedAt!="number"||typeof t.level!="string"||!a4.has(t.level))return!1;if(t.level==="custom")return!(t.base!==null||typeof t.template!="string"||!t.css||typeof t.css!="object"||typeof t.css.wrapperCSS!="string");const n=t.base;return!n||typeof n!="object"||typeof n.kind!="string"||typeof n.variantId!="string"?!1:t.level==="tokens"?!!t.tokens&&typeof t.tokens=="object":t.level==="patch"?!!t.cssPatch&&typeof t.cssPatch=="object":!1}function ii(){const e=us(wh,[]);return Array.isArray(e)?e.filter(l4):[]}function Bl(e){return ds(wh,e)}function S6(){return[...ii()].sort((e,t)=>t.updatedAt-e.updatedAt)}function Sh(e){return ii().find(t=>t.id===e)}function c4(e){const t=Date.now(),n={...e,id:s4(),createdAt:t,updatedAt:t},o=ii();return o.unshift(n),Bl(o),n}function sa(e,t){const n=ii(),o=n.findIndex(s=>s.id===e);if(o===-1)return;const r=n[o],i=u4(r,t);return n[o]=i,Bl(n),i}function u4(e,t){const n={name:t.name??e.name,description:t.description??e.description,updatedAt:Date.now()};return e.level==="tokens"?{...e,...n,tokens:t.tokens??e.tokens}:e.level==="patch"?{...e,...n,cssPatch:t.cssPatch??e.cssPatch}:{...e,...n,template:t.template??e.template,css:t.css?{wrapperCSS:t.css.wrapperCSS??e.css.wrapperCSS,titleCSS:t.css.titleCSS??e.css.titleCSS,bodyCSS:t.css.bodyCSS??e.css.bodyCSS,svgSlot:t.css.svgSlot??e.css.svgSlot}:e.css}}function qu(e){const t=ii(),n=t.filter(o=>o.id!==e);return n.length===t.length?!1:(Bl(n),!0)}function Fl(e){const t=Pl(e.markdownSnippet);return t.ok?{ok:!0,entry:vh(e)}:{ok:!1,reason:"validation",result:t}}function d4(e,t){if(t.markdownSnippet!==void 0){const o=Pl(t.markdownSnippet);if(!o.ok)return{ok:!1,reason:"validation",result:o}}const n=XE(e,t);return n?{ok:!0,entry:n}:{ok:!1,reason:"not-found"}}function f4(){const e=J(0),t=()=>{e.value+=1};return{list:te(()=>(e.value,ZE())),create(n){const o=vh(n);return t(),o},remove(n){QE(n),t()},refresh:t}}function p4(e){return new TextEncoder().encode(e)}function h4(e){return new TextDecoder().decode(e)}function m4(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function g4(e){const t=(4-e.length%4)%4,n=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat(t),o=atob(n),r=new Uint8Array(o.length);for(let i=0;i<o.length;i++)r[i]=o.charCodeAt(i);return r}function b4(e){return m4(p4(JSON.stringify(e)))}function y4(e,t){if(!t)return null;try{const n=h4(g4(t)),o=JSON.parse(n);return e.validate(o)}catch{return null}}function v4(e){return e.origin??(typeof location<"u"?location.origin:"")}function w4(e){return e.pathname??(typeof location<"u"?location.pathname:"/")}function kh(e,t,n={}){return`${v4(n)}${w4(n)}#${e.prefix}${b4(t)}`}function jl(e,t){if(!t)return null;const n=t.startsWith("#")?t.slice(1):t;return n.startsWith(e.prefix)?y4(e,n.slice(e.prefix.length)):null}function Hl(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Ba=1,S4="share-component=";function k4(e){return!Hl(e)||typeof e.id!="string"||typeof e.name!="string"||typeof e.description!="string"||typeof e.kind!="string"||typeof e.markdownSnippet!="string"||typeof e.thumbnailSvg!="string"||e.variantId!==void 0&&typeof e.variantId!="string"?null:{id:e.id,name:e.name,description:e.description,kind:e.kind,variantId:typeof e.variantId=="string"?e.variantId:void 0,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg}}const Vl={prefix:S4,validate(e){if(!Hl(e)||e.v!==Ba||e.kind!=="component")return null;const t=k4(e.component);return t?{v:Ba,kind:"component",component:t}:null}};function x4(e){return{v:Ba,kind:"component",component:{id:e.id,name:e.name,description:e.description,kind:e.kind,variantId:e.variantId,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg}}}function _4(e,t,n,o=12){const r=e.left-n.width-o,i=r>=o,s=i?r:e.right+o,a=i?"left":"right",l=e.top+e.height/2-n.height/2,c=t.height-n.height-o,u=Math.max(o,Math.min(l,c));return{left:s,top:u,side:a}}const C4={class:"grid"},$4=["title","onClick","onDblclick","onMouseenter"],E4=["innerHTML"],T4={class:"name"},A4=["title"],I4={key:1,class:"cell-actions"},R4=["title","onClick"],M4={class:"cell-preview-meta"},O4={class:"cell-preview-frame"},Gu=320,Yu=280,L4=Ke({__name:"ComponentGrid",props:{entries:{},theme:{},actions:{}},emits:["select","action"],setup(e,{emit:t}){const n=new Map(id.map(D=>[D.id,D.name]));function o(D){return n.get(D)??D}const r=Ro(()=>An(()=>import("./IsolatedPreview-CXS4eLDm.js"),__vite__mapDeps([0,1,2,3,4,5]))),i=e,s=t;function a(D){s("select",D)}function l(D,_){i.actions?.includes("edit")&&(_.preventDefault(),s("action",{kind:"edit",entry:D}))}function c(D,_,v){v.stopPropagation(),s("action",{kind:D,entry:_})}function u(){return!!(i.actions&&i.actions.length>0)}function d(D){return D==="delete"?"删除":D==="edit"?"编辑":D==="share"?"复制分享链接":"复制一份到「我的」可编辑"}function f(D){if(D.source!=="builtin")return null;const _=D.designedFor;if(!_||_.length===0)return null;const v=i.theme?.id;if(v&&_.includes(v))return null;const S=_.map(o),I=S.length===1?S[0]:S.join(" / ");return{primary:S[0],tooltip:"本变体为「"+I+"」主题设计；当前主题下色彩会按当前 token 调和"}}const h=J(null),g=J(!1);let m=null,w=null;const k=te(()=>{if(h.value)return{left:h.value.left+"px",top:h.value.top+"px",width:Gu+"px",height:Yu+"px"}});function x(){m!=null&&(window.clearTimeout(m),m=null),w!=null&&(window.clearTimeout(w),w=null)}function L(){return!(!i.theme||window.matchMedia("(pointer: coarse)").matches)}function $(D,_){if(!L())return;x();const v=_.currentTarget;v&&(m=window.setTimeout(()=>{m=null;const S=v.getBoundingClientRect(),I=_4(S,{height:window.innerHeight},{width:Gu,height:Yu});h.value={entry:D,left:I.left,top:I.top},g.value=!0},80))}function N(){L()&&(m!=null&&(window.clearTimeout(m),m=null),w!=null&&window.clearTimeout(w),w=window.setTimeout(()=>{w=null,h.value=null},150))}return yt(()=>{x()}),(D,_)=>(O(),P(ue,null,[p("div",C4,[(O(!0),P(ue,null,Le(e.entries,v=>(O(),P("button",{key:v.id,class:"cell",title:v.description,onClick:S=>a(v),onDblclick:S=>l(v,S),onMouseenter:S=>$(v,S),onMouseleave:N},[p("span",{class:"thumb",innerHTML:v.thumbnailSvg},null,8,E4),p("span",T4,U(v.name),1),f(v)?(O(),P("span",{key:0,class:"designed-for-chip",title:f(v).tooltip}," 为 "+U(f(v).primary)+" 设计 ",9,A4)):ae("",!0),u()?(O(),P("span",I4,[(O(!0),P(ue,null,Le(e.actions,S=>(O(),P("button",{key:S,type:"button",class:$e(["cell-action",`cell-action--${S}`]),title:d(S),onClick:I=>c(S,v,I)},[S==="delete"?(O(),P(ue,{key:0},[We("×")],64)):S==="edit"?(O(),P(ue,{key:1},[We("✎")],64)):S==="share"?(O(),P(ue,{key:2},[We("↗")],64)):(O(),P(ue,{key:3},[We("+")],64))],10,R4))),128))])):ae("",!0)],40,$4))),128))]),g.value&&i.theme?(O(),nt(Qd,{key:0,to:"body"},[ot(p("div",{class:"cell-preview-popover",style:Qt(k.value),role:"tooltip","aria-hidden":"true"},[p("div",M4,U(h.value?.entry.name)+" · "+U(i.theme.name),1),p("div",O4,[h.value?(O(),nt(A(r),{key:0,"placeholder-md":h.value.entry.markdownSnippet,theme:i.theme},null,8,["placeholder-md","theme"])):ae("",!0)])],4),[[_o,h.value]])])):ae("",!0)],64))}}),N4=Ge(L4,[["__scopeId","data-v-3471111f"]]),D4={class:"modal",role:"dialog","aria-label":"保存选区为组件"},P4={class:"modal-field"},B4=["onKeydown"],F4={key:0,class:"field-error"},j4={class:"modal-field"},H4={class:"preview-src"},V4={class:"mono"},U4=Ke({__name:"SaveSelectionDialog",props:{open:{type:Boolean},sourceText:{},error:{}},emits:["cancel","confirm"],setup(e,{emit:t}){const n=e,o=t,r=J(""),i=J("");Pe(()=>n.open,l=>{l&&(r.value="",i.value="")});function s(){o("cancel")}function a(){o("confirm",{name:r.value.trim(),description:i.value.trim()})}return(l,c)=>e.open?(O(),P("div",{key:0,class:"modal-mask",onClick:It(s,["self"])},[p("div",D4,[c[5]||(c[5]=p("h4",{class:"modal-title"},"保存选区为组件",-1)),p("label",P4,[c[2]||(c[2]=p("span",null,"名称",-1)),ot(p("input",{"onUpdate:modelValue":c[0]||(c[0]=u=>r.value=u),maxlength:"20",placeholder:"如：我的封面卡",class:$e({invalid:!!e.error}),onKeydown:xn(It(a,["prevent"]),["enter"])},null,42,B4),[[Ut,r.value]]),e.error?(O(),P("span",F4,U(e.error),1)):ae("",!0)]),p("label",j4,[c[3]||(c[3]=p("span",null,"描述（可选）",-1)),ot(p("input",{"onUpdate:modelValue":c[1]||(c[1]=u=>i.value=u),maxlength:"30",placeholder:"一句话说明"},null,512),[[Ut,i.value]])]),p("details",H4,[c[4]||(c[4]=p("summary",null,"选区预览",-1)),p("pre",V4,U(e.sourceText),1)]),p("div",{class:"modal-actions"},[p("button",{class:"btn btn-ghost",onClick:s},"取消"),p("button",{class:"btn btn-primary",onClick:a},"保存")])])])):ae("",!0)}}),z4=Ge(U4,[["__scopeId","data-v-7b1a0b09"]]);function k6(e,t){if(!t)return null;const n=["wrapperCSS","titleCSS","bodyCSS"];for(const o of n)if(e[o].includes(t))return o;return null}function xh(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function jr(e,t,n){if(!t||!n||!e)return e;const o=new RegExp(`\\bvariant=${xh(t)}\\b`,"g");return e.replace(o,`variant=${n}`)}const Fa="uc-NEW";function _h(e,t,n){if(!n||!e||t===n)return e;const o=new RegExp(`(:{3,}\\s*)${xh(t)}\\b`,"g");return e.replace(o,`$1${n}`)}function Ch(e){const t=e.userVariantCssPatch;return!!(t.wrapperCSS.trim()||t.titleCSS.trim()||t.bodyCSS.trim())}function $h(e){const t=e.userVariantCustom;return!!(t.template.trim()&&t.wrapperCSS.trim())}function Ji(e){return e.kind!=="none"&&!!e.variantId}function aa(e){return e.userVariantMode==="custom"?$h(e):Ji(e)?e.userVariantMode==="tokens"?Object.keys(e.userVariantTokens).length>0:e.userVariantMode==="patch"?Ch(e):!1:!1}function W4(e){if(e.userVariantMode==="custom"&&$h(e)){const n=e.userVariantCustom;return{level:"custom",name:`${e.name.trim()} · custom`,base:null,template:n.template,css:{wrapperCSS:n.wrapperCSS,...n.titleCSS.trim()?{titleCSS:n.titleCSS}:{},...n.bodyCSS.trim()?{bodyCSS:n.bodyCSS}:{},...n.svgSlot.trim()?{svgSlot:n.svgSlot}:{}}}}if(!Ji(e))return null;const t={kind:e.kind,variantId:e.variantId};if(e.userVariantMode==="tokens"&&Object.keys(e.userVariantTokens).length>0)return{level:"tokens",name:`${e.name.trim()} · tokens`,base:t,tokens:{...e.userVariantTokens}};if(e.userVariantMode==="patch"&&Ch(e)){const n=e.userVariantCssPatch;return{level:"patch",name:`${e.name.trim()} · patch`,base:t,cssPatch:{...n.wrapperCSS.trim()?{wrapperCSS:n.wrapperCSS}:{},...n.titleCSS.trim()?{titleCSS:n.titleCSS}:{},...n.bodyCSS.trim()?{bodyCSS:n.bodyCSS}:{}}}}return null}function K4(e,t){let n=t,o=e.markdownSnippet;if(n&&(Ji(e)||e.userVariantMode==="custom")){const r=Sh(n);if(r){const i=r.level!=="custom"&&e.userVariantMode!=="custom"&&(r.base.kind!==e.kind||r.base.variantId!==e.variantId),s=r.level!==e.userVariantMode;(i||s)&&(r.level!=="custom"&&e.userVariantMode!=="custom"&&(o=jr(o,n,e.variantId)),qu(n),n=null)}}if(n&&aa(e)){if(e.userVariantMode==="tokens")sa(n,{tokens:{...e.userVariantTokens}});else if(e.userVariantMode==="patch"){const r=e.userVariantCssPatch;sa(n,{cssPatch:{...r.wrapperCSS.trim()?{wrapperCSS:r.wrapperCSS}:{},...r.titleCSS.trim()?{titleCSS:r.titleCSS}:{},...r.bodyCSS.trim()?{bodyCSS:r.bodyCSS}:{}}})}else if(e.userVariantMode==="custom"){const r=e.userVariantCustom;sa(n,{template:r.template,css:{wrapperCSS:r.wrapperCSS,titleCSS:r.titleCSS,bodyCSS:r.bodyCSS,svgSlot:r.svgSlot}})}return{markdown:e.markdownSnippet,linkAction:{kind:"noop"}}}if(n&&!aa(e))return qu(n),{markdown:Ji(e)?jr(e.markdownSnippet,n,e.variantId):e.markdownSnippet,linkAction:{kind:"clear"}};if(!n&&aa(e)){const r=W4(e);if(r){const i=c4(r);return{markdown:e.userVariantMode==="custom"?_h(o,Fa,`uc-${i.id}`):jr(o,e.variantId,i.id),linkAction:{kind:"set",id:i.id}}}}return{markdown:o,linkAction:n===null&&o!==e.markdownSnippet?{kind:"clear"}:{kind:"noop"}}}const q4={admonition:e=>`::: tip 标题占位 variant=${e}
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
`};function G4(e,t){if(e==="none")return"";const n=q4[e];return n?n(t||""):""}function Y4(e){const{kind:t,variantId:n,prevKind:o,prevVariantId:r,current:i,lastInjected:s}=e;return i.trim()!==""&&i!==s?t===o&&n&&r&&n!==r?{nextSnippet:jr(i,r,n),rewriteLastInjected:!1}:{nextSnippet:i,rewriteLastInjected:!1}:{nextSnippet:G4(t,n),rewriteLastInjected:!0}}const J4=Ke({__name:"MarkdownInput",props:{modelValue:{},placeholder:{default:""}},emits:["update:modelValue"],setup(e,{emit:t}){const n=e,o=t,r=J(null);let i=null;return zt(()=>{if(!r.value)return;const s=[dd(),fd(),pd.of([...hd,...md,gd]),bd(),yd,Rt.lineWrapping,Rt.updateListener.of(l=>{l.docChanged&&o("update:modelValue",l.state.doc.toString())}),Rt.theme({"&":{height:"100%",fontSize:"13px"},".cm-scroller":{overflow:"auto"}})];n.placeholder&&s.push(Bm(n.placeholder));const a=ud.create({doc:n.modelValue,extensions:s});i=new Rt({state:a,parent:r.value})}),Pe(()=>n.modelValue,s=>{if(!i)return;const a=i.state.doc.toString();s!==a&&i.dispatch({changes:{from:0,to:a.length,insert:s}})}),yt(()=>{i?.destroy(),i=null}),(s,a)=>(O(),P("div",{class:"md-input",ref_key:"host",ref:r},null,512))}}),Z4=Ge(J4,[["__scopeId","data-v-5a5fb4e9"]]),Q4={class:"tokens-panel"},X4={key:0,class:"empty"},e3={key:1,class:"fields"},t3={class:"field-head"},n3={class:"label"},o3={class:"key mono"},r3={class:"field-body"},i3=["value","onInput"],s3=["placeholder","value","onInput"],a3=["placeholder","value","onInput"],l3=["onClick"],c3={key:0,class:"hint"},u3=Ke({__name:"TokensPanel",props:{kind:{},variantId:{},tokens:{}},setup(e){const t=e,n=te(()=>{if(!(t.kind==="none"||!t.variantId))return sd(t.kind,t.variantId)}),o=te(()=>{const l=n.value;return l?Object.entries(l).map(([c,u])=>({key:c,field:u,value:t.tokens[c]??""})):[]});function r(l,c){const u=c.trim();u===""?delete t.tokens[l]:t.tokens[l]=u}function i(l,c){r(l,c.target.value)}function s(l,c){r(l,c.target.value)}function a(l){delete t.tokens[l]}return(l,c)=>(O(),P("div",Q4,[n.value?(O(),P("div",e3,[(O(!0),P(ue,null,Le(o.value,u=>(O(),P("div",{key:u.key,class:"field"},[p("label",t3,[p("span",n3,U(u.field.label),1),p("span",o3,U(u.key),1)]),p("div",r3,[u.field.type==="color"?(O(),P(ue,{key:0},[p("input",{type:"color",class:"color-input",value:u.value||"#000000",onInput:d=>i(u.key,d)},null,40,i3),p("input",{type:"text",class:"text-input",placeholder:u.field.default,value:u.value,onInput:d=>s(u.key,d)},null,40,s3)],64)):(O(),P("input",{key:1,type:"text",class:"text-input full",placeholder:u.field.default,value:u.value,onInput:d=>s(u.key,d)},null,40,a3)),u.value?(O(),P("button",{key:2,type:"button",class:"clear",title:"清除覆盖",onClick:d=>a(u.key)},"×",8,l3)):ae("",!0)]),u.field.hint?(O(),P("p",c3,U(u.field.hint),1)):ae("",!0)]))),128))])):(O(),P("div",X4,' 此 variant 未开放可调字段；如需自定义样式，可后续走"源码模式"（步骤 5）。 '))]))}}),d3=Ge(u3,[["__scopeId","data-v-d76b4b25"]]),f3={class:"editor"},p3={class:"row"},h3={class:"field"},m3={class:"row"},g3={class:"field"},b3={class:"row row-split"},y3={class:"field"},v3=["value"],w3={class:"field"},S3=["disabled"],k3=["value"],x3={class:"row md-row"},_3={key:0,class:"diagnostics"},C3={class:"diag-list"},$3={key:0},E3={class:"advanced"},T3={class:"slot-tree",role:"tree","aria-label":"样式编辑模式与槽位"},A3=["aria-expanded","onClick"],I3={class:"caret","aria-hidden":"true"},R3={key:0,class:"tree-slots",role:"group"},M3=["aria-selected","onClick"],O3={key:0,class:"tree-dot","aria-hidden":"true"},L3=Ke({__name:"ComponentEditor",props:{draft:{},theme:{},originalLinkedUvId:{},livePatchLog:{}},setup(e){const t=Ro(()=>An(()=>import("./SourceModePanel-CN0SGsdx.js"),__vite__mapDeps([6,7,3,8,0,1,2,4,5,9]))),n=Ro(()=>An(()=>import("./CustomModePanel-Dd33FcyN.js"),__vite__mapDeps([10,7,3,8,0,1,2,4,5,11]))),o=e,r=[{value:"none",label:"自由组件"},{value:"admonition",label:"提示 (admonition)"},{value:"quote",label:"引用 (quote)"},{value:"compare",label:"对比 (compare)"},{value:"steps",label:"步骤 (steps)"},{value:"divider",label:"分隔 (divider)"},{value:"sectionTitle",label:"章节标题 (section-title)"},{value:"note",label:"补注 (note)"},{value:"codeBlock",label:"代码块 (codeBlock)"}],i=te(()=>{const $=o.draft.kind;return $==="none"?[]:[...En[$]]}),s=J("");Pe(()=>[o.draft.kind,o.draft.variantId],([$,N],[D,_])=>{if($!==D)if($==="none"){if(o.draft.variantId!==""){o.draft.variantId="";return}}else{const I=En[$];if(!I.includes(N)){o.draft.variantId=I[0]??"";return}}const{nextSnippet:v,rewriteLastInjected:S}=Y4({kind:$,variantId:N,prevKind:D,prevVariantId:_,current:o.draft.markdownSnippet,lastInjected:s.value});v!==o.draft.markdownSnippet&&(o.draft.markdownSnippet=v),S&&(s.value=v)});const a=te(()=>Pl(o.draft.markdownSnippet)),l=te(()=>o.draft.kind==="none"||!o.draft.variantId?!1:!!sd(o.draft.kind,o.draft.variantId)),c=te(()=>o.draft.kind!=="none"&&!!o.draft.variantId);Pe(()=>`${o.draft.kind}::${o.draft.variantId}`,()=>{if(o.draft.userVariantMode!=="custom"){for(const $ of Object.keys(o.draft.userVariantTokens))delete o.draft.userVariantTokens[$];o.draft.userVariantCssPatch.wrapperCSS="",o.draft.userVariantCssPatch.titleCSS="",o.draft.userVariantCssPatch.bodyCSS="",o.draft.userVariantMode=null}});function u($){const N=o.draft.userVariantMode;if($===N){o.draft.userVariantMode=null;return}const D=o.draft,_=Object.keys(D.userVariantTokens).length>0,v=D.userVariantCssPatch,S=!!(v.wrapperCSS.trim()||v.titleCSS.trim()||v.bodyCSS.trim()),I=D.userVariantCustom,C=!!(I.template.trim()||I.wrapperCSS.trim()||I.titleCSS.trim()||I.bodyCSS.trim()||I.svgSlot.trim());if(!(($!=="tokens"&&_||$!=="patch"&&S||$!=="custom"&&C)&&!window.confirm("切换将清空其它模式下已写的内容，是否继续？"))){if($==="tokens")D.userVariantCssPatch.wrapperCSS="",D.userVariantCssPatch.titleCSS="",D.userVariantCssPatch.bodyCSS="",d();else if($==="patch"){for(const E of Object.keys(D.userVariantTokens))delete D.userVariantTokens[E];d()}else if($==="custom"){for(const E of Object.keys(D.userVariantTokens))delete D.userVariantTokens[E];D.userVariantCssPatch.wrapperCSS="",D.userVariantCssPatch.titleCSS="",D.userVariantCssPatch.bodyCSS=""}D.userVariantMode=$}}function d(){o.draft.userVariantCustom.template="",o.draft.userVariantCustom.wrapperCSS="",o.draft.userVariantCustom.titleCSS="",o.draft.userVariantCustom.bodyCSS="",o.draft.userVariantCustom.svgSlot=""}const f=J("wrapperCSS"),h=J("template"),g={wrapperCSS:"外壳 (wrapper)",titleCSS:"标题 (title)",bodyCSS:"正文 (body)"},m={template:"HTML 骨架",wrapperCSS:"外壳 (wrapper)",titleCSS:"标题 (title)",bodyCSS:"正文 (body)",svgSlot:"装饰 SVG"},w=te(()=>{const $=o.draft.userVariantMode,N=o.draft;return[{id:"tokens",label:"Tokens 微调骨架值",available:l.value,expanded:$==="tokens",slots:[]},{id:"patch",label:"源码模式 改基底 CSS",available:c.value,expanded:$==="patch",slots:["wrapperCSS","titleCSS","bodyCSS"].map(D=>({slot:D,label:g[D],hasContent:!!N.userVariantCssPatch[D].trim()}))},{id:"custom",label:"完全自定义 从零写",available:!0,expanded:$==="custom",slots:["template","wrapperCSS","titleCSS","bodyCSS","svgSlot"].map(D=>({slot:D,label:m[D],hasContent:!!N.userVariantCustom[D].trim()}))}]});function k($){return $==="patch"?f.value:$==="custom"?h.value:""}function x($){u($)}function L($,N){$==="patch"?f.value=N:$==="custom"&&(h.value=N)}return($,N)=>(O(),P("div",f3,[p("div",p3,[p("label",h3,[N[7]||(N[7]=p("span",{class:"label"},"名称",-1)),ot(p("input",{"onUpdate:modelValue":N[0]||(N[0]=D=>o.draft.name=D),maxlength:"20",placeholder:"如:我的封面卡",class:"text-input"},null,512),[[Ut,o.draft.name]])])]),p("div",m3,[p("label",g3,[N[8]||(N[8]=p("span",{class:"label"},"描述 (可选)",-1)),ot(p("input",{"onUpdate:modelValue":N[1]||(N[1]=D=>o.draft.description=D),maxlength:"30",placeholder:"一句话说明",class:"text-input"},null,512),[[Ut,o.draft.description]])])]),p("div",b3,[p("label",y3,[N[9]||(N[9]=p("span",{class:"label"},"分类",-1)),ot(p("select",{"onUpdate:modelValue":N[2]||(N[2]=D=>o.draft.kind=D),class:"text-input"},[(O(),P(ue,null,Le(r,D=>p("option",{key:D.value,value:D.value},U(D.label),9,v3)),64))],512),[[jc,o.draft.kind]])]),p("label",w3,[N[11]||(N[11]=p("span",{class:"label"},"骨架 (variant)",-1)),ot(p("select",{"onUpdate:modelValue":N[3]||(N[3]=D=>o.draft.variantId=D),class:"text-input",disabled:o.draft.kind==="none"},[N[10]||(N[10]=p("option",{value:""},"(无)",-1)),(O(!0),P(ue,null,Le(i.value,D=>(O(),P("option",{key:D,value:D},U(D),9,k3))),128))],8,S3),[[jc,o.draft.variantId]])])]),p("div",x3,[N[12]||(N[12]=p("span",{class:"label"},"Markdown",-1)),Me(Z4,{modelValue:o.draft.markdownSnippet,"onUpdate:modelValue":N[4]||(N[4]=D=>o.draft.markdownSnippet=D),placeholder:"选择上方“分类 + 骨架”自动填入示例；或直接在此撰写自由 markdown"},null,8,["modelValue"])]),a.value.ok?ae("",!0):(O(),P("div",_3,[N[15]||(N[15]=p("div",{class:"diag-title"},"未通过校验",-1)),p("ul",C3,[a.value.unknownFences.length>0?(O(),P("li",$3,[N[13]||(N[13]=We(" 未注册容器: ",-1)),p("code",null,U(a.value.unknownFences.join(", ")),1)])):ae("",!0),(O(!0),P(ue,null,Le(a.value.unknownVariants,(D,_)=>(O(),P("li",{key:_},[N[14]||(N[14]=We(" 未注册 variant: ",-1)),p("code",null,U(D.container)+" → variant="+U(D.variantId),1)]))),128))])])),p("div",E3,[N[16]||(N[16]=p("p",{class:"advanced-hint"}," 高级样式 · 三档互斥：Tokens 微调骨架值 · 源码模式 改基底 CSS · 完全自定义 从零写 ",-1)),p("div",T3,[(O(!0),P(ue,null,Le(w.value,D=>(O(),P(ue,{key:D.id},[D.available?(O(),P(ue,{key:0},[p("button",{type:"button",role:"treeitem","aria-expanded":D.expanded,class:$e(["tree-group",{active:D.expanded}]),onClick:_=>x(D.id)},[p("span",I3,U(D.expanded?"▼":"▶"),1),We(" "+U(D.label),1)],10,A3),D.expanded&&D.slots.length>0?(O(),P("div",R3,[(O(!0),P(ue,null,Le(D.slots,_=>(O(),P("button",{key:_.slot,type:"button",role:"treeitem","aria-selected":k(D.id)===_.slot,class:$e(["tree-slot",{active:k(D.id)===_.slot}]),onClick:v=>L(D.id,_.slot)},[We(U(_.label)+" ",1),_.hasContent?(O(),P("span",O3)):ae("",!0)],10,M3))),128))])):ae("",!0)],64)):ae("",!0)],64))),128))]),o.draft.userVariantMode==="tokens"&&l.value?(O(),nt(d3,{key:0,kind:o.draft.kind,"variant-id":o.draft.variantId,tokens:o.draft.userVariantTokens},null,8,["kind","variant-id","tokens"])):o.draft.userVariantMode==="patch"?(O(),nt(A(t),{key:1,kind:o.draft.kind,"variant-id":o.draft.variantId,"css-patch":o.draft.userVariantCssPatch,theme:o.theme,"live-patch-log":o.livePatchLog??null,"active-slot":f.value,"onUpdate:activeSlot":N[5]||(N[5]=D=>f.value=D)},null,8,["kind","variant-id","css-patch","theme","live-patch-log","active-slot"])):o.draft.userVariantMode==="custom"?(O(),nt(A(n),{key:2,custom:o.draft.userVariantCustom,theme:o.theme,"original-linked-uv-id":o.originalLinkedUvId??null,"live-patch-log":o.livePatchLog??null,"active-tab":h.value,"onUpdate:activeTab":N[6]||(N[6]=D=>h.value=D)},null,8,["custom","theme","original-linked-uv-id","live-patch-log","active-tab"])):ae("",!0)])]))}}),N3=Ge(L3,[["__scopeId","data-v-fb1c9ef6"]]),D3={class:"head"},P3={class:"head-text"},B3={key:0,class:"entries"},F3={class:"entry-head"},j3={class:"patch-name mono"},H3={class:"label"},V3={class:"count mono"},U3={key:0,class:"samples"},z3=["role","tabindex","onClick","onKeydown"],W3={class:"selector mono"},K3={class:"before mono"},q3={key:0,class:"more"},G3=Ke({__name:"PatchInspector",props:{patchLog:{},clickable:{type:Boolean}},emits:["click-sample"],setup(e,{emit:t}){const n=e,o=t;function r(a){n.clickable&&o("click-sample",a)}const i=te(()=>n.patchLog?n.patchLog.total>0:!1),s=te(()=>n.patchLog?.entries??[]);return(a,l)=>(O(),P("div",{class:$e(["patch-inspector",{empty:!i.value}])},[p("div",D3,[l[2]||(l[2]=p("span",{class:"dot"},null,-1)),p("span",P3,[i.value?(O(),P(ue,{key:0},[l[0]||(l[0]=We(" 本次渲染对 HTML 做了 ",-1)),p("b",null,U(n.patchLog?.total),1),l[1]||(l[1]=We(" 处微信适配 ",-1))],64)):(O(),P(ue,{key:1},[We(" 渲染透明度 · 无适配 ")],64))])]),i.value?(O(),P("ul",B3,[(O(!0),P(ue,null,Le(s.value,(c,u)=>(O(),P("li",{key:u,class:"entry"},[p("div",F3,[p("code",j3,U(c.patch),1),p("span",H3,U(c.label),1),p("span",V3,"× "+U(c.count),1)]),c.samples&&c.samples.length>0?(O(),P("ul",U3,[(O(!0),P(ue,null,Le(c.samples,(d,f)=>(O(),P("li",{key:f,class:$e(["sample",{clickable:n.clickable}]),role:n.clickable?"button":void 0,tabindex:n.clickable?0:void 0,onClick:h=>r(d),onKeydown:[xn(It(h=>r(d),["prevent"]),["enter"]),xn(It(h=>r(d),["prevent"]),["space"])]},[p("code",W3,U(d.selector),1),l[3]||(l[3]=p("span",{class:"arrow"},"→",-1)),p("code",K3,U(d.before),1)],42,z3))),128)),c.count>c.samples.length?(O(),P("li",q3," ...还有 "+U(c.count-c.samples.length)+" 处 ",1)):ae("",!0)])):ae("",!0)]))),128))])):ae("",!0)],2))}}),Y3=Ge(G3,[["__scopeId","data-v-2c543997"]]),J3={class:"preview-shell"},Z3={class:"preview-meta mono"},Q3={key:0,class:"empty"},X3=["srcdoc"],eT=Ke({__name:"ComponentPreview",props:{md:{},theme:{},userVariants:{}},emits:["patch-log"],setup(e,{emit:t}){const n=e,o=t,r=te(()=>{if(!n.md.trim())return null;try{return mh({md:n.md,theme:n.theme,userVariants:n.userVariants})}catch{return null}}),i=te(()=>r.value?.html??""),s=te(()=>r.value?.patchLog??null);Pe(s,l=>o("patch-log",l),{immediate:!0});const a=te(()=>i.value?`<!doctype html>
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
<div class="phone-viewport">${i.value}</div>
</body>
</html>`:"");return(l,c)=>(O(),P("div",J3,[p("div",Z3,U(n.theme.name)+" · 预览",1),i.value?(O(),P("iframe",{key:1,class:"preview-frame",srcdoc:a.value,sandbox:"allow-same-origin",title:"组件预览"},null,8,X3)):(O(),P("div",Q3,"输入 markdown 后,这里会显示渲染结果。")),i.value?(O(),nt(Y3,{key:2,"patch-log":s.value,class:"inspector"},null,8,["patch-log"])):ae("",!0)]))}}),tT=Ge(eT,[["__scopeId","data-v-34345d9a"]]),vs={wrapperCSS:"",titleCSS:"",bodyCSS:""},ws={template:"",wrapperCSS:"",titleCSS:"",bodyCSS:"",svgSlot:""},nT={name:"",description:"",kind:"none",variantId:"",markdownSnippet:"",thumbnailSvg:"",userVariantTokens:{},userVariantMode:null,userVariantCssPatch:{...vs},userVariantCustom:{...ws}};function Ju(e,t=""){return{name:t?`${t}${e.name}`:e.name,description:e.description??"",kind:e.kind,variantId:e.variantId??"",markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg,userVariantTokens:{},userVariantMode:null,userVariantCssPatch:{...vs},userVariantCustom:{...ws}}}function oT(e){const t={originalLinkedUvId:e.linkedUserVariantId??null,tokens:{},cssPatch:{...vs},custom:{...ws},mode:null},n=e.linkedUserVariantId;if(!n)return t;const o=Sh(n);return o?o.level==="custom"?{...t,custom:{template:o.template,wrapperCSS:o.css.wrapperCSS,titleCSS:o.css.titleCSS??"",bodyCSS:o.css.bodyCSS??"",svgSlot:o.css.svgSlot??""},mode:"custom"}:o.base.kind!==e.kind||o.base.variantId!==(e.variantId??"")?t:o.level==="tokens"?{...t,tokens:{...o.tokens},mode:"tokens"}:{...t,cssPatch:{wrapperCSS:o.cssPatch.wrapperCSS??"",titleCSS:o.cssPatch.titleCSS??"",bodyCSS:o.cssPatch.bodyCSS??""},mode:"patch"}:t}function rT(e,t){let n,o=null,r=null;if(e==="new"||!t)n={...nT,userVariantCssPatch:{...vs},userVariantCustom:{...ws}};else if(e==="edit"){if(n=Ju(t),t.source==="user"){o=t.id;const l=oT(t);n.userVariantTokens=l.tokens,n.userVariantCssPatch=l.cssPatch,n.userVariantCustom=l.custom,n.userVariantMode=l.mode,r=l.originalLinkedUvId}}else n=Ju(t,"副本 · ");const i=Rn({...n,userVariantTokens:{...n.userVariantTokens},userVariantCssPatch:{...n.userVariantCssPatch},userVariantCustom:{...n.userVariantCustom}}),s=te(()=>i.name!==n.name||i.description!==n.description||i.kind!==n.kind||i.variantId!==n.variantId||i.markdownSnippet!==n.markdownSnippet||i.thumbnailSvg!==n.thumbnailSvg||i.userVariantMode!==n.userVariantMode||!aT(i.userVariantTokens,n.userVariantTokens)||!iT(i.userVariantCssPatch,n.userVariantCssPatch)||!sT(i.userVariantCustom,n.userVariantCustom));function a(){i.name=n.name,i.description=n.description,i.kind=n.kind,i.variantId=n.variantId,i.markdownSnippet=n.markdownSnippet,i.thumbnailSvg=n.thumbnailSvg,i.userVariantMode=n.userVariantMode;for(const l of Object.keys(i.userVariantTokens))delete i.userVariantTokens[l];Object.assign(i.userVariantTokens,n.userVariantTokens),i.userVariantCssPatch.wrapperCSS=n.userVariantCssPatch.wrapperCSS,i.userVariantCssPatch.titleCSS=n.userVariantCssPatch.titleCSS,i.userVariantCssPatch.bodyCSS=n.userVariantCssPatch.bodyCSS,i.userVariantCustom.template=n.userVariantCustom.template,i.userVariantCustom.wrapperCSS=n.userVariantCustom.wrapperCSS,i.userVariantCustom.titleCSS=n.userVariantCustom.titleCSS,i.userVariantCustom.bodyCSS=n.userVariantCustom.bodyCSS,i.userVariantCustom.svgSlot=n.userVariantCustom.svgSlot}return{draft:i,initial:n,dirty:s,editingId:o,originalLinkedUvId:r,reset:a}}function iT(e,t){return e.wrapperCSS===t.wrapperCSS&&e.titleCSS===t.titleCSS&&e.bodyCSS===t.bodyCSS}function sT(e,t){return e.template===t.template&&e.wrapperCSS===t.wrapperCSS&&e.titleCSS===t.titleCSS&&e.bodyCSS===t.bodyCSS&&e.svgSlot===t.svgSlot}function aT(e,t){const n=Object.keys(e),o=Object.keys(t);if(n.length!==o.length)return!1;for(const r of n)if(e[r]!==t[r])return!1;return!0}const lT={class:"studio","aria-label":"组件 Studio"},cT={class:"modal-head"},uT={class:"modal-head-label"},dT={key:0,class:"modal-head-dirty","aria-label":"有未保存改动"},fT={class:"content"},pT={class:"col col-editor"},hT={class:"col col-preview"},mT={class:"preview-wrap"},gT={class:"footer"},bT={key:0,class:"error"},yT={class:"actions"},vT=["disabled"],la="uv_preview_draft",wT=Ke({__name:"ComponentStudio",props:{init:{},theme:{}},emits:["done","cancel"],setup(e,{expose:t,emit:n}){const o=e,r=n,{draft:i,dirty:s,editingId:a,originalLinkedUvId:l,reset:c}=rT(o.init.mode,o.init.source??null),u=J(""),d=J(null);function f(F){d.value=F}const h=te(()=>Object.keys(i.userVariantTokens).length),g=te(()=>{const F=i.userVariantCssPatch;return!!(F.wrapperCSS.trim()||F.titleCSS.trim()||F.bodyCSS.trim())}),m=te(()=>{const F=i.userVariantCustom;return!!(F.template.trim()&&F.wrapperCSS.trim())}),w=te(()=>i.kind!=="none"&&!!i.variantId),k=te(()=>i.userVariantMode==="custom"?m.value:w.value?i.userVariantMode==="tokens"?h.value>0:i.userVariantMode==="patch"?g.value:!1:!1),x=te(()=>l??Fa.replace(/^uc-/,"")),L=te(()=>{if(!k.value)return[];if(i.userVariantMode==="custom"){const R=i.userVariantCustom;return[{id:x.value,name:"__custom_preview__",level:"custom",createdAt:0,updatedAt:Date.now(),base:null,template:R.template,css:{wrapperCSS:R.wrapperCSS,...R.titleCSS.trim()?{titleCSS:R.titleCSS}:{},...R.bodyCSS.trim()?{bodyCSS:R.bodyCSS}:{},...R.svgSlot.trim()?{svgSlot:R.svgSlot}:{}}}]}const F={kind:i.kind,variantId:i.variantId};if(i.userVariantMode==="tokens")return[{id:la,name:"__preview__",level:"tokens",createdAt:0,updatedAt:0,base:F,tokens:{...i.userVariantTokens}}];const E=i.userVariantCssPatch;return[{id:la,name:"__preview__",level:"patch",createdAt:0,updatedAt:0,base:F,cssPatch:{...E.wrapperCSS.trim()?{wrapperCSS:E.wrapperCSS}:{},...E.titleCSS.trim()?{titleCSS:E.titleCSS}:{},...E.bodyCSS.trim()?{bodyCSS:E.bodyCSS}:{}}}]}),$=te(()=>k.value?i.userVariantMode==="custom"?_h(i.markdownSnippet,Fa,`uc-${x.value}`):jr(i.markdownSnippet,i.variantId,la):i.markdownSnippet);function N(){s.value&&!window.confirm("放弃此次编辑?")||r("cancel")}function D(){c(),u.value=""}const _=te(()=>!(!i.name.trim()||!i.markdownSnippet.trim()));function v(){if(u.value="",!i.name.trim()){u.value="名称不能为空";return}if(!i.markdownSnippet.trim()){u.value="Markdown 内容不能为空";return}const{markdown:F,linkAction:E}=K4(i,l),j=E.kind==="set"?E.id:E.kind==="clear"?null:void 0,R={name:i.name.trim(),description:i.description.trim(),kind:i.kind,variantId:i.variantId||void 0,markdownSnippet:S(F),thumbnailSvg:i.thumbnailSvg||void 0,linkedUserVariantId:E.kind==="set"?E.id:void 0};if(o.init.mode==="edit"&&a){const V=d4(a,{name:R.name,description:R.description,markdownSnippet:R.markdownSnippet,thumbnailSvg:R.thumbnailSvg,linkedUserVariantId:j});if(!V.ok){u.value=I(V);return}r("done",a);return}const B=Fl(R);if(!B.ok){u.value=I(B);return}r("done",B.entry.id)}function S(F){return F.endsWith(`
`)?F:F+`
`}function I(F){if(F.reason==="not-found")return"组件不存在(可能已被删除)";const E=F.result;if(E.unknownFences.length>0)return`未注册容器: ${E.unknownFences.join(", ")}`;if(E.unknownVariants.length>0){const j=E.unknownVariants[0];return`未注册 variant: ${j.container} → ${j.variantId}`}return"校验失败"}const C=te(()=>o.init.mode==="new"?"新建组件":o.init.mode==="edit"?"编辑组件":"派生为我的组件");return t({attemptCancel:N}),(F,E)=>(O(),P("section",lT,[p("header",cT,[p("span",uT,U(C.value),1),A(s)?(O(),P("span",dT,"·已改动")):ae("",!0),p("button",{class:"modal-head-close",type:"button","aria-label":"关闭",title:"关闭（Esc）",onClick:N},"×")]),p("div",fT,[p("div",pT,[Me(N3,{draft:A(i),theme:o.theme,"original-linked-uv-id":A(l),"live-patch-log":d.value},null,8,["draft","theme","original-linked-uv-id","live-patch-log"])]),p("div",hT,[p("div",mT,[Me(tT,{md:$.value,theme:o.theme,"user-variants":L.value,onPatchLog:f},null,8,["md","theme","user-variants"])])])]),p("div",gT,[u.value?(O(),P("div",bT,U(u.value),1)):ae("",!0),p("div",yT,[p("button",{class:"btn btn-ghost",type:"button",onClick:N},"取消"),A(s)?(O(),P("button",{key:0,class:"btn btn-ghost",type:"button",title:"还原到初始状态",onClick:D},"还原")):ae("",!0),p("button",{class:"btn btn-primary",type:"button",disabled:!_.value,onClick:v},"保存",8,vT)])])]))}}),ST=Ge(wT,[["__scopeId","data-v-cef927b2"]]),kT={class:"tabs tabs-group",role:"tablist","aria-label":"组件分组"},xT=["aria-selected","onClick"],_T={key:0,class:"tabs tabs-sub",role:"tablist","aria-label":"子分类"},CT=["aria-selected","onClick"],$T={key:0,class:"sub-count"},ET={key:1,class:"user-toolbar"},TT={key:0,class:"tool-status",role:"status","aria-live":"polite","aria-atomic":"true"},AT={class:"body"},IT={key:0,class:"empty"},RT={class:"empty-title"},MT={class:"studio-modal-card"},OT=340,LT=Ke({__name:"ComponentPalette",props:{theme:{}},emits:["insert","close"],setup(e,{expose:t,emit:n}){const o=Ro(()=>An(()=>import("./UserVariantsPanel-jPLk0bsN.js"),__vite__mapDeps([12,1,2,3,4,13]))),r=e,i=n,s=J("list"),a=J(null),l=J(null),c=J("template"),u=J(_r[0]?.subs[0]?.key??""),d=te(()=>_r.find(y=>y.id===c.value)??_r[0]),f=te(()=>d.value.subs.find(y=>y.key===u.value));function h(y){c.value=y;const b=_r.find(T=>T.id===y);b&&b.subs.length>0&&(u.value=b.subs[0].key)}const{width:g,maxWidth:m,defaultWidth:w,minWidth:k}=gh({storageKey:n$,defaultWidth:OT,min:320,maxViewportRatio:.55}),x=te(()=>g.value===null?void 0:{width:g.value+"px"});function L(){l.value?.attemptCancel()}function $(y){y.key==="Escape"&&s.value==="studio"&&(y.stopPropagation(),y.preventDefault(),l.value?.attemptCancel())}zt(()=>{document.addEventListener("keydown",$)}),yt(()=>{document.removeEventListener("keydown",$)});const N=f4(),D=N.list,_=te(()=>{const y={admonition:[],quote:[],compare:[],steps:[],divider:[],sectionTitle:[],codeBlock:[],note:[],highlight:[],footnotes:[],recommend:[],qrcode:[],footerCTA:[],pullQuote:[],announcement:[],tableCard:[],gallery:[],dialogue:[],qaBlock:[],none:[]};for(const b of WE)b.kind in y&&y[b.kind].push(b);return y}),v=te(()=>KE(r.theme));function S(y){if(!y)return[];const b=y.source;if(b.type==="theme-template")return v.value;if(b.type==="user")return D.value;if(b.type==="uv")return[];const T=_.value[b.kind]??[];if(!b.variantIds||b.variantIds.length===0)return T;const H=new Set(b.variantIds);return T.filter(W=>W.variantId!==void 0&&H.has(W.variantId))}const I=te(()=>S(f.value)),C=te(()=>f.value?.source.type==="user"?["edit","share","delete"]:["derive"]);function F(y){return y.source.type==="uv"?0:S(y).length}const E=J("");let j=null;function R(y,b=2e3){E.value=y,j!=null&&window.clearTimeout(j),j=window.setTimeout(()=>{E.value="",j=null},b)}function B(y){i("insert",y.markdownSnippet)}function V(y){const{kind:b,entry:T}=y;if(b==="delete"){N.remove(T.id);return}if(b==="edit"){if(T.source!=="user"){R("内置组件不可直接编辑，请先派生为「我的」",2500);return}a.value={mode:"edit",source:T},s.value="studio";return}if(b==="derive"){a.value={mode:"derive",source:T},s.value="studio";return}b==="share"&&z(T)}async function z(y){const b=x4({id:y.id,name:y.name,description:y.description,kind:y.kind,variantId:y.variantId,markdownSnippet:y.markdownSnippet,thumbnailSvg:y.thumbnailSvg}),T=kh(Vl,b);try{navigator.clipboard?.writeText?(await navigator.clipboard.writeText(T),R("已复制分享链接")):(location.hash=T.slice(T.indexOf("#")),R("请从地址栏复制当前链接",3e3))}catch{R("分享失败：剪贴板权限不足",3e3)}}function fe(){const y=t4(),b=`wechat-typeset-components-${new Date().toISOString().slice(0,10)}.json`;oi(b,y,"application/json"),R("已导出组件库 JSON")}const je=J(null);function Ne(){je.value?.click()}async function Fe(y){const b=y.target,T=b.files?.[0];if(b.value="",!!T)try{const H=await T.text(),W=n4(H);W>0?(N.refresh(),R(`已导入 ${W} 个组件`)):R("未导入：文件为空或重复",2500)}catch{R("导入失败：文件读取错误",2500)}}function He(){a.value={mode:"new"},s.value="studio"}function Te(){s.value="list",a.value=null}function Ye(y){Te(),h("mine"),u.value="m-user",N.refresh()}const Je=Rn({open:!1,source:"",error:""});function Pt(y){y.trim()&&(Je.open=!0,Je.source=y,Je.error="")}function pt(){Je.open=!1,Je.error=""}function mn(y){if(!y.name){Je.error="组件名不能为空";return}const b=wt(Je.source),T=Fl({name:y.name,description:y.description,markdownSnippet:b,sourceMarkdown:Je.source,kind:"none"});if(!T.ok){Je.error=gn(T);return}Je.open=!1,Je.error="",h("mine"),u.value="m-user",N.refresh()}function wt(y){return y.endsWith(`
`)?y:y+`
`}function gn(y){if(y.reason==="validation"){const b=y.result.unknownFences,T=y.result.unknownVariants;if(b.length>0)return`选区含未注册容器: ${b.join(", ")}。请在编辑器修正后再保存。`;if(T.length>0){const H=T[0];return`选区含未注册 variant: ${H.container}:${H.variantId}。请在编辑器修正。`}return"选区内容未通过校验"}return"保存失败"}return t({openSaveDialog:Pt}),(y,b)=>(O(),P(ue,null,[p("aside",{class:"palette","aria-label":"组件库",style:Qt(x.value)},[Me(Op,{width:A(g),min:A(k),max:A(m),"default-width":A(w),"onUpdate:width":b[0]||(b[0]=T=>g.value=T)},null,8,["width","min","max","default-width"]),Me(hs,{title:"插入",size:"sm",onClose:b[1]||(b[1]=T=>i("close"))},{actions:Jt(()=>[s.value!=="studio"?(O(),P("button",{key:0,class:"head-action",title:"新建组件",onClick:He},"+ 新建")):ae("",!0)]),_:1}),p("nav",kT,[(O(!0),P(ue,null,Le(A(_r),T=>(O(),P("button",{key:T.id,class:$e(["tab",{active:c.value===T.id}]),role:"tab","aria-selected":c.value===T.id,onClick:H=>h(T.id)},U(T.label),11,xT))),128))]),d.value.subs.length>1?(O(),P("nav",_T,[(O(!0),P(ue,null,Le(d.value.subs,T=>(O(),P("button",{key:T.key,class:$e(["sub-tab",{active:u.value===T.key}]),role:"tab","aria-selected":u.value===T.key,onClick:H=>u.value=T.key},[p("span",null,U(T.label),1),T.source.type!=="uv"&&F(T)>0?(O(),P("span",$T,U(F(T)),1)):ae("",!0)],10,CT))),128))])):ae("",!0),f.value?.source.type==="user"?(O(),P("div",ET,[p("button",{class:"tool-btn",title:"导出我的组件为 JSON",onClick:fe},"↓ 导出"),p("button",{class:"tool-btn",title:"从 JSON 文件导入组件",onClick:Ne},"↑ 导入"),p("input",{ref_key:"importInputRef",ref:je,type:"file",accept:"application/json,.json",class:"hidden-input",onChange:Fe},null,544),E.value?(O(),P("span",TT,U(E.value),1)):ae("",!0)])):ae("",!0),p("div",AT,[f.value?.source.type==="uv"?(O(),nt(A(o),{key:0})):(O(),P(ue,{key:1},[I.value.length===0?(O(),P("div",IT,[f.value?.source.type==="theme-template"?(O(),P(ue,{key:0},[p("div",RT,"当前主题「"+U(r.theme.name)+"」暂无预设模板",1),b[2]||(b[2]=p("div",{class:"empty-hint"},"从工具栏切换主题，或在其它分类挑选通用组件。",-1))],64)):f.value?.source.type==="user"?(O(),P(ue,{key:1},[b[3]||(b[3]=p("div",{class:"empty-title"},"还没有自创组件",-1)),b[4]||(b[4]=p("div",{class:"empty-hint"},' 点下方"新建"开始，或在编辑器里选中一段 markdown 后用"保存选区为组件"把它存下来。 ',-1)),p("button",{class:"empty-cta",type:"button",onClick:He},"＋ 新建组件")],64)):(O(),P(ue,{key:2},[b[5]||(b[5]=p("div",{class:"empty-title"},"本分类暂无预设",-1)),b[6]||(b[6]=p("div",{class:"empty-hint"},"切到其它子分类继续浏览。",-1))],64))])):(O(),nt(N4,{key:1,entries:I.value,theme:r.theme,actions:C.value,onSelect:B,onAction:V},null,8,["entries","theme","actions"]))],64))]),Me(z4,{open:Je.open,"source-text":Je.source,error:Je.error,onCancel:pt,onConfirm:mn},null,8,["open","source-text","error"])],4),(O(),nt(Qd,{to:"body"},[s.value==="studio"&&a.value?(O(),P("div",{key:0,class:"studio-modal-mask",role:"dialog","aria-modal":"true","aria-label":"组件 Studio",onClick:It(L,["self"])},[p("div",MT,[Me(ST,{ref_key:"studioRef",ref:l,init:a.value,theme:r.theme,onDone:Ye,onCancel:Te},null,8,["init","theme"])])])):ae("",!0)]))],64))}}),NT=Ge(LT,[["__scopeId","data-v-80c45fc3"]]),DT=["aria-label"],PT=Ke({__name:"PanelShell",props:{ariaLabel:{},maxWidth:{default:560},maxHeight:{default:80},align:{default:"center"},topPadVh:{default:12}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,r=te(()=>({width:`min(${n.maxWidth}px, 92vw)`,maxHeight:`${n.maxHeight}vh`})),i=te(()=>["panel-shell-mask",`panel-shell-mask--align-${n.align}`]),s=te(()=>n.align==="top"?{paddingTop:`${n.topPadVh}vh`}:{});return(a,l)=>(O(),P("div",{class:$e(i.value),style:Qt(s.value),onClick:l[0]||(l[0]=It(c=>o("close"),["self"]))},[p("div",{class:"panel-shell-card",role:"dialog","aria-label":e.ariaLabel,style:Qt(r.value)},[Dr(a.$slots,"default",{},void 0)],12,DT)],6))}}),Eh=Ge(PT,[["__scopeId","data-v-d56f7a06"]]);function Th(e){const t=J(""),n=te(()=>{const r=typeof e.source=="function"?e.source():e.source.value,i=t.value.trim().toLowerCase();return i?r.filter(s=>e.predicate(s,i)):r});function o(){t.value=""}return{query:t,filtered:n,clear:o}}const BT={class:"cmd-group mono"},FT=["data-idx","onMouseenter","onClick"],jT={class:"cmd-title"},HT={key:0,class:"cmd-kbd"},VT={key:0,class:"cmd-empty"},UT=Ke({__name:"CommandPalette",props:{commands:{}},emits:["close"],setup(e,{emit:t}){const n=e,o=t,r=J(0),i=J(null),s=J(null),{query:a,filtered:l}=Th({source:te(()=>n.commands),predicate:(g,m)=>`${g.title} ${g.group} ${g.keywords??""} ${g.shortcut??""}`.toLowerCase().includes(m)});Pe(l,()=>{r.value=0}),zt(()=>{en(()=>i.value?.focus())});function c(g){if(g.key==="Escape"){g.preventDefault(),o("close");return}if(g.key==="ArrowDown"){g.preventDefault(),r.value=Math.min(r.value+1,l.value.length-1),u();return}if(g.key==="ArrowUp"){g.preventDefault(),r.value=Math.max(r.value-1,0),u();return}if(g.key==="Enter"){g.preventDefault();const m=l.value[r.value];m&&(m.run(),o("close"))}}function u(){en(()=>{s.value?.querySelector(`[data-idx="${r.value}"]`)?.scrollIntoView({block:"nearest"})})}function d(g){g.run(),o("close")}const f=te(()=>{const g=new Map;return l.value.forEach(m=>{const w=g.get(m.group)??[];w.push(m),g.set(m.group,w)}),Array.from(g.entries())});function h(g){return l.value.indexOf(g)}return(g,m)=>(O(),nt(Eh,{"aria-label":"命令面板","max-width":620,"max-height":64,align:"top","top-pad-vh":12,onClose:m[1]||(m[1]=w=>o("close"))},{default:Jt(()=>[p("div",{class:"cmd-head",onKeydown:c},[m[2]||(m[2]=p("span",{class:"cmd-icon"},"⌘",-1)),ot(p("input",{ref_key:"inputRef",ref:i,"onUpdate:modelValue":m[0]||(m[0]=w=>bt(a)?a.value=w:null),class:"cmd-input",type:"text",placeholder:"搜索命令、草稿、主题…",onKeydown:c},null,544),[[Ut,A(a)]]),m[3]||(m[3]=p("span",{class:"cmd-hint mono"},"↵ 执行 · Esc 关闭",-1))],32),p("ul",{ref_key:"listRef",ref:s,class:"cmd-list"},[(O(!0),P(ue,null,Le(f.value,([w,k])=>(O(),P(ue,{key:w},[p("li",BT,U(w),1),(O(!0),P(ue,null,Le(k,x=>(O(),P("li",{key:x.id,class:$e(["cmd-item",{active:h(x)===r.value}]),"data-idx":h(x),onMouseenter:L=>r.value=h(x),onClick:L=>d(x)},[p("span",jT,U(x.title),1),x.shortcut?(O(),P("span",HT,U(x.shortcut),1)):ae("",!0)],42,FT))),128))],64))),128)),A(l).length===0?(O(),P("li",VT,"没有匹配的命令")):ae("",!0)],512)]),_:1}))}}),zT=Ge(UT,[["__scopeId","data-v-ea7e7567"]]),WT=["value","placeholder","aria-label"],KT=Ke({__name:"SearchBox",props:{modelValue:{},placeholder:{},ariaLabel:{},size:{}},emits:["update:modelValue"],setup(e,{expose:t,emit:n}){const o=n,r=J(null);return t({focus(){r.value?.focus()}}),(i,s)=>(O(),P("input",{ref_key:"inputRef",ref:r,type:"search",class:$e(["search-box",e.size==="sm"?"search-box--sm":"search-box--md"]),value:e.modelValue,placeholder:e.placeholder,"aria-label":e.ariaLabel,onInput:s[0]||(s[0]=a=>o("update:modelValue",a.target.value))},null,42,WT))}}),qT=Ge(KT,[["__scopeId","data-v-647189fd"]]),GT={class:"help-shortcuts"},YT={class:"group-title mono"},JT={class:"shortcut-list"},ZT={class:"item-title"},QT={class:"item-kbd mono"},XT={class:"help-containers"},eA={class:"container-cat mono"},tA={class:"container-list"},nA=["onClick"],oA={class:"container-name"},rA={class:"container-desc"},iA={key:0,class:"container-empty"},sA={class:"help-foot"},aA=Ke({__name:"HelpPanel",props:{commands:{}},emits:["close","insert","restartOnboard"],setup(e,{emit:t}){const n=e,o=t;function r(){const f=new Map;return n.commands.filter(h=>h.shortcut).forEach(h=>{const g=f.get(h.group)??[];g.push(h),f.set(h.group,g)}),Array.from(f.entries())}const i=r(),s={structure:"文章结构",admonition:"提示",content:"内容",navigation:"导航",media:"媒体",signature:"签名",data:"数据图表",free:"兜底"},a=["structure","admonition","content","navigation","data","media","signature","free"],{query:l,filtered:c}=Th({source:()=>Qi,predicate:(f,h)=>f.name.toLowerCase().includes(h)||f.description.toLowerCase().includes(h)||f.category.toLowerCase().includes(h)}),u=te(()=>{const f=new Map;for(const h of c.value){const g=f.get(h.category)??[];g.push(h),f.set(h.category,g)}return a.map(h=>[h,f.get(h)??[]]).filter(([,h])=>h.length>0)});function d(f){o("insert",f.example),o("close")}return(f,h)=>(O(),nt(Eh,{"aria-label":"快捷键与帮助","max-width":560,"max-height":80,onClose:h[3]||(h[3]=g=>o("close"))},{default:Jt(()=>[Me(hs,{title:"快捷键与帮助",onClose:h[0]||(h[0]=g=>o("close"))}),h[5]||(h[5]=p("section",{class:"help-intro"},[p("div",{class:"intro-line"},[p("strong",null,"wechat-typeset"),We(" 是纯浏览器里的微信公众号 Markdown 排版工具。 ")]),p("div",{class:"intro-line"}," 草稿保存在本地浏览器，切 tab / 关 tab 都不丢；一键复制后直接粘贴进公众号编辑器即可保留排版。 ")],-1)),h[6]||(h[6]=p("section",{class:"help-icons"},[p("div",{class:"group-title mono"},"移动端工具栏"),p("ul",{class:"icon-list"},[p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"●"),p("span",{class:"icon-desc"},[p("strong",null,"切换主题"),We(" — 更换排版风格与配色方案")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"＋"),p("span",{class:"icon-desc"},[p("strong",null,"插入组件"),We(" — 封面、引用、代码块等预置模板")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"◐"),p("span",{class:"icon-desc"},[p("strong",null,"自定义配色"),We(" — 调整强调色与文字颜色")])]),p("li",{class:"icon-item"},[p("span",{class:"icon-glyph"},"···"),p("span",{class:"icon-desc"},[p("strong",null,"更多操作"),We(" — 导出、清空、三档样张（故事 / 组件参考 / 全功能展示）等")])])])],-1)),p("section",GT,[(O(!0),P(ue,null,Le(A(i),([g,m])=>(O(),P("div",{key:g,class:"shortcut-group"},[p("div",YT,U(g),1),p("ul",JT,[(O(!0),P(ue,null,Le(m,w=>(O(),P("li",{key:w.id,class:"shortcut-item"},[p("span",ZT,U(w.title),1),p("span",QT,U(w.shortcut),1)]))),128))])]))),128))]),p("section",XT,[h[4]||(h[4]=p("div",{class:"group-title mono"},"容器速查 · 点击插入光标处",-1)),Me(qT,{modelValue:A(l),"onUpdate:modelValue":h[1]||(h[1]=g=>bt(l)?l.value=g:null),class:"container-search",size:"sm",placeholder:"搜索容器名或用途（例：金句 / admonition / compare）","aria-label":"搜索容器"},null,8,["modelValue"]),(O(!0),P(ue,null,Le(u.value,([g,m])=>(O(),P("div",{key:g,class:"container-group"},[p("div",eA,U(s[g]),1),p("ul",tA,[(O(!0),P(ue,null,Le(m,w=>(O(),P("li",{key:w.name,class:"container-item",onClick:k=>d(w)},[p("code",oA,"::: "+U(w.name),1),p("span",rA,U(w.description),1)],8,nA))),128))])]))),128)),u.value.length===0?(O(),P("div",iA," 无匹配容器 ")):ae("",!0)]),h[7]||(h[7]=p("section",{class:"help-tips"},[p("div",{class:"tip-title mono"},"提示"),p("ul",null,[p("li",null,"双击草稿标题可就地重命名。"),p("li",null,"自定义配色改动即刻应用；切主题会还原为主题默认。"),p("li",null,"复制失败时请改用 Chrome / Safari 或关闭跨域预览。")])],-1)),p("footer",sA,[p("button",{class:"help-foot-btn",type:"button",onClick:h[2]||(h[2]=g=>o("restartOnboard"))}," ↻ 重新打开新手引导 ")])]),_:1}))}}),lA=Ge(aA,[["__scopeId","data-v-2f1c8e9d"]]),Ah="(max-width: 767px) and (pointer: coarse), (max-width: 540px)";function cA(){return window.matchMedia(Ah).matches}const x6="(min-width: 900px)",uA={class:"onboard",role:"note","aria-label":"首次使用引导"},dA={class:"onboard-head"},fA={class:"onboard-kicker mono"},pA={class:"onboard-title"},hA={class:"onboard-body"},mA={class:"onboard-dots",role:"tablist","aria-label":"引导步骤"},gA=["aria-selected","aria-label","onClick"],bA={class:"onboard-actions"},yA={key:0,class:"onboard-foot"},ca=3,ua="onboard-spotlight",vA=Ke({__name:"OnboardingCard",emits:["dismiss","openHelp"],setup(e,{emit:t}){const n=t,o=J(!1);let r=null;function i(){o.value=r?.matches??!1}const s=J(0),a=[{anchor:".btn-theme",title:"① 先选主题",body:"点工具栏的「主题名」按钮，主题决定配色、字距、装饰；切换瞬时生效。",next:"下一步 →"},{anchor:".btn-insert",title:"② 插入排版块",body:"点「+ 插入」打开组件库——提示块、金句卡、步骤、对比……一键插光标处。",next:"下一步 →"},{anchor:".btn-copy-main",title:"③ 一键复制到公众号",body:`按 ${Ko} ↵ 或点工具栏「一键复制」，回到公众号编辑器粘贴即可。`,next:"完成"}],l=[{anchor:".btn-theme",title:"① 先选主题",body:"点上方「主题名」选不同视觉气质；预览实时更新。",next:"下一步 →"},{anchor:".btn-insert",title:"② 插入排版块",body:"点「+」插入提示块 / 金句卡 / 步骤等公众号常用版式。",next:"下一步 →"},{anchor:".mobile-tab-copy",title:"③ 一键复制",body:"底部「一键复制」按钮把富文本复制到剪贴板，去公众号粘贴即可。",next:"完成"}],c=te(()=>o.value?l:a),u=te(()=>c.value[s.value]);function d(){document.querySelectorAll(`.${ua}`).forEach(k=>{k.classList.remove(ua)})}function f(k){if(d(),!k)return;document.querySelector(k)?.classList.add(ua)}const h=J(null);function g(){en(()=>h.value?.focus())}function m(k){if(k>=ca){w();return}s.value=k,f(u.value.anchor),g()}function w(){d(),n("dismiss")}return zt(()=>{r=window.matchMedia(Ah),i(),r.addEventListener("change",i),f(u.value.anchor),g()}),rl(()=>{r?.removeEventListener("change",i),d()}),(k,x)=>(O(),P("aside",uA,[p("header",dA,[p("span",fA,"WELCOME · "+U(s.value+1)+"/"+U(ca),1),p("button",{class:"close",title:"不再显示","aria-label":"不再显示",onClick:w},"×")]),p("h4",pA,U(u.value.title),1),p("p",hA,U(u.value.body),1),p("div",mA,[(O(),P(ue,null,Le(ca,L=>p("button",{key:L,type:"button",role:"tab",class:$e(["onboard-dot",{active:L-1===s.value}]),"aria-selected":L-1===s.value,"aria-label":`第 ${L} 步`,onClick:$=>m(L-1)},null,10,gA)),64))]),p("div",bA,[p("button",{class:"onboard-skip",type:"button",onClick:w},"跳过"),p("button",{ref_key:"nextBtnRef",ref:h,class:"onboard-next",type:"button",onClick:x[0]||(x[0]=L=>m(s.value+1))},U(u.value.next),513)]),s.value===0?(O(),P("p",yA,[x[2]||(x[2]=We(" 想直接看快捷键？ ",-1)),p("button",{class:"onboard-link",type:"button",onClick:x[1]||(x[1]=L=>{n("openHelp"),w()})},"打开帮助")])):ae("",!0)]))}}),wA=Ge(vA,[["__scopeId","data-v-7f414c25"]]),SA={class:"toast",role:"status","aria-live":"polite","aria-atomic":"true"},kA={class:"toast-msg"},xA=Ke({__name:"UndoToast",props:{message:{},duration:{}},emits:["undo","expire"],setup(e,{emit:t}){const n=e,o=t;let r=null;zt(()=>{r=window.setTimeout(()=>o("expire"),n.duration??4e3)}),yt(()=>{r!==null&&window.clearTimeout(r)});function i(){r!==null&&window.clearTimeout(r),o("undo")}return(s,a)=>(O(),P("div",SA,[p("span",kA,U(n.message),1),p("button",{class:"toast-undo",onClick:i},"撤销")]))}}),_A=Ge(xA,[["__scopeId","data-v-d3fcc27f"]]),CA={class:"copy-toast",role:"status","aria-live":"polite","aria-atomic":"true"},$A={class:"copy-toast-body"},EA={class:"copy-toast-text"},TA={class:"copy-toast-msg"},AA={key:0,class:"copy-toast-chips"},IA={class:"copy-toast-actions"},RA=Ke({__name:"CopyResultToast",props:{message:{},details:{},cta:{},duration:{}},emits:["dismiss"],setup(e,{emit:t}){const n=e,o=t;let r=null;zt(()=>{r=window.setTimeout(()=>o("dismiss"),n.duration??6e3)}),yt(()=>{r!==null&&window.clearTimeout(r)});function i(){n.cta&&(window.open(n.cta.url,"_blank","noopener,noreferrer"),o("dismiss"))}function s(){o("dismiss")}return(a,l)=>(O(),P("div",CA,[p("div",$A,[l[0]||(l[0]=p("span",{class:"copy-toast-glyph","aria-hidden":"true"},"✓",-1)),p("div",EA,[p("span",TA,U(n.message),1),n.details&&n.details.length>0?(O(),P("span",AA,[(O(!0),P(ue,null,Le(n.details,(c,u)=>(O(),P("span",{key:u,class:"copy-toast-chip"},U(c),1))),128))])):ae("",!0)])]),p("div",IA,[n.cta?(O(),P("button",{key:0,class:"copy-toast-cta",type:"button",onClick:i},U(n.cta.label)+" →",1)):ae("",!0),p("button",{class:"copy-toast-close",type:"button","aria-label":"关闭",onClick:s},"×")])]))}}),MA=Ge(RA,[["__scopeId","data-v-6eb3f8ee"]]),OA={key:0,class:"error-boundary",role:"alert"},LA={class:"error-boundary__head"},NA={class:"error-boundary__title"},DA={class:"error-boundary__body"},PA={class:"error-boundary__message"},BA={key:0,class:"error-boundary__details"},FA={class:"error-boundary__stack"},jA=Ke({__name:"ErrorBoundary",props:{fallbackTitle:{},logToConsole:{type:Boolean}},emits:["close","error"],setup(e,{emit:t}){const n=e,o=t,r=J(null),i=J(0);ef(l=>{const c=l instanceof Error?l:new Error(String(l));return r.value={message:c.message||"未知错误",stack:c.stack},(n.logToConsole??!1??!1)&&console.error("[ErrorBoundary]",c),o("error",c),!1});function s(){r.value=null,i.value+=1}function a(){o("close")}return(l,c)=>r.value?(O(),P("div",OA,[p("div",LA,[p("strong",NA,U(e.fallbackTitle??"面板渲染失败"),1),p("button",{class:"error-boundary__close",type:"button",onClick:a},"关闭")]),p("div",DA,[p("p",PA,U(r.value.message),1),r.value.stack?(O(),P("details",BA,[c[0]||(c[0]=p("summary",null,"调用栈",-1)),p("pre",FA,U(r.value.stack),1)])):ae("",!0)]),p("div",{class:"error-boundary__actions"},[p("button",{class:"error-boundary__retry",type:"button",onClick:s},"重试")])])):Dr(l.$slots,"default",{key:i.value},void 0)}}),So=Ge(jA,[["__scopeId","data-v-a9a763ac"]]),Zu={html:"",wordCount:0,readingTime:1,patchLog:{entries:[],total:0},pageConfig:{},frontmatterIssues:[]};function HA(e,t={}){const n=t.delayMs??80,o=t.immediate??!0,r=J(Zu);let i=null,s=0,a=!1,l=null;function c(w){console.error("[useDebouncedRender] render failed:",w),r.value={...Zu,html:`<pre style="color:#c00;padding:16px;white-space:pre-wrap">渲染失败：${G(String(w))}</pre>`}}function u(w,k=!1){try{r.value=mh(w)}catch(x){if(c(x),k)throw x}}function d(){i!==null&&(window.clearTimeout(i),i=null)}async function f(w,k){try{const x=await t.prepareInput(w);!a&&k===s&&w===e.value&&u(x)}catch(x){!a&&k===s&&w===e.value&&c(x)}}function h(w){const k=++s;d(),!(l||a)&&(i=window.setTimeout(()=>{i=null,t.prepareInput?f(w,k):u(w)},n))}async function g(){for(;!a;){const w=e.value,k=++s;let x;try{x=await t.prepareInput(w)}catch(L){if(a)break;if(k!==s||w!==e.value)continue;throw c(L),L}if(a)break;if(!(k!==s||w!==e.value)){u(x,!0);return}}throw new Error("渲染已停止")}function m(){if(d(),!t.prepareInput){++s,a||u(e.value);return}return l||(l=g().finally(()=>{l=null})),l}return Pe(e,w=>{h(w)},{immediate:o}),yt(()=>{a=!0,++s,d()}),{rendered:r,flush:m}}function VA(){const e=Rn({leftSlot:null,rightSlot:null,commandOpen:!1,helpOpen:!1}),t=te(()=>({drafts:e.leftSlot==="drafts",components:e.rightSlot==="components",customizer:e.rightSlot==="customizer",checklist:e.rightSlot==="checklist",personaStudio:e.rightSlot==="persona-studio"}));function n(i){e.leftSlot=e.leftSlot===i?null:i}function o(i){e.rightSlot=e.rightSlot===i?null:i}function r(){e.leftSlot=null,e.rightSlot=null}return{ui:e,drawerStates:t,toggleLeft:n,toggleRight:o,closeAll:r}}const UA=400,zA=1800;function WA(e){const t=J(null),n=J(0),o=J("idle"),r=J("");let i=null;const s=J(null);let a=null,l=null,c=null;function u(v,S=1500){r.value=v,i!==null&&window.clearTimeout(i),i=window.setTimeout(()=>r.value="",S)}const d=te(()=>r.value?r.value:o.value==="saving"?"保存中…":o.value==="saved"?"已保存":o.value==="error"?"草稿写盘失败 · 存储已满":"　"),f=te(()=>o.value==="error"?"error":r.value?"saved":o.value);function h(v,S){s.value={message:v,restore:S}}function g(){s.value?.restore()!==!1&&(s.value=null)}function m(){s.value=null}const w=te(()=>(n.value,t.value?Eo().find(v=>v.id===t.value)?.title??"":""));function k(){a!==null&&(window.clearTimeout(a),a=null),l!==null&&t.value&&(wl(t.value,{body:l})?(l=null,n.value+=1,o.value="saved",c!==null&&window.clearTimeout(c),c=window.setTimeout(()=>{o.value==="saved"&&(o.value="idle")},zA)):(o.value="error",u("草稿写盘失败 · 存储已满",4e3)))}Pe(e.md,v=>{t.value&&(l=v,o.value="saving",a!==null&&window.clearTimeout(a),a=window.setTimeout(k,UA))});function x(v="default"){const S=Qf();if(S){const C=zo(S);if(C){t.value=C.id,e.md.value=C.body,C.themeId&&(e.baseThemeId.value=C.themeId);return}}const I=Eo();if(I.length>0){const C=I[0];t.value=C.id,To(C.id),e.md.value=zo(C.id)?.body??"",C.themeId&&(e.baseThemeId.value=C.themeId)}else{const C=ni({title:"wechat-typeset 示例",body:e.getSample(v),themeId:v});t.value=C.id,e.md.value=C.body}}function L(){t.value&&(l=e.md.value,k(),u("已保存"))}function $(v){if(v===t.value)return;k();const S=zo(v);S&&(t.value=S.id,To(S.id),e.md.value=S.body,S.themeId&&(e.baseThemeId.value=S.themeId),n.value+=1)}function N(v,S,I){const C=zo(v);if(!C)return;const F=t.value===v;if(Xf(v),F){const E=Eo()[0];if(E){const j=zo(E.id)?.body??"";t.value=E.id,To(E.id),e.md.value=j,E.themeId&&(e.baseThemeId.value=E.themeId)}else t.value=null,e.md.value=""}n.value+=1,h(`已删除「${S}」`,()=>{if(I&&!I())return!1;const E={...C};return ep(JSON.stringify({version:1,drafts:[E]})),t.value=E.id,To(E.id),e.md.value=E.body,E.themeId&&(e.baseThemeId.value=E.themeId),n.value+=1,!0})}function D(v){(v.key===null||v.key.startsWith(sv))&&(n.value+=1)}zt(()=>{window.addEventListener("storage",D)}),yt(()=>{window.removeEventListener("storage",D)});function _(v="wechat-typeset-export"){return(Eo().find(I=>I.id===t.value)?.title??v).replace(/[\\/:*?"<>|\s]+/g,"-")||v}return{activeDraftId:t,draftIndexTick:n,savingState:o,displayedSavingLabel:d,displayedSavingState:f,currentDraftTitle:w,undo:s,initActiveDraft:x,handleSave:L,handleSelectDraft:$,handleDeleteDraftRequest:N,flushDraftSave:k,pingTransient:u,showUndo:h,onUndo:g,onUndoExpire:m,fileStem:_}}function KA(e){const t=x1(),n=$r(null),o=$r([]),r=$r(null),i=J(!1),s=J(0),a=J(!1),l=J(""),c=$r(null),u=J("");let d=0,f,h=Promise.resolve();const g=te(()=>!!r.value&&e.md.value!==u.value),m=te(()=>Oo(e.md.value).publication.title||r.value?.title||""),w=te(()=>l.value||(a.value?"读写中…":g.value?"未保存":"已保存到文件"));function k(){return`wechat-typeset:file-buffer:${n.value?.id}:${r.value?.name}`}function x(){return clearTimeout(f),r.value?g.value?ds(k(),{text:e.md.value,lastModified:d})?!0:(l.value="未保存 · 崩溃备份失败，请按 Ctrl+S 写盘",!1):(cs(k()),!0):!0}Pe(e.md,()=>{r.value&&(clearTimeout(f),f=setTimeout(x,2e3))},{flush:"sync"});async function L(B){if(!a.value){a.value=!0,l.value="";try{await B()}catch(V){V instanceof DOMException&&V.name==="AbortError"||(l.value=`文件操作失败：${V instanceof Error?V.message:String(V)}`)}finally{a.value=!1}}}async function $(){n.value&&i.value&&(o.value=await E1(n.value.dir),s.value++)}async function N(){await L(async()=>{if(await h,n.value?i.value=await n.value.dir.requestPermission({mode:"readwrite"})==="granted":(n.value=await qc(),i.value=!0),!i.value){l.value="未获得文件夹读写权限，请再次点击文件夹入口授权";return}await $()})}async function D(){x()&&await L(async()=>{const B=await qc();x()&&(r.value&&(r.value=null,c.value=null,e.md.value=""),n.value=B,i.value=!0,await $())})}function _(B,V,z=!0){u.value=B,d=V,e.md.value=B;const fe=Oo(B).config.theme;fe&&(e.baseThemeId.value=fe),c.value=null,z&&x()}async function v(B){B.name!==r.value?.name&&await L(async()=>{const V=await Wo(B.file);if(!x()||!e.beforeOpen())return;r.value=B;const z=us(k(),null),fe=z&&typeof z.text=="string"&&typeof z.lastModified=="number"&&z.text!==V.text;_(V.text,V.lastModified,!fe),fe&&(d=z.lastModified,e.md.value=z.text,x(),z.lastModified!==V.lastModified&&(c.value={lastModified:V.lastModified}))})}async function S(B){if(!n.value||!B.trim())return;let V;await L(async()=>{V=await T1(n.value.dir,B.trim()),await $()}),V&&await v(V)}async function I(){!i.value||a.value||c.value||await L(async()=>{if(await $(),!r.value)return;const B=await Wo(r.value.file);B.lastModified!==d&&(g.value?c.value={lastModified:B.lastModified}:_(B.text,B.lastModified))})}async function C(B){r.value&&await L(async()=>{const V=r.value,z=await Wo(V.file);if(z.lastModified!==d&&z.lastModified!==B){g.value?c.value={lastModified:z.lastModified}:_(z.text,z.lastModified);return}const fe=e.md.value;d=await ul(V.file,fe),u.value=fe,c.value=null,x(),await $()})}async function F(){r.value&&await L(async()=>{const B=await Wo(r.value.file);_(B.text,B.lastModified),await $()})}function E(){return C(c.value?.lastModified)}function j(){return a.value||c.value||!x()?!1:(r.value=null,l.value="",!0)}function R(B){x(),g.value&&(B.preventDefault(),B.returnValue="")}return zt(()=>{t&&(h=_1().then(B=>{n.value=B}).catch(B=>{l.value=String(B)})),window.addEventListener("focus",I),window.addEventListener("pagehide",x),window.addEventListener("beforeunload",R)}),yt(()=>{x(),window.removeEventListener("focus",I),window.removeEventListener("pagehide",x),window.removeEventListener("beforeunload",R)}),{supported:t,library:n,articles:o,activeArticle:r,permitted:i,revision:s,busy:a,error:l,dirty:g,title:m,savingLabel:w,conflict:c,connect:N,chooseLibrary:D,open:v,create:S,save:C,leave:j,flushBuffer:x,loadDiskVersion:F,overwrite:E}}const qA=["在这个快速变化的时代","值得我们深思","重新定义","颠覆性变革","不难发现","毋庸置疑","赋能千行百业","从0到1的闭环","让我们拭目以待","引发了广泛关注","随着科技的不断发展","时代的浪潮","站在新的起点","开启新的篇章","未来已来","机遇与挑战并存","助力高质量发展","携手共创未来","不可或缺的一部分","具有重要意义","不言而喻","众所周知","显而易见","可见一斑","大有可为","值得期待","让我们共同期待","总而言之","综上所述","从某种意义上说"],Qu={id:"deep-research",name:"深度研究",description:"商业研究、科技产业观察、行为心理学与非虚构写作的 2000—3000 字深度文章。",positioning:`内容定位：以商业研究、科技产业观察、行为心理学和非虚构写作为核心，面向具有专业阅读习惯的中文读者，创作观点鲜明、证据充分、现实感强的深度文章，解释事实背后的机制与人的处境。

目标读者：具有一定教育背景和思辨习惯的成年中文读者。默认读者理解基本商业与科技概念，但不预设其了解具体行业术语和海外制度背景。

最终标准：让读者不仅认为文章有道理，更能获得一个此前没有、值得带给别人的认识。写完后用一句话说出这个新认识；说不出来，或说出来是常识，文章就还没有完成。`,expression:`语言风格：冷静、专业、具体而锋利。使用完整连贯的中文自然段，用具体的人、动作、数字和场景代替概念。证据充分时允许尖锐判断；少用营销语言、空泛抒情和无内容排比，不刻意制造对立。

表达禁忌：减少概念堆砌、机械排比、说教和空泛金句；控制“不是……而是……”“当然……但是……”等反复出现的 AI 式表达，同一种句式全文尽量只用一次。不把每句话独立成段；不使用鸡汤式收尾、浮夸副标题或机械的同构小节；不写虚假的采访和未经证据支持的数字。`,structure:`每篇必备：
- 独立的现实冲突：一个此刻正在发生、有具体当事人和代价的矛盾，而不是抽象议题。
- 具有争论价值的核心判断：有人会反对、能够被证据检验的明确立场，而不是两边都对的总结。
- 能够支撑判断的真实证据：可核实的事实、数据、原始研究或商业现场，足以撑住判断最强的那一部分。

系列递进：一个系列必须实现思想递进：每篇在上一篇的结论上提出新问题、推翻一个前提或进入更深一层机制，而不是换一个案例重复同一观点。动笔前写明本篇相对系列已发表文章新增的认识。

文章结构：开篇迅速进入问题：前两段内出现具体冲突、反常事实或职业处境，不铺垫时代背景。中段提供超越常识的发现：每个章节推进事实、机制或反例，理论与现实案例交替，至少有一处读者事先不知道或想错了的地方；允许叙事而非整齐三段论。正文标题优先 2—4 级，避免为了排版增加章节。结尾不重复梳理全文，留下一个能够引发真实行业讨论的问题，或一个仍然真实存在的难题。

标题切入：现实矛盾（同一事实里两种相互冲突的结果）；认知反差（读者默认的判断与证据指向相反）；职业身份冲突（某种身份的优势恰恰成为其困境）。

标题、摘要与卷首语：标题允许尖锐，但必须由正文兑现，读完后读者不应觉得被标题欺骗；避免标题党和无信息的悬念。默认提出 5—7 个切入角度真正不同的标题候选（机制、冲突、现实后果、人物切口等）。分享摘要为 60—120 字，不复述标题；卷首语承担阅读引入角色，通常为 80—180 字，正文不重复包含它。`,evidence:`证据标准：核心事实和关键数字必须给出可核实来源，优先官方披露、原始报道、论文、书籍和可信数据库。正文明确区分三类内容：可核实的事实、行业典型情境（基于普遍做法的合理描述，须标明是典型情境而非具体个案）、分析推断（作者的判断）。无法完全核实但有分析价值的数字明确标注口径，影响结论的重要方法局限集中解释一次。不捏造采访、引文、业务数据、传播成绩、参考文献、时间、案例或图像来源。

案例取材：优先使用中国读者熟悉的企业案例、真实社会现场、商业交易情境和原始研究；海外案例只在中国案例无法说明问题时使用，并补齐必要的商业和制度语境。同一案例不在同一系列中反复充当主证据。`,visuals:`配图原则：正文图片应有明确作用，从四类中选择：历史纪实（还原现场与时间）、数据可视化（支撑关键数字，必须说明来源与口径）、商业判断框架（把文章的机制画成结构图）、观点卡片（提炼可被转发的核心判断）。每张图提交用途、建议画面、可核实来源或 AI 生成标注、图注。公众号封面一般提供 3 个构图和气质不同的候选方案。

视觉一致性：研究与叙事主题的配色、字体与编号体系保持一致。避免封面构图同质化（同一系列不连续使用同类构图），避免刻板 AI 摄影（发光大脑、握手、机器人、蓝色科技光效、无意义的人物剪影）。AI 生成图片必须标注。`,review:`发布前自查：
- 标题兑现程度：读完正文，标题的承诺是否被完整兑现？尖锐的部分是否都有证据撑住？
- 观点独特性：核心判断是否超出读者已有常识？能否用一句话说出本文新增的认识？
- 证据可信度：关键事实是否都有可核实来源？事实、典型情境与推断是否区分清楚？
- 阅读留存：开篇两段内是否进入冲突？中段是否有让人继续读下去的新发现？
- 情绪穿透力：是否写出了具体的人与处境，而不是抽象的趋势和概念？
- 主动分享理由：读者转发它，是为了向谁说明什么？这个理由是否成立？

交付说明：正文末尾保留“延伸阅读”参考资料链接。候选标题、系列递进说明、卷首语和封面候选作为交付说明提供；逐条回答上述评审问题，并列出仍未核实的事实。正式稿按下方文件约定交付。

补充约定：保留作者清晰的个人立场，允许提出难以回避的反问；对事实责任和人的处境同样认真。`,rules:{phrases:[...qA],patterns:["不是……而是……","当然……但是……","与其说……不如说……","这不仅……更是……","本质上","真正的","换句话说","归根结底"],patternTolerance:1,minWords:2e3,maxWords:3e3,minImages:2,maxImages:3}};function da(){return{version:1,defaultId:Qu.id,styles:[structuredClone(Qu)]}}function ja(e,t){if(!e||typeof e!="object"||Array.isArray(e))throw new Error(`${t} 应为对象`);return e}function rn(e,t,n,o=!1){if(e===void 0&&!o)return"";if(typeof e!="string"||e.length>n||o&&!e.trim())throw new Error(`${t} 应为${o?"非空":""}文字，最多 ${n} 字`);return e}function Xu(e,t){if(!Array.isArray(e)||e.length>60)throw new Error(`${t} 应为最多 60 条的文字列表`);return[...new Set(e.map(n=>rn(n,t,300,!0).trim()))]}function Cr(e,t,n){if(typeof e!="number"||!Number.isInteger(e)||e<0||e>n)throw new Error(`${t} 应为 0—${n} 的整数`);return e}function GA(e){const t=ja(e,"写作风格"),n=ja(t.rules,"检查规则"),o={id:rn(t.id,"风格 ID",80,!0),name:rn(t.name,"风格名称",60,!0),description:rn(t.description,"适用场景",500),positioning:rn(t.positioning,"定位与读者",1e4),expression:rn(t.expression,"语言与表达",1e4),structure:rn(t.structure,"结构与标题",1e4),evidence:rn(t.evidence,"证据与案例",1e4),visuals:rn(t.visuals,"配图与视觉",1e4),review:rn(t.review,"评审与补充",1e4),rules:{phrases:Xu(n.phrases,"套话词表"),patterns:Xu(n.patterns,"句式词表"),patternTolerance:Cr(n.patternTolerance,"句式容许次数",20),minWords:Cr(n.minWords,"字数下限",2e4),maxWords:Cr(n.maxWords,"字数上限",2e4),minImages:Cr(n.minImages,"图片下限",30),maxImages:Cr(n.maxImages,"图片上限",30)}};for(const r of Object.keys(t))if(!Object.hasOwn(o,r))throw new Error(`不支持写作风格字段 ${r}`);for(const r of Object.keys(n))if(!Object.hasOwn(o.rules,r))throw new Error(`不支持检查字段 ${r}`);if(o.rules.minWords>o.rules.maxWords||o.rules.minImages>o.rules.maxImages)throw new Error("检查范围的下限不能大于上限");return o}function ed(e){try{const t=ja(JSON.parse(e),"写作风格文件");if(t.version!==1)throw new Error("不支持的写作风格文件版本");if(!Array.isArray(t.styles)||t.styles.length===0||t.styles.length>50)throw new Error("请保留 1—50 套写作风格");const n=t.styles.map(GA),o=new Set(n.map(i=>i.id));if(o.size!==n.length)throw new Error("写作风格 ID 不能重复");const r=rn(t.defaultId,"默认风格 ID",80,!0);if(!o.has(r))throw new Error("默认写作风格不存在");for(const i of Object.keys(t))if(!["version","defaultId","styles"].includes(i))throw new Error(`不支持文件字段 ${i}`);return{ok:!0,value:{version:1,defaultId:r,styles:n}}}catch(t){return{ok:!1,error:t instanceof Error?t.message:String(t)}}}function _6(e){const n=[["适用场景",e.description],["定位与读者",e.positioning],["语言与表达",e.expression],["结构与标题",e.structure],["证据与案例",e.evidence],["配图与视觉",e.visuals],["评审与补充",e.review]].filter(([,r])=>r.trim()).map(([r,i])=>`## ${r}

${i}`).join(`

`),o=e.rules;return`# 写作风格：${e.name}

${n}

## 检查要求

- 正文目标 ${o.minWords}—${o.maxWords} 字，正文图片 ${o.minImages}—${o.maxImages} 张。
- 控制使用的句式（每种允许 ${o.patternTolerance} 次）：${o.patterns.join("；")||"未设置"}。
- 避免套话：${o.phrases.join("；")||"未设置"}。
- 检查超过 80 字的长句、连续 3 个以上的单句段；正文图片配可见图注，alt 说明不代替图注。

## 文件约定

直接在文章库中新建 <日期-slug>/article.md，图片放在同篇 images/。article.md 使用 YAML frontmatter 和正文，发布字段为 title、digest（最多 120 字）、author、cover、source、date，可保留 theme、variants；本篇 writingStyle 使用 ${JSON.stringify(e.id)}。
cover 使用 images/ 下的相对路径。正文以 ![](images/文件名.webp) 或本仓库已有图片容器引用图片，禁止 base64 写入稿件。只使用本仓库现有 ::: 容器语法，排版选择遵守 docs/contract/，不发明新容器。
`}const Ii=".writing-styles.json",td="wechat-typeset:writing-styles";async function nd(e){try{const t=await e.getFileHandle(Ii);return{handle:t,...await Wo(t)}}catch(t){if(t instanceof DOMException&&t.name==="NotFoundError")return null;throw t}}function YA(e){const t=$r(da()),n=J(!1),o=J(!1),r=J("");let i=0,s,a=null;const l=J(!0),c=te(()=>Oo(e.md.value).publication.writingStyle||t.value.defaultId),u=te(()=>!n.value&&!o.value&&!l.value),d=te(()=>n.value||l.value?null:t.value.styles.find(x=>x.id===c.value)??null),f=te(()=>r.value||(!n.value&&!l.value&&!d.value?`本文写作风格「${c.value}」不存在，请重新选择。`:""));function h(x,L){return x===i&&e.directory.value===L}async function g(){const x=++i,L=e.directory.value;s!==L&&(t.value=da()),s=L,n.value=!0,r.value="",l.value=!0;try{const $=L?await nd(L):null;if(!h(x,L))return;const N=$?.text??localStorage.getItem(td),D=N===null?{ok:!0,value:da()}:ed(N);if(!D.ok)throw new Error(`${$?Ii:"浏览器写作风格"}格式错误：${D.error}。请修复后重新载入。`);t.value=D.value,a=$?.lastModified??null,l.value=!1}catch($){h(x,L)&&(r.value=`写作风格未载入：${$ instanceof Error?$.message:String($)}`)}finally{h(x,L)&&(n.value=!1)}}function m(){return o.value?Promise.resolve():g()}function w(x){return u.value?t.value.styles.some(L=>L.id===x)?(r.value="",e.md.value=Tf(e.md.value,{writingStyle:x}),!0):(r.value="写作风格不存在，请重新选择。",!1):!1}async function k(x){if(!u.value)return!1;const L=i,$=e.directory.value;o.value=!0,r.value="";try{const N=ed(JSON.stringify(x));if(!N.ok)throw new Error(N.error);const D=`${JSON.stringify(N.value,null,2)}
`;if($){const _=await nd($);if(!h(L,$))return!1;if((_?.lastModified??null)!==a)throw l.value=!0,new Error(`${Ii} 已在外部修改，请重新载入后再保存。`);const v=_?.handle??await $.getFileHandle(Ii,{create:!0}),S=await ul(v,D);if(!h(L,$))return!1;a=S}else if(!Yt(td,D))throw new Error("浏览器存储写入失败，请检查存储空间后重试。");return h(L,$)?(t.value=N.value,!0):!1}catch(N){return h(L,$)&&(r.value=`写作风格未保存：${N instanceof Error?N.message:String(N)}`),!1}finally{o.value=!1}}return Pe(e.directory,()=>{g()},{immediate:!0,flush:"sync"}),yt(()=>{i+=1}),{config:t,loading:n,saving:o,canEdit:u,error:f,selectedId:c,activeStyle:d,select:w,save:k,reload:m}}async function JA(e,t){if(navigator.clipboard&&window.isSecureContext&&typeof ClipboardItem<"u")try{const n=new Blob([e],{type:"text/html"}),o=new Blob([t],{type:"text/plain"}),r=new ClipboardItem({"text/html":Promise.resolve(n),"text/plain":Promise.resolve(o)});return await navigator.clipboard.write([r]),{ok:!0,mode:"clipboard-api"}}catch(n){console.warn("[copyHtml] Clipboard API failed, fallback to execCommand:",n)}try{const n=document.createElement("div");n.setAttribute("contenteditable","true"),n.style.position="fixed",n.style.left="-9999px",n.style.top="0",n.innerHTML=e,document.body.appendChild(n);const o=document.createRange();o.selectNodeContents(n);const r=window.getSelection();if(!r)throw new Error("no selection");r.removeAllRanges(),r.addRange(o);const i=document.execCommand("copy");if(r.removeAllRanges(),document.body.removeChild(n),!i)throw new Error("execCommand copy returned false");return{ok:!0,mode:"exec-command"}}catch(n){return{ok:!1,mode:"failed",error:String(n)}}}function ZA(e){if(!e)return 0;const t=/<img\b[\s\S]*?\bsrc\s*=\s*["']data:image\//gi,n=e.match(t);return n?n.length:0}const od={voice:(e,t)=>{const n=["mpvoice"];return t&&n.push(`name="${t}"`),e&&n.push(`voice_encode_fileid="${e}"`),` ${n.join(" ")} `},video:(e,t,n)=>{const o=["mpvideo"];return e&&o.push(`vid="${e}"`),t&&o.push(`video_encode_fileid="${t}"`),n&&o.push(`name="${n}"`),` ${o.join(" ")} `}};function QA(e){if(!e)return{html:e,count:0};if(typeof DOMParser>"u")return{html:e,count:0};const t=new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,"text/html"),n=t.body,o=Array.from(n.querySelectorAll("[data-wx-mp-kind]"));if(o.length===0)return{html:e,count:0};let r=0;for(const i of o){if(i.getAttribute("data-wx-mp-hint")==="emitted")continue;const s=i.getAttribute("data-wx-mp-kind"),a=i.getAttribute("data-wx-mp-name"),l=i.getAttribute("data-wx-mp-fileid");let c;if(s==="voice")c=od.voice(l,a);else if(s==="video"){const f=i.getAttribute("data-wx-mp-vid");c=od.video(f,l,a)}else continue;const u=t.createComment(c),d=i.parentNode;d&&(d.insertBefore(u,i),i.setAttribute("data-wx-mp-hint","emitted"),r+=1)}return r===0?{html:e,count:0}:{html:n.innerHTML,count:r}}const rd=1,XA="share=",e5="#wechat-typeset-stripped-image",Ih={prefix:XA,validate(e){if(!Hl(e)||e.v!==rd||typeof e.md!="string"||typeof e.themeId!="string")return null;const t=typeof e.strippedImages=="number"&&e.strippedImages>0?e.strippedImages:void 0;return{v:rd,md:e.md,themeId:e.themeId,...t!==void 0?{strippedImages:t}:{}}}};function t5(e,t={}){return kh(Ih,e,t)}function n5(e){return jl(Ih,e)}function o5(e){if(!e)return{md:"",count:0};let t=0;return{md:r5(e).map(r=>r.code?r.text:r.text.replace(/!\[([^\]]*)\]\(data:[^)\s]+\)/g,(i,s)=>(t++,`![${s}](${e5})`))).join(""),count:t}}function r5(e){const t=e.split(`
`),n=[];let o=[],r=!1;for(let i=0;i<t.length;i++){const s=t[i];if(/^\s*```/.test(s)){o.push(s),n.push({text:o.join(`
`)+(i<t.length-1?`
`:""),code:r}),o=[],r=!r;continue}o.push(s)}return o.length>0&&n.push({text:o.join(`
`),code:r}),n}const Rh="wechat-typeset:outlink-strategy";function i5(){const e=dn(Rh);return e&&Jf.includes(e)?e:"keep"}function s5(e){return e.trim()?e.split(/\n\s*\n+/).filter(t=>t.trim().length>0).length:0}const a5="https://mp.weixin.qq.com/";function l5(e){const t=J(i5()),n=J(null),o=J(null),r=te(()=>{const f=e.rendered.value,{html:h,count:g}=My(f.html,t.value),{html:m}=QA(h);return{rendered:{...f,html:m},count:g}}),i=te(()=>r.value.rendered);function s(f){t.value=f,Yt(Rh,f)}function a(){o.value=null}async function l(){try{await e.flush();const{rendered:f,count:h}=r.value,g=t.value,m=ZA(f.html),w=e.md.value,k=await JA(f.html,w);if(k.ok){const x=[],L=f.wordCount,$=s5(w);L>0&&x.push(`${L} 字`),$>0&&x.push(`${$} 段`),h>0&&g==="tail-list"?x.push(`${h} 条外链已尾注`):h>0&&g==="drop"&&x.push(`${h} 条外链已丢弃`),m>0&&x.push(`${m} 张内联图待微信转存`),k.mode!=="clipboard-api"&&x.push("已降级走 execCommand");const N=k.mode==="clipboard-api"?"已复制":"已复制（降级）";e.pingTransient(x.length>0?`${N}（${x.join(" · ")}）`:N),o.value={message:"已复制到剪贴板",details:x,cta:{label:"打开公众号后台",url:a5}},n.value=null}else n.value=`复制失败：${k.error??"未知错误"}（请换 Chrome/Safari 或关闭跨域 iframe）`}catch(f){n.value=`复制失败：${f instanceof Error?f.message:String(f)}`}}async function c(){const{md:f,count:h}=o5(e.md.value),g={v:1,md:f,themeId:e.baseThemeId.value,...h>0?{strippedImages:h}:{}},m=t5(g),w=h>0?`（${h} 张内联图已剥离）`:"";try{navigator.clipboard?.writeText?(await navigator.clipboard.writeText(m),e.pingTransient("已复制分享链接"+w)):(location.hash=m.slice(m.indexOf("#")),e.pingTransient("请从地址栏复制当前链接"+w))}catch{n.value="分享链接复制失败：请手动复制地址栏 URL"}}function u(f){return`[分享] ${(f.split(`
`).map(m=>m.trim()).find(m=>m.length>0)??"").replace(/^#+\s*/,"").slice(0,20)||"未命名"}`}function d(f){const h=n5(location.hash);if(!h)return!1;const g=ni({title:u(h.md),body:h.md,themeId:h.themeId});To(g.id),f(g.id,g.body,g.themeId),e.draftIndexTick.value+=1;try{history.replaceState(null,"",location.pathname+location.search)}catch{location.hash=""}const m=h.strippedImages?`（原稿剥离了 ${h.strippedImages} 张内联图，请在编辑端补图）`:"";return e.pingTransient("已从分享链接载入新草稿"+m,3500),!0}return{rendered:i,outlinkStrategy:t,setOutlinkStrategy:s,persistentError:n,copyResult:o,dismissCopyResult:a,handleCopy:l,handleCopyShareLink:c,tryLoadShareFromHash:d}}async function c5(e,t,n){const{width:o,height:r}=n,i=n.scale,s=n.background??"#ffffff",a=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`;try{const l=await u5(a),c=document.createElement("canvas");c.width=o*i,c.height=r*i;const u=c.getContext("2d");if(!u)return{ok:!1,error:"获取 Canvas 2D context 失败（浏览器不支持？）"};u.fillStyle=s,u.fillRect(0,0,c.width,c.height),u.drawImage(l,0,0,c.width,c.height);const d=await d5(c);return d?(Sl(t,d),{ok:!0}):{ok:!1,error:"canvas.toBlob 返回 null（浏览器不支持 PNG 编码？）"}}catch(l){return{ok:!1,error:l?.message??"封面导出失败"}}}function u5(e){return new Promise((t,n)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>t(o),o.onerror=()=>n(new Error("SVG 解码失败")),o.src=e})}function d5(e){return new Promise(t=>{e.toBlob(n=>t(n),"image/png")})}const f5={"wechat-horizontal":{id:"wechat-horizontal",label:"横版主图 900×383",hint:"公众号图文头图",width:900,height:383},"wechat-square":{id:"wechat-square",label:"方版 900×900",hint:"列表缩略图 / 次封面",width:900,height:900},"og-image":{id:"og-image",label:"og:image 1200×630",hint:"社交分享卡片",width:1200,height:630}};function p5(e,t){switch(t){case"wechat-horizontal":return h5(e);case"wechat-square":return m5(e);case"og-image":default:return g5(e)}}function h5(e){const{palette:t}=e,n=900,o=383,r=e.titleFamily??"sans-serif",i=e.titleWeight??700,s=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:60,y1:56,x2:n-60,y2:56,stroke:t.border,strokeWidth:1},{type:"line",x1:60,y1:o-56,x2:n-60,y2:o-56,stroke:t.border,strokeWidth:1},{type:"rect",x:60,y:130,w:4,h:130,fill:t.primary}];return e.kicker&&s.push({type:"text",x:80,y:100,content:e.kicker,fontSize:14,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:3}),s.push({type:"text",x:80,y:185,content:e.title,fontSize:52,fontFamily:r,fontWeight:i,fill:t.text}),e.tagline&&s.push({type:"text",x:80,y:240,content:e.tagline,fontSize:18,fontFamily:r,fontWeight:400,fill:t.textMuted}),Ul(s,t,{x:80,y:o-40,markRight:n-60}),{viewBox:[0,0,n,o],width:n,height:o,primitives:s}}function m5(e){const{palette:t}=e,n=900,o=900,r=e.titleFamily??"sans-serif",i=e.titleWeight??700,s=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:80,y1:80,x2:n-80,y2:80,stroke:t.border,strokeWidth:1},{type:"line",x1:80,y1:o-80,x2:n-80,y2:o-80,stroke:t.border,strokeWidth:1},{type:"rect",x:80,y:o/2-100,w:4,h:200,fill:t.primary}];return e.kicker&&s.push({type:"text",x:100,y:o/2-120,content:e.kicker,fontSize:18,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:4}),s.push({type:"text",x:100,y:o/2-30,content:e.title,fontSize:76,fontFamily:r,fontWeight:i,fill:t.text}),e.tagline&&s.push({type:"text",x:100,y:o/2+30,content:e.tagline,fontSize:22,fontFamily:r,fontWeight:400,fill:t.textMuted}),Ul(s,t,{x:100,y:o-110,markRight:n-80}),{viewBox:[0,0,n,o],width:n,height:o,primitives:s}}function g5(e){const{palette:t}=e,n=1200,o=630,r=e.titleFamily??"sans-serif",i=e.titleWeight??700,s=[{type:"rect",x:0,y:0,w:n,h:o,fill:t.bg},{type:"line",x1:80,y1:80,x2:n-80,y2:80,stroke:t.border,strokeWidth:1},{type:"line",x1:80,y1:o-80,x2:n-80,y2:o-80,stroke:t.border,strokeWidth:1},{type:"rect",x:80,y:200,w:4,h:200,fill:t.primary}];return e.kicker&&s.push({type:"text",x:110,y:150,content:e.kicker,fontSize:20,fontFamily:"monospace",fontWeight:500,fill:t.primary,letterSpacing:4}),s.push({type:"text",x:110,y:290,content:e.title,fontSize:84,fontFamily:r,fontWeight:i,fill:t.text}),e.tagline&&s.push({type:"text",x:110,y:380,content:e.tagline,fontSize:22,fontFamily:r,fontWeight:400,fill:t.textMuted}),Ul(s,t,{x:110,y:o-50,markRight:n-80}),{viewBox:[0,0,n,o],width:n,height:o,primitives:s}}function Ul(e,t,n){["primary","secondary","accent","bgSoft","border","textMuted"].forEach((s,a)=>{e.push({type:"rect",x:n.x+a*20,y:n.y,w:14,h:14,fill:t[s]})}),e.push({type:"text",x:n.markRight,y:n.y+10,content:"wechat-typeset",fontSize:14,fontFamily:"monospace",fontWeight:400,fill:t.textMuted,textAnchor:"end",letterSpacing:2})}function b5(e){const t=J(!1);async function n(){if(!t.value){t.value=!0;try{await e.flush();const s=e.activeTheme.value.tokens.colors;gv(`${e.fileStem()}.html`,e.rendered.value.html,{background:s.bg,color:s.text}),e.pingTransient("已导出 HTML")}catch(s){e.setPersistentError(`HTML 导出失败：${s instanceof Error?s.message:String(s)}`)}finally{t.value=!1}}}function o(){if(!t.value){t.value=!0;try{bv(`${e.fileStem()}.md`,e.md.value),e.pingTransient("已导出 Markdown")}finally{t.value=!1}}}async function r(){if(!t.value){t.value=!0;try{e.pingTransient("长图渲染中…",4e3),await e.flush(),await en();const s=e.getPreviewBody();if(!s){e.setPersistentError("长图导出失败：未找到预览节点");return}const a=await yv(s,`${e.fileStem()}.png`,{background:e.activeTheme.value.tokens.colors.bg});a.ok?e.pingTransient("已导出长图"):e.setPersistentError(`长图导出失败：${a.error??"未知错误"}`)}catch(s){e.setPersistentError(`长图导出失败：${s instanceof Error?s.message:String(s)}`)}finally{t.value=!1}}}async function i(s){if(!t.value){t.value=!0;try{const a=f5[s];e.pingTransient(`正在生成${a.label}…`,2500);const l=e.activeTheme.value,c=v5(l),u=y5(e.md.value),d=p5({palette:c,title:u||l.name,tagline:l.description,kicker:l.id.toUpperCase().replace(/-/g," ")},s),f=hm(d,l.tokens),h=`${e.fileStem()}-cover-${s}.png`,g=await c5(f,h,{width:a.width,height:a.height,scale:2,background:c.bg});g.ok?e.pingTransient(`已导出${a.label}`):e.setPersistentError(`封面导出失败：${g.error??"未知错误"}`)}finally{t.value=!1}}}return{doExportHtml:n,doExportMd:o,doExportImage:r,doExportCover:i,isExporting:t}}function y5(e){const t=e.split(`
`);for(const n of t){const o=n.trim();if(!o)continue;const r=/^#+\s+(.+)$/.exec(o);return r?r[1].trim().slice(0,40):o.slice(0,40)}return""}function v5(e){const t=e.tokens.colors;return{primary:t.primary,secondary:t.secondary,accent:t.accent,bg:t.bg,bgSoft:t.bgSoft,bgMuted:t.bgMuted,text:t.text,textMuted:t.textMuted,textInverse:t.textInverse,border:t.border,code:t.code}}function w5(e){function t(n){const o=n.ctrlKey||n.metaKey,i=!!n.target?.closest('input, textarea, [contenteditable="true"], .cm-editor');if(o){const s=n.key.toLowerCase();if(s==="k"&&!n.shiftKey){n.preventDefault(),e.openCommand();return}if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),e.copy();return}if(s==="s"&&!n.shiftKey){n.preventDefault(),e.save();return}if(s==="c"&&n.shiftKey){n.preventDefault(),e.toggleCustomizer();return}if(s==="d"&&n.shiftKey){n.preventDefault(),e.toggleDrafts();return}if(s==="p"&&n.shiftKey){n.preventDefault(),e.toggleComponents();return}if(s==="h"&&n.shiftKey){n.preventDefault(),e.exportHtml();return}if(s==="m"&&n.shiftKey){n.preventDefault(),e.exportMd();return}}if(n.key==="?"&&!i){n.preventDefault(),e.openHelp();return}n.key==="Escape"&&(e.closeCommand()||e.closeHelp()||e.closeDrawers())}zt(()=>{window.addEventListener("keydown",t)}),yt(()=>{window.removeEventListener("keydown",t)})}const Ha={"academic-frontier":`---
title: 学术前沿主题演示稿
---

# 关于对比学习中表征坍缩的一个新观察

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

:::: timeline

::: timeline-item year=2020
SimCLR 与 MoCo 同期发表，对比学习进入爆发期；负样本数量被视作核心超参。
:::

::: timeline-item year=2022
BYOL 与 Barlow Twins 展示"无负样本"路径，但坍缩机制的理论解释仍缺失。
:::

::: timeline-item year=2024
温度系数 *τ* 与坍缩的关系开始在若干 workshop 论文中被独立观察到；本文是首篇系统性实证。
:::

::::

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

[^1]: *τ*-adaptive 调度在推理阶段不引入任何额外计算：调度仅在训练中运行，推理时 τ 已固定为 *τ**。

[^2]: "批次越大越好"的观点主要来自 Chen et al. (2020) 的 Figure 9，其实验条件固定 τ = 0.07。本文结果在 τ 自适应条件下不再成立。
`,brutalist:`---
title: 粗野主义主题演示稿
---

# 粗野主义 · brutalist 主题示例

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

:::: compare // 算法 vs 纸本
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
::::

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
`,"business-finance":`---
title: 硬核财经主题演示稿
---

::: cover 本期议题 · 消费信贷利率结构性下行
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
`,"commerce-pulse":`---
title: 电商脉动主题演示稿
---

::: announcement 限时特卖 · 距结束仅剩 8 小时
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
`,"data-brief":`---
title: 数据简报主题演示稿
---

::: masthead 数字阅读观察 issue="2026Q1" date="2026.04.15"
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
`,default:`---
title: 默认主题演示稿
---

# 工具的工具 · 关于写作辅助软件的克制观

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
`,"editorial-mook":`---
title: 编辑刊主题演示稿
---

::: masthead slow reading issue="05" date="2026.05.15"
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

:::: compare 一場關於書店的對話
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
::::

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
`,"edu-classroom":`---
title: 教室课堂主题演示稿
---

# 如何给孩子讲"光合作用"

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
`,"industry-observer":`---
title: 行业观察主题演示稿
---

::: cover 专题头 · 技术并不淘汰公司 issue=023 date=2025-04-20 kind=周刊
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
`,"late-night-vinyl":`---
title: 深夜电台主题演示稿
---

# 深夜电台 · late-night-vinyl 主题示例

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

:::: compare 白天 vs 深夜
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
::::

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
`,"life-aesthetic":`---
title: 慢生活主题演示稿
---

# 梅雨季的厨房 · 把潮湿过成一种腔调

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

`,"literary-humanism":`---
title: 人文札记主题演示稿
---

# 一本书与它的旁批者

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
title: 公文公报主题演示稿
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
`,"people-story":`---
title: 人物特稿主题演示稿
---

::: cover 林若华
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
`,"swiss-grid":`---
title: 苏黎世主题演示稿
---

::: key-number NEUE GRAFIK REVUE value="Nº09"
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
`,"tech-explainer":`---
title: 文档白昼主题演示稿
---

# 用 TypeScript 从零实现 JWT 认证

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
`,"tech-geek":`---
title: 极客夜行主题演示稿
---

# 极客夜行 · 工程随笔 Vol.03

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

[^1]: 数据来源：Google SRE Book Chapter 15、Stripe Engineering Blog（2019）、Amazon Builder's Library（2020）。三处来源的模板骨架在"时间轴精度 / 根因问题 / 可拒绝行动项"三点上高度收敛。

[^2]: 统计周期 2024-10 至 2026-03，覆盖 3 家公司 47 份 postmortem，其中 SaaS 产品类 29 份、基础设施类 18 份。有 runbook / 无 runbook 的分组依据是事故发生时 on-call 能否在 2 分钟内定位操作手册。
`,"youth-zine":`---
title: 青年潮志主题演示稿
---

::: author
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
`};function zl(e){return Ha[e]??Ha.default??""}async function S5(e){const{REFERENCE_BY_THEME:t}=await An(async()=>{const{REFERENCE_BY_THEME:n}=await import("./_references-Dlthq1pd.js");return{REFERENCE_BY_THEME:n}},[]);return t[e]??t.default??""}async function k5(){const{SHOWCASE_MARKDOWN:e}=await An(async()=>{const{SHOWCASE_MARKDOWN:t}=await import("./_showcase-5x7JXmnw.js");return{SHOWCASE_MARKDOWN:t}},[]);return e}function x5(e){const t=e.lockMs??180;let n=0,o=null;function r(s){o==="preview"&&Date.now()-n<t||(o="editor",n=Date.now(),e.previewRef.value?.scrollToRatio(s))}function i(s){o==="editor"&&Date.now()-n<t||(o="preview",n=Date.now(),e.editorRef.value?.scrollToRatio?.(s))}return{onEditorScroll:r,onPreviewScroll:i}}function _5(e){Yt(bh,e)}function C5(e,t){if(!Zt.value)return;const n=Zt.value;Zt.value=null,t("已切换主题并重置自定义配色",()=>{Va=!0,gt.value=e,Zt.value=n})}function $5(e){const t=Re.value.replace(/\r\n/g,`
`);Object.values(Ha).some(o=>o.replace(/\r\n/g,`
`)===t)&&(Re.value=zl(e))}function E5(e,t,n){t.value&&(wl(t.value,{themeId:e}),n.value+=1)}let Va=!1;function T5(e){Pe(gt,(t,n)=>{if(_5(t),Va){Va=!1;return}t!==n&&(C5(n,e.showUndo),e.fileArticleActive?.value||$5(t),E5(t,e.activeDraftId,e.draftIndexTick))})}function A5(e){const{modKey:t}=e;return te(()=>{e.draftIndexTick.value;const n=[];return n.push({id:"copy",title:"复制为微信富文本",group:"操作",shortcut:`${t} ↵`,run:e.handleCopy}),n.push({id:"save",title:"保存当前草稿",group:"操作",shortcut:`${t} S`,run:e.handleSave}),n.push({id:"clear",title:"清空正文",group:"操作",run:e.handleClear}),n.push({id:"load-sample",title:"载入当前主题示例",group:"操作",run:e.handleLoadSample}),n.push({id:"load-reference",title:"载入当前主题组件参考",group:"操作",keywords:"参考 reference 组件 全集",run:e.handleLoadReference}),n.push({id:"load-showcase",title:"载入全功能展示",group:"操作",keywords:"showcase 全功能 全部容器 全部变体 高级 advanced",run:e.handleLoadShowcase}),n.push({id:"save-selection",title:"保存选区为组件",group:"操作",run:e.handleSaveSelection}),n.push({id:"fix-zh-typo",title:"一键修复中文排版",group:"操作",run:e.handleFixZhTypo}),n.push({id:"toggle-drafts",title:e.drawerStates.value.drafts?"关闭草稿抽屉":"打开草稿抽屉",group:"视图",shortcut:`${t} ⇧ D`,run:()=>e.toggleLeft("drafts")}),n.push({id:"toggle-components",title:e.drawerStates.value.components?"关闭组件库":"打开组件库",group:"视图",shortcut:`${t} ⇧ P`,run:()=>e.toggleRight("components")}),n.push({id:"toggle-customizer",title:e.drawerStates.value.customizer?"关闭自定义配色":"打开自定义配色",group:"视图",shortcut:`${t} ⇧ C`,run:()=>e.toggleRight("customizer")}),n.push({id:"toggle-checklist",title:e.drawerStates.value.checklist?"关闭发文清单":"打开发文清单",group:"视图",run:()=>e.toggleRight("checklist")}),n.push({id:"open-help",title:"快捷键与帮助",group:"视图",shortcut:"?",run:()=>e.ui.helpOpen=!0}),n.push({id:"export-html",title:"导出 HTML",group:"导出",shortcut:`${t} ⇧ H`,run:e.doExportHtml}),n.push({id:"export-md",title:"导出 Markdown",group:"导出",shortcut:`${t} ⇧ M`,run:e.doExportMd}),n.push({id:"export-image",title:"导出全文长图",group:"导出",run:e.doExportImage}),n.push({id:"export-cover-h",title:"导出封面 · 横版 900×383",group:"导出",keywords:"封面 cover 公众号",run:e.doExportCoverHorizontal}),n.push({id:"export-cover-s",title:"导出封面 · 方版 900×900",group:"导出",keywords:"封面 cover 公众号 方版 缩略图",run:e.doExportCoverSquare}),n.push({id:"copy-share-link",title:"复制分享链接",group:"导出",run:e.handleCopyShareLink}),id.forEach(o=>{n.push({id:`theme-${o.id}`,title:`主题 · ${o.name}`,group:"主题",keywords:`${o.id} theme`,run:()=>{e.handleThemeChange?e.handleThemeChange(o.id):gt.value=o.id}})}),n.push({id:"new-draft",title:"新建草稿",group:"草稿",run:()=>{const o=ni({title:"新草稿",body:`# 新草稿
`,themeId:gt.value});e.handleSelectDraft(o.id),e.draftIndexTick.value+=1}}),Eo().slice(0,30).forEach(o=>{n.push({id:`draft-${o.id}`,title:`草稿 · ${o.title||"未命名"}`,group:"草稿",keywords:o.themeId,run:()=>e.handleSelectDraft(o.id)})}),n})}function I5(e){const{base:t,seed:n}=e,o=Mp(n),r={...t.tokens,colors:{...o,...t.tokens.colors.preBg?{preBg:t.tokens.colors.preBg}:{},...t.tokens.colors.preText?{preText:t.tokens.colors.preText}:{}}},i=e.variant??t.svgVariant??"geometric",s=mm(t.tokens),a=gm(t.tokens),l=bm(t.tokens),c=ym(t.tokens),u=xi(t.elements,s),d=xi(t.containers,a),f=xi(t.inline,l),h=xi(t.innerStyles,c);return vm({id:e.id??`${t.id}--custom`,name:e.name??`${t.name} · 自定义`,description:`基于 ${t.name} 的自定义配色`,author:t.author,preview:t.preview,baseTheme:t.baseTheme,variant:i,tokens:r,elements:_i(u,t.tokens.colors,o),containers:_i(d,t.tokens.colors,o),inline:_i(f,t.tokens.colors,o),innerStyles:_i(h,t.tokens.colors,o),variants:t.variants,templates:t.templates,decorations:t.decorations,capabilities:t.capabilities,kickers:t.kickers})}function xi(e,t){const n={};for(const[o,r]of Object.entries(e)){const i=t[o]??{},s={};for(const[a,l]of Object.entries(r))i[a]!==l&&(s[a]=l);Object.keys(s).length>0&&(n[o]=s)}return n}function _i(e,t,n){const o=M5(t,n),r={};for(const[i,s]of Object.entries(e)){const a={};for(const[l,c]of Object.entries(s))if(typeof c=="string"){let u=c;for(const[d,f]of o)u=O5(u,d,f);a[l]=u}else a[l]=c;r[i]=a}return r}function R5(e){const t=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e.trim());return t?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:e}function M5(e,t){const n=[[e.primary,t.primary],[e.secondary,t.secondary],[e.accent,t.accent],[e.bg,t.bg],[e.bgSoft,t.bgSoft],[e.bgMuted,t.bgMuted],[e.text,t.text],[e.textMuted,t.textMuted],[e.textInverse,t.textInverse],[e.border,t.border],[e.code,t.code],[e.status.tip.accent,t.status.tip.accent],[e.status.tip.soft,t.status.tip.soft],[e.status.warning.accent,t.status.warning.accent],[e.status.warning.soft,t.status.warning.soft],[e.status.info.accent,t.status.info.accent],[e.status.info.soft,t.status.info.soft],[e.status.danger.accent,t.status.danger.accent],[e.status.danger.soft,t.status.danger.soft]];e.preBg&&t.preBg&&n.push([e.preBg,t.preBg]),e.preText&&t.preText&&n.push([e.preText,t.preText]);const o=[];for(const[i,s]of n){o.push([i,s]);const a=R5(i);a!==i&&o.push([a,s])}o.sort((i,s)=>s[0].length-i[0].length);const r=new Set;return o.filter(([i])=>{const s=i.toLowerCase();return r.has(s)?!1:(r.add(s),!0)})}function O5(e,t,n){if(!t)return e;const o=e.toLowerCase(),r=t.toLowerCase();let i="",s=0;for(;s<e.length;)o.slice(s,s+r.length)===r?(i+=n,s+=r.length):(i+=e[s],s+=1);return i}function L5(e){const{showUndo:t,pingTransient:n,editorRef:o,paletteRef:r,ui:i}=e;function s(){if(!Re.value)return;const m=Re.value;Re.value="",t("已清空正文",()=>{Re.value=m})}function a(){const m=zl(gt.value);if(Re.value===m)return;const w=Re.value;Re.value=m,w.trim()?t("已载入示例，原正文可撤销",()=>{Re.value=w}):n("已载入示例")}async function l(){const m=await S5(gt.value);if(!m||Re.value===m){n("本主题暂无组件参考");return}const w=Re.value;Re.value=m,w.trim()?t("已载入组件参考，原正文可撤销",()=>{Re.value=w}):n("已载入组件参考")}async function c(){const m=await k5();if(!m||Re.value===m){n("全功能展示稿为空");return}const w=Re.value;Re.value=m,w.trim()?t("已载入全功能展示，原正文可撤销",()=>{Re.value=w}):n("已载入全功能展示")}function u(){const m=Re.value;if(!m){n("正文为空");return}const{fixed:w,ranges:k}=J1(m);if(k.length===0){n("中文排版已干净");return}Re.value=w,t(`已修正 ${k.length} 处中文排版`,()=>{Re.value=m}),requestAnimationFrame(()=>{o.value?.highlightZhFix?.(k)})}function d(m){const w=pa(gt.value);Zt.value=I5({base:w,seed:m,id:`${w.id}--custom`,name:`${w.name} · 自定义`})}function f(){Zt.value&&(Zt.value=null,n("已还原主题配色"))}function h(m){const w=o.value;w&&typeof w.insertAtCursor=="function"?w.insertAtCursor(m):Re.value=`${Re.value}${Re.value.endsWith(`
`)?"":`
`}
${m}`,n("已插入")}function g(){const w=o.value?.getSelectedText?.()??"";if(!w.trim()){n("先在编辑器中选中一段 markdown");return}i.rightSlot!=="components"&&(i.rightSlot="components"),requestAnimationFrame(()=>r.value?.openSaveDialog?.(w))}return{handleClear:s,handleLoadSample:a,handleLoadReference:l,handleLoadShowcase:c,handleFixZhTypo:u,handleApplyPalette:d,handleResetPalette:f,handleInsertTemplate:h,handleSaveSelection:g}}function N5(e){const t=jl(Vl,e);if(!t)return{ok:!1,reason:"parse"};const n=t.component,o=Fl({name:n.name,description:n.description,kind:n.kind,variantId:n.variantId,markdownSnippet:n.markdownSnippet,thumbnailSvg:n.thumbnailSvg});return o.ok?{ok:!0,entryId:o.entry.id,name:o.entry.name}:{ok:!1,reason:o.reason==="validation"?"validation":"parse",message:o.reason==="validation"?"导入的组件未通过校验（可能含未注册容器 / variant）":"导入失败"}}function D5(e){return jl(Vl,e)}function P5(e){const t=location.hash,n=D5(t);if(!n)return!1;const o=window.confirm(`检测到分享链接里包含组件「${n.component.name}」。
导入到我的组件库吗？

（${n.component.description||"无描述"}）`);try{history.replaceState(null,"",location.pathname+location.search)}catch{location.hash=""}if(!o)return!1;const r=N5(t);return r.ok?(e?.(),!0):(r.message&&window.alert(r.message),!1)}function B5(e){sy(),zt(()=>{const t=dn(bh);t&&(gt.value=t);const n=dn(ia);if(n){const r=Number.parseInt(n,10);Number.isFinite(r)&&r>0&&(so.value=r)}P5(e.onComponentImported),e.flushDraftSave(),e.tryLoadShareFromHash((r,i,s)=>{e.activeDraftId.value=r,Re.value=i,gt.value=s})||e.initActiveDraft(gt.value),window.addEventListener("pagehide",e.flushDraftSave)}),Pe(e.hasOpenDrawer,t=>{document.body.classList.toggle("drawer-scroll-lock",t&&cA())}),Pe(so,t=>{t==null?Yt(ia,""):Yt(ia,String(Math.round(t)))}),yt(()=>{window.removeEventListener("pagehide",e.flushDraftSave),e.flushDraftSave(),document.body.classList.remove("drawer-scroll-lock")})}const F5=407,j5=6,H5=8,Mh=320;function V5(e){const t=J(window.innerWidth),n=J(null);let o=null,r;function i(l){const c=l.getBoundingClientRect().width;c>0&&(n.value=c)}function s(){t.value=window.innerWidth,e.container?.value&&i(e.container.value)}zt(()=>{window.addEventListener("resize",s),e.container&&(typeof ResizeObserver<"u"&&(o=new ResizeObserver(l=>{const c=l.find(u=>u.target===e.container?.value);c&&c.contentRect.width>0&&(n.value=c.contentRect.width)})),r=Pe(e.container,l=>{o?.disconnect(),n.value=null,l&&(i(l),o?.observe(l))},{immediate:!0,flush:"post"}))});const a=te(()=>Math.max(Mh,(n.value??t.value)-F5-j5-H5));return Pe(a,l=>{e.editorWidth.value!==null&&e.editorWidth.value>l&&(e.editorWidth.value=l)},{immediate:!0}),yt(()=>{window.removeEventListener("resize",s),r?.(),o?.disconnect()}),{editorMaxWidth:a,viewportW:t}}const U5={class:"library-sidebar","aria-label":"文章库"},z5={class:"workspace"},W5={class:"document-bar"},K5={class:"document-heading"},q5={class:"document-meta"},G5=["title"],Y5={class:"document-stats"},J5=["title"],Z5={class:"document-actions"},Q5=["aria-pressed"],X5=["aria-expanded"],e6=["data-stage","data-mobile-tab"],t6={class:"pane pane-preview","aria-label":"微信文章预览"},n6={key:0,class:"inspector-tabs","aria-label":"排版工具"},o6={class:"inspector-body"},r6={key:0,class:"mobile-tabs","aria-label":"写作视图"},i6=["aria-pressed"],s6=["aria-pressed"],a6={class:"file-conflict-actions"},l6=["disabled"],c6=["disabled"],u6={key:0,role:"status"},d6={key:1,role:"status"},fa="wechat-typeset:onboard:dismissed",Ci="图片仍在处理中，请等待完成后再保存、复制或导出。",f6=Ke({__name:"App",setup(e){const t=Ro(()=>An(()=>import("./PublishChecklist-cUTWzQJp.js"),__vite__mapDeps([14,2,1,3,4,15]))),n=Ro(()=>An(()=>import("./WritingStyleControl-CkZVoOs-.js"),__vite__mapDeps([16,1,2,3,4,17]))),o=Ro(()=>An(()=>import("./ThemeInspector-D2JV1Cx7.js"),__vite__mapDeps([18,1,2,3,4,19]))),r=J(null),i=J(null),s=J(null),a=J(null),{ui:l,drawerStates:c,toggleLeft:u,toggleRight:d,closeAll:f}=VA(),h=J("write"),g=J(!0),m=J(!1),w=J(null);l.leftSlot=window.innerWidth>900?"drafts":null;const k=te(()=>!m.value&&(h.value!=="write"||l.rightSlot!==null)),x=te(()=>({...c.value,components:k.value&&l.rightSlot==="components",customizer:k.value&&l.rightSlot==="customizer",checklist:k.value&&h.value==="publish",personaStudio:k.value&&l.rightSlot==="persona-studio"}));function L(pe){h.value=pe,l.rightSlot=pe==="publish"?"checklist":null,m.value=!1,io.value=null,Sn.value=pe==="write"?"editor":"preview",window.innerWidth<=900&&(l.leftSlot=null)}function $(pe){Sn.value=pe,pe==="preview"&&(g.value=!0),m.value=!0}function N(pe){if(pe==="checklist"){h.value==="publish"&&k.value?m.value=!0:L("publish");return}h.value==="publish"&&(h.value="typeset"),m.value=!1,d(pe)}Pe(()=>l.rightSlot,pe=>{pe&&(m.value=!1),pe==="checklist"?h.value="publish":pe&&h.value==="publish"&&(h.value="typeset"),io.value=null}),Pe([h,m],()=>{io.value=null});const D=J(!1),_=J(0),{activeDraftId:v,draftIndexTick:S,displayedSavingLabel:I,displayedSavingState:C,currentDraftTitle:F,undo:E,initActiveDraft:j,handleSave:R,handleSelectDraft:B,handleDeleteDraftRequest:V,flushDraftSave:z,pingTransient:fe,showUndo:je,onUndo:Ne,onUndoExpire:Fe,fileStem:He}=WA({md:Re,baseThemeId:gt,getSample:zl}),Te=KA({md:Re,baseThemeId:gt,beforeOpen:()=>D.value||(z(),C.value==="error")?!1:(v.value=null,Fe(),!0)}),{activeArticle:Ye,conflict:Je,busy:Pt}=Te,pt=YA({md:Re,directory:te(()=>Ye.value&&Te.permitted.value?Te.library.value?.dir??null:null)});async function mn(pe){L("write"),await en(),r.value?.goToLine(pe)}const wt=te(()=>Ye.value?Te.title.value:F.value),gn=J(null);Pe(Je,pe=>{pe?gn.value?.showModal():gn.value?.close()},{flush:"post"});function y(pe){io.value=null,gt.value=pe,Ye.value&&(Re.value=d1(Re.value,pe))}function b(pe){D.value||Te.leave()&&B(pe)}function T(pe,Z){V(pe,Z,Te.leave)}async function H(){if(D.value)return;const pe=!!Ye.value;await Te.chooseLibrary(),pe&&!Ye.value&&j(gt.value)}const W=J([]),q=te(()=>(Ye.value?.dir,Te.revision.value,{md:Re.value,theme:ki.value})),{rendered:ie,flush:ne}=HA(q,{delayMs:80,async prepareInput(pe){const Z=Ye.value?.dir;if(pe===q.value&&(W.value=[]),!Z)return W.value=[],pe;const ye=await D1(pe.md,Z);return pe===q.value&&Z===Ye.value?.dir&&(W.value=ye.missing),{...pe,md:ye.md}}}),{rendered:X,outlinkStrategy:Y,setOutlinkStrategy:ge,persistentError:oe,copyResult:ce,dismissCopyResult:ve,handleCopy:Ae,handleCopyShareLink:Be,tryLoadShareFromHash:Ve}=l5({md:Re,rendered:ie,flush:ne,baseThemeId:gt,activeDraftId:v,draftIndexTick:S,pingTransient:fe}),{doExportHtml:rt,doExportMd:ct,doExportImage:Wt,doExportCover:Kt}=b5({md:Re,rendered:X,flush:ne,activeTheme:ki,getPreviewBody:()=>i.value?.getIframe?.()?.contentDocument?.querySelector(".phone-viewport")??null,fileStem:()=>He(),pingTransient:fe,setPersistentError:pe=>{oe.value=pe}});function $t(pe){return(...Z)=>{if(D.value){oe.value=Ci;return}return oe.value===Ci&&(oe.value=null),pe(...Z)}}Pe(D,pe=>{pe||(_.value+=1),!pe&&oe.value===Ci&&(oe.value=null)});const On=$t(()=>Ye.value?Te.save():R()),St=$t(Te.overwrite),Et=$t(Ae),ho=$t(Be),bn=$t(rt),Do=$t(ct),br=$t(async()=>{const pe={preview:g.value,tab:Sn.value,collapsed:m.value};g.value=!0,Sn.value="preview",m.value=!0;let Z,ye="";try{await en(),await ne(),Z=i.value?.getIframe()?.contentDocument?.querySelector(".phone-viewport"),Z&&(ye=Z.style.zoom,Z.style.zoom="1"),await Wt()}catch(wr){oe.value=`长图导出失败：${wr instanceof Error?wr.message:String(wr)}`}finally{Z&&(Z.style.zoom=ye),g.value=pe.preview,Sn.value=pe.tab,m.value=pe.collapsed}}),Po=$t(Kt);T5({showUndo:je,activeDraftId:v,draftIndexTick:S,fileArticleActive:te(()=>!!Ye.value)});const{onEditorScroll:si,onPreviewScroll:Zn}=x5({editorRef:r,previewRef:i}),{handleClear:M,handleLoadSample:K,handleLoadReference:re,handleLoadShowcase:ke,handleFixZhTypo:it,handleApplyPalette:st,handleResetPalette:de,handleInsertTemplate:le,handleSaveSelection:we}=L5({showUndo:je,pingTransient:fe,editorRef:r,paletteRef:a,ui:l});async function ut(pe){L("write"),await en(),le(pe)}function lt(){if(D.value||!Te.leave())return;const pe=ni({title:"新草稿",body:`# 新草稿
`,themeId:gt.value});b(pe.id),S.value+=1}const{editorMaxWidth:mo}=V5({editorWidth:so,container:w}),go=J(dn(fa)==="1");function Bo(){go.value=!0,Yt(fa,"1")}function Ss(){cs(fa),go.value=!1,l.helpOpen=!1,l.commandOpen=!1,f()}const yr=te(()=>!go.value&&!l.commandOpen&&!l.helpOpen&&!Ye.value&&l.rightSlot===null),ai=te(()=>l.leftSlot!==null||l.rightSlot!==null||l.commandOpen||l.helpOpen);function ks(pe){pe==="drafts"?u("drafts"):N(pe==="personaStudio"?"persona-studio":pe)}function xs(pe){switch(pe){case"copy":return Et();case"clear":return M();case"loadSample":return K();case"loadReference":return re();case"loadShowcase":return ke();case"saveSelection":return we();case"fixZhTypo":return it();case"exportHtml":return bn();case"exportMd":return Do();case"exportImage":return br();case"exportCoverHorizontal":return Po("wechat-horizontal");case"exportCoverSquare":return Po("wechat-square");case"copyShareLink":return ho();case"openCommand":l.commandOpen=!0;return;case"openHelp":l.helpOpen=!0;return;case"dismissError":oe.value=null;return}}const vr=A5({modKey:Ko,ui:l,drawerStates:x,toggleLeft:u,toggleRight:N,draftIndexTick:S,activeDraftId:v,handleSave:On,handleSelectDraft:b,handleThemeChange:y,handleCopy:Et,handleCopyShareLink:ho,doExportHtml:bn,doExportMd:Do,doExportImage:br,doExportCoverHorizontal:()=>Po("wechat-horizontal"),doExportCoverSquare:()=>Po("wechat-square"),handleClear:M,handleLoadSample:K,handleLoadReference:re,handleLoadShowcase:ke,handleSaveSelection:we,handleFixZhTypo:it});return w5({openCommand:()=>{l.commandOpen=!0},copy:Et,save:On,toggleCustomizer:()=>N("customizer"),toggleDrafts:()=>u("drafts"),toggleComponents:()=>N("components"),exportHtml:bn,exportMd:Do,openHelp:()=>{l.helpOpen=!0},closeCommand:()=>l.commandOpen?(l.commandOpen=!1,!0):!1,closeHelp:()=>l.helpOpen?(l.helpOpen=!1,!0):!1,closeDrawers:()=>k.value?(m.value=!0,!0):l.leftSlot!==null||l.rightSlot!==null?(f(),!0):!1}),B5({activeDraftId:v,initActiveDraft:j,flushDraftSave:z,tryLoadShareFromHash:Ve,hasOpenDrawer:ai}),(pe,Z)=>(O(),P("div",{class:$e(["app",{"drawer-open":ai.value}])},[ot(p("aside",U5,[Me(So,{"fallback-title":"文章库加载失败",onClose:Z[2]||(Z[2]=ye=>A(l).leftSlot=null)},{default:Jt(()=>[Me(vw,{"active-id":A(v),"draft-index-tick":A(S),"library-supported":A(Te).supported,"library-name":A(Te).library.value?.dir.name,"library-permitted":A(Te).permitted.value,articles:A(Te).articles.value,"active-article":A(Ye)?.name,"library-busy":A(Pt)||D.value,"library-error":A(Te).error.value,onConnectLibrary:A(Te).connect,onChooseLibrary:H,onSelectArticle:A(Te).open,onCreateArticle:A(Te).create,onSelect:b,onClose:Z[0]||(Z[0]=ye=>A(l).leftSlot=null),onRequestDelete:T,onRefresh:Z[1]||(Z[1]=ye=>S.value++)},null,8,["active-id","draft-index-tick","library-supported","library-name","library-permitted","articles","active-article","library-busy","library-error","onConnectLibrary","onSelectArticle","onCreateArticle"])]),_:1})],512),[[_o,A(l).leftSlot==="drafts"]]),p("div",z5,[Me(nv,{ref_key:"toolbarRef",ref:s,stage:h.value,"draft-title":wt.value,"active-draft-id":A(v),"draft-index-tick":A(S),"word-count":A(X).wordCount,"reading-time":A(X).readingTime,"saving-state":A(Ye)?A(Te).error.value?"error":A(Pt)?"saving":A(Te).dirty.value?"unsaved":"saved":A(C),"saving-label":A(Ye)?A(Te).savingLabel.value:A(I),error:A(oe),"theme-id":A(gt),"has-custom-color":A(Zt)!==null,drawer:x.value,"outlink-strategy":A(Y),"ui-theme":A(rr),"onUpdate:stage":L,onSave:A(On),"onUpdate:themeId":y,"onUpdate:outlinkStrategy":A(ge),"onUpdate:uiTheme":Z[3]||(Z[3]=ye=>rr.value=ye),onHoverTheme:Z[4]||(Z[4]=ye=>io.value=ye),onToggle:ks,onAction:xs,onSelectDraft:b,onNewDraft:lt},null,8,["stage","draft-title","active-draft-id","draft-index-tick","word-count","reading-time","saving-state","saving-label","error","theme-id","has-custom-color","drawer","outlink-strategy","ui-theme","onSave","onUpdate:outlinkStrategy"]),p("div",W5,[A(l).leftSlot!=="drafts"?(O(),P("button",{key:0,class:"quiet-button library-reopen",type:"button",onClick:Z[5]||(Z[5]=ye=>A(u)("drafts"))},"文章库")):ae("",!0),p("div",K5,[p("div",q5,[p("span",{class:"document-location",title:A(Ye)?A(Ye).name+"/article.md":"仅保存在当前浏览器"},U(A(Ye)?A(Te).library.value?.dir.name+" / article.md":"个人工作区 / 浏览器草稿"),9,G5),p("span",Y5,U(A(X).wordCount.toLocaleString())+" 字",1)]),p("h1",{title:wt.value},U(wt.value),9,J5)]),p("div",Z5,[h.value!=="typeset"?(O(),nt(A(n),{key:0,config:A(pt).config.value,"selected-id":A(pt).selectedId.value,"can-edit":A(pt).canEdit.value,loading:A(pt).loading.value,saving:A(pt).saving.value,error:A(pt).error.value,onSelect:A(pt).select,onSave:A(pt).save,onReload:A(pt).reload},null,8,["config","selected-id","can-edit","loading","saving","error","onSelect","onSave","onReload"])):ae("",!0),h.value==="write"?(O(),P("button",{key:1,class:"quiet-button preview-toggle",type:"button","aria-pressed":!g.value,onClick:Z[6]||(Z[6]=ye=>g.value=!g.value)},[Z[38]||(Z[38]=p("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},[p("path",{d:"M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"})],-1)),We(" "+U(g.value?"专注写作":"显示预览"),1)],8,Q5)):ae("",!0),h.value!=="write"||A(l).rightSlot?(O(),P("button",{key:2,class:"quiet-button",type:"button","aria-expanded":!m.value,onClick:Z[7]||(Z[7]=ye=>m.value=!m.value)},U(m.value?"展开工具":"收起工具"),9,X5)):ae("",!0)])]),p("main",{class:$e(["main",{"has-inspector":k.value,"focus-writing":!g.value}]),"data-stage":h.value,"data-mobile-tab":A(Sn)},[p("div",{ref_key:"workAreaRef",ref:w,class:"work-area"},[ot(p("section",{class:$e(["pane pane-editor",{"fixed-width":A(so)!==null&&g.value}]),style:Qt(A(so)!==null&&g.value?{"--editor-w":A(so)+"px"}:void 0),"aria-label":"Markdown 编辑器"},[Me(py,{ref_key:"editorRef",ref:r,modelValue:A(Re),"onUpdate:modelValue":Z[8]||(Z[8]=ye=>bt(Re)?Re.value=ye:null),"image-directory":A(Ye)?.dir,"document-id":A(Ye)?.name||A(v)||"",onImageBusy:Z[9]||(Z[9]=ye=>D.value=ye),onScroll:A(si)},null,8,["modelValue","image-directory","document-id","onScroll"]),yr.value&&h.value==="write"?(O(),nt(wA,{key:0,onDismiss:Bo,onOpenHelp:Z[10]||(Z[10]=ye=>{A(l).helpOpen=!0,Bo()})})):ae("",!0)],6),[[_o,h.value==="write"]]),ot(Me(iv,{width:A(so),min:A(Mh),max:A(mo),"onUpdate:width":Z[11]||(Z[11]=ye=>so.value=ye)},null,8,["width","min","max"]),[[_o,h.value==="write"&&g.value]]),ot(p("section",t6,[Me(_y,{ref_key:"previewRef",ref:i,html:A(X).html,"patch-log":A(X).patchLog,onScroll:A(Zn)},null,8,["html","patch-log","onScroll"])],512),[[_o,h.value!=="write"||g.value]])],512),ot(p("aside",{class:$e(["context-inspector",{"inspector-wide":A(l).rightSlot==="persona-studio","publish-inspector":h.value==="publish"}]),"aria-label":"当前任务工具"},[h.value!=="publish"?(O(),P("nav",n6,[p("button",{type:"button",class:$e({active:!A(l).rightSlot||A(l).rightSlot==="persona-studio"}),onClick:Z[12]||(Z[12]=ye=>A(l).rightSlot=null)},"主题",2),p("button",{type:"button",class:$e({active:A(l).rightSlot==="components"}),onClick:Z[13]||(Z[13]=ye=>A(l).rightSlot="components")},"组件",2),p("button",{type:"button",class:$e({active:A(l).rightSlot==="customizer"}),onClick:Z[14]||(Z[14]=ye=>A(l).rightSlot="customizer")},"配色",2)])):ae("",!0),p("div",o6,[h.value==="publish"?(O(),nt(So,{key:0,"fallback-title":"发文清单加载失败",onClose:Z[17]||(Z[17]=ye=>m.value=!0)},{default:Jt(()=>[Me(A(t),{md:A(Re),"onUpdate:md":Z[15]||(Z[15]=ye=>bt(Re)?Re.value=ye:null),"missing-images":W.value,"image-directory":A(Ye)?.dir,"image-revision":_.value+A(Te).revision.value,"writing-style":A(pt).activeStyle.value,onGotoLine:mn,onClose:Z[16]||(Z[16]=ye=>m.value=!0)},null,8,["md","missing-images","image-directory","image-revision","writing-style"])]),_:1})):A(l).rightSlot==="components"?(O(),nt(So,{key:1,"fallback-title":"组件库加载失败",onClose:Z[19]||(Z[19]=ye=>A(l).rightSlot=null)},{default:Jt(()=>[Me(NT,{ref_key:"paletteRef",ref:a,theme:A(ki),onInsert:ut,onClose:Z[18]||(Z[18]=ye=>A(l).rightSlot=null)},null,8,["theme"])]),_:1})):A(l).rightSlot==="customizer"?(O(),nt(So,{key:2,"fallback-title":"配色面板加载失败",onClose:Z[21]||(Z[21]=ye=>A(l).rightSlot=null)},{default:Jt(()=>[Me(ek,{"has-custom-color":A(Zt)!==null,onApply:A(st),onReset:A(de),onClose:Z[20]||(Z[20]=ye=>A(l).rightSlot=null)},null,8,["has-custom-color","onApply","onReset"])]),_:1})):A(l).rightSlot==="persona-studio"?(O(),nt(So,{key:3,"fallback-title":"主题编辑器加载失败",onClose:Z[23]||(Z[23]=ye=>A(l).rightSlot=null)},{default:Jt(()=>[Me(sE,{"initial-base-id":A(gt),onClose:Z[22]||(Z[22]=ye=>A(l).rightSlot=null)},null,8,["initial-base-id"])]),_:1})):(O(),nt(A(o),{key:4,theme:A(ki),"theme-id":A(gt),custom:A(Zt)!==null,onSelect:y,onHover:Z[24]||(Z[24]=ye=>io.value=ye),onAdvanced:Z[25]||(Z[25]=ye=>A(l).rightSlot="persona-studio"),onPublish:Z[26]||(Z[26]=ye=>L("publish"))},null,8,["theme","theme-id","custom"]))])],2),[[_o,k.value]])],10,e6),h.value==="write"?(O(),P("nav",r6,[p("button",{type:"button",class:$e({active:A(Sn)==="editor"}),"aria-pressed":A(Sn)==="editor",onClick:Z[27]||(Z[27]=ye=>$("editor"))},"编辑",10,i6),p("button",{type:"button",class:$e({active:A(Sn)==="preview"}),"aria-pressed":A(Sn)==="preview",onClick:Z[28]||(Z[28]=ye=>$("preview"))},"预览",10,s6)])):ae("",!0)]),A(l).leftSlot==="drafts"?(O(),P("div",{key:0,class:"mobile-drawer-mask","aria-hidden":"true",onClick:Z[29]||(Z[29]=ye=>A(l).leftSlot=null)})):ae("",!0),A(l).commandOpen?(O(),nt(So,{key:1,"fallback-title":"命令面板加载失败",onClose:Z[31]||(Z[31]=ye=>A(l).commandOpen=!1)},{default:Jt(()=>[Me(zT,{commands:A(vr),onClose:Z[30]||(Z[30]=ye=>A(l).commandOpen=!1)},null,8,["commands"])]),_:1})):ae("",!0),A(l).helpOpen?(O(),nt(So,{key:2,"fallback-title":"帮助面板加载失败",onClose:Z[33]||(Z[33]=ye=>A(l).helpOpen=!1)},{default:Jt(()=>[Me(lA,{commands:A(vr),onClose:Z[32]||(Z[32]=ye=>A(l).helpOpen=!1),onInsert:ut,onRestartOnboard:Ss},null,8,["commands"])]),_:1})):ae("",!0),p("dialog",{ref_key:"conflictDialog",ref:gn,class:"file-conflict","aria-labelledby":"file-conflict-title",onCancel:Z[36]||(Z[36]=It(()=>{},["prevent"])),onKeydown:Z[37]||(Z[37]=It(()=>{},["stop"]))},[Z[39]||(Z[39]=p("h3",{id:"file-conflict-title"},"文件和当前内容都有修改",-1)),p("p",null,"「"+U(A(Te).title.value)+"」已被外部编辑器修改。请选择要保留的版本。",1),p("div",a6,[p("button",{disabled:A(Pt),onClick:Z[34]||(Z[34]=(...ye)=>A(Te).loadDiskVersion&&A(Te).loadDiskVersion(...ye))},"载入磁盘版本",8,l6),p("button",{disabled:A(Pt)||D.value,onClick:Z[35]||(Z[35]=(...ye)=>A(St)&&A(St)(...ye))},"用当前内容覆盖",8,c6)]),D.value?(O(),P("p",u6,U(Ci))):ae("",!0),A(Te).error.value?(O(),P("p",d6,U(A(Te).error.value),1)):ae("",!0)],544),A(E)?(O(),nt(_A,{key:3,message:A(E).message,onUndo:A(Ne),onExpire:A(Fe)},null,8,["message","onUndo","onExpire"])):ae("",!0),A(ce)?(O(),nt(MA,{key:4,message:A(ce).message,details:A(ce).details,cta:A(ce).cta,onDismiss:A(ve)},null,8,["message","details","cta","onDismiss"])):ae("",!0)],2))}}),p6=Ge(f6,[["__scopeId","data-v-69255c33"]]);s1(p6).mount("#app");export{O as A,Oo as B,or as C,Qu as D,ed as E,ue as F,J as G,mh as H,Le as I,U as J,A as K,Tf as L,sa as M,y6 as N,jc as O,q4 as P,Ut as Q,_o as R,x6 as S,Pe as T,ot as U,xn as V,It as W,An as _,hs as a,Y3 as b,Ge as c,_6 as d,te as e,p as f,nt as g,ae as h,P as i,We as j,Me as k,Ro as l,Ke as m,qu as n,k6 as o,bt as p,U_ as q,w6 as r,v6 as s,S6 as t,en as u,$e as v,O1 as w,Qt as x,yt as y,zt as z};
