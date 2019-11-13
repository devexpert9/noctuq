import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveFeedPage } from './live-feed.page';

describe('LiveFeedPage', () => {
  let component: LiveFeedPage;
  let fixture: ComponentFixture<LiveFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
