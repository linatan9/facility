import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MailGroupSelectComponent } from './mail-group-select.component';
import { FacilityMailService } from '../../../core/domain/facilities/facility-mail/facility-mail.service';
import { FacilityMailServiceStub } from '../../../shared/testing-mocks/facility-mocks/facility-mail';
import { MatTreeModule } from '@angular/material';

describe('MailGroupSelectComponent', () => {
  let component: MailGroupSelectComponent;
  let fixture: ComponentFixture<MailGroupSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MailGroupSelectComponent ],
      imports: [ MatTreeModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilityMailService, useClass: FacilityMailServiceStub }
      ]
    });

    fixture = TestBed.createComponent(MailGroupSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
