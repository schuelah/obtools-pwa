import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IolCalcComponent } from './iol-calc.component';
import {CalculatorModule} from '../calculator/calculator.module';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MockTextAreaModule} from '../mock-text-area/mock-text-area.module';
import {ReferenceModule} from '../reference/reference.module';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {ButtonGroupModule} from '../button-group/button-group.module';
import {ToolsModule} from '../tools/tools.module';
import {MatTableModule} from '@angular/material/table';

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
    ToolsModule,
    MatTableModule
  ]
})
export class IolCalcModule {
}
