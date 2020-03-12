import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaternalIcuCalcComponent } from './maternal-icu-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ExpandableModule} from '../expandable/expandable.module';
import {BmiCalculatorModule} from '../expandable-bmi-calculator/bmi-calculator.module';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ToolsModule} from '../tools/tools.module';
import {MockTextAreaModule} from '../mock-text-area/mock-text-area.module';
import {ReferenceModule} from '../reference/reference.module';

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
    MockTextAreaModule,
    ReferenceModule,
    ReactiveFormsModule,
  ]
})
export class MaternalIcuCalcModule { }
