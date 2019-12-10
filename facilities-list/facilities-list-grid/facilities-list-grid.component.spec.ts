import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { FacilitiesListGridComponent } from './facilities-list-grid.component';

class RouterStub {}

describe('FacilitiesListGridComponent', () => {
  let component: FacilitiesListGridComponent;
  let fixture: ComponentFixture<FacilitiesListGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesListGridComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(FacilitiesListGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
