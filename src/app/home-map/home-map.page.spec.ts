import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMapPage } from './home-map.page';

describe('HomeMapPage', () => {
  let component: HomeMapPage;
  let fixture: ComponentFixture<HomeMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
