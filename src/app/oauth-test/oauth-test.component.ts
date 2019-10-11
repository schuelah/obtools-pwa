import { Component, OnInit } from '@angular/core';
import {NgFhirService} from '../../../projects/ng-fhir/src/lib/ng-fhir.service';

@Component({
  selector: 'app-oauth-test',
  templateUrl: './oauth-test.component.html',
  styleUrls: ['./oauth-test.component.css']
})
export class OauthTestComponent implements OnInit {

  constructor(private ngFhir: NgFhirService) { }

  ngOnInit() {
    this.ngFhir.init();
  }

}
