// ==UserScript==
// @name         Kiosk AdBlock Auto Bypass
// @namespace    https://kio.ac/userscript/adblock-pass
// @version      3.0.1
// @description  Automatically dismisses supported AdBlock warnings on Kiosk and removes intrusive ads, lifespan indicators, and sponsor prompts while preserving password dialogs and download controls.
// @match        https://kio.ac/*
// @run-at       document-start
// @grant        none
// @noframes
// @author       local
// @license      MIT
// ==/UserScript==

(()=>{"use strict";if(location.hostname!=="kio.ac"||window.top!==window.self)return;const _0x100="__kio_clean_v3"
;const _0x101="data-kio-clean-hidden";const _0x102="data-kio-clean-unlock"
;const _0x103='[data-dialog-content], [data-alert-dialog-content], [role="dialog"], [role="alertdialog"], dialog, [aria-modal="true"]'
;const _0x104='[data-dialog-overlay], [data-alert-dialog-overlay], [data-slot="dialog-overlay"], [data-slot="alert-dialog-overlay"]'
;const _0x105="[data-bits-floating-content-wrapper], [data-tooltip-content], [data-popover-content]"
;const _0x106='input:not([type="hidden"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"]'
;const _0x107=/\uc560\ub4dc\s*\ube14\ub85d|\uad11\uace0\s*\ucc28\ub2e8|ad[\s-]*block/i
;const _0x108=/\uac10\uc9c0|\ucc28\ub2e8|\ud574\uc81c|\ube44\ud65c\uc131|\uc0ac\uc6a9|detect|disable|blocker/i
;const _0x109=/^(?:\ud655\uc778|\ub2eb\uae30|\uc54c\uaca0\uc2b5\ub2c8\ub2e4|\uc54c\uaca0\uc5b4\uc694|\uacc4\uc18d|ok(?:ay)?|close|got it|continue)$/i
;const _0x10a=".ad-slot, .internal-banner, [data-ad-slot]";const _0x10b=new WeakMap;let _0x10c;let _0x10d
;let _0x10e=false;let _0x10f=0;let _0x110=false
;const _0x111=_0x100=>(_0x100?.textContent||"").replace(/\s+/g," ").trim();function _0x112(){
if(!document.documentElement)return;if(!_0x10d){_0x10d=document.createElement("style");_0x10d.id=_0x100
;_0x10d.textContent=`\n        [${_0x101}], ${_0x10a} { display: none !important; }\n        html[${_0x102}="true"], html[${_0x102}="true"] body {\n          pointer-events: auto !important;\n          overflow: auto !important;\n        }\n        \n        [data-slot="sidebar-inset"] > header button:has(.stripe.svelte-cq4vq9),\n        [data-bits-floating-content-wrapper]:has(.svelte-cq4vq9 a[href^="https://www.patreon.com/join/freezm"]) {\n          display: none !important;\n        }\n        \n        main > div.flex.w-full.shrink-0.justify-center:has(> .hngjyiux) {\n          display: none !important;\n        }\n      `
}if(!_0x10d.isConnected)(document.head||document.documentElement).appendChild(_0x10d)}function _0x113(_0x100,_0x102){
if(!_0x100||_0x100===document.body||_0x100===document.documentElement)return
;if(_0x100.getAttribute(_0x101)!==_0x102)_0x100.setAttribute(_0x101,_0x102)}function _0x114(_0x100){
const _0x101=(_0x100.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean)
;const _0x102=_0x101.map(_0x100=>_0x111(document.getElementById(_0x100))).join(" ").trim()
;return _0x102||_0x111(_0x100.querySelector('[data-dialog-title], [data-alert-dialog-title], [data-slot="dialog-title"], h1, h2, h3'))
}function _0x115(_0x100){if(_0x100.querySelector(_0x106+", a[download]"))return"";const _0x101=_0x114(_0x100)
;const _0x102=_0x101||_0x111(_0x100).slice(0,220);if(_0x107.test(_0x102)&&_0x108.test(_0x102))return"ad-dialog"
;if(/^(?:Kiosk\ub97c \ub3c4\uc640\uc8fc\uc138\uc694|\ud6c4\uc6d0\ud558\uae30|\ud6c4\uc6d0 \uc548\ub0b4|Support Kiosk)$/i.test(_0x101))return"support-dialog"
;return""}function _0x116(_0x100){
if(!_0x100.isConnected||_0x100.hidden||_0x100.getAttribute("aria-hidden")==="true")return false
;if(_0x100.getAttribute("data-state")==="closed"||_0x100.hasAttribute("data-closed"))return false
;if(_0x100.localName==="dialog"&&!_0x100.open)return false;if(_0x100.hasAttribute(_0x101))return true
;const _0x102=getComputedStyle(_0x100)
;return _0x102.display!=="none"&&_0x102.visibility!=="hidden"&&_0x100.getClientRects().length>0}function _0x117(_0x100){
const _0x101=_0x100.previousElementSibling;return _0x101?.matches(_0x104)?_0x101:null}function _0x118(_0x100){
return(_0x100.getAttribute("aria-label")||_0x111(_0x100)||_0x100.value||"").replace(/^\s*\d+\s*(?:\ucd08|s|seconds?)?\s*/i,"").replace(/\s*\(?\d+\s*(?:\ucd08|s|seconds?)?\)?\s*$/i,"").trim()
}function _0x119(_0x100){
const _0x101=[..._0x100.querySelectorAll('button, input[type="button"], input[type="submit"]')].filter(_0x101=>_0x101.closest(_0x103)===_0x100&&_0x109.test(_0x118(_0x101)))
;const _0x102=_0x100=>!_0x100.matches(":disabled")&&_0x100.getAttribute("aria-disabled")!=="true"&&!_0x100.closest("[inert]")
;const _0x104=_0x101.find(_0x100=>_0x102(_0x100)&&!_0x100.hasAttribute("data-dialog-close"))||_0x101.find(_0x101=>_0x102(_0x101)&&!_0x100.classList.contains("no-close-button"))
;const _0x105=_0x10b.get(_0x100)||{count:0,last:0};_0x10b.set(_0x100,_0x105);if(_0x105.count>=8)return
;const _0x106=Date.now();if(!_0x104)return;if(_0x106-_0x105.last>=750){_0x105.count++;_0x105.last=_0x106;_0x104.click()}
if(_0x105.count<8&&!_0x10f){_0x10f=window.setTimeout(()=>{_0x10f=0;_0x11c()},800)}}function _0x11a(){
const _0x100=new Set;const _0x102=(_0x101,_0x102)=>{_0x100.add(_0x101);_0x113(_0x101,_0x102)}
;document.querySelectorAll("header button, header [data-tooltip-trigger], header a").forEach(_0x100=>{
if(_0x100.querySelector(_0x106))return;const _0x101=_0x111(_0x100)
;if(/^(?:\uc218\uba85|lifespan)(?:\s*\d+(?:\.\d+)?\s*%)?$/i.test(_0x101)||/^(?:Kiosk\ub97c \ub3c4\uc640\uc8fc\uc138\uc694|\ud6c4\uc6d0\ud558\uae30|\ud6c4\uc6d0 \uc2dc \uad11\uace0 \uc81c\uac70)$/i.test(_0x101)){
_0x102(_0x100.closest("[data-tooltip-trigger]")||_0x100,"support-control")}})
;document.querySelectorAll(_0x105).forEach(_0x100=>{if(_0x100.querySelector(_0x106))return;const _0x101=_0x111(_0x100)
;if(/Kiosk\ub97c \ub3c4\uc640\uc8fc\uc138\uc694|Support Kiosk/i.test(_0x101)||/\uc11c\ube44\uc2a4 \uc720\uc9c0\ube44/.test(_0x101)&&_0x100.querySelector('a[href^="https://www.patreon.com/join/freezm"]')){
_0x102(_0x100.closest("[data-bits-floating-content-wrapper]")||_0x100,"support-popup")}})
;document.querySelectorAll(`[${_0x101}="support-control"], [${_0x101}="support-popup"]`).forEach(_0x102=>{
if(!_0x100.has(_0x102))_0x102.removeAttribute(_0x101)})
;document.querySelectorAll('li[data-sonner-toast], [data-sonner-toast], ol.toaster > li, [role="alert"]').forEach(_0x100=>{
if(_0x100.closest(_0x103)||_0x100.querySelector(_0x106)||_0x100.querySelector('[role="alert"], [data-sonner-toast]'))return
;const _0x102=_0x111(_0x100);const _0x104=_0x102.length<600&&_0x107.test(_0x102)&&_0x108.test(_0x102)
;if(_0x104)_0x113(_0x100,"ad-toast");else if(_0x100.getAttribute(_0x101)==="ad-toast")_0x100.removeAttribute(_0x101)})
;document.querySelectorAll(_0x10a).forEach(_0x100=>{const _0x101=_0x100.parentElement
;if(_0x101?.matches("main > div.flex.w-full.shrink-0.justify-center")&&_0x101.children.length===1&&!_0x101.querySelector(_0x106+", a[download]"))_0x113(_0x101,"ad-space")
})}function _0x11b(){_0x10e=false;_0x112();if(!document.body)return;const _0x100=new Set;let _0x104=false
;let _0x105=false;document.querySelectorAll(_0x103).forEach(_0x102=>{const _0x103=_0x115(_0x102)
;if(!_0x103&&/^(?:ad|support)-dialog$/.test(_0x102.getAttribute(_0x101)||"")){_0x102.removeAttribute(_0x101)
;_0x10b.delete(_0x102)}if(!_0x116(_0x102)){_0x10b.delete(_0x102);return}if(!_0x103){_0x105=true;return}_0x104=true
;_0x110=true;_0x113(_0x102,_0x103);const _0x106=_0x117(_0x102);if(_0x106)_0x100.add(_0x106)
;if(_0x103==="ad-dialog")_0x119(_0x102)});document.querySelectorAll(`[${_0x101}="ad-overlay"]`).forEach(_0x102=>{
if(!_0x100.has(_0x102))_0x102.removeAttribute(_0x101)});_0x100.forEach(_0x100=>_0x113(_0x100,"ad-overlay"))
;const _0x106=[document.body,document.documentElement].some(_0x100=>_0x100.style.pointerEvents==="none"||/^(hidden|clip)$/.test(_0x100.style.overflow))
;if(!_0x104&&!_0x106)_0x110=false;const _0x107=document.documentElement;if(_0x110&&!_0x105){
if(!_0x107.hasAttribute(_0x102))_0x107.setAttribute(_0x102,"true")
}else if(_0x107.hasAttribute(_0x102))_0x107.removeAttribute(_0x102);_0x11a()}function _0x11c(){if(_0x10e)return
;_0x10e=true;queueMicrotask(_0x11b)}function _0x11d(){if(!document.documentElement)return
;if(document.getElementById(_0x100))return;_0x112();_0x10c=new MutationObserver(_0x11c)
;_0x10c.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,
attributeFilter:["class","style","disabled","aria-disabled","aria-hidden","aria-label","aria-labelledby","role","type","open","hidden","inert","data-state","data-closed"]
});window.addEventListener("pageshow",_0x11c);window.addEventListener("popstate",_0x11c)
;document.addEventListener("DOMContentLoaded",_0x11c,{once:true});_0x11c()}if(document.documentElement)_0x11d();else{
const _0x100=new MutationObserver(()=>{if(document.documentElement){_0x100.disconnect();_0x11d()}})
;_0x100.observe(document,{childList:true,subtree:true})}})();
