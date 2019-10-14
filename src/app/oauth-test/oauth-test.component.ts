import { Component, OnInit } from '@angular/core';
import {NgFhirService} from '../../../projects/ng-fhir/src/lib/ng-fhir.service';

@Component({
  selector: 'app-oauth-test',
  templateUrl: './oauth-test.component.html',
  styleUrls: ['./oauth-test.component.css']
})
export class OauthTestComponent implements OnInit {
  loggedIn: boolean;
  constructor(private ngFhir: NgFhirService) { }

  ngOnInit() {
    // this.ngFhir.init();
  }

  init() {
    this.ngFhir.init();
  }

  completeLogin() {
    this.ngFhir.completeLoginWithCode().then( (completedSuccessfully) => {
      if (completedSuccessfully) {
        console.log('completed login successfully');
        this.isLoggedIn();
      } else {
        console.log('did NOT complete login successfully');
      }
    });
  }

  isLoggedIn() {
    this.loggedIn = this.ngFhir.isLoggedIn();
  }

  logOut() {
    this.ngFhir.logOut();
    this.loggedIn = this.ngFhir.isLoggedIn();
  }
}
