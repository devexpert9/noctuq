import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplacetypeComponent } from './addplacetype.component';

describe('AddplacetypeComponent', () => {
  let component: AddplacetypeComponent;
  let fixture: ComponentFixture<AddplacetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplacetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplacetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
