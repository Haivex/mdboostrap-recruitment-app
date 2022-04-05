import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HardwareListService, HardwareRecord } from '../hardware-list.service';
registerLocaleData(localePl, 'pl');

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss', '../hardware-form/hardware-form.component.scss'],
})
export class HardwareListComponent implements OnInit {
  hardwareList: HardwareRecord[] = [];
  category = new FormControl('all');
  service: HardwareListService;
  private _subscription: Subscription;
  additionalCategories: string[] = [];

  @ViewChild('hardwareTable') hardwareTable:
    | ElementRef<HTMLTableElement>
    | undefined;

  constructor(service: HardwareListService) {
    this.service = service;
    this.hardwareList = this.service.get();
    this.additionalCategories = this.service.additionalCategories;
    this._subscription = this.service.hardwareListChange.subscribe((value) => {
      this.hardwareList = value;
      this.changeCategory(this.category.value);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  sumPrices() {
    return this.hardwareList
      .reduce((sum, currentHardware) => {
        return sum + currentHardware.price;
      }, 0)
      .toFixed(2);
  }

  getNumberOfPositions() {
    return this.hardwareList.length;
  }

  deletePosition(positionId: number) {
    this.service.remove(positionId);
  }

  editPosition(hardwareRecord: HardwareRecord) {
    this.service.setCurrentEdited(hardwareRecord);
  }

  changeCategory(category?: string) {
    if (category == 'all') {
      this.hardwareList = this.service.get();
      return;
    }
    this.hardwareList = this.service.get(category);
  }

  printTable() {
    if (this.hardwareTable?.nativeElement) {
      const tableElement = this.hardwareTable.nativeElement;
      const tableElementClone = tableElement.cloneNode(true);
      const htmlElement = document.querySelector('html') as HTMLElement;

      const windowToPrint = window.open(
        '',
        '',
        'height=500, width=500'
      ) as Window;
      windowToPrint.document.write('<html>');
      windowToPrint.document.write(htmlElement.innerHTML);
      windowToPrint.document.write('</html>');
      windowToPrint.document.body.innerHTML = '';
      windowToPrint.document.body.appendChild(tableElementClone);
      windowToPrint.document.close();
      windowToPrint.print();
    }
  }

  orderBy(column: keyof HardwareRecord) {
    if (typeof this.hardwareList[0][column] == 'string')
      return this.hardwareList.sort((a, b) => {
        let keyNameA = a[column];
        let keyNameB = b[column];
        if (keyNameA < keyNameB) return -1;
        if (keyNameA > keyNameB) return 1;
        return 0;
      });

    return this.hardwareList.sort((a, b) => {
      let keyNameA = a[column];
      let keyNameB = b[column];
      if (typeof keyNameA == 'number' && typeof keyNameB == 'number') {
        return keyNameA - keyNameB;
      }
      return 0;
    });
  }
  orderByReverse(column: keyof HardwareRecord) {
    return this.orderBy(column).reverse();
  }

  drop(event: CdkDragDrop<HardwareRecord>) {
    moveItemInArray(this.hardwareList, event.previousIndex, event.currentIndex);
  }
}
