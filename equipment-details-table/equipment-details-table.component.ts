import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColDef, GridApi, IHeaderParams } from 'ag-grid-community';

import { FacilitiesService } from '../../core/domain/facilities/facilities.service';
import { FacilityEquipment } from '../../core/repositories/facilities/facility-equipment.interface';
import { CommonEquipmentContent } from '../../core/repositories/facilities/common-equipment-content/common-equipment-content.entity';
import { EquipmentTypeComponent } from '../../shared/ag-grid-custom-components/equipment-type/equipment-type.component';
import {
  EquipmentServiceCheckboxComponent
} from '../../shared/ag-grid-custom-components/equipment-service-checkbox/equipment-service-checkbox.component';
import { EquipmentUpdateByComponent } from '../../shared/ag-grid-custom-components/equipment-update-by/equipment-update-by.component';
import {
  EquipmentCommentsTextareaComponent
} from '../../shared/ag-grid-custom-components/equipment-comments-textarea/equipment-comments-textarea.component';
import { FormGroup } from '@angular/forms';
import { LoaderModalService } from '../../shared/ui-components/loader-modal';
import { SelectEquipForMailComponent } from '../../shared/ag-grid-custom-components/select-equip-for-mail/select-equip-for-mail.component';


@Component({
  selector: 'pna-ui-equipment-details-table',
  templateUrl: './equipment-details-table.component.html',
  styleUrls: ['./equipment-details-table.component.scss']
})
export class EquipmentDetailsTableComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() facilityEquipment: FacilityEquipment<CommonEquipmentContent>;
  equipmentsGridData: CommonEquipmentContent[];
  initialFacilityEquipment: CommonEquipmentContent[];
  columnDefs: ColDef[];
  gridApi: GridApi;
  context = { componentParent: this };
  frameworkComponents = {
    equipmentTypeComponent: EquipmentTypeComponent,
    equipmentServiceCheckboxComponent: EquipmentServiceCheckboxComponent,
    equipmentUpdateByComponent: EquipmentUpdateByComponent,
    equipmentCommentsTextareaComponent: EquipmentCommentsTextareaComponent,
    selectEquipForMailComponent: SelectEquipForMailComponent
  };
  facilityEquipmentsForm: FormGroup;

  constructor(
    private facilitiesService: FacilitiesService,
    private loaderModalService: LoaderModalService
  ) { }

  ngOnInit() {
    this.columnDefs = this.facilitiesService.getHeadersConfig();
    this.setInitialFacilityEquipment();
  }

  setInitialFacilityEquipment() {
    this.initialFacilityEquipment = this.facilityEquipment.content.map((equipment: CommonEquipmentContent) => ({...equipment}));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.facilityEquipment && changes.facilityEquipment.currentValue) {
      this.facilitiesService.initFacilityEquipmentForm(
        (<FacilityEquipment<CommonEquipmentContent>>changes.facilityEquipment.currentValue).content
      );
      this.facilityEquipmentsForm = this.facilitiesService.facilityEquipmentForm;
      this.equipmentsGridData = (<FacilityEquipment<CommonEquipmentContent>>changes.facilityEquipment.currentValue).content;
      this.setInitialFacilityEquipment();
    }
  }

  onGridReady(params: IHeaderParams) {
    this.gridApi = params.api;
    if (!this.facilityEquipmentsForm) {
      this.facilitiesService.initFacilityEquipmentForm(this.facilityEquipment.content);
      this.facilityEquipmentsForm = this.facilitiesService.facilityEquipmentForm;
    }
    this.equipmentsGridData = this.facilityEquipment.content;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.resetRowHeights();
  }

  onFirstDataRendered() {
    this.updateGridDimensions();
  }

  onRowDataChanged() {
    this.updateGridDimensions();
  }

  private updateGridDimensions() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      this.gridApi.resetRowHeights();
    }
  }

  onGridSizeChanged() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  updateData() {
    const equipForUpdate = this.facilitiesService.eqipmentsForUpdate;
    if (!equipForUpdate.length) {
      return;
    }

    this.loaderModalService.open();
    this.facilitiesService.updateFacilityEquipment(equipForUpdate)
      .subscribe(() => {
        this.loaderModalService.close();
        this.facilitiesService.facilityEquipmentChanged.next();
        this.facilitiesService.resetEquipmentForUpdate();
      });
  }

  resetData() {
    this.facilityEquipment.content = this.initialFacilityEquipment.map((equipment: CommonEquipmentContent) => ({...equipment}));
    this.facilitiesService.initFacilityEquipmentForm(this.facilityEquipment.content);
    this.facilityEquipmentsForm = this.facilitiesService.facilityEquipmentForm;
    this.equipmentsGridData = this.facilityEquipment.content;
    this.facilitiesService.resetEquipmentForUpdate();
  }
}
