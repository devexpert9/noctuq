import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChatsPage } from './my-chats.page';

describe('MyChatsPage', () => {
  let component: MyChatsPage;
  let fixture: ComponentFixture<MyChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
