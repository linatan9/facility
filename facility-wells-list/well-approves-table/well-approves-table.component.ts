import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, IHeaderParams } from 'ag-grid-community';

import { FacilityApproves } from '../../../core/repositories/facilities/facility-approves/facility-approves.entity';
import { FacilitiesService } from '../../../core/domain/facilities/facilities.service';
import { FacilityApprovesType } from '../../../core/repositories/facilities/facility-approves/facility-approves.enum';
import {
  FacilityApprovesStatusComponent
} from '../../../shared/ag-grid-custom-components/facility-approves-status/facility-approves-status.component';
import {
  FacilityApprovesRiskComponent
} from '../../../shared/ag-grid-custom-components/facility-approves-risk/facility-approves-risk.component';
import {
  FacilityApprovesRequiredCheckboxComponent
} from '../../../shared/ag-grid-custom-components/facility-approves-required-checkbox/facility-approves-required-checkbox.component';
import {
  FacilityApprovesCommentComponent
} from '../../../shared/ag-grid-custom-components/facility-approves-comment/facility-approves-comment.component';

const tableRowHeight = 80;
const surTableRowHeight = 80;

@Component({
  selector: 'pna-ui-well-approves-table',
  templateUrl: './well-approves-table.component.html',
  styleUrls: ['./well-approves-table.component.scss']
})
export class WellApprovesTableComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  @Input() approves: FacilityApproves;
  @Input() tableTitle: string;
  columnDefs: ColDef[] = [];
  gridApi: GridApi;

  frameworkComponents = {
    changeApproveStatusButtonsComponent: FacilityApprovesStatusComponent,
    facilityApprovesStatusRiskComponent: FacilityApprovesRiskComponent,
    wellApprovesRequiredCheckboxComponent: FacilityApprovesRequiredCheckboxComponent,
    facilityApprovesCommentComponent: FacilityApprovesCommentComponent
  };
  constructor(
    private facilitiesService: FacilitiesService
  ) { }

  ngOnInit() {
    this.columnDefs = this.facilitiesService.getFacilityApprovesHeadersConfig();
  }

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

  // tslint:disable-next-line:no-any
  getRowHeight(params: any) {
    if (params.data.type === FacilityApprovesType.SURF_COMM) {
      return surTableRowHeight;
    }
    return tableRowHeight;
  }

  private updateGridDimensions(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
