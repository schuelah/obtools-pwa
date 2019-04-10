import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  @Input() value = 0;
  @Input() title = 'Calculator';
  @Input() label = 'Result';

  constructor() {
  }
}
