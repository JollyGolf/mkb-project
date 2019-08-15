import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessPage } from './illness.page';

describe('IllnessPage', () => {
  let component: IllnessPage;
  let fixture: ComponentFixture<IllnessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
