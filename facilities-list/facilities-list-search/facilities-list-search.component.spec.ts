import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilitiesListSearchComponent } from './facilities-list-search.component';

describe('FacilitiesListSearchComponent', () => {
  let component: FacilitiesListSearchComponent;
  let fixture: ComponentFixture<FacilitiesListSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesListSearchComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(FacilitiesListSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
