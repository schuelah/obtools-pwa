import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  @Input() value = 0;
  @Input() title = 'Calculator';
  @Input() label = 'Result';

  calcHeader: any;
  stickyOffset: number;
  isStuck = false;

  constructor() {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    console.log('Scroll Event: isStuck: ' + this.isStuck + ', offset: ' + window.pageYOffset);

    if (!this.isStuck && window.pageYOffset > this.stickyOffset) {
      this.calcHeader.classList.add('sticky');
      this.isStuck = true;
      console.log('added sticky');
    } else if (this.isStuck && window.pageYOffset <= this.stickyOffset) {
      this.calcHeader.classList.remove('sticky');
      this.isStuck = false;
      console.log('removed sticky');
    }
  }

  ngOnInit(): void {
    this.calcHeader = document.getElementById('calcHeader');
    this.stickyOffset = this.calcHeader.offsetTop;

    console.log(this.stickyOffset);
  }

  ngOnDestroy(): void {

    // window.removeEventListener('scroll', this.scroll, true)
  }

  scroll = (): void => {
    // console.log('Scroll Event inside scroll function')
  }

}
