// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { FacilityMailComponent } from './facility-mail.component';
import { MODAL_SERVICE } from '../../shared/ui-components/modal/modal-service.token';
import { ModalServiceStub } from '../../shared/testing-mocks/modal-service';
import { FacilityMailService } from '../../core/domain/facilities/facility-mail/facility-mail.service';
import { FacilityMailServiceStub } from '../../shared/testing-mocks/facility-mocks/facility-mail';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';
import { LoaderServiceStub } from '../../shared/testing-mocks/loader-modal-service';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';

class FormBuilderStub { }
class ToastrServiceStub { }

describe('FacilityMailComponent', () => {
  let component: FacilityMailComponent;
  let fixture: ComponentFixture<FacilityMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityMailComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: MODAL_SERVICE, useClass: ModalServiceStub },
        { provide: FormBuilder, useClass: FormBuilderStub },
        { provide: FacilityMailService, useClass: FacilityMailServiceStub },
        { provide: LoaderModalService, useClass: LoaderServiceStub },
        { provide: FacilitiesService, useClass: FacilityMailServiceStub },
        { provide: ToastrService, useClass: ToastrServiceStub },
      ]
    });

    fixture = TestBed.createComponent(FacilityMailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
