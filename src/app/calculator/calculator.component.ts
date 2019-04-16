import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  @Input() value = 'pending';
  @Input() title = 'Calculator';
  @Input() label = 'Result';

  constructor() {
  }
}
