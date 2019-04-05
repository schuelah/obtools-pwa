import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {MatProgressBarModule, MatToolbarModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [CalculatorComponent],
  exports: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    FlexModule
  ]
})
export class CalculatorModule { }
