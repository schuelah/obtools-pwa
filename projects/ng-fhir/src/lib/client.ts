import * as fhir from './fhir';
import * as SMART from './smart';

/**
 * The API exposed by fhir.js
 */
export interface FhirJsAPI {
  [key: string]: any;
}

export interface Patient {
  id: string;
  read: () => Promise<fhir.Resource>;
  api?: FhirJsAPI;
}

export interface Encounter {
  id: string;
  read: () => Promise<fhir.Resource>;
}

export interface User {
  id: string;
  type: string; // Patient, Practitioner, RelatedPerson...
  read: () => Promise<fhir.Resource>;
}

/**
 * Describes the state that should be passed to the Client constructor
 */
export interface State {
  /**
   * The base URL of the Fhir server. The library should have detected it
   * at authorization time from request query params of from config options.
   */
  serverUrl: string;

  /**
   * The client_id that you should have obtained while registering your
   * app with the auth server or EHR (as set in the configuration options)
   */
  clientId: string;

  /**
   * The URI to redirect to after successful authorization, as set in the
   * configuration options.
   */
  redirectUri: string;

  /**
   * The access scopes that you requested in your options (or an empty string).
   * @see http://hl7.org/fhir/smart-app-launch/scopes-and-launch-context/index.html
   */
  scope: string;

  /**
   * Your client secret if you have one (for confidential clients)
   */
  clientSecret?: string;

  /**
   * The (encrypted) access token, in case you have completed the auth flow
   * already.
   */
  access_token?: string;

  /**
   * The response object received from the token endpoint while trying to
   * exchange the auth code for an access token (if you have reached that point).
   */
  tokenResponse?: SMART.TokenResponse;

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
