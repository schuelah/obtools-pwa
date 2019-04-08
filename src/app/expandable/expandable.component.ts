import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

/** Time and timing curve for expansion panel animations. */
export const EXPANDABLE_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.css'],
  animations: [trigger('changeDivSize', [
      state('closed', style({
        visibility: 'hidden',
        height: '0',
      })),
      state('open', style({
        visibility: 'visible',
        height: '*',
      })),
      transition('closed<=>open', animate(EXPANDABLE_ANIMATION_TIMING)),
    ]),
  ]
})
export class ExpandableComponent implements OnInit {
  @Input() isExpanded: false;
  currentState = 'closed';

  changeState() {
    this.currentState = this.currentState === 'open' ? 'closed' : 'open';
  }

  constructor() { }

  ngOnInit() { }

  getCurrentState() {
    return (this.isExpanded ? 'open' : 'closed');
  }

  _getExpandedState() {
    return this.isExpanded ? 'open' : 'closed';
  }
}
