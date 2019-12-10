import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityOverviewComponent } from './facility-overview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';

class FacilitiesServiceStub {}

describe('FacilityOverviewComponent', () => {
  let component: FacilityOverviewComponent;
  let fixture: ComponentFixture<FacilityOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityOverviewComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(FacilityOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
