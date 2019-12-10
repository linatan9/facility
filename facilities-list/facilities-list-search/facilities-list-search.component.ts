import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Facility } from '../../../core/repositories/facilities/facility.entity';

@Component({
  selector: 'pna-ui-facilities-list-search',
  templateUrl: './facilities-list-search.component.html',
  styleUrls: ['./facilities-list-search.component.scss']
})
export class FacilitiesListSearchComponent {
  @Input() facilities: Facility[];
  @Input() selectedFacilityId: string;
  @Output() facilityChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(changedItem: Facility) {
    if (!changedItem) {
      return;
    }

    this.facilityChange.emit(changedItem.id);
  }
}
