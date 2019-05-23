import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})

export class ButtonGroupComponent {
  selectedIndex = 0;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  get value() {
    return this.selectedIndex;
  }

  set value(val) {
    this.selectedIndex = val;
    this.valueChange.emit(this.selectedIndex);
  }

  @Input() labels = [];

  constructor() { }

  setValue(value: number) {
    this.value = value;
  }
}
