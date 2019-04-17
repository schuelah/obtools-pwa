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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    PreEclampsiaCalcModule,
    MaternalIcuCalcModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    FlexModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
