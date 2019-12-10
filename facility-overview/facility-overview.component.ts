import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { WildlifeItemNameComponent } from '../../shared/ag-grid-custom-components/wildlife-item-name/wildlife-item-name.component';
import {
  WildlifeRestrictionDateComponent
} from '../../shared/ag-grid-custom-components/wildlife-restriction-date/wildlife-restriction-date.component';
import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { LandUseNameComponent } from '../../shared/ag-grid-custom-components/land-use-name/land-use-name.component';
import { WildlifeRestrictionDetails } from '../../core/repositories/wildlife/wildlife-restrict-details.entity';
import { LandUse } from '../../core/repositories/well-details/land-use/land-use.entity';
import { Facility } from '../../core/repositories/facilities/facility.entity';

@Component({
  selector: 'pna-ui-facility-overview',
  templateUrl: './facility-overview.component.html',
  styleUrls: ['./facility-overview.component.scss']
})
export class FacilityOverviewComponent implements OnInit, OnChanges {
  @Input() facility: Facility;
  wildlifeFrameworkComponents = {
    wildlifeItemNameComponent: WildlifeItemNameComponent,
    wildlifeRestrictionDateComponent: WildlifeRestrictionDateComponent
  };
  landuseFrameworkComponents = {
    landUseNameComponent: LandUseNameComponent
  };
  columnWildlifeDefs: ColDef[];
  columnLandUseDefs: ColDef[];
  wildLifeData: WildlifeRestrictionDetails[] = [];
  landUseData: LandUse[] = [];
  isWildlifeOpen = false;
  isLanduseOpen = false;
  constructor(
    private facilitiesService: FacilitiesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.facility && changes.facility.currentValue) {
      this.wildLifeData = changes.facility.currentValue.wildlife;
      this.landUseData = changes.facility.currentValue.landUse;
    }
  }

  ngOnInit() {
    this.columnWildlifeDefs = this.facilitiesService.getFacilityOverviewWildlifeHeadersConfig();
    this.columnLandUseDefs = this.facilitiesService.getFacilityOverviewLandUseHeadersConfig();
  }
}
