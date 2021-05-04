import { NgModule } from '@angular/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IMaskModule } from 'angular-imask';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntriesRoutingModule } from './entries-routing.module';



@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    IMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ]
})
export class EntriesModule { }
