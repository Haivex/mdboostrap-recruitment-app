import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl  } from '@angular/forms';

interface HardwareData {
  hardwareName: string;
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

  hardwareData = new FormGroup({
    hardwareName: new FormControl('', Validators.required),
    description: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl('', Validators.min(0)),
  })

  constructor() { }

  ngOnInit(): void {

  }

  createHardware(data: HardwareData) {
    if (!this.hardwareData.valid) return;
    console.log(data);
  }

  get hardwareName() {
    return this.hardwareData.get('hardwareName') as AbstractControl;
  }

  get price() {
    return this.hardwareData.get('price') as AbstractControl;
  }

  get category() {
    return this.hardwareData.get('category') as AbstractControl;
  }

}
