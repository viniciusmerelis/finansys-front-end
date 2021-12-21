import { EntryListComponent } from './components/entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { FormCanDeactivateGuard } from 'src/app/core/guard/form.guard';

const routes: Routes = [
  { path: '', component: EntryListComponent, pathMatch: 'full' },
  { path: ':id', component: EntryFormComponent, canDeactivate: [FormCanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
