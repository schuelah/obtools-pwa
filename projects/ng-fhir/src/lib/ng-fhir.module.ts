import { NgModule } from '@angular/core';
import { NgFhirComponent } from './ng-fhir.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [NgFhirComponent],
  providers: [],
  imports: [
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  exports: [NgFhirComponent]
})
export class NgFhirModule { }
