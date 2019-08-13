import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbookPage } from './handbook.page';

describe('HandbookPage', () => {
  let component: HandbookPage;
  let fixture: ComponentFixture<HandbookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandbookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
