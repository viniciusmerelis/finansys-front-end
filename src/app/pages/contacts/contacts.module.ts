import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';



@NgModule({
  declarations: [
    ContactsListComponent,
    ContactsFormComponent
  ],
  imports: [
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
