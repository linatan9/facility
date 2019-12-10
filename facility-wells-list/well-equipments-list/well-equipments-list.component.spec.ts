import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellEquipmentsListComponent } from './well-equipments-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';

class FacilitiesServiceStub {}

describe('WellEquipmentsListComponent', () => {
  let component: WellEquipmentsListComponent;
  let fixture: ComponentFixture<WellEquipmentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ WellEquipmentsListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilitiesService, useClass: FacilitiesServiceStub }
      ]
    });

    fixture = TestBed.createComponent(WellEquipmentsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
