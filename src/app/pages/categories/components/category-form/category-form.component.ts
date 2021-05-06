import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../shared/category.model';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  category: Category = new Category();

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector,
    private _snackBar: MatSnackBar
  ) {
    super(injector, new Category(), categoryService, Category.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Nova Categoria';
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || '';
    return `Editando Categoria: ${resourceName}`;
  }

  createdSuccessMessage() {
    this._snackBar.open('Categoria criada com sucesso!', null, {
      duration: 5000
    });
  }

}
