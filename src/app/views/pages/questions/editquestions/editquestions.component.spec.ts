import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditquestionsComponent } from './editquestions.component';

describe('EditquestionsComponent', () => {
  let component: EditquestionsComponent;
  let fixture: ComponentFixture<EditquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
