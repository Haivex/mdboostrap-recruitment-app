import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HardwareData } from '../hardware-form/hardware-form.component';
import { HardwareListService, HardwareRecord } from '../hardware-list.service';

@Component({
  selector: 'app-hardware-edit-form',
  templateUrl: './hardware-edit-form.component.html',
  styleUrls: ['../hardware-form/hardware-form.component.scss', './hardware-edit-form.component.scss']
})
export class HardwareEditFormComponent implements OnInit {

  private service: HardwareListService;
  currentEdited: HardwareRecord | null;
  private _subscription: Subscription;

  hardwareData = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl('', Validators.min(0)),
  })

  constructor(service: HardwareListService) { this.service = service
    this.currentEdited = this.service.currentEdited;
    this._subscription = this.service.currentEditedChange.subscribe((value) => {
      this.currentEdited = value;
      this.hardwareData.setValue(this.currentEdited as HardwareData)
    });
  }

  ngOnInit(): void {
    if (this.currentEdited) {
      this.hardwareData.setValue(this.currentEdited)
    }
  }


  get name() {
    return this.hardwareData.get('name') as AbstractControl;
  }

  get price() {
    return this.hardwareData.get('price') as AbstractControl;
  }

  get category() {
    return this.hardwareData.get('category') as AbstractControl;
  }

  editHardware(hardware: HardwareData) {
    if(this.currentEdited) {
      this.service.edit(this.currentEdited.id, this.hardwareData.value);
    }
  }

  cancelEditing(event: MouseEvent) {
    if(event.target == event.currentTarget) this.currentEdited = null;
  }

}
