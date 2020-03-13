import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsPage } from './venue-details.page';

describe('VenueDetailsPage', () => {
  let component: VenueDetailsPage;
  let fixture: ComponentFixture<VenueDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
