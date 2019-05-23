import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {PreEclampsiaCalcModule} from './pre-eclampsia-calc/pre-eclampsia-calc.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {MaternalIcuCalcModule} from './maternal-icu-calc/maternal-icu-calc.module';
import {ObesityIolCalcModule} from './obesity-iol-calc/obesity-iol-calc.module';
import { ButtonGroupYesNoComponent } from './button-group-yes-no/button-group-yes-no.component';
import {ButtonGroupModule} from './button-group/button-group.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    PreEclampsiaCalcModule,
    MaternalIcuCalcModule,
    ObesityIolCalcModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    FlexModule,
    ButtonGroupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
