import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreEclampsiaCalcComponent} from '../pre-eclampsia-calc/pre-eclampsia-calc.component';
import {MaternalIcuCalcComponent} from '../maternal-icu-calc/maternal-icu-calc.component';
import {ObesityIolCalcComponent} from '../obesity-iol-calc/obesity-iol-calc.component';
import {IolCalcComponent} from '../iol-calc/iol-calc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mat-icu-calc',
    pathMatch: 'full',
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
