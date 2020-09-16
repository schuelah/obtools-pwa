import { Component, OnInit } from '@angular/core';
import {previewCardData} from './preview.card-data';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  cards = previewCardData;

  constructor() { }

  ngOnInit(): void {
  }

}
