import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthTestComponent } from './oauth-test.component';

describe('OauthTestComponent', () => {
  let component: OauthTestComponent;
  let fixture: ComponentFixture<OauthTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
