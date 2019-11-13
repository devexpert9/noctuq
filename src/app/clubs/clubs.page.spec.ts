import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsPage } from './clubs.page';

describe('ClubsPage', () => {
  let component: ClubsPage;
  let fixture: ComponentFixture<ClubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
