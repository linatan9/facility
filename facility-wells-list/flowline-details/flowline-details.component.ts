// tslint:disable:no-null-keyword
import {
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FlowlineAbndStatuses } from '../../../core/repositories/facilities/flowline/flowline-abnd-status.enum';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { Flowline } from '../../../core/repositories/facilities/flowline/flowline-entity';
import { DateHelper } from '../../../shared/date-helper/date-helper';
import { LoaderModalService } from '../../../shared/ui-components/loader-modal';
import { FlowlineUpdate } from '../../../core/repositories/facilities/flowline/flowline-update.interface';
import { FacilityWell } from '../../../core/repositories/facilities/facility-well/facility-well.entity';
import { AdditionalAbandonedStatuses, AdditionalRemovedStatuses } from './additional-abdn-statuses-options.constants';
import { Subscription } from 'rxjs';

const COMMENT_MAX_LENGTH = 400;
const CUT_CAP_MAX_LENGTH = 500;

@Component({
  selector: 'pna-ui-flowline-details',
  templateUrl: './flowline-details.component.html',
  styleUrls: ['./flowline-details.component.scss']
})
export class FlowlineDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tooltipAbandoned', { read: ElementRef, static: false }) tooltipAbandonedVar: ElementRef;
  @ViewChild('tooltipRemoved', { read: ElementRef, static: false }) tooltipRemovedVar: ElementRef;
  @ViewChild('tooltipRetired', { read: ElementRef, static: false }) tooltipRetiredVar: ElementRef;
  @Input() flowline: Flowline;
  @Input() wellId: string;
  @Input() facilityWells: FacilityWell[];
  cutCapChangesSubscription = new Subscription();
  flowlineForm: FormGroup;
  flowlineAbndStatuses = FlowlineAbndStatuses;
  additionalRemovedStatuses = AdditionalRemovedStatuses;
  additionalAbandonedStatuses = AdditionalAbandonedStatuses;
  flowLineId: string;
  dateHelper = DateHelper;
  isCutCapCommentChanged = false;

  get cutCapDatePlaceholder(): string {
    return 'Cut & Cap Date';
  }

  get cutCapCommentPlaceholder(): string {
    return 'Cut & Cap Comment';
  }

  get cutCapDateValue(): string {
    const cutCapDates: string[] = [];
    const facilityWells = [...this.flowline.wells.map(well => well.id), this.wellId];
    facilityWells.forEach((wellId: string) => {
      const foundFacilityWell = this.facilityWells.find(
        facilityWell => facilityWell.id === wellId
      );
      if (foundFacilityWell && foundFacilityWell.cutCapDate) {
        cutCapDates.push(foundFacilityWell.cutCapDate);
      }
    });
    return cutCapDates.join(', ');
  }

  constructor(
    private formBuilder: FormBuilder,
    private facilitiesService: FacilitiesService,
    private loaderModalService: LoaderModalService
  ) {}

  ngOnInit(): void {
    this.flowLineId = this.flowline.id;
    this.initForm(this.flowline);
    this.catchCupCapCommentChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.flowLineId = this.flowline.id;
    this.initForm(this.flowline);
  }

  getStatusOfAdditionalAbandStatus(flowline: Flowline): FlowlineAbndStatuses {
    // tslint:disable-next-line
    if (flowline.abandStatus === this.flowlineAbndStatuses.REMOVED_FULL
      || flowline.abandStatus === this.flowlineAbndStatuses.REMOVED_PARTIAL) {
      return this.flowlineAbndStatuses.REMOVED;
    } else if (flowline.abandStatus === this.flowlineAbndStatuses.ABANDONED_FULL
      || flowline.abandStatus === this.flowlineAbndStatuses.ABANDONED_PARTIAL) {
      return this.flowlineAbndStatuses.ABANDONED;
    }
    return undefined;
  }

  isAbandStatus() {
    return this.flowlineForm.get('abandStatus').value || this.flowlineForm.get('additionalAbandStatus').value;
  }

  catchCupCapCommentChanges() {
    this.cutCapChangesSubscription = this.flowlineForm.get('cutCapComment').valueChanges.subscribe((value: string) => {
      if (value === this.flowline.cutCapComment || value === '' && !this.flowline.cutCapComment) {
        this.isCutCapCommentChanged = false;
      } else {
        this.isCutCapCommentChanged = true;
      }
    });
  }

  initForm(flowline: Flowline) {
    if (flowline) {
      const additionalAbandStatus = this.getStatusOfAdditionalAbandStatus(flowline);
       this.flowlineForm = this.formBuilder.group({
        returnDate: new FormControl(flowline.retDate),
        footage: new FormControl(flowline.footage, Validators.maxLength(COMMENT_MAX_LENGTH)),
        comment: new FormControl(flowline.comment, Validators.maxLength(COMMENT_MAX_LENGTH)),
        abandStatus: new FormControl(<FlowlineAbndStatuses>this.flowline.abandStatus, Validators.required),
        abandDate: new FormControl(flowline.abandDate),
        additionalAbandStatus: new FormControl(additionalAbandStatus),
        cutCapComment: new FormControl(this.flowline.cutCapComment, [Validators.maxLength(CUT_CAP_MAX_LENGTH)])
      });
    }
  }

  clearAbdnStatus() {
    this.flowlineForm.get('abandStatus').patchValue('');
  }

  clearAdditionalAbandStatus() {
    this.flowlineForm.get('additionalAbandStatus').patchValue('');
  }

  isNotOtherStatus(): boolean {
    return this.flowlineForm.get('abandStatus').value !== this.flowlineAbndStatuses.OTHER;
  }

  isOtherStatus(): boolean {
    return this.flowlineForm.get('abandStatus').value === this.flowlineAbndStatuses.OTHER;
  }

  isRetiredStatus(): boolean {
    return this.flowlineForm.get('abandStatus').value === this.flowlineAbndStatuses.RETIRED;
  }

  isAbandonedStatus(): boolean {
    return this.flowlineForm.get('additionalAbandStatus').value === this.flowlineAbndStatuses.ABANDONED;
  }

  isRemovedStatus(): boolean {
    return this.flowlineForm.get('additionalAbandStatus').value === this.flowlineAbndStatuses.REMOVED;
  }

  reset() {
    this.initForm(this.flowline);
  }

  update() {
    if (this.flowlineForm.invalid && !this.isCutCapCommentChanged) {
      return;
    }
    this.loaderModalService.open();
    const flowlineUpdate: FlowlineUpdate = {
      abandStatus: this.flowlineForm.get('abandStatus').value,
      abandDate: this.flowlineForm.get('abandDate').value ? DateHelper.backendDateFormat(this.flowlineForm.get('abandDate').value) : null,
      comment: this.flowlineForm.get('comment').value,
      footage: this.isOtherStatus() ? null : this.flowlineForm.get('footage').value,
      cutCapComment: this.flowlineForm.get('cutCapComment').value,
      retDate: this.isRetiredStatus() ?
        null : DateHelper.backendDateFormat(this.flowlineForm.get('returnDate').value)
    };

    this.facilitiesService.updateFlowline(this.flowLineId, flowlineUpdate).subscribe((flowline: Flowline) => {
      this.loaderModalService.close();
      this.facilitiesService.facilityEquipmentChanged.next();
      this.isCutCapCommentChanged = false;
    });
  }

  ngOnDestroy(): void {
    this.cutCapChangesSubscription.unsubscribe();
  }
}
