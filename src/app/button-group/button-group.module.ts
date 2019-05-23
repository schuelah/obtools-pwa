import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonGroupComponent} from './button-group.component';
import {MatButtonModule} from '@angular/material';
import {ButtonGroupYesNoComponent} from '../button-group-yes-no/button-group-yes-no.component';

@NgModule({
  declarations: [
    ButtonGroupComponent,
    ButtonGroupYesNoComponent
  ],
  exports: [
    ButtonGroupComponent,
    ButtonGroupYesNoComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class ButtonGroupModule { }
