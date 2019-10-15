import {AuthConfig} from '../../../../angular-oauth2-oidc/projects/lib/src/auth.config';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  // issuer: 'https://demo.identityserver.io',
  issuer: 'http://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiI1YjEwN2M0My0yOTYzLTQ1OGMtYjc4Ny02NGRlYzUwMWM3MTAiLCJlIjoic21hcn' +
    'QtUHJhY3RpdGlvbmVyLTcyMDA0NDU0In0/fhir',

  // Login-Url
  loginUrl: 'http://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiI1YjEwN2M0My0yOTYzLTQ1OGMtYjc4Ny02NGRlYzUwMWM3MTAiLCJlIjoic21hcnQtUHJhY3RpdGlvbmVyLTcyMDA0NDU0In0/auth/authorize',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/landing',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'my_client_id',

  /**
   * Defines whether to use OpenId Connect during
   * implicit flow.
   */
  oidc: false,

  /**
   * Defines whether to request a access token during
   * implicit flow.
   */
  requestAccessToken: true,

  /**
   * Url of the token endpoint as defined by OpenId Connect and OAuth 2.
   */
  tokenEndpoint: 'http://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiI1YjEwN2M0My0yOTYzLTQ1OGMtYjc4Ny02NGRlYzUwMWM3MTAiLCJlIjoic21hcnQtUHJhY3RpdGlvbmVyLTcyMDA0NDU0In0/auth/token',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'patient/*.read observation/*.read launch',

  showDebugInformation: true,

  /**
   * Defines whether https is required.
   * The default value is remoteOnly which only allows
   * http for localhost, while every other domains need
   * to be used with https.
   */
  requireHttps: false, // ToDo: Change this once in production

  // Not recommended:
  // disablePKCI: true,

  /**
   * Map with additional query parameter that are appended to
   * the request when initializing implicit flow.
   */
  customQueryParams: {
    aud: 'http://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiI1YjEwN2M0My0yOTYzLTQ1OGMtYjc4Ny02NGRlYzUwMWM3MTAiLCJlIjoic21hcn' +
      'QtUHJhY3RpdGlvbmVyLTcyMDA0NDU0In0/fhir',
    patient: ''
  },
};
