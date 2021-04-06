import { Injectable } from "@angular/core";
import { BaseResourceService } from "src/app/shared/service/base-resource.service";
import { Entry } from "./entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

}
