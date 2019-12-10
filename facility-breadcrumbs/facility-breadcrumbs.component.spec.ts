import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FacilityBreadcrumbsComponent } from './facility-breadcrumbs.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';

class FacilitiesServiceStub {
  onFacilityBreadcrumbChanged = () => of({});
}

describe('FacilityBreadcrumbsComponent', () => {
  let component: FacilityBreadcrumbsComponent;
  let fixture: ComponentFixture<FacilityBreadcrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityBreadcrumbsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FacilityBreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
