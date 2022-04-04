import { Component } from '@angular/core';
import {
  HardwareData,
  HardwareFormComponent,
} from '../hardware-form/hardware-form.component';
import { HardwareListService, HardwareRecord } from '../hardware-list.service';

@Component({
  selector: 'app-hardware-edit-form',
  templateUrl: './hardware-edit-form.component.html',
  styleUrls: [
    '../hardware-form/hardware-form.component.scss',
    './hardware-edit-form.component.scss',
  ],
})
export class HardwareEditFormComponent extends HardwareFormComponent {
  currentEditedRecord: HardwareRecord | null = null;
  protected _subscription = this.service.currentEditedChange.subscribe(
    (value) => {
      this.currentEditedRecord = value;
      if (this.currentEditedRecord) {
        this.hardwareData.setValue({
          name: this.currentEditedRecord.name,
          description: this.currentEditedRecord.description,
          price: this.currentEditedRecord.price,
          category: this.currentEditedRecord.category,
        });
      }
    }
  );

  constructor(service: HardwareListService) {
    super(service);
  }

  editHardware(hardware: HardwareData) {
    if (this.service.currentEdited) {
      this.service.edit(this.service.currentEdited.id, hardware);
    }
  }

  cancelEditing(event: MouseEvent) {
    if (event.target == event.currentTarget) this.currentEditedRecord = null;
  }
}
