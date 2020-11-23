import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtypesComponent } from './eventtypes.component';

describe('EventtypesComponent', () => {
  let component: EventtypesComponent;
  let fixture: ComponentFixture<EventtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventtypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
