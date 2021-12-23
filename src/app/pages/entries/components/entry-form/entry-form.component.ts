import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/pages/categories/shared/category.model';
import { CategoryService } from '../../../categories/shared/category.service';
import { Entry, EntryType } from '../../shared/entry.model';
import { EntryService } from './../../shared/entry.service';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
};

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class EntryFormComponent implements OnInit, OnDestroy, AfterContentChecked {

  @ViewChild(FormGroupDirective) form: FormGroupDirective;

  currentAction: string;
  categories: Category[];
  root: FormGroup;
  pageTitle: string;
  submittingForm: boolean = false;
  unsubscribeAll = new Subject<void>();
  typeOptions: { value: EntryType, text: string }[] = [
    { value: 'despesa', text: 'Despesa' },
    { value: 'receita', text: 'Receita' }
  ];

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        const id = params.get("id");
        if (id === 'new') {
          this.root.setValue({ id: null, nome: null, descricao: null, tipo: null, valor: null, data: null, status: null, categoria: null });
          this.root.markAsPristine();
          this.root.markAsUntouched();
        } else {
          this.entryService.getById(+id)
            .subscribe(
              entry => {
                this.root.patchValue(entry);
                this.root.markAsPristine();
                this.root.markAsUntouched();
              },
              error => {
                console.log(error);
                this._snackBar.open("Lancamento não encontrado")
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

  protected buildEntryForm() {
    const type: EntryType = 'despesa';
    this.root = new FormGroup({
      id: new FormControl(),
      nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      descricao: new FormControl(),
      tipo: new FormControl(type, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      status: new FormControl(true, [Validators.required]),
      categoria: new FormControl(null, [Validators.required])
    });
  }

  submitForm() {
    this.submittingForm = true;
    if (!this.root.get('id').value) {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  createEntry() {
    const entry: Entry = this.root.getRawValue();
    this.entryService.create(entry).subscribe(
      lanc => {
        this.form.resetForm(lanc);
        this.root.markAsPristine();
        this.root.markAsUntouched();
        this.submittingForm = false;
        this.goToEntryList();
      },
      error => {
        console.log(error);
        this._snackBar.open("Erro ao criar um lançamento!");
        this.submittingForm = false;
      }
    );
  }

  updateEntry() {
    const entry: Entry = this.root.getRawValue();
    this.entryService.update(entry).subscribe(
      lanc => {
        this.form.resetForm(lanc);
        this.root.markAsPristine();
        this.root.markAsUntouched();
        this.submittingForm = false;
        this.goToEntryList();
      },
      error => {
        console.log(error);
        this._snackBar.open("Erro ao atualizar o lancamento!");
        this.submittingForm = false;
      }
    );
  }

  goToEntryList() {
    this.router.navigate(['/entries']);
  }

  shouldShowErrorMessage(control: AbstractControl): boolean {
    return control.errors && control.touched || control.dirty;
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Campo obrigatório.';
    }
    if (control.hasError('minlength')) {
      return `O tamanho mínimo é de ${control.getError('minlength').requiredLength} caracteres.`;
    }
  }

  setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Novo Lançamento';
    } else {
      const entryName = this.root.get('nome')?.value || '';
      this.pageTitle = `Editando Lançamento: ${entryName}`;
    }
  }

  successMessage() {
    if (this.currentAction == 'new') {
      this._snackBar.open('Lançamento criado com sucesso!', null, {
        duration: 5000
      });
    } else {
      this._snackBar.open('Lançamento editado com sucesso!', null, {
        duration: 5000
      });
    }
  }

}
