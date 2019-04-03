import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-eclampsia-calc',
  templateUrl: './pre-eclampsia-calc.component.html',
  styleUrls: ['./pre-eclampsia-calc.component.css']
})
export class PreEclampsiaCalcComponent implements OnInit {

  dilationScore = 1;
  effacementScore = 0;
  stationScore = 0;
  ga = 40;
  race = 'other';
  bmi = 20;
  prior = false;

  cm = 160;
  kg = 60;

  dilationOptions = ['CLOSED', '1-2cm', '3-4cm', '&ge;5cm'];
  effacementOptions = ['0-30%', '40-50%', '60-70%', '&ge;80%'];
  stationOptions = ['-3', '-2', '-1, 0', '+1, +2'];

  constructor() { }

  ngOnInit() {
  }

  setDilationScore(score: number) {
    this.dilationScore = score;
  }

  getBishopScore() {
    return this.dilationScore + this.stationScore + this.effacementScore;
  }
}
