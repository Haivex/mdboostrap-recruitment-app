import { Component, OnInit } from '@angular/core';
import { HardwareListService, HardwareRecord } from '../hardware-list.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl, 'pl');

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {

  hardwareList: HardwareRecord[] = [];
  service: HardwareListService;

  constructor(service: HardwareListService ) {
    this.service = service
    this.hardwareList = this.service.get();
  }

  ngOnInit(): void {
  }

  sumPrices() {
    return this.hardwareList.reduce((sum, currentHardware) => {
      return sum + currentHardware.price;
    }, 0).toFixed(2);
  }

  getNumberOfPositions() {
    return this.hardwareList.length;
  }

}
