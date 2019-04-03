import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonGroupComponent} from './button-group.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    ButtonGroupComponent,
  ],
  exports: [
    ButtonGroupComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class ButtonGroupModule { }
