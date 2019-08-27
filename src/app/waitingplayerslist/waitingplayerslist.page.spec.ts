import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingplayerslistPage } from './waitingplayerslist.page';

describe('WaitingplayerslistPage', () => {
  let component: WaitingplayerslistPage;
  let fixture: ComponentFixture<WaitingplayerslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingplayerslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingplayerslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
