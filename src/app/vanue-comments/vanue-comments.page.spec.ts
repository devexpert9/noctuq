import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanueCommentsPage } from './vanue-comments.page';

describe('VanueCommentsPage', () => {
  let component: VanueCommentsPage;
  let fixture: ComponentFixture<VanueCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanueCommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanueCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
