import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FacilityEquipmentTypes } from '../../../../core/repositories/facilities/facility-equipment-types.enum';
import { DateHelper } from '../../../../shared/date-helper/date-helper';
import { FacilityEquipment } from '../../../../core/repositories/facilities/facility-equipment.interface';
import { CommonEquipmentContent } from '../../../../core/repositories/facilities/common-equipment-content/common-equipment-content.entity';
import { FacilityWell } from '../../../../core/repositories/facilities/facility-well/facility-well.entity';

@Component({
  selector: 'pna-ui-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss']
})
export class EquipmentItemComponent {
  @Input() equipment: FacilityEquipment<CommonEquipmentContent | FacilityWell>;
  @Input() equipType: string;
  @Input() selectedEquipType: string;
  @Output() selectEquip: EventEmitter<string> = new EventEmitter<string>();
  facilityEquipTypes = FacilityEquipmentTypes;

  onSelectEquip() {
    this.selectEquip.emit(this.equipType);
  }

  getFormattedCutCapDate(): string {
    return this.equipment ? DateHelper.formatDateWithoutTimeZone(this.equipment.cutCapDate) : '';
  }
}
