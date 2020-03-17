import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

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
  // @Input() value = 0;
  @Input() title = 'Calculator';
  // @Input() label = 'Result';
  // @Input() valueText = 'Result';
  // @Input() showProgressBar = false;
  isNaN = Number.isNaN;
  @Input() values: CalculatorResult[];

  constructor() {
  }

  ngOnInit(): void {

  }
}
