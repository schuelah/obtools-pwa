import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreEclampsiaCalcComponent } from './pre-eclampsia-calc.component';
import {MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatSliderModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ButtonGroupModule} from '../button-group/button-group.module';

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
  ]
})
export class PreEclampsiaCalcModule { }
