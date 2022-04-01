import { Component, OnInit } from '@angular/core';
import { HardwareListService, HardwareRecord } from '../hardware-list.service';

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

}
