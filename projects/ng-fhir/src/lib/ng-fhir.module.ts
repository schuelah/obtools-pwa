import { NgModule } from '@angular/core';
import { NgFhirComponent } from './ng-fhir.component';
import {OAuthService} from 'angular-oauth2-oidc';

@NgModule({
  declarations: [NgFhirComponent],
  providers: [OAuthService],
  imports: [],
  exports: [NgFhirComponent]
})
export class NgFhirModule { }
