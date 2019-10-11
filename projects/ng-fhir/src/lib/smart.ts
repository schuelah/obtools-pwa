// Capabilities ------------------------------------------------------------

export type SMARTAuthenticationMethod = 'client_secret_post' | 'client_secret_basic';

export type launchMode = 'launch-ehr' | 'launch-standalone';

export type clientType = 'client-public' | 'client-confidential-symmetric';

export type singleSignOn = 'sso-openid-connect';

export type launchContext = 'context-banner' | 'context-style';

export type launchContextEHR = 'context-ehr-patient' | 'context-ehr-encounter';

export type launchContextStandalone = 'context-standalone-patient' | 'context-standalone-encounter';

export type permissions = 'permission-offline' | 'permission-patient' | 'permission-user';

// OAuth2 Endpoints --------------------------------------------------------

export interface OAuth2Endpoints {

  /**
   * If available, URL to the OAuth2 dynamic registration endpoint for this
   * FHIR server.
   */
  register?: string;

  /**
   * URL to the OAuth2 authorization endpoint.
   */
  authorize: string;

  /**
   * URL to the OAuth2 token endpoint.
   */
  token: string;

  /**
   * If available, URL where an end-user can view which applications
   * currently have access to data and can make adjustments to these access
   * rights.
   */
  manage?: string;

  /**
   * URL to a server’s introspection endpoint that can be used to validate
   * a token.
   */
  introspect?: string;

  /**
   * URL to a server’s endpoint that can be used to revoke a token.
   */
  revoke?: string;
}

export interface WellKnownSmartConfiguration {
  /**
   * URL to the OAuth2 authorization endpoint.
   */
  authorization_endpoint: string;

  /**
   * URL to the OAuth2 token endpoint.
   */
  token_endpoint: string;

  /**
   * If available, URL to the OAuth2 dynamic registration endpoint for the
   * FHIR server.
   */
  registration_endpoint?: string;

  /**
   * RECOMMENDED! URL where an end-user can view which applications currently
   * have access to data and can make adjustments to these access rights.
   */
  management_endpoint?: string;

  /**
   * RECOMMENDED! URL to a server’s introspection endpoint that can be used
   * to validate a token.
   */
  introspection_endpoint?: string;

  /**
   * RECOMMENDED! URL to a server’s revoke endpoint that can be used to
   * revoke a token.
   */
  revocation_endpoint?: string;

  /**
   * Array of client authentication methods supported by the token endpoint.
   * The options are “client_secret_post” and “client_secret_basic”.
   */
  token_endpoint_auth_methods?: SMARTAuthenticationMethod[];

  /**
   * Array of scopes a client may request.
   */
  scopes_supported?: string[];

  /**
   * Array of OAuth2 response_type values that are supported
   */
  response_types_supported?: string[];

  /**
   * Array of strings representing SMART capabilities (e.g., single-sign-on
   * or launch-standalone) that the server supports.
   */
  capabilities: (
    SMARTAuthenticationMethod |
    launchMode |
    clientType |
    singleSignOn |
    launchContext |
    launchContextEHR |
    launchContextStandalone |
    permissions
    )[];
}

export interface IDToken {
  profile: string;
  aud: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;

  [key: string]: any;
}

/**
 * The response object received from the token endpoint while trying to
 * exchange the auth code for an access token. This object has a well-known
 * base structure but the auth servers are free to augment it with
 * additional properties.
 * @see http://docs.smarthealthit.org/authorization/
 */
export interface TokenResponse {

  /**
   * If present, this tells the app that it is being rendered within an
   * EHR frame and the UI outside that frame already displays the selected
   * patient's name, age, gender etc. The app can decide to hide those
   * details to prevent the UI from duplicated information.
   */
  need_patient_banner?: boolean;

  /**
   * This could be a public location of some style settings that the EHR
   * would like to suggest. The app might look it up and optionally decide
   * to apply some or all of it.
   * @see https://launch.smarthealthit.org/smart-style.json
   */
  smart_style_url?: string;

  /**
   * If you have requested that require it (like `launch` or `launch/patient`)
   * the selected patient ID will be available here.
   */
  patient?: string;

  /**
   * If you have requested that require it (like `launch` or `launch/encounter`)
   * the selected encounter ID will be available here.
   * **NOTE:** This is not widely supported as of 2018.
   */
  encounter?: string;

  /**
   * If you have requested `openid` and `profile` scopes the profile of
   * the active user will be available as `client_id`.
   * **NOTE:** Regardless of it's name, this property does not store an ID
   * but a token that also suggests the user type like `Patient/123`,
   * `Practitioner/xyz` etc.
   */
  client_id?: string;

  /**
   * Fixed value: bearer
   */
  token_type: 'bearer' | 'Bearer';

  /**
   * Scope of access authorized. Note that this can be different from the
   * scopes requested by the app.
   */
  scope: string;

  /**
   * Lifetime in seconds of the access token, after which the token SHALL NOT
   * be accepted by the resource server
   */
  expires_in?: number;

  /**
   * The access token issued by the authorization server
   */
  access_token: string;

  /**
   * Authenticated patient identity and profile, if requested
   */
  id_token?: string;

  /**
   * Token that can be used to obtain a new access token, using the same or a
   * subset of the original authorization grants
   */
  refresh_token?: string;

  /**
   * Other properties might be passed by the server
   */
  [key: string]: any;
}
