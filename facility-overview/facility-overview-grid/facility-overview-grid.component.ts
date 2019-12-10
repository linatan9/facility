import { Component, Input } from '@angular/core';
import { ColDef, IHeaderParams, GridApi } from 'ag-grid-community';
import { WildlifeRestriction } from '../../../core/repositories/wildlife/wildlife-restriction.entity';
import { LandUse } from '../../../core/repositories/well-details/land-use/land-use.entity';


@Component({
  selector: 'pna-ui-facility-overview-grid',
  templateUrl: './facility-overview-grid.component.html',
  styleUrls: ['./facility-overview-grid.component.scss']
})
export class FacilityOverviewGridComponent {
  gridApi: GridApi;
  @Input() columnsDef: ColDef[];
  @Input() frameWorkComponents;
  @Input() rowData: WildlifeRestriction[] | LandUse[];

  onGridReady(params: IHeaderParams): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onFirstDataRendered(): void {
    this.updateGridDimensions();
  }

  onGridSizeChanged(): void {
    this.updateGridDimensions();
  }

  private updateGridDimensions(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
