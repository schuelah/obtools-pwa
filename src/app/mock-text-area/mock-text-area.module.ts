import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockTextAreaComponent } from './mock-text-area.component';

@NgModule({
  declarations: [MockTextAreaComponent],
  exports: [
    MockTextAreaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MockTextAreaModule { }
