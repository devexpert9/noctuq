import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeventtypeComponent } from './editeventtype.component';

describe('EditeventtypeComponent', () => {
  let component: EditeventtypeComponent;
  let fixture: ComponentFixture<EditeventtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeventtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeventtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
