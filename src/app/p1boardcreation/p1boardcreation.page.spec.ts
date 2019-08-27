import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P1boardcreationPage } from './p1boardcreation.page';

describe('P1boardcreationPage', () => {
  let component: P1boardcreationPage;
  let fixture: ComponentFixture<P1boardcreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P1boardcreationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P1boardcreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
