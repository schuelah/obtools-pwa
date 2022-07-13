import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmiCalculatorComponent } from './bmi-calculator.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
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
    MatSliderModule,
  ]
})
export class BmiCalculatorModule { }
