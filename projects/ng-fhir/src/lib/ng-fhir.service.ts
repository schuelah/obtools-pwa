import {Injectable} from '@angular/core';
import {authCodeFlowConfig} from './auth.config';
import {HttpClient} from '@angular/common/http';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class NgFhirService {
  constructor(private oAuthService: OAuthService, private http: HttpClient) {
    this.configure();
    this.setEventCallbacks();
  }

  private configure() {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(sessionStorage);
    // this.oAuthService.loadDiscoveryDocumentAndLogin();
    // this.init();
  }

  init() {
    console.log('init called in ng-fhir service');

    this.oAuthService.initCodeFlow();
  }

  completeLoginWithCode(): Promise<boolean> {
    // check if already logged in with valid access token
    if (!this.isLoggedIn()) {
      console.log('not logged in. Attempting tryLogin');

      return this.oAuthService.tryLogin();
    }

    // if already logged in
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }

  isLoggedIn() {
    return this.oAuthService.hasValidAccessToken();
  }

  /**
   * Starts the authorization flow (redirects to the auth uri). This should be
   * called on the page that represents your launch_uri.
   * @param options ClientOptions or AuthorizeOptionSet[]
   */
  // authorize(options?: ) {
  //   // return oAuth2.authorize(options);
  // }

  logOut() {
    this.oAuthService.logOut();
  }

  getContext() {
  }

  private setEventCallbacks() {
    this.oAuthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        console.log('token received');

        console.log(event);

        console.log(this.oAuthService.customQueryParams);

        // this.http.
      }
    });
  }
}
