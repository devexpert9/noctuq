import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEventsPage } from './host-events.page';

describe('HostEventsPage', () => {
  let component: HostEventsPage;
  let fixture: ComponentFixture<HostEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
