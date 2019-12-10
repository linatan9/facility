import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatTabsModule,
  MatNativeDateModule,
  MatIconModule,
  MatTreeModule, MatExpansionModule
} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import {
  PerfectScrollbarModule,
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { AgGridModule } from 'ag-grid-angular';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';

import { FacilitiesComponent } from './facilities.component';
import { FacilitiesRoutingModule } from './facilities-routing.module';
import { ConfirmModalModule } from '../shared/ui-components/confirm-modal';
import { FacilitiesListSearchComponent } from './facilities-list/facilities-list-search/facilities-list-search.component';
import { FacilitiesListGridComponent } from './facilities-list/facilities-list-grid/facilities-list-grid.component';
import { PnaDateFormattedComponent } from '../shared/ag-grid-custom-components/date-formatted/date-formatted.component';
import { FacilityEquipmentsComponent } from './facility-equipments/facility-equipments.component';
import { LoaderModalModule } from '../shared/ui-components/loader-modal';
import { EquipmentDetailsTableComponent } from './equipment-details-table/equipment-details-table.component';
import { FacilityColumnDecorationComponent } from './facility-column-decoration/facility-column-decoration.component';
import { EquipmentTypeComponent } from '../shared/ag-grid-custom-components/equipment-type/equipment-type.component';
import {
  EquipmentServiceCheckboxComponent
} from '../shared/ag-grid-custom-components/equipment-service-checkbox/equipment-service-checkbox.component';
import { EquipmentUpdateByComponent } from '../shared/ag-grid-custom-components/equipment-update-by/equipment-update-by.component';
import {
  EquipmentCommentsTextareaComponent
} from '../shared/ag-grid-custom-components/equipment-comments-textarea/equipment-comments-textarea.component';
import { FacilityEditButtonsComponent } from './facility-edit-buttons/facility-edit-buttons.component';
import { FacilityWellsListComponent } from './facility-wells-list/facility-wells-list.component';
import { WellEquipmentsListComponent } from './facility-wells-list/well-equipments-list/well-equipments-list.component';
import { FlowlineItemComponent } from './facility-wells-list/well-equipments-list/flowline-item/flowline-item.component';
import { EquipmentItemComponent } from './facility-wells-list/well-equipments-list/equipment-item/equipment-item.component';
import { FacilityWellDetailsComponent } from './facility-wells-list/facility-well-details/facility-well-details.component';
import { WellApprovesTableComponent } from './facility-wells-list/well-approves-table/well-approves-table.component';
import {
  FacilityApprovesStatusComponent
} from '../shared/ag-grid-custom-components/facility-approves-status/facility-approves-status.component';
import { FacilityApprovesRiskComponent } from '../shared/ag-grid-custom-components/facility-approves-risk/facility-approves-risk.component';
import {
  FacilityApprovesRequiredCheckboxComponent
} from '../shared/ag-grid-custom-components/facility-approves-required-checkbox/facility-approves-required-checkbox.component';
import {
  FacilityApprovesCommentComponent
} from '../shared/ag-grid-custom-components/facility-approves-comment/facility-approves-comment.component';
import { FlowlineDetailsComponent } from './facility-wells-list/flowline-details/flowline-details.component';
import { FacilityBreadcrumbsComponent } from './facility-breadcrumbs/facility-breadcrumbs.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SelectEquipForMailComponent } from '../shared/ag-grid-custom-components/select-equip-for-mail/select-equip-for-mail.component';
import { FacilityMailComponent } from './facility-mail/facility-mail.component';
import { ModalModule } from '../shared/ui-components/modal';
import { MailGroupSelectComponent } from './facility-mail/mail-group-select/mail-group-select.component';
import { MailTemplateComponent } from './facility-mail/mail-template/mail-template.component';
import { WellsListGridComponent } from './facilities-list/wells-list-grid/wells-list-grid.component';
import { FacilityOverviewComponent } from './facility-overview/facility-overview.component';
import {
  FacilityOverviewGeneralInfoComponent
} from './facility-overview/facility-overview-general-info/facility-overview-general-info.component';
import { FacilityOverviewGridComponent } from './facility-overview/facility-overview-grid/facility-overview-grid.component';
import { TooltipModule } from '../shared/directives/tooltip/tooltip.module';
import {
  FlowlineAbandonedTooltipComponent
} from './facility-wells-list/flowline-details/flowline-tooltips/flowline-abandoned-tooltip/flowline-abandoned-tooltip.component';
import {
  FlowlineRemovedTooltipComponent
} from './facility-wells-list/flowline-details/flowline-tooltips/flowline-removed-tooltip/flowline-removed-tooltip.component';
import {
  FlowlineRetiredTooltipComponent
} from './facility-wells-list/flowline-details/flowline-tooltips/flowline-retired-tooltip/flowline-retired-tooltip.component';
import {
  DatepickerWithoutManualEditModule
} from '../shared/well-details/datepicker-without-manual-edit/datepicker-without-manul-edit.module';
import { EquipmentAbandonmentFiltersModule } from '../shared/equipment-abandonment-filters/equipment-abandonment-filters.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};


@NgModule({
  declarations: [
    FacilitiesComponent,
    FacilitiesListSearchComponent,
    FacilitiesListGridComponent,
    FacilityEquipmentsComponent,
    EquipmentDetailsTableComponent,
    FacilityColumnDecorationComponent,
    FacilityEditButtonsComponent,
    FacilityWellsListComponent,
    WellEquipmentsListComponent,
    FlowlineItemComponent,
    EquipmentItemComponent,
    FacilityWellDetailsComponent,
    WellApprovesTableComponent,
    FlowlineDetailsComponent,
    FacilityBreadcrumbsComponent,
    FacilityMailComponent,
    MailGroupSelectComponent,
    MailTemplateComponent,
    WellsListGridComponent,
    FacilityOverviewComponent,
    FacilityOverviewGeneralInfoComponent,
    FacilityOverviewGridComponent,
    FlowlineAbandonedTooltipComponent,
    FlowlineRemovedTooltipComponent,
    FlowlineRetiredTooltipComponent,
  ],
  imports: [
    CommonModule,
    FacilitiesRoutingModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatTabsModule,
    ConfirmModalModule,
    LoaderModalModule,
    ModalModule,
    TooltipModule,
    AgGridModule.withComponents([
      PnaDateFormattedComponent,
      EquipmentTypeComponent,
      EquipmentServiceCheckboxComponent,
      EquipmentUpdateByComponent,
      EquipmentCommentsTextareaComponent,
      FacilityApprovesStatusComponent,
      FacilityApprovesRiskComponent,
      FacilityApprovesRequiredCheckboxComponent,
      FacilityApprovesCommentComponent,
      SelectEquipForMailComponent,
    ]),
    NgSelectModule,
    MatIconModule,
    MatTreeModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    DatepickerWithoutManualEditModule,
    EquipmentAbandonmentFiltersModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    FacilityMailComponent
  ]
})
export class FacilitiesModule { }
