import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreEclampsiaCalcComponent } from './pre-eclampsia-calc.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ExpandableModule} from '../expandable/expandable.module';
import {CalculatorModule} from '../calculator/calculator.module';
import {BmiCalculatorModule} from '../expandable-bmi-calculator/bmi-calculator.module';
import {ReferenceModule} from '../reference/reference.module';
import {MockTextAreaModule} from '../mock-text-area/mock-text-area.module';

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
    MatDividerModule,
    MockTextAreaModule,
  ]
})
export class PreEclampsiaCalcModule { }
