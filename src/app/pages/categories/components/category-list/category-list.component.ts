import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Category } from '../../shared/category.model';
import { CategoryService } from '../../shared/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  displayedColumns: string[] = ['name', 'description', 'action'];

  get dataSource(): Observable<Category[]> {
    return this.resources.asObservable();
  }

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    super(categoryService)
  }

  navigateTo(id: number) {
    this.router.navigate([`${id}/edit`], { relativeTo: this.route });
  }

  deleteCategory(resource: Category, event: MouseEvent) {
    event.stopPropagation();
    this.deleteResource(resource)
  }

}
