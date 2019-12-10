import { Component, Input, OnInit } from '@angular/core';
import { Facility } from '../../../core/repositories/facilities/facility.entity';
import { EquipmentNode } from '../../../core/repositories/facilities/facility-mail/equipment-node.interface';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ExpandableFlatNode } from '../../../core/repositories/facilities/facility-mail/expandable-flat-node.interface';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { FacilityMailService } from '../../../core/domain/facilities/facility-mail/facility-mail.service';
import { FacilityEquipmentTypes } from '../../../core/repositories/facilities/facility-equipment-types.enum';
import { MailGroupSelect } from '../../../core/repositories/facilities/facility-mail/mail-group-select.interface';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'pna-ui-mail-group-select',
  templateUrl: './mail-group-select.component.html',
  styleUrls: ['./mail-group-select.component.scss']
})
export class MailGroupSelectComponent implements OnInit {
  @Input() facility: Facility;
  @Input() mailGroupsControl: AbstractControl;
  mailGroups: Observable<MailGroupSelect[]>;
  treeData: EquipmentNode[];
  totalSelectedEquipNumber: number;
  treeControl = new FlatTreeControl<ExpandableFlatNode>(
    node => node.level, node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExpandableFlatNode) => node.expandable;

  constructor(
    private facilityMailService: FacilityMailService
  ) { }

  ngOnInit(): void {
    this.treeData = this.facilityMailService.convertFacilityToEquipmentNodes(this.facility);
    this.dataSource.data = this.treeData;
    this.totalSelectedEquipNumber = this.dataSource._flattenedData['_value']
      .filter((data: ExpandableFlatNode) => !data.children).length;
    this.mailGroups = this.facilityMailService.getMailGroups();
  }

  isEquipSumVisible(type: FacilityEquipmentTypes): boolean {
    return [
      FacilityEquipmentTypes.separators,
      FacilityEquipmentTypes.meters,
      FacilityEquipmentTypes.oilTanks,
      FacilityEquipmentTypes.waterTanks,
      FacilityEquipmentTypes.pumpingUnits,
      FacilityEquipmentTypes.otherEquip
    ].indexOf(type) !== -1;
  }

  _transformer(node: EquipmentNode, level: number) {
    return {
      expandable: !!node.children,
      type: node.type,
      classes: node.classes,
      children: node.children,
      level: level,
    };
  }
}
