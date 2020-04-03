import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { CalculatorResultRowComponent } from './calculator-result-row.component';

@NgModule({
  declarations: [CalculatorComponent, CalculatorResultRowComponent],
    exports: [
        CalculatorComponent,
        CalculatorResultRowComponent
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
