import { Component, OnInit } from '@angular/core';
import { HardwareData } from '../hardware-form/hardware-form.component';

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {

  hardwareList: HardwareData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
