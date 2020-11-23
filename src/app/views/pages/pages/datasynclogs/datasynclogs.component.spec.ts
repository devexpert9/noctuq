import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasynclogsComponent } from './datasynclogs.component';

describe('DatasynclogsComponent', () => {
  let component: DatasynclogsComponent;
  let fixture: ComponentFixture<DatasynclogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasynclogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasynclogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
