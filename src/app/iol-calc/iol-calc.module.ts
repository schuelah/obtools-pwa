import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IolCalcComponent } from './iol-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';
import {MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatRippleModule} from '@angular/material';
import {MockTextAreaModule} from '../mock-text-area/mock-text-area.module';
import {ReferenceModule} from '../reference/reference.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ToolsModule} from '../tools/tools.module';

@NgModule({
  declarations: [IolCalcComponent],
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
    FlexModule,
    FlexLayoutModule,
    ButtonGroupModule,
    ToolsModule
  ]
})
export class IolCalcModule {
}
