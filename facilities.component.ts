import { Component, OnInit } from '@angular/core';

import { Facility } from '../core/repositories/facilities/facility.entity';
import { FacilitiesService } from '../core/domain/facilities/facilities.service';
import { WellShortInfo } from '../core/repositories/well-short-info/well-short-info.entry';
import { GridSwitcher } from '../shared/constants/grid-switcher.enum';
import { LoaderModalService } from '../shared/ui-components/loader-modal';
import { FilterParams } from '../core/repositories/well/wells-filter.interface';

@Component({
  selector: 'pna-ui-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {
  facilities: Facility[];
  wellShortInfoList: WellShortInfo[];
  shortWellSelectOptions: WellShortInfo[] = [];
  facilitySelectOptions: Facility[] = [];
  gridSwitcher: GridSwitcher = GridSwitcher.Default;
  filterParams: FilterParams = {};

  get isGridSwitcherByFacility() {
    return this.gridSwitcher === GridSwitcher.ByFacility;
  }

  get isGridSwitcherByWell() {
    return this.gridSwitcher === GridSwitcher.ByWell;
  }

  constructor(
    private facilitiesService: FacilitiesService,
    private loaderService: LoaderModalService,
  ) { }

  ngOnInit() {
    this.getFacilitiesList(false);
  }

  clearFiltersById(filterParams: FilterParams, isClearFilterById: boolean) {
    if (isClearFilterById) {
      filterParams.facilityId = undefined;
      filterParams.wellId = undefined;
    }
    this.filterParams = filterParams;
  }

  onFilterChange(filterParams: FilterParams) {
    this.clearFiltersById(filterParams, false);
    if (this.isGridSwitcherByFacility) {
      this.getFacilitiesList(false);
    } else {
      this.getWellShortList(false);
    }
  }

  getWellShortList(isClearFilterById: boolean) {
    this.clearFiltersById(this.filterParams, isClearFilterById);
    this.loaderService.open();
    this.facilitiesService.getWellShortInfoList(this.filterParams)
      .subscribe(
  (wellShortInfoList: WellShortInfo[]) => {
          this.loaderService.close();
          if (!this.filterParams.wellId) {
            this.shortWellSelectOptions = wellShortInfoList;
          }
          this.wellShortInfoList = wellShortInfoList;
          this.shortWellSelectOptions = wellShortInfoList;
          this.gridSwitcher = GridSwitcher.ByWell;
      },
  (error) => {
          this.loaderService.close();
        }
      );

  }

  getFacilitiesList(isClearFilterById: boolean) {
    this.clearFiltersById(this.filterParams, isClearFilterById);
    this.facilitiesService.getFacilities(this.filterParams)
      .subscribe((facilities: Facility[]) => {
        this.facilities = facilities;
        if (!this.filterParams.facilityId) {
          this.facilitySelectOptions = facilities;
        }
        this.gridSwitcher = GridSwitcher.ByFacility;
      });
  }
}
