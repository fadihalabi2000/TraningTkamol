/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReservatonComponent } from './Reservaton.component';

describe('ReservatonComponent', () => {
  let component: ReservatonComponent;
  let fixture: ComponentFixture<ReservatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
