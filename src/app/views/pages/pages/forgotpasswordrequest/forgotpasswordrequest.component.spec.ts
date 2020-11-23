import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordrequestComponent } from './forgotpasswordrequest.component';

describe('ForgotpasswordrequestComponent', () => {
  let component: ForgotpasswordrequestComponent;
  let fixture: ComponentFixture<ForgotpasswordrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotpasswordrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
