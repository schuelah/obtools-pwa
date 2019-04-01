import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreEclampsiaCalcComponent } from './pre-eclampsia-calc.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [PreEclampsiaCalcComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class PreEclampsiaCalcModule { }
