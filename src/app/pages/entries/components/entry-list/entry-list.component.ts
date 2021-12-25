import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../../shared/entry.model';
import { EntryService } from '../../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  lancamentos: Entry[];
  displayedColumns: string[] = ['name', 'type', 'data', 'category', 'value', 'action'];

  constructor(
    private entryService: EntryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listarLancamentos();
  }

  get dataSource(): Entry[] {
    return this.lancamentos;
  }

  listarLancamentos(): void {
    this.entryService.getAll().subscribe(
      data => {
        this.lancamentos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteEntry(entry: Entry, event: MouseEvent) {
    event.stopPropagation();
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () => {
          this.lancamentos = this.lancamentos.filter(lanc => lanc.id !== entry.id);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  navigateTo(id: number) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }

}
