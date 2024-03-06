/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CentersComponent } from './Centers.component';

describe('CentersComponent', () => {
  let component: CentersComponent;
  let fixture: ComponentFixture<CentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
