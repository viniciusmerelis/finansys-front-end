import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { Entry } from "./entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  // private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
  //   return entries.filter(entry => {
  //     const entryDate = moment(entry.date, "DD/MM/YYYY");
  //     const monthMatches = entryDate.month() + 1 == month;
  //     const yearMatches = entryDate.year() == year;

  //     if(monthMatches && yearMatches) return entry;
  //   })
  // }

}
