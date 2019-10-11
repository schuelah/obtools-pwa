import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PreEclampsiaCalcModule} from './pre-eclampsia-calc/pre-eclampsia-calc.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {MaternalIcuCalcModule} from './maternal-icu-calc/maternal-icu-calc.module';
import {ObesityIolCalcModule} from './obesity-iol-calc/obesity-iol-calc.module';
import {IolCalcModule} from './iol-calc/iol-calc.module';
import { ToolDashboardComponent } from './tool-dashboard/tool-dashboard.component';
import {MaterialElevationDirective} from './tools/material-elevation.directive';
import { OauthTestComponent } from './oauth-test/oauth-test.component';
import {NgFhirModule} from '../../projects/ng-fhir/src/lib/ng-fhir.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolDashboardComponent,
    MaterialElevationDirective,
    OauthTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    PreEclampsiaCalcModule,
    MaternalIcuCalcModule,
    ObesityIolCalcModule,
    IolCalcModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    FlexModule,

    MatGridListModule,

    MatCardModule,

    MatMenuModule,
    NgFhirModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
