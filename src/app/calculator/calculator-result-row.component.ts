import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calculator-result-row',
  templateUrl: './calculator-result-row.component.html',
  styleUrls: ['./calculator-result-row.component.css']
})
export class CalculatorResultRowComponent implements OnInit {
  @Input() value = 0;
  @Input() label = 'Result';
  @Input() valueText = 'Result';
  @Input() showProgressBar = false;
  isNaN = Number.isNaN;
  constructor() { }

  ngOnInit() {
  }

}
