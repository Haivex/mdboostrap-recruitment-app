import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HardwareFormComponent } from './hardware-form/hardware-form.component';
import { HardwareListComponent } from './hardware-list/hardware-list.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { HardwareEditFormComponent } from './hardware-edit-form/hardware-edit-form.component';
import { HardwareCreateFormComponent } from './hardware-create-form/hardware-create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HardwareFormComponent,
    HardwareListComponent,
    HamburgerMenuComponent,
    HardwareEditFormComponent,
    HardwareCreateFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
