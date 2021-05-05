import { Contact } from './contact.model';
import { BaseResourceService } from 'src/app/shared/service/base-resource.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseResourceService<Contact> {

  constructor(protected injector: Injector) {
    super("api/contacts", injector, Contact.fromJson)
  }

}
