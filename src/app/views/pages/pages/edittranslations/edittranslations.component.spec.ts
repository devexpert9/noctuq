import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittranslationsComponent } from './edittranslations.component';

describe('EdittranslationsComponent', () => {
  let component: EdittranslationsComponent;
  let fixture: ComponentFixture<EdittranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
