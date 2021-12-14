import { AfterContentChecked, Injectable, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CanDeactivateComponent } from 'src/app/core/guard/form.guard';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

@Injectable()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked, CanDeactivateComponent {

  @ViewChild(FormGroupDirective) form: FormGroupDirective;

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute),
      this.router = this.injector.get(Router),
      this.formBuilder = this.injector.get(FormBuilder)
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }


  cancel() {
    const path = this.currentAction == 'edit' ? '../..' : '..';
    this.currentAction = '';
    this.router.navigate([path], { relativeTo: this.route });
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

  canDeactivate(): boolean {
    return (this.currentAction != 'new' && this.currentAction != 'edit') || this.resourceForm.pristine;
  }

  //Protected Methods

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }

  protected loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (error) => alert("Ocorreu um error no servidor")
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle() {
    return 'Novo';
  }

  protected editionPageTitle() {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.resourceForm.value;
    this.resourceService.create
  }

  // protected createResource() {
  //   const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
  //   this.resourceService.create(resource).subscribe(
  //     (resource) => {
  //       this.actionsForSuccess(resource),
  //         (error) => {
  //           this.actionsForError(error)
  //         }
  //     }
  //   )
  // }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.upadate(resource).subscribe(
      (resource) => {
        this.actionsForSuccess(resource),
          (error) => {
            this.actionsForError(error)
          }
      }
    )
  }

  protected actionsForSuccess(resource: T) {
    this.currentAction = '';
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
      () => {
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      }
    )
  }

  protected actionsForError(error) {
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor.'];
    }
  }

  protected abstract buildResourceForm(): void;

}
