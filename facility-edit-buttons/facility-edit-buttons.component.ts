import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmInitialState, ConfirmModalService } from '../../shared/ui-components/confirm-modal';

const resetModalInitialState: ConfirmInitialState = {
  title: 'Reset',
  content: 'Are you sure you want to proceed?',
  confirmText: 'Yes',
  cancelText: 'No'
};

@Component({
  selector: 'pna-ui-facility-edit-buttons',
  templateUrl: './facility-edit-buttons.component.html',
  styleUrls: ['./facility-edit-buttons.component.scss']
})
export class FacilityEditButtonsComponent {
  @Output() reset: EventEmitter<void> = new EventEmitter<void>();
  @Output() update: EventEmitter<void> = new EventEmitter<void>();
  @Input() isUpdateDisabled = false;

  constructor(
    private confirmModalService: ConfirmModalService
  ) { }

  onReset() {
    this.confirmModalService.openModal(resetModalInitialState, { class: 'confirm-modal' })
      .subscribe(() => {
        this.reset.emit();
      });
  }

  onUpdate() {
    this.update.emit();
  }

}
