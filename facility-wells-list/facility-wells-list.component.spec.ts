// tslint:disable:max-classes-per-file
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilityWellsListComponent } from './facility-wells-list.component';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../../shared/testing-mocks/router-mocks/activated-route-stub';

class FacilitiesServiceStub { }
class RouterStub { }

describe('FacilityWellsListComponent', () => {
  let component: FacilityWellsListComponent;
  let fixture: ComponentFixture<FacilityWellsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityWellsListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
      ]
    });

    fixture = TestBed.createComponent(FacilityWellsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
