import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddslideComponent } from './addslide.component';

describe('AddslideComponent', () => {
  let component: AddslideComponent;
  let fixture: ComponentFixture<AddslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
