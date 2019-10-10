"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function urlParam(p, forceArray) {
    if (forceArray === void 0) { forceArray = false; }
    var query = location.search.substr(1);
    var data = query.split("&");
    var result = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var pair = data_1[_i];
        var _a = pair.split("="), name_1 = _a[0], value = _a[1];
        if (name_1 === p) {
            result.push(decodeURIComponent(value.replace(/\+/g, "%20")));
        }
    }
    if (forceArray) {
        return result;
    }
    if (result.length === 0) {
        return null;
    }
    return result[0];
}
exports.urlParam = urlParam;
function stripTrailingSlash(str) {
    if (str.substr(-1) === "/") {
        return str.substr(0, str.length - 1);
    }
    return str;
}
exports.stripTrailingSlash = stripTrailingSlash;
function relative(url) {
    return (location.protocol + "//" + location.host + location.pathname).match(/(.*\/)[^\/]*/)[1] + url;
}
exports.relative = relative;
function byCodes(observations, property) {
    var bank = byCode(observations, property);
    function byCodes() {
        var ret = [];
        for (var i = 0; i < arguments.length; i++) {
            var set = bank[arguments[i]];
            if (set) {
                [].push.apply(ret, set);
            }
        }
        return ret;
    }
    return byCodes;
}
exports.byCodes = byCodes;
function byCode(observations, property) {
    var ret = {};
    if (!Array.isArray(observations)) {
        observations = [observations];
    }
    observations.forEach(function (o) {
        if (o.resourceType === "Observation") {
            if (o[property] && Array.isArray(o[property].coding)) {
                o[property].coding.forEach(function (coding) {
                    ret[coding.code] = ret[coding.code] || [];
                    ret[coding.code].push(o);
                });
            }
        }
    });
    return ret;
}
exports.byCode = byCode;
function ensureNumerical(pq) {
    if (typeof pq.value !== "number") {
        throw new Error("Found a non-numerical unit: " + pq.value + " " + pq.code);
    }
}
exports.units = {
    cm: function (pq) {
        ensureNumerical(pq);
        if (pq.code == "cm") {
            return pq.value;
        }
        if (pq.code == "m") {
            return 100 * pq.value;
        }
        if (pq.code == "in") {
            return 2.54 * pq.value;
        }
        if (pq.code == "[in_us]") {
            return 2.54 * pq.value;
        }
        if (pq.code == "[in_i]") {
            return 2.54 * pq.value;
        }
        if (pq.code == "ft") {
            return 30.48 * pq.value;
        }
        if (pq.code == "[ft_us]") {
            return 30.48 * pq.value;
        }
        throw new Error("Unrecognized length unit: " + pq.code);
    },
    kg: function (pq) {
        ensureNumerical(pq);
        if (pq.code == "kg") {
            return pq.value;
        }
        if (pq.code == "g") {
            return pq.value / 1000;
        }
        if (pq.code.match(/lb/)) {
            return pq.value / 2.20462;
        }
        if (pq.code.match(/oz/)) {
            return pq.value / 35.274;
        }
        throw new Error("Unrecognized weight unit: " + pq.code);
    },
    any: function (pq) {
        ensureNumerical(pq);
        return pq.value;
    }
};
//# sourceMappingURL=utils.js.map