import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsliderimagesComponent } from './eventsliderimages.component';

describe('EventsliderimagesComponent', () => {
  let component: EventsliderimagesComponent;
  let fixture: ComponentFixture<EventsliderimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsliderimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsliderimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
