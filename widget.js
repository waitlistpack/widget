(()=>{var{defineProperty:f,getOwnPropertyNames:Q,getOwnPropertyDescriptor:U}=Object,V=Object.prototype.hasOwnProperty;function X(r){return this[r]}var Z=(r)=>{var a=(m??=new WeakMap).get(r),e;if(a)return a;if(a=f({},"__esModule",{value:!0}),r&&typeof r==="object"||typeof r==="function"){for(var l of Q(r))if(!V.call(a,l))f(a,l,{get:X.bind(r,l),enumerable:!(e=U(r,l))||e.enumerable})}return m.set(r,a),a},m;var O=(r)=>r;function j(r,a){this[r]=O.bind(null,a)}var R=(r,a)=>{for(var e in a)f(r,e,{get:a[e],enumerable:!0,configurable:!0,set:j.bind(a,e)})};var rr={};R(rr,{parseConfigFromElement:()=>b,init:()=>q,WaitlistPack:()=>K});function P(){return"https://api.waitlistpack.com"}function y(r,a){if(r==null)return a;let e=r.trim().toLowerCase();if(e==="true"||e==="1"||e==="yes"||e==="show")return!0;if(e==="false"||e==="0"||e==="no"||e==="hide")return!1;return a}function z(r){let a=(r??"").trim().toLowerCase();if(a==="zh"||a.startsWith("zh-"))return"zh";if(a==="en"||a.startsWith("en-"))return"en";if((typeof navigator<"u"&&navigator.language?navigator.language.toLowerCase():"").startsWith("zh"))return"zh";return"en"}function I(r){let a=(r??"").trim().toLowerCase();if(a==="light"||a==="dark"||a==="auto")return a;return"auto"}function L(r){let a=(r??"").trim().toLowerCase();if(a)return a;if(typeof window<"u"&&window.location?.hostname)return window.location.hostname.toLowerCase();return""}function c(r){if(r==null)return null;let a=r.trim();return a.length===0?null:a}function b(r){let a=(e)=>r?.getAttribute(`data-${e}`)??null;return{apiUrl:c(a("api-url"))??P(),domain:L(a("domain")),lang:z(a("lang")),theme:I(a("theme")),showName:y(a("name-field"),!1),gdpr:y(a("gdpr"),!1),redirect:c(a("redirect")),buttonText:c(a("button-text")),placeholder:c(a("placeholder")),successText:c(a("success-text")),target:c(a("target")),source:c(a("source"))}}function _(r={}){return{apiUrl:r.apiUrl?.trim()||P(),domain:r.domain?.trim().toLowerCase()||L(null),lang:r.lang??z(null),theme:r.theme??"auto",showName:r.showName??!1,gdpr:r.gdpr??!1,redirect:r.redirect??null,buttonText:r.buttonText??null,placeholder:r.placeholder??null,successText:r.successText??null,target:r.target??null,source:r.source??null}}async function S(r){let a={tier:"free",branding:!0},e=`${r.apiUrl.replace(/\/+$/,"")}/v1/waitlists/public?domain=${encodeURIComponent(r.domain)}`,l=new AbortController,n=setTimeout(()=>l.abort(),800);try{let i=await fetch(e,{method:"GET",credentials:"omit",mode:"cors",signal:l.signal});if(!i.ok)return a;let o=await i.json(),p=o.tier==="pro"||o.tier==="growth"?o.tier:"free",d=typeof o.branding==="boolean"?o.branding:!0;return{tier:p,branding:d}}catch{return a}finally{clearTimeout(n)}}async function k(r){let{email:a,name:e,config:l}=r,n={...r.metadata,page_url:typeof window<"u"?window.location.href:void 0,referrer:typeof document<"u"?document.referrer||void 0:void 0,user_agent:typeof navigator<"u"?navigator.userAgent:void 0,lang:l.lang};if(l.source)n.utm_source=l.source;let i=`${l.apiUrl.replace(/\/+$/,"")}/v1/subscribers/public`,o;try{o=await fetch(i,{method:"POST",headers:{"content-type":"application/json","x-client-fingerprint":await M(l.domain)},body:JSON.stringify({domain:l.domain,email:a,name:e,metadata:n}),credentials:"omit",mode:"cors"})}catch{return{ok:!1,kind:"network"}}let p={};try{p=await o.json()}catch{}if(o.status===201)return{ok:!0,data:p};if(o.status===429){let t=o.headers.get("retry-after"),w=t?Number.parseInt(t,10):NaN;return{ok:!1,kind:"rate_limited",retryAfterSeconds:Number.isFinite(w)?w:void 0}}let d=typeof p.error==="string"?p.error:"",v=typeof p.message==="string"?p.message:void 0;if(d==="disposable_email_not_allowed"||/disposable/i.test(d))return{ok:!1,kind:"disposable",message:v};if(o.status===404||/no active waitlist/i.test(d)||/no.*waitlist/i.test(d))return{ok:!1,kind:"no_waitlist"};if(/invalid email/i.test(d)||/email required/i.test(d))return{ok:!1,kind:"invalid_email"};return{ok:!1,kind:"unknown",message:v}}async function M(r){let a=[r,typeof navigator<"u"?navigator.userAgent:"",typeof navigator<"u"?navigator.language:"",typeof Intl<"u"?String(new Date().getTimezoneOffset()):""].join("|");try{if(typeof crypto<"u"&&crypto.subtle){let e=new TextEncoder().encode(a),l=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(l)).map((n)=>n.toString(16).padStart(2,"0")).join("")}}catch{}return a.replace(/\s+/g,"_").slice(0,200)}var B={title:"Join the waitlist",subtitle:"Be among the first to get access.",emailPlaceholder:"your@email.com",namePlaceholder:"Your name (optional)",emailLabel:"Email address",nameLabel:"Your name",button:"Join",buttonLoading:"Joining…",gdpr:"I agree to receive product updates by email.",footnote:"No spam. Unsubscribe anytime.",success:"You're on the list. We'll be in touch.",successWithPosition:(r)=>`You're #${r} on the list. We'll be in touch.`,errors:{network:"Network error. Please try again.",invalidEmail:"Please enter a valid email address.",rateLimited:"Too many requests. Please try again later.",disposable:"Disposable email addresses are not supported. Please use your real email.",noWaitlist:"No active waitlist configured for this site.",generic:"Something went wrong. Please try again."}},W={title:"加入等待列表",subtitle:"成为第一批使用者。",emailPlaceholder:"您的电子邮箱",namePlaceholder:"您的姓名（可选）",emailLabel:"电子邮箱地址",nameLabel:"您的姓名",button:"加入",buttonLoading:"提交中…",gdpr:"我同意通过邮件接收产品更新。",footnote:"我们绝不发送垃圾邮件，可随时退订。",success:"已加入等待列表，我们会尽快与您联系。",successWithPosition:(r)=>`您已加入等待列表，排名第 ${r} 位。`,errors:{network:"网络错误，请稍后重试。",invalidEmail:"请输入有效的电子邮箱地址。",rateLimited:"请求过于频繁，请稍后重试。",disposable:"不支持临时/一次性邮箱，请使用您的真实邮箱地址。",noWaitlist:"此站点尚未配置等待列表。",generic:"提交失败，请重试。"}},Y={en:B,zh:W};function u(r){return Y[r]??Y.en}var N=`
:host {
  all: initial;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  color-scheme: light;

  --_wlp-bg: #ffffff;
  --_wlp-fg: #111827;
  --_wlp-muted: #6b7280;
  --_wlp-border: #e5e7eb;
  --_wlp-border-strong: #d1d5db;
  --_wlp-accent: #2563eb;
  --_wlp-accent-fg: #ffffff;
  --_wlp-accent-hover: #1d4ed8;
  --_wlp-error-bg: #fef2f2;
  --_wlp-error-fg: #b91c1c;
  --_wlp-error-border: #fecaca;
  --_wlp-success-bg: #ecfdf5;
  --_wlp-success-fg: #065f46;
  --_wlp-success-border: #a7f3d0;
  --_wlp-radius: 12px;
  --_wlp-radius-sm: 8px;
}

:host([data-theme='dark']) {
  color-scheme: dark;
  --_wlp-bg: #0b0f17;
  --_wlp-fg: #f3f4f6;
  --_wlp-muted: #9ca3af;
  --_wlp-border: #1f2937;
  --_wlp-border-strong: #374151;
  --_wlp-accent: #3b82f6;
  --_wlp-accent-fg: #ffffff;
  --_wlp-accent-hover: #2563eb;
  --_wlp-error-bg: #2a0f12;
  --_wlp-error-fg: #fca5a5;
  --_wlp-error-border: #7f1d1d;
  --_wlp-success-bg: #0c1f18;
  --_wlp-success-fg: #6ee7b7;
  --_wlp-success-border: #065f46;
}

* {
  box-sizing: border-box;
}

.wlp-root {
  background: var(--wlp-bg, var(--_wlp-bg));
  color: var(--wlp-fg, var(--_wlp-fg));
  border: 1px solid var(--wlp-border, var(--_wlp-border));
  border-radius: var(--wlp-radius, var(--_wlp-radius));
  padding: 20px;
  width: 100%;
  max-width: 420px;
  font-size: 14px;
  line-height: 1.5;
}

.wlp-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--wlp-fg, var(--_wlp-fg));
}

.wlp-subtitle {
  margin: 0 0 16px 0;
  color: var(--wlp-muted, var(--_wlp-muted));
  font-size: 14px;
}

.wlp-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wlp-row {
  display: flex;
  gap: 8px;
}

.wlp-input {
  flex: 1;
  min-width: 0;
  appearance: none;
  background: var(--wlp-bg, var(--_wlp-bg));
  color: var(--wlp-fg, var(--_wlp-fg));
  border: 1px solid var(--wlp-border-strong, var(--_wlp-border-strong));
  border-radius: var(--wlp-radius-sm, var(--_wlp-radius-sm));
  padding: 10px 12px;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.wlp-input::placeholder {
  color: var(--wlp-muted, var(--_wlp-muted));
  opacity: 1;
}

.wlp-input:focus {
  border-color: var(--wlp-accent, var(--_wlp-accent));
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--wlp-accent, var(--_wlp-accent)) 20%, transparent);
}

.wlp-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wlp-button {
  appearance: none;
  border: 0;
  background: var(--wlp-accent, var(--_wlp-accent));
  color: var(--wlp-accent-fg, var(--_wlp-accent-fg));
  font: inherit;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: var(--wlp-radius-sm, var(--_wlp-radius-sm));
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.05s ease;
  white-space: nowrap;
}

.wlp-button:hover:not(:disabled) {
  background: var(--wlp-accent-hover, var(--_wlp-accent-hover));
}

.wlp-button:active:not(:disabled) {
  transform: translateY(1px);
}

.wlp-button:disabled {
  opacity: 0.7;
  cursor: progress;
}

.wlp-consent {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--wlp-muted, var(--_wlp-muted));
  margin-top: 2px;
  user-select: none;
}

.wlp-consent input[type='checkbox'] {
  margin-top: 2px;
  accent-color: var(--wlp-accent, var(--_wlp-accent));
}

.wlp-consent label {
  cursor: pointer;
}

.wlp-footnote {
  margin: 10px 0 0 0;
  font-size: 12px;
  color: var(--wlp-muted, var(--_wlp-muted));
}

/*
 * Inline brand link merged into the footnote line ("No spam… · Powered
 * by WaitlistPack"). The host page can theme the surrounding text via
 * --wlp-muted, but cannot hide the link selectively — there's no
 * \`part="brand"\` to target, and the !important locks guard against
 * any future part attribute being added without re-evaluating the
 * branding policy.
 */
.wlp-brand-link {
  display: inline !important;
  visibility: visible !important;
  opacity: 1 !important;
  font-size: 12px !important;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
}

.wlp-brand-link:hover {
  border-bottom-style: solid;
}

.wlp-error {
  margin-top: 10px;
  background: var(--wlp-error-bg, var(--_wlp-error-bg));
  color: var(--wlp-error-fg, var(--_wlp-error-fg));
  border: 1px solid var(--wlp-error-border, var(--_wlp-error-border));
  border-radius: var(--wlp-radius-sm, var(--_wlp-radius-sm));
  padding: 8px 10px;
  font-size: 13px;
}

.wlp-success {
  background: var(--wlp-success-bg, var(--_wlp-success-bg));
  color: var(--wlp-success-fg, var(--_wlp-success-fg));
  border: 1px solid var(--wlp-success-border, var(--_wlp-success-border));
  border-radius: var(--wlp-radius-sm, var(--_wlp-radius-sm));
  padding: 14px 14px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 420px) {
  .wlp-row {
    flex-direction: column;
  }
  .wlp-button {
    width: 100%;
  }
}
`.trim();var s="waitlistpack-widget";class $ extends HTMLElement{config=null;onSuccess=null;shadow;mqDark=null;mqListener=null;branding=!0;constructor(){super();this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){if(!this.config)this.config=_();this.applyTheme(this.config.theme),this.render(),this.applyBrandingFromMeta()}async applyBrandingFromMeta(){if(!this.config)return;if((await S(this.config)).branding)return;this.branding=!1;let a=this.shadow.querySelector(".wlp-brand-link");if(a){let l=a.previousSibling;if(l&&l.nodeType===Node.TEXT_NODE)l.remove();a.remove()}let e=this.shadow.querySelector(".wlp-footnote");if(e&&e.textContent?.trim()==="")e.remove()}disconnectedCallback(){this.detachThemeListener()}applyTheme(r){if(this.detachThemeListener(),r==="auto")if(typeof window<"u"&&window.matchMedia)this.mqDark=window.matchMedia("(prefers-color-scheme: dark)"),this.setAttribute("data-theme",this.mqDark.matches?"dark":"light"),this.mqListener=(a)=>{this.setAttribute("data-theme",a.matches?"dark":"light")},this.mqDark.addEventListener("change",this.mqListener);else this.setAttribute("data-theme","light");else this.setAttribute("data-theme",r)}detachThemeListener(){if(this.mqDark&&this.mqListener)this.mqDark.removeEventListener("change",this.mqListener);this.mqDark=null,this.mqListener=null}render(){let r=this.config,a=u(r.lang),e=r.placeholder??a.emailPlaceholder,l=r.buttonText??a.button;if(!this.hasAttribute("role"))this.setAttribute("role","region");if(this.setAttribute("aria-label",a.title),this.setAttribute("data-waitlistpack-action","subscribe"),r.domain)this.setAttribute("data-waitlistpack-domain",r.domain);this.injectJsonLd(),this.shadow.innerHTML=`
      <style>${N}</style>
      <div class="wlp-root" part="root">
        <h3 id="wlp-title" class="wlp-title" part="title">${h(a.title)}</h3>
        <p class="wlp-subtitle" part="subtitle">${h(a.subtitle)}</p>
        <form class="wlp-form" part="form" novalidate aria-labelledby="wlp-title">
          ${r.showName?`<input class="wlp-input wlp-name" name="name" type="text"
                     autocomplete="name"
                     aria-label="${x(a.nameLabel)}"
                     placeholder="${x(a.namePlaceholder)}" />`:""}
          <div class="wlp-row">
            <input class="wlp-input wlp-email" name="email" type="email"
                   required autocomplete="email" inputmode="email"
                   aria-label="${x(a.emailLabel)}"
                   placeholder="${x(e)}" />
            <button class="wlp-button" type="submit">${h(l)}</button>
          </div>
          ${r.gdpr?`<div class="wlp-consent">
                   <input id="wlp-gdpr" type="checkbox" required />
                   <label for="wlp-gdpr">${h(a.gdpr)}</label>
                 </div>`:""}
          <div class="wlp-error" part="error" role="alert" hidden></div>
        </form>
        <p class="wlp-footnote" part="footnote">${h(a.footnote)} · <a class="wlp-brand-link" href="https://waitlistpack.com?utm_source=embed&utm_medium=widget" target="_blank" rel="noopener noreferrer">Powered by WaitlistPack</a></p>
      </div>
    `,this.shadow.querySelector("form.wlp-form")?.addEventListener("submit",this.handleSubmit)}handleSubmit=async(r)=>{r.preventDefault();let a=this.config,e=u(a.lang),l=this.shadow.querySelector(".wlp-email"),n=this.shadow.querySelector(".wlp-name"),i=this.shadow.querySelector(".wlp-button"),o=this.shadow.querySelector(".wlp-error");if(!l||!i||!o)return;let p=(l.value||"").trim().toLowerCase(),d=(n?.value||"").trim();if(!H(p)){this.showError(o,e.errors.invalidEmail),l.focus();return}if(a.gdpr){let w=this.shadow.querySelector("#wlp-gdpr");if(w&&!w.checked){this.showError(o,e.gdpr),w.focus();return}}if(o.hidden=!0,i.disabled=!0,l.disabled=!0,n)n.disabled=!0;let v=i.textContent;i.textContent=e.buttonLoading;let t=await k({email:p,name:d,config:a});if(t.ok){this.dispatchEvent(new CustomEvent("waitlistpack:success",{detail:{email:p,position:t.data.position},bubbles:!0,composed:!0}));try{this.onSuccess?.({email:p})}catch(w){console.error("[waitlistpack] onSuccess callback threw:",w)}if(a.redirect)try{window.location.replace(a.redirect);return}catch{}this.renderSuccess(t);return}if(i.disabled=!1,l.disabled=!1,n)n.disabled=!1;i.textContent=v??e.button,this.showError(o,D(t,a.lang))};injectJsonLd(){let r=this.config,a=u(r.lang),e=`${r.apiUrl.replace(/\/+$/,"")}/v1/subscribers/public`,l={"@context":"https://schema.org","@type":"SubscribeAction",name:a.title,description:a.subtitle,target:{"@type":"EntryPoint",urlTemplate:e,encodingType:"application/json",contentType:"application/json",httpMethod:"POST",actionPlatform:["https://schema.org/DesktopWebPlatform","https://schema.org/MobileWebPlatform"]}};if(r.domain)l.object={"@type":"Service",name:`${r.domain} waitlist`,provider:{"@type":"Organization",name:r.domain}};let n=this.querySelector('script[type="application/ld+json"][data-waitlistpack-jsonld]'),i=n instanceof HTMLScriptElement?n:document.createElement("script");if(!(n instanceof HTMLScriptElement))i.type="application/ld+json",i.setAttribute("data-waitlistpack-jsonld",""),this.appendChild(i);i.textContent=JSON.stringify(l).replace(/<\//g,"<\\/")}showError(r,a){r.textContent=a,r.hidden=!1}renderSuccess(r){let a=this.config,e=u(a.lang),l=a.successText??(typeof r.data.position==="number"&&r.data.position>=0?e.successWithPosition(r.data.position):e.success),n=this.shadow.querySelector("form.wlp-form"),i=this.shadow.querySelector(".wlp-footnote"),o=this.shadow.querySelector(".wlp-title"),p=this.shadow.querySelector(".wlp-subtitle");if(n){let d=document.createElement("div");d.className="wlp-success",d.setAttribute("part","success"),d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.textContent=l,n.replaceWith(d)}if(i)if(this.branding)i.innerHTML='<a class="wlp-brand-link" href="https://waitlistpack.com?utm_source=embed&utm_medium=widget" target="_blank" rel="noopener noreferrer">Powered by WaitlistPack</a>';else i.remove();if(p)p.remove();if(o)o.remove()}}function h(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function x(r){return r.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function H(r){return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r)}function D(r,a){let e=u(a);switch(r.kind){case"invalid_email":return e.errors.invalidEmail;case"disposable":return r.message??e.errors.disposable;case"no_waitlist":return e.errors.noWaitlist;case"rate_limited":return e.errors.rateLimited;case"network":return e.errors.network;case"unknown":default:return r.message??e.errors.generic}}var J=!1;function g(){if(J)return;if(typeof customElements>"u")return;if(!customElements.get(s))customElements.define(s,$);J=!0}var F="0.1.0";function q(r={}){g();let a=C(r.target??null);if(!a)return null;let{target:e,onSuccess:l,...n}=r,i=_(n),o=document.createElement(s);if(o.config=i,r.onSuccess)o.onSuccess=r.onSuccess;return a.appendChild(o),o}function C(r){if(r instanceof HTMLElement)return r;if(typeof r==="string"&&r){let a=document.querySelector(r);return a instanceof HTMLElement?a:null}return null}function T(){let r=document.currentScript??null;if(r)return r;let a=Array.from(document.getElementsByTagName("script")),e=a.find((n)=>n.hasAttribute("data-waitlistpack"));if(e)return e;return a.find((n)=>{let i=n.src||"";return/waitlistpack/i.test(i)||/widget(\.[a-z0-9-]+)?\.js/i.test(i)})??null}function A(){g();let r=T();if((r?.getAttribute("data-autoload")??"true")==="false")return;let e=Array.from(document.querySelectorAll("[data-waitlistpack-widget]"));for(let o of e){let p=G(b(r),b(o)),d=document.createElement(s);d.config=p,o.appendChild(d)}if(!r)return;let l=b(r);if(l.target){let o=document.querySelector(l.target);if(o instanceof HTMLElement){let p=document.createElement(s);p.config=l,o.appendChild(p)}return}let n=r.hasAttribute("data-waitlistpack"),i=r.closest("head")!=null;if(n&&!i&&r.parentNode){let o=document.createElement(s);o.config=l,r.parentNode.insertBefore(o,r.nextSibling)}}function G(r,a){let e={...r};for(let[l,n]of Object.entries(a)){if(n==null)continue;if(typeof n==="string"&&n==="")continue;e[l]=n}return e}function E(r){if(typeof document>"u")return;if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",r,{once:!0});else r()}var K=Object.freeze({init:q,version:F,tag:s});if(typeof window<"u"){if(!window.WaitlistPack)window.WaitlistPack=K;E(A)}})();
