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

  constructor() {
    const hardwareListInLocalStorage = localStorage.getItem('table')
    if(hardwareListInLocalStorage)
    {
      this.hardwareList = JSON.parse(hardwareListInLocalStorage)
    }
  }

  get(category?: string) {
    if(category) {
      return this.hardwareList.filter(el => el.category == category);
    }
    return this.hardwareList;
  }

  add(hardware: HardwareData) {
    this.hardwareList.push({
      ...hardware,
      id: new Date().getTime(),
    })
    localStorage.setItem('table', JSON.stringify(this.hardwareList));
  }

  remove(id: number) {
    this.hardwareList = this.hardwareList.filter(el => el.id !== id);
    localStorage.setItem('table', JSON.stringify(this.hardwareList));
  }
}
