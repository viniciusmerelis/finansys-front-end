import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/pages/categories/shared/category.model';
import { CategoryService } from '../../../categories/shared/category.service';
import { EntryType } from '../../shared/entry.model';
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
export class EntryFormComponent implements OnInit {

  currentAction: string;
  categories: Category[];
  root: FormGroup;
  pageTitle: string;
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
    const id = this.route.snapshot.params['id'];
    if (id === 'new') {
      this.root.setValue({
        id: null,
        nome: null,
        descricao: null,
        tipo: null,
        valor: null,
        data: null,
        status: null,
        categoria: null
      })
    } else {

    }
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

  goToEntryList() {
    this.router.navigate(['/entries']);
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
    if(this.currentAction == 'new') {
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
