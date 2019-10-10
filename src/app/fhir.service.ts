import {Injectable} from '@angular/core';
// import {oauth2} from 'fhirclient';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  constructor() {
  }

  init() {
    // oauth2.init({
    //   client_id: 'my_web_app',
    //   scope: 'patient/*.read'
    // }).then(client => {
    //     console.log(client);
    //   }
    // );

    this.test();
  }

  test() {
    console.log('test succeeded');
  }
}
