import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeventtypeComponent } from './addeventtype.component';

describe('AddeventtypeComponent', () => {
  let component: AddeventtypeComponent;
  let fixture: ComponentFixture<AddeventtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeventtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
