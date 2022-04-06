import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HardwareListService } from '../hardware-list.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss', '../hardware-form/hardware-form.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category = new FormControl('', Validators.required)
  service: HardwareListService;

  constructor(service: HardwareListService) { this.service = service }

  ngOnInit(): void {
  }

  addCategory() {
    if(this.category.errors) return;
    this.service.addCategory(this.category.value)
    this.category.reset();
  }

}
