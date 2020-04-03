import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PreEclampsiaCalcModule } from './pre-eclampsia-calc/pre-eclampsia-calc.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MaternalIcuCalcModule } from './maternal-icu-calc/maternal-icu-calc.module';
import { ObesityIolCalcModule } from './obesity-iol-calc/obesity-iol-calc.module';
import { IolCalcModule } from './iol-calc/iol-calc.module';
import { ToolDashboardComponent } from './tool-dashboard/tool-dashboard.component';
import { MaterialElevationDirective } from './tools/material-elevation.directive';
import { CdhCalcComponent } from './cdh-calc/cdh-calc.component';
import { CalculatorModule } from './calculator/calculator.module';
import { MockTextAreaModule } from './mock-text-area/mock-text-area.module';
import { ReferenceModule } from './reference/reference.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from './auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    ToolDashboardComponent,
    MaterialElevationDirective,
    CdhCalcComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    PreEclampsiaCalcModule,
    MaternalIcuCalcModule,
    ObesityIolCalcModule,
    IolCalcModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    CalculatorModule,
    MockTextAreaModule,
    ReferenceModule,
    MatButtonToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
