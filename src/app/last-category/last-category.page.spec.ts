import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastCategoryPage } from './last-category.page';

describe('LastCategoryPage', () => {
  let component: LastCategoryPage;
  let fixture: ComponentFixture<LastCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
