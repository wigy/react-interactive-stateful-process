var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/node-stdlib-browser/helpers/esbuild/shim.js
var import_buffer, import_process, _globalThis, _global;
var init_shim = __esm({
  "node_modules/node-stdlib-browser/helpers/esbuild/shim.js"() {
    import_buffer = require("buffer");
    import_process = __toESM(require("process"));
    _globalThis = function(Object2) {
      function get() {
        var _global3 = this || self;
        delete Object2.prototype.__magic__;
        return _global3;
      }
      if (typeof globalThis === "object") {
        return globalThis;
      }
      if (this) {
        return get();
      } else {
        Object2.defineProperty(Object2.prototype, "__magic__", {
          configurable: true,
          get
        });
        var _global2 = __magic__;
        return _global2;
      }
    }(Object);
    _global = _globalThis;
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    init_shim();
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return toString.call(val) === "[object FormData]";
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return toString.call(val) === "[object URLSearchParams]";
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    function encode2(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode2(key) + "=" + encode2(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    init_shim();
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    init_shim();
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    init_shim();
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    init_shim();
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(
            timeoutErrorMessage,
            config,
            transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    init_shim();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    init_shim();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    init_shim();
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof import_process.default !== "undefined" && "env" in import_process.default) {
        r = import_process.default.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = (flag, argv = import_process.default.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    init_shim();
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = import_process.default;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (import_process.default.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    init_shim();
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(import_process.default.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = import_process.default.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(import_process.default.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return import_process.default.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        import_process.default.env.DEBUG = namespaces;
      } else {
        delete import_process.default.env.DEBUG;
      }
    }
    function load() {
      return import_process.default.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    init_shim();
    if (typeof import_process.default === "undefined" || import_process.default.type === "renderer" || import_process.default.browser === true || import_process.default.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    init_shim();
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    init_shim();
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded"
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        self2._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      abortRequest(this._currentRequest);
      this.emit("abort");
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener("abort", clearTimer);
        self2.removeListener("error", clearTimer);
        self2.removeListener("response", clearTimer);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._options.path;
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self2._currentRequest) {
            if (error) {
              self2.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      abortRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new TooManyRedirectsError());
        return;
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = url.parse(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl;
      try {
        redirectUrl = url.resolve(currentUrl, location);
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
        return;
      }
      debug("redirecting to", redirectUrl);
      this._isRedirect = true;
      var redirectUrlParts = url.parse(redirectUrl);
      Object.assign(this._options, redirectUrlParts);
      if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
        removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
      }
      if (isFunction(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        try {
          beforeRedirect(this._options, responseDetails, requestDetails);
        } catch (err) {
          this.emit("error", err);
          return;
        }
        this._sanitizeOptions(this._options);
      }
      try {
        this._performRequest();
      } catch (cause) {
        this.emit("error", new RedirectionError({ cause }));
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isString(input)) {
            var parsed;
            try {
              parsed = urlToOptions(new URL(input));
            } catch (err) {
              parsed = url.parse(input);
            }
            if (!isString(parsed.protocol)) {
              throw new InvalidUrlError({ input });
            }
            input = parsed;
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (isFunction(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString(options.host) && !isString(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      return CustomError;
    }
    function abortRequest(request) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop);
      request.abort();
    }
    function isSubdomain(subdomain, domain) {
      assert(isString(subdomain) && isString(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isBuffer(value) {
      return typeof value === "object" && "length" in value;
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module2) {
    init_shim();
    module2.exports = {
      "version": "0.26.0"
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var VERSION = require_data().version;
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = import_buffer.Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        var resolve = function resolve2(value) {
          done();
          resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject2(value) {
          done();
          rejected = true;
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
          headerNames[name.toLowerCase()] = name;
        });
        if ("user-agent" in headerNames) {
          if (!headers[headerNames["user-agent"]]) {
            delete headers[headerNames["user-agent"]];
          }
        } else {
          headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
          if (import_buffer.Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = import_buffer.Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = import_buffer.Buffer.from(data, "utf-8");
          } else {
            return reject(createError(
              "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
              config
            ));
          }
          if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
            return reject(createError("Request body larger than maxBodyLength limit", config));
          }
          if (!headerNames["content-length"]) {
            headers["Content-Length"] = data.length;
          }
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
          delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
          buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
          var customErr = new Error(err.message);
          customErr.config = config;
          customErr.url = config.url;
          customErr.exists = true;
          reject(customErr);
        }
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = import_process.default.env[proxyEnv] || import_process.default.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = import_process.default.env.no_proxy || import_process.default.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
          options.insecureHTTPParser = config.insecureHTTPParser;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            var totalResponseBytes = 0;
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              totalResponseBytes += chunk.length;
              if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                rejected = true;
                stream.destroy();
                reject(createError(
                  "maxContentLength size of " + config.maxContentLength + " exceeded",
                  config,
                  null,
                  lastRequest
                ));
              }
            });
            stream.on("aborted", function handlerStreamAborted() {
              if (rejected) {
                return;
              }
              stream.destroy();
              reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              try {
                var responseData = responseBuffer.length === 1 ? responseBuffer[0] : import_buffer.Buffer.concat(responseBuffer);
                if (config.responseType !== "arraybuffer") {
                  responseData = responseData.toString(config.responseEncoding);
                  if (!config.responseEncoding || config.responseEncoding === "utf8") {
                    responseData = utils.stripBOM(responseData);
                  }
                }
                response.data = responseData;
              } catch (err) {
                reject(enhanceError(err, config, err.code, response.request, response));
              }
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        req.on("socket", function handleRequestSocket(socket) {
          socket.setKeepAlive(true, 1e3 * 60);
        });
        if (config.timeout) {
          var timeout = parseInt(config.timeout, 10);
          if (isNaN(timeout)) {
            reject(createError(
              "error trying to parse `config.timeout` to int",
              config,
              "ERR_PARSE_TIMEOUT",
              req
            ));
            return;
          }
          req.setTimeout(timeout, function handleRequestTimeout() {
            req.abort();
            var timeoutErrorMessage = "";
            if (config.timeoutErrorMessage) {
              timeoutErrorMessage = config.timeoutErrorMessage;
            } else {
              timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
            }
            var transitional = config.transitional || defaults.transitional;
            reject(createError(
              timeoutErrorMessage,
              config,
              transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED",
              req
            ));
          });
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof import_process.default !== "undefined" && Object.prototype.toString.call(import_process.default) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var defaults = require_defaults();
    module2.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module2) {
    "use strict";
    init_shim();
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module2.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    init_shim();
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    init_shim();
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    module2.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    init_shim();
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios4 = createInstance(defaults);
    axios4.Axios = Axios;
    axios4.Cancel = require_Cancel();
    axios4.CancelToken = require_CancelToken();
    axios4.isCancel = require_isCancel();
    axios4.VERSION = require_data().version;
    axios4.all = function all(promises) {
      return Promise.all(promises);
    };
    axios4.spread = require_spread();
    axios4.isAxiosError = require_isAxiosError();
    module2.exports = axios4;
    module2.exports.default = axios4;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    init_shim();
    module2.exports = require_axios();
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ActionEngine: () => ActionEngine,
  BooleanRenderer: () => BooleanRenderer,
  BoxRenderer: () => BoxRenderer,
  ButtonRenderer: () => ButtonRenderer,
  CaseRenderer: () => CaseRenderer,
  ConfigChangeView: () => ConfigChangeView,
  ConfigJSONView: () => ConfigJSONView,
  ConfigView: () => ConfigView,
  DefaultErrorView: () => DefaultErrorView,
  DefaultResultView: () => DefaultResultView,
  DefaultStateView: () => DefaultStateView,
  DefaultStepView: () => DefaultStepView,
  DefaultSuccessView: () => DefaultSuccessView,
  DefaultSummaryView: () => DefaultSummaryView,
  FileUploader: () => FileUploader,
  FlatRenderer: () => FlatRenderer,
  HtmlRenderer: () => HtmlRenderer,
  IGNORE_FIELDS: () => IGNORE_FIELDS,
  ImportFile: () => ImportFile,
  ImportLine: () => ImportLine,
  ImportStateView: () => ImportStateView,
  JsonEditor: () => JsonEditor,
  MessageRenderer: () => MessageRenderer,
  NumberRenderer: () => NumberRenderer,
  ProcessList: () => ProcessList,
  ProcessStatusIcon: () => ProcessStatusIcon,
  ProcessView: () => ProcessView,
  RISP: () => RISP,
  RISPProvider: () => RISPProvider,
  RadioRenderer: () => RadioRenderer,
  RenderingEngine: () => RenderingEngine,
  StepList: () => StepList,
  TextFileLineRenderer: () => TextFileLineRenderer,
  TextRenderer: () => TextRenderer,
  YesNoRenderer: () => YesNoRenderer,
  debugActionHandler: () => debugActionHandler,
  downloadUrl: () => downloadUrl,
  patchActionHandler: () => patchActionHandler,
  postActionHandler: () => postActionHandler,
  useAxios: () => useAxios
});
module.exports = __toCommonJS(src_exports);
init_shim();

// src/elements/index.ts
init_shim();

// src/elements/BooleanElement.tsx
init_shim();
var import_react = __toESM(require("react"));
var import_react_i18next = require("react-i18next");
var import_material = require("@mui/material");
var import_interactive_elements = require("interactive-elements");
var BooleanRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next.useTranslation)();
  const label = "label" in element ? element.label || "" : (0, import_interactive_elements.isNamedElement)(element) ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react.default.useState((0, import_interactive_elements.isNamedElement)(element) ? props.values[element.name] : null);
  if (!(0, import_interactive_elements.isBooleanElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_material.FormControlLabel, {
    control: /* @__PURE__ */ import_react.default.createElement(import_material.Checkbox, {
      checked: !!value,
      onChange: (e) => {
        setValue2(e.target.checked);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: !!e.target.checked }, props);
      },
      name: element.name,
      indeterminate: value === void 0 || value === null
    }),
    label
  });
};

// src/elements/BoxElement.tsx
init_shim();
var import_react2 = __toESM(require("react"));
var import_interactive_elements2 = require("interactive-elements");
var import_material2 = require("@mui/material");
var BoxRenderer = (props) => {
  const { element } = props;
  if (!(0, import_interactive_elements2.isBoxElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react2.default.createElement(import_material2.Card, {
    variant: "outlined"
  }, "title" in element && /* @__PURE__ */ import_react2.default.createElement(import_material2.CardHeader, {
    title: element.title
  }), /* @__PURE__ */ import_react2.default.createElement(import_material2.CardContent, null, element.elements.map(
    (element2, idx) => /* @__PURE__ */ import_react2.default.createElement(import_material2.Box, {
      key: idx,
      sx: { mt: idx > 0 ? 1.5 : 0 }
    }, RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 }))
  )));
};

// src/elements/ButtonElement.tsx
init_shim();
var import_react3 = __toESM(require("react"));
var import_react_i18next2 = require("react-i18next");
var import_material3 = require("@mui/material");
var import_interactive_elements3 = require("interactive-elements");
var ButtonRenderer = (props) => {
  const { t } = (0, import_react_i18next2.useTranslation)();
  const { element, values } = props;
  if (!(0, import_interactive_elements3.isButtonElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const label = t(`label-${element.label}`);
  const requirements = element.requires ? typeof element.requires === "string" ? [element.requires] : element.requires : [];
  const allGood = requirements.filter((r) => !values[r]).length === 0;
  return /* @__PURE__ */ import_react3.default.createElement(import_material3.Button, {
    variant: "outlined",
    disabled: !allGood,
    onClick: () => {
      element.triggerHandler && element.triggerHandler({ type: "onClick" }, props);
    }
  }, label);
};

// src/elements/CaseElement.tsx
init_shim();
var import_react4 = __toESM(require("react"));
var import_interactive_elements4 = require("interactive-elements");
var CaseRenderer = (props) => {
  const { element, values } = props;
  if (!(0, import_interactive_elements4.isCaseElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { cases, condition } = element;
  const noValue = values[condition] === void 0 || values[condition] === null;
  const defaultValue = element.defaultValue === void 0 ? void 0 : element.defaultValue;
  const selectedCase = noValue ? defaultValue : values[condition];
  const rendering = {};
  for (const [value, element2] of Object.entries(cases)) {
    rendering[value] = RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 });
  }
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, Object.entries(rendering).map(
    ([value, jsx]) => /* @__PURE__ */ import_react4.default.createElement("div", {
      key: value,
      style: { display: `${value}` === `${selectedCase}` ? "block" : "none" }
    }, jsx)
  ));
};

// src/elements/FlatElement.tsx
init_shim();
var import_react5 = __toESM(require("react"));
var import_interactive_elements5 = require("interactive-elements");
var import_material4 = require("@mui/material");
var FlatRenderer = (props) => {
  const { element } = props;
  if (!(0, import_interactive_elements5.isFlatElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, element.elements.map(
    (element2, idx) => /* @__PURE__ */ import_react5.default.createElement(import_material4.Box, {
      key: idx,
      sx: { mt: idx > 0 ? 1.5 : 0 }
    }, RenderingEngine.render({ values: props.values, setup: props.setup, element: element2 }))
  ));
};

// src/elements/HtmlElement.tsx
init_shim();
var import_react6 = __toESM(require("react"));
var import_interactive_elements6 = require("interactive-elements");
var import_material5 = require("@mui/material");
var HtmlRenderer = (props) => {
  const { element } = props;
  if (!(0, import_interactive_elements6.isHtmlElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { html } = element;
  return /* @__PURE__ */ import_react6.default.createElement(import_material5.Typography, {
    dangerouslySetInnerHTML: { __html: html }
  });
};

// src/elements/MessageElement.tsx
init_shim();
var import_react7 = __toESM(require("react"));
var import_interactive_elements7 = require("interactive-elements");
var import_material6 = require("@mui/material");
var MessageRenderer = (props) => {
  const { element } = props;
  if (!(0, import_interactive_elements7.isMessageElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { severity, text } = element;
  return /* @__PURE__ */ import_react7.default.createElement(import_material6.Alert, {
    severity
  }, text);
};

// src/elements/NumberElement.tsx
init_shim();
var import_react8 = __toESM(require("react"));
var import_react_i18next3 = require("react-i18next");
var import_material7 = require("@mui/material");
var import_interactive_elements8 = require("interactive-elements");
var NumberRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next3.useTranslation)();
  const label = (0, import_interactive_elements8.isNumberElement)(element) && element.label ? element.label : (0, import_interactive_elements8.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react8.default.useState((0, import_interactive_elements8.isNamedElement)(element) ? props.values[element.name] || null : null);
  if (!(0, import_interactive_elements8.isNumberElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  if (props.values[element.name] !== value) {
    setValue2(props.values[element.name]);
  }
  return /* @__PURE__ */ import_react8.default.createElement(import_material7.TextField, {
    label,
    value,
    type: "number",
    error: false,
    autoFocus: true,
    InputProps: {
      endAdornment: /* @__PURE__ */ import_react8.default.createElement(import_material7.InputAdornment, {
        position: "end"
      }, element.unit || "")
    },
    onChange: (e) => {
      const value2 = e.target.value === "" ? null : parseFloat(e.target.value);
      setValue2(value2);
      element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: value2 }, props);
    },
    onFocus: () => RISPProvider.onFocus(),
    onBlur: () => RISPProvider.onBlur(),
    onKeyPress: () => null,
    onKeyUp: () => null,
    onKeyDown: () => null
  });
};

// src/elements/RadioElement.tsx
init_shim();
var import_react9 = __toESM(require("react"));
var import_react_i18next4 = require("react-i18next");
var import_interactive_elements9 = require("interactive-elements");
var import_material8 = require("@mui/material");
var RadioRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next4.useTranslation)();
  const label = (0, import_interactive_elements9.isRadioElement)(element) && element.label ? element.label : (0, import_interactive_elements9.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react9.default.useState((0, import_interactive_elements9.isNamedElement)(element) ? props.values[element.name] || "" : "");
  if (!(0, import_interactive_elements9.isRadioElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  return /* @__PURE__ */ import_react9.default.createElement(import_material8.FormControl, {
    component: "fieldset"
  }, /* @__PURE__ */ import_react9.default.createElement(import_material8.FormLabel, {
    component: "legend"
  }, label), /* @__PURE__ */ import_react9.default.createElement(import_material8.RadioGroup, null, Object.entries(element.options).map(
    ([k, v]) => /* @__PURE__ */ import_react9.default.createElement(import_material8.FormControlLabel, {
      key: k,
      value: v,
      control: /* @__PURE__ */ import_react9.default.createElement(import_material8.Radio, null),
      label: k,
      checked: value === v,
      onChange: () => {
        setValue2(v);
        element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: v }, props);
      }
    })
  )));
};

// src/elements/TextElement.tsx
init_shim();
var import_react10 = __toESM(require("react"));
var import_react_i18next5 = require("react-i18next");
var import_material9 = require("@mui/material");
var import_interactive_elements10 = require("interactive-elements");
var TextRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next5.useTranslation)();
  const label = (0, import_interactive_elements10.isTextElement)(element) && element.label ? element.label : (0, import_interactive_elements10.isNamedElement)(element) && element.name ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react10.default.useState((0, import_interactive_elements10.isNamedElement)(element) ? props.values[element.name] || "" : "");
  if (!(0, import_interactive_elements10.isTextElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  if (props.values[element.name] !== value) {
    setValue2(props.values[element.name]);
  }
  return /* @__PURE__ */ import_react10.default.createElement(import_material9.TextField, {
    label,
    name: element.name,
    value: value || "",
    error: false,
    autoFocus: true,
    fullWidth: true,
    onChange: (e) => {
      setValue2(e.target.value);
      element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: e.target.value }, props);
    },
    onFocus: () => RISPProvider.onFocus(),
    onBlur: () => RISPProvider.onBlur(),
    onKeyPress: () => null,
    onKeyUp: () => null,
    onKeyDown: () => null
  });
};

// src/elements/TextFileLineElement.tsx
init_shim();
var import_react11 = __toESM(require("react"));
var import_interactive_elements11 = require("interactive-elements");
var import_material10 = require("@mui/material");
var import_react_i18next6 = require("react-i18next");
var TextFileLineRenderer = (props) => {
  const { element } = props;
  if (!(0, import_interactive_elements11.isTextFileLineElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const { line } = element;
  const text = line.text.replace(/\t/g, " \u23B5 ");
  return /* @__PURE__ */ import_react11.default.createElement(import_material10.Box, null, /* @__PURE__ */ import_react11.default.createElement(import_material10.Typography, {
    variant: "caption"
  }, /* @__PURE__ */ import_react11.default.createElement(import_react_i18next6.Trans, null, "Line:"), " ", line.line), /* @__PURE__ */ import_react11.default.createElement(import_material10.Typography, {
    sx: { fontFamily: "monospace" }
  }, text), line.columns && Object.keys(line.columns).length > 0 && /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement(import_material10.Typography, {
    variant: "caption"
  }, /* @__PURE__ */ import_react11.default.createElement(import_react_i18next6.Trans, null, "Values:")), /* @__PURE__ */ import_react11.default.createElement(ConfigView, {
    ignore: /^_/,
    config: line.columns
  })));
};

// src/elements/YesNoElement.tsx
init_shim();
var import_react12 = __toESM(require("react"));
var import_react_i18next7 = require("react-i18next");
var import_material11 = require("@mui/material");
var import_interactive_elements12 = require("interactive-elements");
var YesNoRenderer = (props) => {
  const { element } = props;
  const { t } = (0, import_react_i18next7.useTranslation)();
  const label = "label" in element ? element.label || "" : (0, import_interactive_elements12.isNamedElement)(element) ? t(`label-${element.name}`) : "";
  const [value, setValue2] = import_react12.default.useState((0, import_interactive_elements12.isNamedElement)(element) ? props.values[element.name] : null);
  if (!(0, import_interactive_elements12.isYesNoElement)(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
  }
  const yes = t("Yes");
  const no = t("No");
  return /* @__PURE__ */ import_react12.default.createElement(import_material11.FormControl, {
    component: "fieldset"
  }, /* @__PURE__ */ import_react12.default.createElement(import_material11.FormLabel, {
    component: "legend"
  }, label), /* @__PURE__ */ import_react12.default.createElement(import_material11.RadioGroup, null, /* @__PURE__ */ import_react12.default.createElement(import_material11.Grid, null, /* @__PURE__ */ import_react12.default.createElement(import_material11.FormControlLabel, {
    value: "yes",
    label: yes,
    checked: value === true,
    control: /* @__PURE__ */ import_react12.default.createElement(import_material11.Radio, null),
    onChange: () => {
      setValue2(true);
      element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: true }, props);
    }
  }), /* @__PURE__ */ import_react12.default.createElement(import_material11.FormControlLabel, {
    value: "no",
    label: no,
    checked: value === false,
    control: /* @__PURE__ */ import_react12.default.createElement(import_material11.Radio, null),
    onChange: () => {
      setValue2(false);
      element.triggerHandler && element.triggerHandler({ type: "onChange", name: element.name, value: false }, props);
    }
  }))));
};

// src/misc/index.ts
init_shim();

// src/misc/downloader.ts
init_shim();
var downloadUrl = (url, token, fileName) => {
  const headers = token ? { Authorization: "Bearer " + token } : {};
  fetch(url, {
    method: "GET",
    headers: new Headers(headers)
  }).then((response) => {
    const disposition = response.headers.get("Content-Disposition");
    if (disposition && !fileName) {
      const match = /^.*?filename="(.*)"$/.exec(disposition);
      if (match) {
        fileName = match[1];
      }
    }
    return response.blob();
  }).then((blob) => {
    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url2;
    a.target = "_blank";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
};

// src/misc/FileUploader.tsx
init_shim();
var import_react13 = __toESM(require("react"));
var import_axios = __toESM(require_axios2());
var import_base64_arraybuffer = require("base64-arraybuffer");
var import_material12 = require("@mui/material");
var import_react_i18next8 = require("react-i18next");
var import_icons_material = require("@mui/icons-material");
var FileUploader = (props) => {
  const [uploading, setUploading] = (0, import_react13.useState)(false);
  let uploads = [];
  const readFileFromInput = async (file) => {
    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const collectUploadedFile = (binary, file) => {
    uploads.push({
      name: file.name,
      type: file.type,
      encoding: "base64",
      data: (0, import_base64_arraybuffer.encode)(binary)
    });
  };
  const onUpload = async () => {
    if (props.onUpload) {
      props.onUpload(uploads);
    } else {
      if (!props.uploadUrl) {
        throw new Error("Upload URL is compulsory if no onUpload() callback defined.");
      }
      setUploading(true);
      await import_axios.default.post(props.uploadUrl, { files: uploads }).then((resp) => {
        setUploading(false);
        props.onSuccess && props.onSuccess(resp);
      }).catch((err) => {
        setUploading(false);
        if (props.onError) {
          props.onError(err);
        } else {
          console.error(err);
        }
      });
    }
  };
  const onFileChange = async (event) => {
    uploads = [];
    if (event.target.files) {
      for (const file of Array.from(event.target.files)) {
        const binary = await readFileFromInput(file).catch(function(reason) {
          console.log(`Error during upload ${reason}`);
          return null;
        });
        if (binary) {
          collectUploadedFile(binary, file);
        }
        event.target.value = "";
      }
    }
    onUpload();
  };
  const noIcon = props.icon !== void 0 && !props.icon;
  const noText = props.text !== void 0 && !props.text;
  const text = props.text || /* @__PURE__ */ import_react13.default.createElement(import_react_i18next8.Trans, null, "Upload");
  const iconSx = props.iconSize ? { width: props.iconSize, height: props.iconSize } : {};
  const icon = noIcon ? void 0 : props.icon || /* @__PURE__ */ import_react13.default.createElement(import_icons_material.UploadFile, {
    sx: iconSx
  });
  return /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement("input", {
    id: "file-uploader-input",
    disabled: !!props.disabled,
    type: "file",
    multiple: !!props.multiple,
    hidden: true,
    onChange: (e) => onFileChange(e)
  }), /* @__PURE__ */ import_react13.default.createElement("label", {
    htmlFor: "file-uploader-input"
  }, noText && /* @__PURE__ */ import_react13.default.createElement(import_material12.Button, {
    component: "span",
    disabled: uploading || !!props.disabled,
    color: props.color
  }, icon), !noText && /* @__PURE__ */ import_react13.default.createElement(import_material12.Button, {
    component: "span",
    disabled: uploading || !!props.disabled,
    startIcon: icon,
    color: props.color,
    variant: props.variant
  }, text)));
};

// src/misc/JsonEditor.tsx
init_shim();
var import_material13 = require("@mui/material");
var import_react14 = __toESM(require("react"));
var import_react_i18next9 = require("react-i18next");
var import_jsoneditor = __toESM(require("jsoneditor"));
var import_jsoneditor_min = require("jsoneditor/dist/jsoneditor.min.css");
var JsonEditor = (props) => {
  if (!props.visible) {
    return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null);
  }
  const value = props.json;
  let editor;
  const createEditor = (ref) => {
    if (editor)
      return;
    const options = {
      mode: "code",
      mainMenuBar: false,
      statusBar: true
    };
    editor = new import_jsoneditor.default(ref, options, value);
  };
  const onSave = async () => {
    try {
      const errors = await editor.validate();
      if (Object.keys(errors).length === 0) {
        const json = editor.get();
        await editor.destroy();
        props.onSave(json);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onCancel = async () => {
    await editor.destroy();
    props.onCancel();
  };
  return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Dialog, {
    fullWidth: true,
    maxWidth: "xl",
    open: props.visible,
    PaperProps: { sx: { height: "90vh" } }
  }, /* @__PURE__ */ import_react14.default.createElement(import_material13.DialogTitle, null, /* @__PURE__ */ import_react14.default.createElement(import_react_i18next9.Trans, null, props.title)), /* @__PURE__ */ import_react14.default.createElement(import_material13.DialogContent, null, /* @__PURE__ */ import_react14.default.createElement("div", {
    className: "RISPSONEditor",
    style: { height: "75vh" },
    ref: (ref) => createEditor(ref)
  })), /* @__PURE__ */ import_react14.default.createElement(import_material13.DialogActions, null, /* @__PURE__ */ import_react14.default.createElement(import_material13.Button, {
    id: "Cancel",
    variant: "outlined",
    onClick: () => onCancel()
  }, /* @__PURE__ */ import_react14.default.createElement(import_react_i18next9.Trans, null, "Cancel")), /* @__PURE__ */ import_react14.default.createElement(import_material13.Button, {
    id: "Save",
    variant: "outlined",
    onClick: () => onSave(),
    color: "primary"
  }, /* @__PURE__ */ import_react14.default.createElement(import_react_i18next9.Trans, null, "Save")))));
};

// src/misc/useAxios.ts
init_shim();
var import_react15 = require("react");
var import_axios2 = __toESM(require_axios2());
function useAxios(props) {
  const { token, url, receiver } = props;
  (0, import_react15.useEffect)(() => {
    if (url === null) {
      receiver(null);
      return;
    }
    let gone = false;
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    (0, import_axios2.default)({ method: "GET", url, headers }).then((resp) => !gone && receiver(resp.data)).catch((err) => console.error("Axios:", err));
    return () => {
      gone = true;
    };
  }, [token, url]);
}

// src/process/index.ts
init_shim();

// src/process/ConfigChangeView.tsx
init_shim();
var import_react16 = __toESM(require("react"));
var import_interactive_elements13 = require("interactive-elements");
var import_react_i18next10 = require("react-i18next");
var ConfigChangeView = (props) => {
  const { t } = (0, import_react_i18next10.useTranslation)();
  if (!props.step.directions || props.step.directions.type !== "ui") {
    return /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null);
  }
  if (!props.step.action || !props.step.action.configure) {
    return /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null);
  }
  const names = [...(0, import_interactive_elements13.elementNames)(props.step.directions.element)].sort();
  const changes = {};
  for (let name of names) {
    if (name.startsWith("configure.")) {
      name = name.substr(10);
      changes[name] = props.step.action.configure[name];
    }
  }
  return /* @__PURE__ */ import_react16.default.createElement(ConfigView, {
    ignore: /^_/,
    title: t("Configured the Following"),
    config: changes
  });
};

// src/process/ConfigJSONView.tsx
init_shim();
var import_react18 = __toESM(require("react"));
var import_material15 = require("@mui/material");
var import_react_i18next12 = require("react-i18next");

// src/process/ConfigView.tsx
init_shim();
var import_react17 = __toESM(require("react"));
var import_material14 = require("@mui/material");
var import_react_i18next11 = require("react-i18next");
var IGNORE_FIELDS = /^(answers|rules)$/;
var ConfigView = (props) => {
  const COLUMNS = props.columns || 4;
  const ignore = props.ignore || /^$/;
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const render = (obj) => {
    let keys, perColumn, idx, column;
    switch (typeof obj) {
      case "undefined":
        return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, "\u2014");
      case "object":
        if (obj === null) {
          return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, "\u2014");
        }
        if (obj instanceof Array) {
          const values = Object.values(obj);
          return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, values.map(
            (v, i) => /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, {
              key: `array${i}`
            }, render(v), i < values.length - 1 ? ", " : "")
          ));
        }
        keys = Object.keys(obj).filter((k) => !IGNORE_FIELDS.test(k) && !ignore.test(k)).sort();
        perColumn = Math.ceil(keys.length / COLUMNS);
        idx = 0;
        column = [];
        for (let c = 0; c < COLUMNS; c++) {
          const row = [];
          for (let r = 0; r < perColumn; r++) {
            if (idx < keys.length) {
              row.push(/* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, {
                key: idx
              }, /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("strong", null, capitalize(keys[idx]))), /* @__PURE__ */ import_react17.default.createElement("div", null, render(obj[keys[idx]]))));
            }
            idx++;
          }
          column.push(/* @__PURE__ */ import_react17.default.createElement(import_material14.Grid, {
            key: `column${c}`,
            item: true
          }, row));
        }
        return /* @__PURE__ */ import_react17.default.createElement(import_material14.Box, {
          sx: { flexGrow: 1 }
        }, /* @__PURE__ */ import_react17.default.createElement(import_material14.Grid, {
          container: true,
          justifyContent: "space-evenly",
          spacing: 4
        }, column));
      case "string":
        return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, obj === "" ? /* @__PURE__ */ import_react17.default.createElement("br", null) : obj);
      case "boolean":
        return obj ? /* @__PURE__ */ import_react17.default.createElement(import_react_i18next11.Trans, null, "Yes") : /* @__PURE__ */ import_react17.default.createElement(import_react_i18next11.Trans, null, "No");
      default:
        return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, JSON.stringify(obj));
    }
  };
  return /* @__PURE__ */ import_react17.default.createElement(import_react17.default.Fragment, null, props.title && /* @__PURE__ */ import_react17.default.createElement(import_material14.Typography, {
    variant: "subtitle1"
  }, /* @__PURE__ */ import_react17.default.createElement(import_react_i18next11.Trans, null, props.title)), render(props.config));
};

// src/process/ConfigJSONView.tsx
var ConfigJSONView = (props) => {
  const config = {};
  Object.keys(props.config).forEach((key) => {
    if (!IGNORE_FIELDS.test(key)) {
      config[key] = props.config[key];
    }
  });
  return /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, props.title && /* @__PURE__ */ import_react18.default.createElement(import_material15.Typography, {
    variant: "subtitle1"
  }, /* @__PURE__ */ import_react18.default.createElement(import_react_i18next12.Trans, null, props.title)), /* @__PURE__ */ import_react18.default.createElement(import_material15.Box, {
    sx: { fontFamily: "monospace" }
  }, /* @__PURE__ */ import_react18.default.createElement("pre", null, JSON.stringify(config, null, 2))));
};

// src/process/DefaultErrorView.tsx
init_shim();
var import_material16 = require("@mui/material");
var import_react19 = __toESM(require("react"));
var import_react_i18next13 = require("react-i18next");
var DefaultErrorView = (props) => {
  const { palette } = (0, import_material16.useTheme)();
  return /* @__PURE__ */ import_react19.default.createElement(import_material16.Card, {
    style: { backgroundColor: "rgba(0,0,0,0.05)" }
  }, /* @__PURE__ */ import_react19.default.createElement(import_material16.CardHeader, {
    style: { color: palette.error.main },
    title: /* @__PURE__ */ import_react19.default.createElement(import_react_i18next13.Trans, null, "Error")
  }), /* @__PURE__ */ import_react19.default.createElement(import_material16.CardContent, {
    sx: { fontFamily: "monospace" }
  }, /* @__PURE__ */ import_react19.default.createElement(import_material16.Typography, null, props.error.split("\n").map((line, idx) => /* @__PURE__ */ import_react19.default.createElement(import_react19.default.Fragment, {
    key: idx
  }, line, /* @__PURE__ */ import_react19.default.createElement("br", null))))));
};

// src/process/DefaultResultView.tsx
init_shim();
var import_react20 = __toESM(require("react"));
var DefaultResultView = (props) => {
  if (props.result === null) {
    return /* @__PURE__ */ import_react20.default.createElement(import_react20.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react20.default.createElement("pre", null, JSON.stringify(props.result, null, 2));
};

// src/process/DefaultStateView.tsx
init_shim();
var import_react21 = __toESM(require("react"));
var DefaultStateView = (props) => {
  if (props.state === null) {
    return /* @__PURE__ */ import_react21.default.createElement(import_react21.default.Fragment, null);
  }
  const ResultView = props.resultView;
  return /* @__PURE__ */ import_react21.default.createElement(import_react21.default.Fragment, null, /* @__PURE__ */ import_react21.default.createElement("pre", null, JSON.stringify(props.state, null, 2)), props.state.result && /* @__PURE__ */ import_react21.default.createElement(ResultView, {
    config: props.config,
    result: props.state.result
  }));
};

// src/process/DefaultStepView.tsx
init_shim();
var import_react23 = __toESM(require("react"));

// src/process/DefaultSummaryView.tsx
init_shim();
var import_material17 = require("@mui/material");
var import_react22 = __toESM(require("react"));
var import_react_i18next14 = require("react-i18next");
var import_icons_material2 = require("@mui/icons-material");
var DefaultSummaryView = (props) => {
  const { step } = props;
  const { t } = (0, import_react_i18next14.useTranslation)();
  const [showConfig, setShowConfig] = (0, import_react22.useState)(false);
  const started = new Date(step.started).getTime();
  const finished = new Date(step.finished).getTime();
  const UsedConfigView = props.configView || ConfigView;
  return /* @__PURE__ */ import_react22.default.createElement(import_react22.default.Fragment, null, /* @__PURE__ */ import_react22.default.createElement(import_material17.Typography, {
    variant: "body2"
  }, /* @__PURE__ */ import_react22.default.createElement(import_react22.default.Fragment, null, /* @__PURE__ */ import_react22.default.createElement(import_react_i18next14.Trans, null, /* @__PURE__ */ import_react22.default.createElement("strong", null, "Process ID")), ": ", step.processId, "\xA0", /* @__PURE__ */ import_react22.default.createElement(import_react_i18next14.Trans, null, /* @__PURE__ */ import_react22.default.createElement("strong", null, "Step")), ": ", step.number + 1, "\xA0", /* @__PURE__ */ import_react22.default.createElement(import_react_i18next14.Trans, null, /* @__PURE__ */ import_react22.default.createElement("strong", null, "Handler")), ": ", step.handler, "\xA0", /* @__PURE__ */ import_react22.default.createElement(import_react_i18next14.Trans, null, /* @__PURE__ */ import_react22.default.createElement("strong", null, "Started")), ": ", step.started, "\xA0", /* @__PURE__ */ import_react22.default.createElement(import_react_i18next14.Trans, null, /* @__PURE__ */ import_react22.default.createElement("strong", null, "Duration")), ": ", finished ? `${finished - started}ms ` : "\u2014 ", /* @__PURE__ */ import_react22.default.createElement(import_material17.ToggleButton, {
    size: "small",
    value: "showConfig",
    selected: showConfig,
    title: showConfig ? t("Hide configuration") : t("Show configuration"),
    onClick: () => setShowConfig(!showConfig)
  }, /* @__PURE__ */ import_react22.default.createElement(import_icons_material2.Settings, null)))), showConfig && /* @__PURE__ */ import_react22.default.createElement(import_material17.Card, {
    style: { marginBottom: "0.5em" }
  }, /* @__PURE__ */ import_react22.default.createElement(import_material17.CardContent, null, /* @__PURE__ */ import_react22.default.createElement(UsedConfigView, {
    title: t("Configuration"),
    config: props.process.config
  }))));
};

// src/process/DefaultStepView.tsx
var DefaultStepView = (props) => {
  const { step } = props;
  if (!step) {
    return /* @__PURE__ */ import_react23.default.createElement(import_react23.default.Fragment, null);
  }
  const SummaryView = props.summaryView || DefaultSummaryView;
  const StateView = props.stateView || DefaultStateView;
  const ResultView = props.resultView || DefaultResultView;
  const configView = props.configView || ConfigView;
  return /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement(SummaryView, {
    step,
    process: props.process,
    configView
  }), step.state && /* @__PURE__ */ import_react23.default.createElement(StateView, {
    config: props.process.config,
    state: step.state,
    resultView: ResultView
  }));
};

// src/process/DefaultSuccessView.tsx
init_shim();
var import_material18 = require("@mui/material");
var import_colors = require("@mui/material/colors");
var import_react24 = __toESM(require("react"));
var import_react_i18next15 = require("react-i18next");
var DefaultSuccessView = (props) => {
  return /* @__PURE__ */ import_react24.default.createElement(import_material18.Card, null, /* @__PURE__ */ import_react24.default.createElement(import_material18.CardContent, null, /* @__PURE__ */ import_react24.default.createElement(ProcessStatusIcon, {
    status: "SUCCEEDED"
  }), /* @__PURE__ */ import_react24.default.createElement(import_material18.Typography, {
    sx: { color: import_colors.green[900] }
  }, /* @__PURE__ */ import_react24.default.createElement(import_react_i18next15.Trans, null, "Process Was Successfully Completed!"))));
};

// src/process/ImportFile.tsx
init_shim();
var import_icons_material3 = require("@mui/icons-material");
var import_material19 = require("@mui/material");
var import_react25 = __toESM(require("react"));
var ImportLine = (props) => {
  const { segmentId, lineNumber, color, text, columns } = props;
  const ResultView = props.resultView;
  const hasColumns = Object.keys(columns).length > 0;
  const [open, setOpen] = (0, import_react25.useState)(false);
  if (text.trim() === "") {
    return /* @__PURE__ */ import_react25.default.createElement(import_react25.default.Fragment, null);
  }
  return /* @__PURE__ */ import_react25.default.createElement(import_react25.default.Fragment, null, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableRow, {
    onClick: () => setOpen(!open)
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null, lineNumber), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, {
    style: { backgroundColor: color }
  }), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null, /* @__PURE__ */ import_react25.default.createElement(import_material19.Typography, {
    sx: { fontFamily: "Monospace", overflow: "hidden", textOverflow: "hidden", fontSize: "80%" }
  }, text)), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null, hasColumns && !open && /* @__PURE__ */ import_react25.default.createElement(import_material19.IconButton, {
    size: "small",
    onClick: () => setOpen(true)
  }, /* @__PURE__ */ import_react25.default.createElement(import_icons_material3.ExpandMore, null)), hasColumns && open && /* @__PURE__ */ import_react25.default.createElement(import_material19.IconButton, {
    size: "small",
    onClick: () => setOpen(false)
  }, /* @__PURE__ */ import_react25.default.createElement(import_icons_material3.ExpandLess, null)))), open && hasColumns && /* @__PURE__ */ import_react25.default.createElement(import_material19.TableRow, null, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null, segmentId && /* @__PURE__ */ import_react25.default.createElement(import_material19.Link, {
    href: `#segment-${segmentId}`
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.Typography, {
    style: { color: "white", backgroundColor: color }
  }, "Segment ID: ", segmentId)), /* @__PURE__ */ import_react25.default.createElement(ConfigView, {
    ignore: /^_/,
    config: columns
  })), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null)), props.result && /* @__PURE__ */ import_react25.default.createElement(import_material19.TableRow, null, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, {
    id: props.result ? `segment-${segmentId}` : void 0
  }, /* @__PURE__ */ import_react25.default.createElement(ResultView, {
    config: props.config,
    result: props.result
  })), /* @__PURE__ */ import_react25.default.createElement(import_material19.TableCell, null)));
};
var ImportFile = (props) => {
  const [expanded, setExpanded] = import_react25.default.useState(false);
  const { palette } = (0, import_material19.useTheme)();
  const colors = [
    palette.primary.dark,
    palette.secondary.light,
    palette.primary.main,
    palette.secondary.dark,
    palette.primary.light,
    palette.secondary.main
  ];
  const segmentIds = /* @__PURE__ */ new Set();
  const segementNumbers = {};
  return /* @__PURE__ */ import_react25.default.createElement(import_material19.Accordion, {
    expanded,
    onChange: () => setExpanded(!expanded),
    TransitionProps: { timeout: 50 }
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.AccordionSummary, {
    expandIcon: /* @__PURE__ */ import_react25.default.createElement(import_icons_material3.ExpandMore, null),
    id: `File ${props.name}`
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.Typography, {
    variant: "subtitle1"
  }, /* @__PURE__ */ import_react25.default.createElement("strong", null, props.name))), /* @__PURE__ */ import_react25.default.createElement(import_material19.AccordionDetails, null, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableContainer, {
    component: import_material19.Paper,
    sx: { width: "60vw" }
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.Table, {
    size: "small"
  }, /* @__PURE__ */ import_react25.default.createElement(import_material19.TableBody, null, props.lines.map((line, idx) => {
    let color;
    if (line.segmentId) {
      if (segementNumbers[line.segmentId] === void 0) {
        segementNumbers[line.segmentId] = segmentIds.size;
        segmentIds.add(line.segmentId);
      }
      color = colors[segementNumbers[line.segmentId] % colors.length];
    }
    const isLast = idx === props.lines.length - 1 || line.segmentId !== props.lines[idx + 1].segmentId;
    return /* @__PURE__ */ import_react25.default.createElement(ImportLine, {
      key: line.line,
      config: props.config,
      segmentId: line.segmentId,
      result: isLast && line.segmentId && props.result ? props.result[line.segmentId] : void 0,
      resultView: props.resultView,
      lineNumber: line.line + 1,
      columns: line.columns,
      color,
      text: line.text
    });
  }))))));
};

// src/process/ImportStateView.tsx
init_shim();
var import_react26 = __toESM(require("react"));
var import_interactive_elements14 = require("interactive-elements");
var ImportStateView = (props) => {
  if (props.state === null) {
    return /* @__PURE__ */ import_react26.default.createElement(import_react26.default.Fragment, null);
  }
  if (!(0, import_interactive_elements14.isImportState)(props.state)) {
    return /* @__PURE__ */ import_react26.default.createElement(import_react26.default.Fragment, null);
  }
  const state = props.state;
  const result = state.result ? state.result : void 0;
  return /* @__PURE__ */ import_react26.default.createElement("div", null, Object.entries(state.files).map(([name, file]) => /* @__PURE__ */ import_react26.default.createElement(ImportFile, {
    key: name,
    name,
    config: props.config,
    resultView: props.resultView,
    result,
    lines: file.lines
  })));
};

// src/process/ProcessList.tsx
init_shim();
var import_material21 = require("@mui/material");
var import_react28 = __toESM(require("react"));
var import_react_i18next16 = require("react-i18next");

// src/process/ProcessStatusIcon.tsx
init_shim();
var import_react27 = __toESM(require("react"));
var import_icons_material4 = require("@mui/icons-material");
var import_material20 = require("@mui/material");
var import_colors2 = require("@mui/material/colors");
var ProcessStatusIcon = (props) => {
  const colors = {
    red: import_colors2.red[700],
    blue: import_colors2.blue[900],
    green: import_colors2.green[800]
  };
  switch (props.status) {
    case "FAILED":
      return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
        title: props.status,
        style: { color: colors.red }
      }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.ErrorOutline, null));
    case "WAITING":
      return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
        title: props.status,
        style: { color: colors.blue }
      }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.Timer, null));
    case "SUCCEEDED":
      return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
        title: props.status,
        style: { color: colors.green }
      }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.CheckCircleOutline, null));
    case "CRASHED":
      return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
        title: props.status,
        style: { color: colors.red }
      }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.Warning, null));
    case "INCOMPLETE":
      return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
        title: props.status,
        style: { color: colors.blue }
      }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.HourglassEmpty, null));
  }
  return /* @__PURE__ */ import_react27.default.createElement(import_material20.Typography, {
    title: props.status,
    style: { color: colors.red }
  }, /* @__PURE__ */ import_react27.default.createElement(import_icons_material4.Help, null));
};

// src/process/ProcessList.tsx
var ProcessList = (props) => {
  const [processes, setProcesses] = (0, import_react28.useState)([]);
  useAxios({ url: `${props.api}`, token: props.token, receiver: setProcesses });
  return /* @__PURE__ */ import_react28.default.createElement(import_material21.TableContainer, null, /* @__PURE__ */ import_react28.default.createElement(import_material21.Table, {
    className: "ProcessTable",
    size: "small"
  }, /* @__PURE__ */ import_react28.default.createElement(import_material21.TableHead, null, /* @__PURE__ */ import_react28.default.createElement(import_material21.TableRow, null, /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, {
    variant: "head",
    align: "left"
  }, /* @__PURE__ */ import_react28.default.createElement(import_react_i18next16.Trans, null, "#")), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, {
    variant: "head",
    align: "left"
  }, /* @__PURE__ */ import_react28.default.createElement(import_react_i18next16.Trans, null, "Date")), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, {
    variant: "head",
    align: "left"
  }, /* @__PURE__ */ import_react28.default.createElement(import_react_i18next16.Trans, null, "Process Name")), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, {
    variant: "head",
    align: "left"
  }, /* @__PURE__ */ import_react28.default.createElement(import_react_i18next16.Trans, null, "Status")))), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableBody, null, processes.map((process2) => /* @__PURE__ */ import_react28.default.createElement(import_material21.TableRow, {
    key: process2.id,
    onClick: () => {
      props.onClick && props.onClick(process2.id);
    }
  }, /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, null, process2.id), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, null, `${process2.created}`), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, null, process2.name), /* @__PURE__ */ import_react28.default.createElement(import_material21.TableCell, null, /* @__PURE__ */ import_react28.default.createElement(ProcessStatusIcon, {
    status: process2.status
  })))))));
};

// src/process/ProcessView.tsx
init_shim();
var import_material23 = require("@mui/material");
var import_react30 = __toESM(require("react"));
var import_react_i18next17 = require("react-i18next");
var import_interactive_elements15 = require("interactive-elements");
var import_icons_material5 = require("@mui/icons-material");

// src/process/StepList.tsx
init_shim();
var import_material22 = require("@mui/material");
var import_react29 = __toESM(require("react"));
var StepList = (props) => {
  return /* @__PURE__ */ import_react29.default.createElement(import_material22.Stepper, {
    activeStep: props.currentStep || 0
  }, props.operations.map((label, idx) => /* @__PURE__ */ import_react29.default.createElement(import_material22.Step, {
    key: idx
  }, /* @__PURE__ */ import_react29.default.createElement(import_material22.StepLabel, {
    onClick: () => props.onChangeStep(idx)
  }, label))));
};

// src/process/ProcessView.tsx
var actionStepLabel = (action) => {
  if (action === null) {
    return "";
  }
  if ((0, import_interactive_elements15.isImportOpAction)(action)) {
    return action.op;
  }
  if ((0, import_interactive_elements15.isImportConfigureAction)(action)) {
    return "configuring";
  }
  if ((0, import_interactive_elements15.isImportAnswerAction)(action)) {
    return "answer";
  }
  return JSON.stringify(action);
};
var ProcessView = (props) => {
  const { summaryView, stateView, resultView, configView } = props;
  const theme = (0, import_material23.useTheme)();
  const { t } = (0, import_react_i18next17.useTranslation)();
  const [process2, setProcess] = (0, import_react30.useState)(null);
  const [step, setStep] = (0, import_react30.useState)(null);
  let currentStep;
  if (props.step !== void 0 && props.step !== null) {
    currentStep = props.step;
  }
  if (process2 && (currentStep === null || currentStep === void 0)) {
    currentStep = process2.currentStep !== void 0 ? process2.currentStep : 0;
  }
  useAxios({
    url: `${props.api}/${props.id}${currentStep !== void 0 ? `?step=${currentStep}` : ""}`,
    token: props.token,
    receiver: setProcess
  });
  useAxios({
    url: currentStep === void 0 ? null : `${props.api}/${props.id}/step/${currentStep}`,
    token: props.token,
    receiver: setStep
  });
  if (!process2)
    return /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null);
  const canChangeStep = process2.currentStep !== void 0 && process2.currentStep !== null && process2.steps && process2.steps.length > 1;
  const hasSteps = process2.currentStep !== void 0 && process2.steps.length > 0;
  const lastStep = currentStep !== void 0 && process2.steps.length > 0 && currentStep === process2.steps.length - 1;
  const directions = currentStep !== void 0 && process2.steps[currentStep] ? process2.steps[currentStep].directions || {} : {};
  const needAnswers = hasSteps && process2.status === "WAITING" && !process2.error && currentStep === process2.steps.length - 1 && directions.type === "ui";
  const wasConfigured = currentStep !== void 0 && currentStep > 0 && process2.steps[currentStep - 1] && process2.steps[currentStep - 1].directions && directions.type === "ui";
  const onChangeStep = (n) => {
    props.onChangeStep && props.onChangeStep(n);
  };
  const onBack = () => {
    props.onBack && props.onBack();
  };
  const onActionSuccess = (result, trigger, actionProps) => {
    if (props.onActionSuccess) {
      props.onActionSuccess(result, trigger, actionProps);
    }
  };
  const StepView = props.stepView || DefaultStepView;
  const ErrorView = props.errorView || DefaultErrorView;
  const SuccessView = props.successView || DefaultSuccessView;
  const operations = ["start"].concat(
    process2.steps.filter((step2) => step2.action).map((step2) => actionStepLabel(step2.action))
  ).map((label) => t(`step-${label}`));
  const values = {};
  Object.keys(process2.config).forEach((key) => {
    values[`configure.${key}`] = process2.config[key];
  });
  return /* @__PURE__ */ import_react30.default.createElement(import_material23.TableContainer, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.Table, {
    className: "ProcessTable",
    size: "small"
  }, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableHead, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableRow, {
    style: { backgroundColor: theme.palette.secondary.main }
  }, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    variant: "head",
    style: { color: theme.palette.secondary.contrastText }
  }, /* @__PURE__ */ import_react30.default.createElement(import_material23.IconButton, {
    onClick: () => onBack()
  }, /* @__PURE__ */ import_react30.default.createElement(import_icons_material5.ArrowBackOutlined, {
    style: { color: theme.palette.secondary.contrastText }
  })), "# ", process2.id), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    variant: "head",
    style: { color: theme.palette.secondary.contrastText },
    align: "left"
  }), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    variant: "head",
    style: { color: theme.palette.secondary.contrastText },
    align: "left"
  }, `${process2.created}`), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    variant: "head",
    style: { color: theme.palette.secondary.contrastText },
    align: "left"
  }, process2.name), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    variant: "head",
    style: { backgroundColor: "white" },
    align: "right"
  }, /* @__PURE__ */ import_react30.default.createElement(ProcessStatusIcon, {
    status: process2.status
  })))), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableBody, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableRow, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    colSpan: 2
  }, /* @__PURE__ */ import_react30.default.createElement(import_material23.Typography, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.Fab, {
    disabled: !canChangeStep || currentStep === 0,
    color: "secondary",
    "aria-label": "previous",
    onClick: () => onChangeStep(currentStep !== void 0 ? currentStep - 1 : 0)
  }, /* @__PURE__ */ import_react30.default.createElement(import_icons_material5.NavigateBefore, null)), /* @__PURE__ */ import_react30.default.createElement(import_material23.Fab, {
    disabled: true,
    style: { fontSize: "140%", color: "black", fontWeight: "bold" }
  }, canChangeStep ? (currentStep || 0) + 1 : /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null, "\u2014")), /* @__PURE__ */ import_react30.default.createElement(import_material23.Fab, {
    disabled: !canChangeStep || currentStep === process2.steps.length - 1,
    color: "secondary",
    "aria-label": "next",
    onClick: () => onChangeStep(currentStep !== void 0 ? currentStep + 1 : 0)
  }, /* @__PURE__ */ import_react30.default.createElement(import_icons_material5.NavigateNext, null)))), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    colSpan: 3
  }, /* @__PURE__ */ import_react30.default.createElement(StepList, {
    onChangeStep: (step2) => onChangeStep(step2),
    operations,
    currentStep: currentStep || 0
  }))), /* @__PURE__ */ import_react30.default.createElement(import_material23.TableRow, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    colSpan: 5,
    align: "left",
    style: { verticalAlign: "top" }
  }, lastStep && process2.status === "SUCCEEDED" && step !== null && /* @__PURE__ */ import_react30.default.createElement(SuccessView, {
    step,
    process: process2
  }), lastStep && process2.error && /* @__PURE__ */ import_react30.default.createElement(ErrorView, {
    error: process2.error
  }), wasConfigured && /* @__PURE__ */ import_react30.default.createElement(ConfigChangeView, {
    step: process2.steps[(currentStep || 0) - 1]
  }), needAnswers && /* @__PURE__ */ import_react30.default.createElement(import_react30.default.Fragment, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.Typography, {
    variant: "subtitle1"
  }, /* @__PURE__ */ import_react30.default.createElement(import_react_i18next17.Trans, null, "Additional information needed")), /* @__PURE__ */ import_react30.default.createElement(RISP, {
    key: "directions",
    element: directions.element,
    values,
    setup: props.setup || { baseUrl: `${props.api}/${process2.id}` },
    onActionSuccess
  })))), hasSteps && /* @__PURE__ */ import_react30.default.createElement(import_material23.TableRow, null, /* @__PURE__ */ import_react30.default.createElement(import_material23.TableCell, {
    colSpan: 5,
    align: "left"
  }, /* @__PURE__ */ import_react30.default.createElement(StepView, {
    api: `${props.api}/${props.id}/step`,
    token: props.token,
    step,
    process: process2,
    summaryView,
    stateView,
    resultView,
    configView
  }))))));
};

// src/risp/index.ts
init_shim();

// src/risp/ActionEngine.ts
init_shim();
var import_mobx = require("mobx");
var import_interactive_elements16 = require("interactive-elements");
var import_axios3 = __toESM(require_axios2());
var import_set_value = __toESM(require("set-value"));
var import_get_value = __toESM(require("get-value"));
_global.ActionEngineHandlers = {};
var ActionEngine = class {
  static register(name, handler) {
    const old = ActionEngineHandlers[name] || null;
    ActionEngineHandlers[name] = handler;
    return old;
  }
  static async fail(message) {
    return {
      success: false,
      message
    };
  }
  static async success(result) {
    return {
      success: true,
      result
    };
  }
  static async handle(action, props) {
    if (!action) {
      throw new Error("Action engine called without action.");
    }
    const runAction = async (action2, props2) => {
      if (!ActionEngineHandlers[action2.type]) {
        throw new Error(`There is no action handler for action '${JSON.stringify(action2)}'.`);
      }
      let ret;
      await (0, import_mobx.runInAction)(async () => {
        ret = await ActionEngineHandlers[action2.type](action2, props2);
      });
      return ret;
    };
    if (Array.isArray(action)) {
      const messages = [];
      const results = [];
      for (let i = 0; i < action.length; i++) {
        const result = await runAction(action[i], props);
        if (result.success) {
          results.push(result.result);
        } else {
          messages.push(result.message);
        }
      }
      return messages.length ? { success: false, message: messages.join("\n") } : { success: true, result: results };
    } else {
      return runAction(action, props);
    }
  }
};
var debugActionHandler = async (action, props) => {
  const { element, values } = props;
  if ((0, import_interactive_elements16.isActiveElement)(element)) {
    console.log("Action:", action);
    console.log("Element:", element);
    console.log("Values:", values);
  }
  return { success: true, result: void 0 };
};
async function axiosRequst(method, action, props) {
  const { element, setup, values } = props;
  if ((0, import_interactive_elements16.isActiveElement)(element)) {
    if (!setup.baseUrl) {
      throw new Error(`Cannot use ${method} action when setup does not define 'baseUrl'.`);
    }
    const { objectWrapLevel } = action;
    let requestValues;
    if (objectWrapLevel) {
      requestValues = {};
      Object.keys(values).forEach((k) => {
        const v = values[k];
        const parts = k.split(".");
        let k1, k2;
        if (parts.length === 1) {
          requestValues[k] = v;
          return;
        } else if (objectWrapLevel >= parts.length) {
          k1 = parts.slice(0, parts.length - 1).join(".");
          k2 = parts[parts.length - 1];
        } else {
          k1 = parts.slice(0, objectWrapLevel).join(".");
          k2 = parts.slice(objectWrapLevel).join(".");
        }
        const old = (0, import_get_value.default)(requestValues, k1) || {};
        old[k2] = v;
        (0, import_set_value.default)(requestValues, k1, old);
      });
    } else {
      requestValues = values;
    }
    const url = `${setup.baseUrl.replace(/\/$/, "")}/${action.url.replace(/^\//, "")}`;
    const call = {
      method,
      url,
      data: requestValues,
      headers: {}
    };
    if (setup.token) {
      call.headers = {
        Authorization: `Bearer ${setup.token}`
      };
    }
    let error;
    const result = await (0, import_axios3.default)(call).catch((err) => error = err);
    if (error) {
      if (setup.errorMessage && action.errorMessage) {
        setup.errorMessage(action.errorMessage);
      }
      return { success: false, message: `PATCH ${url} failed: ${error}.` };
    } else {
      if (setup.successMessage && action.successMessage) {
        setup.successMessage(action.successMessage);
      }
      return { success: true, result: result.data };
    }
  }
  return { success: true, result: void 0 };
}
var patchActionHandler = async (action, props) => {
  return axiosRequst("PATCH", action, props);
};
var postActionHandler = async (action, props) => {
  return axiosRequst("POST", action, props);
};

// src/risp/RISP.tsx
init_shim();
var import_react32 = __toESM(require("react"));
var import_mobx_react = require("mobx-react");

// src/risp/RenderingEngine.tsx
init_shim();
var import_react31 = __toESM(require("react"));
var import_material24 = require("@mui/material");
_global.RenderingEngineRenderers = {};
var RenderingEngine = class {
  static register(name, renderer) {
    const old = RenderingEngineRenderers[name] || null;
    RenderingEngineRenderers[name] = renderer;
    return old;
  }
  static render(props) {
    const { element } = props;
    if (!RenderingEngineRenderers[element.type]) {
      console.error(`There is no registered renderer for type '${element.type}'.`);
      return /* @__PURE__ */ import_react31.default.createElement(import_material24.Typography, {
        color: "error"
      }, JSON.stringify(element));
    }
    return RenderingEngineRenderers[element.type](props);
  }
};

// src/risp/RISP.tsx
var import_interactive_elements17 = require("interactive-elements");
var import_mobx2 = require("mobx");
var RISP = (0, import_mobx_react.observer)((rispProps) => {
  const { values, element } = rispProps;
  const prepare = (element2) => {
    if ((0, import_interactive_elements17.isNamedElement)(element2)) {
      if (values[element2.name] === void 0 && element2.defaultValue !== void 0) {
        values[element2.name] = element2.defaultValue;
      }
    }
    element2.triggerHandler = async (trigger, props) => {
      if ((0, import_interactive_elements17.isNamedElement)(element2) && "value" in trigger) {
        (0, import_mobx2.runInAction)(() => props.values[element2.name] = trigger.value);
      }
      if ((0, import_interactive_elements17.isActiveElement)(element2) && element2.actions[trigger.type]) {
        const result = await ActionEngine.handle(element2.actions[trigger.type], props);
        if (result.success && rispProps.onActionSuccess) {
          rispProps.onActionSuccess(result.result, trigger.type, props);
        }
        return result;
      }
      return ActionEngine.success(void 0);
    };
    if ((0, import_interactive_elements17.isContainerElement)(element2)) {
      for (const e of element2.elements) {
        prepare(e);
      }
    }
    if ((0, import_interactive_elements17.isCaseElement)(element2)) {
      for (const e of Object.values(element2.cases)) {
        prepare(e);
      }
    }
  };
  prepare(element);
  const ret = RenderingEngine.render(rispProps);
  if (ret === null) {
    return /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null);
  }
  return ret;
});

// src/risp/RISPProvider.tsx
init_shim();
var onBlurHook;
var onFocusHook;
var RISPProvider = (props) => {
  const { onBlur, onFocus, children } = props;
  onBlurHook = onBlur;
  onFocusHook = onFocus;
  RenderingEngine.register("boolean", BooleanRenderer);
  RenderingEngine.register("box", BoxRenderer);
  RenderingEngine.register("button", ButtonRenderer);
  RenderingEngine.register("case", CaseRenderer);
  RenderingEngine.register("flat", FlatRenderer);
  RenderingEngine.register("html", HtmlRenderer);
  RenderingEngine.register("message", MessageRenderer);
  RenderingEngine.register("number", NumberRenderer);
  RenderingEngine.register("radio", RadioRenderer);
  RenderingEngine.register("text", TextRenderer);
  RenderingEngine.register("textFileLine", TextFileLineRenderer);
  RenderingEngine.register("yesno", YesNoRenderer);
  ActionEngine.register("debug", debugActionHandler);
  ActionEngine.register("patch", patchActionHandler);
  ActionEngine.register("post", postActionHandler);
  if (props.onInit) {
    props.onInit();
  }
  return children;
};
RISPProvider.onBlur = () => {
  if (onBlurHook)
    onBlurHook();
};
RISPProvider.onFocus = () => {
  if (onFocusHook)
    onFocusHook();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionEngine,
  BooleanRenderer,
  BoxRenderer,
  ButtonRenderer,
  CaseRenderer,
  ConfigChangeView,
  ConfigJSONView,
  ConfigView,
  DefaultErrorView,
  DefaultResultView,
  DefaultStateView,
  DefaultStepView,
  DefaultSuccessView,
  DefaultSummaryView,
  FileUploader,
  FlatRenderer,
  HtmlRenderer,
  IGNORE_FIELDS,
  ImportFile,
  ImportLine,
  ImportStateView,
  JsonEditor,
  MessageRenderer,
  NumberRenderer,
  ProcessList,
  ProcessStatusIcon,
  ProcessView,
  RISP,
  RISPProvider,
  RadioRenderer,
  RenderingEngine,
  StepList,
  TextFileLineRenderer,
  TextRenderer,
  YesNoRenderer,
  debugActionHandler,
  downloadUrl,
  patchActionHandler,
  postActionHandler,
  useAxios
});
