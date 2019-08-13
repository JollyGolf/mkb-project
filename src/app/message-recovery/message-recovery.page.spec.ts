import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecoveryPage } from './message-recovery.page';

describe('MessageRecoveryPage', () => {
  let component: MessageRecoveryPage;
  let fixture: ComponentFixture<MessageRecoveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageRecoveryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
