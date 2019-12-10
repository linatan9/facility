// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilityWellDetailsComponent } from './facility-well-details.component';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { LoaderModalService } from '../../../shared/ui-components/loader-modal';

class FacilitiesServiceStub {}
class LoaderModalServiceStub {}

describe('FacilityWellDetailsComponent', () => {
  let component: FacilityWellDetailsComponent;
  let fixture: ComponentFixture<FacilityWellDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityWellDetailsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        { provide: LoaderModalService, useClass: LoaderModalServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FacilityWellDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
