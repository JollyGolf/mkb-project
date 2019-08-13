import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSignUpPage } from './success-sign-up.page';

describe('SuccessSignUpPage', () => {
  let component: SuccessSignUpPage;
  let fixture: ComponentFixture<SuccessSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessSignUpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
