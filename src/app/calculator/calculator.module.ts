import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [CalculatorComponent],
  exports: [
    CalculatorComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatProgressBarModule,
        FlexModule,
        FlexLayoutModule
    ]
})
export class CalculatorModule { }
