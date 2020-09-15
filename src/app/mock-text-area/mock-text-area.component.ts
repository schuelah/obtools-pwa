import {Component} from '@angular/core';

@Component({
  selector: 'app-mock-text-area',
  template: '<div class="mock-textarea" contenteditable="true"><ng-content></ng-content></div>',
  styleUrls: [ './mock-text-area.component.scss']
})
export class MockTextAreaComponent {

  constructor() {
  }
}
