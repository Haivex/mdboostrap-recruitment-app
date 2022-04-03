import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HardwareFormComponent } from './hardware-form/hardware-form.component';
import { HardwareListComponent } from './hardware-list/hardware-list.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HardwareFormComponent,
    HardwareListComponent,
    HamburgerMenuComponent
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
