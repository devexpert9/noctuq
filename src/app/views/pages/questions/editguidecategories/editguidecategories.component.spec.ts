import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditguidecategoriesComponent } from './editguidecategories.component';

describe('EditguidecategoriesComponent', () => {
  let component: EditguidecategoriesComponent;
  let fixture: ComponentFixture<EditguidecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditguidecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditguidecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
