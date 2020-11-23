import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvenueComponent } from './editvenue.component';

describe('EditvenueComponent', () => {
  let component: EditvenueComponent;
  let fixture: ComponentFixture<EditvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
