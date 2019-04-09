import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreEclampsiaCalcComponent } from './pre-eclampsia-calc.component';
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatProgressBarModule,
  MatSliderModule,
  MatSlideToggleModule, MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ExpandableModule} from '../expandable/expandable.module';
import {CalculatorModule} from '../calculator/calculator.module';
import {BmiCalculatorModule} from '../expandable-bmi-calculator/bmi-calculator.module';
import {ReferenceModule} from '../reference/reference.module';

@NgModule({
  declarations: [PreEclampsiaCalcComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,

    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,

    ButtonGroupModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatProgressBarModule,
    ExpandableModule,
    CalculatorModule,
    BmiCalculatorModule,
    ReferenceModule,
  ]
})
export class PreEclampsiaCalcModule { }
