"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Client_1 = require("./Client");
var Storage_1 = require("./Storage");
var lib_1 = require("./lib");
function fetchConformanceStatement(baseUrl) {
    if (baseUrl === void 0) { baseUrl = "/"; }
    var url = String(baseUrl).replace(/\/*$/, "/") + "metadata";
    return lib_1.fetchJSON(url).catch(function (ex) {
        lib_1.debug(ex);
        throw new Error("Failed to fetch the conformance statement from \"" + url + "\". " + ex);
    });
}
exports.fetchConformanceStatement = fetchConformanceStatement;
function fetchWellKnownJson(baseUrl) {
    if (baseUrl === void 0) { baseUrl = "/"; }
    var url = String(baseUrl).replace(/\/*$/, "/") + ".well-known/smart-configuration";
    return lib_1.fetchJSON(url).catch(function (ex) {
        lib_1.debug(ex);
        throw new Error("Failed to fetch the well-known json \"" + url + "\". " + ex.message);
    });
}
exports.fetchWellKnownJson = fetchWellKnownJson;
/**
 * Given a fhir server returns an object with it's Oauth security endpoints that
 * we are interested in
 * @param baseUrl Fhir server base URL
 */
function getSecurityExtensions(baseUrl) {
    if (baseUrl === void 0) { baseUrl = "/"; }
    return fetchWellKnownJson(baseUrl).then(function (meta) { return ({
        registrationUri: meta.registration_endpoint || "",
        authorizeUri: meta.authorization_endpoint || "",
        tokenUri: meta.token_endpoint || ""
    }); }, function () { return fetchConformanceStatement(baseUrl).then(function (metadata) {
        var nsUri = "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris";
        var extensions = (lib_1.getPath(metadata || {}, "rest.0.security.extension") || [])
            .filter(function (e) { return e.url === nsUri; })
            .map(function (o) { return o.extension; })[0];
        var out = {
            registrationUri: "",
            authorizeUri: "",
            tokenUri: ""
        };
        if (extensions) {
            extensions.forEach(function (ext) {
                if (ext.url === "register") {
                    out.registrationUri = ext.valueUri;
                }
                if (ext.url === "authorize") {
                    out.authorizeUri = ext.valueUri;
                }
                if (ext.url === "token") {
                    out.tokenUri = ext.valueUri;
                }
            });
        }
        return out;
    }); });
}
exports.getSecurityExtensions = getSecurityExtensions;
/**
 * Calls the buildAuthorizeUrl function to construct the redirect URL and then
 * just redirects to it. Note that the returned promise will either be rejected
 * in case of error, or it will never be resolved because the page wil redirect.
 */
function authorize(options, loc) {
    if (options === void 0) { options = {}; }
    if (loc === void 0) { loc = location; }
    return buildAuthorizeUrl(options, loc).then(function (redirect) {
        try {
            loc.href = redirect;
        }
        catch (ex) {
            throw new Error("Unable to redirect to " + redirect + ". " + ex);
        }
        return redirect;
    });
}
exports.authorize = authorize;
/**
 * First discovers the fhir server base URL from query.iis or query.fhirServiceUrl
 * or options.serverUrl. Then compiles the proper authorization URL for that server.
 * For open servers that URL is the options.redirectUri so that we can skip the
 * authorization part.
 *
 * The following flows are possible:
 * 1. EHR Launch        - pass "iss" and "launch" URL params
 * 2. Standalone Launch - pass "serverUrl" as option
 * 3. Test Launch       - pass "serverUrl" as URL param (takes precedence over #2)
 */
function buildAuthorizeUrl(options, loc) {
    if (options === void 0) { options = {}; }
    if (loc === void 0) { loc = location; }
    var iss = lib_1.urlParam("iss", { location: loc }) || "";
    var fhirServiceUrl = lib_1.urlParam("fhirServiceUrl", { location: loc }) || "";
    var cfg;
    var serverUrl = String(iss || fhirServiceUrl || "");
    if (Array.isArray(options)) {
        cfg = options.find(function (o) {
            if (typeof o.iss == "string") {
                return o.iss === iss || o.iss === fhirServiceUrl;
            }
            if (o.iss instanceof RegExp) {
                return (iss && o.iss.test(iss)) ||
                    (fhirServiceUrl && o.iss.test(fhirServiceUrl));
            }
        });
        if (!cfg) {
            return Promise.reject(new Error("None of the provided configurations matched the current server \"" + serverUrl + "\""));
        }
    }
    else {
        cfg = options;
        if (!serverUrl) {
            serverUrl = String(cfg.serverUrl || "");
        }
    }
    var launch = lib_1.urlParam("launch", { location: loc });
    if (iss && !launch) {
        return Promise.reject(new Error("Missing url parameter \"launch\""));
    }
    if (!serverUrl) {
        return Promise.reject(new Error("No server url found. It must be specified as query.iss or " +
            "query.fhirServiceUrl or options.serverUrl (in that order)"));
    }
    lib_1.debug("Looking up the authorization endpoint for \"" + serverUrl + "\"");
    return getSecurityExtensions(serverUrl).then(function (extensions) {
        // Prepare the object that will be stored in the session
        var state = tslib_1.__assign({ serverUrl: serverUrl, clientId: cfg.clientId, redirectUri: lib_1.urlToAbsolute(cfg.redirectUri || "."), scope: cfg.scope || "" }, extensions);
        if (cfg.clientSecret) {
            state.clientSecret = cfg.clientSecret;
        }
        // Create an unique key and use it to store the state
        var id = lib_1.randomString(32);
        sessionStorage.setItem(id, JSON.stringify(state));
        // In addition, save the random key to a well-known location. This way
        // the page knows how to find it after reload and restore it's client
        // state from there.
        sessionStorage.setItem("smartId", id);
        var redirectUrl = state.redirectUri;
        if (state.authorizeUri) {
            if (!cfg.clientId) {
                throw new Error("A \"clientId\" option is required by this server");
            }
            lib_1.debug("authorizeUri: " + state.authorizeUri);
            var params = [
                "response_type=code",
                "client_id=" + encodeURIComponent(state.clientId),
                "scope=" + encodeURIComponent(state.scope),
                "redirect_uri=" + encodeURIComponent(state.redirectUri),
                "aud=" + encodeURIComponent(state.serverUrl),
                "state=" + id
            ];
            // also pass this in case of EHR launch
            if (launch) {
                params.push("launch=" + encodeURIComponent(launch));
            }
            redirectUrl = state.authorizeUri + "?" + params.join("&");
        }
        return redirectUrl;
    });
}
exports.buildAuthorizeUrl = buildAuthorizeUrl;
/**
 * Builds the token request options for axios. Does not make the request, just
 * creates it's configuration and returns it in a Promise.
 * NOTE that this function has side effects because it modifies the storage
 * contents.
 * @param req
 * @param storage
 */
function buildTokenRequest(code, state) {
    if (!state.redirectUri) {
        throw new Error("Missing state.redirectUri");
    }
    if (!state.tokenUri) {
        throw new Error("Missing state.tokenUri");
    }
    if (!state.clientId) {
        throw new Error("Missing state.clientId");
    }
    var requestOptions = {
        method: "POST",
        // url   : state.tokenUri,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: "code=" + code + "&grant_type=authorization_code&redirect_uri=" + encodeURIComponent(state.redirectUri)
    };
    // For public apps, authentication is not possible (and thus not required),
    // since a client with no secret cannot prove its identity when it issues a
    // call. (The end-to-end system can still be secure because the client comes
    // from a known, https protected endpoint specified and enforced by the
    // redirect uri.) For confidential apps, an Authorization header using HTTP
    // Basic authentication is required, where the username is the app’s
    // client_id and the password is the app’s client_secret (see example).
    if (state.clientSecret) {
        requestOptions.headers.Authorization = "Basic " + btoa(state.clientId + ":" + state.clientSecret);
        lib_1.debug("Using state.clientSecret to construct the authorization header: \"" + requestOptions.headers.Authorization + "\"");
    }
    else {
        lib_1.debug("No clientSecret found in state. Adding client_id to the POST body");
        // requestOptions.data.client_id = state.clientId;
        requestOptions.body += "&client_id=" + encodeURIComponent(state.clientId);
    }
    return requestOptions;
}
exports.buildTokenRequest = buildTokenRequest;
/**
 * After successful authorization we have received a code and state parameters.
 * Use this function to exchange that code for an access token and complete the
 * authorization flow.
 */
function completeAuth() {
    lib_1.debug("Completing the code flow");
    // These are coming from the URL so make sure we validate them
    var state = lib_1.urlParam("state");
    var code = lib_1.urlParam("code");
    // if (!state) throw new Error('No "state" parameter found in the URL');
    // if (!code ) throw new Error('No "code" parameter found in the URL' );
    // Remove the `code` and `state` params from the URL so that if the page is
    // reloaded it won't have to re-authorize
    if (window.history.replaceState) {
        window.history.replaceState({}, "", location.href.replace(location.search, ""));
    }
    // We have received a `state` param that should be the sessionStorage key
    // in which we store our state. But what if somebody passes `state` param
    // manually and trick us to store the state on different location?
    if (Storage_1.default.key() !== state) {
        return Promise.reject(new Error("State key mismatch. Expected \"" + state + "\" but found \"" + Storage_1.default.key() + "\"."));
    }
    var cached = Storage_1.default.get();
    // state and code are coming from the page url so they might be empty or
    // just invalid. In this case buildTokenRequest() will throw!
    var requestOptions = buildTokenRequest(code, cached);
    // The EHR authorization server SHALL return a JSON structure that
    // includes an access token or a message indicating that the
    // authorization request has been denied.
    return lib_1.fetchJSON(cached.tokenUri, requestOptions)
        .then(function (data) {
        lib_1.debug("Received tokenResponse. Saving it to the state...");
        cached.tokenResponse = data;
        Storage_1.default.set(cached);
        return cached;
    })
        .then(function (stored) { return waitForDomReady(stored); })
        .then(function (stored) { return new Client_1.default(stored); });
}
exports.completeAuth = completeAuth;
function init(options) {
    // if `code` and `state` params are present we need to complete the auth flow
    if (lib_1.urlParam("state") && lib_1.urlParam("code")) {
        return completeAuth();
    }
    // Check for existing client state. If state is found, it means a client
    // instance have already been created in this session and we should try to
    // "revive" it.
    var cached = Storage_1.default.get();
    if (cached) {
        return Promise.resolve(new Client_1.default(cached));
    }
    // Otherwise try to launch
    return authorize(options).then(function () {
        // `init` promises a Client but that cannot happen in this case. The
        // browser will be redirected (unload the page and be redirected back
        // to it later and the same init function will be called again). On
        // success, authorize will resolve with the redirect url but we don't
        // want to return that from this promise chain because it is not a
        // Client instance. At the same time, if authorize fails, we do want to
        // pass the error to those waiting for a client instance.
        return new Promise(function () { });
    });
}
exports.init = init;
// export async function ready(): Promise<Client> {
//     // First check for existing client state
//     const cached = Storage.get();
//     // If state is found, it means a client instance have already been created
//     // in this session and we should try to revive it.
//     if (cached) {
//         return new Client(cached);
//     }
//     // If no state is found we should be visiting this page for the first time
//     const state = urlParam("state");
//     const code  = urlParam("code");
//     // if `code` and `state` params are present we need to complete the auth flow
//     if (state && code) {
//         return completeAuth();
//     }
//     throw new Error("Unable to complete authentication. Please re-launch the application");
// }
function waitForDomReady() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new Promise(function (resolve) {
        if (document.readyState == "complete") {
            resolve.apply(void 0, args);
        }
        else {
            setTimeout(function () { return waitForDomReady.apply(void 0, args); }, 100);
        }
    });
}
//# sourceMappingURL=oauth.js.map