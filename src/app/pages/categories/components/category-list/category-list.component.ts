import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category.model';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categorias: Category[];
  displayedColumns: string[] = ['name', 'description', 'action'];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listarCategorias();
  }

  get dataSource(): Category[] {
    return this.categorias;
  }

  listarCategorias(): void {
    this.categoryService.getAll().subscribe(
      data => {
        this.categorias = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteCategory(category: Category, event: MouseEvent) {
    event.stopPropagation();
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.categoryService.delete(category.id)
        .subscribe(
          () => {
            this.categorias = this.categorias.filter(cat => cat.id !== category.id);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  navigateTo(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

}
