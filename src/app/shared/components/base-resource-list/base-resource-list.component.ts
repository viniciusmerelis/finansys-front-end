import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../service/base-resource.service';

@Injectable()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: BehaviorSubject<T[]> = new BehaviorSubject([]);

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.getAll()
      .subscribe(
        categories => {
          this.resources.next(categories);
        },
        error => {
          alert('Erro ao carregar a lista')
        }
      )
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => {
          this.resources.next( this.resources.value.filter(element => element != resource));
        },
        () => {
          alert("Erro ao tentar excluir");
        }
      )
    }
  }

}
