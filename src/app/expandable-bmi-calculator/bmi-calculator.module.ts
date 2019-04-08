import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmiCalculatorComponent } from './bmi-calculator.component';
import {MatInputModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [BmiCalculatorComponent],
  exports: [
    BmiCalculatorComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
  ]
})
export class BmiCalculatorModule { }
