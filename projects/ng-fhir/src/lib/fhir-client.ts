export interface AuthorizeOptionSet {
  /**
   * The base URL of the Fhir server. If provided in the options, the app
   * will be launch-able byy simply accessing your launch URI without
   * requiring any parameters.
   */
  iss: string | RegExp;

  /**
   * The client_id that you should have obtained while registering your
   * app with the auth server or EHR.
   */
  clientId?: string;

  /**
   * The URI to redirect to after successful authorization. This must be
   * absolute path, relative to your site root, i.e. must begin with "/"
   */
  redirectUri?: string;

  /**
   * The access scopes that you need.
   * @see http://hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html
   */
  scope?: string;

  /**
   * Your client secret if you have one (for confidential clients)
   */
  clientSecret?: string;
}

/**
 * Describes the options that one can/should pass to the functions that
 * accept configuration argument
 */
export interface AuthorizeOptions {
  /**
   * The base URL of the Fhir server. If provided in the options, the app
   * will be launch-able byy simply accessing your launch URI without
   * requiring any parameters.
   */
  serverUrl?: string;

  /**
   * The client_id that you should have obtained while registering your
   * app with the auth server or EHR.
   */
  clientId?: string;

  /**
   * The URI to redirect to after successful authorization. This must be
   * absolute path, relative to your site root, i.e. must begin with "/"
   */
  redirectUri?: string;

  /**
   * The access scopes that you need.
   * @see http://hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html
   */
  scope?: string;

  /**
   * Your client secret if you have one (for confidential clients)
   */
  clientSecret?: string;
}

/**
 * The three security endpoints that SMART servers might declare in the
 * conformance statement
 */
export interface OAuthSecurityExtensions {

  /**
   * You could register new SMART client at this endpoint (if the server
   * supports dynamic client registration)
   */
  registrationUri: string;

  /**
   * You must call this endpoint to ask for authorization code
   */
  authorizeUri: string;

  /**
   * You must call this endpoint to exchange your authorization code
   * for an access token.
   */
  tokenUri: string;
}

/**
 * Describes the options that one can/should pass to the functions that
 * accept configuration argument
 */
export interface ClientOptions extends OAuthSecurityExtensions {
  /**
   * The base URL of the Fhir server. If provided in the options, the app
   * will be launch-able byy simply accessing your launch URI without
   * requiring any parameters.
   */
  serverUrl?: string;

  /**
   * The client_id that you should have obtained while registering your
   * app with the auth server or EHR.
   */
  clientId?: string;

  /**
   * The URI to redirect to after successful authorization. This must be
   * absolute path, relative to your site root, i.e. must begin with "/"
   */
  redirectUri?: string;

  /**
   * The access scopes that you need.
   * @see http://hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html
   */
  scope?: string;

  /**
   * Your client secret if you have one (for confidential clients)
   */
  clientSecret?: string;
}

export interface OAuth2 {
  settings: OAuth2Config;
}


/**
 * oauth2 settings
 */
export interface OAuth2Config {

  /**
   * Replaces the browser's current URL using the `history.replaceState`
   * API. Defaults to `true`.
   */
  replaceBrowserHistory?: boolean;

  /**
   * When set to true, this variable will fully utilize
   * HTML5 sessionStorage API. Defaults to true.
   * This variable can be overridden to false by setting
   * FHIR.oauth2.settings.fullSessionStorageSupport = false.
   * When set to false, the sessionStorage will be keyed
   * by a state variable. This is to allow the embedded IE browser
   * instances instantiated on a single thread to continue to
   * function without having sessionStorage data shared
   * across the embedded IE instances.
   */
  fullSessionStorageSupport?: boolean;
}

export interface authorizeParams {
  response_type?: 'code';
  server: string;
  fake_token_response: {
    patient: string;
  };
  provider: {
    oauth2: any;
  };
  client: {
    redirect_uri: string;
    scope: string;
    launch: string;
    state: string; // guid
  };
}

/**
 * The input object that can be passed as first parameter to
 * `FHIR.oauth2.ready`
 */
export interface readyInput {
  code?: string;
  state?: string;
}

// type readyCallback  = (client: any) => any;
// type readyErrorback = (error: Error | string) => any;

// type readyArgsFn1 = [readyCallback];
// type readyArgsFn2 = [readyCallback, readyErrorback];
// type readyArgsFn3 = [readyInput, readyCallback];
// type readyArgsFn4 = [readyInput, readyCallback, readyErrorback];
// type readyArgsResult = {
//     input   : readyInput;
//     callback: readyCallback;
//     errback : readyErrorback;
// }
// type readyFnArgs  = readyArgsFn1 | readyArgsFn2 | readyArgsFn3 | readyArgsFn4;

