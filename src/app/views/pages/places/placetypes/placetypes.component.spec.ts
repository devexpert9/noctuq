import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacetypesComponent } from './placetypes.component';

describe('PlacetypesComponent', () => {
  let component: PlacetypesComponent;
  let fixture: ComponentFixture<PlacetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
