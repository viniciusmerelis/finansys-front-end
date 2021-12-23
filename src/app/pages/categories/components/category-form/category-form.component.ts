import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CanDeactivateComponent } from 'src/app/core/guard/form.guard';
import { Category } from '../../shared/category.model';
import { CategoryService } from '../../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy, AfterContentChecked, CanDeactivateComponent {

  @ViewChild(FormGroupDirective) form: FormGroupDirective;

  currentAction: string;
  root: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  unsubscribeAll = new Subject<void>();

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        const id = params.get("id");
        if (id === 'new') {
          this.root.setValue({ id: null, nome: null, descricao: null });
          this.root.markAsPristine();
          this.root.markAsUntouched();
        } else {
          this.categoryService.getById(+id)
            .subscribe(
              category => {
                this.root.patchValue(category);
                this.root.markAsPristine();
                this.root.markAsUntouched();
              },
              error => {
                console.log(error);
                this._snackBar.open('Não encontrado');
              });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (!this.root.get('id').value) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  buildCategoryForm() {
    this.root = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descricao: new FormControl()
    });
  }

  createCategory() {
    const category: Category = this.root.getRawValue();
    this.categoryService.create(category).subscribe(
      cat => {
        this.form.resetForm(cat)
        this.root.markAsPristine();
        this.root.markAsUntouched();
        this.submittingForm = false;
        this.goToCategoryList();
      },
      error => {
        console.log(error);
        this._snackBar.open('Erro ao criar uma categoria!');
        this.submittingForm = false;
      }
    );
  }

  updateCategory() {
    const category: Category = this.root.getRawValue();
    this.categoryService.update(category).subscribe(
      cat => {
        this.form.resetForm(cat)
        this.root.markAsPristine();
        this.root.markAsUntouched();
        this.submittingForm = false;
        this.goToCategoryList();
      },
      error => {
        console.log(error);
        this._snackBar.open('Erro ao atualizar a categoria!');
        this.submittingForm = false;
      }
    );
  }

  canDeactivate(): boolean {
    return (this.currentAction != 'new' && this.currentAction != 'edit') || this.root.pristine;
  }

  setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }

  goToCategoryList() {
    this.router.navigate(['/categories']);
  }

  shouldShowErrorMessage(control: AbstractControl): boolean {
    return control.errors && control.touched || control.dirty;
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control.hasError('minlength')) {
      return `O tamanho mínimo é de ${control.getError('minlength').requiredLength} caracteres.`
    }
    return 'Falha validação';
  }

  setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = 'Nova Categoria';
    } else {
      const categoryName = this.root.get('nome')?.value || '';
      this.pageTitle = `Editando Categoria: ${categoryName}`;
    }
  }

  successMessage() {
    if (this.currentAction == 'new') {
      this._snackBar.open('Categoria criada com sucesso!', null, {
        duration: 5000
      });
    } else {
      this._snackBar.open('Categoria atualizada com sucesso!', null, {
        duration: 5000
      });
    }
  }

}
