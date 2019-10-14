import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class NgFhirService {
  constructor(private oAuthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(sessionStorage);
    // this.oAuthService.loadDiscoveryDocumentAndLogin();
    // this.init();
  }

  init() {
    this.oAuthService.initCodeFlow();
    console.log('init called in ng-fhir service');
  }

  completeLoginWithCode(): Promise<boolean> {
    // check if already logged in with valid access token
    if (!this.oAuthService.hasValidAccessToken()) {
      return this.oAuthService.tryLogin();
    }

    // if already logged in
    return new Promise<boolean>((resolve) => {
      resolve(true);
    });
  }

  /**
   * Starts the authorization flow (redirects to the auth uri). This should be
   * called on the page that represents your launch_uri.
   * @param options ClientOptions or AuthorizeOptionSet[]
   */
  // authorize(options?: ) {
  //   // return oAuth2.authorize(options);
  // }
}
