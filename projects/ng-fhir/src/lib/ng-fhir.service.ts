import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgFhirService {

  /**
   * Completes the authorization flow. This should be called on the page that
   * represents your redirect_uri.
   */
  // ready = oAuth2.ready;

  /**
   * Calls `authorize` or `ready` depending on the URL parameters. Can be used
   * to handle everything in one page (when the launch_uri and redirect_uri of
   * your smart client are the same)
   */
  // init = oAuth2.init;

  constructor() {
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
