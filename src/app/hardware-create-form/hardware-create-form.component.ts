import { Component } from '@angular/core';
import { HardwareData, HardwareFormComponent } from '../hardware-form/hardware-form.component';
import { HardwareListService } from '../hardware-list.service';

@Component({
  selector: 'app-hardware-create-form',
  templateUrl: './hardware-create-form.component.html',
  styleUrls: ['./hardware-create-form.component.scss']
})
export class HardwareCreateFormComponent extends HardwareFormComponent {

  constructor(service: HardwareListService) {
    super(service);
  }

  createHardware(data: HardwareData) {
    if (!this.hardwareData.valid) return;
    this.service.add(data)
  }
}
