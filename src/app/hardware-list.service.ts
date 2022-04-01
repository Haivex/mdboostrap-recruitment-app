import { Injectable } from '@angular/core';
import { HardwareData } from './hardware-form/hardware-form.component';

export interface HardwareRecord extends HardwareData {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class HardwareListService {

  private hardwareList: HardwareRecord[] = [];

  constructor() { }

  get() {
    return this.hardwareList;
  }

  add(hardware: HardwareData) {
    this.hardwareList.push({
      ...hardware,
      id: new Date().getTime(),
    })
  }

  remove(id: number) {
    this.hardwareList = this.hardwareList.filter(el => el.id !== id);
  }
}
