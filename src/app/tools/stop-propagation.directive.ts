import {Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  // https://netbasal.com/implementing-event-modifiers-in-angular-87e1a07969ce

  @Output() stopPropEvent = new EventEmitter();
  unsubscribe;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef) {
  }

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      this.element.nativeElement,
      'click',
      event => {
        console.log('appStopPropagationTriggered');
        event.stopPropagation();
        this.stopPropEvent.emit(event);
      });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
