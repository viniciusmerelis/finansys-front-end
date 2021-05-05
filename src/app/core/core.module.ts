import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormCanDeactivateGuard } from './guard/form.guard';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    RouterModule,
    MatToolbarModule,
    MatButtonModule,

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ToolbarComponent,
    MatButtonModule
  ],
  providers: [
    FormCanDeactivateGuard
  ]
})
export class CoreModule { }
