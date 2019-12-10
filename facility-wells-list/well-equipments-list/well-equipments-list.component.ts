import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { FacilityWell } from '../../../core/repositories/facilities/facility-well/facility-well.entity';
import { FacilityEquipmentTypes } from '../../../core/repositories/facilities/facility-equipment-types.enum';
import { Flowline } from '../../../core/repositories/facilities/flowline/flowline-entity';
import { FacilityBreadcrumbsLevels } from '../../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumbs-levels.enum';
import { FacilityBreadcrumb } from '../../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumb.interface';
import { FlowlineWell } from '../../../core/repositories/facilities/flowline-well/flowline-well.entity';

@Component({
  selector: 'pna-ui-well-equipments-list',
  templateUrl: './well-equipments-list.component.html',
  styleUrls: ['./well-equipments-list.component.scss']
})
export class WellEquipmentsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() facility: FacilityWell;
  @Input() selectedWellId?: string;
  @Input() facilityWells: FacilityWell[];
  @Output() selectedFlowlineWell = new EventEmitter<FlowlineWell>();
  orderedEquipTypes: string[];
  selectedEquipType: string;
  isDetailedInfoSelected = false;
  selectedFlowlineId: string;
  selectedFlowline: Flowline;
  facilityEquipmentTypes = FacilityEquipmentTypes;
  facilityBreadcrumbSubscription = new Subscription();

  constructor(
    private facilitiesService: FacilitiesService,
  ) { }

  ngOnInit(): void {
    this.getOrderedEquipTypes();
    this.facilityBreadcrumbSubscription = this.facilitiesService.onFacilityBreadcrumbChanged().pipe(
      filter((breadcrumb: FacilityBreadcrumb) => breadcrumb && breadcrumb.level === FacilityBreadcrumbsLevels.EquipmentDetailsList)
    ).subscribe(() => this.hideDetailedWellInfo());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.facility && changes.facility.currentValue && changes.facility.previousValue &&
      (<FacilityWell>changes.facility.currentValue).id !== (<FacilityWell>changes.facility.previousValue).id) {
      this.hideDetailedWellInfo();
    }

    if (this.selectedFlowlineId) {
      this.selectedFlowline = this.getSelectedFlowline();
    }

    if (changes.selectedWellId && changes.selectedWellId.currentValue) {
      this.openDetails();
    }
  }

  hideDetailedWellInfo() {
    this.selectedEquipType = undefined;
    this.selectedFlowlineId = undefined;
    this.isDetailedInfoSelected = false;

  }

  getOrderedEquipTypes() {
    this.orderedEquipTypes = this.facilitiesService.getOrderedEquipmentTypes(
      [FacilityEquipmentTypes.wells, FacilityEquipmentTypes.flowlines, FacilityEquipmentTypes.overview]
    );
  }

  getEquipmentsDetails(equipType: string) {
    return this.facility[equipType];
  }

  showEquipmentList(selectedEquipType: string) {
    this.isDetailedInfoSelected = false;
    this.selectedEquipType = selectedEquipType;
    this.selectedFlowlineId = undefined;

    const selectedEquipmentTitle = FacilityEquipmentTypes[selectedEquipType];
    const selectedEquipmentNumber = this.facility ? this.facility[selectedEquipType].content.length : '';
    this.facilitiesService.facilityBreadcrumbChanged.next({
      level: FacilityBreadcrumbsLevels.EquipmentDetailedInfo,
      title: `${selectedEquipmentTitle} (${selectedEquipmentNumber})`
    });
  }

  showFlowlineDetails(flowLineId: string) {
    this.selectedFlowlineId = flowLineId;
    this.selectedFlowline = this.getSelectedFlowline();
    this.selectedEquipType = undefined;
    this.isDetailedInfoSelected = false;

    this.facilitiesService.facilityBreadcrumbChanged.next({
      level: FacilityBreadcrumbsLevels.EquipmentDetailedInfo,
      title: `Flowline ${this.selectedFlowlineId}`
    });
  }

  getSelectedFlowline(): Flowline {
    return this.facility.flowlines.find((flowline: Flowline) => flowline.id === this.selectedFlowlineId);
  }

  openDetails() {
    this.isDetailedInfoSelected = true;
    this.selectedEquipType = undefined;
    this.selectedFlowlineId = undefined;

    this.facilitiesService.facilityBreadcrumbChanged.next({
      level: FacilityBreadcrumbsLevels.EquipmentDetailedInfo,
      title: `Well Overview`
    });
  }

  onSelectedFlowlineWell(flowlineWell: FlowlineWell) {
    this.selectedFlowlineWell.emit(flowlineWell);
  }

  ngOnDestroy(): void {
    this.facilityBreadcrumbSubscription.unsubscribe();
  }
}
