import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenuePage } from './add-venue.page';

describe('AddVenuePage', () => {
  let component: AddVenuePage;
  let fixture: ComponentFixture<AddVenuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVenuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVenuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
