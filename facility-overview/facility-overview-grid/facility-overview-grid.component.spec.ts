import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityOverviewGridComponent } from './facility-overview-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';

class FacilitiesServiceStub {}

describe('FacilityOverviewGridComponent', () => {
  let component: FacilityOverviewGridComponent;
  let fixture: ComponentFixture<FacilityOverviewGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityOverviewGridComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FacilityOverviewGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
