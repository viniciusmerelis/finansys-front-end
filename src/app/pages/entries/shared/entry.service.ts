import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { BaseResourceService } from "src/app/shared/service/base-resource.service";
import { Entry } from "./entry.model";
import * as moment from 'moment';
import { CategoryService } from "../../categories/shared/category.service";

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super("api/entries", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
  }

  upadate(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.upadate.bind(this))
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry)
      }),
      catchError(this.handleError)
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) return entry;
    })
  }

}
