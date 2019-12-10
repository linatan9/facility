import { Component, Input } from '@angular/core';
import { ColDef, IHeaderParams, GridApi } from 'ag-grid-community';

import { Facility } from '../../../core/repositories/facilities/facility.entity';
import { FacilitiesListGrid } from '../../../core/domain/facilities/grid-configs/facilities-list-grid.config';
import { PnaDateFormattedComponent } from '../../../shared/ag-grid-custom-components/date-formatted/date-formatted.component';
import { Router } from '@angular/router';

@Component({
  selector: 'pna-ui-facilities-list-grid',
  templateUrl: './facilities-list-grid.component.html',
  styleUrls: ['./facilities-list-grid.component.scss']
})
export class FacilitiesListGridComponent {
  @Input() facilities: Facility[];
  filtredFacility: Facility[];
  columnDefs: ColDef[] = FacilitiesListGrid;
  gridApi: GridApi;
  frameworkComponents = {
    dateFormattedComponent: PnaDateFormattedComponent
  };

  constructor(
    private router: Router
  ) { }

  onGridReady(params: IHeaderParams) {
    this.filtredFacility = this.facilities;
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onFirstDataRendered() {
    this.updateGridDimensions();
  }


  onGridSizeChanged() {
    this.updateGridDimensions();
  }

  // ag-grid doesn't specify type of onRowSelected event
  // tslint:disable-next-line:no-any
  onRowSelected(event: any) {
    const facilityId = (<Facility>event.data).id;
    this.router.navigate([`facilities/${facilityId}`]);
  }

  private updateGridDimensions() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
