import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HardwareData } from './hardware-form/hardware-form.component';

export interface HardwareRecord extends HardwareData {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class HardwareListService {

  private hardwareList: HardwareRecord[] = [];
  hardwareListChange: Subject<HardwareRecord[]> = new Subject<HardwareRecord[]>();
  currentEditedChange: Subject<HardwareRecord | null> = new Subject<HardwareRecord | null>();
  currentEdited: HardwareRecord | null;
  additionalCategories: string[] = [];

  constructor() {
    this.currentEdited = null;
    const hardwareListInLocalStorage = localStorage.getItem('table')
    if(hardwareListInLocalStorage)
    {
      this.hardwareList = JSON.parse(hardwareListInLocalStorage)
    }
    const additionalCategoriesInLocalStorage = localStorage.getItem('additionalCategories')
    if(additionalCategoriesInLocalStorage)
    {
      this.additionalCategories = JSON.parse(additionalCategoriesInLocalStorage)
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
    this.hardwareListChange.next(this.hardwareList)
  }

  edit(id: number, editedData: Partial<HardwareData>) {
    let foundElement = this.hardwareList.find(hardware => hardware.id == id);
    if(foundElement) {
      foundElement = Object.assign(foundElement, editedData);
      this.hardwareListChange.next(this.hardwareList);
      this.currentEdited = null;
      this.currentEditedChange.next(this.currentEdited);
      localStorage.setItem('table', JSON.stringify(this.hardwareList));
    }
  }

  setCurrentEdited(hardware: HardwareRecord) {
    this.currentEdited = hardware;
    this.currentEditedChange.next(this.currentEdited);
  }

  remove(id: number) {
    this.hardwareList = this.hardwareList.filter(el => el.id !== id);
    localStorage.setItem('table', JSON.stringify(this.hardwareList));
    this.hardwareListChange.next(this.hardwareList)
  }

  addCategory(category: string) {
    this.additionalCategories.push(category);
    localStorage.setItem('additionalCategories', JSON.stringify(this.additionalCategories));
  }
}
