if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(i[l])return;let r={};const c=e=>s(e,l),u={module:{uri:l},exports:r,require:c};i[l]=Promise.all(t.map((e=>u[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-6716fad7"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"01dbf3c4b187c37ef9100ce5f08ae5d9"},{url:"static/css/main.c46fd3866e.css",revision:null},{url:"static/js/483.72c4eeebaf.js",revision:null},{url:"static/js/main.891b71e4f2.js",revision:null},{url:"static/js/math.chunk.cea9e3db71.js",revision:null},{url:"static/js/runtime~main.js.4ef1c6da48.js",revision:null},{url:"static/media/3f4bdd4bb5.png",revision:null},{url:"static/media/57ce970445.png",revision:null},{url:"static/media/7e4c9746ac.ttf?t=1651653684611",revision:null},{url:"static/media/822a5c27c9.woff?t=1651653684611",revision:null},{url:"static/media/c39e78e122.woff2?t=1651653684611",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
