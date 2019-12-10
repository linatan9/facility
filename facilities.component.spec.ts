import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilitiesComponent } from './facilities.component';
import { FacilitiesService } from '../core/domain/facilities/facilities.service';
import { LoaderModalService } from '../shared/ui-components/loader-modal';
import { LoaderServiceStub } from '../shared/testing-mocks/loader-modal-service';

class FacilitiesServiceStub {}

describe('FacilitiesComponent', () => {
  let component: FacilitiesComponent;
  let fixture: ComponentFixture<FacilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        {provide: LoaderModalService, useClass: LoaderServiceStub},
      ]
    });

    fixture = TestBed.createComponent(FacilitiesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
