import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordRecoveryPage } from './new-password-recovery.page';

describe('NewPasswordRecoveryPage', () => {
  let component: NewPasswordRecoveryPage;
  let fixture: ComponentFixture<NewPasswordRecoveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordRecoveryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
