import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapViewComponent } from './contact/map-view/map-view.component';
import {HttpClient, HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    ContactViewComponent,
    ContactAddComponent,
    ContactEditComponent,
    ContactFormComponent,
    ContactComponent,
    MapViewComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[HttpClient]
})
export class ContactModule { }
