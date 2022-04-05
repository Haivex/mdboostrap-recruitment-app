import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl  } from '@angular/forms';
import { HardwareListService } from '../hardware-list.service';

export interface HardwareData {
  name: string;
  description: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-hardware-form',
  templateUrl: './hardware-form.component.html',
  styleUrls: ['./hardware-form.component.scss']
})
export class HardwareFormComponent implements OnInit {
  @Input('submitAction') submitAction: (hardware: HardwareData) => unknown = (_hardware: HardwareData) => null;
  @Input('formTitle') formTitle: string = '';
  @Input('submitButtonText') submitButtonText: string = '';
  @Input('prefilledHardwareData')prefilledHardwareData?: HardwareData

  protected service: HardwareListService;
  additionalCategories: string[] = [];

  hardwareData = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl('', Validators.min(0)),
  })

  constructor(service: HardwareListService) { this.service = service
    this.additionalCategories = this.service.additionalCategories;
  }

  ngOnInit(): void {
    if(this.prefilledHardwareData) {
      this.hardwareData.setValue(this.prefilledHardwareData);
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

}
