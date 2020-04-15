import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfilePage } from './public-profile.page';

describe('PublicProfilePage', () => {
  let component: PublicProfilePage;
  let fixture: ComponentFixture<PublicProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
