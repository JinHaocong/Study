!function(){"use strict";var e,t,r,n,o,i={},u={};function a(e){var t=u[e];if(void 0!==t)return t.exports;var r=u[e]={exports:{}};return i[e](r,r.exports,a),r.exports}a.m=i,e=[],a.O=function(t,r,n,o){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],n=e[l][1],o=e[l][2];for(var u=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(a.O).every((function(e){return a.O[e](r[c])}))?r.splice(c--,1):(u=!1,o<i&&(i=o));if(u){e.splice(l--,1);var f=n();void 0!==f&&(t=f)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,n,o]},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},r=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},a.t=function(e,n){if(1&n&&(e=this(e)),8&n)return e;if("object"==typeof e&&e){if(4&n&&e.__esModule)return e;if(16&n&&"function"==typeof e.then)return e}var o=Object.create(null);a.r(o);var i={};t=t||[null,r({}),r([]),r(r)];for(var u=2&n&&e;"object"==typeof u&&!~t.indexOf(u);u=r(u))Object.getOwnPropertyNames(u).forEach((function(t){i[t]=function(){return e[t]}}));return i.default=function(){return e},a.d(o,i),o},a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,r){return a.f[r](e,t),t}),[]))},a.u=function(e){return"static/js/"+{177:"home",443:"about"}[e]+"."+{177:"d400b02fbc",443:"2fa45f498f"}[e]+".chunk.js"},a.miniCssF=function(e){return"static/css/home.b6cb0ef176.chunk.css"},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n={},o="test-react:",a.l=function(e,t,r,i){if(n[e])n[e].push(t);else{var u,c;if(void 0!==r)for(var f=document.getElementsByTagName("script"),l=0;l<f.length;l++){var s=f[l];if(s.getAttribute("src")==e||s.getAttribute("data-webpack")==o+r){u=s;break}}u||(c=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.setAttribute("data-webpack",o+r),u.src=e),n[e]=[t];var d=function(t,r){u.onerror=u.onload=null,clearTimeout(p);var o=n[e];if(delete n[e],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(r)})),t)return t(r)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},function(){var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&!e;)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e+"../../"}(),function(){if("undefined"!=typeof document){var e=function(e){return new Promise((function(t,r){var n=a.miniCssF(e),o=a.p+n;if(function(e,t){for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=(u=r[n]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(o===e||o===t))return u}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){var u;if((o=(u=i[n]).getAttribute("data-href"))===e||o===t)return u}}(n,o))return t();!function(e,t,r,n,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.onerror=i.onload=function(r){if(i.onerror=i.onload=null,"load"===r.type)n();else{var u=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,i.parentNode&&i.parentNode.removeChild(i),o(c)}},i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i)}(e,o,null,t,r)}))},t={861:0};a.f.miniCss=function(r,n){t[r]?n.push(t[r]):0!==t[r]&&{177:1}[r]&&n.push(t[r]=e(r).then((function(){t[r]=0}),(function(e){throw delete t[r],e})))}}}(),function(){var e={861:0};a.f.j=function(t,r){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else if(861!=t){var o=new Promise((function(r,o){n=e[t]=[r,o]}));r.push(n[2]=o);var i=a.p+a.u(t),u=new Error;a.l(i,(function(r){if(a.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,n[1](u)}}),"chunk-"+t,t)}else e[t]=0},a.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,o,i=r[0],u=r[1],c=r[2],f=0;if(i.some((function(t){return 0!==e[t]}))){for(n in u)a.o(u,n)&&(a.m[n]=u[n]);if(c)var l=c(a)}for(t&&t(r);f<i.length;f++)o=i[f],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(l)},r=self.webpackChunktest_react=self.webpackChunktest_react||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}()}();
//# sourceMappingURL=runtime~main.js.ac91f103bc.js.map