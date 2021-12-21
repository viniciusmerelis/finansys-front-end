import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCanDeactivateGuard } from 'src/app/core/guard/form.guard';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CategoryListComponent },
  { path: ':id', component: CategoryFormComponent, canDeactivate: [FormCanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
