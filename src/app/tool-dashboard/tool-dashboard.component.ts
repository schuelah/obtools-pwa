import { Component } from '@angular/core';
import {CARD_DATA} from './card-data';

@Component({
  selector: 'app-tool-dashboard',
  templateUrl: './tool-dashboard.component.html',
  styleUrls: ['./tool-dashboard.component.css']
})
export class ToolDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = CARD_DATA;

  constructor() {}
}
