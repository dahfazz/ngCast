/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgCastComponent } from './ng-cast.component';

describe('NgCastComponent', () => {
  let component: NgCastComponent;
  let fixture: ComponentFixture<NgCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
