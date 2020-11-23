import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditslideComponent } from './editslide.component';

describe('EditslideComponent', () => {
  let component: EditslideComponent;
  let fixture: ComponentFixture<EditslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
