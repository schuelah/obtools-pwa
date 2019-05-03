import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObesityIolCalcComponent } from './obesity-iol-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';

@NgModule({
  declarations: [ObesityIolCalcComponent],
  imports: [
    CommonModule,
    CalculatorModule
  ]
})
export class ObesityIolCalcModule {
}
