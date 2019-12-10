import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import { FacilityMailService } from '../../../core/domain/facilities/facility-mail/facility-mail.service';
import { Facility } from '../../../core/repositories/facilities/facility.entity';
import { MailTemplateInfo } from '../../../core/repositories/facilities/facility-mail/mail-template-info.interface';

@Component({
  selector: 'pna-ui-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.scss']
})
export class MailTemplateComponent implements OnInit {
  @Input() facility: Facility;
  @Input() facilityMailForm: FormGroup;
  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean'],
      ['image']
    ]
  };
  constructor(
    private facilityMailService: FacilityMailService
  ) { }

  ngOnInit() {
    this.setDefaultFormValues();
  }

  setDefaultFormValues(): void {
    const templateInfo: MailTemplateInfo = this.facilityMailService.convertFacilityToMailTemplate(this.facility);

    if (!this.facilityMailForm.get('subject').value) {
      this.facilityMailForm.patchValue({
        subject: `${templateInfo.selectedWells.join(', ')} AFE#: add number, ROUTE: add route`,
      });
    }

    if (!this.facilityMailForm.get('body').value) {
      this.facilityMailForm.patchValue({
        body: templateInfo.template
      });
    }
  }
}
