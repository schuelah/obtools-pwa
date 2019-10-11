import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  // issuer: 'https://demo.identityserver.io',
  issuer: 'http://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiI1YjEwN2M0My0yOTYzLTQ1OGMtYjc4Ny02NGRlYzUwMWM3MTAiLCJlIjoic21hcn' +
    'QtUHJhY3RpdGlvbmVyLTcyMDA0NDU0In0/fhir',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/landing',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'my_client_id',

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
  scope: 'patient:read',

  showDebugInformation: true,

  // Not recommended:
  // disablePKCI: true,
};
