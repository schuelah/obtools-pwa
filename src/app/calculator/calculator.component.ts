import {Component, Input, OnInit} from '@angular/core';

export interface CalculatorResult {
  label: string;
  valueText: string;
  value?: number;
  showProgressBar?: boolean;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() title = 'Calculator';
  @Input() value = 0;
  @Input() label = 'Result';
  @Input() valueText = 'Result';
  @Input() showProgressBar = false;
  isNaN = Number.isNaN;
  // @Input() value: CalculatorResult;

  constructor() {
  }

  ngOnInit(): void {

  }
}
