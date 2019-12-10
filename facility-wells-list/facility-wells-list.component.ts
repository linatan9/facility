import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { FacilityEquipment } from '../../core/repositories/facilities/facility-equipment.interface';
import { FacilityWell } from '../../core/repositories/facilities/facility-well/facility-well.entity';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { FacilityBreadcrumbsLevels } from '../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumbs-levels.enum';
import { FacilityBreadcrumb } from '../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumb.interface';
import { FlowlineWell } from '../../core/repositories/facilities/flowline-well/flowline-well.entity';

@Component({
  selector: 'pna-ui-facility-wells-list',
  templateUrl: './facility-wells-list.component.html',
  styleUrls: ['./facility-wells-list.component.scss']
})
export class FacilityWellsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() equipment: FacilityEquipment<FacilityWell>;
  selectedWellId = '';
  selectedWell: FacilityWell;
  facilityBreadcrumbSubscription = new Subscription();
  shouldConsiderQueryParam = true;
  currentUrl: string;

  constructor(
    private facilitiesService: FacilitiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    this.facilityBreadcrumbSubscription = this.facilitiesService.onFacilityBreadcrumbChanged().pipe(
      filter((breadcrumb: FacilityBreadcrumb) => breadcrumb && breadcrumb.level === FacilityBreadcrumbsLevels.Equipment)
    ).subscribe(() => {
      this.selectedWellId = this.shouldConsiderQueryParam ? this.route.snapshot.queryParamMap.get('wellId') : undefined;
      this.shouldConsiderQueryParam = false;

      if (!this.selectedWellId) {
        this.selectedWell = undefined;
      } else {
        const selectedWell = this.equipment.content.find(item => item.id === this.selectedWellId);
        this.onSelectFacilityWell(selectedWell);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.equipment && changes.equipment.currentValue) {
      this.selectedWell = (<FacilityEquipment<FacilityWell>>changes.equipment.currentValue).content
        .find((well: FacilityWell) => well.id === this.selectedWellId);
      if (!this.selectedWell) {
        this.selectedWellId = undefined;
      }
    }
  }

  onSelectFacilityWell(wellEquip: FacilityWell) {
    this.selectedWellId = wellEquip.id;
    this.selectedWell = wellEquip;

    this.facilitiesService.facilityBreadcrumbChanged.next({
      level: FacilityBreadcrumbsLevels.EquipmentDetailsList,
      title: `WINS #${this.selectedWellId}`
    });
  }

  onSelectedFlowlineWell(flowlineWell: FlowlineWell) {
    const facilityWells = this.equipment.content;
    const selectedFacilityWell = facilityWells.find(facilityWell => facilityWell.id === flowlineWell.id);
    this.onSelectFacilityWell(selectedFacilityWell);
  }

  ngOnDestroy(): void {
    if (this.currentUrl === this.router.url) {
      this.router.navigate([], { relativeTo: this.route, queryParams: {} });
    }
    this.facilityBreadcrumbSubscription.unsubscribe();
  }
}
