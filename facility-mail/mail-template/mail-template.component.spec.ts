import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTemplateComponent } from './mail-template.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FacilityMailService } from '../../../core/domain/facilities/facility-mail/facility-mail.service';
import { FacilityMailServiceStub } from '../../../shared/testing-mocks/facility-mocks/facility-mail';

describe('MailTemplateComponent', () => {
  let component: MailTemplateComponent;
  let fixture: ComponentFixture<MailTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MailTemplateComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: FacilityMailService, useClass: FacilityMailServiceStub }
      ]
    });

    fixture = TestBed.createComponent(MailTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
