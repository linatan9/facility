// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FlowlineDetailsComponent } from './flowline-details.component';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { FormBuilder } from '@angular/forms';
import { LoaderModalService } from '../../../shared/ui-components/loader-modal';

class FacilitiesServiceStub {}
class FormBuilderStub {}
class LoaderModalServiceStub {}

describe('FlowlineDetailsComponent', () => {
  let component: FlowlineDetailsComponent;
  let fixture: ComponentFixture<FlowlineDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowlineDetailsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        { provide: FormBuilder, useClass: FormBuilderStub },
        { provide: LoaderModalService, useClass: LoaderModalServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FlowlineDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
