import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FacilityEditButtonsComponent } from './facility-edit-buttons.component';
import { ConfirmModalService } from '../../shared/ui-components/confirm-modal';

class ConfirmModalServiceStub {}

describe('FacilityEditButtonsComponent', () => {
  let component: FacilityEditButtonsComponent;
  let fixture: ComponentFixture<FacilityEditButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityEditButtonsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ConfirmModalService, useClass: ConfirmModalServiceStub }
      ]
    });

    fixture = TestBed.createComponent(FacilityEditButtonsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
