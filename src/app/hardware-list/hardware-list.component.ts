import { Component, OnInit } from '@angular/core';
import { HardwareRecord } from '../hardware-list.service';

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {

  hardwareList: HardwareRecord[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
