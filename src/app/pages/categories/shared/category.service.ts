import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/categorias';
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(categoria: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, categoria);
  }

  update(categoria: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${categoria.id}`, categoria);
  }

  delete(categoriaId: number) {
    return this.http.delete(`${this.apiUrl}/${categoriaId}`);
  }

}
