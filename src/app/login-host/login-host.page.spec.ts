import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHostPage } from './login-host.page';

describe('LoginHostPage', () => {
  let component: LoginHostPage;
  let fixture: ComponentFixture<LoginHostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
