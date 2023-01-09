(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const M={};function pt(e){M.context=e}const Nt=(e,t)=>e===t,V=Symbol("solid-proxy"),Se=Symbol("solid-track"),fe={equals:Nt};let tt=ut;const Z=1,ae=2,nt={owned:null,cleanups:null,context:null,owner:null};var C=null;let F=null,x=null,T=null,H=null,Te=0;function ce(e,t){const n=x,s=C,i=e.length===0,o=i?nt:{owned:null,cleanups:null,context:null,owner:t||s},r=i?e:()=>e(()=>Q(()=>Le(o)));C=o,x=null;try{return J(r,!0)}finally{x=n,C=s}}function P(e,t){t=t?Object.assign({},fe,t):fe;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),ct(n,i));return[rt.bind(n),s]}function _(e,t,n){const s=Ee(e,t,!1,Z);ie(s)}function st(e,t,n){tt=Lt;const s=Ee(e,t,!1,Z);s.user=!0,H?H.push(s):ie(s)}function I(e,t,n){n=n?Object.assign({},fe,n):fe;const s=Ee(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,ie(s),rt.bind(s)}function Ct(e){return J(e,!1)}function Q(e){const t=x;x=null;try{return e()}finally{x=t}}function it(e,t,n){const s=Array.isArray(e);let i,o=n&&n.defer;return r=>{let l;if(s){l=Array(e.length);for(let u=0;u<e.length;u++)l[u]=e[u]()}else l=e();if(o){o=!1;return}const c=Q(()=>t(l,i,r));return i=l,c}}function we(e){return C===null||(C.cleanups===null?C.cleanups=[e]:C.cleanups.push(e)),e}function ot(){return x}function lt(){return C}function rt(){const e=F;if(this.sources&&(this.state||e))if(this.state===Z||e)ie(this);else{const t=T;T=null,J(()=>he(this),!1),T=t}if(x){const t=this.observers?this.observers.length:0;x.sources?(x.sources.push(this),x.sourceSlots.push(t)):(x.sources=[this],x.sourceSlots=[t]),this.observers?(this.observers.push(x),this.observerSlots.push(x.sources.length-1)):(this.observers=[x],this.observerSlots=[x.sources.length-1])}return this.value}function ct(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&J(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],r=F&&F.running;r&&F.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?T.push(o):H.push(o),o.observers&&ft(o)),r||(o.state=Z)}if(T.length>1e6)throw T=[],new Error},!1)),t}function ie(e){if(!e.fn)return;Le(e);const t=C,n=x,s=Te;x=C=e,Tt(e,e.value,s),x=n,C=t}function Tt(e,t,n){let s;try{s=e.fn(t)}catch(i){e.pure&&(e.state=Z),at(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ct(e,s):e.value=s,e.updatedAt=n)}function Ee(e,t,n,s=Z,i){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:C,context:null,pure:n};return C===null||C!==nt&&(C.owned?C.owned.push(o):C.owned=[o]),o}function de(e){const t=F;if(e.state===0||t)return;if(e.state===ae||t)return he(e);if(e.suspense&&Q(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Te);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===Z||t)ie(e);else if(e.state===ae||t){const i=T;T=null,J(()=>he(e,n[0]),!1),T=i}}function J(e,t){if(T)return e();let n=!1;t||(T=[]),H?n=!0:H=[],Te++;try{const s=e();return Et(n),s}catch(s){T||(H=null),at(s)}}function Et(e){if(T&&(ut(T),T=null),e)return;const t=H;H=null,t.length&&J(()=>tt(t),!1)}function ut(e){for(let t=0;t<e.length;t++)de(e[t])}function Lt(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:de(s)}for(M.context&&pt(),t=0;t<n;t++)de(e[t])}function he(e,t){const n=F;e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];i.sources&&(i.state===Z||n?i!==t&&de(i):(i.state===ae||n)&&he(i,t))}}function ft(e){const t=F;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=ae,s.pure?T.push(s):H.push(s),s.observers&&ft(s))}}function Le(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const o=i.pop(),r=n.observerSlots.pop();s<i.length&&(o.sourceSlots[r]=s,i[s]=o,n.observerSlots[s]=r)}}if(e.owned){for(t=0;t<e.owned.length;t++)Le(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Ot(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function at(e){throw e=Ot(e),e}const Rt=Symbol("fallback");function Fe(e){for(let t=0;t<e.length;t++)e[t]()}function Bt(e,t,n={}){let s=[],i=[],o=[],r=0,l=t.length>1?[]:null;return we(()=>Fe(o)),()=>{let c=e()||[],u,f;return c[Se],Q(()=>{let $=c.length,m,g,v,A,S,E,R,L,B;if($===0)r!==0&&(Fe(o),o=[],s=[],i=[],r=0,l&&(l=[])),n.fallback&&(s=[Rt],i[0]=ce(h=>(o[0]=h,n.fallback())),r=1);else if(r===0){for(i=new Array($),f=0;f<$;f++)s[f]=c[f],i[f]=ce(w);r=$}else{for(v=new Array($),A=new Array($),l&&(S=new Array($)),E=0,R=Math.min(r,$);E<R&&s[E]===c[E];E++);for(R=r-1,L=$-1;R>=E&&L>=E&&s[R]===c[L];R--,L--)v[L]=i[R],A[L]=o[R],l&&(S[L]=l[R]);for(m=new Map,g=new Array(L+1),f=L;f>=E;f--)B=c[f],u=m.get(B),g[f]=u===void 0?-1:u,m.set(B,f);for(u=E;u<=R;u++)B=s[u],f=m.get(B),f!==void 0&&f!==-1?(v[f]=i[u],A[f]=o[u],l&&(S[f]=l[u]),f=g[f],m.set(B,f)):o[u]();for(f=E;f<$;f++)f in v?(i[f]=v[f],o[f]=A[f],l&&(l[f]=S[f],l[f](f))):i[f]=ce(w);i=i.slice(0,r=$),s=c.slice(0)}return i});function w($){if(o[f]=$,l){const[m,g]=P(f);return l[f]=g,t(c[f],m)}return t(c[f])}}}function y(e,t){return Q(()=>e(t||{}))}function Y(e){const t="fallback"in e&&{fallback:()=>e.fallback};return I(Bt(()=>e.each,e.children,t||void 0))}const Pt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],jt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Pt]),Mt=new Set(["innerHTML","textContent","innerText","children"]),It=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Ve=Object.assign(Object.create(null),{class:"className",formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"}),qt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Ht={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Kt(e,t,n){let s=n.length,i=t.length,o=s,r=0,l=0,c=t[i-1].nextSibling,u=null;for(;r<i||l<o;){if(t[r]===n[l]){r++,l++;continue}for(;t[i-1]===n[o-1];)i--,o--;if(i===r){const f=o<s?l?n[l-1].nextSibling:n[o-l]:c;for(;l<o;)e.insertBefore(n[l++],f)}else if(o===l)for(;r<i;)(!u||!u.has(t[r]))&&t[r].remove(),r++;else if(t[r]===n[o-1]&&n[l]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[l++],t[r++].nextSibling),e.insertBefore(n[--o],f),t[i]=n[o]}else{if(!u){u=new Map;let w=l;for(;w<o;)u.set(n[w],w++)}const f=u.get(t[r]);if(f!=null)if(l<f&&f<o){let w=r,$=1,m;for(;++w<i&&w<o&&!((m=u.get(t[w]))==null||m!==f+$);)$++;if($>f-l){const g=t[r];for(;l<f;)e.insertBefore(n[l++],g)}else e.replaceChild(n[l++],t[r++])}else r++;else t[r++].remove()}}}const Ue="_$DX_DELEGATE";function Dt(e,t,n,s={}){let i;return ce(o=>{i=o,t===document?e():a(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function b(e,t,n){const s=document.createElement("template");s.innerHTML=e;let i=s.content.firstChild;return n&&(i=i.firstChild),i}function z(e,t=window.document){const n=t[Ue]||(t[Ue]=new Set);for(let s=0,i=e.length;s<i;s++){const o=e[s];n.has(o)||(n.add(o),t.addEventListener(o,Xt))}}function Oe(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Zt(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function d(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ft(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=o=>i.call(e,n[1],o))}else e.addEventListener(t,n)}function Vt(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let o,r;for(o=0,r=i.length;o<r;o++){const l=i[o];!l||l==="undefined"||t[l]||(Ge(e,l,!1),delete n[l])}for(o=0,r=s.length;o<r;o++){const l=s[o],c=!!t[l];!l||l==="undefined"||n[l]===c||!c||(Ge(e,l,!0),n[l]=c)}return n}function Ut(e,t,n){if(!t)return n?Oe(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,o;for(o in n)t[o]==null&&s.removeProperty(o),delete n[o];for(o in t)i=t[o],i!==n[o]&&(s.setProperty(o,i),n[o]=i);return n}function K(e,t={},n,s){const i={};return s||_(()=>i.children=X(e,t.children,i.children)),_(()=>t.ref&&t.ref(e)),_(()=>Wt(e,t,n,!0,i,!0)),i}function Gt(e,t,n){return Q(()=>e(t,n))}function a(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return X(e,t,s,n);_(i=>X(e,t(),i,n),s)}function Wt(e,t,n,s,i={},o=!1){t||(t={});for(const r in i)if(!(r in t)){if(r==="children")continue;i[r]=We(e,r,null,i[r],n,o)}for(const r in t){if(r==="children"){s||X(e,t.children);continue}const l=t[r];i[r]=We(e,r,l,i[r],n,o)}}function Yt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Ge(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,o=s.length;i<o;i++)e.classList.toggle(s[i],n)}function We(e,t,n,s,i,o){let r,l,c;if(t==="style")return Ut(e,n,s);if(t==="classList")return Vt(e,n,s);if(n===s)return s;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const u=t.slice(3);s&&e.removeEventListener(u,s),n&&e.addEventListener(u,n)}else if(t.slice(0,10)==="oncapture:"){const u=t.slice(10);s&&e.removeEventListener(u,s,!0),n&&e.addEventListener(u,n,!0)}else if(t.slice(0,2)==="on"){const u=t.slice(2).toLowerCase(),f=qt.has(u);if(!f&&s){const w=Array.isArray(s)?s[0]:s;e.removeEventListener(u,w)}(f||n)&&(Ft(e,u,n,f),f&&z([u]))}else if((c=Mt.has(t))||!i&&(Ve[t]||(l=jt.has(t)))||(r=e.nodeName.includes("-")))t==="class"||t==="className"?d(e,n):r&&!l&&!c?e[Yt(t)]=n:e[Ve[t]||t]=n;else{const u=i&&t.indexOf(":")>-1&&Ht[t.split(":")[0]];u?Zt(e,u,t,n):Oe(e,It[t]||t,n)}return n}function Xt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),M.registry&&!M.done&&(M.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function X(e,t,n,s,i){for(M.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,r=s!==void 0;if(e=r&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(M.context)return n;if(o==="number"&&(t=t.toString()),r){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=U(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(M.context)return n;n=U(e,n,s)}else{if(o==="function")return _(()=>{let l=t();for(;typeof l=="function";)l=l();n=X(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],c=n&&Array.isArray(n);if(pe(l,t,n,i))return _(()=>n=X(e,l,n,s,!0)),()=>n;if(M.context){if(!l.length)return n;for(let u=0;u<l.length;u++)if(l[u].parentNode)return n=l}if(l.length===0){if(n=U(e,n,s),r)return n}else c?n.length===0?Ye(e,l,s):Kt(e,n,l):(n&&U(e),Ye(e,l));n=l}else if(t instanceof Node){if(M.context&&t.parentNode)return n=r?[t]:t;if(Array.isArray(n)){if(r)return n=U(e,n,s,t);U(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function pe(e,t,n,s){let i=!1;for(let o=0,r=t.length;o<r;o++){let l=t[o],c=n&&n[o];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=pe(e,l,c)||i;else if(typeof l=="function")if(s){for(;typeof l=="function";)l=l();i=pe(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||i}else e.push(l),i=!0;else{const u=String(l);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return i}function Ye(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function U(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let o=!1;for(let r=t.length-1;r>=0;r--){const l=t[r];if(i!==l){const c=l.parentNode===e;!o&&!r?c?e.replaceChild(i,l):e.insertBefore(i,n):c&&l.remove()}else o=!0}}else e.insertBefore(i,n);return[i]}var be=(e,t)=>{let n=!1,s,i;const o=(...l)=>{i=l,!n&&(n=!0,s=setTimeout(()=>{e(...i),n=!1},t))},r=()=>{clearTimeout(s),n=!1};return lt()&&we(r),Object.assign(o,{clear:r})};function Qt(e,t,n){let s=!1;const o=e(()=>s=!1,n),r=(...c)=>{s||t(...c),s=!0,o()},l=()=>{s=!1,o.clear()};return lt()&&we(l),Object.assign(r,{clear:l})}var ge=(e=>(e[e.PATTERN=0]="PATTERN",e[e.PRIMARY=1]="PRIMARY",e[e.SECONDARY=2]="SECONDARY",e[e.ALTERNATIVE=3]="ALTERNATIVE",e))(ge||{});const dt="⎇",ue=[["1000","Е","Т","Ё"],["0100","О","В","Ф"],["0010","А","Л","Э"],["0001","И","У","Ъ"],["1100","Н","М"],["0110","С","Ь"],["0011","Д","Ч"],["1010","Я","Ж"],["0101","Й","З"],["1001","Б",dt],["1110","Р","К"],["0111","Ы","Х"],["1011","Ц","Щ"],["1101","Ю","Ш"],["1111","П","Г"]],[ht,Jt]=P("left"),Ne=Symbol("store-raw"),ne=Symbol("store-node"),zt=Symbol("store-name");function gt(e,t){let n=e[V];if(!n&&(Object.defineProperty(e,V,{value:n=new Proxy(e,nn)}),!Array.isArray(e))){const s=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let o=0,r=s.length;o<r;o++){const l=s[o];if(i[l].get){const c=i[l].get.bind(n);Object.defineProperty(e,l,{enumerable:i[l].enumerable,get:c})}}}return n}function _e(e){let t;return e!=null&&typeof e=="object"&&(e[V]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function se(e,t=new Set){let n,s,i,o;if(n=e!=null&&e[Ne])return n;if(!_e(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let r=0,l=e.length;r<l;r++)i=e[r],(s=se(i,t))!==i&&(e[r]=s)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const r=Object.keys(e),l=Object.getOwnPropertyDescriptors(e);for(let c=0,u=r.length;c<u;c++)o=r[c],!l[o].get&&(i=e[o],(s=se(i,t))!==i&&(e[o]=s))}return e}function Re(e){let t=e[ne];return t||Object.defineProperty(e,ne,{value:t={}}),t}function Ce(e,t,n){return e[t]||(e[t]=vt(n))}function en(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===V||t===ne||t===zt||(delete n.value,delete n.writable,n.get=()=>e[V][t]),n}function _t(e){if(ot()){const t=Re(e);(t._||(t._=vt()))()}}function tn(e){return _t(e),Reflect.ownKeys(e)}function vt(e){const[t,n]=P(e,{equals:!1,internal:!0});return t.$=n,t}const nn={get(e,t,n){if(t===Ne)return e;if(t===V)return n;if(t===Se)return _t(e),n;const s=Re(e),i=s.hasOwnProperty(t);let o=i?s[t]():e[t];if(t===ne||t==="__proto__")return o;if(!i){const r=Object.getOwnPropertyDescriptor(e,t);ot()&&(typeof o!="function"||e.hasOwnProperty(t))&&!(r&&r.get)&&(o=Ce(s,t,o)())}return _e(o)?gt(o):o},has(e,t){return t===Ne||t===V||t===Se||t===ne||t==="__proto__"?!0:(this.get(e,t,e),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:tn,getOwnPropertyDescriptor:en};function ve(e,t,n,s=!1){if(!s&&e[t]===n)return;const i=e[t],o=e.length;n===void 0?delete e[t]:e[t]=n;let r=Re(e),l;(l=Ce(r,t,i))&&l.$(()=>n),Array.isArray(e)&&e.length!==o&&(l=Ce(r,"length",o))&&l.$(e.length),(l=r._)&&l.$()}function yt(e,t){const n=Object.keys(t);for(let s=0;s<n.length;s+=1){const i=n[s];ve(e,i,t[i])}}function sn(e,t){if(typeof t=="function"&&(t=t(e)),t=se(t),Array.isArray(t)){if(e===t)return;let n=0,s=t.length;for(;n<s;n++){const i=t[n];e[n]!==i&&ve(e,n,i)}ve(e,"length",s)}else yt(e,t)}function ee(e,t,n=[]){let s,i=e;if(t.length>1){s=t.shift();const r=typeof s,l=Array.isArray(e);if(Array.isArray(s)){for(let c=0;c<s.length;c++)ee(e,[s[c]].concat(t),n);return}else if(l&&r==="function"){for(let c=0;c<e.length;c++)s(e[c],c)&&ee(e,[c].concat(t),n);return}else if(l&&r==="object"){const{from:c=0,to:u=e.length-1,by:f=1}=s;for(let w=c;w<=u;w+=f)ee(e,[w].concat(t),n);return}else if(t.length>1){ee(e[s],t,[s].concat(n));return}i=e[s],n=[s].concat(n)}let o=t[0];typeof o=="function"&&(o=o(i,n),o===i)||s===void 0&&o==null||(o=se(o),s===void 0||_e(i)&&_e(o)&&!Array.isArray(o)?yt(i,o):ve(e,s,o))}function $t(...[e,t]){const n=se(e||{}),s=Array.isArray(n),i=gt(n);function o(...r){Ct(()=>{s&&r.length===1?sn(n,r[0]):ee(n,r)})}return[i,o]}const on={left:{thumb:" ",index:"f",middle:"d",ring:"s",little:"a"},right:{thumb:" ",index:"j",middle:"k",ring:"l",little:";"}},[wt,ln]=$t(on),[G,rn]=P(!1),[ye,bt]=P(void 0),cn={leftRightBoth:"both",shouldSwitchHands:!1,shouldShowKeyLetters:!0,keyRepeatFrequency:50,keyScanFrequency:80},[O,me]=$t(cn);function mt(e){var t,n,s="";if(typeof e=="string"||typeof e=="number")s+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=mt(e[t]))&&(s&&(s+=" "),s+=n);else for(t in e)e[t]&&(s&&(s+=" "),s+=t);return s}function N(){for(var e,t,n=0,s="";n<arguments.length;)(e=arguments[n++])&&(t=mt(e))&&(s&&(s+=" "),s+=t);return s}const un=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.88 21.88h6.24c5.256 0 7.55-2.363 7.55-7.408V8.319c0-1.88-.993-2.865-2.892-2.865H6.222c-1.899 0-2.892.976-2.892 2.865v6.153c0 5.045 2.285 7.409 7.55 7.409Zm.035-1.766c-4.07 0-5.836-1.766-5.836-5.58V8.477c0-.835.457-1.275 1.257-1.275h15.328c.791 0 1.248.44 1.248 1.275v6.055c0 3.815-1.758 5.581-5.827 5.581h-6.17Zm1.494-2.522h3.902c.431 0 .73-.264.73-.703 0-.449-.299-.703-.73-.703h-3.023v-5.67c0-.615-.316-.984-.879-.984-.562 0-.87.387-.87.985v6.1c0 .588.308.975.87.975Z" fill="currentColor"></path></svg>'),At=(e={})=>(()=>{const t=un.cloneNode(!0);return K(t,e,!0,!0),t})(),fn=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.88 21.88h6.24c5.256 0 7.55-2.363 7.55-7.408V8.319c0-1.88-.993-2.865-2.892-2.865H6.222c-1.899 0-2.892.976-2.892 2.865v6.153c0 5.045 2.285 7.409 7.55 7.409Zm.035-1.766c-4.07 0-5.836-1.766-5.836-5.58V8.477c0-.835.457-1.275 1.257-1.275h15.328c.791 0 1.248.44 1.248 1.275v6.055c0 3.815-1.758 5.581-5.827 5.581h-6.17Zm.817-2.408c.528 0 .827-.343.827-.905v-1.986h1.423l1.424 2.329c.264.413.466.562.826.562.449 0 .756-.29.756-.703a.9.9 0 0 0-.184-.563l-1.23-1.898c1.01-.325 1.66-1.23 1.66-2.312 0-1.6-1.133-2.584-2.98-2.584h-2.46c-.571 0-.87.37-.87.967v6.188c0 .554.281.905.808.905Zm.827-4.096v-2.724h1.494c.914 0 1.511.5 1.511 1.38 0 .861-.588 1.344-1.538 1.344H12.56Z" fill="currentColor"></path></svg>'),kt=(e={})=>(()=>{const t=fn.cloneNode(!0);return K(t,e,!0,!0),t})(),an="_iconButton_1f2h0_1",dn="_isDisabled_1f2h0_17",hn="_isActive_1f2h0_27",gn="_isInactive_1f2h0_51",oe={iconButton:an,isDisabled:dn,isActive:hn,isInactive:gn},_n=b("<button></button>"),$e=e=>(()=>{const t=_n.cloneNode(!0);return t.$$click=()=>e.isDisabled?null:e.onClick(),a(t,()=>e.icon),_(()=>d(t,N(oe.iconButton,{[oe.isActive]:e.isActive!==void 0&&e.isActive,[oe.isInactive]:e.isInactive!==void 0&&e.isInactive,[oe.isDisabled]:e.isDisabled}))),t})();z(["click"]);const vn="_key_9q7wt_1",yn="_isActive_9q7wt_29",$n="_isSecondary_9q7wt_39",wn="_keyboard_9q7wt_57",bn="_half_9q7wt_67",mn="_reversed_9q7wt_77",An="_thumb_9q7wt_85",kn="_icon_9q7wt_95",xn="_iconLeft_9q7wt_117",Sn="_iconRight_9q7wt_125",j={key:vn,isActive:yn,isSecondary:$n,keyboard:wn,half:bn,reversed:mn,thumb:An,icon:kn,iconLeft:xn,iconRight:Sn},pn=b('<button type="button"></button>'),le=b("<div></div>"),Xe={Unidentified:"␣"," ":"␣"},Qe=e=>{const t=()=>e.letter!==void 0&&Object.keys(Xe).includes(e.letter)?Xe[e.letter]:e.letter;return(()=>{const n=pn.cloneNode(!0);return n.$$click=()=>e.onClick?e.onClick():null,a(n,(()=>{const s=I(()=>!!O.shouldShowKeyLetters);return()=>s()&&t()})()),_(()=>d(n,N(j.key,{[j.isActive]:e.isActive,[j.isSecondary]:e.isSecondary}))),n})()},Nn=["little","ring","middle","index","thumb"],Cn=e=>{const t=n=>{const s=n==="left",i=(()=>{const o=le.cloneNode(!0);return a(o,y($e,{icon:s?At:kt,onClick:()=>null,get isActive(){return I(()=>!!(O.leftRightBoth==="both"&&O.shouldSwitchHands))()&&ht()===n},get isInactive(){return O.leftRightBoth===n}})),_(()=>d(o,N(j.icon,{[j.iconLeft]:s,[j.iconRight]:!s}))),o})();return(()=>{const o=le.cloneNode(!0);return a(o,y(Y,{each:Nn,children:r=>{const l=()=>e.states[n][r]||ye()?.key===r&&ye()?.half===n,c=()=>{G()&&bt({key:r,half:n})};return r==="thumb"?(()=>{const u=le.cloneNode(!0);return a(u,y(Qe,{get letter(){return e.symbols[n][r]},get isActive(){return l()},onClick:c,isSecondary:!0}),null),a(u,i,null),_(()=>d(u,j.thumb)),u})():y(Qe,{get letter(){return e.symbols[n][r]},get isActive(){return l()},onClick:c})}})),_(()=>d(o,N(j.half,{[j.reversed]:!s}))),o})()};return(()=>{const n=le.cloneNode(!0);return a(n,()=>t("left"),null),a(n,()=>t("right"),null),_(()=>d(n,j.keyboard)),n})()};z(["click"]);const Tn=async()=>(await(await fetch("https://fish-text.ru/get?type=sentence&number=2&format=json")).json()).text,En=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.274 12.6h-1.23C22.525 8.144 18.658 4.566 14 4.566A8.886 8.886 0 0 0 7.47 7.45c-.431.422-.413.985-.062 1.31.36.334.88.334 1.319-.07A7.17 7.17 0 0 1 14 6.385a7.251 7.251 0 0 1 7.207 6.214h-1.345c-.676 0-.861.5-.465 1.046l2.1 2.97c.325.44.817.448 1.134 0l2.11-2.962c.395-.553.219-1.054-.467-1.054ZM3.726 14.718h1.239C5.483 19.174 9.35 22.75 14 22.75a8.903 8.903 0 0 0 6.548-2.892c.422-.422.404-.984.053-1.31-.36-.333-.87-.333-1.319.08A7.117 7.117 0 0 1 14 20.932a7.25 7.25 0 0 1-7.198-6.214h1.336c.668 0 .861-.501.465-1.046l-2.109-2.97c-.316-.44-.808-.45-1.125 0l-2.11 2.961c-.404.554-.219 1.055.467 1.055Z" fill="currentColor"></path></svg>'),Ln=(e={})=>(()=>{const t=En.cloneNode(!0);return K(t,e,!0,!0),t})(),On=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22.727 6.614.66-.694c.334-.352.36-.835.026-1.169l-.228-.237c-.3-.3-.8-.255-1.125.07l-.686.668 1.354 1.362Zm-10.406 9.352 1.802-.756 7.963-7.963-1.354-1.345-7.962 7.972-.791 1.74c-.088.202.14.43.342.352Zm-3.34 5.897h10.24c1.687 0 2.68-.984 2.68-2.865V9.717l-1.757 1.749v7.374c0 .844-.449 1.265-1.038 1.265H9.096c-.809 0-1.248-.421-1.248-1.265V9.075c0-.844.44-1.265 1.248-1.265h7.462l1.749-1.758H8.98c-1.898 0-2.891.984-2.891 2.865v10.081c0 1.88.993 2.865 2.891 2.865Z" fill="currentColor"></path></svg>'),Rn=(e={})=>(()=>{const t=On.cloneNode(!0);return K(t,e,!0,!0),t})(),Bn=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.085 13.364-2.408 4.711a3.126 3.126 0 0 0-.352 1.389c0 1.327.976 2.478 2.558 2.478h12.225c1.582 0 2.558-1.151 2.558-2.478 0-.457-.123-.932-.352-1.389L16.18 6.095A2.502 2.502 0 0 0 14 4.752c-.861 0-1.767.5-2.188 1.345l-2.004 3.928 1.257 1.249 2.144-4.28c.158-.326.457-.537.791-.537.325 0 .615.211.782.536l4.614 9.167h-4.921L7.013 8.697c-.317-.325-.747-.334-1.09-.009-.343.343-.317.783 0 1.108l6.363 6.363H8.56l.782-1.538-1.257-1.257Zm6.67 1.609V9.348c0-.457-.272-.756-.729-.756-.457 0-.738.299-.738.756v4.148l1.468 1.477Zm-6.714 5.29c-.571 0-.914-.439-.914-.931 0-.158.035-.343.123-.51l.571-1.125 12.34-.017.58 1.142c.088.176.132.343.132.501 0 .501-.343.94-.923.94H8.041Z" fill="currentColor"></path></svg>'),Pn=(e={})=>(()=>{const t=Bn.cloneNode(!0);return K(t,e,!0,!0),t})(),jn=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.246 13.646a.97.97 0 0 0 .299.703l4.64 4.57c.185.184.449.29.686.29.554 0 .932-.387.932-.923a.88.88 0 0 0-.282-.659l-1.89-1.837-1.493-1.274 1.968.079h7.788l1.968-.08-1.485 1.275-1.898 1.837a.907.907 0 0 0-.273.66c0 .535.37.922.923.922.237 0 .5-.105.685-.29l4.641-4.57a.937.937 0 0 0 .299-.704.965.965 0 0 0-.299-.703l-4.64-4.561a1.005 1.005 0 0 0-.686-.29c-.554 0-.923.387-.923.923 0 .28.105.483.273.659l1.898 1.837 1.485 1.274-1.968-.079h-7.788l-1.968.08 1.494-1.275 1.89-1.837a.88.88 0 0 0 .28-.66c0-.535-.377-.922-.93-.922-.238 0-.502.105-.687.29l-4.64 4.561a1 1 0 0 0-.299.704Z" fill="currentColor"></path></svg>'),Mn=(e={})=>(()=>{const t=jn.cloneNode(!0);return K(t,e,!0,!0),t})(),In="_toggle_xriek_1",qn="_button_xriek_13",Hn="_active_xriek_29",Ae={toggle:In,button:qn,active:Hn},Kn=b("<div></div>"),Dn=b('<button type="button"></button>'),Zn=e=>(()=>{const t=Kn.cloneNode(!0);return a(t,y(Y,{get each(){return e.options},children:n=>(()=>{const s=Dn.cloneNode(!0);return s.$$click=()=>e.onChange(n),a(s,n),_(()=>d(s,N(Ae.button,{[Ae.active]:e.value===n}))),s})()})),_(()=>d(t,Ae.toggle)),t})();z(["click"]);const Fn="_digitalSlider_ugnwq_1",Vn="_icon_ugnwq_37",Un="_left_ugnwq_53",Gn="_right_ugnwq_61",Wn="_wrapper_ugnwq_69",Yn="_input_ugnwq_87",D={digitalSlider:Fn,icon:Vn,left:Un,right:Gn,wrapper:Wn,input:Yn},Xn=b('<div><div><textarea rows="1"></textarea></div></div>'),ke=b("<div></div>"),Qn=e=>{const t=s=>e.isFloat?parseFloat(s):parseInt(s),n=(s,i)=>{let o=t(s);o=isNaN(o)?0:o+(i??0),e.min!==void 0&&(o=o<e.min?e.min:o),e.max!==void 0&&(o=o>e.max?e.max:o),e.onChange(o)};return(()=>{const s=Xn.cloneNode(!0),i=s.firstChild,o=i.firstChild;return a(s,(()=>{const r=I(()=>!!e.iconLeft);return()=>r()&&(()=>{const l=ke.cloneNode(!0);return a(l,()=>e.iconLeft),_(()=>d(l,N(D.icon,D.left))),l})()})(),i),i.addEventListener("wheel",r=>n(e.value.toString(),(r.deltaY>0?-1:1)*e.step)),o.$$input=r=>n(r.currentTarget.value),a(i,(()=>{const r=I(()=>!!e.unit);return()=>r()&&(()=>{const l=ke.cloneNode(!0);return a(l,()=>e.unit),_(()=>d(l,D.unit)),l})()})(),null),a(s,(()=>{const r=I(()=>!!e.iconRight);return()=>r()&&(()=>{const l=ke.cloneNode(!0);return a(l,()=>e.iconRight),_(()=>d(l,N(D.icon,D.right))),l})()})(),null),_(r=>{const l=D.digitalSlider,c=D.wrapper,u=D.input,f=e.value.toString().length;return l!==r._v$&&d(s,r._v$=l),c!==r._v$2&&d(i,r._v$2=c),u!==r._v$3&&d(o,r._v$3=u),f!==r._v$4&&Oe(o,"cols",r._v$4=f),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),_(()=>o.value=e.value),s})()};z(["input"]);const Jn=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.88 21.88h6.24c5.256 0 7.55-2.363 7.55-7.408V8.319c0-1.88-.993-2.865-2.892-2.865H6.222c-1.899 0-2.892.976-2.892 2.865v6.153c0 5.045 2.285 7.409 7.55 7.409Zm.035-1.766c-4.07 0-5.836-1.766-5.836-5.58V8.477c0-.835.457-1.275 1.257-1.275h15.328c.791 0 1.248.44 1.248 1.275v6.055c0 3.815-1.758 5.581-5.827 5.581h-6.17Z" fill="currentColor"></path></svg>'),zn=(e={})=>(()=>{const t=Jn.cloneNode(!0);return K(t,e,!0,!0),t})(),es="_leftRightBothToggle_airl3_1",ts={leftRightBothToggle:es},ns=b("<div></div>"),ss=["left","both","right"],is={left:At,both:zn,right:kt},os=e=>(()=>{const t=ns.cloneNode(!0);return a(t,y(Y,{each:ss,children:n=>y($e,{get icon(){return is[n]},get isActive(){return e.value===n},onClick:()=>e.onChange(n)})})),_(()=>d(t,ts.leftRightBothToggle)),t})(),ls="_typing_11gnx_1",rs="_buttons_11gnx_19",cs="_left_11gnx_31",us="_right_11gnx_33",fs="_hint_11gnx_43",as="_refresh_11gnx_59",ds="_icon_11gnx_99",hs="_rotate_11gnx_107",gs="_texts_11gnx_115",_s="_text_11gnx_115",vs="_overlay_11gnx_143",ys="_word_11gnx_153",$s="_original_11gnx_169",ws="_correct_11gnx_177",bs="_errors_11gnx_185",ms="_inputText_11gnx_193",k={typing:ls,buttons:rs,left:cs,right:us,hint:fs,refresh:as,icon:ds,rotate:hs,texts:gs,text:_s,overlay:vs,word:ys,original:$s,correct:ws,errors:bs,inputText:ms},As=b('<div><div><div class="left"><button type="button"><div></div></button></div><div class="right"></div></div><div><div></div><div></div><div></div></div><div><div></div><div></div></div></div>'),re=b("<div></div>"),te=" ",ks=(e,t,n)=>{let s=[],i=[];return e.split("").forEach((o,r)=>{if(t[r]!==void 0){const l=t[r]===o;s.push(l?te:o),i.push(l?o:te)}else s.push(n?te:o),i.push(te)}),{correct:i.join(""),errors:s.join("")}},xs=["punctuation","words"],Ss=e=>{const[t,n]=P([]);P("both");const[s,i]=P("words"),[o,r]=P(!1);st(it(s,()=>c()));const l=()=>{const u=[],f=[],w=e.inputText.split(" ");return t().forEach(($,m)=>{if(w[m]!==void 0){const{errors:g,correct:v}=ks($,w[m],w[m+1]===void 0);u.push(g),f.push(v)}else{const g=new Array($.length).fill(te).join("");u.push(g),f.push(g)}}),{errors:u,correct:f}},c=async()=>{r(!0);let u=await Tn();s()==="words"&&(u=u.toLowerCase().replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")),e.setInputText(""),n(u.split(" ")),setTimeout(()=>r(!1),250)};return(()=>{const u=As.cloneNode(!0),f=u.firstChild,w=f.firstChild,$=w.firstChild,m=$.firstChild,g=w.nextSibling,v=f.nextSibling,A=v.firstChild,S=A.nextSibling,E=S.nextSibling,R=v.nextSibling,L=R.firstChild,B=L.nextSibling;return $.$$click=c,a(m,y(Ln,{})),a(g,y(Zn,{options:xs,get value(){return s()},onChange:i})),a(A,y(Y,{get each(){return t()},children:h=>(()=>{const p=re.cloneNode(!0);return a(p,h),_(()=>d(p,N(k.word,k.original))),p})()})),a(S,y(Y,{get each(){return l().correct},children:h=>(()=>{const p=re.cloneNode(!0);return a(p,h),_(()=>d(p,N(k.word,k.correct))),p})()})),a(E,y(Y,{get each(){return l().errors},children:h=>(()=>{const p=re.cloneNode(!0);return a(p,h),_(()=>d(p,N(k.word,k.errors))),p})()})),a(L,y(os,{get value(){return O.leftRightBoth},onChange:h=>me("leftRightBoth",h)}),null),a(L,y($e,{icon:Mn,get isActive(){return O.shouldSwitchHands},get isDisabled(){return O.leftRightBoth!=="both"},onClick:()=>me("shouldSwitchHands",h=>!h)}),null),a(B,(()=>{const h=I(()=>!!G());return()=>h()&&(()=>{const p=re.cloneNode(!0);return a(p,()=>ye()?"Введи новую на клавиатуре":"Какую клавишу переназначить?"),_(()=>d(p,k.hint)),p})()})(),null),a(B,y($e,{icon:Rn,get isActive(){return G()},onClick:()=>{G()&&bt(void 0),rn(!G())}}),null),a(B,y(Qn,{get value(){return O.keyScanFrequency},onChange:h=>me("keyScanFrequency",h),min:20,max:200,unit:"ms",step:10,get iconLeft(){return y(Pn,{})}}),null),_(h=>{const p=k.typing,Be=k.buttons,Pe=k.refresh,je=N(k.icon,{[k.rotate]:o()}),Me=k.texts,Ie=N(k.text),qe=N(k.text,k.overlay),He=N(k.text,k.overlay),Ke=k.buttons,De=k.left,Ze=k.right;return p!==h._v$&&d(u,h._v$=p),Be!==h._v$2&&d(f,h._v$2=Be),Pe!==h._v$3&&d($,h._v$3=Pe),je!==h._v$4&&d(m,h._v$4=je),Me!==h._v$5&&d(v,h._v$5=Me),Ie!==h._v$6&&d(A,h._v$6=Ie),qe!==h._v$7&&d(S,h._v$7=qe),He!==h._v$8&&d(E,h._v$8=He),Ke!==h._v$9&&d(R,h._v$9=Ke),De!==h._v$10&&d(L,h._v$10=De),Ze!==h._v$11&&d(B,h._v$11=Ze),h},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0,_v$10:void 0,_v$11:void 0}),u})()};z(["click"]);const ps="_keyboardManager_5go7m_1",Ns={keyboardManager:ps},Cs=b("<div></div>"),Je={thumb:!1,index:!1,middle:!1,ring:!1,little:!1},Ts=()=>{const[e,t]=P(""),[n,s]=P({left:Je,right:Je});return(()=>{const i=Cs.cloneNode(!0);return Gt(Es,i,()=>({keys:[n,s],input:[e,t]})),a(i,y(Ss,{get inputText(){return e()},setInputText:t}),null),a(i,y(Cn,{get states(){return n()},symbols:wt}),null),_(()=>d(i,Ns.keyboardManager)),i})()},Es=(e,t)=>{const{keys:n,input:s}=t(),[i,o]=n,[r,l]=s,c=g=>{const v=Os(g),A=ue.find(E=>E[0]===v);return(g.thumb?A?.[2]:A?.[1])??" "},u=()=>Jt(g=>g==="left"?"right":"left"),f=I(()=>Qt(be,g=>{l(v=>v+g.toLowerCase()),u()},O.keyRepeatFrequency)),w=I(()=>be(()=>{let g=[];O.leftRightBoth==="both"?O.shouldSwitchHands?g=[i()[ht()]]:g=[i().left,i().right]:g=[i()[O.leftRightBoth]];let v;g.forEach(A=>{Object.values(A).some(Boolean)&&(v=v===void 0||v===" "?c(A):v)}),v!==void 0&&f()(v)},O.keyScanFrequency));st(it(i,()=>{w()()}));const $=I(()=>be(()=>{l(g=>g.slice(0,g.length-1)),u()},O.keyRepeatFrequency)),m=g=>{const v=g.type==="keydown";if(G()){const S=ye();v&&S!==void 0&&ln(S.half,S.key,g.key);return}const A=Ls(g.key);if(g.key==="Backspace"&&v){$()();return}A!==void 0&&o(S=>({left:A.hand==="left"||A.hand==="both"?{...S.left,[A.key]:v}:S.left,right:A.hand==="right"||A.hand==="both"?{...S.right,[A.key]:v}:S.right}))};window.addEventListener("keyup",m),window.addEventListener("keydown",m),we(()=>{window.removeEventListener("keyup",m),window.removeEventListener("keydown",m)})},Ls=e=>{let t;return Object.values(wt).forEach((n,s)=>{const o=Object.keys(n).find(r=>n[r]===e);o&&(t={hand:t!==void 0?"both":s===0?"left":"right",key:o})}),t},Os=e=>{const{index:t,middle:n,ring:s,little:i}=e;return[t,n,s,i].map(r=>r?"1":"0").join("")},Rs=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.94 21.723h4.166c.835 0 1.503-.449 1.855-1.204l5.704-12.595c.123-.264.325-.387.642-.387h3.753c.562 0 1.01-.43 1.01-.967 0-.545-.448-.975-1.01-.975h-4.22c-.887 0-1.458.369-1.827 1.186l-5.73 12.613a.643.643 0 0 1-.616.386H5.94c-.57 0-1.01.422-1.01.967 0 .554.44.976 1.01.976Zm10.583 0h5.537c.57 0 1.002-.413 1.002-.967 0-.545-.431-.967-1.002-.967h-5.537c-.572 0-1.002.422-1.002.967 0 .554.439.967 1.002.967Z" fill="currentColor"></path></svg>'),xt=(e={})=>(()=>{const t=Rs.cloneNode(!0);return K(t,e,!0,!0),t})(),Bs="_letterBlock_17vn9_1",Ps="_letter_17vn9_1",js="_left_17vn9_39",Ms="_right_17vn9_47",Is="_alt_17vn9_55",qs="_blocks_17vn9_63",Hs="_block_17vn9_63",Ks="_active_17vn9_87",q={letterBlock:Bs,letter:Ps,left:js,right:Ms,alt:Is,blocks:qs,block:Hs,active:Ks},Ds=b("<div><div></div></div>"),xe=b("<div></div>"),St=({left:e,right:t,pattern:n})=>{const s=n.split("").map(r=>r==="1"),i=t===dt,o=i?y(xt,{}):t;return(()=>{const r=Ds.cloneNode(!0),l=r.firstChild;return a(r,e&&(()=>{const c=xe.cloneNode(!0);return a(c,e),_(()=>d(c,N(q.letter,q.left))),c})(),l),a(l,()=>s.map(c=>(()=>{const u=xe.cloneNode(!0);return _(()=>d(u,N(q.block,{[q.active]:c}))),u})())),a(r,t&&(()=>{const c=xe.cloneNode(!0);return a(c,o),_(()=>d(c,N(q.letter,q.right,{[q.alt]:i}))),c})(),null),_(c=>{const u=q.letterBlock,f=q.blocks;return u!==c._v$&&d(r,c._v$=u),f!==c._v$2&&d(l,c._v$2=f),c},{_v$:void 0,_v$2:void 0}),r})()},Zs=b('<svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.637 14.656h5.361v5.362c0 .544.448 1.002 1.002 1.002s1.002-.457 1.002-1.002v-5.362h5.361c.545 0 1.002-.448 1.002-1.002 0-.553-.457-1.002-1.002-1.002h-5.361V7.291c0-.545-.448-1.002-1.002-1.002s-1.002.457-1.002 1.002v5.361H7.637c-.545 0-1.002.449-1.002 1.002 0 .554.457 1.002 1.002 1.002Z" fill="currentColor"></path></svg>'),Fs=(e={})=>(()=>{const t=Zs.cloneNode(!0);return K(t,e,!0,!0),t})(),Vs="_guide_fg2cy_1",Us="_letterStack_fg2cy_17",Gs="_letterGroup_fg2cy_27",Ws="_emptyLetterBlock_fg2cy_47",Ys="_alternative_fg2cy_55",Xs="_hint_fg2cy_71",W={guide:Vs,letterStack:Us,letterGroup:Gs,emptyLetterBlock:Ws,alternative:Ys,hint:Xs},ze=b("<div></div>"),Qs=b("<div><div><div><div></div></div></div></div>"),Js=[ge.PRIMARY,ge.ALTERNATIVE],zs=[ue.slice(0,4),ue.slice(4,10),ue.slice(10,15)],[ei,ti]=Js.map(e=>zs.map(t=>t.every(n=>n[e]!==void 0)?t.map(n=>({pattern:n[ge.PATTERN],left:n[e],right:n[e+1]})):void 0)),et=e=>(()=>{const t=ze.cloneNode(!0);return a(t,()=>e.filter(Boolean).map(n=>(()=>{const s=ze.cloneNode(!0);return a(s,()=>n.map(({left:i,right:o,pattern:r})=>(i!==void 0||o!==void 0)&&y(St,{left:i,right:o,pattern:r}))),_(()=>d(s,W.letterGroup)),s})())),_(()=>d(t,W.letterStack)),t})(),ni=()=>(()=>{const e=Qs.cloneNode(!0),t=e.firstChild,n=t.firstChild,s=n.firstChild;return a(e,()=>et(ei),t),a(n,y(St,{left:"",right:"",pattern:"1001"}),s),a(s,y(xt,{})),a(t,y(Fs,{}),null),a(t,()=>et(ti),null),_(i=>{const o=W.guide,r=W.alternative,l=W.hint,c=W.alt;return o!==i._v$&&d(e,i._v$=o),r!==i._v$2&&d(t,i._v$2=r),l!==i._v$3&&d(n,i._v$3=l),c!==i._v$4&&d(s,i._v$4=c),i},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),e})(),si="_App_a8iwi_17",ii={App:si},oi=b("<div></div>"),li=()=>(()=>{const e=oi.cloneNode(!0);return a(e,y(ni,{}),null),a(e,y(Ts,{}),null),_(()=>d(e,ii.App)),e})();Dt(()=>y(li,{}),document.getElementById("root"));
