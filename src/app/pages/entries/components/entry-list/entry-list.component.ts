import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Entry } from '../../shared/entry.model';
import { EntryService } from '../../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  displayedColumns: string[] = ['name', 'type', 'data', 'category', 'value', 'action' ];

  get dataSource(): Observable<Entry[]>{
    return this.resources.asObservable();
  }

  constructor(
    private entryService: EntryService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    super(entryService)
  }

  navigateTo(id: number) {
    this.router.navigate([`${id}/edit`], { relativeTo: this.route });
  }

  deleteEntry(resource: Entry, event: MouseEvent) {
    event.stopPropagation();
    this.deleteResource(resource)
  }

}
