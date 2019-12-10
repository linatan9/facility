// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FacilityEquipmentsComponent } from './facility-equipments.component';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';
import { MODAL_SERVICE } from '../../shared/ui-components/modal/modal-service.token';
import { ModalServiceStub } from '../../shared/testing-mocks/modal-service';

class FacilitiesServiceStub {}
class LoaderModalServiceStub {}
class RouterStub {}
class ActivatedRouteStub {}

describe('FacilityEquipmentsComponent', () => {
  let component: FacilityEquipmentsComponent;
  let fixture: ComponentFixture<FacilityEquipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityEquipmentsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        { provide: LoaderModalService, useClass: LoaderModalServiceStub },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: MODAL_SERVICE, useClass: ModalServiceStub },
      ]
    });

    fixture = TestBed.createComponent(FacilityEquipmentsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
