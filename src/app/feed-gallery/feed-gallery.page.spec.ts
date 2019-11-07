import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedGalleryPage } from './feed-gallery.page';

describe('FeedGalleryPage', () => {
  let component: FeedGalleryPage;
  let fixture: ComponentFixture<FeedGalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedGalleryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
