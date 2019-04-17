import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTextAreaComponent } from './mock-text-area.component';

describe('MockTextAreaComponent', () => {
  let component: MockTextAreaComponent;
  let fixture: ComponentFixture<MockTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
