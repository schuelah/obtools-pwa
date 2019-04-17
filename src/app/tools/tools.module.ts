import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StopPropagationDirective} from './stop-propagation.directive';
import {FirstLettersPipe} from './first-letters.pipe';

@NgModule({
  declarations: [
    StopPropagationDirective,
    FirstLettersPipe,
  ],
  exports: [
    StopPropagationDirective,
    FirstLettersPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class ToolsModule { }
