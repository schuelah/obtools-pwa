import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreEclampsiaCalcComponent} from '../pre-eclampsia-calc/pre-eclampsia-calc.component';
import {MaternalIcuCalcComponent} from '../maternal-icu-calc/maternal-icu-calc.component';
import {ObesityIolCalcComponent} from '../obesity-iol-calc/obesity-iol-calc.component';
import {IolCalcComponent} from '../iol-calc/iol-calc.component';
import {ToolDashboardComponent} from '../tool-dashboard/tool-dashboard.component';
import {CdhCalcComponent} from '../cdh-calc/cdh-calc.component';
import {CanActivateRouteGuard} from './can-activate-route.guard';
import {AuthComponent} from '../auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: ToolDashboardComponent,
  },
  {
    path: 'mat-icu-calc',
    component: MaternalIcuCalcComponent,
  },
  {
    path: 'obesity-iol-calc',
    component: ObesityIolCalcComponent,
  },
  {
    path: 'pe-cs-calc',
    component: PreEclampsiaCalcComponent,
  },
  {
    path: 'iol-calc',
    component: IolCalcComponent,
  },
  {
    path: 'calc/cdh',
    component: CdhCalcComponent,
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'calc/infant-survival',
    component: CdhCalcComponent,
    canActivate: [CanActivateRouteGuard],
  },
  {
    path: 'authorize',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
