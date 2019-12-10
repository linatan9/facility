import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { WellApprovesTableComponent } from './well-approves-table.component';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';

class FacilitiesServiceStub {}

describe('WellApprovesTableComponent', () => {
  let component: WellApprovesTableComponent;
  let fixture: ComponentFixture<WellApprovesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WellApprovesTableComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub }
      ]
    });

    fixture = TestBed.createComponent(WellApprovesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
