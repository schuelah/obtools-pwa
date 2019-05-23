import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-group-yes-no',
  templateUrl: './button-group-yes-no.component.html',
  styleUrls: ['./button-group-yes-no.component.css']
})
export class ButtonGroupYesNoComponent implements OnInit {
  selectedIndex = -1;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  get value(): number {
    return this.translateSelectedIndexToValue(this.selectedIndex);
  }

  set value(val: number) {
    // Yes/No reverses the value so that "Yes" is first
    this.selectedIndex = this.translateSelectedIndexToValue(val);
    this.valueChange.emit(val);
  }

  private translateSelectedIndexToValue(index: number): number {
    if (index === 0) {
      return 1;
    }

    if (index === 1) {
      return 0;
    }

    return index;
  }

  constructor() { }

  ngOnInit() {
  }

  fromChild() {
    console.log('fromChild called');
  }
}
