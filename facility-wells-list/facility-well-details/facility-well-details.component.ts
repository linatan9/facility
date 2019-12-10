import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { FacilityWell } from '../../../core/repositories/facilities/facility-well/facility-well.entity';
import { FormGroup } from '@angular/forms';
import {
  FacilityApprovesKey,
  FacilityApprovesTableTitles
} from '../../../core/repositories/facilities/facility-approves/facility-approves.enum';
import { FacilityApproves } from '../../../core/repositories/facilities/facility-approves/facility-approves.entity';
import { FacilityFormApproves } from '../../../core/repositories/facilities/facility-form-approves.interface';
import { LoaderModalService } from '../../../shared/ui-components/loader-modal';


@Component({
  selector: 'pna-ui-facility-well-details',
  templateUrl: './facility-well-details.component.html',
  styleUrls: ['./facility-well-details.component.scss']
})
export class FacilityWellDetailsComponent implements OnDestroy, OnChanges {
  private subscriptions: Subscription = new Subscription();
  @Input() facilityWell: FacilityWell;
  wellForm: FormGroup;
  facilityApprovesTableTitles = FacilityApprovesTableTitles;
  isCutApprovesChanged = false;
  isFlowlineRemovalApprovesChanged = false;
  cutApprovesList: FacilityApproves[] = [];
  flowlineRemovalList: FacilityApproves[] = [];
  isAbdnDataChanged = false;

  constructor(
    private facilitiesService: FacilitiesService,
    private loaderModalService: LoaderModalService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
    this.cutApprovesChanged();
    this.flowlineRemovalApprovesChanged();
    this.facilityWellAbdnDataChanged();
  }

  cutApprovesChanged() {
    this.subscriptions.add(
      this.facilitiesService.facilityWellFormGroup.get(FacilityApprovesKey.cutCapApprovals).valueChanges
      .subscribe(() => this.isCutApprovesChanged = true)
    );
  }

  flowlineRemovalApprovesChanged() {
    this.subscriptions.add(
      this.facilitiesService.facilityWellFormGroup.get(FacilityApprovesKey.flowlineRemovalApprovals).valueChanges
      .subscribe(() => this.isFlowlineRemovalApprovesChanged = true)
    );
  }

  facilityWellAbdnDataChanged() {
    this.subscriptions.add(this.facilitiesService.facilityWellFormGroup.get('abdn').valueChanges
      .subscribe(() => this.isAbdnDataChanged = true));
  }

  initForm() {
    this.isAbdnDataChanged = false;
    this.isCutApprovesChanged = false;
    this.isFlowlineRemovalApprovesChanged = false;

    this.facilitiesService.setKeyToEachApprove(
      this.facilityWell[FacilityApprovesKey.cutCapApprovals],
      FacilityApprovesKey.cutCapApprovals
    );
    this.facilitiesService.setKeyToEachApprove(
      this.facilityWell[FacilityApprovesKey.flowlineRemovalApprovals],
      FacilityApprovesKey.flowlineRemovalApprovals
    );
    this.facilitiesService.initFacilityWellFormGroup(this.facilityWell);
    this.wellForm = this.facilitiesService.facilityWellFormGroup;
  }

  update() {
    if (!this.facilitiesService.facilityWellFormGroup.valid) {
      return;
    }
    if (this.isAbdnDataChanged && !(this.isCutApprovesChanged || this.isFlowlineRemovalApprovesChanged)) {
      this.updateAbdnData();
    }
    if (!this.isAbdnDataChanged && (this.isCutApprovesChanged || this.isFlowlineRemovalApprovesChanged)) {
      this.updateApproves();
    }

    if (this.isAbdnDataChanged && (this.isCutApprovesChanged || this.isFlowlineRemovalApprovesChanged)) {
      this.updateBothApprovesAndAbdnData();
    }
  }

  updateBothApprovesAndAbdnData() {
    this.getApprovesList();
    this.loaderModalService.open();
    this.facilitiesService.updateFacilityWell(this.facilityWell.id, this.wellForm.get('abdn').get('comment').value).pipe(
        mergeMap(() => {
          return this.facilitiesService.updateFacilityWellApproves(this.facilityWell.id, this.cutApprovesList, this.flowlineRemovalList);
        })
      ).subscribe(() => {
      this.loaderModalService.close();
      this.facilitiesService.facilityEquipmentChanged.next();
      });
  }

  updateAbdnData() {
    this.loaderModalService.open();
    this.facilitiesService.updateFacilityWell(this.facilityWell.id, this.wellForm.get('abdn').get('comment').value)
      .subscribe(() => {
        this.isAbdnDataChanged = false;
        this.loaderModalService.close();
        this.facilitiesService.facilityEquipmentChanged.next();
      });
  }

  updateApproves() {
    this.getApprovesList();
    this.loaderModalService.open();
    this.facilitiesService.updateFacilityWellApproves(this.facilityWell.id, this.cutApprovesList, this.flowlineRemovalList)
      .subscribe(() => {
        this.isFlowlineRemovalApprovesChanged = false;
        this.isCutApprovesChanged = false;
        this.loaderModalService.close();
        this.facilitiesService.facilityEquipmentChanged.next();
      });
  }

  approvesFormValueToList(approves: FacilityFormApproves): FacilityApproves[] {
   return Object.keys(approves).map((approveKey: string) => {
     return approves[approveKey];
   });
  }

  getApprovesList() {
    const cutApproves = this.wellForm.get(FacilityApprovesKey.cutCapApprovals).value;
    const flowLineRemovalApproves = this.wellForm.get(FacilityApprovesKey.flowlineRemovalApprovals).value;
    this.cutApprovesList = this.approvesFormValueToList(cutApproves);
    this.flowlineRemovalList = this.approvesFormValueToList(flowLineRemovalApproves);
  }

  reset() {
    this.initForm();
    this.facilitiesService.facilityWellFormReset.next();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
