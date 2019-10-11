import {Injectable} from '@angular/core';
import {NgFhirService} from 'ng-fhir';

@Injectable({
  providedIn: 'root'
})
export class FhirService {
  constructor(private ngFhir: NgFhirService) {
  }

  init() {
    // this.ngFhir.init({
    //   clientId: 'my_web_app',
    //   scope: 'patient/*.read',
    //   authorizeUri: 'http://localhost:4000',
    //   registrationUri: 'http://localhost:4000',
    //   redirectUri: 'http://localhost:4000',
    //   tokenUri: 'http://localhost:4000'
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
//
// clientId: 'my_web_app',
//   scope: 'patient/*.read'
