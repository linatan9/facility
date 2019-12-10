// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailsTableComponent } from './equipment-details-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';

class FacilitiesServiceStub {}
class LoaderModalServiceStub {}

describe('EquipmentDetailsTableComponent', () => {
  let component: EquipmentDetailsTableComponent;
  let fixture: ComponentFixture<EquipmentDetailsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentDetailsTableComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        { provide: LoaderModalService, useClass: LoaderModalServiceStub }
      ]
    });

    fixture = TestBed.createComponent(EquipmentDetailsTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
