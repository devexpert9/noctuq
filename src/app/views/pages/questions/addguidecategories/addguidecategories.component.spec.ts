import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddguidecategoriesComponent } from './addguidecategories.component';

describe('AddguidecategoriesComponent', () => {
  let component: AddguidecategoriesComponent;
  let fixture: ComponentFixture<AddguidecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddguidecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddguidecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
