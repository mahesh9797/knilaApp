import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactAddComponent } from './contact/contact-add/contact-add.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { ContactComponent } from './contact/contact.component';
import { MapViewComponent } from './contact/map-view/map-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  {
    path: 'contact',
    component: ContactComponent,
    children: [
      { path: '', redirectTo: 'view-contact', pathMatch: 'full' },
      { path: 'view-contact', component: ContactViewComponent },
      { path: 'add-contact', component: ContactAddComponent },
      { path: 'edit-contact', component: ContactEditComponent },
      { path: 'edit-contact/:id', component: ContactEditComponent },
      { path: 'map-view', component: MapViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
