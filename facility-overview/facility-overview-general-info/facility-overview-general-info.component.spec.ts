import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityOverviewGeneralInfoComponent } from './facility-overview-general-info.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FacilityOverviewGeneralInfoComponent', () => {
  let component: FacilityOverviewGeneralInfoComponent;
  let fixture: ComponentFixture<FacilityOverviewGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityOverviewGeneralInfoComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(FacilityOverviewGeneralInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
