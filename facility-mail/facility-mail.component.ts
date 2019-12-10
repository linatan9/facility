import { Component, Inject, OnInit } from '@angular/core';
import { MODAL_SERVICE } from '../../shared/ui-components/modal/modal-service.token';
import { ModalService } from '../../shared/ui-components/modal';
import { Facility } from '../../core/repositories/facilities/facility.entity';
import { FacilityMailViews } from '../../core/repositories/facilities/facility-mail/facility-mail-views.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FacilityMailService } from '../../core/domain/facilities/facility-mail/facility-mail.service';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'facility-mail',
  templateUrl: './facility-mail.component.html',
  styleUrls: ['./facility-mail.component.scss']
})
export class FacilityMailComponent implements OnInit {
  facility: Facility;
  selectedView = FacilityMailViews.mailGroupsSelection;
  facilityMailForm: FormGroup;
  sendMailErrorMessage = '';

  constructor(
    @Inject(MODAL_SERVICE) private modalService: ModalService,
    private fb: FormBuilder,
    private facilityMailService: FacilityMailService,
    private loaderModalService: LoaderModalService,
    private facilitiesService: FacilitiesService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.facilityMailForm = this.fb.group({
      to: new FormControl([]),
      subject: new FormControl(''),
      body: new FormControl(''),
    });
  }

  closeDialog() {
    this.modalService.hideModal();
  }

  setMailTemplateView(): void {
    this.selectedView = FacilityMailViews.mailTemplate;
  }

  setMailGroupSelectionView(): void {
    this.selectedView = FacilityMailViews.mailGroupsSelection;
  }

  isMailGroupSelectionView(): boolean {
    return this.selectedView === FacilityMailViews.mailGroupsSelection;
  }

  isMailTemplateView(): boolean {
    return this.selectedView === FacilityMailViews.mailTemplate;
  }

  sendMail(): void {
    this.loaderModalService.open();

    this.facilityMailService.sendMail(this.facilityMailForm.value).subscribe(
      () => {
        this.sendMailErrorMessage = '';
        this.loaderModalService.close();
        this.facilitiesService.facilityEquipmentChanged.next();
        this.toastrService.success('E-Mail was sent', 'Success');
        this.closeDialog();
      },
      () => {
        this.sendMailErrorMessage = 'Failed to send e-mail';
        this.loaderModalService.close();
      }
    );
  }
}
