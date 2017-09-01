webpackJsonp([1],{"./node_modules/axios/index.js":function(e,t,r){e.exports=r("./node_modules/axios/lib/axios.js")},"./node_modules/axios/lib/adapters/xhr.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js"),o=r("./node_modules/axios/lib/core/settle.js"),s=r("./node_modules/axios/lib/helpers/buildURL.js"),a=r("./node_modules/axios/lib/helpers/parseHeaders.js"),i=r("./node_modules/axios/lib/helpers/isURLSameOrigin.js"),u=r("./node_modules/axios/lib/core/createError.js"),l="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||r("./node_modules/axios/lib/helpers/btoa.js");e.exports=function(e){return new Promise(function(t,c){var d=e.data,f=e.headers;n.isFormData(d)&&delete f["Content-Type"];var p=new XMLHttpRequest,m="onreadystatechange",h=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||i(e.url)||(p=new window.XDomainRequest,m="onload",h=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var b=e.auth.username||"",g=e.auth.password||"";f.Authorization="Basic "+l(b+":"+g)}if(p.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[m]=function(){if(p&&(4===p.readyState||h)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,n=e.responseType&&"text"!==e.responseType?p.response:p.responseText,s={data:n,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:r,config:e,request:p};o(t,c,s),p=null}},p.onerror=function(){c(u("Network Error",e,null,p)),p=null},p.ontimeout=function(){c(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var y=r("./node_modules/axios/lib/helpers/cookies.js"),_=(e.withCredentials||i(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;_&&(f[e.xsrfHeaderName]=_)}if("setRequestHeader"in p&&n.forEach(f,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete f[t]:p.setRequestHeader(t,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),c(e),p=null)}),void 0===d&&(d=null),p.send(d)})}},"./node_modules/axios/lib/axios.js":function(e,t,r){"use strict";function n(e){var t=new a(e),r=s(a.prototype.request,t);return o.extend(r,a.prototype,t),o.extend(r,t),r}var o=r("./node_modules/axios/lib/utils.js"),s=r("./node_modules/axios/lib/helpers/bind.js"),a=r("./node_modules/axios/lib/core/Axios.js"),i=r("./node_modules/axios/lib/defaults.js"),u=n(i);u.Axios=a,u.create=function(e){return n(o.merge(i,e))},u.Cancel=r("./node_modules/axios/lib/cancel/Cancel.js"),u.CancelToken=r("./node_modules/axios/lib/cancel/CancelToken.js"),u.isCancel=r("./node_modules/axios/lib/cancel/isCancel.js"),u.all=function(e){return Promise.all(e)},u.spread=r("./node_modules/axios/lib/helpers/spread.js"),e.exports=u,e.exports.default=u},"./node_modules/axios/lib/cancel/Cancel.js":function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},"./node_modules/axios/lib/cancel/CancelToken.js":function(e,t,r){"use strict";function n(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var r=this;e(function(e){r.reason||(r.reason=new o(e),t(r.reason))})}var o=r("./node_modules/axios/lib/cancel/Cancel.js");n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var e;return{token:new n(function(t){e=t}),cancel:e}},e.exports=n},"./node_modules/axios/lib/cancel/isCancel.js":function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},"./node_modules/axios/lib/core/Axios.js":function(e,t,r){"use strict";function n(e){this.defaults=e,this.interceptors={request:new a,response:new a}}var o=r("./node_modules/axios/lib/defaults.js"),s=r("./node_modules/axios/lib/utils.js"),a=r("./node_modules/axios/lib/core/InterceptorManager.js"),i=r("./node_modules/axios/lib/core/dispatchRequest.js"),u=r("./node_modules/axios/lib/helpers/isAbsoluteURL.js"),l=r("./node_modules/axios/lib/helpers/combineURLs.js");n.prototype.request=function(e){"string"==typeof e&&(e=s.merge({url:arguments[0]},arguments[1])),e=s.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!u(e.url)&&(e.url=l(e.baseURL,e.url));var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)r=r.then(t.shift(),t.shift());return r},s.forEach(["delete","get","head","options"],function(e){n.prototype[e]=function(t,r){return this.request(s.merge(r||{},{method:e,url:t}))}}),s.forEach(["post","put","patch"],function(e){n.prototype[e]=function(t,r,n){return this.request(s.merge(n||{},{method:e,url:t,data:r}))}}),e.exports=n},"./node_modules/axios/lib/core/InterceptorManager.js":function(e,t,r){"use strict";function n(){this.handlers=[]}var o=r("./node_modules/axios/lib/utils.js");n.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},n.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},n.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=n},"./node_modules/axios/lib/core/createError.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/core/enhanceError.js");e.exports=function(e,t,r,o,s){var a=new Error(e);return n(a,t,r,o,s)}},"./node_modules/axios/lib/core/dispatchRequest.js":function(e,t,r){"use strict";function n(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=r("./node_modules/axios/lib/utils.js"),s=r("./node_modules/axios/lib/core/transformData.js"),a=r("./node_modules/axios/lib/cancel/isCancel.js"),i=r("./node_modules/axios/lib/defaults.js");e.exports=function(e){return n(e),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return n(e),t.data=s(t.data,t.headers,e.transformResponse),t},function(t){return a(t)||(n(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},"./node_modules/axios/lib/core/enhanceError.js":function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e}},"./node_modules/axios/lib/core/settle.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/core/createError.js");e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},"./node_modules/axios/lib/core/transformData.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js");e.exports=function(e,t,r){return n.forEach(r,function(r){e=r(e,t)}),e}},"./node_modules/axios/lib/defaults.js":function(e,t,r){"use strict";(function(t){function n(e,t){!o.isUndefined(e)&&o.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var o=r("./node_modules/axios/lib/utils.js"),s=r("./node_modules/axios/lib/helpers/normalizeHeaderName.js"),a={"Content-Type":"application/x-www-form-urlencoded"},i={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=r("./node_modules/axios/lib/adapters/xhr.js"):void 0!==t&&(e=r("./node_modules/axios/lib/adapters/xhr.js")),e}(),transformRequest:[function(e,t){return s(t,"Content-Type"),o.isFormData(e)||o.isArrayBuffer(e)||o.isBuffer(e)||o.isStream(e)||o.isFile(e)||o.isBlob(e)?e:o.isArrayBufferView(e)?e.buffer:o.isURLSearchParams(e)?(n(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):o.isObject(e)?(n(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};i.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(e){i.headers[e]={}}),o.forEach(["post","put","patch"],function(e){i.headers[e]=o.merge(a)}),e.exports=i}).call(t,r("./node_modules/node-libs-browser/node_modules/process/browser.js"))},"./node_modules/axios/lib/helpers/bind.js":function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},"./node_modules/axios/lib/helpers/btoa.js":function(e,t,r){"use strict";function n(){this.message="String contains an invalid character"}function o(e){for(var t,r,o=String(e),a="",i=0,u=s;o.charAt(0|i)||(u="=",i%1);a+=u.charAt(63&t>>8-i%1*8)){if((r=o.charCodeAt(i+=.75))>255)throw new n;t=t<<8|r}return a}var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=o},"./node_modules/axios/lib/helpers/buildURL.js":function(e,t,r){"use strict";function n(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=r("./node_modules/axios/lib/utils.js");e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(o.isURLSearchParams(t))s=t.toString();else{var a=[];o.forEach(t,function(e,t){null!==e&&void 0!==e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),a.push(n(t)+"="+n(e))}))}),s=a.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},"./node_modules/axios/lib/helpers/combineURLs.js":function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},"./node_modules/axios/lib/helpers/cookies.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js");e.exports=n.isStandardBrowserEnv()?function(){return{write:function(e,t,r,o,s,a){var i=[];i.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),n.isString(o)&&i.push("path="+o),n.isString(s)&&i.push("domain="+s),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"./node_modules/axios/lib/helpers/isAbsoluteURL.js":function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},"./node_modules/axios/lib/helpers/isURLSameOrigin.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js");e.exports=n.isStandardBrowserEnv()?function(){function e(e){var t=e;return r&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,r=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(r){var o=n.isString(r)?e(r):r;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},"./node_modules/axios/lib/helpers/normalizeHeaderName.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js");e.exports=function(e,t){n.forEach(e,function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])})}},"./node_modules/axios/lib/helpers/parseHeaders.js":function(e,t,r){"use strict";var n=r("./node_modules/axios/lib/utils.js");e.exports=function(e){var t,r,o,s={};return e?(n.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t&&(s[t]=s[t]?s[t]+", "+r:r)}),s):s}},"./node_modules/axios/lib/helpers/spread.js":function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},"./node_modules/axios/lib/utils.js":function(e,t,r){"use strict";function n(e){return"[object Array]"===j.call(e)}function o(e){return"[object ArrayBuffer]"===j.call(e)}function s(e){return"undefined"!=typeof FormData&&e instanceof FormData}function a(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function i(e){return"string"==typeof e}function u(e){return"number"==typeof e}function l(e){return void 0===e}function c(e){return null!==e&&"object"==typeof e}function d(e){return"[object Date]"===j.call(e)}function f(e){return"[object File]"===j.call(e)}function p(e){return"[object Blob]"===j.call(e)}function m(e){return"[object Function]"===j.call(e)}function h(e){return c(e)&&m(e.pipe)}function b(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function g(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function y(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function _(e,t){if(null!==e&&void 0!==e)if("object"==typeof e||n(e)||(e=[e]),n(e))for(var r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}function v(){function e(e,r){"object"==typeof t[r]&&"object"==typeof e?t[r]=v(t[r],e):t[r]=e}for(var t={},r=0,n=arguments.length;r<n;r++)_(arguments[r],e);return t}function E(e,t,r){return _(t,function(t,n){e[n]=r&&"function"==typeof t?w(t,r):t}),e}var w=r("./node_modules/axios/lib/helpers/bind.js"),x=r("./node_modules/is-buffer/index.js"),j=Object.prototype.toString;e.exports={isArray:n,isArrayBuffer:o,isBuffer:x,isFormData:s,isArrayBufferView:a,isString:i,isNumber:u,isObject:c,isUndefined:l,isDate:d,isFile:f,isBlob:p,isFunction:m,isStream:h,isURLSearchParams:b,isStandardBrowserEnv:y,forEach:_,merge:v,extend:E,trim:g}},"./node_modules/is-buffer/index.js":function(e,t){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function n(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(r(e)||n(e)||!!e._isBuffer)}},"./node_modules/react-router-redux/es/ConnectedRouter.js":function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=r("./node_modules/react/react.js"),i=r.n(a),u=r("./node_modules/prop-types/index.js"),l=r.n(u),c=r("./node_modules/react-router/es/index.js"),d=r("./node_modules/react-router-redux/es/reducer.js"),f=function(e){function t(){var r,s,a;n(this,t);for(var i=arguments.length,u=Array(i),l=0;l<i;l++)u[l]=arguments[l];return r=s=o(this,e.call.apply(e,[this].concat(u))),s.handleLocationChange=function(e){s.store.dispatch({type:d.a,payload:e})},a=r,o(s,a)}return s(t,e),t.prototype.componentWillMount=function(){var e=this.props,t=e.store,r=e.history;this.store=t||this.context.store,this.unsubscribeFromHistory=r.listen(this.handleLocationChange),this.handleLocationChange(r.location)},t.prototype.componentWillUnmount=function(){this.unsubscribeFromHistory&&this.unsubscribeFromHistory()},t.prototype.render=function(){return i.a.createElement(c.a,this.props)},t}(a.Component);f.propTypes={store:l.a.object,history:l.a.object,children:l.a.node},f.contextTypes={store:l.a.object},t.a=f},"./node_modules/react-router-redux/es/actions.js":function(e,t,r){"use strict";function n(e){return function(){for(var t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return{type:o,payload:{method:e,args:r}}}}r.d(t,"a",function(){return o}),r.d(t,"e",function(){return s}),r.d(t,"f",function(){return a}),r.d(t,"b",function(){return i}),r.d(t,"c",function(){return u}),r.d(t,"d",function(){return l}),r.d(t,"g",function(){return c});var o="@@router/CALL_HISTORY_METHOD",s=n("push"),a=n("replace"),i=n("go"),u=n("goBack"),l=n("goForward"),c={push:s,replace:a,go:i,goBack:u,goForward:l}},"./node_modules/react-router-redux/es/index.js":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("./node_modules/react-router-redux/es/ConnectedRouter.js");r.d(t,"ConnectedRouter",function(){return n.a});var o=r("./node_modules/react-router-redux/es/reducer.js");r.d(t,"LOCATION_CHANGE",function(){return o.a}),r.d(t,"routerReducer",function(){return o.b});var s=r("./node_modules/react-router-redux/es/actions.js");r.d(t,"CALL_HISTORY_METHOD",function(){return s.a}),r.d(t,"push",function(){return s.e}),r.d(t,"replace",function(){return s.f}),r.d(t,"go",function(){return s.b}),r.d(t,"goBack",function(){return s.c}),r.d(t,"goForward",function(){return s.d}),r.d(t,"routerActions",function(){return s.g});var a=r("./node_modules/react-router-redux/es/middleware.js");r.d(t,"routerMiddleware",function(){return a.a})},"./node_modules/react-router-redux/es/middleware.js":function(e,t,r){"use strict";function n(e){return function(){return function(t){return function(r){if(r.type!==o.a)return t(r);var n=r.payload,s=n.method,a=n.args;e[s].apply(e,a)}}}}t.a=n;var o=r("./node_modules/react-router-redux/es/actions.js")},"./node_modules/react-router-redux/es/reducer.js":function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.type,n=t.payload;return r===s?o({},e,{location:n}):e}r.d(t,"a",function(){return s}),t.b=n;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="@@router/LOCATION_CHANGE",a={location:null}},"./node_modules/react-router/es/index.js":function(e,t,r){"use strict";var n=(r("./node_modules/react-router/es/MemoryRouter.js"),r("./node_modules/react-router/es/Prompt.js"),r("./node_modules/react-router/es/Redirect.js"),r("./node_modules/react-router/es/Route.js"),r("./node_modules/react-router/es/Router.js"));r.d(t,"a",function(){return n.a});r("./node_modules/react-router/es/StaticRouter.js"),r("./node_modules/react-router/es/Switch.js"),r("./node_modules/react-router/es/matchPath.js"),r("./node_modules/react-router/es/withRouter.js")},"./src/actions/actions.jsx":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.startSignUp=t.startSignIn=t.passwordConfirmedInvalid=t.passwordConfirmed=t.passwordValid=t.passwordInValid=t.emailValid=t.emailInValid=t.passwordErrorMsg=t.emailErrorMsg=t.clearErrorMsg=t.emptyPasswordError=t.emptyEmailError=t.invalidEmailandPasswordError=t.signingInUser=void 0;var n=r("./node_modules/axios/index.js"),o=function(e){return e&&e.__esModule?e:{default:e}}(n),s=r("./node_modules/react-router-redux/es/index.js");t.signingInUser=function(){return{type:"SIGNING_IN_USER",signingIn:!0}},t.invalidEmailandPasswordError=function(){return{type:"INVALID_EMAIL_PASSWORD_ERROR",error:"Invalid Credentials"}},t.emptyEmailError=function(){return{type:"EMPTY_EMAIL_ERROR",error:"Empty Email"}},t.emptyPasswordError=function(){return{type:"EMPTY_PASSWORD_ERROR",error:"Empty Password"}},t.clearErrorMsg=function(){return{type:"CLEAR_ERROR_MSG"}},t.emailErrorMsg=function(e){return{type:"EMAIL_ERROR_MSG",flag:e}},t.passwordErrorMsg=function(e){return{type:"PASSWORD_ERROR_MSG",flag:e}},t.emailInValid=function(e){return{type:"EMAIL_INVALID",flag:e}},t.emailValid=function(e){return{type:"EMAIL_VALID",flag:e}},t.passwordInValid=function(e){return{type:"PASSWORD_INVALID",flag:e}},t.passwordValid=function(e){return{type:"PASSWORD_VALID",flag:e}},t.passwordConfirmed=function(e){return{type:"PASSWORD_CONFIRMATION",flag:e}},t.passwordConfirmedInvalid=function(e){return{type:"PASSWORD_CONFIRMATION_INVALID",flag:e}},t.startSignIn=function(e){return function(t,r){console.log(JSON.stringify(e)),o.default.post("http://localhost:3050/signin_user",JSON.stringify(e)).then(function(e){console.log(e),t((0,s.push)("/bookclub"))}).catch(function(e){return console.log(e)})}},t.startSignUp=function(e){return function(t,r){console.log(JSON.stringify(e)),o.default.post("http://localhost:3050/signup_user",JSON.stringify(e)).then(function(e){console.log(e)}).catch(function(e){return console.log(e)})}}},"./src/app.jsx":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var o=r("./node_modules/react/react.js"),s=n(o),a=r("./node_modules/react-dom/index.js"),i=n(a),u=r("./node_modules/react-router-dom/es/index.js"),l=r("./node_modules/react-redux/es/index.js"),c=r("./node_modules/history/createBrowserHistory.js"),d=n(c),f=r("./node_modules/react-router-redux/es/index.js"),p=r("./src/components/Home.jsx"),m=n(p),h=r("./src/components/SignUp.jsx"),b=n(h),g=r("./src/components/BookClub.jsx"),y=n(g);r("./styles/main.scss");var _=(r("./src/actions/actions.jsx"),r("./src/store/configureStore.jsx").configure()),v=(0,d.default)();i.default.render(s.default.createElement(l.Provider,{store:_},s.default.createElement(f.ConnectedRouter,{history:v},s.default.createElement(u.BrowserRouter,null,s.default.createElement(u.Switch,null,s.default.createElement(u.Route,{exact:!0,path:"/",component:m.default}),s.default.createElement(u.Route,{exact:!0,path:"/signup",component:b.default}),s.default.createElement(u.Route,{exact:!0,path:"/bookclub",component:y.default}),s.default.createElement(u.Route,{render:function(){return s.default.createElement("h1",null,"Page not found.")}}))))),document.getElementById("root"))},"./src/components/BookClub.jsx":function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r("./node_modules/react/react.js"),u=function(e){return e&&e.__esModule?e:{default:e}}(i),l=r("./node_modules/react-router-dom/es/index.js"),c=function(e){function t(e){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return s(t,e),a(t,[{key:"render",value:function(){return u.default.createElement("div",null,u.default.createElement("h1",null,"After Login or Sign UP redirect here.."))}}]),t}(i.Component);t.default=(0,l.withRouter)(c)},"./src/components/Home.jsx":function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r("./node_modules/react/react.js"),u=function(e){return e&&e.__esModule?e:{default:e}}(i),l=r("./node_modules/react-router-dom/es/index.js"),c=r("./node_modules/react-redux/es/index.js"),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(c),f=r("./src/actions/actions.jsx"),p=function(e){function t(e){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return s(t,e),a(t,[{key:"componentWillUnmount",value:function(){(0,this.props.dispatch)(f.clearErrorMsg())}},{key:"handleSignIn",value:function(e){e.preventDefault();var t=this.props.dispatch;t(f.clearErrorMsg());var r=this.refs.username.value,n=this.refs.password.value,o={email:r,password:n};if(""===r||""===n)return""===r&&t(f.emptyEmailError()),void(""===n&&t(f.emptyPasswordError()));t(f.startSignIn(o))}},{key:"handleChange",value:function(e){var t=this.props,r=t.dispatch;""!==t.auth.signIn&&r(f.clearErrorMsg())}},{key:"render",value:function(){return u.default.createElement("div",null,u.default.createElement("div",{className:"bc-background"}),u.default.createElement("div",{className:"bc-background-overlay"},u.default.createElement("div",{className:"bc-auth-container"},u.default.createElement("div",{className:"bc-auth-form"},u.default.createElement("div",{className:"bc-auth-header"},"Already a member?",u.default.createElement("br",null),u.default.createElement("br",null),"Sign In"),u.default.createElement("form",null,u.default.createElement("div",{className:"bc-input-style"},u.default.createElement("div",{className:"bc-input-icon fa fa-user-circle"},this.props.auth.signIn.noEmail?u.default.createElement("p",{className:"bc-input-error"},"Email Required"):null),u.default.createElement("input",{placeholder:"Email",ref:"username",onChange:this.handleChange.bind(this)})),u.default.createElement("br",null),u.default.createElement("div",{className:"bc-input-style"},u.default.createElement("div",{className:"bc-input-icon fa fa-key"},this.props.auth.signIn.invalidCredentials?u.default.createElement("p",{className:"bc-auth-error"},"Invalid Email or Password"):null,this.props.auth.signIn.noPassword?u.default.createElement("p",{className:"bc-input-error"},"Password Required"):null),u.default.createElement("input",{placeholder:"Password",type:"password",ref:"password"})),u.default.createElement("br",null),this.props.auth.signingIn?u.default.createElement("button",{onClick:function(e){return e.preventDefault()}},u.default.createElement("i",{className:"fa fa-spinner fa-pulse"})):u.default.createElement("button",{onClick:this.handleSignIn.bind(this)},"Sign In"))),u.default.createElement("div",{className:"bc-auth-bg"},u.default.createElement("div",{className:"bc-auth-bg-overlay"},u.default.createElement("div",{className:"bc-auth-bg-fcclogo"},u.default.createElement("div",{className:"bc-auth-bg-logo"})),u.default.createElement("div",{className:"bc-auth-signup"},u.default.createElement("div",{className:"bc-auth-signup-txt"},"Not a member yet ?"),u.default.createElement(l.Link,{to:"/signup"},u.default.createElement("div",{className:"bc-auth-signup-lnk"},"Sign Up")),u.default.createElement("div",{className:"bc-auth-techstack"})))))))}}]),t}(i.Component);t.default=(0,l.withRouter)(d.connect(function(e){return{auth:e.auth}})(p))},"./src/components/SignUp.jsx":function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r("./node_modules/react/react.js"),u=function(e){return e&&e.__esModule?e:{default:e}}(i),l=r("./node_modules/react-router-dom/es/index.js"),c=r("./node_modules/react-redux/es/index.js"),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(c),f=r("./src/actions/actions.jsx"),p=function(e){function t(e){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return s(t,e),a(t,[{key:"handleSignUp",value:function(e){e.preventDefault();var t=this.props,r=t.dispatch,n=t.auth,o=this.refs.userEmail.value,s=this.refs.password.value,a=this.refs.passwordConfirm.value,i={email:o,password:s};if(""===o||""===s||""===a)return""===o&&r(f.emailErrorMsg(!0)),void(""===s&&r(f.passwordErrorMsg(!0)));n.signUp.emailValid&&n.signUp.passwordValid&&n.signUp.passwordConfirmed&&r(f.startSignUp(i))}},{key:"handleFieldChange",value:function(){var e=this.props.dispatch,t=this.refs.userEmail.value,r=this.refs.password.value,n=this.refs.passwordConfirm.value;if(0===t.length||0===r.length)return 0===t.length&&e(f.emailValid(!1)),void(0===r.length&&e(f.passwordValid(!1)));n===r&&(e(f.passwordConfirmedInvalid(!1)),e(f.passwordConfirmed(!0)))}},{key:"handleEmailValidity",value:function(){var e=this.props.dispatch,t=this.refs.userEmail.value;if(0===t.length)return e(f.emailErrorMsg(!1)),e(f.emailValid(!1)),void e(f.emailInValid(!1));""===t||/\S+@\S+\.\S+/.test(t)?""!==t&&/\S+@\S+\.\S+/.test(t)&&(e(f.emailErrorMsg(!1)),e(f.emailValid(!0)),e(f.emailInValid(!1))):(e(f.emailErrorMsg(!1)),e(f.emailInValid(!0)),e(f.emailValid(!1)))}},{key:"handlePasswordValidity",value:function(){var e=this.props.dispatch,t=this.refs.password.value;if(0===t.length)return void e(f.passwordValid(!1));0!==t.length&&t.length<6?(e(f.passwordErrorMsg(!1)),e(f.passwordInValid(!0)),e(f.passwordValid(!1))):t.length>=6&&(e(f.passwordErrorMsg(!1)),e(f.passwordValid(!0)),e(f.passwordInValid(!1)))}},{key:"handlePasswordConfirmValidity",value:function(){var e=this.props.dispatch,t=this.refs.password.value;this.refs.passwordConfirm.value!==t&&(e(f.passwordConfirmed(!1)),e(f.passwordConfirmedInvalid(!0)))}},{key:"render",value:function(){return u.default.createElement("div",null,u.default.createElement("div",{className:"bc-background"}),u.default.createElement("div",{className:"bc-background-overlay"},u.default.createElement("div",{className:"bc-auth-container"},u.default.createElement("div",{className:"bc-auth-form"},u.default.createElement("div",{className:"bc-auth-header"},"Sign Up"),u.default.createElement("form",null,u.default.createElement("div",{className:"bc-input-style"},u.default.createElement("div",{className:"bc-input-icon fa fa-user-circle"},this.props.auth.signUp.noEmail?u.default.createElement("p",{className:"bc-input-error"},"Email Required"):null,this.props.auth.signUp.emailInValid?u.default.createElement("p",{className:"bc-input-error"},"Email Invalid"):null,this.props.auth.signUp.emailValid?u.default.createElement("i",{className:"fa fa-check bc-input-valid"}):null),u.default.createElement("input",{placeholder:"Email",ref:"userEmail",onChange:this.handleFieldChange.bind(this),onBlur:this.handleEmailValidity.bind(this)})),u.default.createElement("br",null),u.default.createElement("div",{className:"bc-input-style"},u.default.createElement("div",{className:"bc-input-icon fa fa-key"},this.props.auth.signUp.noPassword?u.default.createElement("p",{className:"bc-input-error"},"Password minimun 6 characters"):null,this.props.auth.signUp.passwordInValid?u.default.createElement("p",{className:"bc-input-error"},"Password minimun 6 characters"):null,this.props.auth.signUp.passwordValid?u.default.createElement("i",{className:"fa fa-check bc-input-valid"}):null),u.default.createElement("input",{placeholder:"Password",type:"password",ref:"password",onChange:this.handleFieldChange.bind(this),onBlur:this.handlePasswordValidity.bind(this)})),u.default.createElement("br",null),u.default.createElement("div",{className:"bc-input-style"},u.default.createElement("div",{className:"bc-input-icon fa fa-key"},this.props.auth.signUp.passwordConfirmed?u.default.createElement("i",{className:"fa fa-check bc-input-valid"}):null,this.props.auth.signUp.passwordConfirmedInvalid?u.default.createElement("i",{className:"fa fa-times bc-input-invalid"}):null),u.default.createElement("input",{placeholder:"Confirm Password",type:"password",ref:"passwordConfirm",onChange:this.handleFieldChange.bind(this),onBlur:this.handlePasswordConfirmValidity.bind(this)})),u.default.createElement("br",null),this.props.auth.signingUp?u.default.createElement("button",{onClick:function(e){return e.preventDefault()}},u.default.createElement("i",{className:"fa fa-spinner fa-pulse"})):u.default.createElement("button",{onClick:this.handleSignUp.bind(this)},"Sign Up"))),u.default.createElement("div",{className:"bc-auth-bg"},u.default.createElement("div",{className:"bc-auth-bg-overlay"},u.default.createElement("div",{className:"bc-auth-bg-fcclogo"},u.default.createElement("div",{className:"bc-auth-bg-logo"})),u.default.createElement("div",{className:"bc-auth-signup"},u.default.createElement("div",{className:"bc-auth-signup-txt"},"Already a member ?"),u.default.createElement(l.Link,{to:"/"},u.default.createElement("div",{className:"bc-auth-signup-lnk"},"Sign In")),u.default.createElement("div",{className:"bc-auth-techstack"})))))))}}]),t}(i.Component);t.default=(0,l.withRouter)(d.connect(function(e){return{auth:e.auth}})(p))},"./src/reducers/reducers.jsx":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.authReducer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{signIn:"",signUp:""},t=arguments[1];switch(t.type){case"SIGNING_IN_USER":return n({},e,{signingIn:!0});case"INVALID_EMAIL_PASSWORD_ERROR":return n({},e,{signIn:n({},e.signIn,{invalidCredentials:t.error})});case"EMPTY_EMAIL_ERROR":return n({},e,{signIn:n({},e.signIn,{noEmail:t.error})});case"EMPTY_PASSWORD_ERROR":return n({},e,{signIn:n({},e.signIn,{noPassword:t.error})});case"CLEAR_ERROR_MSG":return n({},e,{signIn:"",signUp:""});case"EMAIL_ERROR_MSG":return n({},e,{signUp:n({},e.signUp,{noEmail:t.flag})});case"PASSWORD_ERROR_MSG":return n({},e,{signUp:n({},e.signUp,{noPassword:t.flag})});case"EMAIL_VALID":return n({},e,{signUp:n({},e.signUp,{emailValid:t.flag})});case"EMAIL_INVALID":return n({},e,{signUp:n({},e.signUp,{emailInValid:t.flag})});case"PASSWORD_VALID":return n({},e,{signUp:n({},e.signUp,{passwordValid:t.flag})});case"PASSWORD_INVALID":return n({},e,{signUp:n({},e.signUp,{passwordInValid:t.flag})});case"PASSWORD_CONFIRMATION":return n({},e,{signUp:n({},e.signUp,{passwordConfirmed:t.flag})});case"PASSWORD_CONFIRMATION_INVALID":return n({},e,{signUp:n({},e.signUp,{passwordConfirmedInvalid:t.flag})});default:return e}}},"./src/store/configureStore.jsx":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.configure=void 0;var o=r("./node_modules/redux/es/index.js"),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(o),a=r("./node_modules/redux-thunk/lib/index.js"),i=n(a),u=r("./node_modules/history/createBrowserHistory.js"),l=n(u),c=r("./node_modules/react-router-redux/es/index.js"),d=r("./src/reducers/reducers.jsx"),f=(0,l.default)(),p=(0,c.routerMiddleware)(f);t.configure=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=s.combineReducers({auth:d.authReducer,router:c.routerReducer});return s.createStore(t,e,s.compose(s.applyMiddleware(i.default,p),window.devToolsExtension?window.devToolsExtension():function(e){return e}))}},"./styles/main.scss":function(e,t,r){}},["./src/app.jsx"]);