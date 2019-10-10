"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Storage_1 = require("./Storage");
var lib_1 = require("./lib");
/**
 * A SMART Client instance will simplify some tasks for you. It will authorize
 * requests automatically, use refresh tokens, handle errors and so on.
 */
var Client = /** @class */ (function () {
    /**
     * Creates ne Client instance.
     * @param state Required state to initialize with.
     */
    function Client(state) {
        /**
         * The currently selected patient (if any)
         */
        this.patient = null;
        /**
         * The currently logged-in user (if any)
         */
        this.user = null;
        /**
         * The currently selected encounter (if any and if supported by the EHR)
         */
        this.encounter = null;
        // This might happen if the state have been lost (for example the
        // sessionStorage has been cleared, size limit exceeded etc.).
        if (!state) {
            throw new Error("No state provided to the client");
        }
        this.state = state;
        // Context (patient, user, encounter)
        var patientId = this.getState("tokenResponse.patient");
        var encounterId = this.getState("tokenResponse.encounter");
        var idToken = this.getState("tokenResponse.id_token");
        if (patientId) {
            this.setPatientId(patientId);
        }
        if (encounterId) {
            this.setEncounter(encounterId);
        }
        if (idToken) {
            this.parseIdToken(idToken);
        }
        // Set up Fhir.js API if "fhir" is available in the global scope
        if (typeof window.fhir == "function") {
            var accessToken = this.getState("tokenResponse.access_token");
            var auth = accessToken ?
                { type: "bearer", bearer: accessToken } :
                { type: "none" };
            this.api = window.fhir({
                baseUrl: state.serverUrl,
                auth: auth
            });
            if (this.patient) {
                this.patient.api = window.fhir({
                    baseUrl: state.serverUrl,
                    patient: patientId,
                    auth: auth
                });
            }
        }
    }
    /**
     * Parses the given id token, extracts the user information out of it and
     * sets the current user.
     * NOTE: To reduce the size of the script we do not use any jwt library to
     * parse the token and we do not validate signatures!
     * @param idToken The ID token to parse. This must be a jwt token.
     */
    Client.prototype.parseIdToken = function (idToken) {
        try {
            var token = JSON.parse(atob(idToken.split(".")[1]));
            var fhirUser = token.fhirUser || token.profile || "";
            var tokens = fhirUser.split("/");
            if (tokens.length > 1) {
                var id = tokens.pop();
                var type = tokens.pop();
                this.setUser(type, id);
            }
        }
        catch (error) {
            console.warn("Error parsing id_token:", error);
        }
    };
    /**
     * Sets the current patient
     * @param id The ID of the patient
     */
    Client.prototype.setPatientId = function (id) {
        var _this = this;
        this.patient = {
            id: String(id),
            read: function () { return _this.request("Patient/" + id).then(lib_1.responseToJSON); }
        };
    };
    /**
     * Sets the current encounter
     * @param id The ID of the encounter
     */
    Client.prototype.setEncounter = function (id) {
        var _this = this;
        this.encounter = {
            id: String(id),
            read: function () { return _this.request("Encounter/" + id).then(lib_1.responseToJSON); }
        };
    };
    /**
     * Sets the current user
     * @param type The resource type of the user (Eg. "Patient", "Practitioner",
     * "RelatedPerson"...)
     * @param id The ID of the user
     */
    Client.prototype.setUser = function (type, id) {
        var _this = this;
        this.user = {
            type: type,
            id: String(id),
            read: function () { return _this.request(type + "/" + id).then(lib_1.responseToJSON); }
        };
    };
    /**
     * Gets the state, optionally diving into specific node by the given path
     * @param {string} The path to look up. Defaults to "".
     */
    Client.prototype.getState = function (path) {
        if (path === void 0) { path = ""; }
        if (!path) {
            return this.state;
        }
        return lib_1.getPath(this.state, path);
    };
    /**
     * Allows you to do the following:
     * 1. Use relative URLs (treat them as relative to the "serverUrl" option)
     * 2. Automatically authorize requests with your accessToken (if any)
     * 3. Automatically re-authorize using the refreshToken (if available)
     * 4. Automatically parse error operation outcomes and turn them into
     *    JavaScript Error objects with which the resulting promises are rejected
     * @param {string} url the URL to fetch
     * @param {object} options fetch options
     */
    Client.prototype.request = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        url = lib_1.resolve(url, this.state.serverUrl);
        // If we are talking to protected fhir server we should have an access token
        var accessToken = this.getState("tokenResponse.access_token");
        if (accessToken) {
            options.headers = tslib_1.__assign({}, options.headers, { Authorization: "Bearer " + accessToken });
        }
        return fetch(url, options)
            .then(function (resp) {
            if (resp.status == 401 && _this.getState("tokenResponse.refresh_token")) {
                return _this.refresh().then(function () { return _this.request(url, options); });
            }
            return resp;
        })
            .then(lib_1.checkResponse)
            .catch(function () { return Promise.reject(new Error("Could not fetch \"" + url + "\"")); });
    };
    /**
     * Use the refresh token to obtain new access token. If the refresh token is
     * expired (or this fails for any other reason) it will be deleted from the
     * state, so that we don't enter into loops trying to re-authorize.
     */
    Client.prototype.refresh = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var refreshToken;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                refreshToken = lib_1.getPath(this.state, "tokenResponse.refresh_token");
                if (!refreshToken) {
                    throw new Error("Trying to refresh but there is no refresh token");
                }
                return [2 /*return*/, lib_1.fetchJSON(this.state.tokenUri, {
                        method: "POST",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + encodeURIComponent(refreshToken)
                    })
                        .then(function (json) {
                        _this.state.tokenResponse = tslib_1.__assign({}, _this.state.tokenResponse, json);
                        // Save this change into the sessionStorage
                        Storage_1.default.set(_this.state);
                    })
                        .catch(function (error) {
                        // debug(error);
                        // debug("Deleting the expired or invalid refresh token");
                        delete _this.state.tokenResponse.refresh_token;
                        throw error;
                    })];
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=Client.js.map