import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidecategoriesComponent } from './guidecategories.component';

describe('GuidecategoriesComponent', () => {
  let component: GuidecategoriesComponent;
  let fixture: ComponentFixture<GuidecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
