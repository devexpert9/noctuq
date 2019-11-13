import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsPrivacyPage } from './terms-privacy.page';

describe('TermsPrivacyPage', () => {
  let component: TermsPrivacyPage;
  let fixture: ComponentFixture<TermsPrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsPrivacyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
