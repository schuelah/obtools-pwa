import { NgModule } from '@angular/core';
import { NgFhirComponent } from './ng-fhir.component';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule} from '../../../../angular-oauth2-oidc/projects/lib/src/angular-oauth-oidic.module';

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
