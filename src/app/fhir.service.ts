import {Injectable} from '@angular/core';
import {SMART} from '../../projects/client-ts/src';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  constructor() {
  }

  init() {
    SMART.init({
      client_id: 'my_web_app',
      scope: 'patient/*.read'
    }).then(client => {
        console.log(client);
      }
    );

    this.test();
  }

  test() {
    console.log('test succeeded');
  }
}
