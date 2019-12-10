import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FacilityEquipmentTypes } from '../../../../core/repositories/facilities/facility-equipment-types.enum';
import { Flowline } from '../../../../core/repositories/facilities/flowline/flowline-entity';
import { FlowlineWell } from '../../../../core/repositories/facilities/flowline-well/flowline-well.entity';

@Component({
  selector: 'pna-ui-flowline-item',
  templateUrl: './flowline-item.component.html',
  styleUrls: ['./flowline-item.component.scss']
})
export class FlowlineItemComponent {
  @Input() equipment: Flowline;
  @Input() equipType: string;
  @Input() selectedFlowlineId: string;
  @Output() selectFlowline: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedFlowlineWell = new EventEmitter<FlowlineWell>();
  facilityEquipTypes = FacilityEquipmentTypes;


  onSelectEquip() {
    this.selectFlowline.emit(this.equipment.id);
  }

  onFlowlineWellClick(flowlineWell: FlowlineWell, event: Event) {
    event.stopPropagation();
    this.selectedFlowlineWell.emit(flowlineWell);
  }

}
