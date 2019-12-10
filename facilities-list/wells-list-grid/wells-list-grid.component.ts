import { Component, Input } from '@angular/core';
import { WellShortInfo } from '../../../core/repositories/well-short-info/well-short-info.entry';
import { WellsListGrid } from '../../../core/domain/facilities/grid-configs/wells-list-grid.config';
import { ColDef, GridApi, IHeaderParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { PnaDateFormattedComponent } from '../../../shared/ag-grid-custom-components/date-formatted/date-formatted.component';

@Component({
  selector: 'pna-ui-wells-list-grid',
  templateUrl: './wells-list-grid.component.html',
  styleUrls: ['./wells-list-grid.component.scss']
})
export class WellsListGridComponent {
  @Input() wellShortInfoList: WellShortInfo[];
  columnDefs: ColDef[] = WellsListGrid;
  gridApi: GridApi;
  frameworkComponents = {
    dateFormattedComponent: PnaDateFormattedComponent
  };

  constructor(
    private router: Router
  ) { }

  onGridReady(params: IHeaderParams) {
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
    const facilityId = (<WellShortInfo>event.data).siteId;
    const wellId = (<WellShortInfo>event.data).id;
    this.router.navigate([`facilities/${facilityId}`], {
      queryParams: {
        wellId,
      }
    });
  }

  private updateGridDimensions() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
