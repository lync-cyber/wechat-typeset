import{a as Yd,l as Zd,E as An,b as Xd,o as Jd,c as Qd,h as ep,d as tp,k as np,e as ip,f as rp,i as op,m as sp}from"./codemirror-Bh8dbdAK.js";import{M as ap,i as cp,b as lp,f as dp,m as pp,c as fp,g as up}from"./markdown-CNJ631Ll.js";import{j as hp,B as Ua}from"./juice-eHgRIhqJ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const fs=globalThis||void 0||self;/**
* @vue/shared v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ko(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Ee={},Bn=[],Ct=()=>{},Va=()=>!1,nr=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ir=e=>e.startsWith("onUpdate:"),ze=Object.assign,_o=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},gp=Object.prototype.hasOwnProperty,ke=(e,t)=>gp.call(e,t),ce=Array.isArray,Pn=e=>wi(e)==="[object Map]",rr=e=>wi(e)==="[object Set]",us=e=>wi(e)==="[object Date]",pe=e=>typeof e=="function",Me=e=>typeof e=="string",Tt=e=>typeof e=="symbol",$e=e=>e!==null&&typeof e=="object",Ga=e=>($e(e)||pe(e))&&pe(e.then)&&pe(e.catch),Ya=Object.prototype.toString,wi=e=>Ya.call(e),mp=e=>wi(e).slice(8,-1),Za=e=>wi(e)==="[object Object]",So=e=>Me(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ri=ko(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),or=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},bp=/-\w/g,dt=or(e=>e.replace(bp,t=>t.slice(1).toUpperCase())),xp=/\B([A-Z])/g,rn=or(e=>e.replace(xp,"-$1").toLowerCase()),Xa=or(e=>e.charAt(0).toUpperCase()+e.slice(1)),yr=or(e=>e?`on${Xa(e)}`:""),$t=(e,t)=>!Object.is(e,t),Oi=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Ja=(e,t,n,i=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:i,value:n})},$o=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let hs;const sr=()=>hs||(hs=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof fs<"u"?fs:{});function Xe(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++){const i=e[n],r=Me(i)?kp(i):Xe(i);if(r)for(const o in r)t[o]=r[o]}return t}else if(Me(e)||$e(e))return e}const yp=/;(?![^(]*\))/g,vp=/:([^]+)/,wp=/\/\*[^]*?\*\//g;function kp(e){const t={};return e.replace(wp,"").split(yp).forEach(n=>{if(n){const i=n.split(vp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ie(e){let t="";if(Me(e))t=e;else if(ce(e))for(let n=0;n<e.length;n++){const i=Ie(e[n]);i&&(t+=i+" ")}else if($e(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const _p="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Sp=ko(_p);function Qa(e){return!!e||e===""}function $p(e,t){if(e.length!==t.length)return!1;let n=!0;for(let i=0;n&&i<e.length;i++)n=ki(e[i],t[i]);return n}function ki(e,t){if(e===t)return!0;let n=us(e),i=us(t);if(n||i)return n&&i?e.getTime()===t.getTime():!1;if(n=Tt(e),i=Tt(t),n||i)return e===t;if(n=ce(e),i=ce(t),n||i)return n&&i?$p(e,t):!1;if(n=$e(e),i=$e(t),n||i){if(!n||!i)return!1;const r=Object.keys(e).length,o=Object.keys(t).length;if(r!==o)return!1;for(const s in e){const a=e.hasOwnProperty(s),c=t.hasOwnProperty(s);if(a&&!c||!a&&c||!ki(e[s],t[s]))return!1}}return String(e)===String(t)}function ec(e,t){return e.findIndex(n=>ki(n,t))}const tc=e=>!!(e&&e.__v_isRef===!0),Q=e=>Me(e)?e:e==null?"":ce(e)||$e(e)&&(e.toString===Ya||!pe(e.toString))?tc(e)?Q(e.value):JSON.stringify(e,nc,2):String(e),nc=(e,t)=>tc(t)?nc(e,t.value):Pn(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[i,r],o)=>(n[vr(i,o)+" =>"]=r,n),{})}:rr(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>vr(n))}:Tt(t)?vr(t):$e(t)&&!ce(t)&&!Za(t)?String(t):t,vr=(e,t="")=>{var n;return Tt(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ze;class Ep{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Ze,!t&&Ze&&(this.index=(Ze.scopes||(Ze.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Ze;try{return Ze=this,t()}finally{Ze=n}}}on(){++this._on===1&&(this.prevScope=Ze,Ze=this)}off(){this._on>0&&--this._on===0&&(Ze=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Cp(){return Ze}let Ce;const wr=new WeakSet;class ic{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ze&&Ze.active&&Ze.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wr.has(this)&&(wr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||oc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,gs(this),sc(this);const t=Ce,n=pt;Ce=this,pt=!0;try{return this.fn()}finally{ac(this),Ce=t,pt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ao(t);this.deps=this.depsTail=void 0,gs(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Xr(this)&&this.run()}get dirty(){return Xr(this)}}let rc=0,oi,si;function oc(e,t=!1){if(e.flags|=8,t){e.next=si,si=e;return}e.next=oi,oi=e}function Eo(){rc++}function Co(){if(--rc>0)return;if(si){let t=si;for(si=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;oi;){let t=oi;for(oi=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){e||(e=i)}t=n}}if(e)throw e}function sc(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ac(e){let t,n=e.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),Ao(i),Ap(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}e.deps=t,e.depsTail=n}function Xr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(cc(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function cc(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===pi)||(e.globalVersion=pi,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Xr(e))))return;e.flags|=2;const t=e.dep,n=Ce,i=pt;Ce=e,pt=!0;try{sc(e);const r=e.fn(e._value);(t.version===0||$t(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{Ce=n,pt=i,ac(e),e.flags&=-3}}function Ao(e,t=!1){const{dep:n,prevSub:i,nextSub:r}=e;if(i&&(i.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=i,e.nextSub=void 0),n.subs===e&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let o=n.computed.deps;o;o=o.nextDep)Ao(o,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ap(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let pt=!0;const lc=[];function Kt(){lc.push(pt),pt=!1}function qt(){const e=lc.pop();pt=e===void 0?!0:e}function gs(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Ce;Ce=void 0;try{t()}finally{Ce=n}}}let pi=0;class Tp{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class To{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Ce||!pt||Ce===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ce)n=this.activeLink=new Tp(Ce,this),Ce.deps?(n.prevDep=Ce.depsTail,Ce.depsTail.nextDep=n,Ce.depsTail=n):Ce.deps=Ce.depsTail=n,dc(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Ce.depsTail,n.nextDep=void 0,Ce.depsTail.nextDep=n,Ce.depsTail=n,Ce.deps===n&&(Ce.deps=i)}return n}trigger(t){this.version++,pi++,this.notify(t)}notify(t){Eo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Co()}}}function dc(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)dc(i)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const Jr=new WeakMap,xn=Symbol(""),Qr=Symbol(""),fi=Symbol("");function We(e,t,n){if(pt&&Ce){let i=Jr.get(e);i||Jr.set(e,i=new Map);let r=i.get(n);r||(i.set(n,r=new To),r.map=i,r.key=n),r.track()}}function Dt(e,t,n,i,r,o){const s=Jr.get(e);if(!s){pi++;return}const a=c=>{c&&c.trigger()};if(Eo(),t==="clear")s.forEach(a);else{const c=ce(e),l=c&&So(n);if(c&&n==="length"){const d=Number(i);s.forEach((f,u)=>{(u==="length"||u===fi||!Tt(u)&&u>=d)&&a(f)})}else switch((n!==void 0||s.has(void 0))&&a(s.get(n)),l&&a(s.get(fi)),t){case"add":c?l&&a(s.get("length")):(a(s.get(xn)),Pn(e)&&a(s.get(Qr)));break;case"delete":c||(a(s.get(xn)),Pn(e)&&a(s.get(Qr)));break;case"set":Pn(e)&&a(s.get(xn));break}}Co()}function Tn(e){const t=we(e);return t===e?t:(We(t,"iterate",fi),st(e)?t:t.map(ht))}function ar(e){return We(e=we(e),"iterate",fi),e}function _t(e,t){return Ut(e)?Hn(yn(e)?ht(t):t):ht(t)}const Ip={__proto__:null,[Symbol.iterator](){return kr(this,Symbol.iterator,e=>_t(this,e))},concat(...e){return Tn(this).concat(...e.map(t=>ce(t)?Tn(t):t))},entries(){return kr(this,"entries",e=>(e[1]=_t(this,e[1]),e))},every(e,t){return Rt(this,"every",e,t,void 0,arguments)},filter(e,t){return Rt(this,"filter",e,t,n=>n.map(i=>_t(this,i)),arguments)},find(e,t){return Rt(this,"find",e,t,n=>_t(this,n),arguments)},findIndex(e,t){return Rt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Rt(this,"findLast",e,t,n=>_t(this,n),arguments)},findLastIndex(e,t){return Rt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Rt(this,"forEach",e,t,void 0,arguments)},includes(...e){return _r(this,"includes",e)},indexOf(...e){return _r(this,"indexOf",e)},join(e){return Tn(this).join(e)},lastIndexOf(...e){return _r(this,"lastIndexOf",e)},map(e,t){return Rt(this,"map",e,t,void 0,arguments)},pop(){return ei(this,"pop")},push(...e){return ei(this,"push",e)},reduce(e,...t){return ms(this,"reduce",e,t)},reduceRight(e,...t){return ms(this,"reduceRight",e,t)},shift(){return ei(this,"shift")},some(e,t){return Rt(this,"some",e,t,void 0,arguments)},splice(...e){return ei(this,"splice",e)},toReversed(){return Tn(this).toReversed()},toSorted(e){return Tn(this).toSorted(e)},toSpliced(...e){return Tn(this).toSpliced(...e)},unshift(...e){return ei(this,"unshift",e)},values(){return kr(this,"values",e=>_t(this,e))}};function kr(e,t,n){const i=ar(e),r=i[t]();return i!==e&&!st(e)&&(r._next=r.next,r.next=()=>{const o=r._next();return o.done||(o.value=n(o.value)),o}),r}const Lp=Array.prototype;function Rt(e,t,n,i,r,o){const s=ar(e),a=s!==e&&!st(e),c=s[t];if(c!==Lp[t]){const f=c.apply(e,o);return a?ht(f):f}let l=n;s!==e&&(a?l=function(f,u){return n.call(this,_t(e,f),u,e)}:n.length>2&&(l=function(f,u){return n.call(this,f,u,e)}));const d=c.call(s,l,i);return a&&r?r(d):d}function ms(e,t,n,i){const r=ar(e),o=r!==e&&!st(e);let s=n,a=!1;r!==e&&(o?(a=i.length===0,s=function(l,d,f){return a&&(a=!1,l=_t(e,l)),n.call(this,l,_t(e,d),f,e)}):n.length>3&&(s=function(l,d,f){return n.call(this,l,d,f,e)}));const c=r[t](s,...i);return a?_t(e,c):c}function _r(e,t,n){const i=we(e);We(i,"iterate",fi);const r=i[t](...n);return(r===-1||r===!1)&&Ro(n[0])?(n[0]=we(n[0]),i[t](...n)):r}function ei(e,t,n=[]){Kt(),Eo();const i=we(e)[t].apply(e,n);return Co(),qt(),i}const Rp=ko("__proto__,__v_isRef,__isVue"),pc=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Tt));function Mp(e){Tt(e)||(e=String(e));const t=we(this);return We(t,"has",e),t.hasOwnProperty(e)}class fc{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,i){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,o=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return o;if(n==="__v_raw")return i===(r?o?Fp:mc:o?gc:hc).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const s=ce(t);if(!r){let c;if(s&&(c=Ip[n]))return c;if(n==="hasOwnProperty")return Mp}const a=Reflect.get(t,n,je(t)?t:i);if((Tt(n)?pc.has(n):Rp(n))||(r||We(t,"get",n),o))return a;if(je(a)){const c=s&&So(n)?a:a.value;return r&&$e(c)?to(c):c}return $e(a)?r?to(a):kn(a):a}}class uc extends fc{constructor(t=!1){super(!1,t)}set(t,n,i,r){let o=t[n];const s=ce(t)&&So(n);if(!this._isShallow){const l=Ut(o);if(!st(i)&&!Ut(i)&&(o=we(o),i=we(i)),!s&&je(o)&&!je(i))return l||(o.value=i),!0}const a=s?Number(n)<t.length:ke(t,n),c=Reflect.set(t,n,i,je(t)?t:r);return t===we(r)&&(a?$t(i,o)&&Dt(t,"set",n,i):Dt(t,"add",n,i)),c}deleteProperty(t,n){const i=ke(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&i&&Dt(t,"delete",n,void 0),r}has(t,n){const i=Reflect.has(t,n);return(!Tt(n)||!pc.has(n))&&We(t,"has",n),i}ownKeys(t){return We(t,"iterate",ce(t)?"length":xn),Reflect.ownKeys(t)}}class Op extends fc{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Np=new uc,Bp=new Op,Pp=new uc(!0);const eo=e=>e,Ei=e=>Reflect.getPrototypeOf(e);function Dp(e,t,n){return function(...i){const r=this.__v_raw,o=we(r),s=Pn(o),a=e==="entries"||e===Symbol.iterator&&s,c=e==="keys"&&s,l=r[e](...i),d=n?eo:t?Hn:ht;return!t&&We(o,"iterate",c?Qr:xn),ze(Object.create(l),{next(){const{value:f,done:u}=l.next();return u?{value:f,done:u}:{value:a?[d(f[0]),d(f[1])]:d(f),done:u}}})}}function Ci(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function zp(e,t){const n={get(r){const o=this.__v_raw,s=we(o),a=we(r);e||($t(r,a)&&We(s,"get",r),We(s,"get",a));const{has:c}=Ei(s),l=t?eo:e?Hn:ht;if(c.call(s,r))return l(o.get(r));if(c.call(s,a))return l(o.get(a));o!==s&&o.get(r)},get size(){const r=this.__v_raw;return!e&&We(we(r),"iterate",xn),r.size},has(r){const o=this.__v_raw,s=we(o),a=we(r);return e||($t(r,a)&&We(s,"has",r),We(s,"has",a)),r===a?o.has(r):o.has(r)||o.has(a)},forEach(r,o){const s=this,a=s.__v_raw,c=we(a),l=t?eo:e?Hn:ht;return!e&&We(c,"iterate",xn),a.forEach((d,f)=>r.call(o,l(d),l(f),s))}};return ze(n,e?{add:Ci("add"),set:Ci("set"),delete:Ci("delete"),clear:Ci("clear")}:{add(r){const o=we(this),s=Ei(o),a=we(r),c=!t&&!st(r)&&!Ut(r)?a:r;return s.has.call(o,c)||$t(r,c)&&s.has.call(o,r)||$t(a,c)&&s.has.call(o,a)||(o.add(c),Dt(o,"add",c,c)),this},set(r,o){!t&&!st(o)&&!Ut(o)&&(o=we(o));const s=we(this),{has:a,get:c}=Ei(s);let l=a.call(s,r);l||(r=we(r),l=a.call(s,r));const d=c.call(s,r);return s.set(r,o),l?$t(o,d)&&Dt(s,"set",r,o):Dt(s,"add",r,o),this},delete(r){const o=we(this),{has:s,get:a}=Ei(o);let c=s.call(o,r);c||(r=we(r),c=s.call(o,r)),a&&a.call(o,r);const l=o.delete(r);return c&&Dt(o,"delete",r,void 0),l},clear(){const r=we(this),o=r.size!==0,s=r.clear();return o&&Dt(r,"clear",void 0,void 0),s}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Dp(r,e,t)}),n}function Io(e,t){const n=zp(e,t);return(i,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?i:Reflect.get(ke(n,r)&&r in i?n:i,r,o)}const Wp={get:Io(!1,!1)},Hp={get:Io(!1,!0)},jp={get:Io(!0,!1)};const hc=new WeakMap,gc=new WeakMap,mc=new WeakMap,Fp=new WeakMap;function Kp(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function qp(e){return e.__v_skip||!Object.isExtensible(e)?0:Kp(mp(e))}function kn(e){return Ut(e)?e:Lo(e,!1,Np,Wp,hc)}function Up(e){return Lo(e,!1,Pp,Hp,gc)}function to(e){return Lo(e,!0,Bp,jp,mc)}function Lo(e,t,n,i,r){if(!$e(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=qp(e);if(o===0)return e;const s=r.get(e);if(s)return s;const a=new Proxy(e,o===2?i:n);return r.set(e,a),a}function yn(e){return Ut(e)?yn(e.__v_raw):!!(e&&e.__v_isReactive)}function Ut(e){return!!(e&&e.__v_isReadonly)}function st(e){return!!(e&&e.__v_isShallow)}function Ro(e){return e?!!e.__v_raw:!1}function we(e){const t=e&&e.__v_raw;return t?we(t):e}function Vp(e){return!ke(e,"__v_skip")&&Object.isExtensible(e)&&Ja(e,"__v_skip",!0),e}const ht=e=>$e(e)?kn(e):e,Hn=e=>$e(e)?to(e):e;function je(e){return e?e.__v_isRef===!0:!1}function he(e){return Gp(e,!1)}function Gp(e,t){return je(e)?e:new Yp(e,t)}class Yp{constructor(t,n){this.dep=new To,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:we(t),this._value=n?t:ht(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,i=this.__v_isShallow||st(t)||Ut(t);t=i?t:we(t),$t(t,n)&&(this._rawValue=t,this._value=i?t:ht(t),this.dep.trigger())}}function ee(e){return je(e)?e.value:e}const Zp={get:(e,t,n)=>t==="__v_raw"?e:ee(Reflect.get(e,t,n)),set:(e,t,n,i)=>{const r=e[t];return je(r)&&!je(n)?(r.value=n,!0):Reflect.set(e,t,n,i)}};function bc(e){return yn(e)?e:new Proxy(e,Zp)}class Xp{constructor(t,n,i){this.fn=t,this.setter=n,this._value=void 0,this.dep=new To(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=pi-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ce!==this)return oc(this,!0),!0}get value(){const t=this.dep.track();return cc(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Jp(e,t,n=!1){let i,r;return pe(e)?i=e:(i=e.get,r=e.set),new Xp(i,r,n)}const Ai={},zi=new WeakMap;let hn;function Qp(e,t=!1,n=hn){if(n){let i=zi.get(n);i||zi.set(n,i=[]),i.push(e)}}function ef(e,t,n=Ee){const{immediate:i,deep:r,once:o,scheduler:s,augmentJob:a,call:c}=n,l=_=>r?_:st(_)||r===!1||r===0?zt(_,1):zt(_);let d,f,u,b,p=!1,m=!1;if(je(e)?(f=()=>e.value,p=st(e)):yn(e)?(f=()=>l(e),p=!0):ce(e)?(m=!0,p=e.some(_=>yn(_)||st(_)),f=()=>e.map(_=>{if(je(_))return _.value;if(yn(_))return l(_);if(pe(_))return c?c(_,2):_()})):pe(e)?t?f=c?()=>c(e,2):e:f=()=>{if(u){Kt();try{u()}finally{qt()}}const _=hn;hn=d;try{return c?c(e,3,[b]):e(b)}finally{hn=_}}:f=Ct,t&&r){const _=f,k=r===!0?1/0:r;f=()=>zt(_(),k)}const S=Cp(),I=()=>{d.stop(),S&&S.active&&_o(S.effects,d)};if(o&&t){const _=t;t=(...k)=>{_(...k),I()}}let z=m?new Array(e.length).fill(Ai):Ai;const R=_=>{if(!(!(d.flags&1)||!d.dirty&&!_))if(t){const k=d.run();if(r||p||(m?k.some((B,w)=>$t(B,z[w])):$t(k,z))){u&&u();const B=hn;hn=d;try{const w=[k,z===Ai?void 0:m&&z[0]===Ai?[]:z,b];z=k,c?c(t,3,w):t(...w)}finally{hn=B}}}else d.run()};return a&&a(R),d=new ic(f),d.scheduler=s?()=>s(R,!1):R,b=_=>Qp(_,!1,d),u=d.onStop=()=>{const _=zi.get(d);if(_){if(c)c(_,4);else for(const k of _)k();zi.delete(d)}},t?i?R(!0):z=d.run():s?s(R.bind(null,!0),!0):d.run(),I.pause=d.pause.bind(d),I.resume=d.resume.bind(d),I.stop=I,I}function zt(e,t=1/0,n){if(t<=0||!$e(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,je(e))zt(e.value,t,n);else if(ce(e))for(let i=0;i<e.length;i++)zt(e[i],t,n);else if(rr(e)||Pn(e))e.forEach(i=>{zt(i,t,n)});else if(Za(e)){for(const i in e)zt(e[i],t,n);for(const i of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,i)&&zt(e[i],t,n)}return e}/**
* @vue/runtime-core v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function _i(e,t,n,i){try{return i?e(...i):e()}catch(r){cr(r,t,n)}}function It(e,t,n,i){if(pe(e)){const r=_i(e,t,n,i);return r&&Ga(r)&&r.catch(o=>{cr(o,t,n)}),r}if(ce(e)){const r=[];for(let o=0;o<e.length;o++)r.push(It(e[o],t,n,i));return r}}function cr(e,t,n,i=!0){const r=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||Ee;if(t){let a=t.parent;const c=t.proxy,l=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const d=a.ec;if(d){for(let f=0;f<d.length;f++)if(d[f](e,c,l)===!1)return}a=a.parent}if(o){Kt(),_i(o,null,10,[e,c,l]),qt();return}}tf(e,n,r,i,s)}function tf(e,t,n,i=!0,r=!1){if(r)throw e;console.error(e)}const Ue=[];let wt=-1;const Dn=[];let Xt=null,On=0;const xc=Promise.resolve();let Wi=null;function Hi(e){const t=Wi||xc;return e?t.then(this?e.bind(this):e):t}function nf(e){let t=wt+1,n=Ue.length;for(;t<n;){const i=t+n>>>1,r=Ue[i],o=ui(r);o<e||o===e&&r.flags&2?t=i+1:n=i}return t}function Mo(e){if(!(e.flags&1)){const t=ui(e),n=Ue[Ue.length-1];!n||!(e.flags&2)&&t>=ui(n)?Ue.push(e):Ue.splice(nf(t),0,e),e.flags|=1,yc()}}function yc(){Wi||(Wi=xc.then(wc))}function rf(e){ce(e)?Dn.push(...e):Xt&&e.id===-1?Xt.splice(On+1,0,e):e.flags&1||(Dn.push(e),e.flags|=1),yc()}function bs(e,t,n=wt+1){for(;n<Ue.length;n++){const i=Ue[n];if(i&&i.flags&2){if(e&&i.id!==e.uid)continue;Ue.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function vc(e){if(Dn.length){const t=[...new Set(Dn)].sort((n,i)=>ui(n)-ui(i));if(Dn.length=0,Xt){Xt.push(...t);return}for(Xt=t,On=0;On<Xt.length;On++){const n=Xt[On];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Xt=null,On=0}}const ui=e=>e.id==null?e.flags&2?-1:1/0:e.id;function wc(e){try{for(wt=0;wt<Ue.length;wt++){const t=Ue[wt];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),_i(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;wt<Ue.length;wt++){const t=Ue[wt];t&&(t.flags&=-2)}wt=-1,Ue.length=0,vc(),Wi=null,(Ue.length||Dn.length)&&wc()}}let ot=null,kc=null;function ji(e){const t=ot;return ot=e,kc=e&&e.type.__scopeId||null,t}function of(e,t=ot,n){if(!t||e._n)return e;const i=(...r)=>{i._d&&As(-1);const o=ji(t);let s;try{s=e(...r)}finally{ji(o),i._d&&As(1)}return s};return i._n=!0,i._c=!0,i._d=!0,i}function Et(e,t){if(ot===null)return e;const n=fr(ot),i=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[o,s,a,c=Ee]=t[r];o&&(pe(o)&&(o={mounted:o,updated:o}),o.deep&&zt(s),i.push({dir:o,instance:n,value:s,oldValue:void 0,arg:a,modifiers:c}))}return e}function pn(e,t,n,i){const r=e.dirs,o=t&&t.dirs;for(let s=0;s<r.length;s++){const a=r[s];o&&(a.oldValue=o[s].value);let c=a.dir[i];c&&(Kt(),It(c,n,8,[e.el,a,e,t]),qt())}}function sf(e,t){if(Ve){let n=Ve.provides;const i=Ve.parent&&Ve.parent.provides;i===n&&(n=Ve.provides=Object.create(i)),n[e]=t}}function Ni(e,t,n=!1){const i=iu();if(i||zn){let r=zn?zn._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&pe(t)?t.call(i&&i.proxy):t}}const af=Symbol.for("v-scx"),cf=()=>Ni(af);function nt(e,t,n){return _c(e,t,n)}function _c(e,t,n=Ee){const{immediate:i,deep:r,flush:o,once:s}=n,a=ze({},n),c=t&&i||!t&&o!=="post";let l;if(gi){if(o==="sync"){const b=cf();l=b.__watcherHandles||(b.__watcherHandles=[])}else if(!c){const b=()=>{};return b.stop=Ct,b.resume=Ct,b.pause=Ct,b}}const d=Ve;a.call=(b,p,m)=>It(b,d,p,m);let f=!1;o==="post"?a.scheduler=b=>{Ye(b,d&&d.suspense)}:o!=="sync"&&(f=!0,a.scheduler=(b,p)=>{p?b():Mo(b)}),a.augmentJob=b=>{t&&(b.flags|=4),f&&(b.flags|=2,d&&(b.id=d.uid,b.i=d))};const u=ef(e,t,a);return gi&&(l?l.push(u):c&&u()),u}function lf(e,t,n){const i=this.proxy,r=Me(e)?e.includes(".")?Sc(i,e):()=>i[e]:e.bind(i,i);let o;pe(t)?o=t:(o=t.handler,n=t);const s=Si(this),a=_c(r,o.bind(i),n);return s(),a}function Sc(e,t){const n=t.split(".");return()=>{let i=e;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const df=Symbol("_vte"),pf=e=>e.__isTeleport,ff=Symbol("_leaveCb");function Oo(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Oo(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Je(e,t){return pe(e)?ze({name:e.name},t,{setup:e}):e}function $c(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function xs(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Fi=new WeakMap;function ai(e,t,n,i,r=!1){if(ce(e)){e.forEach((m,S)=>ai(m,t&&(ce(t)?t[S]:t),n,i,r));return}if(ci(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&ai(e,t,n,i.component.subTree);return}const o=i.shapeFlag&4?fr(i.component):i.el,s=r?null:o,{i:a,r:c}=e,l=t&&t.r,d=a.refs===Ee?a.refs={}:a.refs,f=a.setupState,u=we(f),b=f===Ee?Va:m=>xs(d,m)?!1:ke(u,m),p=(m,S)=>!(S&&xs(d,S));if(l!=null&&l!==c){if(ys(t),Me(l))d[l]=null,b(l)&&(f[l]=null);else if(je(l)){const m=t;p(l,m.k)&&(l.value=null),m.k&&(d[m.k]=null)}}if(pe(c))_i(c,a,12,[s,d]);else{const m=Me(c),S=je(c);if(m||S){const I=()=>{if(e.f){const z=m?b(c)?f[c]:d[c]:p()||!e.k?c.value:d[e.k];if(r)ce(z)&&_o(z,o);else if(ce(z))z.includes(o)||z.push(o);else if(m)d[c]=[o],b(c)&&(f[c]=d[c]);else{const R=[o];p(c,e.k)&&(c.value=R),e.k&&(d[e.k]=R)}}else m?(d[c]=s,b(c)&&(f[c]=s)):S&&(p(c,e.k)&&(c.value=s),e.k&&(d[e.k]=s))};if(s){const z=()=>{I(),Fi.delete(e)};z.id=-1,Fi.set(e,z),Ye(z,n)}else ys(e),I()}}}function ys(e){const t=Fi.get(e);t&&(t.flags|=8,Fi.delete(e))}sr().requestIdleCallback;sr().cancelIdleCallback;const ci=e=>!!e.type.__asyncLoader,Ec=e=>e.type.__isKeepAlive;function uf(e,t){Cc(e,"a",t)}function hf(e,t){Cc(e,"da",t)}function Cc(e,t,n=Ve){const i=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(lr(t,i,n),n){let r=n.parent;for(;r&&r.parent;)Ec(r.parent.vnode)&&gf(i,t,n,r),r=r.parent}}function gf(e,t,n,i){const r=lr(t,e,i,!0);No(()=>{_o(i[t],r)},n)}function lr(e,t,n=Ve,i=!1){if(n){const r=n[e]||(n[e]=[]),o=t.__weh||(t.__weh=(...s)=>{Kt();const a=Si(n),c=It(t,n,e,s);return a(),qt(),c});return i?r.unshift(o):r.push(o),o}}const Vt=e=>(t,n=Ve)=>{(!gi||e==="sp")&&lr(e,(...i)=>t(...i),n)},mf=Vt("bm"),on=Vt("m"),bf=Vt("bu"),xf=Vt("u"),sn=Vt("bum"),No=Vt("um"),yf=Vt("sp"),vf=Vt("rtg"),wf=Vt("rtc");function kf(e,t=Ve){lr("ec",e,t)}const _f=Symbol.for("v-ndc");function De(e,t,n,i){let r;const o=n,s=ce(e);if(s||Me(e)){const a=s&&yn(e);let c=!1,l=!1;a&&(c=!st(e),l=Ut(e),e=ar(e)),r=new Array(e.length);for(let d=0,f=e.length;d<f;d++)r[d]=t(c?l?Hn(ht(e[d])):ht(e[d]):e[d],d,void 0,o)}else if(typeof e=="number"){r=new Array(e);for(let a=0;a<e;a++)r[a]=t(a+1,a,void 0,o)}else if($e(e))if(e[Symbol.iterator])r=Array.from(e,(a,c)=>t(a,c,void 0,o));else{const a=Object.keys(e);r=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const d=a[c];r[c]=t(e[d],d,c,o)}}else r=[];return r}const no=e=>e?Yc(e)?fr(e):no(e.parent):null,li=ze(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>no(e.parent),$root:e=>no(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Tc(e),$forceUpdate:e=>e.f||(e.f=()=>{Mo(e.update)}),$nextTick:e=>e.n||(e.n=Hi.bind(e.proxy)),$watch:e=>lf.bind(e)}),Sr=(e,t)=>e!==Ee&&!e.__isScriptSetup&&ke(e,t),Sf={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:o,accessCache:s,type:a,appContext:c}=e;if(t[0]!=="$"){const u=s[t];if(u!==void 0)switch(u){case 1:return i[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(Sr(i,t))return s[t]=1,i[t];if(r!==Ee&&ke(r,t))return s[t]=2,r[t];if(ke(o,t))return s[t]=3,o[t];if(n!==Ee&&ke(n,t))return s[t]=4,n[t];io&&(s[t]=0)}}const l=li[t];let d,f;if(l)return t==="$attrs"&&We(e.attrs,"get",""),l(e);if((d=a.__cssModules)&&(d=d[t]))return d;if(n!==Ee&&ke(n,t))return s[t]=4,n[t];if(f=c.config.globalProperties,ke(f,t))return f[t]},set({_:e},t,n){const{data:i,setupState:r,ctx:o}=e;return Sr(r,t)?(r[t]=n,!0):i!==Ee&&ke(i,t)?(i[t]=n,!0):ke(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:i,appContext:r,props:o,type:s}},a){let c;return!!(n[a]||e!==Ee&&a[0]!=="$"&&ke(e,a)||Sr(t,a)||ke(o,a)||ke(i,a)||ke(li,a)||ke(r.config.globalProperties,a)||(c=s.__cssModules)&&c[a])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:ke(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function vs(e){return ce(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let io=!0;function $f(e){const t=Tc(e),n=e.proxy,i=e.ctx;io=!1,t.beforeCreate&&ws(t.beforeCreate,e,"bc");const{data:r,computed:o,methods:s,watch:a,provide:c,inject:l,created:d,beforeMount:f,mounted:u,beforeUpdate:b,updated:p,activated:m,deactivated:S,beforeDestroy:I,beforeUnmount:z,destroyed:R,unmounted:_,render:k,renderTracked:B,renderTriggered:w,errorCaptured:y,serverPrefetch:W,expose:U,inheritAttrs:q,components:le,directives:J,filters:ge}=t;if(l&&Ef(l,i,null),s)for(const E in s){const A=s[E];pe(A)&&(i[E]=A.bind(n))}if(r){const E=r.call(n,n);$e(E)&&(e.data=kn(E))}if(io=!0,o)for(const E in o){const A=o[E],X=pe(A)?A.bind(n,n):pe(A.get)?A.get.bind(n,n):Ct,ie=!pe(A)&&pe(A.set)?A.set.bind(n):Ct,xe=Ae({get:X,set:ie});Object.defineProperty(i,E,{enumerable:!0,configurable:!0,get:()=>xe.value,set:ye=>xe.value=ye})}if(a)for(const E in a)Ac(a[E],i,n,E);if(c){const E=pe(c)?c.call(n):c;Reflect.ownKeys(E).forEach(A=>{sf(A,E[A])})}d&&ws(d,e,"c");function v(E,A){ce(A)?A.forEach(X=>E(X.bind(n))):A&&E(A.bind(n))}if(v(mf,f),v(on,u),v(bf,b),v(xf,p),v(uf,m),v(hf,S),v(kf,y),v(wf,B),v(vf,w),v(sn,z),v(No,_),v(yf,W),ce(U))if(U.length){const E=e.exposed||(e.exposed={});U.forEach(A=>{Object.defineProperty(E,A,{get:()=>n[A],set:X=>n[A]=X,enumerable:!0})})}else e.exposed||(e.exposed={});k&&e.render===Ct&&(e.render=k),q!=null&&(e.inheritAttrs=q),le&&(e.components=le),J&&(e.directives=J),W&&$c(e)}function Ef(e,t,n=Ct){ce(e)&&(e=ro(e));for(const i in e){const r=e[i];let o;$e(r)?"default"in r?o=Ni(r.from||i,r.default,!0):o=Ni(r.from||i):o=Ni(r),je(o)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>o.value,set:s=>o.value=s}):t[i]=o}}function ws(e,t,n){It(ce(e)?e.map(i=>i.bind(t.proxy)):e.bind(t.proxy),t,n)}function Ac(e,t,n,i){let r=i.includes(".")?Sc(n,i):()=>n[i];if(Me(e)){const o=t[e];pe(o)&&nt(r,o)}else if(pe(e))nt(r,e.bind(n));else if($e(e))if(ce(e))e.forEach(o=>Ac(o,t,n,i));else{const o=pe(e.handler)?e.handler.bind(n):t[e.handler];pe(o)&&nt(r,o,e)}}function Tc(e){const t=e.type,{mixins:n,extends:i}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:s}}=e.appContext,a=o.get(t);let c;return a?c=a:!r.length&&!n&&!i?c=t:(c={},r.length&&r.forEach(l=>Ki(c,l,s,!0)),Ki(c,t,s)),$e(t)&&o.set(t,c),c}function Ki(e,t,n,i=!1){const{mixins:r,extends:o}=t;o&&Ki(e,o,n,!0),r&&r.forEach(s=>Ki(e,s,n,!0));for(const s in t)if(!(i&&s==="expose")){const a=Cf[s]||n&&n[s];e[s]=a?a(e[s],t[s]):t[s]}return e}const Cf={data:ks,props:_s,emits:_s,methods:ni,computed:ni,beforeCreate:qe,created:qe,beforeMount:qe,mounted:qe,beforeUpdate:qe,updated:qe,beforeDestroy:qe,beforeUnmount:qe,destroyed:qe,unmounted:qe,activated:qe,deactivated:qe,errorCaptured:qe,serverPrefetch:qe,components:ni,directives:ni,watch:Tf,provide:ks,inject:Af};function ks(e,t){return t?e?function(){return ze(pe(e)?e.call(this,this):e,pe(t)?t.call(this,this):t)}:t:e}function Af(e,t){return ni(ro(e),ro(t))}function ro(e){if(ce(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function qe(e,t){return e?[...new Set([].concat(e,t))]:t}function ni(e,t){return e?ze(Object.create(null),e,t):t}function _s(e,t){return e?ce(e)&&ce(t)?[...new Set([...e,...t])]:ze(Object.create(null),vs(e),vs(t??{})):t}function Tf(e,t){if(!e)return t;if(!t)return e;const n=ze(Object.create(null),e);for(const i in t)n[i]=qe(e[i],t[i]);return n}function Ic(){return{app:null,config:{isNativeTag:Va,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let If=0;function Lf(e,t){return function(i,r=null){pe(i)||(i=ze({},i)),r!=null&&!$e(r)&&(r=null);const o=Ic(),s=new WeakSet,a=[];let c=!1;const l=o.app={_uid:If++,_component:i,_props:r,_container:null,_context:o,_instance:null,version:lu,get config(){return o.config},set config(d){},use(d,...f){return s.has(d)||(d&&pe(d.install)?(s.add(d),d.install(l,...f)):pe(d)&&(s.add(d),d(l,...f))),l},mixin(d){return o.mixins.includes(d)||o.mixins.push(d),l},component(d,f){return f?(o.components[d]=f,l):o.components[d]},directive(d,f){return f?(o.directives[d]=f,l):o.directives[d]},mount(d,f,u){if(!c){const b=l._ceVNode||Ge(i,r);return b.appContext=o,u===!0?u="svg":u===!1&&(u=void 0),e(b,d,u),c=!0,l._container=d,d.__vue_app__=l,fr(b.component)}},onUnmount(d){a.push(d)},unmount(){c&&(It(a,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(d,f){return o.provides[d]=f,l},runWithContext(d){const f=zn;zn=l;try{return d()}finally{zn=f}}};return l}}let zn=null;const Rf=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${dt(t)}Modifiers`]||e[`${rn(t)}Modifiers`];function Mf(e,t,...n){if(e.isUnmounted)return;const i=e.vnode.props||Ee;let r=n;const o=t.startsWith("update:"),s=o&&Rf(i,t.slice(7));s&&(s.trim&&(r=n.map(d=>Me(d)?d.trim():d)),s.number&&(r=n.map($o)));let a,c=i[a=yr(t)]||i[a=yr(dt(t))];!c&&o&&(c=i[a=yr(rn(t))]),c&&It(c,e,6,r);const l=i[a+"Once"];if(l){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,It(l,e,6,r)}}const Of=new WeakMap;function Lc(e,t,n=!1){const i=n?Of:t.emitsCache,r=i.get(e);if(r!==void 0)return r;const o=e.emits;let s={},a=!1;if(!pe(e)){const c=l=>{const d=Lc(l,t,!0);d&&(a=!0,ze(s,d))};!n&&t.mixins.length&&t.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}return!o&&!a?($e(e)&&i.set(e,null),null):(ce(o)?o.forEach(c=>s[c]=null):ze(s,o),$e(e)&&i.set(e,s),s)}function dr(e,t){return!e||!nr(t)?!1:(t=t.slice(2).replace(/Once$/,""),ke(e,t[0].toLowerCase()+t.slice(1))||ke(e,rn(t))||ke(e,t))}function Ss(e){const{type:t,vnode:n,proxy:i,withProxy:r,propsOptions:[o],slots:s,attrs:a,emit:c,render:l,renderCache:d,props:f,data:u,setupState:b,ctx:p,inheritAttrs:m}=e,S=ji(e);let I,z;try{if(n.shapeFlag&4){const _=r||i,k=_;I=St(l.call(k,_,d,f,b,u,p)),z=a}else{const _=t;I=St(_.length>1?_(f,{attrs:a,slots:s,emit:c}):_(f,null)),z=t.props?a:Nf(a)}}catch(_){di.length=0,cr(_,e,1),I=Ge(Qt)}let R=I;if(z&&m!==!1){const _=Object.keys(z),{shapeFlag:k}=R;_.length&&k&7&&(o&&_.some(ir)&&(z=Bf(z,o)),R=jn(R,z,!1,!0))}return n.dirs&&(R=jn(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(n.dirs):n.dirs),n.transition&&Oo(R,n.transition),I=R,ji(S),I}const Nf=e=>{let t;for(const n in e)(n==="class"||n==="style"||nr(n))&&((t||(t={}))[n]=e[n]);return t},Bf=(e,t)=>{const n={};for(const i in e)(!ir(i)||!(i.slice(9)in t))&&(n[i]=e[i]);return n};function Pf(e,t,n){const{props:i,children:r,component:o}=e,{props:s,children:a,patchFlag:c}=t,l=o.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return i?$s(i,s,l):!!s;if(c&8){const d=t.dynamicProps;for(let f=0;f<d.length;f++){const u=d[f];if(Rc(s,i,u)&&!dr(l,u))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===s?!1:i?s?$s(i,s,l):!0:!!s;return!1}function $s(e,t,n){const i=Object.keys(t);if(i.length!==Object.keys(e).length)return!0;for(let r=0;r<i.length;r++){const o=i[r];if(Rc(t,e,o)&&!dr(n,o))return!0}return!1}function Rc(e,t,n){const i=e[n],r=t[n];return n==="style"&&$e(i)&&$e(r)?!ki(i,r):i!==r}function Df({vnode:e,parent:t,suspense:n},i){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.suspense.vnode.el=r.el=i,e=r),r===e)(e=t.vnode).el=i,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=i)}const Mc={},Oc=()=>Object.create(Mc),Nc=e=>Object.getPrototypeOf(e)===Mc;function zf(e,t,n,i=!1){const r={},o=Oc();e.propsDefaults=Object.create(null),Bc(e,t,r,o);for(const s in e.propsOptions[0])s in r||(r[s]=void 0);n?e.props=i?r:Up(r):e.type.props?e.props=r:e.props=o,e.attrs=o}function Wf(e,t,n,i){const{props:r,attrs:o,vnode:{patchFlag:s}}=e,a=we(r),[c]=e.propsOptions;let l=!1;if((i||s>0)&&!(s&16)){if(s&8){const d=e.vnode.dynamicProps;for(let f=0;f<d.length;f++){let u=d[f];if(dr(e.emitsOptions,u))continue;const b=t[u];if(c)if(ke(o,u))b!==o[u]&&(o[u]=b,l=!0);else{const p=dt(u);r[p]=oo(c,a,p,b,e,!1)}else b!==o[u]&&(o[u]=b,l=!0)}}}else{Bc(e,t,r,o)&&(l=!0);let d;for(const f in a)(!t||!ke(t,f)&&((d=rn(f))===f||!ke(t,d)))&&(c?n&&(n[f]!==void 0||n[d]!==void 0)&&(r[f]=oo(c,a,f,void 0,e,!0)):delete r[f]);if(o!==a)for(const f in o)(!t||!ke(t,f))&&(delete o[f],l=!0)}l&&Dt(e.attrs,"set","")}function Bc(e,t,n,i){const[r,o]=e.propsOptions;let s=!1,a;if(t)for(let c in t){if(ri(c))continue;const l=t[c];let d;r&&ke(r,d=dt(c))?!o||!o.includes(d)?n[d]=l:(a||(a={}))[d]=l:dr(e.emitsOptions,c)||(!(c in i)||l!==i[c])&&(i[c]=l,s=!0)}if(o){const c=we(n),l=a||Ee;for(let d=0;d<o.length;d++){const f=o[d];n[f]=oo(r,c,f,l[f],e,!ke(l,f))}}return s}function oo(e,t,n,i,r,o){const s=e[n];if(s!=null){const a=ke(s,"default");if(a&&i===void 0){const c=s.default;if(s.type!==Function&&!s.skipFactory&&pe(c)){const{propsDefaults:l}=r;if(n in l)i=l[n];else{const d=Si(r);i=l[n]=c.call(null,t),d()}}else i=c;r.ce&&r.ce._setProp(n,i)}s[0]&&(o&&!a?i=!1:s[1]&&(i===""||i===rn(n))&&(i=!0))}return i}const Hf=new WeakMap;function Pc(e,t,n=!1){const i=n?Hf:t.propsCache,r=i.get(e);if(r)return r;const o=e.props,s={},a=[];let c=!1;if(!pe(e)){const d=f=>{c=!0;const[u,b]=Pc(f,t,!0);ze(s,u),b&&a.push(...b)};!n&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!o&&!c)return $e(e)&&i.set(e,Bn),Bn;if(ce(o))for(let d=0;d<o.length;d++){const f=dt(o[d]);Es(f)&&(s[f]=Ee)}else if(o)for(const d in o){const f=dt(d);if(Es(f)){const u=o[d],b=s[f]=ce(u)||pe(u)?{type:u}:ze({},u),p=b.type;let m=!1,S=!0;if(ce(p))for(let I=0;I<p.length;++I){const z=p[I],R=pe(z)&&z.name;if(R==="Boolean"){m=!0;break}else R==="String"&&(S=!1)}else m=pe(p)&&p.name==="Boolean";b[0]=m,b[1]=S,(m||ke(b,"default"))&&a.push(f)}}const l=[s,a];return $e(e)&&i.set(e,l),l}function Es(e){return e[0]!=="$"&&!ri(e)}const Bo=e=>e==="_"||e==="_ctx"||e==="$stable",Po=e=>ce(e)?e.map(St):[St(e)],jf=(e,t,n)=>{if(t._n)return t;const i=of((...r)=>Po(t(...r)),n);return i._c=!1,i},Dc=(e,t,n)=>{const i=e._ctx;for(const r in e){if(Bo(r))continue;const o=e[r];if(pe(o))t[r]=jf(r,o,i);else if(o!=null){const s=Po(o);t[r]=()=>s}}},zc=(e,t)=>{const n=Po(t);e.slots.default=()=>n},Wc=(e,t,n)=>{for(const i in t)(n||!Bo(i))&&(e[i]=t[i])},Ff=(e,t,n)=>{const i=e.slots=Oc();if(e.vnode.shapeFlag&32){const r=t._;r?(Wc(i,t,n),n&&Ja(i,"_",r,!0)):Dc(t,i)}else t&&zc(e,t)},Kf=(e,t,n)=>{const{vnode:i,slots:r}=e;let o=!0,s=Ee;if(i.shapeFlag&32){const a=t._;a?n&&a===1?o=!1:Wc(r,t,n):(o=!t.$stable,Dc(t,r)),s=t}else t&&(zc(e,t),s={default:1});if(o)for(const a in r)!Bo(a)&&s[a]==null&&delete r[a]},Ye=Yf;function qf(e){return Uf(e)}function Uf(e,t){const n=sr();n.__VUE__=!0;const{insert:i,remove:r,patchProp:o,createElement:s,createText:a,createComment:c,setText:l,setElementText:d,parentNode:f,nextSibling:u,setScopeId:b=Ct,insertStaticContent:p}=e,m=(g,x,$,M=null,O=null,N=null,T=void 0,V=null,P=!!x.dynamicChildren)=>{if(g===x)return;g&&!ti(g,x)&&(M=Lt(g),ye(g,O,N,!0),g=null),x.patchFlag===-2&&(P=!1,x.dynamicChildren=null);const{type:C,ref:ne,shapeFlag:Y}=x;switch(C){case pr:S(g,x,$,M);break;case Qt:I(g,x,$,M);break;case Bi:g==null&&z(x,$,M,T);break;case _e:le(g,x,$,M,O,N,T,V,P);break;default:Y&1?k(g,x,$,M,O,N,T,V,P):Y&6?J(g,x,$,M,O,N,T,V,P):(Y&64||Y&128)&&C.process(g,x,$,M,O,N,T,V,P,xt)}ne!=null&&O?ai(ne,g&&g.ref,N,x||g,!x):ne==null&&g&&g.ref!=null&&ai(g.ref,null,N,g,!0)},S=(g,x,$,M)=>{if(g==null)i(x.el=a(x.children),$,M);else{const O=x.el=g.el;x.children!==g.children&&l(O,x.children)}},I=(g,x,$,M)=>{g==null?i(x.el=c(x.children||""),$,M):x.el=g.el},z=(g,x,$,M)=>{[g.el,g.anchor]=p(g.children,x,$,M,g.el,g.anchor)},R=({el:g,anchor:x},$,M)=>{let O;for(;g&&g!==x;)O=u(g),i(g,$,M),g=O;i(x,$,M)},_=({el:g,anchor:x})=>{let $;for(;g&&g!==x;)$=u(g),r(g),g=$;r(x)},k=(g,x,$,M,O,N,T,V,P)=>{if(x.type==="svg"?T="svg":x.type==="math"&&(T="mathml"),g==null)B(x,$,M,O,N,T,V,P);else{const C=g.el&&g.el._isVueCE?g.el:null;try{C&&C._beginPatch(),W(g,x,O,N,T,V,P)}finally{C&&C._endPatch()}}},B=(g,x,$,M,O,N,T,V)=>{let P,C;const{props:ne,shapeFlag:Y,transition:te,dirs:oe}=g;if(P=g.el=s(g.type,N,ne&&ne.is,ne),Y&8?d(P,g.children):Y&16&&y(g.children,P,null,M,O,$r(g,N),T,V),oe&&pn(g,null,M,"created"),w(P,g,g.scopeId,T,M),ne){for(const K in ne)K!=="value"&&!ri(K)&&o(P,K,null,ne[K],N,M);"value"in ne&&o(P,"value",null,ne.value,N),(C=ne.onVnodeBeforeMount)&&vt(C,M,g)}oe&&pn(g,null,M,"beforeMount");const L=Vf(O,te);L&&te.beforeEnter(P),i(P,x,$),((C=ne&&ne.onVnodeMounted)||L||oe)&&Ye(()=>{try{C&&vt(C,M,g),L&&te.enter(P),oe&&pn(g,null,M,"mounted")}finally{}},O)},w=(g,x,$,M,O)=>{if($&&b(g,$),M)for(let N=0;N<M.length;N++)b(g,M[N]);if(O){let N=O.subTree;if(x===N||Kc(N.type)&&(N.ssContent===x||N.ssFallback===x)){const T=O.vnode;w(g,T,T.scopeId,T.slotScopeIds,O.parent)}}},y=(g,x,$,M,O,N,T,V,P=0)=>{for(let C=P;C<g.length;C++){const ne=g[C]=V?Bt(g[C]):St(g[C]);m(null,ne,x,$,M,O,N,T,V)}},W=(g,x,$,M,O,N,T)=>{const V=x.el=g.el;let{patchFlag:P,dynamicChildren:C,dirs:ne}=x;P|=g.patchFlag&16;const Y=g.props||Ee,te=x.props||Ee;let oe;if($&&fn($,!1),(oe=te.onVnodeBeforeUpdate)&&vt(oe,$,x,g),ne&&pn(x,g,$,"beforeUpdate"),$&&fn($,!0),(Y.innerHTML&&te.innerHTML==null||Y.textContent&&te.textContent==null)&&d(V,""),C?U(g.dynamicChildren,C,V,$,M,$r(x,O),N):T||A(g,x,V,null,$,M,$r(x,O),N,!1),P>0){if(P&16)q(V,Y,te,$,O);else if(P&2&&Y.class!==te.class&&o(V,"class",null,te.class,O),P&4&&o(V,"style",Y.style,te.style,O),P&8){const L=x.dynamicProps;for(let K=0;K<L.length;K++){const Z=L[K],se=Y[Z],D=te[Z];(D!==se||Z==="value")&&o(V,Z,se,D,O,$)}}P&1&&g.children!==x.children&&d(V,x.children)}else!T&&C==null&&q(V,Y,te,$,O);((oe=te.onVnodeUpdated)||ne)&&Ye(()=>{oe&&vt(oe,$,x,g),ne&&pn(x,g,$,"updated")},M)},U=(g,x,$,M,O,N,T)=>{for(let V=0;V<x.length;V++){const P=g[V],C=x[V],ne=P.el&&(P.type===_e||!ti(P,C)||P.shapeFlag&198)?f(P.el):$;m(P,C,ne,null,M,O,N,T,!0)}},q=(g,x,$,M,O)=>{if(x!==$){if(x!==Ee)for(const N in x)!ri(N)&&!(N in $)&&o(g,N,x[N],null,O,M);for(const N in $){if(ri(N))continue;const T=$[N],V=x[N];T!==V&&N!=="value"&&o(g,N,V,T,O,M)}"value"in $&&o(g,"value",x.value,$.value,O)}},le=(g,x,$,M,O,N,T,V,P)=>{const C=x.el=g?g.el:a(""),ne=x.anchor=g?g.anchor:a("");let{patchFlag:Y,dynamicChildren:te,slotScopeIds:oe}=x;oe&&(V=V?V.concat(oe):oe),g==null?(i(C,$,M),i(ne,$,M),y(x.children||[],$,ne,O,N,T,V,P)):Y>0&&Y&64&&te&&g.dynamicChildren&&g.dynamicChildren.length===te.length?(U(g.dynamicChildren,te,$,O,N,T,V),(x.key!=null||O&&x===O.subTree)&&Hc(g,x,!0)):A(g,x,$,ne,O,N,T,V,P)},J=(g,x,$,M,O,N,T,V,P)=>{x.slotScopeIds=V,g==null?x.shapeFlag&512?O.ctx.activate(x,$,M,T,P):ge(x,$,M,O,N,T,P):ae(g,x,P)},ge=(g,x,$,M,O,N,T)=>{const V=g.component=nu(g,M,O);if(Ec(g)&&(V.ctx.renderer=xt),ru(V,!1,T),V.asyncDep){if(O&&O.registerDep(V,v,T),!g.el){const P=V.subTree=Ge(Qt);I(null,P,x,$),g.placeholder=P.el}}else v(V,g,x,$,O,N,T)},ae=(g,x,$)=>{const M=x.component=g.component;if(Pf(g,x,$))if(M.asyncDep&&!M.asyncResolved){E(M,x,$);return}else M.next=x,M.update();else x.el=g.el,M.vnode=x},v=(g,x,$,M,O,N,T)=>{const V=()=>{if(g.isMounted){let{next:Y,bu:te,u:oe,parent:L,vnode:K}=g;{const me=jc(g);if(me){Y&&(Y.el=K.el,E(g,Y,T)),me.asyncDep.then(()=>{Ye(()=>{g.isUnmounted||C()},O)});return}}let Z=Y,se;fn(g,!1),Y?(Y.el=K.el,E(g,Y,T)):Y=K,te&&Oi(te),(se=Y.props&&Y.props.onVnodeBeforeUpdate)&&vt(se,L,Y,K),fn(g,!0);const D=Ss(g),F=g.subTree;g.subTree=D,m(F,D,f(F.el),Lt(F),g,O,N),Y.el=D.el,Z===null&&Df(g,D.el),oe&&Ye(oe,O),(se=Y.props&&Y.props.onVnodeUpdated)&&Ye(()=>vt(se,L,Y,K),O)}else{let Y;const{el:te,props:oe}=x,{bm:L,m:K,parent:Z,root:se,type:D}=g,F=ci(x);fn(g,!1),L&&Oi(L),!F&&(Y=oe&&oe.onVnodeBeforeMount)&&vt(Y,Z,x),fn(g,!0);{se.ce&&se.ce._hasShadowRoot()&&se.ce._injectChildStyle(D,g.parent?g.parent.type:void 0);const me=g.subTree=Ss(g);m(null,me,$,M,g,O,N),x.el=me.el}if(K&&Ye(K,O),!F&&(Y=oe&&oe.onVnodeMounted)){const me=x;Ye(()=>vt(Y,Z,me),O)}(x.shapeFlag&256||Z&&ci(Z.vnode)&&Z.vnode.shapeFlag&256)&&g.a&&Ye(g.a,O),g.isMounted=!0,x=$=M=null}};g.scope.on();const P=g.effect=new ic(V);g.scope.off();const C=g.update=P.run.bind(P),ne=g.job=P.runIfDirty.bind(P);ne.i=g,ne.id=g.uid,P.scheduler=()=>Mo(ne),fn(g,!0),C()},E=(g,x,$)=>{x.component=g;const M=g.vnode.props;g.vnode=x,g.next=null,Wf(g,x.props,M,$),Kf(g,x.children,$),Kt(),bs(g),qt()},A=(g,x,$,M,O,N,T,V,P=!1)=>{const C=g&&g.children,ne=g?g.shapeFlag:0,Y=x.children,{patchFlag:te,shapeFlag:oe}=x;if(te>0){if(te&128){ie(C,Y,$,M,O,N,T,V,P);return}else if(te&256){X(C,Y,$,M,O,N,T,V,P);return}}oe&8?(ne&16&&lt(C,O,N),Y!==C&&d($,Y)):ne&16?oe&16?ie(C,Y,$,M,O,N,T,V,P):lt(C,O,N,!0):(ne&8&&d($,""),oe&16&&y(Y,$,M,O,N,T,V,P))},X=(g,x,$,M,O,N,T,V,P)=>{g=g||Bn,x=x||Bn;const C=g.length,ne=x.length,Y=Math.min(C,ne);let te;for(te=0;te<Y;te++){const oe=x[te]=P?Bt(x[te]):St(x[te]);m(g[te],oe,$,null,O,N,T,V,P)}C>ne?lt(g,O,N,!0,!1,Y):y(x,$,M,O,N,T,V,P,Y)},ie=(g,x,$,M,O,N,T,V,P)=>{let C=0;const ne=x.length;let Y=g.length-1,te=ne-1;for(;C<=Y&&C<=te;){const oe=g[C],L=x[C]=P?Bt(x[C]):St(x[C]);if(ti(oe,L))m(oe,L,$,null,O,N,T,V,P);else break;C++}for(;C<=Y&&C<=te;){const oe=g[Y],L=x[te]=P?Bt(x[te]):St(x[te]);if(ti(oe,L))m(oe,L,$,null,O,N,T,V,P);else break;Y--,te--}if(C>Y){if(C<=te){const oe=te+1,L=oe<ne?x[oe].el:M;for(;C<=te;)m(null,x[C]=P?Bt(x[C]):St(x[C]),$,L,O,N,T,V,P),C++}}else if(C>te)for(;C<=Y;)ye(g[C],O,N,!0),C++;else{const oe=C,L=C,K=new Map;for(C=L;C<=te;C++){const et=x[C]=P?Bt(x[C]):St(x[C]);et.key!=null&&K.set(et.key,C)}let Z,se=0;const D=te-L+1;let F=!1,me=0;const it=new Array(D);for(C=0;C<D;C++)it[C]=0;for(C=oe;C<=Y;C++){const et=g[C];if(se>=D){ye(et,O,N,!0);continue}let yt;if(et.key!=null)yt=K.get(et.key);else for(Z=L;Z<=te;Z++)if(it[Z-L]===0&&ti(et,x[Z])){yt=Z;break}yt===void 0?ye(et,O,N,!0):(it[yt-L]=C+1,yt>=me?me=yt:F=!0,m(et,x[yt],$,null,O,N,T,V,P),se++)}const Cn=F?Gf(it):Bn;for(Z=Cn.length-1,C=D-1;C>=0;C--){const et=L+C,yt=x[et],ds=x[et+1],ps=et+1<ne?ds.el||Fc(ds):M;it[C]===0?m(null,yt,$,ps,O,N,T,V,P):F&&(Z<0||C!==Cn[Z]?xe(yt,$,ps,2):Z--)}}},xe=(g,x,$,M,O=null)=>{const{el:N,type:T,transition:V,children:P,shapeFlag:C}=g;if(C&6){xe(g.component.subTree,x,$,M);return}if(C&128){g.suspense.move(x,$,M);return}if(C&64){T.move(g,x,$,xt);return}if(T===_e){i(N,x,$);for(let Y=0;Y<P.length;Y++)xe(P[Y],x,$,M);i(g.anchor,x,$);return}if(T===Bi){R(g,x,$);return}if(M!==2&&C&1&&V)if(M===0)V.beforeEnter(N),i(N,x,$),Ye(()=>V.enter(N),O);else{const{leave:Y,delayLeave:te,afterLeave:oe}=V,L=()=>{g.ctx.isUnmounted?r(N):i(N,x,$)},K=()=>{N._isLeaving&&N[ff](!0),Y(N,()=>{L(),oe&&oe()})};te?te(N,L,K):K()}else i(N,x,$)},ye=(g,x,$,M=!1,O=!1)=>{const{type:N,props:T,ref:V,children:P,dynamicChildren:C,shapeFlag:ne,patchFlag:Y,dirs:te,cacheIndex:oe,memo:L}=g;if(Y===-2&&(O=!1),V!=null&&(Kt(),ai(V,null,$,g,!0),qt()),oe!=null&&(x.renderCache[oe]=void 0),ne&256){x.ctx.deactivate(g);return}const K=ne&1&&te,Z=!ci(g);let se;if(Z&&(se=T&&T.onVnodeBeforeUnmount)&&vt(se,x,g),ne&6)Be(g.component,$,M);else{if(ne&128){g.suspense.unmount($,M);return}K&&pn(g,null,x,"beforeUnmount"),ne&64?g.type.remove(g,x,$,xt,M):C&&!C.hasOnce&&(N!==_e||Y>0&&Y&64)?lt(C,x,$,!1,!0):(N===_e&&Y&384||!O&&ne&16)&&lt(P,x,$),M&&Oe(g)}const D=L!=null&&oe==null;(Z&&(se=T&&T.onVnodeUnmounted)||K||D)&&Ye(()=>{se&&vt(se,x,g),K&&pn(g,null,x,"unmounted"),D&&(g.el=null)},$)},Oe=g=>{const{type:x,el:$,anchor:M,transition:O}=g;if(x===_e){Ne($,M);return}if(x===Bi){_(g);return}const N=()=>{r($),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(g.shapeFlag&1&&O&&!O.persisted){const{leave:T,delayLeave:V}=O,P=()=>T($,N);V?V(g.el,N,P):P()}else N()},Ne=(g,x)=>{let $;for(;g!==x;)$=u(g),r(g),g=$;r(x)},Be=(g,x,$)=>{const{bum:M,scope:O,job:N,subTree:T,um:V,m:P,a:C}=g;Cs(P),Cs(C),M&&Oi(M),O.stop(),N&&(N.flags|=8,ye(T,g,x,$)),V&&Ye(V,x),Ye(()=>{g.isUnmounted=!0},x)},lt=(g,x,$,M=!1,O=!1,N=0)=>{for(let T=N;T<g.length;T++)ye(g[T],x,$,M,O)},Lt=g=>{if(g.shapeFlag&6)return Lt(g.component.subTree);if(g.shapeFlag&128)return g.suspense.next();const x=u(g.anchor||g.el),$=x&&x[df];return $?u($):x};let bt=!1;const Yt=(g,x,$)=>{let M;g==null?x._vnode&&(ye(x._vnode,null,null,!0),M=x._vnode.component):m(x._vnode||null,g,x,null,null,null,$),x._vnode=g,bt||(bt=!0,bs(M),vc(),bt=!1)},xt={p:m,um:ye,m:xe,r:Oe,mt:ge,mc:y,pc:A,pbc:U,n:Lt,o:e};return{render:Yt,hydrate:void 0,createApp:Lf(Yt)}}function $r({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function fn({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Vf(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Hc(e,t,n=!1){const i=e.children,r=t.children;if(ce(i)&&ce(r))for(let o=0;o<i.length;o++){const s=i[o];let a=r[o];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[o]=Bt(r[o]),a.el=s.el),!n&&a.patchFlag!==-2&&Hc(s,a)),a.type===pr&&(a.patchFlag===-1&&(a=r[o]=Bt(a)),a.el=s.el),a.type===Qt&&!a.el&&(a.el=s.el)}}function Gf(e){const t=e.slice(),n=[0];let i,r,o,s,a;const c=e.length;for(i=0;i<c;i++){const l=e[i];if(l!==0){if(r=n[n.length-1],e[r]<l){t[i]=r,n.push(i);continue}for(o=0,s=n.length-1;o<s;)a=o+s>>1,e[n[a]]<l?o=a+1:s=a;l<e[n[o]]&&(o>0&&(t[i]=n[o-1]),n[o]=i)}}for(o=n.length,s=n[o-1];o-- >0;)n[o]=s,s=t[s];return n}function jc(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:jc(t)}function Cs(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Fc(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?Fc(t.subTree):null}const Kc=e=>e.__isSuspense;function Yf(e,t){t&&t.pendingBranch?ce(e)?t.effects.push(...e):t.effects.push(e):rf(e)}const _e=Symbol.for("v-fgt"),pr=Symbol.for("v-txt"),Qt=Symbol.for("v-cmt"),Bi=Symbol.for("v-stc"),di=[];let tt=null;function j(e=!1){di.push(tt=e?null:[])}function Zf(){di.pop(),tt=di[di.length-1]||null}let hi=1;function As(e,t=!1){hi+=e,e<0&&tt&&t&&(tt.hasOnce=!0)}function qc(e){return e.dynamicChildren=hi>0?tt||Bn:null,Zf(),hi>0&&tt&&tt.push(e),e}function G(e,t,n,i,r,o){return qc(h(e,t,n,i,r,o,!0))}function Ot(e,t,n,i,r){return qc(Ge(e,t,n,i,r,!0))}function Uc(e){return e?e.__v_isVNode===!0:!1}function ti(e,t){return e.type===t.type&&e.key===t.key}const Vc=({key:e})=>e??null,Pi=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?Me(e)||je(e)||pe(e)?{i:ot,r:e,k:t,f:!!n}:e:null);function h(e,t=null,n=null,i=0,r=null,o=e===_e?0:1,s=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Vc(t),ref:t&&Pi(t),scopeId:kc,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:ot};return a?(Do(c,n),o&128&&e.normalize(c)):n&&(c.shapeFlag|=Me(n)?8:16),hi>0&&!s&&tt&&(c.patchFlag>0||o&6)&&c.patchFlag!==32&&tt.push(c),c}const Ge=Xf;function Xf(e,t=null,n=null,i=0,r=null,o=!1){if((!e||e===_f)&&(e=Qt),Uc(e)){const a=jn(e,t,!0);return n&&Do(a,n),hi>0&&!o&&tt&&(a.shapeFlag&6?tt[tt.indexOf(e)]=a:tt.push(a)),a.patchFlag=-2,a}if(cu(e)&&(e=e.__vccOpts),t){t=Jf(t);let{class:a,style:c}=t;a&&!Me(a)&&(t.class=Ie(a)),$e(c)&&(Ro(c)&&!ce(c)&&(c=ze({},c)),t.style=Xe(c))}const s=Me(e)?1:Kc(e)?128:pf(e)?64:$e(e)?4:pe(e)?2:0;return h(e,t,n,i,r,s,o,!0)}function Jf(e){return e?Ro(e)||Nc(e)?ze({},e):e:null}function jn(e,t,n=!1,i=!1){const{props:r,ref:o,patchFlag:s,children:a,transition:c}=e,l=t?Qf(r||{},t):r,d={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Vc(l),ref:t&&t.ref?n&&o?ce(o)?o.concat(Pi(t)):[o,Pi(t)]:Pi(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==_e?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&jn(e.ssContent),ssFallback:e.ssFallback&&jn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return c&&i&&Oo(d,c.clone(d)),d}function ft(e=" ",t=0){return Ge(pr,null,e,t)}function Gc(e,t){const n=Ge(Bi,null,e);return n.staticCount=t,n}function Se(e="",t=!1){return t?(j(),Ot(Qt,null,e)):Ge(Qt,null,e)}function St(e){return e==null||typeof e=="boolean"?Ge(Qt):ce(e)?Ge(_e,null,e.slice()):Uc(e)?Bt(e):Ge(pr,null,String(e))}function Bt(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:jn(e)}function Do(e,t){let n=0;const{shapeFlag:i}=e;if(t==null)t=null;else if(ce(t))n=16;else if(typeof t=="object")if(i&65){const r=t.default;r&&(r._c&&(r._d=!1),Do(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!Nc(t)?t._ctx=ot:r===3&&ot&&(ot.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else pe(t)?(t={default:t,_ctx:ot},n=32):(t=String(t),i&64?(n=16,t=[ft(t)]):n=8);e.children=t,e.shapeFlag|=n}function Qf(...e){const t={};for(let n=0;n<e.length;n++){const i=e[n];for(const r in i)if(r==="class")t.class!==i.class&&(t.class=Ie([t.class,i.class]));else if(r==="style")t.style=Xe([t.style,i.style]);else if(nr(r)){const o=t[r],s=i[r];s&&o!==s&&!(ce(o)&&o.includes(s))?t[r]=o?[].concat(o,s):s:s==null&&o==null&&!ir(r)&&(t[r]=s)}else r!==""&&(t[r]=i[r])}return t}function vt(e,t,n,i=null){It(e,t,7,[n,i])}const eu=Ic();let tu=0;function nu(e,t,n){const i=e.type,r=(t?t.appContext:e.appContext)||eu,o={uid:tu++,vnode:e,type:i,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ep(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Pc(i,r),emitsOptions:Lc(i,r),emit:null,emitted:null,propsDefaults:Ee,inheritAttrs:i.inheritAttrs,ctx:Ee,data:Ee,props:Ee,attrs:Ee,slots:Ee,refs:Ee,setupState:Ee,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=t?t.root:o,o.emit=Mf.bind(null,o),e.ce&&e.ce(o),o}let Ve=null;const iu=()=>Ve||ot;let qi,so;{const e=sr(),t=(n,i)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(i),o=>{r.length>1?r.forEach(s=>s(o)):r[0](o)}};qi=t("__VUE_INSTANCE_SETTERS__",n=>Ve=n),so=t("__VUE_SSR_SETTERS__",n=>gi=n)}const Si=e=>{const t=Ve;return qi(e),e.scope.on(),()=>{e.scope.off(),qi(t)}},Ts=()=>{Ve&&Ve.scope.off(),qi(null)};function Yc(e){return e.vnode.shapeFlag&4}let gi=!1;function ru(e,t=!1,n=!1){t&&so(t);const{props:i,children:r}=e.vnode,o=Yc(e);zf(e,i,o,t),Ff(e,r,n||t);const s=o?ou(e,t):void 0;return t&&so(!1),s}function ou(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Sf);const{setup:i}=n;if(i){Kt();const r=e.setupContext=i.length>1?au(e):null,o=Si(e),s=_i(i,e,0,[e.props,r]),a=Ga(s);if(qt(),o(),(a||e.sp)&&!ci(e)&&$c(e),a){if(s.then(Ts,Ts),t)return s.then(c=>{Is(e,c)}).catch(c=>{cr(c,e,0)});e.asyncDep=s}else Is(e,s)}else Zc(e)}function Is(e,t,n){pe(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:$e(t)&&(e.setupState=bc(t)),Zc(e)}function Zc(e,t,n){const i=e.type;e.render||(e.render=i.render||Ct);{const r=Si(e);Kt();try{$f(e)}finally{qt(),r()}}}const su={get(e,t){return We(e,"get",""),e[t]}};function au(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,su),slots:e.slots,emit:e.emit,expose:t}}function fr(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(bc(Vp(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in li)return li[n](e)},has(t,n){return n in t||n in li}})):e.proxy}function cu(e){return pe(e)&&"__vccOpts"in e}const Ae=(e,t)=>Jp(e,t,gi),lu="3.5.32";/**
* @vue/runtime-dom v3.5.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ao;const Ls=typeof window<"u"&&window.trustedTypes;if(Ls)try{ao=Ls.createPolicy("vue",{createHTML:e=>e})}catch{}const Xc=ao?e=>ao.createHTML(e):e=>e,du="http://www.w3.org/2000/svg",pu="http://www.w3.org/1998/Math/MathML",Nt=typeof document<"u"?document:null,Rs=Nt&&Nt.createElement("template"),fu={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const r=t==="svg"?Nt.createElementNS(du,e):t==="mathml"?Nt.createElementNS(pu,e):n?Nt.createElement(e,{is:n}):Nt.createElement(e);return e==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:e=>Nt.createTextNode(e),createComment:e=>Nt.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Nt.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,r,o){const s=n?n.previousSibling:t.lastChild;if(r&&(r===o||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===o||!(r=r.nextSibling)););else{Rs.innerHTML=Xc(i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e);const a=Rs.content;if(i==="svg"||i==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}t.insertBefore(a,n)}return[s?s.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},uu=Symbol("_vtc");function hu(e,t,n){const i=e[uu];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Ms=Symbol("_vod"),gu=Symbol("_vsh"),mu=Symbol(""),bu=/(?:^|;)\s*display\s*:/;function xu(e,t,n){const i=e.style,r=Me(n);let o=!1;if(n&&!r){if(t)if(Me(t))for(const s of t.split(";")){const a=s.slice(0,s.indexOf(":")).trim();n[a]==null&&Di(i,a,"")}else for(const s in t)n[s]==null&&Di(i,s,"");for(const s in n)s==="display"&&(o=!0),Di(i,s,n[s])}else if(r){if(t!==n){const s=i[mu];s&&(n+=";"+s),i.cssText=n,o=bu.test(n)}}else t&&e.removeAttribute("style");Ms in e&&(e[Ms]=o?i.display:"",e[gu]&&(i.display="none"))}const Os=/\s*!important$/;function Di(e,t,n){if(ce(n))n.forEach(i=>Di(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=yu(e,t);Os.test(n)?e.setProperty(rn(i),n.replace(Os,""),"important"):e[i]=n}}const Ns=["Webkit","Moz","ms"],Er={};function yu(e,t){const n=Er[t];if(n)return n;let i=dt(t);if(i!=="filter"&&i in e)return Er[t]=i;i=Xa(i);for(let r=0;r<Ns.length;r++){const o=Ns[r]+i;if(o in e)return Er[t]=o}return t}const Bs="http://www.w3.org/1999/xlink";function Ps(e,t,n,i,r,o=Sp(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Bs,t.slice(6,t.length)):e.setAttributeNS(Bs,t,n):n==null||o&&!Qa(n)?e.removeAttribute(t):e.setAttribute(t,o?"":Tt(n)?String(n):n)}function Ds(e,t,n,i,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Xc(n):n);return}const o=e.tagName;if(t==="value"&&o!=="PROGRESS"&&!o.includes("-")){const a=o==="OPTION"?e.getAttribute("value")||"":e.value,c=n==null?e.type==="checkbox"?"on":"":String(n);(a!==c||!("_value"in e))&&(e.value=c),n==null&&e.removeAttribute(t),e._value=n;return}let s=!1;if(n===""||n==null){const a=typeof e[t];a==="boolean"?n=Qa(n):n==null&&a==="string"?(n="",s=!0):a==="number"&&(n=0,s=!0)}try{e[t]=n}catch{}s&&e.removeAttribute(r||t)}function gn(e,t,n,i){e.addEventListener(t,n,i)}function vu(e,t,n,i){e.removeEventListener(t,n,i)}const zs=Symbol("_vei");function wu(e,t,n,i,r=null){const o=e[zs]||(e[zs]={}),s=o[t];if(i&&s)s.value=i;else{const[a,c]=ku(t);if(i){const l=o[t]=$u(i,r);gn(e,a,l,c)}else s&&(vu(e,a,s,c),o[t]=void 0)}}const Ws=/(?:Once|Passive|Capture)$/;function ku(e){let t;if(Ws.test(e)){t={};let i;for(;i=e.match(Ws);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):rn(e.slice(2)),t]}let Cr=0;const _u=Promise.resolve(),Su=()=>Cr||(_u.then(()=>Cr=0),Cr=Date.now());function $u(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;It(Eu(i,n.value),t,5,[i])};return n.value=e,n.attached=Su(),n}function Eu(e,t){if(ce(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const Hs=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Cu=(e,t,n,i,r,o)=>{const s=r==="svg";t==="class"?hu(e,i,s):t==="style"?xu(e,n,i):nr(t)?ir(t)||wu(e,t,n,i,o):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Au(e,t,i,s))?(Ds(e,t,i),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ps(e,t,i,s,o,t!=="value")):e._isVueCE&&(Tu(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!Me(i)))?Ds(e,dt(t),i,o,t):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),Ps(e,t,i,s))};function Au(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&Hs(t)&&pe(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Hs(t)&&Me(n)?!1:t in e}function Tu(e,t){const n=e._def.props;if(!n)return!1;const i=dt(t);return Array.isArray(n)?n.some(r=>dt(r)===i):Object.keys(n).some(r=>dt(r)===i)}const Ui=e=>{const t=e.props["onUpdate:modelValue"]||!1;return ce(t)?n=>Oi(t,n):t};function Iu(e){e.target.composing=!0}function js(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Wn=Symbol("_assign");function Fs(e,t,n){return t&&(e=e.trim()),n&&(e=$o(e)),e}const jt={created(e,{modifiers:{lazy:t,trim:n,number:i}},r){e[Wn]=Ui(r);const o=i||r.props&&r.props.type==="number";gn(e,t?"change":"input",s=>{s.target.composing||e[Wn](Fs(e.value,n,o))}),(n||o)&&gn(e,"change",()=>{e.value=Fs(e.value,n,o)}),t||(gn(e,"compositionstart",Iu),gn(e,"compositionend",js),gn(e,"change",js))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:i,trim:r,number:o}},s){if(e[Wn]=Ui(s),e.composing)return;const a=(o||e.type==="number")&&!/^0\d/.test(e.value)?$o(e.value):e.value,c=t??"";if(a===c)return;const l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!=="range"&&(i&&t===n||r&&e.value.trim()===c)||(e.value=c)}},Lu={deep:!0,created(e,t,n){e[Wn]=Ui(n),gn(e,"change",()=>{const i=e._modelValue,r=Ru(e),o=e.checked,s=e[Wn];if(ce(i)){const a=ec(i,r),c=a!==-1;if(o&&!c)s(i.concat(r));else if(!o&&c){const l=[...i];l.splice(a,1),s(l)}}else if(rr(i)){const a=new Set(i);o?a.add(r):a.delete(r),s(a)}else s(Jc(e,o))})},mounted:Ks,beforeUpdate(e,t,n){e[Wn]=Ui(n),Ks(e,t,n)}};function Ks(e,{value:t,oldValue:n},i){e._modelValue=t;let r;if(ce(t))r=ec(t,i.props.value)>-1;else if(rr(t))r=t.has(i.props.value);else{if(t===n)return;r=ki(t,Jc(e,!0))}e.checked!==r&&(e.checked=r)}function Ru(e){return"_value"in e?e._value:e.value}function Jc(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Mu=["ctrl","shift","alt","meta"],Ou={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>Mu.some(n=>e[`${n}Key`]&&!t.includes(n))},Wt=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),i=t.join(".");return n[i]||(n[i]=(r,...o)=>{for(let s=0;s<t.length;s++){const a=Ou[t[s]];if(a&&a(r,t))return}return e(r,...o)})},Nu={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},co=(e,t)=>{const n=e._withKeys||(e._withKeys={}),i=t.join(".");return n[i]||(n[i]=r=>{if(!("key"in r))return;const o=rn(r.key);if(t.some(s=>s===o||Nu[s]===o))return e(r)})},Bu=ze({patchProp:Cu},fu);let qs;function Pu(){return qs||(qs=qf(Bu))}const Du=(...e)=>{const t=Pu().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=Wu(i);if(!r)return;const o=t._component;!pe(o)&&!o.render&&!o.template&&(o.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const s=n(r,!1,zu(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),s},t};function zu(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Wu(e){return Me(e)?document.querySelector(e):e}const Hu=[{name:"intro",styleKey:"intro",category:"structure",fenceLength:3,description:"文首引子／导语卡。独立 bgSoft 底，区别于正文段落。",example:`::: intro
本文探讨 …
:::
`},{name:"cover",styleKey:"cover",category:"structure",fenceLength:3,attrs:[{key:"issue",description:"期号（newsletter 主题会渲染期号戳）",example:"023"},{key:"date",description:"日期",example:"2026-04-20"},{key:"kind",description:"刊物类型",example:"周刊"}],description:"封面卡（封面图 + 题头 + 可选期号戳）。",example:`::: cover
![](cover.png)

## 主标题
:::
`},{name:"author",styleKey:"author",category:"structure",fenceLength:3,attrs:[{key:"issue",description:"期号（newsletter 主题可用）",example:"023"},{key:"date",description:"日期",example:"2026-04-20"}],description:"作者栏：头像 + 名字 + 日期／期号。",example:`::: author
作者 · 日期
:::
`},{name:"section-title",styleKey:"sectionTitle",category:"structure",variantKind:"sectionTitle",fenceLength:3,description:"章节标题块（比 ## 更强势的分节）。可切 bordered / cornered。",example:`::: section-title
第一章 · 缘起
:::
`},{name:"tip",styleKey:"tip",category:"admonition",variantKind:"admonition",fenceLength:3,attrs:[{key:"variant",description:"覆盖主题默认的 admonition 骨架",enum:["accent-bar","pill-tag","ticket-notch","card-shadow","minimal-underline","terminal","dashed-border","double-border","top-bottom-rule","manpage-log","sidenote-latex","marginalia","ledger-cell","bubble-organic","magazine-pull","report-section"]}],description:"tip：小贴士／正向提示。",example:`::: tip 小贴士
内容 …
:::
`},{name:"warning",styleKey:"warning",category:"admonition",variantKind:"admonition",fenceLength:3,description:"warning：需要读者注意的提醒。",example:`::: warning 注意
内容 …
:::
`},{name:"info",styleKey:"info",category:"admonition",variantKind:"admonition",fenceLength:3,description:"info：中性说明／补充信息。",example:`::: info 说明
内容 …
:::
`},{name:"danger",styleKey:"danger",category:"admonition",variantKind:"admonition",fenceLength:3,description:"danger：高风险警告／错误示范。",example:`::: danger 警告
内容 …
:::
`},{name:"note",styleKey:"note",category:"admonition",fenceLength:3,description:"note：第五态补注（中性，不抢色，走 textMuted + noteIcon）。",example:`::: note 补注
内容 …
:::
`},{name:"quote-card",styleKey:"quoteCard",category:"content",variantKind:"quote",fenceLength:3,description:"大段引用卡。可切 classic / magazine-dropcap / column-rule / frame-brackets。",example:`::: quote-card
一段值得突出的引用 …
:::
`},{name:"highlight",styleKey:"highlight",category:"content",fenceLength:3,description:"高亮段落（bgMuted 底色块）。无 variant 切换。",example:`::: highlight
需要读者停下来的一段话 …
:::
`},{name:"compare",styleKey:"compare",category:"content",variantKind:"compare",nestable:!0,children:["pros","cons"],fenceLength:4,description:"双列对比（外层 4 个冒号，内层 pros/cons 用 3 个）。",example:`:::: compare
::: pros 优点
- A
:::
::: cons 缺点
- B
:::
::::
`},{name:"pros",styleKey:null,category:"content",parent:"compare",fenceLength:3,description:'compare 的"正面"列（必须嵌在 :::: compare 内）。',example:`::: pros 优点
- A
- B
:::
`},{name:"cons",styleKey:null,category:"content",parent:"compare",fenceLength:3,description:'compare 的"反面"列（必须嵌在 :::: compare 内）。',example:`::: cons 缺点
- A
- B
:::
`},{name:"steps",styleKey:"steps",category:"content",variantKind:"steps",fenceLength:3,description:"编号步骤列表。可切 number-circle / ribbon-chain / timeline-dot。",example:`::: steps
1. 初始化
2. 构建
3. 发布
:::
`},{name:"divider",styleKey:null,category:"navigation",variantKind:"divider",fenceLength:3,description:"装饰分隔线。可切 wave / dots / flower / rule / glyph。",example:`::: divider
:::
`},{name:"footer-cta",styleKey:"footerCTA",category:"navigation",fenceLength:3,attrs:[{key:"cta",description:"按钮文字（visual only）",example:"点此关注"},{key:"href",description:"按钮跳转 URL。为保证公众号正文可点击，建议用以下几类之一：https://mp.weixin.qq.com/s/*（同域文章）/ weixin://dl/*（小程序协议）/ tel:* / mailto:* / 页内锚点 #*。非白名单 URL 会触发 diagnose warning。",example:"https://mp.weixin.qq.com/s/xxx"}],description:"文末 CTA 块（关注、投喂、二维码收束）。href 支持公众号内链白名单。",example:`::: footer-cta 觉得有用？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/xxx
如果这篇对你有启发，欢迎关注。
:::
`},{name:"recommend",styleKey:"recommend",category:"navigation",fenceLength:3,description:"推荐阅读列表。",example:`::: recommend
- [前作](url)
- [续篇](url)
:::
`},{name:"qrcode",styleKey:"qrcode",category:"media",fenceLength:3,description:"二维码块（图 + 说明文案）。",example:`::: qrcode
![](qr.png)
扫码关注
:::
`},{name:"mpvoice",styleKey:"mpvoice",category:"media",fenceLength:3,attrs:[{key:"src",description:"音频 URL（公众号素材库链接）"},{key:"title",description:"标题"}],description:"公众号语音卡（占位，粘贴后在公众号编辑器补真 mpvoice 节点）。",example:`::: mpvoice title="片头曲" src="..."
:::
`},{name:"mpvideo",styleKey:"mpvideo",category:"media",fenceLength:3,attrs:[{key:"src",description:"视频 URL（公众号素材库链接）"},{key:"title",description:"标题"}],description:"公众号视频卡（占位，粘贴后在公众号编辑器补真 mpvideo 节点）。",example:`::: mpvideo title="片段" src="..."
:::
`},{name:"abstract",styleKey:"abstract",category:"signature",fenceLength:3,description:"文首 tl;dr 摘要块（business-finance / industry-observer 等深度主题）。",example:`::: abstract 摘要
本文论点 …
:::
`},{name:"key-number",styleKey:"keyNumber",category:"signature",fenceLength:3,attrs:[{key:"value",description:"大字号数字本体",example:"42%"}],description:"大数字 + 说明（研究报告／内参版面）。attrs.value 为数字，info 为 kicker。",example:`::: key-number value="42%" 同比涨幅
占全年营收 12pp …
:::
`},{name:"see-also",styleKey:"seeAlso",category:"signature",fenceLength:3,description:'相关阅读链接列表（academic-frontier / tech-explainer 的"扩展阅读"）。',example:`::: see-also 延伸阅读
- [相关论文](url)
:::
`},{name:"free",styleKey:null,category:"free",fenceLength:3,description:"兜底容器：渲染器刻意不施加主题样式，写不归类内容。",example:`::: free
编辑部补注 …
:::
`}],en=Object.freeze(Hu),ju=new Map(en.map(e=>[e.name,e]));function Fu(e){return ju.get(e)}en.map(e=>e.name);const ur=en.filter(e=>e.styleKey!==null);ur.map(e=>e.styleKey);Object.fromEntries(ur.map(e=>[e.name,e.styleKey]));Object.fromEntries(ur.map(e=>[e.styleKey,e.name]));const Ku={admonition:"accent-bar",quote:"classic",compare:"column-card",steps:"number-circle",divider:"rule",sectionTitle:"bordered",codeBlock:"bare"},Qc={admonition:["accent-bar","pill-tag","ticket-notch","card-shadow","minimal-underline","terminal","dashed-border","double-border","top-bottom-rule","manpage-log","sidenote-latex","marginalia","ledger-cell","bubble-organic","magazine-pull","report-section"],quote:["classic","magazine-dropcap","column-rule","frame-brackets"],compare:["column-card","stacked-row","ledger"],steps:["number-circle","ribbon-chain","timeline-dot"],divider:["wave","dots","flower","rule","glyph"],sectionTitle:["bordered","cornered"],codeBlock:["bare","header-bar"]};class Ar extends Error{constructor(t){super(t),this.name="ThemeAuthoringError"}}const qu=/```[\s\S]*?```/g,Uu=/`[^`\n]+`/g,Vu=/https?:\/\/\S+/gi,Gu=/\]\([^)\n]*\)/g,Yu=/<[^>\n]+>/g,Zu=/^(?: {4}|\t)[^\n]*$/gm;function Xu(e){const t=[];for(const i of[qu,Uu,Vu,Gu,Yu,Zu]){i.lastIndex=0;let r;for(;(r=i.exec(e))!==null;)t.push({from:r.index,to:r.index+r[0].length}),r[0].length===0&&i.lastIndex++}t.sort((i,r)=>i.from-r.from);const n=[];for(const i of t){const r=n[n.length-1];r&&i.from<=r.to?r.to=Math.max(r.to,i.to):n.push({from:i.from,to:i.to})}return n}function Ju(e,t){if(t.length===0)return e;const n=e.split("");for(const i of t)for(let r=i.from;r<i.to;r++)n[r]="\0";return n.join("")}const mi="一-鿿㐀-䶿",ii=new RegExp(`[${mi}]`),Us=new RegExp(`([${mi}])([A-Za-z0-9])|([A-Za-z0-9])([${mi}])`,"g"),Vs=new RegExp(`([${mi}])([,.!?:;])`,"g"),Gs=new RegExp(`([,.!?:;])([${mi}])`,"g"),Ys=/"([^"\n]*?)"/g,Zs=/\.{3,}/g,Xs=/--/g,Js={",":"，",".":"。","!":"！","?":"？",":":"：",";":"；"};function Qu(e){const t=[];Us.lastIndex=0;let n;for(;(n=Us.exec(e))!==null;){const i=n[0],r=i[0],o=i[1];t.push({from:n.index,to:n.index+i.length,code:"zh-ascii-spacing",original:i,replacement:`${r} ${o}`})}return t}function eh(e){const t=[],n=new Set;Vs.lastIndex=0;let i;for(;(i=Vs.exec(e))!==null;){const r=i.index+i[1].length;if(n.has(r))continue;const o=Js[i[2]];o&&(i[2]==="."&&e[r+1]==="."||(n.add(r),t.push({from:i.index,to:i.index+i[0].length,code:"zh-halfwidth-punct",original:i[0],replacement:i[1]+o})))}for(Gs.lastIndex=0;(i=Gs.exec(e))!==null;){const r=i.index;if(n.has(r))continue;const o=i.index>0?e[i.index-1]:"";if(/\d/.test(o))continue;const s=Js[i[1]];s&&(i[1]==="."&&o==="."||(n.add(r),t.push({from:i.index,to:i.index+i[0].length,code:"zh-halfwidth-punct",original:i[0],replacement:s+i[2]})))}return t}function th(e){const t=[];Ys.lastIndex=0;let n;for(;(n=Ys.exec(e))!==null;){const i=n[1];ii.test(i)&&t.push({from:n.index,to:n.index+n[0].length,code:"zh-straight-quote",original:n[0],replacement:`“${i}”`})}return t}function nh(e){const t=[];Zs.lastIndex=0;let n;for(;(n=Zs.exec(e))!==null;){const i=n.index>0?e[n.index-1]:"",r=e[n.index+n[0].length]??"";!ii.test(i)&&!ii.test(r)||t.push({from:n.index,to:n.index+n[0].length,code:"zh-dash-ellipsis",original:n[0],replacement:"……"})}for(Xs.lastIndex=0;(n=Xs.exec(e))!==null;){const i=n.index>0?e[n.index-1]:"",r=e[n.index+2]??"";!ii.test(i)&&!ii.test(r)||t.push({from:n.index,to:n.index+2,code:"zh-dash-ellipsis",original:"--",replacement:"——"})}return t}function zo(e){if(!e)return[];const t=Ju(e,Xu(e)),n=[...Qu(t),...eh(t),...th(t),...nh(t)];return n.sort((i,r)=>i.from-r.from||i.code.localeCompare(r.code)),n}function ih(e){const t=zo(e);if(t.length===0)return e;let n=e,i=1/0;for(let r=t.length-1;r>=0;r--){const o=t[r];o.to>i||(n=n.slice(0,o.from)+o.replacement+n.slice(o.to),i=o.from)}return n}const rh=[/^https:\/\/mp\.weixin\.qq\.com\/s\//i,/^weixin:\/\/dl\//i,/^tel:/i,/^mailto:/i,/^#/],el=new Set(en.map(e=>e.name)),oh=/^(:{3,})[ \t]*([A-Za-z][\w-]*)?[ \t]*(.*?)[ \t]*$/,sh=/^(:{3,})[ \t]*$/,ah=/^([ \t]*)([-*+]|\d+\.)\s/;function ch(e){const t=[],n=e.split(`
`),i=[],r=new Array(n.length);let o=0;for(let s=0;s<n.length;s++)r[s]=o,o+=n[s].length+1;for(let s=0;s<n.length;s++){const a=n[s],c=r[s],l=c+a.length,d=ah.exec(a);if(d){let w=0;for(const y of d[1])w+=y==="	"?4:1;if(w>=4){const y=c+d[1].length,W=y+d[2].length;t.push({from:y,to:W,severity:"warning",code:"list-too-deep",message:'列表嵌套 ≥ 3 层——公众号渲染时会被扁平化为带"·"前缀的段落，建议改为两级以内。'})}}const f=sh.exec(a);if(f){const w=f[1].length;if(i.length===0)continue;i[i.length-1].colons===w&&i.pop();continue}const u=oh.exec(a);if(!u)continue;const b=u[1].length,p=u[2]??"",m=u[3]??"";if(!p)continue;const S=c+a.indexOf(u[1]),I=a.indexOf(p,u[1].length),z=c+(I>=0?I:u[1].length+1),R=z+p.length;if(!el.has(p)){const w=fh(p);t.push({from:z,to:R,severity:"error",code:"unknown-container",message:w?`未知容器 "${p}"——是否想写 "${w}"？合法名见 docs/container-syntax.md 速查表。`:`未知容器 "${p}"。合法 fence 名见 docs/container-syntax.md 速查表。`}),i.push({line:s,colons:b,name:p,openStart:S,openEnd:l});continue}const _=Fu(p);if(_.fenceLength!==b){const w=":".repeat(_.fenceLength);t.push({from:S,to:S+b,severity:"error",code:"fence-length-wrong",message:`容器 "${p}" 应使用 ${_.fenceLength} 个冒号（"${w}"）；当前是 ${b} 个。`+(p==="compare"?" compare 外层必须 ::::，内层 pros/cons 才能用 :::。":_.parent?` 作为 ${_.parent} 的子容器，必须用 :::。`:"")})}if(_.parent){const w=i[i.length-1];(!w||w.name!==_.parent)&&t.push({from:z,to:R,severity:"error",code:"nested-misplaced",message:`"${p}" 必须嵌在 ":::: ${_.parent}" 容器内；当前在外层孤立使用。`})}const k=dh(m);if(k&&_.variantKind){const w=Qc[_.variantKind];if(w&&!w.includes(k.value)){const y=c+a.indexOf("variant=")+8;t.push({from:y,to:y+k.value.length,severity:"warning",code:"unknown-variant",message:`未知 variant "${k.value}" —— "${p}" (${_.variantKind}) 合法取值：`+w.join(" / ")})}}else k&&!_.variantKind&&t.push({from:c+a.indexOf("variant="),to:c+a.indexOf("variant=")+8+k.value.length,severity:"info",code:"unknown-variant",message:`容器 "${p}" 不支持 variant 覆盖（无 variantKind），该声明会被忽略。`});if(p==="footer-cta"){const w=ph(m);if(w&&!rh.some(y=>y.test(w.value))){const y=a.indexOf("href=",a.indexOf(p)+p.length),W=c+y+5;t.push({from:W,to:W+(w.rawLen??w.value.length),severity:"warning",code:"footer-cta-outlink",message:`footer-cta 的 "${w.value}" 在公众号正文里不可直接点击——建议改为 mp.weixin.qq.com/s/* 同域文章链 / weixin://dl/* 小程序协议 / tel: / mailto: / 页内锚点 #；或把该 URL 放到公众号后台"阅读原文"位置。`})}}const B=/(?:^|\s)([a-zA-Z_][\w-]*):[ \t]/.exec(m);if(B&&!/=/.test(m.slice(0,B.index+B[0].length))){const w=a.indexOf(B[1]+":",a.indexOf(p)+p.length);if(w>=0){const y=c+w;t.push({from:y,to:y+B[1].length+1,severity:"warning",code:"yaml-style-attr",message:`open 行的 "${B[1]}:" 看起来像 YAML；容器属性只接受 "key=value" 写法。 若是标题文字请忽略此告警。`})}}i.push({line:s,colons:b,name:p,openStart:S,openEnd:l})}for(const s of i)t.push({from:s.openStart,to:s.openEnd,severity:"error",code:"unclosed-fence",message:`"${s.name}" 容器未闭合——末尾缺少 "${":".repeat(s.colons)}" 行。`});for(const s of zo(e))t.push({from:s.from,to:s.to,severity:"info",code:s.code,message:lh[s.code](s.original,s.replacement)});return t.sort((s,a)=>s.from-a.from)}const lh={"zh-ascii-spacing":e=>`中英混排建议加空格："${e}"——Toolbar"一键修复中文排版"可批量处理。`,"zh-halfwidth-punct":(e,t)=>`中文后请用全角标点："${e}" → "${t}"。`,"zh-straight-quote":(e,t)=>`含 CJK 引语建议用弯引号："${e}" → "${t}"。`,"zh-dash-ellipsis":(e,t)=>e.startsWith(".")?`中文省略号建议用 …… 代替 ${e.length} 个英文句点。`:`中文破折号建议用 —— 代替两个半角连字符（${e} → ${t}）。`};function dh(e){const t=/(^|\s)variant=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??""}:null}function ph(e){const t=/(^|\s)href=("([^"]*)"|'([^']*)'|(\S+))/.exec(e);return t?{value:t[3]??t[4]??t[5]??"",rawLen:t[2].length}:null}function fh(e){let t=null,n=3;for(const i of el){const r=uh(e,i);r<n&&(n=r,t=i)}return t}function uh(e,t){if(e===t)return 0;if(Math.abs(e.length-t.length)>2)return 3;const n=e.length,i=t.length,r=new Array((i+1)*2);for(let o=0;o<=i;o++)r[o]=o;for(let o=1;o<=n;o++){const s=(o&1)*(i+1),a=(o-1&1)*(i+1);r[s]=o;for(let c=1;c<=i;c++){const l=e[o-1]===t[c-1]?0:1;r[s+c]=Math.min(r[a+c]+1,r[s+c-1]+1,r[a+c-1]+l)}}return r[(n&1)*(i+1)+i]}const hh=en.map(e=>({label:e.name,type:e.parent?"interface":"class",detail:e.category,info:e.description})),gh=new Map(en.filter(e=>e.variantKind!==void 0).map(e=>{const n=(Qc[e.variantKind]??[]).map(i=>({label:i,type:"enum",detail:e.variantKind}));return[e.name,n]}));function mh(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from),i=/^(:{3,})\s+([A-Za-z][\w-]*)?$/.exec(n);if(!i)return null;const r=i[2]??"";return{from:t.from+(i[0].length-r.length),to:e.pos,options:hh,validFor:/^[A-Za-z0-9_-]*$/}}function bh(e){const t=e.state.doc.lineAt(e.pos),n=t.text.slice(0,e.pos-t.from),i=/^(:{3,})\s+([A-Za-z][\w-]*)\b/.exec(t.text);if(!i)return null;const r=i[2],o=gh.get(r);if(!o||o.length===0)return null;const s=/variant=(["']?)([A-Za-z0-9_-]*)$/.exec(n);if(!s)return null;const a=s[2];return{from:e.pos-a.length,to:e.pos,options:o,validFor:/^[A-Za-z0-9_-]*$/}}function xh(){return Yd({override:[bh,mh],activateOnTyping:!0,icons:!1})}const yh={error:"error",warning:"warning",info:"info"};function vh(){return Zd(e=>{const t=e.state.doc.toString();return ch(t).map(i=>({from:Math.min(i.from,t.length),to:Math.min(Math.max(i.to,i.from),t.length),severity:yh[i.severity],message:i.message,source:`wechat-typeset:${i.code}`}))},{delay:500})}function wh(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}function lo(e,t){return Array(t+1).join(e)}function tl(e){return e.replace(/^\n*/,"")}function nl(e){for(var t=e.length;t>0&&e[t-1]===`
`;)t--;return e.substring(0,t)}function il(e){return nl(tl(e))}var kh=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function Wo(e){return Ho(e,kh)}var rl=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function ol(e){return Ho(e,rl)}function _h(e){return al(e,rl)}var sl=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function Sh(e){return Ho(e,sl)}function $h(e){return al(e,sl)}function Ho(e,t){return t.indexOf(e.nodeName)>=0}function al(e,t){return e.getElementsByTagName&&t.some(function(n){return e.getElementsByTagName(n).length})}var Eh=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function cl(e){return Eh.reduce(function(t,n){return t.replace(n[0],n[1])},e)}var Fe={};Fe.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};Fe.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+`
`}};Fe.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,n){var i=Number(t.nodeName.charAt(1));if(n.headingStyle==="setext"&&i<3){var r=lo(i===1?"=":"-",e.length);return`

`+e+`
`+r+`

`}else return`

`+lo("#",i)+" "+e+`

`}};Fe.blockquote={filter:"blockquote",replacement:function(e){return e=il(e).replace(/^/gm,"> "),`

`+e+`

`}};Fe.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;return n.nodeName==="LI"&&n.lastElementChild===t?`
`+e:`

`+e+`

`}};Fe.listItem={filter:"li",replacement:function(e,t,n){var i=n.bulletListMarker+"   ",r=t.parentNode;if(r.nodeName==="OL"){var o=r.getAttribute("start"),s=Array.prototype.indexOf.call(r.children,t);i=(o?Number(o)+s:s+1)+".  "}var a=/\n$/.test(e);return e=il(e)+(a?`
`:""),e=e.replace(/\n/gm,`
`+" ".repeat(i.length)),i+e+(t.nextSibling?`
`:"")}};Fe.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};Fe.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){for(var i=t.firstChild.getAttribute("class")||"",r=(i.match(/language-(\S+)/)||[null,""])[1],o=t.firstChild.textContent,s=n.fence.charAt(0),a=3,c=new RegExp("^"+s+"{3,}","gm"),l;l=c.exec(o);)l[0].length>=a&&(a=l[0].length+1);var d=lo(s,a);return`

`+d+r+`
`+o.replace(/\n$/,"")+`
`+d+`

`}};Fe.horizontalRule={filter:"hr",replacement:function(e,t,n){return`

`+n.hr+`

`}};Fe.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var n=jo(t.getAttribute("href")),i=Fo(Vi(t.getAttribute("title"))),r=i?' "'+i+'"':"";return"["+e+"]("+n+r+")"}};Fe.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,n){var i=jo(t.getAttribute("href")),r=Vi(t.getAttribute("title"));r&&(r=' "'+Fo(r)+'"');var o,s;switch(n.linkReferenceStyle){case"collapsed":o="["+e+"][]",s="["+e+"]: "+i+r;break;case"shortcut":o="["+e+"]",s="["+e+"]: "+i+r;break;default:var a=this.references.length+1;o="["+e+"]["+a+"]",s="["+a+"]: "+i+r}return this.references.push(s),o},references:[],append:function(e){var t="";return this.references.length&&(t=`

`+this.references.join(`
`)+`

`,this.references=[]),t}};Fe.emphasis={filter:["em","i"],replacement:function(e,t,n){return e.trim()?n.emDelimiter+e+n.emDelimiter:""}};Fe.strong={filter:["strong","b"],replacement:function(e,t,n){return e.trim()?n.strongDelimiter+e+n.strongDelimiter:""}};Fe.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",n="`",i=e.match(/`+/gm)||[];i.indexOf(n)!==-1;)n=n+"`";return n+t+e+t+n}};Fe.image={filter:"img",replacement:function(e,t){var n=cl(Vi(t.getAttribute("alt"))),i=jo(t.getAttribute("src")||""),r=Vi(t.getAttribute("title")),o=r?' "'+Fo(r)+'"':"";return i?"!["+n+"]("+i+o+")":""}};function Vi(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function jo(e){var t=e.replace(/([<>()])/g,"\\$1");return t.indexOf(" ")>=0?"<"+t+">":t}function Fo(e){return e.replace(/"/g,'\\"')}function ll(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}ll.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;return(t=Tr(this.array,e,this.options))||(t=Tr(this._keep,e,this.options))||(t=Tr(this._remove,e,this.options))?t:this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};function Tr(e,t,n){for(var i=0;i<e.length;i++){var r=e[i];if(Ch(r,t,n))return r}}function Ch(e,t,n){var i=e.filter;if(typeof i=="string"){if(i===t.nodeName.toLowerCase())return!0}else if(Array.isArray(i)){if(i.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof i=="function"){if(i.call(e,t,n))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function Ah(e){var t=e.element,n=e.isBlock,i=e.isVoid,r=e.isPre||function(f){return f.nodeName==="PRE"};if(!(!t.firstChild||r(t))){for(var o=null,s=!1,a=null,c=Qs(a,t,r);c!==t;){if(c.nodeType===3||c.nodeType===4){var l=c.data.replace(/[ \r\n\t]+/g," ");if((!o||/ $/.test(o.data))&&!s&&l[0]===" "&&(l=l.substr(1)),!l){c=Ir(c);continue}c.data=l,o=c}else if(c.nodeType===1)n(c)||c.nodeName==="BR"?(o&&(o.data=o.data.replace(/ $/,"")),o=null,s=!1):i(c)||r(c)?(o=null,s=!0):o&&(s=!1);else{c=Ir(c);continue}var d=Qs(a,c,r);a=c,c=d}o&&(o.data=o.data.replace(/ $/,""),o.data||Ir(o))}}function Ir(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function Qs(e,t,n){return e&&e.parentNode===t||n(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}var Ko=typeof window<"u"?window:{};function Th(){var e=Ko.DOMParser,t=!1;try{new e().parseFromString("","text/html")&&(t=!0)}catch{}return t}function Ih(){var e=function(){};return Lh()?e.prototype.parseFromString=function(t){var n=new window.ActiveXObject("htmlfile");return n.designMode="on",n.open(),n.write(t),n.close(),n}:e.prototype.parseFromString=function(t){var n=document.implementation.createHTMLDocument("");return n.open(),n.write(t),n.close(),n},e}function Lh(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{Ko.ActiveXObject&&(e=!0)}return e}var Rh=Th()?Ko.DOMParser:Ih();function Mh(e,t){var n;if(typeof e=="string"){var i=Oh().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");n=i.getElementById("turndown-root")}else n=e.cloneNode(!0);return Ah({element:n,isBlock:Wo,isVoid:ol,isPre:t.preformattedCode?Nh:null}),n}var Lr;function Oh(){return Lr=Lr||new Rh,Lr}function Nh(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function Bh(e,t){return e.isBlock=Wo(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=Ph(e),e.flankingWhitespace=Dh(e,t),e}function Ph(e){return!ol(e)&&!Sh(e)&&/^\s*$/i.test(e.textContent)&&!_h(e)&&!$h(e)}function Dh(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var n=zh(e.textContent);return n.leadingAscii&&ea("left",e,t)&&(n.leading=n.leadingNonAscii),n.trailingAscii&&ea("right",e,t)&&(n.trailing=n.trailingNonAscii),{leading:n.leading,trailing:n.trailing}}function zh(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}function ea(e,t,n){var i,r,o;return e==="left"?(i=t.previousSibling,r=/ $/):(i=t.nextSibling,r=/^ /),i&&(i.nodeType===3?o=r.test(i.nodeValue):n.preformattedCode&&i.nodeName==="CODE"?o=!1:i.nodeType===1&&!Wo(i)&&(o=r.test(i.textContent))),o}var Wh=Array.prototype.reduce;function Gi(e){if(!(this instanceof Gi))return new Gi(e);var t={rules:Fe,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(n,i){return i.isBlock?`

`:""},keepReplacement:function(n,i){return i.isBlock?`

`+i.outerHTML+`

`:i.outerHTML},defaultReplacement:function(n,i){return i.isBlock?`

`+n+`

`:n}};this.options=wh({},t,e),this.rules=new ll(this.options)}Gi.prototype={turndown:function(e){if(!Fh(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=dl.call(this,new Mh(e,this.options));return Hh.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return cl(e)}};function dl(e){var t=this;return Wh.call(e.childNodes,function(n,i){i=new Bh(i,t.options);var r="";return i.nodeType===3?r=i.isCode?i.nodeValue:t.escape(i.nodeValue):i.nodeType===1&&(r=jh.call(t,i)),pl(n,r)},"")}function Hh(e){var t=this;return this.rules.forEach(function(n){typeof n.append=="function"&&(e=pl(e,n.append(t.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function jh(e){var t=this.rules.forNode(e),n=dl.call(this,e),i=e.flankingWhitespace;return(i.leading||i.trailing)&&(n=n.trim()),i.leading+t.replacement(n,e,this.options)+i.trailing}function pl(e,t){var n=nl(e),i=tl(t),r=Math.max(e.length-n.length,t.length-i.length),o=`

`.substring(0,r);return n+o+i}function Fh(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}const qo=new Gi({headingStyle:"atx",bulletListMarker:"-",codeBlockStyle:"fenced",emDelimiter:"*",strongDelimiter:"**",hr:"---"});qo.remove(["style","script","meta","link","title"]);qo.addRule("wordXmlNs",{filter:e=>{const t=e.nodeName.toLowerCase();return t.startsWith("o:")||t.startsWith("w:")||t.startsWith("v:")},replacement:()=>""});function Kh(e){if(!e||!e.trim())return"";const t=e.match(/<!--\s*StartFragment\s*-->/i),n=e.match(/<!--\s*EndFragment\s*-->/i);let i=e;if(t&&n){const o=(t.index??0)+t[0].length,s=n.index??e.length;i=e.slice(o,s)}return qo.turndown(i).replace(/\n{3,}/g,`

`).trim()}function qh(e){if(!e||!Array.from(e.types??[]).includes("text/html"))return!1;const i=e.getData("text/html").replace(/<meta[^>]*>/gi,"").trim();return!/^<p[^>]*>[^<]*<\/p>$/i.test(i)}const Uh={name:"base64",async upload(e,t={}){const n=t.compressThreshold??32768;if(e.size<=n)return ta(e);try{const i=await Vh(e,t.quality??.85);if(i.length<e.size*1.5)return i}catch{}return ta(e)}};function ta(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=()=>t(String(i.result)),i.onerror=()=>n(i.error??new Error("FileReader failed")),i.readAsDataURL(e)})}async function Vh(e,t){const n=URL.createObjectURL(e);try{const i=await Gh(n),r=document.createElement("canvas");r.width=i.naturalWidth,r.height=i.naturalHeight;const o=r.getContext("2d");if(!o)throw new Error("canvas 2d context unavailable");o.drawImage(i,0,0);const s=r.toDataURL("image/webp",t);if(!s.startsWith("data:image/webp"))throw new Error("webp encoding unsupported");return s}finally{URL.revokeObjectURL(n)}}function Gh(e){return new Promise((t,n)=>{const i=new Image;i.onload=()=>t(i),i.onerror=()=>n(new Error("image decode failed")),i.src=e})}function po(e){return/^image\//i.test(e.type)}async function Yh(e,t=Uh,n){const i=[];for(const r of e){if(!po(r))continue;const o=Zh(r.name)??"image";try{const s=await t.upload(r,n);i.push(`![${o}](${s})`)}catch(s){i.push(`<!-- image upload failed: ${r.name} (${String(s)}) -->`)}}return i.join(`

`)}function Zh(e){if(!e)return null;const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}const Xh=767,Jh=100,Qh=Je({__name:"Editor",props:{modelValue:{}},emits:["update:modelValue","scroll"],setup(e,{expose:t,emit:n}){const i=e,r=n,o=he(null);let s=null;function a(k){if(!s)return;const{from:B,to:w}=s.state.selection.main,W=(B>0&&s.state.doc.sliceString(Math.max(0,B-1),B)!==`
`?`
`:"")+k+(k.endsWith(`
`)?"":`
`);s.dispatch({changes:{from:B,to:w,insert:W},selection:{anchor:B+W.length}}),s.focus()}function c(){if(!s)return"";const{from:k,to:B}=s.state.selection.main;return k===B?"":s.state.doc.sliceString(k,B)}function l(){return s?.scrollDOM??null}function d(k){const B=l();if(!B)return;const w=B.scrollHeight-B.clientHeight;w<=0||(B.scrollTop=Math.max(0,Math.min(w,k*w)))}function f(){s?.focus()}t({insertAtCursor:a,getSelectedText:c,getScroller:l,scrollToRatio:d,focus:f});function u(k,B){const{from:w,to:y}=k.state.selection.main;k.dispatch({changes:{from:w,to:y,insert:B},selection:{anchor:w+B.length}})}function b(k){if(!k)return[];const B=[],w=new Set;for(const y of Array.from(k.files??[]))po(y)&&!w.has(y)&&(B.push(y),w.add(y));for(const y of Array.from(k.items??[])){if(y.kind!=="file")continue;const W=y.getAsFile();W&&po(W)&&!w.has(W)&&(B.push(W),w.add(W))}return B}function p(k,B){const w=k.clipboardData,y=b(w);if(y.length>0)return k.preventDefault(),S(B,y),!0;if(!qh(w))return!1;const W=w.getData("text/html"),U=Kh(W);return U?(k.preventDefault(),u(B,U),!0):!1}function m(k,B){const w=b(k.dataTransfer);return w.length===0?!1:(k.preventDefault(),S(B,w),!0)}function S(k,B){const w=`<!-- 图片上传中… (${B.length}) -->`,{from:y}=k.state.selection.main;u(k,w),Yh(B).then(W=>{try{const q=k.state.doc.toString().indexOf(w,Math.max(0,y-1));if(q<0)return;k.dispatch({changes:{from:q,to:q+w.length,insert:W}})}catch{}})}function I(){if(!s||typeof window>"u"||window.innerWidth>Xh)return;const k=window.visualViewport;if(!k||window.innerHeight-k.height<Jh)return;const{head:w}=s.state.selection.main;s.dispatch({effects:An.scrollIntoView(w,{y:"center"})})}let z=0;function R(k){const B=k.target;if(!B)return;const w=B.scrollHeight-B.clientHeight;if(w<=0)return;const y=Date.now();y-z<16||(z=y,r("scroll",B.scrollTop/w))}function _(k){if(!o.value)return;const B=Xd.create({doc:k,extensions:[Qd(),ep(),tp(),np.of([...ip,...rp,op]),sp(),Jd,xh(),vh(),An.lineWrapping,An.updateListener.of(w=>{w.docChanged&&r("update:modelValue",w.state.doc.toString())}),An.domEventHandlers({scroll:R,paste:(w,y)=>p(w,y),drop:(w,y)=>m(w,y)}),An.theme({"&":{height:"100%",fontSize:"14px"},".cm-scroller":{overflow:"auto"}})]});s=new An({state:B,parent:o.value})}return on(()=>{_(i.modelValue),typeof window<"u"&&window.visualViewport&&window.visualViewport.addEventListener("resize",I)}),nt(()=>i.modelValue,k=>{if(!s)return;const B=s.state.doc.toString();k!==B&&s.dispatch({changes:{from:0,to:B.length,insert:k}})}),sn(()=>{typeof window<"u"&&window.visualViewport&&window.visualViewport.removeEventListener("resize",I),s?.destroy(),s=null}),(k,B)=>(j(),G("div",{class:"editor-host",ref_key:"host",ref:o},null,512))}}),Qe=(e,t)=>{const n=e.__vccOpts||e;for(const[i,r]of t)n[i]=r;return n},eg=Qe(Qh,[["__scopeId","data-v-c9a671b6"]]),tg={class:"preview-shell"},ng=["srcdoc"],ig=["aria-expanded"],rg={class:"tx-label"},og={class:"tx-chev"},sg={key:0,class:"transparency-list"},ag={class:"tx-entry-label"},cg={class:"tx-entry-count"},lg=Je({__name:"Preview",props:{html:{},patchLog:{}},emits:["scroll","ready"],setup(e,{expose:t,emit:n}){const i=e,r=he(!1),o=n,s=he(null);function a(){return s.value}function c(){return s.value?.contentDocument?.scrollingElement??s.value?.contentDocument?.documentElement??null}function l(p){const m=c();if(!m)return;const S=m.scrollHeight-m.clientHeight;S<=0||(m.scrollTop=Math.max(0,Math.min(S,p*S)))}t({getIframe:a,getScroller:c,scrollToRatio:l});const d=Ae(()=>`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1">
<style>
  /* —— 外框层，只作用于容器节点；不染指 .markdown-body —— */
  html, body {
    margin: 0;
    padding: 0;
    background: #ececec;
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
<div class="phone-viewport">${i.html}</div>
</body>
</html>`);let f=0;function u(){const p=c();if(!p)return;const m=p.scrollHeight-p.clientHeight;if(m<=0)return;const S=Date.now();S-f<16||(f=S,o("scroll",p.scrollTop/m))}function b(){const p=s.value?.contentDocument;p&&(p.removeEventListener("scroll",u),p.addEventListener("scroll",u,{passive:!0}),o("ready"))}return(p,m)=>(j(),G("div",tg,[m[4]||(m[4]=h("div",{class:"preview-meta mono"},[h("span",{class:"meta-dot"}),ft(" 移动端视口 · 所见即所得 ")],-1)),h("iframe",{ref_key:"iframeEl",ref:s,class:"preview-frame wechat-typeset-preview",srcdoc:d.value,sandbox:"allow-same-origin",title:"wechat-typeset 预览",onLoad:b},null,40,ng),i.patchLog&&i.patchLog.total>0?(j(),G("div",{key:0,class:Ie(["transparency-strip",{expanded:r.value}])},[h("button",{class:"transparency-toggle","aria-expanded":r.value,onClick:m[0]||(m[0]=S=>r.value=!r.value)},[m[3]||(m[3]=h("span",{class:"tx-dot"},null,-1)),h("span",rg,[m[1]||(m[1]=ft(" 渲染透明度 · 本次对 HTML 做了 ",-1)),h("b",null,Q(i.patchLog.total),1),m[2]||(m[2]=ft(" 处微信适配 ",-1))]),h("span",og,Q(r.value?"▾":"▸"),1)],8,ig),r.value?(j(),G("ul",sg,[(j(!0),G(_e,null,De(i.patchLog.entries,(S,I)=>(j(),G("li",{key:I},[h("span",ag,Q(S.label),1),h("span",cg,"× "+Q(S.count),1)]))),128))])):Se("",!0)],2)):Se("",!0)]))}}),dg=Qe(lg,[["__scopeId","data-v-eddb9a2d"]]),pg={class:"theme-strip",role:"tablist","aria-label":"主题缩略预览"},fg=["title","aria-selected","onMouseenter","onFocus","onClick"],ug={class:"name"},hg={key:0,class:"lock-dot","aria-hidden":"true"},gg=Je({__name:"ThemeStrip",props:{themes:{},activeId:{},hoverId:{}},emits:["hover","select"],setup(e,{emit:t}){const n=e,i=t;function r(a){i("hover",a)}function o(){i("hover",null)}function s(a){i("select",a)}return(a,c)=>(j(),G("div",pg,[(j(!0),G(_e,null,De(n.themes,l=>(j(),G("button",{key:l.id,class:Ie(["theme-card",{active:l.id===n.activeId,hover:l.id===n.hoverId}]),role:"tab",title:`切换到 ${l.name}`,"aria-selected":l.id===n.activeId,onMouseenter:d=>r(l.id),onMouseleave:c[0]||(c[0]=d=>o()),onFocus:d=>r(l.id),onBlur:c[1]||(c[1]=d=>o()),onClick:d=>s(l.id)},[h("span",{class:"swatch",style:Xe({background:l.tokens.colors.primary})},null,4),h("span",ug,Q(l.name),1),l.id===n.activeId?(j(),G("span",hg)):Se("",!0)],42,fg))),128))]))}}),mg=Qe(gg,[["__scopeId","data-v-1ebbb4d6"]]),Pe=e=>e.replace(/\s+/g," ").trim();function bg({tokens:e,variant:t}){const n=e.colors.primary,i=e.colors.accent,r=e.colors.border;return{h2Prefix:xg(t,n,i),dividerWave:yg(r),dividerDots:vg(r),dividerFlower:wg(r,n),quoteMark:kg(t,n),sectionCorner:_g(t,n),tipIcon:Sg(e.colors.status.tip.accent),warningIcon:$g(e.colors.status.warning.accent),infoIcon:Eg(e.colors.status.info.accent),dangerIcon:Cg(e.colors.status.danger.accent),stepBadge:o=>Ag(o,n)}}function xg(e,t,n){switch(e){case"soft":return Pe(`
        <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <circle cx="6" cy="9" r="5" fill="${t}"/>
          <circle cx="12" cy="9" r="5" fill="${n}" opacity="0.55"/>
        </svg>
      `);case"serif":return Pe(`
        <svg viewBox="0 0 14 22" width="11" height="18" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <rect x="0" y="1" width="3" height="20" fill="${t}"/>
          <rect x="5" y="6" width="3" height="15" fill="${t}" opacity="0.5"/>
        </svg>
      `);case"playful":return Pe(`
        <svg viewBox="0 0 20 14" width="18" height="12" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <path d="M0,7 L7,0 L14,7 L7,14 Z" fill="${t}"/>
          <rect x="15" y="4" width="5" height="6" fill="${n}" opacity="0.7"/>
        </svg>
      `);case"geometric":default:return Pe(`
        <svg viewBox="0 0 14 22" width="12" height="18" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
          <rect x="0" y="0" width="4" height="22" fill="${t}"/>
          <rect x="7" y="4" width="3" height="14" fill="${t}" opacity="0.6"/>
        </svg>
      `)}}function yg(e,t){return Pe(`
    <svg viewBox="0 0 240 14" width="220" height="14" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,7 Q15,0 30,7 T60,7 T90,7 T120,7 T150,7 T180,7 T210,7 T240,7"
            fill="none" stroke="${e}" stroke-width="1.5"/>
    </svg>
  `)}function vg(e){return Pe(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="4" r="2" fill="${e}"/>
      <circle cx="100" cy="4" r="2" fill="${e}"/>
      <circle cx="140" cy="4" r="2" fill="${e}"/>
      <circle cx="180" cy="4" r="2" fill="${e}"/>
    </svg>
  `)}function wg(e,t){return Pe(`
    <svg viewBox="0 0 240 18" width="220" height="18" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="9" x2="100" y2="9" stroke="${e}" stroke-width="1"/>
      <line x1="140" y1="9" x2="240" y2="9" stroke="${e}" stroke-width="1"/>
      <path d="M120,2 L124,9 L120,16 L116,9 Z" fill="${t}"/>
      <circle cx="105" cy="9" r="1.5" fill="${e}"/>
      <circle cx="135" cy="9" r="1.5" fill="${e}"/>
    </svg>
  `)}function kg(e,t){return Pe(e==="serif"?`
      <svg viewBox="0 0 48 40" width="36" height="30" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
        <text x="0" y="32" font-size="44" font-weight="700" fill="${t}" opacity="0.3">&#8220;</text>
      </svg>
    `:e==="playful"?`
      <svg viewBox="0 0 40 32" width="34" height="28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
        <path d="M4,20 C4,10 12,4 24,4 C34,4 38,10 38,16 C38,24 30,28 18,28 L12,32 L13,26 C7,24 4,22 4,20 Z"
              fill="${t}" opacity="0.25"/>
      </svg>
    `:`
    <svg viewBox="0 0 40 32" width="34" height="28" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:top;margin-right:4px">
      <path d="M4,26 L4,16 C4,10 8,6 14,4 L14,8 C10,9 8,12 8,16 L12,16 L12,26 Z
               M22,26 L22,16 C22,10 26,6 32,4 L32,8 C28,9 26,12 26,16 L30,16 L30,26 Z"
            fill="${t}" opacity="${e==="soft"?"0.4":"0.3"}"/>
    </svg>
  `)}function _g(e,t){return Pe(e==="soft"?`
      <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
        <circle cx="9" cy="9" r="7" fill="${t}"/>
      </svg>
    `:e==="playful"?`
      <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
        <path d="M9,1 L11,7 L17,9 L11,11 L9,17 L7,11 L1,9 L7,7 Z" fill="${t}"/>
      </svg>
    `:`
    <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M0,0 L18,0 L18,4 L4,4 L4,18 L0,18 Z" fill="${t}"/>
    </svg>
  `)}function Sg(e){return Pe(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${e}" stroke-width="1.5"/>
      <rect x="7" y="4" width="2" height="5" fill="${e}"/>
      <rect x="7" y="10" width="2" height="2" fill="${e}"/>
    </svg>
  `)}function $g(e){return Pe(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M8,1 L15,14 L1,14 Z" fill="none" stroke="${e}" stroke-width="1.5"/>
      <rect x="7" y="5" width="2" height="5" fill="${e}"/>
      <rect x="7" y="11" width="2" height="2" fill="${e}"/>
    </svg>
  `)}function Eg(e){return Pe(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${e}" stroke-width="1.5"/>
      <rect x="7" y="3" width="2" height="2" fill="${e}"/>
      <rect x="7" y="6" width="2" height="7" fill="${e}"/>
    </svg>
  `)}function Cg(e){return Pe(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="${e}"/>
      <rect x="3" y="7" width="10" height="2" fill="#fefefe"/>
    </svg>
  `)}function Ag(e,t){return Pe(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${t}"/>
      <text x="12" y="17" text-anchor="middle" font-size="15" font-weight="700" fill="#fefefe">${e}</text>
    </svg>
  `)}function fl(e){const{colors:t,typography:n}=e;return{h1:{"font-size":`${n.h1Size}px`,"font-weight":"700",color:t.text,"margin-top":"28px","margin-bottom":"16px","line-height":"1.4"},h2:{"font-size":`${n.h2Size}px`,"font-weight":"700",color:t.text,"margin-top":"28px","margin-bottom":"14px","line-height":"1.4","padding-bottom":"6px","border-bottom":`2px solid ${t.primary}`},h3:{"font-size":`${n.h3Size}px`,"font-weight":"700",color:t.text,"margin-top":"22px","margin-bottom":"10px","line-height":"1.5"},h4:{"font-size":`${n.baseSize+1}px`,"font-weight":"600",color:t.text,"margin-top":"18px","margin-bottom":"8px","line-height":"1.5"},p:{"font-size":`${n.baseSize}px`,"line-height":String(n.lineHeight),color:t.text,"margin-top":"0","margin-bottom":"18px","letter-spacing":`${n.letterSpacing}px`},blockquote:{"border-left":`4px solid ${t.primary}`,"background-color":t.bgSoft,color:t.textMuted,"padding-top":"12px","padding-right":"16px","padding-bottom":"12px","padding-left":"16px","margin-top":"0","margin-bottom":"18px","border-radius":"4px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},li:{"margin-bottom":"8px","line-height":String(n.lineHeight),color:t.text},code:{"background-color":t.bgMuted,color:t.code,padding:"2px 6px","border-radius":"3px","font-size":"14px"},kbd:{display:"inline-block","background-color":t.bgSoft,color:t.text,border:`1px solid ${t.border}`,"border-bottom-width":"2px","border-radius":"3px",padding:"1px 6px","font-size":"12px","line-height":"1.4","vertical-align":"middle"},pre:{"background-color":"#282c34",color:"#abb2bf","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"6px","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.28)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.6"},img:{"max-width":"100%",display:"block","margin-top":"10px","margin-right":"auto","margin-bottom":"10px","margin-left":"auto","border-radius":"6px"},a:{color:t.primary,"text-decoration":"underline"},hr:{border:"none",height:"1px","background-color":t.border,"margin-top":"24px","margin-bottom":"24px"},table:{"border-collapse":"collapse",width:"100%","margin-top":"0","margin-bottom":"18px","font-size":"14px"},strong:{"font-weight":"700",color:t.text},em:{"font-style":"italic",color:t.text}}}function ul(e){return{intro:{"background-color":e.colors.bgSoft,"border-radius":"6px",padding:"14px 16px",margin:"16px 0",color:e.colors.textMuted},author:{"background-color":e.colors.bgSoft,"border-radius":"6px",padding:"12px 14px",margin:"16px 0"},cover:{margin:"16px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":e.colors.bgSoft,padding:"18px 16px",margin:"20px 0","border-radius":"8px"},highlight:{"background-color":e.colors.bgMuted,padding:"12px 14px",margin:"16px 0","border-radius":"6px"},compare:{margin:"16px 0"},steps:{margin:"16px 0"},sectionTitle:{margin:"24px 0 12px","border-bottom":`2px solid ${e.colors.primary}`,"padding-bottom":"6px"},footerCTA:{margin:"24px 0",padding:"16px","background-color":e.colors.bgSoft,"border-radius":"8px"},recommend:{margin:"20px 0",padding:"14px 16px","background-color":e.colors.bgSoft,"border-radius":"6px"},qrcode:{margin:"20px 0",padding:"14px 16px"},note:{"border-top":`1px solid ${e.colors.border}`,padding:"10px 0 4px 0",margin:"18px 0","border-radius":"0"},mpvoice:{margin:"20px 0"},mpvideo:{margin:"20px 0"},abstract:{margin:"18px 0 24px"},keyNumber:{margin:"18px 0"},seeAlso:{margin:"20px 0"}}}function hl(e){return{highlight:{"background-color":e.colors.accent,color:e.colors.textInverse,padding:"0 3px","border-radius":"2px"},wavy:{"text-decoration":"underline wavy","text-decoration-color":e.colors.accent,"text-underline-offset":"3px"},emphasis:{color:e.colors.primary,"font-weight":"600"}}}function Rr(e,t){if(!t)return e;const n={...e};for(const i of Object.keys(t)){const r=t[i];if(!r)continue;const{__reset:o,...s}=r,a=s;if(o===!0){n[i]=a;continue}const c=n[i]??{},l={};for(const d of Object.keys(a))l[d]=a[d];for(const d of Object.keys(c))d in l||(l[d]=c[d]);n[i]=l}return n}function gl(e){const t=Rr(fl(e.tokens),e.elements),n=Rr(ul(e.tokens),e.containers),i=Rr(hl(e.tokens),e.inline);let r;if(e.variant!==void 0){const s=bg({tokens:e.tokens,variant:e.variant});r=e.assets?{...s,...e.assets}:s}else r=e.assets??{};const o={...Ku,...e.variants??{}};return{id:e.id,name:e.name,description:e.description,author:e.author??"",preview:e.preview??"",tokens:e.tokens,elements:t,containers:n,assets:r,templates:e.templates??{},inline:i,variants:o,...e.behavior?{behavior:e.behavior}:{}}}const Tg={cover:`::: cover 本期封面
![封面占位图](https://placehold.co/1200x630?text=Cover)

<!-- 一句话立意：让读者 3 秒内知道这篇在讲什么 -->
:::
`,authorBar:`::: author 林墨 role=主笔 / 工程师
写于 2026 · 春

长期观察 AI、内容生产与个人化写作工具。
:::
`,footerCTA:`::: footer-cta 觉得有用？ cta=关注我
点个"在看"让更多人读到它。
:::
`,recommend:`::: recommend 推荐阅读
- [从零开始的 wechat-typeset](https://example.com/a)
- [主题工程的五个误区](https://example.com/b)
- [LCH 色彩生成手册](https://example.com/c)
:::
`,compare:`:::: compare

::: pros 方案 A
- 优势一
- 优势二
:::

::: cons 方案 B
- 代价一
- 代价二
:::

::::
`,steps:`::: steps 实战流程
### 第一步
一句话描述要做什么。

### 第二步
一句话描述要做什么。

### 第三步
一句话描述要做什么。
:::
`,tip:`::: tip 小贴士
一句提醒读者的经验法则。
:::
`};function Ig(e){return typeof e=="number"?String(e):String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Lg(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Zt(e){const t=[];for(const[n,i]of e)i==null||i===""||t.push(`${n}="${Ig(i)}"`);return t.length?" "+t.join(" "):""}function ml(e){switch(e.type){case"rect":return`<rect${Zt([["x",e.x],["y",e.y],["width",e.w],["height",e.h],["rx",e.rx],["ry",e.ry],["fill",e.fill??"none"],["stroke",e.stroke],["stroke-width",e.strokeWidth],["opacity",e.opacity]])}/>`;case"circle":return`<circle${Zt([["cx",e.cx],["cy",e.cy],["r",e.r],["fill",e.fill??"none"],["stroke",e.stroke],["stroke-width",e.strokeWidth],["opacity",e.opacity]])}/>`;case"path":return`<path${Zt([["d",e.d],["fill",e.fill??"none"],["stroke",e.stroke],["stroke-width",e.strokeWidth],["stroke-linecap",e.strokeLinecap],["stroke-linejoin",e.strokeLinejoin],["stroke-dasharray",e.strokeDasharray],["opacity",e.opacity]])}/>`;case"line":return`<line${Zt([["x1",e.x1],["y1",e.y1],["x2",e.x2],["y2",e.y2],["stroke",e.stroke],["stroke-width",e.strokeWidth],["stroke-linecap",e.strokeLinecap],["stroke-dasharray",e.strokeDasharray],["opacity",e.opacity]])}/>`;case"text":return`<text${Zt([["x",e.x],["y",e.y],["font-size",e.fontSize],["font-family",e.fontFamily],["font-weight",e.fontWeight],["fill",e.fill],["text-anchor",e.textAnchor],["dominant-baseline",e.dominantBaseline],["letter-spacing",e.letterSpacing],["opacity",e.opacity]])}>${Lg(e.content)}</text>`;case"ellipse":return`<ellipse${Zt([["cx",e.cx],["cy",e.cy],["rx",e.rx],["ry",e.ry],["fill",e.fill??"none"],["stroke",e.stroke],["stroke-width",e.strokeWidth],["opacity",e.opacity]])}/>`;case"group":{const t=e.children.map(ml).join("");return`<g${Zt([["transform",e.transform],["opacity",e.opacity]])}>${t}</g>`}}}function Rg(e){return`${e[0]} ${e[1]} ${e[2]} ${e[3]}`}function Mg(e){if(!e)return;const t=[];return e.display&&t.push(`display:${e.display}`),e.verticalAlign&&t.push(`vertical-align:${e.verticalAlign}`),typeof e.marginRight=="number"&&t.push(`margin-right:${e.marginRight}px`),typeof e.marginLeft=="number"&&t.push(`margin-left:${e.marginLeft}px`),t.length?t.join(";"):void 0}function bl(e,t,n={}){const i=t.map(ml),r=i.length?" "+i.join(" ")+" ":"";return`<svg${Zt([["viewBox",Rg(e)],["width",n.width],["height",n.height],["xmlns","http://www.w3.org/2000/svg"],["style",Mg(n.inlineStyle)]])}>${r}</svg>`}function Og(e){return bl(e.viewBox,e.primitives,{width:e.width,height:e.height,inlineStyle:e.inlineStyle})}function na(e,t){const n=e.primitives.map(i=>xl(i,t));return bl(e.viewBox,n,{width:e.width,height:e.height,inlineStyle:e.inlineStyle})}function Ng(e,t){return e.replace(/\{(\w+)\}/g,(n,i)=>{const r=t[i];return r===void 0?`{${i}}`:String(r)})}function xl(e,t){const n={...e};for(const i of Object.keys(n)){const r=n[i];typeof r=="string"?n[i]=Ng(r,t):i==="children"&&Array.isArray(r)&&(n[i]=r.map(o=>xl(o,t)))}return n}function Bg(e){return{colors:{...e.palette,status:e.status},typography:e.typography,spacing:e.spacing,radius:e.radius}}function Pg(e){const t={},n=["h2Prefix","h3Prefix","dividerFlower","dividerWave","dividerDots","quoteMark","listBullet","sectionCorner","tipIcon","warningIcon","infoIcon","dangerIcon","noteIcon","copyIcon","externalLinkIcon","terminalPrompt","sealMark"];for(const i of n){const r=e[i];!r||!("primitives"in r)||(t[i]=Og(r))}if(e.stepBadge){const i=e.stepBadge;t.stepBadge=r=>na(i,{N:r})}if(e.issueStamp){const i=e.issueStamp;t.issueStamp=(r,o,s)=>na(i,{issue:r,date:o,kind:s})}return t}function Gt(e){const t=Bg(e),n=Pg(e.motifs),i={...Tg,...e.templates??{}};return gl({id:e.id,name:e.name,description:e.description,tokens:t,assets:n,elements:e.elements,containers:e.containers,inline:e.inline,templates:i,variants:e.variants,behavior:e.behavior})}const Dg={oneOf:[{type:"object",required:["type","x","y","w","h"],properties:{type:{const:"rect"},x:{type:"number"},y:{type:"number"},w:{type:"number"},h:{type:"number"},fill:{type:"string"},stroke:{type:"string"},strokeWidth:{type:"number",minimum:1},rx:{type:"number"},ry:{type:"number"},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","cx","cy","r"],properties:{type:{const:"circle"},cx:{type:"number"},cy:{type:"number"},r:{type:"number"},fill:{type:"string"},stroke:{type:"string"},strokeWidth:{type:"number",minimum:1},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","d"],properties:{type:{const:"path"},d:{type:"string"},fill:{type:"string"},stroke:{type:"string"},strokeWidth:{type:"number",minimum:1},strokeLinecap:{enum:["butt","round","square"]},strokeLinejoin:{enum:["miter","round","bevel"]},strokeDasharray:{type:"string"},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","x","y","content","fontSize"],properties:{type:{const:"text"},x:{type:"number"},y:{type:"number"},content:{type:"string"},fontSize:{type:"number",minimum:14},fontFamily:{enum:["serif","sans-serif","monospace"]},fontWeight:{},fill:{type:"string"},textAnchor:{enum:["start","middle","end"]},dominantBaseline:{enum:["auto","middle","central","hanging","alphabetic"]},letterSpacing:{type:"number"},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","x1","y1","x2","y2","stroke","strokeWidth"],properties:{type:{const:"line"},x1:{type:"number"},y1:{type:"number"},x2:{type:"number"},y2:{type:"number"},stroke:{type:"string"},strokeWidth:{type:"number",minimum:1},strokeLinecap:{enum:["butt","round","square"]},strokeDasharray:{type:"string"},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","cx","cy","rx","ry"],properties:{type:{const:"ellipse"},cx:{type:"number"},cy:{type:"number"},rx:{type:"number"},ry:{type:"number"},fill:{type:"string"},stroke:{type:"string"},strokeWidth:{type:"number",minimum:1},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1},{type:"object",required:["type","transform","children"],properties:{type:{const:"group"},transform:{type:"string"},children:{type:"array"},opacity:{type:"number",minimum:0,maximum:1}},additionalProperties:!1}]},zg={type:"object",description:"SVG <svg> 标签的语义 inline style 子集",properties:{display:{enum:["inline-block","block","inline"]},verticalAlign:{enum:["baseline","middle","top","bottom"]},marginRight:{type:"number"},marginLeft:{type:"number"}},additionalProperties:!1},Wg={type:"array",items:{type:"number"},minItems:4,maxItems:4},Hg={type:"object",required:["viewBox","primitives"],properties:{viewBox:Wg,width:{type:"number"},height:{type:"number"},inlineStyle:zg,primitives:{type:"array",items:Dg}},additionalProperties:!1},jg=["h2Prefix","h3Prefix","dividerFlower","dividerWave","dividerDots","quoteMark","listBullet","sectionCorner","tipIcon","warningIcon","infoIcon","dangerIcon","noteIcon","copyIcon","externalLinkIcon","terminalPrompt","sealMark"];({...Object.fromEntries(jg.map(e=>[e,Hg]))});const Fg={id:"academic-frontier",name:"学术前沿",description:"Nature / arXiv / LaTeX article 家族，研究者写给同行评审的严谨陈述",palette:{primary:"#1e2c4a",secondary:"#4a5670",accent:"#8a2a2a",bg:"#fefefe",bgSoft:"#f6f6f4",bgMuted:"#ececea",text:"#16181d",textMuted:"#5a5d64",textInverse:"#fefefe",border:"#d8d8d4",code:"#1a1a1a"},status:{tip:{accent:"#1e2c4a",soft:"#f3f4f7"},info:{accent:"#4a5670",soft:"#f1f2f4"},warning:{accent:"#5a4a18",soft:"#f5f2e8"},danger:{accent:"#3a3e48",soft:"#eeeff2"}},typography:{baseSize:15,lineHeight:1.75,h1Size:24,h2Size:18,h3Size:16,letterSpacing:.3},spacing:{paragraph:18,section:36,listItem:8,containerPadding:18},radius:{sm:2,md:2,lg:2},motifs:{h2Prefix:{viewBox:[0,0,2,16],width:2,height:16,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:1,w:2,h:14,fill:"#1e2c4a"}]},sectionCorner:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M1,1 L1,8 M1,1 L8,1",stroke:"#d8d8d4",strokeWidth:1}]},stepBadge:{viewBox:[0,0,20,20],width:20,height:20,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"text",x:10,y:15,content:"{N}",fontSize:14,fontWeight:500,fill:"#1e2c4a",textAnchor:"middle"}]},dividerDots:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"circle",cx:108,cy:4,r:1.2,fill:"#d8d8d4"},{type:"circle",cx:120,cy:4,r:1.2,fill:"#d8d8d4"},{type:"circle",cx:132,cy:4,r:1.2,fill:"#d8d8d4"}]},dividerFlower:{viewBox:[0,0,240,16],width:220,height:16,primitives:[{type:"text",x:120,y:13,content:"⁂",fontSize:14,fill:"#5a5d64",textAnchor:"middle",letterSpacing:4}]},dividerWave:{viewBox:[0,0,240,4],width:220,height:4,primitives:[{type:"line",x1:20,y1:2,x2:220,y2:2,stroke:"#d8d8d4",strokeWidth:1}]},tipIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:4,y:4,w:6,h:6,fill:"#1e2c4a"}]},infoIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"line",x1:3,y1:10,x2:11,y2:10,stroke:"#4a5670",strokeWidth:1.4}]},warningIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M3,3 L11,3 L11,11 L3,11 Z",stroke:"#5a4a18",strokeWidth:1,strokeDasharray:"1.5 1.5"}]},dangerIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M2,2 L2,7 M2,2 L7,2",stroke:"#8a2a2a",strokeWidth:1.2},{type:"path",d:"M12,12 L12,7 M12,12 L7,12",stroke:"#8a2a2a",strokeWidth:1.2}]}},variants:{admonition:"sidenote-latex",quote:"frame-brackets",compare:"column-card",steps:"timeline-dot",divider:"rule",sectionTitle:"bordered",codeBlock:"bare"},elements:{h1:{"font-size":"24px","font-weight":"600",color:"#16181d","margin-top":"28px","margin-bottom":"14px","line-height":"1.4","letter-spacing":"0.2px"},h2:{"font-size":"18px","font-weight":"600",color:"#16181d","margin-top":"32px","margin-bottom":"12px","line-height":"1.45","letter-spacing":"0.1px","border-bottom":"none","padding-bottom":"0"},h3:{"font-size":"16px","font-weight":"600",color:"#16181d","margin-top":"22px","margin-bottom":"10px","line-height":"1.55","letter-spacing":"0"},h4:{"font-size":"15px","font-weight":"600",color:"#16181d","margin-top":"18px","margin-bottom":"8px","line-height":"1.6","letter-spacing":"0"},p:{"font-size":"15px","line-height":"1.75",color:"#16181d","margin-top":"0","margin-bottom":"18px","letter-spacing":"0.3px"},blockquote:{"border-left":"3px solid #d8d8d4","background-color":"transparent",color:"#5a5d64","padding-top":"4px","padding-right":"0","padding-bottom":"4px","padding-left":"16px","margin-top":"0","margin-bottom":"18px","border-radius":"0","font-size":"14px","line-height":"1.7"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},li:{"margin-bottom":"8px","line-height":"1.75",color:"#16181d","letter-spacing":"0.3px"},strong:{"font-weight":"600",color:"#16181d"},em:{"font-style":"italic","font-weight":"500",color:"#16181d"},a:{color:"#4a5670","text-decoration":"underline","text-underline-offset":"3px"},hr:{border:"none",height:"1px","background-color":"#d8d8d4","margin-top":"24px","margin-bottom":"24px"},img:{"max-width":"100%",display:"block","margin-top":"12px","margin-right":"auto","margin-bottom":"8px","margin-left":"auto","border-radius":"2px"},table:{"border-collapse":"collapse",width:"100%","margin-top":"0","margin-bottom":"18px","font-size":"14px",border:"1px solid #d8d8d4"},pre:{"background-color":"#ececea",color:"#1a1a1a","padding-top":"12px","padding-right":"14px","padding-bottom":"12px","padding-left":"14px","border-radius":"2px",border:"1px solid #d8d8d4","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.12)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.65"},code:{"background-color":"#f6f6f4",color:"#1a1a1a",padding:"1px 4px","border-radius":"2px","font-size":"14px","font-weight":"500"}},inline:{highlight:{"background-color":"#f6f6f4",color:"#16181d",padding:"0 3px","border-radius":"2px"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#4a5670","text-underline-offset":"3px"},emphasis:{"font-style":"italic","font-weight":"500",color:"#16181d"}},containers:{intro:{"background-color":"transparent","border-top":"1px solid #d8d8d4","border-bottom":"1px solid #d8d8d4","border-radius":"0",padding:"16px 0",margin:"0 0 28px 0",color:"#5a5d64","line-height":"1.75"},author:{"background-color":"transparent","border-radius":"0",padding:"0",margin:"0 0 20px 0","font-size":"13px",color:"#5a5d64","line-height":"1.7"},cover:{margin:"0 0 24px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#fefefe",padding:"0",margin:"20px 0","border-radius":"2px",border:"1px solid #d8d8d4"},highlight:{"background-color":"#f6f6f4","border-left":"2px solid #8a2a2a",padding:"12px 16px 12px 18px",margin:"20px 0","border-radius":"2px"},compare:{margin:"22px 0"},steps:{margin:"22px 0"},sectionTitle:{margin:"36px 0 16px","padding-bottom":"6px","border-bottom":"1px solid #4a5670"},footerCTA:{margin:"40px 0 24px 0",padding:"18px 0","background-color":"transparent","border-top":"1px solid #d8d8d4","border-bottom":"1px solid #d8d8d4","border-radius":"0"},recommend:{margin:"24px 0",padding:"14px 0","background-color":"transparent","border-radius":"0","border-top":"1px solid #d8d8d4"},qrcode:{margin:"32px 0 0 0",padding:"0","background-color":"transparent","border-radius":"0"}},templates:{cover:`::: cover 论文标题
一句话摘要或研究问题——模拟 arXiv preprint 的"标题 + 导语"双层

张三¹, 李四², 王五¹*  ·  ¹某某大学  ·  ²某某研究所  ·  * 通讯作者

关键词：XXX · YYY · ZZZ
:::
`,authorBar:`::: author 张三¹, 李四²
¹某某大学 计算机系  ·  ²某某研究所  ·  通讯邮箱：zhang@university.edu.cn  ·  投稿日期：2026-04-20
:::
`,tip:`::: tip Definition.
设 *X* 为满足 ... 的集合。若存在映射 *f*: *X* → *Y* 使得 ... 恒成立，则称 *f* 为 ...
:::
`,footerCTA:`::: footer-cta ACKNOWLEDGEMENTS
感谢 XX 对本文的审阅，感谢 YY 提供数据。本研究得到 NSFC 资助 (No. xxx)。

CITE AS — 张三, 李四. (2026). 论文标题. 公众号名, 第 N 期. DOI: 10.xxxx/xxxxx
:::
`,recommend:`::: recommend REFERENCES
- [1] Smith, J., & Doe, A. (2024). Title of paper. Journal of Something, 12(3), 345–360.
- [2] Wang, X., Li, Y., & Zhang, Z. (2025). Another title. Nature, 600, 123–130.
- [3] Liu, M. (2026). Preprint title. arXiv: 2601.12345.
:::
`}},Kg=Gt(Fg),qg=Object.freeze(Object.defineProperty({__proto__:null,academicFrontierTheme:Kg},Symbol.toStringTag,{value:"Module"})),Ug={id:"business-finance",name:"硬核财经",description:"深栗墨 + 内参蓝，研究所内参版面，数字与判断优先",palette:{primary:"#2a1a14",secondary:"#0e3654",accent:"#b8821f",bg:"#fefefe",bgSoft:"#f3f1ec",bgMuted:"#e6e2d8",text:"#0f141b",textMuted:"#56606e",textInverse:"#fefefe",border:"#d0cec8",code:"#0e3654"},status:{tip:{accent:"#1f4f6b",soft:"#dfe8ee"},info:{accent:"#3d5a75",soft:"#dde4ec"},warning:{accent:"#8a6416",soft:"#f1e8d1"},danger:{accent:"#9a1b20",soft:"#f0dadc"}},typography:{baseSize:15,lineHeight:1.75,h1Size:26,h2Size:21,h3Size:17,letterSpacing:.3},spacing:{paragraph:16,section:28,listItem:6,containerPadding:14},radius:{sm:0,md:2,lg:4},motifs:{h2Prefix:{viewBox:[0,0,18,18],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"rect",x:0,y:2,w:3,h:13,fill:"#2a1a14"},{type:"rect",x:4,y:7,w:14,h:3,fill:"#0e3654",opacity:.75}]},dividerWave:{viewBox:[0,0,240,20],width:220,height:20,primitives:[{type:"line",x1:0,y1:10,x2:240,y2:10,stroke:"#d0cec8",strokeWidth:1},{type:"line",x1:72,y1:2,x2:72,y2:10,stroke:"#9a1b20",strokeWidth:1},{type:"rect",x:70,y:4,w:4,h:4,fill:"#9a1b20"},{type:"line",x1:84,y1:4,x2:84,y2:12,stroke:"#0e3654",strokeWidth:1},{type:"rect",x:82,y:6,w:4,h:4,fill:"#0e3654"},{type:"line",x1:96,y1:6,x2:96,y2:14,stroke:"#9a1b20",strokeWidth:1},{type:"rect",x:94,y:8,w:4,h:4,fill:"#9a1b20"},{type:"line",x1:108,y1:8,x2:108,y2:16,stroke:"#0e3654",strokeWidth:1},{type:"rect",x:106,y:10,w:4,h:4,fill:"#0e3654"},{type:"line",x1:120,y1:10,x2:120,y2:18,stroke:"#9a1b20",strokeWidth:1},{type:"rect",x:118,y:12,w:4,h:4,fill:"#9a1b20"},{type:"line",x1:132,y1:8,x2:132,y2:16,stroke:"#0e3654",strokeWidth:1},{type:"rect",x:130,y:10,w:4,h:4,fill:"#0e3654"},{type:"line",x1:144,y1:6,x2:144,y2:14,stroke:"#9a1b20",strokeWidth:1},{type:"rect",x:142,y:8,w:4,h:4,fill:"#9a1b20"},{type:"line",x1:156,y1:4,x2:156,y2:12,stroke:"#0e3654",strokeWidth:1},{type:"rect",x:154,y:6,w:4,h:4,fill:"#0e3654"},{type:"line",x1:168,y1:2,x2:168,y2:10,stroke:"#9a1b20",strokeWidth:1},{type:"rect",x:166,y:4,w:4,h:4,fill:"#9a1b20"}]},dividerDots:{viewBox:[0,0,240,10],width:220,height:10,primitives:[{type:"rect",x:108,y:3,w:4,h:4,fill:"#9a1b20"},{type:"rect",x:118,y:3,w:4,h:4,fill:"#0e3654"},{type:"rect",x:128,y:3,w:4,h:4,fill:"#9a1b20"}]},dividerFlower:{viewBox:[0,0,240,20],width:220,height:16,primitives:[{type:"line",x1:4,y1:10,x2:96,y2:10,stroke:"#d0cec8",strokeWidth:1},{type:"line",x1:144,y1:10,x2:236,y2:10,stroke:"#d0cec8",strokeWidth:1},{type:"text",x:120,y:14,content:"Sec. I",fontSize:14,fontWeight:600,fill:"#56606e",textAnchor:"middle",letterSpacing:1.5}]},quoteMark:{viewBox:[0,0,40,32],width:34,height:28,inlineStyle:{display:"inline-block",verticalAlign:"top",marginRight:4},primitives:[{type:"path",d:"M4,6 L4,14 L8,14 L8,20 L14,20 L14,6 Z M22,6 L22,14 L26,14 L26,20 L32,20 L32,6 Z",fill:"#2a1a14",opacity:.5}]},sectionCorner:{viewBox:[0,0,18,18],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M0,0 L6,0 L6,3 L3,3 L3,18 L0,18 Z",fill:"#2a1a14"},{type:"rect",x:9,y:14,w:3,h:3,fill:"#b8821f"}]},tipIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:1,y:1,w:14,h:14,stroke:"#1f4f6b",strokeWidth:1.5},{type:"path",d:"M4,8 L7,11 L12,5",stroke:"#1f4f6b",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}]},warningIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:1,y:1,w:14,h:14,stroke:"#8a6416",strokeWidth:1.5},{type:"rect",x:7,y:3,w:2,h:7,fill:"#8a6416"},{type:"rect",x:7,y:11,w:2,h:2,fill:"#8a6416"}]},infoIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:1,y:1,w:14,h:14,stroke:"#3d5a75",strokeWidth:1.5},{type:"rect",x:7,y:3,w:2,h:2,fill:"#3d5a75"},{type:"rect",x:7,y:6,w:2,h:7,fill:"#3d5a75"}]},dangerIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:1,y:1,w:14,h:14,stroke:"#9a1b20",strokeWidth:1.5},{type:"path",d:"M4,4 L12,12 M12,4 L4,12",stroke:"#9a1b20",strokeWidth:1.8,strokeLinecap:"round"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"rect",x:1,y:1,w:22,h:22,fill:"#2a1a14"},{type:"rect",x:1,y:20,w:22,h:3,fill:"#b8821f"},{type:"text",x:12,y:16,content:"{N}",fontSize:15,fontWeight:700,fill:"#fefefe",textAnchor:"middle"}]}},variants:{admonition:"ledger-cell",quote:"frame-brackets",compare:"ledger",steps:"timeline-dot",divider:"wave",sectionTitle:"cornered",codeBlock:"bare"},elements:{h1:{"font-size":"26px","font-weight":"800",color:"#0f141b","margin-top":"28px","margin-bottom":"16px","line-height":"1.35","letter-spacing":"0.5px"},h2:{"font-size":"21px","font-weight":"700",color:"#0f141b","margin-top":"28px","margin-bottom":"12px","line-height":"1.4","letter-spacing":"0.3px","padding-left":"8px","border-left":"4px solid #2a1a14","border-bottom":"none","padding-bottom":"0"},h3:{"font-size":"17px","font-weight":"700",color:"#0f141b","margin-top":"24px","margin-bottom":"10px","line-height":"1.5","letter-spacing":"0.2px"},h4:{"font-size":"15px","font-weight":"700",color:"#0f141b","margin-top":"18px","margin-bottom":"8px","line-height":"1.5"},p:{"font-size":"15px","line-height":"1.75",color:"#0f141b","margin-top":"0","margin-bottom":"16px","letter-spacing":"0.3px"},blockquote:{"border-left":"1px solid #0e3654","border-right":"1px solid #0e3654","background-color":"transparent",color:"#56606e","padding-top":"8px","padding-right":"20px","padding-bottom":"8px","padding-left":"20px","margin-top":"0","margin-bottom":"16px","border-radius":"0","letter-spacing":"0.5px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"16px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"16px"},li:{"margin-bottom":"6px","line-height":"1.75",color:"#0f141b","letter-spacing":"0.3px"},strong:{"font-weight":"600",color:"#2a1a14"},em:{"font-style":"italic",color:"#0f141b"},a:{color:"#0e3654","text-decoration":"underline","text-underline-offset":"3px"},hr:{border:"none",height:"1px","background-color":"#d0cec8","margin-top":"24px","margin-bottom":"24px"},img:{"max-width":"100%",display:"block","margin-top":"10px","margin-right":"auto","margin-bottom":"10px","margin-left":"auto","border-radius":"2px"},pre:{"background-color":"#e6e2d8",color:"#0f141b","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"2px",border:"1px solid #d0cec8","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.18)","margin-top":"0","margin-bottom":"18px","font-size":"13px","line-height":"1.6"},code:{"background-color":"#e6e2d8",color:"#0e3654",padding:"1px 5px","border-radius":"2px","font-size":"14px"}},inline:{highlight:{"background-color":"#f1e8d1",color:"#0f141b",padding:"0 4px","border-radius":"0"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#2a1a14","text-underline-offset":"3px"},emphasis:{color:"#2a1a14","font-weight":"600"}},containers:{intro:{"background-color":"#f3f1ec","border-left":"3px solid #0e3654","border-radius":"0",padding:"12px 16px 12px 17px",margin:"0 0 24px 0",color:"#0f141b"},author:{display:"inline-block","background-color":"#e6e2d8","border-left":"2px solid #b8821f","border-radius":"0",padding:"4px 10px",margin:"0 0 16px 0",color:"#56606e","font-size":"13px","letter-spacing":"0.3px"},cover:{margin:"0 0 28px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#f3f1ec",padding:"26px 28px",margin:"24px 0","border-radius":"2px"},highlight:{"background-color":"#fefefe",padding:"18px 20px",margin:"20px 0","border-radius":"2px",border:"1px solid #d0cec8"},compare:{margin:"24px 0"},steps:{margin:"24px 0"},sectionTitle:{__reset:!0,margin:"40px 0 18px"},footerCTA:{margin:"32px 0 0 0",padding:"20px","background-color":"transparent","border-top":"1.5px solid #2a1a14","border-bottom":"1.5px solid #2a1a14","border-radius":"0"},recommend:{margin:"24px 0",padding:"14px 18px","background-color":"#f3f1ec","border-radius":"2px"},qrcode:{margin:"28px auto",padding:"0","background-color":"transparent","border-radius":"0"}},templates:{cover:`::: cover 本期议题 · 专题标题
![封面占位](https://placehold.co/1200x630?text=business-finance)

**核心判断**：一句话把观点说清楚。正文不含 emoji、不带感叹号、不用荧光色。
:::
`,authorBar:`::: author 研究员 · 张某某
2026Q1 · 阅读时长 8 分钟
:::
`,tip:`::: tip 要点
本期核心结论。不吹票、不带节奏、不用感叹号。
:::
`,footerCTA:`::: footer-cta 关注「硬核财经」
不吹票、不带节奏，只讲值得下判断的数据。
:::
`}},Vg=Gt(Ug),Gg=Object.freeze(Object.defineProperty({__proto__:null,businessFinanceTheme:Vg},Symbol.toStringTag,{value:"Module"})),Yg={id:"default",name:"默认主题",description:"有意识的中立——Medium/Notion/Substack 默认家族",palette:{primary:"#2558b0",secondary:"#8a8f98",accent:"#2558b0",bg:"#fdfdfc",bgSoft:"#f5f5f3",bgMuted:"#eceae4",text:"#1c1f24",textMuted:"#636870",textInverse:"#fefefe",border:"#d8d8d4",code:"#1c1f24"},status:{tip:{accent:"#1f8a4c",soft:"#eef6ef"},info:{accent:"#2558b0",soft:"#eef2f9"},warning:{accent:"#9a6b1a",soft:"#f7f0df"},danger:{accent:"#b42318",soft:"#fbecea"}},typography:{baseSize:15,lineHeight:1.75,h1Size:22,h2Size:19,h3Size:16,letterSpacing:.3},spacing:{paragraph:18,section:28,listItem:8,containerPadding:16},radius:{sm:4,md:6,lg:8},motifs:{h2Prefix:{viewBox:[0,0,3,20],width:3,height:16,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"rect",x:0,y:0,w:3,h:20,fill:"#2558b0"}]},dividerWave:{viewBox:[0,0,240,12],width:220,height:12,primitives:[{type:"path",d:"M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6",stroke:"#d8d8d4",strokeWidth:1.2}]},dividerDots:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"circle",cx:96,cy:4,r:2,fill:"#d8d8d4"},{type:"circle",cx:120,cy:4,r:2,fill:"#d8d8d4"},{type:"circle",cx:144,cy:4,r:2,fill:"#d8d8d4"}]},dividerFlower:{viewBox:[0,0,240,10],width:220,height:10,primitives:[{type:"line",x1:0,y1:5,x2:110,y2:5,stroke:"#d8d8d4",strokeWidth:1},{type:"line",x1:130,y1:5,x2:240,y2:5,stroke:"#d8d8d4",strokeWidth:1},{type:"circle",cx:120,cy:5,r:3,fill:"#2558b0"}]},sectionCorner:{viewBox:[0,0,14,14],width:12,height:12,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M1,1 L13,1 M1,1 L1,13",stroke:"#2558b0",strokeWidth:2,strokeLinecap:"square"}]},tipIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:6,stroke:"#1f8a4c",strokeWidth:1.5},{type:"circle",cx:8,cy:5,r:.9,fill:"#1f8a4c"},{type:"rect",x:7.25,y:7,w:1.5,h:5,rx:.4,fill:"#1f8a4c"}]},infoIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:6,stroke:"#2558b0",strokeWidth:1.5},{type:"circle",cx:8,cy:5,r:.9,fill:"#2558b0"},{type:"rect",x:7.25,y:7,w:1.5,h:5,rx:.4,fill:"#2558b0"}]},warningIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M8,2 L14.5,13.5 L1.5,13.5 Z",stroke:"#9a6b1a",strokeWidth:1.5,strokeLinejoin:"round"},{type:"rect",x:7.25,y:6,w:1.5,h:4,rx:.4,fill:"#9a6b1a"},{type:"circle",cx:8,cy:11.5,r:.9,fill:"#9a6b1a"}]},dangerIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:6,fill:"#b42318"},{type:"rect",x:3,y:7,w:10,h:2,fill:"#fefefe"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"circle",cx:12,cy:12,r:11,fill:"#2558b0"},{type:"text",x:12,y:17,content:"{N}",fontSize:14,fontWeight:700,fill:"#fefefe",textAnchor:"middle"}]}},variants:{admonition:"accent-bar",quote:"classic",compare:"column-card",steps:"number-circle",divider:"rule",sectionTitle:"bordered",codeBlock:"bare"},elements:{h1:{"font-size":"22px","font-weight":"700",color:"#1c1f24","margin-top":"28px","margin-bottom":"14px","line-height":"1.45","letter-spacing":"0.3px"},h2:{"font-size":"19px","font-weight":"700",color:"#1c1f24","margin-top":"28px","margin-bottom":"12px","line-height":"1.5","padding-bottom":"6px","border-bottom":"2px solid #2558b0","letter-spacing":"0.3px"},h3:{"font-size":"16px","font-weight":"700",color:"#1c1f24","margin-top":"22px","margin-bottom":"10px","line-height":"1.55","letter-spacing":"0.2px"},h4:{"font-size":"14px","font-weight":"600",color:"#1c1f24","margin-top":"16px","margin-bottom":"6px","line-height":"1.5","letter-spacing":"0.2px"},p:{"font-size":"15px","line-height":"1.75",color:"#1c1f24","margin-top":"0","margin-bottom":"18px","letter-spacing":"0.3px"},blockquote:{"border-left":"3px solid #2558b0","background-color":"#f5f5f3",color:"#636870","padding-top":"12px","padding-right":"16px","padding-bottom":"12px","padding-left":"16px","margin-top":"0","margin-bottom":"18px","border-radius":"4px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},li:{"margin-bottom":"8px","line-height":"1.75",color:"#1c1f24"},kbd:{display:"inline-block","background-color":"#f5f5f3",color:"#1c1f24",border:"1px solid #d8d8d4","border-bottom-width":"2px","border-radius":"3px",padding:"1px 6px","font-size":"12px","line-height":"1.4","vertical-align":"middle"},a:{color:"#2558b0","text-decoration":"underline"},hr:{border:"none",height:"1px","background-color":"#d8d8d4","margin-top":"24px","margin-bottom":"24px"},img:{"max-width":"100%",display:"block","margin-top":"10px","margin-right":"auto","margin-bottom":"10px","margin-left":"auto","border-radius":"6px"},strong:{"font-weight":"700",color:"#1c1f24"},em:{"font-style":"italic",color:"#1c1f24"},pre:{"background-color":"#2a2d32",color:"#d8d8d4","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"6px","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.28)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.6"},code:{"background-color":"#eceae4",color:"#1c1f24",padding:"2px 6px","border-radius":"3px","font-size":"14px"}},inline:{highlight:{"background-color":"#fff4c8",color:"#1c1f24",padding:"0 3px","border-radius":"2px"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#2558b0","text-underline-offset":"3px"},emphasis:{color:"#2558b0","font-weight":"600"}},containers:{intro:{"background-color":"#f5f5f3","border-radius":"6px",padding:"14px 16px",margin:"18px 0",color:"#636870","line-height":"1.7"},author:{"background-color":"#f5f5f3","border-radius":"6px",padding:"12px 14px",margin:"16px 0","font-size":"13px",color:"#636870"},cover:{margin:"20px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#f5f5f3",padding:"18px 20px",margin:"22px 0","border-radius":"6px"},highlight:{"background-color":"#fff4c8",padding:"12px 14px",margin:"16px 0","border-radius":"4px"},compare:{margin:"20px 0"},steps:{margin:"20px 0"},sectionTitle:{margin:"24px 0 12px","padding-bottom":"6px","border-bottom":"2px solid #2558b0"},footerCTA:{margin:"28px 0",padding:"16px","background-color":"#f5f5f3","border-radius":"8px",border:"1px solid #d8d8d4"},recommend:{margin:"22px 0",padding:"14px 16px","background-color":"#f5f5f3","border-radius":"6px","border-left":"3px solid #8a8f98"},qrcode:{margin:"22px 0",padding:"16px",border:"1px solid #d8d8d4","border-radius":"6px"},note:{"background-color":"transparent","border-top":"1px dashed #c8ccd4",padding:"10px 2px 8px",margin:"16px 0",color:"#636870"}}},yl=Gt(Yg),Zg=Object.freeze(Object.defineProperty({__proto__:null,defaultTheme:yl},Symbol.toStringTag,{value:"Module"})),Xg={id:"industry-observer",name:"行业观察",description:"Stratechery / Benedict Evans 家族，业内人写给业内人的周刊深度稿",palette:{primary:"#24364f",secondary:"#3d5063",accent:"#b86f2a",bg:"#fbf8f1",bgSoft:"#f5efe1",bgMuted:"#ece3cf",text:"#1a2332",textMuted:"#5a6778",textInverse:"#fefefe",border:"#e0d6c0",code:"#24364f"},status:{tip:{accent:"#2d6a5a",soft:"#dceae4"},info:{accent:"#3d5a75",soft:"#dce4ec"},warning:{accent:"#8a5a1a",soft:"#ece0c5"},danger:{accent:"#8a2a1c",soft:"#ecd4cf"}},typography:{baseSize:16,lineHeight:1.85,h1Size:26,h2Size:20,h3Size:17,letterSpacing:.3},spacing:{paragraph:18,section:32,listItem:10,containerPadding:18},radius:{sm:2,md:3,lg:4},motifs:{h2Prefix:{viewBox:[0,0,11,14],width:11,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:0,w:3,h:13,fill:"#24364f"},{type:"rect",x:7,y:5,w:3,h:3,fill:"#b86f2a"}]},sectionCorner:{viewBox:[0,0,6,6],width:5,height:5,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:7},primitives:[{type:"rect",x:0,y:0,w:3,h:3,fill:"#b86f2a"}]},quoteMark:{viewBox:[0,0,32,24],width:28,height:22,inlineStyle:{display:"inline-block",verticalAlign:"top",marginRight:4},primitives:[{type:"path",d:"M2,4 L10,4 L10,8 L6,8 L6,14 L10,14 L10,18 L2,18 Z M16,4 L24,4 L24,8 L20,8 L20,14 L24,14 L24,18 L16,18 Z",fill:"#24364f"}]},dividerFlower:{viewBox:[0,0,24,12],width:18,height:10,primitives:[{type:"path",d:"M12,2 L16,6 L12,10 L8,6 Z",fill:"#24364f"}]},dividerDots:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"circle",cx:108,cy:4,r:1.6,fill:"#e0d6c0"},{type:"circle",cx:120,cy:4,r:1.6,fill:"#e0d6c0"},{type:"circle",cx:132,cy:4,r:1.6,fill:"#e0d6c0"}]},dividerWave:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"line",x1:60,y1:4,x2:90,y2:4,stroke:"#e0d6c0",strokeWidth:1.2},{type:"line",x1:105,y1:4,x2:135,y2:4,stroke:"#e0d6c0",strokeWidth:1.2},{type:"line",x1:150,y1:4,x2:180,y2:4,stroke:"#e0d6c0",strokeWidth:1.2}]},tipIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"line",x1:3,y1:4,x2:11,y2:4,stroke:"#2d6a5a",strokeWidth:1.4,strokeLinecap:"round"},{type:"line",x1:3,y1:7,x2:11,y2:7,stroke:"#2d6a5a",strokeWidth:1.4,strokeLinecap:"round"},{type:"line",x1:3,y1:10,x2:8,y2:10,stroke:"#2d6a5a",strokeWidth:1.4,strokeLinecap:"round"}]},infoIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:7,cy:7,r:5.5,stroke:"#3d5a75",strokeWidth:1.2},{type:"rect",x:6.4,y:3.4,w:1.2,h:1.2,fill:"#3d5a75"},{type:"rect",x:6.4,y:5.6,w:1.2,h:5,fill:"#3d5a75"}]},warningIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:7,cy:7,r:5.5,stroke:"#8a5a1a",strokeWidth:1.2},{type:"path",d:"M5.2,5.2 C5.2,4 6,3.2 7,3.2 C8,3.2 8.8,4 8.8,5 C8.8,5.8 8.2,6.2 7.5,6.8 L7,7.5 L7,8.5",stroke:"#8a5a1a",strokeWidth:1.2,strokeLinecap:"round"},{type:"rect",x:6.4,y:10,w:1.2,h:1.2,fill:"#8a5a1a"}]},dangerIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:7,cy:7,r:5.5,stroke:"#8a2a1c",strokeWidth:1.2},{type:"line",x1:4.5,y1:4.5,x2:9.5,y2:9.5,stroke:"#8a2a1c",strokeWidth:1.4,strokeLinecap:"round"},{type:"line",x1:9.5,y1:4.5,x2:4.5,y2:9.5,stroke:"#8a2a1c",strokeWidth:1.4,strokeLinecap:"round"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"circle",cx:12,cy:12,r:11,fill:"#24364f"},{type:"text",x:12,y:17,content:"{N}",fontSize:15,fontWeight:700,fill:"#fefefe",textAnchor:"middle"}]},issueStamp:{viewBox:[0,0,260,24],width:260,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle"},placeholders:["issue","date","kind"],primitives:[{type:"rect",x:.5,y:.5,w:259,h:23,stroke:"#b86f2a",strokeWidth:1},{type:"rect",x:3,y:3,w:254,h:18,stroke:"#b86f2a",strokeWidth:1,opacity:.55},{type:"text",x:10,y:16,content:"ISSUE #{issue} · {date} · {kind}",fontSize:14,fontWeight:600,fill:"#b86f2a",letterSpacing:1.5}]}},variants:{admonition:"report-section",quote:"column-rule",compare:"column-card",steps:"timeline-dot",divider:"glyph",sectionTitle:"cornered",codeBlock:"bare"},elements:{h1:{"font-size":"26px","font-weight":"700",color:"#1a2332","margin-top":"28px","margin-bottom":"16px","line-height":"1.4","letter-spacing":"0.4px"},h2:{"font-size":"20px","font-weight":"700",color:"#1a2332","margin-top":"32px","margin-bottom":"14px","line-height":"1.45","letter-spacing":"0.3px","border-bottom":"none","padding-bottom":"0"},h3:{"font-size":"17px","font-weight":"600",color:"#1a2332","margin-top":"24px","margin-bottom":"10px","line-height":"1.55","letter-spacing":"0.2px"},h4:{"font-size":"15px","font-weight":"600",color:"#1a2332","margin-top":"20px","margin-bottom":"8px","line-height":"1.5","letter-spacing":"0.2px"},p:{"font-size":"16px","line-height":"1.85",color:"#1a2332","margin-top":"0","margin-bottom":"18px","letter-spacing":"0.3px"},blockquote:{"border-left":"1px solid #e0d6c0","border-right":"none","background-color":"transparent",color:"#5a6778","padding-top":"6px","padding-right":"0","padding-bottom":"6px","padding-left":"16px","margin-top":"0","margin-bottom":"18px","border-radius":"0","font-size":"15px","line-height":"1.8"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},li:{"margin-bottom":"10px","line-height":"1.85",color:"#1a2332","letter-spacing":"0.3px"},strong:{"font-weight":"600",color:"#24364f"},em:{"font-style":"italic",color:"#1a2332"},a:{color:"#24364f","text-decoration":"underline","text-underline-offset":"3px"},hr:{border:"none",height:"1px","background-color":"#e0d6c0","margin-top":"32px","margin-bottom":"32px"},img:{"max-width":"100%",display:"block","margin-top":"12px","margin-right":"auto","margin-bottom":"12px","margin-left":"auto","border-radius":"3px"},pre:{"background-color":"#ece3cf",color:"#1a2332","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"3px",border:"1px solid #e0d6c0","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.15)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.7"},code:{"background-color":"#ece3cf",color:"#24364f",padding:"1px 5px","border-radius":"2px","font-size":"14px","font-weight":"500"}},inline:{highlight:{"background-color":"#f5efe1",color:"#1a2332",padding:"0 3px","border-radius":"2px"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#b86f2a","text-underline-offset":"3px"},emphasis:{color:"#24364f","font-weight":"600"}},containers:{intro:{"background-color":"transparent","border-left":"3px solid #b86f2a","border-radius":"0",padding:"14px 16px 14px 17px",margin:"0 0 24px 0",color:"#1a2332"},author:{"background-color":"transparent","border-bottom":"1px solid #e0d6c0","border-radius":"0",padding:"10px 0",margin:"0 0 24px 0"},cover:{margin:"0 0 32px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#f5efe1",padding:"20px 28px",margin:"28px 0","border-radius":"3px"},highlight:{"background-color":"#f5efe1","border-left":"3px solid #b86f2a",padding:"8px 14px 8px 16px",margin:"20px 0","border-radius":"2px"},compare:{margin:"24px 0"},steps:{margin:"24px 0"},sectionTitle:{__reset:!0,margin:"36px 0 16px","padding-bottom":"8px"},footerCTA:{margin:"40px 0 0 0",padding:"18px 20px","background-color":"transparent","border-top":"1.5px solid #24364f","border-bottom":"1.5px solid #24364f","border-radius":"0"},recommend:{margin:"24px 0",padding:"16px 18px","background-color":"#f5efe1","border-radius":"3px"},qrcode:{margin:"24px auto",padding:"0","background-color":"transparent","border-radius":"0"}},templates:{cover:`::: cover 专题头 · 本期主标题 issue=023 date=2025-04-20 kind=周刊
![封面占位](https://placehold.co/1200x630?text=industry-observer)

副标题或一句话立意 —— 模拟 newsletter 的"本期导读"，可两到三行。
:::
`,authorBar:"::: author 林磊 role=深响编辑 date=2025-04-20 issue=023 kind=周刊\n```\n",tip:`::: tip 要点
- 本期核心观察一
- 本期核心观察二
- 本期核心观察三
:::
`,footerCTA:`::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
:::
`}},Jg=Gt(Xg),Qg=Object.freeze(Object.defineProperty({__proto__:null,industryObserverTheme:Jg},Symbol.toStringTag,{value:"Module"})),em={id:"life-aesthetic",name:"慢生活",description:"暖米底 + 圆角柔和，写写饮食、旅行与长日",palette:{primary:"#d98141",secondary:"#b96234",accent:"#efb758",bg:"#faf6f0",bgSoft:"#f2ead8",bgMuted:"#eadfc7",text:"#3a2d20",textMuted:"#7a6a58",textInverse:"#faf6f0",border:"#e0d1ba",code:"#b96234"},status:{tip:{accent:"#7ba05b",soft:"#eef3e4"},warning:{accent:"#c88e3b",soft:"#fcf1dc"},info:{accent:"#5b88a8",soft:"#e6edf3"},danger:{accent:"#c05a4e",soft:"#f8e1dc"}},typography:{baseSize:15,lineHeight:1.9,h1Size:24,h2Size:20,h3Size:17,letterSpacing:.6},spacing:{paragraph:20,section:32,listItem:10,containerPadding:18},radius:{sm:6,md:12,lg:18},motifs:{h2Prefix:{viewBox:[0,0,22,22],width:18,height:18,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"path",d:"M2,20 C8,18 16,12 20,4 C14,6 6,10 2,20 Z",fill:"#d98141",opacity:.85},{type:"path",d:"M4,18 C10,14 14,10 18,6",stroke:"#b96234",strokeWidth:1,opacity:.6}]},dividerWave:{viewBox:[0,0,240,16],width:220,height:16,primitives:[{type:"path",d:"M0,9 C18,2 36,14 54,8 C72,2 90,14 108,8 C126,2 144,14 162,8 C180,2 198,14 216,8 C228,5 240,9 240,9",stroke:"#d98141",strokeWidth:1.4,strokeLinecap:"round",opacity:.7}]},dividerDots:{viewBox:[0,0,240,14],width:220,height:14,primitives:[{type:"group",transform:"translate(70 7) rotate(0)",children:[{type:"ellipse",cx:0,cy:-3,rx:1.5,ry:3,fill:"#d98141",opacity:.75},{type:"ellipse",cx:0,cy:3,rx:1.5,ry:3,fill:"#d98141",opacity:.5},{type:"circle",cx:0,cy:0,r:1.2,fill:"#efb758"}]},{type:"group",transform:"translate(100 7) rotate(45)",children:[{type:"ellipse",cx:0,cy:-3,rx:1.5,ry:3,fill:"#d98141",opacity:.75},{type:"ellipse",cx:0,cy:3,rx:1.5,ry:3,fill:"#d98141",opacity:.5},{type:"circle",cx:0,cy:0,r:1.2,fill:"#efb758"}]},{type:"group",transform:"translate(130 7) rotate(90)",children:[{type:"ellipse",cx:0,cy:-3,rx:1.5,ry:3,fill:"#d98141",opacity:.75},{type:"ellipse",cx:0,cy:3,rx:1.5,ry:3,fill:"#d98141",opacity:.5},{type:"circle",cx:0,cy:0,r:1.2,fill:"#efb758"}]},{type:"group",transform:"translate(160 7) rotate(135)",children:[{type:"ellipse",cx:0,cy:-3,rx:1.5,ry:3,fill:"#d98141",opacity:.75},{type:"ellipse",cx:0,cy:3,rx:1.5,ry:3,fill:"#d98141",opacity:.5},{type:"circle",cx:0,cy:0,r:1.2,fill:"#efb758"}]}]},dividerFlower:{viewBox:[0,0,240,22],width:220,height:22,primitives:[{type:"path",d:"M0,11 C40,11 80,11 95,11",stroke:"#e0d1ba",strokeWidth:1},{type:"path",d:"M145,11 C170,11 200,11 240,11",stroke:"#e0d1ba",strokeWidth:1},{type:"path",d:"M120,2 C118,6 114,8 110,10 M120,2 C122,6 126,8 130,10",stroke:"#d98141",strokeWidth:1.2,opacity:.85},{type:"ellipse",cx:120,cy:14,rx:4,ry:2.5,fill:"#d98141",opacity:.7},{type:"ellipse",cx:120,cy:18,rx:3,ry:1.8,fill:"#efb758",opacity:.65}]},quoteMark:{viewBox:[0,0,48,36],width:40,height:30,inlineStyle:{display:"inline-block",verticalAlign:"top",marginRight:6},primitives:[{type:"path",d:"M4,24 C4,14 10,6 18,4 C14,10 12,16 13,22 C13,28 9,30 4,24 Z",fill:"#d98141",opacity:.42},{type:"path",d:"M26,24 C26,14 32,6 40,4 C36,10 34,16 35,22 C35,28 31,30 26,24 Z",fill:"#d98141",opacity:.42}]},sectionCorner:{viewBox:[0,0,22,18],width:18,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M1,16 C6,14 14,9 20,2 C15,3 6,6 1,16 Z",fill:"#d98141",opacity:.85},{type:"line",x1:1,y1:16,x2:8,y2:10,stroke:"#b96234",strokeWidth:1,opacity:.6}]},tipIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:7,fill:"#7ba05b",opacity:.2},{type:"circle",cx:8,cy:8,r:7,stroke:"#7ba05b",strokeWidth:1.2},{type:"path",d:"M5,8 L7.5,10.5 L11,6",stroke:"#7ba05b",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}]},warningIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:7,fill:"#c88e3b",opacity:.2},{type:"circle",cx:8,cy:8,r:7,stroke:"#c88e3b",strokeWidth:1.2},{type:"rect",x:7,y:4,w:2,h:5,rx:1,fill:"#c88e3b"},{type:"circle",cx:8,cy:11.5,r:1,fill:"#c88e3b"}]},infoIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:7,fill:"#5b88a8",opacity:.2},{type:"circle",cx:8,cy:8,r:7,stroke:"#5b88a8",strokeWidth:1.2},{type:"circle",cx:8,cy:4.5,r:1,fill:"#5b88a8"},{type:"rect",x:7,y:6.5,w:2,h:6,rx:1,fill:"#5b88a8"}]},dangerIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:7,fill:"#c05a4e",opacity:.2},{type:"circle",cx:8,cy:8,r:7,stroke:"#c05a4e",strokeWidth:1.2},{type:"path",d:"M5,5 L11,11 M11,5 L5,11",stroke:"#c05a4e",strokeWidth:1.8,strokeLinecap:"round"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"circle",cx:12,cy:12,r:11,fill:"#d98141",opacity:.22},{type:"circle",cx:12,cy:12,r:11,stroke:"#d98141",strokeWidth:1.2},{type:"text",x:12,y:17,content:"{N}",fontSize:15,fontWeight:700,fill:"#d98141",textAnchor:"middle"}]}},variants:{admonition:"bubble-organic",quote:"classic",compare:"column-card",steps:"number-circle",divider:"rule",sectionTitle:"bordered",codeBlock:"bare"},elements:{h2:{"font-size":"20px","font-weight":"700",color:"#3a2d20","margin-top":"30px","margin-bottom":"14px","line-height":"1.5","padding-bottom":"6px","border-bottom":"2px dotted #d98141"},blockquote:{"border-left":"4px solid #d98141","background-color":"#f2ead8",color:"#7a6a58","padding-top":"14px","padding-right":"18px","padding-bottom":"14px","padding-left":"18px","margin-top":"0","margin-bottom":"20px","border-radius":"12px","font-style":"italic"},pre:{"background-color":"#fffaef",color:"#3a2d20","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"10px",border:"1px solid #e0d1ba","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(90,60,30,0.18)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.7"},code:{"background-color":"#f3e4cc",color:"#b96234",padding:"2px 6px","border-radius":"4px","font-size":"14px"}},containers:{quoteCard:{"background-color":"#fffaf1",padding:"22px 20px",margin:"22px 0","border-radius":"14px",border:"1px dashed #e0d1ba"}},templates:{cover:`::: cover 本期主题
![封面占位](https://placehold.co/1200x630?text=life)

_一盏茶、一扇窗、一些可以慢下来的小事。_
:::
`,authorBar:`::: author 如初 role=生活作者
写于一个有风的下午。

记录日常、饭桌与缓慢的季节。
:::
`}},tm=Gt(em),nm=Object.freeze(Object.defineProperty({__proto__:null,lifeAestheticTheme:tm},Symbol.toStringTag,{value:"Module"})),im={id:"literary-humanism",name:"人文札记",description:"宋椠古籍 + 克制留白，给散文、书评、长评留足呼吸",palette:{primary:"#5a4a3a",secondary:"#3d4a3d",accent:"#9a3b2e",bg:"#f4efe3",bgSoft:"#ece5d1",bgMuted:"#ddd3bb",text:"#1f1b14",textMuted:"#6b5f4a",textInverse:"#fefefe",border:"#cfc3a8",code:"#6b5f4a"},status:{tip:{accent:"#4a6b3e",soft:"#e3e8d6"},warning:{accent:"#8a6428",soft:"#efe3c9"},info:{accent:"#3d5a75",soft:"#dce3ec"},danger:{accent:"#8e3a2d",soft:"#ecd6cf"}},typography:{baseSize:16,lineHeight:2,h1Size:26,h2Size:19,h3Size:16,letterSpacing:1},spacing:{paragraph:22,section:36,listItem:12,containerPadding:18},radius:{sm:0,md:0,lg:0},motifs:{h2Prefix:{viewBox:[0,0,4,22],width:4,height:20,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:0,w:2,h:20,fill:"#5a4a3a"}]},dividerFlower:{viewBox:[0,0,240,18],width:220,height:18,primitives:[{type:"line",x1:4,y1:9,x2:104,y2:9,stroke:"#cfc3a8",strokeWidth:1},{type:"line",x1:136,y1:9,x2:236,y2:9,stroke:"#cfc3a8",strokeWidth:1},{type:"path",d:"M104,9 A5.33,5.33 0 0 1 114.67,9 A5.33,5.33 0 0 1 125.33,9 A5.33,5.33 0 0 1 136,9 L136,13 L104,13 Z",fill:"#5a4a3a",opacity:.82},{type:"circle",cx:120,cy:16,r:1.5,fill:"#9a3b2e",opacity:.85}]},dividerDots:{viewBox:[0,0,240,12],width:220,height:12,primitives:[{type:"line",x1:0,y1:6,x2:108,y2:6,stroke:"#cfc3a8",strokeWidth:1},{type:"line",x1:132,y1:6,x2:240,y2:6,stroke:"#cfc3a8",strokeWidth:1},{type:"rect",x:115,y:1,w:10,h:10,stroke:"#5a4a3a",strokeWidth:1,opacity:.7},{type:"path",d:"M117,3 L123,3 L123,9",stroke:"#5a4a3a",strokeWidth:1,opacity:.7},{type:"path",d:"M119,5 L121,5 L121,7",stroke:"#5a4a3a",strokeWidth:1,opacity:.7}]},dividerWave:{viewBox:[0,0,240,20],width:220,height:20,primitives:[{type:"path",d:"M20,10 C60,2 100,18 140,10 C170,5 200,14 220,10",stroke:"#5a4a3a",strokeWidth:1,opacity:.6},{type:"ellipse",cx:80,cy:6,rx:3,ry:1.4,fill:"#5a4a3a",opacity:.55},{type:"circle",cx:80,cy:6,r:1.1,fill:"#9a3b2e",opacity:.75},{type:"ellipse",cx:160,cy:14,rx:3,ry:1.4,fill:"#5a4a3a",opacity:.55},{type:"circle",cx:160,cy:14,r:1.1,fill:"#9a3b2e",opacity:.75}]},sectionCorner:{viewBox:[0,0,20,20],width:16,height:16,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"path",d:"M2,2 L14,2 L18,6 L18,18 L2,18 Z",stroke:"#5a4a3a",strokeWidth:1,opacity:.85},{type:"path",d:"M14,2 L14,6 L18,6",stroke:"#5a4a3a",strokeWidth:1,opacity:.85}]},tipIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M4,2 L2,4 L2,10 L4,12",stroke:"#4a6b3e",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"},{type:"path",d:"M8,2 L10,4 L10,10 L8,12",stroke:"#4a6b3e",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"}]},infoIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:7,cy:5,r:1,fill:"#3d5a75",opacity:.9},{type:"line",x1:3,y1:10,x2:11,y2:10,stroke:"#3d5a75",strokeWidth:1.2,opacity:.85}]},warningIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M2,4 L4,2 L10,2 L12,4",stroke:"#8a6428",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"},{type:"path",d:"M2,8 L4,6 L10,6 L12,8",stroke:"#8a6428",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"}]},dangerIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M10,2 L12,4 L12,10 L10,12",stroke:"#8e3a2d",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"},{type:"path",d:"M6,2 L4,4 L4,10 L6,12",stroke:"#8e3a2d",strokeWidth:1.4,strokeLinejoin:"round",strokeLinecap:"round"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"circle",cx:12,cy:12,r:11,fill:"#5a4a3a",opacity:.08},{type:"circle",cx:12,cy:12,r:11,stroke:"#5a4a3a",strokeWidth:1.2},{type:"circle",cx:12,cy:12,r:8.5,stroke:"#5a4a3a",strokeWidth:1,opacity:.55},{type:"text",x:12,y:17,content:"{N}",fontSize:15,fontWeight:700,fill:"#5a4a3a",textAnchor:"middle"}]},sealMark:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle"},primitives:[{type:"rect",x:1,y:1,w:22,h:22,stroke:"#9a3b2e",strokeWidth:1.4,opacity:.92},{type:"line",x1:3,y1:12,x2:21,y2:12,stroke:"#9a3b2e",strokeWidth:1,opacity:.5},{type:"line",x1:7,y1:6.5,x2:17,y2:6.5,stroke:"#9a3b2e",strokeWidth:1.1,opacity:.85},{type:"line",x1:12,y1:4,x2:12,y2:9,stroke:"#9a3b2e",strokeWidth:1.1,opacity:.85},{type:"line",x1:7,y1:17.5,x2:17,y2:17.5,stroke:"#9a3b2e",strokeWidth:1.1,opacity:.85},{type:"line",x1:12,y1:15,x2:12,y2:20,stroke:"#9a3b2e",strokeWidth:1.1,opacity:.85}]}},variants:{admonition:"marginalia",quote:"magazine-dropcap",compare:"column-card",steps:"timeline-dot",divider:"flower",sectionTitle:"cornered",codeBlock:"bare"},elements:{h1:{"font-size":"26px","font-weight":"700",color:"#1f1b14","margin-top":"30px","margin-bottom":"18px","line-height":"1.5","letter-spacing":"3px","text-align":"center"},h2:{"font-size":"19px","font-weight":"600",color:"#1f1b14","margin-top":"32px","margin-bottom":"14px","line-height":"1.6","letter-spacing":"2px","padding-bottom":"8px","border-bottom":"1px solid #cfc3a8"},h3:{"font-size":"16px","font-weight":"600",color:"#1f1b14","margin-top":"22px","margin-bottom":"10px","line-height":"1.7","letter-spacing":"1.2px"},h4:{"font-size":"15px","font-weight":"600",color:"#1f1b14","margin-top":"18px","margin-bottom":"8px","line-height":"1.6","letter-spacing":"1px"},p:{"font-size":"16px","line-height":"2.0",color:"#1f1b14","margin-top":"0","margin-bottom":"22px","letter-spacing":"1px"},blockquote:{__reset:!0,"border-left":"1px solid #5a4a3a","border-right":"1px solid #5a4a3a","background-color":"transparent",color:"#6b5f4a","padding-top":"8px","padding-right":"22px","padding-bottom":"8px","padding-left":"22px","margin-top":"0","margin-bottom":"22px","letter-spacing":"1.2px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"22px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"22px"},li:{"margin-bottom":"12px","line-height":"2.0",color:"#1f1b14","letter-spacing":"1px"},a:{color:"#5a4a3a","text-decoration":"underline"},hr:{border:"none",height:"1px","background-color":"#cfc3a8","margin-top":"36px","margin-bottom":"36px"},img:{"max-width":"100%",display:"block","margin-top":"10px","margin-right":"auto","margin-bottom":"10px","margin-left":"auto","border-radius":"0"},strong:{"font-weight":"500",color:"#1f1b14"},em:{"font-style":"italic",color:"#1f1b14"},pre:{"background-color":"#ece5d1",color:"#1f1b14","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"0",border:"1px solid #cfc3a8","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.15)","margin-top":"0","margin-bottom":"22px","font-size":"13px","line-height":"1.7"},code:{"background-color":"#ddd3bb",color:"#6b5f4a",padding:"2px 6px","border-radius":"0","font-size":"14px"}},inline:{highlight:{"background-color":"#ece5d1",color:"#1f1b14",padding:"0 3px","border-radius":"0"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#5a4a3a","text-underline-offset":"3px"},emphasis:{color:"#5a4a3a","font-weight":"500"}},containers:{intro:{"background-color":"#ece5d1","border-left":"2px solid #5a4a3a","border-radius":"0",padding:"14px 20px 14px 22px",margin:"0 0 28px 0",color:"#6b5f4a","letter-spacing":"1.5px"},author:{display:"inline-block","background-color":"#ece5d1","border-radius":"0",padding:"6px 14px",margin:"16px 0",color:"#5a4a3a","font-size":"14px","letter-spacing":"1px"},cover:{margin:"0 0 36px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#ece5d1",padding:"28px 24px",margin:"24px 0","border-radius":"0",border:"1px solid #cfc3a8"},highlight:{"background-color":"#ece5d1",padding:"14px 24px",margin:"24px 0","border-radius":"0","letter-spacing":"1.5px"},compare:{margin:"24px 0"},steps:{margin:"24px 0"},sectionTitle:{margin:"40px 0 18px","padding-bottom":"8px","border-bottom":"1px solid #cfc3a8"},footerCTA:{margin:"36px 0",padding:"28px 0 20px 0","background-color":"transparent","border-radius":"0"},recommend:{margin:"28px 0",padding:"16px 20px","background-color":"#ece5d1","border-radius":"0"},qrcode:{margin:"28px 0",padding:"16px","background-color":"transparent","border-radius":"0"},note:{__reset:!0,"background-color":"transparent",padding:"4px 0 4px 28px",margin:"20px 0","border-radius":"0"}},templates:{cover:`::: cover 卷首语
![封面占位](https://placehold.co/1200x630?text=humanism)

_写于春分后第二日，时雨初歇。_
:::
`,authorBar:`::: author 钟山 role=主笔
长读深耕，短评不妄。
:::
`,tip:`::: tip 批注
旁批·眉批 —— 最轻的一档提示，无边框，仅标题下方一道短线。
:::
`}},rm=Gt(im),om=Object.freeze(Object.defineProperty({__proto__:null,literaryHumanismTheme:rm},Symbol.toStringTag,{value:"Module"})),sm={id:"people-story",name:"人物特稿",description:'《人物》杂志 / New Yorker Profiles 家族，特稿的"肖像感"排版',palette:{primary:"#1b2330",secondary:"#4a5260",accent:"#8a3f2b",bg:"#f2efe7",bgSoft:"#e9e5db",bgMuted:"#dcd7c9",text:"#17171a",textMuted:"#5d5d63",textInverse:"#f2efe7",border:"#c8c2b3",code:"#5d5d63"},status:{tip:{accent:"#4a6a7a",soft:"#d9dfe2"},info:{accent:"#556170",soft:"#d6d9dd"},warning:{accent:"#7a6b3a",soft:"#e2ddc8"},danger:{accent:"#6b3a32",soft:"#dccdc7"}},typography:{baseSize:16,lineHeight:1.75,h1Size:28,h2Size:20,h3Size:16,letterSpacing:.5},spacing:{paragraph:20,section:36,listItem:10,containerPadding:20},radius:{sm:0,md:0,lg:2},motifs:{h2Prefix:{viewBox:[0,0,3,13],width:3,height:13,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:0,w:3,h:13,fill:"#1b2330"}]},sectionCorner:{viewBox:[0,0,24,24],width:18,height:18,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"circle",cx:12,cy:7,r:4.5,fill:"#c8c2b3"},{type:"path",d:"M8,16 L16,16 L19,22 L5,22 Z",fill:"#c8c2b3"}]},quoteMark:{viewBox:[0,0,60,52],width:48,height:42,inlineStyle:{display:"inline-block",verticalAlign:"top",marginRight:6},primitives:[{type:"path",d:"M10,4 C4,10 4,24 10,34 C14,40 22,38 22,30 C22,24 16,22 14,22 C14,14 16,10 22,6 L22,4 Z M36,4 C30,10 30,24 36,34 C40,40 48,38 48,30 C48,24 42,22 40,22 C40,14 42,10 48,6 L48,4 Z",fill:"#8a3f2b",opacity:.92}]},dividerFlower:{viewBox:[0,0,240,12],width:220,height:12,primitives:[{type:"line",x1:30,y1:6,x2:110,y2:6,stroke:"#c8c2b3",strokeWidth:1},{type:"line",x1:130,y1:6,x2:210,y2:6,stroke:"#c8c2b3",strokeWidth:1},{type:"path",d:"M120,2 L124,6 L120,10 L116,6 Z",fill:"#1b2330",opacity:.7}]},dividerDots:{viewBox:[0,0,100,8],width:100,height:8,primitives:[{type:"line",x1:6,y1:4,x2:46,y2:4,stroke:"#c8c2b3",strokeWidth:1},{type:"circle",cx:50,cy:4,r:1.8,fill:"#5d5d63"},{type:"line",x1:54,y1:4,x2:94,y2:4,stroke:"#c8c2b3",strokeWidth:1}]},dividerWave:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"line",x1:60,y1:4,x2:90,y2:4,stroke:"#c8c2b3",strokeWidth:1},{type:"line",x1:105,y1:4,x2:135,y2:4,stroke:"#c8c2b3",strokeWidth:1},{type:"line",x1:150,y1:4,x2:180,y2:4,stroke:"#c8c2b3",strokeWidth:1}]},tipIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:7,cy:7,r:1.2,fill:"#4a6a7a",opacity:.7},{type:"line",x1:3,y1:10.5,x2:11,y2:10.5,stroke:"#4a6a7a",strokeWidth:1,opacity:.7}]},infoIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:6.5,y:3,w:1,h:1.5,fill:"#556170",opacity:.7},{type:"rect",x:6.5,y:6,w:1,h:5,fill:"#556170",opacity:.7}]},warningIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M3,7 L6,10 L11,4",stroke:"#7a6b3a",strokeWidth:1,strokeLinecap:"round",strokeLinejoin:"round",opacity:.7}]},dangerIcon:{viewBox:[0,0,14,14],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:6.4,y:3,w:1.2,h:8,fill:"#6b3a32",opacity:.7}]},stepBadge:{viewBox:[0,0,40,40],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},placeholders:["N"],primitives:[{type:"text",x:20,y:26,content:"{N}",fontSize:24,fontWeight:700,fill:"#8a3f2b",textAnchor:"middle"},{type:"line",x1:8,y1:32,x2:32,y2:32,stroke:"#8a3f2b",strokeWidth:1.2}]}},variants:{admonition:"magazine-pull",quote:"magazine-dropcap",compare:"column-card",steps:"timeline-dot",divider:"rule",sectionTitle:"cornered",codeBlock:"bare"},behavior:{introDropcap:!0,h2RomanNumerals:!0},elements:{h1:{"font-size":"28px","font-weight":"700",color:"#17171a","margin-top":"28px","margin-bottom":"16px","line-height":"1.35","letter-spacing":"1.2px","text-align":"left"},h2:{"font-size":"20px","font-weight":"600",color:"#17171a","margin-top":"30px","margin-bottom":"12px","line-height":"1.5","letter-spacing":"1px","border-bottom":"none","padding-bottom":"0"},h3:{"font-size":"16px","font-weight":"600",color:"#17171a","margin-top":"22px","margin-bottom":"10px","line-height":"1.7","letter-spacing":"0.8px"},h4:{"font-size":"15px","font-weight":"600",color:"#17171a","margin-top":"18px","margin-bottom":"8px","line-height":"1.6","letter-spacing":"0.5px"},p:{"font-size":"16px","line-height":"1.75",color:"#17171a","margin-top":"0","margin-bottom":"20px","letter-spacing":"0.5px"},blockquote:{"border-left":"1px solid #5d5d63","border-right":"1px solid #5d5d63","background-color":"transparent",color:"#5d5d63","padding-top":"8px","padding-right":"20px","padding-bottom":"8px","padding-left":"20px","margin-top":"0","margin-bottom":"18px","border-radius":"0","font-size":"16px","letter-spacing":"0.8px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"20px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"20px"},li:{"margin-bottom":"10px","line-height":"1.75",color:"#17171a","letter-spacing":"0.5px"},strong:{"font-weight":"500",color:"#17171a"},em:{"font-style":"italic",color:"#17171a"},a:{color:"#1b2330","text-decoration":"underline"},hr:{border:"none",height:"1px","background-color":"#c8c2b3","margin-top":"36px","margin-bottom":"36px"},img:{"max-width":"100%",display:"block","margin-top":"12px","margin-right":"auto","margin-bottom":"12px","margin-left":"auto","border-radius":"0"},pre:{"background-color":"#dcd7c9",color:"#17171a","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"0",border:"1px solid #c8c2b3","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.12)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.7"},code:{"background-color":"#dcd7c9",color:"#5d5d63",padding:"1px 5px","border-radius":"0","font-size":"14px"}},inline:{highlight:{"background-color":"#e9e5db",color:"#17171a",padding:"0 3px","border-radius":"0"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#1b2330","text-underline-offset":"3px"},emphasis:{color:"#1b2330","font-weight":"500"}},containers:{intro:{"background-color":"#e9e5db","border-radius":"0",padding:"20px 24px",margin:"0 0 32px 0",color:"#17171a"},author:{"background-color":"transparent","border-radius":"0",padding:"10px 0",margin:"0 0 24px 0"},cover:{margin:"0 0 40px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"transparent","border-radius":"0",border:"none",padding:"24px 24px 20px 36px",margin:"32px 0"},highlight:{"background-color":"transparent","border-radius":"0",padding:"16px 0",margin:"20px 0"},compare:{margin:"24px 0"},steps:{margin:"28px 0"},sectionTitle:{margin:"48px 0 20px","padding-bottom":"10px","border-bottom":"1px solid #c8c2b3"},footerCTA:{margin:"40px 0 0 0",padding:"32px 0 24px 0","background-color":"transparent","border-radius":"0","text-align":"center"},recommend:{margin:"28px 0",padding:"18px 22px","background-color":"#e9e5db","border-radius":"0"},qrcode:{margin:"24px auto",padding:"0","background-color":"transparent","border-radius":"0"}},templates:{cover:`::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::
`,authorBar:`::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 4 月刊
:::
`,tip:`::: tip 采访手记
记者笔记本里的旁注 —— 最轻的一档，无边框，仅标题下方一道短线。
:::
`,footerCTA:`::: footer-cta 卷尾致谢
本文基于 2026 年 3 月至 6 月多次采访整理而成。

感谢受访者及所有提供帮助的朋友。
:::
`}},am=Gt(sm),cm=Object.freeze(Object.defineProperty({__proto__:null,peopleStoryTheme:am},Symbol.toStringTag,{value:"Module"})),lm={id:"tech-explainer",name:"文档白昼",description:"Stripe Docs / MDN 家族，手把手跟做的技术产品文档",palette:{primary:"#0066cc",secondary:"#4a90e2",accent:"#f59e0b",bg:"#fafbfc",bgSoft:"#f3f5f8",bgMuted:"#e8ecf1",text:"#1a2233",textMuted:"#5c6778",textInverse:"#fefefe",border:"#d9dee5",code:"#0066cc"},status:{tip:{accent:"#0d9f7f",soft:"#e6f5f0"},info:{accent:"#0066cc",soft:"#e6f0fb"},warning:{accent:"#b87614",soft:"#fdf4e2"},danger:{accent:"#c8322d",soft:"#fce9e7"}},typography:{baseSize:15,lineHeight:1.75,h1Size:26,h2Size:21,h3Size:17,letterSpacing:.3},spacing:{paragraph:18,section:28,listItem:8,containerPadding:16},radius:{sm:3,md:6,lg:10},motifs:{h2Prefix:{viewBox:[0,0,3,16],width:3,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:0,w:3,h:16,fill:"#0066cc"}]},tipIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M8,2 C5.5,2 3.8,4 3.8,6.4 C3.8,8 4.6,9.2 5.6,10 L5.6,11.5 L10.4,11.5 L10.4,10 C11.4,9.2 12.2,8 12.2,6.4 C12.2,4 10.5,2 8,2 Z",stroke:"#0d9f7f",strokeWidth:1.5,strokeLinejoin:"round"},{type:"line",x1:6,y1:12.5,x2:10,y2:12.5,stroke:"#0d9f7f",strokeWidth:1.5},{type:"line",x1:6.5,y1:14,x2:9.5,y2:14,stroke:"#0d9f7f",strokeWidth:1.5}]},noteIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"circle",cx:8,cy:8,r:6,stroke:"#5c6778",strokeWidth:1.5},{type:"circle",cx:8,cy:5,r:.9,fill:"#5c6778"},{type:"rect",x:7.25,y:7,w:1.5,h:5,rx:.4,fill:"#5c6778"}]},infoIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:2,y:2,w:12,h:12,rx:2,stroke:"#0066cc",strokeWidth:1.5},{type:"circle",cx:8,cy:5,r:.9,fill:"#0066cc"},{type:"rect",x:7.25,y:7,w:1.5,h:5,rx:.4,fill:"#0066cc"}]},warningIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M8,2 L14.5,13.5 L1.5,13.5 Z",stroke:"#b87614",strokeWidth:1.5,strokeLinejoin:"round"},{type:"rect",x:7.25,y:6,w:1.5,h:4,rx:.4,fill:"#b87614"},{type:"circle",cx:8,cy:11.5,r:.9,fill:"#b87614"}]},dangerIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M5.2,1.5 L10.8,1.5 L14.5,5.2 L14.5,10.8 L10.8,14.5 L5.2,14.5 L1.5,10.8 L1.5,5.2 Z",stroke:"#c8322d",strokeWidth:1.5,strokeLinejoin:"round"},{type:"line",x1:5.5,y1:5.5,x2:10.5,y2:10.5,stroke:"#c8322d",strokeWidth:1.5,strokeLinecap:"round"},{type:"line",x1:10.5,y1:5.5,x2:5.5,y2:10.5,stroke:"#c8322d",strokeWidth:1.5,strokeLinecap:"round"}]},stepBadge:{viewBox:[0,0,24,24],width:24,height:24,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"circle",cx:12,cy:12,r:11,fill:"#0066cc"},{type:"text",x:12,y:17,content:"{N}",fontSize:15,fontWeight:600,fill:"#fefefe",textAnchor:"middle"}]},copyIcon:{viewBox:[0,0,16,16],width:14,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle"},primitives:[{type:"rect",x:5,y:2,w:9,h:9,rx:1.5,stroke:"#5c6778",strokeWidth:1.5},{type:"rect",x:2,y:5,w:9,h:9,rx:1.5,stroke:"#5c6778",strokeWidth:1.5}]},externalLinkIcon:{viewBox:[0,0,12,12],width:10,height:10,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginLeft:3},primitives:[{type:"path",d:"M5.5,1.5 L10.5,1.5 L10.5,6.5",stroke:"#0066cc",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"},{type:"line",x1:10.5,y1:1.5,x2:5.5,y2:6.5,stroke:"#0066cc",strokeWidth:1.5,strokeLinecap:"round"},{type:"path",d:"M8.5,10.5 L1.5,10.5 L1.5,3.5",stroke:"#0066cc",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"}]},terminalPrompt:{viewBox:[0,0,18,14],width:14,height:12,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:4},primitives:[{type:"text",x:9,y:11,content:"$",fontSize:14,fontWeight:600,fill:"#0066cc",textAnchor:"middle"}]},sectionCorner:{viewBox:[0,0,14,14],width:12,height:12,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"path",d:"M1,1 L13,1 L13,4 L4,4 L4,13 L1,13 Z",fill:"#0066cc"}]},dividerDots:{viewBox:[0,0,120,6],width:60,height:6,primitives:[{type:"circle",cx:30,cy:3,r:2,fill:"#0066cc"},{type:"circle",cx:50,cy:3,r:2,fill:"#0066cc"},{type:"circle",cx:70,cy:3,r:2.5,fill:"#0066cc"},{type:"circle",cx:90,cy:3,r:2,fill:"#0066cc"}]}},variants:{admonition:"accent-bar",quote:"column-rule",compare:"column-card",steps:"number-circle",divider:"rule",sectionTitle:"bordered",codeBlock:"header-bar"},elements:{h1:{"font-size":"26px","font-weight":"700",color:"#1a2233","margin-top":"28px","margin-bottom":"14px","line-height":"1.35","letter-spacing":"0"},h2:{"font-size":"21px","font-weight":"600",color:"#1a2233","margin-top":"32px","margin-bottom":"14px","line-height":"1.4","padding-bottom":"8px","border-bottom":"1px solid #d9dee5","letter-spacing":"0"},h3:{"font-size":"17px","font-weight":"600",color:"#1a2233","margin-top":"24px","margin-bottom":"10px","line-height":"1.5","letter-spacing":"0"},h4:{"font-size":"15px","font-weight":"600",color:"#0066cc","margin-top":"20px","margin-bottom":"8px","line-height":"1.5","letter-spacing":"0.3px"},p:{"font-size":"15px","line-height":"1.75",color:"#1a2233","margin-top":"0","margin-bottom":"18px","letter-spacing":"0.3px"},blockquote:{"border-left":"3px solid #d9dee5","background-color":"transparent",color:"#5c6778","padding-top":"4px","padding-right":"0","padding-bottom":"4px","padding-left":"16px","margin-top":"0","margin-bottom":"18px","border-radius":"0","font-style":"italic"},kbd:{display:"inline-block","background-color":"#fafbfc",color:"#1a2233",border:"1px solid #d9dee5","border-bottom-width":"2px","border-radius":"3px",padding:"2px 6px","font-size":"12px","line-height":"1.4","letter-spacing":"0.2px","vertical-align":"middle"},a:{color:"#0066cc","text-decoration":"underline","text-underline-offset":"3px"},hr:{border:"none",height:"1px","background-color":"#d9dee5","margin-top":"28px","margin-bottom":"28px"},img:{"max-width":"100%",display:"block","margin-top":"18px","margin-right":"auto","margin-bottom":"18px","margin-left":"auto",border:"1px solid #d9dee5","border-radius":"6px"},strong:{"font-weight":"600",color:"#1a2233"},em:{"font-style":"italic",color:"#1a2233"},pre:{"background-color":"#1e2533",color:"#e8ebf0","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"6px","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -16px 0 12px -10px rgba(255,255,255,0.18)","margin-top":"0","margin-bottom":"20px","font-size":"13px","line-height":"1.6"},code:{"background-color":"#e8ecf1",color:"#0066cc",padding:"1px 4px","border-radius":"3px","font-size":"14px","font-weight":"500","letter-spacing":"0"}},inline:{highlight:{"background-color":"#e6f0fb",color:"#0066cc",padding:"0 3px","border-radius":"2px","font-weight":"500"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#f59e0b","text-underline-offset":"3px"},emphasis:{color:"#0066cc","font-weight":"600"}},containers:{intro:{"background-color":"#f3f5f8","border-left":"3px solid #0066cc","border-radius":"0 6px 6px 0",padding:"14px 18px",margin:"20px 0",color:"#5c6778"},author:{__reset:!0,"background-color":"transparent",padding:"8px 0",margin:"12px 0",color:"#5c6778","border-bottom":"1px solid #d9dee5"},cover:{"background-color":"#fafbfc",padding:"20px 0 24px",margin:"16px 0","border-bottom":"1px solid #d9dee5"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#f3f5f8","border-left":"3px solid #0d9f7f",padding:"16px 18px",margin:"20px 0","border-radius":"0 6px 6px 0"},highlight:{"background-color":"#fdf4e2","border-left":"3px solid #f59e0b",padding:"14px 18px",margin:"18px 0","border-radius":"0 6px 6px 0"},compare:{margin:"20px 0"},steps:{margin:"20px 0","border-left":"1px solid #d9dee5","padding-left":"24px"},sectionTitle:{margin:"32px 0 14px","padding-bottom":"8px","border-bottom":"1px solid #d9dee5"},footerCTA:{margin:"28px 0",padding:"16px 18px","background-color":"#f3f5f8","border-radius":"6px"},recommend:{__reset:!0,margin:"24px 0",padding:"14px 0","background-color":"transparent","border-top":"1px solid #d9dee5","border-bottom":"1px solid #d9dee5"},qrcode:{margin:"24px 0",padding:"16px","background-color":"#f3f5f8","border-radius":"6px"},note:{__reset:!0,"background-color":"transparent","border-top":"1px solid #d9dee5",padding:"10px 0 4px 0",margin:"18px 0","border-radius":"0"}},templates:{tip:`::: tip Tip · 小贴士
一句提醒读者的经验法则。
:::
`,cover:"::: cover 标题占位\n副标题或一句话立意。\n\n`前置知识`：`HTML` `CSS` `JavaScript 基础`\n\n_15 分钟阅读 · 最后更新 2026-04-20_\n:::\n"}},dm=Gt(lm),pm=Object.freeze(Object.defineProperty({__proto__:null,techExplainerTheme:dm},Symbol.toStringTag,{value:"Module"})),fm={id:"tech-geek",name:"极客夜行",description:"VT220 琥珀 + 墨炭暖底 + manpage 印刷传统，成年工程师的工程写作",palette:{primary:"#c89759",secondary:"#8a7a54",accent:"#e06a28",bg:"#262019",bgSoft:"#2f2920",bgMuted:"#3a3328",text:"#ebdfca",textMuted:"#9a8f7e",textInverse:"#262019",border:"#4a4034",code:"#c89759"},status:{tip:{accent:"#a8c08a",soft:"#1e1f16"},warning:{accent:"#e06a28",soft:"#1e1710"},info:{accent:"#7a9cb8",soft:"#161b1f"},danger:{accent:"#c85a3a",soft:"#1f1612"}},typography:{baseSize:15,lineHeight:1.85,h1Size:25,h2Size:19,h3Size:16,letterSpacing:.6},spacing:{paragraph:18,section:28,listItem:8,containerPadding:16},radius:{sm:2,md:4,lg:6},motifs:{h2Prefix:{viewBox:[0,0,4,18],width:4,height:16,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:10},primitives:[{type:"rect",x:0,y:2,w:4,h:5,fill:"#c89759"},{type:"rect",x:0,y:11,w:4,h:5,fill:"#c89759"}]},dividerWave:{viewBox:[0,0,240,6],width:220,height:6,primitives:[{type:"rect",x:20,y:2,w:92,h:2,fill:"#c89759"},{type:"rect",x:128,y:2,w:92,h:2,fill:"#c89759"}]},dividerDots:{viewBox:[0,0,240,10],width:220,height:10,primitives:[{type:"circle",cx:80,cy:5,r:1.5,fill:"#4a4034"},{type:"circle",cx:100,cy:5,r:1.5,fill:"#4a4034"},{type:"circle",cx:120,cy:5,r:1.8,fill:"#c89759"},{type:"circle",cx:140,cy:5,r:1.5,fill:"#4a4034"},{type:"circle",cx:160,cy:5,r:1.5,fill:"#4a4034"}]},dividerFlower:{viewBox:[0,0,240,8],width:220,height:8,primitives:[{type:"line",x1:12,y1:3,x2:228,y2:3,stroke:"#4a4034",strokeWidth:1},{type:"line",x1:12,y1:6,x2:228,y2:6,stroke:"#4a4034",strokeWidth:1}]},quoteMark:{viewBox:[0,0,40,24],width:36,height:22,inlineStyle:{display:"inline-block",verticalAlign:"top",marginRight:6},primitives:[{type:"path",d:"M12,4 L4,12 L12,20",stroke:"#c89759",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},{type:"path",d:"M28,4 L36,12 L28,20",stroke:"#c89759",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}]},sectionCorner:{viewBox:[0,0,8,16],width:7,height:14,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},primitives:[{type:"rect",x:0,y:1,w:8,h:8,fill:"#c89759"},{type:"rect",x:6,y:7,w:2,h:2,fill:"#262019"}]},warningIcon:{viewBox:[0,0,12,12],width:10,height:10,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:2,y:2,w:8,h:8,fill:"#e06a28"}]},infoIcon:{viewBox:[0,0,14,12],width:12,height:10,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"line",x1:1,y1:6,x2:13,y2:6,stroke:"#7a9cb8",strokeWidth:1.5}]},dangerIcon:{viewBox:[0,0,12,12],width:10,height:10,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:6},primitives:[{type:"rect",x:2,y:2,w:8,h:8,fill:"#c85a3a"}]},stepBadge:{viewBox:[0,0,26,22],width:24,height:20,inlineStyle:{display:"inline-block",verticalAlign:"middle",marginRight:8},placeholders:["N"],primitives:[{type:"text",x:13,y:15,content:"{N}",fontSize:15,fontWeight:600,fill:"#c89759",textAnchor:"middle"},{type:"line",x1:4,y1:19,x2:22,y2:19,stroke:"#c89759",strokeWidth:1}]}},variants:{admonition:"manpage-log",quote:"frame-brackets",compare:"column-card",steps:"number-circle",divider:"wave",sectionTitle:"cornered",codeBlock:"bare"},elements:{h1:{"font-size":"25px","font-weight":"600",color:"#ebdfca","margin-top":"28px","margin-bottom":"16px","line-height":"1.4","letter-spacing":"2px"},h2:{"font-size":"19px","font-weight":"600",color:"#ebdfca","margin-top":"30px","margin-bottom":"14px","line-height":"1.5","letter-spacing":"1.5px","padding-bottom":"6px","border-bottom":"1px dashed #4a4034"},h3:{"font-size":"16px","font-weight":"600",color:"#ebdfca","margin-top":"22px","margin-bottom":"10px","line-height":"1.6","letter-spacing":"1px"},h4:{"font-size":"15px","font-weight":"600",color:"#ebdfca","margin-top":"18px","margin-bottom":"8px","line-height":"1.55","letter-spacing":"0.8px"},p:{"font-size":"15px","font-weight":"500","line-height":"1.85",color:"#ebdfca","margin-top":"0","margin-bottom":"18px","letter-spacing":"0.6px"},blockquote:{"border-left":"1px solid #4a4034","border-right":"none","background-color":"transparent",color:"#9a8f7e","padding-top":"6px","padding-right":"0","padding-bottom":"6px","padding-left":"18px","margin-top":"0","margin-bottom":"18px","border-radius":"0","font-style":"normal","letter-spacing":"0.6px"},ul:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},ol:{"padding-left":"24px","margin-top":"0","margin-bottom":"18px"},li:{"margin-bottom":"8px","font-weight":"500","line-height":"1.85",color:"#ebdfca","letter-spacing":"0.6px"},strong:{"font-weight":"600",color:"#c89759"},em:{"font-style":"italic",color:"#c89759"},a:{color:"#e06a28","text-decoration":"underline","text-underline-offset":"3px"},hr:{border:"none",height:"1px","background-color":"#4a4034","margin-top":"24px","margin-bottom":"24px"},img:{"max-width":"100%",display:"block","margin-top":"12px","margin-right":"auto","margin-bottom":"12px","margin-left":"auto","border-radius":"4px"},pre:{"background-color":"#2f2920",color:"#ebdfca","padding-top":"14px","padding-right":"16px","padding-bottom":"14px","padding-left":"16px","border-radius":"4px","overflow-x":"auto","white-space":"pre","max-width":"100%","box-sizing":"border-box","box-shadow":"inset -14px 0 10px -10px rgba(0,0,0,0.35)","margin-top":"0","margin-bottom":"20px","font-size":"13px","font-weight":"500","line-height":"1.7","letter-spacing":"0.4px"},code:{"background-color":"#3a3328",color:"#c89759",padding:"1px 5px","border-radius":"2px","font-size":"15px","font-weight":"500","letter-spacing":"0.8px"}},inline:{highlight:{"background-color":"#3a3328",color:"#c89759",padding:"0 4px","border-radius":"2px","font-weight":"600"},wavy:{"text-decoration":"underline wavy","text-decoration-color":"#e06a28","text-underline-offset":"3px"},emphasis:{color:"#c89759","font-weight":"600"}},containers:{intro:{"background-color":"transparent","border-top":"1px solid #4a4034","border-bottom":"1px solid #4a4034","border-radius":"0",padding:"16px 0",margin:"0 0 24px 0",color:"#9a8f7e","font-size":"14px","letter-spacing":"0.5px"},author:{display:"inline-block","background-color":"transparent",border:"none","border-radius":"0",padding:"2px 0",margin:"0 0 20px 0",color:"#9a8f7e","font-size":"13px","letter-spacing":"0.6px"},cover:{margin:"0 0 28px 0"},tip:{},warning:{},info:{},danger:{},quoteCard:{"background-color":"#2f2920",padding:"18px 20px",margin:"24px 0","border-radius":"4px","letter-spacing":"0.8px"},highlight:{"background-color":"#2f2920",padding:"18px 20px",margin:"20px 0","border-radius":"4px"},compare:{margin:"24px 0"},steps:{margin:"24px 0"},sectionTitle:{__reset:!0,margin:"36px 0 16px","padding-bottom":"6px"},footerCTA:{margin:"32px 0 0 0",padding:"18px 0 4px 0","background-color":"transparent","border-top":"1px solid #4a4034","border-radius":"0"},recommend:{margin:"24px 0",padding:"0","background-color":"transparent","border-radius":"0"},qrcode:{margin:"24px auto",padding:"0","background-color":"transparent","border-radius":"0"},note:{__reset:!0,"background-color":"transparent","border-left":"1px dashed #c89759",padding:"4px 0 4px 16px",margin:"20px 0","border-radius":"0"}},templates:{cover:`::: cover 专题头 · Title
![封面占位](https://placehold.co/1200x630?text=tech-geek)

副标题：一行冷静的立意。工程随笔 Vol.01 · 2026
:::
`,authorBar:`::: author 某某 · 2026-04-20 · 阅读时长 12 分钟
:::
`,tip:`::: tip 附注
这是一条工程附注。行内 \`code\` 与正文同色同族。
:::
`,footerCTA:`::: footer-cta 延伸阅读
- 相关工程随笔 Vol.00（编者按）
- 本篇的数据与实验脚本
:::
`}},um=Gt(fm),hm=Object.freeze(Object.defineProperty({__proto__:null,techGeekTheme:um},Symbol.toStringTag,{value:"Module"})),gm=["default","tech-geek","tech-explainer","life-aesthetic","business-finance","literary-humanism","industry-observer","people-story","academic-frontier"],mm=Object.assign({"./academic-frontier/index.ts":qg,"./business-finance/index.ts":Gg,"./default/index.ts":Zg,"./industry-observer/index.ts":Qg,"./life-aesthetic/index.ts":nm,"./literary-humanism/index.ts":om,"./people-story/index.ts":cm,"./tech-explainer/index.ts":pm,"./tech-geek/index.ts":hm});function bm(e){return!!e&&typeof e=="object"&&"id"in e&&"tokens"in e&&"elements"in e}function xm(){const e={};for(const n of Object.values(mm))for(const i of Object.values(n))bm(i)&&(e[i.id]=i);const t={};for(const n of gm)e[n]&&(t[n]=e[n]);for(const n of Object.keys(e).sort())n in t||(t[n]=e[n]);return t}const fo=xm(),Yi=Object.values(fo);function Mr(e){return fo[e]??fo.default}const ym={class:"theme-grid"},vm=["title","onClick"],wm={class:"card-foot"},km={class:"card-name"},_m={class:"swatches"},Sm=Je({__name:"ThemePicker",props:{modelValue:{}},emits:["update:modelValue"],setup(e,{emit:t}){const n=e,i=t,r=Ae(()=>Yi.map(s=>({id:s.id,name:s.name,description:s.description,primary:s.tokens.colors.primary,secondary:s.tokens.colors.secondary,accent:s.tokens.colors.accent,bg:s.tokens.colors.bg,text:s.tokens.colors.text})));function o(s){s!==n.modelValue&&i("update:modelValue",s)}return(s,a)=>(j(),G("div",ym,[(j(!0),G(_e,null,De(r.value,c=>(j(),G("button",{key:c.id,class:Ie(["theme-card",{active:c.id===n.modelValue}]),title:c.description,onClick:l=>o(c.id)},[h("span",{class:"preview",style:Xe({background:c.bg,color:c.text})},[h("span",{class:"preview-title",style:Xe({color:c.primary})},"标题",4),h("span",{class:"preview-bar",style:Xe({background:c.secondary})},null,4)],4),h("span",wm,[h("span",km,Q(c.name),1),h("span",_m,[h("span",{class:"sw",style:Xe({background:c.primary})},null,4),h("span",{class:"sw",style:Xe({background:c.secondary})},null,4),h("span",{class:"sw",style:Xe({background:c.accent})},null,4)])])],10,vm))),128))]))}}),$m=Qe(Sm,[["__scopeId","data-v-f47fffbe"]]),vl=["keep","tail-list","drop"],Em={keep:"保留","tail-list":"尾注",drop:"丢弃"},Cm=/^https?:\/\//i;function Am(e,t){if(t==="keep"||!e)return{html:e,count:0};if(typeof DOMParser>"u")return{html:e,count:0};const n=new DOMParser().parseFromString(`<!doctype html><html><body>${e}</body></html>`,"text/html"),i=n.body,r=i.querySelector("ol[data-wx-outlink-list]"),s=Array.from(i.querySelectorAll("a")).map(c=>({el:c,href:c.getAttribute("href")??""})).filter(({el:c,href:l})=>Cm.test(l)&&!c.hasAttribute("data-wx-footer-cta"));if(s.length===0)return{html:e,count:0};if(t==="drop"){for(const{el:c}of s){const l=c.parentNode;if(l){for(;c.firstChild;)l.insertBefore(c.firstChild,c);l.removeChild(c)}}return{html:i.innerHTML,count:s.length}}const a=n.createElement("ol");if(a.setAttribute("data-wx-outlink-list",""),s.forEach(({el:c,href:l},d)=>{const f=d+1,u=n.createElement("sup");u.setAttribute("data-wx-outlink-ref",String(f)),u.textContent=`[${f}]`;const b=c.parentNode;if(!b)return;for(;c.firstChild;)b.insertBefore(c.firstChild,c);b.insertBefore(u,c),b.removeChild(c);const p=n.createElement("li");p.textContent=l,a.appendChild(p)}),r)for(;a.firstChild;)r.appendChild(a.firstChild);else{const c=n.createElement("p");c.setAttribute("data-wx-outlink-heading",""),c.textContent="参考链接",i.appendChild(c),i.appendChild(a)}return{html:i.innerHTML,count:s.length}}const Tm={class:"toolbar"},Im={class:"zone zone-left"},Lm=["title"],Rm={class:"draft-title"},Mm={class:"zone zone-center"},Om={class:"pop-wrap","data-popover-root":""},Nm={class:"theme-name-full"},Bm={key:0,class:"custom-chip",title:"已有自定义配色"},Pm={key:0,class:"popover popover-theme"},Dm=["title","aria-label"],zm=["title","aria-label"],Wm={class:"zone zone-right"},Hm={class:"stats mono"},jm={class:"stat"},Fm={class:"stat-num"},Km={class:"stat"},qm={class:"stat-num"},Um=["title"],Vm={class:"saving-text"},Gm=["title"],Ym={class:"kbd"},Zm={class:"pop-wrap","data-popover-root":""},Xm={key:0,class:"popover popover-menu"},Jm={class:"menu-kbd"},Qm={class:"menu-kbd"},e0={class:"menu-section"},t0={class:"menu-segment",role:"radiogroup","aria-label":"外链处理"},n0=["aria-checked","onClick"],i0={class:"menu-kbd"},r0=["title"],o0={key:0,class:"error-banner",role:"alert"},s0={class:"error-text"},a0=Je({__name:"Toolbar",props:{draftTitle:{},wordCount:{},readingTime:{},savingState:{},savingLabel:{},error:{},themeId:{},hasCustomColor:{type:Boolean},drawer:{},outlinkStrategy:{}},emits:["update:themeId","update:outlinkStrategy","toggle","action"],setup(e,{expose:t,emit:n}){const i=e,r=n,o=he(!1),s=he(!1),a=Ae(()=>Yi.find(b=>b.id===i.themeId)?.name??i.themeId);function c(b){r("update:themeId",b),o.value=!1}function l(b){const p=b.target;p&&(p.closest("[data-popover-root]")||(o.value=!1,s.value=!1))}function d(b){b.key==="Escape"&&(o.value=!1,s.value=!1)}nt([o,s],([b,p])=>{b||p?(window.addEventListener("mousedown",l),window.addEventListener("keydown",d)):(window.removeEventListener("mousedown",l),window.removeEventListener("keydown",d))}),sn(()=>{window.removeEventListener("mousedown",l),window.removeEventListener("keydown",d)});const u=/Mac|iPhone|iPad|iPod/.test(navigator.platform)?"⌘":"Ctrl";return t({openOverflow(){s.value=!0,o.value=!1}}),(b,p)=>(j(),G("header",Tm,[p[50]||(p[50]=h("div",{class:"ruler"},null,-1)),h("div",Im,[p[25]||(p[25]=h("span",{class:"brand"},[h("span",{class:"brand-mark"},"wechat"),h("span",{class:"brand-dot"},"-"),h("span",{class:"brand-name"},"typeset")],-1)),h("button",{class:Ie(["draft-switch",{active:i.drawer.drafts}]),title:`草稿列表  ${ee(u)}+Shift+D`,onClick:p[0]||(p[0]=m=>r("toggle","drafts"))},[h("span",Rm,Q(i.draftTitle||"未命名草稿"),1),p[23]||(p[23]=h("span",{class:"draft-mobile-hint"},"导入",-1)),p[24]||(p[24]=h("span",{class:"chevron"},"▾",-1))],10,Lm)]),h("div",Mm,[h("div",Om,[h("button",{class:Ie(["btn btn-ghost btn-theme",{active:o.value}]),title:"切换主题",onClick:p[1]||(p[1]=m=>{o.value=!o.value,s.value=!1})},[p[26]||(p[26]=h("span",{class:"dot-mark"},null,-1)),h("span",Nm,Q(a.value),1),i.hasCustomColor?(j(),G("span",Bm,"·自定义")):Se("",!0)],2),o.value?(j(),G("div",Pm,[Ge($m,{"model-value":i.themeId,"onUpdate:modelValue":c},null,8,["model-value"])])):Se("",!0)]),h("button",{class:Ie(["btn btn-ghost btn-insert",{active:i.drawer.components}]),title:`插入组件 / 主题模板  ${ee(u)}+Shift+P`,"aria-label":`插入组件 / 主题模板  ${ee(u)}+Shift+P`,onClick:p[2]||(p[2]=m=>r("toggle","components"))},[...p[27]||(p[27]=[h("span",{class:"btn-label"},"插入",-1),h("span",{class:"btn-glyph","aria-hidden":"true"},"＋",-1)])],10,Dm),h("button",{class:Ie(["btn btn-ghost btn-palette",{active:i.drawer.customizer}]),title:`自定义配色  ${ee(u)}+Shift+C`,"aria-label":`自定义配色  ${ee(u)}+Shift+C`,onClick:p[3]||(p[3]=m=>r("toggle","customizer"))},[...p[28]||(p[28]=[h("span",{class:"btn-label"},"配色",-1),h("span",{class:"btn-glyph","aria-hidden":"true"},"◐",-1)])],10,zm)]),h("div",Wm,[h("div",Hm,[h("span",jm,[h("span",Fm,Q(i.wordCount),1),p[29]||(p[29]=h("span",{class:"stat-lbl"},"字",-1))]),h("span",Km,[h("span",qm,Q(i.readingTime),1),p[30]||(p[30]=h("span",{class:"stat-lbl"},"分钟",-1))]),h("span",{class:Ie(["saving",i.savingState]),title:i.savingLabel},[p[31]||(p[31]=h("span",{class:"saving-dot"},null,-1)),h("span",Vm,Q(i.savingLabel),1)],10,Um)]),h("button",{class:"btn btn-ghost icon btn-cmd",title:`命令面板  ${ee(u)}+K`,onClick:p[4]||(p[4]=m=>r("action","openCommand"))},[h("span",Ym,Q(ee(u))+"K",1)],8,Gm),h("button",{class:"btn btn-ghost icon btn-help",title:"快捷键与帮助  ?",onClick:p[5]||(p[5]=m=>r("action","openHelp"))}," ? "),h("div",Zm,[h("button",{class:Ie(["btn btn-ghost icon",{active:s.value}]),title:"更多操作",onClick:p[6]||(p[6]=m=>{s.value=!s.value,o.value=!1})},"···",2),s.value?(j(),G("div",Xm,[h("button",{class:"menu-item",onClick:p[7]||(p[7]=m=>{r("toggle","drafts"),s.value=!1})},[h("span",null,Q(i.drawer.drafts?"关闭草稿列表":"草稿列表"),1)]),h("button",{class:"menu-item",onClick:p[8]||(p[8]=m=>{r("toggle","components"),s.value=!1})},[h("span",null,Q(i.drawer.components?"关闭组件库":"插入组件"),1)]),h("button",{class:"menu-item",onClick:p[9]||(p[9]=m=>{r("toggle","customizer"),s.value=!1})},[h("span",null,Q(i.drawer.customizer?"关闭自定义配色":"自定义配色"),1)]),h("button",{class:"menu-item",onClick:p[10]||(p[10]=m=>{r("toggle","checklist"),s.value=!1})},[h("span",null,Q(i.drawer.checklist?"关闭发文清单":"发文清单"),1)]),p[43]||(p[43]=h("div",{class:"menu-sep"},null,-1)),h("button",{class:"menu-item",onClick:p[11]||(p[11]=m=>{r("action","saveSelection"),s.value=!1})},[...p[32]||(p[32]=[h("span",null,"保存选区为组件",-1)])]),h("button",{class:"menu-item",onClick:p[12]||(p[12]=m=>{r("action","loadSample"),s.value=!1})},[...p[33]||(p[33]=[h("span",null,"载入当前主题示例",-1)])]),h("button",{class:"menu-item",onClick:p[13]||(p[13]=m=>{r("action","fixZhTypo"),s.value=!1})},[...p[34]||(p[34]=[h("span",null,"一键修复中文排版",-1)])]),p[44]||(p[44]=h("div",{class:"menu-sep"},null,-1)),h("button",{class:"menu-item",onClick:p[14]||(p[14]=m=>{r("action","exportHtml"),s.value=!1})},[p[35]||(p[35]=h("span",null,"导出 HTML",-1)),h("span",Jm,Q(ee(u))+"⇧H",1)]),h("button",{class:"menu-item",onClick:p[15]||(p[15]=m=>{r("action","exportMd"),s.value=!1})},[p[36]||(p[36]=h("span",null,"导出 Markdown",-1)),h("span",Qm,Q(ee(u))+"⇧M",1)]),h("button",{class:"menu-item",onClick:p[16]||(p[16]=m=>{r("action","exportImage"),s.value=!1})},[...p[37]||(p[37]=[h("span",null,"导出长图",-1)])]),h("button",{class:"menu-item",onClick:p[17]||(p[17]=m=>{r("action","copyShareLink"),s.value=!1})},[...p[38]||(p[38]=[h("span",null,"复制分享链接",-1)])]),p[45]||(p[45]=h("div",{class:"menu-sep"},null,-1)),h("div",e0,[p[39]||(p[39]=h("div",{class:"menu-section-head"},"外链处理",-1)),h("div",t0,[(j(!0),G(_e,null,De(ee(vl),m=>(j(),G("button",{key:m,class:Ie(["menu-segment-btn",{active:i.outlinkStrategy===m}]),role:"radio","aria-checked":i.outlinkStrategy===m,onClick:S=>r("update:outlinkStrategy",m)},Q(ee(Em)[m]),11,n0))),128))])]),p[46]||(p[46]=h("div",{class:"menu-sep"},null,-1)),h("button",{class:"menu-item",onClick:p[18]||(p[18]=m=>{r("action","openCommand"),s.value=!1})},[p[40]||(p[40]=h("span",null,"命令面板",-1)),h("span",i0,Q(ee(u))+"K",1)]),h("button",{class:"menu-item",onClick:p[19]||(p[19]=m=>{r("action","openHelp"),s.value=!1})},[...p[41]||(p[41]=[h("span",null,"快捷键与帮助",-1)])]),p[47]||(p[47]=h("div",{class:"menu-sep"},null,-1)),h("button",{class:"menu-item danger",onClick:p[20]||(p[20]=m=>{r("action","clear"),s.value=!1})},[...p[42]||(p[42]=[h("span",null,"清空正文",-1)])])])):Se("",!0)]),h("button",{class:"btn btn-primary",title:`复制到剪贴板  ${ee(u)}+Enter`,onClick:p[21]||(p[21]=m=>r("action","copy"))},[...p[48]||(p[48]=[h("span",null,"一键复制",-1)])],8,r0)]),i.error?(j(),G("div",o0,[p[49]||(p[49]=h("span",{class:"error-icon"},"!",-1)),h("span",s0,Q(i.error),1),h("button",{class:"error-close",onClick:p[22]||(p[22]=m=>r("action","dismissError"))},"知道了")])):Se("",!0)]))}}),c0=Qe(a0,[["__scopeId","data-v-dbc72412"]]);function tn(e){try{return localStorage.getItem(e)}catch{return null}}function nn(e,t){try{localStorage.setItem(e,t)}catch{}}function wl(e){try{localStorage.removeItem(e)}catch{}}function kl(e,t){const n=tn(e);if(n==null)return t;try{return JSON.parse(n)}catch{return t}}function _l(e,t){try{nn(e,JSON.stringify(t))}catch{}}function Sl(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const $l="wechat-typeset:drafts:index",uo="wechat-typeset:drafts:active",Sn="wechat-typeset:drafts:body:",l0=()=>Sl("d");function an(){const e=kl($l,[]);return Array.isArray(e)?e:[]}function bi(e){_l($l,e)}function Uo(e){const t=e.split(`
`).map(i=>i.trim()).find(i=>i.length>0);return t?t.replace(/^#+\s*/,"").slice(0,24):""}function mn(){return[...an()].sort((t,n)=>n.updatedAt-t.updatedAt)}function El(){return tn(uo)}function bn(e){e?nn(uo,e):wl(uo)}function Nn(e){const t=an().find(i=>i.id===e);if(!t)return null;const n=tn(`${Sn}${e}`)??"";return{...t,body:n}}function hr(e){const t=l0(),n=Date.now(),i=e?.body??"",r=e?.tags?.filter(a=>a.trim().length>0),o={id:t,title:e?.title||Uo(i)||"未命名草稿",themeId:e?.themeId??"default",updatedAt:n,createdAt:n,...r&&r.length?{tags:r}:{}},s=an();return s.unshift(o),bi(s),nn(`${Sn}${t}`,i),bn(t),{...o,body:i}}function Zi(e,t){const n=an(),i=n.findIndex(a=>a.id===e);if(i===-1)return;const r=Date.now(),o=n[i],s={...o,title:t.title??o.title,themeId:t.themeId??o.themeId,tags:t.tags??o.tags,updatedAt:r};if(n[i]=s,bi(n),typeof t.body=="string"&&(nn(`${Sn}${e}`,t.body),!t.title)){const a=Uo(t.body);a&&(n[i]={...s,title:a},bi(n))}}function d0(e={}){const t=e.query?.trim()??"",n=t?t.split(/\s+/):[],i=n.filter(c=>c.startsWith("#")).map(c=>c.slice(1).toLowerCase()).filter(Boolean),r=n.filter(c=>!c.startsWith("#")).map(c=>c.toLowerCase()).filter(Boolean),o=(e.tags??[]).map(c=>c.toLowerCase()).filter(Boolean),s=Array.from(new Set([...i,...o]));return mn().filter(c=>{if(s.length>0){const f=(c.tags??[]).map(u=>u.toLowerCase());if(!s.every(u=>f.includes(u)))return!1}if(r.length===0)return!0;const l=tn(`${Sn}${c.id}`)??"",d=`${c.title}
${l}
${(c.tags??[]).join(" ")}`.toLowerCase();return r.every(f=>d.includes(f))})}function p0(){const e=new Set;for(const t of an())for(const n of t.tags??[]){const i=n.trim();i&&e.add(i)}return Array.from(e).sort((t,n)=>t.localeCompare(n))}function f0(e){const t=an().filter(n=>n.id!==e);bi(t),wl(`${Sn}${e}`),El()===e&&bn(t[0]?.id??null)}function u0(){const t=an().map(n=>({...n,body:tn(`${Sn}${n.id}`)??""}));return JSON.stringify({version:1,drafts:t},null,2)}function Cl(e){const t={added:0,skipped:0,invalid:0};let n;try{n=JSON.parse(e)}catch{return t}const i=ia(n)&&Array.isArray(n.drafts)?n.drafts:[],r=an();for(const o of i){if(!ia(o)){t.invalid+=1;continue}const s=typeof o.id=="string"&&o.id.length>0?o.id:null;if(!s){t.invalid+=1;continue}if(r.some(b=>b.id===s)){t.skipped+=1;continue}const a=typeof o.body=="string"?o.body:"",c=typeof o.title=="string"&&o.title?o.title:Uo(a)||"未命名草稿",l=typeof o.themeId=="string"&&o.themeId?o.themeId:"default",d=typeof o.updatedAt=="number"?o.updatedAt:Date.now(),f=typeof o.createdAt=="number"?o.createdAt:Date.now(),u=Array.isArray(o.tags)?o.tags.filter(b=>typeof b=="string"&&b.trim().length>0):void 0;r.push({id:s,title:c,themeId:l,updatedAt:d,createdAt:f,...u&&u.length?{tags:u}:{}}),nn(`${Sn}${s}`,a),t.added+=1}return bi(r),t}function ia(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Al=.8,ra=5*1024*1024;async function h0(){try{if(typeof navigator<"u"&&navigator.storage&&typeof navigator.storage.estimate=="function"){const{usage:e=0,quota:t=0}=await navigator.storage.estimate();if(t>0){const n=e/t;return{supported:!0,used:e,quota:t,pct:n,warn:n>=Al}}}}catch{}return g0()}function oa(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:e<1024*1024*1024?`${(e/(1024*1024)).toFixed(1)} MB`:`${(e/(1024*1024*1024)).toFixed(1)} GB`}function g0(){let e=0;try{for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);if(!i||!i.startsWith("wechat-typeset:"))continue;const r=localStorage.getItem(i)??"";e+=(i.length+r.length)*2}}catch{e=0}const t=e/ra;return{supported:!1,used:e,quota:ra,pct:t,warn:t>=Al}}const m0={class:"drawer","aria-label":"草稿列表"},b0={class:"drawer-head"},x0={class:"head-tools"},y0={class:"search"},v0={class:"io-row"},w0={class:"btn btn-ghost"},k0={key:0,class:"io-feedback"},_0={key:0,class:"tagbar","aria-label":"标签过滤"},S0=["aria-pressed","onClick"],$0={key:1,class:"quota-warn",role:"status"},E0={class:"quota-warn-text"},C0={class:"list"},A0=["onClick"],T0={class:"item-main"},I0=["onKeydown"],L0=["title","onDblclick"],R0={class:"summary"},M0={key:2,class:"tags"},O0=["onClick"],N0={class:"meta mono"},B0={class:"meta-theme"},P0={class:"item-actions"},D0=["onClick"],z0=["onClick"],W0=["onClick"],H0={key:0,class:"empty"},j0={key:1,class:"empty"},F0={class:"empty-body"},K0={class:"empty-title mono"},q0={class:"drawer-foot mono"},U0={class:"cap-bar"},V0={class:"cap-text"},G0={key:0,class:"dot",title:"浏览器未暴露 storage.estimate API，此为 localStorage 估算值"},Y0=Je({__name:"DraftDrawer",props:{activeId:{}},emits:["select","close","requestDelete","refresh"],setup(e,{expose:t,emit:n}){const i=e,r=n,o=he(0),s=he(""),a=he(null),c=he(""),l=he(null),d=he(null);nt(()=>i.activeId,()=>{o.value+=1});const f=Ae(()=>(o.value,mn())),u=he(null),b=Ae(()=>{o.value;const ae=s.value.trim(),v=u.value?[u.value]:void 0;return!ae&&!v?f.value:d0({query:ae,tags:v})}),p=Ae(()=>(o.value,p0())),m=he({supported:!1,used:0,quota:5*1024*1024,pct:0,warn:!1});async function S(){m.value=await h0()}const I=Ae(()=>Math.min(100,Math.round(m.value.pct*100)));function z(){o.value+=1,S(),r("refresh")}on(()=>{S()});function R(ae){const v=new Date(ae),E=new Date,A=v.toDateString()===E.toDateString(),X=v.getHours().toString().padStart(2,"0"),ie=v.getMinutes().toString().padStart(2,"0");if(A)return`今天 ${X}:${ie}`;const xe=(v.getMonth()+1).toString().padStart(2,"0"),ye=v.getDate().toString().padStart(2,"0");return`${xe}-${ye} ${X}:${ie}`}function _(ae){const E=(Nn(ae)?.body??"").split(`
`).map(A=>A.replace(/^#+\s*/,"").replace(/^\s*[-*>:]+\s*/,"").trim()).find(A=>A.length>0&&!A.startsWith(":::"));return E?E.length>60?E.slice(0,60)+"…":E:"（空白草稿）"}function k(){const ae=hr({title:"新草稿",body:`# 新草稿
`});z(),r("select",ae.id)}function B(ae,v){v.stopPropagation(),a.value=ae.id,c.value=ae.title||"",Hi(()=>l.value?.focus())}function w(){if(!a.value)return;const ae=c.value.trim()||"未命名草稿";Zi(a.value,{title:ae}),a.value=null,z()}function y(){a.value=null}function W(ae,v){v.stopPropagation(),r("requestDelete",ae.id,ae.title||"未命名草稿")}function U(ae,v){v.stopPropagation();const E=(ae.tags??[]).join(", "),A=typeof window<"u"?window.prompt("标签（用逗号或空格分隔，留空删除全部）",E):null;if(A===null)return;const X=Array.from(new Set(A.split(/[,，\s]+/g).map(ie=>ie.trim()).filter(ie=>ie.length>0)));Zi(ae.id,{tags:X}),z()}function q(ae){u.value=u.value===ae?null:ae}function le(ae,v,E="application/json"){const A=new Blob([v],{type:E}),X=URL.createObjectURL(A),ie=document.createElement("a");ie.href=X,ie.download=ae,document.body.appendChild(ie),ie.click(),document.body.removeChild(ie),URL.revokeObjectURL(X)}function J(){le(`wechat-typeset-drafts-${Date.now()}.json`,u0())}function ge(ae){const v=ae.target,E=v.files?.[0];if(!E)return;const A=new FileReader;A.onload=()=>{const X=Cl(String(A.result??""));d.value=`导入 ${X.added} 篇（跳过 ${X.skipped}，非法 ${X.invalid}）`,z(),v.value="",setTimeout(()=>d.value=null,3200)},A.readAsText(E)}return t({refresh:z}),(ae,v)=>(j(),G("aside",m0,[h("header",b0,[v[4]||(v[4]=h("h3",{class:"tx-section"},"草稿",-1)),h("button",{class:"btn-text",onClick:v[0]||(v[0]=E=>r("close")),"aria-label":"关闭抽屉"},"关闭")]),h("div",x0,[h("button",{class:"btn btn-primary",onClick:k},"+ 新建"),h("div",y0,[v[5]||(v[5]=h("span",{class:"search-icon"},"⌕",-1)),Et(h("input",{"onUpdate:modelValue":v[1]||(v[1]=E=>s.value=E),class:"search-input",type:"search",placeholder:"搜索标题 / 正文 / #标签","aria-label":"搜索草稿"},null,512),[[jt,s.value]])])]),h("div",v0,[h("button",{class:"btn btn-ghost",onClick:J},"导出 JSON"),h("label",w0,[v[6]||(v[6]=ft(" 导入 JSON ",-1)),h("input",{type:"file",accept:"application/json",hidden:"",onChange:ge},null,32)]),d.value?(j(),G("span",k0,Q(d.value),1)):Se("",!0)]),p.value.length>0?(j(),G("div",_0,[(j(!0),G(_e,null,De(p.value,E=>(j(),G("button",{key:E,class:Ie(["tag-pill",{active:u.value===E}]),"aria-pressed":u.value===E,onClick:A=>q(E)},"#"+Q(E),11,S0))),128))])):Se("",!0),m.value.warn?(j(),G("div",$0,[v[7]||(v[7]=h("span",{class:"quota-warn-icon","aria-hidden":"true"},"!",-1)),h("span",E0," 存储占用 "+Q(I.value)+"%，建议导出 JSON 并删除不再需要的草稿 ",1)])):Se("",!0),h("ul",C0,[(j(!0),G(_e,null,De(b.value,E=>(j(),G("li",{key:E.id,class:Ie(["item",{active:E.id===i.activeId}]),onClick:A=>r("select",E.id)},[h("div",T0,[a.value===E.id?(j(),G("div",{key:0,class:"rename-row",onClick:v[3]||(v[3]=Wt(()=>{},["stop"]))},[Et(h("input",{ref_for:!0,ref_key:"renameInputRef",ref:l,"onUpdate:modelValue":v[2]||(v[2]=A=>c.value=A),class:"rename-input",maxlength:"48",onKeydown:[co(Wt(w,["prevent"]),["enter"]),co(Wt(y,["prevent"]),["esc"])],onBlur:w},null,40,I0),[[jt,c.value]])])):(j(),G("div",{key:1,class:"title",title:`双击重命名 · ${E.title}`,onDblclick:Wt(A=>B(E,A),["stop"])},Q(E.title||"未命名"),41,L0)),h("div",R0,Q(_(E.id)),1),E.tags&&E.tags.length>0?(j(),G("div",M0,[(j(!0),G(_e,null,De(E.tags,A=>(j(),G("span",{key:A,class:"tag-chip",onClick:Wt(X=>q(A),["stop"])},"#"+Q(A),9,O0))),128))])):Se("",!0),h("div",N0,[h("span",B0,Q(E.themeId),1),v[8]||(v[8]=h("span",{class:"dot"},"·",-1)),h("span",null,Q(R(E.updatedAt)),1)])]),h("div",P0,[h("button",{class:"icon-btn",title:"编辑标签",onClick:A=>U(E,A)},"#",8,D0),h("button",{class:"icon-btn",title:"重命名",onClick:A=>B(E,A)},"✎",8,z0),h("button",{class:"icon-btn danger",title:"删除",onClick:A=>W(E,A)},"×",8,W0)])],10,A0))),128)),f.value.length===0?(j(),G("li",H0,[h("div",{class:"empty-body"},[v[9]||(v[9]=h("div",{class:"empty-title"},"还没有草稿",-1)),v[10]||(v[10]=h("div",{class:"empty-hint"},"新建一篇开始，或者把旧 JSON 导进来继续写。",-1)),h("button",{class:"btn btn-primary",onClick:k},"新建第一篇")])])):b.value.length===0?(j(),G("li",j0,[h("div",F0,[h("div",K0,'没有匹配 "'+Q(s.value)+'" 的草稿',1)])])):Se("",!0)]),h("footer",q0,[h("div",U0,[h("div",{class:"cap-fill",style:Xe({width:I.value+"%"})},null,4)]),h("div",V0,[h("span",null,Q(f.value.length)+" 篇",1),v[11]||(v[11]=h("span",{class:"dot"},"·",-1)),h("span",null,[ft(Q(I.value)+"% · "+Q(ee(oa)(m.value.used))+" / "+Q(ee(oa)(m.value.quota))+" ",1),m.value.supported?Se("",!0):(j(),G("span",G0,"估算"))])])])]))}}),Z0=Qe(Y0,[["__scopeId","data-v-a7526182"]]),X0=[{id:"warm",name:"温暖",description:"暖橙 + 奶油黄，适合生活美学",primary:"#d98141",secondary:"#b96234",accent:"#efb758"},{id:"cool",name:"冷静",description:"青绿 + 深蓝，技术/产品稳重感",primary:"#2d6fdd",secondary:"#1f3b70",accent:"#4ec9b0"},{id:"morandi",name:"莫兰迪",description:"低饱和灰粉 + 灰绿，克制优雅",primary:"#a88b8a",secondary:"#6b7c7b",accent:"#c9b9a0"},{id:"clash",name:"撞色",description:"高饱和撞色，运营号放大表达",primary:"#e23e57",secondary:"#522546",accent:"#f8b400"},{id:"sophisticated-gray",name:"高级灰",description:"深灰 + 金点缀，商务深度",primary:"#3a3d42",secondary:"#1f2124",accent:"#c9a96c"},{id:"japanese",name:"日系",description:"樱粉 + 淡黄 + 浅竹青",primary:"#d67b8c",secondary:"#a85a6a",accent:"#8ba888"},{id:"nordic",name:"北欧",description:"雾蓝 + 浅灰 + 木色",primary:"#4a7590",secondary:"#2e4a5c",accent:"#c7a97a"},{id:"black-gold",name:"黑金",description:"深黑 + 金，奢侈品调性",primary:"#c9a96c",secondary:"#1a1a1a",accent:"#f4dfa3",dark:!0},{id:"porcelain",name:"青花",description:"深青 + 瓷白 + 赭红",primary:"#2a5b8a",secondary:"#143154",accent:"#b1413a"},{id:"neo-chinese",name:"新中式",description:"胭脂红 + 墨绿 + 米黄",primary:"#9b2f2b",secondary:"#3e4e3a",accent:"#d9b26a"}],{min:J0,max:Q0}=Math,vn=(e,t=0,n=1)=>J0(Q0(t,e),n),Vo=e=>{e._clipped=!1,e._unclipped=e.slice(0);for(let t=0;t<=3;t++)t<3?((e[t]<0||e[t]>255)&&(e._clipped=!0),e[t]=vn(e[t],0,255)):t===3&&(e[t]=vn(e[t],0,1));return e},Tl={};for(let e of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])Tl[`[object ${e}]`]=e.toLowerCase();function be(e){return Tl[Object.prototype.toString.call(e)]||"object"}const fe=(e,t=null)=>e.length>=3?Array.prototype.slice.call(e):be(e[0])=="object"&&t?t.split("").filter(n=>e[0][n]!==void 0).map(n=>e[0][n]):e[0].slice(0),Un=e=>{if(e.length<2)return null;const t=e.length-1;return be(e[t])=="string"?e[t].toLowerCase():null},{PI:gr,min:Il,max:Ll}=Math,at=e=>Math.round(e*100)/100,ho=e=>Math.round(e*100)/100,Pt=gr*2,Or=gr/3,e1=gr/180,t1=180/gr;function Rl(e){return[...e.slice(0,3).reverse(),...e.slice(3)]}const de={format:{},autodetect:[]};class H{constructor(...t){const n=this;if(be(t[0])==="object"&&t[0].constructor&&t[0].constructor===this.constructor)return t[0];let i=Un(t),r=!1;if(!i){r=!0,de.sorted||(de.autodetect=de.autodetect.sort((o,s)=>s.p-o.p),de.sorted=!0);for(let o of de.autodetect)if(i=o.test(...t),i)break}if(de.format[i]){const o=de.format[i].apply(null,r?t:t.slice(0,-1));n._rgb=Vo(o)}else throw new Error("unknown format: "+t);n._rgb.length===3&&n._rgb.push(1)}toString(){return be(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}}const n1="3.2.0",re=(...e)=>new H(...e);re.version=n1;const Fn={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},i1=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,r1=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,Ml=e=>{if(e.match(i1)){(e.length===4||e.length===7)&&(e=e.substr(1)),e.length===3&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);const t=parseInt(e,16),n=t>>16,i=t>>8&255,r=t&255;return[n,i,r,1]}if(e.match(r1)){(e.length===5||e.length===9)&&(e=e.substr(1)),e.length===4&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const t=parseInt(e,16),n=t>>24&255,i=t>>16&255,r=t>>8&255,o=Math.round((t&255)/255*100)/100;return[n,i,r,o]}throw new Error(`unknown hex color: ${e}`)},{round:Ti}=Math,Ol=(...e)=>{let[t,n,i,r]=fe(e,"rgba"),o=Un(e)||"auto";r===void 0&&(r=1),o==="auto"&&(o=r<1?"rgba":"rgb"),t=Ti(t),n=Ti(n),i=Ti(i);let a="000000"+(t<<16|n<<8|i).toString(16);a=a.substr(a.length-6);let c="0"+Ti(r*255).toString(16);switch(c=c.substr(c.length-2),o.toLowerCase()){case"rgba":return`#${a}${c}`;case"argb":return`#${c}${a}`;default:return`#${a}`}};H.prototype.name=function(){const e=Ol(this._rgb,"rgb");for(let t of Object.keys(Fn))if(Fn[t]===e)return t.toLowerCase();return e};de.format.named=e=>{if(e=e.toLowerCase(),Fn[e])return Ml(Fn[e]);throw new Error("unknown color name: "+e)};de.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&be(e)==="string"&&Fn[e.toLowerCase()])return"named"}});H.prototype.alpha=function(e,t=!1){return e!==void 0&&be(e)==="number"?t?(this._rgb[3]=e,this):new H([this._rgb[0],this._rgb[1],this._rgb[2],e],"rgb"):this._rgb[3]};H.prototype.clipped=function(){return this._rgb._clipped||!1};const At={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},o1=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function Ht(e){const t=o1.get(String(e).toLowerCase());if(!t)throw new Error("unknown Lab illuminant "+e);At.labWhitePoint=e,At.Xn=t[0],At.Zn=t[1]}function xi(){return At.labWhitePoint}const Go=(...e)=>{e=fe(e,"lab");const[t,n,i]=e,[r,o,s]=s1(t,n,i),[a,c,l]=Nl(r,o,s);return[a,c,l,e.length>3?e[3]:1]},s1=(e,t,n)=>{const{kE:i,kK:r,kKE:o,Xn:s,Yn:a,Zn:c}=At,l=(e+16)/116,d=.002*t+l,f=l-.005*n,u=d*d*d,b=f*f*f,p=u>i?u:(116*d-16)/r,m=e>o?Math.pow((e+16)/116,3):e/r,S=b>i?b:(116*f-16)/r,I=p*s,z=m*a,R=S*c;return[I,z,R]},Nr=e=>{const t=Math.sign(e);return e=Math.abs(e),(e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055)*t},Nl=(e,t,n)=>{const{MtxAdaptMa:i,MtxAdaptMaI:r,MtxXYZ2RGB:o,RefWhiteRGB:s,Xn:a,Yn:c,Zn:l}=At,d=a*i.m00+c*i.m10+l*i.m20,f=a*i.m01+c*i.m11+l*i.m21,u=a*i.m02+c*i.m12+l*i.m22,b=s.X*i.m00+s.Y*i.m10+s.Z*i.m20,p=s.X*i.m01+s.Y*i.m11+s.Z*i.m21,m=s.X*i.m02+s.Y*i.m12+s.Z*i.m22,S=(e*i.m00+t*i.m10+n*i.m20)*(b/d),I=(e*i.m01+t*i.m11+n*i.m21)*(p/f),z=(e*i.m02+t*i.m12+n*i.m22)*(m/u),R=S*r.m00+I*r.m10+z*r.m20,_=S*r.m01+I*r.m11+z*r.m21,k=S*r.m02+I*r.m12+z*r.m22,B=Nr(R*o.m00+_*o.m10+k*o.m20),w=Nr(R*o.m01+_*o.m11+k*o.m21),y=Nr(R*o.m02+_*o.m12+k*o.m22);return[B*255,w*255,y*255]},Yo=(...e)=>{const[t,n,i,...r]=fe(e,"rgb"),[o,s,a]=Bl(t,n,i),[c,l,d]=a1(o,s,a);return[c,l,d,...r.length>0&&r[0]<1?[r[0]]:[]]};function a1(e,t,n){const{Xn:i,Yn:r,Zn:o,kE:s,kK:a}=At,c=e/i,l=t/r,d=n/o,f=c>s?Math.pow(c,1/3):(a*c+16)/116,u=l>s?Math.pow(l,1/3):(a*l+16)/116,b=d>s?Math.pow(d,1/3):(a*d+16)/116;return[116*u-16,500*(f-u),200*(u-b)]}function Br(e){const t=Math.sign(e);return e=Math.abs(e),(e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4))*t}const Bl=(e,t,n)=>{e=Br(e/255),t=Br(t/255),n=Br(n/255);const{MtxRGB2XYZ:i,MtxAdaptMa:r,MtxAdaptMaI:o,Xn:s,Yn:a,Zn:c,As:l,Bs:d,Cs:f}=At;let u=e*i.m00+t*i.m10+n*i.m20,b=e*i.m01+t*i.m11+n*i.m21,p=e*i.m02+t*i.m12+n*i.m22;const m=s*r.m00+a*r.m10+c*r.m20,S=s*r.m01+a*r.m11+c*r.m21,I=s*r.m02+a*r.m12+c*r.m22;let z=u*r.m00+b*r.m10+p*r.m20,R=u*r.m01+b*r.m11+p*r.m21,_=u*r.m02+b*r.m12+p*r.m22;return z*=m/l,R*=S/d,_*=I/f,u=z*o.m00+R*o.m10+_*o.m20,b=z*o.m01+R*o.m11+_*o.m21,p=z*o.m02+R*o.m12+_*o.m22,[u,b,p]};H.prototype.lab=function(){return Yo(this._rgb)};const c1=(...e)=>new H(...e,"lab");Object.assign(re,{lab:c1,getLabWhitePoint:xi,setLabWhitePoint:Ht});de.format.lab=Go;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"lab"),be(e)==="array"&&e.length===3)return"lab"}});H.prototype.darken=function(e=1){const t=this,n=t.lab();return n[0]-=At.Kn*e,new H(n,"lab").alpha(t.alpha(),!0)};H.prototype.brighten=function(e=1){return this.darken(-e)};H.prototype.darker=H.prototype.darken;H.prototype.brighter=H.prototype.brighten;H.prototype.get=function(e){const[t,n]=e.split("."),i=this[t]();if(n){const r=t.indexOf(n)-(t.substr(0,2)==="ok"?2:0);if(r>-1)return i[r];throw new Error(`unknown channel ${n} in mode ${t}`)}else return i};const{pow:l1}=Math,d1=1e-7,p1=20;H.prototype.luminance=function(e,t="rgb"){if(e!==void 0&&be(e)==="number"){if(e===0)return new H([0,0,0,this._rgb[3]],"rgb");if(e===1)return new H([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),i=p1;const r=(s,a)=>{const c=s.interpolate(a,.5,t),l=c.luminance();return Math.abs(e-l)<d1||!i--?c:l>e?r(s,c):r(c,a)},o=(n>e?r(new H([0,0,0]),this):r(this,new H([255,255,255]))).rgb();return new H([...o,this._rgb[3]])}return f1(...this._rgb.slice(0,3))};const f1=(e,t,n)=>(e=Pr(e),t=Pr(t),n=Pr(n),.2126*e+.7152*t+.0722*n),Pr=e=>(e/=255,e<=.03928?e/12.92:l1((e+.055)/1.055,2.4)),He={},Kn=(e,t,n=.5,...i)=>{let r=i[0]||"lrgb";if(!He[r]&&!i.length&&(r=Object.keys(He)[0]),!He[r])throw new Error(`interpolation mode ${r} is not defined`);return be(e)!=="object"&&(e=new H(e)),be(t)!=="object"&&(t=new H(t)),He[r](e,t,n).alpha(e.alpha()+n*(t.alpha()-e.alpha()))};H.prototype.mix=H.prototype.interpolate=function(e,t=.5,...n){return Kn(this,e,t,...n)};H.prototype.premultiply=function(e=!1){const t=this._rgb,n=t[3];return e?(this._rgb=[t[0]*n,t[1]*n,t[2]*n,n],this):new H([t[0]*n,t[1]*n,t[2]*n,n],"rgb")};const{sin:u1,cos:h1}=Math,Pl=(...e)=>{let[t,n,i]=fe(e,"lch");return isNaN(i)&&(i=0),i=i*e1,[t,h1(i)*n,u1(i)*n]},Zo=(...e)=>{e=fe(e,"lch");const[t,n,i]=e,[r,o,s]=Pl(t,n,i),[a,c,l]=Go(r,o,s);return[a,c,l,e.length>3?e[3]:1]},g1=(...e)=>{const t=Rl(fe(e,"hcl"));return Zo(...t)},{sqrt:m1,atan2:b1,round:x1}=Math,Dl=(...e)=>{const[t,n,i]=fe(e,"lab"),r=m1(n*n+i*i);let o=(b1(i,n)*t1+360)%360;return x1(r*1e4)===0&&(o=Number.NaN),[t,r,o]},Xo=(...e)=>{const[t,n,i,...r]=fe(e,"rgb"),[o,s,a]=Yo(t,n,i),[c,l,d]=Dl(o,s,a);return[c,l,d,...r.length>0&&r[0]<1?[r[0]]:[]]};H.prototype.lch=function(){return Xo(this._rgb)};H.prototype.hcl=function(){return Rl(Xo(this._rgb))};const y1=(...e)=>new H(...e,"lch"),v1=(...e)=>new H(...e,"hcl");Object.assign(re,{lch:y1,hcl:v1});de.format.lch=Zo;de.format.hcl=g1;["lch","hcl"].forEach(e=>de.autodetect.push({p:2,test:(...t)=>{if(t=fe(t,e),be(t)==="array"&&t.length===3)return e}}));H.prototype.saturate=function(e=1){const t=this,n=t.lch();return n[1]+=At.Kn*e,n[1]<0&&(n[1]=0),new H(n,"lch").alpha(t.alpha(),!0)};H.prototype.desaturate=function(e=1){return this.saturate(-e)};H.prototype.set=function(e,t,n=!1){const[i,r]=e.split("."),o=this[i]();if(r){const s=i.indexOf(r)-(i.substr(0,2)==="ok"?2:0);if(s>-1){if(be(t)=="string")switch(t.charAt(0)){case"+":o[s]+=+t;break;case"-":o[s]+=+t;break;case"*":o[s]*=+t.substr(1);break;case"/":o[s]/=+t.substr(1);break;default:o[s]=+t}else if(be(t)==="number")o[s]=t;else throw new Error("unsupported value for Color.set");const a=new H(o,i);return n?(this._rgb=a._rgb,this):a}throw new Error(`unknown channel ${r} in mode ${i}`)}else return o};H.prototype.tint=function(e=.5,...t){return Kn(this,"white",e,...t)};H.prototype.shade=function(e=.5,...t){return Kn(this,"black",e,...t)};const w1=(e,t,n)=>{const i=e._rgb,r=t._rgb;return new H(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"rgb")};He.rgb=w1;const{sqrt:Dr,pow:In}=Math,k1=(e,t,n)=>{const[i,r,o]=e._rgb,[s,a,c]=t._rgb;return new H(Dr(In(i,2)*(1-n)+In(s,2)*n),Dr(In(r,2)*(1-n)+In(a,2)*n),Dr(In(o,2)*(1-n)+In(c,2)*n),"rgb")};He.lrgb=k1;const _1=(e,t,n)=>{const i=e.lab(),r=t.lab();return new H(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"lab")};He.lab=_1;const Vn=(e,t,n,i)=>{let r,o;i==="hsl"?(r=e.hsl(),o=t.hsl()):i==="hsv"?(r=e.hsv(),o=t.hsv()):i==="hcg"?(r=e.hcg(),o=t.hcg()):i==="hsi"?(r=e.hsi(),o=t.hsi()):i==="lch"||i==="hcl"?(i="hcl",r=e.hcl(),o=t.hcl()):i==="oklch"&&(r=e.oklch().reverse(),o=t.oklch().reverse());let s,a,c,l,d,f;(i.substr(0,1)==="h"||i==="oklch")&&([s,c,d]=r,[a,l,f]=o);let u,b,p,m;return!isNaN(s)&&!isNaN(a)?(a>s&&a-s>180?m=a-(s+360):a<s&&s-a>180?m=a+360-s:m=a-s,b=s+n*m):isNaN(s)?isNaN(a)?b=Number.NaN:(b=a,(d==1||d==0)&&i!="hsv"&&(u=l)):(b=s,(f==1||f==0)&&i!="hsv"&&(u=c)),u===void 0&&(u=c+n*(l-c)),p=d+n*(f-d),i==="oklch"?new H([p,u,b],i):new H([b,u,p],i)},zl=(e,t,n)=>Vn(e,t,n,"lch");He.lch=zl;He.hcl=zl;const S1=e=>{if(be(e)=="number"&&e>=0&&e<=16777215){const t=e>>16,n=e>>8&255,i=e&255;return[t,n,i,1]}throw new Error("unknown num color: "+e)},$1=(...e)=>{const[t,n,i]=fe(e,"rgb");return(t<<16)+(n<<8)+i};H.prototype.num=function(){return $1(this._rgb)};const E1=(...e)=>new H(...e,"num");Object.assign(re,{num:E1});de.format.num=S1;de.autodetect.push({p:5,test:(...e)=>{if(e.length===1&&be(e[0])==="number"&&e[0]>=0&&e[0]<=16777215)return"num"}});const C1=(e,t,n)=>{const i=e.num(),r=t.num();return new H(i+n*(r-i),"num")};He.num=C1;const{floor:A1}=Math,T1=(...e)=>{e=fe(e,"hcg");let[t,n,i]=e,r,o,s;i=i*255;const a=n*255;if(n===0)r=o=s=i;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const c=A1(t),l=t-c,d=i*(1-n),f=d+a*(1-l),u=d+a*l,b=d+a;switch(c){case 0:[r,o,s]=[b,u,d];break;case 1:[r,o,s]=[f,b,d];break;case 2:[r,o,s]=[d,b,u];break;case 3:[r,o,s]=[d,f,b];break;case 4:[r,o,s]=[u,d,b];break;case 5:[r,o,s]=[b,d,f];break}}return[r,o,s,e.length>3?e[3]:1]},I1=(...e)=>{const[t,n,i]=fe(e,"rgb"),r=Il(t,n,i),o=Ll(t,n,i),s=o-r,a=s*100/255,c=r/(255-s)*100;let l;return s===0?l=Number.NaN:(t===o&&(l=(n-i)/s),n===o&&(l=2+(i-t)/s),i===o&&(l=4+(t-n)/s),l*=60,l<0&&(l+=360)),[l,a,c]};H.prototype.hcg=function(){return I1(this._rgb)};const L1=(...e)=>new H(...e,"hcg");re.hcg=L1;de.format.hcg=T1;de.autodetect.push({p:1,test:(...e)=>{if(e=fe(e,"hcg"),be(e)==="array"&&e.length===3)return"hcg"}});const R1=(e,t,n)=>Vn(e,t,n,"hcg");He.hcg=R1;const{cos:Ln}=Math,M1=(...e)=>{e=fe(e,"hsi");let[t,n,i]=e,r,o,s;return isNaN(t)&&(t=0),isNaN(n)&&(n=0),t>360&&(t-=360),t<0&&(t+=360),t/=360,t<1/3?(s=(1-n)/3,r=(1+n*Ln(Pt*t)/Ln(Or-Pt*t))/3,o=1-(s+r)):t<2/3?(t-=1/3,r=(1-n)/3,o=(1+n*Ln(Pt*t)/Ln(Or-Pt*t))/3,s=1-(r+o)):(t-=2/3,o=(1-n)/3,s=(1+n*Ln(Pt*t)/Ln(Or-Pt*t))/3,r=1-(o+s)),r=vn(i*r*3),o=vn(i*o*3),s=vn(i*s*3),[r*255,o*255,s*255,e.length>3?e[3]:1]},{min:O1,sqrt:N1,acos:B1}=Math,P1=(...e)=>{let[t,n,i]=fe(e,"rgb");t/=255,n/=255,i/=255;let r;const o=O1(t,n,i),s=(t+n+i)/3,a=s>0?1-o/s:0;return a===0?r=NaN:(r=(t-n+(t-i))/2,r/=N1((t-n)*(t-n)+(t-i)*(n-i)),r=B1(r),i>n&&(r=Pt-r),r/=Pt),[r*360,a,s]};H.prototype.hsi=function(){return P1(this._rgb)};const D1=(...e)=>new H(...e,"hsi");re.hsi=D1;de.format.hsi=M1;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"hsi"),be(e)==="array"&&e.length===3)return"hsi"}});const z1=(e,t,n)=>Vn(e,t,n,"hsi");He.hsi=z1;const go=(...e)=>{e=fe(e,"hsl");const[t,n,i]=e;let r,o,s;if(n===0)r=o=s=i*255;else{const a=[0,0,0],c=[0,0,0],l=i<.5?i*(1+n):i+n-i*n,d=2*i-l,f=t/360;a[0]=f+1/3,a[1]=f,a[2]=f-1/3;for(let u=0;u<3;u++)a[u]<0&&(a[u]+=1),a[u]>1&&(a[u]-=1),6*a[u]<1?c[u]=d+(l-d)*6*a[u]:2*a[u]<1?c[u]=l:3*a[u]<2?c[u]=d+(l-d)*(2/3-a[u])*6:c[u]=d;[r,o,s]=[c[0]*255,c[1]*255,c[2]*255]}return e.length>3?[r,o,s,e[3]]:[r,o,s,1]},Wl=(...e)=>{e=fe(e,"rgba");let[t,n,i]=e;t/=255,n/=255,i/=255;const r=Il(t,n,i),o=Ll(t,n,i),s=(o+r)/2;let a,c;return o===r?(a=0,c=Number.NaN):a=s<.5?(o-r)/(o+r):(o-r)/(2-o-r),t==o?c=(n-i)/(o-r):n==o?c=2+(i-t)/(o-r):i==o&&(c=4+(t-n)/(o-r)),c*=60,c<0&&(c+=360),e.length>3&&e[3]!==void 0?[c,a,s,e[3]]:[c,a,s]};H.prototype.hsl=function(){return Wl(this._rgb)};const W1=(...e)=>new H(...e,"hsl");re.hsl=W1;de.format.hsl=go;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"hsl"),be(e)==="array"&&e.length===3)return"hsl"}});const H1=(e,t,n)=>Vn(e,t,n,"hsl");He.hsl=H1;const{floor:j1}=Math,F1=(...e)=>{e=fe(e,"hsv");let[t,n,i]=e,r,o,s;if(i*=255,n===0)r=o=s=i;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;const a=j1(t),c=t-a,l=i*(1-n),d=i*(1-n*c),f=i*(1-n*(1-c));switch(a){case 0:[r,o,s]=[i,f,l];break;case 1:[r,o,s]=[d,i,l];break;case 2:[r,o,s]=[l,i,f];break;case 3:[r,o,s]=[l,d,i];break;case 4:[r,o,s]=[f,l,i];break;case 5:[r,o,s]=[i,l,d];break}}return[r,o,s,e.length>3?e[3]:1]},{min:K1,max:q1}=Math,U1=(...e)=>{e=fe(e,"rgb");let[t,n,i]=e;const r=K1(t,n,i),o=q1(t,n,i),s=o-r;let a,c,l;return l=o/255,o===0?(a=Number.NaN,c=0):(c=s/o,t===o&&(a=(n-i)/s),n===o&&(a=2+(i-t)/s),i===o&&(a=4+(t-n)/s),a*=60,a<0&&(a+=360)),[a,c,l]};H.prototype.hsv=function(){return U1(this._rgb)};const V1=(...e)=>new H(...e,"hsv");re.hsv=V1;de.format.hsv=F1;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"hsv"),be(e)==="array"&&e.length===3)return"hsv"}});const G1=(e,t,n)=>Vn(e,t,n,"hsv");He.hsv=G1;function Xi(e,t){let n=e.length;Array.isArray(e[0])||(e=[e]),Array.isArray(t[0])||(t=t.map(s=>[s]));let i=t[0].length,r=t[0].map((s,a)=>t.map(c=>c[a])),o=e.map(s=>r.map(a=>Array.isArray(s)?s.reduce((c,l,d)=>c+l*(a[d]||0),0):a.reduce((c,l)=>c+l*s,0)));return n===1&&(o=o[0]),i===1?o.map(s=>s[0]):o}const Jo=(...e)=>{e=fe(e,"lab");const[t,n,i,...r]=e,[o,s,a]=Y1([t,n,i]),[c,l,d]=Nl(o,s,a);return[c,l,d,...r.length>0&&r[0]<1?[r[0]]:[]]};function Y1(e){var t=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],n=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],i=Xi(n,e);return Xi(t,i.map(r=>r**3))}const Qo=(...e)=>{const[t,n,i,...r]=fe(e,"rgb"),o=Bl(t,n,i);return[...Z1(o),...r.length>0&&r[0]<1?[r[0]]:[]]};function Z1(e){const t=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],n=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],i=Xi(t,e);return Xi(n,i.map(r=>Math.cbrt(r)))}H.prototype.oklab=function(){return Qo(this._rgb)};const X1=(...e)=>new H(...e,"oklab");Object.assign(re,{oklab:X1});de.format.oklab=Jo;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"oklab"),be(e)==="array"&&e.length===3)return"oklab"}});const J1=(e,t,n)=>{const i=e.oklab(),r=t.oklab();return new H(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"oklab")};He.oklab=J1;const Q1=(e,t,n)=>Vn(e,t,n,"oklch");He.oklch=Q1;const{pow:zr,sqrt:Wr,PI:Hr,cos:sa,sin:aa,atan2:eb}=Math,tb=(e,t="lrgb",n=null)=>{const i=e.length;n||(n=Array.from(new Array(i)).map(()=>1));const r=i/n.reduce(function(f,u){return f+u});if(n.forEach((f,u)=>{n[u]*=r}),e=e.map(f=>new H(f)),t==="lrgb")return nb(e,n);const o=e.shift(),s=o.get(t),a=[];let c=0,l=0;for(let f=0;f<s.length;f++)if(s[f]=(s[f]||0)*n[0],a.push(isNaN(s[f])?0:n[0]),t.charAt(f)==="h"&&!isNaN(s[f])){const u=s[f]/180*Hr;c+=sa(u)*n[0],l+=aa(u)*n[0]}let d=o.alpha()*n[0];e.forEach((f,u)=>{const b=f.get(t);d+=f.alpha()*n[u+1];for(let p=0;p<s.length;p++)if(!isNaN(b[p]))if(a[p]+=n[u+1],t.charAt(p)==="h"){const m=b[p]/180*Hr;c+=sa(m)*n[u+1],l+=aa(m)*n[u+1]}else s[p]+=b[p]*n[u+1]});for(let f=0;f<s.length;f++)if(t.charAt(f)==="h"){let u=eb(l/a[f],c/a[f])/Hr*180;for(;u<0;)u+=360;for(;u>=360;)u-=360;s[f]=u}else s[f]=s[f]/a[f];return d/=i,new H(s,t).alpha(d>.99999?1:d,!0)},nb=(e,t)=>{const n=e.length,i=[0,0,0,0];for(let r=0;r<e.length;r++){const o=e[r],s=t[r]/n,a=o._rgb;i[0]+=zr(a[0],2)*s,i[1]+=zr(a[1],2)*s,i[2]+=zr(a[2],2)*s,i[3]+=a[3]*s}return i[0]=Wr(i[0]),i[1]=Wr(i[1]),i[2]=Wr(i[2]),i[3]>.9999999&&(i[3]=1),new H(Vo(i))},{pow:ib}=Math;function Ji(e){let t="rgb",n=re("#ccc"),i=0,r=[0,1],o=[0,1],s=[],a=[0,0],c=!1,l=[],d=!1,f=0,u=1,b=!1,p={},m=!0,S=1;const I=function(y){if(y=y||["#fff","#000"],y&&be(y)==="string"&&re.brewer&&re.brewer[y.toLowerCase()]&&(y=re.brewer[y.toLowerCase()]),be(y)==="array"){y.length===1&&(y=[y[0],y[0]]),y=y.slice(0);for(let W=0;W<y.length;W++)y[W]=re(y[W]);s.length=0;for(let W=0;W<y.length;W++)s.push(W/(y.length-1))}return B(),l=y},z=function(y){if(c!=null){const W=c.length-1;let U=0;for(;U<W&&y>=c[U];)U++;return U-1}return 0};let R=y=>y,_=y=>y;const k=function(y,W){let U,q;if(W==null&&(W=!1),isNaN(y)||y===null)return n;W?q=y:c&&c.length>2?q=z(y)/(c.length-2):u!==f?q=(y-f)/(u-f):q=1,q=_(q),W||(q=R(q)),S!==1&&(q=ib(q,S)),q=a[0]+q*(1-a[0]-a[1]),q=vn(q,0,1);const le=Math.floor(q*1e4);if(m&&p[le])U=p[le];else{if(be(l)==="array")for(let J=0;J<s.length;J++){const ge=s[J];if(q<=ge){U=l[J];break}if(q>=ge&&J===s.length-1){U=l[J];break}if(q>ge&&q<s[J+1]){q=(q-ge)/(s[J+1]-ge),U=re.interpolate(l[J],l[J+1],q,t);break}}else be(l)==="function"&&(U=l(q));m&&(p[le]=U)}return U};var B=()=>p={};I(e);const w=function(y){const W=re(k(y));return d&&W[d]?W[d]():W};return w.classes=function(y){if(y!=null){if(be(y)==="array")c=y,r=[y[0],y[y.length-1]];else{const W=re.analyze(r);y===0?c=[W.min,W.max]:c=re.limits(W,"e",y)}return w}return c},w.domain=function(y){if(!arguments.length)return o;o=y.slice(0),f=y[0],u=y[y.length-1],s=[];const W=l.length;if(y.length===W&&f!==u)for(let U of Array.from(y))s.push((U-f)/(u-f));else{for(let U=0;U<W;U++)s.push(U/(W-1));if(y.length>2){const U=y.map((le,J)=>J/(y.length-1)),q=y.map(le=>(le-f)/(u-f));q.every((le,J)=>U[J]===le)||(_=le=>{if(le<=0||le>=1)return le;let J=0;for(;le>=q[J+1];)J++;const ge=(le-q[J])/(q[J+1]-q[J]);return U[J]+ge*(U[J+1]-U[J])})}}return r=[f,u],w},w.mode=function(y){return arguments.length?(t=y,B(),w):t},w.range=function(y,W){return I(y),w},w.out=function(y){return d=y,w},w.spread=function(y){return arguments.length?(i=y,w):i},w.correctLightness=function(y){return y==null&&(y=!0),b=y,B(),b?R=function(W){const U=k(0,!0).lab()[0],q=k(1,!0).lab()[0],le=U>q;let J=k(W,!0).lab()[0];const ge=U+(q-U)*W;let ae=J-ge,v=0,E=1,A=20;for(;Math.abs(ae)>.01&&A-- >0;)(function(){return le&&(ae*=-1),ae<0?(v=W,W+=(E-W)*.5):(E=W,W+=(v-W)*.5),J=k(W,!0).lab()[0],ae=J-ge})();return W}:R=W=>W,w},w.padding=function(y){return y!=null?(be(y)==="number"&&(y=[y,y]),a=y,w):a},w.colors=function(y,W){arguments.length<2&&(W="hex");let U=[];if(arguments.length===0)U=l.slice(0);else if(y===1)U=[w(.5)];else if(y>1){const q=r[0],le=r[1]-q;U=rb(0,y).map(J=>w(q+J/(y-1)*le))}else{e=[];let q=[];if(c&&c.length>2)for(let le=1,J=c.length,ge=1<=J;ge?le<J:le>J;ge?le++:le--)q.push((c[le-1]+c[le])*.5);else q=r;U=q.map(le=>w(le))}return re[W]&&(U=U.map(q=>q[W]())),U},w.cache=function(y){return y!=null?(m=y,w):m},w.gamma=function(y){return y!=null?(S=y,w):S},w.nodata=function(y){return y!=null?(n=re(y),w):n},w}function rb(e,t,n){let i=[],r=e<t,o=t;for(let s=e;r?s<o:s>o;r?s++:s--)i.push(s);return i}const ob=function(e){let t=[1,1];for(let n=1;n<e;n++){let i=[1];for(let r=1;r<=t.length;r++)i[r]=(t[r]||0)+t[r-1];t=i}return t},sb=function(e){let t,n,i,r;if(e=e.map(o=>new H(o)),e.length===2)[n,i]=e.map(o=>o.lab()),t=function(o){const s=[0,1,2].map(a=>n[a]+o*(i[a]-n[a]));return new H(s,"lab")};else if(e.length===3)[n,i,r]=e.map(o=>o.lab()),t=function(o){const s=[0,1,2].map(a=>(1-o)*(1-o)*n[a]+2*(1-o)*o*i[a]+o*o*r[a]);return new H(s,"lab")};else if(e.length===4){let o;[n,i,r,o]=e.map(s=>s.lab()),t=function(s){const a=[0,1,2].map(c=>(1-s)*(1-s)*(1-s)*n[c]+3*(1-s)*(1-s)*s*i[c]+3*(1-s)*s*s*r[c]+s*s*s*o[c]);return new H(a,"lab")}}else if(e.length>=5){let o,s,a;o=e.map(c=>c.lab()),a=e.length-1,s=ob(a),t=function(c){const l=1-c,d=[0,1,2].map(f=>o.reduce((u,b,p)=>u+s[p]*l**(a-p)*c**p*b[f],0));return new H(d,"lab")}}else throw new RangeError("No point in running bezier with only one color.");return t},ab=e=>{const t=sb(e);return t.scale=()=>Ji(t),t},{round:Hl}=Math;H.prototype.rgb=function(e=!0){return e===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(Hl)};H.prototype.rgba=function(e=!0){return this._rgb.slice(0,4).map((t,n)=>n<3?e===!1?t:Hl(t):t)};const cb=(...e)=>new H(...e,"rgb");Object.assign(re,{rgb:cb});de.format.rgb=(...e)=>{const t=fe(e,"rgba");return t[3]===void 0&&(t[3]=1),t};de.autodetect.push({p:3,test:(...e)=>{if(e=fe(e,"rgba"),be(e)==="array"&&(e.length===3||e.length===4&&be(e[3])=="number"&&e[3]>=0&&e[3]<=1))return"rgb"}});const gt=(e,t,n)=>{if(!gt[n])throw new Error("unknown blend mode "+n);return gt[n](e,t)},cn=e=>(t,n)=>{const i=re(n).rgb(),r=re(t).rgb();return re.rgb(e(i,r))},ln=e=>(t,n)=>{const i=[];return i[0]=e(t[0],n[0]),i[1]=e(t[1],n[1]),i[2]=e(t[2],n[2]),i},lb=e=>e,db=(e,t)=>e*t/255,pb=(e,t)=>e>t?t:e,fb=(e,t)=>e>t?e:t,ub=(e,t)=>255*(1-(1-e/255)*(1-t/255)),hb=(e,t)=>t<128?2*e*t/255:255*(1-2*(1-e/255)*(1-t/255)),gb=(e,t)=>255*(1-(1-t/255)/(e/255)),mb=(e,t)=>e===255?255:(e=255*(t/255)/(1-e/255),e>255?255:e);gt.normal=cn(ln(lb));gt.multiply=cn(ln(db));gt.screen=cn(ln(ub));gt.overlay=cn(ln(hb));gt.darken=cn(ln(pb));gt.lighten=cn(ln(fb));gt.dodge=cn(ln(mb));gt.burn=cn(ln(gb));const{pow:bb,sin:xb,cos:yb}=Math;function vb(e=300,t=-1.5,n=1,i=1,r=[0,1]){let o=0,s;be(r)==="array"?s=r[1]-r[0]:(s=0,r=[r,r]);const a=function(c){const l=Pt*((e+120)/360+t*c),d=bb(r[0]+s*c,i),u=(o!==0?n[0]+c*o:n)*d*(1-d)/2,b=yb(l),p=xb(l),m=d+u*(-.14861*b+1.78277*p),S=d+u*(-.29227*b-.90649*p),I=d+u*(1.97294*b);return re(Vo([m*255,S*255,I*255,1]))};return a.start=function(c){return c==null?e:(e=c,a)},a.rotations=function(c){return c==null?t:(t=c,a)},a.gamma=function(c){return c==null?i:(i=c,a)},a.hue=function(c){return c==null?n:(n=c,be(n)==="array"?(o=n[1]-n[0],o===0&&(n=n[1])):o=0,a)},a.lightness=function(c){return c==null?r:(be(c)==="array"?(r=c,s=c[1]-c[0]):(r=[c,c],s=0),a)},a.scale=()=>re.scale(a),a.hue(n),a}const wb="0123456789abcdef",{floor:kb,random:_b}=Math,Sb=(e=_b)=>{let t="#";for(let n=0;n<6;n++)t+=wb.charAt(kb(e()*16));return new H(t,"hex")},{log:ca,pow:$b,floor:Eb,abs:Cb}=Math;function jl(e,t=null){const n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return be(e)==="object"&&(e=Object.values(e)),e.forEach(i=>{t&&be(i)==="object"&&(i=i[t]),i!=null&&!isNaN(i)&&(n.values.push(i),n.sum+=i,i<n.min&&(n.min=i),i>n.max&&(n.max=i),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(i,r)=>Fl(n,i,r),n}function Fl(e,t="equal",n=7){be(e)=="array"&&(e=jl(e));const{min:i,max:r}=e,o=e.values.sort((a,c)=>a-c);if(n===1)return[i,r];const s=[];if(t.substr(0,1)==="c"&&(s.push(i),s.push(r)),t.substr(0,1)==="e"){s.push(i);for(let a=1;a<n;a++)s.push(i+a/n*(r-i));s.push(r)}else if(t.substr(0,1)==="l"){if(i<=0)throw new Error("Logarithmic scales are only possible for values > 0");const a=Math.LOG10E*ca(i),c=Math.LOG10E*ca(r);s.push(i);for(let l=1;l<n;l++)s.push($b(10,a+l/n*(c-a)));s.push(r)}else if(t.substr(0,1)==="q"){s.push(i);for(let a=1;a<n;a++){const c=(o.length-1)*a/n,l=Eb(c);if(l===c)s.push(o[l]);else{const d=c-l;s.push(o[l]*(1-d)+o[l+1]*d)}}s.push(r)}else if(t.substr(0,1)==="k"){let a;const c=o.length,l=new Array(c),d=new Array(n);let f=!0,u=0,b=null;b=[],b.push(i);for(let S=1;S<n;S++)b.push(i+S/n*(r-i));for(b.push(r);f;){for(let I=0;I<n;I++)d[I]=0;for(let I=0;I<c;I++){const z=o[I];let R=Number.MAX_VALUE,_;for(let k=0;k<n;k++){const B=Cb(b[k]-z);B<R&&(R=B,_=k),d[_]++,l[I]=_}}const S=new Array(n);for(let I=0;I<n;I++)S[I]=null;for(let I=0;I<c;I++)a=l[I],S[a]===null?S[a]=o[I]:S[a]+=o[I];for(let I=0;I<n;I++)S[I]*=1/d[I];f=!1;for(let I=0;I<n;I++)if(S[I]!==b[I]){f=!0;break}b=S,u++,u>200&&(f=!1)}const p={};for(let S=0;S<n;S++)p[S]=[];for(let S=0;S<c;S++)a=l[S],p[a].push(o[S]);let m=[];for(let S=0;S<n;S++)m.push(p[S][0]),m.push(p[S][p[S].length-1]);m=m.sort((S,I)=>S-I),s.push(m[0]);for(let S=1;S<m.length;S+=2){const I=m[S];!isNaN(I)&&s.indexOf(I)===-1&&s.push(I)}}return s}const Ab=(e,t)=>{e=new H(e),t=new H(t);const n=e.luminance(),i=t.luminance();return n>i?(n+.05)/(i+.05):(i+.05)/(n+.05)};/**
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
 */const la=.027,Tb=5e-4,Ib=.1,da=1.14,Ii=.022,pa=1.414,Lb=(e,t)=>{e=new H(e),t=new H(t),e.alpha()<1&&(e=Kn(t,e,e.alpha(),"rgb"));const n=fa(...e.rgb()),i=fa(...t.rgb()),r=n>=Ii?n:n+Math.pow(Ii-n,pa),o=i>=Ii?i:i+Math.pow(Ii-i,pa),s=Math.pow(o,.56)-Math.pow(r,.57),a=Math.pow(o,.65)-Math.pow(r,.62),c=Math.abs(o-r)<Tb?0:r<o?s*da:a*da;return(Math.abs(c)<Ib?0:c>0?c-la:c+la)*100};function fa(e,t,n){return .2126729*Math.pow(e/255,2.4)+.7151522*Math.pow(t/255,2.4)+.072175*Math.pow(n/255,2.4)}const{sqrt:Mt,pow:Le,min:Rb,max:Mb,atan2:ua,abs:ha,cos:Li,sin:ga,exp:Ob,PI:ma}=Math;function Nb(e,t,n=1,i=1,r=1){var o=function(Oe){return 360*Oe/(2*ma)},s=function(Oe){return 2*ma*Oe/360};e=new H(e),t=new H(t);const[a,c,l]=Array.from(e.lab()),[d,f,u]=Array.from(t.lab()),b=(a+d)/2,p=Mt(Le(c,2)+Le(l,2)),m=Mt(Le(f,2)+Le(u,2)),S=(p+m)/2,I=.5*(1-Mt(Le(S,7)/(Le(S,7)+Le(25,7)))),z=c*(1+I),R=f*(1+I),_=Mt(Le(z,2)+Le(l,2)),k=Mt(Le(R,2)+Le(u,2)),B=(_+k)/2,w=o(ua(l,z)),y=o(ua(u,R)),W=w>=0?w:w+360,U=y>=0?y:y+360,q=ha(W-U)>180?(W+U+360)/2:(W+U)/2,le=1-.17*Li(s(q-30))+.24*Li(s(2*q))+.32*Li(s(3*q+6))-.2*Li(s(4*q-63));let J=U-W;J=ha(J)<=180?J:U<=W?J+360:J-360,J=2*Mt(_*k)*ga(s(J)/2);const ge=d-a,ae=k-_,v=1+.015*Le(b-50,2)/Mt(20+Le(b-50,2)),E=1+.045*B,A=1+.015*B*le,X=30*Ob(-Le((q-275)/25,2)),xe=-(2*Mt(Le(B,7)/(Le(B,7)+Le(25,7))))*ga(2*s(X)),ye=Mt(Le(ge/(n*v),2)+Le(ae/(i*E),2)+Le(J/(r*A),2)+xe*(ae/(i*E))*(J/(r*A)));return Mb(0,Rb(100,ye))}function Bb(e,t,n="lab"){e=new H(e),t=new H(t);const i=e.get(n),r=t.get(n);let o=0;for(let s in i){const a=(i[s]||0)-(r[s]||0);o+=a*a}return Math.sqrt(o)}const Pb=(...e)=>{try{return new H(...e),!0}catch{return!1}},Db={cool(){return Ji([re.hsl(180,1,.9),re.hsl(250,.7,.4)])},hot(){return Ji(["#000","#f00","#ff0","#fff"]).mode("rgb")}},mo={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},Kl=Object.keys(mo),ba=new Map(Kl.map(e=>[e.toLowerCase(),e])),zb=typeof Proxy=="function"?new Proxy(mo,{get(e,t){const n=t.toLowerCase();if(ba.has(n))return e[ba.get(n)]},getOwnPropertyNames(){return Object.getOwnPropertyNames(Kl)}}):mo,Wb=(...e)=>{e=fe(e,"cmyk");const[t,n,i,r]=e,o=e.length>4?e[4]:1;return r===1?[0,0,0,o]:[t>=1?0:255*(1-t)*(1-r),n>=1?0:255*(1-n)*(1-r),i>=1?0:255*(1-i)*(1-r),o]},{max:xa}=Math,Hb=(...e)=>{let[t,n,i]=fe(e,"rgb");t=t/255,n=n/255,i=i/255;const r=1-xa(t,xa(n,i)),o=r<1?1/(1-r):0,s=(1-t-r)*o,a=(1-n-r)*o,c=(1-i-r)*o;return[s,a,c,r]};H.prototype.cmyk=function(){return Hb(this._rgb)};const jb=(...e)=>new H(...e,"cmyk");Object.assign(re,{cmyk:jb});de.format.cmyk=Wb;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"cmyk"),be(e)==="array"&&e.length===4)return"cmyk"}});const Fb=(...e)=>{const t=fe(e,"hsla");let n=Un(e)||"lsa";return t[0]=at(t[0]||0)+"deg",t[1]=at(t[1]*100)+"%",t[2]=at(t[2]*100)+"%",n==="hsla"||t.length>3&&t[3]<1?(t[3]="/ "+(t.length>3?t[3]:1),n="hsla"):t.length=3,`${n.substr(0,3)}(${t.join(" ")})`},Kb=(...e)=>{const t=fe(e,"lab");let n=Un(e)||"lab";return t[0]=at(t[0])+"%",t[1]=at(t[1]),t[2]=at(t[2]),n==="laba"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lab(${t.join(" ")})`},qb=(...e)=>{const t=fe(e,"lch");let n=Un(e)||"lab";return t[0]=at(t[0])+"%",t[1]=at(t[1]),t[2]=isNaN(t[2])?"none":at(t[2])+"deg",n==="lcha"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lch(${t.join(" ")})`},Ub=(...e)=>{const t=fe(e,"lab");return t[0]=at(t[0]*100)+"%",t[1]=ho(t[1]),t[2]=ho(t[2]),t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklab(${t.join(" ")})`},ql=(...e)=>{const[t,n,i,...r]=fe(e,"rgb"),[o,s,a]=Qo(t,n,i),[c,l,d]=Dl(o,s,a);return[c,l,d,...r.length>0&&r[0]<1?[r[0]]:[]]},Vb=(...e)=>{const t=fe(e,"lch");return t[0]=at(t[0]*100)+"%",t[1]=ho(t[1]),t[2]=isNaN(t[2])?"none":at(t[2])+"deg",t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklch(${t.join(" ")})`},{round:jr}=Math,Gb=(...e)=>{const t=fe(e,"rgba");let n=Un(e)||"rgb";if(n.substr(0,3)==="hsl")return Fb(Wl(t),n);if(n.substr(0,3)==="lab"){const i=xi();Ht("d50");const r=Kb(Yo(t),n);return Ht(i),r}if(n.substr(0,3)==="lch"){const i=xi();Ht("d50");const r=qb(Xo(t),n);return Ht(i),r}return n.substr(0,5)==="oklab"?Ub(Qo(t)):n.substr(0,5)==="oklch"?Vb(ql(t)):(t[0]=jr(t[0]),t[1]=jr(t[1]),t[2]=jr(t[2]),(n==="rgba"||t.length>3&&t[3]<1)&&(t[3]="/ "+(t.length>3?t[3]:1),n="rgba"),`${n.substr(0,3)}(${t.slice(0,n==="rgb"?3:4).join(" ")})`)},Ul=(...e)=>{e=fe(e,"lch");const[t,n,i,...r]=e,[o,s,a]=Pl(t,n,i),[c,l,d]=Jo(o,s,a);return[c,l,d,...r.length>0&&r[0]<1?[r[0]]:[]]},Ft=/((?:-?\d+)|(?:-?\d+(?:\.\d+)?)%|none)/.source,ut=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%?)|none)/.source,Qi=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)%)|none)/.source,ct=/\s*/.source,Gn=/\s+/.source,es=/\s*,\s*/.source,mr=/((?:-?(?:\d+(?:\.\d*)?|\.\d+)(?:deg)?)|none)/.source,Yn=/\s*(?:\/\s*((?:[01]|[01]?\.\d+)|\d+(?:\.\d+)?%))?/.source,Vl=new RegExp("^rgba?\\("+ct+[Ft,Ft,Ft].join(Gn)+Yn+"\\)$"),Gl=new RegExp("^rgb\\("+ct+[Ft,Ft,Ft].join(es)+ct+"\\)$"),Yl=new RegExp("^rgba\\("+ct+[Ft,Ft,Ft,ut].join(es)+ct+"\\)$"),Zl=new RegExp("^hsla?\\("+ct+[mr,Qi,Qi].join(Gn)+Yn+"\\)$"),Xl=new RegExp("^hsl?\\("+ct+[mr,Qi,Qi].join(es)+ct+"\\)$"),Jl=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,Ql=new RegExp("^lab\\("+ct+[ut,ut,ut].join(Gn)+Yn+"\\)$"),ed=new RegExp("^lch\\("+ct+[ut,ut,mr].join(Gn)+Yn+"\\)$"),td=new RegExp("^oklab\\("+ct+[ut,ut,ut].join(Gn)+Yn+"\\)$"),nd=new RegExp("^oklch\\("+ct+[ut,ut,mr].join(Gn)+Yn+"\\)$"),{round:id}=Math,Rn=e=>e.map((t,n)=>n<=2?vn(id(t),0,255):t),Re=(e,t=0,n=100,i=!1)=>(typeof e=="string"&&e.endsWith("%")&&(e=parseFloat(e.substring(0,e.length-1))/100,i?e=t+(e+1)*.5*(n-t):e=t+e*(n-t)),+e),Ke=(e,t)=>e==="none"?t:e,ts=e=>{if(e=e.toLowerCase().trim(),e==="transparent")return[0,0,0,0];let t;if(de.format.named)try{return de.format.named(e)}catch{}if((t=e.match(Vl))||(t=e.match(Gl))){let n=t.slice(1,4);for(let r=0;r<3;r++)n[r]=+Re(Ke(n[r],0),0,255);n=Rn(n);const i=t[4]!==void 0?+Re(t[4],0,1):1;return n[3]=i,n}if(t=e.match(Yl)){const n=t.slice(1,5);for(let i=0;i<4;i++)n[i]=+Re(n[i],0,255);return n}if((t=e.match(Zl))||(t=e.match(Xl))){const n=t.slice(1,4);n[0]=+Ke(n[0].replace("deg",""),0),n[1]=+Re(Ke(n[1],0),0,100)*.01,n[2]=+Re(Ke(n[2],0),0,100)*.01;const i=Rn(go(n)),r=t[4]!==void 0?+Re(t[4],0,1):1;return i[3]=r,i}if(t=e.match(Jl)){const n=t.slice(1,4);n[1]*=.01,n[2]*=.01;const i=go(n);for(let r=0;r<3;r++)i[r]=id(i[r]);return i[3]=+t[4],i}if(t=e.match(Ql)){const n=t.slice(1,4);n[0]=Re(Ke(n[0],0),0,100),n[1]=Re(Ke(n[1],0),-125,125,!0),n[2]=Re(Ke(n[2],0),-125,125,!0);const i=xi();Ht("d50");const r=Rn(Go(n));Ht(i);const o=t[4]!==void 0?+Re(t[4],0,1):1;return r[3]=o,r}if(t=e.match(ed)){const n=t.slice(1,4);n[0]=Re(n[0],0,100),n[1]=Re(Ke(n[1],0),0,150,!1),n[2]=+Ke(n[2].replace("deg",""),0);const i=xi();Ht("d50");const r=Rn(Zo(n));Ht(i);const o=t[4]!==void 0?+Re(t[4],0,1):1;return r[3]=o,r}if(t=e.match(td)){const n=t.slice(1,4);n[0]=Re(Ke(n[0],0),0,1),n[1]=Re(Ke(n[1],0),-.4,.4,!0),n[2]=Re(Ke(n[2],0),-.4,.4,!0);const i=Rn(Jo(n)),r=t[4]!==void 0?+Re(t[4],0,1):1;return i[3]=r,i}if(t=e.match(nd)){const n=t.slice(1,4);n[0]=Re(Ke(n[0],0),0,1),n[1]=Re(Ke(n[1],0),0,.4,!1),n[2]=+Ke(n[2].replace("deg",""),0);const i=Rn(Ul(n)),r=t[4]!==void 0?+Re(t[4],0,1):1;return i[3]=r,i}};ts.test=e=>Vl.test(e)||Zl.test(e)||Ql.test(e)||ed.test(e)||td.test(e)||nd.test(e)||Gl.test(e)||Yl.test(e)||Xl.test(e)||Jl.test(e)||e==="transparent";H.prototype.css=function(e){return Gb(this._rgb,e)};const Yb=(...e)=>new H(...e,"css");re.css=Yb;de.format.css=ts;de.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&be(e)==="string"&&ts.test(e))return"css"}});de.format.gl=(...e)=>{const t=fe(e,"rgba");return t[0]*=255,t[1]*=255,t[2]*=255,t};const Zb=(...e)=>new H(...e,"gl");re.gl=Zb;H.prototype.gl=function(){const e=this._rgb;return[e[0]/255,e[1]/255,e[2]/255,e[3]]};H.prototype.hex=function(e){return Ol(this._rgb,e)};const Xb=(...e)=>new H(...e,"hex");re.hex=Xb;de.format.hex=Ml;de.autodetect.push({p:4,test:(e,...t)=>{if(!t.length&&be(e)==="string"&&[3,4,5,6,7,8,9].indexOf(e.length)>=0)return"hex"}});const{log:Ri}=Math,rd=e=>{const t=e/100;let n,i,r;return t<66?(n=255,i=t<6?0:-155.25485562709179-.44596950469579133*(i=t-2)+104.49216199393888*Ri(i),r=t<20?0:-254.76935184120902+.8274096064007395*(r=t-10)+115.67994401066147*Ri(r)):(n=351.97690566805693+.114206453784165*(n=t-55)-40.25366309332127*Ri(n),i=325.4494125711974+.07943456536662342*(i=t-50)-28.0852963507957*Ri(i),r=255),[n,i,r,1]},{round:Jb}=Math,Qb=(...e)=>{const t=fe(e,"rgb"),n=t[0],i=t[2];let r=1e3,o=4e4;const s=.4;let a;for(;o-r>s;){a=(o+r)*.5;const c=rd(a);c[2]/c[0]>=i/n?o=a:r=a}return Jb(a)};H.prototype.temp=H.prototype.kelvin=H.prototype.temperature=function(){return Qb(this._rgb)};const Fr=(...e)=>new H(...e,"temp");Object.assign(re,{temp:Fr,kelvin:Fr,temperature:Fr});de.format.temp=de.format.kelvin=de.format.temperature=rd;H.prototype.oklch=function(){return ql(this._rgb)};const ex=(...e)=>new H(...e,"oklch");Object.assign(re,{oklch:ex});de.format.oklch=Ul;de.autodetect.push({p:2,test:(...e)=>{if(e=fe(e,"oklch"),be(e)==="array"&&e.length===3)return"oklch"}});Object.assign(re,{analyze:jl,average:tb,bezier:ab,blend:gt,brewer:zb,Color:H,colors:Fn,contrast:Ab,contrastAPCA:Lb,cubehelix:vb,deltaE:Nb,distance:Bb,input:de,interpolate:Kn,limits:Fl,mix:Kn,random:Sb,scale:Ji,scales:Db,valid:Pb});function od(e){const t=re(e.primary).hex(),n=re(e.secondary).hex(),i=re(e.accent).hex(),r=e.dark??nx(t,n),o=r?"#12141a":"#ffffff",s=r?re.mix(o,t,.12,"lch").hex():re.mix(o,t,.06,"lch").hex(),a=r?re.mix(o,t,.2,"lch").hex():re.mix(o,t,.12,"lch").hex(),c=r?"#e6e6e6":"#1f2328",l=r?"#9aa5b1":"#6a737d",d=r?"#12141a":"#ffffff",f=r?re.mix(o,"#ffffff",.12,"lch").hex():re.mix(o,"#000000",.1,"lch").hex(),u=i,b=r?{tip:{accent:"#4ec9b0",soft:re.mix("#4ec9b0",o,.8,"lch").hex()},warning:{accent:"#f0a35b",soft:re.mix("#f0a35b",o,.8,"lch").hex()},info:{accent:"#61afef",soft:re.mix("#61afef",o,.8,"lch").hex()},danger:{accent:"#e06c75",soft:re.mix("#e06c75",o,.8,"lch").hex()}}:{tip:{accent:"#1a8450",soft:re.mix("#1a8450",o,.88,"lch").hex()},warning:{accent:"#b7791f",soft:re.mix("#b7791f",o,.88,"lch").hex()},info:{accent:"#1a73e8",soft:re.mix("#1a73e8",o,.88,"lch").hex()},danger:{accent:"#b42318",soft:re.mix("#b42318",o,.88,"lch").hex()}};return{primary:t,secondary:n,accent:i,bg:o,bgSoft:s,bgMuted:a,text:c,textMuted:l,textInverse:d,border:f,code:u,status:b}}function tx(e,t=!1){const n=re(e),i=n.darken(1.2).saturate(.3).hex(),[r,o,s]=n.lch(),c=re.lch(r,Math.max(o,45),(s+150)%360).hex();return{primary:n.hex(),secondary:i,accent:c,dark:t}}function nx(e,t){const n=re(e).luminance(),i=re(t).luminance();return(n+i)/2<.18}function ix(e,t){const n=re.contrast(e,t);return{pass:n>=3,ratio:Math.round(n*10)/10}}const rx={class:"panel"},ox={class:"panel-head"},sx={class:"panel-section"},ax={class:"preset-grid"},cx=["title","onClick"],lx={class:"preset-swatches"},dx={class:"preset-name"},px={class:"panel-section"},fx={class:"field-row"},ux={class:"field"},hx={class:"mono"},gx={class:"field"},mx={class:"mono"},bx={class:"field"},xx={class:"mono"},yx={class:"field-row inline"},vx={class:"toggle"},wx={class:"panel-section"},kx={key:0,class:"check-ok"},_x={key:1,class:"check-bad"},Sx={class:"panel-foot"},$x=["disabled"],Ex=Je({__name:"ColorCustomizer",props:{hasCustomColor:{type:Boolean}},emits:["apply","reset","close"],setup(e,{emit:t}){const n=e,i=t,r=kn({primary:"#a83420",secondary:"#6a6655",accent:"#46573f",dark:!1}),o=kn({previewBg:"#ffffff",contrastRatio:0,contrastPass:!0});let s=null;nt(()=>[r.primary,r.secondary,r.accent,r.dark],()=>{const d=od(r);o.previewBg=d.bg;const{pass:f,ratio:u}=ix(r.primary,d.bg);o.contrastPass=f,o.contrastRatio=u,s!==null&&window.clearTimeout(s),s=window.setTimeout(()=>i("apply",{...r}),120)},{immediate:!0}),sn(()=>{s!==null&&window.clearTimeout(s)});function a(d){r.primary=d.primary,r.secondary=d.secondary,r.accent=d.accent,r.dark=!!d.dark}function c(){const d=tx(r.primary,r.dark);r.secondary=d.secondary,r.accent=d.accent}function l(){i("reset")}return(d,f)=>(j(),G("div",rx,[h("header",ox,[f[5]||(f[5]=h("h3",{class:"tx-section"},"自定义配色",-1)),h("button",{class:"btn-text",onClick:f[0]||(f[0]=u=>i("close"))},"关闭")]),f[14]||(f[14]=h("div",{class:"hint mono"},[h("span",null,"改动即刻应用；切主题会重置。")],-1)),h("section",sx,[f[6]||(f[6]=h("div",{class:"section-title"},"预设调色板",-1)),h("div",ax,[(j(!0),G(_e,null,De(ee(X0),u=>(j(),G("button",{key:u.id,class:"preset",title:u.description,onClick:b=>a(u)},[h("span",lx,[h("span",{class:"swatch",style:Xe({background:u.primary})},null,4),h("span",{class:"swatch",style:Xe({background:u.secondary})},null,4),h("span",{class:"swatch",style:Xe({background:u.accent})},null,4)]),h("span",dx,Q(u.name),1)],8,cx))),128))])]),h("section",px,[f[11]||(f[11]=h("div",{class:"section-title"},"三色 seed",-1)),h("div",fx,[h("label",ux,[f[7]||(f[7]=h("span",{class:"field-label"},"主色",-1)),Et(h("input",{type:"color","onUpdate:modelValue":f[1]||(f[1]=u=>r.primary=u)},null,512),[[jt,r.primary]]),h("code",hx,Q(r.primary),1)]),h("label",gx,[f[8]||(f[8]=h("span",{class:"field-label"},"辅色",-1)),Et(h("input",{type:"color","onUpdate:modelValue":f[2]||(f[2]=u=>r.secondary=u)},null,512),[[jt,r.secondary]]),h("code",mx,Q(r.secondary),1)]),h("label",bx,[f[9]||(f[9]=h("span",{class:"field-label"},"点缀",-1)),Et(h("input",{type:"color","onUpdate:modelValue":f[3]||(f[3]=u=>r.accent=u)},null,512),[[jt,r.accent]]),h("code",xx,Q(r.accent),1)])]),h("div",yx,[h("label",vx,[Et(h("input",{type:"checkbox","onUpdate:modelValue":f[4]||(f[4]=u=>r.dark=u)},null,512),[[Lu,r.dark]]),f[10]||(f[10]=ft(" 暗底主题 ",-1))]),h("button",{class:"btn btn-ghost",onClick:c},"由主色补全")])]),h("section",wx,[f[13]||(f[13]=h("div",{class:"section-title"},"对比度",-1)),h("div",{class:Ie(["check mono",{fail:!o.contrastPass}])},[f[12]||(f[12]=ft(" primary × bg = ",-1)),h("strong",null,Q(o.contrastRatio.toFixed(1)),1),o.contrastPass?(j(),G("span",kx,"通过 WCAG AA 3.0")):(j(),G("span",_x,"低于 3.0 · 可读性差"))],2)]),h("footer",Sx,[h("button",{class:"btn btn-ghost wide",disabled:!n.hasCustomColor,onClick:l},"还原为主题默认",8,$x)])]))}}),Cx=Qe(Ex,[["__scopeId","data-v-b5c125a4"]]),Ax={accent:"#2d6fdd",soft:"#eef4ff",text:"#6a737d"};function Te(e){return{...Ax,...e}}function ue(e){return'<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg">'+e+"</svg>"}function Tx(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" rx="12" fill="${n}"/><rect x="59" y="51" width="10" height="10" fill="${n}"/><rect x="6" y="14" width="63" height="3" fill="${t}"/><rect x="16" y="24" width="30" height="3" fill="${t}"/><rect x="16" y="34" width="46" height="2" fill="#c0c6cf"/><rect x="16" y="41" width="40" height="2" fill="#c0c6cf"/><rect x="16" y="48" width="32" height="2" fill="#c0c6cf"/>`)}function Ix(e,t,n,i,r,o){return e==="tip"?{wrapperCSS:`background-color:${t.soft};padding:${i}px ${r}px;border-radius:${o*4}px ${o}px ${o*4}px ${o}px;box-shadow:0 2px 6px rgba(0,0,0,0.04);margin:16px 0`,titleCSS:`font-size:14px;font-weight:700;color:${t.accent};margin-bottom:6px;letter-spacing:0.3px`}:e==="warning"?{wrapperCSS:`background-color:${t.soft};border-top:1px dashed ${t.accent};border-bottom:2px solid ${t.accent};padding:${i}px ${r}px;border-radius:0 ${o*3}px 0 ${o*3}px;margin:16px 0`,titleCSS:`font-size:14px;font-weight:700;color:${t.accent};margin-bottom:6px;letter-spacing:1px`}:e==="info"?{wrapperCSS:`background-color:${n};border:1px solid ${t.soft};box-shadow:inset 0 2px 0 ${t.accent}, 0 1px 3px rgba(0,0,0,0.03);padding:${i+2}px ${r}px ${i}px;border-radius:${o*2}px;margin:18px 0`,titleCSS:`font-size:14px;font-weight:700;color:${t.accent};margin-bottom:6px;letter-spacing:0.3px`}:{wrapperCSS:`background-color:${t.soft};border:1px solid ${t.accent};border-top:8px solid ${t.accent};padding:${i}px ${r}px;border-radius:0;margin:18px 0`,titleCSS:`font-size:14px;font-weight:800;color:${t.accent};margin-bottom:6px;letter-spacing:1.5px;text-transform:uppercase`}}const Lx={meta:{id:"accent-bar",kind:"admonition",name:"差异皮肤",description:"四态各具形态：气泡/警戒带/卡片浮起/硬边紧迫"},thumbnail:Tx,snippets:[{presetId:"ad-tip-accent-bar",name:"差异皮肤 Tip",description:"气泡式不对称圆角 + soft 底，轻盈引导",admonitionKind:"tip",thumbArgs:{accent:"#1a8450",soft:"#eef7f0"},markdown:`::: tip 小贴士 variant=accent-bar
正文内容
:::
`},{presetId:"ad-warning-accent-bar",name:"差异皮肤 Warning",description:"上虚下实双警戒带 + 斜切圆角",admonitionKind:"warning",thumbArgs:{accent:"#b7791f",soft:"#fdf6e3"},markdown:`::: warning 注意 variant=accent-bar
正文内容
:::
`},{presetId:"ad-info-accent-bar",name:"差异皮肤 Info",description:"白底卡片 + 顶端 inset 主色 + 柔阴影",admonitionKind:"info",thumbArgs:{accent:"#1a73e8",soft:"#eef4ff"},markdown:`::: info 说明 variant=accent-bar
正文内容
:::
`},{presetId:"ad-danger-accent-bar",name:"差异皮肤 Danger",description:"顶 8px 实条 + 全边框零圆角，硬紧迫",admonitionKind:"danger",thumbArgs:{accent:"#b42318",soft:"#fdecea"},markdown:`::: danger 警告 variant=accent-bar
正文内容
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.colors.bg,r=e.tokens.radius.sm,o=Math.max(10,Math.round(e.tokens.spacing.containerPadding*.75)),s=e.tokens.spacing.containerPadding;return Ix(t,n,i,o,s,r)}};function Rx(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="20" width="63" height="45" rx="4" fill="${n}" stroke="${t}" stroke-width="1"/><rect x="14" y="14" width="28" height="14" rx="7" fill="${t}"/><rect x="14" y="38" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="46" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="54" width="32" height="2" fill="#c0c6cf"/>`)}const Mx={meta:{id:"pill-tag",kind:"admonition",name:"悬浮胶囊",description:"顶部胶囊标签 + 外框，文字有视觉重心"},thumbnail:Rx,snippets:[{presetId:"ad-tip-pill-tag",name:"悬浮胶囊 Tip",description:"顶部胶囊标签，文字有视觉重心",admonitionKind:"tip",thumbArgs:{accent:"#1a8450",soft:"#eef7f0"},markdown:`::: tip 核心提示 variant=pill-tag
正文内容
:::
`},{presetId:"ad-info-pill-tag",name:"悬浮胶囊 Info",description:"浅底 + 深色描边，告示板感",admonitionKind:"info",thumbArgs:{accent:"#1a73e8",soft:"#eef4ff"},markdown:`::: info 背景说明 variant=pill-tag
正文内容
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${n.soft};border:1px solid ${n.accent};padding:${i+8}px ${r}px ${i}px;border-radius:6px;margin:24px 0 16px`,titleCSS:`display:inline-block;padding:3px 12px;background-color:${n.accent};color:${e.tokens.colors.textInverse};border-radius:12px;font-size:13px;font-weight:700;margin-top:-${i+18}px;margin-bottom:10px;letter-spacing:0.4px`}}};function Ox(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="8" y="14" width="59" height="47" fill="${n}" stroke="${t}" stroke-width="1" stroke-dasharray="3 2"/><rect x="8" y="14" width="2" height="47" fill="${t}"/><rect x="65" y="14" width="2" height="47" fill="${t}"/><circle cx="28" cy="22" r="1.4" fill="${t}"/><circle cx="37" cy="22" r="1.4" fill="${t}"/><circle cx="46" cy="22" r="1.4" fill="${t}"/><rect x="17" y="36" width="41" height="2" fill="#c0c6cf"/><rect x="17" y="44" width="35" height="2" fill="#c0c6cf"/>`)}function Kr(e){return`<svg viewBox="0 0 8 8" width="8" height="8" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin:0 6px"><circle cx="4" cy="4" r="3" fill="${e}"/></svg>`}const Nx={meta:{id:"ticket-notch",kind:"admonition",name:"票根",description:"虚线撕口 + 三圆点，票据质感"},thumbnail:Ox,snippets:[{presetId:"ad-warning-ticket-notch",name:"票根 Warning",description:"虚线撕口 + 三圆点，票据质感",admonitionKind:"warning",thumbArgs:{accent:"#b7791f",soft:"#fdf6e3"},markdown:`::: warning 注意事项 variant=ticket-notch
正文内容
:::
`},{presetId:"ad-danger-ticket-notch",name:"票根 Danger",description:"强警示场景的票据式呈现",admonitionKind:"danger",thumbArgs:{accent:"#b42318",soft:"#fdecea"},markdown:`::: danger 警告 variant=ticket-notch
正文内容
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${n.soft};border:1px dashed ${n.accent};border-left:2px dotted ${n.accent};border-right:2px dotted ${n.accent};padding:${i}px ${i+4}px;margin:18px 0;border-radius:3px`,titleCSS:`color:${n.accent};font-weight:700;letter-spacing:1px;text-transform:uppercase;font-size:14px;margin-bottom:8px`,svgSlot:`<section style="text-align:center;margin-bottom:4px">${Kr(n.accent)}${Kr(n.accent)}${Kr(n.accent)}</section>`}}};function Bx(e){const{accent:t}=Te(e??{});return ue(`<rect x="8" y="16" width="59" height="47" rx="4" fill="#fafafa"/><rect x="8" y="16" width="59" height="2" fill="${t}"/><rect x="8" y="63" width="59" height="2" fill="rgba(0,0,0,0.08)"/><rect x="16" y="26" width="30" height="3" fill="${t}"/><rect x="16" y="36" width="42" height="2" fill="#c0c6cf"/><rect x="16" y="44" width="36" height="2" fill="#c0c6cf"/>`)}const Px={meta:{id:"card-shadow",kind:"admonition",name:"悬浮卡",description:"白底 + 顶部色条 + 单层柔和阴影"},thumbnail:Bx,snippets:[{presetId:"ad-info-card-shadow",name:"悬浮卡 Info",description:"白底 + 顶部色条 + 柔阴影",admonitionKind:"info",thumbArgs:{accent:"#1a73e8"},markdown:`::: info 提示 variant=card-shadow
正文内容
:::
`},{presetId:"ad-tip-card-shadow",name:"悬浮卡 Tip",description:"卡片化，适合重点提示",admonitionKind:"tip",thumbArgs:{accent:"#1a8450"},markdown:`::: tip 核心观点 variant=card-shadow
正文内容
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${e.tokens.colors.bg};border-top:2px solid ${n.accent};padding:${i}px;margin:18px 0;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.06)`,titleCSS:`font-weight:700;color:${n.accent};margin-bottom:8px;font-size:15px`}}};function Dx(e){const{accent:t}=Te(e??{});return ue(`<rect x="14" y="20" width="24" height="3" fill="${t}"/><rect x="14" y="26" width="2" height="30" fill="${t}"/><rect x="20" y="32" width="40" height="2" fill="#c0c6cf"/><rect x="20" y="40" width="34" height="2" fill="#c0c6cf"/><rect x="20" y="48" width="28" height="2" fill="#c0c6cf"/>`)}const zx={meta:{id:"minimal-underline",kind:"admonition",name:"极简",description:"无底色仅标题下划线，省视觉预算"},thumbnail:Dx,snippets:[{presetId:"ad-tip-minimal",name:"极简 Tip",description:"无底色，仅标题下划线，省视觉预算",admonitionKind:"tip",thumbArgs:{accent:"#1a8450"},markdown:`::: tip 小提醒 variant=minimal-underline
正文内容
:::
`},{presetId:"ad-info-minimal",name:"极简 Info",description:"配合大量提示密集使用",admonitionKind:"info",thumbArgs:{accent:"#1a73e8"},markdown:`::: info 说明 variant=minimal-underline
正文内容
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t];return{wrapperCSS:`padding:4px 0 4px 12px;margin:14px 0;border-left:2px solid ${n.accent}`,titleCSS:`display:inline-block;font-size:14px;color:${n.accent};font-weight:700;padding-bottom:2px;border-bottom:1px solid ${n.accent};margin-bottom:8px;letter-spacing:0.5px`}}},Wx=/([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g;function Hx(e){const t={};let n=e;return n=n.replace(Wx,(r,o,s,a,c,l)=>(t[o]=a??c??l??"","")),{title:n.replace(/\s+/g," ").trim(),attrs:t}}function bo(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ve(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function jx(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}function Fx(){return ue('<rect x="6" y="14" width="63" height="47" rx="4" fill="#1f2937"/><rect x="6" y="14" width="63" height="11" fill="#2d3748"/><circle cx="12" cy="20" r="1.8" fill="#ff5f56"/><circle cx="18" cy="20" r="1.8" fill="#ffbd2e"/><circle cx="24" cy="20" r="1.8" fill="#27c93f"/><rect x="12" y="34" width="36" height="2" fill="#9ca3af"/><rect x="12" y="42" width="46" height="2" fill="#9ca3af"/><rect x="12" y="50" width="28" height="2" fill="#9ca3af"/>')}const Kx='<svg viewBox="0 0 54 14" width="42" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:10px"><circle cx="7" cy="7" r="5" fill="#ff5f56"/><circle cx="22" cy="7" r="5" fill="#ffbd2e"/><circle cx="37" cy="7" r="5" fill="#27c93f"/></svg>',qx={tip:"tip",warning:"warning",info:"info",danger:"error"},Ux={meta:{id:"terminal",kind:"admonition",name:"终端窗口",description:"黑底 + 三色圆点，代码讲解专用",themeCompat:["tech-geek","default"]},thumbnail:Fx,snippets:[{presetId:"ad-tip-terminal",name:"终端 Tip",description:"黑底 + 三色圆点，代码讲解专用",admonitionKind:"tip",themeCompat:["tech-geek","default"],markdown:`::: tip $ 执行这行 variant=terminal
内容会渲染成终端风格
:::
`},{presetId:"ad-info-terminal",name:"终端 Info",description:"命令日志类信息",admonitionKind:"info",themeCompat:["tech-geek"],markdown:`::: info $ deploy.sh variant=terminal
2026-04-19 success
:::
`}],render:(e,{kind:t})=>{const n=e.info.trim()||qx[t]||t;return{wrapperCSS:"background-color:#1f2937;padding:0;margin:18px 0;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.18)",titleCSS:"",bodyCSS:"color:#e5e7eb;padding:14px 16px;font-size:14px;line-height:1.7;border-radius:0 0 6px 6px",svgSlot:'<section style="background-color:#2d3748;padding:8px 14px;border-bottom:1px solid #111827;border-radius:6px 6px 0 0;color:#e5e7eb;font-weight:600;font-size:13px;letter-spacing:0.4px">'+Kx+ve(n)+"</section>"}}};function Vx(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" rx="3" fill="${n}"/><line x1="7" y1="15" x2="7" y2="60" stroke="${t}" stroke-width="2" stroke-dasharray="3 2"/><rect x="16" y="22" width="30" height="3" fill="${t}"/><rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="16" y="39" width="40" height="2" fill="#c0c6cf"/><rect x="16" y="46" width="32" height="2" fill="#c0c6cf"/>`)}const Gx={meta:{id:"dashed-border",kind:"admonition",name:"虚线框",description:'左 2px 虚线 + 浅底，工程写作"附注"感',themeCompat:["tech-geek"]},thumbnail:Vx,snippets:[{presetId:"ad-tip-dashed-border",name:"虚线框 Tip",description:'左 2px 虚线 + 浅底，工程写作"附注"感',admonitionKind:"tip",thumbArgs:{accent:"#a8c08a",soft:"#1e1f16"},markdown:`::: tip // NOTE variant=dashed-border
这是一条工程附注。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.radius.sm,r=Math.max(10,Math.round(e.tokens.spacing.containerPadding*.75)),o=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${n.soft};border-left:2px dashed ${n.accent};padding:${r}px ${o}px;border-radius:0 ${i}px ${i}px 0;margin:16px 0`,titleCSS:`font-size:14px;font-weight:600;color:${n.accent};margin-bottom:6px;letter-spacing:1px`}}};function Yx(e){const{accent:t}=Te(e??{});return ue(`<rect x="5" y="14" width="2" height="47" fill="${t}"/><rect x="9" y="14" width="2" height="47" fill="${t}"/><rect x="18" y="22" width="30" height="3" fill="${t}"/><rect x="18" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="18" y="39" width="40" height="2" fill="#c0c6cf"/><rect x="18" y="46" width="32" height="2" fill="#c0c6cf"/>`)}const Zx={meta:{id:"double-border",kind:"admonition",name:"双线框",description:'左 4px 双线 + 透明底，"交叉引用"manpage 风',themeCompat:["tech-geek"]},thumbnail:Yx,snippets:[{presetId:"ad-info-double-border",name:"双线框 Info",description:'左 4px 双线 + 透明底，"交叉引用"manpage 风',admonitionKind:"info",thumbArgs:{accent:"#7a9cb8"},markdown:`::: info // REF §2.3 variant=double-border
参见另一节。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=Math.max(10,Math.round(e.tokens.spacing.containerPadding*.75)),r=e.tokens.spacing.containerPadding;return{wrapperCSS:`border-left:4px double ${n.accent};padding:${i}px ${r}px;margin:16px 0`,titleCSS:`font-size:14px;font-weight:600;color:${n.accent};margin-bottom:6px;letter-spacing:1px`}}};function Xx(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="16" width="63" height="43" fill="${n}"/><rect x="6" y="16" width="63" height="1.5" fill="${t}"/><rect x="6" y="57.5" width="63" height="1.5" fill="${t}"/><rect x="14" y="24" width="30" height="3" fill="${t}"/><rect x="14" y="34" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="42" width="38" height="2" fill="#c0c6cf"/><rect x="14" y="50" width="32" height="2" fill="#c0c6cf"/>`)}const Jx={meta:{id:"top-bottom-rule",kind:"admonition",name:"上下线",description:"顶底 1px 实线，像报纸 errata 勘误条",themeCompat:["tech-geek"]},thumbnail:Xx,snippets:[{presetId:"ad-danger-top-bottom-rule",name:"上下线 Danger",description:"顶底 1px 实线，像报纸 errata 勘误条",admonitionKind:"danger",thumbArgs:{accent:"#c85a3a",soft:"#1f1612"},markdown:`::: danger // PITFALL variant=top-bottom-rule
这是一个典型陷阱。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${n.soft};border-top:1px solid ${n.accent};border-bottom:1px solid ${n.accent};padding:14px ${i}px;margin:18px 0`,titleCSS:`font-size:14px;font-weight:600;color:${n.accent};margin-bottom:8px;letter-spacing:1.2px`}}},Qx={tip:"NOTE",warning:"CAVEAT",info:"SEE ALSO",danger:"PITFALL"};function e2(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="4" y="14" width="67" height="47" fill="${n}"/><rect x="4" y="14" width="67" height="1.5" fill="${t}"/><rect x="4" y="59.5" width="67" height="1.5" fill="${t}"/><rect x="4" y="20" width="67" height="9" fill="#0a0807"/><rect x="10" y="23" width="18" height="3" fill="${t}"/><rect x="10" y="36" width="48" height="2" fill="#c0c6cf"/><rect x="10" y="43" width="42" height="2" fill="#c0c6cf"/><rect x="10" y="50" width="36" height="2" fill="#c0c6cf"/>`)}const t2={meta:{id:"manpage-log",kind:"admonition",name:"manpage 输出",description:"顶底分隔线 + 状态标签条，终端日志输出感",themeCompat:["tech-geek"]},thumbnail:e2,snippets:[{presetId:"ad-tip-manpage-log",name:"manpage NOTE",description:"工程附注，日志输出块",admonitionKind:"tip",thumbArgs:{accent:"#a8c08a",soft:"#1e1f16"},markdown:`::: tip 这是一条工程附注 variant=manpage-log
正文会以日志输出的形式贴在状态条下方。
:::
`},{presetId:"ad-warning-manpage-log",name:"manpage CAVEAT",description:"告诫，橙色状态条",admonitionKind:"warning",thumbArgs:{accent:"#e06a28",soft:"#1e1a14"},markdown:`::: warning 这行会改全局状态 variant=manpage-log
谨慎使用。
:::
`},{presetId:"ad-danger-manpage-log",name:"manpage PITFALL",description:"典型陷阱",admonitionKind:"danger",thumbArgs:{accent:"#c85a3a",soft:"#1f1612"},markdown:`::: danger 典型陷阱 variant=manpage-log
某个 edge case 下会炸栈。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=Qx[t]??t.toUpperCase(),o=e.info.trim(),s=`<section style="background-color:${e.tokens.colors.bg};padding:6px ${i}px;color:${n.accent};font-size:13px;font-weight:600;letter-spacing:2px;border-bottom:1px solid ${e.tokens.colors.border}">:: ${ve(r)} ::`+(o?`<span style="color:${e.tokens.colors.textMuted};font-weight:500;letter-spacing:0.6px;margin-left:10px;text-transform:none">`+ve(o)+"</span>":"")+"</section>";return{wrapperCSS:`background-color:${n.soft};border-top:1px solid ${n.accent};border-bottom:1px solid ${n.accent};padding:0;margin:20px 0;border-radius:0;box-shadow:inset -14px 0 10px -10px rgba(0,0,0,0.35)`,titleCSS:"",bodyCSS:`color:${e.tokens.colors.text};padding:12px ${i}px 14px;font-size:14px;line-height:1.8;letter-spacing:0.6px`,svgSlot:s}}},n2={tip:"DEFINITION",warning:"REMARK",info:"LEMMA",danger:"CAVEAT"};function i2(e){const{accent:t}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" fill="none" stroke="${t}" stroke-width="1"/><rect x="12" y="20" width="34" height="3" fill="${t}"/><rect x="12" y="30" width="46" height="2" fill="#c0c6cf"/><rect x="12" y="37" width="40" height="2" fill="#c0c6cf"/><rect x="12" y="44" width="44" height="2" fill="#c0c6cf"/><rect x="12" y="51" width="36" height="2" fill="#c0c6cf"/>`)}const r2={meta:{id:"sidenote-latex",kind:"admonition",name:"LaTeX 旁注",description:"细边框 + 小型大写标题，LaTeX 定理框语汇",themeCompat:["academic-frontier"]},thumbnail:i2,snippets:[{presetId:"ad-tip-sidenote-latex",name:"旁注 Definition",description:"\\begin{definition} 风格",admonitionKind:"tip",thumbArgs:{accent:"#1e2c4a",soft:"#f3f4f7"},markdown:`::: tip 最小生成树 variant=sidenote-latex
连通图中权和最小的生成子树。
:::
`},{presetId:"ad-info-sidenote-latex",name:"旁注 Lemma",description:"\\begin{lemma} 风格",admonitionKind:"info",thumbArgs:{accent:"#4a5670",soft:"#f1f2f4"},markdown:`::: info 引理 variant=sidenote-latex
若 A 则 B。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=n2[t]??t.toUpperCase(),o=e.info.trim(),s=`<section style="padding:10px ${i}px 0;font-size:13px;color:${n.accent};letter-spacing:2px;font-weight:700;text-transform:uppercase;line-height:1.6">`+ve(r)+"."+(o?`<span style="color:${e.tokens.colors.text};text-transform:none;letter-spacing:0.3px;font-weight:600;margin-left:10px">`+ve(o)+"</span>":"")+"</section>";return{wrapperCSS:`border:1px solid ${n.accent};padding:0 0 10px;margin:18px 0;border-radius:0;background-color:transparent`,titleCSS:"",bodyCSS:`padding:6px ${i}px 0;color:${e.tokens.colors.text};font-size:14px;line-height:1.75`,svgSlot:s}}},o2={tip:"按",warning:"疑",info:"注",danger:"辨"},s2={tip:"按语",warning:"存疑",info:"注释",danger:"辨误"};function a2(e){const{accent:t}=Te(e??{});return ue(`<rect x="10" y="20" width="3" height="12" fill="${t}"/><rect x="10" y="20" width="14" height="3" fill="${t}"/><rect x="21" y="20" width="3" height="12" fill="${t}"/><rect x="10" y="29" width="14" height="3" fill="${t}"/><rect x="28" y="22" width="20" height="3" fill="${t}"/><rect x="10" y="40" width="54" height="2" fill="#c0c6cf"/><rect x="10" y="47" width="46" height="2" fill="#c0c6cf"/><rect x="10" y="54" width="50" height="2" fill="#c0c6cf"/>`)}const c2={meta:{id:"marginalia",kind:"admonition",name:"书页批注",description:"无框、墨色一色；靠【按】【疑】【注】【辨】符号区分类型",themeCompat:["literary-humanism"]},thumbnail:a2,snippets:[{presetId:"ad-tip-marginalia",name:"批注【按】",description:"按语体—作者点评延伸",admonitionKind:"tip",thumbArgs:{accent:"#4a4a42"},markdown:`::: tip 此处另有一解 variant=marginalia
顾千里批云：此说出于误读，当另辨之。
:::
`},{presetId:"ad-info-marginalia",name:"批注【注】",description:"注释体—背景出处",admonitionKind:"info",thumbArgs:{accent:"#4a4a42"},markdown:`::: info 原文出处 variant=marginalia
语见《庄子·秋水》，郭象注。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.secondary,i=e.tokens.colors.textMuted,r=o2[t]??"按",o=e.info.trim()||s2[t]||"",s=`<section style="color:${n};font-size:15px;line-height:1.7;margin-bottom:4px;letter-spacing:1px;font-weight:600">【${ve(r)}】<span style="color:${i};font-weight:500;letter-spacing:0.6px;margin-left:6px">`+ve(o)+"</span></section>";return{wrapperCSS:"background-color:transparent;padding:4px 0 4px 28px;margin:16px 0;border:none;border-radius:0",titleCSS:"",bodyCSS:`color:${i};font-size:14px;line-height:1.8;letter-spacing:0.4px`,svgSlot:s}}},l2={tip:"要点 · KEY",warning:"风险 · RISK",info:"披露 · DISCLOSURE",danger:"异常 · ALERT"};function d2(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="5" y="14" width="65" height="47" fill="${n}" stroke="${t}" stroke-width="1"/><rect x="5" y="14" width="65" height="11" fill="${t}"/><rect x="11" y="18" width="24" height="3" fill="#fefefe"/><rect x="44" y="18" width="20" height="3" fill="#fefefe"/><rect x="11" y="32" width="52" height="2" fill="#4a5a6a"/><rect x="11" y="39" width="44" height="2" fill="#4a5a6a"/><rect x="11" y="46" width="50" height="2" fill="#4a5a6a"/><rect x="11" y="53" width="38" height="2" fill="#4a5a6a"/>`)}const p2={meta:{id:"ledger-cell",kind:"admonition",name:"账本单元",description:"深色表头条 + 硬边框，Bloomberg Terminal 数据感",themeCompat:["business-finance"]},thumbnail:d2,snippets:[{presetId:"ad-tip-ledger-cell",name:"账本 · 要点",description:"研究所 KEY 行",admonitionKind:"tip",thumbArgs:{accent:"#1f4f6b",soft:"#dfe8ee"},markdown:`::: tip Q3 净利同比 +18% variant=ledger-cell
主要由高端机型 ASP 抬升驱动。
:::
`},{presetId:"ad-warning-ledger-cell",name:"账本 · 风险",description:"研究所 RISK 行",admonitionKind:"warning",thumbArgs:{accent:"#8a6416",soft:"#f1e8d1"},markdown:`::: warning 供应链集中度 variant=ledger-cell
前五大供应商占比超 60%。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=l2[t]??t.toUpperCase(),o=e.info.trim(),s=`<section style="background-color:${n.accent};color:${e.tokens.colors.textInverse};padding:6px ${i}px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;line-height:1.4">`+ve(r)+(o?'<span style="margin-left:10px;letter-spacing:0.4px;text-transform:none;font-weight:600;opacity:0.92">· '+ve(o)+"</span>":"")+"</section>";return{wrapperCSS:`background-color:${n.soft};border:1px solid ${n.accent};padding:0;margin:20px 0;border-radius:0`,titleCSS:"",bodyCSS:`color:${e.tokens.colors.text};padding:10px ${i}px 12px;font-size:14px;line-height:1.7;letter-spacing:0.3px`,svgSlot:s}}};function f2(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" rx="14" fill="${n}"/><rect x="9" y="20" width="3" height="36" rx="1.5" fill="${t}"/><circle cx="18" cy="24" r="2.4" fill="${t}"/><rect x="24" y="22" width="22" height="3" rx="1" fill="${t}"/><rect x="16" y="34" width="44" height="2" rx="1" fill="#c0c6cf"/><rect x="16" y="42" width="38" height="2" rx="1" fill="#c0c6cf"/><rect x="16" y="50" width="30" height="2" rx="1" fill="#c0c6cf"/>`)}const u2={meta:{id:"bubble-organic",kind:"admonition",name:"有机气泡",description:"大圆角 + 软阴影侧边，手绘信笺气质",themeCompat:["life-aesthetic"]},thumbnail:f2,snippets:[{presetId:"ad-tip-bubble-organic",name:"气泡 · 心得",description:"圆角柔暖，生活笔记口吻",admonitionKind:"tip",thumbArgs:{accent:"#7ba05b",soft:"#eef3e4"},markdown:`::: tip 今日小发现 variant=bubble-organic
换用陶壶冲茶，水温下降更慢。
:::
`},{presetId:"ad-info-bubble-organic",name:"气泡 · 拾遗",description:"补注 / 参考",admonitionKind:"info",thumbArgs:{accent:"#5b88a8",soft:"#e6edf3"},markdown:`::: info 配乐推荐 variant=bubble-organic
坂本龙一·Async。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding+2,r=Math.max(14,e.tokens.spacing.containerPadding);return{wrapperCSS:`background-color:${n.soft};padding:${r}px ${i}px;margin:20px 0;border-radius:18px;box-shadow:inset 4px 0 0 ${n.accent}, 0 4px 14px rgba(0,0,0,0.05)`,titleCSS:`font-size:15px;font-weight:700;color:${n.accent};margin-bottom:8px;letter-spacing:0.4px`}}},h2={tip:"采访手记",warning:"背景",info:"资料",danger:"存疑"};function g2(e){const{accent:t}=Te(e??{});return ue(`<rect x="8" y="22" width="59" height="1.5" fill="${t}"/><rect x="8" y="55" width="59" height="1.5" fill="${t}"/><rect x="20" y="17" width="26" height="11" fill="#fefefe"/><rect x="24" y="21" width="18" height="3" fill="${t}"/><rect x="12" y="34" width="52" height="2" fill="#c0c6cf"/><rect x="12" y="41" width="46" height="2" fill="#c0c6cf"/><rect x="12" y="48" width="48" height="2" fill="#c0c6cf"/>`)}const m2={meta:{id:"magazine-pull",kind:"admonition",name:"杂志拉引框",description:"上下细线 + 浮空小字标签，《人物》特稿气质",themeCompat:["people-story"]},thumbnail:g2,snippets:[{presetId:"ad-tip-magazine-pull",name:"拉引 · 采访手记",description:"记者第一人称旁白",admonitionKind:"tip",thumbArgs:{accent:"#4a6a7a"},markdown:`::: tip 采访手记 variant=magazine-pull
他在说这句话的时候下意识摸了摸左手腕——那里曾戴过一块表。
:::
`},{presetId:"ad-info-magazine-pull",name:"拉引 · 背景",description:"新闻背景/资料补充",admonitionKind:"info",thumbArgs:{accent:"#556170"},markdown:`::: info 背景 variant=magazine-pull
这家公司在 2019 年曾申请破产重整。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=e.info.trim()||h2[t]||"",o=e.tokens.colors.bg,s=r?`<section style="text-align:left"><span style="display:inline-block;margin-top:-9px;margin-left:${i}px;padding:0 10px;background-color:${o};color:${n.accent};font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;line-height:1.5">`+ve(r)+"</span></section>":"";return{wrapperCSS:`background-color:transparent;border-top:1px solid ${n.accent};border-bottom:1px solid ${n.accent};padding:0 0 14px;margin:24px 0;border-radius:0`,titleCSS:"",bodyCSS:`color:${e.tokens.colors.text};padding:14px ${i}px 0;font-size:15px;line-height:1.9;letter-spacing:0.3px`,svgSlot:s}}},b2={tip:"要点",warning:"风险",info:"背景",danger:"警示"};function x2(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" fill="${n}"/><rect x="6" y="14" width="63" height="3" fill="${t}"/><rect x="6" y="59" width="63" height="1.5" fill="${t}"/><rect x="12" y="22" width="22" height="10" fill="${t}"/><rect x="15" y="25" width="16" height="3" fill="#fefefe"/><rect x="12" y="38" width="52" height="2" fill="#c0c6cf"/><rect x="12" y="45" width="44" height="2" fill="#c0c6cf"/><rect x="12" y="52" width="48" height="2" fill="#c0c6cf"/>`)}const y2={meta:{id:"report-section",kind:"admonition",name:"报告条款",description:"顶 3px 底 1px + § 方角标签，内参报告条款感",themeCompat:["industry-observer"]},thumbnail:x2,snippets:[{presetId:"ad-tip-report-section",name:"报告 · 要点",description:"analyst §01 · KEY POINT",admonitionKind:"tip",thumbArgs:{accent:"#2d6a5a",soft:"#dceae4"},markdown:`::: tip Q3 关键指标 variant=report-section
净利同比 +18%，驱动来自 ASP。
:::
`},{presetId:"ad-warning-report-section",name:"报告 · 风险",description:"analyst §02 · RISK",admonitionKind:"warning",thumbArgs:{accent:"#8a5a1a",soft:"#ece0c5"},markdown:`::: warning 需要警惕 variant=report-section
供应链集中度过高。
:::
`}],render:(e,{kind:t})=>{const n=e.tokens.colors.status[t],i=e.tokens.spacing.containerPadding,r=b2[t]??t,o=e.info.trim(),s=`<span style="display:inline-block;background-color:${n.accent};color:${e.tokens.colors.textInverse};padding:3px 10px;font-size:12px;font-weight:700;letter-spacing:2px;border-radius:0;line-height:1.4">§ ${ve(r)}</span>`,a=`<section style="padding:10px ${i}px 0;line-height:1.5">`+s+(o?`<span style="margin-left:10px;color:${e.tokens.colors.text};font-size:14px;font-weight:600;letter-spacing:0.3px">`+ve(o)+"</span>":"")+"</section>";return{wrapperCSS:`background-color:${n.soft};border-top:3px solid ${n.accent};border-bottom:1px solid ${n.accent};padding:0 0 12px;margin:20px 0;border-radius:0`,titleCSS:"",bodyCSS:`color:${e.tokens.colors.text};padding:8px ${i}px 0;font-size:14px;line-height:1.75;letter-spacing:0.3px`,svgSlot:a}}},v2=[Lx,Mx,Nx,Px,zx,Ux,Gx,Zx,Jx,t2,r2,c2,p2,u2,m2,y2],w2='<span style="display:inline-block;font-size:28px;line-height:1;opacity:0.35;margin-right:4px">「</span>';function k2(e){const{accent:t,soft:n}=Te(e??{});return ue(`<rect x="6" y="14" width="63" height="47" rx="5" fill="${n}"/><text x="14" y="35" font-size="22" fill="${t}" opacity="0.4">&#8220;</text><rect x="16" y="40" width="42" height="2" fill="#c0c6cf"/><rect x="16" y="48" width="34" height="2" fill="#c0c6cf"/>`)}const _2={meta:{id:"classic",kind:"quote",name:"大引号金句",description:"浅底 + 装饰引号，居中大号"},thumbnail:k2,snippets:[{presetId:"q-classic",name:"大引号金句",description:"浅底 + 装饰引号，居中大号",markdown:`::: quote-card 作者名
此处填写金句正文
:::
`},{presetId:"q-classic-no-byline",name:"无署名金句",description:"纯金句不署名",markdown:`::: quote-card
此处填写金句正文
:::
`}],render:e=>{const t=e.assets.quoteMark??w2,n=e.tokens.spacing.containerPadding;return{wrapperCSS:`background-color:${e.tokens.colors.bgSoft};padding:${n+2}px ${n}px;margin:20px 0;border-radius:8px`,bodyCSS:"font-size:16px;line-height:1.7;text-align:center",svgSlot:t}}},S2='<span style="display:inline-block;font-size:48px;line-height:1;color:inherit;opacity:0.25;margin-right:8px;font-style:italic">&ldquo;</span>';function $2(e){const{accent:t}=Te(e??{});return ue(`<rect x="8" y="16" width="59" height="2" fill="${t}"/><rect x="8" y="20" width="59" height="2" fill="${t}"/><rect x="8" y="58" width="59" height="2" fill="${t}"/><rect x="8" y="62" width="59" height="2" fill="${t}"/><text x="16" y="42" font-size="20" font-style="italic" fill="${t}" opacity="0.3">A</text><rect x="28" y="32" width="32" height="2" fill="#c0c6cf"/><rect x="28" y="40" width="26" height="2" fill="#c0c6cf"/><rect x="28" y="48" width="30" height="2" fill="#c0c6cf"/>`)}const E2={meta:{id:"magazine-dropcap",kind:"quote",name:"杂志风金句",description:"上下双粗线 + 大号斜体引号",themeCompat:["literary-humanism"]},thumbnail:$2,snippets:[{presetId:"q-magazine",name:"杂志风金句",description:"上下双粗线 + 大号斜体引号",themeCompat:["literary-humanism"],markdown:`::: quote-card 出处 variant=magazine-dropcap
此处填写金句正文
:::
`},{presetId:"q-magazine-2",name:"杂志风无署名",description:"杂志气质极简版",themeCompat:["literary-humanism"],markdown:`::: quote-card variant=magazine-dropcap
此处填写金句正文
:::
`}],render:e=>{const t=e.tokens.spacing.containerPadding,n=e.tokens.colors.primary;return{wrapperCSS:`background-color:${e.tokens.colors.bg};padding:${t+6}px ${t+2}px;margin:24px 0;border-top:3px double ${n};border-bottom:3px double ${n}`,bodyCSS:`font-size:17px;line-height:1.85;color:${e.tokens.colors.text}`,svgSlot:S2}}};function C2(e){const{accent:t}=Te(e??{});return ue(`<rect x="12" y="18" width="2" height="40" fill="${t}"/><rect x="61" y="18" width="2" height="40" fill="${t}"/><rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/><rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/><rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`)}const A2={meta:{id:"column-rule",kind:"quote",name:"双竖线引用",description:"左右各一根细竖线夹正文"},thumbnail:C2,snippets:[{presetId:"q-column",name:"双竖线引用",description:"左右各一根细竖线夹正文",markdown:`::: quote-card 作者 variant=column-rule
此处填写正文
:::
`},{presetId:"q-column-2",name:"双竖线精简",description:"留白多，正文呼吸感强",markdown:`::: quote-card variant=column-rule
此处填写正文
:::
`}],render:e=>{const t=e.tokens.colors.primary;return{wrapperCSS:`padding:18px 28px;margin:22px 12px;border-left:3px solid ${t};border-right:3px solid ${t}`,bodyCSS:`font-size:16px;line-height:1.85;text-align:center;color:${e.tokens.colors.text}`}}};function T2(e){return`<svg viewBox="0 0 320 120" width="100%" height="120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display:block;margin-bottom:-120px"><path d="M0,20 L0,0 L20,0 M300,0 L320,0 L320,20 M0,100 L0,120 L20,120 M300,120 L320,120 L320,100" stroke="${e}" stroke-width="2" fill="none"/></svg>`}function I2(e){const{accent:t}=Te(e??{});return ue(`<path d="M10,14 L10,10 L16,10 M59,10 L65,10 L65,14 M10,61 L10,65 L16,65 M59,65 L65,65 L65,61" stroke="${t}" stroke-width="1.5" fill="none"/><rect x="22" y="30" width="32" height="2" fill="#c0c6cf"/><rect x="22" y="38" width="30" height="2" fill="#c0c6cf"/><rect x="22" y="46" width="26" height="2" fill="#c0c6cf"/>`)}const L2={meta:{id:"frame-brackets",kind:"quote",name:"四角括号框",description:"四角 L 形装饰，中间全留白"},thumbnail:I2,snippets:[{presetId:"q-brackets",name:"四角括号框",description:"四角 L 形装饰，中间全留白",markdown:`::: quote-card 作者 variant=frame-brackets
此处填写正文
:::
`},{presetId:"q-brackets-2",name:"四角括号无署名",description:"最克制的引用",markdown:`::: quote-card variant=frame-brackets
此处填写正文
:::
`}],render:e=>({wrapperCSS:"padding:26px 22px;margin:22px 0",bodyCSS:`font-size:16px;line-height:1.85;text-align:center;color:${e.tokens.colors.text}`,svgSlot:T2(e.tokens.colors.primary)})},R2=[_2,E2,A2,L2],ya=13,M2=8;function O2(e){const{soft:t}=Te(e??{});return ue(`<rect x="6" y="16" width="29" height="45" rx="3" fill="${t}"/><rect x="40" y="16" width="29" height="45" rx="3" fill="${t}"/><rect x="12" y="22" width="15" height="2" fill="#1a8450"/><rect x="12" y="30" width="18" height="2" fill="#c0c6cf"/><rect x="12" y="36" width="14" height="2" fill="#c0c6cf"/><rect x="46" y="22" width="15" height="2" fill="#b42318"/><rect x="46" y="30" width="18" height="2" fill="#c0c6cf"/><rect x="46" y="36" width="14" height="2" fill="#c0c6cf"/>`)}const N2={meta:{id:"column-card",kind:"compare",name:"两栏卡片对比",description:"等高 table-cell 两栏（默认）"},thumbnail:O2,snippets:[{presetId:"cmp-column-card",name:"两栏卡片对比",description:"等高 table-cell 两栏（默认）",markdown:`:::: compare
::: pros 优点
- 要点 1
- 要点 2
:::
::: cons 缺点
- 要点 1
- 要点 2
:::
::::
`},{presetId:"cmp-column-rich",name:"两栏 + 标题",description:"每栏带自定义标题",markdown:`:::: compare
::: pros 方案 A
适合场景 / 成本 / 时效
:::
::: cons 方案 B
适合场景 / 成本 / 时效
:::
::::
`}],render:(e,{slot:t})=>{if(t==="wrapper")return{wrapperCSS:"display:table;width:100%;table-layout:fixed;border-spacing:4px 0;border-collapse:separate;margin:16px 0"};const n=t==="pros"?e.tokens.colors.status.tip.accent:e.tokens.colors.status.danger.accent;return{wrapperCSS:`display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:${M2}px;background-color:${e.tokens.colors.bgSoft};border-radius:${e.tokens.radius.md}px;font-size:${ya}px;letter-spacing:0`,titleCSS:`font-size:${ya+1}px;font-weight:700;color:${n};margin-bottom:8px;letter-spacing:0;line-height:1.4`}}};function B2(){return ue('<rect x="6" y="14" width="63" height="20" rx="3" fill="#eef7f0"/><rect x="6" y="14" width="3" height="20" fill="#1a8450"/><rect x="14" y="20" width="28" height="2" fill="#1a8450"/><rect x="14" y="26" width="40" height="2" fill="#c0c6cf"/><rect x="6" y="41" width="63" height="20" rx="3" fill="#fdecea"/><rect x="6" y="41" width="3" height="20" fill="#b42318"/><rect x="14" y="47" width="28" height="2" fill="#b42318"/><rect x="14" y="53" width="36" height="2" fill="#c0c6cf"/>')}const P2={meta:{id:"stacked-row",kind:"compare",name:"上下堆叠对比",description:"两行全宽，小屏可读性高"},thumbnail:B2,snippets:[{presetId:"cmp-stacked",name:"上下堆叠对比",description:"两行全宽，小屏可读性高",markdown:`:::: compare variant=stacked-row
::: pros 优点
- 要点 1
- 要点 2
:::
::: cons 缺点
- 要点 1
- 要点 2
:::
::::
`},{presetId:"cmp-stacked-rich",name:"上下堆叠 + 段落",description:"每栏多段正文时推荐",markdown:`:::: compare variant=stacked-row
::: pros 方案 A
一段说明。

- 要点一
- 要点二
:::
::: cons 方案 B
一段说明。

- 要点一
- 要点二
:::
::::
`}],render:(e,{slot:t})=>{if(t==="wrapper")return{wrapperCSS:"margin:16px 0"};const n=t==="pros"?e.tokens.colors.status.tip:e.tokens.colors.status.danger;return{wrapperCSS:`display:block;padding:12px 14px;margin-bottom:8px;background-color:${n.soft};border-left:3px solid ${n.accent};border-radius:0 4px 4px 0`,titleCSS:`font-weight:700;color:${n.accent};margin-bottom:6px;font-size:14px`}}},va=13;function D2(){return ue('<rect x="8" y="16" width="59" height="43" rx="3" fill="#fff" stroke="#c0c6cf"/><rect x="8" y="16" width="30" height="43" fill="#eef7f0"/><rect x="38" y="16" width="29" height="43" fill="#fdecea"/><rect x="14" y="24" width="16" height="2" fill="#1a8450"/><rect x="14" y="32" width="18" height="2" fill="#c0c6cf"/><rect x="44" y="24" width="16" height="2" fill="#b42318"/><rect x="44" y="32" width="18" height="2" fill="#c0c6cf"/>')}const z2={meta:{id:"ledger",kind:"compare",name:"账本双色对比",description:"绿/红双色列，账面感"},thumbnail:D2,snippets:[{presetId:"cmp-ledger",name:"账本双色对比",description:"绿/红双色列，账面感",markdown:`:::: compare variant=ledger
::: pros 优点
- 要点 1
- 要点 2
:::
::: cons 缺点
- 要点 1
- 要点 2
:::
::::
`},{presetId:"cmp-ledger-short",name:"账本精简",description:"单列 ≤3 行场景",markdown:`:::: compare variant=ledger
::: pros 收入
- 订阅
- 广告
:::
::: cons 支出
- 服务器
- 人力
:::
::::
`}],render:(e,{slot:t})=>{if(t==="wrapper")return{wrapperCSS:`display:table;width:100%;table-layout:fixed;border-spacing:0;border-collapse:separate;margin:16px 0;border:1px solid ${e.tokens.colors.border};border-radius:6px`};const n=t==="pros"?e.tokens.colors.status.tip:e.tokens.colors.status.danger,i=t==="pros"?`border-right:1px solid ${e.tokens.colors.border}`:"border-right:0",r=t==="pros"?"border-radius:5px 0 0 5px":"border-radius:0 5px 5px 0";return{wrapperCSS:`display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;padding:12px;background-color:${n.soft};${i};${r};font-size:${va}px;letter-spacing:0`,titleCSS:`font-weight:700;color:${n.accent};margin-bottom:6px;font-size:${va+1}px`}}},W2=[N2,P2,z2],H2=`### 01 第一步
正文说明

### 02 第二步
正文说明

### 03 第三步
正文说明
`;function j2(e){const{accent:t}=Te(e??{});return ue(`<circle cx="14" cy="22" r="5" fill="${t}"/><text x="14" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">1</text><rect x="24" y="21" width="34" height="2" fill="#c0c6cf"/><circle cx="14" cy="42" r="5" fill="${t}"/><text x="14" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">2</text><rect x="24" y="41" width="30" height="2" fill="#c0c6cf"/>`)}const F2={meta:{id:"number-circle",kind:"steps",name:"编号圆圈步骤",description:"h3 手写编号，标题加粗"},thumbnail:j2,snippets:[{presetId:"st-number-circle",name:"编号圆圈步骤",description:"h3 手写编号，标题加粗",markdown:`::: steps 流程
`+H2+`:::
`},{presetId:"st-number-circle-short",name:"两步精简",description:"轻量版双步骤",markdown:`::: steps
### 01 准备
描述

### 02 执行
描述
:::
`}],render:()=>({wrapperCSS:"margin:16px 0",titleCSS:"font-weight:700;margin-bottom:12px"})},wa=`### 01 第一步
正文说明

### 02 第二步
正文说明

### 03 第三步
正文说明
`;function K2(e){const{accent:t}=Te(e??{});return ue(`<rect x="10" y="14" width="3" height="47" fill="${t}"/><rect x="7" y="20" width="22" height="10" rx="5" fill="${t}"/><rect x="7" y="36" width="22" height="10" rx="5" fill="${t}"/><rect x="34" y="24" width="28" height="2" fill="#c0c6cf"/><rect x="34" y="40" width="28" height="2" fill="#c0c6cf"/>`)}const q2={meta:{id:"ribbon-chain",kind:"steps",name:"飘带链式",description:"左侧色条贯穿，胶囊标题"},thumbnail:K2,snippets:[{presetId:"st-ribbon",name:"飘带链式",description:"左侧色条贯穿，胶囊标题",markdown:`::: steps 步骤 variant=ribbon-chain
`+wa+`:::
`},{presetId:"st-ribbon-with-intro",name:"飘带 + 导语",description:"步骤列表前加一段引子",markdown:`::: steps 上线流程 variant=ribbon-chain
先阅读[操作文档](#)，然后：

`+wa+`:::
`}],render:e=>({wrapperCSS:`margin:18px 0;padding:8px 0 8px 18px;border-left:4px solid ${e.tokens.colors.primary}`,titleCSS:`display:inline-block;padding:4px 12px;background-color:${e.tokens.colors.primary};color:${e.tokens.colors.textInverse};border-radius:12px;font-weight:700;font-size:13px;margin:0 0 12px -30px;letter-spacing:0.4px`})},U2=`### 01 第一步
正文说明

### 02 第二步
正文说明

### 03 第三步
正文说明
`;function V2(e){const{accent:t}=Te(e??{});return ue(`<line x1="14" y1="14" x2="14" y2="61" stroke="${t}" stroke-width="2" stroke-dasharray="2 2"/><circle cx="14" cy="22" r="3" fill="${t}"/><circle cx="14" cy="42" r="3" fill="${t}"/><rect x="22" y="21" width="36" height="2" fill="#c0c6cf"/><rect x="22" y="41" width="32" height="2" fill="#c0c6cf"/>`)}const G2={meta:{id:"timeline-dot",kind:"steps",name:"时间轴步骤",description:"左侧点线 + 主色小圆点"},thumbnail:V2,snippets:[{presetId:"st-timeline",name:"时间轴步骤",description:"左侧点线 + 主色小圆点",markdown:`::: steps 变更轨迹 variant=timeline-dot
`+U2+`:::
`},{presetId:"st-timeline-log",name:"时间轴日志",description:"日期 + 事件的日志流",markdown:`::: steps 更新日志 variant=timeline-dot
### 2026-04-01 初版上线
说明

### 2026-04-10 修复若干
说明
:::
`}],render:e=>{const t=`<svg viewBox="0 0 10 10" width="10" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:-16px"><circle cx="5" cy="5" r="4" fill="${e.tokens.colors.primary}"/></svg>`;return{wrapperCSS:`margin:18px 0;padding:4px 0 4px 20px;border-left:2px dotted ${e.tokens.colors.primary}`,titleCSS:`font-weight:700;color:${e.tokens.colors.primary};margin-bottom:10px`,svgSlot:t}}},Y2=[F2,q2,G2],Z2='<svg viewBox="0 0 120 12" width="120" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6" fill="none" stroke="#c0c6cf" stroke-width="1.5"/></svg>';function X2(){return ue('<path d="M4,38 Q12,30 22,38 T40,38 T58,38 T72,38" fill="none" stroke="#c0c6cf" stroke-width="1.5"/>')}const J2={meta:{id:"wave",kind:"divider",name:"波浪线",description:"柔和波形，叙事换场"},thumbnail:X2,snippets:[{presetId:"dv-wave",name:"波浪线",description:"柔和波形，叙事换场",markdown:`::: divider variant=wave
:::
`}],render:e=>({wrapperCSS:"text-align:center;margin:24px 0",svgSlot:e.assets.dividerWave??Z2})},Q2='<svg viewBox="0 0 120 8" width="120" height="8" xmlns="http://www.w3.org/2000/svg">'+[20,40,60,80,100].map(e=>`<circle cx="${e}" cy="4" r="2" fill="#c0c6cf"/>`).join("")+"</svg>";function ey(){return ue([18,30,42,54].map(e=>`<circle cx="${e}" cy="37" r="2" fill="#c0c6cf"/>`).join(""))}const ty={meta:{id:"dots",kind:"divider",name:"点阵",description:"等距 4 点，现代克制"},thumbnail:ey,snippets:[{presetId:"dv-dots",name:"点阵",description:"等距 4 点，现代克制",markdown:`::: divider variant=dots
:::
`}],render:e=>({wrapperCSS:"text-align:center;margin:24px 0",svgSlot:e.assets.dividerDots??Q2})},ny='<svg viewBox="0 0 120 16" width="120" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0,8 L50,8" stroke="#c0c6cf" stroke-width="1"/><path d="M70,8 L120,8" stroke="#c0c6cf" stroke-width="1"/><path d="M60,2 L63,8 L60,14 L57,8 Z" fill="#c0c6cf"/></svg>';function iy(){return ue('<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/><line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/><path d="M37,30 L41,37 L37,44 L33,37 Z" fill="#c0c6cf"/>')}const ry={meta:{id:"flower",kind:"divider",name:"菱形纹章",description:"中央菱形 + 两侧短线"},thumbnail:iy,snippets:[{presetId:"dv-flower",name:"菱形纹章",description:"中央菱形 + 两侧短线",markdown:`::: divider variant=flower
:::
`}],render:e=>({wrapperCSS:"text-align:center;margin:24px 0",svgSlot:e.assets.dividerFlower??ny})};function oy(){return ue('<rect x="6" y="36" width="63" height="1" fill="#c0c6cf"/>')}const sy={meta:{id:"rule",kind:"divider",name:"细线",description:"最克制的 1px 灰线"},thumbnail:oy,snippets:[{presetId:"dv-rule",name:"细线",description:"最克制的 1px 灰线",markdown:`::: divider
:::
`}],render:e=>({wrapperCSS:"margin:24px 0",svgSlot:`<hr style="border:none;height:1px;background-color:${e.tokens.colors.border};margin:0"/>`})};function ay(e){const{accent:t}=Te(e??{});return ue(`<line x1="6" y1="37" x2="28" y2="37" stroke="#c0c6cf"/><line x1="46" y1="37" x2="68" y2="37" stroke="#c0c6cf"/><text x="37" y="42" text-anchor="middle" font-size="11" fill="${t}">&#10086;</text>`)}const cy={meta:{id:"glyph",kind:"divider",name:"单字符装饰",description:"文学气质，换场分隔"},thumbnail:ay,snippets:[{presetId:"dv-glyph-fleuron",name:"Fleuron 花饰",description:"文学气质，换场分隔",markdown:`::: divider variant=glyph
:::
`},{presetId:"dv-glyph-section",name:"Section §",description:"法条/章节感",markdown:`::: divider variant=glyph glyph="§"
:::
`},{presetId:"dv-glyph-diamond",name:"菱形 ◆",description:"现代分隔",markdown:`::: divider variant=glyph glyph="◆"
:::
`}],render:e=>{const t=e.attrs.glyph||"❦",n=e.tokens.colors.primary,i=e.tokens.colors.border;return{wrapperCSS:`text-align:center;margin:26px 0;color:${n};font-size:18px`,svgSlot:`<span style="display:inline-block;width:60px;height:1px;background-color:${i};vertical-align:middle;margin-right:12px"></span><span style="display:inline-block;vertical-align:middle">${t}</span><span style="display:inline-block;width:60px;height:1px;background-color:${i};vertical-align:middle;margin-left:12px"></span>`}}},ly=[J2,ty,ry,sy,cy];function dy(e){const{accent:t}=Te(e??{});return ue(`<rect x="10" y="20" width="30" height="5" fill="${t}"/><rect x="10" y="30" width="55" height="2" fill="${t}"/><rect x="10" y="40" width="40" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`)}const py={meta:{id:"bordered",kind:"sectionTitle",name:"下划线章标题",description:"2px 主色底线 + 角饰（默认）"},thumbnail:dy,snippets:[{presetId:"sec-bordered",name:"下划线章标题",description:"2px 主色底线 + 角饰（默认）",markdown:`::: section-title 第一章
:::
`},{presetId:"sec-bordered-long",name:"下划线 · 长标题",description:"多字章标题下划线节奏",markdown:`::: section-title 第二部分 · 深入骨架
:::
`}],render:e=>({wrapperCSS:`margin:24px 0 12px;padding-bottom:6px;border-bottom:2px solid ${e.tokens.colors.primary}`,titleCSS:`font-weight:700;font-size:20px;color:${e.tokens.colors.text}`,svgSlot:e.assets.sectionCorner??void 0})};function fy(e){const{accent:t}=Te(e??{});return ue(`<path d="M8,8 L26,8 L26,14 L14,14 L14,28 L8,28 Z" fill="${t}"/><rect x="30" y="16" width="35" height="5" fill="${t}"/><rect x="10" y="38" width="55" height="2" fill="#c0c6cf"/><rect x="10" y="48" width="48" height="2" fill="#c0c6cf"/>`)}const uy={meta:{id:"cornered",kind:"sectionTitle",name:"左上角装饰",description:"只留角饰不画线，更克制"},thumbnail:fy,snippets:[{presetId:"sec-cornered",name:"左上角装饰",description:"只留角饰不画线，更克制",markdown:`::: section-title 第三章 variant=cornered
:::
`},{presetId:"sec-cornered-long",name:"角饰 · 长标题",description:"标题长时更显角饰作用",markdown:`::: section-title 第四部分 · 组件库手册 variant=cornered
:::
`}],render:e=>({wrapperCSS:"margin:24px 0 12px",titleCSS:`font-weight:700;font-size:20px;color:${e.tokens.colors.text}`,svgSlot:e.assets.sectionCorner??""})},hy=[py,uy],gy={meta:{id:"bare",kind:"codeBlock",name:"默认代码块",description:"无外框，纯 pre/code"},snippets:[],render:(e,{language:t,codeInnerHtml:n})=>`<pre><code class="${t?`language-${t} hljs`:"hljs"}">${n}</code></pre>`},my={javascript:"JAVASCRIPT",js:"JAVASCRIPT",typescript:"TYPESCRIPT",ts:"TYPESCRIPT",python:"PYTHON",py:"PYTHON",bash:"BASH",sh:"BASH",shell:"BASH",json:"JSON",yaml:"YAML",yml:"YAML",sql:"SQL",html:"HTML",css:"CSS",xml:"XML",markdown:"MARKDOWN",md:"MARKDOWN"};function by(e){return e?my[e.toLowerCase()]??e.toUpperCase():""}function xy(e){const{colors:t,radius:n}=e.tokens,i=["margin:20px 0",`border-radius:${n.md}px`,"overflow:hidden",`border:1px solid ${t.border}`].join(";"),r=[`background-color:${t.bgSoft}`,`color:${t.textMuted}`,"padding:8px 14px","font-size:11px","font-weight:500","letter-spacing:0.5px","line-height:1.4",`border-bottom:1px solid ${t.border}`].join(";");return{wrapper:i,header:r,lang:"text-transform:uppercase",copy:"margin-left:8px;vertical-align:middle"}}const yy={meta:{id:"header-bar",kind:"codeBlock",name:"带头部代码块",description:"顶栏显示语言 + copy 图标"},snippets:[],render:(e,{language:t,codeInnerHtml:n})=>{const i=by(t),{wrapper:r,header:o,lang:s,copy:a}=xy(e),c=e.assets.copyIcon?`<span class="wx-code-block__copy" style="${a}">${e.assets.copyIcon}</span>`:"",l=t?`language-${t} hljs`:"hljs";return[`<section class="wx-code-block wx-code-block--header-bar" style="${r}">`,`<section class="wx-code-block__header" style="${o}">`,`<span class="wx-code-block__lang" style="${s}">${i}</span>`,c,"</section>",`<pre class="wx-code-block__pre" style="margin:0;border-radius:0"><code class="${l}">${n}</code></pre>`,"</section>"].join("")}},vy=[gy,yy];function wy(){return ue('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const ky={meta:{id:"intro",kind:"none",name:"开场导语",description:"文章开头的引子卡，独立视觉"},thumbnail:wy,snippets:[{presetId:"free-intro",name:"开场导语",description:"文章开头的引子卡，独立视觉",markdown:`::: intro
一段用来承载"本文将讨论什么"的导语。
:::
`}]};function _y(){return ue('<rect x="6" y="22" width="63" height="32" rx="4" fill="#f7f8fa"/><circle cx="16" cy="38" r="6" fill="#c0c6cf"/><rect x="28" y="32" width="24" height="3" fill="#1f2328"/><rect x="28" y="40" width="34" height="2" fill="#c0c6cf"/>')}const Sy={meta:{id:"author",kind:"none",name:"作者栏",description:"姓名 + 角色 + 一句话"},thumbnail:_y,snippets:[{presetId:"free-author",name:"作者栏",description:"姓名 + 角色 + 一句话",markdown:`::: author 张三 role=主笔
一段作者自述或背景。
:::
`}]};function $y(){return ue('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const Ey={meta:{id:"cover",kind:"none",name:"封面卡",description:"标题 + 一张图 + 一行描述"},thumbnail:$y,snippets:[{presetId:"free-cover",name:"封面卡",description:"标题 + 一张图 + 一行描述",markdown:`::: cover 本期封面
![封面图](https://placehold.co/1200x630)

_一句描述_
:::
`}]};function Cy(){return ue('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const Ay={meta:{id:"highlight",kind:"none",name:"重点高亮块",description:"整段荧光底色"},thumbnail:Cy,snippets:[{presetId:"free-highlight",name:"重点高亮块",description:"整段荧光底色",markdown:`::: highlight
这一段将被整段高亮，用来压重点。
:::
`}]};function Ty(){return ue('<rect x="6" y="16" width="63" height="43" rx="4" fill="#f7f8fa"/><rect x="20" y="24" width="34" height="3" fill="#1f2328"/><rect x="20" y="32" width="34" height="2" fill="#c0c6cf"/><rect x="26" y="42" width="22" height="10" rx="5" fill="#2d6fdd"/>')}const Iy={meta:{id:"footer-cta",kind:"none",name:"文末 CTA",description:"标题 + 描述 + 按钮胶囊"},thumbnail:Ty,snippets:[{presetId:"free-footer-cta",name:"文末 CTA · 纯视觉",description:"标题 + 描述 + 按钮胶囊（无跳转，适合配二维码使用）",markdown:`::: footer-cta 觉得有用？ cta=点此关注
如果这篇对你有启发，欢迎关注。
:::
`},{presetId:"free-footer-cta-linked",name:"文末 CTA · 阅读原篇",description:"带同域文章链接（mp.weixin.qq.com/s/*），粘贴到公众号可点",markdown:`::: footer-cta 想看完整推演？ cta=阅读原篇 href=https://mp.weixin.qq.com/s/REPLACE_ME
上一期的深度分析，点击继续。
:::
`}]};function Ly(){return ue('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const Ry={meta:{id:"recommend",kind:"none",name:"推荐阅读",description:"列表形式的相关链接"},thumbnail:Ly,snippets:[{presetId:"free-recommend",name:"推荐阅读",description:"列表形式的相关链接",markdown:`::: recommend 推荐阅读
- [文章 A](#)
- [文章 B](#)
:::
`}]};function My(){return ue('<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/><rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/><rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/><rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/><rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>')}const Oy={meta:{id:"qrcode",kind:"none",name:"二维码卡",description:"说明文字 + 一张二维码图"},thumbnail:My,snippets:[{presetId:"free-qrcode",name:"二维码卡",description:"说明文字 + 一张二维码图",markdown:`::: qrcode 扫码关注
![二维码](https://placehold.co/240x240)
:::
`}]};function Ny(){return ue('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const By={meta:{id:"mpvoice",kind:"none",name:"音频占位",description:"<mpvoice> 无法粘贴，此为占位"},thumbnail:Ny,snippets:[{presetId:"free-mpvoice",name:"音频占位",description:"<mpvoice> 无法粘贴，此为占位",markdown:`::: mpvoice 本期播客
粘贴后在公众号后台从素材库重新插入。
:::
`}]};function Py(){return ue('<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/><rect x="14" y="30" width="46" height="2" fill="#856404"/><rect x="14" y="38" width="38" height="2" fill="#856404"/>')}const Dy={meta:{id:"mpvideo",kind:"none",name:"腾讯视频",description:"直接渲染 v.qq.com iframe"},thumbnail:Py,snippets:[{presetId:"free-mpvideo-qq",name:"腾讯视频",description:"直接渲染 v.qq.com iframe",markdown:`::: mpvideo qqvid=v326875u4ek
视频标题
:::
`}]},zy=[ky,Sy,Ey,Ay,Iy,Ry,Oy,By,Dy],Wy=["accent-bar","pill-tag","ticket-notch","card-shadow","minimal-underline","terminal","dashed-border","double-border","top-bottom-rule","manpage-log","sidenote-latex","marginalia","ledger-cell","bubble-organic","magazine-pull","report-section"],Hy=["classic","magazine-dropcap","column-rule","frame-brackets"],jy=["column-card","stacked-row","ledger"],Fy=["number-circle","ribbon-chain","timeline-dot"],Ky=["wave","dots","flower","rule","glyph"],qy=["bordered","cornered"],Uy=["bare","header-bar"],Vy=["intro","author","cover","highlight","footer-cta","recommend","qrcode","mpvoice","mpvideo"],Gy={admonition:Wy,quote:Hy,compare:jy,steps:Fy,divider:Ky,sectionTitle:qy,codeBlock:Uy,none:Vy};function Yy(){return[...v2,...R2,...W2,...Y2,...ly,...hy,...vy,...zy]}function ns(e,t){const n=e.filter(s=>s.meta.kind===t),i=new Map(n.map(s=>[s.meta.id,s])),r=Gy[t],o=[];for(const s of r){const a=i.get(s);a&&(o.push(a),i.delete(s))}for(const s of[...i.keys()].sort())o.push(i.get(s));return o}const dn=Yy();function Zn(e,t){const n={};for(const i of ns(e,t))n[i.meta.id]=i;return n}const xo=Zn(dn,"admonition"),sd=Zn(dn,"quote"),is=Zn(dn,"compare"),ad=Zn(dn,"steps"),cd=Zn(dn,"divider"),ld=Zn(dn,"sectionTitle"),ka=(()=>{const e={};for(const t of ns(dn,"codeBlock"))e[t.meta.id]=t;return e})();function Zy(e,t){const n=e.thumbnail?e.thumbnail(t.thumbArgs):"";return{source:"builtin",id:t.presetId,name:t.name,description:t.description,kind:e.meta.kind,variantId:e.meta.id,themeCompat:t.themeCompat??e.meta.themeCompat,markdownSnippet:t.markdown,thumbnailSvg:n}}function Xy(){const e=[],t=["admonition","quote","compare","steps","divider","sectionTitle","none"];for(const n of t)for(const i of ns(dn,n))for(const r of i.snippets)e.push(Zy(i,r));return e}const Jy=Xy(),Qy=Jy.map(e=>({source:"builtin",id:e.id,name:e.name,description:e.description,kind:e.kind,variantId:e.variantId,themeCompat:e.themeCompat?[...e.themeCompat]:void 0,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg})),ev=[{kind:"admonition",label:"提示"},{kind:"quote",label:"引用"},{kind:"compare",label:"对比"},{kind:"steps",label:"步骤"},{kind:"divider",label:"分隔"},{kind:"sectionTitle",label:"章节"},{kind:"none",label:"其它"},{kind:"user",label:"我的组件"}],dd="wechat-typeset:user-components",tv=()=>Sl("uc");function rs(){const e=kl(dd,[]);return Array.isArray(e)?e.filter(nv).map(t=>({...t,source:"user"})):[]}function pd(e){_l(dd,e)}function nv(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.name=="string"&&typeof t.markdownSnippet=="string"&&typeof t.thumbnailSvg=="string"}function iv(){return[...rs()].sort((e,t)=>t.createdAt-e.createdAt)}function rv(e){const t=rs(),n={source:"user",id:tv(),name:e.name.trim()||"未命名组件",description:e.description?.trim()??"",kind:e.kind??"none",variantId:e.variantId,markdownSnippet:e.markdownSnippet,thumbnailSvg:e.thumbnailSvg??sv(e.name),sourceMarkdown:e.sourceMarkdown,createdAt:Date.now()};return t.unshift(n),pd(t),n}function ov(e){const t=rs().filter(n=>n.id!==e);pd(t)}function sv(e){const t=e.trim().charAt(0)||"组";return`<svg viewBox="0 0 75 75" width="75" height="75" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="75" height="75" rx="6" fill="#eef1f6"/><text x="37.5" y="48" text-anchor="middle" font-size="32" font-weight="700" fill="#6a737d">${jx(t)}</text></svg>`}const av={class:"palette","aria-label":"组件库"},cv={class:"palette-head"},lv={class:"tabs",role:"tablist"},dv=["onClick"],pv={class:"body"},fv={key:0,class:"empty"},uv={key:1,class:"grid"},hv=["title","onClick"],gv=["innerHTML"],mv={class:"name"},bv=["onClick"],xv={class:"modal",role:"dialog","aria-label":"保存选区为组件"},yv={class:"modal-field"},vv=["onKeydown"],wv={key:0,class:"field-error"},kv={class:"modal-field"},_v={class:"preview-src"},Sv={class:"mono"},$v=Je({__name:"ComponentPalette",props:{theme:{}},emits:["insert","close"],setup(e,{expose:t,emit:n}){const i=e,r=n,o=he("template"),s=he(0),a=Ae(()=>(s.value,iv())),c=Ae(()=>{const R={admonition:[],quote:[],compare:[],steps:[],divider:[],sectionTitle:[],codeBlock:[],none:[]};for(const _ of Qy)R[_.kind].push(_);return R}),l=Ae(()=>{const R=i.theme.templates??{};return[{id:"cover",name:"封面卡",md:R.cover,hint:"文首封面"},{id:"authorBar",name:"作者栏",md:R.authorBar,hint:"作者+日期"},{id:"tip",name:"小贴士",md:R.tip,hint:"tip 容器"},{id:"compare",name:"对比两列",md:R.compare,hint:"左右两栏"},{id:"steps",name:"步骤流程",md:R.steps,hint:"分步推进"},{id:"footerCTA",name:"文末引导",md:R.footerCTA,hint:"关注/收藏"},{id:"recommend",name:"推荐阅读",md:R.recommend,hint:"文末链接"}].filter(k=>!!k.md).map(k=>({source:"builtin",id:`tpl-${k.id}`,name:k.name,description:k.hint,kind:"none",markdownSnippet:k.md,thumbnailSvg:d(k.id,i.theme)}))});function d(R,_){const k=_.tokens.colors,B=R==="compare"||R==="steps"?k.secondary:k.primary,w=R.slice(0,1).toUpperCase();return`<svg viewBox="0 0 75 75" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="73" height="73" rx="6" fill="${k.bg}" stroke="${k.border}" stroke-width="1"/>
<rect x="10" y="14" width="55" height="4" rx="2" fill="${B}"/>
<rect x="10" y="24" width="42" height="2.5" rx="1.25" fill="${k.textMuted}" opacity="0.6"/>
<rect x="10" y="31" width="50" height="2.5" rx="1.25" fill="${k.textMuted}" opacity="0.4"/>
<rect x="10" y="38" width="38" height="2.5" rx="1.25" fill="${k.textMuted}" opacity="0.4"/>
<text x="58" y="62" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="${B}" opacity="0.7">${w}</text>
</svg>`}const f=Ae(()=>o.value==="template"?l.value:o.value==="user"?a.value:c.value[o.value]);function u(R){r("insert",R.markdownSnippet)}function b(R,_){_.stopPropagation(),ov(R),s.value+=1}const p=kn({open:!1,name:"",description:"",source:"",error:""});function m(R){R.trim()&&(p.open=!0,p.name="",p.description="",p.source=R,p.error="")}function S(){p.open=!1,p.error=""}function I(){const R=p.name.trim();if(!R){p.error="组件名不能为空";return}rv({name:R,description:p.description,markdownSnippet:z(p.source),sourceMarkdown:p.source,kind:"none"}),p.open=!1,p.error="",s.value+=1,o.value="user"}function z(R){return R.endsWith(`
`)?R:R+`
`}return t({openSaveDialog:m}),(R,_)=>(j(),G("aside",av,[h("header",cv,[_[4]||(_[4]=h("h3",{class:"tx-section"},"插入",-1)),h("button",{class:"btn-text",onClick:_[0]||(_[0]=k=>r("close"))},"关闭")]),h("nav",lv,[h("button",{class:Ie(["tab",{active:o.value==="template"}]),onClick:_[1]||(_[1]=k=>o.value="template")}," 主题模板 ",2),(j(!0),G(_e,null,De(ee(ev),k=>(j(),G("button",{key:k.kind,class:Ie(["tab",{active:o.value===k.kind}]),onClick:B=>o.value=k.kind},Q(k.label),11,dv))),128))]),h("div",pv,[f.value.length===0?(j(),G("div",fv,[o.value==="template"?(j(),G(_e,{key:0},[ft(" 当前主题「"+Q(i.theme.name)+"」暂无预设模板。切换主题或在下方预设里选择。 ",1)],64)):o.value==="user"?(j(),G(_e,{key:1},[_[5]||(_[5]=h("div",{class:"empty-title"},"还没有自创组件",-1)),_[6]||(_[6]=h("div",{class:"empty-hint"}," 在编辑器里选中一段 markdown，用更多菜单里的「保存选区为组件」把它存下来。 ",-1))],64)):(j(),G(_e,{key:2},[ft("本分类暂无预设")],64))])):(j(),G("div",uv,[(j(!0),G(_e,null,De(f.value,k=>(j(),G("button",{key:k.id,class:"cell",title:k.description,onClick:B=>u(k)},[h("span",{class:"thumb",innerHTML:k.thumbnailSvg},null,8,gv),h("span",mv,Q(k.name),1),o.value==="user"?(j(),G("button",{key:0,class:"cell-del",title:"删除",onClick:B=>b(k.id,B)},"×",8,bv)):Se("",!0)],8,hv))),128))]))]),p.open?(j(),G("div",{key:0,class:"modal-mask",onClick:Wt(S,["self"])},[h("div",xv,[_[10]||(_[10]=h("h4",{class:"modal-title"},"保存选区为组件",-1)),h("label",yv,[_[7]||(_[7]=h("span",null,"名称",-1)),Et(h("input",{"onUpdate:modelValue":_[2]||(_[2]=k=>p.name=k),maxlength:"20",placeholder:"如：我的封面卡",class:Ie({invalid:!!p.error}),onKeydown:co(Wt(I,["prevent"]),["enter"])},null,42,vv),[[jt,p.name]]),p.error?(j(),G("span",wv,Q(p.error),1)):Se("",!0)]),h("label",kv,[_[8]||(_[8]=h("span",null,"描述（可选）",-1)),Et(h("input",{"onUpdate:modelValue":_[3]||(_[3]=k=>p.description=k),maxlength:"30",placeholder:"一句话说明"},null,512),[[jt,p.description]])]),h("details",_v,[_[9]||(_[9]=h("summary",null,"选区预览",-1)),h("pre",Sv,Q(p.source),1)]),h("div",{class:"modal-actions"},[h("button",{class:"btn btn-ghost",onClick:S},"取消"),h("button",{class:"btn btn-primary",onClick:I},"保存")])])])):Se("",!0)]))}}),Ev=Qe($v,[["__scopeId","data-v-ae21c3ec"]]),_a=/!\[[^\]]*\]\(([^)\s]+)(?:\s"[^"]*")?\)/g,Sa=/\[[^\]]+\]\((https?:\/\/[^)\s]+)(?:\s"[^"]*")?\)/g,Cv=/^:::\s*author\b/m,Av=/^#{1,6}\s+/,$a=/[\u4e00-\u9fff\u3400-\u4dbf]/g,qr=120,Ur=400,Tv=10,Iv=1024*1024;function Lv(e){const t=[];if(!e||!e.trim())return t.push({id:"empty",status:"fail",label:"正文为空",hint:"请至少写一段内容再发稿。"}),{items:t,pass:!1};const n=Rv(e);n?(t.push({id:"cover-image",status:"pass",label:"已有封面图",hint:n.length>60?n.slice(0,57)+"…":n}),t.push({id:"cover-ratio",status:"info",label:"封面比例",hint:"公众号支持 3.35:1（1200×358）与 1:1（900×900）两档；发稿前在素材库核对。"})):t.push({id:"cover-image",status:"warn",label:"未检测到封面图",hint:"建议在首段前放一张 `![封面](...)` ；公众号列表页会自动取第一张图。"});const r=Mv(e).length;r===0?t.push({id:"abstract-length",status:"warn",label:"未找到摘要段",hint:"建议首段写一段 ≤ 120 字的导语，作为公众号摘要抓取候选。"}):r<=qr?t.push({id:"abstract-length",status:"pass",label:`摘要段 ${r} 字（≤ ${qr}）`}):t.push({id:"abstract-length",status:"warn",label:`摘要段偏长：${r} 字（建议 ≤ ${qr}）`,hint:"公众号列表页预览至多 120 字，过长会被截断。"});const o=Ov(e);t.push({id:"word-count",status:o>=Ur?"pass":"warn",label:`正文 ${o} 字`,hint:o>=Ur?void 0:`短于 ${Ur} 字，公众号"深阅读"率会明显偏低。`});const s=Cv.test(e);t.push({id:"author-declaration",status:s?"pass":"info",label:s?"已声明作者（::: author）":"未声明作者",hint:s?void 0:'原创文章建议加 `::: author` 容器写署名；无此容器也可在公众号后台单独勾选"原创"。'});const a=Nv(e);a===0?t.push({id:"external-links",status:"pass",label:"无站外链接"}):a<=Tv?t.push({id:"external-links",status:"info",label:`站外链接 ${a} 条`,hint:"公众号不支持站外跳转，发文时需在文末二维码长图 / 原文链接里引导。"}):t.push({id:"external-links",status:"warn",label:`站外链接过多：${a} 条`,hint:'建议降级：保留 3-5 条核心链接，其余改为文末"相关阅读"列表。'});const c=Bv(e);return c===0||(c<Iv?t.push({id:"inline-image-size",status:"pass",label:`内联 base64 图片约 ${Ea(c)}`}):t.push({id:"inline-image-size",status:"warn",label:`内联 base64 图片偏大：${Ea(c)}`,hint:"公众号单图上限 10 MB；接近上限前建议改走 CDN provider，减少草稿体积。"})),{items:t,pass:t.every(l=>l.status!=="fail")}}function Rv(e){_a.lastIndex=0;const t=_a.exec(e);return t?t[1]:null}function Mv(e){const t=e.split(/\r?\n/);let n=!1,i=0;const r=[];for(const o of t){const s=o.trimEnd();if(/^```/.test(s)){if(n=!n,r.length>0)break;continue}if(!n){if(/^:{3,}\s*$/.test(s)){i=Math.max(0,i-1);continue}if(/^:{3,}\s+[A-Za-z]/.test(s)){i++;continue}if(!(i>0)){if(!s.trim()){if(r.length>0)break;continue}if(Av.test(s)){if(r.length>0)break;continue}r.push(s)}}}return r.join("").replace(/\s+/g,"")}function Ov(e){const t=(e.match($a)??[]).length,n=e.replace($a," ").split(/\s+/).filter(Boolean).length;return t+n}function Nv(e){Sa.lastIndex=0;let t=0;for(;Sa.exec(e)!==null;)t++;return t}function Bv(e){const t=/data:image\/[a-z+]+;base64,([A-Za-z0-9+/=]+)/g;let n=0,i;for(;(i=t.exec(e))!==null;)n+=Math.floor(i[1].length*3/4);return n}function Ea(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}const Pv={class:"panel"},Dv={class:"panel-head"},zv={class:"panel-section summary"},Wv={class:"summary-text"},Hv={class:"items"},jv={class:"item-body"},Fv={class:"item-label"},Kv={key:0,class:"item-hint"},qv=Je({__name:"PublishChecklist",props:{md:{}},emits:["close"],setup(e,{emit:t}){const n=e,i=t,r=Ae(()=>Lv(n.md)),o={pass:"pass",warn:"warn",fail:"fail",info:"info"};return(s,a)=>(j(),G("div",Pv,[h("header",Dv,[a[1]||(a[1]=h("h3",null,"发文前清单",-1)),h("button",{class:"btn-text",onClick:a[0]||(a[0]=c=>i("close"))},"关闭")]),a[3]||(a[3]=h("div",{class:"hint"},"静态分析 · 封面 / 摘要 / 原创 / 外链 / 体积",-1)),h("div",zv,[h("div",{class:Ie(["summary-dot",r.value.pass?"summary-dot-pass":"summary-dot-warn"])},null,2),h("div",Wv,Q(r.value.pass?"清单无阻断项，可以进入发稿流程":"存在待处理项，建议修正后再发稿"),1)]),h("ul",Hv,[(j(!0),G(_e,null,De(r.value.items,c=>(j(),G("li",{key:c.id,class:Ie(["item",`status-${o[c.status]}`])},[a[2]||(a[2]=h("span",{class:"item-dot","aria-hidden":"true"},null,-1)),h("div",jv,[h("div",Fv,Q(c.label),1),c.hint?(j(),G("div",Kv,Q(c.hint),1)):Se("",!0)])],2))),128))])]))}}),Uv=Qe(qv,[["__scopeId","data-v-a8684624"]]),Vv={class:"cmd-head"},Gv={class:"cmd-group mono"},Yv=["data-idx","onMouseenter","onClick"],Zv={class:"cmd-title"},Xv={key:0,class:"cmd-kbd"},Jv={key:0,class:"cmd-empty"},Qv=Je({__name:"CommandPalette",props:{commands:{}},emits:["close"],setup(e,{emit:t}){const n=e,i=t,r=he(""),o=he(0),s=he(null),a=he(null),c=Ae(()=>{const p=r.value.trim().toLowerCase();return p?n.commands.filter(m=>`${m.title} ${m.group} ${m.keywords??""} ${m.shortcut??""}`.toLowerCase().includes(p)):n.commands});nt(c,()=>{o.value=0}),on(()=>{Hi(()=>s.value?.focus())});function l(p){if(p.key==="Escape"){p.preventDefault(),i("close");return}if(p.key==="ArrowDown"){p.preventDefault(),o.value=Math.min(o.value+1,c.value.length-1),d();return}if(p.key==="ArrowUp"){p.preventDefault(),o.value=Math.max(o.value-1,0),d();return}if(p.key==="Enter"){p.preventDefault();const m=c.value[o.value];m&&(m.run(),i("close"))}}function d(){Hi(()=>{a.value?.querySelector(`[data-idx="${o.value}"]`)?.scrollIntoView({block:"nearest"})})}function f(p){p.run(),i("close")}const u=Ae(()=>{const p=new Map;return c.value.forEach(m=>{const S=p.get(m.group)??[];S.push(m),p.set(m.group,S)}),Array.from(p.entries())});function b(p){return c.value.indexOf(p)}return(p,m)=>(j(),G("div",{class:"cmd-mask",onClick:m[1]||(m[1]=Wt(S=>i("close"),["self"]))},[h("div",{class:"cmd-panel",role:"dialog","aria-label":"命令面板",onKeydown:l},[h("div",Vv,[m[2]||(m[2]=h("span",{class:"cmd-icon"},"⌘",-1)),Et(h("input",{ref_key:"inputRef",ref:s,"onUpdate:modelValue":m[0]||(m[0]=S=>r.value=S),class:"cmd-input",type:"text",placeholder:"搜索命令、草稿、主题…",onKeydown:l},null,544),[[jt,r.value]]),m[3]||(m[3]=h("span",{class:"cmd-hint mono"},"↵ 执行 · Esc 关闭",-1))]),h("ul",{ref_key:"listRef",ref:a,class:"cmd-list"},[(j(!0),G(_e,null,De(u.value,([S,I])=>(j(),G(_e,{key:S},[h("li",Gv,Q(S),1),(j(!0),G(_e,null,De(I,z=>(j(),G("li",{key:z.id,class:Ie(["cmd-item",{active:b(z)===o.value}]),"data-idx":b(z),onMouseenter:R=>o.value=b(z),onClick:R=>f(z)},[h("span",Zv,Q(z.title),1),z.shortcut?(j(),G("span",Xv,Q(z.shortcut),1)):Se("",!0)],42,Yv))),128))],64))),128)),c.value.length===0?(j(),G("li",Jv,"没有匹配的命令")):Se("",!0)],512)],32)]))}}),ew=Qe(Qv,[["__scopeId","data-v-3ae71e6e"]]),tw={class:"help-panel",role:"dialog","aria-label":"快捷键与帮助"},nw={class:"help-head"},iw={class:"help-shortcuts"},rw={class:"group-title mono"},ow={class:"shortcut-list"},sw={class:"item-title"},aw={class:"item-kbd mono"},cw={class:"help-containers"},lw={class:"container-cat mono"},dw={class:"container-list"},pw=["onClick"],fw={class:"container-name"},uw={class:"container-desc"},hw={key:0,class:"container-empty"},gw=Je({__name:"HelpPanel",props:{commands:{}},emits:["close","insert"],setup(e,{emit:t}){const n=e,i=t;function r(){const f=new Map;return n.commands.filter(u=>u.shortcut).forEach(u=>{const b=f.get(u.group)??[];b.push(u),f.set(u.group,b)}),Array.from(f.entries())}const o=r(),s={structure:"文章结构",admonition:"提示",content:"内容",navigation:"导航",media:"媒体",signature:"签名",free:"兜底"},a=["structure","admonition","content","navigation","media","signature","free"],c=he(""),l=Ae(()=>{const f=c.value.trim().toLowerCase(),u=f?en.filter(p=>p.name.toLowerCase().includes(f)||p.description.toLowerCase().includes(f)||p.category.toLowerCase().includes(f)):en,b=new Map;for(const p of u){const m=b.get(p.category)??[];m.push(p),b.set(p.category,m)}return a.map(p=>[p,b.get(p)??[]]).filter(([,p])=>p.length>0)});function d(f){i("insert",f.example),i("close")}return(f,u)=>(j(),G("div",{class:"help-mask",onClick:u[2]||(u[2]=Wt(b=>i("close"),["self"]))},[h("div",tw,[h("header",nw,[u[3]||(u[3]=h("h3",{class:"tx-section"},"快捷键与帮助",-1)),h("button",{class:"btn-text",onClick:u[0]||(u[0]=b=>i("close"))},"关闭")]),u[5]||(u[5]=Gc('<section class="help-intro" data-v-04c30f3b><div class="intro-line" data-v-04c30f3b><strong data-v-04c30f3b>wechat-typeset</strong> 是纯浏览器里的微信公众号 Markdown 排版工具。 </div><div class="intro-line" data-v-04c30f3b> 草稿保存在本地浏览器，切 tab / 关 tab 都不丢；一键复制后直接粘贴进公众号编辑器即可保留排版。 </div></section><section class="help-icons" data-v-04c30f3b><div class="group-title mono" data-v-04c30f3b>移动端工具栏</div><ul class="icon-list" data-v-04c30f3b><li class="icon-item" data-v-04c30f3b><span class="icon-glyph" data-v-04c30f3b>●</span><span class="icon-desc" data-v-04c30f3b><strong data-v-04c30f3b>切换主题</strong> — 更换排版风格与配色方案</span></li><li class="icon-item" data-v-04c30f3b><span class="icon-glyph" data-v-04c30f3b>＋</span><span class="icon-desc" data-v-04c30f3b><strong data-v-04c30f3b>插入组件</strong> — 封面、引用、代码块等预置模板</span></li><li class="icon-item" data-v-04c30f3b><span class="icon-glyph" data-v-04c30f3b>◐</span><span class="icon-desc" data-v-04c30f3b><strong data-v-04c30f3b>自定义配色</strong> — 调整强调色与文字颜色</span></li><li class="icon-item" data-v-04c30f3b><span class="icon-glyph" data-v-04c30f3b>···</span><span class="icon-desc" data-v-04c30f3b><strong data-v-04c30f3b>更多操作</strong> — 导出、清空、载入示例等</span></li></ul></section>',2)),h("section",iw,[(j(!0),G(_e,null,De(ee(o),([b,p])=>(j(),G("div",{key:b,class:"shortcut-group"},[h("div",rw,Q(b),1),h("ul",ow,[(j(!0),G(_e,null,De(p,m=>(j(),G("li",{key:m.id,class:"shortcut-item"},[h("span",sw,Q(m.title),1),h("span",aw,Q(m.shortcut),1)]))),128))])]))),128))]),h("section",cw,[u[4]||(u[4]=h("div",{class:"group-title mono"},"容器速查 · 点击插入光标处",-1)),Et(h("input",{"onUpdate:modelValue":u[1]||(u[1]=b=>c.value=b),type:"search",class:"container-search",placeholder:"搜索容器名或用途（例：金句 / admonition / compare）","aria-label":"搜索容器"},null,512),[[jt,c.value]]),(j(!0),G(_e,null,De(l.value,([b,p])=>(j(),G("div",{key:b,class:"container-group"},[h("div",lw,Q(s[b]),1),h("ul",dw,[(j(!0),G(_e,null,De(p,m=>(j(),G("li",{key:m.name,class:"container-item",onClick:S=>d(m)},[h("code",fw,"::: "+Q(m.name),1),h("span",uw,Q(m.description),1)],8,pw))),128))])]))),128)),l.value.length===0?(j(),G("div",hw," 无匹配容器 ")):Se("",!0)]),u[6]||(u[6]=h("section",{class:"help-tips"},[h("div",{class:"tip-title mono"},"提示"),h("ul",null,[h("li",null,"双击草稿标题可就地重命名。"),h("li",null,"自定义配色改动即刻应用；切主题会还原为主题默认。"),h("li",null,"复制失败时请改用 Chrome / Safari 或关闭跨域预览。")])],-1))])]))}}),mw=Qe(gw,[["__scopeId","data-v-04c30f3b"]]),bw={class:"onboard",role:"note","aria-label":"首次使用提示"},xw={class:"onboard-head"},yw={class:"onboard-title"},vw={key:0,class:"onboard-list"},ww={class:"kbd mono"},kw={key:1,class:"onboard-list onboard-list--mobile"},_w=Je({__name:"OnboardingCard",emits:["dismiss","openHelp","openCommand","openOverflow"],setup(e,{emit:t}){const n=t,r=/Mac|iPhone|iPad|iPod/.test(navigator.platform)?"⌘":"Ctrl",o=he(!1);let s=null;function a(){o.value=s?.matches??!1}on(()=>{s=window.matchMedia("(max-width: 767px)"),a(),s.addEventListener("change",a)}),No(()=>{s?.removeEventListener("change",a)});const c=Ae(()=>o.value?"三步开始写":"三个键，走通 80% 动作");return(l,d)=>(j(),G("aside",bw,[h("header",xw,[d[5]||(d[5]=h("span",{class:"onboard-kicker mono"},"WELCOME",-1)),h("button",{class:"close",title:"不再显示",onClick:d[0]||(d[0]=f=>n("dismiss"))},"×")]),h("h4",yw,Q(c.value),1),o.value?(j(),G("ul",kw,[d[10]||(d[10]=Gc('<li data-v-d522c190><span class="pill" data-v-d522c190>顶栏</span><span data-v-d522c190>选 <strong data-v-d522c190>主题</strong>、打开 <strong data-v-d522c190>插入组件</strong>、<strong data-v-d522c190>自定义配色</strong></span></li><li data-v-d522c190><span class="pill pill-accent" data-v-d522c190>复制</span><span data-v-d522c190>右上角 <strong data-v-d522c190>复制到公众号</strong> 按钮 —— 长按可直接粘贴到公众号后台</span></li>',2)),h("li",null,[h("button",{class:"pill pill-btn",onClick:d[3]||(d[3]=f=>n("openOverflow"))},"⋯ 更多"),d[9]||(d[9]=h("span",null,"草稿管理 / 载入示例 / 导出 HTML MD / 快捷键帮助",-1))]),d[11]||(d[11]=h("li",null,[h("span",{class:"pill"},"底栏"),h("span",null,[h("strong",null,"编辑 ⇄ 预览"),ft(" 切换；右半屏写完切过去检查效果")])],-1))])):(j(),G("ul",vw,[h("li",null,[h("button",{class:"kbd-btn mono",onClick:d[1]||(d[1]=f=>n("openCommand"))},Q(ee(r))+" K",1),d[6]||(d[6]=h("span",null,"打开命令面板，搜索一切动作",-1))]),h("li",null,[h("span",ww,Q(ee(r))+" ↵",1),d[7]||(d[7]=h("span",null,"复制排版后的富文本",-1))]),h("li",null,[h("button",{class:"kbd-btn mono",onClick:d[2]||(d[2]=f=>n("openHelp"))},"?"),d[8]||(d[8]=h("span",null,"查看全部快捷键",-1))])])),h("button",{class:"dismiss",onClick:d[4]||(d[4]=f=>n("dismiss"))},"明白了")]))}}),Sw=Qe(_w,[["__scopeId","data-v-d522c190"]]),$w={class:"toast",role:"status"},Ew={class:"toast-msg"},Cw=Je({__name:"UndoToast",props:{message:{},duration:{}},emits:["undo","expire"],setup(e,{emit:t}){const n=e,i=t;let r=null;on(()=>{r=window.setTimeout(()=>i("expire"),n.duration??4e3)}),sn(()=>{r!==null&&window.clearTimeout(r)});function o(){r!==null&&window.clearTimeout(r),i("undo")}return(s,a)=>(j(),G("div",$w,[h("span",Ew,Q(n.message),1),h("button",{class:"toast-undo",onClick:o},"撤销")]))}}),Aw=Qe(Cw,[["__scopeId","data-v-48b561e5"]]);function Tw(e){const t=[[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let n="",i=e;for(const[r,o]of t)for(;i>=r;)n+=o,i-=r;return n||"I"}const Iw={tip:"小贴士",warning:"注意",info:"说明",danger:"警告"},Lw={tip:"tipIcon",warning:"warningIcon",info:"infoIcon",danger:"dangerIcon"};function Ca(e){const t=e.attrs.variant;return t&&t in xo?t:e.variants.admonition??"accent-bar"}function br(e){return{open:t=>{const n=Ca(t),r=xo[n].render(t,{kind:e}),o=t.info.trim()||Iw[e],s=Lw[e],a=t.assets[s]??"",c=[];if(c.push(`<section class="container-${e} container-${e}--${n}" style="${r.wrapperCSS}">`),r.svgSlot&&c.push(r.svgSlot),r.titleCSS!==""){const l=r.titleCSS??`font-weight:700;color:${t.tokens.colors.status[e].accent};margin-bottom:6px;letter-spacing:0.3px`;c.push(`<section class="container-${e}__title" style="${l}">${a}${ve(o)}</section>`)}return r.bodyCSS&&c.push(`<section class="container-${e}__body" style="${r.bodyCSS}">`),c.join(`
`)+`
`},close:t=>{const n=Ca(t);return(xo[n].render(t,{kind:e}).bodyCSS?`</section>
`:"")+`</section>
`}}}const Rw=br("tip"),Mw=br("warning"),Ow=br("info"),Nw=br("danger"),Bw={open:e=>{const t=e.info.trim();return`<section class="container-intro">
${t?`<section class="container-intro__title" style="font-weight:700;margin-bottom:10px">${ve(t)}</section>`:""}`},close:`</section>
`};function fd(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",i=e.attrs.date??"",r=e.attrs.kind??"";return!n&&!i&&!r?"":t(n,i,r)}const Pw={open:e=>{const t=e.info.trim(),n=t?`<section class="container-cover__title" style="text-align:center;font-weight:700;font-size:18px;margin-bottom:10px">${ve(t)}</section>`:"",i=fd(e),r=i?`<section class="container-cover__stamp" style="margin-top:12px">${i}</section>`:"";return`<section class="container-cover">
${n}${r}`},close:`</section>
`},Dw={open:e=>{const t=e.info.trim()||"作者",n=e.attrs.role?`<span style="color:${e.tokens.colors.textMuted};margin-left:8px">${ve(e.attrs.role)}</span>`:"",i=fd(e),r=i?`<span class="container-author__stamp" style="margin-left:10px;vertical-align:middle">${i}</span>`:"";return`<section class="container-author">
<section class="container-author__header" style="margin-bottom:8px"><strong>${ve(t)}</strong>${n}${r}</section>
`},close:`</section>
`};function zw(e){const t=e.attrs.variant;return t&&t in ld?t:e.variants.sectionTitle??"bordered"}const Ww={open:e=>{const t=e.info.trim(),n=zw(e),i=ld[n].render(e),r=[];if(r.push(`<section class="container-section-title container-section-title--${n}" style="${i.wrapperCSS}">`),t){const o=i.svgSlot??"",s=i.titleCSS??"font-weight:700;font-size:20px";r.push(`<section class="container-section-title__label" style="${s}">${o}${ve(t)}</section>`)}return r.join(`
`)+`
`},close:`</section>
`};function Hw(e){const t=e.attrs.variant;return t&&t in sd?t:e.variants.quote??"classic"}const jw={open:e=>{const t=Hw(e),n=sd[t].render(e),i=[];return i.push(`<section class="container-quote-card container-quote-card--${t}" style="${n.wrapperCSS}">`),n.svgSlot&&i.push(n.svgSlot),i.push(`<section class="container-quote-card__body" style="${n.bodyCSS??""}">`),i.join(`
`)+`
`},close:e=>{const t=e.info.trim();return`</section>
${t?`<section class="container-quote-card__byline" style="text-align:center;color:${e.tokens.colors.textMuted};margin-top:10px;font-size:13px">— ${ve(t)}</section>`:""}</section>
`}},Fw={open:()=>`<section class="container-highlight">
`,close:`</section>
`};function ud(e){const t=e.attrs.variant;return t&&t in is?t:e.variants.compare??"column-card"}const Kw={open:e=>{const t=ud(e),n=is[t].render(e,{slot:"wrapper"});return`<section class="container-compare container-compare--${t}" style="${n.wrapperCSS}">
`},close:`</section>
`};function hd(e,t){return{open:n=>{const i=ud(n),r=is[i].render(n,{slot:e}),o=n.info.trim()||t,s=[];if(s.push(`<section class="container-${e} container-${e}--${i}" style="${r.wrapperCSS}">`),r.svgSlot&&s.push(r.svgSlot),r.titleCSS!==""){const a=r.titleCSS??"font-weight:700;margin-bottom:6px";s.push(`<section class="container-${e}__title" style="${a}">${Vw(o)}</section>`)}return s.join(`
`)+`
`},close:`</section>
`}}const qw=hd("pros","优点"),Uw=hd("cons","缺点");function Vw(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Gw(e){const t=e.attrs.variant;return t&&t in ad?t:e.variants.steps??"number-circle"}const Yw={open:e=>{const t=Gw(e),n=ad[t].render(e),i=e.info.trim(),r=[];if(r.push(`<section class="container-steps container-steps--${t}" style="${n.wrapperCSS}">`),n.svgSlot&&r.push(n.svgSlot),i&&n.titleCSS!==""){const o=n.titleCSS??"font-weight:700;margin-bottom:12px";r.push(`<section class="container-steps__title" style="${o}">${ve(i)}</section>`)}return r.join(`
`)+`
`},close:`</section>
`};function Zw(e){const t=(e.attrs.variant??"").toLowerCase().trim();return t==="line"?"rule":t&&t in cd?t:e.variants.divider??"rule"}const Xw={open:e=>{const t=Zw(e),n=cd[t].render(e),i=n.svgSlot??"";return`<section class="container-divider container-divider--${t}" style="${n.wrapperCSS}">
${i}
`},close:`</section>
`};function Jw(e){const t=e.assets.issueStamp;if(!t)return"";const n=e.attrs.issue??"",i=e.attrs.date??"",r=e.attrs.kind??"";return!n&&!i&&!r?"":t(n,i,r)}const Qw={open:e=>{const t=e.info.trim()||"关注我",n=e.attrs.cta?ve(e.attrs.cta):"",i=e.attrs.href??"",r=`display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:6px 18px;box-sizing:border-box;border-radius:${e.tokens.radius.lg}px;background-color:${e.tokens.colors.primary};color:${e.tokens.colors.textInverse};text-decoration:none`,o=n?i?`<a href="${bo(i)}" data-wx-footer-cta="" style="${r}">${n}</a>`:`<span style="${r}">${n}</span>`:"",s=o?`<section class="container-footer-cta__cta" style="text-align:center;margin-top:10px">${o}</section>`:"",a=Jw(e);return`<section class="container-footer-cta" style="text-align:center">
`+(a?`<section class="container-footer-cta__stamp" style="text-align:center;margin-bottom:10px">${a}</section>`:"")+`<section class="container-footer-cta__title" style="font-weight:700;font-size:16px;margin-bottom:8px">${ve(t)}</section>
`+s+`
`},close:e=>(e.assets.sealMark?`<section class="container-footer-cta__seal" style="text-align:center;margin-top:18px;line-height:0">${e.assets.sealMark}</section>
`:"")+`</section>
`},e4={open:e=>{const t=e.info.trim()||"推荐阅读";return`<section class="container-recommend">
<section class="container-recommend__title" style="font-weight:700;margin-bottom:10px">${ve(t)}</section>
`},close:`</section>
`},t4={open:e=>{const t=e.info.trim();return`<section class="container-qrcode" style="text-align:center">
${t?`<section class="container-qrcode__caption" style="text-align:center;color:${e.tokens.colors.textMuted};margin-bottom:8px">${ve(t)}</section>`:""}
`},close:`</section>
`};function gd(e){const t=e.tokens.colors.bgSoft,n=e.tokens.colors.textMuted,i=e.tokens.radius.md;return`text-align:center;padding:16px;background-color:${t};border-radius:${i}px;color:${n}`}const n4={open:e=>{const t=e.info.trim()||"音频",n=e.attrs.voice_encode_fileid??e.attrs.fileid,i=n?`已携带 fileid=${ve(n)}，粘贴到公众号后自动展开`:'粘贴到公众号后请手动选择"插入音频"',r=e.tokens.colors.primary;return`<section class="container-mpvoice" style="${gd(e)}">
<section style="font-size:12px;letter-spacing:1px;color:${r};margin-bottom:6px">[ 音频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${ve(t)}</section>
<section style="font-size:13px">${i}</section>
`},close:`</section>
`},i4={open:e=>{const t=e.info.trim()||"视频",n=e.attrs.qqvid??e.attrs.vid;if(n){const r=`https://v.qq.com/txp/iframe/player.html?vid=${encodeURIComponent(n)}`;return`<section class="container-mpvideo">
<iframe src="${bo(r)}" frameborder="0" width="100%" height="220" allowfullscreen="true" title="${bo(t)}"></iframe>
`}const i=e.tokens.colors.primary;return`<section class="container-mpvideo" style="${gd(e)}">
<section style="font-size:12px;letter-spacing:1px;color:${i};margin-bottom:6px">[ 视频 ]</section>
<section style="font-weight:700;margin-bottom:6px">${ve(t)}</section>
<section style="font-size:13px">粘贴到公众号后请手动选择"插入视频"</section>
`},close:`</section>
`};function r4(e){if(!e)return"";const t=[];for(const[n,i]of Object.entries(e)){if(i==null||i==="")continue;const r=typeof i=="number"?`${i}px`:String(i).trim();r&&t.push(`${n.trim()}:${r}`)}return t.join(";")}const o4={open:e=>{const t=e.info.trim()||"补注",n=e.assets.noteIcon??"",i=e.tokens.colors,s=r4(e.containers.note)||"margin:16px 0;padding:0",a=[`color:${i.textMuted}`,"font-weight:600","font-size:13px","margin-bottom:4px","letter-spacing:0.3px"].join(";");return`<section class="container-note" style="${s}">
<section class="container-note__title" style="${a}">${n}${ve(t)}</section>
`},close:`</section>
`},s4={open:e=>{const t=e.info.trim()||"摘要",n=e.tokens.colors,i=[`background-color:${n.bgSoft}`,`border-left:4px solid ${n.primary}`,"padding:14px 16px 14px 18px","margin:18px 0 24px","border-radius:4px"].join(";"),r=[`color:${n.primary}`,"font-size:11px","font-weight:700","letter-spacing:2px","text-transform:uppercase","margin-bottom:6px"].join(";");return`<section class="container-abstract" style="${i}">
<section class="container-abstract__kicker" style="${r}">${ve(t)}</section>
`},close:`</section>
`},a4={open:e=>{const t=e.info.trim(),n=e.attrs.value??"0",i=e.tokens.colors,r=[`background-color:${i.bgSoft}`,"padding:16px 18px","margin:18px 0","border-radius:6px",`border-top:3px solid ${i.primary}`].join(";"),o=[`color:${i.primary}`,"font-size:32px","font-weight:700","line-height:1.1","letter-spacing:-0.5px","margin-bottom:4px"].join(";"),s=[`color:${i.textMuted}`,"font-size:12px","font-weight:600","letter-spacing:1px","text-transform:uppercase","margin-bottom:8px"].join(";"),a=t?`<section class="container-key-number__kicker" style="${s}">${ve(t)}</section>
`:"";return`<section class="container-key-number" style="${r}">
`+a+`<section class="container-key-number__value" style="${o}">${ve(n)}</section>
`},close:`</section>
`},c4={open:e=>{const t=e.info.trim()||"延伸阅读",n=e.tokens.colors,i=[`background-color:${n.bgSoft}`,"padding:14px 16px","margin:20px 0","border-radius:6px",`border-left:3px solid ${n.secondary}`].join(";"),r=[`color:${n.textMuted}`,"font-size:11px","font-weight:700","letter-spacing:2px","text-transform:uppercase","margin-bottom:8px"].join(";");return`<section class="container-see-also" style="${i}">
<section class="container-see-also__title" style="${r}">${ve(t)}</section>
`},close:`</section>
`},l4={open:()=>`<section class="container-free">
`,close:`</section>
`},d4={intro:Bw,cover:Pw,author:Dw,"section-title":Ww,tip:Rw,warning:Mw,info:Ow,danger:Nw,note:o4,"quote-card":jw,highlight:Fw,compare:Kw,pros:qw,cons:Uw,steps:Yw,divider:Xw,"footer-cta":Qw,recommend:e4,qrcode:t4,mpvoice:n4,mpvideo:i4,free:l4,abstract:s4,"key-number":a4,"see-also":c4},p4="[.",f4=".]",u4="[~",h4="~]";function Aa(e,t,n){return function(r,o){const s=r.src,a=r.pos;if(s.substr(a,e.length)!==e)return!1;const c=a+e.length;let l=-1;for(let f=c;f<s.length-(t.length-1);f++){const u=s[f];if(u===`
`)return!1;if(u==="\\"){f++;continue}if(s.substr(f,t.length)===t){l=f;break}}if(l<0)return!1;const d=s.slice(c,l);if(!d)return!1;if(!o){const f=r.push("html_inline","",0);f.content=`<span class="${n}">`;const b=r.md.renderInline(d,r.env),p=r.push("html_inline","",0);p.content=b;const m=r.push("html_inline","",0);m.content="</span>"}return r.pos=l+t.length,!0}}function g4(e){e.inline.ruler.before("emphasis","wx_emphasis",Aa(p4,f4,"wx-emphasis")),e.inline.ruler.before("emphasis","wx_wavy",Aa(u4,h4,"wx-wavy"))}function m4(e,t,n){e.__wxContainerStacks??={},e.__wxContainerStacks[t]??=[],e.__wxContainerStacks[t].push(n)}function b4(e,t){return e.__wxContainerStacks?.[t]?.pop()}function x4(e={}){const t=e.theme??yl,n=new ap({html:!0,xhtmlOut:!1,breaks:!1,linkify:!0,typographer:!1});n.use(cp),n.use(lp),n.use(dp),n.use(pp,{enabled:!0,label:!0});for(const[o,s]of Object.entries(d4))n.use(fp,o,{validate(a){return a.trim().split(/\s+/)[0]===o},render(a,c,l,d){const f=a[c];if(f.nesting===1){const b=f.info.trim().slice(o.length).trim(),{title:p,attrs:m}=Hx(b),S={tokens:t.tokens,assets:t.assets,containers:t.containers,inline:t.inline,variants:t.variants,info:p,attrs:m};return m4(d,o,S),s.open(S)}const u=b4(d,o)??y4(t);return typeof s.close=="function"?s.close(u):s.close}});g4(n);const i=t.behavior?.h2RomanNumerals===!0,r=t.assets.h2Prefix??null;if((i||r)&&(n.renderer.rules.heading_open=(o,s,a,c,l)=>{if(o[s].tag==="h2"){if(i){const f=c;f.__h2Counter=(f.__h2Counter??0)+1;const u=Tw(f.__h2Counter),b=t.tokens.colors.accent;return`<h2><span class="h2-roman" style="color:${b};font-weight:700;font-size:16px;letter-spacing:2px;margin-right:10px;border-bottom:1px solid ${b};padding-bottom:2px">${u}</span>`}if(r)return`<h2>${r}`}return l.renderToken(o,s,a)}),t.behavior?.introDropcap){const s=`display:inline-block;font-size:48px;font-weight:700;color:${t.tokens.colors.accent};line-height:1;margin:0 8px 0 0;padding-top:4px;vertical-align:baseline`;n.core.ruler.push("wx_intro_dropcap",a=>{const c=a.tokens;for(let l=0;l<c.length;l++){if(c[l].type!=="container_intro_open")continue;let d=l+1;for(;d<c.length&&c[d].type!=="paragraph_open"&&c[d].type!=="container_intro_close";)d++;if(d>=c.length||c[d].type==="container_intro_close")continue;const f=c[d+1];if(!f||f.type!=="inline"||!f.children)continue;const u=f.children;let b=0;for(;b<u.length&&u[b].type!=="text";)b++;if(b>=u.length)continue;const p=u[b].content;if(!p)continue;let m=0;for(;m<p.length&&/[\s"'‘’“”「『《〈(（[［{｛・·。，、；：？！"']/.test(p[m]);)m++;if(m>=p.length||/[0-9]/.test(p[m]))continue;const S=p[m],I=p.slice(0,m),z=p.slice(m+1),R=u[b].constructor,_=new R("html_inline","",0);_.content=`<span class="intro-dropcap" style="${s}">${S}</span>`;const k=[_];if(z){const B=new R("text","",0);B.content=z,k.push(B)}I?(u[b].content=I,u.splice(b+1,0,...k)):u.splice(b,1,...k)}})}return n}function y4(e){return{tokens:e.tokens,assets:e.assets,containers:e.containers,inline:e.inline,variants:e.variants,info:"",attrs:{}}}const v4=["font-family","fontfamily","position","float"],w4=new Set(["flex","inline-flex","grid","inline-grid"]),k4=[[/-webkit-/i,"-webkit- 前缀在公众号会被剥离"],[/@media/i,"@media 查询会被公众号剥离"],[/@keyframes/i,"@keyframes 动画不被公众号支持"],[/:hover/i,":hover 伪类粘贴后无效"],[/:active/i,":active 伪类粘贴后无效"]],md=new Set(["position","top","right","bottom","left","z-index"]),bd=new Set(["style","script","noscript","link","meta"]),xd=[/^https?:\/\/v\.qq\.com\//i],Ta="#fefefe",kt="markdown-body";function _4(e,t,n){const i=e.toLowerCase();if(v4.includes(i))throw new Ar(`[themeCSS] 主题在 ${n} 声明了 \`${e}\`，违反微信平台约束。请移除。`);if(i==="display"&&w4.has(t.toLowerCase().trim()))throw new Ar(`[themeCSS] 主题在 ${n} 使用了 \`display: ${t}\`，微信粘贴后会被剥离。改用 block / inline-block / table 系列。`);for(const[r,o]of k4)if(r.test(t))throw new Ar(`[themeCSS] 主题在 ${n} 的值里命中禁用模式（${o}）：\`${t}\`。请移除。`)}function S4(e,t){const n=[];for(const[i,r]of Object.entries(e)){const o=i.trim(),s=typeof r=="number"?`${r}px`:String(r).trim();s&&(_4(o,s,t),n.push(`  ${o}: ${s};`))}return n.join(`
`)}function rt(e,t,n){const i=S4(t,n);return i?`${e} {
${i}
}`:""}function $4(e){return`.${kt} ${e}`}function E4(e){return`.${kt} .container-${e}`}function C4(e){const t=[];t.push(rt(`.${kt}`,{"background-color":e.tokens.colors.bg,color:e.tokens.colors.text,"font-size":`${e.tokens.typography.baseSize}px`,"line-height":String(e.tokens.typography.lineHeight),"letter-spacing":`${e.tokens.typography.letterSpacing}px`,padding:"20px 16px"},"root"));const n=[["h1",e.elements.h1],["h2",e.elements.h2],["h3",e.elements.h3],["h4",e.elements.h4],["p",e.elements.p],["blockquote",e.elements.blockquote],["ul",e.elements.ul],["ol",e.elements.ol],["li",e.elements.li],["code",{...e.elements.code,"word-break":"break-all"}],["kbd",e.elements.kbd],["pre",e.elements.pre],["pre code",{"background-color":"transparent",color:"inherit",padding:"0","word-break":"normal"}],["img",e.elements.img],["a",e.elements.a],["hr",e.elements.hr],["table",e.elements.table],["th",{border:`1px solid ${e.tokens.colors.border}`,padding:"6px 10px","background-color":e.tokens.colors.bgSoft,"text-align":"left"}],["td",{border:`1px solid ${e.tokens.colors.border}`,padding:"6px 10px"}],["strong",e.elements.strong],["em",e.elements.em]];for(const[o,s]of n){const a=rt($4(o),s,`elements.${o}`);a&&t.push(a)}t.push(rt(`.${kt} mark`,e.inline.highlight,"inline.highlight")),t.push(rt(`.${kt} .wx-wavy`,e.inline.wavy,"inline.wavy")),t.push(rt(`.${kt} .wx-emphasis`,e.inline.emphasis,"inline.emphasis"));for(const o of ur){const s=e.containers[o.styleKey];if(!s)continue;const a=rt(E4(o.name),s,`containers.${o.styleKey}`);a&&t.push(a)}const i=`.${kt} .container-pros, .${kt} .container-cons`,r=o=>`.${kt} .container-pros ${o}, .${kt} .container-cons ${o}`;return t.push(rt(i,{"letter-spacing":"0"},"compare.col")),t.push(rt(r("p"),{"font-size":"13px","letter-spacing":"0","line-height":"1.6","margin-bottom":"6px"},"compare.col p")),t.push(rt(r("li"),{"font-size":"13px","letter-spacing":"0","line-height":"1.55","margin-bottom":"4px"},"compare.col li")),t.push(rt(r("ul")+`, ${r("ol")}`,{"padding-left":"12px","margin-bottom":"8px"},"compare.col ul")),t.push(rt(r("h3"),{"font-size":"14px","margin-top":"8px","margin-bottom":"6px","line-height":"1.4"},"compare.col h3")),t.push(rt(r("code"),{"font-size":"12px",padding:"1px 4px"},"compare.col code")),t.filter(Boolean).join(`

`)}function yd(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],i=typeof n;(i==="object"||i==="function")&&!Object.isFrozen(n)&&yd(n)}),e}class Ia{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function vd(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Jt(e,...t){const n=Object.create(null);for(const i in e)n[i]=e[i];return t.forEach(function(i){for(const r in i)n[r]=i[r]}),n}const A4="</span>",La=e=>!!e.scope,T4=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((i,r)=>`${i}${"_".repeat(r+1)}`)].join(" ")}return`${t}${e}`};class I4{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=vd(t)}openNode(t){if(!La(t))return;const n=T4(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){La(t)&&(this.buffer+=A4)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Ra=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class os{constructor(){this.rootNode=Ra(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Ra({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(i=>this._walk(t,i)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{os._collapse(n)}))}}class L4 extends os{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const i=t.root;n&&(i.scope=`language:${n}`),this.add(i)}toHTML(){return new I4(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function yi(e){return e?typeof e=="string"?e:e.source:null}function wd(e){return $n("(?=",e,")")}function R4(e){return $n("(?:",e,")*")}function M4(e){return $n("(?:",e,")?")}function $n(...e){return e.map(n=>yi(n)).join("")}function O4(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ss(...e){return"("+(O4(e).capture?"":"?:")+e.map(i=>yi(i)).join("|")+")"}function kd(e){return new RegExp(e.toString()+"|").exec("").length-1}function N4(e,t){const n=e&&e.exec(t);return n&&n.index===0}const B4=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function as(e,{joinWith:t}){let n=0;return e.map(i=>{n+=1;const r=n;let o=yi(i),s="";for(;o.length>0;){const a=B4.exec(o);if(!a){s+=o;break}s+=o.substring(0,a.index),o=o.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?s+="\\"+String(Number(a[1])+r):(s+=a[0],a[0]==="("&&n++)}return s}).map(i=>`(${i})`).join(t)}const P4=/\b\B/,_d="[a-zA-Z]\\w*",cs="[a-zA-Z_]\\w*",Sd="\\b\\d+(\\.\\d+)?",$d="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ed="\\b(0b[01]+)",D4="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",z4=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=$n(t,/.*\b/,e.binary,/\b.*/)),Jt({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,i)=>{n.index!==0&&i.ignoreMatch()}},e)},vi={begin:"\\\\[\\s\\S]",relevance:0},W4={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[vi]},H4={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[vi]},j4={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},xr=function(e,t,n={}){const i=Jt({scope:"comment",begin:e,end:t,contains:[]},n);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=ss("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:$n(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},F4=xr("//","$"),K4=xr("/\\*","\\*/"),q4=xr("#","$"),U4={scope:"number",begin:Sd,relevance:0},V4={scope:"number",begin:$d,relevance:0},G4={scope:"number",begin:Ed,relevance:0},Y4={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[vi,{begin:/\[/,end:/\]/,relevance:0,contains:[vi]}]},Z4={scope:"title",begin:_d,relevance:0},X4={scope:"title",begin:cs,relevance:0},J4={begin:"\\.\\s*"+cs,relevance:0},Q4=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Mi=Object.freeze({__proto__:null,APOS_STRING_MODE:W4,BACKSLASH_ESCAPE:vi,BINARY_NUMBER_MODE:G4,BINARY_NUMBER_RE:Ed,COMMENT:xr,C_BLOCK_COMMENT_MODE:K4,C_LINE_COMMENT_MODE:F4,C_NUMBER_MODE:V4,C_NUMBER_RE:$d,END_SAME_AS_BEGIN:Q4,HASH_COMMENT_MODE:q4,IDENT_RE:_d,MATCH_NOTHING_RE:P4,METHOD_GUARD:J4,NUMBER_MODE:U4,NUMBER_RE:Sd,PHRASAL_WORDS_MODE:j4,QUOTE_STRING_MODE:H4,REGEXP_MODE:Y4,RE_STARTERS_RE:D4,SHEBANG:z4,TITLE_MODE:Z4,UNDERSCORE_IDENT_RE:cs,UNDERSCORE_TITLE_MODE:X4});function ek(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function tk(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function nk(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ek,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ik(e,t){Array.isArray(e.illegal)&&(e.illegal=ss(...e.illegal))}function rk(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ok(e,t){e.relevance===void 0&&(e.relevance=1)}const sk=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(i=>{delete e[i]}),e.keywords=n.keywords,e.begin=$n(n.beforeMatch,wd(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ak=["of","and","for","in","not","or","if","then","parent","list","value"],ck="keyword";function Cd(e,t,n=ck){const i=Object.create(null);return typeof e=="string"?r(n,e.split(" ")):Array.isArray(e)?r(n,e):Object.keys(e).forEach(function(o){Object.assign(i,Cd(e[o],t,o))}),i;function r(o,s){t&&(s=s.map(a=>a.toLowerCase())),s.forEach(function(a){const c=a.split("|");i[c[0]]=[o,lk(c[0],c[1])]})}}function lk(e,t){return t?Number(t):dk(e)?0:1}function dk(e){return ak.includes(e.toLowerCase())}const Ma={},wn=e=>{console.error(e)},Oa=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Mn=(e,t)=>{Ma[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Ma[`${e}/${t}`]=!0)},er=new Error;function Ad(e,t,{key:n}){let i=0;const r=e[n],o={},s={};for(let a=1;a<=t.length;a++)s[a+i]=r[a],o[a+i]=!0,i+=kd(t[a-1]);e[n]=s,e[n]._emit=o,e[n]._multi=!0}function pk(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw wn("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),er;if(typeof e.beginScope!="object"||e.beginScope===null)throw wn("beginScope must be object"),er;Ad(e,e.begin,{key:"beginScope"}),e.begin=as(e.begin,{joinWith:""})}}function fk(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw wn("skip, excludeEnd, returnEnd not compatible with endScope: {}"),er;if(typeof e.endScope!="object"||e.endScope===null)throw wn("endScope must be object"),er;Ad(e,e.end,{key:"endScope"}),e.end=as(e.end,{joinWith:""})}}function uk(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function hk(e){uk(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),pk(e),fk(e)}function gk(e){function t(s,a){return new RegExp(yi(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(a?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(a,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,a]),this.matchAt+=kd(a)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const a=this.regexes.map(c=>c[1]);this.matcherRe=t(as(a,{joinWith:"|"}),!0),this.lastIndex=0}exec(a){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(a);if(!c)return null;const l=c.findIndex((f,u)=>u>0&&f!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(a){if(this.multiRegexes[a])return this.multiRegexes[a];const c=new n;return this.rules.slice(a).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[a]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(a,c){this.rules.push([a,c]),c.type==="begin"&&this.count++}exec(a){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(a);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(a)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function r(s){const a=new i;return s.contains.forEach(c=>a.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&a.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&a.addRule(s.illegal,{type:"illegal"}),a}function o(s,a){const c=s;if(s.isCompiled)return c;[tk,rk,hk,sk].forEach(d=>d(s,a)),e.compilerExtensions.forEach(d=>d(s,a)),s.__beforeBegin=null,[nk,ik,ok].forEach(d=>d(s,a)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Cd(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),a&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=yi(c.end)||"",s.endsWithParent&&a.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+a.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return mk(d==="self"?s:d)})),s.contains.forEach(function(d){o(d,c)}),s.starts&&o(s.starts,a),c.matcher=r(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Jt(e.classNameAliases||{}),o(e)}function Td(e){return e?e.endsWithParent||Td(e.starts):!1}function mk(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Jt(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Td(e)?Jt(e,{starts:e.starts?Jt(e.starts):null}):Object.isFrozen(e)?Jt(e):e}var bk="11.11.1";class xk extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Vr=vd,Na=Jt,Ba=Symbol("nomatch"),yk=7,Id=function(e){const t=Object.create(null),n=Object.create(null),i=[];let r=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:L4};function c(v){return a.noHighlightRe.test(v)}function l(v){let E=v.className+" ";E+=v.parentNode?v.parentNode.className:"";const A=a.languageDetectRe.exec(E);if(A){const X=y(A[1]);return X||(Oa(o.replace("{}",A[1])),Oa("Falling back to no-highlight mode for this block.",v)),X?A[1]:"no-highlight"}return E.split(/\s+/).find(X=>c(X)||y(X))}function d(v,E,A){let X="",ie="";typeof E=="object"?(X=v,A=E.ignoreIllegals,ie=E.language):(Mn("10.7.0","highlight(lang, code, ...args) has been deprecated."),Mn("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),ie=v,X=E),A===void 0&&(A=!0);const xe={code:X,language:ie};ge("before:highlight",xe);const ye=xe.result?xe.result:f(xe.language,xe.code,A);return ye.code=xe.code,ge("after:highlight",ye),ye}function f(v,E,A,X){const ie=Object.create(null);function xe(L,K){return L.keywords[K]}function ye(){if(!T.keywords){P.addText(C);return}let L=0;T.keywordPatternRe.lastIndex=0;let K=T.keywordPatternRe.exec(C),Z="";for(;K;){Z+=C.substring(L,K.index);const se=M.case_insensitive?K[0].toLowerCase():K[0],D=xe(T,se);if(D){const[F,me]=D;if(P.addText(Z),Z="",ie[se]=(ie[se]||0)+1,ie[se]<=yk&&(ne+=me),F.startsWith("_"))Z+=K[0];else{const it=M.classNameAliases[F]||F;Be(K[0],it)}}else Z+=K[0];L=T.keywordPatternRe.lastIndex,K=T.keywordPatternRe.exec(C)}Z+=C.substring(L),P.addText(Z)}function Oe(){if(C==="")return;let L=null;if(typeof T.subLanguage=="string"){if(!t[T.subLanguage]){P.addText(C);return}L=f(T.subLanguage,C,!0,V[T.subLanguage]),V[T.subLanguage]=L._top}else L=b(C,T.subLanguage.length?T.subLanguage:null);T.relevance>0&&(ne+=L.relevance),P.__addSublanguage(L._emitter,L.language)}function Ne(){T.subLanguage!=null?Oe():ye(),C=""}function Be(L,K){L!==""&&(P.startScope(K),P.addText(L),P.endScope())}function lt(L,K){let Z=1;const se=K.length-1;for(;Z<=se;){if(!L._emit[Z]){Z++;continue}const D=M.classNameAliases[L[Z]]||L[Z],F=K[Z];D?Be(F,D):(C=F,ye(),C=""),Z++}}function Lt(L,K){return L.scope&&typeof L.scope=="string"&&P.openNode(M.classNameAliases[L.scope]||L.scope),L.beginScope&&(L.beginScope._wrap?(Be(C,M.classNameAliases[L.beginScope._wrap]||L.beginScope._wrap),C=""):L.beginScope._multi&&(lt(L.beginScope,K),C="")),T=Object.create(L,{parent:{value:T}}),T}function bt(L,K,Z){let se=N4(L.endRe,Z);if(se){if(L["on:end"]){const D=new Ia(L);L["on:end"](K,D),D.isMatchIgnored&&(se=!1)}if(se){for(;L.endsParent&&L.parent;)L=L.parent;return L}}if(L.endsWithParent)return bt(L.parent,K,Z)}function Yt(L){return T.matcher.regexIndex===0?(C+=L[0],1):(oe=!0,0)}function xt(L){const K=L[0],Z=L.rule,se=new Ia(Z),D=[Z.__beforeBegin,Z["on:begin"]];for(const F of D)if(F&&(F(L,se),se.isMatchIgnored))return Yt(K);return Z.skip?C+=K:(Z.excludeBegin&&(C+=K),Ne(),!Z.returnBegin&&!Z.excludeBegin&&(C=K)),Lt(Z,L),Z.returnBegin?0:K.length}function Qn(L){const K=L[0],Z=E.substring(L.index),se=bt(T,L,Z);if(!se)return Ba;const D=T;T.endScope&&T.endScope._wrap?(Ne(),Be(K,T.endScope._wrap)):T.endScope&&T.endScope._multi?(Ne(),lt(T.endScope,L)):D.skip?C+=K:(D.returnEnd||D.excludeEnd||(C+=K),Ne(),D.excludeEnd&&(C=K));do T.scope&&P.closeNode(),!T.skip&&!T.subLanguage&&(ne+=T.relevance),T=T.parent;while(T!==se.parent);return se.starts&&Lt(se.starts,L),D.returnEnd?0:K.length}function g(){const L=[];for(let K=T;K!==M;K=K.parent)K.scope&&L.unshift(K.scope);L.forEach(K=>P.openNode(K))}let x={};function $(L,K){const Z=K&&K[0];if(C+=L,Z==null)return Ne(),0;if(x.type==="begin"&&K.type==="end"&&x.index===K.index&&Z===""){if(C+=E.slice(K.index,K.index+1),!r){const se=new Error(`0 width match regex (${v})`);throw se.languageName=v,se.badRule=x.rule,se}return 1}if(x=K,K.type==="begin")return xt(K);if(K.type==="illegal"&&!A){const se=new Error('Illegal lexeme "'+Z+'" for mode "'+(T.scope||"<unnamed>")+'"');throw se.mode=T,se}else if(K.type==="end"){const se=Qn(K);if(se!==Ba)return se}if(K.type==="illegal"&&Z==="")return C+=`
`,1;if(te>1e5&&te>K.index*3)throw new Error("potential infinite loop, way more iterations than matches");return C+=Z,Z.length}const M=y(v);if(!M)throw wn(o.replace("{}",v)),new Error('Unknown language: "'+v+'"');const O=gk(M);let N="",T=X||O;const V={},P=new a.__emitter(a);g();let C="",ne=0,Y=0,te=0,oe=!1;try{if(M.__emitTokens)M.__emitTokens(E,P);else{for(T.matcher.considerAll();;){te++,oe?oe=!1:T.matcher.considerAll(),T.matcher.lastIndex=Y;const L=T.matcher.exec(E);if(!L)break;const K=E.substring(Y,L.index),Z=$(K,L);Y=L.index+Z}$(E.substring(Y))}return P.finalize(),N=P.toHTML(),{language:v,value:N,relevance:ne,illegal:!1,_emitter:P,_top:T}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:v,value:Vr(E),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:Y,context:E.slice(Y-100,Y+100),mode:L.mode,resultSoFar:N},_emitter:P};if(r)return{language:v,value:Vr(E),illegal:!1,relevance:0,errorRaised:L,_emitter:P,_top:T};throw L}}function u(v){const E={value:Vr(v),illegal:!1,relevance:0,_top:s,_emitter:new a.__emitter(a)};return E._emitter.addText(v),E}function b(v,E){E=E||a.languages||Object.keys(t);const A=u(v),X=E.filter(y).filter(U).map(Ne=>f(Ne,v,!1));X.unshift(A);const ie=X.sort((Ne,Be)=>{if(Ne.relevance!==Be.relevance)return Be.relevance-Ne.relevance;if(Ne.language&&Be.language){if(y(Ne.language).supersetOf===Be.language)return 1;if(y(Be.language).supersetOf===Ne.language)return-1}return 0}),[xe,ye]=ie,Oe=xe;return Oe.secondBest=ye,Oe}function p(v,E,A){const X=E&&n[E]||A;v.classList.add("hljs"),v.classList.add(`language-${X}`)}function m(v){let E=null;const A=l(v);if(c(A))return;if(ge("before:highlightElement",{el:v,language:A}),v.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",v);return}if(v.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(v)),a.throwUnescapedHTML))throw new xk("One of your code blocks includes unescaped HTML.",v.innerHTML);E=v;const X=E.textContent,ie=A?d(X,{language:A,ignoreIllegals:!0}):b(X);v.innerHTML=ie.value,v.dataset.highlighted="yes",p(v,A,ie.language),v.result={language:ie.language,re:ie.relevance,relevance:ie.relevance},ie.secondBest&&(v.secondBest={language:ie.secondBest.language,relevance:ie.secondBest.relevance}),ge("after:highlightElement",{el:v,result:ie,text:X})}function S(v){a=Na(a,v)}const I=()=>{_(),Mn("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function z(){_(),Mn("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let R=!1;function _(){function v(){_()}if(document.readyState==="loading"){R||window.addEventListener("DOMContentLoaded",v,!1),R=!0;return}document.querySelectorAll(a.cssSelector).forEach(m)}function k(v,E){let A=null;try{A=E(e)}catch(X){if(wn("Language definition for '{}' could not be registered.".replace("{}",v)),r)wn(X);else throw X;A=s}A.name||(A.name=v),t[v]=A,A.rawDefinition=E.bind(null,e),A.aliases&&W(A.aliases,{languageName:v})}function B(v){delete t[v];for(const E of Object.keys(n))n[E]===v&&delete n[E]}function w(){return Object.keys(t)}function y(v){return v=(v||"").toLowerCase(),t[v]||t[n[v]]}function W(v,{languageName:E}){typeof v=="string"&&(v=[v]),v.forEach(A=>{n[A.toLowerCase()]=E})}function U(v){const E=y(v);return E&&!E.disableAutodetect}function q(v){v["before:highlightBlock"]&&!v["before:highlightElement"]&&(v["before:highlightElement"]=E=>{v["before:highlightBlock"](Object.assign({block:E.el},E))}),v["after:highlightBlock"]&&!v["after:highlightElement"]&&(v["after:highlightElement"]=E=>{v["after:highlightBlock"](Object.assign({block:E.el},E))})}function le(v){q(v),i.push(v)}function J(v){const E=i.indexOf(v);E!==-1&&i.splice(E,1)}function ge(v,E){const A=v;i.forEach(function(X){X[A]&&X[A](E)})}function ae(v){return Mn("10.7.0","highlightBlock will be removed entirely in v12.0"),Mn("10.7.0","Please use highlightElement now."),m(v)}Object.assign(e,{highlight:d,highlightAuto:b,highlightAll:_,highlightElement:m,highlightBlock:ae,configure:S,initHighlighting:I,initHighlightingOnLoad:z,registerLanguage:k,unregisterLanguage:B,listLanguages:w,getLanguage:y,registerAliases:W,autoDetection:U,inherit:Na,addPlugin:le,removePlugin:J}),e.debugMode=function(){r=!1},e.safeMode=function(){r=!0},e.versionString=bk,e.regex={concat:$n,lookahead:wd,either:ss,optional:M4,anyNumberOfTimes:R4};for(const v in Mi)typeof Mi[v]=="object"&&yd(Mi[v]);return Object.assign(e,Mi),e},qn=Id({});qn.newInstance=()=>Id({});var vk=qn;qn.HighlightJS=qn;qn.default=qn;const mt=up(vk),Pa="[A-Za-z$_][0-9A-Za-z$_]*",wk=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],kk=["true","false","null","undefined","NaN","Infinity"],Ld=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Rd=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Md=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],_k=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Sk=[].concat(Md,Ld,Rd);function Od(e){const t=e.regex,n=(A,{after:X})=>{const ie="</"+A[0].slice(1);return A.input.indexOf(ie,X)!==-1},i=Pa,r={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(A,X)=>{const ie=A[0].length+A.index,xe=A.input[ie];if(xe==="<"||xe===","){X.ignoreMatch();return}xe===">"&&(n(A,{after:ie})||X.ignoreMatch());let ye;const Oe=A.input.substring(ie);if(ye=Oe.match(/^\s*=/)){X.ignoreMatch();return}if((ye=Oe.match(/^\s+extends\s+/))&&ye.index===0){X.ignoreMatch();return}}},a={$pattern:Pa,keyword:wk,literal:kk,built_in:Sk,"variable.language":_k},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",f={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},b={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},p={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},m={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},z={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},R=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,p,m,S,{match:/\$\d+/},f];u.contains=R.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(R)});const _=[].concat(z,u.contains),k=_.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(_)}]),B={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:k},w={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,t.concat(i,"(",t.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},y={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ld,...Rd]}},W={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},U={variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},q={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function le(A){return t.concat("(?!",A.join("|"),")")}const J={match:t.concat(/\b/,le([...Md,"super","import"].map(A=>`${A}\\s*\\(`)),i,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},ge={begin:t.concat(/\./,t.lookahead(t.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},ae={match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},v="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",E={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(v)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:y},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),W,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,p,m,S,z,{match:/\$\d+/},f,y,{scope:"attr",match:i+t.lookahead(":"),relevance:0},E,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[z,e.REGEXP_MODE,{className:"function",begin:v,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:o},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},U,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},ge,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},J,q,w,ae,{match:/\$[(.]/}]}}const tr="[A-Za-z$_][0-9A-Za-z$_]*",Nd=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Bd=["true","false","null","undefined","NaN","Infinity"],Pd=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Dd=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],zd=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Wd=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Hd=[].concat(zd,Pd,Dd);function $k(e){const t=e.regex,n=(A,{after:X})=>{const ie="</"+A[0].slice(1);return A.input.indexOf(ie,X)!==-1},i=tr,r={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(A,X)=>{const ie=A[0].length+A.index,xe=A.input[ie];if(xe==="<"||xe===","){X.ignoreMatch();return}xe===">"&&(n(A,{after:ie})||X.ignoreMatch());let ye;const Oe=A.input.substring(ie);if(ye=Oe.match(/^\s*=/)){X.ignoreMatch();return}if((ye=Oe.match(/^\s+extends\s+/))&&ye.index===0){X.ignoreMatch();return}}},a={$pattern:tr,keyword:Nd,literal:Bd,built_in:Hd,"variable.language":Wd},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",f={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},b={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},p={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},m={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},S={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},z={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:i+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},R=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,p,m,S,{match:/\$\d+/},f];u.contains=R.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(R)});const _=[].concat(z,u.contains),k=_.concat([{begin:/(\s*)\(/,end:/\)/,keywords:a,contains:["self"].concat(_)}]),B={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:k},w={variants:[{match:[/class/,/\s+/,i,/\s+/,/extends/,/\s+/,t.concat(i,"(",t.concat(/\./,i),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,i],scope:{1:"keyword",3:"title.class"}}]},y={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pd,...Dd]}},W={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},U={variants:[{match:[/function/,/\s+/,i,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},q={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function le(A){return t.concat("(?!",A.join("|"),")")}const J={match:t.concat(/\b/,le([...zd,"super","import"].map(A=>`${A}\\s*\\(`)),i,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},ge={begin:t.concat(/\./,t.lookahead(t.concat(i,/(?![0-9A-Za-z$_(])/))),end:i,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},ae={match:[/get|set/,/\s+/,i,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},v="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",E={match:[/const|var|let/,/\s+/,i,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(v)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:y},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),W,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,p,m,S,z,{match:/\$\d+/},f,y,{scope:"attr",match:i+t.lookahead(":"),relevance:0},E,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[z,e.REGEXP_MODE,{className:"function",begin:v,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:r.begin,end:r.end},{match:o},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},U,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:i,className:"title.function"})]},{match:/\.\.\./,relevance:0},ge,{match:"\\$"+i,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},J,q,w,ae,{match:/\$[(.]/}]}}function jd(e){const t=e.regex,n=$k(e),i=tr,r=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],o={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},s={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:r},contains:[n.exports.CLASS_REFERENCE]},a={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},c=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],l={$pattern:tr,keyword:Nd.concat(c),literal:Bd,built_in:Hd.concat(r),"variable.language":Wd},d={className:"meta",begin:"@"+i},f=(m,S,I)=>{const z=m.contains.findIndex(R=>R.label===S);if(z===-1)throw new Error("can not find mode to replace");m.contains.splice(z,1,I)};Object.assign(n.keywords,l),n.exports.PARAMS_CONTAINS.push(d);const u=n.contains.find(m=>m.scope==="attr"),b=Object.assign({},u,{match:t.concat(i,t.lookahead(/\s*\?:/))});n.exports.PARAMS_CONTAINS.push([n.exports.CLASS_REFERENCE,u,b]),n.contains=n.contains.concat([d,o,s,b]),f(n,"shebang",e.SHEBANG()),f(n,"use_strict",a);const p=n.contains.find(m=>m.label==="func.def");return p.relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),n}function Fd(e){const t=e.regex,n=/[\p{XID_Start}_]\p{XID_Continue}*/u,i=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],a={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:i,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},c={className:"meta",begin:/^(>>>|\.\.\.) /},l={className:"subst",begin:/\{/,end:/\}/,keywords:a,illegal:/#/},d={begin:/\{\{/,relevance:0},f={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,c],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,c],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,c,d,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,c,d,l]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,d,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,d,l]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},u="[0-9](_?[0-9])*",b=`(\\b(${u}))?\\.(${u})|\\b(${u})\\.`,p=`\\b|${i.join("|")}`,m={className:"number",relevance:0,variants:[{begin:`(\\b(${u})|(${b}))[eE][+-]?(${u})[jJ]?(?=${p})`},{begin:`(${b})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${p})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${p})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${p})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${p})`},{begin:`\\b(${u})[jJ](?=${p})`}]},S={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:a,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},I={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:["self",c,m,f,e.HASH_COMMENT_MODE]}]};return l.contains=[f,m,c],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:a,illegal:/(<\/|\?)|=>/,contains:[c,m,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},f,S,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,n],scope:{1:"keyword",3:"title.function"},contains:[I]},{variants:[{match:[/\bclass/,/\s+/,n,/\s*/,/\(\s*/,n,/\s*\)/]},{match:[/\bclass/,/\s+/,n]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[m,I,f]}]}}function Kd(e){const t=e.regex,n={},i={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},i]});const r={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},o=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),s={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},a={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,r]};r.contains.push(a);const c={match:/\\"/},l={className:"string",begin:/'/,end:/'/},d={match:/\\'/},f={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},u=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],b=e.SHEBANG({binary:`(${u.join("|")})`,relevance:10}),p={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},m=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],S=["true","false"],I={match:/(\/[a-z._-]+)+/},z=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],R=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],_=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],k=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:m,literal:S,built_in:[...z,...R,"set","shopt",..._,...k]},contains:[b,e.SHEBANG(),p,f,o,s,I,a,c,l,d,n]}}function Ek(e){const t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},n={match:/[{}[\],:]/,className:"punctuation",relevance:0},i=["true","false","null"],r={scope:"literal",beginKeywords:i.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:i},contains:[t,n,e.QUOTE_STRING_MODE,r,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}mt.registerLanguage("javascript",Od);mt.registerLanguage("js",Od);mt.registerLanguage("typescript",jd);mt.registerLanguage("ts",jd);mt.registerLanguage("python",Fd);mt.registerLanguage("py",Fd);mt.registerLanguage("bash",Kd);mt.registerLanguage("sh",Kd);mt.registerLanguage("json",Ek);function Ck(e,t){const n=t&&mt.getLanguage(t)?t:"";if(!n)return{html:Da(e),language:""};try{return{html:mt.highlight(e,{language:n,ignoreIllegals:!0}).value,language:n}}catch{return{html:Da(e),language:""}}}function Da(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const Ak=`
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
`;function Tk(e){const t=[],n=e.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi,(r,o)=>(t.push(o),"")),i=t.join(`
`);return i.trim()?hp.inlineContent(n,i,{inlinePseudoElements:!1,preserveImportant:!1,preserveMediaQueries:!1,preserveFontFaces:!1,removeStyleTags:!0}):n}function En(e){const n=new DOMParser().parseFromString(`<!doctype html><html><body><div id="__wx_root__">${e}</div></body></html>`,"text/html"),i=n.getElementById("__wx_root__");return{doc:n,container:i}}function Xn(e){return e.innerHTML}function Jn(e){if(!e)return[];const t=[],n="\0";let i=0,r="";for(const o of e)o==="("&&i++,o===")"&&(i=Math.max(0,i-1)),r+=i>0&&o===";"?n:o;for(const o of r.split(";")){const s=o.replace(new RegExp(n,"g"),";").trim();if(!s)continue;const a=s.indexOf(":");if(a<0)continue;let c=s.slice(0,a).trim(),l=s.slice(a+1).trim(),d=!1;/!important\s*$/i.test(l)&&(d=!0,l=l.replace(/!important\s*$/i,"").trim()),!(!c||!l)&&t.push({prop:c,value:l,important:d})}return t}function $i(e){return e.map(t=>`${t.prop}: ${t.value}${t.important?" !important":""}`).join("; ")}function _n(e,t){const n=[e];for(;n.length;){const i=n.pop();t(i);for(let r=i.children.length-1;r>=0;r--)n.push(i.children[r])}}function qd(e){let t=e;for(;t;){if(t.tagName.toLowerCase()==="svg")return!0;t=t.parentElement}return!1}function ls(e,t){const{container:n}=En(e);return n.querySelectorAll("svg").forEach(r=>{_n(r,t)}),Xn(n)}const za="data-wx-list-wrap",Ik="data-wx-list-flatten",Lk="· ";function Rk(e){const{container:t}=En(e),n=[];_n(t,r=>{const o=r.tagName.toLowerCase();o!=="ul"&&o!=="ol"||Mk(r)===2&&n.push(r)});for(const r of n){const o=Ud(r);r.parentElement?.replaceChild(o,r)}const i=[];_n(t,r=>{const o=r.tagName.toLowerCase();if(o!=="ul"&&o!=="ol")return;const s=r.parentElement;s&&s.hasAttribute(za)||i.push(r)});for(const r of i){const o=r.ownerDocument.createElement("section");o.setAttribute(za,"");const s=r.getAttribute("style")??"";s&&o.setAttribute("style",s),r.parentElement?.insertBefore(o,r),o.appendChild(r)}return Xn(t)}function Mk(e){let t=0,n=e.parentElement;for(;n;){const i=n.tagName.toLowerCase();(i==="ul"||i==="ol")&&t++,n=n.parentElement}return t}function Ud(e){const t=e.ownerDocument,n=t.createDocumentFragment(),i=Array.from(e.children).filter(r=>r.tagName.toLowerCase()==="li");for(const r of i){const o=Array.from(r.children).filter(c=>{const l=c.tagName.toLowerCase();return l==="ul"||l==="ol"});for(const c of o){const l=Ud(c);r.replaceChild(l,c)}const s=t.createElement("p");s.setAttribute(Ik,""),s.appendChild(t.createTextNode(Lk));const a=[];for(;r.firstChild;){const c=r.firstChild;c.nodeType===1&&c.tagName.toLowerCase()==="p"?(a.push(c),r.removeChild(c)):s.appendChild(c)}s.childNodes.length>1&&n.appendChild(s);for(const c of a)n.appendChild(c)}return n}const Ok=/^(fn|fnref|footnote)[-\d]/i;function Nk(e){const{container:t}=En(e);return _n(t,n=>{if(n.hasAttribute("id")){const s=n.getAttribute("id")??"";(qd(n)||!Ok.test(s))&&n.removeAttribute("id")}const i=n.getAttribute("style");if(!i)return;const r=Jn(i),o=r.filter(s=>!md.has(s.prop.toLowerCase()));o.length!==r.length&&(o.length===0?n.removeAttribute("style"):n.setAttribute("style",$i(o)))}),Xn(t)}function Bk(e){const{container:t}=En(e),n=[],i=t.getElementsByTagName("*");for(let r=0;r<i.length;r++){const o=i[r],s=o.tagName.toLowerCase();if(bd.has(s)){n.push(o);continue}if(s==="iframe"){const a=o.getAttribute("src")??"";xd.some(l=>l.test(a))||n.push(o)}}for(const r of n)r.remove();return Xn(t)}function Pk(e){const{container:t}=En(e);return _n(t,n=>{const i=n.getAttribute("style");if(!i)return;const r=Jn(i),o=r.filter(s=>s.prop.toLowerCase()!=="font-family");o.length!==r.length&&(o.length===0?n.removeAttribute("style"):n.setAttribute("style",$i(o)))}),Xn(t)}const Dk=/url\(\s*(['"])([^'"]*)\1\s*\)/g;function Wa(e){return e.replace(Dk,(t,n,i)=>`url(${i})`)}function zk(e){return ls(e,t=>{for(let i=0;i<t.attributes.length;i++){const r=t.attributes[i];if(!r.value.includes("url("))continue;const o=Wa(r.value);o!==r.value&&t.setAttribute(r.name,o)}const n=t.getAttribute("style");if(n&&n.includes("url(")){const i=Jn(n).map(r=>({...r,value:Wa(r.value)}));t.setAttribute("style",$i(i))}})}function Wk(e){return ls(e,t=>{t.hasAttribute("id")&&t.removeAttribute("id")})}const Hk="data-wx-keep-flex";function jk(e){const{container:t}=En(e);return _n(t,n=>{if(n.hasAttribute(Hk))return;const i=n.getAttribute("style");if(!i)return;const r=Jn(i);let o=!1;const s=r.map(a=>{if(a.prop.toLowerCase()!=="display")return a;const c=a.value.toLowerCase();return c==="flex"||c==="inline-flex"?(o=!0,{...a,value:c==="inline-flex"?"inline-block":"block"}):a});o&&n.setAttribute("style",$i(s))}),Xn(t)}const Fk=new Set(["#fff","#ffffff","white"]),Kk=/^\s*rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)\s*$/i;function Ha(e){const t=e.trim().toLowerCase();return Fk.has(t)||Kk.test(t)}const qk=new Set(["fill","stroke","stop-color","flood-color","lighting-color"]),Uk=new Set(["fill","stroke","color","background","background-color","stop-color"]);function Vk(e){return ls(e,t=>{for(const r of Array.from(qk)){const o=t.getAttribute(r);o&&Ha(o)&&t.setAttribute(r,Ta)}const n=t.getAttribute("style");if(!n)return;const i=Jn(n).map(r=>Uk.has(r.prop.toLowerCase())&&Ha(r.value)?{...r,value:Ta}:r);t.setAttribute("style",$i(i))})}const Gk="data-wx-list-wrap",Yk="data-wx-keep-flex",Zk=/^(fn|fnref|footnote)[-\d]/i;function Xk(e){const t={listWrap:0,deepList:0,strippedId:0,strippedPos:0,hardTag:0,disallowedIframe:0,fontFamily:0,flexFallback:0,svgId:0};if(e&&e.trim())try{const{container:i}=En(e);_n(i,r=>{if(r===i)return;const o=r.tagName.toLowerCase();if(o==="ul"||o==="ol"){const a=r.parentElement;(!a||!a.hasAttribute(Gk))&&t.listWrap++;let c=0,l=r.parentElement;for(;l;){const d=l.tagName.toLowerCase();(d==="ul"||d==="ol")&&c++,l=l.parentElement}c===2&&t.deepList++}if(r.hasAttribute("id")){const a=r.getAttribute("id")??"";qd(r)?t.svgId++:Zk.test(a)||t.strippedId++}if(bd.has(o)&&t.hardTag++,o==="iframe"){const a=r.getAttribute("src")??"";xd.some(l=>l.test(a))||t.disallowedIframe++}const s=r.getAttribute("style");if(s){const a=Jn(s);for(const c of a){const l=c.prop.toLowerCase();md.has(l)&&t.strippedPos++,l==="font-family"&&t.fontFamily++,l==="display"&&/flex/i.test(c.value)&&!r.hasAttribute(Yk)&&t.flexFallback++}}})}catch{}const n=[];return t.listWrap&&n.push({patch:"patchListWrap",label:"列表外包 <section>（保住外边距）",count:t.listWrap}),t.deepList&&n.push({patch:"patchListWrap",label:"≥ 3 层嵌套列表扁平化为段落",count:t.deepList}),t.strippedId&&n.push({patch:"stripForbiddenAttrs",label:"删除 id 属性（脚注锚点除外）",count:t.strippedId}),t.strippedPos&&n.push({patch:"stripForbiddenAttrs",label:"剥离 position/top/z-index 等定位声明",count:t.strippedPos}),t.hardTag&&n.push({patch:"stripForbiddenTags",label:"移除 style/script/meta/link 等标签",count:t.hardTag}),t.disallowedIframe&&n.push({patch:"stripForbiddenTags",label:"剥离非白名单 iframe",count:t.disallowedIframe}),t.fontFamily&&n.push({patch:"stripFontFamily",label:"剥离 inline font-family",count:t.fontFamily}),t.flexFallback&&n.push({patch:"patchFlexToFallback",label:"display:flex → block 降级",count:t.flexFallback}),t.svgId&&n.push({patch:"patchSvgIds",label:"SVG 子树 id 清理",count:t.svgId}),{entries:n,total:n.reduce((i,r)=>i+r.count,0)}}function Jk(e,t={}){let n=e;return n=Rk(n),n=Nk(n),n=Bk(n),n=Pk(n),n=zk(n),n=Wk(n),n=jk(n),t.svgWhiteBg!==!1&&(n=Vk(n)),n}const Qk="markdown-body",e6=8,un=new Map;function t6(e){const t=un.get(e.id);if(t)return un.delete(e.id),un.set(e.id,t),t;const n=x4({theme:e});if(n.renderer.rules.fence=(i,r)=>{const o=i[r],a=(o.info?o.info.trim():"").split(/\s+/)[0]??"",{html:c,language:l}=Ck(o.content,a);return(ka[e.variants.codeBlock]??ka.bare).render(e,{language:l,codeInnerHtml:c})+`
`},un.set(e.id,n),un.size>e6){const i=un.keys().next().value;i!==void 0&&un.delete(i)}return n}function n6(e){const{md:t,theme:n}=e,r=t6(n).render(t),o=C4(n),s=[`<section class="${Qk}">`,`<style>${o}
${Ak}</style>`,r,"</section>"].join(`
`),a=Tk(s),c=Xk(a),l=Jk(a,e.wxPatch),d=i6(t),f=Math.max(1,Math.ceil(d/300));return{html:l,wordCount:d,readingTime:f,patchLog:c}}function i6(e){const t=(e.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g)??[]).length,n=e.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g," ").split(/\s+/).filter(Boolean).length;return t+n}const r6={html:"",wordCount:0,readingTime:1,patchLog:{entries:[],total:0}};function o6(e,t={}){const n=t.delayMs??80,i=t.immediate??!0,r=he(r6);let o=null;function s(l){try{r.value=n6(l)}catch(d){console.error("[useDebouncedRender] render failed:",d),r.value={html:`<pre style="color:#c00;padding:16px;white-space:pre-wrap">渲染失败：${s6(String(d))}</pre>`,wordCount:0,readingTime:1,patchLog:{entries:[],total:0}}}}function a(l){o!==null&&window.clearTimeout(o),o=window.setTimeout(()=>{o=null,s(l)},n)}function c(){o!==null&&(window.clearTimeout(o),o=null),s(e.value)}return nt(e,l=>{a(l)},{immediate:i}),sn(()=>{o!==null&&(window.clearTimeout(o),o=null)}),{rendered:r,flush:c}}function s6(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function a6(){const e=kn({leftSlot:null,rightSlot:null,commandOpen:!1,helpOpen:!1}),t=Ae(()=>({drafts:e.leftSlot==="drafts",components:e.rightSlot==="components",customizer:e.rightSlot==="customizer",checklist:e.rightSlot==="checklist"}));function n(o){e.leftSlot=e.leftSlot===o?null:o}function i(o){e.rightSlot=e.rightSlot===o?null:o}function r(){e.leftSlot=null,e.rightSlot=null}return{ui:e,drawerStates:t,toggleLeft:n,toggleRight:i,closeAll:r}}const c6=400,l6=1800;function d6(e){const t=he(null),n=he(0),i=he("idle"),r=he("");let o=null;const s=he(null);let a=null,c=null,l=null;function d(w,y=1500){r.value=w,o!==null&&window.clearTimeout(o),o=window.setTimeout(()=>r.value="",y)}const f=Ae(()=>r.value?r.value:i.value==="saving"?"保存中…":i.value==="saved"?"已保存":"　"),u=Ae(()=>r.value?"saved":i.value);function b(w,y){s.value={message:w,restore:y}}function p(){s.value?.restore(),s.value=null}function m(){s.value=null}const S=Ae(()=>(n.value,t.value?mn().find(w=>w.id===t.value)?.title??"":""));function I(){a!==null&&(window.clearTimeout(a),a=null),c!==null&&t.value&&(Zi(t.value,{body:c}),c=null,n.value+=1,i.value="saved",l!==null&&window.clearTimeout(l),l=window.setTimeout(()=>{i.value==="saved"&&(i.value="idle")},l6))}nt(e.md,w=>{t.value&&(c=w,i.value="saving",a!==null&&window.clearTimeout(a),a=window.setTimeout(I,c6))});function z(w="default"){const y=El();if(y){const U=Nn(y);if(U){t.value=U.id,e.md.value=U.body,U.themeId&&(e.baseThemeId.value=U.themeId);return}}const W=mn();if(W.length>0){const U=W[0];t.value=U.id,bn(U.id);const q=Nn(U.id)?.body??"";e.md.value=q,U.themeId&&(e.baseThemeId.value=U.themeId)}else{const U=hr({title:"wechat-typeset 示例",body:e.getSample(w),themeId:w});t.value=U.id,e.md.value=U.body}}function R(){t.value&&(c=e.md.value,I(),d("已保存"))}function _(w){if(w===t.value)return;I();const y=Nn(w);y&&(t.value=y.id,bn(y.id),e.md.value=y.body,y.themeId&&(e.baseThemeId.value=y.themeId),n.value+=1)}function k(w,y){const W=Nn(w);if(!W)return;const U=t.value===w;if(f0(w),U){const q=mn()[0];if(q){const le=Nn(q.id)?.body??"";t.value=q.id,bn(q.id),e.md.value=le,q.themeId&&(e.baseThemeId.value=q.themeId)}else t.value=null,e.md.value=""}n.value+=1,b(`已删除「${y}」`,()=>{const q={...W};Cl(JSON.stringify({version:1,drafts:[q]})),t.value=q.id,bn(q.id),e.md.value=q.body,q.themeId&&(e.baseThemeId.value=q.themeId),n.value+=1})}function B(w="wechat-typeset-export"){return(mn().find(W=>W.id===t.value)?.title??w).replace(/[\\/:*?"<>|\s]+/g,"-")||w}return{activeDraftId:t,draftIndexTick:n,savingState:i,displayedSavingLabel:f,displayedSavingState:u,currentDraftTitle:S,undo:s,initActiveDraft:z,handleSave:R,handleSelectDraft:_,handleDeleteDraftRequest:k,flushDraftSave:I,pingTransient:d,showUndo:b,onUndo:p,onUndoExpire:m,fileStem:B}}async function p6(e,t){if(typeof navigator<"u"&&navigator.clipboard&&typeof window<"u"&&window.isSecureContext&&typeof ClipboardItem<"u")try{const n=new Blob([e],{type:"text/html"}),i=new Blob([t],{type:"text/plain"}),r=new ClipboardItem({"text/html":Promise.resolve(n),"text/plain":Promise.resolve(i)});return await navigator.clipboard.write([r]),{ok:!0,mode:"clipboard-api"}}catch(n){console.warn("[copyHtml] Clipboard API failed, fallback to execCommand:",n)}try{const n=document.createElement("div");n.setAttribute("contenteditable","true"),n.style.position="fixed",n.style.left="-9999px",n.style.top="0",n.innerHTML=e,document.body.appendChild(n);const i=document.createRange();i.selectNodeContents(n);const r=window.getSelection();if(!r)throw new Error("no selection");r.removeAllRanges(),r.addRange(i);const o=document.execCommand("copy");if(r.removeAllRanges(),document.body.removeChild(n),!o)throw new Error("execCommand copy returned false");return{ok:!0,mode:"exec-command"}}catch(n){return{ok:!1,mode:"failed",error:String(n)}}}const yo="share=",vo=1;function f6(e){const t=JSON.stringify({v:vo,md:e.md,themeId:e.themeId});return x6(m6(t))}function u6(e){if(!e)return null;try{const t=y6(e),n=b6(t),i=JSON.parse(n);return!v6(i)||i.v!==vo||typeof i.md!="string"||typeof i.themeId!="string"?null:{v:vo,md:i.md,themeId:i.themeId}}catch{return null}}function h6(e,t={}){const n=t.origin??(typeof location<"u"?location.origin:""),i=t.pathname??(typeof location<"u"?location.pathname:"/");return`${n}${i}#${yo}${f6(e)}`}function g6(e){if(!e)return null;const t=e.startsWith("#")?e.slice(1):e;return t.startsWith(yo)?u6(t.slice(yo.length)):null}function m6(e){return new TextEncoder().encode(e)}function b6(e){return new TextDecoder().decode(e)}function x6(e){let t="";for(let i=0;i<e.length;i++)t+=String.fromCharCode(e[i]);return(typeof btoa=="function"?btoa(t):Ua.from(t,"binary").toString("base64")).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function y6(e){const t=(4-e.length%4)%4,n=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat(t),i=typeof atob=="function"?atob(n):Ua.from(n,"base64").toString("binary"),r=new Uint8Array(i.length);for(let o=0;o<i.length;o++)r[o]=i.charCodeAt(o);return r}function v6(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Vd="wechat-typeset:outlink-strategy";function w6(){const e=tn(Vd);return e&&vl.includes(e)?e:"keep"}function k6(e){const t=he(w6()),n=he(null);function i(c){t.value=c,nn(Vd,c)}async function r(){e.flush();const c=e.rendered.value.html,{html:l,count:d}=Am(c,t.value),f=e.md.value,u=await p6(l,f);if(u.ok){const b=d>0&&t.value==="tail-list"?`（${d} 条外链已尾注）`:d>0&&t.value==="drop"?`（${d} 条外链已丢弃）`:"",p=u.mode==="clipboard-api"?"已复制":"已复制（降级）";e.pingTransient(p+b),n.value=null}else n.value=`复制失败：${u.error??"未知错误"}（请换 Chrome/Safari 或关闭跨域 iframe）`}async function o(){const c={md:e.md.value,themeId:e.baseThemeId.value},l=h6(c);try{navigator.clipboard?.writeText?(await navigator.clipboard.writeText(l),e.pingTransient("已复制分享链接")):(location.hash=l.slice(l.indexOf("#")),e.pingTransient("请从地址栏复制当前链接"))}catch{n.value="分享链接复制失败：请手动复制地址栏 URL"}}function s(c){return`[分享] ${(c.split(`
`).map(f=>f.trim()).find(f=>f.length>0)??"").replace(/^#+\s*/,"").slice(0,20)||"未命名"}`}function a(c){if(typeof location>"u")return!1;const l=g6(location.hash);if(!l)return!1;const d=hr({title:s(l.md),body:l.md,themeId:l.themeId});bn(d.id),c(d.id,d.body,d.themeId),e.draftIndexTick.value+=1;try{history.replaceState(null,"",location.pathname+location.search)}catch{location.hash=""}return e.pingTransient("已从分享链接载入新草稿",2500),!0}return{outlinkStrategy:t,setOutlinkStrategy:i,persistentError:n,handleCopy:r,handleCopyShareLink:o,tryLoadShareFromHash:a}}const _6="modulepreload",S6=function(e){return"https://cdn.jsdelivr.net/gh/lync-cyber/wechat-typeset@jsdelivr-cdn/"+e},ja={},$6=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=s?.nonce||s?.getAttribute("nonce");r=Promise.allSettled(n.map(c=>{if(c=S6(c),c in ja)return;ja[c]=!0;const l=c.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=l?"stylesheet":_6,l||(f.as="script"),f.crossOrigin="",f.href=c,a&&f.setAttribute("nonce",a),document.head.appendChild(f),l)return new Promise((u,b)=>{f.addEventListener("load",u),f.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return r.then(s=>{for(const a of s||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})};function Gd(e,t,n){const i=new Blob([t],{type:n}),r=URL.createObjectURL(i),o=document.createElement("a");o.href=r,o.download=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r)}function E6(e,t,n={}){const i=L6(I6(e)),r=n.background??"#ffffff",o=n.color??"#222222",s=`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=375,initial-scale=1"><title>${i}</title><style>body{margin:0;padding:24px 0;background:${r};color:${o};font-family:"PingFang SC","Microsoft YaHei",sans-serif;}.wechat-typeset-wrap{max-width:640px;margin:0 auto;padding:0 16px;}</style></head><body><div class="wechat-typeset-wrap">${t}</div></body></html>`;Gd(e,s,"text/html")}function C6(e,t){Gd(e,t,"text/markdown")}async function A6(e,t,n={}){try{const r=(await $6(()=>import("./html2canvas.esm-BfxBtG_O.js"),[])).default,o=T6(e,n.background),s=await r(e,{backgroundColor:o,useCORS:!0,scale:2,logging:!1});return await new Promise(a=>{s.toBlob(c=>{if(!c){a({ok:!1,error:"toBlob 返回 null"});return}const l=URL.createObjectURL(c),d=document.createElement("a");d.href=l,d.download=t,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(l),a({ok:!0})},"image/png")})}catch(i){return{ok:!1,error:i?.message??"长图导出失败"}}}function T6(e,t){if(t)return t;if(t===null)return null;try{const n=e.ownerDocument,i=n?.defaultView;if(!i)return"#ffffff";const o=i.getComputedStyle(e).backgroundColor;if(o&&o!=="rgba(0, 0, 0, 0)"&&o!=="transparent")return o;const s=n.body?i.getComputedStyle(n.body).backgroundColor:"";return s&&s!=="rgba(0, 0, 0, 0)"&&s!=="transparent"?s:"#ffffff"}catch{return"#ffffff"}}function I6(e){const t=e.lastIndexOf(".");return t>0?e.slice(0,t):e}function L6(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function R6(e){function t(){e.flush();const r=e.activeTheme.value.tokens.colors;E6(`${e.fileStem()}.html`,e.rendered.value.html,{background:r.bg,color:r.text}),e.pingTransient("已导出 HTML")}function n(){C6(`${e.fileStem()}.md`,e.md.value),e.pingTransient("已导出 Markdown")}async function i(){e.pingTransient("长图渲染中…",4e3);const r=e.getPreviewBody();if(!r){e.setPersistentError("长图导出失败：未找到预览节点");return}const o=await A6(r,`${e.fileStem()}.png`,{background:e.activeTheme.value.tokens.colors.bg});o.ok?e.pingTransient("已导出长图"):e.setPersistentError(`长图导出失败：${o.error??"未知错误"}`)}return{doExportHtml:t,doExportMd:n,doExportImage:i}}function M6(e){function t(n){const i=n.ctrlKey||n.metaKey,o=!!n.target?.closest('input, textarea, [contenteditable="true"], .cm-editor');if(i){const s=n.key.toLowerCase();if(s==="k"&&!n.shiftKey){n.preventDefault(),e.openCommand();return}if(n.key==="Enter"&&!n.shiftKey){n.preventDefault(),e.copy();return}if(s==="s"&&!n.shiftKey){n.preventDefault(),e.save();return}if(s==="c"&&n.shiftKey){n.preventDefault(),e.toggleCustomizer();return}if(s==="d"&&n.shiftKey){n.preventDefault(),e.toggleDrafts();return}if(s==="p"&&n.shiftKey){n.preventDefault(),e.toggleComponents();return}if(s==="h"&&n.shiftKey){n.preventDefault(),e.exportHtml();return}if(s==="m"&&n.shiftKey){n.preventDefault(),e.exportMd();return}}if(n.key==="?"&&!o){n.preventDefault(),e.openHelp();return}n.key==="Escape"&&(e.closeCommand()||e.closeHelp())}on(()=>{window.addEventListener("keydown",t)}),sn(()=>{window.removeEventListener("keydown",t)})}const O6={default:"geometric","tech-geek":"geometric","life-aesthetic":"soft","business-finance":"geometric","literary-humanism":"serif"};function N6(e){const{base:t,seed:n}=e,i=od(n),r={...t.tokens,colors:i},o=e.variant??O6[t.id]??"geometric",s=fl(t.tokens),a=ul(t.tokens),c=hl(t.tokens),l=Gr(t.elements,s),d=Gr(t.containers,a),f=Gr(t.inline,c);return gl({id:e.id??`${t.id}--custom`,name:e.name??`${t.name} · 自定义`,description:`基于 ${t.name} 的自定义配色`,variant:o,tokens:r,elements:Yr(l,t.tokens.colors,i),containers:Yr(d,t.tokens.colors,i),inline:Yr(f,t.tokens.colors,i)})}function Gr(e,t){const n={};for(const[i,r]of Object.entries(e)){const o=t[i]??{},s={};for(const[a,c]of Object.entries(r))o[a]!==c&&(s[a]=c);Object.keys(s).length>0&&(n[i]=s)}return n}function Yr(e,t,n){const i=P6(t,n),r={};for(const[o,s]of Object.entries(e)){const a={};for(const[c,l]of Object.entries(s))if(typeof l=="string"){let d=l;for(const[f,u]of i)d=D6(d,f,u);a[c]=d}else a[c]=l;r[o]=a}return r}function B6(e){const t=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e.trim());return t?`#${t[1]}${t[1]}${t[2]}${t[2]}${t[3]}${t[3]}`:e}function P6(e,t){const n=[[e.primary,t.primary],[e.secondary,t.secondary],[e.accent,t.accent],[e.bg,t.bg],[e.bgSoft,t.bgSoft],[e.bgMuted,t.bgMuted],[e.text,t.text],[e.textMuted,t.textMuted],[e.textInverse,t.textInverse],[e.border,t.border],[e.code,t.code],[e.status.tip.accent,t.status.tip.accent],[e.status.tip.soft,t.status.tip.soft],[e.status.warning.accent,t.status.warning.accent],[e.status.warning.soft,t.status.warning.soft],[e.status.info.accent,t.status.info.accent],[e.status.info.soft,t.status.info.soft],[e.status.danger.accent,t.status.danger.accent],[e.status.danger.soft,t.status.danger.soft]],i=[];for(const[o,s]of n){i.push([o,s]);const a=B6(o);a!==o&&i.push([a,s])}i.sort((o,s)=>s[0].length-o[0].length);const r=new Set;return i.filter(([o])=>{const s=o.toLowerCase();return r.has(s)?!1:(r.add(s),!0)})}function D6(e,t,n){if(!t)return e;const i=e.toLowerCase(),r=t.toLowerCase();let o="",s=0;for(;s<e.length;)i.slice(s,s+r.length)===r?(o+=n,s+=r.length):(o+=e[s],s+=1);return o}const wo={"academic-frontier":`# 关于对比学习中表征坍缩的一个新观察

::: abstract ABSTRACT
本文重新审视对比学习（contrastive learning）中的*表征坍缩*现象。不同于以往将坍缩归因于负样本不足的主流观点，我们在三个公开基准上的实验表明：**当批次规模固定时，温度系数 *τ* 的选择比负样本数量更能决定坍缩是否发生**。我们进一步给出一个理论解释，并提出一种不依赖于大批次的轻量级缓解方案。
:::

::: author 张三¹, 李四², 王五¹*
¹清华大学 交叉信息研究院  ·  ²上海人工智能实验室  ·  通讯作者：zhang@mails.tsinghua.edu.cn  ·  投稿日期：2026-04-20
:::

::: divider
:::

## 1 引言

对比学习在自监督表征学习中取得了显著进展。SimCLR、MoCo、BYOL 等方法的核心思想是：把同一样本的两个增强视图拉近，把不同样本的视图推远。然而，当负样本不足时，所有样本的表征会坍缩到同一向量——这被称作 [.表征坍缩.]。

::: quote-card Theorem 1.1
设 *X* 为正则化后的表征空间，*τ* 为 InfoNCE 温度系数。若 *τ* 小于临界值 *τ**，则存在非平凡平衡态使得梯度沿维度收缩方向单调下降，坍缩概率 ≥ 0.5。
:::

本文的贡献有三：

- 给出温度系数 *τ* 与坍缩临界值 *τ** 之间的闭式关系
- 在 ImageNet-100 / CIFAR-10 / STL-10 三个基准上系统验证
- 提出 *τ*-adaptive 调度策略，推理成本几乎为零

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

::: divider
:::

## 4 实验

::: highlight Key Finding
在 CIFAR-10 上，*τ*-adaptive 将线性评估准确率从 84.3% 提升至 87.1%，而将 batch size 从 256 翻倍到 512 仅带来 0.4% 提升——**温度的收益显著大于批次的收益**，这与以往"批次越大越好"的主流观点相悖。
:::

:::: compare

::: pros 固定 τ = 0.1
标准 InfoNCE 配置
- Top-1 准确率 84.3%
- 训练曲线抖动较大
- 对 batch size 敏感
:::

::: cons τ-adaptive（本文）
三阶段余弦调度
- Top-1 准确率 87.1%
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

::: see-also SEE ALSO · 相关工作导览
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
`,"business-finance":`# 硬核财经 · 本期议题

> 本篇用于在 business-finance 主题下肉眼校验 **深栗墨 + 内参蓝 + 琥珀黄** 的版面气质。
>
> 参照坐标：FT 中文网 · 财新周刊 · Bloomberg Terminal · The Economist。
> 气质关键词：**报告、数据、分栏、纪律**。

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
2026Q1 同比下行 62bp，连续第 7 个月环比下降。硬核财经 signature。
:::

::: divider variant=wave
:::

## 利率结构性下行的三条证据

本章用三张 K 线 + 两个同比数据卡锚定 2026Q1 的**核心事实**。硬核财经的 h2 走 primary
栗墨竖条 + 字距 0.3px + 字重 700 —— **字距靠字重压阵，不拉疏朗**。

### 证据一 · 新发放个人消费贷款利率

央行数据：2026 年 3 月新发放个人消费贷款加权平均利率 **3.87%**，同比下行 **62bp**，
连续第 7 个月环比下降。这是数据层面的"结构性下行"首次得到官方数字背书。

### 证据二 · LPR 非对称调整

1 年期 LPR 调降 10bp，5 年期仅调降 5bp。**非对称**的含义是：央行希望把刺激精确
投放在消费端（1Y 主导），而非继续鼓励居民加杠杆买房（5Y 主导）。

::: tip 要点 variant=accent-bar
消费信贷利率结构性下行的**三条证据** —— LPR 非对称、居民贷款加权利率破 3.9%、
商业银行息差同比收窄 18bp。三条证据之间互为因果，非并列。
:::

::: info 补注 variant=minimal-underline
本文数据口径：央行 2026Q1 货币政策执行报告 + 上市银行季报披露值。加权利率
按贷款余额加权计算，与"新发放利率"口径略有差异，具体见附录 A.1。
:::

::: warning 风险提示 variant=pill-tag
**数据存在口径差异**：央行公布的加权利率与上市银行披露值存在 12-18bp 偏差，
此偏差主要来自住房按揭贷款在加权计算中的占比差异。读者据此下结论前应自行核对。
:::

::: danger 警报 variant=ticket-notch
**本文不构成投资建议**。文中所有量化判断均为研究性质推演，不代表作者与机构立场。
A 股相关标的请读者根据自身风险偏好独立判断。
:::

::: divider variant=dots
:::

## 数据 callout · 季度关键数字

::: highlight
**3.87%** · 2026Q1 新发放个人消费贷款加权利率

**▼ -62bp** 同比 · **▼ -18bp** 环比

*数据来源：中国人民银行 2026Q1 货币政策执行报告*
:::

::: highlight
**1.72%** · 2026Q1 上市银行加权平均净息差

**▼ -18bp** 同比 · **▼ -7bp** 环比

*数据来源：A 股 42 家上市银行季报加权平均，剔除城商行非标口径*
:::

::: divider variant=flower
:::

## 核心判断 · 研究员 pull-quote

::: quote-card 张某某 · 资本市场研究院 variant=frame-brackets
我们判断 2026Q2 商业银行的息差压力**不会来自负债成本**，而会来自**资产端议价能力**的
持续让利。前者是央行可以直接干预的变量；后者是市场结构变量，难以通过政策工具直接逆转。
:::

> 裸引文："利率市场化改革的终点，是资产端和负债端**各自回归**到各自的均衡定价路径上。"
> —— 这是一段 blockquote，走双侧 1px secondary 竖线 + textMuted + 0.5px 字距。
> 不加引号 SVG，引号资源留给 quoteCard 独占。

::: divider variant=wave
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

**多空两面并置**，不代表择一而从 —— 恰恰相反，business-finance 的 compare ledger
是 "Bull Case vs Bear Case" 的多空对照，读者应合读二者之后**自判断**。

::: divider variant=dots
:::

## 研究日程 · Phase I / II / III

::: steps 研究员下一步日程
### Phase I · 数据采集
完成央行报告 + 42 家上市银行季报交叉验证，剔除城商行非标口径偏差。

### Phase II · 量化模型
搭建息差压力三因子模型（负债成本 / 资产定价 / 中间业务），用 2020Q1-2025Q4 样本拟合。

### Phase III · 季度跟踪
按季度披露更新预测。下一季度报告预计 2026-07-25 刊发。
:::

::: section-title 附录 · 方法论与排版纪律 variant=cornered
:::

本主题的排版纪律：

- **正文**：15px / 400 / 字距 0.3px / 行高 1.75（财经信息密度优先）
- **h1**：26px / 800 / 字距 0.5px（稀比粗贵气，标题用字重压阵）
- **h2**：21px / 700 / 字距 0.3px / 4px primary 左竖条（不做通栏下划线）
- **h3**：17px / 700 / 字距 0.2px（不加前缀，靠字号字重区分）
- **strong**：600（不是 800）+ primary 栗墨色
- **所有 radius ≤ 2**：硬核财经直角，radius ≥ 6 = 卡片审美，打回

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>F</kbd> 在正文里找"息差"。inline \`code\` 走 bgMuted 底 +
**secondary 内参蓝**字色 —— 拒绝朱红承担代码色（规范 §1.1）：红色是稀缺战略资源，
全篇预算 ≤ 8 次（K 线涨柱 + danger 容器 + delta 正向符号）。

### bare codeBlock

本主题 codeBlock 走 \`bare\` variant —— 财经稿里代码本来就稀少，不需要 header-bar
语言标签带（那是 tech-explainer 签名）。

\`\`\`python
# 商业银行息差三因子模型（简化版）
def spread_pressure(cost_of_liab, asset_pricing, non_interest):
    return 0.45 * cost_of_liab + 0.38 * asset_pricing + 0.17 * non_interest
\`\`\`

::: divider variant=dots
:::

## 媒体嵌入件 · 保持版框干净

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="研究员音频解读" play_length="420000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: free
自由容器：可在此处嵌入**数据源清单**或**致谢**等结构外内容。business-finance 的 free
保持透明底 + 无边框 —— 一切克制，与正文底色融为一体。
:::

::: divider variant=wave
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
`,default:`# wechat-typeset · 上手样稿

::: intro 一份可直接上手的 Markdown 样稿
这篇文档里用到的容器、行内扩展、代码块和表格都能被 wechat-typeset 识别并按
当前主题渲染——照着样子改，就是你自己的公众号文章。
:::

::: cover 封面
![封面占位图](https://placehold.co/1200x630?text=wechat-typeset)
:::

::: author 编辑部 role=主笔
负责全栈内容生产，关注工具、写作与研究方法。
:::

::: divider variant=wave
:::

## 一、段落与行内扩展

本工具把 Markdown 映射到公众号约束之上。==高亮==、~~波浪~~、*斜体*、**加粗**、\`inline code\` 在 4 套主题下都会跟着 tokens 走。

> 一个普通引用块：用来引出观点，不抢焦点。

::: divider variant=dots
:::

## 二、四色提示

::: tip 小贴士
高亮 \`ctx.tokens\` 里的色值——主题切换时会自然同步。
:::

::: warning 注意
\`:::: compare\` 必须用 4 个冒号，内层 pros/cons 用 3 个。
:::

::: info 说明
公众号不支持 \`<style>\` 块与 \`class\`——所有样式在导出阶段内联。
:::

::: danger 警告
禁止在主题里写 \`font-family\`；\`themeCSS\` 会抛出 \`ThemeAuthoringError\`。
:::

::: note 第五态补注
note 不抢色、走 textMuted + noteIcon —— 用于"不构成警示、但读者可能错过"的旁注。
:::

::: divider variant=flower
:::

## 三、金句与高亮

::: quote-card 王小波
一个人的成熟不是年纪的加法，而是欲望的减法。
:::

::: highlight
把复杂写简单，是一种对读者的尊重；
把简单写复杂，是对自己的谄媚。
:::

::: divider
:::

## 四、对比与步骤

:::: compare

::: pros 为什么选 wechat-typeset
- 一个工具打穿 "写、排、发" 全链
- 主题与内容解耦，换色不改结构
- 容器语法无 HTML 依赖，可版本化
:::

::: cons 暂时不适合
- 需要复杂交互的长图文（SVG 只做轻装饰）
- 强调动效（公众号本身剥离所有动画）
- 短平快营销号（风格更偏严谨）
:::

::::

::: steps 实战流程
### 写初稿
把素材粘到左侧编辑器，先保证结构。

### 套主题
上方下拉切换主题，右侧实时 375px 预览。

### 一键复制
点右上角"一键复制"，粘贴到公众号后台。
:::

::: divider variant=wave
:::

## 五、代码与数据

\`\`\`ts
import { renderPipeline } from './pipeline'
import { getTheme } from './themes'

const theme = getTheme('tech-geek')
const { html, wordCount } = renderPipeline({
  md: '# Hello wechat-typeset',
  theme,
})
\`\`\`

| 主题 | 基调 | 适用栏目 |
| --- | --- | --- |
| 极客夜行 | 深色 | 技术 / 产品 |
| 慢生活 | 暖米 | 生活 / 旅行 |
| 硬核财经 | 锐利 | 商业 / 财经 |
| 人文札记 | 素雅 | 散文 / 书评 |

::: divider variant=dots
:::

## 六、媒体占位

::: mpvoice 开篇语 fileid=placeholder-fileid
:::

::: mpvideo 产品演示 qqvid=placeholder-vid
:::

::: divider variant=flower
:::

## 七、文末引导

::: footer-cta 如果对你有启发 cta=关注我
每周一篇深度，愿意被慢慢读。
:::

::: see-also 看完本文还可以
- 切到 \`tech-geek\` 主题看这段代码在琥珀终端里的样子
- 切到 \`literary-humanism\` 主题看引言与按语如何被素雅化
- 切到 \`business-finance\` 主题看 compare / key-number 的报告感
:::

::: recommend 延伸阅读
- [从零开始的 wechat-typeset](https://example.com/a)
- [主题工程的五个误区](https://example.com/b)
- [LCH 色彩生成手册](https://example.com/c)
:::

::: qrcode 扫码加入读者群
![二维码占位](https://placehold.co/240x240?text=QR)
:::
`,"industry-observer":`# 行业观察 · Issue #023

> 本篇用于在 industry-observer 主题下肉眼校验 **Stratechery 米 + 深墨蓝 + 晚点橙金**
> 的 newsletter 气质。
>
> 参照坐标：Stratechery · Benedict Evans Weekly · The Information · 晚点 LatePost。
> 气质关键词：**周报、断言、矩阵、issue 感**。

::: cover 专题头 · 技术并不淘汰公司 issue=023 date=2025-04-20 kind=周刊
![封面占位](https://placehold.co/1200x630?text=industry-observer+cover)

副标题：**淘汰公司的，是那些用新技术重新想象行业边界的人** —— 本期从三家正在试图
改写行业边界的公司讲起：它们的共同点、它们的分歧点、以及它们未来 18 个月最大的风险。
:::

::: author 林磊 role=深响编辑 issue=023 date=2025-04-20 kind=周刊
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

::: divider variant=glyph
:::

## 一、三家公司的共同点

过去十二个月，A、B、C 三家公司分别在搜索、社交、电商三条主赛道上做了**同一件事**：
把原本是"分发渠道"的产品重新定位成"交易闭环"。这不是偶然，也不是三家公司各自的产品
战略巧合—— **这是一轮更深层次的行业迁移的表征**。

### 1.1 "分发 → 交易"的迁移动力

== 这个迁移的底层动力不是技术，是资本效率 ==。当流量增长见顶，提高单用户 ARPU 的
方法只剩两条：要么涨价（广告），要么把自己变成交易闭环（GMV）。三家都选了后者。

::: tip 要点 variant=pill-tag
- **分发天花板**已至 —— 三家的广告收入同比增速都跌破 10%
- **交易闭环**是下一曲线 —— GMV 同比 40% 以上增长是共同信号
- **监管风险**同步抬升 —— 涉及支付与金融许可的平台监管会跟上
:::

::: info 背景 variant=minimal-underline
对不熟悉这三家公司的读者：A 是搜索起家的公司，B 是社交起家的公司，C 是电商起家的
公司。它们在**2024 年后半年**分别完成了交易闭环的关键拼图 —— 支付、物流、供给。
本期不做三家公司的商业模式拆解（那是 Issue #018 的主题），只谈"战略对照"。
:::

### 1.2 各家的差异

::: warning 存疑 variant=card-shadow
A 公司当前的增长叙事高度依赖其海外业务（占比约 45%），而过去六个月海外监管口径
明显收紧。如果海外增长失速，A 的整个"分发 → 交易"故事线会失去最重要的支撑点。
**这是我本期最不确定的一个判断**，欢迎业内读者在评论区提供反驳视角。
:::

::: divider variant=dots
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

::: divider variant=glyph
:::

## 三、题辞 · 一段业内断言

::: quote-card 王兴 · 美团创始人 2024 内部信 variant=column-rule
技术并不会淘汰公司，淘汰公司的是那些用新技术**重新想象行业边界**的人。过去十年的
教训反复说明了这件事 —— 巨头并非败于技术落伍，而是败于对"边界"的固守。我们今天
所做的事，其实只是回答一个简单问题：如果我们今天从零开始做外卖，我们会怎么做？
:::

> 把上一段话放回 industry 的 quoteCard 语境：Benedict Evans 风 pull-quote —— 左右双 2px 深墨蓝竖线夹住
> 22/500 正文，末行右对齐破折号前缀的出处。**拒绝**朋友圈式金句卡、**拒绝**居中对齐、**拒绝**"金句"标签。

::: divider variant=dots
:::

## 四、事件时间轴 · 赛道演化

::: steps 本赛道过去五年
### 2020 · 行业萌芽
这一年，A 公司完成第一轮融资；B 公司的核心产品发布内测版；C 公司还是一个两百人的
小团队，专注供应链切入。

### 2022 · 群雄竞起
十二家创业公司拿到钱，赛道从"是不是伪需求"的争论变成"如何跑出来"的竞速。
A、B 完成基础设施的构建；C 做出了被广泛模仿的交付模式。

### 2024 · 洗牌开始
只剩下三家还在加速；大部分小公司被头部吸收或转向。**真正的拐点是 Q3** —— 那个季度
三家同时披露了交易 GMV，形成了业内对"赛道第二曲线"的共识。
:::

::: section-title 附录 · 关键数字与叙事化表述 variant=cornered
:::

industry-observer 故意不做 business 的巨号数据卡。**数字叙事化**纪律示例：

- 过去五年，这个赛道的融资总额增长了 **约四倍**（而非 "增长了 397%"）
- 盈利公司数量从十二家降到 **不到五家**（而非 "降幅 66.7%"）
- 三家公司的用户重合度在过去十八个月 **从三成涨到接近五成**

::: highlight
**过去五年**，这个赛道的融资总额增长了 **约四倍**，但盈利公司数量从十二家降到了
**不到五家**。同时三家头部用户重合度从 **约三成**涨到 **接近五成** —— 这是 industry
的 highlight 签名：左 3px 橙金竖条 + bgSoft 档案米底 + 嵌入式轻强调，**数字服从洞察**。
:::

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>K</kbd>（或 Mac 下 <kbd>⌘</kbd> + <kbd>K</kbd>）把文章复制到公众号
后台。observer 稿里 \`code\` 出现不多 —— \`bgMuted\` 底 + \`primary\` 字是"这是技术词"的
冷静标识。拒绝把 code 染成橙金（那是 issueStamp 信号色专属）。

\`\`\`ts
// 这段代码在 observer 语境里是"术语说明"而非"教程示例"
interface IndustryObserverInput {
  issue: string       // 期号，如 "023"
  date: string        // 刊期日期
  kind: '周刊' | '月刊' | '特辑'
  primaryThesis: string  // 本期核心判断
}
\`\`\`

::: danger 错判 variant=ticket-notch
**战略错判示例**：2023 年 Q2，市场普遍认为 D 公司会在一年内跑出交易闭环。
结果 D 公司在 Q4 关停了交易业务，回归内容分发。这是 industry-observer 罕见使用 danger
容器的场景 —— 不是"商业风险"的模糊警示，而是**"业内对某个判断已有定论说这是错的"**
的勘误条。双边框 + ticket-notch 缺口，打印成黑白也一眼可辨。
:::

::: divider variant=glyph
:::

## 五、媒体嵌入件 · 保持版框干净

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="本期播客版" play_length="1800000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: free
自由容器：observer 语境里用来嵌入"编辑部注记"或"往期链接补充"。主题不预设视觉约束，
作者自行决定。一般用于文末致谢或撰稿节外的小补充。
:::

::: divider variant=glyph
:::

## 六、延伸阅读 · 相关 Issue

::: recommend 延伸阅读
- [产业观察 · Issue #019 | 互联网巨头的"搜索"围城](https://example.com/issue-019)
- [业内专访 · Issue #015 | 对话 A 公司 CTO](https://example.com/issue-015)
- [数据看点 · Issue #012 | 过去三年收购数据拆解](https://example.com/issue-012)
:::

::: qrcode 扫码订阅「某某观察」 · 每周二更新
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 订阅「某某观察」 cta=扫码订阅 ▸ issue=023 date=2025-04-20 kind=周刊
每周二清晨送到，30 分钟读完。不追热点，不发快讯，只讲值得下判断的行业变化。
顶部那枚 ISSUE 戳记，是本期与读者的"封口印鉴"。
:::
`,"life-aesthetic":`# 周日 · 做一锅不慌张的汤

::: intro 关于慢
越忙的日子越想给自己留一锅要煨两小时的汤，并不是为了那口味道。
:::

::: cover 本周慢生活
![封面占位](https://placehold.co/1200x630?text=life)

_一盏茶、一扇窗、一些可以慢下来的小事。_
:::

::: author 如初 role=生活作者
写于一个有风的下午。
:::

::: divider variant=wave
:::

## 一、选材的节律

早市从来不是我能睡到的时间。==但周日例外==。摊主会留一点最嫩的香葱给熟客，我拎回一束，顺便带了两块老豆腐。

::: tip 一个小经验
豆腐泡十分钟盐水再下锅，边缘不容易碎；清汤才有得见底的清。
:::

::: divider variant=dots
:::

## 二、汤的温柔与不温柔

:::: compare

::: pros 慢汤的好
- 厨房里有一种会等人的气味
- 味道是分钟一分钟"长"出来的
- 收尾时只需要撒一把香葱
:::

::: cons 慢汤的真相
- 需要一个完整的下午
- 不会立刻"奖励"你
- 洗锅比煮汤费劲
:::

::::

::: info 小知识
白萝卜与火腿骨几乎天生一对；关火前十分钟下萝卜刚好。
:::

::: divider variant=flower
:::

## 三、边煨汤边做的事

::: steps 下午的节律
### 熬
先大火十五分钟撇浮沫，再小火慢煨。

### 读
翻两页散文，不求有用。

### 走
围着小区绕两圈，手心里捏一杯热水。

### 收
回家掀开锅盖，撒葱花盛汤。
:::

::: quote-card 汪曾祺
一个人的口味要宽一点，杂一点，对生活才有兴趣。
:::

::: warning 别急
若汤还没炖到位就打开锅盖反复看，味道会"破"。
:::

::: note 关于盐
最后一刻再撒，半匙为限——汤里的盐不是调味，是把鲜味托起来。若实在拿不准，宁少勿多。
:::

::: divider variant=wave
:::

## 四、吃完之后

::: highlight
把今天拣出来的骨头晒干，装进牛皮纸袋——下次煲汤时直接扔下去，又是一锅。
:::

::: footer-cta 如果你也爱这种慢 cta=来陪我
每周末更新一篇生活随笔。
:::

::: divider variant=wave
:::

## 五、声音与画面

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="慢生活播客" play_length="900000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: recommend 延伸阅读
- [一锅米饭的仪式感](https://example.com/rice)
- [慢食主义手册](https://example.com/slow)
:::

::: qrcode 想一起慢生活就扫我
![二维码占位](https://placehold.co/240x240?text=QR)
:::
`,"literary-humanism":`# 人文札记 · 卷首语

> 本篇用于在 literary-humanism 主题下肉眼校验 **宋椠褐 + 藏经朱 + 宣纸米** 的版面气质。
>
> 参照坐标：三联毛边本、《读库》目录页、岩波文库奶白封皮。
> 气质关键词：**克制、藏锋、留白、纸感**。

::: cover 卷首语 · 岁在丙午春分
![封面占位](https://placehold.co/1200x630?text=humanism+cover)

_写于春分后第二日，时雨初歇。_
:::

::: intro 题解
本篇所论，围绕"**文 vs 质**"这一古老命题展开 —— 从孔子的"文质彬彬"到苏轼的"辞达而已"，再到鲁迅杂文的"白话入文"。旨在把历代作者对"如何写"的思考并置一处，供读者自判。
:::

::: author 钟山 role=主笔
长读深耕，短评不妄。写于春分后第二日，时雨初歇。
:::

::: divider variant=flower
:::

## 一、文与质的两端

古人论文必论质，论质必论文，从未见把二者割裂讨论的；但凡把其中一端单独推到极致，文章必坏。==文胜质则史，质胜文则野==——这是孔子留给后世的第一条警句。

唐宋之间，韩愈以"古文"标举回潮，柳宗元、欧阳修继之；至苏轼出，"辞达而已矣"一语将文与质从对立调和到统一。这条脉络，值得一代代重读。

### 1.1 "文胜质则史"的出处

《论语·雍也》原文七字，语境是孔子品评弟子子路：行事刚勇而欠修饰，故谓之"野"。**这里的"文"不是修辞的堆砌，而是"形式的自觉"**——把想说的话放进合适的句式里。

### 1.2 宋人怎么翻这道题

> 辞达而已矣。——苏轼《答谢民师推官书》

这句话容易被误读为"够用就好"；放回原文上下文，苏轼的意思是：**辞要"达"到能把意思运出去的程度**，不是"达到浅白就够了"。

::: tip 批注 variant=minimal-underline
旁批·眉批 —— 这是本主题最轻的一档提示。无底色、无边框，仅标题下方一道 tip.accent 短线。像书页上读者随手划下的一道铅笔痕。
:::

::: info 案语 variant=accent-bar
按：编者补注 —— 左侧 3px info.accent 青竖条 + info.soft 浅底，像古籍旁批，低调但可识别。
:::

::: warning 商榷 variant=pill-tag
存疑·待考 —— 顶部胶囊标签悬于上沿，外框 1px warning.accent 黄褐。比 tip 跳一档，把"此处需留意"的信号量做足。
:::

::: danger 校勘 variant=ticket-notch
异文·误植 —— 票根缺口 + 双边框，分量最重。规范 §2.10-2.13 纪律：四态必须形状互异，打印成灰度也分得出谁是谁。
:::

::: note 补注
【按】本节所称"批校四态"只对白话体中篇以上文章适用；短札、尺牍、题跋因体例短促，一律走更素的 highlight 或普通 blockquote。note 在人文主题里就是"按语"位：低声附言，不与主叙事争色。
:::

::: divider variant=dots
:::

## 二、两家对勘 · 甲说乙说

:::: compare

::: pros 甲说 · 文可雕琢
- 文章是案头之工，字字可琢磨
- 苏轼称"文如水"，水有其形，赖器以成
- 无修辞则无风格，无风格则无作者
:::

::: cons 乙说 · 辞达即止
- 修辞过则伤真，真失则文亡
- 苏轼又云"辞达而已"，道出边界
- 工匠与作者之别：工匠恋其工，作者恋其言
:::

::::

两说并置，并非要读者择一而从；恰恰相反，**二者合读，方得苏轼本意**。

## 三、题辞 · 金句压卷

::: quote-card 苏轼 · 前赤壁赋 variant=magazine-dropcap
大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。
:::

> 裸引用："逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。" —— 走双侧 1px primary 竖线夹住段落，textMuted + letter-spacing 1.2px 造倾斜感，不加引号 SVG。

::: divider variant=wave
:::

## 四、读书卷次 · 三卷递进

::: steps 读一本导演自述
### 卷一 · 读
先通读一遍，不留记号。让注意力留给作者的呼吸节奏，不要被自己的批注打断。

### 卷二 · 批
第二遍再动笔，眉批侧批同出。此时要的不是"同意"或"反对"，而是记下"哪里让你停下来了"。

### 卷三 · 抄
择要抄录，整理成卡片归档。能被抄下来的句子，十年后仍读得出作者的体温。
:::

::: section-title 附录 · 常见字距与层级节奏 variant=cornered
:::

本主题的字距纪律：

- **正文**：16px / 400 / 字距 1px / 行高 **2.0**（本主题唯一敢给 2.0 的签名）
- **h1**：26px / 700 / 字距 3px（稀比粗更贵气）
- **h2**：19px / 600 / 字距 2px（从教科书的 20 降到 19，克制）
- **h3**：16px / 600 / 字距 1.2px（与正文同号，只靠字距与字重区分）
- **小字**：13px / textMuted / 字距 0.5px（附注 / 题记）

::: highlight
==我喜欢用茶碗吃饭，用筷子喝汤—— 这样我才不至于忘了自己还是个卖豆腐的。== 小津说。整段文字依赖 \`bgSoft\` 底色 + 两侧 24px 内缩 + 1.5px 字距完成重音，**不用边框、不用图标**。
:::

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>C</kbd>（或 Mac 下 <kbd>⌘</kbd> + <kbd>C</kbd>）把文章复制到公众号后台。inline \`code\` 走 \`bgMuted\` 底 + \`textMuted\` 墨灰字，**拒绝朱砂承担代码色**（规范 §1.1）——人文语境里 code 是注音符号，不是警示。

### bare codeBlock

本主题的 codeBlock 走 \`bare\` variant（默认）。没有 \`header-bar\` 的语言标签带（那是 tech-explainer 签名）。代码块走 \`bgSoft\` 底色、\`border\` 色外框、radius 0。

\`\`\`python
def 文胜质则史(text: str) -> str:
    """古籍批注的一种简略笺法 —— 逐字对读，逐句小字夹注。"""
    return "\\n".join(
        f"{line}  #{i+1}" for i, line in enumerate(text.splitlines())
    )
\`\`\`

::: divider variant=dots
:::

## 五、媒体嵌入件 · 保持版框干净

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="占位·配音" play_length="60000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: free
自由容器：作者可在此处直接书写而不受主题视觉约束。人文主题把这一处留作"素笺"——不预设边框、底色与图标，纯白（\`#fefefe\`）底上写字，一切交给作者决定。
:::

::: divider variant=flower
:::

## 六、延伸阅读与订阅

::: recommend 延伸阅读
- [《东京物语》与东方家庭](https://example.com/tokyo)
- [纪录片《我是卖豆腐的》](https://example.com/doc)
- [读库 1804 · 小津安二郎特辑](https://example.com/dk1804)
:::

::: qrcode 扫码订阅每周长信
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 愿意与我慢读 cta=加入人文札记
每周一封长信，写我最近读到的那一本。卷尾右下角那枚藏经朱印，是全文唯一一次"用朱"——
这是规范 §1.3 "朱砂稀缺纪律"的收束动作。
:::
`,"people-story":`::: cover 张某某
![封面肖像](https://placehold.co/1200x1400?text=portrait)

**作家、翻译家，1967 年生于上海**

他曾在一封给编辑的信里写过：关于写作这件事，最难的从来不是开头。
:::

::: author 文 / 某记者
摄影 / 某摄影师  ·  2026 年 4 月刊
:::

::: intro 题解
他在书房里坐了四十年。没有书桌，只有一块摊在膝头的木板。采访那天下午，窗外的
玉兰树开始落花，他说：写作这件事我也没想清楚，但我知道不是写给自己看的。这是
关于他的故事。也是关于那一代知识分子，那个书房，那块木板的故事。
:::

## 书房里的四十年

本篇 h2 都会被渲染器自动加上罗马数字前缀（I / II / III / IV）—— 这是
people-story 的章节语言。阿拉伯数字是流程图语言，罗马数字是章节语言。
他**从不**用 1 / 2 / 3 标章节，他说那会让读者以为这是一份报告。

## 翻译的方法论

他的翻译笔记本现在还在抽屉里，封皮磨得起毛。每译一本书，他先把原文抄一遍，
然后把抄本撕掉重抄。他说：*抄到第三遍，原作者的呼吸就进来了*。这是 em 斜体
的典型用法 —— 西文术语出现一次，第二次回归正体。

::: tip 采访手记 variant=minimal-underline
采访那天原计划两小时，结果聊到天色暗下来。他起身去厨房煮饭，一边切土豆一边
继续回答问题。tip 在人物稿里是"采访手记" —— 最轻的一档，无边框，仅标题下方
一道短线。像记者笔记本里划下的铅笔痕。
:::

::: info 背景 variant=accent-bar
对不熟悉他的读者：他 1985 年入上海外国语学院，九〇年代赴法，二〇〇〇年后回国
定居。主要译作包括波德莱尔、普鲁斯特与杜拉斯。本篇不做作品全梳理（那是另一
期的主题），只谈写作与翻译的"方法"。
:::

## 金句 · 关于写作

> 这是一段"征引"—— 普通 blockquote 走双侧 1px textMuted 竖线 + 无引号 SVG，
> 杂志内页 column rule 的经典做法。引号资源留给 quoteCard 独占。

::: quote-card 张某某 variant=magazine-dropcap
我从来没想过要成为别人期待的那种人。我只是在做我一直想做的事 —— 翻译、读书、
做饭、散步，偶尔写一些像散文也像笔记的东西。**这不是一种表态**，只是一种习惯。
:::

::: section-title 家族史 variant=cornered
:::

他的祖父是 1920 年代留法归国的第一批法文教授。父亲在 1950 年代教英文。母亲
是同一所中学的语文老师。**翻译在他们家，是代代相传的手艺**。

::: warning FACT CHECK variant=pill-tag
本文提到"祖父 1920 年代留法归国"的说法来自受访人口述，我们未能查证具体年份；
他本人表示"大约是 1923 到 1925 年之间"。另外，书稿封面标注的"三十万字" —— 我们
核对过出版社备案稿，实际是二十八万四千字。warning 在人物稿里是"事实核查"的
编辑部标签。
:::

## 人生阶段

::: steps 他的四十年
### 1978 · 入学
十七岁考入上海外国语学院法文系。同届二十七人，后来只有他一个人坚持到
翻译成书。

### 1993 · 出国
第一次去巴黎是带了一整箱中国古典诗词译本 —— 他说那一年他译得最多的反而
是中文古诗的法译稿。

### 2008 · 回国
带回来的是三个装满笔记本的纸箱。其中一箱至今未开。

### 2024 · 新书
他的新长篇在今年春天出版。他说这很可能是他最后一本"给别人看的书"。
:::

::: highlight
**年表**：
- **1967** 生于上海
- **1985** 入上海外国语学院法文系
- **1993** 赴法留学，进入巴黎索邦大学
- **2000** 出版第一本译作（波德莱尔散文诗选）
- **2008** 回国定居
- **2018** 获某某翻译文学终身成就奖
- **2024** 新长篇《某某某》出版
:::

## 两个时期 · 三十岁 vs 六十岁

:::: compare

::: pros 三十岁 · 巴黎
- 每天译 800 字，雷打不动
- 常去圣米歇尔河岸的旧书店
- 房间里堆到天花板的法文杂志
- 没有微信，每周一封信寄回上海
:::

::: cons 六十岁 · 上海
- 每天译 200 字，有时整天只修一句
- 不再买新书，只重读旧书
- 房间清空了四分之三
- 有微信，但从不主动回消息
:::

::::

两个时期并置 —— people-story 的 compare 不是"PK"也不是"优缺点"，是**克制冷对照**。
"他 30 岁 vs 60 岁"比"他的优点 vs 缺点"更有杂志感。

::: danger 官方回应 variant=ticket-notch
在本文发稿前，我们把完整稿件发给张某某本人审阅。他回复："我所讲的每一句话都在
记者的笔记里有依据。个别表达我做了文字上的微调，这些调整已并入正文。对本文结尾
关于'最后一本书'的表述，希望读者不要作过度解读。" —— 张某某，2026 年 3 月 28 日。
danger 在人物稿里是"官方回应" —— 最重的一档，双边框 + ticket-notch 缺口.
:::

::: note 编辑说明
本稿采写跨 11 周，一手采访 3 次（累计 7 小时），关联访谈 6 人。所有直接引语
均经本人复核。时间线里未署名的背景信息，已按人物稿惯例做脱敏处理。note 在
特稿里是"刊末小字"：不出声、不插入主叙事，只向较真的读者说清来路。
:::

::: divider variant=rule
:::

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>F</kbd> 在笔记里找一句话。\`code\` 在人物稿里是"邮箱、
作品名、年份"等元信息 —— 走 \`textMuted\` 版权灰，**不染暖色或人物色**。

\`\`\`
1967 / 上海 / 泰兴路旧公寓三楼
1985 / 上外法文系录取
2024 / 新长篇完稿
\`\`\`

::: free
自由容器：作者可在此处嵌入"编辑部补注"或"致谢列表"等不规整内容。people-story
把 free 留作素笺 —— 无边框、无底色，一切交给作者决定。
:::

::: divider variant=rule
:::

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="张某某采访实录" play_length="1800000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: recommend 延伸阅读
- [关于他的另一篇长文《XX》](https://example.com/a)
- [他的上一本书《YY》](https://example.com/b)
- [本刊往期人物专题《ZZ》](https://example.com/c)
:::

::: qrcode 扫码订阅《人物》杂志
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: footer-cta 卷尾致谢
本文基于 2026 年 3 月至 4 月多次采访整理而成。

感谢张某某先生接受长时间访谈。感谢他的学生、家人与出版社朋友提供的补充资料与
照片。本文所有引语均经受访者本人确认.

文 / 某记者　摄影 / 某摄影师　　2026 年 4 月刊
:::
`,"tech-explainer":`# 用 TypeScript 从零实现 JWT 认证

::: intro 学完你将能
- 说出 JWT 的三段式结构：Header、Payload、Signature
- 用 Node.js 内置 \`crypto\` 模块手写签发与验签，无第三方依赖
- 识别并规避五种高频误用：弱密钥、\`alg:none\`、敏感字段入 Payload、跳过 \`exp\`、明文传输
:::

::: cover 教程说明
![封面占位](https://placehold.co/1200x630?text=tech-explainer)

**前置知识：** \`JavaScript 基础\` \`HTTP 协议\` \`Base64 编码\`

📖 预计阅读 12 分钟 · 最后更新 2026-04-20
:::

::: author 陈朗 role=后端工程师
最后更新：**2026-04-20** · 阅读时长约 12 分钟
:::

::: divider variant=rule
:::

## 1. JWT 的结构

JWT（JSON Web Token）由三段 Base64url 编码字符串拼成，用 \`.\` 分隔：

\`\`\`text
TYPESCRIPT · 结构示意
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.SIGNATURE
    ↑ Header           ↑ Payload           ↑ Signature
\`\`\`

::: tip Tip · 小贴士
Header 和 Payload 只是 Base64url 编码，**没有加密**——任何人都能解码读到内容。密码、手机号绝对不能放在 Payload 里。
:::

::: info Note · 注意事项
JWT 常被误称为"加密 Token"，正确叫法是"签名 Token"——它保证数据**未被篡改**，不保证数据**保密**。
:::

::: divider variant=dots
:::

## 2. 分步实现

::: steps 手写 JWT 签发与验签
### Step 1. 引入内置模块

只需 Node.js 18+ 内置的 \`crypto\`，无需任何 npm 依赖：

\`\`\`typescript
TYPESCRIPT · src/auth/jwt.ts
import { createHmac, timingSafeEqual } from 'node:crypto'
\`\`\`

### Step 2. 实现 HMAC-SHA256 签名

\`\`\`typescript
TYPESCRIPT · src/auth/jwt.ts
function hmacSign(data: string, secret: string): string {
  return createHmac('sha256', secret)
    .update(data)
    .digest('base64url')
}
\`\`\`

### Step 3. 签发 Token

\`\`\`typescript
TYPESCRIPT · src/auth/jwt.ts
function sign(payload: object, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body   = btoa(JSON.stringify(payload))
  const sig    = hmacSign(\`\${header}.\${body}\`, secret)
  return \`\${header}.\${body}.\${sig}\`
}
\`\`\`

### Step 4. 验签并检查过期

\`\`\`typescript
TYPESCRIPT · src/auth/jwt.ts
function verify(token: string, secret: string): object {
  const [header, payload, sig] = token.split('.')
  const expected = hmacSign(\`\${header}.\${payload}\`, secret)
  // 必须用时序安全比对，普通 === 存在时序攻击风险
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

::: divider variant=rule
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
本文所有示例需要 Node.js 18+（依赖原生 \`btoa\` / \`atob\` / \`base64url\`）。若仍在 Node 16 线上，请用 \`Buffer.from(x).toString('base64url')\` 替代。tech-explainer 的 note 用于标注"环境与兼容性"这类非核心但绕不开的脚注。
:::

::: divider variant=dots
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

::: divider variant=dots
:::

## 5. 视频 / 语音版

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="JWT 教程音频版" play_length="600000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: qrcode 关注「文档白昼」获取代码
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: see-also 下一篇会讲什么
- **OAuth 2.0 与 JWT 的协作关系**：授权码流程里，JWT 扮演什么角色
- **Refresh Token 的正确实现**：为什么不能把它当 Access Token 用
- **JWK Set 与密钥轮转**：从 kid 到完整轮转链路的工程化
:::

::: recommend 延伸阅读
- [RFC 7519：JWT 规范原文](https://example.com/rfc7519)
- [OWASP：JWT 安全最佳实践](https://example.com/owasp)
- [Node.js crypto 官方文档](https://example.com/crypto)
:::
`,"tech-geek":`# 极客夜行 · 工程随笔 Vol.03

> 本篇用于在 tech-geek 主题下肉眼校验 **VT220 琥珀 + 夜读暖底** 的深底气质。
>
> 参照坐标：Plan 9 manpage · ACM Queue · TAOCP 脚注 · Fabien Sanglard。
> 气质关键词：**成年、克制、琥珀**。

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

::: divider variant=wave
:::

## 写 postmortem 的三条约束

本章用三条约束锚定 postmortem 的边界。tech-geek 的 h2 走 1.5×14 琥珀竖条前缀 +
1.5px 字距 + 1px dashed border-bottom —— 博客风下划线改成虚线的克制版。

### 约束一 · 时间轴必须精确到分钟

不是 "14:00 左右"，是 \`14:03:21\`。时间戳的精度决定了三个月后回溯时**能否
把相邻事件拉出因果链**。这是我从 *Google SRE Book* 那里学到的第一条纪律。

### 约束二 · "为什么没发现"比"发生了什么"更重要

事故报告有 \`WHAT\` 和 \`WHY-DETECT\` 两栏。多数人只写 \`WHAT\`，是因为 \`WHY-DETECT\`
要求回答"为什么我们的监控没报"——这问题很难，但回避它等于没做复盘。

### 约束三 · 行动项必须**可以被拒绝**

给每个 action item 一个 \`owner\` + \`due date\` + \`rejectable reason\`——如果三个月
后 owner 来说"这个做不成，理由是...."——那说明约束清晰、讨论有效。全部 100%
执行的 action items 列表反而是 bad smell。

::: tip 附注
这三条约束不是我发明的，是 Google / Amazon / Stripe 公开 postmortem 反推出的
共同骨架。这里走 manpage-log 默认骨架——顶底分隔线 + 状态标签条，与正文同色族。
:::

::: warning 注意陷阱
**小团队慎用正式 postmortem 模板**。5 人以下团队写 9 页 RCA 文档是灾难——
修复时间都不够，复盘写一下午。小团队的约束换成"事故本身长度 × 2 = 复盘文档
长度上限"。2 小时事故，写 4 小时复盘即止；超过了就是过度工程。
:::

::: info 参考
Google SRE Book · Chapter 15 Postmortem Culture；以及 Stripe 工程 blog 的
"Writing Great Design Docs"（2019）。本主题 manpage-log 的"参考"槽位由
infoIcon 的细横线 + 冷蓝标题色承担，不再借助 ASCII 引用记号。
:::

::: danger 严重警告
**最典型 anti-pattern**：把 postmortem 写成"找谁背锅"。一旦文档里出现"人名 + 应当
更谨慎"的句式，之后没人会写诚实的时间轴——大家都会自我审查。manpage-log 的
陶土红方块图标把这类稀缺严重警告夹起来。
:::

::: note 范围说明
本篇只谈"对内 postmortem"；对外公开的 learning 文章（面向客户 / 监管）是另一套
体裁——语气更克制，数据更少，结构更像新闻稿。note 在 tech-geek 里走"manpage aside"
排版：左 1px dashed primary 竖线 + 透明底，与 admonition 的状态边框语言区分开。
:::

::: divider variant=dots
:::

## 关键数据 · 三组对照

::: highlight
**14:03:21** · 告警触发时间

**14:09:17** · on-call 确认事故 —— **6 分钟**延迟
:::

::: highlight
**87%** · 事故有"早期信号"但被 on-call 误判为误报

**2.3×** · 有 runbook 的事故平均修复时间 / 无 runbook 的比值
:::

::: divider variant=flower
:::

## 引文 · 算法的终止性

::: quote-card Knuth · TAOCP Vol. 1
An algorithm must **always terminate** after a finite number of steps. A procedure
that lacks this feature but has all other characteristics of an algorithm may be
called a computational method.
:::

> 裸引用："Premature optimization is the root of all evil (or at least most of it)."
> —— Knuth，走左侧 1px border 竖线 + textMuted，没有引号 SVG（留给 quoteCard 独占）。

::: divider variant=wave
:::

## 取舍 · 两种 RCA 文档格式

:::: compare

::: pros 优势 · 五段式模板
- 长度可控（每段 100 字上限）
- 新人写第一份也不会跑偏
- 好检索、好做 embedding
- 劣势：模板压死"非典型事故"
:::

::: cons 局限 · 自由叙述
- 能承载复杂因果链
- 老手写的质量上限高
- 劣势：新人写起来像在写作文
- 劣势：模板缺位 = 月底每份都要人肉 review
:::

::::

**两种格式并存**，不是二选一——新事故用模板，复盘评审后允许作者把"模板装不下的
复杂因果"另开一段自由叙述。这叫 \`graceful degradation\`。

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

::: section-title 附录 · 排版纪律 variant=cornered
:::

本主题的排版纪律（tech-geek signature）：

- **正文**：15px / **500** / 字距 0.6px / 行高 1.85（深底补偿：400 会发虚）
- **h1**：25px / 600 / 字距 2px（不上 700 —— 深底大字号 + 700 会"塑料硬边"）
- **h2**：19px / 600 / 字距 1.5px / 下方 1px 虚线（不做实色通栏下划）
- **h3**：16px / 600 / 字距 1px（与正文同号，只靠字重 + 字距区分）
- **inline code**：字号 = 正文 15 / 字重 = 500 / 字距 +0.2px / \`primary\` 琥珀色
  —— **signature 动作**：code 与正文同色同族，不割裂

### 按键与 inline code

按 <kbd>Ctrl</kbd> + <kbd>R</kbd> 在终端里 reverse-search 历史命令。inline \`grep\`
走 \`primary\` 琥珀色 + \`bgMuted\` 底 —— 和正文自然延续的一笔，不是"另起异物"。

### bare codeBlock

本主题 codeBlock 走 \`bare\` —— tech-geek 不需要 header-bar 语言标签带（那是
tech-explainer 签名）。代码块**不加 border-left**（去掉"代码块是异物"的做法），
底色仅与正文底差 5% 明度。

\`\`\`bash
# 从上一次 deploy 之后的错误日志里捞时间戳（UTC 转本地）
$ journalctl --since "2026-04-19 14:00" --until "2026-04-19 15:00" \\
    | grep -i error \\
    | awk '{print $1,$2,$3}' \\
    | sort -u
\`\`\`

\`\`\`python
# 把 timeline 合并成单一因果链的小脚本
def merge_timeline(sources: list[list[dict]]) -> list[dict]:
    """Merge N parallel streams into one timeline sorted by ts."""
    return sorted(
        (event for stream in sources for event in stream),
        key=lambda e: e["ts"]
    )
\`\`\`

::: divider variant=dots
:::

## 媒体嵌入

::: mpvideo
<iframe class="video_iframe" data-vidtype="2" allowfullscreen="" frameborder="0" data-ratio="1.7647058823529411" data-w="480" data-src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0" style="z-index:1;" width="500" height="375" data-vh="281.25" data-vw="500" src="https://v.qq.com/iframe/preview.html?vid=placeholder&width=500&height=375&auto=0"></iframe>
:::

::: mpvoice
<mpvoice frameborder="0" class="res_iframe js_editor_audio audio_iframe" name="事故复盘语音版" play_length="900000" voice_encode_fileid="placeholder"></mpvoice>
:::

::: free
自由容器 = Verbatim：tech-geek 的 free 保持透明底 + 无边框，真正"自由"——
不强加任何 motif。
:::

::: divider variant=flower
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

::: footer-cta 邮件订阅
- 相关工程随笔 Vol.02（编者按）
- 本篇的数据与实验脚本（附录 B）
- 下一期主题：*读生产环境代码的方法*

某某 · 2026-04-20 · 若此文对你有用，请回信告诉我一件**你改了的行为**
:::
`},z6=`# wechat-typeset · 全量容器 & 变体演示

这篇 Markdown 覆盖全部 33 个 variant 与 14 个无 variant 容器（含第五态 note + 签名块 abstract / key-number / see-also + 兜底 free），用于：

- \`scripts/verify-sample-full.ts\` 端到端渲染自检
- 人工审阅任何一次 variant / 容器改动的视觉回归
- 作为主题作者的"全容器参考卷"

::: intro 一句话摘要
把 Markdown 写得像设计稿，把复制粘贴到公众号的体验当作一等公民。
:::

::: cover 本期封面
![封面占位](https://placehold.co/1200x630?text=wechat-typeset)

> 一份给写作者的排版工具 —— 所见即所得，粘贴即保真。
:::

::: author 作者 role=主理人
长期写作，偶尔折腾工具。记录一些关于写与读的真心话。
:::

---

## section-title 两种写法

::: section-title 章节标题 · bordered variant=bordered
:::

::: section-title 章节标题 · cornered variant=cornered
:::

---

## 提示容器 9 种 variant

::: tip 温和提示 variant=accent-bar
这是 \`accent-bar\` 骨架 —— 左侧 3px 色条 + 浅底 + 右侧轻圆角。
:::

::: warning 注意事项 variant=pill-tag
这是 \`pill-tag\` 骨架 —— 顶部胶囊标签 + 下沉外框。
:::

::: info 背景补充 variant=ticket-notch
这是 \`ticket-notch\` 骨架 —— 票根缺口样式。
:::

::: danger 风险警示 variant=card-shadow
这是 \`card-shadow\` 骨架 —— 悬浮卡片式。
:::

::: tip 极简提醒 variant=minimal-underline
这是 \`minimal-underline\` 骨架 —— 无底色，仅下划线与缩进。
:::

::: info 终端风格 variant=terminal
这是 \`terminal\` 骨架 —— 顶部三色圆点 + 等宽正文。
:::

::: tip // NOTE variant=dashed-border
这是 \`dashed-border\` 骨架 —— 左 2px 虚线 + 浅底，工程"附注"铅笔感。
:::

::: info // REF §2.3 variant=double-border
这是 \`double-border\` 骨架 —— 左 4px 双线 + 透明底，manpage 交叉引用风。
:::

::: danger // PITFALL variant=top-bottom-rule
这是 \`top-bottom-rule\` 骨架 —— 顶底 1px 实线，报纸 errata 勘误条。
:::

::: tip 工程附注 variant=manpage-log
这是 \`manpage-log\` 骨架 —— 顶底分隔线 + \`:: NOTE ::\` 状态条，终端日志输出感（tech-geek 专属签名）。
:::

::: info 定义 variant=sidenote-latex
这是 \`sidenote-latex\` 骨架 —— 1px 细边框 + \`DEFINITION.\` 小型大写起始，LaTeX 定理框语汇（academic-frontier 专属签名）。
:::

::: warning 按 variant=marginalia
这是 \`marginalia\` 骨架 —— 无框无底、墨色一色；靠【按/疑/注/辨】CJK 符号区分类型（literary-humanism 专属签名）。
:::

::: danger 异常 · ALERT variant=ledger-cell
这是 \`ledger-cell\` 骨架 —— 深色表头条 + 硬边框，Bloomberg Terminal 数据感（business-finance 专属签名）。
:::

::: tip 今日小发现 variant=bubble-organic
这是 \`bubble-organic\` 骨架 —— 大圆角 + 单侧柔软阴影，手绘信笺气质（life-aesthetic 专属签名）。
:::

::: info 采访手记 variant=magazine-pull
这是 \`magazine-pull\` 骨架 —— 上下细线 + 浮空小字标签，《人物》特稿 pull-quote（people-story 专属签名）。
:::

::: warning 需要警惕 variant=report-section
这是 \`report-section\` 骨架 —— 顶 3px 底 1px + § 方角标签，研究报告条款感（industry-observer 专属签名）。
:::

---

## 引用卡 4 种 variant

::: quote-card 苏轼 · 前赤壁赋 variant=classic
逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。
:::

::: quote-card 鲁迅 · 野草 variant=magazine-dropcap
当我沉默着的时候，我觉得充实；我将开口，同时感到空虚。
:::

::: quote-card 张爱玲 variant=column-rule
你年轻么？不要紧，过两年就老了。
:::

::: quote-card 木心 · 云雀叫了一整天 variant=frame-brackets
你再不来，我要下雪了。
:::

---

## 对比卡 3 种 variant

:::: compare variant=column-card

::: pros 优点
- 纯前端无后端
- 所见即所得
- 一键复制到公众号
:::

::: cons 缺点
- 需要浏览器支持 Clipboard API
:::

::::

:::: compare variant=stacked-row

::: pros 收益
- 视觉一致的出稿节奏
:::

::: cons 代价
- 对 Markdown 写作有一点门槛
:::

::::

:::: compare variant=ledger

::: pros 入账
- 每次发文都自带排版资产
:::

::: cons 支出
- 初始化主题需要调参
:::

::::

---

## 分步 3 种 variant

::: steps 使用流程 variant=number-circle
### 写
在左侧编辑器里用 Markdown 写稿。

### 预览
右栏 375px 移动端实时预览。

### 复制
Ctrl / ⌘ + K 把富文本复制到公众号。
:::

::: steps 构建链路 variant=ribbon-chain
### 解析
markdown-it + 容器扩展把源文本拆成节点树。

### 样式
主题 CSS 写进 style 标签，juice 内联到每个元素。

### 打补丁
wxPatch 把公众号不兼容的语法改造为兼容形态。
:::

::: steps 发稿节奏 variant=timeline-dot
### 选稿
草稿抽屉挑一篇。

### 定主题
头部下拉切换主题；或自定义配色。

### 粘贴发送
打开公众号后台，粘贴富文本。
:::

---

## 分割线 5 种 variant

::: divider variant=wave
:::

::: divider variant=dots
:::

::: divider variant=flower
:::

::: divider variant=rule
:::

::: divider variant=glyph glyph=◆
:::

---

## 行内 & 基本元素

这段话测试**加粗**、*斜体*、\`inline code\`、==高亮==、[.着重.]、[~波浪~]、[链接](https://example.com/)。

列表：

- 第一项
- 第二项，含 \`console.log('hi')\`
- 第三项

有序列表：

1. 早起
2. 写作一小时
3. 读一本书

> 普通块引用：观点不需要花哨的排版也能立住。

\`\`\`ts
export function hello(name: string): string {
  return \`hello, \${name}\`
}
\`\`\`

---

## 签名容器 & 兜底 · abstract / key-number / see-also / note / free

::: abstract TL;DR
本文梳理 wechat-typeset 的 24+ 容器：覆盖五档提示（tip / warning / info / danger / note）、
三种签名块（abstract / key-number / see-also）、全部 33 个 variant。新容器在这里一次过目。
:::

::: key-number value="33" variant 数量
覆盖 admonition 16 × quote 4 × compare 3 × steps 3 × divider 5 × sectionTitle 2 × codeBlock 2。
换骨架不动 markdown 源码。
:::

::: note 第五态补注
note 是"中性补注"——不抢色（走 textMuted），与 tip / warning / info / danger 四态形成互补。
教程主题里最常见。
:::

::: see-also 延伸阅读
- [Headless 容器契约设计](https://example.com/headless)
- [微信硬约束清单](https://example.com/hard-rules)
- [主题 CRUD 工作流](https://example.com/theme-crud)
:::

::: free 编辑部补注
\`free\` 是兜底 escape hatch —— 渲染器刻意不施加主题样式，只套一层 \`<section>\`。
写不归类内容（致谢名单、编辑后记、补丁记录）的地方。
:::

---

## 底部组件

::: highlight 核心主张
保真复制、视觉一致、零外传 —— 三条不可妥协。
:::

::: footer-cta 关注作者 cta=每周一封来信
写写工具、写写产品、偶尔写写生活。
:::

::: recommend 推荐阅读
- [关于工具的工具](https://example.com/a)
- [关于阅读的阅读](https://example.com/b)
:::

::: qrcode 扫码关注
![二维码占位](https://placehold.co/240x240?text=QR)
:::

::: mpvoice 语音占位
用户粘贴富文本无法保留 \`<mpvoice>\`；此容器只渲染为占位提示。
:::

::: mpvideo qqvid=w0000examplevid
腾讯视频示例容器：占位 iframe 会保留 \`v.qq.com\` 白名单源。
:::

---

## Default 主题专属验证 · h4 / kbd / bare codeBlock

以下片段覆盖 default 落地后新增的渲染点 —— h4 层级在 steps 之外的独立出现、inline kbd 键帽、以及 bare variant 的 codeBlock（default 拒绝 header-bar）。

### 小节标题示例 h3

正文一段，紧接着 h4 作为更小一档的分项：

#### 分项 A · h4 独立出现

h4 在 default 里走 14px / 600 / text 色 —— 不染 primary（那是 tech-explainer 教程签名）。

#### 分项 B · 与 kbd 共现

按 <kbd>Ctrl</kbd> + <kbd>K</kbd>（或 Mac 下 <kbd>⌘</kbd> + <kbd>K</kbd>）复制富文本到公众号后台。

### bare codeBlock（default 默认）

default 的 codeBlock 走 bare variant，**没有** header-bar 语言标签带（那是 tech-explainer 签名）。代码块底色用中性深灰 \`#2a2d32\`，不沾 Atom One Dark \`#282c34\` / VSCode Dark+ \`#1e1e1e\` 出处：

\`\`\`python
def greet(name: str) -> str:
    return f"hello, {name}"
\`\`\`

> 同一段话用裸 blockquote：default 的 blockquote 走 3px primary 左边 + bgSoft 浅底 + textMuted 文字色。
`;function Zr(e){return wo[e]??wo.default??z6}const W6=["data-mobile-tab"],H6={class:"pane pane-editor"},j6={class:"pane pane-preview"},F6={class:"mobile-tabs",role:"tablist","aria-label":"视图切换"},K6=["aria-selected"],q6=["aria-selected"],Fa="wechat-typeset:theme:last",Ka="wechat-typeset:onboard:dismissed",qa=180,U6=Je({__name:"App",setup(e){const n=typeof navigator<"u"&&/Mac|iPhone|iPad|iPod/.test(navigator.platform)?"⌘":"Ctrl",i=he(""),r=he("default"),o=he(null),s=he(null),a=he(null),c=he("editor"),l=he(null),d=he(null),f=he(null),u=he(null),b=Ae(()=>o.value?Mr(o.value):s.value??Mr(r.value)),{ui:p,drawerStates:m,toggleLeft:S,toggleRight:I,closeAll:z}=a6(),{activeDraftId:R,draftIndexTick:_,displayedSavingLabel:k,displayedSavingState:B,currentDraftTitle:w,undo:y,initActiveDraft:W,handleSave:U,handleSelectDraft:q,handleDeleteDraftRequest:le,flushDraftSave:J,pingTransient:ge,showUndo:ae,onUndo:v,onUndoExpire:E,fileStem:A}=d6({md:i,baseThemeId:r,getSample:Zr}),X=Ae(()=>({md:i.value,theme:b.value})),{rendered:ie,flush:xe}=o6(X,{delayMs:80}),{outlinkStrategy:ye,setOutlinkStrategy:Oe,persistentError:Ne,handleCopy:Be,handleCopyShareLink:lt,tryLoadShareFromHash:Lt}=k6({md:i,rendered:ie,flush:xe,baseThemeId:r,activeDraftId:R,draftIndexTick:_,pingTransient:ge}),{doExportHtml:bt,doExportMd:Yt,doExportImage:xt}=R6({md:i,rendered:ie,flush:xe,activeTheme:b,getPreviewBody:()=>d.value?.getIframe?.()?.contentDocument?.body??null,fileStem:()=>A(),pingTransient:ge,setPersistentError:D=>{Ne.value=D}}),Qn=he(tn(Ka)==="1");function g(){Qn.value=!0,nn(Ka,"1")}const x=Ae(()=>!Qn.value&&!p.commandOpen&&!p.helpOpen&&p.leftSlot===null&&p.rightSlot===null),$=Ae(()=>p.leftSlot!==null||p.rightSlot!==null||p.commandOpen||p.helpOpen);nt(c,()=>{z()}),nt(r,(D,F)=>{if(nn(Fa,D),s.value&&D!==F){const me=s.value,it=a.value;s.value=null,a.value=null,ae("已切换主题并重置自定义配色",()=>{r.value=F,s.value=me,a.value=it})}if(D!==F){const me=i.value.replace(/\r\n/g,`
`);Object.values(wo).some(Cn=>Cn.replace(/\r\n/g,`
`)===me)&&(i.value=Zr(D))}R.value&&(Zi(R.value,{themeId:D}),_.value+=1)});function M(){if(!i.value)return;const D=i.value;i.value="",ae("已清空正文",()=>{i.value=D})}function O(){const D=Zr(r.value);if(i.value===D)return;const F=i.value;i.value=D,F.trim()?ae("已载入示例，原正文可撤销",()=>{i.value=F}):ge("已载入示例")}function N(D){o.value=null,r.value!==D&&(r.value=D)}function T(){const D=i.value;if(!D){ge("正文为空");return}const F=zo(D);if(F.length===0){ge("中文排版已干净");return}i.value=ih(D),ae(`已修正 ${F.length} 处中文排版`,()=>{i.value=D})}function V(D){const F=Mr(r.value);s.value=N6({base:F,seed:D,id:`${F.id}--custom`,name:`${F.name} · 自定义`}),a.value={...D}}function P(){s.value&&(s.value=null,a.value=null,ge("已还原主题配色"))}function C(D){const F=l.value;F&&typeof F.insertAtCursor=="function"?F.insertAtCursor(D):i.value=`${i.value}${i.value.endsWith(`
`)?"":`
`}
${D}`,ge("已插入")}function ne(){const F=l.value?.getSelectedText?.()??"";if(!F.trim()){ge("先在编辑器中选中一段 markdown");return}p.rightSlot!=="components"&&(p.rightSlot="components"),requestAnimationFrame(()=>u.value?.openSaveDialog?.(F))}function Y(D){D==="drafts"?S("drafts"):I(D)}function te(D){switch(D){case"copy":Be();return;case"clear":M();return;case"loadSample":O();return;case"saveSelection":ne();return;case"fixZhTypo":T();return;case"exportHtml":bt();return;case"exportMd":Yt();return;case"exportImage":xt();return;case"copyShareLink":lt();return;case"openCommand":p.commandOpen=!0;return;case"openHelp":p.helpOpen=!0;return;case"dismissError":Ne.value=null;return}}let oe=0,L=null;function K(D){L==="preview"&&Date.now()-oe<qa||(L="editor",oe=Date.now(),d.value?.scrollToRatio(D))}function Z(D){L==="editor"&&Date.now()-oe<qa||(L="preview",oe=Date.now(),l.value?.scrollToRatio(D))}const se=Ae(()=>{_.value;const D=[];return D.push({id:"copy",title:"复制为微信富文本",group:"操作",shortcut:`${n} ↵`,run:Be}),D.push({id:"save",title:"保存当前草稿",group:"操作",shortcut:`${n} S`,run:U}),D.push({id:"clear",title:"清空正文",group:"操作",run:M}),D.push({id:"load-sample",title:"载入当前主题示例",group:"操作",run:O}),D.push({id:"save-selection",title:"保存选区为组件",group:"操作",run:ne}),D.push({id:"fix-zh-typo",title:"一键修复中文排版",group:"操作",run:T}),D.push({id:"toggle-drafts",title:m.value.drafts?"关闭草稿抽屉":"打开草稿抽屉",group:"视图",shortcut:`${n} ⇧ D`,run:()=>S("drafts")}),D.push({id:"toggle-components",title:m.value.components?"关闭组件库":"打开组件库",group:"视图",shortcut:`${n} ⇧ P`,run:()=>I("components")}),D.push({id:"toggle-customizer",title:m.value.customizer?"关闭自定义配色":"打开自定义配色",group:"视图",shortcut:`${n} ⇧ C`,run:()=>I("customizer")}),D.push({id:"toggle-checklist",title:m.value.checklist?"关闭发文清单":"打开发文清单",group:"视图",run:()=>I("checklist")}),D.push({id:"open-help",title:"快捷键与帮助",group:"视图",shortcut:"?",run:()=>p.helpOpen=!0}),D.push({id:"export-html",title:"导出 HTML",group:"导出",shortcut:`${n} ⇧ H`,run:bt}),D.push({id:"export-md",title:"导出 Markdown",group:"导出",shortcut:`${n} ⇧ M`,run:Yt}),D.push({id:"export-image",title:"导出长图",group:"导出",run:xt}),D.push({id:"copy-share-link",title:"复制分享链接",group:"导出",run:lt}),Yi.forEach(F=>{D.push({id:`theme-${F.id}`,title:`主题 · ${F.name}`,group:"主题",keywords:`${F.id} theme`,run:()=>{r.value=F.id}})}),D.push({id:"new-draft",title:"新建草稿",group:"草稿",run:()=>{const F=hr({title:"新草稿",body:`# 新草稿
`,themeId:r.value});q(F.id),_.value+=1}}),mn().slice(0,30).forEach(F=>{D.push({id:`draft-${F.id}`,title:`草稿 · ${F.title||"未命名"}`,group:"草稿",keywords:F.themeId,run:()=>q(F.id)})}),D});return M6({openCommand:()=>{p.commandOpen=!0},copy:Be,save:U,toggleCustomizer:()=>I("customizer"),toggleDrafts:()=>S("drafts"),toggleComponents:()=>I("components"),exportHtml:bt,exportMd:Yt,openHelp:()=>{p.helpOpen=!0},closeCommand:()=>p.commandOpen?(p.commandOpen=!1,!0):!1,closeHelp:()=>p.helpOpen?(p.helpOpen=!1,!0):!1}),on(()=>{const D=tn(Fa);D&&(r.value=D),Lt((me,it,Cn)=>{R.value=me,i.value=it,r.value=Cn})||W(r.value),window.addEventListener("pagehide",J)}),nt($,D=>{if(typeof document>"u")return;const F=window.matchMedia("(max-width: 767px)").matches;document.body.classList.toggle("drawer-scroll-lock",D&&F)}),sn(()=>{window.removeEventListener("pagehide",J),J(),typeof document<"u"&&document.body.classList.remove("drawer-scroll-lock")}),(D,F)=>(j(),G("div",{class:Ie(["app",{"drawer-open":$.value}])},[Ge(c0,{ref_key:"toolbarRef",ref:f,"draft-title":ee(w),"word-count":ee(ie).wordCount,"reading-time":ee(ie).readingTime,"saving-state":ee(B),"saving-label":ee(k),error:ee(Ne),"theme-id":r.value,"has-custom-color":s.value!==null,drawer:ee(m),"outlink-strategy":ee(ye),"onUpdate:themeId":F[0]||(F[0]=me=>r.value=me),"onUpdate:outlinkStrategy":ee(Oe),onToggle:Y,onAction:te},null,8,["draft-title","word-count","reading-time","saving-state","saving-label","error","theme-id","has-custom-color","drawer","outlink-strategy","onUpdate:outlinkStrategy"]),h("main",{class:"main","data-mobile-tab":c.value},[ee(p).leftSlot==="drafts"?(j(),Ot(Z0,{key:0,"active-id":ee(R),onSelect:ee(q),onClose:F[1]||(F[1]=me=>ee(p).leftSlot=null),onRequestDelete:ee(le)},null,8,["active-id","onSelect","onRequestDelete"])):Se("",!0),h("section",H6,[Ge(eg,{ref_key:"editorRef",ref:l,modelValue:i.value,"onUpdate:modelValue":F[2]||(F[2]=me=>i.value=me),onScroll:K},null,8,["modelValue"]),x.value?(j(),Ot(Sw,{key:0,onDismiss:g,onOpenHelp:F[3]||(F[3]=me=>{ee(p).helpOpen=!0,g()}),onOpenCommand:F[4]||(F[4]=me=>{ee(p).commandOpen=!0,g()}),onOpenOverflow:F[5]||(F[5]=me=>{f.value?.openOverflow(),g()})})):Se("",!0)]),h("section",j6,[Ge(mg,{themes:ee(Yi),"active-id":r.value,"hover-id":o.value,onHover:F[6]||(F[6]=me=>o.value=me),onSelect:N},null,8,["themes","active-id","hover-id"]),Ge(dg,{ref_key:"previewRef",ref:d,html:ee(ie).html,"patch-log":ee(ie).patchLog,onScroll:Z},null,8,["html","patch-log"])]),ee(p).rightSlot==="components"?(j(),Ot(Ev,{key:1,ref_key:"paletteRef",ref:u,theme:b.value,onInsert:C,onClose:F[7]||(F[7]=me=>ee(p).rightSlot=null)},null,8,["theme"])):Se("",!0),ee(p).rightSlot==="customizer"?(j(),Ot(Cx,{key:2,"has-custom-color":s.value!==null,onApply:V,onReset:P,onClose:F[8]||(F[8]=me=>ee(p).rightSlot=null)},null,8,["has-custom-color"])):Se("",!0),ee(p).rightSlot==="checklist"?(j(),Ot(Uv,{key:3,md:i.value,onClose:F[9]||(F[9]=me=>ee(p).rightSlot=null)},null,8,["md"])):Se("",!0)],8,W6),ee(p).commandOpen?(j(),Ot(ew,{key:0,commands:se.value,onClose:F[10]||(F[10]=me=>ee(p).commandOpen=!1)},null,8,["commands"])):Se("",!0),ee(p).helpOpen?(j(),Ot(mw,{key:1,commands:se.value,onClose:F[11]||(F[11]=me=>ee(p).helpOpen=!1),onInsert:C},null,8,["commands"])):Se("",!0),ee(y)?(j(),Ot(Aw,{key:2,message:ee(y).message,onUndo:ee(v),onExpire:ee(E)},null,8,["message","onUndo","onExpire"])):Se("",!0),ee(p).leftSlot||ee(p).rightSlot?(j(),G("div",{key:3,class:"mobile-drawer-mask","aria-hidden":"true",onClick:F[12]||(F[12]=me=>{ee(p).leftSlot=null,ee(p).rightSlot=null})})):Se("",!0),h("nav",F6,[h("button",{class:Ie(["mobile-tab",{active:c.value==="editor"}]),role:"tab","aria-selected":c.value==="editor",onClick:F[13]||(F[13]=me=>c.value="editor")},"编辑",10,K6),h("button",{class:"mobile-tab-copy","aria-label":"复制到剪贴板",onClick:F[14]||(F[14]=(...me)=>ee(Be)&&ee(Be)(...me))},"一键复制"),h("button",{class:Ie(["mobile-tab",{active:c.value==="preview"}]),role:"tab","aria-selected":c.value==="preview",onClick:F[15]||(F[15]=me=>c.value="preview")},"预览",10,q6)])],2))}}),V6=Qe(U6,[["__scopeId","data-v-7ea72212"]]);Du(V6).mount("#app");
