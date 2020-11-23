import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicbuttonComponent } from './magicbutton.component';

describe('MagicbuttonComponent', () => {
  let component: MagicbuttonComponent;
  let fixture: ComponentFixture<MagicbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
