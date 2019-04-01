import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreEclampsiaCalcComponent} from '../pre-eclampsia-calc/pre-eclampsia-calc.component';

const routes: Routes = [
  {
    path: '',
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
