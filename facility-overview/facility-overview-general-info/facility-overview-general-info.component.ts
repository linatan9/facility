import { Component, Input } from '@angular/core';
import { Facility } from '../../../core/repositories/facilities/facility.entity';

@Component({
  selector: 'pna-ui-facility-overview-general-data-fields',
  templateUrl: './facility-overview-general-info.component.html',
  styleUrls: ['./facility-overview-general-info.component.scss']
})
export class FacilityOverviewGeneralInfoComponent {
  @Input() facility: Facility;
}
