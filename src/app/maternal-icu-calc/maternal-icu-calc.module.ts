import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaternalIcuCalcComponent } from './maternal-icu-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ExpandableModule} from '../expandable/expandable.module';
import {BmiCalculatorModule} from '../expandable-bmi-calculator/bmi-calculator.module';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ToolsModule} from '../tools/tools.module';

@NgModule({
  declarations: [MaternalIcuCalcComponent],
  imports: [
    CommonModule,
    CalculatorModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatListModule,
    MatSliderModule,
    ExpandableModule,
    BmiCalculatorModule,
    MatButtonModule,
    ButtonGroupModule,
    MatRippleModule,

    ToolsModule,
    MatCardModule,
    MatCheckboxModule,
  ]
})
export class MaternalIcuCalcModule { }
