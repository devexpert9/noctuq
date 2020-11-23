import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplaceComponent } from './addplace.component';

describe('AddplaceComponent', () => {
  let component: AddplaceComponent;
  let fixture: ComponentFixture<AddplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
