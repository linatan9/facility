import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilityColumnDecorationComponent } from './facility-column-decoration.component';

describe('FacilityColumnDecorationComponent', () => {
  let component: FacilityColumnDecorationComponent;
  let fixture: ComponentFixture<FacilityColumnDecorationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityColumnDecorationComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(FacilityColumnDecorationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
