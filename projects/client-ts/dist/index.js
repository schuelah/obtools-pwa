"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import "whatwg-fetch";
var oAuth2 = require("./oauth");
// New API ---------------------------------------------------------------------
exports.SMART = {
    /**
     * Starts the authorization flow (redirects to the auth uri). This should be
     * called on the page that represents your launch_uri.
     * @param options
     */
    authorize: function (options) {
        return oAuth2.authorize(options);
    },
    /**
     * Completes the authorization flow. This should be called on the page that
     * represents your redirect_uri.
     */
    // ready: oAuth2.ready,
    /**
     * Calls `authorize` or `ready` depending on the URL parameters. Can be used
     * to handle everything in one page (when the launch_uri and redirect_uri of
     * your smart client are the same)
     */
    init: oAuth2.init
};
// Legacy API ------------------------------------------------------------------
exports.FHIR = {
    oAuth2: {
        settings: {
            replaceBrowserHistory: true,
            fullSessionStorageSupport: true
        },
        authorize: function (options) {
            return oAuth2.authorize(options);
        },
    }
};
if (typeof window !== "undefined") {
    window.SMART = exports.SMART;
    window.FHIR = exports.FHIR;
}
//# sourceMappingURL=index.js.map