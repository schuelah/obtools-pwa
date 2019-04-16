import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StopPropagationDirective} from './stop-propagation.directive';

@NgModule({
  declarations: [
    StopPropagationDirective,
  ],
  exports: [
    StopPropagationDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ToolsModule { }
