import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { FacilityBreadcrumb } from '../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumb.interface';
import { FacilityBreadcrumbsLevels } from '../../core/repositories/facilities/facility-breadcrumbs/facility-breadcrumbs-levels.enum';

@Component({
  selector: 'pna-ui-facility-breadcrumbs',
  templateUrl: './facility-breadcrumbs.component.html',
  styleUrls: ['./facility-breadcrumbs.component.scss']
})
export class FacilityBreadcrumbsComponent implements OnInit, OnDestroy {
  facilityBreadcrumbSubscription = new Subscription();
  facilityBreadcrumbs: FacilityBreadcrumb[] = [];

  constructor(
    private facilitiesService: FacilitiesService
  ) { }

  ngOnInit(): void {
    this.facilityBreadcrumbSubscription = this.facilitiesService.onFacilityBreadcrumbChanged()
      .subscribe((breadcrumb: FacilityBreadcrumb) => {
        this.setFacilityBreadcrumbs(breadcrumb);
      });
  }

  setFacilityBreadcrumbs(breadcrumb: FacilityBreadcrumb) {
    if (!breadcrumb) {
      return;
    }

    switch (breadcrumb.level) {
      case FacilityBreadcrumbsLevels.Equipment:
        this.facilityBreadcrumbs = [breadcrumb];
        break;
      case FacilityBreadcrumbsLevels.EquipmentDetailsList:
        this.facilityBreadcrumbs = [this.facilityBreadcrumbs[0], breadcrumb];
        break;
      case FacilityBreadcrumbsLevels.EquipmentDetailedInfo:
        this.facilityBreadcrumbs = [this.facilityBreadcrumbs[0], this.facilityBreadcrumbs[1], breadcrumb];
        break;
      default:
        this.facilityBreadcrumbs = [];
    }
  }

  changeBreadcrumbs(index: number) {
    if (index === this.facilityBreadcrumbs.length - 1) {
      return;
    }

    this.facilitiesService.facilityBreadcrumbChanged.next(this.facilityBreadcrumbs[index]);
  }

  ngOnDestroy(): void {
    this.facilityBreadcrumbSubscription.unsubscribe();
  }
}
