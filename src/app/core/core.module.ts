import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormCanDeactivateGuard } from './guard/form.guard';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
