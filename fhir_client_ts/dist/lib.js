"use strict";
// This is the shared static library, meaning that it is simple collection of
// pure functions. It is important for these function to not have side effects
// so that the file behaves well with tree-shaking (and is fully testable).
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * Walks through an object (or array) and returns the value found at the
 * provided path. This function is very simple so it intentionally does not
 * support any argument polymorphism, meaning that the path can only be a
 * dot-separated string. If the path is invalid returns undefined.
 * @param {Object} obj The object (or Array) to walk through
 * @param {String} path The path (eg. "a.b.4.c")
 * @returns {*} Whatever is found in the path or undefined
 */
function getPath(obj, path) {
    if (path === void 0) { path = ""; }
    path = path.trim();
    if (!path) {
        return obj;
    }
    return path.split(".").reduce(function (out, key) { return out ? out[key] : undefined; }, obj);
}
exports.getPath = getPath;
/**
 * Get the value of the given `p` url parameter. If the parameter is used
 * multiple times the first value will be returned, unless `forceArray` is true
 * (then you get an array of values). If the parameter is not present, `null`
 * will be returned.
 * @param p The name of the parameter
 * @param options optional, default {}
 * @param options.location The base location object (defaults to the global location)
 * @param options.forceArray If true, return an array if the param is used multiple times
 */
function urlParam(p, options) {
    if (options === void 0) { options = { location: location }; }
    var loc = options.location;
    var query = loc.search.substr(1);
    var data = query.split("&");
    var result = [];
    data.forEach(function (pair) {
        var _a = pair.split("="), name = _a[0], value = _a[1];
        if (name === p) {
            result.push(decodeURIComponent(value.replace(/\+/g, "%20")));
        }
    });
    if (options.forceArray) {
        return result;
    }
    if (result.length === 0) {
        return null;
    }
    return result[0];
}
exports.urlParam = urlParam;
/**
 * If the argument string ends with a slash - remove it.
 * @param str The string to trim
 */
function stripTrailingSlash(str) {
    return String(str || "").replace(/\/+$/, "");
}
exports.stripTrailingSlash = stripTrailingSlash;
/**
 * Converts relative URL to absolute based on the given location
 * @param url The URL to convert
 * @param location The base location object
 */
function urlToAbsolute(url, doc) {
    if (doc === void 0) { doc = document; }
    var a = doc.createElement("a");
    a.setAttribute("href", url);
    return a.href;
}
exports.urlToAbsolute = urlToAbsolute;
/**
 * This is similar to the `urlToAbsolute` function but you can pass the domain
 * serverUrl. It is used to convert relative URIs to absolute ones.
 * @param path The path to convert to absolute. If it begins with "http" or
 * "urn", it will be returned as is.
 * @param serverUrl The base URL of the resulting url. If empty, the current
 * document URL will be used. Defaults to "".
 */
function resolve(path, serverUrl) {
    if (serverUrl === void 0) { serverUrl = ""; }
    if (path.match(/^(http|urn)/))
        return path;
    if (!serverUrl)
        return urlToAbsolute(path);
    return [
        serverUrl.replace(/\/$\s*/, ""),
        path.replace(/^\s*\//, "")
    ].join("/");
}
exports.resolve = resolve;
/**
 * Generates random strings. By default this returns random 8 characters long
 * alphanumeric strings.
 * @param strLength The length of the output string. Defaults to 8.
 * @param charSet A string containing all the possible characters. Defaults to
 * all the upper and lower-case letters plus digits.
 */
function randomString(strLength, charSet) {
    if (strLength === void 0) { strLength = 8; }
    if (charSet === void 0) { charSet = null; }
    var result = [];
    charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789";
    var len = charSet.length;
    while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * len)));
    }
    return result.join("");
}
exports.randomString = randomString;
/**
 * Used in fetch Promise chains to reject if the "ok" property is not true
 */
function checkResponse(resp) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!resp.ok) return [3 /*break*/, 2];
                    return [4 /*yield*/, humanizeError(resp)];
                case 1: throw (_a.sent());
                case 2: return [2 /*return*/, resp];
            }
        });
    });
}
exports.checkResponse = checkResponse;
/**
 * Used in fetch Promise chains to return the JSON bersion of the response
 */
function responseToJSON(resp) {
    return resp.json();
}
exports.responseToJSON = responseToJSON;
function fetchJSON(url, options) {
    return fetch(url, options).then(checkResponse).then(responseToJSON);
}
exports.fetchJSON = fetchJSON;
function humanizeError(resp) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var msg, json, _1, text, _2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = resp.status + " " + resp.statusText;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, resp.json()];
                case 2:
                    json = _a.sent();
                    if (json.error) {
                        msg += "\n" + json.error;
                        if (json.error_description) {
                            msg += ": " + json.error_description;
                        }
                    }
                    else {
                        msg += "\n" + json;
                    }
                    return [3 /*break*/, 8];
                case 3:
                    _1 = _a.sent();
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, resp.text()];
                case 5:
                    text = _a.sent();
                    if (text) {
                        msg += "\n" + text;
                    }
                    return [3 /*break*/, 7];
                case 6:
                    _2 = _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 8];
                case 8: 
                // msg += "\nURL: " + resp.url;
                throw new Error(msg);
            }
        });
    });
}
exports.humanizeError = humanizeError;
// $lab:coverage:off$
function debug() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (sessionStorage.debug) {
        console.log.apply(console, args);
    }
}
exports.debug = debug;
// $lab:coverage:on$
//# sourceMappingURL=lib.js.map