import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObesityIolCalcComponent } from './obesity-iol-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MockTextAreaModule} from '../mock-text-area/mock-text-area.module';
import {ReferenceModule} from '../reference/reference.module';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ObesityIolCalcComponent],
  imports: [
    CommonModule,
    CalculatorModule,
    MatDividerModule,
    MatListModule,
    MockTextAreaModule,
    ReferenceModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    FlexModule
  ]
})
export class ObesityIolCalcModule {
}
