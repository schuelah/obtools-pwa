"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lib_1 = require("./lib");
var KEY = "smartId";
function key() {
    return sessionStorage.getItem(KEY);
}
function getState() {
    var smartId = key();
    if (!smartId) {
        console.warn("sessionStorage[\"" + KEY + "\"] is missing or empty");
        return null;
    }
    var cached = sessionStorage.getItem(smartId);
    if (!cached) {
        console.warn("No state found by the given id (" + smartId + ")");
        return null;
    }
    try {
        return JSON.parse(cached);
    }
    catch (_) {
        console.warn("Corrupt state: sessionStorage['" + KEY + "'] cannot be parsed as JSON.");
        return null;
    }
}
exports.default = {
    key: function () { return key(); },
    get: function (path) {
        if (path === void 0) { path = ""; }
        var state = getState();
        if (path) {
            return lib_1.getPath(state || {}, path);
        }
        return state;
    },
    set: function (data) {
        sessionStorage.setItem(key(), JSON.stringify(data));
    },
    extend: function (data) {
        var state = getState() || {};
        sessionStorage.setItem(key(), JSON.stringify(tslib_1.__assign({}, state, data)));
    },
    clear: function () {
        sessionStorage.removeItem(key());
    }
};
//# sourceMappingURL=Storage.js.map