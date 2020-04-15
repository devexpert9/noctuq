import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfilePage } from './host-profile.page';

describe('HostProfilePage', () => {
  let component: HostProfilePage;
  let fixture: ComponentFixture<HostProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
