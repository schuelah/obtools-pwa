import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreEclampsiaCalcComponent} from '../pre-eclampsia-calc/pre-eclampsia-calc.component';
import {MaternalIcuCalcComponent} from '../maternal-icu-calc/maternal-icu-calc.component';

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
    path: 'pe-cs-calc',
    component: PreEclampsiaCalcComponent,
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
