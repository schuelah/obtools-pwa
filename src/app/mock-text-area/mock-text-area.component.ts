import {Component} from '@angular/core';

@Component({
  selector: 'app-mock-text-area',
  template: '<div class="mock-textarea" contenteditable="true"><ng-content></ng-content></div>',
  styles: [
      `
      .mock-textarea {
        background-color: #ffffff;
        border: 1px solid gray;
        overflow-x: auto;
        overflow-y: auto;
        padding: 8px;
        resize: both;
      }
    `
  ]
})
export class MockTextAreaComponent {

  constructor() {
  }
}
