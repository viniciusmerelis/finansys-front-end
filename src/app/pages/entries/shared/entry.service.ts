import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from 'moment';
import { Observable } from "rxjs";
import { Entry } from "./entry.model";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/lancamentos';
  }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiUrl);
  }

  getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(lancamento: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.apiUrl, lancamento);
  }

  update(lancamento: Entry): Observable<Entry> {
    return this.http.put<Entry>(`${this.apiUrl}/${lancamento.id}`, lancamento);
  }

  delete(lancamentoId: number) {
    return this.http.delete(`${this.apiUrl}/${lancamentoId}`);
  }

  // private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
  //   return entries.filter(entry => {
  //     const entryDate = moment(entry.date, "DD/MM/YYYY");
  //     const monthMatches = entryDate.month() + 1 == month;
  //     const yearMatches = entryDate.year() == year;

  //     if(monthMatches && yearMatches) return entry;
  //   })
  // }

}
