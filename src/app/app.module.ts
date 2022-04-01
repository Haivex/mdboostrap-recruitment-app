import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HardwareFormComponent } from './hardware-form/hardware-form.component';
import { HardwareListComponent } from './hardware-list/hardware-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HardwareFormComponent,
    HardwareListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
