import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContactsListComponent },
  { path: 'new', component: ContactsFormComponent },
  { path: ':id/edit', component: ContactsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
