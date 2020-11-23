import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetweatherinfoComponent } from './setweatherinfo.component';

describe('SetweatherinfoComponent', () => {
  let component: SetweatherinfoComponent;
  let fixture: ComponentFixture<SetweatherinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetweatherinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetweatherinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
