import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplacetypeComponent } from './editplacetype.component';

describe('EditplacetypeComponent', () => {
  let component: EditplacetypeComponent;
  let fixture: ComponentFixture<EditplacetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplacetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplacetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
