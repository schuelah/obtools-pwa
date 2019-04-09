import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreEclampsiaCalcComponent} from '../pre-eclampsia-calc/pre-eclampsia-calc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pe-cs-calc',
    pathMatch: 'full',
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
