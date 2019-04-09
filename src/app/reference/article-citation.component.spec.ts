import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCitationComponent } from './article-citation.component';

describe('ArticleCitationComponent', () => {
  let component: ArticleCitationComponent;
  let fixture: ComponentFixture<ArticleCitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
