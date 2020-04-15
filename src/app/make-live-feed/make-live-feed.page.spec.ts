import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeLiveFeedPage } from './make-live-feed.page';

describe('MakeLiveFeedPage', () => {
  let component: MakeLiveFeedPage;
  let fixture: ComponentFixture<MakeLiveFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeLiveFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeLiveFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
